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
        },

        // ─── §26.2 Casual Probing — "qué haces", "de qué te las tiras" ────
        {
            id: 'casual_probing',
            regex: /\b(qu[eé]\s+haces|qu[eé]\s+hac[eé]s|de\s+qu[eé]\s+te\s+las?\s+tiras?|cu[aá]l\s+es\s+tu\s+negocio|qu[eé]\s+vendes|qu[eé]\s+vend[eé]s|en\s+qu[eé]\s+trabajas|qu[eé]\s+haces\s+ac[aá]|c[oó]mo\s+funciona\s+esto|qu[eé]\s+es\s+esto|para\s+qu[eé]\s+sirves)\b/i,
            priority: 70,
            skipIfEntity: true,
            build: function (text, ctx) {
                var firstName = getFirstName(ctx);
                var nombre = firstName ? firstName + ', ' : '';
                var responses = [
                    'Soy ALTOR' + (nombre ? ', ' + nombre : '') + ' 🚗 Te ayudo a encontrar tu próximo carro en Altorra Cars (Cartagena). Tenemos usados, semi-nuevos, financiación con bancos aliados, peritaje gratuito y consignación. ¿Qué andás buscando?',
                    'Acá soy el asistente virtual de Altorra Cars. Trabajo 24/7 ayudando a la gente a encontrar su carro ideal: te muestro inventario, te explico financiación, agendo visitas, y si te gusta algo te conecto con un asesor humano. ¿Te muestro lo que tenemos?',
                    'Soy ALTOR de Altorra Cars 😎 Vendemos carros usados y semi-nuevos en Cartagena. También consignación (vendemos tu auto por vos), peritajes gratis, financiación. ¿Te ayudo con algo en particular?'
                ];
                return { text: pickRandom(responses), intent: 'small_talk_probing' };
            }
        },

        // ─── §26.2 Afirmaciones / "todo bien" ────────────────────
        {
            id: 'affirm_filler',
            regex: /^\s*(todo\s+(bien|en\s+orden|tranqui|tranquilo|chevere|bacano)|s[uú]per|bacano|chevere|excelente|genial|perfecto|de\s+pelos|fant[aá]stico|brutal)\s*\.?\s*\!*\s*$/i,
            priority: 65,
            skipIfEntity: true,
            build: function (text, ctx) {
                var responses = [
                    '¡Genial! 🙌 ¿Querés que te muestre el catálogo o tenés algo específico en mente?',
                    '¡Súper! Cuéntame qué andás buscando — puedo mostrarte autos, explicarte financiación o agendar una visita.',
                    'Perfecto. ¿Te muestro qué tenemos disponible esta semana?'
                ];
                return { text: pickRandom(responses), intent: 'small_talk_affirm' };
            }
        },

        // ─── §26.2 Anáfora "ya lo vi" / "no lo has mostrado" ──────
        {
            id: 'seen_or_not',
            regex: /\b(ya\s+lo\s+vi|ya\s+la\s+vi|ya\s+lo\s+conozco|ya\s+(la|lo)\s+vimos|no\s+(me\s+)?(lo|la)\s+has?\s+(ense[ñn]ado|mostrado|pasado|enviado|compartido)|no\s+(me\s+)?(la|lo|me)\s+has?\s+ense[ñn]ad|no\s+s[eé]\s+si\s+(no\s+)?(me\s+)?la\s+has?\s+ense[ñn]ado)\b/i,
            priority: 72,
            skipIfEntity: false,
            build: function (text, ctx) {
                // Si hay vehículo discutido recientemente, ofrecer otro
                var lastVehicle = ctx && ctx.context && ctx.context.slots && ctx.context.slots.lastVehicleDiscussed;
                if (lastVehicle && lastVehicle.marca) {
                    var v = lastVehicle.marca + ' ' + (lastVehicle.modelo || '') + ' ' + (lastVehicle.year || '');
                    return {
                        text: 'Dale, ya viste ' + v.trim() + '. ¿Te muestro otras opciones similares o tenés alguna marca/modelo distinto en mente?',
                        intent: 'small_talk_anaphora_seen'
                    };
                }
                return {
                    text: 'Listo. ¿Querés que te muestre opciones distintas? Decime: ¿tenés alguna marca preferida, presupuesto o uso (ciudad, familia, trabajo)?',
                    intent: 'small_talk_anaphora_seen'
                };
            }
        },

        // ─── §26.2 Show inventory short ─────────────────────────
        {
            id: 'show_inventory_short',
            // "muéstrame", "muestrame autos", "ver carros", "qué tenés", "enseñame"
            regex: /^(\s*(mu[eé]strame|enseñame|ens[eé]ñame|muestrame|muestra|enseña|ense[ñn]a|ver|veamos|a\s+ver|qu[eé]\s+(tienes|ten[eé]s|hay|manejas?|manejan|venden|venden|ofrecen)|opciones|alternativas|mostrame))[\s\.!?]*$/i,
            priority: 78,
            skipIfEntity: false, // queremos que funcione incluso si menciona marca
            build: function (text, ctx) {
                // Devuelve hint para que generateBotResponse trate como inventory_query vacío
                return {
                    text: '__INVENTORY_QUERY__',
                    action: 'show_inventory',
                    intent: 'inventory_query'
                };
            }
        },

        // ─── §26.2 Help general ─────────────────────────────────
        {
            id: 'help_general',
            regex: /^\s*(ayuda|ay[uú]dame|ayudame|necesito\s+ayuda|me\s+pod[eé]s\s+ayudar|me\s+puedes\s+ayudar|no\s+s[eé]\s+qu[eé]\s+hacer|estoy\s+perdid[ao])\s*\.?\?*\s*$/i,
            priority: 68,
            skipIfEntity: false,
            build: function (text, ctx) {
                return {
                    text: '¡Por supuesto! 🙌 Te puedo ayudar con varias cosas:\n\n• 🚗 Mostrarte autos disponibles\n• 💰 Información de precios y financiación\n• 📅 Agendar una visita o test drive\n• 💵 Si querés vender tu auto en consignación\n• 🛠️ Peritaje gratuito\n• 👨 Conectarte con un asesor humano\n\n¿Cuál te interesa?',
                    intent: 'small_talk_help'
                };
            }
        },

        // ─── §26.2 ¿Eres bot? / ¿Eres humano? ─────────────────────
        {
            id: 'bot_question',
            regex: /\b(eres\s+(un\s+)?(bot|robot|m[aá]quina|ia|inteligencia\s+artificial|persona|humano|real)|sos\s+(un\s+)?(bot|robot|m[aá]quina|persona|humano)|hablo\s+con\s+(un\s+)?(bot|robot|persona|humano)|qui[eé]n\s+eres|qu[eé]\s+eres|con\s+qui[eé]n\s+hablo)\b/i,
            priority: 75,
            skipIfEntity: true,
            build: function (text, ctx) {
                return {
                    text: 'Soy ALTOR 🤖 — el asistente virtual con IA de Altorra Cars. Te puedo ayudar con consultas rápidas, mostrarte el inventario y agendar visitas. Si querés hablar con un asesor humano, decime "hablar con asesor" y te conecto al instante 🙌',
                    intent: 'small_talk_bot_question'
                };
            }
        },

        // ─── §26.2 Ubicación ────────────────────────────────────
        {
            id: 'location',
            regex: /\b(d[oó]nde\s+(est[aá]n|queda(n)?|ubicad[oa]s)|d[oó]nde\s+los\s+ubico|ubicaci[oó]n|direcci[oó]n|sede|local|c[oó]mo\s+llego|por\s+d[oó]nde\s+(est[aá]n|queda)|en\s+qu[eé]\s+ciudad)\b/i,
            priority: 73,
            skipIfEntity: false,
            build: function (text, ctx) {
                return {
                    text: 'Estamos en **Cartagena, Bolívar** 📍 Si querés coordinar una visita, te puedo agendar con un asesor para que te dé la dirección exacta y horario. ¿Te interesa?',
                    intent: 'small_talk_location'
                };
            }
        },

        // ─── §26.2 Horario ──────────────────────────────────────
        {
            id: 'schedule',
            regex: /\b(qu[eé]\s+horario|cu[aá]ndo\s+(abren|atienden|trabajan|est[aá]n|abre)|hasta\s+qu[eé]\s+hora|atienden\s+hoy|horario\s+de\s+atenci[oó]n|hoy\s+(est[aá]n|atienden)|abren\s+hoy)\b/i,
            priority: 70,
            skipIfEntity: false,
            build: function (text, ctx) {
                return {
                    text: 'Atendemos de **Lunes a Sábado de 8:00 AM a 6:00 PM** 🕐 Domingos cerrado. ¿Querés agendar una visita en algún horario en particular?',
                    intent: 'small_talk_schedule'
                };
            }
        },

        // ─── §26.2 Teléfono / Contacto ──────────────────────────
        {
            id: 'phone',
            regex: /\b(qu[eé]\s+(es\s+)?(el\s+)?(tel[eé]fono|n[uú]mero|cel(ular)?|whats(app)?)|c[oó]mo\s+(los?\s+)?(contacto|llamo)|tienen\s+whatsapp|hay\s+whatsapp)\b/i,
            priority: 70,
            skipIfEntity: false,
            build: function (text, ctx) {
                return {
                    text: 'Nuestro celular es **+57 323 501 6747** 📲 Tenemos WhatsApp activo. Si preferís, puedo conectarte ahora mismo con un asesor humano por este chat — solo decime "hablar con asesor".',
                    intent: 'small_talk_contact'
                };
            }
        },

        // ─── §26.2 Negociación corta — "rebajita", "mínima" ──────
        {
            id: 'negotiation_short',
            regex: /\b(rebaj(a|ita|en|an)|cu[aá]l\s+(es\s+)?(el\s+)?(precio\s+)?(m[ií]nimo|firme|final|justo|menor|m[aá]s\s+bajo)|hasta\s+cu[aá]nto\s+(baj(an|amos|a)|llegamos)|le\s+hago\s+\$?\d|le\s+ofrezco|negociable)\b/i,
            priority: 76,
            skipIfEntity: false,
            build: function (text, ctx) {
                var responses = [
                    'Para hablar de precios finales y rebajas necesitás conectar con un asesor humano — ellos manejan los descuentos y pueden hacer trato directo. ¿Te conecto ahora?',
                    'Las rebajas las maneja el asesor humano (yo no puedo prometer descuentos sin confirmar). ¿Querés que te pase con uno?',
                    '¡Negociamos! 🤝 Pero los precios finales los maneja el asesor humano. Decime "hablar con asesor" y te lo paso al instante.'
                ];
                return {
                    text: pickRandom(responses),
                    action: 'offer_escalate',
                    intent: 'small_talk_negotiation'
                };
            }
        },

        // ─── §26.2 Confusión / "no entiendo" del cliente ─────────
        {
            id: 'client_confused',
            regex: /^\s*(no\s+entiendo|no\s+(le|la)?\s+entiendo|no\s+s[eé]|qu[eé]\s+significa|qu[eé]\s+es\s+eso|no\s+me\s+queda\s+claro|expl[ií]came(lo)?|expl[ií]ca(le)?)\s*\.?\?*\s*$/i,
            priority: 80,
            skipIfEntity: false,
            build: function (text, ctx) {
                return {
                    text: 'Disculpa, déjame explicarte mejor 🙏 ¿Qué parte querés que te aclare? ¿Algo del precio, financiación, peritaje, o algún auto en particular?',
                    intent: 'small_talk_confusion'
                };
            }
        },

        // ─── §26.2 Disculpa / Apología ──────────────────────────
        {
            id: 'apology',
            regex: /^\s*(perd[oó]n|disculp[ae]|sorry|mil\s+disculpas|pa\s+perd[oó]n)\s*\.?\!*\s*$/i,
            priority: 60,
            skipIfEntity: false,
            build: function (text, ctx) {
                return {
                    text: '¡Tranqui! 😊 No hay nada que disculpar. ¿En qué seguimos?',
                    intent: 'small_talk_apology'
                };
            }
        }
    ];

    /* ─── detect — entry point ───────────────────────────────────── */
    function detect(text, sessionContext) {
        if (!text || typeof text !== 'string') return null;
        var trimmed = text.trim();
        if (!trimmed) return null;

        // §26.2 Expand sinónimos del vocabulario automotriz primero
        // — esto permite que "qué tenés" matchee show_inventory_short
        // aunque escriba "qué manejan" (variantes coloquiales).
        var expanded = trimmed;
        if (window.AltorraAutomotiveVocab && window.AltorraAutomotiveVocab.expand) {
            try { expanded = window.AltorraAutomotiveVocab.expand(trimmed); } catch (e) {}
        }

        var entityPresent = null; // lazy compute

        // Encontrar pattern de mayor priority que matchee (probamos
        // primero contra el texto expandido, luego contra el original)
        var sorted = PATTERNS.slice().sort(function (a, b) { return b.priority - a.priority; });
        for (var i = 0; i < sorted.length; i++) {
            var p = sorted[i];
            if (p.regex.test(trimmed) || p.regex.test(expanded)) {
                if (p.skipIfEntity) {
                    if (entityPresent === null) entityPresent = hasInventoryEntity(trimmed);
                    if (entityPresent) continue;
                }
                try {
                    var resp = p.build(trimmed, sessionContext);
                    if (resp && resp.text) {
                        resp.matchedPattern = p.id;

                        // §26.2 — Aplicar tono del Brain Config si está disponible
                        // (no cambia respuestas que ya tienen marcadores especiales
                        // como __INVENTORY_QUERY__).
                        if (resp.text !== '__INVENTORY_QUERY__'
                            && window.AltorraBrainConfig
                            && window.AltorraBrainConfig.applyTone) {
                            try {
                                var hint = p.id === 'greeting' ? 'greeting'
                                         : p.id === 'goodbye' ? 'close'
                                         : p.id === 'thanks' ? 'casual'
                                         : null;
                                if (hint) resp.text = window.AltorraBrainConfig.applyTone(resp.text, hint);
                            } catch (e) {}
                        }

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
