/**
 * AltorraVisionaryFx — Microinteracciones world-class
 * ====================================================
 * - Cursor-follow gradient (Vision Pro / Apple style):
 *   las cards reciben un radial-gradient que sigue al cursor.
 * - Haptic visual feedback en clicks (scale 0.97 momentáneo).
 * - Motion choreography: stagger automático en grids visibles.
 * - Smart attach: detecta cards/buttons y aplica.
 * - Respeta prefers-reduced-motion.
 */
(function () {
    'use strict';
    if (window.AltorraVisionaryFx) return;

    var _reduceMotion = false;
    try {
        _reduceMotion = window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (e) {}

    /* ─── Cursor-follow gradient ──────────────────────────────── */
    var CURSOR_TARGETS = [
        '.kpi-card', '.hero-kpi', '.reports-kpi-card',
        '.workflow-card', '.alt-card', '.nba-dash-item',
        '.pipeline-card', '.insights-card', '.review-card',
        '.dealer-card', '.brand-admin-card', '.stat-card'
    ];
    function onPointerMove(e) {
        if (_reduceMotion) return;
        var t = e.target;
        if (!t || !t.closest) return;
        var el = t.closest(CURSOR_TARGETS.join(','));
        if (!el) return;
        var rect = el.getBoundingClientRect();
        var x = ((e.clientX - rect.left) / rect.width) * 100;
        var y = ((e.clientY - rect.top) / rect.height) * 100;
        el.style.setProperty('--vis-mx', x + '%');
        el.style.setProperty('--vis-my', y + '%');
    }
    document.addEventListener('pointermove', onPointerMove, { passive: true });

    /* ─── Haptic visual click feedback ───────────────────────── */
    var HAPTIC_TARGETS = '.btn, .alt-btn, button, [role="button"], .nav-item, .kpi-card, .pipeline-card';
    function onPointerDown(e) {
        if (_reduceMotion) return;
        var t = e.target;
        if (!t || !t.closest) return;
        var el = t.closest(HAPTIC_TARGETS);
        if (!el) return;
        if (el.matches('.alt-toggle, [disabled], [aria-disabled="true"]')) return;
        el.classList.add('vis-haptic-active');
    }
    function onPointerUp(e) {
        document.querySelectorAll('.vis-haptic-active').forEach(function (el) {
            el.classList.remove('vis-haptic-active');
        });
    }
    document.addEventListener('pointerdown', onPointerDown, { passive: true });
    document.addEventListener('pointerup', onPointerUp, { passive: true });
    document.addEventListener('pointercancel', onPointerUp, { passive: true });
    document.addEventListener('pointerleave', onPointerUp, { passive: true });

    /* ─── Motion choreography: stagger en grids visibles ──── */
    var STAGGER_TARGETS = [
        '.kpis-grid', '.stats-grid', '.cards-grid',
        '.reports-kpis', '.hero-kpis', '.workflows-rules-grid',
        '.nba-dash-list', '.pipeline-cards', '.insight-list',
        '.section-stats'
    ];
    function applyStagger(container) {
        if (_reduceMotion) return;
        if (container._visStaggerApplied) return;
        container._visStaggerApplied = true;
        Array.from(container.children).forEach(function (child, i) {
            if (i < 12) {
                child.style.animationDelay = (40 + i * 60) + 'ms';
                child.classList.add('vis-stagger-item');
            }
        });
    }
    if (window.IntersectionObserver) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) applyStagger(entry.target);
            });
        }, { threshold: 0.05 });
        function rescan() {
            document.querySelectorAll(STAGGER_TARGETS.join(',')).forEach(function (el) {
                if (!el._visObserved) {
                    el._visObserved = true;
                    io.observe(el);
                }
            });
        }
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', rescan);
        } else {
            rescan();
        }
        if (window.AltorraSections && window.AltorraSections.onChange) {
            window.AltorraSections.onChange(function () {
                setTimeout(rescan, 100);
            });
        }
        if (window.MutationObserver) {
            var mo = new MutationObserver(function () {
                if (mo._t) clearTimeout(mo._t);
                mo._t = setTimeout(rescan, 250);
            });
            mo.observe(document.body, { childList: true, subtree: true });
        }
    }

    /* ─── Smart cursor parallax en hero KPIs ─────────────── */
    function attachParallax() {
        if (_reduceMotion) return;
        document.querySelectorAll('.hero-kpi').forEach(function (el) {
            if (el._visParallaxAttached) return;
            el._visParallaxAttached = true;
            el.addEventListener('pointermove', function (e) {
                var rect = el.getBoundingClientRect();
                var x = (e.clientX - rect.left - rect.width / 2) / rect.width;
                var y = (e.clientY - rect.top - rect.height / 2) / rect.height;
                el.style.setProperty('--vis-tilt-x', (y * -3) + 'deg');
                el.style.setProperty('--vis-tilt-y', (x * 3) + 'deg');
            });
            el.addEventListener('pointerleave', function () {
                el.style.setProperty('--vis-tilt-x', '0deg');
                el.style.setProperty('--vis-tilt-y', '0deg');
            });
        });
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', attachParallax);
    } else {
        setTimeout(attachParallax, 200);
    }

    /* ─── Public API ─────────────────────────────────────── */
    window.AltorraVisionaryFx = {
        enabled: !_reduceMotion,
        rescan: function () {
            document.querySelectorAll(STAGGER_TARGETS.join(',')).forEach(function (el) {
                el._visObserved = false;
                el._visStaggerApplied = false;
            });
        }
    };
})();
