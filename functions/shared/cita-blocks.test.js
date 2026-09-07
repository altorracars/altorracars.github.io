'use strict';

import { describe, it, expect } from 'vitest';
import {
  blocksFor, advisorOverrideFor, validateSlot, bogotaDayKey, nextMorningISO,
} from './cita-blocks.js';

describe('cita-blocks — bloques de 30 min (F19 C.3)', () => {
  it('60 min → 2 bloques contiguos', () => {
    expect(blocksFor('10:00', 60)).toEqual(['10:00', '10:30']);
  });
  it('30 min → 1 bloque; 90 min → 3; 45 → 2 (ceil)', () => {
    expect(blocksFor('10:30', 30)).toEqual(['10:30']);
    expect(blocksFor('14:00', 90)).toEqual(['14:00', '14:30', '15:00']);
    expect(blocksFor('09:00', 45)).toEqual(['09:00', '09:30']);
  });
  it('duración por defecto = 60; hora inválida → []', () => {
    expect(blocksFor('16:00')).toEqual(['16:00', '16:30']);
    expect(blocksFor('xx', 60)).toEqual([]);
  });
});

describe('cita-blocks — overrides por asesor (F21.5 C.6)', () => {
  const ov = { u1: { name: 'Juan', from: '2026-07-01', to: '2026-07-15', reason: 'vacaciones' } };
  it('dentro del rango (bordes inclusive) → override', () => {
    expect(advisorOverrideFor(ov, 'u1', '2026-07-01')).toBeTruthy();
    expect(advisorOverrideFor(ov, 'u1', '2026-07-15')).toBeTruthy();
    expect(advisorOverrideFor(ov, 'u1', '2026-07-08').reason).toBe('vacaciones');
  });
  it('fuera del rango / otro asesor / sin overrides → null', () => {
    expect(advisorOverrideFor(ov, 'u1', '2026-07-16')).toBeNull();
    expect(advisorOverrideFor(ov, 'u2', '2026-07-08')).toBeNull();
    expect(advisorOverrideFor(null, 'u1', '2026-07-08')).toBeNull();
  });
});

describe('cita-blocks — validateSlot contra el SSoT', () => {
  const av = {
    days: [1, 2, 3, 4, 5, 6], startHour: 9, endHour: 17, interval: 60,
    blockedDates: ['2026-07-20'], blockedDateLabels: { '2026-07-20': 'Independencia' },
    blockedHours: { '2026-07-21': ['10:00'] },
  };
  const HOY = '2026-07-01';
  it('slot válido pasa', () => {
    expect(validateSlot(av, '2026-07-21', '09:30', HOY).ok).toBe(true);
  });
  it('fecha bloqueada → razón con el motivo', () => {
    const r = validateSlot(av, '2026-07-20', '10:00', HOY);
    expect(r.ok).toBe(false);
    expect(r.reason).toContain('Independencia');
  });
  it('domingo (día no laboral) rechazado', () => {
    // 2026-07-19 es domingo
    expect(validateSlot(av, '2026-07-19', '10:00', HOY).ok).toBe(false);
  });
  it('fuera de horario y fuera de grilla de 30 rechazados', () => {
    expect(validateSlot(av, '2026-07-21', '08:00', HOY).ok).toBe(false);
    expect(validateSlot(av, '2026-07-21', '17:00', HOY).ok).toBe(false);
    expect(validateSlot(av, '2026-07-21', '10:15', HOY).ok).toBe(false);
  });
  it('hora bloqueada puntual y fecha pasada rechazadas', () => {
    expect(validateSlot(av, '2026-07-21', '10:00', HOY).ok).toBe(false);
    expect(validateSlot(av, '2026-06-30', '10:00', HOY).ok).toBe(false);
  });
});

describe('cita-blocks — helpers de tiempo Bogotá', () => {
  it('bogotaDayKey: 03:00Z = 22:00 del día ANTERIOR en Bogotá', () => {
    expect(bogotaDayKey('2026-07-02T03:00:00Z')).toBe('2026-07-01');
  });
  it('nextMorningISO: mañana 9am Bogotá = 14:00Z', () => {
    expect(nextMorningISO('2026-07-01T15:00:00Z')).toBe('2026-07-02T14:00:00.000Z');
  });
});
