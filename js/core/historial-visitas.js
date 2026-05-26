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
        if (!vehicleId) { this._pendingTrack = false; return; }
        // Best-effort snapshot: lookup current vehicle data if vehicleDB ready
        var snap = this._snapshotFor(vehicleId);
        this.addToHistory(vehicleId, snap);
        // If snap was unavailable now, retry once vehicleDB loads
        if (!snap && window.vehicleDB && typeof window.vehicleDB.onChange === 'function') {
            var self = this;
            var done = false;
            window.vehicleDB.onChange(function () {
                if (done) return;
                var s = self._snapshotFor(vehicleId);
                if (s) {
                    done = true;
                    self.addToHistory(vehicleId, s); // refresh — keeps timestamp on the existing item
                }
            });
        }
        this._pendingTrack = false;
    }

    _snapshotFor(vehicleId) {
        if (!window.vehicleDB || !window.vehicleDB.vehicles) return null;
        var id = String(vehicleId);
        for (var i = 0; i < window.vehicleDB.vehicles.length; i++) {
            var v = window.vehicleDB.vehicles[i];
            if (String(v.id) === id) {
                return {
                    precio: typeof v.precio === 'number' ? v.precio : null,
                    precioOferta: typeof v.precioOferta === 'number' ? v.precioOferta : null,
                    estado: v.estado || 'disponible'
                };
            }
        }
        return null;
    }

    addToHistory(vehicleId, snap) {
        var id = String(vehicleId);
        var timestamp = Date.now();
        // Preserve original timestamp if this is a snap-refresh (same id already at top)
        var existingTs = null;
        if (this._history.length > 0 && String(this._history[0].id) === id && snap) {
            existingTs = this._history[0].timestamp;
        }
        this._history = this._history.filter(function (item) { return String(item.id) !== id; });
        var entry = { id: id, timestamp: existingTs || timestamp };
        if (snap) entry.snap = snap;
        this._history.unshift(entry);
        if (this._history.length > this.maxItems) {
            this._history = this._history.slice(0, this.maxItems);
        }
        this._debouncedSync();
    }

    /** Diff between saved snapshot and current vehicle data — for E2 badge */
    diffForVehicle(vehicleId, currentVehicle) {
        if (!currentVehicle) return null;
        var id = String(vehicleId);
        var entry = this._history.find(function (item) { return String(item.id) === id; });
        if (!entry || !entry.snap) return null;
        var oldSnap = entry.snap;
        var oldP = (typeof oldSnap.precioOferta === 'number' && oldSnap.precioOferta > 0)
            ? oldSnap.precioOferta : oldSnap.precio;
        var newP = (typeof currentVehicle.precioOferta === 'number' && currentVehicle.precioOferta > 0)
            ? currentVehicle.precioOferta : currentVehicle.precio;
        // Status takes priority
        if (oldSnap.estado !== currentVehicle.estado) {
            return { type: 'status', oldEstado: oldSnap.estado, newEstado: currentVehicle.estado };
        }
        if (oldP && newP && oldP !== newP) {
            var pct = ((newP - oldP) / oldP) * 100;
            if (Math.abs(pct) >= 1) {
                return { type: pct < 0 ? 'price_drop' : 'price_increase',
                    oldPrice: oldP, newPrice: newP,
                    pctChange: Math.round(pct * 10) / 10 };
            }
        }
        return null;
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

        // E3 — emit ONLY significant changes to the bell. Threshold:
        // - Price drop ≥5% (genuine deal, not noise)
        // - Status → vendido (lost the chance) or reservado (urgency)
        // Dedup via entityRef → A2 default 6h (price_alert) / 1h (inventory_change).
        if (window.notifyCenter && typeof window.notifyCenter.notify === 'function') {
            vehicles.forEach(function (v) {
                var d = self.diffForVehicle(v.id, v);
                if (!d) return;
                if (d.type === 'price_drop' && Math.abs(d.pctChange) >= 5) {
                    var name = self.capitalize(v.marca) + ' ' + v.modelo + (v.year ? ' ' + v.year : '');
                    window.notifyCenter.notify('price_alert', {
                        title: 'Bajo el precio: ' + name,
                        message: 'Lo viste antes a ' + self.formatCurrency(d.oldPrice)
                            + ', ahora esta a ' + self.formatCurrency(d.newPrice)
                            + '  (' + d.pctChange + '%)',
                        link: getVehicleDetailUrl(v),
                        entityRef: 'rv-vehicle:' + v.id,
                        suppressIfHidden: false  // worth interrupting if visible
                    });
                } else if (d.type === 'status' && (d.newEstado === 'vendido' || d.newEstado === 'reservado')) {
                    var name2 = self.capitalize(v.marca) + ' ' + v.modelo;
                    window.notifyCenter.notify('inventory_change', {
                        title: name2 + (d.newEstado === 'vendido' ? ' fue vendido' : ' fue reservado'),
                        message: d.newEstado === 'vendido'
                            ? 'Un vehiculo que viste ya no esta disponible.'
                            : 'Un vehiculo que viste fue reservado por alguien mas.',
                        link: 'busqueda.html',
                        entityRef: 'rv-vehicle:' + v.id
                    });
                }
            });
        }
    }

    renderHistoryCard(vehicle) {
        var price = vehicle.precioOferta || vehicle.precio;
        var diff = this.diffForVehicle(vehicle.id, vehicle);
        var badge = '';
        if (diff) {
            var label = '', cls = '';
            if (diff.type === 'price_drop') {
                label = '↓ ' + Math.abs(diff.pctChange).toFixed(1) + '% desde tu visita';
                cls = 'rv-diff-badge--drop';
            } else if (diff.type === 'price_increase') {
                label = '↑ ' + Math.abs(diff.pctChange).toFixed(1) + '%';
                cls = 'rv-diff-badge--up';
            } else if (diff.type === 'status') {
                if (diff.newEstado === 'reservado') { label = 'Reservado ahora'; cls = 'rv-diff-badge--warn'; }
                else if (diff.newEstado === 'vendido') { label = 'Vendido'; cls = 'rv-diff-badge--gone'; }
                else if (diff.newEstado === 'disponible') { label = 'Volvio disponible'; cls = 'rv-diff-badge--drop'; }
            }
            if (label) {
                badge = '<span class="rv-diff-badge ' + cls + '">' + label + '</span>';
            }
        }
        return '' +
            '<a href="' + getVehicleDetailUrl(vehicle) + '" class="history-card">' +
                '<div class="history-card-image">' +
                    '<img src="' + vehicle.imagen + '" alt="' + vehicle.marca + ' ' + vehicle.modelo + '" ' +
                         'loading="lazy" decoding="async" ' +
                         'onerror="this.src=\'multimedia/vehicles/placeholder-car.jpg\'">' +
                    badge +
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
                         'loading="lazy" decoding="async" ' +
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

// En paginas de detalle, trackear despues de que PRERENDERED_VEHICLE_ID
// haya sido asignado (se define en un <script> posterior a este archivo).
if (typeof window !== 'undefined'
    && (window.location.pathname.indexOf('/vehiculos/') !== -1
     || window.location.pathname.indexOf('detalle-vehiculo') !== -1)) {
    setTimeout(function () { vehicleHistory.trackCurrentVehicle(); }, 0);

    // Flush pendiente de localStorage al salir de la pagina
    window.addEventListener('beforeunload', function () {
        if (vehicleHistory._syncTimeout) {
            clearTimeout(vehicleHistory._syncTimeout);
            vehicleHistory._saveToLocalStorage();
        }
    });
}
