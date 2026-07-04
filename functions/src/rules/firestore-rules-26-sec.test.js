/**
 * §2.6 (OLA 2 — seguridad P2, plan maestro 03/07) — tren de rules:
 *   · config/* least-privilege por docId (settings.* ya no escribe TODO config/)
 *   · kb.usageCount: int estrictamente +1 (la rama pública de analytics)
 *   · subscriptions.email con shape real (regex)
 *   · departments.userCount server-only (el contador que gobierna el candado §66)
 *   · conciergeChats: whitelist del create + blocklist de claims en la rama cliente
 *   · events / automationLog: whitelist + caps + actor atado al uid (SEC-06)
 *   · mensajes: create cerrado (colección MF2.5 sin escritor vivo — patrón citas E5)
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

describe.skipIf(!EMU)('Rules §2.6 — tren de seguridad P2', () => {
  let testEnv, rut;
  const THEME = 'theme1';     // solo settings.theme
  const MGR = 'deptmgr1';     // departments.manage
  const ANON = 'anon1';       // cliente del sitio (auth anónima)
  const AUTOM = 'autom1';     // staff del motor de automatización legacy

  beforeAll(async () => {
    rut = await import('@firebase/rules-unit-testing');
    testEnv = await rut.initializeTestEnvironment({
      projectId: 'altorra-rules-26-sec',
      firestore: { rules: RULES() },
    });
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      const db = ctx.firestore();
      await db.doc('usuarios/' + THEME).set({ rol: 'custom', permissions: ['settings.theme'], estado: 'activo' });
      await db.doc('usuarios/' + MGR).set({ rol: 'custom', permissions: ['departments.manage'], estado: 'activo' });
      await db.doc('usuarios/' + AUTOM).set({ rol: 'custom', permissions: ['workflows.edit'], estado: 'activo' });
      await db.doc('departments/dept_lleno').set({ name: 'Ventas', userCount: 3, active: true });
      await db.doc('knowledgeBase/faq1').set({ q: '¿Financian?', a: 'Sí.', usageCount: 5 });
      await db.doc('conciergeChats/sess_claims').set({
        sessionId: 'sess_claims', userId: ANON, status: 'active', mode: 'queue',
        claimedBy: 'asesor9', claimedByName: 'Asesor', lastMessage: 'hola',
      });
    });
  });
  afterAll(async () => { if (testEnv) await testEnv.cleanup(); });

  // ── config/* least-privilege por docId ──
  it('settings.theme SÍ escribe config/listas (Atributos)', async () => {
    const db = testEnv.authenticatedContext(THEME).firestore();
    await rut.assertSucceeds(db.doc('config/listas').set({ transmisiones: ['Manual'] }));
  });
  it('settings.theme YA NO escribe config/calendarConfig ni automationRules', async () => {
    const db = testEnv.authenticatedContext(THEME).firestore();
    await rut.assertFails(db.doc('config/calendarConfig').set({ slots: 99 }));
    await rut.assertFails(db.doc('config/automationRules').set({ enabled: {} }));
  });

  // ── kb.usageCount: int +1 estricto en la rama pública ──
  it('kb: usageCount +1 con lastUsedAt pasa (analytics del bot)', async () => {
    const db = testEnv.authenticatedContext(ANON).firestore();
    await rut.assertSucceeds(db.doc('knowledgeBase/faq1').update({ usageCount: 6, lastUsedAt: new Date().toISOString() }));
  });
  it('kb: usageCount con SALTO (o hacia atrás) muere', async () => {
    const db = testEnv.authenticatedContext(ANON).firestore();
    await rut.assertFails(db.doc('knowledgeBase/faq1').update({ usageCount: 999999 }));
    await rut.assertFails(db.doc('knowledgeBase/faq1').update({ usageCount: 0 }));
  });

  // ── subscriptions.email regex ──
  it('subscriptions: email sin forma de email muere; real pasa', async () => {
    const db = testEnv.authenticatedContext(ANON).firestore();
    const base = { source: 'footer', consentGiven: true, page: '/', createdAt: new Date().toISOString() };
    await rut.assertFails(db.collection('subscriptions').add({ ...base, email: 'no-es-un-email' }));
    await rut.assertSucceeds(db.collection('subscriptions').add({ ...base, email: 'cliente@gmail.com' }));
  });

  // ── departments.userCount server-only ──
  it('departments: crear con userCount>0 muere; con 0 pasa', async () => {
    const db = testEnv.authenticatedContext(MGR).firestore();
    await rut.assertFails(db.doc('departments/dept_x').set({ name: 'X', userCount: 5 }));
    await rut.assertSucceeds(db.doc('departments/dept_ok').set({ name: 'OK', userCount: 0 }));
  });
  it('departments: poner userCount=0 para burlar el candado de borrado §66 muere', async () => {
    const db = testEnv.authenticatedContext(MGR).firestore();
    await rut.assertFails(db.doc('departments/dept_lleno').update({ userCount: 0 }));
    await rut.assertSucceeds(db.doc('departments/dept_lleno').update({ name: 'Ventas B' }));
  });

  // ── conciergeChats: whitelist create + blocklist claims del cliente ──
  it('conciergeChats: create del widget (shape real de lead-flow) pasa', async () => {
    const db = testEnv.authenticatedContext(ANON).firestore();
    await rut.assertSucceeds(db.doc('conciergeChats/sess_ok').set({
      sessionId: 'sess_ok', userId: ANON, userEmail: null, userNombre: 'Cliente',
      telefono: null, sourcePage: '/detalle', sourceVehicleId: null,
      status: 'active', mode: 'queue', unreadByAdmin: 0, unreadByUser: 0,
      createdAt: new Date().toISOString(), lastMessageAt: new Date().toISOString(), lastMessage: '',
    }));
  });
  it('conciergeChats: create con claimedBy (auto-squat del lock) o claves extra muere', async () => {
    const db = testEnv.authenticatedContext(ANON).firestore();
    await rut.assertFails(db.doc('conciergeChats/sess_squat').set({
      sessionId: 'sess_squat', userId: ANON, status: 'active', claimedBy: ANON,
    }));
    await rut.assertFails(db.doc('conciergeChats/sess_extra').set({
      sessionId: 'sess_extra', userId: ANON, status: 'closed',
    }));
  });
  it('conciergeChats: el cliente NO puede pisar el lock del asesor (claimedBy)', async () => {
    const db = testEnv.authenticatedContext(ANON).firestore();
    await rut.assertFails(db.doc('conciergeChats/sess_claims').update({ claimedBy: null }));
    await rut.assertSucceeds(db.doc('conciergeChats/sess_claims').update({ lastMessage: 'sigo aquí', unreadByAdmin: 1 }));
  });

  // ── events / automationLog: shape SEC-06 ──
  it('events: shape del event-bus pasa; actor suplantado o clave extra muere', async () => {
    const db = testEnv.authenticatedContext(ANON).firestore();
    await rut.assertSucceeds(db.doc('events/ev1').set({
      id: 'ev1', type: 'vehicle.updated', payload: { docId: 'v1' },
      timestamp: new Date(), by: ANON, bySource: 'admin',
    }));
    await rut.assertFails(db.doc('events/ev2').set({
      id: 'ev2', type: 'x', payload: {}, timestamp: new Date(), by: 'otro_uid', bySource: 'admin',
    }));
    await rut.assertFails(db.doc('events/ev3').set({
      id: 'ev3', type: 'x', payload: {}, timestamp: new Date(), by: ANON, bySource: 'admin', extra: 1,
    }));
  });
  it('automationLog: entry del motor legacy pasa; `by` suplantado muere', async () => {
    const db = testEnv.authenticatedContext(AUTOM).firestore();
    const entry = {
      ruleId: 'r1', ruleName: 'Regla', trigger: 'vehicle.updated', action: 'notify',
      reason: '', docId: 'v1', docTitle: 'Mazda 3', outcome: 'applied',
      timestamp: new Date(), bySource: 'automation',
    };
    await rut.assertSucceeds(db.collection('automationLog').add({ ...entry, by: AUTOM }));
    await rut.assertFails(db.collection('automationLog').add({ ...entry, by: 'otro_uid' }));
  });

  // ── mensajes: create cerrado (sin escritor vivo — patrón citas E5) ──
  it('mensajes: create muere para cualquier autenticado', async () => {
    const db = testEnv.authenticatedContext(ANON).firestore();
    await rut.assertFails(db.collection('mensajes').add({ userId: ANON, texto: 'hola' }));
  });
});
