/* ============================================================
   ALTORRA CARS · DETALLE VEHÍCULO — render del cuerpo (SP-5.3)
   renderVehicleDetail + ficha + características + similares.
   De-monolitización Fase 1: extraído VERBATIM del <script> inline.
   Plain script (scope global compartido, como js/simulador/ y js/public/home/).
   Orden de carga: detalle-data -> detalle-render -> detalle-gallery -> detalle-page.
   ============================================================ */

        function renderVehicleDetail() {
            const v = currentVehicle;

            // Badges
            const badges = getVehicleBadges(v);
            document.getElementById('badgesContainer').innerHTML = badges.map(b =>
                `<span class="badge ${b.class}">${b.text}</span>`
            ).join('');

            // Título
            document.getElementById('vehicleTitle').textContent =
                `${capitalizar(v.marca)} ${v.modelo} ${v.year}`;
            document.getElementById('vehicleSubtitle').textContent =
                `${formatCategoria(v.categoria)} • ${capitalizar(v.tipo)}`;

            // Precio - con precio normal tachado si hay oferta
            const precioFinal = v.precioOferta || v.precio;
            const priceContainer = document.getElementById('priceContainer');

            if (v.precioOferta) {
                // Hay oferta: mostrar precio normal tachado y precio oferta en rojo
                priceContainer.innerHTML = `
                    <div class="price-normal">${formatCurrency(v.precio)}</div>
                    <div class="price-offer">${formatCurrency(v.precioOferta)}</div>
                `;
            } else {
                // No hay oferta: mostrar solo precio normal
                priceContainer.innerHTML = `
                    <div class="price-value">${formatCurrency(v.precio)}</div>
                `;
            }

            // Quick Specs
            const quickSpecs = [
                { label: 'Año', value: v.year },
                { label: 'Kilometraje', value: formatKilometers(v.kilometraje) },
                { label: 'Transmisión', value: capitalizar(v.transmision) },
                { label: 'Combustible', value: capitalizar(v.combustible) }
            ];

            document.getElementById('quickSpecs').innerHTML = quickSpecs.map(spec => `
                <div class="spec-item">
                    <div class="spec-label">${spec.label}</div>
                    <div class="spec-value">${spec.value}</div>
                </div>
            `).join('');

            // Galería
            currentImages = v.imagenes && v.imagenes.length > 0 ? v.imagenes : [v.imagen];
            renderGallery();

            // Ficha Técnica
            renderFichaTecnica(v);

            // Características
            renderCaracteristicas(v);

            // Descripción
            document.getElementById('descriptionBox').textContent =
                v.descripcion || 'No hay descripción disponible para este vehículo.';

            // WhatsApp — use shareable URL for proper social previews
            const currentUrl = getShareableUrl();
            // Reutilizamos precioFinal ya declarado arriba
            const whatsappMsg = `Hola ALTORRA CARS, estoy interesado en el siguiente vehiculo:

*${v.marca.toUpperCase()} ${v.modelo.toUpperCase()} ${v.year}*

INFORMACION:
- Codigo: ${v.id}
- Categoria: ${formatCategoria(v.categoria)}
- Tipo: ${capitalizar(v.tipo)}
- Ano: ${v.year}
- Kilometraje: ${formatKilometers(v.kilometraje)}
- Transmision: ${capitalizar(v.transmision)}
- Combustible: ${capitalizar(v.combustible)}
- Color: ${v.color || 'No especificado'}

PRECIO: ${formatCurrency(precioFinal)}

Ver detalle completo:
${currentUrl}

Podrian brindarme mas informacion sobre este vehiculo?`;

            document.getElementById('btnWhatsApp').href =
                `https://wa.me/573235016747?text=${encodeURIComponent(whatsappMsg)}`;

            // Configurar botón de simulador - enlace directo a simulador-credito.html con parámetros
            const btnCalculadora = document.getElementById('btnCalculadora');
            if (btnCalculadora) {
                const params = new URLSearchParams({
                    precio: precioFinal,
                    year: v.year,
                    vehiculo: `${v.marca} ${v.modelo}`,
                    enlace: currentUrl
                });
                btnCalculadora.href = `simulador-credito.html?${params.toString()}`;
            }

            // Configurar boton comparar - usa el comparador global que sincroniza todo
            const btnComparar = document.getElementById('btnComparar');
            if (btnComparar && typeof vehicleComparator !== 'undefined') {
                // Actualizar estado inicial
                vehicleComparator.updateDetailPageButton();
                // Click handler - toggle y el comparador actualiza automaticamente
                btnComparar.onclick = () => {
                    vehicleComparator.toggle(v.id);
                };
            }

            // Configurar boton agendar visita
            const btnAgendar = document.getElementById('btnAgendar');
            if (btnAgendar) {
                btnAgendar.dataset.marca = v.marca;
                btnAgendar.dataset.modelo = v.modelo;
                btnAgendar.dataset.year = v.year;
                btnAgendar.dataset.precio = precioFinal;
            }

            document.title = `${v.marca} ${v.modelo} ${v.year} - ALTORRA CARS`;
        }

        function renderFichaTecnica(v) {
            const fichaGroups = [
                {
                    title: 'INFORMACIÓN GENERAL',
                    items: [
                        { label: 'Marca', value: capitalizar(v.marca) },
                        { label: 'Modelo', value: v.modelo },
                        { label: 'Año', value: v.year },
                        { label: 'Categoría', value: formatCategoria(v.categoria) },
                        { label: 'Tipo', value: capitalizar(v.tipo) },
                        { label: 'Color', value: v.color || 'No especificado' }
                    ]
                },
                {
                    title: 'MOTOR Y RENDIMIENTO',
                    items: [
                        { label: 'Motor', value: v.motor || 'No especificado' },
                        { label: 'Combustible', value: capitalizar(v.combustible) },
                        { label: 'Transmisión', value: capitalizar(v.transmision) },
                        { label: 'Cilindraje', value: v.cilindraje || 'No especificado' },
                        { label: 'Tracción', value: v.traccion || 'No especificado' },
                        { label: 'Potencia', value: v.potencia || 'No especificado' }
                    ]
                },
                {
                    title: 'DIMENSIONES Y CAPACIDAD',
                    items: [
                        { label: 'Puertas', value: v.puertas || 'No especificado' },
                        { label: 'Pasajeros', value: v.pasajeros || 'No especificado' },
                        { label: 'Asientos', value: v.asientos || v.pasajeros || 'No especificado' },
                        { label: 'Dirección', value: v.direccion || 'No especificado' }
                    ]
                },
                {
                    title: 'ESTADO Y DOCUMENTACIÓN',
                    items: [
                        { label: 'Kilometraje', value: formatKilometers(v.kilometraje) },
                        { label: 'Placa', value: v.placa || 'Disponible al contactar' },
                        { label: 'Código Fasecolda', value: v.codigoFasecolda || 'Consultar' },
                        { label: 'Revisión Técnico-Mecánica', value: v.revisionTecnica ? 'Al día' : 'Consultar' },
                        { label: 'Peritaje', value: v.peritaje ? 'Realizado' : 'Disponible' },
                        { label: 'Ubicación', value: v.ubicacion || 'Barranquilla' }
                    ]
                }
            ];

            document.getElementById('fichaTable').innerHTML = fichaGroups.map(group => `
                <div class="ficha-group">
                    <div class="ficha-group-title">${group.title}</div>
                    <div class="ficha-rows">
                        ${group.items.map(item => `
                            <div class="ficha-row">
                                <span class="ficha-label">${item.label}</span>
                                <div class="ficha-separator"></div>
                                <span class="ficha-value">${item.value}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('');
        }

        function renderCaracteristicas(v) {
            const caracteristicasDefault = [
                'Sistema de frenos ABS',
                'Airbags frontales',
                'Aire acondicionado',
                'Dirección hidráulica',
                'Cierre centralizado',
                'Vidrios eléctricos',
                'Espejos eléctricos',
                'Radio AM/FM'
            ];

            const caracteristicas = v.caracteristicas && v.caracteristicas.length > 0
                ? v.caracteristicas
                : caracteristicasDefault;

            const categorias = {
                seguridad: {
                    title: 'Seguridad',
                    keywords: ['airbag', 'abs', 'freno', 'alarma', 'bloqueo', 'sensor', 'cámara'],
                    items: []
                },
                confort: {
                    title: 'Confort',
                    keywords: ['aire', 'clima', 'asiento', 'calefacción', 'tapizado', 'volante'],
                    items: []
                },
                tecnologia: {
                    title: 'Tecnología',
                    keywords: ['pantalla', 'bluetooth', 'usb', 'gps', 'navegación', 'android', 'apple', 'radio'],
                    items: []
                },
                exterior: {
                    title: 'Exterior e Interior',
                    keywords: ['vidrio', 'espejo', 'luz', 'llanta', 'rin', 'direccion', 'cierre'],
                    items: []
                }
            };

            caracteristicas.forEach(feat => {
                const featLower = feat.toLowerCase();
                let categorized = false;

                for (const [key, cat] of Object.entries(categorias)) {
                    if (cat.keywords.some(keyword => featLower.includes(keyword))) {
                        cat.items.push(feat);
                        categorized = true;
                        break;
                    }
                }

                if (!categorized) {
                    categorias.exterior.items.push(feat);
                }
            });

            document.getElementById('featuresGrid').innerHTML = Object.values(categorias)
                .filter(cat => cat.items.length > 0)
                .map(cat => `
                    <div class="feature-category">
                        <div class="feature-category-title">${cat.title}</div>
                        <div class="feature-list">
                            ${cat.items.map(item => `
                                <div class="feature-item">${item}</div>
                            `).join('')}
                        </div>
                    </div>
                `).join('');
        }

        function loadSimilarVehicles() {
            const v = currentVehicle;
            const TARGET_MIN = 7;
            const TARGET_MAX = 12;
            const allOthers = vehicleDB.getAllVehicles().filter(veh => veh.id !== v.id && (!veh.estado || veh.estado === 'disponible'));

            // Score every vehicle by similarity
            let scored = allOthers.map(vehicle => {
                let simScore = 0;

                // Same category = highest priority (+200)
                if (vehicle.categoria === v.categoria) simScore += 200;

                // Same brand = strong match (+150)
                if (vehicle.marca === v.marca) simScore += 150;

                // Price within 20% = very relevant (+100)
                const priceDiff = Math.abs(vehicle.precio - v.precio);
                if (v.precio && priceDiff < v.precio * 0.2) simScore += 100;
                else if (v.precio && priceDiff < v.precio * 0.4) simScore += 50;

                // Year within 2 years (+80)
                const yearDiff = Math.abs(vehicle.year - v.year);
                if (yearDiff <= 2) simScore += 80;
                else if (yearDiff <= 4) simScore += 40;

                // Same type (nuevo/usado) (+60)
                if (vehicle.tipo === v.tipo) simScore += 60;

                // Same transmission (+30)
                if (vehicle.transmision === v.transmision) simScore += 30;

                // Base ranking score
                simScore += vehicleDB.calculateRankingScore(vehicle) * 0.1;

                return { ...vehicle, _simScore: simScore };
            }).sort((a, b) => b._simScore - a._simScore);

            // Take 7-12: prefer at least TARGET_MIN, cap at TARGET_MAX
            let count = Math.min(scored.length, TARGET_MAX);
            if (count < TARGET_MIN) count = Math.min(scored.length, TARGET_MIN);

            const cleanSimilar = scored.slice(0, count).map(({ _simScore, ...vehicle }) => vehicle);
            renderVehicles(cleanSimilar, 'similarVehicles');
            // Enable drag-to-scroll after rendering
            if (typeof enableDragScroll === 'function') enableDragScroll();
        }

        function scrollSimilarCarousel(direction) {
            var grid = document.getElementById('similarVehicles');
            if (!grid) return;
            var cardWidth = 316; // card width + gap
            grid.scrollBy({ left: direction * cardWidth * 2, behavior: 'smooth' });
        }
        window.scrollSimilarCarousel = scrollSimilarCarousel;
