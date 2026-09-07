// ===========================================================
// Auditor de SVG en Firebase Storage — CMS FASE 0.2b ⟦OPUS-4.8 · rev-Fable⟧
// ===========================================================
// CONTEXTO (Decisión Fuerte comité v4 + 2ª opinión Gemini, bóveda
// 2026-06-19-cms-arquitectura-comite-v4.md / 2026-06-20-cms-gemini-respuesta-sintesis.md):
//   • La regla 0.2 (storage.rules) ya RECHAZA `image/svg+xml` en uploads NUEVOS.
//   • Rechazar futuros NO borra los SVG ya subidos bajo la regla vieja permisiva (`image/.*`).
//   • Un SVG es ejecutable: si se sirviera inline/navegable en este origen único (GitHub Pages),
//     ejecutaría JS con la sesión del admin. Capa 2 (servir como <img src>) ya aplicada
//     (admin-brands.js:171; el SSG no inserta logos inline) → riesgo residual BAJO, pero
//     0.2b es la defensa-en-profundidad: AUDITAR los SVG existentes y purgar los peligrosos.
//
// SEGURIDAD DE USO (gateado al dueño — necesita Service Account, §G.2 Decisión Fuerte):
//   • Por DEFECTO: SOLO LECTURA (lista + escaneo + reporte). NO borra nada.
//   • Borrado: requiere `--purge` Y la env `CONFIRM_PURGE=YES-DELETE-SVG` (doble llave).
//     Sin la env, `--purge` hace dry-run (imprime qué borraría). Producción = destructivo.
//
// LIMITACIONES de detección (rev. adversarial 0.2b; asume parser SVG moderno):
//   • Event-handlers ofuscados (octal/unicode, p.ej. on\x45rror) NO se detectan.
//   • `--purge` (sin --all) borra SOLO los marcados peligrosos: si un payload evade los
//     patrones, NO se purga. Para limpieza agresiva (un svg NO debería existir bajo la regla
//     0.2) usar `--purge --all`, o revisar el reporte de auditoría manualmente.
//
// REQUISITO: credenciales de Service Account (este script NO tiene fallback anónimo — el SDK
// cliente no puede listar el bucket). Provee UNA de:
//   • FIREBASE_SA_KEY        = el JSON de la SA key, en una sola variable de entorno, o
//   • GOOGLE_APPLICATION_CREDENTIALS = ruta a un archivo .json de la SA key (ADC estándar).
//
// USO:
//   FIREBASE_SA_KEY="$(cat sa.json)" node scripts/audit-storage-svg.mjs            # auditar
//   FIREBASE_SA_KEY="$(cat sa.json)" node scripts/audit-storage-svg.mjs --purge     # dry-run de purga
//   FIREBASE_SA_KEY="$(cat sa.json)" CONFIRM_PURGE=YES-DELETE-SVG \
//       node scripts/audit-storage-svg.mjs --purge          # PURGA REAL de los peligrosos
//   ... --purge --all   # purga TODOS los svg (no solo los marcados peligrosos)
// ===========================================================

import { readFileSync } from 'fs';

const STORAGE_BUCKET = 'altorra-cars.firebasestorage.app';
const PROJECT_ID = 'altorra-cars';

const argv = process.argv.slice(2);
const WANT_PURGE = argv.includes('--purge');
const PURGE_ALL = argv.includes('--all');
const CONFIRMED = process.env.CONFIRM_PURGE === 'YES-DELETE-SVG';

// ---- Patrones de payload SVG-XSS (defensa-en-profundidad; un match = "peligroso") ----
const DANGER_PATTERNS = [
    { name: '<script>', re: /<script[\s>\/]/i },
    { name: 'on*= (event handler)', re: /\son[a-z]+\s*=/i },
    { name: 'javascript: URI', re: /javascript[\s\x00]*:/i },
    { name: '<foreignObject>', re: /<foreignObject[\s>]/i },
    { name: '<!ENTITY (XXE)', re: /<!ENTITY/i },
    { name: 'external xlink:href', re: /xlink:href\s*=\s*["']?\s*https?:/i },
    { name: 'data:text/html', re: /data:text\/html/i },
    { name: '<iframe>/<embed>/<object>', re: /<(iframe|embed|object)[\s>]/i },
    // SVG-XSS por hoja de estilo embebida y CDATA (rev. adversarial 0.2b): un logo NO debería
    // tener <style> ni CDATA → flaguear para revisión/purga (cierra el "false-clean" del modo
    // --purge sin --all, donde un payload no-detectado quedaría sin borrar).
    { name: '<style> block', re: /<style[\s>]/i },
    { name: '@import data: URI', re: /@import\s+(url\()?\s*["']?\s*data:/i },
    { name: 'CDATA section', re: /<!\[CDATA\[/ },
];

function resolveCredential() {
    const rawKey = process.env.FIREBASE_SA_KEY;
    if (rawKey && rawKey.trim()) {
        try {
            return JSON.parse(rawKey);
        } catch (e) {
            throw new Error('FIREBASE_SA_KEY presente pero no es JSON válido: ' + e.message);
        }
    }
    const path = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    if (path && path.trim()) {
        try {
            return JSON.parse(readFileSync(path, 'utf-8'));
        } catch (e) {
            throw new Error('GOOGLE_APPLICATION_CREDENTIALS apunta a un .json inválido (' + path + '): ' + e.message);
        }
    }
    throw new Error(
        'Faltan credenciales de Service Account. Define FIREBASE_SA_KEY (JSON inline) o ' +
        'GOOGLE_APPLICATION_CREDENTIALS (ruta al .json). Este auditor NO corre con SDK anónimo ' +
        '(gateado al dueño — ver cabecera del script).'
    );
}

function scanSvg(text) {
    const hits = [];
    for (const p of DANGER_PATTERNS) {
        if (p.re.test(text)) hits.push(p.name);
    }
    return hits;
}

async function main() {
    const creds = resolveCredential();

    const { initializeApp, cert } = await import('firebase-admin/app');
    const { getStorage } = await import('firebase-admin/storage');

    const app = initializeApp({
        credential: cert(creds),
        projectId: PROJECT_ID,
        storageBucket: STORAGE_BUCKET,
    });
    const bucket = getStorage(app).bucket();

    console.log(`[audit-svg] Bucket: ${STORAGE_BUCKET}`);
    console.log('[audit-svg] Listando objetos...');
    let files;
    try {
        [files] = await bucket.getFiles();
    } catch (e) {
        throw new Error(
            `No se pudo listar el bucket '${STORAGE_BUCKET}'. Verifica que la Service Account tenga ` +
            `rol Storage Object Viewer y que el bucket exista (storageBucket en initializeApp). Causa: ${e.message}`
        );
    }
    console.log(`[audit-svg] ${files.length} objetos totales en el bucket.`);

    // Un SVG se detecta por extensión O por contentType declarado (cualquiera de los dos).
    const svgFiles = files.filter(f => {
        const ct = (f.metadata && f.metadata.contentType) || '';
        return /\.svg$/i.test(f.name) || ct === 'image/svg+xml';
    });

    if (!svgFiles.length) {
        console.log('\n✅ [audit-svg] CERO SVG en Storage. 0.2b = no-op (nada que purgar). Cerrado.');
        process.exit(0);
    }

    console.log(`\n[audit-svg] ${svgFiles.length} SVG encontrado(s). Descargando y escaneando...\n`);

    const report = [];
    for (const f of svgFiles) {
        const ct = (f.metadata && f.metadata.contentType) || '(sin contentType)';
        const size = (f.metadata && f.metadata.size) || '?';
        let hits = [];
        let readErr = null;
        try {
            const [buf] = await f.download();
            hits = scanSvg(buf.toString('utf8'));
        } catch (e) {
            readErr = e.message;
        }
        const dangerous = hits.length > 0 || !!readErr;
        report.push({ name: f.name, ct, size, dangerous, hits, readErr });
        const tag = readErr ? '⚠️  (no se pudo leer)' : (dangerous ? '🔴 PELIGROSO' : '🟡 svg (sin payload)');
        console.log(`  ${tag}  ${f.name}  [${ct}, ${size}B]`);
        if (hits.length) console.log(`        ↳ ${hits.join(', ')}`);
        if (readErr) console.log(`        ↳ error: ${readErr}`);
    }

    const dangerousFiles = report.filter(r => r.dangerous);
    console.log(`\n[audit-svg] RESUMEN: ${svgFiles.length} svg · ${dangerousFiles.length} peligroso(s)/ilegibles · ${svgFiles.length - dangerousFiles.length} svg "limpios".`);

    if (!WANT_PURGE) {
        console.log('\n[audit-svg] Modo AUDITORÍA (solo lectura). Para purgar: --purge (+ CONFIRM_PURGE=YES-DELETE-SVG para borrado real).');
        process.exit(0);
    }

    // ---- Purga (gateada) ----
    const targets = PURGE_ALL ? report : dangerousFiles;
    console.log(`\n[audit-svg] PURGA solicitada (--purge${PURGE_ALL ? ' --all' : ''}). Objetivos: ${targets.length} archivo(s).`);
    if (!targets.length) {
        console.log('[audit-svg] Nada que purgar con ese criterio. Cerrado.');
        process.exit(0);
    }

    if (!CONFIRMED) {
        console.log('[audit-svg] DRY-RUN (falta CONFIRM_PURGE=YES-DELETE-SVG). Se BORRARÍAN:');
        targets.forEach(t => console.log(`    - ${t.name}`));
        console.log('[audit-svg] Sin borrar nada (dry-run). Cerrado.');
        process.exit(0);
    }

    console.log('[audit-svg] CONFIRM_PURGE activo — BORRANDO en producción:');
    let ok = 0, fail = 0;
    for (const t of targets) {
        try {
            await bucket.file(t.name).delete();
            console.log(`    ✓ borrado: ${t.name}`);
            ok++;
        } catch (e) {
            console.error(`    ✗ FALLÓ: ${t.name} — ${e.message}`);
            fail++;
        }
    }
    console.log(`\n[audit-svg] Purga terminada: ${ok} borrado(s), ${fail} fallo(s).`);
    process.exit(fail ? 1 : 0);
}

main().catch(err => {
    console.error('\n[audit-svg] ERROR:', err.message);
    process.exit(1);
});
