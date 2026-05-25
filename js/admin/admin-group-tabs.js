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

    /* ─── Definición de grupos ───
       Cada sub-sección puede tener un campo `permission` con el nombre
       del helper RBAC en window.AP que decide si el rol actual puede
       VER esa sección. Si NO se define `permission`, la sección es
       visible para todos los roles. (§43 ADR-043)

       Helpers RBAC disponibles en js/admin-state.js (líneas 78-86 + 274-313):
         AP.isSuperAdmin / AP.isEditor / AP.isViewer / AP.isEditorOrAbove
         AP.canManageUsers / AP.canCreateOrEditInventory / AP.canDeleteInventory
         AP.RBAC.canViewUsers / canViewDealers / canViewLists / canViewBanners
                .canViewReviews / canViewActivity / canManageUsers / etc.
    */
    var GROUPS = {
        inventario: {
            color: 'gold',
            sections: [
                { id: 'vehicles', label: 'Vehículos', icon: 'car' },        // todos
                { id: 'brands',   label: 'Marcas',    icon: 'tag' },        // todos
                { id: 'dealers',  label: 'Aliados',   icon: 'handshake' },  // editor+
                { id: 'banners',  label: 'Banners',   icon: 'image' },      // editor+
                { id: 'reviews',  label: 'Reseñas',   icon: 'star' }        // editor+
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
                // Usuarios SOLO visible para super_admin (canManageUsers)
                { id: 'users',     label: 'Usuarios',  icon: 'users',       permission: 'canManageUsers' },
                // §61.R2 — Roles también solo super_admin (rules backend lo enforce, frontend lo respeta para UX)
                { id: 'roles',     label: 'Roles',     icon: 'shield-check', permission: 'canManageUsers' },
                { id: 'lists',     label: 'Atributos', icon: 'list-tree' }, // todos
                { id: 'workflows', label: 'Workflows', icon: 'zap' },        // todos
                { id: 'audit',     label: 'Auditoría', icon: 'scroll-text' },// todos (canViewActivity = true)
                { id: 'settings',  label: 'Ajustes',   icon: 'settings' }    // todos
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

    /* §43 — RBAC: el rol actual puede VER esta sección? Si la sub-sección
       NO declara `permission`, retornamos true (visible para todos). Si
       declara una clave, buscamos el helper en AP.<key> o AP.RBAC.<key>.
       Defensivo: si AP no está cargado todavía, retornamos true (la
       sección se ocultará/mostrará al re-render cuando AP esté listo). */
    function canSee(section) {
        if (!section || !section.permission) return true;
        var AP = window.AP;
        if (!AP) return true; // AP aún no cargado — permitir por default
        var key = section.permission;
        if (typeof AP[key] === 'function') return !!AP[key]();
        if (AP.RBAC && typeof AP.RBAC[key] === 'function') return !!AP.RBAC[key]();
        return true; // helper no encontrado → no bloquear
    }

    /* §43 — Devuelve el ID de la PRIMERA sub-sección permitida del grupo
       para el rol actual. Usado por admin-topnav.js cuando se clickea un
       tab grupo: en lugar de ir al default (que puede estar bloqueado),
       redirigir a la primera permitida. Retorna null si NINGUNA es
       accesible (raro — el tab grupo nunca debería verse en ese caso). */
    function firstAllowedSection(groupKey) {
        var g = GROUPS[groupKey];
        if (!g) return null;
        for (var i = 0; i < g.sections.length; i++) {
            if (canSee(g.sections[i])) return g.sections[i].id;
        }
        return null;
    }

    /* ─── Build tabstrip HTML ─── */
    function buildTabstripHTML(group, activeSectionId) {
        // §43 — Filtrar las sub-secciones según permisos del rol actual.
        // Si una tab no es accesible, NO se renderiza (no aparece en la UI).
        var visibleSections = group.sections.filter(canSee);

        var html = '<div class="section-tabstrip" data-group-color="'
                 + escapeHtml(group.color) + '" role="tablist">';
        visibleSections.forEach(function (s) {
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

        // §43 — Calculamos las tabs visibles según permisos del rol actual.
        // Si AP cargó después de la pre-inyección, el conteo puede haber
        // cambiado (ej: editor login → ya no debe ver "Usuarios").
        var visibleCount = group.sections.filter(canSee).length;

        // Idempotencia: si ya existe un tabstrip de este grupo Y el conteo
        // de tabs visibles coincide con lo que tiene actualmente, solo
        // actualizamos is-active. Si difiere, reemplazamos HTML completo.
        var existing = sectionEl.querySelector(':scope > .section-tabstrip');
        if (existing && existing.getAttribute('data-group-color') === group.color) {
            var currentCount = existing.querySelectorAll('.section-tab').length;
            if (currentCount === visibleCount) {
                existing.querySelectorAll('.section-tab').forEach(function (btn) {
                    var sid = btn.getAttribute('data-section-tab');
                    var on = sid === sectionId;
                    btn.classList.toggle('is-active', on);
                    btn.setAttribute('aria-selected', on ? 'true' : 'false');
                });
                return;
            }
            // Conteo difiere → reemplazar HTML completo abajo
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

    /* §43 — Track del rol activo. Cuando login resuelve y AP.currentUserRole
       cambia (de null → 'editor', etc.), corremos preInjectAll() de nuevo
       para que los tabstrips se reconstruyan con el filtro RBAC correcto. */
    var _lastRoleSeen = null;

    /* ─── Pre-inyectar tabstrips en TODAS las secciones de grupos ───
       Para que cuando el usuario navegue, ya estén listas.
       Idempotente: si ya existen Y el conteo coincide, sólo actualiza
       is-active. Si el rol cambió y el conteo difiere, se reemplaza HTML. */
    function preInjectAll() {
        _lastRoleSeen = (window.AP && window.AP.currentUserRole) || null;
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
                // §43 — Si el rol del usuario cambió desde el último onChange
                // (típicamente login: null → 'super_admin'/'editor'/'viewer'),
                // re-aplicar a TODOS los grupos para que el filtro RBAC se
                // ajuste a las nuevas tabs visibles.
                var currentRole = (window.AP && window.AP.currentUserRole) || null;
                if (currentRole !== _lastRoleSeen) {
                    preInjectAll();
                } else {
                    applyToSection(section);
                }
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    /* ─── Public API ─── */
    window.AltorraGroupTabs = {
        groups: GROUPS,
        applyToSection: applyToSection,
        preInjectAll: preInjectAll,
        // §43 — Helpers RBAC consumidos por admin-topnav.js handleNavClick
        firstAllowedSection: firstAllowedSection,
        canSee: canSee
    };
})();
