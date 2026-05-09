/**
 * §60.1 — HubStore (Object Pool in-memory estilo Linear)
 *
 * Single source of truth in-memory para el ALTOR Hub admin. Reemplaza
 * progresivamente el cache `_activeMessages` que vivía suelto en
 * admin-concierge.js (§57.ter). Habilita Optimistic UI universal:
 *
 *   - addMessageOptimistic(sid, msg)  → agrega con _status:'pending'
 *                                       y devuelve _tempId
 *   - confirmMessage(tempId, server)  → marca _status:'sent'
 *   - rollbackMessage(tempId, error)  → marca _status:'failed'
 *
 * Subscribers reaccionan vía notify() para re-render. NO renderiza por
 * sí mismo (UI layer lo hace) y NO escribe a Firestore (caller lo hace).
 *
 * Diseñado para co-existir con `_activeMessages` durante S1 (compat
 * gradual). Migración total al store en S2.
 *
 * Reglas inquebrantables:
 *  - Cero MutationObserver subtree:true (§17.12).
 *  - Cero pointermove persistente (§35).
 *  - try/catch en cada subscriber (un fallo no rompe el bus).
 *
 * Doctrina aplicada:
 *  - §17 Performance (sólo memoria + Maps O(1))
 *  - §17.12 Anti-MutationObserver
 *  - §19 RCA estricto
 *  - §37 IAP
 */
(function () {
    'use strict';

    if (window.HubStore) return; // idempotent boot

    var _chats = new Map();      // sid → chat metadata
    var _messages = new Map();    // sid → array de messages
    var _pending = new Map();     // tempId → { action, sid, msg }
    var _listeners = new Set();   // observers para re-render

    function notify(event, payload) {
        _listeners.forEach(function (fn) {
            try { fn(event, payload); } catch (e) {
                console.warn('[HubStore] §60.1 listener error:', e && e.message);
            }
        });
    }

    function genTempId() {
        return 'tmp_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
    }

    window.HubStore = {
        // ─── Reads ─────────────────────────────────────────────────
        getChat: function (sid) { return _chats.get(sid); },
        getMessages: function (sid) { return _messages.get(sid) || []; },
        getAllChats: function () { return Array.from(_chats.values()); },
        hasPending: function (tempId) { return _pending.has(tempId); },

        // ─── Writes (chat metadata) ────────────────────────────────
        upsertChat: function (chat) {
            if (!chat) return;
            var sid = chat._docId || chat.sessionId;
            if (!sid) return;
            _chats.set(sid, chat);
            notify('chat_updated', chat);
        },

        removeChat: function (sid) {
            if (!sid) return;
            _chats.delete(sid);
            _messages.delete(sid);
            notify('chat_removed', { sid: sid });
        },

        // ─── Optimistic mutations ──────────────────────────────────
        addMessageOptimistic: function (sid, msg) {
            if (!sid || !msg) return null;
            var tempId = genTempId();
            // No mutamos el objeto original — clonamos para que el
            // caller pueda enviar `msg` raw a Firestore sin _tempId/_status.
            var stored = Object.assign({}, msg, {
                _tempId: tempId,
                _status: 'pending'
            });
            var arr = _messages.get(sid) || [];
            arr.push(stored);
            _messages.set(sid, arr);
            _pending.set(tempId, { action: 'add', sid: sid, msg: stored });
            console.log('[HubStore] §60.1 addMessageOptimistic', { sid: sid, tempId: tempId });
            notify('message_added', { sid: sid, msg: stored, tempId: tempId });
            return tempId;
        },

        confirmMessage: function (tempId, serverMsg) {
            if (!tempId) return;
            var pending = _pending.get(tempId);
            if (!pending) {
                // Edge case: snapshot del server llegó antes de que
                // confirm corra (poco probable pero posible). Append
                // como synced si el caller pasó _sid en serverMsg.
                if (serverMsg && serverMsg._sid) {
                    var arr = _messages.get(serverMsg._sid) || [];
                    arr.push(Object.assign({ _status: 'synced' }, serverMsg));
                    _messages.set(serverMsg._sid, arr);
                    notify('message_added', { sid: serverMsg._sid, msg: serverMsg });
                }
                return;
            }
            var arr = _messages.get(pending.sid) || [];
            var idx = arr.findIndex(function (m) { return m._tempId === tempId; });
            if (idx >= 0) {
                arr[idx] = Object.assign({}, serverMsg || {}, {
                    _tempId: tempId,
                    _status: 'synced'
                });
                _messages.set(pending.sid, arr);
                console.log('[HubStore] §60.1 confirmMessage', { tempId: tempId, firestoreId: serverMsg && serverMsg._docId });
                notify('message_synced', { sid: pending.sid, msg: arr[idx], tempId: tempId });
            }
            _pending.delete(tempId);
        },

        rollbackMessage: function (tempId, error) {
            if (!tempId) return;
            var pending = _pending.get(tempId);
            if (!pending) return;
            var arr = _messages.get(pending.sid) || [];
            var idx = arr.findIndex(function (m) { return m._tempId === tempId; });
            if (idx >= 0) {
                arr[idx]._status = 'failed';
                arr[idx]._error = error || 'unknown';
                _messages.set(pending.sid, arr);
                console.log('[HubStore] §60.1 rollbackMessage', { tempId: tempId, error: error });
                notify('message_failed', {
                    sid: pending.sid,
                    msg: arr[idx],
                    error: error,
                    tempId: tempId
                });
            }
            _pending.delete(tempId);
        },

        // Util para retry — devuelve el msg original sin _tempId/_status
        getPendingMessage: function (tempId) {
            var pending = _pending.get(tempId);
            if (!pending) {
                // Buscar en messages como failed
                var found = null;
                _messages.forEach(function (arr) {
                    arr.forEach(function (m) {
                        if (m._tempId === tempId && m._status === 'failed') found = m;
                    });
                });
                return found;
            }
            return pending.msg;
        },

        // Remueve una entry (usado al hacer retry — limpia la failed
        // antes de re-enviar como nueva pending).
        removeMessageByTempId: function (tempId) {
            if (!tempId) return null;
            var removedSid = null;
            _messages.forEach(function (arr, sid) {
                var idx = arr.findIndex(function (m) { return m._tempId === tempId; });
                if (idx >= 0) {
                    arr.splice(idx, 1);
                    _messages.set(sid, arr);
                    removedSid = sid;
                }
            });
            _pending.delete(tempId);
            if (removedSid) notify('message_removed', { sid: removedSid, tempId: tempId });
            return removedSid;
        },

        // ─── Subscriptions ─────────────────────────────────────────
        subscribe: function (fn) {
            if (typeof fn !== 'function') return function () {};
            _listeners.add(fn);
            return function unsub() { _listeners.delete(fn); };
        },

        // ─── Debug ─────────────────────────────────────────────────
        _debug: function () {
            return {
                chats: _chats.size,
                messages: Array.from(_messages.entries()).map(function (e) {
                    return { sid: e[0], count: e[1].length };
                }),
                pending: _pending.size,
                listeners: _listeners.size
            };
        }
    };

    console.log('[HubStore] §60.1 ready');
})();
