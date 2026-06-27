/**
 * ALTORRA CARS — ALTOR Bot v2 (rediseño F4/F5, TODO-38) ⟦OPUS-4.8⟧
 * ================================================================
 * Web Component + Shadow DOM. Módulo PARALELO a v1 (`js/concierge/concierge.js`),
 * flag-gated, FORK DURO (Decisión Fuerte Fase C, veredicto Gemini verificado):
 *   - v1 queda 100% intacto; el flag en components.js monta v1 XOR v2.
 *   - Core compartido = Firestore (`conciergeChats`/`solicitudes`) + motor por
 *     hooks globales (window.AltorraDualCore / _altorraConciergeRespondLocal).
 *   - Storage namespace SEPARADO `altorra_concierge_v2_session` (#5 Gemini).
 *   - Modales (auth / gate legal Ley 1581) se montan FUERA del shadow vía
 *     CustomEvent (#1 Gemini) — el shadow nunca atrapa un modal de negocio.
 *   - API global IDÉNTICA a v1 (resetSession/openWithVehicleContext/…) para que
 *     auth.js (resetSession en logout) y detalle-vehiculo no se enteren del cambio.
 *
 * Entrada ENGINE-AWARE ternaria (D1): mode×engine →
 *   live(humano) → chat libre · llm → chat libre · freecore → SOLO botones.
 *
 * SEGURIDAD: nada de innerHTML con datos. Texto del usuario → textContent
 * (anti-XSS); markup estático/confiable (shell + iconos propios) → frag().
 *
 * TRAMO 1: estado Free Core buttons-only (ships first, D6). Hooks marcados para
 * los tramos siguientes: LLM chat libre · tarjeta vehículo inline (C#1) ·
 * móvil @container · escalado humano · gate captura · modal cierre (#6).
 */
(function () {
    'use strict';
    if (window.customElements && customElements.get('altor-bot')) return;

    var V2_STORAGE_KEY = 'altorra_concierge_v2_session';
    var V1_STORAGE_KEY = 'altorra_concierge_session';
    var WHATSAPP_NUMBER = '+573235016747';   // mismo número del v1
    var STALE_MS = 12 * 60 * 60 * 1000;      // §80: sesión abandonada >12h → reset al abrir

    /* Helper: fragmento desde markup ESTÁTICO Y CONFIABLE (nunca datos del usuario) */
    function frag(trustedHtml) {
        return document.createRange().createContextualFragment(trustedHtml);
    }

    /* ── Tokens de marca (Fase B) — scoped al shadow, no fugan ──────────── */
    var STYLE = [
        ':host{--g:#B89658;--g2:#D9BD83;--on-g:#17130E;--bg:#17130E;--surface:#1E1810;',
        '--bubble:#241D14;--bd:#2C241A;--bd2:#352A1C;--tx:#F4EEE3;--tx2:#9A9081;',
        '--tx3:#736A5C;--ok:#5BBF66;font-family:Manrope,system-ui,sans-serif;}',
        '*{box-sizing:border-box;margin:0;}',
        // FAB en reposo = oro QUIETO (glow estático, sin bucles infinitos — comité marca/a11y).
        // El metal precioso brilla, no parpadea. Animación SOLO en hover.
        '.fab{position:fixed;right:20px;bottom:20px;width:66px;height:66px;background:none;border:none;cursor:pointer;padding:0;z-index:2147483000;',
        'filter:drop-shadow(0 6px 16px rgba(184,150,88,.5)) drop-shadow(0 2px 6px rgba(0,0,0,.4));transition:transform .2s ease,filter .2s ease;}',
        '.fab:hover{transform:scale(1.06);filter:drop-shadow(0 8px 22px rgba(201,166,99,.75)) drop-shadow(0 2px 8px rgba(0,0,0,.4));}',
        '.fab svg{width:30px;height:30px;color:var(--on-g);}',
        '.fab.hidden{display:none;}',
        '.panel{position:fixed;right:20px;bottom:20px;width:380px;max-width:calc(100vw - 24px);',
        'height:600px;max-height:calc(100vh - 40px);background:var(--bg);border:1px solid var(--bd);',
        'border-radius:20px;overflow:hidden;display:none;flex-direction:column;z-index:2147483001;',
        'box-shadow:0 18px 50px rgba(0,0,0,.45);}',
        '.panel.open{display:flex;}',
        '@media (max-width:560px){.panel{right:0;bottom:0;top:0;left:0;width:100vw;height:100dvh;',
        'max-width:100vw;max-height:100dvh;border-radius:0;border:0;}.fab{right:16px;bottom:16px;}}',
        '.hd{display:flex;align-items:center;gap:11px;padding:13px 15px;background:var(--surface);',
        'border-bottom:1px solid var(--bd);flex-shrink:0;}',
        '.av{position:relative;width:40px;height:40px;border-radius:50%;background:var(--g);',
        'display:flex;align-items:center;justify-content:center;flex-shrink:0;}',
        '.av svg{width:22px;height:22px;color:var(--on-g);}',
        '.av-img{width:100%;height:100%;object-fit:cover;border-radius:50%;display:block;}',
        '.fab-img{width:100%;height:100%;object-fit:contain;display:block;}',
        '.vbadge{position:absolute;right:-3px;bottom:-3px;width:16px;height:16px;border-radius:50%;',
        'background:var(--g);border:2px solid var(--surface);display:flex;align-items:center;justify-content:center;}',
        '.vbadge svg{width:9px;height:9px;color:var(--on-g);}',
        '.nm{font-family:"Instrument Serif",Georgia,serif;font-size:22px;color:var(--tx);letter-spacing:.6px;line-height:1;}',
        '.sub{font-size:11.5px;color:var(--tx2);margin-top:4px;display:flex;align-items:center;gap:5px;}',
        '.dot{width:7px;height:7px;border-radius:50%;background:var(--g2);display:inline-block;}',
        '.hd-act{margin-left:auto;display:flex;gap:8px;}',
        '.hd-act button{background:none;border:none;color:var(--tx2);cursor:pointer;padding:2px;display:flex;}',
        '.hd-act svg{width:18px;height:18px;}',
        '.body{flex:1;overflow-y:auto;padding:18px 15px;display:flex;flex-direction:column;gap:4px;}',
        '.bot{max-width:82%;align-self:flex-start;background:var(--bubble);color:#EAE1D2;font-size:13.5px;',
        'line-height:1.55;padding:11px 14px;border-radius:5px 16px 16px 16px;}',
        '.bot b{color:var(--g2);font-weight:600;}',
        '.user{max-width:80%;align-self:flex-end;background:var(--g);color:#1A150E;font-size:13.5px;',
        'line-height:1.5;padding:10px 13px;border-radius:16px 5px 16px 16px;font-weight:500;}',
        '.time{font-size:10.5px;color:var(--tx3);margin:5px 2px 8px;}',
        '.engine-note{display:flex;align-items:center;gap:7px;background:#1C160F;border:1px solid var(--bd);',
        'border-radius:10px;padding:8px 11px;margin-top:6px;}',
        '.engine-note svg{width:15px;height:15px;color:var(--g);flex-shrink:0;}',
        '.engine-note span{font-size:11px;color:var(--tx2);line-height:1.4;}',
        '.input{border-top:1px solid var(--bd);background:#1A150F;padding:13px 15px 15px;flex-shrink:0;}',
        '.hint{font-size:11px;color:var(--tx2);margin-bottom:10px;text-align:center;letter-spacing:.2px;}',
        '.btns{display:flex;flex-direction:column;gap:7px;}',
        '.qb{display:flex;align-items:center;gap:10px;padding:10px 13px;border-radius:12px;font-size:13.5px;',
        'font-weight:500;cursor:pointer;border:none;text-align:left;width:100%;font-family:inherit;}',
        '.qb svg{width:18px;height:18px;flex-shrink:0;}',
        '.qb-p{background:var(--g);color:var(--on-g);}',
        '.qb-s{background:#211A12;border:1px solid var(--bd2);color:#E4D9C6;}',
        '.qb-ghost{background:transparent;border:1px solid var(--bd);color:var(--tx2);justify-content:center;font-size:12.5px;}',
        '.inbar{display:flex;align-items:center;gap:9px;}',
        '.field{flex:1;background:#231C13;border:1px solid var(--bd2);border-radius:22px;padding:10px 15px;',
        'color:var(--tx);font-size:13px;font-family:inherit;outline:none;}',
        '.field::placeholder{color:var(--tx3);}',
        '.gate-consent{display:flex;gap:8px;align-items:flex-start;font-size:11.5px;color:var(--tx2);line-height:1.4;cursor:pointer;}',
        '.gate-consent input{margin-top:2px;flex-shrink:0;}',
        '.gate-err{font-size:11.5px;color:#E5736B;min-height:14px;}',
        '.send{width:40px;height:40px;border-radius:50%;background:var(--g);border:none;cursor:pointer;',
        'display:flex;align-items:center;justify-content:center;flex-shrink:0;}',
        '.send svg{width:19px;height:19px;color:var(--on-g);}',
        '.typing{display:flex;gap:4px;align-items:center;padding:13px 14px;width:auto;}',
        '.td{width:6px;height:6px;border-radius:50%;background:var(--tx2);animation:tb 1.2s infinite;}',
        '.td:nth-child(2){animation-delay:.2s;}.td:nth-child(3){animation-delay:.4s;}',
        '@keyframes tb{0%,60%,100%{opacity:.3;transform:translateY(0);}30%{opacity:1;transform:translateY(-3px);}}',
        // Control "Empezar de nuevo" (reset) en el header — siempre visible (fix B3)
        '.hd-act button{min-width:32px;min-height:32px;padding:7px;border-radius:8px;}',   // tap target ≥32px
        '.hd-act button.rst{display:flex;align-items:center;gap:4px;background:none;border:1px solid var(--bd2);',
        'color:var(--g2);border-radius:20px;padding:5px 9px;min-width:auto;min-height:auto;font:inherit;font-size:11px;cursor:pointer;}',
        '.rst svg{width:13px;height:13px;}',
        // Pie de navegación anti-callejón (fix B2)
        '.navrow{display:flex;gap:7px;margin-bottom:8px;}',
        '.navb{flex:1;display:flex;align-items:center;justify-content:center;gap:6px;padding:9px;border-radius:10px;',
        'border:1px solid var(--bd2);color:#D9CDB6;font-size:12.5px;background:#1E1710;cursor:pointer;font-family:inherit;}',
        '.navb svg{width:14px;height:14px;}',
        '.qb-div{height:1px;background:var(--bd);margin:9px 2px 7px;}',
        // Fila de escapes humanos (asesor/WhatsApp) como chips discretos, no botones que compiten
        '.escrow{display:flex;gap:7px;}',
        '.escb{flex:1;display:flex;align-items:center;justify-content:center;gap:6px;padding:8px;border-radius:10px;',
        'border:1px solid var(--bd);color:#B6AC99;font-size:12px;background:transparent;cursor:pointer;font-family:inherit;}',
        '.escb svg{width:14px;height:14px;}',
        // Confirmación in-app del reset (no window.confirm — fix B3)
        '.confirm{padding:2px;}',
        '.confirm .ct{font-size:13px;color:var(--tx);margin-bottom:11px;line-height:1.45;}',
        // Foco de teclado visible en TODO control (a11y AA 2.4.7)
        '.fab:focus-visible,.qb:focus-visible,.navb:focus-visible,.escb:focus-visible,.rst:focus-visible,',
        '.hd-act button:focus-visible,.field:focus-visible,.send:focus-visible,.gate-consent input:focus-visible{',
        'outline:2px solid var(--g2);outline-offset:2px;border-radius:8px;}',
        // Respeto a quien pide menos movimiento (a11y 2.3.3 + doctrina §3.1)
        '@media(prefers-reduced-motion:reduce){.fab,.td{animation:none!important;transition:none!important;}}',
        '.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);}'
    ].join('');

    /* ── Iconos de línea (SVG propios, confiables — no emoji, mejora Fase B) ── */
    var IC = {
        robot: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 2v2M15 2v2"/><rect x="4" y="6" width="16" height="12" rx="3"/><path d="M9 12h.01M15 12h.01M9 16h6M2 12h2M20 12h2"/></svg>',
        check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg>',
        minus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14"/></svg>',
        x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
        shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg>',
        car: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 11l1.5-4.5A2 2 0 018.4 5h7.2a2 2 0 011.9 1.5L19 11M5 11h14v5H5zM7 16v2M17 16v2M7 13h.01M17 13h.01"/></svg>',
        card: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/></svg>',
        cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="5" width="16" height="16" rx="2"/><path d="M16 3v4M8 3v4M4 11h16"/></svg>',
        headset: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14v-2a8 8 0 0116 0v2M4 14a2 2 0 002 2h1v-5H6a2 2 0 00-2 2zM20 14a2 2 0 01-2 2h-1v-5h1a2 2 0 012 2zM18 16v1a3 3 0 01-3 3h-3"/></svg>',
        wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.8 14.01c-.24.68-1.4 1.3-1.93 1.38-.49.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.79-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-3 0-1.43.75-2.13 1.02-2.42.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.59.82 2.02.89 2.17.07.14.12.31.02.5-.09.19-.14.31-.27.48-.14.16-.29.37-.41.49-.14.14-.28.29-.12.57.16.27.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.21 1.37.27.14.43.12.59-.07.16-.19.68-.79.86-1.07.18-.27.36-.22.61-.13.25.09 1.6.75 1.87.89.27.14.46.21.53.32.07.12.07.66-.17 1.34z"/></svg>',
        send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/></svg>',
        refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8M21 3v5h-5M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16M3 21v-5h5"/></svg>',
        home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10l9-7 9 7M5 9v11h5v-6h4v6h5V9"/></svg>',
        back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>',
        cash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 12h.01M18 12h.01"/></svg>'
    };

    /* ── Entrada ENGINE-AWARE ternaria (D1) ────────────────────────────── */
    function getInputMode(state) {
        if (state.mode === 'live' || state.mode === 'queue') return 'free';  // humano/cola → chat libre
        if (state.engine === 'llm') return 'free';  // LLM activo → chat libre
        return 'buttons';                            // Free Core → solo botones
    }

    /* sessionId nuevo (namespace v2, distinto del v1) — sesión anónima fresca */
    function newSessionId() {
        return 'cncv2_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
    }
    function freshState() {
        return {
            mode: 'bot', engine: 'freecore', messages: [], leadId: null,
            sessionId: newSessionId(),
            sourcePage: (typeof location !== 'undefined' && location.pathname) || '/',
            sourceVehicleId: (window.PRERENDERED_VEHICLE_ID || null),
            lastActivityAt: Date.now(),
            currentNodeId: 'welcome', navStack: [],
            _chatDocCreated: false, _leadCreated: false, _v: 2
        };
    }

    /* ── Árbol de botones Free Core como GRAFO DE NODOS (rediseño M-23) ──────
       Cada nodo: { text, buttons[], parent }. La navegación es por id (state.currentNodeId);
       el pie [← Volver]/[Inicio] + los escapes humanos se AUTO-INYECTAN en _renderInput
       → NINGÚN nodo nace sin salida (fix B2, callejón verificado en la captura del dueño).
       Payloads tipados que send() intercepta ANTES de tratarlos como mensaje:
         node:<id> · goto:<url> · act:gate:<for> · act:escalate · __whatsapp__ · __home__ · __back__
       Los deep-link `goto:` llevan el filtro REAL que busqueda.html ahora lee al cargar (fix B1):
       categoria∈{suv,pickup,sedan,hatchback} (verificado en inventario vivo) · precioMin/Max en
       dígitos puros. NO se ofrece ?marca= (filtro por igualdad exacta + select por id = trampa, diferido). */
    var NODES = {
        welcome: {
            root: true,
            text: 'Hola, soy ALTOR — ¿qué buscas hoy?',
            buttons: [
                { ic: 'car',  label: 'Ver carros disponibles',                 payload: 'node:ver_autos',    cls: 'qb-p' },
                { ic: 'card', label: 'Financiación a tu medida',               payload: 'node:financiacion', cls: 'qb-s' },
                { ic: 'cash', label: '¿Cuánto vale mi carro? (parte de pago)', payload: 'node:vender',       cls: 'qb-s' },
                { ic: 'cal',  label: 'Agendar una visita',                     payload: 'act:gate:cita',     cls: 'qb-s' }
            ]
        },
        ver_autos: {
            parent: 'welcome',
            text: '¿Cómo prefieres buscar?',
            buttons: [
                { ic: 'car',  label: 'Por tipo de carro',    payload: 'node:por_tipo',      cls: 'qb-p' },
                { ic: 'cash', label: 'Por presupuesto',      payload: 'node:por_precio',    cls: 'qb-s' },
                { ic: 'car',  label: 'Ver todo el catálogo', payload: 'goto:busqueda.html', cls: 'qb-s' }
            ]
        },
        por_tipo: {
            parent: 'ver_autos',
            text: 'Elige la carrocería — te abro el catálogo ya filtrado:',
            buttons: [
                { ic: 'car', label: 'Camioneta y 4x4 (SUV)', payload: 'goto:busqueda.html?categoria=suv',       cls: 'qb-s' },
                { ic: 'car', label: 'Familiar / sedán',      payload: 'goto:busqueda.html?categoria=sedan',     cls: 'qb-s' },
                { ic: 'car', label: 'Pickup / platón',       payload: 'goto:busqueda.html?categoria=pickup',    cls: 'qb-s' },
                { ic: 'car', label: 'Pequeño / económico',   payload: 'goto:busqueda.html?categoria=hatchback', cls: 'qb-s' }
            ]
        },
        por_precio: {
            parent: 'ver_autos',
            text: '¿Cuál es tu presupuesto?',
            buttons: [
                { ic: 'cash', label: 'Hasta $40 millones',   payload: 'goto:busqueda.html?precioMax=40000000',                      cls: 'qb-s' },
                { ic: 'cash', label: '$40 a $70 millones',   payload: 'goto:busqueda.html?precioMin=40000000&precioMax=70000000',   cls: 'qb-s' },
                { ic: 'cash', label: '$70 a $120 millones',  payload: 'goto:busqueda.html?precioMin=70000000&precioMax=120000000',  cls: 'qb-s' },
                { ic: 'cash', label: 'Más de $120 millones', payload: 'goto:busqueda.html?precioMin=120000000',                     cls: 'qb-s' }
            ]
        },
        financiacion: {
            parent: 'welcome',
            text: 'Te financiamos con cuotas a tu medida y aprobación rápida. El plan exacto lo arma un asesor según tu perfil — ¿cómo seguimos?',
            buttons: [
                { ic: 'cal',     label: 'Agendar para cotizar', payload: 'act:gate:cita', cls: 'qb-p' },
                { ic: 'headset', label: 'Hablar con un asesor', payload: 'act:escalate',  cls: 'qb-s' }
            ]
        },
        vender: {
            parent: 'welcome',
            text: 'Te hacemos peritaje gratis y te recibimos el carro en parte de pago o consignación. ¿Coordinamos el avalúo?',
            buttons: [
                { ic: 'cal',     label: 'Pedir avalúo',         payload: 'act:gate:cita', cls: 'qb-p' },
                { ic: 'headset', label: 'Hablar con un asesor', payload: 'act:escalate',  cls: 'qb-s' }
            ]
        },
        // Nodo terminal honesto tras escalar: v2 aún NO recibe respuestas del asesor en vivo
        // (no hay onSnapshot del Hub), así que NO abrimos un chat libre al vacío (fix caza-bugs).
        escalado: {
            parent: 'welcome', noEscape: true,   // ya escaló: no re-ofrecer "asesor" (evita lead duplicado)
            text: 'Listo — un asesor de Altorra ya fue notificado y te contactará muy pronto. Si prefieres, sigue por WhatsApp ahora mismo.',
            buttons: [
                { ic: 'wa', label: 'Continuar por WhatsApp', payload: '__whatsapp__', cls: 'qb-p' }
            ]
        }
    };
    function getNode(id) { return NODES[id] || NODES.welcome; }

    /* Crea un botón quick-reply de forma segura (icono confiable + label textContent) */
    function makeQB(def, onClick) {
        var btn = document.createElement('button');
        btn.className = 'qb ' + (def.cls || 'qb-s');
        btn.appendChild(frag(IC[def.ic] || ''));            // icono propio = confiable
        btn.appendChild(document.createTextNode(def.label)); // label = texto seguro
        btn.addEventListener('click', function () { onClick(def.payload, def.label); });
        return btn;
    }

    /* Botón compacto de navegación/escape (icono confiable + label seguro). */
    function makeMini(cls, iconHtml, label, onClick) {
        var b = document.createElement('button');
        b.className = cls;
        b.appendChild(frag(iconHtml || ''));
        b.appendChild(document.createTextNode(label));
        b.addEventListener('click', function () { onClick(); });
        return b;
    }

    class AltorBot extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
            this.state = freshState();
            this._open = false;
        }

        connectedCallback() {
            this._ensureFonts();
            this._restore();
            this._render();
            this._wireAuth();   // §234 logout-wipe + bind uid (self-contained; NO toca auth.js)
        }

        /* §234 (Ley 1581 / PC mostrador): el v2 se auto-suscribe al auth. Si un usuario
           logueado cierra sesión, limpia su chat para el siguiente anónimo. Self-contained
           → NO modifica auth.js (high-blast-radius y vivo). No-op si no hay Firebase. */
        _wireAuth() {
            var self = this;
            function attach(auth) {
                try {
                    self._wasLoggedIn = !!auth.currentUser;
                    auth.onAuthStateChanged(function (user) {
                        if (self._wasLoggedIn && !user) {
                            self.resetSession();                 // logout tras login → wipe §234
                        } else if (user) {
                            self.state.uid = user.uid;
                            if (!self.state.email) self.state.email = user.email || null;
                            self._persist();
                            self.applyAuthProfile();
                        }
                        self._wasLoggedIn = !!user;
                    });
                } catch (e) {}
            }
            if (window.auth) attach(window.auth);
            else if (window.firebaseReady && window.firebaseReady.then) {
                window.firebaseReady.then(function () { if (window.auth) attach(window.auth); });
            }
        }

        /* font-face del document SÍ aplica dentro del shadow; inyecta si falta */
        _ensureFonts() {
            if (document.getElementById('altor-v2-fonts')) return;
            var l = document.createElement('link');
            l.id = 'altor-v2-fonts';
            l.rel = 'stylesheet';
            l.href = 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600&family=Instrument+Serif&display=swap';
            document.head.appendChild(l);
        }

        /* Storage v2 separado (#5 Gemini) + migración 1-vía de v1 (transición suave) */
        _restore() {
            try {
                var raw = localStorage.getItem(V2_STORAGE_KEY);
                if (raw) {
                    this.state = Object.assign(this.state, JSON.parse(raw));
                    // invalida sesiones de versión vieja (limpia datos stale ya persistidos)
                    if (this.state._v !== 2) { this.state = freshState(); return; }
                    // §80 — sesión abandonada (>12h sin actividad) → arranca fresca al abrir
                    var la = this.state.lastActivityAt;
                    if (la && (Date.now() - la) > STALE_MS) { this.state = freshState(); }
                    return;
                }
                // v2 arranca LIMPIO: NO migra la conversación del v1 (arrastraba mensajes
                // viejos/escalados sin estado → "conversación vieja" persistente, bug live 27/06).
            } catch (e) {}
        }
        _persist() {
            this.state.lastActivityAt = Date.now();   // §80: marca actividad (reset por abandono)
            try { localStorage.setItem(V2_STORAGE_KEY, JSON.stringify(this.state)); } catch (e) {}
        }

        _render() {
            var sr = this.shadowRoot;
            while (sr.firstChild) sr.removeChild(sr.firstChild);

            var st = document.createElement('style');
            st.textContent = STYLE;                          // textContent en <style> = seguro
            sr.appendChild(st);

            // Shell estático y confiable (sin datos del usuario)
            sr.appendChild(frag(
                '<h2 class="sr-only">Asistente virtual ALTOR de Altorra Cars</h2>' +
                '<button class="fab" aria-label="Abrir chat con ALTOR"><img class="fab-img" src="/ALTOR.png" alt="" onerror="this.style.display=\'none\'"></button>' +
                '<section class="panel" role="dialog" aria-label="Chat con ALTOR">' +
                    '<header class="hd">' +
                        '<div class="av"><img class="av-img" src="/ALTOR.png" alt="ALTOR" onerror="this.style.display=\'none\'"><span class="vbadge">' + IC.check + '</span></div>' +
                        '<div><div class="nm">ALTOR</div>' +
                        '<div class="sub"><span class="dot"></span>En línea · Altorra Cars</div></div>' +
                        '<div class="hd-act">' +
                            '<button class="rst" aria-label="Empezar una conversación nueva">' + IC.refresh + '<span>Nuevo</span></button>' +
                            '<button class="min" aria-label="Minimizar">' + IC.minus + '</button>' +
                            '<button class="cls" aria-label="Cerrar">' + IC.x + '</button>' +
                        '</div>' +
                    '</header>' +
                    '<div class="body"></div>' +
                    '<div class="input"></div>' +
                '</section>'
            ));

            sr.querySelector('.fab').addEventListener('click', this.open.bind(this));
            sr.querySelector('.min').addEventListener('click', this.close.bind(this));
            sr.querySelector('.cls').addEventListener('click', this.close.bind(this));
            sr.querySelector('.rst').addEventListener('click', this._renderResetConfirm.bind(this));  // fix B3
            this._renderBody();
            this._renderInput();
        }

        _renderBody() {
            var box = this.shadowRoot.querySelector('.body');
            if (!box) return;
            while (box.firstChild) box.removeChild(box.firstChild);

            if (!this.state.messages.length) {
                // Saludo cálido sin disclaimer de motor (el comité de marca: una sala premium
                // no explica sus costuras). Sin timestamp 'Ahora' redundante en sesión fresca.
                box.appendChild(frag('<div class="bot">Hola, soy <b>ALTOR</b> — tu asistente en Altorra Cars. ¿Qué buscas hoy?</div>'));
                return;
            }
            // Mensajes: texto del usuario/bot → textContent (anti-XSS, #1 Gemini)
            this.state.messages.forEach(function (m) {
                var d = document.createElement('div');
                d.className = (m.from === 'user') ? 'user' : 'bot';
                d.textContent = m.text;
                box.appendChild(d);
            });
            box.scrollTop = box.scrollHeight;
        }

        /* Entrada según getInputMode (D1) — el corazón engine-aware */
        _renderInput() {
            var zone = this.shadowRoot.querySelector('.input');
            if (!zone) return;
            while (zone.firstChild) zone.removeChild(zone.firstChild);
            var self = this;

            // Fix caza-bugs: si hay un gate a medias (reapertura), re-pintar el FORM, no los
            // botones — antes _renderInput decidía solo por getInputMode e ignoraba gating →
            // el form se perdía dejando "necesito un par de datos 👇" colgado = lead perdido.
            if (this.state.gating) { this._renderGateForm(); return; }

            if (getInputMode(this.state) === 'buttons') {
                var node = getNode(this.state.currentNodeId);
                var payloads = (node.buttons || []).map(function (d) { return d.payload; });
                var btns = document.createElement('div');
                btns.className = 'btns';
                (node.buttons || []).forEach(function (def) {
                    btns.appendChild(makeQB(def, function (p, l) { self.send(p, l); }));
                });

                // Pie de navegación anti-callejón (fix B2): inyectado por CÓDIGO en todo nodo
                // != raíz → imposible que un nodo (presente o futuro) nazca sin salida.
                if (node.root !== true && this.state.currentNodeId !== 'welcome') {
                    btns.appendChild(frag('<div class="qb-div"></div>'));
                    var nav = document.createElement('div');
                    nav.className = 'navrow';
                    if (this.state.navStack && this.state.navStack.length) {
                        nav.appendChild(makeMini('navb', IC.back, 'Volver', function () { self.send('__back__'); }));
                    }
                    nav.appendChild(makeMini('navb', IC.home, 'Inicio', function () { self.send('__home__'); }));
                    btns.appendChild(nav);
                }

                // Escapes humanos como chips discretos (de-dupe si el nodo ya los trae).
                var esc = document.createElement('div');
                esc.className = 'escrow';
                if (!node.noEscape && payloads.indexOf('act:escalate') === -1) {
                    esc.appendChild(makeMini('escb', IC.headset, 'Hablar con un asesor', function () { self.send('act:escalate', 'Hablar con un asesor'); }));
                }
                if (payloads.indexOf('__whatsapp__') === -1) {
                    esc.appendChild(makeMini('escb', IC.wa, 'WhatsApp', function () { self.send('__whatsapp__'); }));
                }
                if (esc.children.length) {
                    if (node.root === true) btns.appendChild(frag('<div class="qb-div"></div>'));
                    btns.appendChild(esc);
                }
                zone.appendChild(btns);
            } else {
                // modo libre (LLM / live) — barra de texto estilo WhatsApp
                var bar = document.createElement('div');
                bar.className = 'inbar';
                var f = document.createElement('input');
                f.className = 'field'; f.type = 'text';
                f.placeholder = 'Escribe tu mensaje…';
                f.setAttribute('aria-label', 'Mensaje');
                var sbtn = document.createElement('button');
                sbtn.className = 'send';
                sbtn.setAttribute('aria-label', 'Enviar');
                sbtn.appendChild(frag(IC.send));
                var go = function () { if (f.value.trim()) { self.send(f.value.trim()); f.value = ''; } };
                sbtn.addEventListener('click', go);
                f.addEventListener('keydown', function (e) { if (e.key === 'Enter') go(); });
                bar.appendChild(f); bar.appendChild(sbtn);
                zone.appendChild(bar);
            }
        }

        /* ── API pública (IDÉNTICA a v1 — auth.js/detalle-vehiculo dependen) ── */
        open() {
            this._open = true;
            this.shadowRoot.querySelector('.panel').classList.add('open');
            this.shadowRoot.querySelector('.fab').classList.add('hidden');
        }
        close() {
            this._open = false;
            this.shadowRoot.querySelector('.panel').classList.remove('open');
            this.shadowRoot.querySelector('.fab').classList.remove('hidden');
        }
        toggle() { this._open ? this.close() : this.open(); }

        send(text, label) {
            if (!text) return;

            // ── Acciones de navegación / sistema: interceptadas ANTES del push de mensaje
            //    (igual que los sentinelas viejos) para que NUNCA caigan al motor como texto
            //    libre y disparen el fallback genérico = un callejón nuevo (hallazgo caza-bugs). ──
            if (text === '__home__') { return this._goHome(); }
            if (text === '__back__') { return this._goBack(); }
            if (text === '__whatsapp__') { return this._toWhatsApp(); }
            if (text === '__goto_catalogo__') { return this._goto('busqueda.html'); }     // legacy safety
            if (text.indexOf('goto:') === 0) { return this._goto(text.slice(5)); }         // deep-link con filtro real (fix B1)
            if (text.indexOf('node:') === 0) { return this._goNode(text.slice(5), label); }
            if (text.indexOf('act:gate:') === 0) { return this._navAction(label, this._requestGate.bind(this, text.slice(9))); }
            if (text === 'act:escalate') { return this._navAction(label, this._requestAdvisor.bind(this)); }

            // ── Modo libre (LLM / live): el texto del usuario va al motor compartido DualCore. ──
            this.state.messages.push({ from: 'user', text: text, timestamp: Date.now() });
            this._persist();
            this._renderBody();
            var self = this;
            this._showTyping();
            var done = function (txt) {
                self._hideTyping();
                self.state.messages.push({ from: 'bot', text: txt });
                self._persist(); self._renderBody();
            };
            if (window.AltorraDualCore && window.AltorraDualCore.respond) {
                window.AltorraDualCore.respond(text, self.state)
                    .then(function (resp) { done((resp && resp.text) || 'No te entendí bien, ¿lo reformulas?'); })
                    .catch(function () { done('Tuve un problema. ¿Te paso con un asesor?'); });
            } else {
                setTimeout(function () { done('El asistente IA no está disponible ahora. ¿Te conecto con un asesor?'); }, 400);
            }
        }

        /* ── Navegación del árbol de botones (grafo de nodos, fix B2) ───────────── */
        // Turno de contenido: burbuja del usuario (label) + apila el nodo actual + navega +
        // burbuja del bot con el texto del nodo destino.
        _goNode(id, label) {
            if (!NODES[id]) { return this._goHome(); }
            if (label) this.state.messages.push({ from: 'user', text: label, timestamp: Date.now() });
            if (this.state.currentNodeId && this.state.currentNodeId !== id) {
                this.state.navStack = this.state.navStack || [];
                this.state.navStack.push(this.state.currentNodeId);
            }
            this.state.currentNodeId = id;
            this.state.gating = null;
            this._persist();
            this._renderBody();
            var self = this;
            this._showTyping();
            setTimeout(function () {
                self._hideTyping();
                self.state.messages.push({ from: 'bot', text: getNode(id).text });
                self._persist(); self._renderBody(); self._renderInput();
            }, 360);
        }
        // Navegación silenciosa (no ensucia el historial con turnos de menú).
        _goBack() {
            var stack = this.state.navStack || [];
            this.state.currentNodeId = stack.length ? stack.pop() : 'welcome';
            this.state.navStack = stack;
            this.state.gating = null;
            this._persist();
            this._renderInput();
        }
        _goHome() {
            this.state.navStack = [];
            this.state.currentNodeId = 'welcome';
            this.state.gating = null;
            this._persist();
            this._renderInput();
        }
        // Acción terminal (gate/escalate) precedida de la burbuja del usuario (label).
        _navAction(label, fn) {
            if (label) {
                this.state.messages.push({ from: 'user', text: label, timestamp: Date.now() });
                this._persist(); this._renderBody();
            }
            fn();
        }
        // Confirmación in-app del reset (fix B3 — NO window.confirm nativo).
        _renderResetConfirm() {
            this.open();
            var zone = this.shadowRoot.querySelector('.input');
            if (!zone) return;
            while (zone.firstChild) zone.removeChild(zone.firstChild);
            var self = this;
            var wrap = document.createElement('div'); wrap.className = 'confirm';
            wrap.appendChild(frag('<div class="ct">¿Empezar una conversación nueva? Se borrará lo anterior.</div>'));
            var row = document.createElement('div'); row.className = 'btns';
            row.appendChild(makeMini('qb qb-p', IC.refresh, 'Sí, empezar de nuevo', function () { self.resetSession(); }));
            row.appendChild(makeMini('escb', IC.x, 'Cancelar', function () { self._renderInput(); }));
            wrap.appendChild(row);
            zone.appendChild(wrap);
        }

        _goto(url) { try { window.location.href = url; } catch (e) {} }

        /* WhatsApp con contexto pre-cargado (comité exp. D): captura el lead ANTES
           de soltar al cliente → cero pérdida. Resumen+URL vía lead-flow compartido. */
        _toWhatsApp() {
            var st = this.state;
            st.mode = 'wa_handed_over';
            this._persist();
            var db = window.db || null, LF = window.AltorraLeadFlow;
            if (db && LF && !st._leadCreated) {
                LF.createLead(db, st, 'soft')
                    .then(function (ref) { st._leadCreated = true; st.leadId = ref.id; })
                    .catch(function () {});
            }
            var summary = (LF && LF.buildWhatsAppSummary) ? LF.buildWhatsAppSummary(st)
                : 'Hola, vengo de la web de Altorra Cars.';
            var url = (LF && LF.waUrl) ? LF.waUrl(WHATSAPP_NUMBER, summary)
                : 'https://wa.me/' + WHATSAPP_NUMBER.replace(/[^0-9]/g, '');
            try { window.open(url, '_blank'); } catch (e) {}
        }

        _showTyping() {
            var box = this.shadowRoot.querySelector('.body');
            if (!box || box.querySelector('.typing')) return;
            box.appendChild(frag('<div class="bot typing"><span class="td"></span><span class="td"></span><span class="td"></span></div>'));
            box.scrollTop = box.scrollHeight;
        }
        _hideTyping() {
            var t = this.shadowRoot.querySelector('.typing');
            if (t && t.parentNode) t.parentNode.removeChild(t);
        }

        /* Gate de captura / asesor: modales FUERA del shadow (#1 Gemini) vía
           CustomEvent. El handler global se cablea en tramo 3; aquí dispara +
           fallback visible para no dejar al usuario sin respuesta. */
        /* Gate de captura (F-1 paso3): formulario inline nombre+celular+consentimiento.
           Al confirmar → persiste el lead 'gate' (consentGiven, Ley 1581) vía lead-flow.
           El form vive DENTRO del shadow (no es un modal de auth/legal → #1 Gemini no aplica). */
        _requestGate(gateFor) {
            this.state.gating = gateFor || 'general';
            this.state.messages.push({ from: 'bot', text: 'Para coordinarlo necesito un par de datos 👇' });
            this._persist(); this._renderBody();
            this._renderGateForm();
        }
        _renderGateForm() {
            var zone = this.shadowRoot.querySelector('.input');
            if (!zone) return;
            while (zone.firstChild) zone.removeChild(zone.firstChild);
            zone.appendChild(frag('<div class="hint">Déjanos tu nombre y celular — te contactamos enseguida</div>'));
            var self = this;
            var wrap = document.createElement('div'); wrap.className = 'btns';
            var nombre = mkField('text', 'Tu nombre', 'given-name');
            var cel = mkField('tel', 'Celular WhatsApp (3001234567)', 'tel-national');
            var consent = document.createElement('label'); consent.className = 'gate-consent';
            var chk = document.createElement('input'); chk.type = 'checkbox';
            consent.appendChild(chk);
            consent.appendChild(document.createTextNode(' Autorizo el tratamiento de mis datos (Ley 1581).'));
            var err = document.createElement('div'); err.className = 'gate-err';
            var submit = document.createElement('button'); submit.className = 'qb qb-p'; submit.textContent = 'Confirmar';
            submit.addEventListener('click', function () {
                var n = nombre.value.trim(), t = cel.value.replace(/\D/g, '');
                if (n.length < 2) { err.textContent = 'Escribe tu nombre.'; return; }
                if (!/^3\d{9}$/.test(t)) { err.textContent = 'Celular inválido (10 dígitos, empieza en 3).'; return; }
                if (!chk.checked) { err.textContent = 'Necesitamos tu autorización para continuar.'; return; }
                self._submitGate(n, t);
            });
            cel.addEventListener('keydown', function (e) { if (e.key === 'Enter') submit.click(); });
            wrap.appendChild(nombre); wrap.appendChild(cel); wrap.appendChild(consent);
            wrap.appendChild(err); wrap.appendChild(submit);
            zone.appendChild(wrap);
            function mkField(type, ph, ac) {
                var i = document.createElement('input');
                i.className = 'field'; i.type = type; i.placeholder = ph;
                i.setAttribute('autocomplete', ac); return i;
            }
        }
        _submitGate(nombre, telefono) {
            var st = this.state;
            st.nombre = nombre; st.telefono = telefono;
            st.profile = st.profile || {}; st.profile.consent = true;
            st.level = Math.max(st.level || 0, 3);
            this._persist();
            var db = window.db || null, LF = window.AltorraLeadFlow;
            if (db && LF) {
                LF.createLead(db, st, 'gate')
                    .then(function (ref) { st._leadCreated = true; st.leadId = ref.id; })
                    .catch(function () {});
            }
            st.messages.push({ from: 'bot', text: '¡Gracias, ' + nombre.split(' ')[0] + '! Te contactaremos muy pronto. ¿Algo más en lo que te ayude?' });
            st.gating = null; st.currentNodeId = 'welcome'; st.navStack = [];   // vuelve al menú raíz limpio
            this._persist();
            this._renderBody();
            this._renderInput();
        }
        _requestAdvisor() {
            // F-1 (TODO-46): escalado REAL vía lead-flow compartido → CREA el doc
            // `conciergeChats` que el ALTOR Hub lee + alerta al equipo (workload CF + Telegram).
            var self = this, db = window.db || null, LF = window.AltorraLeadFlow, st = this.state;
            if (db && LF) {
                var leadP = st._leadCreated
                    ? Promise.resolve()
                    : LF.createLead(db, st, 'soft')
                        .then(function (ref) { st._leadCreated = true; st.leadId = ref.id; })
                        .catch(function () {});   // el lead se reintenta en el gate; no bloquea el escalado
                leadP
                    .then(function () { return LF.ensureChatDoc(db, st); })
                    .then(function () { st._chatDocCreated = true; return LF.pushMessages(db, st.sessionId, st.messages); })
                    .then(function () { return LF.markEscalated(db, st.sessionId, 'ask_human'); })
                    .catch(function (err) { console.warn('[AltorBotV2] escalado falló:', err && (err.code || err.message)); });
            }
            // Compat: el handler global (modal/notify del tramo 3) sigue escuchando.
            this.dispatchEvent(new CustomEvent('altor:request-advisor', {
                bubbles: true, composed: true, detail: { session: this.session() }
            }));

            // UI HONESTA (fix caza-bugs): el v2 NO recibe respuestas del asesor en vivo (no hay
            // onSnapshot del Hub), así que NO abrimos un chat libre al vacío — el cliente escribía
            // y caía al fallback "IA no disponible". Confirmamos + ofrecemos WhatsApp; el equipo
            // ya quedó notificado. El nodo 'escalado' auto-inyecta Inicio para no atrapar al cliente.
            st.currentNodeId = 'escalado';
            st.gating = null;
            this._persist();
            this._showTyping();
            setTimeout(function () {
                self._hideTyping();
                st.messages.push({ from: 'bot', text: getNode('escalado').text });
                self._persist(); self._renderBody(); self._renderInput();
            }, 360);
        }

        openWithVehicleContext(opts) {   // deep-link desde detalle-vehiculo (contrato v1)
            this.open();
            this.state.vehicleContext = opts || null;
            this._persist();
        }
        applyAuthProfile() { this._renderBody(); }   // re-render en onAuthStateChanged (contrato v1)
        resetSession() {                              // logout/§234 purga (contrato v1, auth.js depende)
            // §234 (Ley 1581 / PC mostrador): borrar la sesión persistida vía el
            // wipe compartido + sessionId NUEVO → el siguiente anónimo arranca limpio.
            if (window.AltorraLeadFlow) window.AltorraLeadFlow.wipeSession(V2_STORAGE_KEY);
            else { try { localStorage.removeItem(V2_STORAGE_KEY); } catch (e) {} }
            this.state = freshState();
            if (this.shadowRoot.querySelector('.body')) { this._renderBody(); this._renderInput(); }
        }
        session() { return Object.assign({}, this.state); }
    }

    customElements.define('altor-bot', AltorBot);
    window.AltorBotV2 = AltorBot;
})();
