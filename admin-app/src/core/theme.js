// ============================================================
// Tema del panel = DARK-ONLY (mandato de marca TODO-52 §7: Altorra
// Cars es oscuro). No hay toggle ni persistencia de modo: se fija
// data-theme="dark" en <html>. El accent picker fue ELIMINADO
// (§219-next: oro FIJO de marca — "cambiar color del panel = irrelevante").
// Multi-tenancy DESCARTADA (§FASE-B); clonar por empresa = templatabilidad P3.
// ============================================================

import { store } from './store.js';

export function applyInitialTheme() {
  document.documentElement.dataset.theme = 'dark';
  store.set({ theme: 'dark' });
}
