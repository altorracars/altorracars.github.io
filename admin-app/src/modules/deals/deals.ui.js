// ============================================================
// Pipeline — kanban del embudo de ventas (capa UI).
// Drag-drop entre etapas (+ menú "mover" accesible), forecast ponderado,
// edición de monto inline, ganado/perdido. Optimistic UI + toasts.
// ============================================================

import { el, clear } from '../../core/dom.js';
import { openMenu } from '../../core/popover.js';
import { store } from '../../core/store.js';
import { toast } from '../../core/toast.js';
import { hasPermission } from '../../core/auth.js';
import { initials, copShort, timeAgo } from '../../domain/format.js';
import {
  OPEN_STAGES, stageById, probFor, weighted, forecast, totalValue, groupByStage, isRotting,
} from '../../domain/pipeline.js';
import {
  subscribeDeals, updateDealStage, setDealAmount, markWon, markLost,
} from './deals.data.js';
import { getMockDeals, updateMockDeal } from '../../core/mock.js';

const LOST_REASONS = ['Precio / presupuesto', 'Financiación negada', 'Compró en otro lado', 'No responde', 'Cambió de opinión', 'Otro motivo'];

export function mountPipeline(root) {
  const ui = { deals: [], loading: true, error: null, sub: null, dragId: null };
  const canEdit = hasPermission('crm.edit');

  const bar = el('div', { class: 'pipeline__bar' });
  const board = el('div', { class: 'pipeline__board', role: 'list', 'aria-label': 'Embudo de ventas' });
  const section = el('section', { class: 'pipeline' }, [bar, board]);
  clear(root); root.append(section);

  // ── Acciones (real vs mock) ──
  function patch(id, p) {
    const i = ui.deals.findIndex((d) => d.id === id);
    if (i === -1) return;
    ui.deals[i] = { ...ui.deals[i], ...p };
    if (store.get().mock) updateMockDeal(id, p);
    render();
  }

  async function doStage(deal, stageId) {
    if (deal.stageId === stageId) return;
    const st = stageById(stageId);
    patch(deal.id, { stageId, stageName: st.label, probability: st.prob, lastActivityAt: new Date().toISOString() });
    if (store.get().mock) { toast('Etapa → ' + st.label, 'ok'); return; }
    try { await updateDealStage(deal.id, stageId, deal); } catch (e) { toast('No se pudo mover', 'error'); }
  }

  async function doAmount(deal, amount) {
    patch(deal.id, { amount });
    if (store.get().mock) return;
    try { await setDealAmount(deal.id, amount, deal); } catch (e) { toast('No se pudo guardar el monto', 'error'); }
  }

  async function doWon(deal) {
    patch(deal.id, { status: 'won' });
    if (store.get().mock) { toast('🎉 ¡Venta ganada!', 'ok'); return; }
    try { await markWon(deal.id, deal); toast('🎉 ¡Venta ganada!', 'ok'); } catch (e) { toast('Error', 'error'); }
  }

  async function doLost(deal, reason) {
    patch(deal.id, { status: 'lost', lostReason: reason });
    if (store.get().mock) { toast('Marcado perdido', 'info'); return; }
    try { await markLost(deal.id, reason, deal); toast('Marcado perdido', 'info'); } catch (e) { toast('Error', 'error'); }
  }

  // ── Render ──
  function render() {
    if (ui.loading) return renderSkeleton();
    if (ui.error) return renderState('⚠️', 'No se pudo cargar', ui.error);

    const open = ui.deals.filter((d) => d.status === 'open');
    renderBar(open);
    clear(board);

    if (!open.length) {
      board.append(el('div', { class: 'state' }, [
        el('div', { class: 'state__icon', text: '🎯' }),
        el('div', { class: 'state__title', text: 'Embudo vacío' }),
        el('div', { class: 'state__msg', text: 'Convierte un lead en oportunidad desde la Bandeja para empezar.' }),
      ]));
      return;
    }

    const groups = groupByStage(open);
    OPEN_STAGES.forEach((stage) => {
      const deals = groups[stage.id] || [];
      const sum = deals.reduce((s, d) => s + (Number(d.amount) || 0), 0);
      const col = el('div', { class: 'pcol', 'data-stage': stage.id }, [
        el('div', { class: 'pcol__head' }, [
          el('div', { class: 'u-row u-row--tight' }, [
            el('span', { class: 'pcol__dot', style: { background: stageColor(stage.id) } }),
            el('strong', { text: stage.label }),
            el('span', { class: 'pcol__count', text: String(deals.length) }),
          ]),
          el('span', { class: 'u-caption u-faint', text: `${Math.round(stage.prob * 100)}% · ${copShort(sum) || '$0'}` }),
        ]),
        el('div', { class: 'pcol__drop', 'data-stage': stage.id, role: 'list' }, deals.map(renderCard)),
      ]);
      wireDropZone(col.querySelector('.pcol__drop'), stage.id);
      board.append(col);
    });
  }

  function renderBar(open) {
    const fc = forecast(open);
    const tv = totalValue(open);
    clear(bar);
    bar.append(
      stat('Oportunidades', String(open.length)),
      stat('Valor del embudo', copShort(tv) || '$0'),
      stat('Forecast ponderado', copShort(fc) || '$0', true),
    );
  }
  function stat(label, value, hi) {
    return el('div', { class: 'pstat' + (hi ? ' pstat--hi' : '') }, [
      el('span', { class: 'u-caption u-faint', text: label }),
      el('strong', { class: 'pstat__v', text: value }),
    ]);
  }

  function renderCard(deal) {
    const rot = isRotting(deal);
    const amountEl = el('button', {
      class: 'deal-card__amount', type: 'button', 'data-action': 'amount', title: 'Editar monto',
    }, [deal.amount ? copShort(deal.amount) : '+ monto']);

    const card = el('article', {
      class: 'deal-card' + (rot ? ' is-rotting' : ''), draggable: 'true', tabindex: '0',
      'data-id': deal.id, 'data-stage': deal.stageId, role: 'listitem',
      'aria-label': `${deal.name}, ${Math.round(probFor(deal.stageId) * 100)}%`,
    }, [
      el('div', { class: 'deal-card__top' }, [
        el('span', { class: 'avatar avatar--sm', 'aria-hidden': 'true', text: initials(deal.contactName) }),
        el('span', { class: 'deal-card__name u-grow u-truncate', text: deal.name }),
        rot ? el('span', { class: 'deal-card__rot', title: 'Estancado >14 días', text: '🐌' }) : null,
      ]),
      deal.vehicleName ? el('div', { class: 'u-caption u-muted u-truncate', text: '🚗 ' + deal.vehicleName }) : null,
      el('div', { class: 'deal-card__row' }, [
        amountEl,
        el('span', { class: 'badge badge--gold', text: `${Math.round(probFor(deal.stageId) * 100)}%` }),
      ]),
      el('div', { class: 'deal-card__foot u-caption u-faint' }, [
        el('span', { class: 'u-grow u-truncate', text: deal.ownerName ? '👤 ' + deal.ownerName : 'Sin asesor' }),
        el('span', { text: timeAgo(deal.lastActivityAt) }),
      ]),
      el('div', { class: 'deal-card__actions' }, canEdit ? [
        miniBtn('stage', '↔', 'Mover etapa'),
        miniBtn('won', '✓', 'Marcar ganado'),
        miniBtn('lost', '✕', 'Marcar perdido'),
        miniBtn('open', '⤢', 'Abrir 360'),
      ] : [miniBtn('open', '⤢', 'Abrir 360')]),
    ]);

    card.addEventListener('dragstart', (e) => {
      ui.dragId = deal.id;
      card.classList.add('is-dragging');
      try { e.dataTransfer.setData('text/plain', deal.id); e.dataTransfer.effectAllowed = 'move'; } catch (_) {}
    });
    card.addEventListener('dragend', () => { ui.dragId = null; card.classList.remove('is-dragging'); });

    card.addEventListener('click', (e) => {
      const act = e.target.closest('[data-action]');
      if (act) return handleAction(act.dataset.action, deal, act);
    });
    return card;
  }

  function miniBtn(action, glyph, label) {
    return el('button', { class: 'icon-btn icon-btn--xs', type: 'button', 'data-action': action, title: label, 'aria-label': label, draggable: 'false' }, [glyph]);
  }

  function handleAction(action, deal, anchor) {
    if (action === 'open') return store.set({ detailLeadId: deal.leadId });
    if (action === 'amount') return editAmount(deal, anchor);
    if (action === 'stage') {
      return openMenu(anchor, OPEN_STAGES.map((s) => ({ value: s.id, label: s.label, hint: Math.round(s.prob * 100) + '%', active: s.id === deal.stageId })),
        (it) => doStage(deal, it.value), { title: 'Mover a etapa' });
    }
    if (action === 'won') return doWon(deal);
    if (action === 'lost') {
      return openMenu(anchor, LOST_REASONS.map((r) => ({ value: r, label: r })), (it) => doLost(deal, it.value), { title: 'Motivo de pérdida' });
    }
  }

  function editAmount(deal, anchor) {
    const input = el('input', { class: 'deal-card__amount-input', type: 'text', inputmode: 'numeric', value: deal.amount || '', 'aria-label': 'Monto en COP' });
    anchor.replaceWith(input);
    input.focus(); input.select();
    const commit = () => {
      const val = parseInt(String(input.value).replace(/\D/g, ''), 10) || 0;
      doAmount(deal, val);
    };
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); commit(); } else if (e.key === 'Escape') render(); });
    input.addEventListener('blur', commit);
  }

  function wireDropZone(zone, stageId) {
    zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('is-over'); if (e.dataTransfer) e.dataTransfer.dropEffect = 'move'; });
    zone.addEventListener('dragleave', () => zone.classList.remove('is-over'));
    zone.addEventListener('drop', (e) => {
      e.preventDefault(); zone.classList.remove('is-over');
      const id = ui.dragId || (e.dataTransfer && e.dataTransfer.getData('text/plain'));
      const deal = ui.deals.find((d) => d.id === id);
      if (deal) doStage(deal, stageId);
    });
  }

  // ── Estados ──
  function renderState(icon, title, msg) {
    clear(board);
    board.append(el('div', { class: 'state' }, [
      el('div', { class: 'state__icon', text: icon }),
      el('div', { class: 'state__title', text: title }),
      el('div', { class: 'state__msg', text: msg }),
    ]));
  }
  function renderSkeleton() {
    clear(bar); clear(board);
    OPEN_STAGES.slice(0, 5).forEach(() => {
      board.append(el('div', { class: 'pcol' }, [
        el('div', { class: 'pcol__head' }, [el('span', { class: 'skeleton', style: { width: '60%', height: '14px' } })]),
        el('div', { class: 'pcol__drop' }, [1, 2].map(() => el('div', { class: 'deal-card', style: { pointerEvents: 'none' } }, [el('span', { class: 'skeleton', style: { width: '100%', height: '52px' } })]))),
      ]));
    });
  }

  // ── Carga ──
  function start() {
    if (store.get().mock) {
      ui.deals = getMockDeals();
      ui.loading = false; render();
      return;
    }
    ui.sub = subscribeDeals({
      pageSize: 150,
      onData: (rows) => { ui.deals = rows; ui.loading = false; ui.error = null; render(); },
      onError: (err) => {
        ui.loading = false;
        ui.error = err && err.code === 'permission-denied' ? 'Sin permiso para ver el pipeline.' : 'Revisa tu conexión.';
        render();
      },
    });
  }

  render(); start();
  return function cleanup() { if (ui.sub) ui.sub(); ui.sub = null; };
}

function stageColor(id) {
  const map = {
    nuevo: 'var(--temp-cold)', contactado: 'var(--info)', cita_agendada: '#8A7CFF',
    visito: 'var(--gold-500)', test_drive: 'var(--gold-600)', negociacion: 'var(--warning)', financiacion: 'var(--success)',
  };
  return map[id] || 'var(--ink-400)';
}
