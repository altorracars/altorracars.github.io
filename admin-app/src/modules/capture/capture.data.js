// ============================================================
// Captura MANUAL de leads (canales externos: Meta/WhatsApp/TikTok/…).
// Escribe un `solicitudes` con origen=<canal> → el trigger Fase 1
// (`onSolicitudCreated`) lo normaliza al canónico con dedup + consentimiento
// + actividad + dead-letter. CERO backend nuevo; respeta el dedup.
// ============================================================

import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../core/firebase.js';
import { store } from '../../core/store.js';

/**
 * @param {object} d  { nombre, email, telefono, prefijoPais, canal, interes,
 *                      vehiculoId, trafico, campana, consentGiven, notas }
 * @returns {Promise<string>} id de la solicitud creada
 */
export async function createManualLead(d) {
  const uid = store.get().user ? store.get().user.uid : null;
  const tags = ['manual', d.trafico, d.campana].filter(Boolean);
  const ref = await addDoc(collection(db, 'solicitudes'), {
    nombre: d.nombre || '',
    email: (d.email || '').trim().toLowerCase(),
    telefono: d.telefono || '',
    prefijoPais: d.prefijoPais || '+57',
    origen: d.canal || 'manual',          // → canónico source → channelOf
    tipo: d.interes || 'consulta',        // → canónico sourceDetail
    vehiculoId: d.vehiculoId || null,
    kind: 'lead',
    comentarios: d.notas || '',
    consentGiven: d.consentGiven === true, // Habeas Data (Ley 1581)
    tags,
    source: { page: 'manual', campaign: d.campana || null, traffic: d.trafico || null },
    clientCategory: 'manual',
    createdAt: new Date().toISOString(),
    _manual: true,
    _createdByUid: uid,
  });
  return ref.id;
}
