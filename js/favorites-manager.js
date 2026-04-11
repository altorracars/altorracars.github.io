/**
 * ALTORRA CARS - Favorites Manager System
 * Sistema unificado de gestión de favoritos con normalización garantizada
 *
 * SOLUCIÓN A PROBLEMA:
 * - IDs en JSON son números (5, 8)
 * - HTML data-* devuelven strings ("5", "8")
 * - Este sistema NORMALIZA TODO a strings para consistencia total
 */

class FavoritesManager {
    constructor() {
        this.STORAGE_KEY = 'altorra-favorites';
        this.DEBUG = false; // Activar para ver logs en consola
        this._uid = null;       // UID del usuario autenticado (null = anónimo)
        this._syncTimeout = null; // Debounce para sync a Firestore
        this._init();
    }

    // ── Per-user sync with Firestore ────────────────────────
    // Called by auth.js on login — loads favorites from Firestore
    // and merges any anonymous (localStorage) favorites into the account.
    setUser(uid) {
        if (this._uid === uid) return;
        this._uid = uid;
        if (uid) {
            this._loadFromFirestore(uid);
        }
    }

    // Called by auth.js on logout — clears user-specific data
    clearUser() {
        if (this._syncTimeout) clearTimeout(this._syncTimeout);
        this._uid = null;
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify([]));
        this._dispatchEvent('cleared', null);
        this.updateAllCounters();
    }

    _loadFromFirestore(uid) {
        if (!window.db) return;
        var self = this;
        var anonFavs = self.getAll();

        window.db.collection('clientes').doc(uid).get()
            .then(function (doc) {
                var firestoreFavs = [];
                if (doc.exists && Array.isArray(doc.data().favoritos)) {
                    firestoreFavs = doc.data().favoritos.map(String);
                }
                // Merge: union of anonymous localStorage + Firestore
                var merged = firestoreFavs.slice();
                anonFavs.forEach(function (id) {
                    if (merged.indexOf(id) === -1) merged.push(id);
                });

                localStorage.setItem(self.STORAGE_KEY, JSON.stringify(merged));
                self._dispatchEvent('synced', null);
                self.updateAllCounters();

                // If anonymous had unique favorites, sync merge back
                if (merged.length > firestoreFavs.length) {
                    self._syncToFirestore(merged);
                }

                self._log('Cloud sync complete:', merged.length, 'favorites');
            }).catch(function (err) {
                console.warn('[Favorites] Error loading from Firestore:', err);
            });
    }

    _syncToFirestore(favorites) {
        if (!this._uid || !window.db) return;
        var favs = favorites || this.getAll();
        window.db.collection('clientes').doc(this._uid).update({
            favoritos: favs
        }).catch(function (err) {
            console.warn('[Favorites] Error syncing to Firestore:', err);
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

    /**
     * Inicializa el sistema y valida localStorage
     */
    _init() {
        try {
            // Validar que localStorage funcione
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);

            // Normalizar datos existentes
            this._normalizeStorage();

            this._log('✅ FavoritesManager inicializado correctamente');
        } catch (error) {
            console.error('❌ Error inicializando FavoritesManager:', error);
        }
    }

    /**
     * Normaliza los datos en localStorage (convierte todos los IDs a strings)
     */
    _normalizeStorage() {
        try {
            const raw = localStorage.getItem(this.STORAGE_KEY);
            if (!raw) {
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify([]));
                return;
            }

            const data = JSON.parse(raw);
            if (!Array.isArray(data)) {
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify([]));
                return;
            }

            // Convertir todos a strings y eliminar duplicados
            const normalized = [...new Set(data.map(id => String(id)))];
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(normalized));

            this._log('🔄 Storage normalizado:', normalized);
        } catch (error) {
            console.error('Error normalizando storage:', error);
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify([]));
        }
    }

    /**
     * Obtiene todos los favoritos (siempre como array de strings)
     */
    getAll() {
        try {
            const data = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
            // GARANTIZAR que siempre sean strings
            return Array.isArray(data) ? data.map(id => String(id)) : [];
        } catch (error) {
            console.error('Error obteniendo favoritos:', error);
            return [];
        }
    }

    /**
     * Verifica si un vehículo está en favoritos
     * @param {*} vehicleId - ID del vehículo (string o number)
     * @returns {boolean}
     */
    has(vehicleId) {
        const normalizedId = String(vehicleId);
        const favorites = this.getAll();
        const result = favorites.includes(normalizedId);

        this._log(`🔍 has(${vehicleId}) -> ${result}`, favorites);
        return result;
    }

    /**
     * Agrega un vehículo a favoritos
     * @param {*} vehicleId - ID del vehículo
     * @returns {boolean} - true si se agregó, false si ya existía
     */
    add(vehicleId) {
        const normalizedId = String(vehicleId);
        const favorites = this.getAll();

        // Si ya existe, no hacer nada
        if (favorites.includes(normalizedId)) {
            this._log(`⚠️ add(${vehicleId}) -> Ya existe`);
            return false;
        }

        // Agregar y guardar
        favorites.push(normalizedId);
        this._save(favorites);
        this._dispatchEvent('added', normalizedId);

        this._log(`✅ add(${vehicleId}) -> Agregado`, favorites);
        return true;
    }

    /**
     * Elimina un vehículo de favoritos
     * @param {*} vehicleId - ID del vehículo
     * @returns {boolean} - true si se eliminó, false si no existía
     */
    remove(vehicleId) {
        const normalizedId = String(vehicleId);
        const favorites = this.getAll();
        const index = favorites.indexOf(normalizedId);

        // Si no existe, no hacer nada
        if (index === -1) {
            this._log(`⚠️ remove(${vehicleId}) -> No existe`);
            return false;
        }

        // Eliminar y guardar
        favorites.splice(index, 1);
        this._save(favorites);
        this._dispatchEvent('removed', normalizedId);

        this._log(`🗑️ remove(${vehicleId}) -> Eliminado`, favorites);
        return true;
    }

    /**
     * Toggle favorito (agrega si no existe, elimina si existe)
     * @param {*} vehicleId - ID del vehículo
     * @returns {boolean} - true si se AGREGÓ, false si se ELIMINÓ
     */
    toggle(vehicleId) {
        const normalizedId = String(vehicleId);
        const wasInFavorites = this.has(normalizedId);

        if (wasInFavorites) {
            this.remove(normalizedId);
            return false; // Se ELIMINÓ
        } else {
            this.add(normalizedId);
            return true; // Se AGREGÓ
        }
    }

    /**
     * Elimina todos los favoritos
     */
    clear() {
        this._save([]);
        this._dispatchEvent('cleared', null);
        this._log('🗑️ clear() -> Todos eliminados');
    }

    /**
     * Obtiene el número de favoritos
     * @returns {number}
     */
    count() {
        return this.getAll().length;
    }

    /**
     * Guarda favoritos en localStorage
     * @private
     */
    _save(favorites) {
        try {
            // GARANTIZAR que todos sean strings antes de guardar
            const normalized = favorites.map(id => String(id));
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(normalized));
            // Sync to Firestore when user is authenticated
            if (this._uid) this._debouncedSync();
        } catch (error) {
            console.error('Error guardando favoritos:', error);
        }
    }

    /**
     * Dispara evento personalizado cuando cambian los favoritos
     * @private
     */
    _dispatchEvent(action, vehicleId) {
        const event = new CustomEvent('favoritesChanged', {
            detail: {
                action: action, // 'added', 'removed', 'cleared'
                vehicleId: vehicleId,
                count: this.count(),
                favorites: this.getAll()
            }
        });
        window.dispatchEvent(event);
    }

    /**
     * Log para debugging
     * @private
     */
    _log(...args) {
        if (this.DEBUG) {
            console.log('[FavoritesManager]', ...args);
        }
    }

    /**
     * Actualiza todos los contadores en la UI.
     * Si los elementos del header aún no existen (carga dinámica),
     * usa MutationObserver para actualizar cuando aparezcan.
     */
    updateAllCounters() {
        const count = this.count();
        const countStr = count.toString();

        const counterIds = ['favCount', 'favCountMobile', 'favoritesCount'];
        let allFound = true;

        counterIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.textContent = countStr;
            } else {
                allFound = false;
            }
        });

        this._log(`🔄 Contadores actualizados: ${count}`);

        // Si faltan elementos (header aún cargando), observar el DOM
        if (!allFound && !this._observing) {
            this._observing = true;
            const observer = new MutationObserver(() => {
                let found = 0;
                counterIds.forEach(id => {
                    const el = document.getElementById(id);
                    if (el) {
                        el.textContent = this.count().toString();
                        found++;
                    }
                });
                // Desconectar una vez que encontramos al menos los 2 del header
                if (found >= 2) {
                    observer.disconnect();
                    this._observing = false;
                    this._log('🔄 Contadores actualizados vía MutationObserver');
                }
            });
            observer.observe(document.body, { childList: true, subtree: true });
            // Seguridad: desconectar después de 5s si nunca aparecen
            setTimeout(() => {
                if (this._observing) {
                    observer.disconnect();
                    this._observing = false;
                }
            }, 5000);
        }
    }

    /**
     * Actualiza el estado visual de un botón de favorito
     */
    updateButtonState(button, vehicleId) {
        const normalizedId = String(vehicleId);
        const isFav = this.has(normalizedId);

        if (isFav) {
            button.textContent = '♥';
            button.classList.add('active');
        } else {
            button.textContent = '♡';
            button.classList.remove('active');
        }

        this._log(`🔄 Botón actualizado para ID ${vehicleId}: ${isFav}`);
    }
}

// Crear instancia global SINGLETON
const favoritesManager = new FavoritesManager();

// Escuchar cambios en favoritos para actualizar contadores automáticamente
window.addEventListener('favoritesChanged', (e) => {
    favoritesManager.updateAllCounters();
});

// Exponer globalmente para uso en otros scripts
window.favoritesManager = favoritesManager;

// Export para módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FavoritesManager, favoritesManager };
}
