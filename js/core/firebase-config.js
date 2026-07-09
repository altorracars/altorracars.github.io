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

    // ── Contexto de página (§23 FASE 6) ──────────────────────────────
    var isAdminPage = location.pathname.indexOf('admin.html') !== -1
                      || location.pathname.endsWith('/admin')
                      || location.pathname.endsWith('/admin/');
    // Home pública = único objetivo de la dieta de ruta crítica (§296 TODO-54).
    // Admin y el resto de páginas públicas conservan el timing INMEDIATO previo
    // (cero regresión: sus consumidores esperan `firebaseReady` ⇒ auth ya listo).
    var _p = location.pathname;
    var isHomePage = !isAdminPage &&
        (_p === '/' || _p === '' || _p === '/index.html' || _p.endsWith('/index.html'));

    // §PERF Fase 2.1b — Diferir fuera de la ruta crítica (SOLO home).
    // El home difiere lo NO crítico a la 1ª interacción del usuario O a idle
    // (lo que ocurra antes) → saca auth/iframe.js (~1.4s), reCAPTCHA (~1MB) y los
    // SDKs pesados de la ventana de contención de red del LCP. Fuera del home
    // (admin/otras) corre inmediato. Devuelve el "kicker" idempotente (para que
    // la interacción del usuario fuerce la carga antes de idle).
    function runDeferred(fn, timeout) {
        if (!isHomePage) { fn(); return null; }
        var done = false;
        function once() { if (done) return; done = true; fn(); }
        if ('requestIdleCallback' in window) {
            requestIdleCallback(once, { timeout: timeout || 3000 });
        } else {
            setTimeout(once, Math.min(timeout || 3000, 2000));
        }
        return once;
    }

    // Promesa "solo Firestore lista" (RUTA CRÍTICA de render). El home
    // (database.js) la espera para pintar vehículos/marcas SIN quedar detrás
    // de la carga diferida de auth. `window.firebaseReady` sigue resolviendo
    // tras AUTH (contrato de compat: auth.js/admin esperan `window.auth`).
    var _resolveDbReady, _resolveAuthChain;
    window.dbReady = new Promise(function(res){ _resolveDbReady = res; });
    var _authChain = new Promise(function(res){ _resolveAuthChain = res; });

    // ── Carga (diferida en home) de Auth ─────────────────────────────
    // auth/iframe.js (cuello #1: 1425ms móvil) lo dispara la init de Auth + la
    // suscripción onAuthStateChanged (auth.js:startAuthListener). Diferir la
    // carga del SDK lo saca de la ruta crítica. El header NO parpadea: index.html
    // aplica la clase auth-* síncrona desde localStorage (hint optimista, §auth).
    function loadAuth(app, APP_NAME) {
        return loadScript(CDN_BASE + '/firebase-auth-compat.js')
            .then(function () {
                var auth = firebase.auth(app);
                window.auth = auth;
                // Idioma del dispositivo para códigos SMS de verificación (español)
                auth.useDeviceLanguage();
                console.log('Firebase auth ready [' + APP_NAME + ']');
                _resolveAuthChain({ auth: auth });
                return auth;
            })
            .catch(function (e) {
                console.warn('[Auth] no se pudo cargar:', e);
                _resolveAuthChain({ auth: null }); // no bloquear firebaseReady
            });
    }

    // ── Carga (diferida en home) de SDKs no-críticos ─────────────────
    // §23 — pasan `app` explícito → apuntan a la app namespaced (altorra-admin
    // o altorra-public), no a [DEFAULT]. Ningún consumidor del home los necesita
    // en el primer render (bot dormido + guards null); admin los carga inmediato.
    function loadDeferredSDKs(app, APP_NAME) {
        Promise.all([
            loadScript(CDN_BASE + '/firebase-storage-compat.js'),
            loadScript(CDN_BASE + '/firebase-functions-compat.js'),
            loadScript(CDN_BASE + '/firebase-analytics-compat.js'),
            loadScript(CDN_BASE + '/firebase-database-compat.js')
        ]).then(function() {
            window.storage = firebase.storage(app);
            window.functions = firebase.functions(app);
            // Analytics: solo se inicializa para la default app por limitación del
            // SDK Compat. Para evitar errores cuando app !== default, lo intentamos
            // pero no fallamos si no.
            try { window.firebaseAnalytics = firebase.analytics(app); }
            catch (e) { window.firebaseAnalytics = null; }
            window.rtdb = firebase.database(app);
            console.log('Firebase deferred SDKs loaded (' + APP_NAME + ')');
        }).catch(function(err) {
            console.warn('Deferred Firebase SDKs failed:', err);
        });
    }

    // ── App Check (SEC-02, ADR §169) — MODO MONITOR, diferido (§PERF 2.1a) ──
    // reCAPTCHA v3 pesa ~1MB + ~500ms de hilo; App Check está en MONITOR
    // (unenforced → Firestore/Storage funcionan sin token). En home se difiere.
    function loadAppCheck(app) {
        loadScript(CDN_BASE + '/firebase-app-check-compat.js').then(function () {
            try {
                if (firebase.appCheck) {
                    firebase.appCheck(app).activate('6Lfz8BQtAAAAAILjn8GbHFT8u6dpg5rFvg5hGZzS', true);
                }
            } catch (e) { console.warn('[AppCheck] no activado:', e); }
        }).catch(function () { /* App Check no crítico (monitor) */ });
    }

    // Load firebase-app + Firestore (RUTA CRÍTICA: db para el render del home).
    // Auth + App Check + storage/functions/analytics/rtdb se DIFIEREN en el home
    // (§PERF Fase 2.1a/2.1b). Fuera del home cargan inmediato (cero regresión).
    window.firebaseReady = loadScript(CDN_BASE + '/firebase-app-compat.js')
        .then(function() {
            // Crítico: solo Firestore es necesario para el primer render.
            return loadScript(CDN_BASE + '/firebase-firestore-compat.js');
        })
        .then(function() {
            // §23 FASE 6 (Capa 3) — AISLAMIENTO TOTAL ADMIN ↔ WEB PÚBLICA.
            // ───────────────────────────────────────────────────────────
            // appName distinto por contexto: Firebase Auth genera storage keys
            // separadas (`firebase:authUser:<apiKey>:<appName>`), por lo que
            // admin.html e index.html NO comparten sesión (antes: loguearte en
            // admin te logueaba en la web pública). Trade-off: deslogueo único
            // tras el deploy que introdujo esto (storage key cambió).
            var APP_NAME = isAdminPage ? 'altorra-admin' : 'altorra-public';

            var app;
            try {
                // Si la app ya existe (raro: HMR/dev tools), reusar
                app = firebase.app(APP_NAME);
            } catch (e) {
                app = firebase.initializeApp(FIREBASE_CONFIG, APP_NAME);
            }

            // §25.12 — DUAL-APP STRATEGY (default + namespaced)
            // ──────────────────────────────────────────────────────────
            // El SDK Compat v11 tiene paths internos (RecaptchaVerifier,
            // signInWithPhoneNumber, firebase.messaging…) que IGNORAN el `app`
            // pasado y caen a `firebase.app()` (default). Sin default app
            // inicializada crashean con `[DEFAULT] has been created`. Solución:
            // inicializar TAMBIÉN la default con la misma config. NO afecta el
            // aislamiento de auth (storage keys por appName). window.auth apunta
            // al namespaced; la default solo existe para que internals no fallen.
            try {
                firebase.app('[DEFAULT]');
            } catch (e) {
                firebase.initializeApp(FIREBASE_CONFIG);
            }

            var db = firebase.firestore(app);

            window.firebaseApp = app;
            window.firebaseAppName = APP_NAME;  // útil para debugging
            window.db = db;

            // F0.2: Enable offline persistence — queues writes during network issues.
            // La deprecation warning de enableMultiTabIndexedDbPersistence() es
            // esperada — el API moderno (persistentLocalCache) requiere el SDK
            // modular; el compat solo soporta enablePersistence(). Safe ignore.
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

            // db lista → desbloquea el render del home YA (sin esperar auth).
            _resolveDbReady({ app: app, db: db });
            console.log('Firebase core ready (Firestore) [' + APP_NAME + ']');

            // ── Cargar lo NO crítico ─────────────────────────────────────
            // Home: diferido (idle/interacción). Admin + resto: inmediato.
            runDeferred(function(){ loadDeferredSDKs(app, APP_NAME); }, 4000);
            runDeferred(function(){ loadAppCheck(app); }, 4000);

            // Auth: en el home, además de idle, la 1ª interacción del usuario la
            // fuerza (login/lead snappy — protege la ruta del dinero).
            var authKick = runDeferred(function(){ loadAuth(app, APP_NAME); }, 2500);
            if (isHomePage && authKick) {
                ['pointerdown', 'keydown', 'touchstart'].forEach(function(ev) {
                    window.addEventListener(ev, function fire() {
                        window.removeEventListener(ev, fire, true);
                        authKick();
                    }, { capture: true, passive: true });
                });
            }

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

            // window.firebaseReady resuelve tras AUTH (contrato compat: auth.js y
            // admin esperan window.auth). En el home resuelve en idle/interacción;
            // fuera del home, inmediato.
            return _authChain.then(function() {
                return { app: app, db: db, auth: window.auth || null };
            });
        })
        .catch(function(error) {
            console.warn('Firebase could not be loaded:', error);
        });
})();
