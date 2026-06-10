// ============================================================
// Capa de DATOS del Pipeline (Firestore modular).
// Realtime acotado (status==open + limit + unsubscribe). Índice:
// deals(status, lastActivityAt). Mutaciones admin-only (crm.edit).
// ============================================================

import {
  collection, query, where, orderBy, limit, onSnapshot, getDocs,
  doc, updateDoc, addDoc, increment,
} from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { db, fns } from '../../core/firebase.js';
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

/**
 * F7 (§181) — Convierte un lead en negocio desde el DIÁLOGO CANÓNICO:
 * `extras` = { vehicleId, vehicleName, amount (OBLIGATORIO), ownerId,
 * ownerName, nota }. Guarda `prevStatus` en convertedTo para que la
 * anulación server-side pueda descongelar el lead.
 */
export async function createDealFromLead(lead, extras = {}) {
  const ts = nowISO();
  const base = dealFromLead(lead, extras);
  const ref = await addDoc(collection(db, 'deals'), {
    ...base,
    lastActivityAt: ts, createdAt: ts, updatedAt: ts,
    createdBy: currentUid(), updatedBy: currentUid(), _version: 1,
  });
  // Marca el lead como convertido (no se pierde el rastro).
  await updateDoc(doc(db, 'leads', lead.id), {
    status: 'convertido',
    convertedTo: { dealId: ref.id, prevStatus: lead.status || 'contactado' },
    lastActivityAt: ts, updatedAt: ts, updatedBy: currentUid(), _version: increment(1),
  });
  await activity(ref.id, base.contactName, 'Oportunidad creada desde lead');
  return ref.id;
}

/** F7 — anulación compensatoria server-side (el "Deshacer" de la conversión). */
export async function anularConversion(dealId) {
  const call = httpsCallable(fns, 'anularConversion');
  const res = await call({ dealId });
  return res.data;
}

/** F7/F24 — inventario disponible para el selector del diálogo. */
export async function fetchAvailableVehicles() {
  const snap = await getDocs(query(
    collection(db, 'vehiculos'), where('estado', '==', 'disponible'), limit(60),
  ));
  return snap.docs.map((d) => {
    const v = d.data();
    return {
      id: d.id,
      label: [v.marca, v.modelo, v.year].filter(Boolean).join(' '),
      precio: Number(v.precioOferta || v.precio) || 0,
    };
  }).sort((a, b) => a.label.localeCompare(b.label, 'es'));
}

/**
 * F8 (§181) — mueve de etapa escribiendo UN solo doc (el trigger
 * onDealUpdated proyecta al lead y deja la activity de sistema).
 * `gateFields` = campos del mini-prompt (huboTestDrive, montoApartado,
 * venceEl, tipoPago, lostReason, regressReason, estadoCredito).
 */
export async function updateDealStage(dealId, stageId, deal = {}, gateFields = {}) {
  const ts = nowISO();
  const st = stageById(stageId);
  await updateDoc(doc(db, 'deals', dealId), {
    ...gateFields,
    stageId, stageName: st.label, probability: st.prob,
    weightedAmount: Math.round((Number(deal.amount) || 0) * st.prob),
    lastActivityAt: ts, updatedAt: ts, updatedBy: currentUid(), _version: increment(1),
  });
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

/** Ganar exige los gates acumulados (tipoPago + lo que falte) — vía gateFields. */
export async function markWon(dealId, deal = {}, gateFields = {}) {
  const ts = nowISO();
  await updateDoc(doc(db, 'deals', dealId), {
    ...gateFields,
    status: 'won', stageId: 'vendido', stageName: 'Vendido', probability: 1,
    weightedAmount: Number(deal.amount) || 0,
    lastActivityAt: ts, updatedAt: ts, updatedBy: currentUid(), _version: increment(1),
  });
}

/** Perder exige razón de picklist (LOST_REASONS v3). */
export async function markLost(dealId, reasonId, deal = {}) {
  const ts = nowISO();
  await updateDoc(doc(db, 'deals', dealId), {
    status: 'lost', stageId: 'perdido', stageName: 'Perdido', probability: 0,
    weightedAmount: 0, lostReason: String(reasonId || 'otro'),
    lastActivityAt: ts, updatedAt: ts, updatedBy: currentUid(), _version: increment(1),
  });
}
