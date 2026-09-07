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
    // Seed con rules apagadas: perfil admin con crm.edit + 2 leads.
    // OLA-0.2 (§266): el write-scope exige scopeAllowsOwn también en update —
    // este personaje es el EDITOR/GERENTE (opera leads sin ownerId) → dataScope 'all'.
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      const db = ctx.firestore();
      await db.doc('usuarios/' + ADMIN_UID).set({
        rol: 'custom', permissions: ['crm.read', 'crm.edit'], dataScope: 'all', estado: 'activo',
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
      // OLA-0.2 (§266): write-scope — este ADMIN opera `leads/l_libre` SIN ownerId → 'all'.
      await db.doc('usuarios/' + ADMIN).set({ rol: 'custom', permissions: ['crm.read', 'crm.edit'], dataScope: 'all', estado: 'activo' });
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
    // E4 dealStatusCoherent: ganar = stageId vendido + status won JUNTOS (como markWon)
    await rut.assertFails(dbA().doc('deals/d_apartado').update({ stageId: 'vendido', status: 'won' }));
    await rut.assertSucceeds(dbA().doc('deals/d_apartado').update({ stageId: 'vendido', status: 'won', tipoPago: 'contado' }));
    await rut.assertFails(dbA().doc('deals/d_vendido').update({ stageId: 'negociacion', regressReason: 'error' }));
  });
  it('PERDIDO exige razón de picklist; retroceso exige regressReason', async () => {
    // E4 dealStatusCoherent: perder = stageId perdido + status lost JUNTOS (como markLost)
    await rut.assertFails(dbA().doc('deals/d_cuadrando').update({ stageId: 'perdido', status: 'lost' }));
    await rut.assertSucceeds(dbA().doc('deals/d_cuadrando').update({ stageId: 'perdido', status: 'lost', lostReason: 'no_responde' }));
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

describe.skipIf(!EMU)('Rules — E4 §186 deals: vendido cerrado + server-only + coherencia status', () => {
  let testEnv, rut;
  const ADMIN = 'admin_e4';
  const SUPER = 'super_e4';

  beforeAll(async () => {
    rut = await import('@firebase/rules-unit-testing');
    testEnv = await rut.initializeTestEnvironment({
      projectId: 'altorra-rules-test-e4',
      firestore: { rules: readFileSync(join(__dir, '../../../firestore.rules'), 'utf8') },
    });
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      const db = ctx.firestore();
      // OLA-0.2 (§266): write-scope — el ADMIN de esta suite opera leads/deals ajenos → 'all'.
      await db.doc('usuarios/' + ADMIN).set({ rol: 'custom', permissions: ['crm.read', 'crm.edit'], dataScope: 'all', estado: 'activo' });
      await db.doc('usuarios/' + SUPER).set({ rol: 'super_admin', permissions: ['*'], estado: 'activo' });
      await db.doc('deals/d_won').set({
        stageId: 'vendido', status: 'won', amount: 50, ownerId: ADMIN, tipoPago: 'contado',
        wonAt: '2026-06-01T00:00:00.000Z',
        postventa: { entrega: false, traspaso_runt: false, tramites: false },
        commissionSnapshot: { amount: 50, tipoPago: 'contado', ownerId: ADMIN, wonAt: '2026-06-01T00:00:00.000Z' },
        _version: 3,
      });
      await db.doc('deals/d_open').set({ stageId: 'negociacion', status: 'open', amount: 70, ownerId: ADMIN, _version: 1 });
    });
  });
  afterAll(async () => { if (testEnv) await testEnv.cleanup(); });

  const dbA = () => testEnv.authenticatedContext(ADMIN).firestore();
  const dbS = () => testEnv.authenticatedContext(SUPER).firestore();

  it('F10: marcar el checklist post-venta de un vendido PASA (campos whitelisted)', async () => {
    await rut.assertSucceeds(dbA().doc('deals/d_won').update({
      'postventa.entrega': true, lastActivityAt: 'x', updatedAt: 'x', updatedBy: ADMIN, _version: 4,
    }));
    await rut.assertSucceeds(dbA().doc('deals/d_won').update({
      recibeVehiculo: { marca: 'mazda', modelo: '3', placa: 'ABC123', valorEstimado: 30 },
      updatedAt: 'x', _version: 5,
    }));
  });

  it('F42: el cliente NO altera amount/tipoPago/ownerId de un deal YA vendido', async () => {
    await rut.assertFails(dbA().doc('deals/d_won').update({ amount: 999, _version: 6 }));
    await rut.assertFails(dbA().doc('deals/d_won').update({ tipoPago: 'financiado', _version: 6 }));
    await rut.assertFails(dbA().doc('deals/d_won').update({ ownerId: 'otro', _version: 6 }));
  });

  it('server-only: wonAt + commissionSnapshot(s) intocables (open Y vendido, hasta para super)', async () => {
    await rut.assertFails(dbA().doc('deals/d_open').update({ wonAt: '2026-01-01' }));
    await rut.assertFails(dbA().doc('deals/d_open').update({ commissionSnapshot: { amount: 1 } }));
    await rut.assertFails(dbA().doc('deals/d_won').update({ wonAt: 'otro', _version: 6 }));
    await rut.assertFails(dbS().doc('deals/d_won').update({ commissionSnapshot: { amount: 1 } }));
    // §9 restructura: el array ENRIQUECIDO también es server-only (anti-forja de altorraRevenue)
    await rut.assertFails(dbA().doc('deals/d_open').update({ commissionSnapshots: [{ rev: 1, altorraRevenue: 1 }] }));
    await rut.assertFails(dbS().doc('deals/d_won').update({ commissionSnapshots: [{ rev: 9, altorraRevenue: 999 }] }));
    await rut.assertFails(dbA().doc('deals/d_open').update({ retomaVehicleId: '99' }));
  });

  it('super admin conserva la válvula de corrección sobre un vendido (campos normales)', async () => {
    await rut.assertSucceeds(dbS().doc('deals/d_won').update({ amount: 55 }));
  });

  it('coherencia: NO se fabrica status won sin etapa vendido (ni anulado desde el cliente)', async () => {
    await rut.assertFails(dbA().doc('deals/d_open').update({ status: 'won' }));
    await rut.assertFails(dbA().doc('deals/d_open').update({ status: 'anulado' }));
    await rut.assertFails(dbA().doc('deals/d_open').update({ status: 'lost' })); // sin stageId perdido
  });

  it('create exige status open (no se puede nacer ganado)', async () => {
    await rut.assertFails(dbA().collection('deals').add({
      stageId: 'cuadrando_cita', amount: 1, ownerId: ADMIN, status: 'won',
    }));
  });

  it('create NO acepta campos server-only (anti-forja de base de comisión)', async () => {
    await rut.assertFails(dbA().collection('deals').add({
      stageId: 'cuadrando_cita', amount: 1, ownerId: ADMIN, status: 'open',
      commissionSnapshot: { amount: 999999999 },
    }));
    await rut.assertFails(dbA().collection('deals').add({
      stageId: 'cuadrando_cita', amount: 1, ownerId: ADMIN, status: 'open',
      commissionSnapshots: [{ rev: 1, altorraRevenue: 999999999 }],
    }));
    await rut.assertFails(dbA().collection('deals').add({
      stageId: 'cuadrando_cita', amount: 1, ownerId: ADMIN, status: 'open',
      wonAt: '2026-01-01T00:00:00.000Z',
    }));
  });

  it('flags de alerta del daily job son server-only (no se pre-atenúan alertas F26/F28)', async () => {
    await rut.assertFails(dbA().doc('deals/d_open').update({ _colisionAlertedAt: '2999-01-01' }));
    await rut.assertFails(dbA().doc('deals/d_open').update({ _apartadoVencidoAlertedAt: '2999-01-01' }));
  });

  it('ganar con amount 0 → denegado (la base de comisión no puede nacer en 0)', async () => {
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      await ctx.firestore().doc('deals/d_cero').set({
        stageId: 'apartado', status: 'open', amount: 0, ownerId: ADMIN,
        montoApartado: 1000000, venceEl: '2026-06-13T18:00:00.000Z', _version: 1,
      });
    });
    await rut.assertFails(dbA().doc('deals/d_cero').update({
      stageId: 'vendido', status: 'won', tipoPago: 'contado',
    }));
    await rut.assertSucceeds(dbA().doc('deals/d_cero').update({
      stageId: 'vendido', status: 'won', tipoPago: 'contado', amount: 45000000,
    }));
  });
});

describe.skipIf(EMU)('Rules (skip)', () => {
  it('se saltan sin emulador — correr con firebase emulators:exec', () => {
    expect(true).toBe(true);
  });
});

describe.skipIf(!EMU)('Rules — F12 §185 contacts: protocolo _version + campos de servidor', () => {
  let testEnv, rut;
  const EDITOR = 'editor_contacts';

  beforeAll(async () => {
    rut = await import('@firebase/rules-unit-testing');
    testEnv = await rut.initializeTestEnvironment({
      projectId: 'altorra-rules-test-contacts',
      firestore: { rules: readFileSync(join(__dir, '../../../firestore.rules'), 'utf8') },
    });
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      const db = ctx.firestore();
      await db.doc('usuarios/' + EDITOR).set({
        rol: 'custom', permissions: ['crm.read', 'crm.edit'], estado: 'activo',
      });
      await db.doc('contacts/c_normal').set({
        fullName: 'Carlos', email: 'c@x.co', _version: 4, dedupKeys: ['email_c_x_co'],
      });
      await db.doc('contacts/c_legacy').set({ fullName: 'Sin Version' });
      await db.doc('contacts/c_gracia').set({
        fullName: 'En Gracia', _version: 2, suppressionStatus: 'pendiente_supresion',
      });
      await db.doc('dedup/email_c_x_co').set({ contactId: 'c_normal' });
    });
  });

  afterAll(async () => { if (testEnv) await testEnv.cleanup(); });
  const ed = () => testEnv.authenticatedContext(EDITOR).firestore();

  it('update con _version = actual+1 PASA; sin _version o con la actual FALLA', async () => {
    await rut.assertSucceeds(ed().doc('contacts/c_normal').update({ fullName: 'Carlos M', _version: 5 }));
    await rut.assertFails(ed().doc('contacts/c_normal').update({ fullName: 'X' }));
    await rut.assertFails(ed().doc('contacts/c_normal').update({ fullName: 'X', _version: 5 })); // ya esta en 5
  });

  it('contacto legacy SIN _version: el cliente arranca el protocolo con _version=1', async () => {
    await rut.assertSucceeds(ed().doc('contacts/c_legacy').update({ fullName: 'Con Version', _version: 1 }));
  });

  it('campos de SERVIDOR intocables desde el cliente (dedupKeys / _suppressed / _mergedInto)', async () => {
    await rut.assertFails(ed().doc('contacts/c_normal').update({ dedupKeys: [], _version: 6 }));
    await rut.assertFails(ed().doc('contacts/c_normal').update({ _suppressed: true, _version: 6 }));
    await rut.assertFails(ed().doc('contacts/c_normal').update({ _mergedInto: 'otro', _version: 6 }));
  });

  it('contacto en gracia de supresion NO es editable; dedup/ es read-only para staff', async () => {
    await rut.assertFails(ed().doc('contacts/c_gracia').update({ fullName: 'Y', _version: 3 }));
    await rut.assertSucceeds(ed().doc('dedup/email_c_x_co').get());
    await rut.assertFails(ed().doc('dedup/email_c_x_co').set({ contactId: 'pirata' }));
    await rut.assertFails(testEnv.unauthenticatedContext().firestore().doc('dedup/email_c_x_co').get());
  });
});

describe.skipIf(!EMU)('Rules — §185 contacts delete cerrado al cliente', () => {
  let testEnv, rut;
  beforeAll(async () => {
    rut = await import('@firebase/rules-unit-testing');
    testEnv = await rut.initializeTestEnvironment({
      projectId: 'altorra-rules-test-cdelete',
      firestore: { rules: readFileSync(join(__dir, '../../../firestore.rules'), 'utf8') },
    });
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      await ctx.firestore().doc('usuarios/deleter').set({
        rol: 'custom', permissions: ['crm.read', 'crm.edit', 'crm.delete'], estado: 'activo',
      });
      await ctx.firestore().doc('contacts/c_x').set({ fullName: 'X', _version: 1 });
    });
  });
  afterAll(async () => { if (testEnv) await testEnv.cleanup(); });

  it('ni con crm.delete: borrar contacts es SOLO del Admin SDK (un delete en gracia dejaria PII huerfana)', async () => {
    await rut.assertFails(
      testEnv.authenticatedContext('deleter').firestore().doc('contacts/c_x').delete()
    );
  });
});
