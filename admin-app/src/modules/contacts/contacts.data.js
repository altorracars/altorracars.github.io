// ============================================================
// Capa de DATOS del Customer 360.
// Lee `contacts/{id}`, el timeline `activities` (índice relatedTo.id,createdAt)
// y notas internas `contacts/{id}/crmNotes`.
// ============================================================

import {
  doc, getDoc, getDocs, collection, query, where, orderBy, limit, onSnapshot, addDoc, updateDoc,
} from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { db, fns } from '../../core/firebase.js';
import { store } from '../../core/store.js';
import { getMockContacts, getMockLeads } from '../../core/mock.js';
import { normalizePhone, dedupKeysOf } from '../../domain/phone.js';

const withId = (d) => ({ id: d.id, ...d.data() });

/**
 * Directorio de contactos (lista). Snapshot puntual acotado — `contacts` por
 * `createdAt` desc (campo SIEMPRE presente; `lastActivityAt` podría faltar y
 * Firestore excluye del orderBy los docs sin el campo) + `leads` para mapear
 * contacto→ficha 360. Campo único → índice automático (L-30). Mock-first.
 * Lectura ya permitida (crm.read, §9.7).
 * @returns {Promise<{contacts:object[], leads:object[]}>}
 */
export async function loadContactsList({ pageSize = 500 } = {}) {
  if (store.get().mock) return { contacts: getMockContacts(), leads: getMockLeads() };
  const [contacts, leads] = await Promise.all([
    getDocs(query(collection(db, 'contacts'), orderBy('createdAt', 'desc'), limit(pageSize))).then((s) => s.docs.map(withId)),
    getDocs(query(collection(db, 'leads'), orderBy('createdAt', 'desc'), limit(pageSize))).then((s) => s.docs.map(withId)),
  ]);
  // §185: los fusionados (históricos) y suprimidos (stubs 1581) no son
  // directorio — viven solo como rastro del grafo.
  return { contacts: contacts.filter((c) => !c._mergedInto && !c._suppressed), leads };
}

export async function getContact(contactId) {
  if (!contactId) return null;
  const snap = await getDoc(doc(db, 'contacts', contactId));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

/** Timeline del lead en tiempo real (índice activities(relatedTo.id, createdAt desc)). */
export function subscribeActivities(leadId, onData, onError) {
  const q = query(
    collection(db, 'activities'),
    where('relatedTo.id', '==', leadId),
    orderBy('createdAt', 'desc'),
    limit(50)
  );
  return onSnapshot(q, (snap) => onData(snap.docs.map(withId)), (err) => onError && onError(err));
}

/** Notas internas del contacto (subcolección crmNotes). */
export function subscribeNotes(contactId, onData, onError) {
  const q = query(collection(db, 'contacts', contactId, 'crmNotes'), orderBy('createdAt', 'desc'), limit(50));
  return onSnapshot(q, (snap) => onData(snap.docs.map(withId)), (err) => onError && onError(err));
}

/* ── F12 (ADR §185): edición con optimistic locking + colisión dedup ── */

/**
 * ¿El email/teléfono NUEVO ya pertenece a OTRO contacto? Consulta el índice
 * dedup (lectura staff). Devuelve {key, contactId} del conflicto o null.
 */
export async function checkDedupCollision({ email, phone }, selfId) {
  for (const key of dedupKeysOf({ email, phone })) {
    const snap = await getDoc(doc(db, 'dedup', key));
    if (snap.exists() && snap.data().contactId !== selfId) {
      return { key, contactId: snap.data().contactId };
    }
  }
  return null;
}

/**
 * Actualiza el contacto con el protocolo _version (las Rules exigen
 * actual+1). UX del conflicto (comité c): si choca, recarga y REINTENTA
 * sola UNA vez siempre que los campos que editaste no hayan cambiado en el
 * server; si el MISMO campo cambió, lanza {code:'conflict', fresh}.
 * patch = SOLO field paths editados (jamás el doc entero).
 */
export async function updateContact(contactId, patch, baseline) {
  const ref = doc(db, 'contacts', contactId);
  const attempt = async (version) => {
    const payload = { ...patch, updatedAt: new Date().toISOString(), _version: version + 1 };
    if (patch.phone !== undefined) payload.phone = normalizePhone(patch.phone, '+57') || null;
    return updateDoc(ref, payload);
  };

  try {
    await attempt(baseline._version || 0);
    return { ok: true };
  } catch (e) {
    if (!e || e.code !== 'permission-denied') throw e;
    // Releer y decidir: ¿cambió ALGO de lo que yo edité?
    const fresh = await getContact(contactId);
    if (!fresh) throw e;
    const mismoCampoCambio = Object.keys(patch).some(
      (k) => String(fresh[k] ?? '') !== String(baseline[k] ?? ''),
    );
    if (mismoCampoCambio) {
      const err = new Error('conflict');
      err.code = 'conflict';
      err.fresh = fresh;
      throw err;
    }
    await attempt(fresh._version || 0); // solo subió _version (trigger) → reintento
    return { ok: true, retried: true };
  }
}

/* ── F12 fusión + F14 supresión (callables Admin SDK) ── */

export async function mergeContacts(survivorId, mergedId) {
  const call = httpsCallable(fns, 'crmMergeContacts');
  return (await call({ survivorId, mergedId })).data;
}

export async function suppressContact(contactId) {
  const call = httpsCallable(fns, 'crmSuppressContact');
  return (await call({ contactId })).data;
}

export async function cancelSuppression(contactId) {
  const call = httpsCallable(fns, 'crmCancelSuppression');
  return (await call({ contactId })).data;
}

export async function addNote(contactId, text) {
  const u = store.get().user;
  await addDoc(collection(db, 'contacts', contactId, 'crmNotes'), {
    body: String(text || '').trim(),
    authorId: u ? u.uid : null,
    authorName: (store.get().profile && store.get().profile.nombre) || (u && u.email) || 'Asesor',
    createdAt: new Date().toISOString(),
  });
}
