/**
 * ALTORRA CARS — Overlay safety guard (Mega-Plan v4 fix)
 * ========================================================
 * Limpieza defensiva de overlays huérfanos que pueden bloquear el
 * header. Corre cada 3s y elimina cualquier elemento con z-index
 * extremo + position fixed + inset 0 que NO tenga su clase de
 * activación correspondiente y que lleve más de 30s en el DOM.
 *
 * Por qué: durante una sesión larga del admin, errores transitorios
 * (network drop, JS exception, modal cerrado mid-render) pueden
 * dejar wrappers de overlays creados dinámicamente sin haberse
 * removido. Esos wrappers cubren el viewport y bloquean clicks.
 *
 * Selectores monitorizados:
 *   #alt-onboard         → debería tener .is-active
 *   #alt-palette         → .alt-palette-open
 *   #altorra-voice-overlay → .alt-voice-active
 *   #alt-sec-modal       → siempre visible cuando existe (creado on-demand)
 *   #altorra-optin       → siempre visible cuando existe
 *   #cncSummaryWrap      → siempre visible cuando existe
 *   #cnc-onboarding-* etc.
 *
 * Para cada uno: si existe en el DOM pero no tiene clase activa O
 * lleva más del TTL muerto (no recibió eventos/no fue tocado), se
 * marca como huérfano y se elimina silenciosamente.
 *
 * Public API:
 *   AltorraOverlayGuard.scan()         → ejecutar ahora
 *   AltorraOverlayGuard.dump()         → diagnostic console
 */
(function () {
    'use strict';
    if (window.AltorraOverlayGuard) return;

    var ORPHAN_TTL = 30000;            // 30s sin estar activo → huérfano
    var SCAN_INTERVAL = 5000;          // re-escanear cada 5s
    var _seen = {};                    // id → primer-visto-timestamp

    /* Selectores con su clase de activación esperada */
    var WATCHED = [
        { id: 'alt-onboard',           activeClass: 'is-active' },
        { id: 'alt-palette',           activeClass: 'alt-palette-open' },
        { id: 'altorra-voice-overlay', activeClass: 'alt-voice-active' }
    ];

    function isStaticOrphan(entry) {
        var el = document.getElementById(entry.id);
        if (!el) {
            delete _seen[entry.id];
            return null;
        }
        if (entry.activeClass && el.classList.contains(entry.activeClass)) {
            // Está activo legítimamente — refresca timestamp
            _seen[entry.id] = Date.now();
            return null;
        }
        // No tiene clase activa
        if (!_seen[entry.id]) _seen[entry.id] = Date.now();
        var age = Date.now() - _seen[entry.id];
        if (age > ORPHAN_TTL) {
            return el;
        }
        return null;
    }

    function scan() {
        WATCHED.forEach(function (entry) {
            var orphan = isStaticOrphan(entry);
            if (orphan) {
                console.warn('[OverlayGuard] removing orphan:', entry.id);
                orphan.classList.add('altorra-orphan');
                // Esperar un tick y eliminar — da chance a animations cleanup
                setTimeout(function () {
                    if (orphan && orphan.parentNode) orphan.parentNode.removeChild(orphan);
                }, 300);
                delete _seen[entry.id];
            }
        });

        // Detectar overlays huérfanos creados dinámicamente que se quedaron.
        // Heurística: cualquier <div> hijo directo del body con position:fixed
        // y z-index >= 99000 que NO sea uno de los watched conocidos.
        Array.prototype.forEach.call(document.body.children, function (el) {
            if (el.tagName !== 'DIV' && el.tagName !== 'ASIDE') return;
            if (el.id && WATCHED.some(function (w) { return w.id === el.id; })) return;
            // Skip notify center y otros singleton conocidos
            var skipIds = ['altorra-concierge', 'altorra-concierge-btn',
                           'aaf-panel', 'aaf-trigger',
                           'alt-presence-overlay',
                           'altorra-voice-btn',
                           'altorra-optin',
                           'alt-sec-modal',
                           'cncSummaryWrap',
                           'altorra-update-banner',
                           'page-loader'];
            if (skipIds.indexOf(el.id) !== -1) return;
            var cs = getComputedStyle(el);
            if (cs.position !== 'fixed') return;
            var z = parseInt(cs.zIndex, 10);
            if (isNaN(z) || z < 99000) return;
            if (cs.display === 'none') return;
            if (cs.pointerEvents === 'none') return;
            if (parseFloat(cs.opacity) < 0.05) return;

            // Marca y elimina con TTL
            if (!_seen['_dyn:' + (el.id || el.className)]) {
                _seen['_dyn:' + (el.id || el.className)] = Date.now();
                return;
            }
            var age = Date.now() - _seen['_dyn:' + (el.id || el.className)];
            if (age > ORPHAN_TTL) {
                console.warn('[OverlayGuard] removing dynamic orphan:', el);
                el.parentNode.removeChild(el);
                delete _seen['_dyn:' + (el.id || el.className)];
            }
        });
    }

    function dump() {
        console.log('[OverlayGuard] state:');
        WATCHED.forEach(function (entry) {
            var el = document.getElementById(entry.id);
            console.log(' -', entry.id, el ? (el.classList.contains(entry.activeClass) ? 'ACTIVE' : 'IDLE') : 'NOT-FOUND');
        });
    }

    // Iniciar scan periódico
    setInterval(scan, SCAN_INTERVAL);

    // Una pasada inicial breve después de DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            setTimeout(scan, 5000);
        });
    } else {
        setTimeout(scan, 5000);
    }

    window.AltorraOverlayGuard = {
        scan: scan,
        dump: dump
    };
})();
