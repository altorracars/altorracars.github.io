// ============================================================
// PIPELINE — lógica PURA del embudo de ventas (blueprint §5).
// Determinista: forecast = Σ(monto × probabilidad). Sin LLM.
// ⚠️ ETAPAS v3 = ESPEJO de functions/shared/crm-spec.js (F35 §181):
// si cambias algo aquí, cámbialo allá — el test de PARIDAD
// (functions/shared/crm-spec-parity.test.js) revienta si divergen.
// ============================================================

import { daysSince } from './format.js';

export const PIPELINE_ID = 'ventas';

// Etapas v3 (aprobadas por el dueño, §176): nombres inconfundibles para
// novatos ("Cuadrando cita" = coordinando · "Cita fijada" = ya hay fecha).
// `vendido` es terminal (won) → NO es columna del kanban; se alcanza con
// "Marcar ganado". calificar=convertir: el deal NACE en cuadrando_cita.
export const PIPELINE_STAGES = [
  { id: 'cuadrando_cita',    label: 'Cuadrando cita',      prob: 0.20 },
  { id: 'cita_fijada',       label: 'Cita fijada',         prob: 0.35 },
  { id: 'visita_test_drive', label: 'Visita / Test drive', prob: 0.50 },
  { id: 'negociacion',       label: 'Negociación',         prob: 0.70 },
  { id: 'apartado',          label: 'Apartado',            prob: 0.90 },
  { id: 'vendido',           label: 'Vendido',             prob: 1.00, won: true },
];

export const LOST_STAGE = { id: 'perdido', label: 'Perdido', prob: 0, lost: true };

// Gates por etapa (F8): campos que el mini-prompt exige al ENTRAR (espejo
// de crm-spec.STAGE_GATES; el de salida de visita_test_drive = huboTestDrive).
export const STAGE_GATES = {
  _exit_visita_test_drive: ['huboTestDrive'],
  apartado: ['montoApartado', 'venceEl'],
  vendido: ['tipoPago'],
  perdido: ['lostReason'],
};

const _ORDER = PIPELINE_STAGES.map((s) => s.id);

/**
 * Matriz de transiciones (espejo de crm-spec.dealTransition):
 * adelante (incl. saltos) = gates ACUMULADOS en un prompt · atrás = razón
 * obligatoria · vendido terminal (anulación = server) · perdido exige razón.
 */
export function dealTransition(from, to) {
  if (from === to) return { ok: true, needsReason: false, gates: [] };
  const valid = (s) => s === LOST_STAGE.id || _ORDER.includes(s);
  if (!valid(from) || !valid(to)) return { ok: false, error: 'etapa_desconocida' };
  if (from === 'vendido') return { ok: false, error: 'vendido_es_terminal' };
  if (to === LOST_STAGE.id) return { ok: true, needsReason: false, gates: STAGE_GATES.perdido.slice() };
  if (from === LOST_STAGE.id) return { ok: true, needsReason: true, gates: [] };
  const i = _ORDER.indexOf(from);
  const j = _ORDER.indexOf(to);
  if (j > i) {
    const gates = [];
    for (let k = i; k < j; k++) {
      if (_ORDER[k] === 'visita_test_drive') gates.push(...STAGE_GATES._exit_visita_test_drive);
      const entering = _ORDER[k + 1];
      if (STAGE_GATES[entering]) gates.push(...STAGE_GATES[entering]);
    }
    return { ok: true, needsReason: false, gates: [...new Set(gates)] };
  }
  return { ok: true, needsReason: true, gates: [], recalcVehicle: from === 'apartado' };
}

export const LOST_REASONS = [
  { id: 'precio', label: 'Precio' },
  { id: 'financiacion_negada', label: 'Financiación negada' },
  { id: 'compro_en_otro_lado', label: 'Compró en otro lado' },
  { id: 'no_responde', label: 'No responde' },
  { id: 'cambio_de_opinion', label: 'Cambió de opinión' },
  { id: 'error_de_registro', label: 'Error de registro' },
  { id: 'otro', label: 'Otro motivo' },
];

// Columnas del kanban = etapas abiertas (sin la terminal "vendido").
export const OPEN_STAGES = PIPELINE_STAGES.filter((s) => !s.won);

const STAGE_MAP = [...PIPELINE_STAGES, LOST_STAGE].reduce((m, s) => ((m[s.id] = s), m), {});

export function stageById(id) {
  return STAGE_MAP[id] || PIPELINE_STAGES[0];
}

export function probFor(stageId) {
  const s = STAGE_MAP[stageId];
  return s ? s.prob : 0;
}

export function weighted(deal) {
  return Math.round((Number(deal.amount) || 0) * probFor(deal.stageId));
}

/** Forecast ponderado de un conjunto de deals (solo open). */
export function forecast(deals) {
  return deals.reduce((sum, d) => sum + (d.status === 'open' ? weighted(d) : 0), 0);
}

/** Valor total bruto (sin ponderar) de deals open. */
export function totalValue(deals) {
  return deals.reduce((sum, d) => sum + (d.status === 'open' ? (Number(d.amount) || 0) : 0), 0);
}

/** Deal "estancado": open + sin actividad > rottingDays. */
export function isRotting(deal, rottingDays = 14) {
  return deal.status === 'open' && daysSince(deal.lastActivityAt) > rottingDays;
}

/** Agrupa deals open por etapa (para el kanban). */
export function groupByStage(deals) {
  const groups = {};
  for (const s of OPEN_STAGES) groups[s.id] = [];
  for (const d of deals) {
    if (d.status !== 'open') continue;
    (groups[d.stageId] || (groups[d.stageId] = [])).push(d);
  }
  return groups;
}

/* ── E4 (§186): post-venta F10 · colisión F26 · liquidación F42 ──────────
 * ESPEJO de functions/shared/crm-spec.js (el test de paridad lo afirma). */

export const POSTVENTA_CHECKLIST = [
  { id: 'entrega',       label: 'Entrega del vehículo',           dueDays: 3 },
  { id: 'traspaso_runt', label: 'Traspaso / RUNT',                dueDays: 15 },
  { id: 'tramites',      label: 'Trámites (SOAT, impuestos, GPS)', dueDays: 15 },
];

/** F26: 2+ deals ABIERTOS sobre el mismo vehicleId → [{vehicleId, dealIds}]. */
export function detectCollisions(deals) {
  const byVehicle = {};
  for (const d of deals || []) {
    if (!d || d.status !== 'open' || !d.vehicleId) continue;
    (byVehicle[d.vehicleId] = byVehicle[d.vehicleId] || []).push(d.id || null);
  }
  const out = [];
  for (const vehicleId of Object.keys(byVehicle)) {
    if (byVehicle[vehicleId].length > 1) {
      out.push({ vehicleId, dealIds: byVehicle[vehicleId] });
    }
  }
  return out;
}

/** F42: deal GANADO con checklist post-venta completo = entra a liquidación. */
export function dealLiquidable(deal) {
  if (!deal || deal.status !== 'won') return false;
  const pv = deal.postventa || {};
  return POSTVENTA_CHECKLIST.every((item) => pv[item.id] === true);
}

/**
 * Construye los campos de negocio de un deal a partir de un lead.
 * F7 §181: `extras` viene del diálogo canónico de conversión —
 * vehículo (o 'sin vehículo aún' explícito), valorEstimado OBLIGATORIO
 * (prellenado del precio del vehículo) y owner (default = lead.owner).
 */
export function dealFromLead(lead, extras = {}) {
  const veh = extras.vehicleId !== undefined ? (extras.vehicleId || '') : (lead.vehicleOfInterestId || '');
  const firstStage = PIPELINE_STAGES[0];
  return {
    name: (lead.fullName || 'Oportunidad') + (veh ? ' · ' + (extras.vehicleName || veh) : ''),
    contactId: lead.contactId || null,
    contactName: lead.fullName || '',
    leadId: lead.id || null,
    vehicleId: veh || null,
    vehicleName: extras.vehicleName || veh || '',
    sinVehiculoAun: !veh,
    pipelineId: PIPELINE_ID,
    stageId: firstStage.id,
    stageName: firstStage.label,
    status: 'open',
    amount: Number(extras.amount) || 0,
    currency: 'COP',
    probability: firstStage.prob,
    weightedAmount: Math.round((Number(extras.amount) || 0) * firstStage.prob),
    expectedCloseDate: null,
    ownerId: extras.ownerId !== undefined ? extras.ownerId : (lead.ownerId || null),
    ownerName: extras.ownerName !== undefined ? extras.ownerName : (lead.ownerName || null),
    source: lead.source || 'web',
    nextStep: extras.nota || '',
  };
}
