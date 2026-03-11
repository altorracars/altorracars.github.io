// ============================================
// PAGE LOADER & TRANSITIONS - ALTORRA CARS
// Carga suave y transiciones de navegación
// Corre sin defer para disponibilidad inmediata
// ============================================

(function () {
    'use strict';

    // ===== 1. DISMISS LOADER =====
    var dismissed = false;

    function dismissLoader() {
        if (dismissed) return;
        dismissed = true;

        var loader = document.getElementById('page-loader');
        if (!loader) return;

        loader.classList.add('pl-done');

        // Eliminar del DOM tras la transición
        var cleanup = function () {
            if (loader.parentNode) loader.remove();
        };
        loader.addEventListener('transitionend', cleanup, { once: true });
        // Seguridad: eliminar aunque transitionend no dispare
        setTimeout(cleanup, 700);
    }

    // Exponer globalmente para que components.js lo invoque
    window.dismissPageLoader = dismissLoader;

    // Fallback: auto-dismiss tras 5 segundos si algo falla
    var fallbackTimer = setTimeout(dismissLoader, 5000);

    // Dismiss al load completo (fallback adicional)
    window.addEventListener('load', function () {
        clearTimeout(fallbackTimer);
        // Pequeño delay para que la última animación de carga termine
        setTimeout(dismissLoader, 250);
    });


    // ===== 2. ELEMENTOS DE TRANSICIÓN =====
    // Se crean al inicio del body (vía DOMContentLoaded)

    var overlay = null;
    var progressBar = null;

    function createTransitionElements() {
        // Overlay de salida de página
        overlay = document.createElement('div');
        overlay.id = 'page-transition-overlay';
        overlay.setAttribute('aria-hidden', 'true');
        document.body.insertAdjacentElement('afterbegin', overlay);

        // Barra de progreso superior
        progressBar = document.createElement('div');
        progressBar.id = 'page-progress-bar';
        progressBar.setAttribute('aria-hidden', 'true');
        document.body.insertAdjacentElement('afterbegin', progressBar);

        // Arrancar la barra de progreso
        startProgressBar();
    }


    // ===== 3. BARRA DE PROGRESO =====
    var pbTimers = [];
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

        pbTimers.forEach(clearTimeout);
        pbTimers = PB_STEPS.map(function (step) {
            return setTimeout(function () {
                if (progressBar) progressBar.style.width = step[1];
            }, step[0]);
        });
    }

    function completeProgressBar() {
        pbTimers.forEach(clearTimeout);
        if (!progressBar) return;
        progressBar.style.width = '100%';
        setTimeout(function () {
            if (progressBar) progressBar.classList.add('pb-done');
        }, 200);
    }

    window.addEventListener('load', completeProgressBar);


    // ===== 4. INTERCEPCIÓN DE LINKS (PAGE TRANSITIONS) =====

    function isInternalLink(href) {
        if (!href) return false;
        if (href.charAt(0) === '#') return false;
        if (/^(mailto:|tel:|javascript:)/i.test(href)) return false;
        try {
            var url = new URL(href, location.href);
            return url.hostname === location.hostname &&
                   !href.match(/\.(pdf|zip|docx?|xlsx?|pptx?)$/i);
        } catch (e) {
            return false;
        }
    }

    function setupLinkInterception() {
        document.addEventListener('click', function (e) {
            var link = e.target.closest('a[href]');
            if (!link) return;
            if (link.target === '_blank') return;
            if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;

            var href = link.getAttribute('href');
            if (!isInternalLink(href)) return;

            // Evitar duplicar si ya está en transición
            if (overlay && overlay.classList.contains('pto-active')) return;

            e.preventDefault();

            if (overlay) overlay.classList.add('pto-active');
            if (progressBar) {
                pbTimers.forEach(clearTimeout);
                progressBar.style.width = '90%';
            }

            setTimeout(function () {
                window.location.href = href;
            }, 320);
        }, true); // capture phase
    }

    // Manejar bfcache (navegación atrás/adelante del browser)
    window.addEventListener('pageshow', function (e) {
        if (e.persisted) {
            if (overlay) overlay.classList.remove('pto-active');
            dismissed = false; // Reset para permitir nuevo dismiss si se requiere
            dismissLoader();
        }
    });


    // ===== 5. INIT =====
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            createTransitionElements();
            setupLinkInterception();
        });
    } else {
        // DOM ya disponible
        createTransitionElements();
        setupLinkInterception();
    }

}());
