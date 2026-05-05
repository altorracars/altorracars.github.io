/**
 * ALTORRA CARS — Security Layer (Mega-Plan v4, Microfase H.4)
 * =============================================================
 * Re-authentication para acciones críticas. Antes de ejecutar:
 *   - Eliminación de cualquier registro
 *   - Cambio de rol de usuario
 *   - Export masivo (CSV con datos sensibles)
 *   - Cambios en config global
 *
 * El admin debe re-confirmar su password (incluso ya estando logueado).
 * Si la auth se confirma OK, se cachea durante 5 minutos así no se
 * pide en cada acción seguida (similar a sudo timestamp).
 *
 * Patrón GitHub/Stripe "sudo mode".
 *
 * Public API:
 *   AltorraSecurity.requireReauth(reason)
 *     → Promise resuelve si OK, rechaza si cancelado o falla
 *
 *   AltorraSecurity.guard(reason, fn)
 *     → wrapper: ejecuta fn() solo si re-auth pasa
 *
 *   AltorraSecurity.invalidate()
 *     → fuerza nueva re-auth en próxima acción
 */
(function () {
    'use strict';
    if (window.AltorraSecurity) return;
    var AP = window.AP;
    if (!AP) return;

    var SUDO_TTL_MS = 5 * 60 * 1000; // 5 minutos
    var _lastReauth = 0;
    var _activePromise = null;

    function isSudoActive() {
        return (Date.now() - _lastReauth) < SUDO_TTL_MS;
    }

    function invalidate() {
        _lastReauth = 0;
    }

    /* ═══════════════════════════════════════════════════════════
       MODAL UI
       ═══════════════════════════════════════════════════════════ */
    function showReauthModal(reason) {
        return new Promise(function (resolve, reject) {
            var existing = document.getElementById('alt-sec-modal');
            if (existing) existing.remove();

            var wrap = document.createElement('div');
            wrap.id = 'alt-sec-modal';
            wrap.className = 'alt-sec-modal';
            wrap.setAttribute('role', 'dialog');
            wrap.setAttribute('aria-label', 'Confirmar identidad');
            wrap.innerHTML =
                '<div class="alt-sec-backdrop"></div>' +
                '<div class="alt-sec-card">' +
                    '<div class="alt-sec-icon">' +
                        '<i data-lucide="shield-check"></i>' +
                    '</div>' +
                    '<h3 class="alt-sec-title">Confirmá tu identidad</h3>' +
                    '<p class="alt-sec-reason">' + escTxt(reason || 'Esta acción es sensible. Por seguridad, ingresá tu contraseña.') + '</p>' +
                    '<form class="alt-sec-form" id="alt-sec-form">' +
                        '<input type="password" id="alt-sec-input" class="alt-sec-input" placeholder="Tu contraseña" autocomplete="current-password" required>' +
                        '<div class="alt-sec-error" id="alt-sec-error"></div>' +
                        '<div class="alt-sec-actions">' +
                            '<button type="button" class="alt-btn alt-btn--ghost" id="alt-sec-cancel">Cancelar</button>' +
                            '<button type="submit" class="alt-btn alt-btn--primary" id="alt-sec-confirm">' +
                                '<i data-lucide="lock"></i> Confirmar' +
                            '</button>' +
                        '</div>' +
                    '</form>' +
                    '<small class="alt-sec-hint">Tu sesión sudo durará 5 minutos para acciones siguientes.</small>' +
                '</div>';
            document.body.appendChild(wrap);
            if (window.AltorraIcons) window.AltorraIcons.refresh(wrap);
            else if (window.lucide) try { window.lucide.createIcons({ context: wrap }); } catch (e) {}

            var input = document.getElementById('alt-sec-input');
            var errorEl = document.getElementById('alt-sec-error');
            var form = document.getElementById('alt-sec-form');
            var cancel = document.getElementById('alt-sec-cancel');
            var backdrop = wrap.querySelector('.alt-sec-backdrop');

            setTimeout(function () { input && input.focus(); }, 100);

            function close() {
                wrap.remove();
            }
            function fail(msg) {
                errorEl.textContent = msg || 'Contraseña incorrecta. Intentá de nuevo.';
                input.value = '';
                input.focus();
                wrap.classList.add('alt-sec-shake');
                setTimeout(function () { wrap.classList.remove('alt-sec-shake'); }, 400);
            }
            function tryReauth() {
                var pwd = input.value;
                if (!pwd) { fail('Ingresá tu contraseña.'); return; }
                if (!window.firebase || !window.auth || !window.auth.currentUser) {
                    fail('Sesión no disponible.');
                    return;
                }
                var user = window.auth.currentUser;
                if (!user.email) {
                    fail('Tu cuenta no tiene email asociado.');
                    return;
                }
                var btn = document.getElementById('alt-sec-confirm');
                if (btn) { btn.disabled = true; btn.innerHTML = '<span class="spinner"></span> Verificando…'; }
                try {
                    var cred = window.firebase.auth.EmailAuthProvider.credential(user.email, pwd);
                    user.reauthenticateWithCredential(cred).then(function () {
                        _lastReauth = Date.now();
                        if (window.AltorraEventBus) {
                            window.AltorraEventBus.emit('security.reauth', {
                                uid: user.uid,
                                reason: reason
                            }, { persist: true });
                        }
                        close();
                        resolve();
                    }).catch(function (err) {
                        if (btn) { btn.disabled = false; btn.innerHTML = '<i data-lucide="lock"></i> Confirmar'; }
                        if (window.AltorraIcons) window.AltorraIcons.refresh(btn);
                        var msg = err.code === 'auth/wrong-password' ? 'Contraseña incorrecta. Intentá de nuevo.'
                               : err.code === 'auth/too-many-requests' ? 'Demasiados intentos. Esperá unos minutos.'
                               : 'Error: ' + (err.message || err.code || 'desconocido');
                        fail(msg);
                    });
                } catch (e) {
                    if (btn) { btn.disabled = false; }
                    fail('Error: ' + e.message);
                }
            }

            form.addEventListener('submit', function (e) { e.preventDefault(); tryReauth(); });
            cancel.addEventListener('click', function () { close(); reject(new Error('cancelled')); });
            backdrop.addEventListener('click', function () { close(); reject(new Error('cancelled')); });
            // Esc cancela
            function escHandler(e) {
                if (e.key === 'Escape') {
                    document.removeEventListener('keydown', escHandler);
                    close();
                    reject(new Error('cancelled'));
                }
            }
            document.addEventListener('keydown', escHandler);
        });
    }

    function escTxt(s) {
        var d = document.createElement('div');
        d.textContent = s == null ? '' : String(s);
        return d.innerHTML;
    }

    /* ═══════════════════════════════════════════════════════════
       PUBLIC API
       ═══════════════════════════════════════════════════════════ */
    function requireReauth(reason) {
        if (isSudoActive()) {
            return Promise.resolve();
        }
        // Si ya hay un modal abierto, retornar la misma promise
        if (_activePromise) return _activePromise;
        _activePromise = showReauthModal(reason).then(function (r) {
            _activePromise = null;
            return r;
        }, function (err) {
            _activePromise = null;
            throw err;
        });
        return _activePromise;
    }

    function guard(reason, fn) {
        return requireReauth(reason).then(function () {
            return fn();
        });
    }

    /* ═══════════════════════════════════════════════════════════
       AUTO-INSTRUMENTACIÓN — wrap acciones críticas existentes
       Sin cambiar el código de origen, interceptamos clicks en
       botones marcados con data-secure-action
       ═══════════════════════════════════════════════════════════ */
    document.addEventListener('click', function (e) {
        var btn = e.target.closest && e.target.closest('[data-secure-action]');
        if (!btn) return;
        if (btn._secureProcessed) return; // evitar loop
        var reason = btn.getAttribute('data-secure-reason') || 'Esta acción es sensible.';
        if (!isSudoActive()) {
            e.preventDefault();
            e.stopImmediatePropagation();
            requireReauth(reason).then(function () {
                btn._secureProcessed = true;
                btn.click();
                setTimeout(function () { btn._secureProcessed = false; }, 100);
            }).catch(function () { /* cancelled */ });
        }
    }, true);

    /* ═══════════════════════════════════════════════════════════
       Public API
       ═══════════════════════════════════════════════════════════ */
    window.AltorraSecurity = {
        requireReauth: requireReauth,
        guard: guard,
        isSudoActive: isSudoActive,
        invalidate: invalidate,
        // Debug
        _state: function () { return { lastReauth: _lastReauth, ttl: SUDO_TTL_MS }; }
    };
})();
