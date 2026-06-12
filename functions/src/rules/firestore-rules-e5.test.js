/**
 * E5 §187 / F30 — tests de Rules del BLINDAJE contra el emulador:
 *  - SEC-01: read del canónico CRM SOLO con crm.read (Opción A §169).
 *  - SEC-06: whitelist + caps en creates públicos (solicitudes/subscriptions)
 *    con los payloads REALES del censo (contact.js / citas.js / soft-lead).
 *  - SEC-08: config/bookedSlots — la reserva del puente sigue viva (update
 *    de UNA clave con auth) pero create-libre/delete/multi-clave mueren.
 * Corre solo con emulador: firebase emulators:exec --only firestore "npm --prefix functions test"
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const EMU = !!process.env.FIRESTORE_EMULATOR_HOST;
const __dir = dirname(fileURLToPath(import.meta.url));
const RULES = () => readFileSync(join(__dir, '../../../firestore.rules'), 'utf8');

describe.skipIf(!EMU)('Rules E5 — SEC-01: canónico CRM solo con crm.read', () => {
  let testEnv, rut;
  const CON = 'admin_con_crm';
  const SIN = 'admin_sin_crm'; // admin real (perfil en usuarios/) SIN crm.read

  beforeAll(async () => {
    rut = await import('@firebase/rules-unit-testing');
    testEnv = await rut.initializeTestEnvironment({
      projectId: 'altorra-rules-e5-sec01',
      firestore: { rules: RULES() },
    });
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      const db = ctx.firestore();
      await db.doc('usuarios/' + CON).set({ rol: 'custom', permissions: ['crm.read'], estado: 'activo' });
      await db.doc('usuarios/' + SIN).set({ rol: 'custom', permissions: ['vehicles.read'], estado: 'activo' });
      await db.doc('leads/l1').set({ status: 'nuevo', fullName: 'PII Lead' });
      await db.doc('lead_intake/i1').set({ nombre: 'PII Intake', ownerId: 'x' });
      await db.doc('contacts/c1').set({ fullName: 'PII Contact', _version: 1 });
      await db.doc('contacts/c1/crmNotes/n1').set({ text: 'nota privada' });
      await db.doc('activities/a1').set({ subject: 'llamada', relatedTo: { type: 'lead', id: 'l1' } });
      await db.doc('deals/d1').set({ stageId: 'cuadrando_cita', status: 'open', amount: 1, ownerId: 'x' });
      await db.doc('subscriptions/s1').set({ email: 'pii@x.co' });
      await db.doc('failedIngestions/f1').set({ payload: { nombre: 'PII' } });
    });
  });
  afterAll(async () => { if (testEnv) await testEnv.cleanup(); });

  const PATHS = ['leads/l1', 'lead_intake/i1', 'contacts/c1', 'contacts/c1/crmNotes/n1',
    'activities/a1', 'deals/d1', 'subscriptions/s1', 'failedIngestions/f1'];

  it('admin SIN crm.read NO lee NINGUNA de las 8 colecciones canónicas (PII)', async () => {
    const db = testEnv.authenticatedContext(SIN).firestore();
    for (const p of PATHS) {
      await rut.assertFails(db.doc(p).get());
    }
  });

  it('admin CON crm.read SÍ lee las 8', async () => {
    const db = testEnv.authenticatedContext(CON).firestore();
    for (const p of PATHS) {
      await rut.assertSucceeds(db.doc(p).get());
    }
  });

  it('anónimo (público) no lee nada del canónico', async () => {
    const db = testEnv.authenticatedContext('anon_uid').firestore();
    await rut.assertFails(db.doc('leads/l1').get());
    await rut.assertFails(db.doc('contacts/c1').get());
  });
});

describe.skipIf(!EMU)('Rules E5 — SEC-06: whitelist de creates públicos (payloads REALES)', () => {
  let testEnv, rut;

  beforeAll(async () => {
    rut = await import('@firebase/rules-unit-testing');
    testEnv = await rut.initializeTestEnvironment({
      projectId: 'altorra-rules-e5-sec06',
      firestore: { rules: RULES() },
    });
  });
  afterAll(async () => { if (testEnv) await testEnv.cleanup(); });

  const anon = () => testEnv.authenticatedContext('anon_form').firestore();

  // Payload REAL de contact.js (censo §187 — 24 campos + meta).
  const CONTACTO = {
    nombre: 'Juan Pérez', telefono: '3001234567', prefijoPais: '+57',
    email: 'jp@x.co', tipo: 'consulta_general', origen: 'contacto',
    kind: 'solicitud', requiereCita: false, vehiculo: 'No especificado',
    comentarios: '', mensaje: 'Quiero información del Mazda 3',
    estado: 'pendiente', observaciones: '', createdAt: '2026-06-12T03:00:00.000Z',
    userId: null, userEmail: null, clientCategory: 'guest',
    source: { page: '/contacto.html', cta: 'contact_form_general', referrer: '' },
    device: { type: 'desktop', browser: 'Chrome', os: 'Windows' },
    priority: 'media', tags: ['compra'], slaDeadline: '2026-06-12T05:00:00.000Z', slaMs: 7200000,
  };

  it('contact.js pasa tal cual; citas.js (29 campos) pasa tal cual', async () => {
    await rut.assertSucceeds(anon().collection('solicitudes').add(CONTACTO));
    await rut.assertSucceeds(anon().collection('solicitudes').add({
      ...CONTACTO, whatsapp: '3001234567', tipo: 'test_drive', origen: 'vehiculo',
      kind: 'cita', requiereCita: true, fecha: '2030-01-15', hora: '10:00',
      vehiculoId: '12', vehiculoPrecio: 82000000, comentarios: 'Ninguno',
    }));
  });

  it('vende-tu-auto con datosExtra pasa; el soft-lead BUGGY de 4 campos pasa (SPA cacheada)', async () => {
    await rut.assertSucceeds(anon().collection('solicitudes').add({
      ...CONTACTO, tipo: 'consignacion_venta', origen: 'vende_tu_auto',
      datosExtra: { marcaVehiculo: 'mazda', modeloVehiculo: '3', yearVehiculo: '2021', kmVehiculo: '40000', precioEsperado: '60000000' },
    }));
    await rut.assertSucceeds(anon().collection('solicitudes').add({
      priority: 'baja', tags: ['lead-concierge_soft'], slaDeadline: '2026-06-13T03:00:00.000Z', slaMs: 86400000,
    }));
  });

  it('soft-lead INTENCIONAL del concierge (fix §187: email/telefono null) pasa', async () => {
    await rut.assertSucceeds(anon().collection('solicitudes').add({
      kind: 'lead', tipo: 'concierge_soft', origen: 'concierge',
      nombre: 'Concierge abc123', email: null, telefono: null,
      comentarios: 'hola / busco suv / presupuesto 80', estado: 'pendiente',
      userId: null, clientCategory: 'guest', sessionId: 'cnc_xyz_abc123',
      sourcePage: '/index.html', sourceVehicleId: null, level: 1,
      createdAt: '2026-06-12T03:00:00.000Z', lastMessageAt: '2026-06-12T03:00:00.000Z',
      priority: 'baja', tags: [], slaDeadline: '2026-06-13T03:00:00.000Z', slaMs: 86400000,
    }));
  });

  it('clave FUERA de la whitelist → denegado (la inyección de campos muere)', async () => {
    await rut.assertFails(anon().collection('solicitudes').add({ ...CONTACTO, _ingestedAt: 'forjado' }));
    await rut.assertFails(anon().collection('solicitudes').add({ ...CONTACTO, hack: true }));
  });

  it('caps: mensaje >3000 o nombre >120 → denegado; en el límite pasa', async () => {
    await rut.assertFails(anon().collection('solicitudes').add({ ...CONTACTO, mensaje: 'x'.repeat(3001) }));
    await rut.assertFails(anon().collection('solicitudes').add({ ...CONTACTO, nombre: 'x'.repeat(121) }));
    await rut.assertSucceeds(anon().collection('solicitudes').add({ ...CONTACTO, mensaje: 'x'.repeat(3000) }));
  });

  it('anti-impersonation intacta: userId ajeno → denegado; el propio → pasa', async () => {
    await rut.assertFails(anon().collection('solicitudes').add({ ...CONTACTO, userId: 'otro_uid' }));
    await rut.assertSucceeds(anon().collection('solicitudes').add({ ...CONTACTO, userId: 'anon_form', clientCategory: 'registered' }));
  });

  it('subscriptions: las 5 claves EXACTAS del newsletter pasan; extra o email gigante mueren', async () => {
    const ok = { email: 'sub@x.co', source: 'newsletter', consentGiven: true, page: '/', createdAt: '2026-06-12T03:00:00.000Z' };
    await rut.assertSucceeds(anon().collection('subscriptions').add(ok));
    await rut.assertFails(anon().collection('subscriptions').add({ ...ok, utm: 'spam' }));
    await rut.assertFails(anon().collection('subscriptions').add({ ...ok, email: 'x'.repeat(255) }));
    await rut.assertFails(anon().collection('subscriptions').add({ ...ok, consentGiven: 'si' }));
    // review #10: el registro de consentimiento DEBE ser true (1581)
    await rut.assertFails(anon().collection('subscriptions').add({ ...ok, consentGiven: false }));
  });

  it('review #7: tipos/shapes — maps con subclaves piratas, tags desbordado y teléfono no-string mueren', async () => {
    await rut.assertFails(anon().collection('solicitudes').add({
      ...CONTACTO, source: { page: '/', cta: 'x', referrer: '', inyectado: 'mal' },
    }));
    await rut.assertFails(anon().collection('solicitudes').add({
      ...CONTACTO, datosExtra: { campoPirata: 'x'.repeat(500) },
    }));
    await rut.assertFails(anon().collection('solicitudes').add({
      ...CONTACTO, tags: Array.from({ length: 13 }, (_, i) => 't' + i),
    }));
    await rut.assertFails(anon().collection('solicitudes').add({ ...CONTACTO, telefono: 12345 }));
    // (requiereCita/vehiculoPrecio sin type-check individual: presupuesto de
    // 1000 expresiones de Rules — garbage de tipo es inocuo, la ingestión
    // normaliza; ver comentario en firestore.rules)
  });
});

describe.skipIf(!EMU)('Rules E5 — fixes de review (citas cerrada, system con auth)', () => {
  let testEnv, rut;
  const EDIT = 'admin_crm_edit_e5';

  beforeAll(async () => {
    rut = await import('@firebase/rules-unit-testing');
    testEnv = await rut.initializeTestEnvironment({
      projectId: 'altorra-rules-e5-fixes',
      firestore: { rules: RULES() },
    });
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      await ctx.firestore().doc('usuarios/' + EDIT).set({ rol: 'custom', permissions: ['crm.read', 'crm.edit'], estado: 'activo' });
    });
  });
  afterAll(async () => { if (testEnv) await testEnv.cleanup(); });

  it('review #8: citas (legacy, cero escritores) — create cerrado para todos', async () => {
    await rut.assertFails(testEnv.unauthenticatedContext().firestore().collection('citas').add({ nombre: 'x' }));
    await rut.assertFails(testEnv.authenticatedContext('anon').firestore().collection('citas').add({ nombre: 'x' }));
  });

  it('review #11: system/* bootstrap exige auth (la anónima del sitio pasa; curl sin auth no)', async () => {
    await rut.assertFails(testEnv.unauthenticatedContext().firestore().doc('system/squat').set({ x: 1 }));
    await rut.assertSucceeds(testEnv.authenticatedContext('anon').firestore().doc('system/boot_ok').set({ x: 1 }));
  });

  it('review #9: create de deal con flags de alerta sembrados → denegado', async () => {
    await rut.assertFails(testEnv.authenticatedContext(EDIT).firestore().collection('deals').add({
      stageId: 'cuadrando_cita', status: 'open', amount: 1, ownerId: EDIT,
      _apartadoVencidoAlertedAt: '2999-01-01',
    }));
    await rut.assertFails(testEnv.authenticatedContext(EDIT).firestore().collection('deals').add({
      stageId: 'cuadrando_cita', status: 'open', amount: 1, ownerId: EDIT,
      _colisionAlertedAt: '2999-01-01',
    }));
  });
});

describe.skipIf(!EMU)('Rules E5 — SEC-08: config/bookedSlots acotado sin romper el puente', () => {
  let testEnv, rut;
  const EDITOR = 'editor_cfg';

  beforeAll(async () => {
    rut = await import('@firebase/rules-unit-testing');
    testEnv = await rut.initializeTestEnvironment({
      projectId: 'altorra-rules-e5-sec08',
      firestore: { rules: RULES() },
    });
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      await ctx.firestore().doc('usuarios/' + EDITOR).set({ rol: 'editor', estado: 'activo' });
    });
  });
  afterAll(async () => { if (testEnv) await testEnv.cleanup(); });

  const anon = () => testEnv.authenticatedContext('anon_cita').firestore();

  it('bootstrap del doc (1 clave) + reserva del form (update de 1 clave-fecha) PASAN — el flujo EXACTO de citas.js', async () => {
    // citas.js:533 — set inicial con una sola clave si el doc no existe
    await rut.assertSucceeds(anon().doc('config/bookedSlots').set({ '2030-01-15': ['10:00'] }));
    // citas.js:531 — update de la clave del día (array existente + 1 hora)
    await rut.assertSucceeds(anon().doc('config/bookedSlots').update({ '2030-01-15': ['10:00', '11:00'] }));
    // otra fecha nueva en update también es 1 sola clave afectada
    await rut.assertSucceeds(anon().doc('config/bookedSlots').update({ '2030-01-16': ['09:00'] }));
  });

  it('multi-clave, delete y sin-auth → denegados (el DoS de cupos muere)', async () => {
    await rut.assertFails(anon().doc('config/bookedSlots').update({ '2030-01-17': ['09:00'], '2030-01-18': ['09:00'] }));
    await rut.assertFails(anon().doc('config/bookedSlots').delete());
    await rut.assertFails(testEnv.unauthenticatedContext().firestore().doc('config/bookedSlots').update({ '2030-01-15': [] }));
  });

  it('el camino ADMIN sigue vivo: editor escribe bookedSlots multi-clave y counters; anónimo NO toca counters/availability', async () => {
    const ed = testEnv.authenticatedContext(EDITOR).firestore();
    await rut.assertSucceeds(ed.doc('config/bookedSlots').set({ '2030-01-15': [], '2030-01-16': ['09:00'] }));
    await rut.assertSucceeds(ed.doc('config/counters').set({ vehicleCodeSeq: 1 }));
    await rut.assertFails(anon().doc('config/counters').set({ vehicleCodeSeq: 999 }));
    await rut.assertFails(anon().doc('config/availability').update({ blockedDates: [] }));
  });
});

describe.skipIf(EMU)('Rules E5 (skip)', () => {
  it('requieren emulador — correr con firebase emulators:exec', () => {
    expect(true).toBe(true);
  });
});
