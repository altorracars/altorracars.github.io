/* ============================================================
 * ALTORRA CARS · quicktools.js — Dock flotante de herramientas
 * ------------------------------------------------------------
 * PORT vanilla (ES5-style, IIFE) del dock de herramientas de
 *   altorra-cars-design-system/project/redesign/QuickTools.jsx
 *
 * 5 herramientas:
 *   - Simulador  → simulador-credito.html
 *   - Comparar   → comparar.html         (badge: window.vehicleComparator.getCount())
 *   - Favoritos  → favoritos.html        (badge: window.favoritesManager.count())
 *   - Historial  → favoritos.html#history (badge: window.vehicleHistory.getCount())
 *   - Financiar  → data-modal="financiacion" (opens financing modal)
 *
 * Comportamiento:
 *   - Toggle button abre/cierra el dock (#quicktools-root)
 *   - Hide-on-scroll-down / show-on-scroll-up (rAF-throttled)
 *   - Badges se refrescan cuando el dock se abre + cada 2s mientras abierto
 *     (estrategia: refresh-on-open + interval-while-open, ver WHY abajo)
 *   - prefers-reduced-motion: sin transiciones, sin pulse, dock siempre visible
 *
 * WHY badge-refresh strategy:
 *   El módulo comparador.js carga ~3s tras idle (lazy). Al montar, puede
 *   que window.vehicleComparator aún no exista. En lugar de un polling
 *   global continuo, se refresca al abrir el dock (momento relevante para
 *   el usuario) + un intervalo de 2s solo mientras el dock está abierto.
 *   Esto evita thrash de layout permanente y respeta que el dock es una
 *   superficie que se usa ocasionalmente, no un contador siempre visible.
 *
 * Doctrina §17: SOLO transform/opacity animados; rAF-throttled scroll.
 * Doctrina §35: NO MutationObserver global; NO pointermove persistente.
 * Idempotencia: flag window.__altorraHomeQuicktoolsMounted (IIFE mount)
 *               + flag window.__altorraHomeQuicktoolsInited (init).
 * Registra: window.AltorraHome.quicktools = { init } para home.js.
 * ============================================================ */
(function () {
    'use strict';

    if (window.__altorraHomeQuicktoolsMounted) return;
    window.__altorraHomeQuicktoolsMounted = true;

    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ============================================================
    // SVG ICONS (inline, matching QuickTools.jsx exactly)
    // ============================================================
    var ICONS = {
        simulator: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="10" y2="10"/><line x1="14" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="10" y2="14"/><line x1="14" y1="14" x2="16" y2="14"/><line x1="8" y1="18" x2="10" y2="18"/><line x1="14" y1="18" x2="16" y2="18"/></svg>',
        compare:   '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="6" height="10" rx="1"/><rect x="10" y="3" width="6" height="10" rx="1"/><rect x="18" y="3" width="4" height="10" rx="1"/><path d="M5 17v4M13 17v4M20 17v4M3 20h4M11 20h4M18 20h4"/></svg>',
        favorites: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/></svg>',
        history:   '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
        finance:   '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="14" rx="2"/><line x1="2" y1="11" x2="22" y2="11"/></svg>',
        grid: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
        close: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6 18 18M6 18 18 6"/></svg>'
    };

    // ============================================================
    // TOOL DEFINITIONS
    // Destinations updated per spec:
    //   simulator → simulador-credito.html (NOT simulator.html from JSX)
    //   compare   → comparar.html          (NOT compare.html from JSX)
    //   favorites → favoritos.html         (NOT favorites.html from JSX)
    //   history   → favoritos.html#history
    //   finance   → data-modal (no href)
    // ============================================================
    var TOOLS = [
        {
            id: 'simulator',
            label: 'Simulador de crédito',
            shortLabel: 'Simulador',
            href: 'simulador-credito.html',
            icon: ICONS.simulator,
            badgeFn: null
        },
        {
            id: 'compare',
            label: 'Comparar vehículos',
            shortLabel: 'Comparar',
            href: 'comparar.html',
            icon: ICONS.compare,
            // Comparador lazy-loads ~3s after idle; guard required
            badgeFn: function () {
                if (typeof window.vehicleComparator !== 'undefined' &&
                    typeof window.vehicleComparator.getCount === 'function') {
                    return window.vehicleComparator.getCount();
                }
                // Fallback: read localStorage directly (comparador.js uses 'altorra_comparador')
                try {
                    var arr = JSON.parse(localStorage.getItem('altorra_comparador') || '[]');
                    return Array.isArray(arr) ? arr.length : 0;
                } catch (e) { return 0; }
            }
        },
        {
            id: 'favorites',
            label: 'Mis favoritos',
            shortLabel: 'Favoritos',
            href: 'favoritos.html',
            icon: ICONS.favorites,
            badgeFn: function () {
                if (typeof window.favoritesManager !== 'undefined' &&
                    typeof window.favoritesManager.count === 'function') {
                    return window.favoritesManager.count();
                }
                return 0;
            }
        },
        {
            id: 'history',
            label: 'Vistos recientemente',
            shortLabel: 'Historial',
            href: 'favoritos.html#history',
            icon: ICONS.history,
            badgeFn: function () {
                if (typeof window.vehicleHistory !== 'undefined' &&
                    typeof window.vehicleHistory.getCount === 'function') {
                    return window.vehicleHistory.getCount();
                }
                return 0;
            }
        },
        {
            id: 'finance',
            label: 'Solicitar financiación',
            shortLabel: 'Financiar',
            href: null,
            modal: 'financiacion',
            icon: ICONS.finance,
            badgeFn: null
        }
    ];

    // ============================================================
    // DOM BUILDERS
    // ============================================================

    /**
     * Build a single tool item element.
     * Returns { el, updateBadge } so badges can be refreshed later.
     */
    function buildToolItem(tool) {
        var el;
        if (tool.modal) {
            // Financiar: button that triggers a modal
            el = document.createElement('button');
            el.type = 'button';
            el.setAttribute('data-modal', tool.modal);
            // Contact-forms.js / citas.js wire modal opening via data-modal attribute
        } else {
            el = document.createElement('a');
            el.href = tool.href || '#';
        }

        el.className = 'qt-item';
        el.setAttribute('aria-label', tool.label);

        var iconSpan = document.createElement('span');
        iconSpan.className = 'qt-icon';
        iconSpan.innerHTML = tool.icon;

        var labelSpan = document.createElement('span');
        labelSpan.className = 'qt-label';
        labelSpan.textContent = tool.shortLabel;

        el.appendChild(iconSpan);
        el.appendChild(labelSpan);

        // Badge (only appended when count > 0; toggled in updateBadge)
        var badgeEl = null;
        if (tool.badgeFn) {
            badgeEl = document.createElement('span');
            badgeEl.className = 'qt-badge';
            // Hidden initially; updateBadge will show/hide
            badgeEl.style.display = 'none';
        }

        function updateBadge() {
            if (!tool.badgeFn || !badgeEl) return;
            var count = tool.badgeFn();
            if (count > 0) {
                badgeEl.textContent = count;
                badgeEl.style.display = '';
                // Ensure it's in the DOM
                if (!badgeEl.parentNode) el.appendChild(badgeEl);
            } else {
                badgeEl.style.display = 'none';
            }
        }

        // Initial badge state
        updateBadge();

        return { el: el, updateBadge: updateBadge };
    }

    /**
     * Build the full dock structure and return refs needed for interaction.
     */
    function buildDock() {
        var wrap = document.createElement('div');
        wrap.className = 'qt-wrap';

        // ── Toggle button ──────────────────────────────────────────
        var toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'qt-toggle';
        toggle.setAttribute('aria-label', 'Abrir herramientas');
        toggle.setAttribute('aria-expanded', 'false');

        var gridIconWrap = document.createElement('span');
        gridIconWrap.setAttribute('aria-hidden', 'true');
        gridIconWrap.innerHTML = ICONS.grid;

        // Pulse ring — disabled under reduced-motion (CSS handles it with
        // animation: none, but we also skip adding it to the DOM)
        var pulseEl = null;
        if (!reducedMotion) {
            pulseEl = document.createElement('span');
            pulseEl.className = 'qt-toggle-pulse';
            pulseEl.setAttribute('aria-hidden', 'true');
        }

        toggle.appendChild(gridIconWrap);
        if (pulseEl) toggle.appendChild(pulseEl);

        // ── Dock panel ────────────────────────────────────────────
        var dock = document.createElement('div');
        dock.className = 'qt-dock';
        dock.setAttribute('role', 'menu');

        var eyebrow = document.createElement('span');
        eyebrow.className = 'qt-dock-eyebrow';
        eyebrow.textContent = 'Herramientas';
        dock.appendChild(eyebrow);

        // Build tool items and keep refs for badge updates
        var badgeUpdaters = [];
        for (var i = 0; i < TOOLS.length; i++) {
            var built = buildToolItem(TOOLS[i]);
            dock.appendChild(built.el);
            badgeUpdaters.push(built.updateBadge);
        }

        wrap.appendChild(toggle);
        wrap.appendChild(dock);

        return {
            wrap: wrap,
            toggle: toggle,
            gridIconWrap: gridIconWrap,
            pulseEl: pulseEl,
            badgeUpdaters: badgeUpdaters
        };
    }

    // ============================================================
    // BADGE REFRESH
    // ============================================================
    function refreshAllBadges(updaters) {
        for (var i = 0; i < updaters.length; i++) {
            updaters[i]();
        }
    }

    // ============================================================
    // HIDE-ON-SCROLL (rAF-throttled, no MutationObserver)
    // Port of QuickTools.jsx useEffect scroll handler.
    // Thresholds match JSX: hide when scrolling down >6px past y>400,
    //                        show when scrolling up >6px.
    // Under reduced-motion: no hide/show on scroll (static dock).
    // ============================================================
    function initScrollBehavior(wrap) {
        if (reducedMotion) return; // static, always visible

        var lastY = window.scrollY;
        var raf = null;

        function onScroll() {
            if (raf) return;
            raf = window.requestAnimationFrame(function () {
                var y = window.scrollY;
                var dy = y - lastY;
                if (dy > 6 && y > 400) {
                    wrap.classList.add('is-hidden');
                } else if (dy < -6) {
                    wrap.classList.remove('is-hidden');
                }
                lastY = y;
                raf = null;
            });
        }

        window.addEventListener('scroll', onScroll, { passive: true });
    }

    // ============================================================
    // TOGGLE OPEN/CLOSE
    // ============================================================
    function initToggle(refs) {
        var wrap = refs.wrap;
        var toggle = refs.toggle;
        var gridIconWrap = refs.gridIconWrap;
        var pulseEl = refs.pulseEl;
        var badgeUpdaters = refs.badgeUpdaters;
        var badgeInterval = null;

        function openDock() {
            wrap.classList.add('is-open');
            toggle.setAttribute('aria-expanded', 'true');
            toggle.setAttribute('aria-label', 'Cerrar herramientas');

            // Show close icon, hide grid icon
            gridIconWrap.style.display = 'none';
            if (pulseEl) pulseEl.style.display = 'none';
            // Insert close SVG directly into toggle (remove first if needed)
            var closeIcon = toggle.querySelector('.qt-close-icon');
            if (!closeIcon) {
                closeIcon = document.createElement('span');
                closeIcon.className = 'qt-close-icon';
                closeIcon.setAttribute('aria-hidden', 'true');
                closeIcon.innerHTML = ICONS.close;
                toggle.appendChild(closeIcon);
            }
            closeIcon.style.display = '';

            // Refresh badges on open (main trigger for lazy-loaded modules)
            refreshAllBadges(badgeUpdaters);

            // Start interval while open (2s cadence for same-tab updates)
            if (!badgeInterval) {
                badgeInterval = setInterval(function () {
                    refreshAllBadges(badgeUpdaters);
                }, 2000);
            }
        }

        function closeDock() {
            wrap.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'Abrir herramientas');

            gridIconWrap.style.display = '';
            if (pulseEl) pulseEl.style.display = '';
            var closeIcon = toggle.querySelector('.qt-close-icon');
            if (closeIcon) closeIcon.style.display = 'none';

            // Stop badge interval when dock is closed (no need to poll hidden UI)
            if (badgeInterval) {
                clearInterval(badgeInterval);
                badgeInterval = null;
            }
        }

        toggle.addEventListener('click', function () {
            if (wrap.classList.contains('is-open')) {
                closeDock();
            } else {
                openDock();
            }
        });
    }

    // ============================================================
    // INIT — public entry point (called by home.js + self-mount)
    // ============================================================
    function init() {
        // Inner idempotency guard (double-call safe: IIFE flag + this flag)
        if (window.__altorraHomeQuicktoolsInited) return;
        window.__altorraHomeQuicktoolsInited = true;

        var root = document.getElementById('quicktools-root');
        if (!root) return; // mount point not in DOM (not on homepage)

        var refs = buildDock();
        root.appendChild(refs.wrap);

        initScrollBehavior(refs.wrap);
        initToggle(refs);
    }

    // ============================================================
    // NAMESPACE REGISTRATION
    // ============================================================
    window.AltorraHome = window.AltorraHome || {};
    window.AltorraHome.quicktools = { init: init };

    // ============================================================
    // SELF-MOUNT (DOMContentLoaded guard, like other home modules)
    // ============================================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
