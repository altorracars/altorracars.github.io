/**
 * ALTORRA ADMIN V2 — Anti-FOUC Bootstrap (Sprint V2-2)
 * ====================================================
 * Quita la clase .av2-loading y aplica .av2-ready al window.load,
 * con doble requestAnimationFrame para garantizar que el browser
 * completó al menos 1 paint antes del fade-in.
 *
 * Resultado: cero "TV glitch" al refrescar.
 */
(function () {
    'use strict';
    if (window._av2Bootstrap) return;
    window._av2Bootstrap = true;

    var TIMEOUT_MS = 4500; // safety net — si window.load nunca dispara

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
