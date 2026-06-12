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
import { signOutUser, displayName, displayRole, hasPermission } from '../auth.js';
import { initials } from '../../domain/format.js';

const APP_VERSION = '0.4.1';

const NAV = [
  { id: 'bandeja', label: 'Bandeja', icon: '📥', ready: true },
  { id: 'pipeline', label: 'Pipeline', icon: '🎯', ready: true },
  { id: 'agenda', label: 'Agenda', icon: '📅', ready: true },
  { id: 'reportes', label: 'Reportes', icon: '📊', ready: true },
  { id: 'contactos', label: 'Contactos', icon: '👤', ready: true },
  // F21 §184: editor del SSoT de disponibilidad — solo quien lo administra.
  { id: 'config', label: 'Disponibilidad', icon: '⚙️', ready: true, perm: 'calendar.config' },
  // E6 fase ② §188: módulos del sitio público migrados del clásico.
  { id: 'resenas', label: 'Reseñas', icon: '⭐', ready: true, perm: 'reviews.read' },
  { id: 'banners', label: 'Banners', icon: '🖼️', ready: true, perm: 'banners.read' },
  // E6 fase ③ §188: inventario — marcas primero (el form de vehículos las necesita).
  { id: 'vehiculos', label: 'Vehículos', icon: '🚗', ready: true, perm: 'vehicles.read' },
  { id: 'marcas', label: 'Marcas', icon: '🏷️', ready: true, perm: 'brands.read' },
  // E6 fase ③ p2: editor de config/listas (rules: super_admin / settings.* — any-of).
  { id: 'atributos', label: 'Atributos', icon: '🧩', ready: true, perm: ['settings.theme', 'settings.seo', 'settings.backup'] },
  // D4-09b: export/restore F34 — el server exige super_admin en los callables.
  { id: 'respaldos', label: 'Respaldos', icon: '💾', ready: true, perm: 'settings.backup' },
];

const TITLES = {
  bandeja: 'Bandeja Inteligente',
  pipeline: 'Pipeline de ventas',
  agenda: 'Agenda',
  reportes: 'Reportes y KPIs',
  contactos: 'Contactos',
  config: 'Disponibilidad de citas',
  resenas: 'Reseñas del sitio',
  banners: 'Banners del sitio',
  vehiculos: 'Inventario de vehículos',
  marcas: 'Marcas del inventario',
  atributos: 'Atributos del inventario',
  respaldos: 'Respaldos del CRM e inventario',
};

export function mountShell(appRoot) {
  const navButtons = {};

  const brand = el('div', { class: 'sidebar__brand' }, [
    el('span', { class: 'sidebar__logo', text: 'ALTORRA' }),
    el('span', { class: 'sidebar__sub u-caption', text: 'CRM' }),
  ]);
  const nav = el('nav', { class: 'sidebar__nav', 'aria-label': 'Secciones' });
  // perm: string o array (any-of) — '*' pasa siempre vía hasPermission.
  NAV.filter((item) => !item.perm || [].concat(item.perm).some(hasPermission)).forEach((item) => {
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
    el('div', { class: 'sidebar__foot u-caption u-faint' }, [`v${APP_VERSION} · Fase 4`]),
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
