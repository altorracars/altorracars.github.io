// Admin Panel — Auth, RBAC & Navigation
(function() {
    'use strict';
    var AP = window.AP;
    var $ = AP.$;

    // ========== RATE LIMITING (localStorage) ==========
    var RL_ATTEMPTS_KEY = 'ac_login_attempts';
    var RL_LOCKOUT_KEY  = 'ac_login_lockout';
    var RL_MAX_ATTEMPTS = 5;
    var RL_LOCKOUT_MS   = 15 * 60 * 1000; // 15 minutos

    function getRateLimitState() {
        var lockoutUntil = parseInt(localStorage.getItem(RL_LOCKOUT_KEY) || '0', 10);
        if (Date.now() < lockoutUntil) {
            return { locked: true, remainingMs: lockoutUntil - Date.now() };
        }
        var attempts = parseInt(localStorage.getItem(RL_ATTEMPTS_KEY) || '0', 10);
        return { locked: false, attempts: attempts };
    }

    function recordFailedAttempt() {
        var attempts = parseInt(localStorage.getItem(RL_ATTEMPTS_KEY) || '0', 10) + 1;
        if (attempts >= RL_MAX_ATTEMPTS) {
            localStorage.setItem(RL_LOCKOUT_KEY, String(Date.now() + RL_LOCKOUT_MS));
            localStorage.removeItem(RL_ATTEMPTS_KEY);
        } else {
            localStorage.setItem(RL_ATTEMPTS_KEY, String(attempts));
        }
        return attempts;
    }

    function clearRateLimit() {
        localStorage.removeItem(RL_ATTEMPTS_KEY);
        localStorage.removeItem(RL_LOCKOUT_KEY);
    }

    function formatMs(ms) {
        var mins = Math.ceil(ms / 60000);
        return mins + ' minuto' + (mins !== 1 ? 's' : '');
    }

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
                            clearSessionStart();
                            stopInactivityTracking();
                            showLogin();
                        }
                    });
                });
        });
    }

    function loadUserProfile(authUser) {
        window.db.collection('usuarios').doc(authUser.uid).get()
            .then(function(doc) {
                if (doc.exists) {
                    AP.currentUserProfile = doc.data();
                    AP.currentUserProfile._docId = doc.id;
                    AP.currentUserRole = AP.currentUserProfile.rol;
                    showAdmin(authUser);
                } else {
                    showAccessDenied(authUser.email, authUser.uid, 'No tienes perfil administrativo asignado. Un Super Admin debe crearlo.');
                }
            })
            .catch(function(err) {
                if (err.code === 'permission-denied') {
                    showAccessDenied(authUser.email, authUser.uid, 'Las reglas de seguridad impiden leer tu perfil. Contacta al Super Admin.');
                } else {
                    showAccessDenied(authUser.email, authUser.uid, 'Error al cargar perfil: ' + err.message);
                }
            });
    }

    function showAccessDenied(email, uid, reason) {
        stopInactivityTracking();
        clearSessionStart();
        resetLoginBtn();
        $('loginScreen').style.display = 'flex';
        $('adminPanel').style.display = 'none';
        var errEl = $('loginError');
        errEl.style.display = 'block';
        var msg = 'Acceso denegado para ' + email + '.';
        if (reason) msg += '\n' + reason;
        else        msg += '\nNo tienes un perfil de administrador.';
        if (uid) {
            msg += '\n\nTu UID: ' + uid;
            msg += '\nCompartelo con el Super Admin para que te cree un perfil.';
        }
        errEl.style.whiteSpace = 'pre-line';
        errEl.textContent = msg;
        window.auth.signOut();
    }

    function showLogin() {
        stopInactivityTracking();
        AP.stopRealtimeSync();
        resetLoginBtn();
        $('loginScreen').style.display = 'flex';
        $('adminPanel').style.display = 'none';
        $('loginForm').reset();
        updateRateLimitUI();
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
        applyRolePermissions();
        AP.loadData();
    }

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

    function updateRateLimitUI() {
        var rateLimitEl = $('loginRateLimit');
        var btn         = $('loginBtn');
        if (!rateLimitEl) return;
        var state = getRateLimitState();
        if (state.locked) {
            rateLimitEl.style.display = 'block';
            rateLimitEl.textContent   = '🔒 Demasiados intentos fallidos. Espera ' + formatMs(state.remainingMs) + ' antes de intentar de nuevo.';
            btn.disabled = true;
            // Actualizar countdown cada 30s
            setTimeout(updateRateLimitUI, 30000);
        } else {
            rateLimitEl.style.display = 'none';
            btn.disabled = false;
            if (state.attempts > 0) {
                rateLimitEl.style.display = 'block';
                rateLimitEl.textContent   = 'Intentos fallidos: ' + state.attempts + '/' + RL_MAX_ATTEMPTS + '. Siguiente bloqueo tras ' + (RL_MAX_ATTEMPTS - state.attempts) + ' intento(s) mas.';
            }
        }
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

        // Verificar rate limit antes de intentar
        var rlState = getRateLimitState();
        if (rlState.locked) {
            updateRateLimitUI();
            return;
        }

        btn.disabled = true;
        btn.innerHTML = '<span class="btn-spinner"></span> Ingresando...';
        errEl.style.display = 'none';

        var loginTimeout = setTimeout(function() {
            resetLoginBtn();
            errEl.style.display = 'block';
            errEl.textContent = 'Tiempo de espera agotado. Verifica tu conexion e intenta de nuevo.';
        }, 15000);

        window.firebaseReady.then(function() {
                return window.auth.signInWithEmailAndPassword(email, pass);
            })
            .then(function() {
                clearTimeout(loginTimeout);
                clearRateLimit(); // login exitoso → resetear contador
            })
            .catch(function(error) {
                clearTimeout(loginTimeout);
                resetLoginBtn();
                errEl.style.display = 'block';
                if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                    recordFailedAttempt();
                    updateRateLimitUI();
                    errEl.textContent = 'Correo o contrasena incorrectos';
                } else if (error.code === 'auth/too-many-requests') {
                    errEl.textContent = 'Demasiados intentos. Espera un momento.';
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
            var btn = e.target.closest('[data-action]');
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
            var card = e.target.closest('.stat-card');
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

    // Inicializar UI de rate limit y arrancar auth
    updateRateLimitUI();
    initAuth();
})();
