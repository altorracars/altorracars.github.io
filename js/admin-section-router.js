/**
 * ALTORRA CARS — Admin section router (Mega-Plan v4, Microfase B.3)
 * ===================================================================
 * Centralized section navigation with:
 *   1. Aliases — old data-section names route to new ones transparently
 *   2. Hash deep-linking — #/<section> in URL jumps to that section + persists
 *   3. Section change events — other modules subscribe via AltorraSections.onChange
 *   4. Section registry — canonical list with metadata
 *
 * Existing nav handler in admin-auth.js still works; this router augments
 * (not replaces) by listening to clicks and intercepting unknown
 * sections (aliases) before they fail.
 *
 * Public API:
 *   AltorraSections.go(section)     — programmatic navigation
 *   AltorraSections.current()       — currently active section
 *   AltorraSections.onChange(fn)    — subscribe to changes
 *   AltorraSections.register(meta)  — register a new section (future)
 *   AltorraSections.aliases         — read aliases map
 */
(function () {
    'use strict';
    if (window.AltorraSections) return;

    /* ═══════════════════════════════════════════════════════════
       ALIASES — old/legacy → new canonical
       Add entries here when renaming. Keys are old, values are new.
       ═══════════════════════════════════════════════════════════ */
    var ALIASES = {
        // No renames yet — placeholders for future bloques
        // E.g. when bloque E ships:
        //   'appointments': 'comunicaciones'
        //   'inbox': 'mensajes'
        //   'lists': 'leads'
        // Or when D ships:
        //   'calendar-disabled': 'calendario'
    };

    /* ═══════════════════════════════════════════════════════════
       SECTION REGISTRY — metadata about each known section
       Used by command palette (P.4), search, and analytics.
       ═══════════════════════════════════════════════════════════ */
    var REGISTRY = {
        dashboard:      { label: 'Inicio',           group: null,           icon: 'layout-dashboard' },
        vehicles:       { label: 'Vehículos',        group: 'inventario',   icon: 'car' },
        brands:         { label: 'Marcas',           group: 'inventario',   icon: 'tag' },
        dealers:        { label: 'Aliados',          group: 'inventario',   icon: 'handshake' },
        banners:        { label: 'Banners',          group: 'inventario',   icon: 'image' },
        reviews:        { label: 'Reseñas',          group: 'inventario',   icon: 'star' },
        appointments:   { label: 'Bandeja',          group: 'comunicaciones', icon: 'inbox' },
        inbox:          { label: 'Mensajes vehículo', group: 'comunicaciones', icon: 'message-square-text' },
        concierge:      { label: 'Concierge',         group: 'comunicaciones', icon: 'bot' },
        lists:          { label: 'Leads (legacy)',   group: 'comunicaciones', icon: 'sparkles' },
        crm:            { label: 'Contactos 360°',   group: 'crm',          icon: 'users-round' },
        automation:     { label: 'Reglas',           group: 'automatizacion', icon: 'zap' },
        templates:      { label: 'Plantillas',       group: 'automatizacion', icon: 'file-edit' },
        kb:             { label: 'Knowledge Base',   group: 'automatizacion', icon: 'book-open' },
        users:          { label: 'Usuarios',         group: 'configuracion',icon: 'users' },
        audit:          { label: 'Auditoría',        group: 'configuracion',icon: 'scroll-text' },
        settings:       { label: 'Ajustes',          group: 'configuracion',icon: 'settings' }
    };

    var listeners = [];
    var _currentSection = null;
    var _hashUpdating = false;

    function resolve(section) {
        if (!section) return section;
        return ALIASES[section] || section;
    }

    function getCurrent() {
        if (_currentSection) return _currentSection;
        var active = document.querySelector('.section.active');
        if (!active || !active.id) return null;
        return active.id.replace(/^sec-/, '');
    }

    function go(section) {
        section = resolve(section);
        if (!section) return false;

        // Find the nav-item button and trigger its click
        var btn = document.querySelector('.nav-item[data-section="' + section + '"]');
        if (!btn) {
            console.warn('[Sections] Unknown section:', section);
            return false;
        }
        if (btn.disabled) {
            console.warn('[Sections] Section disabled:', section);
            return false;
        }
        btn.click();
        return true;
    }

    function onChange(fn) {
        if (typeof fn === 'function') listeners.push(fn);
        return function unsubscribe() {
            listeners = listeners.filter(function (l) { return l !== fn; });
        };
    }

    function notifyChange(section, prev) {
        listeners.forEach(function (fn) {
            try { fn(section, prev); } catch (e) {}
        });
        // I.3+I.4 — emit to EventBus so Activity Feed + future workflows see it
        if (window.AltorraEventBus) {
            var prevLabel = prev && REGISTRY[prev] ? REGISTRY[prev].label : (prev || null);
            var newLabel = REGISTRY[section] ? REGISTRY[section].label : section;
            window.AltorraEventBus.emit('ui.section-changed', {
                section: section,
                previous: prev,
                meta: REGISTRY[section] || null,
                title: prev ? (prevLabel + ' → ' + newLabel) : newLabel,
                _previous: prev ? { section: prev } : null
            });
        }
    }

    /* ═══════════════════════════════════════════════════════════
       HASH DEEP-LINKING
       - URL #/<section> on load → navigate
       - User click on nav → update URL (without scroll jump)
       ═══════════════════════════════════════════════════════════ */
    function syncFromHash() {
        var hash = (window.location.hash || '').replace(/^#\/?/, '').trim();
        if (!hash) return;
        var section = resolve(hash);
        if (REGISTRY[section]) go(section);
    }

    function updateHash(section) {
        if (!section || _hashUpdating) return;
        _hashUpdating = true;
        try {
            history.replaceState(null, '', '#/' + section);
        } catch (e) {}
        setTimeout(function () { _hashUpdating = false; }, 50);
    }

    /* ═══════════════════════════════════════════════════════════
       OBSERVE section changes via the existing nav-item click handler
       (admin-auth.js installs the actual show/hide). We listen for
       the .active class to flip and react.
       ═══════════════════════════════════════════════════════════ */
    function observeSectionChanges() {
        if (typeof MutationObserver === 'undefined') return;
        // Initial detection
        _currentSection = getCurrent();
        // Observe all sections — when one gets .active, fire change event
        document.querySelectorAll('.section').forEach(function (sec) {
            var obs = new MutationObserver(function () {
                if (sec.classList.contains('active')) {
                    var newSection = sec.id.replace(/^sec-/, '');
                    var prev = _currentSection;
                    _currentSection = newSection;
                    notifyChange(newSection, prev);
                    updateHash(newSection);
                }
            });
            obs.observe(sec, { attributes: true, attributeFilter: ['class'] });
        });
    }

    /* ═══════════════════════════════════════════════════════════
       Intercept clicks on alias data-section values so they route
       to the canonical name. The actual nav-item HTML always uses
       canonical values, but external code (search results, command
       palette future) might emit aliases.
       ═══════════════════════════════════════════════════════════ */
    function attachClickInterceptor() {
        document.addEventListener('click', function (e) {
            var item = e.target.closest('[data-section]');
            if (!item) return;
            var raw = item.getAttribute('data-section');
            var resolved = resolve(raw);
            if (resolved !== raw) {
                e.stopPropagation();
                e.preventDefault();
                go(resolved);
            }
        }, true); // capture phase to intercept before native handler
    }

    function init() {
        attachClickInterceptor();
        observeSectionChanges();
        // On load, prefer hash over default
        if (window.location.hash) {
            // Defer slightly so admin-auth.js has set up section visibility first
            setTimeout(syncFromHash, 100);
        }
        window.addEventListener('hashchange', syncFromHash);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.AltorraSections = {
        go: go,
        current: getCurrent,
        onChange: onChange,
        resolve: resolve,
        aliases: ALIASES,
        registry: REGISTRY
    };
})();
