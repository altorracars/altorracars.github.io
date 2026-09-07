/**
 * E6 §209 — tests de Rules de la captura MANUAL de leads del portal nuevo.
 *
 * Blocker (regresión SEC-06 §187): createManualLead (admin-app/.../capture/
 * capture.data.js) escribe en `solicitudes` 3 claves admin (consentGiven,
 * _manual, _createdByUid) + source.campaign/traffic que el `hasOnly` público
 * RECHAZA → permission-denied para TODOS. Fix §209 = rama ADMIN dedicada
 * (crm.edit + _createdByUid == auth.uid) que NO afloja la vía pública.
 *
 * Verifica: (1) admin crm.edit CREA el payload EXACTO; (2) anti-spoof del tag;
 * (3) sin crm.edit FALLA; (4) público con payload admin FALLA; (5) REGRESIÓN:
 * el create público estricto SIGUE vivo desde anon.
 *
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

// Payload IDÉNTICO al que escribe createManualLead (capture.data.js:20-37).
function manualLeadPayload(uid) {
  return {
    nombre: 'Juan Patio',
    email: 'juan@x.co',
    telefono: '3001234567',
    prefijoPais: '+57',
    origen: 'walkin',
    tipo: 'consulta',
    vehiculoId: null,
    kind: 'lead',
    comentarios: 'busca SUV blanca',
    consentGiven: true,
    tags: ['manual', 'organico'],
    source: { page: 'manual', campaign: null, traffic: 'organico' },
    clientCategory: 'manual',
    createdAt: '2026-06-17T00:00:00.000Z',
    _manual: true,
    _createdByUid: uid,
  };
}

// Create PÚBLICO estricto (censo SEC-06): NINGUNA clave admin, source acotado.
const PUBLIC_CONTACT = {
  nombre: 'Ana Web',
  telefono: '3009999999',
  email: 'ana@x.co',
  tipo: 'contacto',
  origen: 'web',
  kind: 'lead',
  clientCategory: 'particular',
  createdAt: '2026-06-17T00:00:00.000Z',
  source: { page: 'home' },
};

describe.skipIf(!EMU)('Rules E6 §209 — captura manual de leads (solicitudes)', () => {
  let testEnv, rut;
  const ADMIN = 'admin_crm_edit';   // perfil con crm.edit
  const NOEDIT = 'admin_no_edit';   // perfil real SIN crm.edit (solo crm.read)

  beforeAll(async () => {
    rut = await import('@firebase/rules-unit-testing');
    testEnv = await rut.initializeTestEnvironment({
      projectId: 'altorra-rules-e6-walkin',
      firestore: { rules: RULES() },
    });
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      const db = ctx.firestore();
      await db.doc('usuarios/' + ADMIN).set({ rol: 'custom', permissions: ['crm.edit'], estado: 'activo' });
      await db.doc('usuarios/' + NOEDIT).set({ rol: 'custom', permissions: ['crm.read'], estado: 'activo' });
    });
  });
  afterAll(async () => { if (testEnv) await testEnv.cleanup(); });

  it('admin con crm.edit CREA el lead manual (payload exacto de createManualLead)', async () => {
    const db = testEnv.authenticatedContext(ADMIN).firestore();
    await rut.assertSucceeds(db.collection('solicitudes').add(manualLeadPayload(ADMIN)));
  });

  it('anti-spoof: admin NO puede firmar _createdByUid con otro uid', async () => {
    const db = testEnv.authenticatedContext(ADMIN).firestore();
    await rut.assertFails(db.collection('solicitudes').add(manualLeadPayload('otro_uid')));
  });

  it('usuario SIN crm.edit (solo crm.read) NO crea el lead manual', async () => {
    const db = testEnv.authenticatedContext(NOEDIT).firestore();
    await rut.assertFails(db.collection('solicitudes').add(manualLeadPayload(NOEDIT)));
  });

  it('público/anon NO puede mandar el payload admin (consentGiven/_manual/_createdByUid + source.campaign/traffic)', async () => {
    const db = testEnv.unauthenticatedContext().firestore();
    await rut.assertFails(db.collection('solicitudes').add(manualLeadPayload('cualquiera')));
  });

  it('REGRESIÓN: el create público estricto (contact) SIGUE funcionando desde anon', async () => {
    const db = testEnv.unauthenticatedContext().firestore();
    await rut.assertSucceeds(db.collection('solicitudes').add(PUBLIC_CONTACT));
  });
});
