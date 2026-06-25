// ============================================================
// Auditoría (PLAN-UNIFICADO F-2 §242, gap §2.A) — capa de datos.
// VISOR (read-only) de `auditLog`. El admin-app YA escribe (core/audit.js) desde
// todos los módulos nuevos; faltaba el LECTOR (§2.A "hoy solo escribe, no lee").
// Shape canónico (verificado audit.js + admin-state.js:396): {action, target,
// details, user(email), timestamp(ISO string)} → orderBy timestamp desc es
// cronológico (ambos paneles escriben ISO, sin mezcla de tipos). Rules: read =
// auth / audit.read; inmutable (delete solo super_admin) — el visor NO borra.
// ============================================================

import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../core/firebase.js';

const AUDIT_LIMIT = 200; // mismo que el clásico (F8.4)

// Etiquetas legibles (port de ACTION_TEXTS del clásico + acciones nuevas de
// los módulos admin-app: role_*/dept_*/workflow_*/user_block/unlock).
export const ACTION_LABELS = {
  login: 'inició sesión',
  vehicle_create: 'creó vehículo', vehicle_update: 'actualizó vehículo', vehicle_delete: 'eliminó vehículo',
  vehicle_sold: 'registró venta', vehicle_feature_toggle: 'cambió destacado', reordenar: 'reordenó vehículos',
  brand_create: 'creó marca', brand_update: 'actualizó marca', brand_delete: 'eliminó marca',
  dealer_create: 'creó aliado', dealer_update: 'actualizó aliado',
  banner_create: 'creó banner', banner_update: 'actualizó banner', banner_delete: 'eliminó banner',
  review_create: 'creó reseña', review_update: 'actualizó reseña', review_delete: 'eliminó reseña',
  backup_export: 'exportó respaldo', backup_import: 'importó respaldo', list_update: 'actualizó lista',
  appointment_confirmada: 'confirmó cita', appointment_cancelada: 'canceló cita',
  appointment_delete: 'eliminó cita', appointment_create_internal: 'creó cita interna',
  sitemap: 'publicó sitemap', seo_regenerate: 'regeneró SEO',
  user_create: 'creó usuario', user_update: 'actualizó usuario', user_delete: 'eliminó usuario',
  user_block: 'bloqueó usuario', user_unlock: 'desbloqueó usuario',
  role_create: 'creó rol', role_update: 'actualizó rol', role_delete: 'eliminó rol',
  dept_create: 'creó departamento', dept_update: 'actualizó departamento', dept_delete: 'eliminó departamento',
  workflow_enable: 'activó regla', workflow_disable: 'pausó regla',
  kb_create: 'creó FAQ', kb_update: 'actualizó FAQ', kb_delete: 'eliminó FAQ', kb_bootstrap: 'sembró FAQs base',
};

export function actionLabel(action) {
  return ACTION_LABELS[action] || action || 'realizó acción';
}

/** Emoji por acción (resuelto por prefijo — admin-app es emoji, no lucide). */
export function actionEmoji(action) {
  const a = String(action || '');
  if (a === 'login') return '🔑';
  if (a === 'user_block') return '🚫';
  if (a === 'user_unlock') return '🔓';
  if (a.startsWith('user_')) return '👤';
  if (a.startsWith('role_')) return '🛡️';
  if (a.startsWith('dept_')) return '🏢';
  if (a.startsWith('workflow_enable')) return '⚡';
  if (a.startsWith('workflow_')) return '⏸';
  if (a.startsWith('kb_')) return '🧠';
  if (a.startsWith('vehicle_')) return '🚗';
  if (a.startsWith('brand_')) return '🏷️';
  if (a.startsWith('dealer_')) return '🤝';
  if (a.startsWith('banner_')) return '🖼️';
  if (a.startsWith('review_')) return '⭐';
  if (a.startsWith('appointment_')) return '📅';
  if (a.startsWith('backup_')) return '💾';
  if (a.indexOf('seo') !== -1 || a.indexOf('sitemap') !== -1) return '🗺️';
  if (a.indexOf('content') !== -1 || a.indexOf('cms') !== -1) return '📝';
  return '📝';
}

/** Suscripción al log (últimas 200, real-time). */
export function subscribeAuditLog(onData, onError) {
  const q = query(collection(db, 'auditLog'), orderBy('timestamp', 'desc'), limit(AUDIT_LIMIT));
  return onSnapshot(q, (snap) => {
    const list = [];
    snap.forEach((d) => list.push({ _docId: d.id, ...d.data() }));
    onData(list);
  }, (err) => onError && onError(err));
}

/* ── Mock (?mock=1) ─────────────────────────────────────────── */
export const MOCK_AUDIT = [
  { _docId: 'a1', action: 'role_create', target: 'rol Gerente', details: '8 permisos', user: 'ceo@altorra.local', timestamp: '2026-06-25T15:10:00Z' },
  { _docId: 'a2', action: 'user_update', target: 'usuario María Gómez', details: 'rol: Gerente', user: 'ceo@altorra.local', timestamp: '2026-06-25T15:08:00Z' },
  { _docId: 'a3', action: 'workflow_disable', target: 'regla Recordatorio 24h antes de cita', details: '', user: 'ceo@altorra.local', timestamp: '2026-06-25T14:55:00Z' },
  { _docId: 'a4', action: 'dept_create', target: 'departamento Postventa', details: '', user: 'maria@altorra.local', timestamp: '2026-06-25T11:30:00Z' },
  { _docId: 'a5', action: 'user_block', target: 'usuario Ana López', details: 'ana@altorra.local', user: 'ceo@altorra.local', timestamp: '2026-06-24T18:00:00Z' },
  { _docId: 'a6', action: 'vehicle_create', target: 'Mazda CX-5 2022', details: '', user: 'juan@altorra.local', timestamp: '2026-06-24T09:15:00Z' },
];
