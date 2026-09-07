'use strict';

const { onSchedule } = require('firebase-functions/v2/scheduler');
const admin = require('firebase-admin');
const { normalizeSolicitud, intakeToCanonical } = require('./normalize');
const { ingestLeadTransaction } = require('./ingestLead');

/**
 * reprocessFailedIngestions.js — REPROCESADOR del dead-letter (F-5, §4 + plan
 * §9.B.4). Cierra la fuga: "`failedIngestions` sin reprocesador → un fallo
 * persistente deja un lead real fuera del CRM indefinidamente".
 *
 * Cloud Functions reintenta con backoff (retry:true) pero ACOTADO: tras
 * agotarse, el doc queda `resolved:false` y nadie lo vuelve a tocar. Este job
 * recorre el DLQ cada 30 min y RE-EJECUTA la ingestión por la MISMA ruta
 * compartida (normalize + ingestLeadTransaction) — idempotente vía `_ingestedAt`
 * (un source ya ingerido = no-op total). Recupera además el BACKLOG de chats
 * anónimos que fallaban antes del fix `session:ID` (el trigger solo dispara en
 * docs NUEVOS, no re-procesa los viejos).
 *
 * Bounded (anti factura runaway, Consejo Externo R2): BATCH por corrida +
 * MAX_ATTEMPTS por doc → tras N reprocesos sin éxito se marca
 * `needsManualReview` (deja de intentar; señal para intervención humana).
 */

const POLICY_VERSION = 'v1';
const MAX_ATTEMPTS = 10; // reprocesos sin éxito antes de needsManualReview
const BATCH = 25;        // docs examinados por corrida (acota gasto)

// Dispatch por colección de origen → su normalizador. SOLO las fuentes
// portadoras de LEAD (la fuga §4 real: solicitudes web + lead rápido).
// Otras (clientes/subscriptions = contact-only) → needsManualReview.
const NORMALIZERS = {
  solicitudes: (data, id) => normalizeSolicitud(data, id, POLICY_VERSION),
  lead_intake: (data, id) => intakeToCanonical(data, id, POLICY_VERSION),
};

/**
 * Reprocesa UN doc del DLQ. Devuelve un estado: 'resolved' | 'failed' |
 * 'manual' | 'skipped'. NO lanza (cada doc es independiente). Exportada para test.
 */
async function reprocessOne(db, dlqRef, dlq) {
  const nowIso = new Date().toISOString();
  const attempts = dlq.reprocessAttempts || 0;

  // Ya tope/manual → no re-tocar (evita write churn + no roba slot de trabajo real).
  if (dlq.needsManualReview || attempts >= MAX_ATTEMPTS) return 'skipped';

  const { sourceCollection, sourceId } = dlq;
  const normalizer = NORMALIZERS[sourceCollection];
  if (!sourceCollection || !sourceId || !normalizer) {
    await dlqRef.set({
      needsManualReview: true, lastReprocessAt: nowIso,
      lastReprocessError: 'fuente no reprocesable automáticamente: ' + (sourceCollection || '∅'),
    }, { merge: true });
    return 'manual';
  }

  const srcRef = db.collection(sourceCollection).doc(sourceId);
  const srcSnap = await srcRef.get();
  // Source ausente / suprimido (Ley 1581) / ya ingerido → resuelto (nada que recuperar).
  if (!srcSnap.exists) {
    await dlqRef.set({ resolved: true, resolvedAt: nowIso, resolvedBy: 'reprocessor', resolvedReason: 'source-deleted' }, { merge: true });
    return 'resolved';
  }
  const src = srcSnap.data();
  if (src._suppressed === true) {
    await dlqRef.set({ resolved: true, resolvedAt: nowIso, resolvedBy: 'reprocessor', resolvedReason: 'suppressed' }, { merge: true });
    return 'resolved';
  }
  if (src._ingestedAt) {
    await dlqRef.set({ resolved: true, resolvedAt: nowIso, resolvedBy: 'reprocessor', resolvedReason: 'already-ingested' }, { merge: true });
    return 'resolved';
  }

  try {
    const canonical = normalizer(src, sourceId);
    const result = await ingestLeadTransaction(db, canonical, srcRef);
    await dlqRef.set({
      resolved: true, resolvedAt: nowIso, resolvedBy: 'reprocessor',
      resolvedLeadId: (result && result.leadId) || null,
      resolvedReason: (result && result.alreadyIngested) ? 'already-ingested' : 'reprocessed',
    }, { merge: true });
    return 'resolved';
  } catch (err) {
    const next = attempts + 1;
    await dlqRef.set({
      reprocessAttempts: next, lastReprocessAt: nowIso,
      lastReprocessError: String((err && err.message) || err),
      needsManualReview: next >= MAX_ATTEMPTS,
    }, { merge: true });
    return 'failed';
  }
}

exports.crmReprocessFailedIngestions = onSchedule(
  { schedule: 'every 30 minutes', timeZone: 'America/Bogota', region: 'us-central1', maxInstances: 1, retry: false, timeoutSeconds: 300 },
  async () => {
    const db = admin.firestore();
    const snap = await db.collection('failedIngestions').where('resolved', '==', false).limit(BATCH).get();
    if (snap.empty) { console.log('[crmReprocessFailedIngestions] DLQ vacío — nada que reprocesar'); return; }
    const tally = { resolved: 0, failed: 0, manual: 0, skipped: 0 };
    for (const d of snap.docs) {
      try {
        const r = await reprocessOne(db, d.ref, d.data());
        tally[r] = (tally[r] || 0) + 1;
      } catch (e) {
        console.error('[crmReprocessFailedIngestions] error inesperado en', d.id, ':', e.message);
        tally.failed++;
      }
    }
    console.log('[crmReprocessFailedIngestions]', JSON.stringify({ examined: snap.size, ...tally }));
  }
);

// Export del helper puro para test unitario (emulador).
exports._reprocessOne = reprocessOne;
exports._MAX_ATTEMPTS = MAX_ATTEMPTS;
