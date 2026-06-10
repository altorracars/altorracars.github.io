'use strict';

import { describe, it, expect } from 'vitest';
import { citaSweepDecision, waDigits } from './citaSweep.js';

const NOW = '2026-07-10T15:00:00.000Z';
const at = (h) => new Date(new Date(NOW).getTime() + h * 3600e3).toISOString();
const cita = (over) => ({ kind: 'cita', estado: 'confirmada', startAt: at(30), ...over });

describe('F20 — citaSweepDecision (pura, idempotente por flags)', () => {
  it('confirmada a 30h sin flag → reminder24h; con flag → nada', () => {
    expect(citaSweepDecision(cita({}), NOW)).toEqual(['reminder24h']);
    expect(citaSweepDecision(cita({ reminder24hSentAt: 'x' }), NOW)).toEqual([]);
  });
  it('bordes de la ventana 24-48h: 24h NO (≤24 va a confirmDia después), 48h SÍ, 49h NO', () => {
    expect(citaSweepDecision(cita({ startAt: at(24) }), NOW)).toEqual([]);
    expect(citaSweepDecision(cita({ startAt: at(48) }), NOW)).toEqual(['reminder24h']);
    expect(citaSweepDecision(cita({ startAt: at(49) }), NOW)).toEqual([]);
  });
  it('confirmada a ≤3h → confirm_dia (una sola vez)', () => {
    expect(citaSweepDecision(cita({ startAt: at(2) }), NOW)).toEqual(['confirm_dia']);
    expect(citaSweepDecision(cita({ startAt: at(2), confirmDiaSentAt: 'x' }), NOW)).toEqual([]);
  });
  it('HOLD-EXPIRY: pendiente a ≤3h (o ya pasada) → hold_expire; a 30h → reminder24h', () => {
    expect(citaSweepDecision(cita({ estado: 'pendiente', startAt: at(2.5) }), NOW)).toEqual(['hold_expire']);
    expect(citaSweepDecision(cita({ estado: 'pendiente', startAt: at(-1) }), NOW)).toEqual(['hold_expire']);
    expect(citaSweepDecision(cita({ estado: 'pendiente', startAt: at(30) }), NOW)).toEqual(['reminder24h']);
    expect(citaSweepDecision(cita({ estado: 'pendiente', startAt: at(10) }), NOW)).toEqual([]);
  });
  it('GUARD corto aviso (review §184): pendiente creada hace <3h NO caduca; hace ≥3h SÍ', () => {
    expect(citaSweepDecision(cita({ estado: 'pendiente', startAt: at(2), createdAt: at(-1) }), NOW)).toEqual([]);
    expect(citaSweepDecision(cita({ estado: 'pendiente', startAt: at(2), createdAt: at(-4) }), NOW)).toEqual(['hold_expire']);
  });
  it('cerradas, _migration, _suppressed, sin startAt o no-cita → nada', () => {
    expect(citaSweepDecision(cita({ estado: 'cancelada', startAt: at(2) }), NOW)).toEqual([]);
    expect(citaSweepDecision(cita({ _migration: true, startAt: at(30) }), NOW)).toEqual([]);
    expect(citaSweepDecision(cita({ _suppressed: true, startAt: at(30) }), NOW)).toEqual([]);
    expect(citaSweepDecision(cita({ startAt: null }), NOW)).toEqual([]);
    expect(citaSweepDecision({ kind: 'solicitud', startAt: at(2) }, NOW)).toEqual([]);
  });
  it('confirmada que entra a la vez en 24-48h NO mezcla confirm_dia (ventanas disjuntas)', () => {
    expect(citaSweepDecision(cita({ startAt: at(25) }), NOW)).toEqual(['reminder24h']);
  });
});

describe('F20 — waDigits (wa.me del cliente)', () => {
  it('celular CO de 10 dígitos → +57 implícito', () => {
    expect(waDigits({ whatsapp: '300 111 2233' })).toBe('573001112233');
  });
  it('con prefijo explícito y ya-57 no duplica', () => {
    expect(waDigits({ telefono: '3001112233', prefijoPais: '+57' })).toBe('573001112233');
    expect(waDigits({ whatsapp: '573001112233' })).toBe('573001112233');
  });
  it('sin teléfono → null', () => {
    expect(waDigits({})).toBeNull();
  });
});
