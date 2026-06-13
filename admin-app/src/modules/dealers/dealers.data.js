// ============================================================
// Aliados / Concesionarios (E6 fase ③, ADR §204) — capa de datos.
// ⟦OPUS-4.8 · rev-Fable⟧ (Fable 5 no disponible — revisar al volver).
//
// Port VERBATIM del clásico admin-dealers.js: colección `concesionarios`,
// docId = slug del nombre. Modelo PLANO (8 campos) — sin enriquecer:
// el modelo CRM ampliado (activo/tipoAliado/nit/esquemaComisión) está
// DIFERIDO a la decisión del dueño D5-03 (FASE 2).
//
// ⚠️ El docId usa el regex EXACTO del clásico (admin-dealers.js:189), que
// NO normaliza tildes — a diferencia de brands.slugify() (NFD). Replicarlo
// mantiene el docId idéntico entre el admin clásico y el portal durante el
// doble-admin → cero divergencia / cero migración de `vehiculos.concesionario`.
// Las rules de `concesionarios` NO exigen validVersion() → NO se escribe _version.
// ============================================================

import {
  collection, query, orderBy, onSnapshot, getDocs, setDoc, updateDoc, doc,
} from 'firebase/firestore';
import { db } from '../../core/firebase.js';
import { writeAudit } from '../../core/audit.js';

/** Slug VERBATIM del clásico (admin-dealers.js:189). NO usar brands.slugify(). */
export function slugifyDealer(nombre) {
  return nombre.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
}

/** Lista en tiempo real, ordenada por nombre. Clave estandarizada a `id`. */
export function subscribeDealers(onData, onError) {
  const q = query(collection(db, 'concesionarios'), orderBy('nombre', 'asc'));
  return onSnapshot(q, (snap) => {
    onData(snap.docs.map((d) => ({ ...d.data(), id: d.id })));
  }, (err) => onError && onError(err));
}

/** Métricas por aliado derivadas de `vehiculos` (una lectura por mount,
 *  patrón fetchVehicleCounts de brands). Réplica de admin-dealers.js:91-123.
 *  Excluye '_particular' (no es un aliado formal). */
export async function fetchDealerStats() {
  const snap = await getDocs(collection(db, 'vehiculos'));
  const stats = {};
  snap.forEach((docSnap) => {
    const v = docSnap.data();
    const did = v.concesionario;
    if (!did || did === '_particular') return;
    if (!stats[did]) stats[did] = { activos: 0, vendidos: 0, ventasAltorra: 0, comisiones: 0 };
    if (v.estado === 'vendido') {
      stats[did].vendidos += 1;
      if (v.canalVenta === 'altorra') {
        stats[did].ventasAltorra += 1;
        stats[did].comisiones += (v.comisionAltorra || v.utilidadAltorra || v.utilidadTotal || 0);
      }
    } else if (v.estado === 'disponible' || !v.estado) {
      stats[did].activos += 1;
    }
  });
  return stats;
}

/** Crea (docId = slug) o actualiza. Escribe los 8 campos verbatim del clásico. */
export async function saveDealer(docId, fields) {
  const isEdit = !!docId;
  const id = isEdit ? docId : slugifyDealer(fields.nombre);
  if (!id) throw new Error('Nombre inválido.');
  const data = {
    nombre: fields.nombre,
    direccion: fields.direccion,
    telefono: fields.telefono,
    ciudad: fields.ciudad || 'Cartagena',
    horario: fields.horario,
    responsable: fields.responsable,
    updatedAt: new Date().toISOString(),
    updatedBy: fields._userEmail || 'unknown',
  };
  if (isEdit) {
    await updateDoc(doc(db, 'concesionarios', id), data);
    writeAudit('dealer_update', 'aliado ' + fields.nombre, '');
  } else {
    await setDoc(doc(db, 'concesionarios', id), data);
    writeAudit('dealer_create', 'aliado ' + fields.nombre, '');
  }
  return id;
}

export const MOCK_DEALERS = [
  { id: 'autollanos', nombre: 'Autollanos', ciudad: 'Cartagena', direccion: 'Av. Pedro de Heredia #45-12', telefono: '3001234567', responsable: 'Juan Pérez', horario: 'L-V 8am-6pm' },
  { id: 'caribe-motors', nombre: 'Caribe Motors', ciudad: 'Barranquilla', direccion: 'Calle 84 #50-20', telefono: '3009876543', responsable: 'María Gómez', horario: '' },
  { id: 'consignaciones-del-norte', nombre: 'Consignaciones del Norte', ciudad: 'Cartagena', direccion: '', telefono: '', responsable: '' },
];

export const MOCK_DEALER_STATS = {
  autollanos: { activos: 3, vendidos: 5, ventasAltorra: 2, comisiones: 4200000 },
  'caribe-motors': { activos: 1, vendidos: 0, ventasAltorra: 0, comisiones: 0 },
  'consignaciones-del-norte': { activos: 0, vendidos: 1, ventasAltorra: 1, comisiones: 800000 },
};
