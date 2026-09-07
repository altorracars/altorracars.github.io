// ============================================================
// validate.js — validación de ENTRADA reutilizable (OLA-1.7 §266).
// PURO (sin DOM/Firestore): cada *.data.js de escritura la aplica ANTES
// de tocar Firestore, y las rules espejan los mismos límites (defensa en
// profundidad). Mata la data sucia tipo "dfsfdfdfs" en el origen.
//
// defs = { campo: { label, required?, maxLen?, min?, max?, pattern?, patternMsg?, default? } }
// Devuelve { ok, errors: {campo: msg}, values: {campo: valorLimpio}, firstError }.
// Strings llegan TRIMMEADOS a values; '' con default → default.
// ============================================================

export function validateFields(defs, data) {
  const errors = {};
  const values = {};
  for (const [key, def] of Object.entries(defs)) {
    let v = data ? data[key] : undefined;
    if (typeof v === 'string') v = v.trim();
    const empty = v === undefined || v === null || v === '';
    if (empty) {
      if (def.required) { errors[key] = (def.label || key) + ' es obligatorio.'; continue; }
      values[key] = def.default !== undefined ? def.default : '';
      continue;
    }
    if (def.maxLen && String(v).length > def.maxLen) {
      errors[key] = (def.label || key) + ' es demasiado largo (máx. ' + def.maxLen + ' caracteres).';
      continue;
    }
    if (typeof def.min === 'number' && Number(v) < def.min) {
      errors[key] = (def.label || key) + ' debe ser mínimo ' + def.min + '.';
      continue;
    }
    if (typeof def.max === 'number' && Number(v) > def.max) {
      errors[key] = (def.label || key) + ' debe ser máximo ' + def.max + '.';
      continue;
    }
    if (def.pattern && !def.pattern.test(String(v))) {
      errors[key] = def.patternMsg || ((def.label || key) + ' no tiene un formato válido.');
      continue;
    }
    values[key] = v;
  }
  const keys = Object.keys(errors);
  return { ok: keys.length === 0, errors, values, firstError: keys.length ? errors[keys[0]] : null };
}

/** Lanza un Error "amigable" (errors.js lo muestra tal cual al usuario). */
export function assertValid(defs, data) {
  const r = validateFields(defs, data);
  if (!r.ok) {
    const err = new Error(r.firstError);
    err.friendly = true; // friendlyError lo respeta (mensaje de negocio, no interno)
    throw err;
  }
  return r.values;
}
