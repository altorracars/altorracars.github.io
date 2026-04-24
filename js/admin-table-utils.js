// Admin Panel — Phase 3: Pagination, Sorting, Search, CSV Export & Offline Cache
(function() {
    'use strict';
    var AP = window.AP;
    var $ = AP.$;

    // ========== PAGINATION STATE ==========
    AP._pagination = {
        vehicles:     { page: 1, pageSize: 15 },
        brands:       { page: 1, pageSize: 20 },
        users:        { page: 1, pageSize: 20 },
        appointments: { page: 1, pageSize: 15 },
        audit:        { page: 1, pageSize: 50 }
    };

    // ========== SORTING STATE ==========
    AP._sorting = {
        vehicles:     { col: null, dir: 'asc' },
        brands:       { col: null, dir: 'asc' },
        users:        { col: null, dir: 'asc' },
        appointments: { col: null, dir: 'asc' },
        audit:        { col: null, dir: 'asc' }
    };

    // ========== PAGINATION HELPERS ==========
    AP.paginate = function(arr, tableKey) {
        var p = AP._pagination[tableKey];
        if (!p) return arr;
        var start = (p.page - 1) * p.pageSize;
        return arr.slice(start, start + p.pageSize);
    };

    AP.getTotalPages = function(totalItems, tableKey) {
        var p = AP._pagination[tableKey];
        if (!p || p.pageSize <= 0) return 1;
        return Math.max(1, Math.ceil(totalItems / p.pageSize));
    };

    AP.setPage = function(tableKey, page) {
        var p = AP._pagination[tableKey];
        if (!p) return;
        p.page = Math.max(1, page);
        // Trigger re-render
        var renders = {
            vehicles: function() { AP.renderVehiclesTable($('vehicleSearch') ? $('vehicleSearch').value : ''); },
            brands: function() { if (AP.renderBrandsTable) AP.renderBrandsTable(); },
            users: function() { if (AP.renderUsersTable) AP.renderUsersTable(); },
            appointments: function() { if (AP.renderAppointmentsTable) AP.renderAppointmentsTable(); },
            audit: function() { if (AP.renderAuditTable) AP.renderAuditTable(); }
        };
        if (renders[tableKey]) renders[tableKey]();
    };

    AP.renderPagination = function(containerId, tableKey, totalItems) {
        var el = $(containerId);
        if (!el) return;
        var p = AP._pagination[tableKey];
        var totalPages = AP.getTotalPages(totalItems, tableKey);

        if (totalItems === 0) { el.innerHTML = ''; return; }

        // Clamp current page
        if (p.page > totalPages) p.page = totalPages;

        var start = (p.page - 1) * p.pageSize + 1;
        var end = Math.min(p.page * p.pageSize, totalItems);

        var html = '<div class="pagination-bar">';

        // Page size selector
        var sizes = [15, 30, 50, 100];
        html += '<div class="pagination-size"><select class="form-select pagination-size-select" data-table="' + tableKey + '" title="Filas por pagina">';
        sizes.forEach(function(s) {
            html += '<option value="' + s + '"' + (p.pageSize === s ? ' selected' : '') + '>' + s + '</option>';
        });
        html += '</select><span style="font-size:0.75rem;color:var(--admin-text-muted);margin-left:0.25rem;">por pag.</span></div>';

        html += '<span class="pagination-info">Mostrando ' + start + '-' + end + ' de ' + totalItems + '</span>';

        if (totalPages > 1) {
            html += '<div class="pagination-controls">';

            html += '<button class="btn btn-ghost btn-sm pagination-btn" ' +
                (p.page <= 1 ? 'disabled' : '') +
                ' data-table="' + tableKey + '" data-page="1" title="Primera">&laquo;</button>';

            html += '<button class="btn btn-ghost btn-sm pagination-btn" ' +
                (p.page <= 1 ? 'disabled' : '') +
                ' data-table="' + tableKey + '" data-page="' + (p.page - 1) + '" title="Anterior">&lsaquo;</button>';

            // Page numbers (show max 5)
            var startPage = Math.max(1, p.page - 2);
            var endPage = Math.min(totalPages, startPage + 4);
            if (endPage - startPage < 4) startPage = Math.max(1, endPage - 4);

            for (var i = startPage; i <= endPage; i++) {
                html += '<button class="btn btn-sm pagination-btn' + (i === p.page ? ' pagination-active' : ' btn-ghost') + '" ' +
                    'data-table="' + tableKey + '" data-page="' + i + '">' + i + '</button>';
            }

            html += '<button class="btn btn-ghost btn-sm pagination-btn" ' +
                (p.page >= totalPages ? 'disabled' : '') +
                ' data-table="' + tableKey + '" data-page="' + (p.page + 1) + '" title="Siguiente">&rsaquo;</button>';

            html += '<button class="btn btn-ghost btn-sm pagination-btn" ' +
                (p.page >= totalPages ? 'disabled' : '') +
                ' data-table="' + tableKey + '" data-page="' + totalPages + '" title="Ultima">&raquo;</button>';

            // Jump to page (show only when 5+ pages)
            if (totalPages >= 5) {
                html += '<span class="pagination-jump">' +
                    '<input type="number" class="form-input pagination-jump-input" data-table="' + tableKey + '" ' +
                    'min="1" max="' + totalPages + '" value="' + p.page + '" title="Ir a pagina" style="width:50px;padding:0.2rem 0.3rem;font-size:0.8rem;text-align:center;">' +
                    '<span style="font-size:0.7rem;color:var(--admin-text-muted);margin-left:0.2rem;">/ ' + totalPages + '</span></span>';
            }

            html += '</div>';
        }

        html += '</div>';
        el.innerHTML = html;
    };

    // Page size change handler
    document.addEventListener('change', function(e) {
        var sel = e.target.closest ? e.target.closest('.pagination-size-select') : null;
        if (!sel) return;
        var tableKey = sel.getAttribute('data-table');
        var p = AP._pagination[tableKey];
        if (!p) return;
        var newSize = parseInt(sel.value, 10);
        var firstItemIdx = (p.page - 1) * p.pageSize;
        p.pageSize = newSize;
        p.page = Math.max(1, Math.floor(firstItemIdx / newSize) + 1);
        AP.setPage(tableKey, p.page);
    });

    // Jump to page handler
    document.addEventListener('keydown', function(e) {
        if (e.key !== 'Enter') return;
        var input = e.target.closest ? e.target.closest('.pagination-jump-input') : null;
        if (!input) return;
        var tableKey = input.getAttribute('data-table');
        var page = parseInt(input.value, 10);
        if (tableKey && page >= 1) AP.setPage(tableKey, page);
    });

    // Delegated click handler for pagination buttons
    document.addEventListener('click', function(e) {
        var _el = e.target.nodeType === 1 ? e.target : e.target.parentElement;
        var btn = _el && _el.closest ? _el.closest('.pagination-btn') : null;
        if (!btn || btn.disabled) return;
        var tableKey = btn.getAttribute('data-table');
        var page = parseInt(btn.getAttribute('data-page'), 10);
        if (tableKey && page) AP.setPage(tableKey, page);
    });

    // ========== SORTING HELPERS ==========
    AP.sortData = function(arr, tableKey) {
        var s = AP._sorting[tableKey];
        if (!s || !s.col) return arr;

        var sorted = arr.slice(); // Don't mutate original
        var col = s.col;
        var dir = s.dir === 'asc' ? 1 : -1;

        sorted.sort(function(a, b) {
            var va = a[col], vb = b[col];
            if (va == null) va = '';
            if (vb == null) vb = '';
            if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * dir;
            return String(va).localeCompare(String(vb), 'es', { numeric: true }) * dir;
        });

        return sorted;
    };

    AP.toggleSort = function(tableKey, col) {
        var s = AP._sorting[tableKey];
        if (!s) return;
        if (s.col === col) {
            s.dir = s.dir === 'asc' ? 'desc' : 'asc';
        } else {
            s.col = col;
            s.dir = 'asc';
        }
        AP._pagination[tableKey].page = 1; // Reset to first page on sort
        AP.setPage(tableKey, 1);
    };

    AP.getSortIndicator = function(tableKey, col) {
        var s = AP._sorting[tableKey];
        if (!s || s.col !== col) return '<span class="sort-icon sort-inactive"><i data-lucide="arrow-up-down" style="width:12px;height:12px;opacity:0.4;"></i></span>';
        return s.dir === 'asc'
            ? '<span class="sort-icon sort-asc"><i data-lucide="chevron-up" style="width:12px;height:12px;"></i></span>'
            : '<span class="sort-icon sort-desc"><i data-lucide="chevron-down" style="width:12px;height:12px;"></i></span>';
    };

    // Delegated click handler for sortable headers
    document.addEventListener('click', function(e) {
        var _el2 = e.target.nodeType === 1 ? e.target : e.target.parentElement;
        var th = _el2 && _el2.closest ? _el2.closest('th[data-sort]') : null;
        if (!th) return;
        var tableKey = th.getAttribute('data-table');
        var col = th.getAttribute('data-sort');
        if (tableKey && col) AP.toggleSort(tableKey, col);
    });

    // ========== CSV EXPORT ==========
    AP.exportCSV = function(filename, headers, rows) {
        var BOM = '\uFEFF'; // UTF-8 BOM for Excel
        var csv = BOM + headers.join(',') + '\n';
        rows.forEach(function(row) {
            csv += row.map(function(cell) {
                var val = cell == null ? '' : String(cell);
                // Escape quotes and wrap in quotes if needed
                if (val.indexOf(',') >= 0 || val.indexOf('"') >= 0 || val.indexOf('\n') >= 0) {
                    val = '"' + val.replace(/"/g, '""') + '"';
                }
                return val;
            }).join(',') + '\n';
        });

        var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
        AP.toast('CSV exportado: ' + filename);
    };

    AP.exportVehiclesCSV = function() {
        var headers = ['Codigo', 'Marca', 'Modelo', 'Ano', 'Tipo', 'Categoria', 'Precio', 'Precio Oferta',
            'Estado', 'Kilometraje', 'Transmision', 'Combustible', 'Motor', 'Color', 'Destacado', 'Origen',
            'Creado Por', 'Fecha Creacion', 'Modificado Por', 'Fecha Modificacion'];
        var rows = AP.vehicles.map(function(v) {
            var origen = 'Propio';
            if (v.concesionario && v.concesionario !== '' && v.concesionario !== '_particular') {
                var dealer = AP.dealers ? AP.dealers.find(function(d) { return d._docId === v.concesionario; }) : null;
                origen = dealer ? dealer.nombre : v.concesionario;
            } else if (v.concesionario === '_particular' && v.consignaParticular) {
                origen = 'Consigna: ' + v.consignaParticular;
            }
            return [
                v.codigoUnico || '', v.marca || '', v.modelo || '', v.year || '',
                v.tipo || '', v.categoria || '', v.precio || '', v.precioOferta || '',
                v.estado || 'disponible', v.kilometraje || '', v.transmision || '',
                v.combustible || '', v.motor || '', v.color || '',
                v.destacado ? 'Si' : 'No', origen,
                v.createdByName || v.createdBy || '', v.createdAt || '',
                v.lastModifiedByName || v.lastModifiedBy || '', v.lastModifiedAt || ''
            ];
        });
        var date = new Date().toISOString().slice(0, 10);
        AP.exportCSV('vehiculos_altorra_' + date + '.csv', headers, rows);
    };

    AP.exportAppointmentsCSV = function() {
        var headers = ['Cliente', 'WhatsApp', 'Email', 'Vehiculo', 'Fecha', 'Hora', 'Estado', 'Tipo', 'Observaciones'];
        var rows = AP.appointments.map(function(a) {
            return [
                a.nombre || '', a.whatsapp || a.telefono || '', a.email || '',
                a.vehiculo || 'General', a.fecha || '', a.hora || '',
                a.estado || 'pendiente', a.tipoCita || a.origen || '',
                a.observaciones || a.comentarios || ''
            ];
        });
        var date = new Date().toISOString().slice(0, 10);
        AP.exportCSV('solicitudes_altorra_' + date + '.csv', headers, rows);
    };

    // ========== PASSWORD VALIDATION ==========
    AP.PASSWORD_RULES = {
        minLength: 8,
        requireUpper: true,
        requireLower: true,
        requireNumber: true,
        requireSpecial: true
    };

    AP.validatePassword = function(password) {
        var rules = AP.PASSWORD_RULES;
        var errors = [];
        if (password.length < rules.minLength) errors.push('Minimo ' + rules.minLength + ' caracteres');
        if (rules.requireUpper && !/[A-Z]/.test(password)) errors.push('Al menos una mayuscula');
        if (rules.requireLower && !/[a-z]/.test(password)) errors.push('Al menos una minuscula');
        if (rules.requireNumber && !/[0-9]/.test(password)) errors.push('Al menos un numero');
        if (rules.requireSpecial && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) errors.push('Al menos un caracter especial (!@#$%...)');
        return errors;
    };

    AP.getPasswordStrength = function(password) {
        if (!password) return { level: 0, label: '', cls: '' };
        var score = 0;
        if (password.length >= 8) score++;
        if (password.length >= 12) score++;
        if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^a-zA-Z0-9]/.test(password)) score++;

        if (score <= 1) return { level: 1, label: 'Muy debil', cls: 'strength-weak' };
        if (score === 2) return { level: 2, label: 'Debil', cls: 'strength-fair' };
        if (score === 3) return { level: 3, label: 'Aceptable', cls: 'strength-good' };
        if (score === 4) return { level: 4, label: 'Fuerte', cls: 'strength-strong' };
        return { level: 5, label: 'Muy fuerte', cls: 'strength-excellent' };
    };

    // ========== OFFLINE CACHE ==========
    var CACHE_PREFIX = 'altorra_admin_';
    var CACHE_TTL = 30 * 60 * 1000; // 30 minutes

    AP.cacheData = function(key, data) {
        try {
            localStorage.setItem(CACHE_PREFIX + key, JSON.stringify({
                data: data,
                timestamp: Date.now()
            }));
        } catch (e) {
            // localStorage full or unavailable — silently ignore
        }
    };

    AP.getCachedData = function(key) {
        try {
            var raw = localStorage.getItem(CACHE_PREFIX + key);
            if (!raw) return null;
            var parsed = JSON.parse(raw);
            if (Date.now() - parsed.timestamp > CACHE_TTL) {
                localStorage.removeItem(CACHE_PREFIX + key);
                return null;
            }
            return parsed.data;
        } catch (e) {
            return null;
        }
    };

    AP.loadFromCacheIfOffline = function() {
        if (navigator.onLine) return false;
        var cached = AP.getCachedData('vehicles');
        if (cached) AP.vehicles = cached;
        cached = AP.getCachedData('brands');
        if (cached) AP.brands = cached;
        cached = AP.getCachedData('appointments');
        if (cached) AP.appointments = cached;
        cached = AP.getCachedData('dealers');
        if (cached) AP.dealers = cached;

        if (AP.vehicles.length || AP.brands.length) {
            AP.toast('Modo offline — Mostrando datos en cache', 'warning');
            if (AP.renderVehiclesTable) AP.renderVehiclesTable();
            if (AP.renderBrandsTable) AP.renderBrandsTable();
            if (AP.updateStats) AP.updateStats();
            return true;
        }
        return false;
    };

    // Auto-cache data when it loads
    AP._autoCacheData = function() {
        if (AP.vehicles.length) AP.cacheData('vehicles', AP.vehicles);
        if (AP.brands.length) AP.cacheData('brands', AP.brands);
        if (AP.appointments.length) AP.cacheData('appointments', AP.appointments);
        if (AP.dealers && AP.dealers.length) AP.cacheData('dealers', AP.dealers);
    };

    // Offline write queue
    var _offlineQueue = [];
    try {
        var savedQueue = localStorage.getItem(CACHE_PREFIX + 'writeQueue');
        if (savedQueue) _offlineQueue = JSON.parse(savedQueue);
    } catch (e) {}

    AP.queueOfflineWrite = function(collection, docId, data, action) {
        _offlineQueue.push({ collection: collection, docId: docId, data: data, action: action, timestamp: Date.now() });
        try {
            localStorage.setItem(CACHE_PREFIX + 'writeQueue', JSON.stringify(_offlineQueue));
        } catch (e) {}
    };

    AP.processOfflineQueue = function() {
        if (!_offlineQueue.length || !navigator.onLine || !window.db) return;
        AP.toast('Sincronizando ' + _offlineQueue.length + ' cambio(s) pendiente(s)...', 'info');
        var queue = _offlineQueue.slice();
        _offlineQueue = [];

        var processed = 0;
        var errors = 0;
        queue.forEach(function(item) {
            var ref = window.db.collection(item.collection).doc(item.docId);
            var promise;
            if (item.action === 'delete') {
                promise = ref.delete();
            } else if (item.action === 'set') {
                promise = ref.set(item.data);
            } else {
                promise = ref.update(item.data);
            }
            promise.then(function() {
                processed++;
                if (processed + errors === queue.length) {
                    AP.toast('Sincronizacion completada: ' + processed + ' exitoso(s)' + (errors ? ', ' + errors + ' error(es)' : ''));
                }
            }).catch(function() {
                errors++;
                _offlineQueue.push(item); // Re-queue
                if (processed + errors === queue.length) {
                    try { localStorage.setItem(CACHE_PREFIX + 'writeQueue', JSON.stringify(_offlineQueue)); } catch (e) {}
                    AP.toast('Sincronizacion parcial: ' + processed + ' exitoso(s), ' + errors + ' error(es)', 'warning');
                }
            });
        });
    };

    // Process queue when coming back online
    window.addEventListener('online', function() {
        setTimeout(function() { AP.processOfflineQueue(); }, 2000);
    });

    // ========== GLOBAL SEARCH ==========
    var _searchDebounce = null;

    function performGlobalSearch(query, resultsContainerId) {
        var container = $(resultsContainerId);
        if (!container) return;

        if (!query || query.length < 2) {
            container.classList.remove('active');
            container.innerHTML = '';
            return;
        }

        var q = query.toLowerCase();
        var html = '';

        // Search vehicles
        var vehicleResults = AP.vehicles.filter(function(v) {
            return (v.marca + ' ' + v.modelo + ' ' + v.year + ' ' + (v.codigoUnico || '') + ' ' + (v.categoria || '')).toLowerCase().indexOf(q) >= 0;
        }).slice(0, 5);

        if (vehicleResults.length) {
            html += '<div class="search-result-group"><div class="search-result-group-title">Vehiculos</div>';
            vehicleResults.forEach(function(v) {
                var estado = v.estado || 'disponible';
                var estadoInfo = AP.ESTADO_LABELS[estado] || AP.ESTADO_LABELS.disponible;
                html += '<div class="search-result-item" data-action="nav" data-section="vehicles" data-search="' + AP.escapeHtml(v.marca + ' ' + v.modelo) + '">' +
                    '<span>' + AP.escapeHtml((v.marca || '').charAt(0).toUpperCase() + (v.marca || '').slice(1) + ' ' + (v.modelo || '') + ' ' + (v.year || '')) + '</span>' +
                    '<span class="search-result-badge badge ' + estadoInfo.cls + '">' + estadoInfo.text + '</span>' +
                '</div>';
            });
            html += '</div>';
        }

        // Search brands
        var brandResults = AP.brands.filter(function(b) {
            return (b.nombre + ' ' + b.id).toLowerCase().indexOf(q) >= 0;
        }).slice(0, 3);

        if (brandResults.length) {
            html += '<div class="search-result-group"><div class="search-result-group-title">Marcas</div>';
            brandResults.forEach(function(b) {
                html += '<div class="search-result-item" data-action="nav" data-section="brands">' +
                    '<span>' + AP.escapeHtml(b.nombre) + '</span>' +
                    '<span style="font-size:0.7rem;color:var(--admin-text-muted);">' + AP.escapeHtml(b.id) + '</span>' +
                '</div>';
            });
            html += '</div>';
        }

        // Search appointments
        var apptResults = AP.appointments.filter(function(a) {
            return ((a.nombre || '') + ' ' + (a.vehiculo || '') + ' ' + (a.email || '')).toLowerCase().indexOf(q) >= 0;
        }).slice(0, 3);

        if (apptResults.length) {
            html += '<div class="search-result-group"><div class="search-result-group-title">Citas</div>';
            apptResults.forEach(function(a) {
                html += '<div class="search-result-item" data-action="nav" data-section="appointments">' +
                    '<span>' + AP.escapeHtml(a.nombre || '-') + '</span>' +
                    '<span style="font-size:0.7rem;color:var(--admin-text-muted);">' + AP.escapeHtml(a.fecha || '') + '</span>' +
                '</div>';
            });
            html += '</div>';
        }

        if (!html) {
            html = '<div style="padding:1rem;text-align:center;color:var(--admin-text-muted);font-size:0.85rem;">Sin resultados para "' + AP.escapeHtml(query) + '"</div>';
        }

        container.innerHTML = html;
        container.classList.add('active');
    }

    function initGlobalSearch(inputId, resultsId) {
        var input = $(inputId);
        if (!input) return;
        input.addEventListener('input', function() {
            var val = this.value.trim();
            if (_searchDebounce) clearTimeout(_searchDebounce);
            _searchDebounce = setTimeout(function() {
                performGlobalSearch(val, resultsId);
            }, 200);
        });

        input.addEventListener('blur', function() {
            setTimeout(function() {
                var container = $(resultsId);
                if (container) container.classList.remove('active');
            }, 200);
        });

        input.addEventListener('focus', function() {
            if (this.value.trim().length >= 2) {
                performGlobalSearch(this.value.trim(), resultsId);
            }
        });
    }

    // Navigate to section on result click
    document.addEventListener('click', function(e) {
        var _el3 = e.target.nodeType === 1 ? e.target : e.target.parentElement;
        var item = _el3 && _el3.closest ? _el3.closest('.search-result-item[data-action="nav"]') : null;
        if (!item) return;
        var section = item.getAttribute('data-section');
        var searchVal = item.getAttribute('data-search') || '';
        if (section) {
            // Navigate to section
            var navBtn = document.querySelector('.nav-item[data-section="' + section + '"]');
            if (navBtn) navBtn.click();
            // If vehicle, populate the vehicle search
            if (section === 'vehicles' && searchVal) {
                var vs = $('vehicleSearch');
                if (vs) { vs.value = searchVal; vs.dispatchEvent(new Event('input')); }
            }
        }
        // Close all search results
        document.querySelectorAll('.global-search-results').forEach(function(el) {
            el.classList.remove('active');
        });
    });

    // Init both search boxes
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initGlobalSearch('globalSearch', 'globalSearchResults');
            initGlobalSearch('globalSearchMobile', 'globalSearchResultsMobile');
        });
    } else {
        initGlobalSearch('globalSearch', 'globalSearchResults');
        initGlobalSearch('globalSearchMobile', 'globalSearchResultsMobile');
    }

    // ========== PASSWORD VALIDATION UI ==========
    function initPasswordValidation() {
        var input = $('newPassword');
        var strengthContainer = $('passwordStrengthContainer');
        var strengthBar = $('passwordStrengthBar');
        var strengthLabel = $('passwordStrengthLabel');
        var rulesList = $('passwordRules');
        var submitBtn = $('btnChangePassword');
        if (!input) return;

        input.addEventListener('input', function() {
            var pw = this.value;
            if (!pw) {
                strengthContainer.style.display = 'none';
                rulesList.style.display = 'none';
                return;
            }

            strengthContainer.style.display = '';
            rulesList.style.display = '';

            // Update strength bar
            var strength = AP.getPasswordStrength(pw);
            strengthBar.className = 'password-strength-bar ' + strength.cls;
            strengthLabel.textContent = strength.label;
            strengthLabel.style.color = strength.level <= 2 ? 'var(--admin-danger)' : strength.level === 3 ? 'var(--admin-warning)' : 'var(--admin-success)';

            // Update rules
            var rules = {
                length: pw.length >= 8,
                upper: /[A-Z]/.test(pw),
                lower: /[a-z]/.test(pw),
                number: /[0-9]/.test(pw),
                special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pw)
            };

            rulesList.querySelectorAll('li').forEach(function(li) {
                var rule = li.getAttribute('data-rule');
                var pass = rules[rule];
                li.className = pass ? 'rule-pass' : 'rule-fail';
                li.querySelector('.rule-icon').textContent = pass ? '✓' : '○';
            });

            // Disable submit if validation fails
            var errors = AP.validatePassword(pw);
            if (submitBtn) submitBtn.disabled = errors.length > 0;
        });

        // Override form submit to validate
        var form = $('changePasswordForm');
        if (form) {
            form.addEventListener('submit', function(e) {
                var pw = input.value;
                var errors = AP.validatePassword(pw);
                if (errors.length > 0) {
                    e.preventDefault();
                    AP.toast('Contrasena no cumple los requisitos: ' + errors[0], 'error');
                }
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPasswordValidation);
    } else {
        initPasswordValidation();
    }

    // F7.5: Bind CSV export buttons (migrated from inline onclick)
    var btnExpVehicles = $('btnExportVehiclesCSV');
    if (btnExpVehicles) btnExpVehicles.addEventListener('click', function() { AP.exportVehiclesCSV(); });
    var btnExpAppts = $('btnExportAppointmentsCSV');
    if (btnExpAppts) btnExpAppts.addEventListener('click', function() { AP.exportAppointmentsCSV(); });

})();
