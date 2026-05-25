/**
 * ALTORRA ADMIN V2 — Core utilities (Sprint V2-4)
 * ================================================
 * Consolida en un único punto:
 *   - AltorraDOMBus: MutationObserver central (reemplaza 4 obs duplicados)
 *   - AltorraScrollBus: scroll listener único en el .av2-main
 *   - Section cleanup hooks (cierran listeners al salir de sección)
 *   - Smooth section transitions con View Transitions API
 *
 * Carga ANTES de admin-visionary-fx.js / admin-visionary-master.js
 * para que esos módulos puedan registrarse al bus en lugar de crear
 * sus propios MutationObservers.
 */
(function () {
    'use strict';

    /* ═══ DOMBus — un único MutationObserver para todo el admin ═══ */
    if (!window.AltorraDOMBus) {
        var subs = [];
        var debounceTimer = null;
        var observerActive = false;

        function dispatch() {
            subs.forEach(function (fn) {
                try { fn(); } catch (e) { /* fail-safe */ }
            });
        }

        function startObserver() {
            if (observerActive) return;
            if (typeof MutationObserver !== 'function') return;
            observerActive = true;
            var observer = new MutationObserver(function (mutations) {
                var hasAdded = mutations.some(function (m) {
                    return m.addedNodes && m.addedNodes.length > 0;
                });
                if (!hasAdded) return;
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(dispatch, 240);
            });
            // Espera al body
            if (document.body) {
                observer.observe(document.body, { childList: true, subtree: true });
            } else {
                document.addEventListener('DOMContentLoaded', function () {
                    observer.observe(document.body, { childList: true, subtree: true });
                }, { once: true });
            }
        }

        window.AltorraDOMBus = {
            subscribe: function (fn) {
                if (typeof fn !== 'function') return function () {};
                subs.push(fn);
                startObserver();
                return function unsub() {
                    var i = subs.indexOf(fn);
                    if (i >= 0) subs.splice(i, 1);
                };
            },
            forceDispatch: dispatch
        };
    }

    /* ═══ ScrollBus — único listener para el contenedor que scrollea ═══ */
    if (!window.AltorraScrollBus) {
        var scrollSubs = [];
        var scrollContainer = null;
        var scrollFrameRequested = false;
        var lastScrollTop = 0;

        function findContainer() {
            return document.querySelector('.admin-panel.admin-layout main') ||
                   document.querySelector('.admin-panel main') ||
                   document.querySelector('#adminMain') ||
                   document.querySelector('.admin-content') ||
                   document.scrollingElement ||
                   document.documentElement;
        }

        function onScroll() {
            if (scrollFrameRequested) return;
            scrollFrameRequested = true;
            requestAnimationFrame(function () {
                scrollFrameRequested = false;
                var top = scrollContainer.scrollTop;
                var direction = top > lastScrollTop ? 'down' : 'up';
                lastScrollTop = top;
                scrollSubs.forEach(function (fn) {
                    try { fn(top, direction); } catch (e) {}
                });
            });
        }

        function attachScroll() {
            if (scrollContainer) return;
            scrollContainer = findContainer();
            if (!scrollContainer) return;
            scrollContainer.addEventListener('scroll', onScroll, { passive: true });
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', attachScroll);
        } else {
            attachScroll();
        }

        window.AltorraScrollBus = {
            subscribe: function (fn) {
                if (typeof fn !== 'function') return function () {};
                scrollSubs.push(fn);
                if (!scrollContainer) attachScroll();
                return function unsub() {
                    var i = scrollSubs.indexOf(fn);
                    if (i >= 0) scrollSubs.splice(i, 1);
                };
            },
            getContainer: function () { return scrollContainer; }
        };
    }

    /* ═══ Section cleanup hooks ═══ */
    if (!window.AltorraSectionCleanup) {
        var cleanups = {};

        window.AltorraSectionCleanup = {
            register: function (sectionName, fn) {
                if (!cleanups[sectionName]) cleanups[sectionName] = [];
                cleanups[sectionName].push(fn);
            },
            run: function (sectionName) {
                if (!cleanups[sectionName]) return;
                cleanups[sectionName].forEach(function (fn) {
                    try { fn(); } catch (e) {}
                });
                cleanups[sectionName] = [];
            }
        };
    }

    /* ═══ Hook al section router para ejecutar cleanup ═══ */
    function attachToRouter() {
        if (!window.AltorraSections || !window.AltorraSections.onChange) {
            setTimeout(attachToRouter, 300);
            return;
        }
        var prevSection = null;
        window.AltorraSections.onChange(function (newSection) {
            // §112 — FIX raíz: ejecutar cleanup SOLO al navegar a una sección
            // DISTINTA. go() dispara notifyChange dos veces para la misma
            // sección (explícito en router + MutationObserver al flip de
            // .active), y sin este guard el segundo disparo corría
            // cleanup('vehicles') justo tras suscribir el listener de
            // borradores → lo desuscribía antes del primer onSnapshot →
            // la galería "Mis borradores" quedaba vacía tras refresh.
            if (prevSection && prevSection !== newSection && window.AltorraSectionCleanup) {
                window.AltorraSectionCleanup.run(prevSection);
            }
            prevSection = newSection;
        });
    }
    attachToRouter();

    /* ═══ Smooth section transitions ═══ */
    function reducedMotion() {
        try {
            return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        } catch (e) { return false; }
    }

    /* ═══ Performance — main scroll-to-top en section change ═══ */
    function scrollMainToTop() {
        var main = window.AltorraScrollBus && window.AltorraScrollBus.getContainer();
        if (main && main.scrollTo) {
            main.scrollTo({ top: 0, behavior: reducedMotion() ? 'auto' : 'smooth' });
        }
    }
    function attachAutoScrollTop() {
        if (!window.AltorraSections || !window.AltorraSections.onChange) {
            setTimeout(attachAutoScrollTop, 300);
            return;
        }
        window.AltorraSections.onChange(function () {
            requestAnimationFrame(scrollMainToTop);
        });
    }
    attachAutoScrollTop();

})();
