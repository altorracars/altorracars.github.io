/**
 * AltorraInventorySearch — Búsqueda dinámica del inventario con NLP local
 *
 * Capa D del "Offline Ultra Brain" (§22 del CLAUDE.md).
 *
 * El cliente pregunta "¿tienen camionetas por menos de 60 millones?",
 * el bot extrae filtros (categoria=suv, priceMax=60M), filtra
 * window.vehicleDB.vehicles, y genera respuesta dinámica con vehículos
 * reales encontrados.
 *
 * Esto es "function calling simulado" — sin LLM, pero con efecto similar:
 * el bot consulta el inventario en tiempo real cada turno relevante.
 *
 * API:
 *   AltorraInventorySearch.extractFilters(text)         → filters object
 *   AltorraInventorySearch.search(filters, opts?)       → array de vehículos
 *   AltorraInventorySearch.searchFromText(text, opts?)  → {vehicles, filters}
 *   AltorraInventorySearch.formatResponse(results, opts?) → {text, cta, vehiclesShown}
 *
 * Dependencias:
 *   - window.AltorraNER (para extracción de entidades base)
 *   - window.AltorraFuzzy (para tolerancia de typos en filtros texto)
 *   - window.vehicleDB.vehicles (inventario en runtime)
 */
(function () {
    'use strict';
    if (window.AltorraInventorySearch) return;

    /* ─────────────────────────────────────────────────────────────
       extractFilters — convierte texto natural a struct de filtros.
       Combina NER (marca/modelo/year/ciudad/precio) con regex
       específicas para categoría, kilometraje, transmisión.
       ───────────────────────────────────────────────────────────── */

    var CATEGORY_PATTERNS = {
        suv:       /\b(suv|camionetas?|todo[\s-]?terreno|4x4|campero|jepetas?|jeepetas?)\b/i,
        pickup:    /\b(pick[\s-]?ups?|platon|estacas|doble cabina|de carga)\b/i,
        sedan:     /\b(sedan|sedanes|familiar|turismo|bota)\b/i,
        hatchback: /\b(hatchback|compactos?|citadinos?|urbanos?)\b/i
    };

    var TRANSMISION_PATTERNS = {
        automatica: /\b(automatic[ao]s?|sin embrague|sin clutch)\b/i,
        manual:     /\b(manual(?:es)?|mecanic[ao]s?|con embrague|con clutch|estandar|palanca)\b/i
    };

    var COMBUSTIBLE_PATTERNS = {
        gasolina: /\b(gasolina|nafta|corriente|extra)\b/i,
        diesel:   /\b(di[eé]sel|acpm)\b/i,
        hibrido:  /\b(h[ií]brido|hybrid)\b/i,
        electrico:/\b(el[eé]ctrico|electrica|ev|tesla)\b/i
    };

    function extractFilters(text) {
        var filters = {
            marca: null,
            modelo: null,
            categoria: null,
            yearMin: null,
            yearMax: null,
            priceMin: null,
            priceMax: null,
            kmMax: null,
            transmision: null,
            combustible: null,
            keywords: []
        };
        if (!text) return filters;

        var raw = text;
        var lower = text.toLowerCase();

        // 1. NER base — marca, modelo, año, ciudad, precio, kilometraje
        if (window.AltorraNER && window.AltorraNER.extract) {
            try {
                var ner = window.AltorraNER.extract(raw);
                var sum = ner.summary || {};
                if (sum.marca)        filters.marca = sum.marca;
                if (sum.modelo)       filters.modelo = sum.modelo;
                if (sum.year)         { filters.yearMin = sum.year; filters.yearMax = sum.year; }
                if (sum.kilometraje)  filters.kmMax = sum.kilometraje;
                if (sum.precio)       filters.priceMax = sum.precio;
            } catch (e) { /* silencio */ }
        }

        // 2. Categoría
        Object.keys(CATEGORY_PATTERNS).forEach(function (cat) {
            if (CATEGORY_PATTERNS[cat].test(lower)) filters.categoria = cat;
        });

        // 3. Transmisión
        Object.keys(TRANSMISION_PATTERNS).forEach(function (t) {
            if (TRANSMISION_PATTERNS[t].test(lower)) filters.transmision = t;
        });

        // 4. Combustible
        Object.keys(COMBUSTIBLE_PATTERNS).forEach(function (c) {
            if (COMBUSTIBLE_PATTERNS[c].test(lower)) filters.combustible = c;
        });

        // 5. Rangos de precio explícitos: "menos de X", "menor a X",
        // "entre X y Y", "máximo X", "más de X"
        var priceMaxMatches = [
            /menos\s+de\s+(\d+)\s*(millones?|m|kilo|millon)/i,
            /menor\s+a\s+(\d+)\s*(millones?|m|millon)/i,
            /m[aá]ximo\s+(\d+)\s*(millones?|m|millon)/i,
            /hasta\s+(\d+)\s*(millones?|m|millon)/i,
            /por\s+menos\s+de\s+(\d+)\s*(millones?|m|millon)/i,
            /no\s+m[aá]s\s+de\s+(\d+)\s*(millones?|m|millon)/i
        ];
        priceMaxMatches.forEach(function (re) {
            var m = lower.match(re);
            if (m) {
                var val = parseInt(m[1], 10);
                if (val >= 5 && val <= 9999) {
                    // Asume millones (5M..9999M)
                    filters.priceMax = val * 1000000;
                }
            }
        });
        var priceMinMatches = [
            /m[aá]s\s+de\s+(\d+)\s*(millones?|m|millon)/i,
            /mayor\s+a\s+(\d+)\s*(millones?|m|millon)/i,
            /m[ií]nimo\s+(\d+)\s*(millones?|m|millon)/i,
            /desde\s+(\d+)\s*(millones?|m|millon)/i
        ];
        priceMinMatches.forEach(function (re) {
            var m = lower.match(re);
            if (m) {
                var val = parseInt(m[1], 10);
                if (val >= 5 && val <= 9999) filters.priceMin = val * 1000000;
            }
        });

        // 6. Rango de año: "del 2018 al 2022", "2020 en adelante"
        var yearRangeMatch = lower.match(/(?:del|desde\s+el?)\s*(20\d{2}|19\d{2})\s*(?:al?|hasta|a)\s*(20\d{2}|19\d{2})/i);
        if (yearRangeMatch) {
            filters.yearMin = parseInt(yearRangeMatch[1], 10);
            filters.yearMax = parseInt(yearRangeMatch[2], 10);
        }

        // 7. Kilometraje: "menos de 50 mil km", "máximo 80000 km"
        var kmMatches = [
            /menos\s+de\s+(\d+)\s*(mil)?\s*(?:km|kilometros|kilómetros)/i,
            /m[aá]ximo\s+(\d+)\s*(mil)?\s*(?:km|kilometros|kilómetros)/i,
            /menor\s+a\s+(\d+)\s*(mil)?\s*(?:km|kilometros|kilómetros)/i
        ];
        kmMatches.forEach(function (re) {
            var m = lower.match(re);
            if (m) {
                var val = parseInt(m[1], 10);
                if (m[2]) val *= 1000;
                if (val >= 100 && val <= 999999) filters.kmMax = val;
            }
        });

        return filters;
    }

    /* ─────────────────────────────────────────────────────────────
       search — filtra el inventario aplicando los filtros.
       Sort: destacados primero, luego match score, luego precio asc.
       ───────────────────────────────────────────────────────────── */

    function fuzzyEqual(a, b, threshold) {
        if (!a || !b) return false;
        if (window.AltorraFuzzy) {
            return window.AltorraFuzzy.match(a, b, threshold || 0.85);
        }
        return String(a).toLowerCase() === String(b).toLowerCase();
    }

    function search(filters, opts) {
        opts = opts || {};
        var limit = opts.limit || 5;
        var inventory = (window.vehicleDB && window.vehicleDB.vehicles) || [];
        if (!inventory.length) return [];

        var matches = inventory.filter(function (v) {
            if (!v) return false;
            // Excluir vendidos a menos que se pida explícito
            if (v.estado === 'vendido' && !opts.includeSold) return false;
            if (v.estado === 'borrador') return false;

            if (filters.marca && !fuzzyEqual(v.marca, filters.marca, 0.85)) return false;
            if (filters.modelo && !fuzzyEqual(v.modelo, filters.modelo, 0.82)) return false;
            if (filters.categoria && v.categoria &&
                v.categoria.toLowerCase() !== filters.categoria.toLowerCase()) return false;
            if (filters.yearMin && v.year && v.year < filters.yearMin) return false;
            if (filters.yearMax && v.year && v.year > filters.yearMax) return false;

            var p = v.precioOferta || v.precio;
            if (filters.priceMin && p && p < filters.priceMin) return false;
            if (filters.priceMax && p && p > filters.priceMax) return false;

            if (filters.kmMax && v.kilometraje && v.kilometraje > filters.kmMax) return false;
            if (filters.transmision && v.transmision &&
                !fuzzyEqual(v.transmision, filters.transmision, 0.80)) return false;
            if (filters.combustible && v.combustible &&
                !fuzzyEqual(v.combustible, filters.combustible, 0.80)) return false;

            return true;
        });

        // Sort: destacados primero, luego precio ascendente
        matches.sort(function (a, b) {
            if (a.destacado !== b.destacado) return a.destacado ? -1 : 1;
            var pa = a.precioOferta || a.precio || Infinity;
            var pb = b.precioOferta || b.precio || Infinity;
            return pa - pb;
        });

        return matches.slice(0, limit);
    }

    function searchFromText(text, opts) {
        var filters = extractFilters(text);
        var results = search(filters, opts);
        return { vehicles: results, filters: filters };
    }

    /* ─────────────────────────────────────────────────────────────
       formatResponse — genera respuesta natural con vehículos reales.
       ───────────────────────────────────────────────────────────── */

    function fmtPrice(n) {
        if (!n) return 'consultar';
        if (n >= 1e6) {
            var m = n / 1e6;
            return '$' + (m % 1 === 0 ? m : m.toFixed(1)) + 'M';
        }
        return '$' + Math.round(n / 1000) + 'K';
    }

    function getVehicleSlug(v) {
        // Reusa helper global si existe (window.getVehicleSlug)
        if (typeof window.getVehicleSlug === 'function') {
            try { return window.getVehicleSlug(v); } catch (e) {}
        }
        // Fallback: marca-modelo-year-id
        if (!v) return '';
        var parts = [v.marca, v.modelo, v.year, v.id]
            .filter(Boolean)
            .map(function (p) {
                return String(p).toLowerCase()
                    .normalize('NFD').replace(/[̀-ͯ]/g, '')
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/^-+|-+$/g, '');
            });
        return parts.join('-');
    }

    function vehicleLine(v) {
        var price = fmtPrice(v.precioOferta || v.precio);
        var bits = [v.marca, v.modelo, v.year].filter(Boolean).join(' ');
        var extras = [];
        if (v.kilometraje) extras.push(v.kilometraje.toLocaleString('es-CO') + ' km');
        if (v.transmision) extras.push(v.transmision);
        if (v.estado === 'reservado') extras.push('reservado');
        var extrasStr = extras.length ? ' · ' + extras.join(', ') : '';
        return '• ' + bits + ' — ' + price + extrasStr;
    }

    function formatResponse(searchResult, opts) {
        opts = opts || {};
        var vehicles = searchResult.vehicles || [];
        var filters = searchResult.filters || {};
        var firstName = opts.firstName || '';
        var greet = firstName ? firstName + ', ' : '';

        // Construir descripción de los filtros aplicados (humano)
        var filterDescr = [];
        if (filters.marca)       filterDescr.push(filters.marca);
        if (filters.categoria)   filterDescr.push(filters.categoria);
        if (filters.priceMax)    filterDescr.push('hasta ' + fmtPrice(filters.priceMax));
        if (filters.yearMin)     filterDescr.push('desde ' + filters.yearMin);
        if (filters.kmMax)       filterDescr.push('menos de ' + filters.kmMax.toLocaleString('es-CO') + ' km');
        var filterStr = filterDescr.length ? filterDescr.join(', ') : 'opciones disponibles';

        if (vehicles.length === 0) {
            return {
                text: greet + 'no encontré ' + filterStr + ' en este momento. ' +
                      '¿Querés que te muestre el catálogo completo o que un asesor te avise cuando llegue algo así?',
                cta: { label: 'Ver catálogo completo', action: 'goto-busqueda' },
                vehiclesShown: []
            };
        }

        if (vehicles.length === 1) {
            var v = vehicles[0];
            return {
                text: greet + 'tengo esto: ' + v.marca + ' ' + v.modelo + ' ' + v.year +
                      ' por ' + fmtPrice(v.precioOferta || v.precio) +
                      (v.kilometraje ? ' (' + v.kilometraje.toLocaleString('es-CO') + ' km)' : '') +
                      '. ¿Querés ver la ficha completa o coordinar una visita?',
                cta: { label: 'Ver ficha', action: 'goto-busqueda' },
                vehiclesShown: [v.id]
            };
        }

        var lines = vehicles.map(vehicleLine).join('\n');
        return {
            text: '🚗 Encontré ' + vehicles.length + ' opciones para ' + filterStr + ':\n' +
                  lines + '\n\n¿Cuál te llama más la atención? Puedo darte detalles de cualquiera.',
            cta: { label: 'Ver catálogo', action: 'goto-busqueda' },
            vehiclesShown: vehicles.map(function (x) { return x.id; })
        };
    }

    /* ─────────────────────────────────────────────────────────────
       lookupById — busca vehículo en inventario por id (anáfora).
       ───────────────────────────────────────────────────────────── */
    function lookupById(id) {
        var inventory = (window.vehicleDB && window.vehicleDB.vehicles) || [];
        for (var i = 0; i < inventory.length; i++) {
            if (inventory[i] && (inventory[i].id == id || inventory[i].id === id)) {
                return inventory[i];
            }
        }
        return null;
    }

    /* ─────────────────────────────────────────────────────────────
       PUBLIC API
       ───────────────────────────────────────────────────────────── */
    window.AltorraInventorySearch = {
        extractFilters: extractFilters,
        search: search,
        searchFromText: searchFromText,
        formatResponse: formatResponse,
        lookupById: lookupById,
        _fmtPrice: fmtPrice
    };
})();
