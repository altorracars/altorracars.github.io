/**
 * ALTORRA CARS — Vehicle thread (MF2.5)
 *
 * Adds a "Hacer pregunta sobre este vehículo" button to the vehicle detail
 * page. Click opens a mini-chat modal that persists message threads in
 * Firestore mensajes/{threadId}.
 *
 * For registered users: thread keyed by userId+vehicleId (one per pair).
 * For guests: thread keyed by anonymous uid (less reliable, dies on logout).
 *
 * Admin replies in MF4.7 (Inbox view) write to the same thread.
 */
(function () {
    'use strict';
    if (window.AltorraVehicleThread) return;

    function getCurrentUser() {
        return (window.auth && window.auth.currentUser) || null;
    }

    function getVehicleInfo() {
        // Read from PRERENDERED_VEHICLE_ID + DOM
        var id = window.PRERENDERED_VEHICLE_ID
            || (new URLSearchParams(window.location.search)).get('id')
            || null;
        if (!id) return null;
        var titleEl = document.querySelector('.vehicle-title, h1');
        var title = titleEl ? titleEl.textContent.trim() : 'Vehículo';
        return { id: String(id), title: title };
    }

    function escapeHtml(s) {
        var d = document.createElement('div');
        d.textContent = s == null ? '' : String(s);
        return d.innerHTML;
    }

    function threadId(uid, vehicleId) {
        return 'thread_' + uid + '_' + vehicleId;
    }

    function ensureModal() {
        if (document.getElementById('vehicle-thread-modal')) return;
        var modal = document.createElement('div');
        modal.id = 'vehicle-thread-modal';
        modal.className = 'vt-modal-overlay';
        modal.innerHTML =
            '<div class="vt-modal">' +
                '<div class="vt-modal-head">' +
                    '<h3 id="vt-modal-title">Pregunta al asesor</h3>' +
                    '<button class="vt-close" aria-label="Cerrar">&times;</button>' +
                '</div>' +
                '<div class="vt-messages" id="vt-messages">' +
                    '<div class="vt-loading">Cargando conversación...</div>' +
                '</div>' +
                '<form class="vt-form" id="vt-form">' +
                    '<textarea id="vt-input" rows="3" placeholder="Escribe tu pregunta sobre este vehículo..." required></textarea>' +
                    '<button type="submit" class="vt-send">Enviar</button>' +
                '</form>' +
            '</div>';
        document.body.appendChild(modal);
        modal.addEventListener('click', function (e) {
            if (e.target === modal || e.target.classList.contains('vt-close')) {
                close();
            }
        });
    }

    var _state = { threadId: null, vehicleInfo: null, unsub: null };

    function open(vehicleInfo) {
        ensureModal();
        var modal = document.getElementById('vehicle-thread-modal');
        modal.classList.add('vt-open');
        _state.vehicleInfo = vehicleInfo;

        var user = getCurrentUser();
        if (!user || user.isAnonymous) {
            // Guest: prompt to register/login (we want trackable threads)
            var msgsEl = document.getElementById('vt-messages');
            msgsEl.innerHTML =
                '<div class="vt-empty">' +
                    '<p>Para preguntar sobre este vehículo y mantener un historial, <strong>inicia sesión</strong> o <strong>regístrate</strong>.</p>' +
                    '<p style="font-size:0.85rem;opacity:0.7;">También podés escribirnos directo al WhatsApp si preferís.</p>' +
                '</div>';
            document.getElementById('vt-form').style.display = 'none';
            return;
        }
        document.getElementById('vt-form').style.display = '';

        _state.threadId = threadId(user.uid, vehicleInfo.id);

        // Subscribe to messages — on first load creates the thread doc if missing
        var ref = window.db.collection('mensajes').doc(_state.threadId);
        if (_state.unsub) _state.unsub();
        _state.unsub = ref.onSnapshot(function (doc) {
            renderMessages(doc.exists ? doc.data() : null);
        }, function (err) {
            if (window.auth && !window.auth.currentUser) return;
            console.warn('[VehicleThread] listener error:', err);
        });
    }

    function close() {
        var modal = document.getElementById('vehicle-thread-modal');
        if (modal) modal.classList.remove('vt-open');
        if (_state.unsub) { _state.unsub(); _state.unsub = null; }
    }

    function renderMessages(thread) {
        var el = document.getElementById('vt-messages');
        if (!el) return;
        if (!thread || !thread.messages || !thread.messages.length) {
            el.innerHTML = '<div class="vt-empty"><p>Sin mensajes aún. ¡Escribe tu pregunta!</p></div>';
            return;
        }
        el.innerHTML = thread.messages.map(function (m) {
            var from = m.from === 'cliente' ? 'vt-msg-client' : 'vt-msg-admin';
            var when = '';
            try { when = new Date(m.at).toLocaleString('es-CO', { dateStyle: 'short', timeStyle: 'short' }); }
            catch (_) { when = ''; }
            return '<div class="vt-msg ' + from + '">' +
                '<div class="vt-msg-text">' + escapeHtml(m.text) + '</div>' +
                '<div class="vt-msg-when">' + escapeHtml(when) + '</div>' +
            '</div>';
        }).join('');
        el.scrollTop = el.scrollHeight;
    }

    function send(text) {
        if (!text || !text.trim()) return Promise.reject('empty');
        var user = getCurrentUser();
        if (!user || user.isAnonymous) return Promise.reject('not-logged-in');
        var info = _state.vehicleInfo;
        if (!info) return Promise.reject('no-vehicle');

        var msg = { from: 'cliente', text: text.trim(), at: new Date().toISOString() };
        var ref = window.db.collection('mensajes').doc(_state.threadId);

        return ref.get().then(function (doc) {
            if (doc.exists) {
                // Append message
                var data = doc.data();
                var msgs = (data.messages || []).slice();
                msgs.push(msg);
                return ref.update({
                    messages: msgs,
                    lastMessage: msg.text.slice(0, 140),
                    lastMessageAt: msg.at,
                    lastMessageFrom: 'cliente',
                    unreadByAdmin: (data.unreadByAdmin || 0) + 1
                });
            }
            // Create new thread
            return ref.set({
                userId: user.uid,
                userEmail: user.email || null,
                userName: user.displayName || null,
                vehicleId: info.id,
                vehicleTitle: info.title,
                messages: [msg],
                lastMessage: msg.text.slice(0, 140),
                lastMessageAt: msg.at,
                lastMessageFrom: 'cliente',
                unreadByAdmin: 1,
                unreadByUser: 0,
                createdAt: msg.at,
                status: 'open'
            });
        });
    }

    // Wire form submit
    document.addEventListener('submit', function (e) {
        if (e.target && e.target.id === 'vt-form') {
            e.preventDefault();
            var input = document.getElementById('vt-input');
            if (!input || !input.value.trim()) return;
            var btn = e.target.querySelector('.vt-send');
            if (btn) { btn.disabled = true; btn.textContent = 'Enviando...'; }
            send(input.value).then(function () {
                input.value = '';
                if (btn) { btn.disabled = false; btn.textContent = 'Enviar'; }
            }).catch(function (err) {
                if (btn) { btn.disabled = false; btn.textContent = 'Enviar'; }
                if (err === 'not-logged-in') {
                    if (window.notify) window.notify.error('Inicia sesión para enviar mensajes.');
                } else {
                    console.warn('[VehicleThread] send error:', err);
                    if (window.notify) window.notify.error('No pudimos enviar tu mensaje. Reintenta.');
                }
            });
        }
    });

    // Hook into the "Pregunta" button
    document.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-action="ask-vehicle"], #btnAskVehicle');
        if (!btn) return;
        e.preventDefault();
        var info = getVehicleInfo();
        if (!info) {
            if (window.notify) window.notify.error('No pudimos identificar el vehículo.');
            return;
        }
        open(info);
    });

    window.AltorraVehicleThread = { open: open, close: close };
})();
