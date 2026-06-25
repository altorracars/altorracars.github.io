// ============================================================
// Pantalla de login (Firebase Auth, email/contraseña).
// ============================================================

import { el, clear } from '../dom.js';
import { store } from '../store.js';
import { signIn } from '../auth.js';

// F-6 cutover §1 — aviso de re-login para quien venía del admin viejo.
// admin.html y admin-app son MISMO ORIGEN → localStorage compartido: el admin
// viejo deja marcadores aquí. (El port FCM nuevo usa `altorra_crm_fcm_prompted_at`
// — distinto a propósito — así estos NO son falsos positivos del portal nuevo.)
const LEGACY_MARKERS = ['altorra_admin_pwa_installed', 'altorra_admin_pwa_welcomed', 'altorra_fcm_prompted_at'];
const MIGRATION_DISMISS_KEY = 'altorra_crm_migration_notice_dismissed';

function legacyUserDetected() {
  try {
    if (localStorage.getItem(MIGRATION_DISMISS_KEY) === '1') return false;
    return LEGACY_MARKERS.some((k) => localStorage.getItem(k) != null);
  } catch { return false; }
}

function dismissMigrationNotice() {
  try { localStorage.setItem(MIGRATION_DISMISS_KEY, '1'); } catch { /* noop */ }
}

function migrationBanner() {
  if (!legacyUserDetected()) return null;
  const close = el('button', { class: 'login__notice-x', type: 'button', 'aria-label': 'Descartar aviso', text: '✕' });
  const banner = el('div', { class: 'login__notice', role: 'status' }, [
    el('span', { class: 'login__notice-icon', 'aria-hidden': 'true', text: '✨' }),
    el('div', { class: 'login__notice-body' }, [
      el('p', { class: 'login__notice-title', text: 'Renovamos el panel de Altorra' }),
      el('p', { class: 'login__notice-text u-caption', text: 'Por la actualización necesitás iniciar sesión de nuevo, con tu correo y contraseña de siempre.' }),
    ]),
    close,
  ]);
  close.addEventListener('click', () => { dismissMigrationNotice(); banner.remove(); });
  return banner;
}

export function mountLogin(appRoot) {
  const email = el('input', { class: 'input', type: 'email', placeholder: 'correo@altorracars.com', autocomplete: 'username', required: true, 'aria-label': 'Correo' });
  const pass = el('input', { class: 'input', type: 'password', placeholder: 'Contraseña', autocomplete: 'current-password', required: true, 'aria-label': 'Contraseña' });
  const error = el('div', { class: 'login__error', role: 'alert', hidden: true });
  const btn = el('button', { class: 'btn btn--gold btn--block', type: 'submit' }, ['Entrar']);

  const form = el('form', { class: 'login__form' }, [
    el('label', { class: 'field' }, [el('span', { class: 'field__label', text: 'Correo' }), email]),
    el('label', { class: 'field' }, [el('span', { class: 'field__label', text: 'Contraseña' }), pass]),
    error,
    btn,
  ]);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    error.hidden = true;
    btn.disabled = true;
    btn.textContent = 'Entrando…';
    try {
      await signIn(email.value, pass.value);
      // onAuthStateChanged monta el shell. Ya migró → no volver a mostrar el aviso.
      dismissMigrationNotice();
    } catch (err) {
      error.textContent = store.get().authError || 'No se pudo iniciar sesión.';
      error.hidden = false;
      btn.disabled = false;
      btn.textContent = 'Entrar';
    }
  });

  const card = el('div', { class: 'login surface' }, [
    el('div', { class: 'login__brand' }, [
      el('span', { class: 'login__logo', text: 'ALTORRA' }),
      el('span', { class: 'login__tag u-caption u-faint', text: 'CRM · Bandeja Inteligente' }),
    ]),
    el('h1', { class: 'login__title', text: 'Bienvenido' }),
    el('p', { class: 'login__lead u-muted', text: 'Inicia sesión para gestionar tus clientes.' }),
    migrationBanner(),
    form,
    el('div', { class: 'login__foot u-caption u-faint', text: 'Acceso restringido al equipo de Altorra Cars.' }),
  ]);

  clear(appRoot);
  appRoot.removeAttribute('aria-busy');
  appRoot.append(el('div', { class: 'login-wrap' }, [card]));
  setTimeout(() => email.focus(), 50);
}
