/**
 * ALTORRA NOTIFICATIONS — Unified notification system (Phase N1)
 *
 * Replaces toast.js (public site) and AP.toast (admin) with a single,
 * modern, vanguard-style notification module.
 *
 * Features:
 *  - Glassmorphism + animated gradient border
 *  - Stack queue (up to 4 visible) with spring push-down animation
 *  - Lucide icons + optional title + optional action button
 *  - Pausable progress bar on hover
 *  - Priority-based duration (critical never auto-closes)
 *  - Mobile-aware with safe-area-inset support
 *  - Keyboard dismiss (Esc closes most recent, hover blocks auto-close)
 *  - 100% backwards-compatible with toast.success/error/info and AP.toast
 *
 * Usage:
 *   notify.success({ title, message, duration, action: { label, onClick } })
 *   notify.error('Mensaje simple')                    // string-only also works
 *   notify.info({ message, priority: 'high' })
 *   notify.dismiss(id)                                // close one
 *   notify.clear()                                    // close all
 */
(function() {
    'use strict';

    var MAX_VISIBLE = 4;
    var DURATIONS = { critical: 0, high: 8000, normal: 4000, low: 2000 };
    var STORAGE_SOUND_KEY = 'altorra_notif_sound';

    var ICONS = {
        success: 'check-circle-2',
        error: 'x-circle',
        info: 'info',
        warning: 'alert-triangle'
    };

    var DEFAULT_TITLES = {
        success: 'Listo',
        error: 'Error',
        info: 'Informacion',
        warning: 'Atencion'
    };

    var _container = null;
    var _activeToasts = [];
    var _idCounter = 0;
    var _soundEnabled = null;

    function getSoundEnabled() {
        if (_soundEnabled !== null) return _soundEnabled;
        try {
            var stored = localStorage.getItem(STORAGE_SOUND_KEY);
            _soundEnabled = stored === null ? true : stored === 'true';
        } catch (e) { _soundEnabled = true; }
        return _soundEnabled;
    }

    function setSoundEnabled(enabled) {
        _soundEnabled = !!enabled;
        try { localStorage.setItem(STORAGE_SOUND_KEY, _soundEnabled ? 'true' : 'false'); } catch (e) {}
    }

    function ensureContainer() {
        if (_container && document.body.contains(_container)) return _container;
        _container = document.querySelector('.altorra-notify-container');
        if (!_container) {
            _container = document.createElement('div');
            _container.className = 'altorra-notify-container';
            _container.setAttribute('aria-live', 'polite');
            _container.setAttribute('aria-atomic', 'false');
            document.body.appendChild(_container);
        }
        return _container;
    }

    function escapeHtml(str) {
        if (str === null || str === undefined) return '';
        var div = document.createElement('div');
        div.textContent = String(str);
        return div.innerHTML;
    }

    function refreshLucide(scope) {
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            try { window.lucide.createIcons(scope ? { context: scope } : undefined); } catch (e) {}
        }
    }

    /**
     * Normalize the various input shapes into a config object.
     * Accepts:
     *  - notify.success('msg')                    → { message: 'msg' }
     *  - notify.success('msg', 'title')           → { message: 'msg', title: 'title' }
     *  - notify.success({ message, title, ... })  → as-is
     */
    function normalizeArgs(arg1, arg2, arg3) {
        if (arg1 && typeof arg1 === 'object' && !Array.isArray(arg1)) return arg1;
        var cfg = { message: arg1 || '' };
        if (typeof arg2 === 'string') cfg.title = arg2;
        else if (typeof arg2 === 'object' && arg2) Object.assign(cfg, arg2);
        if (typeof arg3 === 'number') cfg.duration = arg3;
        return cfg;
    }

    function show(type, arg1, arg2, arg3) {
        var cfg = normalizeArgs(arg1, arg2, arg3);
        if (!cfg.message && !cfg.title) return null;

        var priority = cfg.priority || (type === 'error' ? 'high' : 'normal');
        var duration = cfg.duration != null ? cfg.duration : DURATIONS[priority];
        if (priority === 'critical') duration = 0;

        var id = ++_idCounter;
        var container = ensureContainer();

        var toast = document.createElement('div');
        var variantCls = cfg.variant ? ' altorra-notify--' + String(cfg.variant).replace(/[^a-z0-9_-]/gi, '') : '';
        toast.className = 'altorra-notify altorra-notify--' + type + variantCls + ' altorra-notify--enter';
        toast.setAttribute('role', type === 'error' ? 'alert' : 'status');
        toast.dataset.id = id;
        toast.dataset.type = type;
        if (priority === 'critical') toast.dataset.priority = 'critical';

        var title = cfg.title != null ? cfg.title : DEFAULT_TITLES[type];
        var iconName = cfg.icon || ICONS[type] || ICONS.info;

        var actionHtml = '';
        if (cfg.action && cfg.action.label) {
            actionHtml = '<button type="button" class="altorra-notify__action" data-notify-action>'
                + escapeHtml(cfg.action.label) + '</button>';
        }

        toast.innerHTML =
            '<div class="altorra-notify__icon"><i data-lucide="' + iconName + '"></i></div>'
            + '<div class="altorra-notify__body">'
                + (title ? '<div class="altorra-notify__title">' + escapeHtml(title) + '</div>' : '')
                + (cfg.message ? '<div class="altorra-notify__message">' + escapeHtml(cfg.message) + '</div>' : '')
                + actionHtml
            + '</div>'
            + '<button type="button" class="altorra-notify__close" aria-label="Cerrar"><i data-lucide="x"></i></button>';

        // Insert at top so newest is on top
        if (container.firstChild) container.insertBefore(toast, container.firstChild);
        else container.appendChild(toast);

        var record = { id: id, el: toast, timer: null, paused: false, remaining: duration, startedAt: Date.now() };
        _activeToasts.unshift(record);

        // Enforce max visible — remove oldest beyond limit
        while (_activeToasts.length > MAX_VISIBLE) {
            var old = _activeToasts.pop();
            if (old) dismiss(old.id, true);
        }

        // Trigger entrance animation on next frame
        requestAnimationFrame(function() {
            toast.classList.remove('altorra-notify--enter');
            toast.classList.add('altorra-notify--visible');
        });

        // Auto-close timer
        if (duration > 0) {
            record.timer = setTimeout(function() { dismiss(id); }, duration);
        }

        // Pause on hover (no visual indicator — compact design)
        toast.addEventListener('mouseenter', function() {
            if (record.timer) {
                clearTimeout(record.timer);
                record.timer = null;
                record.remaining = record.remaining - (Date.now() - record.startedAt);
                record.paused = true;
            }
        });
        toast.addEventListener('mouseleave', function() {
            if (record.paused && record.remaining > 0) {
                record.startedAt = Date.now();
                record.timer = setTimeout(function() { dismiss(id); }, record.remaining);
                record.paused = false;
            }
        });

        // Close button
        var closeBtn = toast.querySelector('.altorra-notify__close');
        if (closeBtn) closeBtn.addEventListener('click', function() { dismiss(id); });

        // Action button
        var actBtn = toast.querySelector('[data-notify-action]');
        if (actBtn && cfg.action && typeof cfg.action.onClick === 'function') {
            actBtn.addEventListener('click', function() {
                try { cfg.action.onClick(); } catch (e) {}
                if (cfg.action.dismissOnClick !== false) dismiss(id);
            });
        }

        // Sound
        if (cfg.sound !== false && getSoundEnabled() && typeof window.AltorraNotifySound === 'function') {
            try { window.AltorraNotifySound(cfg.soundType || type); } catch (e) {}
        }

        // Render Lucide icons
        refreshLucide(toast);

        return id;
    }

    function dismiss(id, immediate) {
        var idx = _activeToasts.findIndex(function(r) { return r.id === id; });
        if (idx === -1) return;
        var record = _activeToasts[idx];
        _activeToasts.splice(idx, 1);

        if (record.timer) clearTimeout(record.timer);

        if (immediate) {
            if (record.el && record.el.parentNode) record.el.parentNode.removeChild(record.el);
            return;
        }

        record.el.classList.remove('altorra-notify--visible');
        record.el.classList.add('altorra-notify--leave');
        setTimeout(function() {
            if (record.el && record.el.parentNode) record.el.parentNode.removeChild(record.el);
        }, 280);
    }

    function clear() {
        var ids = _activeToasts.map(function(r) { return r.id; });
        ids.forEach(function(id) { dismiss(id); });
    }

    // Esc closes the most recent
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && _activeToasts.length > 0) {
            dismiss(_activeToasts[0].id);
        }
    });

    // Reset auto-close timer for a still-visible toast (used when re-triggering)
    function resetTimer(idOrEl, newDuration) {
        var id = (typeof idOrEl === 'object' && idOrEl) ? Number(idOrEl.dataset.id) : idOrEl;
        var record = _activeToasts.find(function(r) { return r.id === id; });
        if (!record) return false;
        if (record.timer) clearTimeout(record.timer);
        var d = newDuration != null ? newDuration : record.remaining;
        record.remaining = d;
        record.startedAt = Date.now();
        if (d > 0) record.timer = setTimeout(function() { dismiss(id); }, d);
        return true;
    }

    var notify = {
        success: function(a, b, c) { return show('success', a, b, c); },
        error:   function(a, b, c) { return show('error',   a, b, c); },
        info:    function(a, b, c) { return show('info',    a, b, c); },
        warning: function(a, b, c) { return show('warning', a, b, c); },
        show: show,
        dismiss: dismiss,
        clear: clear,
        resetTimer: resetTimer,
        getSoundEnabled: getSoundEnabled,
        setSoundEnabled: setSoundEnabled
    };

    window.notify = notify;
    window.AltorraNotify = notify;

    // ────────────────────────────────────────────────────────────
    // Backwards-compatibility shims
    // ────────────────────────────────────────────────────────────

    // Public site: window.toast (replaces toast.js ToastManager)
    var legacyToast = {
        show: function(message, type, title, duration) {
            return show(type || 'info', { message: message, title: title, duration: duration });
        },
        success: function(message, title) { return show('success', { message: message, title: title }); },
        error:   function(message, title) { return show('error',   { message: message, title: title }); },
        info:    function(message, title) { return show('info',    { message: message, title: title }); },
        warning: function(message, title) { return show('warning', { message: message, title: title }); },
        close: function() {},
        closeAll: clear
    };
    window.toast = legacyToast;
    window.ToastManager = function() { return legacyToast; };

    // Admin: AP.toast(msg, type) — wired when AP is ready
    function wireAdminShim() {
        if (window.AP && typeof window.AP === 'object') {
            window.AP.toast = function(msg, type) {
                return show(type || 'success', { message: msg });
            };
            return true;
        }
        return false;
    }
    if (!wireAdminShim()) {
        // Retry shortly after — admin-state.js may load after this
        var retries = 0;
        var interval = setInterval(function() {
            retries++;
            if (wireAdminShim() || retries > 50) clearInterval(interval);
        }, 50);
    }
})();

/**
 * ALTORRA NOTIFICATIONS — Sound module (Phase N2)
 *
 * Generates short, subtle audio cues using the Web Audio API.
 * Zero external files — every sound is synthesized at runtime.
 *
 * Throttling: max 1 sound per 500ms window (prevents overlap on bursts).
 * Disabled when user has prefers-reduced-motion or sound preference is off.
 */
(function() {
    'use strict';

    var _audioCtx = null;
    var _lastPlayed = 0;
    var _userGestured = false;
    var THROTTLE_MS = 500;
    var VOLUME = 0.18;

    // Track first user gesture — Chrome's autoplay policy blocks AudioContext
    // until the user has interacted with the page. Without this gate, sounds
    // requested at page load (e.g. welcome toast, SW_UPDATED) trigger
    // "AudioContext was not allowed to start" warnings in console.
    function _markGestured() {
        if (_userGestured) return;
        _userGestured = true;
        // If a context was already created (suspended), resume it now that
        // we have a valid gesture context.
        if (_audioCtx && _audioCtx.state === 'suspended') {
            try { _audioCtx.resume(); } catch (e) {}
        }
    }
    var _gestureEvents = ['pointerdown', 'keydown', 'touchstart'];
    _gestureEvents.forEach(function (evt) {
        document.addEventListener(evt, _markGestured, { once: true, capture: true, passive: true });
    });

    function prefersReducedMotion() {
        try {
            return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        } catch (e) { return false; }
    }

    function getCtx() {
        if (_audioCtx) return _audioCtx;
        // Don't create the AudioContext until user has interacted —
        // prevents Chrome autoplay policy warnings on page load.
        if (!_userGestured) return null;
        var Ctor = window.AudioContext || window.webkitAudioContext;
        if (!Ctor) return null;
        try {
            _audioCtx = new Ctor();
            return _audioCtx;
        } catch (e) { return null; }
    }

    /**
     * Play a tone with configurable parameters.
     * @param {number} freqStart - Starting frequency in Hz
     * @param {number} freqEnd - Ending frequency in Hz (for glide)
     * @param {number} duration - Duration in ms
     * @param {string} oscType - Oscillator type: 'sine', 'triangle', 'square'
     * @param {number} startOffset - Delay before playing in ms
     */
    function playTone(freqStart, freqEnd, duration, oscType, startOffset) {
        var ctx = getCtx();
        if (!ctx) return;
        if (ctx.state !== 'running') return;

        var now = ctx.currentTime + (startOffset || 0) / 1000;
        var dur = duration / 1000;

        var osc = ctx.createOscillator();
        osc.type = oscType || 'sine';
        osc.frequency.setValueAtTime(freqStart, now);
        if (freqEnd && freqEnd !== freqStart) {
            osc.frequency.exponentialRampToValueAtTime(Math.max(20, freqEnd), now + dur);
        }

        var gain = ctx.createGain();
        // Envelope: quick attack, smooth release for clean sound
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(VOLUME, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + dur + 0.05);
    }

    var SOUNDS = {
        success: function() {
            // Bright two-tone ascending chime: C6 → E6
            playTone(1046.5, 1046.5, 90, 'sine', 0);
            playTone(1318.5, 1318.5, 130, 'sine', 80);
        },
        error: function() {
            // Descending error tone: A4 → A3 with triangle for warmth
            playTone(440, 220, 350, 'triangle', 0);
        },
        info: function() {
            // Single soft ping: E6
            playTone(1318.5, 1318.5, 150, 'sine', 0);
        },
        warning: function() {
            // Double pulse at D5
            playTone(587.33, 587.33, 100, 'triangle', 0);
            playTone(587.33, 587.33, 100, 'triangle', 160);
        },
        attention: function() {
            // Gentle ascending tap: B4 → E5 (softer login prompt)
            playTone(493.88, 493.88, 60, 'sine', 0);
            playTone(659.26, 659.26, 80, 'sine', 100);
        }
    };

    /**
     * Public API: play a notification sound by type.
     * Respects user preference (localStorage 'altorra_notif_sound') and
     * prefers-reduced-motion. Throttled to 1 sound per 500ms.
     */
    window.AltorraNotifySound = function(type) {
        if (prefersReducedMotion()) return;
        var now = Date.now();
        if (now - _lastPlayed < THROTTLE_MS) return;
        _lastPlayed = now;

        var fn = SOUNDS[type] || SOUNDS.info;
        try { fn(); } catch (e) {}
    };
})();
/**
 * ALTORRA NOTIFICATION CENTER (Phase N3)
 *
 * Persistent notification log accessible via a bell icon in the header.
 * Stores last 20 notifications in localStorage. Renders a slide-out panel
 * on click with mark-as-read, clear-all, and per-item dismiss.
 *
 * Auto-captures every notify.* call so callers don't need to do anything.
 *
 * Usage:
 *   notifyCenter.add({ type, title, message, link, action })   // add manually
 *   notifyCenter.markAllRead()
 *   notifyCenter.clear()
 *   notifyCenter.mount('#bell-container')                       // attach bell+panel
 *   notifyCenter.injectIntoHeader()                             // auto-find header
 */
(function() {
    'use strict';

    if (window.notifyCenter) return; // already loaded

    var STORAGE_KEY = 'altorra_notif_history';
    var MAX_ENTRIES = 50;
    var ENTRY_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

    // ─── Persistence policy (Phase A1 — opt-in) ─────────────────
    // The bell is for *asynchronous* events the user should review later
    // (price drops, status changes, security events). It is NOT for
    // ephemeral feedback (login/logout, "saved", validation errors).
    //
    // Default: do NOT persist. Callers must opt in explicitly via:
    //   - { persist: true }                     (legacy/free-form)
    //   - { category: '<persist-category>' }    (preferred — see PERSIST_CATEGORIES)
    //
    // Categories declared as persistable map to product features:
    //   price_alert        — Cambios en precio de favoritos / busquedas
    //   request_update     — Cambios de estado en una solicitud
    //   appointment_update — Cambios de estado en una cita
    //   search_match       — Vehiculos nuevos que matchean una busqueda guardada
    //   inventory_change   — Vehiculo favorito reservado/vendido
    //   system             — Avisos de sistema (nueva version, mantenimiento)
    //   security           — Logins desde nuevo dispositivo, cuenta bloqueada
    var PERSIST_CATEGORIES = {
        price_alert: true,
        request_update: true,
        appointment_update: true,
        search_match: true,
        inventory_change: true,
        system: true,
        security: true
    };

    var _entries = [];
    var _listeners = [];

    // ─── Persistence ────────────────────────────────────────────
    function load() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            _entries = raw ? JSON.parse(raw) : [];
            if (!Array.isArray(_entries)) _entries = [];
            // TTL cleanup: drop entries older than ENTRY_TTL_MS
            var cutoff = Date.now() - ENTRY_TTL_MS;
            var fresh = _entries.filter(function(e) { return e && e.timestamp && e.timestamp >= cutoff; });
            if (fresh.length !== _entries.length) {
                _entries = fresh;
                save();
            }
        } catch (e) { _entries = []; }
    }

    // ─── Migration: scrub legacy spam (Phase G1) ────────────────
    // Pre-A1, every notify.* call was logged to the bell. Existing users
    // have hundreds of "Hola de nuevo", "Sesion cerrada", "Cargando..."
    // entries polluting their notification center. Run ONCE per user:
    //   - Drop entries whose title/message matches known transient patterns
    //   - Mark remaining pre-schema entries (no `category` field) as read
    //     so the badge clears even if some legit-looking message snuck in
    var MIGRATION_KEY = 'altorra_notif_migration_v1';
    var TRANSIENT_TITLE_PATTERNS = [
        /^.?Hola de nuevo/i,
        /^.?Bienvenid/i,
        /^Sesi[oó]n cerrada/i,
        /^Sesi[oó]n iniciada/i,
        /^Conexi[oó]n restablecida/i,
        /^Sin conexi[oó]n/i,
        /^Cargando/i,
        /^Guardad/i,
        /^Listo$/i,
        /^Error$/i,
        /^Informaci[oó]n$/i,
        /^Atenci[oó]n$/i,
        /^Cuenta creada/i,
        /^Cerr[áa]ndo sesi[oó]n/i,
        /^Ya iniciaste sesi[oó]n/i
    ];
    var TRANSIENT_MESSAGE_PATTERNS = [
        /^.?Hola de nuevo/i,
        /^.?Bienvenid/i,
        /^Sesi[oó]n cerrada correctamente/i,
        /^Sesi[oó]n iniciada en otra pesta/i,
        /^Sesi[oó]n cerrada en otra pesta/i,
        /^Conexi[oó]n restablecida/i,
        /^Sin conexi[oó]n a internet/i,
        /^Cargando/i,
        /^Tu cuenta con Google est/i,
        /^Sesi[oó]n cerrada localmente/i
    ];

    function isTransientLegacy(entry) {
        if (!entry) return false;
        if (entry.category) return false; // already new-schema, leave it
        var t = entry.title || '';
        var m = entry.message || '';
        return TRANSIENT_TITLE_PATTERNS.some(function(p) { return p.test(t); })
            || TRANSIENT_MESSAGE_PATTERNS.some(function(p) { return p.test(m); });
    }

    function migrateLegacy() {
        var done = false;
        try { done = !!localStorage.getItem(MIGRATION_KEY); } catch (e) { return; }
        if (done) return;

        var before = _entries.length;
        _entries = _entries.filter(function(e) { return !isTransientLegacy(e); });
        var scrubbed = before - _entries.length;

        // Mark surviving legacy (no-category) entries as read so the badge clears
        var marked = 0;
        _entries.forEach(function(e) {
            if (!e.category && !e.read) { e.read = true; marked++; }
        });

        if (scrubbed > 0 || marked > 0) save();
        try { localStorage.setItem(MIGRATION_KEY, '1'); } catch (e) {}
        if (scrubbed > 0 || marked > 0) {
            try { console.info('[NotifyCenter] Migration v1: scrubbed ' + scrubbed + ' transient, marked ' + marked + ' as read'); } catch (e) {}
        }
    }
    function save() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(_entries));
        } catch (e) {
            // Quota exceeded — evict half and retry once
            try {
                _entries = _entries.slice(0, Math.floor(_entries.length / 2));
                localStorage.setItem(STORAGE_KEY, JSON.stringify(_entries));
            } catch (e2) {}
        }
    }

    // ─── Time formatting ────────────────────────────────────────
    function timeAgo(ts) {
        var diff = Math.floor((Date.now() - ts) / 1000);
        if (diff < 60) return 'Ahora mismo';
        if (diff < 3600) return 'Hace ' + Math.floor(diff / 60) + ' min';
        if (diff < 86400) return 'Hace ' + Math.floor(diff / 3600) + ' h';
        if (diff < 604800) return 'Hace ' + Math.floor(diff / 86400) + ' d';
        return new Date(ts).toLocaleDateString('es-CO', { day: 'numeric', month: 'short' });
    }

    // ─── Core API ───────────────────────────────────────────────
    // Dedup window: skip identical entry (same type+title+message) within 10s
    var DEDUP_WINDOW_MS = 10 * 1000;
    function isDuplicate(type, title, message) {
        if (!_entries.length) return false;
        var cutoff = Date.now() - DEDUP_WINDOW_MS;
        for (var i = 0; i < _entries.length; i++) {
            var e = _entries[i];
            if (!e || !e.timestamp || e.timestamp < cutoff) break; // entries are ordered desc
            if (e.type === type && e.title === title && e.message === message) return true;
        }
        return false;
    }

    // ─── Category metadata (Phase A2) ───────────────────────────
    // Defaults applied when callers use notifyCenter.notify(category, payload)
    // instead of building the cfg manually. Centralizes icon/sound/priority
    // per category so the UI is consistent and callers stay focused on data.
    var CATEGORY_DEFAULTS = {
        price_alert: {
            type: 'success',
            icon: 'trending-down',
            priority: 'normal',
            soundType: 'success',
            defaultTitle: 'Cambio de precio',
            dedupMs: 6 * 60 * 60 * 1000      // 6h per (category, entityRef)
        },
        request_update: {
            type: 'info',
            icon: 'message-square-text',
            priority: 'high',
            soundType: 'info',
            defaultTitle: 'Solicitud actualizada',
            dedupMs: 30 * 1000               // 30s burst dedup
        },
        appointment_update: {
            type: 'info',
            icon: 'calendar-check-2',
            priority: 'high',
            soundType: 'info',
            defaultTitle: 'Cita actualizada',
            dedupMs: 30 * 1000
        },
        search_match: {
            type: 'success',
            icon: 'search-check',
            priority: 'normal',
            soundType: 'success',
            defaultTitle: 'Nuevos vehiculos para ti',
            dedupMs: 24 * 60 * 60 * 1000     // 24h max per saved search
        },
        inventory_change: {
            type: 'warning',
            icon: 'package',
            priority: 'normal',
            soundType: 'warning',
            defaultTitle: 'Cambio de inventario',
            dedupMs: 60 * 60 * 1000          // 1h per vehicle
        },
        system: {
            type: 'info',
            icon: 'bell-ring',
            priority: 'low',
            soundType: 'info',
            defaultTitle: 'Aviso del sistema',
            dedupMs: 5 * 60 * 1000           // 5m
        },
        security: {
            type: 'warning',
            icon: 'shield-alert',
            priority: 'critical',
            soundType: 'warning',
            defaultTitle: 'Aviso de seguridad',
            dedupMs: 0                       // never dedup
        }
    };

    // Entity-keyed dedup. Avoids re-emitting the same event for the same
    // entity within the category-specific window (e.g. don't show two
    // price_alert toasts for the same vehicle within 6h).
    function isDuplicateForEntity(category, entityRef, windowMs) {
        if (!entityRef || !windowMs) return false;
        var cutoff = Date.now() - windowMs;
        for (var i = 0; i < _entries.length; i++) {
            var e = _entries[i];
            if (!e || !e.timestamp) continue;
            if (e.timestamp < cutoff) break; // ordered desc
            if (e.category === category && e.entityRef === entityRef) return true;
        }
        return false;
    }

    function add(entry) {
        if (!entry) return null;
        var type = entry.type || 'info';
        var title = entry.title || '';
        var message = entry.message || '';
        // Defensive: skip empty entries
        if (!title && !message) return null;
        if (isDuplicate(type, title, message)) return null;

        var now = Date.now();
        var item = {
            id: 'n_' + now + '_' + Math.random().toString(36).slice(2, 8),
            type: type,
            title: title,
            message: message,
            link: entry.link || null,
            category: entry.category || null,
            priority: entry.priority || null,
            entityRef: entry.entityRef || null,
            actionLabel: entry.actionLabel || null,
            timestamp: now,
            read: false
        };
        _entries.unshift(item);
        if (_entries.length > MAX_ENTRIES) _entries = _entries.slice(0, MAX_ENTRIES);
        save();
        notifyListeners();
        return item.id;
    }

    function markAllRead() {
        _entries.forEach(function(e) { e.read = true; });
        save();
        notifyListeners();
    }

    function markRead(id) {
        var entry = _entries.find(function(e) { return e.id === id; });
        if (entry) { entry.read = true; save(); notifyListeners(); }
    }

    function remove(id) {
        _entries = _entries.filter(function(e) { return e.id !== id; });
        save();
        notifyListeners();
    }

    function clear() {
        _entries = [];
        save();
        notifyListeners();
    }

    function getEntries() { return _entries.slice(); }
    function getUnreadCount() { return _entries.filter(function(e) { return !e.read; }).length; }

    function subscribe(fn) { _listeners.push(fn); return function() { _listeners = _listeners.filter(function(l) { return l !== fn; }); }; }
    function notifyListeners() { _listeners.forEach(function(fn) { try { fn(_entries); } catch (e) {} }); }

    // ─── Auto-capture from notify.* calls (opt-in, Phase A1) ────
    // Pre-A1: every notify.* call was logged to the bell, polluting it
    // with login/logout/save/validation feedback. Now the wrapper only
    // captures calls that explicitly opt in:
    //
    //   notify.success({ category: 'price_alert', ... })   ← persists
    //   notify.success({ persist: true, ... })             ← persists (legacy)
    //   notify.success('Guardado correctamente')           ← does NOT persist
    //
    // For curated event types, prefer notifyCenter.notify(category, payload)
    // which is the explicit API for persistent events (Phase A2).
    function shouldPersist(cfg) {
        if (!cfg || typeof cfg !== 'object') return false;
        // Explicit opt-out wins
        if (cfg.persist === false) return false;
        if (cfg.logHistory === false) return false;
        // Explicit opt-in
        if (cfg.persist === true) return true;
        if (cfg.logHistory === true) return true;
        // Category-driven opt-in
        if (cfg.category && PERSIST_CATEGORIES[cfg.category]) return true;
        // Default: do NOT persist (transactional feedback)
        return false;
    }

    function wrapNotify() {
        if (!window.notify || window._notifyCenterWrapped) return;
        window._notifyCenterWrapped = true;

        function logEntry(type, arg1) {
            var cfg = (typeof arg1 === 'object' && arg1) ? arg1 : null;
            if (!shouldPersist(cfg)) return;
            // Skip empty notifications
            var title = cfg.title || '';
            var message = cfg.message || '';
            if (!title && !message) return;
            add({
                type: type,
                title: title,
                message: message,
                link: cfg.link || (cfg.action && cfg.action.href) || null,
                category: cfg.category || null,
                priority: cfg.priority || null,
                entityRef: cfg.entityRef || null,
                actionLabel: cfg.action && cfg.action.label || null
            });
        }

        ['success', 'error', 'warning', 'info'].forEach(function(type) {
            var orig = window.notify[type];
            if (typeof orig !== 'function') return;
            window.notify[type] = function(arg1, arg2, arg3) {
                var result = orig.call(window.notify, arg1, arg2, arg3);
                logEntry(type, arg1);
                return result;
            };
        });

        // Also wrap notify.show(type, ...) so programmatic calls are captured
        var origShow = window.notify.show;
        if (typeof origShow === 'function') {
            window.notify.show = function(type, arg1, arg2, arg3) {
                var result = origShow.call(window.notify, type, arg1, arg2, arg3);
                logEntry(type || 'info', arg1);
                return result;
            };
        }

        // Wrap legacy window.toast.* shims too (used by older code)
        if (window.toast && !window.toast._wrapped) {
            window.toast._wrapped = true;
            ['success', 'error', 'warning', 'info'].forEach(function(type) {
                var orig = window.toast[type];
                if (typeof orig !== 'function') return;
                window.toast[type] = function(message, title) {
                    var result = orig.call(window.toast, message, title);
                    logEntry(type, { message: message, title: title });
                    return result;
                };
            });
            var origToastShow = window.toast.show;
            if (typeof origToastShow === 'function') {
                window.toast.show = function(message, type, title, duration) {
                    var result = origToastShow.call(window.toast, message, type, title, duration);
                    logEntry(type || 'info', { message: message, title: title });
                    return result;
                };
            }
        }
    }

    // ─── UI: Bell + Panel ───────────────────────────────────────
    var ICONS = {
        success: 'check-circle-2',
        error: 'x-circle',
        info: 'info',
        warning: 'alert-triangle'
    };

    // Category-aware icons + labels for the bell (Phase A3)
    // When a bell entry has a `category`, prefer that category's icon over
    // the type-default. Labels are shown as a subtle pill below the title.
    var CATEGORY_LABELS = {
        price_alert: 'Precio',
        request_update: 'Solicitud',
        appointment_update: 'Cita',
        search_match: 'Busqueda',
        inventory_change: 'Inventario',
        system: 'Sistema',
        security: 'Seguridad'
    };
    function iconForEntry(e) {
        if (!e) return 'info';
        if (e.category && CATEGORY_DEFAULTS[e.category] && CATEGORY_DEFAULTS[e.category].icon) {
            return CATEGORY_DEFAULTS[e.category].icon;
        }
        return ICONS[e.type] || 'info';
    }

    function createBell(target) {
        if (!target) return null;
        if (target.querySelector('.altorra-bell')) return target.querySelector('.altorra-bell');

        var bell = document.createElement('button');
        bell.type = 'button';
        bell.className = 'altorra-bell';
        bell.setAttribute('aria-label', 'Centro de notificaciones');
        bell.innerHTML = '<i data-lucide="bell"></i><span class="altorra-bell__badge" hidden>0</span>';
        target.appendChild(bell);

        var panel = createPanel();
        document.body.appendChild(panel);

        bell.addEventListener('click', function(e) {
            e.stopPropagation();
            togglePanel(panel, bell);
        });

        document.addEventListener('click', function(e) {
            if (!panel.contains(e.target) && !bell.contains(e.target)) closePanel(panel);
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closePanel(panel);
        });

        if (window.lucide) try { window.lucide.createIcons({ context: bell }); } catch (e) {}

        // Subscribe to updates
        subscribe(function() { updateBellBadge(bell); renderEntries(panel); });
        updateBellBadge(bell);
        return bell;
    }

    function updateBellBadge(bell) {
        if (!bell) return;
        var badge = bell.querySelector('.altorra-bell__badge');
        if (!badge) return;
        var count = getUnreadCount();
        if (count > 0) {
            badge.textContent = count > 9 ? '9+' : String(count);
            badge.hidden = false;
        } else {
            badge.hidden = true;
        }
    }

    function createPanel() {
        var panel = document.createElement('div');
        panel.className = 'altorra-notify-center';
        panel.setAttribute('role', 'region');
        panel.setAttribute('aria-label', 'Notificaciones');
        panel.innerHTML =
            '<div class="altorra-notify-center__head">' +
                '<h3>Notificaciones</h3>' +
                '<div class="altorra-notify-center__head-actions">' +
                    '<button type="button" class="altorra-notify-center__action" data-action="mark-all-read" title="Marcar todas como leidas"><i data-lucide="check-check"></i></button>' +
                    '<button type="button" class="altorra-notify-center__action" data-action="clear" title="Limpiar todo"><i data-lucide="trash-2"></i></button>' +
                    '<button type="button" class="altorra-notify-center__close" data-action="close" aria-label="Cerrar"><i data-lucide="x"></i></button>' +
                '</div>' +
            '</div>' +
            '<div class="altorra-notify-center__list" id="altorra-notify-center-list"></div>';

        panel.addEventListener('click', function(e) {
            var btn = e.target.closest('[data-action]');
            if (!btn) {
                var item = e.target.closest('[data-id]');
                if (item) {
                    var id = item.dataset.id;
                    var entry = _entries.find(function(x) { return x.id === id; });
                    if (entry) {
                        markRead(id);
                        if (entry.link) {
                            // Close panel before navigation so the user
                            // sees a clean transition (no panel left over)
                            closePanel(panel);
                            // Defer href change one frame so the close
                            // animation can start
                            requestAnimationFrame(function() { window.location.href = entry.link; });
                        }
                    }
                }
                return;
            }
            var action = btn.dataset.action;
            if (action === 'mark-all-read') markAllRead();
            else if (action === 'clear') {
                if (_entries.length === 0) return;
                if (confirm('¿Limpiar todas las notificaciones?')) clear();
            }
            else if (action === 'close') closePanel(panel);
            else if (action === 'remove') {
                e.stopPropagation();
                var rid = btn.dataset.id;
                if (rid) { remove(rid); }
            }
        });

        return panel;
    }

    function renderEntries(panel) {
        var list = panel.querySelector('#altorra-notify-center-list');
        if (!list) return;
        if (_entries.length === 0) {
            list.innerHTML = '<div class="altorra-notify-center__empty">' +
                '<i data-lucide="bell-off"></i>' +
                '<p>Aqui veras alertas de precio en tus favoritos, ' +
                'cambios en tus solicitudes y citas, y matches en tus busquedas guardadas.</p>' +
                '</div>';
            if (window.lucide) try { window.lucide.createIcons({ context: list }); } catch (e) {}
            return;
        }
        var html = _entries.map(function(e) {
            var icon = iconForEntry(e);
            var catAttr = e.category ? ' data-category="' + escapeHtml(e.category) + '"' : '';
            var catLabel = e.category && CATEGORY_LABELS[e.category]
                ? '<span class="altorra-notify-center__item-cat">' + escapeHtml(CATEGORY_LABELS[e.category]) + '</span>'
                : '';
            var hasLink = e.link ? ' altorra-notify-center__item--linkable' : '';
            return '<div class="altorra-notify-center__item' + (e.read ? '' : ' altorra-notify-center__item--unread') + hasLink + '" data-id="' + e.id + '" data-type="' + e.type + '"' + catAttr + '>' +
                '<div class="altorra-notify-center__item-icon"><i data-lucide="' + icon + '"></i></div>' +
                '<div class="altorra-notify-center__item-body">' +
                    (e.title ? '<div class="altorra-notify-center__item-title">' + escapeHtml(e.title) + '</div>' : '') +
                    (e.message ? '<div class="altorra-notify-center__item-message">' + escapeHtml(e.message) + '</div>' : '') +
                    '<div class="altorra-notify-center__item-meta">' +
                        '<span class="altorra-notify-center__item-time">' + timeAgo(e.timestamp) + '</span>' +
                        catLabel +
                    '</div>' +
                '</div>' +
                '<button type="button" class="altorra-notify-center__item-remove" data-action="remove" data-id="' + e.id + '" title="Quitar"><i data-lucide="x"></i></button>' +
            '</div>';
        }).join('');
        list.innerHTML = html;
        if (window.lucide) try { window.lucide.createIcons({ context: list }); } catch (e) {}
    }

    function escapeHtml(str) {
        if (str === null || str === undefined) return '';
        var div = document.createElement('div');
        div.textContent = String(str);
        return div.innerHTML;
    }

    function togglePanel(panel, bell) {
        if (panel.classList.contains('altorra-notify-center--open')) closePanel(panel);
        else openPanel(panel, bell);
    }

    function openPanel(panel, bell) {
        renderEntries(panel);
        panel.classList.add('altorra-notify-center--open');
    }

    function closePanel(panel) {
        panel.classList.remove('altorra-notify-center--open');
    }

    // ─── Auto-injection into known headers ─────────────────────
    function injectIntoHeader() {
        // Try common header targets
        var targets = [
            '.header-actions',     // public site (may exist)
            '.admin-header-actions', // admin
            '.header-icons',
            'header .actions'
        ];
        for (var i = 0; i < targets.length; i++) {
            var el = document.querySelector(targets[i]);
            if (el) {
                createBell(el);
                return true;
            }
        }
        return false;
    }

    // ─── Explicit category API (Phase A2) ───────────────────────
    // Preferred way to emit a persistent event. Centralizes defaults
    // (icon, priority, sound, dedup window) per category. Call sites
    // stay focused on the data, not on UI plumbing.
    //
    //   notifyCenter.notify('price_alert', {
    //       title: 'Bajo el precio del Chevrolet Equinox',
    //       message: 'De $80M a $76M (-5%)',
    //       link: 'vehiculos/chevrolet-equinox-2018-1.html',
    //       entityRef: 'vehicle:abc123',
    //       suppressToast: false                      // optional
    //   });
    //
    // Returns: id of bell entry, or null if deduped/invalid/disabled.

    // G2 — User-level opt-out per category. Each category can be muted
    // by the user in perfil → Preferencias → Notificaciones. Read from
    // localStorage for hot-path performance (no JSON parse on every emit).
    // Key format: altorra_notif_cat_<category> = '0' (disabled) | '1' (default)
    // Security category is NEVER mutable — those alerts are too important.
    function isCategoryEnabled(category) {
        if (category === 'security') return true;
        try {
            var v = localStorage.getItem('altorra_notif_cat_' + category);
            return v !== '0';
        } catch (e) { return true; }
    }

    function emitCategorical(category, payload) {
        var defaults = CATEGORY_DEFAULTS[category];
        if (!defaults) {
            // Unknown category — degrade to plain info toast (NO bell entry)
            if (window.notify && payload) {
                try { window.notify.info(payload); } catch (e) {}
            }
            return null;
        }
        // G2 — respect user opt-out
        if (!isCategoryEnabled(category)) return null;
        payload = payload || {};
        var title = payload.title || defaults.defaultTitle;
        var message = payload.message || '';
        if (!title && !message) return null;

        // Entity-keyed dedup: skip if same (category, entityRef) in window
        if (payload.entityRef && defaults.dedupMs > 0
            && isDuplicateForEntity(category, payload.entityRef, defaults.dedupMs)) {
            return null;
        }

        // Build the cfg used by both notify (toast) and add (bell entry)
        var cfg = {
            title: title,
            message: message,
            link: payload.link || null,
            category: category,
            priority: payload.priority || defaults.priority,
            entityRef: payload.entityRef || null,
            icon: payload.icon || defaults.icon,
            soundType: payload.soundType || defaults.soundType,
            action: payload.action || null
        };

        var suppressToast = payload.suppressToast === true
            || (typeof document !== 'undefined' && document.hidden && payload.suppressIfHidden !== false);

        if (!suppressToast && window.notify && typeof window.notify[defaults.type] === 'function') {
            // Toast + bell (auto-persisted by wrapNotify because category is whitelisted)
            try { window.notify[defaults.type](cfg); } catch (e) {}
            // Find the most recent matching bell entry to return its id
            var last = _entries[0];
            return last ? last.id : null;
        }

        // No toast (suppressed or notify unavailable) — write directly to bell
        return add({
            type: defaults.type,
            title: cfg.title,
            message: cfg.message,
            link: cfg.link,
            category: category,
            priority: cfg.priority,
            entityRef: cfg.entityRef,
            actionLabel: cfg.action && cfg.action.label || null
        });
    }

    function getCategoryMeta(category) {
        return CATEGORY_DEFAULTS[category] || null;
    }

    // ─── Public API ─────────────────────────────────────────────
    window.notifyCenter = {
        add: add,
        notify: emitCategorical,
        markAllRead: markAllRead,
        markRead: markRead,
        remove: remove,
        clear: clear,
        getEntries: getEntries,
        getUnreadCount: getUnreadCount,
        subscribe: subscribe,
        getCategoryMeta: getCategoryMeta,
        categories: Object.keys(CATEGORY_DEFAULTS),
        mount: function(target) {
            var el = typeof target === 'string' ? document.querySelector(target) : target;
            return createBell(el);
        },
        injectIntoHeader: injectIntoHeader
    };

    // ─── Init ──────────────────────────────────────────────────
    load();
    migrateLegacy();

    // window.notify is defined synchronously in the previous IIFE in this file,
    // so we can wrap it immediately. Fallback to polling only if not ready
    // (defensive — shouldn't happen in normal load order).
    if (window.notify) {
        wrapNotify();
    } else {
        var wrapAttempts = 0;
        var wrapInterval = setInterval(function() {
            wrapAttempts++;
            if (window.notify) { wrapNotify(); clearInterval(wrapInterval); }
            else if (wrapAttempts > 50) clearInterval(wrapInterval);
        }, 50);
    }
})();
