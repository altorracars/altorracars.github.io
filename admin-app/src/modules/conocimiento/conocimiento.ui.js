// ============================================================
// Base de conocimiento (OLA-2.12 §275) — WRAPPER de dos superficies del
// cerebro del bot bajo UNA entrada del sidebar (antes eran dos: "Base de
// conocimiento" + "Consultas sin respuesta" → reduce el sidebar del plan
// maestro §266). Tabs:
//   · FAQs          → mountCerebro   (lo que el bot SABE — gestión de FAQs)
//   · Sin respuesta → mountUnmatched (lo que el bot NO supo — huecos a llenar)
//
// El flujo natural vive intacto: en "Sin respuesta" el botón "Crear FAQ"
// promueve una query → salta a la tab "FAQs" con el form prellenado (handoff
// IN-PLACE vía callback, sin recargar la sección). El handoff clásico por
// store.kbPrefill sigue siendo el vehículo del prefill; solo cambia el "cómo
// llegar a la tab" (callback en vez de navigate('cerebro')).
//
// RBAC: cada tab se muestra SOLO si el usuario tiene su read (kb.read /
// unmatched.read). Con 1 sola tab visible, la barra se oculta (degenera a
// plano — misma doctrina que los grupos del sidebar con <2 ítems). El guard
// de ruta (canAccessRoute, any-of) ya garantiza que al menos una exista.
// ⟦OPUS-4.8⟧
// ============================================================

import { el, clear } from '../../core/dom.js';
import { icon } from '../../core/icons.js';
import { store } from '../../core/store.js';
import { hasPermission } from '../../core/auth.js';
import { mountCerebro } from '../cerebro/cerebro.ui.js';
import { mountUnmatched } from '../unmatched/unmatched.ui.js';

/**
 * @param {HTMLElement} root
 * @param {'kb'|'unmatched'} [defaultTab='kb'] tab inicial (el router puede pedir una).
 */
export function mountConocimiento(root, defaultTab = 'kb') {
  const TABS = [];
  if (hasPermission('kb.read')) {
    TABS.push({ id: 'kb', label: 'FAQs', iconId: 'brain', mount: (r) => mountCerebro(r) });
  }
  if (hasPermission('unmatched.read')) {
    TABS.push({
      id: 'unmatched', label: 'Sin respuesta', iconId: 'messageCircle',
      // handoff in-place: "Crear FAQ" salta a la tab FAQs (el prefill viaja por store).
      mount: (r) => mountUnmatched(r, { onSwitchToKb: () => setTab('kb') }),
    });
  }

  const wrap = el('section', { class: 'kbhub' });
  clear(root); root.append(wrap);

  if (!TABS.length) {
    // Defensa: canAccessRoute (any-of) ya lo evita, pero nunca dejamos un hueco.
    wrap.append(el('div', { class: 'state' }, [
      el('div', { class: 'state__icon', 'aria-hidden': 'true', html: icon('lock') }),
      el('div', { class: 'state__title', text: 'Sin permiso' }),
      el('div', { class: 'state__msg', text: 'No tienes acceso a esta sección. Pide a un administrador que te la habilite.' }),
    ]));
    return function cleanup() {};
  }

  const host = el('div', { class: 'kbhub__host' });
  const btns = {};
  let active = null;
  let childCleanup = null;

  function setTab(id) {
    if (active === id) return;
    if (childCleanup) { childCleanup(); childCleanup = null; }
    active = id;
    Object.entries(btns).forEach(([k, b]) => {
      const on = k === id;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-selected', String(on));
      b.tabIndex = on ? 0 : -1;
    });
    const tab = TABS.find((t) => t.id === id);
    clear(host);
    childCleanup = tab.mount(host) || null;
  }

  // Barra de tabs SOLO si hay ≥2 (con 1 sola, es ruido — degenera a plano).
  if (TABS.length >= 2) {
    const tabbar = el('div', { class: 'kbhub__tabs', role: 'tablist', 'aria-label': 'Base de conocimiento' });
    TABS.forEach((t) => {
      const b = el('button', {
        class: 'kbhub__tab', type: 'button', role: 'tab', 'aria-selected': 'false',
      }, [
        el('span', { class: 'kbhub__tab-ico', 'aria-hidden': 'true', html: icon(t.iconId) }),
        el('span', { text: t.label }),
      ]);
      b.addEventListener('click', () => setTab(t.id));
      btns[t.id] = b;
      tabbar.append(b);
    });
    wrap.append(tabbar);
  }
  wrap.append(host);

  // Tab inicial: si hay un prefill pendiente (promoción recién disparada) →
  // FAQs; si no, la pedida por el router (o la primera disponible tras RBAC).
  const wanted = store.get().kbPrefill ? 'kb' : defaultTab;
  setTab(TABS.some((t) => t.id === wanted) ? wanted : TABS[0].id);

  return function cleanup() { if (childCleanup) { childCleanup(); childCleanup = null; } };
}
