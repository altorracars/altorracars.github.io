/**
 * ALTORRA CARS — Insights automáticos (Mega-Plan v4, Microfase O.6)
 * ===================================================================
 * Panel "Lo que el sistema notó esta semana" en el dashboard.
 * Combina señales del Predictive (R) + AI Engine (J) + CRM + Graph
 * para producir insights accionables priorizados.
 *
 * 7 generadores de insights:
 *   1. Vehículos estancados (R.3)
 *   2. Anomalías en volumen de solicitudes (forecast.detectAnomaly)
 *   3. Hot leads sin contactar (R.2 + recencia)
 *   4. Churn risk (R.4)
 *   5. Caídas en ventas (forecast con R²)
 *   6. Sentiment negativo recurrente (J.1 sobre comms recientes)
 *   7. KB no usada (FAQs sin uso reciente)
 *
 * Cada insight tiene:
 *   - severity: 'critical' | 'warning' | 'info'
 *   - icon, title, message
 *   - action: { label, navigate? | onClick? }
 *
 * Public API:
 *   AltorraInsights.refresh()  → recalcula y renderiza
 *   AltorraInsights.list()     → array de insights actuales
 */
(function () {
    'use strict';
    if (window.AltorraInsights) return;
    var AP = window.AP;
    if (!AP) return;

    var DAY_MS = 86400000;
    var _insights = [];

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
        if (!t || isNaN(t)) return Infinity;
        return (Date.now() - t) / DAY_MS;
    }

    /* ═══════════════════════════════════════════════════════════
       GENERADORES — cada uno retorna 0 o más insights
       ═══════════════════════════════════════════════════════════ */
    function genStaleVehicles() {
        if (!window.AltorraPredictive || !AP.vehicles) return [];
        var stale = window.AltorraPredictive.staleVehicles(60);
        if (stale.length === 0) return [];
        var critical = stale.filter(function (s) { return s.daysStale >= 90; });
        if (critical.length >= 3) {
            return [{
                severity: 'warning',
                icon: 'package',
                title: critical.length + ' vehículos estancados +90 días',
                message: 'Considerá ajustar precios o mover a destacados.',
                action: { label: 'Ver inventario', section: 'vehicles' }
            }];
        }
        if (stale.length >= 5) {
            return [{
                severity: 'info',
                icon: 'package',
                title: stale.length + ' vehículos sin moverse +60 días',
                message: 'Algunos pueden necesitar boost de visibilidad.',
                action: { label: 'Ver inventario', section: 'vehicles' }
            }];
        }
        return [];
    }

    function genHotLeadsUnreached() {
        if (!window.AltorraPredictive) return [];
        var hot = window.AltorraPredictive.hotLeads(10);
        var stale = hot.filter(function (h) { return h.lastDays >= 3; });
        if (stale.length === 0) return [];
        return [{
            severity: stale.length >= 3 ? 'critical' : 'warning',
            icon: 'flame',
            title: stale.length + ' lead' + (stale.length > 1 ? 's' : '') + ' caliente' +
                   (stale.length > 1 ? 's' : '') + ' sin tocar',
            message: 'Score ≥ 50 y >3 días sin contactar. Llamá hoy mismo.',
            action: { label: 'Ver CRM', section: 'crm' }
        }];
    }

    function genChurnRisk() {
        if (!window.AltorraPredictive) return [];
        var churn = window.AltorraPredictive.churnRisk();
        if (churn.length === 0) return [];
        return [{
            severity: 'warning',
            icon: 'alert-triangle',
            title: churn.length + ' contacto' + (churn.length > 1 ? 's' : '') + ' en riesgo de churn',
            message: 'Eran hot/tibios pero llevan 20+ días sin actividad.',
            action: { label: 'Reactivar', section: 'crm' }
        }];
    }

    function genVolumeAnomaly() {
        if (!window.AltorraForecast || !AP.appointments) return [];
        // Contar solicitudes por día en últimos 14 días
        var counts = {};
        var now = new Date();
        for (var i = 13; i >= 0; i--) {
            var d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
            counts[d.toISOString().slice(0, 10)] = 0;
        }
        AP.appointments.forEach(function (a) {
            var ts = a.createdAt;
            if (!ts) return;
            var key = String(ts).slice(0, 10);
            if (key in counts) counts[key]++;
        });
        var values = Object.values(counts);
        var anomalies = window.AltorraForecast.detectAnomaly(values, 2);
        if (anomalies.length === 0) return [];
        var lastAnomaly = anomalies[anomalies.length - 1];
        var keys = Object.keys(counts);
        var anomalyDate = keys[lastAnomaly.index];
        if (lastAnomaly.direction === 'high') {
            return [{
                severity: 'info',
                icon: 'trending-up',
                title: 'Pico de solicitudes detectado',
                message: lastAnomaly.value + ' solicitudes el ' + anomalyDate +
                         ' (vs promedio). Asegurá capacidad de respuesta.',
                action: { label: 'Ver bandeja', section: 'appointments' }
            }];
        } else {
            return [{
                severity: 'warning',
                icon: 'trending-down',
                title: 'Caída en volumen de solicitudes',
                message: 'Solo ' + lastAnomaly.value + ' el ' + anomalyDate +
                         '. Revisá el pipeline de atracción.',
                action: { label: 'Ver bandeja', section: 'appointments' }
            }];
        }
    }

    function genSalesForecastTrend() {
        if (!window.AltorraPredictive) return [];
        var f = window.AltorraPredictive.salesForecast();
        if (!f || !f.forecast) return [];
        var pred = f.forecast.predictions[0];
        var hist = f.history;
        var lastMonth = hist[hist.length - 1];
        if (lastMonth === 0) return [];
        var change = (pred - lastMonth) / lastMonth;
        if (change < -0.20) {
            return [{
                severity: 'warning',
                icon: 'trending-down',
                title: 'Forecast: ventas próximo mes en bajada',
                message: 'Predicción ~' + Math.round(pred) + ' (vs ' + lastMonth +
                         ' último mes). Revisá embudo de leads.',
                action: { label: 'Ver dashboard', section: 'dashboard' }
            }];
        }
        if (change > 0.30) {
            return [{
                severity: 'info',
                icon: 'trending-up',
                title: 'Forecast: ventas próximo mes en alza',
                message: 'Predicción ~' + Math.round(pred) + ' (vs ' + lastMonth +
                         '). Asegurá inventario suficiente.',
                action: { label: 'Ver dashboard', section: 'dashboard' }
            }];
        }
        return [];
    }

    function genNegativeSentimentRecent() {
        if (!window.AltorraAI || !AP.appointments) return [];
        var recent = AP.appointments.filter(function (a) {
            var d = daysSince(a.createdAt);
            return d <= 7 && (a.observaciones || a.comentarios || a.mensaje);
        });
        var negCount = 0;
        recent.forEach(function (a) {
            var msg = a.observaciones || a.comentarios || a.mensaje || '';
            if (msg.length < 8) return;
            var s = window.AltorraAI.sentiment(msg);
            if (s && s.label === 'negative') negCount++;
        });
        if (negCount >= 3) {
            return [{
                severity: 'warning',
                icon: 'message-square-warning',
                title: negCount + ' mensaje' + (negCount > 1 ? 's' : '') + ' negativo' +
                       (negCount > 1 ? 's' : '') + ' esta semana',
                message: 'Revisá conversaciones recientes para entender la causa.',
                action: { label: 'Ver bandeja', section: 'appointments' }
            }];
        }
        return [];
    }

    function genUnusedKB() {
        if (!window.AltorraKB || !window.AltorraKB.list) return [];
        var entries = window.AltorraKB.list();
        if (entries.length === 0) {
            return [{
                severity: 'info',
                icon: 'book-open',
                title: 'Knowledge Base vacía',
                message: 'Agregá FAQs para que el Concierge responda automáticamente.',
                action: { label: 'Ir al KB', section: 'kb' }
            }];
        }
        var unused = entries.filter(function (e) {
            return e.enabled !== false && (!e.usageCount || e.usageCount === 0);
        });
        if (unused.length >= 5) {
            return [{
                severity: 'info',
                icon: 'book-open',
                title: unused.length + ' FAQs nunca usadas',
                message: 'Quizás las keywords no están bien afinadas o no aplican.',
                action: { label: 'Revisar KB', section: 'kb' }
            }];
        }
        return [];
    }

    /* ═══════════════════════════════════════════════════════════
       AGGREGATOR
       ═══════════════════════════════════════════════════════════ */
    function generateInsights() {
        var generators = [
            genStaleVehicles,
            genHotLeadsUnreached,
            genChurnRisk,
            genVolumeAnomaly,
            genSalesForecastTrend,
            genNegativeSentimentRecent,
            genUnusedKB
        ];
        var all = [];
        generators.forEach(function (gen) {
            try {
                var insights = gen();
                if (Array.isArray(insights)) {
                    all = all.concat(insights);
                }
            } catch (e) {
                console.warn('[Insights] generator failed:', e.message);
            }
        });
        // Sort por severity (critical → warning → info)
        var severityOrder = { critical: 0, warning: 1, info: 2 };
        all.sort(function (a, b) {
            return (severityOrder[a.severity] || 3) - (severityOrder[b.severity] || 3);
        });
        return all;
    }

    /* ═══════════════════════════════════════════════════════════
       RENDERING
       ═══════════════════════════════════════════════════════════ */
    function renderWidget() {
        var container = $('insightsList');
        if (!container) return;

        _insights = generateInsights();

        if (_insights.length === 0) {
            container.innerHTML =
                '<div class="insights-empty">' +
                    '<i data-lucide="check-circle-2" style="width:32px;height:32px;color:var(--status-success);opacity:0.6;"></i>' +
                    '<p>Todo va bien — sin alertas relevantes esta semana.</p>' +
                '</div>';
        } else {
            container.innerHTML = _insights.map(function (ins) {
                return '<div class="insight-item insight-item--' + ins.severity + '">' +
                    '<div class="insight-icon">' +
                        '<i data-lucide="' + escTxt(ins.icon) + '"></i>' +
                    '</div>' +
                    '<div class="insight-body">' +
                        '<div class="insight-title">' + escTxt(ins.title) + '</div>' +
                        '<div class="insight-message">' + escTxt(ins.message) + '</div>' +
                    '</div>' +
                    (ins.action ? '<button class="alt-btn alt-btn--ghost alt-btn--sm" data-insight-action="' +
                        escTxt(ins.action.section || '') + '">' +
                        escTxt(ins.action.label) +
                        ' <i data-lucide="arrow-right"></i>' +
                    '</button>' : '') +
                '</div>';
            }).join('');
        }
        if (window.AltorraIcons) window.AltorraIcons.refresh(container);
        else if (window.lucide) try { window.lucide.createIcons({ context: container }); } catch (e) {}
    }

    function refresh() {
        if (!AP || !AP.isEditorOrAbove || !AP.isEditorOrAbove()) return;
        renderWidget();
    }

    /* ═══════════════════════════════════════════════════════════
       EVENTS
       ═══════════════════════════════════════════════════════════ */
    document.addEventListener('click', function (e) {
        var btn = e.target.closest && e.target.closest('[data-insight-action]');
        if (btn) {
            var section = btn.getAttribute('data-insight-action');
            if (section && window.AltorraSections) {
                window.AltorraSections.go(section);
            }
        }
        if (e.target && e.target.closest && e.target.closest('#insightsRefresh')) {
            refresh();
        }
    });

    // Auto-refresh cuando admin entra al dashboard
    if (window.AltorraSections && window.AltorraSections.onChange) {
        window.AltorraSections.onChange(function (section) {
            if (section === 'dashboard') {
                setTimeout(refresh, 200);
            }
        });
    }

    // Re-render cuando bus emite eventos relevantes
    if (window.AltorraEventBus) {
        window.AltorraEventBus.on('vehicle.', function () { refresh(); });
        window.AltorraEventBus.on('comm.', function () { refresh(); });
    }

    // Init después de que AP cargue datos + módulos AI
    var attempts = 0;
    var int = setInterval(function () {
        attempts++;
        if (window.auth && window.auth.currentUser && AP.isEditorOrAbove && AP.isEditorOrAbove()) {
            if (AP.vehicles && AP.appointments) {
                refresh();
                clearInterval(int);
            } else if (attempts > 90) {
                refresh();
                clearInterval(int);
            }
        } else if (attempts > 60) clearInterval(int);
    }, 1500);

    /* ═══════════════════════════════════════════════════════════
       Public API
       ═══════════════════════════════════════════════════════════ */
    window.AltorraInsights = {
        refresh: refresh,
        list: function () { return _insights.slice(); },
        // Debug helpers
        _generators: {
            stale: genStaleVehicles,
            hotUnreached: genHotLeadsUnreached,
            churn: genChurnRisk,
            anomaly: genVolumeAnomaly,
            forecast: genSalesForecastTrend,
            sentiment: genNegativeSentimentRecent,
            kb: genUnusedKB
        }
    };
})();
