#!/usr/bin/env node
// ============================================================
// brain-index.mjs — GENERA el mapa de ruteo §→línea desde los headers de 99-HISTORIAL.
//
// TODO-32 Etapa 1 (PRUEBA, cars-local, SHADOW): emite `docs/00-INDICE.generated.md`
// SIN tocar el índice hecho a mano. La idea (deliberación comité+Gemini, bóveda
// 2026-06-22-TODO32-…): el índice no debe COMPRIMIRSE a mano (pérdida permanente,
// el error de §227) — debe COMPILARSE del genoma del documento (lossless, regenerable).
// Esta etapa lo prueba con cero riesgo: genera un shadow y se diffea contra el real.
//
// GATE (invariante del experto adversarial A): si un header no parsea, falta título,
// o hay id duplicado → ERROR (exit 1). Un índice generado solo vale si es mecánico
// y rechaza lo malformado — sin honor.
//
// La capa de ruteo SEMÁNTICO (síntoma→neurona) NO se autogenera: es inteligencia
// humana y sigue viviendo a mano en 00-INDICE.md (eso es lo que Gemini llamó la capa
// de traducción / anzuelos ricos). Este script solo compila el mapa §→línea mecánico.
// ============================================================
import { readFileSync, writeFileSync } from 'node:fs';

const SRC = 'docs/99-HISTORIAL-ADR.md';
const OUT = 'docs/00-INDICE.generated.md';
// Captura ADRs top-level (`## 227. …`) Y sub-numerados (`## 60.1 …`, `## 60.1.1 …`).
const reHeader = /^## (\d+(?:\.\d+)*)\.?\s+(.+?)\s*$/;
// Orden numérico por segmentos: §60 < §60.1 < §60.2 < §61.
const cmpId = (a, b) => {
  const pa = a.split('.').map(Number);
  const pb = b.split('.').map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] ?? -1) - (pb[i] ?? -1);
    if (d) return d;
  }
  return 0;
};

const lines = readFileSync(SRC, 'utf8').split('\n');
const rows = [];
const seen = new Map();
const errors = [];

lines.forEach((line, i) => {
  const m = line.match(reHeader);
  if (!m) return;
  const id = m[1];
  const lineNo = i + 1;
  // hook = título limpio: quita "ADR-NNN — " redundante, el ⟦tag⟧ y la (fecha) final.
  const hook = m[2]
    .replace(/^ADR-\d+\s*[—-]\s*/, '')
    .replace(/\s*⟦[^⟧]*⟧\s*/g, ' ')
    .replace(/\s*\(\d{4}-\d{2}-\d{2}\)\s*$/, '')
    .trim();
  if (!hook) errors.push(`§${id} (línea ${lineNo}): header sin título tras parsear`);
  if (seen.has(id)) errors.push(`§${id} DUPLICADO (líneas ${seen.get(id)} y ${lineNo})`);
  seen.set(id, lineNo);
  rows.push({ id, hook, lineNo });
});

if (errors.length) {
  console.error(`❌ GATE brain-index: ${errors.length} problema(s) de integridad:`);
  errors.forEach((e) => console.error('  - ' + e));
  process.exit(1);
}

rows.sort((a, b) => cmpId(a.id, b.id));
const body = rows.map((r) => `| §${r.id} | ${r.hook} | ${r.lineNo} |`).join('\n');
const out = `# 🗂️ 00-INDICE (GENERADO — TODO-32 Etapa 1 SHADOW · ⛔ NO editar a mano)

> Compilado por \`scripts/brain-index.mjs\` desde los headers \`## NN.\` de ${SRC}.
> **${rows.length} ADRs** · mapa §→línea mecánico, sin pérdida ni desync (se regenera, no se comprime).
> La capa de ruteo SEMÁNTICO (síntoma→neurona) sigue a mano en \`00-INDICE.md\` (inteligencia humana).
> PRUEBA de la doctrina "Genoma" (deliberación comité+Gemini): el índice se COMPILA, no se mantiene a mano.

| § | Hook (título del ADR) | Línea |
|---|---|---|
${body}
`;
writeFileSync(OUT, out);
console.log(`✅ ${rows.length} ADRs compilados → ${OUT} (0 errores de integridad)`);
