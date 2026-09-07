/**
 * ALTORRA CARS — Next Best Action (Mega-Plan v4, Microfase J.8)
 * ===============================================================
 * Reglas heurísticas que sugieren al asesor la siguiente acción
 * más rentable por contacto. Combina:
 *   - score + tier (de J.3)
 *   - recencia del último contacto
 *   - tipo de comunicación más reciente
 *   - señales AI (urgencia, sentiment)
 *
 * Patrón Salesforce Einstein NBA / HubSpot Smart Suggestions, pero
 * 100% reglas locales — sin modelo entrenado, sin servidor, sub-ms.
 *
 * Salida ordenada por prioridad (alto → bajo). El UI muestra top 1-3.
 *
 * Public API:
 *   AltorraNBA.suggest(contact, options) → [{ action, priority, reason, cta }]
 */
(function () {
    'use strict';
    if (window.AltorraNBA) return;

    var DAY_MS = 86400000;

    function daysSince(ts) {
        if (!ts) return Infinity;
        var t = ts;
        if (typeof ts === 'string') t = new Date(ts).getTime();
        else if (ts && typeof ts.toMillis === 'function') t = ts.toMillis();
        else if (ts instanceof Date) t = ts.getTime();
        if (!t || isNaN(t)) return Infinity;
        return (Date.now() - t) / DAY_MS;
    }

    function lastComm(c) {
        if (!c.comms || c.comms.length === 0) return null;
        var sorted = c.comms.slice().sort(function (a, b) {
            return new Date(b.createdAt || b.updatedAt || 0).getTime() - new Date(a.createdAt || a.updatedAt || 0).getTime();
        });
        return sorted[0];
    }

    /* ═══════════════════════════════════════════════════════════
       SUGGESTIONS — cada regla devuelve null o una acción
       ═══════════════════════════════════════════════════════════ */
    function suggest(contact, options) {
        if (!contact) return [];
        options = options || {};
        var actions = [];

        var score = contact._score || 0;
        var lastDays = daysSince(contact.lastCommAt);
        var last = lastComm(contact);
        var aiEnrichment = contact._aiEnrichment || null;
        var commCount = (contact.comms || []).length;

        // 1. URGENCIA detectada en últimos mensajes → contactar HOY
        if (aiEnrichment && aiEnrichment.signals && aiEnrichment.signals.urgencyScore >= 2) {
            actions.push({
                action: 'call_now',
                priority: 100,
                reason: 'Cliente expresó urgencia',
                cta: 'Llamar ahora',
                icon: 'phone'
            });
        }

        // 2. LEAD CALIENTE sin tocar hace 2+ días → contactar
        if (score >= 70 && lastDays >= 2 && lastDays !== Infinity) {
            actions.push({
                action: 'reach_hot_lead',
                priority: 90,
                reason: 'Lead caliente (' + score + ') sin contactar hace ' + Math.floor(lastDays) + ' días',
                cta: 'Contactar',
                icon: 'flame'
            });
        }

        // 3. SOLICITUD SIN ASIGNAR → asignar asesor
        if (last && last.estado === 'pendiente' && !last.assignedTo) {
            actions.push({
                action: 'assign_asesor',
                priority: 85,
                reason: 'Solicitud pendiente sin asesor asignado',
                cta: 'Asignar asesor',
                icon: 'user-plus'
            });
        }

        // 4. FINANCIACIÓN ≥ $50M sin propuesta → enviar cotización
        if (last && last.tipo === 'financiacion' && last.estado === 'pendiente') {
            var cuotaInicial = parseInt(String((last.datosExtra && last.datosExtra.cuotaInicial) || '').replace(/[^0-9]/g, ''), 10) || 0;
            if (cuotaInicial >= 50000000) {
                actions.push({
                    action: 'send_quote',
                    priority: 88,
                    reason: 'Solicitud financiación alto-valor ($' + Math.round(cuotaInicial / 1000000) + 'M cuota inicial)',
                    cta: 'Enviar cotización',
                    icon: 'file-text'
                });
            }
        }

        // 5. CITA PRÓXIMA (próximas 48h) → recordatorio + confirmar
        if (last && last.requiereCita && last.fecha) {
            var fechaCita = new Date(last.fecha + 'T' + (last.hora || '00:00'));
            var horasFaltan = (fechaCita.getTime() - Date.now()) / 3600000;
            if (horasFaltan > 0 && horasFaltan < 48 && last.estado !== 'cancelada' && last.estado !== 'completada') {
                actions.push({
                    action: 'confirm_appointment',
                    priority: 95,
                    reason: 'Cita en ' + Math.round(horasFaltan) + 'h — confirmar y enviar recordatorio',
                    cta: 'Confirmar cita',
                    icon: 'calendar-check-2'
                });
            }
        }

        // 6. LEAD TIBIO → seguimiento por WhatsApp
        if (score >= 40 && score < 70 && lastDays >= 5 && lastDays < 30) {
            actions.push({
                action: 'whatsapp_followup',
                priority: 60,
                reason: 'Lead tibio (' + score + ') sin actividad hace ' + Math.floor(lastDays) + ' días',
                cta: 'Seguimiento WhatsApp',
                icon: 'message-circle-more'
            });
        }

        // 7. LEAD FRÍO + score moderado → reactivar con oferta
        if (score >= 30 && score < 60 && lastDays >= 30 && lastDays !== Infinity) {
            actions.push({
                action: 'reactivate_with_offer',
                priority: 50,
                reason: 'Reactivar con oferta personalizada (frío hace ' + Math.floor(lastDays) + ' días)',
                cta: 'Enviar oferta',
                icon: 'sparkles'
            });
        }

        // 8. SIN COMUNICACIONES (cliente registrado pasivo) → encuesta interés
        if (commCount === 0 && contact.type === 'registered') {
            actions.push({
                action: 'engagement_survey',
                priority: 35,
                reason: 'Cliente registrado sin solicitudes — encuesta de interés',
                cta: 'Encuesta interés',
                icon: 'help-circle'
            });
        }

        // 9. CLIENTE FRUSTRADO (sentiment muy negativo persistente) → llamada de retención
        if (aiEnrichment && aiEnrichment.signals && aiEnrichment.signals.sentimentSamples >= 2 &&
            aiEnrichment.signals.avgSentiment < -0.4) {
            actions.push({
                action: 'retention_call',
                priority: 92,
                reason: 'Cliente frustrado (sentiment negativo en múltiples mensajes)',
                cta: 'Llamada retención',
                icon: 'shield-alert'
            });
        }

        // 10. CLIENTE FAN (sentiment muy positivo) → pedir referido
        if (aiEnrichment && aiEnrichment.signals && aiEnrichment.signals.sentimentSamples >= 3 &&
            aiEnrichment.signals.avgSentiment > 0.5 && score >= 60) {
            actions.push({
                action: 'request_referral',
                priority: 55,
                reason: 'Cliente muy satisfecho — invitar al programa de referidos',
                cta: 'Invitar a referidos',
                icon: 'users-round'
            });
        }

        // Sort por prioridad descendente
        actions.sort(function (a, b) { return b.priority - a.priority; });

        // Limit configurable
        var limit = options.limit || 3;
        return actions.slice(0, limit);
    }

    /* ═══════════════════════════════════════════════════════════
       Public API
       ═══════════════════════════════════════════════════════════ */
    window.AltorraNBA = {
        suggest: suggest
    };
})();
