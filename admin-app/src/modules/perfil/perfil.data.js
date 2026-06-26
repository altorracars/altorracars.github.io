// ============================================================
// Perfil (PLAN-UNIFICADO F-6, gap §3 "sec-profile") — capa de datos.
// Port modular del subset que ENCAJA en el auth nuevo (email+password):
// identidad (avatar/Storage + datos personales + cédula one-time-edit) +
// cambio de contraseña SEGURO (reauth + política fuerte).
//
// DIFERIDO a una fase de MFA-hardening (fuera de F-6, no encaja en el auth
// modular actual que es email+password puro): 2FA-SMS, dispositivos de
// confianza, backup codes, preguntas de seguridad, Telegram link.
// (auth.js: "claims/endurecimiento = Fase 5"). El portal nuevo YA está live
// email+password-only → soltar el stack SMS-MFA NO es regresión de F-6.
//
// Self-update permitido por firestore.rules (whitelist diff-keys §43):
//   nombre, telefono, prefijo, cargo, photoURL, tipoDoc, cedula,
//   cedulaChangeRequested, cedulaChangeRequestedAt.
// Cédula one-time-edit enforced server-side → el cliente NO reenvía cedula si
// ya estaba seteada (replica el lock del admin viejo).
// ============================================================

import {
  EmailAuthProvider, reauthenticateWithCredential, updatePassword, updateProfile,
} from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../../core/firebase.js';
import { store } from '../../core/store.js';

// usuarios/{uid} predata la convención ISO-only del canónico: sus timestamps
// pueden ser Firestore Timestamp, {seconds}, número o string ISO.
export function toDate(v) {
  if (!v) return null;
  try {
    if (typeof v.toDate === 'function') return v.toDate();
    if (typeof v === 'object' && v.seconds) return new Date(v.seconds * 1000);
    const d = new Date(v);
    return Number.isNaN(d.getTime()) ? null : d;
  } catch { return null; }
}

export function fmtDate(v) {
  const d = toDate(v);
  if (!d) return '—';
  return d.toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' });
}

/* ─── Avatar: compresión client-side a WebP (port del admin viejo) ─── */
// maxSize 400px + quality 0.8 → muy por debajo del límite de Storage (512KB).
export function compressImageToWebp(file, maxSize = 400, quality = 0.8) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('read-failed'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('image-load-failed'));
      img.onload = () => {
        const ratio = Math.min(maxSize / img.width, maxSize / img.height, 1);
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * ratio);
        canvas.height = Math.round(img.height * ratio);
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (!blob) return reject(new Error('compress-failed'));
          resolve({ blob, dataUrl: canvas.toDataURL('image/webp', quality) });
        }, 'image/webp', quality);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

export async function uploadAvatar(uid, blob) {
  const r = ref(storage, `avatars/${uid}.webp`);
  await uploadBytes(r, blob, { contentType: 'image/webp', cacheControl: 'public, max-age=86400' });
  return getDownloadURL(r);
}

/* ─── Guardar perfil: Firestore + Firebase Auth (displayName/photo) + store ─── */
export async function saveProfile(updates) {
  const { user, profile } = store.get();
  if (!user || !user.uid) throw new Error('No hay sesión activa.');
  await updateDoc(doc(db, 'usuarios', user.uid), updates);

  // Espejar displayName/photo en Firebase Auth (best-effort, no bloquea el save).
  if (auth.currentUser) {
    const authUpdates = {};
    if (updates.nombre) authUpdates.displayName = updates.nombre;
    if (updates.photoURL) authUpdates.photoURL = updates.photoURL;
    if (Object.keys(authUpdates).length) {
      try { await updateProfile(auth.currentUser, authUpdates); } catch { /* cosmético */ }
    }
  }

  // Sync del store → topbar y otros módulos ven el perfil fresco.
  store.set({ profile: { ...(profile || {}), ...updates } });
}

/* ─── Cédula bloqueada: solicitar desbloqueo al Super Admin ─── */
export async function requestCedulaChange() {
  const { user, profile } = store.get();
  if (!user || !user.uid) throw new Error('No hay sesión activa.');
  const patch = { cedulaChangeRequested: true, cedulaChangeRequestedAt: new Date().toISOString() };
  await updateDoc(doc(db, 'usuarios', user.uid), patch);
  store.set({ profile: { ...(profile || {}), ...patch } });
}

/* ─── Política de contraseña (la MISMA del admin viejo) ─── */
export const PW_RULES = [
  { id: 'length',  label: 'Mínimo 8 caracteres', test: (s) => s.length >= 8 },
  { id: 'upper',   label: 'Al menos una mayúscula', test: (s) => /[A-Z]/.test(s) },
  { id: 'lower',   label: 'Al menos una minúscula', test: (s) => /[a-z]/.test(s) },
  { id: 'number',  label: 'Al menos un número', test: (s) => /[0-9]/.test(s) },
  { id: 'special', label: 'Al menos un carácter especial', test: (s) => /[^A-Za-z0-9]/.test(s) },
];

export function passwordScore(pw) {
  return PW_RULES.reduce((n, r) => n + (r.test(pw) ? 1 : 0), 0);
}

/* ─── Cambio de contraseña SEGURO: reauth (verifica la actual) + updatePassword ─── */
// Mejora sobre la paridad: exige la contraseña ACTUAL (reautenticación) antes de
// cambiarla — best-practice de seguridad y satisface auth/requires-recent-login.
export async function changePassword(currentPassword, newPassword) {
  const user = auth.currentUser;
  if (!user || !user.email) throw new Error('No hay sesión activa.');
  if (passwordScore(newPassword) < PW_RULES.length) {
    const e = new Error('La contraseña no cumple los requisitos.');
    e.code = 'weak-password-policy';
    throw e;
  }
  const cred = EmailAuthProvider.credential(user.email, currentPassword);
  await reauthenticateWithCredential(user, cred); // lanza auth/invalid-credential si la actual está mal
  await updatePassword(user, newPassword);
}
