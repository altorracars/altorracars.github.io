/**
 * F30 (ADR §176 E0) — tests de Firestore Rules contra el EMULADOR.
 * Corren SOLO si el emulador está activo (FIRESTORE_EMULATOR_HOST):
 *   firebase emulators:exec --only firestore "npm --prefix functions test"
 * En `npm test` normal se saltan (skipIf) para no romper la suite local.
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const EMU = !!process.env.FIRESTORE_EMULATOR_HOST;
const __dir = dirname(fileURLToPath(import.meta.url));

describe.skipIf(!EMU)('Rules — F1 lead convertido inmutable', () => {
  let testEnv, rut;

  const ADMIN_UID = 'admin_crm_edit';

  beforeAll(async () => {
    rut = await import('@firebase/rules-unit-testing');
    testEnv = await rut.initializeTestEnvironment({
      projectId: 'altorra-rules-test',
      firestore: { rules: readFileSync(join(__dir, '../../../firestore.rules'), 'utf8') },
    });
    // Seed con rules apagadas: perfil admin con crm.edit + 2 leads
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      const db = ctx.firestore();
      await db.doc('usuarios/' + ADMIN_UID).set({
        rol: 'custom', permissions: ['crm.read', 'crm.edit'], estado: 'activo',
      });
      await db.doc('leads/libre').set({
        status: 'contactado', convertedTo: null, fullName: 'Lead Libre', _version: 1,
      });
      await db.doc('leads/congelado').set({
        status: 'convertido', convertedTo: { dealId: 'd1' }, fullName: 'Lead Convertido', _version: 3,
      });
    });
  });

  afterAll(async () => { if (testEnv) await testEnv.cleanup(); });

  function adminDb() {
    return testEnv.authenticatedContext(ADMIN_UID).firestore();
  }

  it('admin con crm.edit SÍ cambia el status de un lead NO convertido (v3: con razón)', async () => {
    await rut.assertSucceeds(
      adminDb().doc('leads/libre').update({ status: 'descartado', discardReason: 'no_califica' })
    );
  });

  it('admin con crm.edit NO puede cambiar el status de un lead convertido (F1)', async () => {
    await rut.assertFails(
      adminDb().doc('leads/congelado').update({ status: 'perdido' })
    );
  });

  it('sí puede tocar OTROS campos del convertido si el status no cambia (asignar owner)', async () => {
    await rut.assertSucceeds(
      adminDb().doc('leads/congelado').update({ ownerId: 'x', updatedAt: 'now' })
    );
  });

  it('la CONVERSIÓN misma sigue permitida (convertedTo era null)', async () => {
    await rut.assertSucceeds(
      adminDb().doc('leads/libre').update({ status: 'convertido', convertedTo: { dealId: 'dNuevo' } })
    );
  });

  it('anónimo no escribe leads (sanidad)', async () => {
    await rut.assertFails(
      testEnv.unauthenticatedContext().firestore().doc('leads/libre').update({ status: 'nuevo' })
    );
  });
});

describe.skipIf(!EMU)('Rules — F36 lead_intake (lead rápido)', () => {
  let testEnv, rut;
  const ASESOR = 'asesor_crm_create';

  beforeAll(async () => {
    rut = await import('@firebase/rules-unit-testing');
    testEnv = await rut.initializeTestEnvironment({
      projectId: 'altorra-rules-test-intake',
      firestore: { rules: readFileSync(join(__dir, '../../../firestore.rules'), 'utf8') },
    });
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      await ctx.firestore().doc('usuarios/' + ASESOR).set({
        rol: 'custom', permissions: ['crm.read', 'crm.create'], estado: 'activo',
      });
    });
  });
  afterAll(async () => { if (testEnv) await testEnv.cleanup(); });

  const VALID = {
    nombre: 'Walkin Pérez', telefono: '3001234567', fuente: 'walkin',
    consentVerbal: true, ownerId: ASESOR, createdAt: '2026-06-10T12:00:00.000Z',
  };

  it('asesor con crm.create registra un lead rápido (owner = él mismo)', async () => {
    await rut.assertSucceeds(
      testEnv.authenticatedContext(ASESOR).firestore().collection('lead_intake').add(VALID)
    );
  });

  it('NO puede registrar a nombre de OTRO owner', async () => {
    await rut.assertFails(
      testEnv.authenticatedContext(ASESOR).firestore().collection('lead_intake')
        .add({ ...VALID, ownerId: 'otro_uid' })
    );
  });

  it('sin nombre o sin teléfono/email → rechazado', async () => {
    const db = testEnv.authenticatedContext(ASESOR).firestore();
    await rut.assertFails(db.collection('lead_intake').add({ ...VALID, nombre: '' }));
    const sinContacto = { ...VALID };
    delete sinContacto.telefono;
    await rut.assertFails(db.collection('lead_intake').add(sinContacto));
  });

  it('anónimo no escribe; nadie edita/borra desde el cliente', async () => {
    await rut.assertFails(
      testEnv.unauthenticatedContext().firestore().collection('lead_intake').add(VALID)
    );
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      await ctx.firestore().doc('lead_intake/fijo').set(VALID);
    });
    await rut.assertFails(
      testEnv.authenticatedContext(ASESOR).firestore().doc('lead_intake/fijo').update({ nombre: 'X' })
    );
  });
});

describe.skipIf(!EMU)('Rules — F8/F35b deals v3 (gates + matriz) y leads v3', () => {
  let testEnv, rut;
  const ADMIN = 'admin_v3';

  beforeAll(async () => {
    rut = await import('@firebase/rules-unit-testing');
    testEnv = await rut.initializeTestEnvironment({
      projectId: 'altorra-rules-test-v3',
      firestore: { rules: readFileSync(join(__dir, '../../../firestore.rules'), 'utf8') },
    });
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      const db = ctx.firestore();
      await db.doc('usuarios/' + ADMIN).set({ rol: 'custom', permissions: ['crm.read', 'crm.edit'], estado: 'activo' });
      await db.doc('deals/d_cuadrando').set({ stageId: 'cuadrando_cita', status: 'open', amount: 50, ownerId: ADMIN });
      await db.doc('deals/d_visita').set({ stageId: 'visita_test_drive', status: 'open', amount: 50, ownerId: ADMIN });
      await db.doc('deals/d_apartado').set({ stageId: 'apartado', status: 'open', amount: 50, ownerId: ADMIN });
      await db.doc('deals/d_vendido').set({ stageId: 'vendido', status: 'won', amount: 50, ownerId: ADMIN });
      await db.doc('leads/l_libre').set({ status: 'contactado', convertedTo: null });
    });
  });
  afterAll(async () => { if (testEnv) await testEnv.cleanup(); });

  const dbA = () => testEnv.authenticatedContext(ADMIN).firestore();

  it('adelante adyacente sin gate pasa (cuadrando→cita_fijada)', async () => {
    await rut.assertSucceeds(dbA().doc('deals/d_cuadrando').update({ stageId: 'cita_fijada' }));
  });
  it('entrar a APARTADO sin monto+vence → denegado; con gate → pasa', async () => {
    await rut.assertFails(dbA().doc('deals/d_visita').update({ stageId: 'apartado' }));
    await rut.assertSucceeds(dbA().doc('deals/d_visita').update({
      stageId: 'apartado', huboTestDrive: true, montoApartado: 2000000, venceEl: '2026-06-13T18:00:00.000Z',
    }));
  });
  it('VENDIDO exige tipoPago; vendido es TERMINAL para el cliente', async () => {
    await rut.assertFails(dbA().doc('deals/d_apartado').update({ stageId: 'vendido' }));
    await rut.assertSucceeds(dbA().doc('deals/d_apartado').update({ stageId: 'vendido', tipoPago: 'contado' }));
    await rut.assertFails(dbA().doc('deals/d_vendido').update({ stageId: 'negociacion', regressReason: 'error' }));
  });
  it('PERDIDO exige razón de picklist; retroceso exige regressReason', async () => {
    await rut.assertFails(dbA().doc('deals/d_cuadrando').update({ stageId: 'perdido' }));
    await rut.assertSucceeds(dbA().doc('deals/d_cuadrando').update({ stageId: 'perdido', lostReason: 'no_responde' }));
    // d_visita quedó en apartado (test anterior): retroceder sin razón falla, con razón pasa
    await rut.assertFails(dbA().doc('deals/d_visita').update({ stageId: 'negociacion' }));
    await rut.assertSucceeds(dbA().doc('deals/d_visita').update({ stageId: 'negociacion', regressReason: 'cliente pidió pausa' }));
  });
  it('create del deal: solo nace en cuadrando_cita con amount y owner', async () => {
    await rut.assertFails(dbA().collection('deals').add({ stageId: 'negociacion', amount: 1, ownerId: ADMIN, status: 'open' }));
    await rut.assertFails(dbA().collection('deals').add({ stageId: 'cuadrando_cita', ownerId: ADMIN, status: 'open' }));
    await rut.assertSucceeds(dbA().collection('deals').add({ stageId: 'cuadrando_cita', amount: 0, ownerId: ADMIN, status: 'open' }));
  });
  it('leads v3: enum retirado DENEGADO; descartado exige razón válida', async () => {
    await rut.assertFails(dbA().doc('leads/l_libre').update({ status: 'calificado' }));
    await rut.assertFails(dbA().doc('leads/l_libre').update({ status: 'perdido' }));
    await rut.assertFails(dbA().doc('leads/l_libre').update({ status: 'descartado' }));
    await rut.assertSucceeds(dbA().doc('leads/l_libre').update({ status: 'descartado', discardReason: 'inalcanzable' }));
  });
});

describe.skipIf(EMU)('Rules (skip)', () => {
  it('se saltan sin emulador — correr con firebase emulators:exec', () => {
    expect(true).toBe(true);
  });
});
