// ============================================================
// Auth (Firebase modular). Réplica del modelo de seguridad LIVE:
// la identidad admin se decide por lookup a `usuarios/{uid}` (rol +
// permissions[]), NO por custom claims (verificado: el backend aún no
// los setea; reglas Fase 1 usan lookup). Claims = Fase 5 (endurecimiento).
// ============================================================

import {
  signInWithEmailAndPassword, signOut, onAuthStateChanged, setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase.js';
import { store } from './store.js';

export function hasPermission(perm) {
  const perms = store.get().permissions || [];
  return perms.includes('*') || perms.includes(perm);
}

// §dataScope (P0-SEC-1, opción A): ¿el usuario ve TODOS los datos (gerente/CEO/dueño) o
// SOLO los suyos (asesor)? Espejo cliente de scopeAllowsOwn() de firestore.rules: el
// dueño ('*'/super_admin) y dataScope:'all' ven todo; el resto se filtra por ownerId==uid.
// SIN dataScope explícito = scoped (own) — igual que el default de las reglas (seguro).
export function isAllScope() {
  const s = store.get();
  const p = s.profile || {};
  const perms = s.permissions || [];
  return p.dataScope === 'all'
    || p.rol === 'super_admin'
    || p.roleId === 'system_super_admin'
    || perms.includes('*');
}

// OLA-2.5: ¿es el DUEÑO (super admin)? Espejo del assertStaff.isSuper de las
// callables — gatea los poderes destructivos del portal (eliminar/purgar).
export function isSuper() {
  const s = store.get();
  const p = s.profile || {};
  return p.rol === 'super_admin' || p.roleId === 'system_super_admin' || (s.permissions || []).includes('*');
}

function permissionsFromProfile(profile) {
  if (!profile) return [];
  if (profile.rol === 'super_admin' || profile.roleId === 'system_super_admin') return ['*'];
  if (Array.isArray(profile.permissions) && profile.permissions.length) return profile.permissions.slice();
  return [];
}

// §193.4 ④a PASO 6 — materializa la fundación departamental para la UI (cosmética).
// Defaults idénticos al estado vacío del store → comportamiento intacto si faltan
// los campos. profile=null devuelve los defaults (limpia estado tras logout/bloqueo).
function rbacFromProfile(profile) {
  return {
    nivel: (profile && Number.isFinite(profile.nivel)) ? profile.nivel : 10,
    departmentId: (profile && profile.departmentId) || null,
    departmentName: (profile && profile.departmentName) || '',
    // OLA-0.2: default 'own' = espejo del default seguro de las rules (el enforcement
    // real lo hace isAllScope() sobre el profile; esto es el valor que muestra la UI).
    dataScope: (profile && profile.dataScope) || 'own',
  };
}

async function hydrateProfile(user, attempt = 0) {
  try {
    const snap = await getDoc(doc(db, 'usuarios', user.uid));
    const profile = snap.exists() ? snap.data() : null;
    if (profile && profile.bloqueado === true) {
      // §188 paso 0.2 (R-8): el disable server-side de Auth no mata el ID token
      // ya emitido (≤1h) — sin este check, un bloqueado con sesión viva opera.
      await signOut(auth);
      store.set({ user: null, profile: null, permissions: [], ...rbacFromProfile(null), ready: true, authError: 'Cuenta bloqueada. Contacta al administrador.' });
      return;
    }
    store.set({ user, profile, permissions: permissionsFromProfile(profile), ...rbacFromProfile(profile), ready: true, authError: null });
  } catch (err) {
    // OLA-0.5 (fail-CLOSED, antes fail-open): si el lookup falla no se evaluó el
    // estado 'bloqueado' → dejar la sesión viva era una degradación insegura.
    // 1 reintento (fallo transitorio de red) y, si persiste, signOut limpio.
    if (attempt < 1) {
      await new Promise((r) => setTimeout(r, 1200));
      return hydrateProfile(user, attempt + 1);
    }
    console.warn('[auth] no se pudo hidratar el perfil (2 intentos):', err);
    await signOut(auth).catch(() => {});
    store.set({ user: null, profile: null, permissions: [], ...rbacFromProfile(null), ready: true, authError: 'No se pudo verificar tu perfil (¿sin conexión?). Vuelve a iniciar sesión.' });
  }
}

export function initAuth() {
  setPersistence(auth, browserLocalPersistence).catch(() => {});
  onAuthStateChanged(auth, (user) => {
    if (user) hydrateProfile(user);
    else store.set({ user: null, profile: null, permissions: [], ...rbacFromProfile(null), ready: true });
  });
}

const ERROR_ES = {
  'auth/invalid-email': 'Correo inválido.',
  'auth/user-disabled': 'Esta cuenta está deshabilitada.',
  'auth/user-not-found': 'No existe una cuenta con ese correo.',
  'auth/wrong-password': 'Contraseña incorrecta.',
  'auth/invalid-credential': 'Credenciales incorrectas.',
  'auth/too-many-requests': 'Demasiados intentos. Espera unos minutos.',
  'auth/network-request-failed': 'Sin conexión. Revisa tu internet.',
};

export async function signIn(email, password) {
  store.set({ authError: null });
  try {
    await signInWithEmailAndPassword(auth, String(email).trim(), password);
  } catch (err) {
    const msg = ERROR_ES[err && err.code] || 'No se pudo iniciar sesión.';
    store.set({ authError: msg });
    throw err;
  }
}

export async function signOutUser() {
  if (store.get().mock) {
    store.set({ user: null, profile: null, permissions: [] });
    return;
  }
  await signOut(auth);
}

export function displayName() {
  const { profile, user } = store.get();
  return (profile && (profile.nombre || profile.roleName)) || (user && (user.displayName || user.email)) || 'Usuario';
}

export function displayRole() {
  const { profile } = store.get();
  return (profile && (profile.cargo || profile.roleName)) || 'Asesor';
}
