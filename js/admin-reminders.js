/**
 * ALTORRA CARS — Recordatorios automáticos (Mega-Plan v4, D.5)
 * ==============================================================
 * Cron-like en el browser del admin (solo super_admin para evitar
 * dups multi-tab) que detecta citas próximas y dispara avisos.
 *
 * Reglas:
 *   - Citas para MAÑANA con estado pendiente/confirmada → notify center
 *     "Confirmá la cita de X" 1 vez al día por cita
 *   - Citas para DENTRO DE 2H sin estado completada → toast warning
 *     "Cita de X en 2h"
 *   - Citas vencidas (fecha pasada, estado pendiente/confirmada) →
 *     1 vez sugiere marcar como completada/no_show
 *
 * Uses `appointmentReminders/{docId}` to track which reminders were
 * already shown (avoid spam). Document shape:
 *   { reminderType: 'tomorrow' | '2h' | 'overdue',
 *     shownAt: ISO,
 *     citaDocId: string }
 *
 * Public API:
 *   AltorraReminders.check()   → ejecutar ciclo manualmente
 *   AltorraReminders.snapshot() → estado actual
 */
(function () {
    'use strict';
    if (window.AltorraReminders) return;
    var AP = window.AP;
    if (!AP) return;

    var CHECK_INTERVAL_MS = 5 * 60 * 1000; // 5 min
    var DAY_MS = 86400000;
    var _shownThisSession = {}; // dedup en runtime
    var _interval = null;

    function todayISO() {
        return new Date().toISOString().slice(0, 10);
    }
    function tomorrowISO() {
        var t = new Date();
        t.setDate(t.getDate() + 1);
        return t.toISOString().slice(0, 10);
    }

    function citaTime(c) {
        if (!c.fecha) return null;
        var hora = c.hora || '00:00';
        var t = new Date(c.fecha + 'T' + hora);
        return isNaN(t.getTime()) ? null : t.getTime();
    }

    /* ═══════════════════════════════════════════════════════════
       FIRESTORE TRACKING — evitar dups cross-session
       ═══════════════════════════════════════════════════════════ */
    function alreadyShown(citaDocId, reminderType) {
        var key = reminderType + ':' + citaDocId;
        return !!_shownThisSession[key];
    }
    function markShown(citaDocId, reminderType) {
        var key = reminderType + ':' + citaDocId;
        _shownThisSession[key] = Date.now();
        // Persist to Firestore (best-effort)
        if (window.db) {
            window.db.collection('appointmentReminders').add({
                reminderType: reminderType,
                citaDocId: citaDocId,
                shownAt: new Date().toISOString(),
                shownTo: window.auth.currentUser.uid
            }).catch(function () {});
        }
    }

    /* ═══════════════════════════════════════════════════════════
       CHECK CYCLE
       ═══════════════════════════════════════════════════════════ */
    function check() {
        if (!AP.isSuperAdmin || !AP.isSuperAdmin()) return; // solo super_admin para no spam multi-tab
        if (!AP.appointments) return;

        var citas = AP.appointments.filter(function (a) {
            var isCita = a.kind === 'cita' || a.requiereCita ||
                (window.AltorraCommSchema && window.AltorraCommSchema.inferKind &&
                 window.AltorraCommSchema.inferKind(a) === 'cita');
            return isCita && a.fecha;
        });

        var now = Date.now();
        var tomorrow = tomorrowISO();
        var today = todayISO();
        var stats = { tomorrowCount: 0, soonCount: 0, overdueCount: 0 };

        citas.forEach(function (c) {
            if (!c._docId) return;
            var f = (c.fecha || '').slice(0, 10);
            var citaT = citaTime(c);
            var estado = c.estado || 'pendiente';

            // 1. Citas para mañana (pendientes/confirmadas)
            if (f === tomorrow && (estado === 'pendiente' || estado === 'confirmada' || estado === 'nuevo')) {
                stats.tomorrowCount++;
                if (!alreadyShown(c._docId, 'tomorrow')) {
                    if (window.notifyCenter && window.notifyCenter.notify) {
                        window.notifyCenter.notify('appointment_update', {
                            title: 'Cita mañana: ' + (c.nombre || 'Cliente'),
                            message: 'A las ' + (c.hora || 'hora a confirmar') +
                                     (c.vehiculo ? ' por ' + c.vehiculo : '') +
                                     '. Confirmá con el cliente.',
                            link: 'admin.html#calendar',
                            entityRef: 'reminder-tom:' + c._docId,
                            priority: 'normal'
                        });
                    }
                    markShown(c._docId, 'tomorrow');
                }
            }

            // 2. Citas en próximas 2h (todavía hoy, no completadas)
            if (citaT && f === today && estado !== 'completada' && estado !== 'cancelada' && estado !== 'no_show') {
                var hrsToCita = (citaT - now) / 3600000;
                if (hrsToCita > 0 && hrsToCita <= 2) {
                    stats.soonCount++;
                    if (!alreadyShown(c._docId, '2h')) {
                        if (window.notifyCenter && window.notifyCenter.notify) {
                            window.notifyCenter.notify('appointment_update', {
                                title: 'Cita en ' + Math.round(hrsToCita) + 'h: ' + (c.nombre || 'Cliente'),
                                message: 'Hoy a las ' + (c.hora || '?') + (c.vehiculo ? ' por ' + c.vehiculo : ''),
                                link: 'admin.html#calendar',
                                entityRef: 'reminder-2h:' + c._docId,
                                priority: 'high'
                            });
                        }
                        markShown(c._docId, '2h');
                    }
                }
            }

            // 3. Citas vencidas (>2h pasadas, todavía pendiente/confirmada)
            if (citaT && now - citaT > 2 * 3600000 && (estado === 'pendiente' || estado === 'confirmada' || estado === 'nuevo')) {
                stats.overdueCount++;
                if (!alreadyShown(c._docId, 'overdue')) {
                    if (window.notifyCenter && window.notifyCenter.notify) {
                        window.notifyCenter.notify('system', {
                            title: 'Cita vencida sin actualizar',
                            message: (c.nombre || 'Cliente') + ' — ' + c.fecha + ' ' + (c.hora || '') +
                                     '. ¿Marcar como completada o no_show?',
                            link: 'admin.html#calendar',
                            entityRef: 'reminder-overdue:' + c._docId,
                            priority: 'high'
                        });
                    }
                    markShown(c._docId, 'overdue');
                }
            }
        });

        return stats;
    }

    /* ═══════════════════════════════════════════════════════════
       INIT
       ═══════════════════════════════════════════════════════════ */
    var attempts = 0;
    var bootIv = setInterval(function () {
        attempts++;
        if (window.auth && window.auth.currentUser && AP.isSuperAdmin && AP.isSuperAdmin()) {
            // Espera que AP.appointments tenga datos
            if (AP.appointments && AP.appointments.length >= 0) {
                check();
                _interval = setInterval(check, CHECK_INTERVAL_MS);
                clearInterval(bootIv);
            }
        } else if (attempts > 60) clearInterval(bootIv);
    }, 2000);

    /* ═══════════════════════════════════════════════════════════
       Public API
       ═══════════════════════════════════════════════════════════ */
    window.AltorraReminders = {
        check: check,
        snapshot: function () {
            return {
                shownThisSession: Object.keys(_shownThisSession).length,
                interval: !!_interval
            };
        },
        reset: function () { _shownThisSession = {}; }
    };
})();
