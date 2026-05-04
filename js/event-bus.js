/**
 * ALTORRA CARS — Event Bus (Mega-Plan v4, Microfase I.1)
 * =========================================================
 * Centralized pub/sub for cross-module communication.
 *
 * Replaces ad-hoc CustomEvents and direct module-to-module calls.
 * Every meaningful action emits an event; modules listen and react
 * declaratively instead of calling each other.
 *
 * Event naming convention: domain.action
 *   vehicle.created, vehicle.updated, vehicle.deleted, vehicle.priced,
 *   comm.created, comm.assigned, comm.estado-changed, comm.replied,
 *   crm.contact-created, crm.score-changed, crm.tag-added,
 *   appointment.confirmed, appointment.cancelled, appointment.no-show,
 *   user.logged-in, user.logged-out, user.role-changed,
 *   ui.section-changed, ui.modal-opened
 *
 * Events have a typed payload. Types loosely structured:
 *   { id, type, payload, timestamp, by (uid), bySource (admin|public|system) }
 *
 * Persistence (Firestore events/ collection) is OPT-IN per event via
 * { persist: true } option. Reduces costs — only audit-relevant events
 * persist. Local listeners ALL receive everything regardless.
 *
 * Public API:
 *   AltorraEventBus.emit(type, payload, opts)
 *   AltorraEventBus.on(type | '*' | type-prefix, handler) → unsubscribe fn
 *   AltorraEventBus.once(type, handler)
 *   AltorraEventBus.off(type, handler)
 *   AltorraEventBus.history(filter)  → recent in-memory events
 *   AltorraEventBus.clear()           → wipes in-memory history
 *
 * The bus also dispatches the event as a window CustomEvent
 * (window.dispatchEvent(new CustomEvent('altorra:'+type, {detail}))) so
 * non-JS-imported listeners (script tags, devtools) can consume too.
 */
(function () {
    'use strict';
    if (window.AltorraEventBus) return;

    var MAX_HISTORY = 200;     // in-memory ring buffer of recent events
    var DEBUG = false;
    var listeners = new Map(); // type → Set<handler>
    var wildcards = new Set(); // listeners that receive ALL events
    var prefixListeners = new Map(); // 'vehicle.' → Set<handler>
    var history = [];          // recent events (newest last)

    function _id() {
        return 'evt_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
    }

    function _log() {
        if (!DEBUG) return;
        try { console.log.apply(console, ['[EventBus]'].concat([].slice.call(arguments))); }
        catch (e) {}
    }

    function _currentUser() {
        try {
            if (window.auth && window.auth.currentUser) return window.auth.currentUser.uid;
        } catch (e) {}
        return null;
    }

    function _bySource() {
        // Detect if we're in admin context
        return (window.AP || (window.location && /admin/.test(window.location.pathname)))
            ? 'admin' : 'public';
    }

    /* ═══════════════════════════════════════════════════════════
       EMIT
       ═══════════════════════════════════════════════════════════ */
    function emit(type, payload, opts) {
        if (!type) return null;
        opts = opts || {};
        var event = {
            id: _id(),
            type: type,
            payload: payload || null,
            timestamp: Date.now(),
            by: opts.by || _currentUser(),
            bySource: opts.bySource || _bySource()
        };

        _log('emit:', type, payload);

        // 1. Push to history ring buffer
        history.push(event);
        if (history.length > MAX_HISTORY) history.shift();

        // 2. Direct listeners
        var direct = listeners.get(type);
        if (direct) direct.forEach(function (fn) {
            try { fn(event); } catch (e) { console.warn('[EventBus] listener error:', e); }
        });

        // 3. Prefix listeners (e.g. 'vehicle.' matches 'vehicle.created')
        prefixListeners.forEach(function (set, prefix) {
            if (type.indexOf(prefix) === 0) {
                set.forEach(function (fn) {
                    try { fn(event); } catch (e) { console.warn('[EventBus] prefix listener error:', e); }
                });
            }
        });

        // 4. Wildcard listeners
        wildcards.forEach(function (fn) {
            try { fn(event); } catch (e) { console.warn('[EventBus] wildcard listener error:', e); }
        });

        // 5. DOM CustomEvent — for non-imported listeners
        try {
            window.dispatchEvent(new CustomEvent('altorra:' + type, { detail: event }));
        } catch (e) {}

        // 6. Optional Firestore persistence
        if (opts.persist === true) {
            _persistRemote(event);
        }

        return event;
    }

    /* ═══════════════════════════════════════════════════════════
       SUBSCRIBE
       Patterns:
         on('vehicle.created', fn)   — exact match
         on('vehicle.', fn)          — prefix match (any vehicle.* event)
         on('*', fn)                 — wildcard (every event)
       Returns an unsubscribe function.
       ═══════════════════════════════════════════════════════════ */
    function on(pattern, handler) {
        if (typeof handler !== 'function') return function () {};

        if (pattern === '*') {
            wildcards.add(handler);
            return function () { wildcards.delete(handler); };
        }
        if (pattern && pattern.endsWith && pattern.endsWith('.')) {
            // Prefix
            if (!prefixListeners.has(pattern)) prefixListeners.set(pattern, new Set());
            prefixListeners.get(pattern).add(handler);
            return function () {
                var s = prefixListeners.get(pattern);
                if (s) s.delete(handler);
            };
        }
        // Exact
        if (!listeners.has(pattern)) listeners.set(pattern, new Set());
        listeners.get(pattern).add(handler);
        return function () {
            var s = listeners.get(pattern);
            if (s) s.delete(handler);
        };
    }

    function once(pattern, handler) {
        var unsub = on(pattern, function (event) {
            unsub();
            try { handler(event); } catch (e) { console.warn('[EventBus] once handler error:', e); }
        });
        return unsub;
    }

    function off(pattern, handler) {
        if (pattern === '*') {
            if (handler) wildcards.delete(handler);
            else wildcards.clear();
            return;
        }
        if (pattern && pattern.endsWith && pattern.endsWith('.')) {
            var s = prefixListeners.get(pattern);
            if (s) {
                if (handler) s.delete(handler);
                else s.clear();
            }
            return;
        }
        var direct = listeners.get(pattern);
        if (direct) {
            if (handler) direct.delete(handler);
            else direct.clear();
        }
    }

    /* ═══════════════════════════════════════════════════════════
       HISTORY (in-memory) — for I.5 replay/debugging
       ═══════════════════════════════════════════════════════════ */
    function getHistory(filter) {
        if (!filter) return history.slice();
        if (typeof filter === 'string') {
            return history.filter(function (e) {
                return e.type === filter || e.type.indexOf(filter) === 0;
            });
        }
        if (typeof filter === 'function') {
            return history.filter(filter);
        }
        return history.slice();
    }

    function clear() {
        history.length = 0;
    }

    /* ═══════════════════════════════════════════════════════════
       FIRESTORE PERSISTENCE (opt-in)
       Persisted events are queryable in admin Activity Feed (I.2)
       and can be replayed (I.5).
       ═══════════════════════════════════════════════════════════ */
    function _persistRemote(event) {
        if (!window.db) return;
        try {
            window.db.collection('events').doc(event.id).set({
                id: event.id,
                type: event.type,
                payload: event.payload,
                timestamp: new Date(event.timestamp),
                by: event.by || null,
                bySource: event.bySource
            }).catch(function () { /* best-effort */ });
        } catch (e) {}
    }

    /* ═══════════════════════════════════════════════════════════
       Public API
       ═══════════════════════════════════════════════════════════ */
    window.AltorraEventBus = {
        emit: emit,
        on: on,
        once: once,
        off: off,
        history: getHistory,
        clear: clear,
        _setDebug: function (b) { DEBUG = !!b; },
        _state: function () { return { listeners: listeners, wildcards: wildcards, prefixListeners: prefixListeners, history: history }; }
    };

    // Convenience aliases
    window.altorraEmit = emit;
    window.altorraOn = on;
})();
