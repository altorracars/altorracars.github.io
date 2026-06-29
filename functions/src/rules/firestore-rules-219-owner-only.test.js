/**
 * §219 (P0-SEC-2 — decisión del dueño 29/06) — modelo de delegación RBAC:
 *   (a) OWNER-ONLY: la administración de identidad/seguridad (users.*, roles.*,
 *       settings.backup/seo, audit.delete) NUNCA se delega a un rol/usuario custom —
 *       ni siquiera el dueño puede ponerla en un rol custom; vive SOLO en su '*'.
 *       Verbatim dueño: "agregar y eliminar usuarios entre otras cosas delicadas que
 *       nunca se puede igualar".
 *   (b) SUBSET: el que otorga solo puede dar permisos que él mismo tiene (un '*' / super
 *       admin legacy puede dar cualquier perm NO-owner-only).
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

describe.skipIf(!EMU)('Rules §219 — owner-only + subset de delegación (roles/usuarios)', () => {
  let testEnv, rut;
  const OWNER = 'owner1'; // '*'
  const MGR = 'mgr1';     // tiene roles/users.* via fixture + crm.* (granter limitado)
  const STAFF = 'staff1'; // target no-dueño

  beforeAll(async () => {
    rut = await import('@firebase/rules-unit-testing');
    testEnv = await rut.initializeTestEnvironment({
      projectId: 'altorra-rules-219-owner',
      firestore: { rules: RULES() },
    });
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      const db = ctx.firestore();
      await db.doc('usuarios/' + OWNER).set({ rol: 'super_admin', roleId: 'system_super_admin', permissions: ['*'], estado: 'activo' });
      await db.doc('usuarios/' + MGR).set({ rol: 'custom', roleId: 'r_mgr', permissions: ['roles.create', 'roles.edit', 'users.edit', 'crm.read', 'crm.edit'], estado: 'activo' });
      await db.doc('usuarios/' + STAFF).set({ rol: 'custom', roleId: 'r_st', permissions: ['crm.read'], estado: 'activo', nombre: 'Asesor' });
    });
  });
  afterAll(async () => { if (testEnv) await testEnv.cleanup(); });

  // ── roles: owner-only NUNCA en un rol custom (ni el dueño) ──
  it('OWNER no puede crear un rol custom con un perm OWNER-ONLY (users.delete)', async () => {
    const db = testEnv.authenticatedContext(OWNER).firestore();
    await rut.assertFails(db.doc('roles/r1').set({ name: 'X', isSystem: false, permissions: ['users.delete'] }));
  });
  it('MGR no puede delegar un owner-only que ÉL tiene (roles.create) a un rol', async () => {
    const db = testEnv.authenticatedContext(MGR).firestore();
    await rut.assertFails(db.doc('roles/r2').set({ name: 'X', isSystem: false, permissions: ['roles.create'] }));
  });

  // ── roles: subset ──
  it('MGR no puede crear un rol con un perm que NO tiene (vehicles.delete)', async () => {
    const db = testEnv.authenticatedContext(MGR).firestore();
    await rut.assertFails(db.doc('roles/r3').set({ name: 'X', isSystem: false, permissions: ['vehicles.delete'] }));
  });
  it('MGR SÍ crea un rol con perms que tiene y NO son owner-only', async () => {
    const db = testEnv.authenticatedContext(MGR).firestore();
    await rut.assertSucceeds(db.doc('roles/r4').set({ name: 'Asesor', isSystem: false, permissions: ['crm.read', 'crm.edit'] }));
  });
  it('OWNER SÍ crea un rol con cualquier perm NO-owner-only (aunque sea critical)', async () => {
    const db = testEnv.authenticatedContext(OWNER).firestore();
    await rut.assertSucceeds(db.doc('roles/r5').set({ name: 'Editor', isSystem: false, permissions: ['crm.read', 'vehicles.delete'] }));
  });

  // ── usuarios: asignar perms honra owner-only + subset ──
  it('OWNER no puede asignar un perm OWNER-ONLY a un usuario (users.delete)', async () => {
    const db = testEnv.authenticatedContext(OWNER).firestore();
    await rut.assertFails(db.doc('usuarios/' + STAFF).update({ permissions: ['users.delete'] }));
  });
  it('OWNER SÍ asigna perms normales a un usuario', async () => {
    const db = testEnv.authenticatedContext(OWNER).firestore();
    await rut.assertSucceeds(db.doc('usuarios/' + STAFF).update({ permissions: ['crm.read', 'crm.edit'] }));
  });
  it('MGR no puede asignar a un usuario un perm que NO tiene (vehicles.delete)', async () => {
    const db = testEnv.authenticatedContext(MGR).firestore();
    await rut.assertFails(db.doc('usuarios/' + STAFF).update({ permissions: ['vehicles.delete'] }));
  });

  // ── REGRESIÓN: edits que NO tocan permissions siguen vivos ──
  it('REGRESIÓN: MGR puede bloquear a un usuario (no toca permissions)', async () => {
    const db = testEnv.authenticatedContext(MGR).firestore();
    await rut.assertSucceeds(db.doc('usuarios/' + STAFF).update({ bloqueado: true }));
  });
});
