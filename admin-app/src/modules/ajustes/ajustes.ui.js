// ============================================================
// Ajustes (PLAN-UNIFICADO F-2 6/6, gap §2.A) — UI.
// Apariencia (paleta de acento del panel) + SEO/sitemap (regeneración manual
// vía callable server-side). Cierra el GAP Config → admin.html pierde su última
// exclusiva de Configuración. RBAC: settings.theme (tema) · settings.seo (SEO).
// Idioma de tarjetas (.cfg-card) como Disponibilidad. ⟦OPUS-4.8 · rev-Fable⟧
// ============================================================

import { el, clear } from '../../core/dom.js';
import { icon, iconEl } from '../../core/icons.js';
import { store } from '../../core/store.js';
import { toast } from '../../core/toast.js';
import { hasPermission } from '../../core/auth.js';
import { writeAudit } from '../../core/audit.js';
import { triggerSeoRegen } from './ajustes.data.js';

export function mountAjustes(root) {
  // §219-next (dueño 29/06): se eliminó el accent picker ("cambiar el color del panel" =
  // irrelevante). Altorra Cars es dark-only con oro de marca fijo. Ajustes = solo SEO.
  const canSeo = hasPermission('settings.seo');

  const wrap = el('section', { class: 'aj' });
  clear(root); root.append(wrap);

  if (!canSeo) {
    wrap.append(el('div', { class: 'state' }, [
      el('div', { class: 'state__icon', html: icon('lock') }),
      el('div', { class: 'state__title', text: 'Sin permiso' }),
      el('div', { class: 'state__msg', text: 'Necesitas el permiso settings.seo para ver los Ajustes.' }),
    ]));
    return function cleanup() {};
  }

  /* ── SEO y sitemap — regeneración manual (callable server-side) ───────── */
  function cardSeo() {
    const statusEl = el('div', { class: 'aj-seo__status u-caption u-muted', text: 'La regeneración tarda ~2 minutos en reflejarse en Google y redes.' });
    const btnLabel = el('span', { text: 'Regenerar páginas SEO + sitemap' });
    const btn = el('button', { class: 'btn btn--gold', type: 'button' }, [iconEl('refresh'), btnLabel]);

    btn.addEventListener('click', async () => {
      btn.disabled = true;
      const prev = btnLabel.textContent;
      btnLabel.textContent = 'Enviando…';
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
        btnLabel.textContent = prev;
      }
    });

    return el('div', { class: 'cfg-card' }, [
      el('h3', { class: 'cfg-card__title u-ico-text', html: icon('map') + 'SEO y sitemap' }),
      el('p', { class: 'u-caption u-muted', text: 'Las páginas SEO y el sitemap.xml se regeneran SOLOS cuando cambiás un vehículo, una marca o el contenido del sitio. Usá este botón solo para forzar una regeneración manual.' }),
      el('div', { class: 'aj-seo__row' }, [btn]),
      statusEl,
    ]);
  }

  wrap.append(el('div', { class: 'aj-cols' }, [cardSeo()]));

  return function cleanup() {};
}
