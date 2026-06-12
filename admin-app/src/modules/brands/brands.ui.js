// ============================================================
// Marcas (E6 fase ③ paso 1) — tercer módulo migrado. Grid de
// logos + alta/edición (docId = slug, fijo al editar) + borrado
// con doble confirmación que AVISA si hay vehículos usando la
// marca (mejora vs el clásico: borrar una marca con inventario
// deja huérfanos los filtros públicos). RBAC: brands.*.
// ============================================================

import { el, clear } from '../../core/dom.js';
import { store } from '../../core/store.js';
import { toast } from '../../core/toast.js';
import { hasPermission } from '../../core/auth.js';
import {
  MOCK_BRANDS, MOCK_COUNTS, subscribeBrands, fetchVehicleCounts,
  saveBrand, deleteBrand, uploadBrandLogo, getBrandLogoUrl, slugify,
} from './brands.data.js';

export function mountBrands(root) {
  const ui = { brands: [], counts: {}, sub: null, loaded: false };
  const canCreate = hasPermission('brands.create');
  const canEdit = hasPermission('brands.edit');
  const canDelete = hasPermission('brands.delete');

  const wrap = el('section', { class: 'brd' });
  clear(root); root.append(wrap);

  /* ── Modal alta/edición ─────────────────────────────────── */
  function openModal(brand) {
    const isEdit = !!brand;
    let logoUrl = (brand && brand.logo) || '';

    const nameIn = el('input', { class: 'input', type: 'text', maxlength: '40', placeholder: 'Nombre de la marca *' });
    const slugOut = el('span', { class: 'u-caption u-faint', text: isEdit ? 'ID: ' + brand.id + ' (fijo)' : 'ID: —' });
    if (isEdit) nameIn.value = brand.nombre || '';
    else nameIn.addEventListener('input', () => { slugOut.textContent = 'ID: ' + (slugify(nameIn.value) || '—'); });

    const fileInput = el('input', { type: 'file', accept: 'image/jpeg,image/png,image/webp,image/svg+xml', class: 'ban-file' });
    const drop = el('div', { class: 'ban-drop brd-drop' });
    const status = el('span', { class: 'u-caption u-muted', text: '' });
    function renderDrop() {
      clear(drop);
      const url = logoUrl ? getBrandLogoUrl({ id: isEdit ? brand.id : slugify(nameIn.value), nombre: nameIn.value, logo: logoUrl }) : '';
      if (url && url !== 'data:demo') {
        drop.append(el('img', { src: url, alt: 'Logo', class: 'brd-drop__img' }),
          el('span', { class: 'u-caption u-muted', text: 'Click para cambiar el logo' }));
      } else if (logoUrl === 'data:demo') {
        drop.append(el('span', { text: '🏷️ (demo)' }));
      } else {
        drop.append(el('span', { text: '🏷️' }),
          el('span', { class: 'u-caption u-muted', text: 'Click para subir logo (JPG/PNG/WebP/SVG → WebP 512px)' }));
      }
    }
    renderDrop();
    drop.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', async () => {
      const file = fileInput.files && fileInput.files[0];
      fileInput.value = '';
      if (!file) return;
      if (store.get().mock) { logoUrl = 'data:demo'; renderDrop(); toast('Logo simulado (demo)', 'ok'); return; }
      try {
        logoUrl = await uploadBrandLogo(file, (s) => { status.textContent = s; });
        status.textContent = '✓ Logo subido';
        renderDrop();
      } catch (e) {
        status.textContent = '';
        toast(e.message || 'No se pudo subir el logo.', 'error');
      }
    });

    const saveBtn = el('button', { class: 'btn btn--gold', type: 'button', text: isEdit ? 'Guardar cambios' : 'Crear marca' });
    const cancelBtn = el('button', { class: 'btn btn--soft', type: 'button', text: 'Cancelar' });
    const overlay = el('div', { class: 'rev-modal__overlay' }, [
      el('div', { class: 'rev-modal rev-modal--sm', role: 'dialog', 'aria-modal': 'true' }, [
        el('h3', { class: 'rev-modal__title', text: isEdit ? 'Editar marca: ' + brand.nombre : 'Nueva marca' }),
        drop, fileInput, status,
        el('label', { class: 'field' }, [el('span', { class: 'field__label', text: 'Nombre *' }), nameIn, slugOut]),
        el('div', { class: 'rev-modal__actions' }, [cancelBtn, saveBtn]),
      ]),
    ]);
    const close = () => overlay.remove();
    cancelBtn.addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

    saveBtn.addEventListener('click', async () => {
      const nombre = nameIn.value.trim();
      if (!nombre) { toast('El nombre es obligatorio.', 'error'); return; }
      if (!isEdit && ui.brands.some((b) => b.id === slugify(nombre))) {
        toast('Ya existe una marca con ese ID (' + slugify(nombre) + ').', 'error'); return;
      }
      const fields = { nombre, logo: logoUrl, _userEmail: (store.get().user && store.get().user.email) || 'unknown' };
      if (store.get().mock) {
        if (isEdit) {
          const i = ui.brands.findIndex((b) => b._docId === brand._docId);
          if (i >= 0) ui.brands[i] = { ...ui.brands[i], nombre, logo: logoUrl, _version: (ui.brands[i]._version || 0) + 1 };
        } else {
          const id = slugify(nombre);
          ui.brands.push({ _docId: id, id, nombre, logo: logoUrl, _version: 1 });
          ui.brands.sort((a, b) => a.nombre.localeCompare(b.nombre));
        }
        render(); close(); toast(isEdit ? 'Marca actualizada (demo)' : 'Marca creada (demo)', 'ok');
        return;
      }
      saveBtn.disabled = true; saveBtn.textContent = 'Guardando…';
      try {
        await saveBrand(isEdit ? brand._docId : null, fields, brand);
        close(); toast(isEdit ? '✓ Marca actualizada' : '✓ Marca creada', 'ok');
      } catch (e) {
        saveBtn.disabled = false; saveBtn.textContent = isEdit ? 'Guardar cambios' : 'Crear marca';
        toast('No se pudo guardar: ' + (e.message || e.code), 'error');
      }
    });

    document.body.append(overlay);
    nameIn.focus();
  }

  /* ── Borrado (avisa si hay vehículos con la marca) ──────── */
  function confirmDelete(brand) {
    const count = ui.counts[brand.id] || 0;
    const delBtn = el('button', { class: 'btn btn--danger', type: 'button', text: 'Eliminar definitivamente' });
    const cancelBtn = el('button', { class: 'btn btn--soft', type: 'button', text: 'Cancelar' });
    const overlay = el('div', { class: 'rev-modal__overlay' }, [
      el('div', { class: 'rev-modal rev-modal--sm', role: 'alertdialog', 'aria-modal': 'true' }, [
        el('h3', { class: 'rev-modal__title', text: '¿Eliminar la marca "' + brand.nombre + '"?' }),
        count > 0
          ? el('p', { class: 'u-caption brd-warn', text: `⚠️ Hay ${count} vehículo(s) con esta marca — sus filtros y página de marca quedarían huérfanos. Reasigna o vende esos vehículos antes de borrar.` })
          : el('p', { class: 'u-caption u-muted', text: 'Sin vehículos asociados. Desaparece de los filtros públicos al instante.' }),
        el('div', { class: 'rev-modal__actions' }, [cancelBtn, delBtn]),
      ]),
    ]);
    const close = () => overlay.remove();
    cancelBtn.addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    delBtn.addEventListener('click', async () => {
      if (store.get().mock) {
        ui.brands = ui.brands.filter((b) => b._docId !== brand._docId);
        render(); close(); toast('Marca eliminada (demo)', 'ok');
        return;
      }
      delBtn.disabled = true;
      try {
        await deleteBrand(brand);
        close(); toast('✓ Marca eliminada', 'ok');
      } catch (e) {
        delBtn.disabled = false;
        toast('No se pudo eliminar: ' + (e.message || e.code), 'error');
      }
    });
    document.body.append(overlay);
  }

  /* ── Render ─────────────────────────────────────────────── */
  function card(b) {
    const count = ui.counts[b.id] || 0;
    const logo = getBrandLogoUrl(b);
    const actions = [];
    if (canEdit) {
      const e1 = el('button', { class: 'btn btn--soft btn--sm', type: 'button', text: '✏️' , 'aria-label': 'Editar' });
      e1.addEventListener('click', () => openModal(b));
      actions.push(e1);
    }
    if (canDelete) {
      const d = el('button', { class: 'btn btn--soft btn--sm', type: 'button', text: '🗑', 'aria-label': 'Eliminar' });
      d.addEventListener('click', () => confirmDelete(b));
      actions.push(d);
    }
    return el('article', { class: 'brd-card' }, [
      el('div', { class: 'brd-card__logo' }, [
        logo && logo !== 'data:demo'
          ? el('img', { src: logo, alt: '', loading: 'lazy' })
          : el('span', { class: 'u-caption u-faint', text: 'Sin logo' }),
      ]),
      el('strong', { class: 'u-truncate', text: b.nombre }),
      el('span', { class: 'u-caption u-muted', text: count + (count === 1 ? ' vehículo' : ' vehículos') }),
      actions.length ? el('div', { class: 'brd-card__actions' }, actions) : null,
    ]);
  }

  function render() {
    clear(wrap);
    const newBtn = canCreate
      ? el('button', { class: 'btn btn--gold btn--sm', type: 'button', text: '＋ Nueva marca' })
      : null;
    if (newBtn) newBtn.addEventListener('click', () => openModal(null));
    wrap.append(el('div', { class: 'rev-head' }, [
      el('span', { class: 'u-caption u-muted', text: ui.brands.length + ' marcas — alimentan los filtros y páginas de marca del sitio.' }),
      newBtn,
    ]));
    if (!ui.loaded) {
      wrap.append(el('div', { class: 'state' }, [el('div', { class: 'state__msg', text: 'Cargando marcas…' })]));
      return;
    }
    if (!ui.brands.length) {
      wrap.append(el('div', { class: 'state' }, [
        el('div', { class: 'state__icon', text: '🏷️' }),
        el('div', { class: 'state__title', text: 'Sin marcas' }),
      ]));
      return;
    }
    wrap.append(el('div', { class: 'brd-grid' }, ui.brands.map(card)));
  }

  if (store.get().mock) {
    ui.brands = MOCK_BRANDS.map((b) => ({ ...b }));
    ui.counts = { ...MOCK_COUNTS };
    ui.loaded = true; render();
  } else {
    render();
    ui.sub = subscribeBrands(
      (list) => { ui.brands = list; ui.loaded = true; render(); },
      () => toast('No se pudieron cargar las marcas.', 'error'),
    );
    fetchVehicleCounts().then((c) => { ui.counts = c; if (ui.loaded) render(); }).catch(() => {});
  }

  return function cleanup() {
    if (ui.sub) ui.sub(); ui.sub = null;
  };
}
