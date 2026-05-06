/**
 * ALTORRA CARS — Intent Classifier (rule-based, sub-ms)
 * ======================================================
 *
 * Clasifica la intención del cliente en categorías para que el bot
 * responda naturalmente en lugar de repetir un menú fallback.
 *
 * Inspirado en patrones de Drift/Intercom: intent buckets con
 * confidence + memoria conversacional para evitar respuestas robóticas.
 *
 * API pública:
 *   AltorraIntent.classify(text, context)
 *     → { intent, confidence, matchedKeyword }
 *   AltorraIntent.updateContext(context, intent, text)
 *     → mutates context with lastIntent, askedFor, discussedTopics
 *   AltorraIntent.shouldVary(context, intent)
 *     → bool, true si el bot ya repitió la misma respuesta en este turno
 *   AltorraIntent.intents
 *     → lista de intents soportados
 *
 * Privacy: 100% client-side. Cero llamadas a APIs externas.
 */
(function () {
    'use strict';
    if (window.AltorraIntent) return;

    /* ═══════════════════════════════════════════════════════════
       LEXICON — keywords por intent
       ═══════════════════════════════════════════════════════════ */
    var LEXICON = {
        greeting: [
            'hola', 'buenas', 'buenos dias', 'buenas tardes', 'buenas noches',
            'que tal', 'que hubo', 'que onda', 'que mas', 'qué tal',
            'qué hubo', 'saludos', 'hi', 'hey', 'hola como estas',
            'como estas', 'como va', 'que hay', 'aló'
        ],
        thanks: [
            'gracias', 'te agradezco', 'muchas gracias', 'mil gracias',
            'super', 'genial', 'perfecto gracias', 'bien gracias', 'thanks'
        ],
        goodbye: [
            'chao', 'adios', 'hasta luego', 'nos vemos', 'me voy',
            'hasta pronto', 'bye', 'listo gracias', 'eso era todo',
            'eso es todo', 'cierro'
        ],
        inventory_query: [
            'que carros', 'que autos', 'que vehiculos', 'que tienen',
            'cuales tienen', 'muestrame inventario', 'muéstrame inventario',
            'me muestras inventario', 'catalogo', 'catálogo',
            'inventario', 'que hay disponible', 'que disponible',
            'que tienes', 'me muestras los autos'
        ],
        pricing_query: [
            'cuanto cuesta', 'cuánto cuesta', 'que precio', 'qué precio',
            'precio del', 'precio de', 'cuanto vale', 'cuánto vale',
            'a como', 'a cómo', 'cuanto sale', 'me cobran',
            'valor del', 'valor de'
        ],
        availability_query: [
            'tienen disponible', 'lo tienen', 'esta disponible', 'está disponible',
            'hay stock', 'queda alguno', 'queda algun', 'ya se vendio',
            'ya se vendió', 'aun lo tienen', 'aún lo tienen'
        ],
        financiacion_query: [
            'financiacion', 'financiación', 'financiar', 'credito', 'crédito',
            'cuota', 'plazo', 'pagar a plazos', 'simulador', 'creditos',
            'cuanto pago', 'cuánto pago', 'cuanto seria de cuota',
            'cuotas', 'mensualidad'
        ],
        appointment_request: [
            'agendar', 'cita', 'visita', 'cuando puedo ir', 'cuando ir',
            'verlo en persona', 'ir a verlo', 'ver el carro', 'ver el auto',
            'test drive', 'prueba de manejo', 'manejarlo'
        ],
        sell_my_car: [
            'vender mi', 'vendo mi', 'quiero vender', 'consignar', 'consignación',
            'consignacion', 'compran carros', 'compran autos', 'me lo compran',
            'tomar mi auto', 'tomar mi carro', 'cambio mi', 'permuta'
        ],
        confirmation: [
            'si', 'sí', 'ok', 'okay', 'okey', 'dale', 'listo', 'va',
            'claro', 'por supuesto', 'obvio', 'de una', 'me sirve',
            'esta bien', 'está bien'
        ],
        negation: [
            'no', 'no me interesa', 'eso no', 'no gracias', 'paso',
            'no por ahora', 'mas tarde', 'más tarde', 'despues',
            'después', 'no es lo que busco'
        ],
        frustration: [
            'no entiendo', 'eso ya lo dijiste', 'no me sirve', 'eres un bot',
            'eres robot', 'inutil', 'inútil', 'esto no funciona',
            'me estas repitiendo', 'me estás repitiendo'
        ],
        ask_human: [
            'asesor', 'persona real', 'humano', 'ayuda real', 'no eres humano',
            'quiero hablar con alguien', 'pasame con', 'pásame con',
            'quien atiende', 'quién atiende'
        ]
    };

    /**
     * Normaliza el texto: lowercase, sin tildes (latin1), sin
     * signos de puntuación, espacios colapsados.
     */
    function normalize(text) {
        if (!text) return '';
        return String(text).toLowerCase()
            .normalize('NFD').replace(/[̀-ͯ]/g, '')
            .replace(/[¿?¡!.,;:()"']/g, ' ')
            .replace(/\s+/g, ' ').trim();
    }

    /**
     * classify — devuelve el mejor match de intent.
     * Score = longitud del keyword matched (más largo = más específico).
     * Si nada matchea, retorna intent='none' confidence=0.
     *
     * §22 Capa B: Si AltorraFuzzy está disponible, primero expande
     * sinónimos sobre el texto normalizado. Esto convierte
     * "qiero un coxe varato" → "comprar carro barato" antes de
     * intentar matchear keywords.
     */
    function classify(text, context) {
        var norm = normalize(text);
        if (!norm) return { intent: 'none', confidence: 0, matchedKeyword: null };

        // Capa B — expandir sinónimos antes del match
        var expanded = norm;
        if (window.AltorraFuzzy && window.AltorraFuzzy.expandSynonyms) {
            try { expanded = window.AltorraFuzzy.expandSynonyms(norm); }
            catch (e) { expanded = norm; }
        }

        var best = { intent: 'none', score: 0, keyword: null };
        Object.keys(LEXICON).forEach(function (intent) {
            LEXICON[intent].forEach(function (kw) {
                // Match exacto sobre el texto expandido (rápido)
                if (expanded.indexOf(kw) !== -1 && kw.length > best.score) {
                    best = { intent: intent, score: kw.length, keyword: kw };
                    return;
                }
                // Capa A — Fuzzy match si AltorraFuzzy disponible
                // Solo para keywords de >= 5 chars (evita falsos positivos)
                // y solo si NO hubo match exacto en el texto original
                if (kw.length >= 5 && window.AltorraFuzzy &&
                    norm.indexOf(kw) === -1 && expanded.indexOf(kw) === -1) {
                    if (window.AltorraFuzzy.match(kw, expanded, 0.82) &&
                        kw.length > best.score) {
                        // Score atenuado para fuzzy matches (penalty 0.85)
                        best = {
                            intent: intent,
                            score: Math.floor(kw.length * 0.85),
                            keyword: kw,
                            fuzzy: true
                        };
                    }
                }
            });
        });

        // Confidence proporcional a la cobertura del keyword sobre el mensaje
        var confidence = best.score > 0 ? Math.min(1, best.score / Math.max(norm.length, 6)) : 0;

        return {
            intent: best.intent,
            confidence: confidence,
            matchedKeyword: best.keyword,
            fuzzy: !!best.fuzzy,
            expanded: expanded
        };
    }

    /**
     * classifyMultiple — devuelve los TOP N intents con sus confidences
     * (Propuesta #2 del Offline Ultra Brain). Útil para detectar
     * ambigüedad y disparar clarification multi-turn.
     *
     * Retorna array ordenado por confidence desc:
     *   [{intent, confidence, matchedKeyword}, ...]
     */
    function classifyMultiple(text, context, topN) {
        var norm = normalize(text);
        if (!norm) return [];
        var n = topN || 3;

        var expanded = norm;
        if (window.AltorraFuzzy && window.AltorraFuzzy.expandSynonyms) {
            try { expanded = window.AltorraFuzzy.expandSynonyms(norm); }
            catch (e) {}
        }

        // Score por intent — guardamos el mejor keyword score por intent
        var scoresByIntent = {};
        Object.keys(LEXICON).forEach(function (intent) {
            LEXICON[intent].forEach(function (kw) {
                var score = 0;
                var keyword = null;
                if (expanded.indexOf(kw) !== -1) {
                    score = kw.length;
                    keyword = kw;
                } else if (kw.length >= 5 && window.AltorraFuzzy &&
                           window.AltorraFuzzy.match(kw, expanded, 0.82)) {
                    score = Math.floor(kw.length * 0.85);
                    keyword = kw;
                }
                if (score > 0 && (!scoresByIntent[intent] || score > scoresByIntent[intent].score)) {
                    scoresByIntent[intent] = { score: score, keyword: keyword };
                }
            });
        });

        // Convertir a array y rankear
        var ranked = Object.keys(scoresByIntent).map(function (intent) {
            var s = scoresByIntent[intent].score;
            return {
                intent: intent,
                confidence: Math.min(1, s / Math.max(norm.length, 6)),
                matchedKeyword: scoresByIntent[intent].keyword,
                score: s
            };
        });
        ranked.sort(function (a, b) { return b.score - a.score; });
        return ranked.slice(0, n);
    }

    /**
     * updateContext — actualiza la memoria conversacional.
     * Mutates `context` in-place. Llamar después de cada turno.
     *
     * §22 Capa C — Memory window con slots persistentes.
     * Mantiene los últimos 3 turnos en `turnHistory` y slots filled
     * (lastVehicleDiscussed, lastBrandDiscussed, etc.) para resolución
     * de anáfora ("¿de qué año es?" → busca lastVehicleDiscussed).
     *
     * Args:
     *   context — objeto session.context mutado in-place
     *   intent  — string del intent clasificado
     *   text    — string del mensaje del usuario
     *   extras  — opcional {entities, vehiclesShown, vehicleId}
     */
    function updateContext(context, intent, text, extras) {
        if (!context) return;
        var prev = context.lastIntent;
        context.lastIntent = intent;
        context.lastTurnAt = Date.now();
        context.discussedTopics = context.discussedTopics || [];
        context.bot_repeated_count = context.bot_repeated_count || 0;

        // Si el cliente repite el mismo intent (ej. spam de "hola"),
        // incrementamos el counter para que el bot pueda variar.
        if (prev === intent) {
            context.bot_repeated_count++;
        } else {
            context.bot_repeated_count = 0;
        }

        // Topics: agregamos categorías relevantes para continuidad
        var topicMap = {
            financiacion_query: 'financiacion',
            inventory_query: 'inventario',
            sell_my_car: 'venta',
            appointment_request: 'cita',
            pricing_query: 'precio'
        };
        var topic = topicMap[intent];
        if (topic && context.discussedTopics.indexOf(topic) === -1) {
            context.discussedTopics.push(topic);
        }

        // §22 Capa C — Slots persistentes
        context.slots = context.slots || {};
        if (extras && extras.entities) {
            var ent = extras.entities;
            if (ent.marca)         context.slots.lastBrandDiscussed = ent.marca;
            if (ent.categoria)     context.slots.lastCategoryDiscussed = ent.categoria;
            if (ent.year)          context.slots.lastYearDiscussed = ent.year;
            if (typeof ent.priceMax === 'number') {
                context.slots.lastPriceMaxDiscussed = ent.priceMax;
            }
        }
        if (extras && extras.vehicleId && extras.vehicleData) {
            context.slots.lastVehicleDiscussed = {
                id: extras.vehicleId,
                marca: extras.vehicleData.marca,
                modelo: extras.vehicleData.modelo,
                year: extras.vehicleData.year,
                precio: extras.vehicleData.precioOferta || extras.vehicleData.precio,
                kilometraje: extras.vehicleData.kilometraje,
                categoria: extras.vehicleData.categoria,
                transmision: extras.vehicleData.transmision
            };
        }
        if (extras && extras.vehiclesShown && extras.vehiclesShown.length) {
            context.slots.lastVehiclesShown = extras.vehiclesShown.slice(0, 5);
        }
        context.slots.lastQueryType = intent;

        // §22 Capa C — Turn history (window de 3)
        context.turnHistory = context.turnHistory || [];
        context.turnHistory.push({
            turn: context.turnHistory.length + 1,
            timestamp: Date.now(),
            intent: intent,
            text: (text || '').slice(0, 200),
            entities: (extras && extras.entities) || null
        });
        // Decay: solo conservamos los últimos 3 turnos Y dentro de 5 min
        var FIVE_MIN = 5 * 60 * 1000;
        var now = Date.now();
        context.turnHistory = context.turnHistory.filter(function (t) {
            return (now - t.timestamp) < FIVE_MIN;
        }).slice(-3);
    }

    /**
     * resolveAnaphora — para queries ambiguas tipo "¿y de qué año es?",
     * busca en los slots cuál fue el último vehículo discutido.
     * Retorna el slot relevante o null.
     */
    function resolveAnaphora(context) {
        if (!context || !context.slots) return null;
        // Si el último turno fue hace > 5 min, ya decayó
        if (context.lastTurnAt && (Date.now() - context.lastTurnAt) > 5 * 60 * 1000) {
            return null;
        }
        return {
            vehicle: context.slots.lastVehicleDiscussed || null,
            brand: context.slots.lastBrandDiscussed || null,
            category: context.slots.lastCategoryDiscussed || null,
            priceMax: context.slots.lastPriceMaxDiscussed || null,
            vehiclesShown: context.slots.lastVehiclesShown || []
        };
    }

    /**
     * shouldVary — true si la respuesta del bot DEBE variar para
     * no parecer robótica (cliente ya repitió 2+ veces el mismo intent).
     */
    function shouldVary(context, intent) {
        return context && context.bot_repeated_count >= 2;
    }

    window.AltorraIntent = {
        classify: classify,
        classifyMultiple: classifyMultiple,
        updateContext: updateContext,
        resolveAnaphora: resolveAnaphora,
        shouldVary: shouldVary,
        normalize: normalize,
        intents: Object.keys(LEXICON)
    };
})();
