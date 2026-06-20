// ============================================================
// CMS / Dinamismo (TODO-23, comité v4) — capa de datos del editor de
// contenido editable del sitio. Cobaya: "Acerca de" por marca, en
// siteContent/brand_{id}.aboutBrand. El SSG lo hornea en /marcas/{slug}.html.
//
// Seguridad: la frontera real son las reglas (content.edit + forma + anti-PII,
// server-side). Esta capa es el cliente; el SDK falla si la regla rechaza.
// Frescura: getDoc ONE-SHOT (NO listener) — comité §2 Hueco C: el techo fresco
// va SOLO en el preview del admin, nunca multiplicado por visitante público.
// ============================================================

import { getDoc, setDoc, doc } from 'firebase/firestore';
import { db } from '../../core/firebase.js';
import { writeAudit } from '../../core/audit.js';

// Reutiliza la fuente de marcas (no duplicar el SSoT del catálogo de marcas).
export { subscribeBrands, MOCK_BRANDS } from '../brands/brands.data.js';

export const ABOUT_MAX = 2000;

/** Lee el aboutBrand actual de siteContent/brand_{id} (one-shot). '' si no existe. */
export async function loadAboutBrand(brandId) {
  const snap = await getDoc(doc(db, 'siteContent', 'brand_' + brandId));
  if (!snap.exists()) return '';
  const v = snap.data().aboutBrand;
  return typeof v === 'string' ? v : '';
}

/**
 * Guarda aboutBrand con merge (no pisa campos futuros del doc). Las reglas
 * validan content.edit + hasOnly + cap + anti-PII (server-side). Audit no-bloqueante.
 */
export async function saveAboutBrand(brandId, aboutBrand, userEmail, userName) {
  await setDoc(doc(db, 'siteContent', 'brand_' + brandId), {
    aboutBrand: aboutBrand,
    updatedAt: new Date().toISOString(),
    updatedBy: userEmail || 'unknown',
    updatedByName: userName || 'admin',
  }, { merge: true });
  writeAudit('content_edit', 'siteContent/brand_' + brandId, 'aboutBrand (' + aboutBrand.length + ' chars)');
}
