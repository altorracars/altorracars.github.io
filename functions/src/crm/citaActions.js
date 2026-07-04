'use strict';

const { onCall, onRequest, HttpsError } = require('firebase-functions/v2/https');
const { defineSecret } = require('firebase-functions/params');
const admin = require('firebase-admin');
const crypto = require('crypto');
const { computeStartAt } = require('../../shared/business-hours');
const {
  blocksFor, advisorOverrideFor, validateSlot, bogotaDayKey, nextMorningISO,
} = require('../../shared/cita-blocks');

const telegramBotToken = defineSecret('TELEGRAM_BOT_TOKEN');

/**
 * citaActions — F18/F19 (ADR §184, E2 tanda 2).
 *
 * TODA acción de cita es SERVER-SIDE y TRANSACCIONAL:
 *  - `crmCitaAction` (callable, staff con crm.edit): confirm / reschedule /
 *    cancel / no_show / complete / create (manual) / update (gap 7) /
 *    getConfirmLink.
 *  - `citaConfirm` (HTTP pública): el cliente toca el link tokenizado desde
 *    WhatsApp/email y la solicitud pasa a 'confirmada' (WhatsApp-first F18).
 *
 * Modelo de recursos (F19 C.2/C.3):
 *  - Cupo GLOBAL: config/bookedSlots — formato idéntico al del form web
 *    (el puente NO se toca): { 'YYYY-MM-DD': ['HH:MM'] }.
 *  - Tupla (asesor, intervalo) + (vehículo, intervalo): bloques de 30 min en
 *    `resource_slots/{YYYY-MM-DD}`: { 'asesor_<uid>': ['10:00','10:30'],
 *    'vehiculo_<id>': [...] }. Se reserva al CONFIRMAR (la mayoría del
 *    riesgo entra por la web pendiente, que solo retiene su slot global).
 *  - Reprogramar = mover cupo global + tupla + RESET de flags de
 *    recordatorio + ROTAR el token (C.4: el cliente jamás confirma la hora
 *    vieja desde un mensaje anterior).
 *
 * Cliente nunca escribe nada de esto directo: Admin SDK (las Rules públicas
 * quedan intactas). Los emails de estado salen GRATIS del trigger existente
 * `onSolicitudStatusChanged`.
 */

const ESTADOS_ACTIVOS = ['pendiente', 'confirmada', 'reprogramada'];
const CONFIRM_URL = 'https://us-central1-altorra-cars.cloudfunctions.net/citaConfirm';

const nowISO = () => new Date().toISOString();
const newToken = () => crypto.randomBytes(16).toString('hex');

/**
 * ¿Esta cita RETIENE bloques de tupla? (review §184: liberar sin verificar
 * propiedad borraba bloques de OTRA cita). Solo confirmada/reprogramada
 * reservan (C.2); una confirmada con _tupleConflict NO reservó.
 */
const holdsTuple = (sol) => ['confirmada', 'reprogramada'].includes(sol.estado) && !sol._tupleConflict;

/** Escape HTML — citaConfirm refleja datos del doc en una página pública. */
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
));

/**
 * Overrides por asesor (F21.5) — viven en `crm_config/advisorOverrides`
 * (campo `overrides`), NUNCA en config/availability: ese doc es de lectura
 * PÚBLICA (el form web lo necesita) y los overrides traen nombre + motivo
 * (incapacidad = dato sensible Ley 1581).
 */
const overridesRefOf = (db) => db.collection('crm_config').doc('advisorOverrides');
const overridesOf = (snap) => (snap && snap.exists && snap.data().overrides) || {};

/* ── helpers de transacción (exportados para el test de carrera C.5) ── */

function tupleConflicts(dayData, blocks, asesorId, vehicleId) {
  const data = dayData || {};
  const out = [];
  const keys = [];
  if (asesorId) keys.push(['asesor_' + asesorId, 'asesor']);
  if (vehicleId) keys.push(['vehiculo_' + vehicleId, 'vehiculo']);
  for (const [key, kind] of keys) {
    const taken = Array.isArray(data[key]) ? data[key] : [];
    for (const b of blocks) if (taken.includes(b)) out.push({ key, kind, block: b });
  }
  return out;
}

function applyTupleReserve(tx, dayRef, dayData, blocks, asesorId, vehicleId) {
  const upd = {};
  if (asesorId) {
    const k = 'asesor_' + asesorId;
    upd[k] = Array.from(new Set([...(Array.isArray(dayData?.[k]) ? dayData[k] : []), ...blocks])).sort();
  }
  if (vehicleId) {
    const k = 'vehiculo_' + vehicleId;
    upd[k] = Array.from(new Set([...(Array.isArray(dayData?.[k]) ? dayData[k] : []), ...blocks])).sort();
  }
  if (Object.keys(upd).length) tx.set(dayRef, upd, { merge: true });
}

function applyTupleRelease(tx, dayRef, dayData, blocks, asesorId, vehicleId) {
  if (!dayData) return;
  const upd = {};
  for (const id of [asesorId ? 'asesor_' + asesorId : null, vehicleId ? 'vehiculo_' + vehicleId : null]) {
    if (!id || !Array.isArray(dayData[id])) continue;
    upd[id] = dayData[id].filter((b) => !blocks.includes(b));
  }
  if (Object.keys(upd).length) tx.set(dayRef, upd, { merge: true });
}

/**
 * Gap 7 (§188 §4.7) — REASIGNAR asesor de una cita que retiene tupla:
 * verifica que el ENTRANTE esté libre en los bloques, libera al saliente
 * y reserva al entrante EN LA MISMA transacción (el vehículo no se toca).
 * El caller garantiza from !== to → los dos set(merge) escriben claves
 * distintas y no se pisan. Devuelve los conflictos (vacío = movido).
 */
function moveAdvisorBlocks(tx, dayRef, dayData, blocks, fromAsesorId, toAsesorId) {
  const conflicts = tupleConflicts(dayData, blocks, toAsesorId, null);
  if (conflicts.length) return conflicts;
  if (fromAsesorId) applyTupleRelease(tx, dayRef, dayData, blocks, fromAsesorId, null);
  applyTupleReserve(tx, dayRef, dayData, blocks, toAsesorId, null);
  return [];
}

/**
 * Reserva standalone de tupla (la usa el test de carrera C.5): misma
 * primitiva que usan confirm/create, en su propia transacción.
 */
async function reserveTupleTransaction(db, fecha, hora, duracionMin, asesorId, vehicleId, names) {
  const blocks = blocksFor(hora, duracionMin);
  const dayRef = db.collection('resource_slots').doc(fecha);
  return db.runTransaction(async (tx) => {
    const snap = await tx.get(dayRef);
    const data = snap.exists ? snap.data() : {};
    const conflicts = tupleConflicts(data, blocks, asesorId, vehicleId);
    if (conflicts.length) {
      const c = conflicts[0];
      const who = c.kind === 'asesor'
        ? ((names && names.asesorName) || 'El asesor') + ' ya tiene una cita'
        : ((names && names.vehicleName) || 'Ese vehículo') + ' ya está reservado';
      const err = new Error(who + ' a las ' + c.block + ' del ' + fecha + '. Elige otro horario.');
      err.code = 'TUPLE_TAKEN';
      throw err;
    }
    applyTupleReserve(tx, dayRef, data, blocks, asesorId, vehicleId);
    return { blocks };
  });
}

/* ── helpers de cupo GLOBAL (paridad exacta con el form web) ── */

function globalRelease(slots, fecha, hora) {
  if (!fecha || !hora || !Array.isArray(slots[fecha])) return slots;
  const next = { ...slots, [fecha]: slots[fecha].filter((h) => h !== hora) };
  if (!next[fecha].length) delete next[fecha];
  return next;
}

function globalReserve(slots, fecha, hora) {
  const cur = Array.isArray(slots[fecha]) ? slots[fecha] : [];
  if (cur.includes(hora)) {
    const err = new Error('Ese horario (' + fecha + ' ' + hora + ') ya está reservado por otra cita.');
    err.code = 'SLOT_TAKEN';
    throw err;
  }
  return { ...slots, [fecha]: [...cur, hora].sort() };
}

/* ── auth del staff ── */

async function assertStaff(db, auth, perm) {
  if (!auth || !auth.uid) throw new HttpsError('unauthenticated', 'Debes iniciar sesión.');
  const snap = await db.collection('usuarios').doc(auth.uid).get();
  if (!snap.exists) throw new HttpsError('permission-denied', 'Usuario sin perfil de staff.');
  const u = snap.data();
  const isSuper = u.rol === 'super_admin' || u.roleId === 'system_super_admin';
  const perms = isSuper ? ['*'] : (Array.isArray(u.permissions) ? u.permissions : []);
  if (!perms.includes('*') && !perms.includes(perm)) {
    throw new HttpsError('permission-denied', 'Necesitas el permiso ' + perm + '.');
  }
  return { uid: auth.uid, nombre: u.nombre || u.email || auth.uid, isSuper };
}

/* ── la callable ── */

const crmCitaAction = onCall(
  { region: 'us-central1', invoker: 'public', cors: true, timeoutSeconds: 60 },
  async (request) => {
    const db = admin.firestore();
    const staff = await assertStaff(db, request.auth, 'crm.edit');
    const { action, solicitudId } = request.data || {};
    const p = (request.data && request.data.payload) || {};
    const FV = admin.firestore.FieldValue;

    const availRef = db.collection('config').doc('availability');
    const slotsRef = db.collection('config').doc('bookedSlots');
    const dayRefOf = (f) => db.collection('resource_slots').doc(f);

    /* ---- create: cita MANUAL (360/Agenda) — nace confirmada con tupla ---- */
    if (action === 'create') {
      const { nombre, fecha, hora, asesorId } = p;
      if (!nombre || !fecha || !hora || !asesorId) {
        throw new HttpsError('invalid-argument', 'Faltan datos: nombre, fecha, hora y asesor son obligatorios.');
      }
      const dur = Number.isFinite(p.duracionMin) ? p.duracionMin : 60;
      const blocks = blocksFor(hora, dur);
      const solRef = db.collection('solicitudes').doc();

      await db.runTransaction(async (tx) => {
        const [availSnap, slotsSnap, daySnap, ovSnap] = await Promise.all([
          tx.get(availRef), tx.get(slotsRef), tx.get(dayRefOf(fecha)), tx.get(overridesRefOf(db)),
        ]);
        const av = availSnap.exists ? availSnap.data() : {};
        const v = validateSlot(av, fecha, hora, bogotaDayKey(Date.now()));
        if (!v.ok) throw new HttpsError('failed-precondition', v.reason);
        const ov = advisorOverrideFor(overridesOf(ovSnap), asesorId, fecha);
        if (ov) {
          throw new HttpsError('failed-precondition',
            (ov.name || 'El asesor') + ' está de ' + (ov.reason || 'ausencia') + ' esa fecha (' + ov.from + ' → ' + ov.to + ').');
        }
        const dayData = daySnap.exists ? daySnap.data() : {};
        const conflicts = tupleConflicts(dayData, blocks, asesorId, p.vehicleId || null);
        if (conflicts.length) {
          const c = conflicts[0];
          throw new HttpsError('already-exists', (c.kind === 'asesor'
            ? (p.asesorName || 'El asesor') + ' ya tiene una cita'
            : (p.vehicleName || 'Ese vehículo') + ' ya está reservado') + ' a las ' + c.block + '. Elige otro horario.');
        }
        let slots = slotsSnap.exists ? slotsSnap.data() : {};
        try { slots = globalReserve(slots, fecha, hora); } catch (e) {
          throw new HttpsError('already-exists', e.message);
        }
        tx.set(slotsRef, slots);
        applyTupleReserve(tx, dayRefOf(fecha), dayData, blocks, asesorId, p.vehicleId || null);

        const now = nowISO();
        tx.set(solRef, {
          kind: 'cita', source: 'manual', origen: 'crm_portal', requiereCita: true,
          tipo: p.tipo || 'visita', estado: 'confirmada',
          nombre, telefono: p.telefono || null, whatsapp: p.telefono || null,
          email: p.email || null, prefijoPais: p.prefijoPais || '+57',
          fecha, hora, duracionMin: dur, startAt: computeStartAt(fecha, hora),
          vehiculo: p.vehicleName || null, vehiculoId: p.vehicleId || null,
          vehicleAssignedId: p.vehicleId || null,
          assignedTo: asesorId, assignedToName: p.asesorName || null,
          comentarios: p.nota || '',
          confirmedAt: now, confirmedVia: 'manual',
          // F19: el contacto YA existe en el canónico — la ingestión NO debe
          // re-crear contact/lead. _ingestedAt corto-circuita onSolicitudCreated.
          _leadId: p.leadId || null, _contactId: p.contactId || null,
          _ingestedAt: now, _ingestVia: 'crmCitaAction',
          createdAt: now, createdBy: staff.uid, updatedAt: now, updatedBy: staff.uid,
        });
      });
      return { ok: true, solicitudId: solRef.id };
    }

    /* ---- purgeCancelled: limpieza masiva de citas TERMINALES (OLA-2.5) ----
     * Owner-only. Solo 'cancelada'/'caducada' (ya liberaron su cupo al cerrar;
     * completadas y no_show se CONSERVAN: son historial comercial/métricas). */
    if (action === 'purgeCancelled') {
      if (!staff.isSuper) throw new HttpsError('permission-denied', 'Solo el dueño puede purgar citas.');
      const snap = await db.collection('solicitudes')
        .where('kind', '==', 'cita').where('estado', 'in', ['cancelada', 'caducada'])
        .limit(200).get();
      if (snap.empty) return { ok: true, deleted: 0 };
      const batch = db.batch();
      snap.docs.forEach((d) => {
        batch.delete(d.ref);
        // La proyección F16 se conserva a propósito en deletes normales
        // (historial); en una PURGA el dueño quiere la Agenda limpia.
        batch.delete(db.collection('activities').doc('cita_' + d.id));
      });
      await batch.commit();
      return { ok: true, deleted: snap.size, more: snap.size === 200 };
    }

    /* ---- el resto de acciones operan sobre una solicitud existente ---- */
    if (!solicitudId) throw new HttpsError('invalid-argument', 'Falta solicitudId.');
    const solRef = db.collection('solicitudes').doc(solicitudId);

    if (action === 'getConfirmLink') {
      const snap = await solRef.get();
      if (!snap.exists) throw new HttpsError('not-found', 'La cita no existe.');
      let token = snap.data().confirmToken;
      if (!token) {
        token = newToken();
        await solRef.update({ confirmToken: token, confirmTokenAt: nowISO() });
      }
      return { ok: true, url: CONFIRM_URL + '?id=' + solicitudId + '&t=' + token };
    }

    const result = await db.runTransaction(async (tx) => {
      const snap = await tx.get(solRef);
      if (!snap.exists) throw new HttpsError('not-found', 'La cita no existe.');
      const sol = snap.data();
      if (!(sol.kind === 'cita' || sol.requiereCita === true)) {
        throw new HttpsError('failed-precondition', 'Esa solicitud no es una cita.');
      }
      const now = nowISO();
      const dur = Number.isFinite(sol.duracionMin) ? sol.duracionMin : 60;
      const oldBlocks = blocksFor(sol.hora, dur);

      /* confirm — asigna la TUPLA completa (C.2) */
      if (action === 'confirm') {
        if (sol.estado === 'confirmada') return { ok: true, idempotent: true };
        if (!ESTADOS_ACTIVOS.includes(sol.estado)) {
          throw new HttpsError('failed-precondition', 'La cita ya no está activa (' + sol.estado + ').');
        }
        if (!sol.fecha || !sol.hora) throw new HttpsError('failed-precondition', 'La cita no tiene fecha/hora.');
        const asesorId = p.asesorId || sol.assignedTo;
        if (!asesorId) throw new HttpsError('invalid-argument', 'Elige el asesor que atiende la cita.');
        const [daySnap, ovSnap] = await Promise.all([tx.get(dayRefOf(sol.fecha)), tx.get(overridesRefOf(db))]);
        const ov = advisorOverrideFor(overridesOf(ovSnap), asesorId, sol.fecha);
        if (ov) {
          throw new HttpsError('failed-precondition',
            (ov.name || 'El asesor') + ' está de ' + (ov.reason || 'ausencia') + ' esa fecha (' + ov.from + ' → ' + ov.to + ').');
        }
        const dayData = daySnap.exists ? daySnap.data() : {};
        const vehicleId = p.vehicleId !== undefined ? p.vehicleId : (sol.vehicleAssignedId || null);
        const conflicts = tupleConflicts(dayData, oldBlocks, asesorId, vehicleId);
        if (conflicts.length) {
          const c = conflicts[0];
          throw new HttpsError('already-exists', (c.kind === 'asesor'
            ? (p.asesorName || sol.assignedToName || 'El asesor') + ' ya tiene una cita'
            : 'Ese vehículo ya está reservado') + ' a las ' + c.block + '. Reprograma o elige otro.');
        }
        applyTupleReserve(tx, dayRefOf(sol.fecha), dayData, oldBlocks, asesorId, vehicleId);
        tx.update(solRef, {
          estado: 'confirmada',
          assignedTo: asesorId, assignedToName: p.asesorName || sol.assignedToName || null,
          vehicleAssignedId: vehicleId || null, duracionMin: dur,
          confirmedAt: now, confirmedVia: p.canal || 'manual',
          _tupleConflict: FV.delete(),
          updatedAt: now, updatedBy: staff.uid,
        });
        return { ok: true };
      }

      /* update — gap 7 (§188 §4.7): observaciones y/o REASIGNAR asesor sin
       * tocar estado/fecha/hora/cupo global. El clásico lo tenía (modal
       * admin-appointments:1159); el portal solo asignaba al confirmar.
       * confirmedAt/token NO se tocan: el cliente confirmó la HORA, no a
       * la persona que lo atiende. */
      if (action === 'update') {
        if (!ESTADOS_ACTIVOS.includes(sol.estado)) {
          throw new HttpsError('failed-precondition', 'La cita ya no está activa (' + sol.estado + ').');
        }
        const upd = { updatedAt: now, updatedBy: staff.uid };
        if (typeof p.observaciones === 'string' && p.observaciones !== (sol.observaciones || '')) {
          upd.observaciones = p.observaciones.slice(0, 2000);
        }
        const newAsesor = p.asesorId && p.asesorId !== sol.assignedTo ? p.asesorId : null;
        if (newAsesor) {
          if (!sol.fecha) throw new HttpsError('failed-precondition', 'La cita no tiene fecha.');
          const [daySnap, ovSnap] = await Promise.all([tx.get(dayRefOf(sol.fecha)), tx.get(overridesRefOf(db))]);
          const ov = advisorOverrideFor(overridesOf(ovSnap), newAsesor, sol.fecha);
          if (ov) {
            throw new HttpsError('failed-precondition',
              (ov.name || 'El asesor') + ' está de ' + (ov.reason || 'ausencia') + ' esa fecha (' + ov.from + ' → ' + ov.to + ').');
          }
          // Solo mueve bloques si la cita los RETIENE (pendiente no reserva,
          // C.2 — al confirmarla después, confirm reserva para el nuevo).
          if (holdsTuple(sol)) {
            const conflicts = moveAdvisorBlocks(
              tx, dayRefOf(sol.fecha), daySnap.exists ? daySnap.data() : {},
              oldBlocks, sol.assignedTo || null, newAsesor
            );
            if (conflicts.length) {
              throw new HttpsError('already-exists',
                (p.asesorName || 'El asesor') + ' ya tiene una cita a las ' + conflicts[0].block + '. Elige otro asesor o reprograma.');
            }
          }
          upd.assignedTo = newAsesor;
          upd.assignedToName = p.asesorName || null;
        }
        if (Object.keys(upd).length === 2) return { ok: true, noop: true }; // nada cambió
        tx.update(solRef, upd);
        return { ok: true };
      }

      /* reschedule — mueve cupo+tupla, resetea flags, ROTA token (C.4) */
      if (action === 'reschedule') {
        const { fecha, hora } = p;
        if (!fecha || !hora) throw new HttpsError('invalid-argument', 'Falta la nueva fecha/hora.');
        if (!ESTADOS_ACTIVOS.includes(sol.estado)) {
          throw new HttpsError('failed-precondition', 'La cita ya no está activa (' + sol.estado + ').');
        }
        const reads = [tx.get(availRef), tx.get(slotsRef), tx.get(dayRefOf(fecha)), tx.get(overridesRefOf(db))];
        const sameDay = sol.fecha === fecha;
        if (sol.fecha && !sameDay) reads.push(tx.get(dayRefOf(sol.fecha)));
        const [availSnap, slotsSnap, newDaySnap, ovSnap, oldDaySnap] = await Promise.all(reads);
        const av = availSnap.exists ? availSnap.data() : {};
        const v = validateSlot(av, fecha, hora, bogotaDayKey(Date.now()));
        if (!v.ok) throw new HttpsError('failed-precondition', v.reason);
        if (sol.assignedTo) {
          const ov = advisorOverrideFor(overridesOf(ovSnap), sol.assignedTo, fecha);
          if (ov) {
            throw new HttpsError('failed-precondition',
              (ov.name || 'El asesor') + ' está de ' + (ov.reason || 'ausencia') + ' esa fecha (' + ov.from + ' → ' + ov.to + ').');
          }
        }

        // Cupo global: liberar viejo + reservar nuevo (misma transacción F17).
        let slots = slotsSnap.exists ? slotsSnap.data() : {};
        slots = globalRelease(slots, sol.fecha, sol.hora);
        try { slots = globalReserve(slots, fecha, hora); } catch (e) {
          throw new HttpsError('already-exists', e.message);
        }
        tx.set(slotsRef, slots);

        // Tupla: liberar bloques viejos SOLO si esta cita los retuvo (review
        // §184 — una pendiente o una confirmada-con-conflicto NO posee bloques;
        // liberarlos borraría los de OTRA cita) + reservar nuevos si hay
        // asignación (el estado resultante 'reprogramada' SÍ retiene).
        const newBlocks = blocksFor(hora, dur);
        const newDayData = newDaySnap.exists ? newDaySnap.data() : {};
        const oldDayData = sameDay ? newDayData : (oldDaySnap && oldDaySnap.exists ? oldDaySnap.data() : null);
        const wasHolder = holdsTuple(sol);
        if (sol.assignedTo || sol.vehicleAssignedId) {
          const base = (sameDay && wasHolder)
            ? (() => { // liberar primero EN MEMORIA para no chocar contra sí misma
              const clone = JSON.parse(JSON.stringify(newDayData));
              for (const id of [sol.assignedTo ? 'asesor_' + sol.assignedTo : null, sol.vehicleAssignedId ? 'vehiculo_' + sol.vehicleAssignedId : null]) {
                if (id && Array.isArray(clone[id])) clone[id] = clone[id].filter((b) => !oldBlocks.includes(b));
              }
              return clone;
            })()
            : newDayData;
          const conflicts = tupleConflicts(base, newBlocks, sol.assignedTo || null, sol.vehicleAssignedId || null);
          if (conflicts.length) {
            const c = conflicts[0];
            throw new HttpsError('already-exists', (c.kind === 'asesor'
              ? (sol.assignedToName || 'El asesor') + ' ya tiene una cita'
              : 'Ese vehículo ya está reservado') + ' a las ' + c.block + '. Elige otro horario.');
          }
          if (oldDayData && wasHolder) applyTupleRelease(tx, dayRefOf(sol.fecha), oldDayData, oldBlocks, sol.assignedTo || null, sol.vehicleAssignedId || null);
          applyTupleReserve(tx, dayRefOf(fecha), base, newBlocks, sol.assignedTo || null, sol.vehicleAssignedId || null);
        }

        tx.update(solRef, {
          fecha, hora, estado: 'reprogramada', startAt: computeStartAt(fecha, hora),
          confirmToken: newToken(), confirmTokenAt: now,            // C.4: token ROTADO
          reminder24hSentAt: FV.delete(), confirmDiaSentAt: FV.delete(),
          statusEmailSent_reprogramada: FV.delete(),                 // cada reprogramación re-avisa
          confirmedAt: FV.delete(), confirmedVia: FV.delete(),       // exige re-confirmación
          _tupleConflict: FV.delete(),
          updatedAt: now, updatedBy: staff.uid,
        });
        return { ok: true };
      }

      /* cancel / no_show / complete — cierran y LIBERAN */
      if (action === 'cancel' || action === 'no_show' || action === 'complete') {
        const target = action === 'cancel' ? 'cancelada' : action === 'no_show' ? 'no_show' : 'completada';
        if (sol.estado === target) return { ok: true, idempotent: true };
        if (!ESTADOS_ACTIVOS.includes(sol.estado)) {
          throw new HttpsError('failed-precondition', 'La cita ya no está activa (' + sol.estado + ').');
        }
        const reads = [tx.get(slotsRef)];
        if (sol.fecha) reads.push(tx.get(dayRefOf(sol.fecha)));
        const [slotsSnap, daySnap] = await Promise.all(reads);
        const slots = slotsSnap.exists ? slotsSnap.data() : {};
        tx.set(slotsRef, globalRelease(slots, sol.fecha, sol.hora));
        // Tupla: liberar SOLO si esta cita la retuvo (review §184).
        if (daySnap && daySnap.exists && holdsTuple(sol)) {
          applyTupleRelease(tx, dayRefOf(sol.fecha), daySnap.data(), oldBlocks, sol.assignedTo || null, sol.vehicleAssignedId || null);
        }
        const upd = { estado: target, updatedAt: now, updatedBy: staff.uid };
        if (action === 'cancel' && p.motivo) {
          upd.observaciones = (sol.observaciones ? sol.observaciones + '\n' : '') + 'Cancelada: ' + p.motivo;
        }
        if (action === 'no_show') {
          upd.noShowAt = now;
          upd.noShowHadConfirmed = !!sol.confirmedAt; // F18: registra si había confirmado
        }
        if (action === 'complete') upd.completedAt = now;
        tx.update(solRef, upd);
        return { ok: true, target, sol: { nombre: sol.nombre, fecha: sol.fecha, hora: sol.hora, assignedTo: sol.assignedTo, _leadId: sol._leadId, confirmedAt: sol.confirmedAt } };
      }

      /* delete — OLA-2.5: borrado DEFINITIVO owner-only. A diferencia de
       * cancel (que cierra), funciona sobre CUALQUIER estado; si la cita
       * está ACTIVA libera cupo global + tupla EN LA MISMA transacción
       * (borrar sin liberar dejaría el slot fantasma = double-booking
       * inverso; el mismo hazard del §188 kind:'cita'). */
      if (action === 'delete') {
        if (!staff.isSuper) throw new HttpsError('permission-denied', 'Solo el dueño puede eliminar citas.');
        if (ESTADOS_ACTIVOS.includes(sol.estado)) {
          const reads = [tx.get(slotsRef)];
          if (sol.fecha) reads.push(tx.get(dayRefOf(sol.fecha)));
          const [slotsSnap, daySnap] = await Promise.all(reads);
          const slots = slotsSnap.exists ? slotsSnap.data() : {};
          tx.set(slotsRef, globalRelease(slots, sol.fecha, sol.hora));
          if (daySnap && daySnap.exists && holdsTuple(sol)) {
            applyTupleRelease(tx, dayRefOf(sol.fecha), daySnap.data(), oldBlocks, sol.assignedTo || null, sol.vehicleAssignedId || null);
          }
        }
        tx.delete(solRef);
        // Sin esto la Agenda muestra una cita fantasma cuyo click da "lead
        // no disponible" (onSolicitudWritten CONSERVA la proyección en
        // deletes — correcto para el flujo normal, no para un borrado).
        tx.delete(db.collection('activities').doc('cita_' + solicitudId));
        return { ok: true, deleted: true };
      }

      throw new HttpsError('invalid-argument', 'Acción desconocida: ' + action);
    });

    // F18: no_show crea el follow-up de recuperación (ID determinista —
    // retries no duplican; fuera de la tx: la activity no exige atomicidad).
    if (result && result.target === 'no_show') {
      const s = result.sol || {};
      await db.collection('activities').doc('noshow_' + solicitudId).set({
        type: 'tarea', kind: 'system', status: 'open', direction: 'outbound',
        subject: '📞 No asistió — llamar a ' + (s.nombre || 'cliente'),
        body: 'La cita del ' + (s.fecha || '') + ' ' + (s.hora || '') + ' quedó en no-show'
          + (s.confirmedAt ? ' (HABÍA confirmado).' : ' (nunca confirmó).'),
        dueAt: nextMorningISO(Date.now()),
        relatedTo: { type: 'lead', id: s._leadId || null, name: s.nombre || 'Cliente' },
        ownerId: s.assignedTo || null,
        sourceSolicitudId: solicitudId,
        createdAt: nowISO(), _version: 1,
      }, { merge: true });
    }
    return result;
  }
);

/* ── HTTP pública: el cliente confirma desde el link (WhatsApp-first) ──
 * Review §184: (a) TODO dato del doc se ESCAPA (XSS reflejado) + CSP;
 * (b) el GET es SOLO-LECTURA (página con botón) y la mutación exige POST —
 * los prefetchers de WhatsApp/escáneres de email ya no auto-confirman;
 * (c) idempotencia DENTRO de la tx (GETs/POSTs concurrentes no marcan
 * _tupleConflict falso); (d) 'reprogramada' YA retiene su tupla → no se
 * re-reserva contra sí misma. */

function confirmHtml(title, bodyHtml, ok) {
  return '<!DOCTYPE html><html lang="es"><head><meta charset="utf-8">'
    + '<meta name="viewport" content="width=device-width,initial-scale=1">'
    + '<meta name="robots" content="noindex"><title>' + esc(title) + ' — ALTORRA CARS</title></head>'
    + '<body style="margin:0;font-family:Arial,sans-serif;background:#101014;color:#eee;display:grid;place-items:center;min-height:100vh;padding:24px;text-align:center">'
    + '<div style="max-width:420px"><div style="font-size:44px">' + (ok ? '✅' : '🤔') + '</div>'
    + '<h1 style="color:#b89658;font-size:1.3rem;margin:12px 0">' + esc(title) + '</h1>'
    + '<div style="line-height:1.5;opacity:.85">' + bodyHtml + '</div>'
    + '<p style="margin-top:24px"><a href="https://altorracars.github.io" style="color:#b89658">ALTORRA CARS</a></p>'
    + '</div></body></html>';
}

const citaConfirm = onRequest(
  { region: 'us-central1', invoker: 'public', cors: true, secrets: [telegramBotToken] },
  async (req, res) => {
    const db = admin.firestore();
    res.set('Content-Security-Policy', "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'");
    const src = req.method === 'POST' ? (req.body || {}) : (req.query || {});
    const id = src.id; const t = src.t; const c = src.c;
    const fail = (msg) => res.status(410).send(confirmHtml('Enlace no válido', '<p>' + esc(msg) + '</p>', false));
    if (!id || !t) return fail('Este enlace no es válido. Escríbenos por WhatsApp y te ayudamos.');

    const solRef = db.collection('solicitudes').doc(String(id));
    const snap = await solRef.get();
    if (!snap.exists) return fail('No encontramos esta cita. Escríbenos por WhatsApp y te ayudamos.');
    const sol = snap.data();
    const tokenOk = typeof sol.confirmToken === 'string' && sol.confirmToken.length >= 16
      && String(t).length === sol.confirmToken.length
      && crypto.timingSafeEqual(Buffer.from(String(t)), Buffer.from(sol.confirmToken));
    if (!(sol.kind === 'cita' || sol.requiereCita === true) || !tokenOk) {
      return fail('Este enlace ya no es válido (puede que la cita se haya reprogramado — revisa el último mensaje que te enviamos).');
    }
    const cuando = esc((sol.fecha || '') + (sol.hora ? ' a las ' + sol.hora : ''));
    if (sol.estado === 'confirmada') {
      return res.send(confirmHtml('¡Ya estaba confirmada!', '<p>Tu cita del ' + cuando + ' ya está confirmada. ¡Te esperamos!</p>', true));
    }
    if (!ESTADOS_ACTIVOS.includes(sol.estado)) {
      return fail('Esta cita ya no está activa. Si quieres reagendar, escríbenos por WhatsApp.');
    }
    if (sol.startAt && sol.startAt < nowISO()) {
      return fail('Esta cita ya pasó. Si quieres una nueva, agéndala en la web o escríbenos.');
    }

    // GET = intersticial SIN efectos (los previews de WhatsApp solo hacen GET).
    if (req.method !== 'POST') {
      return res.send(confirmHtml('Confirma tu cita',
        '<p>Hola' + (sol.nombre ? ', <strong>' + esc(sol.nombre) + '</strong>' : '') + '. Tu cita es el <strong>' + cuando + '</strong>'
        + (sol.vehiculo ? ' para ver el <strong>' + esc(sol.vehiculo) + '</strong>' : '') + '.</p>'
        + '<form method="POST" action="' + CONFIRM_URL + '" style="margin-top:20px">'
        + '<input type="hidden" name="id" value="' + esc(String(id)) + '">'
        + '<input type="hidden" name="t" value="' + esc(String(t)) + '">'
        + '<input type="hidden" name="c" value="' + esc(String(c || 'wa')) + '">'
        + '<button type="submit" style="background:#b89658;color:#fff;border:0;padding:14px 32px;border-radius:10px;font-size:1rem;font-weight:bold;cursor:pointer">✅ Confirmar mi cita</button>'
        + '</form>', true));
    }

    let conflict = false;
    let already = false;
    await db.runTransaction(async (tx) => {
      const s2 = await tx.get(solRef);
      const cur = s2.data();
      if (!cur || cur.confirmToken !== String(t) || !ESTADOS_ACTIVOS.includes(cur.estado)) { already = true; return; }
      if (cur.estado === 'confirmada') { already = true; return; } // idempotente EN la tx
      const upd = {
        estado: 'confirmada', confirmedAt: nowISO(),
        confirmedVia: c === 'em' ? 'email_link' : 'whatsapp_link',
        updatedAt: nowISO(),
      };
      // Tupla best-effort SOLO para 'pendiente' (una 'reprogramada' ya posee
      // sus bloques — re-chequearlos sería chocar contra sí misma). Si choca,
      // NO se rompe la confirmación del cliente: flag + el asesor decide.
      if (cur.estado === 'pendiente' && cur.assignedTo && cur.fecha && cur.hora) {
        const dayRef = db.collection('resource_slots').doc(cur.fecha);
        const daySnap = await tx.get(dayRef);
        const dayData = daySnap.exists ? daySnap.data() : {};
        const blocks = blocksFor(cur.hora, Number.isFinite(cur.duracionMin) ? cur.duracionMin : 60);
        const conflicts = tupleConflicts(dayData, blocks, cur.assignedTo, cur.vehicleAssignedId || null);
        if (conflicts.length) { conflict = true; upd._tupleConflict = true; } else {
          applyTupleReserve(tx, dayRef, dayData, blocks, cur.assignedTo, cur.vehicleAssignedId || null);
        }
      }
      tx.update(solRef, upd);
    });

    if (already) {
      return res.send(confirmHtml('¡Ya estaba confirmada!', '<p>Tu cita del ' + cuando + ' ya está confirmada. ¡Te esperamos!</p>', true));
    }
    if (conflict && sol.assignedTo) {
      try {
        const notify = require('../ops/notify');
        await notify.criticalAlert(db, telegramBotToken.value(), {
          targetUid: sol.assignedTo,
          text: '⚠️ *Cliente confirmó pero el horario CHOCA*\n' + (sol.nombre || '') + ' · ' + ((sol.fecha || '') + ' ' + (sol.hora || ''))
            + '\nTu agenda ya tiene ese bloque ocupado — revisa y reprograma una de las dos.',
          url: 'https://altorracars.github.io/admin-app/dist/#/agenda', urlLabel: 'Abrir Agenda',
          type: 'cita_tuple_conflict', meta: { solicitudId: String(id) },
        });
      } catch (e) { console.warn('[citaConfirm] alerta de conflicto no enviada:', e.message); }
    }

    return res.send(confirmHtml('¡Cita confirmada!',
      '<p>Gracias' + (sol.nombre ? ', ' + esc(sol.nombre) : '') + '. Tu cita del ' + cuando + ' quedó confirmada. ¡Te esperamos!</p>', true));
  }
);

module.exports = {
  crmCitaAction, citaConfirm,
  // internos puros/transaccionales expuestos para tests (carrera C.5)
  _internals: { tupleConflicts, applyTupleReserve, applyTupleRelease, reserveTupleTransaction, moveAdvisorBlocks, globalRelease, globalReserve },
};
