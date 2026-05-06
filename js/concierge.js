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
            // Intent classifier memoria conversacional
            context: { lastIntent: null, discussedTopics: [], bot_repeated_count: 0 },
            // Handoff dinámico
            activeAsesor: null,      // { uid, nombre, photoURL } cuando un asesor toma el chat
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
                '¡Hola ' + firstName + '! 👋 Bien por aquí, listo para ayudarte. ¿Qué andás buscando?',
                'Hola de nuevo ' + firstName + '. ¿En qué puedo ayudarte hoy?',
                '¡Qué tal ' + firstName + '! Cuéntame qué necesitas.'
            ] : [
                '¡Hola! 👋 Bien por aquí, listo para ayudarte. ¿Qué andás buscando?',
                '¡Qué tal! ¿En qué puedo ayudarte hoy?',
                'Hola, gusto saludarte. Cuéntame qué necesitas.'
            ];
            return { text: pickVariant(greetVariants, ctx) };
        }

        // 4. Intent: thanks — agradecer naturalmente
        if (classification.intent === 'thanks') {
            var thanksVariants = [
                '¡De nada' + (firstName ? ' ' + firstName : '') + '! Cualquier otra cosa, aquí estoy 🙌',
                'Un gusto. Si necesitas algo más, escribime.',
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

        // 7. Intent: inventory_query — sutil con link al catálogo + cifra real
        if (classification.intent === 'inventory_query') {
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
        if (classification.intent === 'financiacion_query') {
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
        if (classification.intent === 'appointment_request') {
            return {
                text: '📅 Para agendar una cita o test drive, te conecto con un asesor que coordina fecha y hora directamente contigo. ¿Procedemos?',
                cta: { label: 'Agendar con asesor', action: 'escalate' }
            };
        }

        // 11. Intent: sell_my_car
        if (classification.intent === 'sell_my_car') {
            return {
                text: '🚙 Te ayudamos a vender tu auto. Tenemos compra directa con valuación inmediata o consignación. Inicia con peritaje gratis sin compromiso.',
                cta: { label: 'Vender mi auto', action: 'open-modal-vende' }
            };
        }

        // 12. KB del admin (más confiable que FAQ hardcoded)
        if (window.AltorraKB && window.AltorraKB.findBest) {
            var kbEntry = window.AltorraKB.findBest(userMsg);
            if (kbEntry) {
                window.AltorraKB.recordUsage(kbEntry._id);
                return { text: kbEntry.answer, kbId: kbEntry._id };
            }
        }

        // 13. FAQ hardcoded fallback
        var faq = findFAQ(userMsg);
        if (faq) return { text: faq.text, cta: faq.cta || null };

        // 14. NER — si menciona marca/modelo/precio sin intent claro
        if (window.AltorraNER) {
            var ext = window.AltorraNER.extract(userMsg);
            if (ext.summary && (ext.summary.marca || ext.summary.precio)) {
                var bits = [];
                if (ext.summary.marca) bits.push(ext.summary.marca);
                if (ext.summary.year) bits.push('año ' + ext.summary.year);
                if (ext.summary.precio) bits.push('por ~$' + Math.round(ext.summary.precio / 1000000) + 'M');
                return {
                    text: 'Veo que te interesa un ' + bits.join(' ') + '. ¿Quieres ver opciones similares en el catálogo o te conecto con un asesor?',
                    cta: { label: 'Ver inventario', action: 'goto-busqueda' }
                };
            }
        }

        // 15. Fallback INTELIGENTE — varía si el cliente repitió y sugiere acción concreta
        if (window.AltorraIntent && window.AltorraIntent.shouldVary(ctx)) {
            return {
                text: 'Parece que necesitas algo específico. Déjame conectarte con un asesor humano que pueda ayudarte mejor.',
                cta: { label: 'Hablar con asesor', action: 'escalate' }
            };
        }
        return {
            text: (firstName ? firstName + ', ' : '') +
                  'puedo ayudarte con info del catálogo, financiación, citas y peritaje. ' +
                  'Escribime con más detalle qué necesitas, o si prefieres, te paso con un asesor.',
            cta: { label: 'Hablar con asesor', action: 'escalate' }
        };
    }

    /* ═══════════════════════════════════════════════════════════
       MESSAGE HANDLING
       ═══════════════════════════════════════════════════════════ */
    function addMessage(from, text, opts) {
        opts = opts || {};
        var msg = {
            from: from,         // 'user' | 'bot' | 'asesor'
            text: text,
            timestamp: Date.now(),
            cta: opts.cta || null,
            _synced: false
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
        addMessage('user', text.trim());

        // Intent classifier: actualizar memoria conversacional ANTES del response
        if (window.AltorraIntent) {
            var classification = window.AltorraIntent.classify(text, session.context || {});
            session.context = session.context || {};
            window.AltorraIntent.updateContext(session.context, classification.intent, text);
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
            setTimeout(function () {
                var resp = generateBotResponse(text);
                addMessage('bot', resp.text, { cta: resp.cta });
                // U.17 — Después del bot response, decidir si pedir datos
                setTimeout(function () { maybeAskForProfile(); }, 1200);
            }, 500 + Math.random() * 600);
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
                addMessage('bot', 'Genial ' + firstName + '. Para que un asesor te pueda contactar después, ¿me dejás tu correo o WhatsApp?');
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
                addMessage('bot', '¿Tenés un rango de presupuesto o tipo de vehículo en mente? Así te muestro las mejores opciones.');
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
        if (window.AltorraCommSchema && window.AltorraCommSchema.computeMeta) {
            try { lead = window.AltorraCommSchema.computeMeta(lead); } catch (e) {}
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

    function escalateToLive() {
        session.mode = 'live';
        session.level = Math.max(session.level || 0, 4); // L4 — asignado a asesor
        saveSession(session);
        addMessage('bot', '✅ Conectándote con un asesor humano. En breve te respondemos aquí mismo en este chat.');
        // U.16 — Si no hay soft contact aún (raro), crear ahora
        if (!_leadCreated) createSoftContact();
        else updateSoftContact(); // bumpear level=4
        // Crear chat doc en Firestore + iniciar sync bidireccional (U.10)
        // Espera a que auth resuelva (signInAnonymously suele estar en flight)
        // antes de intentar el write — sin esto, permission-denied silenciosa.
        waitForAuthThen(function () {
            ensureFirestoreChatDoc().catch(function (err) {
                console.warn('[Concierge] No se pudo crear el chat:', err && err.message);
                addMessage('bot', '⚠️ No pude conectar con el asesor en este momento. Por favor intenta de nuevo en unos segundos.');
            });
        });
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
            .then(function () { startFirestoreSync(); })
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

        // Listener para mensajes nuevos del asesor
        _firestoreUnsub = window.db.collection('conciergeChats').doc(session.sessionId)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot(function (snap) {
                snap.docChanges().forEach(function (chg) {
                    if (chg.type !== 'added') return;
                    var d = chg.doc.data();
                    if (_lastSyncedMsgIds[chg.doc.id]) return;
                    _lastSyncedMsgIds[chg.doc.id] = true;
                    // Solo procesamos mensajes del asesor (los nuestros ya están en local)
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
                                // Mensaje de sistema visualmente distinto
                                session.messages.push({
                                    from: 'system',
                                    text: '✓ ' + asesorNombre + ' se ha unido al chat',
                                    timestamp: new Date(d.timestamp).getTime() - 1, // antes que el msg real
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
                            // Reset unread count en Firestore
                            window.db.collection('conciergeChats').doc(session.sessionId)
                                .update({ unreadByUser: 0 }).catch(function () {});
                        }
                    }
                });
            }, function () { /* permission errors silenced */ });
    }

    function syncMessageToFirestore(msg) {
        if (!_chatDocCreated || !window.db) return;
        var ref = window.db.collection('conciergeChats').doc(session.sessionId)
            .collection('messages').doc();
        ref.set({
            from: msg.from,
            text: msg.text,
            timestamp: new Date(msg.timestamp).toISOString()
        }).then(function () {
            msg._synced = true;
            saveSession(session);
        }).catch(function () {});
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
                '<button class="cnc-close" aria-label="Cerrar">×</button>' +
            '</div>' +
            // Lead Capture Gate — visible si gateCompleted === false
            '<div class="cnc-gate" id="cncGate" style="display:none;">' +
                '<div class="cnc-gate-head">' +
                    '<div class="cnc-gate-title">Antes de empezar</div>' +
                    '<div class="cnc-gate-sub">Cuéntanos quién eres para que podamos darte el mejor servicio.</div>' +
                '</div>' +
                '<form class="cnc-gate-form" id="cncGateForm" autocomplete="on" novalidate>' +
                    '<div class="cnc-gate-row">' +
                        '<label><span>Nombre *</span><input type="text" name="nombre" required minlength="2" autocomplete="given-name"></label>' +
                        '<label><span>Apellido *</span><input type="text" name="apellido" required minlength="2" autocomplete="family-name"></label>' +
                    '</div>' +
                    '<div class="cnc-gate-row">' +
                        '<label><span>Cédula *</span><input type="tel" name="cedula" required pattern="[0-9]{5,12}" inputmode="numeric" placeholder="Sin puntos"></label>' +
                        '<label><span>Celular *</span><input type="tel" name="celular" required pattern="3[0-9]{9}" inputmode="numeric" autocomplete="tel-national" placeholder="3201234567"></label>' +
                    '</div>' +
                    '<label><span>Correo *</span><input type="email" name="correo" required autocomplete="email" placeholder="tu@correo.com"></label>' +
                    '<label class="cnc-gate-consent"><input type="checkbox" name="consent" required>' +
                        '<span>Autorizo que un asesor de Altorra Cars me contacte por email/WhatsApp.</span>' +
                    '</label>' +
                    '<button type="submit" class="cnc-gate-submit">Iniciar conversación</button>' +
                    '<div class="cnc-gate-error" id="cncGateError" role="alert" aria-live="polite"></div>' +
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
        panel.querySelector('.cnc-close').addEventListener('click', close);
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

        // Quick action handlers
        panel.addEventListener('click', function (e) {
            var btn = e.target.closest('[data-action]');
            if (!btn) return;
            handleAction(btn.getAttribute('data-action'));
        });

        // Lead Capture Gate form handler
        var gateForm = document.getElementById('cncGateForm');
        if (gateForm) {
            gateForm.addEventListener('submit', handleGateSubmit);
        }

        // Aplicar estado inicial: mostrar gate si falta + sync header con activeAsesor
        applyGateVisibility();
        applyAsesorHeader();
    }

    /* ═══════════════════════════════════════════════════════════
       LEAD CAPTURE GATE — captura datos antes del primer mensaje
       ═══════════════════════════════════════════════════════════ */
    function isGateRequired() {
        // Si el cliente está logueado con un perfil completo (auth + email + nombre),
        // saltamos el gate
        if (session.uid && session.email && session.nombre) return false;
        return !session.gateCompleted || !session.profile;
    }

    function applyGateVisibility() {
        var gate = document.getElementById('cncGate');
        var qa = document.getElementById('cncQuickActions');
        var msgs = document.getElementById('cncMessages');
        var inp = document.getElementById('cncInputWrap');
        if (!gate) return;
        if (isGateRequired()) {
            gate.style.display = 'flex';
            if (qa) qa.style.display = 'none';
            if (msgs) msgs.style.display = 'none';
            if (inp) inp.style.display = 'none';
        } else {
            gate.style.display = 'none';
            if (qa) qa.style.display = '';
            if (msgs) msgs.style.display = '';
            if (inp) inp.style.display = '';
        }
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
            cedula: (form.cedula.value || '').trim(),
            celular: (form.celular.value || '').trim(),
            correo: (form.correo.value || '').trim().toLowerCase(),
            consent: !!form.consent.checked
        };

        // Validaciones explícitas (los HTML5 validators a veces no disparan bien en mobile)
        if (fd.nombre.length < 2) return fail('Por favor escribe tu nombre.');
        if (fd.apellido.length < 2) return fail('Por favor escribe tu apellido.');
        if (!/^[0-9]{5,12}$/.test(fd.cedula)) return fail('Cédula inválida (solo números, 5-12 dígitos).');
        if (!/^3[0-9]{9}$/.test(fd.celular)) return fail('Celular inválido (formato colombiano: 3XX XXX XXXX).');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fd.correo)) return fail('Correo inválido.');
        if (!fd.consent) return fail('Necesitamos tu autorización para contactarte.');

        // Persistir en sesión
        session.profile = fd;
        session.nombre = fd.nombre + ' ' + fd.apellido;
        session.email = fd.correo;
        session.telefono = fd.celular;
        session.gateCompleted = true;
        session.level = Math.max(session.level || 0, 2); // L2 contactable
        saveSession(session);

        // Crear soft contact con perfil COMPLETO (NER ya tiene todo)
        if (!_leadCreated) createSoftContact();
        else updateSoftContact();

        // Sembrar greeting personalizado
        var firstName = fd.nombre.trim().split(/\s+/)[0];
        var sourceVeh = session.sourceVehicleId ? resolveVehicleTitleFromCache(session.sourceVehicleId) : null;
        var greet;
        if (sourceVeh) {
            greet = '¡Hola ' + firstName + '! 👋 Soy ALTOR, el Asistente Virtual IA de Altorra Cars. ' +
                    'Veo que te interesa el ' + sourceVeh + '. Pregúntame lo que quieras: ' +
                    'precio final, financiación, peritaje, agendar una visita, o lo que necesites.';
        } else {
            greet = '¡Hola ' + firstName + '! 👋 Soy ALTOR, el Asistente Virtual IA de Altorra Cars. ' +
                    'Estoy aquí para ayudarte con info del catálogo, financiación, citas, peritaje y más. ' +
                    'Si en algún momento querés hablar con un asesor humano, decímelo nomás.';
        }
        addMessage('bot', greet);
        applyGateVisibility();

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
            // 'open-wa' eliminado del flujo público — el bot debe escalar al
            // asesor en vivo, NO redirigir a WhatsApp. handoverToWhatsApp()
            // se conserva como utilidad interna para uso manual del admin
            // desde la bandeja Concierge (caso U.14 — handover refinado).
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
        }
    }

    function renderMessages() {
        var box = document.getElementById('cncMessages');
        if (!box) return;
        if (session.messages.length === 0) {
            box.innerHTML =
                '<div class="cnc-bot-bubble cnc-welcome">' +
                    '<strong>👋 ¡Hola! Soy ALTOR</strong>, el Asistente Virtual IA de Altorra Cars.' +
                    '<br><br>' +
                    'Pregúntame sobre vehículos, financiación, citas, peritaje o lo que necesites. Si querés, puedo conectarte directo con un asesor humano.' +
                '</div>';
            return;
        }
        box.innerHTML = session.messages.map(function (m) {
            // Mensaje de sistema (handoff "X se ha unido", desconexión, etc.)
            if (m.from === 'system') {
                return '<div class="cnc-system-msg">' + escapeHtml(m.text) + '</div>';
            }
            var bubbleClass = m.from === 'user' ? 'cnc-user-bubble' :
                              m.from === 'asesor' ? 'cnc-asesor-bubble' : 'cnc-bot-bubble';
            var ctaHTML = '';
            if (m.cta && m.cta.action) {
                ctaHTML = '<button class="cnc-bubble-cta" data-action="' + m.cta.action + '">' + m.cta.label + '</button>';
            }
            return '<div class="cnc-msg ' + bubbleClass + '">' + escapeHtml(m.text) + ctaHTML + '</div>';
        }).join('');
        box.scrollTop = box.scrollHeight;
    }

    function escapeHtml(s) {
        var d = document.createElement('div');
        d.textContent = s == null ? '' : String(s);
        return d.innerHTML;
    }

    function open() {
        ensureUI();
        var panel = document.getElementById('altorra-concierge');
        if (!panel) return;
        panel.setAttribute('aria-hidden', 'false');
        panel.classList.add('cnc-open');
        _isOpen = true;
        renderMessages();
        // Update status
        var statusEl = document.getElementById('cncStatus');
        if (statusEl) {
            statusEl.textContent = session.mode === 'live'
                ? '👨 Asesor en vivo · respondemos pronto'
                : 'Asistente · respuesta inmediata';
        }
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
    }

    function toggle() { _isOpen ? close() : open(); }

    /* ═══════════════════════════════════════════════════════════
       AUTH HOOK + U.18 Identity Merge — vincular conversaciones
       anónimas al uid cuando el cliente se loguea/registra.
       ═══════════════════════════════════════════════════════════ */
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
    window.AltorraConcierge = {
        open: open,
        close: close,
        toggle: toggle,
        send: send,
        openWithVehicleContext: openWithVehicleContext,
        session: function () { return Object.assign({}, session); },
        // Debug
        _state: function () { return { session: session, isOpen: _isOpen }; }
    };
})();
