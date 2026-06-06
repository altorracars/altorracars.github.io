// ============================================================
// NBA — Next Best Action. Port de nba.js (10 reglas), adaptado al
// canónico. Determinista, sin LLM. Devuelve la acción de mayor prioridad.
// ============================================================

import { daysSince } from './format.js';
import { classifyType, isHighIntent, isUncontacted, isClosedStatus } from './classify.js';

/**
 * @param {object} lead   documento canónico
 * @param {{score?:number}} ctx  contexto (score ya calculado)
 * @returns {{id:string, label:string, reason:string, icon:string, priority:number}}
 */
export function computeNBA(lead, ctx = {}) {
  const score = Number(ctx.score) || 0;
  const { type } = classifyType(lead);
  const sinceCreated = daysSince(lead.createdAt);
  const sinceActivity = daysSince(lead.lastActivityAt);
  const uncontacted = isUncontacted(lead);
  const closed = isClosedStatus(lead.status);

  const rules = [
    {
      id: 'confirm_appointment', priority: 95,
      when: type === 'cita' && !closed && uncontacted,
      label: 'Confirmar cita', reason: 'Cita pendiente de confirmación', icon: '📅',
    },
    {
      id: 'reach_hot_lead', priority: 90,
      when: score >= 70 && uncontacted && !closed,
      label: 'Contactar ya', reason: 'Lead caliente sin respuesta', icon: '🔥',
    },
    {
      id: 'send_quote', priority: 88,
      when: isHighIntent(lead) && score >= 55 && !closed,
      label: 'Enviar cotización', reason: 'Interés de compra/financiación', icon: '🧾',
    },
    {
      id: 'assign_asesor', priority: 85,
      when: !lead.ownerId && !closed,
      label: 'Asignar asesor', reason: 'Sin asesor asignado', icon: '🙋',
    },
    {
      id: 'first_touch', priority: 70,
      when: uncontacted && sinceCreated < 2 && !closed,
      label: 'Primer contacto', reason: 'Lead nuevo sin trabajar', icon: '👋',
    },
    {
      id: 'whatsapp_followup', priority: 60,
      when: score >= 40 && score < 70 && sinceActivity >= 2 && sinceActivity < 30 && !closed,
      label: 'Seguimiento WhatsApp', reason: 'Lead tibio enfriándose', icon: '💬',
    },
    {
      id: 'reactivate', priority: 50,
      when: sinceActivity >= 30 && sinceActivity !== Infinity && !closed,
      label: 'Reactivar con oferta', reason: 'Inactivo +30 días', icon: '🎯',
    },
    {
      id: 'nurture', priority: 15,
      when: !closed,
      label: 'Nutrir relación', reason: 'Sin acción urgente', icon: '🌱',
    },
    {
      id: 'archived', priority: 5,
      when: closed,
      label: 'Cerrado', reason: 'Lead cerrado', icon: '✅',
    },
  ];

  const matched = rules.filter((r) => r.when).sort((a, b) => b.priority - a.priority);
  const best = matched[0] || rules[rules.length - 1];
  return { id: best.id, label: best.label, reason: best.reason, icon: best.icon, priority: best.priority };
}
