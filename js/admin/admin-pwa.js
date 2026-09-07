/**
 * ALTORRA CARS — PWA admin (Mega-Plan v4, Microfase G.4)
 * ========================================================
 * Hace al admin installable como app nativa (Chrome, Edge, Safari).
 *
 * Características:
 *   1. Service Worker registration (delegado al SW raíz)
 *   2. beforeinstallprompt → captura el prompt y muestra botón custom
 *   3. Botón "Instalar app" en el header del admin (desaparece tras instalar)
 *   4. Detección de standalone mode (cuando ya está instalada)
 *   5. Toast de bienvenida al primer launch instalado
 *
 * Public API:
 *   AltorraPWA.install()         → triggerea install prompt
 *   AltorraPWA.isInstalled()     → detecta standalone mode
 *   AltorraPWA.canInstall()      → si beforeinstallprompt fue capturado
 */
(function () {
    'use strict';
    if (window.AltorraPWA) return;

    var _deferredPrompt = null;
    var _installButtonShown = false;
    var INSTALLED_KEY = 'altorra_admin_pwa_installed';

    /* ═══════════════════════════════════════════════════════════
       DETECTION
       ═══════════════════════════════════════════════════════════ */
    function isStandalone() {
        return window.matchMedia('(display-mode: standalone)').matches ||
               window.navigator.standalone === true ||
               document.referrer.indexOf('android-app://') === 0;
    }

    function isInstalled() {
        if (isStandalone()) return true;
        try { return localStorage.getItem(INSTALLED_KEY) === '1'; } catch (e) { return false; }
    }

    function canInstall() { return !!_deferredPrompt; }

    /* ═══════════════════════════════════════════════════════════
       INSTALL BUTTON UI
       ═══════════════════════════════════════════════════════════ */
    function showInstallButton() {
        if (_installButtonShown) return;
        if (isInstalled()) return;

        var header = document.querySelector('.admin-header') ||
                     document.getElementById('headerNotifBell');
        if (!header) return;

        var btn = document.createElement('button');
        btn.id = 'pwaInstallBtn';
        btn.className = 'alt-btn alt-btn--ghost alt-btn--sm pwa-install-btn';
        btn.setAttribute('data-tooltip', 'Instalar como app');
        btn.innerHTML = '<i data-lucide="download"></i> <span class="pwa-install-label">Instalar</span>';
        btn.addEventListener('click', triggerInstall);

        // Insertar antes del bell (si existe) o append al final del header
        var bell = document.getElementById('headerNotifBell');
        if (bell && bell.parentNode) {
            bell.parentNode.insertBefore(btn, bell);
        } else {
            header.appendChild(btn);
        }
        _installButtonShown = true;
        if (window.AltorraIcons) window.AltorraIcons.refresh(btn);
        else if (window.lucide) try { window.lucide.createIcons({ context: btn }); } catch (e) {}
    }

    function hideInstallButton() {
        var btn = document.getElementById('pwaInstallBtn');
        if (btn) btn.remove();
        _installButtonShown = false;
    }

    /* ═══════════════════════════════════════════════════════════
       INSTALL FLOW
       ═══════════════════════════════════════════════════════════ */
    function triggerInstall() {
        if (!_deferredPrompt) {
            // Fallback: instrucciones manuales
            var msg = 'Para instalar: en Chrome menú "Instalar app" · en Safari "Agregar a pantalla de inicio".';
            if (window.notify) window.notify.info(msg);
            else alert(msg);
            return;
        }
        _deferredPrompt.prompt();
        _deferredPrompt.userChoice.then(function (choice) {
            if (choice.outcome === 'accepted') {
                try { localStorage.setItem(INSTALLED_KEY, '1'); } catch (e) {}
                hideInstallButton();
                if (window.notify) window.notify.success('Altorra Admin instalado en tu dispositivo');
                if (window.AltorraEventBus) {
                    window.AltorraEventBus.emit('pwa.installed', { timestamp: Date.now() });
                }
            }
            _deferredPrompt = null;
        });
    }

    /* ═══════════════════════════════════════════════════════════
       SERVICE WORKER REGISTRATION
       ═══════════════════════════════════════════════════════════ */
    function registerSW() {
        if (!('serviceWorker' in navigator)) return;
        // El SW raíz (service-worker.js) ya cachea con scope /
        // Solo verificamos que esté registrado.
        navigator.serviceWorker.getRegistration('/').then(function (reg) {
            if (!reg) {
                // Registrar si no lo está
                navigator.serviceWorker.register('/service-worker.js', { scope: '/' })
                    .then(function () {
                        console.info('[PWA-Admin] Service Worker registrado');
                    })
                    .catch(function (err) {
                        console.warn('[PWA-Admin] SW register error:', err.message);
                    });
            }
        });
    }

    /* ═══════════════════════════════════════════════════════════
       EVENTS
       ═══════════════════════════════════════════════════════════ */
    window.addEventListener('beforeinstallprompt', function (e) {
        e.preventDefault();
        _deferredPrompt = e;
        // Mostrar botón solo si admin está autenticado (header existe)
        if (document.querySelector('.admin-header')) {
            showInstallButton();
        } else {
            // Diferir hasta que el admin entre
            var attempts = 0;
            var iv = setInterval(function () {
                attempts++;
                if (document.querySelector('.admin-header')) {
                    showInstallButton();
                    clearInterval(iv);
                } else if (attempts > 60) clearInterval(iv);
            }, 1000);
        }
    });

    window.addEventListener('appinstalled', function () {
        try { localStorage.setItem(INSTALLED_KEY, '1'); } catch (e) {}
        hideInstallButton();
        if (window.AltorraEventBus) {
            window.AltorraEventBus.emit('pwa.installed', { timestamp: Date.now() });
        }
    });

    /* ═══════════════════════════════════════════════════════════
       INIT
       ═══════════════════════════════════════════════════════════ */
    function init() {
        registerSW();
        // Welcome toast si es primer launch en standalone mode
        if (isStandalone()) {
            try {
                var wasShown = localStorage.getItem('altorra_admin_pwa_welcomed');
                if (!wasShown) {
                    setTimeout(function () {
                        if (window.notify) {
                            window.notify.success('¡Bienvenido a Altorra Admin instalado! Funciona en modo standalone.');
                        }
                    }, 1500);
                    localStorage.setItem('altorra_admin_pwa_welcomed', '1');
                }
            } catch (e) {}
        }
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    /* ═══════════════════════════════════════════════════════════
       Public API
       ═══════════════════════════════════════════════════════════ */
    window.AltorraPWA = {
        install: triggerInstall,
        isInstalled: isInstalled,
        isStandalone: isStandalone,
        canInstall: canInstall,
        // Debug
        _showButton: showInstallButton,
        _hideButton: hideInstallButton
    };
})();
