/**
 * ALTORRA CARS — Activity Feed (Mega-Plan v4, Microfase I.2)
 * ==============================================================
 * Slack-style sliding panel that shows real-time admin activity.
 *
 * Sources:
 *   1. AltorraEventBus.on('*')  — every emitted event in current session
 *   2. Firestore events/         — persisted events from other admins/devices
 *
 * Features:
 *   - Trigger button in admin header (history icon)
 *   - Sliding panel from the right with backdrop
 *   - Filters: type prefix, user, time period
 *   - Real-time updates via EventBus subscription
 *   - Lazy Firestore listener (only when panel open + super_admin)
 *
 * Public API:
 *   AltorraActivityFeed.open()
 *   AltorraActivityFeed.close()
 *   AltorraActivityFeed.toggle()
 */
(function () {
    'use strict';
    if (window.AltorraActivityFeed) return;

    var AP = window.AP;
    var MAX_VISIBLE = 100;
    var _entries = [];
    var _firestoreUnsub = null;
    var _busUnsub = null;
    var _isOpen = false;

    /* ═══════════════════════════════════════════════════════════
       Entry rendering
       ═══════════════════════════════════════════════════════════ */
    function escTxt(s) {
        var d = document.createElement('div');
        d.textContent = s == null ? '' : String(s);
        return d.innerHTML;
    }

    function timeAgo(ts) {
        var diff = Math.floor((Date.now() - ts) / 1000);
        if (diff < 5) return 'ahora';
        if (diff < 60) return 'hace ' + diff + 's';
        if (diff < 3600) return 'hace ' + Math.floor(diff / 60) + 'm';
        if (diff < 86400) return 'hace ' + Math.floor(diff / 3600) + 'h';
        return 'hace ' + Math.floor(diff / 86400) + 'd';
    }

    /* ═══════════════════════════════════════════════════════════
       Event type → display metadata
       Maps each domain prefix to icon + color + human action
       ═══════════════════════════════════════════════════════════ */
    var EVENT_META = {
        'vehicle.':     { icon: 'car',                 color: 'gold' },
        'comm.':        { icon: 'inbox',               color: 'green' },
        'crm.':         { icon: 'users-round',         color: 'blue' },
        'appointment.': { icon: 'calendar-check-2',    color: 'violet' },
        'user.':        { icon: 'user-circle',         color: 'neutral' },
        'ui.':          { icon: 'mouse-pointer-click', color: 'neutral' },
        'workflow.':    { icon: 'zap',                 color: 'orange' },
        'concierge.':   { icon: 'message-circle-more', color: 'green' },
        'system.':      { icon: 'settings',            color: 'neutral' },
        'test.':        { icon: 'flask-conical',       color: 'cyan' }
    };

    function metaFor(type) {
        for (var prefix in EVENT_META) {
            if (type.indexOf(prefix) === 0) return EVENT_META[prefix];
        }
        return { icon: 'circle-dot', color: 'neutral' };
    }

    function humanizeAction(type, payload) {
        // Best-effort human description from event type + payload
        var parts = type.split('.');
        var domain = parts[0];
        var action = parts.slice(1).join('.').replace(/-/g, ' ');
        var humanized = action.charAt(0).toUpperCase() + action.slice(1);

        var detail = '';
        if (payload) {
            if (payload.title) detail = payload.title;
            else if (payload.name) detail = payload.name;
            else if (payload.vehiculo) detail = payload.vehiculo;
            else if (payload.id) detail = payload.id;
        }
        return { domain: domain, action: humanized, detail: detail };
    }

    function renderEntry(event) {
        var meta = metaFor(event.type);
        var human = humanizeAction(event.type, event.payload);
        var when = timeAgo(event.timestamp);

        return '<div class="aaf-entry" data-event-id="' + escTxt(event.id) + '" data-type="' + escTxt(event.type) + '" data-color="' + escTxt(meta.color) + '">' +
            '<div class="aaf-entry-icon"><i data-lucide="' + escTxt(meta.icon) + '"></i></div>' +
            '<div class="aaf-entry-body">' +
                '<div class="aaf-entry-title">' +
                    '<span class="aaf-entry-domain">' + escTxt(human.domain) + '</span>' +
                    '<span class="aaf-entry-action">' + escTxt(human.action) + '</span>' +
                '</div>' +
                (human.detail ? '<div class="aaf-entry-detail">' + escTxt(human.detail) + '</div>' : '') +
                '<div class="aaf-entry-meta">' +
                    '<span>' + escTxt(when) + '</span>' +
                    (event.bySource ? '<span> · ' + escTxt(event.bySource) + '</span>' : '') +
                '</div>' +
            '</div>' +
        '</div>';
    }

    /* ═══════════════════════════════════════════════════════════
       Render the full list
       ═══════════════════════════════════════════════════════════ */
    function renderList() {
        var listEl = document.getElementById('aaf-list');
        if (!listEl) return;

        // Apply filters
        var filterEl = document.getElementById('aaf-filter');
        var filterValue = filterEl ? filterEl.value : 'all';
        var filtered = _entries.slice();
        if (filterValue === 'admin') {
            filtered = filtered.filter(function (e) { return e.bySource === 'admin'; });
        } else if (filterValue === 'public') {
            filtered = filtered.filter(function (e) { return e.bySource === 'public'; });
        } else if (filterValue !== 'all') {
            // Filter by domain prefix
            filtered = filtered.filter(function (e) { return e.type.indexOf(filterValue + '.') === 0; });
        }

        if (filtered.length === 0) {
            listEl.innerHTML =
                '<div class="aaf-empty">' +
                    '<i data-lucide="inbox-x" style="width:32px;height:32px;opacity:0.4;"></i>' +
                    '<p>Sin actividad reciente.<br><small>Los eventos aparecen aquí en tiempo real.</small></p>' +
                '</div>';
        } else {
            // Newest first
            listEl.innerHTML = filtered.slice().reverse().map(renderEntry).join('');
        }

        // Refresh Lucide icons
        if (window.AltorraIcons) window.AltorraIcons.refresh(listEl);
        else if (window.lucide) try { window.lucide.createIcons({ context: listEl }); } catch (e) {}

        // Update count badge
        var countEl = document.getElementById('aaf-count');
        if (countEl) countEl.textContent = filtered.length;
    }

    /* ═══════════════════════════════════════════════════════════
       Add an entry to the in-memory feed and re-render if open
       ═══════════════════════════════════════════════════════════ */
    function addEntry(event) {
        // Skip noisy test events unless filter is set
        // (none right now, but placeholder)
        _entries.push(event);
        if (_entries.length > MAX_VISIBLE) _entries.shift();
        if (_isOpen) renderList();
    }

    /* ═══════════════════════════════════════════════════════════
       Firestore listener — load events created by OTHER admins/sessions
       Only enabled while panel is open + user is super_admin to save reads
       ═══════════════════════════════════════════════════════════ */
    function startFirestoreListener() {
        if (_firestoreUnsub) return;
        if (!window.db || !AP || !AP.isSuperAdmin || !AP.isSuperAdmin()) return;
        try {
            _firestoreUnsub = window.db.collection('events')
                .orderBy('timestamp', 'desc')
                .limit(50)
                .onSnapshot(function (snap) {
                    snap.docChanges().forEach(function (chg) {
                        if (chg.type !== 'added') return;
                        var data = chg.doc.data();
                        // Skip if already in memory (this session's emissions)
                        if (_entries.some(function (e) { return e.id === data.id; })) return;
                        // Convert Firestore timestamp to epoch
                        var ts = data.timestamp;
                        if (ts && typeof ts.toMillis === 'function') ts = ts.toMillis();
                        var event = {
                            id: data.id,
                            type: data.type,
                            payload: data.payload,
                            timestamp: ts || Date.now(),
                            by: data.by,
                            bySource: data.bySource
                        };
                        _entries.unshift(event); // older entries at start
                    });
                    if (_isOpen) renderList();
                }, function (err) {
                    if (window.auth && !window.auth.currentUser) return;
                    console.warn('[ActivityFeed] listener error:', err.message || err);
                });
        } catch (e) {}
    }

    function stopFirestoreListener() {
        if (_firestoreUnsub) {
            try { _firestoreUnsub(); } catch (e) {}
            _firestoreUnsub = null;
        }
    }

    /* ═══════════════════════════════════════════════════════════
       Panel UI
       ═══════════════════════════════════════════════════════════ */
    function ensurePanel() {
        if (document.getElementById('aaf-panel')) return;

        var panel = document.createElement('aside');
        panel.id = 'aaf-panel';
        panel.className = 'aaf-panel';
        panel.setAttribute('role', 'dialog');
        panel.setAttribute('aria-label', 'Activity feed');
        panel.setAttribute('aria-hidden', 'true');

        panel.innerHTML =
            '<div class="aaf-backdrop" data-action="close"></div>' +
            '<div class="aaf-drawer">' +
                '<header class="aaf-header">' +
                    '<div>' +
                        '<h3 class="aaf-title"><i data-lucide="activity"></i> Actividad</h3>' +
                        '<p class="aaf-subtitle">Eventos en tiempo real · <span id="aaf-count">0</span></p>' +
                    '</div>' +
                    '<button class="alt-btn alt-btn--ghost alt-btn--icon" data-action="close" data-tooltip="Cerrar">' +
                        '<i data-lucide="x"></i>' +
                    '</button>' +
                '</header>' +
                '<div class="aaf-toolbar">' +
                    '<select class="alt-select alt-select--sm" id="aaf-filter">' +
                        '<option value="all">Todo</option>' +
                        '<option value="admin">Solo admin</option>' +
                        '<option value="public">Solo cliente</option>' +
                        '<option disabled>──────</option>' +
                        '<option value="vehicle">Vehículos</option>' +
                        '<option value="comm">Comunicaciones</option>' +
                        '<option value="crm">CRM</option>' +
                        '<option value="appointment">Citas</option>' +
                        '<option value="user">Usuarios</option>' +
                        '<option value="ui">UI</option>' +
                        '<option value="workflow">Workflows</option>' +
                        '<option value="concierge">Concierge</option>' +
                    '</select>' +
                    '<button class="alt-btn alt-btn--ghost alt-btn--sm" data-action="clear" data-tooltip="Limpiar feed local">' +
                        '<i data-lucide="trash-2"></i>' +
                    '</button>' +
                '</div>' +
                '<div class="aaf-list" id="aaf-list" tabindex="0">' +
                    '<div class="aaf-empty">' +
                        '<i data-lucide="inbox-x" style="width:32px;height:32px;opacity:0.4;"></i>' +
                        '<p>Sin actividad reciente.<br><small>Los eventos aparecen aquí en tiempo real.</small></p>' +
                    '</div>' +
                '</div>' +
            '</div>';

        document.body.appendChild(panel);

        // Wire panel events
        panel.addEventListener('click', function (e) {
            if (e.target.closest('[data-action="close"]')) close();
            else if (e.target.closest('[data-action="clear"]')) {
                _entries = [];
                renderList();
            }
        });
        panel.addEventListener('change', function (e) {
            if (e.target.id === 'aaf-filter') renderList();
        });

        // Refresh icons
        if (window.AltorraIcons) window.AltorraIcons.refresh(panel);
    }

    /* ═══════════════════════════════════════════════════════════
       Time-ago auto-refresh — every 30s update the timestamps
       ═══════════════════════════════════════════════════════════ */
    var _tickInterval = null;
    function startTimeTick() {
        if (_tickInterval) return;
        _tickInterval = setInterval(function () {
            if (_isOpen) renderList();
        }, 30000);
    }
    function stopTimeTick() {
        if (_tickInterval) { clearInterval(_tickInterval); _tickInterval = null; }
    }

    /* ═══════════════════════════════════════════════════════════
       Open/close
       ═══════════════════════════════════════════════════════════ */
    function open() {
        ensurePanel();
        var panel = document.getElementById('aaf-panel');
        panel.setAttribute('aria-hidden', 'false');
        panel.classList.add('aaf-open');
        _isOpen = true;
        startFirestoreListener();
        startTimeTick();
        renderList();
    }

    function close() {
        var panel = document.getElementById('aaf-panel');
        if (!panel) return;
        panel.setAttribute('aria-hidden', 'true');
        panel.classList.remove('aaf-open');
        _isOpen = false;
        stopFirestoreListener();
        stopTimeTick();
    }

    function toggle() {
        if (_isOpen) close();
        else open();
    }

    /* ═══════════════════════════════════════════════════════════
       Subscribe to bus on init
       ═══════════════════════════════════════════════════════════ */
    function init() {
        // Subscribe to EventBus wildcard
        if (window.AltorraEventBus) {
            _busUnsub = window.AltorraEventBus.on('*', addEntry);
            // Pre-populate from history
            _entries = window.AltorraEventBus.history();
        } else {
            // Defensive retry
            var attempts = 0;
            var iv = setInterval(function () {
                attempts++;
                if (window.AltorraEventBus) {
                    _busUnsub = window.AltorraEventBus.on('*', addEntry);
                    _entries = window.AltorraEventBus.history();
                    clearInterval(iv);
                } else if (attempts > 30) clearInterval(iv);
            }, 200);
        }

        // Wire trigger button
        document.addEventListener('click', function (e) {
            if (e.target.closest('#activityFeedTrigger')) toggle();
        });
        // Esc closes panel
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && _isOpen) close();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.AltorraActivityFeed = {
        open: open,
        close: close,
        toggle: toggle
    };
})();
