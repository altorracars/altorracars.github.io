// ============================================================
// Auditoría (§188 gap 2 — semilla de la fase ④ del strangler).
// El clásico dejaba rastro en `auditLog` por cada mutación admin;
// el portal no escribía NINGUNO — los módulos migrados (fase ②+)
// usan este helper para no PERDER cobertura de auditoría que ya
// existía. Mismo shape que AP.writeAuditLog (admin-state.js:391):
// {action, target, details, user, timestamp}.
// Best-effort SIEMPRE: un audit jamás rompe la operación real
// (las rules exigen editor+/audit.read — un rol sin eso solo
// pierde el rastro, no la funcionalidad).
// ============================================================

import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase.js';
import { store } from './store.js';

export function writeAudit(action, target, details) {
  try {
    if (store.get().mock) return;
    const user = store.get().user;
    addDoc(collection(db, 'auditLog'), {
      action,
      target: target || '',
      details: details || '',
      user: (user && user.email) || 'unknown',
      timestamp: new Date().toISOString(),
    }).catch(() => {});
  } catch (e) { /* nunca rompe la operación que audita */ }
}
