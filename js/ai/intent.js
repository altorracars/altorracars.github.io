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
     */
    function classify(text, context) {
        var norm = normalize(text);
        if (!norm) return { intent: 'none', confidence: 0, matchedKeyword: null };

        var best = { intent: 'none', score: 0, keyword: null };
        Object.keys(LEXICON).forEach(function (intent) {
            LEXICON[intent].forEach(function (kw) {
                if (norm.indexOf(kw) !== -1 && kw.length > best.score) {
                    best = { intent: intent, score: kw.length, keyword: kw };
                }
            });
        });

        // Confidence proporcional a la cobertura del keyword sobre el mensaje
        var confidence = best.score > 0 ? Math.min(1, best.score / Math.max(norm.length, 6)) : 0;

        return {
            intent: best.intent,
            confidence: confidence,
            matchedKeyword: best.keyword
        };
    }

    /**
     * updateContext — actualiza la memoria conversacional.
     * Mutates `context` in-place. Llamar después de cada turno.
     */
    function updateContext(context, intent, text) {
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
        updateContext: updateContext,
        shouldVary: shouldVary,
        normalize: normalize,
        intents: Object.keys(LEXICON)
    };
})();
