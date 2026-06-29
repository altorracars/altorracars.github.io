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
  // ── Colas de la Bandeja (tabs) — semánticos, currentColor (la temperatura
  //    con color vive en el badge de la tarjeta, no en la tab). TODO-52 P1.
  flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  user:  '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  userPlus: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>',
  inbox: '<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
  // ── Vehículos (acciones de tarjeta, toolbar, estados). TODO-52 P1. ──
  copy:  '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  star:  '<polygon points="12 2 15.1 8.6 22 9.3 17 14.1 18.2 21 12 17.6 5.8 21 7 14.1 2 9.3 8.9 8.6 12 2"/>',
  arrowUp:   '<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>',
  arrowDown: '<line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>',
  arrowUpDown: '<path d="m21 16-4 4-4-4"/><path d="M17 20V4"/><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  check: '<polyline points="20 6 9 17 4 12"/>',
  car:   '<path d="M5 13l1.6-4.6A2 2 0 0 1 8.5 7h7a2 2 0 0 1 1.9 1.4L19 13"/><path d="M3 13h18v4a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H6v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><circle cx="7.5" cy="15.5" r="1"/><circle cx="16.5" cy="15.5" r="1"/>',
  fileText: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/>',
  alertTriangle: '<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
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
