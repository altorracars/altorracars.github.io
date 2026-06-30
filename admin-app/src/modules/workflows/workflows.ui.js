// ============================================================
// Workflows / Automatización (PLAN-UNIFICADO F-2 §242, gap §2.A) — UI.
// Gestión de las reglas predefinidas: lista con toggle activar/desactivar +
// visor de historial (automationLog). RBAC: workflows.read para ver; el toggle
// escribe config/automationRules (rules: super_admin/settings.* — un user
// workflows.edit sin eso recibe permission-denied, manejado con mensaje claro).
// El MOTOR de reglas NO vive aquí (sigue en el legacy, super_admin client-side).
// ⟦OPUS-4.8 · rev-Fable⟧
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
      el('div', { class: 'state__msg', text: 'Necesitas workflows.read para ver la automatización.' }),
    ]));
    return function cleanup() {};
  }

  /* ── Toggle de una regla ─────────────────────────────────── */
  async function toggle(rule, nextOn, inputEl) {
    const nextMap = {};
    BUILT_IN_RULES.forEach((r) => { nextMap[r.id] = (r.id === rule.id) ? nextOn : effectiveEnabled(r, ui.enabled); });
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
    const on = effectiveEnabled(rule, ui.enabled);
    const input = el('input', { type: 'checkbox', class: 'wf-switch__cb' });
    input.checked = on;
    input.disabled = !canEdit;
    input.addEventListener('change', () => toggle(rule, input.checked, input));
    const sw = el('label', { class: 'wf-switch', title: canEdit ? 'Activar/Pausar' : 'Solo lectura' }, [input, el('span', { class: 'wf-switch__slider' })]);

    return el('article', { class: 'wf-card' + (on ? ' is-on' : '') }, [
      el('div', { class: 'wf-card__head' }, [
        el('div', { class: 'wf-card__status' }, [
          el('span', { class: 'wf-card__dot u-ico', 'aria-hidden': 'true', html: on ? icon('zap') : icon('pause') }),
          el('span', { class: 'u-caption u-faint', text: on ? 'Activa' : 'Pausada' }),
        ]),
        sw,
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
      el('p', { class: 'u-caption u-muted', text: 'Reglas predefinidas que actúan solas ante ciertos eventos. Actívalas o páusalas; el motor las ejecuta en segundo plano.' }),
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
