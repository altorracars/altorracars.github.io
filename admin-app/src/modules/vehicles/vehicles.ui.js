// ============================================================
// Vehículos (etapa V1) — lista del inventario en el portal.
// Búsqueda + filtro por estado + badges (estado / oferta /
// destacado / días-en-stock ≥60) + destacar de un tap + borrado
// con doble confirmación. Crear/editar llegan con el wizard (V2)
// — sin botones muertos: la cabecera lo dice. RBAC: vehicles.*.
// ============================================================

import { el, clear, appendAll } from '../../core/dom.js';
import { store } from '../../core/store.js';
import { toast } from '../../core/toast.js';
import { hasPermission } from '../../core/auth.js';
import { ESTADO_LABELS, TIPO_LABELS, daysInStock, formatPrecio, toTitleCase } from '../../domain/vehicle.js';
import { subscribeBrands, MOCK_BRANDS } from '../brands/brands.data.js';
import {
  subscribeVehicles, toggleDestacado, deleteVehicle, sortVehicles, MOCK_VEHICLES,
  subscribeDrafts, deleteDraftDoc, mockDrafts,
  saveReorder, exportVehiclesCSV, fetchVehicleAudit, revertAuditEntry,
} from './vehicles.data.js';
import { openVehicleWizard } from './wizard.js';

/* Tiempo relativo legible para la galería de borradores (TODO-24). */
function relTimeDraft(iso) {
  const t = Date.parse(iso);
  if (isNaN(t)) return String(iso).slice(0, 16).replace('T', ' ');
  const m = Math.round((Date.now() - t) / 60000);
  if (m < 1) return 'hace un momento';
  if (m < 60) return 'hace ' + m + ' min';
  const h = Math.round(m / 60);
  if (h < 24) return 'hace ' + h + ' h';
  return 'hace ' + Math.round(h / 24) + ' d';
}

export function mountVehicles(root) {
  const ui = { vehicles: [], drafts: [], brandNames: {}, brands: [], q: '', estado: '', sub: null, subBrands: null, subDrafts: null, loaded: false };
  const canEdit = hasPermission('vehicles.edit') || hasPermission('vehicles.create');
  const canDelete = hasPermission('vehicles.delete');

  const isSuper = () => (store.get().permissions || []).includes('*');
  let reorderMode = false;
  let reorderList = [];

  const wrap = el('section', { class: 'veh' });
  clear(root); root.append(wrap);

  /* ── V5: duplicar = wizard de CREACIÓN prefilled (estado explícito,
     sin el setTimeout frágil del clásico). Limpia id/código/placa/
     estado/prioridad como el clásico. ── */
  function duplicateVehicle(v) {
    const snap = {
      vId: '', vMarca: v.marca || '', vModelo: v.modelo || '', vYear: String(v.year || ''),
      vTipo: v.tipo || '', vCategoria: v.categoria || '', vPrecio: String(v.precio || ''),
      vPrecioOferta: v.precioOferta ? String(v.precioOferta) : '', vKm: String(v.kilometraje ?? ''),
      vTransmision: v.transmision || '', vCombustible: v.combustible || '', vMotor: v.motor || '',
      vPotencia: v.potencia || '', vCilindraje: v.cilindraje || '', vTraccion: v.traccion || '',
      vDireccion: v.direccion || 'Electrica', vColor: v.color || '',
      vPuertas: String(v.puertas ?? 5), vPasajeros: String(v.pasajeros ?? 5),
      vUbicacion: v.ubicacion || 'Cartagena', vPlaca: '', vFasecolda: v.codigoFasecolda === 'Consultar' ? '' : (v.codigoFasecolda || ''),
      vEstado: 'disponible', vPrioridad: '0', vFeaturedOrder: '', vFeaturedTag: '',
      vConcesionario: v.concesionario || '', vConsignaParticular: v.consignaParticular || '',
      vDestacado: false, vOferta: !!v.precioOferta, vFeaturedWeek: false,
      vRevision: v.revisionTecnica !== false, vPeritaje: v.peritaje !== false,
      vCaracteristicas: (v.caracteristicas || []).join('\n'),
      _images: (v.imagenes || []).filter((u) => u && u.indexOf('placeholder') < 0), // URLs COMPARTIDAS (by-design)
      _savedAt: new Date().toISOString(),
    };
    openWizard(null, { id: null, snap });
  }

  /* ── V5: historial de auditoría (timeline + revert solo super) ── */
  async function openAudit(v) {
    const body = el('div', { class: 'veh-audit' }, [el('span', { class: 'u-caption u-muted', text: 'Cargando historial…' })]);
    const closeBtn = el('button', { class: 'btn btn--soft', type: 'button', text: 'Cerrar' });
    const overlay = el('div', { class: 'rev-modal__overlay' }, [
      el('div', { class: 'rev-modal', role: 'dialog', 'aria-modal': 'true' }, [
        el('h3', { class: 'rev-modal__title', text: '🕘 Historial: ' + [brandName(v), v.modelo].filter(Boolean).join(' ') }),
        body,
        el('div', { class: 'rev-modal__actions' }, [closeBtn]),
      ]),
    ]);
    const close = () => overlay.remove();
    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    document.body.append(overlay);
    if (store.get().mock) {
      body.replaceChildren(el('span', { class: 'u-caption u-muted', text: 'En demo no hay historial.' }));
      return;
    }
    let entries;
    try { entries = await fetchVehicleAudit(v._docId); }
    catch (e) { body.replaceChildren(el('span', { class: 'u-caption lst-warn', text: 'No se pudo cargar el historial.' })); return; }
    clear(body);
    if (!entries.length) { body.append(el('span', { class: 'u-caption u-muted', text: 'Sin movimientos registrados.' })); return; }
    const ACTION_LABELS = { created: '✨ Creado', edited: '✏️ Editado', deleted: '🗑 Eliminado', featured: '★ Destacado', sold: '💰 Vendido', reverted: '↩ Revertido' };
    entries.forEach((entry) => {
      const when = entry.timestamp ? new Date(entry.timestamp).toLocaleString('es-CO') : '';
      const row = el('div', { class: 'veh-audit__row' }, [
        el('div', {}, [
          el('strong', { text: ACTION_LABELS[entry.action] || entry.action }),
          el('span', { class: 'u-caption u-muted', text: ' · ' + (entry.userName || entry.user || '') + ' · ' + when }),
        ]),
        (entry.changes || []).length
          ? el('div', { class: 'u-caption u-faint', text: entry.changes.map((c) => c.field + ': ' + (c.from ?? '—') + ' → ' + (c.to ?? '—')).join(' · ').slice(0, 300) })
          : null,
      ]);
      if (entry.action === 'edited' && isSuper()) {
        const rv = el('button', { class: 'btn btn--soft btn--sm', type: 'button', text: '↩ Revertir' });
        rv.addEventListener('click', async () => {
          if (!window.confirm('¿Revertir estos cambios? Se restauran los valores anteriores.')) return;
          rv.disabled = true;
          try { await revertAuditEntry(v, entry); close(); toast('↩ Cambios revertidos', 'ok'); }
          catch (e) { rv.disabled = false; toast('No se pudo revertir: ' + (e.message || e.code), 'error'); }
        });
        row.append(rv);
      }
      body.append(row);
    });
  }

  /* ── Borrado (doble confirmación con consecuencias públicas) ── */
  function confirmDelete(v) {
    const label = [brandName(v), v.modelo, v.year].filter(Boolean).join(' ');
    const delBtn = el('button', { class: 'btn btn--danger', type: 'button', text: 'Eliminar definitivamente' });
    const cancelBtn = el('button', { class: 'btn btn--soft', type: 'button', text: 'Cancelar' });
    const overlay = el('div', { class: 'rev-modal__overlay' }, [
      el('div', { class: 'rev-modal rev-modal--sm', role: 'alertdialog', 'aria-modal': 'true' }, [
        el('h3', { class: 'rev-modal__title', text: '¿Eliminar "' + label + '"?' }),
        el('p', { class: 'u-caption lst-warn', text: '⚠️ Desaparece del catálogo al instante y deja de aparecer en el sitio web poco después. Si solo salió de circulación, cambia su estado en lugar de eliminarlo.' }),
        el('p', { class: 'u-caption u-muted', text: 'Las fotos y el historial de auditoría se conservan.' }),
        el('div', { class: 'rev-modal__actions' }, [cancelBtn, delBtn]),
      ]),
    ]);
    const close = () => overlay.remove();
    cancelBtn.addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    delBtn.addEventListener('click', async () => {
      if (store.get().mock) {
        ui.vehicles = ui.vehicles.filter((x) => x._docId !== v._docId);
        close(); render(); toast('Vehículo eliminado (demo)', 'ok');
        return;
      }
      delBtn.disabled = true;
      try {
        await deleteVehicle(v);
        close(); toast('✓ Vehículo eliminado', 'ok');
      } catch (e) {
        delBtn.disabled = false;
        toast('No se pudo eliminar: ' + (e.message || e.code), 'error');
      }
    });
    document.body.append(overlay);
  }

  /* ── Fila ───────────────────────────────────────────────── */
  const brandName = (v) => ui.brandNames[v.marca] || toTitleCase(v.marca) || '—';

  function estadoBadge(v) {
    const estado = v.estado || 'disponible';
    return el('span', { class: 'veh-badge veh-badge--' + estado, text: ESTADO_LABELS[estado] || estado });
  }

  function stockBadge(v) {
    if ((v.estado || 'disponible') !== 'disponible') return null;
    const d = daysInStock(v);
    if (d === null) return null;
    if (d >= 90) return el('span', { class: 'veh-stock is-crit', text: '🔴 ' + d + ' días en stock' });
    if (d >= 60) return el('span', { class: 'veh-stock is-warn', text: '⚠️ ' + d + ' días en stock' });
    return el('span', { class: 'veh-stock u-caption u-faint', text: d + ' días' });
  }

  /* ── V5: modo reordenar (§103: lista GLOBAL, ignora filtros) ── */
  function startReorder() { reorderMode = true; reorderList = sortVehicles(ui.vehicles); render(); }
  function cancelReorder() { reorderMode = false; render(); }
  async function commitReorder() {
    if (store.get().mock) {
      reorderList.forEach((v, idx) => { v.prioridad = (reorderList.length - idx) * 10; });
      ui.vehicles = sortVehicles(ui.vehicles);
      reorderMode = false; render(); toast('✓ Orden guardado (demo)', 'ok');
      return;
    }
    try {
      const n = await saveReorder(reorderList);
      reorderMode = false; render();
      toast('✓ Orden guardado (' + n + ' posiciones actualizadas)', 'ok');
    } catch (e) { toast('No se pudo guardar el orden: ' + (e.message || e.code), 'error'); }
  }
  function reorderRow(v, idx) {
    const up = el('button', { class: 'btn btn--soft btn--sm', type: 'button', text: '↑', disabled: idx === 0, 'aria-label': 'Subir' });
    up.addEventListener('click', () => { reorderList.splice(idx - 1, 0, reorderList.splice(idx, 1)[0]); renderList(); });
    const down = el('button', { class: 'btn btn--soft btn--sm', type: 'button', text: '↓', disabled: idx === reorderList.length - 1, 'aria-label': 'Bajar' });
    down.addEventListener('click', () => { reorderList.splice(idx + 1, 0, reorderList.splice(idx, 1)[0]); renderList(); });
    return el('article', { class: 'veh-row' }, [
      el('span', { class: 'u-caption u-faint veh-row__pos', text: String(idx + 1) }),
      el('div', { class: 'veh-row__main' }, [
        el('strong', { text: [brandName(v), v.modelo, v.year].filter(Boolean).join(' ') }),
        el('span', { class: 'u-caption u-muted', text: (v.codigoUnico || '') + ' · prioridad ' + (v.prioridad || 0) }),
      ]),
      el('div', { class: 'u-row u-row--tight' }, [up, down]),
    ]);
  }

  function row(v) {
    const thumb = el('div', { class: 'veh-row__thumb' }, [
      v.imagen && v.imagen.indexOf('placeholder') < 0
        ? el('img', { src: v.imagen, alt: '', loading: 'lazy' })
        : el('span', { text: '🚗' }),
    ]);

    const precio = el('div', { class: 'veh-row__price' },
      v.precioOferta && v.precioOferta < v.precio
        ? [el('strong', { text: formatPrecio(v.precioOferta) }),
           el('s', { class: 'u-caption u-faint', text: formatPrecio(v.precio) })]
        : [el('strong', { text: formatPrecio(v.precio) })]);

    const actions = [];
    if (canEdit) {
      const e1 = el('button', { class: 'btn btn--soft btn--sm', type: 'button', text: '✏️', 'aria-label': 'Editar' });
      e1.addEventListener('click', () => openWizard(v));
      actions.push(e1);
      const dup = el('button', { class: 'btn btn--soft btn--sm', type: 'button', text: '📋', 'aria-label': 'Duplicar', title: 'Duplicar como nuevo' });
      dup.addEventListener('click', () => duplicateVehicle(v));
      actions.push(dup);
    }
    {
      const h = el('button', { class: 'btn btn--soft btn--sm', type: 'button', text: '🕘', 'aria-label': 'Historial' });
      h.addEventListener('click', () => openAudit(v));
      actions.push(h);
    }
    if (canEdit) {
      const star = el('button', {
        class: 'veh-star' + (v.destacado ? ' is-on' : ''), type: 'button',
        'aria-label': v.destacado ? 'Quitar de destacados' : 'Destacar',
        title: v.destacado ? 'Quitar de destacados' : 'Destacar en el home',
        text: v.destacado ? '★' : '☆',
      });
      star.addEventListener('click', async () => {
        if (store.get().mock) {
          v.destacado = !v.destacado; v.featuredWeek = v.destacado;
          render(); toast(v.destacado ? 'Destacado (demo)' : 'Quitado (demo)', 'ok');
          return;
        }
        star.disabled = true;
        try { await toggleDestacado(v); toast(v.destacado ? '✓ Quitado de destacados' : '✓ Destacado', 'ok'); }
        catch (e) { star.disabled = false; toast('No se pudo: ' + (e.message || e.code), 'error'); }
      });
      actions.push(star);
    }
    if (canDelete) {
      const d = el('button', { class: 'btn btn--soft btn--sm', type: 'button', text: '🗑', 'aria-label': 'Eliminar' });
      d.addEventListener('click', () => confirmDelete(v));
      actions.push(d);
    }

    return el('article', { class: 'veh-row' }, [
      thumb,
      el('div', { class: 'veh-row__main' }, [
        el('div', { class: 'veh-row__title' }, [
          el('strong', { text: [brandName(v), v.modelo].filter(Boolean).join(' ') }),
          el('span', { class: 'u-caption u-muted', text: String(v.year || '') }),
          v.oferta || (v.precioOferta && v.precioOferta < v.precio)
            ? el('span', { class: 'veh-badge veh-badge--oferta', text: 'Oferta' }) : null,
        ]),
        el('div', { class: 'veh-row__meta u-caption u-muted' }, [
          [v.codigoUnico, TIPO_LABELS[v.tipo] || v.tipo,
           (Number(v.kilometraje) || 0).toLocaleString('es-CO') + ' km', v.color]
            .filter(Boolean).join(' · '),
        ]),
        stockBadge(v),
      ]),
      precio,
      estadoBadge(v),
      actions.length ? el('div', { class: 'veh-row__actions' }, actions) : null,
    ]);
  }

  /* ── Render ─────────────────────────────────────────────── */
  function filtered() {
    const q = ui.q.trim().toLowerCase();
    return ui.vehicles.filter((v) => {
      if (ui.estado && (v.estado || 'disponible') !== ui.estado) return false;
      if (!q) return true;
      return [brandName(v), v.marca, v.modelo, v.codigoUnico, v.placa, String(v.year || '')]
        .join(' ').toLowerCase().includes(q);
    });
  }

  /* ── Wizard (V2): crear / editar / retomar borrador (V4) ── */
  function openWizard(vehicle, draft) {
    openVehicleWizard({
      vehicle, draft,
      vehicles: ui.vehicles,
      brandNames: ui.brandNames,
      brands: ui.brands,
      onDraftsChange: () => { if (store.get().mock) { ui.drafts = mockDrafts.slice(); render(); } },
      onDone: (mockDoc) => { // solo demo: lo real llega por onSnapshot
        const i = ui.vehicles.findIndex((x) => x._docId === mockDoc._docId);
        if (i >= 0) ui.vehicles[i] = mockDoc; else ui.vehicles.push(mockDoc);
        ui.vehicles = sortVehicles(ui.vehicles);
        ui.drafts = store.get().mock ? mockDrafts.slice() : ui.drafts;
        render();
      },
    });
  }

  /* ── Panel de borradores (V4 — galería §107) ── */
  function draftsPanel() {
    if (!ui.drafts.length) return null;
    const rows = ui.drafts.map((d) => {
      const label = [d.vMarca && (ui.brandNames[d.vMarca] || toTitleCase(d.vMarca)), d.vModelo, d.vYear].filter(Boolean).join(' ') || 'Sin título';
      const sub = d.vId ? 'Editando #' + d.vId : 'Nuevo vehículo';
      const resume = el('button', { class: 'btn btn--gold btn--sm', type: 'button', text: 'Retomar' });
      resume.addEventListener('click', () => {
        let vehicle = null;
        if (d.vId) {
          vehicle = ui.vehicles.find((v) => String(v.id) === String(d.vId)) || null;
          if (!vehicle) toast('El vehículo #' + d.vId + ' ya no existe — el borrador se abre como nuevo.', 'info');
        }
        openWizard(vehicle, { id: d._draftId, snap: d });
      });
      const del = el('button', { class: 'btn btn--soft btn--sm', type: 'button', text: '🗑', 'aria-label': 'Eliminar borrador' });
      const doDelete = async () => {
        const idx = ui.drafts.findIndex((x) => x._draftId === d._draftId);
        if (idx < 0) return;
        const removed = ui.drafts.splice(idx, 1)[0]; // OPTIMISTA (§110)
        render();
        if (store.get().mock) {
          const mi = mockDrafts.findIndex((x) => x._draftId === d._draftId);
          if (mi >= 0) mockDrafts.splice(mi, 1);
          toast('Borrador eliminado (demo)', 'ok');
          return;
        }
        try {
          await deleteDraftDoc((store.get().user || {}).uid, d._draftId);
          toast('✓ Borrador eliminado', 'ok');
        } catch (e) {
          ui.drafts.splice(idx, 0, removed); render(); // rollback (§110)
          toast('No se pudo eliminar: ' + (e.message || e.code), 'error');
        }
      };
      // Modal custom (consistencia pro; reemplaza el window.confirm nativo — TODO-24)
      del.addEventListener('click', () => {
        const yes = el('button', { class: 'btn btn--danger', type: 'button', text: 'Eliminar' });
        const no = el('button', { class: 'btn btn--soft', type: 'button', text: 'Cancelar' });
        const ov = el('div', { class: 'rev-modal__overlay' }, [
          el('div', { class: 'rev-modal rev-modal--sm', role: 'alertdialog', 'aria-modal': 'true' }, [
            el('h3', { class: 'rev-modal__title', text: '¿Eliminar el borrador "' + label + '"?' }),
            el('div', { class: 'rev-modal__actions' }, [no, yes]),
          ]),
        ]);
        const closeOv = () => ov.remove();
        no.addEventListener('click', closeOv);
        ov.addEventListener('click', (e) => { if (e.target === ov) closeOv(); });
        yes.addEventListener('click', () => { closeOv(); doDelete(); });
        document.body.append(ov);
      });
      const thumbUrl = (d._images && d._images[0]) || '';
      const thumb = thumbUrl
        ? el('img', { class: 'veh-draft__thumb', src: thumbUrl, alt: '', loading: 'lazy', decoding: 'async' })
        : el('div', { class: 'veh-draft__thumb' });
      const missing = [];
      if (!d.vModelo) missing.push('modelo');
      if (!d.vPrecio) missing.push('precio');
      if (!(d._images && d._images.length)) missing.push('fotos');
      const hint = missing.length ? ('Falta: ' + missing.join(' · ')) : '✓ Listo para publicar';
      return el('div', { class: 'veh-draft' }, [
        el('div', { class: 'u-row u-row--tight veh-draft__lead' }, [
          thumb,
          el('div', { class: 'veh-draft__meta' }, [
            el('strong', { text: label }),
            el('span', { class: 'u-caption u-muted', text: sub + (d._savedAt ? ' · ' + relTimeDraft(d._savedAt) : '') }),
            el('span', { class: 'u-caption ' + (missing.length ? 'veh-draft__missing' : 'u-muted'), text: hint }),
          ]),
        ]),
        el('div', { class: 'u-row u-row--tight' }, [resume, del]),
      ]);
    });
    return el('div', { class: 'veh-drafts' }, [
      el('strong', { class: 'u-caption', text: '📝 Borradores (' + ui.drafts.length + ')' }),
      ...rows,
    ]);
  }

  function render() {
    clear(wrap);
    const search = el('input', { class: 'input veh-search', type: 'search', placeholder: 'Buscar por marca, modelo, código o placa…', value: ui.q });
    search.addEventListener('input', () => { ui.q = search.value; renderList(); });
    const estadoSel = el('select', { class: 'select' }, [
      el('option', { value: '', text: 'Todos los estados' }),
      ...Object.entries(ESTADO_LABELS).map(([v2, l]) => el('option', { value: v2, text: l })),
    ]);
    estadoSel.value = ui.estado;
    estadoSel.addEventListener('change', () => { ui.estado = estadoSel.value; renderList(); });

    if (reorderMode) {
      const saveOrd = el('button', { class: 'btn btn--gold btn--sm', type: 'button', text: '✓ Guardar orden' });
      saveOrd.addEventListener('click', commitReorder);
      const cancelOrd = el('button', { class: 'btn btn--soft btn--sm', type: 'button', text: 'Cancelar' });
      cancelOrd.addEventListener('click', cancelReorder);
      wrap.append(
        el('div', { class: 'rev-head' }, [
          el('span', { class: 'u-caption u-muted', text: '⇅ Reordenando el catálogo COMPLETO (los filtros no aplican). El orden manda sobre la web pública.' }),
          el('div', { class: 'u-row u-row--tight' }, [cancelOrd, saveOrd]),
        ]),
        listRoot,
      );
      renderList();
      return;
    }
    const canCreate = hasPermission('vehicles.create');
    const headBtns = [];
    if (canEdit || hasPermission('vehicles.export')) {
      const csv = el('button', { class: 'btn btn--soft btn--sm', type: 'button', text: '⬇ CSV' });
      csv.addEventListener('click', async () => {
        let dealerNames = null;
        if (!store.get().mock) {
          try {
            const { fetchConcesionarios } = await import('./vehicles.data.js');
            dealerNames = Object.fromEntries((await fetchConcesionarios()).map((d) => [d.id, d.nombre]));
          } catch (e) { dealerNames = null; }
        }
        exportVehiclesCSV(ui.vehicles, dealerNames);
        toast('✓ CSV exportado', 'ok');
      });
      headBtns.push(csv);
    }
    if (canEdit && ui.vehicles.length > 1) {
      const ord = el('button', { class: 'btn btn--soft btn--sm', type: 'button', text: '⇅ Reordenar' });
      ord.addEventListener('click', startReorder);
      headBtns.push(ord);
    }
    if (canCreate) {
      const newBtn = el('button', { class: 'btn btn--gold btn--sm', type: 'button', text: '＋ Nuevo vehículo' });
      newBtn.addEventListener('click', () => openWizard(null));
      headBtns.push(newBtn);
    }

    const n = ui.vehicles.length;
    appendAll(wrap, [
      el('div', { class: 'rev-head' }, [
        el('span', { class: 'u-caption u-muted', text: n + (n === 1 ? ' vehículo en el catálogo' : ' vehículos en el catálogo') }),
        el('div', { class: 'u-row u-row--tight' }, headBtns),
      ]),
      draftsPanel(),
      el('div', { class: 'veh-filters' }, [search, estadoSel]),
      listRoot,
    ]);
    renderList();
  }

  const listRoot = el('div', { class: 'veh-list' });
  function renderList() {
    clear(listRoot);
    if (reorderMode) {
      reorderList.forEach((v, idx) => listRoot.append(reorderRow(v, idx)));
      return;
    }
    if (!ui.loaded) {
      listRoot.append(el('div', { class: 'state' }, [el('div', { class: 'state__msg', text: 'Cargando inventario…' })]));
      return;
    }
    const list = filtered();
    if (!list.length) {
      listRoot.append(el('div', { class: 'state' }, [
        el('div', { class: 'state__icon', text: '🚗' }),
        el('div', { class: 'state__title', text: ui.vehicles.length ? 'Nada coincide con el filtro' : 'Inventario vacío' }),
      ]));
      return;
    }
    list.forEach((v) => listRoot.append(row(v)));
  }

  if (store.get().mock) {
    ui.vehicles = MOCK_VEHICLES.map((v) => ({ ...v }));
    ui.drafts = mockDrafts.slice();
    ui.brands = MOCK_BRANDS;
    ui.brandNames = Object.fromEntries(MOCK_BRANDS.map((b) => [b.id, b.nombre]));
    ui.loaded = true; render();
  } else {
    render();
    ui.sub = subscribeVehicles(
      (list) => { ui.vehicles = list; ui.loaded = true; render(); },
      () => toast('No se pudo cargar el inventario.', 'error'),
    );
    ui.subBrands = subscribeBrands(
      (list) => {
        ui.brands = list;
        ui.brandNames = Object.fromEntries(list.map((b) => [b.id, b.nombre]));
        if (ui.loaded) render();
      },
      () => {},
    );
  }

  if (!store.get().mock && canEdit && (store.get().user || {}).uid) {
    // §112: el cleanup por ruta del portal corre solo al CAMBIAR de módulo
    // (mountRoute guard name===mountedRoute) — sin riesgo de doble-disparo.
    ui.subDrafts = subscribeDrafts((store.get().user || {}).uid,
      (list) => { ui.drafts = list; if (ui.loaded) render(); },
      () => {});
  }

  return function cleanup() {
    if (ui.sub) ui.sub(); ui.sub = null;
    if (ui.subBrands) ui.subBrands(); ui.subBrands = null;
    if (ui.subDrafts) ui.subDrafts(); ui.subDrafts = null;
  };
}
