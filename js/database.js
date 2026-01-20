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
        
        // Search by text (model, brand, description)
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            filtered = filtered.filter(v => 
                v.marca.toLowerCase().includes(searchLower) ||
                v.modelo.toLowerCase().includes(searchLower) ||
                v.descripcion.toLowerCase().includes(searchLower)
            );
        }
        
        return filtered;
    }
    
    // Get featured vehicles
    getFeatured() {
        return this.vehicles.filter(v => v.destacado);
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
