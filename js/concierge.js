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
            text: '📍 Estamos en Cartagena, Colombia. ¿Quieres agendar una visita o que te enviemos la dirección por WhatsApp?',
            cta: { label: 'Hablar por WhatsApp', action: 'open-wa' }
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
            if (raw) return JSON.parse(raw);
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
    function generateBotResponse(userMsg) {
        // 1. Sentiment check — si muy negativo, escalar inmediatamente
        if (window.AltorraAI) {
            var s = window.AltorraAI.sentiment(userMsg);
            if (s && s.label === 'negative' && s.score < -0.5) {
                return {
                    text: 'Entiendo tu preocupación 🙏 Déjame conectarte con un asesor que pueda ayudarte directamente.',
                    cta: { label: 'Hablar con asesor', action: 'escalate' }
                };
            }
        }

        // 2. Intent — buscar en FAQ
        var faq = findFAQ(userMsg);
        if (faq) return { text: faq.text, cta: faq.cta || null };

        // 3. NER — si menciona marca/modelo/precio, ofrecer conectar
        if (window.AltorraNER) {
            var ext = window.AltorraNER.extract(userMsg);
            if (ext.summary && (ext.summary.marca || ext.summary.precio)) {
                var bits = [];
                if (ext.summary.marca) bits.push(ext.summary.marca);
                if (ext.summary.year) bits.push('año ' + ext.summary.year);
                if (ext.summary.precio) bits.push('por ~$' + Math.round(ext.summary.precio / 1000000) + 'M');
                return {
                    text: '¿Te interesa un ' + bits.join(' ') + '? Déjame revisar el inventario y conectarte con un asesor.',
                    cta: { label: 'Ver inventario', action: 'goto-busqueda' }
                };
            }
        }

        // 4. Fallback genérico
        return {
            text: '👋 Estoy aquí para ayudarte con info del catálogo, financiación, citas y más. ¿Qué te gustaría saber? También puedo conectarte con un asesor.',
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

        // Bot response (delayed para sentir natural)
        if (session.mode === 'bot') {
            setTimeout(function () {
                var resp = generateBotResponse(text);
                addMessage('bot', resp.text, { cta: resp.cta });
            }, 500 + Math.random() * 600);
        }
        // Si está en modo live, el mensaje queda esperando al asesor
        // (U.10/U.11 implementarán la bandeja admin que lee este chat)
    }

    function escalateToLive() {
        session.mode = 'live';
        saveSession(session);
        addMessage('bot', '✅ Conectándote con un asesor humano. En breve te respondemos por aquí o por WhatsApp.');
        // Crear lead en CRM (U.16 ampliará esto)
        createLeadInCRM();
        // Crear chat doc en Firestore + iniciar sync bidireccional (U.10)
        ensureFirestoreChatDoc();
    }

    function handoverToWhatsApp() {
        var summary = buildWhatsAppSummary();
        var url = 'https://wa.me/' + WHATSAPP_NUMBER.replace(/[^0-9]/g, '') + '?text=' + encodeURIComponent(summary);
        session.mode = 'wa_handed_over';
        saveSession(session);
        window.open(url, '_blank');
    }

    function buildWhatsAppSummary() {
        var lines = ['Hola, vengo del Concierge de Altorra Cars.', ''];
        lines.push('Ticket: ' + session.sessionId);
        if (session.nombre) lines.push('Nombre: ' + session.nombre);
        if (session.email) lines.push('Email: ' + session.email);
        if (session.sourceVehicleId) lines.push('Vehículo de interés: ID ' + session.sourceVehicleId);
        lines.push('');
        lines.push('Resumen de la conversación:');
        var lastUserMsgs = session.messages.filter(function (m) { return m.from === 'user'; }).slice(-3);
        lastUserMsgs.forEach(function (m) {
            lines.push('• ' + m.text);
        });
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

    /* ═══════════════════════════════════════════════════════════
       CRM INTEGRATION — soft contact al primer mensaje
       ═══════════════════════════════════════════════════════════ */
    var _leadCreated = false;
    function createLeadInCRM() {
        if (_leadCreated) return;
        if (!window.db) return;
        _leadCreated = true;

        var firstMessages = session.messages.filter(function (m) { return m.from === 'user'; }).slice(0, 5);
        var summary = firstMessages.map(function (m) { return m.text; }).join(' / ');

        var lead = {
            kind: 'lead',
            tipo: 'consulta_concierge',
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
            createdAt: new Date().toISOString()
        };
        // Apply schema meta if available (computeMeta agrega priority, slaDeadline, tags)
        if (window.AltorraCommSchema && window.AltorraCommSchema.computeMeta) {
            try { lead = window.AltorraCommSchema.computeMeta(lead); } catch (e) {}
        }

        window.db.collection('solicitudes').add(lead).catch(function () {});
    }

    /* ═══════════════════════════════════════════════════════════
       UI — botón flotante + panel
       ═══════════════════════════════════════════════════════════ */
    var _isOpen = false;

    function ensureUI() {
        if (document.getElementById('altorra-concierge')) return;

        var btn = document.createElement('button');
        btn.id = 'altorra-concierge-btn';
        btn.className = 'altorra-concierge-btn';
        btn.setAttribute('aria-label', 'Abrir Concierge');
        btn.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>';
        btn.addEventListener('click', toggle);
        document.body.appendChild(btn);

        var panel = document.createElement('div');
        panel.id = 'altorra-concierge';
        panel.className = 'altorra-concierge';
        panel.setAttribute('role', 'dialog');
        panel.setAttribute('aria-label', 'Concierge Altorra Cars');
        panel.setAttribute('aria-hidden', 'true');
        panel.innerHTML =
            '<div class="cnc-header">' +
                '<div class="cnc-header-info">' +
                    '<div class="cnc-avatar"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg></div>' +
                    '<div>' +
                        '<div class="cnc-title">Concierge Altorra</div>' +
                        '<div class="cnc-status" id="cncStatus">Asistente · respuesta inmediata</div>' +
                    '</div>' +
                '</div>' +
                '<button class="cnc-close" aria-label="Cerrar">×</button>' +
            '</div>' +
            '<div class="cnc-quick-actions">' +
                '<button class="cnc-quick-btn" data-action="escalate">👨 Asesor en vivo</button>' +
                '<button class="cnc-quick-btn" data-action="open-wa">📲 WhatsApp</button>' +
            '</div>' +
            '<div class="cnc-messages" id="cncMessages"></div>' +
            '<div class="cnc-input-wrap">' +
                '<input type="text" class="cnc-input" id="cncInput" placeholder="Escribe tu mensaje..." autocomplete="off">' +
                '<button class="cnc-send" id="cncSend" aria-label="Enviar">' +
                    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>' +
                '</button>' +
            '</div>';
        document.body.appendChild(panel);

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
    }

    function handleAction(action) {
        switch (action) {
            case 'escalate':
                escalateToLive();
                break;
            case 'open-wa':
                handoverToWhatsApp();
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
                    '<strong>👋 ¡Hola!</strong> Soy el Concierge de Altorra Cars.' +
                    '<br><br>' +
                    'Pregúntame sobre vehículos, financiación, citas o lo que necesites. Si quieres, puedo conectarte directo con un asesor humano.' +
                '</div>';
            return;
        }
        box.innerHTML = session.messages.map(function (m) {
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
       AUTH HOOK — actualizar session cuando se loguea (U.18 prep)
       ═══════════════════════════════════════════════════════════ */
    if (window.firebaseReady) {
        window.firebaseReady.then(function () {
            if (window.auth) {
                window.auth.onAuthStateChanged(function (user) {
                    if (user && !user.isAnonymous) {
                        session.uid = user.uid;
                        session.email = user.email;
                        session.nombre = user.displayName;
                        if (session.level === 0) session.level = 2; // L2 contactable
                        saveSession(session);
                    }
                });
            }
        });
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
       Public API
       ═══════════════════════════════════════════════════════════ */
    window.AltorraConcierge = {
        open: open,
        close: close,
        toggle: toggle,
        send: send,
        session: function () { return Object.assign({}, session); },
        // Debug
        _state: function () { return { session: session, isOpen: _isOpen }; }
    };
})();
