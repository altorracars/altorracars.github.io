/* ============================================================
 * ALTORRA CARS · home-motion.js — Motions cinematic del index
 * ------------------------------------------------------------
 * PORT vanilla (ES5-style, IIFE) de los efectos de
 *   altorra-cars-design-system/project/redesign/Home.jsx:
 *     - useScrollProgress  (L44-57)
 *     - Hero parallax bg   (L142-157)  → transform only (doctrina §17)
 *     - Word reveal .cinWord (L62-75)  → CSS-only (keyframe cinWord ya
 *       en cinematic.css); este módulo NO re-implementa la animación,
 *       solo aplica los stagger delays en los spans ya existentes.
 *     - IntersectionObserver reveals   → agrega clases is-in / cin-mani-in
 *       / cin-trail-in / cin-in (burbuja) según las clases que el CSS espera.
 *     - Counters animados  (L1127-1145) → easing ease-out cubic (1-p)^3,
 *       duration 1600ms, only run when el entra en view Y datos disponibles.
 *
 * Respeta prefers-reduced-motion: si está activo, parallax/word-reveal
 * se deshabilitan y los counters saltan al valor final sin animar.
 *
 * Doctrina §35: NO MutationObserver global, NO pointermove persistente.
 * Doctrina §17: SOLO transform/opacity animados; rAF-throttled scroll.
 *
 * Se monta en DOMContentLoaded (idempotente vía flag).
 * Se registra en window.AltorraHome.motion para que home.js lo llame,
 * pero también hace su propio DOMContentLoaded para seguridad.
 * ============================================================ */
(function () {
    'use strict';

    if (window.__altorraHomeMotionMounted) return;

    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var countersRan = false; // fire-once para todo el strip

    // ============================================================
    // 1 · SCROLL PROGRESS BAR
    //     port de useScrollProgress (Home.jsx L44-57)
    //     El CSS lee --p via .cin-scroll-progress::after {width: var(--p,0%)}
    // ============================================================
    function initScrollProgress() {
        var el = document.querySelector('.cin-scroll-progress');
        if (!el) return;

        if (reducedMotion) {
            el.style.setProperty('--p', '0%');
            return;
        }

        var ticking = false;

        function onScroll() {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(function () {
                var max = document.documentElement.scrollHeight - window.innerHeight;
                var p = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0;
                el.style.setProperty('--p', p + '%');
                ticking = false;
            });
        }

        onScroll(); // initial
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    // ============================================================
    // 2 · HERO PARALLAX
    //     port de useEffect en CinHero (Home.jsx L142-157)
    //     bg.style.transform = `scale(1.08) translate3d(0, ${sy}px, 0)`
    //     sy = window.scrollY * 0.18
    //     Doctrina §17: solo transform (scale ya en CSS, aquí se compone).
    // ============================================================
    function initHeroParallax() {
        var bg = document.querySelector('.cin-hero-bg');
        if (!bg) return;

        if (reducedMotion) {
            // CSS has scale(1.08) base — leave it, no dynamic transform
            return;
        }

        var sy = 0;
        var raf = null;

        function apply() {
            // §PERF 2.6 — leer scrollY DENTRO del rAF (batch read+write antes del
            // paint) evita el reflujo forzado que causaba leerlo en el handler de
            // scroll, donde colisiona con los writes de clase de otros módulos
            // (home-chrome onScroll) en el mismo frame.
            sy = (window.scrollY || window.pageYOffset || 0) * 0.18;
            bg.style.transform = 'scale(1.08) translate3d(0, ' + sy + 'px, 0)';
            raf = null;
        }

        function onScroll() {
            if (!raf) raf = window.requestAnimationFrame(apply);
        }

        onScroll(); // initial
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    // ============================================================
    // 3 · WORD REVEAL — CSS-only (cinematic.css keyframe cinWord)
    //     Los .cin-word ya tienen animation-delay inline en el markup
    //     estático (index.html):
    //       "Encuentra"→150ms, "el"→245ms, "Auto"→340ms
    //       "de"→560ms, "tus"→660ms, "Sueños"→760ms
    //     La animación cinWord se dispara sola desde CSS; JS no necesita
    //     intervenir. prefers-reduced-motion lo maneja el @media en CSS.
    //     → initWordReveal() eliminada (era redundante, Fix 2).
    // ============================================================

    // ============================================================
    // 4 · INTERSECTION OBSERVER REVEALS
    //     Agrega la clase correcta cuando cada sección entra en viewport.
    //     Usa threshold 0.25 (mismo que useInView del JSX L37).
    //
    //     Mapa sección → clase a agregar:
    //       .promo-section  → 'is-in'
    //       .cin-manifesto  → 'cin-mani-in'
    //       .cin-trail      → 'cin-trail-in'
    //       .cin-conv .cin-bubble → 'cin-in' (individual, con delay)
    //       .cin-stats      → observado para disparar counters (ver §5)
    //
    //     Después de agregar la clase, disconnect() (fire-once).
    //     Doctrina §35: cada IO observa su propio elemento; no hay IO
    //     global con subtree.
    // ============================================================
    function initReveal(selector, className, threshold) {
        var el = document.querySelector(selector);
        if (!el) return;

        if (reducedMotion) {
            el.classList.add(className);
            return;
        }

        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add(className);
                    io.disconnect();
                }
            });
        }, { threshold: threshold || 0.25 });

        io.observe(el);
    }

    function initConvBubbles() {
        // Cada burbuja entra individualmente con delay escalonado
        var bubbles = document.querySelectorAll('.cin-conv .cin-bubble');
        if (!bubbles.length) return;

        if (reducedMotion) {
            for (var i = 0; i < bubbles.length; i++) {
                bubbles[i].classList.add('cin-in');
            }
            return;
        }

        var io = new IntersectionObserver(function (entries) {
            if (!entries[0].isIntersecting) return;
            // Añadir cin-in escalonado (JSX: opacity/transform transition en CSS)
            for (var j = 0; j < bubbles.length; j++) {
                (function (bubble, idx) {
                    setTimeout(function () {
                        bubble.classList.add('cin-in');
                    }, idx * 180);
                })(bubbles[j], j);
            }
            io.disconnect();
        }, { threshold: 0.2 });

        var convSection = document.querySelector('.cin-conv');
        if (convSection) io.observe(convSection);
    }

    function initAllRevealObservers() {
        initReveal('.promo-section', 'is-in', 0.2);
        initReveal('.cin-manifesto', 'cin-mani-in', 0.25);
        initReveal('.cin-trail', 'cin-trail-in', 0.2);
        initConvBubbles();
    }

    // ============================================================
    // 5 · COUNTERS ANIMADOS
    //     port de Counter (Home.jsx L1127-1145):
    //       easing: eased = 1 - (1-p)^3  (ease-out cubic)
    //       duration: 1600ms
    //       dispara solo cuando la sección entra en view Y
    //       (si data-counter-source="brands") los datos están listos.
    //
    //     Markup espera:
    //       <div class="cin-stat-num" data-counter="N" [data-suffix="+"]
    //                                 [data-counter-source="brands"]>
    //           <span>0</span>
    //       </div>
    //     El <span> interior recibe el textContent animado.
    //     data-counter-source="brands": usa window.vehicleDB.getAllBrands().length
    //       como valor real si está disponible, o el fallback data-counter.
    // ============================================================

    function getCounterTarget(el) {
        var source = el.getAttribute('data-counter-source');
        if (source === 'brands' && window.vehicleDB && typeof window.vehicleDB.getAllBrands === 'function') {
            var brands = window.vehicleDB.getAllBrands();
            if (brands && brands.length > 0) return brands.length;
        }
        var val = parseInt(el.getAttribute('data-counter'), 10);
        return isNaN(val) ? 0 : val;
    }

    function animateCounter(spanEl, to, suffix, duration) {
        var start = null;
        var d = duration || 1600;

        function step(timestamp) {
            if (!start) start = timestamp;
            var elapsed = timestamp - start;
            var p = Math.min(1, elapsed / d);
            var eased = 1 - Math.pow(1 - p, 3);
            spanEl.textContent = Math.floor(eased * to) + (suffix || '');
            if (p < 1) {
                window.requestAnimationFrame(step);
            } else {
                spanEl.textContent = to + (suffix || '');
            }
        }

        window.requestAnimationFrame(step);
    }

    function runCounters() {
        if (countersRan) return;
        countersRan = true;

        var statNums = document.querySelectorAll('.cin-stats .cin-stat-num[data-counter]');
        for (var i = 0; i < statNums.length; i++) {
            var el = statNums[i];
            var spanEl = el.querySelector('span');
            if (!spanEl) continue;
            var to = getCounterTarget(el);
            var suffix = el.getAttribute('data-suffix') || '';

            if (reducedMotion) {
                spanEl.textContent = to + suffix;
            } else {
                animateCounter(spanEl, to, suffix, 1600);
            }
        }
    }

    function initCounters() {
        var statsSection = document.querySelector('.cin-stats');
        if (!statsSection) return;

        // Fire-once IO: cuando el strip entra en vista
        var io = new IntersectionObserver(function (entries) {
            if (!entries[0].isIntersecting) return;
            io.disconnect();

            // Si vehicleDB ya está cargado, animamos de inmediato
            if (window.vehicleDB && window.vehicleDB.loaded) {
                runCounters();
            } else {
                // Fallback: esperamos a que vehicleDB esté disponible
                // (sondeo acotado, max ~5s, no MutationObserver)
                var tries = 0;
                var iv = setInterval(function () {
                    tries++;
                    if ((window.vehicleDB && window.vehicleDB.loaded) || tries > 50) {
                        clearInterval(iv);
                        runCounters();
                    }
                }, 100);
            }
        }, { threshold: 0.25 });

        io.observe(statsSection);
    }

    // ============================================================
    // 6 · HERO META RIGHT — reloj/ciudad (SP-5.0)
    //     Popula #cinHeroClock con "Cartagena · 10:42 PM" en es-CO.
    //     Refresca cada 30s. Sin reduced-motion check (no es animación).
    // ============================================================
    function initHeroClock() {
        var el = document.getElementById('cinHeroClock');
        if (!el) return;

        function fmt() {
            var d = new Date();
            // es-CO con {weekday:'long', day:'numeric', month:'long'} da algo
            // como "jueves, 29 de mayo". El padre .cin-hero-meta tiene
            // text-transform: uppercase (cinematic.css:127), así que se ve
            // "JUEVES, 29 DE MAYO" — sin capitalizar manualmente.
            var date = d.toLocaleDateString('es-CO', {
                weekday: 'long', day: 'numeric', month: 'long'
            });
            var time = d.toLocaleTimeString('es-CO', {
                hour: 'numeric', minute: '2-digit', hour12: true
            });
            return date + ' · ' + time;
        }

        el.textContent = fmt();
        // Refresh cada 30s; no cleanup porque es módulo single-page life-of-tab.
        setInterval(function () { el.textContent = fmt(); }, 30000);
    }

    // ============================================================
    // 7 · HERO VEHICLE COUNT — dinámico (SP-5.0)
    //     Reemplaza el texto hardcoded "+90 vehículos" con el conteo real
    //     de vehicleDB.getAllVehicles(). Re-render on onChange('vehicles').
    //     Mantiene el "+" como floor marketing-friendly.
    // ============================================================
    function initHeroVehicleCount() {
        var el = document.getElementById('cinHeroVehicleCount');
        if (!el) return;

        function update() {
            if (!window.vehicleDB || typeof window.vehicleDB.getAllVehicles !== 'function') return;
            var all = window.vehicleDB.getAllVehicles();
            if (!all || !all.length) return;
            el.textContent = '+' + all.length + ' vehículos';
        }

        if (window.vehicleDB && window.vehicleDB.loaded) {
            update();
        } else {
            // Esperar a que vehicleDB cargue (poll acotado, max ~8s).
            var tries = 0;
            var iv = setInterval(function () {
                tries++;
                if ((window.vehicleDB && window.vehicleDB.loaded) || tries > 80) {
                    clearInterval(iv);
                    update();
                }
            }, 100);
        }

        // Re-render cuando el inventario cambie (admin agrega/borra).
        if (window.vehicleDB && typeof window.vehicleDB.onChange === 'function') {
            window.vehicleDB.onChange(function (changeType) {
                if (changeType === 'vehicles') update();
            });
        }
    }

    // ============================================================
    // INIT
    // ============================================================
    function init() {
        initScrollProgress();
        initHeroParallax();
        initAllRevealObservers();
        initCounters();
        initHeroClock();
        initHeroVehicleCount();

        // API pública para el orquestador home.js
        window.AltorraHome = window.AltorraHome || {};
        window.AltorraHome.motion = {
            reducedMotion: reducedMotion,
            runCounters: runCounters
        };
    }

    window.__altorraHomeMotionMounted = true;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
