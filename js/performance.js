// ============================================
// OPTIMIZACIÓN DE PERFORMANCE - ALTORRA CARS
// Lazy loading, preloading y mejoras de rendimiento
// ============================================

class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.setupLazyLoading();
        this.setupIntersectionAnimations();
        this.preloadCriticalAssets();
        this.optimizeScrollPerformance();
    }

    // ===== LAZY LOADING DE IMÁGENES =====
    setupLazyLoading() {
        // Usar IntersectionObserver para lazy loading nativo
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;

                        // Cargar imagen desde data-src
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }

                        // Cargar srcset si existe
                        if (img.dataset.srcset) {
                            img.srcset = img.dataset.srcset;
                            img.removeAttribute('data-srcset');
                        }

                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });

            // Observar todas las imágenes con data-src
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });

            // También observar imágenes con loading="lazy" para polyfill
            document.querySelectorAll('img[loading="lazy"]').forEach(img => {
                if (!('loading' in HTMLImageElement.prototype)) {
                    imageObserver.observe(img);
                }
            });
        }
    }

    // ===== ANIMACIONES AL SCROLL =====
    setupIntersectionAnimations() {
        if ('IntersectionObserver' in window) {
            const animationObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            // Observar elementos con clase reveal
            document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
                animationObserver.observe(el);
            });
        }
    }

    // ===== PRELOAD DE ASSETS CRÍTICOS =====
    preloadCriticalAssets() {
        // Preload de fuentes críticas
        const fontPreloads = [
            'https://fonts.gstatic.com/s/poppins/v21/pxiEyp8kv8JHgFVrJJfecg.woff2'
        ];

        fontPreloads.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'font';
            link.type = 'font/woff2';
            link.crossOrigin = 'anonymous';
            link.href = url;
            document.head.appendChild(link);
        });

        // Prefetch de páginas probables
        this.prefetchPages();
    }

    prefetchPages() {
        // Prefetch de páginas más visitadas
        const pagesToPrefetch = [
            'busqueda.html',
            'vehiculos-usados.html',
            'vehiculos-nuevos.html'
        ];

        // Solo prefetch después de cargar la página principal
        if (document.readyState === 'complete') {
            this.doPrefetch(pagesToPrefetch);
        } else {
            window.addEventListener('load', () => {
                setTimeout(() => this.doPrefetch(pagesToPrefetch), 2000);
            });
        }
    }

    doPrefetch(pages) {
        pages.forEach(page => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = page;
            document.head.appendChild(link);
        });
    }

    // ===== OPTIMIZAR RENDIMIENTO DE SCROLL =====
    optimizeScrollPerformance() {
        let ticking = false;

        // Throttle de eventos de scroll
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.onScroll();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    onScroll() {
        // Header shrink en scroll (si aplica)
        const header = document.querySelector('.header, #header');
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }

    // ===== MÉTRICAS DE PERFORMANCE =====
    logPerformanceMetrics() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    if (perfData) {
                        console.log('📊 Performance Metrics:');
                        console.log(`   DNS: ${Math.round(perfData.domainLookupEnd - perfData.domainLookupStart)}ms`);
                        console.log(`   TCP: ${Math.round(perfData.connectEnd - perfData.connectStart)}ms`);
                        console.log(`   TTFB: ${Math.round(perfData.responseStart - perfData.requestStart)}ms`);
                        console.log(`   DOM Ready: ${Math.round(perfData.domContentLoadedEventEnd - perfData.navigationStart)}ms`);
                        console.log(`   Load: ${Math.round(perfData.loadEventEnd - perfData.navigationStart)}ms`);
                    }
                }, 0);
            });
        }
    }
}

// ===== RESOURCE HINTS DINÁMICOS =====
function addResourceHints() {
    // Preconnect a CDNs comunes
    const preconnects = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://www.google-analytics.com'
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
}

// Inicializar optimizaciones
document.addEventListener('DOMContentLoaded', () => {
    addResourceHints();
    window.performanceOptimizer = new PerformanceOptimizer();
});
