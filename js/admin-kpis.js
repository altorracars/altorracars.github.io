/**
 * ALTORRA CARS — KPIs ejecutivos (Mega-Plan v4, Microfase O.1)
 * ==============================================================
 * Card adicional en dashboard con métricas financieras y de
 * performance del último mes:
 *
 *   - Tasa de conversión: leads → solicitudes → vendidos
 *   - Tiempo medio de respuesta: createdAt → primer estado≠pendiente
 *   - Ticket promedio: precio medio de vehículos vendidos en el mes
 *   - SLA cumplido: % solicitudes contestadas dentro de slaDeadline
 *   - Top vendedor del mes (assignedTo más frecuente en vendidos)
 *
 * Public API:
 *   AltorraKPIs.refresh()    → recalcula y renderiza
 *   AltorraKPIs.compute()    → retorna objeto con métricas raw
 */
(function () {
    'use strict';
    if (window.AltorraKPIs) return;
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
       COMPUTE — métricas mensuales
       ═══════════════════════════════════════════════════════════ */
    function compute() {
        var now = Date.now();
        var monthAgo = now - 30 * DAY_MS;
        var apps = AP.appointments || [];
        var vehicles = AP.vehicles || [];

        // 1. Tasa de conversión
        var leads = apps.filter(function (a) { return (a.kind === 'lead'); });
        var solicitudes = apps.filter(function (a) { return a.kind === 'solicitud' || a.kind === 'cita'; });
        var vendidos = vehicles.filter(function (v) {
            if (v.estado !== 'vendido') return false;
            var ts = v.updatedAt || v.lastModifiedAt;
            if (!ts) return false;
            return new Date(ts).getTime() >= monthAgo;
        });

        var leadsToSolicitud = solicitudes.length / Math.max(1, leads.length + solicitudes.length);
        var solicitudToSale = vendidos.length / Math.max(1, solicitudes.length);

        // 2. Tiempo medio de respuesta (en horas)
        var responded = apps.filter(function (a) {
            if (!a.createdAt || !a.updatedAt) return false;
            return a.estado && a.estado !== 'pendiente' && a.estado !== 'nuevo';
        });
        var avgResponseHrs = 0;
        if (responded.length > 0) {
            var totalHrs = responded.reduce(function (acc, a) {
                var diff = new Date(a.updatedAt).getTime() - new Date(a.createdAt).getTime();
                return acc + (diff / 3600000);
            }, 0);
            avgResponseHrs = totalHrs / responded.length;
        }

        // 3. Ticket promedio del mes
        var avgTicket = 0;
        if (vendidos.length > 0) {
            var totalPrice = vendidos.reduce(function (acc, v) {
                return acc + (parseInt(v.precioVenta || v.precioOferta || v.precio, 10) || 0);
            }, 0);
            avgTicket = totalPrice / vendidos.length;
        }

        // 4. SLA cumplido
        var withSla = apps.filter(function (a) {
            return a.slaDeadline && a.createdAt;
        });
        var onTime = withSla.filter(function (a) {
            if (!a.updatedAt) return false;
            var responded = a.estado && a.estado !== 'pendiente' && a.estado !== 'nuevo';
            if (!responded) return false;
            return new Date(a.updatedAt).getTime() <= new Date(a.slaDeadline).getTime();
        });
        var slaPct = withSla.length > 0 ? (onTime.length / withSla.length) : 0;

        // 5. Top vendedor del mes
        var byAsesor = {};
        vendidos.forEach(function (v) {
            var key = v.assignedTo || v.assignedToName || v.lastModifiedBy || 'sin-asignar';
            byAsesor[key] = (byAsesor[key] || 0) + 1;
        });
        var topAsesor = null;
        Object.keys(byAsesor).forEach(function (k) {
            if (k === 'sin-asignar') return;
            if (!topAsesor || byAsesor[k] > topAsesor.count) {
                topAsesor = { name: k, count: byAsesor[k] };
            }
        });

        return {
            leads: leads.length,
            solicitudes: solicitudes.length,
            vendidos: vendidos.length,
            leadsToSolicitudPct: leadsToSolicitud,
            solicitudToSalePct: solicitudToSale,
            avgResponseHrs: avgResponseHrs,
            avgTicket: avgTicket,
            slaPct: slaPct,
            topAsesor: topAsesor
        };
    }

    /* ═══════════════════════════════════════════════════════════
       FORMATTERS
       ═══════════════════════════════════════════════════════════ */
    function fmtPct(n) { return Math.round(n * 100) + '%'; }
    function fmtPrice(n) {
        if (!n) return '—';
        if (n >= 1e6) return '$' + (Math.round(n / 1e5) / 10) + 'M';
        if (n >= 1e3) return '$' + Math.round(n / 1e3) + 'K';
        return '$' + n;
    }
    function fmtHrs(h) {
        if (!h) return '—';
        if (h < 1) return Math.round(h * 60) + 'min';
        if (h < 24) return h.toFixed(1) + 'h';
        return Math.round(h / 24) + 'd';
    }

    /* ═══════════════════════════════════════════════════════════
       RENDER
       ═══════════════════════════════════════════════════════════ */
    function renderWidget() {
        var container = $('kpisGrid');
        if (!container) return;
        var k = compute();

        var slaColor = k.slaPct >= 0.85 ? 'var(--status-success)' :
                       k.slaPct >= 0.6 ? 'var(--status-warning)' :
                       'var(--status-danger)';
        var convColor = k.solicitudToSalePct >= 0.15 ? 'var(--status-success)' :
                        k.solicitudToSalePct >= 0.08 ? 'var(--status-warning)' :
                        'var(--status-danger)';
        var responseColor = k.avgResponseHrs <= 4 ? 'var(--status-success)' :
                            k.avgResponseHrs <= 24 ? 'var(--status-warning)' :
                            'var(--status-danger)';

        container.innerHTML =
            '<div class="kpi-tile">' +
                '<div class="kpi-label">Tasa de conversión</div>' +
                '<div class="kpi-value" style="color:' + convColor + ';">' + fmtPct(k.solicitudToSalePct) + '</div>' +
                '<div class="kpi-sub">' + k.vendidos + '/' + k.solicitudes + ' del mes</div>' +
            '</div>' +
            '<div class="kpi-tile">' +
                '<div class="kpi-label">Ticket promedio</div>' +
                '<div class="kpi-value">' + fmtPrice(k.avgTicket) + '</div>' +
                '<div class="kpi-sub">' + k.vendidos + ' venta' + (k.vendidos !== 1 ? 's' : '') + ' este mes</div>' +
            '</div>' +
            '<div class="kpi-tile">' +
                '<div class="kpi-label">Tiempo de respuesta</div>' +
                '<div class="kpi-value" style="color:' + responseColor + ';">' + fmtHrs(k.avgResponseHrs) + '</div>' +
                '<div class="kpi-sub">media en solicitudes</div>' +
            '</div>' +
            '<div class="kpi-tile">' +
                '<div class="kpi-label">SLA cumplido</div>' +
                '<div class="kpi-value" style="color:' + slaColor + ';">' + fmtPct(k.slaPct) + '</div>' +
                '<div class="kpi-sub">dentro de plazo</div>' +
            '</div>' +
            (k.topAsesor ?
                '<div class="kpi-tile">' +
                    '<div class="kpi-label">Top asesor del mes</div>' +
                    '<div class="kpi-value" style="font-size:1.05rem;">' + escTxt(k.topAsesor.name) + '</div>' +
                    '<div class="kpi-sub">' + k.topAsesor.count + ' venta' + (k.topAsesor.count !== 1 ? 's' : '') + '</div>' +
                '</div>'
            : '') +
            '<div class="kpi-tile kpi-tile--full">' +
                '<div class="kpi-label">Embudo de conversión del mes</div>' +
                renderFunnelChart(k) +
            '</div>';
    }

    function renderFunnelChart(k) {
        var max = Math.max(k.leads, k.solicitudes, k.vendidos, 1);
        var stages = [
            { label: 'Leads', count: k.leads, color: '#60a5fa' },
            { label: 'Solicitudes', count: k.solicitudes, color: '#facc15' },
            { label: 'Citas', count: k.solicitudes, color: '#a78bfa' },
            { label: 'Ventas', count: k.vendidos, color: '#4ade80' }
        ];
        return '<div class="funnel-chart">' +
            stages.map(function (s, i) {
                var widthPct = max > 0 ? Math.max(8, (s.count / max) * 100) : 0;
                var dropPct = i > 0 && stages[i - 1].count > 0 ?
                    Math.round(((stages[i - 1].count - s.count) / stages[i - 1].count) * 100) : 0;
                return '<div class="funnel-row">' +
                    '<div class="funnel-label">' + s.label + '</div>' +
                    '<div class="funnel-bar-wrap">' +
                        '<div class="funnel-bar" style="width:' + widthPct + '%; background:' + s.color + ';">' +
                            '<span class="funnel-bar-count">' + s.count + '</span>' +
                        '</div>' +
                    '</div>' +
                    (i > 0 && dropPct > 0 ?
                        '<div class="funnel-drop">↓ ' + dropPct + '%</div>' : '<div class="funnel-drop"></div>') +
                '</div>';
            }).join('') +
        '</div>';
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
            if (AP.vehicles && AP.appointments) {
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
    window.AltorraKPIs = {
        compute: compute,
        refresh: refresh
    };
})();
