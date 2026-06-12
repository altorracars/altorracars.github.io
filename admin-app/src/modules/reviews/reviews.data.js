// ============================================================
// Reseñas (E6 fase ②, ADR §188 paso 1) — capa de datos.
// Colección `resenas`: la MISMA que renderiza el sitio público
// (js/public/reviews.js, lectura abierta) y que editaba el admin
// clásico (admin-reviews.js). El shape se preserva VERBATIM —
// cambiar un campo aquí rompe la página pública de reseñas:
// {name, location, rating 1-5, vehicle, text, source, verified,
//  featured, avatar (iniciales), createdAt, updatedAt}.
// ============================================================

import {
  collection, query, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc,
} from 'firebase/firestore';
import { db } from '../../core/firebase.js';
import { writeAudit } from '../../core/audit.js';

export const SOURCE_LABELS = {
  google_maps: 'Google Maps',
  sitio_web: 'Sitio Web',
  usuario_registrado: 'Usuario Registrado',
};

export function initialsOf(name) {
  return (name || 'NN').split(' ').map((w) => w.charAt(0)).join('').substring(0, 2).toUpperCase();
}

/** Lista en vivo, más nuevas primero (mismo orden que el público). */
export function subscribeReviews(onData, onError) {
  const q = query(collection(db, 'resenas'), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snap) => {
    onData(snap.docs.map((d) => ({ ...d.data(), _docId: d.id })));
  }, (err) => onError && onError(err));
}

/** Crea o actualiza preservando el shape público. */
export async function saveReview(docId, fields) {
  const now = new Date().toISOString();
  const data = {
    name: fields.name,
    location: fields.location || 'Cartagena',
    rating: fields.rating,
    vehicle: fields.vehicle || '',
    text: fields.text,
    source: fields.source || 'sitio_web',
    verified: !!fields.verified,
    featured: !!fields.featured,
    avatar: initialsOf(fields.name),
    updatedAt: now,
  };
  if (docId) {
    await updateDoc(doc(db, 'resenas', docId), data);
    writeAudit('review_update', 'resena ' + data.name, data.name);
  } else {
    data.createdAt = now;
    await addDoc(collection(db, 'resenas'), data);
    writeAudit('review_create', 'resena ' + data.name, data.name);
  }
}

export async function deleteReview(docId, name) {
  await deleteDoc(doc(db, 'resenas', docId));
  writeAudit('review_delete', 'resena ' + (name || docId), '');
}

/** Datos demo para ?mock=1 (preview sin Firestore). */
export const MOCK_REVIEWS = [
  { _docId: 'm1', name: 'Carlos Pérez', location: 'Cartagena', rating: 5, vehicle: 'Mazda CX-30 2023', text: 'Excelente atención, el carro quedó impecable y el papeleo fue rapidísimo.', source: 'google_maps', verified: true, featured: true, avatar: 'CP', createdAt: '2026-06-01T10:00:00.000Z' },
  { _docId: 'm2', name: 'Laura Gómez', location: 'Turbaco', rating: 4, vehicle: '', text: 'Buen servicio y asesoría honesta. El proceso de financiación tardó un poco.', source: 'sitio_web', verified: true, featured: false, avatar: 'LG', createdAt: '2026-05-20T15:30:00.000Z' },
  { _docId: 'm3', name: 'Andrés Llanos', location: 'Cartagena', rating: 5, vehicle: 'Chevrolet Onix 2024', text: 'Me recibieron mi carro usado como parte de pago sin vueltas. Recomendado.', source: 'usuario_registrado', verified: false, featured: false, avatar: 'AL', createdAt: '2026-05-02T09:10:00.000Z' },
];
