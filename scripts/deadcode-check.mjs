#!/usr/bin/env node
/**
 * deadcode-check.mjs — 🛡️ GATEKEEPER anti-Knight-Capital (TODO-35)
 * ────────────────────────────────────────────────────────────────────────
 * Detecta el "8º servidor": Cloud Functions DESPLEGADAS en prod que YA NO
 * están en el código fuente (`functions/index.js`). Esas son huérfanas vivas
 * — el escenario literal de Knight Capital ($460M): código viejo que nadie
 * cree que corre, pero corre.
 *
 * Diff POR NOMBRE (no por región — los triggers de la BD viven en
 * southamerica-east1 a propósito; un diff por región daría falsos positivos).
 * Parse ESTÁTICO de los `exports.X` (NO `require()` — index.js ejecuta
 * side-effects: admin.init, defineSecret, registros de funciones).
 *
 * INVARIANTE (guardián §G.4): CUARENTENA > BORRADO. Este gate REPORTA + FALLA
 * (exit 1) para que NADIE deje huérfanas vivas; el borrado real (revocar IAM /
 * mock-trigger / `firebase functions:delete`) lo decide un HUMANO tras revisar
 * logs (≥15 días limpios) — nunca el script a ciegas.
 *
 * El listado de prod lo captura el npm script (la llamada a firebase vive en
 * el shell de npm, no en este .mjs → este archivo es lógica pura y testeable):
 *   "deadcode:check": "firebase functions:list --json > .deadcode-fns.json && node scripts/deadcode-check.mjs .deadcode-fns.json"
 * Necesita firebase CLI AUTENTICADO (red) → NO corre en `brain:check` offline.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const fnFile = process.argv[2] || join(ROOT, '.deadcode-fns.json');

// 1) Funciones desplegadas (JSON capturado por el npm script: {result:[{id,region}]}).
let deployed;
try {
  const parsed = JSON.parse(readFileSync(fnFile, 'utf8'));
  const list = parsed.result || parsed.functions || (Array.isArray(parsed) ? parsed : []);
  deployed = list.map((f) => ({
    id: f.id || f.entryPoint || f.functionName,
    region: f.region || (f.eventTrigger && f.eventTrigger.region) || '?',
  })).filter((f) => f.id);
} catch (e) {
  console.error(`[deadcode-check] no pude leer/parsear ${fnFile} (¿corriste 'firebase functions:list --json'? ¿CLI autenticado?):`, e.message);
  process.exit(2);
}

// 2) Exports del source (parse estático). index.js = único entrypoint; los
//    sub-módulos se re-exportan vía `exports.X = require('./src/...').X`.
const idx = readFileSync(join(ROOT, 'functions', 'index.js'), 'utf8');
const sourceExports = new Set([...idx.matchAll(/^exports\.(\w+)\s*=/gm)].map((m) => m[1]));

// 3) Diff por NOMBRE.
const orphans = deployed.filter((d) => !sourceExports.has(d.id));
const byName = {};
for (const d of deployed) (byName[d.id] = byName[d.id] || []).push(d.region);
const dups = Object.entries(byName).filter(([, regs]) => regs.length > 1);
const notDeployed = [...sourceExports].filter((s) => !deployed.some((d) => d.id === s));

console.log('\n🛡️  deadcode-check — Gatekeeper anti-Knight-Capital (TODO-35)');
console.log(`   source exports: ${sourceExports.size} · desplegadas: ${deployed.length}`);

let bad = 0;
if (orphans.length) {
  bad += orphans.length;
  console.error('\n🔴 HUÉRFANAS (desplegadas pero NO en el source — el "8º servidor"):');
  for (const o of orphans) console.error(`   - ${o.id} (${o.region}) → cuarentenar (revocar IAM / mock) y borrar tras ≥15d de logs limpios`);
}
if (dups.length) {
  console.warn('\n⚠️  Mismo nombre en >1 región (posible duplicado/huérfano regional — verificar a mano):');
  for (const [name, regs] of dups) console.warn(`   - ${name}: ${regs.join(', ')}`);
}
if (notDeployed.length) console.log(`\nℹ️  En source pero NO desplegadas (pend deploy, NO huérfanas): ${notDeployed.join(', ')}`);
if (!orphans.length && !dups.length) console.log('\n✅ Sin huérfanas ni duplicados de región — toda función desplegada está en el source.');

process.exit(bad ? 1 : 0);
