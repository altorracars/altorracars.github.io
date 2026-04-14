// ============================================
// HISTORIAL DE VEHÍCULOS VISITADOS - ALTORRA CARS
// Firestore-only. Cada usuario (anonimo o registrado) tiene su propia
// lista privada en `clientes/{uid}.vehiculosVistos`.
// ============================================

class VehicleHistory {
    constructor() {
        this.maxItems = 12;
        this._uid = null;
        this._history = [];          // [{id, timestamp}]
        this._loaded = false;
        this._syncTimeout = null;
        this._pendingTrack = false;  // si trackCurrentVehicle se llamo antes de setUser
    }

    // ── Vinculacion con usuario ──────────────────────────────
    setUser(uid) {
        if (!uid) { this.clearUser(); return; }
        if (this._uid === uid && this._loaded) {
            this._maybeTrackCurrent();
            return;
        }
        this._uid = uid;
        this._loaded = false;
        this._history = [];
        this._loadFromFirestore();
    }

    clearUser() {
        if (this._syncTimeout) { clearTimeout(this._syncTimeout); this._syncTimeout = null; }
        this._uid = null;
        this._history = [];
        this._loaded = false;
    }

    _loadFromFirestore() {
        if (!this._uid || !window.db) return;
        var self = this;
        var uid = this._uid;
        window.db.collection('clientes').doc(uid).get()
            .then(function (doc) {
                if (uid !== self._uid) return;
                var arr = [];
                if (doc.exists && Array.isArray(doc.data().vehiculosVistos)) {
                    arr = doc.data().vehiculosVistos.slice(0, self.maxItems).map(function (item) {
                        return typeof item === 'object' && item !== null
                            ? { id: String(item.id), timestamp: item.timestamp || Date.now() }
                            : { id: String(item), timestamp: Date.now() };
                    });
                }
                self._history = arr;
                self._loaded = true;
                self._maybeTrackCurrent();
            })
            .catch(function (err) {
                console.warn('[History] Error loading from Firestore:', err && err.message);
                self._loaded = true;
                self._maybeTrackCurrent();
            });
    }

    _syncToFirestore() {
        if (!this._uid || !window.db) return;
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
        if (!this._uid) return;
        if (this._syncTimeout) clearTimeout(this._syncTimeout);
        var self = this;
        this._syncTimeout = setTimeout(function () {
            self._syncToFirestore();
        }, 1500);
    }

    // ── Tracking ─────────────────────────────────────────────
    // En paginas de detalle, registra el vehiculo actual una vez que el
    // usuario (anonimo o registrado) este disponible.
    trackCurrentVehicle() {
        this._pendingTrack = true;
        this._maybeTrackCurrent();
    }

    _maybeTrackCurrent() {
        if (!this._pendingTrack || !this._loaded || !this._uid) return;
        if (window.location.pathname.indexOf('detalle-vehiculo') === -1) {
            this._pendingTrack = false;
            return;
        }
        var params = new URLSearchParams(window.location.search);
        var vehicleId = params.get('id');
        if (vehicleId) this.addToHistory(vehicleId);
        this._pendingTrack = false;
    }

    addToHistory(vehicleId) {
        var id = String(vehicleId);
        var timestamp = Date.now();
        // Quitar duplicado
        this._history = this._history.filter(function (item) { return String(item.id) !== id; });
        // Insertar al inicio
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
        this._debouncedSync();
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
        this.attachWidgetListeners();
        this.updateWidget();
    }

    attachWidgetListeners() {
        var self = this;
        var toggle = document.getElementById('historyWidgetToggle');
        var clear = document.getElementById('historyWidgetClear');
        var widget = document.getElementById('history-widget');

        if (toggle) {
            toggle.addEventListener('click', function () {
                widget.classList.toggle('open');
                if (widget.classList.contains('open')) self.updateWidget();
            });
        }
        if (clear) {
            clear.addEventListener('click', function () {
                self.clearHistory();
                widget.classList.remove('open');
                widget.remove();
                if (typeof toast !== 'undefined') toast.info('Historial limpiado');
            });
        }
        document.addEventListener('click', function (e) {
            if (widget && !widget.contains(e.target)) widget.classList.remove('open');
        });
    }

    async updateWidget() {
        var list = document.getElementById('historyWidgetList');
        var countEl = document.querySelector('.history-widget-count');
        if (countEl) countEl.textContent = this.getCount();
        if (!list) return;

        if (!this.hasHistory()) {
            list.innerHTML = '<p class="history-widget-empty">No hay vehículos en tu historial</p>';
            return;
        }

        await vehicleDB.load();
        var historyIds = this.getHistoryIds().slice(0, 5);
        var self = this;
        var vehicles = historyIds
            .map(function (id) { return vehicleDB.getVehicleById(id); })
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

// En paginas de detalle, marcar como pendiente. setUser() del auth listener
// disparara el tracking real una vez que la cache de Firestore este lista.
if (typeof window !== 'undefined' && window.location.pathname.indexOf('detalle-vehiculo') !== -1) {
    vehicleHistory.trackCurrentVehicle();
}
