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
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// ✅ FASE 1: Formatear nombre de categoría canónico
function formatCategoria(categoria) {
    const categorias = {
        'suv': 'SUV',
        'pickup': 'Pickup',
        'sedan': 'Sedán',
        'hatchback': 'Hatchback'
    };
    return categorias[categoria] || capitalize(categoria);
}

// Get badge class and text based on vehicle type
function getBadge(vehicle) {
    // FASE 1: Solo "Nuevo" y "Usado" (seminuevo ya mapeado a usado en database.js)
    if (vehicle.tipo === 'nuevo') {
        return { class: 'badge-new', text: 'Nuevo' };
    } else {
        return { class: 'badge-used', text: 'Usado' };
    }
}

// Get all badges for a vehicle
function getVehicleBadges(vehicle) {
    const badges = [];

    // Badge de tipo (Nuevo, Usado) - FASE 1: Sin seminuevo
    if (vehicle.tipo === 'nuevo') {
        badges.push({ class: 'badge-nuevo', text: 'Nuevo' });
    } else {
        badges.push({ class: 'badge-usado', text: 'Usado' });
    }

    // Badge de destacado
    if (vehicle.destacado) {
        badges.push({ class: 'badge-destacado', text: 'Destacado' });
    }

    // FASE 1: Garantía eliminada (no ofrecemos aún)

    // Badge de oferta (si tiene descuento o campo especial)
    if (vehicle.oferta || vehicle.precioOferta) {
        badges.push({ class: 'badge-oferta', text: 'Oferta' });
    }

    return badges;
}

// Check if vehicle is in favorites - USA FAVORITES MANAGER
function isFavorite(vehicleId) {
    // Usar el FavoritesManager unificado
    if (typeof window.favoritesManager !== 'undefined') {
        return window.favoritesManager.has(vehicleId);
    }

    // Fallback si FavoritesManager no está cargado
    try {
        const favorites = JSON.parse(localStorage.getItem('altorra-favorites') || '[]');
        const normalizedId = String(vehicleId);
        const normalizedFavorites = favorites.map(id => String(id));
        return normalizedFavorites.includes(normalizedId);
    } catch (error) {
        console.error('Error checking favorite:', error);
        return false;
    }
}

// Check if vehicle is in comparator
function isInComparator(vehicleId) {
    if (typeof window.vehicleComparator !== 'undefined') {
        return window.vehicleComparator.has(vehicleId);
    }
    return false;
}

// Render single vehicle card
function renderVehicleCard(vehicle) {
    const badges = getVehicleBadges(vehicle);
    const favorite = isFavorite(vehicle.id);
    const heartIcon = favorite ? '♥' : '♡';
    const activeClass = favorite ? ' active' : '';

    // Check if in comparator
    const inComparator = isInComparator(vehicle.id);
    const compareActiveClass = inComparator ? ' active' : '';
    const compareIcon = inComparator
        ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>'
        : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>';

    // Generate badges HTML
    const badgesHTML = badges.map(badge =>
        `<span class="badge ${badge.class}">${badge.text}</span>`
    ).join('');

    return `
        <div class="vehicle-card clickable-card" data-id="${vehicle.id}" data-url="detalle-vehiculo.html?id=${vehicle.id}">
            <div class="vehicle-image">
                <img src="${vehicle.imagen}" alt="${vehicle.marca} ${vehicle.modelo}" loading="lazy" class="vehicle-img" data-fallback="multimedia/vehicles/placeholder-car.jpg">
                <div class="vehicle-actions">
                    <button class="favorite-btn${activeClass}" data-id="${vehicle.id}" aria-label="Añadir a favoritos">${heartIcon}</button>
                    <button class="btn-compare${compareActiveClass}" data-compare="${vehicle.id}" aria-label="Comparar vehículo" aria-pressed="${inComparator}">
                        <span class="compare-icon">${compareIcon}</span>
                    </button>
                </div>
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

// Centralized image error handling system
function handleImageError(img) {
    const fallback = img.getAttribute('data-fallback') || 'multimedia/vehicles/placeholder-car.jpg';
    if (img.src !== fallback) {
        img.src = fallback;
    }
}

// Attach image error listeners to all vehicle images
function attachImageErrorListeners() {
    const vehicleImages = document.querySelectorAll('.vehicle-img');
    vehicleImages.forEach(img => {
        // Remove any existing listeners to prevent duplicates
        img.removeEventListener('error', () => handleImageError(img));
        // Add new listener
        img.addEventListener('error', () => handleImageError(img));
    });
}

// Render multiple vehicles
function renderVehicles(vehicles, containerId, options = {}) {
    const { attachListeners = true } = options;
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

    // Attach listeners
    if (attachListeners) {
        attachFavoriteListeners();
        attachCardClickListeners();
        attachImageErrorListeners();
    } else {
        // Always attach image error listeners for reliability
        attachImageErrorListeners();
    }
}

// Attach click listeners to vehicle cards
function attachCardClickListeners() {
    const cards = document.querySelectorAll('.clickable-card');
    cards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
            // No navegar si se clickeó el botón de favoritos, comparar o el botón "Ver más"
            if (e.target.closest('.favorite-btn') || e.target.closest('.btn-view') || e.target.closest('.btn-compare')) {
                return;
            }
            const url = card.getAttribute('data-url');
            if (url) {
                window.location.href = url;
            }
        });
    });
}

// Attach event listeners to favorite buttons - USA FAVORITES MANAGER
function attachFavoriteListeners() {
    const favButtons = document.querySelectorAll('.favorite-btn');

    favButtons.forEach(button => {
        // Remover listeners previos para evitar duplicación
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);

        newButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const vehicleId = newButton.getAttribute('data-id');

            // Usar FavoritesManager para toggle
            if (typeof window.favoritesManager !== 'undefined') {
                const wasAdded = window.favoritesManager.toggle(vehicleId);

                // Actualizar botón con el nuevo estado
                window.favoritesManager.updateButtonState(newButton, vehicleId);

                // Animación de pulso solo al agregar
                if (wasAdded) {
                    newButton.style.transform = 'scale(1.3)';
                    setTimeout(() => {
                        newButton.style.transform = 'scale(1)';
                    }, 200);
                }

                // Los contadores se actualizan automáticamente vía evento
                // pero llamamos explícitamente por si acaso
                window.favoritesManager.updateAllCounters();

                // Mostrar notificación toast
                if (typeof toast !== 'undefined') {
                    const count = window.favoritesManager.count();
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
            } else {
                // Fallback al sistema antiguo si FavoritesManager no está disponible
                console.warn('FavoritesManager no disponible, usando sistema legacy');
                const wasAdded = toggleFavorite(vehicleId);

                if (wasAdded) {
                    newButton.textContent = '♥';
                    newButton.classList.add('active');
                } else {
                    newButton.textContent = '♡';
                    newButton.classList.remove('active');
                }

                if (typeof window.updateFavoritesCount === 'function') {
                    window.updateFavoritesCount();
                }
            }
        });
    });
}

// Toggle favorite - Retorna true si fue agregado, false si fue eliminado
function toggleFavorite(vehicleId) {
    try {
        let favorites = JSON.parse(localStorage.getItem('altorra-favorites') || '[]');

        // Normalizar TODO a strings para consistencia
        const normalizedId = String(vehicleId);
        const normalizedFavorites = favorites.map(id => String(id));

        const index = normalizedFavorites.indexOf(normalizedId);
        let wasAdded = false;

        if (index > -1) {
            // Eliminar de la posición encontrada
            normalizedFavorites.splice(index, 1);
            wasAdded = false;
        } else {
            // Agregar como string
            normalizedFavorites.push(normalizedId);
            wasAdded = true;
        }

        // Guardar array normalizado
        localStorage.setItem('altorra-favorites', JSON.stringify(normalizedFavorites));
        return wasAdded;
    } catch (error) {
        console.error('Error toggling favorite:', error);
        return false;
    }
}

// Note: updateFavoritesCount() is defined in components.js to avoid duplication

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
