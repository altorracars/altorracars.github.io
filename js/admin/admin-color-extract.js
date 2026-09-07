/**
 * ALTORRA CARS — Color extractor (Mega-Plan v4, C.3)
 * =====================================================
 * Extrae el color primario de una imagen usando Canvas API + algoritmo
 * simple de "color dominante" (k-means lite con 5 clusters). Se usa
 * para auto-completar el campo `color` del vehículo a partir de la
 * imagen principal subida.
 *
 * Heurística: descarta píxeles muy oscuros (carrocería en sombra) y
 * muy claros (cielo, brillos), prioriza saturación media-alta.
 *
 * Mapping a nombres de colores conocidos del catálogo:
 *   blanco, negro, gris, rojo, azul, verde, amarillo, naranja,
 *   morado, marrón, plateado, dorado.
 *
 * Public API:
 *   AltorraColorExtract.fromImage(imgElement, callback)
 *     → callback({hex, rgb:[r,g,b], name})
 *   AltorraColorExtract.fromUrl(url, callback)
 */
(function () {
    'use strict';
    if (window.AltorraColorExtract) return;

    var COLOR_NAMES = [
        { name: 'Blanco',    rgb: [240, 240, 240] },
        { name: 'Negro',     rgb: [25, 25, 25] },
        { name: 'Gris',      rgb: [128, 128, 128] },
        { name: 'Plateado',  rgb: [192, 192, 192] },
        { name: 'Rojo',      rgb: [200, 30, 30] },
        { name: 'Azul',      rgb: [30, 80, 200] },
        { name: 'Verde',     rgb: [40, 160, 60] },
        { name: 'Amarillo',  rgb: [240, 220, 30] },
        { name: 'Naranja',   rgb: [240, 130, 30] },
        { name: 'Morado',    rgb: [120, 50, 180] },
        { name: 'Marrón',    rgb: [110, 70, 40] },
        { name: 'Dorado',    rgb: [184, 150, 88] },
        { name: 'Beige',     rgb: [200, 180, 140] }
    ];

    function distance(rgb1, rgb2) {
        var dr = rgb1[0] - rgb2[0];
        var dg = rgb1[1] - rgb2[1];
        var db = rgb1[2] - rgb2[2];
        return Math.sqrt(dr * dr + dg * dg + db * db);
    }

    function nameForRgb(rgb) {
        var best = null, bestDist = Infinity;
        COLOR_NAMES.forEach(function (c) {
            var d = distance(rgb, c.rgb);
            if (d < bestDist) {
                bestDist = d;
                best = c;
            }
        });
        return best ? best.name : 'Desconocido';
    }

    function rgbToHex(r, g, b) {
        return '#' + [r, g, b].map(function (n) {
            var s = n.toString(16);
            return s.length === 1 ? '0' + s : s;
        }).join('');
    }

    function brightness(r, g, b) { return (r * 299 + g * 587 + b * 114) / 1000; }
    function saturation(r, g, b) {
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        if (max === 0) return 0;
        return (max - min) / max;
    }

    /* ═══════════════════════════════════════════════════════════
       EXTRACTION
       ═══════════════════════════════════════════════════════════ */
    function extractFromImageData(imageData) {
        var pixels = imageData.data;
        var len = pixels.length;
        // Sample cada N pixels para velocidad
        var step = Math.max(4, Math.floor(len / 40000)) * 4; // máx 10K samples
        // Buckets por hue/sat aproximado
        var buckets = {};
        var totalSamples = 0;

        for (var i = 0; i < len; i += step) {
            var r = pixels[i];
            var g = pixels[i + 1];
            var b = pixels[i + 2];
            var a = pixels[i + 3];
            if (a < 128) continue; // skip transparente

            var bri = brightness(r, g, b);
            var sat = saturation(r, g, b);
            // Skip extremos (pixels casi negros o casi blancos)
            // pero solo si son MUY extremos — para no perder vehículos blancos/negros
            if (bri < 15 || bri > 245) continue;

            // Bucket por canales reducidos (8 niveles cada uno → 512 buckets)
            var key = (r >> 5) + ',' + (g >> 5) + ',' + (b >> 5);
            if (!buckets[key]) {
                buckets[key] = { r: 0, g: 0, b: 0, count: 0, sat: 0 };
            }
            buckets[key].r += r;
            buckets[key].g += g;
            buckets[key].b += b;
            buckets[key].sat += sat;
            buckets[key].count++;
            totalSamples++;
        }

        if (totalSamples === 0) return null;

        // Encontrar el bucket más representativo:
        // peso = count * (1 + saturación promedio)
        var bestKey = null, bestWeight = 0;
        Object.keys(buckets).forEach(function (k) {
            var b = buckets[k];
            var avgSat = b.sat / b.count;
            var weight = b.count * (1 + avgSat);
            if (weight > bestWeight) {
                bestWeight = weight;
                bestKey = k;
            }
        });
        if (!bestKey) return null;

        var winner = buckets[bestKey];
        var rgb = [
            Math.round(winner.r / winner.count),
            Math.round(winner.g / winner.count),
            Math.round(winner.b / winner.count)
        ];
        return {
            rgb: rgb,
            hex: rgbToHex(rgb[0], rgb[1], rgb[2]),
            name: nameForRgb(rgb),
            samples: totalSamples
        };
    }

    function fromImage(imgEl, callback) {
        if (!imgEl || !imgEl.naturalWidth) {
            callback(null);
            return;
        }
        var canvas = document.createElement('canvas');
        // Reducir tamaño para velocidad (máx 200px)
        var maxDim = 200;
        var scale = Math.min(maxDim / imgEl.naturalWidth, maxDim / imgEl.naturalHeight, 1);
        canvas.width = Math.round(imgEl.naturalWidth * scale);
        canvas.height = Math.round(imgEl.naturalHeight * scale);
        var ctx = canvas.getContext('2d');
        try {
            ctx.drawImage(imgEl, 0, 0, canvas.width, canvas.height);
            var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            var result = extractFromImageData(imageData);
            callback(result);
        } catch (e) {
            // CORS o seguridad → no podemos leer el canvas
            console.warn('[C.3] Color extract error (CORS?):', e.message);
            callback(null);
        }
    }

    function fromUrl(url, callback) {
        var img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = function () {
            fromImage(img, callback);
        };
        img.onerror = function () { callback(null); };
        img.src = url;
    }

    /* ═══════════════════════════════════════════════════════════
       Public API
       ═══════════════════════════════════════════════════════════ */
    window.AltorraColorExtract = {
        fromImage: fromImage,
        fromUrl: fromUrl,
        nameForRgb: nameForRgb,
        rgbToHex: rgbToHex,
        _COLOR_NAMES: COLOR_NAMES
    };
})();
