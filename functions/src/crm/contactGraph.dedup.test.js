import { describe, it, expect } from 'vitest';
import pkg from './contactGraph.js';
const { dedupKeysFor } = pkg;

// §TODO-50 — regresión cazada en validación live: onContactWritten reconcilia el índice
// dedup con dedupKeysFor; si esta no incluye la cédula, BORRA la clave de cédula que
// crmUpsertConsignante escribió (desacople de contrato cross-trigger).
describe('§TODO-50 dedupKeysFor incluye la cédula del consignante', () => {
  it('consignante con cédula → su clave dedup de cédula + la de phone', () => {
    const keys = dedupKeysFor({ cedula: '88888888', phone: '+573009998877' });
    expect(keys).toContain('cedula_88888888');
    expect(keys).toContain('phone__573009998877');
  });
  it('contacto SIN cédula (lead normal) → sin clave de cédula (aditivo, no cambia)', () => {
    const keys = dedupKeysFor({ email: 'a@b.com', phone: '+573001112233' });
    expect(keys.some((k) => k.indexOf('cedula') === 0)).toBe(false);
  });
  it('cédula con puntos/espacios se normaliza a solo dígitos', () => {
    expect(dedupKeysFor({ cedula: '88.888.888' })).toContain('cedula_88888888');
  });
});
