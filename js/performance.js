// ============================================
// OPTIMIZACIÓN DE PERFORMANCE - ALTORRA CARS
// Lazy loading, preloading y mejoras de rendimiento
// v2.0 - Optimización avanzada
// ============================================

class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        // Ejecutar optimizaciones críticas inmediatamente
        this.setupLazyLoading();
        this.setupIntersectionAnimations();

        // Ejecutar optimizaciones no críticas cuando el navegador esté idle
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                this.preloadCriticalAssets();
                this.deferNonCriticalCSS();
            });
        } else {
            setTimeout(() => {
                this.preloadCriticalAssets();
                this.deferNonCriticalCSS();
            }, 200);
        }

        // P2: scroll handling unified in components.js (smart navbar).
        // The previous handleScroll() in this file toggled a `.scrolled`
        // class that no CSS rule consumes — pure dead work on every frame.
        this.pauseOffScreenAnimations();
    }

    // ===== LAZY LOADING DE IMÁGENES AVANZADO =====
    setupLazyLoading() {
        if (!('IntersectionObserver' in window)) return;

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    this.loadImage(img);
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '100px 0px', // Cargar 100px antes de que entre en viewport
            threshold: 0.01
        });

        // Observar imágenes con data-src
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.classList.add('lazy-image');
            imageObserver.observe(img);
        });

        // Observar imágenes con loading="lazy" (polyfill para navegadores antiguos)
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            if (!('loading' in HTMLImageElement.prototype)) {
                imageObserver.observe(img);
            }
        });

        // Observar elementos con background-image lazy
        document.querySelectorAll('[data-bg]').forEach(el => {
            const bgObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.backgroundImage = `url(${entry.target.dataset.bg})`;
                        entry.target.classList.add('bg-loaded');
                        bgObserver.unobserve(entry.target);
                    }
                });
            }, { rootMargin: '100px 0px' });
            bgObserver.observe(el);
        });
    }

    loadImage(img) {
        // Cargar imagen con efecto de fade-in
        const src = img.dataset.src;
        const srcset = img.dataset.srcset;

        if (src) {
            // Precargar imagen
            const tempImg = new Image();
            tempImg.onload = () => {
                img.src = src;
                if (srcset) img.srcset = srcset;
                img.classList.add('loaded');
                img.removeAttribute('data-src');
                img.removeAttribute('data-srcset');
            };
            tempImg.onerror = () => {
                // Fallback si la imagen falla
                img.src = 'multimedia/vehicles/placeholder-car.jpg';
                img.classList.add('loaded', 'error');
            };
            tempImg.src = src;
        }
    }

    // ===== ANIMACIONES AL SCROLL OPTIMIZADAS =====
    setupIntersectionAnimations() {
        if (!('IntersectionObserver' in window)) return;

        // Observer 1: explicit .reveal classes already in HTML markup
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    requestAnimationFrame(() => {
                        entry.target.classList.add('active');
                    });
                    animationObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll(
            '.reveal, .reveal-left, .reveal-right, .reveal-scale, .fade-in, .slide-up'
        ).forEach(el => animationObserver.observe(el));

        // L2.2: auto-instrument landmark elements for graceful scroll reveal.
        // Fade-up effect when sections enter the viewport — same pattern that
        // makes Apple/Stripe pages feel composed instead of "popped in".
        // Selectors target section headers and stand-alone hero-style cards;
        // vehicle-card grids already get their own L2.1 stagger.
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    requestAnimationFrame(() => {
                        entry.target.classList.add('is-revealed');
                    });
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        const autoTargets = document.querySelectorAll(
            '.featured-section .section-header,' +
            '.recently-viewed-section .section-header,' +
            '.brands-section .section-header,' +
            '#testimonials-section .section-header,' +
            '.commercial-section .commercial-card,' +
            '.promo-banner-section .promo-banner-item'
        );
        autoTargets.forEach(el => {
            if (el.classList.contains('auto-reveal')) return;
            el.classList.add('auto-reveal');
            revealObserver.observe(el);
        });
    }

    // ===== PRELOAD DE ASSETS CRÍTICOS =====
    preloadCriticalAssets() {
        // Solo precargar si el navegador soporta preload
        if (!document.createElement('link').relList?.supports?.('preload')) return;

        // Preconnect a dominios externos
        const preconnects = [
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com'
        ];

        preconnects.forEach(url => {
            if (!document.querySelector(`link[href="${url}"]`)) {
                const link = document.createElement('link');
                link.rel = 'preconnect';
                link.href = url;
                link.crossOrigin = 'anonymous';
                document.head.appendChild(link);
            }
        });

        // Prefetch de páginas más visitadas (después de 3 segundos)
        setTimeout(() => this.prefetchPages(), 3000);
    }

    prefetchPages() {
        // Solo prefetch si el usuario no tiene conexión lenta
        if (navigator.connection?.saveData) return;
        if (navigator.connection?.effectiveType === '2g') return;

        const pagesToPrefetch = [
            'busqueda.html'
        ];

        pagesToPrefetch.forEach(page => {
            if (!document.querySelector(`link[href="${page}"]`)) {
                const link = document.createElement('link');
                link.rel = 'prefetch';
                link.href = page;
                document.head.appendChild(link);
            }
        });
    }

    // ===== CARGAR CSS NO CRÍTICOS =====
    deferNonCriticalCSS() {
        // Cargar CSS que estaban con media="print"
        document.querySelectorAll('link[media="print"]').forEach(link => {
            if (link.onload === null) {
                link.media = 'all';
            }
        });
    }

    // ===== PAUSE OFF-SCREEN ANIMATIONS =====
    // Stops infinite CSS animations on sections that are not visible,
    // saving GPU compositing and paint cycles.
    pauseOffScreenAnimations() {
        if (!('IntersectionObserver' in window)) return;

        var sections = document.querySelectorAll(
            '.hero, .brand-hero, .about-hero, .marcas-hero, ' +
            '.featured-week-wrap, .dest-section, .dest-visual'
        );

        if (!sections.length) return;

        var animObs = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                // Pause/resume all animations inside the section
                var children = entry.target.querySelectorAll(
                    '.hero-particle, .hero-ambient, .dest-hud-ring-arc, ' +
                    '.dest-visual-glow, .fw-hud-scanline, .fw-hud-layer, ' +
                    '[class*="dest-hud-ring"], .brand-hero-bg, .marcas-hero-bg'
                );
                var state = entry.isIntersecting ? 'running' : 'paused';
                children.forEach(function(el) {
                    el.style.animationPlayState = state;
                });
                // Also pause pseudo-element animations via class
                if (entry.isIntersecting) {
                    entry.target.classList.remove('anim-paused');
                } else {
                    entry.target.classList.add('anim-paused');
                }
            });
        }, { rootMargin: '100px 0px' });

        sections.forEach(function(sec) { animObs.observe(sec); });
    }

    // ===== UTILIDADES =====
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    static throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// ===== OPTIMIZACIONES ADICIONALES =====

// Detectar soporte de WebP y AVIF
const checkImageSupport = () => {
    const webpSupport = document.createElement('canvas')
        .toDataURL('image/webp')
        .indexOf('data:image/webp') === 0;

    document.documentElement.classList.add(webpSupport ? 'webp' : 'no-webp');
};

// Optimizar carga de fuentes
const optimizeFontLoading = () => {
    if ('fonts' in document) {
        Promise.all([
            document.fonts.load('400 1rem Poppins'),
            document.fonts.load('600 1rem Poppins'),
            document.fonts.load('700 1rem Poppins')
        ]).then(() => {
            document.documentElement.classList.add('fonts-loaded');
        });
    }
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    checkImageSupport();
    optimizeFontLoading();
    window.performanceOptimizer = new PerformanceOptimizer();
});

// Registrar métricas de performance (solo en desarrollo)
if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData) {
                console.log('%c📊 Performance Metrics', 'color: #d4af37; font-weight: bold;');
                console.log(`   DOM Ready: ${Math.round(perfData.domContentLoadedEventEnd)}ms`);
                console.log(`   Full Load: ${Math.round(perfData.loadEventEnd)}ms`);
                console.log(`   TTFB: ${Math.round(perfData.responseStart)}ms`);
            }
        }, 0);
    });
}
