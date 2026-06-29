// ============================================================
// errors.js — traduce errores de Firebase/Firestore/Callables a mensajes de
// NEGOCIO (TODO-52 P1). Antes los toasts mostraban `e.message || e.code`:
// "permission-denied", "Missing or insufficient permissions", "requiere
// super_admin (rules)" → tono "modo desarrollador" + fuga de internals.
// Regla: el código CRUDO va SOLO a consola (debug); al usuario, lenguaje claro.
// Nunca exponer 'rules' / 'super_admin' / IDs de permiso.
// ============================================================

const MAP = {
  // Firestore / Cloud Functions (gRPC) codes
  'permission-denied': 'No tienes permiso para esta acción.',
  'unauthenticated': 'Tu sesión expiró. Vuelve a iniciar sesión.',
  'not-found': 'Ese registro ya no existe.',
  'already-exists': 'Ese registro ya existe.',
  'failed-precondition': 'No se pudo completar: el estado cambió. Recarga e intenta de nuevo.',
  'aborted': 'Hubo un conflicto al guardar. Intenta de nuevo.',
  'resource-exhausted': 'Demasiadas solicitudes. Espera un momento e intenta de nuevo.',
  'unavailable': 'Servicio no disponible. Revisa tu conexión e intenta de nuevo.',
  'deadline-exceeded': 'La operación tardó demasiado. Intenta de nuevo.',
  'cancelled': 'La operación se canceló.',
  'invalid-argument': 'Algún dato no es válido. Revísalo e intenta de nuevo.',
  'out-of-range': 'Algún valor está fuera de rango.',
  'unimplemented': 'Esta función no está disponible.',
  'internal': 'Ocurrió un error inesperado. Intenta de nuevo.',
  'data-loss': 'Ocurrió un error con los datos. Intenta de nuevo.',
  // Auth (por si un flujo CRM topa con sesión)
  'auth/network-request-failed': 'Sin conexión. Revisa tu internet.',
  'auth/too-many-requests': 'Demasiados intentos. Espera unos minutos.',
  'auth/requires-recent-login': 'Por seguridad, vuelve a iniciar sesión para esta acción.',
  // Storage frecuentes
  'storage/unauthorized': 'No tienes permiso para subir/leer ese archivo.',
  'storage/canceled': 'La subida se canceló.',
  'storage/retry-limit-exceeded': 'No se pudo subir el archivo. Revisa tu conexión.',
};

/**
 * Mensaje amable para mostrar al usuario. Loguea el código crudo a consola.
 * @param {any} e        error capturado (Firestore/Functions/Auth/Storage o Error).
 * @param {string} [fallback]  mensaje si el código es desconocido (NUNCA el crudo).
 * @returns {string}
 */
export function friendlyError(e, fallback = 'No se pudo completar la acción. Intenta de nuevo.') {
  const code = (e && e.code) ? String(e.code) : '';
  const short = code.includes('/') ? code.split('/').pop() : code; // 'functions/permission-denied' → 'permission-denied'
  // Log crudo SOLO a consola (debug), nunca a la UI.
  try { console.warn('[error]', code || '(sin código)', (e && e.message) || ''); } catch (_) { /* noop */ }
  if (code && MAP[code]) return MAP[code];
  if (short && MAP[short]) return MAP[short];
  return fallback;
}
