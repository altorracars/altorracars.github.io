// Contact Form Handler for ALTORRA CARS

const contactForm = document.getElementById('contactForm');

/** MF1.1 — Build identity + source for any submission from this file */
function _contactIdentityPayload() {
    var u = (window.auth && window.auth.currentUser) || null;
    var registered = u && !u.isAnonymous;
    return {
        userId: registered ? u.uid : null,
        userEmail: registered ? (u.email || null) : null,
        clientCategory: registered ? 'registered' : 'guest'
    };
}
function _contactSourcePayload(ctaName) {
    var path = (window.location.pathname || '').replace(/^\/+/, '') || 'index.html';
    var ref = '';
    try { ref = document.referrer || ''; } catch (e) {}
    var ua = navigator.userAgent || '';
    var browser = /Edg\//.test(ua) ? 'Edge'
        : (/Chrome\//.test(ua) ? 'Chrome' : (/Firefox\//.test(ua) ? 'Firefox' : (/Safari\//.test(ua) ? 'Safari' : 'Unknown')));
    var os = /Windows/.test(ua) ? 'Windows' : (/Mac OS X/.test(ua) ? 'macOS' : (/Android/.test(ua) ? 'Android' : (/iPhone|iPad/.test(ua) ? 'iOS' : (/Linux/.test(ua) ? 'Linux' : 'Unknown'))));
    var deviceType = /Mobi|Android|iPhone|iPad/.test(ua) ? 'mobile' : 'desktop';
    return {
        source: { page: path, cta: ctaName || '', referrer: ref.slice(0, 200) },
        device: { type: deviceType, browser: browser, os: os }
    };
}

/** MF1.1 — Auto-fill from logged-in user */
function _contactAutoFill(form) {
    if (!form) return;
    var u = (window.auth && window.auth.currentUser) || null;
    if (!u || u.isAnonymous) return;
    var nombre = form.querySelector('[name="nombre"]');
    var email = form.querySelector('[name="email"]');
    var telefono = form.querySelector('[name="telefono"]');
    if (nombre && !nombre.value && u.displayName) nombre.value = u.displayName;
    if (email && !email.value && u.email) email.value = u.email;
    // Async profile enrichment for telefono
    if (window.db && telefono && !telefono.value) {
        try {
            window.db.collection('clientes').doc(u.uid).get().then(function (doc) {
                if (!doc.exists) return;
                var d = doc.data();
                if (telefono && !telefono.value && d.telefono) telefono.value = d.telefono;
            }).catch(function () {});
        } catch (e) {}
    }
}

/** MF2.2 — In-page confirmation that replaces the form-card content */
function _renderContactSuccess(formCard, opts) {
    if (!formCard) return;
    var nombre = (opts && opts.nombre) || '';
    var ticketId = (opts && opts.ticketId) || '';
    var ticketShort = ticketId ? ticketId.slice(0, 6).toUpperCase() : '';
    var nextStep = (opts && opts.nextStep) || 'Te contactaremos pronto por correo electrónico y WhatsApp.';
    var u = (window.auth && window.auth.currentUser) || null;
    var isLogged = u && !u.isAnonymous;

    function esc(s) { var d = document.createElement('div'); d.textContent = s == null ? '' : String(s); return d.innerHTML; }

    formCard.innerHTML =
        '<div class="contact-success" role="status" aria-live="polite">' +
            '<div class="contact-success-icon">' +
                '<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">' +
                    '<circle cx="12" cy="12" r="10"/>' +
                    '<polyline points="9 12 11 14 15 10"/>' +
                '</svg>' +
            '</div>' +
            '<h2 class="contact-success-title">¡Mensaje recibido!</h2>' +
            (nombre ? '<p class="contact-success-subtitle">Gracias, ' + esc(nombre.split(' ')[0]) + '.</p>' : '') +
            '<p class="contact-success-message">' + esc(nextStep) + '</p>' +
            (ticketShort ? '<div class="contact-success-ticket">Tu nº de seguimiento: <strong>' + esc(ticketShort) + '</strong></div>' : '') +
            '<div class="contact-success-actions">' +
                '<a href="busqueda.html" class="contact-success-btn contact-success-btn--primary">Ver vehículos</a>' +
                (isLogged ? '<a href="perfil.html#mis-solicitudes" class="contact-success-btn contact-success-btn--ghost">Ver mis solicitudes</a>'
                          : '<a href="index.html" class="contact-success-btn contact-success-btn--ghost">Volver al inicio</a>') +
            '</div>' +
        '</div>';
}

if (contactForm) {
    // Auto-fill on render + on auth state change
    _contactAutoFill(contactForm);
    if (window.auth && typeof window.auth.onAuthStateChanged === 'function') {
        window.auth.onAuthStateChanged(function () { _contactAutoFill(contactForm); });
    }

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Map asunto to tipo
        var tipoMap = {
            compra: 'compra', venta: 'consignacion_venta',
            financiacion: 'financiacion', peritaje: 'peritaje', otro: 'otro'
        };

        // Save to Firestore solicitudes collection
        if (window.db) {
            var identity = _contactIdentityPayload();
            var src = _contactSourcePayload('contact_form_general');
            window.db.collection('solicitudes').add(Object.assign({
                nombre: data.nombre || '',
                telefono: data.telefono || '',
                prefijoPais: (document.getElementById('contacto-pais') || {}).value || '+57',
                email: data.email || 'No proporcionado',
                tipo: tipoMap[data.asunto] || 'consulta_general',
                origen: 'contacto',
                requiereCita: false,
                vehiculo: data.vehiculo || 'No especificado',
                comentarios: '',
                mensaje: data.mensaje || '',
                estado: 'pendiente',
                observaciones: '',
                createdAt: new Date().toISOString()
            }, identity, src)).then(function (ref) {
                var formCard = contactForm.closest('.form-card');
                _renderContactSuccess(formCard, {
                    nombre: data.nombre || '',
                    ticketId: ref.id,
                    nextStep: 'Recibimos tu consulta. Un asesor revisará tu mensaje y te contactará pronto por correo y WhatsApp.'
                });
                // Smooth scroll to confirmation if the page has scrolled
                if (formCard && typeof formCard.scrollIntoView === 'function') {
                    formCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }).catch(function (err) {
                console.warn('[Solicitudes] Error saving contacto:', err);
                if (window.notify && window.notify.error) {
                    window.notify.error({ title: 'Error', message: 'No pudimos enviar tu mensaje. Verifica tu conexión e inténtalo de nuevo.', duration: 6000 });
                }
            });
        }
    });
}
