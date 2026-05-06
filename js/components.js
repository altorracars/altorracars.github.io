// Component Loader for ALTORRA CARS
// Versión Final Optimizada - iPhone Compatible

/**
 * whenReady — runs a callback once a predicate becomes true, with timeout.
 *
 * Used to gate code that depends on a lazy-loaded global (e.g.
 * `reviewsSystem`, `comparador`) without forcing the script to be
 * eager-loaded. The predicate is polled at a low interval and the
 * callback fires the first time it returns truthy. If it never does
 * within `timeout`, a console.warn is emitted and we give up gracefully
 * (no crash, no infinite poll).
 *
 * Usage:
 *   whenReady(
 *     function () { return typeof reviewsSystem !== 'undefined'; },
 *     function () { reviewsSystem.renderTestimonialsSection('...'); }
 *   );
 *
 * Options:
 *   timeout: max ms to wait (default 5000)
 *   poll:    poll interval in ms (default 100)
 *   label:   string for diagnostics on timeout (default 'whenReady')
 */
window.whenReady = function (predicate, callback, opts) {
    opts = opts || {};
    var maxWait = typeof opts.timeout === 'number' ? opts.timeout : 5000;
    var pollInterval = typeof opts.poll === 'number' ? opts.poll : 100;
    var label = opts.label || 'whenReady';
    var elapsed = 0;
    // Fast-path: predicate already true
    try {
        if (predicate()) { callback(); return; }
    } catch (e) {
        console.warn('[' + label + '] Predicate threw:', e);
    }
    var iv = setInterval(function () {
        elapsed += pollInterval;
        var ready = false;
        try { ready = !!predicate(); } catch (e) { /* ignore */ }
        if (ready) {
            clearInterval(iv);
            try { callback(); } catch (e) {
                console.error('[' + label + '] Callback threw:', e);
            }
            return;
        }
        if (elapsed >= maxWait) {
            clearInterval(iv);
            console.warn('[' + label + '] Timeout after', maxWait, 'ms');
        }
    }, pollInterval);
};

async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`Failed to load ${componentPath}`);
        }
        const html = await response.text();
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = html;
        }
    } catch (error) {
        console.error('Error loading component:', error);
    }
}

// Load all components
async function loadAllComponents() {
    await Promise.all([
        loadComponent('header-placeholder', 'snippets/header.html'),
        loadComponent('footer-placeholder', 'snippets/footer.html')
    ]);

    // STEP 1 — Apply auth state to header SYNCHRONOUSLY before revealing.
    // Reads localStorage hint + user snapshot to pre-render the avatar (if
    // authenticated) so the user sees the FINAL state at first paint.
    // Apple/Amazon pattern: optimistic UI from cached snapshot, then
    // Firebase confirms or replaces it.
    applyAuthHintToHeader();

    // STEP 2 — Reveal the right side of the header atomically (single
    // repaint). Uses rAF to ensure the auth state mutations above have
    // been applied before the opacity transition kicks in.
    requestAnimationFrame(function () {
        var actions = document.querySelector('#header .nav-actions');
        if (actions) actions.classList.add('hdr-ready');
    });

    // Ensure modals are available on ALL pages (Financiación, Vende tu Auto)
    loadModalsIfNeeded();

    // Cargar modal de autenticación pública en todas las páginas
    loadAuthSystem();

    // Close any open dropdowns/menus when navigating via hash (prevents pointer block)
    closeMenuOnHashNav();

    // Dismissir page loader — header y footer ya están listos
    if (typeof window.dismissPageLoader === 'function') {
        window.dismissPageLoader();
    } else {
        // Fallback: page-loader.js no cargado — ocultar loader directamente
        var _loader = document.getElementById('page-loader');
        if (_loader) {
            _loader.classList.add('pl-done');
            setTimeout(function () {
                if (_loader.parentNode) _loader.parentNode.removeChild(_loader);
            }, 800);
        }
    }
    // L1.3: also signal "loaded" here as a safety net, in case page-loader.js
    // didn't load (e.g. blocked by extension). Idempotent — adding the same
    // class twice is a no-op.
    document.body.classList.add('loaded');

    // Initialize after loading - pequeño delay para asegurar DOM
    setTimeout(() => {
        initializeHeader();
        initializeFavorites();
        setupFavoritesPreload();
        setupPredictivePrefetch();
        populateBrandsMenu();
        // Mount notification center bell (Phase N3)
        if (window.notifyCenter && document.getElementById('headerNotifBell')) {
            window.notifyCenter.mount('#headerNotifBell');
        }
    }, 100);

    // Cargar sistema de cookies dinamicamente
    loadCookieSystem();
}

// ── Pre-render auth state into header from cached snapshot ────────────
// Reads `altorra_auth_hint` from localStorage (set by auth.js on every
// login/logout). If hint says authenticated, pulls the cached user
// snapshot (`altorra_auth_user_snap`: name + photoURL) and renders an
// avatar placeholder synchronously into #headerUserArea — BEFORE the
// browser paints the header for the first time. This eliminates:
//   1. The flash of "Ingresar"/"Registrarse" buttons for logged-in users
//      (the html.auth-authenticated CSS already hides them, but having
//       the avatar pre-rendered means there's no skeleton dot either)
//   2. The avatar pop-in delay (was waiting ~200-500ms for Firebase Auth
//      to resolve from IndexedDB persistence)
// Pattern: Apple, Amazon, Linear all do optimistic UI from cached state.
// Firebase later confirms or updates via auth.js → updateHeaderAuthState.
function applyAuthHintToHeader() {
    var hint = null;
    var snap = null;
    try {
        hint = localStorage.getItem('altorra_auth_hint');
        var raw = localStorage.getItem('altorra_auth_user_snap');
        if (raw) snap = JSON.parse(raw);
    } catch (e) { /* localStorage disabled */ }

    var userArea = document.getElementById('headerUserArea');
    if (!userArea) return;

    if (hint === 'authenticated' && snap) {
        // Pre-render avatar from cached snapshot
        var name = (snap.name || '').toString();
        var initials = name.split(' ')
            .map(function (w) { return (w[0] || ''); })
            .slice(0, 2).join('').toUpperCase() || 'U';
        var photoURL = (snap.photoURL || '').toString();
        // Escape minimal: only photoURL is user-controlled
        var safePhoto = photoURL.replace(/"/g, '&quot;').replace(/</g, '&lt;');
        var safeFirstName = (name.split(' ')[0] || '')
            .replace(/[<>&"']/g, function (c) {
                return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' }[c];
            });
        var avatarContent = photoURL
            ? '<img src="' + safePhoto + '" alt="" style="width:100%;height:100%;border-radius:50%;object-fit:cover;" onerror="this.parentNode.textContent=\'' + initials + '\'">'
            : initials;
        userArea.style.display = '';
        userArea.innerHTML =
            '<div class="hdr-user-wrapper" data-prerendered="1">' +
            '<button class="hdr-user-btn" id="hdrUserBtn" aria-label="Mi cuenta" aria-expanded="false">' +
            '<span class="hdr-user-avatar">' + avatarContent + '</span>' +
            '<span class="hdr-user-name">' + safeFirstName + '</span>' +
            '<svg class="hdr-user-chevron" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>' +
            '</button>' +
            '</div>';
    } else if (hint === 'authenticated') {
        // Authenticated but no snapshot — keep the empty area; CSS shows
        // the skeleton placeholder via :empty::before. auth.js will fill.
        userArea.style.display = '';
    } else {
        // Guest — auth-hint CSS already hides #headerUserArea, ensure
        // login/register buttons are visible (they are by default)
        userArea.style.display = 'none';
    }
}

// ── Google Identity Services (GIS) — modern OAuth library ─────────
// Loads accounts.google.com/gsi/client which provides:
//   - One Tap login (top-right card for returning Google users)
//   - Personalized button ("Continue as Carlos")
//   - signInWithCredential flow without popup → ZERO COOP warnings
//
// SAFETY FALLBACK: If this script fails to load (adblocker, network,
// CSP, etc), `window.google` won't exist → auth.js detects this and
// falls back to the legacy `signInWithPopup`. Login still works.
//
// Why we still load it even when GIS_CONFIGURED is false:
//   - The script is small (~50KB) and cached aggressively by Google
//   - Loading it but not using it has zero side effects
//   - When user later configures the Client ID, no code changes needed
//
// Triggered ONLY when auth modal is needed (lazy via loadAuthSystem)
function loadGisLibrary() {
    if (window._gisLoading || window._gisLoaded) return;
    if (document.querySelector('script[src*="accounts.google.com/gsi/client"]')) {
        window._gisLoaded = true;
        return;
    }
    window._gisLoading = true;
    var script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = function () {
        window._gisLoaded = true;
        window._gisLoading = false;
        // Notify auth.js if it's waiting
        if (typeof window._onGisReady === 'function') {
            try { window._onGisReady(); } catch (e) {
                console.warn('[GIS] _onGisReady callback threw:', e);
            }
        }
    };
    script.onerror = function () {
        window._gisLoading = false;
        window._gisLoadFailed = true;
        // Common causes: adblocker, CSP, network. NOT an error — auth.js
        // falls back to legacy signInWithPopup automatically.
        console.info('[GIS] Library blocked or failed to load — falling back to legacy popup flow');
    };
    document.head.appendChild(script);
}

// ── Sistema de Autenticación Pública ────────────────────────
// Carga Lucide (si no está ya), el modal HTML, CSS y auth.js
function loadAuthSystem() {
    // No cargar en admin.html — tiene su propia auth
    if (window.location.pathname.indexOf('admin') !== -1) return;

    // Load GIS library in parallel (failure is gracefully handled)
    loadGisLibrary();

    // 1. Lucide Icons CDN (misma versión que admin)
    if (!window.lucide && !document.querySelector('script[src*="lucide"]')) {
        var lucideScript = document.createElement('script');
        lucideScript.src = 'https://cdn.jsdelivr.net/npm/lucide@0.468.0/dist/umd/lucide.min.js';
        lucideScript.defer = true;
        lucideScript.onload = function() {
            // Crear iconos en el auth modal si ya está en el DOM
            var modal = document.getElementById('auth-modal');
            if (modal && window.lucide) window.lucide.createIcons({ nodes: [modal] });
            // Crear iconos en el header (área de usuario si ya está logueado)
            var hdr = document.getElementById('headerUserArea');
            if (hdr && window.lucide) window.lucide.createIcons({ nodes: [hdr] });
        };
        document.head.appendChild(lucideScript);
    }

    // 2. CSS del auth modal
    if (!document.querySelector('link[href*="auth.css"]')) {
        var cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = 'css/auth.css';
        document.head.appendChild(cssLink);
    }

    // 3. CSS del header user area (dropdown) — DEPRECATED:
    // Now merged into style.css for first-paint readiness. The async
    // load is kept as a no-op for any user that has the old file
    // referenced in their cache. (Header Loading Sprint, 2026-05-03)

    // 4. HTML del modal — inyectar en body
    if (!document.getElementById('auth-modal')) {
        fetch('snippets/auth-modal.html')
            .then(function(r) { return r.text(); })
            .then(function(html) {
                var div = document.createElement('div');
                div.innerHTML = html;
                document.body.appendChild(div.firstElementChild);
                // 5. JS de auth — cargar después de tener el DOM del modal
                if (!document.querySelector('script[src*="auth.js"]')) {
                    var script = document.createElement('script');
                    script.src = 'js/auth.js';
                    document.body.appendChild(script);
                }
                // 5b. Pillar D — realtime listener for solicitudes/citas
                if (!document.querySelector('script[src*="solicitudes-watcher.js"]')) {
                    var swScript = document.createElement('script');
                    swScript.src = 'js/solicitudes-watcher.js';
                    swScript.defer = true;
                    document.body.appendChild(swScript);
                }
                // 5c. Bloque U (mega-plan v4) — Concierge Unificado
                // REEMPLAZA whatsapp-widget.js + ai-assistant.js con
                // un único botón inteligente (bot AI + asesor live + WhatsApp gateway).
                // CSS y JS cargados juntos para inicialización atómica.
                if (!document.querySelector('link[href*="concierge.css"]')) {
                    var cncCss = document.createElement('link');
                    cncCss.rel = 'stylesheet';
                    cncCss.href = 'css/concierge.css';
                    document.head.appendChild(cncCss);
                }
                if (!document.querySelector('script[src*="concierge.js"]')) {
                    var cncScript = document.createElement('script');
                    cncScript.src = 'js/concierge.js';
                    cncScript.defer = true;
                    document.body.appendChild(cncScript);
                }
                // §22 Capa A+B — Fuzzy matching + sinónimos. CARGAR PRIMERO porque
                // intent.js y faq-ranker.js lo usan vía window.AltorraFuzzy.
                if (!document.querySelector('script[src*="ai/fuzzy.js"]')) {
                    var aiFuzzy = document.createElement('script');
                    aiFuzzy.src = 'js/ai/fuzzy.js';
                    aiFuzzy.defer = true;
                    document.body.appendChild(aiFuzzy);
                }
                // Cargar AI Engine + NER en paginas publicas (Concierge los usa)
                if (!document.querySelector('script[src*="ai/engine.js"]')) {
                    var aiEng = document.createElement('script');
                    aiEng.src = 'js/ai/engine.js';
                    aiEng.defer = true;
                    document.body.appendChild(aiEng);
                }
                if (!document.querySelector('script[src*="ai/ner.js"]')) {
                    var aiNer = document.createElement('script');
                    aiNer.src = 'js/ai/ner.js';
                    aiNer.defer = true;
                    document.body.appendChild(aiNer);
                }
                // AI Intent classifier (Concierge inteligencia conversacional)
                if (!document.querySelector('script[src*="ai/intent.js"]')) {
                    var aiInt = document.createElement('script');
                    aiInt.src = 'js/ai/intent.js';
                    aiInt.defer = true;
                    document.body.appendChild(aiInt);
                }
                // §22 Capa D — Inventory search (Concierge consulta vehículos reales)
                if (!document.querySelector('script[src*="ai/inventory-search.js"]')) {
                    var aiInv = document.createElement('script');
                    aiInv.src = 'js/ai/inventory-search.js';
                    aiInv.defer = true;
                    document.body.appendChild(aiInv);
                }
                // §22 Propuesta #1 — TF-IDF FAQ ranker (KB matching avanzado)
                if (!document.querySelector('script[src*="ai/faq-ranker.js"]')) {
                    var aiRanker = document.createElement('script');
                    aiRanker.src = 'js/ai/faq-ranker.js';
                    aiRanker.defer = true;
                    document.body.appendChild(aiRanker);
                }
                // §24 FASE 1 — Small Talk Engine (saludos coloquiales colombianos)
                if (!document.querySelector('script[src*="ai/small-talk.js"]')) {
                    var aiST = document.createElement('script');
                    aiST.src = 'js/ai/small-talk.js';
                    aiST.defer = true;
                    document.body.appendChild(aiST);
                }
                // §24 FASE 3 — Transformers.js (lazy stub, opt-in via flag)
                if (!document.querySelector('script[src*="ai/transformers.js"]')) {
                    var aiTF = document.createElement('script');
                    aiTF.src = 'js/ai/transformers.js';
                    aiTF.defer = true;
                    document.body.appendChild(aiTF);
                }
                // §24 FASE 4 — DualCore router (debe cargar DESPUÉS de los demás
                // módulos AI porque depende de AltorraIntent + AltorraSmallTalk +
                // AltorraTransformers + AltorraAI providers)
                if (!document.querySelector('script[src*="ai/dual-core.js"]')) {
                    var aiDC = document.createElement('script');
                    aiDC.src = 'js/ai/dual-core.js';
                    aiDC.defer = true;
                    document.body.appendChild(aiDC);
                }
                // Comm schema para que el Concierge pueda crear leads bien tipados
                if (!document.querySelector('script[src*="comm-schema.js"]')) {
                    var schema = document.createElement('script');
                    schema.src = 'js/comm-schema.js';
                    schema.defer = true;
                    document.body.appendChild(schema);
                }
                // U.5 — Knowledge Base client (FAQ que admin gestiona)
                if (!document.querySelector('script[src*="kb-client.js"]')) {
                    var kb = document.createElement('script');
                    kb.src = 'js/kb-client.js';
                    kb.defer = true;
                    document.body.appendChild(kb);
                }
                // U.19 — Marketing opt-in granular + GDPR
                if (!document.querySelector('script[src*="concierge-optin.js"]')) {
                    var optin = document.createElement('script');
                    optin.src = 'js/concierge-optin.js';
                    optin.defer = true;
                    document.body.appendChild(optin);
                }
                // D.7 — AI Auto-Scheduling helper para el Concierge
                if (!document.querySelector('script[src*="admin-calendar-config.js"]')) {
                    var calCfg = document.createElement('script');
                    calCfg.src = 'js/admin-calendar-config.js';
                    calCfg.defer = true;
                    document.body.appendChild(calCfg);
                }
            })
            .catch(function(e) { console.warn('[Auth] No se pudo cargar auth-modal.html', e); });
    }
}

// Cargar CSS y JS de cookies
function loadCookieSystem() {
    // Cargar CSS
    if (!document.querySelector('link[href*="cookies.css"]')) {
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = 'css/cookies.css';
        document.head.appendChild(cssLink);
    }

    // Cargar JS
    if (!document.querySelector('script[src*="cookies.js"]')) {
        const script = document.createElement('script');
        script.src = 'js/cookies.js';
        document.body.appendChild(script);
    }
}

// NOTA: El asistente WhatsApp está integrado al final de este archivo.

// Initialize header functionality - MEJORADO PARA iPHONE
function initializeHeader() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const body = document.body;

    if (!hamburger || !navMenu) {
        console.error('Menu elements not found');
        return;
    }

    // Safety cleanup: remove leftover menu-open state from prior navigation
    body.classList.remove('menu-open', 'nav-menu-active');
    body.style.overflow = '';
    body.style.position = '';
    body.style.width = '';
    
    // ===== TOGGLE MENÚ HAMBURGUESA =====
    hamburger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isActive = navMenu.classList.contains('active');
        
        if (isActive) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    
    function openMenu() {
        navMenu.classList.add('active');
        hamburger.classList.add('active');
        body.classList.add('menu-open', 'nav-menu-active');
        body.style.overflow = 'hidden';
        body.style.position = 'fixed';
        body.style.width = '100%';
    }
    
    function closeMenu() {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        body.classList.remove('menu-open', 'nav-menu-active');
        body.style.overflow = '';
        body.style.position = '';
        body.style.width = '';
        
        // Cerrar todos los dropdowns
        document.querySelectorAll('.dropdown.active').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
    
    // ===== CERRAR AL HACER CLICK FUERA =====
    document.addEventListener('click', function(e) {
        if (navMenu.classList.contains('active')) {
            // Si el click NO es en el menú ni en el hamburger
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                closeMenu();
            }
        }
    });
    
    // ===== PREVENIR CIERRE AL CLICK DENTRO DEL MENÚ =====
    navMenu.addEventListener('click', function(e) {
        // No cerrar si es un dropdown toggle
        if (e.target.classList.contains('nav-link') && 
            e.target.parentElement.classList.contains('dropdown')) {
            return;
        }
        // Cerrar solo si es un link final (no dropdown parent)
        if (e.target.tagName === 'A' && 
            !e.target.classList.contains('nav-link')) {
            closeMenu();
        }
    });
    
    // ===== DROPDOWN FUNCTIONALITY =====
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('.nav-link');
        
        if (dropdownLink) {
            dropdownLink.addEventListener('click', function(e) {
                // En móvil, toggle dropdown
                if (window.innerWidth <= 968) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const isActive = dropdown.classList.contains('active');
                    
                    // Cerrar otros dropdowns
                    dropdowns.forEach(other => {
                        if (other !== dropdown) {
                            other.classList.remove('active');
                        }
                    });
                    
                    // Toggle este dropdown
                    dropdown.classList.toggle('active');
                }
            });
        }
        
        // Hover en desktop
        if (window.innerWidth > 968) {
            dropdown.addEventListener('mouseenter', function() {
                dropdown.classList.add('active');
            });
            
            dropdown.addEventListener('mouseleave', function() {
                dropdown.classList.remove('active');
            });
        }
    });
    
    // ===== REINICIALIZAR AL CAMBIAR TAMAÑO =====
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Si cambiamos a desktop, cerrar menú móvil
            if (window.innerWidth > 968 && navMenu.classList.contains('active')) {
                closeMenu();
            }
            
            // Cerrar todos los dropdowns
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }, 250);
    });
    
    // ===== STICKY + SMART HIDE/SHOW HEADER (UNIFIED) =====
    // Single scroll listener for the entire site. Uses rAF to coalesce
    // multiple scroll events into one DOM update per frame. State is
    // cached to avoid redundant classList mutations (each unnecessary
    // .add()/.remove() still triggers a style invalidation even if the
    // class is already present).
    let lastScroll = 0;
    let ticking = false;
    let isSticky = false;       // tracks current `.sticky` state
    let isHidden = false;       // tracks current `.header--hidden` state
    const HIDE_THRESHOLD = 80;
    const STICKY_THRESHOLD = 10;
    const _cachedHeader = document.getElementById('header');

    window.addEventListener('scroll', function () {
        if (ticking || !_cachedHeader) return;
        ticking = true;
        window.requestAnimationFrame(function () {
            // Read scroll position ONCE per frame (prevents layout thrashing)
            const currentScroll = window.pageYOffset || window.scrollY;

            // Sticky toggle (only mutate DOM if state actually changed)
            const shouldBeSticky = currentScroll > STICKY_THRESHOLD;
            if (shouldBeSticky !== isSticky) {
                _cachedHeader.classList.toggle('sticky', shouldBeSticky);
                isSticky = shouldBeSticky;
            }

            // Smart hide/show — only past the threshold
            let shouldBeHidden;
            if (currentScroll > HIDE_THRESHOLD) {
                shouldBeHidden = currentScroll > lastScroll; // scrolling down
            } else {
                shouldBeHidden = false; // near top → always visible
            }
            if (shouldBeHidden !== isHidden) {
                _cachedHeader.classList.toggle('header--hidden', shouldBeHidden);
                isHidden = shouldBeHidden;
            }

            lastScroll = currentScroll <= 0 ? 0 : currentScroll;
            ticking = false;
        });
    }, { passive: true });
    
    // ===== PREVENIR SCROLL MIENTRAS SE ARRASTRA EN MÓVIL =====
    navMenu.addEventListener('touchmove', function(e) {
        e.stopPropagation();
    }, { passive: true });
    
    // ===== CERRAR MENÚ CON ESCAPE =====
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });
}

// Initialize favorites counter - USA FAVORITES MANAGER (Firestore-only)
function initializeFavorites() {
    if (typeof window.favoritesManager !== 'undefined') {
        window.favoritesManager.updateAllCounters();
    }
}

// Helper conservado para compatibilidad de llamadas externas.
function updateFavoritesCount() {
    if (typeof window.favoritesManager !== 'undefined') {
        window.favoritesManager.updateAllCounters();
    }
}

window.updateFavoritesCount = updateFavoritesCount;

// L4.1: PREDICTIVE PREFETCH on hover/focus/touch.
// When the user hovers a nav link for ≥75ms (= intent to navigate),
// prefetch the target HTML in idle priority via <link rel="prefetch">.
// Subsequent click loads from cache → near-instant navigation.
//
// Pattern from Quicklink/Astro. Skips if connection is slow (2g) or
// the user has Save-Data enabled, to respect data-conscious users.
//
// NOTE: this is HTML prefetch only. Preloading site-wide data is still
// done by setupFavoritesPreload below (which warms vehicleDB JSON).
function setupPredictivePrefetch() {
    // Bail out on slow networks / data-saver mode
    var conn = navigator.connection;
    if (conn) {
        if (conn.saveData) return;
        if (conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g') return;
    }

    var prefetched = new Set();

    function prefetch(url) {
        if (prefetched.has(url)) return;
        prefetched.add(url);
        var link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        link.as = 'document';
        document.head.appendChild(link);
    }

    function isInternalNav(href) {
        if (!href) return false;
        var c = href.charAt(0);
        if (c === '#') return false;
        if (/^(mailto:|tel:|sms:|javascript:|data:)/i.test(href)) return false;
        try {
            var u = new URL(href, location.href);
            if (u.hostname !== location.hostname) return false;
            // same-page hash links
            if (u.pathname === location.pathname && !u.search) return false;
            // Skip downloads / non-doc files
            if (/\.(pdf|zip|docx?|xlsx?|jpg|jpeg|png|webp|svg|gif|mp4|mp3)$/i.test(u.pathname)) return false;
            return true;
        } catch (e) { return false; }
    }

    var hoverTimer = null;
    var lastLink = null;

    function startIntent(link) {
        if (!link || link === lastLink) return;
        var href = link.getAttribute('href');
        if (!isInternalNav(href)) return;
        lastLink = link;
        clearTimeout(hoverTimer);
        hoverTimer = setTimeout(function () {
            prefetch(link.href);
        }, 75);
    }
    function cancelIntent() {
        clearTimeout(hoverTimer);
        lastLink = null;
    }

    function findLink(e) {
        return e.target && e.target.closest ? e.target.closest('a[href]') : null;
    }

    document.addEventListener('mouseover', function (e) {
        var l = findLink(e);
        if (l) startIntent(l);
    }, { passive: true });

    document.addEventListener('mouseout', function (e) {
        var l = findLink(e);
        if (l && l === lastLink) cancelIntent();
    }, { passive: true });

    document.addEventListener('focus', function (e) {
        var l = findLink(e);
        if (l) startIntent(l);
    }, true); // capture so we catch focus on <a> children too

    // Touch devices: no hover, but touchstart is a strong intent signal
    document.addEventListener('touchstart', function (e) {
        var l = findLink(e);
        if (l) {
            var href = l.getAttribute('href');
            if (isInternalNav(href)) prefetch(l.href);
        }
    }, { passive: true });
}

// Preload vehicleDB when user hovers favoritos link, so the page renders
// instantly after click. Cancels itself after first preload.
function setupFavoritesPreload() {
    var links = document.querySelectorAll(
        'a[href="favoritos.html"], a[href$="/favoritos.html"], a[href*="favoritos.html"]'
    );
    if (links.length === 0) return;
    var preloaded = false;
    function doPreload() {
        if (preloaded) return;
        preloaded = true;
        if (window.vehicleDB && !window.vehicleDB.loaded
            && typeof window.vehicleDB.load === 'function') {
            try { window.vehicleDB.load(); } catch (e) {}
        }
    }
    var opts = { passive: true };
    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener('mouseenter', doPreload, opts);
        links[i].addEventListener('focus', doPreload, opts);
        links[i].addEventListener('touchstart', doPreload, opts);
    }
}

// Load components when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAllComponents);
} else {
    loadAllComponents();
}

// Utility: force-close the mobile menu and all dropdowns.
// Resets body scroll lock so the page is always interactive after navigation.
function forceCloseAllMenus() {
    document.querySelectorAll('.dropdown.active').forEach(function (d) {
        d.classList.remove('active');
    });
    var navMenu = document.getElementById('navMenu');
    var hamburger = document.getElementById('hamburger');
    if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
    if (hamburger) hamburger.classList.remove('active');
    document.body.classList.remove('menu-open', 'nav-menu-active');
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
}

// Load modals HTML/CSS/JS dynamically on all pages
function loadModalsIfNeeded() {
    // Skip if modals already exist (e.g. index.html has them inline)
    if (document.getElementById('vende-auto-modal')) return;

    fetch('snippets/modals.html')
        .then(function (r) { return r.ok ? r.text() : ''; })
        .then(function (html) {
            if (!html) return;

            // Inject modal HTML into body
            var container = document.createElement('div');
            container.id = 'modals-container';
            container.innerHTML = html;
            document.body.appendChild(container);

            // Load CSS if not already present
            if (!document.querySelector('link[href*="contact-forms.css"]')) {
                var css = document.createElement('link');
                css.rel = 'stylesheet';
                css.href = 'css/contact-forms.css';
                document.head.appendChild(css);
            }

            // Load JS if not already present
            if (!document.querySelector('script[src*="contact-forms.js"]')) {
                var script = document.createElement('script');
                script.src = 'js/contact-forms.js';
                document.body.appendChild(script);
            }
        })
        .catch(function () { /* Modals are non-critical */ });
}

// Ensure dropdowns and mobile menu close on hash-based navigation
function closeMenuOnHashNav() {
    window.addEventListener('hashchange', forceCloseAllMenus);
}

// BFCache cleanup: force-close mobile menu on back/forward navigation
// DOMContentLoaded does NOT fire on bfcache restore, so we need pageshow
window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
        forceCloseAllMenus();
    }
});

// Smooth scroll para links internos (incluye links tipo "index.html#section")
document.addEventListener('DOMContentLoaded', function() {
    // Helper: scroll to an element accounting for fixed header
    function smoothScrollTo(el) {
        var header = document.getElementById('header');
        var headerHeight = header ? header.offsetHeight + 10 : 70;
        var targetPos = el.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }

    // Detect if href points to the current page (generic, works on any page)
    function isSamePageHash(href) {
        try {
            var url = new URL(href, location.href);
            return url.hash && url.pathname === location.pathname;
        } catch (e) {
            // Fallback for browsers without URL API
            var hashIdx = href.indexOf('#');
            if (hashIdx === -1) return false;
            var path = href.substring(0, hashIdx);
            if (!path) return true; // pure "#hash"
            var currentFile = location.pathname.split('/').pop() || 'index.html';
            return path === currentFile;
        }
    }

    // Handle hash on page load (e.g. navigated from another page with #marcas)
    if (window.location.hash) {
        // Delay to let layout settle after components load
        setTimeout(function() {
            var hashTarget = document.querySelector(window.location.hash);
            if (hashTarget) smoothScrollTo(hashTarget);
        }, 600);
    }

    // Delegate click handler for all anchor links with hashes
    document.addEventListener('click', function(e) {
        var link = e.target.closest('a[href]');
        if (!link) return;

        var href = link.getAttribute('href');
        if (!href || href.indexOf('#') === -1) return;

        var hash = href.substring(href.indexOf('#'));
        if (hash === '#' || hash.length < 2) return;

        if (isSamePageHash(href)) {
            var target = document.querySelector(hash);
            if (target) {
                e.preventDefault();
                e.stopPropagation(); // Prevent page-loader from also intercepting

                // Close all menus/dropdowns before scrolling
                forceCloseAllMenus();

                smoothScrollTo(target);
                history.replaceState(null, '', hash);
            }
        }
        // If not current page, let the browser navigate normally
        // The hash will be handled on the destination page via the load handler above
    }, true); // Use capture phase to fire BEFORE page-loader's bubble handler
});

// Auth: _authComingSoon is now overridden by auth.js to open the login modal.
// Kept as fallback in case auth.js hasn't loaded yet.
window._authComingSoon = function() {
    if (window.AltorraAuth) { window.AltorraAuth.open('login'); return; }
    if (typeof toast !== 'undefined' && toast && toast.info) {
        toast.info('Cargando... intenta de nuevo en un momento.');
    }
};

// Populate brands submenu dynamically from Firestore inventory
async function populateBrandsMenu() {
    if (typeof vehicleDB === 'undefined') return;

    try {
        await vehicleDB.load();
        var vehicles = vehicleDB.getAll ? vehicleDB.getAll() : [];
        if (!vehicles.length) return;

        // Count available vehicles per brand
        var brandCount = {};
        vehicles.forEach(function (v) {
            if (v.estado === 'disponible' && v.marca) {
                var key = v.marca.toLowerCase();
                brandCount[key] = (brandCount[key] || 0) + 1;
            }
        });

        // Sort by count descending, take top 10
        var sorted = Object.entries(brandCount)
            .sort(function (a, b) { return b[1] - a[1]; })
            .slice(0, 10);

        if (!sorted.length) return;

        var ul = document.getElementById('brands-submenu');
        if (!ul) return;

        // Capitalize brand name for display
        function capitalize(s) {
            return s.charAt(0).toUpperCase() + s.slice(1);
        }

        ul.innerHTML = sorted.map(function (entry) {
            var brandId = entry[0];
            return '<li><a href="marca.html?marca=' + brandId + '">' + capitalize(brandId) + '</a></li>';
        }).join('') + '<li><a href="marcas.html">Ver todas</a></li>';
    } catch (e) {
        // Keep static placeholder on error
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadAllComponents,
        initializeHeader,
        initializeFavorites,
        updateFavoritesCount,
        populateBrandsMenu
    };
}


// ═══════════════════════════════════════════════════════════════════════════
// NOTA: el IIFE legacy ASISTENTE WHATSAPP (líneas 910-1942 anteriores, 1032 líneas)
// fue ELIMINADO en la purga del flujo rígido (Mega-Plan v4 Bloque U cumplido).
// Reemplazado por js/concierge.js cargado desde loadAuthSystem (línea ~314).
// ═══════════════════════════════════════════════════════════════════════════
