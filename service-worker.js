// Service Worker for ALTORRA CARS
// Version 2.0.0 - Modern Caching Strategy
// Strategy: Network First for HTML, Stale-While-Revalidate for assets

const CACHE_VERSION = 'v20260510200000'; // §30 ADR-030 VISIONARY — Refactor visual world-class del admin. Nuevo css/admin-visionary.css carga ULTIMA + js/admin-visionary-fx.js. Foundation tokens completamente nuevo (--vis-*): 6 surface stack (iOS 26 Liquid + Win 11 Acrylic), 6 elevation niveles fisicos, 12 spring curves, brand 8 stops, blur stack 7 niveles, radii breathing, typography world-class con OpenType features (kern liga tnum ss01), letter-spacing iOS, state layers Material You. Background mesh radial gradient + noise SVG. Sidebar 3-layer depth + active premium (multi-shadow + glow + side accent dorado pulsante + scale icon). KPI cards cursor-follow gradient Vision Pro + border gradient animation + tilt 3D parallax + stagger IntersectionObserver. Buttons shimmer iOS + haptic visual click scale 0.97 + focus ring multi-layer + ripple expansion. Inputs bg gradient + spring focus dorado. Tables sliding accent en row hover + sticky head Mica. Modales multi-layer scrim + spring entry translateY+scale+blur. Topbar liquid material + accent line bottom. Workspace colors radial accents per section (gold/green/blue/violet/cyan/amber/coral). Status badges + role badges + vehicle status pills world-class con border + inset shadow. Notify center + bell + activity feed + palette + presence + tooltips Mica strong unificados. Avatars gradient gold + glow. Tabs premium activo con shadow inset. Page headers gradient text. JS admin-visionary-fx.js: cursor-follow automatico via pointermove passive, haptic visual feedback global, motion choreography stagger via IntersectionObserver, parallax tilt 3D en hero KPIs. prefers-reduced-motion respetado en TODO
const CACHE_NAME = `altorra-cars-${CACHE_VERSION}`;
const RUNTIME_CACHE = `altorra-runtime-${CACHE_VERSION}`;

// Assets that NEVER change between deploys (logos only — NOT category images)
// Category images (/multimedia/categories/) are intentionally excluded:
// they change between deploys and must always be fetched fresh (networkFirst).
const STATIC_ASSETS = [
    '/multimedia/vehicles/placeholder-car.jpg',
    '/multimedia/Logos/Chevrolet.webp',
    '/multimedia/Logos/Nissan.webp',
    '/multimedia/Logos/Renault.webp',
    '/multimedia/Logos/Kia.webp',
    '/multimedia/Logos/Mazda.webp',
    '/multimedia/Logos/Toyota.webp',
    '/multimedia/Logos/Hyundai.webp',
    '/multimedia/Logos/Ford.webp'
];

// Install - precache only essential static assets
self.addEventListener('install', (event) => {
    console.log('[SW] Installing version:', CACHE_VERSION);

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Precaching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                // Force activation immediately
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('[SW] Installation failed:', error);
            })
    );
});

// Activate - clean old caches, take control, notify ONLY on real updates
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating version:', CACHE_VERSION);

    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                // Identify old caches to delete
                const toDelete = cacheNames.filter(
                    (n) => n !== CACHE_NAME && n !== RUNTIME_CACHE
                );
                // isRealUpdate: true only when there were previous caches
                // (genuine version bump). False on first install / after unregister.
                const isRealUpdate = toDelete.length > 0;

                return Promise.all(toDelete.map((n) => {
                    console.log('[SW] Deleting old cache:', n);
                    return caches.delete(n);
                })).then(() => isRealUpdate);
            })
            .then((isRealUpdate) => self.clients.claim().then(() => isRealUpdate))
            .then((isRealUpdate) => {
                if (!isRealUpdate) {
                    // First install or post-unregister reinstall — do NOT notify.
                    // Notifying here would cause an infinite reload loop because
                    // clearAndReload() unregisters the SW and immediately triggers
                    // a fresh install on the next page load.
                    console.log('[SW] First install — skipping SW_UPDATED notification');
                    return;
                }
                console.log('[SW] Real update detected — notifying clients');
                return self.clients.matchAll().then((clients) => {
                    clients.forEach((client) => {
                        client.postMessage({
                            type: 'SW_UPDATED',
                            version: CACHE_VERSION
                        });
                    });
                });
            })
    );
});

// Fetch - Different strategies based on request type
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip cross-origin requests
    if (url.origin !== location.origin) {
        return;
    }

    // Skip chrome-extension and other non-http requests
    if (!request.url.startsWith('http')) {
        return;
    }

    // STRATEGY 1: Network Only for JSON data files (always fresh)
    if (request.url.includes('.json')) {
        event.respondWith(networkOnly(request));
        return;
    }

    // STRATEGY 2: Network First for HTML pages (fresh content priority)
    if (request.headers.get('accept')?.includes('text/html') ||
        request.url.endsWith('.html') ||
        request.url.endsWith('/')) {
        event.respondWith(networkFirst(request));
        return;
    }

    // STRATEGY 3: Network First for hero/category/banner images (they change between deploys)
    if (url.pathname.startsWith('/multimedia/categories/') ||
        url.pathname.startsWith('/multimedia/banner/') ||
        url.pathname.startsWith('/multimedia/heroes/')) {
        event.respondWith(networkFirst(request));
        return;
    }

    // STRATEGY 4: Stale-While-Revalidate for stable assets (CSS, JS, logos)
    event.respondWith(staleWhileRevalidate(request));
});

// Network Only - Always fetch from network, bypass HTTP cache entirely
async function networkOnly(request) {
    try {
        return await fetch(request, { cache: 'no-store' });
    } catch (error) {
        console.warn('[SW] Network only failed:', error.message || error);
        return new Response('Network error', { status: 503 });
    }
}

// Network First - Try network (revalidating HTTP cache), fallback to SW cache
async function networkFirst(request) {
    try {
        // cache: 'no-cache' forces browser to revalidate with server (conditional GET).
        // Without this, fetch() can return stale content from browser HTTP cache
        // (GitHub Pages sends max-age=600) even after SW caches are cleared.
        const networkResponse = await fetch(request, { cache: 'no-cache' });

        if (networkResponse.ok) {
            const cache = await caches.open(RUNTIME_CACHE);
            cache.put(request, networkResponse.clone());
        }

        return networkResponse;
    } catch (error) {
        console.log('[SW] Network failed, trying cache:', request.url);
        const cachedResponse = await caches.match(request);
        if (cachedResponse) return cachedResponse;
        return caches.match('/index.html');
    }
}

// Stale-While-Revalidate - Return cache immediately, revalidate in background
async function staleWhileRevalidate(request) {
    const cache = await caches.open(RUNTIME_CACHE);
    const cachedResponse = await caches.match(request);

    // Revalidate in background — cache: 'no-cache' ensures a conditional GET
    // so we always get fresh content when the asset has changed on the server.
    const fetchPromise = fetch(request, { cache: 'no-cache' })
        .then((networkResponse) => {
            if (networkResponse.ok) {
                cache.put(request, networkResponse.clone());
            }
            return networkResponse;
        })
        .catch(() => null);

    if (cachedResponse) return cachedResponse;

    // No cache — wait for network (happens after clearAndReload)
    const networkResponse = await fetchPromise;
    return networkResponse || new Response('Asset not found', { status: 404 });
}

// Message handler - Allow forced updates
self.addEventListener('message', (event) => {
    console.log('[SW] Message received:', event.data);

    if (event.data?.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data?.type === 'GET_VERSION') {
        event.source.postMessage({
            type: 'VERSION_INFO',
            version: CACHE_VERSION
        });
    }
});

console.log('[SW] Service Worker loaded - Version:', CACHE_VERSION);
