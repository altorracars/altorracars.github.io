// Main Script for ALTORRA CARS - Index Page
// Optimized for Performance and Modern JavaScript

/**
 * Load featured vehicles with advanced ranking system
 * Prioritizes: destacado > oferta > tipo > year > km
 */
async function loadFeatured() {
    showLoading('featuredVehicles');
    await vehicleDB.load();

    const featured = vehicleDB.getFeatured();

    const rankedFeatured = featured
        .map(v => ({
            ...v,
            _score: vehicleDB.calculateRankingScore(v)
        }))
        .sort((a, b) => b._score - a._score);

    const cleanFeatured = rankedFeatured.map(({ _score, ...v }) => v);

    // FASE 2: Ocultar seccion si no hay destacados
    if (cleanFeatured.length === 0) {
        hideParentSection('featuredVehicles');
        return;
    }
    renderVehicles(cleanFeatured.slice(0, 12), 'featuredVehicles');
}

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
    var state = { pos: 0, speed: BASE_SPEED, baseSpeed: BASE_SPEED, boostSpeed: BOOST_SPEED, paused: false };
    window._brandsScrollState = state;

    function step() {
        if (!state.paused) {
            state.pos += state.speed;
            var halfWidth = track.scrollWidth / 2;
            if (state.pos >= halfWidth) state.pos -= halfWidth;
            if (state.pos < 0) state.pos += halfWidth;
            track.style.transform = 'translateX(-' + state.pos + 'px)';
        }
        requestAnimationFrame(step);
    }

    // Pause ONLY on the carousel itself, not on arrows
    track.addEventListener('mouseenter', function() { state.paused = true; });
    track.addEventListener('mouseleave', function() { state.paused = false; });
    track.addEventListener('touchstart', function() { state.paused = true; }, { passive: true });
    track.addEventListener('touchend', function() { state.paused = false; }, { passive: true });

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
        if (a.destacado && !b.destacado) return -1;
        if (!a.destacado && b.destacado) return 1;
        if (a.oferta && !b.oferta) return -1;
        if (!a.oferta && b.oferta) return 1;
        return b.year - a.year;
    });

    renderVehicles(sortedNew.slice(0, 12), 'newVehiclesCarousel');
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
        if (a.destacado && !b.destacado) return -1;
        if (!a.destacado && b.destacado) return 1;
        if (a.oferta && !b.oferta) return -1;
        if (!a.oferta && b.oferta) return 1;
        if (b.year !== a.year) return b.year - a.year;
        return a.kilometraje - b.kilometraje;
    });

    renderVehicles(sortedUsed.slice(0, 12), 'usedVehiclesCarousel');
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
 * Enable touch scrolling for mobile carousels
 * Improves mobile UX with smooth touch scrolling
 */
function enableTouchScroll() {
    const carousels = document.querySelectorAll('.vehicles-grid');

    carousels.forEach(carousel => {
        let startX = 0;
        let scrollLeft = 0;
        let isScrolling = false;

        // Set default cursor
        carousel.style.cursor = 'default';

        // Touch start handler
        carousel.addEventListener('touchstart', (e) => {
            isScrolling = true;
            startX = e.touches[0].pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        }, { passive: true });

        // Touch end handler
        carousel.addEventListener('touchend', () => {
            isScrolling = false;
        }, { passive: true });
    });
}

/**
 * Initialize page
 * Load all content when DOM is ready
 */
function initializePage() {
    // Load all vehicle carousels in parallel for better performance
    Promise.all([
        loadFeatured(),
        loadPopularBrands(),
        loadUsedVehicles(),
        loadNewVehicles()
    ]).catch(error => {
        console.error('Error initializing page:', error);
    });

    // Enable touch scrolling for mobile
    enableTouchScroll();
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

// Make scrollCarouselById available globally for onclick handlers
window.scrollCarouselById = scrollCarouselById;
window.scrollBrandsCarousel = scrollBrandsCarousel;
