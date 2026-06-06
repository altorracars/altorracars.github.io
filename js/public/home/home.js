/* ============================================================
 * ALTORRA CARS · home.js — Orquestador del index cinematic
 * ------------------------------------------------------------
 * Responsabilidades:
 *   1. Asegura body[data-cin="on"] (safety-net; ya viene estático).
 *   2. Orquesta los módulos del home (motion, chrome, carousels,
 *      quicktools) de forma robusta: solo llama a los que existen,
 *      sin lanzar excepciones si alguno aún no está disponible
 *      (Tasks 5/6 agregan carousels y quicktools después).
 *   3. Wiring de búsqueda: initHeroSearch() en main.js ya se
 *      auto-invoca en su propio DOMContentLoaded (via initializePage).
 *      Los IDs #heroSearchInput / #heroSearchDropdown están preservados
 *      en el markup nuevo — no hay que re-bindear nada aquí.
 *      Este módulo solo verifica (en modo debug) que los IDs existan.
 *
 * PATRÓN DE NAMESPACE (para Tasks 5/6):
 *   window.AltorraHome = window.AltorraHome || {}
 *   Cada módulo registra su init:
 *     AltorraHome.motion    → home-motion.js   (Task 4) ✓
 *     AltorraHome.carousels → home-carousels.js (Task 5, aún no existe)
 *     AltorraHome.quicktools→ quicktools.js     (Task 6, aún no existe)
 *     AltorraHome.chrome    → home-chrome.js    (Task 3, expone
 *                             window.AltorraHomeChrome, no AltorraHome.chrome)
 *
 * Todos los scripts son defer → todos los module bodies se ejecutan
 * ANTES de que DOMContentLoaded dispare. Así los guards typeof son
 * seguros sin importar el orden de inserción.
 *
 * Se monta en DOMContentLoaded (idempotente vía flag).
 * ============================================================ */
(function () {
    'use strict';

    if (window.__altorraHomeOrchestratorMounted) return;

    // ============================================================
    // INIT
    // ============================================================
    function init() {

        // ── 1. Safety-net body[data-cin="on"] (ya está estático) ──
        document.body.setAttribute('data-cin', 'on');

        // ── 2. Chrome (Task 3) ────────────────────────────────────
        // home-chrome.js se auto-monta en su propio DOMContentLoaded
        // con idempotencia; no hay nada que llamar aquí.
        // Si en el futuro se necesita interoperación, está en:
        //   window.AltorraHomeChrome.reveal()
        //   window.AltorraHomeChrome.closeDropdown()
        //   window.AltorraHomeChrome.closeDrawer()

        // ── 3. Motion (Task 4) ────────────────────────────────────
        // home-motion.js también se auto-monta; verificamos que se
        // haya registrado correctamente para tener un punto de control.
        if (!window.AltorraHome || typeof window.AltorraHome.motion !== 'object') {
            console.warn('[home.js] home-motion.js no se registró — verificar orden de scripts.');
        }

        // ── 4. Carruseles (Task 5 — aún no existe) ───────────────
        if (window.AltorraHome && typeof window.AltorraHome.carousels === 'object' &&
            typeof window.AltorraHome.carousels.init === 'function') {
            try {
                window.AltorraHome.carousels.init();
            } catch (e) {
                console.warn('[home.js] carousels.init() error:', e);
            }
        }

        // ── 5. QuickTools (Task 6 — aún no existe) ───────────────
        if (window.AltorraHome && typeof window.AltorraHome.quicktools === 'object' &&
            typeof window.AltorraHome.quicktools.init === 'function') {
            try {
                window.AltorraHome.quicktools.init();
            } catch (e) {
                console.warn('[home.js] quicktools.init() error:', e);
            }
        }

        // ── 6. Búsqueda del hero ──────────────────────────────────
        // initHeroSearch() (main.js L503) se llama desde initializePage()
        // (main.js L949) que se dispara en su propio DOMContentLoaded.
        // Los IDs #heroSearchInput y #heroSearchDropdown están preservados
        // en el markup — no hay doble-binding aquí.
        // Solo verificación defensiva:
        var hsInput = document.getElementById('heroSearchInput');
        var hsDropdown = document.getElementById('heroSearchDropdown');
        if (!hsInput || !hsDropdown) {
            console.warn('[home.js] #heroSearchInput o #heroSearchDropdown no encontrado — ' +
                'verificar que el markup del hero esté presente.');
        }

        // ── 6.5 Newsletter → CRM (escribe `subscriptions`; la ingestión
        //         crea el contacto subscriber). Captura que antes se perdía. ──
        try { initNewsletter(); } catch (e) { console.warn('[home.js] initNewsletter error:', e); }

        // ── 7. Exponer API del orquestador ────────────────────────
        window.AltorraHome = window.AltorraHome || {};
        window.AltorraHome.orchestrator = {
            // Permite a Tasks 5/6 llamar a initModules() si sus scripts
            // cargan después de DOMContentLoaded (no debería ocurrir con
            // defer, pero es un guard de seguridad).
            initModules: initModules
        };
    }

    function initModules() {
        if (window.AltorraHome && typeof window.AltorraHome.carousels === 'object' &&
            typeof window.AltorraHome.carousels.init === 'function') {
            try { window.AltorraHome.carousels.init(); } catch (e) {
                console.warn('[home.js] initModules: carousels.init() error:', e);
            }
        }
        if (window.AltorraHome && typeof window.AltorraHome.quicktools === 'object' &&
            typeof window.AltorraHome.quicktools.init === 'function') {
            try { window.AltorraHome.quicktools.init(); } catch (e) {
                console.warn('[home.js] initModules: quicktools.init() error:', e);
            }
        }
    }

    // ============================================================
    // NEWSLETTER → CRM (captura que antes se perdía: el form tenía
    // onsubmit="return false" sin handler). Escribe `subscriptions`;
    // el trigger onSubscriptionCreated crea/vincula el contacto subscriber.
    // Optimistic UI; offline-safe (la persistencia compat encola).
    // ============================================================
    function initNewsletter() {
        var form = document.querySelector('.cin-end-news');
        if (!form || form.__altNewsBound) return;
        form.__altNewsBound = true;
        var input = form.querySelector('.cin-end-news-input');
        var row = form.querySelector('.cin-end-news-row');

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var email = ((input && input.value) || '').trim().toLowerCase();
            if (!email || email.indexOf('@') < 1 || email.lastIndexOf('.') < email.indexOf('@')) {
                if (input) { input.setAttribute('aria-invalid', 'true'); input.focus(); }
                return;
            }
            if (input) input.removeAttribute('aria-invalid');

            // UI optimista: confirmación inmediata.
            if (row) {
                row.innerHTML = '';
                var ok = document.createElement('div');
                ok.className = 'cin-end-news-ok';
                ok.setAttribute('role', 'status');
                ok.style.cssText = 'color:var(--cin-gold,#D4A85A);font-weight:600;padding:10px 0;';
                ok.textContent = '✓ ¡Listo! Te avisaremos primero.';
                row.appendChild(ok);
            }

            // Persistencia en background → la ingestión crea el contacto.
            try {
                if (window.db && window.db.collection) {
                    window.db.collection('subscriptions').add({
                        email: email,
                        source: 'newsletter',
                        consentGiven: true,
                        page: (location && location.pathname) || '',
                        createdAt: new Date().toISOString()
                    }).catch(function () { /* offline → la persistencia compat encola */ });
                }
            } catch (err) { /* no romper la UI por un fallo de red */ }
        });
    }

    window.__altorraHomeOrchestratorMounted = true;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
