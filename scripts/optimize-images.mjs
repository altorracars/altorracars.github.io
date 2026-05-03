#!/usr/bin/env node
/**
 * ALTORRA CARS — Image Optimizer
 * ================================
 *
 * Genera variantes responsive AVIF + WebP + srcset para las imágenes hero
 * y de categorías. Reduce peso 30-60% vs JPG/PNG originales.
 *
 * Uso:
 *   1. Instalar sharp (solo la primera vez): `npm install --save-dev sharp`
 *   2. Correr: `node scripts/optimize-images.mjs`
 *   3. El script es IDEMPOTENTE — saltar imágenes ya procesadas (mtime check),
 *      solo regenera las que cambiaron o son nuevas.
 *   4. Update HTML para usar <picture> con los nuevos paths (manual)
 *
 * Automatización: el workflow `.github/workflows/optimize-images.yml`
 * corre este script automáticamente cuando se hace push a main con
 * cambios en multimedia/heroes/, multimedia/categories/, etc., y
 * commitea las variantes generadas.
 *
 * Configuración:
 *   - Variants: original, 1280, 768, 480 (responsive)
 *   - Formats: AVIF (mejor), WebP (universal), JPG (fallback)
 *   - Quality: AVIF 60, WebP 75, JPG 85 — sweet spot visual/tamaño
 *
 * Imágenes objetivo (definidas abajo en TARGETS): heros + categorías.
 * Modificar la lista para agregar más.
 *
 * Output structure:
 *   multimedia/optimized/<basename>-1920.avif   (AVIF original size)
 *   multimedia/optimized/<basename>-1920.webp
 *   multimedia/optimized/<basename>-1280.avif
 *   multimedia/optimized/<basename>-1280.webp
 *   multimedia/optimized/<basename>-768.avif
 *   multimedia/optimized/<basename>-768.webp
 *   multimedia/optimized/<basename>-480.avif
 *   multimedia/optimized/<basename>-480.webp
 *
 * NO MODIFICA las imágenes originales — escribe a optimized/.
 */

import { promises as fs } from 'fs';
import { dirname, basename, extname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = dirname(__dirname);

// Imágenes a optimizar. Add more as needed.
const TARGETS = [
    'multimedia/heroindex.webp',
    'multimedia/marcas-hero.jpg',
    'multimedia/categories/SUV.jpg',
    'multimedia/categories/PICKUP.jpg',
    'multimedia/categories/SEDAN.jpg',
    'multimedia/categories/HATCHBACK.jpg',
    'multimedia/categories/BUSQUEDA.jpg',
    'multimedia/heroes/contacto-hero.jpg',
    'multimedia/heroes/cookies-hero.jpg',
    'multimedia/heroes/privacidad-hero.jpg',
    'multimedia/heroes/resenas-hero.jpg',
    'multimedia/heroes/terminos-hero.jpg',
];

// Responsive widths to generate. Browser picks via srcset.
const SIZES = [1920, 1280, 768, 480];

// Output formats with quality settings
const FORMATS = [
    { ext: 'avif', options: { quality: 60, effort: 4 } },
    { ext: 'webp', options: { quality: 75, effort: 4 } },
];

const OUTPUT_DIR = join(ROOT, 'multimedia', 'optimized');

async function main() {
    let sharp;
    try {
        sharp = (await import('sharp')).default;
    } catch (e) {
        console.error('\n❌ ERROR: sharp no está instalado.');
        console.error('   Instalalo con:  npm install --save-dev sharp');
        console.error('   Luego re-ejecuta este script.\n');
        process.exit(1);
    }

    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    console.log('🖼  Optimizing images → multimedia/optimized/\n');

    let processed = 0;

    for (const target of TARGETS) {
        const fullPath = join(ROOT, target);
        try {
            await fs.access(fullPath);
        } catch {
            console.warn(`  ⚠  ${target} not found, skipping`);
            continue;
        }

        const stem = basename(target, extname(target));
        const origStat = await fs.stat(fullPath);
        const origMtime = origStat.mtimeMs;
        const meta = await sharp(fullPath).metadata();
        const origW = meta.width;
        const origH = meta.height;

        // Idempotency: check if ALL expected outputs already exist AND are
        // newer than the source. If so, skip — nothing to do.
        const expectedOutputs = [];
        for (const size of SIZES) {
            if (size > origW) continue;
            for (const fmt of FORMATS) {
                expectedOutputs.push(join(OUTPUT_DIR, `${stem}-${size}.${fmt.ext}`));
            }
        }
        let allFresh = true;
        for (const out of expectedOutputs) {
            try {
                const outStat = await fs.stat(out);
                if (outStat.mtimeMs < origMtime) { allFresh = false; break; }
            } catch {
                allFresh = false; break;
            }
        }
        if (allFresh) {
            console.log(`\n⏭  ${target}  — already optimized (skipping)`);
            continue;
        }

        processed++;
        console.log(`\n📐 ${target}  (${origW}×${origH}, ${formatBytes(meta.size || 0)})`);

        for (const size of SIZES) {
            // Skip sizes larger than original
            if (size > origW) continue;

            for (const fmt of FORMATS) {
                const outPath = join(OUTPUT_DIR, `${stem}-${size}.${fmt.ext}`);

                let pipeline = sharp(fullPath).resize(size, null, { fit: 'inside' });
                pipeline = fmt.ext === 'avif'
                    ? pipeline.avif(fmt.options)
                    : pipeline.webp(fmt.options);

                const buffer = await pipeline.toBuffer();
                await fs.writeFile(outPath, buffer);
                const savings = meta.size ? ((1 - buffer.length / meta.size) * 100).toFixed(0) : '?';
                console.log(`  → ${stem}-${size}.${fmt.ext}  ${formatBytes(buffer.length)}  (-${savings}%)`);
            }
        }
    }

    if (processed === 0) {
        console.log('\n✨ Nothing to do — all targets already optimized.\n');
    } else {
        console.log(`\n✅ Done — ${processed} image(s) processed.\n`);
    }
    console.log('Next steps:');
    console.log('  1. Review images in multimedia/optimized/');
    console.log('  2. Update HTML <img> tags to use <picture> with srcset:');
    console.log('     <picture>');
    console.log('       <source type="image/avif" srcset="multimedia/optimized/foo-480.avif 480w, multimedia/optimized/foo-768.avif 768w, multimedia/optimized/foo-1280.avif 1280w, multimedia/optimized/foo-1920.avif 1920w">');
    console.log('       <source type="image/webp" srcset="multimedia/optimized/foo-480.webp 480w, ...">');
    console.log('       <img src="multimedia/foo.jpg" alt="..." width="1920" height="800" sizes="100vw" loading="eager" fetchpriority="high">');
    console.log('     </picture>');
    console.log('  3. Bump SW CACHE_VERSION to invalidate cached HTML.\n');
}

function formatBytes(bytes) {
    if (bytes < 1024) return bytes + 'B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(0) + 'KB';
    return (bytes / 1048576).toFixed(1) + 'MB';
}

main().catch(err => {
    console.error('Failed:', err);
    process.exit(1);
});
