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
  // §187 retry:true: upsert por dedup + consent solo-sube — idempotente
  // material (peor caso: bump espurio de _version/updatedAt).
  { document: 'subscriptions/{subId}', region: 'us-central1', maxInstances: 10, retry: true },
  async (event) => {
    const snap = event.data;
    if (!snap) return;
    const sub = snap.data();
    const subId = event.params.subId;
    const db = admin.firestore();

    if (sub._ingestedAt) return; // idempotencia

    try {
      const { contactId, contact } = subscriptionToContact(sub, POLICY_VERSION);
      const given = sub.consentGiven === true;
      // F40e §185: resolver vía índice dedup (mismo patrón que ingestLead) —
      // jamás duplicar a un contacto cuyo email fue editado ni resucitar a
      // un suprimido (B.3).
      const { dedupKeysFor } = require('../crm/contactGraph');
      const wantedKeys = dedupKeysFor(contact);

      await db.runTransaction(async (tx) => {
        // §187 (review #13): PRIMERA lectura = el doc ORIGEN — el payload del
        // evento es inmutable en re-entregas (retry:true) y su _ingestedAt
        // miente; sin esto, la rama suprimido/fusión-rota duplicaba contactos.
        const fresh = await tx.get(snap.ref);
        if (!fresh.exists || fresh.data()._ingestedAt) return;
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
          contactRef = db.collection('contacts').doc();
          doc = { exists: false };
        }

        if (!doc.exists) {
          tx.set(contactRef, { ...contact, dedupKeys: wantedKeys }); // nuevo suscriptor
        } else {
          // Contacto existente que se suscribe → SOLO SUBE consentimiento,
          // nunca lo baja (una suscripción sin consent NO debe degradar un
          // opt-in previo de otro canal; Ley 1581). Sin pisar first-seen.
          const upd = {
            tags: admin.firestore.FieldValue.arrayUnion('newsletter'),
            lastActivityAt: contact.lastActivityAt,
            updatedAt: contact.updatedAt,
            _version: admin.firestore.FieldValue.increment(1),
          };
          if (given) { upd['consent.email'] = true; upd.doNotContact = false; }
          tx.update(contactRef, upd);
        }
        for (const e of keySnaps) {
          if (!e.snap.exists) {
            tx.set(db.collection('dedup').doc(e.key), {
              contactId: contactRef.id, createdAt: new Date().toISOString(),
            });
          }
        }
        tx.update(snap.ref, { _ingestedAt: new Date().toISOString() });
      });
    } catch (err) {
      // §187: ID determinista — con retry:true, .add() inundaría el dead-letter.
      try {
        await db.collection('failedIngestions').doc('subscriptions_' + subId).set({
          sourceCollection: 'subscriptions', sourceId: subId,
          error: String(err && err.message || err),
          payload: sub, createdAt: new Date().toISOString(), resolved: false,
          retries: admin.firestore.FieldValue.increment(1),
        }, { merge: true });
      } catch (dlqErr) { // review #15: el DLQ jamás enmascara el error original
        console.error('[dead-letter subscriptions] no registrado:', dlqErr.message, '— original:', String(err && err.message || err));
      }
      throw err;
    }
  }
);
