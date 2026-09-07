/**
 * F30/F35 — TEST DE PARIDAD (ADR §181): la spec única (crm-spec.js, CJS,
 * la consumen triggers/Rules) y el espejo del portal (admin-app/src/domain,
 * ESM, lo consume la UI) NO PUEDEN divergir. Si cambias enums/gates/matriz
 * en un lado, este test te obliga a cambiar el otro EN EL MISMO PASE.
 */
import { describe, it, expect } from 'vitest';
import spec from './crm-spec.js';
import {
  PIPELINE_STAGES, LOST_STAGE, STAGE_GATES, LOST_REASONS, dealTransition,
  POSTVENTA_CHECKLIST, detectCollisions, dealLiquidable,
  tenancyGroupKey, tenancyRefTypeOf,
} from '../../admin-app/src/domain/pipeline.js';
import { LEAD_STATUSES, DISCARD_REASONS } from '../../admin-app/src/domain/classify.js';
import { buildTenancy } from '../../admin-app/src/domain/vehicle.js';

describe('PARIDAD spec ↔ portal — estados del lead', () => {
  it('mismos ids en el mismo orden', () => {
    expect(LEAD_STATUSES.map((s) => s.id)).toEqual(spec.LEAD_STATUSES);
  });
  it('mismas razones de descarte', () => {
    expect(DISCARD_REASONS.map((r) => r.id)).toEqual(spec.DISCARD_REASONS);
  });
});

describe('PARIDAD spec ↔ portal — etapas del deal', () => {
  it('mismos ids, orden y probabilidades', () => {
    expect(PIPELINE_STAGES.map((s) => ({ id: s.id, prob: s.prob })))
      .toEqual(spec.DEAL_STAGES.map((s) => ({ id: s.id, prob: s.prob })));
    expect(LOST_STAGE.id).toBe(spec.DEAL_LOST.id);
  });
  it('mismos gates por etapa', () => {
    expect(STAGE_GATES).toEqual(spec.STAGE_GATES);
  });
  it('mismas razones de pérdida', () => {
    expect(LOST_REASONS.map((r) => r.id)).toEqual(spec.LOST_REASONS);
  });
});

describe('PARIDAD spec ↔ portal — E4 (F10/F26/F42)', () => {
  it('mismo checklist post-venta (ids, labels, dueDays)', () => {
    expect(POSTVENTA_CHECKLIST).toEqual(spec.POSTVENTA_CHECKLIST);
  });
  it('detectCollisions devuelve LO MISMO en ambos lados', () => {
    const deals = [
      { id: 'a', status: 'open', vehicleId: 'v1' },
      { id: 'b', status: 'open', vehicleId: 'v1' },
      { id: 'c', status: 'won', vehicleId: 'v1' },
      { id: 'd', status: 'open', vehicleId: 'v2' },
      { id: 'e', status: 'open', vehicleId: 'v2' },
      { id: 'f', status: 'open' },
    ];
    expect(detectCollisions(deals)).toEqual(spec.detectCollisions(deals));
  });
  it('dealLiquidable devuelve LO MISMO en ambos lados (matriz de casos)', () => {
    const cases = [
      { status: 'won', postventa: { entrega: true, traspaso_runt: true, tramites: true } },
      { status: 'won', postventa: { entrega: true, traspaso_runt: false, tramites: true } },
      { status: 'won' },
      { status: 'open', postventa: { entrega: true, traspaso_runt: true, tramites: true } },
      null,
    ];
    for (const c of cases) {
      expect({ c, r: dealLiquidable(c) }).toEqual({ c, r: spec.dealLiquidable(c) });
    }
  });
});

describe('PARIDAD spec ↔ portal — matriz de transiciones (muestreo exhaustivo)', () => {
  const ALL = [...spec.DEAL_STAGES.map((s) => s.id), spec.DEAL_LOST.id];
  it('dealTransition devuelve LO MISMO en ambos lados para TODO par (from,to)', () => {
    for (const from of ALL) {
      for (const to of ALL) {
        const a = spec.dealTransition(from, to);
        const b = dealTransition(from, to);
        expect({ from, to, r: b }).toEqual({ from, to, r: a });
      }
    }
  });
});

describe('PARIDAD spec ↔ portal — §TODO-50 agrupación de comisiones', () => {
  it('tenancyRefTypeOf / tenancyGroupKey devuelven LO MISMO en ambos lados', () => {
    for (const type of ['PROPIO', 'ALIADO', 'CONSIGNA', 'EXTERNO', 'XXX']) {
      expect(tenancyRefTypeOf(type)).toBe(spec.tenancyRefTypeOf(type));
    }
    const cases = [
      { type: 'ALIADO', ownerRefId: 'usados-de-la-costa' },
      { type: 'CONSIGNA', ownerRefId: 'k9x', ownerRefType: 'contact' },
      { type: 'CONSIGNA', ownerRefId: null },
      { type: 'CONSIGNA', ownerRefId: 'old' }, // sin ownerRefType → derivado
      { type: 'PROPIO' }, { type: 'EXTERNO' }, null,
    ];
    for (const ft of cases) {
      expect({ ft, k: tenancyGroupKey(ft) }).toEqual({ ft, k: spec.tenancyGroupKey(ft) });
    }
  });

  it('camino del dato: buildTenancy → normalizeTenancy → tenancyGroupKey (consigna identificada/anónima/aliado)', () => {
    // CONSIGNA identificada: el consignante = contact → 'contact:id', nombre desnormalizado
    const ident = buildTenancy({ tenancyMethod: 'MANUAL', consignante: { id: 'k9x', nombre: 'María Restrepo' } }, '_particular');
    expect(ident.type).toBe('CONSIGNA');
    expect(ident.ownerRefType).toBe('contact');
    expect(ident.ownerDisplayName).toBe('María Restrepo');
    expect(spec.tenancyGroupKey(spec.normalizeTenancy(ident))).toBe('contact:k9x');

    // CONSIGNA anónima (sin consignante) → cubo "Sin identificar", NO fosiliza PII
    const anon = buildTenancy({ tenancyMethod: 'MANUAL' }, '_particular');
    expect(anon.ownerRefId).toBeNull();
    expect(spec.tenancyGroupKey(spec.normalizeTenancy(anon))).toBe('consigna:_unidentified');

    // ALIADO → 'concesionario:slug'
    const aliado = buildTenancy({ tenancyMethod: 'SPREAD', tenancyBaseline: '54000000', concesionarioNombre: 'Usados de la Costa' }, 'usados-de-la-costa');
    expect(aliado.ownerRefType).toBe('concesionario');
    expect(spec.tenancyGroupKey(spec.normalizeTenancy(aliado))).toBe('concesionario:usados-de-la-costa');
    expect(spec.normalizeTenancy(aliado).economics.baselineValue).toBe(54000000);
  });
});
