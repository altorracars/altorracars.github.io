'use strict';

const { onCall, HttpsError } = require('firebase-functions/v2/https');
const admin = require('firebase-admin');

/* ── auth del staff (mismo patrón de citaActions.js) ── */

async function assertStaff(db, auth, perm) {
  if (!auth || !auth.uid) throw new HttpsError('unauthenticated', 'Debes iniciar sesión.');
  const snap = await db.collection('usuarios').doc(auth.uid).get();
  if (!snap.exists) throw new HttpsError('permission-denied', 'Usuario sin perfil de staff.');
  const u = snap.data();
  const perms = u.rol === 'super_admin' || u.roleId === 'system_super_admin'
    ? ['*'] : (Array.isArray(u.permissions) ? u.permissions : []);
  if (!perms.includes('*') && !perms.includes(perm)) {
    throw new HttpsError('permission-denied', 'Necesitas el permiso ' + perm + '.');
  }
  return { uid: auth.uid, nombre: u.nombre || u.email || auth.uid };
}

/**
 * crmCrearBorradorRetoma — F10 (E4, ADR §186): crea en inventario el BORRADOR
 * del vehículo recibido en parte de pago (retoma/permuta) desde
 * deal.recibeVehiculo. Server-side porque los usuarios del portal (permisos
 * crm.*) NO pueden escribir `vehiculos` (Rules); el borrador nace con
 * estado:'borrador' → jamás visible en la web pública.
 *
 * ID numérico = misma convención del admin viejo (max(id)+1, create() con
 * precondición + reintento si colisiona). Idempotente: deal.retomaVehicleId
 * marca que ya existe; doble click concurrente se resuelve en transacción
 * (el perdedor borra su borrador huérfano y devuelve el ganador).
 */
const crmCrearBorradorRetoma = onCall(
  { region: 'us-central1', invoker: 'public', cors: true, timeoutSeconds: 60 },
  async (request) => {
    const db = admin.firestore();
    const staff = await assertStaff(db, request.auth, 'crm.edit');
    const { dealId } = request.data || {};
    if (!dealId || typeof dealId !== 'string') {
      throw new HttpsError('invalid-argument', 'Falta dealId.');
    }

    const dealRef = db.collection('deals').doc(dealId);
    const dealSnap = await dealRef.get();
    if (!dealSnap.exists) throw new HttpsError('not-found', 'El negocio no existe.');
    const deal = dealSnap.data();
    if (deal.retomaVehicleId) {
      return { ok: true, idempotent: true, vehicleId: deal.retomaVehicleId };
    }
    if (deal.status !== 'won') {
      throw new HttpsError('failed-precondition', 'El borrador de retoma se crea sobre un negocio GANADO.');
    }
    const rv = deal.recibeVehiculo || {};
    if (!rv.marca && !rv.modelo && !rv.placa) {
      throw new HttpsError('failed-precondition', 'El negocio no tiene datos de retoma (recibeVehiculo).');
    }

    const nowISO = new Date().toISOString();
    const FV = admin.firestore.FieldValue;

    // Recuperación de crash (review E4 #6): si una corrida previa creó el
    // borrador pero murió antes de vincularlo, NO crear otro — re-vincular
    // el existente (retomaDealId es el ancla).
    let created = null;
    const prevSnap = await db.collection('vehiculos')
      .where('retomaDealId', '==', dealId).limit(1).get();
    if (!prevSnap.empty) {
      created = Number(prevSnap.docs[0].data().id) || prevSnap.docs[0].id;
    }

    // ID siguiente: max(id)+1 con create() (falla si existe) + reintento.
    if (created === null) {
      const maxSnap = await db.collection('vehiculos').orderBy('id', 'desc').limit(1).get();
      let candidate = maxSnap.empty ? 1 : (Number(maxSnap.docs[0].data().id) || 0) + 1;
      for (let i = 0; i < 10 && created === null; i++) {
        try {
          await db.collection('vehiculos').doc(String(candidate)).create({
            id: candidate,
            marca: String(rv.marca || '').trim().toLowerCase(),
            modelo: String(rv.modelo || '').trim(),
            year: Number(rv.year) || null,
            placa: String(rv.placa || '').trim().toUpperCase(),
            precio: Number(rv.valorEstimado) || 0,
            estado: 'borrador',
            origen: 'retoma',
            retomaDealId: dealId,
            creadoPor: staff.uid,
            createdAt: nowISO, updatedAt: nowISO, _version: 1,
          });
          created = candidate;
        } catch (e) {
          const isDup = e && (e.code === 6 || e.code === 'already-exists'
            || /already.?exists/i.test(String(e.message || '')));
          if (!isDup) throw e;
          candidate += 1;
        }
      }
    }
    if (created === null) {
      throw new HttpsError('aborted', 'No se pudo asignar un ID de inventario (10 intentos).');
    }

    // Vincular al deal en transacción — si otro click concurrente ya vinculó,
    // este borrador queda huérfano → compensar borrándolo.
    const finalId = await db.runTransaction(async (tx) => {
      const s = await tx.get(dealRef);
      if (!s.exists) return null;
      const d = s.data();
      if (d.retomaVehicleId) return d.retomaVehicleId;
      tx.update(dealRef, {
        retomaVehicleId: String(created),
        updatedAt: nowISO, updatedBy: staff.uid,
        _version: FV.increment(1),
      });
      return String(created);
    });
    if (finalId === null) {
      // el deal desapareció en vuelo: compensar y fallar LEGIBLE (jamás ok+null)
      await db.collection('vehiculos').doc(String(created)).delete();
      throw new HttpsError('not-found', 'El negocio fue eliminado mientras se creaba el borrador.');
    }
    if (finalId !== String(created)) {
      await db.collection('vehiculos').doc(String(created)).delete();
      return { ok: true, idempotent: true, vehicleId: finalId };
    }

    // Tarea de seguimiento (ID determinista) + auditoría.
    await db.collection('activities').doc('retoma_' + dealId).set({
      type: 'tarea', kind: 'system', status: 'open', direction: 'outbound',
      subject: '🚙 Retoma: completar ficha del vehículo recibido',
      body: 'Borrador #' + created + ' creado en inventario'
        + (rv.marca || rv.modelo ? ' (' + [rv.marca, rv.modelo].filter(Boolean).join(' ') + ')' : '')
        + '. Completa fotos, specs y precio en el admin para publicarlo.',
      dueAt: new Date(Date.parse(nowISO) + 3 * 86400000).toISOString(),
      relatedTo: { type: 'deal', id: dealId, name: deal.name || '' },
      leadId: deal.leadId || null,
      ownerId: deal.ownerId || staff.uid,
      createdAt: nowISO, _version: 1,
    }, { merge: true });

    await db.collection('auditLog').add({
      action: 'crm_retoma_borrador', by: staff.uid, at: nowISO,
      dealId, vehicleId: String(created),
    });

    return { ok: true, vehicleId: String(created) };
  }
);

module.exports = { crmCrearBorradorRetoma };
