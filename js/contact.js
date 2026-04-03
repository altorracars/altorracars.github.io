// Contact Form Handler for ALTORRA CARS

const contactForm = document.getElementById('contactForm');

if (contactForm) {
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
            window.db.collection('solicitudes').add({
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
            }).catch(function(err) { console.warn('[Solicitudes] Error saving contacto:', err); });
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
