'use strict';

const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const admin = require('firebase-admin');
const { intakeToCanonical } = require('./normalize');
const { ingestLeadTransaction } = require('./ingestLead');

const POLICY_VERSION = 'v1';

/**
 * F36 (ADR §178, E1a) — Lead rápido: ingesta cada `lead_intake/{id}` al
 * modelo canónico por la MISMA ruta compartida que las solicitudes web
 * (ingestLead.js): dedup transaccional, idempotencia `_ingestedAt` dentro
 * de la transacción, dead-letter en error.
 *
 * El asesor escribe el doc desde el portal (funciona OFFLINE: la persistencia
 * de Firestore lo encola y sincroniza al volver la señal — por eso es un
 * DOCUMENTO y no una callable). Owner = quien lo registró (rules lo fuerzan).
 */
exports.onLeadIntakeCreated = onDocumentCreated(
  // §187 retry:true: seguro porque ingestLeadTransaction ahora lee el doc
  // ORIGEN dentro de la tx (el _ingestedAt del payload del evento miente
  // en re-entregas) — un retry post-commit es no-op total.
  { document: 'lead_intake/{intakeId}', region: 'us-central1', maxInstances: 10, retry: true },
  async (event) => {
    const snap = event.data;
    if (!snap) return;
    const intake = snap.data();
    const intakeId = event.params.intakeId;
    const db = admin.firestore();

    // Fast-path (la verdad la re-verifica la transacción contra el doc).
    if (intake._ingestedAt) return;

    try {
      const canonical = intakeToCanonical(intake, intakeId, POLICY_VERSION);
      await ingestLeadTransaction(db, canonical, snap.ref);
    } catch (err) {
      // Dead-letter con ID DETERMINISTA (§187): con retry:true, un .add()
      // metía OTRO doc por reintento (flood); set+merge actualiza el mismo.
      try {
        await db.collection('failedIngestions').doc('lead_intake_' + intakeId).set({
          sourceCollection: 'lead_intake', sourceId: intakeId,
          error: String(err && err.message || err),
          payload: intake, createdAt: new Date().toISOString(), resolved: false,
          retries: admin.firestore.FieldValue.increment(1),
        }, { merge: true });
      } catch (dlqErr) { // review #15: el DLQ jamás enmascara el error original
        console.error('[dead-letter lead_intake] no registrado:', dlqErr.message, '— original:', String(err && err.message || err));
      }
      throw err; // relanza → retry con backoff
    }
  }
);
