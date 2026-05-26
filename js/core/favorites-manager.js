/**
 * ALTORRA CARS - Favorites Manager
 *
 * Patron: cache localStorage + sync debounced a Firestore con proteccion
 * contra race conditions.
 *
 * - `_favorites`     → array de strings (IDs normalizados)
 * - `_pendingOps`    → cola de operaciones aplicadas durante un read en vuelo
 * - `_readInFlight`  → flag para detectar mutaciones concurrentes
 * - API sincronica: has(), getAll(), count(), add(), remove(), toggle()
 * - API alta: handleHeartClick(button, vehicleId, opts) — todo lo que UN click necesita
 */

class FavoritesManager {
    constructor() {
        this.DEBUG = false;
        this._uid = null;
        this._favorites = [];
        this._loaded = false;
        this._syncedFromFirestore = false;
        this._syncTimeout = null;
        this._observing = false;
        this._cachePrefix = 'altorra_fav_cache_';
        this._lastUidKey = 'altorra_fav_last_uid';

        // Race protection: track operations during in-flight Firestore reads
        this._pendingOps = [];          // [{op:'add'|'remove', id:String}]
        this._readInFlight = false;

        // Sync retry state
        this._syncMaxRetries = 3;
        this._syncFailureNotified = false;

        // EAGER HYDRATION: pre-load favorites from localStorage BEFORE Firebase
        // Auth resolves. The favorites page renders instantly on page load.
        try {
            var lastUid = localStorage.getItem(this._lastUidKey);
            if (lastUid) {
                var cached = this._readLocalCache(lastUid);
                if (cached) {
                    this._uid = lastUid;
                    this._favorites = cached;
                    this._loaded = true;
                    var self = this;
                    if (document.readyState === 'loading') {
                        document.addEventListener('DOMContentLoaded', function () {
                            self._dispatchEvent('cached', null, { eager: true });
                            self.updateAllCounters();
                        });
                    } else {
                        setTimeout(function () {
                            self._dispatchEvent('cached', null, { eager: true });
                            self.updateAllCounters();
                        }, 0);
                    }
                }
            }
        } catch (e) { /* localStorage disabled */ }
    }

    // ── LocalStorage cache ──────────────────────────────────
    _cacheKey(uid) {
        return this._cachePrefix + (uid || this._uid || '');
    }

    _readLocalCache(uid) {
        try {
            var raw = localStorage.getItem(this._cacheKey(uid));
            if (!raw) return null;
            var parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed.map(String) : null;
        } catch (e) { return null; }
    }

    _writeLocalCache(uid) {
        try {
            localStorage.setItem(this._cacheKey(uid), JSON.stringify(this._favorites));
        } catch (e) { /* quota exceeded */ }
    }

    // ── User binding ────────────────────────────────────────
    setUser(uid) {
        if (!uid) { this.clearUser(); return; }
        if (this._uid === uid && this._syncedFromFirestore) return;

        var sameUid = this._uid === uid;
        this._uid = uid;
        this._syncedFromFirestore = false;

        try { localStorage.setItem(this._lastUidKey, uid); } catch (e) {}

        // PASO 1: Hidratar desde localStorage (instantaneo)
        if (!sameUid || !this._loaded) {
            var cached = this._readLocalCache(uid);
            if (cached) {
                this._favorites = cached;
                this._loaded = true;
                this._dispatchEvent('cached', null);
                this.updateAllCounters();
            } else {
                this._favorites = [];
                this._loaded = false;
                this.updateAllCounters();
            }
        }

        // PASO 2: Refresh desde Firestore (puede llegar despues)
        this._loadFromFirestore();
    }

    clearUser(opts) {
        if (this._syncTimeout) { clearTimeout(this._syncTimeout); this._syncTimeout = null; }
        var purge = opts && opts.purgeCache;
        try {
            localStorage.removeItem(this._lastUidKey);
            if (purge && this._uid) {
                localStorage.removeItem(this._cacheKey(this._uid));
            }
        } catch (e) {}
        this._uid = null;
        this._favorites = [];
        this._loaded = false;
        this._syncedFromFirestore = false;
        this._pendingOps = [];
        this._readInFlight = false;
        this._dispatchEvent('cleared', null);
        this.updateAllCounters();
    }

    // ── Firestore I/O with race protection ──────────────────

    /**
     * Apply operations (add/remove) to a base array. Used to merge
     * pending mutations into a stale Firestore read.
     */
    _applyOps(arr, ops) {
        var result = arr.slice();
        for (var i = 0; i < ops.length; i++) {
            var op = ops[i];
            var idx = result.indexOf(op.id);
            if (op.op === 'add' && idx === -1) result.push(op.id);
            else if (op.op === 'remove' && idx !== -1) result.splice(idx, 1);
        }
        return result;
    }

    _loadFromFirestore(retryCount) {
        if (!this._uid || !window.db) return;
        var self = this;
        var uid = this._uid;
        var attempt = retryCount || 0;

        self._readInFlight = true;
        if (attempt === 0) self._pendingOps = []; // fresh read → reset queue

        window.db.collection('clientes').doc(uid).get()
            .then(function (doc) {
                if (uid !== self._uid) { self._readInFlight = false; return; }
                var arr = (doc.exists && Array.isArray(doc.data().favoritos))
                    ? doc.data().favoritos.map(String)
                    : [];

                // CRITICAL: apply any operations that happened during the read.
                // Without this, rapid clicks during Firestore round-trip get wiped.
                var pendingOps = self._pendingOps.slice();
                if (pendingOps.length > 0) {
                    arr = self._applyOps(arr, pendingOps);
                    self._log('Applied', pendingOps.length, 'pending ops to Firestore data');
                }
                self._pendingOps = [];
                self._readInFlight = false;

                var cacheStr = JSON.stringify(self._favorites.slice().sort());
                var freshStr = JSON.stringify(arr.slice().sort());
                var changed = cacheStr !== freshStr;

                self._favorites = arr;
                self._loaded = true;
                self._syncedFromFirestore = true;
                self._writeLocalCache(uid);

                // If we merged pending ops, push the corrected state to Firestore
                if (pendingOps.length > 0) self._debouncedSync();

                self._dispatchEvent('synced', null, { changed: changed });
                self.updateAllCounters();
                self._log('Loaded:', arr.length, changed ? '(updated)' : '(match)');
            })
            .catch(function (err) {
                var msg = (err && err.message) || '';
                // WebChannel race after signIn: SDK may send read with anonymous
                // token before the new token propagates. Retry briefly.
                if (attempt < 2 && msg.indexOf('permissions') !== -1) {
                    var delay = (attempt + 1) * 500;
                    setTimeout(function () {
                        if (uid !== self._uid) { self._readInFlight = false; return; }
                        self._loadFromFirestore(attempt + 1);
                    }, delay);
                    return;
                }
                self._readInFlight = false;
                console.warn('[Favorites] Error loading from Firestore:', msg);
                self._loaded = true;
                self._syncedFromFirestore = true;
                self._dispatchEvent('synced', null, { changed: false, error: true });
            });
    }

    _syncToFirestore(retryCount) {
        if (!this._uid || !window.db) return;
        var self = this;
        var uid = this._uid;
        var attempt = retryCount || 0;
        // Always read latest state at flush time (not closure-captured)
        var favs = self._favorites.slice();

        window.db.collection('clientes').doc(uid).set({
            uid: uid,
            favoritos: favs,
            ultimoAcceso: new Date().toISOString()
        }, { merge: true }).then(function () {
            self._syncFailureNotified = false;
            self._dispatchEvent('persistSuccess', null);
        }).catch(function (err) {
            var msg = (err && err.message) || '';
            // Exponential backoff retry: 500ms, 1s, 2s
            if (attempt < self._syncMaxRetries) {
                var backoff = Math.pow(2, attempt) * 500;
                setTimeout(function () {
                    if (uid !== self._uid) return;
                    self._syncToFirestore(attempt + 1);
                }, backoff);
                return;
            }
            console.warn('[Favorites] Sync failed after retries:', msg);
            self._dispatchEvent('persistFailed', null, { error: msg });
            // Notify the user once per failure window (not on every click)
            if (!self._syncFailureNotified && window.notify) {
                self._syncFailureNotified = true;
                window.notify.warning({
                    title: 'Sin conexión',
                    message: 'Tus cambios se guardaron localmente y se sincronizarán cuando vuelvas a estar en línea.',
                    duration: 5000
                });
            }
        });
    }

    _debouncedSync() {
        if (!this._uid) return;
        // Always write localStorage immediately so navigation has fresh data
        this._writeLocalCache(this._uid);
        if (this._syncTimeout) clearTimeout(this._syncTimeout);
        var self = this;
        // Reduced from 800ms → 250ms: faster cross-device sync,
        // less risk of loss on quick navigation
        this._syncTimeout = setTimeout(function () {
            self._syncTimeout = null;
            self._syncToFirestore();
        }, 250);
    }

    /** Force-flush any pending Firestore write immediately. */
    flushSync() {
        if (this._syncTimeout) {
            clearTimeout(this._syncTimeout);
            this._syncTimeout = null;
            this._syncToFirestore();
        }
    }

    // ── Synchronous API ─────────────────────────────────────
    getAll() { return this._favorites.slice(); }
    has(vehicleId) { return this._favorites.indexOf(String(vehicleId)) !== -1; }
    count() { return this._favorites.length; }

    add(vehicleId) {
        if (!this._uid) { this._promptLogin(); return null; }
        var id = String(vehicleId);
        if (this._favorites.indexOf(id) !== -1) return false;
        this._favorites.push(id);
        if (this._readInFlight) this._pendingOps.push({ op: 'add', id: id });
        this._debouncedSync();
        this._dispatchEvent('added', id);
        return true;
    }

    remove(vehicleId) {
        var id = String(vehicleId);
        var idx = this._favorites.indexOf(id);
        if (idx === -1) return false;
        this._favorites.splice(idx, 1);
        if (this._readInFlight) this._pendingOps.push({ op: 'remove', id: id });
        if (this._uid) this._debouncedSync();
        this._dispatchEvent('removed', id);
        return true;
    }

    toggle(vehicleId) {
        if (!this._uid) { this._promptLogin(); return null; }
        var id = String(vehicleId);
        if (this.has(id)) { this.remove(id); return false; }
        this.add(id);
        return true;
    }

    clear() {
        var prev = this._favorites.slice();
        this._favorites = [];
        if (this._uid) {
            // Clearing is a destructive multi-remove; track each in pending
            // ops if a read is in flight (so a stale read can't restore them)
            if (this._readInFlight) {
                for (var i = 0; i < prev.length; i++) {
                    this._pendingOps.push({ op: 'remove', id: prev[i] });
                }
            }
            this._writeLocalCache(this._uid);
            this._debouncedSync();
        }
        this._dispatchEvent('cleared', null);
    }

    // ── Centralized heart click handler ─────────────────────
    /**
     * Handles a heart-button click end-to-end:
     *   - Auth gate (prompts login if anonymous/no user)
     *   - Vehicle existence validation (avoid orphan IDs)
     *   - Toggle state
     *   - Updates ALL hearts for that vehicleId across the page
     *   - Visual: scale burst + +1 floater
     *   - Haptic: navigator.vibrate
     *   - Toast with undo on remove (Gmail-style 6s grace)
     *
     * @param {HTMLElement} button — the clicked button (for animation anchor)
     * @param {string} vehicleId — vehicle ID
     * @param {Object} [opts] — { showToast=true, hideViewAction=false, validateExists=true }
     * @returns {boolean|null} true=added, false=removed, null=login required / aborted
     */
    handleHeartClick(button, vehicleId, opts) {
        opts = opts || {};
        if (!this._uid) { this._promptLogin(); return null; }

        var id = String(vehicleId);
        var willAdd = !this.has(id);

        // Validate vehicle still exists in the catalog before adding.
        // Prevents stale links from creating orphaned IDs in user's list.
        if (willAdd && opts.validateExists !== false
            && window.vehicleDB && window.vehicleDB.loaded) {
            var v = window.vehicleDB.getVehicleById(id);
            if (!v) {
                console.warn('[Favorites] Vehicle not found in DB:', id);
                if (window.notify) {
                    window.notify.warning({
                        title: 'Vehículo no disponible',
                        message: 'Este auto ya no está en el catálogo.',
                        duration: 3500
                    });
                }
                return false;
            }
        }

        var result = this.toggle(id);
        if (result === null) return null;

        // Sync ALL buttons for this vehicleId — homepage carousel, search grid,
        // featured banner, comparator etc. all update simultaneously
        this._updateAllButtonsForVehicle(id);

        // Visual feedback on the actual clicked button
        if (button) this._burstAnimation(button, willAdd);

        // Haptic feedback (mobile only — silently no-op elsewhere)
        if (willAdd && navigator.vibrate) {
            try { navigator.vibrate(8); } catch (e) {}
        }

        // Toast
        if (opts.showToast !== false) {
            this._showFeedbackToast(id, willAdd, opts);
        }

        return result;
    }

    _updateAllButtonsForVehicle(vehicleId) {
        var id = String(vehicleId);
        var isFav = this.has(id);
        var safeId = (window.CSS && window.CSS.escape)
            ? window.CSS.escape(id)
            : id.replace(/"/g, '\\"');
        var buttons = document.querySelectorAll('.favorite-btn[data-id="' + safeId + '"]');
        for (var i = 0; i < buttons.length; i++) {
            var b = buttons[i];
            if (isFav) {
                b.textContent = '♥';
                b.classList.add('active');
            } else {
                b.textContent = '♡';
                b.classList.remove('active');
            }
        }
    }

    _burstAnimation(button, isAdd) {
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }
        if (isAdd) {
            button.classList.remove('favorite-btn--burst');
            void button.offsetWidth; // force reflow to restart animation
            button.classList.add('favorite-btn--burst');
            setTimeout(function () {
                button.classList.remove('favorite-btn--burst');
            }, 420);
            this._showFloater(button, '+1');
        } else {
            button.classList.remove('favorite-btn--shrink');
            void button.offsetWidth;
            button.classList.add('favorite-btn--shrink');
            setTimeout(function () {
                button.classList.remove('favorite-btn--shrink');
            }, 240);
        }
    }

    _showFloater(anchor, text) {
        try {
            var rect = anchor.getBoundingClientRect();
            var floater = document.createElement('div');
            floater.className = 'fav-floater';
            floater.textContent = text;
            floater.style.left = (rect.left + rect.width / 2) + 'px';
            floater.style.top = (rect.top + rect.height / 2 - 4) + 'px';
            document.body.appendChild(floater);
            setTimeout(function () {
                if (floater.parentNode) floater.parentNode.removeChild(floater);
            }, 950);
        } catch (e) {}
    }

    _showFeedbackToast(vehicleId, wasAdded, opts) {
        if (!window.notify) return;
        var v = (window.vehicleDB && window.vehicleDB.getVehicleById)
            ? window.vehicleDB.getVehicleById(vehicleId) : null;
        var vehName = v ? (v.marca + ' ' + v.modelo + ' ' + v.year) : 'Vehículo';
        var count = this.count();
        var totalText = count + ' ' + (count === 1 ? 'guardado' : 'guardados');

        if (window._lastFavToastId) {
            window.notify.dismiss(window._lastFavToastId, true);
            window._lastFavToastId = null;
        }

        var self = this;
        // Auto-detect: if already on favorites page, don't show "Ver favoritos"
        var isOnFavPage = (typeof window !== 'undefined' && window.location
            && /favoritos\.html$/.test(window.location.pathname));

        if (wasAdded) {
            var cfg = {
                title: 'Añadido a favoritos',
                message: vehName + ' · ' + totalText
            };
            if (!opts.hideViewAction && !isOnFavPage) {
                cfg.action = {
                    label: 'Ver favoritos',
                    onClick: function () { window.location.href = 'favoritos.html'; }
                };
            }
            window._lastFavToastId = window.notify.success(cfg);
        } else {
            // Gmail-style undo (6s grace)
            window._lastFavToastId = window.notify.info({
                title: 'Quitado de favoritos',
                message: vehName + ' · ' + totalText,
                duration: 6000,
                action: {
                    label: 'Deshacer',
                    onClick: function () {
                        self.add(vehicleId);
                        self._updateAllButtonsForVehicle(vehicleId);
                        window._lastFavToastId = null;
                        if (window.notify) {
                            window.notify.success({
                                title: 'Restaurado',
                                message: vehName + ' vuelve a tus favoritos.',
                                duration: 2500
                            });
                        }
                    }
                }
            });
        }
    }

    // ── Login prompt for anonymous / unauthenticated users ──
    _promptLogin() {
        this._forceShowHeader();

        var existing = document.querySelector('.altorra-notify--attention');
        if (existing) {
            existing.classList.remove('altorra-notify--buzz');
            void existing.offsetWidth;
            existing.classList.add('altorra-notify--buzz');
            if (window.notify && window.notify.resetTimer) window.notify.resetTimer(existing, 6000);
            if (window.AltorraNotifySound) window.AltorraNotifySound('attention');
            var self2 = this;
            setTimeout(function () { self2._showSpotlight(); }, 100);
            return;
        }

        var self = this;
        if (window.notify) {
            window.notify.info({
                variant: 'attention',
                title: '¡Inicia sesión!',
                message: 'Para guardar tus favoritos necesitas una cuenta.',
                soundType: 'attention',
                duration: 6000,
                action: {
                    label: 'Iniciar sesión',
                    onClick: function () {
                        self._cleanupPromptLogin();
                        if (window.AltorraAuth) window.AltorraAuth.open('login');
                    }
                }
            });
        }
        setTimeout(function () { self._showSpotlight(); }, 280);
    }

    _cleanupPromptLogin() {
        var toasts = document.querySelectorAll('.altorra-notify--attention');
        for (var i = 0; i < toasts.length; i++) {
            var id = Number(toasts[i].dataset.id);
            if (id && window.notify) window.notify.dismiss(id);
        }
        var overlay = document.querySelector('.altorra-spotlight');
        if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
        var tooltip = document.querySelector('.altorra-login-tooltip');
        if (tooltip && tooltip.parentNode) tooltip.parentNode.removeChild(tooltip);
        var btn = document.getElementById('btnLogin');
        if (btn) btn.classList.remove('hdr-btn--spotlight');
    }

    _forceShowHeader() {
        var header = document.getElementById('header');
        if (header) header.classList.remove('header--hidden');
        if (window.innerWidth <= 768 && window.scrollY > 100) {
            window.scrollTo({ top: Math.max(0, window.scrollY - 80), behavior: 'smooth' });
        }
    }

    _showSpotlight() {
        var btn = document.getElementById('btnLogin');
        if (!btn || !btn.offsetParent) return;
        if (document.querySelector('.altorra-spotlight')) return;

        var self = this;
        var overlay = document.createElement('div');
        overlay.className = 'altorra-spotlight';
        document.body.appendChild(overlay);
        btn.classList.add('hdr-btn--spotlight');

        var tooltip = document.createElement('div');
        tooltip.className = 'altorra-login-tooltip';
        tooltip.textContent = 'Inicia sesión aquí';
        document.body.appendChild(tooltip);
        var rect = btn.getBoundingClientRect();
        tooltip.style.top = (rect.bottom + 10) + 'px';
        tooltip.style.left = (rect.left + rect.width / 2) + 'px';

        var cleanupTimer = setTimeout(function () { self._cleanupPromptLogin(); }, 4000);
        overlay.addEventListener('click', function () {
            clearTimeout(cleanupTimer);
            self._cleanupPromptLogin();
            if (window.AltorraAuth) window.AltorraAuth.open('login');
        });
        function onBtnClick() {
            clearTimeout(cleanupTimer);
            self._cleanupPromptLogin();
            btn.removeEventListener('click', onBtnClick);
        }
        btn.addEventListener('click', onBtnClick);
    }

    // ── Events ──────────────────────────────────────────────
    _dispatchEvent(action, vehicleId, extra) {
        var detail = {
            action: action,
            vehicleId: vehicleId,
            count: this.count(),
            favorites: this.getAll()
        };
        if (extra && typeof extra === 'object') {
            for (var k in extra) if (Object.prototype.hasOwnProperty.call(extra, k)) detail[k] = extra[k];
        }
        var event = new CustomEvent('favoritesChanged', { detail: detail });
        window.dispatchEvent(event);
    }

    _log() {
        if (this.DEBUG) {
            var args = Array.prototype.slice.call(arguments);
            console.log.apply(console, ['[FavoritesManager]'].concat(args));
        }
    }

    // ── Counter UI with animation ───────────────────────────
    updateAllCounters() {
        var self = this;
        var count = this.count();
        var counterIds = ['favCount', 'favCountMobile', 'favoritesCount'];
        var allFound = true;

        counterIds.forEach(function (id) {
            var el = document.getElementById(id);
            if (el) {
                var current = parseInt(el.textContent, 10);
                if (isNaN(current)) current = 0;
                if (current !== count) self._animateCounter(el, current, count);
            } else {
                allFound = false;
            }
        });

        if (!allFound && !this._observing) {
            this._observing = true;
            var observer = new MutationObserver(function () {
                var found = 0;
                var newCount = self.count();
                counterIds.forEach(function (id) {
                    var el = document.getElementById(id);
                    if (el) {
                        var current = parseInt(el.textContent, 10);
                        if (isNaN(current)) current = 0;
                        if (current !== newCount) self._animateCounter(el, current, newCount);
                        found++;
                    }
                });
                if (found >= 2) {
                    observer.disconnect();
                    self._observing = false;
                }
            });
            observer.observe(document.body, { childList: true, subtree: true });
            setTimeout(function () {
                if (self._observing) { observer.disconnect(); self._observing = false; }
            }, 5000);
        }
    }

    _animateCounter(el, from, to) {
        if (el._animRAF) cancelAnimationFrame(el._animRAF);
        // Reduce motion: jump directly
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            el.textContent = String(to);
            return;
        }
        var start = null;
        var duration = 380;
        el.classList.remove('fav-counter-pulse');
        void el.offsetWidth;
        el.classList.add('fav-counter-pulse');
        var step = function (ts) {
            if (!start) start = ts;
            var progress = Math.min(1, (ts - start) / duration);
            var eased = 1 - Math.pow(1 - progress, 3);
            var v = Math.round(from + (to - from) * eased);
            el.textContent = String(v);
            if (progress < 1) {
                el._animRAF = requestAnimationFrame(step);
            } else {
                el.textContent = String(to);
                el._animRAF = null;
                setTimeout(function () { el.classList.remove('fav-counter-pulse'); }, 350);
            }
        };
        el._animRAF = requestAnimationFrame(step);
    }

    /**
     * Update a heart button's state. Now updates ALL buttons for the same
     * vehicleId across the page (multi-card sync), not just the one passed.
     */
    updateButtonState(button, vehicleId) {
        var id = vehicleId != null ? vehicleId : (button && button.getAttribute('data-id'));
        if (id == null) return;
        this._updateAllButtonsForVehicle(id);
    }
}

// Singleton global
const favoritesManager = new FavoritesManager();

window.addEventListener('favoritesChanged', function () {
    favoritesManager.updateAllCounters();
});

// Flush pending sync on multiple page-leave signals.
// `pagehide` and `visibilitychange` are more reliable than `beforeunload`
// on mobile and Safari (which often cancels async work in beforeunload).
function flushOnPageHide() {
    if (favoritesManager._syncTimeout) {
        clearTimeout(favoritesManager._syncTimeout);
        favoritesManager._syncTimeout = null;
        favoritesManager._syncToFirestore();
    }
}
window.addEventListener('beforeunload', flushOnPageHide);
window.addEventListener('pagehide', flushOnPageHide);
document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') flushOnPageHide();
});

// Online recovery: when network returns after a failure, re-attempt sync
window.addEventListener('online', function () {
    if (favoritesManager._uid && favoritesManager._loaded) {
        favoritesManager._syncToFirestore();
    }
});

// Cross-tab sync: react to localStorage changes from other tabs
window.addEventListener('storage', function (e) {
    if (!e.key || !favoritesManager._uid) return;
    if (e.key !== favoritesManager._cacheKey(favoritesManager._uid)) return;
    try {
        var arr = e.newValue ? JSON.parse(e.newValue) : [];
        if (!Array.isArray(arr)) return;
        favoritesManager._favorites = arr.map(String);
        favoritesManager._dispatchEvent('synced', null, { changed: true, crossTab: true });
        favoritesManager.updateAllCounters();
    } catch (err) {}
});

window.favoritesManager = favoritesManager;

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FavoritesManager, favoritesManager };
}
