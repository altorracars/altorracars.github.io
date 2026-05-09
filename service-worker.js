// Service Worker for ALTORRA CARS
// Version 2.0.0 - Modern Caching Strategy
// Strategy: Network First for HTML, Stale-While-Revalidate for assets

const CACHE_VERSION = 'v20260511290000'; // §57.8 — 3 botones en pantalla "Chat finalizado" (Descargar + Iniciar nueva + Cerrar chat) patrón Intercom/Drift/WhatsApp + fix radicado duplicado (id="cncClosedRadicado" en branch client_finalized) + defense-in-depth en open() para bug "Cerrar chat → reabrir → conversación vieja" (cleanSessionAndRender automático si closed && closedReason='client_finalized'). §57.7 — listener admin _chatsUnsub queda globalmente activo (no auto-cancel on section change) + heartbeat 30s self-healing. // §57.7 — fix admin no ve chat nuevo en tiempo real (cliente escala → admin no recibe sin refresh): _chatsUnsub queda GLOBALMENTE activo (NO se cancela al cambiar de sección). El cleanup hook §34 estaba cancelándolo al salir de sec-concierge → si cliente escalaba mientras admin estaba en otra sección, el listener no escuchaba y al volver había timing/race que perdía eventos. Ahora solo _messagesUnsub (chat específico) cancela on section change. Plus: heartbeat cada 30s self-healing — si listener cae silenciosamente (network drop, tab throttled, error no propagado), se reinicia automáticamente sin necesidad de refresh. §57.6 — fix snapshot tardío pisaba sesión nueva (_resetting flag) + admin cierre con botón Descargar también + diagnóstico detallado snapshot. §57.quint — fix unificado bugs cierre+reset: helper cleanSessionAndRender garantiza limpieza atómica + welcome render para finalCloseAndCleanup Y resetSession. §57.quat — 4 bugs tiempo real coordinados: (1) admin force fresh listener al entrar a sec-concierge + log diagnóstico (2) claim agrega mensaje system "asesor tomó" para que cliente vea (3) open() limpia inline styles forzados antes de aplicar .cnc-open (panel re-abre OK) (4) Bug 4 cubierto por §57.ter detail re-render. §57.ter — finalCloseAndCleanup robusto (forced inline styles) + admin realtime fix (re-render detail panel cuando active chat cambia en _chatsUnsub). §57.bis — fix botón "Cerrar chat" no respondía: migrado addEventListener directo a data-action delegation (sobrevive re-renders del closed-block). §57 — refactor flow finalización chat cliente: confirm coherente + pantalla "Chat finalizado" con Descargar PDF + Cerrar (sin reset automático). §56 — fix definitivo radicado push Telegram: re-trigger natural via onWrite (espera radicado canónico antes de enviar) en lugar de polling que caduca. §55 — fix race condition radicado en push Telegram (poll re-fetch hasta 3s) + disable_notification:false explícito (asegura sonido). §54 — onChatEscalatedTelegram con onDocumentWritten (capta CREATE con mode=queue) + sin pin region (auto-detect southamerica-east1 evita cross-region IAM) + logs verbosos al inicio. §53 — onChatEscalatedTelegram pinned a us-central1 (fix Eventarc 401 unauthorized en southamerica-east1) + dead code unificado. §52 — 3 fixes: (1) Trust mobile más robusto: NUEVO stableFingerprint (UA + screen + tz + platform + language + hwConcurrency) que NO incluye canvas/WebGL (esos pueden variar entre versiones de iOS Safari/Chrome). isDeviceTrusted Path C ahora prueba 3 estrategias en orden: deviceId match → stableFingerprint match → userAgent+screenSize match. saveDeviceTrust dedupea entries del mismo browser/device antes de agregar. backfillDeviceFingerprints inline migra entries viejos pre-§50 sin deviceId. (2) Banner SLA en Concierge: layout column en mobile/panel estrecho (<700px). Antes botones tenían min-width:140px que forzaba flex-row → text container quedaba con 0 width → cada palabra rompía línea vertical. Ahora column con icon → text → actions apilados, botones width:100%. Desktop ancho (≥700px) sigue en row clean. (3) Hamburger fuera del viewport en iPhone: topnav ahora respeta safe-area-inset-left/right (env()) + max-width:100vw + overflow:hidden + brand-text con text-overflow:ellipsis. Hamburger flex-shrink:0 garantiza que SIEMPRE se vea aunque otros elementos quieran ocupar espacio.
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
