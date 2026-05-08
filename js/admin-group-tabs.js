/**
 * ALTORRA ADMIN — Group Tabs (§42 ADR-042)
 * ============================================
 * Replica el patrón visual de las tabs internas del CRM
 * (`.crm-tabstrip`/`.crm-tab`) en las secciones que pertenecen
 * a un GRUPO (Inventario / Hub / Config). Cada sección hermana
 * recibe un tabstrip al inicio que permite navegar entre las
 * otras secciones del grupo.
 *
 * Antes (§36.3 → §40): un `<nav id="atnSubnav">` flotante en
 * <main> con position:sticky. Múltiples bugs de visibilidad por
 * stacking contexts y notifyChange faltante en el router.
 *
 * Ahora (§42): inyección runtime de un `.section-tabstrip` al
 * INICIO de cada sección activa que pertenezca a un grupo.
 * Visualmente idéntico al patrón CRM. Sin position:sticky ni
 * stacking issues.
 *
 * Click en tab → AltorraSections.go(sectionHermana).
 *
 * NO crea MutationObservers globales (CLAUDE.md §17.12).
 * NO usa pointermove (CLAUDE.md §35).
 */
(function () {
    'use strict';
    if (window.AltorraGroupTabs) return;

    /* ─── Definición de grupos ─── */
    var GROUPS = {
        inventario: {
            color: 'gold',
            sections: [
                { id: 'vehicles', label: 'Vehículos', icon: 'car' },
                { id: 'brands',   label: 'Marcas',    icon: 'tag' },
                { id: 'dealers',  label: 'Aliados',   icon: 'handshake' },
                { id: 'banners',  label: 'Banners',   icon: 'image' },
                { id: 'reviews',  label: 'Reseñas',   icon: 'star' }
            ]
        },
        hub: {
            color: 'green',
            sections: [
                { id: 'concierge', label: 'ALTOR Hub',         icon: 'message-square-text' },
                { id: 'kb',        label: 'Cerebro AI',        icon: 'brain' },
                { id: 'unmatched', label: 'Lo que no entendí', icon: 'message-circle-question' }
            ]
        },
        config: {
            color: 'neutral',
            sections: [
                { id: 'users',     label: 'Usuarios',  icon: 'users' },
                { id: 'lists',     label: 'Atributos', icon: 'list-tree' },
                { id: 'workflows', label: 'Workflows', icon: 'zap' },
                { id: 'audit',     label: 'Auditoría', icon: 'scroll-text' },
                { id: 'settings',  label: 'Ajustes',   icon: 'settings' }
            ]
        }
    };

    /* Reverse map: sectionId → groupKey */
    var SECTION_TO_GROUP = (function () {
        var map = {};
        Object.keys(GROUPS).forEach(function (gKey) {
            GROUPS[gKey].sections.forEach(function (s) { map[s.id] = gKey; });
        });
        return map;
    })();

    function findGroup(sectionId) {
        var gKey = SECTION_TO_GROUP[sectionId];
        if (!gKey) return null;
        return { key: gKey, color: GROUPS[gKey].color, sections: GROUPS[gKey].sections };
    }

    function escapeHtml(s) {
        return String(s || '').replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    /* ─── Build tabstrip HTML ─── */
    function buildTabstripHTML(group, activeSectionId) {
        var html = '<div class="section-tabstrip" data-group-color="'
                 + escapeHtml(group.color) + '" role="tablist">';
        group.sections.forEach(function (s) {
            var isActive = s.id === activeSectionId;
            html += '<button class="section-tab' + (isActive ? ' is-active' : '') + '" '
                  + 'type="button" '
                  + 'data-section-tab="' + escapeHtml(s.id) + '" '
                  + 'role="tab" '
                  + 'aria-selected="' + (isActive ? 'true' : 'false') + '">'
                  + '<i data-lucide="' + escapeHtml(s.icon) + '"></i>'
                  + '<span>' + escapeHtml(s.label) + '</span>'
                  + '</button>';
        });
        html += '</div>';
        return html;
    }

    /* ─── Inyectar o actualizar tabstrip en sec-X ─── */
    function applyToSection(sectionId) {
        if (!sectionId) return;
        var group = findGroup(sectionId);
        if (!group) return; // sección no pertenece a un grupo, no hacer nada
        var sectionEl = document.getElementById('sec-' + sectionId);
        if (!sectionEl) return;

        // Idempotencia: si ya existe un tabstrip de este grupo, solo actualizar active
        var existing = sectionEl.querySelector(':scope > .section-tabstrip');
        if (existing && existing.getAttribute('data-group-color') === group.color) {
            existing.querySelectorAll('.section-tab').forEach(function (btn) {
                var sid = btn.getAttribute('data-section-tab');
                var on = sid === sectionId;
                btn.classList.toggle('is-active', on);
                btn.setAttribute('aria-selected', on ? 'true' : 'false');
            });
            return;
        }

        // Si había un tabstrip de OTRO grupo (raro, pero posible si la sección
        // se reasigna), eliminarlo antes de inyectar el nuevo.
        if (existing) existing.remove();

        // Inyectar al INICIO de la sección
        sectionEl.insertAdjacentHTML('afterbegin', buildTabstripHTML(group, sectionId));

        // Refrescar iconos Lucide en la nueva tabstrip
        if (window.AltorraIcons && typeof window.AltorraIcons.refresh === 'function') {
            window.AltorraIcons.refresh(sectionEl);
        } else if (window.lucide && typeof window.lucide.createIcons === 'function') {
            try { window.lucide.createIcons(); } catch (e) {}
        }
    }

    /* ─── Pre-inyectar tabstrips en TODAS las secciones de grupos ───
       Para que cuando el usuario navegue, ya estén listas.
       Idempotente: si ya existen, sólo actualiza active. */
    function preInjectAll() {
        Object.keys(GROUPS).forEach(function (gKey) {
            GROUPS[gKey].sections.forEach(function (s) {
                applyToSection(s.id);
            });
        });
        // Update con la sección actual activa para marcar correctamente
        if (window.AltorraSections && window.AltorraSections.current) {
            var current = window.AltorraSections.current();
            if (current) applyToSection(current);
        }
    }

    /* ─── Click handler — navegar a sección hermana ─── */
    function handleTabClick(e) {
        var btn = e.target && e.target.closest && e.target.closest('[data-section-tab]');
        if (!btn) return;
        var sid = btn.getAttribute('data-section-tab');
        if (sid && window.AltorraSections && typeof window.AltorraSections.go === 'function') {
            e.preventDefault();
            window.AltorraSections.go(sid);
        }
    }

    /* ─── Init ─── */
    function init() {
        document.addEventListener('click', handleTabClick);

        // Pre-inyectar en TODAS las secciones de grupos
        preInjectAll();

        // Suscribir a cambios de sección para actualizar el active state
        if (window.AltorraSections && typeof window.AltorraSections.onChange === 'function') {
            window.AltorraSections.onChange(function (section) {
                applyToSection(section);
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    /* ─── Public API (para debugging) ─── */
    window.AltorraGroupTabs = {
        groups: GROUPS,
        applyToSection: applyToSection,
        preInjectAll: preInjectAll
    };
})();
