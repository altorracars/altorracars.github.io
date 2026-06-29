/**
 * §218 (P0-SEC-2) — un roles.create/roles.edit NO puede sembrar/escalar un rol con
 * PODER DE DUEÑO desde el cliente: ni wildcard '*' ni isSystem:true. Solo el Admin SDK
 * (seedSystemRoles) crea el rol CEO.
 *
 * Contexto (verificado §3.3): el owner-takeover ya está amurallado por §212/§217 (un '*'
 * NO puede llegar a un user doc), así que un rol '*' es INERTE — pero esta defensa cierra
 * el vector en su origen. NO es un subset-check: el modelo §217 PERMITE delegar permisos
 * NO-dueño (ver firestore-rules-217-mint REGRESIÓN), y cambiar eso sería decisión de diseño.
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

describe.skipIf(!EMU)('Rules §218 — no sembrar/escalar rol con poder de dueño (roles.create/edit)', () => {
  let testEnv, rut;
  const MGR = 'mgr1'; // roles.create + roles.edit (NO dueño)

  beforeAll(async () => {
    rut = await import('@firebase/rules-unit-testing');
    testEnv = await rut.initializeTestEnvironment({
      projectId: 'altorra-rules-218-role',
      firestore: { rules: RULES() },
    });
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      const db = ctx.firestore();
      await db.doc('usuarios/' + MGR).set({ rol: 'custom', roleId: 'r_mgr', permissions: ['roles.create', 'roles.edit', 'roles.read'], estado: 'activo' });
      // Rol custom existente (no-system) para los tests de update.
      await db.doc('roles/r_custom').set({ name: 'Custom', isSystem: false, permissions: ['crm.read'] });
    });
  });
  afterAll(async () => { if (testEnv) await testEnv.cleanup(); });

  // ── create: no sembrar poder de dueño ──
  it('roles.create NO puede crear un rol con permissions:["*"]', async () => {
    const db = testEnv.authenticatedContext(MGR).firestore();
    await rut.assertFails(db.doc('roles/r_evil').set({ name: 'Evil', isSystem: false, permissions: ['*'] }));
  });
  it('roles.create NO puede crear un rol con isSystem:true', async () => {
    const db = testEnv.authenticatedContext(MGR).firestore();
    await rut.assertFails(db.doc('roles/r_sys').set({ name: 'FakeSystem', isSystem: true, permissions: ['crm.read'] }));
  });

  // ── update: no ESCALAR un rol existente a poder de dueño ──
  it('roles.edit NO puede escalar un rol a permissions:["*"]', async () => {
    const db = testEnv.authenticatedContext(MGR).firestore();
    await rut.assertFails(db.doc('roles/r_custom').update({ permissions: ['*'] }));
  });
  it('roles.edit NO puede flipear un rol a isSystem:true', async () => {
    const db = testEnv.authenticatedContext(MGR).firestore();
    await rut.assertFails(db.doc('roles/r_custom').update({ isSystem: true }));
  });

  // ── REGRESIÓN: la gestión NORMAL de roles sigue viva ──
  it('REGRESIÓN: roles.create SÍ crea un rol custom con perms normales', async () => {
    const db = testEnv.authenticatedContext(MGR).firestore();
    await rut.assertSucceeds(db.doc('roles/r_normal').set({ name: 'Asesor', isSystem: false, permissions: ['crm.read', 'crm.edit'] }));
  });
  it('REGRESIÓN: roles.edit SÍ edita un rol custom con perms normales', async () => {
    const db = testEnv.authenticatedContext(MGR).firestore();
    await rut.assertSucceeds(db.doc('roles/r_custom').update({ permissions: ['crm.read', 'reports.read'] }));
  });
});
