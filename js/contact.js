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
            }, identity, src)).catch(function(err) { console.warn('[Solicitudes] Error saving contacto:', err); });
        }

        // Also redirect to WhatsApp
        const message = `*NUEVO CONTACTO - ALTORRA CARS*\n\n*Nombre:* ${data.nombre}\n*Email:* ${data.email}\n*Telefono:* ${data.telefono}\n*Vehiculo:* ${data.vehiculo || 'No especificado'}\n*Asunto:* ${data.asunto}\n\n*Mensaje:*\n${data.mensaje}`;
        const whatsappURL = `https://wa.me/573235016747?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank');

        if (typeof toast !== 'undefined') {
            toast.success('Solicitud enviada. Te redirigimos a WhatsApp.', 'Gracias!');
        }

        contactForm.reset();
    });
}
