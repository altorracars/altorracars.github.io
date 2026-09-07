/**
 * AltorraVehicleGuide — Asesor humano sobre vehículos específicos
 * ================================================================
 * §26.2 — Antes de este módulo, cuando el bot mencionaba un auto solo
 * decía "Toyota Hilux 2020 - $80M" + link. Ahora habla como un asesor
 * humano: contexto del modelo, beneficios para casos de uso reales,
 * comparación con el mercado, y CTAs apropiados.
 *
 * Filosofía: cada vez que ALTOR habla de un auto, el cliente debe
 * sentir que está hablando con un VENDEDOR EXPERTO — no con un
 * scraper de datos.
 *
 * API:
 *   AltorraVehicleGuide.describe(vehicle)           → array de bullets
 *   AltorraVehicleGuide.recommendByUse(v, useCase)  → frase humana
 *   AltorraVehicleGuide.priceContext(v)             → frase sobre precio
 *   AltorraVehicleGuide.nextSteps(v)                → array de CTAs
 *   AltorraVehicleGuide.fullPitch(v, opts)          → texto completo (3-5 lineas)
 *   AltorraVehicleGuide.cardData(v)                 → datos para vehicle-card UI
 */
(function () {
    'use strict';
    if (window.AltorraVehicleGuide) return;

    /* ─── Insights por categoría ─────────────────────────────── */
    var CATEGORY_INSIGHTS = {
        suv: {
            audience: 'familias, viajeros y quienes manejan en carreteras destapadas',
            strengths: [
                'altura al piso → maneja huecos y caminos rurales sin problema',
                'espacio interior amplio (5-7 pasajeros)',
                'baúl generoso para viajes y equipaje',
                'visibilidad alta — más cómodo en tráfico'
            ],
            useCases: ['familia', 'viajes', 'finca', 'carretera']
        },
        camioneta: {
            audience: 'familias grandes y trabajo pesado',
            strengths: [
                'capacidad de carga y arrastre',
                'tracción 4x4 disponible para todo terreno',
                'durabilidad probada en trabajo intensivo'
            ],
            useCases: ['trabajo', 'familia', 'finca', 'carretera']
        },
        sedan: {
            audience: 'profesionales, parejas y familias pequeñas',
            strengths: [
                'mejor rendimiento en gasolina que SUVs',
                'manejo cómodo y silencioso',
                'estilo elegante y discreto',
                'parqueo fácil en ciudad'
            ],
            useCases: ['trabajo', 'ciudad', 'pareja', 'profesional']
        },
        hatchback: {
            audience: 'jóvenes, primer auto, uso urbano intensivo',
            strengths: [
                'el más económico en gasolina',
                'súper ágil en ciudad y tráfico',
                'parqueo en cualquier espacio',
                'mantenimiento más barato'
            ],
            useCases: ['ciudad', 'primer auto', 'estudiante', 'soltero']
        },
        pickup: {
            audience: 'trabajo, finca, transporte de carga',
            strengths: [
                'capacidad de carga real (500kg+)',
                'aguanta caminos pesados y barro',
                'durabilidad excepcional',
                'doble cabina = trabajo + familia'
            ],
            useCases: ['trabajo', 'finca', 'construcción', 'transporte']
        },
        coupe: {
            audience: 'amantes del estilo y la deportividad',
            strengths: [
                'diseño deportivo y agresivo',
                'rendimiento de manejo superior',
                'estatus y carácter'
            ],
            useCases: ['estilo', 'pasión', 'fines de semana']
        },
        minivan: {
            audience: 'familias numerosas o transporte de pasajeros',
            strengths: [
                '7+ pasajeros con espacio cómodo',
                'puerta corrediza para fácil acceso',
                'configuración versátil de asientos'
            ],
            useCases: ['familia grande', 'transporte', 'viajes']
        }
    };

    /* ─── Insights por marca (reputación) ─────────────────────── */
    var BRAND_INSIGHTS = {
        toyota: 'Toyota tiene fama mundial por durabilidad y bajo costo de mantenimiento. Repuestos accesibles en todo el país.',
        mazda: 'Mazda combina diseño japonés moderno con motores eficientes. Excelente relación calidad-precio.',
        chevrolet: 'Chevrolet es de las marcas más vendidas en Colombia. Repuestos por todos lados y mecánicos que la conocen bien.',
        renault: 'Renault es ideal para presupuesto ajustado. Mantenimiento económico y diseños prácticos.',
        kia: 'Kia ofrece mucho valor por el precio: tecnología actual, garantías largas y diseño moderno.',
        hyundai: 'Hyundai es sinónimo de equipamiento completo a precio competitivo. Coreana sólida.',
        nissan: 'Nissan es robusta y duradera. Frontier es leyenda colombiana en pickups.',
        ford: 'Ford tiene presencia fuerte en pickups y SUVs. Buena para trabajo pesado.',
        volkswagen: 'Volkswagen alemana — calidad de manejo superior y acabados premium.',
        honda: 'Honda es reconocida por motores muy duraderos y bajo consumo de gasolina.',
        suzuki: 'Suzuki destaca en autos compactos y pequeños SUVs. Económica de mantener.',
        mitsubishi: 'Mitsubishi tiene tradición en SUVs robustas y pickups todoterreno.',
        bmw: 'BMW alemana premium — manejo deportivo y prestaciones superiores.',
        'mercedes-benz': 'Mercedes-Benz es lujo alemán de referencia. Confort y status.',
        audi: 'Audi combina lujo, tecnología y deportividad. Gran calidad de manejo.'
    };

    /* ─── Insights por año (depreciación + tecnología) ────────── */
    function yearInsight(year) {
        if (!year) return null;
        var currentYear = new Date().getFullYear();
        var age = currentYear - year;
        if (age <= 1) return 'Modelo casi nuevo (' + age + ' año) — depreciación mínima desde nuevo';
        if (age <= 3) return 'Modelo reciente (' + age + ' años) — equipamiento actual y buen valor de reventa';
        if (age <= 6) return 'Modelo de ' + age + ' años — sweet spot entre precio y modernidad';
        if (age <= 10) return 'Modelo con ' + age + ' años — buen precio, hay que revisar mantenimiento';
        return 'Modelo de ' + age + ' años — clásico ya estabilizado en su valor';
    }

    /* ─── Insights por kilometraje ────────────────────────────── */
    function kmInsight(km) {
        if (km === null || km === undefined) return null;
        var k = parseInt(km, 10);
        if (isNaN(k)) return null;
        if (k === 0) return '0 km — totalmente nuevo, sin uso previo';
        if (k < 10000) return 'Solo ' + fmtKm(k) + ' km — prácticamente nuevo, uso muy bajo';
        if (k < 30000) return fmtKm(k) + ' km — kilometraje muy bajo, vida útil completa por delante';
        if (k < 60000) return fmtKm(k) + ' km — bajo, todavía dentro del primer ciclo de mantenimiento mayor';
        if (k < 100000) return fmtKm(k) + ' km — kilometraje medio, normal para su edad';
        if (k < 150000) return fmtKm(k) + ' km — kilometraje alto pero los autos modernos pasan los 300K sin problema';
        return fmtKm(k) + ' km — alto, importante revisar historial de mantenimiento';
    }

    function fmtKm(n) {
        if (n >= 1000) return Math.round(n / 1000) + 'K';
        return String(n);
    }

    /* ─── Price context según rango ───────────────────────────── */
    function priceContext(vehicle) {
        var precio = vehicle.precioOferta || vehicle.precio;
        if (!precio) return null;
        var p = parseInt(precio, 10);
        if (isNaN(p)) return null;

        var hasOferta = vehicle.precioOferta && vehicle.precio
                        && vehicle.precioOferta < vehicle.precio;
        var ahorro = hasOferta ? Math.round((1 - vehicle.precioOferta / vehicle.precio) * 100) : 0;

        var msg = '';
        if (hasOferta) {
            msg = '🔥 *En oferta* — ahorras ' + ahorro + '% sobre el precio regular. ';
        }

        if (p < 30000000) msg += 'Precio muy accesible, ideal para primer auto o presupuesto ajustado.';
        else if (p < 50000000) msg += 'Buen precio para su segmento, dentro del rango popular.';
        else if (p < 80000000) msg += 'Rango medio del mercado — calidad-precio competitivo.';
        else if (p < 120000000) msg += 'Segmento premium — equipamiento y prestaciones superiores.';
        else msg += 'Segmento alta gama — lujo y exclusividad.';

        return msg.trim();
    }

    /* ─── describe — bullets humanos sobre el vehículo ────────── */
    function describe(vehicle) {
        if (!vehicle) return [];
        var bullets = [];

        var marca = (vehicle.marca || '').toLowerCase();
        var categoria = (vehicle.categoria || '').toLowerCase();

        // Year insight
        var yi = yearInsight(vehicle.year);
        if (yi) bullets.push('📅 ' + yi);

        // KM insight
        var ki = kmInsight(vehicle.kilometraje);
        if (ki) bullets.push('🛣️ ' + ki);

        // Categoría insight
        if (categoria && CATEGORY_INSIGHTS[categoria]) {
            var cat = CATEGORY_INSIGHTS[categoria];
            // Pick una fortaleza relevante
            if (cat.strengths && cat.strengths.length) {
                bullets.push('✨ ' + cat.strengths[0]);
            }
        }

        // Brand reputation
        if (BRAND_INSIGHTS[marca]) {
            bullets.push('🏷️ ' + BRAND_INSIGHTS[marca]);
        }

        // Transmisión
        if (vehicle.transmision) {
            var t = vehicle.transmision.toLowerCase();
            if (t.indexOf('autom') >= 0) {
                bullets.push('⚙️ Transmisión automática — comodísima en tráfico de Cartagena');
            } else if (t.indexOf('manual') >= 0 || t.indexOf('mec') >= 0) {
                bullets.push('⚙️ Transmisión manual — más económica de mantener');
            }
        }

        // Combustible
        if (vehicle.combustible) {
            var c = vehicle.combustible.toLowerCase();
            if (c.indexOf('diesel') >= 0 || c.indexOf('diésel') >= 0) {
                bullets.push('⛽ Diesel — mayor torque y rendimiento en carretera');
            } else if (c.indexOf('híbrido') >= 0 || c.indexOf('hibrido') >= 0) {
                bullets.push('⛽ Híbrido — ahorro de gasolina del 30-50%');
            } else if (c.indexOf('eléctrico') >= 0 || c.indexOf('electrico') >= 0) {
                bullets.push('⚡ 100% eléctrico — costo por km mínimo, cero emisiones');
            }
        }

        return bullets;
    }

    /* ─── recommendByUse — frase para un caso de uso específico ─ */
    function recommendByUse(vehicle, useCase) {
        if (!vehicle || !useCase) return null;
        var categoria = (vehicle.categoria || '').toLowerCase();
        var info = CATEGORY_INSIGHTS[categoria];
        if (!info) return null;
        if (info.useCases && info.useCases.indexOf(useCase) >= 0) {
            return 'Para ' + useCase + ' es una excelente opción: ' + info.audience + '.';
        }
        return null;
    }

    /* ─── nextSteps — CTAs apropiados ─────────────────────────── */
    function nextSteps(vehicle) {
        return [
            { label: '📅 Agendar visita', action: 'agendar', vehicleId: vehicle.id },
            { label: '💰 Simular financiación', action: 'goto-simulador', vehicleId: vehicle.id },
            { label: '👨 Hablar con asesor', action: 'escalate', vehicleId: vehicle.id }
        ];
    }

    /* ─── fullPitch — texto humano completo (3-5 líneas) ──────── */
    function fullPitch(vehicle, opts) {
        opts = opts || {};
        var bullets = describe(vehicle);
        var price = priceContext(vehicle);
        var title = (vehicle.marca || '') + ' ' + (vehicle.modelo || '') + ' ' + (vehicle.year || '');

        var pitch = '';
        if (opts.intro !== false) {
            pitch += 'Mirá, te paso info del *' + title.trim() + '*:\n\n';
        }

        // Top 3 bullets
        bullets.slice(0, 3).forEach(function (b) {
            pitch += b + '\n';
        });

        if (price) {
            pitch += '\n💵 ' + price;
        }

        if (opts.closeCTA !== false) {
            pitch += '\n\n¿Te interesa? Te puedo agendar una visita o conectar con un asesor humano para más info.';
        }

        return pitch.trim();
    }

    /* ─── cardData — datos estructurados para vehicle-card UI ─── */
    function cardData(vehicle) {
        if (!vehicle) return null;
        var image = '';
        if (vehicle.imagen) image = vehicle.imagen;
        else if (Array.isArray(vehicle.imagenes) && vehicle.imagenes.length) image = vehicle.imagenes[0];

        var precio = vehicle.precioOferta || vehicle.precio || 0;
        var hasOferta = vehicle.precioOferta && vehicle.precio
                        && vehicle.precioOferta < vehicle.precio;

        var url = '';
        if (typeof window.getVehicleDetailUrl === 'function') {
            try { url = window.getVehicleDetailUrl(vehicle); } catch (e) {}
        }
        if (!url) url = 'detalle-vehiculo.html?id=' + vehicle.id;

        return {
            id: vehicle.id,
            title: ((vehicle.marca || '') + ' ' + (vehicle.modelo || '')).trim(),
            year: vehicle.year || '',
            kilometraje: vehicle.kilometraje || 0,
            kilometrajeFmt: vehicle.kilometraje ? fmtKm(vehicle.kilometraje) + ' km' : '',
            transmision: vehicle.transmision || '',
            combustible: vehicle.combustible || '',
            categoria: vehicle.categoria || '',
            color: vehicle.color || '',
            precio: precio,
            precioFmt: fmtPriceShort(precio),
            precioOriginal: hasOferta ? vehicle.precio : null,
            precioOriginalFmt: hasOferta ? fmtPriceShort(vehicle.precio) : null,
            oferta: hasOferta,
            estado: vehicle.estado || 'disponible',
            image: image,
            url: url,
            bullets: describe(vehicle).slice(0, 2)
        };
    }

    function fmtPriceShort(n) {
        if (!n || isNaN(n)) return '';
        var nn = Number(n);
        if (nn >= 1e6) return '$' + (Math.round(nn / 1e5) / 10) + 'M';
        if (nn >= 1e3) return '$' + Math.round(nn / 1e3) + 'K';
        return '$' + nn;
    }

    /* ─── Public API ────────────────────────────────────────────── */
    window.AltorraVehicleGuide = {
        describe: describe,
        recommendByUse: recommendByUse,
        priceContext: priceContext,
        nextSteps: nextSteps,
        fullPitch: fullPitch,
        cardData: cardData,
        CATEGORY_INSIGHTS: CATEGORY_INSIGHTS,
        BRAND_INSIGHTS: BRAND_INSIGHTS
    };
})();
