// ============================================================
// OLA-2.4 — CSV compartido (extraído de reportes.ui, que era el
// único dueño). RFC-4180 + BOM UTF-8 + anti-inyección de fórmulas
// (E4 review #15: nombres vienen de forms públicos — "=HYPERLINK"
// se ejecutaría al abrir en Excel). Consumers: reportes, contactos,
// pipeline, aliados, agenda (vehículos conserva su export VERBATIM
// del clásico en vehicles.data — contrato de headers propio).
// ============================================================

function csvCell(v) {
  let s = v == null ? '' : String(v);
  // Prefijo ' salvo números puros (los montos no se rompen).
  if (/^[=+\-@\t\r]/.test(s) && !/^-?\d+([.,]\d+)?$/.test(s)) s = "'" + s;
  // RFC-4180: entrecomilla si hay comilla, coma o salto de línea; + ';' por Excel es-CO.
  return /[",\n\r;]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
}

export function toCsv(rows) {
  return '﻿' + rows.map((r) => r.map(csvCell).join(',')).join('\r\n');
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
