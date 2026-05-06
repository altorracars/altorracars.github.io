/**
 * ALTORRA CARS — Header Fix v5 (DEFINITIVO)
 * ==========================================
 *
 * SOLUCIÓN DE FONDO al problema de clicks que no responden al primer
 * intento en los botones del header (actividad, micrófono, campana).
 *
 * CAUSA RAÍZ DEL BUG:
 *   Cada botón tenía su propio handler nativo, pero esos handlers
 *   vivían en `document.addEventListener('click')` en bubble phase.
 *   El evento click tenía que recorrer TODO el DOM tree desde el
 *   target hasta el document. Cualquier listener intermedio que
 *   llamara `e.stopPropagation()` — o cualquier overlay que capturara
 *   el click ANTES — hacía que el handler nativo nunca se ejecutara.
 *   Síntoma: clicks "perdidos" intermitentemente.
 *
 * SOLUCIÓN v5:
 *   Listeners DIRECTAMENTE en cada botón (no en document).
 *   `stopImmediatePropagation()` evita que CUALQUIER otro handler
 *   corra después y cause doble toggle.
 *   MutationObserver: re-bind cuando bell/voice se montan tarde.
 *
 * BOTONES:
 *   - #activityFeedTrigger      → AltorraActivityFeed.toggle
 *   - #headerNotifBell .bell    → notifyCenter.togglePanel  (público en v5)
 *   - #altorra-voice-btn        → AltorraVoice.toggle
 *
 * Diagnostic: window.__altorraHeaderDiag()
 */
(function () {
    'use strict';
    if (window.__altorraHeaderFixed) return;
    window.__altorraHeaderFixed = true;

    /* ═══════════════════════════════════════════════════════════
       1. BIND DIRECTO POR BOTÓN — listener en el botón mismo
       ═══════════════════════════════════════════════════════════ */
    var BUTTONS = [
        {
            selector: '#activityFeedTrigger',
            action: function () {
                if (window.AltorraActivityFeed && window.AltorraActivityFeed.toggle) {
                    window.AltorraActivityFeed.toggle();
                } else {
                    console.warn('[HeaderFix] AltorraActivityFeed no disponible');
                }
            }
        },
        {
            selector: '#altorra-voice-btn',
            action: function () {
                if (window.AltorraVoice && window.AltorraVoice.toggle) {
                    window.AltorraVoice.toggle();
                } else {
                    console.warn('[HeaderFix] AltorraVoice no disponible');
                }
            }
        },
        {
            // El bell vive DENTRO de #headerNotifBell, lo monta toast.js mount()
            selector: '#headerNotifBell .altorra-bell',
            action: function () {
                if (window.notifyCenter && window.notifyCenter.togglePanel) {
                    window.notifyCenter.togglePanel();
                } else {
                    console.warn('[HeaderFix] notifyCenter.togglePanel no disponible');
                }
            }
        }
    ];

    function bindButton(spec) {
        var btn = document.querySelector(spec.selector);
        if (!btn) return false;
        if (btn._headerFixV5Bound) return true;
        btn._headerFixV5Bound = true;

        btn.addEventListener('click', function (e) {
            // stopImmediatePropagation: evita que CUALQUIER otro handler
            // del mismo elemento (ej. el listener nativo del bell en
            // toast.js:1027) corra después y haga doble-toggle.
            e.stopImmediatePropagation();
            e.stopPropagation();
            try {
                spec.action();
            } catch (err) {
                console.error('[HeaderFix] Error en acción de', spec.selector, err);
            }
        }, false);
        return true;
    }

    function bindAll() {
        BUTTONS.forEach(bindButton);
    }

    /* ═══════════════════════════════════════════════════════════
       2. MUTATION OBSERVER — re-bind cuando elementos se montan tarde
       ═══════════════════════════════════════════════════════════ */
    var observer = null;
    var lastBindAttempt = 0;
    function startObserver() {
        if (observer || !window.MutationObserver) return;
        observer = new MutationObserver(function (mutations) {
            // Throttle a max 1 bind cada 100ms para no saturar
            var now = Date.now();
            if (now - lastBindAttempt < 100) return;
            for (var i = 0; i < mutations.length; i++) {
                if (mutations[i].addedNodes && mutations[i].addedNodes.length > 0) {
                    lastBindAttempt = now;
                    bindAll();
                    return;
                }
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    /* ═══════════════════════════════════════════════════════════
       3. CLEANUP DE OVERLAYS HUÉRFANOS (defense-in-depth)
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
            el.style.pointerEvents = 'none';
            el.style.display = 'none';
            console.warn('[HeaderFix] Hidden suspected overlay:', el.id || el.className);
        });
    }

    /* ═══════════════════════════════════════════════════════════
       4. DIAGNOSTIC TOOLS
       ═══════════════════════════════════════════════════════════ */
    window.__altorraClickPath = function (x, y) {
        var path = (document.elementsFromPoint && document.elementsFromPoint(x, y)) || [];
        return path.slice(0, 10).map(function (el, i) {
            try {
                var cs = getComputedStyle(el);
                return {
                    rank: i, tag: el.tagName,
                    id: el.id || '',
                    cls: (el.className || '').toString().substr(0, 60),
                    zIndex: cs.zIndex, pointerEvents: cs.pointerEvents
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
                notifyCenterTogglePanel: !!(window.notifyCenter && window.notifyCenter.togglePanel),
                AltorraVoice: !!window.AltorraVoice
            },
            highZOverlays: []
        };
        BUTTONS.forEach(function (spec) {
            var el = document.querySelector(spec.selector);
            if (!el) {
                report.buttons[spec.selector] = { exists: false };
                return;
            }
            var rect = el.getBoundingClientRect();
            var cx = rect.left + rect.width / 2;
            var cy = rect.top + rect.height / 2;
            var topEl = document.elementFromPoint(cx, cy);
            report.buttons[spec.selector] = {
                exists: true,
                bound: !!el._headerFixV5Bound,
                topAtCenter: topEl ? (topEl.tagName + (topEl.id ? '#' + topEl.id : '') + '.' + (topEl.className + '').substr(0, 30)) : 'null',
                isCovered: topEl !== el && !el.contains(topEl)
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
                    zIndex: z, display: cs.display, pointerEvents: cs.pointerEvents
                });
            } catch (e) {}
        });
        console.table(report.buttons);
        console.log('APIs:', report.apis);
        console.table(report.highZOverlays);
        return report;
    };

    /* ═══════════════════════════════════════════════════════════
       5. INIT
       ═══════════════════════════════════════════════════════════ */
    function init() {
        cleanupOverlays();
        bindAll();
        startObserver();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    setTimeout(function () { bindAll(); cleanupOverlays(); }, 1000);
    setTimeout(function () { bindAll(); cleanupOverlays(); }, 3000);

    console.info('[HeaderFix] v5 instalado — listeners directos en cada botón con stopImmediatePropagation.');
})();
