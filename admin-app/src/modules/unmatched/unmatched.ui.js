// ============================================================
// "Lo que no entendí" (PLAN-UNIFICADO F-4, gap §2.B) — UI.
// VISOR de las preguntas que el bot no supo responder. Triage-first:
// bucket "Sin revisar" por defecto (lo accionable), marca vista / promueve a
// FAQ / descarta. Port de admin-unmatched.js al patrón admin-app (visor
// auditoría §243). RBAC: read=unmatched.read · seen/promote=unmatched.promote
// · delete=unmatched.delete (alineado a firestore.rules → no pintamos botones
// que el server rechazaría). ⟦OPUS-4.8 · rev-Fable⟧
// ============================================================

import { el, clear } from '../../core/dom.js';
import { icon } from '../../core/icons.js';
import { confirmDialog } from '../../core/confirm.js';
import { store } from '../../core/store.js';
import { toast } from '../../core/toast.js';
import { navigate } from '../../core/router.js';
import { hasPermission } from '../../core/auth.js';
import { timeAgo } from '../../domain/format.js';
import { subscribeUnmatched, markSeen, markAllSeen, deleteEntry, MOCK_UNMATCHED } from './unmatched.data.js';

const FILTERS = [
  { id: 'unseen', label: 'Sin revisar' },
  { id: 'all', label: 'Todas' },
  { id: 'promoted', label: 'Promovidas' },
];

// createdAt puede venir como Timestamp Firestore o string ISO (port).
function tsISO(ts) {
  if (!ts) return null;
  if (ts.toMillis) return new Date(ts.toMillis()).toISOString();
  const d = new Date(ts);
  return isNaN(d) ? null : d.toISOString();
}

/**
 * @param {HTMLElement} root
 * @param {{onSwitchToKb?: () => void}} [opts] §275: dentro del wrapper de tabs,
 *   "Crear FAQ" salta a la tab FAQs IN-PLACE (callback) en vez de navegar.
 *   Sin opts (montaje directo, back-compat) cae al navigate clásico.
 */
export function mountUnmatched(root, opts = {}) {
  const ui = { entries: [], loaded: false, sub: null, filter: 'unseen' };
  const canRead = hasPermission('unmatched.read');
  const canPromote = hasPermission('unmatched.promote');
  const canDelete = hasPermission('unmatched.delete');

  const wrap = el('section', { class: 'unm' });
  clear(root); root.append(wrap);

  if (!canRead) {
    wrap.append(stateNode(icon('lock'), 'Sin permiso', 'No tienes acceso a esta sección. Pide a un administrador que te la habilite.'));
    return function cleanup() {};
  }

  // ── Optimistic local patch (la UI no espera al server) ──
  function patch(docId, fields) {
    const i = ui.entries.findIndex((e) => e._docId === docId);
    if (i !== -1) { ui.entries[i] = { ...ui.entries[i], ...fields }; render(); }
  }
  function removeLocal(docId) {
    ui.entries = ui.entries.filter((e) => e._docId !== docId); render();
  }

  // ── Acciones ──
  async function doSeen(e) {
    if (!canPromote) return;
    patch(e._docId, { seen: true });
    if (store.get().mock) { toast('Marcada como vista', 'ok'); return; }
    try { await markSeen(e._docId); } catch (err) { patch(e._docId, { seen: false }); toast('No se pudo marcar como vista', 'error'); }
  }

  async function doMarkAll() {
    if (!canPromote) return;
    const pend = ui.entries.filter((e) => !e.seen && !e.promotedToFAQ);
    if (!pend.length) { toast('Nada para marcar — ya estás al día', 'info'); return; }
    if (store.get().mock) { pend.forEach((e) => patch(e._docId, { seen: true })); toast(`${pend.length} marcadas como vistas`, 'ok'); return; }
    try { const n = await markAllSeen(ui.entries); toast(`${n} marcadas como vistas`, 'ok'); }
    catch (err) { toast('No se pudo marcar todas', 'error'); }
  }

  // Promover a FAQ (F-4 2/3): handoff a FAQs vía store.kbPrefill. El módulo
  // `cerebro` lee `kbPrefill` al montar, abre el form prellenado y, al guardar,
  // marca esta query como `promotedToFAQ` (unmatched.data markPromoted).
  // §275: dentro del wrapper de tabs, `onSwitchToKb` cambia a la tab FAQs
  // IN-PLACE (monta cerebro → su maybePrefill toma el store); sin wrapper,
  // fallback al navigate clásico (la ruta `conocimiento` aterriza en FAQs).
  function doPromote(e) {
    if (!canPromote) return;
    store.set({ kbPrefill: { question: e.query || '', keywords: e.keywords || [], unmatchedId: e._docId } });
    if (typeof opts.onSwitchToKb === 'function') opts.onSwitchToKb();
    else navigate('conocimiento');
  }

  async function doDelete(e) {
    if (!canDelete) { toast('Solo super admin puede eliminar', 'error'); return; }
    if (!await confirmDialog({
      title: '¿Eliminar esta query del histórico?',
      message: 'No afecta al cliente, solo limpia tu bandeja.',
      confirmText: 'Eliminar', danger: true,
    })) return;
    const prev = ui.entries.slice();
    removeLocal(e._docId);
    if (store.get().mock) { toast('Query eliminada', 'ok'); return; }
    try { await deleteEntry(e._docId); toast('Query eliminada', 'ok'); }
    catch (err) { ui.entries = prev; render(); toast('No se pudo eliminar', 'error'); }
  }

  // ── Toolbar (filtros + acciones) ──
  const chipsWrap = el('div', { class: 'unm__chips', role: 'tablist', 'aria-label': 'Filtro' });
  const markAllBtn = canPromote ? el('button', { class: 'btn btn--soft btn--sm', type: 'button', html: icon('check') + ' Marcar todas' }) : null;
  if (markAllBtn) markAllBtn.addEventListener('click', doMarkAll);
  const toolbar = el('div', { class: 'unm__toolbar' }, [chipsWrap, el('div', { class: 'u-row u-row--tight' }, [markAllBtn])]);

  const list = el('div', { class: 'unm__list' });
  wrap.append(toolbar, list);

  function counts() {
    let unseen = 0, promoted = 0;
    ui.entries.forEach((e) => { if (e.promotedToFAQ) promoted++; else if (!e.seen) unseen++; });
    return { unseen, promoted, all: ui.entries.length };
  }

  function renderChips() {
    const c = counts();
    clear(chipsWrap);
    FILTERS.forEach((f) => {
      const on = ui.filter === f.id;
      const n = f.id === 'all' ? c.all : f.id === 'promoted' ? c.promoted : c.unseen;
      const chip = el('button', { class: 'chip' + (on ? ' chip--active' : ''), role: 'tab', 'aria-selected': String(on), type: 'button' }, [
        el('span', { text: f.label }),
        el('span', { class: 'chip__count', text: String(n) }),
      ]);
      chip.addEventListener('click', () => { ui.filter = f.id; render(); });
      chipsWrap.append(chip);
    });
  }

  function visible() {
    if (ui.filter === 'all') return ui.entries;
    if (ui.filter === 'promoted') return ui.entries.filter((e) => !!e.promotedToFAQ);
    return ui.entries.filter((e) => !e.seen && !e.promotedToFAQ);
  }

  function entryRow(e) {
    const status = e.promotedToFAQ
      ? el('span', { class: 'badge badge--ok u-ico-text', html: icon('check') + ' Promovida' })
      : e.seen ? el('span', { class: 'badge', text: 'Vista' })
        : el('span', { class: 'badge badge--gold', text: 'Nueva' });
    const sentiment = e.sentiment === 'negative' ? el('span', { class: 'badge badge--danger', text: 'Negativo' })
      : e.sentiment === 'positive' ? el('span', { class: 'badge badge--ok', text: 'Positivo' }) : null;
    const iso = tsISO(e.createdAt);

    const actions = [];
    if (canPromote && !e.seen && !e.promotedToFAQ) {
      const b = el('button', { class: 'btn btn--ghost btn--sm', type: 'button', title: 'Marcar como vista', html: icon('eye') + ' Vista' });
      b.addEventListener('click', () => doSeen(e)); actions.push(b);
    }
    if (canPromote) {
      const b = e.promotedToFAQ
        ? el('button', { class: 'btn btn--ghost btn--sm', type: 'button', disabled: true, html: icon('check') + ' Ya en KB' })
        : el('button', { class: 'btn btn--soft btn--sm', type: 'button', html: icon('plus') + ' Crear FAQ' });
      if (!e.promotedToFAQ) b.addEventListener('click', () => doPromote(e));
      actions.push(b);
    }
    if (canDelete) {
      const b = el('button', { class: 'btn btn--ghost btn--sm', type: 'button', title: 'Eliminar', 'aria-label': 'Eliminar', html: icon('trash') });
      b.addEventListener('click', () => doDelete(e)); actions.push(b);
    }

    const kws = (e.keywords && e.keywords.length)
      ? el('div', { class: 'unm__kws' }, e.keywords.map((k) => el('span', { class: 'unm__kw', text: k })))
      : null;

    return el('article', { class: 'unm__entry' }, [
      el('div', { class: 'unm__entry-head' }, [
        el('div', { class: 'unm__entry-meta u-row u-row--tight' }, [
          status, sentiment,
          el('span', { class: 'u-caption u-faint', text: iso ? timeAgo(iso) : '' }),
          e.sourcePage ? el('span', { class: 'u-caption u-faint u-ico-text', title: e.sourcePage }, [el('span', { class: 'u-ico', 'aria-hidden': 'true', html: icon('externalLink') }), el('span', { text: e.sourcePage })]) : null,
        ]),
        el('div', { class: 'unm__entry-actions u-row u-row--tight' }, actions),
      ]),
      el('div', { class: 'unm__query', text: e.query || '' }),
      kws,
    ]);
  }

  function render() {
    renderChips();
    clear(list);
    if (!ui.loaded) { list.append(el('div', { class: 'state' }, [el('div', { class: 'state__msg', text: 'Cargando…' })])); return; }
    if (!ui.entries.length) {
      list.append(stateNode(icon('checkCircle'), 'Sin preguntas sin responder', 'El bot está respondiendo bien. Cuando algo no lo entienda, aparecerá aquí como señal de venta a recuperar.'));
      return;
    }
    const rows = visible();
    if (!rows.length) {
      list.append(stateNode(icon('search'), 'Nada en este filtro', ui.filter === 'unseen' ? '¡Bandeja al día! No hay preguntas sin revisar.' : 'Sin registros en este filtro.'));
      return;
    }
    rows.forEach((e) => list.append(entryRow(e)));
  }

  function stateNode(glyph, title, msg) {
    return el('div', { class: 'state' }, [
      el('div', { class: 'state__icon', 'aria-hidden': 'true', html: glyph }),
      el('div', { class: 'state__title', text: title }),
      el('div', { class: 'state__msg', text: msg }),
    ]);
  }

  // ── Boot ──
  if (store.get().mock) {
    ui.entries = MOCK_UNMATCHED.slice(); ui.loaded = true; render();
  } else {
    render();
    ui.sub = subscribeUnmatched(
      (l) => { ui.entries = l; ui.loaded = true; render(); },
      (e) => { ui.loaded = true; toast(e && e.code === 'permission-denied' ? 'Sin permiso para ver esta sección.' : 'No se pudo cargar.', 'error'); render(); },
    );
  }

  return function cleanup() { if (ui.sub) ui.sub(); ui.sub = null; };
}
