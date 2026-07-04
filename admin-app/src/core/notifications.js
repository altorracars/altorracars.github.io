// ============================================================
// OLA-2.2 — Campana de notificaciones IN-APP (topbar).
// Registro persistente (localStorage, últimas 20) de los MISMOS
// eventos que FCM: hoy el push foreground era un toast de 9s que
// se perdía si el asesor no miraba; ahora queda en la campana con
// badge de no-leídas + dropdown (popover del DS) + deep-link a la
// ruta del evento. fcm.js alimenta via pushNotification().
// Abrir el dropdown marca todo como leído (patrón inbox estándar).
// ============================================================

import { el } from './dom.js';
import { icon } from './icons.js';
import { openMenu } from './popover.js';
import { navigate } from './router.js';
import { timeAgo } from '../domain/format.js';

const KEY = 'altorra:notifs';
const MAX = 20;

let badgeEl = null;

function read() {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; }
}
function write(list) {
  try { localStorage.setItem(KEY, JSON.stringify(list.slice(-MAX))); } catch { /* modo privado */ }
}

function renderBadge() {
  if (!badgeEl) return;
  const n = read().filter((x) => !x.read).length;
  badgeEl.textContent = n > 9 ? '9+' : String(n);
  badgeEl.hidden = n === 0;
}

/** Registra un evento en la campana (llamado por fcm.js y quien lo necesite). */
export function pushNotification({ title, body, route } = {}) {
  const list = read();
  list.push({
    id: 'n_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    title: title || 'Notificación', body: body || '',
    route: route || 'hub', at: new Date().toISOString(), read: false,
  });
  write(list);
  renderBadge();
}

/** Construye la campana del topbar (botón + badge + dropdown). */
export function createNotificationBell() {
  badgeEl = el('span', { class: 'bell__badge', hidden: true });
  const btn = el('button', {
    class: 'icon-btn bell', type: 'button',
    'aria-label': 'Notificaciones', 'aria-haspopup': 'menu', html: icon('bell'),
  });
  btn.append(badgeEl);
  btn.addEventListener('click', () => {
    const list = read().slice().reverse();
    const items = list.length
      ? list.slice(0, 10).map((n) => ({
          value: n, iconId: 'bell',
          label: n.body ? `${n.title} — ${n.body}` : n.title,
          hint: timeAgo(n.at),
        }))
      : [{ value: null, label: 'Sin notificaciones por ahora', hint: '' }];
    openMenu(btn, items, (it) => { if (it.value && it.value.route) navigate(it.value.route); }, { title: 'Notificaciones' });
    if (list.length) {
      write(read().map((n) => ({ ...n, read: true })));
      renderBadge();
    }
  });
  renderBadge();
  return btn;
}
