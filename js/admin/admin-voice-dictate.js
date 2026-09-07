/**
 * ALTORRA CARS — Notas dictadas en textareas (Mega-Plan v4, L.2)
 * ================================================================
 * Auto-instrumenta cada `<textarea>` del admin con un mini-botón
 * micrófono. Click → activa Speech Recognition continuo en es-CO.
 * Cada palabra/frase reconocida se appendea al textarea.
 *
 * No interfiere con L.1 (comandos globales): L.2 usa una instancia
 * independiente con `continuous: true` y solo opera dentro de un
 * textarea concreto.
 *
 * Atajos:
 *   Click en mic         → start/stop dictado
 *   Esc cuando dictando  → stop
 *
 * Public API:
 *   AltorraDictate.attach(textarea)  → manualmente atachar uno
 *   AltorraDictate.refresh()         → escanear DOM y atachar nuevos
 */
(function () {
    'use strict';
    if (window.AltorraDictate) return;
    var AP = window.AP;
    if (!AP) return;

    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        console.info('[L.2] Speech Recognition no disponible — dictado deshabilitado');
        return;
    }

    var _attached = new WeakSet();
    var _activeTextarea = null;
    var _recog = null;

    /* ═══════════════════════════════════════════════════════════
       BUTTON UI
       ═══════════════════════════════════════════════════════════ */
    function createDictateButton(textarea) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'alt-dictate-btn';
        btn.setAttribute('aria-label', 'Dictar texto');
        btn.setAttribute('title', 'Dictar texto (clic para empezar/parar)');
        btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>' +
                '<path d="M19 10v2a7 7 0 0 1-14 0v-2"/>' +
                '<line x1="12" x2="12" y1="19" y2="22"/>' +
            '</svg>';
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            toggleDictate(textarea, btn);
        });
        return btn;
    }

    function attach(textarea) {
        if (!textarea || _attached.has(textarea)) return;
        // Skip textareas pequeños (height < 60px) o readonly
        if (textarea.readOnly || textarea.disabled) return;

        var parent = textarea.parentNode;
        if (!parent) return;

        // Wrap el textarea si no está envuelto ya
        if (!parent.classList.contains('alt-dictate-wrap')) {
            var wrap = document.createElement('div');
            wrap.className = 'alt-dictate-wrap';
            // Preservar inline style del padre / mantener layout
            parent.insertBefore(wrap, textarea);
            wrap.appendChild(textarea);
            parent = wrap;
        }
        var btn = createDictateButton(textarea);
        parent.appendChild(btn);
        _attached.add(textarea);
    }

    /* ═══════════════════════════════════════════════════════════
       DICTATION ENGINE
       ═══════════════════════════════════════════════════════════ */
    function toggleDictate(textarea, btn) {
        if (_activeTextarea === textarea && _recog) {
            stopDictate();
            return;
        }
        if (_activeTextarea) {
            // Otro textarea está dictando — parar primero
            stopDictate();
        }
        startDictate(textarea, btn);
    }

    function startDictate(textarea, btn) {
        try {
            _recog = new SpeechRecognition();
            _recog.lang = 'es-CO';
            _recog.continuous = true;
            _recog.interimResults = true;
            _activeTextarea = textarea;

            var baseValue = textarea.value;
            var hasTrailingSpace = !baseValue || /\s$/.test(baseValue);
            var prefix = baseValue + (baseValue && !hasTrailingSpace ? ' ' : '');

            btn.classList.add('alt-dictate-active');
            textarea.classList.add('alt-dictate-textarea-active');

            _recog.onresult = function (event) {
                var finalChunk = '';
                var interim = '';
                for (var i = event.resultIndex; i < event.results.length; i++) {
                    var t = event.results[i][0].transcript;
                    if (event.results[i].isFinal) finalChunk += t;
                    else interim += t;
                }
                if (finalChunk) {
                    var trimmed = finalChunk.trim();
                    if (trimmed) {
                        // Capitalizar primera letra y asegurar espacio
                        var cap = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
                        prefix = prefix + cap + ' ';
                        textarea.value = prefix;
                        textarea.dispatchEvent(new Event('input', { bubbles: true }));
                    }
                } else if (interim) {
                    // Mostrar texto provisional sin commit
                    textarea.value = prefix + interim;
                }
            };
            _recog.onerror = function (e) {
                console.warn('[L.2] dictate error:', e.error);
                if (e.error === 'not-allowed') {
                    AP.toast('Permiso de micrófono denegado.', 'error');
                }
                stopDictate();
            };
            _recog.onend = function () {
                // Si el usuario sigue queriendo dictar, podemos auto-restart
                // pero por seguridad paramos al primer onend
                stopDictate();
            };
            _recog.start();

            // Esc cancela
            var escHandler = function (e) {
                if (e.key === 'Escape' && _activeTextarea === textarea) {
                    stopDictate();
                    document.removeEventListener('keydown', escHandler);
                }
            };
            document.addEventListener('keydown', escHandler);
        } catch (e) {
            console.warn('[L.2] start error:', e.message);
            stopDictate();
        }
    }

    function stopDictate() {
        if (_recog) {
            try { _recog.stop(); } catch (e) {}
            _recog = null;
        }
        if (_activeTextarea) {
            _activeTextarea.classList.remove('alt-dictate-textarea-active');
            // Eliminar el interim del valor (todo lo escrito final ya fue committed)
            _activeTextarea.dispatchEvent(new Event('input', { bubbles: true }));
        }
        document.querySelectorAll('.alt-dictate-active').forEach(function (b) {
            b.classList.remove('alt-dictate-active');
        });
        _activeTextarea = null;
    }

    /* ═══════════════════════════════════════════════════════════
       SCAN & ATTACH (initial + observer)
       ═══════════════════════════════════════════════════════════ */
    function refresh() {
        document.querySelectorAll('textarea:not([data-alt-skip-dictate])').forEach(function (ta) {
            attach(ta);
        });
    }

    function init() {
        refresh();
        // MutationObserver para textareas dinámicos (modals que abren después)
        if (typeof MutationObserver !== 'undefined') {
            var observer = new MutationObserver(function (mutations) {
                var hasNew = false;
                mutations.forEach(function (m) {
                    m.addedNodes.forEach(function (node) {
                        if (node.nodeType !== 1) return;
                        if (node.tagName === 'TEXTAREA' || node.querySelectorAll) {
                            hasNew = true;
                        }
                    });
                });
                if (hasNew) {
                    // Debounce
                    clearTimeout(observer._debounce);
                    observer._debounce = setTimeout(refresh, 150);
                }
            });
            observer.observe(document.body, { childList: true, subtree: true });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    /* ═══════════════════════════════════════════════════════════
       Public API
       ═══════════════════════════════════════════════════════════ */
    window.AltorraDictate = {
        attach: attach,
        refresh: refresh,
        stop: stopDictate
    };
})();
