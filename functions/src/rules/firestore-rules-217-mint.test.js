/**
 * §217 (vector §215.7) — un users.edit/users.create NO puede MINTAR un dueño.
 *
 * §212 cerró "degradar al dueño EXISTENTE" (check sobre resource.data). Faltaba el
 * simétrico: "crear un dueño NUEVO" desde el cliente (check sobre request.resource.data).
 * Sin él, cualquier users.edit podía escribir permissions:['*'] / roleId:'system_super_admin'
 * a un tercero — o a SÍ MISMO (la rama admin no excluye el propio uid) — y auto-escalar
 * a super-admin. Solo el Admin SDK (seed/createManagedUserV2) debe mintar dueños.
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

describe.skipIf(!EMU)('Rules §217 — no MINTAR dueño (users.edit/users.create)', () => {
  let testEnv, rut;
  const EDITOR = 'editor1';   // users.edit
  const CREATOR = 'creator1'; // users.create
  const STAFF = 'staff1';     // target NO-dueño

  beforeAll(async () => {
    rut = await import('@firebase/rules-unit-testing');
    testEnv = await rut.initializeTestEnvironment({
      projectId: 'altorra-rules-217-mint',
      firestore: { rules: RULES() },
    });
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      const db = ctx.firestore();
      // §219: el granter necesita TENER los perms que asigna (subset). Para que las
      // regresiones de "asignación normal" sigan pasando, el fixture incluye vehicles.read/crm.read.
      await db.doc('usuarios/' + EDITOR).set({ rol: 'custom', roleId: 'r_ed', permissions: ['users.edit', 'vehicles.read', 'crm.read'], estado: 'activo' });
      await db.doc('usuarios/' + CREATOR).set({ rol: 'custom', roleId: 'r_cr', permissions: ['users.create', 'vehicles.read'], estado: 'activo' });
      await db.doc('usuarios/' + STAFF).set({ rol: 'custom', roleId: 'r_st', permissions: ['vehicles.read'], estado: 'activo', nombre: 'Asesor' });
    });
  });
  afterAll(async () => { if (testEnv) await testEnv.cleanup(); });

  // ── update: no mintar dueño en un TERCERO ──
  it('users.edit NO puede dar permissions:["*"] a un tercero', async () => {
    const db = testEnv.authenticatedContext(EDITOR).firestore();
    await rut.assertFails(db.doc('usuarios/' + STAFF).update({ permissions: ['*'] }));
  });
  it('users.edit NO puede dar roleId:system_super_admin a un tercero', async () => {
    const db = testEnv.authenticatedContext(EDITOR).firestore();
    await rut.assertFails(db.doc('usuarios/' + STAFF).update({ roleId: 'system_super_admin' }));
  });

  // ── update: no AUTO-escalar (su propio doc via rama admin) ──
  it('users.edit NO puede auto-escalar a "*" en su propio doc', async () => {
    const db = testEnv.authenticatedContext(EDITOR).firestore();
    await rut.assertFails(db.doc('usuarios/' + EDITOR).update({ permissions: ['*'] }));
  });

  // ── create: no crear un dueño nuevo ──
  it('users.create NO puede crear un doc con permissions:["*"]', async () => {
    const db = testEnv.authenticatedContext(CREATOR).firestore();
    await rut.assertFails(db.doc('usuarios/nuevo_owner').set({ rol: 'custom', roleId: 'r_x', permissions: ['*'], estado: 'activo' }));
  });
  it('users.create NO puede crear un doc con roleId:system_super_admin', async () => {
    const db = testEnv.authenticatedContext(CREATOR).firestore();
    await rut.assertFails(db.doc('usuarios/nuevo_ceo').set({ rol: 'custom', roleId: 'system_super_admin', permissions: [], estado: 'activo' }));
  });

  // ── REGRESIÓN: la gestión NORMAL sigue viva ──
  it('REGRESIÓN: users.edit SÍ asigna permisos NORMALES a un tercero', async () => {
    const db = testEnv.authenticatedContext(EDITOR).firestore();
    await rut.assertSucceeds(db.doc('usuarios/' + STAFF).update({ permissions: ['vehicles.read', 'crm.read'] }));
  });
  it('REGRESIÓN: users.create SÍ crea un usuario NORMAL', async () => {
    const db = testEnv.authenticatedContext(CREATOR).firestore();
    await rut.assertSucceeds(db.doc('usuarios/nuevo_normal').set({ rol: 'custom', roleId: 'r_n', permissions: ['vehicles.read'], estado: 'activo', nombre: 'Nuevo' }));
  });
});
