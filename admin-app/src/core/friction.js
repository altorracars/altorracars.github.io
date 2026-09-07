// ============================================================
// friction.js — F33a (ADR §179, E1a): fricción INSTRUMENTADA.
// Mide tiempo-por-tarea de los flujos críticos (lead rápido, próximo paso)
// contra los umbrales F39 del comité (lead <30s, quick-log <10s). Local y
// $0: ring-buffer en localStorage; se consulta con window.__friccion() en
// la consola del portal. Si un prompt produce demoras/abandono se detecta
// en semanas, no meses después con las métricas ya envenenadas.
// ============================================================

const KEY = 'altorra_friction_v1';
const MAX = 300;

export function frictionTrack(task, startedAtMs, extra = {}) {
  try {
    const ms = Math.max(0, Math.round(performance.now() - startedAtMs));
    const arr = JSON.parse(localStorage.getItem(KEY) || '[]');
    arr.push({ task, ms, at: new Date().toISOString(), ...extra });
    while (arr.length > MAX) arr.shift();
    localStorage.setItem(KEY, JSON.stringify(arr));
  } catch (e) { /* la métrica jamás rompe el flujo */ }
}

export function frictionReport() {
  try {
    const arr = JSON.parse(localStorage.getItem(KEY) || '[]');
    const byTask = {};
    for (const r of arr) (byTask[r.task] = byTask[r.task] || []).push(r.ms);
    const report = {};
    for (const [task, list] of Object.entries(byTask)) {
      const sorted = [...list].sort((a, b) => a - b);
      report[task] = {
        n: list.length,
        mediana_s: +(sorted[Math.floor(sorted.length / 2)] / 1000).toFixed(1),
        p90_s: +(sorted[Math.floor(sorted.length * 0.9)] / 1000).toFixed(1),
      };
    }
    return report;
  } catch (e) { return {}; }
}

// Consola del portal: window.__friccion()
if (typeof window !== 'undefined') window.__friccion = frictionReport;
