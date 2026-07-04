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
// OLA-1.7 (§266): validación de entrada (assertValid) + _version optimistic
// locking — espejados en las rules de `concesionarios` (shape + caps + versión).
// ============================================================

import {
  collection, query, where, orderBy, onSnapshot, getDocs, setDoc, updateDoc, deleteDoc, doc, increment,
  getCountFromServer,
} from 'firebase/firestore';
import { db } from '../../core/firebase.js';
import { writeAudit } from '../../core/audit.js';
import { assertValid } from '../../domain/validate.js';
import { latestCommissionSnapshot, altorraRevenueOf, tenancyGroupKey } from '../../domain/pipeline.js';

/** §TODO-50: ¿la groupKey es de un consignante particular (contact) o el cubo anónimo? */
const isConsignaKey = (k) => !!k && (k.indexOf('contact:') === 0 || k === 'consigna:_unidentified');

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
  const byDealer = {}; // por slug de concesionario (ALIADO-negocio) — compat con las cards de aliados
  const byKey = {};    // §TODO-50: por groupKey tipado — consignantes (contact:*) + cubo anónimo
  const ensureDealer = (id) => (byDealer[id] || (byDealer[id] = { activos: 0, vendidos: 0, ventasAltorra: 0, comisiones: 0 }));
  const ensureKey = (key, nombre) => {
    const e = byKey[key] || (byKey[key] = { key, nombre: nombre || null, activos: 0, vendidos: 0, ventasAltorra: 0, comisiones: 0 });
    if (nombre && !e.nombre) e.nombre = nombre; // nombre DESNORMALIZADO (no re-lee contacts)
    return e;
  };
  // OLA-2.3: los counts por ALIADO son AGREGADOS server-side (getCountFromServer,
  // índices vehiculos(concesionario,estado[,canalVenta])) — la versión anterior
  // descargaba la colección `vehiculos` COMPLETA (docs pesados) solo para contar
  // y congeló el render 30s en vivo (§266). Cambio de contrato deliberado: un doc
  // legacy SIN `estado` ya no cuenta como activo (el wizard siempre lo escribe;
  // la cura de un doc así es ponerle estado, no pagar la colección entera).
  const vehiculosCol = collection(db, 'vehiculos');
  const countWhere = async (...cons) => {
    const s = await getCountFromServer(query(vehiculosCol, ...cons));
    return s.data().count;
  };
  const dealersSnap = await getDocs(collection(db, 'concesionarios'));
  await Promise.all(dealersSnap.docs.map(async (d) => {
    const slug = d.id;
    const [activos, vendidos, ventasAltorra] = await Promise.all([
      countWhere(where('concesionario', '==', slug), where('estado', '==', 'disponible')),
      countWhere(where('concesionario', '==', slug), where('estado', '==', 'vendido')),
      countWhere(where('concesionario', '==', slug), where('estado', '==', 'vendido'), where('canalVenta', '==', 'altorra')),
    ]);
    byDealer[slug] = { activos, vendidos, ventasAltorra, comisiones: 0 };
  }));
  // CONSIGNA: el group-by es por groupKey dinámica (contact:*) — no hay aggregate
  // group-by en Firestore, pero la query filtrada por tenancy.type trae SOLO los
  // vehículos en consigna (subconjunto chico), no el inventario entero.
  const cSnap = await getDocs(query(vehiculosCol, where('tenancy.type', '==', 'CONSIGNA')));
  cSnap.forEach((docSnap) => {
    const v = docSnap.data();
    const gk = tenancyGroupKey(v.tenancy);
    if (!isConsignaKey(gk)) return;
    const s = ensureKey(gk, v.tenancy && v.tenancy.ownerDisplayName);
    if (v.estado === 'vendido') s.vendidos += 1;
    else if (v.estado === 'disponible' || !v.estado) s.activos += 1;
  });
  // §TODO-50: comisiones REALES de los deals ganados, agrupadas por la TUPLA congelada
  // (type+ownerRefId) — slug de aliado y contactId NUNCA colisionan. Live-only; si el rol
  // no lee `deals` o no hay ninguno → comisiones 0 (el grid no rompe).
  try {
    const dSnap = await getDocs(query(collection(db, 'deals'), where('status', '==', 'won')));
    dSnap.forEach((docSnap) => {
      const deal = docSnap.data();
      const snap = latestCommissionSnapshot(deal);
      if (!snap || !snap.frozenTenancy) return; // propio/externo/deal viejo → sin comisión de tercero
      const ft = snap.frozenTenancy;
      const rev = altorraRevenueOf(deal);
      if (ft.type === 'ALIADO' && ft.ownerRefId) {
        ensureDealer(ft.ownerRefId).comisiones += rev;
      } else if (isConsignaKey(tenancyGroupKey(ft))) {
        ensureKey(tenancyGroupKey(ft), ft.ownerDisplayName).comisiones += rev;
      }
    });
  } catch (e) { /* sin permiso de deals o vacío → comisiones 0 */ }
  const consignantes = Object.values(byKey)
    .sort((a, b) => (b.comisiones - a.comisiones) || String(a.nombre || '').localeCompare(String(b.nombre || '')));
  return { byDealer, consignantes };
}

// OLA-1.7 (§266): validación en el ORIGEN (por aquí entró "dfsfdfdfs") + espejo
// en firestore.rules (shape whitelist + caps + _version). El nombre exige al
// menos una letra — un slug de puros símbolos colapsaba a "-".
const DEALER_FIELDS = {
  nombre: { label: 'El nombre', required: true, maxLen: 80, pattern: /[a-záéíóúüñ]/i, patternMsg: 'El nombre debe tener al menos una letra.' },
  direccion: { label: 'La dirección', maxLen: 160 },
  telefono: { label: 'El teléfono', maxLen: 25, pattern: /^[\d\s+().-]{7,25}$/, patternMsg: 'El teléfono debe tener entre 7 y 25 dígitos.' },
  ciudad: { label: 'La ciudad', maxLen: 60, default: 'Cartagena' },
  horario: { label: 'El horario', maxLen: 120 },
  responsable: { label: 'El responsable', maxLen: 80 },
};

/** Crea (docId = slug) o actualiza. Escribe los 8 campos verbatim del clásico. */
export async function saveDealer(docId, fields) {
  const v = assertValid(DEALER_FIELDS, fields);
  if (!v.ciudad) v.ciudad = 'Cartagena';
  const isEdit = !!docId;
  const id = isEdit ? docId : slugifyDealer(v.nombre);
  if (!id || id === '-') { const e = new Error('Nombre inválido.'); e.friendly = true; throw e; }
  const data = {
    nombre: v.nombre,
    direccion: v.direccion,
    telefono: v.telefono,
    ciudad: v.ciudad,
    horario: v.horario,
    responsable: v.responsable,
    updatedAt: new Date().toISOString(),
    updatedBy: fields._userEmail || 'unknown',
  };
  if (isEdit) {
    // _version: optimistic locking (OLA-1.7) — increment funciona también sobre
    // docs legacy sin el campo (queda 1; rules aceptan la migración null→1).
    await updateDoc(doc(db, 'concesionarios', id), { ...data, _version: increment(1) });
    writeAudit('dealer_update', 'aliado ' + v.nombre, '');
  } else {
    await setDoc(doc(db, 'concesionarios', id), { ...data, _version: 1 });
    writeAudit('dealer_create', 'aliado ' + v.nombre, '');
  }
  return id;
}

/** Borrado owner-only (rules: isSuperAdmin || dealers.delete). NO toca
 *  `vehiculos.concesionario` (slug string): los vehículos del aliado quedan
 *  con su origen pero sin doc de aliado — es lo esperado para purgar basura. */
export async function deleteDealer(id, nombre) {
  if (!id) throw new Error('ID de aliado inválido.');
  await deleteDoc(doc(db, 'concesionarios', id));
  writeAudit('dealer_delete', 'aliado ' + (nombre || id), '');
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
