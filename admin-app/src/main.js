// ============================================================
// Altorra CRM — punto de entrada.
// Boot → (login | app). App = shell + módulo por ruta. ?mock=1 = demo.
// ============================================================

import './core/design-system/tokens.css';
import './core/design-system/crm-tokens.css';
import './core/design-system/base.css';
import './core/design-system/components.css';
import './styles/shell.css';
import './styles/login.css';
import './styles/inbox.css';
import './styles/contacts.css';
import './styles/pipeline.css';
import './styles/agenda.css';
import './styles/capture.css';
import './styles/reportes.css';
import './styles/contactos.css';
import './styles/config.css';
import './styles/reviews.css';
import './styles/banners.css';
import './styles/brands.css';
import './styles/dealers.css';
import './styles/lists.css';
import './styles/backup.css';
import './styles/vehicles.css';
import './styles/usuarios.css';

import { store } from './core/store.js';
import { applyInitialTheme } from './core/theme.js';
import { initAuth } from './core/auth.js';
import { currentRoute, onRouteChange } from './core/router.js';
import { mountShell } from './core/layout/shell.js';
import { mountLogin } from './core/layout/login.js';
import { mountInbox } from './modules/inbox/inbox.ui.js';
import { mountPipeline } from './modules/deals/deals.ui.js';
import { mountAgenda } from './modules/agenda/agenda.ui.js';
import { mountReportes } from './modules/reportes/reportes.ui.js';
import { mountContactos } from './modules/contacts/contacts.list.js';
import { mountDetailPanel } from './modules/contacts/contacts.ui.js';
import { mountConfig } from './modules/config/config.ui.js';
import { mountReviews } from './modules/reviews/reviews.ui.js';
import { mountBanners } from './modules/banners/banners.ui.js';
import { mountBrands } from './modules/brands/brands.ui.js';
import { mountDealers } from './modules/dealers/dealers.ui.js';
import { mountLists } from './modules/lists/lists.ui.js';
import { mountBackup } from './modules/backup/backup.ui.js';
import { mountVehicles } from './modules/vehicles/vehicles.ui.js';
import { mountCmsDinamico } from './modules/cms-dinamico/cms.ui.js';
import { mountUsuarios } from './modules/usuarios/usuarios.ui.js';

const appRoot = document.getElementById('app');
applyInitialTheme();

const MOCK = new URLSearchParams(location.search).get('mock') === '1';
const MODULES = { bandeja: mountInbox, pipeline: mountPipeline, agenda: mountAgenda, reportes: mountReportes, contactos: mountContactos, config: mountConfig, resenas: mountReviews, banners: mountBanners, contenido: mountCmsDinamico, vehiculos: mountVehicles, marcas: mountBrands, aliados: mountDealers, atributos: mountLists, respaldos: mountBackup, usuarios: mountUsuarios };

let screen = null; // 'login' | 'app'
let shell = null;
let cleanupModule = null;
let mountedRoute = null;
let offRoute = null;

function mountRoute(name) {
  if (!shell || name === mountedRoute) return;
  if (cleanupModule) { cleanupModule(); cleanupModule = null; }
  if (store.get().detailLeadId) store.set({ detailLeadId: null });
  const fn = MODULES[name] || mountInbox;
  cleanupModule = fn(shell.outlet) || null;
  shell.setActive(name);
  mountedRoute = name;
}

function enterApp() {
  shell = mountShell(appRoot);
  mountDetailPanel(shell.detailRoot);
  mountRoute(currentRoute());
  offRoute = onRouteChange(mountRoute);
}

function teardownApp() {
  if (cleanupModule) { cleanupModule(); cleanupModule = null; }
  if (offRoute) { offRoute(); offRoute = null; }
  shell = null; mountedRoute = null;
}

function renderScreen(s) {
  if (!s.ready) return; // mantiene el boot-splash
  if (s.user && screen !== 'app') {
    screen = 'app';
    enterApp();
  } else if (!s.user && screen !== 'login') {
    teardownApp();
    screen = 'login';
    if (s.detailLeadId) store.set({ detailLeadId: null });
    mountLogin(appRoot);
  }
}

store.subscribe(renderScreen);

if (MOCK) {
  store.set({
    mock: true, ready: true,
    user: { uid: 'u_ceo', email: 'demo@altorra.local' },
    profile: { nombre: 'Rodrigo (CEO)', cargo: 'CEO', rol: 'super_admin' },
    permissions: ['*'],
  });
} else {
  initAuth();
}
