'use strict';

/**
 * business-hours.js — horas HÁBILES Colombia (F37, ADR §179).
 *
 * Horario del concesionario: lunes a sábado, 08:00–18:00, America/Bogota
 * (UTC-5 FIJO — Colombia no tiene DST). "2h hábiles" evita que un lead que
 * entra a las 11pm dispare la alerta a la 1am: el reloj solo corre dentro
 * del horario. Lógica PURA (testeable sin Firebase).
 */

const BOGOTA_OFFSET_MS = -5 * 3600 * 1000;
const OPEN_HOUR = 8;
const CLOSE_HOUR = 18;
const DAY_MS = 24 * 3600 * 1000;

/**
 * Horas hábiles transcurridas entre dos instantes (Date|ISO|ms). >= 0.
 */
function businessHoursBetween(startLike, endLike) {
  const start = new Date(startLike).getTime();
  const end = new Date(endLike).getTime();
  if (!Number.isFinite(start) || !Number.isFinite(end) || start >= end) return 0;

  let totalMs = 0;
  let cursor = start;
  while (cursor < end) {
    // "local Bogotá" representado como fake-UTC para usar getUTC*.
    const local = new Date(cursor + BOGOTA_OFFSET_MS);
    const dow = local.getUTCDay(); // 0 = domingo
    const localMidnight = Date.UTC(local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate());
    const openUtc = localMidnight + OPEN_HOUR * 3600e3 - BOGOTA_OFFSET_MS;
    const closeUtc = localMidnight + CLOSE_HOUR * 3600e3 - BOGOTA_OFFSET_MS;
    if (dow !== 0) { // lunes a sábado
      const a = Math.max(start, openUtc, cursor);
      const b = Math.min(end, closeUtc);
      if (b > a) totalMs += (b - a);
    }
    cursor = localMidnight + DAY_MS - BOGOTA_OFFSET_MS; // próxima medianoche local
  }
  return totalMs / 3600e3;
}

/**
 * Round-robin de asignación de intake (F37b): elige el owner siguiente de
 * config/crmIntake.rotation. Devuelve {owner: {uid, nombre}|null, next}.
 * Puro: el caller persiste `next` en la transacción.
 */
function pickFromRotation(cfg) {
  const rot = cfg && Array.isArray(cfg.rotation) ? cfg.rotation : [];
  if (!rot.length) return { owner: null, next: 0 };
  const idx = ((typeof cfg.next === 'number' ? cfg.next : 0) % rot.length + rot.length) % rot.length;
  const raw = rot[idx];
  const owner = typeof raw === 'string' ? { uid: raw, nombre: null } : { uid: raw.uid, nombre: raw.nombre || null };
  return { owner: owner.uid ? owner : null, next: (idx + 1) % rot.length };
}

module.exports = { businessHoursBetween, pickFromRotation, OPEN_HOUR, CLOSE_HOUR, BOGOTA_OFFSET_MS };
