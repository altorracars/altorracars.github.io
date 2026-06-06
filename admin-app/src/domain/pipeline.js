// ============================================================
// PIPELINE — lógica PURA del embudo de ventas (blueprint §5).
// Determinista: forecast = Σ(monto × probabilidad). Sin LLM.
// Etapas hardcoded hoy; config/pipelines editable = futuro.
// ============================================================

import { daysSince } from './format.js';

export const PIPELINE_ID = 'ventas';

// Etapas del embudo. `vendido` es terminal (won) → NO es columna del kanban
// (las columnas = etapas abiertas); se alcanza con la acción "Marcar ganado".
export const PIPELINE_STAGES = [
  { id: 'nuevo',         label: 'Nuevo',          prob: 0.10 },
  { id: 'contactado',    label: 'Contactado',     prob: 0.20 },
  { id: 'cita_agendada', label: 'Cita agendada',  prob: 0.35 },
  { id: 'visito',        label: 'Visitó',         prob: 0.50 },
  { id: 'test_drive',    label: 'Test drive',     prob: 0.65 },
  { id: 'negociacion',   label: 'Negociación',    prob: 0.80 },
  { id: 'financiacion',  label: 'Financiación',   prob: 0.90 },
  { id: 'vendido',       label: 'Vendido',        prob: 1.00, won: true },
];

export const LOST_STAGE = { id: 'perdido', label: 'Perdido', prob: 0, lost: true };

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

/** Construye los campos de negocio de un deal a partir de un lead (lead→oportunidad). */
export function dealFromLead(lead) {
  const veh = lead.vehicleOfInterestId || '';
  const firstStage = PIPELINE_STAGES[0];
  return {
    name: (lead.fullName || 'Oportunidad') + (veh ? ' · ' + veh : ''),
    contactId: lead.contactId || null,
    contactName: lead.fullName || '',
    leadId: lead.id || null,
    vehicleId: veh || null,
    vehicleName: veh || '',
    pipelineId: PIPELINE_ID,
    stageId: firstStage.id,
    stageName: firstStage.label,
    status: 'open',
    amount: 0,
    currency: 'COP',
    probability: firstStage.prob,
    weightedAmount: 0,
    expectedCloseDate: null,
    ownerId: lead.ownerId || null,
    ownerName: lead.ownerName || null,
    source: lead.source || 'web',
    nextStep: '',
  };
}
