/**
 * AltorraTransformers — Lazy loader de Transformers.js (Xenova)
 * §24 FASE 3 (Offline Ultra Brain 2.0).
 *
 * Carga modelos de ML directamente en el browser para zero-shot
 * classification y embeddings semánticos. Costo $0 — todo runtime
 * en cliente.
 *
 * IMPORTANTE — feature flag DESACTIVADO por defecto.
 * El módulo NO descarga nada hasta que se active explícitamente vía:
 *   localStorage.setItem('altorra_tf_enabled', '1')
 * o via admin Cerebro AI tab.
 *
 * Razón: el modelo distilbert-base-multilingual-cased pesa ~134MB.
 * Sin opt-in, descargarlo afectaría datos móviles y batería del cliente.
 *
 * Cuando esté activado:
 *   - Lazy load en demand: solo descarga al primer classify() llamado
 *     por DualCore cuando el rule-based devuelve intent='none'
 *   - Cache automático en IndexedDB (handled by Transformers.js v3+)
 *   - Web Worker para no bloquear main thread durante inferencia
 *   - Progress bar visible al cliente durante primer download
 *
 * API:
 *   AltorraTransformers.isEnabled()       → boolean
 *   AltorraTransformers.enable()          → activa el flag (UI admin)
 *   AltorraTransformers.disable()
 *   AltorraTransformers.classify(text, candidateLabels) → Promise<{label, score}>
 *   AltorraTransformers.preload()         → kick off download manually
 *   AltorraTransformers.health()          → estado actual
 *
 * Si el feature flag está OFF, classify() retorna null (signal a
 * DualCore para que use otra capa).
 */
(function () {
    'use strict';
    if (window.AltorraTransformers) return;

    var FLAG_KEY = 'altorra_tf_enabled';
    var TF_CDN = 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2';
    var MODEL_NAME = 'Xenova/nli-deberta-v3-xsmall';  // ~70MB, multilingüe-friendly

    var _state = {
        loaded: false,
        loading: false,
        pipeline: null,
        loadError: null,
        downloadProgress: 0
    };

    /* ─── Feature flag ──────────────────────────────────────────── */

    function isEnabled() {
        try {
            return localStorage.getItem(FLAG_KEY) === '1';
        } catch (e) { return false; }
    }

    function enable() {
        try { localStorage.setItem(FLAG_KEY, '1'); }
        catch (e) {}
        return isEnabled();
    }

    function disable() {
        try { localStorage.removeItem(FLAG_KEY); }
        catch (e) {}
        // Limpiar pipeline en memoria (cache IndexedDB queda hasta clear browser)
        _state.pipeline = null;
        _state.loaded = false;
    }

    /* ─── Lazy loader ────────────────────────────────────────────── */

    function _loadPipeline() {
        if (_state.loaded && _state.pipeline) return Promise.resolve(_state.pipeline);
        if (_state.loading) {
            // Polling: esperamos al loading actual
            return new Promise(function (resolve, reject) {
                var attempts = 0;
                var iv = setInterval(function () {
                    attempts++;
                    if (_state.loaded && _state.pipeline) {
                        clearInterval(iv); resolve(_state.pipeline);
                    } else if (_state.loadError) {
                        clearInterval(iv); reject(_state.loadError);
                    } else if (attempts > 600) {  // 60s timeout
                        clearInterval(iv); reject(new Error('load-timeout'));
                    }
                }, 100);
            });
        }

        _state.loading = true;
        _state.loadError = null;

        // Cargar Transformers.js dynamic import
        return import(TF_CDN + '/dist/transformers.min.js')
            .catch(function () {
                // Fallback: load via <script> tag (más compatible con compat SDK)
                return new Promise(function (resolve, reject) {
                    var script = document.createElement('script');
                    script.src = TF_CDN + '/dist/transformers.min.js';
                    script.type = 'module';
                    script.onload = function () {
                        if (window.transformers) resolve(window.transformers);
                        else reject(new Error('transformers-not-attached'));
                    };
                    script.onerror = reject;
                    document.head.appendChild(script);
                });
            })
            .then(function (mod) {
                if (!mod || !mod.pipeline) {
                    throw new Error('transformers-pipeline-not-found');
                }
                // Configurar caching IndexedDB (built-in en v2+)
                if (mod.env) {
                    mod.env.useBrowserCache = true;
                    mod.env.allowRemoteModels = true;
                    if (mod.env.backends && mod.env.backends.onnx && mod.env.backends.onnx.wasm) {
                        mod.env.backends.onnx.wasm.numThreads = navigator.hardwareConcurrency || 2;
                    }
                }
                // Crear pipeline zero-shot-classification
                return mod.pipeline('zero-shot-classification', MODEL_NAME, {
                    progress_callback: function (data) {
                        if (data && typeof data.progress === 'number') {
                            _state.downloadProgress = Math.round(data.progress);
                            if (window.notify && _state.downloadProgress % 25 === 0) {
                                // Notify cada 25%
                                console.log('[Transformers] Download:', _state.downloadProgress + '%');
                            }
                        }
                    }
                });
            })
            .then(function (pipeline) {
                _state.pipeline = pipeline;
                _state.loaded = true;
                _state.loading = false;
                console.log('[Transformers] Pipeline ready');
                return pipeline;
            })
            .catch(function (err) {
                _state.loading = false;
                _state.loadError = err;
                console.warn('[Transformers] Load failed:', err && err.message);
                throw err;
            });
    }

    /* ─── classify — entry point ─────────────────────────────────── */

    /**
     * classify — zero-shot classification del texto contra labels candidatos.
     *
     * Args:
     *   text — string del usuario
     *   candidateLabels — array opcional. Default: intents canonical
     *
     * Returns:
     *   Promise<{label, score, allScores}> o null si feature flag OFF
     */
    function classify(text, candidateLabels) {
        if (!isEnabled()) return Promise.resolve(null);
        if (!text || typeof text !== 'string') return Promise.resolve(null);

        var labels = candidateLabels || [
            'consulta sobre inventario o catálogo',
            'pregunta de precio',
            'consulta de financiación',
            'agendar cita o visita',
            'vender mi auto o consignar',
            'saludo coloquial',
            'agradecimiento',
            'despedida',
            'pregunta general'
        ];

        return _loadPipeline().then(function (pipeline) {
            return pipeline(text, labels, {
                hypothesis_template: 'Esta consulta es sobre {}.'
            });
        }).then(function (result) {
            if (!result || !result.labels || !result.scores) return null;
            return {
                label: result.labels[0],
                score: result.scores[0],
                allLabels: result.labels,
                allScores: result.scores
            };
        }).catch(function (err) {
            console.warn('[Transformers] classify failed:', err && err.message);
            return null;
        });
    }

    /**
     * mapToIntent — convierte label de zero-shot a intent canonical
     * que el resto del sistema entiende (LEXICON keys).
     */
    function mapToIntent(zeroShotLabel) {
        var map = {
            'consulta sobre inventario o catálogo': 'inventory_query',
            'pregunta de precio': 'pricing_query',
            'consulta de financiación': 'financiacion_query',
            'agendar cita o visita': 'appointment_request',
            'vender mi auto o consignar': 'sell_my_car',
            'saludo coloquial': 'greeting',
            'agradecimiento': 'thanks',
            'despedida': 'goodbye',
            'pregunta general': 'none'
        };
        return map[zeroShotLabel] || 'none';
    }

    /* ─── Diagnostics ────────────────────────────────────────────── */

    function health() {
        return {
            enabled: isEnabled(),
            loaded: _state.loaded,
            loading: _state.loading,
            modelName: MODEL_NAME,
            downloadProgress: _state.downloadProgress,
            loadError: _state.loadError && _state.loadError.message
        };
    }

    function preload() {
        if (!isEnabled()) {
            console.warn('[Transformers] Feature flag OFF — habilita primero con .enable()');
            return Promise.resolve(false);
        }
        return _loadPipeline().then(function () { return true; })
            .catch(function () { return false; });
    }

    /* ─── Public API ─────────────────────────────────────────────── */
    window.AltorraTransformers = {
        isEnabled: isEnabled,
        enable: enable,
        disable: disable,
        classify: classify,
        mapToIntent: mapToIntent,
        preload: preload,
        health: health,
        MODEL_NAME: MODEL_NAME
    };
})();
