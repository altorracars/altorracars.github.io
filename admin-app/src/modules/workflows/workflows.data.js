// ============================================================
// Workflows / Automatización (PLAN-UNIFICADO F-2 §242 · TODO-41 OLA-0.4) — datos.
// La automatización REAL corre en el SERVIDOR (Cloud Functions, job horario):
//  - SLA de leads: runCrmSlaSweep (functions/index.js) — Telegram al asesor +
//    escalera al dueño; desde OLA-0.4 HONRA el toggle
//    `config/automationRules.enabled.sla_breach_notify_super` y deja rastro en
//    `automationLog` (bySource 'automation-server').
//  - Citas: citaSweep (recordatorio 24h + confirmación del día + hold-expiry),
//    siempre activa — sin toggle (apagarla = citas sin recordatorio, no-opción).
//  - La asignación de leads entrantes la hace la INGESTIÓN (rotación) — lo que
//    la vieja regla "financiación alto-valor" intentaba, hoy es del motor base.
//  - "Etiquetar visitantes repetidos" (legacy) NUNCA tuvo implementación
//    (evaluate → null): se retira la mentira, no una capacidad.
// exec: 'toggle' = interruptor real · 'server' = siempre activa server-side.
//
// Rules: config/automationRules write = super_admin / settings.* / workflows.edit
// (mapeado en OLA-0.4) · automationLog: read workflows.read/audit.read · inmutable.
// ============================================================

import { doc, onSnapshot, setDoc, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../core/firebase.js';
import { store } from '../../core/store.js';

export const BUILT_IN_RULES = [
  {
    id: 'sla_breach_notify_super',
    name: 'Alerta de SLA: lead sin primer contacto',
    description: 'Si un lead nuevo lleva más del SLA (horas hábiles) sin primer contacto, avisa por Telegram al asesor responsable y escala al dueño.',
    trigger: 'sla_check', defaultEnabled: true, exec: 'toggle',
  },
  {
    id: 'cita_24h_reminder',
    name: 'Recordatorios de cita (24h + mismo día)',
    description: 'El servidor envía el recordatorio 24h antes, la confirmación del mismo día, y libera el cupo de las citas no confirmadas.',
    trigger: 'cita_sweep', defaultEnabled: true, exec: 'server',
  },
  {
    id: 'route_high_value_financiacion',
    name: 'Asignación automática de leads entrantes',
    description: 'Cada lead que entra se asigna automáticamente a un asesor (rotación configurable). Parte del motor de ingestión.',
    trigger: 'ingestion', defaultEnabled: true, exec: 'server',
  },
];

export const TRIGGER_LABELS = {
  sla_check: 'Cada hora (servidor)',
  cita_sweep: 'Cada hora (servidor)',
  ingestion: 'Al entrar el lead',
  comm_created: 'Nueva comunicación',
  comm_status_change: 'Cambio de estado',
  vehicle_updated: 'Vehículo actualizado',
};

/** Estado efectivo de una regla: el guardado, o su default si no hay guardado. */
export function effectiveEnabled(rule, enabledMap) {
  return Object.prototype.hasOwnProperty.call(enabledMap || {}, rule.id) ? !!enabledMap[rule.id] : !!rule.defaultEnabled;
}

/** Suscripción al mapa enabled (real-time → el toggle refleja cross-device). */
export function subscribeRuleStates(onData, onError) {
  return onSnapshot(doc(db, 'config', 'automationRules'), (snap) => {
    onData((snap.exists() && snap.data().enabled) || {});
  }, (err) => onError && onError(err));
}

/** Guarda el mapa COMPLETO de enabled (merge; igual que el clásico saveRule). */
export async function saveRuleStates(enabledMap) {
  await setDoc(doc(db, 'config', 'automationRules'), {
    enabled: enabledMap,
    updatedAt: new Date().toISOString(),
    updatedBy: (store.get().user && store.get().user.email) || null,
  }, { merge: true });
}

/** Historial de ejecuciones (automationLog, últimas N por timestamp desc). */
export async function fetchHistory(n = 50) {
  const snap = await getDocs(query(collection(db, 'automationLog'), orderBy('timestamp', 'desc'), limit(n)));
  const rows = [];
  snap.forEach((d) => rows.push({ _docId: d.id, ...d.data() }));
  return rows;
}

/* ── Mock (?mock=1) ─────────────────────────────────────────── */
export const MOCK_ENABLED = { sla_breach_notify_super: true };
export const MOCK_HISTORY = [
  { _docId: 'h1', ruleName: 'Asignar financiación alto-valor a super_admin', docTitle: 'Carlos M. — Mazda CX-5', action: 'assign_to_super_admin', outcome: 'applied', timestamp: '2026-06-25T14:20:00Z' },
  { _docId: 'h2', ruleName: 'Notificar al super_admin si SLA vencido', docTitle: 'Laura P.', action: 'notify_super_admin', outcome: 'applied', timestamp: '2026-06-25T11:05:00Z' },
  { _docId: 'h3', ruleName: 'Asignar financiación alto-valor a super_admin', docTitle: 'Andrés R.', action: 'assign_to_super_admin', outcome: 'skipped:no-super-admin', timestamp: '2026-06-24T19:40:00Z' },
];
