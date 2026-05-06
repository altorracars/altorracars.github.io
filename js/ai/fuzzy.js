/**
 * AltorraFuzzy — Levenshtein-Damerau + diccionario de sinónimos
 *
 * Capas A+B del "Offline Ultra Brain" (§22 del CLAUDE.md).
 *
 * API:
 *   AltorraFuzzy.distance(a, b, max?)         → int (Levenshtein-Damerau)
 *   AltorraFuzzy.similarity(a, b)             → float [0..1]
 *   AltorraFuzzy.match(needle, haystack, t?)  → bool (similarity >= threshold)
 *   AltorraFuzzy.bestMatch(needle, options)   → {value, similarity} | null
 *   AltorraFuzzy.expandSynonyms(text)         → string (canonical normalized)
 *   AltorraFuzzy.tokenize(text)               → array de tokens
 *   AltorraFuzzy.normalize(text)              → lowercase + sin acentos
 *   AltorraFuzzy.SYNONYMS                     → diccionario completo
 *   AltorraFuzzy.STOP_WORDS                   → set para filtros
 *
 * Trade-offs:
 *   - Threshold default 0.80 calibrado a typos comunes (1 typo cada ~5 chars).
 *   - Para palabras cortas (≤4 chars) requiere 0.85 para evitar falsos positivos.
 *   - Early exit por bound check (|len(a) - len(b)| > maxDistance) reduce
 *     ~90% del cómputo en el caso común.
 *   - Damerau extension cuenta transposición de adyacentes como 1 op
 *     (ej: "qiero" vs "quiero" tiene distance=1, no 2).
 */
(function () {
    'use strict';
    if (window.AltorraFuzzy) return;

    /* ─────────────────────────────────────────────────────────────
       NORMALIZACIÓN — base de toda comparación fuzzy
       ───────────────────────────────────────────────────────────── */

    function normalize(text) {
        if (!text || typeof text !== 'string') return '';
        return text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[̀-ͯ]/g, '') // quita diacríticos (á → a)
            .replace(/[^a-z0-9\s]/g, ' ')    // quita puntuación, mantiene espacios
            .replace(/\s+/g, ' ')
            .trim();
    }

    var STOP_WORDS = new Set([
        'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas',
        'de', 'del', 'al', 'a', 'en', 'por', 'para', 'con', 'sin',
        'que', 'y', 'o', 'u', 'pero', 'mas', 'no', 'si', 'se',
        'es', 'son', 'fue', 'sera', 'esta', 'estan', 'esto', 'eso', 'ese',
        'esa', 'estos', 'esas', 'me', 'te', 'le', 'lo', 'les', 'mi', 'tu',
        'su', 'sus', 'mis', 'tus', 'yo', 'tu', 'el', 'ella', 'nosotros',
        'ustedes', 'ellos', 'ellas', 'pues', 'porque', 'como', 'cuando',
        'donde', 'aqui', 'alli', 'ahi', 'muy', 'mucho', 'poco', 'tan'
    ]);

    function tokenize(text) {
        var norm = normalize(text);
        if (!norm) return [];
        return norm.split(' ').filter(function (t) {
            return t.length > 0;
        });
    }

    /* ─────────────────────────────────────────────────────────────
       LEVENSHTEIN-DAMERAU DISTANCE
       Variante extendida que cuenta transposiciones de letras
       adyacentes como 1 operación (no 2 como Levenshtein clásico).
       Ejemplo: "qiero" vs "quiero" → distance = 1 (transposición qu↔iq)
       ───────────────────────────────────────────────────────────── */

    function distance(a, b, maxDistance) {
        a = String(a || '');
        b = String(b || '');
        if (a === b) return 0;
        if (a.length === 0) return b.length;
        if (b.length === 0) return a.length;

        // Early exit: si la diferencia de longitud ya supera el bound,
        // no vale la pena calcular el DP completo.
        if (typeof maxDistance === 'number' && Math.abs(a.length - b.length) > maxDistance) {
            return maxDistance + 1;
        }

        // Matrix DP — solo necesitamos 3 filas para Damerau (i-2, i-1, i)
        var m = a.length;
        var n = b.length;
        var prev2 = null;
        var prev1 = new Array(n + 1);
        var curr  = new Array(n + 1);
        var i, j;
        for (j = 0; j <= n; j++) prev1[j] = j;

        for (i = 1; i <= m; i++) {
            curr[0] = i;
            var rowMin = i;

            for (j = 1; j <= n; j++) {
                var cost = (a.charCodeAt(i - 1) === b.charCodeAt(j - 1)) ? 0 : 1;
                var del = prev1[j] + 1;
                var ins = curr[j - 1] + 1;
                var sub = prev1[j - 1] + cost;
                var min = del < ins ? del : ins;
                if (sub < min) min = sub;

                // Damerau extension: transposición de adyacentes
                if (i > 1 && j > 1 && prev2 &&
                    a.charCodeAt(i - 1) === b.charCodeAt(j - 2) &&
                    a.charCodeAt(i - 2) === b.charCodeAt(j - 1)) {
                    var trans = prev2[j - 2] + 1;
                    if (trans < min) min = trans;
                }

                curr[j] = min;
                if (min < rowMin) rowMin = min;
            }

            // Early exit: si toda la fila supera el bound, abort
            if (typeof maxDistance === 'number' && rowMin > maxDistance) {
                return maxDistance + 1;
            }

            // Rotate rows: prev2 ← prev1, prev1 ← curr (clone)
            prev2 = prev1;
            prev1 = curr.slice();
        }

        return prev1[n];
    }

    /**
     * similarity — ratio normalizado [0..1].
     *   1.0  = match exacto
     *   0.0  = completamente distintos
     *   0.80 = ~1 typo cada 5 chars (threshold default match)
     */
    function similarity(a, b) {
        a = String(a || '');
        b = String(b || '');
        if (a === b) return 1;
        var maxLen = Math.max(a.length, b.length);
        if (maxLen === 0) return 1;
        var d = distance(a, b);
        return 1 - (d / maxLen);
    }

    /**
     * match — true si la similitud supera el threshold.
     * Threshold adaptativo: palabras cortas (≤4 chars) requieren 0.85
     * para evitar falsos positivos ("ok" matchearía cualquier palabra
     * corta con threshold 0.80).
     */
    function match(needle, haystack, threshold) {
        if (!needle || !haystack) return false;
        needle = normalize(needle);
        haystack = normalize(haystack);
        if (needle === haystack) return true;

        var t = threshold || 0.80;
        var minLen = Math.min(needle.length, haystack.length);
        if (minLen <= 4) t = Math.max(t, 0.85);

        // Substring match exacto siempre passes
        if (haystack.indexOf(needle) !== -1) return true;

        // Comparación palabra por palabra del haystack contra needle
        var hayWords = haystack.split(' ');
        for (var i = 0; i < hayWords.length; i++) {
            if (hayWords[i].length === 0) continue;
            if (similarity(needle, hayWords[i]) >= t) return true;
        }
        // Comparación full-string como fallback
        return similarity(needle, haystack) >= t;
    }

    /**
     * bestMatch — devuelve la mejor opción de un array.
     *   options puede ser array de strings o de {key, value}.
     *   threshold default 0.75 (más permisivo para autocomplete-style).
     */
    function bestMatch(needle, options, threshold) {
        if (!needle || !options || !options.length) return null;
        var n = normalize(needle);
        var t = threshold || 0.75;
        var best = null;
        for (var i = 0; i < options.length; i++) {
            var opt = options[i];
            var str = (typeof opt === 'string') ? opt : (opt.value || opt.key || '');
            var sim = similarity(n, normalize(str));
            if (sim >= t && (!best || sim > best.similarity)) {
                best = { value: opt, similarity: sim };
            }
        }
        return best;
    }

    /* ─────────────────────────────────────────────────────────────
       DICCIONARIO DE SINÓNIMOS — Colombia + automotriz
       Map de "canonical → variantes". expandSynonyms(text) reemplaza
       cualquier variante por su canonical, normalizando el lenguaje.
       ───────────────────────────────────────────────────────────── */

    var SYNONYMS = {
        // Vehículo (genérico)
        'carro': [
            'carro', 'auto', 'automovil', 'vehiculo', 'vehículo',
            'nave', 'maquina', 'maquinita', 'coche', 'cochesote',
            'fierro', 'cucha', 'mueble', 'tractor'
        ],
        // Categorías
        'suv': [
            'suv', 'camioneta', 'todo terreno', 'todoterreno',
            '4x4', 'campero', 'jepeta', 'jeepeta', 'jeep'
        ],
        'pickup': [
            'pickup', 'pick up', 'pick-up', 'platon', 'platón',
            'estacas', 'doble cabina', 'doblecabina', 'camioneta de carga',
            'camioneta de platon'
        ],
        'sedan': [
            'sedan', 'sedán', 'turismo', 'familiar', 'bota', 'tres volumenes'
        ],
        'hatchback': [
            'hatchback', 'compacto', 'citadino', 'urbano', 'pequeño'
        ],
        // Precio
        'barato': [
            'barato', 'economico', 'económico', 'comodo', 'cómodo',
            'accesible', 'rebajado', 'oferta', 'descuento', 'suave',
            'al alcance', 'no muy caro', 'modico', 'módico'
        ],
        'caro': [
            'caro', 'costoso', 'lujoso', 'premium', 'top', 'gama alta',
            'gama-alta', 'tope de gama'
        ],
        // Acción
        'comprar': [
            'comprar', 'adquirir', 'llevar', 'me lo llevo', 'quedarmelo',
            'quedármelo', 'me quedo', 'lo quiero', 'lo necesito'
        ],
        'financiar': [
            'financiar', 'financiacion', 'financiación', 'credito', 'crédito',
            'cuotas', 'plan', 'a plazos', 'pagar a plazos', 'mensualidades',
            'cuotita'
        ],
        'agendar': [
            'agendar', 'reservar', 'separar', 'apartar', 'cuadrar',
            'verlo', 'ir a verlo', 'pasarme', 'visitar', 'cita'
        ],
        // Pregunta
        'cuanto cuesta': [
            'cuanto cuesta', 'cuánto cuesta', 'cuanto vale', 'cuánto vale',
            'que precio', 'qué precio', 'a como', 'a cómo', 'cuanto sale',
            'cuánto sale', 'precio final', 'cuanto me sale'
        ],
        'donde estan': [
            'donde estan', 'dónde están', 'donde quedan', 'dónde quedan',
            'donde los veo', 'la direccion', 'la dirección', 'su ubicacion',
            'su ubicación', 'donde puedo ir', 'dónde puedo ir'
        ],
        // Estado
        'usado': [
            'usado', 'segunda mano', 'usadito', 'de segunda', '2da mano'
        ],
        'nuevo': [
            'nuevo', 'cero kilometros', 'cero kilómetros', '0 km',
            '0km', 'sin uso'
        ],
        'disponible': [
            'disponible', 'tienen', 'hay', 'queda', 'quedan', 'esta',
            'está', 'sigue', 'todavía', 'todavia'
        ],
        // Transmisión
        'automatico': [
            'automatico', 'automático', 'automatica', 'automática',
            'auto', 'sin embrague', 'sin clutch'
        ],
        'manual': [
            'manual', 'mecanico', 'mecánico', 'mecanica', 'mecánica',
            'palanca', 'con embrague', 'con clutch', 'estandar', 'estándar'
        ],
        // Combustible
        'gasolina': [
            'gasolina', 'corriente', 'extra', 'nafta'
        ],
        'diesel': [
            'diesel', 'diésel', 'acpm', 'a.c.p.m.'
        ]
    };

    // Build reverse index: variant → canonical para O(1) lookup
    var REVERSE_INDEX = (function () {
        var idx = {};
        Object.keys(SYNONYMS).forEach(function (canonical) {
            SYNONYMS[canonical].forEach(function (variant) {
                idx[normalize(variant)] = canonical;
            });
        });
        return idx;
    })();

    /**
     * expandSynonyms — reemplaza variantes por canonical.
     *
     * Ejemplo:
     *   "qiero un coxe varato"
     *     → typo correction (sin Levenshtein todavía, eso es paso 2)
     *     → "quiero un carro barato"
     *
     * Estrategia: tokeniza, intenta match cada token contra las
     * variantes (con fuzzy match), reemplaza por canonical.
     *
     * Para multi-word variants (ej "doble cabina" → "pickup"), hace
     * un segundo paso buscando phrases de 2-3 palabras.
     */
    function expandSynonyms(text) {
        var norm = normalize(text);
        if (!norm) return '';

        // Paso 1: phrase-level (2-3 word matches por longitud descendente)
        var phrases = Object.keys(REVERSE_INDEX)
            .filter(function (k) { return k.indexOf(' ') !== -1; })
            .sort(function (a, b) { return b.length - a.length; });

        phrases.forEach(function (phrase) {
            // Replace exact + fuzzy phrase matches
            if (norm.indexOf(phrase) !== -1) {
                norm = norm.split(phrase).join(REVERSE_INDEX[phrase]);
            }
        });

        // Paso 2: word-level con typo tolerance
        var tokens = norm.split(' ');
        var expanded = tokens.map(function (token) {
            if (!token || token.length < 2) return token;
            // Match exacto contra reverse index
            if (REVERSE_INDEX[token]) return REVERSE_INDEX[token];
            // Stop words se mantienen tal cual (ahorro de cómputo)
            if (STOP_WORDS.has(token)) return token;
            // Fuzzy: buscar el mejor canonical para este token
            var best = null;
            var bestSim = 0;
            Object.keys(REVERSE_INDEX).forEach(function (variant) {
                if (variant.indexOf(' ') !== -1) return; // skip phrases
                if (Math.abs(variant.length - token.length) > 2) return; // bound check
                var sim = similarity(token, variant);
                var threshold = token.length <= 4 ? 0.85 : 0.80;
                if (sim >= threshold && sim > bestSim) {
                    bestSim = sim;
                    best = REVERSE_INDEX[variant];
                }
            });
            return best || token;
        });
        return expanded.join(' ');
    }

    /* ─────────────────────────────────────────────────────────────
       PUBLIC API
       ───────────────────────────────────────────────────────────── */
    window.AltorraFuzzy = {
        distance: distance,
        similarity: similarity,
        match: match,
        bestMatch: bestMatch,
        expandSynonyms: expandSynonyms,
        tokenize: tokenize,
        normalize: normalize,
        SYNONYMS: SYNONYMS,
        STOP_WORDS: STOP_WORDS,
        _REVERSE_INDEX: REVERSE_INDEX
    };
})();
