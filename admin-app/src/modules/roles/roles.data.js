// ============================================================
// Roles (PLAN-UNIFICADO F-2 §239, gap §2.A) — capa de datos.
// CRUD de `roles/{id}` (rules: roles.create/edit/delete; los system roles
// `isSystem` son INMUTABLES desde el cliente — solo la CF seedSystemRoles).
// userCount = denormalizado por la CF (onUserRoleAssigned / recalculate);
// el guard de borrado lo lee (no hay regla server de userCount para roles,
// pero onRoleDeleted re-asigna roleId=null a los afectados).
// ============================================================

import { collection, onSnapshot, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../core/firebase.js';
import { SYSTEM_ROLES } from '../../domain/rbac-catalog.js';

/* ── Mock (?mock=1) ─────────────────────────────────────────── */
export const MOCK_ROLES = [
  { ...SYSTEM_ROLES[0], _docId: 'system_super_admin', userCount: 1 },
  { _docId: 'role_gerente', name: 'Gerente', description: 'Gestiona equipo, leads y reportes.', color: '#b89658', icon: 'shield', isSystem: false, isDefault: false, userCount: 1, permissions: ['users.read', 'crm.read', 'crm.edit', 'crm.assign', 'reports.view', 'dealers.read', 'dealers.edit', 'appointments.read'] },
  { _docId: 'role_asesor', name: 'Asesor', description: 'Atiende leads y agenda citas.', color: '#5ba8e5', icon: 'shield', isSystem: false, isDefault: true, userCount: 2, permissions: ['crm.read', 'crm.edit', 'calendar.read', 'appointments.read', 'appointments.create', 'concierge.read', 'concierge.respond'] },
  { _docId: 'role_marketing', name: 'Marketing', description: 'Edita contenido y banners del sitio.', color: '#4fbe7f', icon: 'shield', isSystem: false, isDefault: false, userCount: 0, permissions: ['content.edit', 'banners.read', 'banners.edit', 'reviews.read'] },
];

/** Suscripción a `roles` (system primero, luego por nombre). */
export function subscribeRoles(onData, onError) {
  return onSnapshot(collection(db, 'roles'), (snap) => {
    const list = [];
    snap.forEach((d) => list.push({ _docId: d.id, ...d.data() }));
    list.sort((a, b) => (a.isSystem !== b.isSystem
      ? (a.isSystem ? -1 : 1)
      : String(a.name || '').localeCompare(String(b.name || ''), 'es')));
    onData(list);
  }, (err) => onError && onError(err));
}

/** Slug del id a partir del nombre (sin acentos, [a-z0-9_]). */
export function slugifyRole(name) {
  return String(name || '').toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 40);
}

/** id determinista de rol nuevo: `custom_<slug>_<base36>`. */
export function newRoleId(name) {
  return 'custom_' + slugifyRole(name) + '_' + Date.now().toString(36);
}

/** Crea un rol custom (doc completo). */
export async function createRole(roleId, data) {
  await setDoc(doc(db, 'roles', roleId), data);
}

/** Edita un rol custom (merge; _version lo incrementa el llamador). */
export async function updateRole(roleId, updates) {
  await setDoc(doc(db, 'roles', roleId), updates, { merge: true });
}

/** Borra un rol custom (onRoleDeleted re-asigna roleId=null a los afectados). */
export async function deleteRole(roleId) {
  await deleteDoc(doc(db, 'roles', roleId));
}
