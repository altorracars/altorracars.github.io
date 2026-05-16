/**
 * ALTORRA CARS — Dynamic Island de admins activos (§46 reescritura)
 * =====================================================================
 * Reemplaza el overlay rectangular fijo del bottom-right por un widget
 * Dynamic Island estilo iPhone que el admin puede arrastrar a cualquier
 * posición de la pantalla. La posición se persiste en localStorage.
 *
 * Características:
 *
 * 1. **Pill compacto colapsado** (default): muestra avatares apilados +
 *    contador. Click expande a vista detalle con lista completa.
 *
 * 2. **Drag-to-reposition**: pointerdown sostenido sobre el pill activa
 *    modo drag. pointermove arrastra. pointerup persiste posición.
 *    Soporta touch (mobile) + mouse (desktop) via Pointer Events.
 *
 * 3. **Posición auto-guardada** en `localStorage.altorra_dynisland_pos`
 *    como `{x, y}` (top-left). Al refrescar página, restaura posición
 *    elegida.
 *
 * 4. **Posición default no obstructiva**: top-right pero offsetada hacia
 *    abajo del topnav (top: 80px right: 24px). Si la posición persistida
 *    quedó fuera del viewport (resize), la corrige automáticamente.
 *
 * 5. **Detección de admins más estable**:
 *    - Threshold stale extendido a 10min (antes 5min) — coherente con
 *      §46 admin-auth.js
 *    - Dedup por uid (un admin puede tener múltiples tabs — solo aparece
 *      una vez con tooltip indicando #tabs)
 *    - Auto-refresh cada 30s para actualizar "tiempos relativos"
 *
 * 6. **Vista expandida** muestra:
 *    - Avatar circular + nombre + rol pill
 *    - Sección donde está cada admin
 *    - "Aquí" badge verde pulsante si está en MI sección
 *    - Última actividad relativa ("hace 2 min")
 *
 * Public API:
 *   AltorraPresenceUI.refresh()     → forzar update
 *   AltorraPresenceUI.peers()       → array de admins
 *   AltorraPresenceUI.expand()      → abrir vista detalle
 *   AltorraPresenceUI.collapse()    → cerrar
 *   AltorraPresenceUI.resetPosition() → volver a default
 */
(function () {
    'use strict';
    if (window.AltorraPresenceUI) return;
    var AP = window.AP;
    if (!AP) return;

    /* ═══════════════════════════════════════════════════════════
       STATE
       ═══════════════════════════════════════════════════════════ */
    var STORAGE_KEY = 'altorra_dynisland_pos';
    var STALE_MS = 10 * 60 * 1000;       // §46 coherente con admin-auth.js
    var REFRESH_TICK_MS = 30 * 1000;     // refresh tiempos relativos cada 30s

    var _peers = [];                      // admins en MI sección
    var _allOthers = [];                  // todos los admins activos (excepto yo)
    var _currentSection = null;
    var _presenceData = {};
    var _expanded = false;
    var _refreshTimer = null;
    var _dragState = null;                // { startX, startY, origX, origY, moved }

    /* ═══════════════════════════════════════════════════════════
       UPDATE PRESENCE NODE — añadir currentSection al perfil RTDB
       ═══════════════════════════════════════════════════════════ */
    function updatePresenceSection(section) {
        _currentSection = section;
        if (!window.rtdb || !AP._presenceRef) return;
        try {
            AP._presenceRef.update({
                uid: window.auth && window.auth.currentUser && window.auth.currentUser.uid,
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
        var staleThreshold = Date.now() - STALE_MS;
        var byUid = {};   // map uid → peer (con tabsCount)

        Object.keys(_presenceData).forEach(function (sessionId) {
            var p = _presenceData[sessionId];
            if (!p || !p.uid) return;
            if (p.uid === myUid) return; // skip mí mismo
            if (p.lastSeen && p.lastSeen < staleThreshold) return; // stale

            // Dedup por uid pero contar #tabs y conservar la sesión más reciente
            if (byUid[p.uid]) {
                byUid[p.uid].tabs += 1;
                // Conservar el currentSection más reciente
                if ((p.lastSectionChange || 0) > (byUid[p.uid].lastSectionChange || 0)) {
                    byUid[p.uid].currentSection = p.currentSection;
                    byUid[p.uid].lastSectionChange = p.lastSectionChange;
                }
                return;
            }
            byUid[p.uid] = Object.assign({}, p, { tabs: 1 });
        });

        var others = Object.keys(byUid).map(function (uid) { return byUid[uid]; });
        var inMySection = others.filter(function (p) {
            return _currentSection && p.currentSection === _currentSection;
        });

        _peers = inMySection;
        _allOthers = others;
        renderIsland();
    }

    /* ═══════════════════════════════════════════════════════════
       DYNAMIC ISLAND UI
       ═══════════════════════════════════════════════════════════ */
    function ensureIsland() {
        var existing = document.getElementById('alt-presence-overlay');
        if (existing) return existing;

        var el = document.createElement('div');
        el.id = 'alt-presence-overlay';
        el.className = 'alt-presence-island alt-presence-island--collapsed';
        el.setAttribute('role', 'complementary');
        el.setAttribute('aria-label', 'Admins activos');
        el.innerHTML =
            '<button class="alt-presence-pill" id="alt-presence-pill" type="button" aria-expanded="false">' +
                '<span class="alt-presence-pill-dot" aria-hidden="true"></span>' +
                '<span class="alt-presence-pill-avatars" id="alt-presence-pill-avatars"></span>' +
                '<span class="alt-presence-pill-count" id="alt-presence-pill-count">0</span>' +
                '<span class="alt-presence-pill-grip" aria-hidden="true">' +
                    '<i data-lucide="grip-vertical"></i>' +
                '</span>' +
            '</button>' +
            '<div class="alt-presence-detail" id="alt-presence-detail" hidden>' +
                '<div class="alt-presence-detail-head">' +
                    '<h3 id="alt-presence-detail-title">Admins activos</h3>' +
                    '<button class="alt-presence-detail-close" id="alt-presence-detail-close" aria-label="Cerrar">' +
                        '<i data-lucide="x"></i>' +
                    '</button>' +
                '</div>' +
                '<div class="alt-presence-detail-list" id="alt-presence-detail-list"></div>' +
                '<div class="alt-presence-detail-foot">' +
                    '<small>Manten click sobre la isla para arrastrarla</small>' +
                '</div>' +
            '</div>';
        document.body.appendChild(el);

        // Posicionar según localStorage o default
        applyStoredPosition(el);

        // Bind interactions
        bindPillInteractions(el);

        // Refresh icons
        if (window.AltorraIcons && typeof window.AltorraIcons.refresh === 'function') {
            window.AltorraIcons.refresh(el);
        }
        return el;
    }

    function renderIsland() {
        var island = ensureIsland();
        var pill = document.getElementById('alt-presence-pill');
        var avatarsEl = document.getElementById('alt-presence-pill-avatars');
        var countEl = document.getElementById('alt-presence-pill-count');
        var detailEl = document.getElementById('alt-presence-detail');
        var detailListEl = document.getElementById('alt-presence-detail-list');
        var detailTitle = document.getElementById('alt-presence-detail-title');

        if (_allOthers.length === 0) {
            island.classList.add('alt-presence-island--empty');
            island.setAttribute('aria-hidden', 'true');
            return;
        }

        island.classList.remove('alt-presence-island--empty');
        island.setAttribute('aria-hidden', 'false');

        // Pill — avatares apilados (max 3) + contador
        var pillAvatars = _allOthers.slice(0, 3).map(function (p) {
            var initials = getInitials(p.nombre || p.email || '?');
            var inMine = _currentSection && p.currentSection === _currentSection;
            return '<span class="alt-presence-pill-avatar' + (inMine ? ' alt-presence-pill-avatar--here' : '') +
                   '" aria-hidden="true">' + escTxt(initials) + '</span>';
        }).join('');
        avatarsEl.innerHTML = pillAvatars;
        countEl.textContent = _allOthers.length;

        // Indicador de "alguien aquí" en el dot del pill
        var someoneHere = _peers.length > 0;
        pill.classList.toggle('alt-presence-pill--here', someoneHere);

        // Detail — lista completa
        detailTitle.textContent = _allOthers.length === 1
            ? '1 admin activo'
            : _allOthers.length + ' admins activos';

        detailListEl.innerHTML = _allOthers.map(function (p) {
            var name = p.nombre || p.email || '?';
            var initials = getInitials(name);
            // §47.ter — Mostrar CARGO personalizado del perfil (ej: "CEO",
            // "Asesor comercial") en lugar del rol técnico. Si no hay cargo,
            // fallback a rol con label legible. Ubicación (sección) eliminada
            // del detail por solicitud del cliente — no es info relevante.
            var displayLabel = (p.cargo && String(p.cargo).trim()) || formatRole(p.rol);
            var inMine = _currentSection && p.currentSection === _currentSection;
            var lastSeenAgo = p.lastSeen ? formatTimeAgo(p.lastSeen) : '';
            var tabsBadge = p.tabs > 1 ? ' <span class="alt-presence-tabs-badge" title="' + p.tabs + ' pestañas abiertas">×' + p.tabs + '</span>' : '';
            return '<div class="alt-presence-row' + (inMine ? ' alt-presence-row--here' : '') + '">' +
                '<span class="alt-presence-row-avatar">' + escTxt(initials) + '</span>' +
                '<div class="alt-presence-row-info">' +
                    '<div class="alt-presence-row-name">' + escTxt(name) + tabsBadge + '</div>' +
                    '<div class="alt-presence-row-meta">' +
                        '<span class="alt-presence-row-rol">' + escTxt(displayLabel) + '</span>' +
                    '</div>' +
                    (lastSeenAgo ? '<div class="alt-presence-row-time">' + escTxt(lastSeenAgo) + '</div>' : '') +
                '</div>' +
                (inMine ? '<span class="alt-presence-row-here-badge" title="Está en tu misma sección">aquí</span>' : '') +
            '</div>';
        }).join('');
    }

    function getInitials(name) {
        if (!name) return '?';
        var parts = String(name).split(/\s+/).filter(Boolean);
        return parts.slice(0, 2).map(function (w) { return w[0]; }).join('').toUpperCase() || '?';
    }

    function formatRole(rol) {
        if (rol === 'super_admin') return 'Administrador';
        if (rol === 'editor') return 'Editor';
        if (rol === 'viewer') return 'Lector';
        return rol || 'Admin';
    }

    function formatSection(section) {
        if (!section) return 'sin ubicación';
        var SECTION_LABELS = {
            dashboard: 'Inicio',
            vehicles: 'Vehículos',
            brands: 'Marcas',
            dealers: 'Aliados',
            banners: 'Banners',
            reviews: 'Reseñas',
            crm: 'CRM',
            appointments: 'CRM · Bandeja',
            calendar: 'Calendario',
            concierge: 'ALTOR Hub',
            kb: 'Cerebro AI',
            unmatched: 'Lo que no entendí',
            reports: 'Reportes',
            users: 'Usuarios',
            lists: 'Atributos',
            workflows: 'Workflows',
            audit: 'Auditoría',
            settings: 'Ajustes',
            profile: 'Mi perfil'
        };
        return SECTION_LABELS[section] || section;
    }

    function formatTimeAgo(ts) {
        var diff = Date.now() - (ts || 0);
        if (diff < 30 * 1000) return 'activo ahora';
        if (diff < 60 * 1000) return 'hace <1m';
        var mins = Math.floor(diff / 60000);
        if (mins < 60) return 'hace ' + mins + 'm';
        var hrs = Math.floor(mins / 60);
        return 'hace ' + hrs + 'h';
    }

    function escTxt(s) {
        var d = document.createElement('div');
        d.textContent = s == null ? '' : String(s);
        return d.innerHTML;
    }

    /* ═══════════════════════════════════════════════════════════
       PILL INTERACTIONS — click + drag
       ═══════════════════════════════════════════════════════════ */
    function bindPillInteractions(island) {
        var pill = island.querySelector('#alt-presence-pill');
        var closeBtn = island.querySelector('#alt-presence-detail-close');

        // Click: toggle expand (solo si NO se arrastró)
        pill.addEventListener('click', function (e) {
            if (_dragState && _dragState.moved) {
                _dragState = null;
                return;
            }
            toggleDetail();
        });

        // Drag inicio (pointerdown)
        pill.addEventListener('pointerdown', function (e) {
            // Solo botón principal
            if (e.button !== undefined && e.button !== 0) return;

            // §47 fix mobile — agregar clase --positioned ANTES del primer
            // pointermove para que el media query mobile (que aplica
            // bottom/right con !important) NO sobrescriba el style.left/top
            // que vamos a setear durante el drag. Si NO se agrega esta clase,
            // visualmente la isla NO se mueve en mobile aunque el handler corra.
            island.classList.add('alt-presence-island--positioned');

            _dragState = {
                startX: e.clientX,
                startY: e.clientY,
                origX: island.offsetLeft,
                origY: island.offsetTop,
                moved: false,
                pointerId: e.pointerId
            };
            try { pill.setPointerCapture(e.pointerId); } catch (_) {}
            island.classList.add('alt-presence-island--dragging');
        });

        pill.addEventListener('pointermove', function (e) {
            if (!_dragState || _dragState.pointerId !== e.pointerId) return;
            var dx = e.clientX - _dragState.startX;
            var dy = e.clientY - _dragState.startY;
            // §47 fix mobile — threshold mayor en touch (8px) que en mouse
            // (4px). pointerType==='touch' en eventos táctiles. Con threshold
            // 4px en touch, micro-movimientos del dedo confunden tap con drag.
            var threshold = (e.pointerType === 'touch' || e.pointerType === 'pen') ? 8 : 4;
            if (!_dragState.moved && Math.abs(dx) + Math.abs(dy) < threshold) return;
            _dragState.moved = true;

            var newX = clamp(_dragState.origX + dx, 8, window.innerWidth - island.offsetWidth - 8);
            var newY = clamp(_dragState.origY + dy, 8, window.innerHeight - island.offsetHeight - 8);
            island.style.left = newX + 'px';
            island.style.top = newY + 'px';
            island.style.right = 'auto';
            island.style.bottom = 'auto';
        });

        function endDrag(e) {
            if (!_dragState) return;
            try { pill.releasePointerCapture(_dragState.pointerId); } catch (_) {}
            island.classList.remove('alt-presence-island--dragging');
            if (_dragState.moved) {
                // Persistir nueva posición
                savePosition({ x: island.offsetLeft, y: island.offsetTop });
                // Mantener flag .moved hasta el siguiente tick para que el click handler
                // lo detecte y NO toggle
                setTimeout(function () { _dragState = null; }, 50);
            } else {
                _dragState = null;
            }
        }

        pill.addEventListener('pointerup', endDrag);
        pill.addEventListener('pointercancel', endDrag);

        // Cerrar detalle
        if (closeBtn) {
            closeBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                collapseDetail();
            });
        }

        // Cerrar al click fuera
        document.addEventListener('click', function (e) {
            if (!_expanded) return;
            if (island.contains(e.target)) return;
            collapseDetail();
        });

        // Esc cierra
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && _expanded) collapseDetail();
        });

        // Resize: re-clamp dentro del viewport
        window.addEventListener('resize', function () {
            if (!island.style.left) return; // todavía con default position
            var newX = clamp(island.offsetLeft, 8, window.innerWidth - island.offsetWidth - 8);
            var newY = clamp(island.offsetTop, 8, window.innerHeight - island.offsetHeight - 8);
            island.style.left = newX + 'px';
            island.style.top = newY + 'px';
        });
    }

    function toggleDetail() {
        if (_expanded) collapseDetail();
        else expandDetail();
    }

    function expandDetail() {
        var island = document.getElementById('alt-presence-overlay');
        var pill = document.getElementById('alt-presence-pill');
        var detail = document.getElementById('alt-presence-detail');
        if (!island || !detail) return;
        _expanded = true;
        island.classList.remove('alt-presence-island--collapsed');
        island.classList.add('alt-presence-island--expanded');
        detail.hidden = false;
        if (pill) pill.setAttribute('aria-expanded', 'true');
        if (window.AltorraIcons && typeof window.AltorraIcons.refresh === 'function') {
            window.AltorraIcons.refresh(detail);
        }
    }

    function collapseDetail() {
        var island = document.getElementById('alt-presence-overlay');
        var pill = document.getElementById('alt-presence-pill');
        var detail = document.getElementById('alt-presence-detail');
        if (!island || !detail) return;
        _expanded = false;
        island.classList.remove('alt-presence-island--expanded');
        island.classList.add('alt-presence-island--collapsed');
        detail.hidden = true;
        if (pill) pill.setAttribute('aria-expanded', 'false');
    }

    /* ═══════════════════════════════════════════════════════════
       POSITION PERSISTENCE
       ═══════════════════════════════════════════════════════════ */
    function applyStoredPosition(island) {
        var pos = loadStoredPosition();
        if (pos) {
            // Re-clamp por si el viewport cambió desde la última sesión
            var safeX = clamp(pos.x, 8, window.innerWidth - 200);
            var safeY = clamp(pos.y, 8, window.innerHeight - 60);
            island.style.left = safeX + 'px';
            island.style.top = safeY + 'px';
            island.style.right = 'auto';
            island.style.bottom = 'auto';
            // §47 fix mobile drag: agregar clase --positioned para que el
            // media query (max-width: 720px) NO sobrescriba con !important
            // los valores left/top que ahora setea el usuario.
            island.classList.add('alt-presence-island--positioned');
        }
        // Si no hay stored, el CSS aplica top: 80px right: 24px (default no-obstructivo)
    }

    function loadStoredPosition() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return null;
            var p = JSON.parse(raw);
            if (typeof p.x === 'number' && typeof p.y === 'number') return p;
        } catch (_) {}
        return null;
    }

    function savePosition(pos) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(pos));
        } catch (_) {}
    }

    function resetPosition() {
        try { localStorage.removeItem(STORAGE_KEY); } catch (_) {}
        var island = document.getElementById('alt-presence-overlay');
        if (island) {
            island.style.left = '';
            island.style.top = '';
            island.style.right = '';
            island.style.bottom = '';
            // §47 — quitar la clase para que el media query mobile vuelva
            // a aplicar la posición default (bottom:90px right:12px).
            island.classList.remove('alt-presence-island--positioned');
        }
    }

    function clamp(n, min, max) {
        return Math.max(min, Math.min(max, n));
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
            var initial = window.AltorraSections.current && window.AltorraSections.current();
            if (initial) updatePresenceSection(initial);
        }

        // Empezar listener cuando RTDB ready + admin autenticado
        var attempts = 0;
        var iv = setInterval(function () {
            attempts++;
            if (window.rtdb && window.auth && window.auth.currentUser &&
                AP.isAuthenticatedAdmin && AP.isAuthenticatedAdmin()) {
                startPeerListener();
                ensureIsland();
                clearInterval(iv);
            } else if (attempts > 60) {
                clearInterval(iv);
            }
        }, 1500);

        // Refresh "tiempos relativos" cada 30s mientras la isla esté visible
        _refreshTimer = setInterval(function () {
            if (_allOthers.length > 0) renderIsland();
        }, REFRESH_TICK_MS);
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
        allOthers: function () { return _allOthers.slice(); },
        currentSection: function () { return _currentSection; },
        refresh: updatePeerList,
        expand: expandDetail,
        collapse: collapseDetail,
        resetPosition: resetPosition
    };
})();
