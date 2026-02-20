// Admin Panel — Appointments, Calendar & Availability
(function() {
    'use strict';
    var AP = window.AP;
    var $ = AP.$;

    // ========== LOAD APPOINTMENTS ==========
    function loadAppointments() {
        if (AP.unsubAppointments) AP.unsubAppointments();
        AP.unsubAppointments = window.db.collection('citas').orderBy('createdAt', 'desc').onSnapshot(function(snap) {
            AP.appointments = snap.docs.map(function(doc) { return Object.assign({ _docId: doc.id }, doc.data()); });
            renderAppointmentsTable();
            var pending = AP.appointments.filter(function(a) { return a.estado === 'pendiente'; }).length;
            var badge = $('navBadgeAppointments');
            if (badge) badge.textContent = pending > 0 ? pending : '';
        }, function(err) {
            console.warn('[Citas] Error loading appointments:', err);
        });
    }

    // ========== APPOINTMENT FILTER ==========
    var appointmentFilterEl = $('appointmentFilter');
    if (appointmentFilterEl) {
        appointmentFilterEl.addEventListener('change', function() {
            renderAppointmentsTable();
        });
    }

    // ========== APPOINTMENTS TABLE ==========
    function renderAppointmentsTable() {
        var body = $('appointmentsBody');
        if (!body) return;
        var filterEl = $('appointmentFilter');
        var filter = filterEl ? filterEl.value : 'all';
        var filtered = filter === 'all' ? AP.appointments : AP.appointments.filter(function(a) { return a.estado === filter; });

        if (filtered.length === 0) {
            body.innerHTML = '<tr><td colspan="8" style="text-align:center;color:var(--admin-text-muted);padding:2rem;">No hay citas ' + (filter === 'all' ? '' : filter + 's') + '</td></tr>';
            return;
        }

        body.innerHTML = filtered.map(function(a) {
            var estadoColors = {
                pendiente: 'admin-warning',
                confirmada: 'admin-success',
                reprogramada: 'admin-info',
                completada: 'admin-gold',
                cancelada: 'admin-danger'
            };
            var estadoClass = estadoColors[a.estado] || 'admin-warning';
            var estadoLabel = a.estado ? (a.estado.charAt(0).toUpperCase() + a.estado.slice(1)) : 'Pendiente';
            var whatsappNum = a.whatsapp || a.telefono || '';

            return '<tr>' +
                '<td><strong>' + AP.escapeHtml(a.nombre || '-') + '</strong></td>' +
                '<td>' +
                    '<div style="font-size:0.85rem;display:flex;align-items:center;gap:4px;">' +
                        (whatsappNum ? '<a href="https://wa.me/' + whatsappNum.replace(/[^0-9]/g, '') + '" target="_blank" style="color:var(--admin-success);text-decoration:none;" title="Abrir WhatsApp">' + AP.escapeHtml(whatsappNum) + ' </a>' : AP.escapeHtml(whatsappNum || '-')) +
                    '</div>' +
                    '<div style="font-size:0.75rem;color:var(--admin-text-muted);">' + AP.escapeHtml(a.email || '-') + '</div>' +
                '</td>' +
                '<td>' + AP.escapeHtml(a.vehiculo || 'General') + '</td>' +
                '<td><div>' + AP.escapeHtml(a.fecha || '-') + '</div><div style="font-weight:600;">' + AP.escapeHtml(a.hora || '-') + '</div></td>' +
                '<td><span style="color:var(--' + estadoClass + ');font-weight:600;font-size:0.85rem;">' + estadoLabel + '</span></td>' +
                '<td style="max-width:150px;font-size:0.8rem;color:var(--admin-text-muted);">' + AP.escapeHtml(a.observaciones || a.comentarios || '-') + '</td>' +
                '<td style="white-space:nowrap;">' +
                    (AP.RBAC.canManageAppointment() ? '<button class="btn btn-sm btn-ghost" onclick="adminPanel.manageAppointment(\'' + a._docId + '\')" title="Gestionar">Gestionar</button>' : '') +
                    (AP.RBAC.canDeleteAppointment() ? ' <button class="btn btn-sm btn-danger" onclick="adminPanel.deleteAppointment(\'' + a._docId + '\')" title="Eliminar">&times;</button>' : '') +
                '</td>' +
            '</tr>';
        }).join('');
    }

    // ========== DELETE APPOINTMENT ==========
    function deleteAppointment(docId) {
        if (!AP.RBAC.canDeleteAppointment()) { AP.toast('Solo Super Admin puede eliminar citas', 'error'); return; }
        if (!confirm('Eliminar esta cita? Esta accion no se puede deshacer.')) return;
        window.db.collection('citas').doc(docId).delete().then(function() {
            AP.toast('Cita eliminada');
            AP.writeAuditLog('appointment_delete', 'cita ' + docId, '');
        }).catch(function(err) {
            AP.toast('Error: ' + err.message, 'error');
        });
    }

    // ========== MANAGE APPOINTMENT MODAL ==========
    function manageAppointment(docId) {
        var a = AP.appointments.find(function(x) { return x._docId === docId; });
        if (!a) return;

        $('amDocId').value = docId;
        $('amEstado').value = a.estado || 'pendiente';
        $('amObservaciones').value = a.observaciones || '';

        $('amClientInfo').innerHTML =
            '<strong>' + AP.escapeHtml(a.nombre || '') + '</strong><br>' +
            'WhatsApp: <a href="https://wa.me/' + (a.whatsapp || a.telefono || '').replace(/[^0-9]/g, '') + '" target="_blank" style="color:var(--admin-success);">' + AP.escapeHtml(a.whatsapp || a.telefono || '-') + '</a><br>' +
            'Email: ' + AP.escapeHtml(a.email || '-') + '<br>' +
            'Vehiculo: ' + AP.escapeHtml(a.vehiculo || 'General') + '<br>' +
            'Fecha: ' + AP.escapeHtml(a.fecha || '-') + ' | Hora: ' + AP.escapeHtml(a.hora || '-') + '<br>' +
            'Comentarios: ' + AP.escapeHtml(a.comentarios || '-');

        toggleReprogramarGroup();
        $('appointmentModal').classList.add('active');
    }

    function toggleReprogramarGroup() {
        var group = $('amReprogramarGroup');
        var estado = $('amEstado').value;
        if (group) group.style.display = estado === 'reprogramada' ? '' : 'none';
    }

    var amEstadoEl = $('amEstado');
    if (amEstadoEl) amEstadoEl.addEventListener('change', toggleReprogramarGroup);

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

            window.db.collection('citas').doc(docId).update(updateData).then(function() {
                AP.toast('Cita actualizada a: ' + updateData.estado);
                AP.writeAuditLog('appointment_' + updateData.estado, 'cita ' + docId, updateData.observaciones || '');
                var filterEl = $('appointmentFilter');
                if (filterEl) filterEl.value = updateData.estado;
                $('appointmentModal').classList.remove('active');
            }).catch(function(err) {
                if (err.code === 'permission-denied') {
                    AP.toast('Sin permisos para actualizar citas. Verifica tu rol y las Firestore Rules.', 'error');
                } else {
                    AP.toast('Error: ' + err.message, 'error');
                }
            });
        });
    }

    // ========== ADMIN CALENDAR ==========
    function renderAdminCalendar() {
        var cal = $('adminCalendar');
        var label = $('calMonthLabel');
        if (!cal || !label) return;

        var monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        label.textContent = monthNames[AP.calendarMonth] + ' ' + AP.calendarYear;

        var dayHeaders = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
        var html = dayHeaders.map(function(d) { return '<div style="text-align:center;font-size:0.75rem;font-weight:600;color:var(--admin-text-muted);padding:4px;">' + d + '</div>'; }).join('');

        var firstDay = new Date(AP.calendarYear, AP.calendarMonth, 1).getDay();
        var daysInMonth = new Date(AP.calendarYear, AP.calendarMonth + 1, 0).getDate();
        var today = new Date();
        today.setHours(0,0,0,0);

        var availDays = [];
        document.querySelectorAll('#availDays input:checked').forEach(function(cb) { availDays.push(parseInt(cb.value)); });

        for (var i = 0; i < firstDay; i++) { html += '<div></div>'; }

        for (var day = 1; day <= daysInMonth; day++) {
            var date = new Date(AP.calendarYear, AP.calendarMonth, day);
            var dateStr = date.toISOString().split('T')[0];
            var isPast = date < today;
            var dayOfWeek = date.getDay();
            var isAvailDay = availDays.indexOf(dayOfWeek) !== -1;
            var isBlocked = AP.blockedDates[dateStr] === true;

            var bgColor, textColor, cursor, border;
            if (isPast) {
                bgColor = 'var(--admin-border)'; textColor = 'var(--admin-text-muted)'; cursor = 'default'; border = 'transparent';
            } else if (!isAvailDay) {
                bgColor = 'var(--admin-border)'; textColor = 'var(--admin-text-muted)'; cursor = 'default'; border = 'transparent';
            } else if (isBlocked) {
                bgColor = 'rgba(248,81,73,0.2)'; textColor = '#f85149'; cursor = 'pointer'; border = '#f85149';
            } else {
                bgColor = 'rgba(63,185,80,0.15)'; textColor = '#3fb950'; cursor = 'pointer'; border = '#3fb950';
            }

            var clickable = !isPast && isAvailDay;
            html += '<div style="text-align:center;padding:8px 4px;border-radius:8px;font-size:0.85rem;font-weight:600;' +
                'background:' + bgColor + ';color:' + textColor + ';cursor:' + cursor + ';border:1px solid ' + border + ';"' +
                (clickable ? ' onclick="adminPanel.toggleBlockDate(\'' + dateStr + '\')"' : '') +
                ' title="' + (isPast ? 'Pasado' : !isAvailDay ? 'Dia no habilitado' : isBlocked ? 'Bloqueado - clic para desbloquear' : 'Disponible - clic para bloquear') + '">' +
                day + '</div>';
        }

        cal.innerHTML = html;
    }

    function toggleBlockDate(dateStr) {
        if (!AP.isSuperAdmin()) { AP.toast('Solo Super Admin puede bloquear dias', 'error'); return; }
        if (AP.blockedDates[dateStr]) {
            delete AP.blockedDates[dateStr];
        } else {
            AP.blockedDates[dateStr] = true;
        }
        saveBlockedDates();
        renderAdminCalendar();
    }

    function saveBlockedDates() {
        var blockedList = Object.keys(AP.blockedDates).filter(function(k) { return AP.blockedDates[k]; });
        window.db.collection('config').doc('availability').update({
            blockedDates: blockedList,
            updatedAt: new Date().toISOString()
        }).catch(function() {
            window.db.collection('config').doc('availability').set({
                blockedDates: blockedList,
                updatedAt: new Date().toISOString()
            }, { merge: true }).catch(function() {});
        });
    }

    function loadBlockedDates() {
        window.db.collection('config').doc('availability').get().then(function(doc) {
            if (doc.exists && doc.data().blockedDates) {
                AP.blockedDates = {};
                doc.data().blockedDates.forEach(function(d) { AP.blockedDates[d] = true; });
            }
            if (doc.exists && doc.data().interval && $('availInterval')) {
                $('availInterval').value = doc.data().interval;
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
            var startHour = parseInt($('availStartHour').value);
            var endHour = parseInt($('availEndHour').value);
            var interval = $('availInterval') ? parseInt($('availInterval').value) : 30;
            var days = [];
            document.querySelectorAll('#availDays input:checked').forEach(function(cb) { days.push(parseInt(cb.value)); });
            var blockedList = Object.keys(AP.blockedDates).filter(function(k) { return AP.blockedDates[k]; });
            window.db.collection('config').doc('availability').set({
                startHour: startHour,
                endHour: endHour,
                days: days,
                interval: interval,
                blockedDates: blockedList,
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
                    cb.checked = data.days.indexOf(parseInt(cb.value)) !== -1;
                });
            }
            if (data.blockedDates) {
                AP.blockedDates = {};
                data.blockedDates.forEach(function(d) { AP.blockedDates[d] = true; });
            }
            renderAdminCalendar();
        }).catch(function() { renderAdminCalendar(); });
    }

    // ========== EXPOSE ==========
    AP.loadAppointments = loadAppointments;
    AP.renderAppointmentsTable = renderAppointmentsTable;
    AP.deleteAppointment = deleteAppointment;
    AP.manageAppointment = manageAppointment;
    AP.toggleBlockDate = toggleBlockDate;
    AP.renderAdminCalendar = renderAdminCalendar;
    AP.loadBlockedDates = loadBlockedDates;
    AP.loadAvailabilityConfig = loadAvailabilityConfig;
})();
