// ============================================================
// Workflows / Automatización (PLAN-UNIFICADO F-2 §242, gap §2.A) — datos.
// El clásico (admin-automation.js, MF6.1/K.1) NO es CRUD de reglas arbitrarias:
// es una BIBLIOTECA FIJA de 4 reglas predefinidas (lógica en JS) que el admin
// solo ACTIVA/DESACTIVA. El estado vive en `config/automationRules.enabled[id]`;
// el historial en `automationLog`. Este módulo es la UI DE GESTIÓN (toggle +
// historial); el MOTOR (EventBus + SLA loop, solo super_admin client-side) se
// queda en el legacy — su migración a server-side (Cloud Function) es aparte.
//
// Rules (verificado firestore.rules):
//  - config/automationRules: read público · write super_admin / settings.*
//    (⚠️ workflows.edit NO está mapeado al doc — gap catálogo↔rules, follow-up).
//  - automationLog: read auth/workflows.read/audit.read · inmutable.
// ============================================================

import { doc, onSnapshot, setDoc, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../core/firebase.js';
import { store } from '../../core/store.js';

// Metadata de las 4 reglas (port de BUILT_IN_RULES; SIN las funciones evaluate
// — el motor no se porta). defaultEnabled = el `enabled` del clásico.
export const BUILT_IN_RULES = [
  { id: 'route_high_value_financiacion', name: 'Asignar financiación alto-valor a super_admin', description: 'Si llega una financiación con cuota inicial ≥ $50M, se auto-asigna al super_admin.', trigger: 'comm_created', defaultEnabled: true },
  { id: 'sla_breach_notify_super', name: 'Notificar al super_admin si SLA vencido sin asignar', description: 'Si una solicitud lleva más del SLA sin respuesta y no está asignada, notifica al super_admin.', trigger: 'sla_check', defaultEnabled: true },
  { id: 'auto_tag_repeat_visitor', name: 'Etiquetar visitantes repetidos', description: 'Si un cliente registrado ya envió 3+ solicitudes, agregar tag "cliente-recurrente".', trigger: 'comm_created', defaultEnabled: true },
  { id: 'cita_24h_reminder', name: 'Recordatorio 24h antes de cita', description: 'Crea un follow-up 24h antes de cada cita confirmada (MF6.2).', trigger: 'comm_status_change', defaultEnabled: false },
];

export const TRIGGER_LABELS = {
  comm_created: 'Nueva comunicación',
  sla_check: 'Cada minuto (SLA)',
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
export const MOCK_ENABLED = { route_high_value_financiacion: true, sla_breach_notify_super: true, auto_tag_repeat_visitor: true, cita_24h_reminder: false };
export const MOCK_HISTORY = [
  { _docId: 'h1', ruleName: 'Asignar financiación alto-valor a super_admin', docTitle: 'Carlos M. — Mazda CX-5', action: 'assign_to_super_admin', outcome: 'applied', timestamp: '2026-06-25T14:20:00Z' },
  { _docId: 'h2', ruleName: 'Notificar al super_admin si SLA vencido', docTitle: 'Laura P.', action: 'notify_super_admin', outcome: 'applied', timestamp: '2026-06-25T11:05:00Z' },
  { _docId: 'h3', ruleName: 'Asignar financiación alto-valor a super_admin', docTitle: 'Andrés R.', action: 'assign_to_super_admin', outcome: 'skipped:no-super-admin', timestamp: '2026-06-24T19:40:00Z' },
];
