/**
 * ALTORRA CARS — Concierge Unificado (Mega-Plan v4, Bloque U)
 * =============================================================
 * UN solo botón inteligente que reemplaza el WhatsApp widget +
 * AI Assistant separados. Tres modos sin discontinuidad:
 *
 *   🤖 Bot AI    — responde 24/7 con FAQ + RAG + smart suggestions
 *   👨 Asesor    — chat en vivo con asesor humano (modo en horario)
 *   📲 WhatsApp  — gateway a WhatsApp con resumen de conversación
 *
 * Captura todo lead progresivamente al CRM (`solicitudes/` con
 * `kind: 'lead'` y `origen: 'concierge'`). Identidad anónima al
 * inicio, escala a registered cuando el cliente se loguea (Identity
 * Merge automático cuando el email coincide).
 *
 * Microfases shipped en este archivo:
 *   U.1 — Design system (CSS dorado + animaciones)
 *   U.2 — Schema unificado de mensajes en localStorage + sessionId
 *   U.3 — Migración del WhatsApp widget legacy (link wa.me preservado)
 *   U.4 — Frontend unificado (reemplaza whatsapp-widget + ai-assistant)
 *
 * Pendientes (próximos commits del bloque U):
 *   U.5  — Knowledge Base CRUD admin (vehículos auto-sync, FAQs)
 *   U.6  — Embeddings + RAG (Xenova/all-MiniLM-L6-v2 lazy)
 *   U.7  — Intent classifier + NER per-turn
 *   U.8  — Response generator con personalidad Altorra
 *   U.9  — Sentiment + auto-escalation
 *   U.10 — Bandeja admin Concierge (lista realtime)
 *   U.11 — Chat detail admin estilo WhatsApp
 *   U.12 — Smart suggestions para asesor
 *   U.13 — Conversation summarization
 *   U.14 — WhatsApp handover con contexto
 *   U.15 — Cleanup de chats viejos
 *   U.16 — Soft contact a CRM al primer mensaje
 *   U.17 — Progressive profiling
 *   U.18 — Identity merge
 *   U.19 — Marketing opt-in granular + GDPR
 *
 * Public API:
 *   AltorraConcierge.open()       → abrir widget
 *   AltorraConcierge.close()      → cerrar
 *   AltorraConcierge.send(text)   → enviar mensaje (programático)
 *   AltorraConcierge.session()    → estado actual
 */
(function () {
    'use strict';
    if (window.AltorraConcierge) return;

    var STORAGE_KEY = 'altorra_concierge_session';
    var WHATSAPP_NUMBER = '+573235016747'; // Mismo número del legacy widget

    // 6 FAQ entries (heredados de ai-assistant.js, expandidos)
    var FAQ_LIBRARY = [
        {
            keywords: ['financ', 'cuota', 'crédito', 'credito', 'pago', 'plazo', 'simulador'],
            text: '💳 Tenemos planes de financiación con cuota inicial desde 30%. ¿Quieres que te conecte con un asesor para una propuesta?',
            cta: { label: 'Ir al simulador', action: 'goto-simulador' }
        },
        {
            keywords: ['vendo', 'vender', 'consigna', 'consignación', 'mi auto', 'mi carro'],
            text: '🚗 ¡Te ayudamos a vender tu auto! Tenemos un proceso de valuación con peritaje incluido. ¿Quieres iniciar?',
            cta: { label: 'Vender mi auto', action: 'open-modal-vende' }
        },
        {
            keywords: ['catálogo', 'catalogo', 'inventario', 'disponible', 'qué tienen', 'que tienen'],
            text: '📋 En el catálogo verás todos nuestros vehículos disponibles con filtros por marca, precio, año y kilometraje.',
            cta: { label: 'Ver catálogo', action: 'goto-busqueda' }
        },
        {
            keywords: ['ubicación', 'ubicacion', 'dónde', 'donde', 'dirección', 'direccion'],
            text: '📍 Estamos en Cartagena, Colombia. ¿Quieres agendar una visita o que un asesor te envíe la dirección aquí mismo?',
            cta: { label: 'Hablar con asesor', action: 'escalate' }
        },
        {
            keywords: ['horario', 'cuando abren', 'cuándo', 'cuando atienden'],
            text: '🕒 Atendemos de lunes a sábado, 8 AM a 6 PM. Fuera de horario el bot te responde y te dejamos un asesor pendiente.'
        },
        {
            keywords: ['cita', 'agendar', 'visita', 'ver el carro', 'ver el auto'],
            text: '📅 Para agendar una cita y ver un vehículo, dime el modelo que te interesa y te conecto con un asesor.',
            cta: { label: 'Hablar con asesor', action: 'escalate' }
        }
    ];

    /* ═══════════════════════════════════════════════════════════
       SESSION STATE — persistente en localStorage
       ═══════════════════════════════════════════════════════════ */
    function loadSession() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                var s = JSON.parse(raw);
                // Defensive cleanup: si una sesión vieja tiene un greeting con
                // vehicleTitle vacío ("Veo que te interesa el ."), lo limpiamos.
                if (s.messages && s.messages.length > 0) {
                    s.messages = s.messages.filter(function (m) {
                        return !(m.from === 'bot' && /Veo que te interesa el \.\s/.test(m.text));
                    });
                }
                // Asegurar que los campos nuevos existan en sesiones viejas
                if (typeof s.gateCompleted === 'undefined') s.gateCompleted = false;
                if (typeof s.context === 'undefined') s.context = { lastIntent: null, discussedTopics: [], bot_repeated_count: 0 };
                if (typeof s.activeAsesor === 'undefined') s.activeAsesor = null;
                if (typeof s.profile === 'undefined') s.profile = null;
                if (typeof s.closed === 'undefined') s.closed = false;
                // §87 — CSAT field defensive default para sesiones pre-§87
                if (typeof s.csat === 'undefined') s.csat = null;

                /* §80 STALENESS GUARD — abandono de queue/live por >4h
                   ──────────────────────────────────────────────────
                   Si el cliente quedó en mode='queue' o 'live' por más
                   de 4 horas sin actividad, consideramos abandono y
                   reseteamos a bot con welcome fresh.

                   Sin este guard, el cliente que abandonó hace 1266 min
                   ve al reabrir:
                   - Banner "Estás en cola" inmediato
                   - Mensajes system "te conectamos con asesor" stale
                   - SLA timer "Esperando hace 1266 min" (falso)
                   Sin espacio para que el bot dé welcome.

                   Preserva profile/uid/email/nombre/telefono (lead
                   capture data sigue válido para la nueva sesión).
                   Reset: mode/messages/queueEnteredAt/SLA/activeAsesor
                   + nuevo sessionId (chat doc nuevo en Firestore). */
                var STALE_HOURS = 4;
                var STALE_MS = STALE_HOURS * 60 * 60 * 1000;
                var nowMs = Date.now();
                var inActiveMode = (s.mode === 'queue' || s.mode === 'live');
                if (inActiveMode) {
                    var lastTs = 0;
                    if (s.queueEnteredAt) {
                        var qts = new Date(s.queueEnteredAt).getTime();
                        if (!isNaN(qts)) lastTs = Math.max(lastTs, qts);
                    }
                    if (s.messages && s.messages.length > 0) {
                        var lastMsg = s.messages[s.messages.length - 1];
                        if (lastMsg && lastMsg.timestamp) {
                            var mts = new Date(lastMsg.timestamp).getTime();
                            if (!isNaN(mts)) lastTs = Math.max(lastTs, mts);
                        }
                    }
                    if (lastTs > 0 && (nowMs - lastTs) > STALE_MS) {
                        var elapsedH = Math.round((nowMs - lastTs) / (60 * 60 * 1000));
                        console.log('[Concierge] §80 stale ' + s.mode + ' session detected (' + elapsedH + 'h ago). Reset to bot with welcome fresh.');
                        s.mode = 'bot';
                        s.queueEnteredAt = null;
                        s.slaWarnedAt5min = false;
                        s.slaWarnedAt10min = false;
                        s.activeAsesor = null;
                        s.messages = [];
                        s.context = { lastIntent: null, discussedTopics: [], bot_repeated_count: 0 };
                        // §86 — reset también flags de progressive profiling
                        s.gateRequestedInline = false;
                        s.gateRequestReason = null;
                        s._deferredQuery = null;
                        // §87 — CSAT pertenece a un chat específico; nuevo chat = csat null
                        s.csat = null;
                        // Nuevo sessionId → chat doc fresh en Firestore
                        s.sessionId = 'cnc_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
                        s.createdAt = Date.now();
                    }
                }

                // FASE 1.C — Purga de fuga de contexto (vehicle bleed):
                // Si la página actual NO es página de vehículo, eliminar
                // sourceVehicleId residual de visitas previas. Esto evita
                // que un chat iniciado en /vehiculos/X siga mostrando
                // "Veo que te interesa el X" cuando el cliente vuelve a
                // index.html semanas después.
                var isVehiclePage = !!window.PRERENDERED_VEHICLE_ID ||
                                    /\/vehiculos\//.test(window.location.pathname);
                if (!isVehiclePage && s.sourceVehicleId) {
                    s.sourceVehicleId = null;
                    s.sourcePage = window.location.pathname;
                } else if (isVehiclePage && window.PRERENDERED_VEHICLE_ID) {
                    // Sincronizar al vehículo actual (puede haber cambiado)
                    s.sourceVehicleId = String(window.PRERENDERED_VEHICLE_ID);
                    s.sourcePage = window.location.pathname;
                }
                return s;
            }
        } catch (e) {}
        return {
            sessionId: 'cnc_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8),
            mode: 'bot', // 'bot' | 'live' | 'wa_handed_over'
            messages: [],
            createdAt: Date.now(),
            uid: null,            // se llena cuando AltorraAuth detecta login
            email: null,
            nombre: null,
            telefono: null,
            // Lead Capture Gate
            gateCompleted: false,    // true tras submit del form de captura
            profile: null,           // { nombre, apellido, cedula, celular, correo, consent }
            // §86 Sprint C-S8 — Progressive profiling: gate NO es forzoso al
            // primer mensaje. Solo aparece cuando el bot lo solicita
            // (intent high-value: financiacion, agendar visita, peritaje).
            gateRequestedInline: false,    // true cuando bot pidió gate inline
            gateRequestReason: null,       // 'financiacion'|'cita'|'asesor'|'vender'
            _deferredQuery: null,          // query del cliente diferida hasta completar gate
            // §87 Sprint C-S9 — CSAT (Customer Satisfaction) post-cierre.
            // null = no respondido (mostrar form). { score, comment, submittedAt, source }
            // = ya respondió (mostrar "✓ Gracias por tu valoración"). Idempotente.
            csat: null,
            // Intent classifier memoria conversacional
            context: { lastIntent: null, discussedTopics: [], bot_repeated_count: 0 },
            // Handoff dinámico
            activeAsesor: null,      // { uid, nombre, photoURL } cuando un asesor toma el chat
            // Cierre de sesión (admin marca status=closed → cliente bloqueado)
            closed: false,
            // L0-L5 progressive profiling
            level: 0,
            // Source tracking — qué página originó la conversación
            sourcePage: window.location.pathname,
            sourceVehicleId: window.PRERENDERED_VEHICLE_ID || null
        };
    }

    function saveSession(s) {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch (e) {}
    }

    var session = loadSession();

    /* ═══════════════════════════════════════════════════════════
       FAQ MATCHING — heredado de ai-assistant.js
       ═══════════════════════════════════════════════════════════ */
    function findFAQ(query) {
        var lower = (query || '').toLowerCase();
        var best = null, bestScore = 0;
        FAQ_LIBRARY.forEach(function (faq) {
            var hits = 0;
            faq.keywords.forEach(function (k) {
                if (lower.indexOf(k) !== -1) hits++;
            });
            if (hits > bestScore) { bestScore = hits; best = faq; }
        });
        return best;
    }

    /* ═══════════════════════════════════════════════════════════
       BOT RESPONSE — fast path con FAQ + NER + sentiment hooks
       ═══════════════════════════════════════════════════════════ */
    /* ═══════════════════════════════════════════════════════════
       D.7 — AI Auto-Scheduling: detecta intent de agendar y sugiere
       slot disponible al cliente.
       ═══════════════════════════════════════════════════════════ */
    function detectSchedulingIntent(text) {
        var lower = (text || '').toLowerCase();
        return /agend(ar|emos|amos)|cita|visita|cuando puedo|me gustar[íi]a (verlo|ver)|conocer (el|la) (auto|carro|veh)/i.test(lower);
    }

    /**
     * Devuelve el primer nombre del cliente (capitalizado) o '' si no hay perfil.
     */
    function getClientFirstName() {
        if (session.profile && session.profile.nombre) {
            return String(session.profile.nombre).trim().split(/\s+/)[0];
        }
        return '';
    }

    /**
     * Cuenta de vehículos disponibles (lazy desde vehicleDB si está cargado).
     */
    function getInventoryCount() {
        try {
            if (window.vehicleDB && window.vehicleDB.vehicles) {
                return window.vehicleDB.vehicles.filter(function (v) {
                    return v && v.estado !== 'vendido' && v.estado !== 'reservado';
                }).length;
            }
        } catch (e) {}
        return 25; // fallback razonable
    }

    /**
     * Variantes de respuesta para evitar repetición robótica.
     * AltorraIntent.shouldVary marca cuando el bot debe variar.
     */
    function pickVariant(arr, ctx) {
        if (!arr || !arr.length) return '';
        var idx = ctx && ctx.bot_repeated_count ? ctx.bot_repeated_count % arr.length : 0;
        return arr[idx];
    }

    function generateBotResponse(userMsg) {
        var ctx = session.context || {};
        var firstName = getClientFirstName();
        var personalGreet = firstName ? firstName : '';

        // D.7 — Detectar intent de agendar PRIMERO si hay fecha explícita
        if (detectSchedulingIntent(userMsg) && window.AltorraCalendarConfig &&
            window.AltorraCalendarConfig.parseSchedulingHint) {
            var hint = window.AltorraCalendarConfig.parseSchedulingHint(userMsg, []);
            if (hint && hint.fecha) {
                var dayName = new Date(hint.fecha + 'T00:00:00').toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' });
                return {
                    text: '📅 Te puedo agendar' + (firstName ? ', ' + firstName : '') + ' para el ' + dayName +
                          (hint.hora ? ' a las ' + hint.hora : ' (te confirmamos la hora exacta)') + '. ¿Lo coordino con un asesor?',
                    cta: { label: 'Sí, agendar', action: 'escalate' }
                };
            }
        }

        // 1. Intent classifier — clasificar intención del cliente PRIMERO
        var classification = window.AltorraIntent
            ? window.AltorraIntent.classify(userMsg, ctx)
            : { intent: 'none', confidence: 0 };

        // 2. Sentiment — si muy negativo o frustration intent, escalar
        var sentimentNeg = false;
        if (window.AltorraAI) {
            var s = window.AltorraAI.sentiment(userMsg);
            sentimentNeg = s && s.label === 'negative' && s.score < -0.5;
        }
        if (sentimentNeg || classification.intent === 'frustration' || classification.intent === 'ask_human') {
            return {
                text: (firstName ? firstName + ', ' : '') +
                      'te entiendo. Déjame conectarte con un asesor humano que pueda ayudarte directamente.',
                cta: { label: 'Hablar con asesor', action: 'escalate' }
            };
        }

        // 3. Intent: greeting — respuesta natural, NO menú
        if (classification.intent === 'greeting' && classification.confidence >= 0.3) {
            var greetVariants = firstName ? [
                '¡Hola ' + firstName + '! 👋 Con gusto te ayudo. ¿Qué estás buscando?',
                'Hola de nuevo ' + firstName + '. ¿En qué puedo ayudarte hoy?',
                '¡Qué tal ' + firstName + '! Cuéntame qué necesitas.'
            ] : [
                '¡Hola! 👋 Con gusto te ayudo. ¿Qué estás buscando?',
                '¡Qué tal! ¿En qué puedo ayudarte hoy?',
                'Hola, gusto saludarte. Cuéntame qué necesitas.'
            ];
            return { text: pickVariant(greetVariants, ctx) };
        }

        // 4. Intent: thanks — agradecer naturalmente
        if (classification.intent === 'thanks') {
            var thanksVariants = [
                '¡De nada' + (firstName ? ' ' + firstName : '') + '! Cualquier otra cosa, aquí estoy 🙌',
                'Un gusto. Si necesitas algo más, escríbeme.',
                '¡Para servirte! Cualquier duda, sigo por aquí.'
            ];
            return { text: pickVariant(thanksVariants, ctx) };
        }

        // 5. Intent: goodbye
        if (classification.intent === 'goodbye') {
            return {
                text: '¡Hasta pronto' + (firstName ? ' ' + firstName : '') + '! 👋 Cuando quieras volver, aquí estaré.'
            };
        }

        // §81 — Intent: request_help (PRIORIDAD ALTA, antes que confirmation
        // y fallback). Fix Bug 5 reportado por cliente: "si tengo dudas" se
        // matcheaba como goodbye via stemming/fuzzy de "tengo que irme".
        // Ahora con intent dedicado, el bot responde apropiadamente con
        // pregunta abierta + opciones — sin escalar prematuramente ni cerrar.
        if (classification.intent === 'request_help') {
            var helpVariants = firstName ? [
                '¡Por supuesto ' + firstName + '! 🙌 Cuéntame, ¿qué duda tienes? Puedo ayudarte con info de carros, precios, financiación, agendar visita, peritaje o consignación.',
                'Claro ' + firstName + ', dime qué necesitas saber. ¿Es sobre algún auto en particular, financiación, o quieres agendar una visita?',
                '¡Estoy para eso ' + firstName + '! Cuéntame qué te interesa — te puedo mostrar el catálogo, explicarte cómo funciona la financiación, agendarte una visita, o pasarte con un asesor humano si prefieres.'
            ] : [
                '¡Por supuesto! 🙌 Cuéntame, ¿qué duda tienes? Puedo ayudarte con info de carros, precios, financiación, agendar visita, peritaje o consignación.',
                'Claro, dime qué necesitas saber. ¿Es sobre algún auto en particular, financiación, o quieres agendar una visita?',
                '¡Estoy para eso! Cuéntame qué te interesa — te puedo mostrar el catálogo, explicarte financiación, agendarte una visita, o pasarte con un asesor humano.'
            ];
            return { text: pickVariant(helpVariants, ctx) };
        }

        // 6. Intent: confirmation / negation cuando hay topic discutido previo
        if (classification.intent === 'confirmation' && ctx.discussedTopics && ctx.discussedTopics.length) {
            var lastTopic = ctx.discussedTopics[ctx.discussedTopics.length - 1];
            if (lastTopic === 'cita' || lastTopic === 'financiacion') {
                return {
                    text: 'Perfecto. Te conecto con un asesor para que coordinemos lo de ' + lastTopic + '.',
                    cta: { label: 'Conectar ahora', action: 'escalate' }
                };
            }
        }

        // 7. Intent: inventory_query — §22 Capa D: Búsqueda dinámica
        // Si AltorraInventorySearch detecta filtros específicos (marca, precio,
        // categoría, etc.), responde con vehículos REALES del inventario.
        // Si no hay filtros específicos, responde con conteo + CTA al catálogo.
        if (classification.intent === 'inventory_query') {
            if (window.AltorraInventorySearch && window.vehicleDB && window.vehicleDB.vehicles) {
                var searchResult = window.AltorraInventorySearch.searchFromText(userMsg, { limit: 4 });
                var hasFilters = Object.keys(searchResult.filters).some(function (k) {
                    var v = searchResult.filters[k];
                    return v !== null && (!Array.isArray(v) || v.length > 0);
                });
                if (hasFilters) {
                    var formatted = window.AltorraInventorySearch.formatResponse(searchResult, { firstName: firstName });
                    // Persistir vehículos mostrados en context para anáfora
                    if (formatted.vehiclesShown && session.context) {
                        session.context.slots = session.context.slots || {};
                        session.context.slots.lastVehiclesShown = formatted.vehiclesShown;
                        session.context.slots.lastInventoryFilters = searchResult.filters;
                        if (formatted.vehiclesShown.length === 1) {
                            var v0 = searchResult.vehicles[0];
                            session.context.slots.lastVehicleDiscussed = {
                                id: v0.id, marca: v0.marca, modelo: v0.modelo,
                                year: v0.year, precio: v0.precioOferta || v0.precio,
                                kilometraje: v0.kilometraje, categoria: v0.categoria,
                                transmision: v0.transmision
                            };
                        }
                    }
                    return {
                        text: formatted.text,
                        cta: formatted.cta,
                        vehicleCards: formatted.vehicleCards   // §26.6 propagar cards inline
                    };
                }
            }
            // Sin filtros específicos → respuesta genérica con conteo
            var n = getInventoryCount();
            return {
                text: '📋 Tenemos ' + n + ' vehículos disponibles ahora mismo' +
                      (firstName ? ', ' + firstName : '') + '. ' +
                      'Te dejo el catálogo completo con filtros por marca, precio, año y kilometraje. ' +
                      '¿Hay algún modelo específico en mente?',
                cta: { label: 'Ver catálogo', action: 'goto-busqueda' }
            };
        }

        // 8. Intent: financiacion_query con CTA al simulador
        // §86 Sprint C-S8 — Progressive profiling: si el cliente NO dio
        // contacto aún, pedimos gate inline antes de la respuesta
        // detallada. El _deferredQuery se ejecuta tras completar gate.
        if (classification.intent === 'financiacion_query') {
            if (needsIdentityForHighValueAction()) {
                return {
                    text: 'Te ayudo con la financiación' + (firstName ? ', ' + firstName : '') + '. ' +
                          'Antes necesito unos datos breves para que un asesor te arme una propuesta personalizada con los plazos y cuotas que te convengan.',
                    _requestGate: 'financiacion',
                    _deferredQuery: userMsg
                };
            }
            return {
                text: '💳 Trabajamos con varios aliados financieros. Cuota inicial mínima del 30%, plazos hasta 72 meses. ' +
                      '¿Quieres simular tu cuota o que te conecte con un asesor para una propuesta personalizada?',
                cta: { label: 'Ir al simulador', action: 'goto-simulador' }
            };
        }

        // 9. Intent: pricing_query + NER detecta vehículo → buscar precio real
        if (classification.intent === 'pricing_query' && window.AltorraNER) {
            var pExt = window.AltorraNER.extract(userMsg);
            if (pExt.summary && pExt.summary.marca && window.vehicleDB && window.vehicleDB.vehicles) {
                var match = window.vehicleDB.vehicles.find(function (v) {
                    return v && v.marca && String(v.marca).toLowerCase().indexOf(pExt.summary.marca) === 0;
                });
                if (match) {
                    var p = match.precio || match.precioOferta;
                    if (p) {
                        return {
                            text: '💰 El ' + match.marca + ' ' + (match.modelo || '') + ' ' + (match.year || '') +
                                  ' está en $' + (p / 1e6).toFixed(1) + 'M. ¿Te muestro la ficha completa o coordinamos una cita?',
                            cta: { label: 'Ver ficha', action: 'goto-busqueda' }
                        };
                    }
                }
            }
        }

        // 10. Intent: appointment_request — escalar para agendar
        // §86 — Pedir gate inline si falta contacto (cita = high-value)
        if (classification.intent === 'appointment_request') {
            if (needsIdentityForHighValueAction()) {
                return {
                    text: '📅 ¡Perfecto' + (firstName ? ', ' + firstName : '') + '! Para agendar tu visita necesito unos datos breves así un asesor confirma fecha y hora contigo.',
                    _requestGate: 'cita',
                    _deferredQuery: userMsg
                };
            }
            return {
                text: '📅 Para agendar una cita o test drive, te conecto con un asesor que coordina fecha y hora directamente contigo. ¿Procedemos?',
                cta: { label: 'Agendar con asesor', action: 'escalate' }
            };
        }

        // 11. Intent: sell_my_car
        // §86 — Pedir gate inline si falta contacto (peritaje = high-value)
        if (classification.intent === 'sell_my_car') {
            if (needsIdentityForHighValueAction()) {
                return {
                    text: '🚙 ¡Excelente! Te ayudamos a vender tu auto con peritaje gratis y compra directa o consignación. ' +
                          'Antes necesito tus datos para que un asesor coordine la valuación.',
                    _requestGate: 'vender',
                    _deferredQuery: userMsg
                };
            }
            return {
                text: '🚙 Te ayudamos a vender tu auto. Tenemos compra directa con valuación inmediata o consignación. Inicia con peritaje gratis sin compromiso.',
                cta: { label: 'Vender mi auto', action: 'open-modal-vende' }
            };
        }

        // 11.5 §22 Capa C — Anáfora resolution
        // "¿y de qué año es?" / "¿cuánto vale ese?" / "¿lo tienen automático?"
        // → busca el último vehículo discutido en context.slots.
        var anaphora = window.AltorraIntent && window.AltorraIntent.resolveAnaphora
            ? window.AltorraIntent.resolveAnaphora(ctx) : null;
        var pronominalRe = /\b(ese|esa|eso|este|esta|esto|aquel|aquella|el mismo|la misma|lo|la)\b/i;
        var ambiguousFollowupRe = /^(\b(y|de|cu[aá]nto|cu[aá]l|qu[eé])\b\s){1,3}/i;
        if (anaphora && anaphora.vehicle &&
            (pronominalRe.test(userMsg) || ambiguousFollowupRe.test(userMsg) ||
             classification.intent === 'pricing_query')) {
            var v = anaphora.vehicle;
            // Detectar el atributo preguntado
            var lowerMsg = userMsg.toLowerCase();
            var attr = null;
            if (/\baño\b|\bano\b|\bque año|del año/i.test(lowerMsg)) attr = 'year';
            else if (/precio|cuanto|cuánto|vale|cuesta/i.test(lowerMsg)) attr = 'precio';
            else if (/\bkm\b|kilometraje|kilómetros|kilometros|recorrido/i.test(lowerMsg)) attr = 'kilometraje';
            else if (/transmisi[oó]n|autom[aá]tic|manual|mecanic/i.test(lowerMsg)) attr = 'transmision';
            else if (/categoria|tipo|suv|sedan|pickup|hatchback/i.test(lowerMsg)) attr = 'categoria';

            if (attr && v[attr]) {
                var vTitle = v.marca + ' ' + v.modelo + ' ' + v.year;
                var answers = {
                    year: 'El ' + vTitle + ' es del año **' + v.year + '**.',
                    precio: 'El ' + vTitle + ' está en **$' + (v.precio / 1e6).toFixed(1) + 'M**.',
                    kilometraje: 'El ' + vTitle + ' tiene **' + (v.kilometraje || 0).toLocaleString('es-CO') + ' km**.',
                    transmision: 'El ' + vTitle + ' tiene transmisión **' + (v.transmision || 'consultar') + '**.',
                    categoria: 'El ' + vTitle + ' es **' + (v.categoria || 'consultar') + '**.'
                };
                return {
                    text: answers[attr] + ' ¿Quieres ver la ficha completa o agendar una visita?',
                    cta: { label: 'Ver ficha', action: 'goto-busqueda' }
                };
            }
        }

        // 12. §22 Propuesta #1 — TF-IDF ranker sobre las FAQs del admin (KB)
        // Reemplaza el findBest simple (keyword matching) con ranking matemático
        // que pondera tokens raros (peritaje > auto) y penaliza tokens comunes.
        if (window.AltorraKB && window.AltorraFAQRanker) {
            var faqs = window.AltorraKB.list ? window.AltorraKB.list() : [];
            if (faqs.length > 0) {
                // Cache del index por session — invalidado si cambia el count
                if (!session._kbIndex || session._kbIndex._faqsCount !== faqs.length) {
                    session._kbIndex = window.AltorraFAQRanker.buildIndex(faqs);
                    session._kbIndex._faqsCount = faqs.length;
                }
                var bestKB = window.AltorraFAQRanker.bestAnswer(userMsg, session._kbIndex);
                if (bestKB && !bestKB.ambiguous) {
                    if (window.AltorraKB.recordUsage && bestKB.faq._id) {
                        window.AltorraKB.recordUsage(bestKB.faq._id);
                    }
                    return { text: bestKB.faq.answer, kbId: bestKB.faq._id };
                }
                // Si hay ambigüedad → quick replies (Propuesta #2 abajo)
                if (bestKB && bestKB.ambiguous && bestKB.secondFaq) {
                    return {
                        text: 'Tengo dos respuestas posibles, ¿cuál te ayuda más?',
                        quickReplies: [
                            { label: clipQuestion(bestKB.faq.question), payload: bestKB.faq.question },
                            { label: clipQuestion(bestKB.secondFaq.question), payload: bestKB.secondFaq.question }
                        ]
                    };
                }
            }
        }

        // 12.5 — KB findBest legacy (fallback si AltorraFAQRanker no cargó)
        if (window.AltorraKB && window.AltorraKB.findBest && !window.AltorraFAQRanker) {
            var kbEntry = window.AltorraKB.findBest(userMsg);
            if (kbEntry) {
                window.AltorraKB.recordUsage(kbEntry._id);
                return { text: kbEntry.answer, kbId: kbEntry._id };
            }
        }

        // 13. FAQ hardcoded fallback
        var faq = findFAQ(userMsg);
        if (faq) return { text: faq.text, cta: faq.cta || null };

        // 14. §26.6 — NER detectó marca/modelo/precio Y NO matcheó intent.
        // ANTES (bug): respondía con texto genérico "veo que te interesa..."
        // sin actuar. AHORA: invoca AltorraInventorySearch directo y muestra
        // cards reales con el filtro detectado. Bug que causaba la frustración:
        // cliente decía "Tienes algun kia" o "Renault Twingo" y el bot
        // respondía con frase muerta + CTA "Ver inventario" en vez de mostrar
        // las cards inline.
        if (window.AltorraNER) {
            var ext = window.AltorraNER.extract(userMsg);
            if (ext.summary && (ext.summary.marca || ext.summary.modelo || ext.summary.precio)) {
                if (window.AltorraInventorySearch && window.vehicleDB && window.vehicleDB.vehicles) {
                    var nerSearch = window.AltorraInventorySearch.searchFromText(userMsg, { limit: 4 });
                    var nerHasFilters = nerSearch && nerSearch.filters && Object.keys(nerSearch.filters).some(function (k) {
                        var v = nerSearch.filters[k];
                        return v !== null && v !== undefined && (!Array.isArray(v) || v.length > 0);
                    });
                    if (nerHasFilters) {
                        var nerFormatted = window.AltorraInventorySearch.formatResponse(nerSearch, { firstName: firstName });
                        // Persistir vehículos mostrados en context para anáfora
                        if (nerFormatted.vehiclesShown && session.context) {
                            session.context.slots = session.context.slots || {};
                            session.context.slots.lastVehiclesShown = nerFormatted.vehiclesShown;
                            session.context.slots.lastInventoryFilters = nerSearch.filters;
                            if (nerFormatted.vehiclesShown.length === 1) {
                                var nv0 = nerSearch.vehicles[0];
                                session.context.slots.lastVehicleDiscussed = {
                                    id: nv0.id, marca: nv0.marca, modelo: nv0.modelo,
                                    year: nv0.year, precio: nv0.precioOferta || nv0.precio,
                                    kilometraje: nv0.kilometraje, categoria: nv0.categoria,
                                    transmision: nv0.transmision
                                };
                            }
                        }
                        return {
                            text: nerFormatted.text,
                            cta: nerFormatted.cta,
                            vehicleCards: nerFormatted.vehicleCards
                        };
                    }
                }
                // Fallback: si InventorySearch no cargó, texto descriptivo
                var bits = [];
                if (ext.summary.marca) bits.push(ext.summary.marca);
                if (ext.summary.modelo) bits.push(ext.summary.modelo);
                if (ext.summary.year) bits.push('año ' + ext.summary.year);
                if (ext.summary.precio) bits.push('por ~$' + Math.round(ext.summary.precio / 1000000) + 'M');
                return {
                    text: 'Veo que te interesa un ' + bits.join(' ') + '. ¿Quieres ver opciones similares en el catálogo o te conecto con un asesor?',
                    cta: { label: 'Ver inventario', action: 'goto-busqueda' }
                };
            }
        }

        // 15. §22 Capa E — Auto-Nutrición / Feedback Loop
        logUnmatched(userMsg, classification);

        // §23 FASE 1 — Doble Fallback Inteligente.
        // Counter persistido: incrementa con cada fallback consecutivo.
        // Se resetea automáticamente cuando el bot da una respuesta exitosa
        // (intent != 'none' o KB matchea). Aquí lo incrementamos.
        session.botFallbackCount = (session.botFallbackCount || 0) + 1;
        session.botFallbackAt = new Date().toISOString();
        saveSession(session);
        // Persistir a Firestore si hay chat doc
        if (_chatDocCreated && session.sessionId && window.db) {
            window.db.collection('conciergeChats').doc(session.sessionId).set({
                botFallbackCount: session.botFallbackCount,
                botFallbackAt: session.botFallbackAt
            }, { merge: true }).catch(function () {});
        }

        // §26.2 — Triple Fallback State Machine (anti-doble-negativa)
        // Reemplaza el doble fallback simple por 3 estados crecientes:
        //   1er fallback → pedir reformular (clarify_1)
        //   2do fallback → ofrecer MENÚ de opciones (NO repetir "no entiendo")
        //   3er fallback → escalar a asesor empáticamente
        //
        // Esta máquina garantiza que NUNCA aparezcan dos "no entiendo"
        // seguidos. La 2da vez ofrecemos un menú de quick replies con
        // las acciones más comunes para que el cliente pueda elegir
        // sin tener que reformular.

        // 3er fallback consecutivo → escalado empático automático
        if (session.botFallbackCount >= 3) {
            session.botFallbackCount = 0;
            saveSession(session);
            setTimeout(function () { escalateToLive('triple_fallback'); }, 800);
            return {
                text: (firstName ? firstName + ', ' : '') +
                      'mejor te conecto con un asesor humano que te va a entender mejor lo que necesitas 🙋‍♂️ Un momento por favor.',
                _isFallback: true
            };
        }

        // 2do fallback → ofrecer menú de opciones con quick replies
        if (session.botFallbackCount === 2) {
            return {
                text: (firstName ? firstName + ', ' : '') +
                      'todavía no estoy seguro de qué necesitas. Mira, te dejo opciones — toca la que te sirva:',
                quickReplies: [
                    { label: '🚗 Ver autos', payload: 'muéstrame autos' },
                    { label: '💰 Financiación', payload: 'quiero financiación' },
                    { label: '📅 Agendar visita', payload: 'quiero agendar una visita' },
                    { label: '👨 Hablar con asesor', payload: 'hablar con asesor' }
                ],
                _isFallback: true
            };
        }

        // 1er fallback → pedir reformulación amablemente
        if (session.botFallbackCount === 1) {
            var clarifyVariants = [
                'no estoy seguro de haber entendido bien. ¿Me lo puedes decir de otra forma?',
                'creo que no te entendí bien. ¿Me puedes contar más?',
                'mmm, no estoy seguro de qué necesitas. ¿Me explicas un poquito más?'
            ];
            var clarifyText = clarifyVariants[Math.floor(Math.random() * clarifyVariants.length)];
            return {
                text: (firstName ? firstName + ', ' : '') + clarifyText +
                      ' (Por ejemplo: *¿qué autos tienen?*, *¿cuánto sale el Mazda?* o *quiero financiar*).',
                _isFallback: true
            };
        }

        // Fallback de seguridad (no debería llegar acá, botFallbackCount empieza en 1)
        if (window.AltorraIntent && window.AltorraIntent.shouldVary(ctx)) {
            return {
                text: 'Parece que necesitas algo específico. Déjame conectarte con un asesor humano que pueda ayudarte mejor.',
                cta: { label: 'Hablar con asesor', action: 'escalate' }
            };
        }
        return {
            text: (firstName ? firstName + ', ' : '') +
                  'puedo ayudarte con info del catálogo, financiación, citas y peritaje. ' +
                  'Escríbeme con más detalle qué necesitas, o si prefieres, te paso con un asesor.',
            cta: { label: 'Hablar con asesor', action: 'escalate' }
        };
    }

    /**
     * §23 FASE 1 — resetFallbackCounter llamado cuando el bot da respuesta
     * exitosa (intent reconocido o KB match). Esto evita que el escalado
     * empático se dispare si el cliente alterna preguntas (1 buena, 1 mala).
     */
    function resetFallbackCounter() {
        if (!session || !session.botFallbackCount) return;
        session.botFallbackCount = 0;
        saveSession(session);
        if (_chatDocCreated && session.sessionId && window.db) {
            window.db.collection('conciergeChats').doc(session.sessionId).set({
                botFallbackCount: 0
            }, { merge: true }).catch(function () {});
        }
    }

    /**
     * clipQuestion — recorta una pregunta de FAQ a tamaño botón.
     */
    function clipQuestion(q) {
        if (!q) return '';
        return q.length > 38 ? q.slice(0, 36) + '…' : q;
    }

    /**
     * §22 Capa E — logUnmatched
     * Persiste la query no entendida en Firestore `unmatchedQueries/`
     * para que el admin la revise. Throttle: máximo 1 escritura/min/sesión
     * (anti-spam). Idempotente vía session._lastUnmatchedAt.
     */
    function logUnmatched(query, classification) {
        if (!query || query.length < 4 || query.length > 500) return;
        if (!window.db || !window.firebase) return;

        // Throttle: 1 unmatched/minuto/sesión
        var now = Date.now();
        if (session._lastUnmatchedAt && (now - session._lastUnmatchedAt) < 60000) return;
        session._lastUnmatchedAt = now;

        // Extracción de keywords clave (filtrar stop-words + cortos)
        var keywords = [];
        if (window.AltorraFuzzy) {
            keywords = window.AltorraFuzzy.tokenize(query)
                .filter(function (t) {
                    return t.length >= 4 && !window.AltorraFuzzy.STOP_WORDS.has(t);
                })
                .slice(0, 8);
        }

        // Sentiment detection (asíncrono, best-effort)
        var sentimentLabel = 'neutral';
        try {
            if (window.AltorraAI) {
                var s = window.AltorraAI.sentiment(query);
                sentimentLabel = (s && s.label) || 'neutral';
            }
        } catch (e) {}

        var doc = {
            query: query.slice(0, 500),
            keywords: keywords,
            sessionId: session.sessionId || null,
            sourcePage: location.pathname || '/',
            sourceVehicleId: session.sourceVehicleId || null,
            intent: (classification && classification.intent) || 'none',
            confidence: (classification && classification.confidence) || 0,
            sentiment: sentimentLabel,
            createdAt: window.firebase.firestore.FieldValue.serverTimestamp(),
            seen: false,
            promotedToFAQ: false,
            promotedFAQId: null
        };

        window.db.collection('unmatchedQueries').add(doc).catch(function (err) {
            // Best-effort: si falla red/permisos, no bloquear el chat
            console.warn('[Concierge] logUnmatched failed:', err.message);
        });
    }

    /* ═══════════════════════════════════════════════════════════
       FASE 3 — respondWithLLMOrRules
       Async: intenta LLM primero (Cloud Function chatLLM via
       AltorraAI.chat). Si LLM disabled / sin key / timeout / error
       → fallback al rule-based generateBotResponse.

       Pre-filtro rule-based (2026-05-06 — optimización de costos):
       Intents triviales con respuesta determinística NO se mandan al
       LLM. Cada turno LLM cuesta ~$0.005-0.010 USD; el pre-filtro los
       resuelve sub-ms en $0:
         - greeting (hola, buenos días, etc.) → variantes amigables
         - thanks (gracias, perfecto) → acknowledgment
         - goodbye (chao, adiós) → despedida
         - frustration / ask_human → escalar al asesor
         - sentiment muy negativo → escalar al asesor

       Estos representan ~20-30% de los turnos típicos. Skip al LLM
       baja el costo proporcionalmente sin perder calidad de UX
       (las respuestas rule-based de generateBotResponse para estos
       casos ya son naturales y personalizadas con firstName).
       ═══════════════════════════════════════════════════════════ */
    /**
     * §24 (Offline Ultra Brain 2.0) — respondWithLLMOrRules ahora delega
     * a AltorraDualCore que maneja el switch Premium↔Free con circuit
     * breaker. La lógica de pre-checks críticos (sentiment, frustración)
     * se preserva ANTES de invocar al router para escalar inmediato.
     *
     * El generateBotResponse legacy se expone como hook global para que
     * dual-core.js pueda invocarlo dentro de la cascada Free.
     */
    function respondWithLLMOrRules(userMsg) {
        var ctx = session.context || {};

        // 1. Pre-check sentiment / frustration / ask_human → escalar SIN dual-core
        // (estos casos siempre escalan, independiente del core activo)
        var classification = window.AltorraIntent
            ? window.AltorraIntent.classify(userMsg, ctx)
            : { intent: 'none', confidence: 0 };
        var sentimentNeg = false;
        if (window.AltorraAI) {
            var s = window.AltorraAI.sentiment(userMsg);
            sentimentNeg = s && s.label === 'negative' && s.score < -0.5;
        }
        if (sentimentNeg || classification.intent === 'frustration' || classification.intent === 'ask_human') {
            var firstName = getClientFirstName();
            // §26.6 — Escalado AUTOMÁTICO. Bug previo: solo mostraba CTA y
            // el cliente tenía que clickear "Hablar con asesor". Si pedía
            // 3 veces "pasame con un asesor" el bot repetía la misma frase
            // sin escalar nunca. AHORA: si el chat NO está ya en queue/live,
            // disparamos escalateToLive(reason) automáticamente tras 800ms.
            var escalReason = classification.intent === 'ask_human' ? 'ask_human'
                            : classification.intent === 'frustration' ? 'frustration'
                            : 'sentiment_negative';
            if (session.mode === 'bot' && typeof escalateToLive === 'function') {
                setTimeout(function () { escalateToLive(escalReason); }, 800);
            }
            return Promise.resolve({
                text: (firstName ? firstName + ', ' : '') +
                      'te entiendo. Te conecto con un asesor humano de inmediato 🙋‍♂️',
                source: 'rules-pre-check'
            });
        }

        // 2. Delegar al router DualCore (Sprint 3 §24)
        if (window.AltorraDualCore && typeof window.AltorraDualCore.respond === 'function') {
            return window.AltorraDualCore.respond(userMsg, session);
        }

        // 3. Fallback de seguridad si dual-core no cargó (raro)
        return Promise.resolve(generateBotResponse(userMsg));
    }

    // §24 — Hook global para que AltorraDualCore pueda invocar el
    // generateBotResponse rule-based existente sin importar este módulo
    // (concierge.js es IIFE, no exportable). Esta función NO crea un
    // nuevo contrato — solo expone el existente.
    window._altorraConciergeRespondLocal = function (userMsg) {
        try { return generateBotResponse(userMsg); }
        catch (e) { return null; }
    };

    /* ═══════════════════════════════════════════════════════════
       §86 Sprint C-S8 — Quick replies contextuales POST-bot
       Después de la respuesta del bot, ofrecer 2-3 opciones útiles
       según el último intent del cliente. Patrón Intercom/Drift:
       guiar el flow sin obligar al cliente a tipear libre.

       Solo se invocan si la respuesta del bot NO trae quickReplies
       propias (FAQ ambigua, triple fallback). Función pura, retorna
       array o null.
       ═══════════════════════════════════════════════════════════ */
    function getContextualQuickReplies(intent, hasVehicleCards) {
        if (!intent) return null;
        var QR_MAP = {
            greeting: [
                { label: '🚗 Ver autos', payload: 'Muéstrame los autos disponibles' },
                { label: '💳 Financiación', payload: 'Quiero información sobre financiación' },
                { label: '📅 Agendar visita', payload: 'Quiero agendar una visita' }
            ],
            // Si el bot mostró vehicle cards, ofrecer filtros refinados.
            // Si no mostró, ofrecer opciones más generales.
            inventory_query: hasVehicleCards ? [
                { label: 'Bajo $50M', payload: 'Muéstrame autos por menos de 50 millones' },
                { label: 'Más opciones', payload: 'Muéstrame más autos disponibles' },
                { label: '👨 Hablar con asesor', payload: 'Quiero hablar con un asesor' }
            ] : [
                { label: '🚙 SUV', payload: 'Muéstrame SUVs disponibles' },
                { label: '🚗 Sedán', payload: 'Muéstrame sedanes disponibles' },
                { label: '🛻 Pickup', payload: 'Muéstrame pickups disponibles' }
            ],
            pricing_query: [
                { label: '¿Aceptan parte de pago?', payload: '¿Aceptan parte de pago?' },
                { label: '💳 Calcular financiación', payload: 'Quiero calcular mi financiación' },
                { label: '👨 Hablar con asesor', payload: 'Quiero hablar con un asesor' }
            ],
            financiacion_query: [
                { label: '💰 Sin cuota inicial', payload: '¿Hay opciones sin cuota inicial?' },
                { label: '📅 Plazos largos', payload: '¿Cuáles son los plazos máximos?' },
                { label: '👨 Hablar con asesor', payload: 'Quiero hablar con un asesor' }
            ],
            appointment_request: [
                { label: 'Mañana', payload: 'Mañana en la mañana' },
                { label: 'Esta semana', payload: 'Esta semana' },
                { label: 'Próxima semana', payload: 'Próxima semana' }
            ],
            sell_my_car: [
                { label: '🔍 Cómo es la valuación', payload: '¿Cómo funciona la valuación?' },
                { label: '🤝 Consignación', payload: 'Quiero saber sobre consignación' },
                { label: '👨 Hablar con asesor', payload: 'Quiero hablar con un asesor' }
            ],
            request_help: [
                { label: '🚗 Ver autos', payload: 'Muéstrame los autos disponibles' },
                { label: '💳 Financiación', payload: 'Quiero información sobre financiación' },
                { label: '👨 Hablar con asesor', payload: 'Quiero hablar con un asesor' }
            ]
            // Otros intents (thanks, goodbye, frustration, ask_human,
            // confirmation, negation): cero quick replies — no aportan UX
        };
        return QR_MAP[intent] || null;
    }

    /* ═══════════════════════════════════════════════════════════
       FASE 3 — Typing indicator
       Mientras esperamos al LLM, mostramos 3 puntitos animados en
       la zona de mensajes (estilo iMessage / WhatsApp).
       ═══════════════════════════════════════════════════════════ */
    function showTypingIndicator() {
        var box = document.getElementById('cncMessages');
        if (!box || document.getElementById('cncTypingIndicator')) return;
        var dots = document.createElement('div');
        dots.id = 'cncTypingIndicator';
        dots.className = 'cnc-msg cnc-bot-bubble cnc-typing';
        dots.innerHTML = '<span></span><span></span><span></span>';
        box.appendChild(dots);
        box.scrollTop = box.scrollHeight;
    }
    function hideTypingIndicator() {
        var el = document.getElementById('cncTypingIndicator');
        if (el && el.parentNode) el.parentNode.removeChild(el);
    }

    /* ═══════════════════════════════════════════════════════════
       MESSAGE HANDLING
       ═══════════════════════════════════════════════════════════ */
    function addMessage(from, text, opts) {
        opts = opts || {};
        // §60.2 — Optimistic UI: mensajes del 'user' que SÍ se van a
        // sincronizar a Firestore arrancan con _status:'pending' (icon ⏱).
        // syncMessageToFirestore los marca a 'sent' al success o 'failed'
        // al error. Mensajes 'user' que NO se sincronizan (chat doc aún
        // no creado) y mensajes de bot/asesor/system no llevan _status
        // visual (siempre 'synced' implícito para no mostrar icon).
        var willSync = (from === 'user' && _chatDocCreated && window.db);
        var msg = {
            from: from,         // 'user' | 'bot' | 'asesor'
            text: text,
            timestamp: Date.now(),
            cta: opts.cta || null,
            quickReplies: opts.quickReplies || null,
            vehicleCards: opts.vehicleCards || null,    // §26.2 vehicle cards inline
            _synced: !willSync,                          // legacy field, mantenido para compat
            _status: willSync ? 'pending' : null,        // §60.2 — pending|sent|failed (null = sin tracking)
            _tempId: willSync ? ('tmp_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8)) : null
        };
        session.messages.push(msg);
        saveSession(session);
        renderMessages();
        // Sync a Firestore si el chat doc ya existe (post-escalate)
        if (_chatDocCreated && from !== 'asesor') {
            syncMessageToFirestore(msg);
        }
        // Notify EventBus
        if (window.AltorraEventBus) {
            window.AltorraEventBus.emit('concierge.message', {
                sessionId: session.sessionId,
                from: from,
                text: text,
                level: session.level
            });
        }
        return msg;
    }

    function send(text) {
        if (!text || !text.trim()) return;
        // Bloqueo: si la sesión está cerrada por el admin, ignorar
        if (session.closed) return;
        // §75 Sprint S3 — typing:false sincrónico ANTES del addMessage
        // para que el indicador desaparezca instantáneo del lado admin.
        // Cancelamos el auto-clear timer porque ya no aplica.
        if (_typingClearTimeout) { clearTimeout(_typingClearTimeout); _typingClearTimeout = null; }
        _typingThrottleActive = false;
        try { setMeTyping(false); } catch (e) {}
        addMessage('user', text.trim());

        // Intent classifier: actualizar memoria conversacional ANTES del response
        // §22 Capa C — pasamos `extras` con entities NER para que updateContext
        // pueda fillear los slots (lastBrandDiscussed, lastVehicleDiscussed, etc.)
        if (window.AltorraIntent) {
            var classification = window.AltorraIntent.classify(text, session.context || {});
            session.context = session.context || {};
            var extras = {};
            if (window.AltorraNER) {
                try {
                    var nerExt = window.AltorraNER.extract(text);
                    extras.entities = nerExt.summary || null;
                } catch (e) {}
            }
            window.AltorraIntent.updateContext(session.context, classification.intent, text, extras);
            saveSession(session);
        }

        // U.17 — Progressive profiling: extraer entities del mensaje
        // y actualizar identidad de la sesión sin pedir aún
        if (window.AltorraNER) {
            try {
                var ext = window.AltorraNER.extract(text);
                if (ext.summary) {
                    if (ext.summary.email && !session.email) {
                        session.email = ext.summary.email;
                        session.level = Math.max(session.level, 2); // L2 contactable
                    }
                    if (ext.summary.telefono && !session.telefono) {
                        session.telefono = ext.summary.telefono;
                        session.level = Math.max(session.level, 2);
                    }
                    saveSession(session);
                }
            } catch (e) {}
        }

        // U.16 — Crear soft contact al primer mensaje (incluso sin escalate)
        // El lead queda en estado L0 inicialmente, se enriquece con cada turno
        if (!_leadCreated && session.messages.filter(function (m) { return m.from === 'user'; }).length >= 1) {
            createSoftContact();
        }

        // U.19 — Detectar intención de opt-in en el mensaje del cliente
        if (window.AltorraOptIn && window.AltorraOptIn.detectOptInIntent(text)) {
            // Esperar al bot response y luego mostrar modal opt-in
            setTimeout(function () {
                window.AltorraOptIn.requestOptIn();
            }, 1800);
        }

        // Bot response (delayed para sentir natural)
        if (session.mode === 'bot') {
            // Mostrar typing indicator mientras se piensa la respuesta
            showTypingIndicator();
            setTimeout(function () {
                respondWithLLMOrRules(text).then(function (resp) {
                    hideTypingIndicator();
                    if (!resp) return;
                    // §23 FASE 1 — si la respuesta NO es del path de fallback,
                    // reseteamos el counter (cliente fue entendido bien)
                    if (!resp._isFallback) resetFallbackCounter();
                    // §86 Sprint C-S8 — Quick replies contextuales: si la
                    // respuesta NO trae quickReplies propias (FAQ ambigua,
                    // triple fallback) y el intent del cliente tiene
                    // opciones útiles → agregar 2-3 sugerencias inline.
                    var lastIntent = (session.context && session.context.lastIntent) || null;
                    var hasVCards = Array.isArray(resp.vehicleCards) && resp.vehicleCards.length > 0;
                    var contextualQR = resp.quickReplies
                        ? null
                        : getContextualQuickReplies(lastIntent, hasVCards);
                    addMessage('bot', resp.text, {
                        cta: resp.cta,
                        quickReplies: resp.quickReplies || contextualQR,
                        vehicleCards: resp.vehicleCards   // §26.2 inline cards
                    });
                    // §86 — Progressive profiling: si la respuesta marcó
                    // _requestGate, pedir gate inline con delay corto para
                    // que el cliente vea el bubble del bot primero.
                    if (resp._requestGate) {
                        setTimeout(function () {
                            requestGateInline(resp._requestGate, resp._deferredQuery || text);
                        }, 700);
                    }
                    setTimeout(function () { maybeAskForProfile(); }, 1200);
                }).catch(function (err) {
                    hideTypingIndicator();
                    console.warn('[Concierge] Response error:', err && err.message);
                    // Último recurso: rule-based fallback síncrono
                    var fallback = generateBotResponse(text);
                    if (!fallback._isFallback) resetFallbackCounter();
                    // §86 Sprint C-S8 — mismo patrón en catch para contextual QR
                    var fallbackIntent = (session.context && session.context.lastIntent) || null;
                    var fallbackHasVCards = Array.isArray(fallback.vehicleCards) && fallback.vehicleCards.length > 0;
                    var fallbackContextualQR = fallback.quickReplies
                        ? null
                        : getContextualQuickReplies(fallbackIntent, fallbackHasVCards);
                    addMessage('bot', fallback.text, {
                        cta: fallback.cta,
                        quickReplies: fallback.quickReplies || fallbackContextualQR,
                        vehicleCards: fallback.vehicleCards
                    });
                    // §86 — Progressive profiling: si el fallback marca _requestGate
                    if (fallback._requestGate) {
                        setTimeout(function () {
                            requestGateInline(fallback._requestGate, fallback._deferredQuery || text);
                        }, 700);
                    }
                    setTimeout(function () { maybeAskForProfile(); }, 1200);
                });
            }, 350 + Math.random() * 400);
        } else if (_leadCreated) {
            // Si está en modo live, actualizar el lead con cada nuevo mensaje
            updateSoftContact();
        }
    }

    /* ═══════════════════════════════════════════════════════════
       U.17 — Progressive profiling
       Pide datos del cliente en orden óptimo según los turnos del bot
       L0 anónimo → L1 nombre → L2 email/telefono → L3 calificado
       ═══════════════════════════════════════════════════════════ */
    function maybeAskForProfile() {
        // Solo en modo bot
        if (session.mode !== 'bot') return;
        // Si el Lead Capture Gate ya capturó perfil completo, no preguntar más
        if (session.gateCompleted && session.profile) return;

        var userTurns = session.messages.filter(function (m) { return m.from === 'user'; }).length;
        var botTurns = session.messages.filter(function (m) { return m.from === 'bot'; }).length;
        // No preguntar muy pronto (deja conversación fluir)
        if (userTurns < 2) return;

        // Si no tiene nombre y van 3+ turnos del usuario → pedir nombre
        if (!session.nombre && userTurns >= 3 && !session._asked_nombre) {
            session._asked_nombre = true;
            saveSession(session);
            setTimeout(function () {
                addMessage('bot', 'Por cierto, ¿cómo te llamas? Así puedo personalizarte la atención. 😊');
            }, 800);
            return;
        }

        // Si tiene nombre pero no email/teléfono y 5+ turnos → pedir contacto
        if (session.nombre && !session.email && !session.telefono &&
            userTurns >= 5 && !session._asked_contact) {
            session._asked_contact = true;
            saveSession(session);
            setTimeout(function () {
                var firstName = session.nombre.split(' ')[0];
                addMessage('bot', 'Genial ' + firstName + '. Para que un asesor te pueda contactar después, ¿me dejas tu correo o WhatsApp?');
            }, 800);
            return;
        }

        // Si tiene email/telefono pero no level >= 3 → calificar (preguntar presupuesto/categoría)
        if ((session.email || session.telefono) && session.level < 3 &&
            userTurns >= 7 && !session._asked_qualify) {
            session._asked_qualify = true;
            session.level = Math.max(session.level, 3);
            saveSession(session);
            setTimeout(function () {
                addMessage('bot', '¿Tienes un rango de presupuesto o tipo de vehículo en mente? Así te muestro las mejores opciones.');
            }, 800);
            return;
        }
    }

    /* ═══════════════════════════════════════════════════════════
       U.16 — Soft contact: crear lead L0 al primer mensaje
       Sin esperar a escalate. El lead se enriquece con cada turno.
       ═══════════════════════════════════════════════════════════ */
    var _softContactRef = null;
    var _leadCreated = false;
    // §57.9 reset-ref: su declaración se perdió en el split §119 → cleanSessionAndRender()
    // lo asignaba sin declarar y en 'use strict' lanzaba ReferenceError al reabrir un chat
    // finalizado (regresión: usuario atrapado). Hoy es write-only (el estado real del asesor
    // vive en session.activeAsesor) → candidato a poda en pase anti-código-muerto con telemetría.
    var _asesorJoinedAnnounced = false;
    function createSoftContact() {
        if (_leadCreated || !window.db) return;
        _leadCreated = true;

        var firstUserMsgs = session.messages.filter(function (m) { return m.from === 'user'; }).slice(0, 3);
        var summary = firstUserMsgs.map(function (m) { return m.text; }).join(' / ');

        var lead = {
            kind: 'lead',
            tipo: 'concierge_soft',
            origen: 'concierge',
            nombre: session.nombre || 'Concierge ' + session.sessionId.slice(-6),
            email: session.email || null,
            telefono: session.telefono || null,
            comentarios: summary,
            estado: 'pendiente',
            userId: session.uid || null,
            clientCategory: session.uid ? 'registered' : 'guest',
            sessionId: session.sessionId,
            sourcePage: session.sourcePage,
            sourceVehicleId: session.sourceVehicleId,
            level: session.level,
            createdAt: new Date().toISOString(),
            lastMessageAt: new Date().toISOString()
        };
        // §187: caps espejo de las rules — el .catch de abajo es silencioso y
        // 3 pastes largos del usuario perderían el lead sin rastro.
        if (typeof lead.nombre === 'string') lead.nombre = lead.nombre.slice(0, 120);
        if (typeof lead.comentarios === 'string') lead.comentarios = lead.comentarios.slice(0, 3000);
        if (window.AltorraCommSchema && window.AltorraCommSchema.computeMeta) {
            // §187 FIX: computeMeta devuelve SOLO {priority,tags,slaDeadline,slaMs}
            // — hay que MERGEAR (como contact.js:120); antes REEMPLAZABA el lead
            // y el soft-lead llegaba a Firestore con solo esos 4 campos.
            try { lead = Object.assign({}, lead, window.AltorraCommSchema.computeMeta(lead)); } catch (e) {}
        }

        window.db.collection('solicitudes').add(lead).then(function (ref) {
            _softContactRef = ref;
            session.leadId = ref.id;
            saveSession(session);
        }).catch(function () {});
    }

    function updateSoftContact() {
        if (!_softContactRef || !session.leadId || !window.db) return;
        var update = {
            level: session.level,
            lastMessageAt: new Date().toISOString()
        };
        if (session.nombre) update.nombre = session.nombre;
        if (session.email) update.email = session.email;
        if (session.telefono) update.telefono = session.telefono;
        // Acumular últimos 5 mensajes del usuario en comentarios
        var lastUser = session.messages
            .filter(function (m) { return m.from === 'user'; })
            .slice(-5)
            .map(function (m) { return m.text; }).join(' / ');
        update.comentarios = lastUser;
        window.db.collection('solicitudes').doc(session.leadId)
            .update(update).catch(function () {});
    }

    /**
     * §23 FASE 2 — escalateToLive ahora pasa el chat a `mode='queue'`.
     * El asesor que lo tome (vía claimChat del admin-concierge) lo
     * promueve a `mode='live'`. Esto activa la lógica de cola con
     * SLA timers F5-proof.
     *
     * Args opcionales:
     *   reason: 'manual' | 'double_fallback' | 'sentiment_negative' |
     *           'frustration' | 'ask_human' | 'sla_breach'
     */
    function escalateToLive(reason) {
        var escalationReason = reason || 'manual';
        var nowIso = new Date().toISOString();

        // §60.2 — Optimistic UI: el banner queue + mensaje empático
        // aparecen INSTANT al setear session.mode='queue' + saveSession
        // + addMessage. La transaction Firestore (ensureFirestoreChatDoc
        // + set parent doc) corre en background dentro de waitForAuthThen.
        // Si Firestore falla, addMessage('bot', '⚠️ No pude conectar...')
        // se muestra al usuario con explicación clara.
        console.log('[Concierge] §60.2 escalateToLive optimistic', {
            sid: session.sessionId, reason: escalationReason
        });

        session.mode = 'queue';
        session.queueEnteredAt = nowIso;
        session.escalationReason = escalationReason;
        session.level = Math.max(session.level || 0, 4); // L4 — pendiente atención
        saveSession(session);

        // Mensaje empático según razón
        var msg;
        if (escalationReason === 'double_fallback') {
            msg = 'Parece que tu consulta requiere la ayuda de un experto. Te conectaré con un asesor en vivo de inmediato. 🙋‍♂️';
        } else if (escalationReason === 'frustration' || escalationReason === 'sentiment_negative') {
            msg = 'Te entiendo. Déjame conectarte con un asesor humano que pueda ayudarte directamente.';
        } else {
            msg = '✅ Conectándote con un asesor humano. Estamos consultando disponibilidad…';
        }
        addMessage('bot', msg);

        // Soft contact / lead
        if (!_leadCreated) createSoftContact();
        else updateSoftContact();

        // Crear chat doc en Firestore + iniciar sync bidireccional + SLA watcher
        waitForAuthThen(function () {
            ensureFirestoreChatDoc().then(function () {
                // Asegurar que el doc parent tenga queueEnteredAt + escalationReason
                // para que la Cloud Function workload + listeners cliente vean el cambio
                if (window.db) {
                    window.db.collection('conciergeChats').doc(session.sessionId).set({
                        mode: 'queue',
                        queueEnteredAt: nowIso,
                        escalationReason: escalationReason
                    }, { merge: true }).catch(function () {});
                }
                startSLAWatcher();
                renderQueueState();
            }).catch(function (err) {
                console.warn('[Concierge] No se pudo crear el chat:', err && err.message);
                addMessage('bot', '⚠️ No pude conectar con el asesor en este momento. Por favor intenta de nuevo en unos segundos.');
            });
        });
    }

    /**
     * §23 FASE 2 — SLA Watcher F5-proof.
     * Compara Date.now() contra session.queueEnteredAt cada 30s.
     * Si elapsedMin >= 5 → render alerta con CTA WhatsApp + esperar
     * Si elapsedMin >= 10 → render SLA breach (recomendar WhatsApp)
     * Idempotency: persiste flags en Firestore via session.slaWarnedAt5min
     * y session.slaWarnedAt10min (para que F5 no muestre la alerta 2 veces)
     *
     * Se cancela cuando:
     *   - session.mode pasa a 'live' (asesor tomó el chat)
     *   - session.mode pasa a 'wa_handed_over' (cliente eligió WhatsApp)
     *   - session.closed === true (chat finalizó)
     */
    var _slaWatcherInterval = null;
    function startSLAWatcher() {
        if (_slaWatcherInterval) clearInterval(_slaWatcherInterval);
        _slaWatcherInterval = setInterval(checkSLA, 30 * 1000);
        checkSLA(); // primer check inmediato
    }
    function stopSLAWatcher() {
        if (_slaWatcherInterval) { clearInterval(_slaWatcherInterval); _slaWatcherInterval = null; }
    }
    function checkSLA() {
        if (!session || session.mode !== 'queue' || !session.queueEnteredAt) {
            stopSLAWatcher();
            return;
        }
        if (session.closed) { stopSLAWatcher(); return; }

        var elapsedMin = (Date.now() - new Date(session.queueEnteredAt).getTime()) / 60000;

        // ≥10 min — SLA breach (recomendación fuerte)
        if (elapsedMin >= 10 && !session.slaWarnedAt10min) {
            session.slaWarnedAt10min = true;
            saveSession(session);
            renderSLABreach();
            // Persistir flag a Firestore para idempotencia post-F5
            if (_chatDocCreated && session.sessionId && window.db) {
                window.db.collection('conciergeChats').doc(session.sessionId).set({
                    slaWarnedAt10min: true
                }, { merge: true }).catch(function () {});
            }
            return;
        }
        // ≥5 min — alerta amigable
        if (elapsedMin >= 5 && !session.slaWarnedAt5min) {
            session.slaWarnedAt5min = true;
            saveSession(session);
            renderSLAWarning();
            if (_chatDocCreated && session.sessionId && window.db) {
                window.db.collection('conciergeChats').doc(session.sessionId).set({
                    slaWarnedAt5min: true
                }, { merge: true }).catch(function () {});
            }
        }
        // Cada tick refresca el render del workload state (mensaje dinámico)
        renderQueueState();
    }

    /**
     * §23 FASE 2 — renderQueueState lee system/workload (singleton de
     * Cloud Function recalculateWorkload) y actualiza el banner de cola
     * con mensaje dinámico según asesoresAvailable / asesoresOnline / queueLength.
     */
    var _workloadCache = null;
    var _workloadUnsub = null;
    function ensureWorkloadListener() {
        if (_workloadUnsub || !window.db) return;
        _workloadUnsub = window.db.doc('system/workload').onSnapshot(function (doc) {
            _workloadCache = doc.exists ? doc.data() : null;
            if (session.mode === 'queue') renderQueueState();
            // §77 Sprint S5 — actualizar status del equipo en el header
            // del Concierge cada vez que cambia workload (solo si el panel
            // está abierto). Patrón WhatsApp/Messenger: cliente sabe si
            // hay asesores disponibles antes de escalar.
            try { updateAvailabilityStatus(); } catch (e) {}
        }, function () {});
    }

    /**
     * §77 Sprint S5 — Render del status del equipo en cncStatus header.
     * Lee `_workloadCache` (Firestore singleton system/workload, ya cargado
     * por ensureWorkloadListener). Cuatro estados visuales:
     *   - asesoresAvailable >= 1 → 🟢 "Asesores disponibles · respondemos al instante"
     *   - asesoresOnline >= 1 (saturados) → 🟢 "Asesores online · respondemos pronto"
     *   - asesoresAway >= 1 (todos lejos del teclado) → 🟡 "Te respondemos en breve"
     *   - 0 → ⚫ "Fuera de horario · te contactamos cuando volvamos"
     *
     * Si la sesión está en mode='live' o 'wa_handed_over', preservamos
     * el status de "asesor en vivo" sin sobrescribir.
     *
     * Cliente NO lee /presence directamente (RTDB) — eso expondría
     * datos sensibles (email, IP, deviceId). En su lugar lee Firestore
     * `system/workload` que solo tiene contadores agregados.
     */
    function updateAvailabilityStatus() {
        var statusEl = document.getElementById('cncStatus');
        if (!statusEl) return;
        // Preservar mensajes ya seteados por flows específicos
        if (session.mode === 'live' || session.mode === 'wa_handed_over') return;
        // Si hay asesor activo, su nombre tiene prioridad (applyAsesorHeader)
        if (session.activeAsesor) return;

        var w = _workloadCache || {};
        var available = (w.asesoresAvailable || 0) > 0;
        var online = (w.asesoresOnline || 0) > 0;
        var away = (w.asesoresAway || 0) > 0;

        var label, dotClass;
        if (available) {
            label = 'Asesores disponibles · respondemos al instante';
            dotClass = 'cnc-status-dot--online';
        } else if (online) {
            // Asesores online pero saturados (todos con 3+ chats)
            label = 'Asesores online · respondemos pronto';
            dotClass = 'cnc-status-dot--online';
        } else if (away) {
            label = 'Te respondemos en breve';
            dotClass = 'cnc-status-dot--away';
        } else {
            label = 'Fuera de horario · te contactamos pronto';
            dotClass = 'cnc-status-dot--offline';
        }
        // §17.4 — el header del Concierge usa cncStatus textContent.
        // Para el dot indicator, usamos un span con clase. Re-render
        // idempotente: solo update si cambió.
        var html = '<span class="cnc-status-dot ' + dotClass + '" aria-hidden="true"></span>' +
                   '<span class="cnc-status-label">' + escapeHtml(label) + '</span>';
        if (statusEl.innerHTML !== html) {
            statusEl.innerHTML = html;
        }
    }
    function renderQueueState() {
        var msgsBox = document.getElementById('cncMessages');
        if (!msgsBox) return;
        ensureWorkloadListener();

        // Si ya hay un banner de queue, lo actualizamos in-place
        var existingBanner = document.getElementById('cncQueueBanner');
        var w = _workloadCache || {};
        var elapsedMin = session.queueEnteredAt
            ? Math.floor((Date.now() - new Date(session.queueEnteredAt).getTime()) / 60000)
            : 0;

        var stateMsg, stateClass;
        // §50 — Cliente pidió: "indicar al usuario que el tiempo de respuesta
        // es de 1 a 10 minutos". Telegram + FCM se envían DESDE el minuto 0
        // (sin filtro de asesoresAvailable), por eso el rango bajo es 1 min.
        if (w.asesoresAvailable > 0) {
            stateMsg = '🟢 Estás en la posición #' + Math.max(1, w.queueLength || 1) +
                       '. Un asesor te atenderá entre 1 y 10 minutos.';
            stateClass = 'cnc-queue-banner--available';
        } else if (w.asesoresOnline > 0) {
            stateMsg = '🟡 Nuestros asesores están atendiendo a otros clientes. Tiempo estimado: 1 a 10 minutos.';
            stateClass = 'cnc-queue-banner--saturated';
        } else {
            stateMsg = '🔵 Te conectamos con un asesor humano. Tiempo estimado de respuesta: 1 a 10 minutos.';
            stateClass = 'cnc-queue-banner--offline';
        }

        var html =
            '<div id="cncQueueBanner" class="cnc-queue-banner ' + stateClass + '">' +
                '<div class="cnc-queue-banner-msg">' + stateMsg + '</div>' +
                '<div class="cnc-queue-banner-elapsed">⏱ Esperando hace ' + elapsedMin + ' min</div>' +
            '</div>';

        if (existingBanner) {
            existingBanner.outerHTML = html;
        } else {
            msgsBox.insertAdjacentHTML('beforeend', html);
            msgsBox.scrollTop = msgsBox.scrollHeight;
        }
    }
    function renderSLAWarning() {
        var msgsBox = document.getElementById('cncMessages');
        if (!msgsBox) return;
        // Eliminar banner queue genérico
        var qb = document.getElementById('cncQueueBanner');
        if (qb) qb.remove();
        // Insertar SLA warning con CTAs
        msgsBox.insertAdjacentHTML('beforeend',
            '<div id="cncSLAWarning" class="cnc-sla-banner cnc-sla-banner--warning">' +
                '<div class="cnc-sla-banner-icon">⏰</div>' +
                '<div class="cnc-sla-banner-text">' +
                    '<strong>La espera está siendo más larga de lo normal.</strong><br>' +
                    '¿Prefieres continuar por WhatsApp o seguir esperando aquí?' +
                '</div>' +
                '<div class="cnc-sla-banner-actions">' +
                    '<button class="cnc-sla-btn cnc-sla-btn--wa" data-action="open-wa">📲 Continuar por WhatsApp</button>' +
                    '<button class="cnc-sla-btn cnc-sla-btn--wait" data-action="dismiss-sla-warning">⏳ Seguir esperando</button>' +
                '</div>' +
            '</div>'
        );
        msgsBox.scrollTop = msgsBox.scrollHeight;
    }
    function renderSLABreach() {
        var msgsBox = document.getElementById('cncMessages');
        if (!msgsBox) return;
        var qb = document.getElementById('cncQueueBanner');
        if (qb) qb.remove();
        var sw = document.getElementById('cncSLAWarning');
        if (sw) sw.remove();
        msgsBox.insertAdjacentHTML('beforeend',
            '<div id="cncSLABreach" class="cnc-sla-banner cnc-sla-banner--breach">' +
                '<div class="cnc-sla-banner-icon">🚨</div>' +
                '<div class="cnc-sla-banner-text">' +
                    '<strong>En este momento todos nuestros asesores están ocupados.</strong><br>' +
                    'Te recomendamos comunicarte por WhatsApp para no hacerte esperar más.' +
                '</div>' +
                '<div class="cnc-sla-banner-actions">' +
                    '<button class="cnc-sla-btn cnc-sla-btn--wa cnc-sla-btn--pulsing" data-action="open-wa">📲 Ir a WhatsApp ahora</button>' +
                '</div>' +
            '</div>'
        );
        msgsBox.scrollTop = msgsBox.scrollHeight;
    }

    /**
     * waitForAuthThen — espera hasta 2s a que window.auth.currentUser exista
     * (signInAnonymously en auth.js tarda ~50-300ms). Si pasa el timeout sin
     * resolver, ejecuta callback igual y deja que ensureFirestoreChatDoc maneje
     * el error.
     */
    function waitForAuthThen(cb) {
        if (window.auth && window.auth.currentUser) { cb(); return; }
        var attempts = 0;
        var iv = setInterval(function () {
            attempts++;
            if (window.auth && window.auth.currentUser) {
                clearInterval(iv); cb();
            } else if (attempts >= 10) { // 10 × 200ms = 2s
                clearInterval(iv); cb();
            }
        }, 200);
    }

    function handoverToWhatsApp() {
        var summary = buildWhatsAppSummary();
        var url = 'https://wa.me/' + WHATSAPP_NUMBER.replace(/[^0-9]/g, '') + '?text=' + encodeURIComponent(summary);
        session.mode = 'wa_handed_over';
        saveSession(session);
        window.open(url, '_blank');
    }

    function buildWhatsAppSummary() {
        // U.14 — handover refinado con identidad completa + sentiment + ticket
        var ticket = session.sessionId.slice(-8).toUpperCase();
        var lines = ['🚗 *Altorra Cars Concierge*', '*Ticket:* #' + ticket, ''];

        // Identidad
        if (session.nombre) lines.push('👤 ' + session.nombre);
        if (session.email) lines.push('📧 ' + session.email);
        if (session.telefono) lines.push('📲 ' + session.telefono);
        if (session.sourceVehicleId) lines.push('🔑 Vehículo de interés: #' + session.sourceVehicleId);
        if (session.level >= 3) lines.push('📊 Nivel: L' + session.level + ' (calificado)');

        // Sentiment promedio
        if (window.AltorraAI) {
            try {
                var userMsgs = session.messages.filter(function (m) { return m.from === 'user'; });
                if (userMsgs.length > 0) {
                    var scores = userMsgs.map(function (m) {
                        var s = window.AltorraAI.sentiment(m.text);
                        return s ? s.score : 0;
                    });
                    var avg = scores.reduce(function (a, b) { return a + b; }, 0) / scores.length;
                    var label = avg > 0.2 ? 'positivo 😊' : avg < -0.2 ? 'negativo 😟' : 'neutral';
                    lines.push('💬 Sentiment: ' + label + ' (' + scores.length + ' mensajes)');
                }
            } catch (e) {}
        }

        // Top 3 mensajes del cliente
        lines.push('', '*Últimos mensajes del cliente:*');
        var lastUserMsgs = session.messages.filter(function (m) { return m.from === 'user'; }).slice(-3);
        lastUserMsgs.forEach(function (m, i) {
            var trimmed = m.text.length > 120 ? m.text.slice(0, 117) + '...' : m.text;
            lines.push((i + 1) + '. ' + trimmed);
        });

        lines.push('', '👉 Abrir conversación: altorracars.github.io/admin.html#concierge');
        lines.push('Hola, soy el cliente del ticket #' + ticket + '.');
        return lines.join('\n');
    }

    /* ═══════════════════════════════════════════════════════════
       FIRESTORE SYNC — bidireccional con conciergeChats/<sessionId>
       Solo se activa cuando el chat escala a live mode (U.10).
       ═══════════════════════════════════════════════════════════ */
    var _firestoreUnsub = null;
    var _chatDocCreated = false;
    var _lastSyncedMsgIds = {}; // dedup contra eco

    /* ═══════════════════════════════════════════════════════════
       §75 Sprint S3 — Typing Indicators bidireccionales (RTDB)
       ───────────────────────────────────────────────────────────
       Schema: /typing/{sessionId}/
           user: {typing, ts}
           asesor_<uid>: {name, photoURL, typing, ts}

       Cliente:
         - input listener con throttle 1s + auto-clear 3s
         - onDisconnect.remove para evitar ghosts
         - listener /typing/{sid} para mostrar "X está escribiendo"
           sobre asesor activo (filter stale 5s)

       Namespace `asesor` para no colisionar con el typing del bot
       LLM existente (`cncTypingIndicator`/`.cnc-typing` en líneas
       775-790 — INTACTO). El nuevo es `cncAsesorTypingIndicator`.

       Doctrina §17 — guard rtdb null (catch silencioso si no carga).
       Doctrina §17.12 — cero MutationObserver. Solo `.on('value')`.
       ═══════════════════════════════════════════════════════════ */
    var _typingListenerUnsub = null;
    var _typingThrottleActive = false;
    var _typingClearTimeout = null;
    var _typingActiveAsesor = null;     // cache del asesor visible
    var _typingDisconnectRef = null;    // ref para cancel onDisconnect
    var TYPING_THROTTLE_MS = 1000;
    var TYPING_AUTO_CLEAR_MS = 3000;
    var TYPING_STALE_MS = 5000;

    function setMeTyping(isTyping) {
        if (!window.rtdb || !session.sessionId) return;
        if (!_chatDocCreated) return; // antes de escalar, cero typing
        var ref;
        try {
            ref = window.rtdb.ref('/typing/' + session.sessionId + '/user');
        } catch (e) { return; }
        var payload = { typing: !!isTyping, ts: Date.now() };
        ref.set(payload).catch(function () {});
        if (isTyping) {
            // onDisconnect cleanup (si cliente cierra tab mid-escribiendo,
            // RTDB elimina el nodo automáticamente en <2s)
            try {
                if (!_typingDisconnectRef) {
                    _typingDisconnectRef = ref;
                    ref.onDisconnect().remove().catch(function () {});
                }
            } catch (e) {}
        }
    }

    function onComposerInput() {
        // Throttle 1s — máx 1 update RTDB por segundo aunque
        // user escriba rápido. Auto-clear 3s sin keystrokes.
        if (_typingThrottleActive) {
            // Solo refrescar el auto-clear timer
            if (_typingClearTimeout) clearTimeout(_typingClearTimeout);
            _typingClearTimeout = setTimeout(function () {
                setMeTyping(false);
            }, TYPING_AUTO_CLEAR_MS);
            return;
        }
        _typingThrottleActive = true;
        setTimeout(function () { _typingThrottleActive = false; }, TYPING_THROTTLE_MS);
        setMeTyping(true);
        if (_typingClearTimeout) clearTimeout(_typingClearTimeout);
        _typingClearTimeout = setTimeout(function () {
            setMeTyping(false);
        }, TYPING_AUTO_CLEAR_MS);
    }

    function startTypingListener() {
        if (_typingListenerUnsub || !window.rtdb || !session.sessionId) return;
        if (!_chatDocCreated) return;
        var ref;
        try {
            ref = window.rtdb.ref('/typing/' + session.sessionId);
        } catch (e) { return; }
        // Closure handler para poder cancelarlo (RTDB requiere mismo callback ref)
        var handler = ref.on('value', function (snap) {
            var data = snap.val() || {};
            // Buscar primer asesor con typing=true && ts < 5s ago
            var typingAsesor = null;
            Object.keys(data).forEach(function (key) {
                if (key === 'user') return;
                var entry = data[key];
                if (entry && entry.typing
                    && (Date.now() - (entry.ts || 0)) < TYPING_STALE_MS) {
                    typingAsesor = entry;
                }
            });
            if (typingAsesor) {
                _typingActiveAsesor = typingAsesor;
                showAsesorTypingIndicator(typingAsesor);
            } else {
                _typingActiveAsesor = null;
                hideAsesorTypingIndicator();
            }
        }, function (err) {
            // Permission denied es esperado si rules no desplegadas.
            // Catch silencioso para no romper el chat.
            if (err && err.code === 'PERMISSION_DENIED') {
                console.info('[Concierge] §75 typing listener permission_denied — deploy database rules pendiente.');
            }
        });
        _typingListenerUnsub = function () {
            try { ref.off('value', handler); } catch (e) {}
        };
    }

    function stopTypingListener() {
        if (_typingListenerUnsub) {
            try { _typingListenerUnsub(); } catch (e) {}
            _typingListenerUnsub = null;
        }
        // Limpiar typing del cliente (best-effort) y cancel onDisconnect
        if (_chatDocCreated && session.sessionId && window.rtdb) {
            try {
                var ref = window.rtdb.ref('/typing/' + session.sessionId + '/user');
                ref.set({ typing: false, ts: Date.now() }).catch(function () {});
                if (_typingDisconnectRef) {
                    _typingDisconnectRef.onDisconnect().cancel().catch(function () {});
                    _typingDisconnectRef = null;
                }
            } catch (e) {}
        }
        if (_typingClearTimeout) { clearTimeout(_typingClearTimeout); _typingClearTimeout = null; }
        _typingThrottleActive = false;
        _typingActiveAsesor = null;
        hideAsesorTypingIndicator();
    }

    function showAsesorTypingIndicator(asesor) {
        var box = document.getElementById('cncMessages');
        if (!box) return;
        var existing = document.getElementById('cncAsesorTypingIndicator');
        var name = (asesor && asesor.name) || 'Asesor';
        var photo = (asesor && asesor.photoURL) || '';
        var avatarHTML = photo
            ? '<img class="cnc-asesor-typing-avatar" src="' + escapeHtml(photo) + '" alt="" loading="lazy" onerror="this.style.display=\'none\'">'
            : '<div class="cnc-asesor-typing-avatar cnc-asesor-typing-avatar--initials">' + escapeHtml((name[0] || 'A').toUpperCase()) + '</div>';
        if (existing) {
            // Update name/avatar si cambiaron, no recrear (evita flicker)
            var nameEl = existing.querySelector('.cnc-asesor-typing-name');
            if (nameEl) nameEl.textContent = name + ' está escribiendo';
            return;
        }
        var html = '<div id="cncAsesorTypingIndicator" class="cnc-asesor-typing-indicator">' +
            avatarHTML +
            '<div class="cnc-asesor-typing-bubble">' +
                '<span class="cnc-asesor-typing-name">' + escapeHtml(name) + ' está escribiendo</span>' +
                '<span class="cnc-asesor-typing-dots"><span></span><span></span><span></span></span>' +
            '</div>' +
        '</div>';
        box.insertAdjacentHTML('beforeend', html);
        box.scrollTop = box.scrollHeight;
    }

    function hideAsesorTypingIndicator() {
        var el = document.getElementById('cncAsesorTypingIndicator');
        if (el) el.remove();
    }

    /* ═══════════════════════════════════════════════════════════
       §76 Sprint S4 — Read Receipts (✓ enviado vs ✓✓ leído)
       ───────────────────────────────────────────────────────────
       Schema Firestore en `conciergeChats/{sid}`:
         - lastReadByUser: ISO timestamp  (cliente lo escribe)
         - lastReadByAdmin: ISO timestamp (admin lo escribe)

       Cliente:
         - markUserRead() con throttle 5s al abrir panel + cada 10s
           mientras panel abierto + al recibir mensaje del asesor
         - Listener parent ya extendido (más abajo) para leer
           lastReadByAdmin → guardar en session
         - renderMessages: promueve _status='sent' → 'read' (efectivo)
           si message.timestamp ≤ session.lastReadByAdmin

       Cero deploy backend: rules de §68 R6 ya permiten update por
       cliente (resource.data.userId == auth.uid || == null) y por
       admin (isEditorOrAbove o permission concierge.* con claim).

       Doctrina §17 — guard window.db null. Catch silencioso si rules
       rechazan (chat ajeno o stale).
       Doctrina §17.12 — cero MO. Solo writes puntuales.
       ═══════════════════════════════════════════════════════════ */
    var _lastReadByUserSentAt = 0;
    var _readReceiptInterval = null;
    var READ_RECEIPT_THROTTLE_MS = 5000;
    var READ_RECEIPT_TICK_MS = 10000;

    function markUserRead() {
        if (!_chatDocCreated || !window.db || !session.sessionId) return;
        if (Date.now() - _lastReadByUserSentAt < READ_RECEIPT_THROTTLE_MS) return;
        _lastReadByUserSentAt = Date.now();
        var nowIso = new Date().toISOString();
        try {
            window.db.collection('conciergeChats').doc(session.sessionId)
                .update({ lastReadByUser: nowIso })
                .catch(function () { /* permission_denied silencioso */ });
        } catch (e) {}
    }

    function startReadReceiptInterval() {
        if (_readReceiptInterval) return;
        _readReceiptInterval = setInterval(function () {
            if (_isOpen) markUserRead();
        }, READ_RECEIPT_TICK_MS);
    }

    function stopReadReceiptInterval() {
        if (_readReceiptInterval) {
            clearInterval(_readReceiptInterval);
            _readReceiptInterval = null;
        }
    }

    /**
     * §76 — Convierte timestamp del mensaje + lastReadByAdmin a
     * status efectivo. NO muta `m._status` (eso queda como original
     * 'sent' en localStorage); solo retorna el status visual.
     * Devuelve 'read' si el admin ya marcó leído al menos hasta ese
     * timestamp; sino retorna el status original.
     */
    function effectiveStatusForUserMsg(m) {
        if (!m || !m._status) return null;
        if (m._status !== 'sent') return m._status;
        if (!session.lastReadByAdmin) return 'sent';
        try {
            var msgTs = typeof m.timestamp === 'number' ? m.timestamp : new Date(m.timestamp).getTime();
            var readTs = new Date(session.lastReadByAdmin).getTime();
            if (!isNaN(msgTs) && !isNaN(readTs) && msgTs <= readTs) {
                return 'read';
            }
        } catch (e) {}
        return 'sent';
    }

    function ensureFirestoreChatDoc() {
        if (_chatDocCreated || !window.db) return Promise.resolve();
        var doc = {
            sessionId: session.sessionId,
            userId: session.uid || null,
            userEmail: session.email || null,
            userNombre: session.nombre || null,
            telefono: session.telefono || null,
            sourcePage: session.sourcePage,
            sourceVehicleId: session.sourceVehicleId,
            status: 'active',
            mode: session.mode,
            unreadByAdmin: 0,
            unreadByUser: 0,
            createdAt: new Date().toISOString(),
            lastMessageAt: new Date().toISOString(),
            lastMessage: ''
        };
        _chatDocCreated = true;
        return window.db.collection('conciergeChats').doc(session.sessionId)
            .set(doc, { merge: true })
            .then(function () {
                startFirestoreSync();
                // §75 Sprint S3 — arrancar typing listener tras crear chat doc.
                // El guard interno requiere _chatDocCreated=true (ya seteado).
                try { startTypingListener(); } catch (e) {}
            })
            .catch(function () { _chatDocCreated = false; });
    }

    function startFirestoreSync() {
        if (_firestoreUnsub || !window.db) return;
        // Subir todos los mensajes existentes que aún no estén sincronizados
        var batch = window.db.batch();
        var hadAny = false;
        session.messages.forEach(function (m, i) {
            if (m._synced) return;
            hadAny = true;
            var ref = window.db.collection('conciergeChats').doc(session.sessionId)
                .collection('messages').doc('init_' + i + '_' + Date.now());
            batch.set(ref, {
                from: m.from,
                text: m.text,
                timestamp: new Date(m.timestamp).toISOString()
            });
            m._synced = true;
        });
        if (hadAny) batch.commit().catch(function () {});
        saveSession(session);

        // Listener 1: mensajes nuevos (asesor + system: closed/reopened)
        _firestoreUnsub = window.db.collection('conciergeChats').doc(session.sessionId)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot(function (snap) {
                snap.docChanges().forEach(function (chg) {
                    if (chg.type !== 'added') return;
                    var d = chg.doc.data();
                    if (_lastSyncedMsgIds[chg.doc.id]) return;
                    _lastSyncedMsgIds[chg.doc.id] = true;

                    // Mensajes system desde el admin (ej. cierre/reapertura)
                    if (d.from === 'system') {
                        var alreadySys = session.messages.some(function (m) {
                            return m.from === 'system' && m.text === d.text;
                        });
                        if (!alreadySys) {
                            session.messages.push({
                                from: 'system',
                                systemType: d.systemType || null,
                                text: d.text,
                                timestamp: new Date(d.timestamp).getTime(),
                                _synced: true
                            });
                            saveSession(session);
                            renderMessages();
                            // Si el system message es de cierre, aplicar el bloqueo
                            if (d.systemType === 'closed') {
                                session.closed = true;
                                saveSession(session);
                                applyClosedState();
                            } else if (d.systemType === 'reopened') {
                                session.closed = false;
                                saveSession(session);
                                applyClosedState();
                            }
                        }
                        return;
                    }

                    // F.3 — Mensajes proactivos del bot enviados desde Cloud Function
                    // (proactiveEngagement). Los renderemos con clase distinta
                    // para que se sientan como un nudge del bot, no respuesta.
                    if (d.from === 'bot' && d.proactive) {
                        var alreadyHaveProactive = session.messages.some(function (m) {
                            return m.from === 'bot' && m.proactive && m.text === d.text;
                        });
                        if (!alreadyHaveProactive) {
                            session.messages.push({
                                from: 'bot',
                                proactive: true,
                                triggerType: d.triggerType || null,
                                text: d.text,
                                timestamp: new Date(d.timestamp).getTime(),
                                _synced: true
                            });
                            saveSession(session);
                            renderMessages();
                        }
                        return;
                    }

                    // Mensajes del asesor
                    if (d.from === 'asesor') {
                        var alreadyHave = session.messages.some(function (m) {
                            return m.from === 'asesor' && m.text === d.text;
                        });
                        if (!alreadyHave) {
                            // PRIMER mensaje del asesor → anunciar incorporación + actualizar header
                            var isFirstAsesorMsg = !session.activeAsesor;
                            if (isFirstAsesorMsg) {
                                var asesorNombre = d.asesorNombre || 'Asesor';
                                session.activeAsesor = {
                                    uid: d.asesorUid || null,
                                    nombre: asesorNombre,
                                    photoURL: d.asesorPhotoURL || null
                                };
                                session.messages.push({
                                    from: 'system',
                                    text: '✓ ' + asesorNombre + ' se ha unido al chat',
                                    timestamp: new Date(d.timestamp).getTime() - 1,
                                    _synced: true
                                });
                                applyAsesorHeader();
                            }
                            session.messages.push({
                                from: 'asesor',
                                text: d.text,
                                timestamp: new Date(d.timestamp).getTime(),
                                _synced: true
                            });
                            saveSession(session);
                            renderMessages();
                            window.db.collection('conciergeChats').doc(session.sessionId)
                                .update({ unreadByUser: 0 }).catch(function () {});
                            // §76 Sprint S4 — Marcar como leído INMEDIATO si el
                            // panel está abierto (cliente está viendo el mensaje
                            // ahora mismo). Si está cerrado, NO marcar — esperamos
                            // a que el cliente abra el panel para que el asesor vea
                            // ✓✓ azul. Throttle 5s del helper evita spam.
                            if (_isOpen) {
                                try { markUserRead(); } catch (e) {}
                            }
                        }
                    }
                });
            }, function () { /* permission errors silenced */ });

        // Listener 2: doc parent — detecta status closed/active sin esperar
        // a que llegue un system message (defensa por si admin solo updateó status)
        // §23 FASE 5: también captura el radicado asignado por la Cloud Function
        // onConciergeChatCreated (~1s después de crear el chat)
        _firestoreParentUnsub = window.db.collection('conciergeChats').doc(session.sessionId)
            .onSnapshot(function (doc) {
                if (!doc.exists) return;
                // §26.7 — Guard: ignorar snapshots durante reset.
                // Sin esto, un snapshot tardío (status='closed' del
                // markChatClosedInFirestore) puede pisar la sesión nueva.
                if (session._resetting) return;
                var d = doc.data();
                var changed = false;
                var wasClosed = !!session.closed;
                var nowClosed = d.status === 'closed';
                if (wasClosed !== nowClosed) {
                    session.closed = nowClosed;
                    changed = true;
                }
                // §23 — propagar radicado cuando la Cloud Function lo asigne
                if (d.radicado && session.radicado !== d.radicado) {
                    session.radicado = d.radicado;
                    changed = true;
                    updateRadicadoBadge();
                }
                // §23 FASE 2 — propagar mode (queue → live cuando asesor claim)
                if (d.mode && session.mode !== d.mode) {
                    var prevMode = session.mode;
                    session.mode = d.mode;
                    changed = true;
                    // Si pasamos a live: limpiar banners de queue + parar SLA watcher
                    if (d.mode === 'live' && prevMode === 'queue') {
                        stopSLAWatcher();
                        var qb = document.getElementById('cncQueueBanner');
                        if (qb) qb.remove();
                        var sw = document.getElementById('cncSLAWarning');
                        if (sw) sw.remove();
                        var sb = document.getElementById('cncSLABreach');
                        if (sb) sb.remove();
                    }
                }
                // §23 FASE 2 — propagar queueEnteredAt (importante post-F5)
                if (d.queueEnteredAt && session.queueEnteredAt !== d.queueEnteredAt) {
                    session.queueEnteredAt = d.queueEnteredAt;
                    changed = true;
                    if (d.mode === 'queue') startSLAWatcher();
                }
                // §23 — propagar SLA flags para idempotencia post-F5
                if (typeof d.slaWarnedAt5min !== 'undefined' && session.slaWarnedAt5min !== d.slaWarnedAt5min) {
                    session.slaWarnedAt5min = d.slaWarnedAt5min;
                    changed = true;
                }
                if (typeof d.slaWarnedAt10min !== 'undefined' && session.slaWarnedAt10min !== d.slaWarnedAt10min) {
                    session.slaWarnedAt10min = d.slaWarnedAt10min;
                    changed = true;
                }
                // §76 Sprint S4 — propagar lastReadByAdmin para que
                // los bubbles del cliente pasen de ✓ a ✓✓ azul cuando
                // el admin abre el chat o lo deja abierto.
                if (d.lastReadByAdmin && session.lastReadByAdmin !== d.lastReadByAdmin) {
                    session.lastReadByAdmin = d.lastReadByAdmin;
                    changed = true;
                    // Re-render para promover _status sent → read efectivo
                    try { renderMessages(); } catch (e) {}
                }
                if (changed) {
                    saveSession(session);
                    if (wasClosed !== nowClosed) applyClosedState();
                }
            }, function () {});

        // §23 FASE 2 — si la sesión cargada (post-F5) ya estaba en mode='queue',
        // restaurar el SLA watcher inmediatamente con el queueEnteredAt persistido
        if (session.mode === 'queue' && session.queueEnteredAt && !session.closed) {
            startSLAWatcher();
        }
    }

    /**
     * §23 FASE 5 — actualiza el badge del radicado en el header del widget.
     * El radicado lo asigna la Cloud Function `onConciergeChatCreated` y
     * llega vía listener parent (~1s post-create del chat).
     */
    function updateRadicadoBadge() {
        var statusEl = document.getElementById('cncStatus');
        if (!statusEl) return;
        if (!session.radicado) return;
        // Solo agregar el badge si no está ya
        if (statusEl.textContent.indexOf(session.radicado) === -1) {
            statusEl.innerHTML = 'Asistente Virtual IA · Altorra Cars · ' +
                '<span class="cnc-radicado-inline">' + session.radicado + '</span>';
        }
    }
    var _firestoreParentUnsub = null;

    /**
     * §60.2 — Retry de un mensaje 'user' que quedó en _status='failed'.
     *
     * Patrón WhatsApp/Telegram: error visible inline + acción
     * recuperación. Click en "Reintentar" → quitamos el msg failed de
     * session.messages y re-enviamos su texto via addMessage normal
     * (que crea un msg fresh con _status='pending').
     *
     * Ventajas vs. solo reintentar el sync del msg viejo:
     * - El nuevo msg tiene timestamp actual (más útil para el asesor).
     * - Genera un tempId nuevo (no colisiona con el viejo si estaba en
     *   _pending de algún store).
     * - El UI se ordena cronológicamente con la última versión.
     */
    function retryFailedMessage(tempId) {
        if (!tempId) return;
        var idx = -1;
        for (var i = 0; i < session.messages.length; i++) {
            if (session.messages[i]._tempId === tempId &&
                session.messages[i]._status === 'failed') {
                idx = i;
                break;
            }
        }
        if (idx < 0) {
            console.warn('[Concierge] §60.2 retry-msg: tempId no encontrado o ya no failed', tempId);
            return;
        }
        var failedMsg = session.messages[idx];
        var retryText = failedMsg.text;
        console.log('[Concierge] §60.2 retry-msg', { tempId: tempId, text: retryText.slice(0, 40) });
        // Remover el msg failed de la lista + re-render
        session.messages.splice(idx, 1);
        saveSession(session);
        renderMessages();
        // Re-enviar como mensaje fresco (el flow normal crea pending
        // con tempId nuevo y dispara syncMessageToFirestore).
        addMessage('user', retryText);
    }

    function syncMessageToFirestore(msg) {
        if (!_chatDocCreated || !window.db) return;
        var ref = window.db.collection('conciergeChats').doc(session.sessionId)
            .collection('messages').doc();
        // §60.2 — Optimistic UI confirm/rollback
        if (msg._tempId) {
            console.log('[Concierge] §60.2 syncMessage pending', { tempId: msg._tempId, from: msg.from });
        }
        ref.set({
            from: msg.from,
            text: msg.text,
            timestamp: new Date(msg.timestamp).toISOString()
        }).then(function () {
            msg._synced = true;
            // §60.2 — Marcar 'sent' SOLO si tenía status 'pending' (mensajes user con _chatDocCreated).
            // Mensajes bot/asesor/system pasan por aquí también pero no tienen _status.
            if (msg._status === 'pending') {
                msg._status = 'sent';
                msg.firestoreId = ref.id;
                console.log('[Concierge] §60.2 syncMessage confirmed', { tempId: msg._tempId, firestoreId: ref.id });
                renderMessages();
            }
            saveSession(session);
        }).catch(function (err) {
            // §60.2 — Rollback: marcar 'failed' + mostrar botón Reintentar
            if (msg._status === 'pending') {
                msg._status = 'failed';
                msg._error = (err && err.message) || 'unknown';
                console.warn('[Concierge] §60.2 syncMessage failed', { tempId: msg._tempId, error: msg._error });
                saveSession(session);
                renderMessages();
            }
        });
        // Update parent doc lastMessage + counters
        var update = {
            lastMessage: msg.text.slice(0, 80),
            lastMessageAt: new Date(msg.timestamp).toISOString(),
            mode: session.mode
        };
        if (msg.from === 'user') update.unreadByAdmin = (window.firebase && window.firebase.firestore) ?
            window.firebase.firestore.FieldValue.increment(1) : 1;
        window.db.collection('conciergeChats').doc(session.sessionId)
            .set(update, { merge: true }).catch(function () {});
    }

    // LEGACY alias — createLeadInCRM ahora delega a createSoftContact (U.16)
    function createLeadInCRM() { return createSoftContact(); }

    /* ═══════════════════════════════════════════════════════════
       UI — botón flotante + panel
       ═══════════════════════════════════════════════════════════ */
    var _isOpen = false;

    /**
     * Avatar de ALTOR — el bot/asistente virtual con identidad propia.
     * Imagen PNG corporativa subida a la raíz del sitio (/ALTOR.png).
     * Usado en FAB, header del panel y avatar de mensajes del bot.
     *
     * Ruta absoluta `/ALTOR.png` para que resuelva igual desde cualquier
     * página (raíz, /vehiculos/X, /marcas/X, etc.). Fallback a iniciales
     * "AL" si el PNG falla a cargar (defensivo).
     */
    var ALTOR_IMG_SRC = '/ALTOR.png';
    var ALTOR_AVATAR_HTML =
        '<img src="' + ALTOR_IMG_SRC + '" alt="ALTOR" class="cnc-altor-img" ' +
        'loading="eager" decoding="async" ' +
        'onerror="this.outerHTML=\'<span class=cnc-altor-fallback>AL</span>\'">';

    function ensureUI() {
        if (document.getElementById('altorra-concierge')) return;

        var btn = document.createElement('button');
        btn.id = 'altorra-concierge-btn';
        btn.className = 'altorra-concierge-btn';
        btn.setAttribute('aria-label', 'Abrir ALTOR — Asistente Virtual IA de Altorra Cars');
        btn.innerHTML = ALTOR_AVATAR_HTML;
        btn.addEventListener('click', toggle);
        document.body.appendChild(btn);

        // CTA bubble — flota junto al FAB con mensajes rotativos cada N segundos
        var ctaBubble = document.createElement('div');
        ctaBubble.id = 'altorra-cta-bubble';
        ctaBubble.className = 'cnc-cta-bubble';
        ctaBubble.setAttribute('role', 'button');
        ctaBubble.setAttribute('tabindex', '0');
        ctaBubble.setAttribute('aria-label', 'Abrir ALTOR');
        ctaBubble.innerHTML =
            '<span class="cnc-cta-bubble-text" id="altorraCtaBubbleText">¡Quiero hablar contigo!</span>' +
            '<button class="cnc-cta-bubble-close" aria-label="Cerrar invitación">×</button>';
        document.body.appendChild(ctaBubble);
        // Click en el bubble (excepto en X) abre el panel
        ctaBubble.addEventListener('click', function (e) {
            if (e.target.closest('.cnc-cta-bubble-close')) {
                e.stopPropagation();
                hideCtaBubble();
                snoozeCtaBubble(); // suprimir 5 min
                return;
            }
            hideCtaBubble();
            open();
        });
        ctaBubble.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                hideCtaBubble();
                open();
            }
        });

        scheduleCtaBubble();

        var panel = document.createElement('div');
        panel.id = 'altorra-concierge';
        panel.className = 'altorra-concierge';
        panel.setAttribute('role', 'dialog');
        panel.setAttribute('aria-label', 'ALTOR — Asistente Virtual IA de Altorra Cars');
        panel.setAttribute('aria-hidden', 'true');
        panel.innerHTML =
            '<div class="cnc-header">' +
                '<div class="cnc-header-info">' +
                    '<div class="cnc-avatar" id="cncAvatar">' + ALTOR_AVATAR_HTML + '</div>' +
                    '<div>' +
                        '<div class="cnc-title" id="cncTitle">ALTOR</div>' +
                        '<div class="cnc-status" id="cncStatus">Asistente Virtual IA · Altorra Cars</div>' +
                    '</div>' +
                '</div>' +
                '<div class="cnc-header-actions">' +
                    '<button class="cnc-header-menu-btn" id="cncHeaderMenuBtn" aria-label="Opciones" aria-haspopup="true" aria-expanded="false">' +
                        '<i data-lucide="more-vertical"></i>' +
                    '</button>' +
                    '<button class="cnc-close" aria-label="Cerrar">×</button>' +
                '</div>' +
            '</div>' +
            // Header dropdown menu (oculto por default, click ⋮ lo muestra)
            '<div class="cnc-header-dropdown" id="cncHeaderDropdown" role="menu" hidden>' +
                '<button class="cnc-header-dropdown-item" data-action="reset-session" role="menuitem">' +
                    '<i data-lucide="refresh-ccw"></i><span>Finalizar conversación</span>' +
                '</button>' +
            '</div>' +
            // Lead Capture Gate — visible si gateCompleted === false
            '<div class="cnc-gate" id="cncGate" style="display:none;">' +
                '<div class="cnc-gate-head">' +
                    '<div class="cnc-gate-title">Déjanos tus datos</div>' +
                    '<div class="cnc-gate-sub">Solo necesitamos cómo contactarte. Toma 10 segundos.</div>' +
                '</div>' +
                '<form class="cnc-gate-form" id="cncGateForm" autocomplete="on" novalidate>' +
                    // F2 (EPIC): mínimo viable = nombre + celular (lo obligatorio arriba).
                    '<div class="cnc-gate-row">' +
                        '<label><span>Nombre *</span><input type="text" name="nombre" required minlength="2" autocomplete="given-name"></label>' +
                        '<label><span>Celular (WhatsApp) *</span><input type="tel" name="celular" required pattern="3[0-9]{9}" inputmode="numeric" autocomplete="tel-national" placeholder="3201234567"></label>' +
                    '</div>' +
                    // F2 (EPIC): CÉDULA RETIRADA (mayor fricción/fuga de leads; se pide al formalizar con un
                    // humano, no en el chat). apellido + correo ahora OPCIONALES.
                    '<div class="cnc-gate-row">' +
                        '<label><span>Apellido</span><input type="text" name="apellido" autocomplete="family-name" placeholder="Opcional"></label>' +
                        '<label><span>Correo</span><input type="email" name="correo" autocomplete="email" placeholder="Opcional"></label>' +
                    '</div>' +
                    // ⚖️ Ley 1581: el mecanismo de consentimiento existe; el TEXTO legal exacto + link a la
                    // Política de Tratamiento de Datos = gate P4 (abogado, §42-LEGAL). NO finalizar sin revisión legal.
                    '<label class="cnc-gate-consent"><input type="checkbox" name="consent" required>' +
                        '<span>Autorizo a Altorra Cars a contactarme y a tratar mis datos personales.</span>' +
                    '</label>' +
                    '<button type="submit" class="cnc-gate-submit">Continuar</button>' +
                    '<div class="cnc-gate-error" id="cncGateError" role="alert" aria-live="polite"></div>' +
                    // F2.b (EPIC): fallback WhatsApp en el MISMO punto del form = rescate del invariante
                    // cero-pérdida (quien no completa el form NO se evapora: sigue por WhatsApp con contexto,
                    // reusa handoverToWhatsApp). type="button" → NO dispara la validación del form.
                    // (El TEXTO legal del 1er msg automático en WA = gate P4 abogado, §42-LEGAL — no se añade aquí.)
                    '<div class="cnc-gate-or"><span>o</span></div>' +
                    '<button type="button" class="cnc-gate-wa" id="cncGateWa">' +
                        '<i data-lucide="message-circle" aria-hidden="true"></i> Prefiero seguir por WhatsApp' +
                    '</button>' +
                '</form>' +
            '</div>' +
            // Quick action — solo visible cuando gate completado
            '<div class="cnc-quick-actions" id="cncQuickActions">' +
                '<button class="cnc-quick-btn" data-action="escalate">' +
                    '<i data-lucide="user-circle" aria-hidden="true"></i> Hablar con asesor' +
                '</button>' +
            '</div>' +
            '<div class="cnc-messages" id="cncMessages"></div>' +
            '<div class="cnc-input-wrap" id="cncInputWrap">' +
                '<input type="text" class="cnc-input" id="cncInput" placeholder="Escribe tu mensaje..." autocomplete="off">' +
                '<button class="cnc-send" id="cncSend" aria-label="Enviar">' +
                    '<i data-lucide="send" aria-hidden="true"></i>' +
                '</button>' +
            '</div>';
        document.body.appendChild(panel);

        // Refresh Lucide en los <i data-lucide> recién insertados (scoped, no global)
        if (window.AltorraIcons && window.AltorraIcons.refresh) {
            window.AltorraIcons.refresh(panel);
        } else if (window.lucide && window.lucide.createIcons) {
            try { window.lucide.createIcons({ context: panel }); } catch (e) {}
        }

        // Wire UI
        // §57 — La X usa closeOrFinalize para que cuando la sesión está
        // marcada como client_finalized, limpie todo (DOM + sesión nueva)
        // en vez de solo ocultar el panel.
        panel.querySelector('.cnc-close').addEventListener('click', closeOrFinalize);

        // BUG #1 FIX — Header dropdown menu (⋮) con "Finalizar conversación"
        var menuBtn = document.getElementById('cncHeaderMenuBtn');
        var dropdown = document.getElementById('cncHeaderDropdown');
        if (menuBtn && dropdown) {
            menuBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                var isOpen = !dropdown.hasAttribute('hidden');
                if (isOpen) {
                    dropdown.setAttribute('hidden', '');
                    menuBtn.setAttribute('aria-expanded', 'false');
                } else {
                    dropdown.removeAttribute('hidden');
                    menuBtn.setAttribute('aria-expanded', 'true');
                }
            });
            // Click en items del dropdown
            dropdown.addEventListener('click', function (e) {
                var btn = e.target.closest('[data-action]');
                if (!btn) return;
                var action = btn.dataset.action;
                dropdown.setAttribute('hidden', '');
                menuBtn.setAttribute('aria-expanded', 'false');
                if (action === 'reset-session') {
                    handleClientResetSession();
                }
            });
            // Click fuera cierra el dropdown
            document.addEventListener('click', function (e) {
                if (!dropdown.contains(e.target) && e.target !== menuBtn) {
                    dropdown.setAttribute('hidden', '');
                    menuBtn.setAttribute('aria-expanded', 'false');
                }
            });
        }
        var input = document.getElementById('cncInput');
        var sendBtn = document.getElementById('cncSend');
        function doSend() {
            var v = input.value.trim();
            if (!v) return;
            input.value = '';
            send(v);
        }
        sendBtn.addEventListener('click', doSend);
        input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') { e.preventDefault(); doSend(); }
        });
        // §75 Sprint S3 — Typing indicator: notifica al admin que el cliente
        // está escribiendo. Throttle 1s + auto-clear 3s. Solo aplica si
        // _chatDocCreated (post-escalate). Cero impacto antes del escalate.
        input.addEventListener('input', function () {
            try { onComposerInput(); } catch (e) {}
        });

        // Quick action handlers
        panel.addEventListener('click', function (e) {
            // §22 Propuesta #2 — Click en quick reply re-ejecuta send con el payload
            var qrBtn = e.target.closest('[data-quick-reply]');
            if (qrBtn) {
                var payload = qrBtn.getAttribute('data-quick-reply');
                if (payload && payload.trim()) {
                    send(payload);
                }
                return;
            }
            // §26.2 — Vehicle card actions (agendar / escalate por auto específico)
            var vcBtn = e.target.closest('[data-vcard-action]');
            if (vcBtn) {
                var action = vcBtn.getAttribute('data-vcard-action');
                var vehicleId = vcBtn.getAttribute('data-vehicle-id') || '';
                if (action === 'agendar') {
                    send('Quiero agendar una visita para el vehículo ' + vehicleId);
                } else if (action === 'escalate') {
                    escalateToLive('vehicle_card_request');
                }
                return;
            }
            var btn = e.target.closest('[data-action]');
            if (!btn) return;
            // §57.9 — diagnóstico: log de cada data-action ejecutado.
            // Si los botones del closed-block no respondieran, el log
            // identifica si es problema de delegation, click target,
            // o lógica del handler.
            var actionName = btn.getAttribute('data-action');
            console.log('[Concierge] §57.9 panel.click → data-action=' + actionName + ' target=' + (e.target.tagName || ''));
            // §87 Sprint C-S9 — CSAT rate handler especial: necesita leer
            // data-csat-score del button matched. Lo procesamos ANTES de
            // delegar a handleAction(actionName) porque handleAction solo
            // recibe el action string, no el button.
            if (actionName === 'csat-rate') {
                var csatScore = btn.getAttribute('data-csat-score');
                handleCSATRate(csatScore);
                return;
            }
            // §60.2 — Retry para mensajes failed (Optimistic UI cliente).
            // El botón Reintentar está dentro de un bubble msg failed; trae
            // su tempId para identificar el mensaje exacto a re-enviar.
            if (actionName === 'retry-msg') {
                var failedTempId = btn.getAttribute('data-temp-id');
                if (failedTempId) retryFailedMessage(failedTempId);
                return;
            }
            handleAction(actionName);
        });

        // Lead Capture Gate form handler
        var gateForm = document.getElementById('cncGateForm');
        if (gateForm) {
            gateForm.addEventListener('submit', handleGateSubmit);
        }

        // F2.b (EPIC) — fallback WhatsApp en el gate (cero-pérdida): si el cliente prefiere no
        // llenar el form, lo pasamos a WhatsApp con el contexto que ya tengamos. Capturamos el
        // nombre/celular tipeados SOLO si son válidos, para enriquecer buildWhatsAppSummary; no
        // exigimos consent porque es el cliente quien inicia el contacto saliente hacia nosotros.
        var gateWaBtn = document.getElementById('cncGateWa');
        if (gateWaBtn && gateForm) {
            gateWaBtn.addEventListener('click', function () {
                try {
                    var n = ((gateForm.nombre && gateForm.nombre.value) || '').trim();
                    var c = ((gateForm.celular && gateForm.celular.value) || '').trim();
                    if (n.length >= 2 && !session.nombre) session.nombre = n;
                    if (/^3[0-9]{9}$/.test(c) && !session.telefono) session.telefono = c;
                } catch (e) {}
                handoverToWhatsApp();
            });
        }

        // Aplicar estado inicial: mostrar gate si falta + sync header con activeAsesor
        applyGateVisibility();
        applyAsesorHeader();
    }

    /* ═══════════════════════════════════════════════════════════
       LEAD CAPTURE GATE — captura datos antes del primer mensaje
       ═══════════════════════════════════════════════════════════ */
    function isGateRequired() {
        // FASE 2.B — Si gate ya completado (sea por form o por auth profile), skip
        if (session.gateCompleted && session.profile) return false;
        // F2 (EPIC): si el cliente está logueado con lo esencial (uid + nombre + celular),
        // saltamos el gate. (Cédula/correo ya NO son obligatorios — se retiró la cédula del chat.)
        if (session.uid && session.email && session.nombre) return false;
        // §86 Sprint C-S8 — Progressive profiling: gate NO es forzoso al
        // primer mensaje. Solo aparece cuando el bot lo solicita
        // explícitamente vía requestGateInline() (intents high-value:
        // financiacion, agendar visita, sell my car, asesor humano).
        // Antes era forzoso (return true por default) → ahora es contextual.
        if (session.gateRequestedInline) return true;
        return false;
    }

    /**
     * §86 Sprint C-S8 — ¿El cliente necesita dejar identidad para una
     * acción high-value (financiación, agendar visita, peritaje,
     * conectar con asesor humano)?
     *
     * Retorna true si el cliente NO tiene perfil completo. False si el
     * cliente ya completó el gate, está logueado con datos completos,
     * o ya fue marcado para gate inline (evita pedirlo 2 veces).
     */
    function needsIdentityForHighValueAction() {
        // Ya completó gate manualmente — listo
        if (session.gateCompleted && session.profile) return false;
        // Logueado con datos esenciales (uid + email + nombre)
        if (session.uid && session.email && session.nombre) return false;
        // Ya pidió gate inline en un turno anterior — no duplicar el pedido
        if (session.gateRequestedInline) return false;
        // Cualquier otro caso (anónimo, logueado sin datos completos) → requiere gate
        return true;
    }

    /**
     * FASE 2.B — Carga el perfil del usuario logueado desde clientes/{uid}
     * y lo inyecta en la sesión del chat. Llamado desde onAuthStateChanged
     * cuando el user es no-anónimo.
     *
     * Resultado: el cliente logueado salta el Lead Capture Gate; sus datos
     * (nombre, apellido, cedula, celular, correo) ya están en el chat
     * disponibles para el bot y el asesor.
     */
    function loadProfileFromAuth() {
        if (!window.auth || !window.auth.currentUser ||
            window.auth.currentUser.isAnonymous || !window.db) {
            return Promise.resolve(null);
        }
        var user = window.auth.currentUser;
        return window.db.collection('clientes').doc(user.uid).get().then(function (snap) {
            if (!snap.exists) return null;
            var d = snap.data() || {};
            var fullName = (d.nombre || user.displayName || '').trim();
            var parts = fullName.split(/\s+/);
            var firstName = parts[0] || '';
            var lastName  = parts.slice(1).join(' ');
            return {
                uid: user.uid,
                nombre: firstName,
                apellido: lastName,
                correo: d.email || user.email || '',
                cedula: d.cedula || '',
                celular: d.telefono || '',
                consent: true,         // user ya aceptó al registrarse
                source: 'auth_profile'
            };
        }).catch(function () {
            return null;
        });
    }

    /**
     * Aplica el perfil del auth user a la sesión del chat. Marca
     * gateCompleted si el perfil tiene los datos esenciales (nombre + email).
     * Si falta cedula, NO marca gateCompleted — el gate aparece pero
     * pre-rellenado con lo que ya tenemos.
     */
    function applyAuthProfileToSession(profile) {
        if (!profile) return;
        // §26.5 — Guard: ignorar callbacks tardíos durante reset
        if (session._resetting) return;
        session.uid = profile.uid;
        session.email = profile.correo;
        session.nombre = (profile.nombre + ' ' + profile.apellido).trim();
        session.telefono = profile.celular;
        // F2 (EPIC): mínimo esencial = nombre + celular (cédula/correo ya no obligatorios) → saltamos el gate
        if (profile.nombre && profile.celular) {
            session.profile = profile;
            session.gateCompleted = true;
            session.level = Math.max(session.level || 0, 2);
        } else {
            // Perfil incompleto (usuario viejo sin cédula) — gate aparece pre-rellenado
            session.profile = null;
            session.gateCompleted = false;
            session.level = Math.max(session.level || 0, 1);
        }
        saveSession(session);
        // Re-aplicar UI si está abierto
        if (_isOpen) applyGateVisibility();
    }

    function applyGateVisibility() {
        var gate = document.getElementById('cncGate');
        var qa = document.getElementById('cncQuickActions');
        var msgs = document.getElementById('cncMessages');
        var inp = document.getElementById('cncInputWrap');
        if (!gate) return;
        if (isGateRequired()) {
            // §86 — Sub-header dinámico según el motivo del gate inline
            applyGateHeaderForReason(session.gateRequestReason || null);
            gate.style.display = 'flex';
            if (qa) qa.style.display = 'none';
            // §86 — Si gate viene de progressive profiling (deferred query),
            // mantener mensajes VISIBLES arriba del gate para preservar el
            // contexto de la conversación. Si es flow legacy (cliente nuevo
            // pre-§86), ocultarlos como antes.
            var keepMsgsVisible = !!session.gateRequestedInline;
            if (msgs) msgs.style.display = keepMsgsVisible ? '' : 'none';
            if (inp) inp.style.display = 'none';
        } else {
            gate.style.display = 'none';
            if (qa) qa.style.display = '';
            if (msgs) msgs.style.display = '';
            if (inp) inp.style.display = '';
        }
    }

    /**
     * §86 Sprint C-S8 — Sub-header dinámico del gate según el motivo.
     * El gate inline pide datos solo cuando es relevante. El sub-header
     * explica POR QUÉ pide los datos para que el cliente entienda.
     */
    function applyGateHeaderForReason(reason) {
        var titleEl = document.querySelector('.cnc-gate-title');
        var subEl = document.querySelector('.cnc-gate-sub');
        if (!titleEl || !subEl) return;
        // Mapa reason → {title, sub}
        var REASONS = {
            financiacion: {
                title: 'Datos para financiación',
                sub: 'Para que un asesor te arme una propuesta personalizada.'
            },
            cita: {
                title: 'Coordinemos tu visita',
                sub: 'Necesitamos tus datos para confirmar fecha y hora.'
            },
            asesor: {
                title: 'Te conectamos con un asesor',
                sub: 'Para que pueda llamarte o escribirte directo.'
            },
            vender: {
                title: 'Datos para tu peritaje',
                sub: 'Un asesor te contactará para coordinar valuación.'
            }
        };
        var entry = REASONS[reason] || null;
        if (entry) {
            titleEl.textContent = entry.title;
            subEl.textContent = entry.sub;
        } else {
            titleEl.textContent = 'Antes de empezar';
            subEl.textContent = 'Cuéntanos quién eres para que podamos darte el mejor servicio.';
        }
    }

    /**
     * §86 Sprint C-S8 — Pedir el gate inline en flujos high-value.
     * El bot lo invoca cuando detecta intent que requiere identidad
     * (financiacion_query, appointment_request, sell_my_car,
     * request_help con asesor humano).
     *
     * @param {string} reason   Identificador del motivo (financiacion, cita, asesor, vender)
     * @param {string} deferredQuery   Mensaje original del cliente que disparó el gate.
     *                                 Se ejecuta como bot response tras completar el gate.
     */
    function requestGateInline(reason, deferredQuery) {
        // Si el cliente ya está logueado con perfil completo, NO pedir gate
        if (session.gateCompleted && session.profile) return false;
        if (session.uid && session.email && session.nombre) return false;
        // Marcar el flag → isGateRequired retorna true en próxima evaluación
        session.gateRequestedInline = true;
        session.gateRequestReason = reason || null;
        if (deferredQuery) {
            session._deferredQuery = deferredQuery;
        }
        saveSession(session);
        applyGateVisibility();
        return true;
    }

    function handleGateSubmit(e) {
        e.preventDefault();
        var form = e.target;
        var errEl = document.getElementById('cncGateError');
        function fail(msg) { if (errEl) errEl.textContent = msg; }
        fail('');

        var fd = {
            nombre: (form.nombre.value || '').trim(),
            apellido: (form.apellido.value || '').trim(),
            celular: (form.celular.value || '').trim(),
            correo: (form.correo.value || '').trim().toLowerCase(),
            consent: !!form.consent.checked
        };

        // F2 (EPIC): mínimo viable = nombre + celular. apellido + correo OPCIONALES; cédula RETIRADA.
        // (Validaciones explícitas: los HTML5 validators a veces no disparan bien en mobile.)
        if (fd.nombre.length < 2) return fail('Por favor escribe tu nombre.');
        if (!/^3[0-9]{9}$/.test(fd.celular)) return fail('Celular inválido (formato colombiano: 3XX XXX XXXX).');
        if (fd.correo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fd.correo)) return fail('Correo inválido.');
        if (!fd.consent) return fail('Necesitamos tu autorización para contactarte.');

        // Persistir en sesión
        session.profile = fd;
        session.nombre = (fd.nombre + ' ' + fd.apellido).trim();
        session.email = fd.correo;
        session.telefono = fd.celular;
        session.gateCompleted = true;
        session.level = Math.max(session.level || 0, 2); // L2 contactable
        // §86 — limpiar flags de progressive profiling (gate ya cumplido)
        session.gateRequestedInline = false;
        session.gateRequestReason = null;
        var deferredQuery = session._deferredQuery || null;
        session._deferredQuery = null;
        saveSession(session);

        // Crear soft contact con perfil COMPLETO (NER ya tiene todo)
        if (!_leadCreated) createSoftContact();
        else updateSoftContact();

        var firstName = fd.nombre.trim().split(/\s+/)[0];

        // §86 Sprint C-S8 — Si el gate vino de progressive profiling
        // (cliente pidió financiación/cita/peritaje y bot pidió datos),
        // NO sembrar greeting genérico. En su lugar, agradecer brevemente
        // y ejecutar la respuesta diferida con el intent original.
        if (deferredQuery) {
            addMessage('bot', '¡Listo, ' + firstName + '! 🙌 Ya tengo tus datos. Te respondo:');
            applyGateVisibility();
            // Ejecutar la respuesta diferida con delay corto para que el
            // cliente vea primero el bubble de "Listo, X".
            setTimeout(function () {
                try {
                    var resp = generateBotResponse(deferredQuery);
                    if (resp && resp.text) {
                        var deferredIntent = (session.context && session.context.lastIntent) || null;
                        var deferredHasVCards = Array.isArray(resp.vehicleCards) && resp.vehicleCards.length > 0;
                        addMessage('bot', resp.text, {
                            cta: resp.cta,
                            quickReplies: resp.quickReplies || getContextualQuickReplies(deferredIntent, deferredHasVCards),
                            vehicleCards: resp.vehicleCards
                        });
                    }
                } catch (err) {
                    console.warn('[Concierge] §86 deferred response error:', err && err.message);
                }
            }, 900);
        } else {
            // Greeting personalizado normal (cliente completó gate inicial,
            // no por progressive profiling — caso legacy o cliente que
            // explícitamente quiso identificarse antes de chatear)
            var sourceVeh = session.sourceVehicleId ? resolveVehicleTitleFromCache(session.sourceVehicleId) : null;
            var greet;
            if (sourceVeh) {
                greet = '¡Hola ' + firstName + '! 👋 Soy ALTOR, el Asistente Virtual IA de Altorra Cars. ' +
                        'Veo que te interesa el ' + sourceVeh + '. Pregúntame lo que quieras: ' +
                        'precio final, financiación, peritaje, agendar una visita, o lo que necesites.';
            } else {
                greet = '¡Hola ' + firstName + '! 👋 Soy ALTOR, el Asistente Virtual IA de Altorra Cars. ' +
                        'Estoy aquí para ayudarte con info del catálogo, financiación, citas, peritaje y más. ' +
                        'Si en algún momento quieres hablar con un asesor humano, dímelo.';
            }
            addMessage('bot', greet);
            applyGateVisibility();
        }

        // Focus al input para escribir inmediatamente
        setTimeout(function () {
            var inp = document.getElementById('cncInput');
            if (inp) inp.focus();
        }, 250);
    }

    /**
     * Resuelve el título del vehículo (Marca Modelo Año) desde múltiples fuentes
     * en cascada: sesión actual → vehicleDB → DOM .vehicle-title → DOM h1 → fallback.
     * Defensivo: si todo falla, retorna null para que el callsite use fallback genérico.
     */
    function resolveVehicleTitleFromCache(vehicleId) {
        if (!vehicleId) return null;
        try {
            if (window.vehicleDB && window.vehicleDB.vehicles) {
                var v = window.vehicleDB.vehicles.find(function (x) {
                    return x && String(x.id) === String(vehicleId);
                });
                if (v) {
                    var parts = [v.marca, v.modelo, v.year].filter(function (p) { return p; });
                    if (parts.length) return parts.join(' ');
                }
            }
        } catch (e) {}
        return null;
    }

    /* ═══════════════════════════════════════════════════════════
       HANDOFF DINÁMICO — header cambia cuando un asesor toma el chat
       ═══════════════════════════════════════════════════════════ */
    function applyAsesorHeader() {
        var titleEl = document.getElementById('cncTitle');
        var statusEl = document.getElementById('cncStatus');
        var avatarEl = document.getElementById('cncAvatar');
        if (!titleEl) return;
        if (session.activeAsesor && session.activeAsesor.nombre) {
            var asesor = session.activeAsesor;
            titleEl.textContent = asesor.nombre;
            statusEl.textContent = 'En vivo · responde ahora';
            // Avatar: si tiene photoURL la usamos, sino iniciales
            if (asesor.photoURL) {
                avatarEl.innerHTML = '<img src="' + escapeHtml(asesor.photoURL) +
                    '" alt="" class="cnc-asesor-photo" onerror="this.parentNode.innerHTML=\'' +
                    escapeHtml(getAsesorInitials(asesor.nombre)) + '\'">';
            } else {
                avatarEl.innerHTML = '<span class="cnc-asesor-initials">' +
                    escapeHtml(getAsesorInitials(asesor.nombre)) + '</span>';
            }
        } else {
            titleEl.textContent = 'ALTOR';
            statusEl.textContent = 'Asistente Virtual IA · Altorra Cars';
            avatarEl.innerHTML = ALTOR_AVATAR_HTML;
        }
    }

    /* ═══════════════════════════════════════════════════════════
       §87 Sprint C-S9 — CSAT (Customer Satisfaction) post-cierre
       ═══════════════════════════════════════════════════════════
       Patrón industry-standard Intercom/Drift/Zendesk: tras cerrar
       un chat, mostrar survey de 5 caritas para medir experiencia.

       Idempotente: si session.csat ya existe, muestra "Gracias por
       tu valoración" en lugar del form.

       Persistencia: conciergeChats/{sid}.csat = { score, comment,
       submittedAt, source: 'client' } via Firestore .set merge:true.

       Schema rule R6: cliente puede update si auth.uid == userId
       || userId == null (rule existente, cero deploy de rules).
    ─────────────────────────────────────────────────────────── */

    var _csatSelectedScore = null; // score temporal antes de submit

    var CSAT_EMOJIS = [
        { score: 1, emoji: '😞', label: 'Muy mala' },
        { score: 2, emoji: '😐', label: 'Mala' },
        { score: 3, emoji: '🙂', label: 'Regular' },
        { score: 4, emoji: '😊', label: 'Buena' },
        { score: 5, emoji: '🤩', label: 'Excelente' }
    ];

    function buildCSATBlockHTML() {
        // Si ya respondió, mostrar resumen estático
        if (session.csat && session.csat.score) {
            var picked = CSAT_EMOJIS[session.csat.score - 1] || CSAT_EMOJIS[2];
            return '<div class="cnc-csat-block cnc-csat-block--submitted" id="cncCSATBlock">' +
                '<div class="cnc-csat-thanks">' +
                    '<span class="cnc-csat-thanks-emoji">' + picked.emoji + '</span>' +
                    '<span>¡Gracias por tu valoración!</span>' +
                '</div>' +
            '</div>';
        }
        // Form de rating
        var emojisHTML = CSAT_EMOJIS.map(function (e) {
            return '<button type="button" class="cnc-csat-emoji" ' +
                'data-action="csat-rate" data-csat-score="' + e.score + '" ' +
                'aria-label="' + escapeHtml(e.label) + '" title="' + escapeHtml(e.label) + '">' +
                '<span class="cnc-csat-emoji-icon">' + e.emoji + '</span>' +
                '<span class="cnc-csat-emoji-label">' + escapeHtml(e.label) + '</span>' +
            '</button>';
        }).join('');
        return '<div class="cnc-csat-block" id="cncCSATBlock">' +
            '<div class="cnc-csat-question">¿Cómo fue tu experiencia con nosotros?</div>' +
            '<div class="cnc-csat-emojis" id="cncCSATEmojis">' + emojisHTML + '</div>' +
            '<textarea class="cnc-csat-comment" id="cncCSATComment" maxlength="280" ' +
                'placeholder="Comentario opcional (qué te gustó o qué mejorar)" rows="2"></textarea>' +
            '<div class="cnc-csat-actions">' +
                '<button type="button" class="cnc-csat-btn cnc-csat-btn--ghost" data-action="csat-skip">Saltar</button>' +
                '<button type="button" class="cnc-csat-btn cnc-csat-btn--primary" id="cncCSATSubmitBtn" data-action="csat-submit" disabled>Enviar valoración</button>' +
            '</div>' +
        '</div>';
    }

    function handleCSATRate(score) {
        var n = parseInt(score, 10);
        if (isNaN(n) || n < 1 || n > 5) return;
        _csatSelectedScore = n;
        // Highlight visual del seleccionado
        var emojiButtons = document.querySelectorAll('#cncCSATEmojis .cnc-csat-emoji');
        for (var i = 0; i < emojiButtons.length; i++) {
            var btn = emojiButtons[i];
            var bScore = parseInt(btn.getAttribute('data-csat-score'), 10);
            if (bScore === n) {
                btn.classList.add('cnc-csat-emoji--selected');
            } else {
                btn.classList.remove('cnc-csat-emoji--selected');
            }
        }
        // Habilitar submit
        var submitBtn = document.getElementById('cncCSATSubmitBtn');
        if (submitBtn) submitBtn.disabled = false;
    }

    function handleCSATSubmit() {
        if (!_csatSelectedScore) return; // botón disabled, defensive
        var commentEl = document.getElementById('cncCSATComment');
        var comment = commentEl ? String(commentEl.value || '').trim().slice(0, 280) : '';
        var csatData = {
            score: _csatSelectedScore,
            comment: comment,
            submittedAt: new Date().toISOString(),
            source: 'client'
        };
        // Persistir en sesión + Firestore (best-effort)
        session.csat = csatData;
        try { saveSession(session); } catch (e) {}
        if (session.sessionId && window.db) {
            window.db.collection('conciergeChats').doc(session.sessionId)
                .set({ csat: csatData }, { merge: true })
                .catch(function (err) {
                    console.warn('[Concierge] §87 CSAT persist failed:', err && err.message);
                });
        }
        // Re-render solo el bloque CSAT con la versión "Gracias"
        var oldBlock = document.getElementById('cncCSATBlock');
        if (oldBlock && oldBlock.parentNode) {
            var wrapper = document.createElement('div');
            wrapper.innerHTML = buildCSATBlockHTML();
            var newBlock = wrapper.firstChild;
            oldBlock.parentNode.replaceChild(newBlock, oldBlock);
            if (window.AltorraIcons && window.AltorraIcons.refresh) {
                window.AltorraIcons.refresh(newBlock);
            }
        }
        _csatSelectedScore = null;
        console.log('[Concierge] §87 CSAT submitted:', csatData);
    }

    function handleCSATSkip() {
        var block = document.getElementById('cncCSATBlock');
        if (block) block.remove();
        _csatSelectedScore = null;
        console.log('[Concierge] §87 CSAT skipped by user');
    }

    /* ═══════════════════════════════════════════════════════════
       FASE 1.B — Cierre de sesión: bloqueo del input + botón nuevo chat
       ═══════════════════════════════════════════════════════════ */
    function applyClosedState() {
        var inputWrap = document.getElementById('cncInputWrap');
        var inp = document.getElementById('cncInput');
        var sendBtn = document.getElementById('cncSend');
        var quickActions = document.getElementById('cncQuickActions');
        // Buscar/crear el bloque "conversation closed"
        var closedBlock = document.getElementById('cncClosedBlock');

        if (session.closed) {
            // Ocultar quick-actions y el input wrap
            if (quickActions) quickActions.style.display = 'none';
            if (inp) {
                inp.disabled = true;
                inp.placeholder = 'Conversación finalizada';
            }
            if (sendBtn) sendBtn.disabled = true;
            if (inputWrap) inputWrap.style.display = 'none';

            // §57 — Si el bloque ya existe y NO matchea el closedReason actual,
            // lo borramos para re-renderizarlo con la UI correcta.
            var isClientFinalized = session.closedReason === 'client_finalized';
            if (closedBlock) {
                var prevVariant = closedBlock.getAttribute('data-variant');
                var newVariant = isClientFinalized ? 'client' : 'admin';
                if (prevVariant !== newVariant) {
                    closedBlock.remove();
                    closedBlock = null;
                }
            }

            // Inyectar bloque de cierre con CTA
            // §23 FASE 5 — el bloque incluye el radicado del chat finalizado
            // para que el cliente lo conserve como referencia.
            var radicadoTxt = session.radicado ? session.radicado : '';
            if (!closedBlock) {
                closedBlock = document.createElement('div');
                closedBlock.id = 'cncClosedBlock';
                closedBlock.className = 'cnc-closed-block';
                closedBlock.setAttribute('data-variant', isClientFinalized ? 'client' : 'admin');

                if (isClientFinalized) {
                    // §57 — UI nueva: cliente finalizó.
                    // §57.bis — usar data-action para que el handler delegado en
                    // panel.click (línea ~1766) funcione independientemente de
                    // cuántas veces se re-renderice este block.
                    // §57.8 — 3 botones (patrón WhatsApp/Telegram/Intercom):
                    //   Descargar conversación: PDF del historial
                    //   Iniciar nueva conversación: limpia ahora, mantiene panel abierto
                    //   Cerrar chat: cierra panel + limpia (próxima apertura = nuevo)
                    // §57.8 — id="cncClosedRadicado" agregado para evitar
                    // que applyClosedState llamado 2x cree DOS divs de radicado
                    // (bug visual reportado por cliente en captura §57.7).
                    closedBlock.innerHTML =
                        '<div class="cnc-closed-icon"><i data-lucide="check-circle-2"></i></div>' +
                        '<div class="cnc-closed-title">Chat finalizado</div>' +
                        '<div class="cnc-closed-sub">Gracias por escribirnos. Si quieres volver a hablarnos, podrás iniciar una nueva conversación cuando quieras.</div>' +
                        (radicadoTxt
                            ? '<div class="cnc-closed-radicado" id="cncClosedRadicado">Radicado: <strong>' + radicadoTxt + '</strong></div>'
                            : '') +
                        // §87 — CSAT survey entre radicado y botones de acción
                        buildCSATBlockHTML() +
                        '<div class="cnc-closed-actions">' +
                            '<button class="cnc-closed-action cnc-closed-action--secondary" id="cncDownloadBtn" type="button" data-action="download-conversation">' +
                                '<i data-lucide="download"></i><span>Descargar conversación</span>' +
                            '</button>' +
                            '<button class="cnc-closed-action cnc-closed-action--primary" id="cncResetFromFinalizedBtn" type="button" data-action="reset-from-finalized">' +
                                '<i data-lucide="refresh-cw"></i><span>Iniciar nueva conversación</span>' +
                            '</button>' +
                            '<button class="cnc-closed-action cnc-closed-action--ghost" id="cncFinalCloseBtn" type="button" data-action="final-close">' +
                                '<i data-lucide="x"></i><span>Cerrar chat</span>' +
                            '</button>' +
                        '</div>';
                } else {
                    // UI legacy (admin cerró el chat).
                    // §57.6 — agregado "Descargar conversación".
                    // §57.8 — 3 botones (Descargar + Iniciar nueva + Cerrar)
                    // alineados con la UI client_finalized para consistencia
                    // de patrón. Cliente puede cerrar el panel después de
                    // ver el mensaje de cierre del asesor sin tener que
                    // empezar nueva conversación de inmediato.
                    closedBlock.innerHTML =
                        '<div class="cnc-closed-icon"><i data-lucide="check-circle-2"></i></div>' +
                        '<div class="cnc-closed-title">Esta conversación ha finalizado</div>' +
                        '<div class="cnc-closed-sub">Iniciá una nueva cuando quieras hablar con nosotros otra vez.</div>' +
                        (radicadoTxt
                            ? '<div class="cnc-closed-radicado" id="cncClosedRadicado">Radicado: <strong>' + radicadoTxt + '</strong></div>'
                            : '') +
                        // §87 — CSAT survey entre radicado y botones de acción
                        buildCSATBlockHTML() +
                        '<div class="cnc-closed-actions">' +
                            '<button class="cnc-closed-action cnc-closed-action--secondary" id="cncDownloadBtn" type="button" data-action="download-conversation">' +
                                '<i data-lucide="download"></i><span>Descargar conversación</span>' +
                            '</button>' +
                            '<button class="cnc-closed-action cnc-closed-action--primary" id="cncResetSessionBtn" type="button" data-action="reset-session-from-closed">' +
                                '<i data-lucide="refresh-cw"></i><span>Iniciar nueva conversación</span>' +
                            '</button>' +
                            '<button class="cnc-closed-action cnc-closed-action--ghost" id="cncFinalCloseBtn" type="button" data-action="final-close">' +
                                '<i data-lucide="x"></i><span>Cerrar chat</span>' +
                            '</button>' +
                        '</div>';
                }
                var panel = document.getElementById('altorra-concierge');
                if (panel) panel.appendChild(closedBlock);
                if (window.AltorraIcons && window.AltorraIcons.refresh) {
                    window.AltorraIcons.refresh(closedBlock);
                }
                // §57.bis — handlers via data-action delegation (panel.click).
                // No bindeamos addEventListener directo aquí: los re-renders
                // del block hacían perder los listeners. Toda acción del
                // closed-block pasa por handleAction() ahora.
            } else {
                // Re-render del radicado por si cambió tras un reload
                var radEl = document.getElementById('cncClosedRadicado');
                if (radEl && radicadoTxt) {
                    radEl.innerHTML = 'Radicado: <strong>' + radicadoTxt + '</strong>';
                } else if (!radEl && radicadoTxt) {
                    var sub = closedBlock.querySelector('.cnc-closed-sub');
                    if (sub) {
                        var newRad = document.createElement('div');
                        newRad.id = 'cncClosedRadicado';
                        newRad.className = 'cnc-closed-radicado';
                        newRad.innerHTML = 'Radicado: <strong>' + radicadoTxt + '</strong>';
                        sub.parentNode.insertBefore(newRad, sub.nextSibling);
                    }
                }
            }
            closedBlock.style.display = 'flex';
        } else {
            // Restaurar UI normal (chat reabierto por el admin)
            if (quickActions) quickActions.style.display = '';
            if (inp) {
                inp.disabled = false;
                inp.placeholder = 'Escribe tu mensaje...';
            }
            if (sendBtn) sendBtn.disabled = false;
            if (inputWrap) inputWrap.style.display = '';
            if (closedBlock) closedBlock.style.display = 'none';
        }
    }

    /**
     * handleClientResetSession — UX flow cuando el cliente clickea
     * "Finalizar conversación" en el menú ⋮ del header.
     *
     * §57 (2026-05-08) — Refactor del flow:
     *   1. Confirm coherente: "¿Finalizar esta conversación?"
     *   2. Marca status='closed' en Firestore (con closedReason='client_finalized')
     *   3. NO crea sesión nueva. Renderiza pantalla "Chat finalizado"
     *      con 2 botones: Descargar conversación + Cerrar chat
     *   4. El cliente decide cuándo cerrar definitivamente. Al cerrar
     *      (X o botón), `finalCloseAndCleanup` limpia DOM + crea sesión
     *      limpia silenciosa + cierra panel. Próxima apertura = welcome
     *      del bot fresco (sesión nueva, sin reset automático).
     */
    function handleClientResetSession() {
        if (!confirm('¿Finalizar esta conversación?\n\nUna vez finalizada, no podrás retomarla.\nTendrás la opción de descargar el historial antes de cerrar el chat.')) {
            return;
        }
        markSessionFinalized();
    }

    /**
     * §57 — Marca la sesión como finalizada por el cliente.
     * NO crea sesión nueva. Renderiza pantalla "Chat finalizado" con
     * acciones (descargar + cerrar). El cliente decide cuándo cerrar.
     */
    function markSessionFinalized() {
        // §60.2 — Optimistic UI: la pantalla "Chat finalizado"
        // aparece INSTANT al setear session.closed=true + saveSession +
        // applyClosedState. La escritura a Firestore
        // (markChatClosedInFirestore) corre en background con
        // .catch(silent) — si falla por red, el cliente igual ve la UI
        // finalizada y al volver online el listener parent del admin
        // sincroniza el cierre eventualmente.
        console.log('[Concierge] §60.2 markSessionFinalized optimistic', {
            sid: session.sessionId
        });
        cancelChatListeners();
        markChatClosedInFirestore('client_finalized');
        session.closed = true;
        session.closedReason = 'client_finalized';
        try { saveSession(session); } catch (e) {}
        // Cerrar dropdown ⋮ si estaba abierto
        var dropdown = document.getElementById('cncHeaderDropdown');
        if (dropdown) dropdown.setAttribute('hidden', '');
        var menuBtn = document.getElementById('cncHeaderMenuBtn');
        if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
        // Re-render con UI de finalización
        applyClosedState();
    }

    /**
     * §57 — Descarga la conversación como HTML printable (PDF via "Save as PDF"
     * del browser print dialog). Usa window.open para crear un documento
     * standalone, lo styliza print-friendly, y dispara window.print().
     * El usuario elige "Save as PDF" como destination.
     *
     * Sin libraries externas (cumple §17.7 cero APIs externas).
     */
    function downloadConversationPDF() {
        try {
            var win = window.open('', '_blank', 'width=900,height=700');
            if (!win) {
                if (window.notify && window.notify.warning) {
                    window.notify.warning({
                        title: 'No se pudo abrir la ventana de descarga',
                        message: 'Habilitá popups en este navegador para descargar la conversación.',
                        duration: 8000
                    });
                } else {
                    alert('Habilitá popups para descargar la conversación.');
                }
                return;
            }
            var radicadoTxt = session.radicado ? session.radicado : '—';
            var dateNow = new Date().toLocaleString('es-CO', {
                day: '2-digit', month: 'long', year: 'numeric',
                hour: '2-digit', minute: '2-digit'
            });
            var clientName = (session.profile && session.profile.nombre)
                ? (session.profile.nombre + (session.profile.apellido ? ' ' + session.profile.apellido : ''))
                : (session.nombre || '—');
            var clientEmail = (session.profile && session.profile.correo) || session.email || '—';
            var clientPhone = (session.profile && session.profile.celular) || session.telefono || '—';

            function escapeHtml(s) {
                return String(s == null ? '' : s)
                    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
            }
            function whoLabel(m) {
                if (m.from === 'user') return clientName !== '—' ? clientName : 'Cliente';
                if (m.from === 'asesor') return m.asesorNombre || 'Asesor';
                if (m.from === 'system') return 'Sistema';
                return 'ALTOR (Asistente Virtual IA)';
            }
            var msgsHtml = (session.messages || []).map(function (m) {
                var ts = m.timestamp ? new Date(m.timestamp).toLocaleString('es-CO', {
                    day: '2-digit', month: '2-digit', year: 'numeric',
                    hour: '2-digit', minute: '2-digit'
                }) : '';
                return '<div class="msg msg--' + escapeHtml(m.from || 'bot') + '">' +
                          '<div class="msg-meta">' +
                            '<strong>' + escapeHtml(whoLabel(m)) + '</strong>' +
                            (ts ? '<span class="msg-ts">' + escapeHtml(ts) + '</span>' : '') +
                          '</div>' +
                          '<div class="msg-text">' + escapeHtml(m.text || '') + '</div>' +
                       '</div>';
            }).join('');

            var html = '<!DOCTYPE html><html lang="es"><head><meta charset="utf-8">' +
                '<title>Conversación ALTOR — Altorra Cars (' + escapeHtml(radicadoTxt) + ')</title>' +
                '<style>' +
                '*{box-sizing:border-box}' +
                'body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:#fff;color:#111;padding:36px;max-width:820px;margin:0 auto;line-height:1.55}' +
                'header{border-bottom:2px solid #b89658;padding-bottom:14px;margin-bottom:26px}' +
                'h1{color:#b89658;margin:0 0 6px;font-size:1.6em}' +
                'header .sub{color:#555;font-size:0.92em}' +
                '.client-card{background:#f9f5ec;border-left:3px solid #b89658;padding:14px 18px;border-radius:6px;margin-bottom:24px}' +
                '.client-card .row{display:flex;gap:8px;margin:3px 0;font-size:0.92em}' +
                '.client-card .row b{min-width:90px;color:#555}' +
                '.msg{margin-bottom:14px;padding:10px 14px;border-radius:8px;page-break-inside:avoid}' +
                '.msg--user{background:#fff7e0;border-left:3px solid #b89658}' +
                '.msg--bot{background:#f5f5f5;border-left:3px solid #999}' +
                '.msg--asesor{background:#e8f5e8;border-left:3px solid #4caf50}' +
                '.msg--system{background:#fafafa;font-style:italic;color:#666;text-align:center;font-size:0.86em;border:1px dashed #ccc}' +
                '.msg-meta{font-size:0.78em;color:#666;margin-bottom:5px;display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap}' +
                '.msg-meta strong{color:#222;font-weight:600}' +
                '.msg-text{white-space:pre-wrap;word-break:break-word}' +
                'footer{margin-top:30px;padding-top:14px;border-top:1px solid #ddd;font-size:0.82em;color:#777;text-align:center}' +
                '@media print{body{padding:18px}@page{margin:1cm}}' +
                '</style></head><body>' +
                '<header>' +
                  '<h1>Conversación ALTOR — Altorra Cars</h1>' +
                  '<div class="sub">Radicado: <strong>' + escapeHtml(radicadoTxt) + '</strong> · Generado: ' + escapeHtml(dateNow) + '</div>' +
                '</header>' +
                '<div class="client-card">' +
                  '<div class="row"><b>Cliente:</b> ' + escapeHtml(clientName) + '</div>' +
                  '<div class="row"><b>Correo:</b> ' + escapeHtml(clientEmail) + '</div>' +
                  '<div class="row"><b>Teléfono:</b> ' + escapeHtml(clientPhone) + '</div>' +
                '</div>' +
                '<div class="messages">' + (msgsHtml || '<p style="color:#999"><em>Sin mensajes en esta conversación.</em></p>') + '</div>' +
                '<footer>Este documento es una transcripción automática de tu conversación con ALTOR — Asistente Virtual IA de Altorra Cars.</footer>' +
                '<script>window.onload=function(){setTimeout(function(){window.print();},400);};</script>' +
                '</body></html>';

            win.document.open();
            win.document.write(html);
            win.document.close();
        } catch (err) {
            console.error('[Concierge] downloadConversationPDF failed:', err);
            if (window.notify && window.notify.error) {
                window.notify.error({
                    title: 'Error al generar la descarga',
                    message: err.message || 'Intenta de nuevo más tarde.'
                });
            }
        }
    }

    /**
     * §57 — Cierre definitivo del chat finalizado.
     * Llamado por: botón "Cerrar chat" del cncClosedBlock, X del header
     * (cuando session.closed=true), o tecla Esc.
     *
     * Acciones:
     *   1. Cancela todos los listeners
     *   2. Limpia DOM completamente (mensajes, closed block, banners)
     *   3. Resetea localStorage de la sesión
     *   4. Crea sesión limpia silenciosa (nuevo sessionId, sin re-render
     *      automático del welcome)
     *   5. Cierra el panel
     *
     * Próxima apertura del panel = welcome bubble del bot fresco.
     * No se ejecuta resetSession automático.
     */
    /**
     * §57.quint — Helper unificado de limpieza + render del welcome.
     * Garantiza que la sesión queda 100% limpia con DOM listo para
     * mostrar el welcome bubble. Usado por:
     *   - finalCloseAndCleanup (cliente "Cerrar chat") — adicional cierra panel
     *   - resetSession (cliente "Iniciar nueva conversación" tras admin close)
     *
     * Antes existían 2 implementaciones divergentes que producían estados
     * inconsistentes:
     *   Bug 1: finalCloseAndCleanup → reabrir FAB → veía conversación vieja
     *   Bug 2: resetSession → click "Iniciar nueva" → no iniciaba (necesitaba refresh)
     *
     * Ahora ambos flows usan ESTE helper para garantizar limpieza atómica.
     */
    function cleanSessionAndRender() {
        console.log('[Concierge] §57.9 cleanSessionAndRender() START — pre-state: closed=' + (session && session.closed) + ' messages=' + (session && session.messages ? session.messages.length : 0));
        // §57.6 — Setear _resetting=true ANTES de cancelar listeners.
        // Esto garantiza que cualquier snapshot tardío del listener parent
        // que llegue mid-reset (status='closed' del Firestore que aún
        // está propagándose) sea ignorado por el guard `if (session._resetting) return`
        // (líneas 1473 y 1545 del listener parent).
        // Sin esto, snapshots tardíos pisaban session.closed=true sobre la
        // sesión nueva y re-creaban el closedBlock.
        if (session) {
            session._resetting = true;
            try { saveSession(session); } catch (e) {}
        }

        // 1. Cancelar listeners ANTES de cualquier write
        try { cancelChatListeners(); } catch (e) { console.warn('[Concierge] cancelChatListeners err:', e); }

        // 2. Limpiar localStorage CON VERIFICACIÓN
        try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
        var verifyStorage = null;
        try { verifyStorage = localStorage.getItem(STORAGE_KEY); } catch (e) {}
        if (verifyStorage) {
            console.warn('[Concierge] localStorage NOT cleared on first try, forcing');
            try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
        }

        // 3. Reset refs internas
        _chatDocCreated = false;
        _lastSyncedMsgIds = {};
        _leadCreated = false;
        _asesorJoinedAnnounced = false;

        // 4. Crear sesión limpia EXPLÍCITAMENTE (no via loadSession que podría
        //    leer estado residual del localStorage si el removeItem falla).
        // §57.6 — Mantener _resetting=true durante render. Se libera AL FINAL.
        session = {
            sessionId: 'cnc_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8),
            mode: 'bot',
            messages: [],
            createdAt: Date.now(),
            uid: null,
            email: null,
            nombre: null,
            telefono: null,
            gateCompleted: false,
            profile: null,
            context: { lastIntent: null, discussedTopics: [], bot_repeated_count: 0 },
            activeAsesor: null,
            closed: false,
            closedReason: null,
            level: 0,
            sourcePage: window.location.pathname,
            sourceVehicleId: window.PRERENDERED_VEHICLE_ID || null,
            _resetting: true  // §57.6 — flag protector contra snapshots tardíos
        };
        try { saveSession(session); } catch (e) {}
        console.log('[Concierge] §57.6 clean session created:', session.sessionId);

        // 5. Limpiar DOM completo
        try {
            var msgsBox = document.getElementById('cncMessages');
            if (msgsBox) msgsBox.innerHTML = '';
            var closedBlock = document.getElementById('cncClosedBlock');
            if (closedBlock) closedBlock.remove();
            var queueBanner = document.getElementById('cncQueueBanner');
            if (queueBanner) queueBanner.remove();
            var slaWarning = document.getElementById('cncSLAWarning');
            if (slaWarning) slaWarning.remove();
            var slaBreach = document.getElementById('cncSLABreach');
            if (slaBreach) slaBreach.remove();
            var dropdown = document.getElementById('cncHeaderDropdown');
            if (dropdown) dropdown.setAttribute('hidden', '');
            var menuBtn = document.getElementById('cncHeaderMenuBtn');
            if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
            var resetToast = document.getElementById('cncResetToast');
            if (resetToast) resetToast.classList.remove('cnc-reset-toast--show');
        } catch (e) {
            console.warn('[Concierge] DOM cleanup err:', e);
        }

        // 6. Re-render UI states (orden matters: closed → gate → header → mensajes)
        try {
            applyClosedState();      // session.closed=false → restaura input
            applyGateVisibility();    // muestra/oculta gate según session.gateCompleted
            applyAsesorHeader();      // resetea header a ALTOR
            renderMessages();         // welcome bubble (session.messages=[])
            console.log('[Concierge] §57.6 UI re-rendered with welcome bubble');
        } catch (e) {
            console.warn('[Concierge] UI render err:', e);
        }

        // 7. §57.6 — Liberar flag _resetting tras un short delay para
        //    cubrir snapshots tardíos en queue del event loop.
        setTimeout(function () {
            if (session) {
                session._resetting = false;
                try { saveSession(session); } catch (e) {}
                console.log('[Concierge] §57.9 cleanSessionAndRender() COMPLETE — _resetting flag released. session.closed=' + session.closed + ' messages=' + (session.messages ? session.messages.length : 0));
            }
        }, 500);
    }

    /**
     * §57.9 — Refactor industry-standard: "Cerrar chat" SOLO cierra
     * el panel. NO limpia la sesión. La limpieza ocurre AUTOMÁTICAMENTE
     * en la próxima apertura del panel (open() detecta session.closed=true
     * y dispara cleanSessionAndRender). Patrón "lazy reset on next open"
     * usado por Intercom Resolution Bot, Drift, WhatsApp Business.
     *
     * Antes (§57-§57.8): finalCloseAndCleanup hacía cleanSessionAndRender
     * inmediatamente, mezclando "cerrar UI" con "resetear estado". Esto
     * generaba race conditions con listeners tardíos y bugs reportados:
     *   - "Cerrar chat" → reabrir = sigue conversación vieja
     *   - "Iniciar nueva conversación" no hacía nada visible
     *
     * Ahora: separamos las responsabilidades:
     *   - finalCloseAndCleanup → solo cierra panel
     *   - open() → si session.closed=true, lazy clean
     *   - cleanSessionAndRender → invocado solo cuando es necesario
     */
    function finalCloseAndCleanup() {
        console.log('[Concierge] §57.9 finalCloseAndCleanup() — solo cierra panel (lazy reset on next open)');
        var panel = document.getElementById('altorra-concierge');

        if (panel) {
            panel.classList.remove('cnc-open');
            panel.setAttribute('aria-hidden', 'true');
            // Forzar estilos inline (defense-in-depth contra CSS overrides)
            panel.style.transition = 'none';
            panel.style.opacity = '0';
            panel.style.transform = 'scale(0.06) translate(40px, 40px)';
            panel.style.pointerEvents = 'none';
        }
        _isOpen = false;

        // §57.9 — NO hacemos cleanSessionAndRender aquí. La sesión
        // permanece marcada como closed=true. La próxima apertura
        // del FAB la detectará y limpiará automáticamente.

        // Restaurar transition + estilos para que próximo open anime
        // correctamente. 350ms > transición CSS (320ms).
        setTimeout(function () {
            if (!panel) return;
            panel.style.transition = '';
            panel.style.opacity = '';
            panel.style.transform = '';
            panel.style.pointerEvents = '';
        }, 350);
    }

    /**
     * Cancela inmediatamente los listeners de Firestore. Llamado ANTES
     * de cualquier write para evitar race conditions donde el listener
     * parent recibe el snapshot del cierre y dispara applyClosedState
     * pisando nuestro reset local.
     */
    function cancelChatListeners() {
        if (_firestoreUnsub) { try { _firestoreUnsub(); } catch (e) {} _firestoreUnsub = null; }
        if (_firestoreParentUnsub) { try { _firestoreParentUnsub(); } catch (e) {} _firestoreParentUnsub = null; }
        // §26.7 — También cancelar workload listener. Sin esto, si el cliente
        // estaba en queue y resetea, el banner de cola podría regenerarse
        // tardíamente sobre la sesión nueva.
        if (_workloadUnsub) { try { _workloadUnsub(); } catch (e) {} _workloadUnsub = null; }
        // Y el SLA watcher si está activo
        if (typeof stopSLAWatcher === 'function') { try { stopSLAWatcher(); } catch (e) {} }
        // §75 Sprint S3 — typing listener + cleanup RTDB
        try { stopTypingListener(); } catch (e) {}
        // §76 Sprint S4 — parar el ticker de read receipts (cleanup
        // completo cuando se cancela toda la chain de listeners).
        try { stopReadReceiptInterval(); } catch (e) {}
    }

    /**
     * Marca el chat como cerrado en Firestore (best-effort).
     * Si falla por red o permisos, no bloquea el reset local.
     * §57 — Acepta `reason` para diferenciar 'client_finalized' (UX nueva)
     * de otros futuros (ej. 'idle_timeout').
     */
    function markChatClosedInFirestore(reason) {
        if (!_chatDocCreated || !session.sessionId || !window.db) return;
        window.db.collection('conciergeChats').doc(session.sessionId).set({
            status: 'closed',
            closedAt: new Date().toISOString(),
            closedBy: 'client',
            closedReason: reason || 'client_finalized',
            closedByRole: 'client',
            lastMessage: '✓ Cliente finalizó la conversación',
            lastMessageAt: new Date().toISOString()
        }, { merge: true }).catch(function (err) {
            console.warn('[Concierge] Could not mark session closed:', err.message);
        });
    }

    /**
     * resetSession — purga la sesión actual y arranca una nueva.
     * Limpia localStorage, refs locales, listeners de Firestore, y
     * re-renderiza el panel desde cero (gate o greeting según contexto).
     */
    function resetSession(opts) {
        opts = opts || {};
        var preserveProfile = opts.preserveProfile === true;
        console.log('[Concierge] §57.quint resetSession() called, preserveProfile:', preserveProfile);

        // Snapshot del profile actual ANTES del cleanup (caso anónimo "datos OK")
        var preserved = preserveProfile ? {
            profile: session.profile,
            gateCompleted: !!session.gateCompleted,
            uid: session.uid,
            nombre: session.nombre,
            email: session.email,
            telefono: session.telefono,
            level: session.level || 0
        } : null;

        // §57.quint — Limpieza unificada (sesión nueva + DOM limpio + welcome render)
        cleanSessionAndRender();

        // Re-aplicar perfil del auth si user logueado (auth profile es source of truth)
        if (typeof loadProfileFromAuth === 'function') {
            loadProfileFromAuth().then(function (profile) {
                if (profile) {
                    session.profile = profile;
                    session.gateCompleted = true;
                    session.uid = profile.uid;
                    session.email = profile.correo;
                    session.nombre = profile.nombre + ' ' + profile.apellido;
                    session.telefono = profile.celular;
                    session.level = Math.max(session.level || 0, 2);
                    saveSession(session);
                    // Re-aplicar UI states tras profile load
                    applyGateVisibility();
                }
            }).catch(function (err) {
                console.warn('[Concierge] loadProfileFromAuth rejected during reset:', err && err.message);
            });
        }

        // Si el caller pidió preservar profile (caso anónimo "datos OK"),
        // restauramos los campos. Auth (si lo hay) sobrescribirá después.
        if (preserved && preserved.profile) {
            session.profile = preserved.profile;
            session.gateCompleted = preserved.gateCompleted;
            session.uid = preserved.uid;
            session.nombre = preserved.nombre;
            session.email = preserved.email;
            session.telefono = preserved.telefono;
            session.level = preserved.level;
            try { saveSession(session); } catch (e) {}
            applyGateVisibility();
        }

        // Toast de confirmación visual al cliente
        showResetToast();
    }

    /**
     * §57.quint — Toast de confirmación visual cuando se reinicia la sesión.
     * Extraído del antiguo continueResetUI para reuso.
     */
    function showResetToast() {
        var toastEl = document.getElementById('cncResetToast');
        if (!toastEl) {
            toastEl = document.createElement('div');
            toastEl.id = 'cncResetToast';
            toastEl.className = 'cnc-reset-toast';
            toastEl.textContent = '✓ Conversación reiniciada';
            var panel = document.getElementById('altorra-concierge');
            if (panel) panel.appendChild(toastEl);
        }
        toastEl.classList.remove('cnc-reset-toast--show');
        // Force reflow + add class para animar
        void toastEl.offsetWidth;
        toastEl.classList.add('cnc-reset-toast--show');
        setTimeout(function () {
            if (toastEl) toastEl.classList.remove('cnc-reset-toast--show');
        }, 2200);
    }

    function getAsesorInitials(name) {
        if (!name) return 'AL';
        var parts = String(name).trim().split(/\s+/);
        var first = parts[0] ? parts[0].charAt(0) : '';
        var last = parts[parts.length - 1] ? parts[parts.length - 1].charAt(0) : '';
        return (first + last).toUpperCase() || 'AL';
    }

    // (escapeHtml definido más abajo en el archivo)

    function handleAction(action) {
        switch (action) {
            case 'escalate':
                escalateToLive();
                break;
            // §23 FASE 2 — botones del SLA banner del cliente
            case 'open-wa':
                handoverToWhatsApp();
                break;
            case 'dismiss-sla-warning':
                var sw = document.getElementById('cncSLAWarning');
                if (sw) sw.remove();
                break;
            case 'goto-simulador':
                window.location.href = 'simulador-credito.html';
                break;
            case 'goto-busqueda':
                window.location.href = 'busqueda.html';
                break;
            case 'open-modal-vende':
                close();
                if (window.openModal) window.openModal('vendeAutoModal');
                break;
            case 'open-modal-financiacion':
                close();
                if (window.openModal) window.openModal('financiacionModal');
                break;
            // §57.bis — botones del cnc-closed-block (cliente finalizó chat).
            // Migrado de addEventListener directo a data-action delegation
            // para que sobrevivan re-renders del block.
            case 'download-conversation':
                console.log('[Concierge] download-conversation action triggered');
                downloadConversationPDF();
                break;
            case 'final-close':
                console.log('[Concierge] final-close action triggered');
                finalCloseAndCleanup();
                break;
            case 'reset-session-from-closed':
                // Botón "Iniciar nueva conversación" del block legacy
                // (cuando el admin cerró el chat, no el cliente)
                console.log('[Concierge] reset-session-from-closed action triggered');
                resetSession();
                break;
            case 'reset-from-finalized':
                // §57.8 — Botón "Iniciar nueva conversación" cuando el
                // cliente finalizó el chat. A diferencia de "Cerrar chat"
                // (final-close que cierra el panel), este RESETEA la
                // conversación al instante MANTENIENDO el panel abierto.
                // Patrón Intercom/Drift: el cliente decide si cerrar o
                // arrancar fresco sin perder el panel.
                console.log('[Concierge] §57.8 reset-from-finalized action triggered');
                cleanSessionAndRender();
                break;
            // §87 Sprint C-S9 — CSAT (Customer Satisfaction) handlers.
            // Aparecen en la pantalla "Chat finalizado" entre radicado
            // y botones. Persistencia idempotente en conciergeChats/{sid}.csat
            case 'csat-rate':
                // El score viaja en data-csat-score del button clickeado.
                // Buscamos el target real (el button con data-action) para
                // leer su atributo. handleAction() recibe action solo —
                // necesitamos el button original via document.activeElement
                // o via el currentTarget del listener delegado. Como
                // panel.click() captura e.target.closest('[data-action]')
                // y aquí ya perdimos el evento, usamos un patrón distinto:
                // delegamos directamente desde el panel listener leyendo
                // el data-csat-score del button matched antes de invocar
                // handleAction. Ver bloque panel.click más abajo.
                // (Ver action 'csat-rate' handling en panel.click — esta
                // rama solo loggea para diagnóstico.)
                console.log('[Concierge] §87 csat-rate action — score leído por panel.click');
                break;
            case 'csat-submit':
                console.log('[Concierge] §87 csat-submit action triggered');
                handleCSATSubmit();
                break;
            case 'csat-skip':
                console.log('[Concierge] §87 csat-skip action triggered');
                handleCSATSkip();
                break;
        }
    }

    /**
     * §86 Sprint C-S8 — Welcome contextual PRE-gate (sub-feature B1).
     *
     * Reemplaza el welcome hardcoded por 4 variantes según contexto:
     *
     *   1. Returning user (sesión previa <7 días con mensajes previos en
     *      otra apertura, NO en queue/closed): "¡Bienvenido de vuelta!"
     *   2. En página de vehículo: "Veo que estás mirando el {marca modelo año}..."
     *   3. Logueado con nombre: "¡Hola {firstName}!..."
     *   4. Default genérico (sin contexto identificable): welcome estándar
     *
     * Función pura — solo lee session + window.vehicleDB. No persiste nada.
     */
    function buildContextualWelcomeHTML() {
        // Detectar returning user: sesión NO nueva (>10 min de antigüedad)
        // + algún mensaje pasado (que pueda haber sido limpiado por reset
        // del cliente o finalización del admin). Threshold 7 días para
        // que "Hola de nuevo" no aparezca a alguien que jamás volvió.
        var SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
        var TEN_MIN_MS = 10 * 60 * 1000;
        var nowMs = Date.now();
        var sessionAgeMs = (session.createdAt && nowMs > session.createdAt)
            ? (nowMs - session.createdAt) : 0;
        var isReturningUser = sessionAgeMs > TEN_MIN_MS
            && sessionAgeMs < SEVEN_DAYS_MS
            && session.profile && session.profile.nombre
            && session.mode === 'bot'
            && !session.closed;

        var firstName = '';
        if (session.profile && session.profile.nombre) {
            firstName = String(session.profile.nombre).trim().split(/\s+/)[0];
        } else if (session.nombre) {
            firstName = String(session.nombre).trim().split(/\s+/)[0];
        }

        // F2.b (EPIC) — botones tontos de arranque (comité #3): el usuario nuevo TOCA en vez de teclear.
        // Reusan el mecanismo data-quick-reply (listener delegado panel.click → send(payload)) y el
        // CSS .cnc-quick-replies/.cnc-quick-reply ya existentes → cero wiring/CSS nuevo.
        var starterQR = '<div class="cnc-quick-replies">' +
            '<button class="cnc-quick-reply" data-quick-reply="Muéstrame los autos disponibles">🚗 Ver disponibles</button>' +
            '<button class="cnc-quick-reply" data-quick-reply="Quiero buscar un auto por presupuesto">💰 Por presupuesto</button>' +
            '<button class="cnc-quick-reply" data-quick-reply="Quiero hablar con un asesor">💬 Hablar con asesor</button>' +
        '</div>';

        // Variante 1: Returning user (prioridad más alta)
        if (isReturningUser) {
            var greetReturning = firstName
                ? '¡Bienvenido de vuelta, ' + escapeHtml(firstName) + '! 👋'
                : '¡Bienvenido de vuelta! 👋';
            return '<div class="cnc-bot-bubble cnc-welcome">' +
                '<strong>' + greetReturning + '</strong>' +
                '<br><br>' +
                'Soy ALTOR. ¿Seguimos donde dejamos la conversación o necesitas algo nuevo?' +
                starterQR +
            '</div>';
        }

        // Variante 2: En página de vehículo
        if (session.sourceVehicleId) {
            var vehTitle = resolveVehicleTitleFromCache(session.sourceVehicleId);
            if (vehTitle) {
                var greetVehicle = firstName
                    ? '¡Hola ' + escapeHtml(firstName) + '! 👋'
                    : '👋 ¡Hola! Soy ALTOR';
                return '<div class="cnc-bot-bubble cnc-welcome">' +
                    '<strong>' + greetVehicle + '</strong>' +
                    '<br><br>' +
                    'Veo que estás mirando el <strong>' + escapeHtml(vehTitle) + '</strong>. ' +
                    '¿Tienes preguntas sobre este auto, o quieres ver opciones similares?' +
                    starterQR +
                '</div>';
            }
        }

        // Variante 3: Logueado con nombre conocido
        if (firstName) {
            return '<div class="cnc-bot-bubble cnc-welcome">' +
                '<strong>¡Hola ' + escapeHtml(firstName) + '! 👋 Soy ALTOR</strong>' +
                '<br><br>' +
                'Soy el Asistente Virtual IA de Altorra Cars. ¿En qué te ayudo hoy?' +
                starterQR +
            '</div>';
        }

        // Variante 4: Default genérico (cero contexto identificable)
        return '<div class="cnc-bot-bubble cnc-welcome">' +
            '<strong>👋 ¡Hola! Soy ALTOR</strong>, el Asistente Virtual IA de Altorra Cars.' +
            '<br><br>' +
            'Pregúntame sobre vehículos, financiación, citas, peritaje o lo que necesites. Si quieres, puedo conectarte directo con un asesor humano.' +
            starterQR +
        '</div>';
    }

    function renderMessages() {
        var box = document.getElementById('cncMessages');
        if (!box) return;
        if (session.messages.length === 0) {
            box.innerHTML = buildContextualWelcomeHTML();
            return;
        }
        box.innerHTML = session.messages.map(function (m) {
            // Mensaje de sistema (handoff "X se ha unido", desconexión, etc.)
            if (m.from === 'system') {
                return '<div class="cnc-system-msg">' + escapeHtml(m.text) + '</div>';
            }
            var bubbleClass = m.from === 'user' ? 'cnc-user-bubble' :
                              m.from === 'asesor' ? 'cnc-asesor-bubble' : 'cnc-bot-bubble';
            // F.3 — Proactive messages tienen un acento visual sutil
            // (un brillito dorado tenue) para distinguirlos de respuestas
            // a mensajes del cliente.
            if (m.from === 'bot' && m.proactive) {
                bubbleClass += ' cnc-proactive-bubble';
            }
            // §60.2 — Estados visuales canónicos (WhatsApp pattern):
            //   pending → ⏱ icon gris claro + opacity 0.7
            //   sent    → ✓ gris (1 check)
            //   read    → ✓✓ azul (#34B7F1)
            //   failed  → border rojo + botón Reintentar
            // Solo se aplica a mensajes 'user' que tuvieron willSync=true
            // (chat doc creado al momento del addMessage).
            var statusClass = '';
            var statusIcon = '';
            if (m.from === 'user' && m._status) {
                // §76 Sprint S4 — promueve sent → read si el admin marcó leído
                // hasta este timestamp (función pura, no muta m._status persistido).
                var effectiveStatus = effectiveStatusForUserMsg(m);
                if (effectiveStatus === 'pending') {
                    statusClass = ' cnc-msg-pending';
                    statusIcon = '<span class="cnc-msg-status" data-state="pending" aria-label="Enviando">⏱</span>';
                } else if (effectiveStatus === 'sent') {
                    statusClass = ' cnc-msg-sent';
                    statusIcon = '<span class="cnc-msg-status" data-state="sent" aria-label="Enviado">✓</span>';
                } else if (effectiveStatus === 'read') {
                    statusClass = ' cnc-msg-sent';
                    statusIcon = '<span class="cnc-msg-status" data-state="read" aria-label="Leído">✓✓</span>';
                } else if (effectiveStatus === 'failed') {
                    statusClass = ' cnc-msg-failed';
                    statusIcon = '<button class="cnc-msg-retry" type="button"' +
                        ' data-action="retry-msg"' +
                        ' data-temp-id="' + escapeHtml(m._tempId || '') + '"' +
                        ' aria-label="Reintentar envío">Reintentar</button>';
                }
            }
            if (statusClass) bubbleClass += statusClass;
            var ctaHTML = '';
            if (m.cta && m.cta.action) {
                ctaHTML = '<button class="cnc-bubble-cta" data-action="' + m.cta.action + '">' + escapeHtml(m.cta.label) + '</button>';
            }
            // §22 Propuesta #2 — Quick Replies (clarification ambiguity)
            // Cuando el bot detecta intent/FAQ ambiguo, ofrece 2-3 opciones
            // como botones. Click → re-ejecuta send() con el payload elegido.
            var quickRepliesHTML = '';
            if (m.from === 'bot' && Array.isArray(m.quickReplies) && m.quickReplies.length > 0) {
                quickRepliesHTML = '<div class="cnc-quick-replies">' +
                    m.quickReplies.map(function (qr, i) {
                        return '<button class="cnc-quick-reply" data-quick-reply="' + escapeHtml(qr.payload || qr.label) + '">' +
                            escapeHtml(qr.label) +
                        '</button>';
                    }).join('') +
                '</div>';
            }
            // §26.2 — Vehicle Cards inline (miniatura + specs + CTAs).
            // Cuando el bot menciona vehículos, no solo texto: cards
            // ricas con imagen, precio, specs y botones de acción.
            // Patrón Telegram/WhatsApp Business cards.
            var vehicleCardsHTML = '';
            if (m.from === 'bot' && Array.isArray(m.vehicleCards) && m.vehicleCards.length > 0) {
                // §86 Sprint C-S8 — Carousel horizontal si 3+ vehículos
                // (sub-feature B4). 1-2 cards mantienen stack vertical.
                // 3+ → flex-row + scroll-snap-type: x mandatory + scroll
                // horizontal con swipe nativo en mobile. Patrón Intercom
                // Resolution Bot / WhatsApp Business cards.
                var isCarousel = m.vehicleCards.length >= 3;
                var listClass = 'cnc-vcard-list' + (isCarousel ? ' cnc-vcard-list--carousel' : '');
                vehicleCardsHTML = '<div class="' + listClass + '">' +
                    m.vehicleCards.map(function (vc) {
                        return renderVehicleCard(vc, isCarousel);
                    }).join('') +
                '</div>';
            }
            var tempIdAttr = m._tempId ? ' data-temp-id="' + escapeHtml(m._tempId) + '"' : '';
            return '<div class="cnc-msg ' + bubbleClass + '"' + tempIdAttr + '>' + escapeHtml(m.text) + statusIcon + ctaHTML + quickRepliesHTML + vehicleCardsHTML + '</div>';
        }).join('');
        box.scrollTop = box.scrollHeight;

        // §26.4 — Persistencia de cola: si la sesión está en modo queue,
        // re-renderizar el banner DESPUÉS del innerHTML para que NO se
        // borre cuando llega un nuevo mensaje. Patrón "regenerate after wipe".
        if (session.mode === 'queue' && typeof renderQueueState === 'function') {
            try { renderQueueState(); } catch (e) {}
        }
        // Mismo patrón para SLA warnings (5min/10min) — deben persistir
        // si ya se mostraron antes.
        if (session.slaWarnedAt5min && !document.getElementById('cncSLAWarning')
            && typeof renderSLAWarning === 'function') {
            try { renderSLAWarning(); } catch (e) {}
        }
        if (session.slaWarnedAt10min && !document.getElementById('cncSLAWarning')
            && typeof renderSLABreach === 'function') {
            try { renderSLABreach(); } catch (e) {}
        }
        // §75 Sprint S3 — Si había typing del asesor antes del re-render,
        // re-insertarlo. Sin esto, cada nuevo mensaje del cliente borra el
        // indicador y queda inconsistente con el listener RTDB.
        if (_typingActiveAsesor) {
            try { showAsesorTypingIndicator(_typingActiveAsesor); } catch (e) {}
        }
    }

    /**
     * §26.2 — Render de Vehicle Card inline en el chat.
     * Imagen miniatura + título + año/km/transmisión + precio + bullets
     * humanos + 3 CTAs (Ver ficha · Agendar visita · Asesor).
     */
    function renderVehicleCard(vc, isInCarousel) {
        if (!vc) return '';
        var imgHTML = vc.image
            ? '<img class="cnc-vcard-img" src="' + escapeHtml(vc.image) + '" alt="' + escapeHtml(vc.title) + '" loading="lazy" onerror="this.style.display=\'none\'">'
            : '<div class="cnc-vcard-img-placeholder"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 17h14M5 17a2 2 0 0 1-2-2V11l2-5h14l2 5v4a2 2 0 0 1-2 2M5 17v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2m6 0v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2"/></svg></div>';

        var priceBlock = vc.oferta
            ? '<div class="cnc-vcard-price"><span class="cnc-vcard-price-old">' + escapeHtml(vc.precioOriginalFmt || '') + '</span> <span class="cnc-vcard-price-new">' + escapeHtml(vc.precioFmt) + '</span> <span class="cnc-vcard-oferta-badge">OFERTA</span></div>'
            : '<div class="cnc-vcard-price">' + escapeHtml(vc.precioFmt) + '</div>';

        var metaBits = [];
        if (vc.year) metaBits.push(escapeHtml(String(vc.year)));
        if (vc.kilometrajeFmt) metaBits.push(escapeHtml(vc.kilometrajeFmt));
        if (vc.transmision) metaBits.push(escapeHtml(vc.transmision));

        var bulletsHTML = '';
        if (Array.isArray(vc.bullets) && vc.bullets.length) {
            bulletsHTML = '<ul class="cnc-vcard-bullets">' +
                vc.bullets.map(function (b) { return '<li>' + escapeHtml(b) + '</li>'; }).join('') +
            '</ul>';
        }

        var statusBadge = '';
        if (vc.estado === 'reservado') statusBadge = '<span class="cnc-vcard-status cnc-vcard-status--reservado">Reservado</span>';
        else if (vc.estado === 'apartado') statusBadge = '<span class="cnc-vcard-status cnc-vcard-status--reservado">Apartado</span>'; // E4 §186 (reusa estilo)
        else if (vc.estado === 'vendido') statusBadge = '<span class="cnc-vcard-status cnc-vcard-status--vendido">Vendido</span>';

        // §86 — En carousel, agregar clase --snap para scroll-snap-align
        var cardClass = 'cnc-vcard' + (isInCarousel ? ' cnc-vcard--snap' : '');
        return '<div class="' + cardClass + '" data-vehicle-id="' + escapeHtml(String(vc.id || '')) + '">' +
            '<div class="cnc-vcard-imgwrap">' + imgHTML + statusBadge + '</div>' +
            '<div class="cnc-vcard-body">' +
                '<div class="cnc-vcard-title">' + escapeHtml(vc.title) + '</div>' +
                (metaBits.length ? '<div class="cnc-vcard-meta">' + metaBits.join(' · ') + '</div>' : '') +
                priceBlock +
                bulletsHTML +
                '<div class="cnc-vcard-actions">' +
                    '<a class="cnc-vcard-btn cnc-vcard-btn--primary" href="' + escapeHtml(vc.url) + '" target="_blank" rel="noopener">Ver ficha</a>' +
                    '<button class="cnc-vcard-btn" data-vcard-action="agendar" data-vehicle-id="' + escapeHtml(String(vc.id || '')) + '">📅 Agendar</button>' +
                    '<button class="cnc-vcard-btn" data-vcard-action="escalate">👨 Asesor</button>' +
                '</div>' +
            '</div>' +
        '</div>';
    }

    function escapeHtml(s) {
        var d = document.createElement('div');
        d.textContent = s == null ? '' : String(s);
        return d.innerHTML;
    }

    /* ═══════════════════════════════════════════════════════════
       CTA BUBBLE — invitación flotante junto al FAB
       Muestra mensajes rotativos cada N segundos para invitar al
       cliente a abrir el chat. Respeta:
         - panel abierto → suprime
         - usuario ya cerró el bubble → snooze 5 min
         - cliente ya conversó (gateCompleted) → frecuencia mucho más baja
         - prefers-reduced-motion → sin animaciones, mensaje estático
       ═══════════════════════════════════════════════════════════ */
    var CTA_MESSAGES = [
        '👋 ¡Hola! ¿Quieres hablar conmigo?',
        '¡Quiero hablar contigo!',
        '¿Buscas tu auto ideal? Pregúntame 🚗',
        '💬 Estoy aquí para ayudarte',
        '¿Tienes dudas? Te respondo en segundos',
        'Hola, soy ALTOR. ¿En qué te ayudo?',
        '¿Quieres ver opciones de financiación? 💳'
    ];
    var _ctaTimer = null;
    var _ctaSnoozeUntil = 0;
    var CTA_FIRST_DELAY_MS = 2000;        // primer mensaje a los 2s del page load
    var CTA_VISIBLE_MS = 6000;            // visible exactamente 6s
    var CTA_HIDE_INTERVAL_MS = 6000;      // 6s de pausa entre mensaje y mensaje
    var CTA_SNOOZE_MS = 5 * 60 * 1000;    // 5 min tras cerrar manualmente con X
    var SNOOZE_KEY = 'altorra_cta_snooze';

    function pickCtaMessage() {
        // Mensaje aleatorio pero NO igual al anterior
        var lastIdx = parseInt(sessionStorage.getItem('altorra_cta_lastIdx') || '-1', 10);
        var idx;
        do { idx = Math.floor(Math.random() * CTA_MESSAGES.length); }
        while (idx === lastIdx && CTA_MESSAGES.length > 1);
        try { sessionStorage.setItem('altorra_cta_lastIdx', String(idx)); } catch (e) {}
        return CTA_MESSAGES[idx];
    }

    function loadCtaSnooze() {
        try {
            var v = parseInt(localStorage.getItem(SNOOZE_KEY) || '0', 10);
            if (v && Date.now() < v) _ctaSnoozeUntil = v;
        } catch (e) {}
    }

    function snoozeCtaBubble() {
        _ctaSnoozeUntil = Date.now() + CTA_SNOOZE_MS;
        try { localStorage.setItem(SNOOZE_KEY, String(_ctaSnoozeUntil)); } catch (e) {}
    }

    function canShowCta() {
        if (_isOpen) return false;
        if (Date.now() < _ctaSnoozeUntil) return false;
        if (document.hidden) return false;
        return true;
    }

    function showCtaBubble() {
        var el = document.getElementById('altorra-cta-bubble');
        var txt = document.getElementById('altorraCtaBubbleText');
        if (!el || !txt || !canShowCta()) return;
        txt.textContent = pickCtaMessage();
        el.classList.add('is-visible');
    }

    function hideCtaBubble() {
        var el = document.getElementById('altorra-cta-bubble');
        if (el) el.classList.remove('is-visible');
    }

    /**
     * Ciclo del CTA bubble:
     *   2s tras page load → primer mensaje
     *   6s visible
     *   6s sin mensaje
     *   próximo mensaje (loop)
     *
     * Si el panel está abierto, snooze activo o tab oculto, salta el
     * mensaje pero mantiene el ritmo (no acelera al volver visible —
     * sigue el ciclo natural de 6s+6s).
     */
    function scheduleCtaBubble() {
        loadCtaSnooze();
        if (_ctaTimer) clearTimeout(_ctaTimer);

        function showThenHide() {
            if (canShowCta()) showCtaBubble();
            // Sea que se mostró o no, después de CTA_VISIBLE_MS lo ocultamos
            // y agendamos el próximo ciclo.
            _ctaTimer = setTimeout(function () {
                hideCtaBubble();
                _ctaTimer = setTimeout(showThenHide, CTA_HIDE_INTERVAL_MS);
            }, CTA_VISIBLE_MS);
        }

        // Primer trigger: 2s tras page load
        _ctaTimer = setTimeout(showThenHide, CTA_FIRST_DELAY_MS);

        // Tab oculto → ocultar inmediatamente. Cuando vuelva visible
        // el ciclo natural retoma con su próximo tick.
        document.addEventListener('visibilitychange', function () {
            if (document.hidden) hideCtaBubble();
        });
    }

    function open() {
        ensureUI();
        var panel = document.getElementById('altorra-concierge');
        if (!panel) return;
        // §57.quat — limpiar inline styles forzados de finalCloseAndCleanup.
        panel.style.transition = '';
        panel.style.opacity = '';
        panel.style.transform = '';
        panel.style.pointerEvents = '';
        panel.setAttribute('aria-hidden', 'false');
        panel.classList.add('cnc-open');
        _isOpen = true;
        hideCtaBubble();

        // §57.9 — INDUSTRY-STANDARD: cada apertura tras una conversación
        // cerrada arranca FRESCA. Patrón Intercom Resolution Bot, Drift,
        // WhatsApp Business: el messenger NO persiste pantallas de cierre
        // entre aperturas. La info del cierre se ve EN VIVO mientras el
        // cliente tiene el panel abierto (via listener parent que aplica
        // closedState). Si cierra el panel y vuelve, ve welcome del bot
        // como cualquier nueva conversación. Aplica para AMBOS reasons:
        // client_finalized Y admin (cualquier cierre).
        console.log('[Concierge] §57.9 open() — session.closed=' + (session && session.closed) +
                    ' closedReason=' + (session && session.closedReason) +
                    ' messages.length=' + (session && session.messages ? session.messages.length : 0));
        if (session && session.closed === true) {
            console.log('[Concierge] §57.9 reopen tras chat cerrado: auto cleanSessionAndRender()');
            cleanSessionAndRender();
            // Re-focus input tras el reset
            setTimeout(function () {
                var input = document.getElementById('cncInput');
                if (input) input.focus();
            }, 250);
            return;
        }

        renderMessages();
        // Aplicar estado de cierre si la sesión está marcada como closed
        applyClosedState();
        // Update status
        var statusEl = document.getElementById('cncStatus');
        if (statusEl) {
            statusEl.textContent = session.mode === 'live'
                ? '👨 Asesor en vivo · respondemos pronto'
                : 'Asistente · respuesta inmediata';
        }
        // §75 Sprint S3 — arrancar typing listener si el chat ya está
        // escalado (sesión previa con _chatDocCreated=true). El guard
        // interno previene si aún no escala. Idempotente.
        try { startTypingListener(); } catch (e) {}
        // §76 Sprint S4 — marcar mensajes leídos por el cliente al abrir
        // panel + setInterval cada 10s mientras está abierto (max 6
        // writes/min, throttle 5s deduplica los redundantes).
        try { markUserRead(); startReadReceiptInterval(); } catch (e) {}
        // §77 Sprint S5 — arrancar listener system/workload + render status
        // del equipo en header. Cliente sabe si hay asesores disponibles
        // antes de escalar (info útil para tomar la decisión).
        try {
            ensureWorkloadListener();
            updateAvailabilityStatus();
        } catch (e) {}
        // Focus input
        setTimeout(function () {
            var input = document.getElementById('cncInput');
            if (input) input.focus();
        }, 250);
    }

    function close() {
        var panel = document.getElementById('altorra-concierge');
        if (!panel) return;
        panel.setAttribute('aria-hidden', 'true');
        panel.classList.remove('cnc-open');
        _isOpen = false;
        // §76 Sprint S4 — parar el ticker (no consumir Firestore writes
        // si el panel está cerrado). El listener parent sigue activo
        // si _firestoreParentUnsub lo está; lastReadByAdmin sigue llegando.
        try { stopReadReceiptInterval(); } catch (e) {}
    }

    /**
     * §57 — Wrapper de cierre: si la sesión está marcada como finalizada
     * por el cliente, hace finalCloseAndCleanup (limpia todo + sesión
     * nueva). Si no, hace close normal (oculta panel sin tocar estado).
     * Llamado por: X del header, tecla Esc.
     */
    function closeOrFinalize() {
        if (session && session.closed && session.closedReason === 'client_finalized') {
            finalCloseAndCleanup();
        } else {
            close();
        }
    }

    function toggle() { _isOpen ? closeOrFinalize() : open(); }

    /* ═══════════════════════════════════════════════════════════
       AUTH HOOK + U.18 Identity Merge — vincular conversaciones
       anónimas al uid cuando el cliente se loguea/registra.
       ═══════════════════════════════════════════════════════════ */
    /* ═══════════════════════════════════════════════════════════
       FASE 3 — Registrar chat provider (LLM via Cloud Function)
       Llama al callable `chatLLM` con los mensajes de la sesión +
       contexto. La función server-side se encarga de leer el doc
       _brain, construir system prompt, llamar al LLM, y retornar
       la respuesta. Si la function no está deployada o el _brain
       está disabled, devuelve null y el caller hace fallback rules.
       ═══════════════════════════════════════════════════════════ */
    // F3 (EPIC) — flip a v2: % de sesiones que usan el bot v2 (Tool Calling). El resto → Free Core
    // (rampa A/B del comité: 10%→100%, sin romper chats vivos). Master kill = `_brain.enabled` (server,
    // instantáneo). Con brain OFF esto es inerte (chatLLM retorna disabled igual). Para rampar: bajar el %.
    var V2_ROLLOUT_PCT = 100;
    function inV2Cohort(sid) {
        if (V2_ROLLOUT_PCT >= 100) return true;
        if (V2_ROLLOUT_PCT <= 0) return false;
        var h = 0, s = String(sid || '');
        for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
        return (h % 100) < V2_ROLLOUT_PCT;
    }

    if (window.firebaseReady && window.AltorraAI && window.AltorraAI.registerProvider) {
        window.firebaseReady.then(function () {
            if (!window.functions) return;
            try {
                var chatLLMCallable = window.functions.httpsCallable('chatLLM');
                window.AltorraAI.registerProvider('chat', function (messages, opts) {
                    opts = opts || {};
                    // F3 ramp: fuera del cohorte v2 → no llamamos al LLM (null → Free Core).
                    if (!inV2Cohort(session.sessionId)) return Promise.resolve(null);
                    var payload = {
                        messages: messages,
                        sessionId: session.sessionId,
                        sourceVehicleId: session.sourceVehicleId || null,
                        sourcePage: session.sourcePage || null,
                        profile: session.profile || null,
                        context: session.context || null,
                        activeAsesor: session.activeAsesor || null,
                        // F3 (EPIC) — motor v2 (solo-LLM + Tool Calling). v1 (inventario-en-prompt)
                        // queda dead-code → poda F6. Master switch real = _brain.enabled (server).
                        engine: 'v2'
                    };
                    return chatLLMCallable(payload).then(function (result) {
                        var data = (result && result.data) || {};
                        // Si server retorna `disabled:true` o `noKey:true`,
                        // tratar como "sin LLM" → fallback rules.
                        if (data.disabled || data.noKey) return null;
                        if (!data.text) return null;
                        return {
                            text: data.text,
                            cta: data.cta || null,
                            source: 'llm',
                            model: data.model || null,
                            usage: data.usage || null
                        };
                    });
                });
            } catch (e) {
                console.warn('[Concierge] Chat LLM provider not registered:', e.message);
            }
        });
    }

    if (window.firebaseReady) {
        window.firebaseReady.then(function () {
            if (window.auth) {
                window.auth.onAuthStateChanged(function (user) {
                    if (user && !user.isAnonymous) {
                        var prevUid = session.uid;
                        var prevEmail = session.email;
                        session.uid = user.uid;
                        session.email = user.email;
                        session.nombre = user.displayName || session.nombre;
                        if (session.level === 0) session.level = 2; // L2 contactable
                        saveSession(session);

                        // U.18 — Si la sesión anterior era anónima Y ahora se identifica,
                        // vincular leads + chats con el uid nuevo
                        if (!prevUid && user.email) {
                            mergeIdentity(user);
                        }

                        // Update soft contact si existe
                        if (typeof updateSoftContact === 'function') {
                            updateSoftContact();
                        }
                    }
                });
            }
        });
    }

    function mergeIdentity(user) {
        if (!window.db) return;
        var email = user.email;
        if (!email) return;

        // 1. Vincular chats del Concierge (conciergeChats/) que tienen este email
        //    pero userId null
        try {
            window.db.collection('conciergeChats')
                .where('userEmail', '==', email)
                .where('userId', '==', null)
                .get()
                .then(function (snap) {
                    var batch = window.db.batch();
                    var count = 0;
                    snap.forEach(function (doc) {
                        batch.update(doc.ref, {
                            userId: user.uid,
                            userNombre: user.displayName || doc.data().userNombre || null,
                            mergedAt: new Date().toISOString()
                        });
                        count++;
                    });
                    if (count > 0) {
                        batch.commit().then(function () {
                            console.info('[Concierge] Vinculados ' + count + ' chats anónimos al uid');
                            if (window.AltorraEventBus) {
                                window.AltorraEventBus.emit('identity.merged', {
                                    uid: user.uid,
                                    email: email,
                                    chatsLinked: count
                                });
                            }
                        }).catch(function () {});
                    }
                }).catch(function () {});
        } catch (e) {}

        // 2. Vincular leads anónimos de solicitudes/ con este email
        try {
            window.db.collection('solicitudes')
                .where('email', '==', email)
                .where('userId', '==', null)
                .get()
                .then(function (snap) {
                    var batch = window.db.batch();
                    var count = 0;
                    snap.forEach(function (doc) {
                        batch.update(doc.ref, {
                            userId: user.uid,
                            clientCategory: 'registered',
                            mergedAt: new Date().toISOString()
                        });
                        count++;
                    });
                    if (count > 0) {
                        batch.commit().then(function () {
                            console.info('[Concierge] Vinculados ' + count + ' leads anónimos al uid');
                        }).catch(function () {});
                    }
                }).catch(function () {});
        } catch (e) {}
    }

    /* ═══════════════════════════════════════════════════════════
       AUTO-INIT — esperar DOM y eliminar widgets legacy si presentes
       ═══════════════════════════════════════════════════════════ */
    function init() {
        ensureUI();
        // Si el legacy whatsapp-widget cargó, removerlo (compat dual transitoria)
        var legacyWA = document.querySelector('.whatsapp-widget-fab, #whatsapp-widget-fab');
        if (legacyWA) legacyWA.remove();
        var legacyAI = document.querySelector('.ai-assistant-fab, #ai-assistant-fab');
        if (legacyAI) legacyAI.remove();
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    /* ═══════════════════════════════════════════════════════════
       VEHICLE CONTEXT — abrir Concierge desde detalle de vehículo
       Reemplaza el legacy vehicle-thread.js eliminado en la unificación
       de bandejas. Cuando el usuario clickea "Hacer pregunta" en la
       ficha del vehículo, esta función:
         1. Setea sourceVehicleId en la sesión
         2. Setea sourcePage al pathname actual
         3. Si la sesión NO tiene mensajes aún, agrega un greeting
            contextualizado al vehículo
         4. Abre el panel
       ═══════════════════════════════════════════════════════════ */
    function openWithVehicleContext(opts) {
        opts = opts || {};
        var vehicleId = opts.vehicleId || window.PRERENDERED_VEHICLE_ID || null;

        // Resolver vehicleTitle con cascada de fuentes — la más confiable primero
        var vehicleTitle = (opts.vehicleTitle || '').trim();
        if (!vehicleTitle && vehicleId) {
            vehicleTitle = resolveVehicleTitleFromCache(vehicleId) || '';
        }
        if (!vehicleTitle) {
            // DOM fallback: probar selectores específicos antes que h1 genérico
            var candidates = [
                '.vehicle-title',
                'h1.vehicle-name',
                'h1.car-title',
                'h1'
            ];
            for (var i = 0; i < candidates.length; i++) {
                var el = document.querySelector(candidates[i]);
                if (el && el.textContent && el.textContent.trim()) {
                    var t = el.textContent.trim();
                    // Filtrar h1 genéricos del homepage que no son títulos de vehículo
                    if (!/encuentra el auto|altorra cars|inicio/i.test(t)) {
                        vehicleTitle = t;
                        break;
                    }
                }
            }
        }
        // Fallback final
        if (!vehicleTitle) vehicleTitle = 'este vehículo';

        if (vehicleId) {
            session.sourceVehicleId = String(vehicleId);
            session.sourcePage = window.location.pathname;
        }
        // Solo sembrar greeting si: no hay mensajes Y el gate ya está completado
        // (sino el gate aparece primero y el greeting se siembra POST-gate con el nombre).
        if ((!session.messages || session.messages.length === 0) && session.gateCompleted) {
            var firstName = getClientFirstName();
            addMessage('bot',
                '¡Hola' + (firstName ? ' ' + firstName : '') + '! 👋 Veo que te interesa el ' +
                vehicleTitle + '. Pregúntame lo que quieras: precio final, financiación, ' +
                'peritaje, agendar una visita, o lo que necesites.');
        }
        saveSession(session);
        open();
    }

    /* ═══════════════════════════════════════════════════════════
       GLOBAL CLICK INTERCEPTOR — botones que invocan al Concierge
       ═══════════════════════════════════════════════════════════ */
    document.addEventListener('click', function (e) {
        var btn = e.target.closest && e.target.closest('[data-action="open-concierge-vehicle"]');
        if (!btn) return;
        e.preventDefault();
        openWithVehicleContext();
    });

    /* ═══════════════════════════════════════════════════════════
       Public API
       ═══════════════════════════════════════════════════════════ */
    /**
     * applyAuthProfile — método público para que auth.js notifique
     * cuando el user se loguea/desloguea. Usado para sincronizar el
     * estado del chat con el perfil de auth.
     */
    function applyAuthProfile() {
        loadProfileFromAuth().then(function (profile) {
            if (profile) {
                applyAuthProfileToSession(profile);
            } else if (window.auth && window.auth.currentUser && window.auth.currentUser.isAnonymous) {
                // Logout o anónimo: si la sesión tenía datos del auth profile,
                // volver al estado guest (forzar gate de nuevo si no completaron uno propio)
                if (session.profile && session.profile.source === 'auth_profile') {
                    session.profile = null;
                    session.gateCompleted = false;
                    session.uid = null;
                    saveSession(session);
                    if (_isOpen) applyGateVisibility();
                }
            }
        });
    }

    // Auto-aplicar al cargar si ya hay user logueado
    if (window.auth && window.auth.currentUser && !window.auth.currentUser.isAnonymous) {
        applyAuthProfile();
    } else if (window.firebaseReady) {
        window.firebaseReady.then(function () {
            // Listener auth: cada cambio de estado actualiza el chat
            if (window.auth && typeof window.auth.onAuthStateChanged === 'function') {
                window.auth.onAuthStateChanged(function () {
                    applyAuthProfile();
                });
            }
        });
    }

    window.AltorraConcierge = {
        open: open,
        close: close,
        toggle: toggle,
        send: send,
        openWithVehicleContext: openWithVehicleContext,
        applyAuthProfile: applyAuthProfile,
        resetSession: resetSession,
        session: function () { return Object.assign({}, session); },
        // Debug
        _state: function () { return { session: session, isOpen: _isOpen }; }
    };
})();
