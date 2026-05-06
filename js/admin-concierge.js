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
    // Filtro activo del listado: 'active' (default) | 'pinned' | 'archived' | 'deleted'
    var _activeFilter = 'active';

    function setFilter(f) {
        _activeFilter = f;
        renderChatList();
        renderFilterBar();
    }

    function startChatsListener() {
        if (_chatsUnsub || !window.db) return;
        if (!AP.isEditorOrAbove || !AP.isEditorOrAbove()) return;

        _chatsUnsub = window.db.collection('conciergeChats')
            .orderBy('lastMessageAt', 'desc')
            .limit(100)
            .onSnapshot(function (snap) {
                _chats = [];
                snap.forEach(function (doc) {
                    _chats.push(Object.assign({ _docId: doc.id }, doc.data()));
                });
                renderChatList();
                renderFilterBar();
                updateNavBadge();
            }, function (err) {
                if (window.auth && !window.auth.currentUser) return;
                console.warn('[AdminConcierge] listener error:', err.message);
            });
    }

    /**
     * Aplica el filtro activo y devuelve la lista de chats visibles.
     * Sort: pinned primero, luego por lastMessageAt desc.
     */
    function getVisibleChats() {
        var filtered = _chats.filter(function (c) {
            if (_activeFilter === 'pinned') return c.isPinned && !c.isDeleted;
            if (_activeFilter === 'archived') return c.isArchived && !c.isDeleted;
            if (_activeFilter === 'deleted') return c.isDeleted;
            // default 'active': no archived, no deleted
            return !c.isArchived && !c.isDeleted;
        });
        filtered.sort(function (a, b) {
            // Pin pinned al top dentro del bucket
            if (a.isPinned && !b.isPinned) return -1;
            if (!a.isPinned && b.isPinned) return 1;
            // Sort por lastMessageAt desc (Firestore ya lo entrega así, esto es safety)
            var at = a.lastMessageAt ? new Date(a.lastMessageAt).getTime() : 0;
            var bt = b.lastMessageAt ? new Date(b.lastMessageAt).getTime() : 0;
            return bt - at;
        });
        return filtered;
    }

    /**
     * Render del filter bar (chips) arriba de la lista.
     * Counts dinámicos por bucket para feedback visual.
     */
    function renderFilterBar() {
        var bar = $('conciergeFilterBar');
        if (!bar) return;
        var counts = {
            active: 0,
            pinned: 0,
            archived: 0,
            deleted: 0
        };
        _chats.forEach(function (c) {
            if (c.isDeleted) counts.deleted++;
            else if (c.isArchived) counts.archived++;
            else counts.active++;
            if (c.isPinned && !c.isDeleted) counts.pinned++;
        });
        var isSuper = AP.isSuperAdmin && AP.isSuperAdmin();
        var chips = [
            { f: 'active',   label: 'Activos',    count: counts.active,    show: true },
            { f: 'pinned',   label: 'Fijados',    count: counts.pinned,    show: true },
            { f: 'archived', label: 'Archivados', count: counts.archived,  show: true },
            { f: 'deleted',  label: 'Eliminados', count: counts.deleted,   show: isSuper }
        ];
        bar.innerHTML = chips.filter(function (c) { return c.show; }).map(function (c) {
            return '<button class="cnc-admin-filter-chip' +
                (_activeFilter === c.f ? ' is-active' : '') +
                '" data-filter="' + c.f + '">' +
                escTxt(c.label) +
                (c.count > 0 ? ' <span class="cnc-admin-filter-count">' + c.count + '</span>' : '') +
            '</button>';
        }).join('');
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
        var visible = getVisibleChats();
        if (visible.length === 0) {
            var emptyMsg = _activeFilter === 'active'   ? 'Sin conversaciones activas.' :
                           _activeFilter === 'pinned'   ? 'No hay chats fijados.' :
                           _activeFilter === 'archived' ? 'Sin chats archivados.' :
                                                          'Sin chats eliminados.';
            listEl.innerHTML = '<div class="cnc-admin-empty">' + emptyMsg + '</div>';
            return;
        }
        listEl.innerHTML = visible.map(function (c) {
            var isActive = c._docId === _activeSessionId;
            var unread = (c.unreadByAdmin || 0) || (c.forceUnreadByAdmin ? 1 : 0);
            var name = c.userNombre || c.userEmail || 'Cliente ' + c._docId.slice(-6);
            var initials = name.split(' ').map(function (w) { return w[0]; }).slice(0, 2).join('').toUpperCase();
            var modeIcon = c.mode === 'wa_handed_over' ? '📲' :
                           c.mode === 'live' ? '👨' : '🤖';
            // Badges de estado
            var stateBadges = '';
            if (c.isPinned) stateBadges += '<span class="cnc-admin-state-badge cnc-pin" title="Fijado"><i data-lucide="pin"></i></span>';
            if (c.isArchived) stateBadges += '<span class="cnc-admin-state-badge cnc-arch" title="Archivado"><i data-lucide="archive"></i></span>';
            if (c.isDeleted) stateBadges += '<span class="cnc-admin-state-badge cnc-del" title="Eliminado"><i data-lucide="trash-2"></i></span>';

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
                    (stateBadges ? '<div class="cnc-admin-chat-states">' + stateBadges + '</div>' : '') +
                '</div>' +
                (unread > 0 ? '<div class="cnc-admin-unread-badge">' + unread + '</div>' : '') +
                // Menú contextual con acciones (siempre presente, abierto on hover/click)
                '<button class="cnc-admin-chat-more" data-chat-action="menu" data-session="' + escTxt(c._docId) + '" aria-label="Acciones">' +
                    '<i data-lucide="more-vertical"></i>' +
                '</button>' +
            '</div>';
        }).join('');
        if (window.AltorraIcons && window.AltorraIcons.refresh) {
            window.AltorraIcons.refresh(listEl);
        }
    }

    /* ═══════════════════════════════════════════════════════════
       ACCIONES POR CHAT — pin, archive, mark unread, delete
       ═══════════════════════════════════════════════════════════ */
    function togglePin(sessionId) {
        var chat = _chats.find(function (c) { return c._docId === sessionId; });
        if (!chat) return;
        var newVal = !chat.isPinned;
        window.db.collection('conciergeChats').doc(sessionId).set({
            isPinned: newVal,
            pinnedAt: newVal ? new Date().toISOString() : null
        }, { merge: true }).then(function () {
            if (AP.toast) AP.toast(newVal ? 'Chat fijado' : 'Chat desfijado', 'success');
        }).catch(function (err) {
            if (AP.toast) AP.toast('No se pudo actualizar: ' + err.message, 'error');
        });
    }

    function toggleArchive(sessionId) {
        var chat = _chats.find(function (c) { return c._docId === sessionId; });
        if (!chat) return;
        var newVal = !chat.isArchived;
        var uid = window.auth && window.auth.currentUser ? window.auth.currentUser.uid : null;
        window.db.collection('conciergeChats').doc(sessionId).set({
            isArchived: newVal,
            archivedAt: newVal ? new Date().toISOString() : null,
            archivedBy: newVal ? uid : null
        }, { merge: true }).then(function () {
            if (AP.toast) AP.toast(newVal ? 'Chat archivado' : 'Chat desarchivado', 'success');
            // Si el chat archivado era el activo, cerrar detail
            if (newVal && _activeSessionId === sessionId) {
                _activeSessionId = null;
                renderChatDetail(null, []);
            }
        }).catch(function (err) {
            if (AP.toast) AP.toast('No se pudo actualizar: ' + err.message, 'error');
        });
    }

    function markUnread(sessionId) {
        window.db.collection('conciergeChats').doc(sessionId).set({
            forceUnreadByAdmin: true,
            unreadByAdmin: 1
        }, { merge: true }).then(function () {
            if (AP.toast) AP.toast('Marcado como no leído', 'success');
        }).catch(function (err) {
            if (AP.toast) AP.toast('No se pudo actualizar: ' + err.message, 'error');
        });
    }

    function softDelete(sessionId) {
        if (!confirm('¿Eliminar este chat? Quedará oculto pero se puede recuperar desde el filtro "Eliminados" (solo super_admin).')) return;
        var uid = window.auth && window.auth.currentUser ? window.auth.currentUser.uid : null;
        window.db.collection('conciergeChats').doc(sessionId).set({
            isDeleted: true,
            deletedAt: new Date().toISOString(),
            deletedBy: uid
        }, { merge: true }).then(function () {
            if (AP.toast) AP.toast('Chat eliminado', 'success');
            if (_activeSessionId === sessionId) {
                _activeSessionId = null;
                renderChatDetail(null, []);
            }
        }).catch(function (err) {
            if (AP.toast) AP.toast('No se pudo eliminar: ' + err.message, 'error');
        });
    }

    function restoreDeleted(sessionId) {
        window.db.collection('conciergeChats').doc(sessionId).set({
            isDeleted: false,
            deletedAt: null,
            deletedBy: null
        }, { merge: true }).then(function () {
            if (AP.toast) AP.toast('Chat restaurado', 'success');
        }).catch(function (err) {
            if (AP.toast) AP.toast('No se pudo restaurar: ' + err.message, 'error');
        });
    }

    /**
     * Render del menú contextual del chat (3 puntos verticales).
     * Posicionado absolute relativo al item.
     */
    function showChatMenu(sessionId, anchorEl) {
        // Cerrar cualquier menú abierto previamente
        var existing = document.querySelector('.cnc-admin-chat-menu');
        if (existing) existing.remove();

        var chat = _chats.find(function (c) { return c._docId === sessionId; });
        if (!chat) return;
        var isSuper = AP.isSuperAdmin && AP.isSuperAdmin();

        var items = [
            { action: 'pin',     label: chat.isPinned ? 'Quitar fijación' : 'Fijar al top', icon: 'pin' },
            { action: 'archive', label: chat.isArchived ? 'Desarchivar' : 'Archivar',       icon: 'archive' },
            { action: 'unread',  label: 'Marcar como no leído',                              icon: 'mail' }
        ];
        if (chat.isDeleted) {
            items.push({ action: 'restore', label: 'Restaurar', icon: 'rotate-ccw' });
        } else {
            items.push({ action: 'delete', label: 'Eliminar', icon: 'trash-2', danger: true });
        }

        var menu = document.createElement('div');
        menu.className = 'cnc-admin-chat-menu';
        menu.innerHTML = items.map(function (it) {
            return '<button class="cnc-admin-menu-item' + (it.danger ? ' is-danger' : '') +
                '" data-chat-menu-action="' + it.action + '" data-session="' + escTxt(sessionId) + '">' +
                '<i data-lucide="' + it.icon + '"></i>' +
                '<span>' + escTxt(it.label) + '</span>' +
            '</button>';
        }).join('');

        // Posicionamiento relativo al botón
        var rect = anchorEl.getBoundingClientRect();
        menu.style.position = 'fixed';
        menu.style.top = (rect.bottom + 4) + 'px';
        menu.style.left = Math.max(8, rect.right - 180) + 'px';
        document.body.appendChild(menu);
        if (window.AltorraIcons && window.AltorraIcons.refresh) {
            window.AltorraIcons.refresh(menu);
        }

        // Cerrar al hacer click fuera
        function onDocClick(ev) {
            if (!menu.contains(ev.target) && ev.target !== anchorEl) {
                menu.remove();
                document.removeEventListener('click', onDocClick, true);
            }
        }
        // En el siguiente tick para no detectar el click que abrió el menú
        setTimeout(function () {
            document.addEventListener('click', onDocClick, true);
        }, 0);

        // Wire menu actions
        menu.addEventListener('click', function (ev) {
            var btn = ev.target.closest('[data-chat-menu-action]');
            if (!btn) return;
            ev.stopPropagation();
            var action = btn.getAttribute('data-chat-menu-action');
            var sid = btn.getAttribute('data-session');
            menu.remove();
            document.removeEventListener('click', onDocClick, true);
            if (action === 'pin')     togglePin(sid);
            else if (action === 'archive') toggleArchive(sid);
            else if (action === 'unread')  markUnread(sid);
            else if (action === 'delete')  softDelete(sid);
            else if (action === 'restore') restoreDeleted(sid);
        });
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
                .update({ unreadByAdmin: 0, forceUnreadByAdmin: false }).catch(function () {});
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

    /* ═══════════════════════════════════════════════════════════
       U.12 — Smart Suggestions para asesor
       Genera 3 respuestas sugeridas basadas en último mensaje del
       cliente + sentiment + entities + KB + contexto del chat.
       Patrón Gmail Smart Reply sin LLM (heurísticas + templates).
       ═══════════════════════════════════════════════════════════ */
    function generateSmartSuggestions(chat, messages) {
        // Encontrar último mensaje del cliente
        var lastUserMsg = null;
        for (var i = messages.length - 1; i >= 0; i--) {
            if (messages[i].from === 'user') { lastUserMsg = messages[i]; break; }
        }
        if (!lastUserMsg) return [];

        var text = lastUserMsg.text || '';
        var lower = text.toLowerCase();
        var asesorName = (AP.currentUserProfile && AP.currentUserProfile.nombre) || 'tu asesor';
        var firstName = (chat.userNombre || '').split(' ')[0] || '';
        var greeting = firstName ? 'Hola ' + firstName + ', ' : 'Hola, ';

        // Análisis AI
        var sentiment = window.AltorraAI ? window.AltorraAI.sentiment(text) : null;
        var ner = window.AltorraNER ? window.AltorraNER.extract(text) : { summary: {} };
        var summary = ner.summary || {};

        var suggestions = [];

        // 1. Si sentiment muy negativo → disculpa + ofrecer llamada
        if (sentiment && sentiment.label === 'negative' && sentiment.score < -0.4) {
            suggestions.push({
                text: greeting + 'lamento mucho lo que ha pasado. Soy ' + asesorName +
                      ' y voy a ayudarte personalmente. ¿Te puedo llamar ahora para resolverlo?',
                tag: '🛟 Recuperar',
                priority: 100
            });
        }

        // 2. Si pregunta por precio / cotización
        if (/precio|cuanto|cuesta|cotizaci|valor/i.test(text)) {
            var precioBit = summary.precio ? ' por aproximadamente $' + Math.round(summary.precio / 1000000) + 'M' : '';
            var marcaBit = summary.marca ? ' del ' + summary.marca : '';
            suggestions.push({
                text: greeting + 'te preparo la cotización' + marcaBit + precioBit +
                      ' con todas las condiciones (financiación, peritaje, garantía). ¿Tienes una hora para que te la presente?',
                tag: '💵 Cotización',
                priority: 90
            });
        }

        // 3. Si menciona fecha o "agendar/cita/visita/ver"
        if (/agendar|cita|visita|ver el|conocer el|cuando puedo/i.test(text) || summary.fecha) {
            var fechaBit = summary.fecha ? ' el ' + summary.fecha : ' esta semana';
            suggestions.push({
                text: greeting + '¡con gusto te agendo una cita' + fechaBit +
                      '! ¿Qué horario te queda mejor: mañana, tarde o final del día?',
                tag: '📅 Agendar',
                priority: 88
            });
        }

        // 4. Si menciona marca/modelo/año específico
        if (summary.marca || summary.modelo) {
            var bits = [];
            if (summary.marca) bits.push(summary.marca);
            if (summary.modelo) bits.push(summary.modelo);
            if (summary.year) bits.push(summary.year);
            suggestions.push({
                text: greeting + 'te paso ahora mismo todo el detalle del ' + bits.join(' ') +
                      ' (fotos, kilometraje, peritaje y precio final). ¿Te interesa pasar a verlo?',
                tag: '🚗 Info vehículo',
                priority: 80
            });
        }

        // 5. Si menciona financiación
        if (/financ|cuota|pagar|crédito|credito/i.test(text)) {
            suggestions.push({
                text: greeting + 'tenemos planes de financiación con cuota inicial desde 30%. ' +
                      'Cuéntame: ¿cuál es tu cuota inicial disponible y a qué plazo te gustaría pagarlo?',
                tag: '💳 Financiación',
                priority: 78
            });
        }

        // 6. Si NER detectó ciudad fuera de Cartagena
        if (summary.ciudad && summary.ciudad.toLowerCase().indexOf('cartagena') === -1) {
            suggestions.push({
                text: greeting + 'estamos en Cartagena pero podemos coordinar el envío del vehículo a ' +
                      summary.ciudad + '. ¿Te gustaría que te explique los pasos y costos?',
                tag: '🚚 Envío',
                priority: 70
            });
        }

        // 7. Knowledge Base — si hay match, sugerir respuesta del KB
        if (window.AltorraKB && window.AltorraKB.findBest) {
            var kb = window.AltorraKB.findBest(text);
            if (kb && kb.answer) {
                suggestions.push({
                    text: kb.answer,
                    tag: '📖 KB',
                    priority: 65
                });
            }
        }

        // 8. Fallback genérico siempre presente
        suggestions.push({
            text: greeting + 'soy ' + asesorName + ' de Altorra Cars. Cuéntame un poco más sobre lo que estás buscando y te ayudo en seguida.',
            tag: '👋 Saludo',
            priority: 30
        });

        // Sort por prioridad y limitar a 3
        suggestions.sort(function (a, b) { return b.priority - a.priority; });
        // Dedup por texto similar
        var seen = {};
        var unique = [];
        suggestions.forEach(function (s) {
            var key = s.text.slice(0, 40);
            if (!seen[key]) { seen[key] = true; unique.push(s); }
        });
        return unique.slice(0, 3);
    }

    function renderSmartSuggestions(chat, messages) {
        var container = $('cncSmartSuggestions');
        if (!container) return;
        var sugs = generateSmartSuggestions(chat, messages);
        if (sugs.length === 0) {
            container.style.display = 'none';
            container.innerHTML = '';
            return;
        }
        container.style.display = '';
        container.innerHTML =
            '<div class="cnc-smart-head">' +
                '<i data-lucide="sparkles"></i>' +
                '<span>Sugerencias inteligentes</span>' +
            '</div>' +
            '<div class="cnc-smart-list">' +
                sugs.map(function (s) {
                    return '<button class="cnc-smart-suggestion" data-suggestion="' + escTxt(s.text) + '">' +
                        '<span class="cnc-smart-tag">' + escTxt(s.tag) + '</span>' +
                        '<span class="cnc-smart-text">' + escTxt(s.text.slice(0, 120)) + (s.text.length > 120 ? '…' : '') + '</span>' +
                    '</button>';
                }).join('') +
            '</div>';
        if (window.AltorraIcons) window.AltorraIcons.refresh(container);
        else if (window.lucide) try { window.lucide.createIcons({ context: container }); } catch (e) {}
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
            '<div class="cnc-smart-suggestions" id="cncSmartSuggestions" style="display:none;"></div>' +
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

        // U.12 — generar smart suggestions basadas en el último mensaje
        renderSmartSuggestions(chat, messages);
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
            asesorNombre: (AP.currentUserProfile && AP.currentUserProfile.nombre) || window.auth.currentUser.email,
            asesorPhotoURL: (AP.currentUserProfile && AP.currentUserProfile.photoURL) || null
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
        // Filter chip click (Activos / Fijados / Archivados / Eliminados)
        var chip = e.target.closest('[data-filter]');
        if (chip && chip.parentElement && chip.parentElement.id === 'conciergeFilterBar') {
            setFilter(chip.getAttribute('data-filter'));
            return;
        }
        // Botón "..." de acciones por chat — abre menú contextual
        var moreBtn = e.target.closest('[data-chat-action="menu"]');
        if (moreBtn) {
            e.stopPropagation();
            showChatMenu(moreBtn.getAttribute('data-session'), moreBtn);
            return;
        }
        // Click en menu item (capturado por el listener interno del menú)
        if (e.target.closest('[data-chat-menu-action]')) return;

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
        // U.12 — click en smart suggestion pre-llena el input
        var smartSug = e.target.closest('.cnc-smart-suggestion');
        if (smartSug) {
            var input2 = $('cncAdminReply');
            if (input2) {
                input2.value = smartSug.getAttribute('data-suggestion');
                input2.focus();
                // Mover cursor al final
                input2.setSelectionRange(input2.value.length, input2.value.length);
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
        // U.15 — Cleanup botón
        if (e.target && e.target.closest && e.target.closest('#cncCleanupOldBtn')) {
            cleanupOldChats().catch(function () {});
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
       U.15 — Cleanup de chats viejos
       Borra chats con status='resolved' y lastMessageAt > 14 días.
       Solo super_admin. Borra el doc + toda la subcolección messages.
       ═══════════════════════════════════════════════════════════ */
    function cleanupOldChats() {
        if (!AP.isSuperAdmin || !AP.isSuperAdmin()) {
            AP.toast('Solo super_admin puede limpiar chats', 'error');
            return Promise.reject('not-allowed');
        }
        if (!window.db) return Promise.reject('no-db');
        var cutoff = new Date(Date.now() - 14 * 86400000).toISOString();

        return window.db.collection('conciergeChats')
            .where('status', '==', 'resolved')
            .where('lastMessageAt', '<', cutoff)
            .get()
            .then(function (snap) {
                if (snap.empty) {
                    AP.toast('No hay chats antiguos para limpiar.');
                    return 0;
                }
                if (!confirm('Vas a eliminar ' + snap.size + ' chat' + (snap.size !== 1 ? 's' : '') +
                    ' resueltos hace 14+ días. Esta acción no se puede deshacer. ¿Continuar?')) {
                    return 0;
                }
                // Para cada chat, borrar subcolección messages primero (Firestore no
                // tiene cascade). Por simplicidad, hacemos best-effort en serie.
                var promises = [];
                snap.forEach(function (doc) {
                    promises.push(
                        doc.ref.collection('messages').get().then(function (msgsSnap) {
                            var batch = window.db.batch();
                            msgsSnap.forEach(function (m) { batch.delete(m.ref); });
                            batch.delete(doc.ref);
                            return batch.commit();
                        })
                    );
                });
                return Promise.all(promises).then(function () {
                    AP.toast(snap.size + ' chat' + (snap.size !== 1 ? 's' : '') + ' eliminado' + (snap.size !== 1 ? 's' : ''));
                    if (window.AltorraEventBus) {
                        window.AltorraEventBus.emit('concierge.cleanup', {
                            count: snap.size,
                            cutoffDays: 14
                        }, { persist: true });
                    }
                    return snap.size;
                });
            });
    }

    /* ═══════════════════════════════════════════════════════════
       Public API
       ═══════════════════════════════════════════════════════════ */
    window.AltorraAdminConcierge = {
        refresh: startChatsListener,
        openChat: openChat,
        stop: stopChatsListener,
        cleanupOldChats: cleanupOldChats // U.15
    };
})();
