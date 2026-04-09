// Admin Panel — Auth, RBAC & Navigation
(function() {
    'use strict';
    var AP = window.AP;
    var $ = AP.$;

    // ========== RATE LIMITING (Firestore loginAttempts — cross-device) ==========
    var RL_MAX_ATTEMPTS = 5;

    function emailHash(email) {
        // Create a safe Firestore document ID from email
        return email.toLowerCase().replace(/[^a-z0-9]/g, '_');
    }

    // Check if account is blocked in Firestore (async)
    function checkFirestoreBlock(email) {
        if (!email || !window.db) return Promise.resolve({ blocked: false, attempts: 0 });
        return window.db.collection('loginAttempts').doc(emailHash(email)).get()
            .then(function(doc) {
                if (!doc.exists) return { blocked: false, attempts: 0 };
                var data = doc.data();
                return { blocked: !!data.bloqueado, attempts: data.intentos || 0 };
            })
            .catch(function() { return { blocked: false, attempts: 0 }; });
    }

    // Record failed attempt in Firestore (works without auth — public write)
    function recordFailedAttempt(email) {
        if (!email || !window.db) return Promise.resolve(0);
        var docRef = window.db.collection('loginAttempts').doc(emailHash(email));
        return docRef.get().then(function(doc) {
            var current = doc.exists ? (doc.data().intentos || 0) : 0;
            var newCount = current + 1;
            var data = {
                email: email.toLowerCase(),
                intentos: newCount,
                ultimoIntento: new Date().toISOString()
            };
            if (newCount >= RL_MAX_ATTEMPTS) {
                data.bloqueado = true;
                data.bloqueadoEn = new Date().toISOString();
            }
            return (doc.exists ? docRef.update(data) : docRef.set(data)).then(function() {
                return newCount;
            });
        }).catch(function() { return 0; });
    }

    // Clear attempts on successful login (requires auth — called after login)
    function clearLoginAttempts(email) {
        if (!email || !window.db) return;
        window.db.collection('loginAttempts').doc(emailHash(email)).delete().catch(function() {
            // If delete fails (non-admin), just reset the fields
            window.db.collection('loginAttempts').doc(emailHash(email)).update({
                intentos: 0,
                bloqueado: false
            }).catch(function() { /* ignore */ });
        });
    }

    // Unblock user (super_admin from admin-users panel)
    function unblockUser(uid) {
        // Find email from users array to also clear loginAttempts
        var u = (AP.users || []).find(function(x) { return x._docId === uid; });
        if (u && u.email) {
            window.db.collection('loginAttempts').doc(emailHash(u.email)).delete().catch(function() {
                window.db.collection('loginAttempts').doc(emailHash(u.email)).update({
                    intentos: 0, bloqueado: false
                }).catch(function() { /* ignore */ });
            });
        }
        return window.db.collection('usuarios').doc(uid).update({
            bloqueado: false,
            bloqueadoEn: '',
            motivoBloqueo: ''
        });
    }
    AP.unblockUser = unblockUser;

    // ========== SESSION EXPIRY (8h absoluta) ==========
    var SESSION_START_KEY = 'ac_session_start';

    function recordSessionStart() {
        localStorage.setItem(SESSION_START_KEY, String(Date.now()));
    }

    function clearSessionStart() {
        localStorage.removeItem(SESSION_START_KEY);
    }

    function isSessionExpired() {
        var start = parseInt(localStorage.getItem(SESSION_START_KEY) || '0', 10);
        if (!start) return false;
        return (Date.now() - start) > AP.SESSION_MAX_MS;
    }

    // ========== F12.3: 2FA STATE + TRUSTED DEVICES ==========
    var _2faVerificationId = null;
    var _2faPendingUser = null;
    var _2faRecaptchaVerifier = null;
    var TRUST_DURATION_MS = 30 * 24 * 60 * 60 * 1000; // 30 dias

    // ── Trusted Device Helpers ──────────────────────────────
    function generateDeviceToken() {
        var arr = new Uint8Array(32);
        crypto.getRandomValues(arr);
        return Array.from(arr, function(b) { return b.toString(16).padStart(2, '0'); }).join('');
    }

    function getDeviceInfo() {
        var ua = navigator.userAgent;
        var browser = 'Desconocido';
        if (ua.indexOf('Edg/') > -1) browser = 'Edge';
        else if (ua.indexOf('OPR/') > -1 || ua.indexOf('Opera') > -1) browser = 'Opera';
        else if (ua.indexOf('Chrome/') > -1) browser = 'Chrome';
        else if (ua.indexOf('Safari/') > -1) browser = 'Safari';
        else if (ua.indexOf('Firefox/') > -1) browser = 'Firefox';

        var os = 'Desconocido';
        if (ua.indexOf('Windows') > -1) os = 'Windows';
        else if (ua.indexOf('Mac OS') > -1) os = 'macOS';
        else if (ua.indexOf('Android') > -1) os = 'Android';
        else if (ua.indexOf('iPhone') > -1 || ua.indexOf('iPad') > -1) os = 'iOS';
        else if (ua.indexOf('Linux') > -1) os = 'Linux';

        return { browser: browser, os: os, userAgent: ua.substring(0, 200) };
    }

    // Fetch approximate location from IP (no user permission needed).
    // Uses freeipapi.com (HTTPS, CORS-enabled, no API key required).
    // Returns { city, region, country, ip, timezone } or defaults on failure.
    var _locationCache = null;
    function fetchLocationInfo() {
        // Cache location per page load — IP doesn't change within a session
        if (_locationCache) return Promise.resolve(_locationCache);
        return fetch('https://freeipapi.com/api/json')
            .then(function(res) { return res.json(); })
            .then(function(data) {
                // Anonymize IP: mask last octet for IPv4 (e.g. 190.28.123.xxx)
                var ip = data.ipAddress || '';
                var parts = ip.split('.');
                var maskedIp = parts.length === 4
                    ? parts[0] + '.' + parts[1] + '.' + parts[2] + '.***'
                    : ip.substring(0, ip.lastIndexOf(':')) + ':***';
                _locationCache = {
                    city: data.cityName || 'Desconocida',
                    region: data.regionName || '',
                    country: data.countryName || '',
                    ip: maskedIp,
                    timezone: data.timeZone || ''
                };
                return _locationCache;
            })
            .catch(function() {
                return { city: '', region: '', country: '', ip: '', timezone: '' };
            });
    }

    function getTrustKey(uid) {
        return 'ac_2fa_trust_' + uid;
    }

    function isDeviceTrusted(uid, trustedDevices) {
        try {
            var stored = JSON.parse(localStorage.getItem(getTrustKey(uid)));
            if (!stored || !stored.token || !stored.expires) return false;
            if (Date.now() > stored.expires) {
                localStorage.removeItem(getTrustKey(uid));
                return false;
            }
            // Verify token exists in Firestore list
            if (!trustedDevices || !trustedDevices.length) return false;
            var match = trustedDevices.find(function(d) { return d.token === stored.token && d.expiresAt > Date.now(); });
            return !!match;
        } catch (e) { return false; }
    }

    function saveDeviceTrust(uid) {
        var token = generateDeviceToken();
        var now = Date.now();
        var expires = now + TRUST_DURATION_MS;
        var device = getDeviceInfo();

        // Save to localStorage
        localStorage.setItem(getTrustKey(uid), JSON.stringify({
            token: token,
            expires: expires
        }));

        // Fetch location then save to Firestore
        return fetchLocationInfo().then(function(loc) {
            var deviceEntry = {
                token: token,
                browser: device.browser,
                os: device.os,
                city: loc.city,
                region: loc.region,
                country: loc.country,
                ip: loc.ip,
                timezone: loc.timezone,
                createdAt: now,
                expiresAt: expires,
                lastUsed: now
            };

            return window.db.collection('usuarios').doc(uid).get().then(function(doc) {
                var existing = (doc.exists && doc.data().trustedDevices) || [];
                // Remove expired devices while we're at it
                var active = existing.filter(function(d) { return d.expiresAt > now; });
                active.push(deviceEntry);
                return window.db.collection('usuarios').doc(uid).update({ trustedDevices: active });
            });
        });
    }

    function updateDeviceLastUsed(uid) {
        try {
            var stored = JSON.parse(localStorage.getItem(getTrustKey(uid)));
            if (!stored || !stored.token) return;
            // Update lastUsed + refresh location in background
            fetchLocationInfo().then(function(loc) {
                return window.db.collection('usuarios').doc(uid).get().then(function(doc) {
                    if (!doc.exists) return;
                    var devices = doc.data().trustedDevices || [];
                    var updated = false;
                    devices.forEach(function(d) {
                        if (d.token === stored.token) {
                            d.lastUsed = Date.now();
                            d.city = loc.city;
                            d.region = loc.region;
                            d.country = loc.country;
                            d.ip = loc.ip;
                            d.timezone = loc.timezone;
                            updated = true;
                        }
                    });
                    if (updated) window.db.collection('usuarios').doc(uid).update({ trustedDevices: devices });
                });
            }).catch(function() { /* ignore location fetch failure */ });
        } catch (e) { /* ignore */ }
    }

    function revokeDevice(uid, token) {
        return window.db.collection('usuarios').doc(uid).get().then(function(doc) {
            if (!doc.exists) return;
            var devices = (doc.data().trustedDevices || []).filter(function(d) { return d.token !== token; });
            return window.db.collection('usuarios').doc(uid).update({ trustedDevices: devices });
        }).then(function() {
            // If we revoked our own device, clear localStorage
            try {
                var stored = JSON.parse(localStorage.getItem(getTrustKey(uid)));
                if (stored && stored.token === token) localStorage.removeItem(getTrustKey(uid));
            } catch (e) { /* ignore */ }
        });
    }

    function revokeAllDevices(uid) {
        return window.db.collection('usuarios').doc(uid).update({ trustedDevices: [] }).then(function() {
            localStorage.removeItem(getTrustKey(uid));
        });
    }

    function renderTrustedDevices() {
        var listEl = $('trustedDevicesList');
        var revokeAllBtn = $('btnRevokeAllDevices');
        if (!listEl) return;

        var user = window.auth.currentUser;
        if (!user) return;
        var uid = user.uid;

        window.db.collection('usuarios').doc(uid).get().then(function(doc) {
            if (!doc.exists) return;
            var devices = (doc.data().trustedDevices || []).filter(function(d) { return d.expiresAt > Date.now(); });

            if (!devices.length) {
                listEl.innerHTML = '<div style="text-align:center;color:var(--admin-text-muted);padding:0.75rem;font-size:0.85rem;">No hay dispositivos de confianza</div>';
                if (revokeAllBtn) revokeAllBtn.style.display = 'none';
                return;
            }

            // Check which is the current device
            var currentToken = null;
            try {
                var stored = JSON.parse(localStorage.getItem(getTrustKey(uid)));
                if (stored) currentToken = stored.token;
            } catch (e) { /* ignore */ }

            var icons = { Chrome: '🌐', Firefox: '🦊', Safari: '🧭', Edge: '🔷', Opera: '🔴', Desconocido: '💻' };
            var html = '';
            devices.sort(function(a, b) { return (b.lastUsed || b.createdAt) - (a.lastUsed || a.createdAt); });
            devices.forEach(function(d) {
                var isCurrent = d.token === currentToken;
                var icon = icons[d.browser] || icons.Desconocido;
                var daysLeft = Math.ceil((d.expiresAt - Date.now()) / (24 * 60 * 60 * 1000));
                var lastUsedStr = d.lastUsed ? new Date(d.lastUsed).toLocaleDateString('es-CO', { day:'numeric', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' }) : 'N/A';

                // Build location string
                var locationParts = [];
                if (d.city && d.city !== 'Desconocida') locationParts.push(AP.escapeHtml(d.city));
                if (d.region) locationParts.push(AP.escapeHtml(d.region));
                if (d.country) locationParts.push(AP.escapeHtml(d.country));
                var locationStr = locationParts.length ? locationParts.join(', ') : '';
                var ipStr = d.ip ? ' · IP: ' + AP.escapeHtml(d.ip) : '';

                html += '<div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--admin-border);">' +
                    '<div style="font-size:1.5rem;flex-shrink:0;">' + icon + '</div>' +
                    '<div style="flex:1;min-width:0;">' +
                        '<div style="font-weight:600;font-size:0.85rem;">' + AP.escapeHtml(d.browser) + ' en ' + AP.escapeHtml(d.os) +
                            (isCurrent ? ' <span style="color:var(--admin-success,#3fb950);font-size:0.75rem;font-weight:400;">(este dispositivo)</span>' : '') +
                        '</div>' +
                        (locationStr ? '<div style="font-size:0.75rem;color:var(--admin-text-muted);">📍 ' + locationStr + ipStr + '</div>' : '') +
                        '<div style="font-size:0.75rem;color:var(--admin-text-muted);">Ultimo uso: ' + lastUsedStr + ' · Expira en ' + daysLeft + ' dia' + (daysLeft !== 1 ? 's' : '') + '</div>' +
                    '</div>' +
                    '<button class="btn btn-ghost btn-sm" data-action="revokeDevice" data-token="' + d.token + '" style="color:var(--admin-danger);font-size:0.75rem;flex-shrink:0;">Revocar</button>' +
                '</div>';
            });

            listEl.innerHTML = html;
            if (revokeAllBtn) revokeAllBtn.style.display = devices.length > 1 ? '' : 'none';
        });
    }

    // Delegated click for revoke buttons
    var trustedDevicesListEl = $('trustedDevicesList');
    if (trustedDevicesListEl) {
        trustedDevicesListEl.addEventListener('click', function(e) {
            var btn = e.target.closest ? e.target.closest('[data-action="revokeDevice"]') : null;
            if (!btn) return;
            var token = btn.getAttribute('data-token');
            var uid = window.auth.currentUser ? window.auth.currentUser.uid : null;
            if (!uid || !token) return;
            btn.disabled = true;
            btn.textContent = '...';
            revokeDevice(uid, token).then(function() {
                AP.toast('Dispositivo revocado', 'success');
                renderTrustedDevices();
            }).catch(function() {
                AP.toast('Error al revocar', 'error');
                btn.disabled = false;
                btn.textContent = 'Revocar';
            });
        });
    }

    // Revoke all button
    var revokeAllBtn = $('btnRevokeAllDevices');
    if (revokeAllBtn) {
        revokeAllBtn.addEventListener('click', function() {
            if (!confirm('¿Revocar TODOS los dispositivos de confianza?\n\nEn el proximo inicio de sesion deberas verificar con SMS en todos los dispositivos.')) return;
            var uid = window.auth.currentUser ? window.auth.currentUser.uid : null;
            if (!uid) return;
            revokeAllBtn.disabled = true;
            revokeAllDevices(uid).then(function() {
                AP.toast('Todos los dispositivos revocados', 'success');
                renderTrustedDevices();
            }).catch(function() {
                AP.toast('Error al revocar', 'error');
            }).finally(function() {
                revokeAllBtn.disabled = false;
            });
        });
    }

    // ── 2FA Core ────────────────────────────────────────────
    function init2FARecaptcha() {
        if (_2faRecaptchaVerifier) return;
        _2faRecaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
            size: 'invisible',
            callback: function() { /* solved */ }
        });
    }

    function send2FACode(phoneNumber) {
        init2FARecaptcha();
        var provider = new firebase.auth.PhoneAuthProvider();
        return provider.verifyPhoneNumber(phoneNumber, _2faRecaptchaVerifier)
            .then(function(verificationId) {
                _2faVerificationId = verificationId;
                return verificationId;
            });
    }

    function show2FAScreen(user, phone) {
        _2faPendingUser = user;
        $('loginScreen').style.display = 'none';
        $('adminPanel').style.display = 'none';
        $('twoFaScreen').style.display = 'flex';
        $('twoFaCode').value = '';
        $('twoFaError').style.display = 'none';
        $('twoFaBtn').disabled = false;
        $('twoFaBtn').textContent = 'Verificar';
        var trustCheck = $('twoFaTrustDevice');
        if (trustCheck) trustCheck.checked = true;

        var masked = phone.slice(0, -4).replace(/./g, '*') + phone.slice(-4);
        $('twoFaInfo').textContent = 'Enviamos un codigo de verificacion al numero ' + masked;

        send2FACode(phone).then(function() {
            $('twoFaCode').focus();
        }).catch(function(err) {
            $('twoFaError').style.display = 'block';
            $('twoFaError').textContent = 'Error al enviar SMS: ' + err.message;
        });
    }

    function verify2FACode(code) {
        if (!_2faVerificationId) return Promise.reject(new Error('No verification ID'));
        var credential = firebase.auth.PhoneAuthProvider.credential(_2faVerificationId, code);
        return _2faPendingUser.updatePhoneNumber(credential);
    }

    function hide2FAScreen() {
        $('twoFaScreen').style.display = 'none';
        _2faVerificationId = null;
        _2faPendingUser = null;
    }

    // 2FA form submit
    var twoFaForm = $('twoFaForm');
    if (twoFaForm) {
        twoFaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var code = $('twoFaCode').value.trim();
            if (code.length !== 6) return;

            var pendingUser = _2faPendingUser;
            $('twoFaBtn').disabled = true;
            $('twoFaBtn').textContent = 'Verificando...';
            $('twoFaError').style.display = 'none';

            verify2FACode(code).then(function() {
                _2faVerified = true;

                // Save trusted device if checkbox is checked
                var trustCheck = $('twoFaTrustDevice');
                var shouldTrust = trustCheck && trustCheck.checked;
                var uid = pendingUser ? pendingUser.uid : (window.auth.currentUser ? window.auth.currentUser.uid : null);

                if (shouldTrust && uid) {
                    saveDeviceTrust(uid).catch(function(err) {
                        console.warn('[2FA] Error saving device trust:', err);
                    });
                }

                hide2FAScreen();
                loadUserProfile(pendingUser || window.auth.currentUser);
            }).catch(function(err) {
                $('twoFaBtn').disabled = false;
                $('twoFaBtn').textContent = 'Verificar';
                $('twoFaError').style.display = 'block';
                if (err.code === 'auth/invalid-verification-code') {
                    $('twoFaError').textContent = 'Codigo incorrecto. Intenta de nuevo.';
                } else if (err.code === 'auth/code-expired') {
                    $('twoFaError').textContent = 'Codigo expirado. Haz clic en "Reenviar codigo".';
                } else {
                    $('twoFaError').textContent = 'Error: ' + err.message;
                }
            });
        });
    }

    // Resend code
    var twoFaResend = $('twoFaResend');
    if (twoFaResend) {
        twoFaResend.addEventListener('click', function(e) {
            e.preventDefault();
            var profile = AP.currentUserProfile;
            if (!profile || !profile.telefono2FA) return;
            var phone = (profile.prefijo2FA || '+57') + profile.telefono2FA;
            twoFaResend.textContent = 'Enviando...';
            twoFaResend.style.pointerEvents = 'none';
            if (_2faRecaptchaVerifier) {
                _2faRecaptchaVerifier.clear();
                _2faRecaptchaVerifier = null;
            }
            send2FACode(phone).then(function() {
                twoFaResend.textContent = 'Codigo reenviado';
                setTimeout(function() {
                    twoFaResend.textContent = 'Reenviar codigo';
                    twoFaResend.style.pointerEvents = '';
                }, 5000);
            }).catch(function(err) {
                twoFaResend.textContent = 'Reenviar codigo';
                twoFaResend.style.pointerEvents = '';
                $('twoFaError').style.display = 'block';
                $('twoFaError').textContent = 'Error: ' + err.message;
            });
        });
    }

    // Cancel 2FA → sign out
    var twoFaCancel = $('twoFaCancel');
    if (twoFaCancel) {
        twoFaCancel.addEventListener('click', function(e) {
            e.preventDefault();
            hide2FAScreen();
            window.auth.signOut();
        });
    }

    // ========== SUPER ADMIN SELF-UNLOCK ==========
    var _unlockVerificationId = null;
    var _unlockPendingUser = null;
    var _unlockRecaptchaVerifier = null;

    function showSuperAdminUnlock(user) {
        _unlockPendingUser = user;
        $('loginScreen').style.display = 'none';
        $('adminPanel').style.display = 'none';
        $('twoFaScreen').style.display = 'none';
        $('unlockScreen').style.display = 'flex';
        $('unlockCode').value = '';
        $('unlockError').style.display = 'none';
        $('unlockBtn').disabled = false;
        $('unlockBtn').textContent = 'Desbloquear cuenta';

        var phone = (AP.currentUserProfile.prefijo2FA || '+57') + AP.currentUserProfile.telefono2FA;
        var masked = phone.slice(0, -4).replace(/./g, '*') + phone.slice(-4);
        $('unlockInfo').textContent = 'Tu cuenta fue bloqueada por seguridad. Enviamos un codigo de verificacion al numero ' + masked + ' para confirmar tu identidad.';

        sendUnlockCode(phone).then(function() {
            $('unlockCode').focus();
        }).catch(function(err) {
            $('unlockError').style.display = 'block';
            $('unlockError').textContent = 'Error al enviar SMS: ' + err.message;
        });
    }

    function sendUnlockCode(phoneNumber) {
        if (!_unlockRecaptchaVerifier) {
            _unlockRecaptchaVerifier = new firebase.auth.RecaptchaVerifier('unlock-recaptcha-container', {
                size: 'invisible',
                callback: function() { /* solved */ }
            });
        }
        var provider = new firebase.auth.PhoneAuthProvider();
        return provider.verifyPhoneNumber(phoneNumber, _unlockRecaptchaVerifier)
            .then(function(verificationId) {
                _unlockVerificationId = verificationId;
                return verificationId;
            });
    }

    function hideUnlockScreen() {
        $('unlockScreen').style.display = 'none';
        _unlockVerificationId = null;
        _unlockPendingUser = null;
    }

    // Unlock form submit
    var unlockForm = $('unlockForm');
    if (unlockForm) {
        unlockForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var code = $('unlockCode').value.trim();
            if (code.length !== 6) return;

            var pendingUser = _unlockPendingUser;
            $('unlockBtn').disabled = true;
            $('unlockBtn').textContent = 'Verificando...';
            $('unlockError').style.display = 'none';

            if (!_unlockVerificationId) {
                $('unlockError').style.display = 'block';
                $('unlockError').textContent = 'No hay codigo pendiente. Haz clic en reenviar.';
                $('unlockBtn').disabled = false;
                $('unlockBtn').textContent = 'Desbloquear cuenta';
                return;
            }

            var credential = firebase.auth.PhoneAuthProvider.credential(_unlockVerificationId, code);
            pendingUser.updatePhoneNumber(credential).then(function() {
                // Code verified — unblock in Firestore + clear loginAttempts
                var email = (AP.currentUserProfile && AP.currentUserProfile.email) || pendingUser.email;
                clearLoginAttempts(email);
                return unblockUser(pendingUser.uid);
            }).then(function() {
                hideUnlockScreen();
                AP.toast('Cuenta desbloqueada exitosamente', 'success');
                _2faVerified = true;
                loadUserProfile(pendingUser);
            }).catch(function(err) {
                $('unlockBtn').disabled = false;
                $('unlockBtn').textContent = 'Desbloquear cuenta';
                $('unlockError').style.display = 'block';
                if (err.code === 'auth/invalid-verification-code') {
                    $('unlockError').textContent = 'Codigo incorrecto. Intenta de nuevo.';
                } else if (err.code === 'auth/code-expired') {
                    $('unlockError').textContent = 'Codigo expirado. Haz clic en "Reenviar codigo".';
                } else {
                    $('unlockError').textContent = 'Error: ' + err.message;
                }
            });
        });
    }

    // Resend unlock code
    var unlockResend = $('unlockResend');
    if (unlockResend) {
        unlockResend.addEventListener('click', function(e) {
            e.preventDefault();
            if (!AP.currentUserProfile || !AP.currentUserProfile.telefono2FA) return;
            var phone = (AP.currentUserProfile.prefijo2FA || '+57') + AP.currentUserProfile.telefono2FA;
            unlockResend.textContent = 'Enviando...';
            unlockResend.style.pointerEvents = 'none';
            if (_unlockRecaptchaVerifier) {
                _unlockRecaptchaVerifier.clear();
                _unlockRecaptchaVerifier = null;
            }
            sendUnlockCode(phone).then(function() {
                unlockResend.textContent = 'Codigo reenviado';
                setTimeout(function() {
                    unlockResend.textContent = 'Reenviar codigo';
                    unlockResend.style.pointerEvents = '';
                }, 5000);
            }).catch(function(err) {
                unlockResend.textContent = 'Reenviar codigo';
                unlockResend.style.pointerEvents = '';
                $('unlockError').style.display = 'block';
                $('unlockError').textContent = 'Error: ' + err.message;
            });
        });
    }

    // Cancel unlock → sign out
    var unlockCancel = $('unlockCancel');
    if (unlockCancel) {
        unlockCancel.addEventListener('click', function(e) {
            e.preventDefault();
            hideUnlockScreen();
            window.auth.signOut();
        });
    }

    // ========== INACTIVITY TRACKING ==========
    function clearInactivityTimers() {
        if (AP.inactivityTimerId)  { clearTimeout(AP.inactivityTimerId);  AP.inactivityTimerId  = null; }
        if (AP.inactivityWarningId) { clearTimeout(AP.inactivityWarningId); AP.inactivityWarningId = null; }
    }

    function stopInactivityTracking() {
        clearInactivityTimers();
        if (!AP.inactivityTrackingActive) return;
        AP.ACTIVITY_EVENTS.forEach(function(ev) {
            document.removeEventListener(ev, resetInactivityTracking, true);
        });
        AP.inactivityTrackingActive = false;
    }

    function handleInactivityTimeout() {
        clearInactivityTimers();
        if (!window.auth || !window.auth.currentUser) return;
        AP.toast('Sesion cerrada por inactividad (30 minutos).', 'info');
        window.auth.signOut();
    }

    function resetInactivityTracking() {
        if (!AP.inactivityTrackingActive) return;
        clearInactivityTimers();
        // Aviso 1 minuto antes del cierre
        if (AP.INACTIVITY_TIMEOUT_MS > 60000) {
            AP.inactivityWarningId = setTimeout(function() {
                AP.toast('⚠️ Tu sesion se cerrara en 1 minuto por inactividad.', 'warning');
            }, AP.INACTIVITY_WARNING_MS);
        }
        AP.inactivityTimerId = setTimeout(handleInactivityTimeout, AP.INACTIVITY_TIMEOUT_MS);
    }

    function startInactivityTracking() {
        if (AP.inactivityTrackingActive) return;
        AP.ACTIVITY_EVENTS.forEach(function(ev) {
            document.addEventListener(ev, resetInactivityTracking, true);
        });
        AP.inactivityTrackingActive = true;
        resetInactivityTracking();
    }

    // ========== LOADING SCREEN ==========
    function hideLoadingScreen() {
        var el = $('authLoadingScreen');
        if (el) el.style.display = 'none';
    }

    // ========== AUTH INIT ==========
    function initAuth() {
        window.firebaseReady.then(function() {
            window.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                .catch(function(err) {
                    console.warn('[Auth] No se pudo aplicar persistence LOCAL:', err);
                })
                .finally(function() {
                    window.auth.onAuthStateChanged(function(user) {
                        hideLoadingScreen(); // siempre ocultar el spinner al resolver
                        if (user) {
                            if (isSessionExpired()) {
                                clearSessionStart();
                                AP.toast('Sesion expirada (8 horas). Inicia sesion de nuevo.', 'info');
                                window.auth.signOut();
                                return;
                            }
                            loadUserProfile(user);
                        } else {
                            AP.currentUserProfile = null;
                            AP.currentUserRole = null;
                            _2faVerified = false;
                            clearSessionStart();
                            stopInactivityTracking();
                            hide2FAScreen();
                            hideUnlockScreen();
                            showLogin();
                        }
                    });
                });
        });
    }

    var _2faVerified = false;

    // After block check passes, handle 2FA or go to admin
    function continueAfterBlockCheck(authUser) {
        if (AP.currentUserProfile.habilitado2FA && AP.currentUserProfile.telefono2FA && !_2faVerified) {
            if (isDeviceTrusted(authUser.uid, AP.currentUserProfile.trustedDevices)) {
                updateDeviceLastUsed(authUser.uid);
                showAdmin(authUser);
                return;
            }
            var phone = (AP.currentUserProfile.prefijo2FA || '+57') + AP.currentUserProfile.telefono2FA;
            show2FAScreen(authUser, phone);
            return;
        }
        _2faVerified = false;
        showAdmin(authUser);
    }

    // Network error detection for Firestore
    function isNetworkError(err) {
        if (!err) return false;
        var code = err.code || '';
        var msg = (err.message || '').toLowerCase();
        return code === 'unavailable'
            || code === 'deadline-exceeded'
            || msg.indexOf('network') !== -1
            || msg.indexOf('offline') !== -1
            || msg.indexOf('failed to get document') !== -1
            || msg.indexOf('err_internet') !== -1
            || msg.indexOf('err_network') !== -1;
    }

    var _profileRetryCount = 0;
    var _profileRetryMax = 3;

    function loadUserProfile(authUser) {
        window.db.collection('usuarios').doc(authUser.uid).get()
            .then(function(doc) {
                _profileRetryCount = 0; // reset on success
                if (!doc.exists) {
                    showAccessDenied(authUser.email, authUser.uid, 'No tienes perfil administrativo asignado. Un Super Admin debe crearlo.');
                    return;
                }

                AP.currentUserProfile = doc.data();
                AP.currentUserProfile._docId = doc.id;
                AP.currentUserRole = AP.currentUserProfile.rol;

                // Check if user is blocked (both usuarios doc AND loginAttempts collection)
                var userEmail = AP.currentUserProfile.email || authUser.email;
                var isBlockedInProfile = !!AP.currentUserProfile.bloqueado;

                checkFirestoreBlock(userEmail).then(function(laState) {
                    var isBlocked = isBlockedInProfile || laState.blocked;

                    if (isBlocked) {
                        if (AP.currentUserProfile.rol === 'super_admin' && AP.currentUserProfile.telefono2FA) {
                            showSuperAdminUnlock(authUser);
                        } else {
                            showAccessDenied(authUser.email, authUser.uid, 'Tu cuenta ha sido bloqueada por seguridad.\nComunicate con el administrador para desbloquearla.');
                        }
                        return;
                    }

                    continueAfterBlockCheck(authUser);
                });
            })
            .catch(function(err) {
                if (err.code === 'permission-denied') {
                    _profileRetryCount = 0;
                    showAccessDenied(authUser.email, authUser.uid, 'Las reglas de seguridad impiden leer tu perfil. Contacta al Super Admin.');
                } else if (isNetworkError(err) && _profileRetryCount < _profileRetryMax) {
                    // Network error — retry instead of signing out
                    _profileRetryCount++;
                    var delay = _profileRetryCount * 2000; // 2s, 4s, 6s
                    console.warn('[Auth] Error de red al cargar perfil (intento ' + _profileRetryCount + '/' + _profileRetryMax + '), reintentando en ' + (delay/1000) + 's...', err.message);
                    var errEl = $('loginError');
                    if (errEl) {
                        errEl.style.display = 'block';
                        errEl.style.whiteSpace = 'pre-line';
                        errEl.textContent = 'Problema de conexion. Reintentando... (' + _profileRetryCount + '/' + _profileRetryMax + ')';
                    }
                    setTimeout(function() { loadUserProfile(authUser); }, delay);
                } else {
                    _profileRetryCount = 0;
                    showAccessDenied(authUser.email, authUser.uid, 'Error al cargar perfil: ' + err.message + '\n\nVerifica tu conexion a internet e intenta de nuevo.');
                }
            });
    }

    function showAccessDenied(email, uid, reason) {
        stopInactivityTracking();
        stopPresence();
        clearSessionStart();
        resetLoginBtn();
        $('loginScreen').style.display = 'flex';
        $('adminPanel').style.display = 'none';
        var errEl = $('loginError');
        errEl.style.display = 'block';
        var msg = 'Acceso denegado para ' + email + '.';
        if (reason) msg += '\n' + reason;
        else        msg += '\nNo tienes un perfil de administrador.';
        msg += '\n\nContacta al Super Admin para obtener acceso.';
        errEl.style.whiteSpace = 'pre-line';
        errEl.textContent = msg;
        // Log UID only to console for debugging (never expose to UI)
        if (uid) console.log('[Auth] Access denied for UID:', uid);
        window.auth.signOut();
    }

    function showLogin() {
        stopInactivityTracking();
        AP.stopRealtimeSync();
        resetLoginBtn();
        $('loginScreen').style.display = 'flex';
        $('adminPanel').style.display = 'none';
        $('loginForm').reset();
        // Clear rate limit UI on fresh login screen (per-email check happens on submit)
        var rlEl = $('loginRateLimit');
        if (rlEl) rlEl.style.display = 'none';
        var errEl = $('loginError');
        if (errEl) errEl.style.display = 'none';
    }

    function showAdmin(user) {
        resetLoginBtn();
        $('loginScreen').style.display = 'none';
        $('adminPanel').style.display = 'flex';
        var rolLabel = AP.currentUserRole === 'super_admin' ? 'Super Admin' : AP.currentUserRole === 'editor' ? 'Editor' : 'Viewer';
        var userName = (AP.currentUserProfile && AP.currentUserProfile.nombre) || user.email.split('@')[0];
        $('adminEmail').textContent = user.email + ' (' + rolLabel + ')';

        // F7.2: Sidebar profile
        var profileEl = $('sidebarProfile');
        if (profileEl) {
            profileEl.style.display = '';
            var initials = userName.split(' ').map(function(w) { return w.charAt(0).toUpperCase(); }).slice(0, 2).join('');
            $('sidebarAvatar').textContent = initials;
            $('sidebarUserName').textContent = userName;
            $('sidebarUserRole').textContent = rolLabel;
        }

        // F7.4: Welcome message
        var welcomeEl = $('dashboardWelcome');
        if (welcomeEl) {
            var hour = new Date().getHours();
            var greeting = hour < 12 ? 'Buenos dias' : hour < 18 ? 'Buenas tardes' : 'Buenas noches';
            welcomeEl.textContent = greeting + ', ' + userName.split(' ')[0];
        }

        recordSessionStart();
        AP.writeAuditLog('login', 'sesion', user.email);
        startInactivityTracking();
        startPresence(user);
        applyRolePermissions();
        AP.loadData();
        loadActiveSessions();
        // Show trusted devices card only if 2FA is active for this user
        var tdCard = $('trustedDevicesCard');
        if (tdCard) {
            tdCard.style.display = (AP.currentUserProfile && AP.currentUserProfile.habilitado2FA) ? '' : 'none';
        }
        renderTrustedDevices();
    }

    // ========== F12.7: RTDB PRESENCE (ACTIVE SESSIONS) ==========
    // Heartbeat interval: update lastSeen every 2 minutes so stale detection works
    var PRESENCE_HEARTBEAT_MS = 2 * 60 * 1000;

    var PRESENCE_SESSION_KEY = 'altorra_presence_id';

    function startPresence(user) {
        if (!window.rtdb) {
            // RTDB not loaded yet, retry in 2s
            setTimeout(function() { startPresence(user); }, 2000);
            return;
        }
        // Guard: don't start presence if user is no longer signed in
        if (!window.auth.currentUser || window.auth.currentUser.uid !== user.uid) return;

        var uid = user.uid;
        var connectedRef = window.rtdb.ref('.info/connected');

        // Clean up any existing session and listeners before starting
        if (AP._presenceRef) {
            AP._presenceRef.remove().catch(function() {});
            AP._presenceRef = null;
        }
        if (AP._presenceConnectedRef) {
            AP._presenceConnectedRef.off();
        }
        if (AP._presenceHeartbeat) {
            clearInterval(AP._presenceHeartbeat);
            AP._presenceHeartbeat = null;
        }

        // Clean up previous session from this tab (survives page refresh via sessionStorage)
        try {
            var prevKey = sessionStorage.getItem(PRESENCE_SESSION_KEY);
            if (prevKey) {
                window.rtdb.ref('presence/' + prevKey).remove().catch(function() {});
            }
        } catch (e) { /* sessionStorage not available */ }

        // Create ONE session node for this device/tab (outside the reconnect listener)
        var presenceRef = window.rtdb.ref('presence').push();
        AP._presenceRef = presenceRef;
        AP._presenceConnectedRef = connectedRef;

        // Save push key so we can clean up on page refresh
        try { sessionStorage.setItem(PRESENCE_SESSION_KEY, presenceRef.key); }
        catch (e) { /* ignore */ }

        // Fetch location once for this session
        var device = getDeviceInfo();
        fetchLocationInfo().then(function(loc) {
            AP._presenceLocation = loc;
            AP._presenceDevice = device;
        }).catch(function() {
            AP._presenceLocation = { city: '', region: '', country: '', ip: '' };
            AP._presenceDevice = device;
        });

        connectedRef.on('value', function(snap) {
            if (snap.val() !== true) return;
            // Guard: verify user is still signed in before writing
            if (!window.auth.currentUser || window.auth.currentUser.uid !== uid) {
                connectedRef.off();
                AP._presenceConnectedRef = null;
                return;
            }
            var loc = AP._presenceLocation || {};
            var dev = AP._presenceDevice || device;
            var sessionData = {
                uid: uid,
                email: user.email,
                nombre: (AP.currentUserProfile && AP.currentUserProfile.nombre) || user.email.split('@')[0],
                rol: AP.currentUserRole || 'viewer',
                browser: dev.browser,
                os: dev.os,
                city: loc.city || '',
                region: loc.region || '',
                country: loc.country || '',
                ip: loc.ip || '',
                lastSeen: firebase.database.ServerValue.TIMESTAMP,
                online: true
            };
            // Re-register onDisconnect on every reconnect (Firebase clears it on disconnect)
            presenceRef.onDisconnect().remove();
            // Write/overwrite the SAME session node
            presenceRef.set(sessionData).catch(function(err) {
                console.warn('[Presence] Error updating presence:', err.message);
            });
        });

        // Heartbeat: keep lastSeen fresh so stale-session filter works
        AP._presenceHeartbeat = setInterval(function() {
            if (!window.auth.currentUser || window.auth.currentUser.uid !== uid) {
                clearInterval(AP._presenceHeartbeat);
                AP._presenceHeartbeat = null;
                return;
            }
            presenceRef.update({ lastSeen: firebase.database.ServerValue.TIMESTAMP }).catch(function() {});
        }, PRESENCE_HEARTBEAT_MS);

        // Fallback: clean up on page close (mobile browsers may not fire onDisconnect)
        AP._presenceBeforeUnload = function() {
            if (presenceRef) {
                // sendBeacon is not available for RTDB, so use synchronous remove
                try { presenceRef.remove(); } catch (e) { /* ignore */ }
            }
        };
        window.addEventListener('beforeunload', AP._presenceBeforeUnload);
    }

    function stopPresence() {
        // Stop heartbeat
        if (AP._presenceHeartbeat) {
            clearInterval(AP._presenceHeartbeat);
            AP._presenceHeartbeat = null;
        }
        // Stop listening for connection changes
        if (AP._presenceConnectedRef) {
            AP._presenceConnectedRef.off();
            AP._presenceConnectedRef = null;
        }
        // Stop listening for active sessions
        if (AP._activeSessionsRef) {
            AP._activeSessionsRef.off();
            AP._activeSessionsRef = null;
        }
        // Remove beforeunload listener
        if (AP._presenceBeforeUnload) {
            window.removeEventListener('beforeunload', AP._presenceBeforeUnload);
            AP._presenceBeforeUnload = null;
        }
        // Remove this session node (instant disappearance for other clients)
        if (AP._presenceRef) {
            AP._presenceRef.remove().catch(function() {});
            AP._presenceRef = null;
        }
        // Clear session key
        try { sessionStorage.removeItem(PRESENCE_SESSION_KEY); }
        catch (e) { /* ignore */ }
    }

    // Max age for a session to be considered "active" (5 minutes).
    // Safety net for sessions whose onDisconnect didn't fire cleanly.
    var PRESENCE_STALE_MS = 5 * 60 * 1000;

    function loadActiveSessions() {
        if (!window.rtdb) {
            // RTDB not loaded yet (deferred SDK), retry in 2s
            setTimeout(function() { loadActiveSessions(); }, 2000);
            return;
        }
        var listEl = $('activeSessionsList');
        if (!listEl) return;

        // Clean up previous listener if any
        if (AP._activeSessionsRef) {
            AP._activeSessionsRef.off();
        }

        var sessionsRef = window.rtdb.ref('presence').orderByChild('online').equalTo(true);
        AP._activeSessionsRef = sessionsRef;

        sessionsRef.on('value', function(snap) {
            var now = Date.now();
            var currentUid = window.auth.currentUser ? window.auth.currentUser.uid : null;
            var mySessionKey = AP._presenceRef ? AP._presenceRef.key : null;
            var sessions = [];
            snap.forEach(function(child) {
                var data = child.val();
                // Skip legacy nodes (old format without uid field)
                if (!data.uid) return;
                var isStale = data.lastSeen && (now - data.lastSeen) > PRESENCE_STALE_MS;
                var isMine = currentUid && data.uid === currentUid;
                // Remove stale sessions that belong to us (orphaned from closed tabs)
                if (isStale && isMine) {
                    child.ref.remove();
                    return;
                }
                // Hide stale sessions from other users (we can't delete those)
                if (isStale) return;
                sessions.push(Object.assign({ sessionKey: child.key }, data));
            });

            if (sessions.length === 0) {
                listEl.innerHTML = '<div style="text-align:center;color:var(--admin-text-muted);padding:1rem;font-size:0.85rem;">Nadie conectado</div>';
                return;
            }

            listEl.innerHTML = sessions.map(function(s) {
                var rolColors = { super_admin: 'admin-danger', editor: 'admin-info', viewer: 'admin-text-muted' };
                var rolLabel = s.rol === 'super_admin' ? 'Super Admin' : s.rol === 'editor' ? 'Editor' : 'Viewer';
                var nombre = AP.escapeHtml(s.nombre || s.email || '?');
                var initials = (s.nombre || '?').split(' ').map(function(w) { return w.charAt(0).toUpperCase(); }).slice(0, 2).join('');
                var isSelf = currentUid && s.uid === currentUid;

                // Build location + device line
                var detailParts = [];
                if (s.city) detailParts.push(AP.escapeHtml(s.city));
                if (s.country) detailParts.push(AP.escapeHtml(s.country));
                var locationStr = detailParts.length ? '📍 ' + detailParts.join(', ') : '';
                var deviceStr = s.browser ? AP.escapeHtml(s.browser) + '/' + AP.escapeHtml(s.os || '?') : '';
                var detailLine = [locationStr, deviceStr].filter(Boolean).join(' · ');

                return '<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--admin-border);">' +
                    '<div style="width:32px;height:32px;border-radius:50%;background:var(--admin-gold);color:#1a1a2e;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.75rem;">' + AP.escapeHtml(initials) + '</div>' +
                    '<div style="flex:1;min-width:0;">' +
                        '<div style="font-weight:600;font-size:0.85rem;">' + nombre + (isSelf ? ' <span style="font-size:0.7rem;color:var(--admin-text-muted);">(tu)</span>' : '') + '</div>' +
                        '<div style="font-size:0.75rem;color:var(--' + (rolColors[s.rol] || 'admin-text-muted') + ');">' + rolLabel + '</div>' +
                        (detailLine ? '<div style="font-size:0.7rem;color:var(--admin-text-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + detailLine + '</div>' : '') +
                    '</div>' +
                    '<div style="width:8px;height:8px;border-radius:50%;background:#3fb950;flex-shrink:0;" title="En linea"></div>' +
                '</div>';
            }).join('');
        }, function(err) {
            console.warn('[Presence] Error loading active sessions:', err.message);
            listEl.innerHTML = '<div style="text-align:center;color:var(--admin-text-muted);padding:1rem;font-size:0.85rem;">No se pudieron cargar las sesiones</div>';
        });
    }

    AP.startPresence = startPresence;
    AP.stopPresence = stopPresence;
    AP.renderTrustedDevices = renderTrustedDevices;
    AP.loadActiveSessions = loadActiveSessions;

    function applyRolePermissions() {
        var usersNav = document.querySelector('.nav-item[data-section="users"]');
        if (usersNav) usersNav.style.display = AP.canManageUsers() ? '' : 'none';
        var btnAddVehicle = $('btnAddVehicle');
        var btnAddBrand   = $('btnAddBrand');
        if (btnAddVehicle) btnAddVehicle.style.display = AP.canCreateOrEditInventory() ? '' : 'none';
        if (btnAddBrand)   btnAddBrand.style.display   = AP.canCreateOrEditInventory() ? '' : 'none';
    }

    // ========== LOGIN FORM ==========
    function resetLoginBtn() {
        var btn = $('loginBtn');
        btn.disabled = false;
        btn.innerHTML = 'Iniciar Sesion';
    }

    function updateRateLimitUI(email) {
        var rateLimitEl = $('loginRateLimit');
        if (!rateLimitEl) return;
        if (!email) { rateLimitEl.style.display = 'none'; return; }
        checkFirestoreBlock(email).then(function(state) {
            if (state.blocked) {
                rateLimitEl.style.display = 'block';
                rateLimitEl.textContent = 'Esta cuenta ha sido bloqueada por seguridad. Comunicate con el administrador.';
            } else if (state.attempts > 0) {
                rateLimitEl.style.display = 'block';
                rateLimitEl.textContent = 'Intentos fallidos: ' + state.attempts + '/' + RL_MAX_ATTEMPTS + '. Siguiente bloqueo tras ' + (RL_MAX_ATTEMPTS - state.attempts) + ' intento(s) mas.';
            } else {
                rateLimitEl.style.display = 'none';
            }
        });
    }

    // Update rate limit UI when email field changes
    var loginEmailField = $('loginEmail');
    if (loginEmailField) {
        loginEmailField.addEventListener('blur', function() {
            updateRateLimitUI(this.value.trim());
        });
    }

    // Mostrar/ocultar contraseña
    var togglePasswordBtn = $('togglePasswordBtn');
    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', function() {
            var input = $('loginPassword');
            var isHidden = input.type === 'password';
            input.type = isHidden ? 'text' : 'password';
            togglePasswordBtn.setAttribute('aria-label', isHidden ? 'Ocultar contrasena' : 'Mostrar contrasena');
            togglePasswordBtn.querySelector('svg').style.opacity = isHidden ? '0.5' : '1';
        });
    }

    $('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();

        // Honeypot: si el campo oculto tiene contenido, es un bot
        var honeypot = $('loginHoneypot');
        if (honeypot && honeypot.value) return;

        var email   = $('loginEmail').value.trim();
        var pass    = $('loginPassword').value;
        var errEl   = $('loginError');
        var btn     = $('loginBtn');
        if (!email || !pass) return;

        btn.disabled = true;
        btn.innerHTML = '<span class="btn-spinner"></span> Verificando...';
        errEl.style.display = 'none';

        // Step 1: Check Firestore for cross-device block BEFORE attempting auth
        window.firebaseReady.then(function() {
            return checkFirestoreBlock(email);
        }).then(function(state) {
            if (state.blocked) {
                resetLoginBtn();
                errEl.style.display = 'block';
                errEl.textContent = 'Cuenta bloqueada por seguridad. Comunicate con el administrador para desbloquear tu acceso.';
                updateRateLimitUI(email);
                return Promise.reject({ _handled: true });
            }
            // Step 2: Not blocked — attempt Firebase Auth
            btn.innerHTML = '<span class="btn-spinner"></span> Ingresando...';
            return window.auth.signInWithEmailAndPassword(email, pass);
        }).then(function() {
            // Login successful — clear attempts in Firestore
            clearLoginAttempts(email);
        }).catch(function(error) {
            if (error && error._handled) return; // already handled above
            resetLoginBtn();
            errEl.style.display = 'block';
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                recordFailedAttempt(email).then(function(failCount) {
                    if (failCount >= RL_MAX_ATTEMPTS) {
                        errEl.textContent = 'Cuenta bloqueada por seguridad. Comunicate con el administrador.';
                        // Also block in usuarios collection (will succeed after admin logs in and syncs)
                    } else {
                        errEl.textContent = 'Correo o contrasena incorrectos. Intento ' + failCount + ' de ' + RL_MAX_ATTEMPTS + '.';
                    }
                    updateRateLimitUI(email);
                });
            } else if (error.code === 'auth/too-many-requests') {
                errEl.textContent = 'Firebase ha bloqueado temporalmente este dispositivo por demasiados intentos. Espera unos minutos antes de intentar de nuevo.';
            } else if (error.code === 'auth/network-request-failed') {
                errEl.textContent = 'Sin conexion a internet. Verifica tu red.';
            } else {
                errEl.textContent = 'Error: ' + error.message;
            }
        });
    });

    // F7.1: Password reset
    var forgotLink = $('forgotPasswordLink');
    if (forgotLink) {
        forgotLink.addEventListener('click', function(e) {
            e.preventDefault();
            var email = $('loginEmail').value.trim();
            var msgEl = $('forgotPasswordMsg');
            if (!email) {
                msgEl.style.display = 'block';
                msgEl.style.color = 'var(--admin-warning)';
                msgEl.textContent = 'Ingresa tu correo electronico arriba primero.';
                $('loginEmail').focus();
                return;
            }
            forgotLink.style.pointerEvents = 'none';
            forgotLink.textContent = 'Enviando...';
            window.firebaseReady.then(function() {
                return window.auth.sendPasswordResetEmail(email);
            }).then(function() {
                msgEl.style.display = 'block';
                msgEl.style.color = 'var(--admin-success,#3fb950)';
                msgEl.textContent = 'Correo de restablecimiento enviado a ' + email + '. Revisa tu bandeja de entrada.';
            }).catch(function(err) {
                msgEl.style.display = 'block';
                msgEl.style.color = 'var(--admin-danger)';
                if (err.code === 'auth/user-not-found') {
                    msgEl.textContent = 'No existe una cuenta con ese correo.';
                } else if (err.code === 'auth/invalid-email') {
                    msgEl.textContent = 'Correo electronico invalido.';
                } else {
                    msgEl.textContent = 'Error: ' + err.message;
                }
            }).finally(function() {
                forgotLink.style.pointerEvents = '';
                forgotLink.textContent = '¿Olvidaste tu contrasena?';
            });
        });
    }

    $('logoutBtn').addEventListener('click', function() {
        clearSessionStart();
        stopPresence();
        _2faVerified = false;
        window.firebaseReady.then(function() { window.auth.signOut(); });
    });

    // ========== CHANGE PASSWORD ==========
    $('changePasswordForm').addEventListener('submit', function(e) {
        e.preventDefault();
        var currentUser = window.auth.currentUser;
        if (!currentUser || !currentUser.email) {
            AP.toast('Sesion invalida. Inicia sesion de nuevo.', 'error');
            window.auth.signOut();
            return;
        }
        var newPass = $('newPassword').value;
        var currentPass = window.prompt('Para cambiar la contrasena, confirma tu contrasena actual:');
        if (!currentPass) { AP.toast('Cambio de contrasena cancelado.', 'info'); return; }

        var credential = firebase.auth.EmailAuthProvider.credential(currentUser.email, currentPass);
        currentUser.reauthenticateWithCredential(credential)
            .then(function() { return currentUser.updatePassword(newPass); })
            .then(function() { AP.toast('Contrasena actualizada'); $('newPassword').value = ''; })
            .catch(function(err) {
                if (err && (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential')) {
                    AP.toast('Contrasena actual incorrecta.', 'error');
                } else {
                    AP.toast('Error: ' + (err && err.message ? err.message : 'No se pudo cambiar la contrasena.'), 'error');
                }
            });
    });

    // ========== MOBILE MENU ==========
    var hamburgerBtn    = $('hamburgerBtn');
    var sidebar         = $('adminSidebar');
    var sidebarOverlay  = $('sidebarOverlay');

    function closeMobileMenu() {
        sidebar.classList.remove('open');
        hamburgerBtn.classList.remove('active');
        sidebarOverlay.classList.remove('active');
    }

    if (hamburgerBtn) hamburgerBtn.addEventListener('click', function() {
        var isOpen = sidebar.classList.toggle('open');
        hamburgerBtn.classList.toggle('active', isOpen);
        hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
        sidebarOverlay.classList.toggle('active', isOpen);
    });
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeMobileMenu);
    var mobileLogoutBtn = $('mobileLogoutBtn');
    if (mobileLogoutBtn) mobileLogoutBtn.addEventListener('click', function() {
        clearSessionStart();
        if (window.auth) window.auth.signOut();
    });

    // ========== NAVIGATION ==========
    document.querySelectorAll('.nav-item[data-section]').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var section = this.getAttribute('data-section');
            if (section === 'users' && !AP.canManageUsers()) {
                AP.toast('No tienes permisos para acceder a esta seccion', 'error');
                return;
            }
            document.querySelectorAll('.nav-item').forEach(function(n) { n.classList.remove('active'); });
            this.classList.add('active');
            document.querySelectorAll('.section').forEach(function(s) { s.classList.remove('active'); });
            $('sec-' + section).classList.add('active');
            // F8.3: Mark citas visit timestamp
            if (section === 'appointments') {
                localStorage.setItem('ac_citas_last_visit', String(Date.now()));
                var aBadge = $('navBadgeAppointments');
                if (aBadge) { aBadge.textContent = ''; aBadge.classList.remove('badge-unread'); }
            }
            closeMobileMenu();
        });
    });

    // F8.1: Quick actions + F8.2: Clickable stats
    function navigateToSection(section) {
        document.querySelectorAll('.nav-item').forEach(function(n) { n.classList.remove('active'); });
        var navBtn = document.querySelector('.nav-item[data-section="' + section + '"]');
        if (navBtn) navBtn.classList.add('active');
        document.querySelectorAll('.section').forEach(function(s) { s.classList.remove('active'); });
        var sec = $('sec-' + section);
        if (sec) sec.classList.add('active');
        if (section === 'appointments') {
            localStorage.setItem('ac_citas_last_visit', String(Date.now()));
            var aBadge = $('navBadgeAppointments');
            if (aBadge) { aBadge.textContent = ''; aBadge.classList.remove('badge-unread'); }
        }
        closeMobileMenu();
    }
    AP.navigateToSection = navigateToSection;

    var quickActionsEl = $('quickActions');
    if (quickActionsEl) {
        quickActionsEl.addEventListener('click', function(e) {
            var btn = AP.closestAction(e);
            if (!btn) return;
            var action = btn.getAttribute('data-action');
            if (action === 'quickNewVehicle') {
                navigateToSection('vehicles');
                setTimeout(function() { var addBtn = $('btnAddVehicle'); if (addBtn) addBtn.click(); }, 150);
            } else if (action === 'quickGoTo') {
                navigateToSection(btn.getAttribute('data-section'));
            }
        });
    }

    // F8.2: Clickable stat cards
    var statsGrid = document.querySelector('.stats-grid');
    if (statsGrid) {
        var statMap = {
            'statTotal': 'vehicles', 'statNuevos': 'vehicles', 'statUsados': 'vehicles',
            'statOfertas': 'vehicles', 'statDestacados': 'vehicles', 'statMarcas': 'brands',
            'statVendidos': 'vehicles', 'statCitas': 'appointments'
        };
        statsGrid.addEventListener('click', function(e) {
            var _el = e.target.nodeType === 1 ? e.target : e.target.parentElement;
            var card = _el && _el.closest ? _el.closest('.stat-card') : null;
            if (!card) return;
            var valueEl = card.querySelector('.stat-value');
            if (!valueEl) return;
            var section = statMap[valueEl.id];
            if (section) navigateToSection(section);
        });
        statsGrid.style.cursor = 'pointer';
    }

    // ========== COLLAPSIBLE FORM SECTIONS ==========
    document.querySelectorAll('.form-section-title[data-toggle]').forEach(function(title) {
        title.addEventListener('click', function() {
            var targetId = this.getAttribute('data-toggle');
            var body = $(targetId);
            if (body) {
                body.classList.toggle('open');
                this.classList.toggle('collapsed');
            }
        });
    });

    // ========== F10.1: KEYBOARD SHORTCUTS ==========
    document.addEventListener('keydown', function(e) {
        // Only active when admin panel is visible
        if (!AP.currentUser) return;

        // Esc = close active modal
        if (e.key === 'Escape') {
            var activeModal = document.querySelector('.modal-overlay.active');
            if (activeModal) {
                e.preventDefault();
                var closeBtn = activeModal.querySelector('.modal-close');
                if (closeBtn) closeBtn.click();
            }
            return;
        }

        // Ctrl+S / Cmd+S = save in active modal
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            var modal = document.querySelector('.modal-overlay.active');
            if (modal) {
                e.preventDefault();
                var saveBtn = modal.querySelector('.btn-primary[id*="save"], .btn-primary[id*="Save"]');
                if (saveBtn && !saveBtn.disabled) saveBtn.click();
            }
            return;
        }

        // Ctrl+N / Cmd+N = new vehicle (only when no modal is open)
        if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
            var openModal = document.querySelector('.modal-overlay.active');
            if (!openModal) {
                e.preventDefault();
                var addBtn = $('btnAddVehicle');
                if (addBtn && addBtn.offsetParent !== null) addBtn.click();
            }
            return;
        }
    });

    // ========== EXPOSE ==========
    AP.initAuth              = initAuth;
    AP.stopInactivityTracking = stopInactivityTracking;

    // F11.7: Sync aria-required with required attribute
    document.querySelectorAll('[required]').forEach(function(el) {
        el.setAttribute('aria-required', 'true');
    });

    // Arrancar auth (rate limit UI se actualiza per-email al hacer submit)
    initAuth();
})();
