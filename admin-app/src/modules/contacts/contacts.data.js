// ============================================================
// Capa de DATOS del Customer 360.
// Lee `contacts/{id}`, el timeline `activities` (índice relatedTo.id,createdAt)
// y notas internas `contacts/{id}/crmNotes`.
// ============================================================

import {
  doc, getDoc, getDocs, collection, query, where, orderBy, limit, onSnapshot, addDoc,
} from 'firebase/firestore';
import { db } from '../../core/firebase.js';
import { store } from '../../core/store.js';
import { getMockContacts, getMockLeads } from '../../core/mock.js';

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
  return { contacts, leads };
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

export async function addNote(contactId, text) {
  const u = store.get().user;
  await addDoc(collection(db, 'contacts', contactId, 'crmNotes'), {
    body: String(text || '').trim(),
    authorId: u ? u.uid : null,
    authorName: (store.get().profile && store.get().profile.nombre) || (u && u.email) || 'Asesor',
    createdAt: new Date().toISOString(),
  });
}
