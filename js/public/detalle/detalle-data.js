/* ============================================================
   ALTORRA CARS · DETALLE VEHÍCULO — datos · estado · helpers · SEO (SP-5.3)
   Estado compartido + getVehicleIdFromURL + meta/schema + formatters.
   De-monolitización Fase 1: extraído VERBATIM del <script> inline.
   Plain script (scope global compartido, como js/simulador/ y js/public/home/).
   Orden de carga: detalle-data -> detalle-render -> detalle-gallery -> detalle-page.
   ============================================================ */

        let currentVehicle = null;
        let currentImages = [];
        let currentImageIndex = 0;

        // Gallery Autoplay
        let galleryAutoplayInterval = null;
        const GALLERY_AUTOPLAY_DELAY = 4000; // 4 segundos
        let isZoomed = false;
        let _lbNavigating = false; // debounce flag

        function getVehicleIdFromURL() {
            // Pre-rendered pages embed the ID directly
            if (window.PRERENDERED_VEHICLE_ID) {
                return window.PRERENDERED_VEHICLE_ID;
            }

            // Extract ID from the last numeric segment of a slug string
            function extractIdFromSlug(slug) {
                if (!slug) return null;
                var parts = slug.split('-');
                var lastPart = parts[parts.length - 1];
                return (lastPart && /^\d+$/.test(lastPart)) ? lastPart : null;
            }

            // 1. Query param: ?v=marca-modelo-year-ID
            const params = new URLSearchParams(window.location.search);
            var slug = params.get('v');
            var idFromSlug = extractIdFromSlug(slug);
            if (idFromSlug) return idFromSlug;

            // 2. Legacy query param: ?id=N
            var legacyId = params.get('id');
            if (legacyId) return legacyId;

            // 3. Path-based: /vehiculos/marca-modelo-year-ID.html
            //    This handles direct navigation and browser refresh after replaceState
            var path = window.location.pathname;
            var pathMatch = path.match(/\/vehiculos\/(.+)\.html$/);
            if (pathMatch) {
                var pathId = extractIdFromSlug(pathMatch[1]);
                if (pathId) return pathId;
            }

            return null;
        }

        function updateMetaTags(v) {
            const marca = capitalizar(v.marca || '');
            const modelo = v.modelo || '';
            const year = v.year || '';
            const title = marca + ' ' + modelo + ' ' + year + ' | ALTORRA CARS';
            const precio = v.precioOferta || v.precio;
            const precioText = precio ? new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(precio) : '';
            const desc = marca + ' ' + modelo + ' ' + year + ' - ' + precioText + '. ' + capitalizar(v.tipo || '') + ', ' + capitalizar(v.transmision || '') + ', ' + formatKilometers(v.kilometraje || 0) + '. Disponible en ALTORRA CARS, Cartagena.';
            const image = v.imagen || 'https://altorracars.github.io/multimedia/logo-placeholder.png';
            const fullImage = image.startsWith('http') ? image : 'https://altorracars.github.io/' + image;
            // Use shareable URL (static page with pre-baked OG tags)
            const url = getShareableUrl();

            // Update page title
            document.title = title;

            // Update meta description
            var metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) metaDesc.setAttribute('content', desc);

            // Open Graph
            var setMeta = function(id, content) {
                var el = document.getElementById(id);
                if (el) el.setAttribute('content', content);
            };
            setMeta('og-url', url);
            setMeta('og-title', title);
            setMeta('og-description', desc);
            setMeta('og-image', fullImage);
            setMeta('og-price', precio || '');
            setMeta('tw-title', title);
            setMeta('tw-description', desc);
            setMeta('tw-image', fullImage);
        }

        function injectVehicleSchema(v) {
            const marca = capitalizar(v.marca || '');
            const modelo = v.modelo || '';
            const year = v.year || '';
            const precio = v.precioOferta || v.precio;
            const image = v.imagen || '';
            const fullImage = image.startsWith('http') ? image : 'https://altorracars.github.io/' + image;
            const url = getShareableUrl();

            var schema = {
                '@context': 'https://schema.org',
                '@type': 'Car',
                'name': marca + ' ' + modelo + ' ' + year,
                'brand': { '@type': 'Brand', 'name': marca },
                'model': modelo,
                'vehicleModelDate': String(year),
                'image': fullImage,
                'url': url,
                'vehicleTransmission': capitalizar(v.transmision || ''),
                'fuelType': capitalizar(v.combustible || ''),
                'mileageFromOdometer': {
                    '@type': 'QuantitativeValue',
                    'value': v.kilometraje || 0,
                    'unitCode': 'KMT'
                },
                'color': v.color || '',
                'numberOfDoors': v.puertas || 5,
                'vehicleSeatingCapacity': v.pasajeros || 5,
                'offers': {
                    '@type': 'Offer',
                    'price': precio,
                    'priceCurrency': 'COP',
                    'availability': 'https://schema.org/InStock',
                    'seller': {
                        '@type': 'AutoDealer',
                        'name': 'ALTORRA CARS',
                        'url': 'https://altorracars.github.io'
                    }
                }
            };

            var script = document.createElement('script');
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify(schema);
            document.head.appendChild(script);
        }

        function capitalizar(str) {
            if (!str) return '';
            return str.charAt(0).toUpperCase() + str.slice(1);
        }

        function formatCurrency(amount) {
            return new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0
            }).format(amount);
        }

        function formatKilometers(km) {
            if (km === 0) return '0 km';
            return new Intl.NumberFormat('es-CO').format(km) + ' km';
        }

        function formatCategoria(cat) {
            const categorias = {
                'suv': 'SUV',
                'sedan': 'Sedán',
                'pickup': 'Pickup',
                'hatchback': 'Hatchback'
            };
            return categorias[cat] || capitalizar(cat);
        }

        // ===== SHARE VEHICLE =====
        // Uses static URL (vehiculos/slug.html) for sharing — these pages have
        // pre-baked OG meta tags that social media crawlers can read
        function getShareableUrl() {
            if (!currentVehicle) return window.location.href;
            var v = currentVehicle;
            var slug = [v.marca, v.modelo, v.year, v.id]
                .filter(Boolean)
                .join('-')
                .toLowerCase()
                .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '');
            return window.location.origin + '/vehiculos/' + slug + '.html';
        }
