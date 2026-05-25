/**
 * ALTORRA CARS — Notificaciones nativas SO (Mega-Plan v4, G.2)
 * ==============================================================
 * Hook al EventBus que cuando llega una notificación priority high
 * o critical (y el admin lo permitió) dispara también una
 * Notification API nativa visible incluso si el tab está minimizado.
 *
 * Flow de permisos progresivo:
 *   1. No pide permiso al cargar la página (intrusivo)
 *   2. Tras la 3ª notificación importante de la sesión, ofrece
 *      "¿Querés recibir avisos del sistema operativo?" con CTA
 *   3. Si acepta: Notification.requestPermission()
 *   4. Si rechaza o no responde: persiste decision en localStorage
 *
 * Public API:
 *   AltorraNativeNotifs.requestPermission()
 *   AltorraNativeNotifs.show(title, options)
 *   AltorraNativeNotifs.isEnabled()
 *   AltorraNativeNotifs.askLater()  → resetear decision
 */
(function () {
    'use strict';
    if (window.AltorraNativeNotifs) return;
    if (!('Notification' in window)) {
        console.info('[G.2] Notification API no disponible');
        return;
    }
    var AP = window.AP;
    if (!AP) return;

    var DECISION_KEY = 'altorra_native_notifs_decision';
    var COUNTER_KEY = 'altorra_native_notifs_counter';
    var TRIGGER_THRESHOLD = 3;
    var _shown = {};
    var _eventCounter = 0;

    function getDecision() {
        try { return localStorage.getItem(DECISION_KEY); } catch (e) { return null; }
    }
    function setDecision(value) {
        try { localStorage.setItem(DECISION_KEY, value); } catch (e) {}
    }
    function bumpCounter() {
        _eventCounter++;
        try { localStorage.setItem(COUNTER_KEY, String(_eventCounter)); } catch (e) {}
    }
    function loadCounter() {
        try { return parseInt(localStorage.getItem(COUNTER_KEY) || '0', 10); }
        catch (e) { return 0; }
    }

    function isEnabled() {
        return Notification.permission === 'granted' && getDecision() !== 'declined';
    }

    /* ═══════════════════════════════════════════════════════════
       PERMISSION REQUEST
       ═══════════════════════════════════════════════════════════ */
    function requestPermission() {
        if (Notification.permission === 'granted') {
            setDecision('granted');
            return Promise.resolve('granted');
        }
        if (Notification.permission === 'denied') {
            setDecision('declined');
            AP.toast('Notificaciones bloqueadas en el navegador. Habilitalas desde la configuración del sitio.', 'warning');
            return Promise.resolve('denied');
        }
        return Notification.requestPermission().then(function (perm) {
            setDecision(perm === 'granted' ? 'granted' : 'declined');
            if (perm === 'granted') {
                AP.toast('Notificaciones del sistema activadas. Te avisamos de eventos críticos.');
                show('Altorra Admin', {
                    body: '¡Listo! Recibirás notificaciones aquí mismo.',
                    silent: true
                });
            }
            return perm;
        });
    }

    /* ═══════════════════════════════════════════════════════════
       SHOW NOTIFICATION
       ═══════════════════════════════════════════════════════════ */
    function show(title, options) {
        if (!isEnabled()) return null;
        // No spam: no mostrar si la pestaña ya está visible
        if (document.visibilityState === 'visible') return null;
        try {
            var n = new Notification(title, Object.assign({
                icon: '/multimedia/logo-placeholder.png',
                badge: '/multimedia/logo-placeholder.png',
                tag: 'altorra-' + Date.now(),
                lang: 'es-CO'
            }, options || {}));
            n.onclick = function () {
                window.focus();
                if (options && options.data && options.data.link) {
                    window.location.href = options.data.link;
                }
                n.close();
            };
            return n;
        } catch (e) {
            console.warn('[G.2] Notification show error:', e.message);
            return null;
        }
    }

    /* ═══════════════════════════════════════════════════════════
       UI INVITATION — modal sutil para pedir permiso
       ═══════════════════════════════════════════════════════════ */
    function showInvitation() {
        if (document.getElementById('alt-native-invite')) return;
        var wrap = document.createElement('div');
        wrap.id = 'alt-native-invite';
        wrap.className = 'alt-native-invite';
        wrap.innerHTML =
            '<div class="alt-native-invite-content">' +
                '<i data-lucide="bell-ring"></i>' +
                '<div class="alt-native-invite-body">' +
                    '<strong>¿Recibir avisos del sistema?</strong>' +
                    '<small>Te notificamos eventos críticos aunque estés en otra pestaña.</small>' +
                '</div>' +
                '<div class="alt-native-invite-actions">' +
                    '<button class="alt-btn alt-btn--ghost alt-btn--sm" id="alt-native-decline">Ahora no</button>' +
                    '<button class="alt-btn alt-btn--primary alt-btn--sm" id="alt-native-accept">Activar</button>' +
                '</div>' +
            '</div>';
        document.body.appendChild(wrap);
        if (window.AltorraIcons) window.AltorraIcons.refresh(wrap);
        else if (window.lucide) try { window.lucide.createIcons({ context: wrap }); } catch (e) {}

        document.getElementById('alt-native-accept').addEventListener('click', function () {
            requestPermission();
            wrap.remove();
        });
        document.getElementById('alt-native-decline').addEventListener('click', function () {
            setDecision('postponed');
            wrap.remove();
        });
    }

    /* ═══════════════════════════════════════════════════════════
       HOOK A EVENTBUS — escuchar notificaciones del notify center
       ═══════════════════════════════════════════════════════════ */
    function init() {
        if (!window.AltorraEventBus) {
            // Retry si bus aún no existe
            var attempts = 0;
            var iv = setInterval(function () {
                attempts++;
                if (window.AltorraEventBus) {
                    clearInterval(iv);
                    init();
                } else if (attempts > 60) clearInterval(iv);
            }, 500);
            return;
        }
        // Counter histórico
        _eventCounter = loadCounter();

        // Escuchar todas las notificaciones del bus que hayan sido emitidas
        // por notifyCenter (categoría matters)
        var IMPORTANT_TYPES = [
            'security', 'request_update', 'appointment_update',
            'price_alert', 'inventory_change', 'system'
        ];

        // Hook al notifyCenter directly si existe
        if (window.notifyCenter && typeof window.notifyCenter.notify === 'function') {
            var originalNotify = window.notifyCenter.notify;
            window.notifyCenter.notify = function (category, payload) {
                var result = originalNotify.apply(this, arguments);
                try {
                    var priority = payload && payload.priority;
                    if (priority === 'critical' || priority === 'high') {
                        bumpCounter();
                        var dec = getDecision();
                        if (dec === 'granted') {
                            show(payload.title || 'Altorra', {
                                body: payload.message || '',
                                data: { link: payload.link },
                                requireInteraction: priority === 'critical'
                            });
                        } else if (!dec && _eventCounter >= TRIGGER_THRESHOLD) {
                            // Mostrar invitación una sola vez
                            setDecision('postponed');  // marcamos que ya invitamos
                            setTimeout(showInvitation, 500);
                        }
                    }
                } catch (e) {}
                return result;
            };
        }

        // Visibility change handler para limpiar duplicados
        document.addEventListener('visibilitychange', function () {
            if (document.visibilityState === 'visible') {
                _shown = {};
            }
        });
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    /* ═══════════════════════════════════════════════════════════
       Public API
       ═══════════════════════════════════════════════════════════ */
    window.AltorraNativeNotifs = {
        requestPermission: requestPermission,
        show: show,
        isEnabled: isEnabled,
        askLater: function () { setDecision(null); }
    };
})();
