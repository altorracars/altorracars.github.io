// ============================================================
// Atributos del inventario (E6 fase ③ paso 2) — capa de datos.
// SSoT: config/listas — el MISMO doc que lee el sitio público
// (js/core/dynamic-lists.js: filtros de catálogo + form de vehículos
// del clásico). Shape VERBATIM del lector: { listKey: [{value,label}] }.
// El lector trata clave vacía/ausente como "usa defaults de fábrica"
// — por eso la UI bloquea guardar una lista vacía.
// Guardado: setDoc merge SOLO de la clave editada (el clásico
// reescribía el doc completo — pisaba ediciones concurrentes).
// Rules: config/listas escribe super_admin o settings.* (§61.R6);
// cero cambios de rules. Fase ④ podrá granular un lists.edit.
// ============================================================

import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../core/firebase.js';
import { writeAudit } from '../../core/audit.js';

// Espejo exacto de configAdminWrite() para docId 'listas' ('*' pasa
// vía hasPermission). El clásico exigía '*' a secas — esto refleja
// lo que las rules REALMENTE permiten.
export const LIST_PERMS = ['settings.theme', 'settings.seo', 'settings.backup'];

// Defs en el MISMO orden que el clásico (admin-lists.js LIST_LABELS).
// `field` = campo del doc vehículo para conteo de uso; 'caracteristicas'
// = membresía en el array; null = la lista no mapea a vehículos (CRM).
export const LIST_DEFS = [
  { key: 'tipos', title: 'Tipos de vehículo', desc: 'Nuevo, Usado, etc.', field: 'tipo' },
  { key: 'categorias', title: 'Categorías', desc: 'Sedan, SUV, Pickup, etc.', field: 'categoria' },
  { key: 'transmisiones', title: 'Transmisiones', desc: 'Automática, Mecánica, etc.', field: 'transmision' },
  { key: 'combustibles', title: 'Combustibles', desc: 'Gasolina, Diesel, Eléctrico, etc.', field: 'combustible' },
  { key: 'direcciones', title: 'Direcciones', desc: 'Eléctrica, Hidráulica, etc.', field: 'direccion' },
  { key: 'tracciones', title: 'Tracciones', desc: 'Delantera, 4x4, AWD, etc.', field: 'traccion' },
  { key: 'colores', title: 'Colores', desc: 'Blanco, Negro, Rojo, etc.', field: 'color' },
  { key: 'canalesVenta', title: 'Canales de venta', desc: 'Presencial, WhatsApp, Redes — los usa el CRM al registrar ventas.', field: null },
  { key: 'featSeguridad', title: 'Características: Seguridad', desc: 'ABS, Airbags, Alarma, etc.', field: 'caracteristicas' },
  { key: 'featConfort', title: 'Características: Confort', desc: 'Aire acondicionado, Asientos cuero, etc.', field: 'caracteristicas' },
  { key: 'featTecnologia', title: 'Características: Tecnología', desc: 'Pantalla táctil, Bluetooth, etc.', field: 'caracteristicas' },
  { key: 'featExterior', title: 'Características: Exterior', desc: 'Luces LED, Rines aluminio, etc.', field: 'caracteristicas' },
  { key: 'featInterior', title: 'Características: Interior', desc: 'Vidrios eléctricos, Tapizado, etc.', field: 'caracteristicas' },
];

// Réplica verbatim de DEFAULTS (js/core/dynamic-lists.js:11) — el
// fallback que la web usa si una clave falta. NO editar sin tocar
// la fuente: divergir aquí = el portal "ve" otra cosa que la web.
export const FALLBACK_LISTS = {
  tipos: [
    { value: 'nuevo', label: 'Nuevo' },
    { value: 'usado', label: 'Usado' },
  ],
  categorias: [
    { value: 'sedan', label: 'Sedan' },
    { value: 'suv', label: 'SUV' },
    { value: 'hatchback', label: 'Hatchback' },
    { value: 'pickup', label: 'Pickup' },
  ],
  transmisiones: [
    { value: 'automatica', label: 'Automatica' },
    { value: 'mecanica', label: 'Mecanica' },
  ],
  combustibles: [
    { value: 'gasolina', label: 'Gasolina' },
    { value: 'diesel', label: 'Diesel' },
    { value: 'electrico', label: 'Electrico' },
    { value: 'hibrido', label: 'Hibrido' },
  ],
  direcciones: [
    { value: 'Electrica', label: 'Electrica' },
    { value: 'Hidraulica', label: 'Hidraulica' },
    { value: 'Mecanica', label: 'Mecanica' },
    { value: 'Electrohidraulica', label: 'Electrohidraulica' },
  ],
  tracciones: [
    { value: 'Delantera', label: 'Delantera' },
    { value: 'Trasera', label: 'Trasera' },
    { value: '4x4', label: '4x4' },
    { value: 'AWD', label: 'AWD' },
  ],
  colores: [
    { value: 'Blanco', label: 'Blanco' },
    { value: 'Negro', label: 'Negro' },
    { value: 'Gris', label: 'Gris' },
    { value: 'Plata', label: 'Plata' },
    { value: 'Rojo', label: 'Rojo' },
    { value: 'Azul', label: 'Azul' },
    { value: 'Verde', label: 'Verde' },
    { value: 'Beige', label: 'Beige' },
  ],
  canalesVenta: [
    { value: 'presencial', label: 'Visita presencial' },
    { value: 'whatsapp', label: 'WhatsApp' },
    { value: 'redes', label: 'Redes sociales' },
    { value: 'referido', label: 'Referido' },
    { value: 'otro', label: 'Otro' },
  ],
  featSeguridad: [
    { value: 'Sistema de frenos ABS', label: 'ABS' },
    { value: 'Airbags frontales', label: 'Airbags frontales' },
    { value: 'Airbags laterales', label: 'Airbags laterales' },
    { value: 'Alarma', label: 'Alarma' },
    { value: 'Bloqueo central', label: 'Bloqueo central' },
    { value: 'Control de estabilidad', label: 'Control estabilidad' },
    { value: 'Control de traccion', label: 'Control traccion' },
    { value: 'Sensor de reversa', label: 'Sensor reversa' },
    { value: 'Camara de reversa', label: 'Camara reversa' },
    { value: 'Camara 360', label: 'Camara 360' },
  ],
  featConfort: [
    { value: 'Aire acondicionado', label: 'Aire acondicionado' },
    { value: 'Climatizador automatico', label: 'Climatizador auto' },
    { value: 'Asientos en cuero', label: 'Asientos en cuero' },
    { value: 'Asientos calefactados', label: 'Asientos calefactados' },
    { value: 'Asiento electrico', label: 'Asiento electrico' },
    { value: 'Volante multifuncional', label: 'Volante multifuncional' },
    { value: 'Tapizado en cuero', label: 'Tapizado en cuero' },
    { value: 'Techo panoramico', label: 'Techo panoramico' },
  ],
  featTecnologia: [
    { value: 'Pantalla tactil', label: 'Pantalla tactil' },
    { value: 'Bluetooth', label: 'Bluetooth' },
    { value: 'USB / Auxiliar', label: 'USB / Auxiliar' },
    { value: 'Android Auto', label: 'Android Auto' },
    { value: 'Apple CarPlay', label: 'Apple CarPlay' },
    { value: 'GPS / Navegacion', label: 'GPS / Navegacion' },
    { value: 'Radio AM/FM', label: 'Radio AM/FM' },
    { value: 'Computador de viaje', label: 'Computador de viaje' },
    { value: 'Keyless entry', label: 'Keyless entry' },
    { value: 'Boton de encendido', label: 'Boton de encendido' },
  ],
  featExterior: [
    { value: 'Luces LED', label: 'Luces LED' },
    { value: 'Luces DRL', label: 'Luces DRL' },
    { value: 'Rines de aluminio', label: 'Rines de aluminio' },
    { value: 'Barras de techo', label: 'Barras de techo' },
    { value: 'Exploradoras', label: 'Exploradoras' },
    { value: 'Espejos electricos', label: 'Espejos electricos' },
  ],
  featInterior: [
    { value: 'Vidrios electricos', label: 'Vidrios electricos' },
    { value: 'Cierre centralizado', label: 'Cierre centralizado' },
    { value: 'Tablero digital', label: 'Tablero digital' },
    { value: 'Guantera refrigerada', label: 'Guantera refrigerada' },
    { value: 'Apoyabrazos central', label: 'Apoyabrazos central' },
  ],
};

/** Carga ÚNICA (getDoc, no onSnapshot: un snapshot entrante pisaría
 *  inputs a mitad de edición). Normaliza items string → {value,label}
 *  (el lector soporta ambos; el editor siempre escribe el shape map). */
export async function fetchLists() {
  const snap = await getDoc(doc(db, 'config', 'listas'));
  const data = snap.exists() ? snap.data() : {};
  const out = {};
  LIST_DEFS.forEach(({ key }) => {
    const arr = Array.isArray(data[key]) && data[key].length ? data[key] : FALLBACK_LISTS[key];
    out[key] = arr.map((it) => (typeof it === 'string'
      ? { value: it, label: it }
      : { value: it.value, label: it.label || it.value }));
  });
  return out;
}

/** Guarda UNA lista (merge: no pisa las otras 12 ni ediciones ajenas).
 *  Mismo audit que el clásico (admin-lists.js: list_update). */
export async function saveList(key, items, userEmail) {
  await setDoc(doc(db, 'config', 'listas'), {
    [key]: items,
    updatedAt: new Date().toISOString(),
    updatedBy: userEmail || 'unknown',
  }, { merge: true });
  writeAudit('list_update', 'lista ' + key, items.length + ' opciones');
}

/** Uso por valor (una lectura de vehiculos por mount, patrón Marcas).
 *  Permite avisar antes de quitar una opción que el inventario usa
 *  (mejora vs el clásico: quitar un valor en uso rompía los filtros). */
export async function fetchUsageCounts() {
  const snap = await getDocs(collection(db, 'vehiculos'));
  const fields = {};
  LIST_DEFS.forEach((d) => { if (d.field && d.field !== 'caracteristicas') fields[d.field] = {}; });
  const features = {};
  snap.forEach((d) => {
    const v = d.data();
    Object.keys(fields).forEach((f) => {
      if (v[f]) fields[f][v[f]] = (fields[f][v[f]] || 0) + 1;
    });
    (Array.isArray(v.caracteristicas) ? v.caracteristicas : []).forEach((feat) => {
      features[feat] = (features[feat] || 0) + 1;
    });
  });
  return { fields, features };
}

export function usageOf(def, counts, value) {
  if (!def.field || !counts) return 0;
  if (def.field === 'caracteristicas') return counts.features[value] || 0;
  return (counts.fields[def.field] && counts.fields[def.field][value]) || 0;
}

export const MOCK_LISTS = (() => {
  const m = JSON.parse(JSON.stringify(FALLBACK_LISTS));
  m.transmisiones.push({ value: 'triptonica', label: 'Triptónica' }); // espeja una edición real del dueño
  return m;
})();

export const MOCK_COUNTS = {
  fields: {
    tipo: { usado: 7, nuevo: 2 },
    categoria: { suv: 4, sedan: 3, pickup: 2 },
    transmision: { automatica: 6, mecanica: 3 },
    combustible: { gasolina: 8, hibrido: 1 },
    direccion: { Electrica: 5, Hidraulica: 4 },
    traccion: { Delantera: 6, '4x4': 3 },
    color: { Blanco: 3, Negro: 3, Gris: 2, Rojo: 1 },
  },
  features: { 'Aire acondicionado': 8, Bluetooth: 7, 'Camara de reversa': 5, 'Luces LED': 6, 'Vidrios electricos': 9 },
};
