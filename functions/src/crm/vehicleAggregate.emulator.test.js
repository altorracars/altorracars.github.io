/**
 * E4 §186 / F30 — Tests de emulador del AGREGADO del vehículo (F25) y de
 * los efectos del GANADO (F10): transacción real contra el emulador,
 * idempotencia ante retries y carrera de recálculos concurrentes.
 * Corre solo con emulador: firebase emulators:exec --only firestore "npm --prefix functions test"
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';

const EMU = !!process.env.FIRESTORE_EMULATOR_HOST;

describe.skipIf(!EMU)('E4 — F25 recalcVehicleState + F10 applyWonSideEffects', () => {
  let admin, db, recalcVehicleState, applyWonSideEffects;

  beforeAll(async () => {
    admin = (await import('firebase-admin')).default;
    const app = admin.apps.find((a) => a && a.name === 'e4-agregado')
      || admin.initializeApp({ projectId: 'altorra-e4-agregado' }, 'e4-agregado');
    db = app.firestore();
    ({ recalcVehicleState } = await import('./vehicleAggregate.js'));
    ({ applyWonSideEffects } = await import('./dealWon.js'));
  });

  afterAll(async () => {
    if (!db) return;
    for (const col of ['deals', 'vehiculos', 'activities']) {
      const snap = await db.collection(col).get();
      for (const d of snap.docs) await d.ref.delete();
    }
  });

  const seedVeh = (id, estado) => db.collection('vehiculos').doc(id).set({
    id: Number(id.replace(/\D/g, '')) || 0, estado, _version: 1, updatedAt: '2030-01-01T00:00:00.000Z',
  });
  const seedDeal = (id, vehicleId, status, stageId, extra = {}) =>
    db.collection('deals').doc(id).set({
      name: 'Deal ' + id, vehicleId, status, stageId, amount: 50000000,
      ownerId: 'asesor_test', _version: 1, ...extra,
    });

  it('open en apartado → vehículo apartado (con bump de _version)', async () => {
    await seedVeh('101', 'disponible');
    await seedDeal('d1', '101', 'open', 'apartado');
    const r = await recalcVehicleState(db, '101', '2030-01-02T00:00:00.000Z');
    expect(r).toMatchObject({ changed: true, from: 'disponible', to: 'apartado' });
    const v = (await db.collection('vehiculos').doc('101').get()).data();
    expect(v.estado).toBe('apartado');
    expect(v._version).toBe(2);
  });

  it('retroceso del apartado (anulado) → vuelve a disponible', async () => {
    await db.collection('deals').doc('d1').update({ status: 'anulado' });
    const r = await recalcVehicleState(db, '101');
    expect(r).toMatchObject({ changed: true, from: 'apartado', to: 'disponible' });
  });

  it('won gana sobre apartado y vendido es TERMINAL para el agregado', async () => {
    await seedVeh('102', 'disponible');
    await seedDeal('d2', '102', 'open', 'apartado');
    await seedDeal('d3', '102', 'won', 'vendido');
    const r1 = await recalcVehicleState(db, '102');
    expect(r1.to).toBe('vendido');
    // el deal won desaparece (borrado de prueba) → el agregado JAMÁS des-vende
    await db.collection('deals').doc('d3').delete();
    const r2 = await recalcVehicleState(db, '102');
    expect(r2.changed).toBe(false);
    expect((await db.collection('vehiculos').doc('102').get()).data().estado).toBe('vendido');
  });

  it('jamás degrada un estado MANUAL (reservado) a disponible', async () => {
    await seedVeh('103', 'reservado');
    const r = await recalcVehicleState(db, '103');
    expect(r.changed).toBe(false);
    expect((await db.collection('vehiculos').doc('103').get()).data().estado).toBe('reservado');
  });

  it('vehículo inexistente → no-op legible', async () => {
    const r = await recalcVehicleState(db, 'no_existe');
    expect(r).toMatchObject({ changed: false, reason: 'vehiculo_no_existe' });
  });

  // timeout amplio: dos tx en contención contra el emulador pueden tardar >5s
  it('CARRERA: dos recálculos concurrentes convergen al mismo estado sin doble bump', { timeout: 20000 }, async () => {
    await seedVeh('104', 'disponible');
    await seedDeal('d4', '104', 'open', 'apartado');
    const results = await Promise.allSettled([
      recalcVehicleState(db, '104'),
      recalcVehicleState(db, '104'),
    ]);
    expect(results.every((x) => x.status === 'fulfilled')).toBe(true);
    const changed = results.filter((x) => x.value.changed).length;
    expect(changed).toBe(1); // el otro vio el estado ya correcto (no-op)
    const v = (await db.collection('vehiculos').doc('104').get()).data();
    expect(v.estado).toBe('apartado');
    expect(v._version).toBe(2);
  });

  it('F10: ganar crea wonAt + postventa + commissionSnapshots[] enriquecido + 3 tareas deterministas', async () => {
    await seedDeal('d5', null, 'won', 'vendido', {
      amount: 72000000, tipoPago: 'contado', leadId: 'l5', name: 'Ana · Civic',
    });
    const wonAt = '2030-02-01T15:00:00.000Z';
    await applyWonSideEffects(db, 'd5', { name: 'Ana · Civic', leadId: 'l5', ownerId: 'asesor_test' }, wonAt);
    const deal = (await db.collection('deals').doc('d5').get()).data();
    expect(deal.wonAt).toBe(wonAt);
    expect(deal.postventa).toEqual({ entrega: false, traspaso_runt: false, tramites: false });
    // snapshot ENRIQUECIDO append-only (§9): sin vehículo/tenencia → defaults
    // seguros (EXTERNO/MANUAL/baseline 0) → altorraRevenue 0; salePrice = amount.
    expect(deal.commissionSnapshots).toHaveLength(1);
    expect(deal.commissionSnapshots[0]).toMatchObject({
      rev: 1, salePrice: 72000000, createdBy: 'asesor_test', createdAt: wonAt, altorraRevenue: 0,
    });
    expect(deal.commissionSnapshots[0].frozenTenancy.type).toBe('EXTERNO');
    expect(deal.commissionSnapshots[0].frozenTenancy.economics.method).toBe('MANUAL');
    for (const item of ['entrega', 'traspaso_runt', 'tramites']) {
      const a = await db.collection('activities').doc('postventa_d5_' + item).get();
      expect(a.exists).toBe(true);
      expect(a.data().status).toBe('open');
      expect(a.data().dueAt > wonAt).toBe(true);
    }
  });

  it('F10 idempotente: el retry NO pisa el snapshot ni reabre tareas cerradas', async () => {
    // el asesor cierra una tarea y alguien edita el monto ANTES del retry
    await db.collection('activities').doc('postventa_d5_entrega').update({ status: 'closed' });
    await db.collection('deals').doc('d5').update({ amount: 99000000 });
    await applyWonSideEffects(db, 'd5', { name: 'Ana · Civic', leadId: 'l5', ownerId: 'asesor_test' }, '2030-02-01T15:05:00.000Z');
    const deal = (await db.collection('deals').doc('d5').get()).data();
    expect(deal.commissionSnapshots).toHaveLength(1); // el retry no agregó otra rev
    expect(deal.commissionSnapshots[0].salePrice).toBe(72000000); // la base NO se movió
    const a = await db.collection('activities').doc('postventa_d5_entrega').get();
    expect(a.data().status).toBe('closed'); // el retry no la reabrió
  });
});

describe.skipIf(EMU)('E4 agregado vehículo (skip)', () => {
  it('requiere emulador (FIRESTORE_EMULATOR_HOST) — corre en el gate de deploy', () => {
    expect(true).toBe(true);
  });
});
