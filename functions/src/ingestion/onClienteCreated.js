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
      // F40e §185: resolver vía índice dedup — un contacto cuyo email fue
      // EDITADO (F12) se vincula en vez de duplicarse.
      const { dedupKeysFor } = require('../crm/contactGraph');
      const wantedKeys = dedupKeysFor(contact);

      await db.runTransaction(async (tx) => {
        const keySnaps = [];
        for (const k of wantedKeys) {
          keySnaps.push({ key: k, snap: await tx.get(db.collection('dedup').doc(k)) });
        }
        const hit = keySnaps.find((e) => e.snap.exists);
        let contactRef = db.collection('contacts').doc(hit ? hit.snap.data().contactId : contactId);
        let doc = await tx.get(contactRef);
        let cData = doc.exists ? doc.data() : null;
        let hops = 0;
        while (cData && cData._mergedInto && hops < 3) { // cadena acotada, re-validando
          contactRef = db.collection('contacts').doc(cData._mergedInto);
          doc = await tx.get(contactRef);
          cData = doc.exists ? doc.data() : null;
          hops++;
        }
        if ((cData && (cData._suppressed === true || cData.suppressionStatus === 'pendiente_supresion'))
          || (!doc.exists && hops > 0)) {
          contactRef = db.collection('contacts').doc(); // B.3: jamás resucitar
          doc = { exists: false };
        }

        if (!doc.exists) {
          tx.set(contactRef, { ...contact, dedupKeys: wantedKeys });
        } else {
          // Contacto existente (invitado que ahora se registra) → VINCULAR la
          // cuenta sin pisar first-seen ni campos volátiles (score/owner/etc.).
          tx.update(contactRef, {
            clienteUid: uid,
            lastActivityAt: contact.lastActivityAt,
            updatedAt: contact.updatedAt,
            _version: admin.firestore.FieldValue.increment(1),
          });
        }
        for (const e of keySnaps) {
          if (!e.snap.exists) {
            tx.set(db.collection('dedup').doc(e.key), {
              contactId: contactRef.id, createdAt: new Date().toISOString(),
            });
          }
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
