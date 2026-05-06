/**
 * AltorraSmallTalk — Motor de small talk colombiano coloquial
 * §24 FASE 1 (Offline Ultra Brain 2.0).
 *
 * Detecta saludos, fillers, agradecimientos sueltos, risas, confirmaciones
 * cortas, etc. Y responde con variantes naturales que SIEMPRE incluyen una
 * pregunta abierta o invitación a la siguiente acción → evita el "muere ahí"
 * del bot rule-based clásico.
 *
 * Filosofía: el bot debe sonar como un asesor humano colombiano amable, NO
 * como un menú robótico. La ingeniería del Free Core debe convencer al
 * cliente que está hablando con una IA real cuando el LLM Premium está
 * apagado.
 *
 * API:
 *   AltorraSmallTalk.detect(text, sessionContext) → { text, action? } | null
 *   AltorraSmallTalk.PATTERNS                     → introspección admin
 *
 * Política:
 *   - Si NER detecta entity de inventario (marca/modelo/precio), NO
 *     matcheamos como small-talk → el flujo regular del intent classifier
 *     toma prioridad
 *   - Word boundaries `\b` para evitar matches en mid-word
 *   - Variantes random con bias hacia returningTurn cuando ya hubo greeting
 *     anterior en la sesión (memoria contextual)
 */
(function () {
    'use strict';
    if (window.AltorraSmallTalk) return;

    /* ─── Helpers ─────────────────────────────────────────────────── */
    function pickRandom(arr) {
        if (!arr || !arr.length) return '';
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function getFirstName(sessionContext) {
        if (!sessionContext) return '';
        if (sessionContext.profile && sessionContext.profile.nombre) {
            return String(sessionContext.profile.nombre).split(' ')[0] || '';
        }
        if (sessionContext.nombre) {
            return String(sessionContext.nombre).split(' ')[0] || '';
        }
        return '';
    }

    function hasGreetedBefore(sessionContext) {
        if (!sessionContext || !sessionContext.context) return false;
        var th = sessionContext.context.turnHistory || [];
        return th.some(function (t) { return t.intent === 'greeting' || t.intent === 'small_talk_greeting'; });
    }

    function lastTopicLabel(sessionContext) {
        if (!sessionContext || !sessionContext.context) return '';
        var topics = sessionContext.context.discussedTopics || [];
        if (topics.length === 0) return '';
        var last = topics[topics.length - 1];
        var labels = {
            inventario: 'lo del catálogo',
            precio: 'lo del precio',
            financiacion: 'lo de la financiación',
            cita: 'lo de agendar la cita',
            venta: 'lo de vender tu auto'
        };
        return labels[last] || 'lo que veníamos hablando';
    }

    /* ─── Detección de NER (defensa: no matchear small-talk si el
       cliente menciona marca/modelo/precio explícito) ───────────── */
    function hasInventoryEntity(text) {
        if (!window.AltorraNER || !window.AltorraNER.extract) return false;
        try {
            var ext = window.AltorraNER.extract(text);
            var s = ext && ext.summary ? ext.summary : null;
            if (!s) return false;
            return !!(s.marca || s.modelo || s.precio || s.year || s.kilometraje);
        } catch (e) { return false; }
    }

    /* ─── PATTERNS — el corazón del module ─────────────────────────── */
    // Cada pattern tiene:
    //   regex: cuándo aplica
    //   build(ctx): retorna {text, action?, intent?}
    //   priority: si dos patterns matchean, el de mayor priority gana
    //   skipIfEntity: true si NER detecta entity, NO aplicar
    var PATTERNS = [
        // ─── Saludos coloquiales ─────────────────────────────────
        {
            id: 'greeting',
            // hola, ola, holi, holaa, buenas, buenos dias, buenas tardes, buenas noches,
            // hey, qubo, q hubo, qhubo, que mas, que más, qué onda, saludos, hi, halo
            regex: /\b(h+ola+s?|h+oli+s?|buen[oa]s(\s+(d[ií]as|tardes|noches))?|hey+|q+u+b+o+|q\s*hubo|q'?hubo|qu[eé]\s*hubo|qu[eé]\s*m[aá]s|qu[eé]\s*onda|qu[eé]\s*tal|saludos|h+i+|hello|halo|holu)\b/i,
            priority: 90,
            skipIfEntity: true,
            build: function (text, ctx) {
                var firstName = getFirstName(ctx);
                var nombre = firstName ? ' ' + firstName : '';

                // Si el cliente ya saludó antes en la sesión, returning variant
                if (hasGreetedBefore(ctx)) {
                    var topic = lastTopicLabel(ctx);
                    var returning = [
                        '¡Volviste! 😄 ¿' + (topic ? 'Continuamos con ' + topic + '?' : 'En qué te ayudo ahora?'),
                        'Hola de nuevo' + nombre + '. ¿' + (topic ? 'Te ayudo con ' + topic + '?' : 'Qué necesitabas?'),
                        '¡Hey' + nombre + '! ¿Te quedó alguna duda?'
                    ];
                    return { text: pickRandom(returning), intent: 'small_talk_greeting' };
                }

                // First-time greetings — siempre con follow-up
                var first = [
                    '¡Hola' + nombre + '! 👋 Todo excelente por acá. ¿Qué te trae por aquí — buscas algún carro en particular?',
                    '¡Qué hubo' + nombre + '! Aquí estamos para ayudarte. ¿Andás buscando un auto, financiación o algo específico?',
                    'Hola' + nombre + ' 👋 Bien todo por acá. Cuéntame, ¿en qué te ayudo hoy?',
                    '¡Buenas' + nombre + '! Listo para ayudarte. ¿Qué andás necesitando — un carro, info de financiación, agendar una visita?'
                ];
                return { text: pickRandom(first), intent: 'small_talk_greeting' };
            }
        },

        // ─── "Como estas / como vas" ──────────────────────────────
        {
            id: 'casual_check',
            regex: /\bc[oó]mo\s*(est[aá]s|est[aá]\s*todo|va(s|n)?|te\s*va|andas?|vamos|andamos)\b/i,
            priority: 85,
            skipIfEntity: true,
            build: function (text, ctx) {
                var firstName = getFirstName(ctx);
                var nombre = firstName ? ' ' + firstName : '';
                var responses = [
                    'Todo bien por acá' + nombre + ', gracias por preguntar 🙏 ¿Y vos? ¿Qué te trae por Altorra?',
                    '¡Excelente! Listo para ayudarte. ¿Qué necesitas — info de carros, financiación, una visita?',
                    'Aquí súper, atendiendo a clientes como vos. ¿En qué te puedo ayudar?'
                ];
                return { text: pickRandom(responses), intent: 'small_talk_check' };
            }
        },

        // ─── Agradecimientos sueltos ────────────────────────────
        {
            id: 'thanks',
            regex: /^\s*(gracias|graci|graciaaas?|much[ao]s?\s*gracias|de+\s*nada|mil\s*gracias|gentil|amable|muy\s*amable)\s*\.?\s*$/i,
            priority: 80,
            skipIfEntity: false,
            build: function (text, ctx) {
                var firstName = getFirstName(ctx);
                var nombre = firstName ? ' ' + firstName : '';
                var topic = lastTopicLabel(ctx);
                var responses = topic ? [
                    '¡De nada' + nombre + '! Cualquier cosa de ' + topic + ', acá estoy 🙌',
                    'Para servirte. Si necesitas algo más, escribime.',
                    '¡Un gusto' + nombre + '! ¿Algo más que necesites?'
                ] : [
                    '¡De nada' + nombre + '! Cualquier otra cosa, aquí estoy 🙌',
                    'Para servirte. Si necesitas algo más, escribime.',
                    '¡Un gusto! ¿En qué más te ayudo?'
                ];
                return { text: pickRandom(responses), intent: 'small_talk_thanks' };
            }
        },

        // ─── Despedidas ────────────────────────────────────────
        {
            id: 'goodbye',
            regex: /^\s*(chao|adios|adi[oó]s|hasta\s*(luego|pronto|ma[nñ]ana)|nos\s*vemos|bye|me\s*voy|ya\s*me\s*voy)\s*\.?\s*$/i,
            priority: 75,
            skipIfEntity: false,
            build: function (text, ctx) {
                var firstName = getFirstName(ctx);
                var nombre = firstName ? ' ' + firstName : '';
                var responses = [
                    '¡Hasta pronto' + nombre + '! 👋 Cuando quieras volver, aquí estaré.',
                    '¡Chao' + nombre + '! Si te decides por algún carro o tienes dudas, vuelve cuando quieras.',
                    '¡Que estés bien' + nombre + '! Te esperamos por acá.'
                ];
                return { text: pickRandom(responses), intent: 'small_talk_goodbye' };
            }
        },

        // ─── Risas / fillers emocionales ──────────────────────
        {
            id: 'laughter',
            regex: /\b(j+a+(j+a*)+|j+e+j+e*|haha+|hehe+|lol)\b/i,
            priority: 60,
            skipIfEntity: true,
            build: function (text, ctx) {
                return { text: pickRandom([
                    '😄 ¿En qué seguimos?',
                    '¡Jeje! Cuéntame, ¿qué necesitas?',
                    '😎 ¿Te ayudo con algo más?'
                ]), intent: 'small_talk_filler' };
            }
        },

        // ─── Polite filler standalone ─────────────────────────
        {
            id: 'polite',
            regex: /^\s*(porfa(vor)?|por\s*favor|amable|gentil|bueno+|buen\s*trato|perfecto|chevere|bacano|de\s*una)\s*\.?\s*$/i,
            priority: 55,
            skipIfEntity: false,
            build: function (text, ctx) {
                return { text: pickRandom([
                    'Con todo el gusto 😊 ¿En qué te ayudo?',
                    'Listo, dime qué necesitás.',
                    '¡Claro! Cuéntame.'
                ]), intent: 'small_talk_filler' };
            }
        }
    ];

    /* ─── detect — entry point ───────────────────────────────────── */
    function detect(text, sessionContext) {
        if (!text || typeof text !== 'string') return null;
        var trimmed = text.trim();
        if (!trimmed) return null;

        var entityPresent = null; // lazy compute

        // Encontrar pattern de mayor priority que matchee
        var sorted = PATTERNS.slice().sort(function (a, b) { return b.priority - a.priority; });
        for (var i = 0; i < sorted.length; i++) {
            var p = sorted[i];
            if (p.regex.test(trimmed)) {
                if (p.skipIfEntity) {
                    if (entityPresent === null) entityPresent = hasInventoryEntity(trimmed);
                    if (entityPresent) continue;
                }
                try {
                    var resp = p.build(trimmed, sessionContext);
                    if (resp && resp.text) {
                        resp.matchedPattern = p.id;
                        return resp;
                    }
                } catch (e) {
                    console.warn('[SmallTalk] build threw:', e);
                }
            }
        }
        return null;
    }

    /* ─── Public API ─────────────────────────────────────────────── */
    window.AltorraSmallTalk = {
        detect: detect,
        PATTERNS: PATTERNS,
        _hasInventoryEntity: hasInventoryEntity
    };
})();
