// ============================================================
// Atributos del inventario (E6 fase ③ paso 2) — cuarto módulo
// migrado. 13 listas editables inline (filas valor/etiqueta, como
// el clásico admin-lists.js) + guardado POR lista + conteo de uso
// por opción y AVISO al quitar una opción con vehículos (mejora vs
// el clásico, que dejaba filtros públicos huérfanos sin avisar).
// Gate UI = espejo de las rules (LIST_PERMS); sin permiso → 🔒.
// ============================================================

import { el, clear } from '../../core/dom.js';
import { icon } from '../../core/icons.js';
import { store } from '../../core/store.js';
import { toast } from '../../core/toast.js';
import { hasPermission } from '../../core/auth.js';
import { friendlyError } from '../../core/errors.js';
import {
  LIST_DEFS, LIST_PERMS, MOCK_LISTS, MOCK_COUNTS,
  fetchLists, saveList, fetchUsageCounts, usageOf,
} from './lists.data.js';

export function mountLists(root) {
  const ui = { lists: null, counts: null, loaded: false };
  const canEdit = LIST_PERMS.some(hasPermission);

  const wrap = el('section', { class: 'lst' });
  clear(root); root.append(wrap);

  if (!canEdit) {
    wrap.append(el('div', { class: 'state' }, [
      el('div', { class: 'state__icon', text: '🔒' }),
      el('div', { class: 'state__title', text: 'Sin permiso' }),
      el('div', { class: 'state__msg', text: 'Solo quien administra el sitio (permisos settings.*) puede editar los atributos del inventario.' }),
    ]));
    return;
  }

  /* ── Una fila valor/etiqueta ────────────────────────────── */
  function row(def, item, markDirty) {
    const valIn = el('input', { class: 'input', type: 'text', value: item ? item.value : '', placeholder: 'Valor (ej: hibrido)' });
    const labIn = el('input', { class: 'input', type: 'text', value: item ? item.label : '', placeholder: 'Etiqueta (ej: Híbrido)' });
    const n = item ? usageOf(def, ui.counts, item.value) : 0;
    const use = n > 0 ? el('span', { class: 'lst-row__use u-caption u-faint', text: n + ' veh.' }) : null;
    const x = el('button', { class: 'lst-row__x', type: 'button', 'aria-label': 'Quitar opción', text: '✕' });
    const node = el('div', { class: 'lst-row' }, [valIn, labIn, use, x]);
    valIn.addEventListener('input', markDirty);
    labIn.addEventListener('input', markDirty);
    x.addEventListener('click', () => { node.remove(); markDirty(); });
    return node;
  }

  /* ── Confirmación al quitar opciones EN USO ─────────────── */
  function confirmRemoval(removedInUse, onConfirm) {
    const okBtn = el('button', { class: 'btn btn--danger', type: 'button', text: 'Guardar de todas formas' });
    const cancelBtn = el('button', { class: 'btn btn--soft', type: 'button', text: 'Cancelar' });
    const overlay = el('div', { class: 'rev-modal__overlay' }, [
      el('div', { class: 'rev-modal rev-modal--sm', role: 'alertdialog', 'aria-modal': 'true' }, [
        el('h3', { class: 'rev-modal__title', text: '¿Quitar opciones que el inventario usa?' }),
        el('p', { class: 'u-caption lst-warn', text: '⚠️ Estas opciones siguen asignadas a vehículos publicados — al quitarlas, esos vehículos quedan con un valor que ya no existe en los filtros de la web:' }),
        el('ul', { class: 'lst-warn__list' }, removedInUse.map((r) =>
          el('li', { class: 'u-caption', text: `${r.label || r.value} — ${r.n} vehículo(s)` }))),
        el('div', { class: 'rev-modal__actions' }, [cancelBtn, okBtn]),
      ]),
    ]);
    const close = () => overlay.remove();
    cancelBtn.addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    okBtn.addEventListener('click', () => { close(); onConfirm(); });
    document.body.append(overlay);
  }

  /* ── Tarjeta por lista ──────────────────────────────────── */
  function card(def) {
    const items = ui.lists[def.key];
    const rows = el('div', { class: 'lst-rows' });
    const dirtyNote = el('span', { class: 'lst-dirty u-caption', text: '● sin guardar' });
    const saveBtn = el('button', { class: 'btn btn--gold btn--sm', type: 'button', text: 'Guardar', disabled: true });

    function markDirty() {
      saveBtn.disabled = false;
      dirtyNote.classList.add('is-on');
    }
    items.forEach((it) => rows.append(row(def, it, markDirty)));

    const addBtn = el('button', { class: 'btn btn--soft btn--sm', type: 'button', html: icon('plus') + ' Agregar opción' });
    addBtn.addEventListener('click', () => {
      const r = row(def, null, markDirty);
      rows.append(r);
      r.querySelector('input').focus();
    });

    function collect() {
      const out = [];
      for (const r of rows.children) {
        const [valIn, labIn] = r.querySelectorAll('input');
        const value = valIn.value.trim();
        const label = labIn.value.trim();
        if (!value && !label) continue; // fila vacía abandonada
        if (!value) { toast('Hay una opción sin valor — complétala o quítala.', 'error'); valIn.focus(); return null; }
        if (out.some((o) => o.value === value)) { toast(`Valor duplicado: "${value}".`, 'error'); valIn.focus(); return null; }
        out.push({ value, label: label || value });
      }
      if (!out.length) { toast('La lista no puede quedar vacía — la web volvería a los valores de fábrica.', 'error'); return null; }
      return out;
    }

    async function doSave(items2) {
      if (store.get().mock) {
        ui.lists[def.key] = items2;
        rerenderCard(def);
        toast(`Lista "${def.title}" guardada (demo)`, 'ok');
        return;
      }
      saveBtn.disabled = true; saveBtn.textContent = 'Guardando…';
      try {
        await saveList(def.key, items2, (store.get().user && store.get().user.email) || 'unknown');
        ui.lists[def.key] = items2;
        rerenderCard(def);
        toast(`✓ Lista "${def.title}" guardada`, 'ok');
      } catch (e) {
        saveBtn.disabled = false; saveBtn.textContent = 'Guardar';
        toast('No se pudo guardar: ' + friendlyError(e), 'error');
      }
    }

    saveBtn.addEventListener('click', () => {
      const items2 = collect();
      if (!items2) return;
      const removedInUse = ui.lists[def.key]
        .filter((b) => items2.every((i) => i.value !== b.value))
        .map((b) => ({ ...b, n: usageOf(def, ui.counts, b.value) }))
        .filter((r) => r.n > 0);
      if (removedInUse.length) confirmRemoval(removedInUse, () => doSave(items2));
      else doSave(items2);
    });

    const node = el('div', { class: 'cfg-card lst-card' }, [
      el('div', { class: 'lst-card__head' }, [
        el('h3', { class: 'cfg-card__title', text: def.title }),
        dirtyNote,
      ]),
      el('p', { class: 'u-caption u-muted', text: def.desc }),
      rows,
      el('div', { class: 'lst-card__foot' }, [addBtn, saveBtn]),
    ]);
    return node;
  }

  function rerenderCard(def) {
    const fresh = card(def);
    fresh.dataset.list = def.key;
    const old = wrap.querySelector(`[data-list="${def.key}"]`);
    if (old) old.replaceWith(fresh);
  }

  function render() {
    clear(wrap);
    wrap.append(el('div', { class: 'rev-head' }, [
      el('span', { class: 'u-caption u-muted', text: '13 listas alimentan el formulario de vehículos, los filtros públicos de la web y el CRM. Cada lista se guarda por separado; la web recoge el cambio en ≤5 min sin tocar nada.' }),
    ]));
    if (!ui.loaded) {
      wrap.append(el('div', { class: 'state' }, [el('div', { class: 'state__msg', text: 'Cargando atributos…' })]));
      return;
    }
    wrap.append(el('div', { class: 'lst-grid' }, LIST_DEFS.map((def) => {
      const c = card(def);
      c.dataset.list = def.key;
      return c;
    })));
  }

  if (store.get().mock) {
    ui.lists = JSON.parse(JSON.stringify(MOCK_LISTS));
    ui.counts = MOCK_COUNTS;
    ui.loaded = true;
    render();
  } else {
    render();
    // Ambas ANTES del primer render con datos: si los conteos llegaran
    // después, re-renderizar pisaría una edición ya empezada.
    Promise.all([fetchLists(), fetchUsageCounts().catch(() => null)])
      .then(([lists, counts]) => {
        ui.lists = lists; ui.counts = counts; ui.loaded = true;
        render();
      })
      .catch(() => toast('No se pudieron cargar los atributos.', 'error'));
  }

  // Sin suscripciones que limpiar (getDoc once, deliberado).
}
