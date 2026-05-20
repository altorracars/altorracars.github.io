/**
 * AltorraAdminFCM — Web Push Notifications para asesores
 *
 * §23 FASE 4 del Mega-Plan ACD Enterprise.
 *
 * Cuando un editor o super_admin entra al panel admin:
 *   1. Verifica si el navegador soporta Notification API + Service Worker
 *   2. Si Notification.permission === 'default', muestra prompt amigable
 *      "¿Querés recibir avisos cuando un cliente esté esperando?"
 *   3. Si acepta: requestPermission → getToken → guarda en
 *      usuarios/{uid}.fcmTokens[] (array — soporta múltiples devices)
 *   4. Cada token tiene: { token, deviceLabel, addedAt, lastUsedAt }
 *   5. Cuando una Cloud Function envía push, este token recibe la notificación
 *      vía firebase-messaging-sw.js (raíz del sitio)
 *
 * Auto-pruning: si la Cloud Function recibe error de token inválido,
 * lo remueve del array (lógica server-side en onChatEscalated).
 *
 * Setup operacional one-time (super_admin):
 *   1. Firebase Console → Project Settings → Cloud Messaging
 *   2. Web Push certificates → generar VAPID key pair
 *   3. Copiar la "Key pair" pública aquí en VAPID_PUBLIC_KEY
 *   4. Deploy → cada asesor verá el prompt al primer login post-deploy
 */
(function () {
    'use strict';
    if (window.AltorraAdminFCM) return;
    var AP = window.AP || {};

    // §23 FASE 4 — VAPID public key generada en Firebase Console
    // (Project Settings → Cloud Messaging → Web Push certificates).
    // Esta key es PÚBLICA — no es un secreto, identifica al servidor
    // emisor de las push notifications. La autoridad real es Firebase
    // Admin SDK del lado server (Cloud Function).
    var VAPID_PUBLIC_KEY = 'BDhFxNdH98lu9a1fHx0AyKzEhDkQ9-7Im7AHIpj6LiYpARA-XBUomOc5Q06LrJbedfX1qSkPzMp1KDgHYaJBhFU';

    var _initialized = false;
    var _currentToken = null;
    var _foregroundBound = false;

    /**
     * bindForegroundHandler — §98. Cuando llega un push y la pestaña del
     * admin está ABIERTA/visible, FCM NO dispara el SW background handler.
     * Llama a messaging.onMessage() en su lugar. Sin este handler, los
     * push en foreground se perdían (causa de "las notificaciones nunca
     * funcionan cuando estoy en el Hub"). Mostramos un toast in-app
     * (siempre visible) con CTA "Ver" que abre el ALTOR Hub.
     */
    function bindForegroundHandler(messaging) {
        if (_foregroundBound || !messaging || typeof messaging.onMessage !== 'function') return;
        _foregroundBound = true;
        try {
            messaging.onMessage(function (payload) {
                var n = (payload && payload.notification) || {};
                var d = (payload && payload.data) || {};
                var title = n.title || '🚨 Cliente esperando';
                var body = n.body || 'Hay un cliente en cola en el ALTOR Hub.';
                if (window.notify && window.notify.warning) {
                    window.notify.warning({
                        title: title,
                        message: body,
                        duration: 10000,
                        action: {
                            label: 'Ver',
                            onClick: function () {
                                if (window.AltorraSections && window.AltorraSections.go) {
                                    window.AltorraSections.go('concierge');
                                } else {
                                    window.location.hash = '#/concierge';
                                }
                            }
                        }
                    });
                }
            });
        } catch (e) {
            console.warn('[AdminFCM] onMessage handler error:', e && e.message);
            _foregroundBound = false;
        }
    }

    /**
     * detectDevice — etiqueta humana del dispositivo (útil para que el
     * asesor sepa "este es mi celular" vs "este es mi laptop" si quiere
     * revocar uno).
     */
    function detectDevice() {
        var ua = navigator.userAgent || '';
        var os = /iPhone|iPad/.test(ua) ? 'iOS'
               : /Android/.test(ua) ? 'Android'
               : /Mac/.test(ua) ? 'macOS'
               : /Windows/.test(ua) ? 'Windows'
               : /Linux/.test(ua) ? 'Linux'
               : 'desconocido';
        var browser = /Chrome|Chromium|Edg/.test(ua) ? 'Chrome'
                    : /Firefox/.test(ua) ? 'Firefox'
                    : /Safari/.test(ua) && !/Chrome/.test(ua) ? 'Safari'
                    : 'browser';
        return browser + ' · ' + os;
    }

    function isSupported() {
        return 'Notification' in window
            && 'serviceWorker' in navigator
            && window.firebase
            && window.firebase.messaging
            && window.firebase.messaging.isSupported
            && window.firebase.messaging.isSupported();
    }

    /**
     * registerSwAndGetToken — registra el firebase-messaging-sw.js,
     * pide permiso, obtiene el FCM token, y lo persiste en
     * usuarios/{uid}.fcmTokens[].
     */
    function registerSwAndGetToken() {
        if (!VAPID_PUBLIC_KEY) {
            console.info('[AdminFCM] VAPID_PUBLIC_KEY no configurada — skip');
            return Promise.resolve(null);
        }
        if (!isSupported()) {
            console.info('[AdminFCM] FCM no soportado en este navegador');
            return Promise.resolve(null);
        }
        if (Notification.permission === 'denied') {
            console.info('[AdminFCM] Permiso denegado por usuario (no preguntar de nuevo)');
            // §26.5 — UX claro al usuario denied: instrucciones para
            // reactivar desde el candado del navegador (browser-specific).
            if (window.notify && window.notify.warning) {
                var browser = /Chrome|Edg/.test(navigator.userAgent) ? 'Chrome/Edge'
                            : /Firefox/.test(navigator.userAgent) ? 'Firefox'
                            : /Safari/.test(navigator.userAgent) ? 'Safari'
                            : 'tu navegador';
                window.notify.warning({
                    title: '🔒 Notificaciones bloqueadas',
                    message: 'Para activar: tocá el ícono de candado/info al lado de la URL → Permisos → Notificaciones → Permitir. Después recargá la página. (' + browser + ')',
                    duration: 14000
                });
            }
            return Promise.resolve(null);
        }

        // Registrar el SW dedicado de FCM (separado del service-worker.js principal)
        return navigator.serviceWorker.register('/firebase-messaging-sw.js', { scope: '/firebase-cloud-messaging-push-scope' })
            .then(function (registration) {
                // Pedir permiso si aún está en 'default'
                if (Notification.permission === 'default') {
                    return Notification.requestPermission().then(function (perm) {
                        if (perm !== 'granted') {
                            console.info('[AdminFCM] Permission ' + perm + ' — skip');
                            return null;
                        }
                        return registration;
                    });
                }
                return registration;
            })
            .then(function (registration) {
                if (!registration) return null;
                // §25.12 fix — pasar window.firebaseApp explícito.
                // Sin esto el call interno del SDK busca default app
                // y aunque la default existe (dual-app strategy), ser
                // explícito previene cualquier ambigüedad futura.
                var messaging = window.firebaseApp
                    ? window.firebase.messaging(window.firebaseApp)
                    : window.firebase.messaging();
                // §98 — handler FOREGROUND. El SW (firebase-messaging-sw.js)
                // solo dispara onBackgroundMessage cuando la pestaña está en
                // segundo plano/cerrada. Cuando el asesor tiene el ALTOR Hub
                // ABIERTO y visible, esos push se perdían silenciosamente
                // (no había onMessage handler) → "las notificaciones nunca
                // funcionan". Ahora mostramos un toast in-app + sonido.
                bindForegroundHandler(messaging);
                return messaging.getToken({
                    vapidKey: VAPID_PUBLIC_KEY,
                    serviceWorkerRegistration: registration
                });
            })
            .then(function (token) {
                if (!token) return null;
                _currentToken = token;
                return persistToken(token);
            })
            .catch(function (err) {
                console.warn('[AdminFCM] Error registering FCM:', err.message || err);
                return null;
            });
    }

    /**
     * persistToken — guarda el token en usuarios/{uid}.fcmTokens[].
     * Si ya existe el mismo token, actualiza lastUsedAt en lugar de duplicar.
     */
    function persistToken(token) {
        if (!window.auth || !window.auth.currentUser || !window.db) return null;
        var uid = window.auth.currentUser.uid;
        var ref = window.db.collection('usuarios').doc(uid);

        return ref.get().then(function (snap) {
            if (!snap.exists) return null;
            var data = snap.data() || {};
            var tokens = Array.isArray(data.fcmTokens) ? data.fcmTokens : [];
            var nowIso = new Date().toISOString();
            var existing = tokens.findIndex(function (t) { return t && t.token === token; });
            var deviceLabel = detectDevice();

            if (existing >= 0) {
                tokens[existing].lastUsedAt = nowIso;
                tokens[existing].deviceLabel = deviceLabel;
            } else {
                // Cap a 5 dispositivos por usuario (el más viejo se descarta)
                if (tokens.length >= 5) tokens = tokens.slice(-4);
                tokens.push({
                    token: token,
                    deviceLabel: deviceLabel,
                    addedAt: nowIso,
                    lastUsedAt: nowIso
                });
            }
            return ref.update({ fcmTokens: tokens });
        });
    }

    /**
     * showFCMPrompt — muestra un toast amigable con CTA para que el asesor
     * habilite las notificaciones. Solo se muestra UNA vez por sesión
     * (localStorage key) para no ser molesto.
     *
     * Si el navegador ya tiene Notification.permission === 'granted',
     * vamos directo a getToken sin prompt.
     */
    function init() {
        if (_initialized) return;
        _initialized = true;

        if (!VAPID_PUBLIC_KEY) return; // setup pendiente
        if (!AP.isAuthenticatedAdmin || !AP.isAuthenticatedAdmin()) return;
        if (!isSupported()) return;

        // Si ya está granted, registrar token directo
        if (Notification.permission === 'granted') {
            registerSwAndGetToken();
            return;
        }

        // Si está denied, no preguntar (respeta decisión del usuario)
        if (Notification.permission === 'denied') return;

        // §98 — NO molestar en cada login. Antes usaba sessionStorage
        // (se reseteaba al cerrar la pestaña → el prompt salía SIEMPRE
        // al volver a iniciar sesión). Ahora persistimos en localStorage
        // con cooldown de 3 días:
        //   - granted  → nunca se prompts (lo cubre el branch de arriba)
        //   - denied   → nunca (branch de arriba)
        //   - default  → prompt a lo sumo 1 vez cada 3 días
        var PROMPT_KEY = 'altorra_fcm_prompted_at';
        var COOLDOWN_MS = 3 * 24 * 60 * 60 * 1000; // 3 días
        var lastPrompt = 0;
        try { lastPrompt = parseInt(localStorage.getItem(PROMPT_KEY) || '0', 10); } catch (e) {}
        if (lastPrompt && (Date.now() - lastPrompt) < COOLDOWN_MS) return;
        try { localStorage.setItem(PROMPT_KEY, String(Date.now())); } catch (e) {}

        // Diferir 3s para no bombardear al admin recién logueado
        setTimeout(function () {
            if (window.notify && window.notify.warning) {
                // §25.12 fix — la API de notify espera `onClick`, NO `callback`.
                // Antes se usaba `callback` y el listener jamás se bindeaba
                // (toast.js:190 chequea typeof cfg.action.onClick === 'function').
                // Resultado: tocar "Activar" no hacía nada.
                window.notify.warning({
                    title: '🔔 Notificaciones de clientes en cola',
                    message: '¿Querés recibir avisos en tu celular cuando un cliente esté esperando? Te despertamos solo si nadie del equipo está atendiendo.',
                    duration: 12000,
                    action: {
                        label: 'Activar',
                        onClick: function () {
                            registerSwAndGetToken().then(function (result) {
                                if (result && window.notify && window.notify.success) {
                                    window.notify.success({
                                        title: '✅ Notificaciones activadas',
                                        message: 'Te avisaremos cuando un cliente esté esperando.',
                                        duration: 4000
                                    });
                                } else if (Notification.permission === 'denied' && window.notify) {
                                    window.notify.error({
                                        title: 'Permiso denegado',
                                        message: 'Habilitá las notificaciones desde la configuración del navegador para recibir avisos.',
                                        duration: 6000
                                    });
                                }
                            });
                        }
                    }
                });
            }
        }, 3000);
    }

    /* ─── Public API ─────────────────────────────────────────────── */
    window.AltorraAdminFCM = {
        init: init,
        registerToken: registerSwAndGetToken,
        currentToken: function () { return _currentToken; },
        isSupported: isSupported,
        VAPID_PUBLIC_KEY_SET: !!VAPID_PUBLIC_KEY
    };

    // §45 — Cargar firebase-messaging-compat DINÁMICAMENTE solo cuando
    // firebase-app esté listo. Antes se cargaba como <script defer>
    // estático y crasheaba con "Cannot read properties of undefined
    // (reading 'INTERNAL')" porque firebase-app-compat.js todavía no
    // estaba ejecutado al momento que messaging-compat.js intenta
    // auto-registrarse contra el SDK.
    function loadMessagingCompat() {
        if (window.firebase && window.firebase.messaging) return Promise.resolve();
        return new Promise(function (resolve) {
            var s = document.createElement('script');
            s.src = 'https://www.gstatic.com/firebasejs/11.3.0/firebase-messaging-compat.js';
            s.onload = function () { resolve(); };
            s.onerror = function () {
                console.warn('[AdminFCM] No se pudo cargar firebase-messaging-compat');
                resolve(); // resolve igual para no bloquear init; isSupported() filtra
            };
            document.head.appendChild(s);
        });
    }

    // Auto-init cuando firebase-app está listo + admin autenticado + AP cargado
    function bootIfReady() {
        if (window.AP && AP.currentUserProfile && AP.isAuthenticatedAdmin && AP.isAuthenticatedAdmin()) {
            // Cargar messaging-compat de forma diferida ANTES de init
            (window.firebaseReady || Promise.resolve())
                .then(loadMessagingCompat)
                .then(init)
                .catch(function (err) {
                    console.warn('[AdminFCM] init falló:', err && err.message);
                });
        } else {
            setTimeout(bootIfReady, 1500);
        }
    }
    setTimeout(bootIfReady, 2500);
})();
