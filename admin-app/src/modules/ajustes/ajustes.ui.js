// ============================================================
// Ajustes (PLAN-UNIFICADO F-2 6/6, gap §2.A) — UI.
// Apariencia (paleta de acento del panel) + SEO/sitemap (regeneración manual
// vía callable server-side). Cierra el GAP Config → admin.html pierde su última
// exclusiva de Configuración. RBAC: settings.theme (tema) · settings.seo (SEO).
// Idioma de tarjetas (.cfg-card) como Disponibilidad. ⟦OPUS-4.8 · rev-Fable⟧
// ============================================================

import { el, clear } from '../../core/dom.js';
import { store } from '../../core/store.js';
import { toast } from '../../core/toast.js';
import { hasPermission } from '../../core/auth.js';
import { writeAudit } from '../../core/audit.js';
import { ACCENTS, getAccent, applyAccent, triggerSeoRegen } from './ajustes.data.js';

export function mountAjustes(root) {
  const canTheme = hasPermission('settings.theme');
  const canSeo = hasPermission('settings.seo');

  const wrap = el('section', { class: 'aj' });
  clear(root); root.append(wrap);

  if (!canTheme && !canSeo) {
    wrap.append(el('div', { class: 'state' }, [
      el('div', { class: 'state__icon', text: '🔒' }),
      el('div', { class: 'state__title', text: 'Sin permiso' }),
      el('div', { class: 'state__msg', text: 'Necesitas el permiso settings.theme o settings.seo para ver los Ajustes.' }),
    ]));
    return function cleanup() {};
  }

  /* ── 1. Apariencia — paleta de acento (per-device, se aplica al instante) ── */
  function cardApariencia() {
    const grid = el('div', { class: 'aj-accents' });

    function paint() {
      clear(grid);
      const current = getAccent();
      ACCENTS.forEach((a) => {
        const isActive = a.id === current;
        const swatches = el('div', { class: 'aj-swatches', 'aria-hidden': 'true' },
          a.swatches.map((c) => {
            const s = el('span', { class: 'aj-swatch' });
            s.style.background = c;
            return s;
          }));
        const card = el('button', {
          class: 'aj-accent' + (isActive ? ' is-active' : ''),
          type: 'button',
          'aria-pressed': isActive ? 'true' : 'false',
          title: a.desc,
        }, [
          swatches,
          el('span', { class: 'aj-accent__name', text: a.name }),
          isActive ? el('span', { class: 'aj-accent__badge', text: '✓ Activo' }) : null,
        ]);
        card.addEventListener('click', () => {
          if (a.id === getAccent()) return; // ya activo: ni aplica ni notifica (anti-spam §115)
          applyAccent(a.id);
          paint();
          toast('🎨 Apariencia: ' + a.name, 'ok');
        });
        grid.append(card);
      });
    }
    paint();

    return el('div', { class: 'cfg-card' }, [
      el('h3', { class: 'cfg-card__title', text: '🎨 Apariencia del panel' }),
      el('p', { class: 'u-caption u-muted', text: 'Elegí la paleta de acento. Se aplica al instante y solo en este dispositivo. El modo claro/oscuro está en el botón 🌙 de la barra superior.' }),
      grid,
    ]);
  }

  /* ── 2. SEO y sitemap — regeneración manual (callable server-side) ───────── */
  function cardSeo() {
    const statusEl = el('div', { class: 'aj-seo__status u-caption u-muted', text: 'La regeneración tarda ~2 minutos en reflejarse en Google y redes.' });
    const btn = el('button', { class: 'btn btn--gold', type: 'button', text: '⟳ Regenerar páginas SEO + sitemap' });

    btn.addEventListener('click', async () => {
      btn.disabled = true;
      const prev = btn.textContent;
      btn.textContent = '⏳ Enviando…';
      statusEl.className = 'aj-seo__status u-caption u-muted';
      statusEl.textContent = 'Disparando la regeneración…';
      try {
        if (store.get().mock) {
          await new Promise((r) => setTimeout(r, 600));
          toast('✓ Regeneración iniciada (demo)', 'ok');
          statusEl.textContent = '✓ (demo) Las páginas se actualizarían en ~2 min.';
        } else {
          const res = await triggerSeoRegen();
          toast('✓ ' + (res.message || 'Regeneración iniciada.'), 'ok');
          statusEl.className = 'aj-seo__status u-caption aj-seo__status--ok';
          statusEl.textContent = '✓ ' + (res.message || 'Regeneración iniciada. ~2 min.');
          writeAudit('seo_regenerate', 'github-actions', 'Disparo manual desde admin-app');
        }
      } catch (e) {
        const code = e && e.code;
        const msg = code === 'permission-denied'
          ? 'Solo un Super Admin puede regenerar las páginas SEO.'
          : code === 'failed-precondition'
            ? 'Falta configurar el token de GitHub en el servidor (GITHUB_PAT).'
            : ('No se pudo iniciar: ' + ((e && e.message) || code || 'error'));
        toast(msg, 'error');
        statusEl.className = 'aj-seo__status u-caption aj-seo__status--err';
        statusEl.textContent = '✗ ' + msg;
      } finally {
        btn.disabled = false;
        btn.textContent = prev;
      }
    });

    return el('div', { class: 'cfg-card' }, [
      el('h3', { class: 'cfg-card__title', text: '🗺️ SEO y sitemap' }),
      el('p', { class: 'u-caption u-muted', text: 'Las páginas SEO y el sitemap.xml se regeneran SOLOS cuando cambiás un vehículo, una marca o el contenido del sitio. Usá este botón solo para forzar una regeneración manual.' }),
      el('div', { class: 'aj-seo__row' }, [btn]),
      statusEl,
    ]);
  }

  const cards = [];
  if (canTheme) cards.push(cardApariencia());
  if (canSeo) cards.push(cardSeo());
  wrap.append(el('div', { class: 'aj-cols' }, cards));

  return function cleanup() {};
}
