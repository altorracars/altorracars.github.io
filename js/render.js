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

// Get all badges for a vehicle (FASE 2)
function getVehicleBadges(vehicle) {
    const badges = [];

    // Badge de tipo (Nuevo, Seminuevo, Usado)
    if (vehicle.tipo === 'nuevo') {
        badges.push({ class: 'badge-nuevo', text: 'Nuevo' });
    } else if (vehicle.tipo === 'seminuevo') {
        badges.push({ class: 'badge-seminuevo', text: 'Seminuevo' });
    } else {
        badges.push({ class: 'badge-usado', text: 'Usado' });
    }

    // Badge de destacado
    if (vehicle.destacado) {
        badges.push({ class: 'badge-destacado', text: 'Destacado' });
    }

    // Badge de garantía (para nuevos y seminuevos)
    if (vehicle.tipo === 'nuevo' || vehicle.tipo === 'seminuevo') {
        badges.push({ class: 'badge-garantia', text: 'Garantía' });
    }

    // Badge de oferta (si tiene descuento o campo especial)
    if (vehicle.oferta || vehicle.precioOferta) {
        badges.push({ class: 'badge-oferta', text: 'Oferta' });
    }

    return badges;
}

// Check if vehicle is in favorites
function isFavorite(vehicleId) {
    const favorites = JSON.parse(localStorage.getItem('altorra-favorites') || '[]');
    return favorites.includes(vehicleId.toString());
}

// Render single vehicle card
function renderVehicleCard(vehicle) {
    const badges = getVehicleBadges(vehicle);
    const favorite = isFavorite(vehicle.id);
    const heartIcon = favorite ? '♥' : '♡';
    const activeClass = favorite ? ' active' : '';

    // Generate badges HTML
    const badgesHTML = badges.map(badge =>
        `<span class="badge ${badge.class}">${badge.text}</span>`
    ).join('');

    return `
        <div class="vehicle-card" data-id="${vehicle.id}">
            <div class="vehicle-image">
                <img src="${vehicle.imagen}" alt="${vehicle.marca} ${vehicle.modelo}" loading="lazy" onerror="this.src='multimedia/vehicles/placeholder-car.jpg'">
                <button class="favorite-btn${activeClass}" data-id="${vehicle.id}" aria-label="Añadir a favoritos">${heartIcon}</button>
                <div class="vehicle-badges">
                    ${badgesHTML}
                </div>
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
            const wasAdded = toggleFavorite(vehicleId);

            // Update button with animation
            const favorites = JSON.parse(localStorage.getItem('altorra-favorites') || '[]');
            if (favorites.includes(vehicleId)) {
                button.textContent = '♥';
                button.classList.add('active');
                // Animación de pulso
                button.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    button.style.transform = 'scale(1)';
                }, 200);
            } else {
                button.textContent = '♡';
                button.classList.remove('active');
            }

            // Update counter en desktop y móvil
            if (typeof window.updateFavoritesCount === 'function') {
                window.updateFavoritesCount();
            }

            // Mostrar notificación toast
            if (typeof toast !== 'undefined') {
                const count = favorites.length;
                if (wasAdded) {
                    toast.success(
                        `Has añadido (${count}) ${count === 1 ? 'auto' : 'autos'} a favoritos.`,
                        'Auto agregado'
                    );
                } else {
                    toast.info(
                        `Has eliminado un auto de favoritos. Tienes (${count}) ${count === 1 ? 'auto' : 'autos'}.`,
                        'Auto eliminado'
                    );
                }
            }
        });
    });
}

// Toggle favorite - Retorna true si fue agregado, false si fue eliminado
function toggleFavorite(vehicleId) {
    let favorites = JSON.parse(localStorage.getItem('altorra-favorites') || '[]');
    const index = favorites.indexOf(vehicleId.toString());
    let wasAdded = false;

    if (index > -1) {
        favorites.splice(index, 1);
        wasAdded = false;
    } else {
        favorites.push(vehicleId.toString());
        wasAdded = true;
    }

    localStorage.setItem('altorra-favorites', JSON.stringify(favorites));
    return wasAdded;
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
