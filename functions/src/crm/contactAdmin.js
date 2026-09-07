'use strict';

const { onCall, HttpsError } = require('firebase-functions/v2/https');
const admin = require('firebase-admin');
const {
  dedupKeysFor, ensureDedupEntries, removeAllDedupEntriesFor,
  repointContact, moveNotes, snapshotContactGraph, contactHashOf,
  executeSuppression,
} = require('./contactGraph');

/**
 * contactAdmin — F12 fusión + F14 supresión Ley 1581 (E3, ADR §185).
 *
 *  - `crmMergeContacts` (super admin): fusión RESUMIBLE contra
 *    `merges/{mergedId__into__survivorId}` — si muere a mitad, re-ejecutar
 *    continúa (repointContact re-consulta lo que falta). JAMÁS auto-merge:
 *    siempre la dispara un humano eligiendo el sobreviviente.
 *  - `crmSuppressContact` (crm.delete): inicia la GRACIA de 72h
 *    (`pendiente_supresion`, reversible) con snapshot F34 previo a Storage y
 *    retiro INMEDIATO del índice dedup (B.3: un homónimo nuevo nace fresco).
 *    La ejecución real la hace el finalizador del crmDailyJob.
 *  - `crmCancelSuppression`: revierte la gracia y reconstruye el índice
 *    (si durante la gracia nació un contacto fresco con el mismo dato, NO
 *    se pisa: se reporta el duplicado para fusionar a mano).
 */

const nowISO = () => new Date().toISOString();
const GRACE_MS = 72 * 3600e3;

const { isOwnerData } = require('../../shared/rbac-foundation');

async function assertPerm(db, auth, perm) {
  if (!auth || !auth.uid) throw new HttpsError('unauthenticated', 'Debes iniciar sesión.');
  const snap = await db.collection('usuarios').doc(auth.uid).get();
  if (!snap.exists) throw new HttpsError('permission-denied', 'Usuario sin perfil de staff.');
  const u = snap.data();
  // §2.6: detección canónica compartida (antes copia parcial de 2 formas —
  // un dueño canónico solo-'*' NO era isSuper aquí).
  const isSuper = isOwnerData(u);
  if (perm === 'super') {
    if (!isSuper) throw new HttpsError('permission-denied', 'Solo el Super Admin puede hacer esto.');
  } else {
    const perms = isSuper ? ['*'] : (Array.isArray(u.permissions) ? u.permissions : []);
    if (!perms.includes('*') && !perms.includes(perm)) {
      throw new HttpsError('permission-denied', 'Necesitas el permiso ' + perm + '.');
    }
  }
  return { uid: auth.uid, nombre: u.nombre || u.email || auth.uid };
}

/* ── F12: fusión de contactos ── */

const crmMergeContacts = onCall(
  { region: 'us-central1', invoker: 'public', cors: true, timeoutSeconds: 300 },
  async (request) => {
    const db = admin.firestore();
    const staff = await assertPerm(db, request.auth, 'super');
    const { survivorId, mergedId } = request.data || {};
    if (!survivorId || !mergedId || survivorId === mergedId) {
      throw new HttpsError('invalid-argument', 'Elige dos contactos distintos.');
    }
    const [survSnap, mergSnap] = await Promise.all([
      db.collection('contacts').doc(survivorId).get(),
      db.collection('contacts').doc(mergedId).get(),
    ]);
    if (!survSnap.exists) throw new HttpsError('not-found', 'El contacto sobreviviente no existe.');
    if (!mergSnap.exists) throw new HttpsError('not-found', 'El contacto a fusionar no existe.');
    const surv = survSnap.data();
    const merg = mergSnap.data();
    if (surv._suppressed || merg._suppressed || surv.suppressionStatus === 'pendiente_supresion'
      || merg.suppressionStatus === 'pendiente_supresion') {
      throw new HttpsError('failed-precondition', 'No se fusiona un contacto suprimido o en gracia de supresión.');
    }
    if (merg._mergedInto) {
      return { ok: true, idempotent: true, mergedInto: merg._mergedInto };
    }

    // Estado RESUMIBLE (B.5): el doc registra el avance; re-ejecutar continúa.
    const mergeId = mergedId + '__into__' + survivorId;
    const stateRef = db.collection('merges').doc(mergeId);
    await stateRef.set({
      status: 'running', survivorId, mergedId,
      by: staff.uid, byName: staff.nombre, startedAt: nowISO(),
    }, { merge: true });

    // Red F34 (snapshot de ambos grafos ANTES de mutar).
    const snapM = await snapshotContactGraph(db, mergedId, 'merges');
    await stateRef.set({ backupPath: snapM.path }, { merge: true });

    // 1) Enriquecer al sobreviviente SOLO con lo que le falta (fill-empty) +
    //    unión de tags. Nada se pisa: el humano eligió al sobreviviente.
    const fill = { updatedAt: nowISO(), _version: admin.firestore.FieldValue.increment(1) };
    if (!surv.email && merg.email) fill.email = merg.email;
    if (!surv.phone && merg.phone) fill.phone = merg.phone;
    if (!surv.clienteUid && merg.clienteUid) fill.clienteUid = merg.clienteUid;
    if ((merg.lastActivityAt || '') > (surv.lastActivityAt || '')) fill.lastActivityAt = merg.lastActivityAt;
    const tags = Array.from(new Set([...(surv.tags || []), ...(merg.tags || [])]));
    if (tags.length !== (surv.tags || []).length) fill.tags = tags;
    await survSnap.ref.update(fill);

    // 2) Re-apuntar el grafo (leads/deals/índice) + mover notas.
    const counts = await repointContact(db, mergedId, survivorId);
    const notes = await moveNotes(db, mergedId, survivorId);

    // 3) Marcar al fusionado (NO se borra: auditoría). Su trigger retira
    //    las entradas de índice restantes (excluded por _mergedInto).
    await mergSnap.ref.update({
      _mergedInto: survivorId, _mergedAt: nowISO(), _mergedBy: staff.uid,
      dedupKeys: [], updatedAt: nowISO(), _version: admin.firestore.FieldValue.increment(1),
    });

    // 3b) COMPACTAR cadenas (review §185): tombstones que apuntaban al
    //     fusionado se re-apuntan al sobreviviente — el grafo queda SIEMPRE
    //     a un salto (sin esto, A→B→C cuelga leads de un tombstone).
    for (;;) {
      const chain = await db.collection('contacts').where('_mergedInto', '==', mergedId).limit(50).get();
      if (chain.empty) break;
      for (const t of chain.docs) {
        await t.ref.update({ _mergedInto: survivorId, updatedAt: nowISO() });
      }
      if (chain.size < 50) break;
    }

    // 4) Actividad de fusión + auditoría + cierre del estado.
    await db.collection('activities').doc('merge_' + mergedId).set({
      type: 'nota', kind: 'system', status: 'closed', direction: 'outbound',
      subject: '🔗 Contactos fusionados',
      body: 'El contacto duplicado se fusionó aquí (' + counts.leads + ' lead(s), '
        + counts.deals + ' negocio(s), ' + notes + ' nota(s)).',
      relatedTo: { type: 'contact', id: survivorId, name: surv.fullName || '' },
      ownerId: staff.uid, createdAt: nowISO(), _version: 1,
    }, { merge: true });
    await db.collection('auditLog').add({
      action: 'crm_merge_contacts',
      survivorHash: contactHashOf(survivorId), mergedHash: contactHashOf(mergedId),
      counts, notesMoved: notes, by: staff.uid, at: nowISO(),
    });
    await stateRef.set({ status: 'done', counts, notesMoved: notes, finishedAt: nowISO() }, { merge: true });

    return { ok: true, counts, notesMoved: notes };
  }
);

/* ── F14: supresión Ley 1581 (gracia 72h) ── */

const crmSuppressContact = onCall(
  { region: 'us-central1', invoker: 'public', cors: true, timeoutSeconds: 300 },
  async (request) => {
    const db = admin.firestore();
    const { contactId, immediate } = request.data || {};
    // §270.12b: `immediate` = poder del DUEÑO (sin gracia) → permiso super,
    // no crm.delete. La ejecución reusa executeSuppression (bifurcación de
    // bloqueo fiscal incluida) con el MISMO contrato post-ejecución del
    // finalizador del crmDailyJob (backup fuera + doc de estado opaco).
    const staff = await assertPerm(db, request.auth, immediate === true ? 'super' : 'crm.delete');
    if (!contactId) throw new HttpsError('invalid-argument', 'Falta contactId.');
    const cRef = db.collection('contacts').doc(contactId);
    const cSnap = await cRef.get();
    if (!cSnap.exists) throw new HttpsError('not-found', 'El contacto no existe.');
    const c = cSnap.data();
    if (c._suppressed) throw new HttpsError('failed-precondition', 'Ese contacto ya fue suprimido.');
    if (c.suppressionStatus === 'pendiente_supresion' && immediate !== true) {
      const st = await db.collection('suppressions').doc(contactId).get();
      return { ok: true, idempotent: true, executeAfter: st.exists ? st.data().executeAfter : null };
    }
    if (c._mergedInto) throw new HttpsError('failed-precondition', 'Ese contacto está fusionado — suprime al sobreviviente.');

    if (c.suppressionStatus !== 'pendiente_supresion') {
      // Red F34: snapshot a Storage ANTES de cualquier mutación.
      const snap = await snapshotContactGraph(db, contactId, 'suppressions');

      const executeAfter = new Date(Date.now() + (immediate === true ? 0 : GRACE_MS)).toISOString();
      await db.collection('suppressions').doc(contactId).set({
        status: 'pending', contactId, executeAfter,
        backupPath: snap.path, requestedBy: staff.uid, requestedByName: staff.nombre,
        requestedAt: nowISO(),
      });
      // Gracia + B.3: fuera del índice EN EL MINUTO 0 (síncrono, no esperar
      // al trigger) — por QUERY, no por claves derivables: el índice acumula
      // entradas heredadas/no absorbidas que también deben caer (review §185).
      await removeAllDedupEntriesFor(db, contactId);
      await cRef.update({
        suppressionStatus: 'pendiente_supresion', suppressionExecuteAfter: executeAfter,
        dedupKeys: [], doNotContact: true,
        updatedAt: nowISO(), _version: admin.firestore.FieldValue.increment(1),
      });
      await db.collection('auditLog').add({
        action: 'crm_suppress_requested', contactHash: contactHashOf(contactId),
        executeAfter, immediate: immediate === true || undefined, by: staff.uid, at: nowISO(),
      });
      if (immediate !== true) return { ok: true, executeAfter };
    }

    // ── Variante YA del dueño (o adelanto de una gracia en curso) ──
    const stRef = db.collection('suppressions').doc(contactId);
    const stSnap = await stRef.get();
    const st = stSnap.exists ? stSnap.data() : {};
    const r = await executeSuppression(db, contactId, { by: staff.uid });
    // Contrato del finalizador (review §185): post-ejecución NADA conserva el
    // ID derivado del email — backup F34 fuera y estado re-keyeado a ID opaco.
    if (st.backupPath) {
      await admin.storage().bucket().file(st.backupPath).delete().catch(() => {});
    }
    await db.collection('suppressions').doc().set({
      status: 'done', contactHash: contactHashOf(contactId),
      stubId: r.stubId || null, result: r, immediate: true,
      requestedBy: st.requestedBy || staff.uid, requestedAt: st.requestedAt || nowISO(),
      executedAt: nowISO(), executedBy: staff.uid,
    });
    await stRef.delete();
    return { ok: true, immediate: true, blocked: !!r.blocked, stubId: r.stubId || null };
  }
);

const crmCancelSuppression = onCall(
  { region: 'us-central1', invoker: 'public', cors: true },
  async (request) => {
    const db = admin.firestore();
    const staff = await assertPerm(db, request.auth, 'crm.delete');
    const { contactId } = request.data || {};
    if (!contactId) throw new HttpsError('invalid-argument', 'Falta contactId.');
    const stRef = db.collection('suppressions').doc(contactId);
    const stSnap = await stRef.get();
    if (!stSnap.exists || stSnap.data().status !== 'pending') {
      throw new HttpsError('failed-precondition', 'No hay una supresión pendiente para ese contacto.');
    }
    const cRef = db.collection('contacts').doc(contactId);
    const cSnap = await cRef.get();
    if (!cSnap.exists) throw new HttpsError('failed-precondition', 'El contacto ya no existe (la supresión ya corrió).');

    // El snapshot F34 ya no tiene razón de ser (la persona se queda) — se purga.
    const st = stSnap.data();
    if (st.backupPath) {
      await admin.storage().bucket().file(st.backupPath).delete().catch(() => {});
    }
    await stRef.set({
      status: 'cancelled', cancelledBy: staff.uid, cancelledAt: nowISO(),
      backupPath: admin.firestore.FieldValue.delete(), backupDeleted: true,
    }, { merge: true });
    // Reconstruir índice SIN pisar: si durante la gracia nació un contacto
    // fresco con el mismo email/tel, queda el duplicado REPORTADO (fusión
    // humana), jamás un auto-merge silencioso.
    const keys = dedupKeysFor(cSnap.data());
    const { taken } = await ensureDedupEntries(db, contactId, keys);
    await cRef.update({
      suppressionStatus: admin.firestore.FieldValue.delete(),
      suppressionExecuteAfter: admin.firestore.FieldValue.delete(),
      dedupKeys: keys.filter((k) => !taken.some((t) => t.key === k)),
      updatedAt: nowISO(), _version: admin.firestore.FieldValue.increment(1),
    });
    await db.collection('auditLog').add({
      action: 'crm_suppress_cancelled', contactHash: contactHashOf(contactId),
      duplicates: taken.length, by: staff.uid, at: nowISO(),
    });
    return { ok: true, duplicates: taken };
  }
);

module.exports = { crmMergeContacts, crmSuppressContact, crmCancelSuppression };
