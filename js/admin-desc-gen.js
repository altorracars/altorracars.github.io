/**
 * ALTORRA CARS — Generador de descripciones (Mega-Plan v4, C.5)
 * ===============================================================
 * Genera párrafos de descripción profesional para vehículos a partir
 * de sus specs (marca, modelo, año, km, transmisión, combustible,
 * motor, color, características). Variantes randomizadas para que
 * vehículos del mismo tipo no tengan descripciones idénticas.
 *
 * Sin LLM externo — templates + heurísticas locales (sub-ms).
 *
 * Public API:
 *   AltorraDescGen.generate(specs)  → string con párrafos
 *   AltorraDescGen.variants(specs, n=3) → array de N descripciones
 *
 * Botón "Generar" en el modal de edición de vehículo (admin-vehicles.js)
 * lee el form y llama generate, sustituye `vDescripcion`.
 */
(function () {
    'use strict';
    if (window.AltorraDescGen) return;

    function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

    /* ═══════════════════════════════════════════════════════════
       TEMPLATES — distintas variantes para evitar repetición
       ═══════════════════════════════════════════════════════════ */
    var INTRO_TEMPLATES = [
        'Te presentamos este {marca} {modelo} {year}, una opción {tipoLabel} ideal para {audience}.',
        '{marca} {modelo} {year} en excelente estado, perfecto para {audience}.',
        'Conocé este {marca} {modelo} {year}, un {categoriaLabel} {tipoLabel} con todo lo que necesitás.',
        'Si buscás un {categoriaLabel} {tipoLabel} confiable, este {marca} {modelo} {year} es para vos.'
    ];

    var SPECS_TEMPLATES = [
        'Cuenta con motor {motor} {combustible}, transmisión {transmisionLabel}{tracTxt}{kmTxt}.',
        'Equipado con motor {motor} {combustible} y transmisión {transmisionLabel}{tracTxt}.{kmSentence}',
        'Su motor {motor} {combustible} junto a la transmisión {transmisionLabel} ofrecen {benefitTxt}.{kmSentence}'
    ];

    var FEATURES_INTRO = [
        'Entre sus equipamientos destacan: ',
        'Algunas de sus características incluyen: ',
        'Viene equipado con: ',
        'Cuenta con: '
    ];

    var TRUST_TEMPLATES = [
        'Vehículo con peritaje verificado y revisión técnica al día.',
        'Pasó por nuestro proceso de peritaje técnico y revisión completa antes de salir a la venta.',
        'Inspeccionado por nuestros peritos, te entregamos un auto en condiciones óptimas.',
        'Auto certificado por Altorra Cars: peritaje + revisión técnica garantizados.'
    ];

    var CTA_TEMPLATES = [
        '¿Te interesa? Agendá una cita para verlo en persona o consultanos por WhatsApp.',
        'Coordiná una visita o solicitá más información, te asesoramos sin compromiso.',
        'Te esperamos en Cartagena para que lo conozcas. También coordinamos pruebas de manejo.',
        'Vení a verlo o pedinos un video tour. Estamos para ayudarte a encontrar tu próximo auto.'
    ];

    /* ═══════════════════════════════════════════════════════════
       HELPERS
       ═══════════════════════════════════════════════════════════ */
    function tipoLabel(tipo) {
        if (tipo === 'nuevo') return 'cero kilómetros';
        if (tipo === 'semi-nuevo' || tipo === 'semi_nuevo') return 'semi-nuevo';
        return 'usado';
    }

    function categoriaLabel(cat) {
        var map = { suv: 'SUV', sedan: 'sedán', pickup: 'pickup', hatchback: 'hatchback', camioneta: 'camioneta' };
        return map[(cat || '').toLowerCase()] || 'vehículo';
    }

    function transmisionLabel(t) {
        var lower = (t || '').toLowerCase();
        if (lower.indexOf('automat') !== -1) return 'automática';
        if (lower.indexOf('manual') !== -1) return 'manual';
        return t || '';
    }

    function audience(specs) {
        var cat = (specs.categoria || '').toLowerCase();
        if (cat === 'suv' || cat === 'camioneta') {
            return pick(['familias', 'aventureros que buscan espacio', 'quienes necesitan versatilidad y poder']);
        }
        if (cat === 'sedan') {
            return pick(['profesionales', 'quienes buscan elegancia y eficiencia', 'el día a día en la ciudad']);
        }
        if (cat === 'pickup') {
            return pick(['trabajo y aventura', 'cargar herramientas o disfrutar el campo', 'uso mixto urbano y rural']);
        }
        if (cat === 'hatchback') {
            return pick(['ciudad', 'jóvenes profesionales', 'movilidad eficiente y ágil']);
        }
        return pick(['quienes valoran la calidad', 'el día a día', 'trayectos diarios y viajes cortos']);
    }

    function benefitTxt(specs) {
        var cat = (specs.categoria || '').toLowerCase();
        if (cat === 'pickup' || cat === 'camioneta' || cat === 'suv') {
            return pick(['potencia y resistencia', 'rendimiento todo terreno y comodidad', 'fuerza para tus tareas más exigentes']);
        }
        return pick(['un manejo suave y eficiente', 'rendimiento y eficiencia de combustible', 'comodidad en cada viaje']);
    }

    function fmtKm(km) {
        if (!km && km !== 0) return '';
        var n = parseInt(km, 10);
        if (isNaN(n)) return '';
        return n.toLocaleString('es-CO') + ' km';
    }

    function fillTemplate(template, vars) {
        return template.replace(/\{(\w+)\}/g, function (m, key) {
            return vars[key] != null ? vars[key] : '';
        });
    }

    /* ═══════════════════════════════════════════════════════════
       MAIN GENERATOR
       ═══════════════════════════════════════════════════════════ */
    function generate(specs) {
        if (!specs || !specs.marca || !specs.modelo) {
            return '';
        }
        var vars = {
            marca: specs.marca,
            modelo: specs.modelo,
            year: specs.year || '',
            tipoLabel: tipoLabel(specs.tipo),
            categoriaLabel: categoriaLabel(specs.categoria),
            transmisionLabel: transmisionLabel(specs.transmision),
            combustible: (specs.combustible || '').toLowerCase(),
            motor: specs.motor || '',
            audience: audience(specs),
            benefitTxt: benefitTxt(specs),
            tracTxt: specs.traccion ? ', tracción ' + specs.traccion.toLowerCase() : '',
            kmTxt: '',
            kmSentence: ''
        };

        // Km — variantes sutiles según si es nuevo o usado
        var kmStr = fmtKm(specs.kilometraje);
        if (kmStr) {
            if (specs.tipo === 'nuevo') {
                vars.kmTxt = ', cero kilómetros';
                vars.kmSentence = ' Cero kilómetros, sin uso previo.';
            } else {
                vars.kmTxt = ', con ' + kmStr;
                vars.kmSentence = ' Acumula ' + kmStr + ', con mantenimientos al día.';
            }
        }

        // Construir párrafos
        var paragraphs = [];

        // 1. Intro
        paragraphs.push(fillTemplate(pick(INTRO_TEMPLATES), vars));

        // 2. Specs
        if (vars.motor || vars.transmisionLabel || kmStr) {
            paragraphs.push(fillTemplate(pick(SPECS_TEMPLATES), vars));
        }

        // 3. Features
        var feats = (specs.caracteristicas || []).filter(function (f) { return f && f.length < 40; });
        if (feats.length > 0) {
            var top = feats.slice(0, Math.min(8, feats.length));
            paragraphs.push(pick(FEATURES_INTRO) + top.join(', ') + '.');
        }

        // 4. Color (si está)
        if (specs.color) {
            paragraphs.push('Color exterior: ' + specs.color + '.');
        }

        // 5. Trust
        if (specs.peritaje !== false || specs.revisionTecnica !== false) {
            paragraphs.push(pick(TRUST_TEMPLATES));
        }

        // 6. CTA
        paragraphs.push(pick(CTA_TEMPLATES));

        return paragraphs.join(' ');
    }

    function variants(specs, n) {
        n = n || 3;
        var out = [];
        var seen = {};
        var tries = 0;
        while (out.length < n && tries < 20) {
            var v = generate(specs);
            var key = v.slice(0, 80);
            if (!seen[key]) {
                seen[key] = true;
                out.push(v);
            }
            tries++;
        }
        return out;
    }

    /* ═══════════════════════════════════════════════════════════
       Public API
       ═══════════════════════════════════════════════════════════ */
    window.AltorraDescGen = {
        generate: generate,
        variants: variants
    };
})();
