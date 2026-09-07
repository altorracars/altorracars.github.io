/**
 * §222 #2 (review adversarial) — bloque `match /marcas/{marcaId}` + `marcaShapeOk()`.
 *
 * Verifica que las ediciones REALES de marca (payload de saveBrand modular/flat + restore)
 * siguen pasando, y que los writes malformados (campo extra, docId no-slug, id!=docId,
 * string sobredimensionado) fallan. Zero-regression (lección §3.2).
 * Corre solo con emulador:
 *   firebase emulators:exec --only firestore "npx vitest run src/rules/firestore-rules-222-marcas.test.js"
 */
import { describe, it, beforeAll, afterAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const EMU = !!process.env.FIRESTORE_EMULATOR_HOST;
const __dir = dirname(fileURLToPath(import.meta.url));
const RULES = () => readFileSync(join(__dir, '../../../firestore.rules'), 'utf8');

// Payload EXACTO de saveBrand (brands.data.js / admin-brands.js): 8 campos.
const editorPayload = (id, over = {}) => ({
  id,
  nombre: 'Marca ' + id,
  descripcion: 'Marca ' + id,
  logo: 'multimedia/Logos/' + id + '.webp',
  updatedAt: '2026-06-20T22:00:00.000Z',
  updatedBy: 'editor@altorra.com',
  _type: 'marca',
  _version: 1,
  ...over,
});

describe.skipIf(!EMU)('Rules §222 — match /marcas/{marcaId} + marcaShapeOk', () => {
  let testEnv, rut;
  const CEO = 'ceo_owner';     // super_admin + '*'
  const EDITOR = 'brand_ed';   // brands.create + brands.edit
  const STAFF = 'staff_plain'; // sin permisos de marca

  beforeAll(async () => {
    rut = await import('@firebase/rules-unit-testing');
    testEnv = await rut.initializeTestEnvironment({
      projectId: 'altorra-rules-222-marcas',
      firestore: { rules: RULES() },
    });
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      const db = ctx.firestore();
      await db.doc('usuarios/' + CEO).set({ rol: 'super_admin', roleId: 'system_super_admin', permissions: ['*'], estado: 'activo' });
      await db.doc('usuarios/' + EDITOR).set({ rol: 'custom', roleId: 'r_brand', permissions: ['brands.create', 'brands.edit'], estado: 'activo' });
      await db.doc('usuarios/' + STAFF).set({ rol: 'custom', roleId: 'r_st', permissions: ['vehicles.read'], estado: 'activo' });
      // Seed shapes REALES: 4 campos (seed) y 7 campos (editado tipo audi, sin _version).
      await db.doc('marcas/seedbrand').set({ id: 'seedbrand', nombre: 'Seed', descripcion: 'Seed', logo: 'multimedia/Logos/Seed.webp' });
      await db.doc('marcas/audilike').set({ id: 'audilike', nombre: 'AudiLike', descripcion: 'AudiLike', logo: 'https://firebasestorage.googleapis.com/v0/b/x/o/y.webp?alt=media&token=t', updatedAt: '2026-03-25T19:20:15.358Z', updatedBy: 'altorracarssale@gmail.com', _type: 'marca' });
      await db.doc('marcas/versioned').set({ id: 'versioned', nombre: 'V', descripcion: 'V', logo: 'multimedia/Logos/V.webp', _version: 3 });
    });
  });
  afterAll(async () => { if (testEnv) await testEnv.cleanup(); });

  // ── lectura ──
  it('lectura pública OK', async () => {
    await rut.assertSucceeds(testEnv.unauthenticatedContext().firestore().doc('marcas/seedbrand').get());
  });

  // ── ediciones REALES deben PASAR (zero-regression) ──
  it('brands.create crea marca (payload saveBrand, docId slug)', async () => {
    await rut.assertSucceeds(testEnv.authenticatedContext(EDITOR).firestore().doc('marcas/subaru').set(editorPayload('subaru')));
  });
  it('CEO (super) actualiza un SEED de 4 campos sin _version (super bypassa validVersion)', async () => {
    await rut.assertSucceeds(testEnv.authenticatedContext(CEO).firestore().doc('marcas/seedbrand').set(editorPayload('seedbrand')));
  });
  it('brands.edit actualiza un doc CON _version (validVersion 3→4 + marcaShapeOk)', async () => {
    await rut.assertSucceeds(testEnv.authenticatedContext(EDITOR).firestore().doc('marcas/versioned').set(editorPayload('versioned', { _version: 4 })));
  });
  it('CEO (super_admin) restore-style: set forma almacenada de 7 campos (sin _version)', async () => {
    await rut.assertSucceeds(testEnv.authenticatedContext(CEO).firestore().doc('marcas/audilike').set({ id: 'audilike', nombre: 'AudiLike', descripcion: 'AudiLike', logo: 'multimedia/Logos/Audi.webp', updatedAt: '2026-03-25T19:20:15.358Z', updatedBy: 'x@y.com', _type: 'marca' }));
  });

  // ── permisos (no debe cambiar) ──
  it('STAFF sin permiso NO crea', async () => {
    await rut.assertFails(testEnv.authenticatedContext(STAFF).firestore().doc('marcas/hackbrand').set(editorPayload('hackbrand')));
  });

  // ── FORMA: writes malformados deben FALLAR ──
  it('FALLA: campo EXTRA fuera de la whitelist', async () => {
    await rut.assertFails(testEnv.authenticatedContext(EDITOR).firestore().doc('marcas/extrafield').set(editorPayload('extrafield', { hacker: 'pwned' })));
  });
  it('FALLA: docId NO-slug (mayúsculas)', async () => {
    await rut.assertFails(testEnv.authenticatedContext(EDITOR).firestore().doc('marcas/MERCEDES').set(editorPayload('MERCEDES')));
  });
  it('FALLA: campo id != docId (rompería el invariante del relink)', async () => {
    await rut.assertFails(testEnv.authenticatedContext(EDITOR).firestore().doc('marcas/kiados').set(editorPayload('toyota')));
  });
  it('FALLA: nombre sobredimensionado (>80)', async () => {
    await rut.assertFails(testEnv.authenticatedContext(EDITOR).firestore().doc('marcas/bignombre').set(editorPayload('bignombre', { nombre: 'A'.repeat(200) })));
  });
  it('FALLA: logo gigante (>600, posible exfil)', async () => {
    await rut.assertFails(testEnv.authenticatedContext(EDITOR).firestore().doc('marcas/biglogo').set(editorPayload('biglogo', { logo: 'x'.repeat(700) })));
  });
});
