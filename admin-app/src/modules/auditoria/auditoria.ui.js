// ============================================================
// Auditoría (PLAN-UNIFICADO F-2 §242, gap §2.A) — UI.
// VISOR read-only de `auditLog`: lista cronológica con buscador + filtro por
// acción + filtro por usuario. NO borra (el log es inmutable; la gestión/borrado
// es acción destructiva super_admin, fuera del visor v1). RBAC: audit.read.
// Idioma de filas (como Contactos/Usuarios). ⟦OPUS-4.8 · rev-Fable⟧
// ============================================================

import { el, clear } from '../../core/dom.js';
import { icon } from '../../core/icons.js';
import { navIcon } from '../../core/layout/nav-icons.js';
import { store } from '../../core/store.js';
import { toast } from '../../core/toast.js';
import { hasPermission } from '../../core/auth.js';
import { timeAgo } from '../../domain/format.js';
import { ACTION_LABELS, actionLabel, actionEmoji, subscribeAuditLog, MOCK_AUDIT } from './auditoria.data.js';

function tsDate(ts) {
  if (!ts) return null;
  if (ts.toMillis) return new Date(ts.toMillis());
  const d = new Date(ts);
  return isNaN(d) ? null : d;
}

export function mountAuditoria(root) {
  const ui = { entries: [], loaded: false, sub: null, search: '', fAction: '', fUser: '' };
  const canRead = hasPermission('audit.read');

  const wrap = el('section', { class: 'aud' });
  clear(root); root.append(wrap);

  if (!canRead) {
    wrap.append(el('div', { class: 'state' }, [
      el('div', { class: 'state__icon', 'aria-hidden': 'true', html: icon('lock') }),
      el('div', { class: 'state__title', text: 'Sin permiso' }),
      el('div', { class: 'state__msg', text: 'Necesitas el permiso audit.read para ver la auditoría.' }),
    ]));
    return function cleanup() {};
  }

  /* ── Fila ────────────────────────────────────────────────── */
  function row(e) {
    const when = tsDate(e.timestamp);
    return el('div', { class: 'aud-row' }, [
      el('span', { class: 'aud-row__icon', 'aria-hidden': 'true', text: actionEmoji(e.action) }),
      el('div', { class: 'aud-row__main' }, [
        el('span', { class: 'aud-row__line u-truncate' }, [
          el('strong', { text: (e.user || 'sistema').split('@')[0] }),
          el('span', { text: ' ' + actionLabel(e.action) + (e.target ? ' ' : '') }),
          e.target ? el('span', { class: 'aud-row__target', text: e.target }) : null,
        ]),
        e.details ? el('span', { class: 'aud-row__sub u-caption u-faint u-truncate', text: e.details }) : null,
      ]),
      el('span', { class: 'aud-row__time u-caption u-faint', title: when ? when.toLocaleString('es-CO') : '', text: when ? timeAgo(when.toISOString()) : '' }),
    ]);
  }

  /* ── Toolbar persistente ─────────────────────────────────── */
  const countEl = el('span', { class: 'u-caption u-faint' });
  const searchInput = el('input', { type: 'search', placeholder: 'Buscar por usuario, objetivo o detalle…', 'aria-label': 'Buscar en auditoría' });
  let searchTimer = null;
  searchInput.addEventListener('input', () => { clearTimeout(searchTimer); searchTimer = setTimeout(() => { ui.search = searchInput.value; renderList(); }, 180); });
  const search = el('div', { class: 'search' }, [el('span', { class: 'search__ico', 'aria-hidden': 'true', html: icon('search') }), searchInput]);

  const actionSel = el('select', { class: 'select aud-filter', 'aria-label': 'Filtrar por acción' });
  actionSel.addEventListener('change', () => { ui.fAction = actionSel.value; renderList(); });
  const userSel = el('select', { class: 'select aud-filter', 'aria-label': 'Filtrar por usuario' });
  userSel.addEventListener('change', () => { ui.fUser = userSel.value; renderList(); });

  const toolbar = el('div', { class: 'aud-toolbar' }, [
    search, actionSel, userSel,
    el('div', { class: 'u-row u-row--tight' }, [countEl]),
  ]);
  const list = el('div', { class: 'aud-list' });
  wrap.append(toolbar, list);

  function syncFilters() {
    const actions = [...new Set(ui.entries.map((e) => e.action).filter(Boolean))].sort();
    const users = [...new Set(ui.entries.map((e) => e.user).filter(Boolean))].sort();
    const cur = ui.fAction; const curU = ui.fUser;
    clear(actionSel);
    actionSel.append(el('option', { value: '', text: 'Todas las acciones' }));
    actions.forEach((a) => actionSel.append(el('option', { value: a, text: ACTION_LABELS[a] || a })));
    actionSel.value = cur;
    clear(userSel);
    userSel.append(el('option', { value: '', text: 'Todos los usuarios' }));
    users.forEach((u) => userSel.append(el('option', { value: u, text: (u || '').split('@')[0] })));
    userSel.value = curU;
  }

  function filtered() {
    const q = ui.search.trim().toLowerCase();
    return ui.entries.filter((e) => {
      if (ui.fAction && e.action !== ui.fAction) return false;
      if (ui.fUser && e.user !== ui.fUser) return false;
      if (!q) return true;
      return (`${e.user || ''} ${e.target || ''} ${e.details || ''} ${actionLabel(e.action)}`).toLowerCase().includes(q);
    });
  }

  function renderList() {
    if (!ui.loaded) { clear(list); list.append(el('div', { class: 'state' }, [el('div', { class: 'state__msg', text: 'Cargando auditoría…' })])); return; }
    const rows = filtered();
    const filtering = ui.search.trim() || ui.fAction || ui.fUser;
    countEl.textContent = filtering ? `${rows.length} de ${ui.entries.length}` : `${ui.entries.length} registro${ui.entries.length === 1 ? '' : 's'}`;
    clear(list);
    if (!ui.entries.length) {
      list.append(el('div', { class: 'state' }, [
        el('div', { class: 'state__icon', 'aria-hidden': 'true', html: navIcon('auditoria') }),
        el('div', { class: 'state__title', text: 'Sin actividad registrada' }),
        el('div', { class: 'state__msg', text: 'Las acciones administrativas aparecerán aquí.' }),
      ]));
      return;
    }
    if (!rows.length) {
      list.append(el('div', { class: 'state' }, [el('div', { class: 'state__icon', 'aria-hidden': 'true', html: icon('search') }), el('div', { class: 'state__title', text: 'Sin resultados' })]));
      return;
    }
    rows.forEach((e) => list.append(row(e)));
  }

  /* ── Boot ────────────────────────────────────────────────── */
  if (store.get().mock) {
    ui.entries = MOCK_AUDIT.slice(); ui.loaded = true; syncFilters(); renderList();
  } else {
    renderList();
    ui.sub = subscribeAuditLog(
      (l) => { ui.entries = l; ui.loaded = true; syncFilters(); renderList(); },
      (e) => { ui.loaded = true; toast(e && e.code === 'permission-denied' ? 'Sin permiso para ver la auditoría.' : 'No se pudo cargar la auditoría.', 'error'); renderList(); },
    );
  }

  return function cleanup() {
    if (ui.sub) ui.sub(); ui.sub = null;
    clearTimeout(searchTimer);
  };
}
