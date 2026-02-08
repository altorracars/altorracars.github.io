// Admin Panel Logic for ALTORRA CARS
(function() {
    'use strict';

    var vehicles = [];
    var brands = [];
    var deleteTargetId = null;
    var deleteBrandTargetId = null;
    var uploadedImageUrls = [];

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
        setTimeout(function() { t.classList.remove('show'); }, 3000);
    }

    function formatPrice(n) {
        if (!n) return '-';
        return '$' + Number(n).toLocaleString('es-CO');
    }

    // ========== IMAGE COMPRESSION ==========
    function compressImage(file) {
        return new Promise(function(resolve, reject) {
            // If already small enough and is webp, skip compression
            if (file.size <= 200 * 1024 && file.type === 'image/webp') {
                resolve(file);
                return;
            }

            var img = new Image();
            var canvas = document.createElement('canvas');
            var reader = new FileReader();

            reader.onload = function(e) {
                img.onload = function() {
                    // Calculate new dimensions (max 1200px wide, maintain ratio)
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

                    // Try WebP first, fallback to JPEG
                    var outputType = 'image/webp';
                    var quality = UPLOAD_CONFIG.compressionQuality;

                    canvas.toBlob(function(blob) {
                        if (!blob) {
                            // WebP not supported, try JPEG
                            canvas.toBlob(function(jpegBlob) {
                                if (!jpegBlob) {
                                    resolve(file); // Give up, use original
                                    return;
                                }
                                var ext = '.jpg';
                                var name = file.name.replace(/\.[^.]+$/, '') + '_compressed' + ext;
                                var compressed = new File([jpegBlob], name, { type: 'image/jpeg' });
                                console.log('Compressed: ' + (file.size / 1024).toFixed(0) + 'KB -> ' + (compressed.size / 1024).toFixed(0) + 'KB (JPEG)');
                                resolve(compressed);
                            }, 'image/jpeg', quality);
                            return;
                        }
                        var ext = '.webp';
                        var name = file.name.replace(/\.[^.]+$/, '') + '_compressed' + ext;
                        var compressed = new File([blob], name, { type: outputType });
                        console.log('Compressed: ' + (file.size / 1024).toFixed(0) + 'KB -> ' + (compressed.size / 1024).toFixed(0) + 'KB (WebP)');
                        resolve(compressed);
                    }, outputType, quality);
                };

                img.onerror = function() {
                    reject(new Error('No se pudo leer la imagen'));
                };

                img.src = e.target.result;
            };

            reader.onerror = function() {
                reject(new Error('No se pudo leer el archivo'));
            };

            reader.readAsDataURL(file);
        });
    }

    // ========== AUTH ==========
    function initAuth() {
        window.firebaseReady.then(function() {
            window.auth.onAuthStateChanged(function(user) {
                if (user) {
                    showAdmin(user);
                } else {
                    showLogin();
                }
            });
        });
    }

    function showLogin() {
        $('loginScreen').style.display = 'flex';
        $('adminPanel').style.display = 'none';
    }

    function showAdmin(user) {
        $('loginScreen').style.display = 'none';
        $('adminPanel').style.display = 'flex';
        $('adminEmail').textContent = user.email;
        loadData();
    }

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

    // ========== NAVIGATION ==========
    document.querySelectorAll('.nav-item[data-section]').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var section = this.getAttribute('data-section');
            document.querySelectorAll('.nav-item').forEach(function(n) { n.classList.remove('active'); });
            this.classList.add('active');
            document.querySelectorAll('.section').forEach(function(s) { s.classList.remove('active'); });
            $('sec-' + section).classList.add('active');
        });
    });

    // ========== LOAD DATA ==========
    function loadData() {
        window.db.collection('vehiculos').get().then(function(snap) {
            vehicles = snap.docs.map(function(d) { return d.data(); });
            renderVehiclesTable();
            updateStats();
            updateEstimator();
        });
        window.db.collection('marcas').get().then(function(snap) {
            brands = snap.docs.map(function(d) { return d.data(); });
            renderBrandsTable();
            populateBrandSelect();
            updateStats();
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

    // Populate brand select in vehicle form dynamically
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

        // Count total images across all vehicles
        var totalImages = 0;
        vehicles.forEach(function(v) {
            if (v.imagenes && v.imagenes.length) {
                // Only count Storage URLs (not local/external)
                v.imagenes.forEach(function(url) {
                    if (url && (url.indexOf('firebasestorage') >= 0 || url.indexOf('storage.googleapis') >= 0)) {
                        totalImages++;
                    }
                });
            }
        });

        var avgSizeKB = 150; // After compression, avg ~150KB per image
        var storageUsedMB = (totalImages * avgSizeKB) / 1024;
        var storageUsedGB = storageUsedMB / 1024;
        var storagePct = (storageUsedGB / FREE_TIER.storageGB) * 100;

        // Estimate egress: assume each image loaded 3x/day avg * 30 days
        var visitsInput = $('estVisitas');
        var monthlyVisits = visitsInput ? (parseInt(visitsInput.value) || 500) : 500;
        var avgImagesPerVisit = 8; // homepage + some detail pages
        var egressGB = (monthlyVisits * avgImagesPerVisit * avgSizeKB) / (1024 * 1024);
        var egressPct = (egressGB / FREE_TIER.egressGB) * 100;

        var classAUsed = totalImages; // 1 upload per image
        var classAPct = (classAUsed / FREE_TIER.classAOps) * 100;

        // Downloads = visits * images per visit
        var classBUsed = monthlyVisits * avgImagesPerVisit;
        var classBPct = (classBUsed / FREE_TIER.classBOps) * 100;

        var maxPct = Math.max(storagePct, egressPct, classAPct, classBPct);
        var alertClass = maxPct >= 70 ? 'est-warning' : 'est-safe';

        var html = '<div class="est-grid">' +
            renderEstBar('Almacenamiento', storageUsedMB.toFixed(1) + ' MB', storageUsedGB.toFixed(3) + ' / ' + FREE_TIER.storageGB + ' GB', storagePct) +
            renderEstBar('Egreso mensual', egressGB.toFixed(2) + ' GB', egressGB.toFixed(2) + ' / ' + FREE_TIER.egressGB + ' GB', egressPct) +
            renderEstBar('Op. Clase A (subidas)', classAUsed, classAUsed + ' / ' + FREE_TIER.classAOps.toLocaleString(), classAPct) +
            renderEstBar('Op. Clase B (lecturas)', classBUsed.toLocaleString(), classBUsed.toLocaleString() + ' / ' + FREE_TIER.classBOps.toLocaleString(), classBPct) +
        '</div>';

        if (maxPct >= 70) {
            html += '<div style="margin-top:0.75rem;padding:0.5rem 0.75rem;background:rgba(210,153,34,0.15);border:1px solid var(--admin-warning);border-radius:6px;font-size:0.8rem;color:var(--admin-warning);">' +
                '⚠ Te estas acercando al limite gratuito. Considera reducir imagenes o visitas.' +
            '</div>';
        } else {
            html += '<div style="margin-top:0.5rem;font-size:0.75rem;color:var(--admin-text-muted);">' +
                totalImages + ' imagenes en Storage | Compresion automatica activa (~150KB/img)' +
            '</div>';
        }

        el.innerHTML = html;
    }

    function renderEstBar(label, value, detail, pct) {
        var color = pct >= 70 ? 'var(--admin-warning)' : pct >= 90 ? 'var(--admin-danger)' : 'var(--admin-success)';
        var clampedPct = Math.min(pct, 100);
        return '<div class="est-item">' +
            '<div style="display:flex;justify-content:space-between;font-size:0.75rem;margin-bottom:2px;">' +
                '<span>' + label + '</span>' +
                '<span style="color:var(--admin-text-muted);">' + detail + '</span>' +
            '</div>' +
            '<div style="height:6px;background:var(--admin-border);border-radius:3px;overflow:hidden;">' +
                '<div style="height:100%;width:' + clampedPct + '%;background:' + color + ';border-radius:3px;transition:width 0.3s;"></div>' +
            '</div>' +
        '</div>';
    }

    // ========== VEHICLES TABLE ==========
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

            html += '<tr>' +
                '<td>' + v.id + '</td>' +
                '<td><img class="vehicle-thumb" src="' + (v.imagen || 'multimedia/vehicles/placeholder-car.jpg') + '" alt="" onerror="this.src=\'multimedia/vehicles/placeholder-car.jpg\'"></td>' +
                '<td><strong>' + (v.marca || '').charAt(0).toUpperCase() + (v.marca || '').slice(1) + ' ' + (v.modelo || '') + '</strong><br><small style="color:#8b949e">' + v.year + '</small></td>' +
                '<td><span class="badge badge-' + v.tipo + '">' + v.tipo + '</span></td>' +
                '<td>' + (v.categoria || '-') + '</td>' +
                '<td>' + formatPrice(v.precio) + (v.precioOferta ? '<br><small style="color: var(--admin-warning);">' + formatPrice(v.precioOferta) + '</small>' : '') + '</td>' +
                '<td>' + badges + '</td>' +
                '<td>' +
                    '<button class="btn btn-ghost btn-sm" onclick="adminPanel.editVehicle(' + v.id + ')">Editar</button> ' +
                    '<button class="btn btn-danger btn-sm" onclick="adminPanel.deleteVehicle(' + v.id + ')">Eliminar</button>' +
                '</td>' +
            '</tr>';
        });

        if (!html) html = '<tr><td colspan="8" style="text-align:center; padding:2rem; color:#8b949e;">No se encontraron vehiculos</td></tr>';
        $('vehiclesTableBody').innerHTML = html;
    }

    $('vehicleSearch').addEventListener('input', function() {
        renderVehiclesTable(this.value);
    });

    // ========== BRANDS TABLE ==========
    function renderBrandsTable() {
        var html = '';
        brands.forEach(function(b) {
            var count = vehicles.filter(function(v) { return v.marca === b.id; }).length;
            html += '<tr>' +
                '<td><img class="vehicle-thumb" src="' + (b.logo || '') + '" alt="' + b.nombre + '" onerror="this.style.display=\'none\'" style="width:40px;height:40px;object-fit:contain;"></td>' +
                '<td><code>' + b.id + '</code></td>' +
                '<td><strong>' + b.nombre + '</strong></td>' +
                '<td>' + (b.descripcion || '-') + '</td>' +
                '<td>' + count + '</td>' +
                '<td>' +
                    '<button class="btn btn-ghost btn-sm" onclick="adminPanel.editBrand(\'' + b.id + '\')">Editar</button> ' +
                    '<button class="btn btn-danger btn-sm" onclick="adminPanel.deleteBrand(\'' + b.id + '\')">Eliminar</button>' +
                '</td>' +
            '</tr>';
        });

        if (!html) html = '<tr><td colspan="6" style="text-align:center; padding:2rem;">No hay marcas</td></tr>';
        $('brandsTableBody').innerHTML = html;
    }

    // ========== VEHICLE MODAL ==========
    function openModal() {
        $('vehicleModal').classList.add('active');
    }

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

    $('vehicleModal').addEventListener('click', function(e) {
        if (e.target === this) closeModalFn();
    });

    // Prevent Enter key from submitting/closing the vehicle form
    $('vehicleForm').addEventListener('submit', function(e) {
        e.preventDefault();
    });

    $('vehicleForm').addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
        }
    });

    // ========== EDIT VEHICLE ==========
    function editVehicle(id) {
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

        // Load existing images
        uploadedImageUrls = (v.imagenes && v.imagenes.length) ? v.imagenes.slice() : (v.imagen ? [v.imagen] : []);
        renderUploadedImages();
        $('uploadError').style.display = 'none';

        openModal();
    }

    // ========== SAVE VEHICLE ==========
    $('saveVehicle').addEventListener('click', function() {
        var form = $('vehicleForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

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
                toast('Error: ' + err.message, 'error');
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

    // ========== DELETE VEHICLE ==========
    function deleteVehicleFn(id) {
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
                toast('Error: ' + err.message, 'error');
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

    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', function() {
        this.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('dragover');
        if (e.dataTransfer.files.length) {
            handleFiles(e.dataTransfer.files);
        }
    });

    fileInput.addEventListener('change', function() {
        if (this.files.length) {
            handleFiles(this.files);
            this.value = '';
        }
    });

    function showUploadError(msg) {
        var el = $('uploadError');
        el.textContent = msg;
        el.style.display = 'block';
    }

    function handleFiles(files) {
        if (!window.storage) {
            showUploadError('Firebase Storage no esta disponible. Usa la opcion de URL manual abajo.');
            return;
        }

        var fileArray = Array.from(files);

        // Validate file types
        var invalidType = fileArray.filter(function(f) {
            return UPLOAD_CONFIG.allowedTypes.indexOf(f.type) === -1;
        });
        if (invalidType.length) {
            showUploadError('Formatos permitidos: JPG, PNG, WebP. Archivos rechazados: ' + invalidType.map(function(f) { return f.name; }).join(', '));
            return;
        }

        // Validate file sizes (before compression)
        var maxBytes = UPLOAD_CONFIG.maxFileSizeMB * 1024 * 1024;
        var oversized = fileArray.filter(function(f) { return f.size > maxBytes * 5; }); // Allow up to 10MB raw, compression will reduce
        if (oversized.length) {
            showUploadError('Imagenes demasiado grandes (max 10MB original). Reduce el tamano antes de subir.');
            return;
        }

        $('uploadError').style.display = 'none';
        var total = fileArray.length;
        var done = 0;
        var errors = 0;
        $('uploadProgress').style.display = 'block';
        $('uploadStatus').textContent = 'Comprimiendo y subiendo 0 de ' + total + '...';
        $('progressFill').style.width = '0%';

        fileArray.forEach(function(file) {
            // Compress then upload
            compressImage(file).then(function(compressed) {
                // Check compressed size
                if (compressed.size > UPLOAD_CONFIG.maxFileSizeMB * 1024 * 1024) {
                    console.warn('Compressed file still too large: ' + (compressed.size / 1024).toFixed(0) + 'KB');
                }
                return uploadFileToStorage(compressed);
            }).then(function(success) {
                done++;
                if (!success) errors++;
                updateUploadProgress(done, total, errors);
            }).catch(function(err) {
                console.error('Compress/upload error:', err);
                done++;
                errors++;
                updateUploadProgress(done, total, errors);
            });
        });
    }

    function updateUploadProgress(done, total, errors) {
        var pct = Math.round((done / total) * 100);
        $('progressFill').style.width = pct + '%';
        $('uploadStatus').textContent = 'Comprimiendo y subiendo ' + done + ' de ' + total + '...';
        if (done === total) {
            setTimeout(function() {
                $('uploadProgress').style.display = 'none';
            }, 1000);
            if (errors === total) {
                showUploadError('No se pudieron subir las imagenes. Verifica que Firebase Storage este habilitado y las reglas permitan escritura autenticada (Firebase Console > Storage > Reglas). Mientras tanto, usa URL manual.');
            } else if (errors > 0) {
                toast((total - errors) + ' subida(s), ' + errors + ' error(es)', 'error');
            } else {
                toast(total + ' imagen(es) comprimida(s) y subida(s)');
            }
        }
    }

    function uploadFileToStorage(file) {
        return new Promise(function(resolve) {
            if (!window.storage) {
                showUploadError('Firebase Storage no disponible. Usa URLs manuales.');
                resolve(false);
                return;
            }

            var timestamp = Date.now();
            var safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
            var path = UPLOAD_CONFIG.storagePath + timestamp + '_' + safeName;

            // Diagnostic log
            var user = window.auth.currentUser;
            console.log('[Storage Upload] Diagnostico:');
            console.log('  Bucket: ' + (window.storage.app.options.storageBucket || 'no definido'));
            console.log('  Ruta: ' + path);
            console.log('  Archivo: ' + file.name + ' (' + (file.size / 1024).toFixed(1) + ' KB, ' + file.type + ')');
            console.log('  Usuario: ' + (user ? user.email + ' (uid: ' + user.uid + ')' : 'NO AUTENTICADO'));

            try {
                var ref = window.storage.ref(path);
                ref.put(file).then(function(snapshot) {
                    return snapshot.ref.getDownloadURL();
                }).then(function(url) {
                    console.log('[Storage Upload] OK: ' + url);
                    uploadedImageUrls.push(url);
                    renderUploadedImages();
                    resolve(true);
                }).catch(function(err) {
                    console.error('[Storage Upload] FALLO:', err);
                    console.error('  error.code: ' + err.code);
                    console.error('  error.message: ' + err.message);
                    var errorMsg = 'Error subiendo imagen: ';
                    if (err.code === 'storage/unauthorized') {
                        errorMsg += 'No autorizado. Ve a Firebase Console > Storage > Reglas y permite escritura para usuarios autenticados en /cars/.';
                    } else if (err.code === 'storage/object-not-found' || err.code === 'storage/bucket-not-found') {
                        errorMsg += 'Bucket no encontrado. Verifica que Storage este activado en Firebase Console.';
                    } else if (err.code === 'storage/retry-limit-exceeded' || err.code === 'storage/canceled') {
                        errorMsg += 'Conexion fallida. Revisa tu internet.';
                    } else if (err.code === 'storage/unknown') {
                        errorMsg += 'Error desconocido. Abre la consola del navegador (F12) para ver detalles.';
                    } else {
                        errorMsg += (err.message || err.code || 'Error desconocido') + ' (Abre F12 > Console para diagnostico)';
                    }
                    showUploadError(errorMsg);
                    resolve(false);
                });
            } catch (e) {
                console.error('[Storage Upload] Excepcion:', e);
                showUploadError('Error accediendo a Firebase Storage. Abre F12 > Console para diagnostico.');
                resolve(false);
            }
        });
    }

    // Manual URL image input
    $('btnAddImageUrl').addEventListener('click', function() {
        var url = $('manualImageUrl').value.trim();
        if (!url) {
            toast('Ingresa una URL de imagen', 'error');
            return;
        }
        if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('multimedia/')) {
            toast('Ingresa una URL valida (https://...)', 'error');
            return;
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
    function openBrandModal() {
        $('brandModal').classList.add('active');
    }

    function closeBrandModalFn() {
        $('brandModal').classList.remove('active');
        $('brandForm').reset();
        $('bOriginalId').value = '';
        $('brandLogoPreview').innerHTML = '';
    }

    $('brandForm').addEventListener('submit', function(e) { e.preventDefault(); });
    $('brandForm').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') e.preventDefault();
    });

    $('btnAddBrand').addEventListener('click', function() {
        $('brandModalTitle').textContent = 'Agregar Marca';
        $('bOriginalId').value = '';
        $('brandForm').reset();
        $('brandLogoPreview').innerHTML = '';
        $('bId').readOnly = false;
        openBrandModal();
    });

    $('closeBrandModal').addEventListener('click', closeBrandModalFn);
    $('cancelBrandModal').addEventListener('click', closeBrandModalFn);

    $('brandModal').addEventListener('click', function(e) {
        if (e.target === this) closeBrandModalFn();
    });

    $('bLogo').addEventListener('input', function() {
        var url = this.value.trim();
        if (url) {
            $('brandLogoPreview').innerHTML = '<img src="' + url + '" style="width:60px;height:60px;object-fit:contain;border-radius:6px;background:#1a1a2e;padding:4px;" onerror="this.parentNode.innerHTML=\'<small style=color:var(--admin-danger)>URL no valida</small>\'">';
        } else {
            $('brandLogoPreview').innerHTML = '';
        }
    });

    function editBrand(brandId) {
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
        var form = $('brandForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

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
                toast('Error: ' + err.message, 'error');
            })
            .finally(function() {
                btn.disabled = false;
                btn.textContent = 'Guardar Marca';
            });
    });

    function deleteBrandFn(brandId) {
        var b = brands.find(function(x) { return x.id === brandId; });
        if (!b) return;

        deleteBrandTargetId = brandId;
        $('deleteBrandName').textContent = b.nombre;
        $('deleteBrandModal').classList.add('active');
    }

    $('closeDeleteBrandModal').addEventListener('click', function() {
        $('deleteBrandModal').classList.remove('active');
        deleteBrandTargetId = null;
    });

    $('cancelDeleteBrand').addEventListener('click', function() {
        $('deleteBrandModal').classList.remove('active');
        deleteBrandTargetId = null;
    });

    $('confirmDeleteBrand').addEventListener('click', function() {
        if (!deleteBrandTargetId) return;

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
                toast('Error: ' + err.message, 'error');
            })
            .finally(function() {
                btn.disabled = false;
                btn.textContent = 'Eliminar';
            });
    });

    // ========== ESTIMATOR EVENTS ==========
    var estVisitas = $('estVisitas');
    if (estVisitas) {
        estVisitas.addEventListener('input', function() {
            updateEstimator();
        });
    }

    // ========== EXPOSE FUNCTIONS ==========
    window.adminPanel = {
        editVehicle: editVehicle,
        deleteVehicle: deleteVehicleFn,
        removeImage: removeImage,
        editBrand: editBrand,
        deleteBrand: deleteBrandFn
    };

    // ========== INIT ==========
    initAuth();

})();
