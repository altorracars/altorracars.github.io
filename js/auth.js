// ============================================================
//  AUTH.JS — Autenticación de Usuarios Públicos — Altorra Cars
//  Fase A1: Login · Registro · Google · Reset Password
//
//  SEGURIDAD: Los usuarios registrados aquí usan Firebase Auth
//  pero NO tienen documento en la colección `usuarios` (admin).
//  El panel admin verifica esa colección y muestra "Acceso
//  denegado" a cualquiera que no sea un admin registrado.
//  Los usuarios públicos se guardan en `clientes/{uid}` (Fase A2).
// ============================================================

(function () {
    'use strict';

    // ── Estado ──────────────────────────────────────────────
    var _modalLoaded = false;
    var _currentUser = null;
    var _explicitLogout = false; // true when user explicitly logs out

    // ── Helpers de UI ───────────────────────────────────────
    function $id(id) { return document.getElementById(id); }

    function showMsg(elId, text, type) {
        var el = $id(elId);
        if (!el) return;
        el.textContent = text;
        el.className = 'auth-message show is-' + type;
        el.style.display = 'block';
    }

    function hideMsg(elId) {
        var el = $id(elId);
        if (!el) return;
        el.className = 'auth-message';
        el.style.display = 'none';
    }

    function setLoading(btnId, loading) {
        var btn = $id(btnId);
        if (!btn) return;
        btn.disabled = loading;
        if (loading) {
            btn.dataset._origHtml = btn.innerHTML;
            btn.innerHTML = '<span class="auth-spinner"></span>';
        } else if (btn.dataset._origHtml) {
            btn.innerHTML = btn.dataset._origHtml;
        }
    }

    // ── Firebase error → mensaje amigable ──────────────────
    function friendlyError(err) {
        var code = err && err.code ? err.code : '';
        switch (code) {
            case 'auth/user-not-found':
            case 'auth/wrong-password':
            case 'auth/invalid-credential':
                return 'Correo o contraseña incorrectos.';
            case 'auth/email-already-in-use':
                return 'Ya existe una cuenta con este correo. Intenta ingresar.';
            case 'auth/weak-password':
                return 'La contraseña es muy débil. Usa al menos 6 caracteres.';
            case 'auth/invalid-email':
                return 'El formato del correo no es válido.';
            case 'auth/too-many-requests':
                return 'Demasiados intentos. Espera unos minutos antes de intentar de nuevo.';
            case 'auth/network-request-failed':
                return 'Sin conexión a internet. Verifica tu red.';
            case 'auth/popup-closed-by-user':
                return 'Cerraste la ventana de Google antes de completar el acceso.';
            case 'auth/cancelled-popup-request':
                return '';   // silencioso — usuario canceló
            case 'auth/popup-blocked':
                return 'Tu navegador bloqueó la ventana emergente. Permite ventanas emergentes para este sitio.';
            case 'auth/account-exists-with-different-credential':
                return 'Este correo ya está registrado con otro método. Inicia sesión con tu contraseña.';
            case 'auth/operation-not-allowed':
                return 'El inicio de sesión con Google no está disponible en este momento. Por favor, usa correo y contraseña.';
            default:
                return err && err.message ? err.message : 'Ocurrió un error inesperado.';
        }
    }

    // ── Calcular fuerza de contraseña ──────────────────────
    function passwordStrength(pass) {
        if (!pass || pass.length < 4) return { score: 0, label: '', color: '' };
        var score = 0;
        if (pass.length >= 8)  score++;
        if (pass.length >= 12) score++;
        if (/[A-Z]/.test(pass)) score++;
        if (/[0-9]/.test(pass)) score++;
        if (/[^A-Za-z0-9]/.test(pass)) score++;
        if (score <= 1) return { score: 20,  label: 'Muy débil',  color: '#d93025' };
        if (score === 2) return { score: 40,  label: 'Débil',      color: '#e67c22' };
        if (score === 3) return { score: 65,  label: 'Regular',    color: '#f0ad00' };
        if (score === 4) return { score: 85,  label: 'Fuerte',     color: '#22a06b' };
        return                  { score: 100, label: 'Muy fuerte', color: '#158a50' };
    }

    // ── Toggle visibilidad contraseña ──────────────────────
    function wireTogglePass(btnId, inputId) {
        var btn = $id(btnId);
        var inp = $id(inputId);
        if (!btn || !inp) return;
        btn.addEventListener('click', function () {
            var show = inp.type === 'password';
            inp.type = show ? 'text' : 'password';
            var icon = btn.querySelector('[data-lucide]');
            if (icon) {
                icon.setAttribute('data-lucide', show ? 'eye-off' : 'eye');
                if (window.lucide) window.lucide.createIcons({ nodes: [icon] });
            }
        });
    }

    // ── Modal: abrir / cerrar ──────────────────────────────
    function openAuthModal(tab) {
        var modal = $id('auth-modal');
        if (!modal) return;
        modal.classList.remove('closing'); // reset close animation if mid-flight
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (tab) switchTab(tab);

        // Pre-fill last successful email — returning users only need to
        // type their password. GitHub/Stripe pattern.
        try {
            var lastEmail = localStorage.getItem('altorra_last_email');
            if (lastEmail) {
                var loginEmail = $id('loginEmail');
                if (loginEmail && !loginEmail.value) loginEmail.value = lastEmail;
            }
        } catch (e) {}

        // Show offline banner if applicable
        _updateOfflineBanner();

        // Focus first empty visible field (skip pre-filled email)
        setTimeout(function () {
            var inputs = modal.querySelectorAll('.auth-panel.active input:not([type="checkbox"])');
            for (var i = 0; i < inputs.length; i++) {
                if (!inputs[i].value) { inputs[i].focus(); return; }
            }
            // All filled? Focus the first
            if (inputs[0]) inputs[0].focus();
        }, 180);
    }

    function closeAuthModal() {
        var modal = $id('auth-modal');
        if (!modal || !modal.classList.contains('active')) return;

        // Smooth close animation: fade out container + overlay before
        // removing .active. CSS handles the actual transition.
        modal.classList.add('closing');
        setTimeout(function () {
            modal.classList.remove('active');
            modal.classList.remove('closing');
            document.body.style.overflow = '';
            // Limpiar mensajes
            ['loginMessage', 'registerMessage', 'resetMessage'].forEach(hideMsg);
            // Limpiar SOLO los campos sensibles (passwords) — preservar email
            // para que un cierre accidental no force re-typing
            ['loginPassword', 'regPassword', 'regConfirm'].forEach(function (id) {
                var el = $id(id);
                if (el) { el.value = ''; el.classList.remove('is-error'); }
            });
            // Reset strength bar
            var fill = $id('passStrengthFill');
            var lbl  = $id('passStrengthLabel');
            if (fill) { fill.style.width = '0'; fill.style.background = ''; }
            if (lbl)  { lbl.textContent = ''; lbl.style.color = ''; }
            // Reset auth controls lock — ensures next modal open has
            // enabled buttons even if a prior operation didn't unlock
            // (e.g. modal closed mid-Google-flow on success path)
            _lockAuthControls(false);
        }, 180); // matches CSS transition
    }

    // ── Offline banner inside modal ─────────────────────────────
    // Shows a subtle warning at the top of the modal when navigator.onLine
    // is false. Auth operations will fail without network — better to warn
    // upfront than show a cryptic "auth/network-request-failed" later.
    function _updateOfflineBanner() {
        var modal = $id('auth-modal');
        if (!modal) return;
        var existing = modal.querySelector('.auth-offline-banner');
        if (!navigator.onLine) {
            if (!existing) {
                var banner = document.createElement('div');
                banner.className = 'auth-offline-banner';
                banner.innerHTML = '<i data-lucide="wifi-off"></i> Sin conexión a internet. Algunas funciones no estarán disponibles.';
                var container = modal.querySelector('.auth-modal-container');
                if (container) container.insertBefore(banner, container.firstChild);
                if (window.lucide) window.lucide.createIcons({ nodes: [banner] });
            }
        } else if (existing) {
            existing.remove();
        }
    }

    function switchTab(tab) {
        ['login', 'register'].forEach(function (t) {
            var btn   = $id('tab' + capitalize(t));
            var panel = $id('panel' + capitalize(t));
            var isActive = t === tab;
            if (btn)   { btn.classList.toggle('active', isActive);   btn.setAttribute('aria-selected', isActive); }
            if (panel) { panel.classList.toggle('active', isActive); }
        });
        var resetPanel = $id('panelReset');
        if (resetPanel) resetPanel.classList.remove('active');
        var tabs = $id('auth-tabs');
        if (tabs) tabs.style.display = '';
    }

    function showResetPanel() {
        ['panelLogin', 'panelRegister'].forEach(function (id) {
            var el = $id(id);
            if (el) el.classList.remove('active');
        });
        var tabs = $id('auth-tabs');
        if (tabs) tabs.style.display = 'none';
        var resetPanel = $id('panelReset');
        if (resetPanel) resetPanel.classList.add('active');
        // Pre-fill email if typed
        var loginEmail = $id('loginEmail');
        var resetEmail = $id('resetEmail');
        if (loginEmail && resetEmail && loginEmail.value) {
            resetEmail.value = loginEmail.value;
        }
        setTimeout(function () {
            var el = $id('resetEmail'); if (el) el.focus();
        }, 80);
    }

    function capitalize(str) { return str.charAt(0).toUpperCase() + str.slice(1); }

    // toast.js exposes a global `toast` (ToastManager instance) with methods:
    //   toast.success(msg), toast.error(msg), toast.info(msg), toast.show(msg, type, title, duration)
    // There is NO global `showToast` function.
    function _toast(message, type, duration) {
        if (typeof toast !== 'undefined' && toast && toast.show) {
            var t = (type === 'warn') ? 'error' : (type || 'info');
            toast.show(message, t, '', duration || 4500);
            return;
        }
    }

    // ── Auth controls lock/unlock during in-flight operations ──────
    // Disables ALL form submit buttons + Google buttons while an auth
    // operation is in flight. Prevents:
    //   - Double-click submitting login twice
    //   - Clicking Google while email login is in progress (or vice versa)
    //   - Clicking buttons during the post-popup processing window
    // The visual state mirrors the disabled state via CSS pointer-events.
    function _lockAuthControls(locked) {
        var ids = [
            'loginSubmitBtn', 'registerSubmitBtn', 'resetSubmitBtn',
            'loginGoogleBtn', 'registerGoogleBtn'
        ];
        ids.forEach(function (id) {
            var btn = $id(id);
            if (!btn) return;
            btn.disabled = locked;
            btn.classList.toggle('is-locked', locked);
        });
        // Also lock tab buttons + close button to prevent navigating away
        // mid-operation (which would orphan the auth flow)
        var tabs = ['tabLogin', 'tabRegister', 'authForgotLink', 'authBackFromReset'];
        tabs.forEach(function (id) {
            var el = $id(id);
            if (el) el.style.pointerEvents = locked ? 'none' : '';
        });
    }

    // ── Pre-apply auth hint synchronously for instant header update ──
    // Called the INSTANT we know auth succeeded (from popup result or
    // signInWithEmailAndPassword resolution) — BEFORE waiting for
    // onAuthStateChanged to fire. Updates localStorage + <html> class +
    // the cached snapshot so:
    //   - The auth-hint CSS rules immediately hide login/register buttons
    //   - components.js's pre-render path (on next nav) shows the avatar
    //     instantly
    //   - The page header avatar pop-in delay is eliminated
    // Apple/Stripe pattern: optimistic UI before the SDK acknowledges.
    function _preApplyAuthHint(user) {
        if (!user) return;
        try {
            localStorage.setItem('altorra_auth_hint', 'authenticated');
            localStorage.setItem('altorra_auth_user_snap', JSON.stringify({
                name: user.displayName || (user.email ? user.email.split('@')[0] : ''),
                photoURL: user.photoURL || ''
            }));
        } catch (e) { /* private mode */ }
        var rootEl = document.documentElement;
        rootEl.classList.remove('auth-guest');
        rootEl.classList.add('auth-authenticated');
    }

    // ── Pre-apply guest hint for instant header revert on logout ──
    function _preApplyGuestHint() {
        try {
            localStorage.setItem('altorra_auth_hint', 'guest');
            localStorage.removeItem('altorra_auth_user_snap');
        } catch (e) {}
        var rootEl = document.documentElement;
        rootEl.classList.remove('auth-authenticated');
        rootEl.classList.add('auth-guest');
    }

    // ── Persist last successful email for pre-fill on next visit ────
    // Returning users see their email pre-filled in the login form —
    // they only need to type the password. Pattern used by GitHub,
    // Stripe, Booking.com, Vercel.
    function _persistLastEmail(email) {
        if (!email) return;
        try { localStorage.setItem('altorra_last_email', email); } catch (e) {}
    }

    // ── Shake animation on auth error ───────────────────────────────
    // Subtle visual feedback when login/register fails. CSS class
    // applied + removed after animation duration. Pattern: Stripe,
    // Apple iCloud, Microsoft Account.
    function _shakeModal() {
        var container = document.querySelector('.auth-modal-container');
        if (!container) return;
        container.classList.remove('shake'); // reset for re-trigger
        // Force reflow so the animation re-plays even on consecutive errors
        // eslint-disable-next-line no-unused-expressions
        container.offsetWidth;
        container.classList.add('shake');
        setTimeout(function () { container.classList.remove('shake'); }, 500);
        // Optional haptic feedback on mobile
        if (navigator.vibrate) navigator.vibrate(80);
    }

    // ── Save credentials to browser password manager (modern API) ───
    // After successful login/register with email+password, suggest the
    // browser save the credentials. Most modern browsers will prompt
    // the user "Save password?" without us having to do anything via
    // form submit detection. This API gives us programmatic control —
    // useful when forms aren't traditional HTML submits.
    // Falls back silently if API not supported (e.g. Firefox <114).
    function _saveCredential(email, password) {
        if (!email || !password) return;
        if (!('credentials' in navigator) || typeof window.PasswordCredential !== 'function') {
            return; // unsupported — browser may still prompt natively
        }
        try {
            var cred = new window.PasswordCredential({
                id: email,
                password: password,
                name: email
            });
            navigator.credentials.store(cred).catch(function () {
                // User declined or quota — silent
            });
        } catch (e) { /* type error in old browsers */ }
    }

    // ── Login con email/password ────────────────────────────
    function handleLogin(e) {
        e.preventDefault();
        hideMsg('loginMessage');
        var email = ($id('loginEmail').value || '').trim();
        var pass  = ($id('loginPassword').value || '');
        if (!email || !pass) {
            showMsg('loginMessage', 'Completa todos los campos.', 'error');
            // Auto-focus first empty field
            var emptyField = !email ? $id('loginEmail') : $id('loginPassword');
            if (emptyField) emptyField.focus();
            _shakeModal();
            return;
        }
        if (!navigator.onLine) {
            showMsg('loginMessage', 'Sin conexión a internet. Verifica tu red.', 'error');
            _shakeModal();
            return;
        }
        _lockAuthControls(true);
        setLoading('loginSubmitBtn', true);
        window.firebaseReady.then(function () {
            // Login flow: ALWAYS sign in directly with the credentials.
            //
            // We used to try `linkWithCredential` first to upgrade any current
            // anonymous session into the new account (preserving favoritos /
            // historial). That had two serious problems:
            //   1. For users who already had an account (the common case),
            //      the link attempt fails with auth/credential-already-in-use
            //      and the Firebase SDK logs a red `POST accounts:signUp 400`
            //      in the console before the fallback runs. Looks like the
            //      login broke even when it actually succeeded.
            //   2. For a user who mistyped their email, the link would
            //      SILENTLY CREATE a new account with the typo'd email —
            //      because linkWithCredential on a non-existent email just
            //      registers. That's a foot-gun hiding inside the login form.
            //
            // Registration still uses createUserWithEmailAndPassword in
            // handleRegister(), which is the correct place to create accounts.
            // Merging anonymous favoritos/historial into an existing account
            // on login is complex and isn't currently wired up anywhere — so
            // dropping the anonymous data on login is the honest behavior.
            return window.auth.signInWithEmailAndPassword(email, pass);
        }).then(function () {
            // Pre-apply auth state INSTANTLY for snappy header switch
            var u = window.auth.currentUser;
            if (u) _preApplyAuthHint(u);

            // Close modal immediately — don't wait for the Firestore profile write.
            // The profile save runs in background; user sees the close happen instantly.
            closeAuthModal();
            _toast('¡Bienvenido de vuelta!', 'success');

            // Persist email for next-visit pre-fill + offer browser to save credentials
            _persistLastEmail(email);
            _saveCredential(email, pass);

            if (!u || u.isAnonymous) return;
            // Check if this is an admin account — don't create clientes/ doc for admins
            return window.db.collection('usuarios').doc(u.uid).get().then(function (doc) {
                if (doc.exists) {
                    // Admin logging in from public web — just let onAuthStateChanged handle header
                    return;
                }
                return saveClientProfile(u.uid, {
                    nombre: u.displayName || '',
                    email:  u.email || email
                });
            }).catch(function () {
                // On error checking, save profile anyway (fail-open)
                return saveClientProfile(u.uid, {
                    nombre: u.displayName || '',
                    email:  u.email || email
                });
            });
        }).catch(function (err) {
            var msg = friendlyError(err);
            if (msg) showMsg('loginMessage', msg, 'error');
            _shakeModal();
            // Auto-focus password field on credential errors (most common case)
            if (err && (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential')) {
                var pw = $id('loginPassword');
                if (pw) { pw.focus(); pw.select(); }
            }
        }).finally(function () {
            _lockAuthControls(false);
            setLoading('loginSubmitBtn', false);
        });
    }

    // ── Registro con email/password ─────────────────────────
    function handleRegister(e) {
        e.preventDefault();
        hideMsg('registerMessage');

        var nombre  = ($id('regNombre').value  || '').trim();
        var email   = ($id('regEmail').value   || '').trim();
        var pass    = ($id('regPassword').value || '');
        var confirm = ($id('regConfirm').value  || '');
        var terms   = $id('regTerms').checked;

        if (!nombre || !email || !pass || !confirm) {
            showMsg('registerMessage', 'Completa los campos obligatorios.', 'error');
            return;
        }
        if (pass !== confirm) {
            showMsg('registerMessage', 'Las contraseñas no coinciden.', 'error');
            $id('regConfirm').classList.add('is-error');
            return;
        }
        if (pass.length < 6) {
            showMsg('registerMessage', 'La contraseña debe tener al menos 6 caracteres.', 'error');
            return;
        }
        if (!terms) {
            showMsg('registerMessage', 'Debes aceptar los términos y condiciones.', 'warn');
            return;
        }

        if (!navigator.onLine) {
            showMsg('registerMessage', 'Sin conexión a internet. Verifica tu red.', 'error');
            _shakeModal();
            return;
        }

        var prefijo  = ($id('regPrefijo').value  || '+57');
        var telefono = ($id('regTelefono').value || '').trim();

        _lockAuthControls(true);
        setLoading('registerSubmitBtn', true);
        var createdUser = null;
        window.firebaseReady.then(function () {
            // If currently anonymous, upgrade in place to preserve uid + data
            var current = window.auth.currentUser;
            if (current && current.isAnonymous) {
                var cred = firebase.auth.EmailAuthProvider.credential(email, pass);
                return current.linkWithCredential(cred).catch(function (err) {
                    if (err && (err.code === 'auth/credential-already-in-use'
                             || err.code === 'auth/email-already-in-use')) {
                        // Email exists → cannot upgrade; create as new user instead.
                        return window.auth.createUserWithEmailAndPassword(email, pass);
                    }
                    throw err;
                });
            }
            return window.auth.createUserWithEmailAndPassword(email, pass);
        }).then(function (userCred) {
            createdUser = (userCred && userCred.user) || window.auth.currentUser;
            // Actualizar nombre en Firebase Auth
            return createdUser.updateProfile({ displayName: nombre });
        }).then(function () {
            // Pre-apply auth state INSTANTLY for snappy header switch
            if (createdUser) {
                // Manually patch displayName before pre-apply (updateProfile may not have propagated yet)
                _preApplyAuthHint({
                    displayName: nombre,
                    email: email,
                    photoURL: ''
                });
            }

            // Close modal + show toast immediately (don't wait for Firestore write)
            closeAuthModal();
            _toast('¡Cuenta creada! Bienvenido a Altorra Cars, ' + (nombre.split(' ')[0] || '') + '.', 'success');

            // Save credentials to browser password manager + persist last email
            _persistLastEmail(email);
            _saveCredential(email, pass);

            // Optional: send email verification (best-effort, no block)
            try {
                if (createdUser && typeof createdUser.sendEmailVerification === 'function') {
                    createdUser.sendEmailVerification().catch(function () {});
                }
            } catch (e) {}

            // Guardar perfil en clientes/{uid} — colección pública, NO admin (background)
            return saveClientProfile(createdUser.uid, {
                nombre: nombre,
                email: email,
                prefijo: prefijo,
                telefono: telefono
            });
        }).catch(function (err) {
            var msg = friendlyError(err);
            if (msg) showMsg('registerMessage', msg, 'error');
            _shakeModal();
            // Auto-focus errored field
            if (err && err.code === 'auth/email-already-in-use') {
                var emailEl = $id('regEmail');
                if (emailEl) { emailEl.focus(); emailEl.select(); }
            } else if (err && err.code === 'auth/weak-password') {
                var passEl = $id('regPassword');
                if (passEl) { passEl.focus(); passEl.select(); }
            }
        }).finally(function () {
            _lockAuthControls(false);
            setLoading('registerSubmitBtn', false);
        });
    }

    // ── Guardar perfil en Firestore clientes/{uid} ────────
    // Includes retry logic for the WebChannel race condition: right after
    // signIn the SDK may send this request with the old (anonymous) auth
    // token before the new token propagates through the WebChannel.
    function saveClientProfile(uid, data, retryCount) {
        if (!window.db) return Promise.resolve();
        var attempt = retryCount || 0;
        var docRef = window.db.collection('clientes').doc(uid);
        return docRef.get().then(function (snap) {
            if (snap.exists) {
                // Ya existe — actualizar solo ultimoAcceso
                return docRef.update({ ultimoAcceso: new Date().toISOString() });
            }
            // Crear perfil nuevo
            return docRef.set({
                uid: uid,
                nombre: data.nombre || '',
                email: data.email || '',
                prefijo: data.prefijo || '+57',
                telefono: data.telefono || '',
                favoritos: [],
                vehiculosVistos: [],
                creadoEn: new Date().toISOString(),
                ultimoAcceso: new Date().toISOString()
            });
        }).catch(function (err) {
            var msg = (err && err.message) || '';
            if (attempt < 2 && msg.indexOf('permissions') !== -1) {
                var delay = (attempt + 1) * 500;
                console.log('[Auth] saveClientProfile permission denied, retrying in', delay, 'ms');
                return new Promise(function (resolve) {
                    setTimeout(function () {
                        resolve(saveClientProfile(uid, data, attempt + 1));
                    }, delay);
                });
            }
            console.warn('[Auth] Error guardando perfil cliente:', err);
        });
    }

    // ── Google Auth — Modern (GIS) + Legacy (Popup) ─────────
    //
    // PRIMARY FLOW: Google Identity Services (GIS) — see _gisSignIn()
    //   - Uses iframe + postMessage internally
    //   - ZERO Cross-Origin-Opener-Policy warnings
    //   - Faster (no popup window overhead)
    //   - Supports One Tap for returning Google users
    //   - Requires window.GOOGLE_OAUTH_CLIENT_ID configured
    //
    // FALLBACK FLOW: Firebase signInWithPopup() — _legacyPopupSignIn()
    //   - Used when:
    //     * GIS_CONFIGURED is false (Client ID is placeholder)
    //     * GIS script failed to load (adblocker, CSP, network)
    //     * GIS init throws (rare)
    //     * GIS callback errors out
    //   - Still functional but produces COOP warnings (cosmetic)
    //
    // KNOWN HARMLESS WARNING (only in legacy popup flow):
    //   "Cross-Origin-Opener-Policy policy would block the
    //    window.closed/close call" (popup.ts:302/50)
    //   These come from Firebase Auth's popup polling. Login works.
    //   Cannot be silenced (GitHub Pages has no custom HTTP headers).
    //   Tracking: https://github.com/firebase/firebase-js-sdk/issues/6868
    //
    // Why we kept the legacy as fallback (not removed):
    //   - Resilience: if GIS breaks (Google deprecates, network, etc),
    //     login still works
    //   - Testing: easy A/B comparison
    //   - Adblocker users: GIS gets blocked frequently, fallback saves them
    //
    // Why popup instead of redirect:
    //   signInWithRedirect stores the result on the authDomain
    //   (altorra-cars.firebaseapp.com), but the site is hosted on
    //   altorracars.github.io. When the page reloads after the redirect,
    //   getRedirectResult() returns null because it can't read
    //   cross-origin sessionStorage. This is a known Firebase SDK
    //   limitation for sites hosted on a different domain than authDomain.
    //
    //   signInWithPopup doesn't have this issue because the popup stays
    //   on the authDomain and communicates back via postMessage. The
    //   result is returned directly in the promise.
    //
    // Previous issues (now fixed):
    //   - Double popup: old code used linkWithPopup → signInWithPopup.
    //     Now we only call signInWithPopup once.
    //   - Popup blocked: handled with a clear message asking to allow popups.
    //   - Modal stayed open ~1s after popup success because we waited for
    //     the Firestore admin-check before closing. Now we close INSTANTLY
    //     and run validation in background. If validation fails, we sign
    //     out + show toast (modal already closed).
    //
    // ── Decide which Google sign-in flow to use ─────────────
    // GIS (modern) is preferred when ALL of these are true:
    //   1. GOOGLE_OAUTH_CLIENT_ID is configured (not placeholder)
    //   2. GIS script loaded successfully (not blocked)
    //   3. window.google.accounts.id is available (browser supports it)
    function _shouldUseGis() {
        if (!window.GIS_CONFIGURED) return false;
        if (window._gisLoadFailed) return false;
        return !!(window.google && window.google.accounts && window.google.accounts.id);
    }

    var _gisInitialized = false;
    var _gisInitCallback = null;

    function _ensureGisInit(callback) {
        _gisInitCallback = callback;
        if (_gisInitialized) return;
        _gisInitialized = true;
        window.google.accounts.id.initialize({
            client_id: window.GOOGLE_OAUTH_CLIENT_ID,
            callback: function (response) {
                if (typeof _gisInitCallback === 'function') {
                    _gisInitCallback(response);
                }
            },
            auto_select: false,
            cancel_on_tap_outside: true,
            use_fedcm_for_prompt: true,
            context: 'signin',
            itp_support: true
        });
    }

    function handleGoogle() {
        if (!window.auth) {
            _toast('Cargando, intenta de nuevo en un momento.', 'info');
            return;
        }

        // Try modern GIS first if available
        if (_shouldUseGis()) {
            _gisSignIn();
            return;
        }

        // GIS not yet loaded but configured? Wait briefly (max 1s) for it.
        if (window.GIS_CONFIGURED && !window._gisLoadFailed && window._gisLoading) {
            _lockAuthControls(true);
            var modalWasOpen = function () {
                var m = $id('auth-modal');
                return m && m.classList.contains('active');
            };
            var waitTimer = setTimeout(function () {
                // Clear the ready callback so it won't fire if GIS
                // happens to load AFTER timeout — would cause duplicate
                // sign-in attempt
                window._onGisReady = null;
                _lockAuthControls(false);
                // Edge case: if user closed modal during wait, don't
                // open an unexpected popup
                if (!modalWasOpen()) return;
                _legacyPopupSignIn(); // Timed out, use legacy
            }, 1000);
            window._onGisReady = function () {
                clearTimeout(waitTimer);
                window._onGisReady = null;
                _lockAuthControls(false);
                // Same edge case check on the ready path
                if (!modalWasOpen()) return;
                if (_shouldUseGis()) _gisSignIn();
                else _legacyPopupSignIn();
            };
            return;
        }

        // Fallback: legacy signInWithPopup (with COOP warnings)
        _legacyPopupSignIn();
    }

    // ── Modern flow: Google Identity Services (GIS) ─────────
    // Triggers GIS account chooser via google.accounts.id.prompt().
    // The chooser is a small UI that appears top-right on desktop or
    // bottom on mobile. NO popup window → NO COOP warnings.
    //
    // After user selects account: callback fires with `response.credential`
    // which is a JWT ID token. We pass it to firebase.auth().signInWithCredential().
    var GIS_BLOCKED_KEY = 'altorra_gis_blocked';
    var GIS_BLOCKED_TTL = 24 * 3600 * 1000; // 1 day

    function _isGisBlocked() {
        try {
            var ts = parseInt(localStorage.getItem(GIS_BLOCKED_KEY) || '0', 10);
            return ts > 0 && (Date.now() - ts) < GIS_BLOCKED_TTL;
        } catch (e) { return false; }
    }

    function _markGisBlocked() {
        try { localStorage.setItem(GIS_BLOCKED_KEY, String(Date.now())); } catch (e) {}
    }

    function _clearGisBlocked() {
        try { localStorage.removeItem(GIS_BLOCKED_KEY); } catch (e) {}
    }

    // Race guard: when watchdog fires and we open the legacy popup, a late
    // GIS credential could still arrive (e.g. FedCM finally rendered after
    // 2.5s and user clicked it). We must ignore that callback to prevent
    // double sign-in attempts.
    var _legacyPopupInFlight = false;

    function _gisSignIn() {
        if (!_shouldUseGis()) {
            _legacyPopupSignIn();
            return;
        }
        if (_isGisBlocked()) {
            console.info('[GIS] Skipping — previously blocked (cached). Going straight to legacy popup.');
            _legacyPopupSignIn();
            return;
        }
        // Fresh attempt: clear any stale in-flight flag from a previous
        // session/click that completed
        _legacyPopupInFlight = false;
        _lockAuthControls(true);

        var promptResolved = false;
        // Watchdog: if FedCM is blocked in this browser, GIS prompt() fails
        // silently — there's no API to detect this. We use a 2.5s timeout:
        //   - If FedCM works, it shows in ~200-500ms → user clicks → callback fires
        //   - If FedCM is blocked, GIS logs "FedCM rejects" within ~500ms but
        //     gives us no callback. After 2.5s we assume blocked.
        //
        // On timeout: mark GIS as blocked (so next click skips it) AND
        // auto-open the legacy popup so the user doesn't have to click twice.
        // We accept a tiny risk of double-UI (FedCM rendering at 3s, popup
        // also open) — in practice FedCM is fast or it doesn't show at all.
        var watchdogTimer = setTimeout(function () {
            if (promptResolved) return;
            promptResolved = true;
            _markGisBlocked();
            _legacyPopupInFlight = true;
            console.info('[GIS] Prompt watchdog fired — FedCM appears blocked. Opening legacy popup.');
            // _legacyPopupSignIn re-locks the controls; release first to keep state consistent
            _lockAuthControls(false);
            _legacyPopupSignIn();
        }, 2500);

        try {
            _ensureGisInit(function (response) {
                // Drop late GIS callback if we already opened the legacy popup
                if (_legacyPopupInFlight) {
                    console.info('[GIS] Ignoring late credential — legacy popup already in flight');
                    return;
                }
                if (!promptResolved) {
                    promptResolved = true;
                    clearTimeout(watchdogTimer);
                }
                _onGisCredential(response);
            });

            // FedCM-compliant: call prompt() WITHOUT the deprecated
            // status-method callback (isNotDisplayed/isSkippedMoment/
            // isDismissedMoment). We rely on:
            //   1. The credential callback for success
            //   2. The 2.5s watchdog + auto-fallback for silent failure
            // See: https://developers.google.com/identity/gsi/web/guides/fedcm-migration
            window.google.accounts.id.prompt();
        } catch (e) {
            promptResolved = true;
            clearTimeout(watchdogTimer);
            console.warn('[GIS] Init failed, falling back to legacy popup:', e && e.message);
            _gisInitialized = false;
            _lockAuthControls(false);
            _legacyPopupSignIn();
        }
    }

    // ── GIS callback: receives JWT credential from Google ───
    // The credential is a signed JWT containing user info. We don't
    // need to parse it — Firebase validates it server-side.
    function _onGisCredential(response) {
        if (!response || !response.credential) {
            _lockAuthControls(false);
            console.warn('[GIS] Empty credential in callback');
            return;
        }
        try {
            var credential = firebase.auth.GoogleAuthProvider.credential(response.credential);
            window.auth.signInWithCredential(credential).then(function (result) {
                if (!result || !result.user) {
                    _lockAuthControls(false);
                    return;
                }
                _clearGisBlocked();
                // SUCCESS: instant modal close + pre-apply auth (same as legacy flow)
                _preApplyAuthHint(result.user);
                closeAuthModal();

                var isNew = !!(result.additionalUserInfo && result.additionalUserInfo.isNewUser);
                return _processGoogleUser(result.user, isNew);
            }).catch(function (err) {
                _lockAuthControls(false);
                console.warn('[GIS] signInWithCredential failed:', err && err.code, err && err.message);
                if (err && err.code === 'auth/account-exists-with-different-credential') {
                    _toast('Este correo ya está registrado con otro método. Inicia sesión con tu correo y contraseña.', 'error', 6000);
                    return;
                }
                if (err && err.code === 'auth/network-request-failed') {
                    _toast('Sin conexión a internet. Verifica tu red e intenta de nuevo.', 'error', 6000);
                    _shakeModal();
                    return;
                }
                // Other errors: try legacy popup as last resort
                console.info('[GIS] Falling back to legacy popup after credential error');
                _legacyPopupSignIn();
            });
        } catch (e) {
            _lockAuthControls(false);
            console.warn('[GIS] credential() factory failed:', e && e.message);
            _legacyPopupSignIn();
        }
    }

    // ── Legacy flow: signInWithPopup (produces COOP warnings) ───
    // Kept as fallback for:
    //   - Browsers/users where GIS is blocked (adblocker, FedCM disabled)
    //   - When GIS_CONFIGURED is false (placeholder Client ID)
    //   - When GIS init/callback fails
    //
    // Call window.auth.signInWithPopup synchronously in the click handler
    // (not inside a .then()) so browsers don't block the popup.
    function _legacyPopupSignIn() {
        // Disable Google + form buttons + show spinner state
        _lockAuthControls(true);

        var provider = new firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });

        var clearInFlight = function () { _legacyPopupInFlight = false; };

        window.auth.signInWithPopup(provider).then(function (result) {
            if (!result || !result.user) {
                _lockAuthControls(false);
                clearInFlight();
                return;
            }
            clearInFlight();
            // SUCCESS: close modal INSTANTLY (no Firestore wait).
            // Pre-apply auth state so the header switches BEFORE
            // onAuthStateChanged fires — zero perceived lag.
            _preApplyAuthHint(result.user);
            closeAuthModal();

            var isNew = !!(result.additionalUserInfo && result.additionalUserInfo.isNewUser);
            // Validation runs in background — modal is already closed
            return _processGoogleUser(result.user, isNew);
        }).catch(function (err) {
            _lockAuthControls(false);
            clearInFlight();
            if (!err) return;
            if (err.code === 'auth/popup-blocked') {
                _toast('Tu navegador bloqueó la ventana de Google. Permite ventanas emergentes para este sitio y vuelve a intentar.', 'error', 8000);
                return;
            }
            if (err.code === 'auth/popup-closed-by-user' || err.code === 'auth/cancelled-popup-request') return;
            if (err.code === 'auth/account-exists-with-different-credential') {
                _toast('Este correo ya está registrado con otro método. Inicia sesión con tu correo y contraseña.', 'error', 6000);
                return;
            }
            if (err.code === 'auth/network-request-failed') {
                _toast('Sin conexión a internet. Verifica tu red e intenta de nuevo.', 'error', 6000);
                _shakeModal();
                return;
            }
            var msg = friendlyError(err);
            if (msg) {
                _toast(msg, 'error');
                _shakeModal();
            }
        });
    }

    // Validate Google user after successful sign-in (runs in background).
    // The modal is ALREADY closed when this runs — so on validation failure
    // we only need to show a toast + sign out (no modal interaction).
    //   1. Admin accounts → sign out + warn (admin can't use public web)
    //   2. Email already registered with password → unlink Google
    //   3. New Google user → create client profile + welcome toast
    function _processGoogleUser(user, isNewUser) {
        return window.db.collection('usuarios').doc(user.uid).get()
            .then(function (doc) {
                if (doc.exists) {
                    // Admin trying to log in via public web — auto sign-out
                    return undoGoogleAndWarn(user, 'Esta cuenta es de administrador. Usa el panel de administración para ingresar.', true);
                }

                var hasPassword = false;
                var hasGoogle = false;
                (user.providerData || []).forEach(function (p) {
                    if (p.providerId === 'password') hasPassword = true;
                    if (p.providerId === 'google.com') hasGoogle = true;
                });

                if (hasPassword && hasGoogle) {
                    return undoGoogleAndWarn(user, 'Este correo ya está registrado con contraseña. Inicia sesión con tu correo y contraseña, o usa "¿Olvidaste tu contraseña?" para recuperarla.', false);
                }

                // Welcome toast — only after validation passes
                var nombre = (user.displayName || '').split(' ')[0];
                if (isNewUser) {
                    _toast('¡Bienvenido a Altorra Cars! Tu cuenta con Google está lista.', 'success');
                } else {
                    _toast(nombre ? '¡Hola de nuevo, ' + nombre + '!' : '¡Bienvenido de vuelta!', 'success');
                }

                _persistLastEmail(user.email);
                return saveClientProfile(user.uid, {
                    nombre: user.displayName || '',
                    email: user.email || ''
                });
            })
            .catch(function (err) {
                // Network errors during validation: don't sign out (assume OK)
                console.warn('[Auth] Background validation failed:', err && err.message);
            });
    }

    // Undo Firebase auto-linking of Google provider + warn user.
    // shouldSignOut: true for admin accounts (user should not stay signed in
    // from the public web); false for duplicate-email cases (user remains
    // signed in with their original password provider).
    function undoGoogleAndWarn(user, message, shouldSignOut) {
        var unlinkPromise = user.unlink('google.com').catch(function (e) {
            console.warn('[Auth] Could not unlink Google provider:', e && e.message);
        });
        return unlinkPromise.then(function () {
            _toast(message, 'error', 6000);
            if (shouldSignOut) {
                _explicitLogout = true;
                return window.auth.signOut();
            }
        });
    }

    // ── Reset Password ──────────────────────────────────────
    function handleReset(e) {
        e.preventDefault();
        hideMsg('resetMessage');
        var email = ($id('resetEmail').value || '').trim();
        if (!email) {
            showMsg('resetMessage', 'Ingresa tu correo electrónico.', 'error');
            var em = $id('resetEmail');
            if (em) em.focus();
            _shakeModal();
            return;
        }
        if (!navigator.onLine) {
            showMsg('resetMessage', 'Sin conexión a internet. Verifica tu red.', 'error');
            _shakeModal();
            return;
        }
        _lockAuthControls(true);
        setLoading('resetSubmitBtn', true);
        window.firebaseReady.then(function () {
            return window.auth.sendPasswordResetEmail(email);
        }).then(function () {
            showMsg('resetMessage', 'Enlace enviado a ' + email + '. Revisa tu bandeja de entrada y carpeta de spam.', 'success');
            $id('resetEmail').value = '';
        }).catch(function (err) {
            showMsg('resetMessage', friendlyError(err), 'error');
            _shakeModal();
        }).finally(function () {
            _lockAuthControls(false);
            setLoading('resetSubmitBtn', false);
        });
    }

    // ── Cerrar sesión ────────────────────────────────────────
    // Sign out the registered user. After explicit logout we do NOT
    // create a new anonymous account — this prevents orphaned anonymous
    // accounts from accumulating in Firebase Auth. The user can still
    // browse the site (public reads don't need auth). If they interact
    // with a feature that needs auth (favorites, history), they'll be
    // prompted to log in or register.
    var _logoutInFlight = false;
    function handleLogout() {
        // Guard: prevent double-click rapid logout (would fire 2x signOut,
        // causing 2 toasts + race conditions in onAuthStateChanged)
        if (_logoutInFlight) return;
        _logoutInFlight = true;
        _explicitLogout = true;

        // Pre-apply guest state SYNCHRONOUSLY for instant header revert.
        // The user sees Login/Register buttons immediately — even before
        // Firebase signOut resolves. Apple/Stripe optimistic-UI pattern.
        _preApplyGuestHint();

        // Pre-fade the avatar dropdown if open
        var dropdown = $id('hdrUserDropdown');
        if (dropdown) dropdown.classList.remove('open');

        // Stop Firestore real-time listeners BEFORE signOut to prevent the
        // WebChannel from trying to refresh its Listen streams with a null
        // auth token, which causes a 400 Bad Request error on
        // firestore.googleapis.com/.../Listen/channel.
        if (window.vehicleDB && typeof window.vehicleDB.stopRealtime === 'function') {
            window.vehicleDB.stopRealtime();
        }

        window.firebaseReady.then(function () {
            return window.auth.signOut();
        }).then(function () {
            _toast('Sesión cerrada correctamente.', 'success', 3000);
        }).catch(function (err) {
            // Network failure during signOut — Firebase will retry on next page load
            console.warn('[Auth] Sign out error (ignored):', err && err.message);
            _toast('Sesión cerrada localmente. Sincronizando...', 'info', 3000);
        }).finally(function () {
            _logoutInFlight = false;
        });
    }

    // ── Grace-period guards against transient null on first load ─────
    // Firebase's onAuthStateChanged sometimes fires with null on the
    // FIRST tick before IndexedDB persistence finishes restoring the
    // user. If we trust that null immediately, we'd flip the auth-hint
    // to 'guest' and SHOW the Login/Register buttons — only to flip
    // back when the real user resolves ~200-1500ms later. That's the
    // "Registrarse appears sometimes" flash the user reports.
    //
    // Strategy: on the FIRST null, if our cached hint says authenticated,
    // wait up to GRACE_MS for the next fire. If it's still null after,
    // accept the logout. If a user shows up, cancel the timer.
    var _initialResolutionDone = false;
    var _initialNullTimer = null;
    var GRACE_MS = 1800;

    // ── Auth state change → actualizar header + datos per-user ─
    // Best practice (Firebase blog): only create anonymous accounts on
    // first visit. After explicit logout, do NOT create a new anonymous
    // account — this prevents orphaned anonymous accounts from
    // accumulating. See: firebase.blog/posts/2023/07/best-practices-for-anonymous-authentication
    function onAuthStateChanged(user) {
        _currentUser = user;

        // Initial-resolution guard: protect against transient null
        if (!_initialResolutionDone) {
            if (!user) {
                var hint = null;
                try { hint = localStorage.getItem('altorra_auth_hint'); } catch (e) {}
                if (hint === 'authenticated') {
                    // Stale hint says we should be logged in. Wait for
                    // persistence to restore before flipping to guest.
                    if (_initialNullTimer) clearTimeout(_initialNullTimer);
                    _initialNullTimer = setTimeout(function () {
                        _initialResolutionDone = true;
                        if (!_currentUser) {
                            // Truly logged out after grace period — process now
                            _processNullState();
                        }
                    }, GRACE_MS);
                    return;
                }
            }
            // Either user present, or hint was 'guest' — proceed normally
            _initialResolutionDone = true;
            if (_initialNullTimer) {
                clearTimeout(_initialNullTimer);
                _initialNullTimer = null;
            }
        }

        if (!user) {
            _processNullState();
            return;
        }

        // Header: only registered (non-anonymous) users get the avatar UI
        updateHeaderAuthState(user.isAnonymous ? null : user);

        // Favorites: only for registered users (anonymous → no Firestore writes)
        if (window.favoritesManager) {
            if (user.isAnonymous) {
                window.favoritesManager.clearUser();
            } else {
                window.favoritesManager.setUser(user.uid);
            }
        }
        // History: localStorage always, Firestore sync only for registered users
        if (window.vehicleHistory) window.vehicleHistory.setUser(user.uid, user.isAnonymous);

        // If the DB was already loaded but real-time listeners were stopped
        // (e.g. during a logout flow — handleLogout stops them before signOut
        // to avoid the 400 on Listen/channel), restart them now that the new
        // auth state is settled.
        if (window.vehicleDB
            && window.vehicleDB.loaded
            && !window.vehicleDB._realtimeActive
            && typeof window.vehicleDB.startRealtime === 'function') {
            window.vehicleDB.startRealtime();
        }
    }

    // Extracted from the original onAuthStateChanged — runs the null/logout
    // path. Kept as a function so the grace-period guard can defer its call.
    function _processNullState() {
        updateHeaderAuthState(null);
        // On explicit logout, purge the local favorites cache so the next
        // user (or guest) doesn't see the old user's data eagerly hydrated.
        if (window.favoritesManager) window.favoritesManager.clearUser({ purgeCache: _explicitLogout });
        if (window.vehicleHistory)   window.vehicleHistory.clearUser();

        // Only sign in anonymously on first visit (no prior session).
        // After explicit logout, skip — the user can browse without auth
        // (public reads don't need it) and will get a fresh anonymous
        // session on next page load if needed.
        if (_explicitLogout) {
            _explicitLogout = false;
            // Restart realtime listeners without auth (public reads)
            if (window.vehicleDB
                && window.vehicleDB.loaded
                && !window.vehicleDB._realtimeActive
                && typeof window.vehicleDB.startRealtime === 'function') {
                window.vehicleDB.startRealtime();
            }
            return;
        }

        window.auth.signInAnonymously().catch(function (err) {
            console.warn('[Auth] Anonymous sign-in failed:', err && err.message);
        });
    }

    // ── Actualizar botones del header ────────────────────────
    function updateHeaderAuthState(user) {
        var btnLogin    = $id('btnLogin');
        var btnRegister = $id('btnRegister');
        var userArea    = $id('headerUserArea');

        // Persist hint to localStorage so the NEXT page load can pre-paint
        // the correct header state (no FOUC of unauthenticated content).
        // Read by the inline <head> script in every HTML.
        try {
            if (user) {
                localStorage.setItem('altorra_auth_hint', 'authenticated');
                // Also persist a minimal user snapshot so we could render
                // an avatar placeholder without waiting for Firebase
                localStorage.setItem('altorra_auth_user_snap', JSON.stringify({
                    name: user.displayName || (user.email ? user.email.split('@')[0] : ''),
                    photoURL: user.photoURL || ''
                }));
            } else {
                localStorage.setItem('altorra_auth_hint', 'guest');
                localStorage.removeItem('altorra_auth_user_snap');
            }
        } catch (e) { /* localStorage disabled — fall back to JS-only */ }

        // Sync the <html> class so CSS rules apply immediately
        var rootEl = document.documentElement;
        if (user) {
            rootEl.classList.remove('auth-guest');
            rootEl.classList.add('auth-authenticated');
        } else {
            rootEl.classList.remove('auth-authenticated');
            rootEl.classList.add('auth-guest');
        }

        if (user) {
            // Logueado: ocultar botones, mostrar avatar
            if (btnLogin)    btnLogin.style.display    = 'none';
            if (btnRegister) btnRegister.style.display = 'none';
            if (userArea)    { userArea.style.display = ''; renderUserArea(user, userArea); }
        } else {
            // No logueado: mostrar botones
            if (btnLogin)    { btnLogin.style.display    = ''; rewireBtn(btnLogin,    'login');    }
            if (btnRegister) { btnRegister.style.display = ''; rewireBtn(btnRegister, 'register'); }
            if (userArea)    userArea.style.display = 'none';
        }

        // Mobile
        updateMobileAuthRow(user);
    }

    function rewireBtn(btn, tab) {
        btn.onclick = null;
        btn.addEventListener('click', function () { openAuthModal(tab); });
    }

    function renderUserArea(user, container) {
        var name    = user.displayName || user.email.split('@')[0];
        var initials = name.split(' ').map(function (w) { return w[0]; }).slice(0, 2).join('').toUpperCase();
        var photoURL = user.photoURL || '';
        var firstName = name.split(' ')[0] || '';

        // Detect components.js pre-render: if the avatar is already in the
        // DOM from the cached snapshot AND the name matches, we just need
        // to append the dropdown + wire up listeners. This avoids the
        // micro-flicker of replacing innerHTML when the avatar is identical.
        var preWrapper = container.querySelector('.hdr-user-wrapper[data-prerendered="1"]');
        var preName = preWrapper && preWrapper.querySelector('.hdr-user-name');
        var matchesPrerender = preWrapper && preName && preName.textContent === firstName;
        var hasDropdown = container.querySelector('.hdr-user-dropdown');

        if (matchesPrerender && !hasDropdown) {
            // Optimal path: append dropdown without touching the avatar
            preWrapper.removeAttribute('data-prerendered'); // no longer transient
            var dropdownHtml =
                '<div class="hdr-user-dropdown" id="hdrUserDropdown" role="menu">' +
                '<a href="perfil.html" class="hdr-dd-item" role="menuitem"><i data-lucide="user-round"></i> Mi perfil</a>' +
                '<a href="favoritos.html" class="hdr-dd-item" role="menuitem"><i data-lucide="heart"></i> Mis favoritos</a>' +
                '<hr class="hdr-dd-sep">' +
                '<button class="hdr-dd-item hdr-dd-logout" id="hdrLogoutBtn" role="menuitem"><i data-lucide="log-out"></i> Cerrar sesión</button>' +
                '</div>';
            preWrapper.insertAdjacentHTML('beforeend', dropdownHtml);
        } else if (!matchesPrerender) {
            // Full re-render: pre-render absent or stale (different user)
            var avatarContent = photoURL
                ? '<img src="' + escapeHtml(photoURL) + '" alt="" style="width:100%;height:100%;border-radius:50%;object-fit:cover;" onerror="this.parentNode.textContent=\'' + initials + '\'">'
                : initials;
            container.innerHTML =
                '<div class="hdr-user-wrapper">' +
                '<button class="hdr-user-btn" id="hdrUserBtn" aria-label="Mi cuenta" aria-expanded="false">' +
                '<span class="hdr-user-avatar">' + avatarContent + '</span>' +
                '<span class="hdr-user-name">' + escapeHtml(firstName) + '</span>' +
                '<i data-lucide="chevron-down" class="hdr-user-chevron"></i>' +
                '</button>' +
                '<div class="hdr-user-dropdown" id="hdrUserDropdown" role="menu">' +
                '<a href="perfil.html" class="hdr-dd-item" role="menuitem"><i data-lucide="user-round"></i> Mi perfil</a>' +
                '<a href="favoritos.html" class="hdr-dd-item" role="menuitem"><i data-lucide="heart"></i> Mis favoritos</a>' +
                '<hr class="hdr-dd-sep">' +
                '<button class="hdr-dd-item hdr-dd-logout" id="hdrLogoutBtn" role="menuitem"><i data-lucide="log-out"></i> Cerrar sesión</button>' +
                '</div>' +
                '</div>';
        }
        // else: matchesPrerender AND hasDropdown — already fully rendered, idempotent

        if (window.lucide) window.lucide.createIcons({ nodes: [container] });
        // Dropdown toggle — guard against double-binding (renderUserArea
        // can fire multiple times: pre-render, then onAuthStateChanged)
        var btn      = $id('hdrUserBtn');
        var dropdown = $id('hdrUserDropdown');
        if (btn && dropdown && !btn.dataset.bound) {
            btn.dataset.bound = '1';
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                var open = dropdown.classList.toggle('open');
                btn.setAttribute('aria-expanded', open);
            });
            document.addEventListener('click', function () {
                dropdown.classList.remove('open');
                btn.setAttribute('aria-expanded', 'false');
            });
        }
        var logoutBtn = $id('hdrLogoutBtn');
        if (logoutBtn && !logoutBtn.dataset.bound) {
            logoutBtn.dataset.bound = '1';
            logoutBtn.addEventListener('click', handleLogout);
        }
    }

    function updateMobileAuthRow(user) {
        var row = document.querySelector('.mob-auth-row');
        if (!row) return;
        if (user) {
            var name = user.displayName || user.email.split('@')[0];
            var initials = name.split(' ').map(function(w){return w[0];}).slice(0,2).join('').toUpperCase();
            var mPhotoURL = user.photoURL || '';
            var mAvatarContent = mPhotoURL
                ? '<img src="' + escapeHtml(mPhotoURL) + '" alt="" style="width:100%;height:100%;border-radius:50%;object-fit:cover;" onerror="this.parentNode.textContent=\'' + initials + '\'">'
                : initials;
            row.innerHTML =
                '<a href="perfil.html" class="mob-user-profile-link">' +
                '<span class="mob-user-avatar">' + mAvatarContent + '</span>' +
                '<span class="mob-user-name">' + escapeHtml(name) + '</span>' +
                '<i data-lucide="chevron-right"></i>' +
                '</a>' +
                '<button class="mob-btn mob-btn-outline mob-logout-btn" id="mobLogoutBtn">' +
                '<i data-lucide="log-out"></i> Salir' +
                '</button>';
            if (window.lucide) window.lucide.createIcons({ nodes: [row] });
            var mob = $id('mobLogoutBtn');
            if (mob) mob.addEventListener('click', handleLogout);
        } else {
            row.innerHTML =
                '<button class="mob-btn mob-btn-outline" id="mobBtnLogin">' +
                '<i data-lucide="log-in"></i> Ingresar' +
                '</button>' +
                '<button class="mob-btn mob-btn-gold" id="mobBtnRegister">' +
                '<i data-lucide="user-plus"></i> Registrarse' +
                '</button>';
            if (window.lucide) window.lucide.createIcons({ nodes: [row] });
            var ml = $id('mobBtnLogin');
            var mr = $id('mobBtnRegister');
            if (ml) ml.addEventListener('click', function(){ openAuthModal('login'); });
            if (mr) mr.addEventListener('click', function(){ openAuthModal('register'); });
        }
    }

    function escapeHtml(str) {
        return (str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    }

    // ── Inicializar modal y eventos ─────────────────────────
    function initModal() {
        if (_modalLoaded) return;
        _modalLoaded = true;

        // Cerrar modal
        var closeBtn = $id('authModalClose');
        if (closeBtn) closeBtn.addEventListener('click', closeAuthModal);

        // Cerrar con Overlay click
        var modal = $id('auth-modal');
        if (modal) {
            modal.addEventListener('click', function (e) {
                if (e.target === modal) closeAuthModal();
            });
        }

        // Cerrar con Escape
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
                closeAuthModal();
            }
        });

        // Tabs
        document.querySelectorAll('.auth-tab[data-tab]').forEach(function (btn) {
            btn.addEventListener('click', function () { switchTab(this.dataset.tab); });
        });

        // Switch links dentro de los paneles
        document.querySelectorAll('.auth-switch-link[data-switch-to]').forEach(function (a) {
            a.addEventListener('click', function (e) {
                e.preventDefault();
                switchTab(this.dataset.switchTo);
            });
        });

        // Formulario login
        var loginForm = $id('authLoginForm');
        if (loginForm) loginForm.addEventListener('submit', handleLogin);

        // Formulario registro
        var regForm = $id('authRegisterForm');
        if (regForm) regForm.addEventListener('submit', handleRegister);

        // Formulario reset
        var resetForm = $id('authResetForm');
        if (resetForm) resetForm.addEventListener('submit', handleReset);

        // Google
        var loginGoogle = $id('loginGoogleBtn');
        var regGoogle   = $id('registerGoogleBtn');
        if (loginGoogle)  loginGoogle.addEventListener('click',  handleGoogle);
        if (regGoogle)    regGoogle.addEventListener('click',    handleGoogle);

        // Olvidé contraseña
        var forgotLink = $id('authForgotLink');
        if (forgotLink) forgotLink.addEventListener('click', function (e) {
            e.preventDefault(); showResetPanel();
        });

        // Volver desde reset
        var backBtn = $id('authBackFromReset');
        if (backBtn) backBtn.addEventListener('click', function () { switchTab('login'); });

        // Toggle password visibility
        wireTogglePass('loginTogglePass',   'loginPassword');
        wireTogglePass('regTogglePass',     'regPassword');
        wireTogglePass('confirmTogglePass', 'regConfirm');

        // Password strength meter
        var passInput = $id('regPassword');
        if (passInput) {
            passInput.addEventListener('input', function () {
                var s    = passwordStrength(this.value);
                var fill = $id('passStrengthFill');
                var lbl  = $id('passStrengthLabel');
                if (fill) { fill.style.width = s.score + '%'; fill.style.background = s.color; }
                if (lbl)  { lbl.textContent = s.label; lbl.style.color = s.color; }
            });
        }

        // Limpiar error en confirm cuando coincide
        var confirmInput = $id('regConfirm');
        if (confirmInput) {
            confirmInput.addEventListener('input', function () {
                if ($id('regPassword').value === this.value) {
                    this.classList.remove('is-error');
                }
            });
        }

        // Renderizar iconos Lucide en el modal
        if (window.lucide) window.lucide.createIcons({ nodes: [document.getElementById('auth-modal')] });
    }

    // ── Suscribirse al estado de auth ────────────────────────
    function startAuthListener() {
        window.firebaseReady.then(function () {
            window.auth.onAuthStateChanged(function (user) {
                onAuthStateChanged(user);
                initModal();
            });
        });

        // ── Online/offline detection ─────────────────────
        // Update modal banner + show toast on transition. Auth requests
        // need network — better to warn upfront than show cryptic errors.
        window.addEventListener('online', function () {
            _updateOfflineBanner();
            // Quiet toast — only if user is interacting with the modal
            var modal = $id('auth-modal');
            if (modal && modal.classList.contains('active')) {
                _toast('Conexión restablecida.', 'success', 2500);
            }
        });
        window.addEventListener('offline', function () {
            _updateOfflineBanner();
            var modal = $id('auth-modal');
            if (modal && modal.classList.contains('active')) {
                _toast('Sin conexión a internet.', 'error', 4500);
            }
        });

        // ── Cross-tab session sync feedback ─────────────────────
        // When the user logs in/out in tab A, Firebase Auth
        // (Persistence.LOCAL) syncs to tab B via IndexedDB. Tab B's
        // onAuthStateChanged fires automatically. We listen to the
        // localStorage 'altorra_auth_hint' key to show a subtle toast
        // in the OTHER tab so the user knows what happened.
        // Avoids the confusion of "I didn't click anything but the
        // header changed".
        window.addEventListener('storage', function (e) {
            if (e.key !== 'altorra_auth_hint') return;
            // Don't show toast if the auth modal is active in this tab
            // (likely the user is mid-login here too)
            var modal = $id('auth-modal');
            if (modal && modal.classList.contains('active')) return;
            if (e.newValue === 'guest' && e.oldValue === 'authenticated') {
                _toast('Sesión cerrada en otra pestaña.', 'info', 3500);
            } else if (e.newValue === 'authenticated' && e.oldValue !== 'authenticated') {
                _toast('Sesión iniciada en otra pestaña.', 'info', 3500);
            }
        });

        // ── One Tap on homepage (modern returning-user UX) ──────
        _maybeShowOneTap();
    }

    // ── One Tap (Google's modern auth UI for returning users) ─────
    // Shows a small card top-right of the page asking the user to
    // continue with their Google account. Modern, fast, no popup.
    //
    // Strict opt-in conditions to avoid annoying users:
    //   1. Only on homepage (/, /index.html) — not on every page
    //   2. Only if NOT signed in (auth-hint != 'authenticated')
    //   3. Only if GIS is configured AND loaded successfully
    //   4. Only if user hasn't dismissed One Tap recently (GIS handles cooldown)
    //   5. Skip if auth modal is currently open (don't compete)
    //   6. Skip if user clicked "Iniciar sesión" recently (intent: explicit form)
    //   7. Delay 1.5s after page load so it doesn't interrupt initial UX
    function _maybeShowOneTap() {
        // Condition 1: homepage only
        var path = window.location.pathname;
        var isHomepage = path === '/' || path === '/index.html' || path.endsWith('/altorracars.github.io/');
        if (!isHomepage) return;

        // Condition 2: only for guests
        var hint = null;
        try { hint = localStorage.getItem('altorra_auth_hint'); } catch (e) {}
        if (hint === 'authenticated') return;

        // Condition 3: GIS must be configured
        if (!window.GIS_CONFIGURED) return;

        // Wait for GIS to be ready, then trigger after delay
        var triggerOneTap = function () {
            // Skip if auth modal is open (don't compete with explicit form)
            var modal = $id('auth-modal');
            if (modal && modal.classList.contains('active')) return;
            // Re-check: GIS available
            if (!_shouldUseGis()) return;

            try {
                _ensureGisInit(_onGisCredential);
                window.google.accounts.id.prompt();
            } catch (e) {
                console.info('[GIS] One Tap init failed:', e && e.message);
            }
        };

        if (_shouldUseGis()) {
            // GIS already loaded — show after 1.5s delay
            setTimeout(triggerOneTap, 1500);
        } else if (window.GIS_CONFIGURED && !window._gisLoadFailed) {
            // GIS still loading — wait for ready signal
            var prevReady = window._onGisReady;
            window._onGisReady = function () {
                if (typeof prevReady === 'function') {
                    try { prevReady(); } catch (e) {}
                }
                window._onGisReady = null;
                setTimeout(triggerOneTap, 800); // shorter delay if late-loaded
            };
        }
    }

    // ── API pública ─────────────────────────────────────────
    window.AltorraAuth = {
        open:    function (tab) { openAuthModal(tab || 'login'); },
        close:   closeAuthModal,
        logout:  handleLogout,
        current: function () { return _currentUser; }
    };

    // Reemplazar el placeholder de "coming soon"
    window._authComingSoon = function () { openAuthModal('login'); };

    // Iniciar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startAuthListener);
    } else {
        startAuthListener();
    }

})();
