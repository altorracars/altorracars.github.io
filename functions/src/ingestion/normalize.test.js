import { describe, it, expect } from 'vitest';
import { normalizePhone, contactDedupKey, mapConsent, normalizeSolicitud } from './normalize.js';

describe('contactDedupKey', () => {
  it('prioriza email normalizado (lowercase + trim)', () => {
    expect(contactDedupKey({ email: '  Juan@Mail.COM ', phone: '300 555 1234' }))
      .toBe('email:juan@mail.com');
  });
  it('usa teléfono E.164 si no hay email', () => {
    expect(contactDedupKey({ email: '', phone: '300 555 1234', prefijoPais: '+57' }))
      .toBe('phone:+573005551234');
  });
  it('quita caracteres no numéricos del teléfono y respeta el prefijo', () => {
    expect(contactDedupKey({ phone: '(300) 555-1234', prefijoPais: '+57' }))
      .toBe('phone:+573005551234');
  });
  it('no duplica el prefijo si el teléfono ya lo trae', () => {
    expect(contactDedupKey({ phone: '+57 300 555 1234', prefijoPais: '+57' }))
      .toBe('phone:+573005551234');
  });
  it('devuelve null si no hay email ni teléfono', () => {
    expect(contactDedupKey({ email: '', phone: '' })).toBeNull();
  });
});

describe('mapConsent', () => {
  it('marca consent expreso cuando consentGiven === true', () => {
    const c = mapConsent({ consentGiven: true, email: 'a@b.com', origen: 'contacto' }, 'v1');
    expect(c.email).toBe(true);
    expect(c.whatsapp).toBe(true);
    expect(c.calls).toBe(true);
    expect(c.policyVersion).toBe('v1');
    expect(c.source).toBe('contacto');
    expect(typeof c.askedAt).toBe('string');
  });
  it('deja consent en false si no hubo autorización expresa', () => {
    const c = mapConsent({ email: 'a@b.com', origen: 'contacto' }, 'v1');
    expect(c.email).toBe(false);
    expect(c.whatsapp).toBe(false);
    expect(c.calls).toBe(false);
  });
});

const baseSol = {
  nombre: 'Juan Pérez', email: 'Juan@Mail.com', telefono: '3005551234', prefijoPais: '+57',
  kind: 'lead', tipo: 'consulta_general', origen: 'contacto',
  vehiculoId: 'veh-123', createdAt: '2026-06-05T10:00:00Z', consentGiven: true,
};

describe('normalizeSolicitud', () => {
  it('produce contact/lead/activity con la clave de dedup correcta', () => {
    const out = normalizeSolicitud(baseSol, 'sol-1', 'v1');
    expect(out.dedupKey).toBe('email:juan@mail.com');
    expect(out.contact.fullName).toBe('Juan Pérez');
    expect(out.contact.email).toBe('juan@mail.com');
    expect(out.contact.lifecycleStage).toBe('lead');
    expect(out.contact.consent.email).toBe(true);
  });
  it('el lead referencia la solicitud origen y el vehículo de interés', () => {
    const out = normalizeSolicitud(baseSol, 'sol-1', 'v1');
    expect(out.lead.sourceSolicitudId).toBe('sol-1');
    expect(out.lead.vehicleOfInterestId).toBe('veh-123');
    expect(out.lead.status).toBe('nuevo');
    expect(out.lead.source).toBe('contacto');
  });
  it('la activity es de tipo inbound y referencia al lead por nombre', () => {
    const out = normalizeSolicitud(baseSol, 'sol-1', 'v1');
    expect(out.activity.type).toBe('solicitud_inbound');
    expect(out.activity.direction).toBe('inbound');
    expect(out.activity.relatedTo.type).toBe('lead');
    expect(out.activity.relatedTo.name).toBe('Juan Pérez');
  });
  it('lanza si la solicitud no tiene email, teléfono NI sessionId (no se puede deduplicar)', () => {
    expect(() => normalizeSolicitud({ nombre: 'X' }, 'sol-2', 'v1')).toThrow(/dedup/i);
  });

  // ── F-5 (§4): cierre de fuga — chat anónimo abandonado ──
  it('F-5: chat anónimo (sin email/tel pero CON sessionId) → dedupKey session: + lead "Anónimo" + tag', () => {
    const out = normalizeSolicitud({ sessionId: 'cnc_abc123', origen: 'concierge', comentarios: 'me interesa el Mazda' }, 'sol-anon', 'v1');
    expect(out.dedupKey).toBe('session:cnc_abc123');
    expect(out.contact.fullName).toBe('Anónimo');
    expect(out.lead.fullName).toBe('Anónimo');
    expect(out.contact.type).toBe('lead');
    expect(out.contact.tags).toContain('chat-anonimo');
  });
  it('F-5: respeta el nombre si el chat anónimo lo capturó (sigue marcando el tag)', () => {
    const out = normalizeSolicitud({ sessionId: 'cnc_x', nombre: 'Ana' }, 'sol-anon2', 'v1');
    expect(out.dedupKey).toBe('session:cnc_x');
    expect(out.contact.fullName).toBe('Ana');
    expect(out.contact.tags).toContain('chat-anonimo');
  });
  it('F-5 no-regresión: email/teléfono MANDAN sobre sessionId (no se marca anónimo)', () => {
    const out = normalizeSolicitud({ ...baseSol, sessionId: 'cnc_y' }, 'sol-5', 'v1');
    expect(out.dedupKey).toBe('email:juan@mail.com');
    expect(out.contact.fullName).toBe('Juan Pérez');
    expect(out.contact.tags).not.toContain('chat-anonimo');
  });
});

describe('normalizePhone (directo)', () => {
  it('devuelve "" si no hay dígitos', () => {
    expect(normalizePhone('---', '+57')).toBe('');
  });
  it('antepone el prefijo cuando el número no lo trae', () => {
    expect(normalizePhone('3005551234', '+57')).toBe('+573005551234');
  });
  it('no duplica el prefijo si el número ya empieza con +', () => {
    expect(normalizePhone('+573005551234', '+57')).toBe('+573005551234');
  });
});

describe('mapConsent (rutas de source/policyVersion)', () => {
  it('source cae a "desconocido" si no hay origen ni source.page', () => {
    expect(mapConsent({ consentGiven: false }, 'v1').source).toBe('desconocido');
  });
  it('source usa source.page si no hay origen', () => {
    expect(mapConsent({ source: { page: 'busqueda' } }, 'v1').source).toBe('busqueda');
  });
  it('policyVersion cae a "v1" por defecto', () => {
    expect(mapConsent({}, undefined).policyVersion).toBe('v1');
  });
});

describe('normalizeSolicitud (consentimiento + fallbacks)', () => {
  it('sin consentimiento expreso: consent en false y doNotContact true', () => {
    const out = normalizeSolicitud({ ...baseSol, consentGiven: false }, 'sol-3', 'v1');
    expect(out.contact.consent.email).toBe(false);
    expect(out.contact.doNotContact).toBe(true);
  });
  it('con consentimiento expreso: doNotContact false', () => {
    const out = normalizeSolicitud(baseSol, 'sol-1', 'v1');
    expect(out.contact.doNotContact).toBe(false);
  });
  it('el subject del activity combina kind y tipo', () => {
    const out = normalizeSolicitud(baseSol, 'sol-1', 'v1');
    expect(out.activity.subject).toBe('Nueva lead: consulta_general');
  });
  it('createdAt cae a ISO actual si la solicitud no lo trae', () => {
    const { createdAt, ...rest } = baseSol;
    const out = normalizeSolicitud(rest, 'sol-4', 'v1');
    expect(typeof out.contact.createdAt).toBe('string');
    expect(out.lead.createdAt).toBe(out.contact.createdAt);
  });
});
