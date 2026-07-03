/**
 * §266 OLA-0.2/0.4 (PLAN MAESTRO Fable 03/07) — cierres de dataScope + workflows.edit.
 *  (a) `solicitudes`: fuera la rama isAuthenticated() a secas (staff sin permisos leía
 *      toda la PII); appointments.read sin scope; crm.read scoped; el CLIENTE del sitio
 *      lee SUS propias solicitudes (userId == uid).
 *  (b) `failedIngestions`: read scoped (solo all-scope/dueño en la práctica).
 *  (c) leads/deals: el scope aplica también a UPDATE/DELETE (antes un asesor 'own'
 *      podía escribir a ciegas sobre work-items ajenos por id).
 *  (d) config/automationRules: workflows.edit puede togglear (gap TODO-41).
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

describe.skipIf(!EMU)('Rules §266 OLA-0 — solicitudes/failedIngestions scoped + write-scope + workflows.edit', () => {
  let testEnv, rut;
  const OWNER = 'owner1';        // '*' + dataScope all
  const ASESOR = 'asesor1';      // crm.read + crm.edit + crm.delete · dataScope own
  const STAFF0 = 'staff_sin_permisos'; // perfil en usuarios/ SIN permisos
  const CITAS = 'staff_citas';   // appointments.read
  const WFRO = 'wf_read';        // workflows.read (solo lectura)
  const WFED = 'wf_edit';        // workflows.read + workflows.edit
  const CLIENTE = 'cliente9';    // usuario del SITIO (sin doc en usuarios/)
  const OTRO = 'otro_uid';

  beforeAll(async () => {
    rut = await import('@firebase/rules-unit-testing');
    testEnv = await rut.initializeTestEnvironment({
      projectId: 'altorra-rules-266-ola0',
      firestore: { rules: RULES() },
    });
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      const db = ctx.firestore();
      await db.doc('usuarios/' + OWNER).set({ rol: 'super_admin', roleId: 'system_super_admin', permissions: ['*'], dataScope: 'all', estado: 'activo' });
      await db.doc('usuarios/' + ASESOR).set({ rol: 'custom', roleId: 'r_a', permissions: ['crm.read', 'crm.edit', 'crm.delete'], dataScope: 'own', estado: 'activo' });
      await db.doc('usuarios/' + STAFF0).set({ rol: 'custom', roleId: 'r_z', permissions: [], dataScope: 'own', estado: 'activo' });
      await db.doc('usuarios/' + CITAS).set({ rol: 'custom', roleId: 'r_c', permissions: ['appointments.read'], dataScope: 'own', estado: 'activo' });
      await db.doc('usuarios/' + WFRO).set({ rol: 'custom', roleId: 'r_w', permissions: ['workflows.read'], dataScope: 'own', estado: 'activo' });
      await db.doc('usuarios/' + WFED).set({ rol: 'custom', roleId: 'r_we', permissions: ['workflows.read', 'workflows.edit'], dataScope: 'own', estado: 'activo' });
      // solicitudes: una del cliente del sitio, una huésped (userId null)
      await db.doc('solicitudes/sol_cliente').set({ nombre: 'Cliente Web', userId: CLIENTE, estado: 'pendiente', createdAt: '2026-07-01T00:00:00Z' });
      await db.doc('solicitudes/sol_guest').set({ nombre: 'Huésped', userId: null, estado: 'pendiente', createdAt: '2026-07-01T00:00:00Z' });
      await db.doc('failedIngestions/fi1').set({ error: 'x', payload: { nombre: 'PII' } });
      // work-items para write-scope
      await db.doc('leads/lead_mine').set({ ownerId: ASESOR, status: 'nuevo', createdAt: '2026-07-01T00:00:00Z' });
      await db.doc('leads/lead_other').set({ ownerId: OTRO, status: 'nuevo', createdAt: '2026-07-01T00:00:00Z' });
      await db.doc('leads/lead_del_mine').set({ ownerId: ASESOR, status: 'descartado', discardReason: 'spam_prueba', createdAt: '2026-07-01T00:00:00Z' });
      await db.doc('leads/lead_del_other').set({ ownerId: OTRO, status: 'descartado', discardReason: 'spam_prueba', createdAt: '2026-07-01T00:00:00Z' });
      await db.doc('deals/deal_mine').set({ ownerId: ASESOR, status: 'open', stageId: 'cuadrando_cita', amount: 1, lastActivityAt: '2026-07-01T00:00:00Z' });
      await db.doc('deals/deal_other').set({ ownerId: OTRO, status: 'open', stageId: 'cuadrando_cita', amount: 1, lastActivityAt: '2026-07-01T00:00:00Z' });
      await db.doc('config/automationRules').set({ enabled: { sla_breach_notify_super: true } });
    });
  });
  afterAll(async () => { if (testEnv) await testEnv.cleanup(); });

  /* ── (a) solicitudes ── */
  it('STAFF sin permisos YA NO lee solicitudes (antes: isAuthenticated a secas)', async () => {
    const db = testEnv.authenticatedContext(STAFF0).firestore();
    await rut.assertFails(db.doc('solicitudes/sol_guest').get());
  });
  it('appointments.read lee solicitudes SIN scope (flujo de citas intacto)', async () => {
    const db = testEnv.authenticatedContext(CITAS).firestore();
    await rut.assertSucceeds(db.doc('solicitudes/sol_guest').get());
  });
  it('ASESOR scoped (crm.read, own) NO lee el puente solicitudes (trabaja el canónico)', async () => {
    const db = testEnv.authenticatedContext(ASESOR).firestore();
    await rut.assertFails(db.doc('solicitudes/sol_guest').get());
  });
  it('OWNER (all-scope) lee solicitudes', async () => {
    const db = testEnv.authenticatedContext(OWNER).firestore();
    await rut.assertSucceeds(db.doc('solicitudes/sol_cliente').get());
  });
  it('CLIENTE del sitio lee SU propia solicitud (userId==uid) y NO la ajena', async () => {
    const db = testEnv.authenticatedContext(CLIENTE).firestore();
    await rut.assertSucceeds(db.doc('solicitudes/sol_cliente').get());
    await rut.assertFails(db.doc('solicitudes/sol_guest').get());
  });
  it('CLIENTE lista SUS solicitudes con where(userId==uid) — watcher del sitio', async () => {
    const db = testEnv.authenticatedContext(CLIENTE).firestore();
    await rut.assertSucceeds(db.collection('solicitudes').where('userId', '==', CLIENTE).get());
    await rut.assertFails(db.collection('solicitudes').get());
  });

  /* ── (b) failedIngestions ── */
  it('failedIngestions: ASESOR scoped NO lee; OWNER sí', async () => {
    const a = testEnv.authenticatedContext(ASESOR).firestore();
    await rut.assertFails(a.doc('failedIngestions/fi1').get());
    const o = testEnv.authenticatedContext(OWNER).firestore();
    await rut.assertSucceeds(o.doc('failedIngestions/fi1').get());
  });

  /* ── (c) write-scope en leads/deals ── */
  it('ASESOR actualiza SU lead pero NO el ajeno (escritura ciega cerrada)', async () => {
    const db = testEnv.authenticatedContext(ASESOR).firestore();
    await rut.assertSucceeds(db.doc('leads/lead_mine').update({ notas: 'seguimiento' }));
    await rut.assertFails(db.doc('leads/lead_other').update({ notas: 'sabotaje' }));
  });
  it('ASESOR borra SU lead pero NO el ajeno', async () => {
    const db = testEnv.authenticatedContext(ASESOR).firestore();
    await rut.assertSucceeds(db.doc('leads/lead_del_mine').delete());
    await rut.assertFails(db.doc('leads/lead_del_other').delete());
  });
  it('ASESOR actualiza SU deal pero NO el ajeno', async () => {
    const db = testEnv.authenticatedContext(ASESOR).firestore();
    await rut.assertSucceeds(db.doc('deals/deal_mine').update({ lastActivityAt: '2026-07-03T00:00:00Z' }));
    await rut.assertFails(db.doc('deals/deal_other').update({ lastActivityAt: '2026-07-03T00:00:00Z' }));
  });
  it('OWNER sigue pudiendo escribir CUALQUIER lead/deal (all-scope)', async () => {
    const db = testEnv.authenticatedContext(OWNER).firestore();
    await rut.assertSucceeds(db.doc('leads/lead_other').update({ notas: 'reasignación' }));
    await rut.assertSucceeds(db.doc('deals/deal_other').update({ lastActivityAt: '2026-07-03T01:00:00Z' }));
  });

  /* ── (d) workflows.edit → config/automationRules (TODO-41) ── */
  it('workflows.edit puede togglear config/automationRules', async () => {
    const db = testEnv.authenticatedContext(WFED).firestore();
    await rut.assertSucceeds(db.doc('config/automationRules').set({ enabled: { sla_breach_notify_super: false }, updatedAt: 'x', updatedBy: 'wf' }, { merge: true }));
  });
  it('workflows.read (solo lectura) NO puede togglear', async () => {
    const db = testEnv.authenticatedContext(WFRO).firestore();
    await rut.assertFails(db.doc('config/automationRules').set({ enabled: { sla_breach_notify_super: false } }, { merge: true }));
  });
  it('workflows.edit NO gana acceso a OTROS docs de config (least-privilege)', async () => {
    const db = testEnv.authenticatedContext(WFED).firestore();
    await rut.assertFails(db.doc('config/availability').set({ dias: [] }, { merge: true }));
  });
});
