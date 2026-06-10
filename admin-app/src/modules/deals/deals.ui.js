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
  dealTransition, LOST_REASONS,
} from '../../domain/pipeline.js';
import {
  subscribeDeals, updateDealStage, setDealAmount, markWon, markLost,
} from './deals.data.js';
import { getMockDeals, updateMockDeal } from '../../core/mock.js';

export function mountPipeline(root) {
  const ui = { deals: [], loading: true, error: null, sub: null, dragId: null };
  const canEdit = hasPermission('crm.edit');

  const bar = el('div', { class: 'pipeline__bar' });
  const board = el('div', { class: 'pipeline__board', role: 'list', 'aria-label': 'Embudo de ventas' });
  // F6 (§176): espejo del rótulo de la Bandeja — aquí viven las VENTAS activas.
  const hint = el('p', { class: 'u-muted u-caption', style: { margin: '0' } }, [
    'Aquí se trabajan las ventas activas. Los interesados nuevos llegan a la Bandeja.',
  ]);
  const section = el('section', { class: 'pipeline' }, [hint, bar, board]);
  clear(root); root.append(section);

  // ── Acciones (real vs mock) ──
  function patch(id, p) {
    const i = ui.deals.findIndex((d) => d.id === id);
    if (i === -1) return;
    ui.deals[i] = { ...ui.deals[i], ...p };
    if (store.get().mock) updateMockDeal(id, p);
    render();
  }

  /**
   * F8/F9 (§181) — mover de etapa respeta la MATRIZ: adelante con saltos
   * acumula gates en UN mini-prompt; atrás exige razón; vendido es terminal.
   * Los gates son los del espejo (las Rules los re-validan server-side).
   */
  async function doStage(deal, stageId) {
    if (deal.stageId === stageId) return;
    const t = dealTransition(deal.stageId, stageId);
    if (!t.ok) {
      toast(t.error === 'vendido_es_terminal' ? 'Un negocio vendido no se mueve (anulación = admin).' : 'Movimiento no válido', 'error');
      return;
    }
    const needs = [...t.gates];
    if (t.needsReason) needs.push('regressReason');
    const apply = async (gateFields) => {
      const st = stageById(stageId);
      const prevStage = deal.stageId;
      patch(deal.id, { stageId, stageName: st.label, probability: st.prob, ...gateFields, lastActivityAt: new Date().toISOString() });
      if (store.get().mock) { toast('Etapa → ' + st.label, 'ok'); return; }
      try {
        await updateDealStage(deal.id, stageId, deal, gateFields);
        showUndoStage(deal, prevStage, st.label); // F11: deshacer 10s
      } catch (e) {
        patch(deal.id, { stageId: prevStage, stageName: stageById(prevStage).label, probability: probFor(prevStage) });
        toast(e && e.code === 'permission-denied'
          ? 'Movimiento rechazado por las reglas — recarga el portal si tu versión es vieja.'
          : 'No se pudo mover', 'error');
      }
    };
    if (!needs.length) return apply({});
    openGatePrompt(deal, stageId, needs, apply);
  }

  // F11 — snackbar Deshacer ≥10s nombrando el cambio (anti arrastre accidental).
  let _undoBar = null;
  function showUndoStage(deal, prevStageId, newLabel) {
    if (_undoBar) _undoBar.remove();
    const undo = el('button', { class: 'btn btn--soft btn--sm', type: 'button' }, ['Deshacer']);
    const bar = el('div', {
      role: 'status',
      style: {
        position: 'fixed', bottom: '18px', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: '12px', alignItems: 'center', zIndex: '99',
        padding: '10px 14px', borderRadius: '10px',
        background: 'var(--bg-elev, #1c1a17)', border: '1px solid var(--line, #444)',
        boxShadow: '0 6px 24px rgba(0,0,0,.4)',
      },
    }, [el('span', { text: `${(deal.contactName || deal.name || 'Negocio').split(' · ')[0]} → ${newLabel}` }), undo]);
    document.body.appendChild(bar);
    _undoBar = bar;
    const timer = setTimeout(() => { bar.remove(); if (_undoBar === bar) _undoBar = null; }, 10000);
    undo.addEventListener('click', async () => {
      clearTimeout(timer); bar.remove(); if (_undoBar === bar) _undoBar = null;
      // retroceso vía la MISMA matriz: razón automática "deshacer"
      const st = stageById(prevStageId);
      patch(deal.id, { stageId: prevStageId, stageName: st.label, probability: st.prob });
      if (store.get().mock) return;
      try {
        await updateDealStage(deal.id, prevStageId, deal, { regressReason: 'Deshacer (arrastre accidental)' });
      } catch (e) { toast('No se pudo deshacer', 'error'); }
    });
  }

  /**
   * F8/F9 — mini-prompt de GATES acumulados: UN modal pequeño con SOLO los
   * campos que exige la transición (presupuesto de fricción: 1 prompt).
   */
  function openGatePrompt(deal, stageId, needs, apply) {
    const f = {};
    const fields = [];
    const fld = (label, control) => el('label', { class: 'field' }, [el('span', { class: 'field__label', text: label }), control]);

    if (needs.includes('huboTestDrive')) {
      f.huboTestDrive = el('select', { class: 'select' }, [
        el('option', { value: 'si' }, ['Sí, hubo test drive']),
        el('option', { value: 'no' }, ['No alcanzó a probarlo']),
      ]);
      fields.push(fld('¿Hubo test drive?', f.huboTestDrive));
    }
    if (needs.includes('montoApartado')) {
      f.montoApartado = el('input', { class: 'input', type: 'number', min: '0', step: '50000', placeholder: '500000' });
      const def = new Date(Date.now() + 72 * 3600 * 1000);
      f.venceEl = el('input', { class: 'input', type: 'date', value: def.toISOString().slice(0, 10) });
      fields.push(fld('Monto del apartado (COP) *', f.montoApartado), fld('Vence el (default 72h)', f.venceEl));
    }
    if (needs.includes('tipoPago')) {
      f.tipoPago = el('select', { class: 'select' }, [
        el('option', { value: 'contado' }, ['De contado']),
        el('option', { value: 'financiado' }, ['Financiado']),
      ]);
      f.estadoCredito = el('select', { class: 'select' }, [
        el('option', { value: '' }, ['— Estado del crédito —']),
        el('option', { value: 'pre_aprobado' }, ['Pre-aprobado']),
        el('option', { value: 'en_estudio' }, ['En estudio']),
        el('option', { value: 'aprobado' }, ['Aprobado']),
        el('option', { value: 'rechazado' }, ['Rechazado']),
      ]);
      fields.push(fld('Forma de pago *', f.tipoPago), fld('Crédito (si aplica)', f.estadoCredito));
    }
    if (needs.includes('lostReason')) {
      f.lostReason = el('select', { class: 'select' },
        LOST_REASONS.map((r) => el('option', { value: r.id }, [r.label])));
      fields.push(fld('¿Por qué se perdió? *', f.lostReason));
    }
    if (needs.includes('regressReason')) {
      f.regressReason = el('input', { class: 'input', type: 'text', placeholder: '¿Qué pasó? (obligatorio al retroceder)' });
      fields.push(fld('Razón del retroceso *', f.regressReason));
    }

    const err = el('div', { class: 'login__error', role: 'alert', hidden: true });
    const cancel = el('button', { class: 'btn btn--ghost', type: 'button' }, ['Cancelar']);
    const ok = el('button', { class: 'btn btn--gold', type: 'submit' }, ['Mover a ' + stageById(stageId).label]);
    const form = el('form', { class: 'nl-form' }, [...fields, err, el('div', { class: 'nl-actions' }, [cancel, ok])]);
    const overlay = el('div', { class: 'modal-overlay' }, [
      el('div', { class: 'modal' }, [
        el('div', { class: 'modal__head' }, [el('h2', { class: 'modal__title', text: stageById(stageId).label })]),
        form,
      ]),
    ]);
    document.body.appendChild(overlay);
    const close = () => overlay.remove();
    cancel.addEventListener('click', close);
    overlay.addEventListener('mousedown', (e) => { if (e.target === overlay) close(); });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const out = {};
      if (f.huboTestDrive) out.huboTestDrive = f.huboTestDrive.value === 'si';
      if (f.montoApartado) {
        const m = Math.round(Number(f.montoApartado.value) || 0);
        if (!(m > 0)) { err.textContent = 'El monto del apartado es obligatorio.'; err.hidden = false; return; }
        out.montoApartado = m;
        out.venceEl = new Date((f.venceEl.value || new Date().toISOString().slice(0, 10)) + 'T18:00:00-05:00').toISOString();
      }
      if (f.tipoPago) {
        out.tipoPago = f.tipoPago.value;
        if (f.estadoCredito && f.estadoCredito.value) out.estadoCredito = f.estadoCredito.value;
      }
      if (f.lostReason) out.lostReason = f.lostReason.value;
      if (f.regressReason) {
        const r = f.regressReason.value.trim();
        if (!r) { err.textContent = 'Escribe la razón del retroceso.'; err.hidden = false; return; }
        out.regressReason = r;
      }
      close();
      apply(out);
    });
  }

  async function doAmount(deal, amount) {
    patch(deal.id, { amount });
    if (store.get().mock) return;
    try { await setDealAmount(deal.id, amount, deal); } catch (e) { toast('No se pudo guardar el monto', 'error'); }
  }

  // Ganar pasa por la MISMA matriz (gates acumulados hasta vendido).
  async function doWon(deal) {
    const t = dealTransition(deal.stageId, 'vendido');
    if (!t.ok) { toast('Movimiento no válido', 'error'); return; }
    const apply = async (gateFields) => {
      patch(deal.id, { status: 'won', ...gateFields });
      if (store.get().mock) { toast('🎉 ¡Venta ganada!', 'ok'); return; }
      try { await markWon(deal.id, deal, gateFields); toast('🎉 ¡Venta ganada!', 'ok'); }
      catch (e) { toast('No se pudo marcar — revisa los datos requeridos', 'error'); }
    };
    if (!t.gates.length) return apply({});
    openGatePrompt(deal, 'vendido', t.gates, apply);
  }

  async function doLost(deal, reasonId) {
    patch(deal.id, { status: 'lost', lostReason: reasonId });
    if (store.get().mock) { toast('Marcado perdido', 'info'); return; }
    try { await markLost(deal.id, reasonId, deal); toast('Marcado perdido', 'info'); } catch (e) { toast('Error', 'error'); }
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
      return openMenu(anchor, LOST_REASONS.map((r) => ({ value: r.id, label: r.label })), (it) => doLost(deal, it.value), { title: 'Motivo de pérdida' });
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
