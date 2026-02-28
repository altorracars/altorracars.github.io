/**
 * Featured Week Banner — ALTORRA CARS
 * Premium HUD Carousel | Gold Palette | Accessible
 *
 * Field priority:   featuredWeek:true + featuredOrder  >  destacado:true  >  6 most recent
 * Optional fields:  featuredCutoutPng (PNG sin fondo), featuredOrder (1-6)
 */
(function () {
    'use strict';

    var FW = {
        timer:          null,
        index:          0,
        total:          0,
        vehicles:       [],
        reducedMotion:  false,

        /* ─────────────────────────────────────────
           INIT
        ───────────────────────────────────────── */
        init: async function () {
            var section = document.getElementById('fw-banner');
            if (!section) return;

            FW.reducedMotion =
                !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

            await vehicleDB.load();

            var vehicles = FW._getVehicles();
            if (!vehicles.length) { section.style.display = 'none'; return; }

            vehicles    = vehicles.slice(0, 6);
            FW.vehicles = vehicles;
            FW.total    = vehicles.length;
            FW.index    = 0;

            FW._render(vehicles);
            FW._bindEvents();
            if (!FW.reducedMotion && FW.total > 1) FW._startAutoRotate();

            section.style.display = '';
        },

        /* ─────────────────────────────────────────
           VEHICLE SELECTION
           featuredWeek > destacado > 6 most recent
        ───────────────────────────────────────── */
        _getVehicles: function () {
            var all = (vehicleDB.vehicles || []).filter(function (v) {
                return v.estado === 'disponible' || !v.estado;
            });

            /* 1) featuredWeek field */
            var byWeek = all.filter(function (v) { return v.featuredWeek; });
            if (byWeek.length) {
                return byWeek.sort(function (a, b) {
                    return (a.featuredOrder || 999) - (b.featuredOrder || 999);
                });
            }

            /* 2) destacado field (legacy) */
            var byDest = all.filter(function (v) { return v.destacado; });
            if (byDest.length) return byDest;

            /* 3) fallback: 6 newest by year */
            return all.slice()
                .sort(function (a, b) { return (b.year || 0) - (a.year || 0); })
                .slice(0, 6);
        },

        /* ─────────────────────────────────────────
           RENDER ALL SLIDES + DOTS
        ───────────────────────────────────────── */
        _render: function (vehicles) {
            var track  = document.getElementById('fw-track');
            var dotsEl = document.getElementById('fw-dots');
            if (!track || !dotsEl) return;

            var slidesHTML = '';
            var dotsHTML   = '';

            vehicles.forEach(function (v, i) {
                slidesHTML += FW._buildSlide(v, i);
                dotsHTML   +=
                    '<button class="fw-dot' + (i === 0 ? ' fw-dot--active' : '') + '"' +
                    ' data-index="' + i + '" role="tab"' +
                    ' aria-label="Ir al veh\u00edculo ' + (i + 1) + '"' +
                    ' aria-selected="' + (i === 0 ? 'true' : 'false') + '"></button>';
            });

            track.innerHTML  = slidesHTML;
            dotsEl.innerHTML = dotsHTML;

            /* Preload second image immediately */
            FW._preloadNext(0);
        },

        /* ─────────────────────────────────────────
           BUILD ONE SLIDE HTML
        ───────────────────────────────────────── */
        _buildSlide: function (v, i) {
            var imgSrc = v.featuredCutoutPng || v.imagen || 'multimedia/vehicles/placeholder-car.jpg';
            var marca  = v.marca  ? v.marca.charAt(0).toUpperCase()  + v.marca.slice(1)  : '';
            var modelo = v.modelo ? v.modelo.toUpperCase() : '';
            var title  = (marca + ' ' + modelo + (v.year ? ' ' + v.year : '')).trim();

            var price        = typeof formatPrice === 'function' ? formatPrice(v.precio) : '$' + v.precio;
            var hasOffer     = v.precioOferta && v.precioOferta < v.precio;
            var displayPrice = hasOffer
                ? (typeof formatPrice === 'function' ? formatPrice(v.precioOferta) : '$' + v.precioOferta)
                : price;

            var href  = typeof getVehicleDetailUrl === 'function' ? getVehicleDetailUrl(v) : '#';
            var km    = typeof formatKm === 'function' ? formatKm(v.kilometraje) : (v.kilometraje + ' km');
            var trans = v.transmision ? v.transmision.charAt(0).toUpperCase() + v.transmision.slice(1) : '';
            var fuel  = v.combustible ? v.combustible.charAt(0).toUpperCase() + v.combustible.slice(1) : '';

            /* ── Pills ── */
            var pills = '';
            if (v.year)                                      pills += FW._pill(FW._icoYear(),  v.year);
            if (v.kilometraje !== undefined && v.kilometraje !== null) pills += FW._pill(FW._icoKm(),   km);
            if (trans)                                       pills += FW._pill(FW._icoTrans(), trans);
            if (fuel)                                        pills += FW._pill(FW._icoFuel(),  fuel);

            /* ── Price old ── */
            var priceOld = hasOffer ? '<span class="fw-price-old">' + price + '</span>' : '';

            /* ── HUD elements ── */
            var hudGauge = '';
            if (v.kilometraje !== undefined && v.kilometraje !== null) {
                hudGauge = '<div class="fw-hud-gauge" aria-hidden="true">' +
                    FW._buildGauge(v.kilometraje, km) +
                    '</div>';
            }
            var hudTrans = trans
                ? '<div class="fw-hud-trans" aria-hidden="true">' +
                  FW._buildBadge(FW._icoTransMd(), 'TRANS.', trans) + '</div>'
                : '';
            var hudFuel = fuel
                ? '<div class="fw-hud-fuel" aria-hidden="true">' +
                  FW._buildBadge(FW._icoFuelMd(), 'COMB.', fuel) + '</div>'
                : '';
            var hudYear = v.year
                ? '<div class="fw-hud-year" aria-hidden="true"><div class="fw-hud-year-inner">' +
                  '<span class="fw-hud-year-lbl">A\u00d1O</span>' +
                  '<span class="fw-hud-year-val">' + v.year + '</span>' +
                  '</div></div>'
                : '';

            var isActive = (i === 0);

            return (
                '<div class="fw-slide' + (isActive ? ' fw-slide--active' : '') + '"' +
                ' data-index="' + i + '" role="tabpanel"' +
                ' aria-label="' + title.replace(/"/g, '&quot;') + '"' +
                ' aria-hidden="' + (isActive ? 'false' : 'true') + '">' +

                /* ── Left: info (link) ── */
                '<a class="fw-info" href="' + href + '"' +
                ' tabindex="' + (isActive ? '0' : '-1') + '"' +
                ' aria-label="Ver detalle de ' + title.replace(/"/g, '&quot;') + '">' +
                '<span class="fw-premium-tag">' + FW._icoStar() + ' SELECCI\u00d3N PREMIUM</span>' +
                '<h2 class="fw-title">Destacados de la <span>Semana</span></h2>' +
                '<p class="fw-subtitle">Ofertas exclusivos y veh\u00edculos de primer nivel</p>' +
                '<hr class="fw-sep">' +
                '<span class="fw-badge">' + FW._icoStar() + ' DESTACADO DE LA SEMANA</span>' +
                '<h3 class="fw-vehicle-name">' + title + '</h3>' +
                '<div class="fw-pills">' + pills + '</div>' +
                '<div class="fw-price-box">' +
                    '<span class="fw-price-label">PRECIO</span>' +
                    '<span class="fw-price-value">' + displayPrice + '</span>' +
                    priceOld +
                '</div>' +
                '<span class="fw-cta-visual" aria-hidden="true">VER VEH\u00cdCULO ' + FW._icoArrow() + '</span>' +
                '</a>' +

                /* ── Right: visual / HUD ── */
                '<div class="fw-visual">' +
                '<div class="fw-glow" aria-hidden="true"></div>' +
                '<div class="fw-hud-blueprint" aria-hidden="true"></div>' +
                '<div class="fw-hud-corner fw-hud-tl" aria-hidden="true"></div>' +
                '<div class="fw-hud-corner fw-hud-tr" aria-hidden="true"></div>' +
                '<div class="fw-hud-corner fw-hud-bl" aria-hidden="true"></div>' +
                '<div class="fw-hud-corner fw-hud-br" aria-hidden="true"></div>' +
                hudGauge + hudTrans + hudFuel + hudYear +
                '<img class="fw-car-img"' +
                ' src="' + imgSrc + '"' +
                ' alt="' + title.replace(/"/g, '&quot;') + '"' +
                ' loading="' + (i === 0 ? 'eager' : 'lazy') + '">' +
                '</div>' +

                '</div>'
            );
        },

        /* ─────────────────────────────────────────
           NAVIGATE TO SLIDE
        ───────────────────────────────────────── */
        _goTo: function (index) {
            FW.index = index;

            var slides = document.querySelectorAll('.fw-slide');
            var dots   = document.querySelectorAll('.fw-dot');

            slides.forEach(function (s, i) {
                var active = (i === index);
                if (active) {
                    /* Force animation restart by removing then adding active class */
                    s.classList.remove('fw-slide--active');
                    void s.offsetWidth; /* reflow */
                    s.classList.add('fw-slide--active');
                    s.setAttribute('aria-hidden', 'false');
                    var lnk = s.querySelector('.fw-info');
                    if (lnk) lnk.setAttribute('tabindex', '0');
                } else {
                    s.classList.remove('fw-slide--active');
                    s.setAttribute('aria-hidden', 'true');
                    var lnk = s.querySelector('.fw-info');
                    if (lnk) lnk.setAttribute('tabindex', '-1');
                }
            });

            dots.forEach(function (d, i) {
                var active = (i === index);
                d.classList.toggle('fw-dot--active', active);
                d.setAttribute('aria-selected', active ? 'true' : 'false');
            });

            FW._preloadNext(index);

            /* Update live region for screen readers */
            var live = document.getElementById('fw-live');
            if (live) {
                var v = FW.vehicles[index] || {};
                var marca = v.marca ? v.marca.charAt(0).toUpperCase() + v.marca.slice(1) : '';
                live.textContent =
                    'Veh\u00edculo ' + (index + 1) + ' de ' + FW.total +
                    ': ' + marca + ' ' + (v.modelo || '');
            }
        },

        /* ─────────────────────────────────────────
           IMAGE PRELOAD
        ───────────────────────────────────────── */
        _preloadNext: function (currentIndex) {
            if (!FW.vehicles.length) return;
            var next = FW.vehicles[(currentIndex + 1) % FW.total];
            if (!next) return;
            var src = next.featuredCutoutPng || next.imagen;
            if (src) { var img = new Image(); img.src = src; }
        },

        /* ─────────────────────────────────────────
           AUTO-ROTATION
        ───────────────────────────────────────── */
        _startAutoRotate: function () {
            clearInterval(FW.timer);
            FW.timer = setInterval(function () {
                FW._goTo((FW.index + 1) % FW.total);
            }, 4500);
        },

        _stopAutoRotate: function () {
            clearInterval(FW.timer);
        },

        /* ─────────────────────────────────────────
           EVENT BINDINGS
        ───────────────────────────────────────── */
        _bindEvents: function () {
            var section = document.getElementById('fw-banner');
            var prev    = document.getElementById('fw-prev');
            var next    = document.getElementById('fw-next');
            var dotsEl  = document.getElementById('fw-dots');
            var track   = document.getElementById('fw-track');
            if (!section) return;

            var restart = function () {
                if (!FW.reducedMotion && FW.total > 1) FW._startAutoRotate();
            };

            /* Pause on hover */
            section.addEventListener('mouseenter', FW._stopAutoRotate);
            section.addEventListener('mouseleave', restart);

            /* Arrow buttons */
            if (prev) prev.addEventListener('click', function () {
                FW._stopAutoRotate();
                FW._goTo((FW.index - 1 + FW.total) % FW.total);
                restart();
            });
            if (next) next.addEventListener('click', function () {
                FW._stopAutoRotate();
                FW._goTo((FW.index + 1) % FW.total);
                restart();
            });

            /* Dot clicks */
            if (dotsEl) dotsEl.addEventListener('click', function (e) {
                var dot = e.target.closest('.fw-dot');
                if (!dot) return;
                FW._stopAutoRotate();
                FW._goTo(parseInt(dot.dataset.index, 10));
                restart();
            });

            /* Keyboard: ArrowLeft / ArrowRight */
            section.addEventListener('keydown', function (e) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    FW._stopAutoRotate();
                    FW._goTo((FW.index - 1 + FW.total) % FW.total);
                    restart();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    FW._stopAutoRotate();
                    FW._goTo((FW.index + 1) % FW.total);
                    restart();
                }
            });

            /* Touch swipe */
            if (track) {
                var txStart = 0;
                track.addEventListener('touchstart', function (e) {
                    txStart = e.touches[0].clientX;
                    FW._stopAutoRotate();
                }, { passive: true });
                track.addEventListener('touchend', function (e) {
                    var diff = txStart - e.changedTouches[0].clientX;
                    if (Math.abs(diff) > 50) {
                        if (diff > 0) FW._goTo((FW.index + 1) % FW.total);
                        else          FW._goTo((FW.index - 1 + FW.total) % FW.total);
                    }
                    restart();
                }, { passive: true });
            }
        },

        /* ─────────────────────────────────────────
           SVG SPEEDOMETER GAUGE
           Center (50,50), radius 35, arc 150°→390°(30°)
           = classic 240° speedometer shape, gap at bottom
        ───────────────────────────────────────── */
        _buildGauge: function (km, kmText) {
            var maxKm   = 200000;
            var ratio   = Math.min(1, Math.max(0, (km || 0) / maxKm));
            var cx = 50, cy = 50, r = 35;
            var startDeg = 150, rangeDeg = 240;
            var toRad = function (d) { return d * Math.PI / 180; };

            /* Track arc endpoints */
            var sx = (cx + r * Math.cos(toRad(startDeg))).toFixed(2);
            var sy = (cy + r * Math.sin(toRad(startDeg))).toFixed(2);
            var ex = (cx + r * Math.cos(toRad(startDeg + rangeDeg))).toFixed(2);
            var ey = (cy + r * Math.sin(toRad(startDeg + rangeDeg))).toFixed(2);

            /* Full track arc (large=1, clockwise=1) */
            var trackPath = 'M' + sx + ',' + sy + ' A' + r + ',' + r + ' 0 1,1 ' + ex + ',' + ey;

            /* Active arc + needle */
            var activeArc   = '';
            var needleAngle = startDeg;

            if (ratio > 0.01) {
                needleAngle = startDeg + ratio * rangeDeg;
                var ax       = (cx + r * Math.cos(toRad(needleAngle))).toFixed(2);
                var ay       = (cy + r * Math.sin(toRad(needleAngle))).toFixed(2);
                var largeArc = (ratio * rangeDeg > 180) ? 1 : 0;
                activeArc =
                    '<path d="M' + sx + ',' + sy +
                    ' A' + r + ',' + r + ' 0 ' + largeArc + ',1 ' + ax + ',' + ay +
                    '" fill="none" stroke="rgba(212,175,55,0.75)" stroke-width="4.5" stroke-linecap="round"/>';
            }

            var nr     = 27;
            var needleX = (cx + nr * Math.cos(toRad(needleAngle))).toFixed(2);
            var needleY = (cy + nr * Math.sin(toRad(needleAngle))).toFixed(2);
            var needleEl =
                '<line x1="' + cx + '" y1="' + cy + '"' +
                ' x2="' + needleX + '" y2="' + needleY + '"' +
                ' stroke="#d4af37" stroke-width="2.5" stroke-linecap="round"/>';

            /* Tick marks (9 ticks @ 30° steps) */
            var ticks = '';
            for (var t = 0; t <= 8; t++) {
                var ta      = toRad(startDeg + t * 30);
                var isMain  = (t % 2 === 0);
                var outerR  = 38;
                var innerR  = isMain ? 31 : 34;
                ticks +=
                    '<line' +
                    ' x1="' + (cx + outerR * Math.cos(ta)).toFixed(1) + '"' +
                    ' y1="' + (cy + outerR * Math.sin(ta)).toFixed(1) + '"' +
                    ' x2="' + (cx + innerR * Math.cos(ta)).toFixed(1) + '"' +
                    ' y2="' + (cy + innerR * Math.sin(ta)).toFixed(1) + '"' +
                    ' stroke="rgba(212,175,55,' + (isMain ? '0.55' : '0.25') + ')"' +
                    ' stroke-width="' + (isMain ? '1.5' : '1') + '"' +
                    ' stroke-linecap="round"/>';
            }

            return (
                '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"' +
                ' width="100%" height="100%" role="img" aria-label="Velocímetro ' + kmText + '">' +

                /* Outer glow ring */
                '<circle cx="50" cy="50" r="46" fill="none"' +
                ' stroke="rgba(212,175,55,0.06)" stroke-width="2"/>' +
                /* Background circle */
                '<circle cx="50" cy="50" r="43" fill="rgba(8,9,14,0.9)"' +
                ' stroke="rgba(212,175,55,0.22)" stroke-width="1.5"/>' +
                /* Inner ring */
                '<circle cx="50" cy="50" r="39" fill="none"' +
                ' stroke="rgba(212,175,55,0.07)" stroke-width="1"/>' +

                /* Track (full range, dim) */
                '<path d="' + trackPath + '" fill="none"' +
                ' stroke="rgba(212,175,55,0.13)" stroke-width="4.5" stroke-linecap="round"/>' +

                ticks + activeArc + needleEl +

                /* Center hub */
                '<circle cx="50" cy="50" r="4" fill="#d4af37"/>' +
                '<circle cx="50" cy="50" r="7" fill="none"' +
                ' stroke="rgba(212,175,55,0.35)" stroke-width="1.5"/>' +

                /* KM text */
                '<text x="50" y="75" text-anchor="middle"' +
                ' fill="rgba(212,175,55,0.9)" font-size="7.5" font-weight="700"' +
                ' font-family="system-ui,sans-serif">' + kmText + '</text>' +
                '<text x="50" y="83.5" text-anchor="middle"' +
                ' fill="rgba(255,255,255,0.3)" font-size="4.8"' +
                ' font-family="system-ui,sans-serif">KILOMETRAJE</text>' +

                '</svg>'
            );
        },

        /* ─────────────────────────────────────────
           BUILD GLASSMORPHISM HUD BADGE
        ───────────────────────────────────────── */
        _buildBadge: function (icon, label, value) {
            return (
                '<div class="fw-hud-badge">' +
                '<div class="fw-hud-badge-icon">' + icon + '</div>' +
                '<span class="fw-hud-badge-label">' + label + '</span>' +
                '<span class="fw-hud-badge-value">' + value + '</span>' +
                '</div>'
            );
        },

        /* ─────────────────────────────────────────
           MONOLINE SVG ICONS (stroke-width 2, linecap round)
        ───────────────────────────────────────── */
        _svg: function (paths, size) {
            return (
                '<svg width="' + (size || 13) + '" height="' + (size || 13) + '"' +
                ' viewBox="0 0 24 24" fill="none" stroke="currentColor"' +
                ' stroke-width="2" stroke-linecap="round" stroke-linejoin="round"' +
                ' aria-hidden="true">' + paths + '</svg>'
            );
        },

        /* Calendar — Year */
        _icoYear: function () {
            return FW._svg(
                '<rect x="3" y="4" width="18" height="18" rx="2"/>' +
                '<line x1="16" y1="2" x2="16" y2="6"/>' +
                '<line x1="8"  y1="2" x2="8"  y2="6"/>' +
                '<line x1="3"  y1="10" x2="21" y2="10"/>'
            );
        },

        /* Gauge needle — KM */
        _icoKm: function () {
            return FW._svg(
                '<path d="M12 5a7 7 0 1 0 7 7"/>' +
                '<path d="M12 12l3.5-3.5"/>' +
                '<circle cx="12" cy="12" r="1.5"/>'
            );
        },

        /* Sun/rays — Transmission */
        _icoTrans: function () {
            return FW._svg(
                '<circle cx="12" cy="12" r="3"/>' +
                '<path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12' +
                'M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>'
            );
        },

        /* Fuel pump — Combustible */
        _icoFuel: function () {
            return FW._svg(
                '<path d="M3 22V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v17"/>' +
                '<line x1="3" y1="22" x2="14" y2="22"/>' +
                '<path d="M14 9h3a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1v5"/>' +
                '<rect x="5" y="7" width="5" height="3" rx="1"/>'
            );
        },

        /* Medium-size versions for HUD badges */
        _icoTransMd: function () { return FW._svg(
            '<circle cx="12" cy="12" r="3"/>' +
            '<path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12' +
            'M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>',
            18);
        },

        _icoFuelMd: function () { return FW._svg(
            '<path d="M3 22V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v17"/>' +
            '<line x1="3" y1="22" x2="14" y2="22"/>' +
            '<path d="M14 9h3a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1v5"/>' +
            '<rect x="5" y="7" width="5" height="3" rx="1"/>',
            18);
        },

        /* Star */
        _icoStar: function () {
            return FW._svg(
                '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02' +
                ' 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
                11
            );
        },

        /* Arrow right */
        _icoArrow: function () {
            return FW._svg('<polyline points="9 18 15 12 9 6"/>', 14);
        },

        /* Pill wrapper */
        _pill: function (icon, text) {
            return '<span class="fw-pill">' + icon + text + '</span>';
        }
    };

    /* ── Expose globally ── */
    window.initFeaturedWeekBanner = FW.init.bind(FW);
    window.FeaturedWeekBanner     = FW;

    /*
     * Backwards-compatibility shim:
     * main.js still calls loadDestacadosBanner() via initializePage()
     * and rerenderVehicleSections(). This alias makes those calls
     * invoke the new banner without touching main.js's call sites.
     * NOTE: main.js's old function definition has been removed.
     */
    window.loadDestacadosBanner = window.initFeaturedWeekBanner;

}());
