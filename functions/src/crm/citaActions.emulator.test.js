/**
 * F19/F30 — TEST DE CARRERA C.5 (ADR §184, exigido por el checklist F39):
 * dos reservas CONCURRENTES del mismo bloque (mismo asesor / mismo
 * vehículo) → UNA gana, la otra recibe rechazo LEGIBLE. También: bloques
 * parcialmente solapados chocan; recursos distintos conviven.
 * Corre solo con emulador: firebase emulators:exec --only firestore "npm --prefix functions test"
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';

const EMU = !!process.env.FIRESTORE_EMULATOR_HOST;

describe.skipIf(!EMU)('F19 — carrera de tupla (asesor, vehículo) en bloques de 30min', () => {
  let admin, db, internals;
  const DAY = '2030-01-15';

  beforeAll(async () => {
    admin = (await import('firebase-admin')).default;
    const app = admin.apps.find((a) => a && a.name === 'carrera-citas')
      || admin.initializeApp({ projectId: 'altorra-carrera-citas' }, 'carrera-citas');
    db = app.firestore();
    internals = (await import('./citaActions.js'))._internals;
  });

  afterAll(async () => {
    if (!db) return;
    const snap = await db.collection('resource_slots').get();
    for (const d of snap.docs) await d.ref.delete();
  });

  // timeout amplio: dos tx en contención contra el emulador pueden tardar >5s
  it('C.5: dos confirmaciones simultáneas del MISMO asesor a la misma hora — una gana, una pierde legible', { timeout: 20000 }, async () => {
    const r = internals.reserveTupleTransaction;
    const results = await Promise.allSettled([
      r(db, DAY, '10:00', 60, 'asesor_juan', 'veh_civic', { asesorName: 'Juan' }),
      r(db, DAY, '10:00', 60, 'asesor_juan', 'veh_kia', { asesorName: 'Juan' }),
    ]);
    const wins = results.filter((x) => x.status === 'fulfilled');
    const losses = results.filter((x) => x.status === 'rejected');
    expect(wins.length).toBe(1);
    expect(losses.length).toBe(1);
    expect(losses[0].reason.code).toBe('TUPLE_TAKEN');
    expect(losses[0].reason.message).toMatch(/Juan ya tiene una cita a las 10:(00|30)/);

    const day = (await db.collection('resource_slots').doc(DAY).get()).data();
    expect(day['asesor_asesor_juan']).toEqual(['10:00', '10:30']); // solo UNA reserva quedó
  });

  it('solape parcial choca (10:30×60 vs 10:00×60 ya reservada)', async () => {
    await expect(
      internals.reserveTupleTransaction(db, DAY, '10:30', 60, 'asesor_juan', null, { asesorName: 'Juan' })
    ).rejects.toMatchObject({ code: 'TUPLE_TAKEN' });
  });

  it('mismo horario con OTRO asesor y OTRO vehículo convive; mismo VEHÍCULO choca', async () => {
    await internals.reserveTupleTransaction(db, DAY, '10:00', 60, 'asesor_maria', 'veh_mazda', { asesorName: 'María' });
    await expect(
      internals.reserveTupleTransaction(db, DAY, '10:30', 30, 'asesor_pedro', 'veh_mazda', { vehicleName: 'El Mazda' })
    ).rejects.toMatchObject({ code: 'TUPLE_TAKEN' });
  });

  // Gap 7 (§188 §4.7): reasignar asesor = mover bloques saliente→entrante.
  it('gap 7: reasignar mueve los bloques al entrante; choca si está ocupado; el vehículo no se toca', { timeout: 20000 }, async () => {
    const DAY2 = '2030-02-01';
    const dayRef = db.collection('resource_slots').doc(DAY2);
    await dayRef.set({ asesor_ana: ['14:00', '14:30'], asesor_pedro: ['14:00'], vehiculo_kia: ['14:00', '14:30'] });

    // entrante OCUPADO → conflictos y NADA cambia
    await db.runTransaction(async (tx) => {
      const data = (await tx.get(dayRef)).data();
      const conflicts = internals.moveAdvisorBlocks(tx, dayRef, data, ['14:00', '14:30'], 'ana', 'pedro');
      expect(conflicts.length).toBeGreaterThan(0);
      expect(conflicts[0].kind).toBe('asesor');
    });
    let day = (await dayRef.get()).data();
    expect(day.asesor_ana).toEqual(['14:00', '14:30']);

    // entrante LIBRE → se mueve; pedro y el vehículo quedan intactos
    await db.runTransaction(async (tx) => {
      const data = (await tx.get(dayRef)).data();
      const conflicts = internals.moveAdvisorBlocks(tx, dayRef, data, ['14:00', '14:30'], 'ana', 'lucia');
      expect(conflicts).toEqual([]);
    });
    day = (await dayRef.get()).data();
    expect(day.asesor_ana).toEqual([]);
    expect(day.asesor_lucia).toEqual(['14:00', '14:30']);
    expect(day.asesor_pedro).toEqual(['14:00']);
    expect(day.vehiculo_kia).toEqual(['14:00', '14:30']);
  });

  it('liberar bloques deja el recurso reutilizable (ciclo completo)', { timeout: 20000 }, async () => {
    const dayRef = db.collection('resource_slots').doc(DAY);
    await db.runTransaction(async (tx) => {
      const snap = await tx.get(dayRef);
      internals.applyTupleRelease(tx, dayRef, snap.data(), ['10:00', '10:30'], 'asesor_juan', null);
    });
    const after = await internals.reserveTupleTransaction(db, DAY, '10:00', 30, 'asesor_juan', null, {});
    expect(after.blocks).toEqual(['10:00']);
  });

  it('cupo global: reservar duplicado lanza SLOT_TAKEN legible; liberar limpia la fecha vacía', () => {
    const { globalReserve, globalRelease } = internals;
    const s1 = globalReserve({}, DAY, '11:00');
    expect(s1[DAY]).toEqual(['11:00']);
    expect(() => globalReserve(s1, DAY, '11:00')).toThrowError(/ya está reservado/);
    const s2 = globalRelease(s1, DAY, '11:00');
    expect(s2[DAY]).toBeUndefined();
  });
});
