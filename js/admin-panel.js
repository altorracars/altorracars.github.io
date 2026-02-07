// Admin Panel Logic for ALTORRA CARS
(function() {
    'use strict';

    var vehicles = [];
    var brands = [];
    var deleteTargetId = null;
    var deleteBrandTargetId = null;
    var uploadedImageUrls = [];

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
        // Keep first option
        select.innerHTML = '<option value="">Seleccionar...</option>';
        brands.sort(function(a, b) { return a.nombre.localeCompare(b.nombre); });
        brands.forEach(function(b) {
            var opt = document.createElement('option');
            opt.value = b.id;
            opt.textContent = b.nombre;
            select.appendChild(opt);
        });
        // Restore selection if it was set
        if (currentVal) select.value = currentVal;
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

        // Ensure main image is in imagenes array
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
        // Check Firebase Storage is available
        if (!window.storage) {
            showUploadError('Firebase Storage no esta disponible. Usa la opcion de URL manual abajo para agregar imagenes.');
            return;
        }

        var fileArray = Array.from(files).filter(function(f) {
            return f.type.startsWith('image/');
        });
        if (!fileArray.length) {
            toast('Selecciona archivos de imagen validos', 'error');
            return;
        }

        // Check file sizes (max 5MB each)
        var oversized = fileArray.filter(function(f) { return f.size > 5 * 1024 * 1024; });
        if (oversized.length) {
            toast('Algunas imagenes superan 5MB. Reduce su tamano.', 'error');
            return;
        }

        $('uploadError').style.display = 'none';
        var total = fileArray.length;
        var done = 0;
        var errors = 0;
        $('uploadProgress').style.display = 'block';
        $('uploadStatus').textContent = 'Subiendo 0 de ' + total + '...';
        $('progressFill').style.width = '0%';

        fileArray.forEach(function(file) {
            uploadFile(file, function(success) {
                done++;
                if (!success) errors++;
                var pct = Math.round((done / total) * 100);
                $('progressFill').style.width = pct + '%';
                $('uploadStatus').textContent = 'Subiendo ' + done + ' de ' + total + '...';
                if (done === total) {
                    setTimeout(function() {
                        $('uploadProgress').style.display = 'none';
                    }, 1000);
                    if (errors === total) {
                        showUploadError('No se pudieron subir las imagenes. Verifica que Firebase Storage este habilitado en tu proyecto de Firebase (console.firebase.google.com > Storage) y que las reglas permitan escritura autenticada. Mientras tanto, usa la opcion de URL manual abajo.');
                    } else if (errors > 0) {
                        toast((total - errors) + ' subida(s), ' + errors + ' error(es)', 'error');
                    } else {
                        toast(total + ' imagen(es) subida(s)');
                    }
                }
            });
        });
    }

    function uploadFile(file, onDone) {
        if (!window.storage) {
            showUploadError('Firebase Storage no disponible. Usa URLs manuales.');
            if (onDone) onDone(false);
            return;
        }

        var timestamp = Date.now();
        var safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
        var path = 'cars/' + timestamp + '_' + safeName;

        try {
            var ref = window.storage.ref(path);
            ref.put(file).then(function(snapshot) {
                return snapshot.ref.getDownloadURL();
            }).then(function(url) {
                uploadedImageUrls.push(url);
                renderUploadedImages();
                if (onDone) onDone(true);
            }).catch(function(err) {
                console.error('Upload error:', err);
                var errorMsg = 'Error subiendo imagen: ';
                if (err.code === 'storage/unauthorized') {
                    errorMsg += 'No autorizado. Ve a Firebase Console > Storage > Rules y configura reglas que permitan escritura autenticada.';
                } else if (err.code === 'storage/object-not-found') {
                    errorMsg += 'Bucket no encontrado. Activa Storage en Firebase Console.';
                } else if (err.code === 'storage/retry-limit-exceeded') {
                    errorMsg += 'Tiempo de espera agotado. Revisa tu conexion a internet.';
                } else if (err.code === 'storage/unknown') {
                    errorMsg += 'Error desconocido. Verifica que Storage este habilitado en Firebase Console > Storage.';
                } else {
                    errorMsg += err.message || err.code || 'Error desconocido';
                }
                showUploadError(errorMsg);
                if (onDone) onDone(false);
            });
        } catch (e) {
            console.error('Storage ref error:', e);
            showUploadError('Error accediendo a Firebase Storage. Verifica la configuracion del proyecto.');
            if (onDone) onDone(false);
        }
    }

    // Manual URL image input
    $('btnAddImageUrl').addEventListener('click', function() {
        var url = $('manualImageUrl').value.trim();
        if (!url) {
            toast('Ingresa una URL de imagen', 'error');
            return;
        }
        // Basic URL validation
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

    // Prevent Enter from submitting brand form
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

    // Logo preview
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
        $('bId').readOnly = true; // Can't change ID when editing
        $('bNombre').value = b.nombre || '';
        $('bDescripcion').value = b.descripcion || '';
        $('bLogo').value = b.logo || '';

        // Trigger logo preview
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
