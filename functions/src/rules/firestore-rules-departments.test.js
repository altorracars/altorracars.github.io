/**
 * §215 ④a PASO 3 — bloque `match /departments/{deptId}` (catálogo departamental).
 *
 * read = departments.read || departments.manage (+ CEO siempre);
 * create/update = departments.manage; delete = departments.manage Y userCount==0 (§66).
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

describe.skipIf(!EMU)('Rules §215 ④a — match /departments/{deptId}', () => {
  let testEnv, rut;
  const CEO = 'ceo_owner';        // super_admin + '*'
  const MGR = 'mgr_dept';         // departments.manage
  const READER = 'reader_dept';   // departments.read
  const STAFF = 'staff_plain';    // sin permisos de departamentos

  beforeAll(async () => {
    rut = await import('@firebase/rules-unit-testing');
    testEnv = await rut.initializeTestEnvironment({
      projectId: 'altorra-rules-215-departments',
      firestore: { rules: RULES() },
    });
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      const db = ctx.firestore();
      await db.doc('usuarios/' + CEO).set({ rol: 'super_admin', roleId: 'system_super_admin', permissions: ['*'], estado: 'activo' });
      await db.doc('usuarios/' + MGR).set({ rol: 'custom', roleId: 'r_mgr', permissions: ['departments.manage'], estado: 'activo' });
      await db.doc('usuarios/' + READER).set({ rol: 'custom', roleId: 'r_rd', permissions: ['departments.read'], estado: 'activo' });
      await db.doc('usuarios/' + STAFF).set({ rol: 'custom', roleId: 'r_st', permissions: ['vehicles.read'], estado: 'activo' });
      await db.doc('departments/dept_ventas').set({ name: 'Ventas', userCount: 0, active: true });
      await db.doc('departments/dept_admin').set({ name: 'Administrativo', userCount: 3, active: true });
    });
  });
  afterAll(async () => { if (testEnv) await testEnv.cleanup(); });

  // ── read ──
  it('CEO lee', async () => {
    await rut.assertSucceeds(testEnv.authenticatedContext(CEO).firestore().doc('departments/dept_ventas').get());
  });
  it('departments.manage lee', async () => {
    await rut.assertSucceeds(testEnv.authenticatedContext(MGR).firestore().doc('departments/dept_ventas').get());
  });
  it('departments.read lee', async () => {
    await rut.assertSucceeds(testEnv.authenticatedContext(READER).firestore().doc('departments/dept_ventas').get());
  });
  it('sin permiso NO lee', async () => {
    await rut.assertFails(testEnv.authenticatedContext(STAFF).firestore().doc('departments/dept_ventas').get());
  });

  // ── create / update ──
  it('departments.manage crea', async () => {
    await rut.assertSucceeds(testEnv.authenticatedContext(MGR).firestore().doc('departments/dept_new').set({ name: 'Marketing', userCount: 0 }));
  });
  it('CEO (via *) crea', async () => {
    await rut.assertSucceeds(testEnv.authenticatedContext(CEO).firestore().doc('departments/dept_ceo').set({ name: 'Dirección', userCount: 0 }));
  });
  it('departments.read (sin manage) NO crea', async () => {
    await rut.assertFails(testEnv.authenticatedContext(READER).firestore().doc('departments/dept_x').set({ name: 'X', userCount: 0 }));
  });
  it('sin permiso NO actualiza', async () => {
    await rut.assertFails(testEnv.authenticatedContext(STAFF).firestore().doc('departments/dept_ventas').update({ name: 'Hack' }));
  });
  it('departments.manage actualiza', async () => {
    await rut.assertSucceeds(testEnv.authenticatedContext(MGR).firestore().doc('departments/dept_ventas').update({ name: 'Ventas y Postventa' }));
  });

  // ── delete (§66: solo si userCount==0) ──
  it('departments.manage borra un depto VACÍO (userCount=0)', async () => {
    await rut.assertSucceeds(testEnv.authenticatedContext(MGR).firestore().doc('departments/dept_ventas').delete());
  });
  it('§66: NO se puede borrar un depto con usuarios (userCount>0)', async () => {
    await rut.assertFails(testEnv.authenticatedContext(MGR).firestore().doc('departments/dept_admin').delete());
  });
  it('sin permiso NO borra', async () => {
    await rut.assertFails(testEnv.authenticatedContext(STAFF).firestore().doc('departments/dept_admin').delete());
  });
});
