// ============================================================
// Config de disponibilidad (F21, ADR §184) — capa de datos.
// SSoT: config/availability — el MISMO doc que lee el form público
// (js/public/citas.js vía onSnapshot) y el validador del admin clásico
// (admin-calendar-config.js mapeado). UN doc, cero dual-write.
// ============================================================

import { doc, onSnapshot, setDoc, deleteField } from 'firebase/firestore';
import { db } from '../../core/firebase.js';

export { deleteField }; // tombstone para borrar claves de mapas (setDoc merge NO borra)

export const AVAILABILITY_DEFAULTS = {
  days: [1, 2, 3, 4, 5, 6],
  startHour: 9,
  endHour: 17,
  interval: 60,
  maxPerSlot: 1,
  bufferMin: 15,
  blockedDates: [],
  blockedDateLabels: {},
  blockedHours: {},
};

// Festivos Colombia 2026 (misma fuente que admin-calendar-config.js).
// Solo se cargan los FUTUROS al presionar el preset.
export const FESTIVOS_CO_2026 = [
  ['2026-01-01', 'Año Nuevo'],
  ['2026-01-12', 'Reyes Magos'],
  ['2026-03-23', 'San José'],
  ['2026-04-02', 'Jueves Santo'],
  ['2026-04-03', 'Viernes Santo'],
  ['2026-05-01', 'Día del Trabajo'],
  ['2026-05-18', 'Ascensión'],
  ['2026-06-08', 'Corpus Christi'],
  ['2026-06-15', 'Sagrado Corazón'],
  ['2026-06-29', 'San Pedro y San Pablo'],
  ['2026-07-20', 'Independencia'],
  ['2026-08-07', 'Batalla de Boyacá'],
  ['2026-08-17', 'Asunción de la Virgen'],
  ['2026-10-12', 'Día de la Raza'],
  ['2026-11-02', 'Todos los Santos'],
  ['2026-11-16', 'Independencia de Cartagena'],
  ['2026-12-08', 'Inmaculada Concepción'],
  ['2026-12-25', 'Navidad'],
];

const ref = () => doc(db, 'config', 'availability');
// PII (review §184): los overrides por asesor (nombre + motivo de ausencia)
// viven en un doc PRIVADO — config/availability es de lectura pública.
const ovRef = () => doc(db, 'crm_config', 'advisorOverrides');

/** Suscripción al doc canónico (1 doc — barato, fresco cross-device). */
export function subscribeAvailability(onData, onError) {
  return onSnapshot(ref(), (snap) => {
    onData({ ...AVAILABILITY_DEFAULTS, ...(snap.exists() ? snap.data() : {}) });
  }, (err) => onError && onError(err));
}

/** Guarda un PARCHE de campos (merge; claves a borrar → deleteField()). */
export async function saveAvailability(patch, uid) {
  await setDoc(ref(), {
    ...patch,
    updatedAt: new Date().toISOString(),
    updatedBy: uid || null,
  }, { merge: true });
}

/** Overrides por asesor (doc privado crm_config/advisorOverrides). */
export function subscribeOverrides(onData, onError) {
  return onSnapshot(ovRef(), (snap) => {
    onData((snap.exists() && snap.data().overrides) || {});
  }, (err) => onError && onError(err));
}

/** Reemplaza el mapa COMPLETO de overrides (doc pequeño — sin merge). */
export async function saveOverrides(overrides, uid) {
  await setDoc(ovRef(), {
    overrides,
    updatedAt: new Date().toISOString(),
    updatedBy: uid || null,
  });
}
