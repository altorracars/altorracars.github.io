// Service Worker for ALTORRA CARS
// Version 2.0.0 - Modern Caching Strategy
// Strategy: Network First for HTML, Stale-While-Revalidate for assets

const CACHE_VERSION = 'v20260522033840'; // §107 Sistema de borradores REESCRITO desde cero: subcoleccion multi-borrador usuarios/{uid}/drafts/{draftId} (auto-id), estado _currentDraftId, SIN autosave silencioso (asi "No" en el prompt de cierre NO guarda nada), SIN auto-restaurar al Agregar Vehiculo, guardado explicito (#saveDraftBtn + prompt al cerrar X), galeria "Mis borradores" por cuenta con Retomar/Eliminar por id, borrar borrador al publicar, aislamiento por cuenta (eliminado drafts_activos compartido), preservados nombres startDraftsListener/stopDraftsListener/restoreAndOpenDraft (callsites admin-sync §17.4), cero firestore.rules deploy (subcoleccion ya soportaba multi-doc). PREV §106 Wizard vehículo 3 fixes: (1) modal más ancho min(1140px,96vw) no alto. (2) dropdowns ilegibles fix — modales son HERMANOS de #adminPanel así que .admin-panel select option nunca los alcanzaba; agregadas reglas .modal-overlay select/option/optgroup dark bg #1a1a1c texto blanco en admin-visionary.css (admin-only). (3) drafts estilo TikTok — quitado confirm() molesto de Agregar Vehiculo (form limpio siempre), panel #activeDraftsPanel ahora muestra SIEMPRE borrador propio con botones Retomar+Eliminar (otros admins filtrados >2h), resumeOwnDraft/deleteOwnDraft + data-action handlers. Cero schema, cero deploy backend, solo Ctrl+Shift+R. PREV §105 Wizard vehículo REORGANIZACIÓN por modelo mental del usuario (Kavak/Carvana/MercadoLibre). 6 secciones nuevas reagrupadas: Identificación (marca/modelo/year/categoria/km/tipo-derivado/placa/fasecolda) → Specs (transmision/combustible/motor/potencia/cilindraje/traccion/direccion/color/puertas/pasajeros) → Comercial (precio/precioOferta/estado/ubicacion/concesionario/revision/peritaje/oferta-hidden) → Fotos → Detalle (caracteristicas+descripcion) → Publicación (destacado/featured/prioridad/cutout+smartfields review). Resuelve 3 clashes: km+tipo juntos (tipo deriva de km), estado/ubicacion→comercial (logística ES comercial), catch-all "Estado" 11-campos dividido (marketing→Publicación, garantía+origen→Comercial). WIZARD_STEPS array actualizado en admin-phase5.js. Field IDs preservados verbatim (§17.4: vTipo→hidden+vTipoDisplay, vOferta→hidden). data-toggle = body IDs. Cero schema, cero deploy backend, solo Ctrl+Shift+R. PREV §104 Wizard vehículo refactor completo (Sprints A-E): A.1 dedup toast Reordenar + A.2 modal 880px wizard scrollable. B.1 vTipo auto-detect por km (0=nuevo/≤10k=semi-nuevo/>10k=usado, dropdown→hidden+vTipoDisplay readonly + deriveTipoFromKm en input listener). B.2 vOferta auto-derive de precioOferta (checkbox→hidden). B.3 fotos auto-sort alfanumérico localeCompare numeric + primera=portada (uploadFileToStorage resuelve URL/null, handleFiles slot-array). C.1 botón generar descripción movido de BASICA a tab EXTRAS. C.2 Smart Fields preview reubicado al final. D.1 caracteristicas textarea→checkboxes dinámicos por categoría (FEAT_CATEGORIES: featSeguridad/featConfort/featTecnologia/featExterior/featInterior) + #btnAddFeature agrega nueva caract. con saveLists() sync a config/listas + sec-lists (renderFeatureCheckboxes, collectAllFeatures, loadFeaturesIntoForm render-first). E drafts audit: E.1 stopDraftsListener evita listener huérfano drafts_activos tras logout (admin-sync stopRealtimeSync). E.2 declinar borrador NO lo destruye (checkForDraft return false). E.3 deriveTipoFromKm tras restore. E.4 snapshot incluye _images+vConcesionario+vConsignaParticular+features completas (collectAllFeatures, no solo uncategorized). E.5 formHasData unificado via snapshotHasAnyData. Cero schema, cero deploy backend. Solo Ctrl+Shift+R. PREV §A Sprint A formulario vehículo: A.1 dedup toast "Reordenar" (notify.resetTimer(_reorderToastId,4000) evita acumulación al click repetido + dismiss al salir) + A.2 wizard 6 pasos legible (#vehicleModal .modal max-width 880px + .wizard-steps overflow-x auto scroll-snap + scrollbar oculto). PREV §103 admin: reorder inventario por INSERCIÓN en vista LISTA (estándar Shopify/Notion) — grip de arrastre + línea indicadora de drop + posiciones secuenciales globales (top=mayor, spacing 10). Elimina swap+window.confirm. Reorder fuerza vista lista (no tarjetas) y opera sobre TODO el inventario sin filtros/paginación (Shopify manual-sort). Inserción real con re-render optimista + batch solo docs que cambian. CSS .av2-row--reorder/.av2-row-grip/.av2-row-pos/.av2-row--drag-over-top/bottom. Cero schema, cero deploy backend. PREV §101.1 admin: FIX causa raíz REAL de los boxes en cada hijo de las cards. admin-visionary.css:1896 [class*="-card"] matcheaba por SUBSTRING todos los hijos av2-card-title/-meta/-price/-codeflat/-subline (todos contienen "-card") y les aplicaba background+border+radius con especificidad (0,11,0) que vencía a admin-v2.css → cada línea de info en su propio box (vehículos y marcas). Fix: agregado :not([class*="av2-card"]) al catch-all (el sistema av2-card tiene su estilo propio completo en admin-v2.css) + bloque reset !important en hijos de texto plano. Resultado: cards HarmonyOS flat sin boxes anidados. Cero JS, cero schema, cero deploy backend. PREV: // §101 admin: Card view limpia y corporativa (vehiculos + marcas). Vehiculo card: estado como overlay sobre imagen (patron Kavak/CarGurus), codigo texto plano mono (sin pill box .av2-card-codeflat), tipo+concesionario como subline plano (.av2-card-subline) — eliminados 3 pills apilados (codigo/status inline/badge tipo). Checkbox como overlay top-left sobre imagen. Marca card: nombre UNA sola vez (alt="" en logo para no mostrar nombre al romper img + dedup descripcion que iguala al nombre via descNorm!==nombreNorm), count como texto plano (.av2-card-subline--brand sin pill), id pill ELIMINADO (redundante con slug), layout centrado .av2-card--brand con logo prominente. CSS aditivo en admin-v2.css §101 (clases nuevas, .av2-card-code/.av2-card-status/.av2-card-badge-count legacy preservadas para compat). Cero JS admin core tocado fuera de _vehicleCardHTML/brand card branch. Cero schema, cero deploy backend. Solo Ctrl+Shift+R. PREV: §100 admin: Toggle Tarjetas↔Lista (default Lista) + limpieza HarmonyOS en Vehiculos y Marcas. Vista lista densa escaneable (patron Linear/Notion/Stripe) para gestion de inventario, cards via 1 click, persistido localStorage (altorra_vehicles_view/altorra_brands_view). Estado en lista = dot+texto SIN box/burbuja. Toggle segmented control en toolbar de ambas secciones. _vehicleActionsHTML/_brandActionsHTML extraidos DRY. Reorder vehiculos fuerza cards. Cero deploy backend, solo Ctrl+Shift+R. PREV: // §98 admin: FCM prompt deja de salir en cada login (localStorage cooldown 3d en vez de sessionStorage) + handler foreground onMessage (push se muestra in-app cuando el Hub está abierto, antes se perdía silenciosamente) + fix badge CRM "0" fantasma (admin-crm.js escribía total crudo → topnav mostraba "0"; ahora delega a AltorraSidebarBadges hide-on-zero + syncBadges normaliza "0"→vacío). Cero deploy backend. Solo Ctrl+Shift+R. PREV: // §95 FIX hero invisible (real) + ELIMINACIÓN margin-top:70px en TODOS los heros del sitio. §95.A: heroindex-1920.avif/.webp NUNCA existieron (imagen fuente max 1280px, optimizer NO hace upscaling) — preload + <picture> source srcset del index.html referenciaban 1920w → 404 + cache miss + JS .hero-img-loaded fallaba al detectar el load del <img>. Fix: eliminar variant 1920w de preload y <picture> en index.html, mantener solo 480/768/1280 (que sí existen). nosotros.html intacto (esa imagen sí tiene 1920). §95.B: margin-top:70px legacy en TODOS los heros del sitio creaba gap NEGRO visual entre header (position:fixed top:0) y el inicio del hero — el header fixed NO ocupa espacio en el flow, el margin era innecesario. 7 callsites limpiados: css/hero.css (.hero), css/dark-theme.css (body .brand-hero + .gradient-hero + mobile .brand-hero 56px), index.html critical CSS inline (.hero), nosotros.html critical CSS (.about-hero), marcas.html critical CSS (.marcas-hero desktop + mobile). Resultado: header fixed flota encima del top del hero (intencional, los primeros ~80px quedan tapados pero el hero mide 720px, contenido sigue centrado vertical visible). Cliente percibe header+hero "fundidos" sin gap visual. // §92 FIX hero invisible post-§91 + ELIMINACIÓN total particles + §93 Sprint 3B Lazy loading universal. hero invisible post-§91 + ELIMINACIÓN total particles + §93 Sprint 3B Lazy loading universal. §92: hero del home no aparecía tras §91 — causa raíz <picture> display:inline no contenía visualmente al <img class=hero-bg-img position:absolute>. Fix: regla CSS `.hero > picture { position:absolute; inset:0; z-index:0; display:block }` + override `.hero-bg-img { max-width: none }` para vencer regla universal img{max-width:100%} de style.css. JS inline con fail-safe setTimeout(reveal, 2000ms) que añade .hero-img-loaded incondicional si load event nunca dispara. Particles ELIMINADAS completamente: 32 HTMLs limpiados (8 <div class=hero-particle> por hero × 14 root + 18 marcas/* = ~256 nodos DOM removidos) + bloques CSS .hero-particles/.hero-particle/@keyframes particleFloat de hero.css/dark-theme.css/performance-fixes.css (3 archivos) + ref en js/performance.js selector. CSS inline residuos huérfanos limpiados en nosotros.html (keyframe particleFloat fragmentado) y marcas.html (línea 55). Cero referencia a particle queda en producción. Bot ALTOR sparkles intactos (NO son particles, son altorSparkleA/B). §93 Sprint 3B: 56 <img> tags below-the-fold ahora con loading=lazy + decoding=async en 29 archivos (detalle-vehiculo template + 27 vehiculos/*.html generados + nosotros.html). Skip inteligente: 62 ya tenían loading attr, 67 above-fold por class/id, 2 con fetchpriority=high LCP, 6 dentro de comentarios HTML, 32 dentro de <script>. FCP esperado -10-20% en páginas con muchas imgs (vehículos generados). // §91 Sprint 3A Imágenes responsive — Fase 3 Performance. scripts/optimize-images.mjs: agregados 2 TARGETS nuevos (multimedia/nosotros-hero.webp + multimedia/categories/camioneta.jpg). GitHub Actions workflow optimize-images.yml dispara automático al detectar el cambio del script y genera 16 variants nuevas (8 cada uno: AVIF/WebP × 480/768/1280/1920). index.html: hero LCP refactor — <picture> con <source type=image/avif> + <source type=image/webp> + <img class=hero-bg-img> srcset 4 tamaños. Background-image legacy de .hero::after eliminado de hero.css, reemplazado por .hero-bg-img absolute position con cross-fade idéntico. JS inline observa el <img>.load real (no Image() virtual). Preload del head reemplazado por 2 preloads (AVIF + WebP) con imagesrcset + type → browser elige uno solo según soporte, ignora el otro. Category cards 4 (SUV/camioneta/SEDAN/HATCHBACK) wrap con <picture> srcset. nosotros.html: misma refactor del .about-hero — <picture> con <img class=about-hero-bg> + preload AVIF/WebP en head. CSS .about-hero::before legacy eliminado, reemplazado por .about-hero-bg position absolute. LCP esperado -40-60% en mobile (AVIF ~70% más liviano que WebP/JPG). Cero JS admin tocado, cero schema Firestore, cero deploy backend. Workflow optimize-images.yml corre tras push automático. // §90 Sprint Fase 4 SEO técnica: generator emite schema Car expandido + BreadcrumbList + OG/Twitter cards en marcas. h1 sr-only Cartagena en index/busqueda. // §89 PENDIENTE-B R8 grande: refactor 174 callsites legacy → AP.hasPermission. // §88 C-S10 Internal notes + Transferencias entre asesores. // §87 C-S9 CSAT + Auto-resolve idle chats + Dashboard métricas Concierge. // §86 C-S8 Welcome contextual + Progressive profiling + Quick replies dinámicos + Carousel vehicle cards. // §82-§84 Smart Update Prompts. // §80 staleness guard concierge. // §75-§79 Mega-Plan §59 ALTOR Hub S3-S7. // §63-§73.4 Plan §61 RBAC dinámico (R1-R8 mini cleanup).
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
