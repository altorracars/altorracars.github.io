// ============================================================
// Vehículos (etapa V1) — lista del inventario en el portal.
// Búsqueda + filtro por estado + badges (estado / oferta /
// destacado / días-en-stock ≥60) + destacar de un tap + borrado
// con doble confirmación. Crear/editar llegan con el wizard (V2)
// — sin botones muertos: la cabecera lo dice. RBAC: vehicles.*.
// ============================================================

import { el, clear } from '../../core/dom.js';
import { store } from '../../core/store.js';
import { toast } from '../../core/toast.js';
import { hasPermission } from '../../core/auth.js';
import { ESTADO_LABELS, TIPO_LABELS, daysInStock, formatPrecio, toTitleCase } from '../../domain/vehicle.js';
import { subscribeBrands, MOCK_BRANDS } from '../brands/brands.data.js';
import { subscribeVehicles, toggleDestacado, deleteVehicle, sortVehicles, MOCK_VEHICLES } from './vehicles.data.js';
import { openVehicleWizard } from './wizard.js';

export function mountVehicles(root) {
  const ui = { vehicles: [], brandNames: {}, brands: [], q: '', estado: '', sub: null, subBrands: null, loaded: false };
  const canEdit = hasPermission('vehicles.edit') || hasPermission('vehicles.create');
  const canDelete = hasPermission('vehicles.delete');

  const wrap = el('section', { class: 'veh' });
  clear(root); root.append(wrap);

  /* ── Borrado (doble confirmación con consecuencias públicas) ── */
  function confirmDelete(v) {
    const label = [brandName(v), v.modelo, v.year].filter(Boolean).join(' ');
    const delBtn = el('button', { class: 'btn btn--danger', type: 'button', text: 'Eliminar definitivamente' });
    const cancelBtn = el('button', { class: 'btn btn--soft', type: 'button', text: 'Cancelar' });
    const overlay = el('div', { class: 'rev-modal__overlay' }, [
      el('div', { class: 'rev-modal rev-modal--sm', role: 'alertdialog', 'aria-modal': 'true' }, [
        el('h3', { class: 'rev-modal__title', text: '¿Eliminar "' + label + '"?' }),
        el('p', { class: 'u-caption lst-warn', text: '⚠️ Desaparece del catálogo al instante; su página pública muere en la próxima corrida del generador (máx 4h). Si solo salió de circulación, usa el estado en su lugar.' }),
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

  /* ── Wizard (V2): crear / editar ── */
  function openWizard(vehicle) {
    openVehicleWizard({
      vehicle,
      vehicles: ui.vehicles,
      brandNames: ui.brandNames,
      brands: ui.brands,
      onDone: (mockDoc) => { // solo demo: lo real llega por onSnapshot
        const i = ui.vehicles.findIndex((x) => x._docId === mockDoc._docId);
        if (i >= 0) ui.vehicles[i] = mockDoc; else ui.vehicles.push(mockDoc);
        ui.vehicles = sortVehicles(ui.vehicles);
        render();
      },
    });
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

    const canCreate = hasPermission('vehicles.create');
    const newBtn = canCreate
      ? el('button', { class: 'btn btn--gold btn--sm', type: 'button', text: '＋ Nuevo vehículo' })
      : null;
    if (newBtn) newBtn.addEventListener('click', () => openWizard(null));

    wrap.append(
      el('div', { class: 'rev-head' }, [
        el('span', { class: 'u-caption u-muted', text: ui.vehicles.length + ' vehículos — alimentan el catálogo público y sus páginas (el generador corre cada 4h).' }),
        newBtn,
      ]),
      el('div', { class: 'veh-filters' }, [search, estadoSel]),
      listRoot,
    );
    renderList();
  }

  const listRoot = el('div', { class: 'veh-list' });
  function renderList() {
    clear(listRoot);
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

  return function cleanup() {
    if (ui.sub) ui.sub(); ui.sub = null;
    if (ui.subBrands) ui.subBrands(); ui.subBrands = null;
  };
}
