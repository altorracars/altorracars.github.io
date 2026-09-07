// ============================================================
// SCORING — port del motor heurístico de 7 factores (admin-crm.js),
// adaptado al modelo canónico de Fase 1 (lead + activities + contact).
// 100% determinista, sin LLM/ALTOR (restricción dura del cliente §0).
//
// Factores (mismos 7 nombres del legado; pesos re-tunados a la data
// que el canónico SÍ tiene hoy):
//   intent(depth) · interactions · recency · frequency · economic · age · engagement
// Cuando se ingieran señales de `clientes` (favoritos/búsquedas/datosExtra
// de financiación), engagement/economic recuperan su peso pleno del legado.
// ============================================================

import { daysSince } from './format.js';
import { isHighIntent } from './classify.js';

const WEIGHTS = {
  intent: 0.30,        // legado: "profundidad/intención"
  interactions: 0.18,  // legado: "interacciones"
  recency: 0.22,       // legado: "recencia"
  frequency: 0.12,     // legado: "frecuencia"
  economic: 0.07,      // legado: "capacidad económica" (proxy desde activities)
  age: 0.06,           // legado: "antigüedad"
  engagement: 0.05,    // legado: "engagement" (contact.score si existe)
};

const clamp01 = (n) => Math.max(0, Math.min(1, n));

function intentFactor(lead) {
  const sd = String(lead.sourceDetail || '').toLowerCase();
  let v = 0.25; // base de cualquier lead
  if (isHighIntent(lead)) v = 1;
  else if (/(consignacion|consignación|peritaje|venta)/.test(sd)) v = 0.6;
  else if (/(consulta|info|general)/.test(sd) || !sd) v = 0.3;
  if (lead.vehicleOfInterestId) v = Math.min(1, v + 0.15);
  return clamp01(v);
}

function economicFactor(activities) {
  let best = 0;
  for (const a of activities) {
    const text = `${a.subject || ''} ${a.body || ''}`;
    if (!/financ/i.test(text)) continue;
    const nums = (text.match(/\d[\d.,]{5,}/g) || [])
      .map((s) => parseInt(s.replace(/\D/g, ''), 10))
      .filter((n) => n > 0);
    if (nums.length) best = Math.max(best, Math.max(...nums) / 50_000_000);
  }
  return clamp01(best);
}

function frequencyFactor(activities) {
  const days = new Set();
  for (const a of activities) {
    const ts = a.createdAt;
    if (!ts) continue;
    if (daysSince(ts) > 30) continue;
    days.add(String(ts).slice(0, 10));
  }
  return clamp01(days.size / 8);
}

/**
 * @param {object} lead       documento canónico `leads`
 * @param {object[]} activities  actividades del lead (relatedTo.id == lead.id)
 * @param {object|null} contact   documento `contacts` (opcional)
 * @returns {{score:number, rating:'hot'|'warm'|'cold', factors:object}}
 */
export function scoreLead(lead, activities = [], contact = null) {
  const acts = Array.isArray(activities) ? activities : [];

  const factors = {
    intent: intentFactor(lead),
    interactions: clamp01(acts.length / 6),
    recency: lead.lastActivityAt ? clamp01(1 - daysSince(lead.lastActivityAt) / 30) : 0,
    frequency: frequencyFactor(acts),
    economic: economicFactor(acts),
    age: lead.createdAt ? clamp01(daysSince(lead.createdAt) / 60) : 0,
    engagement: contact && Number(contact.score) ? clamp01(contact.score / 100) : 0,
  };

  let total = 0;
  for (const k of Object.keys(WEIGHTS)) total += factors[k] * WEIGHTS[k];
  const score = Math.round(total * 100);

  return { score, rating: ratingFor(score), factors };
}

export function ratingFor(score) {
  if (score >= 70) return 'hot';
  if (score >= 40) return 'warm';
  return 'cold';
}

export const RATING_META = {
  hot:  { label: 'Caliente', iconId: 'flame',     cls: 'temp--hot' },
  warm: { label: 'Tibio',    iconId: 'sun',       cls: 'temp--warm' },
  cold: { label: 'Frío',     iconId: 'snowflake', cls: 'temp--cold' },
};

export const FACTOR_LABELS = {
  intent: 'Intención',
  interactions: 'Interacciones',
  recency: 'Recencia',
  frequency: 'Frecuencia',
  economic: 'Capacidad econ.',
  age: 'Antigüedad',
  engagement: 'Engagement',
};

export const FACTOR_WEIGHTS = WEIGHTS;
