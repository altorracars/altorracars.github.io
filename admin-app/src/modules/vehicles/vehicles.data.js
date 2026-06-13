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
  collection, onSnapshot, doc, updateDoc, deleteDoc, addDoc, getDocs, setDoc, runTransaction, writeBatch,
} from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../core/firebase.js';
import { store } from '../../core/store.js';
import { writeAudit } from '../../core/audit.js';
import { compressImage } from '../../core/image.js';
import { computeChanges, sanitizeForFirestore, snapshotHasAnyData } from '../../domain/vehicle.js';

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

/* ── Create / Update transaccionales (V2 — contratos del clásico) ── */

/** codigoUnico 'ALT-YYYYMM-NNNN' vía tx sobre config/counters.vehicleCodeSeq
 *  (admin-vehicles.js:68-84). Los códigos jamás se reúsan, ni en fallo. */
export async function generateUniqueCode() {
  const ref = doc(db, 'config', 'counters');
  return runTransaction(db, async (tx) => {
    const snap = await tx.get(ref);
    const seq = ((snap.exists() && snap.data().vehicleCodeSeq) || 0) + 1;
    tx.set(ref, { vehicleCodeSeq: seq }, { merge: true });
    const d = new Date();
    return 'ALT-' + d.getFullYear() + String(d.getMonth() + 1).padStart(2, '0')
      + '-' + String(seq).padStart(4, '0');
  });
}

/** docId candidato = max(id)+1 del cache (admin-vehicles.js:1644). */
export function getNextId(vehicles) {
  return vehicles.reduce((m, v) => Math.max(m, Number(v.id) || 0), 0) + 1;
}

/** Create con tx anti-colisión (admin-vehicles.js:1448-1462): si el docId
 *  ya existe, reintenta con id+1 (máx 10). _version SIEMPRE 1 en create. */
export async function createVehicle(vehicleData, candidateId, retries = 10) {
  let id = candidateId;
  for (let i = 0; i < retries; i++) {
    const taken = await runTransaction(db, async (tx) => {
      const ref = doc(db, 'vehiculos', String(id));
      const snap = await tx.get(ref);
      if (snap.exists()) return true;
      tx.set(ref, { ...vehicleData, id, _version: 1 });
      return false;
    });
    if (!taken) {
      await logVehicleAction(String(id), {
        action: 'created', vehicleId: id, changes: computeChanges(null, vehicleData),
      });
      writeAudit('vehicle_create', 'vehiculo ' + id, vehicleData.marca + ' ' + vehicleData.modelo);
      return id;
    }
    id += 1;
  }
  const err = new Error('No se pudo asignar un ID tras ' + retries + ' intentos.');
  err.code = 'id-exhausted';
  throw err;
}

/** Update con optimistic-lock VERBATIM (admin-vehicles.js:1464-1478):
 *  compara el _version capturado al ABRIR el form contra el actual en tx
 *  (jamás increment ciego — pisaría apartado/vendido del CRM, gate de la
 *  épica) y escribe el SHAPE COMPLETO vía tx.update (no set: preserva los
 *  campos de venta; no merge parcial: limpia consignaParticular). */
export async function updateVehicle(vehicleData, id, expectedVersion, oldData) {
  await runTransaction(db, async (tx) => {
    const ref = doc(db, 'vehiculos', String(id));
    const snap = await tx.get(ref);
    if (!snap.exists()) throw Object.assign(new Error('El vehículo ya no existe.'), { code: 'not-found' });
    const currentVersion = snap.data()._version || 0;
    if (expectedVersion !== null && currentVersion !== expectedVersion) {
      const who = snap.data().updatedBy || 'otro usuario';
      throw Object.assign(
        new Error('Otro cambio se guardó primero (' + who + '). Recarga el vehículo y reintenta.'),
        { code: 'version-conflict' });
    }
    tx.update(ref, { ...vehicleData, _version: currentVersion + 1 });
  });
  await logVehicleAction(String(id), {
    action: 'edited', vehicleId: id, changes: computeChanges(oldData, vehicleData),
  });
  writeAudit('vehicle_update', 'vehiculo ' + id, vehicleData.marca + ' ' + vehicleData.modelo);
}

/* ── Imágenes (V3 — decisión 7 del plan, contrato del clásico) ── */

const IMG_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const IMG_MAX_MB = 2; // límite real del clásico (su texto "10MB" era stale)

/** Sube una TANDA de fotos: ordena ALFANUMÉRICO por nombre ANTES de
 *  subir (§104 B.3 — portadas deterministas, no por latencia de red),
 *  comprime a WebP 1200px @ 0.75 (overrides: los defaults del portal
 *  son de banners 1920@0.85), path cars/{ts}_{baseName}.webp con
 *  baseName del nombre ORIGINAL saneado (el Blob comprimido no trae
 *  .name). Resultados por SLOT → URLs en orden estable, para APPEND
 *  al final de la galería. Inválidas se rechazan SIN frenar al resto. */
export async function uploadVehicleImages(files, onStatus) {
  const all = [...files];
  const rejected = [];
  const list = all.filter((f) => {
    if (!IMG_TYPES.includes(f.type)) { rejected.push(f.name + ' (formato)'); return false; }
    if (f.size > IMG_MAX_MB * 1024 * 1024) { rejected.push(f.name + ' (>' + IMG_MAX_MB + 'MB)'); return false; }
    return true;
  });
  list.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }));
  const slots = new Array(list.length);
  let done = 0;
  await Promise.all(list.map(async (file, i) => {
    const blob = await compressImage(file, { maxWidth: 1200, quality: 0.75 });
    const baseName = file.name.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9._-]/g, '_');
    const path = 'cars/' + Date.now() + '_' + baseName + '.webp';
    const snap = await uploadBytes(storageRef(storage, path), blob, { contentType: 'image/webp' });
    slots[i] = await getDownloadURL(snap.ref);
    done += 1;
    if (onStatus) onStatus('Subiendo… ' + done + '/' + list.length);
  }));
  return { urls: slots.filter(Boolean), rejected };
}

/** Concesionarios para el select del paso Comercial ('' = propio). */
export async function fetchConcesionarios() {
  const snap = await getDocs(collection(db, 'concesionarios'));
  return snap.docs.map((d) => ({ id: d.id, nombre: d.data().nombre || d.id }));
}

/* ── V5: reorder global · CSV · auditoría/revert ── */

/** Reorder §103 VERBATIM: la lista ORDENADA completa (ignora filtros)
 *  recibe prioridad secuencial descendente (count-idx)*10; se persiste
 *  por batch SOLO lo que cambió (+updatedAt/By + _version+1 sin tx —
 *  semántica aceptada del clásico). */
export async function saveReorder(orderedList) {
  const who = me();
  const now = nowISO();
  const batch = writeBatch(db);
  let changed = 0;
  orderedList.forEach((v, idx) => {
    const target = (orderedList.length - idx) * 10;
    if ((v.prioridad || 0) === target) return;
    batch.update(doc(db, 'vehiculos', v._docId), {
      prioridad: target, updatedAt: now, updatedBy: who.email, _version: (v._version || 0) + 1,
    });
    changed += 1;
  });
  if (changed) await batch.commit();
  writeAudit('vehicles_reorder', 'inventario', changed + ' posiciones');
  return changed;
}

/** CSV del inventario — headers/filename/BOM/quoting VERBATIM del
 *  clásico (admin-table-utils.js:210-258). */
export function exportVehiclesCSV(vehicles, dealerNames) {
  const headers = ['Codigo', 'Marca', 'Modelo', 'Ano', 'Tipo', 'Categoria', 'Precio', 'Precio Oferta',
    'Estado', 'Kilometraje', 'Transmision', 'Combustible', 'Motor', 'Color', 'Destacado', 'Origen',
    'Creado Por', 'Fecha Creacion', 'Modificado Por', 'Fecha Modificacion'];
  const rows = vehicles.map((v) => {
    let origen = 'Propio';
    if (v.concesionario && v.concesionario !== '' && v.concesionario !== '_particular') {
      origen = (dealerNames && dealerNames[v.concesionario]) || v.concesionario;
    } else if (v.concesionario === '_particular' && v.consignaParticular) {
      origen = 'Consigna: ' + v.consignaParticular;
    }
    return [
      v.codigoUnico || '', v.marca || '', v.modelo || '', v.year || '',
      v.tipo || '', v.categoria || '', v.precio || '', v.precioOferta || '',
      v.estado || 'disponible', v.kilometraje || '', v.transmision || '',
      v.combustible || '', v.motor || '', v.color || '',
      v.destacado ? 'Si' : 'No', origen,
      v.createdByName || v.createdBy || '', v.createdAt || '',
      v.lastModifiedByName || v.lastModifiedBy || '', v.lastModifiedAt || '',
    ];
  });
  let csv = '﻿' + headers.join(',') + '\n';
  rows.forEach((row) => {
    csv += row.map((cell) => {
      let val = cell == null ? '' : String(cell);
      if (val.indexOf(',') >= 0 || val.indexOf('"') >= 0 || val.indexOf('\n') >= 0) {
        val = '"' + val.replace(/"/g, '""') + '"';
      }
      return val;
    }).join(',') + '\n';
  });
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'vehiculos_altorra_' + new Date().toISOString().slice(0, 10) + '.csv';
  a.click();
  URL.revokeObjectURL(url);
}

/** Timeline de auditoría del vehículo (subcolección; sin orderBy server
 *  — el clásico ordena por timestamp NUMBER desc, limit 50 en cliente). */
export async function fetchVehicleAudit(docId) {
  const snap = await getDocs(collection(db, 'vehiculos', docId, 'auditLog'));
  return snap.docs.map((d) => ({ ...d.data(), _id: d.id }))
    .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
    .slice(0, 50);
}

/** Revert (SOLO super, gated en UI): restaura los valores 'from' de un
 *  entry 'edited' + _version+1 + log 'reverted' (clásico :2368-2504). */
export async function revertAuditEntry(v, entry) {
  const who = me();
  const patch = { updatedAt: nowISO(), updatedBy: who.email, _version: (v._version || 0) + 1 };
  (entry.changes || []).forEach((c) => { if (c.field && c.field !== '(nuevo)') patch[c.field] = c.from ?? null; });
  await updateDoc(doc(db, 'vehiculos', v._docId), patch);
  await logVehicleAction(v._docId, {
    action: 'reverted', vehicleId: v.id || null,
    changes: (entry.changes || []).map((c) => ({ field: c.field, from: c.to, to: c.from })),
  });
  writeAudit('vehicle_revert', 'vehiculo ' + v._docId, 'entry ' + (entry._id || ''));
}

/* ── Borradores (V4): usuarios/{uid}/drafts — subcolección PRIVADA
   por cuenta (rules: solo el dueño). Shape del doc = keys del FORM
   CLÁSICO (interop bidireccional). Guardado SOLO explícito (§107:
   autosave/auto-restore eliminados por el dueño). ── */

export const newDraftId = () =>
  'draft_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);

const draftsCol = (uid) => collection(db, 'usuarios', uid, 'drafts');

export async function saveDraftDoc(uid, draftId, snap) {
  await setDoc(doc(draftsCol(uid), draftId), sanitizeForFirestore(snap));
}

/** PROPAGA el error (§110: el catch silencioso impedía el rollback). */
export function deleteDraftDoc(uid, draftId) {
  return deleteDoc(doc(draftsCol(uid), draftId));
}

/** Listener de borradores: SIN orderBy (excluiría docs sin _savedAt),
 *  orden y filtro (snapshotHasAnyData) en cliente; retry ÚNICO tras
 *  1200ms en el primer error (§111: race del token de auth en hard
 *  refresh → galería vacía silenciosa). */
export function subscribeDrafts(uid, onData, onError) {
  let retried = false;
  let unsub = null;
  const start = () => {
    unsub = onSnapshot(draftsCol(uid), (snap) => {
      retried = false; // presupuesto de retry se renueva con cada snapshot OK
      const list = snap.docs
        .map((d) => ({ ...d.data(), _draftId: d.id }))
        .filter(snapshotHasAnyData)
        .sort((a, b) => String(b._savedAt || '').localeCompare(String(a._savedAt || '')));
      onData(list);
    }, (err) => {
      if (!retried) {
        retried = true;
        setTimeout(() => { if (unsub) unsub(); start(); }, 1200);
      } else if (onError) onError(err);
    });
  };
  start();
  return () => { if (unsub) unsub(); };
}

/** Mock en memoria para los drafts (demo). */
export const mockDrafts = [];

/* ── Mock (V1): variedad de estados/edades para ejercitar la lista ── */
const daysAgo = (n) => new Date(Date.now() - n * 86400000).toISOString();
export const MOCK_VEHICLES = sortVehicles([
  { _docId: '101', id: 101, codigoUnico: 'ALT-202604-0012', marca: 'mazda', modelo: 'CX-30 Touring', year: 2022, tipo: 'usado', categoria: 'suv', precio: 95000000, precioOferta: 89000000, oferta: true, kilometraje: 35200, estado: 'disponible', destacado: true, featuredWeek: true, prioridad: 30, imagen: '', imagenes: [], color: 'Gris', createdAt: daysAgo(12), updatedAt: daysAgo(2), _version: 4 },
  { _docId: '102', id: 102, codigoUnico: 'ALT-202603-0009', marca: 'chevrolet', modelo: 'Onix Turbo', year: 2023, tipo: 'semi-nuevo', categoria: 'sedan', precio: 68000000, precioOferta: null, oferta: false, kilometraje: 8400, estado: 'apartado', destacado: false, featuredWeek: false, prioridad: 20, imagen: '', imagenes: [], color: 'Rojo', createdAt: daysAgo(45), updatedAt: daysAgo(1), _version: 7 },
  { _docId: '103', id: 103, codigoUnico: 'ALT-202601-0003', marca: 'toyota', modelo: 'Hilux 4x4', year: 2020, tipo: 'usado', categoria: 'pickup', precio: 145000000, precioOferta: null, oferta: false, kilometraje: 78000, estado: 'disponible', destacado: false, featuredWeek: false, prioridad: 10, imagen: '', imagenes: [], color: 'Blanco', createdAt: daysAgo(95), updatedAt: daysAgo(30), _version: 2 },
  { _docId: '104', id: 104, codigoUnico: 'ALT-202602-0005', marca: 'renault', modelo: 'Duster Intens', year: 2021, tipo: 'usado', categoria: 'suv', precio: 72000000, precioOferta: null, oferta: false, kilometraje: 41000, estado: 'vendido', destacado: false, featuredWeek: false, prioridad: 0, imagen: '', imagenes: [], color: 'Azul', createdAt: daysAgo(120), updatedAt: daysAgo(5), _version: 9 },
  { _docId: '105', id: 105, codigoUnico: 'ALT-202605-0021', marca: 'kia', modelo: 'Sportage GT', year: 2024, tipo: 'nuevo', categoria: 'suv', precio: 132000000, precioOferta: null, oferta: false, kilometraje: 0, estado: 'reservado', destacado: false, featuredWeek: false, prioridad: 0, imagen: '', imagenes: [], color: 'Negro', createdAt: daysAgo(70), updatedAt: daysAgo(8), _version: 3 },
]);
