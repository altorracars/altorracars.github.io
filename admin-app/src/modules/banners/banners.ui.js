// ============================================================
// Banners (E6 fase ②, ADR §188 paso 2) — segundo módulo del sitio
// público en el portal. Dos grupos (las 2 posiciones con lector
// público), alta/edición con upload WebP a Storage, activar/pausar
// de un tap y borrado con doble confirmación. RBAC espejo:
// banners.create/edit/delete.
// ============================================================

import { el, clear } from '../../core/dom.js';
import { icon } from '../../core/icons.js';
import { store } from '../../core/store.js';
import { toast } from '../../core/toast.js';
import { hasPermission } from '../../core/auth.js';
import { friendlyError } from '../../core/errors.js';
import {
  POSITIONS, MOCK_BANNERS, subscribeBanners, saveBanner, toggleBannerActive,
  deleteBanner, uploadBannerImage,
} from './banners.data.js';

export function mountBanners(root) {
  const ui = { banners: [], sub: null, loaded: false };
  const canCreate = hasPermission('banners.create');
  const canEdit = hasPermission('banners.edit');
  const canDelete = hasPermission('banners.delete');

  const wrap = el('section', { class: 'ban' });
  clear(root); root.append(wrap);

  /* ── Modal alta/edición ─────────────────────────────────── */
  function openModal(banner) {
    const isEdit = !!banner;
    let imageUrl = (banner && banner.image) || '';

    const f = {
      title: el('input', { class: 'input', type: 'text', maxlength: '90', placeholder: 'Título *' }),
      subtitle: el('input', { class: 'input', type: 'text', maxlength: '140', placeholder: 'Subtítulo' }),
      position: el('select', { class: 'select' }, Object.entries(POSITIONS).map(([v, p]) =>
        el('option', { value: v, text: p.label }))),
      order: el('input', { class: 'input', type: 'number', min: '0', max: '99', value: '0' }),
      link: el('input', { class: 'input', type: 'text', maxlength: '200', placeholder: 'Enlace (ej: busqueda.html)' }),
      cta: el('input', { class: 'input', type: 'text', maxlength: '40', placeholder: 'Texto del botón' }),
      active: el('input', { type: 'checkbox' }),
      badge: el('input', { class: 'input', type: 'text', maxlength: '20', placeholder: 'Badge (ej: NUEVO)' }),
      eyebrow: el('input', { class: 'input', type: 'text', maxlength: '60', placeholder: 'Antetítulo' }),
      rateValue: el('input', { class: 'input', type: 'text', maxlength: '12', placeholder: 'Cifra (ej: 1.2%)' }),
      rateLabel: el('input', { class: 'input', type: 'text', maxlength: '40', placeholder: 'Etiqueta de la cifra' }),
      pills: [0, 1, 2].map((i) => el('input', { class: 'input', type: 'text', maxlength: '30', placeholder: 'Pill ' + (i + 1) })),
    };

    /* Upload */
    const fileInput = el('input', { type: 'file', accept: 'image/jpeg,image/png,image/webp', class: 'ban-file' });
    const preview = el('div', { class: 'ban-drop' });
    const status = el('span', { class: 'u-caption u-muted', text: '' });
    function renderPreview() {
      clear(preview);
      if (imageUrl) {
        preview.append(
          el('img', { src: imageUrl, alt: 'Vista previa', class: 'ban-drop__img' }),
          el('span', { class: 'u-caption u-muted', text: 'Click para cambiar la imagen' }),
        );
      } else {
        preview.append(
          el('span', { class: 'drop-ph__ico', 'aria-hidden': 'true', html: icon('image') }),
          el('span', { class: 'u-caption u-muted', text: 'Click para subir (JPG/PNG/WebP → se comprime a WebP). Recomendado 1200×400+.' }),
        );
      }
    }
    renderPreview();
    preview.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', async () => {
      const file = fileInput.files && fileInput.files[0];
      fileInput.value = '';
      if (!file) return;
      if (store.get().mock) { imageUrl = 'data:demo'; renderPreview(); toast('Imagen simulada (demo)', 'ok'); return; }
      try {
        status.textContent = 'Comprimiendo…';
        imageUrl = await uploadBannerImage(file, (s) => { status.textContent = s; });
        status.textContent = '✓ Imagen subida';
        renderPreview();
      } catch (e) {
        status.textContent = '';
        toast(friendlyError(e, 'No se pudo subir la imagen.'), 'error');
      }
    });

    const hpFields = el('div', { class: 'ban-hp' }, [
      el('p', { class: 'u-caption u-muted', text: 'Campos del carrusel de financiación:' }),
      el('div', { class: 'ban-modal__grid' }, [
        el('label', { class: 'field' }, [el('span', { class: 'field__label', text: 'Badge' }), f.badge]),
        el('label', { class: 'field' }, [el('span', { class: 'field__label', text: 'Antetítulo' }), f.eyebrow]),
        el('label', { class: 'field' }, [el('span', { class: 'field__label', text: 'Cifra' }), f.rateValue]),
        el('label', { class: 'field' }, [el('span', { class: 'field__label', text: 'Etiqueta cifra' }), f.rateLabel]),
      ]),
      el('div', { class: 'ban-modal__grid ban-modal__grid--3' }, f.pills.map((p, i) =>
        el('label', { class: 'field' }, [el('span', { class: 'field__label', text: 'Pill ' + (i + 1) }), p]))),
    ]);
    const syncHp = () => { hpFields.style.display = f.position.value === 'home_promo' ? '' : 'none'; };
    f.position.addEventListener('change', syncHp);

    if (isEdit) {
      f.title.value = banner.title || '';
      f.subtitle.value = banner.subtitle || '';
      f.position.value = banner.position;
      f.position.disabled = true; // mover de posición = crear uno nuevo (evita huérfanos de campos)
      f.order.value = String(banner.order || 0);
      f.link.value = banner.link || '';
      f.cta.value = banner.cta || '';
      f.active.checked = banner.active !== false;
      f.badge.value = banner.badge || '';
      f.eyebrow.value = banner.eyebrow || '';
      f.rateValue.value = banner.rateValue || '';
      f.rateLabel.value = banner.rateLabel || '';
      (banner.pills || []).forEach((p, i) => { if (f.pills[i]) f.pills[i].value = p; });
    } else {
      f.active.checked = true;
    }
    syncHp();

    const saveBtn = el('button', { class: 'btn btn--gold', type: 'button', text: isEdit ? 'Guardar cambios' : 'Crear banner' });
    const cancelBtn = el('button', { class: 'btn btn--soft', type: 'button', text: 'Cancelar' });
    const overlay = el('div', { class: 'rev-modal__overlay' }, [
      el('div', { class: 'rev-modal', role: 'dialog', 'aria-modal': 'true' }, [
        el('h3', { class: 'rev-modal__title', text: isEdit ? 'Editar banner' : 'Nuevo banner' }),
        preview, fileInput, status,
        el('div', { class: 'ban-modal__grid' }, [
          el('label', { class: 'field' }, [el('span', { class: 'field__label', text: 'Título *' }), f.title]),
          el('label', { class: 'field' }, [el('span', { class: 'field__label', text: 'Subtítulo' }), f.subtitle]),
          el('label', { class: 'field' }, [el('span', { class: 'field__label', text: 'Ubicación' }), f.position]),
          el('label', { class: 'field' }, [el('span', { class: 'field__label', text: 'Orden (menor = primero)' }), f.order]),
          el('label', { class: 'field' }, [el('span', { class: 'field__label', text: 'Enlace' }), f.link]),
          el('label', { class: 'field' }, [el('span', { class: 'field__label', text: 'Botón (CTA)' }), f.cta]),
        ]),
        hpFields,
        el('label', { class: 'rev-check' }, [f.active, el('span', { text: 'Activo (visible en la web)' })]),
        el('div', { class: 'rev-modal__actions' }, [cancelBtn, saveBtn]),
      ]),
    ]);
    const close = () => overlay.remove();
    cancelBtn.addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

    saveBtn.addEventListener('click', async () => {
      const title = f.title.value.trim();
      if (!title) { toast('El título es obligatorio.', 'error'); return; }
      if (!isEdit && !imageUrl) { toast('Sube la imagen del banner.', 'error'); return; }
      const fields = {
        title,
        subtitle: f.subtitle.value.trim(),
        position: f.position.value,
        order: parseInt(f.order.value, 10) || 0,
        link: f.link.value.trim(),
        cta: f.cta.value.trim(),
        active: f.active.checked,
        // create: siempre va; edit: solo si cambió (la capa de datos omite '' y
        // así no pisa la imagen existente — mismo contrato que el clásico).
        image: (!isEdit || imageUrl !== banner.image) ? imageUrl : '',
        badge: f.badge.value, eyebrow: f.eyebrow.value,
        rateValue: f.rateValue.value, rateLabel: f.rateLabel.value,
        pills: f.pills.map((p) => p.value),
        _userEmail: (store.get().user && store.get().user.email) || 'unknown',
      };
      if (store.get().mock) {
        if (isEdit) {
          const i = ui.banners.findIndex((b) => b._docId === banner._docId);
          if (i >= 0) ui.banners[i] = { ...ui.banners[i], ...fields, image: imageUrl, _version: (ui.banners[i]._version || 0) + 1 };
        } else {
          ui.banners.push({ ...fields, image: imageUrl, _docId: 'b' + Date.now(), _version: 1 });
          ui.banners.sort((a, b) => (a.order || 0) - (b.order || 0));
        }
        render(); close(); toast(isEdit ? 'Banner actualizado (demo)' : 'Banner creado (demo)', 'ok');
        return;
      }
      saveBtn.disabled = true; saveBtn.textContent = 'Guardando…';
      try {
        await saveBanner(isEdit ? banner._docId : null, fields, banner);
        close(); toast(isEdit ? '✓ Banner actualizado' : '✓ Banner creado — ya está en el home', 'ok');
      } catch (e) {
        saveBtn.disabled = false; saveBtn.textContent = isEdit ? 'Guardar cambios' : 'Crear banner';
        toast('No se pudo guardar: ' + friendlyError(e), 'error');
      }
    });

    document.body.append(overlay);
    f.title.focus();
  }

  /* ── Borrado ────────────────────────────────────────────── */
  function confirmDelete(banner) {
    const delBtn = el('button', { class: 'btn btn--danger', type: 'button', text: 'Eliminar definitivamente' });
    const cancelBtn = el('button', { class: 'btn btn--soft', type: 'button', text: 'Cancelar' });
    const overlay = el('div', { class: 'rev-modal__overlay' }, [
      el('div', { class: 'rev-modal rev-modal--sm', role: 'alertdialog', 'aria-modal': 'true' }, [
        el('h3', { class: 'rev-modal__title', text: '¿Eliminar este banner?' }),
        el('p', { class: 'u-caption u-muted', text: `"${banner.title}" desaparece de la web al instante (su imagen también se borra). No se puede deshacer — si solo quieres pausarlo, usa Ocultar.` }),
        el('div', { class: 'rev-modal__actions' }, [cancelBtn, delBtn]),
      ]),
    ]);
    const close = () => overlay.remove();
    cancelBtn.addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    delBtn.addEventListener('click', async () => {
      if (store.get().mock) {
        ui.banners = ui.banners.filter((b) => b._docId !== banner._docId);
        render(); close(); toast('Banner eliminado (demo)', 'ok');
        return;
      }
      delBtn.disabled = true;
      try {
        await deleteBanner(banner);
        close(); toast('✓ Banner eliminado', 'ok');
      } catch (e) {
        delBtn.disabled = false;
        toast('No se pudo eliminar: ' + friendlyError(e), 'error');
      }
    });
    document.body.append(overlay);
  }

  /* ── Render ─────────────────────────────────────────────── */
  function card(b) {
    const actions = [];
    if (canEdit) {
      const e1 = el('button', { class: 'btn btn--soft btn--sm', type: 'button', html: icon('edit') + ' Editar' });
      e1.addEventListener('click', () => openModal(b));
      const e2 = el('button', { class: 'btn btn--soft btn--sm', type: 'button', html: b.active ? (icon('eyeOff') + ' Ocultar') : (icon('eye') + ' Mostrar') });
      e2.addEventListener('click', async () => {
        if (store.get().mock) {
          b.active = !b.active; render(); toast(b.active ? 'Banner visible (demo)' : 'Banner pausado (demo)', 'ok');
          return;
        }
        try { await toggleBannerActive(b); toast(b.active ? '✓ Banner pausado' : '✓ Banner visible', 'ok'); }
        catch (err) { toast('No se pudo cambiar: ' + friendlyError(err), 'error'); }
      });
      actions.push(e1, e2);
    }
    if (canDelete) {
      const d = el('button', { class: 'btn btn--soft btn--sm', type: 'button', 'aria-label': 'Eliminar', html: icon('trash') });
      d.addEventListener('click', () => confirmDelete(b));
      actions.push(d);
    }
    return el('article', { class: 'ban-card' + (b.active ? '' : ' is-off') }, [
      el('div', { class: 'ban-card__thumb' }, [
        b.image && b.image !== 'data:demo'
          ? el('img', { src: b.image, alt: b.title || '', loading: 'lazy' })
          : el('span', { class: 'u-caption u-faint', text: b.image === 'data:demo' ? '(demo)' : 'Sin imagen' }),
      ]),
      el('div', { class: 'ban-card__body' }, [
        el('div', { class: 'ban-card__head' }, [
          el('span', { class: 'chip' + (b.active ? ' chip--gold' : ''), text: b.active ? 'Activo' : 'Pausado' }),
          el('span', { class: 'u-caption u-faint', text: 'Orden ' + (b.order || 0) }),
        ]),
        el('strong', { class: 'u-truncate', text: b.title || 'Sin título' }),
        b.subtitle ? el('span', { class: 'u-caption u-muted u-truncate', text: b.subtitle }) : null,
        actions.length ? el('div', { class: 'ban-card__actions' }, actions) : null,
      ]),
    ]);
  }

  function group(position) {
    const meta = POSITIONS[position];
    const items = ui.banners.filter((b) => b.position === position);
    const activos = items.filter((b) => b.active).length;
    return el('div', { class: 'ban-group' }, [
      el('div', { class: 'ban-group__head' }, [
        el('h3', { class: 'ban-group__title', text: meta.label + ` (${activos} activos)` }),
        el('p', { class: 'u-caption u-muted', text: meta.hint }),
      ]),
      items.length
        ? el('div', { class: 'ban-grid' }, items.map(card))
        : el('div', { class: 'state' }, [el('div', { class: 'state__msg', text: 'Sin banners en esta ubicación.' })]),
    ]);
  }

  function render() {
    clear(wrap);
    const newBtn = canCreate
      ? el('button', { class: 'btn btn--gold btn--sm', type: 'button', html: icon('plus') + ' Nuevo banner' })
      : null;
    if (newBtn) newBtn.addEventListener('click', () => openModal(null));
    wrap.append(el('div', { class: 'rev-head' }, [
      el('span', { class: 'u-caption u-muted', text: 'Lo que ves aquí es lo que la web muestra — los cambios aplican al instante.' }),
      newBtn,
    ]));
    if (!ui.loaded) {
      wrap.append(el('div', { class: 'state' }, [el('div', { class: 'state__msg', text: 'Cargando banners…' })]));
      return;
    }
    wrap.append(group('promocional'), group('home_promo'));
  }

  if (store.get().mock) {
    ui.banners = MOCK_BANNERS.map((b) => ({ ...b }));
    ui.loaded = true; render();
  } else {
    render();
    ui.sub = subscribeBanners(
      (list) => { ui.banners = list; ui.loaded = true; render(); },
      () => toast('No se pudieron cargar los banners.', 'error'),
    );
  }

  return function cleanup() {
    if (ui.sub) ui.sub(); ui.sub = null;
  };
}
