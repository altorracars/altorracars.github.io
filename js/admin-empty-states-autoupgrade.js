/**
 * AltorraEmptyStatesAutoUpgrade — auto-reemplaza empty states con ilustrados
 * ===========================================================================
 * Patrón: módulos legacy renderean `<p>No hay X</p>` o similar.
 * Este auto-upgrader detecta esos patrones y los reemplaza con
 * `AltorraEmptyStates.render()` para tener visual consistente.
 *
 * Activación: corre cada vez que se cambia de sección via
 * AltorraSections.onChange + observa MutationObserver suave.
 */
(function () {
    'use strict';
    if (window.AltorraEmptyStatesAutoUpgrade) return;
    if (!window.AltorraEmptyStates) {
        // Wait for it
        var tries = 0;
        var iv = setInterval(function () {
            tries++;
            if (window.AltorraEmptyStates) { clearInterval(iv); init(); }
            else if (tries > 30) clearInterval(iv);
        }, 200);
        return;
    }
    init();

    function init() {
        // Mapa de selectores → kind del empty state
        var TARGETS = [
            // CRM unmatched list (existing module)
            { selector: '.unmatched-empty', kind: 'unmatched', once: true },
            // KB FAQs sin entradas
            { selector: '.kb-empty', kind: 'kb' },
            // Audit log vacío
            { selector: '#auditFeed:empty, .audit-empty', kind: 'audit' },
            // Calendar sin citas
            { selector: '.cal-empty, .calendar-empty', kind: 'calendar' }
        ];

        function upgrade() {
            TARGETS.forEach(function (t) {
                document.querySelectorAll(t.selector).forEach(function (el) {
                    if (el._emptyUpgraded) return;
                    var customTitle = el.getAttribute('data-empty-title');
                    var customText = el.getAttribute('data-empty-text');
                    el.innerHTML = window.AltorraEmptyStates.html(t.kind, {
                        title: customTitle || undefined,
                        text: customText || undefined
                    });
                    el._emptyUpgraded = true;
                });
            });
        }

        // Initial
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', upgrade);
        } else {
            setTimeout(upgrade, 200);
        }

        // On section change
        if (window.AltorraSections && window.AltorraSections.onChange) {
            window.AltorraSections.onChange(function () {
                setTimeout(upgrade, 250);
            });
        }

        // §35 — MutationObserver subtree:true ELIMINADO (perf).
        // Los empty states se upgradean en DOMContentLoaded + onChange
        // de seccion. Esos 2 hooks cubren 99% de casos. Si algun
        // modulo necesita upgrade manual, llama AltorraEmptyStatesAutoUpgrade.upgrade()

        window.AltorraEmptyStatesAutoUpgrade = { upgrade: upgrade };
    }
})();
