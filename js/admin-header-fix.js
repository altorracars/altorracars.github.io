/**
 * ALTORRA CARS — Header Fix v4 (no-intercept, defensive only)
 * ============================================================
 *
 * Los 3 botones del header tienen sus propios listeners nativos:
 *   - #activityFeedTrigger: document listener en admin-activity-feed.js:540
 *   - #headerNotifBell .altorra-bell: button listener en toast.js:1027
 *   - #altorra-voice-btn: button listener en admin-voice.js:413
 *
 * Esos listeners SIEMPRE funcionan si el click llega al botón o al
 * document. El problema reportado ("no funcionan a veces") es por
 * overlays invisibles (z-index 9000+) que capturan el click antes
 * de que llegue al document/botón.
 *
 * Estrategia: defense-in-depth, sin interceptar:
 *   1. Cleanup periódico de overlays huérfanos (z-index alto, sin
 *      clase activa esperada → ocultar y desactivar pointer-events).
 *   2. CSS z-index 99999 en los botones (en admin.css) — los pone
 *      por encima de cualquier overlay.
 *   3. NO bind nuevos handlers — los nativos funcionan solos.
 *   4. Diagnostic tools para que el usuario reporte overlays
 *      sospechosos cuando los botones fallen.
 *
 * Diagnostic:
 *   window.__altorraHeaderDiag()   → reporte completo
 *   window.__altorraDebugClicks    → loga cada click + path
 *   window.__altorraClickPath(x,y) → lista elementos en (x,y)
 */
(function () {
    'use strict';
    if (window.__altorraHeaderFixed) return;
    window.__altorraHeaderFixed = true;

    /* ═══════════════════════════════════════════════════════════
       1. CLEANUP DE OVERLAYS HUÉRFANOS
       ═══════════════════════════════════════════════════════════ */
    var WHITELIST_IDS = [
        'altorra-concierge', 'altorra-concierge-btn',
        'aaf-panel', 'alt-presence-overlay',
        'altorra-voice-btn', 'altorra-voice-overlay',
        'header-placeholder', 'adminPanel',
        'altorra-update-banner', 'page-loader',
        'loginScreen', 'loginPanel',
        'authLoadingScreen', 'auth-loading-screen',
        'app', 'main', 'wrap',
        'alt-onboard', 'alt-palette', 'alt-sec-modal',
        'altorra-optin', 'cncSummaryWrap',
        'alt-native-invite', 'alt-offline-banner'
    ];
    var WHITELIST_CLASSES = [
        'altorra-notify-center', 'altorra-notify',
        'altorra-notify-stack', 'altorra-bell',
        'altorra-spotlight', 'modal-overlay',
        'sidebar-overlay', 'crm-detail-panel',
        'auth-modal-backdrop', 'altorra-auth-modal'
    ];
    var ACTIVE_CLASSES = ['active', 'open', 'visible', 'aaf-open',
                          'alt-palette-open', 'alt-voice-active',
                          'is-active', 'cnc-open',
                          'altorra-notify-center--open'];

    function hasProtectedClass(el) {
        for (var i = 0; i < WHITELIST_CLASSES.length; i++) {
            if (el.classList && el.classList.contains(WHITELIST_CLASSES[i])) return true;
        }
        return false;
    }

    function cleanupOverlays() {
        Array.prototype.slice.call(document.body.children).forEach(function (el) {
            if (!el.tagName) return;
            if (el.tagName !== 'DIV' && el.tagName !== 'ASIDE' && el.tagName !== 'SECTION') return;
            if (el.id && WHITELIST_IDS.indexOf(el.id) !== -1) return;
            if (hasProtectedClass(el)) return;
            var cs;
            try { cs = getComputedStyle(el); } catch (e) { return; }
            if (cs.position !== 'fixed') return;
            var z = parseInt(cs.zIndex, 10);
            if (isNaN(z) || z < 9000) return;
            if (cs.display === 'none' || cs.pointerEvents === 'none') return;
            if (ACTIVE_CLASSES.some(function (c) { return el.classList.contains(c); })) return;
            // Sospechoso. Hide.
            el.style.pointerEvents = 'none';
            el.style.display = 'none';
            console.warn('[HeaderFix] Hidden suspected overlay:', el.id || el.className);
        });
    }

    /* ═══════════════════════════════════════════════════════════
       2. DIAGNOSTIC TOOLS
       ═══════════════════════════════════════════════════════════ */
    window.__altorraClickPath = function (x, y) {
        var path = (document.elementsFromPoint && document.elementsFromPoint(x, y)) || [];
        return path.slice(0, 10).map(function (el, i) {
            try {
                var cs = getComputedStyle(el);
                return {
                    rank: i,
                    tag: el.tagName,
                    id: el.id || '',
                    cls: (el.className || '').toString().substr(0, 60),
                    zIndex: cs.zIndex,
                    pointerEvents: cs.pointerEvents
                };
            } catch (e) { return { error: String(e) }; }
        });
    };

    document.addEventListener('click', function (e) {
        if (!window.__altorraDebugClicks) return;
        console.log('[ClickDebug]', {
            x: e.clientX, y: e.clientY,
            target: e.target.tagName + (e.target.id ? '#' + e.target.id : ''),
            path: window.__altorraClickPath(e.clientX, e.clientY)
        });
    }, true);

    window.__altorraHeaderDiag = function () {
        var report = {
            buttons: {},
            apis: {
                AltorraActivityFeed: !!window.AltorraActivityFeed,
                notifyCenter: !!window.notifyCenter,
                AltorraVoice: !!window.AltorraVoice,
                bellMounted: !!document.querySelector('.altorra-bell'),
                panelMounted: !!document.querySelector('.altorra-notify-center')
            },
            highZOverlays: []
        };
        ['activityFeedTrigger', 'headerNotifBell', 'altorra-voice-btn'].forEach(function (id) {
            var el = document.getElementById(id);
            if (!el) {
                report.buttons[id] = { exists: false };
                return;
            }
            var rect = el.getBoundingClientRect();
            // Test elementFromPoint en el centro del botón
            var cx = rect.left + rect.width / 2;
            var cy = rect.top + rect.height / 2;
            var topEl = document.elementFromPoint(cx, cy);
            var topInfo = topEl ? (topEl.tagName + (topEl.id ? '#' + topEl.id : '') +
                                   (topEl.className ? '.' + (topEl.className + '').substr(0, 30) : '')) : 'null';
            report.buttons[id] = {
                exists: true,
                rect: rect,
                topElementAtCenter: topInfo,
                isCovered: topEl !== el && !el.contains(topEl) && !topEl.closest(el.id ? '#' + el.id : '__'),
            };
        });
        Array.prototype.slice.call(document.body.children).forEach(function (el) {
            try {
                var cs = getComputedStyle(el);
                if (cs.position !== 'fixed') return;
                var z = parseInt(cs.zIndex, 10);
                if (isNaN(z) || z < 9000) return;
                report.highZOverlays.push({
                    id: el.id || '(no-id)',
                    class: (el.className || '').toString().substr(0, 60),
                    zIndex: z,
                    display: cs.display,
                    pointerEvents: cs.pointerEvents
                });
            } catch (e) {}
        });
        console.table(report.buttons);
        console.log('APIs:', report.apis);
        console.table(report.highZOverlays);
        return report;
    };

    /* ═══════════════════════════════════════════════════════════
       3. INIT — cleanup puntual al cargar y a 2s/5s
       ═══════════════════════════════════════════════════════════ */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', cleanupOverlays);
    } else {
        cleanupOverlays();
    }
    setTimeout(cleanupOverlays, 2000);
    setTimeout(cleanupOverlays, 5000);

    console.info('[HeaderFix] v4 instalado — cleanup defensivo. Handlers nativos de cada botón se encargan de los clicks.');
})();
