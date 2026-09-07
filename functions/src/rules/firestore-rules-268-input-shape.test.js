/**
 * §268 OLA-1.7 (PLAN MAESTRO Fable 03/07) — validación de ENTRADA espejada en rules:
 * `concesionarios` y `resenas` con shape whitelist + caps + optimistic locking
 * (_version). Mata la data sucia tipo "dfsfdfdfs" también por fuera del portal.
 * Corre solo con emulador:
 *   firebase emulators:exec --only firestore "npm --prefix functions test"
 */
import { describe, it, beforeAll, afterAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const EMU = !!process.env.FIRESTORE_EMULATOR_HOST;
const __dir = dirname(fileURLToPath(import.meta.url));
const RULES = () => readFileSync(join(__dir, '../../../firestore.rules'), 'utf8');

describe.skipIf(!EMU)('Rules §268 — shape+versión en concesionarios/resenas', () => {
  let testEnv, rut;
  const STAFF = 'staff_shape';

  const dealerOk = (v) => ({
    nombre: 'AutoNorte', direccion: 'Av. Pedro de Heredia #1', telefono: '300 123 4567',
    ciudad: 'Cartagena', horario: 'L-S 8-6', responsable: 'Ana',
    updatedAt: '2026-07-03T00:00:00Z', updatedBy: 'staff@x.co', _version: v,
  });
  const reviewOk = (v) => ({
    name: 'Carlos M.', location: 'Cartagena', rating: 5, vehicle: 'Mazda CX-30',
    text: 'Excelente servicio.', source: 'sitio_web', verified: true, featured: false,
    avatar: 'CM', createdAt: '2026-07-03T00:00:00Z', updatedAt: '2026-07-03T00:00:00Z', _version: v,
  });

  beforeAll(async () => {
    rut = await import('@firebase/rules-unit-testing');
    testEnv = await rut.initializeTestEnvironment({
      projectId: 'altorra-rules-268-shape',
      firestore: { rules: RULES() },
    });
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      const db = ctx.firestore();
      await db.doc('usuarios/' + STAFF).set({
        rol: 'custom', roleId: 'r_s', estado: 'activo', dataScope: 'own',
        permissions: ['dealers.create', 'dealers.edit', 'reviews.create', 'reviews.edit'],
      });
      // doc LEGACY sin _version (migración null→1 debe pasar)
      await db.doc('concesionarios/legacy-dealer').set({
        nombre: 'Legacy Motors', direccion: '', telefono: '', ciudad: 'Cartagena',
        horario: '', responsable: '', updatedAt: '2026-06-01T00:00:00Z', updatedBy: 'x',
      });
      await db.doc('concesionarios/v2-dealer').set(dealerOk(2));
      await db.doc('resenas/rev1').set(reviewOk(1));
    });
  });
  afterAll(async () => { if (testEnv) await testEnv.cleanup(); });

  const db = () => testEnv.authenticatedContext(STAFF).firestore();

  /* ── concesionarios ── */
  it('dealer: create con shape completo + _version 1 PASA', async () => {
    await rut.assertSucceeds(db().doc('concesionarios/nuevo-ok').set(dealerOk(1)));
  });
  it('dealer: clave basura fuera del whitelist RECHAZADA', async () => {
    await rut.assertFails(db().doc('concesionarios/nuevo-junk').set({ ...dealerOk(1), hack: 'x' }));
  });
  it('dealer: nombre vacío o kilométrico RECHAZADO', async () => {
    await rut.assertFails(db().doc('concesionarios/nuevo-a').set({ ...dealerOk(1), nombre: '' }));
    await rut.assertFails(db().doc('concesionarios/nuevo-b').set({ ...dealerOk(1), nombre: 'x'.repeat(81) }));
  });
  it('dealer: create SIN _version RECHAZADO', async () => {
    const { _version, ...sin } = dealerOk(1);
    await rut.assertFails(db().doc('concesionarios/nuevo-c').set(sin));
  });
  it('dealer: update legacy (sin _version) migra a 1 y PASA; versión salteada FALLA', async () => {
    await rut.assertSucceeds(db().doc('concesionarios/legacy-dealer').set(dealerOk(1)));
    await rut.assertFails(db().doc('concesionarios/v2-dealer').set(dealerOk(9)));
    await rut.assertSucceeds(db().doc('concesionarios/v2-dealer').set(dealerOk(3)));
  });

  /* ── resenas ── */
  it('review: create válida PASA; rating fuera de 1-5 o texto de 700 chars FALLA', async () => {
    await rut.assertSucceeds(db().collection('resenas').add(reviewOk(1)));
    await rut.assertFails(db().collection('resenas').add({ ...reviewOk(1), rating: 7 }));
    await rut.assertFails(db().collection('resenas').add({ ...reviewOk(1), text: 'x'.repeat(601) }));
  });
  it('review: clave basura RECHAZADA; update con _version+1 PASA', async () => {
    await rut.assertFails(db().collection('resenas').add({ ...reviewOk(1), spam: true }));
    await rut.assertSucceeds(db().doc('resenas/rev1').set(reviewOk(2)));
  });
});
