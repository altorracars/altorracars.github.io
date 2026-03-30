// Admin Panel — Activity Feed & Audit Log Panel (F4.1 + F4.2)
(function() {
    'use strict';
    var AP = window.AP;
    var $ = AP.$;

    // ========== ACTION METADATA ==========
    var ACTION_ICONS = {
        'login': '🔑', 'vehicle_create': '➕', 'vehicle_update': '✏️',
        'vehicle_delete': '🗑️', 'vehicle_sold': '💰', 'vehicle_feature_toggle': '⭐',
        'brand_create': '🏷️', 'brand_update': '🏷️', 'brand_delete': '🗑️',
        'dealer_create': '🏢', 'dealer_update': '🏢',
        'backup_export': '📦', 'backup_import': '📥',
        'list_update': '📋', 'appointment_confirmada': '📅',
        'appointment_cancelada': '❌', 'appointment_delete': '🗑️',
        'appointment_create_internal': '📅',
        'banner_create': '🖼️', 'banner_update': '🖼️', 'banner_delete': '🗑️',
        'user_create': '👤', 'user_update': '👤', 'user_delete': '👤',
        'review_create': '⭐', 'review_update': '⭐', 'review_delete': '🗑️',
        'reordenar': '↕️', 'sitemap': '🗺️', 'seo_regenerate': '🔄',
        'crear': '➕', 'editar': '✏️', 'eliminar': '🗑️'
    };

    var ACTION_TEXTS = {
        'login': 'inicio sesion', 'vehicle_create': 'creo vehiculo',
        'vehicle_update': 'actualizo vehiculo', 'vehicle_delete': 'elimino vehiculo',
        'vehicle_sold': 'registro venta', 'vehicle_feature_toggle': 'cambio destacado',
        'brand_create': 'creo marca', 'brand_update': 'actualizo marca',
        'brand_delete': 'elimino marca', 'dealer_create': 'creo aliado',
        'dealer_update': 'actualizo aliado', 'backup_export': 'exporto respaldo',
        'backup_import': 'importo respaldo', 'list_update': 'actualizo lista',
        'appointment_confirmada': 'confirmo cita', 'appointment_cancelada': 'cancelo cita',
        'appointment_delete': 'elimino cita', 'appointment_create_internal': 'creo cita interna',
        'banner_create': 'creo banner', 'banner_update': 'actualizo banner',
        'banner_delete': 'elimino banner', 'user_create': 'creo usuario',
        'user_update': 'actualizo usuario', 'user_delete': 'elimino usuario',
        'review_create': 'creo resena', 'review_update': 'actualizo resena',
        'review_delete': 'elimino resena', 'reordenar': 'reordeno vehiculos',
        'sitemap': 'publico sitemap', 'seo_regenerate': 'regenero SEO',
        'crear': 'creo', 'editar': 'edito', 'eliminar': 'elimino'
    };

    // Category for grouping actions
    var ACTION_CATEGORIES = {
        'login': 'sistema', 'backup_export': 'sistema', 'backup_import': 'sistema',
        'sitemap': 'sistema', 'seo_regenerate': 'sistema', 'list_update': 'sistema',
        'vehicle_create': 'vehiculos', 'vehicle_update': 'vehiculos', 'vehicle_delete': 'vehiculos',
        'vehicle_sold': 'vehiculos', 'vehicle_feature_toggle': 'vehiculos', 'reordenar': 'vehiculos',
        'brand_create': 'marcas', 'brand_update': 'marcas', 'brand_delete': 'marcas',
        'banner_create': 'banners', 'banner_update': 'banners', 'banner_delete': 'banners',
        'appointment_confirmada': 'citas', 'appointment_cancelada': 'citas',
        'appointment_delete': 'citas', 'appointment_create_internal': 'citas',
        'dealer_create': 'aliados', 'dealer_update': 'aliados',
        'user_create': 'usuarios', 'user_update': 'usuarios', 'user_delete': 'usuarios',
        'review_create': 'resenas', 'review_update': 'resenas', 'review_delete': 'resenas'
    };

    function getActivityIcon(action) {
        return ACTION_ICONS[action] || '📝';
    }

    function getActivityText(item) {
        return ACTION_TEXTS[item.action] || item.action || 'realizo accion';
    }

    // ========== AUDIT LOG SUBSCRIPTION ==========
    function loadAuditLog() {
        if (AP.unsubAuditLog) AP.unsubAuditLog();
        AP.unsubAuditLog = window.db.collection('auditLog')
            .orderBy('timestamp', 'desc')
            .limit(500)
            .onSnapshot(function(snap) {
                AP.auditLogEntries = snap.docs.map(function(doc) {
                    var data = doc.data();
                    data._docId = doc.id;
                    return data;
                });
                renderActivityFeed();
                renderAuditTable();
                updateAuditUserFilter();
            }, function(err) {
                console.warn('[AuditLog] Error loading:', err);
                renderActivityFeedFallback();
            });
    }

    // ========== DASHBOARD ACTIVITY FEED ==========
    function buildActivityItemHTML(item) {
        var who = item.user || item.updatedBy || 'Admin';
        if (who.indexOf('@') > 0) who = who.split('@')[0];
        var when = (item.timestamp || item.updatedAt) ? AP.formatTimeAgo(item.timestamp || item.updatedAt) : '';
        var icon = getActivityIcon(item.action || item._actType);
        var actionText = getActivityText(item);
        var target = item.target || item.details || '';
        var details = item.details || '';
        var docId = item._docId || '';

        var checkboxHtml = '';
        if (AP.activitySelectMode && docId) {
            var checked = AP.selectedActivityIds.indexOf(docId) >= 0 ? ' checked' : '';
            checkboxHtml = '<input type="checkbox" class="activity-checkbox" data-id="' + docId + '"' + checked + '> ';
        }

        return '<div class="activity-item' + (AP.activitySelectMode ? ' selectable' : '') + '" data-doc-id="' + docId + '">' +
            checkboxHtml +
            '<span class="activity-icon">' + icon + '</span>' +
            '<div class="activity-content">' +
                '<span class="activity-who">' + AP.escapeHtml(who) + '</span> ' +
                actionText + ' ' +
                (target ? '<span class="activity-vehicle">' + AP.escapeHtml(target) + '</span>' : '') +
                (details && details !== target ? ' <span class="activity-details">' + AP.escapeHtml(details) + '</span>' : '') +
                '<div class="activity-time">' + when + '</div>' +
            '</div>' +
        '</div>';
    }

    function renderActivityFeed() {
        var feed = $('activityFeed');
        if (!feed) return;

        var allItems = AP.auditLogEntries.slice();
        if (allItems.length === 0) {
            feed.innerHTML = '<div class="activity-empty">Sin actividad reciente</div>';
            updateActivityControls(0);
            return;
        }

        var showAll = AP.activityExpanded;
        var visible = showAll ? allItems : allItems.slice(0, AP.ACTIVITY_PAGE_SIZE);
        var html = visible.map(buildActivityItemHTML).join('');

        if (!showAll && allItems.length > AP.ACTIVITY_PAGE_SIZE) {
            html += '<button class="activity-show-more" id="btnActivityMore">Ver toda la actividad (' + allItems.length + ' registros)</button>';
        } else if (showAll && allItems.length > AP.ACTIVITY_PAGE_SIZE) {
            html += '<button class="activity-show-more" id="btnActivityLess">Mostrar menos</button>';
        }

        feed.innerHTML = html;
        updateActivityControls(allItems.length);

        if (AP.activitySelectMode) {
            feed.querySelectorAll('.activity-checkbox').forEach(function(cb) {
                cb.addEventListener('change', function() {
                    var id = this.getAttribute('data-id');
                    if (this.checked) {
                        if (AP.selectedActivityIds.indexOf(id) === -1) AP.selectedActivityIds.push(id);
                    } else {
                        AP.selectedActivityIds = AP.selectedActivityIds.filter(function(x) { return x !== id; });
                    }
                    updateDeleteSelectedBtn();
                });
            });
        }

        var btnMore = $('btnActivityMore');
        if (btnMore) btnMore.addEventListener('click', function() { AP.activityExpanded = true; feed.style.maxHeight = 'none'; renderActivityFeed(); });
        var btnLess = $('btnActivityLess');
        if (btnLess) btnLess.addEventListener('click', function() { AP.activityExpanded = false; feed.style.maxHeight = '420px'; renderActivityFeed(); feed.scrollTop = 0; });
    }

    function renderActivityFeedFallback() {
        var feed = $('activityFeed');
        if (!feed) return;
        var allItems = [];
        AP.vehicles.forEach(function(v) { if (v.updatedAt) allItems.push(v); });
        AP.brands.forEach(function(b) { if (b.updatedAt) allItems.push(Object.assign({ _actType: 'brand' }, b)); });
        allItems.sort(function(a, b) { return (b.updatedAt || '').localeCompare(a.updatedAt || ''); });
        if (allItems.length === 0) { feed.innerHTML = '<div class="activity-empty">Sin actividad reciente</div>'; return; }
        var visible = allItems.slice(0, AP.ACTIVITY_PAGE_SIZE);
        feed.innerHTML = visible.map(function(item) {
            var who = item.updatedBy || 'Admin';
            if (who.indexOf('@') > 0) who = who.split('@')[0];
            var when = item.updatedAt ? AP.formatTimeAgo(item.updatedAt) : '';
            var icon = item._actType === 'brand' ? '🏷️' : (item._version === 1 ? '➕' : '✏️');
            var name = item._actType === 'brand' ? (item.nombre || '') : ((item.marca ? AP.capitalize(item.marca) : '') + ' ' + (item.modelo || '') + ' ' + (item.year || '')).trim();
            return '<div class="activity-item"><span class="activity-icon">' + icon + '</span><div class="activity-content"><span class="activity-who">' + AP.escapeHtml(who) + '</span> actualizo <span class="activity-vehicle">' + AP.escapeHtml(name) + '</span><div class="activity-time">' + when + '</div></div></div>';
        }).join('');
    }

    function updateActivityControls(count) {
        var countEl = $('activityCount');
        if (countEl) countEl.textContent = count > 0 ? '(' + count + ')' : '';
        var badgeEl = $('navBadgeAudit');
        if (badgeEl) badgeEl.textContent = count > 0 ? count : '';
    }

    function updateDeleteSelectedBtn() {
        var btn = $('btnDeleteSelectedActivity');
        if (btn) {
            btn.textContent = 'Eliminar seleccionados (' + AP.selectedActivityIds.length + ')';
            btn.disabled = AP.selectedActivityIds.length === 0;
        }
    }

    function toggleActivitySelectMode() {
        AP.activitySelectMode = !AP.activitySelectMode;
        AP.selectedActivityIds = [];
        var btn = $('btnSelectActivity');
        if (btn) btn.textContent = AP.activitySelectMode ? 'Cancelar' : 'Seleccionar';
        var actionsEl = $('activitySelectActions');
        if (actionsEl) actionsEl.style.display = AP.activitySelectMode ? 'flex' : 'none';
        renderActivityFeed();
    }

    function deleteSelectedActivity() {
        if (AP.selectedActivityIds.length === 0) return;
        if (!confirm('Eliminar ' + AP.selectedActivityIds.length + ' registros de actividad?')) return;
        var batch = window.db.batch();
        AP.selectedActivityIds.forEach(function(docId) {
            batch.delete(window.db.collection('auditLog').doc(docId));
        });
        batch.commit().then(function() {
            AP.toast(AP.selectedActivityIds.length + ' registros eliminados');
            AP.selectedActivityIds = [];
            AP.activitySelectMode = false;
            var btn = $('btnSelectActivity');
            if (btn) btn.textContent = 'Seleccionar';
            var actionsEl = $('activitySelectActions');
            if (actionsEl) actionsEl.style.display = 'none';
        }).catch(function(err) { AP.toast('Error al eliminar: ' + err.message, 'error'); });
    }

    function clearAllActivity() {
        if (!AP.canDeleteInventory || !AP.canDeleteInventory()) { AP.toast('Solo Super Admin puede limpiar actividad', 'error'); return; }
        if (!confirm('Eliminar TODA la actividad reciente? Esta accion no se puede deshacer.')) return;
        var batch = window.db.batch();
        var count = 0;
        AP.auditLogEntries.forEach(function(entry) {
            if (entry._docId) { batch.delete(window.db.collection('auditLog').doc(entry._docId)); count++; }
        });
        if (count === 0) { AP.toast('No hay actividad para limpiar', 'info'); return; }
        batch.commit().then(function() {
            AP.toast(count + ' registros de actividad eliminados');
            AP.activitySelectMode = false;
            AP.selectedActivityIds = [];
            var btn = $('btnSelectActivity');
            if (btn) btn.textContent = 'Seleccionar';
            var actionsEl = $('activitySelectActions');
            if (actionsEl) actionsEl.style.display = 'none';
        }).catch(function(err) { AP.toast('Error: ' + err.message, 'error'); });
    }

    // ========== F4.1: AUDIT PANEL WITH FILTERS ==========
    var _auditFilterDebounce = null;
    var _auditUsersPopulated = false;

    function getFilteredAuditEntries() {
        var entries = AP.auditLogEntries.slice();

        var searchVal = ($('auditSearch') || {}).value;
        var userVal = ($('auditFilterUser') || {}).value;
        var actionVal = ($('auditFilterAction') || {}).value;
        var fromVal = ($('auditFilterFrom') || {}).value;
        var toVal = ($('auditFilterTo') || {}).value;

        if (searchVal) {
            var q = searchVal.toLowerCase();
            entries = entries.filter(function(e) {
                return (e.user || '').toLowerCase().indexOf(q) >= 0 ||
                       (e.action || '').toLowerCase().indexOf(q) >= 0 ||
                       (e.target || '').toLowerCase().indexOf(q) >= 0 ||
                       (e.details || '').toLowerCase().indexOf(q) >= 0;
            });
        }

        if (userVal) {
            entries = entries.filter(function(e) { return e.user === userVal; });
        }

        if (actionVal) {
            entries = entries.filter(function(e) { return e.action === actionVal; });
        }

        if (fromVal) {
            var fromDate = new Date(fromVal + 'T00:00:00');
            entries = entries.filter(function(e) {
                return e.timestamp && new Date(e.timestamp) >= fromDate;
            });
        }

        if (toVal) {
            var toDate = new Date(toVal + 'T23:59:59');
            entries = entries.filter(function(e) {
                return e.timestamp && new Date(e.timestamp) <= toDate;
            });
        }

        return entries;
    }

    function renderAuditTable() {
        var tbody = $('auditTableBody');
        if (!tbody) return;

        var filtered = getFilteredAuditEntries();
        var totalCount = filtered.length;

        // Update count
        var countEl = $('auditTotalCount');
        if (countEl) countEl.textContent = totalCount > 0 ? '(' + totalCount + ' registros)' : '';

        // Sorting
        if (AP._sorting && AP._sorting.audit && AP._sorting.audit.col) {
            filtered = AP.sortData(filtered, 'audit');
        }

        // Pagination
        if (AP.paginate) filtered = AP.paginate(filtered, 'audit');

        if (filtered.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="table-empty">No hay registros de auditoria</td></tr>';
            if (AP.renderPagination) AP.renderPagination('auditPagination', 'audit', totalCount);
            return;
        }

        var html = '';
        filtered.forEach(function(entry) {
            var icon = getActivityIcon(entry.action);
            var actionText = getActivityText(entry);
            var who = entry.user || 'Desconocido';
            var target = entry.target || '-';
            var details = entry.details || '-';
            var category = ACTION_CATEGORIES[entry.action] || 'otro';

            var ts = '';
            if (entry.timestamp) {
                try {
                    var d = new Date(entry.timestamp);
                    ts = d.toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' }) +
                         ' ' + d.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
                } catch (e) { ts = entry.timestamp; }
            }

            var categoryClass = 'audit-cat-' + category;

            html += '<tr>' +
                '<td><span class="audit-timestamp">' + AP.escapeHtml(ts) + '</span></td>' +
                '<td><span class="audit-user">' + AP.escapeHtml(who) + '</span></td>' +
                '<td><span class="audit-action ' + categoryClass + '">' + icon + ' ' + AP.escapeHtml(actionText) + '</span></td>' +
                '<td>' + AP.escapeHtml(target) + '</td>' +
                '<td class="audit-details-cell">' + AP.escapeHtml(details) + '</td>' +
            '</tr>';
        });

        tbody.innerHTML = html;

        // Sort indicators
        document.querySelectorAll('th[data-table="audit"][data-sort]').forEach(function(th) {
            var col = th.getAttribute('data-sort');
            var text = th.textContent.replace(/[↑↓⇅]/g, '').trim();
            th.innerHTML = text + ' ' + (AP.getSortIndicator ? AP.getSortIndicator('audit', col) : '');
        });

        if (AP.renderPagination) AP.renderPagination('auditPagination', 'audit', totalCount);
    }

    function updateAuditUserFilter() {
        var select = $('auditFilterUser');
        if (!select || _auditUsersPopulated) return;

        var users = {};
        AP.auditLogEntries.forEach(function(e) {
            if (e.user && !users[e.user]) users[e.user] = true;
        });

        var sorted = Object.keys(users).sort();
        if (sorted.length === 0) return;

        _auditUsersPopulated = true;
        var currentVal = select.value;
        var html = '<option value="">Todos</option>';
        sorted.forEach(function(u) {
            var label = u;
            if (u.indexOf('@') > 0) label = u.split('@')[0] + ' (' + u + ')';
            html += '<option value="' + AP.escapeHtml(u) + '">' + AP.escapeHtml(label) + '</option>';
        });
        select.innerHTML = html;
        if (currentVal) select.value = currentVal;
    }

    function clearAuditFilters() {
        var s = $('auditSearch'); if (s) s.value = '';
        var u = $('auditFilterUser'); if (u) u.value = '';
        var a = $('auditFilterAction'); if (a) a.value = '';
        var f = $('auditFilterFrom'); if (f) f.value = '';
        var t = $('auditFilterTo'); if (t) t.value = '';
        if (AP._pagination && AP._pagination.audit) AP._pagination.audit.page = 1;
        renderAuditTable();
    }

    // Bind filter events
    function initAuditFilters() {
        var els = ['auditFilterUser', 'auditFilterAction', 'auditFilterFrom', 'auditFilterTo'];
        els.forEach(function(id) {
            var el = $(id);
            if (el) el.addEventListener('change', function() {
                if (AP._pagination && AP._pagination.audit) AP._pagination.audit.page = 1;
                renderAuditTable();
            });
        });

        var searchEl = $('auditSearch');
        if (searchEl) {
            searchEl.addEventListener('input', function() {
                if (_auditFilterDebounce) clearTimeout(_auditFilterDebounce);
                _auditFilterDebounce = setTimeout(function() {
                    if (AP._pagination && AP._pagination.audit) AP._pagination.audit.page = 1;
                    renderAuditTable();
                }, 250);
            });
        }
    }

    // ========== EXPORT AUDIT CSV ==========
    function exportAuditCSV() {
        var entries = getFilteredAuditEntries();
        if (entries.length === 0) { AP.toast('No hay registros para exportar', 'info'); return; }

        var headers = ['Fecha', 'Usuario', 'Accion', 'Objetivo', 'Detalles'];
        var rows = entries.map(function(e) {
            var ts = '';
            if (e.timestamp) {
                try { ts = new Date(e.timestamp).toISOString(); } catch (err) { ts = e.timestamp; }
            }
            return [ts, e.user || '', e.action || '', e.target || '', e.details || ''];
        });

        var csvContent = '\uFEFF';
        csvContent += headers.join(',') + '\n';
        rows.forEach(function(row) {
            csvContent += row.map(function(val) {
                var s = String(val).replace(/"/g, '""');
                return '"' + s + '"';
            }).join(',') + '\n';
        });

        var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'auditoria_altorra_' + new Date().toISOString().slice(0, 10) + '.csv';
        a.click();
        URL.revokeObjectURL(url);
        AP.toast('CSV de auditoria exportado (' + entries.length + ' registros)');
    }

    // Init filters when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAuditFilters);
    } else {
        initAuditFilters();
    }

    // ========== EXPOSE ==========
    AP.loadAuditLog = loadAuditLog;
    AP.renderActivityFeed = renderActivityFeed;
    AP.renderAuditTable = renderAuditTable;
    AP.toggleActivitySelectMode = toggleActivitySelectMode;
    AP.toggleActivitySelect = toggleActivitySelectMode;
    AP.deleteSelectedActivity = deleteSelectedActivity;
    AP.clearAllActivity = clearAllActivity;
    AP.clearAuditFilters = clearAuditFilters;
    AP.exportAuditCSV = exportAuditCSV;

    // F7.5: Bind HTML buttons (migrated from inline onclick)
    var btnSelect = $('btnSelectActivity');
    if (btnSelect) btnSelect.addEventListener('click', toggleActivitySelectMode);
    var btnClearAll = $('btnClearAllActivity');
    if (btnClearAll) btnClearAll.addEventListener('click', clearAllActivity);
    var btnDelSel = $('btnDeleteSelectedActivity');
    if (btnDelSel) btnDelSel.addEventListener('click', deleteSelectedActivity);
    var btnExportAudit = $('btnExportAuditCSV');
    if (btnExportAudit) btnExportAudit.addEventListener('click', exportAuditCSV);
    var btnClearFilters = $('btnClearAuditFilters');
    if (btnClearFilters) btnClearFilters.addEventListener('click', clearAuditFilters);
    AP.getActivityIcon = getActivityIcon;
    AP.getActivityText = getActivityText;
    AP.ACTION_CATEGORIES = ACTION_CATEGORIES;
})();
