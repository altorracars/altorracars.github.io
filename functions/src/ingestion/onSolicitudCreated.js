'use strict';

const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const admin = require('firebase-admin');
const { normalizeSolicitud } = require('./normalize');

const POLICY_VERSION = 'v1'; // versión vigente de la política de tratamiento

/**
 * Ingesta cada `solicitudes/{id}` nueva al modelo canónico:
 *  - upsert de `contacts` por dedupKey SIN pisar campos first-seen/volátiles,
 *  - crea `leads` + `activities` enlazados,
 *  - idempotente (flag `_ingestedAt`, marcado DENTRO de la transacción),
 *  - todo atómico (transacción) → cero duplicados ante reintentos,
 *  - cualquier error → `failedIngestions` (dead-letter) y se relanza para retry.
 * maxInstances acota el gasto (anti factura runaway — Consejo Externo R2).
 */
exports.onSolicitudCreated = onDocumentCreated(
  { document: 'solicitudes/{solicitudId}', region: 'us-central1', maxInstances: 10 },
  async (event) => {
    const snap = event.data;
    if (!snap) return;
    const sol = snap.data();
    const solId = event.params.solicitudId;
    const db = admin.firestore();

    // Idempotencia: si ya se ingirió, salir.
    if (sol._ingestedAt) return;

    try {
      const { dedupKey, contact, lead, activity } = normalizeSolicitud(sol, solId, POLICY_VERSION);

      // IDs: determinístico (contacto, para dedup) / auto (lead, activity).
      const contactId = dedupKey.replace(/[^a-z0-9]/gi, '_').slice(0, 480);
      const contactRef = db.collection('contacts').doc(contactId);
      const leadRef = db.collection('leads').doc();
      const activityRef = db.collection('activities').doc();
      activity.relatedTo.id = leadRef.id;
      lead.contactId = contactId;

      // Transacción atómica: upsert de contacto SIN pisar first-seen ni campos
      // volátiles (createdAt/score/rating/ownerId/lifecycleStage) de un contacto
      // que regresa, + lead + activity + marca de idempotencia — todo o nada.
      // Elimina la ventana de lead/activity duplicados ante reintentos.
      await db.runTransaction(async (tx) => {
        const contactDoc = await tx.get(contactRef);
        if (!contactDoc.exists) {
          tx.set(contactRef, contact); // primer contacto: shape completo
        } else {
          // contacto recurrente: solo refrescar actividad reciente.
          tx.update(contactRef, {
            lastActivityAt: contact.lastActivityAt,
            updatedAt: contact.updatedAt,
          });
        }
        tx.set(leadRef, lead);
        tx.set(activityRef, activity);
        tx.update(snap.ref, { _ingestedAt: new Date().toISOString(), _leadId: leadRef.id });
      });
    } catch (err) {
      // Dead-letter: cero pérdida de información (Consejo Externo R4).
      await db.collection('failedIngestions').add({
        sourceCollection: 'solicitudes', sourceId: solId,
        error: String(err && err.message || err),
        payload: sol, createdAt: new Date().toISOString(), retries: 0, resolved: false,
      });
      throw err; // relanza → Cloud Functions reintenta con backoff
    }
  }
);
