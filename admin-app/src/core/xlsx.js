// ============================================================
// OLA-2.x — XLSX corporativo (§270.12a, feedback dueño 04/07).
// Reemplaza los 6 exports CSV visibles: el dueño recibe un Excel
// de marca (banda ink-950 + dorado #b89658, logo, headers dorados,
// zebra, autoFilter, formatos COP/fecha) en vez de texto plano.
// `core/csv.js` se queda como utilidad (decisión §270.12).
//
// exceljs va en import() DYNAMIC: es CJS y pesa ~940KB min — Vite
// lo separa en chunk que solo baja al primer click de "Excel"
// (el bundle principal ya pesa 1.37MB, no se le suma nada).
//
// ⚠️ exceljs serializa Date como UTC: una cita 15:00 Bogotá (UTC-5)
// saldría 20:00 en Excel → se compensa con getTimezoneOffset() al
// escribir la celda (writeDate), el consumidor pasa Dates normales.
// ============================================================

import logoUrl from '../assets/logo-wheel-128.png';

const BRAND = {
  band: 'FF050507',      // ink-950 — banda de marca
  gold: 'FFB89658',      // dorado marca (§1)
  headFill: 'FFD4A85A',  // gold-500 — fill de headers
  headInk: 'FF16161C',   // ink-800 — texto sobre dorado
  zebra: 'FFF8F8F9',     // ink-50 — filas pares
  muted: 'FF8A8A95',     // ink-400 — subtítulos/notas
  stroke: 'FF95773B',    // gold-700 — borde bajo headers
};

const FMT = {
  cop: '"$"#,##0',
  int: '#,##0',
  date: 'dd/mm/yyyy hh:mm',
};

/** ISO/millis → Date para celdas de fecha (o '' si no parsea). */
export function xlsxDate(v) {
  if (!v) return '';
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? String(v) : d;
}

/** Compensa la serialización UTC de exceljs (la hora mostrada = hora local). */
function writeDate(d) {
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000);
}

function sheetName(s) {
  return String(s || 'Hoja').replace(/[[\]*?:/\\]/g, ' ').slice(0, 31);
}

async function logoBase64() {
  try {
    const blob = await (await fetch(logoUrl)).blob();
    return await new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(r.result);
      r.onerror = rej;
      r.readAsDataURL(blob);
    });
  } catch {
    return null; // sin logo la banda tipográfica sigue siendo de marca
  }
}

/** Ancho por contenido: header vs valores (formateados), acotado 9..42. */
function colWidth(header, values, type) {
  if (type === 'date') return 17;
  let max = String(header || '').length;
  for (const v of values) {
    const len = v instanceof Date ? 16
      : typeof v === 'number' ? String(Math.round(v)).length + Math.floor(String(Math.round(v)).length / 3) + (type === 'cop' ? 2 : 0)
        : String(v == null ? '' : v).length;
    if (len > max) max = len;
  }
  return Math.min(Math.max(max + 3, 9), 42);
}

/** Celda con override puntual: {v, t:'cop'|'int'|'date'|'text'}. */
function unwrap(cell) {
  return cell && typeof cell === 'object' && !(cell instanceof Date) && 'v' in cell
    ? cell : { v: cell, t: null };
}

function buildSheet(wb, spec, logoId) {
  const { title, rows, types = [], note } = spec;
  const headers = rows[0] || [];
  const data = rows.slice(1);
  const nCols = Math.max(headers.length, ...data.map((r) => r.length), 1);
  const ws = wb.addWorksheet(sheetName(spec.name || title), {
    views: [{ state: 'frozen', ySplit: 4 }],
  });

  // ── Banda de marca (filas 1-2) + logo ──
  ws.getRow(1).height = 30;
  ws.getRow(2).height = 20;
  for (let c = 1; c <= nCols; c++) {
    ws.getCell(1, c).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: BRAND.band } };
    ws.getCell(2, c).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: BRAND.band } };
  }
  if (nCols > 1) {
    ws.mergeCells(1, 2, 1, nCols);
    ws.mergeCells(2, 2, 2, nCols);
  }
  const t1 = ws.getCell(1, Math.min(2, nCols));
  t1.value = {
    richText: [
      { text: 'ALTORRA', font: { name: 'Calibri', size: 15, bold: true, color: { argb: BRAND.gold } } },
      { text: '   ' + (title || ''), font: { name: 'Calibri', size: 12, color: { argb: 'FFF2F2F5' } } },
    ],
  };
  t1.alignment = { vertical: 'middle' };
  const t2 = ws.getCell(2, Math.min(2, nCols));
  t2.value = 'Generado el ' + new Date().toLocaleString('es-CO', { dateStyle: 'short', timeStyle: 'short' }) + ' — Altorra Company SAS';
  t2.font = { name: 'Calibri', size: 9, color: { argb: BRAND.muted } };
  t2.alignment = { vertical: 'middle' };
  if (logoId != null) {
    ws.addImage(logoId, { tl: { col: 0.15, row: 0.1 }, ext: { width: 46, height: 46 }, editAs: 'absolute' });
    ws.getColumn(1).width = Math.max(ws.getColumn(1).width || 0, 8);
  }

  // ── Fila 3: nota de contexto (o respiro en blanco) ──
  ws.getRow(3).height = note ? 14 : 8;
  if (note) {
    if (nCols > 1) ws.mergeCells(3, 1, 3, nCols);
    const n = ws.getCell(3, 1);
    n.value = note;
    n.font = { name: 'Calibri', size: 8, italic: true, color: { argb: BRAND.muted } };
    n.alignment = { vertical: 'middle' };
  }

  // ── Fila 4: headers dorados + autoFilter ──
  const hr = ws.getRow(4);
  headers.forEach((h, i) => {
    const cell = hr.getCell(i + 1);
    cell.value = h;
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: BRAND.headFill } };
    cell.font = { name: 'Calibri', size: 10, bold: true, color: { argb: BRAND.headInk } };
    cell.border = { bottom: { style: 'medium', color: { argb: BRAND.stroke } } };
    cell.alignment = { vertical: 'middle', wrapText: false };
  });
  hr.height = 20;
  if (headers.length) {
    ws.autoFilter = { from: { row: 4, column: 1 }, to: { row: 4, column: headers.length } };
  }

  // ── Datos con zebra + formatos por tipo ──
  data.forEach((row, r) => {
    const xr = ws.getRow(5 + r);
    row.forEach((raw, c) => {
      const { v, t } = unwrap(raw);
      const type = t || types[c] || (v instanceof Date ? 'date' : null);
      const cell = xr.getCell(c + 1);
      cell.value = v instanceof Date ? writeDate(v) : (v == null ? '' : v);
      if (type === 'cop') cell.numFmt = FMT.cop;
      else if (type === 'int') cell.numFmt = FMT.int;
      else if (type === 'date' && v instanceof Date) cell.numFmt = FMT.date;
      cell.font = { name: 'Calibri', size: 10 };
      if (r % 2 === 1) cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: BRAND.zebra } };
    });
  });

  // ── Anchos por contenido ──
  for (let c = 0; c < nCols; c++) {
    const vals = data.map((r) => { const u = unwrap(r[c]); return u.v; });
    ws.getColumn(c + 1).width = colWidth(headers[c], vals, types[c]);
  }
  return ws;
}

/**
 * Exporta un Excel corporativo Altorra.
 * @param {string} filename  p.ej. 'altorra-contactos-2026-07-04.xlsx'
 * @param {object|object[]} sheets  { name?, title, rows, types?, note? }
 *   rows[0] = headers (misma forma que exportCsv). types por columna:
 *   'cop' | 'int' | 'date' | 'text'; celda suelta: { v, t } para override.
 */
export async function exportXlsx(filename, sheets) {
  const mod = await import('exceljs');
  const ExcelJS = mod.default || mod;
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Altorra CRM';
  wb.created = new Date();

  const base64 = await logoBase64();
  const logoId = base64 != null ? wb.addImage({ base64, extension: 'png' }) : null;

  (Array.isArray(sheets) ? sheets : [sheets]).forEach((spec) => buildSheet(wb, spec, logoId));

  const buf = await wb.xlsx.writeBuffer();
  const blob = new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Barra de bloques proporcional (las "gráficas" del Excel — decisión §270.12). */
export function blockBar(value, max, width = 18) {
  if (!max || !value) return '';
  return '█'.repeat(Math.max(1, Math.round((value / max) * width)));
}
