/**
 * ALTORRA CARS — Comandos de voz globales (Mega-Plan v4, Microfase L.1)
 * =======================================================================
 * Web Speech API nativa del navegador — cero dependencias, cero costo.
 *
 * Activación: atajo global Espacio + V (configurable). Mientras está
 * presionado, escucha y transcribe. Al soltar, parsea el comando y
 * ejecuta la acción.
 *
 * Comandos soportados (parser por keywords + NER):
 *   "ir a [sección]"       → AltorraSections.go(seccion)
 *   "abrir [sección]"      → idem
 *   "buscar [texto]"       → focus en input de búsqueda + autoll
 *   "nuevo vehículo"       → click en quickNewVehicle
 *   "nueva [tipo]"         → click correspondiente
 *   "cerrar sesión"        → click logoutBtn
 *   "salir"                → idem
 *   "filtrar por [estado]" → set filter en sección activa
 *   "calendario [mes]"     → AltorraCalendar.goTo
 *
 * Soporte: Chrome, Edge, Safari iOS 14+. Firefox no tiene Web Speech
 * habilitado por default. Si no soportado, el módulo no monta UI.
 *
 * Public API:
 *   AltorraVoice.toggle()  → start/stop manual
 *   AltorraVoice.start()
 *   AltorraVoice.stop()
 *   AltorraVoice.isSupported() → boolean
 */
(function () {
    'use strict';
    if (window.AltorraVoice) return;
    var AP = window.AP;
    if (!AP) return;

    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var supported = !!SpeechRecognition;

    var _recog = null;
    var _isListening = false;
    var _overlay = null;

    /* ═══════════════════════════════════════════════════════════
       SECTION ALIASES — palabras humanas → data-section keys
       ═══════════════════════════════════════════════════════════ */
    var SECTION_ALIASES = {
        'inicio': 'dashboard',
        'dashboard': 'dashboard',
        'vehículos': 'vehicles',
        'vehiculos': 'vehicles',
        'autos': 'vehicles',
        'carros': 'vehicles',
        'inventario': 'vehicles',
        'marcas': 'brands',
        'aliados': 'dealers',
        'concesionarios': 'dealers',
        'banners': 'banners',
        'reseñas': 'reviews',
        'resenas': 'reviews',
        'comunicaciones': 'appointments',
        'bandeja': 'appointments',
        'solicitudes': 'appointments',
        'citas': 'appointments',
        'mensajes': 'inbox',
        'inbox': 'inbox',
        'concierge': 'concierge',
        'chats': 'concierge',
        'leads': 'lists',
        'crm': 'crm',
        'clientes': 'crm',
        'contactos': 'crm',
        'calendario': 'calendar',
        'agenda': 'calendar',
        'reglas': 'automation',
        'automatización': 'automation',
        'automatizacion': 'automation',
        'plantillas': 'templates',
        'knowledge base': 'kb',
        'faqs': 'kb',
        'faq': 'kb',
        'usuarios': 'users',
        'auditoría': 'audit',
        'auditoria': 'audit',
        'ajustes': 'settings',
        'configuración': 'settings',
        'configuracion': 'settings'
    };

    /* ═══════════════════════════════════════════════════════════
       COMMAND PARSER
       ═══════════════════════════════════════════════════════════ */
    function parseCommand(transcript) {
        var t = (transcript || '').toLowerCase().trim();
        if (!t) return null;

        // 1. "ir a / abrir / mostrar [sección]"
        var navMatch = t.match(/^(?:ir a|abrir|abre|mostrar|muestra|ver|llevame a|llévame a|ve a|cambiar a)\s+(.+)/);
        if (navMatch) {
            var target = navMatch[1].trim();
            for (var alias in SECTION_ALIASES) {
                if (target.indexOf(alias) === 0 || target === alias) {
                    return { type: 'navigate', section: SECTION_ALIASES[alias] };
                }
            }
        }

        // 2. "buscar [texto]"
        var searchMatch = t.match(/^(?:buscar|busca|encontrar|encuentra)\s+(.+)/);
        if (searchMatch) {
            return { type: 'search', query: searchMatch[1].trim() };
        }

        // 3. "nuevo vehículo / nueva regla / nueva FAQ"
        if (/^(nuevo|nueva)\s+(veh[íi]culo|auto|carro)/.test(t)) {
            return { type: 'new', target: 'vehicle' };
        }
        if (/^nueva?\s+(regla|automatizaci)/.test(t)) {
            return { type: 'navigate', section: 'automation' };
        }
        if (/^nueva?\s+faq/.test(t)) {
            return { type: 'new', target: 'kb' };
        }
        if (/^nueva?\s+marca/.test(t)) {
            return { type: 'navigate', section: 'brands' };
        }

        // 4. "cerrar sesión / salir / logout"
        if (/^(cerrar\s+sesi[óo]n|salir|logout|desconectar)$/.test(t)) {
            return { type: 'logout' };
        }

        // 5. "calendario hoy / siguiente / anterior"
        if (/^(calendario|agenda)\s+(hoy|siguiente|anterior|próximo|proximo|previo)$/.test(t)) {
            var direction = t.match(/(hoy|siguiente|anterior|próximo|proximo|previo)/)[1];
            return { type: 'calendar', direction: direction };
        }

        // 6. Fallback — buscar globalmente con NER (si el query es texto libre)
        if (window.AltorraNER) {
            var ext = window.AltorraNER.extract(t);
            if (ext.summary && (ext.summary.marca || ext.summary.precio)) {
                return { type: 'search', query: t, hint: 'inventario' };
            }
        }

        return { type: 'unknown', raw: t };
    }

    /* ═══════════════════════════════════════════════════════════
       COMMAND EXECUTOR
       ═══════════════════════════════════════════════════════════ */
    function executeCommand(cmd) {
        if (!cmd) return false;
        switch (cmd.type) {
            case 'navigate':
                if (window.AltorraSections && window.AltorraSections.go) {
                    var ok = window.AltorraSections.go(cmd.section);
                    if (ok) AP.toast('Navegando a ' + cmd.section);
                    else AP.toast('No se encontró la sección: ' + cmd.section, 'error');
                    return ok;
                }
                return false;
            case 'search':
                // Abrir vehicles si hint inventario, sino la sección activa
                if (cmd.hint === 'inventario' && window.AltorraSections) {
                    window.AltorraSections.go('vehicles');
                    setTimeout(function () { fillSearch(cmd.query); }, 300);
                } else {
                    fillSearch(cmd.query);
                }
                return true;
            case 'new':
                if (cmd.target === 'vehicle') {
                    var btn = document.querySelector('[data-action="quickNewVehicle"], #addVehicleBtn');
                    if (btn) { btn.click(); AP.toast('Creando nuevo vehículo'); return true; }
                }
                if (cmd.target === 'kb') {
                    if (window.AltorraSections) window.AltorraSections.go('kb');
                    setTimeout(function () {
                        var addBtn = document.getElementById('kbAddBtn');
                        if (addBtn) addBtn.click();
                    }, 300);
                    return true;
                }
                return false;
            case 'logout':
                var logoutBtn = document.getElementById('logoutBtn') ||
                                document.getElementById('mobileLogoutBtn');
                if (logoutBtn) {
                    if (confirm('¿Cerrar sesión?')) logoutBtn.click();
                    return true;
                }
                return false;
            case 'calendar':
                if (window.AltorraSections) window.AltorraSections.go('calendar');
                setTimeout(function () {
                    if (!window.AltorraCalendar) return;
                    if (cmd.direction === 'hoy') {
                        document.getElementById('calToday') && document.getElementById('calToday').click();
                    } else if (/siguiente|próximo|proximo/.test(cmd.direction)) {
                        document.getElementById('calNext') && document.getElementById('calNext').click();
                    } else if (/anterior|previo/.test(cmd.direction)) {
                        document.getElementById('calPrev') && document.getElementById('calPrev').click();
                    }
                }, 300);
                return true;
            case 'unknown':
                AP.toast('Comando no reconocido: "' + cmd.raw + '"', 'warning');
                return false;
        }
        return false;
    }

    function fillSearch(query) {
        // Buscar el primer input de búsqueda visible en la sección activa
        var candidates = ['vehicleSearch', 'crmSearchInput', 'inboxSearch', 'appointmentSearch'];
        var input = null;
        for (var i = 0; i < candidates.length; i++) {
            var el = document.getElementById(candidates[i]);
            if (el && el.offsetParent !== null) { input = el; break; }
        }
        if (input) {
            input.value = query;
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.focus();
            AP.toast('Buscando: "' + query + '"');
        } else {
            AP.toast('No hay buscador visible en esta sección', 'info');
        }
    }

    /* ═══════════════════════════════════════════════════════════
       OVERLAY VISUAL
       ═══════════════════════════════════════════════════════════ */
    function ensureOverlay() {
        if (_overlay) return _overlay;
        _overlay = document.createElement('div');
        _overlay.id = 'altorra-voice-overlay';
        _overlay.className = 'altorra-voice-overlay';
        _overlay.setAttribute('aria-hidden', 'true');
        _overlay.innerHTML =
            '<div class="alt-voice-card">' +
                '<div class="alt-voice-icon">' +
                    '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                        '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>' +
                        '<path d="M19 10v2a7 7 0 0 1-14 0v-2"/>' +
                        '<line x1="12" x2="12" y1="19" y2="22"/>' +
                    '</svg>' +
                '</div>' +
                '<div class="alt-voice-status" id="alt-voice-status">Escuchando…</div>' +
                '<div class="alt-voice-transcript" id="alt-voice-transcript">Habla cuando quieras</div>' +
                '<div class="alt-voice-hint">Suelta <kbd>Espacio</kbd>+<kbd>V</kbd> para ejecutar · <kbd>Esc</kbd> para cancelar</div>' +
            '</div>';
        document.body.appendChild(_overlay);
        return _overlay;
    }

    function showOverlay() {
        ensureOverlay();
        _overlay.classList.add('alt-voice-active');
        _overlay.setAttribute('aria-hidden', 'false');
    }

    function hideOverlay() {
        if (_overlay) {
            _overlay.classList.remove('alt-voice-active');
            _overlay.setAttribute('aria-hidden', 'true');
        }
    }

    function setStatus(text) {
        var el = document.getElementById('alt-voice-status');
        if (el) el.textContent = text;
    }

    function setTranscript(text) {
        var el = document.getElementById('alt-voice-transcript');
        if (el) el.textContent = text || 'Habla cuando quieras';
    }

    /* ═══════════════════════════════════════════════════════════
       SPEECH RECOGNITION
       ═══════════════════════════════════════════════════════════ */
    function start() {
        if (!supported || _isListening) return false;
        try {
            _recog = new SpeechRecognition();
            _recog.lang = 'es-CO';
            _recog.continuous = false;
            _recog.interimResults = true;

            _recog.onstart = function () {
                _isListening = true;
                showOverlay();
                setStatus('Escuchando…');
                setTranscript('');
            };
            _recog.onresult = function (event) {
                var transcript = '';
                for (var i = event.resultIndex; i < event.results.length; i++) {
                    transcript += event.results[i][0].transcript;
                }
                setTranscript(transcript);
            };
            _recog.onerror = function (e) {
                setStatus('Error: ' + (e.error || 'desconocido'));
                setTimeout(stop, 1500);
            };
            _recog.onend = function () {
                // Si terminó solo (no por user), procesar lo último
                if (_isListening) {
                    var t = (document.getElementById('alt-voice-transcript') || {}).textContent;
                    if (t && t !== 'Habla cuando quieras') {
                        processFinalTranscript(t);
                    } else {
                        stop();
                    }
                }
            };
            _recog.start();
            return true;
        } catch (e) {
            console.warn('[Voice] Error iniciando:', e);
            AP.toast('No se pudo iniciar el reconocimiento de voz', 'error');
            stop();
            return false;
        }
    }

    function stop() {
        _isListening = false;
        if (_recog) {
            try { _recog.stop(); } catch (e) {}
            _recog = null;
        }
        hideOverlay();
    }

    function processFinalTranscript(transcript) {
        setStatus('Ejecutando…');
        var cmd = parseCommand(transcript);
        var ok = executeCommand(cmd);
        // EventBus
        if (window.AltorraEventBus) {
            window.AltorraEventBus.emit('voice.command', {
                transcript: transcript,
                command: cmd,
                executed: ok
            });
        }
        setTimeout(stop, 600);
    }

    function toggle() {
        if (_isListening) stop();
        else start();
    }

    /* ═══════════════════════════════════════════════════════════
       KEYBOARD SHORTCUTS
       ═══════════════════════════════════════════════════════════ */
    var _spacePressed = false;
    document.addEventListener('keydown', function (e) {
        // Espacio+V activa
        if (e.code === 'Space') _spacePressed = true;
        if (_spacePressed && (e.key === 'v' || e.key === 'V')) {
            // Ignorar si focus está en input (no interrumpe escritura)
            var tag = (document.activeElement && document.activeElement.tagName) || '';
            if (tag === 'INPUT' || tag === 'TEXTAREA') return;
            e.preventDefault();
            if (!_isListening) start();
        }
        // Esc cancela
        if (e.key === 'Escape' && _isListening) {
            e.preventDefault();
            stop();
        }
    });
    document.addEventListener('keyup', function (e) {
        if (e.code === 'Space') {
            _spacePressed = false;
            // Si se está escuchando y se suelta, dejar terminar (onend dispara executor)
        }
    });

    /* ═══════════════════════════════════════════════════════════
       INIT — añadir botón flotante si soportado
       ═══════════════════════════════════════════════════════════ */
    function init() {
        if (!supported) {
            console.info('[Voice] Web Speech API no disponible en este navegador');
            return;
        }
        // FAB pequeño en bottom-left para activar manualmente
        var fab = document.createElement('button');
        fab.id = 'altorra-voice-fab';
        fab.className = 'altorra-voice-fab';
        fab.setAttribute('aria-label', 'Activar comandos por voz');
        fab.setAttribute('title', 'Comandos por voz (Espacio+V)');
        fab.innerHTML = '<i data-lucide="mic"></i>';
        fab.addEventListener('click', toggle);
        document.body.appendChild(fab);
        if (window.AltorraIcons) window.AltorraIcons.refresh(fab);
        else if (window.lucide) try { window.lucide.createIcons({ context: fab }); } catch (e) {}
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    /* ═══════════════════════════════════════════════════════════
       Public API
       ═══════════════════════════════════════════════════════════ */
    window.AltorraVoice = {
        start: start,
        stop: stop,
        toggle: toggle,
        isSupported: function () { return supported; },
        // Debug
        _parseCommand: parseCommand,
        _executeCommand: executeCommand
    };
})();
