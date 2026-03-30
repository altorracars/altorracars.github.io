// Admin Panel — Sales Tracking, Backup, Sitemap & Share Pages
(function() {
    'use strict';
    var AP = window.AP;
    var $ = AP.$;

    // FASE 16: Slug helpers (mirror scripts/generate-vehicles.mjs & render.js)
    function _slugifyVehicle(v) {
        return [v.marca, v.modelo, v.year, v.id].filter(Boolean).join('-')
            .toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    }
    function _slugifyBrand(id) {
        return String(id).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    }

    // ========== SALES TRACKING ==========
    var CANAL_LABELS = {
        'altorra': 'ALTORRA',
        'otros': 'Otros (terceros)',
        'concesionario': 'Otros (terceros)',
        'intermediario': 'Otros (terceros)',
        'cliente_directo': 'Otros (terceros)',
        'otro': 'Otros (terceros)'
    };

    function renderSalesTracking() {
        var body = $('salesTrackingBody');
        if (!body) return;

        var sold = AP.vehicles.filter(function(v) { return v.estado === 'vendido'; });
        sold.sort(function(a, b) { return (b.fechaVenta || b.updatedAt || '').localeCompare(a.fechaVenta || a.updatedAt || ''); });

        if (sold.length === 0) {
            body.innerHTML = '<tr><td colspan="8" style="text-align:center;color:var(--admin-text-muted);padding:2rem;">Sin operaciones registradas</td></tr>';
            renderSalesSummary(sold);
            return;
        }

        body.innerHTML = sold.map(function(v) {
            var marca = v.marca ? (v.marca.charAt(0).toUpperCase() + v.marca.slice(1)) : '';
            var origen = AP.getVehicleOriginName(v);
            var esPropio = AP.isVehiclePropio(v);
            var esAltorra = v.canalVenta === 'altorra';
            var canalBadge = esAltorra
                ? '<span style="color:var(--admin-gold);font-weight:700;">ALTORRA</span>'
                : '<span style="color:var(--admin-text-muted);">Otros</span>';

            var ganancia = 0;
            var tipoGanancia = '-';
            if (esAltorra) {
                if (esPropio) {
                    ganancia = v.utilidadAltorra || v.utilidadTotal || 0;
                    tipoGanancia = '<span style="color:var(--admin-success);font-size:0.7rem;font-weight:600;">Utilidad</span>';
                } else {
                    ganancia = v.comisionAltorra || v.utilidadAltorra || v.utilidadTotal || 0;
                    tipoGanancia = '<span style="color:var(--admin-info);font-size:0.7rem;font-weight:600;">Comision</span>';
                }
            }
            var gananciaColor = ganancia > 0 ? 'var(--admin-success,#3fb950)' : 'var(--admin-text-muted)';

            return '<tr>' +
                '<td><code style="font-size:0.75rem;color:var(--admin-accent,#58a6ff);">' + AP.escapeHtml(v.codigoUnico || '—') + '</code></td>' +
                '<td><strong>' + AP.escapeHtml(marca) + ' ' + AP.escapeHtml(v.modelo || '') + '</strong><br><small>' + AP.escapeHtml(v.year || '') + '</small></td>' +
                '<td style="font-size:0.8rem;">' + AP.escapeHtml(origen) + '</td>' +
                '<td>' + canalBadge + '</td>' +
                '<td>' + (esAltorra ? AP.formatPrice(v.precioVenta || v.precioCierre || 0) : '-') + '</td>' +
                '<td style="font-weight:600;color:' + gananciaColor + ';">' + (esAltorra && ganancia ? AP.formatPrice(ganancia) : '-') + '</td>' +
                '<td>' + (esAltorra ? tipoGanancia : '-') + '</td>' +
                '<td>' + (v.fechaCierre || (v.fechaVenta || '').split('T')[0] || '-') + '</td>' +
            '</tr>';
        }).join('');

        renderSalesSummary(sold);
    }

    function renderSalesSummary(sold) {
        var container = $('salesSummary');
        if (!container) return;
        if (sold.length === 0) { container.innerHTML = ''; return; }

        var totalVentas = sold.length;
        var ventasAltorra = sold.filter(function(v) { return v.canalVenta === 'altorra'; });
        var ventasOtros = sold.filter(function(v) { return v.canalVenta !== 'altorra'; });

        var propiosAltorra = ventasAltorra.filter(function(v) { return AP.isVehiclePropio(v); });
        var aliadosAltorra = ventasAltorra.filter(function(v) { return !AP.isVehiclePropio(v); });

        var ingresosPropios = propiosAltorra.reduce(function(sum, v) { return sum + (v.precioVenta || v.precioCierre || 0); }, 0);
        var utilidadPropios = propiosAltorra.reduce(function(sum, v) { return sum + (v.utilidadAltorra || v.utilidadTotal || 0); }, 0);
        var comisionesAliados = aliadosAltorra.reduce(function(sum, v) { return sum + (v.comisionAltorra || v.utilidadAltorra || v.utilidadTotal || 0); }, 0);
        var gananciaTotal = utilidadPropios + comisionesAliados;

        container.innerHTML =
            '<div class="stat-card" style="padding:0.75rem;text-align:center;"><div style="font-size:0.75rem;color:var(--admin-text-muted);">Total operaciones</div><div style="font-size:1.5rem;font-weight:700;">' + totalVentas + '</div></div>' +
            '<div class="stat-card" style="padding:0.75rem;text-align:center;"><div style="font-size:0.75rem;color:var(--admin-text-muted);">Ventas ALTORRA</div><div style="font-size:1.5rem;font-weight:700;color:var(--admin-gold);">' + ventasAltorra.length + '</div></div>' +
            '<div class="stat-card" style="padding:0.75rem;text-align:center;"><div style="font-size:0.75rem;color:var(--admin-text-muted);">Ventas terceros</div><div style="font-size:1.5rem;font-weight:700;color:var(--admin-text-muted);">' + ventasOtros.length + '</div></div>' +
            '<div class="stat-card" style="padding:0.75rem;text-align:center;"><div style="font-size:0.75rem;color:var(--admin-text-muted);">Ingresos propios</div><div style="font-size:1.1rem;font-weight:700;color:var(--admin-info,#58a6ff);">' + AP.formatPrice(ingresosPropios) + '</div><div style="font-size:0.65rem;color:var(--admin-text-muted);">venta vehiculos propios</div></div>' +
            '<div class="stat-card" style="padding:0.75rem;text-align:center;"><div style="font-size:0.75rem;color:var(--admin-text-muted);">Comisiones aliados</div><div style="font-size:1.1rem;font-weight:700;color:var(--admin-warning,#d29922);">' + AP.formatPrice(comisionesAliados) + '</div><div style="font-size:0.65rem;color:var(--admin-text-muted);">intermediacion</div></div>' +
            '<div class="stat-card" style="padding:0.75rem;text-align:center;"><div style="font-size:0.75rem;color:var(--admin-text-muted);">Ganancia total ALTORRA</div><div style="font-size:1.1rem;font-weight:700;color:var(--admin-success,#3fb950);">' + AP.formatPrice(gananciaTotal) + '</div><div style="font-size:0.65rem;color:var(--admin-text-muted);">utilidad + comisiones</div></div>';
    }

    // ========== MARK AS SOLD ==========
    function markAsSold(vehicleId) {
        if (!AP.canCreateOrEditInventory()) { AP.toast('Sin permisos', 'error'); return; }
        var v = AP.vehicles.find(function(x) { return x.id === vehicleId; });
        if (!v) return;

        var esPropio = AP.isVehiclePropio(v);
        $('soldVehicleId').value = vehicleId;
        $('soldOrigenTipo').value = esPropio ? 'propio' : 'aliado';
        var marca = v.marca ? (v.marca.charAt(0).toUpperCase() + v.marca.slice(1)) : '';
        var codeInfo = v.codigoUnico ? '<code style="color:var(--admin-accent);">' + AP.escapeHtml(v.codigoUnico) + '</code> — ' : '';
        $('soldVehicleInfo').innerHTML = codeInfo + '<strong>' + AP.escapeHtml(marca) + ' ' + AP.escapeHtml(v.modelo || '') + ' ' + AP.escapeHtml(v.year || '') + '</strong><br>Precio publicado: ' + AP.formatPrice(v.precio);

        var origenInfo = $('soldOrigenInfo');
        if (origenInfo) {
            if (esPropio) {
                origenInfo.style.background = 'rgba(63,185,80,0.1)';
                origenInfo.style.borderColor = 'rgba(63,185,80,0.3)';
                origenInfo.style.color = 'var(--admin-success,#3fb950)';
                origenInfo.innerHTML = '<strong>PROPIO (ALTORRA)</strong> — El precio de venta ingresa a nuestras cuentas';
            } else {
                var d = AP.dealers.find(function(x) { return x._docId === v.concesionario; });
                var dName = d ? d.nombre : v.concesionario;
                origenInfo.style.background = 'rgba(88,166,255,0.1)';
                origenInfo.style.borderColor = 'rgba(88,166,255,0.3)';
                origenInfo.style.color = 'var(--admin-info,#58a6ff)';
                origenInfo.innerHTML = '<strong>ALIADO: ' + AP.escapeHtml(dName) + '</strong> — El dinero de venta va al aliado, solo recibimos comision';
            }
        }

        if ($('soldPrecio')) $('soldPrecio').value = '';
        if ($('soldUtilidad')) $('soldUtilidad').value = '';
        if ($('soldPrecioAliado')) $('soldPrecioAliado').value = '';
        if ($('soldComision')) $('soldComision').value = '';
        $('soldCanal').value = '';
        if ($('soldResponsable')) $('soldResponsable').value = '';
        if ($('soldResponsableAliado')) $('soldResponsableAliado').value = '';
        $('soldFechaCierre').value = new Date().toISOString().split('T')[0];
        $('soldObservaciones').value = '';

        if ($('soldPropioFields')) $('soldPropioFields').style.display = 'none';
        if ($('soldAliadoFields')) $('soldAliadoFields').style.display = 'none';
        var canalHint = $('soldCanalHint');
        if (canalHint) canalHint.style.display = 'none';

        $('soldModal').classList.add('active');
    }

    // Canal change handler
    var soldCanalEl = $('soldCanal');
    if (soldCanalEl) {
        soldCanalEl.addEventListener('change', function() {
            var origenTipo = $('soldOrigenTipo').value;
            var propioFields = $('soldPropioFields');
            var aliadoFields = $('soldAliadoFields');
            var canalHint = $('soldCanalHint');

            if (propioFields) propioFields.style.display = 'none';
            if (aliadoFields) aliadoFields.style.display = 'none';

            if (this.value === 'altorra') {
                if (origenTipo === 'propio') {
                    if (propioFields) propioFields.style.display = '';
                    if (canalHint) { canalHint.style.display = 'block'; canalHint.style.color = 'var(--admin-success,#3fb950)'; canalHint.textContent = 'Vehiculo propio vendido por ALTORRA. El ingreso total entra a nuestras cuentas.'; }
                } else {
                    if (aliadoFields) aliadoFields.style.display = '';
                    if (canalHint) { canalHint.style.display = 'block'; canalHint.style.color = 'var(--admin-info,#58a6ff)'; canalHint.textContent = 'Vehiculo de aliado vendido por ALTORRA. Solo la comision ingresa a nuestras cuentas.'; }
                }
            } else if (this.value === 'otros') {
                if (canalHint) { canalHint.style.display = 'block'; canalHint.style.color = 'var(--admin-text-muted)'; canalHint.textContent = 'Vendido por terceros. No genera ingresos ni comision para ALTORRA.'; }
            } else {
                if (canalHint) canalHint.style.display = 'none';
            }
        });
    }

    var closeSoldModalEl = $('closeSoldModal');
    if (closeSoldModalEl) closeSoldModalEl.addEventListener('click', function() { $('soldModal').classList.remove('active'); });
    var cancelSoldModalEl = $('cancelSoldModal');
    if (cancelSoldModalEl) cancelSoldModalEl.addEventListener('click', function() { $('soldModal').classList.remove('active'); });

    var confirmSoldBtn = $('confirmSold');
    if (confirmSoldBtn) {
        confirmSoldBtn.addEventListener('click', function() {
            var vehicleId = parseInt($('soldVehicleId').value, 10);
            if (!vehicleId || isNaN(vehicleId)) return;
            var canal = $('soldCanal').value;
            if (!canal) { AP.toast('Selecciona el canal de venta', 'error'); return; }

            var v = AP.vehicles.find(function(x) { return x.id === vehicleId; });
            var currentVersion = v ? (v._version || 0) : 0;
            var origenTipo = $('soldOrigenTipo').value;
            var precioVenta = 0;
            var utilidadAltorra = 0;
            var comisionAltorra = 0;
            var responsable = '';

            if (canal === 'altorra') {
                if (origenTipo === 'propio') {
                    precioVenta = parseInt($('soldPrecio').value, 10) || 0;
                    utilidadAltorra = parseInt($('soldUtilidad').value, 10) || 0;
                    responsable = ($('soldResponsable').value || '').trim();
                    if (!precioVenta || !responsable) { AP.toast('Precio de venta y responsable son requeridos', 'error'); return; }
                } else {
                    precioVenta = parseInt($('soldPrecioAliado').value, 10) || 0;
                    comisionAltorra = parseInt($('soldComision').value, 10) || 0;
                    responsable = ($('soldResponsableAliado').value || '').trim();
                    if (!comisionAltorra || !responsable) { AP.toast('Comision ALTORRA y responsable son requeridos', 'error'); return; }
                }
            }

            var updateData = {
                estado: 'vendido',
                canalVenta: canal,
                origenTipo: origenTipo,
                responsableComercial: responsable || null,
                precioVenta: precioVenta || null,
                precioCierre: precioVenta || null,
                utilidadAltorra: (origenTipo === 'propio' && canal === 'altorra') ? (utilidadAltorra || null) : null,
                comisionAltorra: (origenTipo === 'aliado' && canal === 'altorra') ? (comisionAltorra || null) : null,
                fechaCierre: $('soldFechaCierre').value || new Date().toISOString().split('T')[0],
                fechaVenta: new Date().toISOString(),
                observacionesVenta: ($('soldObservaciones').value || '').trim(),
                updatedAt: new Date().toISOString(),
                updatedBy: window.auth.currentUser.email,
                lastModifiedBy: window.auth.currentUser.email,
                lastModifiedByName: (AP.currentUserProfile ? (AP.currentUserProfile.nombre || AP.currentUserProfile.name || '') : '') || window.auth.currentUser.email,
                lastModifiedAt: new Date().toISOString(),
                _version: currentVersion + 1
            };

            window.db.collection('vehiculos').doc(String(vehicleId)).update(updateData).then(function() {
                var marca = v ? (v.marca || '') : '';
                AP.toast('Operacion registrada exitosamente');
                var soldCode = v && v.codigoUnico ? ' [' + v.codigoUnico + ']' : '';
                var logDetail = marca + ' via ' + canal;
                if (canal === 'altorra' && origenTipo === 'propio') {
                    logDetail += ' | ingreso: ' + AP.formatPrice(precioVenta) + ' | utilidad: ' + AP.formatPrice(utilidadAltorra);
                } else if (canal === 'altorra' && origenTipo === 'aliado') {
                    logDetail += ' | venta aliado: ' + AP.formatPrice(precioVenta) + ' | comision: ' + AP.formatPrice(comisionAltorra);
                }
                AP.writeAuditLog('vehicle_sold', 'vehiculo #' + vehicleId + soldCode, logDetail);
                // Per-vehicle audit log
                window.db.collection('vehiculos').doc(String(vehicleId))
                    .collection('auditLog').add({
                        action: 'sold',
                        user: window.auth.currentUser.email,
                        userName: updateData.lastModifiedByName,
                        timestamp: Date.now(),
                        changes: [{ field: 'estado', from: v ? v.estado : 'disponible', to: 'vendido' }],
                        vehicleId: vehicleId,
                        saleDetails: { canal: canal, origenTipo: origenTipo, precioVenta: precioVenta }
                    }).catch(function() {});
                $('soldModal').classList.remove('active');
            }).catch(function(err) {
                AP.toast('Error: ' + err.message, 'error');
            });
        });
    }

    // ========== EXPORT/IMPORT JSON BACKUP ==========
    var btnExport = $('btnExportJSON');
    if (btnExport) {
        btnExport.addEventListener('click', function() {
            var data = {
                exportDate: new Date().toISOString(),
                vehiculos: AP.vehicles,
                marcas: AP.brands
            };
            var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = 'altorra-backup-' + new Date().toISOString().split('T')[0] + '.json';
            a.click();
            URL.revokeObjectURL(url);
            AP.writeAuditLog('backup_export', 'datos', AP.vehicles.length + ' vehiculos, ' + AP.brands.length + ' marcas');
            AP.toast('Respaldo exportado: ' + AP.vehicles.length + ' vehiculos, ' + AP.brands.length + ' marcas');
        });
    }

    var btnImport = $('btnImportJSON');
    var importFile = $('importJSONFile');
    if (btnImport && importFile) {
        btnImport.addEventListener('click', function() { importFile.click(); });
        importFile.addEventListener('change', function() {
            var file = this.files[0];
            if (!file) return;
            if (!AP.isSuperAdmin()) { AP.toast('Solo Super Admin puede importar datos', 'error'); return; }

            // F6.10: Validate MIME type
            if (file.type && file.type !== 'application/json' && file.type !== 'text/plain') {
                AP.toast('Formato no valido. Solo se aceptan archivos .json', 'error');
                return;
            }
            if (file.size > 10 * 1024 * 1024) {
                AP.toast('Archivo demasiado grande (max 10MB)', 'error');
                return;
            }

            var reader = new FileReader();
            reader.onload = function(e) {
                try {
                    var data = JSON.parse(e.target.result);
                    if (!data.vehiculos && !data.marcas) {
                        AP.toast('Archivo JSON invalido: no contiene vehiculos ni marcas.', 'error');
                        return;
                    }

                    // F6.10: Schema validation
                    var invalid = 0;
                    (data.vehiculos || []).forEach(function(v) {
                        if (!v.id || typeof v.id !== 'number') invalid++;
                        else if (!v.marca || typeof v.marca !== 'string') invalid++;
                    });
                    (data.marcas || []).forEach(function(b) {
                        if (!b.id || typeof b.id !== 'string') invalid++;
                        else if (!b.nombre || typeof b.nombre !== 'string') invalid++;
                    });
                    if (invalid > 0) {
                        AP.toast('Datos invalidos: ' + invalid + ' registros sin campos requeridos (id, marca/nombre)', 'error');
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
                        if (!v.id || typeof v.id !== 'number') return;
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
                        AP.writeAuditLog('backup_import', 'datos', vCount + ' vehiculos, ' + bCount + ' marcas');
                        AP.toast('Importados ' + count + ' registros');
                        statusEl.innerHTML = '<span style="color:#3fb950;">Importacion completada: ' + count + ' registros.</span>';
                        AP.loadData();
                    }).catch(function(err) {
                        AP.toast('Error de importacion: ' + err.message, 'error');
                        statusEl.innerHTML = '<span style="color:var(--admin-danger);">Error: ' + AP.escapeHtml(err.message) + '</span>';
                    });
                } catch (err) {
                    AP.toast('Error al leer archivo JSON: ' + err.message, 'error');
                }
            };
            reader.readAsText(file);
            this.value = '';
        });
    }

    // ========== SITEMAP GENERATOR ==========
    var GH_TOKEN_KEY = 'ac_gh_token';
    var GH_OWNER     = 'altorracars';
    var GH_REPO      = 'altorracars.github.io';
    var GH_BRANCH    = 'main';

    function escapeXml(str) {
        return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
    }

    function _buildSitemapXml() {
        var today = new Date().toISOString().split('T')[0];
        var base  = 'https://altorracars.github.io';
        var xml   = '<?xml version="1.0" encoding="UTF-8"?>\n' +
                    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n\n';

        var staticPages = [
            { loc: '/',                           priority: '1.0', freq: 'daily'   },
            { loc: '/busqueda.html',              priority: '0.9', freq: 'daily'   },
            { loc: '/vehiculos-suv.html',         priority: '0.8', freq: 'weekly'  },
            { loc: '/vehiculos-sedan.html',       priority: '0.8', freq: 'weekly'  },
            { loc: '/vehiculos-pickup.html',      priority: '0.8', freq: 'weekly'  },
            { loc: '/vehiculos-hatchback.html',   priority: '0.8', freq: 'weekly'  },
            { loc: '/vehiculos-camionetas.html',  priority: '0.8', freq: 'weekly'  },
            { loc: '/simulador-credito.html',     priority: '0.7', freq: 'monthly' },
            { loc: '/comparar.html',              priority: '0.6', freq: 'monthly' },
            { loc: '/resenas.html',              priority: '0.6', freq: 'monthly' },
            { loc: '/nosotros.html',              priority: '0.6', freq: 'monthly' },
            { loc: '/contacto.html',              priority: '0.6', freq: 'monthly' },
            { loc: '/favoritos.html',             priority: '0.5', freq: 'monthly' },
            { loc: '/terminos.html',              priority: '0.3', freq: 'yearly'  },
            { loc: '/privacidad.html',            priority: '0.3', freq: 'yearly'  },
            { loc: '/cookies.html',               priority: '0.3', freq: 'yearly'  }
        ];

        staticPages.forEach(function(p) {
            xml += '  <url>\n    <loc>' + base + p.loc + '</loc>\n    <lastmod>' + today + '</lastmod>\n    <changefreq>' + p.freq + '</changefreq>\n    <priority>' + p.priority + '</priority>\n  </url>\n\n';
        });

        // Brand pages — pre-rendered static URLs (generated by GitHub Actions workflow)
        if (AP.brands && AP.brands.length > 0) {
            xml += '\n  <!-- Brand pages (pre-rendered static URLs) -->\n';
            AP.brands.forEach(function(b) {
                var slug = _slugifyBrand(b.id);
                xml += '  <url>\n    <loc>' + base + '/marcas/' + slug + '.html</loc>\n    <lastmod>' + today + '</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n\n';
            });
        }

        var disponibles = AP.vehicles.filter(function(v) { return !v.estado || v.estado === 'disponible'; });
        disponibles.forEach(function(v) {
            // Handle Firestore Timestamp, ISO string, or millis
            var lastmod = today;
            if (v.updatedAt) {
                try {
                    var ts = v.updatedAt;
                    var d  = (ts && typeof ts.toDate === 'function') ? ts.toDate()
                           : (typeof ts === 'number') ? new Date(ts)
                           : new Date(String(ts));
                    var iso = d.toISOString().split('T')[0];
                    if (/^\d{4}-\d{2}-\d{2}$/.test(iso)) lastmod = iso;
                } catch (_) { /* keep today */ }
            }
            xml += '  <url>\n    <loc>' + base + '/vehiculos/' + _slugifyVehicle(v) + '.html</loc>\n    <lastmod>' + lastmod + '</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n\n';
        });

        xml += '</urlset>\n';
        var brandCount = (AP.brands && AP.brands.length) || 0;
        return { xml: xml, total: staticPages.length + brandCount + disponibles.length, vehiculos: disponibles.length, marcas: brandCount };
    }

    function _downloadSitemap(xml) {
        var blob = new Blob([xml], { type: 'application/xml' });
        var url  = URL.createObjectURL(blob);
        var a    = document.createElement('a');
        a.href = url; a.download = 'sitemap.xml'; a.click();
        URL.revokeObjectURL(url);
    }

    var btnSitemap = $('btnGenerateSitemap');
    if (btnSitemap) {
        btnSitemap.addEventListener('click', function() {
            var statusEl = $('sitemapStatus');
            if (!statusEl) return;
            var result = _buildSitemapXml();
            var token  = localStorage.getItem(GH_TOKEN_KEY);

            if (token) {
                statusEl.innerHTML = '<span style="color:var(--admin-info);font-size:0.8rem;">Publicando en repositorio...</span>';
                var apiUrl = 'https://api.github.com/repos/' + GH_OWNER + '/' + GH_REPO + '/contents/sitemap.xml';
                fetch(apiUrl, { headers: { 'Authorization': 'token ' + token, 'Accept': 'application/vnd.github+json' } })
                    .then(function(r) { return r.ok ? r.json() : null; })
                    .then(function(fileData) {
                        var body = { message: 'chore: update sitemap.xml (' + result.vehiculos + ' vehiculos)', content: btoa(unescape(encodeURIComponent(result.xml))), branch: GH_BRANCH };
                        if (fileData && fileData.sha) body.sha = fileData.sha;
                        return fetch(apiUrl, { method: 'PUT', headers: { 'Authorization': 'token ' + token, 'Accept': 'application/vnd.github+json', 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
                    })
                    .then(function(r) {
                        if (r && r.ok) {
                            statusEl.innerHTML = '<span style="color:#3fb950;font-size:0.8rem;">&#10003; sitemap.xml publicado en el repositorio — ' + result.total + ' URLs (' + result.vehiculos + ' vehiculos + ' + result.marcas + ' marcas). Google lo indexara en las proximas horas.</span>';
                            AP.writeAuditLog('sitemap', 'sitemap.xml', 'Publicado via GitHub API — ' + result.total + ' URLs');
                        } else {
                            return Promise.reject(new Error('GitHub API error ' + (r ? r.status : '')));
                        }
                    })
                    .catch(function(err) {
                        _downloadSitemap(result.xml);
                        statusEl.innerHTML = '<span style="color:var(--admin-warning);font-size:0.8rem;">&#9888; No se pudo publicar automaticamente (' + (err.message || 'error') + '). Archivo descargado — subelo manualmente.</span>';
                    });
            } else {
                _downloadSitemap(result.xml);
                statusEl.innerHTML = '<span style="color:#3fb950;font-size:0.8rem;">&#10003; Sitemap generado (' + result.total + ' URLs, ' + result.vehiculos + ' vehiculos). ' +
                    'Configura el <strong>Token GitHub</strong> abajo para publicar automaticamente.</span>';
            }
        });
    }

    // ========== GITHUB TOKEN (Super Admin only) ==========
    function _initGhTokenSection() {
        var section  = $('ghTokenSection');
        var input    = $('ghTokenInput');
        var saveBtn  = $('btnSaveGhToken');
        var clearBtn = $('btnClearGhToken');
        var statusEl = $('ghTokenStatus');
        if (!section || !AP.isSuperAdmin()) return;
        if (section.dataset.initialized) return; // evitar duplicados
        section.dataset.initialized = '1';
        section.style.display = 'block';
        var saved = localStorage.getItem(GH_TOKEN_KEY);
        if (saved) {
            input.value = saved;
            statusEl.textContent = '✓ Token guardado. Listo para publicar sitemap automaticamente.';
            statusEl.style.color = 'var(--admin-success)';
        }
        saveBtn.addEventListener('click', function() {
            var val = input.value.trim();
            if (!val) { statusEl.textContent = 'Ingresa un token valido.'; statusEl.style.color = 'var(--admin-danger)'; return; }
            localStorage.setItem(GH_TOKEN_KEY, val);
            statusEl.textContent = '✓ Token guardado en este navegador.';
            statusEl.style.color = 'var(--admin-success)';
        });
        clearBtn.addEventListener('click', function() {
            localStorage.removeItem(GH_TOKEN_KEY);
            input.value = '';
            statusEl.textContent = 'Token eliminado.';
            statusEl.style.color = 'var(--admin-text-muted)';
        });
    }

    // Enganchar en AP.loadData para que se ejecute post-login (cuando el rol ya está disponible)
    var _origAPLoadData = AP.loadData;
    AP.loadData = function() {
        if (_origAPLoadData) _origAPLoadData.apply(AP, arguments);
        _initGhTokenSection();
    };

    // ========== REGENERAR PAGINAS SEO ==========
    // Llama directamente a la GitHub API (repository_dispatch) desde el browser,
    // usando el mismo token guardado en localStorage. No depende de Firebase Functions.
    var btnRegenSeo = $('btnRegenerateSeo');
    if (btnRegenSeo) {
        btnRegenSeo.addEventListener('click', function() {
            if (!AP.isSuperAdmin()) {
                AP.toast('Solo Super Admin puede regenerar paginas SEO', 'error');
                return;
            }

            var statusEl  = $('sitemapStatus');
            var token     = localStorage.getItem(GH_TOKEN_KEY);

            if (!token) {
                AP.toast('Configura el Token GitHub abajo antes de regenerar.', 'error');
                if (statusEl) statusEl.innerHTML = '<span style="color:var(--admin-danger);font-size:0.8rem;">&#10007; Falta el Token GitHub. Ingrésalo en el campo de abajo y guárdalo.</span>';
                return;
            }

            btnRegenSeo.disabled = true;
            btnRegenSeo.innerHTML = '<span style="display:inline-flex;align-items:center;gap:6px;"><span class="seo-spinner"></span> Enviando...</span>';
            if (statusEl) {
                statusEl.innerHTML = '<span style="color:var(--admin-info);font-size:0.8rem;display:flex;align-items:center;gap:8px;">' +
                    '<span class="seo-spinner"></span> Disparando regeneracion de paginas SEO...</span>';
            }

            fetch('https://api.github.com/repos/' + GH_OWNER + '/' + GH_REPO + '/dispatches', {
                method: 'POST',
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    event_type: 'vehicle-changed',
                    client_payload: {
                        action: 'manual-trigger',
                        triggeredBy: (window.auth && window.auth.currentUser) ? window.auth.currentUser.email : 'admin',
                        timestamp: new Date().toISOString()
                    }
                })
            })
            .then(function(r) {
                if (r.ok || r.status === 204) {
                    AP.toast('Regeneracion SEO iniciada. Las paginas se actualizaran en ~2 minutos.', 'success');
                    if (statusEl) {
                        statusEl.innerHTML = '<span style="color:var(--admin-success,#3fb950);font-size:0.8rem;">&#10003; Regeneracion iniciada. Las paginas SEO se actualizaran en ~2 minutos.</span>';
                    }
                    AP.writeAuditLog('seo_regenerate', 'github-actions', 'Dispatch manual via GitHub API');
                } else if (r.status === 401) {
                    AP.toast('Error 401: token invalido o expirado.', 'error');
                    if (statusEl) statusEl.innerHTML = '<span style="color:var(--admin-danger);font-size:0.8rem;">&#10007; Token invalido o expirado (401). Genera un nuevo token en GitHub y guardalo abajo.</span>';
                } else if (r.status === 403) {
                    AP.toast('Error 403: el token no tiene permiso Actions: Write.', 'error');
                    if (statusEl) statusEl.innerHTML = '<span style="color:var(--admin-danger);font-size:0.8rem;">&#10007; Permiso insuficiente (403). El token necesita <code>Actions: Read and write</code>.</span>';
                } else if (r.status === 404) {
                    AP.toast('Error 404: repositorio no encontrado o workflow no existe.', 'error');
                    if (statusEl) statusEl.innerHTML = '<span style="color:var(--admin-danger);font-size:0.8rem;">&#10007; Workflow no encontrado (404). Verifica que el repositorio tenga un workflow que escuche <code>vehicle-changed</code>.</span>';
                } else {
                    AP.toast('Error GitHub API: ' + r.status, 'error');
                    if (statusEl) statusEl.innerHTML = '<span style="color:var(--admin-danger);font-size:0.8rem;">&#10007; GitHub API error ' + r.status + '.</span>';
                }
            })
            .catch(function(err) {
                AP.toast('Error de red: ' + (err.message || 'sin conexion'), 'error');
                if (statusEl) statusEl.innerHTML = '<span style="color:var(--admin-danger);font-size:0.8rem;">&#10007; Error de red: ' + AP.escapeHtml(err.message || 'sin conexion') + '.</span>';
            })
            .finally(function() {
                btnRegenSeo.disabled = false;
                btnRegenSeo.textContent = 'Regenerar Paginas SEO';
            });
        });
    }

    // ========== EXPOSE ==========
    AP.renderSalesTracking = renderSalesTracking;
    AP.markAsSold = markAsSold;
})();
