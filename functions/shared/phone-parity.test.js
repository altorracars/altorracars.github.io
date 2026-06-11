'use strict';

/**
 * PARIDAD cliente↔server de la normalización de identidad (F40d, ADR §185).
 * Si normalizePhone/sanitizeContactId divergen entre el portal (ESM) y las
 * functions (CJS), el dedup y la supresión 1581 fallan EN SILENCIO.
 */
import { describe, it, expect } from 'vitest';
import { normalizePhone as srvPhone, sanitizeContactId as srvSan, contactDedupKey } from '../src/ingestion/normalize.js';
import { dedupKeysFor } from '../src/crm/contactGraph.js';
import { normalizePhone as cliPhone, sanitizeContactId as cliSan, dedupKeysOf } from '../../admin-app/src/domain/phone.js';

const CASOS = [
  ['3001234567', undefined], ['300 123 4567', '+57'], ['+57 300 123 4567', null],
  ['573001234567', ''], ['(300)123-4567', '57'], ['', null], ['xx', null],
  ['6051234', '+57'], ['+1 305 555 0100', null],
];

describe('PARIDAD F40d — normalizePhone cliente == server', () => {
  it('mismo output en todos los casos', () => {
    for (const [tel, pref] of CASOS) {
      expect(cliPhone(tel, pref)).toBe(srvPhone(tel, pref));
    }
  });
  it('sanitizeContactId idéntico', () => {
    for (const k of ['email:juan.p@gmail.com', 'phone:+573001234567', 'email:Ñandú@x.co']) {
      expect(cliSan(k)).toBe(srvSan(k));
    }
  });
  it('dedupKeysOf (cliente) == dedupKeysFor (server) para el mismo contacto', () => {
    const persona = { email: 'Juan@Gmail.com ', phone: '300 123 4567', prefijoPais: '+57' };
    expect(dedupKeysOf(persona)).toEqual(dedupKeysFor(persona));
  });
  it('la clave canónica (email > phone) sigue siendo la misma del server', () => {
    expect(contactDedupKey({ email: 'a@b.co', phone: '3001234567' })).toBe('email:a@b.co');
    expect(contactDedupKey({ phone: '3001234567' })).toBe('phone:+573001234567');
  });
});
