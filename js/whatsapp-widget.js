/**
 * ALTORRA CARS — WhatsApp widget with templates (MF5.1)
 *
 * Replaces the raw wa.me redirect with a contextual chooser:
 * 1. User clicks the floating WhatsApp button
 * 2. Modal shows 4 template options
 * 3. On select: a `solicitudes` doc is created FIRST (with kind=lead)
 * 4. WhatsApp opens with a message that includes the ticket number
 *
 * Patron: register the lead BEFORE redirecting, so cancellations don't
 * lose the contact. Mercately/Carroya pattern.
 */
(function () {
    'use strict';
    if (window.AltorraWaWidget) return;

    var WA_NUMBER = '573235016747';

    var TEMPLATES = [
        {
            id: 'financiacion',
            label: 'Quiero financiación',
            icon: '💰',
            tipo: 'financiacion',
            kind: 'solicitud',
            message: 'Hola, quiero información sobre financiación.'
        },
        {
            id: 'ver_auto',
            label: 'Quiero ver el auto',
            icon: '🚗',
            tipo: 'consulta_vehiculo',
            kind: 'lead',
            message: 'Hola, me gustaría coordinar una visita para ver un vehículo.'
        },
        {
            id: 'pregunta',
            label: 'Tengo una pregunta',
            icon: '❓',
            tipo: 'consulta_general',
            kind: 'lead',
            message: 'Hola, tengo una pregunta sobre Altorra Cars.'
        },
        {
            id: 'otro',
            label: 'Otro asunto',
            icon: '✉️',
            tipo: 'otro',
            kind: 'lead',
            message: 'Hola, los contacto para otro asunto.'
        }
    ];

    function ensureWidget() {
        if (document.getElementById('wa-widget-fab')) return;
        // Floating button + popup
        var fab = document.createElement('button');
        fab.id = 'wa-widget-fab';
        fab.className = 'wa-widget-fab';
        fab.setAttribute('aria-label', 'Abrir chat de WhatsApp');
        fab.innerHTML =
            '<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
                '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>' +
                '<path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492l4.625-1.469A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-2.17 0-4.207-.593-5.963-1.625l-.427-.253-2.746.872.873-2.682-.278-.44A9.72 9.72 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z"/>' +
            '</svg>';
        document.body.appendChild(fab);

        var pop = document.createElement('div');
        pop.id = 'wa-widget-pop';
        pop.className = 'wa-widget-pop';
        pop.setAttribute('role', 'dialog');
        pop.innerHTML =
            '<div class="wa-widget-head">' +
                '<strong>¿Cómo podemos ayudarte?</strong>' +
                '<button class="wa-widget-close" aria-label="Cerrar">&times;</button>' +
            '</div>' +
            '<div class="wa-widget-templates">' +
                TEMPLATES.map(function (t) {
                    return '<button type="button" class="wa-widget-tpl" data-tpl="' + t.id + '">' +
                        '<span class="wa-widget-tpl-icon">' + t.icon + '</span>' +
                        '<span class="wa-widget-tpl-label">' + t.label + '</span>' +
                    '</button>';
                }).join('') +
            '</div>' +
            '<p class="wa-widget-foot">Quedará registrado tu interés y te contactaremos pronto.</p>';
        document.body.appendChild(pop);

        fab.addEventListener('click', function () {
            pop.classList.toggle('wa-widget-pop--open');
        });
        pop.querySelector('.wa-widget-close').addEventListener('click', function () {
            pop.classList.remove('wa-widget-pop--open');
        });
        document.addEventListener('click', function (e) {
            if (!pop.contains(e.target) && e.target !== fab && !fab.contains(e.target)) {
                pop.classList.remove('wa-widget-pop--open');
            }
        });

        pop.addEventListener('click', function (e) {
            var btn = e.target.closest('.wa-widget-tpl');
            if (!btn) return;
            var tplId = btn.getAttribute('data-tpl');
            var tpl = TEMPLATES.find(function (t) { return t.id === tplId; });
            if (!tpl) return;
            handleTemplateClick(tpl);
            pop.classList.remove('wa-widget-pop--open');
        });
    }

    function handleTemplateClick(tpl) {
        // Build identity payload
        var u = (window.auth && window.auth.currentUser) || null;
        var registered = u && !u.isAnonymous;
        var ua = navigator.userAgent || '';
        var path = (window.location.pathname || '').replace(/^\/+/, '') || 'index.html';

        var doc = {
            nombre: registered ? (u.displayName || 'Cliente WhatsApp') : 'Lead WhatsApp',
            email: registered ? (u.email || 'No proporcionado') : 'No proporcionado',
            telefono: '',
            prefijoPais: '+57',
            tipo: tpl.tipo,
            origen: 'whatsapp_widget',
            kind: tpl.kind,
            requiereCita: false,
            vehiculo: 'No especificado',
            mensaje: tpl.message,
            estado: tpl.kind === 'lead' ? 'nuevo' : 'pendiente',
            observaciones: '',
            createdAt: new Date().toISOString(),
            userId: registered ? u.uid : null,
            userEmail: registered ? (u.email || null) : null,
            clientCategory: registered ? 'registered' : 'guest',
            source: { page: path, cta: 'whatsapp_widget_' + tpl.id, referrer: (document.referrer || '').slice(0, 200) },
            device: {
                type: /Mobi|Android|iPhone|iPad/.test(ua) ? 'mobile' : 'desktop',
                browser: /Chrome\//.test(ua) ? 'Chrome' : (/Firefox\//.test(ua) ? 'Firefox' : (/Safari\//.test(ua) ? 'Safari' : 'Unknown')),
                os: /Windows/.test(ua) ? 'Windows' : (/Mac OS X/.test(ua) ? 'macOS' : (/Android/.test(ua) ? 'Android' : (/iPhone|iPad/.test(ua) ? 'iOS' : 'Linux')))
            }
        };
        // Apply meta (priority/tags/sla) if schema available
        if (window.AltorraCommSchema && window.AltorraCommSchema.computeMeta) {
            doc = Object.assign({}, doc, window.AltorraCommSchema.computeMeta(doc));
        }

        function openWA(ticket) {
            var ticketShort = ticket ? ticket.slice(0, 6).toUpperCase() : '';
            var msg = tpl.message + (ticketShort ? '\n\nMi nº de seguimiento: ' + ticketShort : '');
            window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg), '_blank');
        }

        if (window.db) {
            window.db.collection('solicitudes').add(doc).then(function (ref) {
                openWA(ref.id);
            }).catch(function (err) {
                console.warn('[WA Widget] Save failed, opening WA without ticket:', err);
                openWA(null);
            });
        } else {
            // Defensive fallback
            openWA(null);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', ensureWidget);
    } else {
        ensureWidget();
    }

    window.AltorraWaWidget = { open: function () { document.getElementById('wa-widget-pop').classList.add('wa-widget-pop--open'); } };
})();
