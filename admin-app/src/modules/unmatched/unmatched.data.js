// ============================================================
// "Lo que no entendí" (PLAN-UNIFICADO F-4, gap §2.B) — capa de datos.
// VISOR de `unmatchedQueries`: las preguntas que el bot rule-based NO supo
// responder = señal de FUGA de leads (un comprador preguntó y se fue sin
// respuesta). El admin las revisa, las marca vistas, las promueve a FAQ
// (Cerebro AI/KB) o las descarta. Port de js/admin/admin-unmatched.js (§22).
//
// Shape (verificado admin-unmatched.js): {query, keywords[], createdAt,
// seen/seenAt/seenBy, promotedToFAQ/promotedFAQId/promotedAt/promotedBy,
// sentiment('positive'|'negative'|null), sourcePage}. createdAt puede ser
// Timestamp o ISO → la UI normaliza (tsDate). Rules (firestore.rules:908):
// read=unmatched.read · update=unmatched.promote · delete=unmatched.delete.
// ============================================================

import {
  collection, onSnapshot, query, orderBy, limit, doc, updateDoc, deleteDoc, writeBatch,
} from 'firebase/firestore';
import { db } from '../../core/firebase.js';
import { store } from '../../core/store.js';

const UNMATCHED_LIMIT = 200; // mismo que el clásico
const nowISO = () => new Date().toISOString();
const currentUid = () => { const u = store.get().user; return u ? u.uid : null; };

/** Suscripción realtime (últimas 200, createdAt desc). */
export function subscribeUnmatched(onData, onError) {
  const q = query(collection(db, 'unmatchedQueries'), orderBy('createdAt', 'desc'), limit(UNMATCHED_LIMIT));
  return onSnapshot(q, (snap) => {
    const list = [];
    snap.forEach((d) => list.push({ _docId: d.id, ...d.data() }));
    onData(list);
  }, (err) => onError && onError(err));
}

/** Marca una query como vista (sale del bucket "Sin revisar"). Rules: unmatched.promote. */
export async function markSeen(docId) {
  await updateDoc(doc(db, 'unmatchedQueries', docId), { seen: true, seenAt: nowISO(), seenBy: currentUid() });
}

/** Marca TODAS las pendientes (no vistas, no promovidas) en un batch. Devuelve cuántas. */
export async function markAllSeen(entries) {
  const pend = (entries || []).filter((e) => !e.seen && !e.promotedToFAQ);
  if (!pend.length) return 0;
  const batch = writeBatch(db);
  const ts = nowISO();
  const by = currentUid();
  pend.forEach((e) => batch.update(doc(db, 'unmatchedQueries', e._docId), { seen: true, seenAt: ts, seenBy: by }));
  await batch.commit();
  return pend.length;
}

/** Hard delete (solo unmatched.delete = super_admin). Solo limpia la bandeja, no afecta al cliente. */
export async function deleteEntry(docId) {
  await deleteDoc(doc(db, 'unmatchedQueries', docId));
}

/**
 * Marca una query como promovida a FAQ (handoff Unmatched→Cerebro AI, F-4 2/3):
 * el módulo `cerebro` lo llama al guardar la FAQ prellenada. La saca del bucket
 * "Sin revisar". Rules: update=unmatched.promote. */
export async function markPromoted(docId, faqId) {
  await updateDoc(doc(db, 'unmatchedQueries', docId), {
    promotedToFAQ: true, promotedFAQId: faqId || null,
    promotedAt: nowISO(), promotedBy: currentUid(), seen: true,
  });
}

/* ── Mock (?mock=1) ─────────────────────────────────────────── */
export const MOCK_UNMATCHED = [
  { _docId: 'u1', query: '¿Tienen el Renault Koleos 2021 en negro?', keywords: ['renault', 'koleos', 'negro'], createdAt: '2026-06-25T16:40:00Z', seen: false, sentiment: null, sourcePage: '/busqueda.html' },
  { _docId: 'u2', query: 'me pueden financiar sin cuota inicial???', keywords: ['financiar', 'cuota', 'inicial'], createdAt: '2026-06-25T15:05:00Z', seen: false, sentiment: 'negative', sourcePage: '/detalle-vehiculo.html' },
  { _docId: 'u3', query: 'reciben mi carro en parte de pago', keywords: ['parte', 'pago', 'retoma'], createdAt: '2026-06-25T12:20:00Z', seen: true, seenAt: '2026-06-25T12:30:00Z', sentiment: null, sourcePage: '/' },
  { _docId: 'u4', query: '¿hacen domicilios a barranquilla?', keywords: ['domicilio', 'barranquilla', 'envio'], createdAt: '2026-06-24T19:10:00Z', seen: false, sentiment: null, sourcePage: '/marcas.html' },
  { _docId: 'u5', query: 'cual es el horario de atencion', keywords: ['horario', 'atencion'], createdAt: '2026-06-24T10:00:00Z', seen: true, promotedToFAQ: true, promotedFAQId: 'faq_horario', sentiment: 'positive', sourcePage: '/' },
];
