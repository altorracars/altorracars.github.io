// Admin Panel — Vehicle CRUD, Images, Drafts & Preview
(function() {
    'use strict';
    var AP = window.AP;
    var $ = AP.$;

    // ========== VEHICLE AUDIT TRAIL ==========
    // Returns current user info for audit fields
    function getAuditUser() {
        var user = window.auth && window.auth.currentUser;
        var profile = AP.currentUserProfile;
        return {
            email: user ? user.email : 'unknown',
            name: profile ? (profile.nombre || profile.name || user.email) : (user ? user.email : 'unknown')
        };
    }

    // Compute diff between old and new vehicle data (only meaningful fields)
    var AUDIT_FIELDS = ['marca', 'modelo', 'year', 'tipo', 'categoria', 'precio', 'precioOferta',
        'kilometraje', 'transmision', 'combustible', 'motor', 'color', 'estado', 'ubicacion',
        'destacado', 'descripcion', 'imagen', 'concesionario', 'oferta', 'featuredOrder'];

    function computeChanges(oldData, newData) {
        if (!oldData) return [{ field: '(nuevo)', from: null, to: 'creado' }];
        var changes = [];
        AUDIT_FIELDS.forEach(function(field) {
            var oldVal = oldData[field];
            var newVal = newData[field];
            // Normalize for comparison
            if (oldVal === undefined) oldVal = null;
            if (newVal === undefined) newVal = null;
            if (typeof oldVal === 'number' && typeof newVal === 'number') {
                if (oldVal !== newVal) changes.push({ field: field, from: oldVal, to: newVal });
            } else if (String(oldVal || '') !== String(newVal || '')) {
                changes.push({ field: field, from: oldVal, to: newVal });
            }
        });
        return changes;
    }

    // Write an entry to vehiculos/{id}/auditLog subcollection
    function logVehicleAction(vehicleId, action, changes, extraData) {
        if (!window.db || !vehicleId) return Promise.resolve();
        var auditUser = getAuditUser();
        var entry = {
            action: action,
            user: auditUser.email,
            userName: auditUser.name,
            timestamp: Date.now(),
            changes: changes || [],
            vehicleId: vehicleId
        };
        if (extraData) {
            Object.keys(extraData).forEach(function(k) { entry[k] = extraData[k]; });
        }
        return window.db.collection('vehiculos').doc(String(vehicleId))
            .collection('auditLog').add(entry)
            .catch(function(err) { console.warn('[Audit] Failed to log action:', err.message); });
    }

    // ========== UNIQUE VEHICLE CODE ==========
    // Format: ALT-YYYYMM-XXXX (auto-generated, immutable, never reused)
    function generateUniqueCode() {
        var counterRef = window.db.collection('config').doc('counters');
        return window.db.runTransaction(function(transaction) {
            return transaction.get(counterRef).then(function(doc) {
                var data = doc.exists ? doc.data() : {};
                var nextSeq = (data.vehicleCodeSeq || 0) + 1;
                transaction.set(counterRef, { vehicleCodeSeq: nextSeq }, { merge: true });
                var now = new Date();
                var yyyy = now.getFullYear();
                var mm = String(now.getMonth() + 1).padStart(2, '0');
                var seq = String(nextSeq).padStart(4, '0');
                return 'ALT-' + yyyy + mm + '-' + seq;
            });
        });
    }

    // ========== BRAND SELECT ==========
    function populateBrandSelect() {
        var select = $('vMarca');
        var currentVal = select.value;
        select.innerHTML = '<option value="">Seleccionar...</option>';
        AP.brands.sort(function(a, b) { return a.nombre.localeCompare(b.nombre); });
        AP.brands.forEach(function(b) {
            var opt = document.createElement('option');
            opt.value = b.id;
            opt.textContent = b.nombre;
            select.appendChild(opt);
        });
        if (currentVal) select.value = currentVal;
    }

    // ========== VEHICLES TABLE ==========
    var _reorderMode = false;
    var _dragSrcRow = null;
    var _searchTimer = null;

    // F9.2: Build cached search string per vehicle
    function _buildSearchStr(v) {
        if (!v._searchStr) {
            v._searchStr = (v.marca + ' ' + v.modelo + ' ' + v.year + ' ' + (v.estado || '') + ' ' + (v.codigoUnico || '') + ' ' + (v.categoria || '') + ' ' + (v.color || '')).toLowerCase();
        }
        return v._searchStr;
    }

    function renderVehiclesTable(filter) {
        var filtered = AP.vehicles;
        if (filter) {
            var q = filter.toLowerCase();
            filtered = filtered.filter(function(v) {
                return _buildSearchStr(v).indexOf(q) >= 0;
            });
        }
        // F8.5: Advanced filters
        var fEstado = $('vehicleFilterEstado');
        var fDealer = $('vehicleFilterDealer');
        if (fEstado && fEstado.value) {
            var est = fEstado.value.toLowerCase();
            filtered = filtered.filter(function(v) { return (v.estado || '').toLowerCase() === est; });
        }
        if (fDealer && fDealer.value) {
            var dlr = fDealer.value;
            filtered = filtered.filter(function(v) { return v.concesionario === dlr; });
        }
        // In reorder mode sort by prioridad desc, otherwise by id or user sort
        if (_reorderMode) {
            filtered.sort(function(a, b) {
                var pa = a.prioridad || 0, pb = b.prioridad || 0;
                if (pa !== pb) return pb - pa;
                return a.id - b.id;
            });
        } else if (AP._sorting && AP._sorting.vehicles && AP._sorting.vehicles.col) {
            filtered = AP.sortData(filtered, 'vehicles');
        } else {
            filtered.sort(function(a, b) { return a.id - b.id; });
        }

        var totalFiltered = filtered.length;
        // Apply pagination (skip in reorder mode)
        if (!_reorderMode && AP.paginate) {
            filtered = AP.paginate(filtered, 'vehicles');
        }

        var maxPrio = 1;
        filtered.forEach(function(v) { if ((v.prioridad || 0) > maxPrio) maxPrio = v.prioridad; });

        var html = '';
        var colCount = _reorderMode ? 10 : 8;
        filtered.forEach(function(v) {
            var estado = v.estado || 'disponible';
            var estadoInfo = AP.ESTADO_LABELS[estado] || AP.ESTADO_LABELS.disponible;
            var estadoBadge = '<span class="badge ' + estadoInfo.cls + '">' + estadoInfo.text + '</span>';
            var esVendido = estado === 'vendido';
            var actions = '<div class="v-actions">';
            // Group 1: View actions (always visible)
            actions += '<button class="v-act v-act--info" data-action="previewVehicle" data-id="' + v.id + '" title="Vista previa"><i data-lucide="eye"></i></button>';
            actions += '<button class="v-act v-act--info" data-action="showAuditTimeline" data-id="' + v.id + '" title="Historial"><i data-lucide="clock-3"></i></button>';
            if (AP.canCreateOrEditInventory()) {
                // Separator
                actions += '<span class="v-act-sep"></span>';
                // Group 2: Edit actions
                actions += '<button class="v-act v-act--gold' + (v.destacado ? ' v-act--active' : '') + '" data-action="toggleDestacado" data-id="' + v.id + '" title="' + (v.destacado ? 'Quitar destacado' : 'Destacar') + '"><i data-lucide="' + (v.destacado ? 'star' : 'star') + '"></i></button>';
                if (esVendido && !AP.isSuperAdmin()) {
                    actions += '<button class="v-act" disabled title="Solo Super Admin edita vendidos"><i data-lucide="pencil"></i></button>';
                    actions += '<span class="v-act-protected"><i data-lucide="shield-alert"></i>Protegido</span>';
                } else {
                    actions += '<button class="v-act v-act--success" data-action="editVehicle" data-id="' + v.id + '" title="Editar"><i data-lucide="pencil"></i></button>';
                    actions += '<button class="v-act v-act--info" data-action="duplicateVehicle" data-id="' + v.id + '" title="Duplicar"><i data-lucide="copy"></i></button>';
                }
                if (estado === 'disponible') {
                    actions += '<button class="v-act v-act--operation" data-action="markAsSold" data-id="' + v.id + '" title="Gestionar operacion"><i data-lucide="handshake"></i>Operacion</button>';
                }
            }
            if (AP.canDeleteInventory()) {
                // Separator before danger zone
                actions += '<span class="v-act-sep"></span>';
                // Group 3: Danger
                actions += '<button class="v-act v-act--danger" data-action="deleteVehicle" data-id="' + v.id + '" title="Eliminar"><i data-lucide="trash-2"></i></button>';
            }
            actions += '</div>';
            var origen = 'Propio';
            if (v.concesionario && v.concesionario !== '' && v.concesionario !== '_particular') {
                var dealer = AP.dealers.find(function(x) { return x._docId === v.concesionario; });
                origen = dealer ? dealer.nombre : v.concesionario;
            } else if (v.concesionario === '_particular' && v.consignaParticular) {
                origen = 'Consigna: ' + v.consignaParticular;
            }

            var prio = v.prioridad || 0;
            var barPct = maxPrio > 0 ? Math.round((prio / maxPrio) * 100) : 0;
            var barColor = prio === 0 ? '#333' : prio >= 70 ? '#b89658' : prio >= 30 ? '#f59e0b' : '#6b7280';

            var dragCell = _reorderMode ? '<td class="col-drag" style="cursor:grab;text-align:center;color:var(--admin-text-muted);" title="Arrastra para reordenar"><i data-lucide="grip-vertical" style="width:16px;height:16px;"></i></td>' : '';
            var posCell = _reorderMode ? '<td class="col-pos" style="min-width:70px;">' +
                '<div style="display:flex;align-items:center;gap:6px;">' +
                    '<span style="font-weight:700;font-size:0.8rem;min-width:22px;color:' + (prio > 0 ? '#b89658' : 'var(--admin-text-muted)') + ';">' + prio + '</span>' +
                    '<div style="flex:1;height:6px;background:#1e1e1e;border-radius:3px;overflow:hidden;min-width:30px;">' +
                        '<div style="height:100%;width:' + barPct + '%;background:' + barColor + ';border-radius:3px;transition:width 0.3s;"></div>' +
                    '</div>' +
                '</div>' +
            '</td>' : '';

            html += '<tr data-vehicle-id="' + v.id + '"' + (_reorderMode ? ' draggable="true"' : '') + '>' +
                '<td><input type="checkbox" class="vehicle-cb" data-vid="' + v.id + '"></td>' +
                dragCell +
                '<td><code style="font-size:0.75rem;color:var(--admin-accent,#58a6ff);">' + AP.escapeHtml(v.codigoUnico || '—') + '</code></td>' +
                '<td><img class="vehicle-thumb" src="' + (v.imagen || 'multimedia/vehicles/placeholder-car.jpg') + '" alt="" loading="lazy" onerror="this.src=\'multimedia/vehicles/placeholder-car.jpg\'"></td>' +
                '<td><strong>' + (v.marca || '').charAt(0).toUpperCase() + (v.marca || '').slice(1) + ' ' + (v.modelo || '') + '</strong><br><small style="color:#8b949e">' + v.year + ' &middot; ' + (v.categoria || '') + '</small>' +
                (v.createdByName || v.createdBy ? '<br><small style="color:#6e7681;font-size:0.65rem;" title="Creado ' + (v.createdAt ? AP.timeAgo(v.createdAt) : '') + '">Creado por: ' + AP.escapeHtml(v.createdByName || v.createdBy || '') + '</small>' : '') +
                (v.lastModifiedByName && v.lastModifiedBy !== v.createdBy ? '<br><small style="color:#d4af37;font-size:0.65rem;" title="' + (v.lastModifiedAt || '') + '">Mod: ' + AP.escapeHtml(v.lastModifiedByName) + ' ' + (v.lastModifiedAt ? AP.timeAgo(v.lastModifiedAt) : '') + '</small>' : '') +
                '</td>' +
                '<td><span class="badge badge-' + v.tipo + '">' + v.tipo + '</span></td>' +
                '<td>' + AP.formatPrice(v.precio) + (v.precioOferta ? '<br><small style="color: var(--admin-warning);">' + AP.formatPrice(v.precioOferta) + '</small>' : '') + '</td>' +
                '<td>' + estadoBadge + '</td>' +
                posCell +
                '<td><small style="color:var(--admin-text-secondary);">' + AP.escapeHtml(origen) + '</small></td>' +
                '<td>' + actions + '</td>' +
            '</tr>';
        });
        if (!html) html = '<tr><td colspan="' + colCount + '" style="text-align:center; padding:2rem; color:#8b949e;">No se encontraron vehiculos</td></tr>';
        $('vehiclesTableBody').innerHTML = html;

        // Update sort indicators in headers
        document.querySelectorAll('#vehiclesTable th[data-sort]').forEach(function(th) {
            var col = th.getAttribute('data-sort');
            var si = th.querySelector('.sort-icon'); if (si) si.remove(); var text = th.textContent.trim();
            th.innerHTML = text + ' ' + (AP.getSortIndicator ? AP.getSortIndicator('vehicles', col) : '');
        });

        // Render pagination
        if (!_reorderMode && AP.renderPagination) {
            AP.renderPagination('vehiclesPagination', 'vehicles', totalFiltered);
        } else {
            // Clear pagination UI in reorder mode
            var pagEl = $('vehiclesPagination');
            if (pagEl) pagEl.innerHTML = '';
        }

        // Update vehicle count
        var countEl = $('vehiclesCount');
        if (countEl) countEl.textContent = totalFiltered + ' vehiculo' + (totalFiltered !== 1 ? 's' : '');

        AP.refreshIcons();
        if (_reorderMode) initTableDragDrop();
    }

    // ========== REORDER MODE TOGGLE ==========
    function toggleReorderMode() {
        if (!AP.canCreateOrEditInventory()) {
            AP.toast('No tienes permisos para reordenar vehiculos', 'error');
            return;
        }
        _reorderMode = !_reorderMode;
        // Reset pagination to page 1 when toggling reorder mode
        if (AP._pagination && AP._pagination.vehicles) {
            AP._pagination.vehicles.page = 1;
        }
        var btn = $('toggleReorderMode');
        if (btn) {
            btn.classList.toggle('active', _reorderMode);
            btn.style.background = _reorderMode ? 'rgba(184,150,88,0.15)' : '';
            btn.style.borderColor = _reorderMode ? '#b89658' : '';
            btn.style.color = _reorderMode ? '#b89658' : '';
        }

        // Toggle column visibility
        document.querySelectorAll('.col-drag, .col-pos').forEach(function(el) {
            el.style.display = _reorderMode ? '' : 'none';
        });

        renderVehiclesTable($('vehicleSearch').value);

        if (_reorderMode) {
            AP.toast('Modo reordenar activo — arrastra filas para cambiar posicion', 'info');
        }
    }

    var toggleBtn = $('toggleReorderMode');
    if (toggleBtn) toggleBtn.addEventListener('click', toggleReorderMode);

    // ========== TABLE DRAG & DROP ==========
    function initTableDragDrop() {
        var tbody = $('vehiclesTableBody');
        if (!tbody) return;
        var rows = tbody.querySelectorAll('tr[draggable="true"]');

        rows.forEach(function(row) {
            row.addEventListener('dragstart', function(e) {
                _dragSrcRow = this;
                this.style.opacity = '0.4';
                this.style.background = 'rgba(184,150,88,0.1)';
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/plain', this.getAttribute('data-vehicle-id'));
            });

            row.addEventListener('dragend', function() {
                this.style.opacity = '';
                this.style.background = '';
                tbody.querySelectorAll('tr').forEach(function(r) {
                    r.classList.remove('drag-over-top', 'drag-over-bottom');
                });
            });

            row.addEventListener('dragover', function(e) {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                if (this === _dragSrcRow) return;

                // Show indicator above or below
                var rect = this.getBoundingClientRect();
                var midY = rect.top + rect.height / 2;
                tbody.querySelectorAll('tr').forEach(function(r) {
                    r.classList.remove('drag-over-top', 'drag-over-bottom');
                });
                if (e.clientY < midY) {
                    this.classList.add('drag-over-top');
                } else {
                    this.classList.add('drag-over-bottom');
                }
            });

            row.addEventListener('dragleave', function() {
                this.classList.remove('drag-over-top', 'drag-over-bottom');
            });

            row.addEventListener('drop', function(e) {
                e.preventDefault();
                this.classList.remove('drag-over-top', 'drag-over-bottom');
                if (this === _dragSrcRow || !_dragSrcRow) return;

                var srcId = parseInt(_dragSrcRow.getAttribute('data-vehicle-id'), 10);
                var targetId = parseInt(this.getAttribute('data-vehicle-id'), 10);
                handlePrioritySwap(srcId, targetId);
                _dragSrcRow = null;
            });
        });
    }

    // ========== PRIORITY SWAP / COLLISION DETECTION ==========
    function handlePrioritySwap(srcId, targetId) {
        var srcVehicle = AP.vehicles.find(function(v) { return v.id === srcId; });
        var targetVehicle = AP.vehicles.find(function(v) { return v.id === targetId; });
        if (!srcVehicle || !targetVehicle) return;

        var srcPrio = srcVehicle.prioridad || 0;
        var targetPrio = targetVehicle.prioridad || 0;

        // Swap priorities
        var newSrcPrio = targetPrio;
        var newTargetPrio = srcPrio;

        // If both are 0, assign sequential values based on position
        if (srcPrio === 0 && targetPrio === 0) {
            newSrcPrio = 10;
            newTargetPrio = 5;
        }

        // Check for collisions with other vehicles
        var collision = AP.vehicles.find(function(v) {
            return v.id !== srcId && v.id !== targetId && (v.prioridad || 0) === newSrcPrio && newSrcPrio > 0;
        });

        if (collision) {
            // Offer resolution
            var confirm = window.confirm(
                'Colision de posicion detectada:\n\n' +
                '• ' + (srcVehicle.marca || '') + ' ' + (srcVehicle.modelo || '') + ' → posicion ' + newSrcPrio + '\n' +
                '• ' + (collision.marca || '') + ' ' + (collision.modelo || '') + ' ya tiene posicion ' + newSrcPrio + '\n\n' +
                '¿Desplazar automaticamente el vehiculo en conflicto?'
            );
            if (confirm) {
                // Shift conflicting vehicle down by 1
                var shiftedPrio = newSrcPrio + 1;
                savePriorityToFirestore(collision.id, shiftedPrio);
            }
        }

        // Save both vehicles
        var srcName = (srcVehicle.marca || '') + ' ' + (srcVehicle.modelo || '');
        var targetName = (targetVehicle.marca || '') + ' ' + (targetVehicle.modelo || '');

        Promise.all([
            savePriorityToFirestore(srcId, newSrcPrio),
            savePriorityToFirestore(targetId, newTargetPrio)
        ]).then(function() {
            AP.toast('Posiciones intercambiadas: ' + srcName + ' ↔ ' + targetName, 'success');
            AP.writeAuditLog('reordenar', 'vehiculo', srcName + ' (pos ' + newSrcPrio + ') ↔ ' + targetName + ' (pos ' + newTargetPrio + ')');
        }).catch(function(err) {
            AP.toast('Error al guardar posiciones: ' + err.message, 'error');
        });
    }

    function savePriorityToFirestore(vehicleId, priority) {
        var vehicle = AP.vehicles.find(function(v) { return v.id === vehicleId; });
        var currentVersion = vehicle ? (vehicle._version || 0) : 0;
        return window.db.collection('vehiculos').doc(String(vehicleId)).update({
            prioridad: priority,
            updatedAt: new Date().toISOString(),
            _version: currentVersion + 1
        });
    }

    // F9.1: Debounced vehicle search (300ms)
    $('vehicleSearch').addEventListener('input', function() {
        var val = this.value;
        clearTimeout(_searchTimer);
        _searchTimer = setTimeout(function() {
            if (AP._pagination) AP._pagination.vehicles.page = 1;
            renderVehiclesTable(val);
        }, 300);
    });

    // F8.5: Advanced filter listeners
    var fEstado = $('vehicleFilterEstado');
    if (fEstado) fEstado.addEventListener('change', function() {
        if (AP._pagination) AP._pagination.vehicles.page = 1;
        renderVehiclesTable($('vehicleSearch').value);
    });
    var fDealer = $('vehicleFilterDealer');
    if (fDealer) fDealer.addEventListener('change', function() {
        if (AP._pagination) AP._pagination.vehicles.page = 1;
        renderVehiclesTable($('vehicleSearch').value);
    });

    // F8.5: Populate dealer filter when vehicles load
    AP._populateVehicleFilters = function() {
        var sel = $('vehicleFilterDealer');
        if (!sel) return;
        var dealers = {};
        AP.vehicles.forEach(function(v) {
            if (v.concesionario) dealers[v.concesionario] = true;
        });
        var opts = '<option value="">Concesionario</option>';
        Object.keys(dealers).sort().forEach(function(d) {
            var name = (AP.dealers && AP.dealers.find(function(dl) { return dl.id === d; }));
            var label = name ? (name.nombre || d) : d;
            opts += '<option value="' + AP.escapeHtml(d) + '">' + AP.escapeHtml(label) + '</option>';
        });
        sel.innerHTML = opts;
    };

    // ========== VEHICLE MODAL ==========
    function openModal() {
        document.querySelectorAll('#vehicleForm .form-section-body').forEach(function(body) { body.classList.add('open'); });
        document.querySelectorAll('#vehicleForm .form-section-title').forEach(function(title) { title.classList.remove('collapsed'); });
        clearValidationErrors();
        $('vehicleModal').classList.add('active');
    }

    /* ── Contador unico de destacados (= banner) ── */
    function updateFeaturedCounter() {
        var counter = $('featuredCounter');
        if (!counter) return;
        var editId = $('vId').value ? parseInt($('vId').value, 10) : null;
        var count = AP.vehicles.filter(function(v) { return v.destacado && v.id !== editId; }).length;
        counter.textContent = '(' + count + '/6)';
        counter.style.color = count >= 6 ? '#ef4444' : '#b89658';
    }

    /* ── Toggle 2-estados: Normal / Destacado ── */
    function syncDestaqueFromRadio(value) {
        var isDestacado = (value === 'destacado');
        var destEl = $('vDestacado');
        var fwEl   = $('vFeaturedWeek');
        if (destEl) destEl.checked = isDestacado;
        if (fwEl)   fwEl.checked   = isDestacado;

        /* Estilo visual del nuevo toggle button */
        var toggleBtn = $('destacadoToggleBtn');
        var starEl    = $('destacadoStar');
        if (toggleBtn) {
            toggleBtn.style.borderColor = isDestacado ? 'rgba(212,175,55,0.7)' : 'var(--admin-border,#30363d)';
            toggleBtn.style.background  = isDestacado ? 'rgba(212,175,55,0.08)' : '';
        }
        if (starEl) {
            starEl.innerHTML = '<i data-lucide="star" style="width:20px;height:20px;color:' + (isDestacado ? '#d4af37' : 'var(--admin-text-muted)') + ';' + (isDestacado ? 'fill:#d4af37;' : '') + '"></i>';
            AP.refreshIcons();
        }

        /* Mostrar/ocultar campos de banner inline */
        var secBanner = $('sec-banner');
        if (secBanner) secBanner.style.display = isDestacado ? '' : 'none';

        updateFeaturedCounter();
    }

    /* Lee el flag canónico destacado y aplica el estado del toggle */
    function setDestaqueRadio(destacado) {
        var val   = destacado ? 'destacado' : 'normal';
        var radio = document.querySelector('input[name="vDestaqueNivel"][value="' + val + '"]');
        if (radio) radio.checked = true;
        syncDestaqueFromRadio(val);
    }

    function formHasData() { return !!($('vMarca').value || $('vModelo').value || $('vPrecio').value); }

    function clearValidationErrors() {
        document.querySelectorAll('.field-error').forEach(function(el) { el.classList.remove('field-error'); });
        document.querySelectorAll('.field-error-msg').forEach(function(el) { el.remove(); });
        document.querySelectorAll('.form-section.has-errors').forEach(function(el) { el.classList.remove('has-errors'); });
    }

    function validateAndHighlightFields() {
        clearValidationErrors();
        var requiredFields = $('vehicleForm').querySelectorAll('[required]');
        var firstErrorSection = null;
        var hasErrors = false;
        requiredFields.forEach(function(field) {
            if (!field.value || field.value.trim() === '') {
                hasErrors = true;
                field.classList.add('field-error');
                var msg = document.createElement('span');
                msg.className = 'field-error-msg';
                msg.textContent = 'Este campo es requerido';
                field.parentNode.appendChild(msg);
                var section = field.closest('.form-section');
                if (section) {
                    section.classList.add('has-errors');
                    var body = section.querySelector('.form-section-body');
                    var title = section.querySelector('.form-section-title');
                    if (body && !body.classList.contains('open')) { body.classList.add('open'); if (title) title.classList.remove('collapsed'); }
                    if (!firstErrorSection) firstErrorSection = section;
                }
                field.addEventListener('input', function handler() {
                    this.classList.remove('field-error');
                    var errMsg = this.parentNode.querySelector('.field-error-msg');
                    if (errMsg) errMsg.remove();
                    var sec = this.closest('.form-section');
                    if (sec && !sec.querySelector('.field-error')) sec.classList.remove('has-errors');
                    this.removeEventListener('input', handler);
                }, { once: true });
            }
        });
        if (firstErrorSection) firstErrorSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return !hasErrors;
    }

    function closeModalFn(force) {
        if (!force && formHasData()) {
            var action = confirm('Tienes datos sin guardar. ¿Deseas guardar como borrador antes de cerrar?');
            if (action) { saveDraftToFirestore(true).then(function() { doCloseModal(); }); return; }
        }
        doCloseModal();
    }

    function doCloseModal() {
        clearValidationErrors();
        $('vehicleModal').classList.remove('active');
        $('vehicleForm').reset();
        $('vId').value = '';
        AP.uploadedImageUrls = [];
        $('uploadedImages').innerHTML = '';
        $('uploadProgress').style.display = 'none';
        $('uploadError').style.display = 'none';
        $('manualImageUrl').value = '';
        $('featuresPreview').innerHTML = '';
        document.querySelectorAll('.feat-checkboxes input[type="checkbox"]').forEach(function(cb) { cb.checked = false; });
        stopDraftAutoSave();
        _originalSnapshot = null;
        _lastSavedSnapshot = null;
    }

    // ========== DRAFTS ==========

    // Fase 18: Original snapshot for smart dirty checking
    var _originalSnapshot = null;

    function getFormSnapshot() {
        return {
            vId: $('vId').value, vMarca: $('vMarca').value, vModelo: $('vModelo').value,
            vYear: $('vYear').value, vTipo: $('vTipo').value, vCategoria: $('vCategoria').value,
            vPrecio: $('vPrecio').value, vPrecioOferta: $('vPrecioOferta').value, vKm: $('vKm').value,
            vTransmision: $('vTransmision').value, vCombustible: $('vCombustible').value,
            vMotor: $('vMotor').value, vPotencia: $('vPotencia').value, vCilindraje: $('vCilindraje').value,
            vTraccion: $('vTraccion').value, vDireccion: $('vDireccion').value, vColor: $('vColor').value,
            vPuertas: $('vPuertas').value, vPasajeros: $('vPasajeros').value, vUbicacion: $('vUbicacion').value,
            vPlaca: $('vPlaca').value, vFasecolda: $('vFasecolda').value, vDescripcion: $('vDescripcion').value,
            vEstado: $('vEstado').value, vDestacado: $('vDestacado').checked, vOferta: $('vOferta').checked,
            vRevision: $('vRevision').checked, vPeritaje: $('vPeritaje').checked,
            vPrioridad: $('vPrioridad').value, vCaracteristicas: $('vCaracteristicas').value,
            vFeaturedWeek: $('vFeaturedWeek') ? $('vFeaturedWeek').checked : false,
            vFeaturedOrder: $('vFeaturedOrder') ? $('vFeaturedOrder').value : '',
            vFeaturedCutoutPng: $('vFeaturedCutoutPng') ? $('vFeaturedCutoutPng').value : '',
            _images: AP.uploadedImageUrls.slice(), _savedAt: new Date().toISOString()
        };
    }

    // Fase 18: Compare two snapshots ignoring _savedAt
    function snapshotsAreDifferent(a, b) {
        if (!a || !b) return true;
        var keys = Object.keys(a).filter(function(k) { return k !== '_savedAt' && k !== '_userId' && k !== '_userEmail'; });
        for (var i = 0; i < keys.length; i++) {
            var k = keys[i];
            if (k === '_images') {
                var ai = (a._images || []).join(',');
                var bi = (b._images || []).join(',');
                if (ai !== bi) return true;
            } else if (String(a[k] || '') !== String(b[k] || '')) {
                return true;
            }
        }
        return false;
    }

    function captureOriginalSnapshot() {
        _originalSnapshot = getFormSnapshot();
    }

    function restoreFormSnapshot(snap) {
        var fields = ['vMarca','vModelo','vYear','vTipo','vCategoria','vPrecio','vPrecioOferta','vKm','vTransmision','vCombustible','vMotor','vPotencia','vCilindraje','vTraccion','vDireccion','vColor','vPuertas','vPasajeros','vUbicacion','vPlaca','vFasecolda','vDescripcion','vEstado','vPrioridad','vCaracteristicas'];
        fields.forEach(function(f) { if ($(f) && snap[f] !== undefined) $(f).value = snap[f]; });
        if (snap.vId) $('vId').value = snap.vId;
        $('vDestacado').checked = !!snap.vDestacado;
        $('vOferta').checked = !!snap.vOferta;
        $('vRevision').checked = snap.vRevision !== false;
        $('vPeritaje').checked = snap.vPeritaje !== false;
        if ($('vFeaturedWeek'))    $('vFeaturedWeek').checked = !!snap.vFeaturedWeek;
        if ($('vFeaturedOrder'))   $('vFeaturedOrder').value  = snap.vFeaturedOrder  || '';
        if ($('vFeaturedCutoutPng')) $('vFeaturedCutoutPng').value = snap.vFeaturedCutoutPng || '';
        renderCutoutPreview(snap.vFeaturedCutoutPng || '');
        if (snap._images && snap._images.length) { AP.uploadedImageUrls = snap._images.slice(); renderUploadedImages(); }
        setDestaqueRadio(!!snap.vDestacado);
    }

    function getDraftDocRef() {
        if (!window.auth || !window.auth.currentUser || !window.db) return null;
        return window.db.collection('usuarios').doc(window.auth.currentUser.uid).collection('drafts').doc('vehicleDraft');
    }

    function snapshotHasAnyData(snap) {
        var checkFields = ['vMarca','vModelo','vYear','vTipo','vCategoria','vPrecio','vKm','vTransmision','vCombustible','vMotor','vColor','vDescripcion'];
        for (var i = 0; i < checkFields.length; i++) { if (snap[checkFields[i]]) return true; }
        if (snap._images && snap._images.length > 0) return true;
        return false;
    }

    function saveDraftToFirestore(showToast) {
        var ref = getDraftDocRef();
        if (!ref) { if (showToast) AP.toast('No se pudo acceder al almacenamiento de borradores', 'error'); return Promise.resolve(); }
        var snap = getFormSnapshot();
        if (!snapshotHasAnyData(snap)) { if (showToast) AP.toast('No hay datos para guardar como borrador', 'info'); return Promise.resolve(); }

        // Fase 18: Smart dirty check — skip save if nothing changed
        if (!showToast && _originalSnapshot && !snapshotsAreDifferent(snap, _lastSavedSnapshot || _originalSnapshot)) {
            return Promise.resolve();
        }

        snap._userId = window.auth.currentUser.uid;
        snap._userEmail = window.auth.currentUser.email;
        return ref.set(snap).then(function() {
            _lastSavedSnapshot = snap;
            if (showToast) AP.toast('Borrador guardado correctamente');
            showDraftIndicator();
            // Fase 18: Update shared drafts collection for visibility
            updateSharedDraft(snap);
        }).catch(function(err) {
            if (showToast) AP.toast('Error al guardar borrador: ' + (err.code === 'permission-denied' ? 'Sin permisos.' : err.message), 'error');
        });
    }

    // Fase 18: Track last saved snapshot to avoid redundant writes
    var _lastSavedSnapshot = null;

    function clearDraftFromFirestore() {
        var ref = getDraftDocRef();
        _lastSavedSnapshot = null;
        if (!ref) return Promise.resolve();
        clearSharedDraft();
        return ref.delete().catch(function() {});
    }

    // Fase 18: Shared drafts visible to all admins
    function getSharedDraftRef() {
        if (!window.auth || !window.auth.currentUser || !window.db) return null;
        return window.db.collection('drafts_activos').doc(window.auth.currentUser.uid);
    }

    function updateSharedDraft(snap) {
        var ref = getSharedDraftRef();
        if (!ref) return;
        ref.set({
            userId: window.auth.currentUser.uid,
            userEmail: window.auth.currentUser.email || '',
            marca: snap.vMarca || '',
            modelo: snap.vModelo || '',
            year: snap.vYear || '',
            vehicleId: snap.vId || '',
            lastSaved: new Date().toISOString()
        }).catch(function() { /* silent — rules may not allow */ });
    }

    function clearSharedDraft() {
        var ref = getSharedDraftRef();
        if (!ref) return;
        ref.delete().catch(function() {});
    }

    // Fase 18: Visual indicator when draft is saved
    function showDraftIndicator() {
        var el = $('draftSaveIndicator');
        if (!el) return;
        el.textContent = 'Borrador guardado';
        el.classList.add('visible');
        clearTimeout(el._timeout);
        el._timeout = setTimeout(function() { el.classList.remove('visible'); }, 2500);
    }

    function stopDraftAutoSave() { if (AP.draftInterval) { clearInterval(AP.draftInterval); AP.draftInterval = null; } }

    function startDraftAutoSave() {
        stopDraftAutoSave();
        AP.draftInterval = setInterval(function() { saveDraftToFirestore(false); }, 10000);
    }

    function checkForDraft() {
        var ref = getDraftDocRef();
        if (!ref) return Promise.resolve(false);
        return ref.get().then(function(doc) {
            if (!doc.exists) return false;
            var snap = doc.data();
            if (!snapshotHasAnyData(snap)) return false;
            var savedAt = snap._savedAt ? AP.formatTimeAgo(snap._savedAt) : '';
            var label = (snap.vMarca || '') + ' ' + (snap.vModelo || '') + ' ' + (snap.vYear || '');
            if (confirm('Tienes un borrador guardado: ' + label.trim() + ' (' + savedAt + '). ¿Deseas recuperarlo?')) {
                restoreFormSnapshot(snap);
                return true;
            } else { clearDraftFromFirestore(); return false; }
        }).catch(function() { return false; });
    }

    // ========== MODAL EVENT LISTENERS ==========
    $('btnAddVehicle').addEventListener('click', function() {
        if (!AP.canCreateOrEditInventory()) { AP.toast('No tienes permisos para crear vehiculos', 'error'); return; }
        $('modalTitle').textContent = 'Agregar Vehiculo';
        $('vId').value = '';
        $('vCodigoUnico').value = '';
        $('codigoUnicoDisplay').style.display = 'none';
        $('vehicleForm').reset();
        $('vUbicacion').value = 'Cartagena';
        $('vDireccion').value = 'Electrica';
        $('vEstado').value = 'disponible';
        $('vRevision').checked = true;
        $('vPeritaje').checked = true;
        AP.uploadedImageUrls = [];
        $('uploadedImages').innerHTML = '';
        $('uploadError').style.display = 'none';
        setDestaqueRadio(false);
        checkForDraft().then(function() { captureOriginalSnapshot(); startDraftAutoSave(); openModal(); });
    });

    $('closeModal').addEventListener('click', function() { closeModalFn(); });
    $('cancelModal').addEventListener('click', function() { closeModalFn(); });
    var saveDraftBtn = $('saveDraftBtn');
    if (saveDraftBtn) saveDraftBtn.addEventListener('click', function() { saveDraftToFirestore(true); });
    $('vehicleForm').addEventListener('submit', function(e) { e.preventDefault(); });
    $('vehicleForm').addEventListener('keydown', function(e) { if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') e.preventDefault(); });

    // ========== EDIT VEHICLE ==========
    function editVehicle(id) {
        if (!AP.canCreateOrEditInventory()) { AP.toast('No tienes permisos para editar vehiculos', 'error'); return; }
        var v = AP.vehicles.find(function(x) { return x.id === id; });
        if (!v) return;

        // Fase 22: Proteccion vehiculos vendidos
        if (v.estado === 'vendido' && !AP.isSuperAdmin()) {
            AP.toast('Este vehiculo esta vendido. Solo Super Admin puede editarlo.', 'error');
            return;
        }

        var codeDisplay = v.codigoUnico || '—';
        $('modalTitle').textContent = 'Editar Vehiculo ' + (v.codigoUnico || '#' + id);
        $('vId').value = v.id;
        $('vCodigoUnico').value = v.codigoUnico || '';
        if (v.codigoUnico) {
            $('codigoUnicoValue').textContent = v.codigoUnico;
            $('codigoUnicoDisplay').style.display = 'block';
        } else {
            $('codigoUnicoDisplay').style.display = 'none';
        }
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
        $('vUbicacion').value = v.ubicacion || 'Cartagena';
        $('vPlaca').value = v.placa || '';
        $('vFasecolda').value = v.codigoFasecolda || '';
        $('vDescripcion').value = v.descripcion || '';
        $('vEstado').value = v.estado || 'disponible';
        $('vDestacado').checked = !!v.destacado;
        $('vOferta').checked = !!(v.oferta || v.precioOferta);
        if ($('vFeaturedWeek'))    $('vFeaturedWeek').checked = !!v.destacado;
        if ($('vFeaturedOrder'))   $('vFeaturedOrder').value  = v.featuredOrder  || '';
        if ($('vFeaturedCutoutPng')) $('vFeaturedCutoutPng').value = v.featuredCutoutPng || '';
        renderCutoutPreview(v.featuredCutoutPng || '');
        $('vRevision').checked = v.revisionTecnica !== false;
        $('vPeritaje').checked = v.peritaje !== false;
        $('vPrioridad').value = v.prioridad || 0;

        // Fase 22: Visual protection for sold vehicles
        var estadoSelect = $('vEstado');
        var soldWarning = document.getElementById('soldProtectionWarning');
        if (soldWarning) soldWarning.remove();
        estadoSelect.disabled = false;
        estadoSelect.style.opacity = '';
        if (v.estado === 'vendido') {
            if (AP.isSuperAdmin()) {
                // Super admin can edit but show warning
                var warn = document.createElement('div');
                warn.id = 'soldProtectionWarning';
                warn.style.cssText = 'background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);border-radius:6px;padding:8px 12px;margin-top:8px;font-size:0.8rem;color:#ef4444;';
                warn.innerHTML = '<strong>VEHICULO VENDIDO</strong> — Estas editando un vehiculo vendido. Cambiar el estado revertira la venta.';
                estadoSelect.parentNode.appendChild(warn);
            } else {
                estadoSelect.disabled = true;
                estadoSelect.style.opacity = '0.5';
            }
        }

        loadFeaturesIntoForm(v.caracteristicas || []);

        if ($('vConcesionario')) {
            if (window.DynamicLists) {
                window.DynamicLists.populateConcesionarioSelect($('vConcesionario'));
                setTimeout(function() {
                    $('vConcesionario').value = v.concesionario || '';
                    toggleConsignaField();
                    if (v.consignaParticular && $('vConsignaParticular')) $('vConsignaParticular').value = v.consignaParticular;
                }, 300);
            } else {
                $('vConcesionario').value = v.concesionario || '';
            }
        }

        AP.uploadedImageUrls = (v.imagenes && v.imagenes.length) ? v.imagenes.slice() : (v.imagen ? [v.imagen] : []);
        renderUploadedImages();
        $('uploadError').style.display = 'none';
        setDestaqueRadio(!!v.destacado);
        captureOriginalSnapshot();
        startDraftAutoSave();
        openModal();
    }

    // F10.3: Duplicate vehicle
    function duplicateVehicle(id) {
        if (!AP.canCreateOrEditInventory()) { AP.toast('No tienes permisos', 'error'); return; }
        var v = AP.vehicles.find(function(x) { return x.id === id; });
        if (!v) return;
        editVehicle(id);
        // After modal opens, clear identity fields to create new
        setTimeout(function() {
            $('vId').value = '';
            $('vCodigoUnico').value = '';
            $('codigoUnicoDisplay').style.display = 'none';
            $('vPlaca').value = '';
            $('vEstado').value = 'disponible';
            $('vEstado').disabled = false;
            $('vPrioridad').value = 0;
            $('modalTitle').textContent = 'Duplicar Vehiculo (copia de ' + (v.codigoUnico || '#' + id) + ')';
            AP.toast('Vehiculo duplicado. Modifica los datos y guarda.', 'info');
        }, 350);
    }

    // ========== FEATURES ==========
    function collectAllFeatures() {
        var features = [];
        document.querySelectorAll('.feat-checkboxes input[type="checkbox"]:checked').forEach(function(cb) {
            if (cb.value && features.indexOf(cb.value) === -1) features.push(cb.value);
        });
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
        document.querySelectorAll('.feat-checkboxes input[type="checkbox"]').forEach(function(cb) { cb.checked = false; });
        var uncategorized = [];
        caracteristicas.forEach(function(feat) {
            var found = false;
            document.querySelectorAll('.feat-checkboxes input[type="checkbox"]').forEach(function(cb) { if (cb.value === feat) { cb.checked = true; found = true; } });
            if (!found) uncategorized.push(feat);
        });
        if ($('vCaracteristicas')) $('vCaracteristicas').value = uncategorized.join('\n');
    }

    // ========== BUILD & SAVE ==========
    function buildVehicleData(id, codigoUnico, isNew) {
        var precioOferta = $('vPrecioOferta').value ? parseInt($('vPrecioOferta').value, 10) : null;
        var auditUser = getAuditUser();
        var userEmail = auditUser.email;
        var vehicleData = {
            id: id, codigoUnico: codigoUnico || $('vCodigoUnico').value || '',
            marca: $('vMarca').value, modelo: $('vModelo').value.trim(),
            year: parseInt($('vYear').value, 10), tipo: $('vTipo').value, categoria: $('vCategoria').value,
            precio: parseInt($('vPrecio').value, 10), precioOferta: precioOferta, oferta: !!precioOferta,
            kilometraje: parseInt($('vKm').value, 10) || 0, transmision: $('vTransmision').value,
            combustible: $('vCombustible').value, motor: $('vMotor').value || '',
            potencia: $('vPotencia').value || '', cilindraje: $('vCilindraje').value || '',
            traccion: $('vTraccion').value || '', direccion: $('vDireccion').value || 'Electrica',
            color: AP.toTitleCase($('vColor').value), puertas: parseInt($('vPuertas').value, 10) || 5,
            pasajeros: parseInt($('vPasajeros').value, 10) || 5, asientos: parseInt($('vPasajeros').value, 10) || 5,
            ubicacion: $('vUbicacion').value || 'Cartagena', placa: $('vPlaca').value || 'Disponible al contactar',
            codigoFasecolda: $('vFasecolda').value || 'Consultar',
            revisionTecnica: $('vRevision').checked, peritaje: $('vPeritaje').checked,
            descripcion: $('vDescripcion').value || '', estado: $('vEstado').value || 'disponible',
            destacado: $('vDestacado').checked,
            featuredWeek: $('vDestacado').checked, /* siempre igual a destacado — campo legacy */
            prioridad: (function() { var ex = AP.vehicles.find(function(v) { return v.id === id; }); return ex ? (ex.prioridad || 0) : 0; })(),
            featuredOrder: $('vFeaturedOrder') ? (parseInt($('vFeaturedOrder').value, 10) || null) : null,
            featuredCutoutPng: $('vFeaturedCutoutPng') ? ($('vFeaturedCutoutPng').value.trim() || null) : null,
            imagen: AP.uploadedImageUrls[0] || 'multimedia/vehicles/placeholder-car.jpg',
            imagenes: AP.uploadedImageUrls.length ? AP.uploadedImageUrls.slice() : ['multimedia/vehicles/placeholder-car.jpg'],
            caracteristicas: collectAllFeatures(),
            concesionario: $('vConcesionario') ? $('vConcesionario').value : '',
            consignaParticular: ($('vConcesionario') && $('vConcesionario').value === '_particular' && $('vConsignaParticular')) ? $('vConsignaParticular').value.trim() : '',
            updatedAt: new Date().toISOString(), updatedBy: userEmail,
            // Audit trail fields
            lastModifiedBy: auditUser.email,
            lastModifiedByName: auditUser.name,
            lastModifiedAt: new Date().toISOString()
        };
        if (vehicleData.imagen && vehicleData.imagenes.indexOf(vehicleData.imagen) === -1) vehicleData.imagenes.unshift(vehicleData.imagen);
        // Set createdBy only on new vehicles (preserve original creator on edits)
        if (isNew) {
            vehicleData.createdBy = auditUser.email;
            vehicleData.createdByName = auditUser.name;
            vehicleData.createdAt = new Date().toISOString();
        }
        return vehicleData;
    }

    function saveNewVehicle(vehicleData, candidateId, maxRetries) {
        if (maxRetries <= 0) return Promise.reject({ code: 'id-exhausted', message: 'No se pudo generar un ID unico.' });
        vehicleData.id = candidateId;
        var docRef = window.db.collection('vehiculos').doc(String(candidateId));
        return window.db.runTransaction(function(transaction) {
            return transaction.get(docRef).then(function(doc) {
                if (doc.exists) throw { code: 'id-collision', takenId: candidateId };
                vehicleData._version = 1;
                transaction.set(docRef, vehicleData);
            });
        }).catch(function(err) {
            if (err.code === 'id-collision') return saveNewVehicle(vehicleData, err.takenId + 1, maxRetries - 1);
            throw err;
        });
    }

    function saveExistingVehicle(vehicleData, id, expectedVersion) {
        var docRef = window.db.collection('vehiculos').doc(String(id));
        return window.db.runTransaction(function(transaction) {
            return transaction.get(docRef).then(function(doc) {
                if (!doc.exists) throw { code: 'not-found', message: 'El vehiculo #' + id + ' ya no existe en la base de datos.' };
                var currentVersion = doc.data()._version || 0;
                if (expectedVersion !== null && currentVersion !== expectedVersion) {
                    var lastEditor = doc.data().updatedBy || 'otro usuario';
                    throw { code: 'version-conflict', message: 'Este vehiculo fue modificado por ' + lastEditor + ' mientras lo editabas. Cierra el formulario y vuelve a abrirlo.' };
                }
                vehicleData._version = currentVersion + 1;
                transaction.update(docRef, vehicleData);
            });
        });
    }

    $('saveVehicle').addEventListener('click', function() {
        if (!AP.canCreateOrEditInventory()) { AP.toast('No tienes permisos', 'error'); return; }
        if (!validateAndHighlightFields()) { AP.toast('Completa los campos requeridos marcados en rojo', 'error'); return; }

        // Fase 22: Proteccion vehiculos vendidos en save
        var _editingId = $('vId').value ? parseInt($('vId').value, 10) : null;
        if (_editingId) {
            var _originalVehicle = AP.vehicles.find(function(v) { return v.id === _editingId; });
            if (_originalVehicle && _originalVehicle.estado === 'vendido' && !AP.isSuperAdmin()) {
                AP.toast('No puedes modificar un vehiculo vendido. Contacta al Super Admin.', 'error');
                return;
            }
            // Solo super_admin puede revertir estado vendido
            if (_originalVehicle && _originalVehicle.estado === 'vendido' && $('vEstado').value !== 'vendido' && !AP.isSuperAdmin()) {
                AP.toast('Solo Super Admin puede cambiar el estado de un vehiculo vendido.', 'error');
                return;
            }
        }
        // Prevenir que editores asignen estado vendido directamente (debe usar Gestionar Operacion)
        if ($('vEstado').value === 'vendido') {
            var _wasVendido = _editingId && AP.vehicles.find(function(v) { return v.id === _editingId && v.estado === 'vendido'; });
            if (!_wasVendido && !AP.isSuperAdmin()) {
                AP.toast('Para marcar como vendido usa "Gestionar Operacion". No se puede cambiar manualmente.', 'error');
                return;
            }
        }

        // Limitar maximo 6 vehiculos destacados (= banner)
        if ($('vDestacado').checked) {
            var editId = $('vId').value ? parseInt($('vId').value, 10) : null;
            var otherDestacados = AP.vehicles.filter(function(v) {
                return v.destacado && v.id !== editId;
            });
            if (otherDestacados.length >= 6) {
                AP.toast('Maximo 6 vehiculos destacados. Desmarca uno existente primero.', 'error');
                return;
            }

            // Detectar orden duplicado en banner
            var fwOrder = $('vFeaturedOrder') ? (parseInt($('vFeaturedOrder').value, 10) || null) : null;
            if (fwOrder !== null) {
                var orderConflict = otherDestacados.find(function(v) { return v.featuredOrder === fwOrder; });
                if (orderConflict) {
                    var conflictName = ((orderConflict.marca || '') + ' ' + (orderConflict.modelo || '')).trim();
                    AP.toast(
                        'La posicion ' + fwOrder + ' ya esta asignada a "' + conflictName + '". ' +
                        'Elige otra posicion (1-6) o deja el campo vacio para orden automatico.',
                        'error'
                    );
                    if ($('vFeaturedOrder')) $('vFeaturedOrder').classList.add('field-error');
                    return;
                }
            }
        }

        // F10.7: Duplicate plate detection
        var placa = ($('vPlaca').value || '').trim().toUpperCase();
        if (placa) {
            var editingId = $('vId').value ? parseInt($('vId').value, 10) : null;
            var placaDup = AP.vehicles.find(function(v) {
                return v.id !== editingId && (v.placa || '').trim().toUpperCase() === placa;
            });
            if (placaDup) {
                var dupName = (placaDup.marca || '') + ' ' + (placaDup.modelo || '') + ' (' + (placaDup.codigoUnico || '#' + placaDup.id) + ')';
                if (!confirm('La placa ' + placa + ' ya existe en: ' + dupName.trim() + '. ¿Deseas continuar de todos modos?')) return;
            }
        }

        // F10.8: Confirmation before save
        var existingId = $('vId').value;
        var isEdit = !!existingId;
        var marca = $('vMarca').value || '';
        var modelo = $('vModelo').value || '';
        var confirmMsg = isEdit
            ? '¿Confirmas guardar los cambios en ' + marca + ' ' + modelo + '?'
            : '¿Confirmas agregar el vehiculo ' + marca + ' ' + modelo + '?';
        if (!confirm(confirmMsg)) return;

        var btn = $('saveVehicle');
        btn.disabled = true;
        btn.innerHTML = '<span class="spinner"></span> Guardando...';

        var vehicleData, savePromise;
        if (isEdit) {
            var id = parseInt(existingId, 10);
            var editingVehicle = AP.vehicles.find(function(v) { return v.id === id; });
            var expectedVersion = editingVehicle ? (editingVehicle._version || 0) : null;
            vehicleData = buildVehicleData(id, null, false);
            // Preserve original creator from existing data
            if (editingVehicle) {
                if (editingVehicle.createdBy) vehicleData.createdBy = editingVehicle.createdBy;
                if (editingVehicle.createdByName) vehicleData.createdByName = editingVehicle.createdByName;
                if (editingVehicle.createdAt) vehicleData.createdAt = editingVehicle.createdAt;
            }
            savePromise = saveExistingVehicle(vehicleData, id, expectedVersion);
        } else {
            // Generate unique code atomically, then save vehicle
            var candidateId = getNextId();
            savePromise = generateUniqueCode().then(function(code) {
                vehicleData = buildVehicleData(candidateId, code, true);
                return saveNewVehicle(vehicleData, candidateId, 10);
            });
        }

        savePromise.then(function() {
            var label = (vehicleData.marca || '') + ' ' + (vehicleData.modelo || '') + ' ' + (vehicleData.year || '');
            var codeLabel = vehicleData.codigoUnico ? ' [' + vehicleData.codigoUnico + ']' : '';
            AP.writeAuditLog(isEdit ? 'vehicle_update' : 'vehicle_create', 'vehiculo #' + vehicleData.id + codeLabel, label.trim());
            // Per-vehicle audit log entry
            if (isEdit) {
                var oldData = AP.vehicles.find(function(v) { return v.id === parseInt(existingId, 10); });
                var changes = computeChanges(oldData, vehicleData);
                if (changes.length > 0) {
                    logVehicleAction(vehicleData.id, 'edited', changes);
                }
            } else {
                logVehicleAction(vehicleData.id, 'created', [{ field: '(nuevo)', from: null, to: label.trim() }]);
            }
            AP.toast(isEdit ? 'Vehiculo actualizado (v' + vehicleData._version + ')' : 'Vehiculo ' + vehicleData.codigoUnico + ' agregado');
            clearDraftFromFirestore();
            closeModalFn(true);
        }).catch(function(err) {
            if (err.code === 'version-conflict') AP.toast(err.message, 'error');
            else if (err.code === 'permission-denied') AP.toast('Sin permisos para esta accion. Verifica tu rol en Firestore y que las rules esten desplegadas.', 'error');
            else if (err.code === 'unavailable' || err.code === 'deadline-exceeded') AP.toast('Error de conexion. El cambio se guardara automaticamente cuando vuelva la red.', 'info');
            else if (err.code === 'not-found') AP.toast(err.message || 'Documento no encontrado.', 'error');
            else AP.toast('Error: ' + (err.message || err), 'error');
        }).finally(function() {
            btn.disabled = false;
            btn.textContent = 'Guardar Vehiculo';
        });
    });

    function getNextId() {
        if (AP.vehicles.length === 0) return 1;
        return Math.max.apply(null, AP.vehicles.map(function(v) { return v.id || 0; })) + 1;
    }

    // ========== DELETE VEHICLE ==========
    function deleteVehicleFn(id) {
        if (!AP.canDeleteInventory()) { AP.toast('Solo un Super Admin puede eliminar vehiculos', 'error'); return; }
        var v = AP.vehicles.find(function(x) { return x.id === id; });
        if (!v) return;
        AP.deleteTargetId = id;
        $('deleteVehicleName').textContent = (v.marca || '').charAt(0).toUpperCase() + (v.marca || '').slice(1) + ' ' + v.modelo + ' ' + v.year;
        $('deleteModal').classList.add('active');
    }

    $('closeDeleteModal').addEventListener('click', function() { $('deleteModal').classList.remove('active'); AP.deleteTargetId = null; });
    $('cancelDelete').addEventListener('click', function() { $('deleteModal').classList.remove('active'); AP.deleteTargetId = null; });
    $('confirmDelete').addEventListener('click', function() {
        if (!AP.deleteTargetId) return;
        if (!AP.canDeleteInventory()) { AP.toast('Sin permisos', 'error'); return; }
        var btn = $('confirmDelete');
        btn.disabled = true;
        btn.textContent = 'Eliminando...';
        var deletingId = AP.deleteTargetId;
        var deletingVehicle = AP.vehicles.find(function(v) { return v.id === deletingId; });
        var deleteLabel = deletingVehicle ? (deletingVehicle.marca + ' ' + deletingVehicle.modelo + ' ' + deletingVehicle.year) : '';
        // Log deletion BEFORE deleting (subcollection survives parent delete in Firestore)
        logVehicleAction(deletingId, 'deleted', [], { vehicleLabel: deleteLabel });
        window.db.collection('vehiculos').doc(String(AP.deleteTargetId)).delete().then(function() {
            AP.writeAuditLog('vehicle_delete', 'vehiculo #' + deletingId, deleteLabel);
            AP.toast('Vehiculo eliminado');
            $('deleteModal').classList.remove('active');
            AP.deleteTargetId = null;
            AP.loadData();
        }).catch(function(err) {
            if (err.code === 'permission-denied') AP.toast('Sin permisos para eliminar.', 'error');
            else AP.toast('Error: ' + err.message, 'error');
        }).finally(function() {
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
    uploadArea.addEventListener('drop', function(e) { e.preventDefault(); this.classList.remove('dragover'); if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files); });
    fileInput.addEventListener('change', function() { if (this.files.length) { handleFiles(this.files); this.value = ''; } });

    function showUploadError(msg) { var el = $('uploadError'); el.textContent = msg; el.style.display = 'block'; }

    function handleFiles(files) {
        if (!window.storage) { showUploadError('Firebase Storage no esta disponible. Usa la opcion de URL manual.'); return; }
        var fileArray = Array.from(files);
        var invalidType = fileArray.filter(function(f) { return AP.UPLOAD_CONFIG.allowedTypes.indexOf(f.type) === -1; });
        if (invalidType.length) { showUploadError('Formatos permitidos: JPG, PNG, WebP.'); return; }
        var maxBytes = AP.UPLOAD_CONFIG.maxFileSizeMB * 1024 * 1024;
        var oversized = fileArray.filter(function(f) { return f.size > maxBytes; });
        if (oversized.length) { showUploadError('Imagenes demasiado grandes (max 10MB).'); return; }
        $('uploadError').style.display = 'none';
        var total = fileArray.length, done = 0, errors = 0;
        $('uploadProgress').style.display = 'block';
        $('uploadStatus').textContent = 'Comprimiendo a WebP y subiendo 0 de ' + total + '...';
        $('progressFill').style.width = '0%';
        fileArray.forEach(function(file) {
            AP.compressImage(file).then(function(compressed) { return uploadFileToStorage(compressed); })
                .then(function(success) { done++; if (!success) errors++; updateUploadProgress(done, total, errors); })
                .catch(function() { done++; errors++; updateUploadProgress(done, total, errors); });
        });
    }

    function updateUploadProgress(done, total, errors) {
        var pct = Math.round((done / total) * 100);
        $('progressFill').style.width = pct + '%';
        $('uploadStatus').textContent = 'Subiendo ' + done + ' de ' + total + '...';
        if (done === total) {
            setTimeout(function() { $('uploadProgress').style.display = 'none'; }, 1000);
            if (errors === total) showUploadError('No se pudieron subir las imagenes.');
            else if (errors > 0) AP.toast((total - errors) + ' subida(s), ' + errors + ' error(es)', 'error');
            else AP.toast(total + ' imagen(es) subida(s)');
        }
    }

    function uploadFileToStorage(file) {
        return new Promise(function(resolve) {
            if (!window.storage) { resolve(false); return; }
            var timestamp = Date.now();
            var baseName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').replace(/\.[^.]+$/, '');
            var ext = (file.type === 'image/webp') ? 'webp' : (file.type === 'image/jpeg' ? 'jpg' : 'webp');
            var path = AP.UPLOAD_CONFIG.storagePath + timestamp + '_' + baseName + '.' + ext;
            try {
                var ref = window.storage.ref(path);
                ref.put(file).then(function(snapshot) { return snapshot.ref.getDownloadURL(); })
                    .then(function(url) { AP.uploadedImageUrls.push(url); renderUploadedImages(); resolve(true); })
                    .catch(function(err) { showUploadError('Error subiendo imagen: ' + (err.message || err.code)); resolve(false); });
            } catch (e) { resolve(false); }
        });
    }

    $('btnAddImageUrl').addEventListener('click', function() {
        var url = $('manualImageUrl').value.trim();
        if (!url) { AP.toast('Ingresa una URL', 'error'); return; }
        if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('multimedia/')) { AP.toast('URL no valida', 'error'); return; }
        AP.uploadedImageUrls.push(url);
        renderUploadedImages();
        $('manualImageUrl').value = '';
        AP.toast('Imagen agregada');
    });

    function renderUploadedImages() {
        var container = $('uploadedImages');
        var html = '';
        AP.uploadedImageUrls.forEach(function(url, i) {
            var isMain = (i === 0);
            html += '<div class="uploaded-img' + (isMain ? ' main-img' : '') + '" draggable="true" data-idx="' + i + '">' +
                '<div class="img-drag-handle" title="Arrastra para reordenar"><i data-lucide="grip-vertical" style="width:14px;height:14px;"></i></div>' +
                '<img src="' + url + '" alt="Foto ' + (i + 1) + '" onerror="this.style.opacity=\'0.3\'">' +
                (isMain ? '<span class="img-badge">PRINCIPAL</span>' : '<span class="img-badge img-badge-num">' + (i + 1) + '</span>') +
                '<button type="button" class="remove-img" data-action="removeImage" data-idx="' + i + '">&times;</button>' +
            '</div>';
        });
        container.innerHTML = html;
        AP.refreshIcons();
        $('vImagen').value = AP.uploadedImageUrls[0] || '';
        $('vImagenes').value = AP.uploadedImageUrls.join('\n');
        initImageDragDrop(container);
    }

    function removeImage(index) { AP.uploadedImageUrls.splice(index, 1); renderUploadedImages(); }

    function initImageDragDrop(container) {
        var items = container.querySelectorAll('.uploaded-img');
        items.forEach(function(item) {
            item.addEventListener('dragstart', function(e) { AP._dragSrcIdx = parseInt(this.getAttribute('data-idx'), 10); this.classList.add('dragging'); e.dataTransfer.effectAllowed = 'move'; });
            item.addEventListener('dragend', function() { this.classList.remove('dragging'); container.querySelectorAll('.uploaded-img').forEach(function(el) { el.classList.remove('drag-over'); }); });
            item.addEventListener('dragover', function(e) { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; this.classList.add('drag-over'); });
            item.addEventListener('dragleave', function() { this.classList.remove('drag-over'); });
            item.addEventListener('drop', function(e) {
                e.preventDefault(); this.classList.remove('drag-over');
                var targetIdx = parseInt(this.getAttribute('data-idx'), 10);
                if (AP._dragSrcIdx !== null && AP._dragSrcIdx !== targetIdx) {
                    var moved = AP.uploadedImageUrls.splice(AP._dragSrcIdx, 1)[0];
                    AP.uploadedImageUrls.splice(targetIdx, 0, moved);
                    renderUploadedImages();
                    AP.toast('Imagen reordenada', 'info');
                }
                AP._dragSrcIdx = null;
            });
        });
    }

    // ========== CUTOUT PNG UPLOAD ==========
    var cutoutFileInput = $('cutoutFileInput');
    if (cutoutFileInput) {
        cutoutFileInput.addEventListener('change', function() {
            if (this.files.length) { handleCutoutFile(this.files[0]); this.value = ''; }
        });
    }
    var cutoutUploadArea = $('cutoutUploadArea');
    if (cutoutUploadArea) {
        cutoutUploadArea.addEventListener('dragover', function(e) { e.preventDefault(); this.style.background = 'rgba(212,175,55,0.08)'; });
        cutoutUploadArea.addEventListener('dragleave', function() { this.style.background = 'rgba(212,175,55,0.03)'; });
        cutoutUploadArea.addEventListener('drop', function(e) {
            e.preventDefault(); this.style.background = 'rgba(212,175,55,0.03)';
            var f = e.dataTransfer.files[0];
            if (f) handleCutoutFile(f);
        });
    }

    function showCutoutError(msg) { var el = $('cutoutUploadError'); if (el) { el.textContent = msg; el.style.display = 'block'; } }

    function handleCutoutFile(file) {
        if (!window.storage) { showCutoutError('Firebase Storage no disponible. Usa la URL manual.'); return; }
        if (file.type !== 'image/png') { showCutoutError('Solo se admiten archivos PNG (para transparencia).'); return; }
        var maxBytes = 10 * 1024 * 1024;
        if (file.size > maxBytes) { showCutoutError('El archivo es demasiado grande (max 10 MB).'); return; }
        var errEl = $('cutoutUploadError'); if (errEl) errEl.style.display = 'none';
        var prog = $('cutoutUploadProgress');
        if (prog) { prog.style.display = 'block'; $('cutoutProgressFill').style.width = '0%'; $('cutoutUploadStatus').textContent = 'Subiendo cutout...'; }
        uploadCutoutToStorage(file);
    }

    function uploadCutoutToStorage(file) {
        if (!window.storage) { showCutoutError('Firebase Storage no disponible.'); return; }
        var timestamp = Date.now();
        var safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
        var path = 'cars/cutouts/' + timestamp + '_' + safeName;
        try {
            var ref = window.storage.ref(path);
            ref.put(file).then(function(snapshot) {
                $('cutoutProgressFill').style.width = '50%';
                return snapshot.ref.getDownloadURL();
            }).then(function(url) {
                $('cutoutProgressFill').style.width = '100%';
                $('cutoutUploadStatus').textContent = 'Subido correctamente';
                setTimeout(function() { var p = $('cutoutUploadProgress'); if (p) p.style.display = 'none'; }, 1200);
                var field = $('vFeaturedCutoutPng'); if (field) field.value = url;
                renderCutoutPreview(url);
                AP.toast('Cutout PNG subido');
            }).catch(function(err) {
                var p = $('cutoutUploadProgress'); if (p) p.style.display = 'none';
                showCutoutError('Error al subir: ' + (err.message || err.code));
            });
        } catch(e) { showCutoutError('Error inesperado al subir cutout.'); }
    }

    function renderCutoutPreview(url) {
        var area = $('cutoutPreviewArea');
        var img  = $('cutoutPreviewImg');
        if (!area || !img) return;
        // F7.5: Block dangerous protocols
        var trimmed = (url || '').trim().toLowerCase();
        if (trimmed && !trimmed.startsWith('http://') && !trimmed.startsWith('https://') && !trimmed.startsWith('multimedia/')) {
            area.style.display = 'none';
            return;
        }
        if (url && url.trim()) {
            img.src = url.trim();
            area.style.display = 'flex';
        } else {
            img.src = '';
            area.style.display = 'none';
        }
    }

    function clearCutoutPng() {
        var field = $('vFeaturedCutoutPng'); if (field) field.value = '';
        renderCutoutPreview('');
        AP.toast('Imagen recortada eliminada', 'info');
    }

    // F7.5: Cutout preview listener (migrated from inline oninput)
    var cutoutInput = $('vFeaturedCutoutPng');
    if (cutoutInput) {
        cutoutInput.addEventListener('input', function() { renderCutoutPreview(this.value); });
    }

    // Auto-check "En Oferta" when precio oferta is entered (migrated from inline oninput)
    var precioOfertaInput = $('vPrecioOferta');
    if (precioOfertaInput) {
        precioOfertaInput.addEventListener('input', function() {
            var cb = $('vOferta');
            if (cb) cb.checked = !!this.value;
        });
    }

    // Cutout buttons (migrated from inline onclick)
    var btnCutoutClear = $('btnCutoutClear');
    if (btnCutoutClear) btnCutoutClear.addEventListener('click', function() { clearCutoutPng(); });
    var cutoutUploadArea = $('cutoutUploadArea');
    if (cutoutUploadArea) cutoutUploadArea.addEventListener('click', function() {
        var fi = $('cutoutFileInput');
        if (fi) fi.click();
    });

    // ========== CONCESIONARIO TOGGLE ==========
    function toggleConsignaField() {
        var concSelect = $('vConcesionario');
        var partGroup = $('consignaPartGroup');
        if (concSelect && partGroup) partGroup.style.display = concSelect.value === '_particular' ? '' : 'none';
    }
    var concSelectEl = $('vConcesionario');
    if (concSelectEl) concSelectEl.addEventListener('change', toggleConsignaField);

    /* Toggle destaque — radio change (hidden radios, kept for setDestaqueRadio compat) */
    document.querySelectorAll('input[name="vDestaqueNivel"]').forEach(function(radio) {
        radio.addEventListener('change', function() { syncDestaqueFromRadio(this.value); });
    });

    /* Toggle destaque — click on new star button */
    var _destacadoBtn = $('destacadoToggleBtn');
    if (_destacadoBtn) {
        _destacadoBtn.addEventListener('click', function() {
            var isNow = $('vDestacado') ? $('vDestacado').checked : false;
            var newVal = isNow ? 'normal' : 'destacado';
            var radio = document.querySelector('input[name="vDestaqueNivel"][value="' + newVal + '"]');
            if (radio) radio.checked = true;
            syncDestaqueFromRadio(newVal);
        });
    }

    /* Validación en tiempo real: orden duplicado en banner */
    var featuredOrderEl = $('vFeaturedOrder');
    if (featuredOrderEl) {
        featuredOrderEl.addEventListener('input', function() {
            var orderVal = parseInt(this.value, 10) || null;
            this.classList.remove('field-error');
            var errEl = this.parentElement.querySelector('.field-error-msg');
            if (errEl) errEl.remove();
            if (!orderVal) return;
            var editId = $('vId').value ? parseInt($('vId').value, 10) : null;
            var conflict = AP.vehicles.find(function(v) {
                return v.destacado && v.id !== editId && v.featuredOrder === orderVal;
            });
            if (conflict) {
                this.classList.add('field-error');
                var msg = document.createElement('span');
                msg.className = 'field-error-msg';
                msg.textContent = 'Posición ' + orderVal + ' ya usada por "' + ((conflict.marca || '') + ' ' + (conflict.modelo || '')).trim() + '"';
                this.parentElement.appendChild(msg);
            }
        });
    }

    // ========== PREVIEW ==========
    function previewVehicle(id) {
        var v = AP.vehicles.find(function(x) { return x.id === id; });
        if (!v) return;
        var marca = (v.marca || '').charAt(0).toUpperCase() + (v.marca || '').slice(1);
        var imgs = (v.imagenes || [v.imagen]).filter(Boolean);
        var imgsHtml = imgs.map(function(url, i) {
            return '<img src="' + url + '" style="width:100%;max-height:200px;object-fit:cover;border-radius:6px;margin-bottom:0.5rem;" onerror="this.style.display=\'none\'" alt="Foto ' + (i + 1) + '">';
        }).join('');

        var origenPreview = 'Propio';
        if (v.concesionario && v.concesionario !== '' && v.concesionario !== '_particular') {
            var dealerMatch = AP.dealers.find(function(x) { return x._docId === v.concesionario; });
            origenPreview = dealerMatch ? dealerMatch.nombre : v.concesionario;
        } else if (v.concesionario === '_particular' && v.consignaParticular) {
            origenPreview = 'Consigna: ' + v.consignaParticular;
        }

        var specs = [
            { label: 'Codigo', val: v.codigoUnico || '—' },
            { label: 'Marca', val: marca }, { label: 'Modelo', val: v.modelo },
            { label: 'Año', val: v.year }, { label: 'Tipo', val: v.tipo },
            { label: 'Categoria', val: v.categoria },
            { label: 'Precio', val: AP.formatPrice(v.precio) },
            { label: 'Precio Oferta', val: v.precioOferta ? AP.formatPrice(v.precioOferta) : '-' },
            { label: 'Kilometraje', val: (v.kilometraje || 0).toLocaleString('es-CO') + ' km' },
            { label: 'Transmision', val: v.transmision }, { label: 'Combustible', val: v.combustible },
            { label: 'Motor', val: v.motor || '-' }, { label: 'Direccion', val: v.direccion || '-' },
            { label: 'Traccion', val: v.traccion || '-' }, { label: 'Color', val: v.color || '-' },
            { label: 'Puertas', val: v.puertas || 5 }, { label: 'Pasajeros', val: v.pasajeros || 5 },
            { label: 'Placa', val: v.placa || '-' }, { label: 'Ubicacion', val: v.ubicacion || '-' },
            { label: 'Origen / Concesionario', val: origenPreview },
            { label: 'Estado', val: (v.estado || 'disponible') },
            { label: 'Descripcion', val: v.descripcion ? v.descripcion.substring(0, 100) + (v.descripcion.length > 100 ? '...' : '') : '-' },
            { label: 'Version', val: v._version || '-' },
            { label: 'Ultima edicion', val: v.updatedAt ? AP.formatTimeAgo(v.updatedAt) + ' por ' + (v.updatedBy || '-') : '-' }
        ];

        var specsHtml = '<table style="width:100%;font-size:0.8rem;border-collapse:collapse;">' +
            specs.map(function(s) {
                return '<tr style="border-bottom:1px solid var(--admin-border,#30363d);"><td style="padding:0.35rem 0.5rem;color:var(--admin-text-muted);white-space:nowrap;">' + s.label + '</td><td style="padding:0.35rem 0.5rem;color:var(--admin-text-primary,#f0f6fc);font-weight:500;">' + (s.val || '-') + '</td></tr>';
            }).join('') + '</table>';

        var features = (v.caracteristicas || []);
        var featHtml = features.length > 0 ? '<div style="margin-top:0.75rem;"><strong style="font-size:0.8rem;">Caracteristicas:</strong><div style="display:flex;flex-wrap:wrap;gap:0.3rem;margin-top:0.35rem;">' +
            features.map(function(f) { return '<span style="background:var(--admin-surface,#161b22);border:1px solid var(--admin-border,#30363d);border-radius:4px;padding:0.15rem 0.5rem;font-size:0.7rem;">' + AP.escapeHtml(f) + '</span>'; }).join('') +
            '</div></div>' : '';

        var content = '<div style="max-height:70vh;overflow-y:auto;padding-right:0.5rem;">' +
            imgsHtml +
            '<h3 style="margin:0.5rem 0 0.75rem;color:var(--admin-text-primary,#f0f6fc);">' + marca + ' ' + (v.modelo || '') + ' ' + (v.year || '') + '</h3>' +
            specsHtml + featHtml +
            (v.descripcion ? '<div style="margin-top:0.75rem;font-size:0.8rem;color:var(--admin-text-secondary);">' + AP.escapeHtml(v.descripcion) + '</div>' : '') +
            '</div>';

        var overlay = document.createElement('div');
        overlay.className = 'modal-overlay active';
        overlay.style.zIndex = '999';
        overlay.innerHTML = '<div class="modal" style="max-width:550px;"><div class="modal-header"><h2>Vista Previa — #' + id + '</h2><button class="modal-close" id="closePreview">&times;</button></div><div class="modal-body">' + content + '</div><div class="modal-footer"><button class="btn btn-ghost" id="closePreviewBtn">Cerrar</button><a href="detalle-vehiculo.html?id=' + id + '" target="_blank" class="btn btn-primary btn-sm">Abrir pagina publica</a></div></div>';
        document.body.appendChild(overlay);
        overlay.querySelector('#closePreview').addEventListener('click', function() { document.body.removeChild(overlay); });
        overlay.querySelector('#closePreviewBtn').addEventListener('click', function() { document.body.removeChild(overlay); });
        overlay.addEventListener('click', function(e) { if (e.target === overlay) document.body.removeChild(overlay); });
    }

    // ========== PREVIEW FROM FORM ==========
    function previewFromForm() {
        var marca = AP.toTitleCase($('vMarca').value || '');
        var modelo = ($('vModelo').value || '').trim();
        var year = $('vYear').value || '';
        var tipo = $('vTipo').value || 'usado';
        var categoria = $('vCategoria').value || '';
        var precio = parseInt($('vPrecio').value, 10) || 0;
        var precioOferta = $('vPrecioOferta').value ? parseInt($('vPrecioOferta').value, 10) : null;
        var km = parseInt($('vKm').value, 10) || 0;
        var transmision = $('vTransmision').value || '';
        var combustible = $('vCombustible').value || '';
        var motor = $('vMotor').value || '';
        var potencia = $('vPotencia').value || '';
        var cilindraje = $('vCilindraje').value || '';
        var traccion = $('vTraccion').value || '';
        var direccion = $('vDireccion').value || '';
        var color = AP.toTitleCase($('vColor').value || '');
        var puertas = $('vPuertas').value || '5';
        var pasajeros = $('vPasajeros').value || '5';
        var ubicacion = $('vUbicacion').value || 'Cartagena';
        var placa = $('vPlaca').value || 'Disponible al contactar';
        var estado = $('vEstado').value || 'disponible';
        var descripcion = $('vDescripcion').value || '';
        var features = collectAllFeatures();
        var imgs = AP.uploadedImageUrls.length ? AP.uploadedImageUrls.slice() : [];

        if (!marca && !modelo) { AP.toast('Ingresa al menos marca y modelo para previsualizar', 'error'); return; }

        var catLabels = { suv: 'SUV', sedan: 'Sedan', pickup: 'Pickup', hatchback: 'Hatchback', camioneta: 'Camioneta' };
        var estadoLabels = { disponible: 'Disponible', reservado: 'Reservado', vendido: 'Vendido', borrador: 'Borrador' };
        var estadoColors = { disponible: '#3fb950', reservado: '#d29922', vendido: '#f85149', borrador: '#8b949e' };

        var title = marca + ' ' + modelo + ' ' + year;
        var subtitle = (catLabels[categoria] || categoria || '') + (tipo ? ' • ' + AP.toTitleCase(tipo) : '');

        // Badges
        var badgesHtml = '';
        if (precioOferta) badgesHtml += '<span style="display:inline-block;padding:0.25rem 0.75rem;border-radius:4px;font-size:0.75rem;font-weight:700;background:#f85149;color:#fff;">Oferta</span> ';
        badgesHtml += '<span style="display:inline-block;padding:0.25rem 0.75rem;border-radius:4px;font-size:0.75rem;font-weight:700;background:' + (tipo === 'nuevo' ? '#3fb950' : '#b89658') + ';color:#fff;">' + AP.toTitleCase(tipo || 'Usado') + '</span>';

        // Price
        var priceHtml = '';
        if (precioOferta) {
            priceHtml = '<div style="font-size:0.9rem;color:#8b949e;text-decoration:line-through;">' + AP.formatPrice(precio) + '</div>' +
                '<div style="font-size:1.5rem;font-weight:800;color:#f85149;">' + AP.formatPrice(precioOferta) + '</div>';
        } else {
            priceHtml = '<div style="font-size:1.5rem;font-weight:800;color:#b89658;">' + AP.formatPrice(precio) + '</div>';
        }

        // Gallery
        var galleryHtml = '';
        if (imgs.length > 0) {
            galleryHtml = '<div style="position:relative;border-radius:10px;overflow:hidden;margin-bottom:1rem;background:#0d1117;">' +
                '<img src="' + imgs[0] + '" style="width:100%;max-height:280px;object-fit:cover;" onerror="this.style.display=\'none\'" alt="' + AP.escapeHtml(title) + '">' +
                '<span style="position:absolute;bottom:8px;right:8px;background:rgba(0,0,0,0.7);color:#fff;padding:0.2rem 0.6rem;border-radius:4px;font-size:0.75rem;">1/' + imgs.length + '</span>' +
            '</div>';
            if (imgs.length > 1) {
                galleryHtml += '<div style="display:flex;gap:0.4rem;overflow-x:auto;margin-bottom:1rem;">' +
                    imgs.slice(0, 6).map(function(url) {
                        return '<img src="' + url + '" style="width:60px;height:45px;object-fit:cover;border-radius:6px;border:1px solid #30363d;flex-shrink:0;" onerror="this.style.display=\'none\'">';
                    }).join('') +
                    (imgs.length > 6 ? '<span style="display:flex;align-items:center;font-size:0.75rem;color:#8b949e;padding:0 0.5rem;">+' + (imgs.length - 6) + '</span>' : '') +
                '</div>';
            }
        } else {
            galleryHtml = '<div style="background:#161b22;border-radius:10px;padding:3rem;text-align:center;margin-bottom:1rem;color:#8b949e;border:1px dashed #30363d;">Sin imagenes — agrega fotos en el paso 5</div>';
        }

        // Quick specs
        var quickSpecs = [
            { icon: 'calendar', label: 'Año', val: year },
            { icon: 'gauge', label: 'Kilometraje', val: km === 0 ? 'Nuevo' : km.toLocaleString('es-CO') + ' km' },
            { icon: 'settings', label: 'Transmision', val: transmision },
            { icon: 'fuel', label: 'Combustible', val: combustible }
        ];
        var quickHtml = '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0.5rem;padding:0.75rem 0;border-top:1px solid #30363d;border-bottom:1px solid #30363d;margin:0.75rem 0;">' +
            quickSpecs.map(function(s) {
                return '<div style="text-align:center;"><div style="font-size:0.65rem;color:#8b949e;text-transform:uppercase;">' + s.label + '</div><div style="font-size:0.85rem;font-weight:600;color:#f0f6fc;">' + AP.escapeHtml(s.val || '-') + '</div></div>';
            }).join('') + '</div>';

        // Technical sheet
        var fichaGroups = [
            { title: 'Informacion General', rows: [
                ['Marca', marca], ['Modelo', modelo], ['Año', year], ['Tipo', AP.toTitleCase(tipo)],
                ['Categoria', catLabels[categoria] || categoria], ['Color', color], ['Ubicacion', ubicacion], ['Placa', placa]
            ]},
            { title: 'Motor y Rendimiento', rows: [
                ['Transmision', transmision], ['Combustible', combustible], ['Motor', motor],
                ['Potencia', potencia ? potencia + ' HP' : '-'], ['Cilindraje', cilindraje ? cilindraje + ' cc' : '-'],
                ['Traccion', traccion], ['Direccion', direccion]
            ]},
            { title: 'Dimensiones', rows: [
                ['Puertas', puertas], ['Pasajeros', pasajeros], ['Kilometraje', km === 0 ? 'Nuevo' : km.toLocaleString('es-CO') + ' km']
            ]}
        ];
        var fichaHtml = fichaGroups.map(function(g) {
            return '<div style="margin-bottom:0.75rem;"><div style="font-size:0.8rem;font-weight:700;color:#b89658;margin-bottom:0.35rem;padding-bottom:0.25rem;border-bottom:1px solid rgba(184,150,88,0.2);">' + g.title + '</div>' +
                g.rows.filter(function(r) { return r[1]; }).map(function(r) {
                    return '<div style="display:flex;justify-content:space-between;padding:0.2rem 0;font-size:0.8rem;">' +
                        '<span style="color:#8b949e;">' + r[0] + '</span><span style="color:#f0f6fc;font-weight:500;">' + AP.escapeHtml(String(r[1])) + '</span></div>';
                }).join('') + '</div>';
        }).join('');

        // Features
        var featHtml = '';
        if (features.length > 0) {
            featHtml = '<div style="margin-top:0.5rem;"><div style="font-size:0.8rem;font-weight:700;color:#b89658;margin-bottom:0.35rem;">Caracteristicas</div>' +
                '<div style="display:flex;flex-wrap:wrap;gap:0.3rem;">' +
                features.map(function(f) {
                    return '<span style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:0.2rem 0.5rem;font-size:0.7rem;color:#f0f6fc;">' + AP.escapeHtml(f) + '</span>';
                }).join('') + '</div></div>';
        }

        // Description
        var descHtml = descripcion ? '<div style="margin-top:0.75rem;padding-top:0.5rem;border-top:1px solid #30363d;"><div style="font-size:0.8rem;font-weight:700;color:#b89658;margin-bottom:0.35rem;">Descripcion</div><p style="font-size:0.8rem;color:#c9d1d9;line-height:1.5;margin:0;">' + AP.escapeHtml(descripcion) + '</p></div>' : '';

        // Estado badge
        var estadoBadge = '<span style="display:inline-block;padding:0.15rem 0.5rem;border-radius:4px;font-size:0.7rem;font-weight:600;color:#fff;background:' + (estadoColors[estado] || '#8b949e') + ';">' + (estadoLabels[estado] || estado) + '</span>';

        var content = '<div style="max-height:75vh;overflow-y:auto;padding-right:0.5rem;">' +
            galleryHtml +
            '<div style="margin-bottom:0.5rem;">' + badgesHtml + ' ' + estadoBadge + '</div>' +
            '<h3 style="margin:0 0 0.25rem;color:#f0f6fc;font-size:1.25rem;">' + AP.escapeHtml(title) + '</h3>' +
            '<p style="margin:0 0 0.5rem;color:#8b949e;font-size:0.85rem;">' + AP.escapeHtml(subtitle) + '</p>' +
            priceHtml + quickHtml + fichaHtml + featHtml + descHtml +
        '</div>';

        var overlay = document.createElement('div');
        overlay.className = 'modal-overlay active';
        overlay.style.zIndex = '1001';
        overlay.innerHTML = '<div class="modal" style="max-width:580px;"><div class="modal-header"><h2 style="display:flex;align-items:center;gap:0.5rem;"><i data-lucide="eye" width="20" height="20"></i> Vista Previa del Sitio</h2><button class="modal-close" id="closeFormPreview">&times;</button></div><div class="modal-body">' + content + '</div><div class="modal-footer"><button class="btn btn-ghost" id="closeFormPreviewBtn">Volver a editar</button></div></div>';
        document.body.appendChild(overlay);
        AP.refreshIcons();
        overlay.querySelector('#closeFormPreview').addEventListener('click', function() { document.body.removeChild(overlay); });
        overlay.querySelector('#closeFormPreviewBtn').addEventListener('click', function() { document.body.removeChild(overlay); });
        overlay.addEventListener('click', function(e) { if (e.target === overlay) document.body.removeChild(overlay); });
    }

    var previewFromFormBtn = $('previewFromFormBtn');
    if (previewFromFormBtn) {
        previewFromFormBtn.addEventListener('click', function() { previewFromForm(); });
    }

    // Fase 18: Open modal with a restored draft (called from admin-panel.js)
    function restoreAndOpenDraft(snap) {
        if (!AP.canCreateOrEditInventory()) { AP.toast('No tienes permisos para editar vehiculos', 'error'); return; }
        $('modalTitle').textContent = 'Continuar Borrador';
        $('vId').value = snap.vId || '';
        $('vCodigoUnico').value = '';
        $('codigoUnicoDisplay').style.display = 'none';
        $('vehicleForm').reset();
        restoreFormSnapshot(snap);
        captureOriginalSnapshot();
        startDraftAutoSave();
        openModal();
    }

    // ========== FASE 18: ACTIVE DRAFTS REAL-TIME LISTENER ==========
    var _unsubDrafts = null;

    function startDraftsListener() {
        if (!window.db) return;
        try {
            _unsubDrafts = window.db.collection('drafts_activos').onSnapshot(function(snap) {
                var drafts = [];
                snap.forEach(function(doc) { drafts.push(doc.data()); });
                _renderActiveDrafts(drafts);
            }, function() {
                // Permission denied or collection doesn't exist — silent fail
            });
        } catch (_) {}
    }

    function _renderActiveDrafts(drafts) {
        var panel = $('activeDraftsPanel');
        var list = $('activeDraftsList');
        if (!panel || !list) return;

        // Filter out stale drafts (older than 2 hours)
        var now = Date.now();
        var TWO_HOURS = 2 * 60 * 60 * 1000;
        drafts = drafts.filter(function(d) {
            if (!d.lastSaved) return false;
            return (now - new Date(d.lastSaved).getTime()) < TWO_HOURS;
        });

        if (drafts.length === 0) { panel.style.display = 'none'; return; }

        panel.style.display = 'block';
        var currentUid = window.auth && window.auth.currentUser ? window.auth.currentUser.uid : '';

        list.innerHTML = drafts.map(function(d) {
            var label = ((d.marca || '') + ' ' + (d.modelo || '') + ' ' + (d.year || '')).trim() || 'Sin titulo';
            var email = d.userEmail || 'Admin';
            var initials = email.substring(0, 2).toUpperCase();
            var ago = d.lastSaved ? AP.formatTimeAgo(d.lastSaved) : '';
            var isOwn = d.userId === currentUid;
            var editingLabel = d.vehicleId ? ('Editando #' + d.vehicleId) : 'Nuevo vehiculo';
            var btnHtml = isOwn
                ? '<span style="color:var(--admin-success);font-size:0.7rem;font-weight:500;">Tu borrador</span>'
                : '<button class="btn btn-ghost btn-sm" data-action="loadDraftFromUser" data-user-id="' + AP.escapeHtml(d.userId || '') + '">Continuar</button>';

            return '<div class="draft-item">'
                + '<div class="draft-item-info">'
                + '<div class="draft-item-avatar">' + initials + '</div>'
                + '<div class="draft-item-text">'
                + '<div class="draft-item-label">' + AP.escapeHtml(label) + ' <small style="color:var(--admin-text-muted);">(' + AP.escapeHtml(editingLabel) + ')</small></div>'
                + '<div class="draft-item-meta">' + AP.escapeHtml(email) + ' · ' + ago + '</div>'
                + '</div></div>'
                + '<div class="draft-item-actions">' + btnHtml + '</div>'
                + '</div>';
        }).join('');
    }

    function loadDraftFromUser(userId) {
        if (!window.db || !userId) return;
        window.db.collection('usuarios').doc(userId).collection('drafts').doc('vehicleDraft').get()
            .then(function(doc) {
                if (!doc.exists) { AP.toast('Borrador no encontrado — puede que ya se haya guardado.', 'info'); return; }
                var snap = doc.data();
                if (!snap || !snap.vMarca) { AP.toast('Borrador vacio', 'info'); return; }
                restoreAndOpenDraft(snap);
            })
            .catch(function() { AP.toast('No se pudo cargar el borrador de este usuario', 'error'); });
    }

    // ========== TOGGLE DESTACADO (estrella en tabla) ==========
    function toggleDestacadoFn(id) {
        if (!AP.canCreateOrEditInventory()) { AP.toast('Sin permisos.', 'error'); return; }
        var vehicle = AP.vehicles.find(function(v) { return v.id === id; });
        if (!vehicle) return;
        var newVal = !vehicle.destacado; /* destacado is the single source of truth */
        if (newVal) {
            var count = AP.vehicles.filter(function(v) { return v.destacado; }).length;
            if (count >= 6) { AP.toast('Maximo 6 vehiculos destacados en banner.', 'error'); return; }
        }
        var auditUser = getAuditUser();
        var currentVersion = vehicle._version || 0;
        window.db.collection('vehiculos').doc(String(id)).update({
            destacado: newVal,
            featuredWeek: newVal,
            updatedAt: new Date().toISOString(),
            updatedBy: auditUser.email,
            lastModifiedBy: auditUser.email,
            lastModifiedByName: auditUser.name,
            lastModifiedAt: new Date().toISOString(),
            _version: currentVersion + 1
        }).then(function() {
            AP.toast(newVal ? 'Vehiculo destacado (aparece en banner)' : 'Vehiculo quitado de destacados', 'success');
            AP.writeAuditLog('vehicle_feature_toggle', 'vehiculo #' + id, newVal ? 'destacado' : 'sin destacar');
            logVehicleAction(id, 'featured', [{ field: 'destacado', from: !newVal, to: newVal }]);
        }).catch(function(err) { AP.toast('Error: ' + (err.message || err), 'error'); });
    }

    // ========== F2.5: AUDIT TIMELINE ==========
    var AUDIT_ACTION_LABELS = {
        created: 'Creado', edited: 'Editado', deleted: 'Eliminado',
        featured: 'Destacado', sold: 'Vendido', reverted: 'Revertido'
    };

    function showAuditTimeline(vehicleId) {
        var v = AP.vehicles.find(function(x) { return x.id === vehicleId; });
        var label = v ? ((v.marca || '') + ' ' + (v.modelo || '') + ' ' + (v.year || '')) : '#' + vehicleId;
        var $ = AP.$;
        $('auditTimelineTitle').textContent = 'Historial — ' + label.trim();
        $('auditTimelineContent').innerHTML = '<div class="audit-loading"><span class="spinner"></span> Cargando historial...</div>';
        $('auditTimelineModal').classList.add('active');

        window.db.collection('vehiculos').doc(String(vehicleId))
            .collection('auditLog').orderBy('timestamp', 'desc').limit(50).get()
            .then(function(snap) {
                if (snap.empty) {
                    $('auditTimelineContent').innerHTML = '<div class="audit-empty">No hay registros de auditoría para este vehículo.</div>';
                    return;
                }
                var html = '<div class="audit-timeline">';
                snap.forEach(function(doc) {
                    var e = doc.data();
                    var actionLabel = AUDIT_ACTION_LABELS[e.action] || e.action;
                    var dotClass = e.action || 'edited';
                    var timeStr = e.timestamp ? AP.formatTimeAgo(typeof e.timestamp === 'number' ? new Date(e.timestamp).toISOString() : e.timestamp) : '';

                    html += '<div class="audit-entry">';
                    html += '<div class="audit-dot ' + dotClass + '"></div>';
                    html += '<div class="audit-entry-header">';
                    html += '<span class="audit-action">' + AP.escapeHtml(actionLabel) + '</span>';
                    html += '<span class="audit-time">' + AP.escapeHtml(timeStr) + '</span>';
                    html += '</div>';
                    html += '<div class="audit-user">' + AP.escapeHtml(e.userName || e.user || 'Desconocido') + '</div>';

                    if (e.changes && e.changes.length > 0 && e.action !== 'created') {
                        html += '<div class="audit-changes">';
                        e.changes.forEach(function(c) {
                            html += '<div class="audit-change-item">';
                            html += '<span class="audit-change-field">' + AP.escapeHtml(c.field) + '</span>';
                            if (c.from !== null && c.from !== undefined) {
                                html += '<span class="audit-change-from">' + AP.escapeHtml(String(c.from).substring(0, 60)) + '</span>';
                            }
                            html += '<span class="audit-change-to">' + AP.escapeHtml(String(c.to).substring(0, 60)) + '</span>';
                            html += '</div>';
                        });
                        html += '</div>';

                        // Revert button (only for edits with from values, super_admin only)
                        if (AP.isSuperAdmin() && e.action === 'edited') {
                            var hasRevertable = e.changes.some(function(c) { return c.from !== null && c.from !== undefined; });
                            if (hasRevertable) {
                                html += '<button class="btn btn-ghost btn-sm audit-revert-btn" data-action="revertAuditEntry" data-vehicle-id="' + vehicleId + '" data-audit-id="' + doc.id + '" style="margin-top:0.35rem;font-size:0.75rem;color:var(--admin-warning);" title="Revertir estos cambios"><i data-lucide="undo-2" style="width:12px;height:12px;"></i> Revertir</button>';
                            }
                        }
                    }

                    if (e.saleDetails) {
                        html += '<div class="audit-changes">';
                        html += '<div class="audit-change-item"><span class="audit-change-field">Canal</span><span class="audit-change-to">' + AP.escapeHtml(e.saleDetails.canal || '') + '</span></div>';
                        if (e.saleDetails.precioVenta) {
                            html += '<div class="audit-change-item"><span class="audit-change-field">Precio venta</span><span class="audit-change-to">' + AP.formatPrice(e.saleDetails.precioVenta) + '</span></div>';
                        }
                        html += '</div>';
                    }

                    html += '</div>';
                });
                html += '</div>';
                $('auditTimelineContent').innerHTML = html;
                AP.refreshIcons();
            })
            .catch(function(err) {
                $('auditTimelineContent').innerHTML = '<div class="audit-empty">Error al cargar historial: ' + AP.escapeHtml(err.message) + '</div>';
            });
    }

    function revertAuditEntry(vehicleId, auditId) {
        if (!AP.isSuperAdmin()) { AP.toast('Solo Super Admin puede revertir cambios', 'error'); return; }
        if (!confirm('¿Revertir estos cambios? El vehiculo volvera a los valores anteriores de los campos modificados.')) return;

        var vehicleRef = window.db.collection('vehiculos').doc(String(vehicleId));
        var auditRef = vehicleRef.collection('auditLog').doc(auditId);

        auditRef.get().then(function(auditDoc) {
            if (!auditDoc.exists) { AP.toast('Registro de auditoria no encontrado', 'error'); return; }
            var entry = auditDoc.data();
            if (!entry.changes || entry.changes.length === 0) { AP.toast('No hay cambios que revertir', 'error'); return; }

            return vehicleRef.get().then(function(vehicleDoc) {
                if (!vehicleDoc.exists) { AP.toast('Vehiculo no encontrado', 'error'); return; }
                var currentData = vehicleDoc.data();
                var revertData = {};
                var revertChanges = [];

                entry.changes.forEach(function(c) {
                    if (c.from !== null && c.from !== undefined && c.field) {
                        revertData[c.field] = c.from;
                        revertChanges.push({ field: c.field, from: currentData[c.field], to: c.from });
                    }
                });

                if (Object.keys(revertData).length === 0) { AP.toast('No hay valores anteriores para revertir', 'error'); return; }

                var auditUser = getAuditUser();
                revertData._version = (currentData._version || 0) + 1;
                revertData.lastModifiedBy = auditUser.email;
                revertData.lastModifiedByName = auditUser.name;
                revertData.lastModifiedAt = new Date().toISOString();
                revertData.updatedAt = new Date().toISOString();
                revertData.updatedBy = auditUser.email;

                return vehicleRef.update(revertData).then(function() {
                    return logVehicleAction(vehicleId, 'reverted', revertChanges);
                }).then(function() {
                    AP.toast('Cambios revertidos exitosamente');
                    showAuditTimeline(vehicleId);
                });
            });
        }).catch(function(err) {
            AP.toast('Error al revertir: ' + err.message, 'error');
        });
    }

    AP.$('closeAuditTimeline').addEventListener('click', function() {
        AP.$('auditTimelineModal').classList.remove('active');
    });
    AP.$('auditTimelineModal').addEventListener('click', function(e) {
        if (e.target === this) { this.classList.remove('active'); return; }
        var btn = e.target.closest ? e.target.closest('[data-action="revertAuditEntry"]') : null;
        if (btn) {
            var vid = parseInt(btn.getAttribute('data-vehicle-id'), 10);
            var aid = btn.getAttribute('data-audit-id');
            if (vid && aid) revertAuditEntry(vid, aid);
        }
    });

    // ========== EXPOSE ==========
    AP.renderVehiclesTable = renderVehiclesTable;
    AP.populateBrandSelect = populateBrandSelect;
    AP.editVehicle = editVehicle;
    AP._editVehicleOriginal = editVehicle; // F6.2: safe reference for phase5 lazy-bind
    AP.deleteVehicle = deleteVehicleFn;
    AP.removeImage = removeImage;
    AP.previewVehicle = previewVehicle;
    AP.previewFromForm = previewFromForm;
    AP.restoreAndOpenDraft = restoreAndOpenDraft;
    AP.startDraftsListener = startDraftsListener;
    AP.loadDraftFromUser = loadDraftFromUser;
    AP.toggleDestacado = toggleDestacadoFn;
    AP.showAuditTimeline = showAuditTimeline;
    AP.clearCutoutPng = clearCutoutPng;
    AP.renderCutoutPreview = renderCutoutPreview;

    // F6.4: Event delegation for vehicle table actions
    var vehicleActions = {
        previewVehicle: function(id) { previewVehicle(parseInt(id, 10)); },
        showAuditTimeline: function(id) { showAuditTimeline(parseInt(id, 10)); },
        toggleDestacado: function(id) { toggleDestacadoFn(parseInt(id, 10)); },
        editVehicle: function(id) { editVehicle(parseInt(id, 10)); },
        duplicateVehicle: function(id) { duplicateVehicle(parseInt(id, 10)); },
        markAsSold: function(id) { AP.markAsSold(parseInt(id, 10)); },
        deleteVehicle: function(id) { deleteVehicleFn(parseInt(id, 10)); },
        removeImage: function(_, btn) { removeImage(parseInt(btn.getAttribute('data-idx'), 10)); },
        loadDraftFromUser: function(_, btn) { loadDraftFromUser(btn.getAttribute('data-user-id')); }
    };
    document.addEventListener('click', function(e) {
        var btn = AP.closestAction(e);
        if (!btn) return;
        var action = btn.getAttribute('data-action');
        var handler = vehicleActions[action];
        if (handler) {
            e.preventDefault();
            handler(btn.getAttribute('data-id'), btn);
        }
    });

    // F10.4: Batch selection
    function updateBatchBar() {
        var checked = document.querySelectorAll('.vehicle-cb:checked');
        var bar = $('vehicleBatchBar');
        var count = $('vehicleBatchCount');
        if (bar) bar.style.display = checked.length > 0 ? 'flex' : 'none';
        if (count) count.textContent = checked.length + ' seleccionados';
    }

    var selectAll = $('vehicleSelectAll');
    if (selectAll) selectAll.addEventListener('change', function() {
        var val = this.checked;
        document.querySelectorAll('.vehicle-cb').forEach(function(cb) { cb.checked = val; });
        updateBatchBar();
    });

    document.addEventListener('change', function(e) {
        if (e.target.classList.contains('vehicle-cb')) updateBatchBar();
    });

    var btnBatchDel = $('btnBatchDeleteVehicles');
    if (btnBatchDel) btnBatchDel.addEventListener('click', function() {
        if (!AP.canDeleteInventory()) { AP.toast('No tienes permisos', 'error'); return; }
        var ids = [];
        document.querySelectorAll('.vehicle-cb:checked').forEach(function(cb) { ids.push(parseInt(cb.getAttribute('data-vid'), 10)); });
        if (ids.length === 0) return;
        if (!confirm('¿Eliminar ' + ids.length + ' vehiculos? Esta accion no se puede deshacer.')) return;
        var batch = window.db.batch();
        ids.forEach(function(id) { batch.delete(window.db.collection('vehiculos').doc(String(id))); });
        batch.commit().then(function() {
            AP.toast(ids.length + ' vehiculos eliminados');
            updateBatchBar();
        }).catch(function(err) { AP.toast('Error: ' + err.message, 'error'); });
    });

    var btnBatchExport = $('btnBatchExportVehicles');
    if (btnBatchExport) btnBatchExport.addEventListener('click', function() {
        var ids = [];
        document.querySelectorAll('.vehicle-cb:checked').forEach(function(cb) { ids.push(parseInt(cb.getAttribute('data-vid'), 10)); });
        if (ids.length === 0) return;
        var selected = AP.vehicles.filter(function(v) { return ids.indexOf(v.id) >= 0; });
        var headers = ['Codigo', 'Marca', 'Modelo', 'Ano', 'Tipo', 'Precio', 'Estado', 'Placa'];
        var rows = selected.map(function(v) {
            return [v.codigoUnico || '', v.marca || '', v.modelo || '', v.year || '', v.tipo || '', v.precio || '', v.estado || '', v.placa || ''];
        });
        AP.exportCSV('vehiculos_seleccion_' + new Date().toISOString().slice(0, 10) + '.csv', headers, rows);
    });

    var btnDeselect = $('btnBatchDeselectAll');
    if (btnDeselect) btnDeselect.addEventListener('click', function() {
        document.querySelectorAll('.vehicle-cb:checked').forEach(function(cb) { cb.checked = false; });
        if (selectAll) selectAll.checked = false;
        updateBatchBar();
    });
})();
