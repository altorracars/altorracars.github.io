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
        '.fab{position:fixed;right:20px;bottom:20px;width:60px;height:60px;border-radius:50%;',
        'background:var(--g);display:flex;align-items:center;justify-content:center;cursor:pointer;',
        'box-shadow:0 12px 34px rgba(184,150,88,.4);border:none;z-index:2147483000;}',
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
        '.vbadge{position:absolute;right:-3px;bottom:-3px;width:16px;height:16px;border-radius:50%;',
        'background:#2E7D32;border:2px solid var(--surface);display:flex;align-items:center;justify-content:center;}',
        '.vbadge svg{width:9px;height:9px;color:#fff;}',
        '.nm{font-family:"Instrument Serif",Georgia,serif;font-size:22px;color:var(--tx);letter-spacing:.6px;line-height:1;}',
        '.sub{font-size:11.5px;color:var(--tx2);margin-top:4px;display:flex;align-items:center;gap:5px;}',
        '.dot{width:7px;height:7px;border-radius:50%;background:var(--ok);display:inline-block;}',
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
        '.btns{display:flex;flex-direction:column;gap:9px;}',
        '.qb{display:flex;align-items:center;gap:10px;padding:11px 14px;border-radius:12px;font-size:13.5px;',
        'font-weight:500;cursor:pointer;border:none;text-align:left;width:100%;font-family:inherit;}',
        '.qb svg{width:18px;height:18px;flex-shrink:0;}',
        '.qb-p{background:var(--g);color:var(--on-g);}',
        '.qb-s{background:#211A12;border:1px solid var(--bd2);color:#E4D9C6;}',
        '.qb-ghost{background:transparent;border:1px solid var(--bd);color:var(--tx2);justify-content:center;font-size:12.5px;}',
        '.inbar{display:flex;align-items:center;gap:9px;}',
        '.field{flex:1;background:#231C13;border:1px solid var(--bd2);border-radius:22px;padding:10px 15px;',
        'color:var(--tx);font-size:13px;font-family:inherit;outline:none;}',
        '.field::placeholder{color:var(--tx3);}',
        '.send{width:40px;height:40px;border-radius:50%;background:var(--g);border:none;cursor:pointer;',
        'display:flex;align-items:center;justify-content:center;flex-shrink:0;}',
        '.send svg{width:19px;height:19px;color:var(--on-g);}',
        '.typing{display:flex;gap:4px;align-items:center;padding:13px 14px;width:auto;}',
        '.td{width:6px;height:6px;border-radius:50%;background:var(--tx2);animation:tb 1.2s infinite;}',
        '.td:nth-child(2){animation-delay:.2s;}.td:nth-child(3){animation-delay:.4s;}',
        '@keyframes tb{0%,60%,100%{opacity:.3;transform:translateY(0);}30%{opacity:1;transform:translateY(-3px);}}',
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
        send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/></svg>'
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
            _chatDocCreated: false, _leadCreated: false
        };
    }

    /* Botones por intent (espejo de getContextualQuickReplies de v1) */
    var QR_WELCOME = [
        { ic: 'car', label: 'Ver autos disponibles', payload: 'Muéstrame los autos disponibles', cls: 'qb-p' },
        { ic: 'card', label: 'Financiación a tu medida', payload: 'Quiero información sobre financiación', cls: 'qb-s' },
        { ic: 'cal', label: 'Agendar una visita', payload: 'Quiero agendar una visita', cls: 'qb-s' },
        { ic: 'car', label: 'Vender / parte de pago', payload: 'Quiero vender mi carro o darlo en parte de pago', cls: 'qb-s' }
    ];

    /* ── Motor FREE CORE determinista (buttons-only, sin NLU — D1) ──────
       Cada payload de botón → respuesta + sub-botones. NO depende de v1:
       en Free Core no hay texto libre, solo este árbol finito. El NLU pesado
       (generateBotResponse de v1) solo se necesita con texto libre = modo LLM. */
    var FREE_CORE = {
        'Muéstrame los autos disponibles': {
            text: 'Con gusto. ¿Qué tipo de carro estás buscando?',
            quickReplies: [
                { ic: 'car', label: 'SUV / Camioneta', payload: 'Muéstrame SUVs disponibles', cls: 'qb-s' },
                { ic: 'car', label: 'Sedán', payload: 'Muéstrame sedanes disponibles', cls: 'qb-s' },
                { ic: 'car', label: 'Ver todo el catálogo', payload: '__goto_catalogo__', cls: 'qb-p' }
            ]
        },
        'Muéstrame SUVs disponibles': {
            text: 'Tenemos SUVs y camionetas en stock. Te abro el catálogo filtrado para que las veas con fotos y precios.',
            quickReplies: [
                { ic: 'car', label: 'Ver camionetas', payload: '__goto_catalogo__', cls: 'qb-p' },
                { ic: 'headset', label: 'Hablar con un asesor', payload: 'Quiero hablar con un asesor', cls: 'qb-ghost' }
            ]
        },
        'Muéstrame sedanes disponibles': {
            text: 'Tenemos sedanes disponibles. Te abro el catálogo filtrado para verlos al detalle.',
            quickReplies: [
                { ic: 'car', label: 'Ver sedanes', payload: '__goto_catalogo__', cls: 'qb-p' },
                { ic: 'headset', label: 'Hablar con un asesor', payload: 'Quiero hablar con un asesor', cls: 'qb-ghost' }
            ]
        },
        'Quiero información sobre financiación': {
            text: 'Te financiamos con cuotas a tu medida y aprobación rápida. Para darte un plan exacto, agenda una cita o te paso con un asesor.',
            quickReplies: [
                { ic: 'cal', label: 'Agendar para cotizar', payload: 'Quiero agendar una visita', cls: 'qb-p' },
                { ic: 'headset', label: 'Hablar con un asesor', payload: 'Quiero hablar con un asesor', cls: 'qb-ghost' }
            ]
        },
        'Quiero agendar una visita': { text: 'Perfecto, agendemos tu visita.', action: 'gate', gateFor: 'cita' },
        'Quiero hablar con un asesor': { text: 'Te conecto con un asesor de Altorra ahora mismo.', action: 'escalate' },
        // Retoma / parte de pago — alta frecuencia en el mercado costeño (comité, exp. D)
        'Quiero vender mi carro o darlo en parte de pago': {
            text: 'Te hacemos **peritaje gratis** y te recibimos el carro en **parte de pago** o **consignación**. Para el avalúo, agenda una cita o te paso con un asesor.',
            quickReplies: [
                { ic: 'cal', label: 'Agendar avalúo', payload: 'Quiero agendar una visita', cls: 'qb-p' },
                { ic: 'headset', label: 'Hablar con un asesor', payload: 'Quiero hablar con un asesor', cls: 'qb-ghost' }
            ]
        }
    };
    function freeCoreReply(payload) {
        return FREE_CORE[payload] || {
            text: '¿Te muestro el catálogo o prefieres que te pase con un asesor?',
            quickReplies: [
                { ic: 'car', label: 'Ver catálogo', payload: '__goto_catalogo__', cls: 'qb-p' },
                { ic: 'headset', label: 'Hablar con un asesor', payload: 'Quiero hablar con un asesor', cls: 'qb-ghost' }
            ]
        };
    }

    /* Crea un botón quick-reply de forma segura (icono confiable + label textContent) */
    function makeQB(def, onClick) {
        var btn = document.createElement('button');
        btn.className = 'qb ' + (def.cls || 'qb-s');
        btn.appendChild(frag(IC[def.ic] || ''));            // icono propio = confiable
        btn.appendChild(document.createTextNode(def.label)); // label = texto seguro
        btn.addEventListener('click', function () { onClick(def.payload); });
        return btn;
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
                if (raw) { this.state = Object.assign(this.state, JSON.parse(raw)); return; }
                var v1 = localStorage.getItem(V1_STORAGE_KEY);   // lectura 1-vía, NO escribe v1
                if (v1) {
                    var s = JSON.parse(v1);
                    if (s && s.messages) this.state.messages = s.messages.slice(-20);
                }
            } catch (e) {}
        }
        _persist() {
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
                '<button class="fab" aria-label="Abrir chat con ALTOR">' + IC.robot + '</button>' +
                '<section class="panel" role="dialog" aria-label="Chat con ALTOR">' +
                    '<header class="hd">' +
                        '<div class="av">' + IC.robot + '<span class="vbadge">' + IC.check + '</span></div>' +
                        '<div><div class="nm">ALTOR</div>' +
                        '<div class="sub"><span class="dot"></span>En línea · Asistente de Altorra Cars</div></div>' +
                        '<div class="hd-act">' +
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
            this._renderBody();
            this._renderInput();
        }

        _renderBody() {
            var box = this.shadowRoot.querySelector('.body');
            if (!box) return;
            while (box.firstChild) box.removeChild(box.firstChild);

            if (!this.state.messages.length) {
                box.appendChild(frag('<div class="bot">Hola, soy <b>ALTOR</b> — tu asistente en Altorra Cars. ¿Qué estás buscando hoy?</div><div class="time">Ahora</div>'));
                if (this.state.engine === 'freecore') {
                    box.appendChild(frag('<div class="engine-note">' + IC.shield + '<span>Te respondo con opciones precisas. Para charlar libre, un asesor está a un toque.</span></div>'));
                }
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

            if (getInputMode(this.state) === 'buttons') {
                var list = this.state.pendingQuickReplies || QR_WELCOME;
                var hint = this.state.pendingQuickReplies ? 'Elige una opción' : 'Elige una opción para empezar';
                zone.appendChild(frag('<div class="hint">' + hint + '</div>'));
                var btns = document.createElement('div');
                btns.className = 'btns';
                list.forEach(function (def) {
                    btns.appendChild(makeQB(def, function (p) { self.send(p); }));
                });
                // escape hatch SIEMPRE (D1): buttons-only nunca es trampa
                btns.appendChild(makeQB(
                    { ic: 'headset', label: 'Hablar con un asesor', payload: 'Quiero hablar con un asesor', cls: 'qb-ghost' },
                    function (p) { self.send(p); }
                ));
                // WhatsApp con contexto pre-cargado — escape de alta conversión (comité, exp. D)
                btns.appendChild(makeQB(
                    { ic: 'headset', label: 'Continuar por WhatsApp', payload: '__whatsapp__', cls: 'qb-ghost' },
                    function (p) { self.send(p); }
                ));
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

        send(text) {
            if (!text) return;
            if (text === '__goto_catalogo__') { this._goto('busqueda.html'); return; }  // acción, no mensaje
            if (text === '__whatsapp__') { this._toWhatsApp(); return; }                 // escape WhatsApp con contexto
            this.state.messages.push({ from: 'user', text: text, timestamp: Date.now() });
            this.state.pendingQuickReplies = null;
            this._persist();
            this._renderBody();
            this._renderInput();
            var self = this;
            this._showTyping();

            if (getInputMode(this.state) === 'buttons') {
                // Free Core determinista (árbol de botones, sin NLU — D1)
                var r = freeCoreReply(text);
                setTimeout(function () {
                    self._hideTyping();
                    self.state.messages.push({ from: 'bot', text: r.text });
                    self.state.pendingQuickReplies = r.quickReplies || null;
                    self._persist(); self._renderBody(); self._renderInput();
                    if (r.action === 'gate') self._requestGate(r.gateFor || 'general');
                    if (r.action === 'escalate') self._requestAdvisor();
                }, 450);
            } else {
                // Modo libre (LLM / live) → motor compartido DualCore (LLM si Premium on)
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
        _requestGate(gateFor) {
            this.dispatchEvent(new CustomEvent('altor:request-gate', {
                bubbles: true, composed: true, detail: { gateFor: gateFor, session: this.session() }
            }));
            var self = this;
            setTimeout(function () {
                self.state.messages.push({ from: 'bot', text: 'Para agendar necesito tu nombre y celular (autorizas el tratamiento de datos, Ley 1581). — captura completa en el siguiente tramo.' });
                self._persist(); self._renderBody();
            }, 300);
        }
        _requestAdvisor() {
            // F-1 (TODO-46): escalado REAL vía lead-flow compartido → CREA el doc
            // `conciergeChats` que el ALTOR Hub lee. Antes: CustomEvent al vacío =
            // el cliente que pedía asesor caía al vacío (hallazgo #1 del comité).
            this.state.mode = 'queue';            // en cola hasta que un asesor lo tome
            this.state.pendingQuickReplies = null;
            this._persist();
            this._renderInput();                  // entrada libre (queue/live, D1)

            var db = window.db || null;
            var LF = window.AltorraLeadFlow;
            if (db && LF) {
                var st = this.state;
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
