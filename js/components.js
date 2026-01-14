// Component Loader for ALTORRA CARS - VERSIÓN MEJORADA PARA MÓVIL
// Loads header and footer snippets into pages

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

// Initialize header functionality - MEJORADO PARA MÓVIL
function initializeHeader() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        // Toggle menu
        hamburger.addEventListener('click', (e) => {
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
        
        // Cerrar menú al hacer click fuera (solo en móvil)
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 968) {
                if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
        
        // Cerrar menú al hacer click en un link (solo en móvil)
        const navLinks = navMenu.querySelectorAll('a:not(.nav-link)');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 968) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
        
        // Manejar redimensionamiento de ventana
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (window.innerWidth > 968) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }, 250);
        });
    }
    
    // Sticky header on scroll
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
    
    // Dropdown functionality - MEJORADO PARA MÓVIL
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        const navLink = dropdown.querySelector('.nav-link');
        
        if (window.innerWidth <= 968) {
            // En móvil: toggle con click
            navLink.addEventListener('click', (e) => {
                e.preventDefault();
                dropdown.classList.toggle('active');
            });
        } else {
            // En desktop: hover
            dropdown.addEventListener('mouseenter', () => {
                dropdown.classList.add('active');
            });
            
            dropdown.addEventListener('mouseleave', () => {
                dropdown.classList.remove('active');
            });
        }
    });
    
    // Actualizar comportamiento de dropdown en resize
    window.addEventListener('resize', () => {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    });
}

// Initialize favorites counter
function initializeFavorites() {
    const favorites = JSON.parse(localStorage.getItem('altorra-favorites') || '[]');
    const favCount = document.getElementById('favCount');
    if (favCount) {
        favCount.textContent = favorites.length.toString();
    }
}

// Load components when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAllComponents);
} else {
    loadAllComponents();
}
