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
  });

  afterAll(async () => {
    if (!db) return;
    for (const col of ['contacts', 'dedup', 'leads', 'deals', 'activities', 'solicitudes', 'auditLog']) {
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
});
