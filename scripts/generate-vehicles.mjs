// ===========================================================
// Vehicle page generator — SEO & social sharing
// ===========================================================
// Reads vehicles from Firestore, generates individual HTML files
// in /vehiculos/{slug}.html with pre-baked meta tags, OG data,
// JSON-LD schema, and <noscript> content for crawlers.
// Also regenerates sitemap.xml with all current vehicles.
//
// This runs automatically via GitHub Actions on every push
// and on a daily schedule. Can also be run manually:
//   node scripts/generate-vehicles.mjs
// ===========================================================

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { readFileSync, writeFileSync, mkdirSync, readdirSync, unlinkSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyD9MJrON70mPqZxQqhndgQHNkTZUnnaQIs",
    authDomain: "altorra-cars.firebaseapp.com",
    projectId: "altorra-cars",
    storageBucket: "altorra-cars.firebasestorage.app",
    messagingSenderId: "235148219730",
    appId: "1:235148219730:web:ceabdbc52fdcbe8b85168b",
    measurementId: "G-ZGZ6CVTB73"
};

const SITE_URL = 'https://altorracars.github.io';

// ===================== Helpers =====================

function slugify(v) {
    return [v.marca, v.modelo, v.year, v.id]
        .filter(Boolean)
        .join('-')
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}

function slugifyBrand(id) {
    return String(id)
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}

function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatPrice(price) {
    if (!price) return '';
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
}

function formatKm(km) {
    if (!km || km === 0) return '0 km';
    return new Intl.NumberFormat('es-CO').format(km) + ' km';
}

function getFullImage(v) {
    const img = v.imagen || '';
    return img.startsWith('http') ? img : SITE_URL + '/' + img;
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function escapeAttr(str) {
    // CMS FASE 0.5 (comité v4): antes solo escapaba & y " — NO < > ' → un valor con
    // `<`/`>` en un meta-tag (og:*/twitter:*) filtraba HTML crudo. Defensa-en-profundidad
    // ANTES de exponer cualquier campo editable (CMS) a atributos. `&` va primero.
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function escapeXml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

// CMS FASE 0.1 (Decisión Fuerte comité v4) — JSON embebido en HTML inline
// (<script type="application/ld+json"> y <script>window.X=…</script>) DEBE neutralizar
// el breakout de </script> y los separadores de línea JS. JSON.stringify CRUDO no escapa
// `<` `>` `&` ni U+2028/U+2029 → un campo editable (CMS) que fluya a estos sinks sería
// stored-XSS persistente, horneado y servido a todo visitante. Las secuencias \uXXXX que
// inyectamos son válidas dentro de un string JSON → el parser del navegador las decodifica
// al MISMO valor: semántica idéntica, bytes seguros. (Render-side defensa-en-profundidad;
// la defensa primaria es el TIPO+CONTENIDO validado server-side en las reglas Firestore.)
function safeJsonLd(obj) {
    return JSON.stringify(obj).replace(/[<>&\u2028\u2029]/g, function (c) {
        return '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0');
    });
}

// ===================== Page Generation =====================

function generatePage(template, v, slug) {
    const marca = capitalize(v.marca || '');
    const modelo = v.modelo || '';
    const year = v.year || '';
    const title = `${marca} ${modelo} ${year} | ALTORRA CARS`;
    const precio = v.precioOferta || v.precio;
    const precioText = precio ? formatPrice(precio) : '';
    const desc = `${marca} ${modelo} ${year} - ${precioText}. ${capitalize(v.tipo || '')}, ${capitalize(v.transmision || '')}, ${formatKm(v.kilometraje)}. Disponible en ALTORRA CARS, Cartagena.`;
    const fullImage = getFullImage(v);
    const canonicalUrl = `${SITE_URL}/vehiculos/${slug}.html`;

    let html = template;

    // Guard anti-regresión (SP-5.3): el generador hace .replace() por string literal
    // y FALLA EN SILENCIO si un anclaje no existe. Si un rediseño del template borra
    // un anclaje, queremos un error RUIDOSO, no 27 páginas con SEO roto.
    const REQUIRED_ANCHORS = [
        '<meta charset="UTF-8">',
        '<meta name="robots" content="index, follow">',
        '<title>Detalle de Vehículo | ALTORRA CARS</title>',
        'id="og-url" content="https://altorracars.github.io/detalle-vehiculo.html"',
        'id="og-title"',
        'id="og-description"',
        'id="og-image"',
        'id="tw-title"',
        'id="tw-description"',
        'id="tw-image"',
        '</head>',
        '<div id="header-placeholder"></div>',
        '<script src="js/core/historial-visitas.js"></script>',
    ];
    for (const anchor of REQUIRED_ANCHORS) {
        if (!template.includes(anchor)) {
            throw new Error(`[generate] ANCLAJE FALTANTE en detalle-vehiculo.html: ${anchor}\n  → El rediseño rompió un punto de inyección. Revisa el template antes de generar.`);
        }
    }

    // 1. Ensure <base href="/"> exists so relative paths work from /vehiculos/ subdir
    //    (template already includes it, but keep this as a safety check)
    if (!html.includes('<base href="/">')) {
        html = html.replace(
            '<meta charset="UTF-8">',
            '<meta charset="UTF-8">\n    <base href="/">'
        );
    }

    // 2. Add canonical URL
    html = html.replace(
        '<meta name="robots" content="index, follow">',
        `<meta name="robots" content="index, follow">\n    <link rel="canonical" href="${canonicalUrl}">`
    );

    // 3. Replace <title>
    html = html.replace(
        '<title>Detalle de Vehículo | ALTORRA CARS</title>',
        `<title>${escapeHtml(title)}</title>`
    );

    // 4. Replace meta description
    html = html.replace(
        'content="Vehículo disponible en ALTORRA CARS - Cartagena, Colombia. Financiación disponible."',
        `content="${escapeAttr(desc)}"`
    );

    // 5. Replace Open Graph tags
    html = html.replace(
        'id="og-url" content="https://altorracars.github.io/detalle-vehiculo.html"',
        `id="og-url" content="${escapeAttr(canonicalUrl)}"`
    );
    html = html.replace(
        'id="og-title" content="Vehiculo Disponible | ALTORRA CARS - Cartagena"',
        `id="og-title" content="${escapeAttr(title)}"`
    );
    html = html.replace(
        'id="og-description" content="Encuentra los mejores vehiculos nuevos y usados en Cartagena. Financiacion disponible. Visitanos o agenda tu cita en linea."',
        `id="og-description" content="${escapeAttr(desc)}"`
    );
    html = html.replace(
        'id="og-image" content="https://altorracars.github.io/multimedia/hero-car.jpg"',
        `id="og-image" content="${escapeAttr(fullImage)}"`
    );

    // 6. Replace Twitter Card tags
    html = html.replace(
        'id="tw-title" content="Vehiculo Disponible | ALTORRA CARS - Cartagena"',
        `id="tw-title" content="${escapeAttr(title)}"`
    );
    html = html.replace(
        'id="tw-description" content="Encuentra los mejores vehiculos nuevos y usados en Cartagena. Financiacion disponible. Visitanos o agenda tu cita en linea."',
        `id="tw-description" content="${escapeAttr(desc)}"`
    );
    html = html.replace(
        'id="tw-image" content="https://altorracars.github.io/multimedia/hero-car.jpg"',
        `id="tw-image" content="${escapeAttr(fullImage)}"`
    );

    // 7. Inject JSON-LD schemas before </head>
    // §90 Fase 4 SEO — expandido con bodyType + driveWheelConfiguration +
    //                  vehicleEngine (si cilindrada/potencia) + itemCondition
    //                  + BreadcrumbList Home > Marcas > {Marca} > {Vehiculo}
    const bodyTypeMap = {
        'suv': 'SUV',
        'sedan': 'Sedan',
        'sedán': 'Sedan',
        'hatchback': 'Hatchback',
        'pickup': 'PickupTruck',
        'camioneta': 'SUV',
        'coupe': 'Coupe',
        'coupé': 'Coupe',
        'convertible': 'Convertible',
        'minivan': 'MiniVan',
        'van': 'Van'
    };
    const bodyTypeRaw = String(v.categoria || '').toLowerCase().trim();
    const bodyType = bodyTypeMap[bodyTypeRaw] || '';

    const tracMap = {
        'delantera': 'FrontWheelDriveConfiguration',
        'fwd': 'FrontWheelDriveConfiguration',
        'trasera': 'RearWheelDriveConfiguration',
        'rwd': 'RearWheelDriveConfiguration',
        '4x4': 'AllWheelDriveConfiguration',
        '4wd': 'AllWheelDriveConfiguration',
        'awd': 'AllWheelDriveConfiguration',
        '4x2': 'FrontWheelDriveConfiguration'
    };
    const tracRaw = String(v.traccion || '').toLowerCase().trim();
    const driveConfig = tracMap[tracRaw] || '';

    const isUsed = String(v.tipo || '').toLowerCase() === 'usado';
    const itemCondition = isUsed
        ? 'https://schema.org/UsedCondition'
        : 'https://schema.org/NewCondition';

    // §205 Gate legal: SOLO los vehículos PROPIOS de Altorra publican placa (VIN) y declaran
    // a Altorra como vendedor (AutoDealer). Para aliados/consignas (carros de TERCEROS):
    // publicar la placa = exposición Habeas Data (Ley 1581), y declarar seller=Altorra =
    // garantía solidaria (Ley 1480 art.7-8) sobre carro ajeno. Interim sobre el campo
    // `concesionario` actual; la restructura comercial lo reemplaza por tipoTenencia +
    // autorización por-titular (datosVehiculoPublicos). ⟦OPUS-4.8 · rev-Fable⟧
    const esPropio = !v.concesionario || v.concesionario === '';

    const carSchema = {
        '@context': 'https://schema.org',
        '@type': 'Car',
        name: `${marca} ${modelo} ${year}`,
        brand: { '@type': 'Brand', name: marca },
        model: modelo,
        vehicleModelDate: String(year),
        image: fullImage,
        url: canonicalUrl,
        vehicleTransmission: capitalize(v.transmision || ''),
        fuelType: capitalize(v.combustible || ''),
        mileageFromOdometer: {
            '@type': 'QuantitativeValue',
            value: v.kilometraje || 0,
            unitCode: 'KMT'
        },
        color: v.color || '',
        numberOfDoors: v.puertas || 5,
        vehicleSeatingCapacity: v.pasajeros || v.asientos || 5,
        itemCondition,
        offers: {
            '@type': 'Offer',
            price: precio,
            priceCurrency: 'COP',
            // E4 §186/F25: apartado = alguien dejó un monto pero el carro
            // sigue publicado con badge → LimitedAvailability (no InStock).
            availability: v.estado === 'apartado'
                ? 'https://schema.org/LimitedAvailability'
                : 'https://schema.org/InStock',
            itemCondition,
            seller: {
                '@type': 'AutoDealer',
                name: 'ALTORRA CARS',
                url: SITE_URL,
                address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Cartagena',
                    addressRegion: 'Bolívar',
                    addressCountry: 'CO'
                }
            }
        }
    };

    // Campos condicionales — solo si hay datos reales
    if (bodyType) carSchema.bodyType = bodyType;
    if (driveConfig) carSchema.driveWheelConfiguration = driveConfig;
    if (esPropio && v.placa && v.placa !== 'Disponible al contactar') {
        carSchema.vehicleIdentificationNumber = String(v.placa);
    }
    // §205: carro de TERCERO (aliado/consigna) → omitir seller=AutoDealer Altorra del Offer
    // (no afirmar venta directa de un carro ajeno). El Offer conserva precio/disponibilidad.
    if (!esPropio) {
        delete carSchema.offers.seller;
    }
    if (v.cilindraje || v.potencia) {
        carSchema.vehicleEngine = {
            '@type': 'EngineSpecification',
            ...(v.cilindraje && {
                engineDisplacement: {
                    '@type': 'QuantitativeValue',
                    value: String(v.cilindraje).replace(/[^0-9.]/g, ''),
                    unitCode: 'CMQ'
                }
            }),
            ...(v.potencia && {
                enginePower: {
                    '@type': 'QuantitativeValue',
                    value: v.potencia,
                    unitCode: 'BHP'
                }
            })
        };
    }

    // BreadcrumbList: Home > Marcas > {Marca} > {Vehículo}
    const brandSlug = slugifyBrand(v.marca || '');
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL + '/' },
            { '@type': 'ListItem', position: 2, name: 'Marcas', item: SITE_URL + '/marcas.html' },
            { '@type': 'ListItem', position: 3, name: marca, item: `${SITE_URL}/marcas/${brandSlug}.html` },
            { '@type': 'ListItem', position: 4, name: `${marca} ${modelo} ${year}`, item: canonicalUrl }
        ]
    };

    html = html.replace(
        '</head>',
        `    <script type="application/ld+json">${safeJsonLd(carSchema)}</script>\n` +
        `    <script type="application/ld+json">${safeJsonLd(breadcrumbSchema)}</script>\n</head>`
    );

    // 8. Inject PRERENDERED_VEHICLE_ID before historial-visitas.js so auto-tracking
    //    can read it synchronously. Fallback: detalle-page.js (SP-5.3 — el inline
    //    'let currentVehicle' se extrajo a js/public/detalle/; ya no existe en el template).
    const prerenderedTag = `<script>window.PRERENDERED_VEHICLE_ID = ${safeJsonLd(String(v.id))};</script>`;
    if (html.includes('<script src="js/core/historial-visitas.js"></script>')) {
        html = html.replace(
            '<script src="js/core/historial-visitas.js"></script>',
            prerenderedTag + '\n    <script src="js/core/historial-visitas.js"></script>'
        );
    } else {
        html = html.replace(
            '<script src="js/public/detalle/detalle-page.js"></script>',
            `${prerenderedTag}\n    <script src="js/public/detalle/detalle-page.js"></script>`
        );
    }

    // 9. Add <noscript> SEO content after header placeholder
    const noscriptContent = `
    <noscript>
        <div style="max-width:1200px;margin:100px auto;padding:24px;font-family:sans-serif">
            <h1>${escapeHtml(marca)} ${escapeHtml(modelo)} ${escapeHtml(String(year))}</h1>
            <img src="${escapeAttr(fullImage)}" alt="${escapeAttr(`${marca} ${modelo} ${year}`)}" style="max-width:100%;height:auto;border-radius:12px">
            <p style="font-size:24px;font-weight:700;color:#b89658;margin:16px 0">${escapeHtml(precioText)}</p>
            <ul style="list-style:none;padding:0;line-height:2">
                <li><strong>Tipo:</strong> ${escapeHtml(capitalize(v.tipo || ''))}</li>
                <li><strong>Transmision:</strong> ${escapeHtml(capitalize(v.transmision || ''))}</li>
                <li><strong>Combustible:</strong> ${escapeHtml(capitalize(v.combustible || ''))}</li>
                <li><strong>Kilometraje:</strong> ${escapeHtml(formatKm(v.kilometraje))}</li>
                <li><strong>Color:</strong> ${escapeHtml(v.color || 'N/A')}</li>
                <li><strong>Categoria:</strong> ${escapeHtml(capitalize(v.categoria || ''))}</li>
            </ul>
            <p><a href="${SITE_URL}">Volver a ALTORRA CARS</a></p>
        </div>
    </noscript>`;

    html = html.replace(
        '<div id="header-placeholder"></div>',
        `<div id="header-placeholder"></div>${noscriptContent}`
    );

    return html;
}

// ===================== Brand Page Generation =====================

function generateBrandPage(template, brand, slug, vehicles, siteContent = {}) {
    const nombre = capitalize(brand.nombre || brand.id || '');
    const brandId = String(brand.id);
    const canonicalUrl = `${SITE_URL}/marcas/${slug}.html`;
    // CMS (TODO-23): contenido editable de la marca (siteContent/brand_{id}). El banner custom
    // (bannerUrl, validado por reglas = URL de Storage) reemplaza el b_{slug}.png estático tanto en
    // el hero (PRERENDERED_BANNER_URL) como en el SEO (og:image). '' → fallback estático (cero regresión).
    const sc = (siteContent && siteContent['brand_' + brandId]) || {};
    const customBanner = (typeof sc.bannerUrl === 'string' && sc.bannerUrl) ? sc.bannerUrl : '';
    const disponibles = vehicles.filter(v =>
        String(v.marca || '').toLowerCase() === brandId.toLowerCase()
    );
    const count = disponibles.length;
    const desc = `Vehículos ${nombre} disponibles en ALTORRA CARS, Cartagena. ${count} ${count === 1 ? 'vehículo' : 'vehículos'} en inventario. Financiación disponible.`;
    const bannerImage = customBanner || `${SITE_URL}/multimedia/banner/b_${brandId}.png`;

    let html = template;

    // FASE 0.3 (comité v4) — guard anti-fail-silent: generateBrandPage inyecta por .replace()
    // (string Y regex) y FALLA EN SILENCIO (exit 0, página con SEO roto) si un rediseño del
    // template de marca borra un anclaje — a diferencia de generatePage (vehículo) que ya tenía
    // guard (§SP-5.3). Validamos la PRESENCIA de cada anclaje ANTES de inyectar → error RUIDOSO.
    // (Verificar la presencia del tag = el regex/string del .replace correspondiente matcheará.)
    const REQUIRED_ANCHORS_BRAND = [
        '<meta charset="UTF-8">',
        '<meta name="viewport"',
        '<meta name="robots"',
        '<title',
        '</head>',
        'const params = new URLSearchParams(window.location.search);',
        '<div id="header-placeholder"></div>',
        '<!--CMS:aboutBrand-->',
    ];
    for (const anchor of REQUIRED_ANCHORS_BRAND) {
        if (!template.includes(anchor)) {
            throw new Error('[generate] ANCLAJE FALTANTE en marca.html: ' + anchor + ' — el rediseño rompió un punto de inyección de generateBrandPage. Revisa el template antes de generar.');
        }
    }

    // Ensure <base href="/"> for subdir paths
    if (!html.includes('<base href="/">')) {
        html = html.replace('<meta charset="UTF-8">', '<meta charset="UTF-8">\n    <base href="/">');
    }

    // Canonical + robots
    html = html.replace(
        /<meta name="robots"[^>]*>/,
        `<meta name="robots" content="index, follow">\n    <link rel="canonical" href="${canonicalUrl}">`
    );

    // Title
    html = html.replace(
        /<title[^>]*>.*?<\/title>/,
        `<title>${escapeHtml(nombre)} | ALTORRA CARS - Cartagena</title>`
    );

    // Meta description — insert after viewport meta if not present
    if (!html.includes('<meta name="description"')) {
        html = html.replace(
            '<meta name="viewport"',
            `<meta name="description" content="${escapeAttr(desc)}">\n    <meta name="viewport"`
        );
    } else {
        html = html.replace(
            /<meta name="description"[^>]*>/,
            `<meta name="description" content="${escapeAttr(desc)}">`
        );
    }

    // §90 Fase 4 SEO — OG + Twitter Cards + JSON-LD AutoDealer + BreadcrumbList
    // Las páginas /marcas/*.html no tenían meta tags sociales hasta hoy. Al
    // compartir una marca en WhatsApp/IG/FB no aparecía preview.
    const ogTitle = `Vehículos ${nombre} en Cartagena | ALTORRA CARS`;
    const ogBlock = [
        '<meta property="og:type" content="website">',
        `<meta property="og:title" content="${escapeAttr(ogTitle)}">`,
        `<meta property="og:description" content="${escapeAttr(desc)}">`,
        `<meta property="og:url" content="${escapeAttr(canonicalUrl)}">`,
        `<meta property="og:image" content="${escapeAttr(bannerImage)}">`,
        '<meta property="og:image:width" content="1200">',
        '<meta property="og:image:height" content="630">',
        '<meta property="og:locale" content="es_CO">',
        '<meta property="og:site_name" content="ALTORRA CARS">',
        '<meta name="twitter:card" content="summary_large_image">',
        `<meta name="twitter:title" content="${escapeAttr(ogTitle)}">`,
        `<meta name="twitter:description" content="${escapeAttr(desc)}">`,
        `<meta name="twitter:image" content="${escapeAttr(bannerImage)}">`,
        // Local SEO Cartagena
        '<meta name="geo.region" content="CO-BOL">',
        '<meta name="geo.placename" content="Cartagena">',
        '<meta name="geo.position" content="10.3910485;-75.4794257">',
        '<meta name="ICBM" content="10.3910485, -75.4794257">'
    ].map(t => '    ' + t).join('\n');

    html = html.replace(
        /<link rel="canonical"[^>]*>/,
        m => m + '\n' + ogBlock
    );

    // JSON-LD AutoDealer expandido + BreadcrumbList
    const dealerSchema = {
        '@context': 'https://schema.org',
        '@type': 'AutoDealer',
        name: `ALTORRA CARS - ${nombre}`,
        url: canonicalUrl,
        brand: { '@type': 'Brand', name: nombre },
        description: desc,
        image: bannerImage,
        telephone: '+57 323 501 6747',
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Cartagena',
            addressRegion: 'Bolívar',
            addressCountry: 'CO'
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: 10.3910485,
            longitude: -75.4794257
        },
        areaServed: {
            '@type': 'City',
            name: 'Cartagena de Indias'
        },
        numberOfItems: count
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL + '/' },
            { '@type': 'ListItem', position: 2, name: 'Marcas', item: SITE_URL + '/marcas.html' },
            { '@type': 'ListItem', position: 3, name: nombre, item: canonicalUrl }
        ]
    };

    html = html.replace(
        '</head>',
        `    <script type="application/ld+json">${safeJsonLd(dealerSchema)}</script>\n` +
        `    <script type="application/ld+json">${safeJsonLd(breadcrumbSchema)}</script>\n</head>`
    );

    // Inject PRERENDERED_BRAND_ID so the inline script picks up the brand without ?marca= query param
    html = html.replace(
        '<script>\n        const params = new URLSearchParams(window.location.search);',
        `<script>window.PRERENDERED_BRAND_ID = ${safeJsonLd(brandId)};</script><script>window.PRERENDERED_BANNER_URL = ${safeJsonLd(customBanner)};</script>\n    <script>\n        const params = new URLSearchParams(window.location.search);`
    );

    // <noscript> fallback for crawlers
    const noscript = `
    <noscript>
        <div style="max-width:1200px;margin:100px auto;padding:24px;font-family:sans-serif">
            <h1>Vehículos ${escapeHtml(nombre)} en ALTORRA CARS</h1>
            <p>${escapeHtml(desc)}</p>
            <ul style="list-style:none;padding:0;line-height:2">
${disponibles.slice(0, 20).map(v => {
    const vs = slugify(v);
    return `                <li><a href="${SITE_URL}/vehiculos/${vs}.html">${escapeHtml(capitalize(v.marca || ''))} ${escapeHtml(v.modelo || '')} ${escapeHtml(String(v.year || ''))}</a></li>`;
}).join('\n')}
            </ul>
            <p><a href="${SITE_URL}">Volver a ALTORRA CARS</a></p>
        </div>
    </noscript>`;

    html = html.replace(
        '<div id="header-placeholder"></div>',
        `<div id="header-placeholder"></div>${noscript}`
    );

    // CMS FASE 2 cobaya — contenido editable OPCIONAL "acerca de la marca".
    // Fuente: siteContent/brand_{id}.aboutBrand (escrito por el editor del admin, validado
    // server-side por las reglas). Render-side: escapeHtml (text node, anti-XSS, defensa-en-prof).
    // Contrato de fallback: sin doc / sin campo / no-string → ancla → vacío (la sección no se
    // renderiza; NUNCA rompe ni vacía la página de marca — es contenido aditivo).
    const aboutBrand = (typeof sc.aboutBrand === 'string') ? sc.aboutBrand.trim() : '';
    // Estilo en css/home/marca-cinematic.css (.brand-about) — centrado, Manrope, alineado al header.
    const aboutBlock = aboutBrand
        ? `<section class="brand-about"><div class="container"><p>${escapeHtml(aboutBrand)}</p></div></section>`
        : '';
    html = html.replace('<!--CMS:aboutBrand-->', aboutBlock);

    return html;
}

// ===================== Sitemap Generation =====================

function generateSitemap(vehicles, slugMap, brandSlugMap = new Map()) {
    const today = new Date().toISOString().split('T')[0];

    // Static pages use fixed lastmod dates — only update these when the page
    // content actually changes.  Google ignores lastmod if every page always
    // shows "today": https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
    const staticPages = [
        { loc: '/',                          freq: 'weekly',  prio: '1.0',  lastmod: '2026-04-08' },
        { loc: '/busqueda.html',             freq: 'weekly',  prio: '0.9',  lastmod: '2026-04-08' },
        { loc: '/vehiculos-suv.html',        freq: 'weekly',  prio: '0.8',  lastmod: '2026-04-08' },
        { loc: '/vehiculos-sedan.html',      freq: 'weekly',  prio: '0.8',  lastmod: '2026-04-08' },
        { loc: '/vehiculos-pickup.html',     freq: 'weekly',  prio: '0.8',  lastmod: '2026-04-08' },
        { loc: '/vehiculos-hatchback.html',  freq: 'weekly',  prio: '0.8',  lastmod: '2026-04-08' },
        { loc: '/vehiculos-camionetas.html', freq: 'weekly',  prio: '0.8',  lastmod: '2026-04-08' },
        { loc: '/simulador-credito.html',    freq: 'monthly', prio: '0.7',  lastmod: '2026-04-08' },
        { loc: '/comparar.html',             freq: 'monthly', prio: '0.6',  lastmod: '2026-04-08' },
        { loc: '/resenas.html',              freq: 'monthly', prio: '0.6',  lastmod: '2026-04-08' },
        { loc: '/nosotros.html',             freq: 'monthly', prio: '0.6',  lastmod: '2026-04-08' },
        { loc: '/contacto.html',             freq: 'monthly', prio: '0.6',  lastmod: '2026-04-08' },
        { loc: '/favoritos.html',            freq: 'monthly', prio: '0.5',  lastmod: '2026-04-08' },
        { loc: '/terminos.html',             freq: 'yearly',  prio: '0.3',  lastmod: '2026-04-08' },
        { loc: '/privacidad.html',           freq: 'yearly',  prio: '0.3',  lastmod: '2026-04-08' },
        { loc: '/cookies.html',              freq: 'yearly',  prio: '0.3',  lastmod: '2026-04-08' },
    ];

    const urls = [];

    // Static pages — fixed lastmod
    for (const p of staticPages) {
        urls.push(sitemapUrl(`${SITE_URL}${p.loc}`, p.lastmod, p.freq, p.prio));
    }

    // Brand pages — use today since inventory changes with vehicles
    for (const [brandId, brandSlug] of brandSlugMap) {
        urls.push(sitemapUrl(`${SITE_URL}/marcas/${brandSlug}.html`, today, 'weekly', '0.7'));
    }

    // Vehicle detail pages
    for (const v of vehicles) {
        const slug = slugMap.get(String(v.id));
        if (!slug) continue;

        let lastmod = today;
        if (v.updatedAt) {
            try {
                const ts = v.updatedAt;
                const d = (typeof ts.toDate === 'function') ? ts.toDate()
                        : (typeof ts === 'number')           ? new Date(ts)
                        : new Date(String(ts));
                const iso = d.toISOString().split('T')[0];
                if (/^\d{4}-\d{2}-\d{2}$/.test(iso)) lastmod = iso;
            } catch (_) { /* keep today */ }
        }

        urls.push(sitemapUrl(`${SITE_URL}/vehiculos/${slug}.html`, lastmod, 'weekly', '0.8'));
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;

    if (!xml.startsWith('<?xml') || !xml.includes('</urlset>')) {
        throw new Error('[generateSitemap] Output failed structural validation — aborting.');
    }

    return xml;
}

function sitemapUrl(loc, lastmod, changefreq, priority) {
    return `    <url>\n        <loc>${loc}</loc>\n        <lastmod>${lastmod}</lastmod>\n        <changefreq>${changefreq}</changefreq>\n        <priority>${priority}</priority>\n    </url>`;
}

// ===================== Main =====================

async function main() {
    console.log('[generate] Connecting to Firebase...');
    const app = initializeApp(FIREBASE_CONFIG);
    const db = getFirestore(app);

    console.log('[generate] Fetching vehicles from Firestore...');
    const snap = await getDocs(collection(db, 'vehiculos'));
    const allVehicles = snap.docs.map(d => d.data());

    // Filter: "disponible" Y "apartado" get pages (E4 §186/F25: el apartado
    // sigue publicado CON badge — urgencia + conserva el SEO acumulado;
    // vendido/reservado/borrador siguen sin página, como siempre).
    const vehicles = allVehicles.filter(v => {
        const estado = v.estado || 'disponible';
        return estado === 'disponible' || estado === 'apartado';
    });

    console.log(`[generate] ${allVehicles.length} total, ${vehicles.length} publicables (disponible+apartado).`);

    // Read template
    const template = readFileSync(join(ROOT, 'detalle-vehiculo.html'), 'utf-8');

    // Build slug map
    const slugMap = new Map();
    for (const v of vehicles) {
        slugMap.set(String(v.id), slugify(v));
    }

    // Create /vehiculos/ directory
    const outDir = join(ROOT, 'vehiculos');
    mkdirSync(outDir, { recursive: true });

    // Clean previous generated files
    try {
        for (const f of readdirSync(outDir).filter(f => f.endsWith('.html'))) {
            unlinkSync(join(outDir, f));
        }
    } catch (_) { /* first run */ }

    // Generate one HTML per vehicle
    console.log('[generate] Generating vehicle pages...');
    for (const v of vehicles) {
        const slug = slugMap.get(String(v.id));
        const html = generatePage(template, v, slug);
        writeFileSync(join(outDir, `${slug}.html`), html);
        console.log(`  + vehiculos/${slug}.html`);
    }
    console.log(`[generate] ${vehicles.length} pages created in /vehiculos/`);

    // Write slug map JSON (client-side reference)
    const dataDir = join(ROOT, 'data');
    mkdirSync(dataDir, { recursive: true });
    writeFileSync(
        join(dataDir, 'vehicle-slugs.json'),
        JSON.stringify(Object.fromEntries(slugMap), null, 2)
    );
    console.log('[generate] Slug map → data/vehicle-slugs.json');

    // Generate brand pages
    console.log('[generate] Fetching brands from Firestore...');
    const brandsSnap = await getDocs(collection(db, 'marcas'));
    const brands = brandsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
    console.log(`[generate] ${brands.length} brands found.`);

    // CMS FASE 2 — contenido editable OPCIONAL (siteContent/*). El cron lee como cliente
    // anónimo bajo reglas (read:if true — invariante §2 Hueco B). Si la red falla o está vacío
    // → se hornea SIN el contenido CMS (las páginas NO se rompen; es aditivo). NO fail-loud aquí:
    // a diferencia de vehículos/marcas, siteContent ausente es estado legítimo (nadie editó aún).
    let siteContentMap = {};
    try {
        const scSnap = await getDocs(collection(db, 'siteContent'));
        scSnap.forEach(d => { siteContentMap[d.id] = d.data() || {}; });
        console.log(`[generate] ${Object.keys(siteContentMap).length} docs siteContent (contenido CMS).`);
    } catch (err) {
        console.warn('[generate] siteContent no disponible — se hornea sin contenido CMS opcional:', err.message);
        siteContentMap = {};
    }

    const brandTemplate = readFileSync(join(ROOT, 'marca.html'), 'utf-8');
    const brandSlugMap = new Map();
    for (const b of brands) {
        brandSlugMap.set(String(b.id), slugifyBrand(b.id));
    }

    const brandsDir = join(ROOT, 'marcas');
    mkdirSync(brandsDir, { recursive: true });
    try {
        for (const f of readdirSync(brandsDir).filter(f => f.endsWith('.html'))) {
            unlinkSync(join(brandsDir, f));
        }
    } catch (_) { /* first run */ }

    console.log('[generate] Generating brand pages...');
    for (const b of brands) {
        const slug = brandSlugMap.get(String(b.id));
        const html = generateBrandPage(brandTemplate, b, slug, vehicles, siteContentMap);
        writeFileSync(join(brandsDir, `${slug}.html`), html);
        console.log(`  + marcas/${slug}.html`);
    }
    console.log(`[generate] ${brands.length} brand pages created in /marcas/`);

    // Write brand slug map JSON
    writeFileSync(
        join(dataDir, 'brand-slugs.json'),
        JSON.stringify(Object.fromEntries(brandSlugMap), null, 2)
    );
    console.log('[generate] Brand slug map → data/brand-slugs.json');

    // Regenerate sitemap.xml
    console.log('[generate] Regenerating sitemap.xml...');
    const sitemap = generateSitemap(vehicles, slugMap, brandSlugMap);
    writeFileSync(join(ROOT, 'sitemap.xml'), sitemap);
    console.log('[generate] sitemap.xml updated.');

    console.log('[generate] Done!');
    process.exit(0);
}

// CMS FASE 0.1 — self-test del cierre anti-stored-XSS de los sinks JSON-LD/PRERENDERED.
// Gate REAL (no grep): hornea un payload de breakout en cada sink vía las funciones PURAS
// con mocks (SIN tocar Firestore) y exige que cada bloque JSON PARSEE. Si safeJsonLd fallara,
// la captura se trunca en el </script> inyectado → JSON.parse falla → exit 1.
// Corrible hoy: `SSG_SELFTEST=1 node scripts/generate-vehicles.mjs`
function runSelfTest() {
    const U2028 = String.fromCharCode(0x2028), U2029 = String.fromCharCode(0x2029);
    const PAYLOAD = '</script><script>alert(1)</script>' + U2028 + U2029 + ' raw < & > chars';
    const vTpl = readFileSync(join(ROOT, 'detalle-vehiculo.html'), 'utf-8');
    const bTpl = readFileSync(join(ROOT, 'marca.html'), 'utf-8');
    const mockV = { id: PAYLOAD, marca: PAYLOAD, modelo: PAYLOAD, year: 2020, precio: 50000000,
        tipo: 'sedan', transmision: 'automatica', combustible: 'gasolina', kilometraje: 10000,
        color: 'negro', categoria: 'sedan', imagen: 'https://x/y.jpg', estado: 'disponible' };
    const mockB = { id: PAYLOAD, nombre: PAYLOAD, descripcion: PAYLOAD };
    const fails = [];

    function checkScripts(label, html) {
        // FASE 0.5 — aserción de breakout en TODO el documento: tras safeJsonLd (sinks JSON)
        // + escapeAttr/escapeHtml (atributos/texto), NINGÚN sink debe dejar el `</script><script>`
        // crudo. Solo pasa si <> se neutraliza en TODOS los contextos (JSON, attr, texto).
        if (html.indexOf('</script><script>alert(1)</script>') >= 0) {
            fails.push(label + ': BREAKOUT crudo </script><script> presente en el HTML (algún sink no escapa < >)');
        }
        // FASE 0.3 — verifica que la cadena robots→canonical→OG se inyecta en la página de marca
        // (regresión: si marca.html pierde el ancla `robots`, el .replace() vuelve a ser no-op).
        if (label === 'marca') {
            if (html.indexOf('<link rel="canonical"') < 0) fails.push(label + ': falta <link rel=canonical> — cadena robots→canonical rota (¿falta el ancla robots en marca.html?)');
            if (html.indexOf('property="og:title"') < 0) fails.push(label + ': falta og:title — bloque OG/Twitter no inyectado');
            // FASE 2 cobaya — el ancla CMS debe quedar REEMPLAZADA (nunca cruda en el HTML público)
            // y, con aboutBrand no-vacío (el mock), la sección brand-about debe renderizarse.
            if (html.indexOf('<!--CMS:aboutBrand-->') >= 0) fails.push(label + ': ancla <!--CMS:aboutBrand--> NO reemplazada (inyección del CMS rota)');
            if (html.indexOf('class="brand-about"') < 0) fails.push(label + ': aboutBrand presente pero la sección brand-about NO se renderizó');
        }
        const parts = html.split('<script type="application/ld+json">');
        let n = 0;
        for (let i = 1; i < parts.length; i++) {
            const content = parts[i].split('</script>')[0];
            n++;
            try { JSON.parse(content); } catch (e) { fails.push(label + ': ld+json #' + n + ' NO parsea (breakout/escape roto): ' + e.message); }
            if (content.indexOf(U2028) >= 0 || content.indexOf(U2029) >= 0) fails.push(label + ': ld+json #' + n + ' contiene U+2028/2029 CRUDO');
        }
        if (n < 2) fails.push(label + ': esperaba >=2 bloques ld+json, encontro ' + n);
        // Solo la ASIGNACION inyectada (`window.X = valor;</script>`), no las LECTURAS del template.
        let p = 0;
        for (const varName of ['PRERENDERED_VEHICLE_ID', 'PRERENDERED_BRAND_ID', 'PRERENDERED_BANNER_URL']) {
            const marker = 'window.' + varName + ' = ';
            const idx = html.indexOf(marker);
            if (idx < 0) continue;
            const val = html.slice(idx + marker.length).split(';</script>')[0];
            p++;
            try { JSON.parse(val); } catch (e) { fails.push(label + ': ' + varName + ' valor NO parsea (breakout): ' + e.message); }
        }
        if (p < 1) fails.push(label + ': no se encontro asignacion PRERENDERED inyectada');
    }

    // FASE 2 — mock de contenido CMS con payload de breakout en aboutBrand: debe salir
    // ESCAPADO (text node) y el ancla reemplazada (lo verifican las aserciones de abajo).
    const mockSiteContent = {};
    mockSiteContent['brand_' + mockB.id] = { aboutBrand: PAYLOAD, bannerUrl: PAYLOAD };
    checkScripts('vehiculo', generatePage(vTpl, mockV, 'selftest'));
    checkScripts('marca', generateBrandPage(bTpl, mockB, 'selftest', [mockV], mockSiteContent));

    if (fails.length) {
        console.error('[SSG_SELFTEST] FALLO — safeJsonLd NO neutraliza el breakout:');
        for (const f of fails) console.error('  - ' + f);
        process.exit(1);
    }
    console.log('[SSG_SELFTEST] OK — sinks JSON-LD/PRERENDERED neutralizan </script> + U+2028/29 (safeJsonLd correcto).');
    process.exit(0);
}

if (process.env.SSG_SELFTEST) {
    runSelfTest();
} else {
    main().catch(err => {
        console.error('[generate] Fatal error:', err);
        process.exit(1);
    });
}
