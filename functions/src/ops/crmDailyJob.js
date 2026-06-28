'use strict';

const { onSchedule } = require('firebase-functions/v2/scheduler');
const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { defineSecret } = require('firebase-functions/params');
const admin = require('firebase-admin');
const zlib = require('zlib');
const { buildExportData } = require('./crmBackup');
const { computeStartAt } = require('../../shared/business-hours');
const { blocksFor } = require('../../shared/cita-blocks');
const { detectCollisions } = require('../../shared/crm-spec');
const { recalcVehicleState } = require('../crm/vehicleAggregate');
const { applyWonSideEffects } = require('../crm/dealWon');
const { infoAlert, criticalAlert } = require('./notify');

const telegramBotToken = defineSecret('TELEGRAM_BOT_TOKEN');

/**
 * crmDailyJob — mantenimiento diario del CRM (F17-resto + F34 §182;
 * F28 COMPLETO + F22 en §184). Corre 5:00 am Bogotá (ventana muerta).
 * Orden DELIBERADO: el EXPORT va PRIMERO (ninguna mutación sin red).
 *
 *  a) Backup diario → Storage privado crm-backups/daily/…
 *  b) Backfill incremental de `startAt` + CADUCAR pendientes ya pasadas.
 *  c) REBUILD de config/bookedSlots (cupo global) Y de resource_slots
 *     (tupla asesor+vehículo, F19) desde las citas reales — auto-repara
 *     fantasmas y purga fechas pasadas.
 *  c2) Re-proyectar citas activas SIN activity en la Agenda (derivable).
 *  d) Purga de blockedDates/blockedHours/labels pasadas en availability.
 *  d2) INVARIANTES que requieren juicio → solo REPORTE: lead convertido
 *      ↔ deal existe; F22 vehículo de cita activa apartado/vendido →
 *      "requiere reagendar" + alerta al asesor; apartados con venceEl
 *      vencido → alerta "liberar o cobrar" (F38 crítica, una vez).
 *  e) Digest INFO a crm_alerts (F38: lo informativo jamás hace push).
 */

const ESTADOS_ACTIVOS = ['pendiente', 'confirmada', 'reprogramada'];
const CON_TUPLA = ['confirmada', 'reprogramada']; // pendiente no retiene tupla (C.2)

async function runDailyMaintenance(db, deps) {
  deps = deps || {};
  const report = { at: new Date().toISOString() };

  // ── a) BACKUP PRIMERO (F34) ──
  const { data, counts } = await buildExportData(db, { by: 'crmDailyJob' });
  const gz = zlib.gzipSync(Buffer.from(JSON.stringify(data), 'utf8'));
  const day = data._meta.exportedAt.slice(0, 10);
  const path = 'crm-backups/daily/' + day + '/export.json.gz';
  await admin.storage().bucket().file(path).save(gz, {
    contentType: 'application/gzip',
    metadata: { cacheControl: 'private, max-age=0' },
  });
  report.backup = { path, counts, bytes: gz.length };

  // ── b) backfill startAt + caducar pendientes pasadas — PAGINADO por
  // documentId (review §184: un limit(500) sin orden alimentando un rebuild
  // DESTRUCTIVO es una bomba de tiempo cuando el histórico crezca) ──
  let backfilled = 0;
  let caducadas = 0;
  const nowIso = new Date().toISOString();
  const todayKey = new Date(Date.now() - 5 * 3600e3).toISOString().slice(0, 10); // hoy Bogotá
  {
    let last = null;
    let pages = 0;
    for (;;) {
      let q = db.collection('solicitudes').where('kind', '==', 'cita')
        .orderBy(admin.firestore.FieldPath.documentId()).limit(300);
      if (last) q = q.startAfter(last);
      const page = await q.get();
      for (const d of page.docs) {
        const sol = d.data();
        const startAt = computeStartAt(sol.fecha, sol.hora);
        if (startAt && sol.startAt !== startAt) {
          await d.ref.update({ startAt }); // dispara onSolicitudWritten → proyección
          backfilled++;
        }
        // F19/F28: pendiente cuya fecha ya pasó = hold muerto → caducar.
        if (sol.estado === 'pendiente' && startAt && startAt < nowIso) {
          await d.ref.update({ estado: 'caducada', holdExpiredAt: nowIso, updatedAt: nowIso, updatedBy: 'crmDailyJob' });
          caducadas++;
        }
      }
      if (page.size < 300 || ++pages >= 10) break; // tope sano ~3000 docs/noche
      last = page.docs[page.docs.length - 1];
    }
  }

  // ── c) conjunto COMPLETO de citas vigentes vía índice (kind, startAt) —
  // la fuente del rebuild jamás puede ser una muestra truncada ──
  const todayStartIso = new Date(todayKey + 'T00:00:00-05:00').toISOString();
  const snap = await db.collection('solicitudes').where('kind', '==', 'cita')
    .where('startAt', '>=', todayStartIso).limit(1000).get();
  const futureSlots = {};   // cupo GLOBAL: { 'YYYY-MM-DD': ['HH:MM'] } activas futuras
  const tupleByDay = {};    // tupla F19: { 'YYYY-MM-DD': { 'asesor_x': [bloques], 'vehiculo_y': [...] } }
  const activasFuturas = []; // para chequeo de proyección + F22
  for (const d of snap.docs) {
    const sol = d.data();
    if (ESTADOS_ACTIVOS.includes(sol.estado) && sol.fecha && sol.hora && sol.fecha >= todayKey) {
      (futureSlots[sol.fecha] = futureSlots[sol.fecha] || []).push(sol.hora);
      activasFuturas.push({ id: d.id, ref: d.ref, sol });
      // pendiente NO retiene tupla (C.2); confirmada con _tupleConflict tampoco.
      if (CON_TUPLA.includes(sol.estado) && !sol._tupleConflict && sol.assignedTo) {
        const day = (tupleByDay[sol.fecha] = tupleByDay[sol.fecha] || {});
        const blocks = blocksFor(sol.hora, sol.duracionMin || 60);
        const aKey = 'asesor_' + sol.assignedTo;
        day[aKey] = Array.from(new Set([...(day[aKey] || []), ...blocks])).sort();
        const vid = sol.vehicleAssignedId || null;
        if (vid) {
          const vKey = 'vehiculo_' + vid;
          day[vKey] = Array.from(new Set([...(day[vKey] || []), ...blocks])).sort();
        }
      }
    }
  }
  report.citas = { vigentes: snap.size, backfilledStartAt: backfilled, caducadas };

  const slotsRef = db.collection('config').doc('bookedSlots');
  await db.runTransaction(async (tx) => {
    const cur = await tx.get(slotsRef);
    const prev = cur.exists ? cur.data() : {};
    let prevCount = 0;
    for (const arr of Object.values(prev)) if (Array.isArray(arr)) prevCount += arr.length;
    let newCount = 0;
    for (const arr of Object.values(futureSlots)) newCount += arr.length;
    tx.set(slotsRef, futureSlots); // REEMPLAZO: la fuente de verdad son las citas
    report.bookedSlots = { antes: prevCount, despues: newCount, fantasmasEliminados: Math.max(0, prevCount - newCount) };
  });

  // ── c-bis) REBUILD de resource_slots (tupla F19) — misma doctrina:
  // la fuente de verdad son las citas; días pasados o sin tuplas se borran.
  {
    const existing = await db.collection('resource_slots').get();
    const batch = db.batch();
    let dropped = 0;
    const daysToWrite = new Set(Object.keys(tupleByDay));
    for (const d of existing.docs) {
      if (!daysToWrite.has(d.id)) { batch.delete(d.ref); dropped++; }
    }
    for (const [day, data] of Object.entries(tupleByDay)) {
      batch.set(db.collection('resource_slots').doc(day), data); // REEMPLAZO
    }
    await batch.commit();
    report.resourceSlots = { dias: daysToWrite.size, eliminados: dropped };
  }

  // ── c2) citas activas ↔ activity proyectada (derivable → auto-repara):
  // si falta activities/cita_{id}, un touch re-dispara la proyección F16.
  {
    let missing = 0;
    if (activasFuturas.length) {
      const refs = activasFuturas.map((c) => db.collection('activities').doc('cita_' + c.id));
      const actSnaps = await db.getAll(...refs);
      for (let i = 0; i < actSnaps.length; i++) {
        if (!actSnaps[i].exists) {
          await activasFuturas[i].ref.update({ _projectionTouchedAt: nowIso });
          missing++;
        }
      }
    }
    report.proyeccion = { activas: activasFuturas.length, reproyectadas: missing };
  }

  // ── d) availability: purgar bloqueos pasados ──
  const availRef = db.collection('config').doc('availability');
  const availSnap = await availRef.get();
  if (availSnap.exists) {
    const av = availSnap.data();
    const upd = {};
    if (Array.isArray(av.blockedDates)) {
      const keep = av.blockedDates.filter((f) => f >= todayKey);
      if (keep.length !== av.blockedDates.length) upd.blockedDates = keep;
    }
    if (av.blockedHours && typeof av.blockedHours === 'object') {
      const keep = {};
      let changed = false;
      for (const [f, hs] of Object.entries(av.blockedHours)) {
        if (f >= todayKey) keep[f] = hs; else changed = true;
      }
      if (changed) upd.blockedHours = keep;
    }
    // F21 §184: labels de fechas ya purgadas también se limpian.
    if (av.blockedDateLabels && typeof av.blockedDateLabels === 'object') {
      const keep = {};
      let changed = false;
      for (const [f, label] of Object.entries(av.blockedDateLabels)) {
        if (f >= todayKey) keep[f] = label; else changed = true;
      }
      if (changed) upd.blockedDateLabels = keep;
    }
    if (Object.keys(upd).length) await availRef.update(upd);
    report.availabilityPurged = Object.keys(upd);
  }

  // ── d2-F14) FINALIZADOR de supresiones Ley 1581 (ADR §185): gracia de
  // 72h vencida → anonimizar TODO el grafo (stub anónimo de ID aleatorio,
  // doc original BORRADO — su ID determinista deriva del email = PII).
  {
    const { executeSuppression, contactHashOf } = require('../crm/contactGraph');
    const due = await db.collection('suppressions')
      .where('status', '==', 'pending').limit(50).get();
    let ejecutadas = 0;
    for (const d of due.docs) {
      const s = d.data();
      if (!s.executeAfter || s.executeAfter > nowIso) continue;
      try {
        const r = await executeSuppression(db, s.contactId, { by: 'crmDailyJob' });
        // Post-ejecución NADA conserva el ID derivado del email (review §185):
        // (a) el snapshot F34 de la gracia se BORRA de Storage; (b) el doc de
        // estado se re-keyea a un ID opaco con hash y el original cae.
        if (s.backupPath) {
          await admin.storage().bucket().file(s.backupPath).delete().catch(() => {});
        }
        await db.collection('suppressions').doc().set({
          status: 'done', contactHash: contactHashOf(s.contactId),
          stubId: r.stubId || null, result: r,
          requestedBy: s.requestedBy || null, requestedAt: s.requestedAt || null,
          executedAt: nowIso,
        });
        await d.ref.delete();
        ejecutadas++;
      } catch (err) {
        console.error('[crmDailyJob] supresión falló (' + contactHashOf(s.contactId) + '):', err.message);
        await d.ref.set({ lastError: err.message, lastErrorAt: nowIso }, { merge: true });
      }
    }
    report.supresionesEjecutadas = ejecutadas;
  }

  // ── d2-bis) retención de backups (review §185): los exports diarios y de
  // operaciones conservan PII pre-supresión — caducan a los 45 días.
  {
    let purgados = 0;
    try {
      const cutoff = Date.now() - 45 * 24 * 3600e3;
      const [files] = await admin.storage().bucket().getFiles({ prefix: 'crm-backups/' });
      for (const f of files) {
        const created = new Date(f.metadata.timeCreated || 0).getTime();
        if (created && created < cutoff) { await f.delete().catch(() => {}); purgados++; }
      }
    } catch (err) { console.warn('[crmDailyJob] retención de backups:', err.message); }
    report.backupsCaducadosPurgados = purgados;
  }

  // ── d3-F40e/F27e) reconcile del índice dedup (backfill permanente):
  // todo contacto vivo debe tener sus entradas (create-if-absent; una clave
  // de OTRO contacto = colisión que se reporta, jamás se roba).
  {
    const { dedupKeysFor, ensureDedupEntries } = require('../crm/contactGraph');
    let backfilled = 0;
    let colisiones = 0;
    const cs = await db.collection('contacts').limit(500).get();
    for (const d of cs.docs) {
      const c = d.data();
      if (c._suppressed || c._mergedInto || c.suppressionStatus === 'pendiente_supresion') continue;
      const keys = dedupKeysFor(c);
      const mirror = Array.isArray(c.dedupKeys) ? c.dedupKeys : null;
      // SIN atajo por espejo (review §185): el espejo puede mentir tras una
      // supresión que borró entradas por query — verificar el índice REAL
      // cada noche (create-if-absent es idempotente y el volumen diminuto).
      const { created, taken } = await ensureDedupEntries(db, d.id, keys);
      colisiones += taken.length;
      const mine = keys.filter((k) => !taken.some((t) => t.key === k));
      const same = mirror && mine.length === mirror.length && mine.every((k) => mirror.includes(k));
      if (!same) await d.ref.update({ dedupKeys: mine });
      if (created) backfilled++;
    }
    report.dedup = { contactosBackfilled: backfilled, colisiones };
  }

  // ── d-bis) higiene de overrides por asesor (crm_config, doc PRIVADO —
  // review §184: PII fuera del doc público): ausencias ya vencidas se purgan.
  {
    const ovRef = db.collection('crm_config').doc('advisorOverrides');
    const ovSnap = await ovRef.get();
    if (ovSnap.exists) {
      const cur = ovSnap.data().overrides || {};
      const keep = {};
      let purged = 0;
      for (const [uid, ov] of Object.entries(cur)) {
        if (ov && ov.to && ov.to < todayKey) { purged++; continue; }
        keep[uid] = ov;
      }
      if (purged) await ovRef.set({ overrides: keep, updatedAt: nowIso, updatedBy: 'crmDailyJob' });
      report.overridesPurgados = purged;
    }
  }

  // ── d2) INVARIANTES F28 v2 (lo que requiere juicio se REPORTA; las
  // alertas accionables son críticas F38, idempotentes por flag) ──
  const tgToken = deps.telegramToken || null;

  // F22: vehículo de una cita activa pasó a apartado/vendido → el asesor
  // decide (jamás cancelar en silencio).
  {
    let marcadas = 0;
    const conVehiculo = activasFuturas.filter((c) => (c.sol.vehicleAssignedId || c.sol.vehiculoId) && !c.sol._requiereReagendar);
    const vehIds = Array.from(new Set(conVehiculo.map((c) => String(c.sol.vehicleAssignedId || c.sol.vehiculoId))));
    if (vehIds.length) {
      const vehSnaps = await db.getAll(...vehIds.map((id) => db.collection('vehiculos').doc(id)));
      const estadoVeh = {};
      vehSnaps.forEach((s) => { if (s.exists) estadoVeh[s.id] = String(s.data().estado || '').toLowerCase(); });
      for (const c of conVehiculo) {
        const vid = String(c.sol.vehicleAssignedId || c.sol.vehiculoId);
        if (!['apartado', 'vendido'].includes(estadoVeh[vid])) continue;
        await c.ref.update({ _requiereReagendar: true, updatedAt: nowIso, updatedBy: 'crmDailyJob' });
        await criticalAlert(db, tgToken, {
          targetUid: c.sol.assignedTo || deps.ceoUid || null,
          text: '🚗 *El carro de una cita ya está ' + estadoVeh[vid] + '*\n'
            + (c.sol.nombre || '') + ' · ' + (c.sol.fecha || '') + ' ' + (c.sol.hora || '')
            + (c.sol.vehiculo ? '\n' + c.sol.vehiculo : '')
            + '\nLlama al cliente: ofrécele otro carro o reagenda (la cita NO se canceló sola).',
          url: 'https://altorracars.github.io/admin-app/dist/#/agenda', urlLabel: 'Abrir Agenda',
          type: 'cita_vehiculo_no_disponible', meta: { solicitudId: c.id, vehicleId: vid },
        });
        marcadas++;
      }
    }
    report.citasRequierenReagendar = marcadas;
  }

  // Apartados VENCIDOS: venceEl superado en deal abierto → "liberar o cobrar".
  {
    let alertados = 0;
    const dealsSnap = await db.collection('deals').where('status', '==', 'open').limit(500).get();
    const abiertos = dealsSnap.docs;
    for (const d of abiertos) {
      const deal = d.data();
      if (deal.stageId !== 'apartado' || !deal.venceEl || deal._apartadoVencidoAlertedAt) continue;
      if (deal.venceEl >= nowIso) continue;
      await criticalAlert(db, tgToken, {
        targetUid: deal.ownerId || deps.ceoUid || null,
        text: '⏰ *Apartado VENCIDO*\n' + (deal.title || deal.contactName || d.id)
          + (deal.montoApartado ? '\nMonto: $' + deal.montoApartado : '')
          + '\nVencía: ' + deal.venceEl.slice(0, 10)
          + '\nDecide: ¿liberar el carro o cobrar el saldo?',
        url: 'https://altorracars.github.io/admin-app/dist/#/pipeline', urlLabel: 'Abrir Pipeline',
        type: 'apartado_vencido', meta: { dealId: d.id },
      });
      await d.ref.update({ _apartadoVencidoAlertedAt: nowIso });
      alertados++;
    }
    report.apartadosVencidos = alertados;

    // Cerrados PAGINADOS por documentId (review E4 #3): un limit(500) sin
    // orden congela los mismos 500 para siempre cuando el histórico crezca —
    // y de aquí salen el backfill F42, el drift F25 y el invariante de
    // huérfanos (misma receta del bloque b).
    const cerrados = [];
    {
      let lastId = null;
      for (let page = 0; page < 12; page++) {
        let q = db.collection('deals')
          .where('status', 'in', ['won', 'lost'])
          .orderBy(admin.firestore.FieldPath.documentId())
          .limit(300);
        if (lastId) q = q.startAfter(lastId);
        const snap = await q.get();
        cerrados.push(...snap.docs);
        if (snap.size < 300) break;
        lastId = snap.docs[snap.docs.length - 1].id;
      }
    }

    // Lead convertido ↔ deal existe (requiere juicio → solo reporte).
    const dealIds = new Set(abiertos.map((d) => d.id));
    cerrados.forEach((d) => dealIds.add(d.id));
    const convSnap = await db.collection('leads').where('status', '==', 'convertido').limit(500).get();
    const huerfanos = [];
    convSnap.docs.forEach((l) => {
      const dealId = l.data().convertedTo && l.data().convertedTo.dealId;
      if (!dealId || !dealIds.has(dealId)) huerfanos.push(l.id);
    });
    report.invariantes = { leadsConvertidos: convSnap.size, sinDeal: huerfanos.slice(0, 10) };

    // ── E4/F26: colisión comercial — 2+ deals ABIERTOS sobre el mismo carro.
    // NO bloquea (dos compradores reales pueden competir): alerta al owner de
    // cada deal + copia al CEO ("grupal" F38), una vez por deal (flag).
    // try/catch por bloque (review E4 #8): un fallo aquí no mata el resto.
    try {
      let alertadas = 0;
      const openDeals = abiertos.map((d) => ({ id: d.id, ref: d.ref, ...d.data() }));
      for (const col of detectCollisions(openDeals)) {
        const grupo = openDeals.filter((x) => col.dealIds.includes(x.id));
        const nuevos = grupo.filter((x) => !x._colisionAlertedAt);
        if (!nuevos.length) continue; // grupo ya alertado (sin deals nuevos)
        const nombre = grupo.map((x) => x.vehicleName).find(Boolean) || ('vehículo ' + col.vehicleId);
        const destinos = new Set(
          grupo.map((x) => x.ownerId).filter(Boolean).concat(deps.ceoUid ? [deps.ceoUid] : [])
        );
        for (const uid of destinos) {
          await criticalAlert(db, tgToken, {
            targetUid: uid,
            text: '🥊 *Colisión comercial*\n' + grupo.length + ' negocios ACTIVOS sobre ' + nombre
              + '\n' + grupo.map((x) => '· ' + (x.name || x.id)).join('\n')
              + '\nNo es un error: dos compradores pueden competir. Coordinen quién va primero.',
            url: 'https://altorracars.github.io/admin-app/dist/#/pipeline', urlLabel: 'Abrir Pipeline',
            type: 'colision_comercial', meta: { vehicleId: col.vehicleId, dealIds: col.dealIds },
          });
        }
        for (const x of nuevos) {
          await x.ref.update({ _colisionAlertedAt: nowIso });
        }
        alertadas++;
      }
      report.colisionesComerciales = alertadas;
    } catch (e) {
      console.error('[crmDailyJob] colisiones F26:', e);
      report.colisionesComerciales = 'ERROR: ' + e.message;
    }

    // ── E4/F25: drift del agregado del vehículo — derivable → AUTO-REPARAR
    // (recalcVehicleState respeta vendido-terminal y estados manuales).
    // Cubre el cambio de vehicleId sin cambio de etapa y cualquier pisada
    // manual del form viejo sobre un estado gestionado por el CRM.
    try {
      let reparados = 0;
      const vehIds = new Set();
      abiertos.forEach((d) => { const v = d.data().vehicleId; if (v) vehIds.add(String(v)); });
      // won Y lost: un vehículo atascado en 'apartado' cuyo deal terminó lost
      // (trigger caído) solo se repara si su vehicleId entra al set.
      cerrados.forEach((d) => {
        const v = d.data().vehicleId;
        if (v) vehIds.add(String(v));
      });
      // y TODO vehículo actualmente 'apartado' (review E4 #1): cubre deals
      // ANULADOS (fuera de open/won/lost) y BORRADOS — sin esto, un carro
      // quedaría 'apartado' en la web para siempre sin vía de reparación.
      const apartadosSnap = await db.collection('vehiculos')
        .where('estado', '==', 'apartado').limit(300).get();
      apartadosSnap.docs.forEach((d) => vehIds.add(d.id));
      for (const vid of vehIds) {
        const r = await recalcVehicleState(db, vid, nowIso);
        if (r.changed) reparados++;
      }
      report.vehiculosDriftReparados = reparados;
    } catch (e) {
      console.error('[crmDailyJob] drift F25:', e);
      report.vehiculosDriftReparados = 'ERROR: ' + e.message;
    }

    // ── E4/F10+F42: wons sin commissionSnapshot (pre-E4 o trigger caído) →
    // backfill con la MISMA función del trigger (idempotente, proyección
    // interna sin side-effects de cara al cliente).
    try {
      let wonsBackfilled = 0;
      for (const d of cerrados) {
        const deal = d.data();
        if (deal.status !== 'won'
            || (Array.isArray(deal.commissionSnapshots) && deal.commissionSnapshots.length)
            || deal.commissionSnapshot) continue;
        const wonAt = deal.wonAt || deal.lastActivityAt || deal.updatedAt || nowIso;
        await applyWonSideEffects(db, d.id, deal, wonAt);
        wonsBackfilled++;
      }
      report.wonsBackfilled = wonsBackfilled;
    } catch (e) {
      console.error('[crmDailyJob] backfill wons F10/F42:', e);
      report.wonsBackfilled = 'ERROR: ' + e.message;
    }
  }

  // ── e) digest informativo (F38) ──
  await infoAlert(db, {
    type: 'daily_digest',
    text: '🧹 Mantenimiento diario CRM: backup ' + day
      + ' · citas vigentes ' + report.citas.vigentes + ' (startAt backfilled: ' + backfilled + ', caducadas: ' + caducadas + ')'
      + ' · cupos fantasma eliminados: ' + report.bookedSlots.fantasmasEliminados
      + ' · tupla: ' + report.resourceSlots.dias + ' día(s)'
      + ' · reproyectadas: ' + report.proyeccion.reproyectadas
      + ' · reagendar: ' + report.citasRequierenReagendar
      + ' · apartados vencidos: ' + report.apartadosVencidos
      + (report.supresionesEjecutadas ? ' · supresiones 1581 ejecutadas: ' + report.supresionesEjecutadas : '')
      + (report.dedup.colisiones ? ' · ⚠️ colisiones dedup (fusionar a mano): ' + report.dedup.colisiones : '')
      + (report.invariantes.sinDeal.length ? ' · ⚠️ convertidos sin deal: ' + report.invariantes.sinDeal.length : '')
      + (report.colisionesComerciales ? ' · 🥊 colisiones comerciales: ' + report.colisionesComerciales : '')
      + (report.vehiculosDriftReparados ? ' · estado de vehículos auto-reparado: ' + report.vehiculosDriftReparados : '')
      + (report.wonsBackfilled ? ' · wons backfilled (F10/F42): ' + report.wonsBackfilled : ''),
    meta: report,
  });

  console.log('[crmDailyJob] ' + JSON.stringify(report));
  return report;
}

const crmDailyJob = onSchedule(
  { schedule: '0 5 * * *', timeZone: 'America/Bogota', region: 'us-central1', maxInstances: 1, timeoutSeconds: 300, memory: '512MiB', secrets: [telegramBotToken] },
  async () => {
    const db = admin.firestore();
    const cfg = await db.collection('config').doc('crmIntake').get();
    await runDailyMaintenance(db, {
      telegramToken: telegramBotToken.value(),
      ceoUid: cfg.exists ? (cfg.data().alertUid || null) : null,
    });
  }
);

/** Disparo manual (pruebas / "limpia ya") — solo super admin. */
const crmRunDailyMaintenance = onCall(
  { region: 'us-central1', invoker: 'public', cors: true, timeoutSeconds: 300, memory: '512MiB', secrets: [telegramBotToken] },
  async (request) => {
    const db = admin.firestore();
    if (!request.auth || !request.auth.uid) throw new HttpsError('unauthenticated', 'Debes iniciar sesión.');
    const caller = await db.collection('usuarios').doc(request.auth.uid).get();
    if (!caller.exists || caller.data().rol !== 'super_admin') {
      throw new HttpsError('permission-denied', 'Solo un Super Admin puede ejecutar el mantenimiento.');
    }
    const cfg = await db.collection('config').doc('crmIntake').get();
    return runDailyMaintenance(db, {
      telegramToken: telegramBotToken.value(),
      ceoUid: cfg.exists ? (cfg.data().alertUid || null) : null,
    });
  }
);

module.exports = { crmDailyJob, crmRunDailyMaintenance, runDailyMaintenance };
