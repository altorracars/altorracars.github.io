/**
 * ALTORRA ADMIN — Top Navigation wiring (§36 ADR-036)
 * ====================================================
 * - Click en .atn-tab → AltorraSections.go(section)
 * - Active state sync con AltorraSections.onChange
 * - Mounta el bell del notify center en el slot del topnav
 * - Sync user info (nombre/email/rol/avatar) desde AP.currentUserProfile
 * - Logout button en menú user
 * - ⌘K trigger abre command palette si está disponible
 * - Activity feed trigger
 * - Click fuera de menus los cierra
 * - Mobile: tab activo se centra en scroll-x al cambiar
 *
 * NO crea MutationObservers globales (CLAUDE.md §17.12).
 * NO usa pointermove (CLAUDE.md §35).
 */
(function () {
    'use strict';
    if (window.AltorraTopNav) return;

    function $(id) { return document.getElementById(id); }

    var topnav = null;
    var subnavEl = null;
    var subnavTabsEl = null;
    var _userMenuOpen = false;
    var _lastRenderedGroup = null;

    /* §36.3 — SUBNAV CONFIG (sub-secciones por grupo del top-tab) */
    var SUBNAV_GROUPS = {
        inventario: [
            { section: 'vehicles', label: 'Vehículos', icon: 'car' },
            { section: 'brands',   label: 'Marcas',    icon: 'tag' },
            { section: 'dealers',  label: 'Aliados',   icon: 'handshake' },
            { section: 'banners',  label: 'Banners',   icon: 'image' },
            { section: 'reviews',  label: 'Reseñas',   icon: 'star' }
        ],
        hub: [
            { section: 'concierge', label: 'ALTOR Hub',         icon: 'message-square-text' },
            { section: 'kb',        label: 'Cerebro AI',        icon: 'brain' },
            { section: 'unmatched', label: 'Lo que no entendí', icon: 'message-circle-question' }
        ],
        config: [
            { section: 'users',     label: 'Usuarios',  icon: 'users' },
            { section: 'lists',     label: 'Atributos', icon: 'list-tree' },
            { section: 'workflows', label: 'Workflows', icon: 'zap' },
            { section: 'audit',     label: 'Auditoría', icon: 'scroll-text' },
            { section: 'settings',  label: 'Ajustes',   icon: 'settings' }
        ]
    };

    /* Reverse map — section → which top-tab group le pertenece */
    var SECTION_TO_GROUP = (function () {
        var map = {};
        Object.keys(SUBNAV_GROUPS).forEach(function (group) {
            SUBNAV_GROUPS[group].forEach(function (item) { map[item.section] = group; });
        });
        return map;
    })();

    /* §42 — DEPRECATED. El subnav contextual flotante fue reemplazado
       por tabs internos inyectados por js/admin-group-tabs.js DENTRO
       de cada sección, replicando el patrón visual de .crm-tabstrip.
       Esta función queda como no-op por compat. SECTION_TO_GROUP y
       SUBNAV_GROUPS arriba se mantienen porque setActiveSection los
       usa para marcar el tab grupo activo en el topnav (NO para
       renderizar subnav, eso ahora lo hace admin-group-tabs.js).
       El elemento <nav id="atnSubnav"> ya no existe en el HTML. */
    function renderSubnav(activeSection) {
        // No-op intencional. Subnav legacy eliminado en §42.
    }

    /* User menu posicionado dinámicamente alineado a la derecha del chip */
    function positionUserMenu() {
        var userChip = $('atnUser');
        var menu = userChip ? userChip.querySelector('.atn-user-menu') : null;
        if (!userChip || !menu) return;
        var rect = userChip.getBoundingClientRect();
        menu.style.top = (rect.bottom + 6) + 'px';
        menu.style.right = (window.innerWidth - rect.right) + 'px';
        menu.style.left = 'auto';
    }

    function bindMenuPositioning() {
        var userChip = $('atnUser');
        if (userChip) {
            userChip.addEventListener('click', positionUserMenu);
            userChip.addEventListener('focusin', positionUserMenu);
        }
        window.addEventListener('resize', function () {
            if (userChip && userChip.getAttribute('aria-expanded') === 'true') {
                positionUserMenu();
            }
        });
    }

    /* ─── Wire clicks de topnav + subnav ─── */
    function handleNavClick(e) {
        // Tab o subnav-tab con data-atn-section
        var btn = e.target && e.target.closest && e.target.closest('[data-atn-section]');
        if (btn) {
            var section = btn.getAttribute('data-atn-section');
            if (section && window.AltorraSections && window.AltorraSections.go) {
                e.preventDefault();
                window.AltorraSections.go(section);
                // Cerrar user menu si estaba abierto
                var userOpen = topnav && topnav.querySelector('.atn-user[aria-expanded="true"]');
                if (userOpen) {
                    userOpen.setAttribute('aria-expanded', 'false');
                    _userMenuOpen = false;
                }
            }
            return;
        }

        // Trigger Ctrl+K palette
        var searchBtn = e.target && e.target.closest && e.target.closest('#atnSearchTrigger');
        if (searchBtn) {
            e.preventDefault();
            openPalette();
            return;
        }

        // Trigger activity feed
        var actBtn = e.target && e.target.closest && e.target.closest('#atnActivityTrigger');
        if (actBtn) {
            e.preventDefault();
            triggerActivity();
            return;
        }

        // Logout
        var logoutBtn = e.target && e.target.closest && e.target.closest('#atnLogoutBtn');
        if (logoutBtn) {
            e.preventDefault();
            triggerLogout();
            return;
        }

        // User chip click → toggle menu
        var userChip = e.target && e.target.closest && e.target.closest('#atnUser');
        if (userChip) {
            _userMenuOpen = !_userMenuOpen;
            userChip.setAttribute('aria-expanded', _userMenuOpen ? 'true' : 'false');
            if (_userMenuOpen) positionUserMenu();
            return;
        }
    }

    function wireTabs() {
        topnav = $('adminTopNav');
        subnavEl = $('atnSubnav');
        if (!topnav) return;

        topnav.addEventListener('click', handleNavClick);
        if (subnavEl) subnavEl.addEventListener('click', handleNavClick);

        // Keyboard: Esc cierra user menu
        document.addEventListener('keydown', function (e) {
            if (e.key !== 'Escape') return;
            var userChip = $('atnUser');
            if (userChip && userChip.getAttribute('aria-expanded') === 'true') {
                userChip.setAttribute('aria-expanded', 'false');
                _userMenuOpen = false;
            }
        });

        // Click fuera del topnav cierra user menu
        document.addEventListener('click', function (e) {
            if (!topnav) return;
            var userChip = $('atnUser');
            if (!userChip) return;
            if (userChip.contains(e.target)) return;
            if (userChip.getAttribute('aria-expanded') === 'true') {
                userChip.setAttribute('aria-expanded', 'false');
                _userMenuOpen = false;
            }
        });
    }

    /* ─── Active state sync ─── */
    function setActiveSection(section) {
        if (!topnav) return;

        // Limpiar active de todos los tabs principales
        topnav.querySelectorAll('.atn-tab').forEach(function (el) {
            el.classList.remove('is-active');
            el.setAttribute('aria-selected', 'false');
        });

        if (!section) {
            renderSubnav(null);
            return;
        }

        // §36.3 — Match directo (Inicio/CRM/Agenda/Reportes que NO tienen subs)
        var direct = topnav.querySelector('.atn-tab[data-atn-section="' + section + '"]');
        if (direct) {
            direct.classList.add('is-active');
            direct.setAttribute('aria-selected', 'true');
        }

        // §36.3 — Si la sección pertenece a un grupo (inventario/hub/config),
        // marcamos el TAB GRUPO correspondiente aunque la sección actual no
        // sea el "default" del grupo.
        var group = SECTION_TO_GROUP[section];
        if (group) {
            var groupTab = topnav.querySelector('.atn-tab[data-atn-group="' + group + '"]');
            if (groupTab) {
                groupTab.classList.add('is-active');
                groupTab.setAttribute('aria-selected', 'true');
            }
        }

        // §36.3 — Render contextual subnav (muestra/oculta + marca tab interno)
        renderSubnav(section);

        // Centrar tab activo en scroll-x mobile
        if (window.innerWidth < 900) {
            var activeTab = topnav.querySelector('.atn-tabs .atn-tab.is-active');
            if (activeTab && activeTab.scrollIntoView) {
                try {
                    activeTab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                } catch (e) {}
            }
        }
    }

    /* ─── Open palette (⌘K) ─── */
    function openPalette() {
        if (window.AltorraPalette && typeof window.AltorraPalette.open === 'function') {
            window.AltorraPalette.open();
            return;
        }
        if (window.AltorraCommandPalette && typeof window.AltorraCommandPalette.open === 'function') {
            window.AltorraCommandPalette.open();
            return;
        }
        // Fallback: simular ⌘K keystroke
        var event = new KeyboardEvent('keydown', {
            key: 'k', code: 'KeyK',
            ctrlKey: true, metaKey: true,
            bubbles: true, cancelable: true
        });
        document.dispatchEvent(event);
    }

    /* ─── Trigger activity feed ─── */
    function triggerActivity() {
        // Reusa el botón existente del header viejo (ya wired)
        var legacyBtn = $('activityFeedTrigger');
        if (legacyBtn && legacyBtn !== $('atnActivityTrigger')) {
            legacyBtn.click();
            return;
        }
        if (window.AltorraActivityFeed && typeof window.AltorraActivityFeed.toggle === 'function') {
            window.AltorraActivityFeed.toggle();
        }
    }

    /* ─── Logout ─── */
    function triggerLogout() {
        var legacyLogout = $('logoutBtn');
        if (legacyLogout) {
            legacyLogout.click();
            return;
        }
        if (window.auth && typeof window.auth.signOut === 'function') {
            window.auth.signOut();
        }
    }

    /* ─── Sync user chip con AP.currentUserProfile ─── */
    function syncUser() {
        var profile = (window.AP && window.AP.currentUserProfile) || null;
        if (!profile) return;

        var name = profile.nombre || profile.email || 'Admin';
        var email = profile.email || '';
        var rol = profile.rol || '';
        var cargo = profile.cargo || ''; // §36.1 — campo cargo opcional (override del rol)
        var photo = profile.photoURL || profile.avatarURL || '';
        var initials = (profile.nombre || profile.email || 'A')
            .split(' ').map(function (w) { return w.charAt(0); })
            .join('').substring(0, 2).toUpperCase();

        // Si hay cargo personalizado, mostrarlo. Sino, usar label humano del rol.
        var displayRole = cargo || roleLabel(rol);

        var nameEl = $('atnUserName');
        var roleEl = $('atnUserRole');
        var avatarEl = $('atnUserAvatar');
        var menuName = $('atnUserMenuName');
        var menuEmail = $('atnUserMenuEmail');
        var menuRole = $('atnUserMenuRole');
        var menuAvatar = $('atnUserMenuAvatar');

        if (nameEl) nameEl.textContent = name;
        if (roleEl) roleEl.textContent = displayRole;
        if (menuName) menuName.textContent = name;
        if (menuEmail) menuEmail.textContent = email;
        if (menuRole) menuRole.textContent = displayRole;

        var avatarHTML = photo
            ? '<img src="' + escapeHTML(photo) + '" alt="" onerror="this.parentNode.textContent=\'' + initials + '\'">'
            : initials;
        if (avatarEl) {
            avatarEl.innerHTML = avatarHTML;
        }
        if (menuAvatar) {
            menuAvatar.innerHTML = avatarHTML;
        }
    }

    /**
     * §36.2 — Labels humanos compactos (Stripe/Linear/Notion pattern).
     * Cuando el usuario seteea `profile.cargo` custom, se muestra ese.
     * El default es corto y profesional.
     */
    function roleLabel(rol) {
        var key = String(rol || '').toLowerCase();
        if (key === 'super_admin') return 'Administrador';
        if (key === 'editor')      return 'Editor';
        if (key === 'viewer')      return 'Lector';
        if (key === 'admin')       return 'Administrador';
        return rol ? rol.charAt(0).toUpperCase() + rol.slice(1) : 'Miembro';
    }

    /* §36.1 — Detect Mac vs PC + actualizar kbd label */
    function syncKbdLabel() {
        var kbd = $('atnSearchKbd');
        if (!kbd) return;
        var isMac = false;
        try {
            isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent || '');
        } catch (e) {}
        kbd.textContent = isMac ? '⌘K' : 'Ctrl+K';
    }

    function escapeHTML(s) {
        return String(s || '').replace(/[<>&"']/g, function (c) {
            return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    /* ─── Sync notification bell ─── */
    function syncBell() {
        var slot = $('atnNotifBellSlot');
        var legacyBell = $('headerNotifBell');
        if (!slot || !legacyBell) return;
        // Si el bell legacy ya tiene el componente montado, lo movemos al slot
        if (legacyBell.children.length > 0 && slot.children.length === 0) {
            // Mover el contenido manteniendo eventos
            while (legacyBell.firstChild) {
                slot.appendChild(legacyBell.firstChild);
            }
        }
    }

    /* ─── Sync badges (CRM, Concierge) desde la sidebar legacy ─── */
    function syncBadges() {
        var pairs = [
            ['navBadgeCrm', 'atnBadgeCrm'],
            ['navBadgeConcierge', 'atnBadgeConcierge']
        ];
        pairs.forEach(function (pair) {
            var src = $(pair[0]);
            var dst = $(pair[1]);
            if (src && dst && dst.textContent !== src.textContent) {
                dst.textContent = src.textContent;
            }
        });
    }

    /* ─── Init ─── */
    function init() {
        wireTabs();
        bindMenuPositioning();
        syncKbdLabel();
        syncUser();
        syncBell();
        syncBadges();

        // Sync con router
        if (window.AltorraSections && window.AltorraSections.onChange) {
            window.AltorraSections.onChange(function (section) {
                setActiveSection(section);
            });
            // Set initial
            var current = window.AltorraSections.current && window.AltorraSections.current();
            if (current) setActiveSection(current);
        }

        // Re-sync bell + badges + user periódicamente (cubre cargas asíncronas).
        // §36.3 perf — bajado de 2s a 5s (DOM polling es caro en cada tick).
        var syncInterval = setInterval(function () {
            syncUser();
            syncBell();
            syncBadges();
        }, 5000);

        // Section cleanup hook (de §34)
        if (window.AltorraSectionCleanup && window.AltorraSectionCleanup.register) {
            // No hay sección topnav — el interval debe vivir mientras el admin esté abierto.
            // Lo limpiamos en logout via auth listener si es necesario.
        }

        // Auto-detect section change en hash (back/forward)
        window.addEventListener('hashchange', function () {
            var section = window.AltorraSections && window.AltorraSections.current();
            if (section) setActiveSection(section);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    /* ─── Public API ─── */
    window.AltorraTopNav = {
        setActive: setActiveSection,
        syncUser: syncUser,
        syncBadges: syncBadges,
        openPalette: openPalette
    };
})();
