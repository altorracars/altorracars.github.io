// ============================================================
// Shell de la app: sidebar (navegación por workspace) + topbar
// (título por ruta, tema, usuario) + outlet + raíz del panel 360.
// Devuelve { outlet, detailRoot, setActive } — main.js dirige el ruteo.
// ============================================================

import { el, clear } from '../dom.js';
import { store } from '../store.js';
import { openMenu } from '../popover.js';
import { navigate } from '../router.js';
import { toggleTheme } from '../theme.js';
import { signOutUser, displayName, displayRole } from '../auth.js';
import { initials } from '../../domain/format.js';

const APP_VERSION = '0.3.0';

const NAV = [
  { id: 'bandeja', label: 'Bandeja', icon: '📥', ready: true },
  { id: 'pipeline', label: 'Pipeline', icon: '🎯', ready: true },
  { id: 'agenda', label: 'Agenda', icon: '📅', ready: true },
  { id: 'contactos', label: 'Contactos', icon: '👤', ready: false },
  { id: 'reportes', label: 'Reportes', icon: '📊', ready: false },
];

const TITLES = {
  bandeja: 'Bandeja Inteligente',
  pipeline: 'Pipeline de ventas',
  agenda: 'Agenda',
};

export function mountShell(appRoot) {
  const navButtons = {};

  const brand = el('div', { class: 'sidebar__brand' }, [
    el('span', { class: 'sidebar__logo', text: 'ALTORRA' }),
    el('span', { class: 'sidebar__sub u-caption', text: 'CRM' }),
  ]);
  const nav = el('nav', { class: 'sidebar__nav', 'aria-label': 'Secciones' });
  NAV.forEach((item) => {
    const btn = el('button', { class: 'navitem', type: 'button', disabled: !item.ready }, [
      el('span', { class: 'navitem__icon', 'aria-hidden': 'true', text: item.icon }),
      el('span', { class: 'navitem__label', text: item.label }),
      !item.ready ? el('span', { class: 'navitem__soon', text: 'Pronto' }) : null,
    ]);
    if (item.ready) btn.addEventListener('click', () => navigate(item.id));
    navButtons[item.id] = btn;
    nav.append(btn);
  });
  const sidebar = el('aside', { class: 'sidebar' }, [
    brand, nav,
    el('div', { class: 'sidebar__foot u-caption u-faint' }, [`v${APP_VERSION} · Fase 3`]),
  ]);

  const titleH = el('h1', { class: 'topbar__h', text: TITLES.bandeja });
  const crumb = el('span', { class: 'topbar__crumb u-caption u-faint', text: store.get().mock ? 'modo demo' : 'tiempo real' });
  const title = el('div', { class: 'topbar__title' }, [titleH, crumb]);

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
    openMenu(userBtn, [{ value: 'logout', label: 'Cerrar sesión', icon: '🚪' }],
      (it) => { if (it.value === 'logout') signOutUser(); }, { title: displayName() });
  });

  const topbar = el('header', { class: 'topbar' }, [title, el('div', { class: 'topbar__actions u-row' }, [themeBtn, userBtn])]);
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

  function setActive(route) {
    Object.entries(navButtons).forEach(([id, btn]) => {
      const on = id === route;
      btn.classList.toggle('is-active', on);
      if (on) btn.setAttribute('aria-current', 'page'); else btn.removeAttribute('aria-current');
    });
    titleH.textContent = TITLES[route] || TITLES.bandeja;
  }

  return { outlet, detailRoot, setActive };
}
