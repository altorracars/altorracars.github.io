/**
 * ALTORRA CARS — Header Fix (último recurso)
 * ============================================
 * Garantiza que los botones del header funcionen aunque otros scripts
 * fallen. Corre al final, después de TODOS los demás, y:
 *
 *   1. Elimina cualquier overlay flotante con z-index extremo que
 *      pueda estar bloqueando clicks (limpieza inmediata + cada 2s)
 *
 *   2. Bindea con event listeners DIRECTOS los 5 botones críticos:
 *      - #activityFeedTrigger     → AltorraActivityFeed.toggle
 *      - #themeToggle             → AltorraTheme.cycle
 *      - #contrastToggle          → AltorraTheme.toggleHighContrast
 *      - #headerNotifBell button  → notifyCenter.toggle (panel)
 *      - #altorra-voice-btn       → AltorraVoice.toggle (si existe)
 *
 *   3. Provee fallbacks si las APIs principales no cargaron.
 *
 *   4. Diagnostic logger: window.__altorraHeaderDiag() reporta el
 *      estado de cada botón y sus listeners.
 */
(function () {
    'use strict';
    if (window.__altorraHeaderFixed) return;
    window.__altorraHeaderFixed = true;

    /* ═══════════════════════════════════════════════════════════
       1. CLEANUP INMEDIATO — elimina overlays huérfanos
       ═══════════════════════════════════════════════════════════ */
    function cleanupOverlays() {
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

        // CRÍTICO: clases protegidas — elementos con cualquiera de estas
        // clases NO se tocan, sin importar que NO tengan id.
        var WHITELIST_CLASSES = [
            'altorra-notify-center',  // panel del bell (toast.js createPanel)
            'altorra-notify',          // toasts
            'altorra-notify-stack',    // contenedor de toasts apilados
            'altorra-bell',            // bell button
            'altorra-spotlight',       // spotlight de favoritos
            'modal-overlay',           // modales del admin (vehiculo, etc.)
            'sidebar-overlay',         // overlay del sidebar mobile
            'crm-detail-panel',        // CRM 360
            'auth-modal-backdrop',     // login modal
            'altorra-auth-modal'       // login modal
        ];

        function hasProtectedClass(el) {
            for (var i = 0; i < WHITELIST_CLASSES.length; i++) {
                if (el.classList && el.classList.contains(WHITELIST_CLASSES[i])) return true;
            }
            return false;
        }

        // NOTA: No "rescatamos" elementos ocultos. El código que los oculta
        // (admin-auth.js, auth.js, etc.) tiene autoridad sobre su propio estado.
        // Aquí solo OCULTAMOS overlays huérfanos sospechosos, nunca mostramos
        // nada que esté hidden por otro motivo.

        Array.prototype.slice.call(document.body.children).forEach(function (el) {
            if (!el.tagName || (el.tagName !== 'DIV' && el.tagName !== 'ASIDE' && el.tagName !== 'SECTION')) return;
            if (el.id && WHITELIST_IDS.indexOf(el.id) !== -1) return;
            if (hasProtectedClass(el)) return;

            var cs;
            try { cs = getComputedStyle(el); } catch (e) { return; }
            if (cs.position !== 'fixed') return;
            var z = parseInt(cs.zIndex, 10);
            if (isNaN(z) || z < 9000) return;
            if (cs.display === 'none') return;

            // Si ya tiene pointer-events: none, NO captura clicks.
            // No es sospechoso. Skip.
            if (cs.pointerEvents === 'none') return;

            var activeClasses = ['active', 'open', 'visible', 'aaf-open',
                                 'alt-palette-open', 'alt-voice-active',
                                 'is-active', 'cnc-open',
                                 'altorra-notify-center--open'];
            if (activeClasses.some(function (c) { return el.classList.contains(c); })) return;

            // Sospechoso de bloquear clicks. Hide it.
            el.style.pointerEvents = 'none';
            el.style.display = 'none';
            console.warn('[HeaderFix] Hidden suspected overlay:', el.id || el.className);
        });

        // SEGUNDA PASADA — overlays watched que se quedaron sin clase activa
        var WATCHED_PAIRS = [
            { selector: '#alt-onboard', activeClass: 'is-active' },
            { selector: '#alt-palette', activeClass: 'alt-palette-open' },
            { selector: '#altorra-voice-overlay', activeClass: 'alt-voice-active' }
        ];
        WATCHED_PAIRS.forEach(function (pair) {
            var el = document.querySelector(pair.selector);
            if (!el) return;
            if (el.classList.contains(pair.activeClass)) return;
            el.style.display = 'none';
            el.style.pointerEvents = 'none';
        });

        // TERCERA PASADA — modales dinámicos vacíos
        ['altorra-optin', 'alt-sec-modal', 'cncSummaryWrap'].forEach(function (id) {
            var el = document.getElementById(id);
            if (!el) return;
            if (!el.firstElementChild) {
                el.style.display = 'none';
                el.style.pointerEvents = 'none';
            }
        });
    }

    /* ═══════════════════════════════════════════════════════════
       2. BIND DIRECTO de botones del header
       ═══════════════════════════════════════════════════════════ */
    function bindHeaderButtons() {
        // Activity Feed
        var actBtn = document.getElementById('activityFeedTrigger');
        if (actBtn && !actBtn._headerFixBound) {
            actBtn._headerFixBound = true;
            actBtn.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                if (window.AltorraActivityFeed && window.AltorraActivityFeed.toggle) {
                    window.AltorraActivityFeed.toggle();
                } else {
                    console.warn('[HeaderFix] AltorraActivityFeed no disponible');
                }
            });
        }

        // Theme toggle (claro/oscuro)
        // CRÍTICO: si tiene data-altorra-theme-toggle, theme-switcher.js
        // ya bindeó cycleTheme directamente. NO bindeamos de nuevo —
        // hacerlo causaría que cycle() corra 2 veces por click y el
        // estado quede igual (el bug que veía el usuario).
        var themeBtn = document.getElementById('themeToggle');
        if (themeBtn && !themeBtn._headerFixBound && !themeBtn.hasAttribute('data-altorra-theme-toggle')) {
            themeBtn._headerFixBound = true;
            themeBtn.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                if (window.AltorraTheme && window.AltorraTheme.cycle) {
                    window.AltorraTheme.cycle();
                } else {
                    // Fallback: toggle simple light/dark
                    var html = document.documentElement;
                    var current = html.getAttribute('data-theme') || 'dark';
                    var next = current === 'light' ? 'dark' : 'light';
                    html.setAttribute('data-theme', next);
                    try { localStorage.setItem('altorra-theme', next); } catch (e2) {}
                }
            });
        } else if (themeBtn && themeBtn.hasAttribute('data-altorra-theme-toggle') && !themeBtn._headerFixBound) {
            // theme-switcher YA bindeó. Solo verificamos que AltorraTheme exista
            // como red de seguridad. Si no existe (script no cargó), bindeamos
            // fallback inline.
            themeBtn._headerFixBound = true;
            if (!window.AltorraTheme) {
                themeBtn.addEventListener('click', function (e) {
                    var html = document.documentElement;
                    var current = html.getAttribute('data-theme') || 'dark';
                    var next = current === 'light' ? 'dark' : 'light';
                    html.setAttribute('data-theme', next);
                    try { localStorage.setItem('altorra-theme', next); } catch (e2) {}
                });
            }
        }

        // Contrast toggle (alto contraste) — mismo patrón anti-doble-bind
        var contrastBtn = document.getElementById('contrastToggle');
        if (contrastBtn && !contrastBtn._headerFixBound && !contrastBtn.hasAttribute('data-altorra-contrast-toggle')) {
            contrastBtn._headerFixBound = true;
            contrastBtn.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                if (window.AltorraTheme && window.AltorraTheme.toggleHighContrast) {
                    window.AltorraTheme.toggleHighContrast();
                } else {
                    var html = document.documentElement;
                    var current = html.getAttribute('data-theme');
                    if (current === 'high-contrast') {
                        html.setAttribute('data-theme', 'dark');
                    } else {
                        html.setAttribute('data-theme', 'high-contrast');
                    }
                }
            });
        } else if (contrastBtn && contrastBtn.hasAttribute('data-altorra-contrast-toggle') && !contrastBtn._headerFixBound) {
            contrastBtn._headerFixBound = true;
            if (!window.AltorraTheme) {
                contrastBtn.addEventListener('click', function (e) {
                    var html = document.documentElement;
                    var current = html.getAttribute('data-theme');
                    if (current === 'high-contrast') {
                        html.setAttribute('data-theme', 'dark');
                    } else {
                        html.setAttribute('data-theme', 'high-contrast');
                    }
                });
            }
        }

        // Notification bell — buscamos el button DENTRO del slot
        var bellSlot = document.getElementById('headerNotifBell');
        if (bellSlot) {
            var bellBtn = bellSlot.querySelector('button') || bellSlot.querySelector('[role="button"]');
            if (bellBtn && !bellBtn._headerFixBound) {
                bellBtn._headerFixBound = true;
                bellBtn.addEventListener('click', function (e) {
                    // No preventDefault aquí — dejar que el handler original
                    // del bell también corra (panel del notify center)
                    if (window.notifyCenter) {
                        // notifyCenter ya debería tener su propio handler;
                        // si por alguna razón no reaccionó, forzamos togglePanel
                        if (window.notifyCenter.togglePanel) {
                            setTimeout(function () { window.notifyCenter.togglePanel(); }, 50);
                        }
                    }
                }, { capture: false });
            }
        }

        // Voice mic button (puede aparecer asíncrono)
        var voiceBtn = document.getElementById('altorra-voice-btn');
        if (voiceBtn && !voiceBtn._headerFixBound) {
            voiceBtn._headerFixBound = true;
            voiceBtn.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                if (window.AltorraVoice && window.AltorraVoice.toggle) {
                    window.AltorraVoice.toggle();
                }
            });
        }
    }

    /* ═══════════════════════════════════════════════════════════
       3. CLICK DEBUGGER — registra qué elemento está en (x,y)
       ═══════════════════════════════════════════════════════════ */
    window.__altorraClickPath = function (x, y) {
        // Lista TODOS los elementos en (x,y) ordenados por z-index
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
                    position: cs.position,
                    pointerEvents: cs.pointerEvents,
                    display: cs.display
                };
            } catch (e) { return { error: String(e) }; }
        });
    };

    // Loga cada click al document — si nada aparece cuando clickeas, el
    // click no llegó al document (overlay invisible bloqueando)
    document.addEventListener('click', function (e) {
        // Solo loga si hay debug flag
        if (!window.__altorraDebugClicks) return;
        console.log('[ClickDebug]', {
            x: e.clientX, y: e.clientY,
            target: e.target.tagName + (e.target.id ? '#' + e.target.id : '') + '.' + e.target.className,
            path: window.__altorraClickPath(e.clientX, e.clientY)
        });
    }, true);

    /* ═══════════════════════════════════════════════════════════
       4. DIAGNOSTIC LOGGER
       ═══════════════════════════════════════════════════════════ */
    window.__altorraHeaderDiag = function () {
        var report = {
            buttons: {},
            apis: {
                AltorraActivityFeed: !!window.AltorraActivityFeed,
                AltorraTheme: !!window.AltorraTheme,
                notifyCenter: !!window.notifyCenter,
                AltorraVoice: !!window.AltorraVoice
            },
            highZOverlays: []
        };
        ['activityFeedTrigger', 'themeToggle', 'contrastToggle',
         'headerNotifBell', 'altorra-voice-btn'].forEach(function (id) {
            var el = document.getElementById(id);
            report.buttons[id] = el ? {
                exists: true,
                bound: !!el._headerFixBound,
                rect: el.getBoundingClientRect()
            } : { exists: false };
        });
        // Listar overlays con z-index alto
        Array.prototype.slice.call(document.body.children).forEach(function (el) {
            try {
                var cs = getComputedStyle(el);
                if (cs.position !== 'fixed') return;
                var z = parseInt(cs.zIndex, 10);
                if (isNaN(z) || z < 9000) return;
                report.highZOverlays.push({
                    id: el.id || '(no-id)',
                    class: el.className,
                    zIndex: z,
                    display: cs.display,
                    pointerEvents: cs.pointerEvents,
                    opacity: cs.opacity
                });
            } catch (e) {}
        });
        console.table(report.buttons);
        console.log('APIs:', report.apis);
        console.table(report.highZOverlays);
        return report;
    };

    /* ═══════════════════════════════════════════════════════════
       INIT — corre al cargar + reintenta para bindings tardíos
       ═══════════════════════════════════════════════════════════ */
    function run() {
        cleanupOverlays();
        bindHeaderButtons();
    }

    // Primera ejecución
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', run);
    } else {
        run();
    }

    // Re-run 3 veces escalonado para capturar elementos que se montan tarde
    // (bell, voice button). NO loop continuo — el cleanup repetido era el
    // que causaba el loop visual del auth-loading-screen.
    setTimeout(run, 500);
    setTimeout(run, 2000);
    setTimeout(run, 5000);
})();
