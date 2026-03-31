// Admin Panel — Real-time Sync & Data Loading
(function() {
    'use strict';
    var AP = window.AP;
    var $ = AP.$;

    // Señaliza a las páginas públicas que los datos cambiaron.
    // Se llama después del primer snapshot (cambios reales, no carga inicial).
    function signalCacheInvalidation() {
        if (!window.db) return;
        window.db.doc('system/meta').set(
            { lastModified: Date.now() },
            { merge: true }
        ).catch(function() { /* sin permisos o sin red — silencioso */ });
    }

    function startRealtimeSync() {
        stopRealtimeSync();
        AP._vehiclesLoaded = false;
        AP._brandsLoaded = false;
        var _vehiclesInitialized = false;
        var _brandsInitialized   = false;

        if (AP._loadingTimeout) clearTimeout(AP._loadingTimeout);
        AP._loadingTimeout = setTimeout(function() {
            if (!AP._vehiclesLoaded || !AP._brandsLoaded) {
                if (AP._retryCount < AP.MAX_RETRIES) {
                    AP._retryCount++;
                    AP.toast('Reintentando cargar datos... (intento ' + AP._retryCount + '/' + AP.MAX_RETRIES + ')', 'warning');
                    startRealtimeSync();
                } else {
                    showLoadingError();
                }
            }
        }, 15000);

        AP.unsubVehicles = window.db.collection('vehiculos').onSnapshot(function(snap) {
            AP._vehiclesLoaded = true;
            AP.vehicles = snap.docs.map(function(d) { return d.data(); });

            // F0.5: Automatic schema migration — runs once on first load
            // Idempotent: only touches vehicles missing required fields
            if (!_vehiclesInitialized && window.db && AP.canCreateOrEditInventory && AP.canCreateOrEditInventory()) {
                migrateVehicleSchema(AP.vehicles);
            }

            // Primer snapshot = carga inicial; los siguientes = cambios reales del admin
            if (_vehiclesInitialized) signalCacheInvalidation();
            _vehiclesInitialized = true;
            if (AP.renderVehiclesTable) AP.renderVehiclesTable();
            if (AP._populateVehicleFilters) AP._populateVehicleFilters();
            if (AP.updateStats) AP.updateStats();
            if (AP.renderActivityFeed) AP.renderActivityFeed();
            if (AP.updateEstimator) AP.updateEstimator();
            if (AP.updateNavBadges) AP.updateNavBadges();
            if (AP.renderVehiclesByOrigin) AP.renderVehiclesByOrigin();
            if (AP.renderDealersList) AP.renderDealersList();
            checkLoadingComplete();
        }, function(err) {
            console.error('Vehicles snapshot error:', err);
            handleSnapshotError('vehiculos', err);
        });

        AP.unsubBrands = window.db.collection('marcas').onSnapshot(function(snap) {
            AP._brandsLoaded = true;
            AP.brands = snap.docs.map(function(d) { return d.data(); });
            if (_brandsInitialized) signalCacheInvalidation();
            _brandsInitialized = true;
            if (AP.renderBrandsTable) AP.renderBrandsTable();
            if (AP.populateBrandSelect) AP.populateBrandSelect();
            if (AP.updateStats) AP.updateStats();
            if (AP.renderActivityFeed) AP.renderActivityFeed();
            if (AP.updateNavBadges) AP.updateNavBadges();
            checkLoadingComplete();
        }, function(err) {
            console.error('Brands snapshot error:', err);
            handleSnapshotError('marcas', err);
        });

        if (AP.canManageUsers()) {
            loadUsers();
        }
    }

    function checkLoadingComplete() {
        if (AP._vehiclesLoaded && AP._brandsLoaded) {
            if (AP._loadingTimeout) { clearTimeout(AP._loadingTimeout); AP._loadingTimeout = null; }
            AP._retryCount = 0;
            // F3.6: Auto-cache data for offline mode
            if (AP._autoCacheData) AP._autoCacheData();
        }
    }

    function handleSnapshotError(collection, err) {
        if (err.code === 'permission-denied') {
            AP.toast('Sin permisos para acceder a ' + collection + '. Verifica tu rol.', 'error');
        }
    }

    function showLoadingError() {
        var vBody = $('vehiclesTableBody');
        if (vBody && AP.vehicles.length === 0) {
            vBody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:2rem;color:#f85149;">' +
                'Error al cargar vehiculos. <a href="#" data-action="retryLoad" style="color:#58a6ff;text-decoration:underline;">Reintentar</a>' +
                '</td></tr>';
        }
        AP.toast('No se pudieron cargar los datos. Verifica tu conexion a internet.', 'error');
    }

    function retryLoad() {
        AP._retryCount = 0;
        AP.toast('Recargando datos...', 'info');
        AP.loadData();
    }

    function stopRealtimeSync() {
        if (AP.unsubVehicles) { AP.unsubVehicles(); AP.unsubVehicles = null; }
        if (AP.unsubBrands) { AP.unsubBrands(); AP.unsubBrands = null; }
        if (AP.unsubAppointments) { AP.unsubAppointments(); AP.unsubAppointments = null; }
        if (AP.unsubDealers) { AP.unsubDealers(); AP.unsubDealers = null; }
        if (AP.unsubAuditLog) { AP.unsubAuditLog(); AP.unsubAuditLog = null; }
        if (AP.unsubBanners) { AP.unsubBanners(); AP.unsubBanners = null; }
        if (AP.unsubReviews) { AP.unsubReviews(); AP.unsubReviews = null; }
    }

    function loadData() {
        // F3.6: Try loading from cache if offline
        if (AP.loadFromCacheIfOffline && AP.loadFromCacheIfOffline()) return;
        // F2.2: Show skeleton loaders while data loads
        if (AP.showStatsSkeleton) AP.showStatsSkeleton();
        if (AP.showTableSkeleton) AP.showTableSkeleton('vehiclesTableBody', 8);
        startRealtimeSync();
        try {
            if (AP.loadAppointments) AP.loadAppointments();
            if (AP.loadDealers) AP.loadDealers();
            if (AP.loadAvailabilityConfig) AP.loadAvailabilityConfig();
            if (AP.loadAuditLog) AP.loadAuditLog();
            if (AP.subscribeBanners) AP.subscribeBanners();
            if (AP.subscribeReviews) AP.subscribeReviews();
            if (AP.startDraftsListener) AP.startDraftsListener();
        } catch (e) {
            console.warn('[Phase5] Error loading:', e);
        }
        if (window.DynamicLists) {
            window.DynamicLists.load().then(function() {
                window.DynamicLists.populateAdminForm();
                if (AP.renderListsSection) AP.renderListsSection();
                if (AP.loadBlockedDates) AP.loadBlockedDates();
            });
        }
    }

    // ========== F0.5: VEHICLE SCHEMA MIGRATION ==========
    // Runs once on first snapshot. Idempotent, non-destructive, parallel.
    // Generates codigoUnico for legacy vehicles, fills missing defaults.
    var _migrationRan = false;
    function migrateVehicleSchema(vehicles) {
        if (_migrationRan) return;
        _migrationRan = true;

        // Schema defaults — only applied if field is missing/falsy
        var DEFAULTS = {
            estado: 'disponible',
            tipo: 'usado',
            direccion: 'Electrica',
            ubicacion: 'Cartagena',
            puertas: 5,
            pasajeros: 5,
            asientos: 5,
            placa: 'Disponible al contactar',
            codigoFasecolda: 'Consultar',
            revisionTecnica: true,
            peritaje: true,
            destacado: false,
            featuredWeek: false,
            prioridad: 0,
            oferta: false
        };

        // Find vehicles needing migration
        var toMigrate = vehicles.filter(function(v) {
            if (!v.codigoUnico) return true;
            if (!v._version && v._version !== 0) return true;
            if (!v.estado) return true;
            // featuredWeek must match destacado
            if (!!v.featuredWeek !== !!v.destacado) return true;
            return false;
        });

        if (toMigrate.length === 0) return;

        // Get the current code sequence counter
        var counterRef = window.db.collection('config').doc('counters');
        counterRef.get().then(function(counterDoc) {
            var currentSeq = counterDoc.exists ? (counterDoc.data().vehicleCodeSeq || 0) : 0;
            var needsCodes = toMigrate.filter(function(v) { return !v.codigoUnico; });
            var newSeq = currentSeq + needsCodes.length;

            // Generate codes for vehicles without one
            var codeIndex = 0;
            var now = new Date();
            var yyyy = now.getFullYear();
            var mm = String(now.getMonth() + 1).padStart(2, '0');

            // Build batch updates (max 500 per batch)
            var batches = [window.db.batch()];
            var batchCount = 0;
            var totalMigrated = 0;

            toMigrate.forEach(function(v) {
                var patch = {};
                var needsUpdate = false;

                // Generate codigoUnico if missing
                if (!v.codigoUnico) {
                    codeIndex++;
                    var seq = String(currentSeq + codeIndex).padStart(4, '0');
                    patch.codigoUnico = 'ALT-' + yyyy + mm + '-' + seq;
                    needsUpdate = true;
                }

                // Add _version if missing
                if (!v._version && v._version !== 0) {
                    patch._version = 1;
                    needsUpdate = true;
                }

                // Fill missing defaults
                Object.keys(DEFAULTS).forEach(function(key) {
                    if (v[key] === undefined || v[key] === null || v[key] === '') {
                        // Don't overwrite explicit false/0 values
                        if (typeof DEFAULTS[key] === 'boolean' && v[key] === false) return;
                        if (typeof DEFAULTS[key] === 'number' && v[key] === 0) return;
                        patch[key] = DEFAULTS[key];
                        needsUpdate = true;
                    }
                });

                // Sync featuredWeek with destacado
                if (!!v.featuredWeek !== !!v.destacado) {
                    patch.featuredWeek = !!v.destacado;
                    needsUpdate = true;
                }

                if (needsUpdate) {
                    if (batchCount >= 499) {
                        batches.push(window.db.batch());
                        batchCount = 0;
                    }
                    var ref = window.db.collection('vehiculos').doc(String(v.id));
                    batches[batches.length - 1].update(ref, patch);
                    batchCount++;
                    totalMigrated++;
                }
            });

            if (totalMigrated === 0) return;

            // Update counter if codes were generated
            if (needsCodes.length > 0) {
                batches[batches.length - 1].set(counterRef, { vehicleCodeSeq: newSeq }, { merge: true });
            }

            // Commit all batches in parallel
            Promise.all(batches.map(function(b) { return b.commit(); }))
                .then(function() {
                    AP.toast(totalMigrated + ' vehiculo(s) migrados al nuevo esquema', 'info');
                    AP.writeAuditLog('vehicle_migration', 'sistema', 'Migrados ' + totalMigrated + ' vehiculos (codigos, defaults, version)');
                })
                .catch(function(err) {
                    console.warn('[Migration] Error:', err.message);
                });
        }).catch(function(err) {
            console.warn('[Migration] Could not read counter:', err.message);
        });
    }

    function loadUsers() {
        if (!AP.canManageUsers()) return;
        window.db.collection('usuarios').get().then(function(snap) {
            AP.users = snap.docs.map(function(d) {
                var data = d.data();
                data._docId = d.id;
                return data;
            });
            if (AP.renderUsersTable) AP.renderUsersTable();
        }).catch(function(err) {
            var msg = 'Error al cargar usuarios.';
            if (err.code === 'permission-denied') {
                msg = 'Sin permisos para ver usuarios. Verifica que las Firestore Rules esten desplegadas y tu rol sea super_admin.';
            } else {
                msg += ' ' + err.message;
            }
            $('usersTableBody').innerHTML = '<tr><td colspan="5" style="text-align:center;padding:2rem;color:var(--admin-text-muted);">' + msg + '</td></tr>';
        });
    }

    // F9.3: Single-pass updateStats with accumulator
    function updateStats() {
        var s = { nuevos: 0, usados: 0, ofertas: 0, destacados: 0, vendidos: 0 };
        AP.vehicles.forEach(function(v) {
            if (v.tipo === 'nuevo') s.nuevos++;
            else if (v.tipo === 'usado') s.usados++;
            if (v.oferta || v.precioOferta) s.ofertas++;
            if (v.destacado) s.destacados++;
            if (v.estado === 'vendido') s.vendidos++;
        });
        $('statTotal').textContent = AP.vehicles.length;
        $('statNuevos').textContent = s.nuevos;
        $('statUsados').textContent = s.usados;
        $('statOfertas').textContent = s.ofertas;
        $('statDestacados').textContent = s.destacados;
        $('statMarcas').textContent = AP.brands.length;
        $('statVendidos').textContent = s.vendidos;
        var citasEl = $('statCitas');
        if (citasEl) citasEl.textContent = (AP.appointments && AP.appointments.length > 0) ? AP.appointments.filter(function(a) { return a.estado === 'pendiente'; }).length : '-';
    }

    function updateNavBadges() {
        var vBadge = $('navBadgeVehicles');
        var bBadge = $('navBadgeBrands');
        if (vBadge) vBadge.textContent = AP.vehicles.length || '';
        if (bBadge) bBadge.textContent = AP.brands.length || '';

        // F8.3: Unread appointments badge
        var aBadge = $('navBadgeAppointments');
        if (aBadge && AP.appointments) {
            var lastVisit = parseInt(localStorage.getItem('ac_citas_last_visit') || '0', 10);
            var unread = AP.appointments.filter(function(a) {
                if (!a.createdAt) return false;
                var ts = typeof a.createdAt === 'number' ? a.createdAt :
                    (a.createdAt && typeof a.createdAt.toDate === 'function') ? a.createdAt.toDate().getTime() :
                    new Date(a.createdAt).getTime();
                return ts > lastVisit;
            }).length;
            aBadge.textContent = unread > 0 ? unread : '';
            aBadge.classList.toggle('badge-unread', unread > 0);
        }
    }

    function updateEstimator() {
        var el = $('storageEstimator');
        if (!el) return;

        var totalImages = 0;
        AP.vehicles.forEach(function(v) {
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
        var storagePct = (storageUsedGB / AP.FREE_TIER.storageGB) * 100;

        var visitsInput = $('estVisitas');
        var monthlyVisits = visitsInput ? (parseInt(visitsInput.value, 10) || 500) : 500;
        var avgImagesPerVisit = 8;
        var egressGB = (monthlyVisits * avgImagesPerVisit * avgSizeKB) / (1024 * 1024);
        var egressPct = (egressGB / AP.FREE_TIER.egressGB) * 100;

        var classAUsed = totalImages;
        var classAPct = (classAUsed / AP.FREE_TIER.classAOps) * 100;
        var classBUsed = monthlyVisits * avgImagesPerVisit;
        var classBPct = (classBUsed / AP.FREE_TIER.classBOps) * 100;
        var maxPct = Math.max(storagePct, egressPct, classAPct, classBPct);

        function renderEstBar(label, value, detail, pct) {
            var color = pct >= 90 ? 'var(--admin-danger)' : pct >= 70 ? 'var(--admin-warning)' : 'var(--admin-success)';
            var clampedPct = Math.min(pct, 100);
            return '<div class="est-item"><div style="display:flex;justify-content:space-between;font-size:0.75rem;margin-bottom:2px;"><span>' + label + '</span><span style="color:var(--admin-text-muted);">' + detail + '</span></div><div style="height:6px;background:var(--admin-border);border-radius:3px;overflow:hidden;"><div style="height:100%;width:' + clampedPct + '%;background:' + color + ';border-radius:3px;transition:width 0.3s;"></div></div></div>';
        }

        var html = '<div class="est-grid">' +
            renderEstBar('Almacenamiento', storageUsedMB.toFixed(1) + ' MB', storageUsedGB.toFixed(3) + ' / ' + AP.FREE_TIER.storageGB + ' GB', storagePct) +
            renderEstBar('Egreso mensual', egressGB.toFixed(2) + ' GB', egressGB.toFixed(2) + ' / ' + AP.FREE_TIER.egressGB + ' GB', egressPct) +
            renderEstBar('Op. Clase A (subidas)', classAUsed, classAUsed + ' / ' + AP.FREE_TIER.classAOps.toLocaleString(), classAPct) +
            renderEstBar('Op. Clase B (lecturas)', classBUsed.toLocaleString(), classBUsed.toLocaleString() + ' / ' + AP.FREE_TIER.classBOps.toLocaleString(), classBPct) +
        '</div>';

        if (maxPct >= 70) {
            html += '<div style="margin-top:0.75rem;padding:0.5rem 0.75rem;background:rgba(210,153,34,0.15);border:1px solid var(--admin-warning);border-radius:6px;font-size:0.8rem;color:var(--admin-warning);">Te estas acercando al limite gratuito. Considera reducir imagenes o visitas.</div>';
        } else {
            html += '<div style="margin-top:0.5rem;font-size:0.75rem;color:var(--admin-text-muted);">' + totalImages + ' imagenes en Storage | Compresion automatica activa (~150KB/img)</div>';
        }

        el.innerHTML = html;
    }

    // Estimator events
    var estVisitas = $('estVisitas');
    if (estVisitas) estVisitas.addEventListener('input', function() { updateEstimator(); });

    // F6.4: Event delegation for retry link
    var vBody = $('vehiclesTableBody');
    if (vBody) {
        vBody.addEventListener('click', function(e) {
            var el = e.target.nodeType === 1 ? e.target : e.target.parentElement;
            var link = el && el.closest ? el.closest('[data-action="retryLoad"]') : null;
            if (link) { e.preventDefault(); retryLoad(); }
        });
    }

    // Expose
    AP.loadData = loadData;
    AP.loadUsers = loadUsers;
    AP.stopRealtimeSync = stopRealtimeSync;
    AP.retryLoad = retryLoad;
    AP.updateStats = updateStats;
    AP.updateNavBadges = updateNavBadges;
    AP.updateEstimator = updateEstimator;
    AP.signalCacheInvalidation = signalCacheInvalidation;
})();
