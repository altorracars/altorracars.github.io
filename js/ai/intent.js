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
    // §24 FASE 1 — Lexicon enriquecido x4 con vocabulario coloquial colombiano,
    // formas conjugadas verbales (manejadas por stemmize), formas alternas con
    // typos comunes, y frases compuestas (n-grams).
    var LEXICON = {
        greeting: [
            // Saludos formales
            'hola', 'buenas', 'buenos dias', 'buenas tardes', 'buenas noches',
            'saludos', 'hi', 'hey', 'hello',
            // Coloquiales colombianos
            'que tal', 'qué tal', 'que hubo', 'qué hubo', 'qubo', 'qhubo',
            'que onda', 'qué onda', 'que mas', 'qué más',
            'hola que mas', 'hola que tal', 'hola como estas',
            'como estas', 'cómo estás', 'como va', 'cómo va',
            'que hay', 'qué hay', 'aló', 'alo',
            'parce', 'parcero',
            // Saludos con extensión emotiva
            'hola mi pana', 'hola hermano', 'hola amigo',
            'que mas pues', 'qué más pues', 'todo bien'
        ],
        thanks: [
            'gracias', 'graci', 'te agradezco', 'muchas gracias', 'mil gracias',
            'mil graci', 'muchísimas gracias', 'muy amable', 'amable',
            'super', 'súper', 'genial', 'excelente', 'perfecto gracias',
            'bien gracias', 'thanks', 'thx', 'gentil', 'mil veces gracias'
        ],
        goodbye: [
            'chao', 'adios', 'adiós', 'hasta luego', 'nos vemos',
            'me voy', 'hasta pronto', 'hasta mañana', 'bye',
            'listo gracias', 'eso era todo', 'eso es todo', 'cierro',
            'ya me voy', 'tengo que irme', 'me retiro'
        ],
        inventory_query: [
            // Originales
            'que carros', 'que autos', 'que vehiculos', 'que tienen',
            'cuales tienen', 'muestrame inventario', 'muéstrame inventario',
            'me muestras inventario', 'catalogo', 'catálogo',
            'inventario', 'que hay disponible', 'que disponible',
            'que tienes', 'me muestras los autos',
            // §24 FASE 1 — keywords colombianos coloquiales
            'tienen carros', 'tienen autos', 'tienen vehiculos', 'tienen disponible',
            'manejan carros', 'manejan autos', 'venden carros', 'venden autos',
            'tendras', 'tendrás', 'tendran', 'tendrán',
            'que manejan', 'qué manejan', 'que venden', 'qué venden',
            'opciones', 'alternativas', 'me ensenas', 'me enseñas',
            'mostrame', 'muéstrame', 'enseñame', 'ensename',
            'vea', 'ver carros', 'ver autos', 'ver inventario',
            'me muestras', 'me ensenas autos', 'me enseñas autos',
            'autos por ahi', 'carros por ahi', 'autos por ahí', 'carros por ahí',
            'vehiculos por ahi', 'qué hay por ahi', 'que hay por ahi',
            'que ofrecen', 'qué ofrecen', 'ofrecen carros', 'ofrecen autos',
            'queda algo', 'queda algún', 'algun carro', 'algún carro',
            'tienen algo', 'hay algo'
        ],
        pricing_query: [
            // Originales
            'cuanto cuesta', 'cuánto cuesta', 'que precio', 'qué precio',
            'precio del', 'precio de', 'cuanto vale', 'cuánto vale',
            'a como', 'a cómo', 'cuanto sale', 'me cobran',
            'valor del', 'valor de',
            // §24 FASE 1 — coloquial COL
            'en cuanto', 'en cuánto', 'cuanto piden', 'cuánto piden',
            'cuanto pide', 'cuánto pide', 'cuesta cuanto', 'sale cuanto',
            'precio final', 'qué tan caro', 'que tan caro',
            'plata', 'cuanto plata', 'cuanta plata', 'cuánta plata',
            'lukas', 'palos', 'kilos', 'millones', 'precio justo',
            'esta caro', 'está caro', 'es caro', 'es barato', 'esta barato'
        ],
        availability_query: [
            'tienen disponible', 'lo tienen', 'esta disponible', 'está disponible',
            'hay stock', 'queda alguno', 'queda algun', 'queda algún',
            'ya se vendio', 'ya se vendió', 'aun lo tienen', 'aún lo tienen',
            // §24 FASE 1
            'lo siguen teniendo', 'todavia esta', 'todavía está',
            'aun esta', 'aún está', 'no se vendió', 'no se ha vendido'
        ],
        financiacion_query: [
            'financiacion', 'financiación', 'financiar', 'credito', 'crédito',
            'cuota', 'plazo', 'pagar a plazos', 'simulador', 'creditos',
            'cuanto pago', 'cuánto pago', 'cuanto seria de cuota',
            'cuotas', 'mensualidad', 'mensualidades',
            // §24 FASE 1
            'plan de pagos', 'a cuotas', 'pagar mensual', 'mensual',
            'a plazos', 'abono', 'cuota inicial', 'inicial', 'enganche',
            'banco', 'prestamo', 'préstamo', 'aprobacion', 'aprobación',
            'me prestan', 'financian', 'financien', 'financiamiento',
            'ya me prestan', 'me alcanza para', 'cuanto me prestan'
        ],
        appointment_request: [
            'agendar', 'cita', 'visita', 'cuando puedo ir', 'cuando ir',
            'verlo en persona', 'ir a verlo', 'ver el carro', 'ver el auto',
            'test drive', 'prueba de manejo', 'manejarlo',
            // §24 FASE 1
            'cuándo puedo ir', 'cuándo ir', 'pasar a verlo', 'paso a verlo',
            'voy a verlo', 'visitarlo', 'conocer', 'conocerlo',
            'puedo ir', 'puedo pasar', 'cuándo abren', 'cuando abren',
            'horario', 'horarios', 'donde están', 'dónde están',
            'donde quedan', 'dónde quedan', 'ubicación', 'ubicacion',
            'agendame', 'agéndame', 'reservar', 'separar', 'apartar'
        ],
        sell_my_car: [
            'vender mi', 'vendo mi', 'quiero vender', 'consignar', 'consignación',
            'consignacion', 'compran carros', 'compran autos', 'me lo compran',
            'tomar mi auto', 'tomar mi carro', 'cambio mi', 'permuta',
            // §24 FASE 1
            'comprarian', 'comprarían', 'me compran',
            'cuanto me dan por', 'cuánto me dan por',
            'me reciben', 'tomar como parte de pago', 'me lo cambian',
            'avaluó', 'avalúo', 'avaluar', 'me avalúan',
            'mi carro', 'mi auto', 'mi vehiculo'
        ],
        confirmation: [
            // Originales
            'si', 'sí', 'ok', 'okay', 'okey', 'dale', 'listo', 'va',
            'claro', 'por supuesto', 'obvio', 'de una', 'me sirve',
            'esta bien', 'está bien',
            // §24 FASE 1 — colombianismos
            'hagale', 'hágale', 'de una', 'parce', 'bacano', 'chevere',
            'chévere', 'genial', 'perfecto', 'sirve', 'cuadrame',
            'cuadrame eso', 'va', 'va pues', 'sii', 'siiii',
            'simon', 'simón', 'eso eso', 'el primero', 'el segundo',
            'el tercero', 'ese', 'este', 'aquel'
        ],
        negation: [
            'no', 'no me interesa', 'eso no', 'no gracias', 'paso',
            'no por ahora', 'mas tarde', 'más tarde', 'despues',
            'después', 'no es lo que busco',
            // §24 FASE 1
            'nope', 'nada', 'no quiero', 'olvidalo', 'olvídalo',
            'mejor no', 'no por el momento', 'ahora no', 'luego',
            'tal vez despues', 'tal vez después'
        ],
        frustration: [
            'no entiendo', 'eso ya lo dijiste', 'no me sirve', 'eres un bot',
            'eres robot', 'inutil', 'inútil', 'esto no funciona',
            'me estas repitiendo', 'me estás repitiendo',
            // §24 FASE 1
            'esto es horrible', 'que pereza', 'qué pereza', 'no sirves',
            'esto es una basura', 'no me ayudas', 'no me entiendes',
            'estas repitiendo lo mismo', 'siempre lo mismo'
        ],
        ask_human: [
            'asesor', 'persona real', 'humano', 'ayuda real', 'no eres humano',
            'quiero hablar con alguien', 'pasame con', 'pásame con',
            'quien atiende', 'quién atiende',
            // §24 FASE 1
            'persona', 'agente', 'vendedor', 'alguien real',
            'comuníqueme con', 'comuniqueme con', 'pasame a', 'pásame a',
            'quiero hablar con un humano', 'quiero un asesor',
            'una persona', 'un asesor', 'un agente', 'me atienden ustedes',
            'hablar con alguien', 'que me atienda alguien'
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

        // §24 FASE 1 — generar n-grams del texto para matching de frases
        // compuestas como "carros por ahi" o "tendras autos"
        var ngrams = [];
        if (window.AltorraFuzzy && window.AltorraFuzzy.generateNgrams) {
            try { ngrams = window.AltorraFuzzy.generateNgrams(expanded, [2, 3]); }
            catch (e) {}
        }

        // §24 FASE 1 — stemmizar el texto para reconocer formas verbales
        // conjugadas. "tendras carros" → tokens stems = ['ten', 'carro']
        var stemmedTokens = [];
        if (window.AltorraFuzzy && window.AltorraFuzzy.stemmize && window.AltorraFuzzy.tokenize) {
            try {
                stemmedTokens = window.AltorraFuzzy.tokenize(expanded)
                    .map(window.AltorraFuzzy.stemmize);
            } catch (e) {}
        }
        var stemmedText = stemmedTokens.join(' ');

        var best = { intent: 'none', score: 0, keyword: null };
        Object.keys(LEXICON).forEach(function (intent) {
            LEXICON[intent].forEach(function (kw) {
                // Match exacto sobre el texto expandido (rápido)
                if (expanded.indexOf(kw) !== -1 && kw.length > best.score) {
                    best = { intent: intent, score: kw.length, keyword: kw };
                    return;
                }
                // §24 FASE 1 — match contra n-grams (frases compuestas)
                if (kw.indexOf(' ') !== -1 && ngrams.indexOf(kw) !== -1 && kw.length > best.score) {
                    best = { intent: intent, score: kw.length, keyword: kw, ngram: true };
                    return;
                }
                // §24 FASE 1 — match contra texto stemmizado (formas verbales)
                if (stemmedText && stemmedText.indexOf(kw) !== -1 && kw.length > best.score) {
                    best = { intent: intent, score: Math.floor(kw.length * 0.92), keyword: kw, stemmed: true };
                    return;
                }
                // §24 FASE 1 — Fuzzy match adaptativo (threshold según length)
                // Reemplaza el match clásico con threshold fijo 0.82 → ahora
                // usa thresholds 0.65-0.80 según length de la palabra.
                if (kw.length >= 4 && window.AltorraFuzzy &&
                    norm.indexOf(kw) === -1 && expanded.indexOf(kw) === -1 &&
                    ngrams.indexOf(kw) === -1) {
                    var matchFn = window.AltorraFuzzy.matchAdaptive || window.AltorraFuzzy.match;
                    if (matchFn(kw, expanded) && kw.length > best.score) {
                        best = {
                            intent: intent,
                            score: Math.floor(kw.length * 0.82),
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
            vehiclesShown: context.slots.lastVehiclesShown || [],
            pendingChoice: context.slots.pendingChoice || null
        };
    }

    /**
     * §24 FASE 2 — parseOrdinal: extrae índice ordinal de un texto.
     * "el primero" → 0, "el segundo" → 1, "el tercero" → 2,
     * "el ultimo" → -1, "ese" / "este" → 0 (asume el más reciente)
     */
    function parseOrdinal(text) {
        if (!text) return null;
        var n = String(text).toLowerCase();
        // Ordinales explícitos
        if (/\b(primer[oa]?|1er[oa]?|el\s*1)\b/.test(n)) return 0;
        if (/\b(segund[oa]|2d[oa]|el\s*2)\b/.test(n)) return 1;
        if (/\b(tercer[oa]?|3er[oa]?|el\s*3)\b/.test(n)) return 2;
        if (/\b(cuart[oa]|4t[oa]|el\s*4)\b/.test(n)) return 3;
        if (/\b(quint[oa]|5t[oa]|el\s*5)\b/.test(n)) return 4;
        if (/\b(ultim[oa]|últim[oa])\b/.test(n)) return -1;
        // Pronombres demostrativos cortos sin ordinal explícito → 0
        if (/^\s*(ese|esa|este|esta|aquel|aquella|el|ese mismo|el mismo)\s*\.?\s*$/.test(n)) return 0;
        return null;
    }

    /**
     * §24 FASE 2 — resolvePronominalChoice: para respuestas cortas como
     * "el primero", "ese", "el segundo" que el cliente da después de
     * que el bot ofreció opciones.
     *
     * Retorna { resolved, source } donde:
     *   - source 'pendingChoice' = el bot ofreció opciones explícitas
     *     (ej. "¿SUV o Sedán?") → resolved es el string literal
     *   - source 'vehiclesShown' = el bot listó vehículos →
     *     resolved es el objeto vehículo del inventario
     *   - null si no se pudo resolver
     */
    function resolvePronominalChoice(text, context) {
        if (!context || !context.slots) return null;
        var ord = parseOrdinal(text);
        if (ord === null) return null;

        // 1. ¿Hay pendingChoice activo del último turno bot?
        var pending = context.slots.pendingChoice;
        if (pending && Array.isArray(pending.options) && pending.options.length > 0) {
            // pendingChoice expira a los 5 min como el resto de slots
            if (pending.timestamp && (Date.now() - pending.timestamp) > 5 * 60 * 1000) {
                pending = null;
            }
            if (pending) {
                var idx = ord >= 0 ? ord : pending.options.length + ord;
                if (idx >= 0 && idx < pending.options.length) {
                    return {
                        resolved: pending.options[idx],
                        source: 'pendingChoice',
                        contextLabel: pending.context || null
                    };
                }
            }
        }

        // 2. ¿Hay vehiclesShown del último turno?
        var vs = context.slots.lastVehiclesShown;
        if (Array.isArray(vs) && vs.length > 0) {
            var vIdx = ord >= 0 ? ord : vs.length + ord;
            if (vIdx >= 0 && vIdx < vs.length) {
                var vehicleId = vs[vIdx];
                // Lookup en vehicleDB si está disponible
                var vehicle = null;
                if (window.AltorraInventorySearch && window.AltorraInventorySearch.lookupById) {
                    vehicle = window.AltorraInventorySearch.lookupById(vehicleId);
                }
                return {
                    resolved: vehicle || vehicleId,
                    source: 'vehiclesShown'
                };
            }
        }

        return null;
    }

    /**
     * §24 FASE 2 — setPendingChoice: el bot llama esto cuando hace una
     * pregunta que ofrece opciones (ej. "¿SUV o Sedán?", "¿Toyota o Mazda?").
     * El cliente puede responder "el primero" / "el segundo" y resolveAnaphora
     * lo entiende.
     *
     * Args:
     *   context — session.context (mutado in-place)
     *   options — array de strings ("SUV", "Sedán")
     *   contextLabel — 'category_pick' / 'brand_pick' / 'vehicle_pick' / etc
     */
    function setPendingChoice(context, options, contextLabel) {
        if (!context || !Array.isArray(options) || options.length === 0) return;
        context.slots = context.slots || {};
        context.slots.pendingChoice = {
            options: options.slice(0, 5),  // cap a 5 opciones
            context: contextLabel || null,
            timestamp: Date.now()
        };
    }

    /**
     * §24 FASE 2 — clearPendingChoice: limpia el pendingChoice
     * (cuando el bot ya resolvió la elección o el cliente cambió de tema)
     */
    function clearPendingChoice(context) {
        if (context && context.slots) {
            context.slots.pendingChoice = null;
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
        classifyMultiple: classifyMultiple,
        updateContext: updateContext,
        resolveAnaphora: resolveAnaphora,
        // §24 FASE 2 — Anáfora 2.0 + pendingChoice
        resolvePronominalChoice: resolvePronominalChoice,
        parseOrdinal: parseOrdinal,
        setPendingChoice: setPendingChoice,
        clearPendingChoice: clearPendingChoice,
        shouldVary: shouldVary,
        normalize: normalize,
        intents: Object.keys(LEXICON)
    };
})();
