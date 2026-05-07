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
    var _userMenuOpen = false;

    /* ─── Wire click en tabs y menu items ─── */
    function wireTabs() {
        topnav = $('adminTopNav');
        if (!topnav) return;

        topnav.addEventListener('click', function (e) {
            // Tab o menu item con data-atn-section
            var btn = e.target && e.target.closest && e.target.closest('[data-atn-section]');
            if (btn) {
                var section = btn.getAttribute('data-atn-section');
                if (section && window.AltorraSections && window.AltorraSections.go) {
                    e.preventDefault();
                    window.AltorraSections.go(section);
                    // Cerrar menu si estaba abierto
                    var openGroup = topnav.querySelector('.atn-tab-group.is-open');
                    if (openGroup) openGroup.classList.remove('is-open');
                    var userOpen = topnav.querySelector('.atn-user[aria-expanded="true"]');
                    if (userOpen) {
                        userOpen.setAttribute('aria-expanded', 'false');
                        _userMenuOpen = false;
                    }
                }
                return;
            }

            // Trigger ⌘K palette
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
                return;
            }
        });

        // Keyboard nav: Esc cierra menus
        topnav.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                var openGroup = topnav.querySelector('.atn-tab-group.is-open');
                if (openGroup) openGroup.classList.remove('is-open');
                var userChip = $('atnUser');
                if (userChip && userChip.getAttribute('aria-expanded') === 'true') {
                    userChip.setAttribute('aria-expanded', 'false');
                    _userMenuOpen = false;
                }
            }
        });

        // Click fuera del topnav cierra menus
        document.addEventListener('click', function (e) {
            if (!topnav) return;
            if (topnav.contains(e.target)) return;
            var openGroup = topnav.querySelector('.atn-tab-group.is-open');
            if (openGroup) openGroup.classList.remove('is-open');
            var userChip = $('atnUser');
            if (userChip && userChip.getAttribute('aria-expanded') === 'true') {
                userChip.setAttribute('aria-expanded', 'false');
                _userMenuOpen = false;
            }
        });
    }

    /* ─── Active state sync ─── */
    function setActiveSection(section) {
        if (!topnav) return;

        // Limpiar active de todos
        topnav.querySelectorAll('[data-atn-section]').forEach(function (el) {
            el.classList.remove('is-active');
        });
        topnav.querySelectorAll('.atn-tab[aria-selected]').forEach(function (el) {
            el.setAttribute('aria-selected', 'false');
        });

        if (!section) return;

        // Marcar tab/menu-item directo
        var directMatches = topnav.querySelectorAll('[data-atn-section="' + section + '"]');
        directMatches.forEach(function (el) {
            el.classList.add('is-active');
            if (el.classList.contains('atn-tab')) {
                el.setAttribute('aria-selected', 'true');
            }
        });

        // Si el match es un menu item, marcar también el tab padre del grupo
        directMatches.forEach(function (el) {
            if (el.classList.contains('atn-menu-item')) {
                var group = el.closest('.atn-tab-group');
                if (group) {
                    var groupTab = group.querySelector('.atn-tab');
                    if (groupTab) {
                        groupTab.classList.add('is-active');
                        groupTab.setAttribute('aria-selected', 'true');
                    }
                }
            }
        });

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
        var role = (profile.rol || '').toUpperCase();
        var photo = profile.photoURL || profile.avatarURL || '';
        var initials = (profile.nombre || profile.email || 'A')
            .split(' ').map(function (w) { return w.charAt(0); })
            .join('').substring(0, 2).toUpperCase();

        var nameEl = $('atnUserName');
        var roleEl = $('atnUserRole');
        var avatarEl = $('atnUserAvatar');
        var menuName = $('atnUserMenuName');
        var menuEmail = $('atnUserMenuEmail');

        if (nameEl) nameEl.textContent = name;
        if (roleEl) roleEl.textContent = roleLabel(role);
        if (menuName) menuName.textContent = name;
        if (menuEmail) menuEmail.textContent = email;
        if (avatarEl) {
            if (photo) {
                avatarEl.innerHTML = '<img src="' + escapeHTML(photo) + '" alt="" onerror="this.parentNode.innerHTML=\'' + initials + '\'">';
            } else {
                avatarEl.textContent = initials;
            }
        }
    }

    function roleLabel(rol) {
        if (rol === 'SUPER_ADMIN') return 'Super';
        if (rol === 'EDITOR') return 'Editor';
        if (rol === 'VIEWER') return 'Lectura';
        return rol || '';
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

        // Re-sync bell + badges + user periódicamente (cubre cargas asíncronas)
        var syncInterval = setInterval(function () {
            syncUser();
            syncBell();
            syncBadges();
        }, 2000);

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
