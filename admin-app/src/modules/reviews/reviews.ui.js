// ============================================================
// Reseñas (E6 fase ②, ADR §188 paso 1) — PRIMER módulo del sitio
// público migrado al portal: valida el patrón del strangler.
// Lista + stats + alta/edición en modal + borrado con doble
// confirmación. RBAC espejo del clásico: reviews.create/edit/delete
// (la lectura de `resenas` es pública — el gate del nav es
// reviews.read para no mostrar una sección inútil a roles CRM).
// ============================================================

import { el, clear } from '../../core/dom.js';
import { store } from '../../core/store.js';
import { toast } from '../../core/toast.js';
import { hasPermission } from '../../core/auth.js';
import { friendlyError } from '../../core/errors.js';
import {
  SOURCE_LABELS, MOCK_REVIEWS, subscribeReviews, saveReview, deleteReview, initialsOf,
} from './reviews.data.js';

const STAR_ON = '★';
const STAR_OFF = '☆';
const stars = (n) => STAR_ON.repeat(Math.max(0, Math.min(5, n))) + STAR_OFF.repeat(5 - Math.max(0, Math.min(5, n)));

export function mountReviews(root) {
  const ui = { reviews: [], sub: null, loaded: false };
  const canCreate = hasPermission('reviews.create');
  const canEdit = hasPermission('reviews.edit');
  const canDelete = hasPermission('reviews.delete');

  const wrap = el('section', { class: 'rev' });
  clear(root); root.append(wrap);

  /* ── Modal alta/edición ─────────────────────────────────── */
  function openModal(review) {
    const isEdit = !!review;
    const f = {
      name: el('input', { class: 'input', type: 'text', maxlength: '80', placeholder: 'Nombre del cliente *' }),
      location: el('input', { class: 'input', type: 'text', maxlength: '60', placeholder: 'Ciudad (default: Cartagena)' }),
      rating: el('select', { class: 'select' }, [5, 4, 3, 2, 1].map((n) =>
        el('option', { value: String(n), text: stars(n) + '  (' + n + ')' }))),
      vehicle: el('input', { class: 'input', type: 'text', maxlength: '80', placeholder: 'Vehículo (opcional)' }),
      text: el('textarea', { class: 'input rev-modal__text', maxlength: '600', rows: '4', placeholder: 'Texto de la reseña *' }),
      source: el('select', { class: 'select' }, Object.entries(SOURCE_LABELS).map(([v, t]) =>
        el('option', { value: v, text: t }))),
      verified: el('input', { type: 'checkbox' }),
      featured: el('input', { type: 'checkbox' }),
    };
    if (isEdit) {
      f.name.value = review.name || '';
      f.location.value = review.location || '';
      f.rating.value = String(parseInt(review.rating, 10) || 5);
      f.vehicle.value = review.vehicle || '';
      f.text.value = review.text || '';
      f.source.value = review.source || 'sitio_web';
      f.verified.checked = review.verified !== false;
      f.featured.checked = !!review.featured;
    } else {
      f.source.value = 'sitio_web';
      f.verified.checked = true;
    }

    const saveBtn = el('button', { class: 'btn btn--gold', type: 'button', text: isEdit ? 'Guardar cambios' : 'Crear reseña' });
    const cancelBtn = el('button', { class: 'btn btn--soft', type: 'button', text: 'Cancelar' });
    const overlay = el('div', { class: 'rev-modal__overlay' }, [
      el('div', { class: 'rev-modal', role: 'dialog', 'aria-modal': 'true' }, [
        el('h3', { class: 'rev-modal__title', text: isEdit ? 'Editar reseña' : 'Nueva reseña' }),
        el('div', { class: 'rev-modal__grid' }, [
          el('label', { class: 'field' }, [el('span', { class: 'field__label', text: 'Cliente *' }), f.name]),
          el('label', { class: 'field' }, [el('span', { class: 'field__label', text: 'Ubicación' }), f.location]),
          el('label', { class: 'field' }, [el('span', { class: 'field__label', text: 'Calificación' }), f.rating]),
          el('label', { class: 'field' }, [el('span', { class: 'field__label', text: 'Vehículo' }), f.vehicle]),
        ]),
        el('label', { class: 'field' }, [el('span', { class: 'field__label', text: 'Reseña *' }), f.text]),
        el('div', { class: 'rev-modal__grid' }, [
          el('label', { class: 'field' }, [el('span', { class: 'field__label', text: 'Fuente' }), f.source]),
          el('label', { class: 'rev-check' }, [f.verified, el('span', { text: 'Verificada (cliente real)' })]),
          el('label', { class: 'rev-check' }, [f.featured, el('span', { text: '⭐ Destacada en el sitio' })]),
        ]),
        el('div', { class: 'rev-modal__actions' }, [cancelBtn, saveBtn]),
      ]),
    ]);
    const close = () => overlay.remove();
    cancelBtn.addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

    saveBtn.addEventListener('click', async () => {
      const name = f.name.value.trim();
      const text = f.text.value.trim();
      if (!name || !text) { toast('Completa nombre y texto de la reseña.', 'error'); return; }
      const fields = {
        name, text,
        location: f.location.value.trim(),
        rating: parseInt(f.rating.value, 10) || 5,
        vehicle: f.vehicle.value.trim(),
        source: f.source.value,
        verified: f.verified.checked,
        featured: f.featured.checked,
      };
      if (store.get().mock) {
        if (isEdit) {
          const i = ui.reviews.findIndex((r) => r._docId === review._docId);
          if (i >= 0) ui.reviews[i] = { ...ui.reviews[i], ...fields, avatar: initialsOf(name) };
        } else {
          ui.reviews.unshift({ ...fields, _docId: 'm' + Date.now(), avatar: initialsOf(name), createdAt: new Date().toISOString() });
        }
        render(); close(); toast(isEdit ? 'Reseña actualizada (demo)' : 'Reseña creada (demo)', 'ok');
        return;
      }
      saveBtn.disabled = true; saveBtn.textContent = 'Guardando…';
      try {
        await saveReview(isEdit ? review._docId : null, fields);
        close(); toast(isEdit ? '✓ Reseña actualizada' : '✓ Reseña creada — ya está en el sitio', 'ok');
      } catch (e) {
        saveBtn.disabled = false; saveBtn.textContent = isEdit ? 'Guardar cambios' : 'Crear reseña';
        toast('No se pudo guardar: ' + friendlyError(e), 'error');
      }
    });

    document.body.append(overlay);
    f.name.focus();
  }

  /* ── Borrado con doble confirmación ─────────────────────── */
  function confirmDelete(review) {
    const delBtn = el('button', { class: 'btn btn--danger', type: 'button', text: 'Eliminar definitivamente' });
    const cancelBtn = el('button', { class: 'btn btn--soft', type: 'button', text: 'Cancelar' });
    const overlay = el('div', { class: 'rev-modal__overlay' }, [
      el('div', { class: 'rev-modal rev-modal--sm', role: 'alertdialog', 'aria-modal': 'true' }, [
        el('h3', { class: 'rev-modal__title', text: '¿Eliminar esta reseña?' }),
        el('p', { class: 'u-caption u-muted', text: `"${(review.text || '').slice(0, 120)}…" — ${review.name}. Desaparece del sitio público al instante. No se puede deshacer.` }),
        el('div', { class: 'rev-modal__actions' }, [cancelBtn, delBtn]),
      ]),
    ]);
    const close = () => overlay.remove();
    cancelBtn.addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    delBtn.addEventListener('click', async () => {
      if (store.get().mock) {
        ui.reviews = ui.reviews.filter((r) => r._docId !== review._docId);
        render(); close(); toast('Reseña eliminada (demo)', 'ok');
        return;
      }
      delBtn.disabled = true;
      try {
        await deleteReview(review._docId, review.name);
        close(); toast('✓ Reseña eliminada', 'ok');
      } catch (e) {
        delBtn.disabled = false;
        toast('No se pudo eliminar: ' + friendlyError(e), 'error');
      }
    });
    document.body.append(overlay);
  }

  /* ── Render ─────────────────────────────────────────────── */
  function header() {
    const total = ui.reviews.length;
    const avg = total ? (ui.reviews.reduce((a, r) => a + (parseInt(r.rating, 10) || 0), 0) / total).toFixed(1) : '0.0';
    const featured = ui.reviews.filter((r) => r.featured).length;
    const newBtn = canCreate
      ? el('button', { class: 'btn btn--gold btn--sm', type: 'button', text: '＋ Nueva reseña' })
      : null;
    if (newBtn) newBtn.addEventListener('click', () => openModal(null));
    return el('div', { class: 'rev-head' }, [
      el('div', { class: 'rev-stats' }, [
        el('div', { class: 'rev-stat' }, [el('strong', { text: String(total) }), el('span', { class: 'u-caption u-muted', text: 'reseñas' })]),
        el('div', { class: 'rev-stat' }, [el('strong', { text: avg + ' ★' }), el('span', { class: 'u-caption u-muted', text: 'promedio' })]),
        el('div', { class: 'rev-stat' }, [el('strong', { text: String(featured) }), el('span', { class: 'u-caption u-muted', text: 'destacadas' })]),
      ]),
      newBtn,
    ]);
  }

  function card(r) {
    const actions = [];
    if (canEdit) {
      const b = el('button', { class: 'btn btn--soft btn--sm', type: 'button', text: '✏️ Editar' });
      b.addEventListener('click', () => openModal(r));
      actions.push(b);
    }
    if (canDelete) {
      const b = el('button', { class: 'btn btn--soft btn--sm rev-card__del', type: 'button', text: '🗑' , 'aria-label': 'Eliminar' });
      b.addEventListener('click', () => confirmDelete(r));
      actions.push(b);
    }
    return el('article', { class: 'rev-card' }, [
      el('div', { class: 'rev-card__top' }, [
        el('span', { class: 'avatar avatar--sm', 'aria-hidden': 'true', text: r.avatar || initialsOf(r.name) }),
        el('div', { class: 'rev-card__who' }, [
          el('strong', { class: 'u-truncate', text: (r.name || '') + (r.verified ? ' ✔' : '') }),
          el('span', { class: 'u-caption u-faint', text: r.location || '—' }),
        ]),
        el('span', { class: 'rev-card__stars', 'aria-label': (r.rating || 0) + ' de 5', text: stars(parseInt(r.rating, 10) || 0) }),
      ]),
      r.text ? el('p', { class: 'rev-card__text', text: '“' + r.text + '”' }) : null,
      el('div', { class: 'rev-card__meta' }, [
        r.vehicle ? el('span', { class: 'chip', text: '🚗 ' + r.vehicle }) : null,
        el('span', { class: 'chip', text: SOURCE_LABELS[r.source] || r.source || '—' }),
        r.featured ? el('span', { class: 'chip chip--gold', text: '⭐ Destacada' }) : null,
      ]),
      actions.length ? el('div', { class: 'rev-card__actions' }, actions) : null,
    ]);
  }

  function render() {
    clear(wrap);
    wrap.append(header());
    if (!ui.loaded) {
      wrap.append(el('div', { class: 'state' }, [el('div', { class: 'state__msg', text: 'Cargando reseñas…' })]));
      return;
    }
    if (!ui.reviews.length) {
      wrap.append(el('div', { class: 'state' }, [
        el('div', { class: 'state__icon', text: '💬' }),
        el('div', { class: 'state__title', text: 'Sin reseñas' }),
        el('div', { class: 'state__msg', text: canCreate ? 'Agrega la primera con "＋ Nueva reseña".' : 'Aún no hay reseñas registradas.' }),
      ]));
      return;
    }
    wrap.append(el('div', { class: 'rev-grid' }, ui.reviews.map(card)));
  }

  // Boot: mock = semilla local; real = onSnapshot de `resenas`.
  if (store.get().mock) {
    ui.reviews = MOCK_REVIEWS.map((r) => ({ ...r }));
    ui.loaded = true; render();
  } else {
    render(); // estado "cargando"
    ui.sub = subscribeReviews(
      (list) => { ui.reviews = list; ui.loaded = true; render(); },
      () => toast('No se pudieron cargar las reseñas.', 'error'),
    );
  }

  return function cleanup() {
    if (ui.sub) ui.sub(); ui.sub = null;
  };
}
