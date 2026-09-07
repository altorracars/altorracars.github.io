/**
 * ALTORRA CARS — NER (Mega-Plan v4, Microfase J.2)
 * =================================================
 * Named Entity Recognition for car-buying conversations.
 * Extracts: marca, modelo, year, precio, kilometraje, ciudad, fecha,
 *           hora, telefono, email, plate.
 *
 * Strategy: regex + lexicon. Fast (sub-millisecond), works offline,
 * no model download. Future ML upgrade slot via
 * AltorraAI.registerProvider('ner', mlFn).
 *
 * Public API:
 *   AltorraNER.extract(text) → {
 *     entities: [{type, value, raw, position: [start, end]}]
 *     summary: { marca, modelo, year, precio, ciudad, fecha, ... }
 *   }
 *   AltorraNER.matchVehicle(text, vehiclesArr) → best vehicle match
 */
(function () {
    'use strict';
    if (window.AltorraNER) return;

    /* ═══════════════════════════════════════════════════════════
       LEXICONS
       ═══════════════════════════════════════════════════════════ */
    // Brand names — synced with the marcas/ collection. Lowercased for matching.
    var KNOWN_BRANDS = [
        'toyota', 'chevrolet', 'mazda', 'honda', 'nissan', 'hyundai',
        'kia', 'ford', 'volkswagen', 'vw', 'renault', 'suzuki', 'mitsubishi',
        'subaru', 'jeep', 'fiat', 'peugeot', 'citroen', 'citroën',
        'mercedes', 'mercedes-benz', 'bmw', 'audi', 'porsche', 'volvo',
        'land rover', 'range rover', 'jaguar', 'lexus', 'infiniti',
        'acura', 'tesla', 'mini', 'dodge', 'ram', 'gmc', 'chrysler',
        'alfa romeo', 'maserati', 'ferrari', 'lamborghini', 'bentley',
        'rolls royce', 'rolls-royce', 'foton', 'jac', 'changan', 'mg',
        'great wall', 'haval', 'chery', 'byd', 'dfsk', 'baic',
        'ssangyong', 'ssang yong'
    ];

    // Common Colombian cities (subset of perfil.html list)
    var KNOWN_CITIES = [
        'cartagena', 'bogota', 'bogotá', 'medellin', 'medellín', 'cali',
        'barranquilla', 'bucaramanga', 'pereira', 'manizales', 'ibague',
        'ibagué', 'monteria', 'montería', 'sincelejo', 'valledupar',
        'santa marta', 'cucuta', 'cúcuta', 'pasto', 'armenia', 'neiva',
        'tunja', 'villavicencio', 'popayan', 'popayán', 'florencia',
        'quibdó', 'quibdo', 'riohacha', 'leticia'
    ];

    // Months for fecha extraction
    var MONTH_RE = '(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|setiembre|octubre|noviembre|diciembre|ene|feb|mar|abr|may|jun|jul|ago|sep|set|oct|nov|dic)';

    /* ═══════════════════════════════════════════════════════════
       REGEX PATTERNS
       ═══════════════════════════════════════════════════════════ */
    // Year: 4 digits in a plausible car-year range (1970–2099)
    var YEAR_RE = /\b(19[7-9]\d|20\d{2})\b/g;

    // Price: $1.000.000 / $1,000,000 / 50 millones / 50M / 1.5 m / etc.
    var PRICE_NUMERIC_RE = /\$\s?([0-9]{1,3}(?:[.,][0-9]{3})+(?:[.,][0-9]{1,2})?|[0-9]+(?:[.,][0-9]+)?)/g;
    var PRICE_MILLONES_RE = /(\d+(?:[.,]\d+)?)\s*(millones?|m\b|mm\b)/gi;

    // Kilometraje: 50,000 km / 50K km / 50.000 kilometros
    var KM_RE = /(\d{1,3}(?:[.,]\d{3})*|\d+k?)\s*(km|kms|kilometros?|kilómetros?)\b/gi;

    // Email
    var EMAIL_RE = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;

    // Phone: Colombia +57 prefix, or 10-digit, with optional spaces/dashes
    var PHONE_RE = /(?:\+?57\s?)?(?:3\d{2}[\s\-.]?\d{3}[\s\-.]?\d{4})\b/g;

    // Plate: AAA000 or AAA-000 or ABC123 (Colombian plates)
    var PLATE_RE = /\b[A-Z]{3}[\s\-]?\d{3}\b/g;

    // Fecha — diversas formas (DD/MM/YYYY, DD de MES, mañana, hoy, etc.)
    var DATE_NUMERIC_RE = /\b(0?[1-9]|[12]\d|3[01])\/(0?[1-9]|1[012])\/(\d{2}|\d{4})\b/g;
    var DATE_LITERAL_RE = new RegExp('\\b(0?[1-9]|[12]\\d|3[01])\\s*(?:de\\s+)?' + MONTH_RE + '(?:\\s+(?:de\\s+)?(\\d{4}))?\\b', 'gi');
    var RELATIVE_DATE_RE = /\b(hoy|mañana|manana|pasado\s*mañana|pasado\s*manana|ayer|anteayer|antier)\b/gi;

    // Hora — 10:30am, 14:30, 2pm, a las 3
    var TIME_RE = /\b(?:a\s+las\s+)?(\d{1,2})(?::(\d{2}))?\s?(am|pm|hrs|h)?\b/gi;

    /* ═══════════════════════════════════════════════════════════
       EXTRACTION HELPERS
       ═══════════════════════════════════════════════════════════ */
    function findInLexicon(text, lexicon, type) {
        var lower = text.toLowerCase();
        var found = [];
        lexicon.forEach(function (term) {
            var idx = 0;
            while (true) {
                idx = lower.indexOf(term, idx);
                if (idx === -1) break;
                // Word-boundary check
                var before = idx === 0 ? ' ' : lower.charAt(idx - 1);
                var after = idx + term.length >= lower.length ? ' ' : lower.charAt(idx + term.length);
                if (/[a-záéíóúñ0-9]/.test(before) || /[a-záéíóúñ0-9]/.test(after)) {
                    idx += term.length;
                    continue;
                }
                found.push({
                    type: type,
                    value: term,
                    raw: text.substr(idx, term.length),
                    position: [idx, idx + term.length]
                });
                idx += term.length;
            }
        });
        return found;
    }

    function parsePrice(raw, isMillions) {
        var num = parseFloat(String(raw).replace(/[.,](?=\d{3})/g, '').replace(',', '.'));
        if (isNaN(num)) return null;
        if (isMillions) num *= 1000000;
        // If number is suspiciously small for COP (e.g. 50), assume millones
        else if (num < 10000 && raw.indexOf('.') === -1 && raw.indexOf(',') === -1) num *= 1000000;
        return num;
    }

    function parseKm(raw) {
        var s = String(raw).toLowerCase();
        if (/k$/.test(s)) {
            return parseFloat(s.slice(0, -1)) * 1000;
        }
        var num = parseFloat(s.replace(/[.,](?=\d{3})/g, '').replace(',', '.'));
        return isNaN(num) ? null : num;
    }

    function relativeDateToISO(word) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        var w = word.toLowerCase().replace(/\s+/g, ' ').trim();
        var offset = 0;
        if (w === 'hoy') offset = 0;
        else if (w === 'mañana' || w === 'manana') offset = 1;
        else if (/pasado\s*mañana|pasado\s*manana/.test(w)) offset = 2;
        else if (w === 'ayer') offset = -1;
        else if (w === 'anteayer' || w === 'antier') offset = -2;
        else return null;
        today.setDate(today.getDate() + offset);
        return today.toISOString().slice(0, 10);
    }

    /* ═══════════════════════════════════════════════════════════
       MAIN EXTRACTOR
       ═══════════════════════════════════════════════════════════ */
    function extract(text) {
        // ML provider upgrade slot — registered by future J.x implementations
        if (window.AltorraAI && window.AltorraAI._providers && window.AltorraAI._providers.ner) {
            try { return window.AltorraAI._providers.ner(text); }
            catch (e) { /* fall through to rules */ }
        }

        if (!text || typeof text !== 'string') {
            return { entities: [], summary: {} };
        }

        var entities = [];

        // Brands (lexicon)
        entities = entities.concat(findInLexicon(text, KNOWN_BRANDS, 'marca'));

        // Cities (lexicon)
        entities = entities.concat(findInLexicon(text, KNOWN_CITIES, 'ciudad'));

        // Years (regex)
        var m;
        YEAR_RE.lastIndex = 0;
        while ((m = YEAR_RE.exec(text)) !== null) {
            entities.push({
                type: 'year',
                value: parseInt(m[1], 10),
                raw: m[0],
                position: [m.index, m.index + m[0].length]
            });
        }

        // Prices (millones first to avoid double-match)
        PRICE_MILLONES_RE.lastIndex = 0;
        var priceMatches = []; // track positions to skip
        while ((m = PRICE_MILLONES_RE.exec(text)) !== null) {
            var v = parsePrice(m[1], true);
            if (v != null) {
                entities.push({
                    type: 'precio',
                    value: v,
                    raw: m[0],
                    position: [m.index, m.index + m[0].length]
                });
                priceMatches.push([m.index, m.index + m[0].length]);
            }
        }
        PRICE_NUMERIC_RE.lastIndex = 0;
        while ((m = PRICE_NUMERIC_RE.exec(text)) !== null) {
            // Skip if overlap with millones match
            var skip = priceMatches.some(function (p) {
                return m.index >= p[0] && m.index < p[1];
            });
            if (skip) continue;
            var pv = parsePrice(m[1], false);
            if (pv != null && pv >= 1000) {
                entities.push({
                    type: 'precio',
                    value: pv,
                    raw: m[0],
                    position: [m.index, m.index + m[0].length]
                });
            }
        }

        // Kilometraje
        KM_RE.lastIndex = 0;
        while ((m = KM_RE.exec(text)) !== null) {
            var km = parseKm(m[1]);
            if (km != null) {
                entities.push({
                    type: 'kilometraje',
                    value: km,
                    raw: m[0],
                    position: [m.index, m.index + m[0].length]
                });
            }
        }

        // Email
        EMAIL_RE.lastIndex = 0;
        while ((m = EMAIL_RE.exec(text)) !== null) {
            entities.push({
                type: 'email',
                value: m[0].toLowerCase(),
                raw: m[0],
                position: [m.index, m.index + m[0].length]
            });
        }

        // Phone
        PHONE_RE.lastIndex = 0;
        while ((m = PHONE_RE.exec(text)) !== null) {
            entities.push({
                type: 'telefono',
                value: m[0].replace(/[\s\-.]/g, ''),
                raw: m[0],
                position: [m.index, m.index + m[0].length]
            });
        }

        // Plate
        PLATE_RE.lastIndex = 0;
        while ((m = PLATE_RE.exec(text)) !== null) {
            entities.push({
                type: 'placa',
                value: m[0].toUpperCase().replace(/[\s\-]/g, ''),
                raw: m[0],
                position: [m.index, m.index + m[0].length]
            });
        }

        // Dates — relative
        RELATIVE_DATE_RE.lastIndex = 0;
        while ((m = RELATIVE_DATE_RE.exec(text)) !== null) {
            var iso = relativeDateToISO(m[0]);
            if (iso) {
                entities.push({
                    type: 'fecha',
                    value: iso,
                    raw: m[0],
                    position: [m.index, m.index + m[0].length]
                });
            }
        }
        // Dates — numeric
        DATE_NUMERIC_RE.lastIndex = 0;
        while ((m = DATE_NUMERIC_RE.exec(text)) !== null) {
            var d = m[1].padStart(2, '0');
            var mo = m[2].padStart(2, '0');
            var y = m[3].length === 2 ? '20' + m[3] : m[3];
            entities.push({
                type: 'fecha',
                value: y + '-' + mo + '-' + d,
                raw: m[0],
                position: [m.index, m.index + m[0].length]
            });
        }
        // Dates — literal "15 de marzo"
        DATE_LITERAL_RE.lastIndex = 0;
        var monthMap = {
            ene: 1, enero: 1, feb: 2, febrero: 2, mar: 3, marzo: 3,
            abr: 4, abril: 4, may: 5, mayo: 5, jun: 6, junio: 6,
            jul: 7, julio: 7, ago: 8, agosto: 8, sep: 9, set: 9,
            septiembre: 9, setiembre: 9, oct: 10, octubre: 10,
            nov: 11, noviembre: 11, dic: 12, diciembre: 12
        };
        while ((m = DATE_LITERAL_RE.exec(text)) !== null) {
            var monthNum = monthMap[m[2].toLowerCase()];
            if (!monthNum) continue;
            var year = m[3] || new Date().getFullYear();
            entities.push({
                type: 'fecha',
                value: year + '-' + String(monthNum).padStart(2, '0') + '-' + String(m[1]).padStart(2, '0'),
                raw: m[0],
                position: [m.index, m.index + m[0].length]
            });
        }

        // Hora — disabled by default (high false positive on years/IDs)
        // Enable selectively via opts.includeTime if needed by callers

        // Sort by position
        entities.sort(function (a, b) { return a.position[0] - b.position[0]; });

        // Build summary — first occurrence wins
        var summary = {};
        entities.forEach(function (e) {
            if (!summary[e.type]) summary[e.type] = e.value;
        });

        return { entities: entities, summary: summary };
    }

    /* ═══════════════════════════════════════════════════════════
       VEHICLE MATCHER — given text + AP.vehicles, find the best match
       ═══════════════════════════════════════════════════════════ */
    function matchVehicle(text, vehicles) {
        if (!vehicles || !vehicles.length) return null;
        var ext = extract(text);
        var summary = ext.summary;
        if (!summary.marca && !summary.year) return null;

        var lowerText = (text || '').toLowerCase();
        var best = null, bestScore = 0;
        vehicles.forEach(function (v) {
            var score = 0;
            if (summary.marca && v.marca && v.marca.toLowerCase().indexOf(summary.marca) !== -1) score += 3;
            if (v.modelo && lowerText.indexOf(v.modelo.toLowerCase()) !== -1) score += 4;
            if (summary.year && v.year && Math.abs(v.year - summary.year) <= 1) score += 2;
            if (summary.precio && v.precio) {
                var pct = Math.abs(v.precio - summary.precio) / v.precio;
                if (pct < 0.1) score += 1;
            }
            if (score > bestScore) { bestScore = score; best = v; }
        });
        return bestScore >= 4 ? { vehicle: best, score: bestScore } : null;
    }

    /* ═══════════════════════════════════════════════════════════
       Public API
       ═══════════════════════════════════════════════════════════ */
    window.AltorraNER = {
        extract: extract,
        matchVehicle: matchVehicle,
        // For debugging / future ML diff comparisons
        _lexicons: { brands: KNOWN_BRANDS, cities: KNOWN_CITIES }
    };
})();
