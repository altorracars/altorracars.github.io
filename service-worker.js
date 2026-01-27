// Service Worker for ALTORRA CARS
// Progressive Web App with Offline Support
// Version 1.1.0 - Logos WebP optimizados

const CACHE_VERSION = 'altorra-cars-v1.1.0';
const CACHE_NAME = `${CACHE_VERSION}`;

// Assets to cache on install
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/busqueda.html',
    '/vehiculos-usados.html',
    '/vehiculos-nuevos.html',
    '/favoritos.html',
    '/contacto.html',
    '/nosotros.html',

    // CSS Files - Critical styles
    '/css/style.css',
    '/css/mobile-fixes.css',
    '/css/dark-theme.css',
    '/css/toast-notifications.css',
    '/css/contact-forms.css',

    // JavaScript Files
    '/js/database.js',
    '/js/render.js',
    '/js/components.js',
    '/js/favorites-manager.js',
    '/js/toast.js',
    '/js/contact-forms.js',
    '/js/main.js',

    // Data
    '/data/vehiculos.json',

    // Snippets
    '/snippets/header.html',
    '/snippets/footer.html',

    // Critical images
    '/multimedia/logo-altorra-cars.webp',
    '/multimedia/vehicles/placeholder-car.jpg',

    // Brand logos WebP (optimized)
    '/multimedia/Logos/Chevrolet.webp',
    '/multimedia/Logos/Nissan.webp',
    '/multimedia/Logos/Renault.webp',
    '/multimedia/Logos/Kia.webp',
    '/multimedia/Logos/Mazda.webp',
    '/multimedia/Logos/Toyota.webp',
    '/multimedia/Logos/Hyundai.webp',
    '/multimedia/Logos/Ford.webp'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing...');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('[Service Worker] Installation complete');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('[Service Worker] Installation failed:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating...');

    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== CACHE_NAME) {
                            console.log('[Service Worker] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('[Service Worker] Activation complete');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip cross-origin requests
    if (url.origin !== location.origin) {
        return;
    }

    // Network first for API calls and data
    if (request.url.includes('/data/') || request.url.includes('vehiculos.json')) {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    // Clone response to cache
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, responseClone);
                    });
                    return response;
                })
                .catch(() => {
                    // Fallback to cache if network fails
                    return caches.match(request);
                })
        );
        return;
    }

    // Cache first for static assets (CSS, JS, images)
    event.respondWith(
        caches.match(request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    // Return cached version
                    return cachedResponse;
                }

                // Not in cache, fetch from network
                return fetch(request)
                    .then((response) => {
                        // Don't cache non-successful responses
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone response to cache
                        const responseClone = response.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(request, responseClone);
                        });

                        return response;
                    })
                    .catch((error) => {
                        console.error('[Service Worker] Fetch failed:', error);

                        // Return offline page for HTML requests
                        if (request.headers.get('accept').includes('text/html')) {
                            return caches.match('/index.html');
                        }
                    });
            })
    );
});

// Background sync event (future enhancement)
self.addEventListener('sync', (event) => {
    console.log('[Service Worker] Background sync:', event.tag);

    if (event.tag === 'sync-favorites') {
        event.waitUntil(
            // Sync favorites with server (if backend is implemented)
            Promise.resolve()
        );
    }
});

// Push notification event (future enhancement)
self.addEventListener('push', (event) => {
    console.log('[Service Worker] Push notification received');

    const options = {
        body: event.data ? event.data.text() : 'Nueva actualización disponible',
        icon: '/multimedia/logo-altorra-cars.webp',
        badge: '/multimedia/logo-altorra-cars.webp',
        vibrate: [200, 100, 200],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };

    event.waitUntil(
        self.registration.showNotification('ALTORRA CARS', options)
    );
});

// Message event - communication with main thread
self.addEventListener('message', (event) => {
    console.log('[Service Worker] Message received:', event.data);

    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data && event.data.type === 'CACHE_URLS') {
        event.waitUntil(
            caches.open(CACHE_NAME).then((cache) => {
                return cache.addAll(event.data.urls);
            })
        );
    }
});

console.log('[Service Worker] Script loaded successfully');
