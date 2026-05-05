/**
 * ALTORRA CARS — AI Scoring signals (Mega-Plan v4, Microfase J.3)
 * ================================================================
 * Enriquece el lead score base con señales del AI Engine local
 * (sentiment de J.1 + entities de J.2). NO reemplaza el algoritmo
 * existente — lo ajusta ±15 puntos según contexto AI.
 *
 * El score base de admin-crm.js sigue siendo la fuente de verdad
 * principal. Este módulo agrega una capa "AI insights" que un
 * J.x futuro con TF.js puede sustituir vía AltorraAI.registerProvider.
 *
 * Señales calculadas:
 *   - avgSentiment: promedio de sentiment scores en mensajes del cliente
 *   - sentimentVariance: estabilidad emocional (cliente errático = riesgo)
 *   - entityRichness: cuántos tipos de entities mentó (presupuesto, ciudad, año)
 *   - urgencyScore: cuenta de mensajes con palabras de urgencia
 *   - intentDiversity: variedad de tipos de comunicación (cita + solicitud + lead)
 *
 * Ajuste al score base:
 *   - Sentiment muy positivo y consistente  → +5 a +10
 *   - Sentiment muy negativo                → -5 a -10
 *   - Entity richness alta (cliente muy informativo) → +3 a +5
 *   - Urgency alta (cliente quiere ya)      → +3 a +7
 *
 * Cap total: ±15 puntos.
 *
 * Public API:
 *   AltorraScoring.aiSignals(contact, communications) → señales
 *   AltorraScoring.enrichScore(baseScore, signals)    → score ajustado
 *   AltorraScoring.explainEnrichment(signals)         → texto humano
 */
(function () {
    'use strict';
    if (window.AltorraScoring) return;

    // Palabras que indican urgencia en español
    var URGENCY_TOKENS = [
        'urgente', 'urgencia', 'rápido', 'rapido', 'ya', 'ahora',
        'pronto', 'inmediato', 'inmediata', 'cuanto antes', 'esta semana',
        'mañana mismo', 'manana mismo', 'lo antes posible', 'asap',
        'lo más pronto', 'lo mas pronto', 'pierdo', 'pierde', 'tengo prisa'
    ];

    function getMessages(comm) {
        // Recolecta cualquier campo de texto libre que el cliente haya escrito
        var bits = [];
        if (comm.comentarios) bits.push(comm.comentarios);
        if (comm.mensaje) bits.push(comm.mensaje);
        if (comm.observaciones) bits.push(comm.observaciones);
        if (comm.descripcion) bits.push(comm.descripcion);
        return bits.join(' ').trim();
    }

    function detectUrgency(text) {
        if (!text) return 0;
        var lower = text.toLowerCase();
        var hits = 0;
        URGENCY_TOKENS.forEach(function (tok) {
            if (lower.indexOf(tok) !== -1) hits++;
        });
        return hits;
    }

    /* ═══════════════════════════════════════════════════════════
       AI SIGNALS — analiza todas las comunicaciones del contacto
       ═══════════════════════════════════════════════════════════ */
    function aiSignals(contact, communications) {
        var comms = communications || (contact && contact.comms) || [];
        var sentimentScores = [];
        var entityTypes = {}; // tipo → cuántas veces apareció
        var urgencyHits = 0;
        var intentKinds = {};
        var totalMessageLength = 0;
        var messageCount = 0;

        comms.forEach(function (c) {
            if (c.kind) intentKinds[c.kind] = true;
            var text = getMessages(c);
            if (!text || text.length < 4) return;
            messageCount++;
            totalMessageLength += text.length;

            // J.1 — sentiment (sub-ms)
            if (window.AltorraAI) {
                var s = window.AltorraAI.sentiment(text);
                if (s && typeof s.score === 'number') {
                    sentimentScores.push(s.score);
                }
            }

            // J.2 — NER entities
            if (window.AltorraNER) {
                var ext = window.AltorraNER.extract(text);
                ext.entities.forEach(function (e) {
                    entityTypes[e.type] = (entityTypes[e.type] || 0) + 1;
                });
            }

            // urgencia
            urgencyHits += detectUrgency(text);
        });

        // Estadísticas de sentiment
        var avgSentiment = 0;
        var sentimentVariance = 0;
        if (sentimentScores.length > 0) {
            avgSentiment = sentimentScores.reduce(function (a, b) { return a + b; }, 0) / sentimentScores.length;
            if (sentimentScores.length > 1) {
                var sumSq = sentimentScores.reduce(function (acc, s) {
                    return acc + Math.pow(s - avgSentiment, 2);
                }, 0);
                sentimentVariance = Math.sqrt(sumSq / sentimentScores.length);
            }
        }

        // Entity richness — cuántos TIPOS distintos de entities (no cuenta duplicados)
        // Tipos relevantes para qualified lead: precio, ciudad, year, kilometraje, fecha
        var qualifyingTypes = ['precio', 'ciudad', 'year', 'kilometraje', 'fecha', 'marca', 'modelo'];
        var richness = 0;
        qualifyingTypes.forEach(function (t) {
            if (entityTypes[t]) richness++;
        });

        return {
            avgSentiment: avgSentiment,
            sentimentVariance: sentimentVariance,
            sentimentSamples: sentimentScores.length,
            entityTypes: entityTypes,
            entityRichness: richness,           // 0..7
            urgencyScore: urgencyHits,           // raw count
            intentDiversity: Object.keys(intentKinds).length,  // 0..3 (cita+solicitud+lead)
            messageCount: messageCount,
            avgMessageLength: messageCount ? Math.round(totalMessageLength / messageCount) : 0
        };
    }

    /* ═══════════════════════════════════════════════════════════
       ENRICHMENT — ajusta score base con señales AI
       ═══════════════════════════════════════════════════════════ */
    function enrichScore(baseScore, signals) {
        var adjustments = [];
        var delta = 0;

        // Sentiment positivo y consistente → bonus
        if (signals.sentimentSamples >= 2 && signals.avgSentiment > 0.3) {
            var sentBonus = signals.sentimentVariance < 0.3 ? 8 : 5;
            delta += sentBonus;
            adjustments.push({
                signal: 'sentiment',
                delta: sentBonus,
                reason: 'sentiment positivo' + (signals.sentimentVariance < 0.3 ? ' y consistente' : '')
            });
        }
        // Sentiment muy negativo → penalty
        else if (signals.sentimentSamples >= 2 && signals.avgSentiment < -0.3) {
            var sentPenalty = signals.sentimentVariance < 0.3 ? -10 : -6;
            delta += sentPenalty;
            adjustments.push({
                signal: 'sentiment',
                delta: sentPenalty,
                reason: 'sentiment negativo persistente'
            });
        }

        // Entity richness — cliente que da info concreta es lead caliente
        if (signals.entityRichness >= 4) {
            delta += 5;
            adjustments.push({
                signal: 'entities',
                delta: 5,
                reason: 'lead muy informativo (' + signals.entityRichness + ' tipos de datos)'
            });
        } else if (signals.entityRichness >= 2) {
            delta += 2;
            adjustments.push({
                signal: 'entities',
                delta: 2,
                reason: 'lead moderadamente informativo'
            });
        }

        // Urgencia → bonus moderado
        if (signals.urgencyScore >= 3) {
            delta += 7;
            adjustments.push({
                signal: 'urgency',
                delta: 7,
                reason: 'alta urgencia detectada'
            });
        } else if (signals.urgencyScore >= 1) {
            delta += 3;
            adjustments.push({
                signal: 'urgency',
                delta: 3,
                reason: 'urgencia detectada'
            });
        }

        // Cap total ajuste a ±15
        if (delta > 15) delta = 15;
        if (delta < -15) delta = -15;

        var adjustedScore = Math.max(0, Math.min(100, baseScore + delta));

        return {
            score: adjustedScore,
            baseScore: baseScore,
            delta: delta,
            adjustments: adjustments,
            signals: signals
        };
    }

    /* ═══════════════════════════════════════════════════════════
       EXPLAIN — texto humano para mostrar en CRM 360°
       ═══════════════════════════════════════════════════════════ */
    function explainEnrichment(enrichment) {
        if (!enrichment || !enrichment.adjustments || enrichment.adjustments.length === 0) {
            return 'Sin señales AI relevantes.';
        }
        return enrichment.adjustments.map(function (a) {
            var sign = a.delta > 0 ? '+' : '';
            return '(' + sign + a.delta + ') ' + a.reason;
        }).join(' · ');
    }

    /* ═══════════════════════════════════════════════════════════
       Public API
       ═══════════════════════════════════════════════════════════ */
    window.AltorraScoring = {
        aiSignals: aiSignals,
        enrichScore: enrichScore,
        explainEnrichment: explainEnrichment
    };
})();
