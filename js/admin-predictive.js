/**
 * ALTORRA CARS — Predictive Analytics Dashboard (Mega-Plan v4, Bloque R)
 * =======================================================================
 * Orquestador que combina J.3 (scoring) + R.1 (forecast) + datos del CRM
 * para producir insights accionables que aparecen en el dashboard:
 *
 * R.2 — Hot leads del día: top N contactos con score alto + recencia
 * R.3 — Vehículos al borde: stale detector sobre vehiculos disponibles
 * R.4 — Churn risk: contactos cuyo score bajó significativamente
 *
 * Renderiza una card "Insights del día" con 3 columnas en el dashboard.
 *
 * Public API:
 *   AltorraPredictive.refresh()         → recalcula y renderiza
 *   AltorraPredictive.hotLeads(n)       → top N hot leads
 *   AltorraPredictive.staleVehicles(d)  → vehículos sin movimiento >d días
 *   AltorraPredictive.churnRisk()       → contactos en riesgo
 */
(function () {
    'use strict';
    if (window.AltorraPredictive) return;
    var AP = window.AP;
    if (!AP) return;

    var DAY_MS = 86400000;
    var STALE_DAYS_DEFAULT = 60;

    function $(id) { return document.getElementById(id); }
    function escTxt(s) {
        var d = document.createElement('div');
        d.textContent = s == null ? '' : String(s);
        return d.innerHTML;
    }

    function daysSince(ts) {
        if (!ts) return Infinity;
        var t = ts;
        if (typeof ts === 'string') t = new Date(ts).getTime();
        else if (ts && typeof ts.toMillis === 'function') t = ts.toMillis();
        else if (ts instanceof Date) t = ts.getTime();
        if (!t || isNaN(t)) return Infinity;
        return (Date.now() - t) / DAY_MS;
    }

    /* ═══════════════════════════════════════════════════════════
       R.2 — HOT LEADS DEL DÍA
       Combina contactos del CRM con AltorraScoring + recencia
       ═══════════════════════════════════════════════════════════ */
    function hotLeads(n) {
        n = n || 5;
        if (!window.AltorraCRM || typeof window.AltorraCRM.getContacts !== 'function') {
            // Fallback: si AltorraCRM no expone API, leer de AP.appointments
            return hotLeadsFromComms(n);
        }
        var contacts = window.AltorraCRM.getContacts() || [];
        return hotLeadsFromList(contacts, n);
    }

    function hotLeadsFromList(contacts, n) {
        if (!contacts || !contacts.length) return [];
        var scored = contacts
            .map(function (c) {
                var score = 0;
                if (window.AltorraCRM && typeof window.AltorraCRM.computeScore === 'function') {
                    score = window.AltorraCRM.computeScore(c);
                }
                var lastDays = daysSince(c.lastCommAt);
                return {
                    contact: c,
                    score: score,
                    lastDays: lastDays,
                    // Hot lead = score alto AND actividad reciente (< 14 días)
                    heat: score - Math.min(20, lastDays * 0.5)
                };
            })
            .filter(function (x) { return x.score >= 50 && x.lastDays !== Infinity && x.lastDays < 30; })
            .sort(function (a, b) { return b.heat - a.heat; });
        return scored.slice(0, n);
    }

    function hotLeadsFromComms(n) {
        // Reconstrucción mínima desde appointments si AltorraCRM no expone API
        if (!AP.appointments || !AP.appointments.length) return [];
        var byEmail = {};
        AP.appointments.forEach(function (a) {
            if (!a.email) return;
            var key = a.email.toLowerCase();
            if (!byEmail[key]) {
                byEmail[key] = {
                    email: key,
                    nombre: a.nombre || '',
                    telefono: a.telefono || '',
                    comms: [],
                    lastCommAt: null
                };
            }
            byEmail[key].comms.push(a);
            var ts = a.createdAt || a.updatedAt;
            if (ts && (!byEmail[key].lastCommAt || ts > byEmail[key].lastCommAt)) {
                byEmail[key].lastCommAt = ts;
            }
        });
        var contacts = Object.keys(byEmail).map(function (k) { return byEmail[k]; });
        // Asignar score básico basado en cantidad y recencia
        return contacts.map(function (c) {
            var lastDays = daysSince(c.lastCommAt);
            var score = Math.min(100, c.comms.length * 15 + Math.max(0, 30 - lastDays));
            return { contact: c, score: score, lastDays: lastDays, heat: score };
        }).filter(function (x) {
            return x.score >= 40 && x.lastDays < 30;
        }).sort(function (a, b) { return b.heat - a.heat; }).slice(0, n);
    }

    /* ═══════════════════════════════════════════════════════════
       R.3 — VEHÍCULOS AL BORDE (stale detector)
       ═══════════════════════════════════════════════════════════ */
    function staleVehicles(thresholdDays) {
        thresholdDays = thresholdDays || STALE_DAYS_DEFAULT;
        if (!AP.vehicles) return [];
        var now = Date.now();
        return AP.vehicles
            .filter(function (v) {
                if (v.estado !== 'disponible') return false;
                var ts = v.createdAt || v.updatedAt;
                if (!ts) return false;
                var d = daysSince(ts);
                return d >= thresholdDays;
            })
            .map(function (v) {
                return {
                    vehicle: v,
                    daysStale: Math.floor(daysSince(v.createdAt || v.updatedAt))
                };
            })
            .sort(function (a, b) { return b.daysStale - a.daysStale; });
    }

    /* ═══════════════════════════════════════════════════════════
       R.4 — CHURN RISK
       Heurística: contactos con score histórico alto pero lastCommAt
       hace 20+ días. Sin histórico de score persistido (futuro), usamos
       score actual + recencia: si era hot (score ≥ 60) y llevan tiempo
       sin tocar, asumimos enfriamiento.
       ═══════════════════════════════════════════════════════════ */
    function churnRisk() {
        if (!window.AltorraCRM || typeof window.AltorraCRM.getContacts !== 'function') {
            return churnFromComms();
        }
        var contacts = window.AltorraCRM.getContacts() || [];
        return contacts
            .map(function (c) {
                var score = 0;
                if (window.AltorraCRM.computeScore) {
                    score = window.AltorraCRM.computeScore(c);
                }
                var lastDays = daysSince(c.lastCommAt);
                return { contact: c, score: score, lastDays: lastDays };
            })
            .filter(function (x) {
                return x.score >= 50 && x.lastDays >= 20 && x.lastDays !== Infinity && x.lastDays < 90;
            })
            .sort(function (a, b) { return b.score - a.score; })
            .slice(0, 5);
    }

    function churnFromComms() {
        if (!AP.appointments || !AP.appointments.length) return [];
        var byEmail = {};
        AP.appointments.forEach(function (a) {
            if (!a.email) return;
            var key = a.email.toLowerCase();
            if (!byEmail[key]) {
                byEmail[key] = { email: key, nombre: a.nombre || '', comms: [], lastCommAt: null };
            }
            byEmail[key].comms.push(a);
            var ts = a.createdAt || a.updatedAt;
            if (ts && (!byEmail[key].lastCommAt || ts > byEmail[key].lastCommAt)) {
                byEmail[key].lastCommAt = ts;
            }
        });
        return Object.keys(byEmail).map(function (k) {
            var c = byEmail[k];
            var lastDays = daysSince(c.lastCommAt);
            // Usaba mucho la plataforma (3+ comms) y ya no
            var score = Math.min(100, c.comms.length * 15);
            return { contact: c, score: score, lastDays: lastDays };
        }).filter(function (x) {
            return x.score >= 50 && x.lastDays >= 20 && x.lastDays < 90;
        }).sort(function (a, b) { return b.score - a.score; }).slice(0, 5);
    }

    /* ═══════════════════════════════════════════════════════════
       SALES FORECAST — usa AltorraForecast si disponible
       Cuenta ventas (vehiculos con estado='vendido') por mes en últimos 6 meses
       ═══════════════════════════════════════════════════════════ */
    function salesForecast() {
        if (!window.AltorraForecast || !AP.vehicles) return null;
        var byMonth = {};
        var now = new Date();
        for (var i = 5; i >= 0; i--) {
            var d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            var key = d.toISOString().slice(0, 7);
            byMonth[key] = 0;
        }
        AP.vehicles.forEach(function (v) {
            if (v.estado !== 'vendido') return;
            var ts = v.updatedAt || v.lastModifiedAt;
            if (!ts) return;
            var key = String(ts).slice(0, 7);
            if (key in byMonth) byMonth[key]++;
        });
        var values = Object.keys(byMonth).sort().map(function (k) { return byMonth[k]; });
        var total = values.reduce(function (a, b) { return a + b; }, 0);
        if (total < 3) return null; // muy poco histórico
        return {
            history: values,
            forecast: window.AltorraForecast.confidence(values, 1),
            months: Object.keys(byMonth).sort()
        };
    }

    /* ═══════════════════════════════════════════════════════════
       RENDERING — widget en el dashboard
       ═══════════════════════════════════════════════════════════ */
    function renderWidget() {
        var container = $('predictiveInsights');
        if (!container) return;

        var hot = hotLeads(5);
        var stale = staleVehicles().slice(0, 5);
        var churn = churnRisk();
        var forecast = salesForecast();

        var hotHTML = hot.length === 0
            ? '<div class="pred-empty">Sin leads calientes hoy</div>'
            : hot.map(function (h) {
                var c = h.contact;
                var initials = (c.nombre || c.email || '?').split(' ').map(function (w) { return w[0]; }).slice(0, 2).join('').toUpperCase();
                return '<div class="pred-item">' +
                    '<div class="pred-avatar">' + escTxt(initials) + '</div>' +
                    '<div class="pred-body">' +
                        '<div class="pred-name">' + escTxt(c.nombre || c.email || '—') + '</div>' +
                        '<div class="pred-meta">Score ' + Math.round(h.score) + ' · ' + Math.floor(h.lastDays) + 'd</div>' +
                    '</div>' +
                '</div>';
            }).join('');

        var staleHTML = stale.length === 0
            ? '<div class="pred-empty">Sin vehículos estancados</div>'
            : stale.map(function (s) {
                var v = s.vehicle;
                return '<div class="pred-item">' +
                    '<i data-lucide="car" style="color:var(--brand-gold);width:18px;height:18px;flex-shrink:0;"></i>' +
                    '<div class="pred-body">' +
                        '<div class="pred-name">' + escTxt((v.marca || '') + ' ' + (v.modelo || '') + ' ' + (v.year || '')) + '</div>' +
                        '<div class="pred-meta">' + s.daysStale + ' días sin moverse</div>' +
                    '</div>' +
                '</div>';
            }).join('');

        var churnHTML = churn.length === 0
            ? '<div class="pred-empty">Sin riesgo de churn</div>'
            : churn.map(function (h) {
                var c = h.contact;
                return '<div class="pred-item">' +
                    '<i data-lucide="alert-triangle" style="color:var(--status-warning,#facc15);width:18px;height:18px;flex-shrink:0;"></i>' +
                    '<div class="pred-body">' +
                        '<div class="pred-name">' + escTxt(c.nombre || c.email || '—') + '</div>' +
                        '<div class="pred-meta">Score ' + Math.round(h.score) + ' · sin tocar ' + Math.floor(h.lastDays) + 'd</div>' +
                    '</div>' +
                '</div>';
            }).join('');

        var forecastHTML = '';
        if (forecast && forecast.forecast) {
            var pred = Math.round(forecast.forecast.predictions[0]);
            var low = Math.round(forecast.forecast.lower[0]);
            var high = Math.round(forecast.forecast.upper[0]);
            var hist = forecast.history;
            var lastMonth = hist[hist.length - 1];
            var trend = pred >= lastMonth ? '↑' : '↓';
            var trendColor = pred >= lastMonth ? 'var(--status-success)' : 'var(--status-danger)';
            forecastHTML =
                '<div class="pred-forecast">' +
                    '<div class="pred-forecast-head">Predicción próximo mes</div>' +
                    '<div class="pred-forecast-big" style="color:' + trendColor + ';">' + trend + ' ' + pred + '</div>' +
                    '<div class="pred-forecast-range">Rango ' + low + '–' + high + ' (95% confianza)</div>' +
                    '<div class="pred-forecast-r2">Calidad ajuste: ' + Math.round(forecast.forecast.r2 * 100) + '%</div>' +
                '</div>';
        }

        container.innerHTML =
            '<div class="pred-grid">' +
                '<div class="pred-col">' +
                    '<h4 class="pred-col-title"><i data-lucide="flame"></i> Hot leads del día</h4>' +
                    hotHTML +
                '</div>' +
                '<div class="pred-col">' +
                    '<h4 class="pred-col-title"><i data-lucide="package"></i> Vehículos al borde</h4>' +
                    staleHTML +
                '</div>' +
                '<div class="pred-col">' +
                    '<h4 class="pred-col-title"><i data-lucide="alert-triangle"></i> Riesgo de churn</h4>' +
                    churnHTML +
                '</div>' +
                (forecastHTML ? '<div class="pred-col">' +
                    '<h4 class="pred-col-title"><i data-lucide="trending-up"></i> Forecast ventas</h4>' +
                    forecastHTML +
                '</div>' : '') +
            '</div>';

        if (window.AltorraIcons) window.AltorraIcons.refresh(container);
        else if (window.lucide) try { window.lucide.createIcons({ context: container }); } catch (e) {}
    }

    function refresh() {
        if (!AP || !AP.isEditorOrAbove || !AP.isEditorOrAbove()) return;
        renderWidget();
    }

    /* ═══════════════════════════════════════════════════════════
       AUTO-REFRESH
       ═══════════════════════════════════════════════════════════ */
    // Re-render cada vez que se entra al dashboard
    if (window.AltorraSections && window.AltorraSections.onChange) {
        window.AltorraSections.onChange(function (section) {
            if (section === 'dashboard') {
                setTimeout(refresh, 100);
            }
        });
    }
    // Re-render cuando el bus emite eventos relevantes
    if (window.AltorraEventBus) {
        window.AltorraEventBus.on('vehicle.', function () { refresh(); });
        window.AltorraEventBus.on('comm.', function () { refresh(); });
    }

    // Refresh button
    document.addEventListener('click', function (e) {
        if (e.target && e.target.closest && e.target.closest('#predictiveRefresh')) {
            refresh();
        }
    });

    // Init después de que AP cargue datos
    var attempts = 0;
    var int = setInterval(function () {
        attempts++;
        if (window.auth && window.auth.currentUser && AP.isEditorOrAbove && AP.isEditorOrAbove()) {
            // Esperar a que AP.vehicles tenga datos
            if (AP.vehicles && AP.vehicles.length > 0) {
                refresh();
                clearInterval(int);
            } else if (attempts > 60) {
                refresh(); // intentar igual con datos vacíos
                clearInterval(int);
            }
        } else if (attempts > 60) clearInterval(int);
    }, 1000);

    /* ═══════════════════════════════════════════════════════════
       Public API
       ═══════════════════════════════════════════════════════════ */
    window.AltorraPredictive = {
        refresh: refresh,
        hotLeads: hotLeads,
        staleVehicles: staleVehicles,
        churnRisk: churnRisk,
        salesForecast: salesForecast
    };
})();
