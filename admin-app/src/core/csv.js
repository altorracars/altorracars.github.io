// ============================================================
// OLA-2.4 — CSV compartido (extraído de reportes, que era el
// único dueño). §270.12: los 6 exports visibles migraron a
// core/xlsx.js (Excel corporativo); este módulo QUEDA como
// utilidad por decisión del plan — sin consumidores UI hoy.
//
// FEEDBACK DUEÑO 04/07 (capturas Excel): con separador ',' Excel
// es-CO metía TODO en la columna A (su separador de lista es ';')
// y el apóstrofe anti-fórmula quedaba VISIBLE en los teléfonos.
// → Separador ';' (Excel Colombia abre en columnas al doble click)
// → Anti-inyección SOLO donde hay riesgo real: '=' '@' y '+/-' NO
//   numéricos ejecutan; un teléfono '+573…' evaluado da un número
//   inofensivo, así que va limpio (sin apóstrofe feo).
// → fmtFechaCsv: ISO → "dd/mm/aaaa hh:mm" legible.
// ============================================================

const SEP = ';';

function csvCell(v) {
  let s = v == null ? '' : String(v);
  // Riesgo real de ejecución en Excel: =CMD|…, @SUM(…), o +/- que arman
  // fórmula NO-numérica. "+573001234567" evalúa a un número — inofensivo.
  if (/^[=@\t\r]/.test(s)) s = "'" + s;
  else if (/^[+-]/.test(s) && !/^[+-]?[\d\s().-]+$/.test(s)) s = "'" + s;
  // RFC-4180 sobre el separador ';' (+ ',' y comillas/saltos por seguridad).
  return /[",\n\r;]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
}

export function toCsv(rows) {
  return '﻿' + rows.map((r) => r.map(csvCell).join(SEP)).join('\r\n');
}

/** ISO/Date → "dd/mm/aaaa hh:mm" (hora local del navegador). Vacío si no parsea. */
export function fmtFechaCsv(v) {
  if (!v) return '';
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return String(v);
  const p = (n) => String(n).padStart(2, '0');
  return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

export function downloadText(filename, text, mime = 'text/csv;charset=utf-8;') {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Atajo: rows = array de arrays (1ª fila = headers). */
export function exportCsv(filename, rows) {
  downloadText(filename, toCsv(rows));
}
