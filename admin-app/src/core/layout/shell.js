// ============================================================
// Shell de la app: sidebar (navegación por workspace) + topbar
// (título por ruta, tema, usuario) + outlet + raíz del panel 360.
// Devuelve { outlet, detailRoot, setActive } — main.js dirige el ruteo.
// ============================================================

import { el, clear } from '../dom.js';
import { store } from '../store.js';
import { openMenu } from '../popover.js';
import { navigate } from '../router.js';
import { signOutUser, displayName, displayRole, hasPermission } from '../auth.js';
import { initials } from '../../domain/format.js';
// W-11 F1(b) (rediseño portal §244): "Nuevo lead" siempre visible en el topbar
// GLOBAL (antes solo vivía dentro de la Bandeja, inbox.ui.js). Reusa el form
// rápido (camino primario <30s, ADR §178) — modal auto-contenido, sin acoplar al inbox.
import { openQuickLeadForm } from '../../modules/capture/quick-lead.js';
// W-11 F2 (comité pt.8): iconos SVG inline (currentColor) del sidebar.
import { navIcon } from './nav-icons.js';

const APP_VERSION = '0.4.1';

// W-11 F1(c): icono hamburguesa (SVG inline, currentColor) para el drawer móvil.
// Marca la dirección emoji→SVG de F2 sin meter librería (vanilla sin bundler, §3.1).
const ICON_MENU = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
// W-11 F2: chevron de disclosure para los grupos <details> (rota 180° al abrir vía CSS).
const ICON_CHEVRON = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>';

// W-11 F2: span de icono = SVG si existe en el set, si no el emoji (fallback seguro,
// nunca un hueco). El nombre accesible vive en el .navitem__label hermano (aria-hidden aquí).
function iconSpan(id, emoji) {
  const svg = navIcon(id);
  return svg
    ? el('span', { class: 'navitem__icon', 'aria-hidden': 'true', html: svg })
    : el('span', { class: 'navitem__icon', 'aria-hidden': 'true', text: emoji });
}

const NAV = [
  // PLAN-UNIFICADO F-3 §237: el Inicio del portal (KPIs + NBA + pendientes). Sin perm: lo ve todo el equipo.
  { id: 'inicio', label: 'Inicio', icon: '🏠', ready: true },
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
  // TODO-23 FASE 2 (CMS cobaya): editor de contenido editable del sitio. Gate content.edit.
  { id: 'contenido', label: 'Contenido', icon: '📝', ready: true, perm: 'content.edit' },
  // E6 fase ③ §188: inventario — marcas primero (el form de vehículos las necesita).
  { id: 'vehiculos', label: 'Vehículos', icon: '🚗', ready: true, perm: 'vehicles.read' },
  { id: 'marcas', label: 'Marcas', icon: '🏷️', ready: true, perm: 'brands.read' },
  // E6 fase ③ §204: aliados/concesionarios (port verbatim; modelo CRM ampliado = D5-03). ⟦OPUS-4.8 · rev-Fable⟧
  { id: 'aliados', label: 'Aliados', icon: '🤝', ready: true, perm: 'dealers.read' },
  // E6 fase ③ p2: editor de config/listas (rules: super_admin / settings.* — any-of).
  { id: 'atributos', label: 'Atributos', icon: '🧩', ready: true, perm: ['settings.theme', 'settings.seo', 'settings.backup'] },
  // D4-09b: export/restore F34 — el server exige super_admin en los callables.
  { id: 'respaldos', label: 'Respaldos', icon: '💾', ready: true, perm: 'settings.backup' },
  // PLAN-UNIFICADO F-2 §237 (gap §2.A): equipo + RBAC migrado del clásico admin-users.
  { id: 'usuarios', label: 'Usuarios', icon: '👥', ready: true, perm: 'users.read' },
  // PLAN-UNIFICADO F-2 (2/6) §239: roles + matriz de permisos (port admin-roles).
  { id: 'roles', label: 'Roles', icon: '🛡️', ready: true, perm: 'roles.read' },
  // PLAN-UNIFICADO F-2 (3/6) §240: catálogo departamental ④a (port admin-departments).
  { id: 'departamentos', label: 'Departamentos', icon: '🏢', ready: true, perm: ['departments.read', 'departments.manage'] },
  // PLAN-UNIFICADO F-2 (4/6) §242: automatización — toggle de reglas + historial (port admin-automation).
  { id: 'workflows', label: 'Automatización', icon: '⚡', ready: true, perm: 'workflows.read' },
  // PLAN-UNIFICADO F-2 (5/6) §243: visor de auditoría — el LECTOR de auditLog (audit.js ya escribe).
  { id: 'auditoria', label: 'Auditoría', icon: '🗂️', ready: true, perm: 'audit.read' },
  // PLAN-UNIFICADO F-2 (6/6) · OLA-1.2: renombrado — el grupo ya se llama
  // "Administración"; "Ajustes>Ajustes" era colisión de nombres (antipatrón IA).
  { id: 'ajustes', label: 'Apariencia y SEO', icon: '🎛️', ready: true, perm: ['settings.theme', 'settings.seo'] },
  // PLAN-UNIFICADO F-4 (gap §2.B Comunicaciones): ALTOR Hub (consola de chat) + Cerebro AI (FAQs del bot) + "Lo que no entendí" (unmatchedQueries = fugas).
  { id: 'hub', label: 'ALTOR Hub', icon: '💬', ready: true, perm: 'concierge.read' },
  // OLA-1.2: labels corporativos — "Cerebro AI"/"No entendí" eran jerga interna.
  { id: 'cerebro', label: 'Base de conocimiento', icon: '🧠', ready: true, perm: 'kb.read' },
  { id: 'unmatched', label: 'Consultas sin respuesta', icon: '🤔', ready: true, perm: 'unmatched.read' },
];

// W-11 F2 (comité pt.3): layout de nav en 2 ZONAS. PRIMARIA = el día a día, siempre
// plana y visible. SECUNDARIA = grupos colapsables (<details>) por dominio. Las
// definiciones de cada ítem siguen en NAV[] (label/icon/perm = SSoT); aquí solo se
// referencian por id, así router/rutas/módulos quedan INTACTOS (cambio aditivo §3.2).
// OLA-1.2 (plan maestro §266): 5 grupos por DOMINIO DE NEGOCIO — mata el cajón de
// sastre "Ajustes>Ajustes" de 9 ítems: Inventario (lo que la empresa VENDE — incluye
// sus atributos), Sitio web (contenido público), Comunicaciones, Equipo (personas/
// permisos), Administración (gobernanza). `config` (Disponibilidad) sale del sidebar:
// vive como acción DENTRO de Agenda (su dominio real); la ruta #/config sigue viva.
const NAV_PRIMARY = ['inicio', 'bandeja', 'pipeline', 'agenda', 'contactos', 'reportes'];
const NAV_GROUPS = [
  { id: 'g-inventario', label: 'Inventario', icon: '🚗', items: ['vehiculos', 'marcas', 'aliados', 'atributos'] },
  { id: 'g-sitio', label: 'Sitio web', icon: '🌐', items: ['banners', 'contenido', 'resenas'] },
  { id: 'g-comms', label: 'Comunicaciones', icon: '📣', items: ['hub', 'cerebro', 'unmatched'] },
  { id: 'g-equipo', label: 'Equipo', icon: '👥', items: ['usuarios', 'roles', 'departamentos'] },
  { id: 'g-admin', label: 'Administración', icon: '🛠️', items: ['workflows', 'auditoria', 'respaldos', 'ajustes'] },
];
const NAV_GROUP_KEY = 'altorra:navgroup:'; // + group id → '1'(abierto) | '0'(cerrado)

// OLA-1.2: guard CENTRAL de rutas — main.mountRoute reusa la metadata `perm` de NAV[]
// (un solo punto de verdad declarativo; antes dependía de que cada uno de los 24+
// módulos recordara auto-guardarse). Rutas fuera del NAV (perfil) → su propio guard.
export function canAccessRoute(id) {
  const item = NAV.find((i) => i.id === id);
  if (!item) return true;
  return !item.perm || [].concat(item.perm).some(hasPermission);
}

const TITLES = {
  inicio: 'Inicio',
  bandeja: 'Bandeja Inteligente',
  pipeline: 'Pipeline de ventas',
  agenda: 'Agenda',
  reportes: 'Reportes y KPIs',
  contactos: 'Contactos',
  config: 'Disponibilidad de citas',
  resenas: 'Reseñas del sitio',
  banners: 'Banners del sitio',
  contenido: 'Contenido del sitio',
  vehiculos: 'Inventario de vehículos',
  marcas: 'Marcas del inventario',
  aliados: 'Aliados / Concesionarios',
  atributos: 'Atributos del inventario',
  respaldos: 'Respaldos del CRM e inventario',
  usuarios: 'Usuarios y permisos',
  roles: 'Roles y permisos',
  departamentos: 'Departamentos',
  workflows: 'Automatización',
  auditoria: 'Auditoría',
  ajustes: 'Apariencia y SEO',
  hub: 'ALTOR Hub',
  cerebro: 'Base de conocimiento',
  unmatched: 'Consultas sin respuesta',
  // F-6 (gap §3 sec-profile): accesible desde el menú de usuario, no del sidebar.
  perfil: 'Mi perfil',
};

export function mountShell(appRoot) {
  const navButtons = {};

  const brand = el('div', { class: 'sidebar__brand' }, [
    el('span', { class: 'sidebar__logo', text: 'ALTORRA' }),
    el('span', { class: 'sidebar__sub u-caption', text: 'CRM' }),
  ]);
  const nav = el('nav', { class: 'sidebar__nav', 'aria-label': 'Secciones' });
  const NAV_BY_ID = Object.fromEntries(NAV.map((i) => [i.id, i]));
  // perm: string o array (any-of) — '*' pasa siempre vía hasPermission.
  const canSee = (item) => item && (!item.perm || [].concat(item.perm).some(hasPermission));
  function makeNavBtn(item) {
    const btn = el('button', { class: 'navitem', type: 'button', disabled: !item.ready }, [
      iconSpan(item.id, item.icon),
      el('span', { class: 'navitem__label', text: item.label }),
      !item.ready ? el('span', { class: 'navitem__soon', text: 'Pronto' }) : null,
    ]);
    if (item.ready) btn.addEventListener('click', () => { navigate(item.id); closeDrawer(); });
    navButtons[item.id] = btn;
    return btn;
  }
  // Zona PRIMARIA: plana, siempre visible.
  NAV_PRIMARY.map((id) => NAV_BY_ID[id]).filter(canSee).forEach((item) => nav.append(makeNavBtn(item)));
  // Zona SECUNDARIA: grupos colapsables. Un grupo con <2 ítems visibles tras RBAC
  // degenera a PLANO (comité pt.4 — sin acordeón de 1); con 0, no se renderiza.
  NAV_GROUPS.forEach((g) => {
    const items = g.items.map((id) => NAV_BY_ID[id]).filter(canSee);
    if (!items.length) return;
    if (items.length < 2) { items.forEach((item) => nav.append(makeNavBtn(item))); return; }
    let open = true;
    try { open = localStorage.getItem(NAV_GROUP_KEY + g.id) !== '0'; } catch (e) { /* private mode */ }
    const details = el('details', { class: 'navgroup', open });
    details.append(el('summary', { class: 'navgroup__summary' }, [
      iconSpan(g.id, g.icon),
      el('span', { class: 'navitem__label', text: g.label }),
      el('span', { class: 'navgroup__chevron', 'aria-hidden': 'true', html: ICON_CHEVRON }),
    ]));
    items.forEach((item) => details.append(makeNavBtn(item)));
    details.addEventListener('toggle', () => {
      try { localStorage.setItem(NAV_GROUP_KEY + g.id, details.open ? '1' : '0'); } catch (e) { /* private mode */ }
    });
    nav.append(details);
  });
  const sidebar = el('aside', { class: 'sidebar', id: 'app-sidebar' }, [
    brand, nav,
    el('div', { class: 'sidebar__foot u-caption u-faint' }, [`v${APP_VERSION}`]),
  ]);

  const titleH = el('h1', { class: 'topbar__h', text: TITLES.inicio });
  const crumb = el('span', { class: 'topbar__crumb u-caption u-faint', text: store.get().mock ? 'Modo demostración' : '' });
  const title = el('div', { class: 'topbar__title' }, [titleH, crumb]);

  const userBtn = el('button', { class: 'usermenu', type: 'button', 'aria-haspopup': 'menu' }, [
    el('span', { class: 'avatar avatar--sm', 'aria-hidden': 'true', text: initials(displayName()) }),
    el('span', { class: 'usermenu__meta' }, [
      el('span', { class: 'usermenu__name u-truncate', text: displayName() }),
      el('span', { class: 'usermenu__role u-caption u-faint u-truncate', text: displayRole() }),
    ]),
  ]);
  userBtn.addEventListener('click', () => {
    openMenu(userBtn, [
      { value: 'perfil', label: 'Mi perfil', icon: '👤' },
      { divider: true },
      { value: 'logout', label: 'Cerrar sesión', icon: '🚪' },
    ], (it) => {
      if (it.value === 'perfil') navigate('perfil');
      else if (it.value === 'logout') signOutUser();
    }, { title: displayName() });
  });

  // W-11 F1(b): CTA primario global de captura, gateado con el MISMO permiso que
  // la Bandeja (`crm.edit`, ver inbox.ui.js) — sin permiso de edición no se renderiza
  // (evita el CTA que viola RBAC: comité pt.4 "RBAC degenerado"). `el()` ignora null.
  const newLeadBtn = hasPermission('crm.edit')
    ? el('button', { class: 'btn btn--gold btn--sm', type: 'button', 'aria-label': 'Registrar nuevo lead' }, ['＋ Nuevo lead'])
    : null;
  if (newLeadBtn) newLeadBtn.addEventListener('click', () => openQuickLeadForm());

  // W-11 F1(c): hamburguesa del drawer móvil (visible SOLO ≤560px vía CSS) + backdrop.
  const drawerToggle = el('button', {
    class: 'drawer-toggle icon-btn', type: 'button',
    'aria-label': 'Abrir menú', 'aria-expanded': 'false', 'aria-controls': 'app-sidebar',
  }, [el('span', { html: ICON_MENU })]);
  const backdrop = el('div', { class: 'drawer-backdrop', 'aria-hidden': 'true' });

  const topbar = el('header', { class: 'topbar' }, [drawerToggle, title, el('div', { class: 'topbar__actions u-row' }, [newLeadBtn, userBtn])]);
  const outlet = el('main', { class: 'outlet', id: 'outlet' });
  const detailRoot = el('div', { id: 'detail-root' });

  const layout = el('div', { class: 'app-shell' }, [
    sidebar,
    el('div', { class: 'app-main' }, [topbar, outlet]),
    detailRoot,
    backdrop,
  ]);

  clear(appRoot);
  appRoot.removeAttribute('aria-busy');
  appRoot.append(layout);

  // ── W-11 F1(c): controlador del drawer móvil (off-canvas accesible) ──
  // Real, no "rail": foco atrapado mientras abierto; Escape/backdrop/navegar cierran.
  // La TABULABILIDAD del nav off-canvas la maneja el CSS (`visibility:hidden` cerrado en
  // móvil = fuera del tab-order), NO `inert` por JS — así cruzar a desktop NUNCA puede
  // dejar el nav muerto (la media query deja de aplicar y el sidebar vuelve interactivo
  // por construcción, sin depender de que dispare ningún evento de resize).
  const mqMobile = window.matchMedia('(max-width: 560px)');
  let drawerOpen = false;
  let lastFocus = null;
  function trapKey(e) {
    if (e.key === 'Escape') return closeDrawer();
    if (e.key !== 'Tab') return;
    const f = sidebar.querySelectorAll('button:not(:disabled), [href], [tabindex]:not([tabindex="-1"])');
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  function openDrawer() {
    if (drawerOpen || !mqMobile.matches) return;
    drawerOpen = true;
    lastFocus = document.activeElement;
    layout.classList.add('is-drawer-open');
    drawerToggle.setAttribute('aria-expanded', 'true');
    document.addEventListener('keydown', trapKey, true);
    const firstNav = sidebar.querySelector('.navitem:not(:disabled)');
    if (firstNav) setTimeout(() => firstNav.focus(), 60);
  }
  function closeDrawer() {
    if (!drawerOpen) return;
    drawerOpen = false;
    layout.classList.remove('is-drawer-open');
    drawerToggle.setAttribute('aria-expanded', 'false');
    document.removeEventListener('keydown', trapKey, true);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  drawerToggle.addEventListener('click', () => (drawerOpen ? closeDrawer() : openDrawer()));
  backdrop.addEventListener('click', closeDrawer);
  // Al pasar a desktop/tablet, cierra un drawer abierto (resetea aria-expanded/clase).
  // Cosmético: la interactividad del nav en desktop la garantiza el CSS, no este listener.
  mqMobile.addEventListener('change', (e) => { if (!e.matches) closeDrawer(); });

  function setActive(route) {
    Object.entries(navButtons).forEach(([id, btn]) => {
      const on = id === route;
      btn.classList.toggle('is-active', on);
      if (on) btn.setAttribute('aria-current', 'page'); else btn.removeAttribute('aria-current');
    });
    // W-11 F2 (comité pt.2 · regresión BLOQUEANTE): si el ítem activo vive en un grupo
    // colapsado, auto-expándelo — si no, quedaría oculto (un usuario navegando ahí no
    // vería dónde está parado). Gate de no-regresión del rediseño de nav agrupada.
    const activeBtn = navButtons[route];
    if (activeBtn) { const grp = activeBtn.closest('details.navgroup'); if (grp) grp.open = true; }
    titleH.textContent = TITLES[route] || TITLES.inicio;
    // OLA-1.2: breadcrumb de contexto — "Grupo" bajo el título cuando la ruta vive en
    // la zona secundaria ("Administración" bajo "Auditoría"). En mock manda el aviso demo.
    if (!store.get().mock) {
      const g = NAV_GROUPS.find((x) => x.items.includes(route));
      crumb.textContent = g ? g.label : '';
    }
  }

  return { outlet, detailRoot, setActive };
}
