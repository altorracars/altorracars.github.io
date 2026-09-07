/**
 * AltorraVisionaryMaster — UX flows + microinteracciones avanzadas
 * ====================================================================
 * Fases 4-10 del ADR-032 implementadas en JS:
 *  - Ripple click feedback (Material You)
 *  - Magnetic button pull on hover
 *  - Confetti success
 *  - Bulk actions bar auto-show/hide
 *  - Undo toast con timer
 *  - Quick actions FAB menu
 *  - Section transitions (View Transitions API)
 *  - Konami easter egg
 *  - Sound design opt-in
 *  - Skeleton loaders auto-attach
 *  - Section stagger automatico
 *
 * Respeta prefers-reduced-motion en todo.
 */
(function () {
    'use strict';
    if (window.AltorraVisionaryMaster) return;

    // §35 ADR-035 — DESACTIVADO POR PERFORMANCE.
    // El módulo entero (ripple + magnetic pull pointermove +
    // MutationObserver subtree:true + stagger observer) drenaba
    // GPU 24/7. Reemplazo por stub API para que callers no rompan.
    window.AltorraVisionaryMaster = {
        attachRipple: function () {},
        attachMagnetic: function () {},
        confetti: function () {},
        showUndoToast: function (msg) {
            if (window.notify && window.notify.info) window.notify.info({ message: msg });
        },
        shake: function () {},
        sound: null,
        showSkeleton: function () {},
        rescan: function () {}
    };
    return;

    /* eslint-disable */
    /* CÓDIGO PRESERVADO POR REFERENCIA — NO EJECUTABLE (return arriba) */
    var _reduceMotion = false;
    try {
        _reduceMotion = window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (e) {}

    /* ─── 1. RIPPLE click feedback ─── */
    function attachRipple(el) {
        if (el._visRippleAttached || _reduceMotion) return;
        el._visRippleAttached = true;
        el.classList.add('vis-ripple-container');
        el.addEventListener('pointerdown', function (e) {
            var rect = el.getBoundingClientRect();
            var size = Math.max(rect.width, rect.height) * 1.2;
            var ripple = document.createElement('span');
            ripple.className = 'vis-ripple';
            ripple.style.width = size + 'px';
            ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            el.appendChild(ripple);
            setTimeout(function () { ripple.remove(); }, 700);
        });
    }
    function autoAttachRipples() {
        var selectors = '.btn-primary, .alt-btn--primary, .v-act, .nav-item, .alt-btn--secondary';
        document.querySelectorAll(selectors).forEach(attachRipple);
    }

    /* ─── 2. MAGNETIC button pull ─── */
    function attachMagnetic(el) {
        if (el._visMagneticAttached || _reduceMotion) return;
        el._visMagneticAttached = true;
        el.classList.add('vis-magnetic');
        el.addEventListener('pointermove', function (e) {
            var rect = el.getBoundingClientRect();
            var x = (e.clientX - rect.left - rect.width / 2) / rect.width;
            var y = (e.clientY - rect.top - rect.height / 2) / rect.height;
            el.style.transform = 'translate(' + (x * 4) + 'px, ' + (y * 4) + 'px)';
        });
        el.addEventListener('pointerleave', function () {
            el.style.transform = 'translate(0, 0)';
        });
    }
    function autoAttachMagnetic() {
        document.querySelectorAll('.vis-fab-trigger, [data-magnetic]').forEach(attachMagnetic);
    }

    /* ─── 3. CONFETTI success animation ─── */
    function fireConfetti(originX, originY) {
        if (_reduceMotion) return;
        var colors = ['#b89658', '#d4ad6e', '#f5e3b8', '#10b981', '#3b82f6'];
        var count = 24;
        for (var i = 0; i < count; i++) {
            var p = document.createElement('div');
            p.className = 'vis-confetti-particle';
            p.style.background = colors[Math.floor(Math.random() * colors.length)];
            p.style.left = (originX || window.innerWidth / 2) + 'px';
            p.style.top = (originY || window.innerHeight / 2) + 'px';
            var angle = (Math.PI * 2 * i) / count;
            var distance = 80 + Math.random() * 60;
            p.style.setProperty('--dx', Math.cos(angle) * distance + 'px');
            p.style.setProperty('--dy', Math.sin(angle) * distance + 'px');
            p.style.transform = 'translate(' + Math.cos(angle) * distance + 'px, ' + Math.sin(angle) * distance + 'px)';
            document.body.appendChild(p);
            setTimeout((function (el) { return function () { el.remove(); }; })(p), 1500);
        }
    }
    window.altorraConfetti = fireConfetti;

    /* ─── 4. BULK ACTIONS BAR auto-show ─── */
    function refreshBulkBar() {
        var checked = document.querySelectorAll('.vehicle-cb:checked, [data-bulk-cb]:checked');
        var existing = document.getElementById('visBulkBar');
        if (checked.length === 0) {
            if (existing) existing.remove();
            return;
        }
        if (!existing) {
            var bar = document.createElement('div');
            bar.id = 'visBulkBar';
            bar.className = 'bulk-actions-bar';
            bar.innerHTML =
                '<span class="bulk-count" id="visBulkCount">' + checked.length + ' seleccionado(s)</span>' +
                '<button data-bulk-action="export"><i data-lucide="download" width="16" height="16"></i> Exportar</button>' +
                '<button data-bulk-action="archive"><i data-lucide="archive" width="16" height="16"></i> Archivar</button>' +
                '<button class="is-danger" data-bulk-action="delete"><i data-lucide="trash-2" width="16" height="16"></i> Eliminar</button>' +
                '<button data-bulk-action="cancel" style="margin-left:auto;"><i data-lucide="x" width="16" height="16"></i></button>';
            document.body.appendChild(bar);
            if (window.AltorraIcons) try { AltorraIcons.refresh(bar); } catch (e) {}
            else if (window.lucide && window.lucide.createIcons) try { window.lucide.createIcons(); } catch (e) {}
            bar.addEventListener('click', function (e) {
                var btn = e.target.closest('[data-bulk-action]');
                if (!btn) return;
                var action = btn.getAttribute('data-bulk-action');
                if (action === 'cancel') {
                    document.querySelectorAll('.vehicle-cb:checked').forEach(function (cb) { cb.checked = false; });
                    bar.remove();
                } else {
                    var event = new CustomEvent('vis:bulkAction', { detail: { action: action, count: checked.length }});
                    document.dispatchEvent(event);
                }
            });
        } else {
            var c = existing.querySelector('#visBulkCount');
            if (c) c.textContent = checked.length + ' seleccionado(s)';
        }
    }
    document.addEventListener('change', function (e) {
        if (e.target && e.target.matches && e.target.matches('.vehicle-cb, [data-bulk-cb]')) {
            refreshBulkBar();
        }
    });

    /* ─── 5. UNDO TOAST helper ─── */
    function showUndoToast(message, onUndo, ms) {
        ms = ms || 5000;
        var existing = document.getElementById('visUndoToast');
        if (existing) existing.remove();
        var toast = document.createElement('div');
        toast.id = 'visUndoToast';
        toast.className = 'vis-undo-toast';
        toast.innerHTML =
            '<span>' + message + '</span>' +
            '<button class="vis-undo-btn">Deshacer</button>';
        document.body.appendChild(toast);
        var timer = setTimeout(function () { toast.remove(); }, ms);
        toast.querySelector('.vis-undo-btn').addEventListener('click', function () {
            clearTimeout(timer);
            toast.remove();
            if (typeof onUndo === 'function') onUndo();
        });
    }
    window.altorraShowUndoToast = showUndoToast;

    /* ─── 6. SHAKE error helper ─── */
    function shakeElement(el) {
        if (!el || _reduceMotion) return;
        el.classList.remove('vis-shake');
        void el.offsetWidth;
        el.classList.add('vis-shake');
        setTimeout(function () { el.classList.remove('vis-shake'); }, 600);
    }
    window.altorraShake = shakeElement;

    /* ─── 7. KONAMI CODE easter egg ─── */
    var konamiSequence = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    var konamiIdx = 0;
    document.addEventListener('keydown', function (e) {
        if (e.key === konamiSequence[konamiIdx]) {
            konamiIdx++;
            if (konamiIdx === konamiSequence.length) {
                konamiIdx = 0;
                document.body.classList.add('vis-konami');
                fireConfetti();
                setTimeout(fireConfetti, 600);
                setTimeout(fireConfetti, 1200);
                setTimeout(function () { document.body.classList.remove('vis-konami'); }, 5500);
            }
        } else {
            konamiIdx = 0;
        }
    });

    /* ─── 8. SOUND DESIGN opt-in ─── */
    var soundEnabled = (function () {
        try { return localStorage.getItem('altorra_sound') === '1'; } catch (e) { return false; }
    })();
    var audioCtx = null;
    function ensureAudio() {
        if (!audioCtx && window.AudioContext) {
            try { audioCtx = new AudioContext(); } catch (e) { audioCtx = null; }
        }
        return audioCtx;
    }
    function playTone(freq, duration, type) {
        if (!soundEnabled) return;
        var ctx = ensureAudio();
        if (!ctx) return;
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.type = type || 'sine';
        osc.frequency.value = freq || 600;
        gain.gain.value = 0.04;
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (duration || 0.12));
        osc.stop(ctx.currentTime + (duration || 0.12));
    }
    function playClick() { playTone(880, 0.08, 'sine'); }
    function playSuccess() {
        playTone(660, 0.10, 'sine');
        setTimeout(function () { playTone(880, 0.12, 'sine'); }, 80);
    }
    function playError() { playTone(220, 0.18, 'sawtooth'); }
    window.altorraSound = { click: playClick, success: playSuccess, error: playError };

    function attachSoundToggle() {
        if (document.getElementById('visSoundToggle')) return;
        var btn = document.createElement('button');
        btn.id = 'visSoundToggle';
        btn.className = 'vis-sound-toggle' + (soundEnabled ? ' is-on' : '');
        btn.setAttribute('aria-label', 'Activar/desactivar sonido');
        btn.setAttribute('data-tooltip', soundEnabled ? 'Sonido activado' : 'Sonido desactivado');
        btn.innerHTML = '<i data-lucide="' + (soundEnabled ? 'volume-2' : 'volume-x') + '" width="18" height="18"></i>';
        document.body.appendChild(btn);
        if (window.lucide && window.lucide.createIcons) try { window.lucide.createIcons(); } catch (e) {}
        btn.addEventListener('click', function () {
            soundEnabled = !soundEnabled;
            try { localStorage.setItem('altorra_sound', soundEnabled ? '1' : '0'); } catch (e) {}
            btn.classList.toggle('is-on', soundEnabled);
            btn.innerHTML = '<i data-lucide="' + (soundEnabled ? 'volume-2' : 'volume-x') + '" width="18" height="18"></i>';
            if (window.lucide && window.lucide.createIcons) try { window.lucide.createIcons(); } catch (e) {}
            if (soundEnabled) playSuccess();
        });
    }

    /* ─── 9. CLICK SOUND auto-attach a buttons importantes ─── */
    document.addEventListener('click', function (e) {
        if (!soundEnabled) return;
        var t = e.target;
        if (!t || !t.closest) return;
        if (t.closest('.btn-primary, .alt-btn--primary')) {
            playClick();
        }
    }, true);

    /* ─── 10. PAGE TRANSITIONS via View Transitions API ─── */
    function setupSectionTransitions() {
        if (!('startViewTransition' in document) || _reduceMotion) return;
        if (window.AltorraSections && window.AltorraSections.onChange) {
            window.AltorraSections.onChange(function () {
                /* las view-transitions ya estan en CSS — solo nos aseguramos
                   que el nav este wrapped */
            });
        }
    }

    /* ─── 11. SKELETON LOADERS auto helper ─── */
    function showSkeleton(container, rows) {
        rows = rows || 3;
        var html = '';
        for (var i = 0; i < rows; i++) {
            html += '<div class="vis-skeleton vis-skeleton-row' + (i === 0 ? ' vis-skeleton-row--lg' : '') + '"></div>';
        }
        container.innerHTML = html;
    }
    window.altorraShowSkeleton = showSkeleton;

    /* ─── 12. STAGGER ENTRY automatic ─── */
    function applyStagger(container) {
        if (_reduceMotion || container._visStaggerApplied) return;
        container._visStaggerApplied = true;
        Array.from(container.children).forEach(function (child, i) {
            if (i < 12) {
                child.style.animationDelay = (60 + i * 80) + 'ms';
            }
        });
    }
    function autoAttachStagger() {
        document.querySelectorAll('.stats-grid, .kpis-grid, .hero-kpis, .reports-kpis, .workflows-rules-grid').forEach(function (el) {
            applyStagger(el);
        });
    }

    /* ─── INIT ─── */
    function init() {
        autoAttachRipples();
        autoAttachMagnetic();
        autoAttachStagger();
        attachSoundToggle();
        setupSectionTransitions();

        // Re-scan al cambiar de seccion
        if (window.AltorraSections && window.AltorraSections.onChange) {
            window.AltorraSections.onChange(function () {
                setTimeout(function () {
                    autoAttachRipples();
                    autoAttachStagger();
                }, 120);
            });
        }

        // MutationObserver suave para nodos nuevos (modales, etc)
        if (window.MutationObserver) {
            var mo = new MutationObserver(function (mutations) {
                var hasAdded = mutations.some(function (m) {
                    return m.addedNodes && m.addedNodes.length > 0;
                });
                if (hasAdded) {
                    if (mo._t) clearTimeout(mo._t);
                    mo._t = setTimeout(function () {
                        autoAttachRipples();
                        autoAttachMagnetic();
                    }, 220);
                }
            });
            mo.observe(document.body, { childList: true, subtree: true });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    /* ─── PUBLIC API ─── */
    window.AltorraVisionaryMaster = {
        attachRipple: attachRipple,
        attachMagnetic: attachMagnetic,
        confetti: fireConfetti,
        showUndoToast: showUndoToast,
        shake: shakeElement,
        sound: window.altorraSound,
        showSkeleton: showSkeleton,
        rescan: function () {
            autoAttachRipples();
            autoAttachMagnetic();
            autoAttachStagger();
        }
    };
})();
