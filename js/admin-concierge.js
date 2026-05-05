/**
 * ALTORRA CARS — Admin Concierge bandeja (Mega-Plan v4, U.10+U.11)
 * ==================================================================
 * Gestión admin de las conversaciones del Concierge unificado.
 * Lista realtime de chats activos a la izquierda, detalle estilo
 * WhatsApp a la derecha.
 *
 * U.10 — Bandeja admin Concierge (lista de conversaciones live)
 * U.11 — Chat detail admin estilo WhatsApp (typing, quick replies)
 *
 * Public API:
 *   AltorraAdminConcierge.refresh()          → recargar lista
 *   AltorraAdminConcierge.openChat(sessionId) → abrir chat detail
 */
(function () {
    'use strict';
    if (window.AltorraAdminConcierge) return;
    var AP = window.AP;
    if (!AP) return;

    var DAY_MS = 86400000;
    var _chats = [];
    var _activeSessionId = null;
    var _chatsUnsub = null;
    var _messagesUnsub = null;

    function $(id) { return document.getElementById(id); }
    function escTxt(s) {
        var d = document.createElement('div');
        d.textContent = s == null ? '' : String(s);
        return d.innerHTML;
    }

    function timeAgo(ts) {
        var t = ts;
        if (typeof ts === 'string') t = new Date(ts).getTime();
        else if (ts && typeof ts.toMillis === 'function') t = ts.toMillis();
        if (!t || isNaN(t)) return '';
        var diff = Math.floor((Date.now() - t) / 1000);
        if (diff < 5) return 'ahora';
        if (diff < 60) return 'hace ' + diff + 's';
        if (diff < 3600) return 'hace ' + Math.floor(diff / 60) + 'm';
        if (diff < 86400) return 'hace ' + Math.floor(diff / 3600) + 'h';
        return 'hace ' + Math.floor(diff / 86400) + 'd';
    }

    /* ═══════════════════════════════════════════════════════════
       LISTA DE CONVERSACIONES — listener realtime
       ═══════════════════════════════════════════════════════════ */
    function startChatsListener() {
        if (_chatsUnsub || !window.db) return;
        if (!AP.isEditorOrAbove || !AP.isEditorOrAbove()) return;

        _chatsUnsub = window.db.collection('conciergeChats')
            .orderBy('lastMessageAt', 'desc')
            .limit(50)
            .onSnapshot(function (snap) {
                _chats = [];
                snap.forEach(function (doc) {
                    _chats.push(Object.assign({ _docId: doc.id }, doc.data()));
                });
                renderChatList();
                updateNavBadge();
            }, function (err) {
                if (window.auth && !window.auth.currentUser) return;
                console.warn('[AdminConcierge] listener error:', err.message);
            });
    }

    function stopChatsListener() {
        if (_chatsUnsub) { try { _chatsUnsub(); } catch (e) {} _chatsUnsub = null; }
        if (_messagesUnsub) { try { _messagesUnsub(); } catch (e) {} _messagesUnsub = null; }
    }

    function updateNavBadge() {
        var unread = _chats.filter(function (c) { return (c.unreadByAdmin || 0) > 0; }).length;
        var badge = $('navBadgeConcierge');
        if (badge) {
            badge.textContent = unread > 0 ? unread : '';
            badge.style.display = unread > 0 ? 'inline-block' : 'none';
        }
    }

    /* ═══════════════════════════════════════════════════════════
       RENDER LISTA DE CHATS
       ═══════════════════════════════════════════════════════════ */
    function renderChatList() {
        var listEl = $('conciergeChatList');
        if (!listEl) return;
        if (_chats.length === 0) {
            listEl.innerHTML = '<div class="cnc-admin-empty">Sin conversaciones aún.</div>';
            return;
        }
        listEl.innerHTML = _chats.map(function (c) {
            var isActive = c._docId === _activeSessionId;
            var unread = c.unreadByAdmin || 0;
            var name = c.userNombre || c.userEmail || 'Cliente ' + c._docId.slice(-6);
            var initials = name.split(' ').map(function (w) { return w[0]; }).slice(0, 2).join('').toUpperCase();
            var modeIcon = c.mode === 'wa_handed_over' ? '📲' :
                           c.mode === 'live' ? '👨' : '🤖';
            return '<div class="cnc-admin-chat-item' + (isActive ? ' active' : '') + (unread > 0 ? ' has-unread' : '') +
                '" data-session="' + escTxt(c._docId) + '">' +
                '<div class="cnc-admin-avatar">' + escTxt(initials) + '</div>' +
                '<div class="cnc-admin-chat-body">' +
                    '<div class="cnc-admin-chat-head">' +
                        '<span class="cnc-admin-chat-name">' + escTxt(name) + '</span>' +
                        '<span class="cnc-admin-chat-time">' + escTxt(timeAgo(c.lastMessageAt)) + '</span>' +
                    '</div>' +
                    '<div class="cnc-admin-chat-snippet">' +
                        '<span class="cnc-admin-chat-mode">' + modeIcon + '</span>' +
                        '<span>' + escTxt((c.lastMessage || '').slice(0, 60)) + '</span>' +
                    '</div>' +
                '</div>' +
                (unread > 0 ? '<div class="cnc-admin-unread-badge">' + unread + '</div>' : '') +
            '</div>';
        }).join('');
    }

    /* ═══════════════════════════════════════════════════════════
       CHAT DETAIL — abrir conversación
       ═══════════════════════════════════════════════════════════ */
    function openChat(sessionId) {
        _activeSessionId = sessionId;
        renderChatList();

        // Marcar leído
        if (window.db) {
            window.db.collection('conciergeChats').doc(sessionId)
                .update({ unreadByAdmin: 0 }).catch(function () {});
        }

        // Cancelar listener previo
        if (_messagesUnsub) { try { _messagesUnsub(); } catch (e) {} _messagesUnsub = null; }

        var chat = _chats.find(function (c) { return c._docId === sessionId; });
        if (!chat) return;

        renderChatDetail(chat, []);

        // Suscribirse a los mensajes
        _messagesUnsub = window.db.collection('conciergeChats').doc(sessionId)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot(function (snap) {
                var messages = [];
                snap.forEach(function (doc) {
                    messages.push(Object.assign({ _id: doc.id }, doc.data()));
                });
                renderChatDetail(chat, messages);
            }, function () {});
    }

    function renderChatDetail(chat, messages) {
        var detailEl = $('conciergeChatDetail');
        if (!detailEl) return;
        var name = chat.userNombre || chat.userEmail || 'Cliente ' + chat._docId.slice(-6);
        var modeLabel = chat.mode === 'wa_handed_over' ? 'WhatsApp' :
                        chat.mode === 'live' ? 'En vivo' : 'Bot AI';

        var msgsHTML = messages.length === 0
            ? '<div class="cnc-admin-detail-empty">Sin mensajes en esta conversación.</div>'
            : messages.map(function (m) {
                var bubbleClass = m.from === 'user' ? 'cnc-detail-user' :
                                  m.from === 'asesor' ? 'cnc-detail-asesor' : 'cnc-detail-bot';
                return '<div class="cnc-detail-msg ' + bubbleClass + '">' +
                    '<div class="cnc-detail-bubble">' + escTxt(m.text) + '</div>' +
                    '<div class="cnc-detail-time">' + escTxt(timeAgo(m.timestamp)) + '</div>' +
                '</div>';
            }).join('');

        detailEl.innerHTML =
            '<div class="cnc-admin-detail-head">' +
                '<div class="cnc-admin-detail-info">' +
                    '<div class="cnc-admin-detail-name">' + escTxt(name) + '</div>' +
                    '<div class="cnc-admin-detail-meta">' +
                        '<span class="cnc-admin-detail-mode">' + escTxt(modeLabel) + '</span>' +
                        (chat.userEmail ? ' · <span>' + escTxt(chat.userEmail) + '</span>' : '') +
                        (chat.telefono ? ' · <span>' + escTxt(chat.telefono) + '</span>' : '') +
                        (chat.sourceVehicleId ? ' · <span>vehículo #' + escTxt(chat.sourceVehicleId) + '</span>' : '') +
                    '</div>' +
                '</div>' +
                '<div class="cnc-admin-detail-actions">' +
                    '<button class="alt-btn alt-btn--ghost alt-btn--sm" id="cncAdminCloseChat" data-tooltip="Cerrar chat">' +
                        '<i data-lucide="check"></i> Marcar resuelto' +
                    '</button>' +
                '</div>' +
            '</div>' +
            '<div class="cnc-admin-detail-messages" id="cncAdminMessages">' + msgsHTML + '</div>' +
            '<div class="cnc-admin-detail-quick-replies">' +
                '<button class="cnc-quick-reply" data-text="Hola, soy [tu nombre], asesor de Altorra. ¿En qué te puedo ayudar?">👋 Saludo</button>' +
                '<button class="cnc-quick-reply" data-text="Te envío la información del vehículo que te interesa por aquí mismo.">📋 Info vehículo</button>' +
                '<button class="cnc-quick-reply" data-text="¿Te gustaría agendar una visita para ver el carro? Tenemos disponibilidad esta semana.">📅 Agendar</button>' +
                '<button class="cnc-quick-reply" data-text="Listo, te paso a WhatsApp para continuar la conversación.">📲 A WhatsApp</button>' +
            '</div>' +
            '<div class="cnc-admin-detail-input-wrap">' +
                '<input type="text" class="form-input cnc-admin-detail-input" id="cncAdminReply" placeholder="Responder como asesor…" autocomplete="off">' +
                '<button class="alt-btn alt-btn--primary" id="cncAdminSend">Enviar</button>' +
            '</div>';

        // Auto-scroll al final
        var msgsContainer = $('cncAdminMessages');
        if (msgsContainer) msgsContainer.scrollTop = msgsContainer.scrollHeight;

        if (window.AltorraIcons) window.AltorraIcons.refresh(detailEl);
        else if (window.lucide) try { window.lucide.createIcons({ context: detailEl }); } catch (e) {}
    }

    function sendAsesorMessage() {
        var input = $('cncAdminReply');
        if (!input || !_activeSessionId || !window.db) return;
        var text = input.value.trim();
        if (!text) return;
        input.value = '';
        var msg = {
            from: 'asesor',
            text: text,
            timestamp: new Date().toISOString(),
            asesorUid: window.auth.currentUser.uid,
            asesorNombre: (AP.currentUserProfile && AP.currentUserProfile.nombre) || window.auth.currentUser.email
        };
        window.db.collection('conciergeChats').doc(_activeSessionId)
            .collection('messages').add(msg)
            .catch(function (err) { AP.toast('Error al enviar: ' + err.message, 'error'); });
        // Update parent doc lastMessage + unread cliente
        window.db.collection('conciergeChats').doc(_activeSessionId).set({
            lastMessage: text.slice(0, 80),
            lastMessageAt: new Date().toISOString(),
            unreadByUser: window.firebase && window.firebase.firestore ?
                window.firebase.firestore.FieldValue.increment(1) : 1
        }, { merge: true }).catch(function () {});
    }

    function closeChat() {
        if (!_activeSessionId || !window.db) return;
        if (!confirm('¿Marcar esta conversación como resuelta?')) return;
        window.db.collection('conciergeChats').doc(_activeSessionId).set({
            status: 'resolved',
            resolvedAt: new Date().toISOString(),
            resolvedBy: window.auth.currentUser.uid
        }, { merge: true }).then(function () {
            AP.toast('Conversación marcada como resuelta');
        }).catch(function (err) {
            AP.toast('Error: ' + err.message, 'error');
        });
    }

    /* ═══════════════════════════════════════════════════════════
       EVENT WIRING
       ═══════════════════════════════════════════════════════════ */
    document.addEventListener('click', function (e) {
        var item = e.target.closest('[data-session]');
        if (item) {
            openChat(item.getAttribute('data-session'));
            return;
        }
        var quickReply = e.target.closest('.cnc-quick-reply');
        if (quickReply) {
            var input = $('cncAdminReply');
            if (input) {
                input.value = quickReply.getAttribute('data-text');
                input.focus();
            }
            return;
        }
        if (e.target && e.target.closest && e.target.closest('#cncAdminSend')) {
            sendAsesorMessage();
            return;
        }
        if (e.target && e.target.closest && e.target.closest('#cncAdminCloseChat')) {
            closeChat();
            return;
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.target && e.target.id === 'cncAdminReply' && e.key === 'Enter') {
            e.preventDefault();
            sendAsesorMessage();
        }
    });

    /* ═══════════════════════════════════════════════════════════
       INIT — start listener cuando admin entra a la sección
       ═══════════════════════════════════════════════════════════ */
    if (window.AltorraSections && window.AltorraSections.onChange) {
        window.AltorraSections.onChange(function (section) {
            if (section === 'concierge') {
                startChatsListener();
            }
        });
    }

    // Auto-arranque: para que el badge de unread funcione globalmente
    var attempts = 0;
    var iv = setInterval(function () {
        attempts++;
        if (window.auth && window.auth.currentUser && AP.isEditorOrAbove && AP.isEditorOrAbove()) {
            startChatsListener();
            clearInterval(iv);
        } else if (attempts > 60) clearInterval(iv);
    }, 1000);

    /* ═══════════════════════════════════════════════════════════
       Public API
       ═══════════════════════════════════════════════════════════ */
    window.AltorraAdminConcierge = {
        refresh: startChatsListener,
        openChat: openChat,
        stop: stopChatsListener
    };
})();
