/**
 * F34 v2 — ENSAYO DE RESTORE en el emulador (gate de E1b, ADR §181).
 * "Un export sin restore ensayado es teatro de backup" — comité §176.
 * Corre solo con el emulador: firebase emulators:exec --only firestore "npm --prefix functions test"
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';

const EMU = !!process.env.FIRESTORE_EMULATOR_HOST;

describe.skipIf(!EMU)('F34 — ensayo export→wipe→restore (emulador)', () => {
  let admin, db, backup;

  const SEED = {
    contacts: {
      email_ensayo_restore_com: {
        fullName: 'Ensayo Restore', email: 'ensayo@restore.com', phone: '+573001112233',
        consent: { email: true }, createdAt: '2026-06-10T10:00:00.000Z', _version: 2,
      },
    },
    leads: {
      lead_ensayo_1: {
        fullName: 'Ensayo Restore', status: 'contactado', contactId: 'email_ensayo_restore_com',
        convertedTo: null, createdAt: '2026-06-10T10:00:00.000Z', _version: 1,
      },
    },
    deals: {},
    activities: {
      act_ensayo_1: {
        type: 'tarea', subject: 'Llamar', status: 'open', dueAt: '2026-06-11T14:00:00.000Z',
        relatedTo: { type: 'lead', id: 'lead_ensayo_1', name: 'Ensayo Restore' }, createdAt: '2026-06-10T10:05:00.000Z',
      },
    },
    solicitudes: {},
    subscriptions: {},
  };

  beforeAll(async () => {
    admin = (await import('firebase-admin')).default;
    const app = admin.apps.find((a) => a && a.name === 'ensayo-restore')
      || admin.initializeApp({ projectId: 'altorra-ensayo-restore' }, 'ensayo-restore');
    db = app.firestore();
    // siembra
    for (const [col, docs] of Object.entries(SEED)) {
      for (const [id, data] of Object.entries(docs)) {
        await db.collection(col).doc(id).set(data);
      }
    }
  });

  afterAll(async () => {
    // limpia el emulador del proyecto de ensayo
    if (!db) return;
    for (const col of Object.keys(SEED)) {
      const snap = await db.collection(col).get();
      for (const d of snap.docs) await d.ref.delete();
    }
  });

  it('export captura la siembra; tras WIPE el restore reconstruye TODO y limpia _migration', async () => {
    const { buildExportData, applyRestore, buildRestorePlan } = await import('./crmBackup.js');

    // 1) EXPORT
    const { data, counts } = await buildExportData(db, { by: 'ensayo' });
    backup = data;
    expect(counts.contacts).toBe(1);
    expect(counts.leads).toBe(1);
    expect(counts.activities).toBe(1);

    // 2) WIPE (el desastre)
    for (const col of ['contacts', 'leads', 'activities']) {
      const snap = await db.collection(col).get();
      for (const d of snap.docs) await d.ref.delete();
    }
    expect((await db.collection('leads').get()).size).toBe(0);

    // 3) PLAN (dry-run): todo es toCreate
    const ids = {};
    for (const col of Object.keys(backup.collections)) {
      ids[col] = (await db.collection(col).select().get()).docs.map((d) => d.id);
    }
    const plan = buildRestorePlan(backup.collections, ids, null);
    expect(plan.leads.toCreate).toBe(1);
    expect(plan.leads.toOverwrite).toBe(0);

    // 4) RESTORE real
    const restored = await applyRestore(db, backup, { FieldValue: admin.firestore.FieldValue });
    expect(restored.contacts).toBe(1);
    expect(restored.leads).toBe(1);

    // 5) EQUIVALENCIA + flag _migration LIMPIADO (2ª pasada)
    const lead = (await db.collection('leads').doc('lead_ensayo_1').get()).data();
    expect(lead.status).toBe('contactado');
    expect(lead.contactId).toBe('email_ensayo_restore_com');
    expect(lead._migration).toBeUndefined();
    const contact = (await db.collection('contacts').doc('email_ensayo_restore_com').get()).data();
    expect(contact.fullName).toBe('Ensayo Restore');
    expect(contact._version).toBe(2);
    expect(contact._migration).toBeUndefined();
    const act = (await db.collection('activities').doc('act_ensayo_1').get()).data();
    expect(act.relatedTo.id).toBe('lead_ensayo_1');
    expect(act._migration).toBeUndefined();
  });
});

describe.skipIf(EMU)('F34 ensayo (skip)', () => {
  it('requiere emulador — firebase emulators:exec', () => { expect(true).toBe(true); });
});
