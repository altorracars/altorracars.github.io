// ============================================================
// ESPEJO ESM de la normalización de identidad (F40d, ADR §185).
// La fuente CJS vive en functions/src/ingestion/normalize.js — el test de
// paridad functions/shared/phone-parity.test.js revienta si divergen.
// Sin esta paridad, el dedup y la supresión 1581 fallan en silencio con el
// mismo número escrito de dos formas.
// ============================================================

export function normalizePhone(phone, prefijoPais) {
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

export function sanitizeContactId(dedupKey) {
  return String(dedupKey || '').replace(/[^a-z0-9]/gi, '_').slice(0, 480);
}

/** Claves del índice dedup para un email/teléfono dados (espejo de dedupKeysFor). */
export function dedupKeysOf({ email, phone, prefijoPais }) {
  const out = [];
  const e = String(email || '').trim().toLowerCase();
  if (e) out.push(sanitizeContactId('email:' + e));
  const p = normalizePhone(phone, prefijoPais);
  if (p) out.push(sanitizeContactId('phone:' + p));
  return out;
}
