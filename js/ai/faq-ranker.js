/**
 * AltorraFAQRanker — TF-IDF ranking de FAQs
 *
 * Propuesta #1 del Offline Ultra Brain (§22 del CLAUDE.md).
 *
 * Reemplaza el matching por keyword simple con un ranker TF-IDF que
 * pondera tokens raros (ej. "peritaje") más que tokens comunes
 * (ej. "auto"). Combina con typo tolerance vía AltorraFuzzy y
 * boost por priority/usageCount del admin.
 *
 * Esto es el motor que usa Zendesk Answer Bot por debajo: ranking
 * matemático sobre el corpus, no matching string crudo.
 *
 * API:
 *   AltorraFAQRanker.buildIndex(faqs)         → index object
 *   AltorraFAQRanker.rank(query, index, n?)   → array sorted [{faq, score}]
 *   AltorraFAQRanker.bestAnswer(query, index) → {faq, score, ambiguous} | null
 *
 * Sin dependencias hard. Si AltorraFuzzy está disponible, usa su
 * tokenize/normalize/similarity. Sino, fallback a equivalentes locales.
 */
(function () {
    'use strict';
    if (window.AltorraFAQRanker) return;

    var MIN_SCORE_THRESHOLD = 0.5;        // score absoluto mínimo para considerar un match
    var AMBIGUITY_RATIO_THRESHOLD = 1.5;  // top1 / top2 — si menos, es ambiguo

    /* ─── Utilities (fallback si AltorraFuzzy no cargó) ────────── */

    function fallbackNormalize(text) {
        if (!text || typeof text !== 'string') return '';
        return text.toLowerCase()
            .normalize('NFD').replace(/[̀-ͯ]/g, '')
            .replace(/[^a-z0-9\s]/g, ' ')
            .replace(/\s+/g, ' ').trim();
    }
    function fallbackTokenize(text) {
        var n = fallbackNormalize(text);
        return n ? n.split(' ').filter(function (t) { return t.length >= 2; }) : [];
    }
    function fallbackSimilarity(a, b) {
        if (a === b) return 1;
        // Trivial: chars en común / longitud máx
        var setA = {}, setB = {};
        for (var i = 0; i < a.length; i++) setA[a[i]] = true;
        for (var j = 0; j < b.length; j++) setB[b[j]] = true;
        var common = 0;
        Object.keys(setA).forEach(function (c) { if (setB[c]) common++; });
        return common / Math.max(a.length, b.length, 1);
    }

    function tokenize(text) {
        if (window.AltorraFuzzy && window.AltorraFuzzy.tokenize) {
            return window.AltorraFuzzy.tokenize(text);
        }
        return fallbackTokenize(text);
    }
    function similarity(a, b) {
        if (window.AltorraFuzzy && window.AltorraFuzzy.similarity) {
            return window.AltorraFuzzy.similarity(a, b);
        }
        return fallbackSimilarity(a, b);
    }
    function expandSynonyms(text) {
        if (window.AltorraFuzzy && window.AltorraFuzzy.expandSynonyms) {
            return window.AltorraFuzzy.expandSynonyms(text);
        }
        return fallbackNormalize(text);
    }
    function unique(arr) {
        var seen = {};
        var out = [];
        arr.forEach(function (x) { if (!seen[x]) { seen[x] = true; out.push(x); } });
        return out;
    }

    var STOP = (window.AltorraFuzzy && window.AltorraFuzzy.STOP_WORDS) ||
               new Set(['el', 'la', 'de', 'que', 'y', 'a', 'en']);

    /* ─── Build inverted index ─────────────────────────────────── */

    /**
     * buildIndex — preprocesa el array de FAQs y construye el índice.
     * Llamarlo cada vez que cambia la KB (admin agrega/edita FAQs).
     */
    function buildIndex(faqs) {
        if (!faqs || !faqs.length) {
            return { faqs: [], documentFreq: {}, totalDocs: 0 };
        }
        var documentFreq = {};
        var enriched = faqs.map(function (faq) {
            // Expandir sinónimos primero, luego tokenizar
            var qExp = expandSynonyms(faq.question || '');
            var kwExp = (faq.keywords || []).map(expandSynonyms).join(' ');
            var tokens = unique(tokenize(qExp + ' ' + kwExp).filter(function (t) {
                return !STOP.has(t) && t.length >= 2;
            }));
            tokens.forEach(function (t) {
                documentFreq[t] = (documentFreq[t] || 0) + 1;
            });
            return Object.assign({}, faq, { _tokens: tokens });
        });
        return {
            faqs: enriched,
            documentFreq: documentFreq,
            totalDocs: faqs.length
        };
    }

    /* ─── Ranking ──────────────────────────────────────────────── */

    /**
     * rank — TF-IDF score de cada FAQ contra el query.
     * Considera: typo tolerance + IDF + admin priority + usage boost.
     */
    function rank(query, index, topN) {
        if (!query || !index || !index.faqs || !index.faqs.length) return [];
        var n = topN || 3;

        var qExp = expandSynonyms(query);
        var queryTokens = unique(tokenize(qExp).filter(function (t) {
            return !STOP.has(t) && t.length >= 2;
        }));
        if (!queryTokens.length) return [];

        var totalDocs = index.totalDocs || 1;

        var scored = index.faqs.map(function (faq) {
            var score = 0;
            queryTokens.forEach(function (qt) {
                var bestMatch = 0;
                faq._tokens.forEach(function (ft) {
                    var sim;
                    if (qt === ft) {
                        sim = 1;
                    } else if (Math.abs(qt.length - ft.length) > 3) {
                        sim = 0; // bound check
                    } else {
                        sim = similarity(qt, ft);
                    }
                    if (sim >= 0.80) {
                        var df = index.documentFreq[ft] || 1;
                        var idf = Math.log(1 + totalDocs / df);
                        var contribution = sim * idf;
                        if (contribution > bestMatch) bestMatch = contribution;
                    }
                });
                score += bestMatch;
            });

            // Boost por priority del admin (0..100)
            var priorityBoost = 1 + ((faq.priority || 0) / 100) * 0.5;
            score *= priorityBoost;

            // Boost por usageCount (FAQs más usadas suelen ser más relevantes)
            if (faq.usageCount && faq.usageCount > 5) score *= 1.10;
            if (faq.usageCount && faq.usageCount > 20) score *= 1.05;

            return { faq: faq, score: score };
        });

        scored = scored.filter(function (r) {
            return r.score >= MIN_SCORE_THRESHOLD && (r.faq.enabled !== false);
        });
        scored.sort(function (a, b) { return b.score - a.score; });
        return scored.slice(0, n);
    }

    /**
     * bestAnswer — decide si hay un ganador claro o si la query es
     * ambigua (top1 / top2 cercanos → quizás necesita clarification).
     */
    function bestAnswer(query, index) {
        var ranked = rank(query, index, 3);
        if (ranked.length === 0) return null;
        if (ranked.length === 1) {
            return { faq: ranked[0].faq, score: ranked[0].score, ambiguous: false };
        }
        var ratio = ranked[0].score / Math.max(ranked[1].score, 0.01);
        var ambiguous = ratio < AMBIGUITY_RATIO_THRESHOLD;
        return {
            faq: ranked[0].faq,
            score: ranked[0].score,
            ambiguous: ambiguous,
            secondFaq: ambiguous ? ranked[1].faq : null,
            secondScore: ambiguous ? ranked[1].score : null
        };
    }

    /* ─── Public API ───────────────────────────────────────────── */
    window.AltorraFAQRanker = {
        buildIndex: buildIndex,
        rank: rank,
        bestAnswer: bestAnswer,
        _MIN_SCORE_THRESHOLD: MIN_SCORE_THRESHOLD,
        _AMBIGUITY_RATIO_THRESHOLD: AMBIGUITY_RATIO_THRESHOLD
    };
})();
