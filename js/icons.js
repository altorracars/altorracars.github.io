/**
 * ALTORRA CARS — Icon helper (Mega-Plan v4, Microfase T.7)
 * =========================================================
 * Standardizes icon usage across the platform. All icons should be
 * Lucide unless they are brand SVGs (logos like Google sign-in).
 *
 * Public API:
 *   AltorraIcons.refresh(scope)         — re-renders Lucide icons in scope
 *   AltorraIcons.canonical              — semantic glossary
 *   AltorraIcons.svg(name, attrs)       — returns SVG string for inline use
 *   AltorraIcons.ensure()               — lazy-loads Lucide if not present
 *
 * The glossary maps semantic concepts to Lucide icon names — use these
 * everywhere for consistency. If an icon is missing from the glossary,
 * add it here first instead of hardcoding the Lucide name in random places.
 */
(function () {
    'use strict';
    if (window.AltorraIcons) return;

    /* ═══════════════════════════════════════════════════════════
       CANONICAL SEMANTIC ICON GLOSSARY
       Map intent → Lucide icon name. Use AltorraIcons.canonical.X
       in components instead of hardcoding 'home', 'settings', etc.
       ═══════════════════════════════════════════════════════════ */
    var canonical = {
        // Navigation
        home:          'home',
        dashboard:     'layout-dashboard',
        inventory:     'car',
        brands:        'tag',
        banners:       'image',
        comms:         'inbox',
        crm:           'users-round',
        inbox:         'message-square-text',
        calendar:      'calendar',
        automation:    'zap',
        templates:     'file-edit',
        reports:       'bar-chart-3',
        users:         'users',
        settings:      'settings',
        audit:         'shield-check',
        dealers:       'handshake',
        reviews:       'star',
        leads:         'sparkles',

        // Communication kinds (matches AltorraCommSchema)
        cita:          'calendar-check-2',
        solicitud:     'file-text',
        lead:          'message-circle',
        all:           'layers',

        // Actions
        add:           'plus',
        edit:          'edit-3',
        delete:        'trash-2',
        save:          'save',
        copy:          'copy',
        share:         'share-2',
        download:      'download',
        upload:        'upload',
        print:         'printer',
        send:          'send',
        search:        'search',
        filter:        'filter',
        sort:          'arrow-up-down',
        refresh:       'refresh-cw',
        more:          'more-horizontal',
        close:         'x',
        back:          'chevron-left',
        forward:       'chevron-right',
        up:            'chevron-up',
        down:          'chevron-down',
        external:      'external-link',
        link:          'link-2',

        // States
        success:       'check-circle-2',
        error:         'x-circle',
        warning:       'alert-triangle',
        info:          'info',
        loading:       'loader-2',
        pending:       'clock-3',
        priority:      'flag',
        starred:       'star',
        favorite:      'heart',
        viewed:        'eye',
        hidden:        'eye-off',

        // Communication channels
        whatsapp:      'message-circle-more', // brand-neutral icon (no WhatsApp logo)
        email:         'mail',
        phone:         'phone',
        sms:           'message-square',
        chat:          'messages-square',
        bot:           'bot',
        asesor:        'user-circle',

        // Money / commerce
        price:         'dollar-sign',
        finance:       'landmark',
        quote:         'file-bar-chart-2',
        sale:          'trending-up',
        priceDrop:     'trending-down',
        priceUp:       'trending-up',
        wallet:        'wallet',

        // CRM & analytics
        score:         'gauge',
        target:        'target',
        funnel:        'funnel-x',
        graph:         'network',
        analytics:     'line-chart',
        kanban:        'kanban',
        list:          'list',
        grid:          'layout-grid',
        timeline:      'history',

        // Vehicle
        vehicle:       'car',
        suv:           'truck',
        pickup:        'truck-front',
        photo:         'camera',
        gallery:       'images',
        location:      'map-pin',
        gps:           'navigation',

        // System
        bell:          'bell',
        bellRing:      'bell-ring',
        bellOff:       'bell-off',
        lock:          'lock',
        unlock:        'unlock',
        shield:        'shield',
        key:           'key',
        cloud:         'cloud',
        cloudOff:      'cloud-off',
        wifi:          'wifi',
        wifiOff:       'wifi-off',

        // AI / collab
        ai:            'sparkles',
        magic:         'wand-2',
        suggest:       'lightbulb',
        voice:         'mic',
        voiceOff:      'mic-off',
        translate:     'languages',
        live:          'radio-tower',

        // Theme
        themeDark:     'moon',
        themeLight:    'sun',
        themeSystem:   'monitor',
        contrast:      'contrast'
    };

    /* ═══════════════════════════════════════════════════════════
       Lazy load Lucide CDN if not present
       ═══════════════════════════════════════════════════════════ */
    function ensureLoaded() {
        return new Promise(function (resolve, reject) {
            if (window.lucide && window.lucide.createIcons) {
                resolve(window.lucide);
                return;
            }
            // Check if a script tag is already in the page
            var existing = document.querySelector('script[src*="lucide"]');
            if (existing) {
                existing.addEventListener('load', function () {
                    resolve(window.lucide);
                });
                return;
            }
            var s = document.createElement('script');
            s.src = 'https://cdn.jsdelivr.net/npm/lucide@0.468.0/dist/umd/lucide.min.js';
            s.async = true;
            s.onload = function () { resolve(window.lucide); };
            s.onerror = reject;
            document.head.appendChild(s);
        });
    }

    /* ═══════════════════════════════════════════════════════════
       Refresh — re-render Lucide icons in scope or globally
       Use after dynamic HTML insertion that contains <i data-lucide>
       ═══════════════════════════════════════════════════════════ */
    function refresh(scope) {
        if (window.lucide && window.lucide.createIcons) {
            try {
                window.lucide.createIcons(scope ? { context: scope } : undefined);
            } catch (e) {}
        } else {
            ensureLoaded().then(function (lib) {
                try {
                    lib.createIcons(scope ? { context: scope } : undefined);
                } catch (e) {}
            });
        }
    }

    /* ═══════════════════════════════════════════════════════════
       SVG string helper — for cases where we can't insert <i>
       (e.g. inside SVG <text>, or when we need to inline early
       before the Lucide library loads).
       Returns a basic Lucide-compatible SVG with currentColor stroke.
       Note: this only works for icons we hardcode here. For most
       use cases, prefer <i data-lucide="name"></i>.
       ═══════════════════════════════════════════════════════════ */
    var hardcoded = {
        check: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
        x: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
        send: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>'
    };

    function svg(name, attrs) {
        var raw = hardcoded[name];
        if (!raw) return '';
        if (!attrs) return raw;
        // Inject extra attributes (size, class, etc.)
        var attrStr = Object.keys(attrs).map(function (k) {
            return k + '="' + String(attrs[k]).replace(/"/g, '&quot;') + '"';
        }).join(' ');
        return raw.replace('<svg ', '<svg ' + attrStr + ' ');
    }

    /* ═══════════════════════════════════════════════════════════
       Auto-refresh on DOMContentLoaded
       ═══════════════════════════════════════════════════════════ */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { refresh(); });
    } else {
        refresh();
    }

    /* ═══════════════════════════════════════════════════════════
       Re-refresh whenever new content is added that has data-lucide
       Use MutationObserver lite — only triggers on new elements with
       [data-lucide] descendants, debounced 50ms.
       ═══════════════════════════════════════════════════════════ */
    var refreshTimer = null;
    function scheduleRefresh() {
        clearTimeout(refreshTimer);
        refreshTimer = setTimeout(refresh, 50);
    }
    if (typeof MutationObserver !== 'undefined') {
        try {
            var observer = new MutationObserver(function (mutations) {
                for (var i = 0; i < mutations.length; i++) {
                    var m = mutations[i];
                    for (var j = 0; j < m.addedNodes.length; j++) {
                        var n = m.addedNodes[j];
                        if (n.nodeType === 1) {
                            if (n.matches && n.matches('[data-lucide]')) { scheduleRefresh(); return; }
                            if (n.querySelector && n.querySelector('[data-lucide]')) { scheduleRefresh(); return; }
                        }
                    }
                }
            });
            // Observe body — start when ready
            var startObs = function () {
                if (document.body) observer.observe(document.body, { childList: true, subtree: true });
            };
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', startObs);
            } else {
                startObs();
            }
        } catch (e) { /* defensive */ }
    }

    window.AltorraIcons = {
        canonical: canonical,
        refresh: refresh,
        svg: svg,
        ensure: ensureLoaded
    };
})();
