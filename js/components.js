// Component Loader for ALTORRA CARS
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

// Initialize header functionality
function initializeHeader() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Sticky header on scroll
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        }
    });
    
    // Dropdown functionality
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.addEventListener('mouseenter', () => {
            dropdown.classList.add('active');
        });
        
        dropdown.addEventListener('mouseleave', () => {
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
