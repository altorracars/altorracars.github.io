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
                return 'Ya existe una cuenta con ese correo usando otro método de acceso.';
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
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (tab) switchTab(tab);
        // Focus primer campo visible
        setTimeout(function () {
            var firstInput = modal.querySelector('.auth-panel.active input:not([type="checkbox"])');
            if (firstInput) firstInput.focus();
        }, 180);
    }

    function closeAuthModal() {
        var modal = $id('auth-modal');
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = '';
        // Limpiar mensajes
        ['loginMessage', 'registerMessage', 'resetMessage'].forEach(hideMsg);
        ['loginEmail', 'loginPassword', 'regNombre', 'regEmail',
         'regTelefono', 'regPassword', 'regConfirm', 'resetEmail'].forEach(function (id) {
            var el = $id(id);
            if (el) { el.value = ''; el.classList.remove('is-error'); }
        });
        // Reset strength bar
        var fill = $id('passStrengthFill');
        var lbl  = $id('passStrengthLabel');
        if (fill) { fill.style.width = '0'; fill.style.background = ''; }
        if (lbl)  { lbl.textContent = ''; lbl.style.color = ''; }
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

    // ── Login con email/password ────────────────────────────
    function handleLogin(e) {
        e.preventDefault();
        hideMsg('loginMessage');
        var email = ($id('loginEmail').value || '').trim();
        var pass  = ($id('loginPassword').value || '');
        if (!email || !pass) {
            showMsg('loginMessage', 'Completa todos los campos.', 'error');
            return;
        }
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
            var u = window.auth.currentUser;
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
        }).then(function () {
            closeAuthModal();
            if (typeof showToast === 'function') showToast('¡Bienvenido de vuelta!', 'success');
        }).catch(function (err) {
            var msg = friendlyError(err);
            if (msg) showMsg('loginMessage', msg, 'error');
        }).finally(function () {
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

        var prefijo  = ($id('regPrefijo').value  || '+57');
        var telefono = ($id('regTelefono').value || '').trim();

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
            // Guardar perfil en clientes/{uid} — colección pública, NO admin
            return saveClientProfile(createdUser.uid, {
                nombre: nombre,
                email: email,
                prefijo: prefijo,
                telefono: telefono
            });
        }).then(function () {
            closeAuthModal();
            if (typeof showToast === 'function') showToast('¡Cuenta creada! Bienvenido a Altorra Cars.', 'success');
        }).catch(function (err) {
            var msg = friendlyError(err);
            if (msg) showMsg('registerMessage', msg, 'error');
        }).finally(function () {
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

    // ── Google Auth ─────────────────────────────────────────
    // Uses signInWithRedirect (not popup) to avoid:
    // 1. Popup blockers on mobile/strict browsers
    // 2. Double account-selection when linkWithPopup fails and falls back to signInWithPopup
    // The redirect result is handled in startAuthListener → handleGoogleRedirectResult
    function handleGoogle() {
        window.firebaseReady.then(function () {
            var provider = new firebase.auth.GoogleAuthProvider();
            provider.setCustomParameters({ prompt: 'select_account' });
            return window.auth.signInWithRedirect(provider);
        }).catch(function (err) {
            var msg = friendlyError(err);
            if (msg) showGoogleError(msg);
        });
    }

    // Called once on page load to process Google redirect result
    function handleGoogleRedirectResult() {
        window.auth.getRedirectResult().then(function (result) {
            if (!result || !result.user) return; // No redirect happened

            var user = result.user;

            // SECURITY: check if this email belongs to an admin account.
            // Admin accounts live in `usuarios/{uid}` — public users in `clientes/{uid}`.
            // If someone signs in with Google using an admin email, we must NOT
            // create a clientes doc or let them in as a public user.
            return window.db.collection('usuarios').doc(user.uid).get()
                .then(function (doc) {
                    if (doc.exists) {
                        // This is an admin account — sign out from public web
                        if (window.vehicleDB && typeof window.vehicleDB.stopRealtime === 'function') {
                            window.vehicleDB.stopRealtime();
                        }
                        return window.auth.signOut().then(function () {
                            if (typeof showToast === 'function') {
                                showToast('Esta cuenta es de administrador. Usa el panel de administración para ingresar.', 'warn');
                            }
                        });
                    }
                    // Normal public user — save/update client profile
                    return saveClientProfile(user.uid, {
                        nombre: user.displayName || '',
                        email: user.email || ''
                    }).then(function () {
                        if (typeof showToast === 'function') showToast('¡Bienvenido!', 'success');
                    });
                })
                .catch(function (err) {
                    console.warn('[Auth] Error checking admin status after Google sign-in:', err && err.message);
                    // On error checking admin, still save client profile (fail-open for UX)
                    return saveClientProfile(user.uid, {
                        nombre: user.displayName || '',
                        email: user.email || ''
                    });
                });
        }).catch(function (err) {
            if (!err || err.code === 'auth/popup-closed-by-user' || err.code === 'auth/cancelled-popup-request') return;
            var msg = friendlyError(err);
            if (msg) {
                if (typeof showToast === 'function') {
                    showToast(msg, 'error');
                }
            }
        });
    }

    function showGoogleError(msg) {
        var activePanel = document.querySelector('.auth-panel.active');
        var msgEl = activePanel ? activePanel.querySelector('.auth-message') : null;
        if (msgEl) {
            msgEl.textContent = msg;
            msgEl.className = 'auth-message show is-error';
            msgEl.style.display = 'block';
        }
    }

    // ── Reset Password ──────────────────────────────────────
    function handleReset(e) {
        e.preventDefault();
        hideMsg('resetMessage');
        var email = ($id('resetEmail').value || '').trim();
        if (!email) {
            showMsg('resetMessage', 'Ingresa tu correo electrónico.', 'error');
            return;
        }
        setLoading('resetSubmitBtn', true);
        window.firebaseReady.then(function () {
            return window.auth.sendPasswordResetEmail(email);
        }).then(function () {
            showMsg('resetMessage', 'Enlace enviado a ' + email + '. Revisa tu bandeja de entrada y carpeta de spam.', 'success');
            $id('resetEmail').value = '';
        }).catch(function (err) {
            showMsg('resetMessage', friendlyError(err), 'error');
        }).finally(function () {
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
    function handleLogout() {
        _explicitLogout = true;
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
            if (typeof showToast === 'function') showToast('Sesión cerrada.', 'info');
        }).catch(function () {});
    }

    // ── Auth state change → actualizar header + datos per-user ─
    // Best practice (Firebase blog): only create anonymous accounts on
    // first visit. After explicit logout, do NOT create a new anonymous
    // account — this prevents orphaned anonymous accounts from
    // accumulating. See: firebase.blog/posts/2023/07/best-practices-for-anonymous-authentication
    function onAuthStateChanged(user) {
        _currentUser = user;

        if (!user) {
            updateHeaderAuthState(null);
            if (window.favoritesManager) window.favoritesManager.clearUser();
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

    // ── Actualizar botones del header ────────────────────────
    function updateHeaderAuthState(user) {
        var btnLogin    = $id('btnLogin');
        var btnRegister = $id('btnRegister');
        var userArea    = $id('headerUserArea');

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
        container.innerHTML =
            '<div class="hdr-user-wrapper">' +
            '<button class="hdr-user-btn" id="hdrUserBtn" aria-label="Mi cuenta" aria-expanded="false">' +
            '<span class="hdr-user-avatar">' + initials + '</span>' +
            '<span class="hdr-user-name">' + escapeHtml(name.split(' ')[0]) + '</span>' +
            '<i data-lucide="chevron-down" class="hdr-user-chevron"></i>' +
            '</button>' +
            '<div class="hdr-user-dropdown" id="hdrUserDropdown" role="menu">' +
            '<a href="perfil.html" class="hdr-dd-item" role="menuitem"><i data-lucide="user-round"></i> Mi perfil</a>' +
            '<a href="favoritos.html" class="hdr-dd-item" role="menuitem"><i data-lucide="heart"></i> Mis favoritos</a>' +
            '<hr class="hdr-dd-sep">' +
            '<button class="hdr-dd-item hdr-dd-logout" id="hdrLogoutBtn" role="menuitem"><i data-lucide="log-out"></i> Cerrar sesión</button>' +
            '</div>' +
            '</div>';
        if (window.lucide) window.lucide.createIcons({ nodes: [container] });
        // Dropdown toggle
        var btn      = $id('hdrUserBtn');
        var dropdown = $id('hdrUserDropdown');
        if (btn && dropdown) {
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
        if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
    }

    function updateMobileAuthRow(user) {
        var row = document.querySelector('.mob-auth-row');
        if (!row) return;
        if (user) {
            var name = user.displayName || user.email.split('@')[0];
            var initials = name.split(' ').map(function(w){return w[0];}).slice(0,2).join('').toUpperCase();
            row.innerHTML =
                '<a href="perfil.html" class="mob-user-profile-link">' +
                '<span class="mob-user-avatar">' + initials + '</span>' +
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
            // Process Google redirect result (if returning from Google sign-in)
            handleGoogleRedirectResult();

            window.auth.onAuthStateChanged(function (user) {
                onAuthStateChanged(user);
                initModal();
            });
        });
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
