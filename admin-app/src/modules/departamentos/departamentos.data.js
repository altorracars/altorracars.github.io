// ============================================================
// Departamentos (PLAN-UNIFICADO F-2 §240, gap §2.A) — capa de datos.
// CRUD de `departments/{id}` (§215 ④a). Rules: departments.manage para
// crear/editar/borrar; borrar SOLO si userCount==0 (§66 — la regla lo exige
// y la UI lo refleja). El id es slug determinista del nombre (`dept_<slug>`),
// IDÉNTICO al del admin clásico → mismo nombre = mismo doc (sin divergencia).
// userCount = denormalizado (lo mantiene el server al asignar/mover usuarios).
// ============================================================

import { collection, onSnapshot, doc, getDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../core/firebase.js';

export const MOCK_DEPARTMENTS = [
  { _docId: 'dept_ventas', name: 'Ventas', description: 'Equipo comercial y atención de leads.', color: '#b89658', icon: 'building-2', nivel: 30, active: true, userCount: 3 },
  { _docId: 'dept_mercadeo', name: 'Mercadeo', description: 'Contenido, campañas y sitio público.', color: '#4fbe7f', icon: 'megaphone', nivel: 20, active: true, userCount: 1 },
  { _docId: 'dept_postventa', name: 'Postventa', description: 'Seguimiento y soporte al cliente.', color: '#5ba8e5', icon: 'headset', nivel: 10, active: false, userCount: 0 },
];

/** Mismo algoritmo que el clásico (admin-departments.js:79) — cross-panel. */
export function slugId(name) {
  const slug = String(name || '').toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return 'dept_' + (slug || 'sin-nombre');
}

/** Suscripción a `departments` (activos primero, luego por nivel desc, luego nombre). */
export function subscribeDepartments(onData, onError) {
  return onSnapshot(collection(db, 'departments'), (snap) => {
    const list = [];
    snap.forEach((d) => list.push({ _docId: d.id, ...d.data() }));
    list.sort((a, b) => {
      const av = a.active !== false, bv = b.active !== false;
      if (av !== bv) return av ? -1 : 1;
      const an = a.nivel == null ? 10 : a.nivel, bn = b.nivel == null ? 10 : b.nivel;
      if (an !== bn) return bn - an;
      return String(a.name || '').localeCompare(String(b.name || ''), 'es');
    });
    onData(list);
  }, (err) => onError && onError(err));
}

/** Crea un departamento (rechaza si el id-slug ya existe, como el clásico). */
export async function createDept(id, data) {
  const ref = doc(db, 'departments', id);
  const snap = await getDoc(ref);
  if (snap.exists()) { const e = new Error('already-exists'); e.code = 'already-exists'; throw e; }
  await setDoc(ref, data);
}

export async function updateDept(id, data) {
  await updateDoc(doc(db, 'departments', id), data);
}

/** Borra (rules exigen userCount==0; la UI ya lo bloquea antes). */
export async function deleteDept(id) {
  await deleteDoc(doc(db, 'departments', id));
}
