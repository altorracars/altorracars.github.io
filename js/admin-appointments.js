// Admin Panel — Solicitudes, Calendar & Availability
(function() {
    'use strict';
    var AP = window.AP;
    var $ = AP.$;

    // ========== LABELS ==========
    var TIPO_LABELS = {
        test_drive: 'Prueba de manejo', compra: 'Quiero comprar',
        consulta_vehiculo: 'Consulta vehiculo', llamada: 'Agendar llamada',
        consignacion_venta: 'Vender mi auto', financiacion: 'Financiacion',
        consulta_general: 'Consulta general', peritaje: 'Peritaje',
        otro: 'Otro asunto', visita: 'Visita presencial',
        consignacion: 'Consignacion', inspeccion: 'Inspeccion vehicular',
        prueba: 'Prueba de manejo', entrega: 'Entrega de vehiculo',
        llamada_telefonica: 'Llamada telefonica', seguimiento: 'Seguimiento',
        financiacion_admin: 'Financiacion'
    };
    var ORIGEN_LABELS = {
        vehiculo: 'Pag. vehiculo', index: 'Pag. principal',
        contacto: 'Contacto', vende_tu_auto: 'Vende tu auto',
        financiacion: 'Financiacion', admin: 'Panel Admin', cliente: 'Sitio Web'
    };
    function tipoLabel(t) { return TIPO_LABELS[t] || (t ? t.charAt(0).toUpperCase() + t.slice(1) : 'General'); }
    function origenLabel(o) { return ORIGEN_LABELS[o] || (o ? o.charAt(0).toUpperCase() + o.slice(1) : 'Web'); }

    // ========== WHATSAPP HELPERS ==========
    function buildWhatsappMessage(sol, nuevoEstado) {
        var nombre = sol.nombre || 'Cliente';
        var tipo = tipoLabel(sol.tipo || sol.tipoCita || '');
        var fecha = sol.fecha || '';
        var hora = sol.hora || '';
        var vehiculo = sol.vehiculo || '';
        var obs = sol.observaciones || '';
        var msgs = {
            confirmada: 'Hola ' + nombre + ', te confirmamos tu solicitud de *' + tipo + '*'
                + (vehiculo ? ' para el vehiculo *' + vehiculo + '*' : '')
                + (fecha ? ' el dia *' + fecha + '*' : '') + (hora ? ' a las *' + hora + '*' : '')
                + '. Te esperamos! — ALTORRA CARS',
            reprogramada: 'Hola ' + nombre + ', tu solicitud de *' + tipo + '* ha sido reprogramada'
                + (fecha ? ' para el *' + fecha + '*' : '') + (hora ? ' a las *' + hora + '*' : '')
                + '. Si necesitas otro horario, contactanos. — ALTORRA CARS',
            cancelada: 'Hola ' + nombre + ', lamentamos informarte que tu solicitud de *' + tipo + '* ha sido cancelada.'
                + (obs ? ' Motivo: ' + obs : '') + ' Si deseas agendar otra, visitanos en altorracars.github.io — ALTORRA CARS',
            completada: 'Hola ' + nombre + ', tu solicitud de *' + tipo + '* ha sido completada. Gracias por confiar en ALTORRA CARS!',
            pendiente: 'Hola ' + nombre + ', hemos recibido tu solicitud de *' + tipo + '*'
                + (fecha ? ' para el *' + fecha + '*' : '') + '. En breve te confirmaremos. — ALTORRA CARS'
        };
        return msgs[nuevoEstado] || msgs.pendiente;
    }
    function buildWhatsappUrl(sol, message) {
        var prefix = (sol.prefijoPais || '+57').replace('+', '');
        var phone = (sol.telefono || sol.whatsapp || '').replace(/[^0-9]/g, '');
        if (!phone) return '';
        return 'https://wa.me/' + prefix + phone + '?text=' + encodeURIComponent(message);
    }

    // ========== MF3.1 + MF3.2 — KIND TABS + estado filter rebuild ==========
    function rebuildEstadoFilterForKind(kind) {
        var filterEl = $('appointmentFilter');
        if (!filterEl) return;
        var schema = window.AltorraCommSchema;
        if (!schema) return;

        var states;
        if (!kind || kind === 'all') {
            // Union of all states across the 3 kinds, dedup-ed
            var seen = {};
            states = [];
            Object.keys(schema.STATES).forEach(function (k) {
                schema.STATES[k].forEach(function (s) {
                    if (!seen[s]) { seen[s] = true; states.push(s); }
                });
            });
        } else {
            states = schema.STATES[kind] || [];
        }

        var current = filterEl.value;
        var html = '<option value="all">Todas</option>';
        states.forEach(function (s) {
            var lbl = schema.STATE_LABELS[s] || (s.charAt(0).toUpperCase() + s.slice(1));
            html += '<option value="' + s + '">' + lbl + '</option>';
        });
        filterEl.innerHTML = html;
        // Preserve current selection if still valid; else fall back to 'all'
        if (current && (current === 'all' || states.indexOf(current) !== -1)) {
            filterEl.value = current;
        } else {
            filterEl.value = 'all';
        }
    }

    var commKindTabsEl = document.querySelector('.comm-kind-tabs');
    if (commKindTabsEl) {
        commKindTabsEl.addEventListener('click', function (e) {
            var btn = e.target.closest('.comm-kind-tab');
            if (!btn) return;
            var kind = btn.getAttribute('data-kind-filter');
            if (!kind) return;
            // Update active state
            commKindTabsEl.querySelectorAll('.comm-kind-tab').forEach(function (b) {
                var on = b === btn;
                b.classList.toggle('active', on);
                b.setAttribute('aria-selected', on ? 'true' : 'false');
            });
            AP._kindFilter = kind;
            // MF3.2 — rebuild estado filter to show only valid states for this kind
            rebuildEstadoFilterForKind(kind);
            // Reset pagination since filter changed
            if (AP._pagination && AP._pagination.appointments) AP._pagination.appointments.page = 1;
            renderAppointmentsTable();
        });

        // Initial rebuild for the default 'all' kind
        // Run once schema is available (it loads as a separate script)
        if (window.AltorraCommSchema) {
            rebuildEstadoFilterForKind('all');
        } else {
            var attempts = 0;
            var int = setInterval(function () {
                attempts++;
                if (window.AltorraCommSchema) {
                    rebuildEstadoFilterForKind('all');
                    clearInterval(int);
                } else if (attempts > 40) {
                    clearInterval(int);
                }
            }, 100);
        }
    }

    // ========== LOAD SOLICITUDES ==========
    // Admin notification baseline (Pillar F): set of doc IDs seen in
    // the first snapshot so we don't spam the bell on every page load.
    var _adminSeenIds = null;

    function loadAppointments() {
        if (AP.unsubAppointments) AP.unsubAppointments();
        AP.unsubAppointments = window.db.collection('solicitudes').orderBy('createdAt', 'desc').onSnapshot(function(snap) {
            AP.appointments = snap.docs.map(function(doc) { return Object.assign({ _docId: doc.id }, doc.data()); });

            // MF1.2 — one-shot migration: infer kind + remap estado for legacy docs
            try { if (typeof AP.migrateCommunicationsSchema === 'function') AP.migrateCommunicationsSchema(AP.appointments); } catch (e) {}

            renderAppointmentsTable();
            // MF3.5 — also refresh kanban if it's the active view
            if (AP._commView === 'kanban') renderKanban();
            renderAdminCalendar(); // refresh calendar counts
            var pending = AP.appointments.filter(function(a) { return a.estado === 'pendiente'; }).length;
            var badge = $('navBadgeAppointments');
            if (badge) badge.textContent = pending > 0 ? pending : '';

            // Pillar F1+F2 — detect newly created pending docs and notify admin
            try { detectAdminNewSolicitudes(snap); } catch (e) {}
        }, function(err) {
            // Cross-tab signOut: auth goes null before stopRealtimeSync runs — expected, not an error
            if (!window.auth || !window.auth.currentUser) return;
            console.warn('[Solicitudes] Error loading:', err);
        });
    }

    /**
     * Detects new pending solicitudes since the admin's last seen snapshot
     * and emits to the notification center. Skips the FIRST snapshot (just
     * builds the baseline). Skips if admin's role is viewer (no actionable
     * power). Uses entityRef for cross-tab dedup.
     */
    function detectAdminNewSolicitudes(snap) {
        if (!window.notifyCenter || typeof window.notifyCenter.notify !== 'function') return;
        // Skip if not yet authenticated as admin (defensive)
        if (!AP || !AP.currentUserRole) return;
        // Viewer doesn't need actionable alerts
        if (AP.currentUserRole === 'viewer') return;

        // First snapshot → baseline only
        if (_adminSeenIds === null) {
            _adminSeenIds = {};
            snap.docs.forEach(function(d) { _adminSeenIds[d.id] = true; });
            return;
        }

        snap.docChanges().forEach(function(change) {
            var id = change.doc.id;
            if (change.type === 'added' && !_adminSeenIds[id]) {
                _adminSeenIds[id] = true;
                var data = change.doc.data();
                // Only alert on pending — already-handled docs aren't actionable
                if (data.estado !== 'pendiente') return;
                var isCita = !!data.requiereCita;
                var name = data.nombre || 'Cliente';
                var vehiculo = data.vehiculo || (data.datosExtra && data.datosExtra.vehiculo) || '';
                var category = isCita ? 'appointment_update' : 'request_update';
                window.notifyCenter.notify(category, {
                    title: isCita ? 'Nueva cita por agendar' : 'Nueva solicitud',
                    message: name + (vehiculo ? ' — ' + vehiculo : ''),
                    link: 'admin.html#solicitudes',
                    entityRef: (isCita ? 'admin-cita:' : 'admin-solicitud:') + id,
                    priority: 'high'
                });
            } else if (change.type === 'modified' && _adminSeenIds[id]) {
                // Track but don't notify on every modification (admin
                // doesn't need an alert when they themselves update a doc)
            } else if (change.type === 'removed') {
                delete _adminSeenIds[id];
            }
        });
    }

    // ========== FILTERS ==========
    var appointmentFilterEl = $('appointmentFilter');
    if (appointmentFilterEl) {
        appointmentFilterEl.addEventListener('change', function() {
            if (AP._pagination) AP._pagination.appointments.page = 1;
            renderAppointmentsTable();
        });
    }
    var tipoFilterEl = $('tipoFilter');
    if (tipoFilterEl) {
        tipoFilterEl.addEventListener('change', function() {
            if (AP._pagination) AP._pagination.appointments.page = 1;
            renderAppointmentsTable();
        });
    }
    var origenFilterEl = $('origenFilter');
    if (origenFilterEl) {
        origenFilterEl.addEventListener('change', function() {
            if (AP._pagination) AP._pagination.appointments.page = 1;
            renderAppointmentsTable();
        });
    }

    var appointmentSearchEl = $('appointmentSearchInput');
    if (appointmentSearchEl) {
        var _appSearchTimeout;
        appointmentSearchEl.addEventListener('input', function() {
            clearTimeout(_appSearchTimeout);
            _appSearchTimeout = setTimeout(function() {
                if (AP._pagination) AP._pagination.appointments.page = 1;
                renderAppointmentsTable();
            }, 250);
        });
    }

    var dateFromEl = $('dateFromFilter');
    var dateToEl = $('dateToFilter');
    var clearDatesBtn = $('clearDateFilters');
    function onDateFilterChange() {
        if (AP._pagination) AP._pagination.appointments.page = 1;
        if (clearDatesBtn) clearDatesBtn.style.display = (dateFromEl.value || dateToEl.value) ? '' : 'none';
        renderAppointmentsTable();
    }
    if (dateFromEl) dateFromEl.addEventListener('change', onDateFilterChange);
    if (dateToEl) dateToEl.addEventListener('change', onDateFilterChange);
    if (clearDatesBtn) {
        clearDatesBtn.addEventListener('click', function() {
            if (dateFromEl) dateFromEl.value = '';
            if (dateToEl) dateToEl.value = '';
            clearDatesBtn.style.display = 'none';
            if (AP._pagination) AP._pagination.appointments.page = 1;
            renderAppointmentsTable();
        });
    }

    // ========== MF3.5 — KANBAN VIEW ==========
    AP._commView = AP._commView || 'table';
    function renderKanban() {
        var schema = window.AltorraCommSchema;
        var container = document.getElementById('commKanbanView');
        if (!container || !schema) return;

        // Determine which kind we're rendering. If "all", default to solicitud
        // states (most useful for general overview).
        var activeKind = (AP._kindFilter && AP._kindFilter !== 'all') ? AP._kindFilter : 'solicitud';
        var states = schema.STATES[activeKind] || [];
        if (!states.length) return;

        // Filter docs by current kind
        var docs = AP.appointments.slice();
        if (AP._kindFilter && AP._kindFilter !== 'all') {
            docs = docs.filter(function (a) { return getKindOf(a) === AP._kindFilter; });
        }

        // Group by estado
        var groups = {};
        states.forEach(function (s) { groups[s] = []; });
        docs.forEach(function (a) {
            var k = getKindOf(a);
            if (k !== activeKind) return;
            var e = a.estado || schema.getDefaultState(k);
            if (groups[e]) groups[e].push(a);
        });

        var html = states.map(function (state) {
            var label = schema.STATE_LABELS[state] || state;
            var items = groups[state];
            var cards = items.map(function (a) {
                var kind = getKindOf(a);
                var priority = a.priority || 'media';
                var name = AP.escapeHtml(a.nombre || '-');
                var vehic = AP.escapeHtml(a.vehiculo || '-');
                return '<div class="comm-kanban-card" draggable="true" ' +
                    'data-id="' + AP.escapeHtml(a._docId) + '" ' +
                    'data-state="' + AP.escapeHtml(state) + '" ' +
                    'data-kind="' + AP.escapeHtml(kind) + '">' +
                    '<div class="comm-kanban-card-name">' + name + '</div>' +
                    '<div class="comm-kanban-card-vehiculo">' + vehic + '</div>' +
                    '<div class="comm-kanban-card-meta">' +
                        '<span class="comm-kanban-card-priority" data-priority="' + priority + '">' + priority + '</span>' +
                        (a.assignedToName ? '<span>· ' + AP.escapeHtml(a.assignedToName) + '</span>' : '') +
                    '</div>' +
                '</div>';
            }).join('');
            if (!cards) cards = '<div class="comm-kanban-empty">Sin ' + label.toLowerCase() + '</div>';
            return '<div class="comm-kanban-col" data-state="' + state + '">' +
                '<div class="comm-kanban-col-head">' +
                    '<span>' + label + '</span>' +
                    '<span class="comm-kanban-col-count">' + items.length + '</span>' +
                '</div>' +
                '<div class="comm-kanban-col-body" data-drop-target="' + state + '">' + cards + '</div>' +
            '</div>';
        }).join('');

        container.innerHTML = html;
        wireKanbanDragDrop(container);
    }

    function wireKanbanDragDrop(container) {
        var dragged = null;
        container.querySelectorAll('.comm-kanban-card').forEach(function (card) {
            card.addEventListener('dragstart', function (e) {
                dragged = card;
                card.classList.add('is-dragging');
                if (e.dataTransfer) e.dataTransfer.effectAllowed = 'move';
            });
            card.addEventListener('dragend', function () {
                card.classList.remove('is-dragging');
                dragged = null;
            });
            // Click on card → open manage modal
            card.addEventListener('click', function () {
                var id = card.getAttribute('data-id');
                if (id && typeof manageAppointment === 'function') manageAppointment(id);
            });
        });

        container.querySelectorAll('.comm-kanban-col-body').forEach(function (col) {
            col.addEventListener('dragover', function (e) {
                e.preventDefault();
                col.parentElement.classList.add('is-dragover');
                if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
            });
            col.addEventListener('dragleave', function () {
                col.parentElement.classList.remove('is-dragover');
            });
            col.addEventListener('drop', function (e) {
                e.preventDefault();
                col.parentElement.classList.remove('is-dragover');
                if (!dragged) return;
                var newState = col.getAttribute('data-drop-target');
                var docId = dragged.getAttribute('data-id');
                var oldState = dragged.getAttribute('data-state');
                if (!docId || !newState || newState === oldState) return;
                // Persist via Firestore
                window.db.collection('solicitudes').doc(docId).update({
                    estado: newState,
                    updatedAt: new Date().toISOString(),
                    updatedBy: (window.auth.currentUser && window.auth.currentUser.email) || 'admin'
                }).then(function () {
                    if (AP.toast) AP.toast('Estado actualizado a: ' + (window.AltorraCommSchema.STATE_LABELS[newState] || newState));
                    if (AP.writeAuditLog) AP.writeAuditLog('appointment_kanban_drag', 'solicitud ' + docId, oldState + ' → ' + newState);
                    // Optimistic update — full re-render comes via onSnapshot
                    col.appendChild(dragged);
                    dragged.dataset.state = newState;
                }).catch(function (err) {
                    if (AP.toast) AP.toast('Error: ' + err.message, 'error');
                });
            });
        });
    }

    // View toggle wiring
    document.addEventListener('click', function (e) {
        var btn = e.target.closest('.comm-view-btn');
        if (!btn) return;
        var view = btn.getAttribute('data-view');
        if (!view) return;
        document.querySelectorAll('.comm-view-btn').forEach(function (b) {
            var on = b === btn;
            b.classList.toggle('active', on);
            b.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        AP._commView = view;
        var tableEl = document.getElementById('commTableView');
        var kanbanEl = document.getElementById('commKanbanView');
        if (view === 'kanban') {
            if (tableEl) tableEl.hidden = true;
            if (kanbanEl) kanbanEl.hidden = false;
            renderKanban();
            if (window.lucide) try { window.lucide.createIcons(); } catch (e2) {}
        } else {
            if (tableEl) tableEl.hidden = false;
            if (kanbanEl) kanbanEl.hidden = true;
        }
    });

    // ========== SOLICITUDES TABLE ==========
    // MF3.1 — kind filter applied first, then existing per-state filters
    AP._kindFilter = AP._kindFilter || 'all';
    function getKindOf(a) {
        if (a && a.kind) return a.kind;
        // Fallback inference for legacy docs not yet migrated
        if (window.AltorraCommSchema && window.AltorraCommSchema.inferKind) {
            return window.AltorraCommSchema.inferKind(a);
        }
        return a && a.requiereCita ? 'cita' : 'solicitud';
    }

    function updateKindBadges() {
        var counts = { all: 0, cita: 0, solicitud: 0, lead: 0 };
        // Count "pendientes/nuevos" (the unhandled state per kind) only
        AP.appointments.forEach(function (a) {
            var k = getKindOf(a);
            var unhandled = (k === 'lead' && a.estado === 'nuevo')
                || (k !== 'lead' && a.estado === 'pendiente');
            if (unhandled) {
                counts[k]++;
                counts.all++;
            }
        });
        ['All', 'Cita', 'Solicitud', 'Lead'].forEach(function (key) {
            var el = $('commKindBadge' + key);
            if (!el) return;
            var n = counts[key.toLowerCase()];
            el.textContent = n > 0 ? String(n) : '';
            el.classList.toggle('is-zero', n === 0);
        });
    }

    function renderAppointmentsTable() {
        var body = $('appointmentsBody');
        if (!body) return;

        var filterEl = $('appointmentFilter');
        var filter = filterEl ? filterEl.value : 'all';
        var tipoF = tipoFilterEl ? tipoFilterEl.value : 'all';
        var origenF = origenFilterEl ? origenFilterEl.value : 'all';
        var dateFrom = dateFromEl ? dateFromEl.value : '';
        var dateTo = dateToEl ? dateToEl.value : '';
        var searchQ = appointmentSearchEl ? appointmentSearchEl.value.trim().toLowerCase() : '';

        // Update tab counters from the unfiltered base set
        updateKindBadges();

        var filtered = AP.appointments.slice();
        // MF3.1 — kind filter applied first
        if (AP._kindFilter && AP._kindFilter !== 'all') {
            filtered = filtered.filter(function (a) { return getKindOf(a) === AP._kindFilter; });
        }
        if (filter !== 'all') filtered = filtered.filter(function(a) { return a.estado === filter; });
        if (tipoF !== 'all') filtered = filtered.filter(function(a) { return (a.tipo || a.tipoCita || '') === tipoF; });
        if (origenF !== 'all') filtered = filtered.filter(function(a) { return (a.origen || '') === origenF; });

        if (searchQ) {
            filtered = filtered.filter(function(a) {
                return (a.nombre || '').toLowerCase().indexOf(searchQ) !== -1 ||
                    (a.email || '').toLowerCase().indexOf(searchQ) !== -1 ||
                    (a.vehiculo || '').toLowerCase().indexOf(searchQ) !== -1 ||
                    (a.telefono || a.whatsapp || '').indexOf(searchQ) !== -1;
            });
        }
        if (dateFrom) {
            filtered = filtered.filter(function(a) {
                var d = a.fecha || (a.createdAt && typeof a.createdAt.toDate === 'function' ? a.createdAt.toDate().toISOString().slice(0, 10) : '');
                return d >= dateFrom;
            });
        }
        if (dateTo) {
            filtered = filtered.filter(function(a) {
                var d = a.fecha || (a.createdAt && typeof a.createdAt.toDate === 'function' ? a.createdAt.toDate().toISOString().slice(0, 10) : '');
                return d <= dateTo;
            });
        }

        if (AP._sorting && AP._sorting.appointments && AP._sorting.appointments.col) {
            filtered = AP.sortData(filtered, 'appointments');
        }

        var totalFiltered = filtered.length;

        if (filtered.length === 0) {
            body.innerHTML = '<tr><td colspan="9" style="text-align:center;color:var(--admin-text-muted);padding:2rem;">No hay solicitudes ' + (filter === 'all' ? '' : filter + 's') + '</td></tr>';
            if (AP.renderPagination) AP.renderPagination('appointmentsPagination', 'appointments', 0);
            return;
        }

        if (AP.paginate) filtered = AP.paginate(filtered, 'appointments');

        body.innerHTML = filtered.map(function(a) {
            // MF3.2 — labels + colors come from the kind-aware schema
            var schema = window.AltorraCommSchema;
            var kind = getKindOf(a);
            var estado = a.estado || (schema ? schema.getDefaultState(kind) : 'pendiente');
            var estadoLbl = (schema && schema.STATE_LABELS[estado]) || (estado.charAt(0).toUpperCase() + estado.slice(1));
            var estadoClass = (schema && schema.STATE_COLORS[estado]) || 'admin-warning';

            // MF3.6 — SLA semaforo (only for unhandled docs)
            var slaDot = '';
            var unhandled = (kind === 'lead' && estado === 'nuevo')
                || (kind !== 'lead' && estado === 'pendiente');
            if (unhandled && a.slaDeadline) {
                var deadlineMs = new Date(a.slaDeadline).getTime();
                var now = Date.now();
                var totalSlaMs = a.slaMs || (2 * 60 * 60 * 1000);
                var remaining = deadlineMs - now;
                var pct = remaining / totalSlaMs;
                var color = '#22c55e', label = 'A tiempo';
                if (remaining <= 0) { color = '#ef4444'; label = 'Vencido'; }
                else if (pct < 0.5) { color = '#eab308'; label = 'Pronto'; }
                slaDot = '<span class="sla-dot" title="SLA: ' + label + '" style="background:' + color + ';"></span>';
            }

            var prefix = (a.prefijoPais || '').replace('+', '');
            var phone = a.telefono || a.whatsapp || '';
            var phoneClean = phone.replace(/[^0-9]/g, '');
            var waNum = prefix ? prefix + phoneClean : phoneClean;

            var tipo = a.tipo || a.tipoCita || '';
            var origen = a.origen || 'cliente';
            var tLabel = tipoLabel(tipo);
            var oLabel = origenLabel(origen);
            var origenColor = origen === 'admin' ? 'admin-info' : 'admin-text-muted';

            return '<tr>' +
                '<td><strong>' + AP.escapeHtml(a.nombre || '-') + '</strong></td>' +
                '<td>' +
                    '<div style="font-size:0.85rem;display:flex;align-items:center;gap:4px;">' +
                        (waNum ? '<a href="https://wa.me/' + waNum + '" target="_blank" style="color:var(--admin-success);text-decoration:none;" title="WhatsApp">' + AP.escapeHtml((a.prefijoPais || '') + ' ' + phone) + '</a>' : AP.escapeHtml(phone || '-')) +
                    '</div>' +
                    '<div style="font-size:0.75rem;color:var(--admin-text-muted);">' + AP.escapeHtml(a.email || '-') + '</div>' +
                '</td>' +
                '<td><span style="font-size:0.8rem;font-weight:600;">' + AP.escapeHtml(tLabel) + '</span></td>' +
                '<td><span style="color:var(--' + origenColor + ');font-size:0.75rem;">' + AP.escapeHtml(oLabel) + '</span></td>' +
                '<td>' + AP.escapeHtml(a.vehiculo || '-') + '</td>' +
                '<td>' + (a.fecha ? '<div>' + AP.escapeHtml(a.fecha) + '</div><div style="font-weight:600;">' + AP.escapeHtml(a.hora || '-') + '</div>' : '<span style="color:var(--admin-text-muted);font-size:0.8rem;">N/A</span>') + '</td>' +
                '<td>' + slaDot + '<span style="color:var(--' + estadoClass + ');font-weight:600;font-size:0.85rem;">' + estadoLbl + '</span></td>' +
                '<td style="max-width:150px;font-size:0.8rem;color:var(--admin-text-muted);">' + AP.escapeHtml(a.observaciones || a.comentarios || a.mensaje || '-') + '</td>' +
                '<td style="white-space:nowrap;">' +
                    (AP.RBAC.canManageAppointment() ? '<button class="btn btn-sm btn-ghost" data-action="manageAppointment" data-id="' + AP.escapeHtml(a._docId) + '" title="Gestionar">Gestionar</button>' : '') +
                    (AP.RBAC.canDeleteAppointment() ? ' <button class="btn btn-sm btn-danger" data-action="deleteAppointment" data-id="' + AP.escapeHtml(a._docId) + '" title="Eliminar">&times;</button>' : '') +
                '</td>' +
            '</tr>';
        }).join('');

        document.querySelectorAll('#appointmentsTable th[data-sort]').forEach(function(th) {
            var col = th.getAttribute('data-sort');
            var si = th.querySelector('.sort-icon'); if (si) si.remove(); var text = th.textContent.trim();
            th.innerHTML = text + ' ' + (AP.getSortIndicator ? AP.getSortIndicator('appointments', col) : '');
        });

        if (AP.renderPagination) AP.renderPagination('appointmentsPagination', 'appointments', totalFiltered);
    }

    // ========== DELETE APPOINTMENT ==========
    function deleteAppointment(docId) {
        if (!AP.RBAC.canDeleteAppointment()) { AP.toast('Solo Super Admin puede eliminar solicitudes', 'error'); return; }
        if (!confirm('Eliminar esta solicitud? Esta accion no se puede deshacer.')) return;
        window.db.collection('solicitudes').doc(docId).delete().then(function() {
            AP.toast('Solicitud eliminada');
            AP.writeAuditLog('appointment_delete', 'solicitud ' + docId, '');
        }).catch(function(err) {
            AP.toast('Error: ' + err.message, 'error');
        });
    }

    // ========== MANAGE SOLICITUD MODAL ==========
    var _currentManageSol = null;

    // MF3.6 — Built-in response templates with variable interpolation
    var RESPONSE_TEMPLATES = {
        cita: {
            confirmada: { label: 'Confirmar cita', text: 'Hola {{nombre}}, tu cita para ver el {{vehiculo}} queda confirmada para el {{fecha}} a las {{hora}}. Te esperamos en nuestra sede en Cartagena. Cualquier cambio, escríbenos.' },
            reprogramada: { label: 'Reprogramar', text: 'Hola {{nombre}}, tuvimos que reprogramar tu cita para el {{fecha}} a las {{hora}}. Confirma respondiendo este mensaje. ¡Gracias por tu paciencia!' },
            cancelada: { label: 'Cancelar', text: 'Hola {{nombre}}, lamentamos informarte que tu cita para el {{vehiculo}} ha sido cancelada. Si quieres reagendar, estamos atentos.' }
        },
        solicitud: {
            contactado: { label: 'Te llamaremos', text: 'Hola {{nombre}}, recibimos tu solicitud sobre {{vehiculo}}. Un asesor te contactará en las próximas horas para revisar los detalles.' },
            aprobada: { label: 'Aprobada', text: 'Hola {{nombre}}, ¡buenas noticias! Tu solicitud sobre {{vehiculo}} fue aprobada. Te contactaremos para coordinar los siguientes pasos.' },
            rechazada: { label: 'Rechazada amable', text: 'Hola {{nombre}}, gracias por tu interés en {{vehiculo}}. En esta ocasión no podemos avanzar con tu solicitud, pero te invitamos a revisar otras opciones en nuestro catálogo.' },
            en_revision: { label: 'En revisión', text: 'Hola {{nombre}}, estamos revisando tu solicitud sobre {{vehiculo}}. Pronto te contactaremos con la respuesta.' }
        },
        lead: {
            contactado: { label: 'Te contactamos', text: 'Hola {{nombre}}, gracias por escribirnos. Un asesor te responderá pronto. Mientras tanto puedes ver nuestro catálogo en altorracars.github.io.' },
            interesado: { label: 'Sigue interesado', text: 'Hola {{nombre}}, queremos saber si sigues interesado en {{vehiculo}}. Cuéntanos cómo podemos ayudarte.' }
        }
    };

    function applyTemplateVariables(text, doc) {
        if (!text) return '';
        return text
            .replace(/\{\{nombre\}\}/g, (doc.nombre || 'cliente'))
            .replace(/\{\{vehiculo\}\}/g, (doc.vehiculo || 'el vehículo'))
            .replace(/\{\{fecha\}\}/g, (doc.fecha || 'fecha por confirmar'))
            .replace(/\{\{hora\}\}/g, (doc.hora || 'hora por confirmar'))
            .replace(/\{\{tipo\}\}/g, (doc.tipo || 'consulta'));
    }

    function injectTemplateBlock(doc) {
        var modal = $('appointmentModal');
        if (!modal) return;
        // Remove old template block if any
        var prev = document.getElementById('amTemplateBlock');
        if (prev) prev.remove();

        var kind = getKindOf(doc);
        var tpls = RESPONSE_TEMPLATES[kind] || {};
        var keys = Object.keys(tpls);
        if (!keys.length) return;

        var observacionesGroup = $('amObservaciones');
        if (!observacionesGroup) return;
        var insertBefore = observacionesGroup.closest('.form-group') || observacionesGroup;

        var block = document.createElement('div');
        block.id = 'amTemplateBlock';
        block.className = 'am-template-block';
        block.innerHTML =
            '<label>Plantilla de respuesta rápida</label>' +
            '<div class="am-template-row">' +
                '<select class="am-template-select" id="amTemplateSelect">' +
                    '<option value="">Seleccionar plantilla...</option>' +
                    keys.map(function (k) {
                        return '<option value="' + k + '">' + tpls[k].label + '</option>';
                    }).join('') +
                '</select>' +
                '<button type="button" class="am-template-apply" id="amTemplateApply" disabled>Aplicar</button>' +
            '</div>';
        insertBefore.parentNode.insertBefore(block, insertBefore);

        var sel = block.querySelector('#amTemplateSelect');
        var btn = block.querySelector('#amTemplateApply');
        sel.addEventListener('change', function () {
            btn.disabled = !sel.value;
        });
        btn.addEventListener('click', function () {
            var tpl = tpls[sel.value];
            if (!tpl) return;
            var rendered = applyTemplateVariables(tpl.text, doc);
            // Append to observaciones (don't overwrite if there's already content)
            var current = observacionesGroup.value || '';
            observacionesGroup.value = current
                ? (current + '\n\n' + rendered)
                : rendered;
            observacionesGroup.focus();
            sel.value = '';
            btn.disabled = true;
        });
    }

    // ========== MF3.3 — TIMELINE + CONTEXTUAL ACTIONS ==========
    function injectTimelineBlock(doc) {
        var modal = $('appointmentModal');
        if (!modal) return;
        var prev = document.getElementById('amTimelineBlock');
        if (prev) prev.remove();

        // Timeline source: prefer subcollection 'historial', fallback to scratch
        // events derived from the doc itself (createdAt, updatedAt)
        var block = document.createElement('div');
        block.id = 'amTimelineBlock';
        block.className = 'am-timeline-block';
        block.innerHTML = '<div class="am-timeline-title"><i data-lucide="clock-3" width="14" height="14"></i> Historial</div>' +
            '<div class="am-timeline-list" id="amTimelineList">' +
                '<div class="am-timeline-loading">Cargando historial...</div>' +
            '</div>';

        // Insert before the kind badge / observaciones area (after datos)
        var insertBefore = $('amDatosExtra') || $('amObservaciones');
        if (insertBefore && insertBefore.parentNode) {
            insertBefore.parentNode.insertBefore(block, insertBefore.nextSibling || insertBefore);
        }

        // Build timeline from doc + auditLog query (best-effort)
        var events = [];
        if (doc.createdAt) {
            events.push({ at: doc.createdAt, label: 'Creada', user: doc.createdBy || (doc.userEmail || 'cliente') });
        }
        if (doc.updatedAt && doc.updatedAt !== doc.createdAt) {
            events.push({ at: doc.updatedAt, label: 'Actualizada → ' + (doc.estado || ''), user: doc.updatedBy || 'admin' });
        }
        if (doc._migration_v1) {
            events.push({ at: doc._migrationAt || doc.createdAt, label: 'Migrada al schema v1 (kind: ' + doc.kind + ')', user: 'sistema' });
        }
        events.sort(function (a, b) { return new Date(a.at) - new Date(b.at); });

        var list = block.querySelector('#amTimelineList');
        if (!events.length) {
            list.innerHTML = '<div class="am-timeline-empty">Sin eventos previos.</div>';
        } else {
            list.innerHTML = events.map(function (e) {
                var when = '';
                try { when = new Date(e.at).toLocaleString('es-CO', { dateStyle: 'short', timeStyle: 'short' }); }
                catch (_) { when = e.at; }
                return '<div class="am-timeline-row">' +
                    '<span class="am-timeline-dot"></span>' +
                    '<div class="am-timeline-content">' +
                        '<div class="am-timeline-when">' + AP.escapeHtml(when) + '</div>' +
                        '<div class="am-timeline-label">' + AP.escapeHtml(e.label) + '</div>' +
                        '<div class="am-timeline-user">por ' + AP.escapeHtml(e.user) + '</div>' +
                    '</div>' +
                '</div>';
            }).join('');
        }
        if (window.lucide) try { window.lucide.createIcons(); } catch (e) {}
    }

    function injectContextualActions(doc) {
        var prev = document.getElementById('amContextActions');
        if (prev) prev.remove();

        var modal = $('appointmentModal');
        if (!modal) return;

        var kind = getKindOf(doc);
        // Per-kind quick action buttons
        var actions = [];
        if (kind === 'cita') {
            actions = [
                { label: 'Confirmar', state: 'confirmada', cls: 'btn-success' },
                { label: 'Marcar no asistió', state: 'no_show', cls: 'btn-warning' }
            ];
        } else if (kind === 'solicitud') {
            actions = [
                { label: 'Marcar contactado', state: 'contactado', cls: 'btn-info' },
                { label: 'Aprobar', state: 'aprobada', cls: 'btn-success' }
            ];
        } else if (kind === 'lead') {
            actions = [
                { label: 'Marcar contactado', state: 'contactado', cls: 'btn-info' },
                { label: 'Convertir a solicitud', action: 'convert', cls: 'btn-primary' }
            ];
        }
        if (!actions.length) return;

        var block = document.createElement('div');
        block.id = 'amContextActions';
        block.className = 'am-context-actions';
        block.innerHTML = '<label>Acciones rápidas</label>' +
            '<div class="am-context-actions-row">' +
                actions.map(function (a) {
                    return '<button type="button" class="btn btn-sm ' + a.cls + '" ' +
                        (a.state ? 'data-quick-state="' + a.state + '"' : 'data-quick-action="' + a.action + '"') +
                        '>' + a.label + '</button>';
                }).join('') +
            '</div>';

        var insertBefore = document.getElementById('amTemplateBlock')
            || $('amObservaciones').closest('.form-group')
            || $('amObservaciones');
        if (insertBefore && insertBefore.parentNode) {
            insertBefore.parentNode.insertBefore(block, insertBefore);
        }

        // Wire actions
        block.addEventListener('click', function (e) {
            var btn = e.target.closest('button[data-quick-state], button[data-quick-action]');
            if (!btn) return;
            var quickState = btn.getAttribute('data-quick-state');
            var quickAction = btn.getAttribute('data-quick-action');
            if (quickState) {
                var sel = $('amEstado');
                if (sel) {
                    sel.value = quickState;
                    sel.dispatchEvent(new Event('change'));
                }
            } else if (quickAction === 'convert') {
                // Lead → Solicitud conversion
                if (!confirm('¿Convertir este lead en una solicitud? Se creará un nuevo doc.')) return;
                window.db.collection('solicitudes').add(Object.assign({}, doc, {
                    kind: 'solicitud',
                    estado: 'pendiente',
                    convertedFromLead: doc._docId,
                    createdAt: new Date().toISOString()
                })).then(function () {
                    // Mark original lead as converted
                    return window.db.collection('solicitudes').doc(doc._docId).update({
                        estado: 'convertido',
                        updatedAt: new Date().toISOString()
                    });
                }).then(function () {
                    if (AP.toast) AP.toast('Lead convertido a solicitud');
                    $('appointmentModal').classList.remove('active');
                }).catch(function (err) {
                    if (AP.toast) AP.toast('Error: ' + err.message, 'error');
                });
            }
        });
    }

    function manageAppointment(docId) {
        var a = AP.appointments.find(function(x) { return x._docId === docId; });
        if (!a) return;
        _currentManageSol = a;
        // MF3.6 — inject response templates block
        try { injectTemplateBlock(a); } catch (e) {}
        // MF3.3 — inject timeline + contextual quick actions
        try { injectTimelineBlock(a); } catch (e) {}
        try { injectContextualActions(a); } catch (e) {}

        // MF3.2 — rebuild estado dropdown based on doc's kind
        var schema = window.AltorraCommSchema;
        var kind = getKindOf(a);
        var validStates = (schema && schema.STATES[kind]) || ['pendiente'];
        var amEstadoSel = $('amEstado');
        if (amEstadoSel) {
            amEstadoSel.innerHTML = validStates.map(function (s) {
                var lbl = (schema && schema.STATE_LABELS[s]) || (s.charAt(0).toUpperCase() + s.slice(1));
                return '<option value="' + s + '">' + lbl + '</option>';
            }).join('');
            // If current estado is valid for this kind, select it. Otherwise
            // fall back to the kind's default (this happens for legacy docs
            // not yet migrated whose old estado isn't in the new state set).
            var current = a.estado;
            if (current && validStates.indexOf(current) !== -1) {
                amEstadoSel.value = current;
            } else if (schema) {
                amEstadoSel.value = schema.getDefaultState(kind);
            }
        }

        // Show kind label inline for clarity
        var kindLabels = { cita: 'Cita', solicitud: 'Solicitud', lead: 'Lead' };
        var kindBadgeEl = document.getElementById('amKindBadge');
        if (!kindBadgeEl) {
            // Inject a small badge next to the modal title
            var modalHeader = document.querySelector('#appointmentModal .modal-header h2');
            if (modalHeader) {
                kindBadgeEl = document.createElement('span');
                kindBadgeEl.id = 'amKindBadge';
                kindBadgeEl.className = 'comm-kind-tab-badge';
                modalHeader.appendChild(kindBadgeEl);
            }
        }
        if (kindBadgeEl) {
            kindBadgeEl.textContent = kindLabels[kind] || kind;
            kindBadgeEl.dataset.kind = kind;
        }

        $('amDocId').value = docId;
        $('amObservaciones').value = a.observaciones || '';

        var prefix = (a.prefijoPais || '').replace('+', '');
        var phone = (a.telefono || a.whatsapp || '').replace(/[^0-9]/g, '');
        var waNum = prefix ? prefix + phone : phone;

        $('amClientInfo').innerHTML =
            '<strong>' + AP.escapeHtml(a.nombre || '') + '</strong><br>' +
            'Telefono: <a href="https://wa.me/' + waNum + '" target="_blank" style="color:var(--admin-success);">' + AP.escapeHtml((a.prefijoPais || '') + ' ' + (a.telefono || a.whatsapp || '-')) + '</a><br>' +
            'Email: ' + AP.escapeHtml(a.email || '-') + '<br>' +
            'Vehiculo: ' + AP.escapeHtml(a.vehiculo || '-') + '<br>' +
            (a.fecha ? 'Fecha: ' + AP.escapeHtml(a.fecha) + (a.hora ? ' | Hora: ' + AP.escapeHtml(a.hora) : '') + '<br>' : '') +
            'Tipo: <strong>' + AP.escapeHtml(tipoLabel(a.tipo || a.tipoCita || '')) + '</strong><br>' +
            'Origen: ' + AP.escapeHtml(origenLabel(a.origen || '')) +
            (a.comentarios ? '<br>Comentarios: ' + AP.escapeHtml(a.comentarios) : '') +
            (a.mensaje ? '<br>Mensaje: ' + AP.escapeHtml(a.mensaje) : '');

        // Show datosExtra if present
        var extraEl = $('amDatosExtra');
        if (extraEl) {
            var datos = a.datosExtra;
            if (datos && typeof datos === 'object' && Object.keys(datos).length > 0) {
                var extraLabels = {
                    precioVehiculo: 'Precio vehiculo', cuotaInicial: 'Cuota inicial',
                    plazo: 'Plazo', ingresos: 'Ingresos', situacionLaboral: 'Situacion laboral',
                    ciudad: 'Ciudad', marcaVehiculo: 'Marca', modeloVehiculo: 'Modelo',
                    yearVehiculo: 'Ano', kmVehiculo: 'Kilometraje', precioEsperado: 'Precio esperado'
                };
                var extraHtml = '<strong style="font-size:0.85rem;">Datos adicionales:</strong><br>';
                Object.keys(datos).forEach(function(k) {
                    if (datos[k]) extraHtml += '<span style="font-size:0.8rem;">' + AP.escapeHtml(extraLabels[k] || k) + ': <strong>' + AP.escapeHtml(String(datos[k])) + '</strong></span><br>';
                });
                extraEl.innerHTML = extraHtml;
                extraEl.style.display = '';
            } else {
                extraEl.style.display = 'none';
            }
        }

        // WhatsApp preview
        updateWhatsappPreview(a);
        toggleReprogramarGroup();
        $('appointmentModal').classList.add('active');
    }

    function updateWhatsappPreview(sol) {
        var section = $('amWhatsappSection');
        var preview = $('amWhatsappPreview');
        var btn = $('amWhatsappBtn');
        if (!section || !preview || !btn) return;
        var estado = $('amEstado').value;
        var merged = Object.assign({}, sol, { observaciones: $('amObservaciones').value || sol.observaciones });
        if (estado === 'reprogramada') {
            if ($('amNuevaFecha').value) merged.fecha = $('amNuevaFecha').value;
            if ($('amNuevaHora').value) merged.hora = $('amNuevaHora').value;
        }
        var msg = buildWhatsappMessage(merged, estado);
        preview.textContent = msg;
        var url = buildWhatsappUrl(sol, msg);
        if (url) { btn.href = url; section.style.display = ''; }
        else { section.style.display = 'none'; }
    }

    function toggleReprogramarGroup() {
        var group = $('amReprogramarGroup');
        if (!group) return;
        // MF3.2 — Reprogramar only applies to citas (state 'reprogramada' is
        // exclusive to kind 'cita' in the new state machine)
        var estado = $('amEstado').value;
        var kind = _currentManageSol ? getKindOf(_currentManageSol) : null;
        var show = (kind === 'cita') && (estado === 'reprogramada');
        group.style.display = show ? '' : 'none';
    }

    var amEstadoEl = $('amEstado');
    if (amEstadoEl) amEstadoEl.addEventListener('change', function() {
        toggleReprogramarGroup();
        if (_currentManageSol) updateWhatsappPreview(_currentManageSol);
    });

    var closeAppModal = $('closeAppointmentModal');
    if (closeAppModal) closeAppModal.addEventListener('click', function() { $('appointmentModal').classList.remove('active'); });
    var cancelAppModal = $('cancelAppointmentModal');
    if (cancelAppModal) cancelAppModal.addEventListener('click', function() { $('appointmentModal').classList.remove('active'); });

    var saveAppStatusBtn = $('saveAppointmentStatus');
    if (saveAppStatusBtn) {
        saveAppStatusBtn.addEventListener('click', function() {
            var docId = $('amDocId').value;
            if (!docId) return;
            if (!AP.isEditorOrAbove() && !AP.isSuperAdmin()) { AP.toast('Sin permisos', 'error'); return; }

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

            window.db.collection('solicitudes').doc(docId).update(updateData).then(function() {
                AP.toast('Solicitud actualizada a: ' + updateData.estado);
                AP.writeAuditLog('appointment_' + updateData.estado, 'solicitud ' + docId, updateData.observaciones || '');
                var filterEl = $('appointmentFilter');
                if (filterEl) filterEl.value = updateData.estado;
                // Update WhatsApp preview so admin can send the message
                if (_currentManageSol) {
                    updateWhatsappPreview(Object.assign({}, _currentManageSol, updateData));
                }
            }).catch(function(err) {
                if (err.code === 'permission-denied') {
                    AP.toast('Sin permisos para actualizar. Verifica tu rol y las Firestore Rules.', 'error');
                } else {
                    AP.toast('Error: ' + err.message, 'error');
                }
            });
        });
    }

    // ========== INTERNAL APPOINTMENT CREATION ==========
    var btnCreateIA = $('btnCreateInternalAppt');
    if (btnCreateIA) {
        btnCreateIA.addEventListener('click', function() {
            if (!AP.isEditorOrAbove() && !AP.isSuperAdmin()) { AP.toast('Sin permisos para crear solicitudes', 'error'); return; }
            // Set default date to tomorrow
            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            var iaFecha = $('iaFecha');
            if (iaFecha) iaFecha.value = tomorrow.toISOString().split('T')[0];
            var iaHora = $('iaHora');
            if (iaHora) iaHora.value = '09:00';
            $('internalApptModal').classList.add('active');
        });
    }

    var closeIAModal = $('closeInternalApptModal');
    if (closeIAModal) closeIAModal.addEventListener('click', function() { $('internalApptModal').classList.remove('active'); });
    var cancelIAModal = $('cancelInternalApptModal');
    if (cancelIAModal) cancelIAModal.addEventListener('click', function() { $('internalApptModal').classList.remove('active'); });

    var saveIABtn = $('saveInternalAppt');
    if (saveIABtn) {
        saveIABtn.addEventListener('click', function() {
            var nombre = ($('iaNombre').value || '').trim();
            var whatsapp = ($('iaWhatsapp').value || '').trim();
            var fecha = ($('iaFecha').value || '').trim();
            var hora = ($('iaHora').value || '').trim();
            var countrySelect = $('iaCountry');
            var prefijo = countrySelect ? countrySelect.value : '+57';

            if (!nombre || !whatsapp) {
                AP.toast('Nombre y telefono son obligatorios', 'error');
                return;
            }

            var data = {
                nombre: nombre,
                telefono: whatsapp,
                whatsapp: whatsapp,
                prefijoPais: prefijo,
                email: ($('iaEmail').value || '').trim() || 'No proporcionado',
                vehiculo: ($('iaVehiculo').value || '').trim() || 'General',
                fecha: fecha || '',
                hora: hora || '',
                requiereCita: !!(fecha && hora),
                estado: $('iaEstado').value || 'confirmada',
                tipo: $('iaType').value || 'visita',
                origen: 'admin',
                observaciones: ($('iaObservaciones').value || '').trim(),
                comentarios: '',
                createdAt: new Date().toISOString(),
                createdBy: window.auth.currentUser.email
            };

            saveIABtn.disabled = true;
            saveIABtn.textContent = 'Creando...';

            // Book slot atomically if date/time provided, otherwise just save
            var savePromise = (fecha && hora)
                ? bookSlotAtomically(fecha, hora).then(function() { return window.db.collection('solicitudes').add(data); })
                : window.db.collection('solicitudes').add(data);

            savePromise.then(function() {
                AP.toast('Solicitud creada' + (fecha ? ' para ' + fecha + (hora ? ' a las ' + hora : '') : ''));
                AP.writeAuditLog('appointment_create_internal', nombre + ' - ' + data.tipo, (fecha || '') + ' ' + (hora || ''));
                $('internalApptModal').classList.remove('active');
                $('internalApptForm').reset();
            }).catch(function(err) {
                if (err && err.message === 'SLOT_TAKEN') {
                    AP.toast('Ese horario ya esta reservado. Elige otro.', 'error');
                } else {
                    AP.toast('Error: ' + err.message, 'error');
                }
            }).finally(function() {
                saveIABtn.disabled = false;
                saveIABtn.textContent = 'Crear Solicitud';
            });
        });
    }

    // Atomic slot booking (same logic as public citas.js)
    function bookSlotAtomically(fecha, hora) {
        if (!window.db) return Promise.resolve();
        var bookedRef = window.db.collection('config').doc('bookedSlots');
        return window.db.runTransaction(function(transaction) {
            return transaction.get(bookedRef).then(function(doc) {
                var data = doc.exists ? doc.data() : {};
                var daySlots = data[fecha] || [];
                if (daySlots.indexOf(hora) !== -1) {
                    throw new Error('SLOT_TAKEN');
                }
                daySlots.push(hora);
                var update = {};
                update[fecha] = daySlots;
                if (doc.exists) {
                    transaction.update(bookedRef, update);
                } else {
                    transaction.set(bookedRef, update);
                }
            });
        });
    }

    // ========== ADMIN CALENDAR WITH APPOINTMENT COUNTS ==========
    function renderAdminCalendar() {
        var cal = $('adminCalendar');
        var label = $('calMonthLabel');
        if (!cal || !label) return;

        var monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        label.textContent = monthNames[AP.calendarMonth] + ' ' + AP.calendarYear;

        // Build appointment count map for current month
        var appointmentCounts = {};
        if (AP.appointments) {
            AP.appointments.forEach(function(a) {
                if (a.fecha && a.estado !== 'cancelada') {
                    appointmentCounts[a.fecha] = (appointmentCounts[a.fecha] || 0) + 1;
                }
            });
        }

        var dayHeaders = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
        var html = dayHeaders.map(function(d) { return '<div style="text-align:center;font-size:0.75rem;font-weight:600;color:var(--admin-text-muted);padding:4px;">' + d + '</div>'; }).join('');

        var firstDay = new Date(AP.calendarYear, AP.calendarMonth, 1).getDay();
        var daysInMonth = new Date(AP.calendarYear, AP.calendarMonth + 1, 0).getDate();
        var today = new Date();
        today.setHours(0,0,0,0);

        var availDays = [];
        document.querySelectorAll('#availDays input:checked').forEach(function(cb) { availDays.push(parseInt(cb.value, 10)); });

        for (var i = 0; i < firstDay; i++) { html += '<div></div>'; }

        for (var day = 1; day <= daysInMonth; day++) {
            var date = new Date(AP.calendarYear, AP.calendarMonth, day);
            var dateStr = date.toISOString().split('T')[0];
            var isPast = date < today;
            var dayOfWeek = date.getDay();
            var isAvailDay = availDays.indexOf(dayOfWeek) !== -1;
            var isBlocked = AP.blockedDates[dateStr] === true;
            var hasBlockedHours = AP.blockedHours && AP.blockedHours[dateStr] && AP.blockedHours[dateStr].length > 0;
            var apptCount = appointmentCounts[dateStr] || 0;

            var bgColor, textColor, cursor, border;
            if (isPast) {
                bgColor = 'var(--admin-border)'; textColor = 'var(--admin-text-muted)'; cursor = 'default'; border = 'transparent';
            } else if (!isAvailDay) {
                bgColor = 'var(--admin-border)'; textColor = 'var(--admin-text-muted)'; cursor = 'default'; border = 'transparent';
            } else if (isBlocked) {
                bgColor = 'rgba(248,81,73,0.2)'; textColor = '#f85149'; cursor = 'pointer'; border = '#f85149';
            } else if (hasBlockedHours || apptCount > 0) {
                bgColor = 'rgba(217,153,34,0.15)'; textColor = '#d29922'; cursor = 'pointer'; border = '#d29922';
            } else {
                bgColor = 'rgba(63,185,80,0.15)'; textColor = '#3fb950'; cursor = 'pointer'; border = '#3fb950';
            }

            var clickable = !isPast && isAvailDay;
            var title = isPast ? 'Pasado' : !isAvailDay ? 'Dia no habilitado' : isBlocked ? 'Bloqueado - clic para gestionar' : 'Disponible - clic para gestionar';
            if (apptCount > 0 && !isPast) title += ' (' + apptCount + ' cita' + (apptCount > 1 ? 's' : '') + ')';

            // Build inner content: day number + optional appointment count badge
            var inner = '<div style="font-size:0.85rem;font-weight:600;">' + day + '</div>';
            if (apptCount > 0 && !isPast && isAvailDay) {
                inner += '<div style="font-size:0.6rem;margin-top:1px;opacity:0.85;">' + apptCount + ' cita' + (apptCount > 1 ? 's' : '') + '</div>';
            }

            html += '<div style="text-align:center;padding:6px 4px;border-radius:8px;' +
                'background:' + bgColor + ';color:' + textColor + ';cursor:' + cursor + ';border:1px solid ' + border + ';min-height:48px;display:flex;flex-direction:column;align-items:center;justify-content:center;"' +
                (clickable ? ' data-action="openDayManager" data-date="' + dateStr + '"' : '') +
                ' title="' + title + '">' +
                inner + '</div>';
        }

        cal.innerHTML = html;
    }

    // ========== DAY MANAGER (CLICK ON CALENDAR DAY) ==========
    function openDayManager(dateStr) {
        if (!AP.isSuperAdmin()) { AP.toast('Solo Super Admin puede gestionar bloqueos', 'error'); return; }

        var dateObj = new Date(dateStr + 'T12:00:00');
        var dateLabel = dateObj.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
        var bhDateLabel = $('bhDateLabel');
        if (bhDateLabel) bhDateLabel.textContent = dateLabel;
        var bhTitle = $('bhModalTitle');
        if (bhTitle) bhTitle.textContent = 'Gestionar: ' + dateStr;

        // Generate time slot toggles
        var startHour = parseInt(($('availStartHour') || {}).value, 10) || 8;
        var endHour = parseInt(($('availEndHour') || {}).value, 10) || 18;
        var interval = parseInt(($('availInterval') || {}).value, 10) || 30;

        var slots = [];
        for (var hour = startHour; hour < endHour; hour++) {
            slots.push(hour.toString().padStart(2, '0') + ':00');
            if (interval === 30) {
                slots.push(hour.toString().padStart(2, '0') + ':30');
            }
        }

        var blockedForDay = (AP.blockedHours && AP.blockedHours[dateStr]) || [];
        var isFullBlocked = AP.blockedDates[dateStr] === true;

        // Get booked slots for this day from appointments
        var bookedForDay = {};
        if (AP.appointments) {
            AP.appointments.forEach(function(a) {
                if (a.fecha === dateStr && a.estado !== 'cancelada') {
                    bookedForDay[a.hora] = a.nombre || 'Reservado';
                }
            });
        }

        var grid = $('bhSlotsGrid');
        if (grid) {
            grid.innerHTML = slots.map(function(slot) {
                var isBlockedSlot = isFullBlocked || blockedForDay.indexOf(slot) !== -1;
                var isBooked = bookedForDay[slot];
                var cls = 'bh-slot';
                if (isBooked) cls += ' bh-booked';
                else if (isBlockedSlot) cls += ' bh-blocked';
                return '<label class="' + cls + '" title="' + (isBooked ? 'Reservado: ' + AP.escapeHtml(isBooked) : '') + '">' +
                    '<input type="checkbox" value="' + slot + '"' + (isBlockedSlot ? ' checked' : '') + (isBooked ? ' disabled' : '') + '>' +
                    '<span class="bh-slot-label">' + slot + '</span>' +
                    (isBooked ? '<span class="bh-slot-badge">Reservado</span>' : '') +
                '</label>';
            }).join('');
        }

        // Store current dateStr for save
        $('blockedHoursModal').dataset.dateStr = dateStr;
        $('blockedHoursModal').classList.add('active');
    }

    // Block all / unblock all buttons
    var bhBlockAll = $('bhBlockAll');
    if (bhBlockAll) {
        bhBlockAll.addEventListener('click', function() {
            document.querySelectorAll('#bhSlotsGrid input[type="checkbox"]:not(:disabled)').forEach(function(cb) { cb.checked = true; });
        });
    }
    var bhUnblockAll = $('bhUnblockAll');
    if (bhUnblockAll) {
        bhUnblockAll.addEventListener('click', function() {
            document.querySelectorAll('#bhSlotsGrid input[type="checkbox"]:not(:disabled)').forEach(function(cb) { cb.checked = false; });
        });
    }

    // Close/cancel blocked hours modal
    var closeBH = $('closeBlockedHoursModal');
    if (closeBH) closeBH.addEventListener('click', function() { $('blockedHoursModal').classList.remove('active'); });
    var cancelBH = $('cancelBlockedHoursModal');
    if (cancelBH) cancelBH.addEventListener('click', function() { $('blockedHoursModal').classList.remove('active'); });

    // Save blocked hours
    var saveBH = $('saveBlockedHours');
    if (saveBH) {
        saveBH.addEventListener('click', function() {
            var dateStr = $('blockedHoursModal').dataset.dateStr;
            if (!dateStr) return;

            var checkedSlots = [];
            document.querySelectorAll('#bhSlotsGrid input[type="checkbox"]:checked').forEach(function(cb) {
                checkedSlots.push(cb.value);
            });

            var totalSlots = document.querySelectorAll('#bhSlotsGrid input[type="checkbox"]').length;
            var allBlocked = checkedSlots.length >= totalSlots && totalSlots > 0;

            // Initialize blockedHours if needed
            if (!AP.blockedHours) AP.blockedHours = {};

            if (allBlocked) {
                // All slots blocked = full day block
                AP.blockedDates[dateStr] = true;
                delete AP.blockedHours[dateStr];
            } else if (checkedSlots.length === 0) {
                // Nothing blocked
                delete AP.blockedDates[dateStr];
                delete AP.blockedHours[dateStr];
            } else {
                // Partial block — only specific hours
                delete AP.blockedDates[dateStr];
                AP.blockedHours[dateStr] = checkedSlots;
            }

            saveBlockedDatesAndHours();
            renderAdminCalendar();
            $('blockedHoursModal').classList.remove('active');
            AP.toast('Disponibilidad actualizada para ' + dateStr);
        });
    }

    // Legacy: still support toggleBlockDate for backward compat
    function toggleBlockDate(dateStr) {
        openDayManager(dateStr);
    }

    // ========== SAVE BLOCKED DATES + HOURS ==========
    function saveBlockedDatesAndHours() {
        var blockedList = Object.keys(AP.blockedDates).filter(function(k) { return AP.blockedDates[k]; });
        var blockedHoursObj = AP.blockedHours || {};

        // Clean empty entries
        Object.keys(blockedHoursObj).forEach(function(k) {
            if (!blockedHoursObj[k] || blockedHoursObj[k].length === 0) delete blockedHoursObj[k];
        });

        window.db.collection('config').doc('availability').update({
            blockedDates: blockedList,
            blockedHours: blockedHoursObj,
            updatedAt: new Date().toISOString()
        }).catch(function() {
            window.db.collection('config').doc('availability').set({
                blockedDates: blockedList,
                blockedHours: blockedHoursObj,
                updatedAt: new Date().toISOString()
            }, { merge: true }).catch(function() {});
        });
    }

    // Legacy save (used by availability config save button)
    function saveBlockedDates() {
        saveBlockedDatesAndHours();
    }

    function loadBlockedDates() {
        window.db.collection('config').doc('availability').get().then(function(doc) {
            if (doc.exists) {
                var data = doc.data();
                if (data.blockedDates) {
                    AP.blockedDates = {};
                    data.blockedDates.forEach(function(d) { AP.blockedDates[d] = true; });
                }
                if (data.blockedHours) {
                    AP.blockedHours = data.blockedHours;
                } else {
                    AP.blockedHours = {};
                }
                if (data.interval && $('availInterval')) {
                    $('availInterval').value = data.interval;
                }
            }
            renderAdminCalendar();
        }).catch(function() { renderAdminCalendar(); });
    }

    // Calendar navigation
    var calPrev = $('calPrevMonth');
    var calNext = $('calNextMonth');
    if (calPrev) calPrev.addEventListener('click', function() {
        AP.calendarMonth--;
        if (AP.calendarMonth < 0) { AP.calendarMonth = 11; AP.calendarYear--; }
        renderAdminCalendar();
    });
    if (calNext) calNext.addEventListener('click', function() {
        AP.calendarMonth++;
        if (AP.calendarMonth > 11) { AP.calendarMonth = 0; AP.calendarYear++; }
        renderAdminCalendar();
    });

    // ========== SAVE AVAILABILITY CONFIG ==========
    var btnSaveAvail = $('btnSaveAvailability');
    if (btnSaveAvail) {
        btnSaveAvail.addEventListener('click', function() {
            if (!AP.isSuperAdmin()) { AP.toast('Solo Super Admin puede cambiar disponibilidad', 'error'); return; }
            var startHour = parseInt($('availStartHour').value, 10);
            var endHour = parseInt($('availEndHour').value, 10);
            var interval = $('availInterval') ? parseInt($('availInterval').value, 10) : 30;
            var days = [];
            document.querySelectorAll('#availDays input:checked').forEach(function(cb) { days.push(parseInt(cb.value, 10)); });
            var blockedList = Object.keys(AP.blockedDates).filter(function(k) { return AP.blockedDates[k]; });
            var blockedHoursObj = AP.blockedHours || {};
            window.db.collection('config').doc('availability').set({
                startHour: startHour,
                endHour: endHour,
                days: days,
                interval: interval,
                blockedDates: blockedList,
                blockedHours: blockedHoursObj,
                updatedAt: new Date().toISOString()
            }).then(function() {
                AP.toast('Disponibilidad guardada');
                $('availabilityStatus').innerHTML = '<span style="color:var(--admin-success);">Guardado correctamente</span>';
                renderAdminCalendar();
            }).catch(function(err) {
                AP.toast('Error: ' + err.message, 'error');
            });
        });
    }

    // ========== LOAD AVAILABILITY CONFIG ==========
    function loadAvailabilityConfig() {
        window.db.collection('config').doc('availability').get().then(function(doc) {
            if (!doc.exists) return;
            var data = doc.data();
            if (data.startHour && $('availStartHour')) $('availStartHour').value = data.startHour;
            if (data.endHour && $('availEndHour')) $('availEndHour').value = data.endHour;
            if (data.interval && $('availInterval')) $('availInterval').value = data.interval;
            if (data.days) {
                document.querySelectorAll('#availDays input').forEach(function(cb) {
                    cb.checked = data.days.indexOf(parseInt(cb.value, 10)) !== -1;
                });
            }
            if (data.blockedDates) {
                AP.blockedDates = {};
                data.blockedDates.forEach(function(d) { AP.blockedDates[d] = true; });
            }
            if (data.blockedHours) {
                AP.blockedHours = data.blockedHours;
            } else {
                AP.blockedHours = {};
            }
            renderAdminCalendar();
        }).catch(function() { renderAdminCalendar(); });
    }

    // F6.4: Event delegation for appointment actions
    var citasSection = $('sec-appointments');
    if (citasSection) {
        citasSection.addEventListener('click', function(e) {
            var btn = AP.closestAction(e);
            if (!btn) return;
            var action = btn.getAttribute('data-action');
            if (action === 'manageAppointment') manageAppointment(btn.getAttribute('data-id'));
            else if (action === 'deleteAppointment') deleteAppointment(btn.getAttribute('data-id'));
            else if (action === 'openDayManager') openDayManager(btn.getAttribute('data-date'));
        });
    }

    // ========== EXPOSE ==========
    AP.loadAppointments = loadAppointments;
    AP.renderAppointmentsTable = renderAppointmentsTable;
    AP.deleteAppointment = deleteAppointment;
    AP.manageAppointment = manageAppointment;
    AP.toggleBlockDate = toggleBlockDate;
    AP.openDayManager = openDayManager;
    AP.renderAdminCalendar = renderAdminCalendar;
    AP.loadBlockedDates = loadBlockedDates;
    AP.loadAvailabilityConfig = loadAvailabilityConfig;
})();
