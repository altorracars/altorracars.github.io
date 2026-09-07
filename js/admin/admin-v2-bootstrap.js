/**
 * ALTORRA ADMIN V2 — Anti-FOUC Bootstrap (Sprint V2-2)
 * ====================================================
 * Quita la clase .av2-loading y aplica .av2-ready al window.load,
 * con doble requestAnimationFrame para garantizar que el browser
 * completó al menos 1 paint antes del fade-in.
 *
 * Resultado: cero "TV glitch" al refrescar.
 *
 * §47.5 — Timeout aumentado de 4.5s a 8s. En mobile con red lenta
 * (LTE intermitente, post borrar-cache), 4.5s era insuficiente para
 * descargar todos los CSS, y el safety net revelaba el body sin
 * estilos cargados (texto crudo). Combinado con el fallback CSS
 * inline en admin.html `<head>`, el peor caso ya no es página blanca.
 */
(function () {
    'use strict';
    if (window._av2Bootstrap) return;
    window._av2Bootstrap = true;

    var TIMEOUT_MS = 8000; // §47.5 — 4500 → 8000 para mobile con red lenta

    function reveal() {
        if (!document.documentElement.classList.contains('av2-loading')) return;
        // Doble rAF: garantiza que el browser pintó al menos 1 frame
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                document.documentElement.classList.remove('av2-loading');
                document.documentElement.classList.add('av2-ready');

                // Quita el preloader del DOM tras el fade
                setTimeout(function () {
                    var pre = document.getElementById('av2Preloader');
                    if (pre && pre.parentNode) {
                        pre.parentNode.removeChild(pre);
                    }
                }, 600);
            });
        });
    }

    // Trigger principal: window.load (CSS + fonts + scripts deferred)
    if (document.readyState === 'complete') {
        reveal();
    } else {
        window.addEventListener('load', reveal, { once: true });
    }

    // Safety net: si por algún motivo window.load nunca dispara
    // (p.ej. recursos colgados), revelamos igual tras TIMEOUT_MS
    setTimeout(reveal, TIMEOUT_MS);
})();
