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
  { document: 'lead_intake/{intakeId}', region: 'us-central1', maxInstances: 10 },
  async (event) => {
    const snap = event.data;
    if (!snap) return;
    const intake = snap.data();
    const intakeId = event.params.intakeId;
    const db = admin.firestore();

    // Idempotencia: si ya se ingirió, salir.
    if (intake._ingestedAt) return;

    try {
      const canonical = intakeToCanonical(intake, intakeId, POLICY_VERSION);
      await ingestLeadTransaction(db, canonical, snap.ref);
    } catch (err) {
      // Dead-letter: cero pérdida (mismo patrón que onSolicitudCreated).
      await db.collection('failedIngestions').add({
        sourceCollection: 'lead_intake', sourceId: intakeId,
        error: String(err && err.message || err),
        payload: intake, createdAt: new Date().toISOString(), retries: 0, resolved: false,
      });
      throw err; // relanza → retry con backoff
    }
  }
);
