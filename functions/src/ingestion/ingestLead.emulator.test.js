/**
 * E5 §187 / F30 — re-entrega del trigger de ingestión (review #17):
 * con retry:true, una re-entrega post-commit NO puede duplicar lead/activity,
 * NO avanza la rotación dos veces y devuelve alreadyIngested (el caller salta
 * la alerta). La verdad vive en el doc ORIGEN (tx.get), no en el payload.
 * Corre solo con emulador: firebase emulators:exec --only firestore "npm --prefix functions test"
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';

const EMU = !!process.env.FIRESTORE_EMULATOR_HOST;

describe.skipIf(!EMU)('E5 — ingestLeadTransaction: re-entrega = no-op total', () => {
  let admin, db, ingestLeadTransaction;
  const ISO = '2030-03-01T10:00:00.000Z';

  const mkCanonical = () => ({
    dedupKey: 'email:retry@e5.co',
    contact: {
      fullName: 'Retry E5', email: 'retry@e5.co', phone: null,
      lifecycleStage: 'lead', createdAt: ISO, updatedAt: ISO, lastActivityAt: ISO, _version: 1,
    },
    lead: {
      fullName: 'Retry E5', email: 'retry@e5.co', phone: null, contactId: null,
      status: 'nuevo', ownerId: null, ownerName: null, source: 'walkin',
      createdAt: ISO, updatedAt: ISO, lastActivityAt: ISO, _version: 1,
    },
    activity: {
      type: 'lead', kind: 'system', subject: 'Lead nuevo', status: 'closed',
      direction: 'inbound', relatedTo: { type: 'lead', id: null, name: 'Retry E5' },
      createdAt: ISO, _version: 1,
    },
  });

  beforeAll(async () => {
    admin = (await import('firebase-admin')).default;
    const app = admin.apps.find((a) => a && a.name === 'e5-ingest')
      || admin.initializeApp({ projectId: 'altorra-e5-ingest' }, 'e5-ingest');
    db = app.firestore();
    ({ ingestLeadTransaction } = await import('./ingestLead.js'));
    await db.collection('config').doc('crmIntake').set({
      rotation: [{ uid: 'asesor_a', nombre: 'A' }, { uid: 'asesor_b', nombre: 'B' }],
      next: 0,
    });
    await db.collection('lead_intake').doc('src_retry').set({ nombre: 'Retry E5', ownerId: null });
  });

  afterAll(async () => {
    if (!db) return;
    for (const col of ['leads', 'contacts', 'activities', 'dedup', 'lead_intake', 'config', 'crm_config']) {
      const snap = await db.collection(col).get();
      for (const d of snap.docs) await d.ref.delete();
    }
  });

  it('1ª entrega: ingiere, asigna rotación y marca el origen', async () => {
    const sourceRef = db.collection('lead_intake').doc('src_retry');
    const r1 = await ingestLeadTransaction(db, mkCanonical(), sourceRef);
    expect(r1.alreadyIngested).toBeFalsy();
    expect(r1.leadId).toBeTruthy();
    expect(r1.ownerId).toBe('asesor_a'); // rotación turno 0
    const src = (await sourceRef.get()).data();
    expect(src._ingestedAt).toBeTruthy();
    expect((await db.collection('config').doc('crmIntake').get()).data().next).toBe(1);
    expect((await db.collection('leads').get()).size).toBe(1);
  });

  it('re-entrega (payload inmutable SIN _ingestedAt): no-op — cero lead nuevo, rotación intacta, ownerId null (sin re-alerta)', async () => {
    const sourceRef = db.collection('lead_intake').doc('src_retry');
    const r2 = await ingestLeadTransaction(db, mkCanonical(), sourceRef);
    expect(r2.alreadyIngested).toBe(true);
    expect(r2.leadId).toBe(null);
    expect(r2.ownerId).toBe(null); // el caller salta la alerta Telegram
    expect((await db.collection('leads').get()).size).toBe(1); // sin duplicado
    expect((await db.collection('activities').get()).size).toBe(1);
    expect((await db.collection('config').doc('crmIntake').get()).data().next).toBe(1); // no avanzó
  });

  it('origen BORRADO entre evento y retry: no-op (jamás resucitar)', async () => {
    const ghostRef = db.collection('lead_intake').doc('src_ghost');
    const r = await ingestLeadTransaction(db, mkCanonical(), ghostRef);
    expect(r.alreadyIngested).toBe(true);
  });
});

describe.skipIf(EMU)('E5 ingesta re-entrega (skip)', () => {
  it('requiere emulador — correr con firebase emulators:exec', () => {
    expect(true).toBe(true);
  });
});
