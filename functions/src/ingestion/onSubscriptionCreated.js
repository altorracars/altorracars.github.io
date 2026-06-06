'use strict';

const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const admin = require('firebase-admin');
const { subscriptionToContact } = require('./normalize');

const POLICY_VERSION = 'v1';

/**
 * Ingesta cada `subscriptions/{id}` (newsletter) al modelo canónico:
 *  - upsert de `contacts` por email (dedup);
 *  - si el contacto YA existe (un lead/cliente que ahora se suscribe) →
 *    captura el opt-in de email EXPRESO + tag `newsletter`, SIN pisar
 *    first-seen/score/owner. (Subscribirse = consentimiento de email, Ley 1581.)
 *  - NO crea lead (un suscriptor no es intención de compra).
 *  - idempotente (`_ingestedAt`), atómico, dead-letter.
 */
exports.onSubscriptionCreated = onDocumentCreated(
  { document: 'subscriptions/{subId}', region: 'us-central1', maxInstances: 10 },
  async (event) => {
    const snap = event.data;
    if (!snap) return;
    const sub = snap.data();
    const subId = event.params.subId;
    const db = admin.firestore();

    if (sub._ingestedAt) return; // idempotencia

    try {
      const { contactId, contact } = subscriptionToContact(sub, POLICY_VERSION);
      const contactRef = db.collection('contacts').doc(contactId);
      const given = sub.consentGiven === true;

      await db.runTransaction(async (tx) => {
        const doc = await tx.get(contactRef);
        if (!doc.exists) {
          tx.set(contactRef, contact); // nuevo suscriptor
        } else {
          // Contacto existente que se suscribe → SOLO SUBE consentimiento,
          // nunca lo baja (una suscripción sin consent NO debe degradar un
          // opt-in previo de otro canal; Ley 1581). Sin pisar first-seen.
          const upd = {
            tags: admin.firestore.FieldValue.arrayUnion('newsletter'),
            lastActivityAt: contact.lastActivityAt,
            updatedAt: contact.updatedAt,
          };
          if (given) { upd['consent.email'] = true; upd.doNotContact = false; }
          tx.update(contactRef, upd);
        }
        tx.update(snap.ref, { _ingestedAt: new Date().toISOString() });
      });
    } catch (err) {
      await db.collection('failedIngestions').add({
        sourceCollection: 'subscriptions', sourceId: subId,
        error: String(err && err.message || err),
        payload: sub, createdAt: new Date().toISOString(), retries: 0, resolved: false,
      });
      throw err;
    }
  }
);
