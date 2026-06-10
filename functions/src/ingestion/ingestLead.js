'use strict';

const { sanitizeContactId } = require('./normalize');

/**
 * ingestLead.js — transacción de ALTA al canónico, COMPARTIDA (F36, ADR §178).
 *
 * Única ruta de alta de contact+lead+activity (la usan onSolicitudCreated y
 * onLeadIntakeCreated — cero lógica duplicada, mismo dedup):
 *  - upsert de `contacts` por dedupKey SIN pisar first-seen/volátiles
 *    (createdAt/score/rating/ownerId/lifecycleStage de un contacto que regresa),
 *  - crea `leads` + `activities` enlazados,
 *  - marca idempotencia en el doc ORIGEN dentro de la MISMA transacción
 *    (todo-o-nada → cero duplicados ante reintentos at-least-once).
 *
 * @param db        admin.firestore()
 * @param canonical {dedupKey, contact, lead, activity} de normalize.js
 * @param sourceRef DocumentReference del doc de entrada (solicitud / intake)
 * @returns {contactId, leadId}
 */
async function ingestLeadTransaction(db, canonical, sourceRef) {
  const { dedupKey, contact, lead, activity } = canonical;
  const contactId = sanitizeContactId(dedupKey);
  const contactRef = db.collection('contacts').doc(contactId);
  const leadRef = db.collection('leads').doc();
  const activityRef = db.collection('activities').doc();
  activity.relatedTo.id = leadRef.id;
  lead.contactId = contactId;

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
    tx.update(sourceRef, { _ingestedAt: new Date().toISOString(), _leadId: leadRef.id });
  });

  return { contactId, leadId: leadRef.id };
}

module.exports = { ingestLeadTransaction };
