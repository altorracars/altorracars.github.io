/**
 * ALTORRA CARS — Header Diagnostic (RCA Mode)
 * ============================================
 *
 * MODO: telemetría temporal. NO bindea handlers. NO previene clicks.
 * Solo CAPTURA cualquier click sobre el header en capture phase y
 * reporta a consola qué elemento está realmente recibiendo el click.
 *
 * Esto nos dice si hay algún elemento invisible interceptando los
 * clicks antes de que lleguen a los botones (mic / activity / bell).
 *
 * Después del diagnóstico este archivo se reemplaza por la solución
 * estructural definitiva.
 */
(function () {
    'use strict';
    if (window.__altorraDiagnosticLoaded) return;
    window.__altorraDiagnosticLoaded = true;

    // Capture phase: vemos el evento ANTES que cualquier otro handler.
    document.addEventListener('click', function (e) {
        var rect = null;
        var btn = null;
        // Detecta si el click cae sobre el área de uno de los 3 botones
        var ids = ['activityFeedTrigger', 'altorra-voice-btn', 'headerNotifBell'];
        for (var i = 0; i < ids.length; i++) {
            var el = document.getElementById(ids[i]);
            if (!el) continue;
            var r = el.getBoundingClientRect();
            if (e.clientX >= r.left && e.clientX <= r.right &&
                e.clientY >= r.top && e.clientY <= r.bottom) {
                btn = el;
                rect = r;
                break;
            }
        }
        if (!btn) return; // click fuera del area de los 3 botones, ignorar

        // Reporte
        console.warn('═══ [RCA-DIAG] click sobre área del botón ═══');
        console.log('Botón:', btn.id, 'rect:', { l: rect.left, t: rect.top, r: rect.right, b: rect.bottom });
        console.log('Click en:', { x: e.clientX, y: e.clientY });
        console.log('e.target:', e.target.tagName,
                    'id="' + e.target.id + '"',
                    'class="' + (e.target.className + '').substr(0, 60) + '"');

        // Lista TODOS los elementos en el punto exacto, ordenados por z-index
        var path = document.elementsFromPoint(e.clientX, e.clientY);
        console.log('Stack en el punto (top → bottom):');
        path.slice(0, 8).forEach(function (el, idx) {
            try {
                var cs = getComputedStyle(el);
                console.log('  [' + idx + ']',
                    el.tagName,
                    'id="' + el.id + '"',
                    'class="' + (el.className + '').toString().substr(0, 50) + '"',
                    'z=' + cs.zIndex,
                    'pe=' + cs.pointerEvents,
                    'pos=' + cs.position);
            } catch (err) {}
        });

        // ¿El target es el botón o un descendiente?
        if (e.target === btn || btn.contains(e.target)) {
            console.log('✅ e.target ESTÁ DENTRO del botón. Si no funciona, es por handler.');
        } else {
            console.error('❌ e.target NO está dentro del botón. Hay un overlay tapando.');
            console.error('   Overlay culpable (top de la pila):', path[0]);
        }
        console.warn('═══════════════════════════════════════════════');
    }, true); // capture phase

    console.info('[RCA-DIAG] Telemetría instalada. Hacé click en mic/activity/bell y mirá la consola.');
})();
