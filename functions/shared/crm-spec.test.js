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

describe('TODO-25 §9 — primitivas económicas (restructura comercial)', () => {
  it('enums de ORIGEN y MÉTODO exactos al diseño FROZEN', () => {
    expect(spec.TENANCY_TYPES).toEqual(['PROPIO', 'ALIADO', 'CONSIGNA', 'EXTERNO']);
    expect(spec.MARGIN_METHODS).toEqual(['SPREAD', 'PERCENTAGE', 'FLAT', 'MANUAL']);
    expect(spec.FUNDS_FLOWS).toEqual(['ALTORRA_ESCROW', 'DIRECT_TO_OWNER']);
  });

  it('SPREAD = venta − baselineValue (caso REAL del dueño: aliado neto 54M)', () => {
    const eco = { method: 'SPREAD', baselineValue: 54_000_000 };
    // a 55M Altorra gana 1M; a 60M gana 6M (el aliado recibe 54M neto siempre)
    expect(spec.computeAltorraRevenue(eco, 55_000_000)).toBe(1_000_000);
    expect(spec.computeAltorraRevenue(eco, 60_000_000)).toBe(6_000_000);
  });
  it('SPREAD puede ser NEGATIVO (propio vendido a pérdida)', () => {
    expect(spec.computeAltorraRevenue({ method: 'SPREAD', baselineValue: 30_000_000 }, 28_000_000)).toBe(-2_000_000);
  });
  it('PERCENTAGE = venta × rate (fracción); FLAT = flatFee; MANUAL = monto digitado', () => {
    expect(spec.computeAltorraRevenue({ method: 'PERCENTAGE', percentageRate: 0.05 }, 40_000_000)).toBe(2_000_000);
    expect(spec.computeAltorraRevenue({ method: 'FLAT', flatFee: 800_000 }, 99_000_000)).toBe(800_000);
    expect(spec.computeAltorraRevenue({ method: 'MANUAL' }, 60_000_000, 1_500_000)).toBe(1_500_000);
  });
  it('método inválido/ausente → 0 (jamás lanza)', () => {
    expect(spec.computeAltorraRevenue({ method: 'XXX' }, 60_000_000)).toBe(0);
    expect(spec.computeAltorraRevenue(null, 60_000_000)).toBe(0);
    expect(spec.computeAltorraRevenue(undefined, undefined)).toBe(0);
  });
  it('roundCOP redondea a peso entero (half-away-from-zero)', () => {
    expect(spec.roundCOP(2_500_000.5)).toBe(2_500_001);
    expect(spec.roundCOP(-2.5)).toBe(-3);
    expect(spec.roundCOP('100')).toBe(100);
    expect(spec.roundCOP(Infinity)).toBe(0);
  });

  it('normalizeTenancy: defaults seguros (tipo→EXTERNO, método→MANUAL)', () => {
    expect(spec.normalizeTenancy(null)).toEqual({
      type: 'EXTERNO', ownerRefId: null, ownerRefType: null, ownerDisplayName: null,
      economics: { method: 'MANUAL', baselineValue: 0, percentageRate: null, flatFee: null },
    });
    const norm = spec.normalizeTenancy({ type: 'ALIADO', ownerRefId: 'usados-de-la-costa',
      economics: { method: 'SPREAD', baselineValue: 54_000_000 } });
    expect(norm.type).toBe('ALIADO');
    expect(norm.economics.method).toBe('SPREAD');
    expect(norm.economics.percentageRate).toBeNull();
  });

  it('§TODO-50 normalizeTenancy: deriva ownerRefType del type y conserva ownerDisplayName', () => {
    const aliado = spec.normalizeTenancy({ type: 'ALIADO', ownerRefId: 'usados-de-la-costa', ownerDisplayName: 'Usados de la Costa' });
    expect(aliado.ownerRefType).toBe('concesionario');
    expect(aliado.ownerDisplayName).toBe('Usados de la Costa');
    const consigna = spec.normalizeTenancy({ type: 'CONSIGNA', ownerRefId: 'k9x', ownerDisplayName: 'María Restrepo' });
    expect(consigna.ownerRefType).toBe('contact');     // contacto = persona unificada
    expect(consigna.ownerDisplayName).toBe('María Restrepo');
    // consigna ANÓNIMA: sin id, sin nombre → no fosiliza PII
    const anon = spec.normalizeTenancy({ type: 'CONSIGNA' });
    expect(anon.ownerRefId).toBeNull();
    expect(anon.ownerDisplayName).toBeNull();
    expect(spec.normalizeTenancy({ type: 'PROPIO' }).ownerRefType).toBeNull();
  });

  it('§TODO-50 tenancyGroupKey: tupla TIPADA — slug y contactId nunca colisionan', () => {
    expect(spec.tenancyGroupKey({ type: 'ALIADO', ownerRefId: 'usados-de-la-costa' })).toBe('concesionario:usados-de-la-costa');
    expect(spec.tenancyGroupKey({ type: 'CONSIGNA', ownerRefId: 'k9x' })).toBe('contact:k9x');
    // mismo string en dos namespaces → claves DISTINTAS (no se mezclan en el reporte)
    expect(spec.tenancyGroupKey({ type: 'ALIADO', ownerRefId: 'pepe' }))
      .not.toBe(spec.tenancyGroupKey({ type: 'CONSIGNA', ownerRefId: 'pepe' }));
    // consigna anónima → cubo "Sin identificar" (NO se descarta como hoy)
    expect(spec.tenancyGroupKey({ type: 'CONSIGNA', ownerRefId: null })).toBe('consigna:_unidentified');
    // propio/externo/sin owner → null (no es ganancia de un tercero)
    expect(spec.tenancyGroupKey({ type: 'PROPIO' })).toBeNull();
    expect(spec.tenancyGroupKey({ type: 'EXTERNO' })).toBeNull();
    expect(spec.tenancyGroupKey(null)).toBeNull();
    // robusto contra snapshot viejo SIN ownerRefType (lo deriva del type)
    expect(spec.tenancyGroupKey({ type: 'CONSIGNA', ownerRefId: 'old' })).toBe('contact:old');
  });

  it('buildCommissionSnapshotEntry: congela tenancy y computa altorraRevenue', () => {
    const entry = spec.buildCommissionSnapshotEntry({
      rev: 1, createdBy: 'asesor@x', salePrice: 60_000_000, vehicleId: 'v1',
      tenancy: { type: 'ALIADO', ownerRefId: 'usados-de-la-costa',
        economics: { method: 'SPREAD', baselineValue: 54_000_000 } },
      advisorCommission: 200_000, fundsFlow: 'ALTORRA_ESCROW',
    });
    expect(entry.rev).toBe(1);
    expect(entry.altorraRevenue).toBe(6_000_000);
    expect(entry.frozenTenancy.type).toBe('ALIADO');
    expect(entry.fundsFlow).toBe('ALTORRA_ESCROW');
    expect(entry.isManualOverride).toBe(false);
  });
  it('buildCommissionSnapshotEntry: fundsFlow inválido → DIRECT_TO_OWNER; MANUAL usa manualAmount', () => {
    const entry = spec.buildCommissionSnapshotEntry({
      salePrice: 60_000_000, tenancy: { type: 'ALIADO', economics: { method: 'MANUAL' } },
      manualAmount: 1_000_000, fundsFlow: 'XXX', isManualOverride: true, auditReason: 'ajuste',
    });
    expect(entry.altorraRevenue).toBe(1_000_000);
    expect(entry.fundsFlow).toBe('DIRECT_TO_OWNER');
    expect(entry.isManualOverride).toBe(true);
  });

  it('latestCommissionSnapshot / altorraRevenueOf leen el de mayor rev (append-only)', () => {
    const deal = { commissionSnapshots: [
      { rev: 1, altorraRevenue: 1_000_000 },
      { rev: 3, altorraRevenue: 6_000_000 },
      { rev: 2, altorraRevenue: 4_000_000 },
    ] };
    expect(spec.latestCommissionSnapshot(deal).rev).toBe(3);
    expect(spec.altorraRevenueOf(deal)).toBe(6_000_000);
    expect(spec.altorraRevenueOf({})).toBe(0);
    expect(spec.altorraRevenueOf(null)).toBe(0);
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
