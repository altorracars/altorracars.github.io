// ============================================================
// Capa de DATOS de la Agenda. Lee `activities` con `dueAt` en el rango
// visible (rango sobre UN campo → índice de campo único AUTOMÁTICO,
// sin índice compuesto). Escribe citas agendadas.
// ============================================================

import {
  collection, query, where, orderBy, onSnapshot, addDoc,
} from 'firebase/firestore';
import { db } from '../../core/firebase.js';
import { store } from '../../core/store.js';

const withId = (d) => ({ id: d.id, ...d.data() });
const currentUid = () => (store.get().user ? store.get().user.uid : null);

/** Suscripción a las citas/eventos con dueAt dentro de [startISO, endISO). */
export function subscribeRange(startISO, endISO, onData, onError) {
  const q = query(
    collection(db, 'activities'),
    where('dueAt', '>=', startISO),
    where('dueAt', '<', endISO),
    orderBy('dueAt', 'asc')
  );
  return onSnapshot(q, (snap) => onData(snap.docs.map(withId)), (err) => onError && onError(err));
}

/** Agenda una cita (activity con dueAt) ligada a un lead. */
export async function scheduleActivity(lead, dueAtISO, subject) {
  return addDoc(collection(db, 'activities'), {
    type: 'cita',
    subject: subject || ('Cita con ' + (lead.fullName || '')),
    body: '',
    status: 'open',
    direction: 'outbound',
    dueAt: dueAtISO,
    relatedTo: { type: 'lead', id: lead.id || null, name: lead.fullName || '' },
    ownerId: lead.ownerId || currentUid(),
    createdAt: new Date().toISOString(),
    _version: 1,
  });
}
