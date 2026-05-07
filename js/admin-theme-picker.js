/**
 * AltorraThemePicker — Selector de tema cromático del admin (§28.8)
 * ==================================================================
 * Permite al admin elegir entre 3 paletas cromáticas:
 *   - gold (default Altorra)
 *   - blue (cool/corporate)
 *   - violet (creative/luxury)
 *
 * El theme aplica clase `.theme-{name}` al <html> y los CSS vars
 * `--brand-primary`, `--ws-color-gold`, etc. se overridean.
 * Persistencia en localStorage `altorra_admin_theme`.
 *
 * Funciona ortogonal al theme-switcher.js (light/dark/contrast).
 */
(function () {
    'use strict';
    if (window.AltorraThemePicker) return;

    var STORAGE_KEY = 'altorra_admin_theme';
    var DEFAULT_THEME = 'gold';
    var THEMES = ['gold', 'blue', 'violet'];

    var THEME_META = {
        gold: {
            name: 'Dorado clásico',
            description: 'Identidad histórica de Altorra Cars',
            primary: '#b89658',
            preview: ['#d4ad6e', '#b89658', '#9a7d44']
        },
        blue: {
            name: 'Azul corporativo',
            description: 'Profesional y moderno',
            primary: '#3b82f6',
            preview: ['#60a5fa', '#3b82f6', '#1d4ed8']
        },
        violet: {
            name: 'Violeta creativo',
            description: 'Lujo y distinción',
            primary: '#8b5cf6',
            preview: ['#a78bfa', '#8b5cf6', '#6d28d9']
        }
    };

    function applyTheme(theme) {
        if (!THEMES.indexOf(theme) === -1 && theme !== '') theme = DEFAULT_THEME;
        if (THEMES.indexOf(theme) === -1) theme = DEFAULT_THEME;

        // Limpia clases viejas
        THEMES.forEach(function (t) {
            document.documentElement.classList.remove('theme-' + t);
        });

        if (theme !== DEFAULT_THEME) {
            document.documentElement.classList.add('theme-' + theme);
        }

        // Persist
        try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) {}

        // Notify listeners
        if (window.AltorraEventBus && typeof window.AltorraEventBus.emit === 'function') {
            try { window.AltorraEventBus.emit('admin.theme-changed', { theme: theme }); } catch (e) {}
        }
    }

    function getTheme() {
        try {
            var t = localStorage.getItem(STORAGE_KEY);
            if (t && THEMES.indexOf(t) !== -1) return t;
        } catch (e) {}
        return DEFAULT_THEME;
    }

    /* ─── Render UI del picker (modal/panel) ─────────────────── */
    function buildPickerHTML() {
        var current = getTheme();
        var cards = THEMES.map(function (t) {
            var meta = THEME_META[t];
            var isActive = t === current;
            var swatches = meta.preview.map(function (c) {
                return '<span class="atp-swatch" style="background:' + c + '"></span>';
            }).join('');
            return '<button class="atp-card' + (isActive ? ' is-active' : '') +
                '" data-theme="' + t + '" data-tooltip="' + meta.description + '">' +
                '<div class="atp-swatches">' + swatches + '</div>' +
                '<div class="atp-card-name">' + meta.name + '</div>' +
                (isActive ? '<div class="atp-active-badge">✓ Activo</div>' : '') +
                '</button>';
        }).join('');

        return '<div class="atp-picker">' +
            '<div class="atp-picker-head">' +
                '<div>' +
                    '<h3 class="atp-picker-title">Apariencia del panel</h3>' +
                    '<p class="atp-picker-subtitle">Elegí la paleta cromática que más te guste. Se aplica al instante.</p>' +
                '</div>' +
            '</div>' +
            '<div class="atp-grid">' + cards + '</div>' +
            '</div>';
    }

    function attachClickHandlers(root) {
        if (!root) return;
        root.addEventListener('click', function (e) {
            var card = e.target.closest('[data-theme]');
            if (!card) return;
            var t = card.getAttribute('data-theme');
            applyTheme(t);
            // Re-render para actualizar el .is-active
            root.innerHTML = buildPickerHTML();
            attachClickHandlers(root);

            // Toast feedback
            if (window.notify && typeof window.notify.success === 'function') {
                try {
                    window.notify.success({
                        title: '🎨 Tema aplicado',
                        message: 'Apariencia: ' + THEME_META[t].name,
                        duration: 2400
                    });
                } catch (e) {}
            }
        });
    }

    /* ─── Auto-mount en sec-settings (si existe el container) ── */
    function autoMount() {
        var container = document.getElementById('themePicker') ||
                        document.querySelector('[data-theme-picker]');
        if (!container) return;
        container.innerHTML = buildPickerHTML();
        attachClickHandlers(container);
    }

    /* ─── Initial: aplicar tema persistido ANTES de paint ─── */
    // (se hace inline en admin.html via <script> para evitar flicker)
    applyTheme(getTheme());

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', autoMount);
    } else {
        setTimeout(autoMount, 100);
    }

    // Re-mount al entrar a sec-settings
    if (window.AltorraSections && window.AltorraSections.onChange) {
        window.AltorraSections.onChange(function (section) {
            if (section === 'settings') {
                setTimeout(autoMount, 200);
            }
        });
    }

    /* ─── Public API ─────────────────────────────────────────── */
    window.AltorraThemePicker = {
        apply: applyTheme,
        get: getTheme,
        themes: THEMES,
        meta: THEME_META,
        mount: autoMount
    };
})();
