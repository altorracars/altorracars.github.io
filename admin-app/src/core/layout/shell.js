// ============================================================
// Shell de la app: sidebar (navegación por workspace) + topbar
// (título, tema, usuario) + outlet + raíz del panel 360.
// ============================================================

import { el, clear } from '../dom.js';
import { store } from '../store.js';
import { openMenu } from '../popover.js';
import { toggleTheme } from '../theme.js';
import { signOutUser, displayName, displayRole } from '../auth.js';
import { initials } from '../../domain/format.js';

const APP_VERSION = '0.2.0';

const NAV = [
  { id: 'bandeja', label: 'Bandeja', icon: '📥', ready: true },
  { id: 'contactos', label: 'Contactos', icon: '👤', ready: false },
  { id: 'pipeline', label: 'Pipeline', icon: '🎯', ready: false },
  { id: 'agenda', label: 'Agenda', icon: '📅', ready: false },
  { id: 'reportes', label: 'Reportes', icon: '📊', ready: false },
];

export function mountShell(appRoot) {
  // Sidebar
  const brand = el('div', { class: 'sidebar__brand' }, [
    el('span', { class: 'sidebar__logo', text: 'ALTORRA' }),
    el('span', { class: 'sidebar__sub u-caption', text: 'CRM · Bandeja' }),
  ]);
  const nav = el('nav', { class: 'sidebar__nav', 'aria-label': 'Secciones' });
  NAV.forEach((item) => {
    const a = el('button', {
      class: 'navitem' + (item.id === 'bandeja' ? ' is-active' : ''),
      type: 'button', 'aria-current': item.id === 'bandeja' ? 'page' : null,
      disabled: !item.ready,
    }, [
      el('span', { class: 'navitem__icon', 'aria-hidden': 'true', text: item.icon }),
      el('span', { class: 'navitem__label', text: item.label }),
      !item.ready ? el('span', { class: 'navitem__soon', text: 'Pronto' }) : null,
    ]);
    nav.append(a);
  });
  const sidebar = el('aside', { class: 'sidebar' }, [
    brand, nav,
    el('div', { class: 'sidebar__foot u-caption u-faint' }, [`v${APP_VERSION} · Fase 2`]),
  ]);

  // Topbar
  const title = el('div', { class: 'topbar__title' }, [
    el('h1', { class: 'topbar__h', text: 'Bandeja Inteligente' }),
    el('span', { class: 'topbar__crumb u-caption u-faint', text: store.get().mock ? 'modo demo' : 'tiempo real' }),
  ]);

  const themeBtn = el('button', { class: 'icon-btn', type: 'button', 'aria-label': 'Cambiar tema' },
    [el('span', { 'aria-hidden': 'true', text: store.get().theme === 'dark' ? '☀️' : '🌙' })]);
  themeBtn.addEventListener('click', () => {
    const t = toggleTheme();
    themeBtn.firstChild.textContent = t === 'dark' ? '☀️' : '🌙';
  });

  const userBtn = el('button', { class: 'usermenu', type: 'button', 'aria-haspopup': 'menu' }, [
    el('span', { class: 'avatar avatar--sm', 'aria-hidden': 'true', text: initials(displayName()) }),
    el('span', { class: 'usermenu__meta' }, [
      el('span', { class: 'usermenu__name u-truncate', text: displayName() }),
      el('span', { class: 'usermenu__role u-caption u-faint u-truncate', text: displayRole() }),
    ]),
  ]);
  userBtn.addEventListener('click', () => {
    openMenu(userBtn, [
      { value: 'logout', label: 'Cerrar sesión', icon: '🚪' },
    ], (it) => { if (it.value === 'logout') signOutUser(); }, { title: displayName() });
  });

  const topbar = el('header', { class: 'topbar' }, [
    title,
    el('div', { class: 'topbar__actions u-row' }, [themeBtn, userBtn]),
  ]);

  const outlet = el('main', { class: 'outlet', id: 'outlet' });
  const detailRoot = el('div', { id: 'detail-root' });

  const layout = el('div', { class: 'app-shell' }, [
    sidebar,
    el('div', { class: 'app-main' }, [topbar, outlet]),
    detailRoot,
  ]);

  clear(appRoot);
  appRoot.removeAttribute('aria-busy');
  appRoot.append(layout);

  return { outlet, detailRoot };
}
