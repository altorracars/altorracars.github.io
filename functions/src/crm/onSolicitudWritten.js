'use strict';

const { onDocumentWritten } = require('firebase-functions/v2/firestore');
const admin = require('firebase-admin');
const { computeStartAt } = require('../../shared/business-hours');

/**
 * onSolicitudWritten — F16 (ADR §182, E2): la solicitud `kind:'cita'` es la
 * SSoT; la Agenda del portal la ve vía una PROYECCIÓN read-only en
 * `activities/cita_{solicitudId}` (ID determinista → create-or-update, los
 * retries no duplican).
 *
 *  - Computa `startAt` canónico (UTC desde fecha+hora, offset -05:00 fijo)
 *    y lo escribe en la solicitud (los rangos/índices usan startAt; los
 *    strings quedan de presentación).
 *  - Anti-bucle: si la solicitud necesita startAt se escribe SOLO eso y se
 *    retorna — la re-invocación (startAt ya consistente) hace la proyección.
 *  - Orden/idempotencia (B.4): la proyección guarda sourceUpdatedAt
 *    (= updateTime del doc) y descarta eventos <= al aplicado.
 *  - Cancelada/completada/no_show/caducada → la activity se cierra (la
 *    Agenda deja de mostrarla como pendiente) SIN borrarla (historial).
 */

const ESTADOS_ACTIVOS = ['pendiente', 'confirmada', 'reprogramada'];

/** Mapper PURO solicitud→activity de cita (testeable sin Firebase). */
function citaProjection(sol, solId, startAt, sourceUpdatedAt) {
  const estado = sol.estado || 'pendiente';
  return {
    type: 'cita',
    kind: 'web',
    subject: 'Cita: ' + (sol.tipo || 'visita') + (sol.vehiculo ? ' · ' + sol.vehiculo : ''),
    body: String(sol.mensaje || sol.comentarios || ''),
    status: ESTADOS_ACTIVOS.includes(estado) ? 'open' : 'closed',
    estadoCita: estado,
    direction: 'inbound',
    dueAt: startAt,            // la Agenda consulta dueAt por rango (L-30)
    startAt,
    relatedTo: { type: 'lead', id: sol._leadId || null, name: sol.nombre || 'Cliente' },
    ownerId: sol.assignedTo || null,
    sourceSolicitudId: solId,
    sourceUpdatedAt,
    _version: 1,
  };
}

const onSolicitudWritten = onDocumentWritten(
  { document: 'solicitudes/{solicitudId}', region: 'us-central1', maxInstances: 10 },
  async (event) => {
    const after = event.data.after.exists ? event.data.after.data() : null;
    if (!after) return; // delete: la activity histórica se queda (purga = F15/F28)
    const solId = event.params.solicitudId;
    const db = admin.firestore();

    const isCita = after.kind === 'cita' || after.requiereCita === true;
    if (!isCita) return;

    const desired = computeStartAt(after.fecha, after.hora);
    if (!desired) return; // cita sin fecha/hora aún — nada que proyectar

    // Paso 1 (anti-bucle): startAt consistente en la SSoT primero.
    if (after.startAt !== desired) {
      await event.data.after.ref.update({ startAt: desired });
      return; // la re-invocación proyecta con el doc ya consistente
    }

    // Paso 2: proyección idempotente y ordenada.
    const updateTime = event.data.after.updateTime.toDate().toISOString();
    const actRef = db.collection('activities').doc('cita_' + solId);
    await db.runTransaction(async (tx) => {
      const snap = await tx.get(actRef);
      if (snap.exists) {
        const prev = snap.data().sourceUpdatedAt || '';
        if (prev >= updateTime) return; // evento viejo o retry: descartar
      }
      const proj = citaProjection(after, solId, desired, updateTime);
      if (!snap.exists) proj.createdAt = after.createdAt || updateTime;
      tx.set(actRef, proj, { merge: true });
    });
  }
);

module.exports = { onSolicitudWritten, citaProjection, ESTADOS_ACTIVOS };
