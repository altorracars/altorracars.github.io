'use strict';

const { onCall, HttpsError } = require('firebase-functions/v2/https');
const admin = require('firebase-admin');

/**
 * crmPurge.js — F15 (ADR §180, adelanto de E3): borrado FÍSICO en cascada,
 * SOLO para datos de prueba/spam. Server-side (Admin SDK) porque una cascada
 * client-side jamás es atómica ni completa.
 *
 * Cascada por lead: activities del lead → deals del lead (des-referenciados)
 * → doc de ENTRADA vinculado (solicitudes/lead_intake) → el lead → y el
 * contact SOLO si ningún otro lead lo referencia (cliente recurrente real
 * no se destruye por borrar un lead basura).
 *
 * Para personas REALES rige F14 (anonimización Ley 1581, E3) — esto es la
 * escoba de pruebas/spam. El día a día usa ARCHIVAR (F13, reversible).
 */

const callableOptions = { region: 'us-central1', invoker: 'public', cors: true, maxInstances: 2 };
const BATCH = 200;

function db() { return admin.firestore(); }

async function verifySuperAdmin(auth) {
  if (!auth || !auth.uid) throw new HttpsError('unauthenticated', 'Debes iniciar sesion.');
  const callerDoc = await db().collection('usuarios').doc(auth.uid).get();
  if (!callerDoc.exists) throw new HttpsError('permission-denied', 'No tienes un perfil de administrador.');
  if (callerDoc.data().rol !== 'super_admin') {
    throw new HttpsError('permission-denied', 'Solo un Super Admin puede eliminar definitivamente.');
  }
  return callerDoc.data();
}

async function deleteRefs(refs) {
  for (let i = 0; i < refs.length; i += BATCH) {
    const batch = db().batch();
    refs.slice(i, i + BATCH).forEach((r) => batch.delete(r));
    await batch.commit();
  }
  return refs.length;
}

const crmPurgeLead = onCall(callableOptions, async (request) => {
  const caller = await verifySuperAdmin(request.auth);
  const { leadId } = request.data || {};
  if (!leadId || typeof leadId !== 'string') {
    throw new HttpsError('invalid-argument', 'leadId es obligatorio.');
  }

  const leadRef = db().collection('leads').doc(leadId);
  const leadSnap = await leadRef.get();
  if (!leadSnap.exists) throw new HttpsError('not-found', 'El lead ya no existe.');
  const lead = leadSnap.data();
  const result = { leadId, activities: 0, deals: 0, sourceDocs: 0, contactDeleted: false };

  // 1) Activities del lead.
  const actSnap = await db().collection('activities')
    .where('relatedTo.id', '==', leadId).limit(1000).get();
  result.activities = await deleteRefs(actSnap.docs.map((d) => d.ref));

  // 2) Deals nacidos de este lead.
  const dealSnap = await db().collection('deals').where('leadId', '==', leadId).limit(200).get();
  result.deals = await deleteRefs(dealSnap.docs.map((d) => d.ref));

  // 3) Doc de ENTRADA vinculado (para que la ingestión no lo "reviva" en un backfill).
  const sources = [];
  if (lead.sourceSolicitudId) sources.push(db().collection('solicitudes').doc(lead.sourceSolicitudId));
  if (lead.sourceIntakeId) sources.push(db().collection('lead_intake').doc(lead.sourceIntakeId));
  result.sourceDocs = await deleteRefs(sources);

  // 4) El lead.
  await leadRef.delete();

  // 5) El contact, SOLO si quedó huérfano (ningún otro lead lo referencia).
  if (lead.contactId) {
    const siblings = await db().collection('leads')
      .where('contactId', '==', lead.contactId).limit(1).get();
    if (siblings.empty) {
      await db().collection('contacts').doc(lead.contactId).delete();
      result.contactDeleted = true;
    }
  }

  // Auditoría (sin PII: solo ids y quién).
  await db().collection('auditLog').add({
    action: 'crm_purge_lead',
    target: 'lead ' + leadId + (lead.contactId ? ' / contact ' + lead.contactId : ''),
    detail: JSON.stringify(result),
    by: caller.email || request.auth.uid,
    at: new Date().toISOString(),
  });

  console.log('[crmPurgeLead] ' + JSON.stringify(result));
  return result;
});

module.exports = { crmPurgeLead };
