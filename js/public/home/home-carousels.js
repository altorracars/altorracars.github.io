/* ============================================================
 * ALTORRA CARS · home-carousels.js — Secciones data-driven del index
 * ------------------------------------------------------------
 * PORT vanilla (ES5-style, IIFE) de los componentes data-driven de
 *   altorra-cars-design-system/project/redesign/Home.jsx:
 *     - CinAvailable  L802-912  → #cinAvailableTrack  (5.1)
 *     - CinCollection L369-457  → #cinCollectionTrack (5.2)
 *     - CinPrograms   L580-787  → #promoTrack         (5.3)
 *     - CinBrands     L339-364  → #cinBrandsTrack     (5.4)
 *     - CinTrail      L926-1027 → #cinTrailBody       (5.5)
 *     - CinCats (counts)        → [data-count-for]    (5.6)
 *
 * Doctrina §17: SOLO transform/opacity animados; rAF en scroll/drag.
 * Doctrina §35: NO MutationObserver global; pointermove SOLO durante
 *               drag activo, removido en pointerup/mouseup.
 * XSS: textContent/createElement para todo texto Firestore.
 *      Única excepción: banner title `*x*`→<em> (texto escapado primero).
 * Lazy modules (comparador): guard typeof en click-time.
 * Readiness: espera vehicleDB.loaded (poll corto + acotado).
 * Re-render: registra vehicleDB.onChange para vehicles/brands/banners.
 *
 * Se registra en window.AltorraHome.carousels para que home.js
 * llame a .init() en DOMContentLoaded. También lo hace solo.
 * ============================================================ */
(function () {
    'use strict';

    if (window.__altorraHomeCarouselsMounted) return;
    window.__altorraHomeCarouselsMounted = true;

    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ============================================================
    // HELPERS
    // ============================================================

    /** Escape HTML entities in a string (XSS safety). */
    function esc(str) {
        if (str == null) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    /**
     * Format price in COP. Falls back to the global formatPrice from render.js if available.
     * Inline version to be safe in case render.js isn't loaded yet.
     */
    function fmtPrice(price) {
        if (typeof window.formatPrice === 'function') return window.formatPrice(price);
        if (!price) return '';
        return new Intl.NumberFormat('es-CO', {
            style: 'currency', currency: 'COP',
            minimumFractionDigits: 0, maximumFractionDigits: 0
        }).format(price);
    }

    /**
     * Format km. Falls back to global formatKm if available.
     */
    function fmtKm(km) {
        if (typeof window.formatKm === 'function') return window.formatKm(km);
        if (km === 0) return 'Nuevo';
        return new Intl.NumberFormat('es-CO').format(km || 0) + ' km';
    }

    /**
     * Build vehicle detail URL. Falls back to global getVehicleDetailUrl.
     */
    function vehicleUrl(v) {
        if (typeof window.getVehicleDetailUrl === 'function') return window.getVehicleDetailUrl(v);
        // Inline slug fallback
        var slug = [v.marca, v.modelo, v.year, v.id]
            .filter(Boolean).join('-').toLowerCase()
            .normalize('NFD').replace(/[̀-ͯ]/g, '')
            .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        return 'vehiculos/' + slug + '.html';
    }

    /**
     * Convert banner title: escape HTML, then replace *word* → <em class="...">word</em>
     * Only `*...*` delimiters produce gold text. Safe because surrounding text is escaped first.
     */
    function processBannerTitle(raw) {
        if (!raw) return '';
        var escaped = esc(raw);
        return escaped.replace(/\*(.*?)\*/g, '<em style="font-family:var(--cin-display);font-style:italic;font-weight:400;background:linear-gradient(180deg,var(--cin-gold),var(--cin-gold-deep));-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent">$1</em>');
    }

    /**
     * Sanitize a Firestore-sourced CSS color value.
     * Allows only characters safe for hex, rgb(), hsl(), var(), named colors.
     * Malformed values (e.g. "red; background: url(...)") are rejected.
     * Returns fallback (default '') so the CSS default takes over silently.
     */
    function safeColor(v, fallback) {
        if (typeof v !== 'string') return fallback || '';
        // Allowlist: hex, parens (rgb/hsl), commas, dots, spaces, alphanumerics, %, /
        return /^[#0-9a-zA-Z(),.\s%/-]+$/.test(v) ? v : (fallback || '');
    }

    /**
     * Relative time label for history.
     */
    function relTime(ts) {
        if (!ts) return 'Reciente';
        var diff = Date.now() - ts;
        var mins = Math.floor(diff / 60000);
        var hrs = Math.floor(diff / 3600000);
        var days = Math.floor(diff / 86400000);
        if (mins < 2)  return 'Hace un momento';
        if (mins < 60) return 'Hace ' + mins + ' min';
        if (hrs < 24)  return 'Hace ' + hrs + ' h';
        if (days === 1) return 'Ayer';
        return 'Hace ' + days + ' días';
    }

    /**
     * Wait for vehicleDB.loaded (poll, max 80 ticks × 100ms = 8s).
     * Resolves immediately if already loaded.
     */
    function whenDbReady(cb) {
        if (window.vehicleDB && window.vehicleDB.loaded) { cb(); return; }
        var tries = 0;
        var iv = setInterval(function () {
            tries++;
            if ((window.vehicleDB && window.vehicleDB.loaded) || tries > 80) {
                clearInterval(iv);
                cb();
            }
        }, 100);
    }

    // ============================================================
    // 5.1 · DISPONIBLES (CinAvailable)
    //      getAllVehicles() filtered to estado=disponible, ranked.
    //      Arrow buttons scroll-snap the track.
    // ============================================================
    function initAvailable() {
        var track = document.getElementById('cinAvailableTrack');
        if (!track) return;

        // Arrow buttons live in the parent .cin-av-track-wrap
        var wrap = track.parentElement;
        var btnPrev = wrap ? wrap.querySelector('.cin-nav--prev') : null;
        var btnNext = wrap ? wrap.querySelector('.cin-nav--next') : null;

        // Update prev/next disabled state based on scroll position
        function updateArrows() {
            if (!btnPrev || !btnNext) return;
            btnPrev.disabled = track.scrollLeft < 8;
            btnNext.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 8;
        }

        // Nudge by one card width (port of JSX L823-828)
        function nudge(dir) {
            var card = track.querySelector('.cin-av-card');
            var step = card ? card.getBoundingClientRect().width + 18 : 340;
            track.scrollBy({ left: dir * step, behavior: 'smooth' });
        }

        if (btnPrev) btnPrev.addEventListener('click', function () { nudge(-1); });
        if (btnNext) btnNext.addEventListener('click', function () { nudge(1); });
        track.addEventListener('scroll', updateArrows, { passive: true });
        window.addEventListener('resize', updateArrows); // intentional: this is a static single-page app; listener lives for the page lifetime.

        // Event delegation for favorite and compare at click time
        track.addEventListener('click', function (e) {
            // Favorite button
            var favBtn = e.target.closest('.cin-av-fav[data-id]');
            if (favBtn) {
                e.preventDefault();
                e.stopPropagation();
                var id = favBtn.getAttribute('data-id');
                if (window.favoritesManager && typeof window.favoritesManager.handleHeartClick === 'function') {
                    window.favoritesManager.handleHeartClick(favBtn, id);
                    // Sync is-on class
                    var isOn = window.favoritesManager.has(id);
                    favBtn.classList.toggle('is-on', isOn);
                    var svg = favBtn.querySelector('svg');
                    if (svg) svg.setAttribute('fill', isOn ? 'currentColor' : 'none');
                }
                return;
            }
            // Compare button
            var cmpBtn = e.target.closest('.cin-av-compare[data-compare]');
            if (cmpBtn) {
                e.preventDefault();
                e.stopPropagation();
                var cid = cmpBtn.getAttribute('data-compare');
                if (window.vehicleComparator && typeof window.vehicleComparator.toggle === 'function') {
                    window.vehicleComparator.toggle(cid);
                }
            }
        });

        function renderAvailable() {
            if (!window.vehicleDB || !window.vehicleDB.loaded) return;

            // Use ranked vehicles (prioridad→destacado→oferta→year) filtered to disponible
            var vehicles;
            if (typeof window.vehicleDB.getRankedVehicles === 'function') {
                vehicles = window.vehicleDB.getRankedVehicles();
                // getRankedVehicles already filters to disponible
            } else {
                vehicles = (window.vehicleDB.getAllVehicles() || []).filter(function (v) {
                    return v.estado === 'disponible' || !v.estado;
                });
            }

            if (!vehicles || !vehicles.length) {
                track.innerHTML = '';
                updateArrows();
                return;
            }

            // Build fragment
            var frag = document.createDocumentFragment();
            for (var i = 0; i < vehicles.length; i++) {
                var v = vehicles[i];
                frag.appendChild(buildAvCard(v));
            }
            track.innerHTML = '';
            track.appendChild(frag);
            updateArrows();
        }

        whenDbReady(function () {
            renderAvailable();
            // Re-render on real-time vehicle change
            if (window.vehicleDB && typeof window.vehicleDB.onChange === 'function') {
                window.vehicleDB.onChange(function (changeType) {
                    if (changeType === 'vehicles') renderAvailable();
                });
            }
        });
    }

    /**
     * Build a single .cin-av-card element (port of JSX L864-906).
     */
    function buildAvCard(v) {
        var url = vehicleUrl(v);
        var hasOffer = !!(v.precioOferta && v.precioOferta < v.precio) || !!(v.oferta && v.precioOferta);
        var isUsed   = v.tipo !== 'nuevo';

        // Determine initial favorite state at render time (sync)
        var isFav = false;
        if (window.favoritesManager && typeof window.favoritesManager.has === 'function') {
            isFav = window.favoritesManager.has(String(v.id));
        }

        var a = document.createElement('a');
        a.className = 'cin-av-card';
        a.href = url;

        // Glow sweep
        var glow = document.createElement('span');
        glow.className = 'cin-av-glow';
        glow.setAttribute('aria-hidden', 'true');
        a.appendChild(glow);

        // Corner decorations
        var corners = ['tl', 'tr', 'bl', 'br'];
        for (var c = 0; c < corners.length; c++) {
            var corner = document.createElement('span');
            corner.className = 'cin-av-corner cin-av-corner--' + corners[c];
            a.appendChild(corner);
        }

        // Image area
        var imgDiv = document.createElement('div');
        imgDiv.className = 'cin-av-img';
        if (v.imagen) {
            imgDiv.style.backgroundImage = 'url(' + esc(v.imagen) + ')';
        }

        // Chips
        var chips = document.createElement('div');
        chips.className = 'cin-av-chips';
        if (hasOffer) {
            var chipO = document.createElement('span');
            chipO.className = 'cin-av-chip cin-av-chip--offer';
            chipO.textContent = 'OFERTA';
            chips.appendChild(chipO);
        }
        if (isUsed) {
            var chipU = document.createElement('span');
            chipU.className = 'cin-av-chip cin-av-chip--used';
            chipU.textContent = 'USADO';
            chips.appendChild(chipU);
        }
        imgDiv.appendChild(chips);

        // Fav button
        var favBtn = document.createElement('button');
        favBtn.type = 'button';
        favBtn.className = 'cin-av-fav' + (isFav ? ' is-on' : '');
        favBtn.setAttribute('data-id', String(v.id));
        favBtn.setAttribute('aria-label', 'Favorito');
        favBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="' + (isFav ? 'currentColor' : 'none') + '" stroke="currentColor" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/></svg>';
        imgDiv.appendChild(favBtn);

        // Compare button
        var cmpBtn = document.createElement('span');
        cmpBtn.className = 'cin-av-compare';
        cmpBtn.setAttribute('data-compare', String(v.id));
        cmpBtn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>';
        var cmpTxt = document.createTextNode(' COMPARAR');
        cmpBtn.appendChild(cmpTxt);
        imgDiv.appendChild(cmpBtn);

        a.appendChild(imgDiv);

        // Body
        var body = document.createElement('div');
        body.className = 'cin-av-body';

        var title = document.createElement('h3');
        title.className = 'cin-av-title';
        var titleMarca = document.createTextNode((v.marca || '') + ' ');
        var titleModelo = document.createElement('strong');
        titleModelo.textContent = v.modelo || '';
        var titleYear = document.createElement('span');
        titleYear.textContent = ' ' + (v.year || '');
        title.appendChild(titleMarca);
        title.appendChild(titleModelo);
        title.appendChild(titleYear);
        body.appendChild(title);

        var specs = document.createElement('div');
        specs.className = 'cin-av-specs';
        var specItems = [];
        if (v.transmision) specItems.push(v.transmision);
        if (typeof v.kilometraje !== 'undefined') specItems.push(fmtKm(v.kilometraje));
        if (v.motor) specItems.push(v.motor);
        for (var s = 0; s < specItems.length; s++) {
            if (s > 0) {
                var sep = document.createElement('i');
                sep.textContent = '·';
                specs.appendChild(sep);
            }
            var sp = document.createElement('span');
            sp.textContent = specItems[s];
            specs.appendChild(sp);
        }
        body.appendChild(specs);

        var rule = document.createElement('div');
        rule.className = 'cin-av-rule';
        body.appendChild(rule);

        var priceWrap = document.createElement('div');
        priceWrap.className = 'cin-av-price';
        if (hasOffer && v.precioOferta) {
            var wasEl = document.createElement('span');
            wasEl.className = 'cin-av-was';
            wasEl.textContent = fmtPrice(v.precio);
            priceWrap.appendChild(wasEl);
            var nowEl = document.createElement('span');
            nowEl.className = 'cin-av-now';
            nowEl.textContent = fmtPrice(v.precioOferta);
            priceWrap.appendChild(nowEl);
        } else {
            var priceEl = document.createElement('span');
            priceEl.className = 'cin-av-now';
            priceEl.textContent = fmtPrice(v.precio);
            priceWrap.appendChild(priceEl);
        }
        body.appendChild(priceWrap);

        a.appendChild(body);
        return a;
    }

    // ============================================================
    // 5.2 · LA COLECCIÓN (CinCollection)
    //      vehicleDB.getFeatured() → .cin-card with featuredTag.
    //      Drag-to-scroll (port JSX L374-398). Arrow buttons.
    // ============================================================
    function initCollection() {
        var track = document.getElementById('cinCollectionTrack');
        if (!track) return;

        var wrap = track.closest('.cin-track-wrap');
        var btnPrev = wrap ? wrap.querySelector('.cin-nav--prev') : null;
        var btnNext = wrap ? wrap.querySelector('.cin-nav--next') : null;

        function updateArrows() {
            if (!btnPrev || !btnNext) return;
            btnPrev.disabled = track.scrollLeft < 8;
            btnNext.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 8;
        }

        function nudge(dir) {
            var card = track.querySelector('.cin-card');
            var step = card ? card.getBoundingClientRect().width + 24 : 360;
            track.scrollBy({ left: dir * step, behavior: 'smooth' });
        }

        if (btnPrev) btnPrev.addEventListener('click', function () { nudge(-1); });
        if (btnNext) btnNext.addEventListener('click', function () { nudge(1); });
        track.addEventListener('scroll', updateArrows, { passive: true });
        window.addEventListener('resize', updateArrows); // intentional: this is a static single-page app; listener lives for the page lifetime.

        // Drag-to-scroll (§35: mousemove on window, added on drag-start, removed on drag-end)
        var _colStartX = 0, _colStartSL = 0;
        var _colMouseMove = null, _colMouseUp = null;
        track.addEventListener('mousedown', function (e) {
            _colStartX = e.pageX;
            _colStartSL = track.scrollLeft;
            track.style.scrollSnapType = 'none';
            _colMouseMove = function (ev) {
                track.scrollLeft = _colStartSL - (ev.pageX - _colStartX);
            };
            _colMouseUp = function () {
                track.style.scrollSnapType = '';
                window.removeEventListener('mousemove', _colMouseMove);
                window.removeEventListener('mouseup', _colMouseUp);
                _colMouseMove = null;
                _colMouseUp = null;
            };
            window.addEventListener('mousemove', _colMouseMove);
            window.addEventListener('mouseup', _colMouseUp);
        });

        function renderCollection() {
            if (!window.vehicleDB || !window.vehicleDB.loaded) return;
            var featured = window.vehicleDB.getFeatured ? window.vehicleDB.getFeatured() : [];
            if (!featured || !featured.length) {
                track.innerHTML = '';
                updateArrows();
                return;
            }
            var frag = document.createDocumentFragment();
            for (var i = 0; i < featured.length; i++) {
                frag.appendChild(buildCollCard(featured[i]));
            }
            track.innerHTML = '';
            track.appendChild(frag);
            updateArrows();
        }

        whenDbReady(function () {
            renderCollection();
            if (window.vehicleDB && typeof window.vehicleDB.onChange === 'function') {
                window.vehicleDB.onChange(function (changeType) {
                    if (changeType === 'vehicles') renderCollection();
                });
            }
        });
    }

    /**
     * Build a .cin-card element (port of JSX L430-452, La Colección).
     */
    function buildCollCard(v) {
        var url = vehicleUrl(v);

        // Find brand logo from vehicleDB.brands if available
        var brandLogo = '';
        if (window.vehicleDB && window.vehicleDB.getAllBrands) {
            var brands = window.vehicleDB.getAllBrands() || [];
            for (var b = 0; b < brands.length; b++) {
                if (brands[b].id === v.marca) { brandLogo = brands[b].logo || ''; break; }
            }
        }
        if (!brandLogo && v.marca) {
            brandLogo = 'multimedia/Logos/' + v.marca + '.webp';
        }

        var a = document.createElement('a');
        a.className = 'cin-card';
        a.href = url;
        a.setAttribute('aria-label', (v.marca || '') + ' ' + (v.modelo || ''));

        // Media (background image)
        var media = document.createElement('div');
        media.className = 'cin-card-media';
        if (v.imagen) {
            media.style.backgroundImage = 'url(' + esc(v.imagen) + ')';
        }
        a.appendChild(media);

        // Brand mark (logo)
        var mark = document.createElement('div');
        mark.className = 'cin-card-brand-mark';
        var markImg = document.createElement('img');
        markImg.src = brandLogo;
        markImg.alt = v.marca || '';
        markImg.loading = 'lazy';
        markImg.decoding = 'async';
        mark.appendChild(markImg);
        a.appendChild(mark);

        // Info overlay
        var info = document.createElement('div');
        info.className = 'cin-card-info';

        // Tag (featuredTag SP-2 or fallback)
        if (v.featuredTag || v.destacado) {
            var tagEl = document.createElement('span');
            tagEl.className = 'cin-card-tag';
            tagEl.textContent = v.featuredTag || 'Destacado';
            info.appendChild(tagEl);
        }

        // Brand + variant/model
        var brandLine = document.createElement('div');
        brandLine.className = 'cin-card-brand';
        var brandText = v.marca || '';
        if (v.motor) brandText += ' · ' + v.motor;
        brandLine.textContent = brandText;
        info.appendChild(brandLine);

        var modelLine = document.createElement('div');
        modelLine.className = 'cin-card-model';
        modelLine.textContent = v.modelo || '';
        info.appendChild(modelLine);

        // Footer: year/km + price + arrow
        var foot = document.createElement('div');
        foot.className = 'cin-card-foot';

        var footLeft = document.createElement('span');
        var footParts = [];
        if (v.year) footParts.push(String(v.year));
        if (typeof v.kilometraje !== 'undefined') footParts.push(fmtKm(v.kilometraje));
        footLeft.textContent = footParts.join(' · ');
        foot.appendChild(footLeft);

        var footRight = document.createElement('span');
        footRight.style.display = 'flex';
        footRight.style.alignItems = 'center';
        footRight.style.gap = '12px';

        var priceEl = document.createElement('strong');
        priceEl.textContent = fmtPrice(v.precio);
        footRight.appendChild(priceEl);

        var arrow = document.createElement('span');
        arrow.className = 'cin-card-arrow';
        arrow.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>';
        footRight.appendChild(arrow);

        foot.appendChild(footRight);
        info.appendChild(foot);

        a.appendChild(info);
        return a;
    }

    // ============================================================
    // 5.3 · PROMOS (CinPrograms)
    //      Query banners position=home_promo, active=true, by order.
    //      Infinite-loop carousel + swipe/drag (port JSX L580-787).
    //      If no banners → hide #promoSection.
    // ============================================================

    // State for the promo carousel
    var _promoState = null;
    // Teardown function for the current carousel build. Calling it removes all
    // listeners registered by the previous buildPromoCarousel call so they do
    // not accumulate when onChange fires and rebuilds the carousel.
    var _promoTeardown = null;

    function initPromos() {
        var section = document.getElementById('promoSection');
        var track = document.getElementById('promoTrack');
        if (!section || !track) return;

        // Start hidden — reveal once we have banners
        section.hidden = true;

        // Load banners from Firestore (position=home_promo)
        loadBannersForPromo(function (banners) {
            if (!banners || !banners.length) {
                // No banners — keep hidden
                return;
            }
            section.hidden = false;
            buildPromoCarousel(section, track, banners);
        });

        // Also re-render on real-time banner changes
        if (window.vehicleDB && typeof window.vehicleDB.onChange === 'function') {
            window.vehicleDB.onChange(function (changeType) {
                if (changeType !== 'banners') return;
                // _latestBanners may have a different position set; reload from Firestore
                loadBannersForPromo(function (banners) {
                    if (!banners || !banners.length) {
                        section.hidden = true;
                        return;
                    }
                    section.hidden = false;
                    // Destroy old state — teardown removes all listeners from the
                    // previous build before we attach new ones (Fix 1).
                    if (_promoTeardown) { _promoTeardown(); _promoTeardown = null; }
                    if (_promoState) { _promoState.destroyed = true; _promoState = null; }
                    buildPromoCarousel(section, track, banners);
                });
            });
        }
    }

    /**
     * Async-load banners from Firestore with position=home_promo.
     * Falls back to vehicleDB.getActiveBanners if available.
     */
    function loadBannersForPromo(cb) {
        // Use vehicleDB helper if it exists (added below to database.js)
        if (window.vehicleDB && typeof window.vehicleDB.getActiveBanners === 'function') {
            var result = window.vehicleDB.getActiveBanners('home_promo');
            if (result && typeof result.then === 'function') {
                result.then(cb).catch(function () { cb([]); });
            } else {
                cb(result || []);
            }
            return;
        }
        // Direct Firestore query
        if (window.db) {
            window.db.collection('banners')
                .where('active', '==', true)
                .where('position', '==', 'home_promo')
                .orderBy('order', 'asc')
                .get()
                .then(function (snap) {
                    var banners = [];
                    snap.forEach(function (doc) { banners.push(doc.data()); });
                    cb(banners);
                })
                .catch(function () { cb([]); });
        } else {
            // No db yet — poll for it briefly
            var tries = 0;
            var iv = setInterval(function () {
                tries++;
                if (window.db || tries > 50) {
                    clearInterval(iv);
                    if (window.db) {
                        loadBannersForPromo(cb);
                    } else {
                        cb([]);
                    }
                }
            }, 100);
        }
    }

    /**
     * Build the promo infinite-loop carousel.
     * Port of CinPrograms JSX L580-787.
     * State machine: extIdx 1..total, clones at 0 and total+1.
     *
     * Fix 1: every listener is registered as a named function reference and
     * catalogued in a teardown list so that a banner onChange rebuild can
     * removeEventListener each one before adding the new generation.
     * Fix 2: old .promo-progress and arrow button click listeners are removed
     * before new ones are added, preventing accumulation across rebuilds.
     */
    function buildPromoCarousel(section, track, banners) {
        var total = banners.length;
        if (total === 0) return;

        // --- Teardown any previous build first (Fix 1) ---
        if (_promoTeardown) { _promoTeardown(); _promoTeardown = null; }
        if (_promoState) { _promoState.destroyed = true; _promoState = null; }

        // Build extended list: [last, ...banners, first]
        var extended = [banners[total - 1]].concat(banners).concat([banners[0]]);
        var extIdx = 1;
        var withTransition = true;
        var paused = false;
        var dragging = false;
        var autoTimer = null;
        var DUR = 7000; // ms — matches the promoPipFill CSS animation duration so the bar finishes exactly when the slide advances.

        var state = { destroyed: false };
        _promoState = state;

        // Build slide elements
        track.innerHTML = '';
        var slideEls = [];
        for (var i = 0; i < extended.length; i++) {
            slideEls.push(buildPromoSlide(extended[i]));
        }
        for (var j = 0; j < slideEls.length; j++) {
            track.appendChild(slideEls[j]);
        }

        // Pip progress bar elements
        // Fix 2: remove any existing .promo-progress from a prior build before
        // appending a new one to avoid stacked bars with live pip-click listeners.
        var stage = track.parentElement; // .promo-stage
        var oldProgress = stage.querySelector('.promo-progress');
        if (oldProgress) oldProgress.remove();

        var progressEl = document.createElement('div');
        progressEl.className = 'promo-progress';
        var pipEls = [];
        for (var p = 0; p < total; p++) {
            var pip = document.createElement('button');
            pip.type = 'button';
            pip.className = 'promo-pip';
            pip.setAttribute('aria-label', 'Slide ' + (p + 1));
            var pipSpan = document.createElement('span');
            pip.appendChild(pipSpan);
            pipEls.push(pip);
            progressEl.appendChild(pip);
            (function (idx) {
                pip.addEventListener('click', function () { goto(idx + 1); });
            })(p);
        }
        stage.appendChild(progressEl);

        // Arrow buttons
        // Fix 2: replace each arrow with a fresh clone to discard any click
        // listeners from the previous build before binding new ones.
        var btnPrevOld = stage.querySelector('.promo-arrow--prev');
        var btnNextOld = stage.querySelector('.promo-arrow--next');
        var btnPrev = btnPrevOld ? btnPrevOld.cloneNode(true) : null;
        var btnNext = btnNextOld ? btnNextOld.cloneNode(true) : null;
        if (btnPrevOld && btnPrev) btnPrevOld.replaceWith(btnPrev);
        if (btnNextOld && btnNext) btnNextOld.replaceWith(btnNext);

        // Named arrow handlers so teardown can remove them precisely.
        var _arrowPrevClick = function () { goto(extIdx - 1); };
        var _arrowNextClick = function () { goto(extIdx + 1); };
        if (btnPrev) btnPrev.addEventListener('click', _arrowPrevClick);
        if (btnNext) btnNext.addEventListener('click', _arrowNextClick);

        function applyTransform(withTrans) {
            if (state.destroyed) return;
            track.style.transition = withTrans ? 'transform 720ms cubic-bezier(0.22, 1, 0.36, 1)' : 'none';
            track.style.transform = 'translate3d(-' + (extIdx * 100) + '%, 0, 0)';
        }

        function updatePips() {
            var realIdx = extIdx - 1; // 0-based real slide index
            for (var k = 0; k < pipEls.length; k++) {
                pipEls[k].classList.remove('is-on', 'is-past');
                if (k < realIdx) {
                    pipEls[k].classList.add('is-past');
                } else if (k === realIdx) {
                    pipEls[k].classList.add('is-on');
                    pipEls[k].style.setProperty('--dur', DUR + 'ms');
                    // Restart animation by re-appending the child
                    var span = pipEls[k].querySelector('span');
                    if (span && !reducedMotion) {
                        span.style.animation = 'none';
                        // Force reflow
                        span.offsetWidth; // eslint-disable-line no-unused-expressions
                        span.style.animation = 'promoPipFill ' + DUR + 'ms linear forwards';
                    }
                }
            }
        }

        function goto(next) {
            if (state.destroyed) return;
            if (extIdx === 0 || extIdx === total + 1) return; // teleporting
            if (next < 0) next = 0;
            if (next > total + 1) next = total + 1;
            extIdx = next;
            withTransition = true;
            applyTransform(true);
            scheduleAuto();
            updatePips();
        }

        function teleportIfClone() {
            if (state.destroyed) return;
            if (extIdx === 0) {
                track.style.transition = 'none';
                extIdx = total;
                track.style.transform = 'translate3d(-' + (extIdx * 100) + '%, 0, 0)';
                // Re-enable transition after next frame
                setTimeout(function () {
                    if (!state.destroyed) track.style.transition = '';
                }, 50);
                updatePips();
            } else if (extIdx === total + 1) {
                track.style.transition = 'none';
                extIdx = 1;
                track.style.transform = 'translate3d(-' + (extIdx * 100) + '%, 0, 0)';
                setTimeout(function () {
                    if (!state.destroyed) track.style.transition = '';
                }, 50);
                updatePips();
            }
        }

        // Named listener — stored so teardown can remove it (Fix 1).
        var _trackTransitionEnd = function (e) {
            if (e.propertyName !== 'transform') return;
            teleportIfClone();
        };
        track.addEventListener('transitionend', _trackTransitionEnd);

        function scheduleAuto() {
            if (state.destroyed || reducedMotion) return;
            clearTimeout(autoTimer);
            autoTimer = setTimeout(function () {
                if (!state.destroyed && !paused && !dragging) {
                    goto(extIdx + 1);
                }
            }, DUR);
        }

        // Pause on hover — named handlers for teardown (Fix 1).
        var _sectionMouseEnter = function () { paused = true; clearTimeout(autoTimer); };
        var _sectionMouseLeave = function () { paused = false; scheduleAuto(); };
        section.addEventListener('mouseenter', _sectionMouseEnter);
        section.addEventListener('mouseleave', _sectionMouseLeave);

        // Visibility change — reset to sane index (port JSX L602-613).
        // Named handler stored so teardown can remove it (Fix 1).
        // Only ONE handler per carousel build; previous build's handler is removed
        // by teardown before this one is added.
        var _visibilityChange = function () {
            if (state.destroyed || document.hidden) return;
            if (extIdx === 0 || extIdx === total + 1 || extIdx < 0 || extIdx > total + 1) {
                track.style.transition = 'none';
                extIdx = 1;
                track.style.transform = 'translate3d(-100%, 0, 0)';
                setTimeout(function () {
                    if (!state.destroyed) { track.style.transition = ''; scheduleAuto(); }
                }, 50);
                updatePips();
            }
        };
        document.addEventListener('visibilitychange', _visibilityChange);

        // Swipe/drag (port JSX L646-703, doctrina §35: mousemove on window, removed on mouseup)
        var swipeStartX = 0, swipeStartY = 0, swipeDeltaX = 0;
        var THRESHOLD = 140; // px — minimum swipe distance to commit a slide change (~half a card width).

        function swipeStart(x, y) {
            dragging = true;
            swipeStartX = x; swipeStartY = y; swipeDeltaX = 0;
            paused = true;
            track.style.transition = 'none';
        }
        function swipeMove(x, y) {
            if (!dragging) return;
            swipeDeltaX = x - swipeStartX;
            var dy = Math.abs(y - swipeStartY);
            if (dy > Math.abs(swipeDeltaX) && dy > 20) {
                // Vertical scroll — abort drag
                dragging = false;
                track.style.transition = '';
                return;
            }
            track.style.transform = 'translate3d(calc(' + (-extIdx * 100) + '% + ' + swipeDeltaX + 'px), 0, 0)';
        }
        function swipeEnd() {
            if (!dragging) return;
            dragging = false;
            if (Math.abs(swipeDeltaX) > THRESHOLD) {
                track.style.transition = '';
                track.style.transform = '';
                goto(extIdx + (swipeDeltaX < 0 ? 1 : -1));
            } else {
                // Snap back
                track.style.transition = 'transform 360ms cubic-bezier(0.22, 1, 0.36, 1)';
                track.style.transform = 'translate3d(-' + (extIdx * 100) + '%, 0, 0)';
                setTimeout(function () {
                    if (!state.destroyed) { track.style.transition = ''; track.style.transform = ''; }
                }, 380);
            }
            swipeDeltaX = 0;
            setTimeout(function () { paused = false; scheduleAuto(); }, 600);
        }

        // Named touch handlers for teardown (Fix 1).
        var _trackTouchStart = function (e) {
            swipeStart(e.touches[0].clientX, e.touches[0].clientY);
        };
        var _trackTouchMove = function (e) {
            swipeMove(e.touches[0].clientX, e.touches[0].clientY);
        };
        track.addEventListener('touchstart', _trackTouchStart, { passive: true });
        track.addEventListener('touchmove',  _trackTouchMove,  { passive: true });
        track.addEventListener('touchend',   swipeEnd);

        // Mouse drag (§35: mousemove on window, removed on mouseup via capture).
        // Named mousedown handler for teardown (Fix 1).
        var _winMouseMove = null;
        var _winMouseUp = null;
        var _trackMouseDown = function (e) {
            e.preventDefault();
            swipeStart(e.clientX, e.clientY);
            _winMouseMove = function (ev) { swipeMove(ev.clientX, ev.clientY); };
            _winMouseUp = function () {
                swipeEnd();
                window.removeEventListener('mousemove', _winMouseMove);
                window.removeEventListener('mouseup', _winMouseUp);
                _winMouseMove = null;
                _winMouseUp = null;
            };
            window.addEventListener('mousemove', _winMouseMove);
            window.addEventListener('mouseup', _winMouseUp);
        };
        track.addEventListener('mousedown', _trackMouseDown);

        // CTA button delegation — named for teardown (Fix 1).
        var _stageClick = function (e) {
            var ctaBtn = e.target.closest('.promo-cta[data-action]');
            if (!ctaBtn) return;
            var action = ctaBtn.getAttribute('data-action') || '';
            if (action.startsWith('/')) {
                window.location.href = action.slice(1);
            } else if (action.startsWith('http')) {
                window.location.href = action;
            } else if (window.AltorraModals && typeof window.AltorraModals.open === 'function') {
                window.AltorraModals.open(action);
            }
        };
        stage.addEventListener('click', _stageClick);

        // Register teardown: removes every listener added by this build (Fix 1).
        // Called at the top of the next buildPromoCarousel invocation so the old
        // generation is fully detached before the new one attaches.
        _promoTeardown = function () {
            clearTimeout(autoTimer);
            state.destroyed = true;
            // Clean up any in-progress window drag listeners
            if (_winMouseMove) { window.removeEventListener('mousemove', _winMouseMove); _winMouseMove = null; }
            if (_winMouseUp)   { window.removeEventListener('mouseup',   _winMouseUp);   _winMouseUp   = null; }
            // document listener (the only one that accumulates unboundedly)
            document.removeEventListener('visibilitychange', _visibilityChange);
            // section listeners
            section.removeEventListener('mouseenter', _sectionMouseEnter);
            section.removeEventListener('mouseleave', _sectionMouseLeave);
            // track listeners
            track.removeEventListener('transitionend', _trackTransitionEnd);
            track.removeEventListener('touchstart',   _trackTouchStart);
            track.removeEventListener('touchmove',    _trackTouchMove);
            track.removeEventListener('touchend',     swipeEnd);
            track.removeEventListener('mousedown',    _trackMouseDown);
            // stage click delegation
            stage.removeEventListener('click', _stageClick);
            // arrow buttons (if they still exist in DOM)
            if (btnPrev) btnPrev.removeEventListener('click', _arrowPrevClick);
            if (btnNext) btnNext.removeEventListener('click', _arrowNextClick);
        };

        // Init: set position and start auto-rotate
        applyTransform(false);
        updatePips();
        scheduleAuto();
    }

    /**
     * Build a single .promo-slide element (port JSX L736-774, all fields).
     * XSS-safe: textContent everywhere; banner title *x* → em (escaped first).
     */
    function buildPromoSlide(b) {
        var article = document.createElement('article');
        article.className = 'promo-slide';
        // CSS custom properties for accent colors (sanitized to prevent CSS injection)
        var _accent  = safeColor(b.accent);
        var _accent2 = safeColor(b.accent2);
        if (_accent)  article.style.setProperty('--accent',  _accent);
        if (_accent2) article.style.setProperty('--accent2', _accent2);

        // Background
        var bg = document.createElement('div');
        bg.className = 'promo-bg';
        if (b.image) bg.style.backgroundImage = 'url(' + esc(b.image) + ')';
        bg.setAttribute('aria-hidden', 'true');
        article.appendChild(bg);

        // Vignette
        var vignette = document.createElement('div');
        vignette.className = 'promo-vignette';
        var accentColor = safeColor(b.accent, '#D4A85A');
        vignette.style.background = 'linear-gradient(110deg, rgba(8,7,10,0.95) 0%, rgba(8,7,10,0.75) 35%, rgba(8,7,10,0.45) 70%, rgba(8,7,10,0.85) 100%), radial-gradient(60% 50% at 80% 50%, ' + accentColor + '22, transparent 60%)';
        vignette.setAttribute('aria-hidden', 'true');
        article.appendChild(vignette);

        // Grain
        var grain = document.createElement('div');
        grain.className = 'promo-grain';
        grain.setAttribute('aria-hidden', 'true');
        article.appendChild(grain);

        // Content
        var content = document.createElement('div');
        content.className = 'promo-content';

        var contentL = document.createElement('div');
        contentL.className = 'promo-content-l';

        // Tag / badge chip
        if (b.badge) {
            var tagEl = document.createElement('span');
            tagEl.className = 'promo-tag';
            var tagColor = safeColor(b.tagColor, accentColor);
            tagEl.style.color = tagColor;
            tagEl.style.background = tagColor + '1a';
            tagEl.style.borderColor = tagColor + '66';
            var tagDot = document.createElement('span');
            tagDot.className = 'promo-tag-icon';
            tagDot.setAttribute('aria-hidden', 'true');
            // Simple star SVG as default icon
            tagDot.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
            tagEl.appendChild(tagDot);
            tagEl.appendChild(document.createTextNode(b.badge));
            contentL.appendChild(tagEl);
        }

        // Eyebrow
        if (b.eyebrow) {
            var eyebrow = document.createElement('span');
            eyebrow.className = 'promo-eyebrow';
            eyebrow.textContent = b.eyebrow;
            contentL.appendChild(eyebrow);
        }

        // Title (rich: *x* → em gold, rest escaped)
        var titleEl = document.createElement('h3');
        titleEl.className = 'promo-title';
        if (b.title) {
            titleEl.innerHTML = processBannerTitle(b.title);
        }
        contentL.appendChild(titleEl);

        // Subtitle
        if (b.subtitle) {
            var sub = document.createElement('p');
            sub.className = 'promo-sub';
            sub.textContent = b.subtitle;
            contentL.appendChild(sub);
        }

        // Pills
        var pills = b.pills || b.badges || [];
        if (pills.length) {
            var ul = document.createElement('ul');
            ul.className = 'promo-badges';
            for (var pi = 0; pi < pills.length; pi++) {
                var li = document.createElement('li');
                li.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
                li.appendChild(document.createTextNode(pills[pi]));
                ul.appendChild(li);
            }
            contentL.appendChild(ul);
        }

        // CTA button
        var ctaLabel = (b.cta && b.cta.label) ? b.cta.label : (b.cta || null);
        var ctaAction = (b.cta && b.cta.action) ? b.cta.action : (b.link || '');
        var ctaArrowSvg = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg><span class="promo-cta-shine" aria-hidden="true"></span>';
        if (ctaLabel) {
            var ctaBtn = document.createElement('button');
            ctaBtn.type = 'button';
            ctaBtn.className = 'promo-cta';
            if (ctaAction) ctaBtn.setAttribute('data-action', ctaAction);
            // Set innerHTML with escaped label + static SVG (ctaLabel is admin text, escape it)
            ctaBtn.innerHTML = esc(ctaLabel) + ' ' + ctaArrowSvg;
            contentL.appendChild(ctaBtn);
        } else if (b.link) {
            // Fallback: link as anchor
            var ctaA = document.createElement('a');
            ctaA.className = 'promo-cta';
            ctaA.href = b.link; // b.link is a URL — assign to .href (browser sanitizes)
            ctaA.innerHTML = 'Ver más ' + ctaArrowSvg;
            contentL.appendChild(ctaA);
        }

        content.appendChild(contentL);
        article.appendChild(content);

        // Metric chip (rate chip: rateValue/rateLabel)
        var rateValue = b.rateValue;
        var rateLabel = b.rateLabel;
        if (rateValue || rateLabel) {
            var metric = document.createElement('div');
            metric.className = 'promo-metric';
            if (rateLabel) {
                var mLabel = document.createElement('span');
                mLabel.className = 'promo-metric-label';
                mLabel.textContent = rateLabel;
                metric.appendChild(mLabel);
            }
            if (rateValue) {
                var mValue = document.createElement('span');
                mValue.className = 'promo-metric-value';
                mValue.textContent = rateValue;
                metric.appendChild(mValue);
            }
            article.appendChild(metric);
        }

        return article;
    }

    // ============================================================
    // 5.4 · MARCAS (CinBrands)
    //      vehicleDB.getAllBrands() → marquee (duplicate for seamless loop).
    //      Update headline with real brand count.
    // ============================================================
    function initBrands() {
        var track = document.getElementById('cinBrandsTrack');
        if (!track) return;

        function renderBrands() {
            if (!window.vehicleDB || !window.vehicleDB.loaded) return;
            var brands = window.vehicleDB.getAllBrands ? window.vehicleDB.getAllBrands() : [];
            if (!brands || !brands.length) return;

            // Update the brands count in the headline
            var section = track.closest('.cin-brands');
            if (section) {
                var heading = section.querySelector('.cin-brands-h');
                if (heading) {
                    // Replace the text node before <em> with the real count.
                    // Guard nodeType to avoid silently wiping the <em> if the
                    // first child is not a text node (e.g. after a markup edit).
                    var first = heading.firstChild;
                    if (first && first.nodeType === 3) { // Node.TEXT_NODE
                        first.textContent = brands.length + ' marcas. ';
                    }
                    // else: skip — better than wiping the <em>; index.html owns the structure.
                }
            }

            // Build duplicated set for seamless marquee (JSX L340: [...BRANDS, ...BRANDS])
            var frag = document.createDocumentFragment();
            var all = brands.concat(brands); // duplicate
            for (var i = 0; i < all.length; i++) {
                var brand = all[i];
                var a = document.createElement('a');
                a.className = 'cin-brand';
                a.href = '/marcas/' + encodeURIComponent(brand.id || '') + '.html';
                a.setAttribute('aria-label', brand.nombre || brand.id || '');
                var img = document.createElement('img');
                img.src = brand.logo || ('multimedia/Logos/' + esc(brand.id) + '.webp');
                img.alt = brand.nombre || brand.id || '';
                img.loading = 'lazy';
                img.decoding = 'async';
                a.appendChild(img);
                frag.appendChild(a);
            }

            track.innerHTML = '';
            track.appendChild(frag);
        }

        whenDbReady(function () {
            renderBrands(); // render inmediato con cache (LCP)
            // §211: whenDbReady dispara en el paso de CACHE (database.js:60 setea
            // loaded=true ANTES del fetch de Firestore) → el primer render puede
            // traer un set de marcas VIEJO. Forzamos un re-render con los datos
            // FRESCOS: el listener realtime descarta su 1er snapshot (database.js:237)
            // así que NO cubre este primer fetch — load(true) lo trae y re-renderiza.
            if (window.vehicleDB && typeof window.vehicleDB.load === 'function') {
                window.vehicleDB.load(true).then(renderBrands).catch(function () {});
            }
            if (window.vehicleDB && typeof window.vehicleDB.onChange === 'function') {
                window.vehicleDB.onChange(function (changeType) {
                    if (changeType === 'brands') renderBrands();
                });
            }
        });
    }

    // ============================================================
    // 5.5 · TU RASTRO / RECOMENDADOS (CinTrail)
    //      IF history → last 5 vehicles; ELSE → featured (Fase-1 placeholder).
    //      Click on side items swaps the main card.
    //      "Limpiar rastro" → vehicleHistory.clearHistory().
    // ============================================================
    function initTrail() {
        var trailBody = document.getElementById('cinTrailBody');
        var clearBtn = document.getElementById('cinTrailClear');
        if (!trailBody) return;

        // SP-5.0.f: bypassear vehicleHistory class. Leer localStorage DIRECTAMENTE.
        // Razón: vehicleHistory tiene múltiples ramas (Firestore _mergeHistory,
        // setUser async, _history en memoria desincronizado, race conditions).
        // localStorage es la fuente de verdad — quien escribió, escribió.
        // Filtramos también por el tombstone clearedAt (SP-5.0.e) desde aquí.
        var HISTORY_KEY = 'altorra_vehicle_history';
        var CLEARED_AT_KEY = 'altorra_vehicle_history_cleared_at';

        function getHistoryFromStorage() {
            try {
                var raw = localStorage.getItem(HISTORY_KEY);
                if (!raw) return [];
                var parsed = JSON.parse(raw);
                if (!Array.isArray(parsed)) return [];
                var clearedAt = 0;
                try {
                    var rawClear = localStorage.getItem(CLEARED_AT_KEY);
                    clearedAt = rawClear ? parseInt(rawClear, 10) : 0;
                } catch (e) {}
                return parsed.filter(function (item) {
                    if (!item || (item.id === undefined || item.id === null)) return false;
                    var ts = (typeof item.timestamp === 'number') ? item.timestamp : 0;
                    return clearedAt === 0 || ts >= clearedAt;
                });
            } catch (e) {
                return [];
            }
        }

        function bindClearOnce() {
            if (!clearBtn || clearBtn._cinWired) return;
            clearBtn._cinWired = true;
            clearBtn.addEventListener('click', function () {
                // Clear via vehicleHistory si está disponible (sincroniza Firestore).
                // Si no, escribir localStorage directo + tombstone como fallback.
                if (window.vehicleHistory && typeof window.vehicleHistory.clearHistory === 'function') {
                    window.vehicleHistory.clearHistory();
                } else {
                    try {
                        localStorage.setItem(HISTORY_KEY, '[]');
                        localStorage.setItem(CLEARED_AT_KEY, String(Date.now()));
                    } catch (e) {}
                }
                clearBtn.hidden = true;
                trailBody.innerHTML = '';
                renderTrailRecommended(trailBody);
            });
        }

        function renderTrailNow() {
            // SP-4 (§138): el trail muestra RECOMENDACIONES por similitud al rastro
            // (motor en js/core/recommendations.js). Los vehículos vistos siguen
            // accesibles en QuickTools ("Vistos recientemente") + perfil. El clearBtn
            // se oculta: la sección ya no es "tu rastro" sino recomendaciones.
            if (clearBtn) clearBtn.hidden = true;
            renderTrailRecommended(trailBody);
        }

        whenDbReady(renderTrailNow);

        // bfcache restore: re-render si el usuario hace browser-back desde detalle.
        window.addEventListener('pageshow', function (event) {
            if (!event.persisted) return;
            renderTrailNow();
        });
    }

    /**
     * Trail variant: history exists — show last 5 visited vehicles.
     */
    function renderTrailWithHistory(trailBody, clearBtn) {
        var history = window.vehicleHistory;
        if (!history) return;

        var historyItems = history.getHistory ? history.getHistory() : [];
        historyItems = historyItems.slice(0, 5);

        // Resolve IDs to vehicle objects
        var vehicles = [];
        for (var i = 0; i < historyItems.length; i++) {
            var item = historyItems[i];
            var id = typeof item === 'object' ? item.id : item;
            var ts = typeof item === 'object' ? (item.timestamp || 0) : 0;
            var v = window.vehicleDB.getVehicleById ? window.vehicleDB.getVehicleById(id) : null;
            if (v) vehicles.push({ vehicle: v, timestamp: ts });
        }

        if (!vehicles.length) {
            renderTrailRecommended(trailBody);
            return;
        }

        // Show clear button. Guard the addEventListener via _cinWired flag para
        // evitar listener leak si renderTrailWithHistory se re-llama desde el
        // pageshow handler (bfcache restore — SP-5.0.c).
        if (clearBtn) {
            clearBtn.hidden = false;
            if (!clearBtn._cinWired) {
                clearBtn._cinWired = true;
                clearBtn.addEventListener('click', function () {
                    if (window.vehicleHistory && typeof window.vehicleHistory.clearHistory === 'function') {
                        window.vehicleHistory.clearHistory();
                    }
                    // Switch to recommended variant after clearing
                    clearBtn.hidden = true;
                    trailBody.innerHTML = '';
                    renderTrailRecommended(trailBody);
                });
            }
        }

        buildTrailStage(trailBody, vehicles);
    }

    /**
     * Trail variant: no history — "Recomendados" (featured + top vehicles).
     */
    function renderTrailRecommended(trailBody) {
        // SP-4 (§138): motor de recomendación por similitud al rastro.
        var featured = [];
        if (window.AltorraRecommendations && typeof window.AltorraRecommendations.getRecommendations === 'function') {
            featured = window.AltorraRecommendations.getRecommendations(5);
        }
        // Fallback (motor no cargado / sin resultados): destacados + ranked (comportamiento previo)
        if (!featured.length) {
            featured = (window.vehicleDB.getFeatured ? window.vehicleDB.getFeatured() : []).slice(0, 5);
            if (featured.length < 5) {
                var ranked = window.vehicleDB.getRankedVehicles ? window.vehicleDB.getRankedVehicles() : [];
                var featuredIds = {};
                for (var fi = 0; fi < featured.length; fi++) featuredIds[featured[fi].id] = true;
                for (var ri = 0; ri < ranked.length && featured.length < 5; ri++) {
                    if (!featuredIds[ranked[ri].id]) featured.push(ranked[ri]);
                }
            }
        }
        if (!featured.length) return; // nothing to show

        // Wrap items in same format
        var vehicles = featured.map(function (v) { return { vehicle: v, timestamp: 0 }; });

        // Update section heading to say "Recomendados"
        var section = trailBody.closest('#cinTrail');
        if (section) {
            var eyebrow = section.querySelector('.cin-eyebrow');
            if (eyebrow) eyebrow.textContent = 'Recomendados';
            var heading = section.querySelector('.cin-trail-h');
            if (heading) {
                heading.textContent = 'Los que te ';
                var em = document.createElement('em');
                em.textContent = 'podrían gustar.';
                heading.appendChild(em);
            }
        }

        buildTrailStage(trailBody, vehicles);
    }

    /**
     * Build the trail stage (main card + side list).
     * Port of JSX L974-1023. Click on side item brings it forward.
     */
    function buildTrailStage(trailBody, items) {
        if (!items.length) return;

        var activeIndex = 0;
        var animating = false;

        function render() {
            trailBody.innerHTML = '';
            var stage = document.createElement('div');
            stage.className = 'cin-trail-stage';

            // Main card (items[activeIndex])
            var active = items[activeIndex];
            var av = active.vehicle;
            var main = document.createElement('article');
            main.className = 'cin-trail-main' + (animating ? ' is-swap' : '');
            if (av.imagen) {
                main.style.backgroundImage = 'url(' + esc(av.imagen) + ')';
            }

            var timeEl = document.createElement('span');
            timeEl.className = 'cin-trail-time';
            timeEl.textContent = active.timestamp ? relTime(active.timestamp) : 'Destacado';
            main.appendChild(timeEl);

            var mainInfo = document.createElement('div');
            mainInfo.className = 'cin-trail-main-info';

            var brandEl = document.createElement('span');
            brandEl.className = 'cin-trail-brand';
            brandEl.textContent = av.marca || '';
            mainInfo.appendChild(brandEl);

            var modelEl = document.createElement('h3');
            modelEl.className = 'cin-trail-model';
            modelEl.textContent = (av.modelo || '') + ' · ';
            var yearSpan = document.createElement('span');
            yearSpan.textContent = av.year || '';
            modelEl.appendChild(yearSpan);
            mainInfo.appendChild(modelEl);

            var foot = document.createElement('div');
            foot.className = 'cin-trail-foot';

            var priceEl = document.createElement('span');
            priceEl.className = 'cin-trail-price';
            priceEl.textContent = fmtPrice(av.precio);
            foot.appendChild(priceEl);

            var goLink = document.createElement('a');
            goLink.className = 'cin-trail-go';
            goLink.href = vehicleUrl(av);
            goLink.textContent = 'Continuar ';
            goLink.insertAdjacentHTML('beforeend', '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12h14M13 5l7 7-7 7"/></svg>');
            foot.appendChild(goLink);

            mainInfo.appendChild(foot);
            main.appendChild(mainInfo);

            // Corners
            var crnrs = ['tl', 'tr', 'bl', 'br'];
            for (var ci = 0; ci < crnrs.length; ci++) {
                var cSpan = document.createElement('span');
                cSpan.className = 'cin-trail-corner cin-trail-corner--' + crnrs[ci];
                main.appendChild(cSpan);
            }

            stage.appendChild(main);

            // Side list (items[1..4])
            var sideList = document.createElement('ul');
            sideList.className = 'cin-trail-stack';
            sideList.setAttribute('role', 'list');

            for (var si = 0; si < items.length; si++) {
                if (si === activeIndex) continue;
                (function (itemIdx) {
                    var it = items[itemIdx];
                    var iv = it.vehicle;
                    var li = document.createElement('li');
                    li.className = 'cin-trail-step';
                    if (iv.imagen) {
                        li.style.backgroundImage = 'url(' + esc(iv.imagen) + ')';
                    }

                    var btn = document.createElement('button');
                    btn.type = 'button';
                    btn.className = 'cin-trail-step-btn';
                    btn.setAttribute('aria-label', 'Traer ' + (iv.marca || '') + ' ' + (iv.modelo || '') + ' al frente');

                    var stepInfo = document.createElement('span');
                    stepInfo.className = 'cin-trail-step-info';
                    var stepBrand = document.createElement('span');
                    stepBrand.className = 'cin-trail-step-brand';
                    stepBrand.textContent = iv.marca || '';
                    var stepModel = document.createElement('span');
                    stepModel.className = 'cin-trail-step-model';
                    stepModel.textContent = iv.modelo || '';
                    stepInfo.appendChild(stepBrand);
                    stepInfo.appendChild(stepModel);

                    var stepTime = document.createElement('span');
                    stepTime.className = 'cin-trail-step-time';
                    stepTime.textContent = it.timestamp ? relTime(it.timestamp) : (iv.año || iv.year || '');

                    btn.appendChild(stepInfo);
                    btn.appendChild(stepTime);
                    btn.addEventListener('click', function () {
                        if (animating) return;
                        animating = true;
                        // 80ms: deja respirar el .is-out (CSS exit anim) antes de mutar el DOM y disparar el .is-in del nuevo orden.
                        setTimeout(function () {
                            // Bring this item to front (port of JSX bringForward)
                            var removed = items.splice(itemIdx, 1)[0];
                            items.unshift(removed);
                            activeIndex = 0;
                            setTimeout(function () { animating = false; render(); }, 600);
                        }, 80);
                        render(); // re-render with swap class immediately
                    });

                    li.appendChild(btn);
                    sideList.appendChild(li);
                })(si);
            }

            stage.appendChild(sideList);
            trailBody.appendChild(stage);
        }

        render();
    }

    // ============================================================
    // 5.6 · CATEGORÍAS — fill .cin-cat-count[data-count-for]
    //      Count disponible vehicles per categoria from vehicleDB.
    // ============================================================
    function initCatCounts() {
        var countEls = document.querySelectorAll('.cin-cat-count[data-count-for]');
        if (!countEls.length) return;

        function updateCounts() {
            if (!window.vehicleDB || !window.vehicleDB.loaded) return;
            var vehicles = window.vehicleDB.getAllVehicles ? window.vehicleDB.getAllVehicles() : [];
            // Count disponible per categoria
            var counts = {};
            for (var i = 0; i < vehicles.length; i++) {
                var v = vehicles[i];
                if (v.estado && v.estado !== 'disponible') continue;
                var cat = v.categoria;
                if (cat) counts[cat] = (counts[cat] || 0) + 1;
            }

            for (var j = 0; j < countEls.length; j++) {
                var el = countEls[j];
                var forCat = el.getAttribute('data-count-for');
                var n = counts[forCat] || 0;
                el.textContent = n > 0 ? (n + ' disponibles') : '';
            }
        }

        whenDbReady(function () {
            updateCounts();
            if (window.vehicleDB && typeof window.vehicleDB.onChange === 'function') {
                window.vehicleDB.onChange(function (changeType) {
                    if (changeType === 'vehicles') updateCounts();
                });
            }
        });
    }

    // ============================================================
    // INIT — called by home.js orchestrator on DOMContentLoaded
    // ============================================================
    function init() {
        if (window.__altorraHomeCarouselsInited) return;
        window.__altorraHomeCarouselsInited = true;

        initAvailable();
        initCollection();
        initPromos();
        initBrands();
        initTrail();
        initCatCounts();
    }

    // Register namespace
    window.AltorraHome = window.AltorraHome || {};
    window.AltorraHome.carousels = { init: init };

    // Also self-mount on DOMContentLoaded as a safety net
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
