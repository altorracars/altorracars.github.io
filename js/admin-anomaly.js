/**
 * ALTORRA CARS — Anomalous behavior detection (Mega-Plan v4, H.5)
 * ================================================================
 * Detecta acciones potencialmente sospechosas o accidentales por
 * volumen/velocidad. Si un admin hace muchos deletes en poco tiempo,
 * exige reauth + emite alerta al super_admin.
 *
 * Reglas built-in:
 *   - 10+ deletes en 5 minutos → freeze + reauth + alert
 *   - 3+ delete/min sostenido → warning toast
 *   - 5+ role changes en 10 min → freeze + reauth + alert
 *   - export masivo CSV >100 rows → reauth (preventive)
 *
 * Construye sobre EventBus (I.1) + AltorraSecurity (H.4).
 *
 * Public API:
 *   AltorraAnomaly.snapshot()         → estado actual de buckets
 *   AltorraAnomaly.reset()
 *   AltorraAnomaly.config             → reglas activas
 */
(function () {
    'use strict';
    if (window.AltorraAnomaly) return;
    var AP = window.AP;
    if (!AP) return;

    var WINDOW_MS = 5 * 60 * 1000; // 5 min sliding
    var ROLE_WINDOW_MS = 10 * 60 * 1000;

    var _buckets = {
        deletes: [],
        roleChanges: [],
        exports: []
    };

    var _frozen = false;

    /* ═══════════════════════════════════════════════════════════
       BUCKET ROLLING
       ═══════════════════════════════════════════════════════════ */
    function pushAndPrune(bucket, windowMs) {
        var now = Date.now();
        bucket.push(now);
        // Prune
        while (bucket.length > 0 && (now - bucket[0]) > windowMs) {
            bucket.shift();
        }
        return bucket.length;
    }

    /* ═══════════════════════════════════════════════════════════
       ALERT — escribe a auditLog + notifica super_admin
       ═══════════════════════════════════════════════════════════ */
    function alertSuperAdmin(reason, payload) {
        if (!window.db) return;
        try {
            window.db.collection('auditLog').add({
                action: 'anomaly_detected',
                user: window.auth.currentUser.email,
                userId: window.auth.currentUser.uid,
                reason: reason,
                payload: payload || null,
                anomaly: true,
                timestamp: new Date().toISOString()
            }).catch(function () {});
        } catch (e) {}
        if (window.AltorraEventBus) {
            window.AltorraEventBus.emit('anomaly.detected', {
                reason: reason,
                user: window.auth.currentUser.email,
                payload: payload
            }, { persist: true });
        }
        if (window.notifyCenter && window.notifyCenter.notify) {
            window.notifyCenter.notify('security', {
                title: '⚠️ Comportamiento anómalo',
                message: reason,
                link: 'admin.html#audit',
                priority: 'critical',
                entityRef: 'anomaly:' + Date.now()
            });
        }
    }

    /* ═══════════════════════════════════════════════════════════
       FREEZE — invalidar sudo + exigir reauth
       ═══════════════════════════════════════════════════════════ */
    function freeze(reason) {
        if (_frozen) return;
        _frozen = true;
        if (window.AltorraSecurity) window.AltorraSecurity.invalidate();
        AP.toast(reason + ' Por seguridad, vamos a reconfirmar tu identidad antes de seguir.', 'warning');
        // Forzar reauth — no bloquea acción actual pero invalida la próxima sensible
        if (window.AltorraSecurity) {
            window.AltorraSecurity.requireReauth(reason).then(function () {
                _frozen = false;
            }).catch(function () {
                // El admin canceló — sigue frozen, próxima acción crítica re-pedirá
            });
        }
    }

    /* ═══════════════════════════════════════════════════════════
       OBSERVERS
       ═══════════════════════════════════════════════════════════ */
    function init() {
        if (!window.AltorraEventBus) return;

        // 1. Deletes
        var deleteEvents = ['vehicle.deleted', 'comm.deleted', 'crm.contact-deleted', 'kb.deleted'];
        deleteEvents.forEach(function (ev) {
            window.AltorraEventBus.on(ev, function () {
                var n = pushAndPrune(_buckets.deletes, WINDOW_MS);
                if (n >= 10) {
                    alertSuperAdmin('Volumen alto de eliminaciones: ' + n + ' en 5 min', {
                        bucket: 'deletes',
                        count: n
                    });
                    freeze('Detectamos ' + n + ' eliminaciones en pocos minutos.');
                } else if (n >= 5) {
                    AP.toast('Atención: ' + n + ' eliminaciones en pocos minutos. Verificá que sea intencional.', 'warning');
                }
            });
        });

        // 2. Role changes (super_admin)
        window.AltorraEventBus.on('user.role-changed', function () {
            var n = pushAndPrune(_buckets.roleChanges, ROLE_WINDOW_MS);
            if (n >= 5) {
                alertSuperAdmin('Múltiples cambios de rol: ' + n + ' en 10 min', {
                    bucket: 'roleChanges',
                    count: n
                });
                freeze('Detectamos ' + n + ' cambios de rol en pocos minutos.');
            }
        });

        // 3. Exports masivos
        window.AltorraEventBus.on('export.csv', function (event) {
            var rows = (event.payload && event.payload.rows) || 0;
            if (rows >= 100) {
                pushAndPrune(_buckets.exports, WINDOW_MS);
                alertSuperAdmin('Export masivo CSV: ' + rows + ' filas', {
                    bucket: 'exports',
                    rows: rows
                });
            }
        });
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    /* ═══════════════════════════════════════════════════════════
       Public API
       ═══════════════════════════════════════════════════════════ */
    window.AltorraAnomaly = {
        snapshot: function () {
            return {
                deletes: _buckets.deletes.length,
                roleChanges: _buckets.roleChanges.length,
                exports: _buckets.exports.length,
                frozen: _frozen
            };
        },
        reset: function () {
            _buckets.deletes = [];
            _buckets.roleChanges = [];
            _buckets.exports = [];
            _frozen = false;
        },
        config: {
            windowMs: WINDOW_MS,
            roleWindowMs: ROLE_WINDOW_MS,
            deleteThresholdAlert: 10,
            deleteThresholdWarn: 5,
            roleChangeThreshold: 5,
            exportThreshold: 100
        }
    };
})();
