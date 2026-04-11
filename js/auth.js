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
        $id('panelReset').classList.remove('active');
        $id('auth-tabs').style.display = '';
    }

    function showResetPanel() {
        ['panelLogin', 'panelRegister'].forEach(function (id) {
            var el = $id(id);
            if (el) el.classList.remove('active');
        });
        $id('auth-tabs').style.display = 'none';
        $id('panelReset').classList.add('active');
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
            return window.auth.signInWithEmailAndPassword(email, pass);
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
            return window.auth.createUserWithEmailAndPassword(email, pass);
        }).then(function (userCred) {
            createdUser = userCred.user;
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
    function saveClientProfile(uid, data) {
        if (!window.db) return Promise.resolve();
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
            console.warn('[Auth] Error guardando perfil cliente:', err);
        });
    }

    // ── Google Auth ─────────────────────────────────────────
    function handleGoogle() {
        window.firebaseReady.then(function () {
            var provider = new firebase.auth.GoogleAuthProvider();
            provider.setCustomParameters({ prompt: 'select_account' });
            return window.auth.signInWithPopup(provider);
        }).then(function (result) {
            var user = result.user;
            // Guardar perfil en clientes si es login con Google
            return saveClientProfile(user.uid, {
                nombre: user.displayName || '',
                email: user.email || ''
            });
        }).then(function () {
            closeAuthModal();
            if (typeof showToast === 'function') showToast('¡Bienvenido!', 'success');
        }).catch(function (err) {
            var msg = friendlyError(err);
            if (msg) {
                // Muestra en el panel activo
                var activePanel = document.querySelector('.auth-panel.active');
                var msgEl = activePanel ? activePanel.querySelector('.auth-message') : null;
                if (msgEl) {
                    msgEl.textContent = msg;
                    msgEl.className = 'auth-message show is-error';
                    msgEl.style.display = 'block';
                }
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
    function handleLogout() {
        window.firebaseReady.then(function () {
            return window.auth.signOut();
        }).then(function () {
            if (typeof showToast === 'function') showToast('Sesión cerrada.', 'info');
        }).catch(function () {});
    }

    // ── Auth state change → actualizar header ───────────────
    function onAuthStateChanged(user) {
        _currentUser = user;
        updateHeaderAuthState(user);
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
            window.auth.onAuthStateChanged(function (user) {
                onAuthStateChanged(user);
                // Primera vez que se carga el header
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
