// Vehicle Rendering System for ALTORRA CARS

// Format price in Colombian Pesos
function formatPrice(price) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
}

// Format kilometers
function formatKm(km) {
    if (km === 0) return 'Nuevo';
    return new Intl.NumberFormat('es-CO').format(km) + ' km';
}

// Capitalize first letter
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Get badge class and text based on vehicle type
function getBadge(vehicle) {
    if (vehicle.tipo === 'nuevo') {
        return { class: 'badge-new', text: 'Nuevo' };
    } else if (vehicle.tipo === 'seminuevo') {
        return { class: 'badge-used', text: 'Seminuevo' };
    } else {
        return { class: 'badge-used', text: 'Usado' };
    }
}

// Check if vehicle is in favorites
function isFavorite(vehicleId) {
    const favorites = JSON.parse(localStorage.getItem('altorra-favorites') || '[]');
    return favorites.includes(vehicleId.toString());
}

// Render single vehicle card
function renderVehicleCard(vehicle) {
    const badge = getBadge(vehicle);
    const favorite = isFavorite(vehicle.id);
    const heartIcon = favorite ? '♥' : '♡';
    const activeClass = favorite ? ' active' : '';
    
    return `
        <div class="vehicle-card" data-id="${vehicle.id}">
            <div class="vehicle-image">
                <img src="${vehicle.imagen}" alt="${vehicle.marca} ${vehicle.modelo}" loading="lazy" onerror="this.src='multimedia/vehicles/placeholder-car.jpg'">
                <button class="favorite-btn${activeClass}" data-id="${vehicle.id}" aria-label="Añadir a favoritos">${heartIcon}</button>
                <span class="badge ${badge.class}">${badge.text}</span>
            </div>
            <div class="vehicle-info">
                <h3 class="vehicle-title">${capitalize(vehicle.marca)} ${vehicle.modelo} ${vehicle.year}</h3>
                <p class="vehicle-specs">
                    <span>${capitalize(vehicle.transmision)}</span> • 
                    <span>${formatKm(vehicle.kilometraje)}</span> • 
                    <span>${capitalize(vehicle.categoria)}</span>
                </p>
                <div class="vehicle-footer">
                    <p class="vehicle-price">${formatPrice(vehicle.precio)}</p>
                    <a href="detalle-vehiculo.html?id=${vehicle.id}" class="btn-view">Ver más</a>
                </div>
            </div>
        </div>
    `;
}

// Render multiple vehicles
function renderVehicles(vehicles, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container ${containerId} not found`);
        return;
    }
    
    if (vehicles.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <p>No se encontraron vehículos con los filtros seleccionados.</p>
                <a href="vehiculos-usados.html" class="btn-primary">Ver todos los vehículos</a>
            </div>
        `;
        return;
    }
    
    const html = vehicles.map(renderVehicleCard).join('');
    container.innerHTML = html;
    
    // Attach favorite button listeners
    attachFavoriteListeners();
}

// Attach event listeners to favorite buttons
function attachFavoriteListeners() {
    const favButtons = document.querySelectorAll('.favorite-btn');
    favButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const vehicleId = button.getAttribute('data-id');
            toggleFavorite(vehicleId);
            
            // Update button
            const favorites = JSON.parse(localStorage.getItem('altorra-favorites') || '[]');
            if (favorites.includes(vehicleId)) {
                button.textContent = '♥';
                button.classList.add('active');
            } else {
                button.textContent = '♡';
                button.classList.remove('active');
            }
            
            // Update counter
            updateFavoritesCount();
        });
    });
}

// Toggle favorite
function toggleFavorite(vehicleId) {
    let favorites = JSON.parse(localStorage.getItem('altorra-favorites') || '[]');
    const index = favorites.indexOf(vehicleId.toString());
    
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(vehicleId.toString());
    }
    
    localStorage.setItem('altorra-favorites', JSON.stringify(favorites));
}

// Update favorites count in header
function updateFavoritesCount() {
    const favorites = JSON.parse(localStorage.getItem('altorra-favorites') || '[]');
    const favCount = document.getElementById('favCount');
    if (favCount) {
        favCount.textContent = favorites.length.toString();
    }
}

// Render pagination
function renderPagination(totalItems, currentPage, itemsPerPage, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (totalPages <= 1) {
        container.innerHTML = '';
        return;
    }
    
    let html = '<div class="pagination">';
    
    // Previous button
    if (currentPage > 1) {
        html += `<button class="pagination-btn" data-page="${currentPage - 1}">‹ Anterior</button>`;
    }
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (
            i === 1 || 
            i === totalPages || 
            (i >= currentPage - 2 && i <= currentPage + 2)
        ) {
            const activeClass = i === currentPage ? ' active' : '';
            html += `<button class="pagination-btn${activeClass}" data-page="${i}">${i}</button>`;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            html += '<span class="pagination-dots">...</span>';
        }
    }
    
    // Next button
    if (currentPage < totalPages) {
        html += `<button class="pagination-btn" data-page="${currentPage + 1}">Siguiente ›</button>`;
    }
    
    html += '</div>';
    container.innerHTML = html;
    
    // Attach pagination listeners
    attachPaginationListeners();
}

// Attach event listeners to pagination buttons
function attachPaginationListeners() {
    const buttons = document.querySelectorAll('.pagination-btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const page = parseInt(button.getAttribute('data-page'));
            if (typeof window.goToPage === 'function') {
                window.goToPage(page);
            }
        });
    });
}

// Render loading state
function showLoading(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <p>Cargando vehículos...</p>
            </div>
        `;
    }
}
