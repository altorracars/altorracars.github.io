/**
 * §212 — Fix de seguridad: el DUEÑO es INAMOVIBLE enforced SERVER-SIDE.
 *
 * El pase adversarial de ④ RBAC (consejo externo) cazó dos huecos FATALES
 * pre-existentes: (1) cualquier `users.edit` podía degradar/vaciar/bloquear el
 * doc del CEO (write directo a usuarios/{uid} sin cláusula target≠CEO);
 * (2) cualquier `roles.edit`/`roles.delete` podía editar/borrar el rol
 * `system_super_admin` ('*'). El "dueño inamovible" (§193.4) NO estaba enforced.
 *
 * Estos tests prueban el cierre + regresión (gestión normal sigue viva).
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

describe.skipIf(!EMU)('Rules §212 — dueño INAMOVIBLE + system roles inmutables', () => {
  let testEnv, rut;
  const CEO = 'ceo_owner';          // roleId system_super_admin + permissions ['*']
  const MGR = 'mgr_edit';           // custom con users.edit + roles.edit + roles.delete
  const STAFF = 'staff_plain';      // custom sin poder

  beforeAll(async () => {
    rut = await import('@firebase/rules-unit-testing');
    testEnv = await rut.initializeTestEnvironment({
      projectId: 'altorra-rules-212-owner',
      firestore: { rules: RULES() },
    });
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      const db = ctx.firestore();
      await db.doc('usuarios/' + CEO).set({ rol: 'super_admin', roleId: 'system_super_admin', permissions: ['*'], nombre: 'Dueño', cedula: '123', estado: 'activo' });
      await db.doc('usuarios/' + MGR).set({ rol: 'custom', roleId: 'r_mgr', permissions: ['users.edit', 'roles.edit', 'roles.delete'], nombre: 'Gerente', estado: 'activo' });
      await db.doc('usuarios/' + STAFF).set({ rol: 'custom', roleId: 'r_staff', permissions: ['vehicles.read'], nombre: 'Asesor', estado: 'activo' });
      await db.doc('roles/system_super_admin').set({ isSystem: true, permissions: ['*'], name: 'CEO' });
      await db.doc('roles/r_custom').set({ isSystem: false, permissions: ['vehicles.read'], name: 'Asesor' });
    });
  });
  afterAll(async () => { if (testEnv) await testEnv.cleanup(); });

  // ── usuarios: el doc del DUEÑO es intocable por gestión admin ──
  it('users.edit NO puede bloquear al dueño', async () => {
    const db = testEnv.authenticatedContext(MGR).firestore();
    await rut.assertFails(db.doc('usuarios/' + CEO).update({ bloqueado: true }));
  });
  it('users.edit NO puede cambiar el rol/permissions del dueño', async () => {
    const db = testEnv.authenticatedContext(MGR).firestore();
    await rut.assertFails(db.doc('usuarios/' + CEO).update({ rol: 'viewer', permissions: [] }));
  });
  it('REGRESIÓN: users.edit SÍ puede gestionar a un usuario NO-dueño', async () => {
    const db = testEnv.authenticatedContext(MGR).firestore();
    await rut.assertSucceeds(db.doc('usuarios/' + STAFF).update({ bloqueado: true }));
  });
  it('el dueño SÍ puede self-update su perfil', async () => {
    const db = testEnv.authenticatedContext(CEO).firestore();
    await rut.assertSucceeds(db.doc('usuarios/' + CEO).update({ nombre: 'Dueño Editado' }));
  });

  // ── roles: los system roles son inmutables desde el cliente ──
  it('roles.edit NO puede editar el rol system_super_admin', async () => {
    const db = testEnv.authenticatedContext(MGR).firestore();
    await rut.assertFails(db.doc('roles/system_super_admin').update({ permissions: [] }));
  });
  it('roles.delete NO puede borrar el rol system_super_admin', async () => {
    const db = testEnv.authenticatedContext(MGR).firestore();
    await rut.assertFails(db.doc('roles/system_super_admin').delete());
  });
  it('REGRESIÓN: roles.edit SÍ puede editar un rol custom (no system)', async () => {
    const db = testEnv.authenticatedContext(MGR).firestore();
    await rut.assertSucceeds(db.doc('roles/r_custom').update({ name: 'Asesor Senior' }));
  });
});
