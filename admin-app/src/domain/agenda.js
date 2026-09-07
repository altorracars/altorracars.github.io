// ============================================================
// AGENDA — lógica PURA del calendario (grilla de mes, agrupación).
// Semana Lunes→Domingo. Claves de día en hora LOCAL (no UTC) para no
// correr eventos de día por zona horaria.
// ============================================================

export const WEEKDAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
export const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

/** Clave de día LOCAL "YYYY-MM-DD" (no usar toISOString → corre por UTC). */
export function dayKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** Matriz de semanas (cada una = 7 celdas {date, inMonth}) para year/month (0-11). */
export function monthMatrix(year, month) {
  const first = new Date(year, month, 1);
  const offset = (first.getDay() + 6) % 7; // días previos para empezar en Lunes
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < offset; i++) cells.push({ date: new Date(year, month, 1 - offset + i), inMonth: false });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ date: new Date(year, month, d), inMonth: true });
  while (cells.length % 7 !== 0) {
    const last = cells[cells.length - 1].date;
    cells.push({ date: new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1), inMonth: false });
  }
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

/** Rango ISO [start, end) que cubre toda la grilla visible (para la query). */
export function gridRange(year, month) {
  const weeks = monthMatrix(year, month);
  const start = weeks[0][0].date;
  const lastWeek = weeks[weeks.length - 1];
  const endCell = lastWeek[6].date;
  const end = new Date(endCell.getFullYear(), endCell.getMonth(), endCell.getDate() + 1);
  return { startISO: start.toISOString(), endISO: end.toISOString() };
}

/** Agrupa eventos (con dueAt ISO) por clave de día local. */
export function groupByDay(events) {
  const map = {};
  for (const ev of events) {
    if (!ev.dueAt) continue;
    const k = dayKey(new Date(ev.dueAt));
    (map[k] || (map[k] = [])).push(ev);
  }
  for (const k of Object.keys(map)) {
    map[k].sort((a, b) => new Date(a.dueAt) - new Date(b.dueAt));
  }
  return map;
}

export function timeOf(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
}

export function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
