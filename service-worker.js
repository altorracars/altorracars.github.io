// Service Worker for ALTORRA CARS
// Version 2.0.0 - Modern Caching Strategy
// Strategy: Network First for HTML, Stale-While-Revalidate for assets

const CACHE_VERSION = 'v20260520190000'; // §98 admin: FCM prompt deja de salir en cada login (localStorage cooldown 3d en vez de sessionStorage) + handler foreground onMessage (push se muestra in-app cuando el Hub está abierto, antes se perdía silenciosamente) + fix badge CRM "0" fantasma (admin-crm.js escribía total crudo → topnav mostraba "0"; ahora delega a AltorraSidebarBadges hide-on-zero + syncBadges normaliza "0"→vacío). Cero deploy backend. Solo Ctrl+Shift+R. PREV: // §95 FIX hero invisible (real) + ELIMINACIÓN margin-top:70px en TODOS los heros del sitio. §95.A: heroindex-1920.avif/.webp NUNCA existieron (imagen fuente max 1280px, optimizer NO hace upscaling) — preload + <picture> source srcset del index.html referenciaban 1920w → 404 + cache miss + JS .hero-img-loaded fallaba al detectar el load del <img>. Fix: eliminar variant 1920w de preload y <picture> en index.html, mantener solo 480/768/1280 (que sí existen). nosotros.html intacto (esa imagen sí tiene 1920). §95.B: margin-top:70px legacy en TODOS los heros del sitio creaba gap NEGRO visual entre header (position:fixed top:0) y el inicio del hero — el header fixed NO ocupa espacio en el flow, el margin era innecesario. 7 callsites limpiados: css/hero.css (.hero), css/dark-theme.css (body .brand-hero + .gradient-hero + mobile .brand-hero 56px), index.html critical CSS inline (.hero), nosotros.html critical CSS (.about-hero), marcas.html critical CSS (.marcas-hero desktop + mobile). Resultado: header fixed flota encima del top del hero (intencional, los primeros ~80px quedan tapados pero el hero mide 720px, contenido sigue centrado vertical visible). Cliente percibe header+hero "fundidos" sin gap visual. // §92 FIX hero invisible post-§91 + ELIMINACIÓN total particles + §93 Sprint 3B Lazy loading universal. hero invisible post-§91 + ELIMINACIÓN total particles + §93 Sprint 3B Lazy loading universal. §92: hero del home no aparecía tras §91 — causa raíz <picture> display:inline no contenía visualmente al <img class=hero-bg-img position:absolute>. Fix: regla CSS `.hero > picture { position:absolute; inset:0; z-index:0; display:block }` + override `.hero-bg-img { max-width: none }` para vencer regla universal img{max-width:100%} de style.css. JS inline con fail-safe setTimeout(reveal, 2000ms) que añade .hero-img-loaded incondicional si load event nunca dispara. Particles ELIMINADAS completamente: 32 HTMLs limpiados (8 <div class=hero-particle> por hero × 14 root + 18 marcas/* = ~256 nodos DOM removidos) + bloques CSS .hero-particles/.hero-particle/@keyframes particleFloat de hero.css/dark-theme.css/performance-fixes.css (3 archivos) + ref en js/performance.js selector. CSS inline residuos huérfanos limpiados en nosotros.html (keyframe particleFloat fragmentado) y marcas.html (línea 55). Cero referencia a particle queda en producción. Bot ALTOR sparkles intactos (NO son particles, son altorSparkleA/B). §93 Sprint 3B: 56 <img> tags below-the-fold ahora con loading=lazy + decoding=async en 29 archivos (detalle-vehiculo template + 27 vehiculos/*.html generados + nosotros.html). Skip inteligente: 62 ya tenían loading attr, 67 above-fold por class/id, 2 con fetchpriority=high LCP, 6 dentro de comentarios HTML, 32 dentro de <script>. FCP esperado -10-20% en páginas con muchas imgs (vehículos generados). // §91 Sprint 3A Imágenes responsive — Fase 3 Performance. scripts/optimize-images.mjs: agregados 2 TARGETS nuevos (multimedia/nosotros-hero.webp + multimedia/categories/camioneta.jpg). GitHub Actions workflow optimize-images.yml dispara automático al detectar el cambio del script y genera 16 variants nuevas (8 cada uno: AVIF/WebP × 480/768/1280/1920). index.html: hero LCP refactor — <picture> con <source type=image/avif> + <source type=image/webp> + <img class=hero-bg-img> srcset 4 tamaños. Background-image legacy de .hero::after eliminado de hero.css, reemplazado por .hero-bg-img absolute position con cross-fade idéntico. JS inline observa el <img>.load real (no Image() virtual). Preload del head reemplazado por 2 preloads (AVIF + WebP) con imagesrcset + type → browser elige uno solo según soporte, ignora el otro. Category cards 4 (SUV/camioneta/SEDAN/HATCHBACK) wrap con <picture> srcset. nosotros.html: misma refactor del .about-hero — <picture> con <img class=about-hero-bg> + preload AVIF/WebP en head. CSS .about-hero::before legacy eliminado, reemplazado por .about-hero-bg position absolute. LCP esperado -40-60% en mobile (AVIF ~70% más liviano que WebP/JPG). Cero JS admin tocado, cero schema Firestore, cero deploy backend. Workflow optimize-images.yml corre tras push automático. // §90 Sprint Fase 4 SEO técnica: generator emite schema Car expandido + BreadcrumbList + OG/Twitter cards en marcas. h1 sr-only Cartagena en index/busqueda. // §89 PENDIENTE-B R8 grande: refactor 174 callsites legacy → AP.hasPermission. // §88 C-S10 Internal notes + Transferencias entre asesores. // §87 C-S9 CSAT + Auto-resolve idle chats + Dashboard métricas Concierge. // §86 C-S8 Welcome contextual + Progressive profiling + Quick replies dinámicos + Carousel vehicle cards. // §82-§84 Smart Update Prompts. // §80 staleness guard concierge. // §75-§79 Mega-Plan §59 ALTOR Hub S3-S7. // §63-§73.4 Plan §61 RBAC dinámico (R1-R8 mini cleanup).
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
