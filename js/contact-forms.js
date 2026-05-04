// Contact Forms Manager - ALTORRA CARS
// Maneja formularios flotantes para "Vende tu Auto" (wizard 3 pasos) y "Financiación"

class ContactFormManager {
    constructor() {
        this.whatsappNumber = '573235016747';
        this.activeElement = null;
        this.vendeWizardStep = 1;
        this.init();
    }

    /** MF1.1 — Returns the currently authenticated non-anonymous user, or null */
    _currentUser() {
        if (!window.auth || !window.auth.currentUser) return null;
        if (window.auth.currentUser.isAnonymous) return null;
        return window.auth.currentUser;
    }

    /** MF1.1 — Build identity payload to attach to every Firestore submission */
    _identityPayload() {
        var u = this._currentUser();
        var payload = {
            userId: u ? u.uid : null,
            userEmail: u ? (u.email || null) : null,
            clientCategory: u ? 'registered' : 'guest'
        };
        return payload;
    }

    /** MF2.3 — Anti-double-submit + offline guard. Returns false if submission should abort. */
    _beginSubmit(form) {
        if (form._inFlight) return false;
        if (!navigator.onLine) {
            if (window.notify) window.notify.error({
                title: 'Sin conexión',
                message: 'No detectamos internet. Tus datos quedaron guardados aquí — reintenta cuando vuelvas a estar en línea.',
                duration: 6000
            });
            return false;
        }
        form._inFlight = true;
        var btn = form.querySelector('button[type="submit"], .form-submit');
        if (btn) {
            btn._origText = btn._origText || btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = '<span class="form-spinner" aria-hidden="true"></span> Enviando...';
        }
        return true;
    }
    _endSubmit(form, opts) {
        form._inFlight = false;
        var btn = form.querySelector('button[type="submit"], .form-submit');
        if (btn && btn._origText) {
            btn.disabled = false;
            // Restore only if we're not transitioning to success screen
            if (!opts || !opts.keepDisabled) btn.innerHTML = btn._origText;
        }
    }

    /** MF1.3 — Augment payload with priority/tags/slaDeadline */
    _withMeta(doc) {
        if (window.AltorraCommSchema && window.AltorraCommSchema.computeMeta) {
            return Object.assign({}, doc, window.AltorraCommSchema.computeMeta(doc));
        }
        return doc;
    }

    /** MF1.1 — Build source/device tracking metadata */
    _sourcePayload(ctaName) {
        var path = (window.location.pathname || '').replace(/^\/+/, '') || 'index.html';
        var ref = '';
        try { ref = document.referrer || ''; } catch (e) {}
        // Light UA parsing (consistent with admin-auth getDeviceInfo if available)
        var ua = navigator.userAgent || '';
        var browser = 'Unknown';
        if (/Edg\//.test(ua)) browser = 'Edge';
        else if (/Chrome\//.test(ua) && !/Edg\//.test(ua)) browser = 'Chrome';
        else if (/Firefox\//.test(ua)) browser = 'Firefox';
        else if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) browser = 'Safari';
        var os = 'Unknown';
        if (/Windows/.test(ua)) os = 'Windows';
        else if (/Mac OS X/.test(ua)) os = 'macOS';
        else if (/Android/.test(ua)) os = 'Android';
        else if (/iPhone|iPad|iPod/.test(ua)) os = 'iOS';
        else if (/Linux/.test(ua)) os = 'Linux';
        var deviceType = /Mobi|Android|iPhone|iPad/.test(ua) ? 'mobile' : 'desktop';
        return {
            source: { page: path, cta: ctaName || '', referrer: ref.slice(0, 200) },
            device: { type: deviceType, browser: browser, os: os }
        };
    }

    /** MF1.1 — Auto-fill form fields from logged-in user data (defensive) */
    _autoFillFromUser(modal) {
        var u = this._currentUser();
        if (!u || !modal) return;

        // Try clientes/{uid} for richer profile (telefono, prefijoPais)
        var profile = null;
        try {
            // Synchronous fast path: read from auth + cached display name
            profile = {
                nombre: u.displayName || '',
                email: u.email || '',
                telefono: '',
                prefijoPais: '+57'
            };
        } catch (e) {}

        // Fill standard inputs only if empty (don't override user's manual edits)
        var fields = ['nombre', 'email', 'telefono'];
        fields.forEach(function (name) {
            var input = modal.querySelector('input[name="' + name + '"]');
            if (input && !input.value && profile[name]) input.value = profile[name];
        });

        // Async enrich from Firestore clientes profile
        if (window.db && window.db.collection) {
            try {
                window.db.collection('clientes').doc(u.uid).get().then(function (doc) {
                    if (!doc.exists) return;
                    var data = doc.data() || {};
                    fields.forEach(function (name) {
                        var input = modal.querySelector('input[name="' + name + '"]');
                        if (input && !input.value && data[name]) input.value = data[name];
                    });
                    // Country prefix select (vende-pais / fin-pais)
                    var paisSel = modal.querySelector('select[id$="-pais"]');
                    if (paisSel && data.prefijo && !paisSel.dataset.userTouched) paisSel.value = data.prefijo;
                }).catch(function () {});
            } catch (e) {}
        }
    }

    init() {
        this.attachEventListeners();
        this.initVendeWizard();
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

    // ── Wizard "Vende tu Auto" ─────────────────────────────────

    initVendeWizard() {
        document.addEventListener('click', (e) => {
            const nextBtn = e.target.closest('.wizard-btn-next');
            if (nextBtn) {
                const panel = parseInt(nextBtn.dataset.panel, 10);
                if (this.validateWizardPanel(panel)) this.goToWizardStep(panel + 1);
            }
            const backBtn = e.target.closest('.wizard-btn-back');
            if (backBtn) {
                const panel = parseInt(backBtn.dataset.panel, 10);
                this.goToWizardStep(panel - 1);
            }
        });

        // Validación en tiempo real al salir de cada campo
        document.addEventListener('blur', (e) => {
            const input = e.target;
            if (input.closest('#vendeAutoForm') && input.matches('.form-input, .form-textarea')) {
                this.validateField(input);
            }
            if (input.closest('#financiacionForm') && input.matches('.form-input, .form-select')) {
                this.validateFinanciacionField(input);
            }
        }, true);

        // Limpiar error al empezar a escribir
        document.addEventListener('input', (e) => {
            const input = e.target;
            if (input.closest('#vendeAutoForm') && input.matches('.form-input')) {
                if (input.classList.contains('input-error')) {
                    this.clearFieldError(input);
                }
            }
            if (input.closest('#financiacionForm') && input.matches('.form-input')) {
                if (input.classList.contains('input-error')) {
                    this.clearFieldError(input);
                }
            }
        });
    }

    goToWizardStep(step) {
        const modal = document.getElementById('vende-auto-modal');
        if (!modal) return;

        this.vendeWizardStep = step;

        // Panels
        modal.querySelectorAll('.wizard-panel').forEach(p => p.classList.remove('active'));
        const target = modal.querySelector(`.wizard-panel[data-panel="${step}"]`);
        if (target) {
            target.classList.add('active');
            const firstInput = target.querySelector('input, textarea');
            if (firstInput) setTimeout(() => firstInput.focus(), 50);
        }

        // Steps indicator
        modal.querySelectorAll('.wizard-step-item').forEach(s => {
            const n = parseInt(s.dataset.step, 10);
            s.classList.toggle('active', n === step);
            s.classList.toggle('done', n < step);
            s.setAttribute('aria-current', n === step ? 'step' : 'false');
        });

        // Progress fill
        const fill = modal.querySelector('#vendeWizardFill');
        if (fill) fill.style.width = Math.round((step / 3) * 100) + '%';

        // Subtitle
        const subtitles = ['Paso 1 de 3 — Datos de contacto', 'Paso 2 de 3 — Tu vehículo', 'Paso 3 de 3 — Recibe tu oferta'];
        const sub = modal.querySelector('#vendeWizardSubtitle');
        if (sub) sub.textContent = subtitles[step - 1] || '';
    }

    validateWizardPanel(panel) {
        const modal = document.getElementById('vende-auto-modal');
        if (!modal) return true;
        const panelEl = modal.querySelector(`.wizard-panel[data-panel="${panel}"]`);
        if (!panelEl) return true;
        let valid = true;
        panelEl.querySelectorAll('.form-input').forEach(input => {
            if (!this.validateField(input)) valid = false;
        });
        return valid;
    }

    validateField(input) {
        const value = input.value.trim();
        let error = '';

        if (!value) {
            error = 'Este campo es obligatorio';
        } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            error = 'Ingresa un email válido';
        } else if (input.type === 'tel' && !/^\d{7,15}$/.test(value.replace(/\s/g, ''))) {
            error = 'Ingresa un número válido (7-15 dígitos)';
        } else if (input.name === 'year') {
            const y = parseInt(value, 10);
            if (isNaN(y) || y < 1990 || y > 2026) error = 'Año entre 1990 y 2026';
        } else if (input.name === 'kilometraje') {
            if (isNaN(parseInt(value, 10)) || parseInt(value, 10) < 0) error = 'Kilometraje inválido';
        }

        // Los campos opcionales no generan error si están vacíos
        const isRequired = input.closest('.form-group')?.querySelector('.form-label.required') !== null;
        if (!isRequired && !value) error = '';

        if (error) {
            this.setFieldError(input, error);
            return false;
        }
        this.clearFieldError(input);
        return true;
    }

    setFieldError(input, msg) {
        input.classList.add('input-error');
        const err = input.parentElement.querySelector('.form-error');
        if (err) err.textContent = msg;
    }

    clearFieldError(input) {
        input.classList.remove('input-error');
        const err = input.parentElement.querySelector('.form-error');
        if (err) err.textContent = '';
    }

    validateFinanciacionField(input) {
        const value = input.value.trim();
        let error = '';
        const isRequired = input.closest('.form-group')?.querySelector('.form-label.required') !== null;

        if (isRequired && !value) {
            error = 'Este campo es obligatorio';
        } else if (value && input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            error = 'Ingresa un email válido';
        } else if (value && input.type === 'tel' && !/^\d{7,15}$/.test(value.replace(/\s/g, ''))) {
            error = 'Ingresa un número válido (7-15 dígitos)';
        }

        if (error) {
            this.setFieldError(input, error);
            return false;
        }
        this.clearFieldError(input);
        return true;
    }

    validateFinanciacionForm(form) {
        let valid = true;
        form.querySelectorAll('.form-input, .form-select').forEach(input => {
            if (!this.validateFinanciacionField(input)) valid = false;
        });
        return valid;
    }

    resetFinanciacionForm() {
        const form = document.getElementById('financiacionForm');
        if (form) {
            form.reset();
            form.querySelectorAll('.form-input, .form-select').forEach(el => el.classList.remove('input-error'));
            form.querySelectorAll('.form-error').forEach(el => el.textContent = '');
        }
    }

    resetVendeWizard() {
        this.goToWizardStep(1);
        const modal = document.getElementById('vende-auto-modal');
        if (modal) {
            modal.querySelectorAll('.form-input, .form-textarea').forEach(el => {
                el.classList.remove('input-error');
            });
            modal.querySelectorAll('.form-error').forEach(el => el.textContent = '');
        }
    }

    // ── Modal genérico ─────────────────────────────────────────

    openModal(modalId) {
        const modal = document.getElementById(`${modalId}-modal`);
        if (modal) {
            this.activeElement = document.activeElement;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';

            // MF2.1 — restore form HTML if user reopens modal after success
            this._restoreOriginalContent(modalId);

            if (modalId === 'vende-auto') this.resetVendeWizard();
            if (modalId === 'financiacion') this.resetFinanciacionForm();

            // MF1.1 — auto-fill from logged-in user (non-overriding)
            this._autoFillFromUser(modal);

            setTimeout(() => {
                // Focus the first EMPTY input (skip pre-filled fields for better UX)
                var inputs = modal.querySelectorAll('input:not([type="hidden"]), textarea, select');
                var target = null;
                for (var i = 0; i < inputs.length; i++) {
                    if (!inputs[i].value) { target = inputs[i]; break; }
                }
                if (!target) target = inputs[0];
                if (target) target.focus();
            }, 100);

            this.trapFocus(modal);
        }
    }

    closeAllModals() {
        const modals = document.querySelectorAll('.modal-overlay');
        modals.forEach(modal => modal.classList.remove('active'));
        document.body.style.overflow = '';
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

    /**
     * MF2.1 — Render in-modal success screen (no WhatsApp redirect).
     * Called after a successful Firestore add. We replace the entire
     * modal-container content so progress bars, headers etc disappear
     * and the user only sees the confirmation.
     */
    _renderSuccess(modalId, opts) {
        var modal = document.getElementById(modalId + '-modal');
        if (!modal) return;
        var container = modal.querySelector('.modal-container') || modal;
        if (!container) return;

        var title = (opts && opts.title) || '¡Solicitud enviada!';
        var nombre = (opts && opts.nombre) || '';
        var ticketId = (opts && opts.ticketId) || '';
        var ticketShort = ticketId ? ticketId.slice(0, 6).toUpperCase() : '';
        var nextStep = (opts && opts.nextStep) || 'Te contactaremos pronto por correo electrónico y WhatsApp.';
        var isLogged = !!this._currentUser();

        // Cache original container HTML so we can restore on next open
        if (!container._originalContent) container._originalContent = container.innerHTML;

        var html =
            '<button type="button" class="modal-close" aria-label="Cerrar">&times;</button>' +
            '<div class="contact-success" role="status" aria-live="polite">' +
                '<div class="contact-success-icon">' +
                    '<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">' +
                        '<circle cx="12" cy="12" r="10"/>' +
                        '<polyline points="9 12 11 14 15 10"/>' +
                    '</svg>' +
                '</div>' +
                '<h2 class="contact-success-title">' + this._escapeHtml(title) + '</h2>' +
                (nombre ? '<p class="contact-success-subtitle">Gracias, ' + this._escapeHtml(nombre.split(' ')[0]) + '.</p>' : '') +
                '<p class="contact-success-message">' + this._escapeHtml(nextStep) + '</p>' +
                (ticketShort ? '<div class="contact-success-ticket">Tu nº de seguimiento: <strong>' + this._escapeHtml(ticketShort) + '</strong></div>' : '') +
                '<div class="contact-success-actions">' +
                    '<button type="button" class="contact-success-btn contact-success-btn--primary" data-action="close-success">Entendido</button>' +
                    (isLogged ? '<a href="perfil.html#mis-solicitudes" class="contact-success-btn contact-success-btn--ghost">Ver mis solicitudes</a>' : '') +
                '</div>' +
            '</div>';

        container.innerHTML = html;

        // Wire close behaviors
        var self = this;
        var primary = container.querySelector('[data-action="close-success"]');
        if (primary) primary.addEventListener('click', function () { self.closeAllModals(); });
        var closeX = container.querySelector('.modal-close');
        if (closeX) closeX.addEventListener('click', function () { self.closeAllModals(); });
    }

    /** MF2.1 — Restore the original form HTML if the user reopens the modal */
    _restoreOriginalContent(modalId) {
        var modal = document.getElementById(modalId + '-modal');
        if (!modal) return;
        var container = modal.querySelector('.modal-container');
        if (container && container._originalContent) {
            container.innerHTML = container._originalContent;
            container._originalContent = null;
        }
    }

    _escapeHtml(s) {
        if (s == null) return '';
        var d = document.createElement('div');
        d.textContent = String(s);
        return d.innerHTML;
    }

    handleVendeAutoSubmit(form) {
        if (!this._beginSubmit(form)) return; // MF2.3
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

        var prefijoPais = (document.getElementById('vende-pais') || {}).value || '+57';

        // Save to Firestore solicitudes collection
        var self = this;
        if (window.db) {
            var identity = this._identityPayload();
            var src = this._sourcePayload('vende_auto_form');
            window.db.collection('solicitudes').add(this._withMeta(Object.assign({
                nombre: nombre,
                telefono: telefono,
                prefijoPais: prefijoPais,
                email: email || 'No proporcionado',
                tipo: 'consignacion_venta',
                origen: 'vende_tu_auto',
                kind: 'solicitud', // MF1.2 — discriminator (cita | solicitud | lead)
                requiereCita: false,
                vehiculo: marca + ' ' + modelo + ' ' + year,
                datosExtra: {
                    marcaVehiculo: marca, modeloVehiculo: modelo,
                    yearVehiculo: year, kmVehiculo: kilometraje,
                    precioEsperado: precio
                },
                comentarios: comentarios || '',
                estado: 'pendiente',
                observaciones: '',
                createdAt: new Date().toISOString()
            }, identity, src))).then(function (ref) {
                self._renderSuccess('vende-auto', {
                    title: '¡Tu solicitud fue enviada!',
                    nombre: nombre,
                    ticketId: ref.id,
                    nextStep: 'Recibimos los datos de tu vehículo. Un asesor te contactará pronto por correo y WhatsApp para coordinar la valuación.'
                });
            }).catch(function (err) {
                console.warn('[Solicitudes] Error saving vende tu auto:', err);
                if (window.notify && window.notify.error) {
                    window.notify.error({ title: 'Error', message: 'No pudimos guardar tu solicitud. Verifica tu conexión e inténtalo de nuevo.', duration: 6000 });
                }
                self._endSubmit(form);
            });
        }
    }

    handleFinanciacionSubmit(form) {
        if (!this.validateFinanciacionForm(form)) return;
        if (!this._beginSubmit(form)) return; // MF2.3
        const formData = new FormData(form);

        const nombre = formData.get('nombre');
        const telefono = formData.get('telefono');
        const email = formData.get('email');
        const vehiculoInteres = formData.get('vehiculo-interes');
        const precioVehiculo = formData.get('precio-vehiculo');
        const cuotaInicial = formData.get('cuota-inicial');
        const plazo = formData.get('plazo');
        const ingresos = formData.get('ingresos');
        const situacion = formData.get('situacion-laboral');
        const ciudad = formData.get('ciudad');
        const comentarios = formData.get('comentarios');

        var prefijoPais = (document.getElementById('fin-pais') || {}).value || '+57';

        // Save to Firestore solicitudes collection
        var self = this;
        if (window.db) {
            var identity = this._identityPayload();
            var src = this._sourcePayload('financiacion_form');
            window.db.collection('solicitudes').add(this._withMeta(Object.assign({
                nombre: nombre,
                telefono: telefono,
                prefijoPais: prefijoPais,
                email: email || 'No proporcionado',
                tipo: 'financiacion',
                origen: 'financiacion',
                kind: 'solicitud', // MF1.2
                requiereCita: false,
                vehiculo: vehiculoInteres || 'No especificado',
                datosExtra: {
                    precioVehiculo: precioVehiculo, cuotaInicial: cuotaInicial,
                    plazo: plazo, ingresos: ingresos,
                    situacionLaboral: situacion, ciudad: ciudad
                },
                comentarios: comentarios || '',
                estado: 'pendiente',
                observaciones: '',
                createdAt: new Date().toISOString()
            }, identity, src))).then(function (ref) {
                self._renderSuccess('financiacion', {
                    title: '¡Solicitud de financiación recibida!',
                    nombre: nombre,
                    ticketId: ref.id,
                    nextStep: 'Un asesor revisará tu información y te contactará pronto por correo y WhatsApp con la propuesta de financiación.'
                });
            }).catch(function (err) {
                console.warn('[Solicitudes] Error saving financiacion:', err);
                if (window.notify && window.notify.error) {
                    window.notify.error({ title: 'Error', message: 'No pudimos guardar tu solicitud. Verifica tu conexión e inténtalo de nuevo.', duration: 6000 });
                }
            });
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

// BFCache cleanup: close modals and reset body overflow on back/forward navigation
window.addEventListener('pageshow', function (e) {
    if (e.persisted && window.contactFormManager) {
        window.contactFormManager.closeAllModals();
    }
});
