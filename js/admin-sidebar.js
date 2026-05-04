/**
 * ALTORRA CARS — Admin sidebar (Mega-Plan v4, Microfase B.1)
 * ============================================================
 * Collapsible groups in the sidebar with localStorage persistence
 * per-user. Keyboard navigation. Section deep-link via URL hash.
 *
 * Each group has:
 *   - data-group="<key>"       — identifier for persistence
 *   - aria-expanded             — current state on header
 *   - aria-controls             — points to items div
 *
 * Persistence key: altorra-sidebar-<group> = '0' (collapsed) | '1' (expanded)
 *
 * Keyboard:
 *   - Arrow Up/Down: navigate between focusable nav-items
 *   - Enter/Space on group header: toggle expanded
 *   - Home/End: jump to first/last nav-item
 */
(function () {
    'use strict';
    if (window.AltorraSidebar) return;

    var STORAGE_PREFIX = 'altorra-sidebar-';

    function getStored(group) {
        try { return localStorage.getItem(STORAGE_PREFIX + group); }
        catch (e) { return null; }
    }
    function setStored(group, value) {
        try { localStorage.setItem(STORAGE_PREFIX + group, value); }
        catch (e) {}
    }

    function getHeader(group) {
        return document.querySelector('.nav-group[data-group="' + group + '"] .nav-group-header');
    }
    function getItems(group) {
        return document.querySelector('.nav-group[data-group="' + group + '"] .nav-group-items');
    }

    function setExpanded(group, expanded) {
        var header = getHeader(group);
        if (!header) return;
        header.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        setStored(group, expanded ? '1' : '0');
    }

    function toggle(group) {
        var header = getHeader(group);
        if (!header) return;
        var expanded = header.getAttribute('aria-expanded') === 'true';
        setExpanded(group, !expanded);
    }

    /** Restore persisted state for all groups */
    function restoreState() {
        document.querySelectorAll('.nav-group[data-group]').forEach(function (group) {
            var key = group.getAttribute('data-group');
            var stored = getStored(key);
            if (stored === '0') {
                setExpanded(key, false);
            } else if (stored === '1') {
                setExpanded(key, true);
            }
            // null stored: respect HTML default (aria-expanded already set)
        });
    }

    /** Auto-expand the group containing the active section */
    function expandActiveGroup() {
        var active = document.querySelector('.nav-group .nav-item.active');
        if (!active) return;
        var group = active.closest('.nav-group');
        if (!group) return;
        var key = group.getAttribute('data-group');
        if (key) setExpanded(key, true);
    }

    /** Wire group header clicks */
    function attachListeners() {
        document.addEventListener('click', function (e) {
            var header = e.target.closest('.nav-group-header');
            if (!header) return;
            var group = header.closest('.nav-group');
            if (!group) return;
            toggle(group.getAttribute('data-group'));
        });

        // Keyboard nav within sidebar
        document.addEventListener('keydown', function (e) {
            var sidebar = e.target.closest('#adminSidebar');
            if (!sidebar) return;

            // Enter/Space on group header → toggle (already a button, default works)
            // ArrowDown/Up — navigate focusable items
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                var focusables = Array.from(sidebar.querySelectorAll('.nav-item:not(:disabled), .nav-group-header'));
                var idx = focusables.indexOf(document.activeElement);
                if (idx === -1) return;
                var next = e.key === 'ArrowDown' ? idx + 1 : idx - 1;
                if (next >= 0 && next < focusables.length) {
                    focusables[next].focus();
                }
            } else if (e.key === 'Home') {
                e.preventDefault();
                var first = sidebar.querySelector('.nav-item:not(:disabled), .nav-group-header');
                if (first) first.focus();
            } else if (e.key === 'End') {
                e.preventDefault();
                var allItems = sidebar.querySelectorAll('.nav-item:not(:disabled), .nav-group-header');
                if (allItems.length) allItems[allItems.length - 1].focus();
            }
        });
    }

    /** Section change observer — re-expand the active group when navigation happens */
    function observeSectionChanges() {
        // The existing admin code adds .active to nav-items when section changes.
        // We listen for that via MutationObserver on the sidebar.
        if (typeof MutationObserver === 'undefined') return;
        var sidebar = document.getElementById('adminSidebar');
        if (!sidebar) return;
        var obs = new MutationObserver(function (mutations) {
            mutations.forEach(function (m) {
                if (m.type === 'attributes' && m.attributeName === 'class' && m.target.classList.contains('active')) {
                    expandActiveGroup();
                }
            });
        });
        obs.observe(sidebar, { attributes: true, subtree: true, attributeFilter: ['class'] });
    }

    /* ═══════════════════════════════════════════════════════════
       B.4 — Global sidebar collapse (icon-only mode)
       ═══════════════════════════════════════════════════════════ */
    var COLLAPSE_KEY = 'altorra-sidebar-collapsed';

    function isCollapsed() {
        return document.body.classList.contains('sidebar-collapsed');
    }

    function setCollapsed(collapsed) {
        if (collapsed) {
            document.body.classList.add('sidebar-collapsed');
        } else {
            document.body.classList.remove('sidebar-collapsed');
        }
        try { localStorage.setItem(COLLAPSE_KEY, collapsed ? '1' : '0'); } catch (e) {}
        // Update aria-label of toggle button
        var btn = document.getElementById('sidebarCollapseBtn');
        if (btn) {
            btn.setAttribute('aria-label', collapsed ? 'Expandir sidebar' : 'Colapsar sidebar');
        }
    }

    function toggleCollapsed() {
        setCollapsed(!isCollapsed());
    }

    function restoreCollapseState() {
        try {
            var v = localStorage.getItem(COLLAPSE_KEY);
            if (v === '1') setCollapsed(true);
        } catch (e) {}
    }

    function attachCollapseListeners() {
        var btn = document.getElementById('sidebarCollapseBtn');
        if (btn) btn.addEventListener('click', toggleCollapsed);

        // Keyboard shortcut: Cmd/Ctrl + B
        document.addEventListener('keydown', function (e) {
            if ((e.metaKey || e.ctrlKey) && e.key && e.key.toLowerCase() === 'b' && !e.shiftKey && !e.altKey) {
                // Don't trigger if focus is in input/textarea/contenteditable
                var t = e.target;
                if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
                e.preventDefault();
                toggleCollapsed();
            }
        });
    }

    /** Set aria-label on nav-items based on their <span> text — used by
        collapsed-mode tooltip CSS that reads from aria-label */
    function syncAriaLabels() {
        document.querySelectorAll('#adminSidebar .nav-item').forEach(function (btn) {
            if (btn.getAttribute('aria-label')) return;
            var span = btn.querySelector('span:not(.nav-badge)');
            if (span) btn.setAttribute('aria-label', span.textContent.trim());
        });
        document.querySelectorAll('#adminSidebar .nav-group-header').forEach(function (btn) {
            if (btn.getAttribute('aria-label')) return;
            var label = btn.querySelector('.nav-group-label');
            if (label) btn.setAttribute('aria-label', label.textContent.trim());
        });
    }

    function init() {
        restoreState();
        restoreCollapseState();
        syncAriaLabels();
        attachListeners();
        attachCollapseListeners();
        expandActiveGroup();
        observeSectionChanges();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.AltorraSidebar = {
        toggle: toggle,
        setExpanded: setExpanded,
        restoreState: restoreState,
        // B.4 collapse API
        toggleCollapsed: toggleCollapsed,
        setCollapsed: setCollapsed,
        isCollapsed: isCollapsed
    };
})();
