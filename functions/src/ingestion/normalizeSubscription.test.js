import { describe, it, expect } from 'vitest';
import { subscriptionToContact } from './normalize.js';

describe('subscriptionToContact', () => {
  it('dedup por email normalizado', () => {
    const { dedupKey } = subscriptionToContact({ email: '  Fan@Mail.COM ', consentGiven: true });
    expect(dedupKey).toBe('email:fan@mail.com');
  });

  it('mapea contacto subscriber (newsletter), sin lead', () => {
    const { contact } = subscriptionToContact({ email: 'fan@mail.com', consentGiven: true, createdAt: '2026-06-06T10:00:00.000Z' });
    expect(contact.source).toBe('newsletter');
    expect(contact.lifecycleStage).toBe('subscriber');
    expect(contact.tags).toContain('newsletter');
    expect(contact.createdAt).toBe('2026-06-06T10:00:00.000Z');
  });

  it('suscribirse = consentimiento EXPRESO de email', () => {
    const { contact } = subscriptionToContact({ email: 'fan@mail.com', consentGiven: true });
    expect(contact.consent.email).toBe(true);
    expect(contact.consent.source).toBe('newsletter');
    expect(contact.doNotContact).toBe(false);
  });

  it('sin consentGiven → consent.email false + doNotContact true', () => {
    const { contact } = subscriptionToContact({ email: 'fan@mail.com' });
    expect(contact.consent.email).toBe(false);
    expect(contact.doNotContact).toBe(true);
  });

  it('lanza si no hay email (no se puede deduplicar)', () => {
    expect(() => subscriptionToContact({ consentGiven: true })).toThrow();
  });
});
