// ============================================
// SISTEMA DE CITAS ONLINE - ALTORRA CARS
// Agenda visitas presenciales para ver vehículos
// ============================================

class AppointmentSystem {
    constructor() {
        this.whatsappNumber = '573235016747';
        this.availableSlots = this.generateTimeSlots();
        this.init();
    }

    init() {
        this.createAppointmentButton();
        this.attachEventListeners();
    }

    // ===== GENERAR HORARIOS DISPONIBLES =====
    generateTimeSlots() {
        const slots = [];
        // Lunes a Viernes: 8:00 - 18:00
        for (let hour = 8; hour < 18; hour++) {
            slots.push(`${hour.toString().padStart(2, '0')}:00`);
            if (hour < 17) {
                slots.push(`${hour.toString().padStart(2, '0')}:30`);
            }
        }
        return slots;
    }

    // ===== GENERAR FECHAS DISPONIBLES =====
    getAvailableDates() {
        const dates = [];
        const today = new Date();

        // Próximos 14 días laborales
        let count = 0;
        let current = new Date(today);
        current.setDate(current.getDate() + 1); // Desde mañana

        while (count < 14) {
            const dayOfWeek = current.getDay();
            // Excluir domingos (0)
            if (dayOfWeek !== 0) {
                dates.push(new Date(current));
                count++;
            }
            current.setDate(current.getDate() + 1);
        }

        return dates;
    }

    formatDate(date) {
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('es-CO', options);
    }

    formatDateISO(date) {
        return date.toISOString().split('T')[0];
    }

    // ===== CREAR BOTÓN FLOTANTE =====
    createAppointmentButton() {
        // Ya no crear boton flotante - ahora esta integrado en los botones de contacto
        // de la pagina detalle-vehiculo.html
        return;
    }

    // ===== CREAR MODAL =====
    createModal(vehicleInfo = {}) {
        // Remover modal existente si hay
        const existing = document.getElementById('appointment-modal');
        if (existing) existing.remove();

        const dates = this.getAvailableDates();
        const modal = document.createElement('div');
        modal.id = 'appointment-modal';
        modal.className = 'appointment-modal-overlay';

        modal.innerHTML = `
            <div class="appointment-modal">
                <div class="appointment-modal-header">
                    <h2 class="appointment-modal-title">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                            <line x1="16" y1="2" x2="16" y2="6"/>
                            <line x1="8" y1="2" x2="8" y2="6"/>
                            <line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        Agendar Visita Presencial
                    </h2>
                    <p class="appointment-modal-subtitle">Selecciona fecha y hora para ver el vehículo</p>
                    <button type="button" class="appointment-modal-close" aria-label="Cerrar">&times;</button>
                </div>

                <div class="appointment-modal-body">
                    ${vehicleInfo.marca ? `
                        <div class="appointment-vehicle-info">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>
                                <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>
                                <path d="M5 17h-2v-6l2-5h9l4 5h1a2 2 0 0 1 2 2v4h-2"/>
                                <path d="M9 17h6"/>
                            </svg>
                            <span>${vehicleInfo.marca} ${vehicleInfo.modelo} ${vehicleInfo.year || ''}</span>
                        </div>
                    ` : ''}

                    <form id="appointmentForm" class="appointment-form">
                        <div class="form-section">
                            <label class="form-section-label">Tus datos</label>

                            <div class="appointment-form-group">
                                <label class="form-label required">Nombre completo</label>
                                <input type="text" name="nombre" class="form-input" required placeholder="Ej: Juan Pérez">
                            </div>

                            <div class="appointment-form-row">
                                <div class="appointment-form-group">
                                    <label class="form-label required">Teléfono</label>
                                    <input type="tel" name="telefono" class="form-input" required placeholder="3001234567">
                                </div>
                                <div class="appointment-form-group">
                                    <label class="form-label">Email</label>
                                    <input type="email" name="email" class="form-input" placeholder="correo@ejemplo.com">
                                </div>
                            </div>
                        </div>

                        <div class="form-section">
                            <label class="form-section-label">Selecciona la fecha</label>
                            <div class="date-selector">
                                ${dates.map((date, index) => `
                                    <label class="date-option">
                                        <input type="radio" name="fecha" value="${this.formatDateISO(date)}" ${index === 0 ? 'checked' : ''}>
                                        <span class="date-option-content">
                                            <span class="date-day">${date.toLocaleDateString('es-CO', { weekday: 'short' })}</span>
                                            <span class="date-number">${date.getDate()}</span>
                                            <span class="date-month">${date.toLocaleDateString('es-CO', { month: 'short' })}</span>
                                        </span>
                                    </label>
                                `).join('')}
                            </div>
                        </div>

                        <div class="form-section">
                            <label class="form-section-label">Selecciona la hora</label>
                            <div class="time-selector">
                                ${this.availableSlots.map((slot, index) => `
                                    <label class="time-option">
                                        <input type="radio" name="hora" value="${slot}" ${index === 2 ? 'checked' : ''}>
                                        <span class="time-option-content">${slot}</span>
                                    </label>
                                `).join('')}
                            </div>
                        </div>

                        <div class="form-section">
                            <label class="form-section-label">Comentarios (opcional)</label>
                            <textarea name="comentarios" class="form-textarea" rows="2" placeholder="¿Alguna solicitud especial?"></textarea>
                        </div>

                        <div style="padding:10px 14px;background:#f0fdf4;border:1px solid #86efac;border-radius:8px;font-size:12px;color:#166534;line-height:1.5;">
                            Al confirmar esta cita, acepto que ALTORRA CARS me contacte por WhatsApp o telefono para gestionar mi visita presencial.
                        </div>

                        <button type="submit" class="btn-submit-appointment">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                            </svg>
                            Confirmar Cita por WhatsApp
                        </button>
                    </form>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.attachModalEvents(modal, vehicleInfo);

        // Animar entrada
        requestAnimationFrame(() => {
            modal.classList.add('active');
        });
    }

    // ===== EVENTOS DEL MODAL =====
    attachModalEvents(modal, vehicleInfo) {
        const closeBtn = modal.querySelector('.appointment-modal-close');
        const form = modal.querySelector('#appointmentForm');

        // Cerrar modal
        closeBtn.addEventListener('click', () => this.closeModal(modal));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeModal(modal);
        });

        // Escape para cerrar
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                this.closeModal(modal);
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);

        // Submit del formulario
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitAppointment(form, vehicleInfo);
        });
    }

    closeModal(modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    }

    // ===== ENVIAR CITA =====
    submitAppointment(form, vehicleInfo) {
        const formData = new FormData(form);

        const nombre = formData.get('nombre');
        const telefono = formData.get('telefono');
        const email = formData.get('email') || 'No proporcionado';
        const fecha = formData.get('fecha');
        const hora = formData.get('hora');
        const comentarios = formData.get('comentarios') || 'Ninguno';

        // Formatear fecha legible
        const fechaObj = new Date(fecha + 'T12:00:00');
        const fechaFormateada = fechaObj.toLocaleDateString('es-CO', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Save to Firestore (public can create)
        this.saveAppointmentToFirestore({
            nombre: nombre,
            telefono: telefono,
            email: email,
            fecha: fecha,
            hora: hora,
            comentarios: comentarios,
            vehiculo: vehicleInfo.marca ? (vehicleInfo.marca + ' ' + vehicleInfo.modelo + ' ' + (vehicleInfo.year || '')) : '',
            vehiculoPrecio: vehicleInfo.precio || 0,
            estado: 'pendiente',
            createdAt: new Date().toISOString()
        });

        // Construir mensaje
        let message = `*SOLICITUD DE CITA - ALTORRA CARS*\n\n`;
        message += `*Datos del cliente:*\n`;
        message += `- Nombre: ${nombre}\n`;
        message += `- Telefono: ${telefono}\n`;
        message += `- Email: ${email}\n\n`;

        if (vehicleInfo.marca) {
            message += `*Vehiculo de interes:*\n`;
            message += `- ${vehicleInfo.marca} ${vehicleInfo.modelo} ${vehicleInfo.year || ''}\n`;
            if (vehicleInfo.precio) {
                message += `- Precio: $${vehicleInfo.precio.toLocaleString('es-CO')}\n`;
            }
            message += `\n`;
        }

        message += `*Cita solicitada:*\n`;
        message += `- Fecha: ${fechaFormateada}\n`;
        message += `- Hora: ${hora}\n\n`;
        message += `*Comentarios:* ${comentarios}\n\n`;
        message += `_Al confirmar esta cita por WhatsApp, acepto que ALTORRA CARS me contacte para gestionar mi visita._`;

        // Abrir WhatsApp
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${this.whatsappNumber}?text=${encodedMessage}`;
        window.open(whatsappURL, '_blank');

        // Cerrar modal
        const modal = document.getElementById('appointment-modal');
        if (modal) this.closeModal(modal);
    }

    // ===== GUARDAR CITA EN FIRESTORE =====
    saveAppointmentToFirestore(data) {
        try {
            if (window.db) {
                window.db.collection('citas').add(data).catch(function(err) {
                    console.warn('[Citas] Error al guardar cita:', err);
                });
            }
        } catch (e) {
            console.warn('[Citas] Firestore no disponible');
        }
    }

    // ===== EVENT LISTENERS GLOBALES =====
    attachEventListeners() {
        document.addEventListener('click', (e) => {
            // Botón flotante de agendar
            if (e.target.closest('#btn-agendar-cita')) {
                const vehicleInfo = this.getVehicleInfoFromPage();
                this.createModal(vehicleInfo);
            }

            // También detectar botones con clase específica
            if (e.target.closest('.btn-agendar-cita')) {
                const btn = e.target.closest('.btn-agendar-cita');
                const vehicleInfo = {
                    marca: btn.dataset.marca || '',
                    modelo: btn.dataset.modelo || '',
                    year: btn.dataset.year || '',
                    precio: parseInt(btn.dataset.precio) || 0
                };
                this.createModal(vehicleInfo);
            }
        });
    }

    // ===== OBTENER INFO DEL VEHÍCULO DE LA PÁGINA =====
    getVehicleInfoFromPage() {
        const info = {};

        // Intentar obtener de la página de detalle
        const title = document.querySelector('.vehicle-title, h1');
        if (title) {
            const parts = title.textContent.trim().split(' ');
            if (parts.length >= 2) {
                info.marca = parts[0];
                info.modelo = parts.slice(1, -1).join(' ') || parts[1];
                const lastPart = parts[parts.length - 1];
                if (/^\d{4}$/.test(lastPart)) {
                    info.year = lastPart;
                }
            }
        }

        // Intentar obtener precio
        const priceEl = document.querySelector('.vehicle-price, .price');
        if (priceEl) {
            const priceText = priceEl.textContent.replace(/[^0-9]/g, '');
            info.precio = parseInt(priceText) || 0;
        }

        return info;
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    window.appointmentSystem = new AppointmentSystem();
});
