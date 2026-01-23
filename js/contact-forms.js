// Contact Forms Manager - ALTORRA CARS
// Maneja formularios flotantes para "Vende tu Auto" y "Financiación"

class ContactFormManager {
    constructor() {
        this.whatsappNumber = '573235016747';
        this.activeElement = null; // Para guardar el elemento activo antes de abrir modal
        this.init();
    }

    init() {
        this.attachEventListeners();
    }

    attachEventListeners() {
        // Abrir modal de "Vende tu Auto"
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-modal="vende-auto"]')) {
                e.preventDefault();
                this.openModal('vende-auto');
            }
        });

        // Abrir modal de "Financiación"
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-modal="financiacion"]')) {
                e.preventDefault();
                this.openModal('financiacion');
            }
        });

        // Cerrar modales
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay') ||
                e.target.closest('.modal-close')) {
                this.closeAllModals();
            }
        });

        // Cerrar con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });

        // Manejar envío de formularios
        document.addEventListener('submit', (e) => {
            if (e.target.matches('#vendeAutoForm')) {
                e.preventDefault();
                this.handleVendeAutoSubmit(e.target);
            }
            if (e.target.matches('#financiacionForm')) {
                e.preventDefault();
                this.handleFinanciacionSubmit(e.target);
            }
        });
    }

    openModal(modalId) {
        const modal = document.getElementById(`${modalId}-modal`);
        if (modal) {
            // Guardar el elemento activo para restaurar el focus después
            this.activeElement = document.activeElement;

            // Agregar ARIA attributes
            modal.setAttribute('role', 'dialog');
            modal.setAttribute('aria-modal', 'true');
            modal.setAttribute('aria-labelledby', `${modalId}-title`);

            // Abrir modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Focus trap: enfocar el primer input del formulario
            setTimeout(() => {
                const firstInput = modal.querySelector('input:not([type="hidden"]), textarea, select');
                if (firstInput) {
                    firstInput.focus();
                }
            }, 100);

            // Manejar Tab key para focus trap
            this.trapFocus(modal);
        }
    }

    closeAllModals() {
        const modals = document.querySelectorAll('.modal-overlay');
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';

        // Restaurar focus al elemento que abrió el modal
        if (this.activeElement) {
            this.activeElement.focus();
            this.activeElement = null;
        }
    }

    trapFocus(modal) {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        const handleTab = (e) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                // Tab
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        };

        modal.addEventListener('keydown', handleTab);

        // Remover listener cuando se cierra el modal
        const removeListener = () => {
            modal.removeEventListener('keydown', handleTab);
        };

        // Guardar referencia para limpiar después
        modal.removeTabListener = removeListener;
    }

    handleVendeAutoSubmit(form) {
        const formData = new FormData(form);

        const nombre = formData.get('nombre');
        const telefono = formData.get('telefono');
        const email = formData.get('email');
        const marca = formData.get('marca');
        const modelo = formData.get('modelo');
        const year = formData.get('year');
        const kilometraje = formData.get('kilometraje');
        const precio = formData.get('precio');
        const comentarios = formData.get('comentarios');

        // Construir mensaje de WhatsApp
        const mensaje = `🚗 *VENTA DE VEHÍCULO*

📋 *Información del Cliente*:
- Nombre: ${nombre}
- Teléfono: ${telefono}
- Email: ${email}

🚙 *Información del Vehículo*:
- Marca: ${marca}
- Modelo: ${modelo}
- Año: ${year}
- Kilometraje: ${kilometraje} km
- Precio esperado: ${precio}

💬 *Comentarios adicionales*:
${comentarios || 'Ninguno'}

---
Enviado desde altorracars.github.io`;

        // Redirigir a WhatsApp
        const whatsappUrl = `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(mensaje)}`;
        window.open(whatsappUrl, '_blank');

        // Cerrar modal y resetear formulario
        this.closeAllModals();
        form.reset();

        // Mostrar notificación si toast está disponible
        if (typeof toast !== 'undefined') {
            toast.success('Te redirigiremos a WhatsApp para completar tu solicitud', 'Formulario enviado');
        }
    }

    handleFinanciacionSubmit(form) {
        const formData = new FormData(form);

        const nombre = formData.get('nombre');
        const telefono = formData.get('telefono');
        const email = formData.get('email');
        const vehiculoInteres = formData.get('vehiculo-interes');
        const precioVehiculo = formData.get('precio-vehiculo');
        const cuotaInicial = formData.get('cuota-inicial');
        const plazo = formData.get('plazo');
        const ingresos = formData.get('ingresos');
        const comentarios = formData.get('comentarios');

        // Construir mensaje de WhatsApp
        const mensaje = `💰 *SOLICITUD DE FINANCIACIÓN*

📋 *Información del Cliente*:
- Nombre: ${nombre}
- Teléfono: ${telefono}
- Email: ${email}

🚙 *Información del Vehículo*:
- Vehículo de interés: ${vehiculoInteres}
- Precio del vehículo: ${precioVehiculo}
- Cuota inicial disponible: ${cuotaInicial}
- Plazo deseado: ${plazo}

💵 *Información Financiera*:
- Ingresos mensuales: ${ingresos}

💬 *Comentarios adicionales*:
${comentarios || 'Ninguno'}

---
Enviado desde altorracars.github.io`;

        // Redirigir a WhatsApp
        const whatsappUrl = `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(mensaje)}`;
        window.open(whatsappUrl, '_blank');

        // Cerrar modal y resetear formulario
        this.closeAllModals();
        form.reset();

        // Mostrar notificación si toast está disponible
        if (typeof toast !== 'undefined') {
            toast.success('Te redirigiremos a WhatsApp para completar tu solicitud', 'Formulario enviado');
        }
    }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.contactFormManager = new ContactFormManager();
    });
} else {
    window.contactFormManager = new ContactFormManager();
}
