/**
 * ALTORRA CARS — Presence avanzada UI (Mega-Plan v4, Microfase M.1)
 * ===================================================================
 * Construye sobre el sistema de presence existente en admin-auth.js
 * (RTDB /presence/{sessionId}). Añade dos capas nuevas:
 *
 * 1. Tracking de currentSection: cada cambio de sección via
 *    AltorraSections.onChange actualiza el nodo presence con el slug
 *    de la sección activa.
 *
 * 2. Overlay "Aquí también" en el header — muestra avatares pequeños
 *    de los otros admins que están en la misma sección, con tooltip
 *    de nombre. Patrón Figma "lurkers".
 *
 * Como el sistema RTDB ya está, esto es solo enrichment + UI.
 *
 * Public API:
 *   AltorraPresenceUI.refresh()
 *   AltorraPresenceUI.peers() → array de admins en mi sección
 */
(function () {
    'use strict';
    if (window.AltorraPresenceUI) return;
    var AP = window.AP;
    if (!AP) return;

    var _peers = [];
    var _currentSection = null;
    var _presenceData = {};

    /* ═══════════════════════════════════════════════════════════
       UPDATE PRESENCE NODE — añadir currentSection al perfil RTDB
       ═══════════════════════════════════════════════════════════ */
    function updatePresenceSection(section) {
        _currentSection = section;
        if (!window.rtdb || !AP._presenceRef) return;
        try {
            AP._presenceRef.update({
                currentSection: section,
                lastSectionChange: Date.now()
            }).catch(function () {});
        } catch (e) {}
    }

    /* ═══════════════════════════════════════════════════════════
       LISTEN A OTROS ADMINS Y FILTRAR POR SECCIÓN
       ═══════════════════════════════════════════════════════════ */
    function startPeerListener() {
        if (!window.rtdb) return;
        try {
            var ref = window.rtdb.ref('presence').orderByChild('online').equalTo(true);
            ref.on('value', function (snap) {
                _presenceData = snap.val() || {};
                updatePeerList();
            }, function () { /* silenciar errores de permission */ });
        } catch (e) {}
    }

    function updatePeerList() {
        var myUid = window.auth && window.auth.currentUser && window.auth.currentUser.uid;
        var fiveMinAgo = Date.now() - 5 * 60 * 1000;
        var seen = {};
        var allOthers = [];
        var inMySection = [];

        Object.keys(_presenceData).forEach(function (sessionId) {
            var p = _presenceData[sessionId];
            if (!p || !p.uid) return;
            if (p.uid === myUid) return; // skip mí mismo
            if (p.lastSeen && p.lastSeen < fiveMinAgo) return; // stale
            // Dedup por uid (un usuario puede tener múltiples tabs)
            if (seen[p.uid]) return;
            seen[p.uid] = true;
            allOthers.push(p);
            if (_currentSection && p.currentSection === _currentSection) {
                inMySection.push(p);
            }
        });

        _peers = inMySection;
        renderOverlay(allOthers, inMySection);
    }

    /* ═══════════════════════════════════════════════════════════
       OVERLAY UI
       ═══════════════════════════════════════════════════════════ */
    function ensureOverlay() {
        if (document.getElementById('alt-presence-overlay')) return;
        var el = document.createElement('div');
        el.id = 'alt-presence-overlay';
        el.className = 'alt-presence-overlay';
        el.innerHTML = '<div class="alt-presence-list" id="alt-presence-list"></div>';
        document.body.appendChild(el);
    }

    function renderOverlay(allOthers, inSection) {
        ensureOverlay();
        var listEl = document.getElementById('alt-presence-list');
        if (!listEl) return;
        if (allOthers.length === 0) {
            listEl.innerHTML = '';
            return;
        }
        // Mostrar solo si hay otros admins activos
        listEl.innerHTML =
            '<div class="alt-presence-label">' +
                allOthers.length + ' ' + (allOthers.length === 1 ? 'admin activo' : 'admins activos') +
                (inSection.length > 0 ? ' · ' + inSection.length + ' aquí' : '') +
            '</div>' +
            '<div class="alt-presence-avatars">' +
                allOthers.slice(0, 6).map(function (p) {
                    var name = p.nombre || p.email || '?';
                    var initials = name.split(' ').map(function (w) { return w[0]; }).slice(0, 2).join('').toUpperCase();
                    var section = p.currentSection || '—';
                    var inMine = _currentSection && p.currentSection === _currentSection;
                    return '<div class="alt-presence-avatar' + (inMine ? ' alt-presence-avatar--here' : '') +
                        '" data-tooltip="' + escTxt(name) + (inMine ? ' (aquí)' : ' · ' + section) + '">' +
                        escTxt(initials) +
                    '</div>';
                }).join('') +
            '</div>';
    }

    function escTxt(s) {
        var d = document.createElement('div');
        d.textContent = s == null ? '' : String(s);
        return d.innerHTML;
    }

    /* ═══════════════════════════════════════════════════════════
       INIT
       ═══════════════════════════════════════════════════════════ */
    function init() {
        // Subscribe a cambios de sección del router
        if (window.AltorraSections && window.AltorraSections.onChange) {
            window.AltorraSections.onChange(function (section) {
                updatePresenceSection(section);
            });
            // Set inicial
            var initial = window.AltorraSections.current && window.AltorraSections.current();
            if (initial) updatePresenceSection(initial);
        }
        // Empezar listener cuando RTDB ready + admin autenticado
        var attempts = 0;
        var iv = setInterval(function () {
            attempts++;
            if (window.rtdb && window.auth && window.auth.currentUser &&
                AP.isEditorOrAbove && AP.isEditorOrAbove()) {
                startPeerListener();
                clearInterval(iv);
            } else if (attempts > 60) clearInterval(iv);
        }, 1500);
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    /* ═══════════════════════════════════════════════════════════
       Public API
       ═══════════════════════════════════════════════════════════ */
    window.AltorraPresenceUI = {
        peers: function () { return _peers.slice(); },
        currentSection: function () { return _currentSection; },
        refresh: updatePeerList
    };
})();
