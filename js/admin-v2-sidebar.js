/**
 * ALTORRA ADMIN V2 — Sidebar Island Collapse (Sprint V2-3)
 * =========================================================
 * Toggle collapse del sidebar con persistencia + atajo ⌘+B / Ctrl+B
 * + tooltips automáticos en estado collapsed (data-tooltip-text)
 * + animación spring suave 0.36s.
 */
(function () {
    'use strict';
    if (window.AltorraV2Sidebar) return;

    var COLLAPSE_KEY = 'av2_sidebar_collapsed';

    function init() {
        var panel = document.querySelector('.admin-panel.admin-layout');
        if (!panel) {
            // Fallback en cualquier .admin-panel
            panel = document.querySelector('.admin-panel');
        }
        if (!panel) {
            // Retry
            setTimeout(init, 300);
            return;
        }

        // 1. Restaurar estado persistido
        try {
            if (localStorage.getItem(COLLAPSE_KEY) === '1') {
                panel.classList.add('is-sidebar-collapsed');
                document.body.classList.add('is-sidebar-collapsed');
            }
        } catch (e) {}

        // 2. Auto-añadir tooltip-text a cada nav-item con data-section
        document.querySelectorAll('.sidebar .nav-item[data-section]').forEach(function (item) {
            if (!item.hasAttribute('data-tooltip-text')) {
                var label = item.querySelector('span');
                if (label && label.textContent) {
                    item.setAttribute('data-tooltip-text', label.textContent.trim());
                }
            }
        });

        // 3. Encontrar/crear el botón collapse
        var btn = document.getElementById('sidebarCollapseBtn') ||
                  document.getElementById('av2CollapseBtn') ||
                  document.querySelector('.sidebar-collapse-btn');

        // 4. Toggle handler
        function toggleCollapse() {
            var collapsed = panel.classList.toggle('is-sidebar-collapsed');
            document.body.classList.toggle('is-sidebar-collapsed', collapsed);
            try { localStorage.setItem(COLLAPSE_KEY, collapsed ? '1' : '0'); } catch (e) {}

            // Actualizar icon del botón
            if (btn) {
                var icon = btn.querySelector('[data-lucide]');
                if (icon) {
                    icon.setAttribute('data-lucide',
                        collapsed ? 'panel-left-open' : 'panel-left-close');
                    if (window.lucide && window.lucide.createIcons) {
                        try { window.lucide.createIcons(); } catch (e) {}
                    }
                    if (window.AltorraIcons && window.AltorraIcons.refresh) {
                        try { window.AltorraIcons.refresh(btn); } catch (e) {}
                    }
                }
            }

            // Notificar a otros módulos
            document.dispatchEvent(new CustomEvent('av2:sidebar-toggled', {
                detail: { collapsed: collapsed }
            }));
        }

        if (btn) {
            btn.addEventListener('click', toggleCollapse);
        }

        // 5. Atajo ⌘+B (Mac) / Ctrl+B (Win/Linux)
        document.addEventListener('keydown', function (e) {
            if ((e.metaKey || e.ctrlKey) && (e.key === 'b' || e.key === 'B')) {
                // Solo si NO estamos en input/textarea/contenteditable
                var active = document.activeElement;
                if (active && (
                    active.tagName === 'INPUT' ||
                    active.tagName === 'TEXTAREA' ||
                    active.isContentEditable
                )) {
                    return;
                }
                e.preventDefault();
                toggleCollapse();
            }
        });

        // 6. Mobile: handler para hamburger
        var hamburger = document.getElementById('hamburgerBtn') ||
                        document.querySelector('.hamburger-btn') ||
                        document.querySelector('[data-action="toggle-sidebar"]');
        if (hamburger) {
            hamburger.addEventListener('click', function (e) {
                e.preventDefault();
                document.body.classList.toggle('is-sidebar-open');
            });
        }

        // 7. Mobile: cerrar sidebar al click fuera (en el scrim)
        document.body.addEventListener('click', function (e) {
            if (!document.body.classList.contains('is-sidebar-open')) return;
            if (window.innerWidth > 768) return;
            // Si el click NO fue dentro del sidebar ni en el hamburger
            var sidebar = document.querySelector('.sidebar') ||
                          document.querySelector('#adminSidebar');
            if (sidebar && sidebar.contains(e.target)) return;
            if (hamburger && hamburger.contains(e.target)) return;
            // Cerrar con click en cualquier otro lugar
            document.body.classList.remove('is-sidebar-open');
        });

        // 8. Mobile: cerrar sidebar al click en nav-item
        document.querySelectorAll('.sidebar .nav-item[data-section]').forEach(function (item) {
            item.addEventListener('click', function () {
                if (window.innerWidth <= 768) {
                    document.body.classList.remove('is-sidebar-open');
                }
            });
        });

        // 9. Esc cierra mobile drawer
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && document.body.classList.contains('is-sidebar-open')) {
                document.body.classList.remove('is-sidebar-open');
            }
        });

        window.AltorraV2Sidebar = {
            collapse: function () {
                if (!panel.classList.contains('is-sidebar-collapsed')) toggleCollapse();
            },
            expand: function () {
                if (panel.classList.contains('is-sidebar-collapsed')) toggleCollapse();
            },
            toggle: toggleCollapse,
            isCollapsed: function () {
                return panel.classList.contains('is-sidebar-collapsed');
            }
        };
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
