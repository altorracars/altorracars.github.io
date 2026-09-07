// ============================================================
// Workflows / Automatización (PLAN-UNIFICADO F-2 §242, gap §2.A) — UI.
// Gestión de las reglas predefinidas: toggle (solo exec:'toggle') + visor de
// historial (automationLog). RBAC: workflows.read para ver; workflows.edit ya
// está mapeado al doc en rules (OLA-0.4). El MOTOR corre en el SERVIDOR
// (crmHourlyJob: runCrmSlaSweep honra el toggle + citaSweep siempre activa).
// exec:'server' se pinta como "Siempre activa · servidor" (sin switch).
// ⟦FABLE-5 OLA-0.4⟧
// ============================================================

import { el, clear } from '../../core/dom.js';
import { icon, iconEl } from '../../core/icons.js';
import { store } from '../../core/store.js';
import { toast } from '../../core/toast.js';
import { hasPermission } from '../../core/auth.js';
import { writeAudit } from '../../core/audit.js';
import { timeAgo } from '../../domain/format.js';
import { friendlyError } from '../../core/errors.js';
import {
  BUILT_IN_RULES, TRIGGER_LABELS, effectiveEnabled,
  subscribeRuleStates, saveRuleStates, fetchHistory,
  MOCK_ENABLED, MOCK_HISTORY,
} from './workflows.data.js';

const OUTCOME_BADGE = (o) => o === 'applied' ? 'badge--ok' : (o && o.indexOf('failed') === 0 ? 'badge--danger' : 'badge--warn');

export function mountWorkflows(root) {
  const ui = { enabled: {}, loaded: false, sub: null, history: [], histLoaded: false };
  const canRead = hasPermission('workflows.read');
  const canEdit = hasPermission('workflows.edit');

  const wrap = el('section', { class: 'wf' });
  clear(root); root.append(wrap);

  if (!canRead) {
    wrap.append(el('div', { class: 'state' }, [
      el('div', { class: 'state__icon', html: icon('lock') }),
      el('div', { class: 'state__title', text: 'Sin permiso' }),
      el('div', { class: 'state__msg', text: 'No tienes acceso a esta sección. Pide a un administrador que te la habilite.' }),
    ]));
    return function cleanup() {};
  }

  /* ── Toggle de una regla ─────────────────────────────────── */
  async function toggle(rule, nextOn, inputEl) {
    const nextMap = {};
    // Solo las reglas con interruptor REAL escriben su entry (las 'server' son
    // siempre-activas: guardarles false sería otro toggle-mentira).
    BUILT_IN_RULES.filter((r) => r.exec === 'toggle')
      .forEach((r) => { nextMap[r.id] = (r.id === rule.id) ? nextOn : effectiveEnabled(r, ui.enabled); });
    if (store.get().mock) {
      ui.enabled = nextMap; renderRules(); toast((nextOn ? 'Regla activada' : 'Regla pausada') + ' (demo)', 'ok'); return;
    }
    inputEl.disabled = true;
    try {
      await saveRuleStates(nextMap);
      writeAudit(nextOn ? 'workflow_enable' : 'workflow_disable', 'regla ' + rule.name, '');
      toast(nextOn ? '✓ Regla activada' : '✓ Regla pausada', 'ok');
      // onSnapshot re-renderiza; reactivamos el input por si acaso
      inputEl.disabled = false;
    } catch (e) {
      inputEl.checked = !nextOn; inputEl.disabled = false;
      toast('No se pudo: ' + friendlyError(e), 'error');
    }
  }

  /* ── Tarjeta de regla ────────────────────────────────────── */
  function card(rule) {
    const isServer = rule.exec === 'server';
    const on = isServer || effectiveEnabled(rule, ui.enabled);
    let control = null;
    if (isServer) {
      // Siempre activa server-side: sin switch — mostrar un toggle inoperante
      // sería la mentira que TODO-41 mata.
      control = el('span', { class: 'badge badge--ok', title: 'La ejecuta el servidor — siempre activa' }, ['Siempre activa']);
    } else {
      const input = el('input', { type: 'checkbox', class: 'wf-switch__cb' });
      input.checked = on;
      input.disabled = !canEdit;
      input.addEventListener('change', () => toggle(rule, input.checked, input));
      control = el('label', { class: 'wf-switch', title: canEdit ? 'Activar/Pausar' : 'Solo lectura' }, [input, el('span', { class: 'wf-switch__slider' })]);
    }

    return el('article', { class: 'wf-card' + (on ? ' is-on' : '') }, [
      el('div', { class: 'wf-card__head' }, [
        el('div', { class: 'wf-card__status' }, [
          el('span', { class: 'wf-card__dot u-ico', 'aria-hidden': 'true', html: on ? icon('zap') : icon('pause') }),
          el('span', { class: 'u-caption u-faint', text: isServer ? 'Servidor' : (on ? 'Activa' : 'Pausada') }),
        ]),
        control,
      ]),
      el('strong', { class: 'wf-card__name', text: rule.name }),
      el('p', { class: 'wf-card__desc u-caption u-muted', text: rule.description }),
      el('div', { class: 'wf-card__foot' }, [
        el('span', { class: 'badge' }, [iconEl('zap'), (TRIGGER_LABELS[rule.trigger] || rule.trigger)]),
      ]),
    ]);
  }

  /* ── Fila de historial ───────────────────────────────────── */
  function histRow(h) {
    const when = h.timestamp && h.timestamp.toMillis ? new Date(h.timestamp.toMillis()) : new Date(h.timestamp);
    return el('div', { class: 'wf-hist__row' }, [
      el('div', { class: 'wf-hist__main' }, [
        el('span', { class: 'wf-hist__rule u-truncate', text: h.ruleName || h.ruleId || 'regla' }),
        h.docTitle ? el('span', { class: 'u-caption u-faint u-truncate', text: ' · ' + h.docTitle }) : null,
      ]),
      el('div', { class: 'wf-hist__meta' }, [
        el('span', { class: 'badge ' + OUTCOME_BADGE(h.outcome), text: h.outcome || 'applied' }),
        h.action ? el('span', { class: 'u-caption u-faint', text: h.action }) : null,
        el('span', { class: 'u-caption u-faint', text: isNaN(when) ? '' : timeAgo(when.toISOString()) }),
      ]),
    ]);
  }

  /* ── Layout ──────────────────────────────────────────────── */
  const rulesHost = el('div', { class: 'wf-rules' });
  const histHost = el('div', { class: 'wf-hist' });
  const refreshBtn = el('button', { class: 'btn btn--soft btn--sm', type: 'button', html: icon('refresh') + ' Actualizar' });
  refreshBtn.addEventListener('click', loadHistory);

  wrap.append(
    el('div', { class: 'wf-intro' }, [
      el('h3', { class: 'wf-section-title u-ico-text', html: icon('zap') + 'Reglas de automatización' }),
      el('p', { class: 'u-caption u-muted', text: 'Reglas que el servidor ejecuta solo, cada hora. Las que tienen interruptor se pueden pausar; las demás son parte del motor y siempre corren.' }),
    ]),
    rulesHost,
    el('div', { class: 'wf-hist-head' }, [
      el('h3', { class: 'wf-section-title u-ico-text', html: icon('clock') + 'Historial de ejecuciones' }), refreshBtn,
    ]),
    histHost,
  );

  function renderRules() {
    clear(rulesHost);
    if (!ui.loaded) { rulesHost.append(el('div', { class: 'state' }, [el('div', { class: 'state__msg', text: 'Cargando reglas…' })])); return; }
    rulesHost.append(el('div', { class: 'wf-grid' }, BUILT_IN_RULES.map(card)));
  }

  function renderHistory() {
    clear(histHost);
    if (!ui.histLoaded) { histHost.append(el('div', { class: 'state state--sm' }, [el('div', { class: 'state__msg', text: 'Cargando historial…' })])); return; }
    if (!ui.history.length) {
      histHost.append(el('div', { class: 'state state--sm' }, [el('div', { class: 'state__msg', text: 'Sin ejecuciones aún.' })]));
      return;
    }
    ui.history.forEach((h) => histHost.append(histRow(h)));
  }

  async function loadHistory() {
    if (store.get().mock) { ui.history = MOCK_HISTORY.slice(); ui.histLoaded = true; renderHistory(); return; }
    ui.histLoaded = false; renderHistory();
    try {
      ui.history = await fetchHistory(50); ui.histLoaded = true; renderHistory();
    } catch (e) {
      ui.histLoaded = true; ui.history = []; renderHistory();
      toast('No se pudo cargar el historial: ' + friendlyError(e), 'error');
    }
  }

  /* ── Boot ────────────────────────────────────────────────── */
  if (store.get().mock) {
    ui.enabled = { ...MOCK_ENABLED }; ui.loaded = true; renderRules();
    loadHistory();
  } else {
    renderRules(); renderHistory();
    ui.sub = subscribeRuleStates(
      (m) => { ui.enabled = m; ui.loaded = true; renderRules(); },
      () => { ui.loaded = true; renderRules(); toast('No se pudo cargar el estado de las reglas.', 'error'); },
    );
    loadHistory();
  }

  return function cleanup() {
    if (ui.sub) ui.sub(); ui.sub = null;
  };
}
