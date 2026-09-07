// ============================================================
// Usuarios (PLAN-UNIFICADO F-2 §237, gap §2.A) — capa de datos.
// Gestión de `usuarios/{uid}` (el SSoT de identidad admin que lee
// core/auth.js por lookup, NO claims). Lee `roles` y `departments`
// para los selectores. Versión LIMPIA del clásico admin-users.js:
// se descarta la deuda legacy de mapeo rol↔tier (R3/R7/R8,
// system_editor/viewer huérfanos) — invariante 3 del plan.
//
// Reconciliación servidor (verificado functions/index.js):
//  - onUserRoleAssigned (usuarios/{uid} on roleId change) re-sincroniza
//    roleName/permissions/cargo/nivel desde el role doc.
//  - onRoleUpdated (roles/{id}) re-sincroniza los usuarios con ese rol.
//  - onUsuarioBloqueadoSync (§188) propaga bloqueado→Auth disable.
// → editar el rol = escribir {roleId,…} directo (rules: users.edit en
//   doc NO-dueño); el servidor afirma el resto. Crear/borrar EXIGEN
//   las callables (cuentas Auth = Admin SDK).
// ============================================================

import { collection, onSnapshot, doc, updateDoc, getDocs } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { db, fns } from '../../core/firebase.js';

/* ── Mock (?mock=1) — demo sin Firebase ─────────────────────── */
export const MOCK_ROLES = [
  { _docId: 'role_gerente', name: 'Gerente', color: '#b89658', isSystem: false, isDefault: false, permissions: ['users.read', 'leads.read', 'leads.edit', 'reports.read', 'dealers.read', 'dealers.edit'] },
  { _docId: 'role_asesor', name: 'Asesor', color: '#5ba8e5', isSystem: false, isDefault: true, permissions: ['leads.read', 'leads.edit', 'calendar.read'] },
  { _docId: 'role_marketing', name: 'Marketing', color: '#4fbe7f', isSystem: false, isDefault: false, permissions: ['content.edit', 'banners.read', 'reviews.read'] },
];
export const MOCK_DEPARTMENTS = [
  { _docId: 'dep_ventas', name: 'Ventas', active: true },
  { _docId: 'dep_mercadeo', name: 'Mercadeo', active: true },
];
export const MOCK_USERS = [
  { _docId: 'u_ceo', nombre: 'Rodrigo (CEO)', email: 'ceo@altorra.local', rol: 'super_admin', roleId: 'system_super_admin', roleName: 'CEO', permissions: ['*'], departmentName: 'Dirección', estado: 'activo' },
  { _docId: 'u_g1', nombre: 'María Gómez', email: 'maria@altorra.local', roleId: 'role_gerente', roleName: 'Gerente', permissions: MOCK_ROLES[0].permissions, departmentId: 'dep_ventas', departmentName: 'Ventas', nivel: 30, dataScope: 'department', estado: 'activo', habilitado2FA: true },
  { _docId: 'u_a1', nombre: 'Juan Pérez', email: 'juan@altorra.local', roleId: 'role_asesor', roleName: 'Asesor', permissions: MOCK_ROLES[1].permissions, departmentId: 'dep_ventas', departmentName: 'Ventas', nivel: 10, dataScope: 'own', estado: 'activo' },
  { _docId: 'u_a2', nombre: 'Ana López', email: 'ana@altorra.local', roleId: 'role_asesor', roleName: 'Asesor', permissions: MOCK_ROLES[1].permissions, departmentName: 'Ventas', nivel: 10, dataScope: 'own', bloqueado: true },
];

/* ── Detección de DUEÑO (CEO) — 3 vías, defense-in-depth (clásico §70/§72).
   El dueño NO se edita/elimina desde aquí (rules §212 lo bloquean igual);
   la UI lo refleja con un candado. ──────────────────────────── */
export function isOwner(u) {
  return !!u && (
    u.roleId === 'system_super_admin'
    || u.rol === 'super_admin'
    || (Array.isArray(u.permissions) && u.permissions.includes('*'))
  );
}

/** Tier legacy mínimo (shim para compat de cualquier consumidor de `rol`;
 *  NO se asigna '*' a no-dueños — el dropdown ya excluye roles de dueño). */
export function legacyTier(role) {
  if (!role) return 'editor';
  if (Array.isArray(role.permissions) && role.permissions.includes('*')) return 'super_admin';
  if (Array.isArray(role.permissions)) {
    const nonRead = role.permissions.filter((p) => p && p.indexOf('.read') === -1 && p.indexOf('.view') === -1 && p !== 'settings.theme');
    if (!nonRead.length) return 'viewer';
  }
  return 'editor';
}

/** Roles asignables: custom (no-sistema) y SIN wildcard de dueño. */
export function assignableRoles(roles) {
  return (roles || [])
    .filter((r) => !r.isSystem && !(Array.isArray(r.permissions) && r.permissions.includes('*')))
    .sort((a, b) => String(a.name || '').localeCompare(String(b.name || ''), 'es'));
}

/* ── Suscripciones ──────────────────────────────────────────── */
export function subscribeUsers(onData, onError) {
  return onSnapshot(collection(db, 'usuarios'), (snap) => {
    const list = [];
    snap.forEach((d) => list.push({ _docId: d.id, ...d.data() }));
    list.sort((a, b) => String(a.nombre || a.email || '').localeCompare(String(b.nombre || b.email || ''), 'es'));
    onData(list);
  }, (err) => onError && onError(err));
}

export function subscribeRoles(onData, onError) {
  return onSnapshot(collection(db, 'roles'), (snap) => {
    const list = [];
    snap.forEach((d) => list.push({ _docId: d.id, ...d.data() }));
    onData(list);
  }, (err) => onError && onError(err));
}

/** Departamentos activos (lectura puntual — catálogo pequeño y estable). */
export async function fetchDepartments() {
  const snap = await getDocs(collection(db, 'departments'));
  const list = [];
  snap.forEach((d) => { const x = d.data() || {}; if (x.active !== false) list.push({ _docId: d.id, ...x }); });
  return list.sort((a, b) => String(a.name || '').localeCompare(String(b.name || ''), 'es'));
}

/* ── Mutaciones ─────────────────────────────────────────────── */
/** Asigna rol + fundación departamental a un usuario NO-dueño.
 *  Escritura directa (rules: users.edit en doc no-dueño); el trigger
 *  onUserRoleAssigned re-afirma roleName/permissions/cargo/nivel. Escribimos
 *  el denormalizado igual para consistencia INMEDIATA en la UI. */
export async function assignUserRole(uid, role, dept) {
  const payload = {
    roleId: role._docId,
    roleName: role.name || role._docId,
    cargo: role.name || role._docId,
    rol: legacyTier(role),
    permissions: Array.isArray(role.permissions) ? role.permissions.slice() : [],
    permissionsUpdatedAt: new Date().toISOString(),
    departmentId: (dept && dept._docId) || null,
    departmentName: (dept && dept.name) || '',
    nivel: dept && Number.isFinite(dept.nivel) ? dept.nivel : (dept && dept.nivel === 0 ? 0 : 10),
    dataScope: (dept && dept.dataScope) || 'all',
  };
  await updateDoc(doc(db, 'usuarios', uid), payload);
}

/** Guarda SOLO depto/nivel/scope (sin tocar el rol). */
export async function saveUserScope(uid, { departmentId, departmentName, nivel, dataScope }) {
  await updateDoc(doc(db, 'usuarios', uid), {
    departmentId: departmentId || null,
    departmentName: departmentName || '',
    nivel: Number.isFinite(nivel) ? nivel : 10,
    dataScope: dataScope || 'all',
  });
}

/** Bloquea/desbloquea (onUsuarioBloqueadoSync propaga a Auth disable). */
export async function setUserBlocked(uid, blocked) {
  await updateDoc(doc(db, 'usuarios', uid), { bloqueado: !!blocked });
}

/** Alta de usuario gestionado (Auth + doc) — Admin SDK vía callable. */
export async function createManagedUser({ nombre, email, password, rol }) {
  const fn = httpsCallable(fns, 'createManagedUserV2');
  return fn({ nombre, email, password, rol });
}

/** Baja completa (perfil + cuenta Auth) — Admin SDK vía callable. */
export async function deleteManagedUser(uid) {
  const fn = httpsCallable(fns, 'deleteManagedUserV2');
  return fn({ uid });
}
