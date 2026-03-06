// Main Script for ALTORRA CARS - Index Page
// Optimized for Performance and Modern JavaScript

/* Banner de Destacados de la Semana → js/featured-week-banner.js
 * loadDestacadosBanner() is aliased there as window.loadDestacadosBanner
 * so existing calls in initializePage() and rerenderVehicleSections() still work. */

/**
 * Load ALL brands from database as infinite auto-scroll carousel
 * Shows every brand registered, sorted alphabetically
 */
async function loadPopularBrands() {
    await vehicleDB.load();

    const brands = vehicleDB.getAllBrands();
    const container = document.getElementById('popularBrands');
    if (!container) return;

    if (brands.length === 0) {
        hideParentSection('popularBrands');
        return;
    }

    // Count vehicles per brand for display
    const allVehicles = vehicleDB.getAllVehicles();
    const brandCounts = {};
    allVehicles.forEach(function(v) {
        var key = v.marca ? v.marca.toLowerCase() : '';
        brandCounts[key] = (brandCounts[key] || 0) + 1;
    });

    // Sort alphabetically — show ALL brands from DB
    var sortedBrands = brands.slice().sort(function(a, b) {
        return (a.nombre || '').localeCompare(b.nombre || '');
    });

    // Build brand cards
    function buildBrandCard(brand) {
        var logo = brand.logo || '';
        if (logo.endsWith('.png')) {
            logo = logo.replace(/\.png$/i, '.webp');
        }
        var count = brandCounts[brand.id] || 0;
        var countText = count > 0 ? '<span class="brand-count">' + count + '</span>' : '';
        return '<a href="marca.html?marca=' + brand.id + '" class="brand-card">' +
            '<img src="' + logo + '" alt="' + (brand.nombre || '') + '" class="brand-logo" loading="lazy"' +
            ' onerror="this.src=\'' + (brand.logo || '') + '\';this.onerror=null;">' +
            '<div class="brand-name">' + (brand.nombre || '') + '</div>' +
            countText +
            '</a>';
    }

    // Duplicate brands for seamless infinite loop
    var cards = sortedBrands.map(buildBrandCard).join('');
    container.innerHTML = '<div class="brands-track">' + cards + cards + '</div>';

    // Start auto-scroll animation
    initBrandsAutoScroll(container);
}

/**
 * Infinite auto-scroll carousel with pause on hover/touch
 */
function initBrandsAutoScroll(container) {
    var track = container.querySelector('.brands-track');
    if (!track) return;

    var BASE_SPEED = 0.5;
    var BOOST_SPEED = 3.5;
    var state = { pos: 0, speed: BASE_SPEED, baseSpeed: BASE_SPEED, boostSpeed: BOOST_SPEED, paused: false, visible: false };
    window._brandsScrollState = state;

    // Only animate when the section is visible — saves CPU/battery
    if ('IntersectionObserver' in window) {
        var visObs = new IntersectionObserver(function(entries) {
            state.visible = entries[0].isIntersecting;
        }, { rootMargin: '100px 0px' });
        visObs.observe(container);
    } else {
        state.visible = true; // fallback: always animate
    }

    function step() {
        if (!state.paused && state.visible) {
            state.pos += state.speed;
            var halfWidth = track.scrollWidth / 2;
            if (halfWidth > 0) {
                if (state.pos >= halfWidth) state.pos -= halfWidth;
                if (state.pos < 0) state.pos += halfWidth;
            }
            track.style.transform = 'translateX(-' + state.pos + 'px)';
        }
        requestAnimationFrame(step);
    }

    // Pause on hover (desktop)
    track.addEventListener('mouseenter', function() { state.paused = true; });
    track.addEventListener('mouseleave', function() { state.paused = false; });

    // Touch drag — lets users scroll to a specific brand on mobile
    var dragStartX = 0, dragStartPos = 0, isDragging = false;

    container.addEventListener('touchstart', function(e) {
        dragStartX   = e.touches[0].clientX;
        dragStartPos = state.pos;
        isDragging   = false;
        state.paused = true;
    }, { passive: true });

    container.addEventListener('touchmove', function(e) {
        if (e.touches.length !== 1) return;
        var dx = dragStartX - e.touches[0].clientX;
        if (!isDragging && Math.abs(dx) < 6) return;
        isDragging = true;
        var halfWidth = track.scrollWidth / 2;
        if (halfWidth > 0) {
            state.pos = ((dragStartPos + dx) % halfWidth + halfWidth) % halfWidth;
        }
        track.style.transform = 'translateX(-' + state.pos + 'px)';
    }, { passive: true });

    container.addEventListener('touchend', function() {
        // Resume auto-scroll after 1.5 s so accidental releases don't snap
        setTimeout(function() { state.paused = false; }, 1500);
    }, { passive: true });

    requestAnimationFrame(step);
}

/**
 * FASE 2: Ocultar seccion padre cuando un contenedor esta vacio
 */
function hideParentSection(containerId) {
    var el = document.getElementById(containerId);
    if (!el) return;
    var section = el.closest('section');
    if (section) section.style.display = 'none';
}

/**
 * Load ALL available vehicles (unified carousel — Nuevos + Usados)
 * Prioritizes: prioridad > destacado > oferta > newer year
 */
async function loadAllVehicles() {
    showLoading('allVehiclesCarousel');
    await vehicleDB.load();
    const all = (vehicleDB.getAllVehicles() || []).filter(v => v.estado === 'disponible' || !v.estado);

    if (all.length === 0) {
        hideParentSection('allVehiclesCarousel');
        return;
    }

    const sorted = all.sort((a, b) => {
        const pa = a.prioridad || 0, pb = b.prioridad || 0;
        if (pa !== pb) return pb - pa;
        if (a.destacado && !b.destacado) return -1;
        if (!a.destacado && b.destacado) return 1;
        if (a.oferta && !b.oferta) return -1;
        if (!a.oferta && b.oferta) return 1;
        return (b.year || 0) - (a.year || 0);
    });

    renderVehicles(sorted, 'allVehiclesCarousel');
}

/**
 * Load new vehicles with ranking
 * Prioritizes: destacado > oferta > newest year
 */
async function loadNewVehicles() {
    showLoading('newVehiclesCarousel');
    await vehicleDB.load();
    const newVehicles = vehicleDB.filter({ tipo: 'nuevo' });

    // FASE 2: Ocultar seccion si no hay nuevos
    if (newVehicles.length === 0) {
        hideParentSection('newVehiclesCarousel');
        return;
    }

    const sortedNew = newVehicles.sort((a, b) => {
        // Prioridad manual primero (mayor = primero)
        const pa = a.prioridad || 0, pb = b.prioridad || 0;
        if (pa !== pb) return pb - pa;
        if (a.destacado && !b.destacado) return -1;
        if (!a.destacado && b.destacado) return 1;
        if (a.oferta && !b.oferta) return -1;
        if (!a.oferta && b.oferta) return 1;
        return b.year - a.year;
    });

    renderVehicles(sortedNew, 'newVehiclesCarousel');
}

/**
 * Load used vehicles with ranking
 * Prioritizes: destacado > oferta > newer year > lower km
 */
async function loadUsedVehicles() {
    showLoading('usedVehiclesCarousel');
    await vehicleDB.load();
    const used = vehicleDB.filter({ tipo: 'usado' });

    // FASE 2: Ocultar seccion si no hay usados
    if (used.length === 0) {
        hideParentSection('usedVehiclesCarousel');
        return;
    }

    const sortedUsed = used.sort((a, b) => {
        // Prioridad manual primero (mayor = primero)
        const pa = a.prioridad || 0, pb = b.prioridad || 0;
        if (pa !== pb) return pb - pa;
        if (a.destacado && !b.destacado) return -1;
        if (!a.destacado && b.destacado) return 1;
        if (a.oferta && !b.oferta) return -1;
        if (!a.oferta && b.oferta) return 1;
        if (b.year !== a.year) return b.year - a.year;
        return a.kilometraje - b.kilometraje;
    });

    renderVehicles(sortedUsed, 'usedVehiclesCarousel');
}

/**
 * Unified carousel scroll function
 * @param {string} containerId - The carousel container ID
 * @param {number} direction - Scroll direction (-1 for left, 1 for right)
 */
function scrollCarouselById(containerId, direction) {
    const grid = document.getElementById(containerId);
    if (!grid) {
        console.error('Carousel not found:', containerId);
        return;
    }

    // Calculate scroll amount based on visible cards
    const cardWidth = 350; // Approx card width + gap
    const scrollAmount = cardWidth * 3; // Scroll 3 cards at a time

    grid.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

/**
 * Enable drag-to-scroll for all vehicle carousels
 * Supports both mouse drag (desktop) and touch (mobile)
 */
function enableDragScroll() {
    var carousels = document.querySelectorAll('.vehicles-grid');

    carousels.forEach(function(carousel) {
        // Skip grids that aren't horizontal carousels or already have drag enabled
        if (carousel.dataset.dragEnabled) return;
        var style = getComputedStyle(carousel);
        if (style.overflowX !== 'auto' && style.overflowX !== 'scroll') return;
        // Also check if content actually overflows
        if (carousel.scrollWidth <= carousel.clientWidth + 10) return;
        carousel.dataset.dragEnabled = 'true';
        var isDown = false;
        var startX = 0;
        var scrollLeft = 0;
        var hasMoved = false;

        // Cursor feedback (desktop only)
        carousel.style.cursor = 'grab';

        // ---- Mouse drag (desktop) ----
        carousel.addEventListener('mousedown', function(e) {
            if (e.target.closest('button, a, .favorite-btn, .btn-compare')) return;
            isDown = true;
            hasMoved = false;
            startX = e.clientX;
            scrollLeft = carousel.scrollLeft;
            carousel.style.cursor = 'grabbing';
            carousel.style.scrollBehavior = 'auto';
            carousel.style.scrollSnapType = 'none';
        });

        carousel.addEventListener('mouseleave', function() {
            if (isDown) {
                isDown = false;
                carousel.style.cursor = 'grab';
                carousel.style.scrollBehavior = '';
                carousel.style.scrollSnapType = '';
            }
        });

        carousel.addEventListener('mouseup', function() {
            if (!isDown) return;
            isDown = false;
            carousel.style.cursor = 'grab';
            carousel.style.scrollBehavior = '';
            carousel.style.scrollSnapType = '';
        });

        carousel.addEventListener('mousemove', function(e) {
            if (!isDown) return;
            e.preventDefault();
            var walk = e.clientX - startX;
            carousel.scrollLeft = scrollLeft - walk;
            if (Math.abs(walk) > 5) hasMoved = true;
        });

        // Prevent click navigation when dragging
        carousel.addEventListener('click', function(e) {
            if (hasMoved) {
                e.preventDefault();
                e.stopPropagation();
                hasMoved = false;
            }
        }, true);

        // Mobile: let native scroll handle touch - no JS override needed
        // CSS -webkit-overflow-scrolling: touch and scroll-snap handle it
    });
}

/**
 * Load promotional banners from Firestore (admin-managed)
 * Displays between sections on the index page
 */
async function loadPromoBanners() {
    var section = document.getElementById('promoBannerSection');
    var wrapper = document.getElementById('promoBannerWrapper');
    if (!section || !wrapper || !window.db) return;

    try {
        var snap = await db.collection('banners')
            .where('active', '==', true)
            .where('position', '==', 'promocional')
            .orderBy('order', 'asc')
            .limit(3)
            .get();

        if (snap.empty) { section.style.display = 'none'; return; }

        var html = '';
        snap.forEach(function(doc) {
            var b = doc.data();
            var linkOpen = b.link ? '<a href="' + b.link + '" class="promo-banner-link">' : '<div class="promo-banner-link">';
            var linkClose = b.link ? '</a>' : '</div>';

            html += linkOpen +
                '<div class="promo-banner-item">' +
                    (b.image ? '<img src="' + b.image + '" alt="' + (b.title || '') + '" loading="lazy">' : '') +
                    '<div class="promo-banner-overlay">' +
                        '<div class="promo-banner-content">' +
                            (b.title ? '<h3 class="promo-banner-title">' + b.title + '</h3>' : '') +
                            (b.subtitle ? '<p class="promo-banner-subtitle">' + b.subtitle + '</p>' : '') +
                            (b.cta ? '<span class="promo-banner-cta">' + b.cta + ' &rarr;</span>' : '') +
                        '</div>' +
                    '</div>' +
                '</div>' +
            linkClose;
        });

        wrapper.innerHTML = html;
        section.style.display = '';
    } catch (e) {
        console.warn('Error loading promo banners:', e);
        section.style.display = 'none';
    }
}

/**
 * Fase 23: Show subtle real-time update indicator
 */
var _realtimeToastTimeout = null;
function showRealtimeUpdateIndicator() {
    var existing = document.getElementById('realtimeIndicator');
    if (existing) existing.remove();
    clearTimeout(_realtimeToastTimeout);

    var indicator = document.createElement('div');
    indicator.id = 'realtimeIndicator';
    indicator.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);' +
        'background:rgba(30,30,30,0.95);color:#b89658;padding:8px 20px;border-radius:24px;' +
        'font-size:0.8rem;z-index:9999;backdrop-filter:blur(8px);border:1px solid rgba(184,150,88,0.3);' +
        'box-shadow:0 4px 12px rgba(0,0,0,0.3);opacity:0;transition:opacity 0.3s;display:flex;align-items:center;gap:8px;';
    indicator.innerHTML = '<span style="display:inline-block;width:6px;height:6px;background:#b89658;border-radius:50%;animation:pulse 1s infinite;"></span> Inventario actualizado';
    document.body.appendChild(indicator);

    // Add pulse animation if not exists
    if (!document.getElementById('realtimePulseStyle')) {
        var style = document.createElement('style');
        style.id = 'realtimePulseStyle';
        style.textContent = '@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}';
        document.head.appendChild(style);
    }

    requestAnimationFrame(function() { indicator.style.opacity = '1'; });
    _realtimeToastTimeout = setTimeout(function() {
        indicator.style.opacity = '0';
        setTimeout(function() { if (indicator.parentNode) indicator.remove(); }, 400);
    }, 3000);
}

/**
 * Update trust bar stats with real vehicle/brand counts from vehicleDB
 */
function loadHeroStats() {
    if (!window.vehicleDB) return;
    var vehicles = vehicleDB.getAllVehicles() || [];
    var brands   = vehicleDB.getAllBrands()   || [];

    var vEl = document.getElementById('trustStatVehicles');
    var bEl = document.getElementById('trustStatBrands');

    if (vEl) vEl.textContent = vehicles.length || '–';
    if (bEl) bEl.textContent = brands.length   || '–';
}

/**
 * Smart search bar — autocomplete from vehicleDB, debounced, keyboard-navigable.
 * On select/Enter: redirects to busqueda.html?buscar=TERM
 */
function initHeroSearch() {
    var input    = document.getElementById('heroSearchInput');
    var dropdown = document.getElementById('heroSearchDropdown');
    if (!input || !dropdown) return;

    var debounceTimer = null;
    var activeIndex   = -1;
    var suggestions   = [];

    function isDbReady() {
        return window.vehicleDB && vehicleDB.loaded;
    }

    function getSuggestions(query) {
        if (!isDbReady()) return [];
        var q = query.trim().toLowerCase();
        if (!q) return [];

        var vehicles = vehicleDB.getAllVehicles() || [];
        var seen = {};
        var results = [];

        vehicles.forEach(function(v) {
            if (v.estado && v.estado !== 'disponible') return;
            var candidates = [
                v.marca,
                v.marca + ' ' + v.modelo,
                v.marca + ' ' + v.modelo + ' ' + v.year,
                String(v.year)
            ];
            candidates.forEach(function(term) {
                var key = (term || '').trim().toLowerCase();
                if (key && key.includes(q) && !seen[key]) {
                    seen[key] = true;
                    results.push((term || '').trim());
                }
            });
        });

        return results.slice(0, 8);
    }

    function renderDropdown(items) {
        activeIndex  = -1;
        suggestions  = items;
        if (!items.length) {
            dropdown.hidden = true;
            dropdown.innerHTML = '';
            return;
        }
        dropdown.innerHTML = items.map(function(item, i) {
            return '<li class="hero-search-option" role="option" data-index="' + i + '">' +
                '<svg class="hero-search-opt-icon" viewBox="0 0 20 20" fill="currentColor" width="14" height="14" aria-hidden="true">' +
                '<path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>' +
                '</svg>' +
                item +
                '</li>';
        }).join('');
        dropdown.hidden = false;
    }

    function showLoadingHint() {
        dropdown.innerHTML = '<li class="hero-search-loading">Cargando inventario…</li>';
        dropdown.hidden = false;
    }

    function hideDropdown() {
        dropdown.hidden = true;
        dropdown.innerHTML = '';
        suggestions  = [];
        activeIndex  = -1;
    }

    function selectSuggestion(text) {
        input.value = text;
        hideDropdown();
        window.location.href = 'busqueda.html?buscar=' + encodeURIComponent(text);
    }

    function navigateList(dir) {
        var items = dropdown.querySelectorAll('.hero-search-option');
        if (!items.length) return;
        activeIndex = Math.max(-1, Math.min(items.length - 1, activeIndex + dir));
        items.forEach(function(el, i) {
            el.classList.toggle('is-active', i === activeIndex);
        });
    }

    input.addEventListener('input', function() {
        clearTimeout(debounceTimer);
        var q = input.value.trim();
        if (!q) { hideDropdown(); return; }
        if (!isDbReady()) { showLoadingHint(); return; }
        debounceTimer = setTimeout(function() {
            renderDropdown(getSuggestions(q));
        }, 250);
    });

    input.addEventListener('keydown', function(e) {
        if (dropdown.hidden) {
            if (e.key === 'Enter' && input.value.trim()) {
                window.location.href = 'busqueda.html?buscar=' + encodeURIComponent(input.value.trim());
            }
            return;
        }
        if (e.key === 'ArrowDown')  { e.preventDefault(); navigateList(1); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); navigateList(-1); }
        else if (e.key === 'Enter') {
            e.preventDefault();
            if (activeIndex >= 0 && suggestions[activeIndex]) {
                selectSuggestion(suggestions[activeIndex]);
            } else if (input.value.trim()) {
                hideDropdown();
                window.location.href = 'busqueda.html?buscar=' + encodeURIComponent(input.value.trim());
            }
        } else if (e.key === 'Escape') {
            hideDropdown();
        }
    });

    dropdown.addEventListener('mousedown', function(e) {
        var li = e.target.closest('.hero-search-option');
        if (li) {
            var idx = parseInt(li.dataset.index, 10);
            if (!isNaN(idx) && suggestions[idx]) selectSuggestion(suggestions[idx]);
        }
    });

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.hero-search-wrap')) hideDropdown();
    });

    // Refresh suggestions if DB loads while dropdown shows "Cargando…"
    if (window.vehicleDB && typeof vehicleDB.onChange === 'function') {
        vehicleDB.onChange(function() {
            if (!dropdown.hidden && dropdown.querySelector('.hero-search-loading')) {
                var q = input.value.trim();
                if (q) renderDropdown(getSuggestions(q));
            }
        });
    }
}

/**
 * Fase 23: Re-render functions for real-time updates (no await vehicleDB.load() needed)
 */
function rerenderVehicleSections() {
    // Re-render destacados
    loadDestacadosBanner();
    // Re-render unified vehicle carousel
    loadAllVehicles();
    // Re-enable drag scroll after re-render
    setTimeout(enableDragScroll, 300);
}

function rerenderBrands() {
    loadPopularBrands();
}

function rerenderBanners() {
    if (!vehicleDB._latestBanners) return;
    var section = document.getElementById('promoBannerSection');
    var wrapper = document.getElementById('promoBannerWrapper');
    if (!section || !wrapper) return;

    var banners = vehicleDB._latestBanners;
    if (banners.length === 0) { section.style.display = 'none'; return; }

    var html = '';
    banners.forEach(function(b) {
        var linkOpen = b.link ? '<a href="' + b.link + '" class="promo-banner-link">' : '<div class="promo-banner-link">';
        var linkClose = b.link ? '</a>' : '</div>';
        html += linkOpen +
            '<div class="promo-banner-item">' +
                (b.image ? '<img src="' + b.image + '" alt="' + (b.title || '') + '" loading="lazy">' : '') +
                '<div class="promo-banner-overlay">' +
                    '<div class="promo-banner-content">' +
                        (b.title ? '<h3 class="promo-banner-title">' + b.title + '</h3>' : '') +
                        (b.subtitle ? '<p class="promo-banner-subtitle">' + b.subtitle + '</p>' : '') +
                        (b.cta ? '<span class="promo-banner-cta">' + b.cta + ' &rarr;</span>' : '') +
                    '</div>' +
                '</div>' +
            '</div>' +
        linkClose;
    });
    wrapper.innerHTML = html;
    section.style.display = '';
}

/**
 * Initialize page
 * Load all content when DOM is ready
 */
function initializePage() {
    // Load all sections in parallel for better performance
    initHeroSearch();

    Promise.all([
        loadDestacadosBanner(),
        loadPopularBrands(),
        loadAllVehicles(),
        loadPromoBanners()
    ]).then(function() {
        loadHeroStats();
        // Enable drag after vehicles are rendered and overflow-x is active
        enableDragScroll();

        // Fase 23: Start real-time listeners after initial load
        if (window.vehicleDB && typeof vehicleDB.startRealtime === 'function') {
            vehicleDB.onChange(function(changeType) {
                console.log('[RT] Data changed:', changeType);
                showRealtimeUpdateIndicator();
                if (changeType === 'vehicles') { rerenderVehicleSections(); loadHeroStats(); }
                else if (changeType === 'brands') { rerenderBrands(); loadHeroStats(); }
                else if (changeType === 'banners') rerenderBanners();
            });
            vehicleDB.startRealtime();
        }
    }).catch(function(error) {
        console.error('Error initializing page:', error);
        enableDragScroll(); // still enable on error
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePage);
} else {
    initializePage();
}

/**
 * Scroll brand carousel by clicking arrow buttons
 * Boosts speed in the clicked direction while held; returns to normal on release
 */
var _brandsBoostTimer = null;

function scrollBrandsCarousel(direction) {
    var state = window._brandsScrollState;
    if (!state) return;

    // Set speed to fast in the given direction
    state.speed = direction * state.boostSpeed;
    state.paused = false;

    // After 1.5 seconds, return to normal auto-scroll (right)
    clearTimeout(_brandsBoostTimer);
    _brandsBoostTimer = setTimeout(function() {
        state.speed = state.baseSpeed;
    }, 1500);
}

// Make functions available globally for onclick handlers and other pages
window.scrollCarouselById = scrollCarouselById;
window.scrollBrandsCarousel = scrollBrandsCarousel;
window.enableDragScroll = enableDragScroll;
