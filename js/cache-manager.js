// Cache Manager for ALTORRA CARS
// Handles service worker updates and cache invalidation
// Version 1.0.0

(function() {
    'use strict';

    const CacheManager = {
        // Current app version - update this on each deploy
        APP_VERSION: '2.0.1-20260211',

        // Storage key for version tracking
        VERSION_KEY: 'altorra_app_version',

        init() {
            this.checkForUpdates();
            this.registerServiceWorker();
            this.setupUpdateListener();
        },

        // Check if app version changed
        checkForUpdates() {
            const storedVersion = localStorage.getItem(this.VERSION_KEY);

            if (storedVersion && storedVersion !== this.APP_VERSION) {
                console.log('[CacheManager] New version detected:', this.APP_VERSION);
                this.clearAllCaches();
            }

            localStorage.setItem(this.VERSION_KEY, this.APP_VERSION);
        },

        // Register service worker with update handling
        registerServiceWorker() {
            if (!('serviceWorker' in navigator)) {
                console.log('[CacheManager] Service Worker not supported');
                return;
            }

            navigator.serviceWorker.register('/service-worker.js')
                .then((registration) => {
                    console.log('[CacheManager] SW registered:', registration.scope);

                    // Check for updates every 5 minutes
                    setInterval(() => {
                        registration.update();
                    }, 5 * 60 * 1000);

                    // Handle update found
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        console.log('[CacheManager] New SW installing...');

                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                // New version available
                                console.log('[CacheManager] New version available');
                                this.showUpdateNotification();
                            }
                        });
                    });
                })
                .catch((error) => {
                    console.error('[CacheManager] SW registration failed:', error);
                });
        },

        // Listen for messages from service worker
        setupUpdateListener() {
            if (!('serviceWorker' in navigator)) return;

            navigator.serviceWorker.addEventListener('message', (event) => {
                if (event.data?.type === 'SW_UPDATED') {
                    console.log('[CacheManager] SW updated to:', event.data.version);
                    this.showUpdateNotification();
                }

                if (event.data?.type === 'CACHE_CLEARED') {
                    console.log('[CacheManager] Cache cleared, reloading...');
                    window.location.reload(true);
                }
            });

            // Handle controller change (new SW took over)
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                console.log('[CacheManager] Controller changed, reloading...');
                window.location.reload(true);
            });
        },

        // Show update notification
        showUpdateNotification() {
            // Check if toast system is available
            if (typeof toast !== 'undefined' && toast.info) {
                toast.info(
                    'Hay una nueva version disponible. La pagina se actualizara automaticamente.',
                    'Actualizacion disponible',
                    8000
                );
            }

            // Auto-refresh after short delay
            setTimeout(() => {
                this.forceRefresh();
            }, 3000);
        },

        // Clear all caches and reload
        async clearAllCaches() {
            console.log('[CacheManager] Clearing all caches...');

            // Clear Cache API
            if ('caches' in window) {
                const cacheNames = await caches.keys();
                await Promise.all(
                    cacheNames.map((cacheName) => {
                        console.log('[CacheManager] Deleting cache:', cacheName);
                        return caches.delete(cacheName);
                    })
                );
            }

            // Clear session storage
            sessionStorage.clear();

            // Tell service worker to clear its cache
            if (navigator.serviceWorker?.controller) {
                navigator.serviceWorker.controller.postMessage({
                    type: 'CLEAR_CACHE'
                });
            }

            console.log('[CacheManager] All caches cleared');
        },

        // Force refresh the page
        forceRefresh() {
            // Clear local caches first
            this.clearAllCaches().then(() => {
                // Force reload from server
                window.location.reload(true);
            });
        },

        // Manual cache clear function (can be called from console)
        clearAndReload() {
            console.log('[CacheManager] Manual cache clear requested');
            this.clearAllCaches().then(() => {
                // Unregister service worker
                navigator.serviceWorker?.getRegistrations().then((registrations) => {
                    registrations.forEach((registration) => {
                        registration.unregister();
                    });
                });

                // Force reload
                setTimeout(() => {
                    window.location.reload(true);
                }, 500);
            });
        }
    };

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => CacheManager.init());
    } else {
        CacheManager.init();
    }

    // Expose for debugging
    window.CacheManager = CacheManager;

})();
