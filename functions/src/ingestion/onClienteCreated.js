'use strict';

const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const admin = require('firebase-admin');
const { clienteToContact } = require('./normalize');

const POLICY_VERSION = 'v1';

/**
 * Ingesta cada `clientes/{uid}` nuevo (registro de cuenta pública) al modelo
 * canónico: upsert de `contacts` por dedupKey (email→teléfono).
 *  - Si el contacto YA existe (p.ej. dejó un lead antes de registrarse) →
 *    se VINCULA la cuenta (clienteUid) SIN pisar first-seen/volátiles. Fusión.
 *  - NO crea lead (registrarse ≠ intención de compra; no contamina la Bandeja).
 *  - Idempotente (`_crmIngested`); todo atómico; error → dead-letter.
 * maxInstances acota el gasto (anti factura runaway).
 */
exports.onClienteCreated = onDocumentCreated(
  { document: 'clientes/{uid}', region: 'us-central1', maxInstances: 10 },
  async (event) => {
    const snap = event.data;
    if (!snap) return;
    const cliente = snap.data();
    const uid = event.params.uid;
    const db = admin.firestore();

    if (cliente._crmIngested) return; // idempotencia

    try {
      const { contactId, contact } = clienteToContact(cliente, uid, POLICY_VERSION);
      const contactRef = db.collection('contacts').doc(contactId);

      await db.runTransaction(async (tx) => {
        const doc = await tx.get(contactRef);
        if (!doc.exists) {
          tx.set(contactRef, contact); // primer contacto: shape completo
        } else {
          // Contacto existente (invitado que ahora se registra) → VINCULAR la
          // cuenta sin pisar first-seen ni campos volátiles (score/owner/etc.).
          tx.update(contactRef, {
            clienteUid: uid,
            lastActivityAt: contact.lastActivityAt,
            updatedAt: contact.updatedAt,
          });
        }
        tx.update(snap.ref, { _crmIngested: new Date().toISOString() });
      });
    } catch (err) {
      await db.collection('failedIngestions').add({
        sourceCollection: 'clientes', sourceId: uid,
        error: String(err && err.message || err),
        payload: cliente, createdAt: new Date().toISOString(), retries: 0, resolved: false,
      });
      throw err; // relanza → reintento con backoff
    }
  }
);
