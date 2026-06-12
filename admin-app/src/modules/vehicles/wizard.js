// ============================================================
// Wizard de vehículo — 6 pasos (épica V2; réplica de conducta del
// clásico admin-phase5 §104/§105/§106). Crear: pasos secuenciales
// con required al AVANZAR (retroceder libre, guardar no pasa por el
// wizard). Editar: TODAS las secciones visibles a la vez.
// Derivados live: tipo←km. Smart preview (advisory). Save replica
// el handler clásico :1480-1551 (protecciones vendido Fase 22,
// featuredOrder duplicado, placa duplicada con confirm, confirm
// final) → create/update transaccionales (vehicles.data).
// Fotos en V2 = URLs manuales (upload nativo llega en V3).
// ============================================================

import { el, clear } from '../../core/dom.js';
import { store } from '../../core/store.js';
import { toast } from '../../core/toast.js';
import { hasPermission } from '../../core/auth.js';
import {
  deriveTipoFromKm, TIPO_LABELS, buildVehicleDoc, smartPreview, smartValidate,
  formatSuggestion, PLACA_DEFAULT, PLACEHOLDER_IMG,
  snapshotsAreDifferent, snapshotHasAnyData,
} from '../../domain/vehicle.js';
import { fetchLists, MOCK_LISTS } from '../lists/lists.data.js';
import {
  generateUniqueCode, getNextId, createVehicle, updateVehicle, fetchConcesionarios,
  uploadVehicleImages, newDraftId, saveDraftDoc, deleteDraftDoc, mockDrafts,
} from './vehicles.data.js';

// 1px dorado — galería de demo sin red.
const DEMO_IMG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/dEJWiQAAAABJRU5ErkJggg==';

const FEAT_CATEGORIES = [
  ['featSeguridad', 'Seguridad'], ['featConfort', 'Confort'], ['featTecnologia', 'Tecnología'],
  ['featExterior', 'Exterior'], ['featInterior', 'Interior'],
];

const STEP_TITLES = ['1 Vehículo', '2 Specs', '3 Comercial', '4 Fotos', '5 Detalle', '6 Publicar'];

const isSuper = () => (store.get().permissions || []).includes('*');

export async function openVehicleWizard({ vehicle, draft, vehicles, brandNames, brands, onDone, onDraftsChange }) {
  const isEdit = !!vehicle;
  const uid = (store.get().user || {}).uid;
  // Contexto de borrador (§107): null = nuevo o edición de publicado.
  let _draftId = draft ? draft.id : null;
  let _lastSaved = draft ? draft.snap : null;
  let _original = null; // baseline de apertura (doble baseline §108)
  const who = (() => {
    const u = store.get().user || {}; const p = store.get().profile || {};
    return { email: u.email || 'unknown', nombre: p.nombre || u.email || 'unknown' };
  })();

  // ── datos de soporte (listas + concesionarios) ──
  let lists, dealers;
  try {
    if (store.get().mock) {
      lists = MOCK_LISTS;
      dealers = [{ id: 'autonorte', nombre: 'AutoNorte SAS' }];
    } else {
      [lists, dealers] = await Promise.all([fetchLists(), fetchConcesionarios().catch(() => [])]);
    }
  } catch (e) { toast('No se pudieron cargar las listas del formulario.', 'error'); return; }

  // ── estado del form ──
  const f = {
    imagenes: (vehicle && (vehicle.imagenes || [vehicle.imagen]).filter((u) => u && u !== PLACEHOLDER_IMG)) || [],
    legacyFeats: [], // características del doc que no matchean checkbox (se preservan)
    destacado: !!(vehicle && vehicle.destacado),
  };
  const inp = {}; // inputs por campo

  /* ── helpers de construcción ── */
  const field = (label, node, hint) => el('label', { class: 'field' }, [
    el('span', { class: 'field__label', text: label }), node,
    hint ? el('span', { class: 'u-caption u-faint', text: hint }) : null,
  ]);
  const selectFrom = (items, { value = '', empty = '— elegir —' } = {}) => {
    const s = el('select', { class: 'select' },
      [empty !== false ? el('option', { value: '', text: empty }) : null,
        ...items.map((it) => el('option', { value: it.value, text: it.label }))]);
    if (value) s.value = value;
    return s;
  };
  const num = (val, attrs = {}) => el('input', { class: 'input', type: 'number', value: val == null ? '' : String(val), ...attrs });
  const txt = (val, attrs = {}) => el('input', { class: 'input', type: 'text', value: val || '', ...attrs });

  /* ── Paso 1 · Identificación ── */
  inp.marca = selectFrom(brands.map((b) => ({ value: b.id, label: b.nombre })), { value: vehicle?.marca });
  inp.modelo = txt(vehicle?.modelo, { maxlength: '60' });
  inp.year = num(vehicle?.year, { min: '1990', max: '2030' });
  inp.categoria = selectFrom(lists.categorias, { value: vehicle?.categoria });
  inp.kilometraje = num(vehicle?.kilometraje, { min: '0' });
  const tipoOut = el('span', { class: 'veh-wiz__tipo u-caption', text: '' });
  function refreshTipo() {
    const t = deriveTipoFromKm(inp.kilometraje.value);
    tipoOut.textContent = t ? ('Tipo: ' + (TIPO_LABELS[t] || t) + ' (derivado del kilometraje)') : 'Tipo: se deriva del kilometraje';
  }
  inp.kilometraje.addEventListener('input', refreshTipo); refreshTipo();
  inp.placa = txt(vehicle?.placa === PLACA_DEFAULT ? '' : vehicle?.placa, { placeholder: PLACA_DEFAULT });
  inp.codigoFasecolda = txt(vehicle?.codigoFasecolda === 'Consultar' ? '' : vehicle?.codigoFasecolda, { placeholder: 'Consultar' });
  const sec1 = el('div', { class: 'veh-wiz__sec' }, [
    isEdit ? el('p', { class: 'u-caption u-faint', text: 'Código: ' + (vehicle.codigoUnico || '—') + ' · ID: ' + vehicle.id }) : null,
    el('div', { class: 'veh-wiz__grid' }, [
      field('Marca *', inp.marca), field('Modelo *', inp.modelo), field('Año *', inp.year),
      field('Categoría *', inp.categoria),
      field('Kilometraje *', inp.kilometraje), field('Placa', inp.placa, 'Vacía = "' + PLACA_DEFAULT + '"'),
      field('Código Fasecolda', inp.codigoFasecolda),
    ]),
    tipoOut,
  ]);

  /* ── Paso 2 · Specs ── */
  inp.transmision = selectFrom(lists.transmisiones, { value: vehicle?.transmision });
  inp.combustible = selectFrom(lists.combustibles, { value: vehicle?.combustible });
  inp.motor = txt(vehicle?.motor); inp.potencia = txt(vehicle?.potencia); inp.cilindraje = txt(vehicle?.cilindraje);
  inp.traccion = selectFrom(lists.tracciones, { value: vehicle?.traccion });
  inp.direccion = selectFrom(lists.direcciones, { value: vehicle?.direccion || 'Electrica', empty: false });
  inp.color = txt(vehicle?.color);
  inp.puertas = num(vehicle?.puertas ?? 5, { min: '2', max: '5' });
  inp.pasajeros = num(vehicle?.pasajeros ?? 5, { min: '2', max: '9' });
  const sec2 = el('div', { class: 'veh-wiz__sec' }, [el('div', { class: 'veh-wiz__grid' }, [
    field('Transmisión *', inp.transmision), field('Combustible *', inp.combustible),
    field('Motor', inp.motor), field('Potencia', inp.potencia), field('Cilindraje', inp.cilindraje),
    field('Tracción', inp.traccion), field('Dirección', inp.direccion), field('Color', inp.color),
    field('Puertas', inp.puertas), field('Pasajeros', inp.pasajeros),
  ])]);

  /* ── Paso 3 · Comercial ── */
  inp.precio = num(vehicle?.precio, { min: '0' });
  inp.precioOferta = num(vehicle?.precioOferta, { min: '0' });
  const estadoOpts = [
    el('option', { value: 'disponible', text: 'Disponible' }),
    el('option', { value: 'apartado', text: 'Apartado (lo gestiona el CRM)', disabled: true }),
    el('option', { value: 'reservado', text: 'Reservado' }),
    el('option', { value: 'vendido', text: 'Vendido' }),
    el('option', { value: 'borrador', text: 'Borrador' }),
  ];
  inp.estado = el('select', { class: 'select' }, estadoOpts);
  inp.estado.value = vehicle?.estado || 'disponible'; // option disabled se puede SETEAR (apartado persiste al editar)
  const vendidoLocked = isEdit && vehicle.estado === 'vendido' && !isSuper();
  if (vendidoLocked) inp.estado.disabled = true;
  inp.ubicacion = txt(vehicle?.ubicacion || 'Cartagena');
  const dealerOpts = [{ value: '', label: 'Propio (ALTORRA)' }, ...dealers.map((d) => ({ value: d.id, label: d.nombre }))];
  if (vehicle?.concesionario === '_particular') dealerOpts.push({ value: '_particular', label: 'Consigna de particular (legacy)' });
  inp.concesionario = selectFrom(dealerOpts, { value: vehicle?.concesionario || '', empty: false });
  inp.consignaParticular = txt(vehicle?.consignaParticular, { placeholder: 'Nombre del particular' });
  const consignaField = field('Consigna particular', inp.consignaParticular);
  const refreshConsigna = () => { consignaField.hidden = inp.concesionario.value !== '_particular'; };
  inp.concesionario.addEventListener('change', refreshConsigna); refreshConsigna();
  inp.revisionTecnica = el('input', { type: 'checkbox' }); inp.revisionTecnica.checked = vehicle ? vehicle.revisionTecnica !== false : true;
  inp.peritaje = el('input', { type: 'checkbox' }); inp.peritaje.checked = vehicle ? vehicle.peritaje !== false : true;
  const sec3 = el('div', { class: 'veh-wiz__sec' }, [
    el('div', { class: 'veh-wiz__grid' }, [
      field('Precio (COP) *', inp.precio), field('Precio de oferta', inp.precioOferta, 'Si lo pones, activa el badge Oferta'),
      field('Estado', inp.estado, vendidoLocked ? '🔒 Vendido — solo Super Admin lo cambia' : (isEdit && vehicle.estado === 'vendido' ? '⚠️ Cambiar el estado revierte la venta' : 'Vender = pipeline del CRM, no este campo')),
      field('Ubicación', inp.ubicacion), field('Concesionario', inp.concesionario), consignaField,
    ]),
    el('div', { class: 'u-row', style: { gap: '16px' } }, [
      el('label', { class: 'veh-wiz__check' }, [inp.revisionTecnica, el('span', { text: ' Revisión técnica al día' })]),
      el('label', { class: 'veh-wiz__check' }, [inp.peritaje, el('span', { text: ' Peritaje disponible' })]),
    ]),
  ]);

  /* ── Paso 4 · Fotos (V2: URLs manuales; upload nativo = V3) ── */
  const galleryEl = el('div', { class: 'veh-wiz__gallery' });
  function renderGallery() {
    clear(galleryEl);
    if (!f.imagenes.length) {
      galleryEl.append(el('span', { class: 'u-caption u-muted', text: 'Sin fotos — se publica con la imagen de relleno.' }));
      return;
    }
    f.imagenes.forEach((url, i) => {
      const up = el('button', { class: 'btn btn--soft btn--sm', type: 'button', text: '↑', 'aria-label': 'Subir posición', disabled: i === 0 });
      up.addEventListener('click', () => { f.imagenes.splice(i - 1, 0, f.imagenes.splice(i, 1)[0]); renderGallery(); });
      const x = el('button', { class: 'btn btn--soft btn--sm', type: 'button', text: '✕', 'aria-label': 'Quitar' });
      x.addEventListener('click', () => { f.imagenes.splice(i, 1); renderGallery(); }); // solo el array — Storage jamás se toca
      galleryEl.append(el('div', { class: 'veh-wiz__img' }, [
        el('img', { src: url, alt: '', loading: 'lazy' }),
        i === 0 ? el('span', { class: 'veh-wiz__principal', text: 'PRINCIPAL' }) : null,
        el('div', { class: 'u-row u-row--tight' }, [up, x]),
      ]));
    });
  }
  renderGallery();
  const urlIn = el('input', { class: 'input', type: 'text', placeholder: 'https://… o multimedia/…' });
  const urlBtn = el('button', { class: 'btn btn--soft btn--sm', type: 'button', text: '＋ Agregar URL' });
  urlBtn.addEventListener('click', () => {
    const u = urlIn.value.trim();
    if (!/^https?:\/\//.test(u) && u.indexOf('multimedia/') !== 0) { toast('URL no válida: usa http(s):// o multimedia/…', 'error'); return; }
    f.imagenes.push(u); urlIn.value = ''; renderGallery();
  });
  // V3: subida nativa — tanda ordenada alfanumérica, APPEND al final.
  const fileInput = el('input', { type: 'file', accept: 'image/jpeg,image/png,image/webp', multiple: true, class: 'ban-file' });
  const upStatus = el('span', { class: 'u-caption u-muted', text: '' });
  const drop = el('div', { class: 'ban-drop' }, [
    el('span', { text: '📷' }),
    el('span', { class: 'u-caption u-muted', text: 'Click para subir fotos (JPG/PNG/WebP → WebP 1200px) · máx 2MB c/u · se ordenan por nombre' }),
  ]);
  drop.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', async () => {
    const files = [...fileInput.files];
    fileInput.value = '';
    if (!files.length) return;
    if (store.get().mock) {
      files.forEach(() => f.imagenes.push(DEMO_IMG));
      renderGallery(); toast(files.length + ' foto(s) simuladas (demo)', 'ok');
      return;
    }
    upStatus.textContent = 'Comprimiendo…';
    try {
      const { urls, rejected } = await uploadVehicleImages(files, (s) => { upStatus.textContent = s; });
      f.imagenes.push(...urls); // append al FINAL de la galería existente (contrato)
      renderGallery();
      upStatus.textContent = urls.length ? '✓ ' + urls.length + ' foto(s) subidas' : '';
      if (rejected.length) toast('Rechazadas: ' + rejected.join(' · '), 'error');
    } catch (e) {
      upStatus.textContent = '';
      toast('No se pudieron subir: ' + (e.message || e.code), 'error');
    }
  });
  const sec4 = el('div', { class: 'veh-wiz__sec' }, [
    el('p', { class: 'u-caption u-muted', text: 'La primera foto es la portada del catálogo. Quitar una foto no borra el archivo (otros vehículos pueden compartirlo).' }),
    drop, fileInput, upStatus,
    galleryEl,
    el('div', { class: 'cfg-row' }, [urlIn, urlBtn]),
  ]);

  /* ── Paso 5 · Detalle (características dinámicas) ── */
  const featBoxes = {};
  const featGrid = el('div', { class: 'veh-wiz__feats' });
  function renderFeats() {
    clear(featGrid);
    const checked = new Set(Object.entries(featBoxes).filter(([, cb]) => cb.checked).map(([v]) => v));
    const existing = new Set((vehicle?.caracteristicas || []));
    FEAT_CATEGORIES.forEach(([key, label]) => {
      const items = lists[key] || [];
      if (!items.length) return;
      const col = el('div', { class: 'veh-wiz__featcol' }, [el('strong', { class: 'u-caption', text: label })]);
      items.forEach((it) => {
        const cb = el('input', { type: 'checkbox' });
        cb.checked = checked.has(it.value) || (!Object.keys(featBoxes).length && existing.has(it.value));
        featBoxes[it.value] = cb;
        col.append(el('label', { class: 'veh-wiz__check' }, [cb, el('span', { text: ' ' + it.label })]));
      });
      featGrid.append(col);
    });
  }
  // legacy: características del doc que no matchean ningún checkbox se preservan
  const known = new Set(FEAT_CATEGORIES.flatMap(([k]) => (lists[k] || []).map((it) => it.value)));
  f.legacyFeats = (vehicle?.caracteristicas || []).filter((c) => !known.has(c));
  renderFeats();
  const featIn = el('input', { class: 'input', type: 'text', placeholder: 'Nueva característica…', maxlength: '60' });
  const featCat = selectFrom(FEAT_CATEGORIES.map(([k, l]) => ({ value: k, label: l })), { empty: false });
  const featBtn = el('button', { class: 'btn btn--soft btn--sm', type: 'button', text: '＋ Agregar' });
  featBtn.addEventListener('click', async () => {
    const v = featIn.value.trim();
    if (!v) return;
    const all = FEAT_CATEGORIES.flatMap(([k]) => (lists[k] || []).map((it) => it.value.toLowerCase()));
    if (all.includes(v.toLowerCase())) { toast('Esa característica ya existe.', 'error'); return; }
    const key = featCat.value;
    lists[key] = [...(lists[key] || []), { value: v, label: v }];
    if (!store.get().mock) {
      try {
        const { saveList } = await import('../lists/lists.data.js');
        await saveList(key, lists[key], who.email); // merge por clave (§194) — no pisa otras listas
      } catch (e) { toast('No se pudo guardar la lista: ' + (e.message || ''), 'error'); return; }
    }
    renderFeats();
    featBoxes[v].checked = true;
    featIn.value = '';
    toast('✓ Característica agregada' + (store.get().mock ? ' (demo)' : ''), 'ok');
  });
  const sec5 = el('div', { class: 'veh-wiz__sec' }, [
    featGrid,
    f.legacyFeats.length ? el('p', { class: 'u-caption u-faint', text: 'Se conservan ' + f.legacyFeats.length + ' característica(s) antiguas sin categoría.' }) : null,
    el('div', { class: 'cfg-row' }, [featIn, featCat, featBtn]),
  ]);

  /* ── Paso 6 · Publicación (destacado + smart preview) ── */
  const destacadoBtn = el('button', { class: 'btn btn--soft btn--sm', type: 'button' });
  inp.featuredOrder = num(vehicle?.featuredOrder, { min: '1' });
  inp.featuredTag = txt(vehicle?.featuredTag, { maxlength: '24', placeholder: 'Etiqueta del banner (opcional)' });
  const bannerBox = el('div', { class: 'veh-wiz__grid' }, [
    field('Posición en destacados', inp.featuredOrder, 'Vacío = orden automático; no se puede repetir'),
    field('Etiqueta', inp.featuredTag),
  ]);
  function refreshDestacado() {
    destacadoBtn.textContent = f.destacado ? '★ Destacado — quitar' : '☆ Destacar en el home';
    destacadoBtn.classList.toggle('btn--gold', f.destacado);
    bannerBox.hidden = !f.destacado;
  }
  destacadoBtn.addEventListener('click', () => { f.destacado = !f.destacado; refreshDestacado(); });
  refreshDestacado();
  const smartBox = el('div', { class: 'veh-wiz__smart' });
  function refreshSmart() {
    const draft = {
      tipo: deriveTipoFromKm(inp.kilometraje.value) || '',
      estado: inp.estado.value, precio: parseFloat(inp.precio.value),
      precioOferta: parseFloat(inp.precioOferta.value), puertas: parseInt(inp.puertas.value, 10),
      pasajeros: parseInt(inp.pasajeros.value, 10), ubicacion: inp.ubicacion.value,
      year: parseInt(inp.year.value, 10), categoria: inp.categoria.value,
      kilometraje: inp.kilometraje.value === '' ? '' : parseInt(inp.kilometraje.value, 10),
    };
    const sugg = smartPreview(draft); const vals = smartValidate(draft);
    clear(smartBox);
    if (sugg.length) smartBox.append(el('p', { class: 'u-caption', text: '✨ ' + sugg.map(formatSuggestion).join(' · ') }));
    vals.forEach((v) => smartBox.append(el('p', {
      class: 'u-caption ' + (v.severity === 'error' ? 'lst-warn' : 'veh-wiz__warn'),
      text: (v.severity === 'error' ? '⛔ ' : '⚠️ ') + v.message,
    })));
    if (!sugg.length && !vals.length) smartBox.append(el('span', { class: 'u-caption u-faint', text: 'Sin sugerencias — todo en orden.' }));
  }
  ['kilometraje', 'precio', 'precioOferta', 'puertas', 'pasajeros', 'ubicacion', 'year', 'categoria', 'estado'].forEach((k) => {
    inp[k].addEventListener('input', refreshSmart); inp[k].addEventListener('change', refreshSmart);
  });
  refreshSmart();
  const sec6 = el('div', { class: 'veh-wiz__sec' }, [destacadoBtn, bannerBox, smartBox]);

  /* ── armado del wizard ── */
  const SECTIONS = [sec1, sec2, sec3, sec4, sec5, sec6];
  const REQUIRED = [
    [['marca', 'Marca'], ['modelo', 'Modelo'], ['year', 'Año'], ['categoria', 'Categoría'], ['kilometraje', 'Kilometraje']],
    [['transmision', 'Transmisión'], ['combustible', 'Combustible']],
    [['precio', 'Precio']], [], [], [],
  ];
  let step = 0;
  const stepsBar = el('div', { class: 'veh-wiz__steps' }, STEP_TITLES.map((t, i) => el('button', { class: 'veh-wiz__step', type: 'button', text: t, dataset: { i: String(i) } })));
  const prevBtn = el('button', { class: 'btn btn--ghost btn--sm', type: 'button', text: '‹ Anterior' });
  const nextBtn = el('button', { class: 'btn btn--soft btn--sm', type: 'button', text: 'Siguiente ›' });
  const progress = el('span', { class: 'u-caption u-faint' });

  function validateStep(i) {
    for (const [key, label] of REQUIRED[i]) {
      if (!String(inp[key].value || '').trim()) {
        inp[key].classList.add('field-error');
        setTimeout(() => inp[key].classList.remove('field-error'), 1500);
        toast('Completa "' + label + '" antes de continuar.', 'error');
        return false;
      }
    }
    return true;
  }
  function goTo(i) {
    if (i > step && !validateStep(step)) return; // valida solo al avanzar (paridad clásico)
    step = Math.max(0, Math.min(5, i));
    SECTIONS.forEach((s, j) => { s.hidden = isEdit ? false : j !== step; });
    [...stepsBar.children].forEach((b, j) => {
      b.classList.toggle('is-active', j === step);
      b.classList.toggle('is-done', j < step);
    });
    prevBtn.style.visibility = step === 0 ? 'hidden' : 'visible';
    nextBtn.style.display = step === 5 ? 'none' : '';
    progress.textContent = isEdit ? 'Editando — todas las secciones' : 'Paso ' + (step + 1) + ' de 6';
  }
  stepsBar.addEventListener('click', (e) => { const b = e.target.closest('.veh-wiz__step'); if (b) goTo(parseInt(b.dataset.i, 10)); });
  prevBtn.addEventListener('click', () => goTo(step - 1));
  nextBtn.addEventListener('click', () => goTo(step + 1));

  /* ── Borradores (V4): snapshot con KEYS DEL FORM CLÁSICO ────── */
  function getSnapshot() {
    const feats = [...Object.entries(featBoxes).filter(([, cb]) => cb.checked).map(([v]) => v), ...f.legacyFeats];
    return {
      vId: vehicle ? String(vehicle.id) : '',
      vMarca: inp.marca.value, vModelo: inp.modelo.value, vYear: inp.year.value,
      vTipo: deriveTipoFromKm(inp.kilometraje.value), vCategoria: inp.categoria.value,
      vPrecio: inp.precio.value, vPrecioOferta: inp.precioOferta.value, vKm: inp.kilometraje.value,
      vTransmision: inp.transmision.value, vCombustible: inp.combustible.value,
      vMotor: inp.motor.value, vPotencia: inp.potencia.value, vCilindraje: inp.cilindraje.value,
      vTraccion: inp.traccion.value, vDireccion: inp.direccion.value, vColor: inp.color.value,
      vPuertas: inp.puertas.value, vPasajeros: inp.pasajeros.value, vUbicacion: inp.ubicacion.value,
      vPlaca: inp.placa.value, vFasecolda: inp.codigoFasecolda.value, vEstado: inp.estado.value,
      vPrioridad: String(vehicle ? (vehicle.prioridad || 0) : 0),
      vFeaturedOrder: inp.featuredOrder.value, vFeaturedTag: inp.featuredTag.value,
      vConcesionario: inp.concesionario.value, vConsignaParticular: inp.consignaParticular.value,
      vDestacado: f.destacado, vOferta: !!inp.precioOferta.value, vFeaturedWeek: f.destacado,
      vRevision: inp.revisionTecnica.checked, vPeritaje: inp.peritaje.checked,
      vCaracteristicas: feats.join('\n'),
      _images: f.imagenes.filter((u) => typeof u === 'string' && u),
      _savedAt: new Date().toISOString(),
    };
  }

  /** Restaura un snapshot al form. km es la fuente de verdad del tipo
   *  (§E.3: el vTipo guardado se ignora — se re-deriva). */
  function applyDraftSnapshot(s) {
    inp.marca.value = s.vMarca || ''; inp.modelo.value = s.vModelo || ''; inp.year.value = s.vYear || '';
    inp.categoria.value = s.vCategoria || ''; inp.kilometraje.value = s.vKm || '';
    inp.placa.value = s.vPlaca || ''; inp.codigoFasecolda.value = s.vFasecolda || '';
    inp.transmision.value = s.vTransmision || ''; inp.combustible.value = s.vCombustible || '';
    inp.motor.value = s.vMotor || ''; inp.potencia.value = s.vPotencia || ''; inp.cilindraje.value = s.vCilindraje || '';
    inp.traccion.value = s.vTraccion || ''; inp.direccion.value = s.vDireccion || 'Electrica';
    inp.color.value = s.vColor || ''; inp.puertas.value = s.vPuertas || '5'; inp.pasajeros.value = s.vPasajeros || '5';
    inp.precio.value = s.vPrecio || ''; inp.precioOferta.value = s.vPrecioOferta || '';
    if (s.vEstado && !inp.estado.disabled) inp.estado.value = s.vEstado;
    inp.ubicacion.value = s.vUbicacion || 'Cartagena';
    inp.concesionario.value = s.vConcesionario || ''; inp.consignaParticular.value = s.vConsignaParticular || '';
    inp.revisionTecnica.checked = s.vRevision !== false; inp.peritaje.checked = s.vPeritaje !== false;
    inp.featuredOrder.value = s.vFeaturedOrder || ''; inp.featuredTag.value = s.vFeaturedTag || '';
    f.destacado = !!s.vDestacado;
    f.imagenes = (s._images || []).slice();
    const lines = String(s.vCaracteristicas || '').split('\n').map((x) => x.trim()).filter(Boolean);
    Object.values(featBoxes).forEach((cb) => { cb.checked = false; });
    f.legacyFeats = lines.filter((v) => {
      if (featBoxes[v]) { featBoxes[v].checked = true; return false; }
      return true;
    });
    refreshTipo(); refreshConsigna(); refreshDestacado(); renderGallery(); refreshSmart();
  }

  async function saveDraftNow() {
    const snap = getSnapshot();
    if (!snapshotHasAnyData(snap)) { toast('Nada que guardar todavía.', 'error'); return false; }
    const prev = { id: _draftId, last: _lastSaved };
    _draftId = _draftId || newDraftId();
    _lastSaved = snap; // OPTIMISTA (§108): contexto primero, write en background
    toast('💾 Borrador guardado' + (store.get().mock ? ' (demo)' : ''), 'ok');
    if (store.get().mock) {
      const i = mockDrafts.findIndex((d) => d._draftId === _draftId);
      const docSnap = { ...snap, _draftId, _userId: 'demo', _userEmail: who.email };
      if (i >= 0) mockDrafts[i] = docSnap; else mockDrafts.unshift(docSnap);
      onDraftsChange && onDraftsChange();
      return true;
    }
    try {
      await saveDraftDoc(uid, _draftId, { ...snap, _draftId, _userId: uid, _userEmail: who.email });
      return true;
    } catch (e) {
      _draftId = prev.id; _lastSaved = prev.last; // rollback COMPLETO (§111)
      toast('El borrador NO se guardó: ' + (e.message || e.code), 'error');
      return false;
    }
  }

  function discardCurrentDraft() {
    if (!_draftId) return;
    const id = _draftId; _draftId = null;
    if (store.get().mock) {
      const i = mockDrafts.findIndex((d) => d._draftId === id);
      if (i >= 0) mockDrafts.splice(i, 1);
      onDraftsChange && onDraftsChange();
    } else {
      deleteDraftDoc(uid, id).catch(() => {}); // único catch silencioso legítimo (post-publicación)
    }
  }

  /* ── save (réplica del handler clásico) ── */
  const saveBtn = el('button', { class: 'btn btn--gold', type: 'button', text: isEdit ? 'Guardar cambios' : 'Publicar vehículo' });
  const draftBtn = el('button', { class: 'btn btn--soft', type: 'button', text: '💾 Borrador' });
  draftBtn.addEventListener('click', saveDraftNow);
  const cancelBtn = el('button', { class: 'btn btn--soft', type: 'button', text: 'Cancelar' });

  saveBtn.addEventListener('click', async () => {
    for (let i = 0; i < REQUIRED.length; i++) { if (!validateStep(i)) { goTo(i); return; } }
    // Fase 22: protecciones de vendido
    if (isEdit && vehicle.estado === 'vendido' && !isSuper()) {
      toast('No puedes modificar un vehículo vendido. Contacta al Super Admin.', 'error'); return;
    }
    if (inp.estado.value === 'vendido' && !(isEdit && vehicle.estado === 'vendido') && !isSuper()) {
      toast('Para vender usa el pipeline del CRM (deal ganado) — el estado no se cambia a mano.', 'error'); return;
    }
    // featuredOrder duplicado entre destacados
    if (f.destacado) {
      const fw = parseInt(inp.featuredOrder.value, 10) || null;
      if (fw !== null) {
        const clash = vehicles.find((v) => v.destacado && v.id !== vehicle?.id && v.featuredOrder === fw);
        if (clash) { toast('La posición ' + fw + ' ya es de "' + (clash.modelo || clash.id) + '". Elige otra o déjala vacía.', 'error'); return; }
      }
    }
    // placa duplicada (confirm, como el clásico F10.7)
    const placa = inp.placa.value.trim().toUpperCase();
    if (placa) {
      const dup = vehicles.find((v) => v.id !== vehicle?.id && String(v.placa || '').trim().toUpperCase() === placa);
      if (dup && !window.confirm('La placa ' + placa + ' ya existe en: ' + (dup.modelo || dup.id) + '. ¿Continuar de todos modos?')) return;
    }
    if (!window.confirm(isEdit ? '¿Confirmas guardar los cambios?' : '¿Confirmas publicar el vehículo?')) return;

    const formState = {
      marca: inp.marca.value, modelo: inp.modelo.value, year: inp.year.value,
      categoria: inp.categoria.value, kilometraje: inp.kilometraje.value,
      placa: inp.placa.value, codigoFasecolda: inp.codigoFasecolda.value.trim(),
      transmision: inp.transmision.value, combustible: inp.combustible.value,
      motor: inp.motor.value, potencia: inp.potencia.value, cilindraje: inp.cilindraje.value,
      traccion: inp.traccion.value, direccion: inp.direccion.value, color: inp.color.value,
      puertas: inp.puertas.value, pasajeros: inp.pasajeros.value,
      precio: inp.precio.value, precioOferta: inp.precioOferta.value,
      estado: inp.estado.disabled ? vehicle.estado : inp.estado.value,
      ubicacion: inp.ubicacion.value.trim(), concesionario: inp.concesionario.value,
      consignaParticular: inp.consignaParticular.value.trim(),
      revisionTecnica: inp.revisionTecnica.checked, peritaje: inp.peritaje.checked,
      destacado: f.destacado, featuredOrder: inp.featuredOrder.value, featuredTag: inp.featuredTag.value,
      imagenes: f.imagenes.slice(),
      caracteristicas: [...Object.entries(featBoxes).filter(([, cb]) => cb.checked).map(([v]) => v), ...f.legacyFeats],
      codigoUnico: vehicle?.codigoUnico || '',
    };

    saveBtn.disabled = true; saveBtn.textContent = 'Guardando…';
    try {
      let derived;
      if (store.get().mock) {
        const id = isEdit ? vehicle.id : getNextId(vehicles);
        const built = buildVehicleDoc(formState, { id, codigoUnico: vehicle?.codigoUnico || 'ALT-DEMO-' + String(id).padStart(4, '0'), existing: vehicle, who });
        derived = built.derived;
        onDone && onDone({ ...built.doc, _docId: String(id), _version: isEdit ? (vehicle._version || 0) + 1 : 1 });
      } else if (isEdit) {
        const built = buildVehicleDoc(formState, { id: vehicle.id, existing: vehicle, who });
        derived = built.derived;
        await updateVehicle(built.doc, vehicle.id, vehicle._version || 0, vehicle);
      } else {
        const candidateId = getNextId(vehicles);
        const code = await generateUniqueCode();
        const built = buildVehicleDoc(formState, { id: candidateId, codigoUnico: code, who });
        derived = built.derived;
        await createVehicle(built.doc, candidateId);
      }
      discardCurrentDraft(); // publicar con éxito borra el borrador en curso
      close();
      toast(isEdit ? '✓ Vehículo actualizado' : '✓ Vehículo publicado — la web lo recoge sola', 'ok');
      if (derived && derived.length) toast('✨ ' + derived.map(formatSuggestion).join(' · '), 'info');
    } catch (e) {
      saveBtn.disabled = false; saveBtn.textContent = isEdit ? 'Guardar cambios' : 'Publicar vehículo';
      toast('No se pudo guardar: ' + (e.message || e.code), 'error');
    }
  });

  /* ── modal ── */
  const body = el('div', { class: 'veh-wiz__body' }, SECTIONS);
  const card = el('div', { class: 'modal veh-wiz' }, [
    el('div', { class: 'modal__head' }, [
      el('h2', { class: 'modal__title', text: isEdit ? 'Editar: ' + (vehicle.modelo || vehicle.id) : (draft ? '📝 Borrador' : '🚗 Nuevo vehículo') }),
      progress,
    ]),
    stepsBar, body,
    el('div', { class: 'veh-wiz__foot' }, [prevBtn, nextBtn, el('span', { style: { flex: '1' } }), draftBtn, cancelBtn, saveBtn]),
  ]);
  const overlay = el('div', { class: 'modal-overlay' }, [card]);
  const close = () => { overlay.remove(); window.removeEventListener('keydown', onKey); };

  /* Cierre con cambios (§108): igual a CUALQUIERA de los dos baselines
   * (último guardado / apertura) → cierra sin preguntar; con cambios →
   * modal Sí/No custom (el confirm() nativo no deja renombrar botones). */
  function requestClose() {
    const snap = getSnapshot();
    if (!snapshotHasAnyData(snap)
      || (_lastSaved && !snapshotsAreDifferent(snap, _lastSaved))
      || (_original && !snapshotsAreDifferent(snap, _original))) { close(); return; }
    const yes = el('button', { class: 'btn btn--gold', type: 'button', text: 'Sí, guardar borrador' });
    const no = el('button', { class: 'btn btn--soft', type: 'button', text: 'No, descartar' });
    const ov2 = el('div', { class: 'rev-modal__overlay' }, [
      el('div', { class: 'rev-modal rev-modal--sm', role: 'alertdialog', 'aria-modal': 'true' }, [
        el('h3', { class: 'rev-modal__title', text: '¿Guardar lo que llevas como borrador?' }),
        el('div', { class: 'rev-modal__actions' }, [no, yes]),
      ]),
    ]);
    yes.addEventListener('click', () => { ov2.remove(); saveDraftNow(); close(); }); // optimista: cierra YA
    no.addEventListener('click', () => { ov2.remove(); close(); });
    ov2.addEventListener('click', (e) => { if (e.target === ov2) { ov2.remove(); close(); } });
    document.body.append(ov2);
  }
  const onKey = (e) => { if (e.key === 'Escape') requestClose(); };
  window.addEventListener('keydown', onKey);
  cancelBtn.addEventListener('click', requestClose);
  overlay.addEventListener('mousedown', (e) => { if (e.target === overlay) requestClose(); });
  document.body.append(overlay);
  if (draft) applyDraftSnapshot(draft.snap);
  _original = getSnapshot(); // baseline de apertura
  goTo(0);
}
