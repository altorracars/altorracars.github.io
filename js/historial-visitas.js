// ============================================
// HISTORIAL DE VEHÍCULOS VISITADOS - ALTORRA CARS
//
// Patrón profesional (como Amazon, MercadoLibre, Kavak):
// - localStorage para TODOS los visitantes (funciona sin auth)
// - Firestore sync solo para usuarios REGISTRADOS (no anónimos)
// - Al registrarse/loguear: merge localStorage → Firestore
// - Al cerrar sesión: datos locales persisten en localStorage
// ============================================

class VehicleHistory {
    constructor() {
        this.maxItems = 12;
        this.STORAGE_KEY = 'altorra_vehicle_history';
        this._uid = null;
        this._isRegistered = false; // true only for non-anonymous users
        this._history = [];          // [{id, timestamp}]
        this._loaded = false;
        this._syncTimeout = null;
        this._pendingTrack = false;

        // Load from localStorage immediately (available before auth)
        this._loadFromLocalStorage();
    }

    // ── Vinculacion con usuario ──────────────────────────────
    // Called from auth.js on auth state change.
    // For registered users: merge local history with Firestore.
    // For anonymous/null: just use localStorage.
    setUser(uid, isAnonymous) {
        if (!uid) { this.clearUser(); return; }

        var wasRegistered = this._isRegistered;
        this._uid = uid;
        this._isRegistered = !isAnonymous;

        if (this._isRegistered) {
            // Registered user: load from Firestore and merge with localStorage
            this._loadFromFirestore();
        } else {
            // Anonymous: just use localStorage (already loaded in constructor)
            this._loaded = true;
            this._maybeTrackCurrent();
        }
    }

    clearUser() {
        if (this._syncTimeout) { clearTimeout(this._syncTimeout); this._syncTimeout = null; }
        this._uid = null;
        this._isRegistered = false;
        // Keep localStorage data — history persists across sessions
        // just like Amazon/MercadoLibre do it
    }

    // ── localStorage (always available) ─────────────────────
    _loadFromLocalStorage() {
        try {
            var raw = localStorage.getItem(this.STORAGE_KEY);
            if (raw) {
                var parsed = JSON.parse(raw);
                if (Array.isArray(parsed)) {
                    this._history = parsed.slice(0, this.maxItems).map(function (item) {
                        return typeof item === 'object' && item !== null
                            ? { id: String(item.id), timestamp: item.timestamp || Date.now() }
                            : { id: String(item), timestamp: Date.now() };
                    });
                }
            }
        } catch (e) {
            // Corrupted data — start fresh
            this._history = [];
        }
        this._loaded = true;
    }

    _saveToLocalStorage() {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._history.slice(0, this.maxItems)));
        } catch (e) {
            // localStorage full or unavailable — silent fail
        }
    }

    // ── Firestore (registered users only) ───────────────────
    _loadFromFirestore() {
        if (!this._uid || !this._isRegistered || !window.db) {
            this._maybeTrackCurrent();
            return;
        }
        var self = this;
        var uid = this._uid;
        window.db.collection('clientes').doc(uid).get()
            .then(function (doc) {
                if (uid !== self._uid) return;
                var firestoreHistory = [];
                if (doc.exists && Array.isArray(doc.data().vehiculosVistos)) {
                    firestoreHistory = doc.data().vehiculosVistos.slice(0, self.maxItems).map(function (item) {
                        return typeof item === 'object' && item !== null
                            ? { id: String(item.id), timestamp: item.timestamp || Date.now() }
                            : { id: String(item), timestamp: Date.now() };
                    });
                }
                // Merge: combine localStorage + Firestore, deduplicate, sort by newest
                self._mergeHistory(firestoreHistory);
                self._loaded = true;
                self._maybeTrackCurrent();
            })
            .catch(function (err) {
                console.warn('[History] Error loading from Firestore:', err && err.message);
                self._loaded = true;
                self._maybeTrackCurrent();
            });
    }

    _mergeHistory(firestoreHistory) {
        var merged = {};
        // localStorage items first
        this._history.forEach(function (item) { merged[item.id] = item; });
        // Firestore items (keep the one with the latest timestamp)
        firestoreHistory.forEach(function (item) {
            if (!merged[item.id] || item.timestamp > merged[item.id].timestamp) {
                merged[item.id] = item;
            }
        });
        // Sort by timestamp descending (newest first)
        var keys = Object.keys(merged);
        keys.sort(function (a, b) { return merged[b].timestamp - merged[a].timestamp; });
        this._history = keys.slice(0, this.maxItems).map(function (k) { return merged[k]; });
        // Persist merged result to both stores
        this._saveToLocalStorage();
        if (this._isRegistered) this._syncToFirestore();
    }

    _syncToFirestore() {
        if (!this._uid || !this._isRegistered || !window.db) return;
        var uid = this._uid;
        var hist = this._history.slice(0, this.maxItems);
        window.db.collection('clientes').doc(uid).set({
            uid: uid,
            vehiculosVistos: hist,
            ultimoAcceso: new Date().toISOString()
        }, { merge: true }).catch(function (err) {
            console.warn('[History] Error syncing to Firestore:', err && err.message);
        });
    }

    _debouncedSync() {
        if (this._syncTimeout) clearTimeout(this._syncTimeout);
        var self = this;
        this._syncTimeout = setTimeout(function () {
            self._saveToLocalStorage();
            if (self._isRegistered) self._syncToFirestore();
        }, 1500);
    }

    // ── Tracking ─────────────────────────────────────────────
    trackCurrentVehicle() {
        this._pendingTrack = true;
        this._maybeTrackCurrent();
    }

    _maybeTrackCurrent() {
        if (!this._pendingTrack || !this._loaded) return;
        var path = window.location.pathname;
        var isVehiclePage = path.indexOf('/vehiculos/') !== -1
                         || path.indexOf('detalle-vehiculo') !== -1;
        if (!isVehiclePage) { this._pendingTrack = false; return; }

        var vehicleId = window.PRERENDERED_VEHICLE_ID
                     || new URLSearchParams(window.location.search).get('id');
        if (vehicleId) this.addToHistory(vehicleId);
        this._pendingTrack = false;
    }

    addToHistory(vehicleId) {
        var id = String(vehicleId);
        var timestamp = Date.now();
        this._history = this._history.filter(function (item) { return String(item.id) !== id; });
        this._history.unshift({ id: id, timestamp: timestamp });
        if (this._history.length > this.maxItems) {
            this._history = this._history.slice(0, this.maxItems);
        }
        this._debouncedSync();
    }

    getHistory() { return this._history.slice(); }
    getHistoryIds() { return this._history.map(function (item) { return item.id; }); }
    getCount() { return this._history.length; }
    hasHistory() { return this._history.length > 0; }

    clearHistory() {
        this._history = [];
        this._saveToLocalStorage();
        if (this._isRegistered) this._syncToFirestore();
    }

    removeFromHistory(vehicleId) {
        var id = String(vehicleId);
        this._history = this._history.filter(function (item) { return String(item.id) !== id; });
        this._debouncedSync();
    }

    // ── Rendering ────────────────────────────────────────────
    async renderHistorySection(containerId, options) {
        options = options || {};
        var title = options.title || 'Vistos recientemente';
        var maxShow = options.maxShow || 4;
        var showClearButton = options.showClearButton !== false;

        var container = document.getElementById(containerId);
        if (!container) return;

        if (!this.hasHistory()) {
            container.style.display = 'none';
            return;
        }

        if (typeof vehicleDB === 'undefined') {
            console.warn('VehicleDB not available');
            return;
        }
        await vehicleDB.load();

        var historyIds = this.getHistoryIds().slice(0, maxShow);
        var vehicles = historyIds
            .map(function (id) { return vehicleDB.getVehicleById(id); })
            .filter(function (v) { return v; });

        if (vehicles.length === 0) {
            container.style.display = 'none';
            return;
        }

        var self = this;
        container.style.display = 'block';
        container.innerHTML =
            '<div class="history-section">' +
                '<div class="history-header">' +
                    '<h3 class="history-title">' +
                        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
                            '<circle cx="12" cy="12" r="10"/>' +
                            '<polyline points="12,6 12,12 16,14"/>' +
                        '</svg>' +
                        title +
                    '</h3>' +
                    (showClearButton ?
                        '<button class="history-clear-btn" id="clearHistoryBtn">' +
                            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
                                '<polyline points="3,6 5,6 21,6"/>' +
                                '<path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2v2"/>' +
                            '</svg>' +
                            'Limpiar' +
                        '</button>' : '') +
                '</div>' +
                '<div class="history-grid">' +
                    vehicles.map(function (v) { return self.renderHistoryCard(v); }).join('') +
                '</div>' +
            '</div>';

        var clearBtn = container.querySelector('#clearHistoryBtn');
        if (clearBtn) {
            clearBtn.addEventListener('click', function () {
                self.clearHistory();
                container.style.display = 'none';
                if (typeof toast !== 'undefined') toast.info('Historial limpiado');
            });
        }
    }

    renderHistoryCard(vehicle) {
        var price = vehicle.precioOferta || vehicle.precio;
        return '' +
            '<a href="' + getVehicleDetailUrl(vehicle) + '" class="history-card">' +
                '<div class="history-card-image">' +
                    '<img src="' + vehicle.imagen + '" alt="' + vehicle.marca + ' ' + vehicle.modelo + '" ' +
                         'loading="lazy" ' +
                         'onerror="this.src=\'multimedia/vehicles/placeholder-car.jpg\'">' +
                '</div>' +
                '<div class="history-card-info">' +
                    '<h4>' + this.capitalize(vehicle.marca) + ' ' + vehicle.modelo + '</h4>' +
                    '<span class="history-card-year">' + vehicle.year + '</span>' +
                    '<span class="history-card-price">' + this.formatCurrency(price) + '</span>' +
                '</div>' +
            '</a>';
    }

    // ── Widget flotante ──────────────────────────────────────
    createFloatingWidget() {
        if (!this.hasHistory()) return;
        if (document.getElementById('history-widget')) return;

        var widget = document.createElement('div');
        widget.id = 'history-widget';
        widget.className = 'history-widget';
        widget.innerHTML =
            '<button class="history-widget-toggle" id="historyWidgetToggle">' +
                '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
                    '<circle cx="12" cy="12" r="10"/>' +
                    '<polyline points="12,6 12,12 16,14"/>' +
                '</svg>' +
                '<span class="history-widget-count">' + this.getCount() + '</span>' +
            '</button>' +
            '<div class="history-widget-dropdown" id="historyWidgetDropdown">' +
                '<div class="history-widget-header">' +
                    '<span>Vistos recientemente</span>' +
                    '<button class="history-widget-clear" id="historyWidgetClear">Limpiar</button>' +
                '</div>' +
                '<div class="history-widget-list" id="historyWidgetList"></div>' +
            '</div>';

        document.body.appendChild(widget);

        var self = this;
        var toggleBtn = document.getElementById('historyWidgetToggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', function () {
                widget.classList.toggle('open');
                if (widget.classList.contains('open')) self.updateWidget();
            });
        }

        var clearBtn = document.getElementById('historyWidgetClear');
        if (clearBtn) {
            clearBtn.addEventListener('click', function () {
                self.clearHistory();
                widget.classList.remove('open');
            });
        }

        document.addEventListener('click', function (e) {
            if (widget && !widget.contains(e.target)) widget.classList.remove('open');
        });
    }

    async updateWidget() {
        var list = document.getElementById('historyWidgetList');
        if (!list) return;

        if (!this.hasHistory()) {
            list.innerHTML = '<p class="history-widget-empty">No hay vehículos en tu historial</p>';
            return;
        }

        if (typeof vehicleDB !== 'undefined') await vehicleDB.load();

        var self = this;
        var vehicles = this.getHistoryIds().slice(0, 5)
            .map(function (id) { return typeof vehicleDB !== 'undefined' ? vehicleDB.getVehicleById(id) : null; })
            .filter(function (v) { return v; });

        list.innerHTML = vehicles.map(function (v) {
            return '' +
                '<a href="' + getVehicleDetailUrl(v) + '" class="history-widget-item">' +
                    '<img src="' + v.imagen + '" alt="' + v.marca + '" ' +
                         'onerror="this.src=\'multimedia/vehicles/placeholder-car.jpg\'">' +
                    '<div class="history-widget-item-info">' +
                        '<span class="history-widget-item-name">' + self.capitalize(v.marca) + ' ' + v.modelo + '</span>' +
                        '<span class="history-widget-item-price">' + self.formatCurrency(v.precioOferta || v.precio) + '</span>' +
                    '</div>' +
                '</a>';
        }).join('');
    }

    // ── Utilities ────────────────────────────────────────────
    formatCurrency(amount) {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(amount);
    }

    capitalize(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

// Singleton global
const vehicleHistory = new VehicleHistory();

if (typeof window !== 'undefined') {
    window.vehicleHistory = vehicleHistory;
}

// En paginas de detalle, marcar como pendiente. Si no hay auth,
// localStorage ya esta disponible y trackea inmediatamente.
if (typeof window !== 'undefined'
    && (window.location.pathname.indexOf('/vehiculos/') !== -1
     || window.location.pathname.indexOf('detalle-vehiculo') !== -1)) {
    vehicleHistory.trackCurrentVehicle();
}
