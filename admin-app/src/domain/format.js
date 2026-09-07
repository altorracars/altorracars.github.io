// ============================================================
// Utilidades de formato PURAS (sin DOM, sin Firestore).
// Timestamps del canónico son STRINGS ISO 8601.
// ============================================================

export function escapeHtml(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function initials(name) {
  const parts = String(name || '').trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function digits(value) {
  return String(value || '').replace(/\D/g, '');
}

/** Construye un deep-link de WhatsApp (wa.me). Teléfono canónico = E.164 (+57...). */
export function waLink(phone, text) {
  const num = digits(phone);
  if (!num) return '';
  const q = text ? '?text=' + encodeURIComponent(text) : '';
  return 'https://wa.me/' + num + q;
}

export function msSince(iso) {
  if (!iso) return Infinity;
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return Infinity;
  return Date.now() - t;
}

export function daysSince(iso) {
  const ms = msSince(iso);
  return ms === Infinity ? Infinity : ms / 86400000;
}

/** "ahora", "hace 5 min", "hace 3 h", "ayer", "hace 4 d", "12 may". */
export function timeAgo(iso) {
  const ms = msSince(iso);
  if (ms === Infinity) return '—';
  const min = Math.floor(ms / 60000);
  if (min < 1) return 'ahora';
  if (min < 60) return `hace ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `hace ${h} h`;
  const d = Math.floor(h / 24);
  if (d === 1) return 'ayer';
  if (d < 7) return `hace ${d} d`;
  return new Date(iso).toLocaleDateString('es-CO', { day: 'numeric', month: 'short' });
}

export function formatDateTime(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleString('es-CO', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

/** Tiempo restante humano: "12 min", "1 h 20 min", "vencido hace 5 min". */
export function humanizeDuration(ms) {
  const abs = Math.abs(ms);
  const min = Math.round(abs / 60000);
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const r = min % 60;
  return r ? `${h} h ${r} min` : `${h} h`;
}

/** $25.000.000 → "$25 M", $1.500.000 → "$1,5 M", $0 → "". */
export function copShort(value) {
  const n = Number(value) || 0;
  if (!n) return '';
  if (n >= 1_000_000) {
    const m = n / 1_000_000;
    return '$' + (m % 1 ? m.toFixed(1).replace('.', ',') : m.toFixed(0)) + ' M';
  }
  if (n >= 1000) return '$' + Math.round(n / 1000) + ' K';
  return '$' + n;
}

/** Normaliza para búsqueda client-side (lowercase, sin acentos). */
export function normalizeSearch(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');
}
