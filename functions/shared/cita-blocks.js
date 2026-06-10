'use strict';

/**
 * cita-blocks.js — modelo de BLOQUES de 30 min del calendario único
 * (F19, ADR §184 — spec C.3 del comité §176). Lógica PURA (testeable
 * sin Firebase):
 *
 *  - Una cita ocupa ceil(duracionMin/30) bloques contiguos.
 *  - La tupla (asesorId, intervalo) + (vehicleId, intervalo) se reserva
 *    al CONFIRMAR en `resource_slots/{YYYY-MM-DD}` (la transacción vive
 *    en src/crm/citaActions.js; aquí solo la matemática y validación).
 *  - El slot GLOBAL del form web (config/bookedSlots) queda EXACTAMENTE
 *    como hoy — el puente público no se toca.
 */

const BLOCK_MIN = 30;
const BOGOTA_OFFSET_MS = -5 * 3600 * 1000;

function hhmmToMin(hhmm) {
  const m = String(hhmm || '').match(/^(\d{1,2}):(\d{2})$/);
  if (!m) return null;
  return parseInt(m[1], 10) * 60 + parseInt(m[2], 10);
}

function minToHhmm(min) {
  return String(Math.floor(min / 60)).padStart(2, '0') + ':' + String(min % 60).padStart(2, '0');
}

/**
 * Bloques de 30 min que ocupa una cita. '10:00' × 60min → ['10:00','10:30'].
 * Devuelve [] si la hora no parsea.
 */
function blocksFor(hora, duracionMin) {
  const start = hhmmToMin(hora);
  if (start == null) return [];
  const dur = Number.isFinite(duracionMin) && duracionMin > 0 ? duracionMin : 60;
  const n = Math.ceil(dur / BLOCK_MIN);
  const out = [];
  for (let i = 0; i < n; i++) out.push(minToHhmm(start + i * BLOCK_MIN));
  return out;
}

/**
 * Override activo de un asesor para una fecha (F21.5 — vacaciones,
 * incapacidad). overrides = config/availability.advisorOverrides.
 * Devuelve el override o null.
 */
function advisorOverrideFor(overrides, asesorId, fecha) {
  if (!overrides || !asesorId || !fecha) return null;
  const ov = overrides[asesorId];
  if (!ov || !ov.from || !ov.to) return null;
  return (fecha >= ov.from && fecha <= ov.to) ? ov : null;
}

/**
 * Valida (fecha, hora) contra el SSoT config/availability. PURA: el
 * caller pasa todayKey (fecha Bogotá de hoy 'YYYY-MM-DD').
 * Devuelve { ok:true } o { ok:false, reason:'…legible…' }.
 */
function validateSlot(av, fecha, hora, todayKey) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(fecha || ''))) return { ok: false, reason: 'Fecha inválida.' };
  const min = hhmmToMin(hora);
  if (min == null) return { ok: false, reason: 'Hora inválida.' };
  if (todayKey && fecha < todayKey) return { ok: false, reason: 'Esa fecha ya pasó.' };

  const labels = (av && av.blockedDateLabels) || {};
  if (Array.isArray(av && av.blockedDates) && av.blockedDates.includes(fecha)) {
    return { ok: false, reason: 'El ' + fecha + ' está bloqueado' + (labels[fecha] ? ' (' + labels[fecha] + ')' : ' (festivo o cierre)') + '.' };
  }
  const dow = new Date(fecha + 'T12:00:00Z').getUTCDay();
  const days = Array.isArray(av && av.days) ? av.days : [1, 2, 3, 4, 5, 6];
  if (!days.includes(dow)) return { ok: false, reason: 'Ese día no se atiende (revisa los días laborales).' };

  const startHour = av && av.startHour != null ? av.startHour : 9;
  const endHour = av && av.endHour != null ? av.endHour : 17;
  if (min < startHour * 60 || min >= endHour * 60) {
    return { ok: false, reason: 'La hora está fuera del horario (' + minToHhmm(startHour * 60) + '–' + minToHhmm(endHour * 60) + ').' };
  }
  if (min % BLOCK_MIN !== 0) return { ok: false, reason: 'La hora debe caer en bloques de 30 min (ej. 10:00 o 10:30).' };

  const bh = (av && av.blockedHours) || {};
  if (Array.isArray(bh[fecha]) && bh[fecha].includes(minToHhmm(min))) {
    return { ok: false, reason: 'Esa hora está bloqueada para el ' + fecha + '.' };
  }
  return { ok: true };
}

/** 'YYYY-MM-DD' de HOY en Bogotá para un instante dado. */
function bogotaDayKey(nowLike) {
  const t = new Date(nowLike || Date.now()).getTime();
  return new Date(t + BOGOTA_OFFSET_MS).toISOString().slice(0, 10);
}

/** Mañana 9:00 am Bogotá (ISO UTC) — para tareas de follow-up. */
function nextMorningISO(nowLike) {
  const t = new Date(nowLike || Date.now()).getTime();
  const local = new Date(t + BOGOTA_OFFSET_MS);
  const localMidnight = Date.UTC(local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate());
  return new Date(localMidnight + 24 * 3600e3 + 9 * 3600e3 - BOGOTA_OFFSET_MS).toISOString();
}

module.exports = {
  BLOCK_MIN, blocksFor, hhmmToMin, minToHhmm,
  advisorOverrideFor, validateSlot, bogotaDayKey, nextMorningISO,
};
