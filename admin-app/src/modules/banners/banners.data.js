// ============================================================
// Banners (E6 fase ②, ADR §188 paso 2) — capa de datos.
// Colección `banners`. SOLO las 2 posiciones con LECTOR público
// (auditoría D5-12): `promocional` (js/core/main.js — máx 3 activos
// en el home) y `home_promo` (carrusel de financiación,
// home-carousels.js). `hero`/`categoria` eran write-only sin lector
// → NO se portan; sus docs huérfanos quedan para el GC post-cutover
// (paso 29, decisión del dueño).
// Shape verbatim del clásico (admin-banners.js): title, subtitle,
// position, order, link, cta, active, image (Storage URL), _version
// (optimistic locking F4.5), createdAt/By, updatedAt/By + extras de
// home_promo: badge, eyebrow, rateValue, rateLabel, pills[≤3].
// ============================================================

import {
  collection, query, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc,
} from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../../core/firebase.js';
import { writeAudit } from '../../core/audit.js';
import { compressImage } from '../../core/image.js';

export const POSITIONS = {
  promocional: {
    label: 'Promocionales (home)',
    hint: 'Franja entre secciones del home. La web muestra MÁXIMO 3 activos, en orden ascendente.',
  },
  home_promo: {
    label: 'Carrusel financiación (home)',
    hint: 'Carrusel grande del home con cifra de tasa y pills. Todos los activos rotan, en orden.',
  },
};

/** Lista en vivo de las 2 posiciones VIVAS, ordenada como el público (order asc). */
export function subscribeBanners(onData, onError) {
  const q = query(collection(db, 'banners'), orderBy('order', 'asc'));
  return onSnapshot(q, (snap) => {
    onData(snap.docs
      .map((d) => ({ ...d.data(), _docId: d.id }))
      .filter((b) => POSITIONS[b.position]));
  }, (err) => onError && onError(err));
}

/** Comprime a WebP y sube a banners/ (rules: auth + <5MB + image/*). */
export async function uploadBannerImage(file, onStatus) {
  const allowed = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowed.includes(file.type)) throw new Error('Formato no válido. Usa JPG, PNG o WebP.');
  if (file.size > 10 * 1024 * 1024) throw new Error('Imagen demasiado grande (máx 10MB).');
  if (onStatus) onStatus('Comprimiendo a WebP…');
  const blob = await compressImage(file, { maxWidth: 1920, quality: 0.85 });
  if (onStatus) onStatus('Subiendo…');
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').replace(/\.[^.]+$/, '');
  const path = 'banners/' + Date.now() + '_' + safeName + '.webp';
  const snap = await uploadBytes(storageRef(storage, path), blob, { contentType: 'image/webp' });
  return getDownloadURL(snap.ref);
}

/** Crea o actualiza preservando _version (optimistic locking del clásico). */
export async function saveBanner(docId, fields, existing) {
  const now = new Date().toISOString();
  const user = fields._userEmail || 'unknown';
  const data = {
    title: fields.title,
    subtitle: fields.subtitle || '',
    position: fields.position,
    order: fields.order || 0,
    link: fields.link || '',
    cta: fields.cta || '',
    active: !!fields.active,
    updatedAt: now,
    updatedBy: user,
    _version: docId ? ((existing && existing._version) || 0) + 1 : 1,
  };
  if (fields.image) data.image = fields.image;
  if (fields.position === 'home_promo') {
    data.badge = fields.badge || '';
    data.eyebrow = fields.eyebrow || '';
    data.rateValue = fields.rateValue || '';
    data.rateLabel = fields.rateLabel || '';
    data.pills = (fields.pills || []).map((p) => (p || '').trim()).filter(Boolean).slice(0, 3);
  }
  if (docId) {
    await updateDoc(doc(db, 'banners', docId), data);
    writeAudit('banner_update', 'banner', data.title);
  } else {
    data.createdAt = now;
    data.createdBy = user;
    await addDoc(collection(db, 'banners'), data);
    writeAudit('banner_create', 'banner', data.title);
  }
}

export async function toggleBannerActive(banner) {
  await updateDoc(doc(db, 'banners', banner._docId), {
    active: !banner.active,
    updatedAt: new Date().toISOString(),
    _version: (banner._version || 0) + 1,
  });
}

/** Borra el doc + best-effort la imagen de Storage (como el clásico). */
export async function deleteBanner(banner) {
  await deleteDoc(doc(db, 'banners', banner._docId));
  writeAudit('banner_delete', 'banner', banner.title || banner._docId);
  if (banner.image && banner.image.indexOf('firebasestorage') !== -1) {
    try { await deleteObject(storageRef(storage, banner.image)); } catch (e) { /* best-effort */ }
  }
}

/** Datos demo para ?mock=1. */
export const MOCK_BANNERS = [
  { _docId: 'b1', title: 'Feria de usados junio', subtitle: 'Hasta 10% de descuento', position: 'promocional', order: 1, link: 'busqueda.html', cta: 'Ver ofertas', active: true, image: '', _version: 2, createdAt: '2026-06-01T10:00:00.000Z' },
  { _docId: 'b2', title: 'Financiación 90%', subtitle: 'Tu carro con cuota inicial mínima', position: 'home_promo', order: 1, link: 'simulador-credito.html', cta: 'Simular crédito', active: true, image: '', badge: 'NUEVO', eyebrow: 'Financiación ALTORRA', rateValue: '1.2%', rateLabel: 'tasa mensual desde', pills: ['Aprobación 24h', 'Sin codeudor', 'Tasa fija'], _version: 1, createdAt: '2026-05-15T09:00:00.000Z' },
  { _docId: 'b3', title: 'Banner pausado', subtitle: 'No visible en la web', position: 'promocional', order: 2, link: '', cta: '', active: false, image: '', _version: 1, createdAt: '2026-05-10T08:00:00.000Z' },
];
