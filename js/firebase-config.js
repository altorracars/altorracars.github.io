// Firebase Configuration for ALTORRA CARS
// Loads Firebase SDK from CDN and initializes the app

(function() {
    'use strict';

    const FIREBASE_VERSION = '11.3.0';
    const CDN_BASE = 'https://www.gstatic.com/firebasejs/' + FIREBASE_VERSION;

    const FIREBASE_CONFIG = {
        apiKey: "AIzaSyD9MJrON70mPqZxQqhndgQHNkTZUnnaQIs",
        authDomain: "altorra-cars.firebaseapp.com",
        databaseURL: "https://altorra-cars-default-rtdb.firebaseio.com",
        projectId: "altorra-cars",
        storageBucket: "altorra-cars.firebasestorage.app",
        messagingSenderId: "235148219730",
        appId: "1:235148219730:web:ceabdbc52fdcbe8b85168b",
        measurementId: "G-ZGZ6CVTB73"
    };

    // ── Google Identity Services (GIS) — Modern OAuth flow ──────────
    // Where to find the OAuth Client ID:
    //   1. Firebase Console → Project Settings → General →
    //      "Your apps" → Web app → SDK setup and configuration
    //   2. OR: Google Cloud Console → APIs & Services → Credentials →
    //      "Web client (auto created by Google Service)" → Client ID
    //   3. Format: XXXXXXXXX-XXXXXXXXXXXX.apps.googleusercontent.com
    //
    // Required setup in Google Cloud Console → Credentials → OAuth 2.0
    //   "Web client (auto created by Google Service)":
    //   - Authorized JavaScript origins MUST include:
    //     https://altorracars.github.io
    //     http://localhost (only for local testing — remove for prod)
    //
    // If GOOGLE_OAUTH_CLIENT_ID is left empty (placeholder), the code
    // automatically falls back to the legacy `signInWithPopup` flow —
    // login still works, just with COOP warnings in console.
    //
    // When configured, GIS provides:
    //   - Zero COOP warnings (uses iframe + postMessage internally)
    //   - One Tap login on homepage (faster returning user UX)
    //   - Personalized button "Continue as Carlos" (when Google
    //     session is detected in browser)
    //
    // Fill in the actual ID below to enable the modern flow:
    window.GOOGLE_OAUTH_CLIENT_ID =
        '235148219730-5fcciqj9nvt0gmip3mi45vcpvpg3o8cs.apps.googleusercontent.com';

    // Helper: detect if the OAuth Client ID is still the placeholder
    // (i.e. user hasn't configured it yet — code will fall back).
    window.GIS_CONFIGURED = (function () {
        var id = window.GOOGLE_OAUTH_CLIENT_ID || '';
        return id.length > 0 && id.indexOf('XXXXXXXX') === -1;
    })();

    function loadScript(src) {
        return new Promise(function(resolve, reject) {
            var script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    // Load firebase-app first, then Auth + Firestore in parallel (critical path),
    // then defer Analytics, Storage, Functions (non-critical for login)
    window.firebaseReady = loadScript(CDN_BASE + '/firebase-app-compat.js')
        .then(function() {
            // Critical: Auth + Firestore needed for login
            return Promise.all([
                loadScript(CDN_BASE + '/firebase-auth-compat.js'),
                loadScript(CDN_BASE + '/firebase-firestore-compat.js')
            ]);
        })
        .then(function() {
            // §23 FASE 6 (Capa 3) — AISLAMIENTO TOTAL ADMIN ↔ WEB PÚBLICA
            // ───────────────────────────────────────────────────────────
            // Antes: una sola app Firebase con appName=[DEFAULT]. Como TODAS
            // las páginas del sitio cargaban este mismo firebase-config.js,
            // la sesión de Firebase Auth se compartía entre admin.html e
            // index.html. Resultado: si te logueabas en admin, automáticamente
            // aparecías logueado en la web pública (con la misma cuenta).
            // Era imposible estar simultáneamente como super_admin en
            // admin.html Y como cliente normal en otra tab.
            //
            // Solución: detectar el contexto (admin vs público) y usar
            // appName DIFERENTE. Firebase Auth genera storage keys distintas
            // por appName (`firebase:authUser:<apiKey>:<appName>`), por lo
            // que cada contexto tiene su propio IndexedDB de auth.
            //
            // Trade-off: usuarios actuales serán deslogueados UNA VEZ
            // tras este deploy (storage key cambió). Es esperado y aceptable.
            //
            // Caveat operacional: si alguien navega de admin.html → index.html
            // dentro del MISMO tab, ambas apps quedan instanciadas en memoria.
            // No es problema funcional — `window.auth` siempre apunta a la app
            // del contexto actual porque firebase-config.js solo se carga
            // UNA vez por page load.
            var isAdminPage = location.pathname.indexOf('admin.html') !== -1
                              || location.pathname.endsWith('/admin')
                              || location.pathname.endsWith('/admin/');
            var APP_NAME = isAdminPage ? 'altorra-admin' : 'altorra-public';

            var app;
            try {
                // Si la app ya existe (raro: HMR/dev tools), reusar
                app = firebase.app(APP_NAME);
            } catch (e) {
                app = firebase.initializeApp(FIREBASE_CONFIG, APP_NAME);
            }
            var db = firebase.firestore(app);
            var auth = firebase.auth(app);

            window.firebaseApp = app;
            window.firebaseAppName = APP_NAME;  // útil para debugging
            window.db = db;
            window.auth = auth;

            // Set language for SMS verification codes (Spanish)
            auth.useDeviceLanguage();

            // F0.2: Enable offline persistence — queues writes during network issues
            // Note: The deprecation warning about enableMultiTabIndexedDbPersistence()
            // is expected — the modern API (persistentLocalCache) requires the modular SDK.
            // The compat SDK only supports enablePersistence(). Safe to ignore until
            // a full migration to the modular SDK is done.
            db.enablePersistence({ synchronizeTabs: true }).catch(function(err) {
                if (err.code === 'failed-precondition') {
                    console.warn('[Firestore] Persistence disabled: multiple tabs open');
                } else if (err.code === 'unimplemented') {
                    console.warn('[Firestore] Persistence disabled: browser not supported');
                }
            });

            // Inicializar system/meta si no existe (necesario para el cache inteligente)
            db.doc('system/meta').get().then(function(snap) {
                if (!snap.exists) {
                    return db.doc('system/meta').set({
                        lastModified: Date.now(),
                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                        note: 'Auto-created by firebase-config.js — no borrar'
                    });
                }
            }).catch(function() {
                // Silencioso: si falla (sin permisos) no interrumpe nada
            });

            // Defer non-critical SDKs (load in background after login is ready)
            // §23 — todos pasan `app` explícitamente para que apunten a la
            // app namespaced (altorra-admin o altorra-public), no a [DEFAULT]
            Promise.all([
                loadScript(CDN_BASE + '/firebase-storage-compat.js'),
                loadScript(CDN_BASE + '/firebase-functions-compat.js'),
                loadScript(CDN_BASE + '/firebase-analytics-compat.js'),
                loadScript(CDN_BASE + '/firebase-database-compat.js')
            ]).then(function() {
                window.storage = firebase.storage(app);
                window.functions = firebase.functions(app);
                // Analytics: solo se inicializa para la default app por
                // limitación del SDK Compat. Para evitar errores cuando
                // app !== default, lo intentamos pero no fallamos si no.
                try { window.firebaseAnalytics = firebase.analytics(app); }
                catch (e) { window.firebaseAnalytics = null; }
                window.rtdb = firebase.database(app);
                console.log('Firebase deferred SDKs loaded (' + APP_NAME + ')');
            }).catch(function(err) {
                console.warn('Deferred Firebase SDKs failed:', err);
            });

            // Troubleshooting: clear stale offline writes from IndexedDB
            window.clearFirestoreCache = function() {
                console.info('[Cache] Terminating Firestore (' + APP_NAME + ') and clearing persistence...');
                firebase.firestore(app).terminate().then(function() {
                    return firebase.firestore(app).clearPersistence();
                }).then(function() {
                    console.info('[Cache] Persistence cleared. Reloading...');
                    window.location.reload();
                }).catch(function(err) {
                    console.error('[Cache] Error clearing persistence:', err);
                });
            };

            console.log('Firebase core ready (Auth + Firestore) [' + APP_NAME + ']');
            return { app: app, db: db, auth: auth };
        })
        .catch(function(error) {
            console.warn('Firebase could not be loaded:', error);
        });
})();
