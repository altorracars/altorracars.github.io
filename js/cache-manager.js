/**
 * ALTORRA CARS — Smart Cache Manager v4.0
 * ==========================================
 * Sistema de invalidación inteligente con dos fuentes de señal:
 *
 *   🔧 ADMIN CHANGES  → system/meta.lastModified (Firestore)
 *      El admin panel actualiza este campo al guardar cualquier dato.
 *      Todos los tabs abiertos reciben el cambio en tiempo real (onSnapshot).
 *      Las cargas nuevas lo comparan contra IndexedDB para detectar stale cache.
 *
 *   🚀 GITHUB DEPLOYS → data/deploy-info.json (archivo estático)
 *      GitHub Actions regenera este archivo en cada deploy.
 *      Al cargar la página se fetchea (network-only) y se compara la versión.
 *      Si difiere, se limpian todos los caches y se fuerza reload.
 *
 * Capas de caché limpiadas al invalidar:
 *   L1 · Memoria       (Map en sesión)
 *   L2 · IndexedDB     (persistente entre sesiones)
 *   L3 · localStorage  (altorra-db-cache de database.js)
 *   (L4 Service Worker se limpia solo al detectar nueva versión del SW)
 *
 * API pública:
 *   window.AltorraCache.get(key)
 *   window.AltorraCache.set(key, value)
 *   window.AltorraCache.invalidate()
 *   window.AltorraCache.clearAndReload()
 *   window.AltorraCache.markFresh()
 */

(function () {
    'use strict';

    /* ─── Configuración ─────────────────────────────────────────── */
    const APP_VERSION = '20260316221812';
    const DB_NAME           = 'altorra-cache';
    const DB_VERSION        = 2;
    const STORE_DATA        = 'app-data';
    const STORE_META        = 'cache-meta';
    const VERSION_KEY       = 'altorra_app_version';
    const DEPLOY_KEY        = 'altorra_deploy_version';
    const DB_CACHE_KEY      = 'altorra-db-cache';   // clave que usa database.js
    const META_DOC_PATH     = 'system/meta';
    const DEPLOY_INFO_PATH  = '/data/deploy-info.json';
    // Período de gracia: evita bucle infinito si el SW activa y envía SW_UPDATED
    // justo después de que clearAndReload() reinstala el SW en la misma sesión.
    const UPDATE_GRACE_KEY  = 'altorra_update_grace';
    const UPDATE_GRACE_MS   = 30_000; // 30 segundos

    /* ─── L1: Memory cache ──────────────────────────────────────── */
    const memoryCache = new Map();

    /* ─── L2: IndexedDB ─────────────────────────────────────────── */
    let _db = null;

    function openDB() {
        if (_db) return Promise.resolve(_db);
        return new Promise((resolve, reject) => {
            const req = indexedDB.open(DB_NAME, DB_VERSION);
            req.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains(STORE_DATA)) {
                    db.createObjectStore(STORE_DATA, { keyPath: 'key' });
                }
                if (!db.objectStoreNames.contains(STORE_META)) {
                    db.createObjectStore(STORE_META, { keyPath: 'key' });
                }
            };
            req.onsuccess  = (e) => { _db = e.target.result; resolve(_db); };
            req.onerror    = (e) => reject(e.target.error);
        });
    }

    async function idbGet(store, key) {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx  = db.transaction(store, 'readonly');
            const req = tx.objectStore(store).get(key);
            req.onsuccess = () => resolve(req.result ? req.result.value : undefined);
            req.onerror   = () => reject(req.error);
        });
    }

    async function idbSet(store, key, value) {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx  = db.transaction(store, 'readwrite');
            const req = tx.objectStore(store).put({ key, value });
            req.onsuccess = () => resolve();
            req.onerror   = () => reject(req.error);
        });
    }

    async function idbClear() {
        const db = await openDB();
        return new Promise((resolve) => {
            const tx = db.transaction([STORE_DATA, STORE_META], 'readwrite');
            tx.objectStore(STORE_DATA).clear();
            tx.objectStore(STORE_META).clear();
            tx.oncomplete = resolve;
        });
    }

    /* ─── Helpers ────────────────────────────────────────────────── */
    function parseTimestamp(ts) {
        if (!ts) return null;
        if (typeof ts.toMillis === 'function') return ts.toMillis();
        return Number(ts);
    }

    /* ─── Modal de actualización — centrado en pantalla ─────────── */
    let _modalShown = false;

    function showUpdateBanner() {
        if (_modalShown) return;
        _modalShown = true;

        if (!document.getElementById('altorra-update-styles')) {
            const style = document.createElement('style');
            style.id = 'altorra-update-styles';
            style.textContent = `
                #altorra-update-banner {
                    position: fixed;
                    inset: 0;
                    z-index: 99999;
                    background: rgba(0,0,0,0.72);
                    backdrop-filter: blur(6px);
                    -webkit-backdrop-filter: blur(6px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                    opacity: 0;
                    transition: opacity 0.35s ease;
                    font-family: inherit;
                }
                #altorra-update-banner.aub-visible {
                    opacity: 1;
                }
                .aub-card {
                    background: linear-gradient(160deg, #0f0c00 0%, #1c1600 55%, #0a0800 100%);
                    border: 1px solid rgba(212,175,55,0.3);
                    border-top: 2px solid #d4af37;
                    border-radius: 14px;
                    box-shadow: 0 32px 100px rgba(0,0,0,0.85), 0 0 0 1px rgba(212,175,55,0.07);
                    padding: 40px 44px 36px;
                    max-width: 420px;
                    width: 100%;
                    text-align: center;
                    transform: translateY(24px) scale(0.96);
                    transition: transform 0.42s cubic-bezier(0.16,1,0.3,1);
                }
                #altorra-update-banner.aub-visible .aub-card {
                    transform: translateY(0) scale(1);
                }
                .aub-brand {
                    font-size: 1.5rem;
                    font-weight: 700;
                    letter-spacing: 0.14em;
                    background: linear-gradient(115deg, #c9a227 0%, #f5df80 50%, #d4af37 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    line-height: 1;
                }
                .aub-brand-sub {
                    display: block;
                    font-size: 0.48rem;
                    letter-spacing: 0.6em;
                    text-indent: 0.6em;
                    text-transform: uppercase;
                    color: rgba(212,175,55,0.38);
                    margin-top: 3px;
                }
                .aub-rule {
                    width: 50px;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(212,175,55,0.55), transparent);
                    margin: 14px auto 20px;
                }
                .aub-icon {
                    font-size: 2.2rem;
                    display: block;
                    margin-bottom: 10px;
                    line-height: 1;
                }
                .aub-title {
                    font-size: 1rem;
                    font-weight: 700;
                    color: #d4af37;
                    margin: 0 0 8px;
                    line-height: 1.3;
                }
                .aub-desc {
                    font-size: 0.81rem;
                    color: rgba(255,255,255,0.42);
                    line-height: 1.6;
                    margin: 0 0 28px;
                }
                .aub-btn {
                    display: block;
                    width: 100%;
                    padding: 14px 24px;
                    background: linear-gradient(135deg, #d4af37 0%, #b89658 100%);
                    color: #0a0800;
                    border: none;
                    border-radius: 8px;
                    font-weight: 700;
                    font-size: 0.8rem;
                    letter-spacing: 1.6px;
                    text-transform: uppercase;
                    cursor: pointer;
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                    font-family: inherit;
                }
                .aub-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 28px rgba(212,175,55,0.4);
                }
                .aub-btn:active  { transform: translateY(0); }
                .aub-btn:disabled {
                    opacity: 0.65;
                    cursor: not-allowed;
                    transform: none;
                }
                @media (max-width: 480px) {
                    .aub-card { padding: 30px 24px 28px; }
                }
            `;
            document.head.appendChild(style);
        }

        const overlay = document.createElement('div');
        overlay.id = 'altorra-update-banner';
        overlay.setAttribute('role', 'alertdialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-labelledby', 'aub-title');
        overlay.innerHTML = `
            <div class="aub-card">
                <div class="aub-brand">ALTORRA<span class="aub-brand-sub">CARS</span></div>
                <div class="aub-rule"></div>
                <span class="aub-icon" aria-hidden="true">⚡</span>
                <p class="aub-title" id="aub-title">Nueva versión disponible</p>
                <p class="aub-desc">Hay actualizaciones con nuevos vehículos o cambios recientes. Actualiza para ver el catálogo más reciente.</p>
                <button class="aub-btn" id="aub-reload-btn">Actualizar ahora</button>
            </div>
        `;
        document.body.appendChild(overlay);

        requestAnimationFrame(() => requestAnimationFrame(() => overlay.classList.add('aub-visible')));

        document.getElementById('aub-reload-btn').addEventListener('click', function () {
            this.textContent = 'Actualizando…';
            this.disabled = true;
            AltorraCache.clearAndReload();
        });
    }

    /* ─── Polling periódico mientras el tab está abierto ─────────── */
    function startPolling() {
        const INTERVAL = 45 * 1000; // 45 segundos
        setInterval(async function () {
            const remoteVer = await fetchDeployVersion();
            if (!remoteVer) return;
            const localVer = localStorage.getItem(DEPLOY_KEY);
            if (localVer && remoteVer !== localVer) {
                console.info('[AltorraCache] Polling: nuevo deploy detectado →', remoteVer);
                await AltorraCache.invalidate();
                localStorage.setItem(DEPLOY_KEY, remoteVer);
                showUpdateBanner();
            }
        }, INTERVAL);
    }

    /* ─── Fuente 1: Firestore system/meta ───────────────────────── */
    async function fetchFirestoreLastModified() {
        try {
            const db = window.db;
            if (!db) return null;
            const snap = await db.doc(META_DOC_PATH).get();
            if (!snap.exists) return null;
            return parseTimestamp(snap.data().lastModified);
        } catch (_) {
            return null;
        }
    }

    /**
     * Suscripción en tiempo real a system/meta.
     * Cuando el admin guarda algo, este listener notifica a todos los tabs abiertos.
     * El primer snapshot solo establece la línea base; los siguientes son cambios reales.
     */
    function startMetaListener(db) {
        let firstSnapshot = true;

        db.doc(META_DOC_PATH).onSnapshot(function(snap) {
            if (!snap.exists) { firstSnapshot = false; return; }

            const remote = parseTimestamp(snap.data().lastModified);

            if (firstSnapshot) {
                firstSnapshot = false;
                // Solo guardar línea base, no invalidar
                if (remote) idbSet(STORE_META, 'lastModified', remote).catch(function(){});
                return;
            }

            // Cambio real mientras el tab estaba abierto → limpiar caché
            AltorraCache.invalidate().then(function() {
                console.info('[AltorraCache] Cambio del admin detectado en tiempo real → caché limpiada');
                // database.js tiene sus propios real-time listeners que ya actualizan la UI.
                // Solo necesitamos que el localStorage quede limpio para próximas cargas.
            }).catch(function(){});

        }, function() { /* sin red o sin permisos — silencioso */ });
    }

    /* ─── Fuente 2: deploy-info.json (GitHub deploys) ───────────── */
    async function fetchDeployVersion() {
        try {
            const resp = await fetch(DEPLOY_INFO_PATH + '?_=' + Date.now(), {
                cache: 'no-store',
                signal: AbortSignal.timeout ? AbortSignal.timeout(5000) : undefined
            });
            if (!resp.ok) return null;
            const info = await resp.json();
            return info.version || null;
        } catch (_) {
            return null;
        }
    }

    /* ─── API pública ────────────────────────────────────────────── */
    const AltorraCache = {

        async get(key) {
            if (memoryCache.has(key)) return memoryCache.get(key);
            const val = await idbGet(STORE_DATA, key);
            if (val !== undefined) memoryCache.set(key, val);
            return val;
        },

        async set(key, value) {
            memoryCache.set(key, value);
            await idbSet(STORE_DATA, key, value);
        },

        /**
         * Limpia L1 (memoria) + L2 (IndexedDB) + L3 (localStorage de database.js).
         * El Service Worker no se toca aquí — se actualiza por su propio ciclo de vida.
         */
        async invalidate() {
            memoryCache.clear();
            localStorage.removeItem(DB_CACHE_KEY); // caché de database.js
            await idbClear();
            console.info('[AltorraCache] Caché L1/L2/L3 limpiada');
        },

        /**
         * Comprueba Firestore al cargar la página.
         * Si lastModified difiere del almacenado → invalida para que database.js
         * recargue desde Firestore en la próxima llamada a load().
         * @returns {Promise<boolean>} true = vigente, false = invalidado
         */
        async validateWithFirestore() {
            try {
                const remoteMeta = await fetchFirestoreLastModified();
                if (remoteMeta === null) return true; // sin red → conservar

                const localMeta = await idbGet(STORE_META, 'lastModified');

                if (localMeta === remoteMeta) return true; // vigente ✓

                // Datos cambiaron desde el último acceso
                await this.invalidate();
                await idbSet(STORE_META, 'lastModified', remoteMeta);
                console.info('[AltorraCache] Cambio del admin detectado en carga → caché limpiada');
                return false;

            } catch (err) {
                console.warn('[AltorraCache] validateWithFirestore error:', err);
                return true;
            }
        },

        /**
         * Verifica si hay un nuevo deploy de GitHub comparando deploy-info.json.
         * Si detecta versión nueva → limpia caché y muestra banner al usuario.
         * @returns {Promise<boolean>} true = mismo deploy, false = deploy nuevo detectado
         */
        async validateDeployVersion() {
            const remoteVer = await fetchDeployVersion();
            if (!remoteVer) return true; // sin red o archivo no existe → conservar

            const localVer = localStorage.getItem(DEPLOY_KEY);
            if (!localVer) {
                // Primera visita: solo guardar versión base, sin banner
                localStorage.setItem(DEPLOY_KEY, remoteVer);
                return true;
            }

            if (localVer === remoteVer) return true; // mismo deploy ✓

            // Nuevo deploy detectado → informar al usuario
            console.info('[AltorraCache] Nuevo deploy de GitHub:', remoteVer, '(antes:', localVer + ')');
            await this.invalidate();
            localStorage.setItem(DEPLOY_KEY, remoteVer);
            showUpdateBanner();
            return false;
        },

        /**
         * Marca el caché como fresco tras una carga exitosa desde Firestore.
         * Llamar desde database.js después de loadFromFirestore().
         */
        async markFresh(timestamp) {
            const ts = timestamp != null ? timestamp : Date.now();
            await idbSet(STORE_META, 'lastModified', ts);
        },

        /** Limpia todo y recarga la página. */
        async clearAndReload() {
            console.info('[AltorraCache] Limpieza total solicitada');

            // Marcar período de gracia ANTES de cualquier otra operación.
            localStorage.setItem(UPDATE_GRACE_KEY, Date.now().toString());

            await this.invalidate();
            sessionStorage.clear();

            // Si hay un SW esperando (installed pero no activated), activarlo ya.
            if ('serviceWorker' in navigator) {
                const reg = await navigator.serviceWorker.getRegistration();
                if (reg?.waiting) {
                    reg.waiting.postMessage({ type: 'SKIP_WAITING' });
                }
            }

            // Vaciar todos los cachés del Service Worker SIN desregistrarlo.
            // El SW sigue activo e intercepta todas las peticiones en el reload.
            // Sus estrategias de fetch usan cache: 'no-cache' / 'no-store',
            // así que con los cachés SW vacíos, TODA petición va directo al
            // servidor → resultado equivalente a Ctrl+Shift+R.
            if ('caches' in window) {
                const names = await caches.keys();
                await Promise.all(names.map(n => caches.delete(n)));
                console.info('[AltorraCache] SW caches vaciados:', names.length);
            }

            window.location.reload();
        }
    };

    /* ─── Service Worker Manager ─────────────────────────────────── */
    const SWManager = {

        register() {
            if (!('serviceWorker' in navigator)) return;
            navigator.serviceWorker.register('/service-worker.js')
                .then((reg) => {
                    // Revisar actualizaciones cada 5 minutos
                    setInterval(() => reg.update(), 5 * 60 * 1000);
                    reg.addEventListener('updatefound', () => {
                        const sw = reg.installing;
                        sw.addEventListener('statechange', () => {
                            if (sw.state === 'installed' && navigator.serviceWorker.controller) {
                                console.info('[SW] Nueva versión disponible');
                                this.notifyUpdate();
                            }
                        });
                    });
                })
                .catch(err => console.warn('[SW] Registro fallido:', err));
        },

        notifyUpdate() {
            // Reemplaza el toast + auto-reload por el banner interactivo
            showUpdateBanner();
        },

        setupListeners() {
            if (!('serviceWorker' in navigator)) return;

            // Guardar si ya había un SW activo antes de cualquier cambio.
            // Si no había controller previo es primera instalación → no notificar.
            const hadController = !!navigator.serviceWorker.controller;

            navigator.serviceWorker.addEventListener('message', (e) => {
                if (e.data?.type === 'SW_UPDATED') {
                    console.info('[SW] Actualizado a:', e.data.version);
                    this.notifyUpdate();
                }
            });

            // controllerchange: solo log. La notificación la maneja SW_UPDATED
            // (que ahora solo se emite en updates reales) y updatefound.
            // Eliminar el trigger de modal aquí evita una fuente de duplicados.
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                console.info('[SW] Controller cambiado (controller:', !!navigator.serviceWorker.controller, ')');
            });
        }
    };

    /* ─── Inicialización ─────────────────────────────────────────── */
    async function init() {
        // 0. Período de gracia post-clearAndReload
        //    Si acabamos de hacer clearAndReload() en los últimos 30 s, suprimir
        //    TODAS las señales de actualización para no entrar en bucle infinito.
        const graceSince = Number(localStorage.getItem(UPDATE_GRACE_KEY) || 0);
        if (graceSince && (Date.now() - graceSince) < UPDATE_GRACE_MS) {
            _modalShown = true; // bloquea cualquier llamada a showUpdateBanner()
            localStorage.removeItem(UPDATE_GRACE_KEY);
            console.info('[AltorraCache] Grace period activo — modal suprimido tras reload de actualización');
        }

        // 1. Detectar deploy nuevo de APP_VERSION (hardcoded cambia en PR manuale)
        const storedVersion = localStorage.getItem(VERSION_KEY);
        if (storedVersion && storedVersion !== APP_VERSION) {
            console.info('[AltorraCache] Nueva versión de app:', APP_VERSION);
            await AltorraCache.invalidate();
        }
        localStorage.setItem(VERSION_KEY, APP_VERSION);

        // 2. Registrar Service Worker
        SWManager.register();
        SWManager.setupListeners();

        // 3. Checks asíncronos no bloqueantes (en idle o con delay)
        const runChecks = async () => {
            // 3a. Detectar deploy de GitHub (deploy-info.json)
            await AltorraCache.validateDeployVersion();

            // 3b. Detectar cambios del admin (Firestore system/meta)
            //     Solo si Firebase ya está listo; si no, esperar hasta 6s
            const waitForFirebase = () => new Promise(resolve => {
                if (window.db) { resolve(true); return; }
                const check = setInterval(() => {
                    if (window.db) { clearInterval(check); resolve(true); }
                }, 200);
                setTimeout(() => { clearInterval(check); resolve(false); }, 6000);
            });

            const firebaseReady = await waitForFirebase();
            if (firebaseReady) {
                // Validación en carga (para cuando el tab estaba cerrado mientras admin guardaba)
                await AltorraCache.validateWithFirestore();
                // Listener en tiempo real (para cuando el tab está abierto)
                startMetaListener(window.db);
            }
        };

        if (typeof requestIdleCallback !== 'undefined') {
            requestIdleCallback(runChecks, { timeout: 8000 });
        } else {
            setTimeout(runChecks, 1000);
        }

        // Polling periódico: detectar nuevos deploys mientras el tab sigue abierto
        startPolling();
    }

    /* ─── Arranque ───────────────────────────────────────────────── */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    /* ─── Exponer API global ─────────────────────────────────────── */
    window.AltorraCache = AltorraCache;
    window.CacheManager = { clearAndReload: () => AltorraCache.clearAndReload() }; // alias legacy

})();
