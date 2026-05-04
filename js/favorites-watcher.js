/**
 * ALTORRA CARS — Favorites Watcher (Smart Notifications, Phase B1+B2)
 *
 * Watches the user's favorites against live vehicleDB updates and detects:
 *   - Price drops / increases
 *   - Status transitions (disponible -> reservado / vendido)
 *   - Removal from inventory
 *
 * For each detected change it produces a normalized "diff event" that
 * Phase B3 will route to notifyCenter.notify('price_alert' | 'inventory_change').
 *
 * Storage:
 *   localStorage.altorra_fav_snapshots_<uid> = {
 *       <vehicleId>: { precio, precioOferta, estado, capturedAt },
 *       ...
 *   }
 *
 * Lifecycle:
 *   - On 'cached' or 'synced' favorites event AND vehicleDB.loaded:
 *       - Build current snapshot of each favorited vehicle
 *       - Compare against stored baseline → emit diffs (one-shot per change)
 *       - Persist new baseline
 *   - On vehicleDB.onChange('vehicles'): re-run diff against the latest snapshot
 *   - On 'cleared' favorites: clear all snapshots for that uid
 *
 * Anti-patterns prevented:
 *   - First load → never emit (baseline only); the user already knew current state
 *   - Bulk admin update (>3 changes) → batch into a single "N favorites changed" event
 *   - Vehicle was missing from inventory but reappears → ignore "missing" diff if
 *     the next snapshot finds it again before next page load
 *   - Anonymous user → never persist snapshots (no uid → no notifications)
 *   - Listener loops: watcher only writes through `notifyCenter.notify`, never
 *     through `notify.*` directly, so wrapNotify cannot recurse on a watcher event
 */
(function () {
    'use strict';

    if (window.AltorraFavWatcher) return; // singleton

    var DEBUG = false;
    var SNAPSHOT_PREFIX = 'altorra_fav_snapshots_';
    var MIN_PRICE_DELTA_PCT = 1.0;        // 1% threshold to ignore noise
    var COALESCE_MIN_DIFFS = 4;           // 4+ changes in one tick → grouped event
    var DIFF_DEBOUNCE_MS = 350;            // wait for snapshot to settle

    function log() {
        if (!DEBUG) return;
        try {
            var args = Array.prototype.slice.call(arguments);
            console.log.apply(console, ['[FavWatcher]'].concat(args));
        } catch (e) {}
    }

    function snapKey(uid) { return SNAPSHOT_PREFIX + (uid || ''); }

    function readSnapshots(uid) {
        try {
            var raw = localStorage.getItem(snapKey(uid));
            if (!raw) return {};
            var p = JSON.parse(raw);
            return (p && typeof p === 'object') ? p : {};
        } catch (e) { return {}; }
    }

    function writeSnapshots(uid, snaps) {
        try { localStorage.setItem(snapKey(uid), JSON.stringify(snaps)); }
        catch (e) {}
    }

    function clearSnapshots(uid) {
        try { localStorage.removeItem(snapKey(uid)); } catch (e) {}
    }

    function pickFields(v) {
        if (!v) return null;
        return {
            precio: typeof v.precio === 'number' ? v.precio : null,
            precioOferta: typeof v.precioOferta === 'number' ? v.precioOferta : null,
            estado: v.estado || 'disponible',
            capturedAt: Date.now()
        };
    }

    /** Effective price = oferta if present, else regular */
    function effectivePrice(snap) {
        if (!snap) return null;
        if (typeof snap.precioOferta === 'number' && snap.precioOferta > 0) return snap.precioOferta;
        if (typeof snap.precio === 'number' && snap.precio > 0) return snap.precio;
        return null;
    }

    function pctChange(oldVal, newVal) {
        if (!oldVal || !newVal) return 0;
        return ((newVal - oldVal) / oldVal) * 100;
    }

    /**
     * Compare two snapshots and return an array of diff events (or null
     * if no meaningful change). One vehicle can produce 0 or 1 events
     * (status change wins over price change for the same tick).
     */
    function diffOne(vehicleId, oldSnap, newSnap, vehicleData) {
        if (!oldSnap) return null; // no baseline → not a diff, just a new entry
        // Vehicle missing from inventory entirely
        if (!newSnap) {
            if (oldSnap.estado === 'vendido') return null; // already known sold
            return {
                type: 'inventory_removed',
                vehicleId: vehicleId,
                oldSnap: oldSnap,
                vehicleData: vehicleData || null
            };
        }
        // Status change wins
        if (oldSnap.estado !== newSnap.estado) {
            return {
                type: 'status_change',
                vehicleId: vehicleId,
                oldEstado: oldSnap.estado,
                newEstado: newSnap.estado,
                oldSnap: oldSnap,
                newSnap: newSnap,
                vehicleData: vehicleData || null
            };
        }
        // Price change (effective price = oferta if present)
        var oldPrice = effectivePrice(oldSnap);
        var newPrice = effectivePrice(newSnap);
        if (oldPrice && newPrice && oldPrice !== newPrice) {
            var pct = pctChange(oldPrice, newPrice);
            if (Math.abs(pct) >= MIN_PRICE_DELTA_PCT) {
                return {
                    type: pct < 0 ? 'price_drop' : 'price_increase',
                    vehicleId: vehicleId,
                    oldPrice: oldPrice,
                    newPrice: newPrice,
                    pctChange: Math.round(pct * 10) / 10,
                    oldSnap: oldSnap,
                    newSnap: newSnap,
                    vehicleData: vehicleData || null
                };
            }
        }
        return null;
    }

    /** Watcher state */
    var _state = {
        uid: null,
        anonymous: true,
        snapshots: {},
        diffTimer: null,
        ready: false,        // both vehicleDB loaded AND favorites loaded
        firstRunDone: false
    };
    var _diffListeners = [];

    function onDiffs(fn) { if (typeof fn === 'function') _diffListeners.push(fn); }
    function emitDiffs(diffs) {
        if (!diffs || !diffs.length) return;
        _diffListeners.forEach(function (fn) {
            try { fn(diffs); } catch (e) { log('listener error', e); }
        });
    }

    function getFavorites() {
        if (!window.favoritesManager) return [];
        return window.favoritesManager.getAll ? window.favoritesManager.getAll() : [];
    }

    function getVehicleById(id) {
        if (!window.vehicleDB || !window.vehicleDB.vehicles) return null;
        for (var i = 0; i < window.vehicleDB.vehicles.length; i++) {
            if (window.vehicleDB.vehicles[i].id === id) return window.vehicleDB.vehicles[i];
        }
        return null;
    }

    /** Run the diff cycle. Idempotent — safe to call multiple times. */
    function runDiff(reason) {
        if (!_state.ready) return;
        if (!_state.uid || _state.anonymous) return;
        var favs = getFavorites();
        var prev = _state.snapshots;
        var fresh = {};
        var diffs = [];

        favs.forEach(function (id) {
            var v = getVehicleById(id);
            var newSnap = pickFields(v);
            if (newSnap) fresh[id] = newSnap;

            var oldSnap = prev[id] || null;
            // First time we see this favorite → just baseline, no diff
            if (!oldSnap) return;

            var d = diffOne(id, oldSnap, newSnap, v);
            if (d) diffs.push(d);
        });

        // Save fresh snapshots — the diff above protected against false positives
        _state.snapshots = fresh;
        if (_state.uid) writeSnapshots(_state.uid, fresh);

        if (!_state.firstRunDone) {
            _state.firstRunDone = true;
            log('Baseline established (', reason, '), favorites:', favs.length);
            return;
        }

        if (diffs.length === 0) {
            log('No diffs detected on', reason);
            return;
        }

        // Coalesce: if too many diffs, group them
        if (diffs.length >= COALESCE_MIN_DIFFS) {
            log('Coalescing', diffs.length, 'diffs');
            emitDiffs([{ type: 'bulk', count: diffs.length, diffs: diffs }]);
            return;
        }

        log('Emitting', diffs.length, 'diffs (', reason, ')', diffs);
        emitDiffs(diffs);
    }

    function scheduleDiff(reason) {
        if (_state.diffTimer) clearTimeout(_state.diffTimer);
        _state.diffTimer = setTimeout(function () {
            _state.diffTimer = null;
            runDiff(reason);
        }, DIFF_DEBOUNCE_MS);
    }

    /** Bind favorites-manager + vehicleDB → drive the watcher */
    function init() {
        // Anonymous detection: if Auth says anonymous, skip persistence entirely
        function refreshUid() {
            var u = (window.auth && window.auth.currentUser) || null;
            var newUid = u ? u.uid : null;
            var anon = !u || (u && u.isAnonymous);
            if (newUid !== _state.uid || anon !== _state.anonymous) {
                if (_state.uid && (!newUid || _state.uid !== newUid)) {
                    // Clear watcher snapshots tied to old uid — but ONLY if logout
                    // (not just initial undefined). Important: do NOT clear on
                    // anonymous switch, because favorites-manager keeps localStorage
                    // anyway and we want fresh baseline.
                }
                _state.uid = newUid;
                _state.anonymous = anon;
                if (newUid && !anon) {
                    _state.snapshots = readSnapshots(newUid);
                    _state.firstRunDone = Object.keys(_state.snapshots).length > 0;
                    log('Bound to uid', newUid, 'snapshots:', Object.keys(_state.snapshots).length);
                } else {
                    _state.snapshots = {};
                    _state.firstRunDone = false;
                }
            }
        }

        // Listen to Firebase Auth changes
        function attachAuthListener() {
            if (!window.auth || typeof window.auth.onAuthStateChanged !== 'function') return false;
            window.auth.onAuthStateChanged(function () {
                refreshUid();
                if (_state.uid && !_state.anonymous && _state.ready) scheduleDiff('auth');
            });
            return true;
        }
        if (!attachAuthListener()) {
            var tries = 0;
            var int = setInterval(function () {
                if (attachAuthListener() || ++tries > 40) clearInterval(int);
            }, 250);
        }

        // Favorites events
        window.addEventListener('favoritesChanged', function (ev) {
            var d = ev.detail || {};
            var action = d.action;
            // Trigger diff after data actually loaded (synced/cached)
            if (action === 'synced' || action === 'cached') {
                refreshUid();
                _state.ready = _state.ready || !!(window.vehicleDB && window.vehicleDB.loaded);
                if (_state.ready) scheduleDiff('fav-' + action);
            } else if (action === 'cleared') {
                if (_state.uid) clearSnapshots(_state.uid);
                _state.snapshots = {};
                _state.firstRunDone = false;
            } else if (action === 'added') {
                // New favorite → capture baseline silently (no diff for added id)
                refreshUid();
                if (_state.ready && _state.uid && !_state.anonymous) {
                    var v = getVehicleById(d.vehicleId);
                    if (v) {
                        _state.snapshots[d.vehicleId] = pickFields(v);
                        writeSnapshots(_state.uid, _state.snapshots);
                    }
                }
            } else if (action === 'removed') {
                if (_state.snapshots[d.vehicleId]) {
                    delete _state.snapshots[d.vehicleId];
                    if (_state.uid) writeSnapshots(_state.uid, _state.snapshots);
                }
            }
        });

        // vehicleDB updates
        function bindVehicleDB() {
            if (!window.vehicleDB) return false;
            // Mark ready as soon as vehicleDB is loaded
            if (window.vehicleDB.loaded) _state.ready = true;
            if (typeof window.vehicleDB.onChange === 'function') {
                window.vehicleDB.onChange(function (changeType) {
                    if (changeType !== 'vehicles') return;
                    _state.ready = true;
                    scheduleDiff('vdb-update');
                });
            }
            // Initial diff when both are ready
            if (_state.ready) scheduleDiff('vdb-init');
            return true;
        }
        if (!bindVehicleDB()) {
            var t2 = 0;
            var int2 = setInterval(function () {
                if (bindVehicleDB() || ++t2 > 60) clearInterval(int2);
            }, 250);
        }

        refreshUid();
    }

    // Public API
    window.AltorraFavWatcher = {
        onDiffs: onDiffs,
        runDiff: function () { runDiff('manual'); },
        getSnapshot: function (id) { return _state.snapshots[id] || null; },
        getAllSnapshots: function () { return Object.assign({}, _state.snapshots); },
        // Expose for B4 (visual badges on favoritos.html)
        diffSinceLastVisit: function (vehicleId) {
            // Not really "since last visit" yet — for now just return current
            // diff if any vs. stored snapshot; B4/B5 will extend this with
            // a separate 'lastViewedAt' tracker.
            var snap = _state.snapshots[vehicleId];
            if (!snap) return null;
            var v = getVehicleById(vehicleId);
            if (!v) return null;
            return diffOne(vehicleId, snap, pickFields(v), v);
        },
        _state: _state, // for debug
        _setDebug: function (b) { DEBUG = !!b; }
    };

    // Auto-init when DOM is ready (favoritesManager + vehicleDB load via main.js)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
