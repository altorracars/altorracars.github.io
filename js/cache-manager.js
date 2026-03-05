/**
 * ALTORRA CARS — Smart Cache Manager v3.0
 * ==========================================
 * Sistema de caché con tres capas:
 *
 *   L1 · Memory       (en sesión, < 1ms, se pierde al cerrar pestaña)
 *   L2 · IndexedDB    (persistente entre sesiones, ~1–5ms)
 *   L3 · Firestore    (fuente de verdad en la nube, requiere red)
 *
 * Estrategia de invalidación inteligente:
 *   Al cargar la página se consulta el documento Firestore `system/meta`
 *   que contiene un campo `lastModified` (timestamp). Si coincide con el
 *   valor almacenado en IndexedDB, se sirven los datos locales sin hacer
 *   lecturas adicionales a Firestore → ahorra cuota y reduce latencia.
 *   Si difiere (el admin cambió algo), se descargan los datos frescos y
 *   se actualiza la caché local automáticamente.
 *
 * Expone globalmente:
 *   window.AltorraCache.get(key)
 *   window.AltorraCache.set(key, value)
 *   window.AltorraCache.invalidate()
 *   window.AltorraCache.clearAndReload()
 */

(function () {
    'use strict';

    /* ─── Configuración ─────────────────────────────────────────── */
    const APP_VERSION   = '3.0.0-20260305';
    const DB_NAME       = 'altorra-cache';
    const DB_VERSION    = 2;
    const STORE_DATA    = 'app-data';
    const STORE_META    = 'cache-meta';
    const VERSION_KEY   = 'altorra_app_version';
    const META_DOC_PATH = 'system/meta'; // Firestore: collection/docId

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

    /* ─── L3: Firestore meta check ──────────────────────────────── */
    /**
     * Devuelve el timestamp `lastModified` del documento system/meta en Firestore.
     * Si Firestore no está disponible, retorna null (se usa caché local sin validar).
     */
    async function fetchFirestoreLastModified() {
        try {
            if (typeof firebase === 'undefined' || !firebase.apps?.length) return null;

            const db = firebase.firestore
                ? firebase.firestore()
                : (window.firestoreDB || null);

            if (!db) return null;

            const snap = await db.doc(META_DOC_PATH).get();
            if (!snap.exists) return null;

            const data = snap.data();
            // Acepta Timestamp de Firestore o número/string
            const ts = data.lastModified;
            if (!ts) return null;

            return typeof ts.toMillis === 'function' ? ts.toMillis() : Number(ts);
        } catch (_) {
            return null;
        }
    }

    /* ─── API pública del caché de datos ─────────────────────────── */
    const AltorraCache = {

        /**
         * Lee un valor. Busca en orden: L1 → L2.
         * @param {string} key
         * @returns {Promise<any>}
         */
        async get(key) {
            if (memoryCache.has(key)) return memoryCache.get(key);

            const val = await idbGet(STORE_DATA, key);
            if (val !== undefined) memoryCache.set(key, val);
            return val;
        },

        /**
         * Guarda un valor en L1 + L2.
         * @param {string} key
         * @param {any}    value
         */
        async set(key, value) {
            memoryCache.set(key, value);
            await idbSet(STORE_DATA, key, value);
        },

        /**
         * Comprueba Firestore para ver si los datos locales siguen vigentes.
         * Si hay cambios, limpia L1 + L2 para que la app los recargue desde Firestore.
         * @returns {Promise<boolean>} true = caché válido, false = invalidado
         */
        async validateWithFirestore() {
            try {
                const remoteMeta = await fetchFirestoreLastModified();
                if (remoteMeta === null) return true; // sin red → conservar caché

                const localMeta = await idbGet(STORE_META, 'lastModified');

                if (localMeta === remoteMeta) {
                    return true; // caché vigente ✓
                }

                // El admin modificó datos → limpiar caché local
                await this.invalidate();
                await idbSet(STORE_META, 'lastModified', remoteMeta);
                console.info('[AltorraCache] Datos invalidados — se usará fuente Firestore');
                return false;

            } catch (err) {
                console.warn('[AltorraCache] validateWithFirestore error:', err);
                return true; // ante la duda conservar caché
            }
        },

        /**
         * Actualiza el timestamp local después de una carga fresca desde Firestore.
         * Debe llamarse desde database.js o similar cuando se completa un fetch.
         * @param {number} [timestamp] — si se omite, usa Date.now()
         */
        async markFresh(timestamp) {
            const ts = timestamp ?? Date.now();
            memoryCache.clear();
            await idbSet(STORE_META, 'lastModified', ts);
        },

        /** Borra L1 + L2 (no toca el Service Worker ni el Cache API). */
        async invalidate() {
            memoryCache.clear();
            await idbClear();
            console.info('[AltorraCache] Caché local limpiada');
        },

        /** Limpia todo y recarga la página. */
        async clearAndReload() {
            console.info('[AltorraCache] Limpieza total solicitada');

            await this.invalidate();
            sessionStorage.clear();

            // Cache API (Service Worker)
            if ('caches' in window) {
                const names = await caches.keys();
                await Promise.all(names.map(n => caches.delete(n)));
            }

            // Desregistrar SW
            if ('serviceWorker' in navigator) {
                const regs = await navigator.serviceWorker.getRegistrations();
                await Promise.all(regs.map(r => r.unregister()));
            }

            window.location.reload(true);
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
            if (typeof toast !== 'undefined' && toast.info) {
                toast.info(
                    'Hay una nueva versión disponible. La página se actualizará en breve.',
                    'Actualización disponible',
                    5000
                );
            }
            setTimeout(() => window.location.reload(true), 4000);
        },

        setupListeners() {
            if (!('serviceWorker' in navigator)) return;

            navigator.serviceWorker.addEventListener('message', (e) => {
                if (e.data?.type === 'SW_UPDATED') {
                    console.info('[SW] Actualizado a:', e.data.version);
                    this.notifyUpdate();
                }
                if (e.data?.type === 'CACHE_CLEARED') {
                    window.location.reload(true);
                }
            });

            navigator.serviceWorker.addEventListener('controllerchange', () => {
                window.location.reload(true);
            });
        }
    };

    /* ─── Inicialización ─────────────────────────────────────────── */
    async function init() {
        // 1. Verificar versión de la app (deploy nuevo → limpiar caché)
        const storedVersion = localStorage.getItem(VERSION_KEY);
        if (storedVersion && storedVersion !== APP_VERSION) {
            console.info('[AltorraCache] Deploy detectado:', APP_VERSION);
            await AltorraCache.invalidate();
        }
        localStorage.setItem(VERSION_KEY, APP_VERSION);

        // 2. Registrar y configurar Service Worker
        SWManager.register();
        SWManager.setupListeners();

        // 3. Validar caché contra Firestore en background
        //    (no bloqueante — la app ya cargó, esto corre detrás)
        requestIdleCallback
            ? requestIdleCallback(() => AltorraCache.validateWithFirestore(), { timeout: 8000 })
            : setTimeout(() => AltorraCache.validateWithFirestore(), 3000);
    }

    /* ─── Arranque ───────────────────────────────────────────────── */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    /* ─── Exponer API global ─────────────────────────────────────── */
    window.AltorraCache  = AltorraCache;
    // Alias legacy para compatibilidad con código existente
    window.CacheManager  = { clearAndReload: () => AltorraCache.clearAndReload() };

})();
