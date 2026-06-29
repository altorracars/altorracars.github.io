/**
 * §220 (P0-SEC-1, dataScope opción A — dueño 29/06) — visibilidad de datos por rol.
 * El dueño/gerente (dataScope:'all' o '*') ven TODOS los leads/deals; el asesor
 * (dataScope:'own') ve SOLO los suyos (ownerId == su uid). Una LISTA sin el filtro
 * `where('ownerId','==',uid)` se RECHAZA para el asesor (el cliente admin-app la añade).
 * Contactos/actividades NO se scopean (directorio compartido — opción A).
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

describe.skipIf(!EMU)('Rules §220 — dataScope (leads/deals: asesor solo los suyos, dueño todo)', () => {
  let testEnv, rut;
  const OWNER = 'owner1';   // dataScope all + '*'
  const ASESOR = 'asesor1'; // dataScope own + crm.read
  const OTRO = 'otro_uid';  // dueño de los datos ajenos

  beforeAll(async () => {
    rut = await import('@firebase/rules-unit-testing');
    testEnv = await rut.initializeTestEnvironment({
      projectId: 'altorra-rules-220-scope',
      firestore: { rules: RULES() },
    });
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      const db = ctx.firestore();
      await db.doc('usuarios/' + OWNER).set({ rol: 'super_admin', roleId: 'system_super_admin', permissions: ['*'], dataScope: 'all', estado: 'activo' });
      await db.doc('usuarios/' + ASESOR).set({ rol: 'custom', roleId: 'r_a', permissions: ['crm.read'], dataScope: 'own', estado: 'activo' });
      await db.doc('leads/lead_mine').set({ ownerId: ASESOR, status: 'nuevo', createdAt: '2026-06-29T00:00:00Z' });
      await db.doc('leads/lead_other').set({ ownerId: OTRO, status: 'nuevo', createdAt: '2026-06-29T00:00:00Z' });
      await db.doc('deals/deal_mine').set({ ownerId: ASESOR, status: 'open', lastActivityAt: '2026-06-29T00:00:00Z' });
      await db.doc('deals/deal_other').set({ ownerId: OTRO, status: 'open', lastActivityAt: '2026-06-29T00:00:00Z' });
      await db.doc('contacts/c1').set({ fullName: 'Cliente', _version: 1 });
    });
  });
  afterAll(async () => { if (testEnv) await testEnv.cleanup(); });

  // ── ASESOR (scope own) — solo lo suyo ──
  it('ASESOR LEE su propio lead', async () => {
    const db = testEnv.authenticatedContext(ASESOR).firestore();
    await rut.assertSucceeds(db.doc('leads/lead_mine').get());
  });
  it('ASESOR NO lee un lead ajeno', async () => {
    const db = testEnv.authenticatedContext(ASESOR).firestore();
    await rut.assertFails(db.doc('leads/lead_other').get());
  });
  it('ASESOR lista leads SOLO con filtro ownerId==uid', async () => {
    const db = testEnv.authenticatedContext(ASESOR).firestore();
    await rut.assertSucceeds(db.collection('leads').where('ownerId', '==', ASESOR).get());
  });
  it('ASESOR NO puede listar leads SIN filtro (rechazado)', async () => {
    const db = testEnv.authenticatedContext(ASESOR).firestore();
    await rut.assertFails(db.collection('leads').get());
  });
  it('ASESOR LEE su propio deal pero NO el ajeno', async () => {
    const db = testEnv.authenticatedContext(ASESOR).firestore();
    await rut.assertSucceeds(db.doc('deals/deal_mine').get());
    await rut.assertFails(db.doc('deals/deal_other').get());
  });
  it('ASESOR lista deals SOLO con filtro ownerId==uid', async () => {
    const db = testEnv.authenticatedContext(ASESOR).firestore();
    await rut.assertSucceeds(db.collection('deals').where('ownerId', '==', ASESOR).where('status', '==', 'open').get());
    await rut.assertFails(db.collection('deals').where('status', '==', 'open').get());
  });
  it('ASESOR SÍ ve el directorio de contactos (opción A: compartido)', async () => {
    const db = testEnv.authenticatedContext(ASESOR).firestore();
    await rut.assertSucceeds(db.collection('contacts').get());
  });

  // ── OWNER (scope all) — todo, sin filtro ──
  it('OWNER lee CUALQUIER lead/deal (incl. ajeno)', async () => {
    const db = testEnv.authenticatedContext(OWNER).firestore();
    await rut.assertSucceeds(db.doc('leads/lead_other').get());
    await rut.assertSucceeds(db.doc('deals/deal_other').get());
  });
  it('OWNER lista leads/deals SIN filtro (all-scope)', async () => {
    const db = testEnv.authenticatedContext(OWNER).firestore();
    await rut.assertSucceeds(db.collection('leads').get());
    await rut.assertSucceeds(db.collection('deals').where('status', '==', 'open').get());
  });
});
