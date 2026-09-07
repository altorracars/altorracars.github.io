// ============================================================
// Marcas (E6 fase ③ paso 1, ADR §188) — capa de datos.
// Colección `marcas`: docId = slug del nombre (id field == docId).
// La leen los filtros públicos y las páginas de marca (database.js)
// — shape verbatim: {id, nombre, descripcion, logo, _type:'marca',
// _version, updatedAt/By}. Rules exigen validVersion() en update.
// Logo: Storage `cars/brand_logo_*` (path compat con storage.rules),
// 512px @ 0.90 WebP; SVG sube tal cual (vector).
// ============================================================

import {
  collection, query, orderBy, onSnapshot, getDocs, setDoc, updateDoc, deleteDoc, doc,
} from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../core/firebase.js';
import { writeAudit } from '../../core/audit.js';
import { compressImage } from '../../core/image.js';

/* Réplica de admin-brands.js: normaliza paths legacy de logos. */
const LOCAL_LOGOS = {};
['Audi', 'BMW', 'Chevrolet', 'FIAT', 'Ford', 'Honda', 'Hyundai', 'Jeep', 'Kia',
  'Mazda', 'Mitsubishi', 'Nissan', 'Renault', 'Suzuki', 'Toyota', 'Volkswagen']
  .forEach((n) => { LOCAL_LOGOS[n.toLowerCase()] = 'multimedia/Logos/' + n + '.webp'; });
LOCAL_LOGOS.fiat = 'multimedia/Logos/FIAT.webp';

export function resolveLogoUrl(url) {
  if (!url) return '';
  if (url.indexOf('multimedia/Logo/') === 0) url = url.replace('multimedia/Logo/', 'multimedia/Logos/');
  if (url.indexOf('multimedia/Logos/') >= 0 && /\.png$/i.test(url)) url = url.replace(/\.png$/i, '.webp');
  return url;
}

export function getBrandLogoUrl(brand) {
  const resolved = resolveLogoUrl(brand.logo);
  if (resolved && resolved.indexOf('http') === 0) return resolved;
  if (resolved && resolved.indexOf('multimedia/Logos/') >= 0 && /\.webp$/i.test(resolved)) return '/' + resolved.replace(/^\//, '');
  const fallback = LOCAL_LOGOS[brand.id] || LOCAL_LOGOS[(brand.nombre || '').toLowerCase()];
  return fallback ? '/' + fallback : (resolved || '');
}

export function slugify(nombre) {
  return nombre.trim().toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function subscribeBrands(onData, onError) {
  const q = query(collection(db, 'marcas'), orderBy('nombre', 'asc'));
  return onSnapshot(q, (snap) => {
    onData(snap.docs.map((d) => ({ ...d.data(), _docId: d.id })));
  }, (err) => onError && onError(err));
}

/** Conteo de vehículos por marca (dataset chico — una lectura por mount). */
export async function fetchVehicleCounts() {
  const snap = await getDocs(collection(db, 'vehiculos'));
  const counts = {};
  snap.forEach((d) => {
    const m = d.data().marca;
    if (m) counts[m] = (counts[m] || 0) + 1;
  });
  return counts;
}

export async function uploadBrandLogo(file, onStatus) {
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
  if (!allowed.includes(file.type)) throw new Error('Formato no válido. Usa JPG, PNG, WebP o SVG.');
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').replace(/\.[^.]+$/, '');
  let blob = file; let ext = 'svg';
  if (file.type !== 'image/svg+xml') {
    if (onStatus) onStatus('Comprimiendo a WebP…');
    blob = await compressImage(file, { maxWidth: 512, quality: 0.90 });
    ext = 'webp';
  }
  if (onStatus) onStatus('Subiendo logo…');
  const path = 'cars/brand_logo_' + Date.now() + '_' + safeName + '.' + ext;
  const snap = await uploadBytes(storageRef(storage, path), blob, {
    contentType: ext === 'svg' ? 'image/svg+xml' : 'image/webp',
  });
  return getDownloadURL(snap.ref);
}

/** Crea (docId = slug) o actualiza; _version +1 (rules: validVersion()). */
export async function saveBrand(docId, fields, existing) {
  const isEdit = !!docId;
  const id = isEdit ? docId : slugify(fields.nombre);
  if (!id) throw new Error('Nombre inválido.');
  const data = {
    id,
    nombre: fields.nombre,
    descripcion: fields.nombre,
    logo: resolveLogoUrl(fields.logo || ''),
    updatedAt: new Date().toISOString(),
    updatedBy: fields._userEmail || 'unknown',
    _type: 'marca',
    _version: isEdit ? ((existing && existing._version) || 0) + 1 : 1,
  };
  if (isEdit) {
    await updateDoc(doc(db, 'marcas', id), data);
    writeAudit('brand_update', 'marca ' + id, data.nombre);
  } else {
    await setDoc(doc(db, 'marcas', id), data);
    writeAudit('brand_create', 'marca ' + id, data.nombre);
  }
  return id;
}

export async function deleteBrand(brand) {
  await deleteDoc(doc(db, 'marcas', brand._docId));
  writeAudit('brand_delete', 'marca ' + brand._docId, '');
}

export const MOCK_BRANDS = [
  { _docId: 'chevrolet', id: 'chevrolet', nombre: 'Chevrolet', descripcion: 'Chevrolet', logo: 'multimedia/Logos/Chevrolet.webp', _version: 3 },
  { _docId: 'mazda', id: 'mazda', nombre: 'Mazda', descripcion: 'Mazda', logo: 'multimedia/Logos/Mazda.webp', _version: 1 },
  { _docId: 'renault', id: 'renault', nombre: 'Renault', descripcion: 'Renault', logo: '', _version: 1 },
];

export const MOCK_COUNTS = { chevrolet: 9, mazda: 5, renault: 0 };
