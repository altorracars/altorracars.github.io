// ============================================================
// Capa de DATOS de la Bandeja (Firestore modular).
// Reglas de oro (P4 / Consejo Externo §15.R3): SIEMPRE paginado + limit,
// onSnapshot acotado, y unsubscribe al cambiar de vista. Cero full-scan.
// Índices usados (Fase 1): leads(status,createdAt) · leads(ownerId,lastActivityAt).
// ============================================================

import {
  collection, query, orderBy, limit, startAfter, onSnapshot, getDocs,
  doc, updateDoc, addDoc, increment,
} from 'firebase/firestore';
import { db } from '../../core/firebase.js';
import { store } from '../../core/store.js';

const nowISO = () => new Date().toISOString();
const withId = (d) => ({ id: d.id, ...d.data() });

/**
 * Suscripción en tiempo real a la primera página de leads (orden createdAt desc).
 * Devuelve { unsubscribe, getLastDoc } para paginar y limpiar.
 */
export function subscribeLeads({ pageSize = 40, onData, onError }) {
  let lastDoc = null;
  const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'), limit(pageSize));
  const unsubscribe = onSnapshot(
    q,
    (snap) => {
      const rows = snap.docs.map(withId);
      lastDoc = snap.docs[snap.docs.length - 1] || null;
      onData(rows, { hasMore: snap.size >= pageSize });
    },
    (err) => { if (onError) onError(err); }
  );
  return { unsubscribe, getLastDoc: () => lastDoc };
}

/** Página siguiente (no realtime) a partir de un cursor. */
export async function loadMoreLeads({ pageSize = 40, after }) {
  if (!after) return { rows: [], lastDoc: null, hasMore: false };
  const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'), startAfter(after), limit(pageSize));
  const snap = await getDocs(q);
  return {
    rows: snap.docs.map(withId),
    lastDoc: snap.docs[snap.docs.length - 1] || null,
    hasMore: snap.size >= pageSize,
  };
}

/** Equipo (para asignar). Lectura puntual, cacheada en el store. */
export async function fetchTeam() {
  const snap = await getDocs(collection(db, 'usuarios'));
  const team = snap.docs
    .map((d) => {
      const u = d.data();
      return { uid: d.id, nombre: u.nombre || u.email || 'Usuario', cargo: u.cargo || u.roleName || '' };
    })
    .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
  store.set({ team });
  return team;
}

// ───────── Mutaciones (admin-only por reglas Fase 1: super_admin / crm.edit) ─────────

export async function assignLead(leadId, owner) {
  await updateDoc(doc(db, 'leads', leadId), {
    ownerId: owner ? owner.uid : null,
    ownerName: owner ? owner.nombre : null,
    updatedAt: nowISO(),
    updatedBy: currentUid(),
    _version: increment(1),
  });
}

export async function setLeadStatus(leadId, status, lead = {}) {
  const ts = nowISO();
  await updateDoc(doc(db, 'leads', leadId), {
    status,
    lastActivityAt: ts,
    updatedAt: ts,
    updatedBy: currentUid(),
    _version: increment(1),
  });
  // Deja rastro en el timeline (activity outbound).
  await addDoc(collection(db, 'activities'), {
    type: 'status_change',
    subject: 'Cambio de estado → ' + status,
    body: '',
    status: 'closed',
    direction: 'outbound',
    relatedTo: { type: 'lead', id: leadId, name: lead.fullName || '' },
    ownerId: currentUid(),
    createdAt: ts,
    _version: 1,
  });
}

/** Registra una actividad manual (ej. "WhatsApp enviado"). */
export async function logActivity(leadId, { type = 'nota', subject = '', body = '', direction = 'outbound', name = '' }) {
  await addDoc(collection(db, 'activities'), {
    type, subject, body, status: 'closed', direction,
    relatedTo: { type: 'lead', id: leadId, name },
    ownerId: currentUid(), createdAt: nowISO(), _version: 1,
  });
}

function currentUid() {
  const u = store.get().user;
  return u ? u.uid : null;
}
