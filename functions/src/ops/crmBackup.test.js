import { describe, it, expect } from 'vitest';
import { buildRestorePlan } from './crmBackup.js';

/* Solo la lógica PURA (el plan). encode/decode usan admin.firestore.Timestamp
 * (instancia real) → se ensayan en el emulador junto al restore (F30/F34). */

describe('buildRestorePlan — F34', () => {
  const backup = {
    leads: { a: { x: 1 }, b: { x: 2 } },
    deals: { d1: { y: 1 } },
  };

  it('clasifica create vs overwrite y cuenta lo que el backup NO conoce', () => {
    const plan = buildRestorePlan(backup, { leads: ['b', 'c'], deals: [] }, null);
    expect(plan.leads).toEqual({ total: 2, toCreate: 1, toOverwrite: 1, currentNotInBackup: 1 });
    expect(plan.deals).toEqual({ total: 1, toCreate: 1, toOverwrite: 0, currentNotInBackup: 0 });
  });

  it('filtra por collections cuando se pide un subconjunto', () => {
    const plan = buildRestorePlan(backup, { leads: [], deals: [] }, ['deals']);
    expect(plan.leads).toBeUndefined();
    expect(plan.deals).toBeTruthy();
  });

  it('el restore NUNCA borra docs actuales fuera del backup (solo los reporta)', () => {
    const plan = buildRestorePlan({ leads: {} }, { leads: ['viejo1', 'viejo2'] }, null);
    expect(plan.leads.currentNotInBackup).toBe(2);
    expect(plan.leads.toCreate).toBe(0);
  });
});
