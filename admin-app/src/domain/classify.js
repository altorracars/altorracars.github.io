// ============================================================
// Clasificación PURA del canónico → tipo / canal / SLA.
// Sin ALTOR, sin LLM: deriva de `source` / `sourceDetail` / `status`.
// Ported de la lógica de comm-schema.js (kind/computeMeta), adaptada
// al modelo canónico de Fase 1 (leads).
// ============================================================

import { daysSince } from './format.js';

// ── Tipo de comunicación (lead / cita / solicitud / pqr) ──
const HIGH_INTENT = ['financiacion', 'financiación', 'compra', 'test_drive', 'test-drive', 'cotizacion', 'cotización'];
const APPOINTMENT = ['cita', 'test_drive', 'test-drive', 'visita', 'agendar', 'peritaje'];
const REQUEST = ['financiacion', 'financiación', 'consignacion', 'consignación', 'consignacion_venta', 'compra', 'venta', 'cotizacion', 'cotización'];
const COMPLAINT = ['pqr', 'reclamo', 'queja', 'peticion', 'petición', 'garantia', 'garantía', 'soporte'];

const TYPE_META = {
  cita:      { label: 'Cita',      icon: '📅', badge: 'info' },
  solicitud: { label: 'Solicitud', icon: '📝', badge: 'gold' },
  pqr:       { label: 'PQR',       icon: '⚠️', badge: 'danger' },
  lead:      { label: 'Lead',      icon: '✨', badge: '' },
};

export function classifyType(lead) {
  const sd = String(lead.sourceDetail || '').toLowerCase();
  const src = String(lead.source || '').toLowerCase();
  let type = 'lead';
  if (COMPLAINT.some((k) => sd.includes(k) || src.includes(k))) type = 'pqr';
  else if (src.includes('cita') || APPOINTMENT.some((k) => sd.includes(k))) type = 'cita';
  else if (REQUEST.some((k) => sd.includes(k))) type = 'solicitud';
  return { type, ...TYPE_META[type] };
}

export function isHighIntent(lead) {
  const sd = String(lead.sourceDetail || '').toLowerCase();
  return HIGH_INTENT.some((k) => sd.includes(k)) || !!lead.vehicleOfInterestId;
}

// ── Canal de captura ──
const CHANNEL_META = {
  whatsapp:   { label: 'WhatsApp',   icon: '🟢', varName: '--ch-whatsapp' },
  bot:        { label: 'ALTOR Bot',  icon: '🤖', varName: '--ch-bot' },
  cuenta:     { label: 'Cuenta',     icon: '👤', varName: '--ch-cuenta' },
  newsletter: { label: 'Newsletter', icon: '✉️', varName: '--ch-newsletter' },
  cita:       { label: 'Cita web',   icon: '📅', varName: '--ch-cita' },
  web:        { label: 'Web',        icon: '🌐', varName: '--ch-web' },
};

export function channelOf(lead) {
  const src = String(lead.source || '').toLowerCase();
  let key = 'web';
  if (src.includes('whatsapp') || src.includes('wa')) key = 'whatsapp';
  else if (src.includes('bot') || src.includes('concierge') || src.includes('altor')) key = 'bot';
  else if (src.includes('cuenta') || src.includes('registro') || src.includes('account') || src.includes('signup')) key = 'cuenta';
  else if (src.includes('news') || src.includes('subscri') || src.includes('suscri')) key = 'newsletter';
  else if (src.includes('cita')) key = 'cita';
  return { key, ...CHANNEL_META[key] };
}

// ── SLA (speed-to-lead). Default por tipo si no vino slaDueAt. ──
const SLA_MS_BY_TYPE = {
  cita: 30 * 60 * 1000,        // 30 min
  pqr: 60 * 60 * 1000,         // 1 h
  solicitud: 2 * 60 * 60 * 1000, // 2 h
  lead: 24 * 60 * 60 * 1000,   // 24 h
};

export function slaState(lead) {
  const closed = isClosedStatus(lead.status);
  const { type } = classifyType(lead);
  let dueAt = lead.slaDueAt ? new Date(lead.slaDueAt).getTime() : null;
  if (!dueAt) {
    const base = lead.createdAt ? new Date(lead.createdAt).getTime() : Date.now();
    dueAt = base + (SLA_MS_BY_TYPE[type] || SLA_MS_BY_TYPE.lead);
  }
  const remainingMs = dueAt - Date.now();
  const totalMs = SLA_MS_BY_TYPE[type] || SLA_MS_BY_TYPE.lead;
  let state = 'ok';
  if (closed) state = 'ok';
  else if (remainingMs <= 0) state = 'late';
  else if (remainingMs < totalMs * 0.25) state = 'warn';
  return { state, dueAt, remainingMs, closed };
}

// ── Estados del lead (pipeline corto de la Bandeja) ──
export const LEAD_STATUSES = [
  { id: 'nuevo',         label: 'Nuevo',          badge: 'gold' },
  { id: 'contactado',    label: 'Contactado',     badge: 'info' },
  { id: 'calificado',    label: 'Calificado',     badge: 'ok' },
  { id: 'no_calificado', label: 'No calificado',  badge: '' },
  { id: 'convertido',    label: 'Convertido',     badge: 'ok' },
  { id: 'perdido',       label: 'Perdido',        badge: 'danger' },
];

const STATUS_MAP = LEAD_STATUSES.reduce((m, s) => ((m[s.id] = s), m), {});

export function statusMeta(status) {
  return STATUS_MAP[status] || { id: status || 'nuevo', label: status || 'Nuevo', badge: '' };
}

export function isClosedStatus(status) {
  return status === 'convertido' || status === 'perdido' || status === 'no_calificado';
}

/** ¿Aún no lo contestó nadie? (clave para "calientes sin contestar"). */
export function isUncontacted(lead) {
  return !lead.status || lead.status === 'nuevo';
}
