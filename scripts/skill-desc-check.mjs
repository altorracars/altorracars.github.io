#!/usr/bin/env node
// skill-desc-check — gate: ninguna description de SKILL.md debe pasar el límite del
// instalador manual de skills. Regla SEGURA: ≤1024 BYTES UTF-8 (si bytes ≤1024, chars
// también; los acentos/flechas pesan doble → medir con node, NUNCA con `wc -m`).
// Uso: node scripts/skill-desc-check.mjs [dir]   (default: skills/ del repo)
// Sale 1 si alguna se pasa (gate). Origen: TODO-36 / §232 (el dueño chocó el límite manual).
import fs from 'node:fs';
import path from 'node:path';

const LIMIT = 1024;

function* walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (e.name === 'SKILL.md') yield p;
  }
}

function getDesc(t) {
  const fm = t.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fm) return null;
  const lines = fm[1].split(/\r?\n/);
  const i = lines.findIndex((l) => /^description:/.test(l));
  if (i < 0) return null;
  let val = lines[i].replace(/^description:\s*/, '');
  if (/^[>|]/.test(val.trim())) {
    val = '';
    for (let j = i + 1; j < lines.length; j++) {
      if (/^\S/.test(lines[j])) break;
      val += lines[j].trim() + ' ';
    }
  } else {
    for (let j = i + 1; j < lines.length; j++) {
      if (/^\S/.test(lines[j]) || lines[j].trim() === '') break;
      val += ' ' + lines[j].trim();
    }
  }
  return val.replace(/^["']|["']$/g, '').trim();
}

const root = process.argv[2] || 'skills';
if (!fs.existsSync(root)) {
  console.error(`skill-desc-check: no existe ${root}`);
  process.exit(0);
}
const rows = [];
for (const f of walk(root)) {
  const d = getDesc(fs.readFileSync(f, 'utf8')) || '';
  rows.push({ name: path.basename(path.dirname(f)), chars: d.length, bytes: Buffer.byteLength(d, 'utf8') });
}
rows.sort((a, b) => b.bytes - a.bytes);
const over = rows.filter((r) => r.bytes > LIMIT || r.chars > LIMIT);

console.log(`🧮 skill-desc-check — ${rows.length} SKILL.md en ${root} (límite ${LIMIT})`);
if (over.length) {
  console.log(`❌ ${over.length} description(s) sobre ${LIMIT} [chars | bytes]:`);
  for (const r of over) console.log(`   ${String(r.chars).padStart(5)} | ${String(r.bytes).padStart(5)}  ${r.name}`);
  process.exit(1);
}
const near = rows.filter((r) => r.bytes > LIMIT - 64).slice(0, 5);
console.log(`✅ 0 sobre ${LIMIT}. Más cercanas [chars | bytes]:`);
for (const r of near.length ? near : rows.slice(0, 3)) {
  console.log(`   ${String(r.chars).padStart(5)} | ${String(r.bytes).padStart(5)}  ${r.name}`);
}
