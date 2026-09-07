import { describe, it, expect } from 'vitest';
import pkg from './contactGraph.js';

const { redactConsignanteInSnapshots, tenancyRefsContact, SUPPRESSED_OWNER_NAME } = pkg;

// §TODO-50 fase 2c — supresión ROL-AWARE del consignante (lóbulo 42 · LEGAL-07).
// El nombre del consignante se DESNORMALIZA en frozenTenancy.ownerDisplayName y
// sobrevive en los snapshots de comisión de los deals del COMPRADOR. La supresión
// Ley 1581 debe purgar SOLO el nombre (PII) conservando ownerRefId OPACO + economics
// (conservación mercantil Cód.Comercio art.60). Núcleo PURO, idempotente.

const cons = (ownerRefId, ownerDisplayName, extra = {}) => ({
  rev: 1, salePrice: 60000000, altorraRevenue: 6000000, vehicleId: 'veh_1',
  frozenTenancy: {
    type: 'CONSIGNA', ownerRefType: 'contact', ownerRefId, ownerDisplayName,
    economics: { method: 'SPREAD', baselineValue: 54000000, percentageRate: null, flatFee: null },
  },
  ...extra,
});

describe('tenancyRefsContact — sólo matchea CONSIGNA tipada (no colapsa con slug de aliado)', () => {
  it('contact + id correcto → true', () => {
    expect(tenancyRefsContact({ ownerRefType: 'contact', ownerRefId: 'c1' }, 'c1')).toBe(true);
  });
  it('id distinto → false', () => {
    expect(tenancyRefsContact({ ownerRefType: 'contact', ownerRefId: 'c2' }, 'c1')).toBe(false);
  });
  it('ALIADO (concesionario) con el MISMO string en ownerRefId → false (TIPADO)', () => {
    expect(tenancyRefsContact({ ownerRefType: 'concesionario', ownerRefId: 'c1' }, 'c1')).toBe(false);
  });
  it('tenencia nula/sin tipo → false', () => {
    expect(tenancyRefsContact(null, 'c1')).toBe(false);
    expect(tenancyRefsContact({ ownerRefId: 'c1' }, 'c1')).toBe(false);
  });
});

describe('redactConsignanteInSnapshots — purga el nombre, conserva ownerRefId + economics', () => {
  it('redacta ownerDisplayName del consignante objetivo y CONSERVA todo lo demás', () => {
    const arr = [cons('c1', 'Pedro Consignante')];
    const { snapshots, changed } = redactConsignanteInSnapshots(arr, 'c1');
    expect(changed).toBe(1);
    const ft = snapshots[0].frozenTenancy;
    expect(ft.ownerDisplayName).toBe(SUPPRESSED_OWNER_NAME); // PII purgada
    expect(ft.ownerRefId).toBe('c1');                        // ownerRefId OPACO conservado
    expect(ft.ownerRefType).toBe('contact');
    expect(ft.economics).toEqual(arr[0].frozenTenancy.economics); // economics intactas
    expect(snapshots[0].altorraRevenue).toBe(6000000);       // cifra comercial intacta
    expect(snapshots[0].salePrice).toBe(60000000);
  });

  it('NO muta el array de entrada (devuelve copia)', () => {
    const arr = [cons('c1', 'Pedro Consignante')];
    redactConsignanteInSnapshots(arr, 'c1');
    expect(arr[0].frozenTenancy.ownerDisplayName).toBe('Pedro Consignante'); // original intacto
  });

  it('idempotente: ya redactado → changed=0 (re-ejecutar es no-op) pero matched=1 (sigue siendo referencia)', () => {
    const arr = [cons('c1', SUPPRESSED_OWNER_NAME)];
    const r = redactConsignanteInSnapshots(arr, 'c1');
    expect(r.changed).toBe(0);
    expect(r.matched).toBe(1); // §Cond.4: la prueba art.12 cuenta la referencia aunque ya esté redactada
  });

  it('§Cond.4: matched cuenta TODAS las referencias (ya-sentinel + nuevas); changed solo el delta', () => {
    const arr = [cons('c1', SUPPRESSED_OWNER_NAME), cons('c1', 'Pedro'), cons('c2', 'Ana')];
    const r = redactConsignanteInSnapshots(arr, 'c1');
    expect(r.matched).toBe(2);  // las 2 de c1 (una ya-sentinel, una con PII)
    expect(r.changed).toBe(1);  // solo la que tenía PII se redactó este run
  });

  it('NO toca a OTRO consignante (ownerRefId distinto)', () => {
    const arr = [cons('c2', 'Otra Persona')];
    const { snapshots, changed } = redactConsignanteInSnapshots(arr, 'c1');
    expect(changed).toBe(0);
    expect(snapshots[0].frozenTenancy.ownerDisplayName).toBe('Otra Persona');
  });

  it('NO toca un ALIADO aunque su slug coincida con el contactId (TIPADO)', () => {
    const aliado = { rev: 1, frozenTenancy: { type: 'ALIADO', ownerRefType: 'concesionario', ownerRefId: 'c1', ownerDisplayName: 'Autollanos' } };
    expect(redactConsignanteInSnapshots([aliado], 'c1').changed).toBe(0);
  });

  it('consigna ANÓNIMA (ownerRefId null) → no matchea, sin cambios', () => {
    const anon = cons(null, null);
    expect(redactConsignanteInSnapshots([anon], 'c1').changed).toBe(0);
  });

  it('redacta TODAS las revs (array append-only) del mismo consignante', () => {
    const arr = [cons('c1', 'Pedro', { rev: 1 }), cons('c1', 'Pedro', { rev: 2, altorraRevenue: 7000000 })];
    const { snapshots, changed } = redactConsignanteInSnapshots(arr, 'c1');
    expect(changed).toBe(2);
    expect(snapshots[0].frozenTenancy.ownerDisplayName).toBe(SUPPRESSED_OWNER_NAME);
    expect(snapshots[1].frozenTenancy.ownerDisplayName).toBe(SUPPRESSED_OWNER_NAME);
    expect(snapshots[1].altorraRevenue).toBe(7000000); // cada economics intacta
  });

  it('mezcla: una rev del objetivo + una de otro → sólo redacta la del objetivo', () => {
    const arr = [cons('c1', 'Pedro'), cons('c2', 'Ana')];
    const { snapshots, changed } = redactConsignanteInSnapshots(arr, 'c1');
    expect(changed).toBe(1);
    expect(snapshots[0].frozenTenancy.ownerDisplayName).toBe(SUPPRESSED_OWNER_NAME);
    expect(snapshots[1].frozenTenancy.ownerDisplayName).toBe('Ana');
  });

  it('robusto: array ausente / no-array → changed=0', () => {
    expect(redactConsignanteInSnapshots(undefined, 'c1').changed).toBe(0);
    expect(redactConsignanteInSnapshots(null, 'c1').changed).toBe(0);
    expect(redactConsignanteInSnapshots('x', 'c1').changed).toBe(0);
  });
});
