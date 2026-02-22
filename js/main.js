// Main Script for ALTORRA CARS - Index Page
// Optimized for Performance and Modern JavaScript

/**
 * Fase 12: Banner rotativo de vehiculos destacados de la semana
 * Muestra los 4 vehiculos marcados como destacado con auto-rotacion
 */
var _destacadosTimer = null;
var _destacadosIndex = 0;
var _destacadosTotal = 0;

async function loadDestacadosBanner() {
    var section = document.getElementById('destacadosBannerSection');
    if (!section) return;

    await vehicleDB.load();

    var featured = vehicleDB.getFeatured();
    if (featured.length === 0) {
        section.style.display = 'none';
        return;
    }

    // Limit to max 4
    featured = featured.slice(0, 4);
    _destacadosTotal = featured.length;
    _destacadosIndex = 0;

    var slidesContainer = document.getElementById('destacadosSlides');
    var indicatorsContainer = document.getElementById('destacadosIndicators');
    if (!slidesContainer || !indicatorsContainer) return;

    // Build slides
    var slidesHTML = '';
    var indicatorsHTML = '';

    featured.forEach(function(v, i) {
        var imgSrc = v.imagen || 'multimedia/vehicles/placeholder-car.jpg';
        var marca = v.marca ? v.marca.charAt(0).toUpperCase() + v.marca.slice(1) : '';
        var title = marca + ' ' + (v.modelo || '') + ' ' + (v.year || '');
        var price = typeof formatPrice === 'function' ? formatPrice(v.precio) : ('$' + v.precio);
        var hasOffer = v.precioOferta && v.precioOferta < v.precio;
        var priceHTML = hasOffer
            ? '<span class="dest-price-old">' + price + '</span><span class="dest-price">' + formatPrice(v.precioOferta) + '</span>'
            : '<span class="dest-price">' + price + '</span>';
        var specs = [];
        if (v.year) specs.push(v.year);
        if (v.kilometraje) specs.push(formatKm(v.kilometraje));
        if (v.transmision) specs.push(v.transmision.charAt(0).toUpperCase() + v.transmision.slice(1));
        var specsText = specs.join(' · ');

        slidesHTML += '<a href="' + getVehicleDetailUrl(v) + '" class="dest-slide' + (i === 0 ? ' active' : '') + '" data-index="' + i + '">'
            + '<div class="dest-image"><img src="' + imgSrc + '" alt="' + title + '" loading="' + (i === 0 ? 'eager' : 'lazy') + '"></div>'
            + '<div class="dest-overlay">'
            + '<div class="dest-badge">Destacado</div>'
            + '<h3 class="dest-title">' + title + '</h3>'
            + '<p class="dest-specs">' + specsText + '</p>'
            + '<div class="dest-price-row">' + priceHTML + '</div>'
            + '<span class="dest-cta">Ver vehiculo →</span>'
            + '</div>'
            + '</a>';

        indicatorsHTML += '<button class="dest-dot' + (i === 0 ? ' active' : '') + '" data-index="' + i + '" aria-label="Ir al vehiculo ' + (i + 1) + '"></button>';
    });

    slidesContainer.innerHTML = slidesHTML;
    indicatorsContainer.innerHTML = indicatorsHTML;

    // Show section
    section.style.display = '';

    // Indicator click handlers
    indicatorsContainer.querySelectorAll('.dest-dot').forEach(function(dot) {
        dot.addEventListener('click', function() {
            goToDestacado(parseInt(dot.dataset.index));
        });
    });

    // Start auto-rotation
    startDestacadosAutoRotate();

    // Pause on hover
    var banner = document.getElementById('destacadosBanner');
    if (banner) {
        banner.addEventListener('mouseenter', function() { clearInterval(_destacadosTimer); });
        banner.addEventListener('mouseleave', function() { startDestacadosAutoRotate(); });

        // Navigation arrows
        var prevBtn = document.getElementById('destNavPrev');
        var nextBtn = document.getElementById('destNavNext');
        if (prevBtn) prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            goToDestacado((_destacadosIndex - 1 + _destacadosTotal) % _destacadosTotal);
            clearInterval(_destacadosTimer);
            startDestacadosAutoRotate();
        });
        if (nextBtn) nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            goToDestacado((_destacadosIndex + 1) % _destacadosTotal);
            clearInterval(_destacadosTimer);
            startDestacadosAutoRotate();
        });

        // Touch swipe support for banner
        var _destTouchStartX = 0;
        banner.addEventListener('touchstart', function(e) {
            _destTouchStartX = e.touches[0].clientX;
            clearInterval(_destacadosTimer);
        }, { passive: true });
        banner.addEventListener('touchend', function(e) {
            var diff = _destTouchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) goToDestacado((_destacadosIndex + 1) % _destacadosTotal);
                else goToDestacado((_destacadosIndex - 1 + _destacadosTotal) % _destacadosTotal);
            }
            startDestacadosAutoRotate();
        }, { passive: true });
    }
}

function goToDestacado(index) {
    _destacadosIndex = index;
    var slides = document.querySelectorAll('.dest-slide');
    var dots = document.querySelectorAll('.dest-dot');
    slides.forEach(function(s, i) { s.classList.toggle('active', i === index); });
    dots.forEach(function(d, i) { d.classList.toggle('active', i === index); });
}

function startDestacadosAutoRotate() {
    clearInterval(_destacadosTimer);
    _destacadosTimer = setInterval(function() {
        _destacadosIndex = (_destacadosIndex + 1) % _destacadosTotal;
        goToDestacado(_destacadosIndex);
    }, 3000);
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
 * Initialize page
 * Load all content when DOM is ready
 */
function initializePage() {
    // Load all sections in parallel for better performance
    Promise.all([
        loadDestacadosBanner(),
        loadPopularBrands(),
        loadUsedVehicles(),
        loadNewVehicles(),
        loadPromoBanners()
    ]).then(function() {
        // Enable drag after vehicles are rendered and overflow-x is active
        enableDragScroll();
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
