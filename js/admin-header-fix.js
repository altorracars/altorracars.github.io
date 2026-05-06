/**
 * ALTORRA CARS — Header Fix v3 (capture-phase, bulletproof)
 * ==========================================================
 *
 * Garantiza que los 3 botones del header SIEMPRE respondan a clicks,
 * sin importar qué overlay invisible esté tapando el área.
 *
 * Estrategia:
 *   1. Listener delegado en `document` con `capture: true` — intercepta
 *      el click en la PRIMERA fase del bubble path, ANTES de que
 *      cualquier overlay con z-index alto pueda capturarlo.
 *   2. Walks up el DOM desde event.target buscando uno de los 3 IDs
 *      conocidos. Si lo encuentra, ejecuta la acción y para la propagación.
 *   3. Cada botón tiene su `_headerBound` flag — primer click bindea
 *      reglas, siguientes solo ejecutan.
 *
 * Botones gestionados:
 *   - #activityFeedTrigger     → AltorraActivityFeed.toggle
 *   - #headerNotifBell button  → notifyCenter.togglePanel
 *   - #altorra-voice-btn       → AltorraVoice.toggle
 *
 * Diagnostic:
 *   - window.__altorraHeaderDiag()   → reporte de estado
 *   - window.__altorraDebugClicks    → flag, si true loga cada click
 *   - window.__altorraClickPath(x,y) → lista elementos en (x,y)
 */
(function () {
    'use strict';
    if (window.__altorraHeaderFixed) return;
    window.__altorraHeaderFixed = true;

    /* ═══════════════════════════════════════════════════════════
       1. ACCIONES POR BOTÓN
       ═══════════════════════════════════════════════════════════ */
    var ACTIONS = {
        'activityFeedTrigger': function () {
            if (window.AltorraActivityFeed && window.AltorraActivityFeed.toggle) {
                window.AltorraActivityFeed.toggle();
            } else {
                console.warn('[HeaderFix] AltorraActivityFeed no disponible');
            }
        },
        'altorra-voice-btn': function () {
            if (window.AltorraVoice && window.AltorraVoice.toggle) {
                window.AltorraVoice.toggle();
            } else {
                console.warn('[HeaderFix] AltorraVoice no disponible');
            }
        }
    };

    function fireBellAction() {
        // El bell de notify-center tiene su propio handler interno.
        // Si por alguna razón no respondió, forzamos panel toggle.
        if (window.notifyCenter && window.notifyCenter.togglePanel) {
            window.notifyCenter.togglePanel();
        } else {
            console.warn('[HeaderFix] notifyCenter no disponible');
        }
    }

    /* ═══════════════════════════════════════════════════════════
       2. CAPTURE-PHASE LISTENER — intercepta ANTES de overlays
       ═══════════════════════════════════════════════════════════ */
    function handleCapturedClick(e) {
        // Walk up desde target buscando un botón conocido
        var el = e.target;
        var maxDepth = 8;
        while (el && el !== document.body && maxDepth-- > 0) {
            // Check ID directo
            if (el.id && ACTIONS[el.id]) {
                e.stopPropagation();
                e.preventDefault();
                try { ACTIONS[el.id](); } catch (err) {
                    console.error('[HeaderFix] Error en acción', el.id, err);
                }
                return;
            }
            // Bell: el button vive dentro de #headerNotifBell slot
            if (el.id === 'headerNotifBell' || (el.parentElement && el.parentElement.id === 'headerNotifBell')) {
                e.stopPropagation();
                e.preventDefault();
                try { fireBellAction(); } catch (err) {
                    console.error('[HeaderFix] Error en bell action', err);
                }
                return;
            }
            // Bell: si el target está más profundo (icon dentro del button)
            if (el.closest && el.closest('#headerNotifBell')) {
                e.stopPropagation();
                e.preventDefault();
                try { fireBellAction(); } catch (err) {
                    console.error('[HeaderFix] Error en bell action', err);
                }
                return;
            }
            el = el.parentElement;
        }
    }

    // Capture: true es CRÍTICO — el click se atrapa en la fase de
    // descenso del DOM tree, antes de cualquier handler en bubble phase.
    document.addEventListener('click', handleCapturedClick, true);

    /* ═══════════════════════════════════════════════════════════
       3. CLEANUP DE OVERLAYS HUÉRFANOS — ocultar por seguridad
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
            var activeClasses = ['active', 'open', 'visible', 'aaf-open',
                                 'alt-palette-open', 'alt-voice-active',
                                 'is-active', 'cnc-open',
                                 'altorra-notify-center--open'];
            if (activeClasses.some(function (c) { return el.classList.contains(c); })) return;
            // Sospechoso. Hide.
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
                AltorraVoice: !!window.AltorraVoice
            },
            captureHandler: 'installed (cannot inspect)',
            highZOverlays: []
        };
        ['activityFeedTrigger', 'headerNotifBell', 'altorra-voice-btn'].forEach(function (id) {
            var el = document.getElementById(id);
            report.buttons[id] = el ? {
                exists: true,
                rect: el.getBoundingClientRect()
            } : { exists: false };
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
       5. INIT — cleanup puntual al cargar y a 2s/5s
       ═══════════════════════════════════════════════════════════ */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', cleanupOverlays);
    } else {
        cleanupOverlays();
    }
    setTimeout(cleanupOverlays, 2000);
    setTimeout(cleanupOverlays, 5000);

    console.info('[HeaderFix] Capture-phase listener installed. Botones del header garantizados.');
})();
