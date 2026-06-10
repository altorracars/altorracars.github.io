import { describe, it, expect } from 'vitest';
import { citaProjection, ESTADOS_ACTIVOS } from './onSolicitudWritten.js';

const SOL = {
  kind: 'cita', tipo: 'visita', nombre: 'Cliente Cita', vehiculo: 'Mazda 3 2021',
  estado: 'pendiente', fecha: '2026-06-20', hora: '10:00', _leadId: 'lead123',
  mensaje: 'quiero verlo el sábado',
};

describe('F16 — citaProjection (solicitud → activity de Agenda)', () => {
  it('proyecta con ID de lead, startAt en dueAt y estadoCita', () => {
    const p = citaProjection(SOL, 'sol1', '2026-06-20T15:00:00.000Z', '2026-06-10T12:00:00.000Z');
    expect(p.type).toBe('cita');
    expect(p.dueAt).toBe('2026-06-20T15:00:00.000Z');     // la Agenda consulta dueAt
    expect(p.startAt).toBe(p.dueAt);
    expect(p.relatedTo).toEqual({ type: 'lead', id: 'lead123', name: 'Cliente Cita' });
    expect(p.estadoCita).toBe('pendiente');
    expect(p.sourceSolicitudId).toBe('sol1');
    expect(p.sourceUpdatedAt).toBe('2026-06-10T12:00:00.000Z');
  });

  it('estados activos → open; cancelada/completada/no_show → closed (historial, no borrado)', () => {
    for (const e of ESTADOS_ACTIVOS) {
      expect(citaProjection({ ...SOL, estado: e }, 's', 'x', 'y').status).toBe('open');
    }
    for (const e of ['cancelada', 'completada', 'no_show', 'caducada']) {
      expect(citaProjection({ ...SOL, estado: e }, 's', 'x', 'y').status).toBe('closed');
    }
  });

  it('subject legible para el asesor (tipo + vehículo)', () => {
    expect(citaProjection(SOL, 's', 'x', 'y').subject).toBe('Cita: visita · Mazda 3 2021');
  });
});
