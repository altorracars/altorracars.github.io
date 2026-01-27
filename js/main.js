// Main Script for ALTORRA CARS - Index Page
// Optimized for Performance and Modern JavaScript

/**
 * Load featured vehicles with advanced ranking system
 * Prioritizes: destacado > oferta > tipo > year > km
 */
async function loadFeatured() {
    showLoading('featuredVehicles');
    await vehicleDB.load();

    // Filter featured vehicles first, then rank them
    const featured = vehicleDB.getFeatured();

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
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePage);
} else {
    initializePage();
}

// Make scrollCarouselById available globally for onclick handlers
window.scrollCarouselById = scrollCarouselById;
