// ============================================================
// CMS / Dinamismo (TODO-23, comité v4) — editor de contenido del sitio.
// Cobaya MVP: el texto "Acerca de" por marca (un campo, una ruta). La admin
// elige una marca, escribe el texto, guarda → siteContent/brand_{id}.aboutBrand
// → el SSG lo hornea en la página pública /marcas/{slug}.html.
//
// Render seguro: solo texto plano (textarea → el SSG lo escapa con escapeHtml).
// Gate: content.edit (separación de deberes). Aviso explícito: público + permanente.
// ============================================================

import { el, clear } from '../../core/dom.js';
import { store } from '../../core/store.js';
import { toast } from '../../core/toast.js';
import { hasPermission } from '../../core/auth.js';
import {
  subscribeBrands, MOCK_BRANDS, loadAboutBrand, saveAboutBrand, ABOUT_MAX,
} from './cms.data.js';

export function mountCmsDinamico(root) {
  const ui = { brands: [], sub: null, loaded: false, currentId: '' };
  const canEdit = hasPermission('content.edit');

  const wrap = el('section', { class: 'cms', style: 'max-width:760px;margin:0 auto;padding:1.25rem 1rem' });
  clear(root); root.append(wrap);

  // ── Controles (creados una vez; render() los re-inserta) ──────────────
  const select = el('select', { class: 'select' });
  const textarea = el('textarea', {
    class: 'input', rows: '7', maxlength: String(ABOUT_MAX), disabled: true,
    placeholder: 'Elige una marca arriba para editar su texto…',
  });
  const counter = el('span', { class: 'u-caption u-faint', text: '0 / ' + ABOUT_MAX });
  const saveBtn = el('button', { class: 'btn btn--gold', type: 'button', text: 'Guardar', disabled: true });

  const setCounter = () => { counter.textContent = textarea.value.length + ' / ' + ABOUT_MAX; };

  textarea.addEventListener('input', () => {
    setCounter();
    saveBtn.disabled = !canEdit || !ui.currentId;
  });

  select.addEventListener('change', async () => {
    ui.currentId = select.value;
    textarea.value = ''; textarea.disabled = true; saveBtn.disabled = true; setCounter();
    if (!ui.currentId) { textarea.placeholder = 'Elige una marca arriba para editar su texto…'; return; }
    if (store.get().mock) {
      textarea.disabled = false; saveBtn.disabled = !canEdit;
      textarea.placeholder = 'Escribe el texto "Acerca de" (demo)…';
      return;
    }
    textarea.placeholder = 'Cargando…';
    try {
      const txt = await loadAboutBrand(ui.currentId);
      if (ui.currentId === select.value) { // sigue siendo la marca elegida
        textarea.value = txt; textarea.disabled = !canEdit;
        saveBtn.disabled = !canEdit; setCounter();
      }
    } catch (e) {
      toast('No se pudo cargar el contenido: ' + (e.message || e.code || ''), 'error');
    }
    textarea.placeholder = 'Escribe el texto "Acerca de" que verán los visitantes…';
  });

  saveBtn.addEventListener('click', async () => {
    if (!ui.currentId || !canEdit) return;
    const txt = textarea.value.trim();
    const s = store.get();
    if (s.mock) { toast('Guardado (demo) — en real se publica en el sitio.', 'ok'); return; }
    saveBtn.disabled = true; const prev = saveBtn.textContent; saveBtn.textContent = 'Guardando…';
    try {
      await saveAboutBrand(
        ui.currentId, txt,
        (s.user && s.user.email) || '', (s.profile && (s.profile.nombre || s.profile.displayName)) || '',
      );
      toast('✓ Guardado. Aparecerá en el sitio tras la próxima publicación automática.', 'ok');
    } catch (e) {
      const msg = (e && e.code === 'permission-denied')
        ? 'Rechazado: el texto no puede tener números largos (teléfonos/cédulas). Es público y permanente.'
        : ('No se pudo guardar: ' + (e && (e.message || e.code) || ''));
      toast(msg, 'error');
    }
    saveBtn.disabled = false; saveBtn.textContent = prev;
  });

  // ── Render ────────────────────────────────────────────────────────────
  function render() {
    clear(wrap);

    if (!canEdit) {
      wrap.append(el('div', { class: 'state' }, [
        el('div', { class: 'state__icon', text: '🔒' }),
        el('div', { class: 'state__title', text: 'Sin permiso' }),
        el('div', { class: 'state__msg', text: 'No tienes el permiso "Editar contenido del sitio".' }),
      ]));
      return;
    }

    clear(select);
    select.append(el('option', { value: '', text: ui.loaded ? '— Elige una marca —' : 'Cargando marcas…' }));
    ui.brands.forEach((b) => select.append(el('option', { value: b._docId, text: b.nombre || b._docId })));
    select.value = ui.currentId || '';

    wrap.append(
      el('h2', { style: 'font-size:1.25rem;margin:0 0 .25rem', text: '📝 Contenido del sitio — “Acerca de” por marca' }),
      el('p', { class: 'u-caption u-muted', style: 'margin:0 0 1rem',
        text: 'Edita el texto que aparece en la página pública de cada marca. ⚠️ Es PÚBLICO y PERMANENTE — no escribas datos personales, teléfonos ni cédulas.' }),
      el('label', { class: 'field' }, [el('span', { class: 'field__label', text: 'Marca' }), select]),
      el('label', { class: 'field', style: 'margin-top:.75rem' }, [el('span', { class: 'field__label', text: 'Texto “Acerca de”' }), textarea]),
      el('div', { class: 'u-row', style: 'justify-content:space-between;align-items:center;margin-top:.5rem' }, [counter, saveBtn]),
    );
    setCounter();
  }

  // ── Boot ──────────────────────────────────────────────────────────────
  if (store.get().mock) {
    ui.brands = MOCK_BRANDS.map((b) => ({ ...b })); ui.loaded = true; render();
  } else {
    render(); // estado "cargando marcas…"
    ui.sub = subscribeBrands(
      (list) => { ui.brands = list; ui.loaded = true; render(); },
      () => toast('No se pudieron cargar las marcas.', 'error'),
    );
  }

  return function cleanup() { if (ui.sub) ui.sub(); ui.sub = null; };
}
