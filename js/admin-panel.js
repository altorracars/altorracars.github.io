// Admin Panel Logic for ALTORRA CARS
(function() {
    'use strict';

    var vehicles = [];
    var brands = [];
    var deleteTargetId = null;

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

    // ========== VEHICLES TABLE ==========
    function renderVehiclesTable(filter) {
        var filtered = vehicles;
        if (filter) {
            var q = filter.toLowerCase();
            filtered = vehicles.filter(function(v) {
                return (v.marca + ' ' + v.modelo + ' ' + v.year).toLowerCase().indexOf(q) >= 0;
            });
        }

        // Sort by ID
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
                '<td><strong>' + b.nombre + '</strong></td>' +
                '<td>' + (b.descripcion || '-') + '</td>' +
                '<td>' + count + '</td>' +
            '</tr>';
        });

        if (!html) html = '<tr><td colspan="4" style="text-align:center; padding:2rem;">No hay marcas</td></tr>';
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
        $('imagePreview').innerHTML = '';
        $('featuresPreview').innerHTML = '';
    }

    $('btnAddVehicle').addEventListener('click', function() {
        $('modalTitle').textContent = 'Agregar Vehiculo';
        $('vId').value = '';
        $('vehicleForm').reset();
        $('vUbicacion').value = 'Barranquilla';
        openModal();
    });

    $('closeModal').addEventListener('click', closeModalFn);
    $('cancelModal').addEventListener('click', closeModalFn);

    $('vehicleModal').addEventListener('click', function(e) {
        if (e.target === this) closeModalFn();
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
        $('vTraccion').value = v.traccion || '';
        $('vColor').value = v.color || '';
        $('vPuertas').value = v.puertas || 5;
        $('vPasajeros').value = v.pasajeros || 5;
        $('vUbicacion').value = v.ubicacion || 'Barranquilla';
        $('vDescripcion').value = v.descripcion || '';
        $('vDestacado').checked = !!v.destacado;
        $('vOferta').checked = !!(v.oferta || v.precioOferta);
        $('vImagen').value = v.imagen || '';
        $('vImagenes').value = (v.imagenes || []).join('\n');
        $('vCaracteristicas').value = (v.caracteristicas || []).join('\n');

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
            traccion: $('vTraccion').value || '',
            color: $('vColor').value || '',
            puertas: parseInt($('vPuertas').value) || 5,
            pasajeros: parseInt($('vPasajeros').value) || 5,
            asientos: parseInt($('vPasajeros').value) || 5,
            direccion: 'Electrica',
            ubicacion: $('vUbicacion').value || 'Barranquilla',
            placa: 'Disponible al contactar',
            codigoFasecolda: 'Consultar',
            revisionTecnica: true,
            peritaje: true,
            descripcion: $('vDescripcion').value || '',
            destacado: $('vDestacado').checked,
            imagen: $('vImagen').value || 'multimedia/vehicles/placeholder-car.jpg',
            imagenes: $('vImagenes').value.split('\n').map(function(s) { return s.trim(); }).filter(Boolean),
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

    // ========== EXPOSE FUNCTIONS ==========
    window.adminPanel = {
        editVehicle: editVehicle,
        deleteVehicle: deleteVehicleFn
    };

    // ========== INIT ==========
    initAuth();

})();
