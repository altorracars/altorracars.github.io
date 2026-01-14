// Component Loader for ALTORRA CARS
// Versión mejorada con menú móvil funcional

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
    
    // Initialize components after loading
    initializeHeader();
    initializeFavorites();
}

// Initialize header functionality - MEJORADO
function initializeHeader() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    // ===== MENÚ HAMBURGUESA =====
    if (hamburger && navMenu) {
        // Toggle menu
        hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Prevenir scroll del body cuando el menú está abierto
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Cerrar menú al hacer click fuera
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !hamburger.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Cerrar menú al hacer click en un link
        const navLinks = navMenu.querySelectorAll('a:not(.nav-link)');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    
    // ===== DROPDOWN EN MÓVIL =====
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('.nav-link');
        
        if (dropdownLink) {
            // En móvil, toggle dropdown al hacer click
            dropdownLink.addEventListener('click', (e) => {
                if (window.innerWidth <= 968) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                    
                    // Cerrar otros dropdowns
                    dropdowns.forEach(other => {
                        if (other !== dropdown) {
                            other.classList.remove('active');
                        }
                    });
                }
            });
        }
        
        // En desktop, hover normal
        if (window.innerWidth > 968) {
            dropdown.addEventListener('mouseenter', () => {
                dropdown.classList.add('active');
            });
            
            dropdown.addEventListener('mouseleave', () => {
                dropdown.classList.remove('active');
            });
        }
    });
    
    // Reinicializar dropdowns al cambiar tamaño de ventana
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }, 250);
    });
    
    // ===== STICKY HEADER =====
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (header) {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
            
            lastScroll = currentScroll;
        }
    });
}

// Initialize favorites counter
function initializeFavorites() {
    updateFavoritesCount();
}

// Update favorites count
function updateFavoritesCount() {
    const favorites = JSON.parse(localStorage.getItem('altorra-favorites') || '[]');
    const favCount = document.getElementById('favCount');
    if (favCount) {
        favCount.textContent = favorites.length.toString();
    }
}

// Global function to update favorites (called from other scripts)
window.updateFavoritesCount = updateFavoritesCount;

// Load components when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAllComponents);
} else {
    loadAllComponents();
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadAllComponents, initializeHeader, initializeFavorites };
}
