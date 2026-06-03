#!/usr/bin/env node
// ===========================================================
// 🧠 brain-check — Linter de integridad del cerebro neuronal
// ===========================================================
// Mitiga la "fatiga de mantenimiento" del LLM (un script NO se vuelve perezoso).
// READ-ONLY: reporta problemas, no modifica nada. Lo corre el Reflejo de
// Auto-auditoría (CLAUDE.md §G.4) al arrancar Y antes de cerrar la sesión (§152).
//
//   node scripts/brain-check.mjs    (o: npm run brain:check)
//
// Chequea: (1) neuronas huérfanas, (2) saturación de capacidad (§G.5),
//          (3) desync del índice 00-INDICE → 99-HISTORIAL (fragilidad del offset),
//          (4) frescura docs↔realidad: cache SW==cache-manager, 05 vigente==SW, origin/main (§153).
// ===========================================================
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DOCS = join(ROOT, 'docs');
let problems = 0;
const warn = (m) => { console.log('  ⚠️  ' + m); problems++; };
const ok = (m) => console.log('  ✅ ' + m);
const read = (p) => readFileSync(p, 'utf-8');

console.log('\n🧠 BRAIN-CHECK — integridad del cerebro neuronal\n');

// Topes §G.5 (auto-cargadas en rojo)
const CAPS = {
  'CLAUDE.md': 320, 'docs/05-ESTADO-GLOBAL.md': 25, 'docs/10-MEMORIA-CORTO-PLAZO.md': 110,
  'docs/20-MEMORIA-ESPACIAL.md': 280, 'docs/30-LECCIONES.md': 350, 'docs/00-INDICE.md': 450,
};

const claude = read(join(ROOT, 'CLAUDE.md'));

// Registry de lóbulos de dominio (Omni-Brain, ADR §125): los lóbulos hijos
// (41-SEGURIDAD, 42-LEGAL, 43-UX, ... 49-*) NO viven en CLAUDE.md §0 — se
// registran en 40-LOBULOS-DOMINIO.md. Leerlo para no marcarlos huérfanos.
const lobeRegistryPath = join(DOCS, '40-LOBULOS-DOMINIO.md');
const lobeRegistry = existsSync(lobeRegistryPath) ? read(lobeRegistryPath) : '';

// 1) Neuronas huérfanas: toda docs/NN-*.md debe estar referenciada en CLAUDE.md
//    (excepto lóbulos hijos 41-49, que se registran en 40-LOBULOS-DOMINIO).
console.log('1) Neuronas huérfanas (registradas en CLAUDE.md / 40-LOBULOS):');
const neurons = readdirSync(DOCS).filter((f) => /^\d{2}-.*\.md$/.test(f));
for (const n of neurons) {
  const isChildLobe = /^4[1-9]-/.test(n); // 41..49 = lóbulos de dominio hijos
  if (claude.includes(n)) ok(`${n}`);
  else if (isChildLobe && lobeRegistry.includes(n)) ok(`${n} (lóbulo hijo → 40-LOBULOS-DOMINIO)`);
  else if (isChildLobe) warn(`${n} lóbulo hijo NO registrado en 40-LOBULOS-DOMINIO`);
  else warn(`${n} NO referenciada en CLAUDE.md → HUÉRFANA (conectar en §0)`);
}

// 2) Capacidad (§G.5)
console.log('\n2) Capacidad de neuronas (§G.5):');
for (const [rel, cap] of Object.entries(CAPS)) {
  const p = join(ROOT, rel);
  if (!existsSync(p)) { warn(`${rel} no existe`); continue; }
  const lines = read(p).split('\n').length;
  if (lines > Math.round(cap * 1.1)) warn(`${rel}: ${lines} líneas (tope ~${cap}) → SHARD/poda`);
  else if (lines > cap) console.log(`  ↗  ${rel}: ${lines} (tope ~${cap}, leve exceso)`);
  else ok(`${rel}: ${lines}/${cap}`);
}

// 3) Desync del índice: cada "| §X | tema | N |" debe apuntar a un header "## " del historial
console.log('\n3) Desync índice 00-INDICE → 99-HISTORIAL (fragilidad offset):');
const indice = read(join(DOCS, '00-INDICE.md')).split('\n');
const hist = read(join(DOCS, '99-HISTORIAL-ADR.md')).split('\n');
let checked = 0, desync = 0;
for (const row of indice) {
  const m = row.match(/^\|\s*§([\w.]+)\s*\|.*\|\s*(\d+)\s*\|\s*$/);
  if (!m) continue;
  const sec = m[1], ln = parseInt(m[2], 10);
  const target = hist[ln - 1] || '';
  checked++;
  if (!/^##\s/.test(target)) { warn(`§${sec} → línea ${ln} NO es un header (desync)`); desync++; }
  else if (/^\d+$/.test(sec.split('.')[0]) && !new RegExp(`^##\\s+${sec.split('.')[0]}[.\\s]`).test(target)) {
    warn(`§${sec} → línea ${ln} apunta a OTRO § ("${target.replace(/^##\s*/, '').slice(0, 28)}…") → offset drift`); desync++;
  }
}
if (checked && !desync) ok(`${checked} entradas del índice apuntan a headers válidos`);

// 4) Frescura: docs vs realidad de archivos/git. Mueve la clase de error "doc stale"
//    de un reflejo que debo RECORDAR a un check determinista (§153). El script no se distrae.
console.log('\n4) Frescura (docs ↔ realidad de archivos/git):');
const swPath = join(ROOT, 'service-worker.js');
const cmPath = join(ROOT, 'js/core/cache-manager.js');
const swVer = existsSync(swPath) ? (read(swPath).match(/CACHE_VERSION\s*=\s*'v?(\d{14})'/) || [])[1] : null;
const cmVer = existsSync(cmPath) ? (read(cmPath).match(/APP_VERSION\s*=\s*'v?(\d{14})'/) || [])[1] : null;
// 4a) service-worker.js CACHE_VERSION == cache-manager.js APP_VERSION (§4)
if (swVer && cmVer) {
  if (swVer === cmVer) ok(`cache SW == cache-manager (v${swVer})`);
  else warn(`cache DESYNC: SW=v${swVer} ≠ cache-manager=v${cmVer} → bumpear AMBOS (§4)`);
} else warn('no pude parsear CACHE_VERSION/APP_VERSION (¿cambió el formato?)');
// 4b) 05-ESTADO-GLOBAL "Cache version vigente" == SW real
const estadoPath = join(DOCS, '05-ESTADO-GLOBAL.md');
const estado = existsSync(estadoPath) ? read(estadoPath) : '';
const vigLine = estado.split('\n').find((l) => /Cache version vigente/i.test(l)) || '';
const vig = (vigLine.match(/v(\d{14})/) || [])[1];
if (swVer && vig) {
  if (vig === swVer) ok(`05 cache vigente == SW (v${swVer})`);
  else warn(`05 STALE: declara cache vigente v${vig} pero SW=v${swVer} → actualizar 05`);
} else if (swVer && !vig) warn('05 no declara una "Cache version vigente vYYYYMMDDHHMMSS" parseable');
// 4c) origin/main mencionado en 05 vs git real (SOFT: una ref local sin fetch daría falso positivo)
try {
  const realMain = execSync('git rev-parse --short origin/main', { cwd: ROOT, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
  // Match el patrón de asignación "origin/main = <sha>" en cualquier parte de 05 (robusto
  // a que otras filas mencionen "origin/main"/"Producción" sin asignar sha).
  const claimed = (estado.match(/origin\/main`?\s*=\s*\*{0,2}`?([0-9a-f]{7,40})/) || [])[1];
  if (realMain && claimed) {
    if (realMain.startsWith(claimed) || claimed.startsWith(realMain)) ok(`05 origin/main (${claimed}) == git (${realMain})`);
    else console.log(`  ℹ️  05 dice origin/main=${claimed} pero git=${realMain} → verificar (¿05 stale o ref local sin fetch?)`);
  } else if (!claimed) console.log('  ℹ️  05 sin sha de origin/main parseable (check omitido)');
} catch { console.log('  ℹ️  origin/main no disponible (sin remoto/fetch) — check de sha omitido'); }

// 5) Integridad de referencias cruzadas — huecos ocultos en TODO el cerebro (§154).
//    Determinista: ADRs sin índice, lecciones/meta colgantes, hojas referenciadas inexistentes.
console.log('\n5) Referencias cruzadas (huecos en el cerebro):');
const histText = read(join(DOCS, '99-HISTORIAL-ADR.md'));
const indiceText = read(join(DOCS, '00-INDICE.md'));
const leccionesText = read(join(DOCS, '30-LECCIONES.md'));
const espacialPath = join(DOCS, '20-MEMORIA-ESPACIAL.md');
const cortoPath = join(DOCS, '10-MEMORIA-CORTO-PLAZO.md');
// 5a) Todo ADR "## NN." de 99 debe tener fila "| §NN |" en 00-INDICE (decisión sin índice = hueco)
const adrNums = new Set([...histText.matchAll(/^##\s+(\d+)\./gm)].map((m) => m[1]));
const idxNums = new Set([...indiceText.matchAll(/^\|\s*§(\d+)\b/gm)].map((m) => m[1]));
const missingIdx = [...adrNums].filter((n) => !idxNums.has(n)).sort((a, b) => +a - +b);
if (!adrNums.size) warn('no detecté ADRs "## NN." en 99 (¿cambió el formato?)');
else if (!missingIdx.length) ok(`${adrNums.size} ADRs de 99 indexados en 00`);
else warn(`${missingIdx.length} ADR(s) de 99 SIN fila en 00-INDICE: §${missingIdx.join(', §')}`);
// 5b) Referencias L-/M- en todo el cerebro deben estar definidas (### L-NN/M-NN) en 30
const defined = new Set([...leccionesText.matchAll(/^###\s+([LM]-\d{2})\b/gm)].map((m) => m[1]));
const allBrain = [claude, indiceText, estado, leccionesText, histText,
  existsSync(cortoPath) ? read(cortoPath) : '',
  existsSync(espacialPath) ? read(espacialPath) : ''].join('\n');
const referenced = new Set([...allBrain.matchAll(/\b([LM]-\d{2})\b/g)].map((m) => m[1]));
const dangling = [...referenced].filter((r) => !defined.has(r)).sort();
if (!dangling.length) ok(`refs L-/M- (${referenced.size} usadas / ${defined.size} def) todas resuelven en 30`);
else warn(`refs L-/M- COLGANTES (sin def en 30): ${dangling.join(', ')} → definir o corregir`);
// 5c) Hojas docs/*.md referenciadas en CLAUDE.md deben existir
const refDocs = new Set([...claude.matchAll(/docs\/([\w-]+\.md)/g)].map((m) => m[1]));
const PLACEHOLDER = /^NN-|NOMBRE/; // ej. docs/NN-NOMBRE.md = plantilla de neurogénesis (§G.4/§G.5), no archivo real
const missingDocs = [...refDocs].filter((f) => !PLACEHOLDER.test(f) && !existsSync(join(DOCS, f)));
if (!missingDocs.length) ok(`hojas docs/*.md referenciadas en CLAUDE.md (${refDocs.size}) existen`);
else warn(`hojas referenciadas en CLAUDE.md INEXISTENTES: ${missingDocs.join(', ')}`);
// 5d) Rutas js/ PLANAS (sin subcarpeta) en neuronas vivas = stale post-§119 (todo js/ es modular)
const liveForPaths = { 'CLAUDE.md': claude, '05': estado,
  '10': existsSync(cortoPath) ? read(cortoPath) : '', '20': existsSync(espacialPath) ? read(espacialPath) : '' };
const flatRefs = [];
for (const [name, txt] of Object.entries(liveForPaths))
  for (const mm of txt.matchAll(/\bjs\/[^/\s`)*]+\.m?js\b/g)) flatRefs.push(`${name}:${mm[0]}`);
if (!flatRefs.length) ok('sin rutas js/ planas en neuronas vivas (todo modular post-§119)');
else warn(`rutas js/ PLANAS (stale post-§119): ${flatRefs.join(', ')} → usar ruta modular`);

console.log(`\n${problems === 0 ? '✅ CEREBRO SANO' : '⚠️  ' + problems + ' problema(s) — revisar antes de avanzar'}\n`);
process.exit(problems ? 1 : 0);
