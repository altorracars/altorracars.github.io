// ============================================================
// Capa de DATOS del Pipeline (Firestore modular).
// Realtime acotado (status==open + limit + unsubscribe). Índice:
// deals(status, lastActivityAt). Mutaciones admin-only (crm.edit).
// ============================================================

import {
  collection, query, where, orderBy, limit, onSnapshot,
  doc, updateDoc, addDoc, increment,
} from 'firebase/firestore';
import { db } from '../../core/firebase.js';
import { store } from '../../core/store.js';
import { dealFromLead, stageById, probFor } from '../../domain/pipeline.js';

const nowISO = () => new Date().toISOString();
const withId = (d) => ({ id: d.id, ...d.data() });
const currentUid = () => (store.get().user ? store.get().user.uid : null);

function activity(dealId, name, subject) {
  return addDoc(collection(db, 'activities'), {
    type: 'deal', subject, body: '', status: 'closed', direction: 'outbound',
    relatedTo: { type: 'deal', id: dealId, name: name || '' },
    ownerId: currentUid(), createdAt: nowISO(), _version: 1,
  });
}

/** Suscripción a los deals abiertos (kanban). */
export function subscribeDeals({ pageSize = 100, onData, onError }) {
  const q = query(
    collection(db, 'deals'),
    where('status', '==', 'open'),
    orderBy('lastActivityAt', 'desc'),
    limit(pageSize)
  );
  return onSnapshot(q, (snap) => onData(snap.docs.map(withId)), (err) => onError && onError(err));
}

/** Convierte un lead en oportunidad: crea deal + marca el lead + deja rastro. */
export async function createDealFromLead(lead) {
  const ts = nowISO();
  const base = dealFromLead(lead);
  const ref = await addDoc(collection(db, 'deals'), {
    ...base,
    weightedAmount: 0,
    lastActivityAt: ts, createdAt: ts, updatedAt: ts,
    createdBy: currentUid(), updatedBy: currentUid(), _version: 1,
  });
  // Marca el lead como convertido (no se pierde el rastro).
  await updateDoc(doc(db, 'leads', lead.id), {
    status: 'convertido',
    convertedTo: { dealId: ref.id },
    lastActivityAt: ts, updatedAt: ts, updatedBy: currentUid(), _version: increment(1),
  });
  await activity(ref.id, base.contactName, 'Oportunidad creada desde lead');
  return ref.id;
}

export async function updateDealStage(dealId, stageId, deal = {}) {
  const ts = nowISO();
  const st = stageById(stageId);
  await updateDoc(doc(db, 'deals', dealId), {
    stageId, stageName: st.label, probability: st.prob,
    weightedAmount: Math.round((Number(deal.amount) || 0) * st.prob),
    lastActivityAt: ts, updatedAt: ts, updatedBy: currentUid(), _version: increment(1),
  });
  await activity(dealId, deal.contactName, 'Etapa → ' + st.label);
}

export async function setDealAmount(dealId, amount, deal = {}) {
  const ts = nowISO();
  const amt = Math.max(0, Math.round(Number(amount) || 0));
  await updateDoc(doc(db, 'deals', dealId), {
    amount: amt,
    weightedAmount: Math.round(amt * probFor(deal.stageId)),
    updatedAt: ts, updatedBy: currentUid(), _version: increment(1),
  });
}

export async function markWon(dealId, deal = {}) {
  const ts = nowISO();
  await updateDoc(doc(db, 'deals', dealId), {
    status: 'won', stageId: 'vendido', stageName: 'Vendido', probability: 1,
    weightedAmount: Number(deal.amount) || 0,
    lastActivityAt: ts, updatedAt: ts, updatedBy: currentUid(), _version: increment(1),
  });
  await activity(dealId, deal.contactName, '🎉 Venta GANADA');
}

export async function markLost(dealId, reason, deal = {}) {
  const ts = nowISO();
  await updateDoc(doc(db, 'deals', dealId), {
    status: 'lost', stageId: 'perdido', stageName: 'Perdido', probability: 0,
    weightedAmount: 0, lostReason: String(reason || '').trim() || 'Sin motivo',
    lastActivityAt: ts, updatedAt: ts, updatedBy: currentUid(), _version: increment(1),
  });
  await activity(dealId, deal.contactName, 'Perdido: ' + (reason || 'sin motivo'));
}
