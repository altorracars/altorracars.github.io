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

// ── Canal de captura (web + externos manuales) ──
const CHANNEL_META = {
  whatsapp:    { label: 'WhatsApp',    icon: '🟢' },
  facebook:    { label: 'Facebook',    icon: '📘' },
  instagram:   { label: 'Instagram',   icon: '📸' },
  tiktok:      { label: 'TikTok',      icon: '🎵' },
  marketplace: { label: 'Marketplace', icon: '🛒' },
  llamada:     { label: 'Llamada',     icon: '📞' },
  presencial:  { label: 'Presencial',  icon: '🏬' },
  referido:    { label: 'Referido',    icon: '🤝' },
  bot:         { label: 'ALTOR Bot',   icon: '🤖' },
  cuenta:      { label: 'Cuenta',      icon: '👤' },
  newsletter:  { label: 'Newsletter',  icon: '✉️' },
  cita:        { label: 'Cita web',    icon: '📅' },
  web:         { label: 'Web',         icon: '🌐' },
};

export function channelOf(lead) {
  const src = String(lead.source || '').toLowerCase();
  let key = 'web';
  if (src.includes('whatsapp') || src.includes('wsp') || src.includes('wa.me')) key = 'whatsapp';
  else if (src.includes('facebook') || src.includes('meta') || src === 'fb') key = 'facebook';
  else if (src.includes('instagram') || src === 'ig') key = 'instagram';
  else if (src.includes('tiktok') || src === 'tt') key = 'tiktok';
  else if (src.includes('marketplace') || src.includes('mercadolibre') || src.includes('tucarro')) key = 'marketplace';
  else if (src.includes('llamada') || src.includes('telefono') || src.includes('teléfono') || src.includes('call')) key = 'llamada';
  else if (src.includes('presencial') || src.includes('walk') || src.includes('showroom') || src.includes('local')) key = 'presencial';
  else if (src.includes('referido') || src.includes('referral') || src.includes('recomendado')) key = 'referido';
  else if (src.includes('bot') || src.includes('concierge') || src.includes('altor')) key = 'bot';
  else if (src.includes('cuenta') || src.includes('registro') || src.includes('account') || src.includes('signup')) key = 'cuenta';
  else if (src.includes('news') || src.includes('subscri') || src.includes('suscri')) key = 'newsletter';
  else if (src.includes('cita')) key = 'cita';
  return { key, ...CHANNEL_META[key] };
}

// Canales seleccionables en el formulario de captura manual (orden de uso real).
export const MANUAL_CHANNELS = [
  { id: 'whatsapp', label: 'WhatsApp', icon: '🟢' },
  { id: 'facebook', label: 'Facebook (Meta)', icon: '📘' },
  { id: 'instagram', label: 'Instagram', icon: '📸' },
  { id: 'tiktok', label: 'TikTok', icon: '🎵' },
  { id: 'marketplace', label: 'Marketplace', icon: '🛒' },
  { id: 'llamada', label: 'Llamada', icon: '📞' },
  { id: 'presencial', label: 'Presencial / Showroom', icon: '🏬' },
  { id: 'referido', label: 'Referido', icon: '🤝' },
  { id: 'web', label: 'Web (otro)', icon: '🌐' },
];

export const INTEREST_TYPES = [
  { id: 'compra', label: 'Compra' },
  { id: 'financiacion', label: 'Financiación' },
  { id: 'cita', label: 'Cita / Test drive' },
  { id: 'consignacion_venta', label: 'Vende su carro' },
  { id: 'peritaje', label: 'Peritaje' },
  { id: 'consulta', label: 'Consulta general' },
];

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
