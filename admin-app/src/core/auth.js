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

function permissionsFromProfile(profile) {
  if (!profile) return [];
  if (profile.rol === 'super_admin' || profile.roleId === 'system_super_admin') return ['*'];
  if (Array.isArray(profile.permissions) && profile.permissions.length) return profile.permissions.slice();
  return [];
}

async function hydrateProfile(user) {
  try {
    const snap = await getDoc(doc(db, 'usuarios', user.uid));
    const profile = snap.exists() ? snap.data() : null;
    store.set({ user, profile, permissions: permissionsFromProfile(profile), ready: true, authError: null });
  } catch (err) {
    // Lookup falló (red/permiso) — deja la sesión activa con permisos vacíos;
    // la UI degradará a solo-lectura y mostrará el aviso.
    console.warn('[auth] no se pudo hidratar el perfil:', err);
    store.set({ user, profile: null, permissions: [], ready: true });
  }
}

export function initAuth() {
  setPersistence(auth, browserLocalPersistence).catch(() => {});
  onAuthStateChanged(auth, (user) => {
    if (user) hydrateProfile(user);
    else store.set({ user: null, profile: null, permissions: [], ready: true });
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
