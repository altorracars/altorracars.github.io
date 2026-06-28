// ============================================================
// Dominio puro del VEHÍCULO (épica E6 fase ③ paso 5, etapa V1).
// Port VERBATIM del motor Smart Fields (js/admin/smart-fields.js,
// D7-04/K.2 — era 100% lógica pura) + derivados del clásico.
// Contratos completos: bóveda 2026-06-12-mapa-epica-vehiculos.
// REGLAS DE ORO del port: el ORDEN de las RULES es contrato
// (prioridad_destacado lee el tipo recién derivado); las
// VALIDATIONS son advisory (JAMÁS bloquean el guardado); el
// penalty de km es ACUMULATIVO (-10 y OTRO -10, no else-if).
// ============================================================

/** Blank = undefined | null | '' | NaN numérico (smart-fields.js:31). */
export const isBlank = (v) => v === undefined || v === null || v === ''
  || (typeof v === 'number' && Number.isNaN(v));

/** §B.1 — tipo DERIVADO del kilometraje (admin-vehicles.js:1842-1864).
 *  km es la fuente de verdad; '' = sin derivar (señal para Smart Fields). */
export function deriveTipoFromKm(kmRaw) {
  if (kmRaw === '' || kmRaw === null || kmRaw === undefined) return '';
  const km = Number(kmRaw);
  if (!Number.isFinite(km) || km < 0) return '';
  if (km === 0) return 'nuevo';
  if (km <= 10000) return 'semi-nuevo';
  return 'usado';
}

export const TIPO_LABELS = { nuevo: 'Nuevo', 'semi-nuevo': 'Semi-nuevo', usado: 'Usado' };

/** ESTADO_LABELS canónicos (admin-state.js:405-411). 'apartado' lo
 *  gestiona el CRM (§186); hold manual = 'reservado'; vendido terminal. */
export const ESTADO_LABELS = {
  disponible: 'Disponible',
  apartado: 'Apartado',
  reservado: 'Reservado',
  vendido: 'Vendido',
  borrador: 'Borrador',
};

/** Días en stock (admin-predictive.js:117-136): base createdAt||updatedAt,
 *  floor de días. Stale ≥60, crítico ≥90 — solo aplica a 'disponible'. */
export function daysInStock(v) {
  const base = v.createdAt || v.updatedAt;
  if (!base) return null;
  const t = new Date(base).getTime();
  if (!Number.isFinite(t)) return null;
  return Math.floor((Date.now() - t) / 86400000);
}

/* ── Smart Fields: RULES (rellenan blanks, NUNCA pisan al admin) ── */

const RULES = [
  {
    id: 'tipo_from_km', field: 'tipo',
    fn(doc) {
      if (!isBlank(doc.tipo) || isBlank(doc.kilometraje)) return null;
      const km = parseInt(doc.kilometraje, 10) || 0;
      const tipo = km === 0 ? 'nuevo' : (km <= 10000 ? 'semi-nuevo' : 'usado');
      return { value: tipo, reason: 'kilometraje ' + km };
    },
  },
  {
    id: 'estado_default', field: 'estado',
    fn(doc) {
      if (!isBlank(doc.estado)) return null;
      return { value: 'disponible', reason: 'estado por defecto' };
    },
  },
  {
    id: 'oferta_from_precioOferta', field: 'oferta',
    fn(doc) {
      if (!isBlank(doc.oferta)) return null;
      const po = parseFloat(doc.precioOferta);
      if (po > 0 && po < parseFloat(doc.precio)) {
        return { value: true, reason: 'tiene precio de oferta' };
      }
      return null;
    },
  },
  {
    id: 'puertas_default', field: 'puertas',
    fn(doc) {
      if (!isBlank(doc.puertas)) return null;
      return { value: 5, reason: 'puertas por defecto' };
    },
  },
  {
    id: 'pasajeros_default', field: 'pasajeros',
    fn(doc) {
      if (!isBlank(doc.pasajeros) || !isBlank(doc.asientos)) return null;
      return { value: 5, reason: 'pasajeros por defecto' };
    },
  },
  {
    id: 'ubicacion_default', field: 'ubicacion',
    fn(doc) {
      if (!isBlank(doc.ubicacion)) return null;
      return { value: 'Cartagena', reason: 'ubicación por defecto' };
    },
  },
  {
    // Score 0-100 write-only (nadie lo lee aún; paridad de shape con el
    // clásico). DEBE correr al final: lee tipo/oferta recién derivados.
    id: 'prioridad_destacado', field: 'prioridadDestacado',
    fn(doc) {
      if (!isBlank(doc.prioridadDestacado)) return null;
      let score = 50;
      if (doc.tipo === 'nuevo') score += 25;
      else if (doc.tipo === 'semi-nuevo') score += 15;
      if (doc.oferta || (doc.precioOferta && doc.precio && doc.precioOferta < doc.precio)) score += 15;
      if (doc.categoria === 'suv' || doc.categoria === 'pickup') score += 5;
      const km = parseInt(doc.kilometraje, 10) || 0;
      if (km > 100000) score -= 10;
      if (km > 150000) score -= 10; // acumulativo: 160k = -20 (NO else-if)
      score = Math.max(0, Math.min(100, score));
      return { value: score, reason: 'score de destaque calculado' };
    },
  },
];

/* ── VALIDATIONS (advisory: warnings/errors que NO bloquean) ── */

const VALIDATIONS = [
  { id: 'classic_anomaly', fn(d) { const y = parseInt(d.year, 10); const km = parseInt(d.kilometraje, 10); if (y && y < 2000 && Number.isFinite(km) && km < 50000) return { field: 'kilometraje', severity: 'warning', message: 'Año ' + y + ' con solo ' + km + ' km — ¿clásico o error de dedo?' }; return null; } },
  { id: 'cuota_vs_precio', fn(d) { const c = parseFloat(d.cuotaInicial); const p = parseFloat(d.precio); if (c && p && c > p) return { field: 'cuotaInicial', severity: 'error', message: 'La cuota inicial supera el precio.' }; return null; } },
  { id: 'precio_alto', fn(d) { const p = parseFloat(d.precio); if (p > 1000000000) return { field: 'precio', severity: 'warning', message: 'Precio mayor a $1.000 millones — verifica los ceros.' }; return null; } },
  { id: 'precio_bajo', fn(d) { const p = parseFloat(d.precio); if (p > 0 && p < 5000000) return { field: 'precio', severity: 'warning', message: 'Precio menor a $5 millones — ¿faltan ceros?' }; return null; } },
  { id: 'oferta_mayor_que_precio', fn(d) { const po = parseFloat(d.precioOferta); const p = parseFloat(d.precio); if (po && p && po > p) return { field: 'precioOferta', severity: 'error', message: 'La oferta es MAYOR que el precio normal.' }; return null; } },
  { id: 'year_futuro', fn(d) { const y = parseInt(d.year, 10); if (y && y > new Date().getFullYear() + 1) return { field: 'year', severity: 'warning', message: 'Año ' + y + ' está en el futuro.' }; return null; } },
  { id: 'km_negativo', fn(d) { const km = parseFloat(d.kilometraje); if (km < 0) return { field: 'kilometraje', severity: 'error', message: 'El kilometraje no puede ser negativo.' }; return null; } },
  { id: 'sin_imagen', fn(d) { if (Array.isArray(d.imagenes) && d.imagenes.length === 0) return { field: 'imagen', severity: 'warning', message: 'El vehículo no tiene fotos.' }; return null; } },
];

/** derive(doc) → { result, derived[] }. Aplica RULES EN ORDEN sobre una
 *  copia (las posteriores leen lo que rellenaron las anteriores);
 *  idempotente; cada regla en try/catch silencioso (una regla rota
 *  jamás tumba el guardado — tolerancia del clásico). */
export function derive(doc) {
  const result = Object.assign({}, doc);
  const derived = [];
  for (const rule of RULES) {
    try {
      const out = rule.fn(result);
      if (out) {
        result[rule.field] = out.value;
        derived.push({ ruleId: rule.id, field: rule.field, value: out.value, reason: out.reason });
      }
    } catch (e) { /* regla rota no tumba el save */ }
  }
  return { result, derived };
}

/** preview(doc) → derivaciones SIN mutar (para el panel en vivo). */
export function smartPreview(doc) {
  return derive(doc).derived;
}

/** validate(doc) → [{field, severity, message, ruleId}] — solo UI. */
export function smartValidate(doc) {
  const out = [];
  for (const v of VALIDATIONS) {
    try {
      const r = v.fn(doc);
      if (r) out.push({ ...r, ruleId: v.id });
    } catch (e) { /* tolerante */ }
  }
  return out;
}

const SUGGESTION_LABELS = {
  tipo: 'Tipo', estado: 'Estado', oferta: 'Oferta',
  puertas: 'Puertas', pasajeros: 'Pasajeros', ubicacion: 'Ubicación',
};

export function formatSuggestion(s) {
  const label = SUGGESTION_LABELS[s.field] || s.field;
  return label + ': ' + s.value + ' (' + s.reason + ')';
}

/** Color → Title Case (paridad buildVehicleData). */
export function toTitleCase(s) {
  return String(s || '').trim().toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase());
}

export function formatPrecio(n) {
  if (!Number.isFinite(Number(n)) || Number(n) <= 0) return '—';
  return '$' + Number(n).toLocaleString('es-CO');
}

/* ── Borradores: helpers PUROS (shape = keys del FORM clásico para
   interop bidireccional durante la coexistencia — admin-vehicles.js
   :918-985). vCodigoUnico JAMÁS se persiste en el draft. ── */

const SNAP_IGNORE = ['_savedAt', '_userId', '_userEmail', '_draftId'];

/** Compara dos snapshots ignorando metadatos; _images por join(',');
 *  resto String(a||'')!==String(b||''). Romper esto regresa el bug
 *  "ya guardé y vuelve a preguntar" (§108). */
export function snapshotsAreDifferent(a, b) {
  if (!a || !b) return true;
  const keys = new Set([...Object.keys(a), ...Object.keys(b)].filter((k) => !SNAP_IGNORE.includes(k)));
  for (const k of keys) {
    if (k === '_images') {
      if ((a._images || []).join(',') !== (b._images || []).join(',')) return true;
    } else if (String(a[k] || '') !== String(b[k] || '')) return true;
  }
  return false;
}

/** ¿El snapshot tiene datos reales? (filtra residuos de la galería y
 *  bloquea guardar borradores vacíos — admin-vehicles.js:1039-1044). */
export function snapshotHasAnyData(s) {
  if (!s) return false;
  const fields = ['vMarca', 'vModelo', 'vYear', 'vTipo', 'vCategoria', 'vPrecio', 'vKm',
    'vTransmision', 'vCombustible', 'vMotor', 'vColor'];
  return fields.some((k) => s[k]) || (Array.isArray(s._images) && s._images.length > 0);
}

/** Limpia recursivamente undefined de objetos y compacta arrays (§111:
 *  Firestore rechaza undefined — el draft "desaparecía" al refresh). */
export function sanitizeForFirestore(v) {
  if (Array.isArray(v)) return v.filter((x) => x !== undefined).map(sanitizeForFirestore);
  if (v && typeof v === 'object' && !(v instanceof Date)) {
    const out = {};
    for (const k of Object.keys(v)) {
      if (v[k] !== undefined) out[k] = sanitizeForFirestore(v[k]);
    }
    return out;
  }
  return v;
}

/* ── Auditoría: diff de campos (admin-vehicles.js:26-46 VERBATIM) ── */

export const AUDIT_FIELDS = ['marca', 'modelo', 'year', 'tipo', 'categoria', 'precio', 'precioOferta',
  'kilometraje', 'transmision', 'combustible', 'motor', 'color', 'estado', 'ubicacion',
  'destacado', 'imagen', 'concesionario', 'oferta', 'featuredOrder'];

export function computeChanges(oldData, newData) {
  if (!oldData) return [{ field: '(nuevo)', from: null, to: 'creado' }];
  const changes = [];
  AUDIT_FIELDS.forEach((field) => {
    let oldVal = oldData[field]; let newVal = newData[field];
    if (oldVal === undefined) oldVal = null;
    if (newVal === undefined) newVal = null;
    if (typeof oldVal === 'number' && typeof newVal === 'number') {
      if (oldVal !== newVal) changes.push({ field, from: oldVal, to: newVal });
    } else if (String(oldVal || '') !== String(newVal || '')) {
      changes.push({ field, from: oldVal, to: newVal });
    }
  });
  return changes;
}

export const PLACA_DEFAULT = 'Disponible al contactar'; // sentinel string-literal (el generador lo excluye del VIN)
export const PLACEHOLDER_IMG = 'multimedia/vehicles/placeholder-car.jpg'; // ruta relativa EXACTA

/**
 * Réplica PURA de buildVehicleData (admin-vehicles.js:1388-1446): el shape
 * COMPLETO que se persiste en cada save. `f` = estado del form con nombres
 * de campo del DOC (no IDs de inputs). Derivados verbatim: tipo←km,
 * oferta=!!precioOferta, asientos=pasajeros, featuredWeek=destacado,
 * prioridad PRESERVADA (solo reorder la muta), color TitleCase, defaults
 * de negocio como strings ('Disponible al contactar', 'Consultar'…).
 * Cierra con el hook Smart Fields: ''→null SOLO tipo/estado → derive() →
 * _smartDerived persistido si derivó (paridad de shape con el clásico).
 */
/** §9 (TODO-25): deriva la TENENCIA del vehículo desde el origen (campo
 *  `concesionario`: ''=PROPIO · '_particular'=CONSIGNA · slug=ALIADO) + la
 *  economía elegida en el form. La UI escribe `concesionario` (legacy) y
 *  `tenancy` (nuevo) COHERENTES; el trigger server-side es la red de seguridad
 *  del espejo inverso. Default MANUAL = requisito #1 del dueño (monto al cerrar). */
export function buildTenancy(f, concesionario) {
  const type = concesionario === '' ? 'PROPIO'
    : (concesionario === '_particular' ? 'CONSIGNA' : 'ALIADO');
  const method = ['SPREAD', 'PERCENTAGE', 'FLAT', 'MANUAL'].includes(f.tenancyMethod)
    ? f.tenancyMethod : 'MANUAL';
  // §TODO-50: identidad TIPADA del owner (puntero {refType,refId} + nombre desnormalizado).
  //  ALIADO    → `concesionarios/{slug}` (el slug ya viene en `concesionario`).
  //  CONSIGNA  → el CONSIGNANTE como `contacts/{id}` desde `f.consignante = {id, nombre}`
  //              (lo pone el selector del wizard). SIN consignante = consigna ANÓNIMA →
  //              ownerRefId null = cubo "Sin identificar" (NO regresión del comportamiento hoy).
  //  El nombre se DESNORMALIZA aquí → el snapshot del deal lo congela y el reporte lo
  //  muestra sin re-leer `contacts` (sobrevive a la supresión Ley 1581). JAMÁS cédula/teléfono.
  let ownerRefId = null;
  let ownerRefType = null;
  let ownerDisplayName = null;
  if (type === 'ALIADO') {
    ownerRefId = concesionario;
    ownerRefType = 'concesionario';
    ownerDisplayName = f.concesionarioNombre || null;
  } else if (type === 'CONSIGNA') {
    const c = f.consignante || null;
    ownerRefId = (c && c.id) || null;
    ownerRefType = ownerRefId ? 'contact' : null;
    ownerDisplayName = (c && c.nombre) || f.consignaParticular || null;
  }
  return {
    type,
    ownerRefId,
    ownerRefType,
    ownerDisplayName,
    economics: {
      method,
      baselineValue: method === 'SPREAD' ? (parseInt(f.tenancyBaseline, 10) || 0) : 0,
      percentageRate: method === 'PERCENTAGE' ? ((parseFloat(f.tenancyRate) || 0) / 100) : null,
      flatFee: method === 'FLAT' ? (parseInt(f.tenancyFlat, 10) || 0) : null,
    },
  };
}

export function buildVehicleDoc(f, { id, codigoUnico, existing, who }) {
  const now = new Date().toISOString();
  const imagenes = (f.imagenes || []).filter((u) => typeof u === 'string' && u);
  const imagen = imagenes[0] || PLACEHOLDER_IMG;
  if (!imagenes.length) imagenes.push(PLACEHOLDER_IMG);
  if (imagenes.indexOf(imagen) < 0) imagenes.unshift(imagen);
  const pasajeros = parseInt(f.pasajeros, 10) || 5;
  const precioOferta = f.precioOferta === '' || f.precioOferta == null ? null : (parseInt(f.precioOferta, 10) || null);
  const concesionario = f.concesionario || '';

  let doc = {
    id,
    codigoUnico: codigoUnico || f.codigoUnico || '',
    marca: f.marca || '',
    modelo: String(f.modelo || '').trim(),
    year: parseInt(f.year, 10) || null,
    tipo: deriveTipoFromKm(f.kilometraje),
    categoria: f.categoria || '',
    precio: parseInt(f.precio, 10) || 0,
    precioOferta,
    oferta: !!precioOferta, // derivado — jamás un checkbox directo
    kilometraje: parseInt(f.kilometraje, 10) || 0,
    transmision: f.transmision || '',
    combustible: f.combustible || '',
    motor: f.motor || '',
    potencia: f.potencia || '',
    cilindraje: f.cilindraje || '',
    traccion: f.traccion || '',
    direccion: f.direccion || 'Electrica',
    color: toTitleCase(f.color),
    puertas: parseInt(f.puertas, 10) || 5,
    pasajeros,
    asientos: pasajeros, // SIEMPRE duplicado (lectores legacy)
    ubicacion: f.ubicacion || 'Cartagena',
    placa: String(f.placa || '').trim() || PLACA_DEFAULT,
    codigoFasecolda: f.codigoFasecolda || 'Consultar',
    revisionTecnica: f.revisionTecnica !== false,
    peritaje: f.peritaje !== false,
    estado: f.estado || 'disponible',
    destacado: !!f.destacado,
    featuredWeek: !!f.destacado, // espejo legacy con lectores vivos
    prioridad: existing ? (existing.prioridad || 0) : 0, // solo reorder la muta
    featuredOrder: f.featuredOrder === '' || f.featuredOrder == null ? null : (parseInt(f.featuredOrder, 10) || null),
    featuredTag: String(f.featuredTag || '').trim() || null,
    imagen,
    imagenes,
    caracteristicas: (f.caracteristicas || []).filter(Boolean),
    concesionario,
    consignaParticular: concesionario === '_particular' ? (f.consignaParticular || '') : '',
    tenancy: buildTenancy(f, concesionario), // §9 restructura comercial (TODO-25)
    updatedAt: now,
    updatedBy: who.email,
    lastModifiedBy: who.email,
    lastModifiedByName: who.nombre,
    lastModifiedAt: now,
  };
  if (existing) {
    if (existing.createdBy) doc.createdBy = existing.createdBy;
    if (existing.createdByName) doc.createdByName = existing.createdByName;
    if (existing.createdAt) doc.createdAt = existing.createdAt;
  } else {
    doc.createdBy = who.email;
    doc.createdByName = who.nombre;
    doc.createdAt = now;
  }
  // Hook Smart Fields (K.2): ''→null SOLO tipo/estado, luego derive.
  if (doc.tipo === '') doc.tipo = null;
  if (doc.estado === '') doc.estado = null;
  const smart = derive(doc);
  doc = smart.result;
  if (smart.derived.length) doc._smartDerived = smart.derived;
  return { doc, derived: smart.derived };
}
