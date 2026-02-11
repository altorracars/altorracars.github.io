// Database Management System for ALTORRA CARS

class VehicleDatabase {
    constructor() {
        this.vehicles = [];
        this.brands = [];
        this.loaded = false;
        this._cacheKey = 'altorra-db-cache';
        this._cacheMaxAge = 5 * 60 * 1000; // 5 minutes
        this._unsubscribeVehicles = null;
        this._unsubscribeBrands = null;
        this._listenersStarted = false;
        this._lastErrors = { vehiculos: null, marcas: null };
        this._nextRetryAt = 0;
        this._loadPromise = null;
        this._listenerRecoveryTimer = null;
    }

    // ========== LOCAL CACHE (instant load while Firebase loads) ==========

    _saveToCache() {
        try {
            var payload = {
                ts: Date.now(),
                vehicles: this.vehicles,
                brands: this.brands
            };
            localStorage.setItem(this._cacheKey, JSON.stringify(payload));
        } catch (e) {
            // localStorage full or unavailable - ignore silently
        }
    }

    _loadFromCache(allowStale) {
        try {
            var raw = localStorage.getItem(this._cacheKey);
            if (!raw) return false;
            var data = JSON.parse(raw);
            if (!allowStale && (Date.now() - data.ts > this._cacheMaxAge)) return false;
            this.vehicles = data.vehicles || [];
            this.brands = data.brands || [];
            return true;
        } catch (e) {
            return false;
        }
    }

    _emitUpdate(source) {
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('vehicleDB:updated', {
                detail: {
                    source: source,
                    vehicles: this.vehicles.length,
                    brands: this.brands.length
                }
            }));
        }
    }

    _emitError(collection, error) {
        this._lastErrors[collection] = error ? (error.message || String(error)) : null;
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('vehicleDB:error', {
                detail: {
                    collection: collection,
                    message: this._lastErrors[collection]
                }
            }));
        }
    }

    // ========== MAIN LOAD ==========

    hasUsableLocalData() {
        return this.vehicles.length > 0 || this.brands.length > 0;
    }

    async load(forceRefresh = false) {
        // Evitar múltiples llamadas simultáneas
        if (this._loadPromise && !forceRefresh) {
            return this._loadPromise;
        }

        // Evitar reintentos muy agresivos si falló recientemente
        if (!forceRefresh && Date.now() < this._nextRetryAt && !this.hasUsableLocalData()) {
            return;
        }

        var self = this;
        this._loadPromise = (async function() {
            var cacheHasUsableData = false;

            // STEP 1: Cargar caché local instantáneamente (si existe)
            if (!forceRefresh) {
                // Intento 1: Caché fresco
                if (self._loadFromCache(false)) {
                    self.normalizeVehicles();
                    cacheHasUsableData = self.hasUsableLocalData();
                    if (cacheHasUsableData) {
                        self.loaded = true;
                        self._emitUpdate('cache');
                        console.log('Database loaded from fresh cache (' + self.vehicles.length + ' vehicles)');
                    }
                }

                // Intento 2: Caché antiguo (stale)
                if (!cacheHasUsableData && self._loadFromCache(true)) {
                    self.normalizeVehicles();
                    cacheHasUsableData = self.hasUsableLocalData();
                    if (cacheHasUsableData) {
                        self.loaded = true;
                        self._emitUpdate('stale-cache');
                        console.warn('Using stale cache while reconnecting to Firestore (' + self.vehicles.length + ' vehicles).');
                    }
                }
            }

            // STEP 2: Cargar desde Firestore (Fuente de verdad)
            try {
                if (!window.firebaseReady) {
                    // Esperar un poco a que firebase cargue si no está listo
                    await new Promise(r => setTimeout(r, 500));
                }
                
                if (!window.db) {
                     // Si después de esperar no hay DB, intentar esperar el promise global
                     if (window.firebaseReady) {
                        await window.firebaseReady;
                     }
                }

                // Timeout de seguridad por si Firebase no responde
                var firebaseOk = await self._awaitFirebaseWithTimeout(12000);
                if (!firebaseOk || !window.db) {
                    throw new Error('Firebase/Firestore timeout or not initialized');
                }

                await self.loadFromFirestore();
                self.normalizeVehicles();
                self.loaded = true;
                self._saveToCache();
                self._emitUpdate('firestore-initial');
                self._emitError('vehiculos', null); // Limpiar errores previos
                self._emitError('marcas', null);
                self._nextRetryAt = 0;
                console.log('Database loaded from Firestore (' + self.vehicles.length + ' vehicles)');
                return;

            } catch (e) {
                console.warn('Firestore connection failed, using fallback:', e.message);
                self._emitError('vehiculos', e);
            }

            // STEP 3: Fallback final
            // Si Firestore falló pero teníamos caché, nos quedamos con el caché.
            // Si no hay nada, declaramos estado vacío y programamos reintento.
            if (cacheHasUsableData) {
                self.loaded = true;
                self._emitUpdate('cache-fallback');
            } else {
                self.loaded = false;
                // No borramos arrays vacíos por si acaso
                self._emitUpdate('empty');
                self._nextRetryAt = Date.now() + 15000; // Reintentar en 15s
            }

        })().finally(function() {
            self._loadPromise = null;
        });

        return this._loadPromise;
    }

    _scheduleListenerRecovery(reason) {
        if (this._listenerRecoveryTimer) return;
        var self = this;
        this._listenerRecoveryTimer = setTimeout(function() {
            self._listenerRecoveryTimer = null;
            self._listenersStarted = false;
            // Limpiar listeners viejos
            if (self._unsubscribeVehicles) {
                try { self._unsubscribeVehicles(); } catch (e) {}
                self._unsubscribeVehicles = null;
            }
            if (self._unsubscribeBrands) {
                try { self._unsubscribeBrands(); } catch (e) {}
                self._unsubscribeBrands = null;
            }
            // Forzar recarga
            self.loaded = false;
            console.warn('Retrying Firestore connection:', reason);
            self.load(true);
        }, 5000);
    }

    async _awaitFirebaseWithTimeout(ms) {
        // Espera a que window.firebaseReady se resuelva O pase el tiempo 'ms'
        if (!window.firebaseReady) return false;
        
        return Promise.race([
            window.firebaseReady.then(function() { return true; }).catch(function() { return false; }),
            new Promise(function(resolve) {
                setTimeout(function() { resolve(false); }, ms);
            })
        ]);
    }

    _isPermissionDeniedError(err) {
        if (!err) return false;
        const msg = (err.message || '').toLowerCase();
        return msg.indexOf('permission-denied') >= 0 || msg.indexOf('insufficient permissions') >= 0;
    }

    async loadFromFirestore() {
        var self = this;

        // Si ya estamos escuchando, no duplicar
        if (this._listenersStarted && this._unsubscribeVehicles && this._unsubscribeBrands) {
            return true;
        }

        this._listenersStarted = true;
        var firstVehiclesResolved = false;
        var firstBrandsResolved = false;

        // Promesa para vehiculos
        var firstVehicles = new Promise(function(resolve) {
            try {
                self._unsubscribeVehicles = window.db.collection('vehiculos').onSnapshot(function(snap) {
                    self.vehicles = snap.docs.map(function(doc) {
                        var data = doc.data() || {};
                        // Asegurar ID numérico o string consistente
                        if (!data.id && doc.id) {
                            var parsedId = parseInt(doc.id, 10);
                            data.id = Number.isNaN(parsedId) ? doc.id : parsedId;
                        }
                        return data;
                    });
                    
                    self.normalizeVehicles();
                    self._saveToCache();
                    self.loaded = true;
                    // Emitir evento live
                    self._emitUpdate('firestore-live-vehicles');
                    
                    if (!firstVehiclesResolved) {
                        firstVehiclesResolved = true;
                        resolve(true);
                    }
                }, function(err) {
                    console.error('Firestore vehicles listener error:', err);
                    self._emitError('vehiculos', err);
                    
                    if (!self._isPermissionDeniedError(err)) {
                        self._scheduleListenerRecovery('vehiculos-error');
                    }
                    
                    if (!firstVehiclesResolved) {
                        firstVehiclesResolved = true;
                        resolve(false);
                    }
                });
            } catch (e) {
                console.error('Error setting up vehicle listener:', e);
                resolve(false);
            }
        });

        // Promesa para marcas
        var firstBrands = new Promise(function(resolve) {
            try {
                self._unsubscribeBrands = window.db.collection('marcas').onSnapshot(function(snap) {
                    self.brands = snap.empty ? [] : snap.docs.map(function(doc) { return doc.data(); });
                    self._saveToCache();
                    // Emitir evento live
                    self._emitUpdate('firestore-live-brands');
                    
                    if (!firstBrandsResolved) {
                        firstBrandsResolved = true;
                        resolve(true);
                    }
                }, function(err) {
                    console.error('Firestore brands listener error:', err);
                    self._emitError('marcas', err);
                    
                    if (!self._isPermissionDeniedError(err)) {
                        self._scheduleListenerRecovery('marcas-error');
                    }
                    
                    if (!firstBrandsResolved) {
                        firstBrandsResolved = true;
                        resolve(false);
                    }
                });
            } catch (e) {
                console.error('Error setting up brand listener:', e);
                resolve(false);
            }
        });

        // Esperar a que ambas carguen por primera vez (o fallen) con timeout
        await Promise.race([
            Promise.all([firstVehicles, firstBrands]),
            new Promise(function(resolve) { setTimeout(resolve, 8000); })
        ]);

        return true;
    }

    /**
     * FASE 1 - NORMALIZACIÓN AUTOMÁTICA
     * Convierte "seminuevo" → "usado" y "camioneta" → "pickup"
     */
    normalizeVehicles() {
        if (!Array.isArray(this.vehicles)) {
            this.vehicles = [];
            return;
        }

        this.vehicles = this.vehicles.map(v => {
            const normalized = { ...v };

            // Regla de negocio: "seminuevo" no existe, solo "nuevo" y "usado"
            if (normalized.tipo === 'seminuevo') {
                normalized.tipo = 'usado';
            }

            // Migración: "camioneta" → "pickup"
            if (normalized.categoria === 'camioneta') {
                normalized.categoria = 'pickup';
            }

            // Estado canónico
            if (!normalized.estado) {
                if (normalized.disponibilidad) {
                    normalized.estado = normalized.disponibilidad;
                } else {
                    normalized.estado = 'disponible';
                }
            }

            // Sanitizar estado
            if (!['borrador', 'disponible', 'reservado', 'vendido'].includes(normalized.estado)) {
                normalized.estado = 'disponible';
            }

            return normalized;
        });
    }

    normalizeQuery(value) {
        if (!value) return value;
        const normalized = value.toLowerCase().trim();
        if (normalized === 'seminuevo' || normalized === 'semi-nuevo') return 'usado';
        if (normalized === 'camioneta' || normalized === 'camionetas') return 'pickup';
        return normalized;
    }
    
    // Get all vehicles
    getAllVehicles(filters = {}) {
        if (filters.includeAllStates) return this.vehicles;
        return this.vehicles.filter(function(v) { return (v.estado || 'disponible') === 'disponible'; });
    }
    
    // Get vehicle by ID
    getVehicleById(id, options = {}) {
        // Comparación laxa (==) para manejar string/number id mix
        var vehicle = this.vehicles.find(v => v.id == id);
        if (!vehicle) return null;
        if (options.includeAllStates) return vehicle;
        return (vehicle.estado || 'disponible') === 'disponible' ? vehicle : null;
    }
    
    // Filter vehicles
    filter(filters = {}) {
        let filtered = [...this.vehicles];

        if (filters.tipo) filters.tipo = this.normalizeQuery(filters.tipo);
        if (filters.categoria) filters.categoria = this.normalizeQuery(filters.categoria);

        if (filters.tipo) filtered = filtered.filter(v => v.tipo === filters.tipo);
        if (filters.categoria) filtered = filtered.filter(v => v.categoria === filters.categoria);

        if (typeof filters.estado === 'undefined' || filters.estado === null || filters.estado === '') {
            filtered = filtered.filter(v => (v.estado || 'disponible') === 'disponible');
        } else if (filters.estado !== 'all') {
            filtered = filtered.filter(v => (v.estado || 'disponible') === filters.estado);
        }
        
        if (filters.marca) filtered = filtered.filter(v => v.marca === filters.marca);
        if (filters.transmision) filtered = filtered.filter(v => v.transmision === filters.transmision);
        if (filters.combustible) filtered = filtered.filter(v => v.combustible === filters.combustible);

        if (filters.precioMin) filtered = filtered.filter(v => v.precio >= parseInt(filters.precioMin));
        if (filters.precioMax) filtered = filtered.filter(v => v.precio <= parseInt(filters.precioMax));

        if (filters.yearMin) filtered = filtered.filter(v => v.year >= parseInt(filters.yearMin));
        if (filters.yearMax) filtered = filtered.filter(v => v.year <= parseInt(filters.yearMax));
        if (filters.kilometrajeMax) filtered = filtered.filter(v => v.kilometraje <= parseInt(filters.kilometrajeMax));

        if (filters.destacado === 'true' || filters.destacado === true) {
            filtered = filtered.filter(v => v.destacado === true);
        }
        if (filters.oferta === 'true' || filters.oferta === true) {
            filtered = filtered.filter(v => v.oferta === true || v.precioOferta);
        }
        
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            filtered = filtered.filter(v =>
                v.marca.toLowerCase().includes(searchLower) ||
                v.modelo.toLowerCase().includes(searchLower) ||
                (v.descripcion && v.descripcion.toLowerCase().includes(searchLower))
            );
        }
        
        return filtered;
    }
    
    getFeatured() {
        return this.vehicles.filter(v => v.destacado && (v.estado || 'disponible') === 'disponible');
    }

    calculateRankingScore(vehicle) {
        let score = 0;
        if (vehicle.destacado) score += 1000;
        if (vehicle.oferta || vehicle.precioOferta) score += 500;
        if (vehicle.tipo === 'nuevo') score += 200;
        const yearScore = Math.max(0, Math.min(100, (vehicle.year - 2000) * 3));
        score += yearScore;
        const kmScore = Math.max(0, 50 - (vehicle.kilometraje / 10000));
        score += kmScore;
        return score;
    }

    getRankedVehicles(limit = null) {
        const ranked = [...this.vehicles].map(v => ({
            ...v,
            _rankingScore: this.calculateRankingScore(v)
        }));
        ranked.sort((a, b) => b._rankingScore - a._rankingScore);
        const clean = ranked.map(v => {
            const { _rankingScore, ...vehicle } = v;
            return vehicle;
        });
        return limit ? clean.slice(0, limit) : clean;
    }

    getTopVehicles(limit = 12) {
        return this.getRankedVehicles(limit);
    }
    
    getByBrand(brand) {
        return this.vehicles.filter(v => v.marca === brand && (v.estado || 'disponible') === 'disponible');
    }
    
    getAllBrands() {
        return this.brands;
    }

    getBrandInfo(brandId) {
        return this.brands.find(b => b.id === brandId);
    }

    getUniqueBrands() {
        const brands = [...new Set(this.vehicles.filter(v => (v.estado || 'disponible') === 'disponible').map(v => v.marca))];
        return brands.sort();
    }

    getUniqueColors() {
        const colors = [...new Set(this.vehicles.filter(v => (v.estado || 'disponible') === 'disponible').map(v => v.color))];
        return colors.filter(c => c).sort();
    }

    getUniqueFuels() {
        const fuels = [...new Set(this.vehicles.filter(v => (v.estado || 'disponible') === 'disponible').map(v => v.combustible))];
        return fuels.filter(f => f).sort();
    }

    getYearRange() {
        const years = this.vehicles.filter(v => (v.estado || 'disponible') === 'disponible').map(v => v.year).filter(y => y);
        if (!years.length) return { min: 2010, max: 2025 };
        return {
            min: Math.min(...years),
            max: Math.max(...years)
        };
    }

    getPriceRange() {
        const prices = this.vehicles.filter(v => (v.estado || 'disponible') === 'disponible').map(v => v.precio).filter(p => p);
        if (!prices.length) return { min: 0, max: 500000000 };
        return {
            min: Math.min(...prices),
            max: Math.max(...prices)
        };
    }
}

// Create global database instance
const vehicleDB = new VehicleDatabase();

// Make it available globally in browser
if (typeof window !== 'undefined') {
    window.vehicleDB = vehicleDB;
}

// Export for use in other files (Node.js)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VehicleDatabase, vehicleDB };
}
