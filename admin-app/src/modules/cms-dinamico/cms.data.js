// ============================================================
// CMS / Dinamismo (TODO-23, comité v4) — capa de datos del editor de
// contenido editable del sitio. Por marca: "Acerca de" (texto) + banner
// (imagen), en siteContent/brand_{id}.{aboutBrand,bannerUrl}. El SSG los
// hornea en /marcas/{slug}.html (texto baked + hero/og:image).
//
// Seguridad: la frontera real son las reglas (content.edit + forma + anti-PII
// + bannerUrl=URL-de-Storage, server-side). Esta capa es el cliente; el SDK
// falla si la regla rechaza. La imagen pasa por storage.rules (auth + <5MB +
// png/jpeg/webp) ANTES de que su URL llegue a siteContent.
// Frescura: getDoc ONE-SHOT (NO listener) — comité §2 Hueco C: el techo fresco
// va SOLO en el preview del admin, nunca multiplicado por visitante público.
// ============================================================

import { getDoc, setDoc, doc } from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../core/firebase.js';
import { compressImage } from '../../core/image.js';
import { writeAudit } from '../../core/audit.js';

// Reutiliza la fuente de marcas (no duplicar el SSoT del catálogo de marcas).
export { subscribeBrands, MOCK_BRANDS } from '../brands/brands.data.js';

export const ABOUT_MAX = 2000;

/** Lee el contenido CMS de la marca (one-shot). {aboutBrand, bannerUrl} ('' si no existe). */
export async function loadBrandContent(brandId) {
  const snap = await getDoc(doc(db, 'siteContent', 'brand_' + brandId));
  if (!snap.exists()) return { aboutBrand: '', bannerUrl: '' };
  const d = snap.data();
  return {
    aboutBrand: typeof d.aboutBrand === 'string' ? d.aboutBrand : '',
    bannerUrl: typeof d.bannerUrl === 'string' ? d.bannerUrl : '',
  };
}

/**
 * Guarda aboutBrand + bannerUrl con merge (no pisa campos futuros del doc). Las reglas
 * validan content.edit + hasOnly + cap + anti-PII + bannerUrl=URL-de-Storage (server-side).
 * Audit no-bloqueante.
 */
export async function saveBrandContent(brandId, { aboutBrand, bannerUrl }, userEmail, userName) {
  await setDoc(doc(db, 'siteContent', 'brand_' + brandId), {
    aboutBrand: aboutBrand,
    bannerUrl: bannerUrl || '',
    updatedAt: new Date().toISOString(),
    updatedBy: userEmail || 'unknown',
    updatedByName: userName || 'admin',
  }, { merge: true });
  writeAudit('content_edit', 'siteContent/brand_' + brandId,
    'aboutBrand(' + (aboutBrand || '').length + ' chars) bannerUrl(' + (bannerUrl ? 'sí' : 'no') + ')');
}

/**
 * Comprime a WebP y sube el banner de la marca a brands/ (storage.rules: auth + <5MB + image/*).
 * Devuelve la download URL (que luego valida la regla de siteContent: host de Storage).
 */
export async function uploadBrandBanner(file, brandId, onStatus) {
  const allowed = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowed.includes(file.type)) throw new Error('Formato no válido. Usa JPG, PNG o WebP.');
  if (file.size > 10 * 1024 * 1024) throw new Error('Imagen demasiado grande (máx 10MB).');
  if (onStatus) onStatus('Comprimiendo a WebP…');
  const blob = await compressImage(file, { maxWidth: 1920, quality: 0.85 });
  if (onStatus) onStatus('Subiendo…');
  const path = 'brands/banner_' + brandId + '_' + Date.now() + '.webp';
  const snap = await uploadBytes(storageRef(storage, path), blob, { contentType: 'image/webp' });
  return getDownloadURL(snap.ref);
}
