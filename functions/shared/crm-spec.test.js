import { describe, it, expect } from 'vitest';
import spec from './crm-spec.js';

describe('crm-spec — enums v3', () => {
  it('estados del lead v3 exactos (aprobados §176)', () => {
    expect(spec.LEAD_STATUSES).toEqual(['nuevo', 'contactado', 'convertido', 'descartado']);
  });
  it('etapas del deal v3 en orden con probabilidades', () => {
    expect(spec.DEAL_STAGES.map((s) => s.id)).toEqual([
      'cuadrando_cita', 'cita_fijada', 'visita_test_drive', 'negociacion', 'apartado', 'vendido',
    ]);
    expect(spec.DEAL_STAGES.find((s) => s.id === 'apartado').prob).toBe(0.90);
    expect(spec.DEAL_LOST.prob).toBe(0);
  });
  it('razones de descarte separan inalcanzable de no_califica', () => {
    expect(spec.DISCARD_REASONS).toContain('inalcanzable');
    expect(spec.DISCARD_REASONS).toContain('no_califica');
  });
});

describe('F1 — lead convertido inmutable', () => {
  it('lead con convertedTo.dealId está bloqueado', () => {
    expect(spec.isLeadLocked({ convertedTo: { dealId: 'd1' } })).toBe(true);
  });
  it('lead sin conversión (convertedTo null o ausente) NO está bloqueado', () => {
    expect(spec.isLeadLocked({ convertedTo: null })).toBe(false);
    expect(spec.isLeadLocked({})).toBe(false);
  });
});

describe('transiciones del LEAD (cliente)', () => {
  it('convertido jamás se alcanza por dropdown', () => {
    for (const from of spec.LEAD_STATUSES) {
      if (from === 'convertido') continue;
      expect(spec.canLeadTransition(from, 'convertido')).toBe(false);
    }
  });
  it('convertido no sale a ningún lado desde el cliente', () => {
    expect(spec.LEAD_TRANSITIONS.convertido).toEqual([]);
  });
  it('descartado es reabrible (error humano)', () => {
    expect(spec.canLeadTransition('descartado', 'contactado')).toBe(true);
  });
});

describe('matriz de transiciones del DEAL (D.3)', () => {
  it('adelante adyacente: sin razón, gates de la etapa destino', () => {
    const t = spec.dealTransition('negociacion', 'apartado');
    expect(t.ok).toBe(true);
    expect(t.needsReason).toBe(false);
    expect(t.gates).toEqual(expect.arrayContaining(['montoApartado', 'venceEl']));
  });
  it('salto adelante ACUMULA gates en un solo prompt (walk-in que compra el mismo día)', () => {
    const t = spec.dealTransition('cuadrando_cita', 'apartado');
    expect(t.ok).toBe(true);
    // cruza visita_test_drive (gate de salida huboTestDrive) + entra a apartado
    expect(t.gates).toEqual(expect.arrayContaining(['huboTestDrive', 'montoApartado', 'venceEl']));
  });
  it('vendido exige tipoPago', () => {
    expect(spec.dealTransition('apartado', 'vendido').gates).toContain('tipoPago');
  });
  it('atrás exige razón; desde apartado además recalcula vehículo (F25)', () => {
    const t = spec.dealTransition('apartado', 'negociacion');
    expect(t.ok).toBe(true);
    expect(t.needsReason).toBe(true);
    expect(t.recalcVehicle).toBe(true);
  });
  it('vendido es terminal para el cliente', () => {
    expect(spec.dealTransition('vendido', 'negociacion').ok).toBe(false);
  });
  it('perdido alcanzable desde cualquier etapa abierta y exige lostReason', () => {
    const t = spec.dealTransition('cita_fijada', 'perdido');
    expect(t.ok).toBe(true);
    expect(t.gates).toContain('lostReason');
  });
});

describe('migración LEGACY (F35b, E1b)', () => {
  it('todo estado v2 retirado tiene mapeo de migración', () => {
    for (const s of spec.LEGACY.leadStatuses) {
      expect(spec.LEGACY.leadMigration[s]).toBeTruthy();
    }
    for (const s of spec.LEGACY.dealStages) {
      expect(spec.isValidDealStage(spec.LEGACY.dealStageMigration[s])).toBe(true);
    }
  });
  it('los mapeos de lead aterrizan en estados v3 válidos', () => {
    for (const m of Object.values(spec.LEGACY.leadMigration)) {
      expect(spec.isValidLeadStatus(m.status)).toBe(true);
      if (m.status === 'descartado') expect(spec.isValidDiscardReason(m.discardReason)).toBe(true);
    }
  });
});
