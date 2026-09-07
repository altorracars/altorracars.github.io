/**
 * ALTORRA CARS — AI Engine local (Mega-Plan v4, Bloque J)
 * =========================================================
 * Browser-side AI capabilities — zero recurring cost, zero PII leakage,
 * runs on the admin's machine in milliseconds.
 *
 * J.1 — Foundation + rule-based sentiment (this file)
 * J.2 — NER (entity extraction)         → js/ai/ner.js
 * J.3 — Lead scoring (logistic reg)     → js/ai/scoring.js
 * J.4 — No-show prediction              → js/ai/no-show.js
 * J.5 — Anomaly detection on KPIs       → js/ai/anomaly.js
 * J.6 — Image auto-categorizer          → js/ai/vision.js
 * J.7 — OCR plates + cedulas            → js/ai/ocr.js
 * J.8 — Next Best Action                → js/ai/nba.js
 *
 * Architecture:
 *   - Rule-based fast path for sub-millisecond sync inference
 *   - ML upgrade slot (Transformers.js / TF.js) lazy-loaded ON DEMAND
 *   - Pluggable: each capability registers a `provider(input) → output`
 *
 * Public API:
 *   AltorraAI.sentiment(text)              → sync, instant
 *   AltorraAI.sentimentAsync(text)         → async, may upgrade to ML
 *   AltorraAI.registerProvider(name, fn)   → swap in ML model
 *   AltorraAI.capabilities                 → introspect what's available
 *   AltorraAI.health()                     → debug status
 *
 * Privacy: ALL inference runs locally. Texts never leave the browser
 * unless the admin explicitly persists them (e.g. sentiment score in
 * Firestore). The model weights (when ML upgrade lands) are CDN-loaded
 * and cached by the SW.
 */
(function () {
    'use strict';
    if (window.AltorraAI) return;

    /* ═══════════════════════════════════════════════════════════
       CAPABILITY REGISTRY
       ═══════════════════════════════════════════════════════════ */
    var providers = {
        sentiment: null,    // ML upgrade slot — null until loaded
        ner: null,
        scoring: null,
        nba: null,
        chat: null          // FASE 3 — LLM chat provider (Cloud Function callable)
    };

    var stats = {
        callsByCapability: { sentiment: 0, ner: 0, scoring: 0, nba: 0, chat: 0 },
        upgradedCapabilities: []
    };

    function registerProvider(name, fn) {
        if (!providers.hasOwnProperty(name)) {
            console.warn('[AI] Unknown capability:', name);
            return;
        }
        providers[name] = fn;
        if (stats.upgradedCapabilities.indexOf(name) === -1) {
            stats.upgradedCapabilities.push(name);
        }
    }

    /* ═══════════════════════════════════════════════════════════
       SENTIMENT — rule-based fast path
       Multilingual (Spanish primary, English fallback) lexicon scoring.
       Tuned for car-buying conversations: complaints about price,
       enthusiasm about features, urgency cues, negation handling.
       ═══════════════════════════════════════════════════════════ */
    var POSITIVE_LEXICON = {
        // Spanish — strong positive
        'excelente': 2, 'perfecto': 2, 'genial': 2, 'increible': 2,
        'increíble': 2, 'maravilloso': 2, 'fantastico': 2, 'fantástico': 2,
        'encanta': 2, 'encantó': 2, 'amo': 2, 'amé': 2, 'amazing': 2,
        // Spanish — moderate positive
        'bueno': 1, 'buena': 1, 'gracias': 1, 'feliz': 1, 'contento': 1,
        'contenta': 1, 'satisfecho': 1, 'satisfecha': 1, 'recomiendo': 1,
        'recomendado': 1, 'recomendada': 1, 'agradezco': 1, 'agradecido': 1,
        'oportunidad': 1, 'interesado': 1, 'interesada': 1, 'me gusta': 1,
        'sí': 1, 'si': 1, 'genial': 1, 'va': 1, 'listo': 1,
        // English fallback
        'great': 2, 'awesome': 2, 'love': 2, 'happy': 1, 'good': 1,
        'thanks': 1, 'interested': 1, 'recommend': 1
    };

    var NEGATIVE_LEXICON = {
        // Spanish — strong negative
        'pesimo': -2, 'pésimo': -2, 'horrible': -2, 'terrible': -2,
        'odio': -2, 'odié': -2, 'estafa': -2, 'fraude': -2, 'mentira': -2,
        'engañado': -2, 'engañaron': -2, 'reclamar': -2, 'queja': -2,
        // Spanish — moderate negative
        'malo': -1, 'mala': -1, 'caro': -1, 'cara': -1, 'lento': -1,
        'lenta': -1, 'tarde': -1, 'demora': -1, 'molesto': -1, 'molesta': -1,
        'problema': -1, 'problemas': -1, 'no': -1, 'nunca': -1, 'jamás': -1,
        'jamas': -1, 'nada': -1, 'imposible': -1, 'frustrado': -1,
        'decepcionado': -1, 'decepcionada': -1, 'preocupado': -1,
        'preocupada': -1, 'cancelar': -1, 'cancelo': -1,
        // English fallback
        'bad': -1, 'awful': -2, 'terrible': -2, 'hate': -2, 'angry': -1,
        'expensive': -1, 'slow': -1, 'late': -1, 'problem': -1
    };

    var NEGATION_TOKENS = ['no', 'nunca', 'jamás', 'jamas', 'tampoco', 'ni', 'sin', 'not', 'never'];

    var INTENSIFIERS = { 'muy': 1.5, 'mucho': 1.4, 'super': 1.5, 'tan': 1.3, 'really': 1.5, 'very': 1.5 };

    function tokenize(text) {
        return (text || '')
            .toLowerCase()
            .replace(/[¡!¿?.,;:()"\[\]{}—–\-\/\\]/g, ' ')
            .split(/\s+/)
            .filter(Boolean);
    }

    function sentiment(text) {
        stats.callsByCapability.sentiment++;
        // ML provider upgrade slot — uses if registered
        if (providers.sentiment) {
            try { return providers.sentiment(text); }
            catch (e) { /* fallback to rules */ }
        }
        if (!text || typeof text !== 'string') {
            return { label: 'neutral', score: 0, magnitude: 0, source: 'rules' };
        }
        var tokens = tokenize(text);
        if (tokens.length === 0) {
            return { label: 'neutral', score: 0, magnitude: 0, source: 'rules' };
        }
        var totalScore = 0;
        var hits = 0;
        var intensifierStack = 1;
        var negationStack = false;

        for (var i = 0; i < tokens.length; i++) {
            var t = tokens[i];
            if (NEGATION_TOKENS.indexOf(t) !== -1) {
                negationStack = true;
                continue;
            }
            if (INTENSIFIERS[t]) {
                intensifierStack = INTENSIFIERS[t];
                continue;
            }
            var s = 0;
            if (POSITIVE_LEXICON[t]) s = POSITIVE_LEXICON[t];
            else if (NEGATIVE_LEXICON[t]) s = NEGATIVE_LEXICON[t];
            if (s !== 0) {
                if (negationStack) s = -s;
                s *= intensifierStack;
                totalScore += s;
                hits++;
                negationStack = false;
                intensifierStack = 1;
            }
        }
        // Normalize: cap at ±5 for the score
        var normalized = Math.max(-1, Math.min(1, totalScore / 5));
        var magnitude = Math.min(1, hits / 5);
        var label;
        if (normalized > 0.15) label = 'positive';
        else if (normalized < -0.15) label = 'negative';
        else label = 'neutral';
        return { label: label, score: normalized, magnitude: magnitude, source: 'rules' };
    }

    /** Async wrapper — gives the ML upgrade a place to land later */
    function sentimentAsync(text) {
        return Promise.resolve(sentiment(text));
    }

    /* ═══════════════════════════════════════════════════════════
       CHAT (LLM) — async, retorna {text, source} o null si no
       hay provider registrado. El caller debe manejar el fallback
       a rule-based. Timeout configurable (default 12s).
       ═══════════════════════════════════════════════════════════ */
    function chat(messages, opts) {
        opts = opts || {};
        stats.callsByCapability.chat++;
        if (!providers.chat) return Promise.resolve(null);
        var timeoutMs = opts.timeoutMs || 12000;
        return new Promise(function (resolve, reject) {
            var done = false;
            var timer = setTimeout(function () {
                if (done) return;
                done = true;
                reject(new Error('chat timeout (' + timeoutMs + 'ms)'));
            }, timeoutMs);
            try {
                Promise.resolve(providers.chat(messages, opts)).then(function (result) {
                    if (done) return;
                    done = true;
                    clearTimeout(timer);
                    resolve(result);
                }).catch(function (err) {
                    if (done) return;
                    done = true;
                    clearTimeout(timer);
                    reject(err);
                });
            } catch (err) {
                if (done) return;
                done = true;
                clearTimeout(timer);
                reject(err);
            }
        });
    }

    /* ═══════════════════════════════════════════════════════════
       INTROSPECTION
       ═══════════════════════════════════════════════════════════ */
    function capabilities() {
        return {
            sentiment: { available: true, source: providers.sentiment ? 'ml' : 'rules' },
            ner: { available: !!providers.ner, source: providers.ner ? 'ml' : 'rules' },
            scoring: { available: !!providers.scoring, source: providers.scoring ? 'ml' : 'rules' },
            nba: { available: !!providers.nba, source: providers.nba ? 'ml' : 'rules' },
            chat: { available: !!providers.chat, source: providers.chat ? 'llm' : 'none' }
        };
    }

    function health() {
        return {
            providers: Object.keys(providers).reduce(function (acc, k) {
                acc[k] = providers[k] ? 'ml' : 'rules';
                return acc;
            }, {}),
            stats: stats,
            buildVersion: 'J.1'
        };
    }

    /* ═══════════════════════════════════════════════════════════
       Public API
       ═══════════════════════════════════════════════════════════ */
    window.AltorraAI = {
        // Synchronous — use in hot paths (rendering, scoring)
        sentiment: sentiment,
        // Async — opt-in for higher accuracy when ML provider available
        sentimentAsync: sentimentAsync,
        // FASE 3 — LLM chat (async, requires registered chat provider)
        chat: chat,
        // ML model registration (for J.1+ when Transformers.js loads)
        registerProvider: registerProvider,
        capabilities: capabilities,
        health: health,
        // Expose providers para que callers puedan check `if (AltorraAI.providers.chat)`
        get providers() { return providers; },
        // Private — escape hatches for testing/debugging
        _providers: providers,
        _stats: stats
    };
})();
