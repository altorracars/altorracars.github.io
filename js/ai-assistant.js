/**
 * ALTORRA CARS — AI assistant (MF5.3) — FAQ matcher
 *
 * Bot flotante con respuestas predefinidas a preguntas frecuentes.
 * No usa LLM — keyword matcher curado. Si no encuentra respuesta,
 * redirige a "Te conecto con un asesor" + crea un lead.
 *
 * Inspirado en MIA de Mercately pero MVP sin costo de inferencia.
 */
(function () {
    'use strict';
    if (window.AltorraAI) return;

    var FAQS = [
        {
            keywords: ['financia', 'credito', 'cuota', 'plazo', 'inicial', 'tasa'],
            question: '¿Cómo funciona la financiación?',
            answer: 'Trabajamos con bancos aliados. Necesitas: cuota inicial mínima del 30%, ingresos demostrables, plazos hasta 60 meses. ¿Quieres simular tu cuota?',
            cta: { label: 'Solicitar financiación', action: 'open-modal-financ' }
        },
        {
            keywords: ['vendo', 'vender', 'consigna', 'consignacion', 'consignación'],
            question: '¿Cómo vendo mi auto con ustedes?',
            answer: 'Recibimos tu vehículo en consignación. Lo evaluamos, fotografiamos y publicamos. Te pagamos cuando se vende.',
            cta: { label: 'Solicitar evaluación', action: 'open-modal-vende' }
        },
        {
            keywords: ['ubica', 'donde', 'dónde', 'direccion', 'cartagena', 'sede'],
            question: '¿Dónde están ubicados?',
            answer: 'Estamos en Cartagena, Colombia. Atendemos por WhatsApp +57 323 5016747 y agendamos visitas presenciales con cita previa.',
            cta: { label: 'Agendar visita', action: 'goto-busqueda' }
        },
        {
            keywords: ['horario', 'abren', 'cierran', 'atienden'],
            question: '¿Qué horarios atienden?',
            answer: 'Lunes a sábado de 8:00 AM a 6:00 PM. Domingos cerrado. Las consultas por WhatsApp se responden en horario hábil.',
            cta: null
        },
        {
            keywords: ['garantia', 'garantía', 'devolucion', 'devolución', 'reclamo'],
            question: '¿Tienen garantía?',
            answer: 'Todos nuestros vehículos pasan revisión técnica + peritaje. Ofrecemos garantía mecánica de 30 días. Más detalles al contactar un asesor.',
            cta: { label: 'Hablar con asesor', action: 'open-wa' }
        },
        {
            keywords: ['nuevos', 'usados', 'modelos', 'marcas', 'inventario'],
            question: '¿Qué vehículos tienen?',
            answer: 'Tenemos vehículos usados de todas las marcas: Chevrolet, Toyota, Mazda, Hyundai, Renault, Kia, Nissan y más. Modelos desde 2015.',
            cta: { label: 'Ver catálogo', action: 'goto-busqueda' }
        }
    ];

    var SUGGESTIONS = FAQS.slice(0, 4).map(function (f) { return f.question; });

    var _open = false;

    function ensureWidget() {
        if (document.getElementById('ai-assistant-fab')) return;

        var fab = document.createElement('button');
        fab.id = 'ai-assistant-fab';
        fab.className = 'ai-fab';
        fab.setAttribute('aria-label', 'Asistente Altorra');
        fab.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>';
        document.body.appendChild(fab);

        var pop = document.createElement('div');
        pop.id = 'ai-assistant-pop';
        pop.className = 'ai-pop';
        pop.innerHTML =
            '<div class="ai-pop-head">' +
                '<strong>🤖 Asistente Altorra</strong>' +
                '<button class="ai-pop-close" aria-label="Cerrar">&times;</button>' +
            '</div>' +
            '<div class="ai-pop-body" id="aiBody"></div>' +
            '<form class="ai-pop-form" id="aiForm">' +
                '<input type="text" id="aiInput" placeholder="Pregunta lo que necesites..." autocomplete="off">' +
                '<button type="submit">Enviar</button>' +
            '</form>';
        document.body.appendChild(pop);

        fab.addEventListener('click', function () {
            _open = !_open;
            pop.classList.toggle('ai-pop--open', _open);
            if (_open && !document.getElementById('aiBody').innerHTML) showWelcome();
        });
        pop.querySelector('.ai-pop-close').addEventListener('click', function () {
            pop.classList.remove('ai-pop--open');
            _open = false;
        });

        document.getElementById('aiForm').addEventListener('submit', function (e) {
            e.preventDefault();
            var input = document.getElementById('aiInput');
            if (!input.value.trim()) return;
            handleUserQuery(input.value.trim());
            input.value = '';
        });

        pop.addEventListener('click', function (e) {
            var sugg = e.target.closest('[data-ai-question]');
            if (sugg) handleUserQuery(sugg.getAttribute('data-ai-question'));
            var cta = e.target.closest('[data-ai-cta]');
            if (cta) handleCta(cta.getAttribute('data-ai-cta'));
        });
    }

    function escTxt(s) { var d = document.createElement('div'); d.textContent = s == null ? '' : s; return d.innerHTML; }

    function appendMsg(text, from) {
        var body = document.getElementById('aiBody');
        if (!body) return;
        var div = document.createElement('div');
        div.className = 'ai-msg ai-msg--' + from;
        div.innerHTML = text;
        body.appendChild(div);
        body.scrollTop = body.scrollHeight;
    }

    function showWelcome() {
        appendMsg('¡Hola! Soy el asistente virtual de Altorra. Aquí algunas preguntas frecuentes:', 'bot');
        var body = document.getElementById('aiBody');
        var sug = document.createElement('div');
        sug.className = 'ai-suggestions';
        sug.innerHTML = SUGGESTIONS.map(function (q) {
            return '<button type="button" data-ai-question="' + escTxt(q) + '">' + escTxt(q) + '</button>';
        }).join('');
        body.appendChild(sug);
    }

    function findFAQ(query) {
        var q = query.toLowerCase();
        var bestScore = 0;
        var best = null;
        FAQS.forEach(function (f) {
            var hits = f.keywords.filter(function (k) { return q.indexOf(k) !== -1; }).length;
            if (hits > bestScore) {
                bestScore = hits;
                best = f;
            }
        });
        return bestScore > 0 ? best : null;
    }

    function handleUserQuery(query) {
        appendMsg(escTxt(query), 'user');
        var faq = findFAQ(query);
        if (faq) {
            setTimeout(function () {
                var html = '<p>' + escTxt(faq.answer) + '</p>';
                if (faq.cta) {
                    html += '<button class="ai-cta" data-ai-cta="' + escTxt(faq.cta.action) + '">' + escTxt(faq.cta.label) + '</button>';
                }
                appendMsg(html, 'bot');
            }, 300);
        } else {
            // No match → escalate to human
            setTimeout(function () {
                appendMsg('No tengo una respuesta específica para esa pregunta. ¿Querés que un asesor te contacte?', 'bot');
                var body = document.getElementById('aiBody');
                var div = document.createElement('div');
                div.innerHTML = '<button class="ai-cta" data-ai-cta="escalate">Sí, conéctame con un asesor</button>';
                body.appendChild(div);
                window._aiLastQuery = query;
            }, 400);
        }
    }

    function handleCta(action) {
        if (action === 'open-modal-financ') {
            var el = document.querySelector('[data-modal="financiacion"]');
            if (el) el.click();
        } else if (action === 'open-modal-vende') {
            var el2 = document.querySelector('[data-modal="vende-auto"]');
            if (el2) el2.click();
        } else if (action === 'goto-busqueda') {
            window.location.href = 'busqueda.html';
        } else if (action === 'open-wa') {
            window.open('https://wa.me/573235016747', '_blank');
        } else if (action === 'escalate') {
            // Create a lead with the user's last query
            var q = window._aiLastQuery || 'Consulta sin matching en FAQ';
            var u = (window.auth && window.auth.currentUser) || null;
            var registered = u && !u.isAnonymous;
            if (window.db) {
                var doc = {
                    nombre: registered ? (u.displayName || 'Cliente') : 'Lead AI',
                    email: registered ? (u.email || 'No proporcionado') : 'No proporcionado',
                    telefono: '',
                    prefijoPais: '+57',
                    tipo: 'consulta_general',
                    origen: 'ai_assistant',
                    kind: 'lead',
                    requiereCita: false,
                    vehiculo: '',
                    mensaje: q,
                    estado: 'nuevo',
                    observaciones: 'Generado desde AI Assistant',
                    createdAt: new Date().toISOString(),
                    userId: registered ? u.uid : null,
                    userEmail: registered ? (u.email || null) : null,
                    clientCategory: registered ? 'registered' : 'guest',
                    source: { page: location.pathname, cta: 'ai_assistant_escalate', referrer: '' }
                };
                if (window.AltorraCommSchema && window.AltorraCommSchema.computeMeta) {
                    doc = Object.assign({}, doc, window.AltorraCommSchema.computeMeta(doc));
                }
                window.db.collection('solicitudes').add(doc);
            }
            appendMsg('¡Listo! Un asesor te contactará pronto. Mientras tanto, podés ver el catálogo o escribirnos por WhatsApp.', 'bot');
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', ensureWidget);
    } else {
        ensureWidget();
    }

    window.AltorraAI = { open: function () { document.getElementById('ai-assistant-fab').click(); } };
})();
