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

    // Detectar si un href es interno (misma origin)
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
            return url.hostname === location.hostname;
        } catch (e) {
            // Fallback: href relativo sin protocolo = interno
            return href.charAt(0) === '/' ||
                   href.charAt(0) === '.' ||
                   !/^[a-z][a-z0-9+\-.]*:/i.test(href);
        }
    }

    var transitioning = false;

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
            if (overlay) overlay.classList.remove('pto-active');
            dismissed = false;
            dismissLoader();
            completeProgressBar();
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
