import { describe, it, expect } from 'vitest';
import { computeRbacFoundationUpdate } from './rbac-foundation.js';

// §193.4 ④a PASO 2 — decisión PURA del backfill de fundación RBAC (ADR §215).

describe('computeRbacFoundationUpdate — no-dueño (isOwner=false)', () => {
  it('doc fresco sin campos → siembra los 4 (nivel 10)', () => {
    const { updates, anomaly } = computeRbacFoundationUpdate({ rol: 'asesor' }, false);
    expect(updates).toEqual({ nivel: 10, departmentId: null, departmentName: '', dataScope: 'all' });
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
    expect(updates).toEqual({ departmentName: '', dataScope: 'all' });
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
  it('doc fresco de dueño → nivel 100 + defaults', () => {
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
      .toEqual({ nivel: 10, departmentId: null, departmentName: '', dataScope: 'all' });
    expect(computeRbacFoundationUpdate(undefined, true).updates)
      .toEqual({ nivel: 100, departmentId: null, departmentName: '', dataScope: 'all' });
  });
});
