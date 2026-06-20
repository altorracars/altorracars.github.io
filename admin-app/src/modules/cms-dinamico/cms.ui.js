// ============================================================
// CMS / Dinamismo (TODO-23, comité v4) — editor de contenido del sitio.
// Por marca: "Acerca de" (texto plano) + BANNER (imagen). La admin elige una
// marca, edita texto y/o sube banner, guarda → siteContent/brand_{id}
// {aboutBrand, bannerUrl} → el SSG lo hornea en la página pública /marcas/{slug}.html
// (texto = SEO; banner = hero + og:image).
//
// Render seguro: texto plano (textarea → el SSG lo escapa con escapeHtml). Banner =
// imagen comprimida a WebP, subida a Storage (storage.rules), su URL validada por la
// regla de siteContent (host de Storage). Gate: content.edit. Aviso: público + permanente.
// ============================================================

import { el, clear } from '../../core/dom.js';
import { store } from '../../core/store.js';
import { toast } from '../../core/toast.js';
import { hasPermission } from '../../core/auth.js';
import {
  subscribeBrands, MOCK_BRANDS, loadBrandContent, saveBrandContent, uploadBrandBanner, ABOUT_MAX,
} from './cms.data.js';

export function mountCmsDinamico(root) {
  const ui = { brands: [], sub: null, loaded: false, currentId: '', bannerUrl: '' };
  const canEdit = hasPermission('content.edit');

  const wrap = el('section', { class: 'cms', style: 'max-width:760px;margin:0 auto;padding:1.25rem 1rem' });
  clear(root); root.append(wrap);

  // ── Controles (creados una vez; render() los re-inserta) ──────────────
  const select = el('select', { class: 'select' });

  // Banner: caja-preview clicable + input file oculto + estado + quitar.
  const bannerBox = el('div', {
    class: 'cms-banner-drop',
    style: 'border:1px dashed rgba(184,150,88,.45);border-radius:12px;padding:1rem;text-align:center;'
      + 'cursor:pointer;display:flex;flex-direction:column;gap:.45rem;align-items:center;justify-content:center;min-height:120px',
  });
  const bannerFile = el('input', { type: 'file', accept: 'image/jpeg,image/png,image/webp', style: 'display:none' });
  const bannerStatus = el('span', { class: 'u-caption u-muted', text: '' });
  const bannerRemove = el('button', { class: 'btn btn--soft btn--sm', type: 'button', text: 'Quitar banner', style: 'display:none' });

  const textarea = el('textarea', {
    class: 'input', rows: '7', maxlength: String(ABOUT_MAX), disabled: true,
    placeholder: 'Elige una marca arriba para editar su texto…',
  });
  const counter = el('span', { class: 'u-caption u-faint', text: '0 / ' + ABOUT_MAX });
  const saveBtn = el('button', { class: 'btn btn--gold', type: 'button', text: 'Guardar', disabled: true });

  const setCounter = () => { counter.textContent = textarea.value.length + ' / ' + ABOUT_MAX; };
  const refreshSaveBtn = () => { saveBtn.disabled = !canEdit || !ui.currentId; };

  function renderBanner() {
    clear(bannerBox);
    const usable = canEdit && !!ui.currentId;
    bannerBox.style.opacity = usable ? '' : '.5';
    bannerBox.style.pointerEvents = usable ? '' : 'none';
    if (ui.bannerUrl && ui.bannerUrl !== 'data:demo') {
      bannerBox.append(
        el('img', { src: ui.bannerUrl, alt: 'Banner de la marca', style: 'max-width:100%;border-radius:8px;display:block' }),
        el('span', { class: 'u-caption u-muted', text: 'Click para cambiar la imagen' }),
      );
      bannerRemove.style.display = '';
    } else if (ui.bannerUrl === 'data:demo') {
      bannerBox.append(el('span', { text: '🖼️', style: 'font-size:1.6rem' }), el('span', { class: 'u-caption u-muted', text: 'Imagen simulada (demo)' }));
      bannerRemove.style.display = '';
    } else {
      bannerBox.append(
        el('span', { text: '🖼️', style: 'font-size:1.6rem' }),
        el('span', { class: 'u-caption u-muted', text: ui.currentId
          ? 'Click para subir el banner (JPG/PNG/WebP → se comprime). Panorámico, recomendado 1600×500+.'
          : 'Elige una marca arriba.' }),
      );
      bannerRemove.style.display = 'none';
    }
  }

  // ── Eventos ───────────────────────────────────────────────────────────
  textarea.addEventListener('input', () => { setCounter(); refreshSaveBtn(); });

  bannerBox.addEventListener('click', () => { if (canEdit && ui.currentId) bannerFile.click(); });
  bannerRemove.addEventListener('click', () => { ui.bannerUrl = ''; bannerStatus.textContent = 'Banner quitado — pulsa Guardar para aplicar.'; renderBanner(); });

  bannerFile.addEventListener('change', async () => {
    const file = bannerFile.files && bannerFile.files[0];
    bannerFile.value = '';
    if (!file || !ui.currentId) return;
    if (store.get().mock) { ui.bannerUrl = 'data:demo'; bannerStatus.textContent = 'Imagen simulada (demo)'; renderBanner(); return; }
    try {
      ui.bannerUrl = await uploadBrandBanner(file, ui.currentId, (s) => { bannerStatus.textContent = s; });
      bannerStatus.textContent = '✓ Imagen lista — pulsa Guardar para publicarla.';
      renderBanner();
    } catch (e) {
      bannerStatus.textContent = '';
      toast(e.message || 'No se pudo subir la imagen.', 'error');
    }
  });

  select.addEventListener('change', async () => {
    ui.currentId = select.value; ui.bannerUrl = '';
    textarea.value = ''; textarea.disabled = true; saveBtn.disabled = true; bannerStatus.textContent = '';
    setCounter(); renderBanner();
    if (!ui.currentId) { textarea.placeholder = 'Elige una marca arriba para editar su texto…'; return; }
    if (store.get().mock) {
      textarea.disabled = !canEdit; refreshSaveBtn();
      textarea.placeholder = 'Escribe el texto "Acerca de" (demo)…'; renderBanner();
      return;
    }
    textarea.placeholder = 'Cargando…';
    try {
      const content = await loadBrandContent(ui.currentId);
      if (ui.currentId === select.value) { // sigue siendo la marca elegida
        textarea.value = content.aboutBrand; ui.bannerUrl = content.bannerUrl;
        textarea.disabled = !canEdit; refreshSaveBtn(); setCounter(); renderBanner();
      }
    } catch (e) {
      toast('No se pudo cargar el contenido: ' + (e.message || e.code || ''), 'error');
    }
    textarea.placeholder = 'Escribe el texto "Acerca de" que verán los visitantes…';
  });

  saveBtn.addEventListener('click', async () => {
    if (!ui.currentId || !canEdit) return;
    const aboutBrand = textarea.value.trim();
    const s = store.get();
    if (s.mock) { toast('Guardado (demo) — en real se publica en el sitio.', 'ok'); return; }
    saveBtn.disabled = true; const prev = saveBtn.textContent; saveBtn.textContent = 'Guardando…';
    try {
      await saveBrandContent(
        ui.currentId, { aboutBrand, bannerUrl: ui.bannerUrl },
        (s.user && s.user.email) || '', (s.profile && (s.profile.nombre || s.profile.displayName)) || '',
      );
      bannerStatus.textContent = '';
      toast('✓ Guardado. Aparecerá en el sitio tras la próxima publicación automática.', 'ok');
    } catch (e) {
      const msg = (e && e.code === 'permission-denied')
        ? 'Rechazado: el texto no puede tener números largos (teléfonos/cédulas) y el banner debe subirse desde aquí. Es público y permanente.'
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
      el('h2', { style: 'font-size:1.25rem;margin:0 0 .25rem', text: '📝 Contenido del sitio — por marca' }),
      el('p', { class: 'u-caption u-muted', style: 'margin:0 0 1rem',
        text: 'Edita el texto y el banner de la página pública de cada marca. ⚠️ Es PÚBLICO y PERMANENTE — no escribas datos personales, teléfonos ni cédulas.' }),
      el('label', { class: 'field' }, [el('span', { class: 'field__label', text: 'Marca' }), select]),
      el('label', { class: 'field', style: 'margin-top:.85rem' }, [el('span', { class: 'field__label', text: 'Banner de la marca (imagen del encabezado)' }), bannerBox]),
      el('div', { class: 'u-row', style: 'justify-content:space-between;align-items:center;margin-top:.35rem' }, [bannerStatus, bannerRemove]),
      el('label', { class: 'field', style: 'margin-top:.85rem' }, [el('span', { class: 'field__label', text: 'Texto “Acerca de”' }), textarea]),
      el('div', { class: 'u-row', style: 'justify-content:space-between;align-items:center;margin-top:.5rem' }, [counter, saveBtn]),
      bannerFile,
    );
    setCounter(); renderBanner();
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
