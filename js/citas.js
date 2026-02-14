// ============================================
// SISTEMA DE CITAS ONLINE - ALTORRA CARS
// Agenda visitas presenciales para ver vehiculos
// Con calendario de disponibilidad real desde Firestore
// ============================================

class AppointmentSystem {
    constructor() {
        this.whatsappNumber = '573235016747';
        this.availableSlots = [];
        this.availConfig = null;
        this.blockedDates = [];
        this.availDays = [1, 2, 3, 4, 5]; // default Mon-Fri
        this.startHour = 8;
        this.endHour = 18;
        this.interval = 30;
        this.currentMonth = new Date().getMonth();
        this.currentYear = new Date().getFullYear();
        this.selectedDate = null;
        this.init();
    }

    init() {
        this.loadAvailabilityConfig();
        this.attachEventListeners();
    }

    // ===== LOAD AVAILABILITY FROM FIRESTORE =====
    async loadAvailabilityConfig() {
        try {
            if (window.firebaseReady) await window.firebaseReady;
            if (!window.db) return;
            var doc = await window.db.collection('config').doc('availability').get();
            if (doc.exists) {
                var data = doc.data();
                this.startHour = data.startHour || 8;
                this.endHour = data.endHour || 18;
                this.interval = data.interval || 30;
                this.availDays = data.days || [1, 2, 3, 4, 5];
                this.blockedDates = data.blockedDates || [];
            }
        } catch (e) {
            console.warn('[Citas] Could not load availability:', e);
        }
        this.availableSlots = this.generateTimeSlots();
    }

    // ===== GENERAR HORARIOS DISPONIBLES =====
    generateTimeSlots() {
        var slots = [];
        for (var hour = this.startHour; hour < this.endHour; hour++) {
            slots.push(hour.toString().padStart(2, '0') + ':00');
            if (this.interval === 30 && hour < this.endHour - 1) {
                slots.push(hour.toString().padStart(2, '0') + ':30');
            }
        }
        return slots;
    }

    // ===== CHECK IF DATE IS AVAILABLE =====
    isDateAvailable(date) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        if (date <= today) return false;
        var dayOfWeek = date.getDay();
        if (this.availDays.indexOf(dayOfWeek) === -1) return false;
        var dateStr = date.toISOString().split('T')[0];
        if (this.blockedDates.indexOf(dateStr) !== -1) return false;
        return true;
    }

    // ===== GET AVAILABLE DATES FOR A MONTH =====
    getAvailableDatesForMonth(year, month) {
        var dates = [];
        var daysInMonth = new Date(year, month + 1, 0).getDate();
        for (var day = 1; day <= daysInMonth; day++) {
            var date = new Date(year, month, day);
            if (this.isDateAvailable(date)) {
                dates.push(date);
            }
        }
        return dates;
    }

    formatDate(date) {
        return date.toLocaleDateString('es-CO', { weekday: 'short', month: 'short', day: 'numeric' });
    }

    formatDateISO(date) {
        return date.toISOString().split('T')[0];
    }

    // ===== CREAR BOTON FLOTANTE =====
    createAppointmentButton() {
        return;
    }

    // ===== BUILD CALENDAR HTML =====
    buildCalendarHTML(year, month) {
        var monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        var dayHeaders = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
        var firstDay = new Date(year, month, 1).getDay();
        var daysInMonth = new Date(year, month + 1, 0).getDate();
        var today = new Date();
        today.setHours(0, 0, 0, 0);

        var html = '<div class="appointment-calendar-nav">';
        html += '<button type="button" class="cal-nav-btn" data-action="prev">&larr;</button>';
        html += '<span class="cal-month-label">' + monthNames[month] + ' ' + year + '</span>';
        html += '<button type="button" class="cal-nav-btn" data-action="next">&rarr;</button>';
        html += '</div>';

        html += '<div class="appointment-calendar-grid">';
        dayHeaders.forEach(function(d) {
            html += '<div class="cal-header">' + d + '</div>';
        });

        for (var i = 0; i < firstDay; i++) {
            html += '<div class="cal-empty"></div>';
        }

        for (var day = 1; day <= daysInMonth; day++) {
            var date = new Date(year, month, day);
            var dateStr = this.formatDateISO(date);
            var available = this.isDateAvailable(date);
            var isPast = date <= today;
            var isSelected = this.selectedDate === dateStr;

            var cls = 'cal-day';
            if (isPast) cls += ' cal-past';
            else if (!available) cls += ' cal-unavailable';
            else cls += ' cal-available';
            if (isSelected) cls += ' cal-selected';

            html += '<div class="' + cls + '" data-date="' + dateStr + '"' +
                (available && !isPast ? ' role="button" tabindex="0"' : '') + '>' + day + '</div>';
        }
        html += '</div>';

        return html;
    }

    // ===== CREAR MODAL =====
    createModal(vehicleInfo = {}) {
        var existing = document.getElementById('appointment-modal');
        if (existing) existing.remove();

        var self = this;
        var modal = document.createElement('div');
        modal.id = 'appointment-modal';
        modal.className = 'appointment-modal-overlay';

        modal.innerHTML = '\
            <div class="appointment-modal">\
                <div class="appointment-modal-header">\
                    <h2 class="appointment-modal-title">\
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>\
                            <line x1="16" y1="2" x2="16" y2="6"/>\
                            <line x1="8" y1="2" x2="8" y2="6"/>\
                            <line x1="3" y1="10" x2="21" y2="10"/>\
                        </svg>\
                        Agendar Visita Presencial\
                    </h2>\
                    <p class="appointment-modal-subtitle">Selecciona un dia disponible en el calendario</p>\
                    <button type="button" class="appointment-modal-close" aria-label="Cerrar">&times;</button>\
                </div>\
                <div class="appointment-modal-body">' +
                    (vehicleInfo.marca ? '\
                        <div class="appointment-vehicle-info">\
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\
                                <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>\
                                <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>\
                                <path d="M5 17h-2v-6l2-5h9l4 5h1a2 2 0 0 1 2 2v4h-2"/>\
                                <path d="M9 17h6"/>\
                            </svg>\
                            <span>' + vehicleInfo.marca + ' ' + vehicleInfo.modelo + ' ' + (vehicleInfo.year || '') + '</span>\
                        </div>' : '') + '\
                    <form id="appointmentForm" class="appointment-form">\
                        <div class="form-section">\
                            <label class="form-section-label">Tus datos</label>\
                            <div class="appointment-form-group">\
                                <label class="form-label required">Nombre completo</label>\
                                <input type="text" name="nombre" class="form-input" required placeholder="Ej: Juan Perez">\
                            </div>\
                            <div class="appointment-form-row">\
                                <div class="appointment-form-group">\
                                    <label class="form-label required">Telefono</label>\
                                    <input type="tel" name="telefono" class="form-input" required placeholder="3001234567">\
                                </div>\
                                <div class="appointment-form-group">\
                                    <label class="form-label">Email</label>\
                                    <input type="email" name="email" class="form-input" placeholder="correo@ejemplo.com">\
                                </div>\
                            </div>\
                        </div>\
                        <div class="form-section">\
                            <label class="form-section-label">Selecciona la fecha</label>\
                            <div id="appointmentCalendar">' + this.buildCalendarHTML(this.currentYear, this.currentMonth) + '</div>\
                            <input type="hidden" name="fecha" id="selectedDateInput" required>\
                            <div id="selectedDateLabel" class="selected-date-label" style="display:none;"></div>\
                        </div>\
                        <div class="form-section" id="timeSlotSection" style="display:none;">\
                            <label class="form-section-label">Selecciona la hora</label>\
                            <div class="time-selector" id="timeSlotsContainer"></div>\
                        </div>\
                        <div class="form-section">\
                            <label class="form-section-label">Comentarios (opcional)</label>\
                            <textarea name="comentarios" class="form-textarea" rows="2" placeholder="Alguna solicitud especial?"></textarea>\
                        </div>\
                        <div style="padding:10px 14px;background:#f0fdf4;border:1px solid #86efac;border-radius:8px;font-size:12px;color:#166534;line-height:1.5;">\
                            Al confirmar esta cita, acepto que ALTORRA CARS me contacte por WhatsApp o telefono para gestionar mi visita presencial.\
                        </div>\
                        <button type="submit" class="btn-submit-appointment">\
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">\
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>\
                            </svg>\
                            Confirmar Cita por WhatsApp\
                        </button>\
                    </form>\
                </div>\
            </div>';

        document.body.appendChild(modal);
        this.attachModalEvents(modal, vehicleInfo);

        requestAnimationFrame(function() {
            modal.classList.add('active');
        });
    }

    // ===== EVENTOS DEL MODAL =====
    attachModalEvents(modal, vehicleInfo) {
        var self = this;
        var closeBtn = modal.querySelector('.appointment-modal-close');
        var form = modal.querySelector('#appointmentForm');
        var calContainer = modal.querySelector('#appointmentCalendar');

        closeBtn.addEventListener('click', function() { self.closeModal(modal); });
        modal.addEventListener('click', function(e) {
            if (e.target === modal) self.closeModal(modal);
        });

        var escHandler = function(e) {
            if (e.key === 'Escape') {
                self.closeModal(modal);
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);

        // Calendar navigation and date selection
        calContainer.addEventListener('click', function(e) {
            var navBtn = e.target.closest('.cal-nav-btn');
            if (navBtn) {
                var action = navBtn.dataset.action;
                if (action === 'prev') {
                    self.currentMonth--;
                    if (self.currentMonth < 0) { self.currentMonth = 11; self.currentYear--; }
                } else {
                    self.currentMonth++;
                    if (self.currentMonth > 11) { self.currentMonth = 0; self.currentYear++; }
                }
                calContainer.innerHTML = self.buildCalendarHTML(self.currentYear, self.currentMonth);
                return;
            }

            var dayEl = e.target.closest('.cal-available');
            if (dayEl) {
                self.selectedDate = dayEl.dataset.date;
                modal.querySelector('#selectedDateInput').value = self.selectedDate;

                // Update calendar to show selection
                calContainer.innerHTML = self.buildCalendarHTML(self.currentYear, self.currentMonth);

                // Show selected date label
                var dateObj = new Date(self.selectedDate + 'T12:00:00');
                var dateLabel = modal.querySelector('#selectedDateLabel');
                dateLabel.textContent = 'Fecha seleccionada: ' + dateObj.toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                dateLabel.style.display = 'block';

                // Show time slots
                self.showTimeSlots(modal);
            }
        });

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (!self.selectedDate) {
                alert('Por favor selecciona una fecha disponible en el calendario.');
                return;
            }
            self.submitAppointment(form, vehicleInfo);
        });
    }

    showTimeSlots(modal) {
        var container = modal.querySelector('#timeSlotsContainer');
        var section = modal.querySelector('#timeSlotSection');
        if (!container || !section) return;

        section.style.display = '';
        container.innerHTML = this.availableSlots.map(function(slot, index) {
            return '<label class="time-option">' +
                '<input type="radio" name="hora" value="' + slot + '"' + (index === 0 ? ' checked' : '') + '>' +
                '<span class="time-option-content">' + slot + '</span>' +
            '</label>';
        }).join('');
    }

    closeModal(modal) {
        modal.classList.remove('active');
        setTimeout(function() { modal.remove(); }, 300);
    }

    // ===== ENVIAR CITA =====
    submitAppointment(form, vehicleInfo) {
        var formData = new FormData(form);

        var nombre = formData.get('nombre');
        var telefono = formData.get('telefono');
        var email = formData.get('email') || 'No proporcionado';
        var fecha = formData.get('fecha');
        var hora = formData.get('hora');
        var comentarios = formData.get('comentarios') || 'Ninguno';

        var fechaObj = new Date(fecha + 'T12:00:00');
        var fechaFormateada = fechaObj.toLocaleDateString('es-CO', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Save to Firestore with full contact info
        this.saveAppointmentToFirestore({
            nombre: nombre,
            telefono: telefono,
            email: email,
            fecha: fecha,
            hora: hora,
            comentarios: comentarios,
            vehiculo: vehicleInfo.marca ? (vehicleInfo.marca + ' ' + vehicleInfo.modelo + ' ' + (vehicleInfo.year || '')) : '',
            vehiculoId: vehicleInfo.id || '',
            vehiculoPrecio: vehicleInfo.precio || 0,
            estado: 'pendiente',
            observaciones: '',
            createdAt: new Date().toISOString()
        });

        // Build WhatsApp message
        var message = '*SOLICITUD DE CITA - ALTORRA CARS*\n\n';
        message += '*Datos del cliente:*\n';
        message += '- Nombre: ' + nombre + '\n';
        message += '- Telefono: ' + telefono + '\n';
        message += '- Email: ' + email + '\n\n';

        if (vehicleInfo.marca) {
            message += '*Vehiculo de interes:*\n';
            message += '- ' + vehicleInfo.marca + ' ' + vehicleInfo.modelo + ' ' + (vehicleInfo.year || '') + '\n';
            if (vehicleInfo.precio) {
                message += '- Precio: $' + vehicleInfo.precio.toLocaleString('es-CO') + '\n';
            }
            message += '\n';
        }

        message += '*Cita solicitada:*\n';
        message += '- Fecha: ' + fechaFormateada + '\n';
        message += '- Hora: ' + hora + '\n\n';
        message += '*Comentarios:* ' + comentarios + '\n\n';
        message += '_Al confirmar esta cita por WhatsApp, acepto que ALTORRA CARS me contacte para gestionar mi visita._';

        var encodedMessage = encodeURIComponent(message);
        var whatsappURL = 'https://wa.me/' + this.whatsappNumber + '?text=' + encodedMessage;
        window.open(whatsappURL, '_blank');

        var modal = document.getElementById('appointment-modal');
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
        var self = this;
        document.addEventListener('click', function(e) {
            if (e.target.closest('#btn-agendar-cita')) {
                var vehicleInfo = self.getVehicleInfoFromPage();
                self.createModal(vehicleInfo);
            }

            if (e.target.closest('.btn-agendar-cita')) {
                var btn = e.target.closest('.btn-agendar-cita');
                var vehicleInfo = {
                    marca: btn.dataset.marca || '',
                    modelo: btn.dataset.modelo || '',
                    year: btn.dataset.year || '',
                    precio: parseInt(btn.dataset.precio) || 0,
                    id: btn.dataset.id || ''
                };
                self.createModal(vehicleInfo);
            }
        });
    }

    // ===== OBTENER INFO DEL VEHICULO DE LA PAGINA =====
    getVehicleInfoFromPage() {
        var info = {};

        var title = document.querySelector('.vehicle-title, h1');
        if (title) {
            var parts = title.textContent.trim().split(' ');
            if (parts.length >= 2) {
                info.marca = parts[0];
                info.modelo = parts.slice(1, -1).join(' ') || parts[1];
                var lastPart = parts[parts.length - 1];
                if (/^\d{4}$/.test(lastPart)) {
                    info.year = lastPart;
                }
            }
        }

        var priceEl = document.querySelector('.vehicle-price, .price');
        if (priceEl) {
            var priceText = priceEl.textContent.replace(/[^0-9]/g, '');
            info.precio = parseInt(priceText) || 0;
        }

        return info;
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    window.appointmentSystem = new AppointmentSystem();
});
