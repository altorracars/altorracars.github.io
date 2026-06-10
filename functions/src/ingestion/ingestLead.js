'use strict';

const { sanitizeContactId } = require('./normalize');
const { pickFromRotation } = require('../../shared/business-hours');
const { advisorOverrideFor, bogotaDayKey } = require('../../shared/cita-blocks');

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

  const intakeCfgRef = db.collection('config').doc('crmIntake');

  await db.runTransaction(async (tx) => {
    // F37b §179 — owner OBLIGATORIO al ingerir: si el lead llega sin dueño
    // (web), se asigna por round-robin desde config/crmIntake.rotation,
    // DENTRO de la transacción (dos leads simultáneos no repiten turno).
    // Sin config → ownerId null (comportamiento previo, intacto).
    let rotationNext = null;
    if (!lead.ownerId) {
      const [cfgSnap, ovSnap] = await Promise.all([
        tx.get(intakeCfgRef),
        tx.get(db.collection('crm_config').doc('advisorOverrides')),
      ]);
      if (cfgSnap.exists) {
        const cfg = cfgSnap.data();
        // F37/F21.5 §184: la rotación SALTA asesores con ausencia activa HOY
        // (vacaciones/incapacidad del editor de Disponibilidad). Si todos
        // están ausentes, cae al primer turno (mejor un owner ausente que
        // un lead huérfano — la escalera SLA igual avisa al CEO).
        const overrides = (ovSnap.exists && ovSnap.data().overrides) || {};
        const hoy = bogotaDayKey(Date.now());
        const rotLen = Array.isArray(cfg.rotation) ? cfg.rotation.length : 0;
        let pick = pickFromRotation(cfg);
        let fallback = pick;
        let saltos = 0;
        while (pick.owner && advisorOverrideFor(overrides, pick.owner.uid, hoy) && saltos < rotLen) {
          pick = pickFromRotation({ ...cfg, next: pick.next });
          saltos++;
        }
        if (pick.owner && advisorOverrideFor(overrides, pick.owner.uid, hoy)) pick = fallback;
        if (pick.owner) {
          lead.ownerId = pick.owner.uid;
          lead.ownerName = pick.owner.nombre;
          rotationNext = pick.next;
        }
      }
    }

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
    if (rotationNext !== null) tx.update(intakeCfgRef, { next: rotationNext });
    tx.update(sourceRef, { _ingestedAt: new Date().toISOString(), _leadId: leadRef.id });
  });

  return { contactId, leadId: leadRef.id, ownerId: lead.ownerId || null, ownerName: lead.ownerName || null };
}

module.exports = { ingestLeadTransaction };
