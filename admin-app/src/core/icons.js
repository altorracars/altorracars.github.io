// ============================================================
// Íconos de UI (acciones/estados) en SVG inline — mismo lenguaje Lucide/Feather
// que core/layout/nav-icons.js (viewBox 24, currentColor, trazo redondeado, sin
// librería). Reemplaza los emoji de los botones de acción (✏️🗑＋👁✉️) por íconos
// premium y CONSISTENTES. TODO-52 P1 "se ve hecho por IA → premium".
//
// `icon(id)` → string `<svg>…</svg>` (o '' si no existe). `iconBtn()` arma un
// <button> con ícono + label opcional; `iconEl()` un <span> con el ícono (para
// inyectar en botones existentes vía html confiable de el()).
// ============================================================

import { el } from './dom.js';

const P = {
  edit:  '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z"/>',
  trash: '<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>',
  plus:  '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  eye:   '<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/>',
  eyeOff: '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>',
  mail:  '<rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22 6 12 13 2 6"/>',
  lock:  '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  unlock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>',
  zap:   '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
};

/** Devuelve el `<svg>` de un id como string, o '' si no existe (fallback seguro). */
export function icon(id) {
  const inner = P[id];
  if (!inner) return '';
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" '
       + 'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + inner + '</svg>';
}

/** <span class="btn__ico"> con el ícono inline (html confiable — set propio, sin datos). */
export function iconEl(id) {
  return el('span', { class: 'btn__ico', html: icon(id) });
}

/**
 * Botón con ícono SVG + label opcional. Mantiene las clases/handlers del callsite.
 * @param {{icon:string,label?:string,class?:string,onClick?:Function,ariaLabel?:string,title?:string,type?:string}} o
 */
export function iconBtn(o) {
  const btn = el('button', {
    class: o.class || 'btn btn--soft btn--sm',
    type: o.type || 'button',
    'aria-label': o.ariaLabel || (o.label ? null : o.title) || null,
    title: o.title || null,
  }, o.label ? [iconEl(o.icon), o.label] : [iconEl(o.icon)]);
  if (o.onClick) btn.addEventListener('click', o.onClick);
  return btn;
}
