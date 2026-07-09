// scripts/fetch-fonts.mjs — Self-host de Google Fonts (TODO-54 perf-v2).
//
// POR QUÉ: cargar fuentes desde fonts.googleapis.com + fonts.gstatic.com mete 2
// conexiones externas (DNS+TLS handshake) en el critical path de render de TODAS
// las páginas públicas → penaliza FCP. Self-hostear los woff2 en el mismo origen
// (GitHub Pages, HTTP/2 multiplexado) las saca del critical path.
//
// QUÉ HACE: por cada familia pide el CSS `css2` a Google con un User-Agent de
// Chrome (así Google devuelve woff2), se queda SOLO con los bloques @font-face de
// los subsets latin + latin-ext (lo que necesita el español), descarga esos woff2
// a fonts/ y reescribe las URLs a rutas locales. Emite css/fonts.css (familias
// universales) y css/fonts-inter.css (Inter, solo el index).
//
// REPRODUCIBLE: para añadir un peso/familia, edita FAMILIES y re-corre
// `node scripts/fetch-fonts.mjs`. Idempotente (sobrescribe fonts/ + los CSS).
//
// Réplica EXACTA de lo que el sitio pide hoy (cero regresión de tipografía):
//   - index.html:298  -> Inter + Manrope + Instrument Serif + Cardo
//   - index.html:313  -> Poppins (diferido)
//   - resto publico    -> Manrope + Instrument Serif + Cardo (data-altorra-fonts) + Poppins

import { writeFileSync, mkdirSync, rmSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const FONTS_DIR = join(ROOT, 'fonts');
const CSS_DIR = join(ROOT, 'css');

// UA de Chrome moderno -> Google devuelve woff2 (con UA viejo devolveria ttf).
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36';
const KEEP_SUBSETS = new Set(['latin', 'latin-ext']); // espanol

// Cada familia = exactamente el axis que el sitio pide hoy.
const FAMILIES = [
  { name: 'Manrope',          query: 'family=Manrope:wght@200;300;400;500;600;700',   target: 'fonts.css' },
  { name: 'Instrument Serif', query: 'family=Instrument+Serif:ital@0;1',               target: 'fonts.css' },
  { name: 'Cardo',            query: 'family=Cardo:ital,wght@0,400;0,700;1,400',       target: 'fonts.css' },
  { name: 'Poppins',          query: 'family=Poppins:wght@400;500;600;700;800',       target: 'fonts.css' },
  { name: 'Inter',            query: 'family=Inter:wght@400;500;600;700',              target: 'fonts-inter.css' },
];

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Extrae "campo: valor;" de un bloque @font-face.
function field(block, name) {
  const m = block.match(new RegExp(name + '\\s*:\\s*([^;]+);'));
  return m ? m[1].trim() : '';
}

async function fetchText(url) {
  const r = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!r.ok) throw new Error(`GET ${url} -> HTTP ${r.status}`);
  return r.text();
}

async function fetchBuf(url) {
  const r = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!r.ok) throw new Error(`GET ${url} -> HTTP ${r.status}`);
  const buf = Buffer.from(await r.arrayBuffer());
  // Sanity: woff2 empieza con "wOF2".
  if (buf.length < 4 || buf.toString('ascii', 0, 4) !== 'wOF2') {
    throw new Error(`${url} no es woff2 valido (magic=${buf.toString('hex', 0, 4)})`);
  }
  return buf;
}

// Google emite:  /* latin */\n@font-face { ... }
const BLOCK_RE = /\/\*\s*([\w-]+)\s*\*\/\s*(@font-face\s*\{[^}]*\})/g;

async function processFamily(fam) {
  const url = `https://fonts.googleapis.com/css2?${fam.query}&display=swap`;
  const css = await fetchText(url);
  const out = [];
  let kept = 0, skipped = 0;

  for (const m of css.matchAll(BLOCK_RE)) {
    const subset = m[1];
    let block = m[2];
    if (!KEEP_SUBSETS.has(subset)) { skipped++; continue; }

    const srcM = block.match(/url\((https:\/\/[^)]+\.woff2)\)/);
    if (!srcM) { skipped++; continue; }

    const family = field(block, 'font-family').replace(/['"]/g, '');
    const weight = field(block, 'font-weight') || '400';
    const style = field(block, 'font-style') || 'normal';
    const fname = `${slug(family)}-${weight}-${style}-${subset}.woff2`;

    const buf = await fetchBuf(srcM[1]);
    writeFileSync(join(FONTS_DIR, fname), buf);

    // Reescribir la URL remota -> ruta local (relativa desde css/ -> ../fonts/).
    block = block.replace(/url\(https:\/\/[^)]+\.woff2\)/, `url(../fonts/${fname})`);
    out.push(`/* ${family} ${weight} ${style} - ${subset} */\n${block}`);
    kept++;
    process.stdout.write(`  ok ${fname} (${(buf.length / 1024).toFixed(1)} KB)\n`);
  }
  console.log(`${fam.name}: ${kept} woff2 self-hosteados, ${skipped} subsets descartados`);
  return { target: fam.target, css: out.join('\n\n') };
}

async function main() {
  console.log('-> Self-host de fuentes (latin + latin-ext)\n');
  rmSync(FONTS_DIR, { recursive: true, force: true });
  mkdirSync(FONTS_DIR, { recursive: true });

  const byTarget = new Map();
  for (const fam of FAMILIES) {
    const { target, css } = await processFamily(fam);
    if (!byTarget.has(target)) byTarget.set(target, []);
    byTarget.get(target).push(css);
  }

  const header = (extra) =>
    `/* GENERADO por scripts/fetch-fonts.mjs - NO editar a mano.\n` +
    `   Self-host de Google Fonts (subsets latin + latin-ext) para sacar\n` +
    `   fonts.googleapis.com/fonts.gstatic.com del critical path (TODO-54 perf-v2).\n` +
    `   Re-generar: node scripts/fetch-fonts.mjs${extra ? '\n   ' + extra : ''} */\n\n`;

  for (const [target, chunks] of byTarget) {
    const extra = target === 'fonts-inter.css'
      ? 'Inter se enlaza SOLO en index.html (unica pagina que lo cargaba).'
      : 'Enlazado en todas las paginas publicas (reemplaza los <link> de Google).';
    writeFileSync(join(CSS_DIR, target), header(extra) + chunks.join('\n\n') + '\n');
    console.log(`\n-> css/${target} escrito`);
  }
  console.log('\nListo.');
}

main().catch((e) => { console.error('x', e.message); process.exit(1); });
