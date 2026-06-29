/**
 * E3 (ADR §185) — fusión RESUMIBLE + supresión 1581 contra el emulador.
 * Corre solo con: firebase emulators:exec --only firestore "npm --prefix functions test"
 * (Storage no está en el emulador → estos tests ejercitan el GRAFO, no el
 * snapshot F34 — ese camino lo cubren las callables en producción.)
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';

const EMU = !!process.env.FIRESTORE_EMULATOR_HOST;

describe.skipIf(!EMU)('E3 — grafo de contacto: repoint, índice dedup, supresión', () => {
  let admin, db, g;

  beforeAll(async () => {
    admin = (await import('firebase-admin')).default;
    const app = admin.apps.find((a) => a && a.name === 'e3-grafo')
      || admin.initializeApp({ projectId: 'altorra-e3-grafo' }, 'e3-grafo');
    db = app.firestore();
    g = await import('./contactGraph.js');

    // Siembra: contacto A (sobrevive) + B (duplicado) con grafo colgando de B.
    await db.collection('contacts').doc('email_a_x_co').set({
      fullName: 'Ana', email: 'a@x.co', phone: null, tags: ['vip'],
      lifecycleStage: 'lead', createdAt: '2026-06-01T10:00:00.000Z', _version: 3,
      dedupKeys: ['email_a_x_co'],
    });
    await db.collection('dedup').doc('email_a_x_co').set({ contactId: 'email_a_x_co' });
    await db.collection('contacts').doc('phone__573001112233').set({
      fullName: 'Ana Maria', email: null, phone: '+573001112233', tags: ['walkin'],
      lifecycleStage: 'lead', createdAt: '2026-06-02T10:00:00.000Z', _version: 1,
      dedupKeys: ['phone__573001112233'],
    });
    await db.collection('dedup').doc('phone__573001112233').set({ contactId: 'phone__573001112233' });
    await db.collection('leads').doc('lead_b1').set({
      fullName: 'Ana Maria', contactId: 'phone__573001112233', status: 'nuevo',
      sourceSolicitudId: 'sol_b1', createdAt: '2026-06-02T10:01:00.000Z', _version: 1,
    });
    await db.collection('deals').doc('deal_b1').set({
      contactId: 'phone__573001112233', status: 'open', stageId: 'negociacion',
      amount: 50000000, contactName: 'Ana Maria', name: 'Ana Maria · Mazda 3',
      vehicleName: 'Mazda 3', _version: 1,
    });
    await db.collection('activities').doc('act_b1').set({
      type: 'nota', body: 'cliente pregunta por el Mazda, tel 3001112233',
      relatedTo: { type: 'lead', id: 'lead_b1', name: 'Ana Maria' }, status: 'open',
    });
    await db.collection('solicitudes').doc('sol_b1').set({
      nombre: 'Ana Maria', telefono: '3001112233', _leadId: 'lead_b1', kind: 'solicitud',
    });
    // lead rápido con NOTA libre (review §185: la nota debe morir en la supresión)
    await db.collection('lead_intake').doc('intake_b1').set({
      nombre: 'Ana Maria', telefono: '3001112233', _leadId: 'lead_b1',
      nota: 'vive en Manga, cuñada de Pedro, busca SUV blanca',
    });
    // activity colgada DIRECTO del contacto (como la de fusión F12)
    await db.collection('activities').doc('merge_act').set({
      type: 'nota', kind: 'system', body: 'fusion previa',
      relatedTo: { type: 'contact', id: 'email_a_x_co', name: 'Ana' }, status: 'closed',
    });
    // tombstone de una fusión vieja apuntando al que vamos a suprimir
    await db.collection('contacts').doc('email_vieja_x_co').set({
      fullName: 'Ana Vieja', email: 'vieja@x.co', _mergedInto: 'email_a_x_co', _version: 2,
    });
    await db.collection('contacts').doc('phone__573001112233')
      .collection('crmNotes').doc('n1').set({ body: 'nota privada', createdAt: 'x' });

    // §TODO-50 fase 2c: CONSIGNANTE (rol-aware). Su nombre vive DESNORMALIZADO en la
    // tenencia del vehículo + el snapshot de comisión del deal del COMPRADOR (otra
    // persona, contactId distinto) — la supresión por grafo no los alcanza.
    await db.collection('contacts').doc('cons_x').set({
      fullName: 'Pedro Consignante', cedula: '12345678', phone: '+573005556677', email: null,
      type: 'consignante', roles: ['consignante'], lifecycleStage: 'consignante',
      // §Condición 1 (certificación legal): el puntero al contrato físico firmado debe sobrevivir.
      consent: { habeasData: { granted: true, method: 'paper-contract', contractRef: 'CONS-TEST-001',
        policyVersion: 'v1-borrador', purposes: { gestionConsigna: true, publicacionAnuncio: true },
        grantedAt: '2026-06-10T10:00:00.000Z', capturedBy: 'staff_test' } },
      dedupKeys: ['cedula_12345678', 'phone__573005556677'],
      createdAt: '2026-06-10T10:00:00.000Z', _version: 1,
    });
    await db.collection('dedup').doc('cedula_12345678').set({ contactId: 'cons_x' });
    await db.collection('dedup').doc('phone__573005556677').set({ contactId: 'cons_x' });
    await db.collection('vehiculos').doc('veh_cons').set({
      marca: 'Toyota', modelo: 'Corolla', estado: 'vendido',
      tenancy: {
        type: 'CONSIGNA', ownerRefType: 'contact', ownerRefId: 'cons_x',
        ownerDisplayName: 'Pedro Consignante',
        economics: { method: 'SPREAD', baselineValue: 40000000, percentageRate: null, flatFee: null },
      },
    });
    await db.collection('deals').doc('deal_buyer').set({
      contactId: 'buyer_other', status: 'won', stageId: 'vendido', amount: 45000000,
      name: 'Comprador Real · Toyota Corolla', vehicleId: 'veh_cons', _version: 1,
      commissionSnapshots: [{
        rev: 1, salePrice: 45000000, altorraRevenue: 5000000, vehicleId: 'veh_cons',
        frozenTenancy: {
          type: 'CONSIGNA', ownerRefType: 'contact', ownerRefId: 'cons_x',
          ownerDisplayName: 'Pedro Consignante',
          economics: { method: 'SPREAD', baselineValue: 40000000, percentageRate: null, flatFee: null },
        },
      }],
    });

    // §TODO-50 fase 2c — MULTI-ROL (retoma, gap del comité): la MISMA persona es consignante
    // (de SU carro) Y comprador (de otro). repointContact (rol comprador) y
    // redactConsignanteReferences (rol consignante) deben operar INDEPENDIENTES sin pisarse.
    await db.collection('contacts').doc('multi_x').set({
      fullName: 'Marta Multirol', cedula: '99887766', phone: '+573007778899', email: null,
      type: 'consignante', roles: ['consignante', 'lead'], lifecycleStage: 'opportunity',
      dedupKeys: ['cedula_99887766', 'phone__573007778899'],
      createdAt: '2026-06-11T10:00:00.000Z', _version: 1,
    });
    await db.collection('dedup').doc('cedula_99887766').set({ contactId: 'multi_x' });
    await db.collection('vehiculos').doc('veh_multi').set({
      marca: 'Mazda', modelo: 'CX-5', estado: 'vendido',
      tenancy: {
        type: 'CONSIGNA', ownerRefType: 'contact', ownerRefId: 'multi_x',
        ownerDisplayName: 'Marta Multirol',
        economics: { method: 'PERCENTAGE', baselineValue: 0, percentageRate: 0.1, flatFee: null },
      },
    });
    await db.collection('deals').doc('deal_multi_sale').set({ // OTRO comprador compra SU carro
      contactId: 'buyer_z', status: 'won', stageId: 'vendido', amount: 70000000,
      name: 'Comprador Z · Mazda CX-5', vehicleId: 'veh_multi', _version: 1,
      commissionSnapshots: [{
        rev: 1, salePrice: 70000000, altorraRevenue: 7000000, vehicleId: 'veh_multi',
        frozenTenancy: {
          type: 'CONSIGNA', ownerRefType: 'contact', ownerRefId: 'multi_x',
          ownerDisplayName: 'Marta Multirol',
          economics: { method: 'PERCENTAGE', baselineValue: 0, percentageRate: 0.1, flatFee: null },
        },
      }],
    });
    await db.collection('deals').doc('deal_multi_buy').set({ // multi_x es el COMPRADOR aquí
      contactId: 'multi_x', status: 'open', stageId: 'negociacion', amount: 30000000,
      contactName: 'Marta Multirol', name: 'Marta Multirol · Chevrolet Onix',
      vehicleName: 'Chevrolet Onix', _version: 1,
    });
  });

  afterAll(async () => {
    if (!db) return;
    for (const col of ['contacts', 'dedup', 'leads', 'deals', 'activities', 'solicitudes', 'vehiculos', 'auditLog']) {
      const snap = await db.collection(col).get();
      for (const d of snap.docs) {
        const subs = await d.ref.listCollections();
        for (const sub of subs) {
          const ss = await sub.get();
          for (const sd of ss.docs) await sd.ref.delete();
        }
        await d.ref.delete();
      }
    }
  });

  it('dedupKeysFor: email+tel → 2 claves saneadas idénticas al ID histórico', () => {
    expect(g.dedupKeysFor({ email: 'a@x.co', phone: '+573001112233' }))
      .toEqual(['email_a_x_co', 'phone__573001112233']);
  });

  it('FUSIÓN: repoint mueve leads/deals/índice a A; re-ejecutar es no-op (resumible B.5)', async () => {
    const c1 = await g.repointContact(db, 'phone__573001112233', 'email_a_x_co');
    expect(c1).toMatchObject({ leads: 1, deals: 1 });
    const lead = (await db.collection('leads').doc('lead_b1').get()).data();
    expect(lead.contactId).toBe('email_a_x_co');
    expect(lead._version).toBe(2); // protocolo F12a: el server también incrementa
    const idx = (await db.collection('dedup').doc('phone__573001112233').get()).data();
    expect(idx.contactId).toBe('email_a_x_co');

    const c2 = await g.repointContact(db, 'phone__573001112233', 'email_a_x_co');
    expect(c2).toMatchObject({ leads: 0, deals: 0 }); // segunda pasada: nada pendiente
  });

  it('notas se mueven al sobreviviente y desaparecen del viejo', async () => {
    const moved = await g.moveNotes(db, 'phone__573001112233', 'email_a_x_co');
    expect(moved).toBe(1);
    const dst = await db.collection('contacts').doc('email_a_x_co').collection('crmNotes').get();
    expect(dst.size).toBe(1);
  });

  it('SUPRESIÓN: stub anónimo de ID aleatorio, PII borrada en todo el grafo, doc original ELIMINADO', async () => {
    // (el grafo ya cuelga de A tras la fusión — suprimimos a A; el snapshot
    // F34 lo hace la CALLABLE al iniciar la gracia, no este paso)
    const res = await g.executeSuppression(db, 'email_a_x_co', { by: 'test' });
    expect(res.stubId).toBeTruthy();
    expect(res.stubId).not.toBe('email_a_x_co');

    expect((await db.collection('contacts').doc('email_a_x_co').get()).exists).toBe(false);
    const stub = (await db.collection('contacts').doc(res.stubId).get()).data();
    expect(stub._suppressed).toBe(true);
    expect(stub.email).toBeNull();
    expect(stub.createdAt).toBe('2026-06-01T10:00:00.000Z'); // fechas se CONSERVAN (F14 e)

    const lead = (await db.collection('leads').doc('lead_b1').get()).data();
    expect(lead._suppressed).toBe(true);
    expect(lead.fullName).toContain('Suprimido');
    expect(lead.contactId).toBe(res.stubId);

    const deal = (await db.collection('deals').doc('deal_b1').get()).data();
    expect(deal.amount).toBe(50000000);          // registro comercial INTACTO
    expect(deal.contactName).toBe('(Suprimido)');
    expect(deal.name).toBe('(Suprimido — Ley 1581) · Mazda 3'); // el campo REAL del tablero

    const act = (await db.collection('activities').doc('act_b1').get()).data();
    expect(act.body).toBe('');                    // texto libre BORRADO (F14 c)

    const sol = (await db.collection('solicitudes').doc('sol_b1').get()).data();
    expect(sol.telefono).toBeNull();
    expect(sol._suppressed).toBe(true);

    const intake = (await db.collection('lead_intake').doc('intake_b1').get()).data();
    expect(intake.nota).toBe('');                 // la NOTA libre del lead rápido muere
    expect(intake.telefono).toBeNull();

    // activity de contacto: re-apuntada al stub y anonimizada
    const mAct = (await db.collection('activities').doc('merge_act').get()).data();
    expect(mAct.relatedTo.id).toBe(res.stubId);
    expect(mAct.relatedTo.name).toBe('(Suprimido)');
    expect(mAct.body).toBe('');

    // tombstone de fusión: BORRADO (su ID determinista también es PII)
    expect((await db.collection('contacts').doc('email_vieja_x_co').get()).exists).toBe(false);
    expect(res.tombstones).toBe(1);

    expect((await db.collection('dedup').doc('email_a_x_co').get()).exists).toBe(false);
    const notas = await db.collection('contacts').doc(res.stubId).collection('crmNotes').get();
    expect(notas.size).toBe(0);                   // notas DESTRUIDAS, no movidas
  });

  it('§TODO-50 fase 2c — SUPRESIÓN ROL-AWARE: purga el nombre del consignante en tenencia + snapshot, conserva ownerRefId opaco + economics', async () => {
    const res = await g.executeSuppression(db, 'cons_x', { by: 'test' });

    // doc del consignante BORRADO + dedup retirado (cédula incluida)
    expect((await db.collection('contacts').doc('cons_x').get()).exists).toBe(false);
    expect((await db.collection('dedup').doc('cedula_12345678').get()).exists).toBe(false);
    expect(res.consignante).toMatchObject({ vehiclesRedacted: 1, dealsRedacted: 1, snapshotEntriesRedacted: 1 });

    // §Condición 1 (certificación legal): el puntero al CONTRATO físico (contractRef) SOBREVIVE
    // en el auditLog durable (sin PII) tras borrarse el contacto → el snapshot económico NO queda
    // huérfano (reconciliable Cód.Comercio art.60 / E.T. art.632 / Ley 1581 art.12).
    expect(res.habeasProof).toMatchObject({ contractRef: 'CONS-TEST-001', policyVersion: 'v1-borrador' });
    const audit = await db.collection('auditLog').where('contactHash', '==', g.contactHashOf('cons_x')).limit(1).get();
    expect(audit.empty).toBe(false);
    const ev = audit.docs[0].data();
    expect(ev.action).toBe('crm_suppress_1581');
    expect(ev.habeasProof.contractRef).toBe('CONS-TEST-001');     // el contrato sigue trazable
    expect(ev.habeasProof.purposes.gestionConsigna).toBe(true);
    expect(ev.counts.snapshotEntriesRedacted).toBe(1);            // §Cond.4: conteo MATCHED exacto

    // (a) tenencia VIVA del vehículo: NOMBRE purgado · ownerRefId OPACO + economics CONSERVADOS
    const v = (await db.collection('vehiculos').doc('veh_cons').get()).data();
    expect(v.tenancy.ownerDisplayName).toBe('(Suprimido — Ley 1581)');
    expect(v.tenancy.ownerRefId).toBe('cons_x');            // grupo anónimo cuadrado, no se desreferencia
    expect(v.tenancy.economics.baselineValue).toBe(40000000);

    // (b) snapshot del deal del COMPRADOR: nombre purgado · comprador NO re-apuntado · economics intacta
    const deal = (await db.collection('deals').doc('deal_buyer').get()).data();
    expect(deal.contactId).toBe('buyer_other');            // el comprador NO es el suprimido
    const ft = deal.commissionSnapshots[0].frozenTenancy;
    expect(ft.ownerDisplayName).toBe('(Suprimido — Ley 1581)');
    expect(ft.ownerRefId).toBe('cons_x');                  // opaco conservado (cifra anónima)
    expect(deal.commissionSnapshots[0].altorraRevenue).toBe(5000000);

    // idempotente/resumible: 2ª pasada de redacción (ya redactado) = no-op
    const again = await g.redactConsignanteReferences(db, 'cons_x');
    expect(again).toMatchObject({ vehiclesRedacted: 0, dealsRedacted: 0 });
  });

  it('§TODO-50 fase 2c — MULTI-ROL (retoma): re-apunta sus deals de COMPRADOR y redacta SOLO su rol de consignante', async () => {
    const res = await g.executeSuppression(db, 'multi_x', { by: 'test' });
    expect((await db.collection('contacts').doc('multi_x').get()).exists).toBe(false);

    // rol COMPRADOR: su deal abierto se re-apunta al stub + anonimiza (repointContact)
    const buy = (await db.collection('deals').doc('deal_multi_buy').get()).data();
    expect(buy.contactId).toBe(res.stubId);
    expect(buy.name).toContain('Suprimido');
    expect(buy.amount).toBe(30000000);                      // registro comercial intacto

    // rol CONSIGNANTE: el snapshot del deal del OTRO comprador se redacta; ese comprador NO se toca
    const sale = (await db.collection('deals').doc('deal_multi_sale').get()).data();
    expect(sale.contactId).toBe('buyer_z');                 // el comprador del carro consignado NO es el suprimido
    const ft = sale.commissionSnapshots[0].frozenTenancy;
    expect(ft.ownerDisplayName).toBe('(Suprimido — Ley 1581)');
    expect(ft.ownerRefId).toBe('multi_x');                  // opaco conservado
    expect(sale.commissionSnapshots[0].altorraRevenue).toBe(7000000);

    // tenencia viva del carro consignado: nombre purgado
    const v = (await db.collection('vehiculos').doc('veh_multi').get()).data();
    expect(v.tenancy.ownerDisplayName).toBe('(Suprimido — Ley 1581)');

    // counts: 1 vehículo + 1 deal de VENTA (el de COMPRA no tiene snapshot → no cuenta)
    expect(res.consignante).toMatchObject({ vehiclesRedacted: 1, dealsRedacted: 1, snapshotEntriesRedacted: 1 });
  });
});
