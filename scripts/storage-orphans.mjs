// ===========================================================
// Barrido de fotos HUÉRFANAS en Firebase Storage (TODO-24 f3) ⟦OPUS-4.8 · rev-Fable⟧
// ===========================================================
// CONTEXTO (Decisión Fuerte §227.7, red-team Gemini 2026-06-22):
//   Toda foto sube a `cars/{ts}_{nombre}.webp` (vehicles.data.js:183), tanto para un
//   borrador NUEVO como al editar un vehículo vivo. Si el borrador se abandona (o el
//   vehículo se borra — deleteVehicle NO toca Storage by-design), la foto queda HUÉRFANA
//   en `cars/` para siempre = costo de Storage que crece sin techo.
//
//   Diseño 80/20 (Gemini canceló la Parte A sobre-ingenierizada): NO se mueven fotos entre
//   bodegas ni Callables. Se sigue subiendo a `cars/` y un BARRIDO periódico (mark-and-sweep)
//   borra lo no referenciado, con un colchón de antigüedad para no tocar subidas en curso.
//
// 🛑 EL BUG QUE MATA EL NEGOCIO (red-team Gemini #7): Firestore guarda la URL pública
//   (https://firebasestorage.googleapis.com/v0/b/BUCKET/o/cars%2Ffoto.webp?alt=media&token=…)
//   pero el Admin SDK lista el PATH puro (cars/foto.webp). Un `if (!urls.has(file.name))`
//   ingenuo NO coincide con NADA → borraría TODAS las fotos. Por eso:
//     • De cada doc extraigo el path con regex `/o/<encoded>?` y `decodeURIComponent`.
//     • Escaneo el DOC COMPLETO (no un campo fijo) → no se escapa ninguna referencia.
//     • GUARDAS: si el set de referencias queda VACÍO, o los huérfanos son >90% del total,
//       el script ABORTA (síntoma de parseo roto). Imprime muestras para confirmación humana.
//
// SEGURIDAD DE USO (doble-llave §G.2, igual que audit-storage-svg.mjs):
//   • Por DEFECTO: SOLO LECTURA (reporta huérfanos: cantidad, tamaño, $/mes, muestra). NO borra.
//   • Respaldo reversible: `--backup <dir>` descarga los huérfanos a disco ANTES de borrar
//     (plan Gemini: reversibilidad sin path-mangling; re-subes manualmente si hubo falso positivo).
//   • Borrado real: `--purge` Y env `CONFIRM_PURGE=YES-DELETE-ORPHANS`. Sin la env = dry-run.
//
// REQUISITO: Service Account (el SDK cliente no lista el bucket). Provee UNA de:
//   • FIREBASE_SA_KEY = el JSON de la SA key en una env var, o
//   • GOOGLE_APPLICATION_CREDENTIALS = ruta al .json de la SA key (ADC estándar).
//   Rol mínimo dry-run: Storage Object Viewer + Firestore read. Para --purge: + Object Admin.
//
// USO:
//   FIREBASE_SA_KEY="$(cat sa.json)" node scripts/storage-orphans.mjs                  # reporte
//   FIREBASE_SA_KEY="$(cat sa.json)" node scripts/storage-orphans.mjs --min-age-days 30
//   FIREBASE_SA_KEY="$(cat sa.json)" node scripts/storage-orphans.mjs --backup ./orphans_backup
//   FIREBASE_SA_KEY="$(cat sa.json)" CONFIRM_PURGE=YES-DELETE-ORPHANS \
//       node scripts/storage-orphans.mjs --purge --backup ./orphans_backup   # BORRADO REAL
// ===========================================================

import { readFileSync, mkdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';

const STORAGE_BUCKET = 'altorra-cars.firebasestorage.app';
const PROJECT_ID = 'altorra-cars';

const argv = process.argv.slice(2);
const flag = (name) => argv.includes(name);
const opt = (name, def) => {
  const i = argv.indexOf(name);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : def;
};

const PREFIX = opt('--prefix', 'cars/');               // qué bodega se barre (blast radius acotado)
const MIN_AGE_DAYS = Number(opt('--min-age-days', '30')); // colchón: no tocar lo subido hace < N días
const BACKUP_DIR = opt('--backup', null);              // descarga reversible antes de borrar
const WANT_PURGE = flag('--purge');
const CONFIRMED = process.env.CONFIRM_PURGE === 'YES-DELETE-ORPHANS';
const ALLOW_LARGE = flag('--i-understand-large-delete'); // override de la guarda >90%

// Colecciones que pueden referenciar `cars/` (vehículos + borradores de cualquier user).
// Banners/brands/avatars viven en OTROS prefijos → no afectan a cars/. El barrido es por prefijo.
const REF_COLLECTIONS = ['vehiculos'];
const REF_COLLECTION_GROUPS = ['drafts'];

function resolveCredential() {
  const rawKey = process.env.FIREBASE_SA_KEY;
  if (rawKey && rawKey.trim()) {
    try { return JSON.parse(rawKey); }
    catch (e) { throw new Error('FIREBASE_SA_KEY presente pero no es JSON válido: ' + e.message); }
  }
  const path = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (path && path.trim()) {
    try { return JSON.parse(readFileSync(path, 'utf-8')); }
    catch (e) { throw new Error('GOOGLE_APPLICATION_CREDENTIALS apunta a un .json inválido (' + path + '): ' + e.message); }
  }
  // Sin SA key explícita → null = usar Application Default Credentials (ADC, p.ej. gcloud auth
  // application-default login en la máquina del dueño). En GitHub Actions siempre llega la SA key.
  return null;
}

// Extrae TODOS los paths de Storage referenciados en un objeto JSON arbitrario.
// Cubre la forma estándar `/o/<encoded>?` de getDownloadURL Y un path crudo `cars/...` por si acaso.
function extractStoragePaths(obj, sink) {
  const json = JSON.stringify(obj);
  // 1) URL pública: .../o/cars%2Ffoto.webp?alt=media&token=...  → decodifica a cars/foto.webp
  for (const m of json.matchAll(/\/o\/([^?"'\\]+)/g)) {
    try { sink.add(decodeURIComponent(m[1])); } catch { /* match corrupto: ignora */ }
  }
  // 2) path crudo embebido (cinturón + tirantes): "cars/....(webp|jpg|jpeg|png)"
  for (const m of json.matchAll(/(?:^|["'/])(cars\/[^"'\\?]+?\.(?:webp|jpe?g|png))/gi)) {
    sink.add(m[1]);
  }
}

function human(bytes) {
  const u = ['B', 'KB', 'MB', 'GB'];
  let n = bytes, i = 0;
  while (n >= 1024 && i < u.length - 1) { n /= 1024; i++; }
  return n.toFixed(n < 10 && i > 0 ? 1 : 0) + ' ' + u[i];
}

async function main() {
  const creds = resolveCredential();
  const { initializeApp, cert, applicationDefault } = await import('firebase-admin/app');
  const { getStorage } = await import('firebase-admin/storage');
  const { getFirestore } = await import('firebase-admin/firestore');

  console.log(`[orphans] Credencial: ${creds ? 'Service Account key' : 'Application Default Credentials (ADC)'}`);
  const app = initializeApp({
    credential: creds ? cert(creds) : applicationDefault(),
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
  });
  const db = getFirestore(app);
  const bucket = getStorage(app).bucket();

  // ---- 1) Reunir TODAS las referencias vivas (vehículos + borradores) ----
  console.log(`[orphans] Reuniendo referencias de Firestore (${REF_COLLECTIONS.join(', ')} + grupo: ${REF_COLLECTION_GROUPS.join(', ')})...`);
  const referenced = new Set();
  let docsScanned = 0;
  for (const col of REF_COLLECTIONS) {
    const snap = await db.collection(col).get();
    snap.forEach((d) => { docsScanned++; extractStoragePaths(d.data(), referenced); });
  }
  for (const cg of REF_COLLECTION_GROUPS) {
    const snap = await db.collectionGroup(cg).get();
    snap.forEach((d) => { docsScanned++; extractStoragePaths(d.data(), referenced); });
  }
  console.log(`[orphans] ${docsScanned} doc(s) escaneados → ${referenced.size} path(s) de Storage referenciados.`);

  // GUARDA #1 (anti-bug #7): 0 referencias = casi seguro parseo roto → abortar antes de "ver todo huérfano".
  if (referenced.size === 0) {
    throw new Error(
      'CERO referencias parseadas. Es el síntoma del bug de parseo de URLs (#7): seguir borraría TODO. ' +
      'ABORTADO. Revisa el formato de las URLs guardadas en Firestore.'
    );
  }
  // Muestra para que un humano confirme que el parseo funcionó.
  console.log('[orphans] Muestra de referencias (confirma que son paths reales `cars/...`):');
  [...referenced].slice(0, 5).forEach((p) => console.log('    · ' + p));

  // ---- 2) Listar objetos del prefijo ----
  console.log(`\n[orphans] Listando objetos de '${PREFIX}' en ${STORAGE_BUCKET}...`);
  let files;
  try {
    [files] = await bucket.getFiles({ prefix: PREFIX });
  } catch (e) {
    throw new Error(`No se pudo listar '${PREFIX}'. ¿La SA tiene rol Storage Object Viewer? Causa: ${e.message}`);
  }
  console.log(`[orphans] ${files.length} objeto(s) bajo '${PREFIX}'.`);

  // ---- 3) Clasificar: huérfano = no referenciado Y más viejo que el colchón ----
  const nowMs = Date.now();
  const ageDaysOf = (f) => {
    const t = f.metadata && f.metadata.timeCreated ? new Date(f.metadata.timeCreated).getTime() : nowMs;
    return (nowMs - t) / 86400000;
  };
  const orphans = [];
  let tooYoung = 0, live = 0, placeholders = 0;
  for (const f of files) {
    // Marcador de carpeta (nombre termina en '/', 0 bytes, virtual): no es una foto, no se
    // respalda (rompería el backup a disco: archivo vs carpeta con el mismo nombre) ni se borra.
    if (f.name.endsWith('/')) { placeholders++; continue; }
    if (referenced.has(f.name)) { live++; continue; }
    if (ageDaysOf(f) < MIN_AGE_DAYS) { tooYoung++; continue; } // subida en curso / borrador activo reciente
    orphans.push(f);
  }
  if (placeholders) console.log(`[orphans] (${placeholders} marcador(es) de carpeta ignorado(s) — virtuales, 0 bytes)`);

  const orphanBytes = orphans.reduce((s, f) => s + Number((f.metadata && f.metadata.size) || 0), 0);
  const costPerMonth = (orphanBytes / (1024 ** 3)) * 0.026; // ~US$0.026/GB/mes Storage

  // ---- 4) Reporte ----
  console.log('\n================ REPORTE DE HUÉRFANOS (SOLO LECTURA) ================');
  console.log(`  Objetos bajo '${PREFIX}'      : ${files.length}`);
  console.log(`  Referenciados (vivos)         : ${live}`);
  console.log(`  Recientes < ${MIN_AGE_DAYS}d (protegidos): ${tooYoung}`);
  console.log(`  HUÉRFANOS (borrables)         : ${orphans.length}`);
  console.log(`  Espacio recuperable           : ${human(orphanBytes)}  (~US$${costPerMonth.toFixed(2)}/mes)`);
  if (orphans.length) {
    console.log('  Muestra de huérfanos:');
    orphans.slice(0, 10).forEach((f) => {
      console.log(`    · ${f.name}  [${human(Number((f.metadata && f.metadata.size) || 0))}, ${Math.round(ageDaysOf(f))}d]`);
    });
    if (orphans.length > 10) console.log(`    … y ${orphans.length - 10} más.`);
  }
  console.log('====================================================================');

  // GUARDA #2 (anti-bug #7): borrar >90% del total es casi seguro un error de parseo.
  const ratio = files.length ? orphans.length / files.length : 0;
  if (ratio > 0.9 && !ALLOW_LARGE) {
    throw new Error(
      `Los huérfanos son ${(ratio * 100).toFixed(0)}% del total (>90%). Eso es casi seguro un bug de ` +
      'parseo de referencias, NO basura real. ABORTADO. Si de verdad es correcto, repite con ' +
      '--i-understand-large-delete.'
    );
  }

  if (!orphans.length) { console.log('\n✅ Sin huérfanos con ese criterio. No hay nada que hacer.'); process.exit(0); }

  // ---- 5) Respaldo reversible (Gemini: descargar a disco antes de borrar) ----
  if (BACKUP_DIR) {
    console.log(`\n[orphans] Respaldando ${orphans.length} huérfano(s) en '${BACKUP_DIR}' (reversible)...`);
    let saved = 0;
    for (const f of orphans) {
      const dest = join(BACKUP_DIR, f.name);
      mkdirSync(dirname(dest), { recursive: true });
      const [buf] = await f.download();
      writeFileSync(dest, buf);
      saved++;
      if (saved % 25 === 0) console.log(`    ...${saved}/${orphans.length}`);
    }
    console.log(`[orphans] Respaldo completo: ${saved} archivo(s) en '${BACKUP_DIR}'.`);
  }

  // ---- 6) Borrado (doble-llave) ----
  if (!WANT_PURGE) {
    console.log('\n[orphans] Modo REPORTE (solo lectura). Para borrar: --purge (+ CONFIRM_PURGE=YES-DELETE-ORPHANS).');
    console.log('[orphans] Recomendado: corre primero con --backup <dir> para tener la red de seguridad.');
    process.exit(0);
  }
  if (!CONFIRMED) {
    console.log(`\n[orphans] DRY-RUN de purga (falta CONFIRM_PURGE=YES-DELETE-ORPHANS). Se borrarían ${orphans.length} objeto(s). Sin borrar nada.`);
    process.exit(0);
  }
  if (!BACKUP_DIR) {
    console.log('\n⚠️  [orphans] Borrado REAL sin --backup: sin red de seguridad. Aborta y reintenta con --backup si quieres reversibilidad.');
  }
  console.log(`\n[orphans] CONFIRM_PURGE activo — BORRANDO ${orphans.length} huérfano(s) en producción...`);
  let ok = 0, fail = 0;
  for (const f of orphans) {
    try { await f.delete(); ok++; }
    catch (e) { console.error(`    ✗ FALLÓ: ${f.name} — ${e.message}`); fail++; }
  }
  console.log(`\n[orphans] Purga terminada: ${ok} borrado(s), ${fail} fallo(s). Recuperado ~${human(orphanBytes)}.`);
  process.exit(fail ? 1 : 0);
}

main().catch((err) => { console.error('\n[orphans] ERROR:', err.message); process.exit(1); });
