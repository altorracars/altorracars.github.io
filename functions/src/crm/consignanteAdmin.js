'use strict';

const { onCall, HttpsError } = require('firebase-functions/v2/https');
const admin = require('firebase-admin');
const { normalizePhone, sanitizeContactId } = require('../ingestion/normalize');

/**
 * consignanteAdmin.js — TODO-50 (consigna = ENTIDAD FORMAL).
 *
 * `crmUpsertConsignante` (crm.edit): crea/actualiza un CONSIGNANTE particular
 * como `contacts` con rol 'consignante'. Decisión del flujo fuerte (comité ×4 +
 * Gemini verificado → spec 2026-06-28):
 *  - Identidad de NEGOCIO = CÉDULA (no el teléfono: una familia comparte número →
 *    colapsar por phone atribuiría la ganancia a la persona equivocada, gap del comité).
 *  - docId OPACO (auto-id) — NUNCA derivado de PII: la supresión Ley 1581 BORRA el
 *    doc (su id no puede ser re-identificable); la cédula vive en `dedupKeys`, jamás en el id.
 *  - Idempotente: si la persona ya existe (incluso como lead → retoma/trade-in), AÑADE el
 *    rol con arrayUnion sin duplicar ni pisar su `consent`/`lifecycleStage` previos.
 *  - El consentimiento Habeas Data NO se captura aquí (fase 2, gate abogado): el soporte
 *    legal es el CONTRATO DE CONSIGNACIÓN firmado; aquí solo identidad + rol.
 *
 * El reporte de ganancia por consignante NO depende de este doc: el snapshot del deal
 * congela ownerRefId + ownerDisplayName (sobrevive a la supresión). Este callable solo
 * provee la identidad estable que el wizard referencia en `tenancy.ownerRefId`.
 */

const nowISO = () => new Date().toISOString();

/** Cédula colombiana normalizada = solo dígitos (5-12). '' si inválida. PII → restringida. */
function normalizeCedula(c) {
  const d = String(c || '').replace(/\D/g, '');
  return d.length >= 5 && d.length <= 12 ? d : '';
}

async function assertPerm(db, auth, perm) {
  if (!auth || !auth.uid) throw new HttpsError('unauthenticated', 'Debes iniciar sesión.');
  const snap = await db.collection('usuarios').doc(auth.uid).get();
  if (!snap.exists) throw new HttpsError('permission-denied', 'Usuario sin perfil de staff.');
  const u = snap.data();
  const isSuper = u.rol === 'super_admin' || u.roleId === 'system_super_admin';
  const perms = isSuper ? ['*'] : (Array.isArray(u.permissions) ? u.permissions : []);
  if (!perms.includes('*') && !perms.includes(perm)) {
    throw new HttpsError('permission-denied', 'Necesitas el permiso ' + perm + '.');
  }
  return { uid: auth.uid, nombre: u.nombre || u.email || auth.uid };
}

const crmUpsertConsignante = onCall(
  { region: 'us-central1', invoker: 'public', cors: true },
  async (request) => {
    const db = admin.firestore();
    const staff = await assertPerm(db, request.auth, 'crm.edit');
    const { nombre, cedula, telefono, email } = request.data || {};

    const nombreT = String(nombre || '').trim();
    if (!nombreT) throw new HttpsError('invalid-argument', 'El nombre del consignante es obligatorio.');
    const cedulaNorm = normalizeCedula(cedula);
    const phoneNorm = normalizePhone(telefono, '+57');
    const emailNorm = String(email || '').trim().toLowerCase();
    if (!cedulaNorm && !phoneNorm) {
      throw new HttpsError('invalid-argument', 'Se requiere la cédula o el teléfono del consignante.');
    }

    // Claves del índice dedup que le corresponden (se ESCRIBEN todas, create-if-absent).
    const indexKeys = [];
    if (cedulaNorm) indexKeys.push(sanitizeContactId('cedula:' + cedulaNorm));
    if (phoneNorm) indexKeys.push(sanitizeContactId('phone:' + phoneNorm));
    if (emailNorm) indexKeys.push(sanitizeContactId('email:' + emailNorm));
    // RESOLUCIÓN de identidad: si hay cédula, manda la CÉDULA (no el teléfono — el
    // gap del comité: dos personas comparten número). Sin cédula, cae a phone/email.
    const resolveKeys = cedulaNorm
      ? [sanitizeContactId('cedula:' + cedulaNorm)]
      : indexKeys.slice();

    let resultId = null;
    let created = false;
    await db.runTransaction(async (tx) => {
      // TODAS las lecturas ANTES de cualquier escritura (invariante runTransaction).
      const resolveSnaps = [];
      for (const k of resolveKeys) resolveSnaps.push(await tx.get(db.collection('dedup').doc(k)));
      const indexSnaps = [];
      for (const k of indexKeys) indexSnaps.push({ key: k, snap: await tx.get(db.collection('dedup').doc(k)) });

      const hit = resolveSnaps.find((s) => s.exists);
      let contactRef;
      let exists = false;
      let cData = null;
      if (hit) {
        contactRef = db.collection('contacts').doc(hit.data().contactId);
        const cSnap = await tx.get(contactRef);
        cData = cSnap.exists ? cSnap.data() : null;
        exists = cSnap.exists;
        // Suprimido / en gracia → contacto FRESCO (no resucitar PII suprimida, B.3).
        if (cData && (cData._suppressed === true || cData.suppressionStatus === 'pendiente_supresion')) {
          contactRef = db.collection('contacts').doc();
          exists = false; cData = null;
        }
      } else {
        contactRef = db.collection('contacts').doc(); // docId OPACO (auto-id) — JAMÁS PII.
      }
      resultId = contactRef.id;

      if (!exists) {
        created = true;
        tx.set(contactRef, {
          fullName: nombreT,
          email: emailNorm || '',
          phone: phoneNorm || '',
          cedula: cedulaNorm || null, // PII restringida — nunca en docId/URL
          type: 'consignante',
          roles: ['consignante'],
          source: 'admin-consigna',
          ownerId: null, ownerName: null, score: 0, rating: 'cold',
          lifecycleStage: 'consignante',
          tags: ['consignante'],
          consent: { habeasData: null }, // fase 2 (gate abogado): soporte = contrato firmado
          doNotContact: false, clienteUid: null,
          dedupKeys: indexKeys,
          createdAt: nowISO(), lastActivityAt: nowISO(), updatedAt: nowISO(), _version: 1,
          createdBy: staff.uid,
        });
      } else {
        // Persona EXISTENTE (p.ej. ya es lead / comprador en retoma): AÑADIR el rol sin
        // pisar consent/lifecycle. Completa SOLO los campos vacíos (no sobrescribe).
        const upd = {
          roles: admin.firestore.FieldValue.arrayUnion('consignante'),
          updatedAt: nowISO(),
          _version: admin.firestore.FieldValue.increment(1),
        };
        if (!cData.cedula && cedulaNorm) upd.cedula = cedulaNorm;
        if ((!cData.fullName || cData.fullName === 'Sin nombre') && nombreT) upd.fullName = nombreT;
        if (!cData.phone && phoneNorm) upd.phone = phoneNorm;
        if (!cData.email && emailNorm) upd.email = emailNorm;
        tx.update(contactRef, upd);
      }

      // Índice dedup: create-if-absent — JAMÁS robar la entrada que apunta a OTRO
      // (un phone compartido por familia queda con el primero; el 2º resuelve por cédula).
      for (const e of indexSnaps) {
        if (!e.snap.exists) {
          tx.set(db.collection('dedup').doc(e.key), { contactId: resultId, createdAt: nowISO() });
        }
      }
    });

    await db.collection('auditLog').add({
      action: 'crm_upsert_consignante', created, by: staff.uid, at: nowISO(),
    });
    return { id: resultId, nombre: nombreT, created };
  }
);

module.exports = { crmUpsertConsignante, normalizeCedula };
