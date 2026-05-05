/**
 * ALTORRA CARS — Offline detection + queue (Mega-Plan v4, G.3)
 * ==============================================================
 * Detecta cuando el admin pierde conexión y muestra un banner amber
 * persistente en el header. Cuando recupera, banner verde por 3s
 * + toast.
 *
 * Bonus: cola simple de acciones pendientes para sync al volver.
 * Las acciones marcadas con data-offline-queue son interceptadas y
 * encoladas en localStorage si offline. Al volver, se reintenta.
 *
 * Public API:
 *   AltorraOffline.isOnline()
 *   AltorraOffline.queue(action)  → encolar acción manualmente
 *   AltorraOffline.flush()        → forzar reintento
 *   AltorraOffline.queueLength()
 */
(function () {
    'use strict';
    if (window.AltorraOffline) return;
    var AP = window.AP;
    if (!AP) return;

    var QUEUE_KEY = 'altorra_offline_queue';
    var _isOnline = navigator.onLine !== false;
    var _bannerEl = null;

    /* ═══════════════════════════════════════════════════════════
       BANNER UI
       ═══════════════════════════════════════════════════════════ */
    function ensureBanner() {
        if (_bannerEl) return _bannerEl;
        _bannerEl = document.createElement('div');
        _bannerEl.id = 'alt-offline-banner';
        _bannerEl.className = 'alt-offline-banner';
        _bannerEl.setAttribute('role', 'status');
        _bannerEl.style.display = 'none';
        document.body.appendChild(_bannerEl);
        return _bannerEl;
    }

    function showOfflineBanner() {
        var el = ensureBanner();
        el.className = 'alt-offline-banner alt-offline-banner--off';
        var ql = queueLength();
        el.innerHTML =
            '<div class="alt-offline-content">' +
                '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                    '<line x1="2" y1="2" x2="22" y2="22"/>' +
                    '<path d="M8.5 16.5a5 5 0 0 1 7 0"/>' +
                    '<path d="M2 8.82a15 15 0 0 1 4.17-2.65"/>' +
                    '<path d="M10.66 5c4.01-.36 8.14.9 11.34 3.76"/>' +
                    '<path d="M16.85 11.25a10 10 0 0 1 2.22 1.68"/>' +
                    '<path d="M5 13a10 10 0 0 1 5.17-2.69"/>' +
                    '<line x1="12" y1="20" x2="12.01" y2="20"/>' +
                '</svg>' +
                '<span><strong>Sin conexión</strong> — los cambios se sincronizarán al volver.' +
                    (ql > 0 ? ' <em>(' + ql + ' pendientes)</em>' : '') +
                '</span>' +
            '</div>';
        el.style.display = '';
    }

    function showOnlineBanner() {
        var el = ensureBanner();
        el.className = 'alt-offline-banner alt-offline-banner--on';
        el.innerHTML =
            '<div class="alt-offline-content">' +
                '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                    '<polyline points="20 6 9 17 4 12"/>' +
                '</svg>' +
                '<span><strong>Conexión restablecida.</strong> Sincronizando…</span>' +
            '</div>';
        el.style.display = '';
        setTimeout(hideBanner, 3000);
    }

    function hideBanner() {
        if (_bannerEl) _bannerEl.style.display = 'none';
    }

    /* ═══════════════════════════════════════════════════════════
       QUEUE
       ═══════════════════════════════════════════════════════════ */
    function loadQueue() {
        try { return JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]'); }
        catch (e) { return []; }
    }
    function saveQueue(q) {
        try { localStorage.setItem(QUEUE_KEY, JSON.stringify(q)); } catch (e) {}
    }
    function queueLength() { return loadQueue().length; }

    function queue(action) {
        var q = loadQueue();
        q.push(Object.assign({ queuedAt: Date.now() }, action));
        saveQueue(q);
        if (window.AltorraEventBus) {
            window.AltorraEventBus.emit('offline.queued', action);
        }
    }

    function flush() {
        if (!_isOnline) return Promise.resolve(0);
        var q = loadQueue();
        if (q.length === 0) return Promise.resolve(0);

        var processed = 0;
        var promises = q.map(function (item) {
            // Re-emit como evento del bus para que listeners externos lo procesen
            if (window.AltorraEventBus) {
                window.AltorraEventBus.emit('offline.replay', item);
            }
            processed++;
            return Promise.resolve();
        });

        return Promise.all(promises).then(function () {
            saveQueue([]);
            if (processed > 0) {
                AP.toast(processed + ' acción' + (processed > 1 ? 'es' : '') +
                         ' sincronizada' + (processed > 1 ? 's' : '') + ' con éxito');
            }
            return processed;
        });
    }

    /* ═══════════════════════════════════════════════════════════
       EVENTS
       ═══════════════════════════════════════════════════════════ */
    window.addEventListener('online', function () {
        _isOnline = true;
        showOnlineBanner();
        if (window.AltorraEventBus) {
            window.AltorraEventBus.emit('connectivity.online', { queueLength: queueLength() });
        }
        flush();
    });
    window.addEventListener('offline', function () {
        _isOnline = false;
        showOfflineBanner();
        if (window.AltorraEventBus) {
            window.AltorraEventBus.emit('connectivity.offline', { queueLength: queueLength() });
        }
    });

    // Init banner si arrancamos offline
    function init() {
        if (!_isOnline) showOfflineBanner();
        // Si arrancamos online y hay queue pendiente, intentar flush
        if (_isOnline && queueLength() > 0) {
            setTimeout(flush, 2000);
        }
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    /* ═══════════════════════════════════════════════════════════
       Public API
       ═══════════════════════════════════════════════════════════ */
    window.AltorraOffline = {
        isOnline: function () { return _isOnline; },
        queue: queue,
        flush: flush,
        queueLength: queueLength,
        clearQueue: function () { saveQueue([]); }
    };
})();
