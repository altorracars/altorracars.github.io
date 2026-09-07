import { describe, it, expect } from 'vitest';
import { normalizeCedula, buildHabeasData, HD_PURPOSES } from './consignanteAdmin.js';

// §TODO-50 — la cédula es la IDENTIDAD de negocio del consignante (no el teléfono).
// Pura y testeable; el resto del callable (transacción/dedup) se valida en emulador/live.
describe('§TODO-50 normalizeCedula', () => {
  it('extrae solo dígitos (5-12), tolera puntos/espacios del formato CO', () => {
    expect(normalizeCedula('43.118.902')).toBe('43118902');
    expect(normalizeCedula('1.090 456 789')).toBe('1090456789');
    expect(normalizeCedula('  73145  ')).toBe('73145');
  });
  it('rechaza inválidas (corta <5 / larga >12 / vacía / no numérica) → ""', () => {
    expect(normalizeCedula('123')).toBe('');
    expect(normalizeCedula('1234567890123')).toBe('');
    expect(normalizeCedula('')).toBe('');
    expect(normalizeCedula(null)).toBe('');
    expect(normalizeCedula('abc')).toBe('');
  });
});

// §TODO-50 fase 2 — Habeas Data por finalidad (Ley 1581 art. 9/12, LEGAL-07).
describe('§TODO-50 buildHabeasData (registro probatorio por finalidad)', () => {
  it('sin contractRef → null (additivo: no rompe el alta sin Habeas Data aún)', () => {
    expect(buildHabeasData(null, 'u1')).toBeNull();
    expect(buildHabeasData({ purposes: { gestionConsigna: true } }, 'u1')).toBeNull(); // sin contrato
  });
  it('con contractRef → registro completo, method=paper-contract, capturedBy', () => {
    const hd = buildHabeasData({ contractRef: 'CONS-001', purposes: { gestionConsigna: true, marketing: true } }, 'u9');
    expect(hd.granted).toBe(true);
    expect(hd.method).toBe('paper-contract');
    expect(hd.contractRef).toBe('CONS-001');
    expect(hd.policyVersion).toBe('v1-borrador'); // default hasta que el abogado fije la versión
    expect(hd.capturedBy).toBe('u9');
  });
  it('finalidades: SOLO las marcadas = true; el resto explícito false (no genérico)', () => {
    const hd = buildHabeasData({ contractRef: 'X', purposes: { gestionConsigna: true, publicacionAnuncio: true } }, 'u1');
    expect(hd.purposes).toEqual({ gestionConsigna: true, publicacionAnuncio: true, contactoComprador: false, marketing: false });
    expect(Object.keys(hd.purposes).sort()).toEqual([...HD_PURPOSES].sort());
  });
});
