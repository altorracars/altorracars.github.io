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
  collection, query, where, orderBy, onSnapshot, getDocs, setDoc, updateDoc, doc,
} from 'firebase/firestore';
import { db } from '../../core/firebase.js';
import { writeAudit } from '../../core/audit.js';
import { latestCommissionSnapshot, altorraRevenueOf } from '../../domain/pipeline.js';

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

/** Métricas por aliado. Los counts (activos/vendidos/ventasAltorra) salen de
 *  `vehiculos` por `concesionario` (patrón legacy, sin cambio). **§9 (TODO-25)**:
 *  las COMISIONES reales = Σ `altorraRevenue` de los deals GANADOS, agrupado por
 *  el aliado CONGELADO en el snapshot (`frozenTenancy.ownerRefId`) — reemplaza el
 *  `comisionAltorra||utilidadAltorra||utilidadTotal` legacy (undefined en TODOS
 *  los vehículos → $0 engañoso, hallazgo de la reconciliación 26/06). */
export async function fetchDealerStats() {
  const stats = {};
  const ensure = (id) => (stats[id] || (stats[id] = { activos: 0, vendidos: 0, ventasAltorra: 0, comisiones: 0 }));
  // counts por aliado (legacy `concesionario`); '_particular' no es aliado formal
  const vSnap = await getDocs(collection(db, 'vehiculos'));
  vSnap.forEach((docSnap) => {
    const v = docSnap.data();
    const did = v.concesionario;
    if (!did || did === '_particular') return;
    const s = ensure(did);
    if (v.estado === 'vendido') {
      s.vendidos += 1;
      if (v.canalVenta === 'altorra') s.ventasAltorra += 1;
    } else if (v.estado === 'disponible' || !v.estado) {
      s.activos += 1;
    }
  });
  // §9: comisiones REALES desde los deals ganados (snapshot enriquecido). Live-only;
  // si el rol no lee `deals` o no hay ninguno → comisiones quedan 0 (el grid no rompe).
  // A escala se materializaría en concesionarios/{slug}; a 0-5 ventas/mes la query basta.
  try {
    const dSnap = await getDocs(query(collection(db, 'deals'), where('status', '==', 'won')));
    dSnap.forEach((docSnap) => {
      const deal = docSnap.data();
      const snap = latestCommissionSnapshot(deal);
      const aliado = snap && snap.frozenTenancy && snap.frozenTenancy.ownerRefId;
      if (!aliado) return; // propio/externo/deal viejo → sin comisión de aliado
      ensure(aliado).comisiones += altorraRevenueOf(deal);
    });
  } catch (e) { /* sin permiso de deals o vacío → comisiones 0 */ }
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
