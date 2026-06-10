'use strict';

const { onSchedule } = require('firebase-functions/v2/scheduler');
const { onCall, HttpsError } = require('firebase-functions/v2/https');
const admin = require('firebase-admin');
const zlib = require('zlib');
const { buildExportData } = require('./crmBackup');
const { computeStartAt } = require('../../shared/business-hours');
const { infoAlert } = require('./notify');

/**
 * crmDailyJob — mantenimiento diario del CRM (F17-resto + F28 v1 + F34,
 * ADR §182). Corre 5:00 am Bogotá (ventana muerta). Orden DELIBERADO:
 * el EXPORT va PRIMERO (ningún día sin backup; ninguna mutación sin red).
 *
 *  a) Backup diario → Storage privado crm-backups/daily/… (F34: gratis y
 *     automático — el restore ya está ensayado en emulador).
 *  b) Backfill incremental de `startAt` en citas que no lo tengan (las
 *     viejas, pre-F16) → su update dispara onSolicitudWritten que las
 *     proyecta a la Agenda. Idempotente (solo escribe si falta).
 *  c) REBUILD de config/bookedSlots desde las citas ACTIVAS FUTURAS reales
 *     (transacción): mata los cupos fantasma históricos y purga fechas
 *     pasadas en el mismo acto. Auto-reparación, no solo detección (F28).
 *  d) Purga de blockedDates/blockedHours pasadas en config/availability.
 *  e) Digest INFO a crm_alerts (F38: lo informativo jamás hace push).
 */

const ESTADOS_ACTIVOS = ['pendiente', 'confirmada', 'reprogramada'];

async function runDailyMaintenance(db) {
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

  // ── b+c) citas: backfill startAt + rebuild de cupos ──
  const snap = await db.collection('solicitudes').where('kind', '==', 'cita').limit(500).get();
  let backfilled = 0;
  const futureSlots = {}; // { 'YYYY-MM-DD': ['HH:MM'] } solo activas futuras
  const todayKey = new Date(Date.now() - 5 * 3600e3).toISOString().slice(0, 10); // hoy Bogotá
  for (const d of snap.docs) {
    const sol = d.data();
    const startAt = computeStartAt(sol.fecha, sol.hora);
    if (startAt && sol.startAt !== startAt) {
      await d.ref.update({ startAt }); // dispara onSolicitudWritten → proyección
      backfilled++;
    }
    if (ESTADOS_ACTIVOS.includes(sol.estado) && sol.fecha && sol.hora && sol.fecha >= todayKey) {
      (futureSlots[sol.fecha] = futureSlots[sol.fecha] || []).push(sol.hora);
    }
  }
  report.citas = { total: snap.size, backfilledStartAt: backfilled };

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
    if (Object.keys(upd).length) await availRef.update(upd);
    report.availabilityPurged = Object.keys(upd);
  }

  // ── e) digest informativo (F38) ──
  await infoAlert(db, {
    type: 'daily_digest',
    text: '🧹 Mantenimiento diario CRM: backup ' + day
      + ' · citas ' + report.citas.total + ' (startAt backfilled: ' + backfilled + ')'
      + ' · cupos fantasma eliminados: ' + report.bookedSlots.fantasmasEliminados,
    meta: report,
  });

  console.log('[crmDailyJob] ' + JSON.stringify(report));
  return report;
}

const crmDailyJob = onSchedule(
  { schedule: '0 5 * * *', timeZone: 'America/Bogota', region: 'us-central1', maxInstances: 1, timeoutSeconds: 300, memory: '512MiB' },
  async () => { await runDailyMaintenance(admin.firestore()); }
);

/** Disparo manual (pruebas / "limpia ya") — solo super admin. */
const crmRunDailyMaintenance = onCall(
  { region: 'us-central1', invoker: 'public', cors: true, timeoutSeconds: 300, memory: '512MiB' },
  async (request) => {
    const db = admin.firestore();
    if (!request.auth || !request.auth.uid) throw new HttpsError('unauthenticated', 'Debes iniciar sesión.');
    const caller = await db.collection('usuarios').doc(request.auth.uid).get();
    if (!caller.exists || caller.data().rol !== 'super_admin') {
      throw new HttpsError('permission-denied', 'Solo un Super Admin puede ejecutar el mantenimiento.');
    }
    return runDailyMaintenance(db);
  }
);

module.exports = { crmDailyJob, crmRunDailyMaintenance, runDailyMaintenance };
