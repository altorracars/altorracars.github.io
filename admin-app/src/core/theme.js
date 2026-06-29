// ============================================================
// Tema del panel = DARK-ONLY (mandato de marca TODO-52 §7: Altorra
// Cars es oscuro). No hay toggle ni persistencia de modo: se fija
// data-theme="dark" en <html>. La paleta de ACENTO (oro/etc.) sí es
// configurable y vive aparte en modules/ajustes (.theme-accent-*).
// La capability "tema permitido" por-tenant llegará con multi-tenancy.
// ============================================================

import { store } from './store.js';

export function applyInitialTheme() {
  document.documentElement.dataset.theme = 'dark';
  store.set({ theme: 'dark' });
}
