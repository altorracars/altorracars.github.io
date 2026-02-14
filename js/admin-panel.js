// Admin Panel Logic for ALTORRA CARS
// With full RBAC (Role-Based Access Control)
(function() {
    'use strict';

    var vehicles = [];
    var brands = [];
    var users = [];
    var deleteTargetId = null;
    var deleteBrandTargetId = null;
    var uploadedImageUrls = [];
    var unsubVehicles = null;
    var unsubBrands = null;

    // ========== RBAC STATE ==========
    var currentUserProfile = null;
    var currentUserRole = null;
    var INACTIVITY_TIMEOUT_MS = 3 * 60 * 1000;
    var inactivityTimerId = null;
    var inactivityTrackingActive = false;

    var ACTIVITY_EVENTS = ['mousemove', 'touchstart', 'touchmove'];

    function isSuperAdmin() { return currentUserRole === 'super_admin'; }
    function isEditor() { return currentUserRole === 'editor'; }
    function isViewer() { return currentUserRole === 'viewer'; }
    function canManageUsers() { return isSuperAdmin(); }
    function canCreateOrEditInventory() { return isSuperAdmin() || isEditor(); }
    function canDeleteInventory() { return isSuperAdmin(); }

    // ========== CONFIG ==========
    var UPLOAD_CONFIG = {
        maxFileSizeMB: 2,
        maxWidthPx: 1200,
        compressionQuality: 0.75,
        allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
        storagePath: 'cars/'
    };

    var FREE_TIER = {
        storageGB: 5,
        egressGB: 100,
        classAOps: 5000,
        classBOps: 50000
    };

    // ========== HELPERS ==========
    function $(id) { return document.getElementById(id); }

    function toast(msg, type) {
        var t = $('adminToast');
        t.textContent = msg;
        t.className = 'admin-toast ' + (type || 'success') + ' show';
        setTimeout(function() { t.classList.remove('show'); }, 5000);
    }

    function clearInactivityTimer() {
        if (inactivityTimerId) {
            clearTimeout(inactivityTimerId);
            inactivityTimerId = null;
        }
    }

    function stopInactivityTracking() {
        clearInactivityTimer();
        if (!inactivityTrackingActive) return;
        ACTIVITY_EVENTS.forEach(function(eventName) {
            document.removeEventListener(eventName, resetInactivityTracking, true);
        });
        inactivityTrackingActive = false;
    }

    function handleInactivityTimeout() {
        clearInactivityTimer();
        if (!window.auth || !window.auth.currentUser) return;
        toast('Sesion cerrada por inactividad (3 minutos).', 'info');
        window.auth.signOut();
    }

    function resetInactivityTracking() {
        if (!inactivityTrackingActive) return;
        clearInactivityTimer();
        inactivityTimerId = setTimeout(handleInactivityTimeout, INACTIVITY_TIMEOUT_MS);
    }

    function startInactivityTracking() {
        if (inactivityTrackingActive) return;
        ACTIVITY_EVENTS.forEach(function(eventName) {
            document.addEventListener(eventName, resetInactivityTracking, true);
        });
        inactivityTrackingActive = true;
        resetInactivityTracking();
    }

    // Parse Firebase Callable errors into user-friendly Spanish messages
    function parseCallableError(err) {
        // Firebase callable errors: err.code = 'functions/CODE', err.message = server message
        var code = (err.code || '').replace('functions/', '');
        var serverMsg = err.message || '';
        var detailsMsg = '';

        if (typeof err.details === 'string') {
            detailsMsg = err.details;
        } else if (err.details && typeof err.details === 'object') {
            detailsMsg = err.details.originalMessage || err.details.message || '';
        }

        // Compat SDK may return generic strings like "internal" while the useful message is in details
        if (!serverMsg || serverMsg.toLowerCase() === code || serverMsg.toLowerCase() === 'internal') {
            serverMsg = detailsMsg || serverMsg;
        }

        var map = {
            'unauthenticated': 'Tu sesion expiro. Inicia sesion de nuevo.',
            'permission-denied': serverMsg || 'No tienes permisos para esta accion.',
            'invalid-argument': serverMsg || 'Datos invalidos. Revisa el formulario.',
            'not-found': serverMsg || 'El recurso no fue encontrado.',
            'already-exists': serverMsg || 'Este registro ya existe.',
            'failed-precondition': serverMsg || 'No se puede completar la accion.',
            'unavailable': 'Servicio no disponible. Las Cloud Functions no estan desplegadas o hay un problema de red.',
            'internal': serverMsg || 'Error interno del servidor.',
            'deadline-exceeded': 'La operacion tardo demasiado. Intenta de nuevo.'
        };

        return map[code] || serverMsg || 'Error desconocido: ' + (err.message || err.code || 'sin detalles');
    }

    // Normaliza texto a Title Case: primera letra de cada palabra en mayúscula, resto en minúscula
    function toTitleCase(str) {
        if (!str) return '';
        return str.trim().toLowerCase().replace(/(?:^|\s)\S/g, function(c) { return c.toUpperCase(); });
    }

    function formatPrice(n) {
        if (!n) return '-';
        return '$' + Number(n).toLocaleString('es-CO');
    }

    // ========== IMAGE COMPRESSION ==========
    function compressImage(file) {
        return new Promise(function(resolve, reject) {
            if (file.size <= 200 * 1024 && file.type === 'image/webp') {
                resolve(file);
                return;
            }

            var img = new Image();
            var canvas = document.createElement('canvas');
            var reader = new FileReader();

            reader.onload = function(e) {
                img.onload = function() {
                    var maxW = UPLOAD_CONFIG.maxWidthPx;
                    var w = img.width;
                    var h = img.height;

                    if (w > maxW) {
                        h = Math.round(h * (maxW / w));
                        w = maxW;
                    }

                    canvas.width = w;
                    canvas.height = h;

                    var ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, w, h);

                    var outputType = 'image/webp';
                    var quality = UPLOAD_CONFIG.compressionQuality;

                    canvas.toBlob(function(blob) {
                        if (!blob) {
                            canvas.toBlob(function(jpegBlob) {
                                if (!jpegBlob) { resolve(file); return; }
                                var name = file.name.replace(/\.[^.]+$/, '') + '_compressed.jpg';
                                resolve(new File([jpegBlob], name, { type: 'image/jpeg' }));
                            }, 'image/jpeg', quality);
                            return;
                        }
                        var name = file.name.replace(/\.[^.]+$/, '') + '_compressed.webp';
                        resolve(new File([blob], name, { type: outputType }));
                    }, outputType, quality);
                };

                img.onerror = function() { reject(new Error('No se pudo leer la imagen')); };
                img.src = e.target.result;
            };

            reader.onerror = function() { reject(new Error('No se pudo leer el archivo')); };
            reader.readAsDataURL(file);
        });
    }

    // ========== AUTH + RBAC INITIALIZATION ==========
    function initAuth() {
        window.firebaseReady.then(function() {
            window.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                .catch(function(err) {
                    console.warn('[Auth] No se pudo aplicar persistence LOCAL:', err);
                })
                .finally(function() {
                    window.auth.onAuthStateChanged(function(user) {
                        if (user) {
                            loadUserProfile(user);
                        } else {
                            currentUserProfile = null;
                            currentUserRole = null;
                            stopInactivityTracking();
                            showLogin();
                        }
                    });
                });
        });
    }

    function loadUserProfile(authUser) {
        // Step 1: Try to read own profile (always allowed by rules)
        window.db.collection('usuarios').doc(authUser.uid).get()
            .then(function(doc) {
                if (doc.exists) {
                    currentUserProfile = doc.data();
                    currentUserProfile._docId = doc.id;
                    currentUserRole = currentUserProfile.rol;
                    console.log('[RBAC] Profile loaded. Role:', currentUserRole, 'Email:', authUser.email);
                    showAdmin(authUser);
                } else {
                    // No profile -> deny access (bootstrap function no longer used)
                    console.warn('[RBAC] No profile found for authenticated user:', authUser.uid);
                    showAccessDenied(authUser.email, authUser.uid, 'No tienes perfil administrativo asignado. Un Super Admin debe crearlo.');
                }
            })
            .catch(function(err) {
                console.error('[RBAC] Error loading profile:', err);
                if (err.code === 'permission-denied') {
                    showAccessDenied(authUser.email, authUser.uid, 'Las reglas de seguridad impiden leer tu perfil. Contacta al Super Admin.');
                } else {
                    showAccessDenied(authUser.email, authUser.uid, 'Error al cargar perfil: ' + err.message);
                }
            });
    }

    function showAccessDenied(email, uid, reason) {
        stopInactivityTracking();
        $('loginScreen').style.display = 'flex';
        $('adminPanel').style.display = 'none';
        var errEl = $('loginError');
        errEl.style.display = 'block';
        var msg = 'Acceso denegado para ' + email + '.';
        if (reason) {
            msg += '\n' + reason;
        } else {
            msg += '\nNo tienes un perfil de administrador.';
        }
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
        stopRealtimeSync();
        $('loginScreen').style.display = 'flex';
        $('adminPanel').style.display = 'none';
    }

    function showAdmin(user) {
        $('loginScreen').style.display = 'none';
        $('adminPanel').style.display = 'flex';
        $('adminEmail').textContent = user.email + ' (' + (currentUserRole === 'super_admin' ? 'Super Admin' : currentUserRole === 'editor' ? 'Editor' : 'Viewer') + ')';

        recordLoginEvent(user.email);
        writeAuditLog('login', 'sesion', user.email);
        startInactivityTracking();
        applyRolePermissions();
        loadData();
    }

    // ========== APPLY ROLE PERMISSIONS TO UI ==========
    function applyRolePermissions() {
        // Users nav/section: only super_admin
        var usersNav = document.querySelector('.nav-item[data-section="users"]');
        if (usersNav) {
            usersNav.style.display = canManageUsers() ? '' : 'none';
        }

        // Create buttons: hidden for viewer
        var btnAddVehicle = $('btnAddVehicle');
        var btnAddBrand = $('btnAddBrand');
        if (btnAddVehicle) btnAddVehicle.style.display = canCreateOrEditInventory() ? '' : 'none';
        if (btnAddBrand) btnAddBrand.style.display = canCreateOrEditInventory() ? '' : 'none';

        // Vehicle search (visible to all)
        // Settings section (visible to all - password change is personal)

        console.log('[RBAC] UI permissions applied for role:', currentUserRole);
    }

    // ========== LOGIN ==========
    $('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        var email = $('loginEmail').value;
        var pass = $('loginPassword').value;
        var errEl = $('loginError');
        var btn = $('loginBtn');

        btn.disabled = true;
        btn.textContent = 'Ingresando...';
        errEl.style.display = 'none';

        window.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(function() {
                return window.auth.signInWithEmailAndPassword(email, pass);
            })
            .then(function() {
                btn.disabled = false;
                btn.textContent = 'Iniciar Sesion';
            })
            .catch(function(error) {
                btn.disabled = false;
                btn.textContent = 'Iniciar Sesion';
                errEl.style.display = 'block';
                if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                    errEl.textContent = 'Correo o contrasena incorrectos';
                } else if (error.code === 'auth/too-many-requests') {
                    errEl.textContent = 'Demasiados intentos. Espera un momento.';
                } else {
                    errEl.textContent = 'Error: ' + error.message;
                }
            });
    });

    $('logoutBtn').addEventListener('click', function() {
        window.auth.signOut();
    });

    // Change password (requires recent login re-auth)
    $('changePasswordForm').addEventListener('submit', function(e) {
        e.preventDefault();

        var currentUser = window.auth.currentUser;
        if (!currentUser || !currentUser.email) {
            toast('Sesion invalida. Inicia sesion de nuevo.', 'error');
            window.auth.signOut();
            return;
        }

        var newPass = $('newPassword').value;
        var currentPass = window.prompt('Para cambiar la contrasena, confirma tu contrasena actual:');
        if (!currentPass) {
            toast('Cambio de contrasena cancelado.', 'info');
            return;
        }

        var credential = firebase.auth.EmailAuthProvider.credential(currentUser.email, currentPass);

        currentUser.reauthenticateWithCredential(credential)
            .then(function() {
                return currentUser.updatePassword(newPass);
            })
            .then(function() {
                toast('Contrasena actualizada');
                $('newPassword').value = '';
            })
            .catch(function(err) {
                if (err && (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential')) {
                    toast('Contrasena actual incorrecta.', 'error');
                } else {
                    toast('Error: ' + (err && err.message ? err.message : 'No se pudo cambiar la contrasena.'), 'error');
                }
            });
    });

    // ========== MOBILE MENU ==========
    var hamburgerBtn = $('hamburgerBtn');
    var sidebar = $('adminSidebar');
    var sidebarOverlay = $('sidebarOverlay');

    function toggleMobileMenu() {
        var isOpen = sidebar.classList.toggle('open');
        hamburgerBtn.classList.toggle('active', isOpen);
        sidebarOverlay.classList.toggle('active', isOpen);
    }

    function closeMobileMenu() {
        sidebar.classList.remove('open');
        hamburgerBtn.classList.remove('active');
        sidebarOverlay.classList.remove('active');
    }

    if (hamburgerBtn) hamburgerBtn.addEventListener('click', toggleMobileMenu);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeMobileMenu);

    var mobileLogoutBtn = $('mobileLogoutBtn');
    if (mobileLogoutBtn) {
        mobileLogoutBtn.addEventListener('click', function() { window.auth.signOut(); });
    }

    // ========== NAVIGATION WITH PERMISSION GUARD ==========
    document.querySelectorAll('.nav-item[data-section]').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var section = this.getAttribute('data-section');

            // Guard: prevent non-super-admin from accessing users section
            if (section === 'users' && !canManageUsers()) {
                toast('No tienes permisos para acceder a esta seccion', 'error');
                return;
            }

            document.querySelectorAll('.nav-item').forEach(function(n) { n.classList.remove('active'); });
            this.classList.add('active');
            document.querySelectorAll('.section').forEach(function(s) { s.classList.remove('active'); });
            $('sec-' + section).classList.add('active');
            closeMobileMenu();
        });
    });

    // ========== REAL-TIME SYNC (onSnapshot) ==========
    function startRealtimeSync() {
        // Detach previous listeners if any
        stopRealtimeSync();

        unsubVehicles = window.db.collection('vehiculos').onSnapshot(function(snap) {
            vehicles = snap.docs.map(function(d) { return d.data(); });
            renderVehiclesTable();
            updateStats();
            renderActivityFeed();
            updateEstimator();
            updateNavBadges();
            renderVehiclesByOrigin();
            renderDealersList();
        }, function(err) {
            console.error('Vehicles snapshot error:', err);
        });

        unsubBrands = window.db.collection('marcas').onSnapshot(function(snap) {
            brands = snap.docs.map(function(d) { return d.data(); });
            renderBrandsTable();
            populateBrandSelect();
            updateStats();
            renderActivityFeed();
            updateNavBadges();
        }, function(err) {
            console.error('Brands snapshot error:', err);
        });

        // Only load users if super_admin (avoids permission errors for editor/viewer)
        if (canManageUsers()) {
            loadUsers();
        }
    }

    function stopRealtimeSync() {
        if (unsubVehicles) { unsubVehicles(); unsubVehicles = null; }
        if (unsubBrands) { unsubBrands(); unsubBrands = null; }
        if (unsubAppointments) { unsubAppointments(); unsubAppointments = null; }
        if (unsubDealers) { unsubDealers(); unsubDealers = null; }
    }

    // Backward-compatible alias — existing calls to loadData() trigger a one-time fetch
    function loadData() {
        startRealtimeSync();
        // Phase 5: Load appointments, dealers, and availability config
        try {
            loadAppointments();
            loadDealers();
            loadAvailabilityConfig();
        } catch (e) {
            console.warn('[Phase5] Error loading:', e);
        }
    }

    function loadUsers() {
        if (!canManageUsers()) {
            // Double-guard: editor/viewer should never reach here
            console.warn('[RBAC] loadUsers blocked: user is not super_admin');
            return;
        }
        window.db.collection('usuarios').get().then(function(snap) {
            users = snap.docs.map(function(d) {
                var data = d.data();
                data._docId = d.id;
                return data;
            });
            renderUsersTable();
        }).catch(function(err) {
            console.error('Error loading users:', err);
            var msg = 'Error al cargar usuarios.';
            if (err.code === 'permission-denied') {
                msg = 'Sin permisos para ver usuarios. Verifica que las Firestore Rules esten desplegadas y tu rol sea super_admin.';
            } else {
                msg += ' ' + err.message;
            }
            $('usersTableBody').innerHTML = '<tr><td colspan="5" style="text-align:center;padding:2rem;color:var(--admin-text-muted);">' + msg + '</td></tr>';
        });
    }

    function updateStats() {
        $('statTotal').textContent = vehicles.length;
        $('statNuevos').textContent = vehicles.filter(function(v) { return v.tipo === 'nuevo'; }).length;
        $('statUsados').textContent = vehicles.filter(function(v) { return v.tipo === 'usado'; }).length;
        $('statOfertas').textContent = vehicles.filter(function(v) { return v.oferta || v.precioOferta; }).length;
        $('statDestacados').textContent = vehicles.filter(function(v) { return v.destacado; }).length;
        $('statMarcas').textContent = brands.length;
        $('statVendidos').textContent = vehicles.filter(function(v) { return v.estado === 'vendido'; }).length;
        var citasEl = $('statCitas');
        if (citasEl) citasEl.textContent = appointments.length > 0 ? appointments.filter(function(a) { return a.estado === 'pendiente'; }).length : '-';
    }

    // ========== ACTIVITY FEED ==========
    var ACTIVITY_PAGE_SIZE = 10;
    var activityExpanded = false;
    var loginEvents = []; // In-memory login tracking

    function recordLoginEvent(email) {
        loginEvents.push({
            _actType: 'login',
            updatedAt: new Date().toISOString(),
            updatedBy: email
        });
    }

    function buildActivityItemHTML(item) {
        var who = item.updatedBy || 'Admin';
        if (who.indexOf('@') > 0) {
            who = who.split('@')[0];
        }

        var when = item.updatedAt ? formatTimeAgo(item.updatedAt) : '';

        // Login event
        if (item._actType === 'login') {
            return '<div class="activity-item">' +
                '<span class="activity-icon">🔑</span>' +
                '<div class="activity-content">' +
                    '<span class="activity-who">' + escapeHtml(who) + '</span> ' +
                    'inició sesión' +
                    '<div class="activity-time">' + when + '</div>' +
                '</div>' +
            '</div>';
        }

        // Brand event
        if (item._type === 'marca') {
            var brandName = item.nombre || item.id || '';
            return '<div class="activity-item">' +
                '<span class="activity-icon">🏷️</span>' +
                '<div class="activity-content">' +
                    '<span class="activity-who">' + escapeHtml(who) + '</span> ' +
                    'actualizó marca ' +
                    '<span class="activity-vehicle">' + escapeHtml(brandName) + '</span>' +
                    '<div class="activity-time">' + when + '</div>' +
                '</div>' +
            '</div>';
        }

        // Vehicle event
        var marca = item.marca ? capitalize(item.marca) : '';
        var modelo = item.modelo || '';
        var year = item.year || '';
        var vehicleName = (marca + ' ' + modelo + ' ' + year).trim();

        var actionText = 'actualizó';
        var actionIcon = '✏️';
        if (item._version === 1) {
            actionText = 'creó';
            actionIcon = '➕';
        }

        var estadoBadge = '';
        if (item.estado && item.estado !== 'disponible') {
            var estadoLabels = { reservado: 'Reservado', vendido: 'Vendido', borrador: 'Borrador' };
            var estadoClasses = { reservado: 'act-warning', vendido: 'act-danger', borrador: 'act-muted' };
            estadoBadge = ' <span class="act-badge ' + (estadoClasses[item.estado] || '') + '">' + (estadoLabels[item.estado] || item.estado) + '</span>';
        }

        return '<div class="activity-item">' +
            '<span class="activity-icon">' + actionIcon + '</span>' +
            '<div class="activity-content">' +
                '<span class="activity-who">' + escapeHtml(who) + '</span> ' +
                actionText + ' vehículo ' +
                '<span class="activity-vehicle">' + escapeHtml(vehicleName) + '</span>' +
                estadoBadge +
                '<div class="activity-time">' + when + '</div>' +
            '</div>' +
        '</div>';
    }

    function renderActivityFeed() {
        var feed = $('activityFeed');
        if (!feed) return;

        // Merge vehicles + brands + login events, all sorted by updatedAt
        var allItems = [];

        vehicles.forEach(function(v) {
            if (v.updatedAt) allItems.push(v);
        });

        brands.forEach(function(b) {
            if (b.updatedAt) allItems.push(b);
        });

        loginEvents.forEach(function(e) {
            allItems.push(e);
        });

        allItems.sort(function(a, b) {
            return (b.updatedAt || '').localeCompare(a.updatedAt || '');
        });

        if (allItems.length === 0) {
            feed.innerHTML = '<div class="activity-empty">Sin actividad reciente</div>';
            return;
        }

        var showAll = activityExpanded;
        var visible = showAll ? allItems : allItems.slice(0, ACTIVITY_PAGE_SIZE);

        var html = visible.map(buildActivityItemHTML).join('');

        if (!showAll && allItems.length > ACTIVITY_PAGE_SIZE) {
            html += '<button class="activity-show-more" id="btnActivityMore">Ver toda la actividad (' + allItems.length + ' registros)</button>';
        } else if (showAll && allItems.length > ACTIVITY_PAGE_SIZE) {
            html += '<button class="activity-show-more" id="btnActivityLess">Mostrar menos</button>';
        }

        feed.innerHTML = html;

        var btnMore = $('btnActivityMore');
        if (btnMore) {
            btnMore.addEventListener('click', function() {
                activityExpanded = true;
                feed.style.maxHeight = 'none';
                renderActivityFeed();
            });
        }
        var btnLess = $('btnActivityLess');
        if (btnLess) {
            btnLess.addEventListener('click', function() {
                activityExpanded = false;
                feed.style.maxHeight = '420px';
                renderActivityFeed();
                feed.scrollTop = 0;
            });
        }
    }

    function formatTimeAgo(isoString) {
        try {
            var date = new Date(isoString);
            var now = new Date();
            var diffMs = now - date;
            var diffSec = Math.floor(diffMs / 1000);
            var diffMin = Math.floor(diffSec / 60);
            var diffHours = Math.floor(diffMin / 60);
            var diffDays = Math.floor(diffHours / 24);

            if (diffSec < 60) return 'Hace un momento';
            if (diffMin < 60) return 'Hace ' + diffMin + (diffMin === 1 ? ' minuto' : ' minutos');
            if (diffHours < 24) return 'Hace ' + diffHours + (diffHours === 1 ? ' hora' : ' horas');
            if (diffDays < 7) return 'Hace ' + diffDays + (diffDays === 1 ? ' dia' : ' dias');

            // Show full date for older entries
            return date.toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' });
        } catch (e) {
            return '';
        }
    }

    function escapeHtml(str) {
        var div = document.createElement('div');
        div.textContent = str || '';
        return div.innerHTML;
    }

    function capitalize(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function populateBrandSelect() {
        var select = $('vMarca');
        var currentVal = select.value;
        select.innerHTML = '<option value="">Seleccionar...</option>';
        brands.sort(function(a, b) { return a.nombre.localeCompare(b.nombre); });
        brands.forEach(function(b) {
            var opt = document.createElement('option');
            opt.value = b.id;
            opt.textContent = b.nombre;
            select.appendChild(opt);
        });
        if (currentVal) select.value = currentVal;
    }

    // ========== STORAGE ESTIMATOR ==========
    function updateEstimator() {
        var el = $('storageEstimator');
        if (!el) return;

        var totalImages = 0;
        vehicles.forEach(function(v) {
            if (v.imagenes && v.imagenes.length) {
                v.imagenes.forEach(function(url) {
                    if (url && (url.indexOf('firebasestorage') >= 0 || url.indexOf('storage.googleapis') >= 0)) {
                        totalImages++;
                    }
                });
            }
        });

        var avgSizeKB = 150;
        var storageUsedMB = (totalImages * avgSizeKB) / 1024;
        var storageUsedGB = storageUsedMB / 1024;
        var storagePct = (storageUsedGB / FREE_TIER.storageGB) * 100;

        var visitsInput = $('estVisitas');
        var monthlyVisits = visitsInput ? (parseInt(visitsInput.value) || 500) : 500;
        var avgImagesPerVisit = 8;
        var egressGB = (monthlyVisits * avgImagesPerVisit * avgSizeKB) / (1024 * 1024);
        var egressPct = (egressGB / FREE_TIER.egressGB) * 100;

        var classAUsed = totalImages;
        var classAPct = (classAUsed / FREE_TIER.classAOps) * 100;

        var classBUsed = monthlyVisits * avgImagesPerVisit;
        var classBPct = (classBUsed / FREE_TIER.classBOps) * 100;

        var maxPct = Math.max(storagePct, egressPct, classAPct, classBPct);

        var html = '<div class="est-grid">' +
            renderEstBar('Almacenamiento', storageUsedMB.toFixed(1) + ' MB', storageUsedGB.toFixed(3) + ' / ' + FREE_TIER.storageGB + ' GB', storagePct) +
            renderEstBar('Egreso mensual', egressGB.toFixed(2) + ' GB', egressGB.toFixed(2) + ' / ' + FREE_TIER.egressGB + ' GB', egressPct) +
            renderEstBar('Op. Clase A (subidas)', classAUsed, classAUsed + ' / ' + FREE_TIER.classAOps.toLocaleString(), classAPct) +
            renderEstBar('Op. Clase B (lecturas)', classBUsed.toLocaleString(), classBUsed.toLocaleString() + ' / ' + FREE_TIER.classBOps.toLocaleString(), classBPct) +
        '</div>';

        if (maxPct >= 70) {
            html += '<div style="margin-top:0.75rem;padding:0.5rem 0.75rem;background:rgba(210,153,34,0.15);border:1px solid var(--admin-warning);border-radius:6px;font-size:0.8rem;color:var(--admin-warning);">Te estas acercando al limite gratuito. Considera reducir imagenes o visitas.</div>';
        } else {
            html += '<div style="margin-top:0.5rem;font-size:0.75rem;color:var(--admin-text-muted);">' + totalImages + ' imagenes en Storage | Compresion automatica activa (~150KB/img)</div>';
        }

        el.innerHTML = html;
    }

    function renderEstBar(label, value, detail, pct) {
        var color = pct >= 90 ? 'var(--admin-danger)' : pct >= 70 ? 'var(--admin-warning)' : 'var(--admin-success)';
        var clampedPct = Math.min(pct, 100);
        return '<div class="est-item"><div style="display:flex;justify-content:space-between;font-size:0.75rem;margin-bottom:2px;"><span>' + label + '</span><span style="color:var(--admin-text-muted);">' + detail + '</span></div><div style="height:6px;background:var(--admin-border);border-radius:3px;overflow:hidden;"><div style="height:100%;width:' + clampedPct + '%;background:' + color + ';border-radius:3px;transition:width 0.3s;"></div></div></div>';
    }

    // ========== NAV BADGES ==========
    function updateNavBadges() {
        var vBadge = $('navBadgeVehicles');
        var bBadge = $('navBadgeBrands');
        if (vBadge) vBadge.textContent = vehicles.length || '';
        if (bBadge) bBadge.textContent = brands.length || '';
    }

    // ========== VEHICLES TABLE (RBAC-aware) ==========
    var ESTADO_LABELS = {
        disponible: { text: 'Disponible', cls: 'badge-success' },
        reservado:  { text: 'Reservado',  cls: 'badge-warning' },
        vendido:    { text: 'Vendido',    cls: 'badge-danger' },
        borrador:   { text: 'Borrador',   cls: 'badge-muted' }
    };

    function renderVehiclesTable(filter) {
        var filtered = vehicles;
        if (filter) {
            var q = filter.toLowerCase();
            filtered = vehicles.filter(function(v) {
                return (v.marca + ' ' + v.modelo + ' ' + v.year + ' ' + (v.estado || '')).toLowerCase().indexOf(q) >= 0;
            });
        }

        filtered.sort(function(a, b) { return a.id - b.id; });

        var html = '';
        filtered.forEach(function(v) {
            var estado = v.estado || 'disponible';
            var estadoInfo = ESTADO_LABELS[estado] || ESTADO_LABELS.disponible;
            var estadoBadge = '<span class="badge ' + estadoInfo.cls + '">' + estadoInfo.text + '</span>';

            var actions = '<button class="btn btn-ghost btn-sm" onclick="adminPanel.previewVehicle(' + v.id + ')" title="Vista previa">👁</button> ';
            if (canCreateOrEditInventory()) {
                actions += '<button class="btn btn-ghost btn-sm" onclick="adminPanel.editVehicle(' + v.id + ')">Editar</button> ';
                if (estado === 'disponible') {
                    actions += '<button class="btn btn-sm" style="color:var(--admin-gold);border-color:var(--admin-gold);" onclick="adminPanel.markAsSold(' + v.id + ')">Gestionar Operacion</button> ';
                }
            }
            if (canDeleteInventory()) {
                actions += '<button class="btn btn-danger btn-sm" onclick="adminPanel.deleteVehicle(' + v.id + ')">Eliminar</button>';
            }

            html += '<tr>' +
                '<td><img class="vehicle-thumb" src="' + (v.imagen || 'multimedia/vehicles/placeholder-car.jpg') + '" alt="" onerror="this.src=\'multimedia/vehicles/placeholder-car.jpg\'"></td>' +
                '<td><strong>' + (v.marca || '').charAt(0).toUpperCase() + (v.marca || '').slice(1) + ' ' + (v.modelo || '') + '</strong><br><small style="color:#8b949e">' + v.year + ' &middot; ' + (v.categoria || '') + '</small></td>' +
                '<td><span class="badge badge-' + v.tipo + '">' + v.tipo + '</span></td>' +
                '<td>' + formatPrice(v.precio) + (v.precioOferta ? '<br><small style="color: var(--admin-warning);">' + formatPrice(v.precioOferta) + '</small>' : '') + '</td>' +
                '<td>' + estadoBadge + '</td>' +
                '<td>' + actions + '</td>' +
            '</tr>';
        });

        if (!html) html = '<tr><td colspan="6" style="text-align:center; padding:2rem; color:#8b949e;">No se encontraron vehiculos</td></tr>';
        $('vehiclesTableBody').innerHTML = html;
    }

    $('vehicleSearch').addEventListener('input', function() {
        renderVehiclesTable(this.value);
    });

    // ========== BRANDS TABLE (RBAC-aware) ==========
    function renderBrandsTable() {
        var html = '';
        brands.forEach(function(b) {
            var count = vehicles.filter(function(v) { return v.marca === b.id; }).length;

            var actions = '';
            if (canCreateOrEditInventory()) {
                actions += '<button class="btn btn-ghost btn-sm" onclick="adminPanel.editBrand(\'' + b.id + '\')">Editar</button> ';
            }
            if (canDeleteInventory()) {
                actions += '<button class="btn btn-danger btn-sm" onclick="adminPanel.deleteBrand(\'' + b.id + '\')">Eliminar</button>';
            }
            if (!actions) actions = '<span style="color:var(--admin-text-muted);font-size:0.75rem;">Solo lectura</span>';

            html += '<tr>' +
                '<td><img class="vehicle-thumb" src="' + (b.logo || '') + '" alt="' + b.nombre + '" onerror="this.style.display=\'none\'" style="width:40px;height:40px;object-fit:contain;"></td>' +
                '<td><code>' + b.id + '</code></td>' +
                '<td><strong>' + b.nombre + '</strong></td>' +
                '<td>' + (b.descripcion || '-') + '</td>' +
                '<td>' + count + '</td>' +
                '<td>' + actions + '</td>' +
            '</tr>';
        });

        if (!html) html = '<tr><td colspan="6" style="text-align:center; padding:2rem;">No hay marcas</td></tr>';
        $('brandsTableBody').innerHTML = html;
    }

    // ========== VEHICLE MODAL ==========
    function openModal() { $('vehicleModal').classList.add('active'); }

    // ========== CLOSE MODAL WITH CONFIRMATION ==========
    function formHasData() {
        return !!($('vMarca').value || $('vModelo').value || $('vPrecio').value);
    }

    function closeModalFn(force) {
        if (!force && formHasData()) {
            if (!confirm('Tienes datos sin guardar. ¿Deseas cerrar? (Usa "Guardar Borrador" para no perder la informacion)')) {
                return;
            }
        }
        $('vehicleModal').classList.remove('active');
        $('vehicleForm').reset();
        $('vId').value = '';
        uploadedImageUrls = [];
        $('uploadedImages').innerHTML = '';
        $('uploadProgress').style.display = 'none';
        $('uploadError').style.display = 'none';
        $('manualImageUrl').value = '';
        $('featuresPreview').innerHTML = '';
        // Reset feature checkboxes
        document.querySelectorAll('.feat-checkboxes input[type="checkbox"]').forEach(function(cb) { cb.checked = false; });
        stopDraftAutoSave();
    }

    // ========== PHASE 4: DRAFTS (Firestore per-user) ==========
    var draftInterval = null;

    function getFormSnapshot() {
        return {
            vId: $('vId').value,
            vMarca: $('vMarca').value,
            vModelo: $('vModelo').value,
            vYear: $('vYear').value,
            vTipo: $('vTipo').value,
            vCategoria: $('vCategoria').value,
            vPrecio: $('vPrecio').value,
            vPrecioOferta: $('vPrecioOferta').value,
            vKm: $('vKm').value,
            vTransmision: $('vTransmision').value,
            vCombustible: $('vCombustible').value,
            vMotor: $('vMotor').value,
            vPotencia: $('vPotencia').value,
            vCilindraje: $('vCilindraje').value,
            vTraccion: $('vTraccion').value,
            vDireccion: $('vDireccion').value,
            vColor: $('vColor').value,
            vPuertas: $('vPuertas').value,
            vPasajeros: $('vPasajeros').value,
            vUbicacion: $('vUbicacion').value,
            vPlaca: $('vPlaca').value,
            vFasecolda: $('vFasecolda').value,
            vDescripcion: $('vDescripcion').value,
            vEstado: $('vEstado').value,
            vDestacado: $('vDestacado').checked,
            vOferta: $('vOferta').checked,
            vRevision: $('vRevision').checked,
            vPeritaje: $('vPeritaje').checked,
            vCaracteristicas: $('vCaracteristicas').value,
            _images: uploadedImageUrls.slice(),
            _savedAt: new Date().toISOString()
        };
    }

    function restoreFormSnapshot(snap) {
        var fields = ['vMarca','vModelo','vYear','vTipo','vCategoria','vPrecio','vPrecioOferta','vKm','vTransmision','vCombustible','vMotor','vPotencia','vCilindraje','vTraccion','vDireccion','vColor','vPuertas','vPasajeros','vUbicacion','vPlaca','vFasecolda','vDescripcion','vEstado','vCaracteristicas'];
        fields.forEach(function(f) {
            if ($(f) && snap[f] !== undefined) $(f).value = snap[f];
        });
        if (snap.vId) $('vId').value = snap.vId;
        $('vDestacado').checked = !!snap.vDestacado;
        $('vOferta').checked = !!snap.vOferta;
        $('vRevision').checked = snap.vRevision !== false;
        $('vPeritaje').checked = snap.vPeritaje !== false;
        if (snap._images && snap._images.length) {
            uploadedImageUrls = snap._images.slice();
            renderUploadedImages();
        }
    }

    function getDraftDocRef() {
        if (!window.auth || !window.auth.currentUser || !window.db) return null;
        return window.db.collection('usuarios').doc(window.auth.currentUser.uid).collection('drafts').doc('vehicleDraft');
    }

    function saveDraftToFirestore(showToast) {
        var ref = getDraftDocRef();
        if (!ref) return Promise.resolve();
        var snap = getFormSnapshot();
        if (!snap.vMarca && !snap.vModelo && !snap.vPrecio) {
            if (showToast) toast('No hay datos para guardar como borrador', 'error');
            return Promise.resolve();
        }
        snap._userId = window.auth.currentUser.uid;
        snap._userEmail = window.auth.currentUser.email;
        return ref.set(snap).then(function() {
            if (showToast) toast('Borrador guardado correctamente');
        }).catch(function(err) {
            console.warn('[Draft] Error al guardar borrador:', err);
            if (showToast) toast('Error al guardar borrador', 'error');
        });
    }

    function clearDraftFromFirestore() {
        var ref = getDraftDocRef();
        if (!ref) return Promise.resolve();
        return ref.delete().catch(function() {});
    }

    function stopDraftAutoSave() {
        if (draftInterval) { clearInterval(draftInterval); draftInterval = null; }
    }

    function startDraftAutoSave() {
        stopDraftAutoSave();
        draftInterval = setInterval(function() {
            saveDraftToFirestore(false);
        }, 10000); // Auto-save every 10 seconds silently
    }

    function checkForDraft() {
        var ref = getDraftDocRef();
        if (!ref) return Promise.resolve(false);
        return ref.get().then(function(doc) {
            if (!doc.exists) return false;
            var snap = doc.data();
            if (!snap.vMarca && !snap.vModelo && !snap.vPrecio) return false;
            var savedAt = snap._savedAt ? formatTimeAgo(snap._savedAt) : '';
            var label = (snap.vMarca || '') + ' ' + (snap.vModelo || '') + ' ' + (snap.vYear || '');
            if (confirm('Tienes un borrador guardado: ' + label.trim() + ' (' + savedAt + '). ¿Deseas recuperarlo?')) {
                restoreFormSnapshot(snap);
                return true;
            } else {
                clearDraftFromFirestore();
                return false;
            }
        }).catch(function() { return false; });
    }

    $('btnAddVehicle').addEventListener('click', function() {
        if (!canCreateOrEditInventory()) { toast('No tienes permisos para crear vehiculos', 'error'); return; }
        $('modalTitle').textContent = 'Agregar Vehiculo';
        $('vId').value = '';
        $('vehicleForm').reset();
        $('vUbicacion').value = 'Barranquilla';
        $('vDireccion').value = 'Electrica';
        $('vEstado').value = 'disponible';
        $('vRevision').checked = true;
        $('vPeritaje').checked = true;
        uploadedImageUrls = [];
        $('uploadedImages').innerHTML = '';
        $('uploadError').style.display = 'none';
        checkForDraft().then(function() {
            startDraftAutoSave();
            openModal();
        });
    });

    $('closeModal').addEventListener('click', function() { closeModalFn(); });
    $('cancelModal').addEventListener('click', function() { closeModalFn(); });
    // Click outside modal: ask confirmation instead of closing directly
    $('vehicleModal').addEventListener('click', function(e) { if (e.target === this) closeModalFn(); });

    // Save Draft button
    var saveDraftBtn = $('saveDraftBtn');
    if (saveDraftBtn) {
        saveDraftBtn.addEventListener('click', function() {
            saveDraftToFirestore(true);
        });
    }

    $('vehicleForm').addEventListener('submit', function(e) { e.preventDefault(); });
    $('vehicleForm').addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') e.preventDefault();
    });

    // ========== EDIT VEHICLE ==========
    function editVehicle(id) {
        if (!canCreateOrEditInventory()) { toast('No tienes permisos para editar vehiculos', 'error'); return; }

        var v = vehicles.find(function(x) { return x.id === id; });
        if (!v) return;

        $('modalTitle').textContent = 'Editar Vehiculo #' + id;
        $('vId').value = v.id;
        $('vMarca').value = v.marca || '';
        $('vModelo').value = v.modelo || '';
        $('vYear').value = v.year || '';
        $('vTipo').value = v.tipo || '';
        $('vCategoria').value = v.categoria || '';
        $('vPrecio').value = v.precio || '';
        $('vPrecioOferta').value = v.precioOferta || '';
        $('vKm').value = v.kilometraje || 0;
        $('vTransmision').value = v.transmision || '';
        $('vCombustible').value = v.combustible || '';
        $('vMotor').value = v.motor || '';
        $('vPotencia').value = v.potencia || '';
        $('vCilindraje').value = v.cilindraje || '';
        $('vTraccion').value = v.traccion || '';
        $('vDireccion').value = v.direccion || 'Electrica';
        $('vColor').value = v.color || '';
        $('vPuertas').value = v.puertas || 5;
        $('vPasajeros').value = v.pasajeros || 5;
        $('vUbicacion').value = v.ubicacion || 'Barranquilla';
        $('vPlaca').value = v.placa || '';
        $('vFasecolda').value = v.codigoFasecolda || '';
        $('vDescripcion').value = v.descripcion || '';
        $('vEstado').value = v.estado || 'disponible';
        $('vDestacado').checked = !!v.destacado;
        $('vOferta').checked = !!(v.oferta || v.precioOferta);
        $('vRevision').checked = v.revisionTecnica !== false;
        $('vPeritaje').checked = v.peritaje !== false;
        loadFeaturesIntoForm(v.caracteristicas || []);

        // Load concesionario value
        if ($('vConcesionario')) {
            // Populate concesionario select first, then set value
            if (window.DynamicLists) {
                window.DynamicLists.populateConcesionarioSelect($('vConcesionario'));
                setTimeout(function() {
                    $('vConcesionario').value = v.concesionario || '';
                    toggleConsignaField();
                    if (v.consignaParticular && $('vConsignaParticular')) {
                        $('vConsignaParticular').value = v.consignaParticular;
                    }
                }, 300);
            } else {
                $('vConcesionario').value = v.concesionario || '';
            }
        }

        uploadedImageUrls = (v.imagenes && v.imagenes.length) ? v.imagenes.slice() : (v.imagen ? [v.imagen] : []);
        renderUploadedImages();
        $('uploadError').style.display = 'none';

        startDraftAutoSave();
        openModal();
    }

    // ========== PHASE 4: AUDIT LOG ==========
    function writeAuditLog(action, target, details) {
        try {
            var userEmail = (window.auth && window.auth.currentUser) ? window.auth.currentUser.email : 'unknown';
            var logEntry = {
                action: action,
                target: target,
                details: details || '',
                user: userEmail,
                timestamp: new Date().toISOString()
            };
            window.db.collection('auditLog').add(logEntry).catch(function() {
                // Silently fail — audit log is not critical
            });
        } catch (e) {}
    }

    // ========== COLLECT FEATURES FROM CHECKBOXES + TEXTAREA ==========
    function collectAllFeatures() {
        var features = [];
        // Collect from category checkboxes
        document.querySelectorAll('.feat-checkboxes input[type="checkbox"]:checked').forEach(function(cb) {
            if (cb.value && features.indexOf(cb.value) === -1) features.push(cb.value);
        });
        // Collect from textarea (additional features)
        var textarea = $('vCaracteristicas');
        if (textarea && textarea.value.trim()) {
            textarea.value.split('\n').forEach(function(line) {
                var trimmed = line.trim();
                if (trimmed && features.indexOf(trimmed) === -1) features.push(trimmed);
            });
        }
        return features;
    }

    function loadFeaturesIntoForm(caracteristicas) {
        if (!caracteristicas || !caracteristicas.length) return;
        // Uncheck all first
        document.querySelectorAll('.feat-checkboxes input[type="checkbox"]').forEach(function(cb) { cb.checked = false; });

        var uncategorized = [];
        var checkboxValues = [];
        document.querySelectorAll('.feat-checkboxes input[type="checkbox"]').forEach(function(cb) { checkboxValues.push(cb.value); });

        caracteristicas.forEach(function(feat) {
            var found = false;
            document.querySelectorAll('.feat-checkboxes input[type="checkbox"]').forEach(function(cb) {
                if (cb.value === feat) { cb.checked = true; found = true; }
            });
            if (!found) uncategorized.push(feat);
        });

        if ($('vCaracteristicas')) {
            $('vCaracteristicas').value = uncategorized.join('\n');
        }
    }

    // ========== SAVE VEHICLE (with optimistic locking + collision-safe IDs) ==========
    function buildVehicleData(id) {
        var precioOferta = $('vPrecioOferta').value ? parseInt($('vPrecioOferta').value) : null;
        var userEmail = (window.auth && window.auth.currentUser) ? window.auth.currentUser.email : 'unknown';

        var vehicleData = {
            id: id,
            marca: $('vMarca').value,
            modelo: $('vModelo').value.trim(),
            year: parseInt($('vYear').value),
            tipo: $('vTipo').value,
            categoria: $('vCategoria').value,
            precio: parseInt($('vPrecio').value),
            precioOferta: precioOferta,
            oferta: !!precioOferta,
            kilometraje: parseInt($('vKm').value) || 0,
            transmision: $('vTransmision').value,
            combustible: $('vCombustible').value,
            motor: $('vMotor').value || '',
            potencia: $('vPotencia').value || '',
            cilindraje: $('vCilindraje').value || '',
            traccion: $('vTraccion').value || '',
            direccion: $('vDireccion').value || 'Electrica',
            color: toTitleCase($('vColor').value),
            puertas: parseInt($('vPuertas').value) || 5,
            pasajeros: parseInt($('vPasajeros').value) || 5,
            asientos: parseInt($('vPasajeros').value) || 5,
            ubicacion: $('vUbicacion').value || 'Barranquilla',
            placa: $('vPlaca').value || 'Disponible al contactar',
            codigoFasecolda: $('vFasecolda').value || 'Consultar',
            revisionTecnica: $('vRevision').checked,
            peritaje: $('vPeritaje').checked,
            descripcion: $('vDescripcion').value || '',
            estado: $('vEstado').value || 'disponible',
            destacado: $('vDestacado').checked,
            imagen: uploadedImageUrls[0] || 'multimedia/vehicles/placeholder-car.jpg',
            imagenes: uploadedImageUrls.length ? uploadedImageUrls.slice() : ['multimedia/vehicles/placeholder-car.jpg'],
            caracteristicas: collectAllFeatures(),
            concesionario: $('vConcesionario') ? $('vConcesionario').value : '',
            consignaParticular: ($('vConcesionario') && $('vConcesionario').value === '_particular' && $('vConsignaParticular')) ? $('vConsignaParticular').value.trim() : '',
            updatedAt: new Date().toISOString(),
            updatedBy: userEmail
        };

        if (vehicleData.imagen && vehicleData.imagenes.indexOf(vehicleData.imagen) === -1) {
            vehicleData.imagenes.unshift(vehicleData.imagen);
        }

        return vehicleData;
    }

    // Save a NEW vehicle with collision-safe ID (retries if ID already taken)
    function saveNewVehicle(vehicleData, candidateId, maxRetries) {
        if (maxRetries <= 0) {
            return Promise.reject({ code: 'id-exhausted', message: 'No se pudo generar un ID unico. Recarga la pagina e intenta de nuevo.' });
        }

        vehicleData.id = candidateId;
        var docRef = window.db.collection('vehiculos').doc(String(candidateId));

        return window.db.runTransaction(function(transaction) {
            return transaction.get(docRef).then(function(doc) {
                if (doc.exists) {
                    // This ID is already taken — another user created it
                    throw { code: 'id-collision', takenId: candidateId };
                }
                vehicleData._version = 1;
                transaction.set(docRef, vehicleData);
            });
        }).catch(function(err) {
            if (err.code === 'id-collision') {
                // Retry with next ID
                return saveNewVehicle(vehicleData, err.takenId + 1, maxRetries - 1);
            }
            throw err;
        });
    }

    // Save an EXISTING vehicle with optimistic locking
    function saveExistingVehicle(vehicleData, id, expectedVersion) {
        var docRef = window.db.collection('vehiculos').doc(String(id));

        return window.db.runTransaction(function(transaction) {
            return transaction.get(docRef).then(function(doc) {
                var currentVersion = doc.exists ? (doc.data()._version || 0) : 0;
                if (expectedVersion !== null && currentVersion !== expectedVersion) {
                    var lastEditor = doc.data().updatedBy || 'otro usuario';
                    throw { code: 'version-conflict', message: 'Este vehiculo fue modificado por ' + lastEditor + ' mientras lo editabas. Cierra el formulario y vuelve a abrirlo para ver los cambios actuales.' };
                }
                vehicleData._version = currentVersion + 1;
                transaction.set(docRef, vehicleData);
            });
        });
    }

    $('saveVehicle').addEventListener('click', function() {
        if (!canCreateOrEditInventory()) { toast('No tienes permisos', 'error'); return; }

        var form = $('vehicleForm');
        if (!form.checkValidity()) { form.reportValidity(); return; }

        var existingId = $('vId').value;
        var isEdit = !!existingId;

        var btn = $('saveVehicle');
        btn.disabled = true;
        btn.innerHTML = '<span class="spinner"></span> Guardando...';

        var savePromise;

        if (isEdit) {
            var id = parseInt(existingId);
            var editingVehicle = vehicles.find(function(v) { return v.id === id; });
            var expectedVersion = editingVehicle ? (editingVehicle._version || 0) : null;
            var vehicleData = buildVehicleData(id);
            savePromise = saveExistingVehicle(vehicleData, id, expectedVersion);
        } else {
            var candidateId = getNextId();
            var vehicleData = buildVehicleData(candidateId);
            savePromise = saveNewVehicle(vehicleData, candidateId, 10);
        }

        savePromise
            .then(function() {
                var label = (vehicleData.marca || '') + ' ' + (vehicleData.modelo || '') + ' ' + (vehicleData.year || '');
                writeAuditLog(isEdit ? 'vehicle_update' : 'vehicle_create', 'vehiculo #' + vehicleData.id, label.trim());
                toast(isEdit ? 'Vehiculo actualizado (v' + vehicleData._version + ')' : 'Vehiculo #' + vehicleData.id + ' agregado');
                clearDraftFromFirestore();
                closeModalFn(true);
            })
            .catch(function(err) {
                if (err.code === 'version-conflict') {
                    toast(err.message, 'error');
                } else if (err.code === 'permission-denied') {
                    toast('Sin permisos para esta accion. Contacta al Super Admin.', 'error');
                } else {
                    toast('Error: ' + (err.message || err), 'error');
                }
            })
            .finally(function() {
                btn.disabled = false;
                btn.textContent = 'Guardar Vehiculo';
            });
    });

    function getNextId() {
        if (vehicles.length === 0) return 1;
        return Math.max.apply(null, vehicles.map(function(v) { return v.id || 0; })) + 1;
    }

    // ========== DELETE VEHICLE (super_admin only) ==========
    function deleteVehicleFn(id) {
        if (!canDeleteInventory()) {
            toast('Solo un Super Admin puede eliminar vehiculos', 'error');
            return;
        }

        var v = vehicles.find(function(x) { return x.id === id; });
        if (!v) return;

        deleteTargetId = id;
        $('deleteVehicleName').textContent = (v.marca || '').charAt(0).toUpperCase() + (v.marca || '').slice(1) + ' ' + v.modelo + ' ' + v.year;
        $('deleteModal').classList.add('active');
    }

    $('closeDeleteModal').addEventListener('click', function() {
        $('deleteModal').classList.remove('active');
        deleteTargetId = null;
    });

    $('cancelDelete').addEventListener('click', function() {
        $('deleteModal').classList.remove('active');
        deleteTargetId = null;
    });

    $('confirmDelete').addEventListener('click', function() {
        if (!deleteTargetId) return;
        if (!canDeleteInventory()) { toast('Sin permisos', 'error'); return; }

        var btn = $('confirmDelete');
        btn.disabled = true;
        btn.textContent = 'Eliminando...';

        var deletingId = deleteTargetId;
        window.db.collection('vehiculos').doc(String(deleteTargetId)).delete()
            .then(function() {
                writeAuditLog('vehicle_delete', 'vehiculo #' + deletingId, '');
                toast('Vehiculo eliminado');
                $('deleteModal').classList.remove('active');
                deleteTargetId = null;
                loadData();
            })
            .catch(function(err) {
                if (err.code === 'permission-denied') {
                    toast('Sin permisos para eliminar. Solo Super Admin puede eliminar.', 'error');
                } else {
                    toast('Error: ' + err.message, 'error');
                }
            })
            .finally(function() {
                btn.disabled = false;
                btn.textContent = 'Eliminar';
            });
    });

    // ========== IMAGE UPLOAD ==========
    var uploadArea = $('uploadArea');
    var fileInput = $('fileInput');

    uploadArea.addEventListener('click', function() { fileInput.click(); });

    uploadArea.addEventListener('dragover', function(e) { e.preventDefault(); this.classList.add('dragover'); });
    uploadArea.addEventListener('dragleave', function() { this.classList.remove('dragover'); });
    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('dragover');
        if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
    });
    fileInput.addEventListener('change', function() {
        if (this.files.length) { handleFiles(this.files); this.value = ''; }
    });

    function showUploadError(msg) {
        var el = $('uploadError');
        el.textContent = msg;
        el.style.display = 'block';
    }

    function handleFiles(files) {
        if (!window.storage) { showUploadError('Firebase Storage no esta disponible. Usa la opcion de URL manual.'); return; }

        var fileArray = Array.from(files);
        var invalidType = fileArray.filter(function(f) { return UPLOAD_CONFIG.allowedTypes.indexOf(f.type) === -1; });
        if (invalidType.length) {
            showUploadError('Formatos permitidos: JPG, PNG, WebP. Rechazados: ' + invalidType.map(function(f) { return f.name; }).join(', '));
            return;
        }

        var maxBytes = UPLOAD_CONFIG.maxFileSizeMB * 1024 * 1024;
        var oversized = fileArray.filter(function(f) { return f.size > maxBytes * 5; });
        if (oversized.length) { showUploadError('Imagenes demasiado grandes (max 10MB).'); return; }

        $('uploadError').style.display = 'none';
        var total = fileArray.length;
        var done = 0;
        var errors = 0;
        $('uploadProgress').style.display = 'block';
        $('uploadStatus').textContent = 'Comprimiendo y subiendo 0 de ' + total + '...';
        $('progressFill').style.width = '0%';

        fileArray.forEach(function(file) {
            compressImage(file).then(function(compressed) {
                return uploadFileToStorage(compressed);
            }).then(function(success) {
                done++;
                if (!success) errors++;
                updateUploadProgress(done, total, errors);
            }).catch(function() {
                done++;
                errors++;
                updateUploadProgress(done, total, errors);
            });
        });
    }

    function updateUploadProgress(done, total, errors) {
        var pct = Math.round((done / total) * 100);
        $('progressFill').style.width = pct + '%';
        $('uploadStatus').textContent = 'Subiendo ' + done + ' de ' + total + '...';
        if (done === total) {
            setTimeout(function() { $('uploadProgress').style.display = 'none'; }, 1000);
            if (errors === total) showUploadError('No se pudieron subir las imagenes. Verifica Storage.');
            else if (errors > 0) toast((total - errors) + ' subida(s), ' + errors + ' error(es)', 'error');
            else toast(total + ' imagen(es) subida(s)');
        }
    }

    function uploadFileToStorage(file) {
        return new Promise(function(resolve) {
            if (!window.storage) { resolve(false); return; }

            var timestamp = Date.now();
            var safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
            var path = UPLOAD_CONFIG.storagePath + timestamp + '_' + safeName;

            try {
                var ref = window.storage.ref(path);
                ref.put(file).then(function(snapshot) {
                    return snapshot.ref.getDownloadURL();
                }).then(function(url) {
                    uploadedImageUrls.push(url);
                    renderUploadedImages();
                    resolve(true);
                }).catch(function(err) {
                    console.error('[Storage Upload] FALLO:', err.code, err.message);
                    showUploadError('Error subiendo imagen: ' + (err.message || err.code));
                    resolve(false);
                });
            } catch (e) {
                console.error('[Storage Upload] Excepcion:', e);
                resolve(false);
            }
        });
    }

    $('btnAddImageUrl').addEventListener('click', function() {
        var url = $('manualImageUrl').value.trim();
        if (!url) { toast('Ingresa una URL', 'error'); return; }
        if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('multimedia/')) {
            toast('URL no valida', 'error'); return;
        }
        uploadedImageUrls.push(url);
        renderUploadedImages();
        $('manualImageUrl').value = '';
        toast('Imagen agregada');
    });

    function renderUploadedImages() {
        var container = $('uploadedImages');
        var html = '';
        uploadedImageUrls.forEach(function(url, i) {
            var isMain = (i === 0);
            html += '<div class="uploaded-img' + (isMain ? ' main-img' : '') + '" draggable="true" data-idx="' + i + '">' +
                '<div class="img-drag-handle" title="Arrastra para reordenar">☰</div>' +
                '<img src="' + url + '" alt="Foto ' + (i + 1) + '" onerror="this.style.opacity=\'0.3\'">' +
                (isMain ? '<span class="img-badge">PRINCIPAL</span>' : '<span class="img-badge img-badge-num">' + (i + 1) + '</span>') +
                '<button type="button" class="remove-img" onclick="adminPanel.removeImage(' + i + ')">&times;</button>' +
            '</div>';
        });
        container.innerHTML = html;
        $('vImagen').value = uploadedImageUrls[0] || '';
        $('vImagenes').value = uploadedImageUrls.join('\n');
        initImageDragDrop(container);
    }

    function removeImage(index) {
        uploadedImageUrls.splice(index, 1);
        renderUploadedImages();
    }

    // Phase 4: Drag-and-drop image reorder
    var _dragSrcIdx = null;

    function initImageDragDrop(container) {
        var items = container.querySelectorAll('.uploaded-img');
        items.forEach(function(item) {
            item.addEventListener('dragstart', function(e) {
                _dragSrcIdx = parseInt(this.getAttribute('data-idx'));
                this.classList.add('dragging');
                e.dataTransfer.effectAllowed = 'move';
            });
            item.addEventListener('dragend', function() {
                this.classList.remove('dragging');
                container.querySelectorAll('.uploaded-img').forEach(function(el) { el.classList.remove('drag-over'); });
            });
            item.addEventListener('dragover', function(e) {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                this.classList.add('drag-over');
            });
            item.addEventListener('dragleave', function() {
                this.classList.remove('drag-over');
            });
            item.addEventListener('drop', function(e) {
                e.preventDefault();
                this.classList.remove('drag-over');
                var targetIdx = parseInt(this.getAttribute('data-idx'));
                if (_dragSrcIdx !== null && _dragSrcIdx !== targetIdx) {
                    var moved = uploadedImageUrls.splice(_dragSrcIdx, 1)[0];
                    uploadedImageUrls.splice(targetIdx, 0, moved);
                    renderUploadedImages();
                    toast('Imagen reordenada', 'info');
                }
                _dragSrcIdx = null;
            });
        });
    }

    // ========== BRANDS CRUD ==========
    function openBrandModal() { $('brandModal').classList.add('active'); }

    function closeBrandModalFn() {
        $('brandModal').classList.remove('active');
        $('brandForm').reset();
        $('bOriginalId').value = '';
        $('brandLogoPreview').innerHTML = '';
    }

    $('brandForm').addEventListener('submit', function(e) { e.preventDefault(); });
    $('brandForm').addEventListener('keydown', function(e) { if (e.key === 'Enter') e.preventDefault(); });

    $('btnAddBrand').addEventListener('click', function() {
        if (!canCreateOrEditInventory()) { toast('No tienes permisos', 'error'); return; }
        $('brandModalTitle').textContent = 'Agregar Marca';
        $('bOriginalId').value = '';
        $('brandForm').reset();
        $('brandLogoPreview').innerHTML = '';
        $('bId').readOnly = false;
        openBrandModal();
    });

    $('closeBrandModal').addEventListener('click', closeBrandModalFn);
    $('cancelBrandModal').addEventListener('click', closeBrandModalFn);
    $('brandModal').addEventListener('click', function(e) { if (e.target === this) closeBrandModalFn(); });

    $('bLogo').addEventListener('input', function() {
        var url = this.value.trim();
        if (url) {
            $('brandLogoPreview').innerHTML = '<img src="' + url + '" style="width:60px;height:60px;object-fit:contain;border-radius:6px;background:#1a1a2e;padding:4px;" onerror="this.parentNode.innerHTML=\'<small style=color:var(--admin-danger)>URL no valida</small>\'">';
        } else {
            $('brandLogoPreview').innerHTML = '';
        }
    });

    // FASE 2: Upload de logo de marca desde archivo
    $('btnUploadBrandLogo').addEventListener('click', function() {
        $('brandLogoFile').click();
    });

    $('brandLogoFile').addEventListener('change', function() {
        var file = this.files[0];
        if (!file) return;
        if (!window.storage) { toast('Storage no disponible', 'error'); return; }

        var status = $('brandLogoUploadStatus');
        status.style.display = 'block';
        status.textContent = 'Subiendo logo...';

        var safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
        var path = UPLOAD_CONFIG.storagePath + 'logo_' + Date.now() + '_' + safeName;

        try {
            var ref = window.storage.ref(path);
            ref.put(file).then(function(snapshot) {
                return snapshot.ref.getDownloadURL();
            }).then(function(url) {
                $('bLogo').value = url;
                $('brandLogoPreview').innerHTML = '<img src="' + url + '" style="width:60px;height:60px;object-fit:contain;border-radius:6px;background:#1a1a2e;padding:4px;">';
                status.textContent = 'Logo subido correctamente';
                status.style.color = 'var(--admin-success)';
                setTimeout(function() { status.style.display = 'none'; status.style.color = ''; }, 3000);
            }).catch(function(err) {
                status.textContent = 'Error: ' + (err.message || err.code);
                status.style.color = 'var(--admin-danger)';
            });
        } catch (e) {
            status.textContent = 'Error: ' + e.message;
            status.style.color = 'var(--admin-danger)';
        }

        this.value = '';
    });

    function editBrand(brandId) {
        if (!canCreateOrEditInventory()) { toast('No tienes permisos', 'error'); return; }
        var b = brands.find(function(x) { return x.id === brandId; });
        if (!b) return;

        $('brandModalTitle').textContent = 'Editar Marca: ' + b.nombre;
        $('bOriginalId').value = b.id;
        $('bId').value = b.id;
        $('bId').readOnly = true;
        $('bNombre').value = b.nombre || '';
        $('bDescripcion').value = b.descripcion || '';
        $('bLogo').value = b.logo || '';

        if (b.logo) {
            $('brandLogoPreview').innerHTML = '<img src="' + b.logo + '" style="width:60px;height:60px;object-fit:contain;border-radius:6px;background:#1a1a2e;padding:4px;">';
        }

        openBrandModal();
    }

    $('saveBrand').addEventListener('click', function() {
        if (!canCreateOrEditInventory()) { toast('No tienes permisos', 'error'); return; }

        var form = $('brandForm');
        if (!form.checkValidity()) { form.reportValidity(); return; }

        var brandId = $('bId').value.trim().toLowerCase();
        var originalId = $('bOriginalId').value;
        var isEdit = !!originalId;

        var userEmail = window.auth.currentUser ? window.auth.currentUser.email : 'admin';
        var brandData = {
            id: brandId,
            nombre: $('bNombre').value.trim(),
            descripcion: $('bDescripcion').value.trim(),
            logo: $('bLogo').value.trim(),
            updatedAt: new Date().toISOString(),
            updatedBy: userEmail,
            _type: 'marca'
        };

        var btn = $('saveBrand');
        btn.disabled = true;
        btn.innerHTML = '<span class="spinner"></span> Guardando...';

        window.db.collection('marcas').doc(brandId).set(brandData)
            .then(function() {
                writeAuditLog(isEdit ? 'brand_update' : 'brand_create', 'marca ' + brandId, brandData.nombre);
                toast(isEdit ? 'Marca actualizada' : 'Marca agregada');
                closeBrandModalFn();
                loadData();
            })
            .catch(function(err) {
                if (err.code === 'permission-denied') toast('Sin permisos', 'error');
                else toast('Error: ' + err.message, 'error');
            })
            .finally(function() {
                btn.disabled = false;
                btn.textContent = 'Guardar Marca';
            });
    });

    function deleteBrandFn(brandId) {
        if (!canDeleteInventory()) { toast('Solo un Super Admin puede eliminar marcas', 'error'); return; }

        var b = brands.find(function(x) { return x.id === brandId; });
        if (!b) return;

        deleteBrandTargetId = brandId;
        $('deleteBrandName').textContent = b.nombre;
        $('deleteBrandModal').classList.add('active');
    }

    $('closeDeleteBrandModal').addEventListener('click', function() { $('deleteBrandModal').classList.remove('active'); deleteBrandTargetId = null; });
    $('cancelDeleteBrand').addEventListener('click', function() { $('deleteBrandModal').classList.remove('active'); deleteBrandTargetId = null; });

    $('confirmDeleteBrand').addEventListener('click', function() {
        if (!deleteBrandTargetId) return;
        if (!canDeleteInventory()) { toast('Sin permisos', 'error'); return; }

        var btn = $('confirmDeleteBrand');
        btn.disabled = true;
        btn.textContent = 'Eliminando...';

        window.db.collection('marcas').doc(deleteBrandTargetId).delete()
            .then(function() {
                writeAuditLog('brand_delete', 'marca ' + deleteBrandTargetId, '');
                toast('Marca eliminada');
                $('deleteBrandModal').classList.remove('active');
                deleteBrandTargetId = null;
                loadData();
            })
            .catch(function(err) {
                if (err.code === 'permission-denied') toast('Sin permisos para eliminar.', 'error');
                else toast('Error: ' + err.message, 'error');
            })
            .finally(function() {
                btn.disabled = false;
                btn.textContent = 'Eliminar';
            });
    });

    // ========== ESTIMATOR EVENTS ==========
    var estVisitas = $('estVisitas');
    if (estVisitas) {
        estVisitas.addEventListener('input', function() { updateEstimator(); });
    }

    // ========== USERS CRUD (via Cloud Functions) ==========
    function renderUsersTable() {
        if (!users.length) {
            $('usersTableBody').innerHTML = '<tr><td colspan="5" style="text-align:center;padding:2rem;color:var(--admin-text-muted);">No hay usuarios registrados</td></tr>';
            return;
        }

        var currentUid = window.auth.currentUser ? window.auth.currentUser.uid : '';
        var html = '';
        users.forEach(function(u) {
            var rolLabel = u.rol === 'super_admin' ? 'Super Admin' : u.rol === 'editor' ? 'Editor' : 'Viewer';
            var rolClass = u.rol === 'super_admin' ? 'badge-destacado' : u.rol === 'editor' ? 'badge-nuevo' : 'badge-usado';
            var estadoClass = u.estado === 'activo' ? 'badge-nuevo' : 'badge-usado';
            var isSelf = u._docId === currentUid;

            html += '<tr>' +
                '<td><strong>' + (u.nombre || '-') + '</strong>' + (isSelf ? ' <small style="color:var(--admin-gold);">(tu)</small>' : '') + '</td>' +
                '<td>' + (u.email || '-') + '</td>' +
                '<td><span class="badge ' + rolClass + '">' + rolLabel + '</span></td>' +
                '<td><span class="badge ' + estadoClass + '">' + (u.estado || 'activo') + '</span></td>' +
                '<td>' +
                    '<button class="btn btn-ghost btn-sm" onclick="adminPanel.editUser(\'' + u._docId + '\')">Editar</button> ' +
                    (isSelf ? '' : '<button class="btn btn-danger btn-sm" onclick="adminPanel.deleteUser(\'' + u._docId + '\')">Eliminar</button>') +
                '</td>' +
            '</tr>';
        });

        $('usersTableBody').innerHTML = html;
    }

    // User Modal
    function openUserModal() { $('userModal').classList.add('active'); }

    function closeUserModalFn() {
        $('userModal').classList.remove('active');
        $('userForm').reset();
        $('uOriginalUid').value = '';
        $('uPasswordGroup').style.display = '';
        $('uPassword').required = true;
        $('uEmail').readOnly = false;
        $('saveUser').textContent = 'Crear Usuario';
    }

    $('btnAddUser').addEventListener('click', function() {
        if (!canManageUsers()) { toast('No tienes permisos', 'error'); return; }
        $('userModalTitle').textContent = 'Crear Usuario';
        $('uOriginalUid').value = '';
        $('userForm').reset();
        $('uPasswordGroup').style.display = '';
        $('uPassword').required = true;
        $('uEmail').readOnly = false;
        $('saveUser').textContent = 'Crear Usuario';
        openUserModal();
    });

    $('closeUserModal').addEventListener('click', closeUserModalFn);
    $('cancelUserModal').addEventListener('click', closeUserModalFn);
    $('userModal').addEventListener('click', function(e) { if (e.target === this) closeUserModalFn(); });
    $('userForm').addEventListener('submit', function(e) { e.preventDefault(); });
    $('userForm').addEventListener('keydown', function(e) { if (e.key === 'Enter') e.preventDefault(); });

    function editUser(uid) {
        if (!canManageUsers()) { toast('No tienes permisos', 'error'); return; }
        var u = users.find(function(x) { return x._docId === uid; });
        if (!u) return;

        $('userModalTitle').textContent = 'Editar Usuario';
        $('uOriginalUid').value = uid;
        $('uNombre').value = u.nombre || '';
        $('uEmail').value = u.email || '';
        $('uEmail').readOnly = true;
        $('uRol').value = u.rol || 'editor';
        $('uPasswordGroup').style.display = 'none';
        $('uPassword').required = false;
        $('saveUser').textContent = 'Guardar Cambios';
        openUserModal();
    }

    $('saveUser').addEventListener('click', function() {
        if (!canManageUsers()) { toast('No tienes permisos', 'error'); return; }

        var form = $('userForm');
        if (!form.checkValidity()) { form.reportValidity(); return; }

        var originalUid = $('uOriginalUid').value;
        var isEdit = !!originalUid;
        var nombre = $('uNombre').value.trim();
        var email = $('uEmail').value.trim();
        var rol = $('uRol').value;
        var password = $('uPassword').value;

        var btn = $('saveUser');
        btn.disabled = true;
        btn.innerHTML = '<span class="spinner"></span> Guardando...';

        if (!window.functions) {
            toast('Cloud Functions no disponibles. Verifica que esten desplegadas.', 'error');
            btn.disabled = false;
            btn.textContent = isEdit ? 'Guardar Cambios' : 'Crear Usuario';
            return;
        }

        if (isEdit) {
            // Update via Cloud Function
            var updateUserRole = window.functions.httpsCallable('updateUserRoleV2');
            updateUserRole({ uid: originalUid, nombre: nombre, rol: rol })
                .then(function(result) {
                    toast(result.data.message || 'Usuario actualizado');
                    closeUserModalFn();
                    loadUsers();
                })
                .catch(function(err) {
                    console.error('[UpdateUser] Error:', err);
                    toast(parseCallableError(err), 'error');
                })
                .finally(function() {
                    btn.disabled = false;
                    btn.textContent = 'Guardar Cambios';
                });
        } else {
            // Create via Cloud Function (no session change!)
            var createManagedUser = window.functions.httpsCallable('createManagedUserV2');
            createManagedUser({ nombre: nombre, email: email, password: password, rol: rol })
                .then(function(result) {
                    toast(result.data.message || 'Usuario creado exitosamente');
                    closeUserModalFn();
                    loadUsers();
                })
                .catch(function(err) {
                    console.error('[CreateUser] Error:', err);
                    toast(parseCallableError(err), 'error');
                })
                .finally(function() {
                    btn.disabled = false;
                    btn.textContent = 'Crear Usuario';
                });
        }
    });

    var _deletingUser = false;

    function deleteUserFn(uid) {
        if (!canManageUsers()) { toast('No tienes permisos', 'error'); return; }
        if (_deletingUser) { toast('Ya hay una eliminacion en curso...', 'info'); return; }

        var currentUid = window.auth.currentUser ? window.auth.currentUser.uid : '';
        if (uid === currentUid) {
            toast('No puedes eliminar tu propia cuenta', 'error');
            return;
        }

        if (!window.functions) {
            toast('Cloud Functions no disponibles. Verifica que esten desplegadas.', 'error');
            return;
        }

        var u = users.find(function(x) { return x._docId === uid; });
        if (!u) return;

        if (!confirm('Eliminar usuario "' + (u.nombre || u.email) + '"?\n\nSe eliminara tanto su perfil como su cuenta de autenticacion. Esta accion no se puede deshacer.')) {
            return;
        }

        _deletingUser = true;
        toast('Eliminando usuario...', 'info');

        // Disable all delete buttons in users table during operation
        document.querySelectorAll('#usersTableBody .btn-danger').forEach(function(b) { b.disabled = true; });

        // Delete via Cloud Function (deletes Auth + Firestore)
        var deleteManagedUser = window.functions.httpsCallable('deleteManagedUserV2');
        deleteManagedUser({ uid: uid })
            .then(function(result) {
                toast(result.data.message || 'Usuario eliminado completamente');
                loadUsers();
            })
            .catch(function(err) {
                console.error('[DeleteUser] Error:', err);
                toast(parseCallableError(err), 'error');
            })
            .finally(function() {
                _deletingUser = false;
                document.querySelectorAll('#usersTableBody .btn-danger').forEach(function(b) { b.disabled = false; });
            });
    }

    // ========== PHASE 4: PREVIEW VEHICLE (Read-only) ==========
    function previewVehicle(id) {
        var v = vehicles.find(function(x) { return x.id === id; });
        if (!v) return;

        var marca = (v.marca || '').charAt(0).toUpperCase() + (v.marca || '').slice(1);
        var imgs = (v.imagenes || [v.imagen]).filter(Boolean);
        var imgsHtml = imgs.map(function(url, i) {
            return '<img src="' + url + '" style="width:100%;max-height:200px;object-fit:cover;border-radius:6px;margin-bottom:0.5rem;" onerror="this.style.display=\'none\'" alt="Foto ' + (i + 1) + '">';
        }).join('');

        var specs = [
            { label: 'Marca', val: marca },
            { label: 'Modelo', val: v.modelo },
            { label: 'Año', val: v.year },
            { label: 'Tipo', val: v.tipo },
            { label: 'Categoria', val: v.categoria },
            { label: 'Precio', val: formatPrice(v.precio) },
            { label: 'Precio Oferta', val: v.precioOferta ? formatPrice(v.precioOferta) : '-' },
            { label: 'Kilometraje', val: (v.kilometraje || 0).toLocaleString('es-CO') + ' km' },
            { label: 'Transmision', val: v.transmision },
            { label: 'Combustible', val: v.combustible },
            { label: 'Motor', val: v.motor || '-' },
            { label: 'Color', val: v.color || '-' },
            { label: 'Puertas', val: v.puertas || 5 },
            { label: 'Pasajeros', val: v.pasajeros || 5 },
            { label: 'Ubicacion', val: v.ubicacion || '-' },
            { label: 'Estado', val: (v.estado || 'disponible') },
            { label: 'Version', val: v._version || '-' },
            { label: 'Ultima edicion', val: v.updatedAt ? formatTimeAgo(v.updatedAt) + ' por ' + (v.updatedBy || '-') : '-' }
        ];

        var specsHtml = '<table style="width:100%;font-size:0.8rem;border-collapse:collapse;">' +
            specs.map(function(s) {
                return '<tr style="border-bottom:1px solid var(--admin-border,#30363d);">' +
                    '<td style="padding:0.35rem 0.5rem;color:var(--admin-text-muted);white-space:nowrap;">' + s.label + '</td>' +
                    '<td style="padding:0.35rem 0.5rem;color:var(--admin-text-primary,#f0f6fc);font-weight:500;">' + (s.val || '-') + '</td>' +
                '</tr>';
            }).join('') + '</table>';

        var features = (v.caracteristicas || []);
        var featHtml = features.length > 0 ? '<div style="margin-top:0.75rem;"><strong style="font-size:0.8rem;">Caracteristicas:</strong><div style="display:flex;flex-wrap:wrap;gap:0.3rem;margin-top:0.35rem;">' +
            features.map(function(f) { return '<span style="background:var(--admin-surface,#161b22);border:1px solid var(--admin-border,#30363d);border-radius:4px;padding:0.15rem 0.5rem;font-size:0.7rem;">' + escapeHtml(f) + '</span>'; }).join('') +
            '</div></div>' : '';

        var content = '<div style="max-height:70vh;overflow-y:auto;padding-right:0.5rem;">' +
            imgsHtml +
            '<h3 style="margin:0.5rem 0 0.75rem;color:var(--admin-text-primary,#f0f6fc);">' + marca + ' ' + (v.modelo || '') + ' ' + (v.year || '') + '</h3>' +
            specsHtml + featHtml +
            (v.descripcion ? '<div style="margin-top:0.75rem;font-size:0.8rem;color:var(--admin-text-secondary);">' + escapeHtml(v.descripcion) + '</div>' : '') +
            '</div>';

        // Reuse delete modal structure for preview — create a temporary overlay
        var overlay = document.createElement('div');
        overlay.className = 'modal-overlay active';
        overlay.style.zIndex = '999';
        overlay.innerHTML = '<div class="modal" style="max-width:550px;"><div class="modal-header"><h2>Vista Previa — #' + id + '</h2><button class="modal-close" id="closePreview">&times;</button></div><div class="modal-body">' + content + '</div><div class="modal-footer"><button class="btn btn-ghost" id="closePreviewBtn">Cerrar</button><a href="detalle-vehiculo.html?id=' + id + '" target="_blank" class="btn btn-primary btn-sm">Abrir pagina publica</a></div></div>';

        document.body.appendChild(overlay);
        overlay.querySelector('#closePreview').addEventListener('click', function() { document.body.removeChild(overlay); });
        overlay.querySelector('#closePreviewBtn').addEventListener('click', function() { document.body.removeChild(overlay); });
        overlay.addEventListener('click', function(e) { if (e.target === overlay) document.body.removeChild(overlay); });
    }

    // ========== PHASE 4: EXPORT/IMPORT JSON BACKUP ==========
    var btnExport = $('btnExportJSON');
    if (btnExport) {
        btnExport.addEventListener('click', function() {
            var data = {
                exportDate: new Date().toISOString(),
                vehiculos: vehicles,
                marcas: brands
            };
            var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = 'altorra-backup-' + new Date().toISOString().split('T')[0] + '.json';
            a.click();
            URL.revokeObjectURL(url);
            writeAuditLog('backup_export', 'datos', vehicles.length + ' vehiculos, ' + brands.length + ' marcas');
            toast('Respaldo exportado: ' + vehicles.length + ' vehiculos, ' + brands.length + ' marcas');
        });
    }

    var btnImport = $('btnImportJSON');
    var importFile = $('importJSONFile');
    if (btnImport && importFile) {
        btnImport.addEventListener('click', function() { importFile.click(); });
        importFile.addEventListener('change', function() {
            var file = this.files[0];
            if (!file) return;
            if (!isSuperAdmin()) { toast('Solo Super Admin puede importar datos', 'error'); return; }

            var reader = new FileReader();
            reader.onload = function(e) {
                try {
                    var data = JSON.parse(e.target.result);
                    if (!data.vehiculos && !data.marcas) {
                        toast('Archivo JSON invalido: no contiene vehiculos ni marcas.', 'error');
                        return;
                    }

                    var vCount = (data.vehiculos || []).length;
                    var bCount = (data.marcas || []).length;

                    if (!confirm('Importar ' + vCount + ' vehiculos y ' + bCount + ' marcas? Esto REEMPLAZARA los datos existentes con los mismos IDs.')) return;

                    var statusEl = $('backupStatus');
                    statusEl.innerHTML = '<span style="color:var(--admin-accent);">Importando...</span>';

                    var batch = window.db.batch();
                    var count = 0;

                    (data.vehiculos || []).forEach(function(v) {
                        if (!v.id) return;
                        v.updatedAt = new Date().toISOString();
                        v.updatedBy = window.auth.currentUser ? window.auth.currentUser.email : 'import';
                        if (!v._version) v._version = 1;
                        batch.set(window.db.collection('vehiculos').doc(String(v.id)), v);
                        count++;
                    });

                    (data.marcas || []).forEach(function(b) {
                        if (!b.id) return;
                        batch.set(window.db.collection('marcas').doc(b.id), b);
                        count++;
                    });

                    batch.commit().then(function() {
                        writeAuditLog('backup_import', 'datos', vCount + ' vehiculos, ' + bCount + ' marcas');
                        toast('Importados ' + count + ' registros');
                        statusEl.innerHTML = '<span style="color:#3fb950;">✓ Importacion completada: ' + count + ' registros.</span>';
                        loadData();
                    }).catch(function(err) {
                        toast('Error de importacion: ' + err.message, 'error');
                        statusEl.innerHTML = '<span style="color:var(--admin-danger);">Error: ' + err.message + '</span>';
                    });
                } catch (err) {
                    toast('Error al leer archivo JSON: ' + err.message, 'error');
                }
            };
            reader.readAsText(file);
            this.value = '';
        });
    }

    // ========== CONCESIONARIO FIELD TOGGLE ==========
    function toggleConsignaField() {
        var concSelect = $('vConcesionario');
        var partGroup = $('consignaPartGroup');
        if (concSelect && partGroup) {
            partGroup.style.display = concSelect.value === '_particular' ? '' : 'none';
        }
    }
    var concSelectEl = $('vConcesionario');
    if (concSelectEl) {
        concSelectEl.addEventListener('change', toggleConsignaField);
    }

    // ========== LISTAS CONFIGURABLES SECTION ==========
    var LIST_LABELS = {
        tipos: { title: 'Tipos de Vehiculo', desc: 'Nuevo, Usado, etc.' },
        categorias: { title: 'Categorias', desc: 'Sedan, SUV, Pickup, etc.' },
        transmisiones: { title: 'Transmisiones', desc: 'Automatica, Mecanica, etc.' },
        combustibles: { title: 'Combustibles', desc: 'Gasolina, Diesel, Electrico, etc.' },
        direcciones: { title: 'Direcciones', desc: 'Electrica, Hidraulica, etc.' },
        tracciones: { title: 'Tracciones', desc: 'Delantera, 4x4, AWD, etc.' },
        colores: { title: 'Colores', desc: 'Blanco, Negro, Rojo, etc.' },
        canalesVenta: { title: 'Canales de Venta', desc: 'Presencial, WhatsApp, Redes, etc.' }
    };

    function renderListsSection() {
        var container = $('listsContainer');
        if (!container) return;

        var lists = window.DynamicLists ? window.DynamicLists.getLists() : {};
        var defaults = window.DynamicLists ? window.DynamicLists.DEFAULTS : {};

        container.innerHTML = '';
        Object.keys(LIST_LABELS).forEach(function(key) {
            var info = LIST_LABELS[key];
            var items = lists[key] || defaults[key] || [];
            var card = document.createElement('div');
            card.className = 'stat-card';
            card.style.padding = '1.25rem';

            var itemsHtml = items.map(function(item, idx) {
                var val = typeof item === 'string' ? item : item.value;
                var label = typeof item === 'string' ? item : item.label;
                return '<div class="list-item-row" style="display:flex;align-items:center;gap:0.5rem;padding:0.35rem 0;border-bottom:1px solid var(--admin-border);">' +
                    '<input type="text" class="form-input" value="' + escapeHtml(val) + '" data-list="' + key + '" data-idx="' + idx + '" data-field="value" style="flex:1;padding:0.3rem 0.5rem;font-size:0.85rem;" placeholder="Valor">' +
                    '<input type="text" class="form-input" value="' + escapeHtml(label) + '" data-list="' + key + '" data-idx="' + idx + '" data-field="label" style="flex:1;padding:0.3rem 0.5rem;font-size:0.85rem;" placeholder="Etiqueta">' +
                    '<button class="btn btn-danger btn-sm" style="padding:0.2rem 0.5rem;font-size:0.75rem;" onclick="adminPanel.removeListItem(\'' + key + '\',' + idx + ')">&times;</button>' +
                '</div>';
            }).join('');

            card.innerHTML =
                '<h4 style="margin:0 0 0.25rem;color:var(--admin-gold);font-size:0.95rem;">' + info.title + '</h4>' +
                '<p style="font-size:0.75rem;color:var(--admin-text-muted);margin:0 0 0.75rem;">' + info.desc + '</p>' +
                '<div id="list-items-' + key + '">' + itemsHtml + '</div>' +
                '<div style="display:flex;gap:0.5rem;margin-top:0.75rem;">' +
                    '<button class="btn btn-ghost btn-sm" onclick="adminPanel.addListItem(\'' + key + '\')" style="font-size:0.8rem;">+ Agregar</button>' +
                    '<button class="btn btn-primary btn-sm" onclick="adminPanel.saveList(\'' + key + '\')" style="font-size:0.8rem;">Guardar</button>' +
                '</div>';
            container.appendChild(card);
        });
    }

    function addListItem(listKey) {
        var container = $('list-items-' + listKey);
        if (!container) return;
        var items = container.querySelectorAll('.list-item-row');
        var idx = items.length;
        var row = document.createElement('div');
        row.className = 'list-item-row';
        row.style = 'display:flex;align-items:center;gap:0.5rem;padding:0.35rem 0;border-bottom:1px solid var(--admin-border);';
        row.innerHTML =
            '<input type="text" class="form-input" data-list="' + listKey + '" data-idx="' + idx + '" data-field="value" style="flex:1;padding:0.3rem 0.5rem;font-size:0.85rem;" placeholder="Valor (ej: hibrido)">' +
            '<input type="text" class="form-input" data-list="' + listKey + '" data-idx="' + idx + '" data-field="label" style="flex:1;padding:0.3rem 0.5rem;font-size:0.85rem;" placeholder="Etiqueta (ej: Hibrido)">' +
            '<button class="btn btn-danger btn-sm" style="padding:0.2rem 0.5rem;font-size:0.75rem;" onclick="this.parentElement.remove()">&times;</button>';
        container.appendChild(row);
        row.querySelector('input').focus();
    }

    function removeListItem(listKey, idx) {
        var container = $('list-items-' + listKey);
        if (!container) return;
        var rows = container.querySelectorAll('.list-item-row');
        if (rows[idx]) rows[idx].remove();
    }

    function saveList(listKey) {
        if (!isSuperAdmin()) { toast('Solo Super Admin puede modificar listas', 'error'); return; }
        var container = $('list-items-' + listKey);
        if (!container) return;

        var rows = container.querySelectorAll('.list-item-row');
        var items = [];
        rows.forEach(function(row) {
            var valInput = row.querySelector('input[data-field="value"]');
            var labelInput = row.querySelector('input[data-field="label"]');
            if (valInput && labelInput && valInput.value.trim()) {
                items.push({ value: valInput.value.trim(), label: labelInput.value.trim() || valInput.value.trim() });
            }
        });

        if (items.length === 0) { toast('La lista no puede quedar vacia', 'error'); return; }

        // Get current lists and update the specific key
        var currentLists = window.DynamicLists ? JSON.parse(JSON.stringify(window.DynamicLists.getLists())) : {};
        currentLists[listKey] = items;

        window.DynamicLists.saveLists(currentLists).then(function() {
            toast('Lista "' + (LIST_LABELS[listKey] ? LIST_LABELS[listKey].title : listKey) + '" guardada');
            writeAuditLog('list_update', 'lista ' + listKey, items.length + ' opciones');
            // Refresh admin form selects
            if (window.DynamicLists) {
                window.DynamicLists.populateAdminForm();
            }
        }).catch(function(err) {
            toast('Error: ' + err.message, 'error');
        });
    }

    // ========== ADMIN CALENDAR ==========
    var calendarMonth = new Date().getMonth();
    var calendarYear = new Date().getFullYear();
    var blockedDates = {}; // { 'YYYY-MM-DD': true }

    function renderAdminCalendar() {
        var cal = $('adminCalendar');
        var label = $('calMonthLabel');
        if (!cal || !label) return;

        var monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        label.textContent = monthNames[calendarMonth] + ' ' + calendarYear;

        var dayHeaders = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
        var html = dayHeaders.map(function(d) { return '<div style="text-align:center;font-size:0.75rem;font-weight:600;color:var(--admin-text-muted);padding:4px;">' + d + '</div>'; }).join('');

        var firstDay = new Date(calendarYear, calendarMonth, 1).getDay();
        var daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
        var today = new Date();
        today.setHours(0,0,0,0);

        // Get available days from config
        var availDays = [];
        document.querySelectorAll('#availDays input:checked').forEach(function(cb) { availDays.push(parseInt(cb.value)); });

        for (var i = 0; i < firstDay; i++) {
            html += '<div></div>';
        }

        for (var day = 1; day <= daysInMonth; day++) {
            var date = new Date(calendarYear, calendarMonth, day);
            var dateStr = date.toISOString().split('T')[0];
            var isPast = date < today;
            var dayOfWeek = date.getDay();
            var isAvailDay = availDays.indexOf(dayOfWeek) !== -1;
            var isBlocked = blockedDates[dateStr] === true;

            var bgColor, textColor, cursor, border;
            if (isPast) {
                bgColor = 'var(--admin-border)';
                textColor = 'var(--admin-text-muted)';
                cursor = 'default';
                border = 'transparent';
            } else if (!isAvailDay) {
                bgColor = 'var(--admin-border)';
                textColor = 'var(--admin-text-muted)';
                cursor = 'default';
                border = 'transparent';
            } else if (isBlocked) {
                bgColor = 'rgba(248,81,73,0.2)';
                textColor = '#f85149';
                cursor = 'pointer';
                border = '#f85149';
            } else {
                bgColor = 'rgba(63,185,80,0.15)';
                textColor = '#3fb950';
                cursor = 'pointer';
                border = '#3fb950';
            }

            var clickable = !isPast && isAvailDay;
            html += '<div style="text-align:center;padding:8px 4px;border-radius:8px;font-size:0.85rem;font-weight:600;' +
                'background:' + bgColor + ';color:' + textColor + ';cursor:' + cursor + ';border:1px solid ' + border + ';"' +
                (clickable ? ' onclick="adminPanel.toggleBlockDate(\'' + dateStr + '\')"' : '') +
                ' title="' + (isPast ? 'Pasado' : !isAvailDay ? 'Dia no habilitado' : isBlocked ? 'Bloqueado - clic para desbloquear' : 'Disponible - clic para bloquear') + '">' +
                day + '</div>';
        }

        cal.innerHTML = html;
    }

    function toggleBlockDate(dateStr) {
        if (!isSuperAdmin()) { toast('Solo Super Admin puede bloquear dias', 'error'); return; }
        if (blockedDates[dateStr]) {
            delete blockedDates[dateStr];
        } else {
            blockedDates[dateStr] = true;
        }
        saveBlockedDates();
        renderAdminCalendar();
    }

    function saveBlockedDates() {
        var blockedList = Object.keys(blockedDates).filter(function(k) { return blockedDates[k]; });
        window.db.collection('config').doc('availability').update({
            blockedDates: blockedList,
            updatedAt: new Date().toISOString()
        }).catch(function(err) {
            // If doc doesn't exist yet, set instead
            window.db.collection('config').doc('availability').set({
                blockedDates: blockedList,
                updatedAt: new Date().toISOString()
            }, { merge: true }).catch(function() {});
        });
    }

    function loadBlockedDates() {
        window.db.collection('config').doc('availability').get().then(function(doc) {
            if (doc.exists && doc.data().blockedDates) {
                blockedDates = {};
                doc.data().blockedDates.forEach(function(d) { blockedDates[d] = true; });
            }
            // Also load interval
            if (doc.exists && doc.data().interval && $('availInterval')) {
                $('availInterval').value = doc.data().interval;
            }
            renderAdminCalendar();
        }).catch(function() { renderAdminCalendar(); });
    }

    var calPrev = $('calPrevMonth');
    var calNext = $('calNextMonth');
    if (calPrev) calPrev.addEventListener('click', function() {
        calendarMonth--;
        if (calendarMonth < 0) { calendarMonth = 11; calendarYear--; }
        renderAdminCalendar();
    });
    if (calNext) calNext.addEventListener('click', function() {
        calendarMonth++;
        if (calendarMonth > 11) { calendarMonth = 0; calendarYear++; }
        renderAdminCalendar();
    });

    // ========== ENHANCED APPOINTMENTS (with observations, reschedule, contact info) ==========
    function renderAppointmentsTable() {
        var body = $('appointmentsBody');
        if (!body) return;
        var filterEl = $('appointmentFilter');
        var filter = filterEl ? filterEl.value : 'all';
        var filtered = filter === 'all' ? appointments : appointments.filter(function(a) { return a.estado === filter; });

        if (filtered.length === 0) {
            body.innerHTML = '<tr><td colspan="7" style="text-align:center;color:var(--admin-text-muted);padding:2rem;">No hay citas ' + (filter === 'all' ? '' : filter + 's') + '</td></tr>';
            return;
        }

        body.innerHTML = filtered.map(function(a) {
            var estadoColors = {
                pendiente: 'admin-warning',
                confirmada: 'admin-success',
                reprogramada: 'admin-info',
                completada: 'admin-gold',
                cancelada: 'admin-danger'
            };
            var estadoClass = estadoColors[a.estado] || 'admin-warning';
            var estadoLabel = a.estado ? (a.estado.charAt(0).toUpperCase() + a.estado.slice(1)) : 'Pendiente';

            return '<tr>' +
                '<td><strong>' + escapeHtml(a.nombre || '-') + '</strong></td>' +
                '<td><div style="font-size:0.85rem;">' + escapeHtml(a.telefono || '-') + '</div><div style="font-size:0.75rem;color:var(--admin-text-muted);">' + escapeHtml(a.email || '-') + '</div></td>' +
                '<td>' + escapeHtml(a.vehiculo || 'General') + '</td>' +
                '<td><div>' + escapeHtml(a.fecha || '-') + '</div><div style="font-weight:600;">' + escapeHtml(a.hora || '-') + '</div></td>' +
                '<td><span style="color:var(--' + estadoClass + ');font-weight:600;font-size:0.85rem;">' + estadoLabel + '</span></td>' +
                '<td style="max-width:150px;font-size:0.8rem;color:var(--admin-text-muted);">' + escapeHtml(a.observaciones || a.comentarios || '-') + '</td>' +
                '<td style="white-space:nowrap;">' +
                    '<button class="btn btn-sm btn-ghost" onclick="adminPanel.manageAppointment(\'' + a._docId + '\')" title="Gestionar">Gestionar</button>' +
                '</td>' +
            '</tr>';
        }).join('');
    }

    function manageAppointment(docId) {
        var a = appointments.find(function(x) { return x._docId === docId; });
        if (!a) return;

        $('amDocId').value = docId;
        $('amEstado').value = a.estado || 'pendiente';
        $('amObservaciones').value = a.observaciones || '';

        $('amClientInfo').innerHTML =
            '<strong>' + escapeHtml(a.nombre || '') + '</strong><br>' +
            'Tel: ' + escapeHtml(a.telefono || '-') + ' | Email: ' + escapeHtml(a.email || '-') + '<br>' +
            'Vehiculo: ' + escapeHtml(a.vehiculo || 'General') + '<br>' +
            'Fecha: ' + escapeHtml(a.fecha || '-') + ' | Hora: ' + escapeHtml(a.hora || '-');

        toggleReprogramarGroup();
        $('appointmentModal').classList.add('active');
    }

    function toggleReprogramarGroup() {
        var group = $('amReprogramarGroup');
        var estado = $('amEstado').value;
        if (group) group.style.display = estado === 'reprogramada' ? '' : 'none';
    }

    var amEstadoEl = $('amEstado');
    if (amEstadoEl) amEstadoEl.addEventListener('change', toggleReprogramarGroup);

    var closeAppModal = $('closeAppointmentModal');
    if (closeAppModal) closeAppModal.addEventListener('click', function() { $('appointmentModal').classList.remove('active'); });
    var cancelAppModal = $('cancelAppointmentModal');
    if (cancelAppModal) cancelAppModal.addEventListener('click', function() { $('appointmentModal').classList.remove('active'); });
    var appModalEl = $('appointmentModal');
    if (appModalEl) appModalEl.addEventListener('click', function(e) { if (e.target === this) this.classList.remove('active'); });

    var saveAppStatusBtn = $('saveAppointmentStatus');
    if (saveAppStatusBtn) {
        saveAppStatusBtn.addEventListener('click', function() {
            var docId = $('amDocId').value;
            if (!docId) return;
            if (!isEditorOrAbove() && !isSuperAdmin()) { toast('Sin permisos', 'error'); return; }

            var updateData = {
                estado: $('amEstado').value,
                observaciones: $('amObservaciones').value.trim(),
                updatedAt: new Date().toISOString(),
                updatedBy: window.auth.currentUser.email
            };

            if ($('amEstado').value === 'reprogramada') {
                var nuevaFecha = $('amNuevaFecha').value;
                var nuevaHora = $('amNuevaHora').value;
                if (nuevaFecha) updateData.fecha = nuevaFecha;
                if (nuevaHora) updateData.hora = nuevaHora;
            }

            window.db.collection('citas').doc(docId).update(updateData).then(function() {
                toast('Cita actualizada a: ' + updateData.estado);
                writeAuditLog('appointment_' + updateData.estado, 'cita ' + docId, updateData.observaciones || '');
                $('appointmentModal').classList.remove('active');
            }).catch(function(err) {
                toast('Error: ' + err.message, 'error');
            });
        });
    }

    function isEditorOrAbove() {
        return isSuperAdmin() || isEditor();
    }

    // ========== VEHICLES BY ORIGIN ==========
    function renderVehiclesByOrigin() {
        var body = $('vehiclesByOriginBody');
        if (!body) return;

        var vehiclesWithOrigin = vehicles.map(function(v) {
            var origin = '';
            if (v.concesionario && v.concesionario !== '' && v.concesionario !== '_particular') {
                var d = dealers.find(function(x) { return x._docId === v.concesionario; });
                origin = d ? d.nombre : v.concesionario;
            } else if (v.concesionario === '_particular' && v.consignaParticular) {
                origin = 'Consigna: ' + v.consignaParticular;
            } else {
                origin = 'Propio';
            }
            return { vehicle: v, origin: origin };
        });

        // Sort by origin
        vehiclesWithOrigin.sort(function(a, b) { return a.origin.localeCompare(b.origin); });

        if (vehiclesWithOrigin.length === 0) {
            body.innerHTML = '<tr><td colspan="4" style="text-align:center;color:var(--admin-text-muted);padding:2rem;">No hay vehiculos</td></tr>';
            return;
        }

        body.innerHTML = vehiclesWithOrigin.map(function(item) {
            var v = item.vehicle;
            var marca = v.marca ? (v.marca.charAt(0).toUpperCase() + v.marca.slice(1)) : '';
            var estadoInfo = ESTADO_LABELS[v.estado || 'disponible'] || ESTADO_LABELS.disponible;
            return '<tr>' +
                '<td><strong>' + marca + ' ' + (v.modelo || '') + ' ' + (v.year || '') + '</strong></td>' +
                '<td>' + escapeHtml(item.origin) + '</td>' +
                '<td><span class="badge ' + estadoInfo.cls + '">' + estadoInfo.text + '</span></td>' +
                '<td>' + formatPrice(v.precio) + '</td>' +
            '</tr>';
        }).join('');
    }

    // ========== INIT DYNAMIC LISTS IN ADMIN ==========
    function initDynamicListsAdmin() {
        if (!window.DynamicLists) return;
        window.DynamicLists.load().then(function() {
            window.DynamicLists.populateAdminForm();
            renderListsSection();
            loadBlockedDates();
        });
    }

    // Hook into loadData
    var _origLoadData = loadData;
    loadData = function() {
        _origLoadData();
        initDynamicListsAdmin();
    };

    // ========== EXPOSE FUNCTIONS ==========
    window.adminPanel = {
        editVehicle: editVehicle,
        deleteVehicle: deleteVehicleFn,
        removeImage: removeImage,
        editBrand: editBrand,
        deleteBrand: deleteBrandFn,
        editUser: editUser,
        deleteUser: deleteUserFn,
        previewVehicle: previewVehicle,
        updateAppointment: updateAppointmentStatus,
        editDealer: editDealer,
        markAsSold: markAsSold,
        addListItem: addListItem,
        removeListItem: removeListItem,
        saveList: saveList,
        toggleBlockDate: toggleBlockDate,
        manageAppointment: manageAppointment
    };

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

    // ========== SITEMAP GENERATOR ==========
    var btnSitemap = $('btnGenerateSitemap');
    if (btnSitemap) {
        btnSitemap.addEventListener('click', function() {
            generateSitemap();
        });
    }

    var btnSharePages = $('btnGenerateSharePages');
    if (btnSharePages) {
        btnSharePages.addEventListener('click', function() {
            generateSharePages();
        });
    }

    function generateSitemap() {
        var statusEl = $('sitemapStatus');
        if (!statusEl) return;
        statusEl.innerHTML = '<span style="color:var(--admin-accent);font-size:0.8rem;">Generando sitemap...</span>';

        var today = new Date().toISOString().split('T')[0];
        var base = 'https://altorracars.github.io';

        // Static pages
        var xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
        xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n\n';

        var staticPages = [
            { loc: '/', priority: '1.0', freq: 'daily' },
            { loc: '/busqueda.html', priority: '0.9', freq: 'weekly' },
            { loc: '/vehiculos-usados.html', priority: '0.9', freq: 'daily' },
            { loc: '/vehiculos-nuevos.html', priority: '0.9', freq: 'daily' },
            { loc: '/vehiculos-suv.html', priority: '0.8', freq: 'weekly' },
            { loc: '/vehiculos-sedan.html', priority: '0.8', freq: 'weekly' },
            { loc: '/vehiculos-pickup.html', priority: '0.8', freq: 'weekly' },
            { loc: '/vehiculos-hatchback.html', priority: '0.8', freq: 'weekly' },
            { loc: '/contacto.html', priority: '0.7', freq: 'monthly' },
            { loc: '/nosotros.html', priority: '0.7', freq: 'monthly' },
            { loc: '/favoritos.html', priority: '0.6', freq: 'monthly' },
            { loc: '/simulador-credito.html', priority: '0.7', freq: 'monthly' }
        ];

        staticPages.forEach(function(p) {
            xml += '  <url>\n';
            xml += '    <loc>' + base + p.loc + '</loc>\n';
            xml += '    <lastmod>' + today + '</lastmod>\n';
            xml += '    <changefreq>' + p.freq + '</changefreq>\n';
            xml += '    <priority>' + p.priority + '</priority>\n';
            xml += '  </url>\n\n';
        });

        // Brand pages from DB
        brands.forEach(function(b) {
            xml += '  <url>\n';
            xml += '    <loc>' + base + '/marca.html?marca=' + encodeURIComponent(b.id) + '</loc>\n';
            xml += '    <lastmod>' + today + '</lastmod>\n';
            xml += '    <changefreq>weekly</changefreq>\n';
            xml += '    <priority>0.7</priority>\n';
            xml += '  </url>\n\n';
        });

        // Vehicle detail pages from DB
        var disponibles = vehicles.filter(function(v) {
            return !v.estado || v.estado === 'disponible';
        });

        disponibles.forEach(function(v) {
            var lastmod = v.updatedAt ? v.updatedAt.split('T')[0] : today;
            xml += '  <url>\n';
            xml += '    <loc>' + base + '/detalle-vehiculo.html?id=' + v.id + '</loc>\n';
            xml += '    <lastmod>' + lastmod + '</lastmod>\n';
            xml += '    <changefreq>weekly</changefreq>\n';
            xml += '    <priority>0.8</priority>\n';
            if (v.imagen) {
                var imgUrl = v.imagen.startsWith('http') ? v.imagen : base + '/' + v.imagen;
                var marca = v.marca ? v.marca.charAt(0).toUpperCase() + v.marca.slice(1) : '';
                xml += '    <image:image>\n';
                xml += '      <image:loc>' + escapeXml(imgUrl) + '</image:loc>\n';
                xml += '      <image:title>' + escapeXml(marca + ' ' + (v.modelo || '') + ' ' + (v.year || '')) + '</image:title>\n';
                xml += '    </image:image>\n';
            }
            xml += '  </url>\n\n';
        });

        xml += '</urlset>\n';

        // Download as file
        var blob = new Blob([xml], { type: 'application/xml' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'sitemap.xml';
        a.click();
        URL.revokeObjectURL(url);

        var count = staticPages.length + brands.length + disponibles.length;
        statusEl.innerHTML = '<span style="color:#3fb950;font-size:0.8rem;">✓ Sitemap generado con ' + count + ' URLs (' + disponibles.length + ' vehiculos). Sube el archivo a la raiz del repositorio.</span>';
    }

    function escapeXml(str) {
        return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    // ========== SHARE PAGES GENERATOR ==========
    function generateSharePages() {
        var statusEl = $('sitemapStatus');
        if (!statusEl) return;

        var disponibles = vehicles.filter(function(v) {
            return !v.estado || v.estado === 'disponible';
        });

        if (disponibles.length === 0) {
            statusEl.innerHTML = '<span style="color:var(--admin-danger);font-size:0.8rem;">No hay vehiculos disponibles para generar.</span>';
            return;
        }

        statusEl.innerHTML = '<span style="color:var(--admin-accent);font-size:0.8rem;">Generando ' + disponibles.length + ' paginas...</span>';

        var base = 'https://altorracars.github.io';
        var files = [];

        disponibles.forEach(function(v) {
            var marca = v.marca ? (v.marca.charAt(0).toUpperCase() + v.marca.slice(1)) : '';
            var modelo = v.modelo || '';
            var year = v.year || '';
            var title = marca + ' ' + modelo + ' ' + year + ' | ALTORRA CARS';
            var precio = v.precioOferta || v.precio || 0;
            var precioText = precio ? ('$' + Number(precio).toLocaleString('es-CO')) : '';
            var desc = marca + ' ' + modelo + ' ' + year + ' - ' + precioText + '. Disponible en ALTORRA CARS, Cartagena.';
            var image = v.imagen || '';
            var fullImage = image.startsWith('http') ? image : base + '/' + image;
            var detailUrl = base + '/detalle-vehiculo.html?id=' + v.id;

            var html = '<!DOCTYPE html>\n<html lang="es">\n<head>\n';
            html += '<meta charset="UTF-8">\n';
            html += '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n';
            html += '<title>' + escapeHtml(title) + '</title>\n';
            html += '<meta name="description" content="' + escapeHtml(desc) + '">\n';
            html += '<meta property="og:type" content="product">\n';
            html += '<meta property="og:url" content="' + escapeHtml(detailUrl) + '">\n';
            html += '<meta property="og:title" content="' + escapeHtml(title) + '">\n';
            html += '<meta property="og:description" content="' + escapeHtml(desc) + '">\n';
            html += '<meta property="og:image" content="' + escapeHtml(fullImage) + '">\n';
            html += '<meta property="og:image:width" content="1200">\n';
            html += '<meta property="og:image:height" content="630">\n';
            html += '<meta property="og:site_name" content="ALTORRA CARS">\n';
            html += '<meta property="og:locale" content="es_CO">\n';
            html += '<meta name="twitter:card" content="summary_large_image">\n';
            html += '<meta name="twitter:title" content="' + escapeHtml(title) + '">\n';
            html += '<meta name="twitter:description" content="' + escapeHtml(desc) + '">\n';
            html += '<meta name="twitter:image" content="' + escapeHtml(fullImage) + '">\n';
            html += '<meta http-equiv="refresh" content="0;url=' + detailUrl + '">\n';
            html += '<link rel="canonical" href="' + detailUrl + '">\n';
            html += '<style>body{font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#0a0a0a;color:#d4af37;}a{color:#d4af37;}</style>\n';
            html += '</head>\n<body>\n';
            html += '<p>Redirigiendo a <a href="' + detailUrl + '">' + escapeHtml(marca + ' ' + modelo + ' ' + year) + '</a>...</p>\n';
            html += '<script>window.location.replace("' + detailUrl + '");<\/script>\n';
            html += '</body>\n</html>\n';

            files.push({ name: v.id + '.html', content: html });
        });

        // Download each file individually is impractical. Create a single combined download.
        // Generate as a single HTML file with instructions + all file contents for manual creation.
        var combined = '<!-- PAGINAS DE COMPARTIR - ALTORRA CARS -->\n';
        combined += '<!-- Instrucciones: Copia cada seccion en un archivo dentro de la carpeta v/ del repositorio -->\n';
        combined += '<!-- Ejemplo: v/1.html, v/2.html, etc. -->\n';
        combined += '<!-- Luego comparte: https://altorracars.github.io/v/1.html -->\n\n';

        files.forEach(function(f) {
            combined += '<!-- ===== ARCHIVO: v/' + f.name + ' ===== -->\n';
            combined += f.content;
            combined += '\n\n';
        });

        // Also create them as individual downloads for the first vehicle as example
        // But mainly download all at once
        var blob = new Blob([combined], { type: 'text/html' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'paginas-compartir-vehiculos.html';
        a.click();
        URL.revokeObjectURL(url);

        statusEl.innerHTML = '<span style="color:#3fb950;font-size:0.8rem;">✓ ' + files.length + ' paginas generadas. Separa cada seccion en archivos individuales dentro de la carpeta <strong>v/</strong> del repositorio.<br>Ejemplo: <code>v/' + files[0].name + '</code> → comparte: <code>' + base + '/v/' + files[0].name + '</code></span>';
    }

    // ========== PHASE 5: APPOINTMENTS MANAGEMENT ==========
    var appointments = [];
    var unsubAppointments = null;

    function loadAppointments() {
        if (unsubAppointments) unsubAppointments();
        unsubAppointments = window.db.collection('citas').orderBy('createdAt', 'desc').onSnapshot(function(snap) {
            appointments = snap.docs.map(function(doc) { return Object.assign({ _docId: doc.id }, doc.data()); });
            renderAppointmentsTable();
            var pending = appointments.filter(function(a) { return a.estado === 'pendiente'; }).length;
            var badge = $('navBadgeAppointments');
            if (badge) badge.textContent = pending > 0 ? pending : '';
        }, function(err) {
            console.warn('[Citas] Error loading appointments:', err);
        });
    }

    // Old renderAppointmentsTable removed - now defined in enhanced appointments section above

    // Save availability config (enhanced with interval and blocked dates)
    var btnSaveAvail2 = $('btnSaveAvailability');
    if (btnSaveAvail2) {
        btnSaveAvail2.addEventListener('click', function() {
            if (!isSuperAdmin()) { toast('Solo Super Admin puede cambiar disponibilidad', 'error'); return; }
            var startHour = parseInt($('availStartHour').value);
            var endHour = parseInt($('availEndHour').value);
            var interval = $('availInterval') ? parseInt($('availInterval').value) : 30;
            var days = [];
            document.querySelectorAll('#availDays input:checked').forEach(function(cb) { days.push(parseInt(cb.value)); });
            var blockedList = Object.keys(blockedDates).filter(function(k) { return blockedDates[k]; });
            window.db.collection('config').doc('availability').set({
                startHour: startHour,
                endHour: endHour,
                days: days,
                interval: interval,
                blockedDates: blockedList,
                updatedAt: new Date().toISOString()
            }).then(function() {
                toast('Disponibilidad guardada');
                $('availabilityStatus').innerHTML = '<span style="color:var(--admin-success);">Guardado correctamente</span>';
                renderAdminCalendar();
            }).catch(function(err) {
                toast('Error: ' + err.message, 'error');
            });
        });
    }

    // Load availability config (enhanced)
    function loadAvailabilityConfig() {
        window.db.collection('config').doc('availability').get().then(function(doc) {
            if (!doc.exists) return;
            var data = doc.data();
            if (data.startHour && $('availStartHour')) $('availStartHour').value = data.startHour;
            if (data.endHour && $('availEndHour')) $('availEndHour').value = data.endHour;
            if (data.interval && $('availInterval')) $('availInterval').value = data.interval;
            if (data.days) {
                document.querySelectorAll('#availDays input').forEach(function(cb) {
                    cb.checked = data.days.indexOf(parseInt(cb.value)) !== -1;
                });
            }
            if (data.blockedDates) {
                blockedDates = {};
                data.blockedDates.forEach(function(d) { blockedDates[d] = true; });
            }
            renderAdminCalendar();
        }).catch(function() { renderAdminCalendar(); });
    }

    // ========== PHASE 5: CONCESIONARIOS ==========
    var dealers = [];
    var unsubDealers = null;

    function loadDealers() {
        if (unsubDealers) unsubDealers();
        unsubDealers = window.db.collection('concesionarios').onSnapshot(function(snap) {
            dealers = snap.docs.map(function(doc) { return Object.assign({ _docId: doc.id }, doc.data()); });
            renderDealersList();
            renderVehiclesByOrigin();
        }, function(err) {
            console.warn('[Dealers] Error loading:', err);
        });
    }

    function renderDealersList() {
        var container = $('dealersList');
        if (!container) return;

        if (dealers.length === 0) {
            container.innerHTML = '<p style="text-align:center;color:var(--admin-text-muted);padding:1rem;">No hay concesionarios registrados. Agrega el primero.</p>';
            return;
        }

        // Calculate metrics per dealer
        var soldByDealer = {};
        var soldVehicles = vehicles.filter(function(v) { return v.estado === 'vendido'; });
        soldVehicles.forEach(function(v) {
            var d = v.concesionario || 'sin-asignar';
            if (!soldByDealer[d]) soldByDealer[d] = { count: 0, revenue: 0 };
            soldByDealer[d].count++;
            soldByDealer[d].revenue += (v.precioVenta || v.precio || 0);
        });

        var activeByDealer = {};
        vehicles.filter(function(v) { return v.estado === 'disponible' || !v.estado; }).forEach(function(v) {
            var d = v.concesionario || 'sin-asignar';
            activeByDealer[d] = (activeByDealer[d] || 0) + 1;
        });

        container.innerHTML = '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1rem;">' +
            dealers.map(function(d) {
                var sold = soldByDealer[d._docId] || { count: 0, revenue: 0 };
                var active = activeByDealer[d._docId] || 0;
                return '<div style="background:var(--admin-surface);border:1px solid var(--admin-border);border-radius:12px;padding:1.25rem;">' +
                    '<div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:0.75rem;">' +
                        '<div><h4 style="margin:0;color:var(--admin-gold);">' + (d.nombre || 'Sin nombre') + '</h4>' +
                        '<small style="color:var(--admin-text-muted);">' + (d.ciudad || '') + ' - ' + (d.direccion || '') + '</small></div>' +
                        (isSuperAdmin() ? '<button class="btn btn-sm btn-ghost" onclick="adminPanel.editDealer(\'' + d._docId + '\')" style="font-size:0.75rem;">Editar</button>' : '') +
                    '</div>' +
                    '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:0.5rem;text-align:center;">' +
                        '<div style="background:rgba(63,185,80,0.1);padding:0.5rem;border-radius:8px;"><div style="font-size:1.25rem;font-weight:800;color:var(--admin-success);">' + active + '</div><div style="font-size:0.7rem;color:var(--admin-text-muted);">Activos</div></div>' +
                        '<div style="background:rgba(212,175,55,0.1);padding:0.5rem;border-radius:8px;"><div style="font-size:1.25rem;font-weight:800;color:var(--admin-gold);">' + sold.count + '</div><div style="font-size:0.7rem;color:var(--admin-text-muted);">Vendidos</div></div>' +
                        '<div style="background:rgba(88,166,255,0.1);padding:0.5rem;border-radius:8px;"><div style="font-size:0.85rem;font-weight:800;color:var(--admin-info);">$' + (sold.revenue > 0 ? (sold.revenue / 1000000).toFixed(1) + 'M' : '0') + '</div><div style="font-size:0.7rem;color:var(--admin-text-muted);">Ingresos</div></div>' +
                    '</div>' +
                    (d.telefono ? '<div style="margin-top:0.5rem;font-size:0.8rem;color:var(--admin-text-muted);">Tel: ' + d.telefono + '</div>' : '') +
                    (d.horario ? '<div style="font-size:0.8rem;color:var(--admin-text-muted);">Horario: ' + d.horario + '</div>' : '') +
                '</div>';
            }).join('') +
        '</div>';
    }

    // Dealer Modal
    var btnAddDealer = $('btnAddDealer');
    if (btnAddDealer) {
        btnAddDealer.addEventListener('click', function() {
            if (!isSuperAdmin()) { toast('Solo Super Admin puede gestionar concesionarios', 'error'); return; }
            $('dealerModalTitle').textContent = 'Agregar Concesionario';
            $('dOriginalId').value = '';
            $('dealerForm').reset();
            $('dCiudad').value = 'Barranquilla';
            $('dealerModal').classList.add('active');
        });
    }

    var closeDealerModalEl = $('closeDealerModal');
    if (closeDealerModalEl) closeDealerModalEl.addEventListener('click', function() { $('dealerModal').classList.remove('active'); });
    var cancelDealerModalEl = $('cancelDealerModal');
    if (cancelDealerModalEl) cancelDealerModalEl.addEventListener('click', function() { $('dealerModal').classList.remove('active'); });
    var dealerModalEl = $('dealerModal');
    if (dealerModalEl) dealerModalEl.addEventListener('click', function(e) { if (e.target === this) this.classList.remove('active'); });

    function editDealer(docId) {
        if (!isSuperAdmin()) { toast('Sin permisos', 'error'); return; }
        var d = dealers.find(function(x) { return x._docId === docId; });
        if (!d) return;
        $('dealerModalTitle').textContent = 'Editar Concesionario';
        $('dOriginalId').value = docId;
        $('dNombre').value = d.nombre || '';
        $('dDireccion').value = d.direccion || '';
        $('dTelefono').value = d.telefono || '';
        $('dCiudad').value = d.ciudad || 'Barranquilla';
        $('dHorario').value = d.horario || '';
        $('dResponsable').value = d.responsable || '';
        $('dealerModal').classList.add('active');
    }

    var saveDealerBtn = $('saveDealer');
    if (saveDealerBtn) {
        saveDealerBtn.addEventListener('click', function() {
            if (!isSuperAdmin()) { toast('Sin permisos', 'error'); return; }
            var nombre = $('dNombre').value.trim();
            if (!nombre) { toast('Nombre es requerido', 'error'); return; }

            var dealerData = {
                nombre: nombre,
                direccion: $('dDireccion').value.trim(),
                telefono: $('dTelefono').value.trim(),
                ciudad: $('dCiudad').value.trim() || 'Barranquilla',
                horario: $('dHorario').value.trim(),
                responsable: $('dResponsable').value.trim(),
                updatedAt: new Date().toISOString(),
                updatedBy: window.auth.currentUser.email
            };

            var existingId = $('dOriginalId').value;
            var savePromise;
            if (existingId) {
                savePromise = window.db.collection('concesionarios').doc(existingId).update(dealerData);
            } else {
                var docId = nombre.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
                savePromise = window.db.collection('concesionarios').doc(docId).set(dealerData);
            }

            savePromise.then(function() {
                toast(existingId ? 'Concesionario actualizado' : 'Concesionario creado');
                writeAuditLog(existingId ? 'dealer_update' : 'dealer_create', 'concesionario ' + nombre, '');
                $('dealerModal').classList.remove('active');
            }).catch(function(err) {
                toast('Error: ' + err.message, 'error');
            });
        });
    }

    // ========== PHASE 5: SOLD VEHICLES ==========
    function renderSoldVehicles() {
        var body = $('soldVehiclesBody');
        if (!body) return;
        var sold = vehicles.filter(function(v) { return v.estado === 'vendido'; });
        sold.sort(function(a, b) { return (b.fechaVenta || b.updatedAt || '').localeCompare(a.fechaVenta || a.updatedAt || ''); });

        if (sold.length === 0) {
            body.innerHTML = '<tr><td colspan="5" style="text-align:center;color:var(--admin-text-muted);padding:2rem;">No hay vehiculos vendidos registrados</td></tr>';
            return;
        }

        body.innerHTML = sold.map(function(v) {
            var marca = v.marca ? (v.marca.charAt(0).toUpperCase() + v.marca.slice(1)) : '';
            return '<tr>' +
                '<td><strong>' + marca + ' ' + (v.modelo || '') + ' ' + (v.year || '') + '</strong></td>' +
                '<td>' + formatPrice(v.precioVenta || v.precio) + '</td>' +
                '<td>' + (v.fechaVenta || v.updatedAt || '-').split('T')[0] + '</td>' +
                '<td>' + (v.canalVenta || '-') + '</td>' +
                '<td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;">' + (v.observacionesVenta || '-') + '</td>' +
            '</tr>';
        }).join('');
    }

    // Mark Vehicle as Sold
    function markAsSold(vehicleId) {
        if (!canCreateOrEditInventory()) { toast('Sin permisos', 'error'); return; }
        var v = vehicles.find(function(x) { return x.id === vehicleId; });
        if (!v) return;

        $('soldVehicleId').value = vehicleId;
        var marca = v.marca ? (v.marca.charAt(0).toUpperCase() + v.marca.slice(1)) : '';
        $('soldVehicleInfo').innerHTML = '<strong>' + marca + ' ' + (v.modelo || '') + ' ' + (v.year || '') + '</strong><br>Precio actual: ' + formatPrice(v.precio);
        $('soldPrecio').value = v.precio || '';
        $('soldCanal').value = '';
        $('soldObservaciones').value = '';
        $('soldModal').classList.add('active');
    }

    var closeSoldModalEl = $('closeSoldModal');
    if (closeSoldModalEl) closeSoldModalEl.addEventListener('click', function() { $('soldModal').classList.remove('active'); });
    var cancelSoldModalEl = $('cancelSoldModal');
    if (cancelSoldModalEl) cancelSoldModalEl.addEventListener('click', function() { $('soldModal').classList.remove('active'); });
    var soldModalEl = $('soldModal');
    if (soldModalEl) soldModalEl.addEventListener('click', function(e) { if (e.target === this) this.classList.remove('active'); });

    var confirmSoldBtn = $('confirmSold');
    if (confirmSoldBtn) {
        confirmSoldBtn.addEventListener('click', function() {
            var vehicleId = parseInt($('soldVehicleId').value);
            if (!vehicleId) return;
            var precioVenta = parseInt($('soldPrecio').value);
            var canal = $('soldCanal').value;
            if (!precioVenta || !canal) { toast('Precio y canal son requeridos', 'error'); return; }

            var v = vehicles.find(function(x) { return x.id === vehicleId; });
            var currentVersion = v ? (v._version || 0) : 0;

            window.db.collection('vehiculos').doc(String(vehicleId)).update({
                estado: 'vendido',
                precioVenta: precioVenta,
                canalVenta: canal,
                observacionesVenta: $('soldObservaciones').value.trim(),
                fechaVenta: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                updatedBy: window.auth.currentUser.email,
                _version: currentVersion + 1
            }).then(function() {
                var marca = v ? (v.marca || '') : '';
                toast('Vehiculo marcado como vendido');
                writeAuditLog('vehicle_sold', 'vehiculo #' + vehicleId, marca + ' - ' + formatPrice(precioVenta) + ' via ' + canal);
                $('soldModal').classList.remove('active');
            }).catch(function(err) {
                toast('Error: ' + err.message, 'error');
            });
        });
    }

    // ========== PHASE 5: HOOK INTO LOAD DATA ==========
    var _originalLoadData = typeof loadData === 'function' ? loadData : null;

    // We need to hook into the existing loadData to also load appointments and dealers
    // But loadData is defined above. Let me find and hook into it.

    // ========== INIT ==========
    initAuth();

    // Expose functions for onclick handlers
    window.adminPanel = window.adminPanel || {};
    window.adminPanel.removeImage = removeImage;
    window.adminPanel.editVehicle = editVehicle;
    window.adminPanel.deleteVehicle = deleteVehicleFn;
    window.adminPanel.editBrand = typeof editBrand !== 'undefined' ? editBrand : function() {};
    window.adminPanel.deleteBrand = typeof deleteBrandFn !== 'undefined' ? deleteBrandFn : function() {};
    window.adminPanel.previewVehicle = typeof previewVehicle !== 'undefined' ? previewVehicle : function() {};
    window.adminPanel.updateAppointment = updateAppointmentStatus;
    window.adminPanel.editDealer = editDealer;
    window.adminPanel.markAsSold = markAsSold;

})();
