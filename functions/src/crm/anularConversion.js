'use strict';

const { onCall, HttpsError } = require('firebase-functions/v2/https');
const admin = require('firebase-admin');

/**
 * anularConversion — F7 (ADR §181): el "Deshacer" de la acción más importante
 * del CRM, COMPENSATORIO y server-side (jamás un delete client-side
 * compitiendo contra triggers at-least-once — comité D.4 × Reviews 1/4).
 *
 * Ventana: el OWNER puede anular <24h y solo si el deal no tiene actividades
 * humanas; el super admin siempre. Pasada la ventana → doctrina: marcar el
 * deal `perdido` con razón 'error_de_registro'.
 *
 * Compensación: deal→'anulado' · lead descongelado (status previo restaurado,
 * convertedTo limpio) · lifecycle del contacto RECALCULADO (recycle solo si
 * no quedan deals abiertos y nunca compró — F3) · activity de auditoría.
 */
const callableOptions = { region: 'us-central1', invoker: 'public', cors: true };

exports.anularConversion = onCall(callableOptions, async (request) => {
  const auth = request.auth;
  if (!auth || !auth.uid) throw new HttpsError('unauthenticated', 'Debes iniciar sesión.');
  const { dealId } = request.data || {};
  if (!dealId || typeof dealId !== 'string') throw new HttpsError('invalid-argument', 'dealId es obligatorio.');

  const db = admin.firestore();
  const callerSnap = await db.collection('usuarios').doc(auth.uid).get();
  if (!callerSnap.exists) throw new HttpsError('permission-denied', 'Sin perfil de administrador.');
  const caller = callerSnap.data();
  const isSuper = caller.rol === 'super_admin' || (Array.isArray(caller.permissions) && caller.permissions.includes('*'));

  const dealRef = db.collection('deals').doc(dealId);
  const dealSnap = await dealRef.get();
  if (!dealSnap.exists) throw new HttpsError('not-found', 'El negocio no existe.');
  const deal = dealSnap.data();
  if (deal.status === 'anulado') return { ok: true, alreadyDone: true };
  if (deal.status === 'won') throw new HttpsError('failed-precondition', 'Un negocio GANADO no se anula: contacta al administrador.');

  if (!isSuper) {
    if (deal.ownerId !== auth.uid) {
      throw new HttpsError('permission-denied', 'Solo el dueño del negocio (o un admin) puede anular.');
    }
    const ageMs = Date.now() - new Date(deal.createdAt || 0).getTime();
    if (!(ageMs >= 0 && ageMs < 24 * 3600 * 1000)) {
      throw new HttpsError('failed-precondition', 'Pasaron más de 24h: marca el negocio como Perdido con razón "Error de registro".');
    }
    const humanActs = await db.collection('activities')
      .where('relatedTo.id', '==', dealId).limit(10).get();
    if (humanActs.docs.some((d) => d.data().kind !== 'system')) {
      throw new HttpsError('failed-precondition', 'El negocio ya tiene actividad registrada: solo un admin puede anularlo.');
    }
  }

  const now = new Date().toISOString();
  const leadRef = deal.leadId ? db.collection('leads').doc(deal.leadId) : null;

  await db.runTransaction(async (tx) => {
    const leadSnap = leadRef ? await tx.get(leadRef) : null;
    tx.update(dealRef, {
      status: 'anulado', anuladoAt: now, anuladoBy: auth.uid,
      updatedAt: now, _version: admin.firestore.FieldValue.increment(1),
    });
    if (leadSnap && leadSnap.exists) {
      const prev = (leadSnap.data().convertedTo || {}).prevStatus;
      tx.update(leadRef, {
        status: prev === 'nuevo' ? 'nuevo' : 'contactado', // restaura; default seguro
        convertedTo: null,
        lastActivityAt: now, updatedAt: now,
        _version: admin.firestore.FieldValue.increment(1),
      });
    }
    tx.set(db.collection('activities').doc('anulacion_' + dealId), {
      type: 'conversion_anulada', kind: 'system',
      subject: 'Conversión anulada',
      body: 'Deal ' + dealId + ' anulado por ' + (caller.nombre || auth.uid),
      status: 'closed', direction: 'outbound',
      relatedTo: { type: 'lead', id: deal.leadId || null, name: deal.contactName || '' },
      ownerId: auth.uid, createdAt: now, _version: 1,
    });
  });

  // F3: recycle del lifecycle SOLO si el contacto no tiene deals abiertos y nunca compró.
  if (deal.contactId) {
    const open = await db.collection('deals')
      .where('contactId', '==', deal.contactId).where('status', '==', 'open').limit(1).get();
    const won = await db.collection('deals')
      .where('contactId', '==', deal.contactId).where('status', '==', 'won').limit(1).get();
    if (open.empty && won.empty) {
      await db.collection('contacts').doc(deal.contactId).update({
        lifecycleStage: 'lead', updatedAt: now,
        _version: admin.firestore.FieldValue.increment(1),
      }).catch(() => {});
    }
  }

  return { ok: true, leadId: deal.leadId || null };
});
