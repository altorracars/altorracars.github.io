// ============================================================
// Capa de DATOS del Pipeline (Firestore modular).
// Realtime acotado (status==open + limit + unsubscribe). Índice:
// deals(status, lastActivityAt). Mutaciones admin-only (crm.edit).
// ============================================================

import {
  collection, query, where, orderBy, limit, onSnapshot, getDocs,
  doc, updateDoc, deleteDoc, addDoc, increment,
} from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { db, fns } from '../../core/firebase.js';
import { store } from '../../core/store.js';
import { writeAudit } from '../../core/audit.js';
import { dealFromLead, stageById, probFor } from '../../domain/pipeline.js';
import { isAllScope } from '../../core/auth.js';

const nowISO = () => new Date().toISOString();
const withId = (d) => ({ id: d.id, ...d.data() });
const currentUid = () => (store.get().user ? store.get().user.uid : null);
// §dataScope (opción A): el asesor (scope 'own') solo ve SUS deals; all/dueño sin filtro.
const scopeCons = () => (isAllScope() ? [] : [where('ownerId', '==', currentUid())]);

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
    ...scopeCons(),
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

/**
 * Borrado owner-only de un deal (rules: isSuperAdmin || crm.delete) — para
 * PURGAR data de prueba/basura (TODO-52 P0-OWNER-DELETE). Borra solo el doc del
 * deal; el lead de origen queda con `convertedTo` apuntando a un deal inexistente
 * (inocuo; si el lead también es basura se purga aparte con crmPurgeLead). Borrar
 * un deal GANADO lo saca de los reportes de Aliados/forecast (se recalculan vivos).
 * Para REVERTIR una conversión real (descongelar el lead) usar anularConversion.
 */
export async function deleteDeal(deal) {
  const dealId = typeof deal === 'string' ? deal : (deal && deal.id);
  if (!dealId) throw new Error('ID de negocio inválido.');
  await deleteDoc(doc(db, 'deals', dealId));
  const who = deal && (deal.contactName || deal.name);
  writeAudit('deal_delete', 'deal ' + dealId + (who ? ' (' + who + ')' : ''), '');
}

/** F7 — anulación compensatoria server-side (el "Deshacer" de la conversión). */
export async function anularConversion(dealId) {
  const call = httpsCallable(fns, 'anularConversion');
  const res = await call({ dealId });
  return res.data;
}

/** F7/F24 — inventario para el selector del diálogo. Incluye 'apartado'
 * (F26: dos compradores reales PUEDEN competir — el warning avisa, no
 * bloquea); el label lo deja claro para que nadie aparte a ciegas. */
export async function fetchAvailableVehicles() {
  const snap = await getDocs(query(
    collection(db, 'vehiculos'), where('estado', 'in', ['disponible', 'apartado']), limit(60),
  ));
  return snap.docs.map((d) => {
    const v = d.data();
    const apartado = v.estado === 'apartado';
    return {
      id: d.id,
      label: [v.marca, v.modelo, v.year].filter(Boolean).join(' ') + (apartado ? ' · ⚠ apartado' : ''),
      precio: Number(v.precioOferta || v.precio) || 0,
      apartado,
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
  const patch = {
    ...gateFields,
    stageId, stageName: st.label, probability: st.prob,
    weightedAmount: Math.round((Number(deal.amount) || 0) * st.prob),
    lastActivityAt: ts, updatedAt: ts, updatedBy: currentUid(), _version: increment(1),
  };
  // E4: coherencia status↔etapa (Rules la exigen) — reabrir un perdido
  // devuelve el deal a 'open' (antes quedaba lost+etapa abierta → invisible).
  if (deal.status === 'lost' && stageId !== 'perdido') patch.status = 'open';
  await updateDoc(doc(db, 'deals', dealId), patch);
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

/* ── E4 (§186) — F10 post-venta ─────────────────────────────────────────── */

/**
 * Deals GANADOS para el panel Post-venta. Reusa el índice existente
 * deals(status, lastActivityAt) — orderBy('wonAt') excluiría los wons
 * recién ganados cuyo trigger aún no escribe wonAt.
 */
export function subscribeWonDeals({ pageSize = 100, onData, onError }) {
  const q = query(
    collection(db, 'deals'),
    ...scopeCons(),
    where('status', '==', 'won'),
    orderBy('lastActivityAt', 'desc'),
    limit(pageSize)
  );
  return onSnapshot(q, (snap) => onData(snap.docs.map(withId)), (err) => onError && onError(err));
}

/**
 * Marca/desmarca un item del checklist post-venta (deal.postventa.{item})
 * y cierra/reabre la tarea-recordatorio determinista del trigger.
 * Las Rules solo permiten tocar postventa/recibeVehiculo + campos neutros
 * en un deal vendido (guard E4) — la base de comisión queda intacta.
 */
export async function updatePostventaItem(dealId, itemId, done) {
  const ts = nowISO();
  await updateDoc(doc(db, 'deals', dealId), {
    ['postventa.' + itemId]: done === true,
    lastActivityAt: ts, updatedAt: ts, updatedBy: currentUid(), _version: increment(1),
  });
  try {
    await updateDoc(doc(db, 'activities', 'postventa_' + dealId + '_' + itemId), done
      ? { status: 'closed', closedAt: ts, closedBy: currentUid() }
      : { status: 'open', closedAt: null, closedBy: null });
  } catch (e) {
    // La tarea puede no existir aún (trigger en vuelo) — el checklist del
    // deal es la SSoT; la tarea es solo recordatorio.
  }
}

/** F10 retoma — guarda/corrige los datos del vehículo recibido. */
export async function setRecibeVehiculo(dealId, rv) {
  const ts = nowISO();
  await updateDoc(doc(db, 'deals', dealId), {
    recibeVehiculo: {
      marca: String(rv.marca || '').trim(),
      modelo: String(rv.modelo || '').trim(),
      year: Number(rv.year) || null,
      placa: String(rv.placa || '').trim().toUpperCase(),
      valorEstimado: Number(rv.valorEstimado) || 0,
    },
    lastActivityAt: ts, updatedAt: ts, updatedBy: currentUid(), _version: increment(1),
  });
}

/** F10 retoma — crea el borrador en inventario (server-side, idempotente). */
export async function crearBorradorRetoma(dealId) {
  const call = httpsCallable(fns, 'crmCrearBorradorRetoma');
  const res = await call({ dealId });
  return res.data;
}
