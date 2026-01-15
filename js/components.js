// Component Loader for ALTORRA CARS
// Versión Final Optimizada - iPhone Compatible

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
    
    // Initialize after loading - pequeño delay para asegurar DOM
    setTimeout(() => {
        initializeHeader();
        initializeFavorites();
    }, 100);
}

// Initialize header functionality - MEJORADO PARA iPHONE
function initializeHeader() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const body = document.body;
    
    if (!hamburger || !navMenu) {
        console.error('Menu elements not found');
        return;
    }
    
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
    
    // ===== STICKY HEADER =====
    let lastScroll = 0;
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const header = document.getElementById('header');
                if (header) {
                    const currentScroll = window.pageYOffset;
                    
                    if (currentScroll > 80) {
                        header.classList.add('sticky');
                    } else {
                        header.classList.remove('sticky');
                    }
                    
                    lastScroll = currentScroll;
                }
                ticking = false;
            });
            ticking = true;
        }
    });
    
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

// Initialize favorites counter
function initializeFavorites() {
    updateFavoritesCount();
}

// Update favorites count
function updateFavoritesCount() {
    try {
        const favorites = JSON.parse(localStorage.getItem('altorra-favorites') || '[]');
        const favCount = document.getElementById('favCount');
        if (favCount) {
            favCount.textContent = favorites.length.toString();
        }
    } catch (error) {
        console.error('Error updating favorites:', error);
    }
}

// Global function to update favorites
window.updateFavoritesCount = updateFavoritesCount;

// Load components when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAllComponents);
} else {
    loadAllComponents();
}

// Smooth scroll para links internos
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        loadAllComponents, 
        initializeHeader, 
        initializeFavorites,
        updateFavoritesCount
    };
}
