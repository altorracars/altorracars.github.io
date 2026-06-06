'use strict';

/**
 * Normaliza un teléfono a E.164 aproximado: dígitos + prefijo de país.
 */
function normalizePhone(phone, prefijoPais) {
  const raw = String(phone || '').trim();
  if (!raw) return '';
  const hadPlus = raw.replace(/[^\d+]/g, '').startsWith('+');
  let digits = raw.replace(/\D/g, '');
  if (!digits) return '';
  const prefixDigits = String(prefijoPais || '').replace(/\D/g, '');
  if (prefixDigits && !hadPlus && !digits.startsWith(prefixDigits)) {
    digits = prefixDigits + digits;
  }
  return '+' + digits;
}

/**
 * Clave canónica para deduplicar una persona: email > teléfono.
 */
function contactDedupKey(person) {
  const email = String(person.email || '').trim().toLowerCase();
  if (email) return 'email:' + email;
  const phone = normalizePhone(person.phone || person.telefono, person.prefijoPais);
  if (phone) return 'phone:' + phone;
  return null;
}

/**
 * Construye el objeto consent (Ley 1581) desde la solicitud.
 * SOLO true si el formulario capturó autorización expresa (consentGiven === true).
 */
function mapConsent(sol, policyVersion) {
  const given = sol.consentGiven === true;
  return {
    email: given,
    whatsapp: given,
    calls: given,
    askedAt: new Date().toISOString(),
    source: sol.origen || (sol.source && sol.source.page) || 'desconocido',
    policyVersion: policyVersion || 'v1',
  };
}

/**
 * Traduce un documento `solicitudes` al modelo canónico del CRM.
 * Devuelve {dedupKey, contact, lead, activity}; NO toca Firestore (lógica pura).
 */
function normalizeSolicitud(sol, solId, policyVersion) {
  const dedupKey = contactDedupKey({
    email: sol.email, phone: sol.telefono, prefijoPais: sol.prefijoPais,
  });
  if (!dedupKey) {
    throw new Error('No se puede deduplicar: solicitud sin email ni teléfono (' + solId + ')');
  }
  const email = String(sol.email || '').trim().toLowerCase();
  const phone = normalizePhone(sol.telefono, sol.prefijoPais);
  const fullName = String(sol.nombre || '').trim() || 'Sin nombre';
  const consent = mapConsent(sol, policyVersion);
  const source = sol.origen || (sol.source && sol.source.page) || 'web';
  const createdAt = sol.createdAt || new Date().toISOString();

  const contact = {
    fullName, email, phone, type: 'lead', source,
    ownerId: null, ownerName: null, score: 0, rating: 'cold', lifecycleStage: 'lead',
    tags: Array.isArray(sol.tags) ? sol.tags.slice() : [],
    consent, doNotContact: !consent.email, clienteUid: sol.userId || null,
    lastActivityAt: createdAt, createdAt, updatedAt: createdAt, _version: 1,
  };

  const lead = {
    fullName, email, phone, source, sourceDetail: sol.tipo || null,
    vehicleOfInterestId: sol.vehiculoId || null,
    status: 'nuevo', rating: 'cold', score: 0, ownerId: null,
    slaDueAt: sol.slaDeadline || null,
    consent, sourceSolicitudId: solId, convertedTo: null,
    lastActivityAt: createdAt, createdAt, updatedAt: createdAt, _version: 1,
  };

  const activity = {
    type: 'solicitud_inbound',
    subject: 'Nueva ' + (sol.kind || 'solicitud') + ': ' + (sol.tipo || 'general'),
    body: String(sol.comentarios || sol.mensaje || ''),
    status: 'open', direction: 'inbound',
    relatedTo: { type: 'lead', id: null, name: fullName },
    ownerId: null, createdAt, _version: 1,
  };

  return { dedupKey, contact, lead, activity };
}

/**
 * ID de documento de contacto determinístico desde una dedupKey
 * (misma sanitización que usa onSolicitudCreated → mismo contacto).
 */
function sanitizeContactId(dedupKey) {
  return String(dedupKey || '').replace(/[^a-z0-9]/gi, '_').slice(0, 480);
}

/**
 * Traduce un documento `clientes/{uid}` (registro de cuenta pública) al
 * contacto canónico. NO crea lead (registrarse ≠ intención de compra).
 * Consentimiento CONSERVADOR: registrarse no es consentimiento EXPRESO de
 * marketing (Ley 1581) → consent.email=false; el asesor lo gestiona. El
 * contacto sí queda contactable manualmente (doNotContact=false).
 * Lógica pura; NO toca Firestore.
 */
function clienteToContact(cliente, uid, policyVersion) {
  const c = cliente || {};
  const email = String(c.email || '').trim().toLowerCase();
  const phone = normalizePhone(c.telefono, c.prefijo);
  const dedupKey = email ? 'email:' + email : (phone ? 'phone:' + phone : 'uid:' + uid);
  const createdAt = c.creadoEn || new Date().toISOString();
  const now = new Date().toISOString();
  const consent = {
    email: false, whatsapp: false, calls: false,
    askedAt: now, source: 'cuenta', policyVersion: policyVersion || 'v1',
  };
  const contact = {
    fullName: String(c.nombre || '').trim() || 'Sin nombre',
    email, phone, type: 'cliente', source: 'cuenta',
    ownerId: null, ownerName: null, score: 0, rating: 'cold', lifecycleStage: 'registered',
    tags: ['cuenta'], consent, doNotContact: false, clienteUid: uid,
    lastActivityAt: createdAt, createdAt, updatedAt: now, _version: 1,
  };
  return { dedupKey, contactId: sanitizeContactId(dedupKey), contact };
}

/**
 * Traduce un documento `subscriptions/{id}` (newsletter) al contacto canónico.
 * Suscribirse SÍ es consentimiento EXPRESO de email (Ley 1581) → consent.email
 * = consentGiven. NO crea lead (un suscriptor no es intención de compra).
 * Lógica pura; NO toca Firestore.
 */
function subscriptionToContact(sub, policyVersion) {
  const s = sub || {};
  const email = String(s.email || '').trim().toLowerCase();
  if (!email) throw new Error('Suscripción sin email');
  const dedupKey = 'email:' + email;
  const given = s.consentGiven === true;
  const createdAt = s.createdAt || new Date().toISOString();
  const now = new Date().toISOString();
  const consent = {
    email: given, whatsapp: false, calls: false,
    askedAt: now, source: 'newsletter', policyVersion: policyVersion || 'v1',
  };
  const contact = {
    fullName: 'Suscriptor', email, phone: '', type: 'lead', source: 'newsletter',
    ownerId: null, ownerName: null, score: 0, rating: 'cold', lifecycleStage: 'subscriber',
    tags: ['newsletter'], consent, doNotContact: !given, clienteUid: null,
    lastActivityAt: createdAt, createdAt, updatedAt: now, _version: 1,
  };
  return { dedupKey, contactId: sanitizeContactId(dedupKey), contact };
}

module.exports = {
  normalizePhone, contactDedupKey, mapConsent, normalizeSolicitud,
  sanitizeContactId, clienteToContact, subscriptionToContact,
};
