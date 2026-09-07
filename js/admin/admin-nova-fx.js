/**
 * AltorraNovaFx — Micro-interacciones NOVA (ADR-028)
 * ====================================================
 * - Reveal hover (Windows 11 Fluent): radial-gradient sigue al cursor
 *   en cualquier elemento con clase `.nova-reveal`.
 * - Auto-attach a botones primarios y cards de inventario para que el
 *   efecto aparezca sin tocar HTML legacy.
 *
 * Filosofía: zero-config, defensive, respeta prefers-reduced-motion.
 */
(function () {
    'use strict';
    if (window.AltorraNovaFx) return;

    // §35 ADR-035 — DESACTIVADO POR PERFORMANCE.
    // El reveal hover (radial-gradient cursor-following) +
    // MutationObserver subtree:true generaban repaints en cada
    // pointermove sobre 11 selectores de cards. Stub API para
    // que callers no rompan.
    window.AltorraNovaFx = { enabled: false, rescan: function () {} };
    return;

    /* eslint-disable */
    /* CÓDIGO PRESERVADO POR REFERENCIA — NO EJECUTABLE (return arriba) */
    var _reduceMotion = false;
    try {
        _reduceMotion = window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (e) {}

    if (_reduceMotion) {
        window.AltorraNovaFx = { enabled: false, reason: 'prefers-reduced-motion' };
        return;
    }

    function autoAttachReveal() {
        var selectors = [
            '.btn-primary', '.btn-secondary', '.btn-success',
            '.alt-btn--primary', '.alt-btn--secondary',
            '.kpi-card', '.workflow-card', '.reports-kpi-card',
            '.hero-kpi', '.nba-dash-item', '.pipeline-card'
        ];
        document.querySelectorAll(selectors.join(',')).forEach(function (el) {
            if (el._novaRevealAttached) return;
            el.classList.add('nova-reveal');
            el._novaRevealAttached = true;
        });
    }

    function onPointerMove(e) {
        var t = e.target;
        if (!t || !t.closest) return;
        var el = t.closest('.nova-reveal');
        if (!el) return;
        var rect = el.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        el.style.setProperty('--nova-mx', x + 'px');
        el.style.setProperty('--nova-my', y + 'px');
    }

    function init() {
        autoAttachReveal();
        document.addEventListener('pointermove', onPointerMove, { passive: true });

        // Re-scan al cambiar de sección (admin-section-router)
        if (window.AltorraSections && window.AltorraSections.onChange) {
            window.AltorraSections.onChange(function () {
                setTimeout(autoAttachReveal, 100);
            });
        }

        // MutationObserver suave para nodos nuevos (modals, etc)
        if (window.MutationObserver) {
            var mo = new MutationObserver(function (mutations) {
                var hasAdded = mutations.some(function (m) {
                    return m.addedNodes && m.addedNodes.length > 0;
                });
                if (hasAdded) {
                    if (mo._timer) clearTimeout(mo._timer);
                    mo._timer = setTimeout(autoAttachReveal, 200);
                }
            });
            mo.observe(document.body, { childList: true, subtree: true });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.AltorraNovaFx = {
        enabled: true,
        rescan: autoAttachReveal
    };
})();
