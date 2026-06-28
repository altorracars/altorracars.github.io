import { describe, it, expect } from 'vitest';
import { normalizeCedula } from './consignanteAdmin.js';

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
