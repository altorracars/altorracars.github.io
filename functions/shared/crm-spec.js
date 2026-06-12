/**
 * crm-spec.js — SPEC ÚNICA de invariantes del CRM (F35a, ADR §176 E0)
 *
 * Fuente de verdad de: enums v3 (lead/deal), razones de descarte/pérdida,
 * gates por etapa, matriz de transiciones y políticas de expiración.
 * La consumen: triggers (functions), el chequeo diario (F28, E2) y los tests
 * de paridad (F30). Las Firestore Rules se escriben ESPEJÁNDOLA y el test de
 * paridad lo afirma — si cambias algo aquí, cambia Rules + UI en el MISMO pase.
 *
 * ⚠️ E0 define la spec; los enums v3 NO se enforcan en Rules/UI hasta E1b
 *    (F35b: secuencia Rules→cache bump→migración de datos→UI). Hasta entonces
 *    conviven con los valores v2 listados en LEGACY (necesarios para migrar).
 *
 * Lógica PURA: cero Firebase, cero I/O — unit-testeable con vitest.
 */
'use strict';

/* ── Estados del LEAD v3 (aprobados por el dueño 2026-06-09) ───────────── */
const LEAD_STATUSES = ['nuevo', 'contactado', 'convertido', 'descartado'];

/* Razones de descarte (picklist obligatoria al descartar).
 * 'inalcanzable' ≠ 'no_califica': separa "el canal trae gente incontactable"
 * de "el canal trae gente que no califica" (métrica por fuente, F31). */
const DISCARD_REASONS = [
  'inalcanzable',          // N intentos sin respuesta
  'no_califica',           // sin presupuesto/intención real
  'duplicado',
  'ya_compro_en_otra_parte',
  'spam_prueba',
];

/* Transiciones de LEAD permitidas DESDE EL CLIENTE (UI).
 * 'convertido' NUNCA se escribe a mano: solo vía "Calificar → crear negocio"
 * (F7) o lo deshace la callable de anulación (server). Un lead con
 * convertedTo.dealId es INMUTABLE en status para el cliente (F1). */
const LEAD_TRANSITIONS = {
  nuevo:      ['contactado', 'descartado'],
  contactado: ['descartado'],         // avanzar = convertir (vía F7, no dropdown)
  convertido: [],                     // congelado (server-only)
  descartado: ['nuevo', 'contactado'] // reapertura permitida (se equivocó)
};

/* ── Etapas del DEAL v3 (aprobadas por el dueño 2026-06-09) ────────────── */
const DEAL_STAGES = [
  { id: 'cuadrando_cita',    label: 'Cuadrando cita',    prob: 0.20 },
  { id: 'cita_fijada',       label: 'Cita fijada',       prob: 0.35 },
  { id: 'visita_test_drive', label: 'Visita / Test drive', prob: 0.50 },
  { id: 'negociacion',       label: 'Negociación',       prob: 0.70 },
  { id: 'apartado',          label: 'Apartado',          prob: 0.90 },
  { id: 'vendido',           label: 'Vendido',           prob: 1.00, won: true },
];
const DEAL_LOST = { id: 'perdido', label: 'Perdido', prob: 0, lost: true };

const LOST_REASONS = [
  'precio',
  'financiacion_negada',
  'compro_en_otro_lado',
  'no_responde',
  'cambio_de_opinion',
  'error_de_registro',     // usado por la doctrina de anulación tardía (F7)
  'otro',
];

/* Gates por etapa (F8): campos OBLIGATORIOS para ENTRAR a la etapa key.
 * En saltos hacia adelante los gates de etapas saltadas se ACUMULAN (un solo
 * prompt). El gate de visita_test_drive se exige al SALIR de ella (huboTestDrive). */
const STAGE_GATES = {
  // gate de salida: para salir de visita_test_drive hacia ADELANTE
  _exit_visita_test_drive: ['huboTestDrive'],
  apartado: ['montoApartado', 'venceEl'],   // venceEl default: +72h
  vendido:  ['tipoPago'],                   // contado | financiado
  perdido:  ['lostReason'],                 // picklist LOST_REASONS
};

const APARTADO_DEFAULT_HOURS = 72;

/* ── Política de expiración de citas (F19/F20, se opera en E2) ─────────── */
const HOLD_EXPIRY_HOURS_BEFORE_START = 3; // pendiente sin confirmar a T-3h → caducada

/* ── F10 (E4) — Checklist post-venta del deal GANADO ───────────────────────
 * Booleanos en deal.postventa.{id} + activity-recordatorio automática al
 * ganar con ID determinista `postventa_{dealId}_{id}` (dueDays desde wonAt).
 * El checklist completo es condición de liquidación (F42 → dealLiquidable). */
const POSTVENTA_CHECKLIST = [
  { id: 'entrega',       label: 'Entrega del vehículo',           dueDays: 3 },
  { id: 'traspaso_runt', label: 'Traspaso / RUNT',                dueDays: 15 },
  { id: 'tramites',      label: 'Trámites (SOAT, impuestos, GPS)', dueDays: 15 },
];

/* ── F25 (E4) — Estado del vehículo como AGREGADO de sus deals ─────────────
 * 'disponible'/'apartado'/'vendido' los gestiona el CRM (recálculo);
 * 'reservado'/'borrador' son MANUALES (legacy/admin) y el agregado no los pisa. */
const VEHICLE_STATES = ['disponible', 'apartado', 'vendido', 'reservado', 'borrador'];
const CRM_MANAGED_VEHICLE_STATES = ['disponible', 'apartado', 'vendido'];

/* ── Regla sourceUpdatedAt (B.4): updateTime del evento; aplicar solo si
 *    nuevo > almacenado; IGUAL = retry del mismo write → descartar. ───── */

/* ── Valores LEGACY v2 (solo para la migración F35b — NO usar en código nuevo) ── */
const LEGACY = {
  leadStatuses: ['calificado', 'no_calificado', 'perdido'],
  leadMigration: {
    no_calificado: { status: 'descartado', discardReason: 'no_califica' },
    perdido:       { status: 'descartado', discardReason: 'inalcanzable' }, // revisar en dry-run
    calificado:    { status: 'contactado' }, // + tarea al owner: convertir o descartar
  },
  dealStages: ['nuevo', 'contactado', 'cita_agendada', 'visito', 'test_drive', 'financiacion'],
  dealStageMigration: {
    nuevo: 'cuadrando_cita', contactado: 'cuadrando_cita',
    cita_agendada: 'cita_fijada', visito: 'visita_test_drive',
    test_drive: 'visita_test_drive', financiacion: 'negociacion',
  },
};

/* ═══ Helpers puros ═══ */

const _stageOrder = DEAL_STAGES.map((s) => s.id);

function stageIndex(stageId) { return _stageOrder.indexOf(stageId); }

function isValidLeadStatus(s) { return LEAD_STATUSES.includes(s); }
function isValidDealStage(s) { return s === DEAL_LOST.id || _stageOrder.includes(s); }
function isValidDiscardReason(r) { return DISCARD_REASONS.includes(r); }
function isValidLostReason(r) { return LOST_REASONS.includes(r); }

/** F1: un lead con deal vinculado es inmutable en `status` para el cliente. */
function isLeadLocked(lead) {
  return !!(lead && lead.convertedTo && lead.convertedTo.dealId);
}

/** ¿La UI puede cambiar el status de un lead from→to? (server bypasea) */
function canLeadTransition(from, to) {
  if (from === to) return true; // no-op
  const allowed = LEAD_TRANSITIONS[from];
  return Array.isArray(allowed) && allowed.includes(to);
}

/**
 * Matriz de transiciones del DEAL (D.3):
 *  - adelante: permitido (incl. saltos) — gates de etapas saltadas se acumulan
 *  - atrás: permitido CON razón obligatoria (regressReason)
 *  - vendido: terminal salvo anulación admin (server)
 *  - perdido: alcanzable desde toda etapa abierta, exige lostReason
 * Devuelve { ok, needsReason, gates:[campos requeridos] } o { ok:false, error }.
 */
function dealTransition(from, to) {
  if (from === to) return { ok: true, needsReason: false, gates: [] };
  if (!isValidDealStage(from) || !isValidDealStage(to)) {
    return { ok: false, error: 'etapa_desconocida' };
  }
  if (from === 'vendido') return { ok: false, error: 'vendido_es_terminal' };
  if (to === DEAL_LOST.id) return { ok: true, needsReason: false, gates: STAGE_GATES.perdido.slice() };
  if (from === DEAL_LOST.id) return { ok: true, needsReason: true, gates: [] }; // reabrir un perdido: razón

  const i = stageIndex(from);
  const j = stageIndex(to);
  if (j > i) {
    // adelante (con saltos): acumula gates de cada etapa que se cruza
    const gates = [];
    for (let k = i; k < j; k++) {
      if (_stageOrder[k] === 'visita_test_drive') gates.push(...STAGE_GATES._exit_visita_test_drive);
      const entering = _stageOrder[k + 1];
      if (STAGE_GATES[entering]) gates.push(...STAGE_GATES[entering]);
    }
    return { ok: true, needsReason: false, gates: [...new Set(gates)] };
  }
  // atrás: razón obligatoria; desde apartado además recalcular agregado (F25)
  return { ok: true, needsReason: true, gates: [], recalcVehicle: from === 'apartado' };
}

/* ═══ Helpers E4 (F25 / F26 / F42) ═══ */

/**
 * F25: estado AGREGADO del vehículo a partir de TODOS sus deals.
 * Algún deal ganado → 'vendido' (terminal); algún deal open en 'apartado'
 * → 'apartado'; si no → 'disponible'. lost/anulado no cuentan.
 */
function computeVehicleState(deals) {
  let hasWon = false;
  let hasApartado = false;
  for (const d of deals || []) {
    if (!d) continue;
    if (d.status === 'won') hasWon = true;
    else if (d.status === 'open' && d.stageId === 'apartado') hasApartado = true;
  }
  if (hasWon) return 'vendido';
  if (hasApartado) return 'apartado';
  return 'disponible';
}

/**
 * F25: ¿el recálculo puede escribir `target` sobre el estado actual?
 *  - 'vendido' actual es TERMINAL para el agregado (markAsSold legacy puede
 *    vender SIN deal CRM — el recálculo jamás "des-vende"; revertir = admin).
 *  - degradar a 'disponible' solo desde 'apartado' (jamás pisar los estados
 *    manuales 'reservado'/'borrador').
 *  - subir a 'apartado'/'vendido': el CRM manda.
 */
function shouldWriteVehicleState(current, target) {
  const cur = current || 'disponible';
  if (cur === target) return false;
  if (cur === 'vendido') return false;
  if (target === 'disponible') return cur === 'apartado';
  return true;
}

/**
 * F26: detecta colisiones comerciales — 2+ deals ACTIVOS (open) sobre el
 * mismo vehicleId. No bloquea (dos compradores reales pueden competir);
 * devuelve [{ vehicleId, dealIds }] para warning UI + alerta F38.
 */
function detectCollisions(deals) {
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

/**
 * F42: ¿el deal entra a liquidación de comisiones? Política del dueño
 * (aprobada 2026-06-09): "si no está registrado en el CRM, no entra" —
 * deal GANADO con checklist post-venta F10 completo.
 */
function dealLiquidable(deal) {
  if (!deal || deal.status !== 'won') return false;
  const pv = deal.postventa || {};
  return POSTVENTA_CHECKLIST.every((item) => pv[item.id] === true);
}

module.exports = {
  LEAD_STATUSES, DISCARD_REASONS, LEAD_TRANSITIONS,
  DEAL_STAGES, DEAL_LOST, LOST_REASONS, STAGE_GATES,
  APARTADO_DEFAULT_HOURS, HOLD_EXPIRY_HOURS_BEFORE_START, LEGACY,
  POSTVENTA_CHECKLIST, VEHICLE_STATES, CRM_MANAGED_VEHICLE_STATES,
  stageIndex, isValidLeadStatus, isValidDealStage,
  isValidDiscardReason, isValidLostReason,
  isLeadLocked, canLeadTransition, dealTransition,
  computeVehicleState, shouldWriteVehicleState, detectCollisions, dealLiquidable,
};
