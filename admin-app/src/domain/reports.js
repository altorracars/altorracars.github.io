// ============================================================
// REPORTS — agregaciones PURAS del tablero (blueprint Fase 4 §165).
// Sin DOM, sin Firestore, sin LLM. Determinista y testeable.
// Reusa el dominio existente (forecast/weighted, channelOf, slaState, dayKey).
// Convención de período: filtra por `createdAt` (string ISO). dayKey LOCAL (L-30).
// ============================================================

import { channelOf, isClosedStatus, slaState } from './classify.js';
import { forecast, weighted, OPEN_STAGES, dealLiquidable, latestCommissionSnapshot, altorraRevenueOf } from './pipeline.js';
import { dayKey } from './agenda.js';

const ms = (iso) => {
  const t = new Date(iso).getTime();
  return Number.isNaN(t) ? 0 : t;
};

const isWon = (d) => d.status === 'won';
const isLost = (d) => d.status === 'lost';
const isOpen = (d) => d.status === 'open';
const isConverted = (l) => l.status === 'convertido';

/** Filtra filas por createdAt >= startMs. startMs null/0 = todas (período "Todo"). */
export function filterByRange(rows, startMs) {
  if (!startMs) return rows.slice();
  return rows.filter((r) => ms(r.createdAt) >= startMs);
}

/** KPIs de intake/resultado del PERÍODO (leads/deals ya filtrados por período). */
export function periodKpis(leads, deals) {
  const total = leads.length;
  const convertidos = leads.filter(isConverted).length;
  const won = deals.filter(isWon);
  const lost = deals.filter(isLost);
  const wonValue = won.reduce((s, d) => s + (Number(d.amount) || 0), 0);
  const decided = won.length + lost.length;
  return {
    leadsNew: total,
    convertidos,
    convRate: total ? convertidos / total : 0,
    won: won.length,
    lost: lost.length,
    winRate: decided ? won.length / decided : 0,
    wonValue,
  };
}

/** KPIs de ESTADO ACTUAL (sobre el set completo, NO el período). */
export function currentKpis(leads, deals) {
  const open = deals.filter(isOpen);
  const active = leads.filter((l) => !isClosedStatus(l.status));
  const slaRisk = active.filter((l) => {
    const s = slaState(l);
    return !s.closed && (s.state === 'warn' || s.state === 'late');
  }).length;
  return {
    leadsActive: active.length,
    dealsOpen: open.length,
    pipelineWeighted: forecast(open),
    slaRisk,
  };
}

/**
 * Embudo lead → ganado, monotónico por construcción (cada paso ⊆ el anterior).
 * `leads` = período; `allDeals` = set completo (para el join lead→deal ganado).
 */
export function funnel(leads, allDeals) {
  const wonIds = new Set(allDeals.filter(isWon).map((d) => d.id));
  const contacted = leads.filter((l) => l.status === 'contactado' || l.status === 'calificado' || l.status === 'convertido');
  const qualified = leads.filter((l) => l.status === 'calificado' || l.status === 'convertido');
  const converted = leads.filter(isConverted);
  const won = converted.filter((l) => l.convertedTo && wonIds.has(l.convertedTo.dealId));
  const top = leads.length || 1;
  const steps = [
    { key: 'leads', label: 'Leads', count: leads.length },
    { key: 'contactados', label: 'Contactados', count: contacted.length },
    { key: 'calificados', label: 'Calificados', count: qualified.length },
    { key: 'convertidos', label: 'Convertidos', count: converted.length },
    { key: 'ganados', label: 'Ganados', count: won.length },
  ];
  return steps.map((s, i) => ({
    ...s,
    pctTop: s.count / top,
    convFromPrev: i === 0 ? 1 : (steps[i - 1].count ? s.count / steps[i - 1].count : 0),
  }));
}

/** Rendimiento por canal/fuente (atribución). leads/deals = período. */
export function bySource(leads, deals) {
  const map = {};
  const ensure = (ch) => (map[ch.key] || (map[ch.key] = {
    key: ch.key, label: ch.label, iconId: ch.iconId,
    leads: 0, convertidos: 0, deals: 0, won: 0, revenue: 0,
  }));
  leads.forEach((l) => {
    const row = ensure(channelOf(l));
    row.leads++;
    if (isConverted(l)) row.convertidos++;
  });
  deals.forEach((d) => {
    const row = ensure(channelOf(d)); // channelOf lee .source (deal lo tiene)
    row.deals++;
    if (isWon(d)) { row.won++; row.revenue += Number(d.amount) || 0; }
  });
  return Object.values(map)
    .map((r) => ({ ...r, convRate: r.leads ? r.convertidos / r.leads : 0 }))
    .sort((a, b) => b.leads - a.leads || b.revenue - a.revenue);
}

/** Forecast por etapa (deals ABIERTOS del set completo — estado actual del pipeline). */
export function byStage(deals) {
  const open = deals.filter(isOpen);
  return OPEN_STAGES.map((st) => {
    const ds = open.filter((d) => d.stageId === st.id);
    return {
      id: st.id, label: st.label, prob: st.prob,
      count: ds.length,
      value: ds.reduce((s, d) => s + (Number(d.amount) || 0), 0),
      weighted: ds.reduce((s, d) => s + weighted(d), 0),
    };
  });
}

/** Rendimiento por asesor. leads/deals = período; team = lista para sembrar nombres. */
export function byOwner(leads, deals, team = []) {
  const map = {};
  const ensure = (id, name) => (map[id] || (map[id] = {
    ownerId: id, ownerName: name, leads: 0, deals: 0, won: 0, lost: 0, pipelineWeighted: 0,
  }));
  team.forEach((t) => ensure(t.uid, t.nombre));
  leads.forEach((l) => {
    const id = l.ownerId || '_none';
    ensure(id, l.ownerName || (id === '_none' ? 'Sin asignar' : id)).leads++;
  });
  deals.forEach((d) => {
    const id = d.ownerId || '_none';
    const row = ensure(id, d.ownerName || (id === '_none' ? 'Sin asignar' : id));
    row.deals++;
    if (isWon(d)) row.won++;
    else if (isLost(d)) row.lost++;
    else if (isOpen(d)) row.pipelineWeighted += weighted(d);
  });
  return Object.values(map)
    .filter((r) => r.leads || r.deals)
    .map((r) => ({ ...r, winRate: (r.won + r.lost) ? r.won / (r.won + r.lost) : 0 }))
    .sort((a, b) => b.won - a.won || b.pipelineWeighted - a.pipelineWeighted || b.leads - a.leads);
}

/** Serie diaria de conteo por createdAt, últimos `days` días incluido hoy. dayKey LOCAL (L-30). */
export function trendByDay(rows, days = 30) {
  const buckets = [];
  const index = {};
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
    const b = { key: dayKey(d), date: d, count: 0 };
    buckets.push(b);
    index[b.key] = b;
  }
  rows.forEach((r) => {
    if (!r.createdAt) return;
    const b = index[dayKey(new Date(r.createdAt))];
    if (b) b.count++;
  });
  return buckets;
}

/* ── E4 / F42 — Comisiones desde el CRM ──────────────────────────────────
 * Política del dueño (aprobada 2026-06-09, anunciada desde E1a): "si no está
 * registrado en el CRM, no entra a liquidación". Entra = deal GANADO en el
 * mes con checklist post-venta F10 COMPLETO (dealLiquidable). La base es
 * commissionSnapshot (congelada server-side al ganar); fallback amount. */

/** 'YYYY-MM' LOCAL del timestamp (mes calendario de Bogotá, no UTC). */
export function monthKeyOf(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
}

/** Últimos `count` meses para el selector: [{key:'YYYY-MM', label}]. */
export function monthOptions(count = 6) {
  const out = [];
  const now = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
    const raw = d.toLocaleDateString('es-CO', { month: 'long', year: 'numeric' });
    out.push({ key, label: raw.charAt(0).toUpperCase() + raw.slice(1) });
  }
  return out;
}

/**
 * F42: liquidación mensual por asesor. `deals` = wons (query dedicada; filtra
 * el mes por wonAt). Separa LIQUIDABLES (checklist completo) de PENDIENTES
 * (vendidos con checklist incompleto → aún no entran). `team` resuelve el
 * nombre desde el ownerId CONGELADO en el snapshot — el ownerName vivo del
 * deal puede haber sido reasignado después de ganar.
 */
export function comisionesPorAsesor(deals, monthKey, team = []) {
  const won = (deals || []).filter(
    (d) => d.status === 'won' && monthKeyOf(d.wonAt || d.lastActivityAt) === monthKey
  );
  const map = {};
  won.forEach((d) => {
    // §9: snapshot VIGENTE del array; fallback al singular legacy (deals pre-§9).
    const snap = latestCommissionSnapshot(d) || d.commissionSnapshot || {};
    const id = snap.createdBy || snap.ownerId || d.ownerId || '_none';
    const teamName = (team.find((t) => t.uid === id) || {}).nombre;
    const row = map[id] || (map[id] = {
      ownerId: id,
      ownerName: teamName || d.ownerName || (id === '_none' ? 'Sin asignar' : id),
      vendidos: 0, liquidables: 0, pendientes: 0,
      baseLiquidable: 0, basePendiente: 0,
      altorraRevenue: 0, deals: [], // §9: lo que GANA Altorra (altorraRevenueOf)
    });
    // base = precio de VENTA (salePrice del array | amount legacy | deal.amount)
    const base = Number(
      snap.salePrice != null ? snap.salePrice
        : (snap.amount != null ? snap.amount : d.amount)
    ) || 0;
    const altorraRev = altorraRevenueOf(d); // 0 hasta que el vehículo tenga tenencia + monto
    const liq = dealLiquidable(d);
    row.vendidos++;
    if (liq) { row.liquidables++; row.baseLiquidable += base; row.altorraRevenue += altorraRev; }
    else { row.pendientes++; row.basePendiente += base; }
    row.deals.push({
      id: d.id, name: d.name || '', base, altorraRevenue: altorraRev, liquidable: liq,
      tipoPago: snap.tipoPago || d.tipoPago || '',
    });
  });
  return Object.values(map)
    .sort((a, b) => b.baseLiquidable - a.baseLiquidable || b.vendidos - a.vendidos);
}

/** Opciones del selector de período. value = días (null = Todo). */
export const PERIODS = [
  { value: 0, label: 'Hoy' },
  { value: 7, label: '7 días' },
  { value: 30, label: '30 días' },
  { value: 90, label: '90 días' },
  { value: null, label: 'Todo' },
];

/** startMs (epoch) para `days` atrás desde el inicio de hoy. 0=hoy, null=sin límite. */
export function periodStartMs(days) {
  if (days === null || days === undefined) return null;
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return startOfToday.getTime() - days * 86400000;
}
