/**
 * ALTORRA CARS — Command Palette (Mega-Plan v4, Microfase P.4)
 * ===============================================================
 * Spotlight para el admin: ⌘+K (Mac) / Ctrl+K (Win/Linux) abre un
 * palette centrado donde el admin puede buscar y ejecutar cualquier
 * acción con el teclado.
 *
 * Patrón Linear/Stripe/GitHub Cmd+K.
 *
 * Comandos disponibles:
 *   - Navegación a las 16+ secciones (desde AltorraSections.registry)
 *   - Acciones rápidas: Nuevo vehículo, Nueva FAQ, Cerrar sesión,
 *     Activar voz, Refrescar insights, Ir a calendario hoy
 *   - Búsqueda en el Knowledge Graph (contactos, vehículos por marca)
 *
 * Fuzzy matching simple (substring por palabra) sobre labels + keywords.
 *
 * Atajos:
 *   ⌘+K / Ctrl+K  → abrir
 *   Esc           → cerrar
 *   ↑/↓           → navegar resultados
 *   Enter         → ejecutar resultado seleccionado
 *
 * Public API:
 *   AltorraPalette.open()
 *   AltorraPalette.close()
 *   AltorraPalette.toggle()
 */
(function () {
    'use strict';
    if (window.AltorraPalette) return;
    var AP = window.AP;
    if (!AP) return;

    var _isOpen = false;
    var _selectedIndex = 0;
    var _filteredCommands = [];

    /* ═══════════════════════════════════════════════════════════
       BUILD COMMAND CATALOG
       Combina secciones del router + acciones rápidas + búsqueda
       ═══════════════════════════════════════════════════════════ */
    function buildCommands() {
        var commands = [];
        // 1. Navegación
        var registry = (window.AltorraSections && window.AltorraSections.registry) || {};
        Object.keys(registry).forEach(function (key) {
            var meta = registry[key];
            commands.push({
                id: 'nav:' + key,
                label: 'Ir a ' + meta.label,
                category: 'Navegación',
                icon: meta.icon || 'arrow-right',
                keywords: [key, meta.label.toLowerCase(), meta.group || ''],
                action: function () {
                    if (window.AltorraSections) window.AltorraSections.go(key);
                }
            });
        });

        // 2. Acciones rápidas
        commands.push(
            {
                id: 'action:new-vehicle',
                label: 'Crear nuevo vehículo',
                category: 'Acciones',
                icon: 'car',
                keywords: ['nuevo', 'agregar', 'añadir', 'auto', 'carro'],
                action: function () {
                    var btn = document.querySelector('[data-action="quickNewVehicle"], #addVehicleBtn');
                    if (btn) btn.click();
                    else if (window.AltorraSections) window.AltorraSections.go('vehicles');
                }
            },
            {
                id: 'action:new-faq',
                label: 'Crear nueva FAQ del bot',
                category: 'Acciones',
                icon: 'plus-circle',
                keywords: ['kb', 'knowledge base', 'nueva', 'faq', 'concierge', 'bot'],
                action: function () {
                    if (window.AltorraSections) window.AltorraSections.go('kb');
                    setTimeout(function () {
                        var btn = document.getElementById('kbAddBtn');
                        if (btn) btn.click();
                    }, 300);
                }
            },
            {
                id: 'action:voice',
                label: 'Activar comandos por voz',
                category: 'Acciones',
                icon: 'mic',
                keywords: ['voz', 'voice', 'dictar', 'hablar'],
                action: function () {
                    if (window.AltorraVoice) window.AltorraVoice.start();
                }
            },
            {
                id: 'action:refresh-insights',
                label: 'Refrescar insights del dashboard',
                category: 'Acciones',
                icon: 'refresh-cw',
                keywords: ['insights', 'dashboard', 'recargar', 'refrescar'],
                action: function () {
                    if (window.AltorraSections) window.AltorraSections.go('dashboard');
                    setTimeout(function () {
                        if (window.AltorraInsights) window.AltorraInsights.refresh();
                        if (window.AltorraPredictive) window.AltorraPredictive.refresh();
                    }, 200);
                }
            },
            {
                id: 'action:calendar-today',
                label: 'Calendario: ir a hoy',
                category: 'Acciones',
                icon: 'calendar',
                keywords: ['calendario', 'hoy', 'today', 'agenda'],
                action: function () {
                    if (window.AltorraSections) window.AltorraSections.go('calendar');
                    setTimeout(function () {
                        var btn = document.getElementById('calToday');
                        if (btn) btn.click();
                    }, 300);
                }
            },
            {
                id: 'action:logout',
                label: 'Cerrar sesión',
                category: 'Acciones',
                icon: 'log-out',
                keywords: ['salir', 'logout', 'desconectar'],
                action: function () {
                    if (confirm('¿Cerrar sesión?')) {
                        var btn = document.getElementById('logoutBtn');
                        if (btn) btn.click();
                    }
                }
            },
            {
                id: 'action:install-pwa',
                label: 'Instalar Altorra como app',
                category: 'Acciones',
                icon: 'download',
                keywords: ['pwa', 'instalar', 'app', 'standalone'],
                action: function () {
                    if (window.AltorraPWA) window.AltorraPWA.install();
                }
            }
        );

        // 3. Búsqueda dinámica de contactos del CRM
        if (window.AltorraCRM && window.AltorraCRM.getContacts) {
            try {
                var contacts = window.AltorraCRM.getContacts() || [];
                contacts.slice(0, 20).forEach(function (c) {
                    if (!c.email && !c.nombre) return;
                    commands.push({
                        id: 'contact:' + (c.email || c.key),
                        label: 'Abrir contacto: ' + (c.nombre || c.email),
                        category: 'Contactos',
                        icon: 'user',
                        keywords: [(c.email || '').toLowerCase(), (c.nombre || '').toLowerCase(), 'crm', 'contacto'],
                        action: function () {
                            if (window.AltorraSections) window.AltorraSections.go('crm');
                            // Filter el CRM por el email si es posible
                            setTimeout(function () {
                                var input = document.getElementById('crmSearchInput');
                                if (input && c.email) {
                                    input.value = c.email;
                                    input.dispatchEvent(new Event('input', { bubbles: true }));
                                }
                            }, 300);
                        }
                    });
                });
            } catch (e) {}
        }

        return commands;
    }

    /* ═══════════════════════════════════════════════════════════
       FUZZY MATCH — substring por palabra
       ═══════════════════════════════════════════════════════════ */
    function matchScore(query, command) {
        if (!query) return 1; // sin query, mostrar todos
        var q = query.toLowerCase().trim();
        var words = q.split(/\s+/);
        var label = command.label.toLowerCase();
        var keywords = (command.keywords || []).join(' ').toLowerCase();
        var combined = label + ' ' + keywords;
        var score = 0;
        words.forEach(function (w) {
            if (label.indexOf(w) !== -1) score += 5;
            else if (keywords.indexOf(w) !== -1) score += 3;
            else if (combined.indexOf(w) !== -1) score += 1;
        });
        return score;
    }

    function filterCommands(query) {
        var all = buildCommands();
        if (!query) return all.slice(0, 30);
        var scored = all
            .map(function (c) { return { cmd: c, score: matchScore(query, c) }; })
            .filter(function (s) { return s.score > 0; })
            .sort(function (a, b) { return b.score - a.score; })
            .map(function (s) { return s.cmd; });
        return scored.slice(0, 30);
    }

    /* ═══════════════════════════════════════════════════════════
       UI
       ═══════════════════════════════════════════════════════════ */
    function ensureUI() {
        if (document.getElementById('alt-palette')) return;
        var wrap = document.createElement('div');
        wrap.id = 'alt-palette';
        wrap.className = 'alt-palette';
        wrap.setAttribute('role', 'dialog');
        wrap.setAttribute('aria-label', 'Command palette');
        wrap.setAttribute('aria-hidden', 'true');
        wrap.innerHTML =
            '<div class="alt-palette-backdrop"></div>' +
            '<div class="alt-palette-modal">' +
                '<div class="alt-palette-input-wrap">' +
                    '<i data-lucide="search"></i>' +
                    '<input type="text" id="alt-palette-input" class="alt-palette-input" ' +
                        'placeholder="Buscar comando, sección, contacto…" autocomplete="off">' +
                    '<kbd>Esc</kbd>' +
                '</div>' +
                '<div class="alt-palette-results" id="alt-palette-results"></div>' +
                '<div class="alt-palette-footer">' +
                    '<span><kbd>↑↓</kbd> navegar</span>' +
                    '<span><kbd>Enter</kbd> seleccionar</span>' +
                    '<span><kbd>Esc</kbd> cerrar</span>' +
                '</div>' +
            '</div>';
        document.body.appendChild(wrap);

        wrap.querySelector('.alt-palette-backdrop').addEventListener('click', close);
        var input = document.getElementById('alt-palette-input');
        input.addEventListener('input', function () {
            renderResults(input.value);
        });
    }

    function renderResults(query) {
        _filteredCommands = filterCommands(query);
        _selectedIndex = 0;
        var resultsEl = document.getElementById('alt-palette-results');
        if (!resultsEl) return;
        if (_filteredCommands.length === 0) {
            resultsEl.innerHTML = '<div class="alt-palette-empty">Sin resultados para "' + escTxt(query) + '"</div>';
            return;
        }
        // Group by category
        var byCategory = {};
        _filteredCommands.forEach(function (c) {
            var cat = c.category || 'Otros';
            if (!byCategory[cat]) byCategory[cat] = [];
            byCategory[cat].push(c);
        });
        var html = '';
        var globalIdx = 0;
        Object.keys(byCategory).forEach(function (cat) {
            html += '<div class="alt-palette-cat">' + escTxt(cat) + '</div>';
            byCategory[cat].forEach(function (c) {
                var isSelected = globalIdx === _selectedIndex;
                html += '<button class="alt-palette-item' + (isSelected ? ' selected' : '') + '" ' +
                    'data-cmd-idx="' + globalIdx + '">' +
                    '<i data-lucide="' + escTxt(c.icon || 'arrow-right') + '"></i>' +
                    '<span>' + escTxt(c.label) + '</span>' +
                '</button>';
                globalIdx++;
            });
        });
        resultsEl.innerHTML = html;
        if (window.AltorraIcons) window.AltorraIcons.refresh(resultsEl);
        else if (window.lucide) try { window.lucide.createIcons({ context: resultsEl }); } catch (e) {}

        // Scroll selected en vista
        var selEl = resultsEl.querySelector('.alt-palette-item.selected');
        if (selEl && selEl.scrollIntoView) selEl.scrollIntoView({ block: 'nearest' });
    }

    function escTxt(s) {
        var d = document.createElement('div');
        d.textContent = s == null ? '' : String(s);
        return d.innerHTML;
    }

    function moveSelection(delta) {
        if (_filteredCommands.length === 0) return;
        _selectedIndex = (_selectedIndex + delta + _filteredCommands.length) % _filteredCommands.length;
        // Re-render solo classes
        var items = document.querySelectorAll('.alt-palette-item');
        items.forEach(function (el, i) {
            el.classList.toggle('selected', i === _selectedIndex);
            if (i === _selectedIndex && el.scrollIntoView) {
                el.scrollIntoView({ block: 'nearest' });
            }
        });
    }

    function executeSelected() {
        if (_filteredCommands.length === 0) return;
        var cmd = _filteredCommands[_selectedIndex];
        if (cmd && cmd.action) {
            try { cmd.action(); }
            catch (e) { console.warn('[Palette] action failed:', e.message); }
        }
        close();
    }

    function open() {
        ensureUI();
        var wrap = document.getElementById('alt-palette');
        wrap.setAttribute('aria-hidden', 'false');
        wrap.classList.add('alt-palette-open');
        _isOpen = true;
        var input = document.getElementById('alt-palette-input');
        if (input) {
            input.value = '';
            input.focus();
        }
        renderResults('');
    }

    function close() {
        var wrap = document.getElementById('alt-palette');
        if (wrap) {
            wrap.setAttribute('aria-hidden', 'true');
            wrap.classList.remove('alt-palette-open');
        }
        _isOpen = false;
    }

    function toggle() { _isOpen ? close() : open(); }

    /* ═══════════════════════════════════════════════════════════
       KEYBOARD SHORTCUTS
       ═══════════════════════════════════════════════════════════ */
    document.addEventListener('keydown', function (e) {
        // Cmd+K / Ctrl+K abre el palette
        if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
            e.preventDefault();
            toggle();
            return;
        }
        if (!_isOpen) return;
        if (e.key === 'Escape') {
            e.preventDefault();
            close();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            moveSelection(1);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            moveSelection(-1);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            executeSelected();
        }
    });

    // Click en resultado lo ejecuta
    document.addEventListener('click', function (e) {
        var item = e.target.closest && e.target.closest('.alt-palette-item');
        if (item) {
            var idx = parseInt(item.getAttribute('data-cmd-idx'), 10);
            if (!isNaN(idx)) {
                _selectedIndex = idx;
                executeSelected();
            }
        }
    });

    /* ═══════════════════════════════════════════════════════════
       Public API
       ═══════════════════════════════════════════════════════════ */
    window.AltorraPalette = {
        open: open,
        close: close,
        toggle: toggle,
        // Debug
        _buildCommands: buildCommands
    };
})();
