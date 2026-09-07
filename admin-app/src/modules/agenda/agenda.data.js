// ============================================================
// Capa de DATOS de la Agenda. Lee `activities` con `dueAt` en el rango
// visible (rango sobre UN campo → índice de campo único AUTOMÁTICO,
// sin índice compuesto). Escribe citas agendadas.
// ============================================================

import {
  collection, query, where, orderBy, onSnapshot, addDoc, doc, getDoc, getDocs, limit, deleteDoc,
} from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { db, fns } from '../../core/firebase.js';
import { store } from '../../core/store.js';
import { isAllScope } from '../../core/auth.js';

const withId = (d) => ({ id: d.id, ...d.data() });
const currentUid = () => (store.get().user ? store.get().user.uid : null);
// §dataScope OLA-0.2: espejo del filtro de inbox/deals — sin él, las rules RECHAZAN la
// list query de un asesor scoped y "Nueva cita" moría con permission-denied.
const scopeCons = () => (isAllScope() ? [] : [where('ownerId', '==', currentUid())]);

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

/**
 * F18/F19 (ADR §184) — TODA acción de cita va por la callable transaccional
 * (cupos + tupla + token server-side; el cliente jamás escribe eso directo).
 * action: confirm | reschedule | cancel | no_show | complete | create | update | getConfirmLink
 */
export async function citaAction(action, solicitudId, payload) {
  const call = httpsCallable(fns, 'crmCitaAction');
  const res = await call({ action, solicitudId: solicitudId || null, payload: payload || {} });
  return res.data;
}

/** Solicitud fresca (SSoT de la cita) — la activity es solo proyección. */
export async function fetchSolicitud(id) {
  const s = await getDoc(doc(db, 'solicitudes', id));
  return s.exists() ? { id: s.id, ...s.data() } : null;
}

/** SSoT de disponibilidad + cupos globales (para pintar slots libres). */
export async function fetchAvailability() {
  const s = await getDoc(doc(db, 'config', 'availability'));
  return s.exists() ? s.data() : {};
}
export async function fetchBookedSlots() {
  const s = await getDoc(doc(db, 'config', 'bookedSlots'));
  return s.exists() ? s.data() : {};
}

/** Leads recientes para el buscador de "Nueva cita" (gap 5 F23-7).
 *  getDocs por mount del chooser (orderBy un campo = índice automático);
 *  el filtrado por nombre/teléfono es client-side sobre ≤300 docs. */
export async function fetchLeadsForCita() {
  const q = query(collection(db, 'leads'), ...scopeCons(), orderBy('createdAt', 'desc'), limit(300));
  const snap = await getDocs(q);
  return snap.docs.map(withId);
}

/** OLA-2.5: borra un EVENTO de la agenda (activity/tarea) directo — las rules
 *  ya lo permiten a super/crm.delete. Para CITAS reales usar citaAction
 *  ('delete'): libera cupo+tupla y barre la proyección server-side. */
export async function deleteActivity(activityId) {
  return deleteDoc(doc(db, 'activities', activityId));
}

/** Agenda una TAREA simple (activity con dueAt) ligada a un lead. */
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
