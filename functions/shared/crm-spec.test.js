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

describe('E4 §186 — F25 agregado del vehículo', () => {
  it('algún deal won → vendido (gana sobre apartado)', () => {
    expect(spec.computeVehicleState([
      { status: 'won', stageId: 'vendido' },
      { status: 'open', stageId: 'apartado' },
    ])).toBe('vendido');
  });
  it('open en apartado (sin won) → apartado', () => {
    expect(spec.computeVehicleState([
      { status: 'open', stageId: 'apartado' },
      { status: 'open', stageId: 'negociacion' },
    ])).toBe('apartado');
  });
  it('solo opens fuera de apartado / lost / anulado / vacío → disponible', () => {
    expect(spec.computeVehicleState([{ status: 'open', stageId: 'negociacion' }])).toBe('disponible');
    expect(spec.computeVehicleState([{ status: 'lost', stageId: 'perdido' }])).toBe('disponible');
    expect(spec.computeVehicleState([{ status: 'anulado', stageId: 'apartado' }])).toBe('disponible');
    expect(spec.computeVehicleState([])).toBe('disponible');
  });
  it('shouldWriteVehicleState: vendido actual es TERMINAL (markAsSold sin deal CRM no se des-vende)', () => {
    expect(spec.shouldWriteVehicleState('vendido', 'disponible')).toBe(false);
    expect(spec.shouldWriteVehicleState('vendido', 'apartado')).toBe(false);
  });
  it('shouldWriteVehicleState: jamás degrada estados MANUALES a disponible', () => {
    expect(spec.shouldWriteVehicleState('reservado', 'disponible')).toBe(false);
    expect(spec.shouldWriteVehicleState('borrador', 'disponible')).toBe(false);
    expect(spec.shouldWriteVehicleState('apartado', 'disponible')).toBe(true); // des-apartar SÍ
  });
  it('shouldWriteVehicleState: subir a apartado/vendido siempre escribe (salvo no-op)', () => {
    expect(spec.shouldWriteVehicleState('disponible', 'apartado')).toBe(true);
    expect(spec.shouldWriteVehicleState(undefined, 'vendido')).toBe(true);
    expect(spec.shouldWriteVehicleState('apartado', 'apartado')).toBe(false);
    expect(spec.shouldWriteVehicleState(undefined, 'disponible')).toBe(false); // default == target
  });
});

describe('E4 §186 — F26 colisión comercial', () => {
  it('2+ opens sobre el mismo vehicleId → grupo; won/lost/sin vehículo no cuentan', () => {
    const cols = spec.detectCollisions([
      { id: 'a', status: 'open', vehicleId: 'v1' },
      { id: 'b', status: 'open', vehicleId: 'v1' },
      { id: 'c', status: 'won', vehicleId: 'v1' },
      { id: 'd', status: 'open', vehicleId: 'v2' },
      { id: 'e', status: 'open' },
    ]);
    expect(cols).toEqual([{ vehicleId: 'v1', dealIds: ['a', 'b'] }]);
  });
  it('sin colisiones → vacío', () => {
    expect(spec.detectCollisions([{ id: 'a', status: 'open', vehicleId: 'v1' }])).toEqual([]);
  });
});

describe('E4 §186 — F10/F42 checklist y liquidación', () => {
  it('checklist post-venta: 3 items con id/label/dueDays', () => {
    expect(spec.POSTVENTA_CHECKLIST.map((i) => i.id)).toEqual(['entrega', 'traspaso_runt', 'tramites']);
    for (const i of spec.POSTVENTA_CHECKLIST) {
      expect(typeof i.label).toBe('string');
      expect(i.dueDays).toBeGreaterThan(0);
    }
  });
  it('dealLiquidable: solo won con checklist COMPLETO', () => {
    const pvFull = { entrega: true, traspaso_runt: true, tramites: true };
    expect(spec.dealLiquidable({ status: 'won', postventa: pvFull })).toBe(true);
    expect(spec.dealLiquidable({ status: 'won', postventa: { ...pvFull, tramites: false } })).toBe(false);
    expect(spec.dealLiquidable({ status: 'won' })).toBe(false);
    expect(spec.dealLiquidable({ status: 'open', postventa: pvFull })).toBe(false);
    expect(spec.dealLiquidable(null)).toBe(false);
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
