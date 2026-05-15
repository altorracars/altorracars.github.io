/**
 * AltorraReports — Dashboard ejecutivo (§27.5)
 * ===================================================================
 * Implementación completa del módulo Reportes. Reemplaza el
 * placeholder del §27.1 con métricas reales del negocio.
 *
 * Componentes:
 *   1. KPIs hero del periodo (ventas / conversión / ticket / response)
 *   2. Funnel de conversión (Leads → Solicitudes → Citas → Ventas)
 *   3. Forecast de ventas (regresión lineal + R² + intervalo confianza)
 *   4. Performance del equipo (ranking asesores con medallas)
 *   5. Anomalías y patrones detectados
 *
 * Filosofía: el dueño del negocio entra a Reportes en la mañana y ve
 * en 30 segundos la salud del mes. Sin abstracciones inútiles, solo
 * métricas que ayudan a decidir.
 *
 * Periodo seleccionable: month | quarter | year.
 *
 * Reusa data sources existentes:
 *   - AP.appointments (solicitudes/citas)
 *   - AP.vehicles (inventario + ventas)
 *   - AltorraForecast (regresión lineal)
 *   - AltorraCRM.getContacts (contactos del CRM)
 */
(function () {
    'use strict';
    if (window.AltorraReports) return;
    var AP = window.AP || {};

    var _currentRange = 'month';
    var _renderTimer = null;
    var THROTTLE_MS = 1500;

    function $(id) { return document.getElementById(id); }
    function escapeHtml(s) { var d = document.createElement('div'); d.textContent = s == null ? '' : String(s); return d.innerHTML; }

    /* ─── PERIODO ───────────────────────────────────────────────────── */

    function getRangeMs(range) {
        var day = 24 * 60 * 60 * 1000;
        if (range === 'quarter') return 90 * day;
        if (range === 'year') return 365 * day;
        return 30 * day; // default month
    }

    function getRangeLabel(range) {
        if (range === 'quarter') return 'últimos 90 días';
        if (range === 'year') return 'últimos 12 meses';
        return 'últimos 30 días';
    }

    function withinRange(dateStr, rangeMs) {
        if (!dateStr) return false;
        try {
            var ms = new Date(dateStr).getTime();
            return !isNaN(ms) && (Date.now() - ms) <= rangeMs;
        } catch (e) { return false; }
    }

    /* ─── DATA HELPERS ──────────────────────────────────────────────── */

    function getSoldVehicles(rangeMs) {
        var vehicles = AP.vehicles || [];
        return vehicles.filter(function (v) {
            if (v.estado !== 'vendido') return false;
            // updatedAt o lastModifiedAt como fecha de venta
            var d = v.updatedAt || v.lastModifiedAt || v.createdAt;
            return withinRange(d, rangeMs);
        });
    }

    function getApps(rangeMs) {
        return (AP.appointments || []).filter(function (a) {
            return withinRange(a.createdAt || a.created || a._createdAt, rangeMs);
        });
    }

    function fmtPrice(n) {
        if (!n || isNaN(n)) return '$0';
        if (n >= 1e9) return '$' + (n / 1e9).toFixed(1) + 'B';
        if (n >= 1e6) return '$' + (n / 1e6).toFixed(1) + 'M';
        if (n >= 1e3) return '$' + Math.round(n / 1e3) + 'K';
        return '$' + n;
    }

    /* ─── 1. KPIs HERO ──────────────────────────────────────────────── */

    function renderKPIs() {
        var rangeMs = getRangeMs(_currentRange);
        var sold = getSoldVehicles(rangeMs);
        var apps = getApps(rangeMs);

        // Ventas del periodo
        var totalSales = sold.reduce(function (sum, v) {
            return sum + (Number(v.precioOferta || v.precio) || 0);
        }, 0);
        var saleCount = sold.length;

        var rkVentas = $('rkVentas');
        var rkVentasSub = $('rkVentasSub');
        if (rkVentas) rkVentas.textContent = fmtPrice(totalSales);
        if (rkVentasSub) rkVentasSub.textContent = saleCount + ' venta' + (saleCount !== 1 ? 's' : '') + ' · ' + getRangeLabel(_currentRange);

        // Conversión: ventas / leads * 100
        var leadsTotal = apps.length;
        var conversion = leadsTotal > 0 ? Math.round((saleCount / leadsTotal) * 100) : 0;
        var rkConv = $('rkConversion');
        var rkConvSub = $('rkConversionSub');
        if (rkConv) rkConv.textContent = conversion + '%';
        if (rkConvSub) rkConvSub.textContent = leadsTotal + ' lead' + (leadsTotal !== 1 ? 's' : '') + ' → ' + saleCount + ' venta' + (saleCount !== 1 ? 's' : '');

        // Ticket promedio
        var ticket = saleCount > 0 ? totalSales / saleCount : 0;
        var rkTicket = $('rkTicket');
        if (rkTicket) rkTicket.textContent = fmtPrice(ticket);

        // Tiempo de respuesta promedio (createdAt → primer estado != pendiente)
        var times = [];
        apps.forEach(function (a) {
            if (!a.createdAt || !a.updatedAt) return;
            var status = String(a.estado || '').toLowerCase();
            if (status === 'pendiente' || status === 'nuevo') return;
            try {
                var diff = new Date(a.updatedAt).getTime() - new Date(a.createdAt).getTime();
                if (diff > 0 && diff < 7 * 24 * 60 * 60 * 1000) times.push(diff);
            } catch (e) {}
        });
        var avgMs = times.length ? times.reduce(function (a, b) { return a + b; }, 0) / times.length : 0;
        var avgHrs = avgMs / (1000 * 60 * 60);
        var rkResp = $('rkResponseTime');
        if (rkResp) {
            if (avgHrs === 0) rkResp.textContent = '—';
            else if (avgHrs < 1) rkResp.textContent = Math.round(avgHrs * 60) + ' min';
            else if (avgHrs < 24) rkResp.textContent = avgHrs.toFixed(1) + ' h';
            else rkResp.textContent = Math.round(avgHrs / 24) + ' días';
        }
    }

    /* ─── 2. FUNNEL DE CONVERSIÓN ──────────────────────────────────── */

    function renderFunnel() {
        var rangeMs = getRangeMs(_currentRange);
        var apps = getApps(rangeMs);
        var sold = getSoldVehicles(rangeMs);

        // 4 stages: Leads (todo) → Solicitudes (no leads puros) → Citas (kind=cita) → Ventas
        var leads = apps.length;
        var solicitudes = apps.filter(function (a) {
            var k = String(a.kind || '').toLowerCase();
            return k === 'solicitud' || a.tipo === 'financiacion' || a.tipo === 'consignacion_venta';
        }).length;
        var citas = apps.filter(function (a) {
            return a.kind === 'cita' || a.requiereCita === true;
        }).length;
        var ventas = sold.length;

        var max = Math.max(leads, 1);
        var stages = [
            { label: 'Leads', value: leads, color: 'cyan' },
            { label: 'Solicitudes', value: solicitudes, color: 'blue' },
            { label: 'Citas', value: citas, color: 'violet' },
            { label: 'Ventas', value: ventas, color: 'green' }
        ];

        var hint = $('reportsFunnelHint');
        if (hint) hint.textContent = leads + ' leads · ' + ventas + ' ventas · ' + (leads > 0 ? Math.round((ventas / leads) * 100) : 0) + '% conv';

        var container = $('reportsFunnel');
        if (!container) return;
        container.innerHTML = stages.map(function (s, idx) {
            var pct = Math.max(8, (s.value / max) * 100);  // mín 8% para visibility
            var prevValue = idx > 0 ? stages[idx - 1].value : null;
            var dropPct = (prevValue !== null && prevValue > 0)
                ? Math.round((1 - s.value / prevValue) * 100) : null;
            var dropHTML = (dropPct !== null && dropPct > 0)
                ? '<span class="funnel-drop">↓ ' + dropPct + '% pérdida</span>' : '';
            return '<div class="funnel-stage">' +
                '<div class="funnel-stage-label">' + escapeHtml(s.label) + dropHTML + '</div>' +
                '<div class="funnel-stage-bar">' +
                    '<div class="funnel-stage-fill funnel-stage-fill--' + s.color + '" style="width:' + pct.toFixed(1) + '%;">' +
                        '<span class="funnel-stage-value">' + s.value + '</span>' +
                    '</div>' +
                '</div>' +
            '</div>';
        }).join('');
    }

    /* ─── 3. FORECAST DE VENTAS ────────────────────────────────────── */

    function renderForecast() {
        var container = $('reportsForecast');
        if (!container) return;

        // Cuenta ventas por mes en últimos 6 meses
        var vehicles = AP.vehicles || [];
        var monthBuckets = {};
        var now = Date.now();
        var sixMonthsMs = 6 * 30 * 24 * 60 * 60 * 1000;
        vehicles.forEach(function (v) {
            if (v.estado !== 'vendido') return;
            var d = v.updatedAt || v.lastModifiedAt;
            if (!d) return;
            try {
                var date = new Date(d);
                if (now - date.getTime() > sixMonthsMs) return;
                var key = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0');
                monthBuckets[key] = (monthBuckets[key] || 0) + 1;
            } catch (e) {}
        });

        var months = Object.keys(monthBuckets).sort();
        var values = months.map(function (m) { return monthBuckets[m]; });

        if (values.length < 3 || !window.AltorraForecast) {
            container.innerHTML = '<div class="pred-empty">Necesitamos 3+ meses de datos para predecir. Mientras tanto registrá las ventas.</div>';
            return;
        }

        var fcResult = window.AltorraForecast.confidence(values, 1);
        if (!fcResult || !fcResult.predictions || fcResult.predictions.length === 0) {
            container.innerHTML = '<div class="pred-empty">No se pudo computar forecast con los datos actuales.</div>';
            return;
        }

        var nextMonth = fcResult.predictions[0];
        var lower = fcResult.lower[0];
        var upper = fcResult.upper[0];
        var current = values[values.length - 1] || 0;
        var diff = nextMonth - current;
        var diffPct = current > 0 ? Math.round((diff / current) * 100) : 0;
        var arrow = diff >= 0 ? '↑' : '↓';
        var trendClass = diff >= 0 ? 'forecast-trend--up' : 'forecast-trend--down';
        var r2Pct = Math.round((fcResult.r2 || 0) * 100);

        container.innerHTML =
            '<div class="forecast-grid">' +
                '<div class="forecast-main">' +
                    '<div class="forecast-label">Próximo mes</div>' +
                    '<div class="forecast-value">' + Math.round(nextMonth) + '</div>' +
                    '<div class="forecast-trend ' + trendClass + '">' + arrow + ' ' + Math.abs(diffPct) + '% vs último mes</div>' +
                    '<div class="forecast-range">' +
                        'Intervalo 95%: <strong>' + Math.max(0, Math.round(lower)) + '</strong> – <strong>' + Math.round(upper) + '</strong>' +
                    '</div>' +
                    '<div class="forecast-quality">Calidad del modelo: <strong>' + r2Pct + '%</strong> R²' +
                        (r2Pct < 50 ? ' <span class="forecast-quality-low">(bajo — más datos mejorarán la precisión)</span>' : '') +
                    '</div>' +
                '</div>' +
                '<div class="forecast-history">' +
                    '<div class="forecast-history-label">Histórico</div>' +
                    '<div class="forecast-bars">' +
                        values.map(function (v, i) {
                            var maxV = Math.max.apply(null, values);
                            var h = Math.max(8, (v / maxV) * 100);
                            return '<div class="forecast-bar" style="height:' + h.toFixed(1) + '%;" title="' + months[i] + ': ' + v + '"></div>';
                        }).join('') +
                        '<div class="forecast-bar forecast-bar--predicted" style="height:' +
                            Math.max(8, (nextMonth / Math.max.apply(null, values)) * 100).toFixed(1) + '%;" title="Próximo mes: ' + Math.round(nextMonth) + '"></div>' +
                    '</div>' +
                    '<div class="forecast-history-axis">' +
                        months.slice(-3).map(function (m) {
                            return '<span>' + m.slice(5) + '</span>';
                        }).join('') +
                    '</div>' +
                '</div>' +
            '</div>';
    }

    /* ─── 4. PERFORMANCE DEL EQUIPO ───────────────────────────────── */

    function renderPerformance() {
        var container = $('reportsPerformance');
        if (!container) return;

        var rangeMs = getRangeMs(_currentRange);
        var sold = getSoldVehicles(rangeMs);
        var apps = getApps(rangeMs);

        // Agregamos por asesor (assignedTo / lastModifiedBy)
        var byAdvisor = {};
        sold.forEach(function (v) {
            var uid = v.assignedTo || v.lastModifiedBy || v.createdBy;
            if (!uid) return;
            if (!byAdvisor[uid]) byAdvisor[uid] = { uid: uid, name: v.assignedToName || v.lastModifiedByName || 'Asesor', sales: 0, total: 0, leads: 0 };
            byAdvisor[uid].sales++;
            byAdvisor[uid].total += Number(v.precioOferta || v.precio) || 0;
        });
        apps.forEach(function (a) {
            var uid = a.assignedTo;
            if (!uid) return;
            if (!byAdvisor[uid]) byAdvisor[uid] = { uid: uid, name: a.assignedToName || 'Asesor', sales: 0, total: 0, leads: 0 };
            byAdvisor[uid].leads++;
        });

        var advisors = Object.keys(byAdvisor).map(function (k) { return byAdvisor[k]; });
        advisors.sort(function (a, b) { return b.sales - a.sales || b.total - a.total; });
        advisors = advisors.slice(0, 5);

        if (advisors.length === 0) {
            container.innerHTML = '<div class="pred-empty">Sin asesores asignados a ventas o leads en este periodo.</div>';
            return;
        }

        var medals = ['🥇', '🥈', '🥉'];
        container.innerHTML = '<div class="performance-list">' +
            advisors.map(function (a, idx) {
                var medal = medals[idx] || '';
                var conv = a.leads > 0 ? Math.round((a.sales / a.leads) * 100) : (a.sales > 0 ? 100 : 0);
                return '<div class="performance-item">' +
                    '<div class="performance-rank">' + (medal || (idx + 1)) + '</div>' +
                    '<div class="performance-body">' +
                        '<div class="performance-name">' + escapeHtml(a.name) + '</div>' +
                        '<div class="performance-stats">' +
                            '<span><strong>' + a.sales + '</strong> venta' + (a.sales !== 1 ? 's' : '') + '</span>' +
                            '<span><strong>' + fmtPrice(a.total) + '</strong> facturado</span>' +
                            (a.leads > 0 ? '<span><strong>' + conv + '%</strong> conv (' + a.leads + ' leads)</span>' : '') +
                        '</div>' +
                    '</div>' +
                '</div>';
            }).join('') +
        '</div>';
    }

    /* ─── 5. ANOMALÍAS Y PATRONES ─────────────────────────────────── */

    function renderAnomalies() {
        var container = $('reportsAnomalies');
        if (!container) return;
        var alerts = [];

        var rangeMs = getRangeMs(_currentRange);
        var apps = getApps(rangeMs);
        var vehicles = AP.vehicles || [];

        // 1. SLA breach rate
        var slaBreaches = apps.filter(function (a) {
            if (!a.slaDeadline) return false;
            try {
                return new Date(a.slaDeadline).getTime() < Date.now() &&
                       String(a.estado || '').toLowerCase() === 'pendiente';
            } catch (e) { return false; }
        }).length;
        if (slaBreaches >= 3) {
            alerts.push({
                level: 'high',
                icon: 'alert-triangle',
                msg: slaBreaches + ' solicitudes con SLA vencido sin atender. Considerar reasignar al equipo.'
            });
        }

        // 2. Vehículos stale (>60 días sin moverse en estado disponible)
        var stale = vehicles.filter(function (v) {
            if (v.estado !== 'disponible') return false;
            var d = v.createdAt;
            if (!d) return false;
            try {
                return (Date.now() - new Date(d).getTime()) > 60 * 24 * 60 * 60 * 1000;
            } catch (e) { return false; }
        });
        if (stale.length >= 3) {
            alerts.push({
                level: 'warn',
                icon: 'package',
                msg: stale.length + ' vehículos llevan +60 días sin moverse. Considerar promociones o ajuste de precio.'
            });
        }

        // 3. Forecast anomaly via AltorraForecast.detectAnomaly
        if (window.AltorraForecast && typeof window.AltorraForecast.detectAnomaly === 'function') {
            var monthBuckets = {};
            (AP.vehicles || []).forEach(function (v) {
                if (v.estado !== 'vendido' || !v.updatedAt) return;
                try {
                    var d = new Date(v.updatedAt);
                    var key = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
                    monthBuckets[key] = (monthBuckets[key] || 0) + 1;
                } catch (e) {}
            });
            var values = Object.keys(monthBuckets).sort().map(function (k) { return monthBuckets[k]; });
            if (values.length >= 4) {
                var anomalies = window.AltorraForecast.detectAnomaly(values, 2);
                if (anomalies && anomalies.length) {
                    alerts.push({
                        level: 'info',
                        icon: 'zap',
                        msg: 'Detectado patrón inusual en ' + anomalies.length + ' mes(es) recientes. Revisar contexto comercial.'
                    });
                }
            }
        }

        // 4. Conversión muy baja
        var leadsCount = apps.length;
        var sold = getSoldVehicles(rangeMs);
        if (leadsCount >= 10) {
            var convPct = Math.round((sold.length / leadsCount) * 100);
            if (convPct < 5) {
                alerts.push({
                    level: 'high',
                    icon: 'trending-down',
                    msg: 'Tasa de conversión del periodo: ' + convPct + '% (esperado >10%). Revisar calidad de leads o follow-up.'
                });
            }
        }

        if (alerts.length === 0) {
            container.innerHTML = '<div class="reports-anomalies-ok">' +
                '<i data-lucide="check-circle-2" style="width:24px;height:24px;color:#10b981;"></i>' +
                '<p style="margin:0;">Todo estable. Sin anomalías o patrones que requieran atención inmediata.</p>' +
            '</div>';
            if (window.AltorraIcons) window.AltorraIcons.refresh(container);
            return;
        }

        container.innerHTML = alerts.map(function (a) {
            return '<div class="reports-anomaly reports-anomaly--' + a.level + '">' +
                '<div class="reports-anomaly-icon"><i data-lucide="' + a.icon + '"></i></div>' +
                '<div class="reports-anomaly-msg">' + escapeHtml(a.msg) + '</div>' +
            '</div>';
        }).join('');
        if (window.AltorraIcons) window.AltorraIcons.refresh(container);
    }

    /* ─── EXPORT CSV ──────────────────────────────────────────────── */

    function exportCSV() {
        var rangeMs = getRangeMs(_currentRange);
        var sold = getSoldVehicles(rangeMs);
        var apps = getApps(rangeMs);

        var rows = [['Tipo', 'Fecha', 'Cliente/Vehículo', 'Estado', 'Asesor', 'Monto']];
        sold.forEach(function (v) {
            rows.push([
                'Venta',
                v.updatedAt || v.createdAt || '',
                (v.marca || '') + ' ' + (v.modelo || '') + ' ' + (v.year || ''),
                'vendido',
                v.assignedToName || v.lastModifiedByName || '',
                v.precioOferta || v.precio || ''
            ]);
        });
        apps.forEach(function (a) {
            rows.push([
                a.kind || a.tipo || 'lead',
                a.createdAt || '',
                a.nombre || a.email || '',
                a.estado || '',
                a.assignedToName || '',
                ''
            ]);
        });

        var csv = rows.map(function (r) {
            return r.map(function (cell) {
                var s = String(cell == null ? '' : cell).replace(/"/g, '""');
                return /[",\n]/.test(s) ? '"' + s + '"' : s;
            }).join(',');
        }).join('\n');

        var blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'altorra-reportes-' + new Date().toISOString().slice(0, 10) + '.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        if (AP.toast) AP.toast('CSV descargado', 'success');
    }

    /* ─── §87 Sprint C-S9 ─ MÉTRICAS CONCIERGE (Bot ALTOR + Hub) ─── */
    /*
       Lectura async de conciergeChats/ + unmatchedQueries/ con cache
       60s para no spammear Firestore en re-renders. Limit 1000 chats
       por query (perf). Si dataset crece >5000, mover agregaciones a
       Cloud Function nocturna (NO en este sprint).

       Métricas calculadas:
       1. KPIs: total / resueltos / CSAT promedio / tiempo respuesta
       2. Distribución de cierres: client_finalized vs admin_resolved
          vs idle_timeout vs sla_breach_handover
       3. Top 5 intents (de context.lastIntent)
       4. Top 5 FAQs missed (de unmatchedQueries.keywords)
    */

    var _conciergeCache = { ts: 0, rangeMs: 0, chats: null, unmatched: null };
    var CONCIERGE_CACHE_MS = 60 * 1000; // 60s
    var CONCIERGE_LIMIT = 1000;

    function fetchConciergeData(rangeMs) {
        // Cache hit válido (mismo range, < 60s)
        var nowMs = Date.now();
        if (_conciergeCache.chats !== null
            && _conciergeCache.rangeMs === rangeMs
            && (nowMs - _conciergeCache.ts) < CONCIERGE_CACHE_MS) {
            return Promise.resolve({ chats: _conciergeCache.chats, unmatched: _conciergeCache.unmatched });
        }
        if (!window.db) {
            return Promise.resolve({ chats: [], unmatched: [] });
        }
        var cutoffIso = new Date(nowMs - rangeMs).toISOString();
        // Query 1: conciergeChats con createdAt >= cutoff (limit 1000)
        var q1 = window.db.collection('conciergeChats')
            .where('createdAt', '>=', cutoffIso)
            .limit(CONCIERGE_LIMIT)
            .get()
            .catch(function (err) {
                // Si el index compuesto no existe (caso primer deploy),
                // hacer query sin where + filtro client-side
                console.warn('[Reports] §87 conciergeChats query falló (probablemente index pendiente), retry simple:', err && err.message);
                return window.db.collection('conciergeChats').limit(CONCIERGE_LIMIT).get();
            });
        // Query 2: unmatchedQueries (top FAQs missed)
        var q2 = window.db.collection('unmatchedQueries')
            .limit(CONCIERGE_LIMIT)
            .get()
            .catch(function (err) {
                console.warn('[Reports] §87 unmatchedQueries query falló:', err && err.message);
                return null;
            });
        return Promise.all([q1, q2]).then(function (results) {
            var chats = [];
            results[0].forEach(function (doc) {
                var d = doc.data() || {};
                d._id = doc.id;
                // Filtro client-side por createdAt si la rule fallback no aplicó where
                if (d.createdAt) {
                    var ts = new Date(d.createdAt).getTime();
                    if (!isNaN(ts) && (nowMs - ts) <= rangeMs) chats.push(d);
                } else {
                    chats.push(d); // sin createdAt, incluir defensive
                }
            });
            var unmatched = [];
            if (results[1]) {
                results[1].forEach(function (doc) {
                    var d = doc.data() || {};
                    d._id = doc.id;
                    unmatched.push(d);
                });
            }
            _conciergeCache = { ts: nowMs, rangeMs: rangeMs, chats: chats, unmatched: unmatched };
            return { chats: chats, unmatched: unmatched };
        });
    }

    function renderConciergeMetrics() {
        var rangeMs = getRangeMs(_currentRange);
        var hint = $('reportsConciergeHint');
        if (hint) hint.textContent = 'Cargando ' + getRangeLabel(_currentRange) + '…';
        fetchConciergeData(rangeMs).then(function (data) {
            var chats = data.chats || [];
            var unmatched = data.unmatched || [];
            var total = chats.length;
            var closed = chats.filter(function (c) { return c.status === 'closed'; });
            var resolutionRate = total > 0 ? Math.round((closed.length / total) * 100) : 0;

            // CSAT promedio
            var csatScores = chats.filter(function (c) { return c.csat && typeof c.csat.score === 'number'; })
                .map(function (c) { return c.csat.score; });
            var avgCsat = csatScores.length > 0
                ? (csatScores.reduce(function (a, b) { return a + b; }, 0) / csatScores.length)
                : null;

            // Tiempo respuesta promedio: para chats con queueEnteredAt + claimedAt,
            // diff = claimedAt - queueEnteredAt (asesor tomó el chat)
            var respTimes = chats.filter(function (c) { return c.queueEnteredAt && c.claimedAt; })
                .map(function (c) {
                    var q = new Date(c.queueEnteredAt).getTime();
                    var cl = new Date(c.claimedAt).getTime();
                    return (!isNaN(q) && !isNaN(cl) && cl > q) ? (cl - q) : null;
                })
                .filter(function (v) { return v !== null; });
            var avgRespMs = respTimes.length > 0
                ? respTimes.reduce(function (a, b) { return a + b; }, 0) / respTimes.length
                : null;

            // Distribución de cierres
            var dist = { client_finalized: 0, admin_resolved: 0, idle_timeout: 0, sla_breach_handover: 0, other: 0 };
            closed.forEach(function (c) {
                var r = c.closedReason || 'other';
                if (typeof dist[r] !== 'undefined') dist[r]++;
                else dist.other++;
            });

            // Top intents (lectura context.lastIntent)
            var intentCounts = {};
            chats.forEach(function (c) {
                var li = c.context && c.context.lastIntent;
                if (li && typeof li === 'string') {
                    intentCounts[li] = (intentCounts[li] || 0) + 1;
                }
            });
            var topIntents = Object.keys(intentCounts)
                .map(function (k) { return { name: k, count: intentCounts[k] }; })
                .sort(function (a, b) { return b.count - a.count; })
                .slice(0, 5);

            // Top FAQs missed (lectura unmatchedQueries.keywords[] frecuencia)
            var keywordCounts = {};
            unmatched.forEach(function (u) {
                var kws = Array.isArray(u.keywords) ? u.keywords : [];
                kws.forEach(function (kw) {
                    if (kw && typeof kw === 'string' && kw.length >= 3) {
                        var k = kw.toLowerCase();
                        keywordCounts[k] = (keywordCounts[k] || 0) + 1;
                    }
                });
            });
            var topFAQs = Object.keys(keywordCounts)
                .map(function (k) { return { name: k, count: keywordCounts[k] }; })
                .sort(function (a, b) { return b.count - a.count; })
                .slice(0, 5);

            // ── Render KPIs ──
            var elTotal = $('rkConciergeTotal');
            if (elTotal) elTotal.textContent = total;
            var elTotalSub = $('rkConciergeTotalSub');
            if (elTotalSub) elTotalSub.textContent = getRangeLabel(_currentRange);

            var elResolved = $('rkConciergeResolved');
            if (elResolved) elResolved.textContent = total > 0 ? (resolutionRate + '%') : '—';

            var elCsat = $('rkConciergeCsat');
            if (elCsat) elCsat.textContent = avgCsat !== null ? avgCsat.toFixed(1) : '—';
            var elCsatSub = $('rkConciergeCsatSub');
            if (elCsatSub) elCsatSub.textContent = avgCsat !== null ? (csatScores.length + ' respuestas') : '/ 5';

            var elResp = $('rkConciergeRespTime');
            if (elResp) {
                if (avgRespMs !== null) {
                    var mins = Math.round(avgRespMs / 60000);
                    elResp.textContent = mins < 1 ? '<1 min' : (mins + ' min');
                } else {
                    elResp.textContent = '—';
                }
            }

            // ── Render distribución ──
            var distEl = $('reportsConciergeDistribution');
            if (distEl) {
                if (closed.length === 0) {
                    distEl.innerHTML = '<div class="pred-empty">Sin chats cerrados aún en este periodo.</div>';
                } else {
                    var distLabels = {
                        client_finalized: { label: 'Cliente finalizó', color: '#3b82f6' },
                        admin_resolved: { label: 'Asesor cerró', color: '#10b981' },
                        idle_timeout: { label: 'Inactividad 24h', color: '#8b5cf6' },
                        sla_breach_handover: { label: 'SLA breach', color: '#f59e0b' },
                        other: { label: 'Otro', color: '#6b7280' }
                    };
                    var distHtml = '';
                    Object.keys(dist).forEach(function (k) {
                        var n = dist[k];
                        if (n === 0) return;
                        var pct = Math.round((n / closed.length) * 100);
                        var meta = distLabels[k];
                        distHtml +=
                            '<div class="reports-concierge-dist-row">' +
                                '<div class="reports-concierge-dist-label">' +
                                    '<span class="reports-concierge-dist-dot" style="background:' + meta.color + ';"></span>' +
                                    escapeHtml(meta.label) +
                                '</div>' +
                                '<div class="reports-concierge-dist-bar">' +
                                    '<div class="reports-concierge-dist-bar-fill" style="width:' + pct + '%; background:' + meta.color + ';"></div>' +
                                '</div>' +
                                '<div class="reports-concierge-dist-count">' + n + ' (' + pct + '%)</div>' +
                            '</div>';
                    });
                    distEl.innerHTML = distHtml;
                }
            }

            // ── Render top intents ──
            var intentsEl = $('reportsConciergeTopIntents');
            if (intentsEl) {
                if (topIntents.length === 0) {
                    intentsEl.innerHTML = '<div class="pred-empty">Sin datos suficientes.</div>';
                } else {
                    intentsEl.innerHTML = topIntents.map(function (it, i) {
                        return '<div class="reports-concierge-list-row">' +
                            '<span class="reports-concierge-list-rank">' + (i + 1) + '</span>' +
                            '<span class="reports-concierge-list-name">' + escapeHtml(it.name) + '</span>' +
                            '<span class="reports-concierge-list-count">' + it.count + '</span>' +
                        '</div>';
                    }).join('');
                }
            }

            // ── Render top FAQs missed ──
            var faqsEl = $('reportsConciergeFAQsMissed');
            if (faqsEl) {
                if (topFAQs.length === 0) {
                    faqsEl.innerHTML = '<div class="pred-empty">Cero queries no resueltas. ¡Bot afinado!</div>';
                } else {
                    faqsEl.innerHTML = topFAQs.map(function (it, i) {
                        return '<div class="reports-concierge-list-row">' +
                            '<span class="reports-concierge-list-rank">' + (i + 1) + '</span>' +
                            '<span class="reports-concierge-list-name">' + escapeHtml(it.name) + '</span>' +
                            '<span class="reports-concierge-list-count">' + it.count + '</span>' +
                        '</div>';
                    }).join('');
                }
            }

            if (hint) hint.textContent = getRangeLabel(_currentRange) + ' · ' + total + ' chats';
        }).catch(function (err) {
            console.warn('[Reports] §87 renderConciergeMetrics error:', err && err.message);
            if (hint) hint.textContent = 'Error al cargar métricas';
        });
    }

    /* ─── RENDER MASTER ──────────────────────────────────────────── */

    function renderAll() {
        try { renderKPIs(); } catch (e) { console.warn('[Reports] KPIs:', e); }
        try { renderFunnel(); } catch (e) { console.warn('[Reports] Funnel:', e); }
        try { renderForecast(); } catch (e) { console.warn('[Reports] Forecast:', e); }
        try { renderPerformance(); } catch (e) { console.warn('[Reports] Performance:', e); }
        try { renderAnomalies(); } catch (e) { console.warn('[Reports] Anomalies:', e); }
        try { renderConciergeMetrics(); } catch (e) { console.warn('[Reports] §87 ConciergeMetrics:', e); }
        if (window.AltorraIcons) {
            var sec = document.getElementById('sec-reports');
            if (sec) window.AltorraIcons.refresh(sec);
        }
    }

    function scheduleRender() {
        if (_renderTimer) return;
        _renderTimer = setTimeout(function () {
            _renderTimer = null;
            renderAll();
        }, THROTTLE_MS);
    }

    /* ─── EVENT HANDLERS ──────────────────────────────────────────── */

    document.addEventListener('change', function (e) {
        if (e.target && e.target.id === 'reportsRange') {
            _currentRange = e.target.value || 'month';
            renderAll();
        }
    });
    document.addEventListener('click', function (e) {
        if (e.target.closest && e.target.closest('#reportsRefresh')) renderAll();
        if (e.target.closest && e.target.closest('#reportsExportCSV')) exportCSV();
    });

    /* ─── INIT ───────────────────────────────────────────────────── */

    function init() {
        if (window.AltorraSections && window.AltorraSections.onChange) {
            window.AltorraSections.onChange(function (section) {
                if (section === 'reports') scheduleRender();
            });
        }
        if (window.AltorraEventBus && window.AltorraEventBus.on) {
            window.AltorraEventBus.on('vehicle.', scheduleRender);
            window.AltorraEventBus.on('comm.', scheduleRender);
        }
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();

    /* ─── Public API ─────────────────────────────────────────────── */
    window.AltorraReports = {
        render: renderAll,
        setRange: function (r) { _currentRange = r; renderAll(); },
        exportCSV: exportCSV
    };
})();
