import { describe, it, expect } from 'vitest';
import { businessHoursBetween, pickFromRotation } from './business-hours.js';

// Bogotá = UTC-5: las 08:00 locales son 13:00Z; las 18:00 locales son 23:00Z.
// 2026-06-12 es viernes; 06-13 sábado; 06-14 domingo; 06-15 lunes.

describe('F37 — businessHoursBetween (lun-sáb 8-18, UTC-5)', () => {
  it('dentro del mismo día hábil cuenta horas reales', () => {
    expect(businessHoursBetween('2026-06-12T14:00:00Z', '2026-06-12T16:30:00Z')).toBeCloseTo(2.5, 5);
  });
  it('lead que entra de NOCHE no acumula hasta la apertura', () => {
    // viernes 23:00 local (sáb 04:00Z) → sábado 9:00 local (14:00Z) = 1h hábil
    expect(businessHoursBetween('2026-06-13T04:00:00Z', '2026-06-13T14:00:00Z')).toBeCloseTo(1, 5);
  });
  it('cruza viernes-tarde → sábado-mañana', () => {
    // viernes 17:00 local (22:00Z) → sábado 9:00 local = 1h (vie 17-18) + 1h (sáb 8-9)
    expect(businessHoursBetween('2026-06-12T22:00:00Z', '2026-06-13T14:00:00Z')).toBeCloseTo(2, 5);
  });
  it('el DOMINGO no cuenta', () => {
    // sábado 19:00 local (sáb 24:00Z = dom 00:00Z) → lunes 9:00 local (14:00Z) = 1h (lun 8-9)
    expect(businessHoursBetween('2026-06-14T00:00:00Z', '2026-06-15T14:00:00Z')).toBeCloseTo(1, 5);
  });
  it('día hábil completo = 10h', () => {
    // viernes 00:00 local (05:00Z) → sábado 00:00 local
    expect(businessHoursBetween('2026-06-12T05:00:00Z', '2026-06-13T05:00:00Z')).toBeCloseTo(10, 5);
  });
  it('inputs inválidos o invertidos → 0', () => {
    expect(businessHoursBetween('x', 'y')).toBe(0);
    expect(businessHoursBetween('2026-06-12T16:00:00Z', '2026-06-12T14:00:00Z')).toBe(0);
  });
});

describe('F37b — pickFromRotation (round-robin de intake)', () => {
  it('rota en orden y envuelve', () => {
    const cfg = { rotation: [{ uid: 'a', nombre: 'Ana' }, { uid: 'b', nombre: 'Beto' }], next: 1 };
    const r1 = pickFromRotation(cfg);
    expect(r1.owner.uid).toBe('b');
    expect(r1.next).toBe(0);
  });
  it('acepta strings planos como uids', () => {
    expect(pickFromRotation({ rotation: ['solo'], next: 0 }).owner).toEqual({ uid: 'solo', nombre: null });
  });
  it('sin rotación → owner null (comportamiento actual intacto)', () => {
    expect(pickFromRotation(null).owner).toBeNull();
    expect(pickFromRotation({ rotation: [] }).owner).toBeNull();
  });
});
