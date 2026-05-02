/**
 * ALTORRA CARS - Favorites Manager (Firestore-only)
 *
 * Sin localStorage. Cada usuario (anonimo o registrado) tiene su propia
 * lista privada en `clientes/{uid}.favoritos`. La autenticacion anonima
 * automatica de auth.js garantiza que SIEMPRE haya un uid valido.
 *
 * Patron: cache en memoria + sync debounced a Firestore.
 * - `_favorites`  → array de strings (IDs normalizados)
 * - API sincronica preservada: has(), getAll(), count(), add(), remove(), toggle()
 * - Cargar Firestore en setUser() → dispara evento 'favoritesChanged' al terminar
 */

class FavoritesManager {
    constructor() {
        this.DEBUG = false;
        this._uid = null;             // uid actual (anonimo o registrado)
        this._favorites = [];         // cache en memoria (siempre strings)
        this._loaded = false;         // true tras primera carga (cache O Firestore)
        this._syncedFromFirestore = false; // true tras carga real de Firestore
        this._syncTimeout = null;     // debounce de escritura
        this._observing = false;      // MutationObserver para contadores tardios
        this._cachePrefix = 'altorra_fav_cache_';
        this._lastUidKey = 'altorra_fav_last_uid';

        // EAGER HYDRATION: pre-load favorites from localStorage BEFORE Firebase
        // Auth resolves. This makes the favorites page render instantly on page
        // load — no 200-500ms skeleton wait while Firebase initializes.
        // The data may turn out to be stale (different user logged in elsewhere),
        // but onAuthStateChanged will reconcile within milliseconds.
        try {
            var lastUid = localStorage.getItem(this._lastUidKey);
            if (lastUid) {
                var cached = this._readLocalCache(lastUid);
                if (cached) {
                    this._uid = lastUid;
                    this._favorites = cached;
                    this._loaded = true;
                    // Defer event dispatch until DOM is ready
                    var self = this;
                    if (document.readyState === 'loading') {
                        document.addEventListener('DOMContentLoaded', function() {
                            self._dispatchEvent('cached', null, { eager: true });
                            self.updateAllCounters();
                        });
                    } else {
                        setTimeout(function() {
                            self._dispatchEvent('cached', null, { eager: true });
                            self.updateAllCounters();
                        }, 0);
                    }
                }
            }
        } catch (e) { /* localStorage disabled — fall back to normal flow */ }
    }

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
        } catch (e) { /* quota exceeded — ignore */ }
    }

    // ── Vinculacion con el usuario actual ─────────────────────
    // Llamada desde auth.js cada vez que cambia el uid (anonimo o registrado).
    // PASO 1: Carga instantanea desde localStorage (UI inmediata)
    // PASO 2: Refresh en background desde Firestore (datos frescos)
    setUser(uid) {
        if (!uid) { this.clearUser(); return; }
        if (this._uid === uid && this._syncedFromFirestore) return;

        // If eager hydration loaded cache for a different uid, replace it
        var sameUid = this._uid === uid;
        this._uid = uid;
        this._syncedFromFirestore = false;

        // Persist last uid for eager hydration on next page load
        try { localStorage.setItem(this._lastUidKey, uid); } catch (e) {}

        // PASO 1: Hidratar desde localStorage si no esta ya cargado para este uid
        if (!sameUid || !this._loaded) {
            var cached = this._readLocalCache(uid);
            if (cached) {
                this._favorites = cached;
                this._loaded = true;
                this._dispatchEvent('cached', null);
                this.updateAllCounters();
                this._log('Loaded from localStorage cache:', cached.length);
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
            // Always clear last_uid: prevents eager hydration of previous user's
            // data on next page load if no one is currently authenticated.
            localStorage.removeItem(this._lastUidKey);
            // Only delete the actual favorites cache on explicit logout.
            // Otherwise keep it so re-login is instant.
            if (purge && this._uid) {
                localStorage.removeItem(this._cacheKey(this._uid));
            }
        } catch (e) {}
        this._uid = null;
        this._favorites = [];
        this._loaded = false;
        this._syncedFromFirestore = false;
        this._dispatchEvent('cleared', null);
        this.updateAllCounters();
    }

    _loadFromFirestore(retryCount) {
        if (!this._uid || !window.db) return;
        var self = this;
        var uid = this._uid;
        var attempt = retryCount || 0;
        window.db.collection('clientes').doc(uid).get()
            .then(function (doc) {
                if (uid !== self._uid) return; // user changed mid-flight
                var arr = [];
                if (doc.exists && Array.isArray(doc.data().favoritos)) {
                    arr = doc.data().favoritos.map(String);
                }
                // Detectar si Firestore difiere del cache local
                var cacheStr = JSON.stringify(self._favorites.slice().sort());
                var freshStr = JSON.stringify(arr.slice().sort());
                var changed = cacheStr !== freshStr;

                self._favorites = arr;
                self._loaded = true;
                self._syncedFromFirestore = true;
                self._writeLocalCache(uid);
                self._dispatchEvent('synced', null, { changed: changed });
                self.updateAllCounters();
                self._log('Loaded from Firestore:', arr.length, changed ? '(cache updated)' : '(cache match)');
            })
            .catch(function (err) {
                var msg = (err && err.message) || '';
                // WebChannel race: after signIn the SDK may send this read
                // with the old (anonymous) auth token before the new token
                // propagates. Retry once after a short delay.
                if (attempt < 2 && msg.indexOf('permissions') !== -1) {
                    var delay = (attempt + 1) * 500;
                    self._log('Permission denied, retrying in', delay, 'ms (attempt', attempt + 1 + ')');
                    setTimeout(function () {
                        if (uid !== self._uid) return;
                        self._loadFromFirestore(attempt + 1);
                    }, delay);
                    return;
                }
                console.warn('[Favorites] Error loading from Firestore:', msg);
                self._loaded = true; // permitir escrituras aunque la lectura falle
                self._syncedFromFirestore = true;
                self._dispatchEvent('synced', null, { changed: false, error: true });
            });
    }

    _syncToFirestore() {
        if (!this._uid || !window.db) return;
        var uid = this._uid;
        var favs = this._favorites.slice();
        // set({merge: true}) crea el doc si no existe (clientes anonimos)
        window.db.collection('clientes').doc(uid).set({
            uid: uid,
            favoritos: favs,
            ultimoAcceso: new Date().toISOString()
        }, { merge: true }).catch(function (err) {
            console.warn('[Favorites] Error syncing to Firestore:', err && err.message);
        });
    }

    _debouncedSync() {
        if (!this._uid) return;
        // Escritura instantanea a localStorage para que la proxima navegacion
        // tenga datos frescos sin esperar el debounce de Firestore
        this._writeLocalCache(this._uid);
        if (this._syncTimeout) clearTimeout(this._syncTimeout);
        var self = this;
        this._syncTimeout = setTimeout(function () {
            self._syncToFirestore();
        }, 800);
    }

    // ── API sincronica (lee de la cache en memoria) ──────────
    getAll() {
        return this._favorites.slice();
    }

    has(vehicleId) {
        var id = String(vehicleId);
        return this._favorites.indexOf(id) !== -1;
    }

    count() {
        return this._favorites.length;
    }

    add(vehicleId) {
        if (!this._uid) { this._promptLogin(); return null; }
        var id = String(vehicleId);
        if (this._favorites.indexOf(id) !== -1) return false;
        this._favorites.push(id);
        this._debouncedSync();
        this._dispatchEvent('added', id);
        return true;
    }

    remove(vehicleId) {
        var id = String(vehicleId);
        var idx = this._favorites.indexOf(id);
        if (idx === -1) return false;
        this._favorites.splice(idx, 1);
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

    _promptLogin() {
        // 1. Force header to be visible (it may be hidden by scroll)
        this._forceShowHeader();

        // 2. If an attention toast is already on screen, just buzz it (no stacking)
        var existing = document.querySelector('.altorra-notify--attention');
        if (existing) {
            existing.classList.remove('altorra-notify--buzz');
            void existing.offsetWidth;
            existing.classList.add('altorra-notify--buzz');
            if (window.notify && window.notify.resetTimer) window.notify.resetTimer(existing, 6000);
            if (window.AltorraNotifySound) window.AltorraNotifySound('attention');
            var self2 = this;
            setTimeout(function() { self2._showSpotlight(); }, 100);
            return;
        }

        var self = this;

        // 3. Show vibrant attention notification
        if (window.notify) {
            window.notify.info({
                variant: 'attention',
                title: '¡Inicia sesión!',
                message: 'Para guardar tus favoritos necesitas una cuenta.',
                soundType: 'attention',
                duration: 6000,
                action: {
                    label: 'Iniciar sesión',
                    onClick: function() {
                        self._cleanupPromptLogin();
                        if (window.AltorraAuth) window.AltorraAuth.open('login');
                    }
                }
            });
        }

        // 4. Wait for header to settle, then show spotlight
        setTimeout(function() { self._showSpotlight(); }, 280);
    }

    _cleanupPromptLogin() {
        // Dismiss all attention toasts
        var toasts = document.querySelectorAll('.altorra-notify--attention');
        for (var i = 0; i < toasts.length; i++) {
            var id = Number(toasts[i].dataset.id);
            if (id && window.notify) window.notify.dismiss(id);
        }
        // Remove spotlight overlay + tooltip
        var overlay = document.querySelector('.altorra-spotlight');
        if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
        var tooltip = document.querySelector('.altorra-login-tooltip');
        if (tooltip && tooltip.parentNode) tooltip.parentNode.removeChild(tooltip);
        // Remove glow from login button
        var btn = document.getElementById('btnLogin');
        if (btn) btn.classList.remove('hdr-btn--spotlight');
    }

    _forceShowHeader() {
        var header = document.getElementById('header');
        if (header) header.classList.remove('header--hidden');
        // Also scroll up slightly if user is deep in page (helps mobile)
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

        var cleanupTimer = setTimeout(function() { self._cleanupPromptLogin(); }, 4000);

        // Click on dark overlay → clean everything + open login
        overlay.addEventListener('click', function() {
            clearTimeout(cleanupTimer);
            self._cleanupPromptLogin();
            if (window.AltorraAuth) window.AltorraAuth.open('login');
        });

        // Click on the actual INGRESAR button → clean everything (button's own handler opens login)
        function onBtnClick() {
            clearTimeout(cleanupTimer);
            self._cleanupPromptLogin();
            btn.removeEventListener('click', onBtnClick);
        }
        btn.addEventListener('click', onBtnClick);
    }

    clear() {
        this._favorites = [];
        if (this._uid) {
            this._writeLocalCache(this._uid);
            this._debouncedSync();
        }
        this._dispatchEvent('cleared', null);
    }

    // ── Eventos ───────────────────────────────────────────────
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

    // ── UI helpers ────────────────────────────────────────────
    updateAllCounters() {
        var count = this.count();
        var countStr = count.toString();
        var counterIds = ['favCount', 'favCountMobile', 'favoritesCount'];
        var allFound = true;

        counterIds.forEach(function (id) {
            var el = document.getElementById(id);
            if (el) {
                // CRITICO: evitar mutations redundantes que disparen el
                // MutationObserver en un loop infinito (microtask starvation)
                if (el.textContent !== countStr) el.textContent = countStr;
            } else {
                allFound = false;
            }
        });

        if (!allFound && !this._observing) {
            var self = this;
            this._observing = true;
            var observer = new MutationObserver(function () {
                var found = 0;
                var newValue = self.count().toString();
                counterIds.forEach(function (id) {
                    var el = document.getElementById(id);
                    if (el) {
                        // MISMA proteccion: no setear si ya es el valor correcto.
                        // Sin esto, cada set genera otra mutation que dispara este
                        // mismo callback infinitamente, congelando el main thread.
                        if (el.textContent !== newValue) el.textContent = newValue;
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

    updateButtonState(button, vehicleId) {
        var isFav = this.has(vehicleId);
        if (isFav) {
            button.textContent = '♥';
            button.classList.add('active');
        } else {
            button.textContent = '♡';
            button.classList.remove('active');
        }
    }
}

// Singleton global
const favoritesManager = new FavoritesManager();

// Re-render contadores ante cambios
window.addEventListener('favoritesChanged', function () {
    favoritesManager.updateAllCounters();
});

// Flush pending Firestore sync before navigating away (prevents stale data on next page load)
window.addEventListener('beforeunload', function () {
    if (favoritesManager._syncTimeout) {
        clearTimeout(favoritesManager._syncTimeout);
        favoritesManager._syncTimeout = null;
        favoritesManager._syncToFirestore();
    }
});

// Cross-tab sync: if user changes favorites in another tab, update this tab too.
// localStorage `storage` event fires on OTHER tabs (not the one that wrote it).
window.addEventListener('storage', function (e) {
    if (!e.key || !favoritesManager._uid) return;
    if (e.key !== favoritesManager._cacheKey(favoritesManager._uid)) return;
    try {
        var arr = e.newValue ? JSON.parse(e.newValue) : [];
        if (!Array.isArray(arr)) return;
        favoritesManager._favorites = arr.map(String);
        favoritesManager._dispatchEvent('synced', null, { changed: true, crossTab: true });
        favoritesManager.updateAllCounters();
    } catch (err) { /* ignore */ }
});

window.favoritesManager = favoritesManager;

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FavoritesManager, favoritesManager };
}
