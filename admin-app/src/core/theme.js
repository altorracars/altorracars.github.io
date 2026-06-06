// ============================================================
// Tema claro/oscuro. Persiste en localStorage; respeta el sistema
// si el usuario no eligió. Aplica data-theme en <html>.
// ============================================================

import { store } from './store.js';

const KEY = 'altorra-crm-theme';

export function applyInitialTheme() {
  let theme = localStorage.getItem(KEY);
  if (theme !== 'light' && theme !== 'dark') {
    theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.documentElement.dataset.theme = theme;
  store.set({ theme });
}

export function toggleTheme() {
  const next = (document.documentElement.dataset.theme === 'dark') ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem(KEY, next);
  store.set({ theme: next });
  return next;
}
