import { describe, it, expect } from 'vitest';
import { clienteToContact, sanitizeContactId } from './normalize.js';

const CLIENTE = {
  uid: 'abc123',
  nombre: 'María Fernanda Gómez',
  email: '  MaFe@Mail.COM ',
  prefijo: '+57',
  telefono: '300 555 1234',
  cedula: '123456',
  creadoEn: '2026-06-01T10:00:00.000Z',
};

describe('clienteToContact', () => {
  it('dedup por email normalizado (lowercase + trim)', () => {
    const { dedupKey } = clienteToContact(CLIENTE, 'abc123', 'v1');
    expect(dedupKey).toBe('email:mafe@mail.com');
  });

  it('contactId determinístico y saneado (mismo que la ingestión de solicitudes)', () => {
    const { dedupKey, contactId } = clienteToContact(CLIENTE, 'abc123', 'v1');
    expect(contactId).toBe(sanitizeContactId(dedupKey));
    expect(contactId).toMatch(/^[a-z0-9_]+$/i);
  });

  it('mapea el contacto canónico: source cuenta, lifecycle registered, clienteUid', () => {
    const { contact } = clienteToContact(CLIENTE, 'abc123', 'v1');
    expect(contact.source).toBe('cuenta');
    expect(contact.lifecycleStage).toBe('registered');
    expect(contact.type).toBe('cliente');
    expect(contact.clienteUid).toBe('abc123');
    expect(contact.fullName).toBe('María Fernanda Gómez');
    expect(contact.phone).toBe('+573005551234');
    expect(contact.email).toBe('mafe@mail.com');
    expect(contact.tags).toContain('cuenta');
  });

  it('consentimiento CONSERVADOR (registro ≠ consentimiento expreso de marketing)', () => {
    const { contact } = clienteToContact(CLIENTE, 'abc123', 'v1');
    expect(contact.consent.email).toBe(false);
    expect(contact.consent.whatsapp).toBe(false);
    expect(contact.consent.source).toBe('cuenta');
    expect(contact.doNotContact).toBe(false); // contactable manualmente
  });

  it('usa teléfono como dedup si no hay email', () => {
    const { dedupKey } = clienteToContact({ telefono: '3005551234', prefijo: '+57' }, 'uid9', 'v1');
    expect(dedupKey).toBe('phone:+573005551234');
  });

  it('fallback a uid si no hay email ni teléfono', () => {
    const { dedupKey } = clienteToContact({ nombre: 'Sin contacto' }, 'uid9', 'v1');
    expect(dedupKey).toBe('uid:uid9');
  });

  it('preserva creadoEn como createdAt/lastActivityAt (first-seen)', () => {
    const { contact } = clienteToContact(CLIENTE, 'abc123', 'v1');
    expect(contact.createdAt).toBe('2026-06-01T10:00:00.000Z');
    expect(contact.lastActivityAt).toBe('2026-06-01T10:00:00.000Z');
    expect(contact._version).toBe(1);
  });
});
