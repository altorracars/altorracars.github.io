/**
 * ALTORRA CARS — Onboarding contextual (Mega-Plan v4, N.4)
 * ==========================================================
 * Tour interactivo la primera vez que un admin entra al panel.
 * Patrón Intercom/Hotjar pero ligero: 5 steps con tooltips
 * encadenados, navegación con Siguiente/Anterior/Saltar.
 *
 * Solo se ejecuta una vez por admin (flag en
 * `clientes/{uid}.onboardingCompleted` o localStorage).
 *
 * Public API:
 *   AltorraOnboarding.start()   → manualmente disparar tour
 *   AltorraOnboarding.reset()   → permitir verlo otra vez (debug)
 */
(function () {
    'use strict';
    if (window.AltorraOnboarding) return;
    var AP = window.AP;
    if (!AP) return;

    var FLAG_KEY = 'altorra_admin_onboarded';
    var _currentStep = 0;
    var _isActive = false;

    var STEPS = [
        {
            title: '¡Bienvenido a Altorra Admin!',
            body: 'Te mostramos en 60 segundos las funciones clave para que arranques sin perder tiempo.',
            icon: 'sparkles'
        },
        {
            title: 'Comando palette ⌘+K',
            body: 'Presioná <kbd>⌘+K</kbd> (Mac) o <kbd>Ctrl+K</kbd> (Windows) y escribí lo que necesitás. Te llevamos a cualquier sección, contacto o acción al instante.',
            icon: 'search'
        },
        {
            title: 'Comandos por voz',
            body: 'Mantené <kbd>Espacio</kbd>+<kbd>V</kbd> y dictá. Por ejemplo: "ir a vehículos", "buscar Toyota Hilux", "calendario hoy". Cero teclado.',
            icon: 'mic'
        },
        {
            title: 'Insights automáticos',
            body: 'En el dashboard verás cards de "Lo que el sistema notó esta semana": vehículos estancados, leads sin contactar, anomalías de volumen. Todo accionable.',
            icon: 'lightbulb'
        },
        {
            title: 'Concierge unificado',
            body: 'Tu sitio público tiene un Concierge inteligente que captura leads automáticamente. Cuando el cliente pide hablar con un asesor, vos respondés desde la sección <strong>Concierge</strong>.',
            icon: 'message-circle-more'
        },
        {
            title: '¡Listo para arrancar!',
            body: 'Podés repetir este tour escribiendo <code>AltorraOnboarding.start()</code> en la consola. ¡Buena suerte! 🚀',
            icon: 'check-circle-2'
        }
    ];

    function $(id) { return document.getElementById(id); }
    function escTxt(s) {
        var d = document.createElement('div');
        d.textContent = s == null ? '' : String(s);
        return d.innerHTML;
    }

    function ensureModal() {
        if (document.getElementById('alt-onboard')) return;
        var wrap = document.createElement('div');
        wrap.id = 'alt-onboard';
        wrap.className = 'alt-onboard';
        wrap.innerHTML =
            '<div class="alt-onboard-backdrop"></div>' +
            '<div class="alt-onboard-card">' +
                '<div class="alt-onboard-icon" id="alt-onboard-icon"></div>' +
                '<div class="alt-onboard-progress" id="alt-onboard-progress"></div>' +
                '<h3 class="alt-onboard-title" id="alt-onboard-title"></h3>' +
                '<div class="alt-onboard-body" id="alt-onboard-body"></div>' +
                '<div class="alt-onboard-actions">' +
                    '<button class="alt-btn alt-btn--ghost" id="alt-onboard-skip">Saltar tour</button>' +
                    '<div style="display:flex;gap:8px;">' +
                        '<button class="alt-btn alt-btn--ghost" id="alt-onboard-prev">Anterior</button>' +
                        '<button class="alt-btn alt-btn--primary" id="alt-onboard-next">Siguiente</button>' +
                    '</div>' +
                '</div>' +
            '</div>';
        document.body.appendChild(wrap);
        wrap.querySelector('.alt-onboard-backdrop').addEventListener('click', skip);
        $('alt-onboard-skip').addEventListener('click', skip);
        $('alt-onboard-prev').addEventListener('click', prev);
        $('alt-onboard-next').addEventListener('click', next);
    }

    function renderStep() {
        var step = STEPS[_currentStep];
        if (!step) return finish();
        var iconEl = $('alt-onboard-icon');
        iconEl.innerHTML = '<i data-lucide="' + escTxt(step.icon) + '"></i>';
        $('alt-onboard-title').textContent = step.title;
        $('alt-onboard-body').innerHTML = step.body;
        // Progress bar
        var progressEl = $('alt-onboard-progress');
        progressEl.innerHTML = '';
        STEPS.forEach(function (_, i) {
            var dot = document.createElement('span');
            dot.className = 'alt-onboard-dot' + (i === _currentStep ? ' active' : '') + (i < _currentStep ? ' done' : '');
            progressEl.appendChild(dot);
        });
        $('alt-onboard-prev').style.display = _currentStep === 0 ? 'none' : '';
        $('alt-onboard-next').textContent = _currentStep === STEPS.length - 1 ? 'Empezar' : 'Siguiente';
        if (window.AltorraIcons) window.AltorraIcons.refresh(iconEl);
        else if (window.lucide) try { window.lucide.createIcons({ context: iconEl }); } catch (e) {}
    }

    function next() {
        if (_currentStep < STEPS.length - 1) {
            _currentStep++;
            renderStep();
        } else {
            finish();
        }
    }
    function prev() {
        if (_currentStep > 0) {
            _currentStep--;
            renderStep();
        }
    }
    function skip() {
        finish();
    }
    function finish() {
        _isActive = false;
        try { localStorage.setItem(FLAG_KEY, '1'); } catch (e) {}
        // También guardar en perfil del admin
        if (window.db && window.auth && window.auth.currentUser) {
            window.db.collection('usuarios').doc(window.auth.currentUser.uid)
                .set({ onboardingCompleted: true }, { merge: true })
                .catch(function () {});
        }
        var wrap = document.getElementById('alt-onboard');
        if (wrap) wrap.remove();
        if (window.AltorraEventBus) {
            window.AltorraEventBus.emit('onboarding.completed', { step: _currentStep });
        }
    }

    function start() {
        _currentStep = 0;
        _isActive = true;
        ensureModal();
        var wrap = document.getElementById('alt-onboard');
        if (wrap) wrap.classList.add('is-active');
        renderStep();
    }
    function reset() {
        try { localStorage.removeItem(FLAG_KEY); } catch (e) {}
    }

    function shouldAutoStart() {
        try { if (localStorage.getItem(FLAG_KEY) === '1') return false; } catch (e) {}
        // También chequear en Firestore si el perfil tiene flag
        if (AP.currentUserProfile && AP.currentUserProfile.onboardingCompleted) return false;
        return true;
    }

    /* ═══════════════════════════════════════════════════════════
       AUTO-START — primer login (solo super_admin/editor)
       ═══════════════════════════════════════════════════════════ */
    var attempts = 0;
    var iv = setInterval(function () {
        attempts++;
        if (window.auth && window.auth.currentUser && AP.isEditorOrAbove && AP.isEditorOrAbove() &&
            AP.currentUserProfile) {
            clearInterval(iv);
            if (shouldAutoStart()) {
                // Esperar un poco más para que el dashboard se renderee
                setTimeout(start, 2500);
            }
        } else if (attempts > 60) clearInterval(iv);
    }, 1500);

    /* ═══════════════════════════════════════════════════════════
       Public API
       ═══════════════════════════════════════════════════════════ */
    window.AltorraOnboarding = {
        start: start,
        skip: skip,
        reset: reset,
        isActive: function () { return _isActive; }
    };
})();
