/**
 * ALTORRA CARS — Marketing opt-in granular (Mega-Plan v4, U.19)
 * ==============================================================
 * Patrón GDPR: cuando el cliente dice "avísenme cuando llegue X" o
 * similar, el bot pregunta consentimiento explícito por canal:
 * email, WhatsApp, SMS. Cada opt-in se almacena en el lead/perfil.
 *
 * Right to be forgotten: api `eraseClient(uid)` que elimina datos
 * del cliente (preserva audit log para compliance).
 *
 * Schema añadido al lead/cliente:
 *   marketingOptIn: {
 *     email: bool,
 *     whatsapp: bool,
 *     sms: bool,
 *     askedAt: ISO,
 *     source: 'concierge' | 'profile' | 'manual'
 *   }
 *
 * Public API:
 *   AltorraOptIn.requestOptIn(channel)    → bot pregunta al cliente
 *   AltorraOptIn.savePreference(channels) → persiste
 *   AltorraOptIn.eraseClient(uid)          → GDPR right to forget
 */
(function () {
    'use strict';
    if (window.AltorraOptIn) return;

    // Triggers en mensajes del cliente que indican intención de recibir info
    var OPTIN_TRIGGERS = [
        /av[íi]senme cuando/i,
        /quiero recibir/i,
        /me interesa que me/i,
        /cuando tengan?\s+(?:un|otro)/i,
        /prom?oci[óo]n(?:es)?/i,
        /ofertas?/i
    ];

    function detectOptInIntent(text) {
        if (!text) return false;
        return OPTIN_TRIGGERS.some(function (re) { return re.test(text); });
    }

    /* ═══════════════════════════════════════════════════════════
       BOT FLOW — pedir consentimiento dentro del Concierge
       ═══════════════════════════════════════════════════════════ */
    function requestOptIn(channel) {
        // Pide al concierge que muestre el prompt de consentimiento
        if (!window.AltorraConcierge) return;
        var session = window.AltorraConcierge.session();
        if (!session) return;
        if (session._optInAsked) return; // ya se preguntó esta sesión

        // Marcar para no preguntar dos veces
        try {
            var s = JSON.parse(localStorage.getItem('altorra_concierge_session') || '{}');
            s._optInAsked = true;
            localStorage.setItem('altorra_concierge_session', JSON.stringify(s));
        } catch (e) {}

        // Construir mensaje del bot con CTAs de canales
        var msg = '¿Por qué canal preferís que te avisemos cuando tengamos novedades? ' +
                  'Podés activar cualquiera o ninguno (siempre podés cambiarlo después).';

        // El Concierge widget no soporta múltiples CTAs en un solo mensaje en su versión
        // actual — emitimos el mensaje con CTA "open opt-in modal"
        var optInModalHtml =
            '<div class="optin-modal-backdrop"></div>' +
            '<div class="optin-modal">' +
                '<h3>Tu preferencia de contacto</h3>' +
                '<p>Decinos por dónde te avisamos. Podés desactivar cualquiera después desde tu perfil.</p>' +
                '<label class="optin-row">' +
                    '<input type="checkbox" id="optin-email" checked> ' +
                    '<div><strong>Correo electrónico</strong>' +
                    '<small>Novedades + ofertas (1 por mes max)</small></div>' +
                '</label>' +
                '<label class="optin-row">' +
                    '<input type="checkbox" id="optin-wa"> ' +
                    '<div><strong>WhatsApp</strong>' +
                    '<small>Solo cuando llegue un vehículo que coincida con lo que buscás</small></div>' +
                '</label>' +
                '<label class="optin-row">' +
                    '<input type="checkbox" id="optin-sms"> ' +
                    '<div><strong>SMS</strong>' +
                    '<small>Confirmaciones de citas únicamente</small></div>' +
                '</label>' +
                '<div class="optin-actions">' +
                    '<button type="button" class="optin-btn-skip">Ahora no</button>' +
                    '<button type="button" class="optin-btn-save">Guardar preferencias</button>' +
                '</div>' +
            '</div>';

        var wrap = document.createElement('div');
        wrap.id = 'altorra-optin';
        wrap.className = 'altorra-optin';
        wrap.innerHTML = optInModalHtml;
        document.body.appendChild(wrap);

        function close() { wrap.remove(); }

        wrap.querySelector('.optin-btn-skip').addEventListener('click', function () {
            savePreference({ email: false, whatsapp: false, sms: false }, 'declined');
            close();
        });
        wrap.querySelector('.optin-btn-save').addEventListener('click', function () {
            savePreference({
                email: wrap.querySelector('#optin-email').checked,
                whatsapp: wrap.querySelector('#optin-wa').checked,
                sms: wrap.querySelector('#optin-sms').checked
            }, 'concierge');
            close();
            if (window.AltorraConcierge && window.AltorraConcierge.send) {
                // Bot agradece
                setTimeout(function () {
                    var session = window.AltorraConcierge.session();
                    var msgEl = document.querySelector('.cnc-messages');
                    if (msgEl) {
                        // Emitir mensaje del bot directamente (no recursión via send)
                        var bubble = document.createElement('div');
                        bubble.className = 'cnc-msg cnc-bot-bubble';
                        bubble.textContent = '¡Listo! Guardamos tu preferencia. 🙌';
                        msgEl.appendChild(bubble);
                        msgEl.scrollTop = msgEl.scrollHeight;
                    }
                }, 200);
            }
        });
        wrap.querySelector('.optin-modal-backdrop').addEventListener('click', close);
    }

    function savePreference(channels, source) {
        if (!window.db) return;
        var session = (window.AltorraConcierge && window.AltorraConcierge.session()) || {};
        var pref = {
            email: !!channels.email,
            whatsapp: !!channels.whatsapp,
            sms: !!channels.sms,
            askedAt: new Date().toISOString(),
            source: source || 'concierge'
        };

        // Si hay leadId del Concierge, actualizar el lead
        if (session.leadId) {
            window.db.collection('solicitudes').doc(session.leadId).update({
                marketingOptIn: pref
            }).catch(function () {});
        }

        // Si hay uid registrado, actualizar el perfil del cliente
        if (session.uid) {
            window.db.collection('clientes').doc(session.uid).set({
                marketingOptIn: pref
            }, { merge: true }).catch(function () {});
        }

        if (window.AltorraEventBus) {
            window.AltorraEventBus.emit('optin.saved', {
                uid: session.uid,
                email: session.email,
                preferences: pref
            });
        }
    }

    /* ═══════════════════════════════════════════════════════════
       GDPR — Right to be forgotten
       Solo super_admin puede ejecutar. Anonimiza datos del cliente
       en `solicitudes/` + `conciergeChats/` + `clientes/`.
       ═══════════════════════════════════════════════════════════ */
    function eraseClient(uid) {
        if (!window.db) return Promise.reject('no-db');
        if (!uid) return Promise.reject('no-uid');
        var promises = [];
        // 1. Anonimizar solicitudes
        promises.push(
            window.db.collection('solicitudes')
                .where('userId', '==', uid).get()
                .then(function (snap) {
                    var batch = window.db.batch();
                    snap.forEach(function (doc) {
                        batch.update(doc.ref, {
                            nombre: '[ELIMINADO]',
                            email: '[eliminado]',
                            telefono: null,
                            comentarios: '[contenido eliminado a pedido del cliente]',
                            erasedAt: new Date().toISOString()
                        });
                    });
                    if (!snap.empty) return batch.commit();
                })
        );
        // 2. Eliminar conciergeChats
        promises.push(
            window.db.collection('conciergeChats')
                .where('userId', '==', uid).get()
                .then(function (snap) {
                    var batch = window.db.batch();
                    snap.forEach(function (doc) {
                        batch.delete(doc.ref);
                    });
                    if (!snap.empty) return batch.commit();
                })
        );
        // 3. Eliminar perfil cliente
        promises.push(
            window.db.collection('clientes').doc(uid).delete()
        );
        return Promise.all(promises);
    }

    /* ═══════════════════════════════════════════════════════════
       Public API
       ═══════════════════════════════════════════════════════════ */
    window.AltorraOptIn = {
        requestOptIn: requestOptIn,
        savePreference: savePreference,
        eraseClient: eraseClient,
        detectOptInIntent: detectOptInIntent
    };
})();
