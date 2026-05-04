/**
 * ALTORRA CARS — Vehicle hotspots (MF5.2)
 *
 * Dots overlaid on the main vehicle image that highlight features.
 * Hotspots are stored in vehiculos/{id}.hotspots[] = [{x, y, title, description}]
 * where x, y are 0-1 percentages.
 *
 * Public-side: render dots over .vehicle-image-main, click/hover shows
 * tooltip. No interaction with backend.
 */
(function () {
    'use strict';
    if (window.AltorraHotspots) return;

    function escTxt(s) { var d = document.createElement('div'); d.textContent = s == null ? '' : s; return d.innerHTML; }

    function renderHotspots() {
        var container = document.querySelector('.vehicle-image-main, .gallery-main, #mainImageContainer');
        if (!container) return;
        // Need vehicle ID + vehicleDB
        var vehicleId = window.PRERENDERED_VEHICLE_ID || (new URLSearchParams(window.location.search)).get('id');
        if (!vehicleId) return;

        function tryRender() {
            if (!window.vehicleDB || !window.vehicleDB.vehicles) return false;
            var v = window.vehicleDB.vehicles.find(function (x) { return String(x.id) === String(vehicleId); });
            if (!v || !v.hotspots || !v.hotspots.length) return true; // no hotspots — that's ok

            // Remove existing
            var prev = container.querySelectorAll('.vh-hotspot');
            prev.forEach(function (el) { el.remove(); });

            // Position container relatively
            var cs = window.getComputedStyle(container);
            if (cs.position === 'static') container.style.position = 'relative';

            v.hotspots.forEach(function (h, i) {
                var dot = document.createElement('button');
                dot.type = 'button';
                dot.className = 'vh-hotspot';
                dot.setAttribute('aria-label', h.title || ('Hotspot ' + (i + 1)));
                dot.style.left = (h.x * 100) + '%';
                dot.style.top = (h.y * 100) + '%';
                dot.innerHTML = '<span class="vh-hotspot-pulse"></span><span class="vh-hotspot-dot"></span>' +
                    '<div class="vh-hotspot-tooltip">' +
                        '<strong>' + escTxt(h.title || '') + '</strong>' +
                        (h.description ? '<p>' + escTxt(h.description) + '</p>' : '') +
                    '</div>';
                container.appendChild(dot);
            });
            return true;
        }

        if (!tryRender()) {
            var attempts = 0;
            var int = setInterval(function () {
                attempts++;
                if (tryRender() || attempts > 30) clearInterval(int);
            }, 300);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderHotspots);
    } else {
        renderHotspots();
    }
    // Re-render if vehicleDB updates
    if (window.vehicleDB && typeof window.vehicleDB.onChange === 'function') {
        window.vehicleDB.onChange(function () { renderHotspots(); });
    }

    window.AltorraHotspots = { render: renderHotspots };
})();
