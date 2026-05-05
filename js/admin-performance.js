/**
 * ALTORRA CARS — Performance per asesor (Mega-Plan v4, O.3)
 * ===========================================================
 * Calcula métricas mensuales por cada asesor (super_admin + editor
 * activos) y las muestra como tabla en el dashboard ejecutivo.
 *
 * Métricas:
 *   - Ventas del mes (vehículos vendidos donde lastModifiedBy/assignedTo)
 *   - Solicitudes asignadas
 *   - Solicitudes contactadas (cambió de estado pendiente a otro)
 *   - Tiempo medio de respuesta
 *   - SLA cumplido %
 *
 * Public API:
 *   AltorraPerformance.compute()   → array por asesor
 *   AltorraPerformance.refresh()   → re-render
 */
(function () {
    'use strict';
    if (window.AltorraPerformance) return;
    var AP = window.AP;
    if (!AP) return;

    var DAY_MS = 86400000;

    function $(id) { return document.getElementById(id); }
    function escTxt(s) {
        var d = document.createElement('div');
        d.textContent = s == null ? '' : String(s);
        return d.innerHTML;
    }

    /* ═══════════════════════════════════════════════════════════
       COMPUTE — recopila stats por uid de asesor
       ═══════════════════════════════════════════════════════════ */
    function compute() {
        var monthAgo = Date.now() - 30 * DAY_MS;
        var asesores = {};

        // Inicializar con todos los users editor+
        if (AP.users) {
            AP.users.forEach(function (u) {
                if (u.estado !== 'activo') return;
                if (u.rol !== 'super_admin' && u.rol !== 'editor') return;
                asesores[u.uid] = {
                    uid: u.uid,
                    nombre: u.nombre || u.email,
                    email: u.email,
                    rol: u.rol,
                    ventas: 0,
                    asignadas: 0,
                    contactadas: 0,
                    totalResponseHrs: 0,
                    responseCount: 0,
                    slaTotal: 0,
                    slaOnTime: 0
                };
            });
        }

        // Sumar ventas
        if (AP.vehicles) {
            AP.vehicles.forEach(function (v) {
                if (v.estado !== 'vendido') return;
                var ts = v.updatedAt || v.lastModifiedAt;
                if (!ts) return;
                if (new Date(ts).getTime() < monthAgo) return;
                var asesorKey = v.assignedTo || v.lastModifiedBy;
                if (asesorKey && asesores[asesorKey]) {
                    asesores[asesorKey].ventas++;
                }
            });
        }

        // Sumar solicitudes asignadas + métricas de respuesta
        if (AP.appointments) {
            AP.appointments.forEach(function (a) {
                var ts = a.createdAt;
                if (!ts) return;
                if (new Date(ts).getTime() < monthAgo) return;
                var asesorKey = a.assignedTo;
                if (!asesorKey || !asesores[asesorKey]) return;

                asesores[asesorKey].asignadas++;

                if (a.estado && a.estado !== 'pendiente' && a.estado !== 'nuevo') {
                    asesores[asesorKey].contactadas++;
                    if (a.updatedAt && a.createdAt) {
                        var hrs = (new Date(a.updatedAt).getTime() - new Date(a.createdAt).getTime()) / 3600000;
                        if (hrs > 0) {
                            asesores[asesorKey].totalResponseHrs += hrs;
                            asesores[asesorKey].responseCount++;
                        }
                    }
                }

                if (a.slaDeadline) {
                    asesores[asesorKey].slaTotal++;
                    if (a.updatedAt && new Date(a.updatedAt).getTime() <= new Date(a.slaDeadline).getTime() &&
                        a.estado && a.estado !== 'pendiente' && a.estado !== 'nuevo') {
                        asesores[asesorKey].slaOnTime++;
                    }
                }
            });
        }

        // Calcular derivadas
        return Object.values(asesores).map(function (a) {
            a.avgResponseHrs = a.responseCount > 0 ? a.totalResponseHrs / a.responseCount : null;
            a.slaPct = a.slaTotal > 0 ? a.slaOnTime / a.slaTotal : null;
            return a;
        }).sort(function (a, b) { return b.ventas - a.ventas; });
    }

    /* ═══════════════════════════════════════════════════════════
       RENDER
       ═══════════════════════════════════════════════════════════ */
    function fmtHrs(h) {
        if (h == null) return '—';
        if (h < 1) return Math.round(h * 60) + 'min';
        if (h < 24) return h.toFixed(1) + 'h';
        return Math.round(h / 24) + 'd';
    }
    function fmtPct(n) {
        if (n == null) return '—';
        return Math.round(n * 100) + '%';
    }

    function renderWidget() {
        var container = $('performanceTable');
        if (!container) return;
        var data = compute();
        if (data.length === 0) {
            container.innerHTML = '<div class="pred-empty">Sin asesores activos para evaluar.</div>';
            return;
        }
        container.innerHTML =
            '<table class="performance-table">' +
                '<thead><tr>' +
                    '<th>Asesor</th>' +
                    '<th>Ventas</th>' +
                    '<th>Asignadas</th>' +
                    '<th>Contactadas</th>' +
                    '<th>Avg respuesta</th>' +
                    '<th>SLA</th>' +
                '</tr></thead>' +
                '<tbody>' +
                    data.map(function (a, i) {
                        var medal = i === 0 && a.ventas > 0 ? '🥇 ' :
                                    i === 1 && a.ventas > 0 ? '🥈 ' :
                                    i === 2 && a.ventas > 0 ? '🥉 ' : '';
                        var slaColor = a.slaPct == null ? 'var(--text-tertiary)' :
                                       a.slaPct >= 0.85 ? 'var(--status-success)' :
                                       a.slaPct >= 0.6 ? 'var(--status-warning)' :
                                       'var(--status-danger)';
                        return '<tr>' +
                            '<td><strong>' + medal + escTxt(a.nombre) + '</strong>' +
                                '<small style="color:var(--text-tertiary);display:block;font-size:0.7rem;">' + escTxt(a.rol) + '</small>' +
                            '</td>' +
                            '<td>' + a.ventas + '</td>' +
                            '<td>' + a.asignadas + '</td>' +
                            '<td>' + a.contactadas +
                                (a.asignadas > 0 ? ' <small style="color:var(--text-tertiary);">(' + Math.round(a.contactadas / a.asignadas * 100) + '%)</small>' : '') +
                            '</td>' +
                            '<td>' + fmtHrs(a.avgResponseHrs) + '</td>' +
                            '<td style="color:' + slaColor + ';font-weight:600;">' + fmtPct(a.slaPct) + '</td>' +
                        '</tr>';
                    }).join('') +
                '</tbody>' +
            '</table>';
    }

    function refresh() {
        if (!AP || !AP.isEditorOrAbove || !AP.isEditorOrAbove()) return;
        renderWidget();
    }

    /* ═══════════════════════════════════════════════════════════
       INIT
       ═══════════════════════════════════════════════════════════ */
    if (window.AltorraSections && window.AltorraSections.onChange) {
        window.AltorraSections.onChange(function (section) {
            if (section === 'dashboard') setTimeout(refresh, 200);
        });
    }
    if (window.AltorraEventBus) {
        window.AltorraEventBus.on('vehicle.', function () { refresh(); });
        window.AltorraEventBus.on('comm.', function () { refresh(); });
    }
    var attempts = 0;
    var iv = setInterval(function () {
        attempts++;
        if (window.auth && window.auth.currentUser && AP.isEditorOrAbove && AP.isEditorOrAbove()) {
            if (AP.users && AP.appointments) {
                refresh();
                clearInterval(iv);
            } else if (attempts > 90) {
                refresh();
                clearInterval(iv);
            }
        } else if (attempts > 60) clearInterval(iv);
    }, 1500);

    /* ═══════════════════════════════════════════════════════════
       Public API
       ═══════════════════════════════════════════════════════════ */
    window.AltorraPerformance = {
        compute: compute,
        refresh: refresh
    };
})();
