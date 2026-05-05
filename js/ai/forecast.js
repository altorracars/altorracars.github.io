/**
 * ALTORRA CARS — Forecast lineal (Mega-Plan v4, Microfase R.1)
 * ==============================================================
 * Predicción numérica usando regresión lineal por mínimos cuadrados.
 * Cero dependencias externas, sub-millisegundo, ideal para forecasts
 * de ventas, leads, citas mensuales/semanales.
 *
 * Si el histórico es < 3 puntos: retorna null (no hay señal suficiente).
 *
 * Public API:
 *   AltorraForecast.linear(values)            → {slope, intercept, predict, r2}
 *   AltorraForecast.predictNext(values, n=1)  → array de n predicciones
 *   AltorraForecast.confidence(values, n=1)   → {predictions, lower, upper}
 *   AltorraForecast.movingAverage(values, w)  → array suavizado
 *   AltorraForecast.detectAnomaly(values, σ=2) → array con índices anómalos
 */
(function () {
    'use strict';
    if (window.AltorraForecast) return;

    /* ═══════════════════════════════════════════════════════════
       LINEAR REGRESSION — least squares
       ═══════════════════════════════════════════════════════════ */
    function linear(values) {
        if (!Array.isArray(values) || values.length < 3) return null;
        var n = values.length;
        var sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
        for (var i = 0; i < n; i++) {
            sumX += i;
            sumY += values[i];
            sumXY += i * values[i];
            sumX2 += i * i;
        }
        var meanX = sumX / n;
        var meanY = sumY / n;
        var denom = (n * sumX2 - sumX * sumX);
        if (denom === 0) return null;
        var slope = (n * sumXY - sumX * sumY) / denom;
        var intercept = meanY - slope * meanX;

        // R² — qué tan bien se ajusta la línea
        var ssRes = 0, ssTot = 0;
        for (var j = 0; j < n; j++) {
            var pred = intercept + slope * j;
            ssRes += Math.pow(values[j] - pred, 2);
            ssTot += Math.pow(values[j] - meanY, 2);
        }
        var r2 = ssTot === 0 ? 0 : Math.max(0, 1 - ssRes / ssTot);

        return {
            slope: slope,
            intercept: intercept,
            r2: r2,
            n: n,
            predict: function (x) { return intercept + slope * x; }
        };
    }

    /* ═══════════════════════════════════════════════════════════
       FORECAST — predicciones para los próximos N períodos
       ═══════════════════════════════════════════════════════════ */
    function predictNext(values, n) {
        n = n || 1;
        var fit = linear(values);
        if (!fit) return null;
        var out = [];
        for (var i = 0; i < n; i++) {
            var x = values.length + i;
            var v = fit.predict(x);
            // No retornar predicciones negativas para conteos (ventas, leads)
            out.push(Math.max(0, v));
        }
        return out;
    }

    /* ═══════════════════════════════════════════════════════════
       CONFIDENCE INTERVAL — usando residuales del fit
       Devuelve banda de ±1.96σ (95% confianza aproximada)
       ═══════════════════════════════════════════════════════════ */
    function confidence(values, n) {
        n = n || 1;
        var fit = linear(values);
        if (!fit) return null;

        // Calcular σ de los residuales
        var residuals = [];
        for (var i = 0; i < values.length; i++) {
            residuals.push(values[i] - fit.predict(i));
        }
        var meanRes = residuals.reduce(function (a, b) { return a + b; }, 0) / residuals.length;
        var variance = residuals.reduce(function (acc, r) {
            return acc + Math.pow(r - meanRes, 2);
        }, 0) / Math.max(1, residuals.length - 2);
        var sigma = Math.sqrt(variance);

        var predictions = predictNext(values, n);
        var lower = predictions.map(function (p) { return Math.max(0, p - 1.96 * sigma); });
        var upper = predictions.map(function (p) { return p + 1.96 * sigma; });

        return {
            predictions: predictions,
            lower: lower,
            upper: upper,
            sigma: sigma,
            r2: fit.r2
        };
    }

    /* ═══════════════════════════════════════════════════════════
       MOVING AVERAGE — suavizado para reducir ruido
       window: tamaño de la ventana (default 3)
       ═══════════════════════════════════════════════════════════ */
    function movingAverage(values, window) {
        window = window || 3;
        if (!Array.isArray(values) || values.length === 0) return [];
        var out = [];
        for (var i = 0; i < values.length; i++) {
            var start = Math.max(0, i - window + 1);
            var slice = values.slice(start, i + 1);
            var avg = slice.reduce(function (a, b) { return a + b; }, 0) / slice.length;
            out.push(avg);
        }
        return out;
    }

    /* ═══════════════════════════════════════════════════════════
       ANOMALY DETECTION — z-score sobre residuales
       Devuelve índices donde el valor está a >σ desviaciones de la media
       ═══════════════════════════════════════════════════════════ */
    function detectAnomaly(values, threshold) {
        threshold = threshold || 2;
        if (!Array.isArray(values) || values.length < 3) return [];
        var mean = values.reduce(function (a, b) { return a + b; }, 0) / values.length;
        var variance = values.reduce(function (acc, v) {
            return acc + Math.pow(v - mean, 2);
        }, 0) / values.length;
        var sigma = Math.sqrt(variance);
        if (sigma === 0) return [];

        var anomalies = [];
        for (var i = 0; i < values.length; i++) {
            var z = (values[i] - mean) / sigma;
            if (Math.abs(z) >= threshold) {
                anomalies.push({
                    index: i,
                    value: values[i],
                    zScore: z,
                    direction: z > 0 ? 'high' : 'low'
                });
            }
        }
        return anomalies;
    }

    /* ═══════════════════════════════════════════════════════════
       Public API
       ═══════════════════════════════════════════════════════════ */
    window.AltorraForecast = {
        linear: linear,
        predictNext: predictNext,
        confidence: confidence,
        movingAverage: movingAverage,
        detectAnomaly: detectAnomaly
    };
})();
