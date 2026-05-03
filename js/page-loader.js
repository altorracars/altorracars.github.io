// ============================================
// PAGE LOADER & TRANSITIONS - ALTORRA CARS
// Carga suave y transiciones de navegación
//
// Compatibilidad:
//   - iOS Safari 10+
//   - Android Chrome 60+ / WebView 60+
//   - Samsung Internet 6+
//   - Firefox 55+
//   - Edge (Legacy + Chromium)
//   - IE11 (degradación elegante)
// ============================================

(function () {
    'use strict';

    // ===== 0. POLYFILLS BÁSICOS =====

    // Element.closest() — no disponible en IE11 / Android WebView antiguo
    if (typeof Element !== 'undefined' && !Element.prototype.closest) {
        Element.prototype.closest = function (selector) {
            var el = this;
            while (el && el.nodeType === 1) {
                if (el.matches ? el.matches(selector) :
                    el.msMatchesSelector ? el.msMatchesSelector(selector) : false) {
                    return el;
                }
                el = el.parentElement || el.parentNode;
            }
            return null;
        };
    }

    // Element.matches() — prefijos para IE/Edge Legacy
    if (typeof Element !== 'undefined' && !Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.msMatchesSelector ||
            Element.prototype.webkitMatchesSelector;
    }


    // ===== 1. DISMISS LOADER =====
    var dismissed = false;

    function dismissLoader() {
        if (dismissed) return;
        dismissed = true;

        var loader = document.getElementById('page-loader');
        if (!loader) return;

        loader.classList.add('pl-done');

        // L1.3: signal "page is ready" so above-fold sequential reveal
        // animations can start. Synchronized with the loader fade-out so
        // the user sees both happening at once (loader fades, hero
        // emerges with stagger behind it).
        document.body.classList.add('loaded');

        // Eliminar del DOM tras la transición CSS
        var cleanup = function () {
            if (loader && loader.parentNode) {
                loader.parentNode.removeChild(loader);
            }
        };

        // transitionend con prefijo webkit para Safari
        loader.addEventListener('transitionend', cleanup, false);
        loader.addEventListener('webkitTransitionEnd', cleanup, false);

        // Seguridad: eliminar aunque el evento no dispare
        setTimeout(cleanup, 800);
    }

    // Exponer globalmente para que components.js lo invoque
    window.dismissPageLoader = dismissLoader;

    // Fallback: auto-dismiss si algo falla en 5 segundos
    var fallbackTimer = setTimeout(dismissLoader, 5000);

    // Fallback adicional al window.load completo
    window.addEventListener('load', function () {
        clearTimeout(fallbackTimer);
        setTimeout(dismissLoader, 300);
    });

    // L1.4: SMART FAST-PATH for return visitors.
    // Detect if vehicle data is already cached locally (= second+ visit
    // on the same device). If so, the user doesn't need to see the
    // splash for a full second — they came here already familiar with
    // the brand. Dismiss as soon as DOMContentLoaded fires + 150ms
    // (just enough for the hero stagger reveal to start).
    function hasWarmCache() {
        try {
            return !!localStorage.getItem('altorra-db-cache');
        } catch (e) {
            return false;
        }
    }

    if (hasWarmCache()) {
        var fastDismiss = function () {
            clearTimeout(fallbackTimer);
            setTimeout(dismissLoader, 150);
        };
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', fastDismiss);
        } else {
            fastDismiss();
        }
    }


    // ===== 2. ELEMENTOS DE TRANSICIÓN =====
    var overlay = null;
    var progressBar = null;

    function createTransitionElements() {
        // Overlay de salida de página (fade negro al navegar)
        overlay = document.createElement('div');
        overlay.id = 'page-transition-overlay';
        overlay.setAttribute('aria-hidden', 'true');

        // Barra de progreso superior (dorada)
        progressBar = document.createElement('div');
        progressBar.id = 'page-progress-bar';
        progressBar.setAttribute('aria-hidden', 'true');

        // Insertar al inicio del body
        var body = document.body;
        if (body.firstChild) {
            body.insertBefore(progressBar, body.firstChild);
            body.insertBefore(overlay, body.firstChild);
        } else {
            body.appendChild(overlay);
            body.appendChild(progressBar);
        }

        startProgressBar();
    }


    // ===== 3. BARRA DE PROGRESO =====
    var pbTimers = [];

    // Pasos simulados de progreso
    var PB_STEPS = [
        [250,  '25%'],
        [700,  '55%'],
        [1400, '75%'],
        [2400, '88%']
    ];

    function startProgressBar() {
        if (!progressBar) return;
        progressBar.style.width = '0%';
        progressBar.style.opacity = '1';
        progressBar.classList.remove('pb-done');

        // Cancelar timers previos
        for (var i = 0; i < pbTimers.length; i++) {
            clearTimeout(pbTimers[i]);
        }
        pbTimers = [];

        // Avance simulado por etapas
        for (var j = 0; j < PB_STEPS.length; j++) {
            (function (step) {
                pbTimers.push(setTimeout(function () {
                    if (progressBar) progressBar.style.width = step[1];
                }, step[0]));
            })(PB_STEPS[j]);
        }
    }

    function completeProgressBar() {
        for (var i = 0; i < pbTimers.length; i++) {
            clearTimeout(pbTimers[i]);
        }
        pbTimers = [];
        if (!progressBar) return;
        progressBar.style.width = '100%';
        setTimeout(function () {
            if (progressBar) progressBar.classList.add('pb-done');
        }, 200);
    }

    window.addEventListener('load', completeProgressBar);


    // ===== 4. INTERCEPCIÓN DE LINKS =====

    // Detectar si un href es interno (misma origin) y navega a otra página
    function isInternalLink(href) {
        if (!href) return false;
        if (href.charAt(0) === '#') return false;

        // Protocolos externos
        if (/^(mailto:|tel:|sms:|javascript:|data:)/i.test(href)) return false;

        // Archivos descargables
        if (/\.(pdf|zip|docx?|xlsx?|pptx?|rar|7z|tar|gz|apk|dmg|exe|msi)$/i.test(href)) return false;

        // Verificar mismo origen — con fallback para navegadores sin URL API
        try {
            var url = new URL(href, location.href);
            if (url.hostname !== location.hostname) return false;
            // Excluir links a la misma página con hash (e.g. "index.html#marcas" estando en index)
            // Estos deben hacer smooth scroll, NO activar la transición de página
            if (url.hash && url.pathname === location.pathname) return false;
            return true;
        } catch (e) {
            // Fallback: href relativo sin protocolo = interno
            // Excluir links con hash que apuntan a la misma página
            if (href.indexOf('#') !== -1) {
                var pathPart = href.substring(0, href.indexOf('#'));
                if (!pathPart) return false; // pure hash like "#marcas"
                // Check if the path part matches current page
                var currentFile = location.pathname.split('/').pop() || 'index.html';
                if (pathPart === currentFile) return false;
            }
            return href.charAt(0) === '/' ||
                   href.charAt(0) === '.' ||
                   !/^[a-z][a-z0-9+\-.]*:/i.test(href);
        }
    }

    var transitioning = false;

    // L4.2: detect support for cross-document View Transitions (Chrome 126+).
    // If supported, we skip our manual overlay and let the browser handle
    // the smooth cross-fade between pages natively. The CSS rule
    // `@view-transition { navigation: auto }` (in style.css) opts our site in.
    var supportsCrossDocViewTransitions = (function () {
        try {
            return typeof CSS !== 'undefined' &&
                   CSS.supports &&
                   CSS.supports('selector(::view-transition)');
        } catch (e) { return false; }
    })();

    function setupLinkInterception() {
        document.addEventListener('click', function (e) {
            // Buscar el link más cercano al elemento clickeado
            var target = e.target;
            var link = null;

            // Subir por el DOM buscando <a>
            while (target && target !== document.body) {
                if (target.tagName && target.tagName.toUpperCase() === 'A' && target.href) {
                    link = target;
                    break;
                }
                target = target.parentElement || target.parentNode;
            }

            if (!link) return;

            // Excluir: nueva pestaña, teclas modificadoras, descarga
            if (link.target === '_blank') return;
            if (link.getAttribute('download') !== null) return;
            if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;

            var href = link.getAttribute('href');
            if (!isInternalLink(href)) return;

            // Skip if event was already handled (e.g. by smooth scroll in components.js)
            if (e.defaultPrevented) return;

            // L4.2: in browsers that support cross-document View Transitions,
            // do nothing — let the browser handle the navigation natively
            // with a smooth cross-fade. Our progress bar still completes via
            // window beforeunload.
            if (supportsCrossDocViewTransitions) {
                return;
            }

            // Evitar doble transición
            if (transitioning) return;
            transitioning = true;

            e.preventDefault();

            // Activar overlay de salida
            if (overlay) {
                overlay.style.opacity = '0';
                overlay.style.pointerEvents = 'all';
                // Forzar reflow antes de la transición (iOS Safari fix)
                overlay.offsetHeight; // eslint-disable-line no-unused-expressions
                overlay.classList.add('pto-active');
            }

            // Animar progreso al máximo antes de navegar
            if (progressBar) {
                for (var i = 0; i < pbTimers.length; i++) clearTimeout(pbTimers[i]);
                progressBar.style.width = '90%';
            }

            // Safety net: if navigation doesn't happen within 3s, clean up overlay
            setTimeout(function () {
                if (overlay) overlay.classList.remove('pto-active');
                transitioning = false;
            }, 3000);

            // Navegar después de la transición
            setTimeout(function () {
                window.location.href = href;
            }, 340);

        }, false); // No capture para máxima compatibilidad iOS
    }

    // ===== 5. BFCACHE (back/forward navigation) =====
    // iOS Safari y navegadores modernos guardan la página en memoria
    window.addEventListener('pageshow', function (e) {
        if (e.persisted) {
            // Página recuperada del bfcache — quitar overlay y loader
            transitioning = false;
            if (overlay) {
                overlay.classList.remove('pto-active');
                // CRITICAL: clear inline pointer-events set during navigation
                // (the inline style overrides the CSS rule and blocks all clicks)
                overlay.style.pointerEvents = '';
                overlay.style.opacity = '';
            }
            dismissed = false;
            dismissLoader();
            completeProgressBar();

            // Also clean up any modal overlays that might have .active state
            var modals = document.querySelectorAll('.modal-overlay.active');
            modals.forEach(function (m) { m.classList.remove('active'); });
            document.body.style.overflow = '';
        }
    });

    // ===== 6. VIEWPORT HEIGHT FIX — iOS Safari (100vh bug) =====
    function fixIOSViewportHeight() {
        var vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', vh + 'px');
    }

    // ===== 7. INIT =====
    function init() {
        createTransitionElements();
        setupLinkInterception();
        fixIOSViewportHeight();
    }

    // Ejecutar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Re-calcular vh al rotar o redimensionar (portrait/landscape en móvil)
    var resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(fixIOSViewportHeight, 150);
    });

    // Orientación en iOS/Android
    window.addEventListener('orientationchange', function () {
        setTimeout(fixIOSViewportHeight, 300);
    });

}());
