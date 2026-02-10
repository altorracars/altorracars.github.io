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

    // ========== RBAC STATE ==========
    var currentUserProfile = null;
    var currentUserRole = null;

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
            window.auth.onAuthStateChanged(function(user) {
                if (user) {
                    loadUserProfile(user);
                } else {
                    currentUserProfile = null;
                    currentUserRole = null;
                    showLogin();
                }
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
                    // No profile -> try bootstrap via Cloud Function (safe, server-side)
                    console.log('[RBAC] No profile found. Attempting bootstrap via Cloud Function...');
                    attemptBootstrap(authUser);
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

    function attemptBootstrap(authUser) {
        if (!window.functions) {
            showAccessDenied(authUser.email, authUser.uid, 'Cloud Functions no disponibles. Verifica que esten desplegadas.');
            return;
        }

        var bootstrapFn = window.functions.httpsCallable('bootstrapFirstUser');
        bootstrapFn({})
            .then(function(result) {
                var data = result.data;
                if (data.success) {
                    currentUserProfile = data.profile;
                    currentUserProfile._docId = authUser.uid;
                    currentUserRole = data.profile.rol;
                    console.log('[RBAC] Bootstrap result:', data.alreadyExisted ? 'profile existed' : 'NEW super_admin created');
                    showAdmin(authUser);
                }
            })
            .catch(function(err) {
                console.error('[RBAC] Bootstrap failed:', err);
                var msg = parseCallableError(err);
                showAccessDenied(authUser.email, authUser.uid, msg);
            });
    }

    function showAccessDenied(email, uid, reason) {
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
        $('loginScreen').style.display = 'flex';
        $('adminPanel').style.display = 'none';
    }

    function showAdmin(user) {
        $('loginScreen').style.display = 'none';
        $('adminPanel').style.display = 'flex';
        $('adminEmail').textContent = user.email + ' (' + (currentUserRole === 'super_admin' ? 'Super Admin' : currentUserRole === 'editor' ? 'Editor' : 'Viewer') + ')';

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

        window.auth.signInWithEmailAndPassword(email, pass)
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

    // Change password
    $('changePasswordForm').addEventListener('submit', function(e) {
        e.preventDefault();
        var newPass = $('newPassword').value;
        window.auth.currentUser.updatePassword(newPass)
            .then(function() {
                toast('Contrasena actualizada');
                $('newPassword').value = '';
            })
            .catch(function(err) { toast('Error: ' + err.message, 'error'); });
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

    // ========== LOAD DATA ==========
    function loadData() {
        window.db.collection('vehiculos').get().then(function(snap) {
            vehicles = snap.docs.map(function(d) { return d.data(); });
            renderVehiclesTable();
            updateStats();
            updateEstimator();
            updateNavBadges();
        });
        window.db.collection('marcas').get().then(function(snap) {
            brands = snap.docs.map(function(d) { return d.data(); });
            renderBrandsTable();
            populateBrandSelect();
            updateStats();
            updateNavBadges();
        });

        // Only load users if super_admin (avoids permission errors for editor/viewer)
        if (canManageUsers()) {
            loadUsers();
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
    function renderVehiclesTable(filter) {
        var filtered = vehicles;
        if (filter) {
            var q = filter.toLowerCase();
            filtered = vehicles.filter(function(v) {
                return (v.marca + ' ' + v.modelo + ' ' + v.year).toLowerCase().indexOf(q) >= 0;
            });
        }

        filtered.sort(function(a, b) { return a.id - b.id; });

        var html = '';
        filtered.forEach(function(v) {
            var badges = '';
            if (v.destacado) badges += '<span class="badge badge-destacado">Destacado</span> ';
            if (v.oferta || v.precioOferta) badges += '<span class="badge badge-oferta">Oferta</span> ';

            var actions = '';
            if (canCreateOrEditInventory()) {
                actions += '<button class="btn btn-ghost btn-sm" onclick="adminPanel.editVehicle(' + v.id + ')">Editar</button> ';
            }
            if (canDeleteInventory()) {
                actions += '<button class="btn btn-danger btn-sm" onclick="adminPanel.deleteVehicle(' + v.id + ')">Eliminar</button>';
            }
            if (!actions) actions = '<span style="color:var(--admin-text-muted);font-size:0.75rem;">Solo lectura</span>';

            html += '<tr>' +
                '<td>' + v.id + '</td>' +
                '<td><img class="vehicle-thumb" src="' + (v.imagen || 'multimedia/vehicles/placeholder-car.jpg') + '" alt="" onerror="this.src=\'multimedia/vehicles/placeholder-car.jpg\'"></td>' +
                '<td><strong>' + (v.marca || '').charAt(0).toUpperCase() + (v.marca || '').slice(1) + ' ' + (v.modelo || '') + '</strong><br><small style="color:#8b949e">' + v.year + '</small></td>' +
                '<td><span class="badge badge-' + v.tipo + '">' + v.tipo + '</span></td>' +
                '<td>' + (v.categoria || '-') + '</td>' +
                '<td>' + formatPrice(v.precio) + (v.precioOferta ? '<br><small style="color: var(--admin-warning);">' + formatPrice(v.precioOferta) + '</small>' : '') + '</td>' +
                '<td>' + badges + '</td>' +
                '<td>' + actions + '</td>' +
            '</tr>';
        });

        if (!html) html = '<tr><td colspan="8" style="text-align:center; padding:2rem; color:#8b949e;">No se encontraron vehiculos</td></tr>';
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

    function closeModalFn() {
        $('vehicleModal').classList.remove('active');
        $('vehicleForm').reset();
        $('vId').value = '';
        uploadedImageUrls = [];
        $('uploadedImages').innerHTML = '';
        $('uploadProgress').style.display = 'none';
        $('uploadError').style.display = 'none';
        $('manualImageUrl').value = '';
        $('featuresPreview').innerHTML = '';
    }

    $('btnAddVehicle').addEventListener('click', function() {
        if (!canCreateOrEditInventory()) { toast('No tienes permisos para crear vehiculos', 'error'); return; }
        $('modalTitle').textContent = 'Agregar Vehiculo';
        $('vId').value = '';
        $('vehicleForm').reset();
        $('vUbicacion').value = 'Barranquilla';
        $('vDireccion').value = 'Electrica';
        $('vRevision').checked = true;
        $('vPeritaje').checked = true;
        uploadedImageUrls = [];
        $('uploadedImages').innerHTML = '';
        $('uploadError').style.display = 'none';
        openModal();
    });

    $('closeModal').addEventListener('click', closeModalFn);
    $('cancelModal').addEventListener('click', closeModalFn);
    $('vehicleModal').addEventListener('click', function(e) { if (e.target === this) closeModalFn(); });

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
        $('vDestacado').checked = !!v.destacado;
        $('vOferta').checked = !!(v.oferta || v.precioOferta);
        $('vRevision').checked = v.revisionTecnica !== false;
        $('vPeritaje').checked = v.peritaje !== false;
        $('vCaracteristicas').value = (v.caracteristicas || []).join('\n');

        uploadedImageUrls = (v.imagenes && v.imagenes.length) ? v.imagenes.slice() : (v.imagen ? [v.imagen] : []);
        renderUploadedImages();
        $('uploadError').style.display = 'none';

        openModal();
    }

    // ========== SAVE VEHICLE ==========
    $('saveVehicle').addEventListener('click', function() {
        if (!canCreateOrEditInventory()) { toast('No tienes permisos', 'error'); return; }

        var form = $('vehicleForm');
        if (!form.checkValidity()) { form.reportValidity(); return; }

        var existingId = $('vId').value;
        var id = existingId ? parseInt(existingId) : getNextId();

        var precioOferta = $('vPrecioOferta').value ? parseInt($('vPrecioOferta').value) : null;

        var vehicleData = {
            id: id,
            marca: $('vMarca').value,
            modelo: $('vModelo').value,
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
            color: $('vColor').value || '',
            puertas: parseInt($('vPuertas').value) || 5,
            pasajeros: parseInt($('vPasajeros').value) || 5,
            asientos: parseInt($('vPasajeros').value) || 5,
            ubicacion: $('vUbicacion').value || 'Barranquilla',
            placa: $('vPlaca').value || 'Disponible al contactar',
            codigoFasecolda: $('vFasecolda').value || 'Consultar',
            revisionTecnica: $('vRevision').checked,
            peritaje: $('vPeritaje').checked,
            descripcion: $('vDescripcion').value || '',
            destacado: $('vDestacado').checked,
            imagen: uploadedImageUrls[0] || 'multimedia/vehicles/placeholder-car.jpg',
            imagenes: uploadedImageUrls.length ? uploadedImageUrls.slice() : ['multimedia/vehicles/placeholder-car.jpg'],
            caracteristicas: $('vCaracteristicas').value.split('\n').map(function(s) { return s.trim(); }).filter(Boolean)
        };

        if (vehicleData.imagen && vehicleData.imagenes.indexOf(vehicleData.imagen) === -1) {
            vehicleData.imagenes.unshift(vehicleData.imagen);
        }

        var btn = $('saveVehicle');
        btn.disabled = true;
        btn.innerHTML = '<span class="spinner"></span> Guardando...';

        window.db.collection('vehiculos').doc(String(id)).set(vehicleData)
            .then(function() {
                toast(existingId ? 'Vehiculo actualizado' : 'Vehiculo agregado');
                closeModalFn();
                loadData();
            })
            .catch(function(err) {
                if (err.code === 'permission-denied') {
                    toast('Sin permisos para esta accion. Contacta al Super Admin.', 'error');
                } else {
                    toast('Error: ' + err.message, 'error');
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

        window.db.collection('vehiculos').doc(String(deleteTargetId)).delete()
            .then(function() {
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
            html += '<div class="uploaded-img' + (isMain ? ' main-img' : '') + '">' +
                '<img src="' + url + '" alt="Foto ' + (i + 1) + '" onerror="this.style.opacity=\'0.3\'">' +
                (isMain ? '<span class="img-badge">PRINCIPAL</span>' : '') +
                '<button type="button" class="remove-img" onclick="adminPanel.removeImage(' + i + ')">&times;</button>' +
            '</div>';
        });
        container.innerHTML = html;
        $('vImagen').value = uploadedImageUrls[0] || '';
        $('vImagenes').value = uploadedImageUrls.join('\n');
    }

    function removeImage(index) {
        uploadedImageUrls.splice(index, 1);
        renderUploadedImages();
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

        var brandData = {
            id: brandId,
            nombre: $('bNombre').value.trim(),
            descripcion: $('bDescripcion').value.trim(),
            logo: $('bLogo').value.trim()
        };

        var btn = $('saveBrand');
        btn.disabled = true;
        btn.innerHTML = '<span class="spinner"></span> Guardando...';

        window.db.collection('marcas').doc(brandId).set(brandData)
            .then(function() {
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

    // ========== EXPOSE FUNCTIONS ==========
    window.adminPanel = {
        editVehicle: editVehicle,
        deleteVehicle: deleteVehicleFn,
        removeImage: removeImage,
        editBrand: editBrand,
        deleteBrand: deleteBrandFn,
        editUser: editUser,
        deleteUser: deleteUserFn
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

    // ========== INIT ==========
    initAuth();

})();
