/**
 * F-5 (§4) — reprocesador del dead-letter `failedIngestions`. Verifica que
 * `_reprocessOne` recupera leads del DLQ por la ruta compartida (idempotente)
 * y maneja los bordes (ya-ingerido / source-borrado / fuente no reprocesable).
 * Corre solo con emulador:
 *   firebase emulators:exec --only firestore "npx vitest run src/ingestion/reprocessFailedIngestions.emulator.test.js"
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';

const EMU = !!process.env.FIRESTORE_EMULATOR_HOST;

describe.skipIf(!EMU)('F-5 — reprocessOne: recupera el DLQ', () => {
  let admin, db, reprocessOne;

  beforeAll(async () => {
    admin = (await import('firebase-admin')).default;
    const app = admin.apps.find((a) => a && a.name === 'f5-reproc')
      || admin.initializeApp({ projectId: 'altorra-f5-reproc' }, 'f5-reproc');
    db = app.firestore();
    ({ _reprocessOne: reprocessOne } = await import('./reprocessFailedIngestions.js'));
  });

  afterAll(async () => {
    if (!db) return;
    const app = admin.apps.find((a) => a && a.name === 'f5-reproc');
    if (app) await app.delete();
  });

  it('chat anónimo en el DLQ → ingerido como lead "Anónimo" + DLQ resuelto + source idempotente', async () => {
    const sid = 'cnc_reproc1';
    await db.collection('solicitudes').doc(sid).set({
      sessionId: sid, origen: 'concierge', comentarios: 'me interesa el Mazda',
      createdAt: '2030-01-01T00:00:00Z',
    });
    const dlqRef = db.collection('failedIngestions').doc('solicitudes_' + sid);
    await dlqRef.set({ sourceCollection: 'solicitudes', sourceId: sid, resolved: false, retries: 6, error: 'sin email ni teléfono' });

    const r = await reprocessOne(db, dlqRef, (await dlqRef.get()).data());
    expect(r).toBe('resolved');

    const dlq = (await dlqRef.get()).data();
    expect(dlq.resolved).toBe(true);
    expect(dlq.resolvedBy).toBe('reprocessor');
    expect(dlq.resolvedLeadId).toBeTruthy();

    // source marcado ingerido (idempotencia → un 2º reproceso es no-op)
    expect((await db.collection('solicitudes').doc(sid).get()).data()._ingestedAt).toBeTruthy();

    // contacto determinista por session: + lead "Anónimo" + tag
    const c = await db.collection('contacts').doc('session_' + sid).get();
    expect(c.exists).toBe(true);
    expect(c.data().fullName).toBe('Anónimo');
    expect(c.data().tags).toContain('chat-anonimo');

    // un 2º reproceso del mismo doc no crea otro lead (idempotente)
    await dlqRef.set({ resolved: false }, { merge: true });
    const leadsBefore = (await db.collection('leads').where('sourceSolicitudId', '==', sid).get()).size;
    const r2 = await reprocessOne(db, dlqRef, (await dlqRef.get()).data());
    expect(r2).toBe('resolved');
    const leadsAfter = (await db.collection('leads').where('sourceSolicitudId', '==', sid).get()).size;
    expect(leadsAfter).toBe(leadsBefore); // cero duplicado
  });

  it('source ya ingerido → resuelto (already-ingested), sin reprocesar', async () => {
    const sid = 'cnc_already';
    await db.collection('solicitudes').doc(sid).set({ sessionId: sid, _ingestedAt: '2030-01-01T00:00:00Z' });
    const dlqRef = db.collection('failedIngestions').doc('solicitudes_' + sid);
    await dlqRef.set({ sourceCollection: 'solicitudes', sourceId: sid, resolved: false });
    const r = await reprocessOne(db, dlqRef, (await dlqRef.get()).data());
    expect(r).toBe('resolved');
    expect((await dlqRef.get()).data().resolvedReason).toBe('already-ingested');
  });

  it('fuente no reprocesable automáticamente (clientes) → needsManualReview', async () => {
    const dlqRef = db.collection('failedIngestions').doc('clientes_x');
    await dlqRef.set({ sourceCollection: 'clientes', sourceId: 'x', resolved: false });
    const r = await reprocessOne(db, dlqRef, (await dlqRef.get()).data());
    expect(r).toBe('manual');
    expect((await dlqRef.get()).data().needsManualReview).toBe(true);
  });

  it('source borrado → resuelto (source-deleted)', async () => {
    const dlqRef = db.collection('failedIngestions').doc('solicitudes_gone');
    await dlqRef.set({ sourceCollection: 'solicitudes', sourceId: 'nope_gone_999', resolved: false });
    const r = await reprocessOne(db, dlqRef, (await dlqRef.get()).data());
    expect(r).toBe('resolved');
    expect((await dlqRef.get()).data().resolvedReason).toBe('source-deleted');
  });

  it('doc ya en needsManualReview → skipped (sin write churn)', async () => {
    const dlqRef = db.collection('failedIngestions').doc('manual_already');
    await dlqRef.set({ sourceCollection: 'solicitudes', sourceId: 'whatever', resolved: false, needsManualReview: true });
    const r = await reprocessOne(db, dlqRef, (await dlqRef.get()).data());
    expect(r).toBe('skipped');
  });
});
