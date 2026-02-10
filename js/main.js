// Main Script for ALTORRA CARS - Index Page
// Optimized for Performance and Modern JavaScript


let _liveRefreshScheduled = false;
let _catalogRetryTimer = null;

function showCatalogWarning(message) {
    ['featuredVehicles', 'newVehiclesCarousel', 'usedVehiclesCarousel', 'popularBrands'].forEach(function(id) {
        var el = document.getElementById(id);
        if (!el) return;
        if (el.getAttribute('data-warning') === '1') return;
        var box = document.createElement('div');
        box.className = 'no-results';
        box.setAttribute('data-warning', '1');
        box.innerHTML = '<h3 class="no-results-title">Inventario temporalmente no disponible</h3><p class="no-results-text">' + message + '</p>';
        el.innerHTML = '';
        el.appendChild(box);
        el.setAttribute('data-warning', '1');
    });
}

function clearCatalogWarning() {
    ['featuredVehicles', 'newVehiclesCarousel', 'usedVehiclesCarousel', 'popularBrands'].forEach(function(id) {
        var el = document.getElementById(id);
        if (!el) return;
        if (el.getAttribute('data-warning') === '1') {
            el.innerHTML = '';
            el.removeAttribute('data-warning');
        }
    });
}

function scheduleLiveRefresh() {
    if (_liveRefreshScheduled) return;
    _liveRefreshScheduled = true;
    setTimeout(function() {
        _liveRefreshScheduled = false;
        loadFeatured();
        loadPopularBrands();
        loadUsedVehicles();
        loadNewVehicles();
    }, 150);
}

/**
 * Load featured vehicles with advanced ranking system
 * Prioritizes: destacado > oferta > tipo > year > km
 */
async function loadFeatured() {
    showLoading('featuredVehicles');
    await vehicleDB.load();

    // Filter featured vehicles first, then rank them
    var featured = vehicleDB.getFeatured();
    if (!featured.length) {
        featured = vehicleDB.getTopVehicles(12);
    }

    // Rank featured vehicles by score
    const rankedFeatured = featured
        .map(v => ({
            ...v,
            _score: vehicleDB.calculateRankingScore(v)
        }))
        .sort((a, b) => b._score - a._score);

    // Clean score property before rendering
    const cleanFeatured = rankedFeatured.map(({ _score, ...v }) => v);

    renderVehicles(cleanFeatured.slice(0, 12), 'featuredVehicles');
}

/**
 * Load popular brands dynamically based on inventory count
 * Shows top 8 brands with most vehicles in stock
 */
async function loadPopularBrands() {
    await vehicleDB.load();
    const allVehicles = vehicleDB.getAllVehicles();

    // Count vehicles by brand
    const brandCounts = {};
    allVehicles.forEach(v => {
        const brandKey = v.marca.toLowerCase();
        brandCounts[brandKey] = (brandCounts[brandKey] || 0) + 1;
    });

    // Get all brands and sort by vehicle count
    const brands = vehicleDB.getAllBrands();
    const popularBrands = brands
        .filter(brand => brandCounts[brand.id] > 0) // Only brands with vehicles
        .map(brand => ({
            ...brand,
            count: brandCounts[brand.id]
        }))
        .sort((a, b) => b.count - a.count) // Sort by count descending
        .slice(0, 8); // Top 8 brands

    const container = document.getElementById('popularBrands');

    if (container) {
        const html = popularBrands.map(brand => `
            <a href="marca.html?marca=${brand.id}" class="brand-card">
                <img src="${brand.logo}" alt="${brand.nombre}" class="brand-logo"
                     onerror="this.style.display='none'">
                <div class="brand-name">${brand.nombre}</div>
            </a>
        `).join('');

        container.innerHTML = html;
    }
}

/**
 * Load new vehicles with ranking
 * Prioritizes: destacado > oferta > newest year
 */
async function loadNewVehicles() {
    showLoading('newVehiclesCarousel');
    await vehicleDB.load();
    const newVehicles = vehicleDB.filter({ tipo: 'nuevo' });

    // Sort: destacado > oferta > year (desc)
    const sortedNew = newVehicles.sort((a, b) => {
        // Featured first
        if (a.destacado && !b.destacado) return -1;
        if (!a.destacado && b.destacado) return 1;

        // Offers second
        if (a.oferta && !b.oferta) return -1;
        if (!a.oferta && b.oferta) return 1;

        // Then by year (newest first)
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

    // Sort: destacado > oferta > year (desc) > km (asc - less is better)
    const sortedUsed = used.sort((a, b) => {
        // Featured first
        if (a.destacado && !b.destacado) return -1;
        if (!a.destacado && b.destacado) return 1;

        // Offers second
        if (a.oferta && !b.oferta) return -1;
        if (!a.oferta && b.oferta) return 1;

        // Then by year (newest first)
        if (b.year !== a.year) return b.year - a.year;

        // Finally by km (less km is better)
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

    // Real-time refresh from Firestore listeners
    window.addEventListener('vehicleDB:updated', function(evt) {
        if (!evt || !evt.detail || !evt.detail.source) return;

        if (evt.detail.source.indexOf('firestore-live-') === 0) {
            if (_catalogRetryTimer) {
                clearTimeout(_catalogRetryTimer);
                _catalogRetryTimer = null;
            }
            clearCatalogWarning();
            scheduleLiveRefresh();
            return;
        }

        if (evt.detail.source === 'empty' && (!window.vehicleDB || window.vehicleDB.vehicles.length === 0)) {
            if (!_catalogRetryTimer) {
                _catalogRetryTimer = setTimeout(function() {
                    _catalogRetryTimer = null;
                    if (window.vehicleDB) {
                        window.vehicleDB.load(true);
                    }
                }, 5000);
            }
        }
    });

    window.addEventListener('vehicleDB:error', function(evt) {
        if (!evt || !evt.detail) return;
        var msg = (evt.detail.message || '').toLowerCase();
        if (msg.indexOf('permission') >= 0 || msg.indexOf('missing or insufficient permissions') >= 0) {
            showCatalogWarning('No fue posible cargar el inventario por permisos de Firestore. Verifica reglas desplegadas y recarga la pagina.');
            return;
        }

        if (msg.indexOf('timeout') >= 0 || msg.indexOf('unavailable') >= 0 || msg.indexOf('network') >= 0 || msg.indexOf('offline') >= 0) {
            showCatalogWarning('No se pudo conectar con Firestore. Mostrando datos en cache (si existen) mientras se restablece la conexion.');
        }
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePage);
} else {
    initializePage();
}

// Make scrollCarouselById available globally for onclick handlers
window.scrollCarouselById = scrollCarouselById;
