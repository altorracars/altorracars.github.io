'use strict';

/**
 * Normaliza un teléfono a E.164 aproximado: dígitos + prefijo de país.
 * F40d (ADR §178): sin prefijo explícito, un celular colombiano (10 dígitos
 * empezando en 3) asume +57 — sin esto el MISMO número escrito de dos formas
 * ("3001234567" vs "+57 300 123 4567") produce DOS contactos y la supresión
 * Ley 1581 falla en silencio. Regla conservadora: solo aplica a esa forma.
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
  } else if (!prefixDigits && !hadPlus && digits.length === 10 && digits.startsWith('3')) {
    digits = '57' + digits; // celular CO sin prefijo → +57
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
  let dedupKey = contactDedupKey({
    email: sol.email, phone: sol.telefono, prefijoPais: sol.prefijoPais,
  });
  // F-5 (§4 + plan §9.B.4): un chat concierge ABANDONADO (soft-lead sin email
  // ni teléfono pero CON sessionId) NO se pierde en `failedIngestions` — se
  // ingiere como lead "Anónimo" usando `session:<sessionId>` como clave de
  // dedup (determinista → re-ingerir el MISMO chat = MISMO contacto, cero
  // duplicado; ingestLeadTransaction ya lo soporta: wantedKeys=[] → contacto
  // por fallbackId, sin entradas en el índice email/teléfono). El fallback
  // vive SOLO aquí (solicitudes web): lead_intake/cliente exigen contacto real
  // (un lead rápido sin teléfono es error de dato → debe seguir fallando).
  const anon = !dedupKey;
  if (anon && sol.sessionId) dedupKey = 'session:' + String(sol.sessionId).trim();
  if (!dedupKey) {
    throw new Error('No se puede deduplicar: solicitud sin email, teléfono ni sessionId (' + solId + ')');
  }
  const email = String(sol.email || '').trim().toLowerCase();
  const phone = normalizePhone(sol.telefono, sol.prefijoPais);
  const fullName = String(sol.nombre || '').trim() || (anon ? 'Anónimo' : 'Sin nombre');
  const consent = mapConsent(sol, policyVersion);
  const source = sol.origen || (sol.source && sol.source.page) || 'web';
  const createdAt = sol.createdAt || new Date().toISOString();
  // Lead recuperado de un chat anónimo: tag para que el asesor lo reconozca
  // (es señal de venta a recuperar, no un contacto identificado).
  const tags = Array.isArray(sol.tags) ? sol.tags.slice() : [];
  if (anon && !tags.includes('chat-anonimo')) tags.push('chat-anonimo');

  const contact = {
    fullName, email, phone, type: 'lead', source,
    ownerId: null, ownerName: null, score: 0, rating: 'cold', lifecycleStage: 'lead',
    tags,
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

/**
 * F36 (ADR §178, E1a) — Traduce un documento `lead_intake/{id}` (lead rápido:
 * WhatsApp directo / walk-in / llamada / referido, registrado por un asesor
 * en <30s) al modelo canónico. Owner = quien lo registró (OBLIGATORIO).
 * Consentimiento: `consentVerbal === true` = autorización verbal registrada
 * leyendo el guion en pantalla (texto final lo valida P4) → consent expreso.
 * Lógica pura; NO toca Firestore.
 */
const INTAKE_SOURCES = ['whatsapp', 'walkin', 'llamada', 'referido'];

function intakeToCanonical(intake, intakeId, policyVersion) {
  const it = intake || {};
  const dedupKey = contactDedupKey({ email: it.email, phone: it.telefono });
  if (!dedupKey) {
    throw new Error('Lead rápido sin email ni teléfono (' + intakeId + ')');
  }
  if (!it.ownerId) {
    throw new Error('Lead rápido sin owner (' + intakeId + ') — owner es obligatorio');
  }
  const email = String(it.email || '').trim().toLowerCase();
  const phone = normalizePhone(it.telefono);
  const fullName = String(it.nombre || '').trim() || 'Sin nombre';
  const source = INTAKE_SOURCES.includes(it.fuente) ? it.fuente : 'otro';
  const createdAt = it.createdAt || new Date().toISOString();
  const now = new Date().toISOString();
  const given = it.consentVerbal === true;
  const consent = {
    email: given, whatsapp: given, calls: given,
    askedAt: now, source: 'lead_rapido', policyVersion: policyVersion || 'v1',
  };
  const tags = [source, it.medio === 'pauta' ? 'pauta' : 'organico']
    .concat(it.campana ? [String(it.campana)] : []);

  const contact = {
    fullName, email, phone, type: 'lead', source,
    ownerId: it.ownerId, ownerName: it.ownerName || null,
    score: 0, rating: 'cold', lifecycleStage: 'lead',
    tags, consent, doNotContact: !given, clienteUid: null,
    lastActivityAt: createdAt, createdAt, updatedAt: createdAt, _version: 1,
  };
  const lead = {
    fullName, email, phone, source, sourceDetail: it.medio || 'organico',
    vehicleOfInterestId: it.vehiculoId || null,
    status: 'nuevo', rating: 'cold', score: 0,
    ownerId: it.ownerId, ownerName: it.ownerName || null,
    slaDueAt: null, consent, sourceIntakeId: intakeId, convertedTo: null,
    lastActivityAt: createdAt, createdAt, updatedAt: createdAt, _version: 1,
  };
  const activity = {
    type: 'lead_intake',
    subject: 'Lead rápido: ' + source,
    body: String(it.nota || ''),
    status: 'closed', direction: 'inbound',
    relatedTo: { type: 'lead', id: null, name: fullName },
    ownerId: it.ownerId, createdAt, _version: 1,
  };
  return { dedupKey, contact, lead, activity };
}

module.exports = {
  normalizePhone, contactDedupKey, mapConsent, normalizeSolicitud,
  sanitizeContactId, clienteToContact, subscriptionToContact,
  intakeToCanonical, INTAKE_SOURCES,
};
