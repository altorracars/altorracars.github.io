/**
 * ALTORRA CARS — Calendario dedicado (Mega-Plan v4, D.1+D.2)
 * ============================================================
 * Workspace nuevo con vista mensual y vista por día de las citas.
 * Lee de AP.appointments filtrando por kind='cita'. Drag-drop para
 * reprogramar (arrastrar cita a otro día actualiza fecha en Firestore).
 *
 * D.1 — Vista mes con drag-drop nativo HTML5
 * D.2 — Vista por día con slots de tiempo
 *
 * Pendientes (próximos sprints del Bloque D):
 *   D.3 — Config avanzada (turnos, festivos, capacidad)
 *   D.4 — Buffer entre citas + anti-overbooking
 *   D.5 — Recordatorios automáticos
 *   D.6 — No-show prediction (consume J.4 cuando se implemente)
 *   D.7 — AI Auto-Scheduling
 *   D.8 — Optimizador de ruta
 *
 * Public API:
 *   AltorraCalendar.refresh()           → re-renderiza
 *   AltorraCalendar.goTo(date)          → ir a fecha
 *   AltorraCalendar.setView('month'|'day') → cambia vista
 */
(function () {
    'use strict';
    if (window.AltorraCalendar) return;
    var AP = window.AP;
    if (!AP) return;

    var $ = function (id) { return document.getElementById(id); };
    var WEEKDAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    var MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    var _state = {
        currentMonth: new Date().getMonth(),
        currentYear: new Date().getFullYear(),
        currentView: 'month',
        currentDay: new Date().toISOString().slice(0, 10),
        dragSource: null
    };

    function escTxt(s) {
        var d = document.createElement('div');
        d.textContent = s == null ? '' : String(s);
        return d.innerHTML;
    }

    /* ═══════════════════════════════════════════════════════════
       DATA — filtra citas de AP.appointments
       ═══════════════════════════════════════════════════════════ */
    function getCitas() {
        if (!AP.appointments) return [];
        return AP.appointments.filter(function (a) {
            // kind explícito o requiereCita boolean
            var isCita = a.kind === 'cita' || a.requiereCita === true ||
                         (window.AltorraCommSchema && window.AltorraCommSchema.inferKind &&
                          window.AltorraCommSchema.inferKind(a) === 'cita');
            return isCita && a.fecha; // necesita fecha para mapear al calendario
        });
    }

    function citasByDate() {
        var byDate = {};
        getCitas().forEach(function (c) {
            // Normalizar fecha al formato YYYY-MM-DD
            var f = (c.fecha || '').slice(0, 10);
            if (!f) return;
            if (!byDate[f]) byDate[f] = [];
            byDate[f].push(c);
        });
        // Sort por hora dentro de cada día
        Object.keys(byDate).forEach(function (k) {
            byDate[k].sort(function (a, b) {
                return (a.hora || '').localeCompare(b.hora || '');
            });
        });
        return byDate;
    }

    function statusColor(estado) {
        var map = {
            pendiente: '#f59e0b',
            confirmada: '#4ade80',
            reprogramada: '#60a5fa',
            completada: '#a78bfa',
            cancelada: '#ef4444',
            no_show: '#9ca3af',
            nuevo: '#f59e0b',
            contactado: '#60a5fa',
            aprobada: '#4ade80',
            rechazada: '#ef4444'
        };
        return map[estado] || '#888';
    }

    /* ═══════════════════════════════════════════════════════════
       MONTH VIEW
       ═══════════════════════════════════════════════════════════ */
    function renderMonth() {
        var titleEl = $('calTitle') || $('calendarTitle');
        if (titleEl) titleEl.textContent = 'Calendario — ' + MONTHS[_state.currentMonth] + ' ' + _state.currentYear;

        var wrap = $('calGridWrap');
        if (!wrap) return;

        var firstDay = new Date(_state.currentYear, _state.currentMonth, 1);
        var lastDay = new Date(_state.currentYear, _state.currentMonth + 1, 0);
        var startWeekday = firstDay.getDay(); // 0 = domingo
        var daysInMonth = lastDay.getDate();
        var byDate = citasByDate();
        var todayStr = new Date().toISOString().slice(0, 10);

        // Construir cells del mes (6 semanas máx)
        var cells = [];
        // Días del mes anterior (huecos al inicio)
        for (var i = 0; i < startWeekday; i++) {
            cells.push({ empty: true });
        }
        // Días del mes actual
        for (var d = 1; d <= daysInMonth; d++) {
            var dateStr = _state.currentYear + '-' + String(_state.currentMonth + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0');
            cells.push({
                day: d,
                date: dateStr,
                citas: byDate[dateStr] || [],
                isToday: dateStr === todayStr
            });
        }
        // Padding al final para completar grid de 7×6 (42 cells)
        while (cells.length % 7 !== 0) cells.push({ empty: true });

        var headerHTML = '<div class="cal-grid-header">' +
            WEEKDAYS.map(function (d) { return '<div class="cal-weekday">' + d + '</div>'; }).join('') +
        '</div>';

        var cellsHTML = '<div class="cal-grid">' +
            cells.map(function (c) {
                if (c.empty) return '<div class="cal-cell cal-cell--empty"></div>';
                var classes = ['cal-cell'];
                if (c.isToday) classes.push('cal-cell--today');
                if (c.citas.length > 0) classes.push('cal-cell--has-events');
                var citasHTML = c.citas.slice(0, 3).map(function (cita) {
                    var color = statusColor(cita.estado);
                    return '<div class="cal-event" draggable="true" data-doc-id="' + escTxt(cita._docId) + '" ' +
                            'style="border-left-color:' + color + ';" ' +
                            'title="' + escTxt(cita.hora || '') + ' — ' + escTxt(cita.nombre || '') + '">' +
                        '<span class="cal-event-time">' + escTxt(cita.hora || '') + '</span> ' +
                        '<span class="cal-event-name">' + escTxt(cita.nombre || cita.vehiculo || 'Cita') + '</span>' +
                    '</div>';
                }).join('');
                var moreHTML = c.citas.length > 3 ?
                    '<div class="cal-event cal-event--more">+ ' + (c.citas.length - 3) + ' más</div>' : '';
                return '<div class="' + classes.join(' ') + '" data-date="' + c.date + '">' +
                    '<div class="cal-cell-day">' + c.day + '</div>' +
                    '<div class="cal-cell-events">' + citasHTML + moreHTML + '</div>' +
                '</div>';
            }).join('') +
        '</div>';

        wrap.innerHTML = headerHTML + cellsHTML;
        wireMonthInteractions();
    }

    function wireMonthInteractions() {
        var wrap = $('calGridWrap');
        if (!wrap) return;

        // Click en cell: abrir vista del día
        wrap.addEventListener('click', function (e) {
            var event = e.target.closest('.cal-event');
            if (event) {
                var docId = event.getAttribute('data-doc-id');
                if (docId && AP.openAppointmentManager) {
                    AP.openAppointmentManager(docId);
                } else if (docId) {
                    // Fallback: ir a Comunicaciones y filtrar
                    if (window.AltorraSections) window.AltorraSections.go('appointments');
                }
                return;
            }
            var cell = e.target.closest('.cal-cell:not(.cal-cell--empty)');
            if (cell) {
                _state.currentDay = cell.getAttribute('data-date');
                _state.currentView = 'day';
                updateViewButtons();
                renderDay();
            }
        });

        // Drag-drop para reprogramar
        wrap.querySelectorAll('.cal-event[draggable]').forEach(function (el) {
            el.addEventListener('dragstart', function (e) {
                _state.dragSource = el.getAttribute('data-doc-id');
                el.classList.add('cal-event--dragging');
                e.dataTransfer.effectAllowed = 'move';
            });
            el.addEventListener('dragend', function () {
                el.classList.remove('cal-event--dragging');
            });
        });
        wrap.querySelectorAll('.cal-cell:not(.cal-cell--empty)').forEach(function (cell) {
            cell.addEventListener('dragover', function (e) {
                if (!_state.dragSource) return;
                e.preventDefault();
                cell.classList.add('cal-cell--drop-target');
            });
            cell.addEventListener('dragleave', function () {
                cell.classList.remove('cal-cell--drop-target');
            });
            cell.addEventListener('drop', function (e) {
                e.preventDefault();
                cell.classList.remove('cal-cell--drop-target');
                if (!_state.dragSource) return;
                var newDate = cell.getAttribute('data-date');
                reprogramarCita(_state.dragSource, newDate);
                _state.dragSource = null;
            });
        });
    }

    function reprogramarCita(docId, newDate) {
        if (!docId || !newDate || !window.db) return;
        if (!confirm('¿Reprogramar esta cita para el ' + newDate + '?')) return;
        window.db.collection('solicitudes').doc(docId).update({
            fecha: newDate,
            estado: 'reprogramada',
            updatedAt: new Date().toISOString()
        }).then(function () {
            AP.toast('Cita reprogramada al ' + newDate);
            renderMonth();
        }).catch(function (err) {
            AP.toast('Error al reprogramar: ' + err.message, 'error');
        });
    }

    /* ═══════════════════════════════════════════════════════════
       DAY VIEW
       ═══════════════════════════════════════════════════════════ */
    function renderDay() {
        var titleEl = $('calendarTitle');
        if (titleEl) {
            var date = new Date(_state.currentDay + 'T00:00:00');
            titleEl.textContent = 'Calendario — ' + date.toLocaleDateString('es-CO', {
                weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
            });
        }

        var wrap = $('calGridWrap');
        if (!wrap) return;
        var byDate = citasByDate();
        var citas = byDate[_state.currentDay] || [];

        if (citas.length === 0) {
            wrap.innerHTML =
                '<div class="cal-day-empty">' +
                    '<i data-lucide="calendar-x" style="width:48px;height:48px;opacity:0.3;"></i>' +
                    '<p>Sin citas para este día.</p>' +
                    '<button class="alt-btn alt-btn--ghost alt-btn--sm cal-back-btn">Volver a vista mensual</button>' +
                '</div>';
        } else {
            wrap.innerHTML = '<div class="cal-day-list">' +
                '<button class="alt-btn alt-btn--ghost alt-btn--sm cal-back-btn" style="margin-bottom:14px;">' +
                    '<i data-lucide="arrow-left"></i> Volver al mes' +
                '</button>' +
                citas.map(function (c) {
                    var color = statusColor(c.estado);
                    return '<div class="cal-day-item" data-doc-id="' + escTxt(c._docId) + '">' +
                        '<div class="cal-day-time" style="border-left-color:' + color + ';">' +
                            '<strong>' + escTxt(c.hora || '—') + '</strong>' +
                        '</div>' +
                        '<div class="cal-day-body">' +
                            '<div class="cal-day-name">' + escTxt(c.nombre || 'Cita') + '</div>' +
                            '<div class="cal-day-meta">' +
                                escTxt(c.vehiculo || '') +
                                (c.telefono ? ' · 📲 ' + escTxt(c.telefono) : '') +
                                ' · <span style="color:' + color + ';font-weight:600;">' + escTxt(c.estado || '') + '</span>' +
                            '</div>' +
                            (c.observaciones ? '<div class="cal-day-obs">' + escTxt(c.observaciones) + '</div>' : '') +
                        '</div>' +
                    '</div>';
                }).join('') +
            '</div>';
        }

        if (window.AltorraIcons) window.AltorraIcons.refresh(wrap);
        else if (window.lucide) try { window.lucide.createIcons({ context: wrap }); } catch (e) {}

        // Wire back button + click en items
        var backBtn = wrap.querySelector('.cal-back-btn');
        if (backBtn) backBtn.addEventListener('click', function () {
            _state.currentView = 'month';
            updateViewButtons();
            renderMonth();
        });
        wrap.querySelectorAll('.cal-day-item').forEach(function (it) {
            it.addEventListener('click', function () {
                var id = it.getAttribute('data-doc-id');
                if (id && AP.openAppointmentManager) AP.openAppointmentManager(id);
            });
        });
    }

    /* ═══════════════════════════════════════════════════════════
       STATS BAR
       ═══════════════════════════════════════════════════════════ */
    function renderStats() {
        var statsEl = $('calStats');
        if (!statsEl) return;
        var citas = getCitas();
        var thisMonth = citas.filter(function (c) {
            var f = (c.fecha || '').slice(0, 7);
            return f === _state.currentYear + '-' + String(_state.currentMonth + 1).padStart(2, '0');
        });
        var byEstado = {};
        thisMonth.forEach(function (c) {
            byEstado[c.estado || 'sin estado'] = (byEstado[c.estado || 'sin estado'] || 0) + 1;
        });

        var total = thisMonth.length;
        var pendientes = (byEstado.pendiente || 0) + (byEstado.nuevo || 0);
        var confirmadas = byEstado.confirmada || 0;
        var completadas = byEstado.completada || 0;

        statsEl.innerHTML =
            '<div class="cal-stat"><div class="cal-stat-value">' + total + '</div><div class="cal-stat-label">Total mes</div></div>' +
            '<div class="cal-stat" style="border-left-color:' + statusColor('pendiente') + ';"><div class="cal-stat-value">' + pendientes + '</div><div class="cal-stat-label">Pendientes</div></div>' +
            '<div class="cal-stat" style="border-left-color:' + statusColor('confirmada') + ';"><div class="cal-stat-value">' + confirmadas + '</div><div class="cal-stat-label">Confirmadas</div></div>' +
            '<div class="cal-stat" style="border-left-color:' + statusColor('completada') + ';"><div class="cal-stat-value">' + completadas + '</div><div class="cal-stat-label">Completadas</div></div>';
    }

    /* ═══════════════════════════════════════════════════════════
       CONTROLS
       ═══════════════════════════════════════════════════════════ */
    function updateViewButtons() {
        document.querySelectorAll('.cal-view-btn').forEach(function (btn) {
            btn.classList.toggle('active', btn.getAttribute('data-view') === _state.currentView);
        });
    }

    function refresh() {
        renderStats();
        if (_state.currentView === 'day') renderDay();
        else renderMonth();
    }

    function init() {
        // Listeners de toolbar
        document.addEventListener('click', function (e) {
            if (e.target.closest('#calPrev')) {
                _state.currentMonth--;
                if (_state.currentMonth < 0) {
                    _state.currentMonth = 11;
                    _state.currentYear--;
                }
                refresh();
            } else if (e.target.closest('#calNext')) {
                _state.currentMonth++;
                if (_state.currentMonth > 11) {
                    _state.currentMonth = 0;
                    _state.currentYear++;
                }
                refresh();
            } else if (e.target.closest('#calToday')) {
                var t = new Date();
                _state.currentMonth = t.getMonth();
                _state.currentYear = t.getFullYear();
                _state.currentView = 'month';
                updateViewButtons();
                refresh();
            } else if (e.target.closest('.cal-view-btn')) {
                var btn = e.target.closest('.cal-view-btn');
                _state.currentView = btn.getAttribute('data-view');
                updateViewButtons();
                refresh();
            }
        });

        // Auto-refresh cuando bus emite eventos relevantes
        if (window.AltorraEventBus) {
            window.AltorraEventBus.on('comm.', function () { refresh(); });
        }

        // Re-render cuando admin entra a la sección
        if (window.AltorraSections && window.AltorraSections.onChange) {
            window.AltorraSections.onChange(function (section) {
                if (section === 'calendar') refresh();
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    /* ═══════════════════════════════════════════════════════════
       Public API
       ═══════════════════════════════════════════════════════════ */
    window.AltorraCalendar = {
        refresh: refresh,
        goTo: function (date) {
            var d = typeof date === 'string' ? new Date(date) : date;
            _state.currentMonth = d.getMonth();
            _state.currentYear = d.getFullYear();
            refresh();
        },
        setView: function (view) {
            _state.currentView = view;
            updateViewButtons();
            refresh();
        }
    };
})();
