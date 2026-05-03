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

// ── Sistema de Autenticación Pública ────────────────────────
// Carga Lucide (si no está ya), el modal HTML, CSS y auth.js
function loadAuthSystem() {
    // No cargar en admin.html — tiene su propia auth
    if (window.location.pathname.indexOf('admin') !== -1) return;

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

    // 3. CSS del header user area (dropdown)
    if (!document.querySelector('link[href*="auth-header.css"]')) {
        var cssLink2 = document.createElement('link');
        cssLink2.rel = 'stylesheet';
        cssLink2.href = 'css/auth-header.css';
        document.head.appendChild(cssLink2);
    }

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
// ASISTENTE WHATSAPP — integrado aquí para evitar HTTP extra y race conditions
// ═══════════════════════════════════════════════════════════════════════════
(function () {
    'use strict';

    if (typeof window === 'undefined') return;

    // ─── CONFIG ──────────────────────────────────────────────────────────────
    var CFG = {
        phone:          '573235016747',
        assistant_name: 'Asistente ALTORRA',
        typing_ms:      750,
        notif_delay_ms: 4000,
        session_key:    'ac_wa_seen_v2',
    };

    // ─── FLUJOS ──────────────────────────────────────────────────────────────
    var FLOWS = {

        // ════ BIENVENIDA ════
        welcome: {
            msg: 'Hola, soy el asistente de ALTORRA Cars.\n\nEstoy aqui para ayudarte a encontrar la mejor opcion. Que deseas hacer?',
            opts: [
                { label: 'Comprar un vehiculo',      next: 'buy_type'   },
                { label: 'Solicitar financiacion',   next: 'fin_value'  },
                { label: 'Vender mi auto',           next: 'sell_brand' },
                { label: 'Agendar una visita',       next: 'apt_reason' },
                { label: 'Hablar con un asesor',     next: 'adv_name'   },
            ],
        },

        // ════ COMPRAR ════
        buy_type: {
            msg: 'Perfecto! Que tipo de vehiculo estas buscando?',
            key: 'tipo',
            opts: [
                { label: 'SUV / Campero',    value: 'SUV',          next: 'buy_budget' },
                { label: 'Sedan',            value: 'Sedan',        next: 'buy_budget' },
                { label: 'Pickup / 4x4',     value: 'Pickup',       next: 'buy_budget' },
                { label: 'Hatchback',        value: 'Hatchback',    next: 'buy_budget' },
                { label: 'No lo se aun',     value: 'Sin definir',  next: 'buy_budget' },
            ],
        },
        buy_budget: {
            msg: 'Cual es tu presupuesto aproximado para el vehiculo?',
            key: 'presupuesto',
            opts: [
                { label: 'Hasta $40 millones',    value: 'Hasta $40M',         next: 'buy_payment' },
                { label: '$40M a $70 millones',   value: 'Entre $40M y $70M',  next: 'buy_payment' },
                { label: '$70M a $100 millones',  value: 'Entre $70M y $100M', next: 'buy_payment' },
                { label: 'Mas de $100 millones',  value: 'Mas de $100M',       next: 'buy_payment' },
            ],
        },
        buy_payment: {
            msg: 'Como planeas pagar el vehiculo?',
            key: 'forma_pago',
            opts: [
                { label: 'De contado',             value: 'De contado',           next: 'buy_brand_pref' },
                { label: 'Credito / Financiado',   value: 'Financiado',           next: 'buy_brand_pref' },
                { label: 'Parte de pago + resto',  value: 'Con parte de pago',    next: 'buy_brand_pref' },
                { label: 'Aun no lo decido',       value: 'Por definir',          next: 'buy_brand_pref' },
            ],
        },
        buy_brand_pref: {
            msg: 'Tienes alguna marca o modelo de preferencia? (escribe "Sin preferencia" si no)',
            key: 'marca_preferida',
            type: 'input',
            placeholder: 'Ej: Toyota, Mazda, No tengo preferencia...',
            next: 'buy_city',
        },
        buy_city: {
            msg: 'En que ciudad estas ubicado/a?',
            key: 'ciudad',
            opts: [
                { label: 'Cartagena',   value: 'Cartagena',   next: 'buy_name' },
                { label: 'Barranquilla',value: 'Barranquilla',next: 'buy_name' },
                { label: 'Bogota',      value: 'Bogota',      next: 'buy_name' },
                { label: 'Medellin',    value: 'Medellin',    next: 'buy_name' },
                { label: 'Otra ciudad', value: 'Otra ciudad', next: 'buy_name' },
            ],
        },
        buy_name: {
            msg: 'Cual es tu nombre?',
            key: 'nombre',
            type: 'input',
            placeholder: 'Tu nombre completo...',
            next: 'buy_phone',
            validate: 'name',
        },
        buy_phone: {
            msg: 'Y tu numero de celular para contactarte?',
            key: 'telefono',
            type: 'input',
            placeholder: 'Ej: 3001234567',
            next: '_summary_buy',
            validate: 'phone',
        },

        // ════ FINANCIACION ════
        fin_value: {
            msg: 'Cual es el valor aproximado del vehiculo que te interesa?',
            key: 'valor_vehiculo',
            opts: [
                { label: 'Hasta $50 millones',    value: 'Hasta $50M',          next: 'fin_initial' },
                { label: '$50M a $80 millones',   value: 'Entre $50M y $80M',   next: 'fin_initial' },
                { label: '$80M a $120 millones',  value: 'Entre $80M y $120M',  next: 'fin_initial' },
                { label: 'Mas de $120 millones',  value: 'Mas de $120M',        next: 'fin_initial' },
            ],
        },
        fin_initial: {
            msg: 'Cuanto podrias dar de cuota inicial?',
            key: 'cuota_inicial',
            opts: [
                { label: 'Sin inicial (0%)',   value: 'Sin inicial',       next: 'fin_job' },
                { label: '10% a 20%',          value: 'Entre 10% y 20%',   next: 'fin_job' },
                { label: '20% a 40%',          value: 'Entre 20% y 40%',   next: 'fin_job' },
                { label: 'Mas del 40%',        value: 'Mas del 40%',       next: 'fin_job' },
            ],
        },
        fin_job: {
            msg: 'Cual es tu situacion laboral actual?',
            key: 'situacion_laboral',
            opts: [
                { label: 'Empleado',       value: 'Empleado',      next: 'fin_income' },
                { label: 'Independiente',  value: 'Independiente', next: 'fin_income' },
                { label: 'Empresario',     value: 'Empresario',    next: 'fin_income' },
                { label: 'Pensionado',     value: 'Pensionado',    next: 'fin_income' },
            ],
        },
        fin_income: {
            msg: 'Cual es tu rango de ingresos mensuales aproximados?',
            key: 'ingresos',
            opts: [
                { label: 'Menos de $2 millones',    value: 'Menos de $2M/mes',       next: 'fin_city' },
                { label: '$2M a $4 millones',        value: 'Entre $2M y $4M/mes',    next: 'fin_city' },
                { label: '$4M a $8 millones',        value: 'Entre $4M y $8M/mes',    next: 'fin_city' },
                { label: 'Mas de $8 millones',       value: 'Mas de $8M/mes',         next: 'fin_city' },
            ],
        },
        fin_city: {
            msg: 'En que ciudad estas ubicado/a?',
            key: 'ciudad',
            opts: [
                { label: 'Cartagena',    value: 'Cartagena',    next: 'fin_name' },
                { label: 'Barranquilla', value: 'Barranquilla', next: 'fin_name' },
                { label: 'Bogota',       value: 'Bogota',       next: 'fin_name' },
                { label: 'Medellin',     value: 'Medellin',     next: 'fin_name' },
                { label: 'Otra ciudad',  value: 'Otra ciudad',  next: 'fin_name' },
            ],
        },
        fin_name: {
            msg: 'Perfecto! Como te llamas?',
            key: 'nombre',
            type: 'input',
            placeholder: 'Tu nombre completo...',
            next: 'fin_phone',
            validate: 'name',
        },
        fin_phone: {
            msg: 'Tu numero de celular para contactarte?',
            key: 'telefono',
            type: 'input',
            placeholder: 'Ej: 3001234567',
            next: '_summary_fin',
            validate: 'phone',
        },

        // ════ VENDER ════
        sell_brand: {
            msg: 'Bien! Cuéntame sobre tu vehiculo. Que marca, modelo y año tiene?',
            key: 'vehiculo',
            type: 'input',
            placeholder: 'Ej: Toyota RAV4 2021',
            next: 'sell_km',
        },
        sell_km: {
            msg: 'Cuantos kilometros tiene aproximadamente?',
            key: 'kilometraje',
            opts: [
                { label: 'Menos de 30.000 km',    value: 'Menos de 30.000 km',   next: 'sell_condition' },
                { label: '30.000 a 80.000 km',    value: '30.000 a 80.000 km',   next: 'sell_condition' },
                { label: '80.000 a 150.000 km',   value: '80.000 a 150.000 km',  next: 'sell_condition' },
                { label: 'Mas de 150.000 km',     value: 'Mas de 150.000 km',    next: 'sell_condition' },
            ],
        },
        sell_condition: {
            msg: 'Como describirias el estado general del vehiculo?',
            key: 'estado',
            opts: [
                { label: 'Excelente - Como nuevo',       value: 'Excelente',   next: 'sell_city' },
                { label: 'Muy bueno - Minimos detalles', value: 'Muy bueno',   next: 'sell_city' },
                { label: 'Bueno - Desgaste normal',      value: 'Bueno',       next: 'sell_city' },
                { label: 'Regular - Requiere atencion',  value: 'Regular',     next: 'sell_city' },
            ],
        },
        sell_city: {
            msg: 'En que ciudad se encuentra el vehiculo?',
            key: 'ciudad',
            opts: [
                { label: 'Cartagena',    value: 'Cartagena',    next: 'sell_goal' },
                { label: 'Barranquilla', value: 'Barranquilla', next: 'sell_goal' },
                { label: 'Bogota',       value: 'Bogota',       next: 'sell_goal' },
                { label: 'Medellin',     value: 'Medellin',     next: 'sell_goal' },
                { label: 'Otra ciudad',  value: 'Otra ciudad',  next: 'sell_goal' },
            ],
        },
        sell_goal: {
            msg: 'Que priorizas para la venta?',
            key: 'prioridad',
            opts: [
                { label: 'Venderlo rapido',              value: 'Venta rapida',                  next: 'sell_name' },
                { label: 'Obtener el mejor precio',      value: 'Mejor precio posible',          next: 'sell_name' },
                { label: 'Balance precio y velocidad',   value: 'Balance precio y velocidad',    next: 'sell_name' },
            ],
        },
        sell_name: {
            msg: 'Como te llamas?',
            key: 'nombre',
            type: 'input',
            placeholder: 'Tu nombre completo...',
            next: 'sell_phone',
            validate: 'name',
        },
        sell_phone: {
            msg: 'Tu numero de celular?',
            key: 'telefono',
            type: 'input',
            placeholder: 'Ej: 3001234567',
            next: '_summary_sell',
            validate: 'phone',
        },

        // ════ AGENDAR ════
        apt_reason: {
            msg: 'Para que necesitas la cita con nosotros?',
            key: 'motivo_cita',
            opts: [
                { label: 'Ver un vehiculo en especifico',  value: 'Ver vehiculo',         next: 'apt_vehicle' },
                { label: 'Cotizacion o asesoria general',  value: 'Cotizacion',           next: 'apt_when'    },
                { label: 'Entregar mi auto',               value: 'Entrega de mi auto',   next: 'apt_when'    },
                { label: 'Revision de financiacion',       value: 'Revision de credito',  next: 'apt_when'    },
            ],
        },
        apt_vehicle: {
            msg: 'Cual vehiculo te interesa ver? (puedes indicar referencia o tipo)',
            key: 'vehiculo_interes',
            type: 'input',
            placeholder: 'Ej: BMW X4, el SUV azul de la web...',
            next: 'apt_when',
        },
        apt_when: {
            msg: 'Cuando prefieres visitarnos?',
            key: 'cuando',
            opts: [
                { label: 'Esta semana',                value: 'Esta semana',              next: 'apt_time' },
                { label: 'La proxima semana',          value: 'La proxima semana',        next: 'apt_time' },
                { label: 'Me llaman para coordinar',   value: 'Me contactan para coordinar', next: 'apt_time' },
            ],
        },
        apt_time: {
            msg: 'Que horario prefieres?',
            key: 'horario',
            opts: [
                { label: 'Manana (8am - 12pm)',    value: 'Manana (8am-12pm)',    next: 'apt_name' },
                { label: 'Tarde (12pm - 6pm)',     value: 'Tarde (12pm-6pm)',     next: 'apt_name' },
                { label: 'Cualquier horario',      value: 'Cualquier horario',    next: 'apt_name' },
            ],
        },
        apt_name: {
            msg: 'Como te llamas?',
            key: 'nombre',
            type: 'input',
            placeholder: 'Tu nombre completo...',
            next: 'apt_phone',
            validate: 'name',
        },
        apt_phone: {
            msg: 'Tu numero de celular para confirmar la cita?',
            key: 'telefono',
            type: 'input',
            placeholder: 'Ej: 3001234567',
            next: '_summary_apt',
            validate: 'phone',
        },

        // ════ ASESOR DIRECTO ════
        adv_name: {
            msg: 'Con mucho gusto! Como te llamas?',
            key: 'nombre',
            type: 'input',
            placeholder: 'Tu nombre...',
            next: 'adv_topic',
            validate: 'name',
        },
        adv_topic: {
            msg: 'En que podemos ayudarte, {nombre}?',
            key: 'consulta',
            opts: [
                { label: 'Informacion sobre vehiculos',  value: 'Informacion de vehiculos', next: 'adv_phone' },
                { label: 'Tramites y documentacion',     value: 'Tramites y documentacion', next: 'adv_phone' },
                { label: 'Postventa o garantia',         value: 'Postventa o garantia',     next: 'adv_phone' },
                { label: 'Precios y ofertas',            value: 'Precios y ofertas',        next: 'adv_phone' },
                { label: 'Otra consulta',                value: 'Otra consulta',            next: 'adv_phone' },
            ],
        },
        adv_phone: {
            msg: 'Tu numero de celular para que el asesor pueda contactarte?',
            key: 'telefono',
            type: 'input',
            placeholder: 'Ej: 3001234567',
            next: '_summary_adv',
            validate: 'phone',
        },
    };

    // ─── MENSAJES WHATSAPP (sin emojis para evitar caracteres corruptos) ──────
    var WA_MSGS = {
        _summary_buy: function (d) {
            return 'Hola ALTORRA CARS\n\n' +
                'Solicitud: Comprar vehiculo\n' +
                '- Tipo: ' + d.tipo + '\n' +
                '- Presupuesto: ' + d.presupuesto + '\n' +
                '- Forma de pago: ' + d.forma_pago + '\n' +
                (d.marca_preferida ? '- Preferencia de marca: ' + d.marca_preferida + '\n' : '') +
                '- Ciudad: ' + (d.ciudad || 'No indicada') + '\n' +
                '- Nombre: ' + (d.nombre || 'No indicado') + '\n' +
                '- Celular: ' + (d.telefono || 'No indicado') + '\n\n' +
                'Quedo pendiente de su atencion.';
        },
        _summary_fin: function (d) {
            return 'Hola ALTORRA CARS\n\n' +
                'Solicitud: Financiacion vehicular\n' +
                '- Valor del vehiculo: ' + d.valor_vehiculo + '\n' +
                '- Cuota inicial: ' + d.cuota_inicial + '\n' +
                '- Situacion laboral: ' + d.situacion_laboral + '\n' +
                '- Ingresos mensuales: ' + (d.ingresos || 'No indicado') + '\n' +
                '- Ciudad: ' + (d.ciudad || 'No indicada') + '\n' +
                '- Nombre: ' + (d.nombre || 'No indicado') + '\n' +
                '- Celular: ' + (d.telefono || 'No indicado') + '\n\n' +
                'Solicito informacion sobre opciones de credito disponibles.';
        },
        _summary_sell: function (d) {
            return 'Hola ALTORRA CARS\n\n' +
                'Solicitud: Vender mi vehiculo\n' +
                '- Vehiculo: ' + d.vehiculo + '\n' +
                '- Kilometraje: ' + d.kilometraje + '\n' +
                '- Estado: ' + (d.estado || 'No indicado') + '\n' +
                '- Ciudad: ' + (d.ciudad || 'No indicada') + '\n' +
                '- Prioridad: ' + (d.prioridad || 'No indicada') + '\n' +
                '- Nombre: ' + (d.nombre || 'No indicado') + '\n' +
                '- Celular: ' + (d.telefono || 'No indicado') + '\n\n' +
                'Solicito una tasacion de mi vehiculo.';
        },
        _summary_apt: function (d) {
            return 'Hola ALTORRA CARS\n\n' +
                'Solicitud: Agendar visita\n' +
                '- Motivo: ' + d.motivo_cita + '\n' +
                (d.vehiculo_interes ? '- Vehiculo de interes: ' + d.vehiculo_interes + '\n' : '') +
                '- Disponibilidad: ' + (d.cuando || 'No indicada') + '\n' +
                '- Horario preferido: ' + (d.horario || 'No indicado') + '\n' +
                '- Nombre: ' + (d.nombre || 'No indicado') + '\n' +
                '- Celular: ' + (d.telefono || 'No indicado') + '\n\n' +
                'Quedo pendiente para confirmar la cita.';
        },
        _summary_adv: function (d) {
            return 'Hola ALTORRA CARS\n\n' +
                'Solicitud: Hablar con un asesor\n' +
                '- Nombre: ' + (d.nombre || 'No indicado') + '\n' +
                '- Consulta: ' + (d.consulta || 'No indicada') + '\n' +
                '- Celular: ' + (d.telefono || 'No indicado') + '\n\n' +
                'Quedo a la espera de ser atendido.';
        },
    };

    // Mensajes de cierre del bot (en chat, sin emojis complejos)
    var CLOSE_MSGS = {
        _summary_buy:  'Excelente! Ya tengo todo lo que necesito.\n\nTe voy a conectar con un asesor que te mostrara las mejores opciones segun tu perfil.',
        _summary_fin:  'Perfecto! Con esa informacion podemos buscar el credito ideal para ti.\n\nUn especialista te contactara con las mejores tasas disponibles.',
        _summary_sell: 'Gracias! Tenemos interes en conocer tu vehiculo.\n\nUn tasador te dara una oferta justa y rapida.',
        _summary_apt:  'Listo! Ya tenemos los datos para agendar tu visita.\n\nNuestro equipo te confirmara la cita a la brevedad.',
        _summary_adv:  'Perfecto! Ahora te conecto directamente con un asesor de ALTORRA Cars.',
    };

    // ─── VALIDACIONES ─────────────────────────────────────────────────────────
    var VALIDATORS = {
        name: function (v) {
            if (!v || v.trim().length < 2) return 'Por favor escribe tu nombre (minimo 2 letras).';
            return null;
        },
        phone: function (v) {
            var clean = v.replace(/[\s\-().+]/g, '');
            if (!/^\d{7,15}$/.test(clean)) return 'Por favor escribe un numero valido (Ej: 3001234567).';
            return null;
        },
    };

    // ─── ESTADO ───────────────────────────────────────────────────────────────
    var S = {
        open:        false,
        data:        {},
        waUrl:       null,
        busy:        false,   // bloquea interacciones mientras "escribe"
        ctxVehicle:  null,
        startStep:   'welcome',
    };

    // ─── HELPERS ──────────────────────────────────────────────────────────────
    function esc(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    function fillTemplate(text, data) {
        return text.replace(/\{(\w+)\}/g, function (_, k) { return data[k] || ''; });
    }

    function buildWaUrl(key) {
        var gen = WA_MSGS[key];
        if (!gen) return null;
        var text = gen(S.data);
        return 'https://wa.me/' + CFG.phone + '?text=' + encodeURIComponent(text);
    }

    // ─── DETECCIÓN DE CONTEXTO ────────────────────────────────────────────────
    function detectContext() {
        var path = window.location.pathname;
        if (path.indexOf('/vehiculos/') !== -1 || path.indexOf('detalle-vehiculo') !== -1) {
            var h1 = document.querySelector('h1');
            if (h1) S.ctxVehicle = h1.textContent.trim().substring(0, 55);
        }
        if (path.indexOf('simulador-credito') !== -1) S.startStep = 'fin_value';
    }

    // ─── CSS ─────────────────────────────────────────────────────────────────
    var CSS = [
        /* Root */
        '#wa-r{position:fixed;bottom:24px;right:24px;z-index:2147483640;',
        'font-family:Poppins,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;',
        'box-sizing:border-box}',
        '#wa-r *{box-sizing:border-box;-webkit-tap-highlight-color:transparent}',

        /* Boton flotante */
        '#wa-btn{width:62px;height:62px;border-radius:50%;',
        'background:linear-gradient(135deg,#d4af37,#b89658);',
        'border:none;cursor:pointer;outline:none;',
        'box-shadow:0 6px 28px rgba(212,175,55,.45),0 0 0 0 rgba(212,175,55,.55);',
        'animation:wap 2.4s ease-in-out infinite;',
        'transition:transform .25s,box-shadow .25s,background .25s;',
        'display:flex;align-items:center;justify-content:center;',
        'position:relative;touch-action:manipulation;',
        '-webkit-user-select:none;user-select:none}',
        '#wa-btn:hover{transform:translateY(-3px) scale(1.07);',
        'box-shadow:0 12px 40px rgba(212,175,55,.6);animation:none}',
        '#wa-btn:active{transform:scale(.95)}',
        '#wa-btn.is-open{animation:none;',
        'background:linear-gradient(135deg,#2a2a2a,#111)}',
        '#wa-btn svg{width:30px;height:30px;transition:transform .3s,opacity .3s}',
        '#wa-btn.is-open svg.ico-wa{opacity:0;position:absolute}',
        '#wa-btn.is-open svg.ico-x{opacity:1!important}',
        'svg.ico-x{opacity:0;position:absolute;width:22px!important;height:22px!important}',

        /* Notificacion */
        '#wa-notif{position:absolute;top:-3px;right:-3px;',
        'width:19px;height:19px;background:#ef4444;',
        'border-radius:50%;border:2px solid #0a0a0a;',
        'font-size:10px;font-weight:700;color:#fff;',
        'display:flex;align-items:center;justify-content:center;',
        'animation:wab 1s ease 4s 2 forwards}',
        '#wa-notif.hidden{display:none}',

        /* Ventana */
        '#wa-win{position:absolute;bottom:74px;right:0;',
        'width:370px;max-width:calc(100vw - 32px);',
        'background:#111;border-radius:20px;overflow:hidden;',
        'display:flex;flex-direction:column;',
        'height:540px;max-height:calc(var(--vh,1vh)*100 - 110px);',
        'box-shadow:0 20px 60px rgba(0,0,0,.75),0 0 0 1px rgba(212,175,55,.15);',
        'transform:scale(.85) translateY(20px);opacity:0;pointer-events:none;',
        'transition:transform .3s cubic-bezier(.34,1.56,.64,1),opacity .25s;',
        'transform-origin:bottom right}',
        '#wa-win.show{transform:scale(1) translateY(0);opacity:1;pointer-events:all}',

        /* Header */
        '.wa-hdr{background:linear-gradient(135deg,#1a1a1a,#0f0f0f);',
        'border-bottom:1px solid rgba(212,175,55,.2);',
        'padding:13px 14px;display:flex;align-items:center;',
        'justify-content:space-between;flex-shrink:0}',
        '.wa-hdr-l{display:flex;align-items:center;gap:10px}',
        '.wa-av{width:40px;height:40px;border-radius:50%;',
        'background:linear-gradient(135deg,#d4af37,#8b6f47);',
        'display:flex;align-items:center;justify-content:center;',
        'font-weight:700;font-size:12px;color:#0a0a0a;',
        'flex-shrink:0;position:relative}',
        '.wa-av::after{content:"";position:absolute;bottom:1px;right:1px;',
        'width:10px;height:10px;background:#22c55e;border-radius:50%;',
        'border:2px solid #1a1a1a}',
        '.wa-hdr-name{font-size:13px;font-weight:600;color:#f8f8f8;line-height:1.2}',
        '.wa-hdr-status{font-size:10px;color:#22c55e;font-weight:400}',
        '.wa-cls{background:rgba(255,255,255,.07);border:none;color:#b0b0b0;',
        'width:28px;height:28px;border-radius:50%;cursor:pointer;',
        'font-size:14px;display:flex;align-items:center;justify-content:center;',
        'transition:background .2s,color .2s;flex-shrink:0;',
        'touch-action:manipulation;outline:none}',
        '.wa-cls:hover{background:rgba(239,68,68,.15);color:#ef4444}',

        /* Mensajes */
        '.wa-msgs{flex:1;overflow-y:auto;overflow-x:hidden;padding:14px 12px;',
        'display:flex;flex-direction:column;gap:9px;background:#0d0d0d;',
        '-webkit-overflow-scrolling:touch;',
        'scrollbar-width:thin;scrollbar-color:#2a2a2a transparent}',
        '.wa-msgs::-webkit-scrollbar{width:3px}',
        '.wa-msgs::-webkit-scrollbar-thumb{background:#2a2a2a;border-radius:2px}',

        /* Burbuja bot */
        '.wa-b{max-width:87%;padding:9px 12px;',
        'border-radius:14px 14px 14px 3px;',
        'background:#1e1e1e;border:1px solid rgba(255,255,255,.06);',
        'color:#e0e0e0;font-size:13px;line-height:1.55;',
        'align-self:flex-start;white-space:pre-line;',
        'animation:wamin .28s ease}',
        '.wa-b b{color:#d4af37}',

        /* Burbuja usuario */
        '.wa-u{max-width:78%;padding:8px 12px;',
        'border-radius:14px 14px 3px 14px;',
        'background:linear-gradient(135deg,#d4af37,#b89658);',
        'color:#0a0a0a;font-size:12.5px;font-weight:500;',
        'align-self:flex-end;animation:wamin .22s ease}',

        /* Typing */
        '.wa-typ{align-self:flex-start;background:#1e1e1e;',
        'border:1px solid rgba(255,255,255,.06);',
        'padding:11px 15px;border-radius:14px 14px 14px 3px;',
        'display:flex;gap:5px;align-items:center;',
        'animation:wamin .28s ease}',
        '.wa-typ span{width:7px;height:7px;background:#d4af37;',
        'border-radius:50%;animation:wad 1.2s ease infinite}',
        '.wa-typ span:nth-child(2){animation-delay:.2s}',
        '.wa-typ span:nth-child(3){animation-delay:.4s}',

        /* Opciones */
        '.wa-opts{display:flex;flex-direction:column;gap:6px;',
        'align-self:stretch;animation:wamin .3s ease}',
        '.wa-opt{background:rgba(212,175,55,.07);',
        'border:1px solid rgba(212,175,55,.22);',
        'color:#e0e0e0;padding:9px 12px;border-radius:10px;',
        'text-align:left;cursor:pointer;font-size:12.5px;',
        'font-family:inherit;line-height:1.3;',
        'transition:background .18s,border-color .18s,transform .12s;',
        'touch-action:manipulation;outline:none;',
        '-webkit-user-select:none;user-select:none}',
        '.wa-opt:hover{background:rgba(212,175,55,.17);',
        'border-color:rgba(212,175,55,.5);transform:translateX(3px)}',
        '.wa-opt:active{transform:translateX(1px) scale(.98)}',
        '.wa-opt.sel{background:rgba(212,175,55,.18);',
        'border-color:#d4af37;color:#d4af37;pointer-events:none}',
        '.wa-opt:disabled{opacity:.5;pointer-events:none}',

        /* Input */
        '.wa-irow{display:flex;gap:7px;align-self:stretch;animation:wamin .3s ease}',
        '.wa-inp{flex:1;background:#1e1e1e;',
        'border:1.5px solid rgba(212,175,55,.25);border-radius:10px;',
        'color:#e8e8e8;font-size:13px;font-family:inherit;',
        'padding:9px 11px;outline:none;',
        'transition:border-color .2s;min-width:0;',
        '-webkit-appearance:none}',
        '.wa-inp::placeholder{color:#444}',
        '.wa-inp:focus{border-color:#d4af37}',
        '.wa-inp.err{border-color:#ef4444}',
        '.wa-err{color:#ef4444;font-size:11px;',
        'margin-top:-3px;align-self:flex-start;',
        'animation:wamin .2s ease}',
        '.wa-send{background:linear-gradient(135deg,#d4af37,#b89658);',
        'border:none;border-radius:10px;color:#0a0a0a;',
        'width:40px;min-width:40px;cursor:pointer;',
        'font-size:16px;display:flex;align-items:center;',
        'justify-content:center;flex-shrink:0;',
        'transition:transform .15s,opacity .2s;',
        'touch-action:manipulation;outline:none}',
        '.wa-send:hover{transform:scale(1.06)}',
        '.wa-send:active{transform:scale(.94)}',
        '.wa-send:disabled{opacity:.35;cursor:default}',

        /* Footer / CTA */
        '.wa-ft{flex-shrink:0;padding:11px 12px;background:#111;',
        'border-top:1px solid rgba(255,255,255,.06);',
        'display:flex;flex-direction:column;gap:7px;',
        'padding-bottom:max(11px,env(safe-area-inset-bottom))}',
        '.wa-cta{width:100%;padding:12px;',
        'background:linear-gradient(135deg,#25d366,#128c4f);',
        'border:none;border-radius:12px;color:#fff;',
        'font-size:13.5px;font-weight:600;font-family:inherit;',
        'cursor:pointer;display:flex;align-items:center;',
        'justify-content:center;gap:8px;',
        'transition:transform .2s,box-shadow .2s;',
        'box-shadow:0 4px 18px rgba(37,211,102,.3);',
        'touch-action:manipulation;outline:none;',
        'animation:wamin .35s ease}',
        '.wa-cta:hover{transform:translateY(-2px);',
        'box-shadow:0 8px 28px rgba(37,211,102,.45)}',
        '.wa-cta:active{transform:scale(.97)}',
        '.wa-rst{background:none;border:none;color:#555;',
        'font-size:11.5px;font-family:inherit;cursor:pointer;',
        'text-align:center;padding:2px;',
        'transition:color .2s;text-decoration:underline;',
        'touch-action:manipulation;outline:none}',
        '.wa-rst:hover{color:#999}',

        /* Powered */
        '.wa-pw{font-size:10px;color:#2a2a2a;text-align:center;',
        'padding:4px 12px 8px;flex-shrink:0;background:#111;',
        'letter-spacing:.3px;border-top:1px solid #1a1a1a}',

        /* Animaciones */
        '@keyframes wap{0%,100%{box-shadow:0 6px 28px rgba(212,175,55,.45),0 0 0 0 rgba(212,175,55,.55)}',
        '50%{box-shadow:0 6px 28px rgba(212,175,55,.45),0 0 0 14px rgba(212,175,55,0)}}',
        '@keyframes wab{0%,100%{transform:scale(1)}50%{transform:scale(1.35)}}',
        '@keyframes wad{0%,60%,100%{transform:translateY(0);opacity:.4}',
        '30%{transform:translateY(-6px);opacity:1}}',
        '@keyframes wamin{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:translateY(0)}}',

        /* Mobile */
        '@media(max-width:480px){',
        '#wa-r{bottom:16px;right:14px}',
        '#wa-win{width:calc(100vw - 28px);right:0;bottom:72px;',
        'height:calc(var(--vh,1vh)*100 - 105px);max-height:520px}',
        '#wa-btn{width:56px;height:56px}',
        '#wa-btn svg{width:26px;height:26px}}',

        /* Reducir motion */
        '@media(prefers-reduced-motion:reduce){',
        '#wa-btn,#wa-btn svg,.wa-b,.wa-u,.wa-typ,.wa-opts,.wa-irow,.wa-cta{animation:none!important}',
        '#wa-win{transition:opacity .15s}}',
    ].join('');

    // ─── DOM ──────────────────────────────────────────────────────────────────
    var root, btn, notif, win, msgsEl, ftEl;

    function buildDOM() {
        // Inyectar CSS
        var style = document.createElement('style');
        style.id = 'wa-styles';
        style.textContent = CSS;
        (document.head || document.documentElement).appendChild(style);

        // Root
        root = document.createElement('div');
        root.id = 'wa-r';

        // Boton
        btn = document.createElement('button');
        btn.id = 'wa-btn';
        btn.setAttribute('aria-label', 'Abrir asistente ALTORRA Cars');
        btn.setAttribute('aria-expanded', 'false');
        btn.innerHTML = icoWA() + icoX();

        notif = document.createElement('div');
        notif.id = 'wa-notif';
        notif.setAttribute('aria-label', 'Mensaje nuevo');
        notif.textContent = '1';
        btn.appendChild(notif);

        // Ventana
        win = document.createElement('div');
        win.id = 'wa-win';
        win.setAttribute('role', 'dialog');
        win.setAttribute('aria-modal', 'true');
        win.setAttribute('aria-label', 'Asistente ALTORRA Cars');
        win.setAttribute('aria-hidden', 'true');

        // Header
        var hdr = document.createElement('div');
        hdr.className = 'wa-hdr';
        hdr.innerHTML =
            '<div class="wa-hdr-l">' +
                '<div class="wa-av" aria-hidden="true">AC</div>' +
                '<div>' +
                    '<div class="wa-hdr-name">' + CFG.assistant_name + '</div>' +
                    '<div class="wa-hdr-status">En linea</div>' +
                '</div>' +
            '</div>' +
            '<button class="wa-cls" aria-label="Cerrar">&#x2715;</button>';

        // Mensajes
        msgsEl = document.createElement('div');
        msgsEl.className = 'wa-msgs';
        msgsEl.setAttribute('role', 'log');
        msgsEl.setAttribute('aria-live', 'polite');
        msgsEl.setAttribute('aria-atomic', 'false');

        // Footer (CTA)
        ftEl = document.createElement('div');
        ftEl.className = 'wa-ft';
        ftEl.style.display = 'none';

        // Powered
        var pw = document.createElement('div');
        pw.className = 'wa-pw';
        pw.textContent = 'ALTORRA CARS - Cartagena, Colombia';

        win.appendChild(hdr);
        win.appendChild(msgsEl);
        win.appendChild(ftEl);
        win.appendChild(pw);
        root.appendChild(win);
        root.appendChild(btn);
        document.body.appendChild(root);

        // Eventos
        btn.addEventListener('click', toggleChat);
        hdr.querySelector('.wa-cls').addEventListener('click', closeChat);

        // Cerrar al click fuera (desktop)
        document.addEventListener('click', function (e) {
            if (S.open && root && !root.contains(e.target)) closeChat();
        });

        // Cerrar con Escape
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && S.open) closeChat();
        });

        // Fix viewport height en iOS (100vh bug)
        fixViewportHeight();
        var _vhTimer;
        window.addEventListener('resize', function() {
            clearTimeout(_vhTimer);
            _vhTimer = setTimeout(fixViewportHeight, 150);
        });
    }

    function fixViewportHeight() {
        var vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', vh + 'px');
    }

    // ─── ABRIR / CERRAR ───────────────────────────────────────────────────────
    function toggleChat() {
        if (S.open) closeChat(); else openChat();
    }

    function openChat() {
        S.open = true;
        btn.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
        win.classList.add('show');
        win.setAttribute('aria-hidden', 'false');
        notif.classList.add('hidden');
        sessionStorage.setItem(CFG.session_key, '1');

        if (msgsEl.children.length === 0) {
            setTimeout(startFlow, 280);
        }
        setTimeout(scrollBottom, 120);
    }

    function closeChat() {
        S.open = false;
        btn.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
        win.classList.remove('show');
        win.setAttribute('aria-hidden', 'true');
    }

    // ─── FLUJO ────────────────────────────────────────────────────────────────
    function startFlow() {
        S.data  = {};
        S.waUrl = null;
        S.busy  = false;
        msgsEl.innerHTML = '';
        ftEl.style.display = 'none';
        ftEl.innerHTML = '';

        if (S.ctxVehicle) {
            botMsg(
                'Hola! Veo que estas viendo el *' + S.ctxVehicle + '*.\n\n En que te puedo ayudar?',
                function () { showStep('welcome'); }
            );
        } else {
            showStep(S.startStep);
        }
    }

    function showStep(key) {
        if (key.startsWith('_summary_')) {
            var closing = CLOSE_MSGS[key] || 'Listo! Ahora te conecto con un asesor.';
            S.waUrl = buildWaUrl(key);
            botMsg(closing, showCTA);
            return;
        }

        var flow = FLOWS[key];
        if (!flow) { console.warn('[WA Assistant] Step not found:', key); return; }

        var msg = fillTemplate(flow.msg, S.data);

        botMsg(msg, function () {
            if (flow.type === 'input') {
                renderInput(flow);
            } else if (flow.opts) {
                renderOptions(flow);
            }
        });
    }

    function renderOptions(flow) {
        if (S.busy) return;
        var wrap = document.createElement('div');
        wrap.className = 'wa-opts';

        flow.opts.forEach(function (opt) {
            var b = document.createElement('button');
            b.className = 'wa-opt';
            b.textContent = opt.label;
            b.addEventListener('click', function () {
                if (S.busy) return;
                lockOptions(wrap);
                b.classList.add('sel');
                if (flow.key) S.data[flow.key] = opt.value !== undefined ? opt.value : opt.label;
                addUserBubble(opt.label);
                var next = opt.next || flow.next;
                setTimeout(function () { showStep(next); }, 550);
            });
            wrap.appendChild(b);
        });

        msgsEl.appendChild(wrap);
        scrollBottom();
    }

    function lockOptions(wrap) {
        var btns = wrap.querySelectorAll('.wa-opt');
        btns.forEach(function (b) { b.disabled = true; });
    }

    function renderInput(flow) {
        if (S.busy) return;
        var wrap = document.createElement('div');
        wrap.className = 'wa-irow';

        var inp = document.createElement('input');
        inp.type = flow.validate === 'phone' ? 'tel' : 'text';
        inp.className = 'wa-inp';
        inp.placeholder = flow.placeholder || 'Escribe aqui...';
        inp.maxLength = 80;
        inp.autocomplete = flow.validate === 'phone' ? 'tel' : 'name';
        inp.setAttribute('aria-label', flow.placeholder || 'Respuesta');

        var errEl = null;

        var sendBtn = document.createElement('button');
        sendBtn.className = 'wa-send';
        sendBtn.setAttribute('aria-label', 'Enviar');
        sendBtn.innerHTML = '&#x279C;';

        function showError(msg) {
            inp.classList.add('err');
            if (!errEl) {
                errEl = document.createElement('div');
                errEl.className = 'wa-err';
                errEl.setAttribute('role', 'alert');
                wrap.insertAdjacentElement('afterend', errEl);
            }
            errEl.textContent = msg;
            scrollBottom();
        }

        function clearError() {
            inp.classList.remove('err');
            if (errEl) { errEl.remove(); errEl = null; }
        }

        function submit() {
            var val = inp.value.trim();
            clearError();

            if (!val) {
                showError('Por favor escribe tu respuesta.');
                inp.focus();
                return;
            }

            if (flow.validate && VALIDATORS[flow.validate]) {
                var err = VALIDATORS[flow.validate](val);
                if (err) { showError(err); inp.focus(); return; }
            }

            inp.disabled = true;
            sendBtn.disabled = true;
            if (errEl) errEl.remove();

            if (flow.key) S.data[flow.key] = val;
            addUserBubble(val);
            setTimeout(function () { showStep(flow.next); }, 550);
        }

        sendBtn.addEventListener('click', function (e) {
            e.preventDefault();
            submit();
        });
        inp.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') { e.preventDefault(); submit(); }
        });
        inp.addEventListener('input', clearError);

        wrap.appendChild(inp);
        wrap.appendChild(sendBtn);
        msgsEl.appendChild(wrap);
        scrollBottom();

        // Enfocar con delay para que la animacion no se corte en iOS
        setTimeout(function () {
            if (!inp.disabled) inp.focus();
        }, 200);
    }

    function showCTA() {
        ftEl.innerHTML = '';
        ftEl.style.display = 'flex';

        var ctaBtn = document.createElement('button');
        ctaBtn.className = 'wa-cta';
        ctaBtn.innerHTML = icoWASmall() + ' Continuar por WhatsApp';
        ctaBtn.addEventListener('click', function () {
            if (S.waUrl) {
                try { window.open(S.waUrl, '_blank', 'noopener,noreferrer'); }
                catch (e) { window.location.href = S.waUrl; }
            }
        });

        var rstBtn = document.createElement('button');
        rstBtn.className = 'wa-rst';
        rstBtn.textContent = 'Volver a empezar';
        rstBtn.addEventListener('click', function () {
            S.startStep = 'welcome';
            startFlow();
        });

        ftEl.appendChild(ctaBtn);
        ftEl.appendChild(rstBtn);
    }

    // ─── MENSAJES ─────────────────────────────────────────────────────────────
    function botMsg(text, cb) {
        S.busy = true;

        var typ = document.createElement('div');
        typ.className = 'wa-typ';
        typ.setAttribute('aria-hidden', 'true');
        typ.innerHTML = '<span></span><span></span><span></span>';
        msgsEl.appendChild(typ);
        scrollBottom();

        setTimeout(function () {
            if (typ.parentNode) typ.remove();

            var bub = document.createElement('div');
            bub.className = 'wa-b';
            // Formato: *texto* → <b>texto</b>, sin emojis complejos en HTML
            bub.innerHTML = esc(text)
                .replace(/\*(.*?)\*/g, '<b>$1</b>');
            msgsEl.appendChild(bub);
            scrollBottom();
            S.busy = false;
            if (cb) cb();
        }, CFG.typing_ms);
    }

    function addUserBubble(text) {
        var bub = document.createElement('div');
        bub.className = 'wa-u';
        bub.textContent = text;
        msgsEl.appendChild(bub);
        scrollBottom();
    }

    function scrollBottom() {
        if (!msgsEl) return;
        requestAnimationFrame(function () {
            msgsEl.scrollTop = msgsEl.scrollHeight;
        });
    }

    // ─── NOTIFICACION INICIAL ─────────────────────────────────────────────────
    function scheduleNotif() {
        if (sessionStorage.getItem(CFG.session_key)) {
            notif.classList.add('hidden');
            return;
        }
        setTimeout(function () {
            if (!S.open && notif) notif.classList.remove('hidden');
        }, CFG.notif_delay_ms);
    }

    // ─── ICONOS SVG ───────────────────────────────────────────────────────────
    function icoWA() {
        return '<svg class="ico-wa" viewBox="0 0 32 32" fill="none" aria-hidden="true">' +
            '<path fill="#0a0a0a" d="M16 0C7.163 0 0 7.163 0 16c0 2.825.739 5.488 2.037 7.813L.112 31.488l8.013-2.038C10.413 30.725 13.113 32 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.388c-2.475 0-4.8-.675-6.787-1.85l-.488-.288-5.05 1.288 1.338-4.863-.313-.512C3.338 21.088 2.612 18.6 2.612 16 2.612 8.6 8.6 2.612 16 2.612S29.388 8.6 29.388 16 23.4 29.388 16 29.388zm7.35-10.037c-.4-.2-2.363-1.175-2.725-1.3-.363-.125-.625-.2-.888.2-.262.4-1.012 1.3-1.237 1.563-.225.262-.45.3-.85.1-.4-.2-1.688-.625-3.213-2-.188-1.075-1.338-1.8-1.738-2-.4-.2-.038-.3.175-.4.175-.175.4-.45.6-.675.2-.225.263-.375.4-.625.138-.25.063-.475-.025-.675-.088-.2-.888-2.138-1.213-2.925-.325-.788-.65-.675-.888-.688-.225-.012-.475-.012-.725-.012s-.663.088-1.013.438c-.35.35-1.338 1.313-1.338 3.2s1.375 3.713 1.563 3.975c.188.263 2.638 4.025 6.4 5.638.888.388 1.588.625 2.125.8.9.275 1.713.238 2.363.15.725-.113 2.238-.925 2.55-1.8.313-.875.313-1.625.225-1.8-.088-.175-.338-.275-.738-.475z"/>' +
            '</svg>';
    }

    function icoX() {
        return '<svg class="ico-x" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
            '<path stroke="#e8e8e8" stroke-width="2.5" stroke-linecap="round" d="M6 6l12 12M18 6L6 18"/>' +
            '</svg>';
    }

    function icoWASmall() {
        return '<svg viewBox="0 0 24 24" fill="currentColor" style="width:17px;height:17px;flex-shrink:0" aria-hidden="true">' +
            '<path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.554 4.116 1.528 5.86L.084 23.616l5.9-1.527A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22.034c-1.856 0-3.6-.506-5.09-1.388l-.366-.216-3.788.965 1.003-3.647-.235-.383A9.96 9.96 0 012.034 12C2.034 6.448 6.448 2.034 12 2.034S21.966 6.448 21.966 12 17.552 21.966 12 21.966zm5.513-7.528c-.3-.15-1.772-.881-2.044-.975-.272-.094-.469-.15-.666.15-.197.3-.759.975-.928 1.172-.169.197-.337.225-.637.075-.3-.15-1.266-.469-2.41-1.5-.141-.806-1.003-1.35-1.303-1.5-.3-.15-.028-.225.131-.3.131-.131.3-.337.45-.506.15-.169.197-.281.3-.469.103-.188.047-.356-.019-.506-.066-.15-.666-1.603-.909-2.194-.244-.591-.488-.506-.666-.516-.169-.009-.356-.009-.544-.009s-.497.066-.759.328c-.262.263-1.003.984-1.003 2.4s1.031 2.784 1.172 2.978c.141.197 1.978 3.019 4.8 4.228.666.291 1.191.469 1.594.6.675.206 1.284.178 1.772.113.544-.084 1.678-.694 1.913-1.35.234-.656.234-1.219.169-1.35-.066-.131-.253-.206-.553-.356z"/>' +
            '</svg>';
    }

    // ─── INIT ─────────────────────────────────────────────────────────────────
    function init() {
        if (document.getElementById('wa-r')) return;
        detectContext();
        buildDOM();
        scheduleNotif();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else if (document.body) {
        init();
    } else {
        document.addEventListener('DOMContentLoaded', init);
    }

})();
