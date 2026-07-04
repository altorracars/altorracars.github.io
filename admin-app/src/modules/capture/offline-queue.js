// ============================================================
// OLA-1.9b — Cola de capturas offline SIN CONFIRMAR (residual de 0.3).
// El SDK (persistentLocalCache) reenvía las escrituras encoladas al
// reabrir el portal; pero si RULES las rechaza en esa reapertura, las
// descarta EN SILENCIO (la promesa original murió con la pestaña).
// Este registro paralelo en localStorage sobrevive al cierre y permite
// avisar en la Bandeja. Ciclo de vida:
//   queue (al capturar offline) → confirm (ack con pestaña viva)
//   | reject (rechazo con pestaña viva) → en la Bandeja:
//   auto-limpieza si el contacto YA entró (el reenvío del SDK funcionó)
//   · banner "sin confirmar" + reintento manual si NO entró.
// El reintento manual es seguro: solo se ofrece cuando el lead NO está
// en la Bandeja (si el SDK ya lo metió, la reconciliación lo limpia antes).
// ============================================================

import { db } from '../../core/firebase.js';
import { addDoc, collection } from 'firebase/firestore';
import { createManualLead } from './capture.data.js';

const KEY = 'altorra:capturas-offline';
const CONFIRM_GRACE_MS = 90 * 1000; // el pipeline server tarda unos segundos; no alarmar antes

function read() {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; }
}
function write(list) {
  // storage lleno/modo privado: mejor operar sin cola que romper la captura
  try { localStorage.setItem(KEY, JSON.stringify(list)); } catch { /* noop */ }
}

export function queueCapture(module, data) {
  const id = 'cap_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
  write([...read(), { id, module, data, queuedAt: Date.now(), status: 'pending', error: null }]);
  return id;
}
export function confirmCapture(id) { write(read().filter((r) => r.id !== id)); }
export function removeCapture(id) { confirmCapture(id); }
export function rejectCapture(id, error) {
  write(read().map((r) => (r.id === id ? { ...r, status: 'rejected', error: error || null } : r)));
}

const digits = (v) => String(v || '').replace(/\D/g, '').slice(-10);
const mail = (v) => String(v || '').trim().toLowerCase();

/**
 * Auto-limpieza contra los leads YA visibles: si el teléfono o el email de la
 * captura está en la Bandeja, el lead entró (reenvío del SDK u otra vía) —
 * se retira de la cola. Devuelve los que MERECEN banner: rechazados +
 * pendientes viejos (la pestaña murió antes del ack y el lead no aparece).
 */
export function unconfirmedCaptures(leads) {
  const phones = new Set();
  const emails = new Set();
  (leads || []).forEach((l) => {
    const p = digits(l.phone || l.telefono);
    if (p.length >= 7) phones.add(p);
    const m = mail(l.email);
    if (m) emails.add(m);
  });
  const keep = read().filter((r) => {
    const p = digits(r.data && r.data.telefono);
    if (p.length >= 7 && phones.has(p)) return false;
    const m = mail(r.data && r.data.email);
    if (m && emails.has(m)) return false;
    return true;
  });
  write(keep);
  const now = Date.now();
  return keep.filter((r) => r.status === 'rejected' || (now - r.queuedAt) > CONFIRM_GRACE_MS);
}

/** Reintento manual desde el banner. Lanza si vuelve a fallar (el caller avisa). */
export async function retryCapture(rec) {
  if (rec.module === 'new') await createManualLead(rec.data);
  else await addDoc(collection(db, 'lead_intake'), rec.data);
  removeCapture(rec.id);
}
