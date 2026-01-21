// Database Management System for ALTORRA CARS

class VehicleDatabase {
    constructor() {
        this.vehicles = [];
        this.brands = [];
        this.loaded = false;
    }
    
    async load() {
        if (this.loaded) return;

        try {
            const response = await fetch('data/vehiculos.json');
            if (!response.ok) {
                throw new Error('Failed to load vehicle database');
            }
            const data = await response.json();
            this.vehicles = data.vehiculos || [];
            this.brands = data.marcas || [];

            // ✅ FASE 1: Normalizar taxonomía automáticamente
            this.normalizeVehicles();

            this.loaded = true;
        } catch (error) {
            console.error('Error loading database:', error);
            this.vehicles = [];
            this.brands = [];
        }
    }

    /**
     * FASE 1 - NORMALIZACIÓN AUTOMÁTICA
     * Convierte "seminuevo" → "usado" y "camioneta" → "pickup"
     * Sin romper el inventario existente
     */
    normalizeVehicles() {
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

            return normalized;
        });
    }

    /**
     * Normaliza queries de usuario para compatibilidad
     */
    normalizeQuery(value) {
        if (!value) return value;

        const normalized = value.toLowerCase().trim();

        // Mapeos de compatibilidad
        if (normalized === 'seminuevo' || normalized === 'semi-nuevo') {
            return 'usado';
        }
        if (normalized === 'camioneta' || normalized === 'camionetas') {
            return 'pickup';
        }

        return normalized;
    }
    
    // Get all vehicles
    getAllVehicles() {
        return this.vehicles;
    }
    
    // Get vehicle by ID
    getVehicleById(id) {
        return this.vehicles.find(v => v.id == id);
    }
    
    // Filter vehicles
    filter(filters = {}) {
        let filtered = [...this.vehicles];

        // ✅ FASE 1: Normalizar queries entrantes para compatibilidad
        if (filters.tipo) {
            filters.tipo = this.normalizeQuery(filters.tipo);
        }
        if (filters.categoria) {
            filters.categoria = this.normalizeQuery(filters.categoria);
        }

        // Filter by type (nuevo, usado) - seminuevo ya mapeado a usado
        if (filters.tipo) {
            filtered = filtered.filter(v => v.tipo === filters.tipo);
        }

        // Filter by category (suv, sedan, hatchback, pickup) - camioneta ya mapeado a pickup
        if (filters.categoria) {
            filtered = filtered.filter(v => v.categoria === filters.categoria);
        }
        
        // Filter by brand
        if (filters.marca) {
            filtered = filtered.filter(v => v.marca === filters.marca);
        }
        
        // Filter by transmission
        if (filters.transmision) {
            filtered = filtered.filter(v => v.transmision === filters.transmision);
        }

        // FASE 3: Filter by combustible
        if (filters.combustible) {
            filtered = filtered.filter(v => v.combustible === filters.combustible);
        }

        // Filter by price range
        if (filters.precioMin) {
            filtered = filtered.filter(v => v.precio >= parseInt(filters.precioMin));
        }
        if (filters.precioMax) {
            filtered = filtered.filter(v => v.precio <= parseInt(filters.precioMax));
        }

        // Filter by year range
        if (filters.yearMin) {
            filtered = filtered.filter(v => v.year >= parseInt(filters.yearMin));
        }
        if (filters.yearMax) {
            filtered = filtered.filter(v => v.year <= parseInt(filters.yearMax));
        }

        // FASE 3: Filter by kilometraje
        if (filters.kilometrajeMax) {
            filtered = filtered.filter(v => v.kilometraje <= parseInt(filters.kilometrajeMax));
        }

        // FASE 3: Filter by destacado
        if (filters.destacado === 'true' || filters.destacado === true) {
            filtered = filtered.filter(v => v.destacado === true);
        }

        // FASE 3: Filter by oferta
        if (filters.oferta === 'true' || filters.oferta === true) {
            filtered = filtered.filter(v => v.oferta === true || v.precioOferta);
        }
        
        // Search by text (model, brand, description)
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
    
    // Get featured vehicles
    getFeatured() {
        return this.vehicles.filter(v => v.destacado);
    }

    /**
     * FASE 2 - SISTEMA DE RANKING ROBUSTO
     * Calcula un score de prioridad para cada vehículo
     * Criterios: destacado > oferta > nuevo > año reciente > bajo kilometraje
     */
    calculateRankingScore(vehicle) {
        let score = 0;

        // 1. Destacado tiene máxima prioridad (+1000)
        if (vehicle.destacado) {
            score += 1000;
        }

        // 2. Ofertas tienen alta prioridad (+500)
        if (vehicle.oferta || vehicle.precioOferta) {
            score += 500;
        }

        // 3. Vehículos nuevos tienen prioridad sobre usados (+200)
        if (vehicle.tipo === 'nuevo') {
            score += 200;
        }

        // 4. Año más reciente suma puntos (máx +100)
        // Asumiendo años entre 2000-2030
        const yearScore = Math.max(0, Math.min(100, (vehicle.year - 2000) * 3));
        score += yearScore;

        // 5. Menor kilometraje suma puntos (máx +50)
        // Inverso: menos km = más puntos
        const kmScore = Math.max(0, 50 - (vehicle.kilometraje / 10000));
        score += kmScore;

        return score;
    }

    /**
     * FASE 2 - OBTENER VEHÍCULOS RANKEADOS
     * Retorna vehículos ordenados por score de ranking
     */
    getRankedVehicles(limit = null) {
        const ranked = [...this.vehicles].map(v => ({
            ...v,
            _rankingScore: this.calculateRankingScore(v)
        }));

        // Ordenar por score descendente
        ranked.sort((a, b) => b._rankingScore - a._rankingScore);

        // Remover el score temporal antes de retornar
        const clean = ranked.map(v => {
            const { _rankingScore, ...vehicle } = v;
            return vehicle;
        });

        return limit ? clean.slice(0, limit) : clean;
    }

    /**
     * FASE 2 - OBTENER TOP VEHÍCULOS
     * Retorna los N mejores vehículos según ranking
     */
    getTopVehicles(limit = 12) {
        return this.getRankedVehicles(limit);
    }
    
    // Get vehicles by brand
    getByBrand(brand) {
        return this.vehicles.filter(v => v.marca === brand);
    }
    
    // Get vehicles by category
    getByCategory(category) {
        return this.vehicles.filter(v => v.categoria === category);
    }
    
    // Get all brands
    getAllBrands() {
        return this.brands;
    }

    // Get brand info
    getBrandInfo(brandId) {
        return this.brands.find(b => b.id === brandId);
    }

    /**
     * FASE 3 - OBTENER VALORES ÚNICOS DEL INVENTARIO
     * Para generar filtros dinámicos
     */
    getUniqueBrands() {
        const brands = [...new Set(this.vehicles.map(v => v.marca))];
        return brands.sort();
    }

    getUniqueColors() {
        const colors = [...new Set(this.vehicles.map(v => v.color))];
        return colors.filter(c => c).sort();
    }

    getUniqueFuels() {
        const fuels = [...new Set(this.vehicles.map(v => v.combustible))];
        return fuels.filter(f => f).sort();
    }

    getYearRange() {
        const years = this.vehicles.map(v => v.year).filter(y => y);
        return {
            min: Math.min(...years),
            max: Math.max(...years)
        };
    }

    getPriceRange() {
        const prices = this.vehicles.map(v => v.precio).filter(p => p);
        return {
            min: Math.min(...prices),
            max: Math.max(...prices)
        };
    }
    
    // Sort vehicles
    sort(vehicles, sortBy = 'precio-asc') {
        const sorted = [...vehicles];
        
        switch (sortBy) {
            case 'precio-asc':
                return sorted.sort((a, b) => a.precio - b.precio);
            case 'precio-desc':
                return sorted.sort((a, b) => b.precio - a.precio);
            case 'year-desc':
                return sorted.sort((a, b) => b.year - a.year);
            case 'year-asc':
                return sorted.sort((a, b) => a.year - b.year);
            case 'km-asc':
                return sorted.sort((a, b) => a.kilometraje - b.kilometraje);
            case 'marca-asc':
                return sorted.sort((a, b) => a.marca.localeCompare(b.marca));
            default:
                return sorted;
        }
    }
}

// Create global database instance
const vehicleDB = new VehicleDatabase();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VehicleDatabase, vehicleDB };
}
