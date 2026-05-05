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
                    '<button class="alt-btn alt-btn--ghost alt-btn--sm" id="cncAdminSummarize" data-tooltip="Generar resumen para handover">' +
                        '<i data-lucide="file-text"></i> Resumen' +
                    '</button>' +
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
       U.13 — Conversation summarization (extractivo)
       Genera un resumen útil para handover a otro asesor:
       - Datos de identidad detectados (NER)
       - Sentiment promedio del cliente
       - Top 3 mensajes del cliente con mayor "señal" (entities + length)
       - Acciones sugeridas
       ═══════════════════════════════════════════════════════════ */
    function summarizeCurrentChat() {
        if (!_activeSessionId || !window.db) return;
        var chat = _chats.find(function (c) { return c._docId === _activeSessionId; });
        if (!chat) return;

        // Cargar todos los mensajes del chat
        window.db.collection('conciergeChats').doc(_activeSessionId)
            .collection('messages').orderBy('timestamp', 'asc').get()
            .then(function (snap) {
                var messages = [];
                snap.forEach(function (doc) { messages.push(doc.data()); });
                renderSummary(chat, messages);
            })
            .catch(function (err) {
                AP.toast('Error al generar resumen: ' + err.message, 'error');
            });
    }

    function renderSummary(chat, messages) {
        var userMsgs = messages.filter(function (m) { return m.from === 'user'; });
        var asesorMsgs = messages.filter(function (m) { return m.from === 'asesor'; });

        // Análisis con AltorraAI / AltorraNER
        var allEntities = {};
        var sentimentScores = [];
        var scored = userMsgs.map(function (m) {
            var sigs = { entityCount: 0, sentiment: 0, length: m.text.length };
            if (window.AltorraAI) {
                var s = window.AltorraAI.sentiment(m.text);
                if (s) { sigs.sentiment = s.score; sentimentScores.push(s.score); }
            }
            if (window.AltorraNER) {
                var ext = window.AltorraNER.extract(m.text);
                sigs.entityCount = ext.entities.length;
                ext.entities.forEach(function (e) {
                    if (!allEntities[e.type]) allEntities[e.type] = [];
                    if (allEntities[e.type].indexOf(e.value) === -1) {
                        allEntities[e.type].push(e.value);
                    }
                });
            }
            // Score de "importancia" = entities + magnitud sentiment + length normalizado
            var importance = sigs.entityCount * 3 + Math.abs(sigs.sentiment) * 2 + Math.min(1, sigs.length / 200);
            return { msg: m, importance: importance, sigs: sigs };
        });
        scored.sort(function (a, b) { return b.importance - a.importance; });
        var top3 = scored.slice(0, 3);

        var avgSentiment = sentimentScores.length ?
            sentimentScores.reduce(function (a, b) { return a + b; }, 0) / sentimentScores.length : 0;
        var sentimentLabel = avgSentiment > 0.2 ? 'positivo 😊' :
                             avgSentiment < -0.2 ? 'negativo 😟' : 'neutral 😐';

        // Construir HTML de summary
        var entitiesHTML = Object.keys(allEntities).length === 0
            ? '<em style="color:var(--text-tertiary);">Ninguna detectada.</em>'
            : Object.keys(allEntities).map(function (type) {
                return '<span class="kb-keyword"><strong>' + escTxt(type) + ':</strong> ' +
                    escTxt(allEntities[type].slice(0, 3).join(', ')) + '</span>';
            }).join(' ');

        var topMsgsHTML = top3.length === 0
            ? '<em>Sin mensajes del cliente todavía.</em>'
            : top3.map(function (s, i) {
                return '<div class="cnc-summary-top-msg">' +
                    '<strong>#' + (i + 1) + '</strong> "' + escTxt(s.msg.text) + '"' +
                '</div>';
            }).join('');

        var summaryHTML =
            '<div class="cnc-summary-modal-backdrop" id="cncSummaryBackdrop"></div>' +
            '<div class="cnc-summary-modal">' +
                '<div class="cnc-summary-head">' +
                    '<h3><i data-lucide="file-text"></i> Resumen para handover</h3>' +
                    '<button class="alt-btn alt-btn--ghost alt-btn--icon" id="cncSummaryClose" aria-label="Cerrar">×</button>' +
                '</div>' +
                '<div class="cnc-summary-body">' +
                    '<section>' +
                        '<h4>Cliente</h4>' +
                        '<p>' +
                            '<strong>' + escTxt(chat.userNombre || chat.userEmail || 'Cliente ' + chat._docId.slice(-6)) + '</strong>' +
                            (chat.userEmail ? '<br>📧 ' + escTxt(chat.userEmail) : '') +
                            (chat.telefono ? '<br>📲 ' + escTxt(chat.telefono) : '') +
                            (chat.sourceVehicleId ? '<br>🚗 Vehículo origen: #' + escTxt(chat.sourceVehicleId) : '') +
                        '</p>' +
                    '</section>' +
                    '<section>' +
                        '<h4>Conversación</h4>' +
                        '<p>' +
                            messages.length + ' mensajes · ' +
                            userMsgs.length + ' del cliente · ' +
                            asesorMsgs.length + ' del asesor<br>' +
                            'Sentiment promedio: <strong>' + sentimentLabel + '</strong> (' + avgSentiment.toFixed(2) + ')' +
                        '</p>' +
                    '</section>' +
                    '<section>' +
                        '<h4>Datos detectados</h4>' +
                        '<div class="kb-entry-keywords">' + entitiesHTML + '</div>' +
                    '</section>' +
                    '<section>' +
                        '<h4>Top 3 mensajes más importantes del cliente</h4>' +
                        topMsgsHTML +
                    '</section>' +
                '</div>' +
                '<div class="cnc-summary-footer">' +
                    '<button class="alt-btn alt-btn--ghost" id="cncSummaryCopy">' +
                        '<i data-lucide="copy"></i> Copiar al portapapeles' +
                    '</button>' +
                    '<button class="alt-btn alt-btn--primary" id="cncSummaryDone">Cerrar</button>' +
                '</div>' +
            '</div>';

        var wrap = document.createElement('div');
        wrap.id = 'cncSummaryWrap';
        wrap.innerHTML = summaryHTML;
        document.body.appendChild(wrap);
        if (window.AltorraIcons) window.AltorraIcons.refresh(wrap);
        else if (window.lucide) try { window.lucide.createIcons({ context: wrap }); } catch (e) {}

        // Wire close + copy
        function close() {
            var w = document.getElementById('cncSummaryWrap');
            if (w) w.remove();
        }
        document.getElementById('cncSummaryClose').addEventListener('click', close);
        document.getElementById('cncSummaryDone').addEventListener('click', close);
        document.getElementById('cncSummaryBackdrop').addEventListener('click', close);
        document.getElementById('cncSummaryCopy').addEventListener('click', function () {
            // Generar texto plano para clipboard
            var lines = [
                'RESUMEN — ' + (chat.userNombre || chat.userEmail || 'Cliente'),
                'Sessión: ' + chat._docId,
                ''
            ];
            if (chat.userEmail) lines.push('Email: ' + chat.userEmail);
            if (chat.telefono) lines.push('Teléfono: ' + chat.telefono);
            if (chat.sourceVehicleId) lines.push('Vehículo origen: #' + chat.sourceVehicleId);
            lines.push('');
            lines.push('Conversación: ' + messages.length + ' mensajes · sentiment ' + sentimentLabel);
            lines.push('');
            lines.push('Datos detectados:');
            Object.keys(allEntities).forEach(function (type) {
                lines.push('  • ' + type + ': ' + allEntities[type].join(', '));
            });
            lines.push('');
            lines.push('Top mensajes del cliente:');
            top3.forEach(function (s, i) {
                lines.push('  #' + (i + 1) + '. "' + s.msg.text + '"');
            });
            var text = lines.join('\n');
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text).then(function () {
                    AP.toast('Resumen copiado al portapapeles');
                });
            } else {
                AP.toast('Copy no soportado en este navegador', 'error');
            }
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
        if (e.target && e.target.closest && e.target.closest('#cncAdminSummarize')) {
            summarizeCurrentChat();
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
