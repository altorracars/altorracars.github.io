// ============================================================
// Reportes — tablero de KPIs (capa UI). 5ª superficie del portal (§165).
// Determinista (reusa el dominio). Snapshot + período en memoria + CSV.
// Verificación: ?mock=1 con datos demo (incl. ganados/perdidos).
// ============================================================

import { el, clear } from '../../core/dom.js';
import { store } from '../../core/store.js';
import { toast } from '../../core/toast.js';
import { copShort } from '../../domain/format.js';
import { dayKey } from '../../domain/agenda.js';
import {
  PERIODS, periodStartMs, filterByRange,
  periodKpis, currentKpis, funnel, bySource, byStage, byOwner, trendByDay,
} from '../../domain/reports.js';
import { loadReports } from './reportes.data.js';
import { getMockTeam } from '../../core/mock.js';
import { barChart, lineChart } from './reportes.charts.js';

const pct = (x) => Math.round((x || 0) * 100) + '%';
const cop = (n) => copShort(n) || '$0';
const dlabel = (d) => `${d.getDate()}/${d.getMonth() + 1}`;

export function mountReportes(root) {
  const ui = { leads: [], deals: [], loading: true, error: null, capped: false, days: 30 };
  let alive = true;

  // ── Toolbar (período + acciones) ──
  const chipsWrap = el('div', { class: 'reportes__chips', role: 'group', 'aria-label': 'Período' });
  const refreshBtn = el('button', { class: 'btn btn--soft btn--sm', type: 'button' }, ['↻ Actualizar']);
  const csvBtn = el('button', { class: 'btn btn--soft btn--sm', type: 'button' }, ['⤓ CSV']);
  refreshBtn.addEventListener('click', load);
  csvBtn.addEventListener('click', exportCsv);
  const toolbar = el('div', { class: 'reportes__toolbar' }, [
    chipsWrap,
    el('div', { class: 'u-row u-row--tight' }, [refreshBtn, csvBtn]),
  ]);

  const body = el('div', { class: 'reportes__body' });
  const section = el('section', { class: 'reportes' }, [toolbar, body]);
  clear(root); root.append(section);

  function renderChips() {
    clear(chipsWrap);
    PERIODS.forEach((p) => {
      const on = ui.days === p.value;
      const chip = el('button', {
        class: 'chip', type: 'button', 'aria-pressed': on ? 'true' : 'false',
      }, [p.label]);
      chip.addEventListener('click', () => { ui.days = p.value; render(); });
      chipsWrap.append(chip);
    });
  }

  // ── Derivar el modelo del tablero a partir del estado ──
  function compute() {
    const startMs = periodStartMs(ui.days);
    const pLeads = filterByRange(ui.leads, startMs);
    const pDeals = filterByRange(ui.deals, startMs);
    return {
      pLeads, pDeals,
      pk: periodKpis(pLeads, pDeals),
      ck: currentKpis(ui.leads, ui.deals),
      fn: funnel(pLeads, ui.deals),
      src: bySource(pLeads, pDeals),
      stg: byStage(ui.deals),
      own: byOwner(pLeads, pDeals, store.get().mock ? getMockTeam() : (store.get().team || [])),
      tr: trendByDay(ui.leads, 30),
    };
  }

  // ── Render ──
  function render() {
    renderChips();
    if (ui.loading) return renderSkeleton();
    if (ui.error) return renderState('⚠️', 'No se pudieron cargar los reportes', ui.error);
    if (!ui.leads.length && !ui.deals.length) {
      return renderState('📊', 'Aún no hay datos para reportar', 'Cuando entren leads y oportunidades, aquí verás tus KPIs, el embudo y el rendimiento por fuente.');
    }

    const m = compute();
    clear(body);

    if (ui.capped) {
      body.append(el('div', { class: 'reportes__notice u-caption' },
        ['ℹ️ Mostrando los registros más recientes (tope por carga). Los totales históricos completos llegarán con los reportes acumulados.']));
    }

    body.append(
      kpiGroup('Del período', [
        kpiCard('Leads nuevos', String(m.pk.leadsNew)),
        kpiCard('Tasa de conversión', pct(m.pk.convRate), `${m.pk.convertidos} de ${m.pk.leadsNew}`),
        kpiCard('Win rate', pct(m.pk.winRate), `${m.pk.won} ganadas · ${m.pk.lost} perdidas`),
        kpiCard('Valor ganado', cop(m.pk.wonValue), null, true),
      ]),
      kpiGroup('Estado actual', [
        kpiCard('Leads activos', String(m.ck.leadsActive)),
        kpiCard('Oportunidades abiertas', String(m.ck.dealsOpen)),
        kpiCard('Pipeline ponderado', cop(m.ck.pipelineWeighted), null, true),
        kpiCard('SLA en riesgo', String(m.ck.slaRisk), m.ck.slaRisk ? 'requieren atención' : 'al día'),
      ]),
      sectionFunnel(m.fn),
      sectionSource(m.src),
      sectionStage(m.stg),
      sectionTrend(m.tr),
      sectionTeam(m.own),
    );
  }

  // ── KPIs ──
  function kpiGroup(title, cards) {
    return el('div', { class: 'reportes__section' }, [
      el('h2', { class: 'reportes__sec-title', text: title }),
      el('div', { class: 'reportes__kpis' }, cards),
    ]);
  }
  function kpiCard(label, value, sub, hi) {
    return el('div', { class: 'reportes__kpi' + (hi ? ' reportes__kpi--hi' : '') }, [
      el('span', { class: 'reportes__kpi-label u-caption u-faint', text: label }),
      el('strong', { class: 'reportes__kpi-val', text: value }),
      sub ? el('span', { class: 'reportes__kpi-sub u-caption u-faint', text: sub }) : null,
    ]);
  }

  // ── Embudo ──
  function sectionFunnel(fn) {
    const rows = fn.map((s, i) => ({
      label: s.label,
      value: s.count,
      pct: s.pctTop,
      display: i === 0 ? String(s.count) : `${s.count} · ${pct(s.convFromPrev)}`,
      color: 'var(--grad-gold)',
    }));
    return sectionBox('Embudo de ventas', 'De lead a venta — dónde se pierde el avance', barChart(rows, { max: fn[0] ? fn[0].count : 1 }));
  }

  // ── Rendimiento por canal ──
  function sectionSource(src) {
    const head = ['Canal', 'Leads', 'Conv.', 'Oport.', 'Ganados', 'Ingresos'];
    const rows = src.map((r) => [
      `${r.icon || ''} ${r.label}`.trim(),
      String(r.leads),
      pct(r.convRate),
      String(r.deals),
      String(r.won),
      cop(r.revenue),
    ]);
    const empty = src.length ? null : 'Sin leads en el período.';
    return sectionBox('Rendimiento por canal', 'Atribución de fuente: de dónde vienen y cuánto rinden', table(head, rows, empty));
  }

  // ── Forecast por etapa ──
  function sectionStage(stg) {
    const head = ['Etapa', 'Prob.', 'Oport.', 'Valor', 'Ponderado'];
    const rows = stg.map((s) => [s.label, pct(s.prob), String(s.count), cop(s.value), cop(s.weighted)]);
    const tot = stg.reduce((a, s) => ({ count: a.count + s.count, value: a.value + s.value, weighted: a.weighted + s.weighted }), { count: 0, value: 0, weighted: 0 });
    const foot = ['Total', '', String(tot.count), cop(tot.value), cop(tot.weighted)];
    return sectionBox('Forecast por etapa', 'Pipeline abierto actual (no depende del período)', table(head, rows, null, foot));
  }

  // ── Tendencia ──
  function sectionTrend(tr) {
    const total = tr.reduce((s, b) => s + b.count, 0);
    const points = tr.map((b) => ({ label: dlabel(b.date), value: b.count }));
    const span = tr.length ? `${dlabel(tr[0].date)} – ${dlabel(tr[tr.length - 1].date)}` : '';
    const chartWrap = el('div', { class: 'reportes__chart' }, [
      lineChart(points),
      el('div', { class: 'reportes__axis u-caption u-faint' }, [
        el('span', { text: span }),
        el('span', { text: `${total} leads` }),
      ]),
    ]);
    return sectionBox('Tendencia de captación', 'Nuevos leads · últimos 30 días', chartWrap);
  }

  // ── Equipo ──
  function sectionTeam(own) {
    const head = ['Asesor', 'Leads', 'Oport.', 'Ganados', 'Win rate', 'Pipeline pond.'];
    const rows = own.map((r) => [r.ownerName, String(r.leads), String(r.deals), String(r.won), pct(r.winRate), cop(r.pipelineWeighted)]);
    const empty = own.length ? null : 'Sin actividad asignada en el período.';
    return sectionBox('Rendimiento del equipo', 'Por asesor, en el período seleccionado', table(head, rows, empty));
  }

  // ── Primitivas de presentación ──
  function sectionBox(title, caption, content) {
    return el('div', { class: 'reportes__section' }, [
      el('div', { class: 'reportes__sec-head' }, [
        el('h2', { class: 'reportes__sec-title', text: title }),
        caption ? el('span', { class: 'reportes__sec-cap u-caption u-faint', text: caption }) : null,
      ]),
      content,
    ]);
  }

  function table(headCells, rows, emptyMsg, footCells) {
    if (!rows.length && emptyMsg) {
      return el('div', { class: 'reportes__empty u-caption u-faint', text: emptyMsg });
    }
    const thead = el('thead', {}, [el('tr', {}, headCells.map((h, i) => el('th', { class: i === 0 ? '' : 'is-num', scope: 'col', text: h })))]);
    const tbody = el('tbody', {}, rows.map((cells) => el('tr', {}, cells.map((c, i) => el('td', { class: i === 0 ? '' : 'is-num', text: c })))));
    const kids = [thead, tbody];
    if (footCells) kids.push(el('tfoot', {}, [el('tr', {}, footCells.map((c, i) => i === 0
      ? el('th', { scope: 'row', text: c })
      : el('td', { class: 'is-num', text: c })))]));
    return el('div', { class: 'reportes__tablewrap' }, [el('table', { class: 'reportes__table' }, kids)]);
  }

  function renderState(icon, title, msg) {
    clear(body);
    body.append(el('div', { class: 'state' }, [
      el('div', { class: 'state__icon', text: icon }),
      el('div', { class: 'state__title', text: title }),
      el('div', { class: 'state__msg', text: msg }),
    ]));
  }
  function renderSkeleton() {
    clear(body);
    const cards = el('div', { class: 'reportes__kpis' }, [1, 2, 3, 4].map(() =>
      el('div', { class: 'reportes__kpi' }, [el('span', { class: 'skeleton', style: { width: '100%', height: '46px' } })])));
    body.append(el('div', { class: 'reportes__section' }, [cards]));
    body.append(el('div', { class: 'reportes__section' }, [el('span', { class: 'skeleton', style: { width: '100%', height: '160px' } })]));
  }

  // ── Exportar CSV (RFC-4180 + BOM) ──
  function exportCsv() {
    if (ui.loading || ui.error) { toast('Aún no hay datos para exportar', 'info'); return; }
    const m = compute();
    const periodLabel = (PERIODS.find((p) => p.value === ui.days) || {}).label || '';
    const lines = [];
    const sec = (title) => { lines.push([]); lines.push([title]); };
    lines.push(['Reporte Altorra CRM']);
    lines.push(['Período', periodLabel]);
    lines.push(['Generado', new Date().toLocaleString('es-CO')]);

    sec('KPIs del período');
    lines.push(['Métrica', 'Valor']);
    lines.push(['Leads nuevos', m.pk.leadsNew]);
    lines.push(['Conversión', pct(m.pk.convRate)]);
    lines.push(['Win rate', pct(m.pk.winRate)]);
    lines.push(['Ganadas', m.pk.won]);
    lines.push(['Perdidas', m.pk.lost]);
    lines.push(['Valor ganado (COP)', m.pk.wonValue]);
    lines.push(['Leads activos (ahora)', m.ck.leadsActive]);
    lines.push(['Oportunidades abiertas (ahora)', m.ck.dealsOpen]);
    lines.push(['Pipeline ponderado COP (ahora)', m.ck.pipelineWeighted]);
    lines.push(['SLA en riesgo (ahora)', m.ck.slaRisk]);

    sec('Embudo');
    lines.push(['Etapa', 'Cantidad', 'Conversión desde anterior']);
    m.fn.forEach((s, i) => lines.push([s.label, s.count, i === 0 ? '' : pct(s.convFromPrev)]));

    sec('Rendimiento por canal');
    lines.push(['Canal', 'Leads', 'Conversión', 'Oportunidades', 'Ganados', 'Ingresos (COP)']);
    m.src.forEach((r) => lines.push([r.label, r.leads, pct(r.convRate), r.deals, r.won, r.revenue]));

    sec('Forecast por etapa (pipeline actual)');
    lines.push(['Etapa', 'Probabilidad', 'Oportunidades', 'Valor (COP)', 'Ponderado (COP)']);
    m.stg.forEach((s) => lines.push([s.label, pct(s.prob), s.count, s.value, s.weighted]));

    sec('Rendimiento del equipo');
    lines.push(['Asesor', 'Leads', 'Oportunidades', 'Ganados', 'Win rate', 'Pipeline ponderado (COP)']);
    m.own.forEach((r) => lines.push([r.ownerName, r.leads, r.deals, r.won, pct(r.winRate), r.pipelineWeighted]));

    download(`altorra-reportes-${dayKey(new Date())}.csv`, toCsv(lines));
    toast('Reporte exportado', 'ok');
  }

  // ── Carga ──
  async function load() {
    ui.loading = true; ui.error = null; render();
    try {
      const data = await loadReports();
      if (!alive) return;
      ui.leads = data.leads; ui.deals = data.deals; ui.capped = !!data.capped; ui.loading = false;
    } catch (e) {
      if (!alive) return;
      ui.loading = false;
      ui.error = e && e.code === 'permission-denied' ? 'Sin permiso para ver los reportes.' : 'Revisa tu conexión e intenta de nuevo.';
    }
    render();
  }

  load();
  return function cleanup() { alive = false; };
}

// ── CSV helpers (RFC-4180, BOM UTF-8) ──
function csvCell(v) {
  const s = v == null ? '' : String(v);
  // RFC-4180: entrecomilla si hay comilla, coma o salto de línea; + ';' por Excel es-CO (separador de lista).
  return /[",\n\r;]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
}
function toCsv(rows) {
  return '﻿' + rows.map((r) => r.map(csvCell).join(',')).join('\r\n');
}
function download(filename, text) {
  const blob = new Blob([text], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
