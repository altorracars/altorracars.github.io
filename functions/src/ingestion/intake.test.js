import { describe, it, expect } from 'vitest';
import { intakeToCanonical, normalizePhone, contactDedupKey } from './normalize.js';

describe('F40d — normalizePhone con default Colombia', () => {
  it('celular CO de 10 dígitos sin prefijo asume +57', () => {
    expect(normalizePhone('3001234567')).toBe('+573001234567');
    expect(normalizePhone('300 123 4567')).toBe('+573001234567');
  });
  it('el MISMO número escrito de tres formas produce la MISMA clave de dedup', () => {
    const a = contactDedupKey({ phone: '3001234567' });
    const b = contactDedupKey({ phone: '+57 300 123 4567' });
    const c = contactDedupKey({ phone: '300-123-4567', prefijoPais: '+57' });
    expect(a).toBe('phone:+573001234567');
    expect(b).toBe(a);
    expect(c).toBe(a);
  });
  it('NO toca números que no son celular CO de 10 dígitos', () => {
    expect(normalizePhone('6051234')).toBe('+6051234');       // fijo corto: intacto
    expect(normalizePhone('13051234567')).toBe('+13051234567'); // 11 dígitos: intacto
    expect(normalizePhone('+13051234567')).toBe('+13051234567'); // ya tiene +
  });
});

describe('F36 — intakeToCanonical (lead rápido)', () => {
  const BASE = {
    nombre: 'Walkin Pérez', telefono: '3009876543', fuente: 'walkin',
    medio: 'organico', consentVerbal: true, ownerId: 'uidAsesor',
    ownerName: 'Asesor Uno', createdAt: '2026-06-10T12:00:00.000Z',
  };

  it('produce contact+lead+activity con owner = quien registró (obligatorio)', () => {
    const { contact, lead, activity } = intakeToCanonical(BASE, 'i1', 'v1');
    expect(lead.ownerId).toBe('uidAsesor');
    expect(contact.ownerId).toBe('uidAsesor');
    expect(activity.ownerId).toBe('uidAsesor');
    expect(lead.status).toBe('nuevo');
    expect(lead.sourceIntakeId).toBe('i1');
  });

  it('sin owner LANZA (un lead sin dueño es un lead que nadie atiende)', () => {
    expect(() => intakeToCanonical({ ...BASE, ownerId: null }, 'i2', 'v1')).toThrow(/owner/i);
  });

  it('sin teléfono NI email lanza (no se puede deduplicar)', () => {
    expect(() => intakeToCanonical({ nombre: 'X', ownerId: 'u', fuente: 'llamada' }, 'i3', 'v1')).toThrow(/dedup|email|tel/i);
  });

  it('consentVerbal=true → consent expreso; false → doNotContact', () => {
    const si = intakeToCanonical(BASE, 'i4', 'v1');
    expect(si.contact.consent.whatsapp).toBe(true);
    expect(si.contact.doNotContact).toBe(false);
    const no = intakeToCanonical({ ...BASE, consentVerbal: false }, 'i5', 'v1');
    expect(no.contact.consent.email).toBe(false);
    expect(no.contact.doNotContact).toBe(true);
  });

  it('dedup por teléfono normalizado +57 — coincide con el de una solicitud web', () => {
    const { dedupKey } = intakeToCanonical(BASE, 'i6', 'v1');
    expect(dedupKey).toBe('phone:+573009876543');
  });

  it('atribución para ROI: fuente + organico/pauta + campaña en tags', () => {
    const { contact } = intakeToCanonical({ ...BASE, medio: 'pauta', campana: 'feria-junio' }, 'i7', 'v1');
    expect(contact.tags).toEqual(['walkin', 'pauta', 'feria-junio']);
  });

  it('fuente desconocida cae a "otro" (no rompe)', () => {
    const { lead } = intakeToCanonical({ ...BASE, fuente: 'paloma_mensajera' }, 'i8', 'v1');
    expect(lead.source).toBe('otro');
  });
});
