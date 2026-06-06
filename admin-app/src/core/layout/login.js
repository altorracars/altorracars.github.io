// ============================================================
// Pantalla de login (Firebase Auth, email/contraseña).
// ============================================================

import { el, clear } from '../dom.js';
import { store } from '../store.js';
import { signIn } from '../auth.js';

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
      // onAuthStateChanged monta el shell.
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
    form,
    el('div', { class: 'login__foot u-caption u-faint', text: 'Acceso restringido al equipo de Altorra Cars.' }),
  ]);

  clear(appRoot);
  appRoot.removeAttribute('aria-busy');
  appRoot.append(el('div', { class: 'login-wrap' }, [card]));
  setTimeout(() => email.focus(), 50);
}
