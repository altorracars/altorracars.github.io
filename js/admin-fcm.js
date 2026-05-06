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

    // ⚠️ TODO: pegar aquí la VAPID public key generada en Firebase Console.
    // Hasta que se setee, AltorraAdminFCM.init() es no-op silencioso.
    var VAPID_PUBLIC_KEY = '';

    var _initialized = false;
    var _currentToken = null;

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
                var messaging = window.firebase.messaging();
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
        if (!AP.isEditorOrAbove || !AP.isEditorOrAbove()) return;
        if (!isSupported()) return;

        // Si ya está granted, registrar token directo
        if (Notification.permission === 'granted') {
            registerSwAndGetToken();
            return;
        }

        // Si está denied, no preguntar (respeta decisión del usuario)
        if (Notification.permission === 'denied') return;

        // Default: mostrar prompt amigable UNA vez por sesión
        var promptedKey = 'altorra_fcm_prompted_v1';
        if (sessionStorage.getItem(promptedKey)) return;
        sessionStorage.setItem(promptedKey, '1');

        // Diferir 3s para no bombardear al admin recién logueado
        setTimeout(function () {
            if (window.notify && window.notify.warning) {
                window.notify.warning({
                    title: '🔔 Notificaciones de clientes en cola',
                    message: '¿Querés recibir avisos en tu celular cuando un cliente esté esperando? Te despertamos solo si nadie del equipo está atendiendo.',
                    duration: 12000,
                    action: {
                        label: 'Activar',
                        callback: registerSwAndGetToken
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

    // Auto-init cuando el admin está autenticado y AP cargado
    function bootIfReady() {
        if (window.AP && AP.currentUserProfile && AP.isEditorOrAbove && AP.isEditorOrAbove()) {
            init();
        } else {
            setTimeout(bootIfReady, 1500);
        }
    }
    setTimeout(bootIfReady, 2500);
})();
