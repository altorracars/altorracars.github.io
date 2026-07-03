// ============================================================
// Popover/menú anclado (acciones inline: asignar, cambiar estado).
// Accesible: foco al abrir, Escape cierra, click-fuera cierra.
// ============================================================

import { el } from './dom.js';
import { icon } from './icons.js';

let active = null;

function onDocClick(e) {
  if (active && !active.contains(e.target)) closePopover();
}
function onKey(e) {
  if (e.key === 'Escape') { closePopover(); }
}

export function closePopover() {
  if (!active) return;
  active.remove();
  active = null;
  document.removeEventListener('mousedown', onDocClick, true);
  window.removeEventListener('keydown', onKey, true);
}

export function openMenu(anchor, items, onPick, opts = {}) {
  closePopover();
  const menu = el('div', { class: 'popover', role: 'menu' });
  if (opts.title) menu.append(el('div', { class: 'popover__title', text: opts.title }));
  items.forEach((it) => {
    if (it.divider) { menu.append(el('div', { class: 'popover__divider' })); return; }
    const item = el('button', {
      class: 'popover__item' + (it.active ? ' is-active' : ''),
      type: 'button', role: 'menuitem',
    }, [
      // OLA-1.6: iconId = SVG del set (icons.js); `icon` texto/emoji queda como fallback legacy.
      it.iconId ? el('span', { class: 'popover__icon u-ico', 'aria-hidden': 'true', html: icon(it.iconId) })
        : (it.icon ? el('span', { class: 'popover__icon', text: it.icon }) : null),
      el('span', { class: 'u-grow u-truncate', text: it.label }),
      it.hint ? el('span', { class: 'popover__hint u-caption', text: it.hint }) : null,
    ]);
    item.addEventListener('click', (e) => { e.stopPropagation(); closePopover(); onPick(it); });
    menu.append(item);
  });

  document.body.append(menu);
  position(menu, anchor);
  active = menu;
  setTimeout(() => {
    document.addEventListener('mousedown', onDocClick, true);
    window.addEventListener('keydown', onKey, true);
  }, 0);
  const first = menu.querySelector('.popover__item');
  if (first) first.focus();
}

function position(menu, anchor) {
  const r = anchor.getBoundingClientRect();
  const mw = menu.offsetWidth;
  const mh = menu.offsetHeight;
  let top = r.bottom + 6;
  let left = r.right - mw;
  if (left < 8) left = 8;
  if (left + mw > window.innerWidth - 8) left = window.innerWidth - mw - 8;
  if (top + mh > window.innerHeight - 8) top = r.top - mh - 6;
  menu.style.top = `${Math.max(8, top)}px`;
  menu.style.left = `${Math.max(8, left)}px`;
}
