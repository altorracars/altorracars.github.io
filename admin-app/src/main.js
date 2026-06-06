// ============================================================
// Altorra CRM · Bandeja Inteligente — punto de entrada.
// Boot → (login | app). Modo ?mock=1 = demo sin Firebase.
// ============================================================

import './core/design-system/tokens.css';
import './core/design-system/crm-tokens.css';
import './core/design-system/base.css';
import './core/design-system/components.css';
import './styles/shell.css';
import './styles/login.css';
import './styles/inbox.css';
import './styles/contacts.css';

import { store } from './core/store.js';
import { applyInitialTheme } from './core/theme.js';
import { initAuth } from './core/auth.js';
import { mountShell } from './core/layout/shell.js';
import { mountLogin } from './core/layout/login.js';
import { mountInbox } from './modules/inbox/inbox.ui.js';
import { mountDetailPanel } from './modules/contacts/contacts.ui.js';

const appRoot = document.getElementById('app');
applyInitialTheme();

const MOCK = new URLSearchParams(location.search).get('mock') === '1';

let screen = null; // 'login' | 'app'
let cleanupInbox = null;

function teardownApp() {
  if (cleanupInbox) { cleanupInbox(); cleanupInbox = null; }
}

function renderScreen(s) {
  if (!s.ready) return; // mantiene el boot-splash
  if (s.user && screen !== 'app') {
    screen = 'app';
    const { outlet, detailRoot } = mountShell(appRoot);
    cleanupInbox = mountInbox(outlet);
    mountDetailPanel(detailRoot);
  } else if (!s.user && screen !== 'login') {
    teardownApp();
    screen = 'login';
    store.set({ detailLeadId: null });
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
