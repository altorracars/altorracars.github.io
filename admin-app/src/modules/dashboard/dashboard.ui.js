// ============================================================
// Inicio / Dashboard — PLAN-UNIFICADO F-3 §237. El "Home" del portal:
// el aterrizaje accionable (KPIs de un vistazo + NBA "qué hago ahora" +
// pendientes de hoy + accesos rápidos). Distinto de Reportes (análisis
// profundo): aquí se DECIDE la próxima acción, no se analiza el período.
//
// Snapshot, no realtime (como Reportes — "un tablero no necesita realtime").
// REUSA el dominio y las capas de datos existentes (cero duplicación):
//   · loadReports()      → leads/deals/wons (maneja mock interno)
//   · enrichAll()        → score/rating/SLA/NBA por lead
//   · currentKpis()/periodKpis() → KPIs deterministas del dominio reports
//   · fetchPendingTasks()→ "Pendientes hoy + vencidos" (mismo de la Bandeja)
// El panel Customer 360 lee de store.leads → lo seteamos al abrir un lead.
// ============================================================

import { el, clear } from '../../core/dom.js';
import { store } from '../../core/store.js';
import { toast } from '../../core/toast.js';
import { navigate } from '../../core/router.js';
import { hasPermission, displayName } from '../../core/auth.js';
import { initials, timeAgo, copShort } from '../../domain/format.js';
import { RATING_META } from '../../domain/scoring.js';
import { isClosedStatus } from '../../domain/classify.js';
import {
  currentKpis, periodKpis, filterByRange, periodStartMs,
} from '../../domain/reports.js';
import { enrichAll } from '../inbox/inbox.domain.js';
import { loadReports } from '../reportes/reportes.data.js';
import { fetchPendingTasks } from '../inbox/inbox.data.js';

const cop = (n) => copShort(n) || '$0';
const firstNameOf = (full) => String(full || '').trim().split(/\s+/)[0] || '';
function greetWord() {
  const h = new Date().getHours();
  return h < 12 ? 'Buenos días' : h < 19 ? 'Buenas tardes' : 'Buenas noches';
}

export function mountDashboard(root) {
  const ui = { leads: [], deals: [], pending: [], loading: true, error: null, capped: false, scope: 'todos' };
  let alive = true;
  let scopeDecided = false;
  const uid = store.get().user && store.get().user.uid;
  const canEdit = hasPermission('crm.edit');

  const body = el('div', { class: 'dash__body' });
  const section = el('section', { class: 'dash' }, [body]);
  clear(root); root.append(section);

  // ── Modelo del tablero (derivado del snapshot) ──
  function compute() {
    const enriched = enrichAll(ui.leads);
    const ck = currentKpis(ui.leads, ui.deals);
    const todayLeads = filterByRange(ui.leads, periodStartMs(0));
    const pkToday = periodKpis(todayLeads, []);
    const unassigned = ui.leads.filter((l) => !l.ownerId && !isClosedStatus(l.status)).length;

    // Decisión de alcance por defecto (una vez): si tengo leads asignados,
    // arranco en "Míos" (perfil asesor); si no (perfil gerencial), "Todos".
    if (!scopeDecided) {
      ui.scope = uid && enriched.some((l) => l.ownerId === uid) ? 'mios' : 'todos';
      scopeDecided = true;
    }

    const actions = enriched
      .filter((l) => !l.archived && l._nba.priority >= 50) // reactivar(50)+ = genuinamente accionable
      .filter((l) => ui.scope === 'todos' || l.ownerId === uid)
      .sort((a, b) => b._nba.priority - a._nba.priority
        || b._score - a._score
        || new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      .slice(0, 8);

    return { enriched, ck, pkToday, unassigned, actions, pending: ui.pending };
  }

  function render() {
    if (ui.loading) return renderSkeleton();
    if (ui.error) return renderState('⚠️', 'No se pudo cargar el inicio', ui.error);

    const m = compute();
    // El panel 360 lee de store.leads → publicar los enriquecidos para el deep-open.
    store.set({ leads: m.enriched });
    clear(body);

    body.append(
      renderHero(m),
      renderKpis(m),
      ui.capped ? el('div', { class: 'dash__notice u-caption' },
        ['ℹ️ Mostrando los registros más recientes (tope por carga). Los totales históricos completos llegarán con los reportes acumulados.']) : null,
      el('div', { class: 'dash__cols' }, [
        renderActions(m),
        el('div', { class: 'dash__side' }, [renderPendientes(), renderAccesos()]),
      ]),
    );
  }

  // ── Hero: saludo + resumen de una línea ──
  function renderHero(m) {
    const name = firstNameOf(displayName());
    const open = m.actions.length;
    const summary = open
      ? `Tienes ${open} acci${open === 1 ? 'ón' : 'ones'} prioritari${open === 1 ? 'a' : 'as'}${m.pending.length ? ` y ${m.pending.length} pendiente${m.pending.length === 1 ? '' : 's'} para hoy` : ''}.`
      : '¡Sin acciones urgentes! Buen momento para nutrir relaciones y revisar el pipeline.';
    return el('header', { class: 'dash__hero' }, [
      el('h1', { class: 'dash__greet', text: `${greetWord()}${name ? ', ' + name : ''} 👋` }),
      el('p', { class: 'dash__sub u-muted', text: summary }),
    ]);
  }

  // ── KPIs hero (de un vistazo). Algunos navegan a su sección. ──
  function renderKpis(m) {
    const cards = [
      kpiCard('Leads activos', String(m.ck.leadsActive), 'en gestión', { to: 'bandeja' }),
      kpiCard('Sin contestar a tiempo', String(m.ck.slaRisk), m.ck.slaRisk ? 'SLA en riesgo' : 'al día', { hi: m.ck.slaRisk > 0, danger: m.ck.slaRisk > 0, to: 'bandeja' }),
      kpiCard('Sin asignar', String(m.unassigned), m.unassigned ? 'esperan asesor' : 'todos asignados', { to: 'bandeja' }),
      kpiCard('Nuevos hoy', String(m.pkToday.leadsNew), 'leads del día'),
      kpiCard('Pendientes hoy', String(m.pending.length), m.pending.length ? 'tareas y citas' : 'al día', { hi: m.pending.length > 0 }),
      kpiCard('Pipeline ponderado', cop(m.ck.pipelineWeighted), `${m.ck.dealsOpen} oportunidad${m.ck.dealsOpen === 1 ? '' : 'es'} abierta${m.ck.dealsOpen === 1 ? '' : 's'}`, { hi: true, to: 'pipeline' }),
    ];
    return el('div', { class: 'dash__kpis' }, cards);
  }

  function kpiCard(label, value, sub, opts = {}) {
    const cls = 'dash__kpi'
      + (opts.hi ? ' dash__kpi--hi' : '')
      + (opts.danger ? ' dash__kpi--danger' : '')
      + (opts.to ? ' dash__kpi--link' : '');
    const node = el(opts.to ? 'button' : 'div',
      opts.to ? { class: cls, type: 'button' } : { class: cls }, [
        el('span', { class: 'dash__kpi-label u-caption u-faint', text: label }),
        el('strong', { class: 'dash__kpi-val', text: value }),
        sub ? el('span', { class: 'dash__kpi-sub u-caption u-faint', text: sub }) : null,
      ]);
    if (opts.to) node.addEventListener('click', () => navigate(opts.to));
    return node;
  }

  // ── NBA: "Tus próximas acciones" (lo accionable, priorizado) ──
  function renderActions(m) {
    const head = el('div', { class: 'dash__sec-head' }, [
      el('h2', { class: 'dash__sec-title', text: 'Tus próximas acciones' }),
      el('div', { class: 'dash__scope', role: 'group', 'aria-label': 'Alcance' }, [
        scopeChip('mios', 'Míos'),
        scopeChip('todos', 'Todos'),
      ]),
    ]);

    const list = el('div', { class: 'dash__actions', role: 'list' });
    if (!m.actions.length) {
      list.append(el('div', { class: 'state' }, [
        el('div', { class: 'state__icon', 'aria-hidden': 'true', text: '✅' }),
        el('div', { class: 'state__title', text: ui.scope === 'mios' ? '¡Estás al día!' : 'Sin acciones urgentes' }),
        el('div', { class: 'state__msg', text: ui.scope === 'mios' ? 'No tienes leads que requieran acción inmediata.' : 'Ningún lead requiere acción inmediata ahora mismo.' }),
      ]));
    } else {
      m.actions.forEach((lead) => list.append(actionRow(lead)));
    }
    return el('div', { class: 'dash__sec dash__sec--actions' }, [head, list]);
  }

  function scopeChip(value, label) {
    const on = ui.scope === value;
    const chip = el('button', { class: 'chip' + (on ? ' chip--active' : ''), type: 'button', 'aria-pressed': String(on) }, [label]);
    chip.addEventListener('click', () => { if (ui.scope !== value) { ui.scope = value; render(); } });
    return chip;
  }

  function actionRow(lead) {
    const rm = RATING_META[lead._rating] || RATING_META.cold;
    const what = [lead._channel.icon + ' ' + lead._channel.label, timeAgo(lead.createdAt)].filter(Boolean).join(' · ');
    const row = el('article', {
      class: 'dash__action', role: 'listitem', tabindex: '0', 'data-id': lead.id,
      'aria-label': `${lead._nba.label}: ${lead.fullName}`,
    }, [
      el('span', { class: 'dash__action-icon', 'aria-hidden': 'true', text: lead._nba.icon }),
      el('div', { class: 'dash__action-main u-grow' }, [
        el('div', { class: 'dash__action-top' }, [
          el('strong', { class: 'dash__action-label', text: lead._nba.label }),
          el('span', { class: `temp ${rm.cls}`, title: `Score ${lead._score}/100` }, [`${rm.icon} ${lead._score}`]),
        ]),
        el('div', { class: 'dash__action-who u-truncate' }, [
          el('span', { class: 'avatar avatar--xs', 'aria-hidden': 'true', text: initials(lead.fullName) }),
          el('span', { class: 'dash__action-name u-truncate', text: lead.fullName }),
        ]),
        el('div', { class: 'dash__action-meta u-caption u-faint' }, [
          el('span', { text: lead._nba.reason }),
          el('span', { text: '·' }),
          el('span', { text: what }),
        ]),
      ]),
      el('span', { class: 'dash__action-go', 'aria-hidden': 'true', text: '›' }),
    ]);
    const open = () => openDetail(lead.id);
    row.addEventListener('click', open);
    row.addEventListener('keydown', (e) => { if (e.key === 'Enter') open(); });
    return row;
  }

  // ── Pendientes hoy (mismo origen que la Bandeja) ──
  function renderPendientes() {
    const box = el('div', { class: 'dash__sec' }, [
      el('div', { class: 'dash__sec-head' }, [el('h2', { class: 'dash__sec-title', text: '📋 Pendientes hoy' })]),
    ]);
    if (store.get().mock) {
      box.append(el('div', { class: 'dash__empty u-caption u-faint', text: 'Pendientes no disponible en modo demo.' }));
      return box;
    }
    if (!ui.pending.length) {
      box.append(el('div', { class: 'dash__empty u-caption u-faint', text: '¡Al día! Registra llamadas/WhatsApps y elige “próximo paso” en la Bandeja para que aparezcan aquí.' }));
      return box;
    }
    const now = Date.now();
    ui.pending.slice(0, 8).forEach((t) => {
      const late = new Date(t.dueAt).getTime() < now;
      const openBtn = el('button', { class: 'btn btn--ghost btn--sm', type: 'button' }, ['Abrir 360']);
      openBtn.addEventListener('click', () => { if (t.relatedTo && t.relatedTo.id) openDetail(t.relatedTo.id); });
      box.append(el('div', { class: 'dash__pend' }, [
        el('span', { class: `badge badge--${late ? 'danger' : 'gold'}`, text: late ? 'VENCIDO' : 'HOY' }),
        el('div', { class: 'u-grow' }, [
          el('div', { class: 'dash__pend-name u-truncate', text: (t.type === 'cita' ? '📅 ' : '') + t.subject }),
          el('div', { class: 'u-caption u-faint u-truncate', text: `${t.relatedTo && t.relatedTo.name ? t.relatedTo.name + ' · ' : ''}${timeAgo(t.dueAt)}` }),
        ]),
        openBtn,
      ]));
    });
    if (ui.pending.length > 8) {
      box.append(el('div', { class: 'u-caption u-faint', style: { padding: 'var(--s-2)' }, text: `+${ui.pending.length - 8} más en la Bandeja` }));
    }
    return box;
  }

  // ── Accesos rápidos ──
  function renderAccesos() {
    const links = [
      { to: 'bandeja', icon: '📥', label: 'Bandeja' },
      { to: 'pipeline', icon: '🎯', label: 'Pipeline' },
      { to: 'agenda', icon: '📅', label: 'Agenda' },
      { to: 'reportes', icon: '📊', label: 'Reportes' },
    ];
    const grid = el('div', { class: 'dash__accesos' }, links.map((l) => {
      const b = el('button', { class: 'dash__acceso', type: 'button' }, [
        el('span', { class: 'dash__acceso-icon', 'aria-hidden': 'true', text: l.icon }),
        el('span', { text: l.label }),
      ]);
      b.addEventListener('click', () => navigate(l.to));
      return b;
    }));
    return el('div', { class: 'dash__sec' }, [
      el('div', { class: 'dash__sec-head' }, [el('h2', { class: 'dash__sec-title', text: 'Accesos rápidos' })]),
      grid,
    ]);
  }

  function openDetail(id) { store.set({ detailLeadId: id }); }

  // ── Estados ──
  function renderState(icon, title, msg) {
    clear(body);
    body.append(el('div', { class: 'state' }, [
      el('div', { class: 'state__icon', 'aria-hidden': 'true', text: icon }),
      el('div', { class: 'state__title', text: title }),
      el('div', { class: 'state__msg', text: msg }),
    ]));
  }
  function renderSkeleton() {
    clear(body);
    const kpis = el('div', { class: 'dash__kpis' }, [1, 2, 3, 4, 5, 6].map(() =>
      el('div', { class: 'dash__kpi' }, [el('span', { class: 'skeleton', style: { width: '100%', height: '52px' } })])));
    body.append(
      el('div', { class: 'dash__hero' }, [el('span', { class: 'skeleton', style: { width: '40%', height: '28px' } })]),
      kpis,
      el('span', { class: 'skeleton', style: { width: '100%', height: '220px' } }),
    );
  }

  // ── Carga (snapshot + pendientes) ──
  async function load() {
    ui.loading = true; ui.error = null; render();
    try {
      const [data, pending] = await Promise.all([
        loadReports(),
        store.get().mock ? Promise.resolve([]) : fetchPendingTasks().catch(() => []),
      ]);
      if (!alive) return;
      ui.leads = data.leads; ui.deals = data.deals; ui.pending = pending || [];
      ui.capped = !!data.capped; ui.loading = false;
    } catch (e) {
      if (!alive) return;
      ui.loading = false;
      ui.error = e && e.code === 'permission-denied'
        ? 'Tu cuenta no tiene permiso para ver el CRM.'
        : 'Revisa tu conexión e intenta de nuevo.';
    }
    render();
  }

  load();
  return function cleanup() { alive = false; };
}
