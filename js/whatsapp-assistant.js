/**
 * Asistente Inteligente WhatsApp — ALTORRA CARS
 * Chat guiado de preclasificación comercial con remisión a WhatsApp
 */
(function () {
    'use strict';

    // ─── CONFIGURACIÓN ───────────────────────────────────────────────────────
    const CFG = {
        phone: '573235016747',
        name:  'Asistente ALTORRA',
        greeting_delay: 3500,   // ms antes de mostrar notificación
        typing_speed:   900,    // ms de "escribiendo..."
        storage_key:    'ac_wa_assistant_seen',
    };

    // ─── FLUJO DE CONVERSACIÓN ────────────────────────────────────────────────
    const FLOWS = {
        welcome: {
            msg: '¡Hola! 👋 Soy el asistente de *ALTORRA Cars*.\n\n¿En qué puedo ayudarte hoy?',
            opts: [
                { label: '🚗 Comprar vehículo',      next: 'buy_type'       },
                { label: '💳 Financiación / Crédito', next: 'fin_value'      },
                { label: '🔄 Vender mi auto',         next: 'sell_brand'     },
                { label: '📅 Agendar visita',          next: 'apt_reason'     },
                { label: '💬 Hablar con un asesor',   next: 'adv_name'       },
            ],
        },

        // ── COMPRAR ──
        buy_type: {
            msg: '¡Excelente! ¿Qué tipo de vehículo estás buscando?',
            key: 'tipo',
            opts: [
                { label: '🚙 SUV / Campero',  value: 'SUV',           next: 'buy_budget' },
                { label: '🚗 Sedán',          value: 'Sedán',         next: 'buy_budget' },
                { label: '🛻 Pickup / 4x4',   value: 'Pickup',        next: 'buy_budget' },
                { label: '🚘 Hatchback',      value: 'Hatchback',     next: 'buy_budget' },
                { label: '🤔 No lo sé aún',   value: 'Cualquier tipo', next: 'buy_budget' },
            ],
        },
        buy_budget: {
            msg: '¿Cuál es tu presupuesto aproximado?',
            key: 'presupuesto',
            opts: [
                { label: 'Hasta $40 millones',     value: 'Hasta $40M',        next: 'buy_payment' },
                { label: '$40M – $70 millones',    value: 'Entre $40M y $70M', next: 'buy_payment' },
                { label: '$70M – $100 millones',   value: 'Entre $70M y $100M',next: 'buy_payment' },
                { label: 'Más de $100 millones',   value: 'Más de $100M',      next: 'buy_payment' },
            ],
        },
        buy_payment: {
            msg: '¿Cómo planeas pagar el vehículo?',
            key: 'forma_pago',
            opts: [
                { label: '💵 Contado',              value: 'de contado',           next: '_summary_buy'   },
                { label: '🏦 Crédito / Financiado', value: 'financiado',           next: '_summary_buy'   },
                { label: '🔄 Parte de pago + resto', value: 'con parte de pago',   next: '_summary_buy'   },
                { label: '💭 Aún no lo sé',          value: 'por definir',          next: '_summary_buy'   },
            ],
        },

        // ── FINANCIACIÓN ──
        fin_value: {
            msg: '¿Cuál es el valor aproximado del vehículo que te interesa?',
            key: 'valor_vehiculo',
            opts: [
                { label: 'Hasta $50 millones',   value: 'Hasta $50M',         next: 'fin_initial' },
                { label: '$50M – $80 millones',  value: 'Entre $50M y $80M',  next: 'fin_initial' },
                { label: '$80M – $120 millones', value: 'Entre $80M y $120M', next: 'fin_initial' },
                { label: 'Más de $120 millones', value: 'Más de $120M',       next: 'fin_initial' },
            ],
        },
        fin_initial: {
            msg: '¿Cuánto podrías dar de cuota inicial?',
            key: 'cuota_inicial',
            opts: [
                { label: '0% — Sin inicial',   value: '0% de inicial',      next: 'fin_job' },
                { label: '10% – 20%',          value: 'entre 10% y 20%',    next: 'fin_job' },
                { label: '20% – 40%',          value: 'entre 20% y 40%',    next: 'fin_job' },
                { label: 'Más del 40%',        value: 'más del 40%',        next: 'fin_job' },
            ],
        },
        fin_job: {
            msg: '¿Cuál es tu situación laboral?',
            key: 'situacion_laboral',
            opts: [
                { label: '👔 Empleado',      value: 'empleado',     next: '_summary_fin' },
                { label: '🧑‍💼 Independiente', value: 'independiente', next: '_summary_fin' },
                { label: '🏢 Empresario',    value: 'empresario',   next: '_summary_fin' },
                { label: '👴 Pensionado',    value: 'pensionado',   next: '_summary_fin' },
            ],
        },

        // ── VENDER ──
        sell_brand: {
            msg: '¿Qué marca, modelo y año tiene tu vehículo?',
            key: 'vehiculo',
            type: 'input',
            placeholder: 'Ej: Toyota RAV4 2021...',
            next: 'sell_km',
        },
        sell_km: {
            msg: '¿Cuántos kilómetros tiene aproximadamente?',
            key: 'kilometraje',
            opts: [
                { label: 'Menos de 30.000 km',      value: 'menos de 30.000 km',  next: 'sell_goal' },
                { label: '30.000 – 80.000 km',      value: '30.000 a 80.000 km',  next: 'sell_goal' },
                { label: '80.000 – 150.000 km',     value: '80.000 a 150.000 km', next: 'sell_goal' },
                { label: 'Más de 150.000 km',       value: 'más de 150.000 km',   next: 'sell_goal' },
            ],
        },
        sell_goal: {
            msg: '¿Qué prefieres para la venta?',
            key: 'prioridad',
            opts: [
                { label: '⚡ Venderlo rápido',              value: 'venderlo rápido',                     next: '_summary_sell' },
                { label: '💰 Obtener el mejor precio',     value: 'obtener el mejor precio',             next: '_summary_sell' },
                { label: '⚖️ Balance: precio + rapidez',   value: 'balance entre precio y velocidad',    next: '_summary_sell' },
            ],
        },

        // ── AGENDAR ──
        apt_reason: {
            msg: '¿Para qué necesitas la cita?',
            key: 'motivo_cita',
            opts: [
                { label: '🚗 Ver un vehículo',        value: 'ver un vehículo',      next: 'apt_when' },
                { label: '📊 Cotización / Asesoría',  value: 'cotización',           next: 'apt_when' },
                { label: '🔄 Entregar mi auto',       value: 'entrega de mi auto',   next: 'apt_when' },
                { label: '🏦 Revisar financiación',   value: 'revisión de crédito',  next: 'apt_when' },
            ],
        },
        apt_when: {
            msg: '¿Cuándo prefieres visitarnos?',
            key: 'cuando',
            opts: [
                { label: '📅 Esta semana',                 value: 'esta semana',           next: '_summary_apt' },
                { label: '📅 La próxima semana',           value: 'la próxima semana',     next: '_summary_apt' },
                { label: '📞 Me llaman para coordinar',    value: 'me llaman para coordinar', next: '_summary_apt' },
            ],
        },

        // ── ASESOR DIRECTO ──
        adv_name: {
            msg: 'Con mucho gusto. ¿Cuál es tu nombre?',
            key: 'nombre',
            type: 'input',
            placeholder: 'Tu nombre...',
            next: 'adv_topic',
        },
        adv_topic: {
            msg: 'Genial, {nombre}. ¿En qué te podemos ayudar?',
            key: 'consulta',
            opts: [
                { label: '💡 Información general',    value: 'información general',  next: '_summary_adv' },
                { label: '🚗 Vehículo específico',    value: 'un vehículo específico', next: '_summary_adv' },
                { label: '📋 Documentación / Trámites', value: 'documentación',      next: '_summary_adv' },
                { label: '🔧 Postventa / Garantía',   value: 'postventa o garantía', next: '_summary_adv' },
                { label: '✍️ Otra consulta',           value: 'consulta general',     next: '_summary_adv' },
            ],
        },
    };

    // ─── GENERADORES DE MENSAJE WHATSAPP ─────────────────────────────────────
    const MESSAGES = {
        _summary_buy:  (d) =>
            `Hola ALTORRA CARS 👋\n\nQuiero comprar un vehículo:\n• Tipo: ${d.tipo}\n• Presupuesto: ${d.presupuesto}\n• Forma de pago: ${d.forma_pago}\n\n¿Pueden asesorarme? 🙏`,
        _summary_fin:  (d) =>
            `Hola ALTORRA CARS 👋\n\nEstoy interesado/a en financiación:\n• Valor del vehículo: ${d.valor_vehiculo}\n• Cuota inicial: ${d.cuota_inicial}\n• Situación laboral: ${d.situacion_laboral}\n\n¿Qué opciones de crédito tienen para mí?`,
        _summary_sell: (d) =>
            `Hola ALTORRA CARS 👋\n\nQuiero vender mi vehículo:\n• Vehículo: ${d.vehiculo}\n• Kilometraje: ${d.kilometraje}\n• Prioridad: ${d.prioridad}\n\n¿Cuánto me pueden ofrecer?`,
        _summary_apt:  (d) =>
            `Hola ALTORRA CARS 👋\n\nQuiero agendar una cita:\n• Motivo: ${d.motivo_cita}\n• Disponibilidad: ${d.cuando}\n\n¿Cuándo podemos coordinar?`,
        _summary_adv:  (d) =>
            `Hola ALTORRA CARS 👋\n\nMi nombre es ${d.nombre || 'un cliente'} y necesito ayuda con: ${d.consulta}.\n\n¿Pueden atenderme? 😊`,
    };

    const SUMMARY_MESSAGES = {
        _summary_buy:  '¡Perfecto! 🎉 Ya tengo todo lo que necesito.\n\nTe voy a conectar con un asesor que te mostrará las mejores opciones para ti.',
        _summary_fin:  '¡Excelente! 💳 Con esa información podemos buscar el crédito ideal.\n\nUn asesor te contactará con las mejores tasas disponibles.',
        _summary_sell: '¡Gracias! 🚗 Tenemos interés en conocer tu vehículo.\n\nUn tasador te dará una oferta justa y rápida.',
        _summary_apt:  '¡Listo! 📅 Agendamos la visita contigo.\n\nNuestro equipo te atenderá con mucho gusto.',
        _summary_adv:  '¡Genial! Te conecto ahora mismo con un asesor.\n\nEstarán felices de ayudarte. 😊',
    };

    // ─── ESTILOS ──────────────────────────────────────────────────────────────
    const CSS = `
#wa-assistant-root {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 99999;
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* ── Botón flotante ── */
#wa-btn {
    width: 62px;
    height: 62px;
    border-radius: 50%;
    background: linear-gradient(135deg, #d4af37 0%, #b89658 100%);
    border: none;
    cursor: pointer;
    box-shadow: 0 6px 28px rgba(212,175,55,0.45), 0 0 0 0 rgba(212,175,55,0.6);
    animation: wa-pulse 2.4s ease-in-out infinite;
    transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    outline: none;
}
#wa-btn:hover {
    transform: translateY(-3px) scale(1.07);
    box-shadow: 0 12px 40px rgba(212,175,55,0.6);
    animation: none;
}
#wa-btn svg { width: 32px; height: 32px; display: block; transition: transform 0.3s ease; }
#wa-btn.open svg { transform: rotate(90deg); }
#wa-btn.open { animation: none; background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%); }

/* Notificación */
#wa-notif {
    position: absolute;
    top: -4px; right: -4px;
    width: 20px; height: 20px;
    background: #ef4444;
    border-radius: 50%;
    border: 2px solid #0a0a0a;
    font-size: 11px;
    font-weight: 700;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: wa-bounce 1s ease 4s forwards;
    transform-origin: center;
}
#wa-notif.hidden { display: none; }

@keyframes wa-pulse {
    0%,100% { box-shadow: 0 6px 28px rgba(212,175,55,0.45), 0 0 0 0 rgba(212,175,55,0.6); }
    50%      { box-shadow: 0 6px 28px rgba(212,175,55,0.45), 0 0 0 14px rgba(212,175,55,0); }
}
@keyframes wa-bounce {
    0%,100% { transform: scale(1); }
    50%      { transform: scale(1.3); }
}

/* ── Ventana chat ── */
#wa-window {
    position: absolute;
    bottom: 76px;
    right: 0;
    width: 370px;
    max-width: calc(100vw - 32px);
    background: #111;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(212,175,55,0.15);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 530px;
    max-height: calc(100vh - 120px);
    transform: scale(0.85) translateY(20px);
    opacity: 0;
    pointer-events: none;
    transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.25s ease;
    transform-origin: bottom right;
}
#wa-window.visible {
    transform: scale(1) translateY(0);
    opacity: 1;
    pointer-events: all;
}

/* ── Header ── */
.wa-header {
    background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%);
    border-bottom: 1px solid rgba(212,175,55,0.2);
    padding: 14px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
}
.wa-header-left { display: flex; align-items: center; gap: 11px; }
.wa-avatar {
    width: 42px; height: 42px;
    border-radius: 50%;
    background: linear-gradient(135deg, #d4af37, #8b6f47);
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 13px; color: #0a0a0a;
    flex-shrink: 0;
    position: relative;
}
.wa-avatar::after {
    content: '';
    position: absolute;
    bottom: 1px; right: 1px;
    width: 10px; height: 10px;
    background: #22c55e;
    border-radius: 50%;
    border: 2px solid #1a1a1a;
}
.wa-header-name {
    font-size: 14px;
    font-weight: 600;
    color: #f8f8f8;
    line-height: 1.2;
}
.wa-header-status {
    font-size: 11px;
    color: #22c55e;
    font-weight: 400;
}
.wa-close-btn {
    background: rgba(255,255,255,0.07);
    border: none;
    color: #b0b0b0;
    width: 30px; height: 30px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 15px;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.2s, color 0.2s;
    flex-shrink: 0;
}
.wa-close-btn:hover { background: rgba(239,68,68,0.15); color: #ef4444; }

/* ── Mensajes ── */
.wa-messages {
    flex: 1;
    overflow-y: auto;
    padding: 16px 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: #0d0d0d;
    scrollbar-width: thin;
    scrollbar-color: #2a2a2a transparent;
}
.wa-messages::-webkit-scrollbar { width: 4px; }
.wa-messages::-webkit-scrollbar-track { background: transparent; }
.wa-messages::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 2px; }

/* Burbuja bot */
.wa-bubble {
    max-width: 88%;
    padding: 10px 13px;
    border-radius: 16px 16px 16px 4px;
    background: #1e1e1e;
    border: 1px solid rgba(255,255,255,0.06);
    color: #e8e8e8;
    font-size: 13.5px;
    line-height: 1.55;
    align-self: flex-start;
    white-space: pre-line;
    animation: wa-msg-in 0.3s ease;
}
.wa-bubble b, .wa-bubble strong { color: #d4af37; }

/* Burbuja usuario */
.wa-bubble-user {
    max-width: 80%;
    padding: 9px 13px;
    border-radius: 16px 16px 4px 16px;
    background: linear-gradient(135deg, #d4af37 0%, #b89658 100%);
    color: #0a0a0a;
    font-size: 13px;
    font-weight: 500;
    align-self: flex-end;
    animation: wa-msg-in 0.25s ease;
}

/* Typing indicator */
.wa-typing {
    align-self: flex-start;
    background: #1e1e1e;
    border: 1px solid rgba(255,255,255,0.06);
    padding: 12px 16px;
    border-radius: 16px 16px 16px 4px;
    display: flex;
    gap: 5px;
    align-items: center;
    animation: wa-msg-in 0.3s ease;
}
.wa-typing span {
    width: 7px; height: 7px;
    background: #d4af37;
    border-radius: 50%;
    animation: wa-dot 1.2s ease infinite;
}
.wa-typing span:nth-child(2) { animation-delay: 0.2s; }
.wa-typing span:nth-child(3) { animation-delay: 0.4s; }

@keyframes wa-dot {
    0%,60%,100% { transform: translateY(0); opacity: 0.4; }
    30%          { transform: translateY(-6px); opacity: 1; }
}
@keyframes wa-msg-in {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
}

/* ── Opciones ── */
.wa-options {
    display: flex;
    flex-direction: column;
    gap: 7px;
    align-self: stretch;
    animation: wa-msg-in 0.35s ease;
}
.wa-opt-btn {
    background: rgba(212,175,55,0.08);
    border: 1px solid rgba(212,175,55,0.25);
    color: #e8e8e8;
    padding: 9px 13px;
    border-radius: 10px;
    text-align: left;
    cursor: pointer;
    font-size: 13px;
    font-family: inherit;
    transition: background 0.2s, border-color 0.2s, transform 0.15s;
    line-height: 1.3;
}
.wa-opt-btn:hover {
    background: rgba(212,175,55,0.18);
    border-color: rgba(212,175,55,0.5);
    transform: translateX(3px);
}
.wa-opt-btn:active { transform: translateX(1px); }
.wa-opt-btn.selected {
    background: rgba(212,175,55,0.2);
    border-color: #d4af37;
    color: #d4af37;
    pointer-events: none;
}

/* ── Input de texto ── */
.wa-input-row {
    display: flex;
    gap: 8px;
    align-self: stretch;
    animation: wa-msg-in 0.35s ease;
}
.wa-text-input {
    flex: 1;
    background: #1e1e1e;
    border: 1px solid rgba(212,175,55,0.25);
    border-radius: 10px;
    color: #e8e8e8;
    font-size: 13px;
    font-family: inherit;
    padding: 9px 12px;
    outline: none;
    transition: border-color 0.2s;
}
.wa-text-input::placeholder { color: #555; }
.wa-text-input:focus { border-color: #d4af37; }
.wa-send-btn {
    background: linear-gradient(135deg, #d4af37, #b89658);
    border: none;
    border-radius: 10px;
    color: #0a0a0a;
    width: 40px;
    cursor: pointer;
    font-size: 17px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: transform 0.15s, opacity 0.2s;
}
.wa-send-btn:hover { transform: scale(1.05); }
.wa-send-btn:disabled { opacity: 0.4; cursor: default; }

/* ── Footer / CTA ── */
.wa-footer {
    flex-shrink: 0;
    padding: 12px 14px;
    background: #111;
    border-top: 1px solid rgba(255,255,255,0.06);
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.wa-whatsapp-cta {
    width: 100%;
    padding: 13px;
    background: linear-gradient(135deg, #25d366 0%, #128c4f 100%);
    border: none;
    border-radius: 12px;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 18px rgba(37,211,102,0.3);
    animation: wa-msg-in 0.4s ease;
}
.wa-whatsapp-cta:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(37,211,102,0.45);
}
.wa-restart-btn {
    background: none;
    border: none;
    color: #666;
    font-size: 12px;
    font-family: inherit;
    cursor: pointer;
    text-align: center;
    padding: 2px;
    transition: color 0.2s;
    text-decoration: underline;
}
.wa-restart-btn:hover { color: #b0b0b0; }

/* Powered by */
.wa-powered {
    font-size: 10px;
    color: #333;
    text-align: center;
    padding: 4px 14px 10px;
    flex-shrink: 0;
    background: #111;
    letter-spacing: 0.3px;
}

/* ── Responsive ── */
@media (max-width: 480px) {
    #wa-assistant-root { bottom: 16px; right: 16px; }
    #wa-window {
        width: calc(100vw - 32px);
        bottom: 78px;
        right: 0;
        height: 480px;
    }
    #wa-btn { width: 56px; height: 56px; }
}
`;

    // ─── ESTADO ───────────────────────────────────────────────────────────────
    let state = {
        open:      false,
        step:      'welcome',
        data:      {},
        waUrl:     null,
        done:      false,
        ctxVehicle: null,   // contexto detectado de la página
    };

    // ─── HELPERS ─────────────────────────────────────────────────────────────
    function formatMsg(text, data) {
        return text.replace(/\{(\w+)\}/g, (_, k) => data[k] || '');
    }

    function openWhatsApp() {
        if (state.waUrl) window.open(state.waUrl, '_blank', 'noopener,noreferrer');
    }

    function buildWaUrl(summaryKey) {
        const gen = MESSAGES[summaryKey];
        if (!gen) return null;
        const text = gen(state.data);
        return `https://wa.me/${CFG.phone}?text=${encodeURIComponent(text)}`;
    }

    // ─── DETECCIÓN DE CONTEXTO DE PÁGINA ─────────────────────────────────────
    function detectPageContext() {
        const path = window.location.pathname;
        const title = document.title || '';

        if (path.includes('/vehiculos/') || path.includes('detalle-vehiculo')) {
            const h1 = document.querySelector('h1, .vehicle-title, .detalle-titulo');
            const marca = document.querySelector('[data-marca], .vehicle-marca');
            const modelo = document.querySelector('[data-modelo], .vehicle-modelo');
            let name = '';
            if (h1) name = h1.textContent.trim().substring(0, 60);
            else if (marca && modelo) name = `${marca.textContent} ${modelo.textContent}`.trim();
            if (name) state.ctxVehicle = name;
        }

        if (path.includes('simulador-credito')) {
            state.step = 'fin_value';
        }
        if (path.includes('vender') || title.toLowerCase().includes('vender')) {
            state.step = 'sell_brand';
        }
    }

    // ─── DOM ─────────────────────────────────────────────────────────────────
    let root, btn, notif, win, messagesEl, footerEl;

    function buildDOM() {
        // Inyectar estilos
        const style = document.createElement('style');
        style.textContent = CSS;
        document.head.appendChild(style);

        // Raíz
        root = document.createElement('div');
        root.id = 'wa-assistant-root';

        // Botón
        btn = document.createElement('button');
        btn.id = 'wa-btn';
        btn.setAttribute('aria-label', 'Abrir asistente ALTORRA Cars');
        btn.innerHTML = svgWA();

        notif = document.createElement('div');
        notif.id = 'wa-notif';
        notif.textContent = '1';
        btn.appendChild(notif);

        // Ventana
        win = document.createElement('div');
        win.id = 'wa-window';
        win.setAttribute('role', 'dialog');
        win.setAttribute('aria-label', 'Asistente ALTORRA Cars');

        // Header
        const header = document.createElement('div');
        header.className = 'wa-header';
        header.innerHTML = `
            <div class="wa-header-left">
                <div class="wa-avatar">AC</div>
                <div>
                    <div class="wa-header-name">${CFG.name}</div>
                    <div class="wa-header-status">● En línea</div>
                </div>
            </div>
            <button class="wa-close-btn" aria-label="Cerrar asistente">✕</button>`;

        // Mensajes
        messagesEl = document.createElement('div');
        messagesEl.className = 'wa-messages';
        messagesEl.setAttribute('aria-live', 'polite');

        // Footer
        footerEl = document.createElement('div');
        footerEl.className = 'wa-footer';
        footerEl.style.display = 'none';

        // Powered by
        const powered = document.createElement('div');
        powered.className = 'wa-powered';
        powered.textContent = 'ALTORRA CARS • Tu aliado automotriz en Cartagena';

        win.appendChild(header);
        win.appendChild(messagesEl);
        win.appendChild(footerEl);
        win.appendChild(powered);

        root.appendChild(win);
        root.appendChild(btn);
        document.body.appendChild(root);

        // Eventos
        btn.addEventListener('click', toggleChat);
        header.querySelector('.wa-close-btn').addEventListener('click', closeChat);

        // Cerrar al hacer click fuera
        document.addEventListener('click', function (e) {
            if (state.open && !root.contains(e.target)) closeChat();
        });
    }

    // ─── CONTROL DEL CHAT ─────────────────────────────────────────────────────
    function toggleChat() {
        state.open ? closeChat() : openChat();
    }

    function openChat() {
        state.open = true;
        btn.classList.add('open');
        btn.innerHTML = svgClose();
        btn.appendChild(notif);    // notif siempre dentro del btn
        win.classList.add('visible');
        notif.classList.add('hidden');

        if (messagesEl.children.length === 0) {
            setTimeout(() => startFlow(), 250);
        }
        setTimeout(() => messagesEl.scrollTop = messagesEl.scrollHeight, 100);
    }

    function closeChat() {
        state.open = false;
        btn.classList.remove('open');
        btn.innerHTML = svgWA();
        btn.appendChild(notif);
        win.classList.remove('visible');
    }

    // ─── FLUJO ───────────────────────────────────────────────────────────────
    function startFlow() {
        state.data  = {};
        state.done  = false;
        state.waUrl = null;
        messagesEl.innerHTML = '';
        footerEl.style.display = 'none';
        footerEl.innerHTML = '';

        // Si hay contexto de vehículo, personalizar welcome
        if (state.ctxVehicle) {
            showBotMsg(`¡Hola! 👋 Veo que estás viendo el *${state.ctxVehicle}*.\n\n¿En qué te puedo ayudar?`, () => {
                showStep('welcome');
            });
        } else {
            showStep(state.step || 'welcome');
        }
    }

    function showStep(stepKey) {
        // Resumen / final
        if (stepKey.startsWith('_summary_')) {
            const summaryMsg = SUMMARY_MESSAGES[stepKey] || '¡Listo! Te conecto con un asesor.';
            state.waUrl = buildWaUrl(stepKey);
            showBotMsg(summaryMsg, () => showCTA());
            return;
        }

        const flow = FLOWS[stepKey];
        if (!flow) return;

        const msg = formatMsg(flow.msg, state.data);

        showBotMsg(msg, () => {
            if (flow.type === 'input') {
                showInputField(flow, stepKey);
            } else if (flow.opts) {
                showOptions(flow, stepKey);
            }
        });
    }

    function showOptions(flow, stepKey) {
        const wrap = document.createElement('div');
        wrap.className = 'wa-options';

        flow.opts.forEach(opt => {
            const button = document.createElement('button');
            button.className = 'wa-opt-btn';
            button.textContent = opt.label;
            button.addEventListener('click', () => {
                // Desactivar todos
                wrap.querySelectorAll('.wa-opt-btn').forEach(b => {
                    b.classList.add('selected');
                    b.disabled = true;
                });
                button.classList.add('selected');

                // Guardar dato
                if (flow.key) state.data[flow.key] = opt.value || opt.label;

                // Eco usuario
                addUserBubble(opt.label);

                // Siguiente paso
                const next = opt.next || flow.next;
                setTimeout(() => showStep(next), 600);
            });
            wrap.appendChild(button);
        });

        messagesEl.appendChild(wrap);
        scrollBottom();
    }

    function showInputField(flow, stepKey) {
        const row = document.createElement('div');
        row.className = 'wa-input-row';

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'wa-text-input';
        input.placeholder = flow.placeholder || 'Escribe aquí...';
        input.maxLength = 100;

        const sendBtn = document.createElement('button');
        sendBtn.className = 'wa-send-btn';
        sendBtn.innerHTML = '➤';
        sendBtn.title = 'Enviar';

        const submit = () => {
            const val = input.value.trim();
            if (!val) { input.focus(); return; }

            // Desactivar input
            input.disabled = true;
            sendBtn.disabled = true;

            // Guardar dato
            if (flow.key) state.data[flow.key] = val;

            // Eco usuario
            addUserBubble(val);

            // Siguiente paso
            setTimeout(() => showStep(flow.next), 600);
        };

        sendBtn.addEventListener('click', submit);
        input.addEventListener('keydown', e => { if (e.key === 'Enter') submit(); });

        row.appendChild(input);
        row.appendChild(sendBtn);
        messagesEl.appendChild(row);
        scrollBottom();
        setTimeout(() => input.focus(), 100);
    }

    function showCTA() {
        footerEl.innerHTML = '';
        footerEl.style.display = 'flex';

        const ctaBtn = document.createElement('button');
        ctaBtn.className = 'wa-whatsapp-cta';
        ctaBtn.innerHTML = `${svgWASmall()} Continuar por WhatsApp`;
        ctaBtn.addEventListener('click', openWhatsApp);

        const restartBtn = document.createElement('button');
        restartBtn.className = 'wa-restart-btn';
        restartBtn.textContent = 'Volver a empezar →';
        restartBtn.addEventListener('click', () => {
            state.step = 'welcome';
            startFlow();
        });

        footerEl.appendChild(ctaBtn);
        footerEl.appendChild(restartBtn);
        state.done = true;
    }

    // ─── RENDERIZADO DE MENSAJES ──────────────────────────────────────────────
    function showBotMsg(text, callback) {
        // Indicador de escritura
        const typing = document.createElement('div');
        typing.className = 'wa-typing';
        typing.innerHTML = '<span></span><span></span><span></span>';
        messagesEl.appendChild(typing);
        scrollBottom();

        setTimeout(() => {
            typing.remove();
            const bubble = document.createElement('div');
            bubble.className = 'wa-bubble';
            bubble.innerHTML = formatBold(escapeHtml(text));
            messagesEl.appendChild(bubble);
            scrollBottom();
            if (callback) callback();
        }, CFG.typing_speed);
    }

    function addUserBubble(text) {
        const bubble = document.createElement('div');
        bubble.className = 'wa-bubble-user';
        bubble.textContent = text;
        messagesEl.appendChild(bubble);
        scrollBottom();
    }

    function scrollBottom() {
        requestAnimationFrame(() => {
            messagesEl.scrollTop = messagesEl.scrollHeight;
        });
    }

    function formatBold(text) {
        // Convierte *texto* en <b>texto</b>
        return text.replace(/\*(.*?)\*/g, '<b>$1</b>');
    }

    function escapeHtml(str) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    // ─── NOTIFICACIÓN INICIAL ─────────────────────────────────────────────────
    function scheduleGreeting() {
        const seen = sessionStorage.getItem(CFG.storage_key);
        if (seen) {
            notif.classList.add('hidden');
            return;
        }
        setTimeout(() => {
            if (!state.open) {
                notif.classList.remove('hidden');
            }
        }, CFG.greeting_delay);
    }

    // ─── SVG ICONS ────────────────────────────────────────────────────────────
    function svgWA() {
        return `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path fill="#0a0a0a" d="M16 0C7.163 0 0 7.163 0 16c0 2.825.739 5.488 2.037 7.813L.112 31.488l8.013-2.038C10.413 30.725 13.113 32 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.388c-2.475 0-4.8-.675-6.787-1.85l-.488-.288-5.05 1.288 1.338-4.863-.313-.512C3.338 21.088 2.612 18.6 2.612 16 2.612 8.6 8.6 2.612 16 2.612S29.388 8.6 29.388 16 23.4 29.388 16 29.388zm7.35-10.037c-.4-.2-2.363-1.175-2.725-1.3-.363-.125-.625-.2-.888.2-.262.4-1.012 1.3-1.237 1.563-.225.262-.45.3-.85.1-.4-.2-1.688-.625-3.213-2-.188-1.075-1.338-1.8-1.738-2-.4-.2-.038-.3.175-.4.175-.175.4-.45.6-.675.2-.225.263-.375.4-.625.138-.25.063-.475-.025-.675-.088-.2-.888-2.138-1.213-2.925-.325-.788-.65-.675-.888-.688-.225-.012-.475-.012-.725-.012s-.663.088-1.013.438c-.35.35-1.338 1.313-1.338 3.2s1.375 3.713 1.563 3.975c.188.263 2.638 4.025 6.4 5.638.888.388 1.588.625 2.125.8.9.275 1.713.238 2.363.15.725-.113 2.238-.925 2.55-1.8.313-.875.313-1.625.225-1.8-.088-.175-.338-.275-.738-.475z"/>
        </svg>`;
    }

    function svgClose() {
        return `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:24px;height:24px;" aria-hidden="true">
            <path stroke="#e8e8e8" stroke-width="2.5" stroke-linecap="round" d="M6 6l12 12M18 6L6 18"/>
        </svg>`;
    }

    function svgWASmall() {
        return `<svg viewBox="0 0 24 24" fill="currentColor" style="width:18px;height:18px;flex-shrink:0" aria-hidden="true">
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.554 4.116 1.528 5.86L.084 23.616l5.9-1.527A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22.034c-1.856 0-3.6-.506-5.09-1.388l-.366-.216-3.788.965 1.003-3.647-.235-.383A9.96 9.96 0 012.034 12C2.034 6.448 6.448 2.034 12 2.034S21.966 6.448 21.966 12 17.552 21.966 12 21.966zm5.513-7.528c-.3-.15-1.772-.881-2.044-.975-.272-.094-.469-.15-.666.15-.197.3-.759.975-.928 1.172-.169.197-.337.225-.637.075-.3-.15-1.266-.469-2.41-1.5-.141-.806-1.003-1.35-1.303-1.5-.3-.15-.028-.225.131-.3.131-.131.3-.337.45-.506.15-.169.197-.281.3-.469.103-.188.047-.356-.019-.506-.066-.15-.666-1.603-.909-2.194-.244-.591-.488-.506-.666-.516-.169-.009-.356-.009-.544-.009s-.497.066-.759.328c-.262.263-1.003.984-1.003 2.4s1.031 2.784 1.172 2.978c.141.197 1.978 3.019 4.8 4.228.666.291 1.191.469 1.594.6.675.206 1.284.178 1.772.113.544-.084 1.678-.694 1.913-1.35.234-.656.234-1.219.169-1.35-.066-.131-.253-.206-.553-.356z"/>
        </svg>`;
    }

    // ─── INICIALIZACIÓN ───────────────────────────────────────────────────────
    function init() {
        if (document.getElementById('wa-assistant-root')) return; // ya existe
        detectPageContext();
        buildDOM();
        scheduleGreeting();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
