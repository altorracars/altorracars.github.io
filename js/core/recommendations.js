// ============================================================
//  RECOMMENDATIONS.JS — Motor de recomendación por similitud (SP-4, ADR §138)
//  Content-based: recomienda vehículos SEMEJANTES a los del rastro del usuario,
//  ponderando múltiples dimensiones (categoría + precio + marca + características
//  + transmisión/combustible + novedad) — "un todo", no solo una señal.
//  Sin backend nuevo: usa el rastro local (vehicleHistory) + los datos en
//  vehicleDB. Fallback robusto (destacados + más nuevos) → nunca queda vacío.
//  API: window.AltorraRecommendations.getRecommendations(limit) -> [vehicle]
// ============================================================
(function () {
    'use strict';

    // Pesos de cada dimensión (suman ~100). Ajustables sin tocar la lógica.
    var W = { categoria: 30, precio: 25, marca: 15, features: 15, specs: 10, novedad: 5 };

    function priceOf(v) { return (v && (v.precioOferta || v.precio)) || 0; }
    function norm(s) { return String(s == null ? '' : s).trim().toLowerCase(); }
    function isAvailable(v) { var e = norm(v.estado); return !e || e === 'disponible'; }

    function featuresOf(v) {
        var c = v.caracteristicas || v.features || [];
        if (typeof c === 'string') c = c.split(/[,;|]/);
        if (!Array.isArray(c)) c = [];
        return c.map(norm).filter(Boolean);
    }

    function toNum(x) {
        if (typeof x === 'number') return x;
        var n = parseFloat(String(x).replace(/[^\d.]/g, ''));
        return isNaN(n) ? null : n;
    }

    // ── Perfil agregado del rastro (ponderado por recencia) ──────
    function buildProfile(history, db) {
        var p = { cats: {}, marcas: {}, features: {}, trans: {}, fuel: {}, prices: [], seen: {}, count: 0 };
        var n = history.length;
        for (var i = 0; i < n; i++) {
            var id = String(history[i].id);
            p.seen[id] = true;
            var v = db.getVehicleById(id);
            if (!v) continue;
            // Recencia: el más reciente (i=0) pesa ~1; decae suavemente.
            var w = 1 - (i / (n + 2));
            if (v.categoria) p.cats[norm(v.categoria)] = (p.cats[norm(v.categoria)] || 0) + w;
            if (v.marca) p.marcas[norm(v.marca)] = (p.marcas[norm(v.marca)] || 0) + w;
            if (v.transmision) p.trans[norm(v.transmision)] = (p.trans[norm(v.transmision)] || 0) + w;
            if (v.combustible) p.fuel[norm(v.combustible)] = (p.fuel[norm(v.combustible)] || 0) + w;
            featuresOf(v).forEach(function (f) { p.features[f] = (p.features[f] || 0) + w; });
            var pr = priceOf(v); if (pr > 0) p.prices.push(pr);
            p.count++;
        }
        if (p.prices.length) {
            p.priceAvg = p.prices.reduce(function (a, b) { return a + b; }, 0) / p.prices.length;
        }
        return p;
    }

    // ── Score de similitud de un candidato vs el perfil ──────────
    function scoreVehicle(v, p) {
        var score = 0;
        var denom = Math.max(1, p.count);

        var cat = norm(v.categoria);
        if (cat && p.cats[cat]) score += W.categoria * Math.min(1, p.cats[cat] / denom);

        var price = priceOf(v);
        if (price > 0 && p.priceAvg) {
            var dist = Math.abs(price - p.priceAvg) / p.priceAvg;       // distancia relativa
            score += W.precio * Math.max(0, 1 - dist / 0.5);            // 0% = full, ≥50% = 0
        }

        var m = norm(v.marca);
        if (m && p.marcas[m]) score += W.marca * Math.min(1, p.marcas[m] / denom);

        var vf = featuresOf(v);
        if (vf.length) {
            var overlap = 0;
            vf.forEach(function (f) { if (p.features[f]) overlap++; });
            score += W.features * Math.min(1, overlap / Math.max(3, vf.length));
        }

        var specHits = 0;
        if (norm(v.transmision) && p.trans[norm(v.transmision)]) specHits++;
        if (norm(v.combustible) && p.fuel[norm(v.combustible)]) specHits++;
        score += W.specs * (specHits / 2);

        var yr = toNum(v.year);
        if (yr) {
            var refYear = new Date().getFullYear() + 1;
            score += W.novedad * Math.max(0, 1 - Math.max(0, refYear - yr) / 10);
        }
        return score;
    }

    // ── Fallback: completar con destacados + más nuevos (sin repetir) ──
    function fillUp(result, db, candidates, seen, limit) {
        var have = {};
        result.forEach(function (v) { have[String(v.id)] = true; });
        function push(list) {
            for (var i = 0; i < list.length && result.length < limit; i++) {
                var id = String(list[i].id);
                if (!have[id] && !seen[id] && isAvailable(list[i])) { result.push(list[i]); have[id] = true; }
            }
        }
        if (db.getFeatured) push(db.getFeatured());
        push(candidates.slice().sort(function (a, b) { return (toNum(b.year) || 0) - (toNum(a.year) || 0); }));
        return result;
    }

    // ── API principal ────────────────────────────────────────────
    function getRecommendations(limit) {
        limit = limit || 5;
        var db = window.vehicleDB;
        if (!db || !db.vehicles || !db.vehicles.length) return [];
        var candidates = db.vehicles.filter(isAvailable);

        var history = (window.vehicleHistory && window.vehicleHistory.getHistory)
            ? window.vehicleHistory.getHistory() : [];

        // Sin rastro → solo fallback (destacados + más nuevos)
        if (!history.length) return fillUp([], db, candidates, {}, limit);

        var profile = buildProfile(history, db);
        var scored = candidates
            .filter(function (v) { return !profile.seen[String(v.id)]; })   // no recomendar lo ya visto
            .map(function (v) { return { v: v, s: scoreVehicle(v, profile) }; })
            .filter(function (x) { return x.s > 0; })
            .sort(function (a, b) { return b.s - a.s; });

        var result = [];
        for (var i = 0; i < scored.length && result.length < limit; i++) result.push(scored[i].v);

        // Pocos con afinidad → completar (sin repetir vistos ni ya elegidos)
        if (result.length < limit) result = fillUp(result, db, candidates, profile.seen, limit);
        return result;
    }

    window.AltorraRecommendations = { getRecommendations: getRecommendations };
})();
