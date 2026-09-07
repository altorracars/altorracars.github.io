// ============================================================
// Toasts (feedback de UI optimista). Sin dependencias.
// ============================================================

const root = () => document.getElementById('toast-root');

const ICONS = {
  ok: '✓',
  error: '⚠',
  info: 'ℹ',
};

export function toast(message, kind = 'info', ms = 3200) {
  const host = root();
  if (!host) return;
  const el = document.createElement('div');
  el.className = `toast toast--${kind}`;
  el.setAttribute('role', kind === 'error' ? 'alert' : 'status');

  const icon = document.createElement('span');
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = ICONS[kind] || ICONS.info;
  const text = document.createElement('span');
  text.className = 'u-grow';
  text.textContent = message;

  el.append(icon, text);
  host.appendChild(el);

  const remove = () => {
    el.classList.add('is-leaving');
    el.addEventListener('animationend', () => el.remove(), { once: true });
  };
  const timer = setTimeout(remove, ms);
  el.addEventListener('click', () => {
    clearTimeout(timer);
    remove();
  });
}

/** OLA-2.4: toast con botón de acción — el patrón "Deshacer" tras un borrado.
 *  A diferencia de toast(), el click en el cuerpo NO lo cierra (evita matar
 *  el undo por accidente); cierra el timeout o el propio botón. */
export function toastAction(message, actionLabel, onAction, ms = 8000) {
  const host = root();
  if (!host) return;
  const el = document.createElement('div');
  el.className = 'toast toast--info';
  el.setAttribute('role', 'status');
  const text = document.createElement('span');
  text.className = 'u-grow';
  text.textContent = message;
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'btn btn--soft btn--sm';
  btn.textContent = actionLabel;
  el.append(text, btn);
  host.appendChild(el);
  const remove = () => {
    el.classList.add('is-leaving');
    el.addEventListener('animationend', () => el.remove(), { once: true });
  };
  const timer = setTimeout(remove, ms);
  btn.addEventListener('click', async () => {
    clearTimeout(timer);
    btn.disabled = true;
    try { await onAction(); } finally { remove(); }
  });
}
