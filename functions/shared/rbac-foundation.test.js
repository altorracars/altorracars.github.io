import { describe, it, expect } from 'vitest';
import { computeRbacFoundationUpdate, computeNivelSeedOnAssign } from './rbac-foundation.js';

// §193.4 ④a PASO 2 — decisión PURA del backfill de fundación RBAC (ADR §215).

describe('computeRbacFoundationUpdate — no-dueño (isOwner=false)', () => {
  it('doc fresco sin campos → siembra los 4 (nivel 10, dataScope OWN = default seguro OLA-0.2)', () => {
    const { updates, anomaly } = computeRbacFoundationUpdate({ rol: 'asesor' }, false);
    expect(updates).toEqual({ nivel: 10, departmentId: null, departmentName: '', dataScope: 'own' });
    expect(anomaly).toBeNull();
  });

  it('NO degrada un nivel ya asignado a mano (autoridad per-usuario)', () => {
    const { updates } = computeRbacFoundationUpdate(
      { rol: 'asesor', nivel: 60, departmentId: 'dept_ventas', departmentName: 'Ventas', dataScope: 'dept' }, false);
    expect(updates).toEqual({}); // todo presente → nada que escribir
  });

  it('respeta departmentId ya seteado; solo completa lo ausente', () => {
    const { updates } = computeRbacFoundationUpdate(
      { rol: 'asesor', nivel: 10, departmentId: 'dept_ventas' }, false);
    // departmentId presente → no se toca; faltan departmentName + dataScope
    expect(updates).toEqual({ departmentName: '', dataScope: 'own' });
  });

  it('null / "" son valores legítimos ya seteados (no se re-escriben)', () => {
    const { updates } = computeRbacFoundationUpdate(
      { rol: 'asesor', nivel: 10, departmentId: null, departmentName: '', dataScope: 'all' }, false);
    expect(updates).toEqual({});
  });

  it('dataScope fuera del enum → anomalía, NO se pisa', () => {
    const { updates, anomaly } = computeRbacFoundationUpdate(
      { rol: 'asesor', nivel: 10, departmentId: null, departmentName: '', dataScope: 'global' }, false);
    expect(updates).toEqual({}); // no clobber
    expect(anomaly).toBe('dataScope:global');
  });
});

describe('computeRbacFoundationUpdate — dueño (isOwner=true, INAMOVIBLE)', () => {
  it('doc fresco de dueño → nivel 100 + defaults (dataScope ALL: su scope real)', () => {
    const { updates } = computeRbacFoundationUpdate({ permissions: ['*'] }, true);
    expect(updates).toEqual({ nivel: 100, departmentId: null, departmentName: '', dataScope: 'all' });
  });

  it('dueño con nivel ya 100 y campos completos → idempotente (vacío)', () => {
    const { updates } = computeRbacFoundationUpdate(
      { permissions: ['*'], nivel: 100, departmentId: null, departmentName: '', dataScope: 'all' }, true);
    expect(updates).toEqual({});
  });

  it('dueño con nivel ERRÓNEO (10) → se CORRIGE a 100 (a diferencia del no-dueño)', () => {
    const { updates } = computeRbacFoundationUpdate(
      { permissions: ['*'], nivel: 10, departmentId: null, departmentName: '', dataScope: 'all' }, true);
    expect(updates).toEqual({ nivel: 100 });
  });
});

describe('computeRbacFoundationUpdate — robustez de entrada', () => {
  it('data null/undefined no rompe (trata como doc vacío)', () => {
    expect(computeRbacFoundationUpdate(null, false).updates)
      .toEqual({ nivel: 10, departmentId: null, departmentName: '', dataScope: 'own' });
    expect(computeRbacFoundationUpdate(undefined, true).updates)
      .toEqual({ nivel: 100, departmentId: null, departmentName: '', dataScope: 'all' });
  });
});

// §193.4 ④a PASO 5 — siembra de `nivel` al asignar rol (onUserRoleAssigned, ADR §219).
describe('computeNivelSeedOnAssign — siembra solo si falta', () => {
  it('usuario SIN nivel + rol con nivel → siembra el nivel del rol', () => {
    expect(computeNivelSeedOnAssign({ rol: 'asesor' }, { name: 'Asesor', nivel: 60 }))
      .toEqual({ nivel: 60 });
  });

  it('usuario SIN nivel + rol SIN nivel → cae al DEFAULT_NIVEL (10)', () => {
    expect(computeNivelSeedOnAssign({ rol: 'asesor' }, { name: 'Asesor' }))
      .toEqual({ nivel: 10 });
  });

  it('usuario SIN nivel + rol CEO (100) → siembra 100', () => {
    expect(computeNivelSeedOnAssign({}, { name: 'Super Admin', nivel: 100 }))
      .toEqual({ nivel: 100 });
  });

  it('usuario CON nivel asignado a mano → NO se pisa (idempotente)', () => {
    expect(computeNivelSeedOnAssign({ nivel: 40 }, { name: 'Asesor', nivel: 10 }))
      .toEqual({});
  });

  it('nivel 0 es valor legítimo ya seteado → NO se re-escribe', () => {
    expect(computeNivelSeedOnAssign({ nivel: 0 }, { name: 'Asesor', nivel: 10 }))
      .toEqual({});
  });

  it('§215.7 — role.nivel string ("60") NO se normaliza en ④a → DEFAULT (10)', () => {
    expect(computeNivelSeedOnAssign({}, { name: 'Asesor', nivel: '60' }))
      .toEqual({ nivel: 10 });
  });

  it('robustez: userData null + rol con nivel → siembra; roleData null → DEFAULT', () => {
    expect(computeNivelSeedOnAssign(null, { nivel: 50 })).toEqual({ nivel: 50 });
    expect(computeNivelSeedOnAssign(undefined, null)).toEqual({ nivel: 10 });
  });
});
