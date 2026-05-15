// Service Worker for ALTORRA CARS
// Version 2.0.0 - Modern Caching Strategy
// Strategy: Network First for HTML, Stale-While-Revalidate for assets

const CACHE_VERSION = 'v20260515040000'; // §88 Sprint C-S10 (PENDIENTE-C-S10) Internal notes asesor + Transferencias entre asesores + Indicador "X está atendiendo". js/admin-concierge.js: subcoleccion conciergeChats/{sid}/notes/{noteId} con defense-in-depth (cliente NO matchea rule → ni siquiera puede leer). 6 funciones nuevas (subscribeToNotes/sendInternalNote/toggleInternalNoteMode/openTransferModal/executeTransfer/startAttendingPresenceListener). renderChatDetail merge notes+messages cronologico + toggle "Nota interna" en composer amber + indicador attending azul si otro admin esta viendo el chat. sendAsesorMessage branch para nota interna. firestore.rules: subcoleccion notes/ con read+create isEditorOrAbove (cliente cero acceso). functions/index.js: onChatTransferred trigger onUpdate cuando claimedBy cambia (NO primer claim) → FCM Push + Telegram alert al nuevo asesor + audit log entry chat.transferred. admin.html: modal #cncTransferModal con lista de asesores online via RTDB presence (filter lastSeen>5min stale). css/admin.css: ~340 lineas .cnc-detail-note (card amber dashed) + .cnc-admin-attending-indicator (pill azul) + .cnc-transfer-* (modal con avatares + status dot) + responsive 600px + prefers-reduced-motion. Deploy obligatorio: firebase deploy --only firestore:rules,functions:onChatTransferred. // §87 Sprint C-S9 (PENDIENTE-C-S9) CSAT post-cierre + Auto-resolve idle chats + Dashboard metricas Concierge. js/concierge.js: helper buildCSATBlockHTML() con 5 emojis (😞 😐 🙂 😊 🤩) + textarea opcional max 280 chars + Submit/Skip. Inyectado entre radicado y botones de la pantalla Chat finalizado en ambas variants (client_finalized + admin). Idempotente — si session.csat existe muestra "Gracias por tu valoracion". Persiste conciergeChats/{sid}.csat = {score, comment, submittedAt, source} via set merge:true. Cero rule deploy (R6 ya cubre client write con auth.uid == userId || userId == null). functions/index.js: Cloud Function autoResolveIdleChats schedule every 30 minutes us-central1. Query mode=live AND status!=closed con filtro client-side lastMessageAt > 24h. Marca status=closed closedReason=idle_timeout closedByRole=system + inserta msg system + audit log entry chat.auto-resolved. Batch cap 200 chats por run (400 ops Firestore limit). js/admin-reports.js: renderConciergeMetrics() lee conciergeChats con where createdAt >= cutoff + unmatchedQueries. Cache 60s. 4 KPIs (Total/Resolucion/CSAT/Tiempo respuesta) + distribucion de cierres (client_finalized/admin_resolved/idle_timeout/sla_breach) + top 5 intents + top 5 FAQs missed. admin.html: bloque HTML en sec-reports despues de Anomalias. css: cnc-csat-* + reports-concierge-* responsive 3->2->1 cols + prefers-reduced-motion. Deploy obligatorio: firebase deploy --only functions:autoResolveIdleChats. // §86 Sprint C-S8 (PENDIENTE-C-S8) Welcome contextual + Progressive profiling + Quick replies dinamicos + Carousel horizontal vehicle cards. js/concierge.js: buildContextualWelcomeHTML con 4 variantes (returning user, en pagina de vehiculo, logueado con nombre, default). isGateRequired progressive: gate NO forzoso por default, solo cuando bot lo solicita via requestGateInline. Branches financiacion_query/appointment_request/sell_my_car ahora retornan _requestGate + _deferredQuery cuando needsIdentityForHighValueAction es true. handleGateSubmit ejecuta deferred query post-gate. getContextualQuickReplies helper con 7 intents mapeados a 3 opciones cada uno. renderVehicleCard acepta isInCarousel flag, vehicleCards >= 3 activa clase cnc-vcard-list--carousel. css/concierge.css: append carousel CSS con scroll-snap-type x mandatory + cards width 280px (240px mobile) + scrollbar dorada + prefers-reduced-motion. Cero schema, cero deploy backend, cero archivos nuevos. 4 sub-features integradas en 1 commit. Patron industry-standard Intercom/Drift/WhatsApp Business. // §82 Fase A Smart Update Prompts. SILENT_DEV_MODE flag ON por default (cero notificacion durante fase dev). showUpdateBanner reescrita: modal fullscreen rgba(0,0,0,0.72) + backdrop-filter:blur(6px) + inset:0 ELIMINADO. Reemplazado por pill sutil bottom-right 320px maxwidth con auto-dismiss 20s + boton dismiss X. Cross-tab dedup via BroadcastChannel altorra-cache-updates con fallback sessionStorage. Daily dedup 24h (vs 5min anterior). Patron industry-standard: Slack pill + GitHub auto-dismiss + Linear silent dev + Notion swap on navigation. Cliente puede toggle SILENT_DEV_MODE via localStorage.altorra_silent_updates 1 o 0 sin redeploy. Para produccion el flag se pasa a false en cache-manager. Cero JS admin, cero schema, cero deploy backend. Solo Ctrl+Shift+R cliente. Reduced-motion respetado.
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
