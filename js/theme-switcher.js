/**
 * ALTORRA CARS — Theme Switcher (Mega-Plan v4, Microfase T.4)
 * ============================================================
 * Manages the active theme: dark (default) | light | high-contrast.
 *
 * Three layers of persistence (in priority order):
 *   1. localStorage — fastest, applied BEFORE first paint via inline script
 *   2. Firestore (clientes/{uid}.preferencias.theme or usuarios/{uid}.theme
 *      for admins) — cross-device sync for registered users
 *   3. System preference (prefers-color-scheme) — fallback
 *
 * No flash-of-wrong-theme: the inline `<script>` snippet (added in HTML
 * <head>) reads localStorage and sets data-theme synchronously before
 * any CSS evaluates.
 *
 * Public API:
 *   AltorraTheme.get()         → current theme
 *   AltorraTheme.set(theme)    → applies + persists locally
 *   AltorraTheme.cycle()       → cycles dark → light → dark (skips a11y)
 *   AltorraTheme.bindToggle(el)→ attaches click handler
 *   AltorraTheme.onChange(fn)  → subscribe to theme changes
 *   AltorraTheme.syncFromUser(profile) → applies theme from Firestore profile
 */
(function () {
    'use strict';
    if (window.AltorraTheme) return;

    var STORAGE_KEY = 'altorra-theme';
    var VALID_THEMES = ['dark', 'light', 'high-contrast'];
    var listeners = [];
    var _persistTimer = null;

    function getCurrent() {
        return document.documentElement.getAttribute('data-theme') || 'dark';
    }

    function applyTheme(theme) {
        if (VALID_THEMES.indexOf(theme) === -1) theme = 'dark';
        var html = document.documentElement;
        var prev = getCurrent();
        if (prev === theme) return;

        // Cross-fade: temporarily disable transitions to avoid janky multi-property
        // animation across all elements, then re-enable
        html.classList.add('alt-theme-transitioning');
        html.setAttribute('data-theme', theme);

        // Reflow for color update — most components animate via CSS color
        // transitions; using the .alt-theme-transitioning class lets us
        // selectively control the fade
        setTimeout(function () {
            html.classList.remove('alt-theme-transitioning');
        }, 280);

        // Persist
        try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) {}

        // Notify listeners
        listeners.forEach(function (fn) {
            try { fn(theme, prev); } catch (e) {}
        });

        // Persist to Firestore (debounced 800ms)
        clearTimeout(_persistTimer);
        _persistTimer = setTimeout(function () { persistRemote(theme); }, 800);
    }

    function persistRemote(theme) {
        if (!window.db || !window.auth || !window.auth.currentUser) return;
        var u = window.auth.currentUser;
        if (u.isAnonymous) return;
        // Try usuarios/{uid} first (admin), fall back to clientes/{uid} (cliente)
        var ref = window.db.collection('usuarios').doc(u.uid);
        ref.get().then(function (doc) {
            if (doc.exists) {
                ref.update({ theme: theme }).catch(function () {});
            } else {
                window.db.collection('clientes').doc(u.uid).set({
                    preferencias: { theme: theme }
                }, { merge: true }).catch(function () {});
            }
        }).catch(function () {});
    }

    function syncFromUser(profile) {
        if (!profile) return;
        var theme = profile.theme || (profile.preferencias && profile.preferencias.theme);
        if (theme && VALID_THEMES.indexOf(theme) !== -1) {
            // Only override if user has an explicit preference AND it's different
            // from local (localStorage already applied at <head>)
            if (theme !== getCurrent()) applyTheme(theme);
        }
    }

    function cycleTheme() {
        var current = getCurrent();
        // Skip high-contrast in cycling — it's a separate accessibility toggle
        applyTheme(current === 'dark' ? 'light' : 'dark');
    }

    function bindToggle(el) {
        if (!el) return;
        el.addEventListener('click', cycleTheme);
        // Update label/icon on theme change
        var update = function () {
            var current = getCurrent();
            el.setAttribute('data-current-theme', current);
            var label = current === 'light' ? 'Cambiar a oscuro'
                : current === 'high-contrast' ? 'Cambiar a contraste normal'
                : 'Cambiar a claro';
            el.setAttribute('aria-label', label);
            el.setAttribute('data-tooltip', label);
        };
        update();
        listeners.push(update);
    }

    function onChange(fn) {
        if (typeof fn === 'function') listeners.push(fn);
        return function unsubscribe() {
            listeners = listeners.filter(function (l) { return l !== fn; });
        };
    }

    // System preference change listener — respects user choice on first load
    // but updates if the user is on system-default and OS changes mode
    if (window.matchMedia) {
        var mql = window.matchMedia('(prefers-color-scheme: light)');
        mql.addEventListener && mql.addEventListener('change', function (e) {
            var stored = null;
            try { stored = localStorage.getItem(STORAGE_KEY); } catch (_) {}
            // Only auto-follow if user hasn't explicitly chosen a theme
            if (!stored) applyTheme(e.matches ? 'light' : 'dark');
        });
    }

    window.AltorraTheme = {
        get: getCurrent,
        set: applyTheme,
        cycle: cycleTheme,
        bindToggle: bindToggle,
        onChange: onChange,
        syncFromUser: syncFromUser,
        VALID: VALID_THEMES
    };

    // Auto-bind any element with data-altorra-theme-toggle
    function autoBind() {
        document.querySelectorAll('[data-altorra-theme-toggle]').forEach(bindToggle);
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', autoBind);
    } else {
        autoBind();
    }
})();
