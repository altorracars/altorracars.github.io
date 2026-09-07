// ============================================================
// Charts del tablero de Reportes — SVG/CSS puro (no hay librería).
// Accesibles: las barras llevan etiqueta+valor en texto; el sparkline
// expone un aria-label con el resumen. Tokens HarmonyOS, sin hex.
// ============================================================

import { el } from '../../core/dom.js';

const SVG_NS = 'http://www.w3.org/2000/svg';

function svgEl(tag, attrs = {}, children = []) {
  const node = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    node.setAttribute(k, String(v));
  }
  for (const c of [].concat(children)) {
    if (c == null || c === false || c === '') continue;
    node.append(c.nodeType ? c : document.createTextNode(String(c)));
  }
  return node;
}

/**
 * Barras horizontales accesibles.
 * @param {{label,value,display?,pct?,color?}[]} rows
 * @param {{max?:number}} opts  max para escalar (si no, usa el mayor value)
 */
export function barChart(rows, opts = {}) {
  const max = opts.max != null ? opts.max : Math.max(1, ...rows.map((r) => Number(r.value) || 0));
  const wrap = el('div', { class: 'reportes__bars', role: 'list' });
  rows.forEach((r) => {
    const pct = r.pct != null ? r.pct : (max ? (Number(r.value) || 0) / max : 0);
    const w = Math.max(0, Math.min(100, pct * 100));
    wrap.append(el('div', { class: 'reportes__bar', role: 'listitem' }, [
      el('span', { class: 'reportes__bar-label u-truncate', text: r.label }),
      el('span', { class: 'reportes__bar-track', 'aria-hidden': 'true' }, [
        el('span', { class: 'reportes__bar-fill', style: { width: w + '%', background: r.color || 'var(--grad-gold)' } }),
      ]),
      el('span', { class: 'reportes__bar-val u-mono', text: r.display != null ? r.display : String(r.value) }),
    ]));
  });
  return wrap;
}

/**
 * Sparkline área+línea. points = [{label, value}]. Escala al ancho del contenedor.
 */
export function lineChart(points) {
  const W = 600, H = 140, P = 6;
  const vals = points.map((p) => Number(p.value) || 0);
  const peak = Math.max(...vals, 0);
  const max = Math.max(1, peak);
  const n = points.length;
  const x = (i) => (n <= 1 ? W / 2 : P + (i * (W - 2 * P)) / (n - 1));
  const y = (v) => H - P - (v / max) * (H - 2 * P);
  const linePts = points.map((p, i) => `${x(i).toFixed(1)},${y(vals[i]).toFixed(1)}`).join(' ');
  const areaPts = `${P},${H - P} ${linePts} ${(W - P).toFixed(1)},${H - P}`;
  const total = vals.reduce((s, v) => s + v, 0);
  const peakLabel = (points[vals.indexOf(peak)] || {}).label || '';

  return svgEl('svg', {
    class: 'reportes__spark', viewBox: `0 0 ${W} ${H}`, preserveAspectRatio: 'none',
    role: 'img', 'aria-label': `Tendencia: ${total} en total; pico de ${peak}${peakLabel ? ' el ' + peakLabel : ''}.`,
  }, [
    svgEl('polygon', { points: areaPts, fill: 'var(--gold-300)', opacity: '0.30' }),
    svgEl('polyline', {
      points: linePts, fill: 'none', stroke: 'var(--gold-500)', 'stroke-width': '2',
      'stroke-linejoin': 'round', 'stroke-linecap': 'round', 'vector-effect': 'non-scaling-stroke',
    }),
  ]);
}
