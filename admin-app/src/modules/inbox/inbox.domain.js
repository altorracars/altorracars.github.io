// ============================================================
// Lógica PURA de la Bandeja: enriquecer, agrupar en colas, ordenar por
// urgencia, filtrar y buscar. Sin DOM, sin Firestore.
// ============================================================

import { scoreLead } from '../../domain/scoring.js';
import { computeNBA } from '../../domain/nba.js';
import {
  classifyType, channelOf, slaState, isUncontacted, isClosedStatus, isHighIntent,
} from '../../domain/classify.js';
import { normalizeSearch } from '../../domain/format.js';

/** Enriquecer un lead con score/temperatura/tipo/canal/SLA/NBA (computado). */
export function enrich(lead, activities = []) {
  const { score, rating, factors } = scoreLead(lead, activities, null);
  return {
    ...lead,
    _score: score,
    _rating: rating,
    _factors: factors,
    _type: classifyType(lead),
    _channel: channelOf(lead),
    _sla: slaState(lead),
    _nba: computeNBA(lead, { score }),
  };
}

export function enrichAll(leads) {
  return leads.map((l) => enrich(l));
}

export const QUEUES = [
  { id: 'calientes', label: 'Calientes sin contestar', iconId: 'flame' },
  { id: 'mios', label: 'Mis asignados', iconId: 'user' },
  { id: 'sin_asignar', label: 'Sin asignar', iconId: 'userPlus' },
  { id: 'todo', label: 'Todo', iconId: 'inbox' },
];

export function inQueue(lead, queueId, uid) {
  switch (queueId) {
    case 'calientes':
      // "A quién contestar YA": sin contestar y genuinamente caliente
      // (rating hot O alto-intent — speed-to-lead manda aunque el score
      // aún no acumule historial de actividad).
      return isUncontacted(lead) && !isClosedStatus(lead.status) &&
        (lead._rating === 'hot' || isHighIntent(lead));
    case 'mios':
      return lead.ownerId === uid;
    case 'sin_asignar':
      return !lead.ownerId && !isClosedStatus(lead.status);
    case 'todo':
    default:
      return true;
  }
}

export function queueCounts(leads, uid) {
  const counts = {};
  for (const q of QUEUES) counts[q.id] = 0;
  for (const l of leads) {
    for (const q of QUEUES) if (inQueue(l, q.id, uid)) counts[q.id]++;
  }
  return counts;
}

const URGENCY = { late: 0, warn: 1, ok: 2 };

export function sortByUrgency(a, b) {
  const sa = (a._sla && a._sla.state) || 'ok';
  const sb = (b._sla && b._sla.state) || 'ok';
  if (URGENCY[sa] !== URGENCY[sb]) return URGENCY[sa] - URGENCY[sb];
  if (b._score !== a._score) return b._score - a._score;
  return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
}

export function applyFilters(leads, { type, channel, status }) {
  return leads.filter((l) => {
    if (type && l._type.type !== type) return false;
    if (channel && l._channel.key !== channel) return false;
    if (status && (l.status || 'nuevo') !== status) return false;
    return true;
  });
}

export function applySearch(leads, term) {
  const q = normalizeSearch(term).trim();
  if (!q) return leads;
  return leads.filter((l) => {
    const hay = normalizeSearch([l.fullName, l.email, l.phone, l.sourceDetail, l.source].join(' '));
    return hay.includes(q);
  });
}

/**
 * F4-fase1 (ADR §176 E0): SLA de PRIMER CONTACTO visible en la tarjeta.
 * Mientras el lead siga 'nuevo' (nadie le ha hablado), minutos desde createdAt:
 * ok <45 · warn 45-59 · late >=60. Cero reads extra (puro sobre el lead).
 */
export function contactTimer(lead, now = Date.now()) {
  if ((lead.status || 'nuevo') !== 'nuevo') return null;
  const created = new Date(lead.createdAt || 0).getTime();
  if (!created) return null;
  const mins = Math.max(0, Math.floor((now - created) / 60000));
  return { mins, state: mins >= 60 ? 'late' : mins >= 45 ? 'warn' : 'ok' };
}

/**
 * F4-fase1 + F13 (§180): la vista default OCULTA los cerrados (perdido/
 * no_calificado/convertido) Y los ARCHIVADOS, con contador explícito
 * "N ocultos · ver todos" — nunca desaparición silenciosa. Un filtro de
 * estado explícito o showClosed los trae de vuelta (los archivados se
 * distinguen por su badge). Devuelve { rows, hiddenClosed }.
 */
export function buildView(leads, { queue, uid, filters, search, showClosed = false }) {
  let rows = leads.filter((l) => inQueue(l, queue, uid));
  rows = applyFilters(rows, filters);
  rows = applySearch(rows, search);
  let hiddenClosed = 0;
  if (!showClosed && !filters.status) {
    const open = rows.filter((l) => !isClosedStatus(l.status) && !l.archived);
    hiddenClosed = rows.length - open.length;
    rows = open;
  }
  rows.sort(sortByUrgency);
  return { rows, hiddenClosed };
}
