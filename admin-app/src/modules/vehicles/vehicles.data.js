// ============================================================
// Vehículos (épica E6 fase ③ p5, etapa V1) — capa de datos.
// Colección `vehiculos`: docId = String(id entero secuencial) —
// el sitio público y el CI dependen de ese id (slug lo embebe;
// NUNCA auto-ids). Orden canónico de lista del clásico:
// prioridad DESC, luego id ASC (admin-vehicles.js:273-309).
// V1 = leer + destacar + eliminar. Create/update transaccionales
// llegan con el wizard (V2). Contratos: bóveda mapa-epica.
// ============================================================

import {
  collection, onSnapshot, doc, updateDoc, deleteDoc, addDoc,
} from 'firebase/firestore';
import { db } from '../../core/firebase.js';
import { store } from '../../core/store.js';
import { writeAudit } from '../../core/audit.js';

const nowISO = () => new Date().toISOString();
const me = () => {
  const u = store.get().user || {};
  const p = store.get().profile || {};
  return { email: u.email || 'unknown', nombre: p.nombre || u.email || 'unknown' };
};

/** Orden canónico del clásico: prioridad DESC → id ASC (numérico). */
export function sortVehicles(list) {
  return list.slice().sort((a, b) =>
    ((b.prioridad || 0) - (a.prioridad || 0)) || ((a.id || 0) - (b.id || 0)));
}

export function subscribeVehicles(onData, onError) {
  return onSnapshot(collection(db, 'vehiculos'), (snap) => {
    onData(sortVehicles(snap.docs.map((d) => ({ ...d.data(), _docId: d.id }))));
  }, (err) => onError && onError(err));
}

/** Auditoría por vehículo (subcolección vehiculos/{id}/auditLog).
 *  Shape VERBATIM del clásico: timestamp = Date.now() NUMBER (ms),
 *  NO ISO — el timeline ordena por number (admin-vehicles.js:26-66). */
async function logVehicleAction(docId, entry) {
  try {
    const who = me();
    await addDoc(collection(db, 'vehiculos', docId, 'auditLog'), {
      user: who.email, userName: who.nombre, timestamp: Date.now(), ...entry,
    });
  } catch (e) { /* best-effort: la auditoría jamás rompe la operación */ }
}

/** Destacar/quitar: featuredWeek SIEMPRE espejo de destacado (legacy con
 *  lectores vivos). Bump _version SIN tx de chequeo = semántica aceptada
 *  del clásico (toggleDestacadoFn :2344) — no "mejorarla" sin decisión. */
export async function toggleDestacado(v) {
  const next = !v.destacado;
  const who = me();
  await updateDoc(doc(db, 'vehiculos', v._docId), {
    destacado: next,
    featuredWeek: next,
    updatedAt: nowISO(),
    updatedBy: who.email,
    _version: (v._version || 0) + 1,
  });
  await logVehicleAction(v._docId, {
    action: 'featured', vehicleId: v.id || null,
    changes: [{ field: 'destacado', from: !next, to: next }],
  });
  writeAudit('vehicle_featured', 'vehiculo ' + v._docId, next ? 'destacado' : 'quitado');
}

/** Borrado del clásico VERBATIM: el log 'deleted' se escribe ANTES del
 *  delete (la subcolección sobrevive al padre = historial post-mortem).
 *  NO borra imágenes de Storage (huérfanos by-design: duplicados
 *  comparten objetos). La página pública muere en el próximo cron. */
export async function deleteVehicle(v) {
  const label = [v.marca, v.modelo, v.year].filter(Boolean).join(' ');
  await logVehicleAction(v._docId, {
    action: 'deleted', vehicleId: v.id || null, vehicleLabel: label, changes: [],
  });
  await deleteDoc(doc(db, 'vehiculos', v._docId));
  writeAudit('vehicle_delete', 'vehiculo ' + v._docId, label);
}

/* ── Mock (V1): variedad de estados/edades para ejercitar la lista ── */
const daysAgo = (n) => new Date(Date.now() - n * 86400000).toISOString();
export const MOCK_VEHICLES = sortVehicles([
  { _docId: '101', id: 101, codigoUnico: 'ALT-202604-0012', marca: 'mazda', modelo: 'CX-30 Touring', year: 2022, tipo: 'usado', categoria: 'suv', precio: 95000000, precioOferta: 89000000, oferta: true, kilometraje: 35200, estado: 'disponible', destacado: true, featuredWeek: true, prioridad: 30, imagen: '', imagenes: [], color: 'Gris', createdAt: daysAgo(12), updatedAt: daysAgo(2), _version: 4 },
  { _docId: '102', id: 102, codigoUnico: 'ALT-202603-0009', marca: 'chevrolet', modelo: 'Onix Turbo', year: 2023, tipo: 'semi-nuevo', categoria: 'sedan', precio: 68000000, precioOferta: null, oferta: false, kilometraje: 8400, estado: 'apartado', destacado: false, featuredWeek: false, prioridad: 20, imagen: '', imagenes: [], color: 'Rojo', createdAt: daysAgo(45), updatedAt: daysAgo(1), _version: 7 },
  { _docId: '103', id: 103, codigoUnico: 'ALT-202601-0003', marca: 'toyota', modelo: 'Hilux 4x4', year: 2020, tipo: 'usado', categoria: 'pickup', precio: 145000000, precioOferta: null, oferta: false, kilometraje: 78000, estado: 'disponible', destacado: false, featuredWeek: false, prioridad: 10, imagen: '', imagenes: [], color: 'Blanco', createdAt: daysAgo(95), updatedAt: daysAgo(30), _version: 2 },
  { _docId: '104', id: 104, codigoUnico: 'ALT-202602-0005', marca: 'renault', modelo: 'Duster Intens', year: 2021, tipo: 'usado', categoria: 'suv', precio: 72000000, precioOferta: null, oferta: false, kilometraje: 41000, estado: 'vendido', destacado: false, featuredWeek: false, prioridad: 0, imagen: '', imagenes: [], color: 'Azul', createdAt: daysAgo(120), updatedAt: daysAgo(5), _version: 9 },
  { _docId: '105', id: 105, codigoUnico: 'ALT-202605-0021', marca: 'kia', modelo: 'Sportage GT', year: 2024, tipo: 'nuevo', categoria: 'suv', precio: 132000000, precioOferta: null, oferta: false, kilometraje: 0, estado: 'reservado', destacado: false, featuredWeek: false, prioridad: 0, imagen: '', imagenes: [], color: 'Negro', createdAt: daysAgo(70), updatedAt: daysAgo(8), _version: 3 },
]);
