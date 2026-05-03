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
            var app = firebase.initializeApp(FIREBASE_CONFIG);
            var db = firebase.firestore();
            var auth = firebase.auth();

            window.firebaseApp = app;
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
            Promise.all([
                loadScript(CDN_BASE + '/firebase-storage-compat.js'),
                loadScript(CDN_BASE + '/firebase-functions-compat.js'),
                loadScript(CDN_BASE + '/firebase-analytics-compat.js'),
                loadScript(CDN_BASE + '/firebase-database-compat.js')
            ]).then(function() {
                window.storage = firebase.storage();
                window.functions = firebase.functions();
                window.firebaseAnalytics = firebase.analytics();
                window.rtdb = firebase.database();
                console.log('Firebase deferred SDKs loaded (Storage, Functions, Analytics, RTDB)');
            }).catch(function(err) {
                console.warn('Deferred Firebase SDKs failed:', err);
            });

            // Troubleshooting: clear stale offline writes from IndexedDB
            // Call window.clearFirestoreCache() from browser console if permission errors persist
            window.clearFirestoreCache = function() {
                console.info('[Cache] Terminating Firestore and clearing persistence...');
                firebase.firestore().terminate().then(function() {
                    return firebase.firestore().clearPersistence();
                }).then(function() {
                    console.info('[Cache] Persistence cleared. Reloading...');
                    window.location.reload();
                }).catch(function(err) {
                    console.error('[Cache] Error clearing persistence:', err);
                    // Fallback: delete IndexedDB directly
                    var dbNames = ['firestore/[DEFAULT]/altorra-cars/main'];
                    dbNames.forEach(function(name) {
                        indexedDB.deleteDatabase(name);
                    });
                    console.info('[Cache] IndexedDB deleted. Reloading...');
                    window.location.reload();
                });
            };

            console.log('Firebase core ready (Auth + Firestore)');
            return { app: app, db: db, auth: auth };
        })
        .catch(function(error) {
            console.warn('Firebase could not be loaded:', error);
        });
})();
