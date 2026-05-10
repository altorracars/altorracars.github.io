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
    // §57.ter — cache de los mensajes del chat actualmente abierto.
    // Se actualiza desde el listener _messagesUnsub. Se usa para re-renderizar
    // el detail panel cuando _chatsUnsub detecta cambios del parent
    // (status, mode, claimedBy, etc.) sin perder los mensajes que ya
    // teníamos visibles.
    var _activeMessages = [];

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
       §75 Sprint S3 — Typing Indicators bidireccionales (admin)
       ───────────────────────────────────────────────────────────
       Asesor: setea /typing/{sid}/asesor_<uid> con throttle 1s al
                escribir en el textarea del Hub. Auto-clear 3s.
                Listener de cliente: /typing/{sid}/user → muestra
                "El cliente está escribiendo..." en el detail panel.

       Cleanup: listener PER chat activo. Cancelar al cambiar de chat
                (openChat) y al salir de sec-concierge (cleanup hook).
                _chatsUnsub global SIEMPRE activo (§57.7) — el listener
                de typing es complementario y específico al chat activo.
       ═══════════════════════════════════════════════════════════ */
    var _adminTypingThrottleActive = false;
    var _adminTypingClearTimeout = null;
    var _adminTypingListenerUnsub = null;
    var _adminClientTypingActive = false;
    var _adminTypingDisconnectRef = null;
    var _adminTypingDelegationBound = false;
    var ADMIN_TYPING_THROTTLE_MS = 1000;
    var ADMIN_TYPING_AUTO_CLEAR_MS = 3000;
    var ADMIN_TYPING_STALE_MS = 5000;

    function setAdminTyping(isTyping) {
        if (!window.rtdb || !_activeSessionId) return;
        if (!window.auth || !window.auth.currentUser) return;
        var uid = window.auth.currentUser.uid;
        var name = (AP.currentUserProfile && AP.currentUserProfile.nombre)
            || window.auth.currentUser.email || 'Asesor';
        var photoURL = (AP.currentUserProfile && AP.currentUserProfile.photoURL) || null;
        var ref;
        try {
            ref = window.rtdb.ref('/typing/' + _activeSessionId + '/asesor_' + uid);
        } catch (e) { return; }
        var payload = { name: name, photoURL: photoURL, typing: !!isTyping, ts: Date.now() };
        ref.set(payload).catch(function () {});
        if (isTyping) {
            try {
                if (!_adminTypingDisconnectRef) {
                    _adminTypingDisconnectRef = ref;
                    ref.onDisconnect().remove().catch(function () {});
                }
            } catch (e) {}
        }
    }

    function onAdminComposerInput() {
        // Throttle 1s + auto-clear 3s, mismo patrón del cliente.
        if (_adminTypingThrottleActive) {
            if (_adminTypingClearTimeout) clearTimeout(_adminTypingClearTimeout);
            _adminTypingClearTimeout = setTimeout(function () {
                setAdminTyping(false);
            }, ADMIN_TYPING_AUTO_CLEAR_MS);
            return;
        }
        _adminTypingThrottleActive = true;
        setTimeout(function () { _adminTypingThrottleActive = false; }, ADMIN_TYPING_THROTTLE_MS);
        setAdminTyping(true);
        if (_adminTypingClearTimeout) clearTimeout(_adminTypingClearTimeout);
        _adminTypingClearTimeout = setTimeout(function () {
            setAdminTyping(false);
        }, ADMIN_TYPING_AUTO_CLEAR_MS);
    }

    function bindAdminTypingDelegation() {
        // §17.4 — el textarea cncAdminReply se re-renderiza en cada
        // renderChatDetail. Event delegation en document evita rebind
        // en cada render. Idempotente con flag.
        if (_adminTypingDelegationBound) return;
        _adminTypingDelegationBound = true;
        document.addEventListener('input', function (e) {
            if (!e.target || e.target.id !== 'cncAdminReply') return;
            try { onAdminComposerInput(); } catch (err) {}
        });
    }

    function startAdminTypingListener(sessionId) {
        if (!window.rtdb || !sessionId) return;
        // Cancelar listener anterior si existe (cambio de chat activo)
        if (_adminTypingListenerUnsub) {
            try { _adminTypingListenerUnsub(); } catch (e) {}
            _adminTypingListenerUnsub = null;
        }
        var ref;
        try {
            ref = window.rtdb.ref('/typing/' + sessionId + '/user');
        } catch (e) { return; }
        var handler = ref.on('value', function (snap) {
            var data = snap.val();
            var isTyping = !!(data && data.typing
                && (Date.now() - (data.ts || 0)) < ADMIN_TYPING_STALE_MS);
            // Solo procesar si este chat sigue siendo el activo
            if (sessionId !== _activeSessionId) {
                hideAdminTypingIndicator();
                return;
            }
            _adminClientTypingActive = isTyping;
            if (isTyping) {
                showAdminTypingIndicator();
            } else {
                hideAdminTypingIndicator();
            }
        }, function (err) {
            if (err && err.code === 'PERMISSION_DENIED') {
                console.info('[AdminConcierge] §75 typing listener permission_denied — deploy database rules pendiente.');
            }
        });
        _adminTypingListenerUnsub = function () {
            try { ref.off('value', handler); } catch (e) {}
        };
    }

    function stopAdminTypingListener() {
        if (_adminTypingListenerUnsub) {
            try { _adminTypingListenerUnsub(); } catch (e) {}
            _adminTypingListenerUnsub = null;
        }
        // Setear typing:false propio (best-effort) + cancel onDisconnect
        if (_activeSessionId && window.rtdb && window.auth && window.auth.currentUser) {
            try {
                var uid = window.auth.currentUser.uid;
                var ref = window.rtdb.ref('/typing/' + _activeSessionId + '/asesor_' + uid);
                ref.remove().catch(function () {});
                if (_adminTypingDisconnectRef) {
                    _adminTypingDisconnectRef.onDisconnect().cancel().catch(function () {});
                    _adminTypingDisconnectRef = null;
                }
            } catch (e) {}
        }
        if (_adminTypingClearTimeout) { clearTimeout(_adminTypingClearTimeout); _adminTypingClearTimeout = null; }
        _adminTypingThrottleActive = false;
        _adminClientTypingActive = false;
        hideAdminTypingIndicator();
    }

    function showAdminTypingIndicator() {
        var msgsBox = document.getElementById('cncAdminMessages');
        if (!msgsBox) return;
        if (document.getElementById('cncAdminTypingIndicator')) return;
        var html = '<div id="cncAdminTypingIndicator" class="cnc-admin-typing-indicator">' +
            '<span class="cnc-admin-typing-dots"><span></span><span></span><span></span></span>' +
            '<span class="cnc-admin-typing-label">El cliente está escribiendo</span>' +
        '</div>';
        msgsBox.insertAdjacentHTML('beforeend', html);
        // Auto-scroll si admin está cerca del fondo
        var nearBottom = (msgsBox.scrollHeight - msgsBox.scrollTop - msgsBox.clientHeight) < 120;
        if (nearBottom) msgsBox.scrollTop = msgsBox.scrollHeight;
    }

    function hideAdminTypingIndicator() {
        var el = document.getElementById('cncAdminTypingIndicator');
        if (el) el.remove();
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

        // §57.7 — CRÍTICO: solo cancelar _messagesUnsub al cambiar de sección.
        // El listener _chatsUnsub debe quedar SIEMPRE activo cuando admin
        // logueado (badge global del Hub + chats nuevos en tiempo real).
        // ANTES (§34): cancelaba ambos → si cliente escalaba mientras admin
        // estaba en otra sección, al volver el listener se re-iniciaba pero
        // había timing/race que hacía perder eventos. Solo refresh resolvía.
        // §75 Sprint S3 — bind delegation del input listener apenas
        // se inicializa el listener global (idempotente con flag).
        try { bindAdminTypingDelegation(); } catch (e) {}

        if (window.AltorraSectionCleanup && !startChatsListener._cleanupRegistered) {
            startChatsListener._cleanupRegistered = true;
            window.AltorraSectionCleanup.register('concierge', function() {
                // §57.7 — solo _messagesUnsub. _chatsUnsub queda activo.
                if (_messagesUnsub) { try { _messagesUnsub(); } catch (e) {} _messagesUnsub = null; }
                // §75 Sprint S3 — typing listener PER chat → cancelar al salir
                // de sec-concierge para no consumir bandwidth innecesario.
                try { stopAdminTypingListener(); } catch (e) {}
            });
        }

        console.log('[AdminConcierge] §57.7 startChatsListener init — global listener (no auto-cancel on section change)');
        _chatsUnsub = window.db.collection('conciergeChats')
            .orderBy('lastMessageAt', 'desc')
            .limit(100)
            .onSnapshot(function (snap) {
                // §57.6 diagnóstico realtime: log detallado de cada snapshot
                var changes = snap.docChanges();
                console.log('[AdminConcierge] §57.6 snapshot — docs:', snap.size, 'changes:', changes.length);
                changes.forEach(function (chg) {
                    console.log('[AdminConcierge] §57.6 change type:', chg.type, 'docId:', chg.doc.id, 'mode:', chg.doc.data().mode, 'status:', chg.doc.data().status);
                });
                // BUG #3 FIX — Detectar removed events ANTES de reconstruir _chats.
                // Si el chat actualmente abierto en el panel derecho fue eliminado
                // por OTRO admin (en otra tab/dispositivo), tenemos que limpiar
                // la UI inmediatamente para evitar "ghost UI" (panel mostrando
                // un chat que ya no existe en Firestore).
                snap.docChanges().forEach(function (change) {
                    if (change.type === 'removed' && change.doc.id === _activeSessionId) {
                        // §75 Sprint S3 — typing listener antes de _activeSessionId=null
                        try { stopAdminTypingListener(); } catch (e) {}
                        _activeSessionId = null;
                        if (_messagesUnsub) {
                            try { _messagesUnsub(); } catch (e) {}
                            _messagesUnsub = null;
                        }
                        renderChatDetail(null, []);
                        if (AP.toast) {
                            AP.toast('La conversación abierta fue eliminada por otro administrador.', 'warning');
                        }
                    }
                });

                _chats = [];
                snap.forEach(function (doc) {
                    _chats.push(Object.assign({ _docId: doc.id }, doc.data()));
                });
                renderChatList();
                renderFilterBar();
                updateNavBadge();

                // §57.ter — Real-time fix: re-render del detail panel
                // cuando el active chat cambia (status, mode, claimedBy,
                // closedReason, etc). SIN esto, el panel derecho quedaba
                // stale hasta que llegara un mensaje nuevo. Bug visible
                // cuando el cliente finaliza el chat: lista lateral se
                // actualizaba pero el detail seguía mostrando "active".
                if (_activeSessionId) {
                    var activeChat = _chats.find(function (c) { return c._docId === _activeSessionId; });
                    if (activeChat) {
                        renderChatDetail(activeChat, _activeMessages);
                    }
                }
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
        // isDeleted ya no existe (Hard delete real elimina el doc).
        // Conservamos el filtro `!c.isDeleted` por compat con docs viejos.
        var filtered = _chats.filter(function (c) {
            if (_activeFilter === 'pinned') return c.isPinned && !c.isDeleted;
            if (_activeFilter === 'archived') return c.isArchived && !c.isDeleted;
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
        var counts = { active: 0, pinned: 0, archived: 0 };
        _chats.forEach(function (c) {
            if (c.isDeleted) return; // ignora docs viejos con flag legacy
            if (c.isArchived) counts.archived++;
            else counts.active++;
            if (c.isPinned) counts.pinned++;
        });
        // 3 chips — el "Eliminados" se removió: hard-delete purga el doc.
        var chips = [
            { f: 'active',   label: 'Activos',    count: counts.active },
            { f: 'pinned',   label: 'Fijados',    count: counts.pinned },
            { f: 'archived', label: 'Archivados', count: counts.archived }
        ];
        bar.innerHTML = chips.map(function (c) {
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
            if (c.status === 'closed') stateBadges += '<span class="cnc-admin-state-badge cnc-closed" title="Cerrado"><i data-lucide="check-circle-2"></i></span>';

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
    // §60.1 — Optimistic UI: snapshot del estado previo, update local
    // INSTANT + render, Firestore en background, rollback en error.
    // Patrón Linear/Intercom: UI nunca espera al server.
    function togglePin(sessionId) {
        var chat = _chats.find(function (c) { return c._docId === sessionId; });
        if (!chat) return;
        var newVal = !chat.isPinned;
        var nowIso = new Date().toISOString();
        var snapshot = { isPinned: chat.isPinned, pinnedAt: chat.pinnedAt };

        // Optimistic — UI cambia ANTES del round-trip
        chat.isPinned = newVal;
        chat.pinnedAt = newVal ? nowIso : null;
        renderChatList();
        console.log('[AdminConcierge] §60.1 togglePin optimistic', { sid: sessionId, newVal: newVal });

        // Firestore en background
        window.db.collection('conciergeChats').doc(sessionId).set({
            isPinned: newVal,
            pinnedAt: chat.pinnedAt
        }, { merge: true }).then(function () {
            if (AP.toast) AP.toast(newVal ? 'Chat fijado' : 'Chat desfijado', 'success');
        }).catch(function (err) {
            // Rollback al snapshot previo
            chat.isPinned = snapshot.isPinned;
            chat.pinnedAt = snapshot.pinnedAt;
            renderChatList();
            console.warn('[AdminConcierge] §60.1 togglePin rollback', err && err.message);
            if (AP.toast) AP.toast('No se pudo actualizar: ' + err.message, 'error');
        });
    }

    // §60.1 — Optimistic UI: si el chat archivado era el activo,
    // cerramos detail INSTANT (sale de la lista) y revertimos en
    // error. Si rollback dispara después del cierre, re-render
    // restaura la card. Patrón Front/Intercom: archive con undo.
    function toggleArchive(sessionId) {
        var chat = _chats.find(function (c) { return c._docId === sessionId; });
        if (!chat) return;
        var newVal = !chat.isArchived;
        var nowIso = new Date().toISOString();
        var uid = window.auth && window.auth.currentUser ? window.auth.currentUser.uid : null;
        var snapshot = {
            isArchived: chat.isArchived,
            archivedAt: chat.archivedAt,
            archivedBy: chat.archivedBy
        };
        var wasActive = _activeSessionId === sessionId;

        // Optimistic
        chat.isArchived = newVal;
        chat.archivedAt = newVal ? nowIso : null;
        chat.archivedBy = newVal ? uid : null;
        renderChatList();
        if (newVal && wasActive) {
            _activeSessionId = null;
            renderChatDetail(null, []);
        }
        console.log('[AdminConcierge] §60.1 toggleArchive optimistic', { sid: sessionId, newVal: newVal });

        window.db.collection('conciergeChats').doc(sessionId).set({
            isArchived: newVal,
            archivedAt: chat.archivedAt,
            archivedBy: chat.archivedBy
        }, { merge: true }).then(function () {
            if (AP.toast) AP.toast(newVal ? 'Chat archivado' : 'Chat desarchivado', 'success');
        }).catch(function (err) {
            // Rollback completo
            chat.isArchived = snapshot.isArchived;
            chat.archivedAt = snapshot.archivedAt;
            chat.archivedBy = snapshot.archivedBy;
            renderChatList();
            // Si lo habíamos cerrado optimistically y falló, lo
            // re-abrimos para que el usuario no quede confundido.
            if (newVal && wasActive) {
                _activeSessionId = sessionId;
                renderChatDetail(chat, _activeMessages);
            }
            console.warn('[AdminConcierge] §60.1 toggleArchive rollback', err && err.message);
            if (AP.toast) AP.toast('No se pudo actualizar: ' + err.message, 'error');
        });
    }

    // §60.1 — Optimistic UI: badge unread aparece INSTANT en la lista.
    // El campo forceUnreadByAdmin solo afecta visualización admin
    // (el cliente no lo ve), así que rollback silencioso es seguro.
    function markUnread(sessionId) {
        var chat = _chats.find(function (c) { return c._docId === sessionId; });
        var snapshot = chat ? {
            forceUnreadByAdmin: chat.forceUnreadByAdmin,
            unreadByAdmin: chat.unreadByAdmin
        } : null;

        // Optimistic
        if (chat) {
            chat.forceUnreadByAdmin = true;
            chat.unreadByAdmin = Math.max(1, chat.unreadByAdmin || 0);
            renderChatList();
        }
        console.log('[AdminConcierge] §60.1 markUnread optimistic', { sid: sessionId });

        window.db.collection('conciergeChats').doc(sessionId).set({
            forceUnreadByAdmin: true,
            unreadByAdmin: 1
        }, { merge: true }).then(function () {
            if (AP.toast) AP.toast('Marcado como no leído', 'success');
        }).catch(function (err) {
            if (chat && snapshot) {
                chat.forceUnreadByAdmin = snapshot.forceUnreadByAdmin;
                chat.unreadByAdmin = snapshot.unreadByAdmin;
                renderChatList();
            }
            console.warn('[AdminConcierge] §60.1 markUnread rollback', err && err.message);
            if (AP.toast) AP.toast('No se pudo actualizar: ' + err.message, 'error');
        });
    }

    /**
     * Hard delete — borra el chat permanentemente de Firestore junto
     * con su subcolección de mensajes. Doble confirmación porque es
     * irreversible. Solo super_admin (rules `allow delete: if isSuperAdmin()`).
     */
    function hardDeleteChat(sessionId) {
        if (!AP.isSuperAdmin || !AP.isSuperAdmin()) {
            if (AP.toast) AP.toast('Solo super admin puede eliminar chats', 'error');
            return;
        }
        if (!confirm('⚠️ ELIMINAR PERMANENTEMENTE este chat?\n\nEsto borrará la conversación y todos sus mensajes de Firestore. NO se puede recuperar.')) return;
        if (!confirm('Confirma una segunda vez: ¿borrar definitivamente?')) return;

        var ref = window.db.collection('conciergeChats').doc(sessionId);
        // 1. Borrar todos los mensajes de la subcolección en batch
        ref.collection('messages').get().then(function (snap) {
            var batch = window.db.batch();
            var count = 0;
            snap.forEach(function (doc) { batch.delete(doc.ref); count++; });
            // Firestore batch limit is 500; con chats muy largos podría
            // requerir paginar, pero conciergeChats típicamente tienen <100 msgs.
            return batch.commit().then(function () { return count; });
        }).then(function (count) {
            // 2. Borrar el doc parent
            return ref.delete().then(function () { return count; });
        }).then(function (count) {
            if (AP.toast) AP.toast('Chat y ' + count + ' mensajes eliminados', 'success');
            if (_activeSessionId === sessionId) {
                _activeSessionId = null;
                if (_messagesUnsub) { try { _messagesUnsub(); } catch (e) {} _messagesUnsub = null; }
                renderChatDetail(null, []);
            }
        }).catch(function (err) {
            if (AP.toast) AP.toast('No se pudo eliminar: ' + err.message, 'error');
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

        var isSuper = AP.isSuperAdmin && AP.isSuperAdmin();
        var items = [
            { action: 'pin',     label: chat.isPinned ? 'Quitar fijación' : 'Fijar al top', icon: 'pin' },
            { action: 'archive', label: chat.isArchived ? 'Desarchivar' : 'Archivar',       icon: 'archive' },
            { action: 'unread',  label: 'Marcar como no leído',                              icon: 'mail' }
        ];
        // Eliminar permanente: solo super_admin (hard delete real, sin soft).
        if (isSuper) {
            items.push({ action: 'delete', label: 'Eliminar permanente', icon: 'trash-2', danger: true });
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
            else if (action === 'delete')  hardDeleteChat(sid);
        });
    }

    /* ═══════════════════════════════════════════════════════════
       CHAT DETAIL — abrir conversación
       ═══════════════════════════════════════════════════════════ */
    function openChat(sessionId) {
        // §75 Sprint S3 — Cancelar typing listener del chat anterior
        // ANTES de cambiar _activeSessionId. Sin esto, el handler del
        // chat viejo seguiría activo escribiendo a un sessionId que
        // ya no es el visible.
        try { stopAdminTypingListener(); } catch (e) {}
        _activeSessionId = sessionId;
        _activeMessages = []; // §57.ter — reset al abrir chat nuevo
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
        // §26.3 — Notifica al wrapper para activar pane mobile
        try { window.dispatchEvent(new Event('altor-hub:chat-opened')); } catch (e) {}

        // §75 Sprint S3 — bind delegation idempotente (1ra vez) + arranque
        // del listener para "el cliente está escribiendo" del chat actual.
        try {
            bindAdminTypingDelegation();
            startAdminTypingListener(sessionId);
        } catch (e) {}

        // Suscribirse a los mensajes
        _messagesUnsub = window.db.collection('conciergeChats').doc(sessionId)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot(function (snap) {
                var messages = [];
                snap.forEach(function (doc) {
                    messages.push(Object.assign({ _id: doc.id }, doc.data()));
                });
                _activeMessages = messages; // §57.ter — cache para re-renders del _chatsUnsub
                // §57.ter — usar SIEMPRE el chat más fresco de _chats[]
                // en vez del closure cached (que está stale tras updates).
                var freshChat = _chats.find(function (c) { return c._docId === sessionId; }) || chat;
                renderChatDetail(freshChat, messages);
                // §75 Sprint S3 — Si había typing del cliente antes del
                // re-render, re-insertar el indicator (sobrevive al
                // wipe del innerHTML en renderChatDetail).
                if (_adminClientTypingActive) {
                    try { showAdminTypingIndicator(); } catch (e) {}
                }
                // §26.3 — Auto-scroll a fondo solo si el admin está
                // cerca del fondo (no interrumpe lectura de histórico)
                setTimeout(scrollHubMessagesToBottom, 50);
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

        // §26.7 BUG B FIX — Guard contra chat=null. Antes accedía
        // chat.userNombre directo y crashea con "Cannot read properties
        // of null". Esto interrumpía hardDeleteChat post-delete cleanup
        // y dejaba el chat fantasma en la lista. AHORA: si chat es null,
        // mostrar empty state limpio y salir.
        if (!chat) {
            detailEl.innerHTML =
                '<div class="cnc-admin-detail-empty altor-hub-pane-empty">' +
                    '<i data-lucide="message-circle" style="width:48px;height:48px;opacity:0.3;"></i>' +
                    '<p>Seleccioná una conversación para responder</p>' +
                '</div>';
            if (window.AltorraIcons) window.AltorraIcons.refresh(detailEl);
            else if (window.lucide) try { window.lucide.createIcons({ context: detailEl }); } catch (e) {}
            return;
        }
        var name = chat.userNombre || chat.userEmail || 'Cliente ' + chat._docId.slice(-6);
        var modeLabel = chat.mode === 'wa_handed_over' ? 'WhatsApp' :
                        chat.mode === 'live' ? 'En vivo' : 'Bot AI';

        // §23 FASE 5 — chat cerrado = read-only bidireccional
        var isClosed = chat.status === 'closed';
        var isSuper = AP.isSuperAdmin && AP.isSuperAdmin();

        // §23 FASE 3 — Locks: detectar si el chat fue tomado por OTRO asesor.
        // §26.4 — Claiming Estricto: si el chat NO tiene claimedBy aún,
        // input bloqueado + se muestra botón gigante "Tomar Conversación".
        // Solo después de claim explícito el asesor puede responder.
        var currentUid = window.auth && window.auth.currentUser ? window.auth.currentUser.uid : null;
        var claimedByOther = !!(chat.claimedBy && chat.claimedBy !== currentUid);
        var claimedByMe = !!(chat.claimedBy && chat.claimedBy === currentUid);
        var unclaimed = !chat.claimedBy && !isClosed;
        // canWrite ahora requiere que el chat esté claimedByMe o que sea super_admin
        var canWrite = !isClosed && !unclaimed && (!claimedByOther || isSuper);
        var lockReadonly = claimedByOther && !isSuper;

        // §60.1 — Estados visuales canónicos (WhatsApp pattern):
        //   pending → ⏱ icon gris claro + opacity 0.7
        //   sent    → ✓ gris (1 check)
        //   read    → ✓✓ azul (#34B7F1) (2 checks)
        //   failed  → border rojo + botón Reintentar (data-action="retry-msg")
        // Solo se aplica a mensajes 'asesor' (los del cliente y bot
        // se rigen por el listener Firestore directo).
        var msgsHTML = messages.length === 0
            ? '<div class="cnc-admin-detail-empty">Sin mensajes en esta conversación.</div>'
            : messages.map(function (m) {
                if (m.from === 'system') {
                    var sysExtraCls = '';
                    if (m._status === 'pending') sysExtraCls = ' cnc-msg-pending';
                    else if (m._status === 'failed') sysExtraCls = ' cnc-msg-failed';
                    return '<div class="cnc-detail-msg cnc-detail-system' + sysExtraCls + '"' +
                            (m._tempId ? ' data-temp-id="' + escTxt(m._tempId) + '"' : '') + '>' +
                        '<div class="cnc-detail-system-bubble">' + escTxt(m.text) + '</div>' +
                        '<div class="cnc-detail-time">' + escTxt(timeAgo(m.timestamp)) + '</div>' +
                    '</div>';
                }
                var bubbleClass = m.from === 'user' ? 'cnc-detail-user' :
                                  m.from === 'asesor' ? 'cnc-detail-asesor' : 'cnc-detail-bot';

                // §60.1 — Estados visuales para mensajes del asesor
                var statusClass = '';
                var statusIcon = '';
                if (m.from === 'asesor') {
                    if (m._status === 'pending') {
                        statusClass = ' cnc-msg-pending';
                        statusIcon = '<span class="cnc-msg-status" data-state="pending" aria-label="Enviando">⏱</span>';
                    } else if (m._status === 'sent') {
                        statusClass = ' cnc-msg-synced';
                        statusIcon = '<span class="cnc-msg-status" data-state="sent" aria-label="Enviado">✓</span>';
                    } else if (m._status === 'read') {
                        statusClass = ' cnc-msg-synced';
                        statusIcon = '<span class="cnc-msg-status" data-state="read" aria-label="Leído">✓✓</span>';
                    } else if (m._status === 'failed') {
                        statusClass = ' cnc-msg-failed';
                        statusIcon = '<button class="cnc-msg-retry" type="button"' +
                            ' data-action="retry-msg"' +
                            ' data-temp-id="' + escTxt(m._tempId || '') + '"' +
                            ' aria-label="Reintentar envío">Reintentar</button>';
                    } else {
                        // Mensaje del listener Firestore (sin _status local)
                        statusClass = ' cnc-msg-synced';
                    }
                }
                var tempIdAttr = m._tempId ? ' data-temp-id="' + escTxt(m._tempId) + '"' : '';
                return '<div class="cnc-detail-msg ' + bubbleClass + statusClass + '"' + tempIdAttr + '>' +
                    '<div class="cnc-detail-bubble">' + escTxt(m.text) + statusIcon + '</div>' +
                    '<div class="cnc-detail-time">' + escTxt(timeAgo(m.timestamp)) + '</div>' +
                '</div>';
            }).join('');

        // §23 FASE 5 — banner sticky de cierre con metadata
        var closedBanner = '';
        if (isClosed) {
            var closedAtTxt = chat.closedAt ? timeAgo(chat.closedAt) : '';
            var closedByTxt = chat.closedByName || (chat.closedByRole === 'client' ? 'el cliente' : 'un asesor');
            var reasonLabel = ({
                client_finalized: 'Cliente finalizó la conversación',
                admin_resolved: 'Asesor marcó como resuelta',
                sla_breach_handover: 'Cliente prefirió WhatsApp por SLA',
                idle_timeout: 'Cerrada por inactividad'
            })[chat.closedReason] || 'Conversación finalizada';
            closedBanner =
                '<div class="cnc-admin-closed-banner">' +
                    '<i data-lucide="lock" class="cnc-admin-closed-icon"></i>' +
                    '<div class="cnc-admin-closed-info">' +
                        '<div class="cnc-admin-closed-title">' + escTxt(reasonLabel) + '</div>' +
                        '<div class="cnc-admin-closed-sub">Por ' + escTxt(closedByTxt) +
                            (closedAtTxt ? ' · ' + escTxt(closedAtTxt) : '') +
                            (chat.radicado ? ' · ' + escTxt(chat.radicado) : '') +
                        '</div>' +
                    '</div>' +
                    (isSuper ?
                        '<button class="alt-btn alt-btn--ghost alt-btn--sm" id="cncAdminReopenChat" data-tooltip="Reabrir conversación (solo super_admin)">' +
                            '<i data-lucide="refresh-cw"></i> Reabrir' +
                        '</button>' : '') +
                '</div>';
        }

        // Radicado prominente en el header
        var radicadoBadge = chat.radicado
            ? '<span class="cnc-admin-radicado">' + escTxt(chat.radicado) + '</span>'
            : '';

        // §23 FASE 3 — Banner de claim (solo si OTRO asesor tiene el lock)
        var claimedBanner = '';
        if (claimedByOther) {
            var claimedTimeAgo = chat.claimedAt ? timeAgo(chat.claimedAt) : '';
            claimedBanner =
                '<div class="cnc-admin-claimed-banner' + (isSuper ? ' cnc-admin-claimed-banner--override' : '') + '">' +
                    '<i data-lucide="' + (isSuper ? 'alert-triangle' : 'lock') + '" class="cnc-admin-claimed-icon"></i>' +
                    '<div class="cnc-admin-claimed-info">' +
                        '<div class="cnc-admin-claimed-title">' +
                            (isSuper
                                ? '⚠️ ' + escTxt(chat.claimedByName || 'Otro asesor') + ' está atendiendo este chat'
                                : '🔒 Este chat lo está atendiendo ' + escTxt(chat.claimedByName || 'otro asesor')
                            ) +
                        '</div>' +
                        '<div class="cnc-admin-claimed-sub">' +
                            (isSuper
                                ? 'Si escribís acá vas a interrumpir su atención. Mejor liberá el lock o reasigná.'
                                : 'Solo el asesor que tomó el chat puede responder. Esperá a que termine o pedí a un super_admin liberarlo.'
                            ) +
                            (claimedTimeAgo ? ' · Tomado ' + claimedTimeAgo : '') +
                        '</div>' +
                    '</div>' +
                    (isSuper ?
                        '<button class="alt-btn alt-btn--ghost alt-btn--sm" id="cncAdminReleaseClaim" data-tooltip="Liberar lock (solo super_admin)">' +
                            '<i data-lucide="unlock"></i> Liberar' +
                        '</button>' : '') +
                '</div>';
        }

        detailEl.innerHTML =
            '<div class="cnc-admin-detail-head">' +
                '<div class="cnc-admin-detail-info">' +
                    '<div class="cnc-admin-detail-name">' + escTxt(name) + ' ' + radicadoBadge + '</div>' +
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
                    (!isClosed
                        ? '<button class="alt-btn alt-btn--ghost alt-btn--sm" id="cncAdminCloseChat" data-tooltip="Cerrar chat">' +
                            '<i data-lucide="check"></i> Cerrar chat' +
                          '</button>'
                        : ''
                    ) +
                '</div>' +
            '</div>' +
            closedBanner +
            claimedBanner +
            // §26.4 — Banner CLAIM: si el chat está sin tomar, ofrecer
            // "Tomar Conversación" gigante. Bloquea el input.
            (unclaimed && AP.isEditorOrAbove && AP.isEditorOrAbove() ?
                '<div class="cnc-admin-claim-banner">' +
                    '<div class="cnc-admin-claim-banner-icon"><i data-lucide="user-plus"></i></div>' +
                    '<div class="cnc-admin-claim-banner-text">' +
                        '<div class="cnc-admin-claim-banner-title">Conversación sin asignar</div>' +
                        '<div class="cnc-admin-claim-banner-sub">Tomá esta conversación para responderle al cliente. Otros asesores no podrán escribir mientras vos atendés.</div>' +
                    '</div>' +
                    '<button class="alt-btn alt-btn--primary cnc-admin-claim-btn" id="cncAdminClaimBtn" data-session-id="' + escTxt(chat._docId) + '">' +
                        '<i data-lucide="hand"></i> Tomar conversación' +
                    '</button>' +
                '</div>'
                : ''
            ) +
            // §26.4 — Banner MINE: si soy yo el que lo tomó, mostrar
            // botón "Transferir" para liberarlo (super_admin) o
            // "Devolver a la cola" (editor).
            (claimedByMe && !isClosed ?
                '<div class="cnc-admin-mine-banner">' +
                    '<i data-lucide="check-circle-2"></i>' +
                    '<span>Estás atendiendo este chat. Otros asesores no pueden responder.</span>' +
                    (isSuper ?
                        '<button class="alt-btn alt-btn--ghost alt-btn--sm" id="cncAdminTransferBtn" data-session-id="' + escTxt(chat._docId) + '">' +
                            '<i data-lucide="users"></i> Transferir / Liberar' +
                        '</button>'
                        : ''
                    ) +
                '</div>'
                : ''
            ) +
            '<div class="cnc-admin-detail-messages" id="cncAdminMessages">' + msgsHTML + '</div>' +
            (canWrite ?
                '<div class="cnc-smart-suggestions" id="cncSmartSuggestions" style="display:none;"></div>' +
                '<div class="cnc-admin-detail-quick-replies">' +
                    '<button class="cnc-quick-reply" data-text="Hola, soy [tu nombre], asesor de Altorra. ¿En qué te puedo ayudar?">👋 Saludo</button>' +
                    '<button class="cnc-quick-reply" data-text="Te envío la información del vehículo que te interesa por aquí mismo.">📋 Info vehículo</button>' +
                    '<button class="cnc-quick-reply" data-text="¿Te gustaría agendar una visita para ver el carro? Tenemos disponibilidad esta semana.">📅 Agendar</button>' +
                    '<button class="cnc-quick-reply" data-text="Listo, te paso a WhatsApp para continuar la conversación.">📲 A WhatsApp</button>' +
                    // §27.6 — Plantillas integradas (admin-templates.js).
                    // Botón que abre dropdown con plantillas del admin con
                    // variables resueltas {{nombre}}, {{vehiculo}}, etc.
                    '<button class="cnc-quick-reply cnc-templates-trigger" data-action="open-templates" data-tooltip="Plantillas guardadas">📋 Plantillas</button>' +
                '</div>' +
                // Container para el dropdown de plantillas (mounted on demand)
                '<div class="cnc-templates-dropdown" id="cncTemplatesDropdown" hidden></div>'
                : ''
            ) +
            '<div class="cnc-admin-detail-input-wrap' +
                (isClosed ? ' cnc-admin-detail-input-wrap--closed' : '') +
                (lockReadonly ? ' cnc-admin-detail-input-wrap--locked' : '') + '">' +
                '<input type="text" class="form-input cnc-admin-detail-input" id="cncAdminReply" ' +
                    (isClosed ? 'disabled placeholder="🔒 Conversación cerrada — solo lectura"'
                              : lockReadonly ? 'disabled placeholder="🔒 Atendido por ' + escTxt(chat.claimedByName || 'otro asesor') + '"'
                                             : 'placeholder="Responder como asesor…"') +
                    ' autocomplete="off">' +
                '<button class="alt-btn alt-btn--primary" id="cncAdminSend"' +
                    (canWrite ? '' : ' disabled') + '>Enviar</button>' +
            '</div>';

        // Auto-scroll al final
        var msgsContainer = $('cncAdminMessages');
        if (msgsContainer) msgsContainer.scrollTop = msgsContainer.scrollHeight;

        if (window.AltorraIcons) window.AltorraIcons.refresh(detailEl);
        else if (window.lucide) try { window.lucide.createIcons({ context: detailEl }); } catch (e) {}

        // U.12 — generar smart suggestions basadas en el último mensaje
        renderSmartSuggestions(chat, messages);
    }

    /**
     * §23 FASE 3 — claimChat: adquiere el lock del chat con Firestore
     * Transaction (read-then-write atómico). Si dos asesores hacen click
     * en "Tomar chat" en el mismo milisegundo, solo UNO adquiere el lock.
     * El segundo recibe ConflictError con el nombre del que ganó.
     *
     * Returns: Promise que resuelve {success:true, claimedByName} o
     * rejecta con {code:'already-claimed', claimedByName} | {code:'closed'}
     */
    // §60.1 — Optimistic UI: banner "Estás atendiendo este chat"
    // aparece INSTANT al click. La transaction Firestore corre en
    // background. Si race con otro asesor (already-claimed), rollback
    // automático al snapshot previo + toast "X tomó este chat".
    //
    // Trade-off: durante 200-2000ms el asesor cree que tomó el chat.
    // Es el patrón industry-standard (Intercom/Drift/Front): UI
    // optimista con rollback explícito si el server rechaza.
    function claimChat(sessionId) {
        if (!window.db || !window.auth || !window.auth.currentUser) {
            return Promise.reject(new Error('not-authenticated'));
        }
        if (!AP.isEditorOrAbove || !AP.isEditorOrAbove()) {
            return Promise.reject(new Error('not-authorized'));
        }
        var ref = window.db.collection('conciergeChats').doc(sessionId);
        var currentUid = window.auth.currentUser.uid;
        var currentName = (AP.currentUserProfile && AP.currentUserProfile.nombre) || 'Asesor';
        var nowIso = new Date().toISOString();

        // §60.1.1 — PRE-CHECK SERVER (antes del optimistic UI)
        //
        // Causa: el listener _chatsUnsub puede tener un snapshot stale
        // (latencia 0.5-2s vs Firestore real). Si Yesit click "Tomar"
        // mientras su lista local muestra "sin asignar" pero el server
        // tiene claimedBy=otroUid, el flow optimistic mostraría
        // "Estás atendiendo" → 1s después rollback con error técnico.
        //
        // Solución: leer doc directo del SERVER ANTES de mutar UI. Si
        // server dice "ya tomado" o "no tenés permisos", abortamos
        // localmente con código semántico (`already-claimed`) y mensaje
        // amigable. Cero UI flash falso.
        //
        // NOTA: si esto falla con permission-denied (rules en producción
        // desactualizadas o rol incorrecto del editor), el caller mostrará
        // un mensaje claro indicando las posibles causas.
        return ref.get({ source: 'server' }).then(function (snap) {
            if (!snap.exists) {
                console.warn('[AdminConcierge] §60.1.1 pre-check claim: chat not found', sessionId);
                return Promise.reject({ code: 'chat-not-found' });
            }
            var serverData = snap.data();
            console.log('[AdminConcierge] §60.1.1 pre-check claim', {
                sid: sessionId,
                serverClaimedBy: serverData.claimedBy || null,
                serverStatus: serverData.status,
                myUid: currentUid
            });
            if (serverData.status === 'closed') {
                return Promise.reject({ code: 'chat-closed' });
            }
            if (serverData.claimedBy && serverData.claimedBy !== currentUid) {
                // Ya tomado por OTRO. NO hacemos optimistic UI ni transaction.
                return Promise.reject({
                    code: 'already-claimed',
                    claimedByName: serverData.claimedByName || 'Otro asesor',
                    claimedByUid: serverData.claimedBy
                });
            }
            // OK: chat libre o ya tomado por mí. Sigue el flow optimistic + transaction.
            return _claimChatTransactional(sessionId, ref, currentUid, currentName, nowIso);
        });
    }

    // §60.1.1 — Helper extraído para el flow optimistic + Firestore TX.
    // Solo se llama tras pasar el pre-check del server.
    function _claimChatTransactional(sessionId, ref, currentUid, currentName, nowIso) {
        // §60.1 — OPTIMISTIC: snapshot + update local + render INSTANT
        var chat = _chats.find(function (c) { return c._docId === sessionId; });
        var snapshot = null;
        if (chat) {
            snapshot = {
                claimedBy: chat.claimedBy,
                claimedByName: chat.claimedByName,
                claimedAt: chat.claimedAt,
                mode: chat.mode,
                assignedTo: chat.assignedTo,
                assignedToName: chat.assignedToName
            };
            chat.claimedBy = currentUid;
            chat.claimedByName = currentName;
            chat.claimedAt = nowIso;
            chat.mode = 'live';
            chat.assignedTo = currentUid;
            chat.assignedToName = currentName;
            renderChatList();
            if (_activeSessionId === sessionId) {
                renderChatDetail(chat, _activeMessages);
            }
            console.log('[AdminConcierge] §60.1 claimChat optimistic START', { sid: sessionId });
        }

        return window.db.runTransaction(function (tx) {
            return tx.get(ref).then(function (snap) {
                if (!snap.exists) {
                    return Promise.reject({ code: 'chat-not-found' });
                }
                var data = snap.data();
                if (data.status === 'closed') {
                    return Promise.reject({ code: 'chat-closed' });
                }
                if (data.claimedBy && data.claimedBy !== currentUid) {
                    return Promise.reject({
                        code: 'already-claimed',
                        claimedByName: data.claimedByName || 'Otro asesor',
                        claimedByUid: data.claimedBy
                    });
                }
                tx.update(ref, {
                    claimedBy: currentUid,
                    claimedByName: currentName,
                    claimedAt: nowIso,
                    mode: 'live',
                    // Compat con CRM legacy que usa assignedTo
                    assignedTo: currentUid,
                    assignedToName: currentName
                });
                return { success: true, claimedByName: currentName };
            });
        }).then(function (result) {
            // §57.quat — Bug 2 fix: agregar mensaje system para que el
            // CLIENTE vea inmediatamente "✓ X tomó la conversación".
            // §60.1 — Best-effort, sin Optimistic UI sobre system messages
            // del cliente (no aparece en _activeMessages del admin hasta
            // que el listener Firestore lo entrega). El cliente lo ve
            // vía su propio listener.
            try {
                window.db.collection('conciergeChats').doc(sessionId)
                    .collection('messages').add({
                        from: 'system',
                        systemType: 'asesor_joined',
                        text: '✓ ' + currentName + ' tomó esta conversación. En breve te atenderá.',
                        timestamp: nowIso,
                        asesorNombre: currentName,
                        asesorUid: currentUid
                    }).catch(function (err) {
                        console.warn('[claimChat] system message err:', err.message);
                    });
                // Update parent lastMessage para que la lista admin se ordene
                window.db.collection('conciergeChats').doc(sessionId).update({
                    lastMessage: '✓ ' + currentName + ' tomó la conversación',
                    lastMessageAt: nowIso
                }).catch(function () {});
            } catch (e) { /* best-effort */ }
            console.log('[AdminConcierge] §60.1 claimChat confirmed', { sid: sessionId });
            return result;
        }).catch(function (err) {
            // §60.1 — ROLLBACK optimistic en error
            if (snapshot && chat) {
                chat.claimedBy = snapshot.claimedBy;
                chat.claimedByName = snapshot.claimedByName;
                chat.claimedAt = snapshot.claimedAt;
                chat.mode = snapshot.mode;
                chat.assignedTo = snapshot.assignedTo;
                chat.assignedToName = snapshot.assignedToName;
                renderChatList();
                if (_activeSessionId === sessionId) {
                    renderChatDetail(chat, _activeMessages);
                }
            }
            console.warn('[AdminConcierge] §60.1 claimChat rollback', err && (err.code || err.message));
            // Toast solo si NO fue el caller quien lo va a manejar.
            // El sendAsesorMessage ya muestra toasts custom para race.
            // claimChat lanza el error para que el caller decida.
            return Promise.reject(err);
        });
    }

    /**
     * §23 FASE 3 — releaseClaim (solo super_admin override).
     * Libera el claim para que otro asesor pueda tomar el chat.
     */
    function releaseClaim(sessionId) {
        if (!AP.isSuperAdmin || !AP.isSuperAdmin()) {
            if (AP.toast) AP.toast('Solo super_admin puede liberar claims', 'error');
            return Promise.reject(new Error('not-authorized'));
        }
        var ref = window.db.collection('conciergeChats').doc(sessionId);
        return ref.update({
            claimedBy: null,
            claimedByName: null,
            claimReleasedBy: window.auth.currentUser.uid,
            claimReleasedAt: new Date().toISOString()
        }).then(function () {
            if (AP.toast) AP.toast('Lock liberado — otro asesor ya puede tomar el chat', 'success');
        }).catch(function (err) {
            if (AP.toast) AP.toast('No se pudo liberar: ' + err.message, 'error');
        });
    }

    function sendAsesorMessage() {
        var input = $('cncAdminReply');
        if (!input || !_activeSessionId || !window.db) return;
        var text = input.value.trim();
        if (!text) return;
        // §75 Sprint S3 — typing:false sincrónico ANTES del send para que
        // el indicador desaparezca instantáneo del lado cliente. Cancelamos
        // el auto-clear timer porque ya no aplica.
        if (_adminTypingClearTimeout) { clearTimeout(_adminTypingClearTimeout); _adminTypingClearTimeout = null; }
        _adminTypingThrottleActive = false;
        try { setAdminTyping(false); } catch (e) {}

        // §23 FASE 3 — auto-claim al primer mensaje del asesor.
        // Si el chat NO tiene claimedBy aún, lo adquirimos antes de enviar.
        // Si otro asesor ya lo tomó, esto fallará con 'already-claimed' y
        // mostramos toast informativo + bloqueamos el input.
        var chat = _chats.find(function (c) { return c._docId === _activeSessionId; });
        var needsClaim = chat && !chat.claimedBy;
        var currentUid = window.auth.currentUser ? window.auth.currentUser.uid : null;
        var alreadyClaimedByOther = chat && chat.claimedBy && chat.claimedBy !== currentUid;
        var isSuper = AP.isSuperAdmin && AP.isSuperAdmin();

        if (alreadyClaimedByOther && !isSuper) {
            if (AP.toast) AP.toast('Este chat lo está atendiendo ' + (chat.claimedByName || 'otro asesor'), 'warning');
            return;
        }

        var sendNow = function () {
            _sendAsesorMessageInternal(input, text);
        };

        if (needsClaim) {
            claimChat(_activeSessionId).then(sendNow).catch(function (err) {
                if (err && err.code === 'already-claimed') {
                    if (AP.toast) AP.toast((err.claimedByName || 'Otro asesor') + ' tomó este chat hace un momento. Refrescá para ver el estado actual.', 'warning');
                } else if (err && err.code === 'chat-closed') {
                    if (AP.toast) AP.toast('Este chat ya está cerrado', 'error');
                } else if (err && err.code === 'chat-not-found') {
                    if (AP.toast) AP.toast('No encontramos este chat en el servidor. Refrescá la lista.', 'error');
                } else if (err && (err.code === 'permission-denied' || (err.message && err.message.indexOf('Missing or insufficient permissions') >= 0))) {
                    // §60.1.1 — Permission-denied del servidor. Causas posibles:
                    // (1) Reglas de Firestore desactualizadas en producción
                    //     → super_admin debe ejecutar `firebase deploy --only firestore:rules`
                    // (2) El editor no tiene rol 'editor' o 'super_admin' en su doc usuarios/
                    //     → super_admin debe verificar en Firebase Console el rol del usuario
                    // (3) Otro asesor tomó el chat justo antes (race ms)
                    console.error('[AdminConcierge] §60.1.1 permission-denied al enviar', { sid: _activeSessionId, err: err });
                    if (AP.toast) AP.toast('No tenés permisos para tomar este chat. Posibles causas: (1) reglas de Firebase desactualizadas, (2) tu rol no está bien configurado. Contactá al admin.', 'error', 9000);
                } else {
                    if (AP.toast) AP.toast('No se pudo enviar: ' + (err.message || err.code || 'error'), 'error');
                }
            });
            return;
        }

        sendNow();
    }

    // §60.1 — Optimistic UI universal: el bubble del asesor aparece
    // INSTANT con _status='pending' (icon ⏱ gris). El round-trip a
    // Firestore corre en background. Cuando confirma, _status='sent'
    // (✓ gris). Si falla, _status='failed' (border rojo + retry button).
    //
    // Patrón WhatsApp/Linear/Intercom: la UI es la fuente de verdad
    // visual mientras el server valida. Fallar con feedback claro >
    // hacer esperar al usuario.
    //
    // Co-existencia: HubStore.addMessageOptimistic + _activeMessages
    // local mantienen la misma lista en sync. _activeMessages se
    // mantiene durante S1 para compat con renderChatDetail. Migración
    // a 100% HubStore en S2.
    function _sendAsesorMessageInternal(input, text) {
        input.value = '';

        var sid = _activeSessionId;
        if (!sid || !window.db) return;

        var asesorUid = window.auth.currentUser.uid;
        var asesorNombre = (AP.currentUserProfile && AP.currentUserProfile.nombre)
            || window.auth.currentUser.email;
        var asesorPhotoURL = (AP.currentUserProfile && AP.currentUserProfile.photoURL) || null;
        var nowIso = new Date().toISOString();

        var msg = {
            from: 'asesor',
            text: text,
            timestamp: nowIso,
            asesorUid: asesorUid,
            asesorNombre: asesorNombre,
            asesorPhotoURL: asesorPhotoURL
        };

        // §60.1 — OPTIMISTIC: HubStore + _activeMessages + render INSTANT
        var tempId = window.HubStore
            ? window.HubStore.addMessageOptimistic(sid, msg)
            : ('tmp_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8));
        var optimisticMsg = Object.assign({ _tempId: tempId, _status: 'pending' }, msg);
        _activeMessages.push(optimisticMsg);

        var chat = _chats.find(function (c) { return c._docId === sid; });
        renderChatDetail(chat, _activeMessages);
        console.log('[AdminConcierge] §60.1 sendMessage optimistic START', {
            sid: sid, tempId: tempId
        });

        // Optimistic update del parent (lastMessage + lastMessageAt)
        // para que la lista lateral re-ordene INSTANT.
        if (chat) {
            chat.lastMessage = text.slice(0, 80);
            chat.lastMessageAt = nowIso;
            renderChatList();
        }

        // §60.1 — Firestore subcollection en background
        window.db.collection('conciergeChats').doc(sid)
            .collection('messages').add(msg)
            .then(function (ref) {
                if (window.HubStore) {
                    window.HubStore.confirmMessage(tempId, Object.assign({
                        _docId: ref.id,
                        _sid: sid
                    }, msg));
                }
                var idx = _activeMessages.findIndex(function (m) {
                    return m._tempId === tempId;
                });
                if (idx >= 0) {
                    _activeMessages[idx]._status = 'sent';
                    _activeMessages[idx].firestoreId = ref.id;
                    // Solo re-render si el chat sigue activo (evita
                    // pisar otra vista si el admin navegó).
                    if (_activeSessionId === sid) {
                        renderChatDetail(_chats.find(function (c) {
                            return c._docId === sid;
                        }), _activeMessages);
                    }
                }
                console.log('[AdminConcierge] §60.1 sendMessage confirmed', {
                    tempId: tempId, firestoreId: ref.id
                });
            })
            .catch(function (err) {
                if (window.HubStore) {
                    window.HubStore.rollbackMessage(tempId, err && err.message);
                }
                var idx = _activeMessages.findIndex(function (m) {
                    return m._tempId === tempId;
                });
                if (idx >= 0) {
                    _activeMessages[idx]._status = 'failed';
                    _activeMessages[idx]._error = err && err.message;
                    if (_activeSessionId === sid) {
                        renderChatDetail(_chats.find(function (c) {
                            return c._docId === sid;
                        }), _activeMessages);
                    }
                }
                console.warn('[AdminConcierge] §60.1 sendMessage failed', {
                    tempId: tempId, error: err && err.message
                });
                if (AP.toast) {
                    AP.toast('Error al enviar. Tocá "Reintentar" en el mensaje.', 'error');
                }
            });

        // Update parent doc lastMessage + unread cliente — también background
        window.db.collection('conciergeChats').doc(sid).set({
            lastMessage: text.slice(0, 80),
            lastMessageAt: nowIso,
            unreadByUser: window.firebase && window.firebase.firestore ?
                window.firebase.firestore.FieldValue.increment(1) : 1
        }, { merge: true }).catch(function () {});
    }

    // §60.1 — Optimistic UI: banner "Conversación cerrada" aparece
    // INSTANT en el detail panel + system message pending en la lista
    // de mensajes. Las 2 escrituras Firestore (parent doc + system msg)
    // corren en background. Si fallan, rollback completo.
    function closeChat() {
        if (!_activeSessionId || !window.db) return;
        if (!confirm('¿Cerrar esta conversación?\n\nEl cliente verá un aviso de cierre y sólo podrá iniciar una conversación nueva. Los mensajes se conservan.')) return;
        var sid = _activeSessionId;
        var asesorNombre = (AP.currentUserProfile && AP.currentUserProfile.nombre) || 'Un asesor';
        var asesorUid = window.auth.currentUser.uid;
        var nowIso = new Date().toISOString();

        // §60.1 — OPTIMISTIC: snapshot + update local + render INSTANT
        var chat = _chats.find(function (c) { return c._docId === sid; });
        var snapshot = null;
        if (chat) {
            snapshot = {
                status: chat.status,
                closedAt: chat.closedAt,
                closedBy: chat.closedBy,
                closedByName: chat.closedByName,
                resolvedAt: chat.resolvedAt,
                resolvedBy: chat.resolvedBy,
                lastMessage: chat.lastMessage,
                lastMessageAt: chat.lastMessageAt
            };
            chat.status = 'closed';
            chat.closedAt = nowIso;
            chat.closedBy = asesorUid;
            chat.closedByName = asesorNombre;
            chat.resolvedAt = nowIso;
            chat.resolvedBy = asesorUid;
            chat.lastMessage = '✓ Conversación cerrada por ' + asesorNombre;
            chat.lastMessageAt = nowIso;
            renderChatList();
            renderChatDetail(chat, _activeMessages);
        }

        // Mensaje system optimistic — bubble aparece INSTANT
        var systemMsg = {
            from: 'system',
            systemType: 'closed',
            text: '✓ ' + asesorNombre + ' cerró esta conversación. Iniciá una nueva cuando quieras.',
            timestamp: nowIso,
            asesorNombre: asesorNombre,
            asesorUid: asesorUid
        };
        var tempId = window.HubStore
            ? window.HubStore.addMessageOptimistic(sid, systemMsg)
            : null;
        if (tempId) {
            _activeMessages.push(Object.assign({ _tempId: tempId, _status: 'pending' }, systemMsg));
            renderChatDetail(chat, _activeMessages);
        }
        console.log('[AdminConcierge] §60.1 closeChat optimistic START', { sid: sid });

        // 1. Marcar el doc parent como cerrado (Firestore background)
        var p1 = window.db.collection('conciergeChats').doc(sid).set({
            status: 'closed',
            closedAt: nowIso,
            closedBy: asesorUid,
            closedByName: asesorNombre,
            // Aliases legacy preservados para chats viejos en pipelines
            resolvedAt: nowIso,
            resolvedBy: asesorUid,
            // lastMessageAt actualizado para que el chat suba en la lista del admin
            lastMessageAt: nowIso,
            lastMessage: '✓ Conversación cerrada por ' + asesorNombre
        }, { merge: true });

        // 2. Insertar mensaje system "✓ Conversación cerrada por X"
        // El cliente lo recibirá vía onSnapshot y aplicará applyClosedState()
        var p2 = window.db.collection('conciergeChats').doc(sid)
            .collection('messages').add(systemMsg);

        Promise.all([p1, p2]).then(function (results) {
            var ref = results[1];
            if (window.HubStore && tempId) {
                window.HubStore.confirmMessage(tempId, Object.assign({
                    _docId: ref.id,
                    _sid: sid
                }, systemMsg));
            }
            var idx = _activeMessages.findIndex(function (m) { return m._tempId === tempId; });
            if (idx >= 0) {
                _activeMessages[idx]._status = 'sent';
                _activeMessages[idx].firestoreId = ref.id;
                if (_activeSessionId === sid) {
                    renderChatDetail(chat, _activeMessages);
                }
            }
            console.log('[AdminConcierge] §60.1 closeChat confirmed', { sid: sid });
            AP.toast('Conversación cerrada');
        }).catch(function (err) {
            // §60.1 — ROLLBACK
            if (snapshot && chat) {
                Object.assign(chat, snapshot);
                renderChatList();
                if (_activeSessionId === sid) {
                    renderChatDetail(chat, _activeMessages);
                }
            }
            if (window.HubStore && tempId) {
                window.HubStore.rollbackMessage(tempId, err && err.message);
                // El system message no es retry-able (es UX cosmético):
                // mejor removerlo del array para que no quede un msg
                // failed huérfano confundiendo al asesor.
                window.HubStore.removeMessageByTempId(tempId);
            }
            var idxFail = _activeMessages.findIndex(function (m) { return m._tempId === tempId; });
            if (idxFail >= 0) _activeMessages.splice(idxFail, 1);
            if (_activeSessionId === sid) {
                renderChatDetail(chat, _activeMessages);
            }
            console.warn('[AdminConcierge] §60.1 closeChat rollback', err && err.message);
            AP.toast('Error al cerrar: ' + err.message, 'error');
        });
    }

    /**
     * Reabre un chat cerrado: limpia status, agrega mensaje system y
     * permite al cliente continuar la conversación.
     *
     * §60.1 — Optimistic UI: banner cerrado desaparece INSTANT del
     * detail panel + system msg pending. Rollback completo si Firestore
     * rechaza.
     */
    function reopenChat() {
        if (!_activeSessionId || !window.db) return;
        if (!confirm('¿Reabrir esta conversación?\n\nEl cliente podrá volver a escribir aquí mismo.')) return;
        var sid = _activeSessionId;
        var asesorNombre = (AP.currentUserProfile && AP.currentUserProfile.nombre) || 'Un asesor';
        var asesorUid = window.auth.currentUser.uid;
        var nowIso = new Date().toISOString();

        // §60.1 — OPTIMISTIC: snapshot + update local + render INSTANT
        var chat = _chats.find(function (c) { return c._docId === sid; });
        var snapshot = null;
        if (chat) {
            snapshot = {
                status: chat.status,
                reopenedAt: chat.reopenedAt,
                reopenedBy: chat.reopenedBy,
                lastMessage: chat.lastMessage,
                lastMessageAt: chat.lastMessageAt
            };
            chat.status = 'active';
            chat.reopenedAt = nowIso;
            chat.reopenedBy = asesorUid;
            chat.lastMessage = '↻ Conversación reabierta por ' + asesorNombre;
            chat.lastMessageAt = nowIso;
            renderChatList();
            renderChatDetail(chat, _activeMessages);
        }

        var systemMsg = {
            from: 'system',
            systemType: 'reopened',
            text: '↻ ' + asesorNombre + ' reabrió la conversación. Podés seguir escribiendo.',
            timestamp: nowIso,
            asesorNombre: asesorNombre,
            asesorUid: asesorUid
        };
        var tempId = window.HubStore
            ? window.HubStore.addMessageOptimistic(sid, systemMsg)
            : null;
        if (tempId) {
            _activeMessages.push(Object.assign({ _tempId: tempId, _status: 'pending' }, systemMsg));
            renderChatDetail(chat, _activeMessages);
        }
        console.log('[AdminConcierge] §60.1 reopenChat optimistic START', { sid: sid });

        var p1 = window.db.collection('conciergeChats').doc(sid).set({
            status: 'active',
            reopenedAt: nowIso,
            reopenedBy: asesorUid,
            lastMessageAt: nowIso,
            lastMessage: '↻ Conversación reabierta por ' + asesorNombre
        }, { merge: true });

        var p2 = window.db.collection('conciergeChats').doc(sid)
            .collection('messages').add(systemMsg);

        Promise.all([p1, p2]).then(function (results) {
            var ref = results[1];
            if (window.HubStore && tempId) {
                window.HubStore.confirmMessage(tempId, Object.assign({
                    _docId: ref.id,
                    _sid: sid
                }, systemMsg));
            }
            var idx = _activeMessages.findIndex(function (m) { return m._tempId === tempId; });
            if (idx >= 0) {
                _activeMessages[idx]._status = 'sent';
                _activeMessages[idx].firestoreId = ref.id;
                if (_activeSessionId === sid) {
                    renderChatDetail(chat, _activeMessages);
                }
            }
            console.log('[AdminConcierge] §60.1 reopenChat confirmed', { sid: sid });
            AP.toast('Conversación reabierta');
        }).catch(function (err) {
            // §60.1 — ROLLBACK
            if (snapshot && chat) {
                Object.assign(chat, snapshot);
                renderChatList();
                if (_activeSessionId === sid) {
                    renderChatDetail(chat, _activeMessages);
                }
            }
            if (window.HubStore && tempId) {
                window.HubStore.rollbackMessage(tempId, err && err.message);
                window.HubStore.removeMessageByTempId(tempId);
            }
            var idxFail = _activeMessages.findIndex(function (m) { return m._tempId === tempId; });
            if (idxFail >= 0) _activeMessages.splice(idxFail, 1);
            if (_activeSessionId === sid) {
                renderChatDetail(chat, _activeMessages);
            }
            console.warn('[AdminConcierge] §60.1 reopenChat rollback', err && err.message);
            AP.toast('Error al reabrir: ' + err.message, 'error');
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

        // F.1 — Si el Cerebro AI está enabled, usar el callable summarizeChat
        // que genera un resumen vía LLM (mucho mejor calidad que extractivo).
        // Fallback al renderSummary local si falla.
        var brainEnabled = window.AltorraKB && window.AltorraKB.getBrain && (window.AltorraKB.getBrain() || {}).enabled;
        var sid = _activeSessionId;

        function localFallback() {
            window.db.collection('conciergeChats').doc(sid)
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

        if (brainEnabled && window.functions) {
            try {
                AP.toast('Generando resumen con IA…', 'info');
                var callable = window.functions.httpsCallable('summarizeChat');
                callable({ sessionId: sid }).then(function (res) {
                    var data = (res && res.data) || {};
                    if (data.success && data.summary) {
                        renderLLMSummary(chat, data.summary, data.turnsAnalyzed, data.usage);
                    } else if (data.skipped) {
                        AP.toast('Resumen IA omitido (' + data.reason + '). Generando local…', 'info');
                        localFallback();
                    } else {
                        localFallback();
                    }
                }).catch(function (err) {
                    console.warn('[summarizeChat] LLM failed:', err.message);
                    AP.toast('LLM falló — usando resumen local', 'warning');
                    localFallback();
                });
            } catch (e) {
                localFallback();
            }
        } else {
            localFallback();
        }
    }

    /**
     * F.1 — Render de un summary generado por LLM (un solo bloque de texto)
     * Se muestra en la misma área que el resumen extractivo local.
     */
    function renderLLMSummary(chat, summary, turnsAnalyzed, usage) {
        var detail = $('conciergeChatDetail');
        if (!detail) return;
        var modalHtml =
            '<div class="cnc-summary-overlay" id="cncSummaryOverlay">' +
                '<div class="cnc-summary-card">' +
                    '<div class="cnc-summary-head">' +
                        '<h3><i data-lucide="sparkles"></i> Resumen IA · ' + escTxt(chat.userNombre || 'Cliente') + '</h3>' +
                        '<button class="cnc-summary-close" data-action="close-summary" aria-label="Cerrar">×</button>' +
                    '</div>' +
                    '<div class="cnc-summary-body">' +
                        '<div class="cnc-summary-meta">' +
                            '<span><i data-lucide="message-circle"></i> ' + turnsAnalyzed + ' mensajes analizados</span>' +
                            (usage && usage.input_tokens ? '<span><i data-lucide="cpu"></i> ' + (usage.input_tokens + (usage.output_tokens || 0)) + ' tokens</span>' : '') +
                        '</div>' +
                        '<div class="cnc-summary-text">' + escTxt(summary).replace(/\n/g, '<br>') + '</div>' +
                    '</div>' +
                    '<div class="cnc-summary-actions">' +
                        '<button class="alt-btn alt-btn--ghost alt-btn--sm" data-action="copy-summary" data-text="' + escTxt(summary) + '">' +
                            '<i data-lucide="copy"></i> Copiar' +
                        '</button>' +
                        '<button class="alt-btn alt-btn--primary alt-btn--sm" data-action="close-summary">Cerrar</button>' +
                    '</div>' +
                '</div>' +
            '</div>';
        var existing = document.getElementById('cncSummaryOverlay');
        if (existing) existing.remove();
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        if (window.AltorraIcons && window.AltorraIcons.refresh) {
            window.AltorraIcons.refresh(document.getElementById('cncSummaryOverlay'));
        }
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
        // §60.1 — Reintentar envío de mensaje failed (Optimistic UI)
        var retryBtn = e.target && e.target.closest && e.target.closest('[data-action="retry-msg"]');
        if (retryBtn) {
            var failedTempId = retryBtn.getAttribute('data-temp-id');
            if (!failedTempId) return;
            console.log('[AdminConcierge] §60.1 retry-msg action', { tempId: failedTempId });
            // Buscar el mensaje failed en _activeMessages
            var failedIdx = _activeMessages.findIndex(function (m) {
                return m._tempId === failedTempId && m._status === 'failed';
            });
            if (failedIdx < 0) return;
            var failedMsg = _activeMessages[failedIdx];
            var retryText = failedMsg.text;
            // Remove la entry failed (UI + HubStore) — el reenvío crea una nueva pending
            _activeMessages.splice(failedIdx, 1);
            if (window.HubStore) window.HubStore.removeMessageByTempId(failedTempId);
            var chatRetry = _chats.find(function (c) { return c._docId === _activeSessionId; });
            renderChatDetail(chatRetry, _activeMessages);
            // Reusar el flow normal de send (con auto-claim si aplica)
            var input = $('cncAdminReply');
            if (input) {
                input.value = retryText;
                sendAsesorMessage();
            }
            return;
        }
        if (e.target && e.target.closest && e.target.closest('#cncAdminCloseChat')) {
            closeChat();
            return;
        }
        if (e.target && e.target.closest && e.target.closest('#cncAdminReopenChat')) {
            reopenChat();
            return;
        }
        // §23 FASE 3 — Liberar lock (solo super_admin)
        if (e.target && e.target.closest && e.target.closest('#cncAdminReleaseClaim')) {
            if (_activeSessionId) releaseClaim(_activeSessionId);
            return;
        }
        // §26.4 — Tomar conversación explícito (claim button gigante)
        if (e.target && e.target.closest && e.target.closest('#cncAdminClaimBtn')) {
            var sid = e.target.closest('#cncAdminClaimBtn').getAttribute('data-session-id') || _activeSessionId;
            if (!sid) return;
            claimChat(sid).then(function (r) {
                if (AP.toast) AP.toast('✓ Tomaste la conversación. Ya podés responder.', 'success');
                // Re-render se hace solo via onSnapshot del chat parent
            }).catch(function (err) {
                if (err && err.code === 'already-claimed') {
                    if (AP.toast) AP.toast((err.claimedByName || 'Otro asesor') + ' tomó este chat hace un momento. Refrescá para ver el estado actual.', 'warning');
                } else if (err && err.code === 'chat-closed') {
                    if (AP.toast) AP.toast('Este chat ya está cerrado', 'error');
                } else if (err && err.code === 'chat-not-found') {
                    if (AP.toast) AP.toast('No encontramos este chat en el servidor. Refrescá la lista.', 'error');
                } else if (err && (err.code === 'permission-denied' || (err.message && err.message.indexOf('Missing or insufficient permissions') >= 0))) {
                    // §60.1.1 — Permission-denied del servidor. Causas posibles:
                    // (1) Reglas de Firestore desactualizadas en producción
                    //     → super_admin debe ejecutar `firebase deploy --only firestore:rules`
                    // (2) El editor no tiene rol 'editor' o 'super_admin' en su doc usuarios/
                    //     → super_admin debe verificar en Firebase Console el rol del usuario
                    // (3) Otro asesor tomó el chat justo antes (race ms)
                    console.error('[AdminConcierge] §60.1.1 permission-denied al tomar chat', { sid: sid, err: err });
                    if (AP.toast) AP.toast('No tenés permisos para tomar este chat. Posibles causas: (1) reglas de Firebase desactualizadas, (2) tu rol no está bien configurado. Contactá al admin.', 'error', 9000);
                } else {
                    if (AP.toast) AP.toast('No se pudo tomar: ' + (err.message || err.code || 'error'), 'error');
                }
            });
            return;
        }
        // §26.4 — Transferir / liberar (super_admin desde botón mine)
        if (e.target && e.target.closest && e.target.closest('#cncAdminTransferBtn')) {
            var sid2 = e.target.closest('#cncAdminTransferBtn').getAttribute('data-session-id') || _activeSessionId;
            if (sid2 && confirm('¿Liberar esta conversación para que otro asesor la tome?')) {
                releaseClaim(sid2);
            }
            return;
        }
        if (e.target && e.target.closest && e.target.closest('#cncAdminSummarize')) {
            summarizeCurrentChat();
            return;
        }
        // F.1 — Cerrar overlay del summary IA
        if (e.target && e.target.closest && e.target.closest('[data-action="close-summary"]')) {
            var overlay = document.getElementById('cncSummaryOverlay');
            if (overlay) overlay.remove();
            return;
        }
        // F.1 — Copiar el summary al clipboard
        var copyBtn = e.target && e.target.closest && e.target.closest('[data-action="copy-summary"]');
        if (copyBtn) {
            var txt = copyBtn.getAttribute('data-text') || '';
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(txt).then(function () {
                    AP.toast('Resumen copiado al portapapeles', 'success');
                });
            }
            return;
        }
        // U.15 — Cleanup botón
        if (e.target && e.target.closest && e.target.closest('#cncCleanupOldBtn')) {
            cleanupOldChats().catch(function () {});
            return;
        }
        // §27.6 — Plantillas: abrir dropdown con plantillas del admin
        if (e.target && e.target.closest && e.target.closest('[data-action="open-templates"]')) {
            toggleTemplatesDropdown();
            return;
        }
        // §27.6 — Plantillas: aplicar plantilla seleccionada al input
        var tplItem = e.target.closest && e.target.closest('[data-tpl-text]');
        if (tplItem) {
            applyTemplate(tplItem.getAttribute('data-tpl-text'));
            return;
        }
        // Click fuera del dropdown → cerrar
        var dropdown = $('cncTemplatesDropdown');
        if (dropdown && !dropdown.hidden && !e.target.closest('.cnc-templates-dropdown')
            && !e.target.closest('[data-action="open-templates"]')) {
            dropdown.hidden = true;
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
            // §26.3 — Toggle body.altor-hub-active para activar el
            // layout fullscreen Telegram-style. La sección concierge
            // ocupa 100vh con sidebar admin de 56px collapsed.
            if (section === 'concierge') {
                document.body.classList.add('altor-hub-active');
                // §57.7 — el listener ya queda activo globalmente (no se
                // cancela al cambiar de sección). Solo asegurar que existe
                // por si el admin entra DIRECTO a sec-concierge sin pasar
                // por el auto-arranque (ej. deep-link).
                if (!_chatsUnsub) {
                    console.log('[AdminConcierge] §57.7 listener ausente al entrar a sec-concierge, iniciando');
                    startChatsListener();
                }
                // Auto-scroll al fondo cuando llegue el primer render
                setTimeout(scrollHubMessagesToBottom, 200);
            } else {
                document.body.classList.remove('altor-hub-active');
                document.body.classList.remove('altor-hub-pane-active');
            }
        });
    }

    /**
     * §57.7 — Heartbeat cada 30s.
     * Si el listener cae silenciosamente (network drop, error no propagado,
     * tab inactivo throttled), lo re-iniciamos automáticamente. Garantiza
     * que el admin SIEMPRE recibe chats nuevos en tiempo real sin necesidad
     * de refresh manual.
     */
    setInterval(function () {
        if (!window.auth || !window.auth.currentUser) return;
        if (!AP.isEditorOrAbove || !AP.isEditorOrAbove()) return;
        if (_chatsUnsub) return; // listener activo, todo OK
        console.warn('[AdminConcierge] §57.7 heartbeat: listener detected as null, restarting');
        startChatsListener();
    }, 30000);

    /* §26.3 — Auto-scroll inteligente a las messages del Hub.
       Solo auto-scrollea si el admin está cerca del fondo (últimos
       100px). Si está leyendo histórico arriba, NO interrumpe. */
    function scrollHubMessagesToBottom(force) {
        var box = document.querySelector('.cnc-admin-detail-messages');
        if (!box) return;
        var nearBottom = (box.scrollHeight - box.scrollTop - box.clientHeight) < 120;
        if (force || nearBottom) {
            box.scrollTop = box.scrollHeight;
        }
    }

    /* §26.3 — Mobile back button: vuelve a la lista desde el detalle */
    document.addEventListener('click', function (e) {
        if (e.target.closest && e.target.closest('#altorHubMobileBack')) {
            document.body.classList.remove('altor-hub-pane-active');
            _activeSessionId = null;
            if (_messagesUnsub) { try { _messagesUnsub(); } catch (err) {} _messagesUnsub = null; }
            renderChatDetail(null, []);
        }
    });

    /* §26.3 — Cuando se abre un chat en mobile, activa el pane */
    var _origOpenChat = window.AltorraAdminConcierge && window.AltorraAdminConcierge.openChat;
    window.addEventListener('altor-hub:chat-opened', function () {
        document.body.classList.add('altor-hub-pane-active');
        setTimeout(scrollHubMessagesToBottom, 100);
    });

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
       §27.6 — TEMPLATES integration in ALTOR Hub
       Plantillas del admin (config/messageTemplates Firestore via
       admin-templates.js) accesibles desde el chat detail con botón
       "📋 Plantillas". Resuelve variables {{nombre}}, {{vehiculo}},
       {{fecha}}, {{hora}}, {{tipo}} con datos del chat actual.
       ═══════════════════════════════════════════════════════════ */
    function toggleTemplatesDropdown() {
        var dropdown = $('cncTemplatesDropdown');
        if (!dropdown) return;
        if (!dropdown.hidden) { dropdown.hidden = true; return; }

        // Cargar plantillas desde AltorraTemplates (admin-templates.js)
        var templates = (window.AltorraTemplates && typeof window.AltorraTemplates.list === 'function')
            ? window.AltorraTemplates.list()
            : (AP.messageTemplates || []);

        if (!templates || templates.length === 0) {
            dropdown.innerHTML =
                '<div class="cnc-templates-empty">' +
                    '<i data-lucide="file-edit" style="width:24px;height:24px;opacity:0.5;"></i>' +
                    '<p style="margin:8px 0 4px;">Sin plantillas guardadas aún</p>' +
                    '<p style="font-size:0.75rem;opacity:0.6;margin:0;">Las plantillas del admin aparecerán aquí. Variables soportadas: <code>{{nombre}}</code>, <code>{{vehiculo}}</code>, <code>{{fecha}}</code>, <code>{{hora}}</code>, <code>{{tipo}}</code>.</p>' +
                '</div>';
        } else {
            dropdown.innerHTML = '<div class="cnc-templates-list">' +
                templates.map(function (t) {
                    var label = String(t.label || 'Plantilla').replace(/[<>]/g, '');
                    var text = String(t.text || '').replace(/[<>]/g, '');
                    var kind = t.kind ? '<span class="cnc-tpl-kind">' + escTxt(t.kind) + '</span>' : '';
                    return '<button class="cnc-tpl-item" data-tpl-text="' + escTxt(t.text || '') + '">' +
                        '<div class="cnc-tpl-head">' +
                            '<span class="cnc-tpl-label">' + escTxt(t.label || 'Plantilla') + '</span>' +
                            kind +
                        '</div>' +
                        '<div class="cnc-tpl-preview">' + escTxt((t.text || '').slice(0, 100)) + ((t.text || '').length > 100 ? '…' : '') + '</div>' +
                    '</button>';
                }).join('') +
            '</div>';
        }
        dropdown.hidden = false;
        if (window.AltorraIcons) window.AltorraIcons.refresh(dropdown);
    }

    /**
     * applyTemplate — resuelve variables del template con data del chat
     * actual y lo coloca en el input. NO envía automáticamente — el
     * asesor revisa y manda con click.
     *
     * Variables soportadas:
     *   {{nombre}}     → primer nombre del cliente
     *   {{vehiculo}}   → marca + modelo del vehículo del chat (si hay)
     *   {{fecha}}      → fecha actual formateada
     *   {{hora}}       → hora actual formateada
     *   {{tipo}}       → "cita" / "solicitud" / "lead" según contexto
     */
    function applyTemplate(rawText) {
        if (!rawText) return;
        var input = $('cncAdminReply');
        if (!input) return;
        var chat = _chats.find(function (c) { return c._docId === _activeSessionId; });

        var firstName = '';
        if (chat) {
            firstName = (chat.userNombre || '').split(' ')[0] || '';
        }

        // Vehiculo: si el chat tiene sourceVehicleId, intentar resolver
        var vehiculo = '';
        if (chat && chat.sourceVehicleId && AP.vehicles) {
            var v = AP.vehicles.find(function (x) { return String(x.id) === String(chat.sourceVehicleId); });
            if (v) vehiculo = (v.marca || '') + ' ' + (v.modelo || '') + ' ' + (v.year || '');
        }

        var now = new Date();
        var fecha = now.toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' });
        var hora = now.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
        var tipo = chat && chat.kind ? chat.kind : '';

        var resolved = String(rawText)
            .replace(/\{\{\s*nombre\s*\}\}/g, firstName || '[nombre]')
            .replace(/\{\{\s*vehiculo\s*\}\}/g, vehiculo.trim() || '[vehículo]')
            .replace(/\{\{\s*fecha\s*\}\}/g, fecha)
            .replace(/\{\{\s*hora\s*\}\}/g, hora)
            .replace(/\{\{\s*tipo\s*\}\}/g, tipo || '[tipo]');

        input.value = resolved;
        input.focus();

        // Cerrar dropdown
        var dropdown = $('cncTemplatesDropdown');
        if (dropdown) dropdown.hidden = true;

        if (AP.toast) AP.toast('Plantilla aplicada — revisá y enviá', 'info', 2500);
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
