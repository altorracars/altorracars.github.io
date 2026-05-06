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
                    return { text: formatted.text, cta: formatted.cta };
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
                    text: answers[attr] + ' ¿Querés ver la ficha completa o agendar una visita?',
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

        // Doble fallback: 2do fallo consecutivo → escalado empático automático
        if (session.botFallbackCount >= 2) {
            session.botFallbackCount = 0;
            saveSession(session);
            setTimeout(function () { escalateToLive('double_fallback'); }, 800);
            return {
                text: 'Parece que tu consulta requiere la ayuda de un experto. Te conectaré con un asesor en vivo de inmediato. 🙋‍♂️',
                _isFallback: true
            };
        }

        // Primer fallback: pedir reformulación amablemente
        if (session.botFallbackCount === 1) {
            return {
                text: (firstName ? firstName + ', ' : '') +
                      'no estoy seguro de haber entendido bien. ¿Podrías reformular tu pregunta? ' +
                      'Por ejemplo: *¿qué autos tienen disponibles?*, *¿cuánto cuesta el Mazda?* o *quiero financiar*.',
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
                  'Escribime con más detalle qué necesitas, o si prefieres, te paso con un asesor.',
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
            return Promise.resolve({
                text: (firstName ? firstName + ', ' : '') +
                      'te entiendo. Déjame conectarte con un asesor humano que pueda ayudarte directamente.',
                cta: { label: 'Hablar con asesor', action: 'escalate' },
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
        // Bloqueo: si la sesión está cerrada por el admin, ignorar
        if (session.closed) return;
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
                    addMessage('bot', resp.text, { cta: resp.cta, quickReplies: resp.quickReplies });
                    setTimeout(function () { maybeAskForProfile(); }, 1200);
                }).catch(function (err) {
                    hideTypingIndicator();
                    console.warn('[Concierge] Response error:', err && err.message);
                    // Último recurso: rule-based fallback síncrono
                    var fallback = generateBotResponse(text);
                    if (!fallback._isFallback) resetFallbackCounter();
                    addMessage('bot', fallback.text, { cta: fallback.cta });
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
        }, function () {});
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
        if (w.asesoresAvailable > 0) {
            stateMsg = '🟢 Estás en la posición #' + Math.max(1, w.queueLength || 1) +
                       '. Un asesor te atenderá en un momento.';
            stateClass = 'cnc-queue-banner--available';
        } else if (w.asesoresOnline > 0) {
            var estMin = Math.ceil(((w.queueLength || 1) * 5) / w.asesoresOnline);
            stateMsg = '🟡 Nuestros asesores están atendiendo a otros clientes. Tiempo estimado: ' + estMin + ' min.';
            stateClass = 'cnc-queue-banner--saturated';
        } else {
            stateMsg = '🔵 Nuestros asesores no están disponibles en este instante. Tiempo estimado de respuesta: 5 a 10 minutos.';
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
        // FASE 2.B — Si gate ya completado (sea por form o por auth profile), skip
        if (session.gateCompleted && session.profile) return false;
        // Si el cliente está logueado con perfil COMPLETO (auth + email + nombre + cedula),
        // saltamos el gate. Si falta cedula (usuario viejo pre-fix), pedimos solo eso
        // a través de maybeAskForProfile más adelante en lugar del gate completo.
        if (session.uid && session.email && session.nombre) return false;
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
        session.uid = profile.uid;
        session.email = profile.correo;
        session.nombre = (profile.nombre + ' ' + profile.apellido).trim();
        session.telefono = profile.celular;
        // Si tiene los datos esenciales (incluyendo cédula), saltamos el gate
        if (profile.nombre && profile.correo && profile.cedula && profile.celular) {
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
                inp.placeholder = 'Conversación cerrada';
            }
            if (sendBtn) sendBtn.disabled = true;
            if (inputWrap) inputWrap.style.display = 'none';

            // Inyectar bloque de cierre con CTA
            // §23 FASE 5 — el bloque incluye el radicado del chat finalizado
            // para que el cliente lo conserve como referencia.
            var radicadoTxt = session.radicado ? session.radicado : '';
            if (!closedBlock) {
                closedBlock = document.createElement('div');
                closedBlock.id = 'cncClosedBlock';
                closedBlock.className = 'cnc-closed-block';
                closedBlock.innerHTML =
                    '<div class="cnc-closed-icon"><i data-lucide="check-circle-2"></i></div>' +
                    '<div class="cnc-closed-title">Esta conversación ha finalizado</div>' +
                    '<div class="cnc-closed-sub">Iniciá una nueva cuando quieras hablar con nosotros otra vez.</div>' +
                    (radicadoTxt
                        ? '<div class="cnc-closed-radicado" id="cncClosedRadicado">Radicado: <strong>' + radicadoTxt + '</strong></div>'
                        : '') +
                    '<button class="cnc-closed-cta" id="cncResetSessionBtn">' +
                        '<i data-lucide="refresh-cw"></i> Iniciar nueva conversación' +
                    '</button>';
                var panel = document.getElementById('altorra-concierge');
                if (panel) panel.appendChild(closedBlock);
                if (window.AltorraIcons && window.AltorraIcons.refresh) {
                    window.AltorraIcons.refresh(closedBlock);
                }
                var resetBtn = document.getElementById('cncResetSessionBtn');
                if (resetBtn) resetBtn.addEventListener('click', resetSession);
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
     * Tres caminos según el estado del cliente:
     *
     * A) ANÓNIMO con profile previo (lead-gate completado antes):
     *    Le preguntamos si sus datos siguen siendo correctos:
     *      - Sí → preservar profile, solo limpiar mensajes/listeners
     *        (no vuelve a pedir el gate)
     *      - No → reset completo, vuelve a aparecer el gate vacío
     *
     * B) LOGUEADO (profile viene del auth):
     *    Reset completo. loadProfileFromAuth() re-aplica el profile
     *    automáticamente (no le preguntamos porque su info viene del
     *    perfil que él mismo gestiona en /perfil.html).
     *
     * C) ANÓNIMO sin profile (primera vez):
     *    Reset normal con confirm genérico.
     *
     * En todos los casos cancelamos listeners ANTES de escribir
     * status:'closed' a Firestore. Esto evita el race condition donde
     * el listener parent recibía el snapshot del cierre y disparaba
     * applyClosedState() pisando nuestro reset local.
     */
    function handleClientResetSession() {
        var isAnonymous = !window.auth || !window.auth.currentUser ||
                          window.auth.currentUser.isAnonymous;
        var hasGuestProfile = isAnonymous && session.profile &&
                              (session.profile.nombre || session.profile.correo);

        // CASO A: anónimo con datos previos → confirmar si siguen vigentes
        if (hasGuestProfile) {
            var p = session.profile;
            var fullName = (p.nombre + (p.apellido ? ' ' + p.apellido : '')).trim() ||
                           session.nombre || 'sin nombre';
            var phone = p.celular || session.telefono || 'sin teléfono';
            var email = p.correo || session.email || 'sin correo';
            var msg =
                'Antes de empezar de nuevo, ¿estos siguen siendo tus datos?\n\n' +
                '👤  ' + fullName + '\n' +
                '📱  ' + phone + '\n' +
                '📧  ' + email + '\n\n' +
                '✅  Aceptar = Sí, son correctos (continuar)\n' +
                '✏️  Cancelar = No, quiero actualizarlos';
            var keepData = confirm(msg);
            // Cancelar listeners ANTES de cualquier Firestore write
            cancelChatListeners();
            // Marcar status:closed en Firestore (best-effort, no bloquea)
            markChatClosedInFirestore();
            if (keepData) {
                resetSession({ preserveProfile: true });
            } else {
                resetSession({ preserveProfile: false });
            }
            return;
        }

        // CASO B/C: confirm genérico
        if (!confirm('¿Finalizar esta conversación?\n\nSe va a limpiar el chat actual y vas a empezar uno nuevo. Los mensajes anteriores quedan guardados de tu lado, pero no podrás continuarlos.')) {
            return;
        }
        cancelChatListeners();
        markChatClosedInFirestore();
        resetSession({ preserveProfile: false });
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
    }

    /**
     * Marca el chat como cerrado en Firestore (best-effort).
     * Si falla por red o permisos, no bloquea el reset local.
     */
    function markChatClosedInFirestore() {
        if (!_chatDocCreated || !session.sessionId || !window.db) return;
        window.db.collection('conciergeChats').doc(session.sessionId).set({
            status: 'closed',
            closedAt: new Date().toISOString(),
            closedBy: 'client',
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

        // Snapshot del profile actual ANTES de tocar la sesión, para poder
        // re-aplicarlo en continueResetUI si preserveProfile=true. Esto cubre
        // el caso anónimo donde el cliente confirmó "estos siguen siendo mis
        // datos" en el confirm de handleClientResetSession.
        var preserved = preserveProfile ? {
            profile: session.profile,
            gateCompleted: !!session.gateCompleted,
            uid: session.uid,
            nombre: session.nombre,
            email: session.email,
            telefono: session.telefono,
            level: session.level || 0
        } : null;

        // Cerrar listeners activos (defense-in-depth: handleClientResetSession
        // ya los canceló, pero si resetSession se invoca desde otro path
        // — ej. cnc-closed-block CTA "Iniciar nueva" — los cancelamos acá)
        cancelChatListeners();

        // Limpiar localStorage
        try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}

        // Reset refs
        _chatDocCreated = false;
        _lastSyncedMsgIds = {};
        _leadCreated = false;
        _asesorJoinedAnnounced = false;

        // Reload sesión limpia (genera nuevo sessionId)
        session = loadSession();

        // Re-aplicar perfil del auth si user logueado (siempre — auth profile
        // es source of truth para usuarios registrados, no necesita confirm)
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
                }
                continueResetUI();
            });
        } else {
            continueResetUI();
        }

        function continueResetUI() {
            // Si el caller pidió preservar el profile (caso anónimo "datos OK"),
            // restauramos los campos guardados PERO solo si auth no aportó
            // un profile más fresco (caller logueado).
            if (preserved && !session.profile) {
                session.profile = preserved.profile;
                session.gateCompleted = preserved.gateCompleted;
                session.uid = preserved.uid;
                session.nombre = preserved.nombre;
                session.email = preserved.email;
                session.telefono = preserved.telefono;
                session.level = preserved.level;
                saveSession(session);
            }

            // Cleanup defensivo del DOM: bloque "conversation closed" + dropdown ⋮
            var closedBlock = document.getElementById('cncClosedBlock');
            if (closedBlock) closedBlock.remove();
            var dropdown = document.getElementById('cncHeaderDropdown');
            if (dropdown) dropdown.setAttribute('hidden', '');
            var menuBtn = document.getElementById('cncHeaderMenuBtn');
            if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');

            // Limpiar mensajes del DOM antes de re-renderizar
            var msgsBox = document.getElementById('cncMessages');
            if (msgsBox) msgsBox.innerHTML = '';

            // Aplicar UI states (orden: closed → gate → header → mensajes)
            applyClosedState();           // restaura input/quickActions
            applyGateVisibility();         // muestra gate si no logueado
            applyAsesorHeader();           // resetea header a ALTOR
            renderMessages();              // muestra welcome bubble si messages=[]

            // Toast de confirmación visual al cliente
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
            // F.3 — Proactive messages tienen un acento visual sutil
            // (un brillito dorado tenue) para distinguirlos de respuestas
            // a mensajes del cliente.
            if (m.from === 'bot' && m.proactive) {
                bubbleClass += ' cnc-proactive-bubble';
            }
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
            return '<div class="cnc-msg ' + bubbleClass + '">' + escapeHtml(m.text) + ctaHTML + quickRepliesHTML + '</div>';
        }).join('');
        box.scrollTop = box.scrollHeight;
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
        panel.setAttribute('aria-hidden', 'false');
        panel.classList.add('cnc-open');
        _isOpen = true;
        // Ocultar el CTA bubble al abrir el panel
        hideCtaBubble();
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
    /* ═══════════════════════════════════════════════════════════
       FASE 3 — Registrar chat provider (LLM via Cloud Function)
       Llama al callable `chatLLM` con los mensajes de la sesión +
       contexto. La función server-side se encarga de leer el doc
       _brain, construir system prompt, llamar al LLM, y retornar
       la respuesta. Si la function no está deployada o el _brain
       está disabled, devuelve null y el caller hace fallback rules.
       ═══════════════════════════════════════════════════════════ */
    if (window.firebaseReady && window.AltorraAI && window.AltorraAI.registerProvider) {
        window.firebaseReady.then(function () {
            if (!window.functions) return;
            try {
                var chatLLMCallable = window.functions.httpsCallable('chatLLM');
                window.AltorraAI.registerProvider('chat', function (messages, opts) {
                    opts = opts || {};
                    var payload = {
                        messages: messages,
                        sessionId: session.sessionId,
                        sourceVehicleId: session.sourceVehicleId || null,
                        sourcePage: session.sourcePage || null,
                        profile: session.profile || null,
                        context: session.context || null,
                        activeAsesor: session.activeAsesor || null
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
