// ============================================
// SISTEMA DE RESEÑAS Y TESTIMONIOS - ALTORRA CARS
// Reviews de clientes satisfechos
// ============================================

class ReviewsSystem {
    constructor() {
        // Reseñas estáticas (en producción vendrían de una API)
        this.reviews = [
            {
                id: 1,
                name: 'Carlos Mendoza',
                location: 'Cartagena',
                rating: 5,
                date: '2025-01-15',
                vehicle: 'Toyota Hilux 2024',
                title: 'Excelente experiencia de compra',
                text: 'Desde el primer momento me sentí muy bien atendido. El equipo de ALTORRA me ayudó a encontrar exactamente lo que buscaba. La Hilux estaba en perfectas condiciones y el proceso de financiamiento fue muy fácil.',
                avatar: 'CM',
                verified: true
            },
            {
                id: 2,
                name: 'María Fernanda López',
                location: 'Barranquilla',
                rating: 5,
                date: '2025-01-10',
                vehicle: 'Mazda CX-5 2023',
                title: 'Mi sueño hecho realidad',
                text: 'Siempre quise una CX-5 y gracias a ALTORRA lo logré. El precio fue muy competitivo y el vehículo estaba impecable. Los recomiendo 100%.',
                avatar: 'ML',
                verified: true
            },
            {
                id: 3,
                name: 'Roberto Jiménez',
                location: 'Santa Marta',
                rating: 5,
                date: '2025-01-05',
                vehicle: 'Chevrolet Tracker 2024',
                title: 'Servicio de primera',
                text: 'La atención fue personalizada y profesional. Me explicaron todo el proceso detalladamente y me dieron opciones de financiamiento muy flexibles. Muy satisfecho con mi Tracker.',
                avatar: 'RJ',
                verified: true
            },
            {
                id: 4,
                name: 'Ana Patricia Ruiz',
                location: 'Cartagena',
                rating: 4,
                date: '2024-12-28',
                vehicle: 'Kia Sportage 2023',
                title: 'Buena compra, buen servicio',
                text: 'El proceso fue más rápido de lo que esperaba. El vehículo llegó en excelentes condiciones. Lo único que mejoraría es el tiempo de entrega de los documentos.',
                avatar: 'AR',
                verified: true
            },
            {
                id: 5,
                name: 'Pedro Castillo',
                location: 'Sincelejo',
                rating: 5,
                date: '2024-12-20',
                vehicle: 'Ford Ranger 2024',
                title: 'La mejor decisión',
                text: 'Comparé precios en varios concesionarios y definitivamente ALTORRA tenía la mejor oferta. El equipo fue muy honesto y transparente en todo momento. Mi Ranger es una máquina.',
                avatar: 'PC',
                verified: true
            },
            {
                id: 6,
                name: 'Laura Martínez',
                location: 'Montería',
                rating: 5,
                date: '2024-12-15',
                vehicle: 'Hyundai Tucson 2024',
                title: 'Totalmente recomendados',
                text: 'Primera vez comprando un carro y el equipo de ALTORRA me guió en todo el proceso. Me sentí muy segura y confiada. Mi Tucson es hermosa y funciona perfectamente.',
                avatar: 'LM',
                verified: true
            }
        ];
        this.init();
    }

    init() {
        this.calculateStats();
    }

    // ===== ESTADÍSTICAS =====
    calculateStats() {
        const total = this.reviews.length;
        const sum = this.reviews.reduce((acc, r) => acc + r.rating, 0);
        this.stats = {
            total: total,
            average: (sum / total).toFixed(1),
            ratings: {
                5: this.reviews.filter(r => r.rating === 5).length,
                4: this.reviews.filter(r => r.rating === 4).length,
                3: this.reviews.filter(r => r.rating === 3).length,
                2: this.reviews.filter(r => r.rating === 2).length,
                1: this.reviews.filter(r => r.rating === 1).length
            }
        };
    }

    getStats() {
        return this.stats;
    }

    getAllReviews() {
        return this.reviews;
    }

    getRecentReviews(limit = 3) {
        return [...this.reviews]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, limit);
    }

    // ===== RENDERIZADO =====
    renderStars(rating, size = 'small') {
        const sizeClass = size === 'large' ? 'star-large' : '';
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars += `<svg class="star filled ${sizeClass}" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/></svg>`;
            } else {
                stars += `<svg class="star ${sizeClass}" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="none" stroke="currentColor" stroke-width="2"/></svg>`;
            }
        }
        return stars;
    }

    formatDate(dateStr) {
        const date = new Date(dateStr);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('es-CO', options);
    }

    // ===== SECCIÓN DE TESTIMONIOS (Homepage) =====
    renderTestimonialsSection(containerId, options = {}) {
        const { limit = 3 } = options;
        const container = document.getElementById(containerId);
        if (!container) return;

        const reviews = this.getRecentReviews(limit);
        const stats = this.getStats();

        container.innerHTML = `
            <section class="testimonials-section">
                <div class="container">
                    <div class="testimonials-header">
                        <div class="testimonials-title-area">
                            <h2 class="testimonials-title">Lo que dicen nuestros <span class="highlight">Clientes</span></h2>
                            <p class="testimonials-subtitle">Más de ${stats.total} clientes satisfechos confían en nosotros</p>
                        </div>
                        <div class="testimonials-summary">
                            <div class="summary-rating">
                                <span class="rating-number">${stats.average}</span>
                                <div class="rating-stars">${this.renderStars(Math.round(stats.average), 'large')}</div>
                                <span class="rating-count">${stats.total} reseñas</span>
                            </div>
                        </div>
                    </div>

                    <div class="testimonials-grid">
                        ${reviews.map(review => this.renderTestimonialCard(review)).join('')}
                    </div>

                    <div class="testimonials-cta">
                        <a href="resenas.html" class="btn-view-all-reviews">
                            Ver todas las reseñas
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </section>
        `;
    }

    renderTestimonialCard(review) {
        return `
            <div class="testimonial-card">
                <div class="testimonial-header">
                    <div class="testimonial-avatar" style="background: linear-gradient(135deg, #b89658, #916652);">
                        ${review.avatar}
                    </div>
                    <div class="testimonial-info">
                        <h4 class="testimonial-name">
                            ${review.name}
                            ${review.verified ? '<svg class="verified-badge" width="14" height="14" viewBox="0 0 24 24" fill="#10b981"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>' : ''}
                        </h4>
                        <span class="testimonial-location">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                <circle cx="12" cy="10" r="3"/>
                            </svg>
                            ${review.location}
                        </span>
                    </div>
                    <div class="testimonial-rating">
                        ${this.renderStars(review.rating)}
                    </div>
                </div>

                <div class="testimonial-content">
                    <h5 class="testimonial-title">"${review.title}"</h5>
                    <p class="testimonial-text">${review.text}</p>
                </div>
            </div>
        `;
    }

    // ===== PÁGINA COMPLETA DE RESEÑAS =====
    renderFullReviewsPage(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const stats = this.getStats();
        const reviews = this.getAllReviews();

        container.innerHTML = `
            <div class="reviews-page">
                <!-- Resumen de calificaciones -->
                <div class="reviews-summary-card">
                    <div class="summary-left">
                        <div class="summary-big-rating">
                            <span class="big-number">${stats.average}</span>
                            <div class="big-stars">${this.renderStars(Math.round(stats.average), 'large')}</div>
                        </div>
                        <p class="summary-text">Basado en ${stats.total} reseñas verificadas</p>
                    </div>
                    <div class="summary-right">
                        ${[5, 4, 3, 2, 1].map(rating => {
                            const count = stats.ratings[rating];
                            const percentage = (count / stats.total * 100).toFixed(0);
                            return `
                                <div class="rating-bar">
                                    <span class="rating-label">${rating}</span>
                                    <svg class="star-mini filled" viewBox="0 0 24 24" width="12" height="12">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
                                    </svg>
                                    <div class="bar-track">
                                        <div class="bar-fill" style="width: ${percentage}%"></div>
                                    </div>
                                    <span class="rating-percent">${percentage}%</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <!-- Lista de reseñas -->
                <div class="reviews-list">
                    ${reviews.map(review => this.renderFullReviewCard(review)).join('')}
                </div>
            </div>
        `;
    }

    renderFullReviewCard(review) {
        return `
            <div class="review-card-full">
                <div class="review-card-header">
                    <div class="review-author">
                        <div class="review-avatar" style="background: linear-gradient(135deg, #b89658, #916652);">
                            ${review.avatar}
                        </div>
                        <div class="review-author-info">
                            <h4 class="review-author-name">
                                ${review.name}
                                ${review.verified ? '<span class="verified-tag"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> Compra verificada</span>' : ''}
                            </h4>
                            <span class="review-author-location">${review.location}</span>
                        </div>
                    </div>
                    <div class="review-meta">
                        <div class="review-rating">${this.renderStars(review.rating)}</div>
                        <span class="review-date">${this.formatDate(review.date)}</span>
                    </div>
                </div>

                <div class="review-vehicle-tag">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>
                        <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>
                        <path d="M5 17h-2v-6l2-5h9l4 5h1a2 2 0 0 1 2 2v4h-2"/>
                        <path d="M9 17h6"/>
                    </svg>
                    ${review.vehicle}
                </div>

                <div class="review-content">
                    <h3 class="review-title">${review.title}</h3>
                    <p class="review-text">${review.text}</p>
                </div>
            </div>
        `;
    }

    // ===== WIDGET FLOTANTE DE CALIFICACIÓN =====
    createRatingBadge() {
        if (document.getElementById('rating-badge')) return;

        const stats = this.getStats();
        const badge = document.createElement('div');
        badge.id = 'rating-badge';
        badge.className = 'rating-badge';
        badge.innerHTML = `
            <a href="resenas.html" class="rating-badge-link">
                <div class="badge-content">
                    <span class="badge-rating">${stats.average}</span>
                    <div class="badge-stars">${this.renderStars(Math.round(stats.average))}</div>
                    <span class="badge-count">${stats.total} reseñas</span>
                </div>
            </a>
        `;

        document.body.appendChild(badge);
    }
}

// Crear instancia global
const reviewsSystem = new ReviewsSystem();

// Disponible globalmente
if (typeof window !== 'undefined') {
    window.reviewsSystem = reviewsSystem;
}
