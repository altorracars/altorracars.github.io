/**
 * ALTORRA CARS — Admin automation rules (MF6.1 + Mega-Plan v4 K.1)
 *
 * Predefined automation rules with admin-toggleable enable/disable.
 * Stored in config/automationRules. Evaluated client-side via two paths:
 *
 *   1. EventBus subscriptions (K.1) — REAL-TIME, the canonical path.
 *      Subscribes to `comm.created`, `comm.estado-changed`, `vehicle.updated`
 *      and runs matching rules. Fires immediately when an admin action
 *      happens, no polling.
 *
 *   2. Periodic SLA loop — scheduled checks for time-based rules
 *      (`sla_check`) that can't be event-driven.
 *
 * Event-trigger mapping:
 *   comm_created          ← AltorraEventBus 'comm.created'
 *   comm_status_change    ← AltorraEventBus 'comm.estado-changed'
 *   vehicle_updated       ← AltorraEventBus 'vehicle.updated'
 *   sla_check             ← timer (60s loop on super_admin sessions)
 *
 * Cycle protection (K.1):
 *   - Per-event execution counter caps at MAX_RULES_PER_EVENT (10) to
 *     prevent infinite loops where a rule's action triggers another event
 *     that re-fires the rule.
 *   - Replays from Activity Feed (`__replay: true`) are skipped — replays
 *     are for debugging listeners visually, not for re-running automation.
 *
 * Future-proofed structure: rules have id, name, trigger, condition,
 * action descriptors so custom rules can be added in K.6 (visual builder).
 */
(function () {
    'use strict';
    var AP = window.AP;
    if (!AP) return;
    var $ = AP.$;

    // K.1 — cycle protection cap
    var MAX_RULES_PER_EVENT = 10;
    var _executionCount = 0;
    var _executionEventId = null;

    // K.1 — map EventBus types to legacy trigger names used in BUILT_IN_RULES
    var BUS_TO_TRIGGER = {
        'comm.created':         'comm_created',
        'comm.estado-changed':  'comm_status_change',
        'vehicle.updated':      'vehicle_updated'
    };

    // ─── Built-in rule library ───────────────────────────────────
    var BUILT_IN_RULES = [
        {
            id: 'route_high_value_financiacion',
            name: 'Asignar financiación alto-valor a super_admin',
            description: 'Si llega una financiación con cuota inicial ≥ $50M, se auto-asigna al super_admin.',
            trigger: 'comm_created',
            enabled: true,
            evaluate: function (doc) {
                if (doc.tipo !== 'financiacion') return null;
                if (!doc.tags || doc.tags.indexOf('alto-valor') === -1) return null;
                if (doc.assignedTo) return null;
                return { action: 'assign_to_super_admin', reason: 'financiación de alto valor' };
            }
        },
        {
            id: 'sla_breach_notify_super',
            name: 'Notificar al super_admin si SLA vencido sin asignar',
            description: 'Si una solicitud lleva más del SLA sin respuesta y no está asignada, notifica al super_admin.',
            trigger: 'sla_check',
            enabled: true,
            evaluate: function (doc) {
                if (doc.estado !== 'pendiente' && doc.estado !== 'nuevo') return null;
                if (doc.assignedTo) return null;
                if (!doc.slaDeadline) return null;
                if (Date.now() < new Date(doc.slaDeadline).getTime()) return null;
                return { action: 'notify_super_admin', reason: 'SLA vencido sin asignar' };
            }
        },
        {
            id: 'auto_tag_repeat_visitor',
            name: 'Etiquetar visitantes repetidos',
            description: 'Si un cliente registrado ya envió 3+ solicitudes, agregar tag "cliente-recurrente".',
            trigger: 'comm_created',
            enabled: true,
            evaluate: function (doc) {
                // Counter computed externally
                return null; // placeholder — applied via batch script
            }
        },
        {
            id: 'cita_24h_reminder',
            name: 'Recordatorio 24h antes de cita',
            description: 'Crea un follow-up 24h antes de cada cita confirmada (MF6.2).',
            trigger: 'comm_status_change',
            enabled: false, // off until MF6.2 ships scheduler
            evaluate: function () { return null; }
        }
    ];

    AP._automationRulesEnabled = {};

    function loadRules() {
        if (!window.db) return;
        return window.db.collection('config').doc('automationRules').get().then(function (doc) {
            var data = doc.exists ? doc.data() : {};
            AP._automationRulesEnabled = data.enabled || {};
            // Apply defaults for missing rule entries
            BUILT_IN_RULES.forEach(function (r) {
                if (AP._automationRulesEnabled[r.id] === undefined) {
                    AP._automationRulesEnabled[r.id] = r.enabled;
                }
            });
        });
    }

    function saveRule(ruleId, enabled) {
        if (!window.db) return Promise.reject('no-db');
        AP._automationRulesEnabled[ruleId] = enabled;
        return window.db.collection('config').doc('automationRules').set({
            enabled: AP._automationRulesEnabled,
            updatedAt: new Date().toISOString(),
            updatedBy: window.auth.currentUser.email
        }, { merge: true });
    }

    function isRuleEnabled(ruleId) {
        return AP._automationRulesEnabled[ruleId] !== false;
    }

    /** Evaluate all enabled rules of a given trigger against a doc */
    function evaluateRules(triggerType, doc) {
        var matches = [];
        BUILT_IN_RULES.forEach(function (rule) {
            if (rule.trigger !== triggerType) return;
            if (!isRuleEnabled(rule.id)) return;
            try {
                var result = rule.evaluate(doc);
                if (result) matches.push({ rule: rule, result: result, doc: doc });
            } catch (e) {}
        });
        return matches;
    }

    /** K.3 — log each rule execution to Firestore for auditing
     * Best-effort write to `automationLog/{auto_id}` — silent on failure */
    function logExecution(match, outcome) {
        if (!window.db) return;
        try {
            var entry = {
                ruleId: match.rule.id,
                ruleName: match.rule.name,
                trigger: match.rule.trigger,
                action: match.result.action,
                reason: match.result.reason || '',
                docId: (match.doc && match.doc._docId) || null,
                docTitle: (match.doc && (match.doc.nombre || match.doc.marca || '')) || '',
                outcome: outcome || 'applied',
                timestamp: new Date(),
                by: (window.auth && window.auth.currentUser) ? window.auth.currentUser.uid : null,
                bySource: 'automation'
            };
            window.db.collection('automationLog').add(entry).catch(function () {});
        } catch (e) {}
    }

    function applyAction(match) {
        var doc = match.doc;
        var action = match.result.action;

        if (action === 'assign_to_super_admin' && AP.users) {
            var sa = AP.users.find(function (u) {
                return u.estado === 'activo' && u.rol === 'super_admin';
            });
            if (sa && doc._docId) {
                window.db.collection('solicitudes').doc(doc._docId).update({
                    assignedTo: sa.uid,
                    assignedToName: sa.nombre || sa.email,
                    assignedAt: new Date().toISOString(),
                    automationRule: match.rule.id
                }).then(function () { logExecution(match, 'applied'); })
                  .catch(function () { logExecution(match, 'failed'); });
            } else {
                logExecution(match, 'skipped:no-super-admin');
            }
        } else if (action === 'notify_super_admin') {
            if (window.notifyCenter && window.notifyCenter.notify) {
                window.notifyCenter.notify('system', {
                    title: 'SLA vencido sin asignar',
                    message: (doc.nombre || 'Cliente') + ' — ' + (doc.vehiculo || '') + ' — ' + (match.rule.name),
                    link: 'admin.html#solicitudes',
                    entityRef: 'sla-breach:' + doc._docId,
                    priority: 'high'
                });
                logExecution(match, 'applied');
            }
        }
    }

    /** Hooked into appointments listener — runs evaluation on relevant events */
    function checkRulesForNewDocs(snap) {
        if (!AP.isSuperAdmin || !AP.isSuperAdmin()) return; // only super_admin runs auto-routing
        snap.docChanges().forEach(function (chg) {
            if (chg.type !== 'added') return;
            var d = Object.assign({ _docId: chg.doc.id }, chg.doc.data());
            evaluateRules('comm_created', d).forEach(applyAction);
        });
    }

    /** K.1 — EventBus dispatcher with cycle protection */
    function onBusEvent(event) {
        if (!AP.isSuperAdmin || !AP.isSuperAdmin()) return;
        if (!event || !event.type) return;
        // Skip replays — they exist to debug listeners visually, not to re-fire rules
        if (event.payload && event.payload.__replay === true) return;

        var triggerName = BUS_TO_TRIGGER[event.type];
        if (!triggerName) return;

        // Cycle protection: cap executions per source event
        if (_executionEventId !== event.id) {
            _executionEventId = event.id;
            _executionCount = 0;
        }
        if (_executionCount >= MAX_RULES_PER_EVENT) {
            console.warn('[Automation] Cycle cap reached for event', event.id, 'type', event.type);
            return;
        }

        // Build a doc-shaped object the rules can evaluate
        var doc = Object.assign({ _docId: (event.payload && event.payload.id) || null }, event.payload || {});
        // For comm.estado-changed, the canonical estado is in payload.estado (I.4)
        if (event.type === 'comm.estado-changed' && event.payload && event.payload.estado) {
            doc.estado = event.payload.estado;
        }

        evaluateRules(triggerName, doc).forEach(function (m) {
            _executionCount++;
            applyAction(m);
        });
    }

    /** Periodic SLA check — runs every minute on super_admin sessions */
    function startSlaCheckLoop() {
        if (!AP.isSuperAdmin || !AP.isSuperAdmin()) return;
        var notifiedIds = {};
        setInterval(function () {
            (AP.appointments || []).forEach(function (a) {
                if (notifiedIds[a._docId]) return;
                evaluateRules('sla_check', a).forEach(function (m) {
                    notifiedIds[a._docId] = true;
                    applyAction(m);
                });
            });
        }, 60 * 1000);
    }

    // ─── Admin UI: render rule list ──────────────────────────────
    function renderRulesUI() {
        var container = document.getElementById('automationRulesList');
        if (!container) return;
        container.innerHTML = BUILT_IN_RULES.map(function (r) {
            var on = isRuleEnabled(r.id);
            return '<div class="automation-rule">' +
                '<div class="automation-rule-info">' +
                    '<div class="automation-rule-name">' + r.name + '</div>' +
                    '<div class="automation-rule-desc">' + r.description + '</div>' +
                    '<div class="automation-rule-trigger">Disparador: <strong>' + r.trigger + '</strong></div>' +
                '</div>' +
                '<label class="automation-toggle">' +
                    '<input type="checkbox" data-rule-id="' + r.id + '"' + (on ? ' checked' : '') + '>' +
                    '<span class="automation-slider"></span>' +
                '</label>' +
            '</div>';
        }).join('');
    }

    // ─── K.3: Execution history viewer ──────────────────────────
    function loadHistory() {
        var listEl = document.getElementById('automationHistoryList');
        if (!listEl || !window.db) return;
        listEl.innerHTML = '<div class="table-empty">Cargando…</div>';
        window.db.collection('automationLog')
            .orderBy('timestamp', 'desc')
            .limit(50)
            .get()
            .then(function (snap) {
                if (snap.empty) {
                    listEl.innerHTML = '<div class="table-empty">Sin ejecuciones aún.</div>';
                    return;
                }
                var rows = [];
                snap.forEach(function (d) {
                    var x = d.data();
                    var ts = x.timestamp;
                    if (ts && typeof ts.toMillis === 'function') ts = new Date(ts.toMillis());
                    else ts = new Date(ts);
                    var when = ts.toLocaleString('es-CO', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
                    var outcomeColor = x.outcome === 'applied' ? 'var(--status-success)' :
                                       (x.outcome === 'failed' ? 'var(--status-danger)' : 'var(--text-tertiary)');
                    rows.push(
                        '<div class="automation-history-row">' +
                            '<div class="automation-history-row-main">' +
                                '<span class="automation-history-rule">' + (x.ruleName || x.ruleId || 'regla') + '</span>' +
                                (x.docTitle ? '<span class="automation-history-doc"> · ' + x.docTitle + '</span>' : '') +
                            '</div>' +
                            '<div class="automation-history-row-meta">' +
                                '<span style="color:' + outcomeColor + ';">' + (x.outcome || 'applied') + '</span>' +
                                '<span> · ' + when + '</span>' +
                                (x.action ? '<span> · ' + x.action + '</span>' : '') +
                            '</div>' +
                        '</div>'
                    );
                });
                listEl.innerHTML = rows.join('');
            })
            .catch(function (err) {
                listEl.innerHTML = '<div class="table-empty">Error: ' + (err.message || err) + '</div>';
            });
    }

    // Refresh button
    document.addEventListener('click', function (e) {
        if (e.target && e.target.closest && e.target.closest('#automationHistoryRefresh')) {
            loadHistory();
        }
    });

    // Auto-load when admin opens the Automatización section
    if (window.AltorraSections && window.AltorraSections.onChange) {
        window.AltorraSections.onChange(function (section) {
            if (section === 'automation') loadHistory();
        });
    }

    // Wire toggle changes
    document.addEventListener('change', function (e) {
        if (e.target && e.target.matches('input[data-rule-id]')) {
            var id = e.target.getAttribute('data-rule-id');
            saveRule(id, e.target.checked).then(function () {
                if (AP.toast) AP.toast('Regla ' + (e.target.checked ? 'activada' : 'desactivada'));
            }).catch(function (err) {
                if (AP.toast) AP.toast('Error: ' + err.message, 'error');
                e.target.checked = !e.target.checked;
            });
        }
    });

    // K.1 — subscribe to EventBus once (idempotent guard)
    var _busUnsub = null;
    function subscribeToBus() {
        if (_busUnsub) return;
        if (!window.AltorraEventBus) return;
        _busUnsub = window.AltorraEventBus.on('*', onBusEvent);
    }
    function unsubscribeFromBus() {
        if (_busUnsub) { try { _busUnsub(); } catch (e) {} _busUnsub = null; }
    }

    // Init when admin authenticates
    var attempts = 0;
    var int = setInterval(function () {
        attempts++;
        if (window.auth && window.auth.currentUser && AP.isEditorOrAbove && AP.isEditorOrAbove()) {
            loadRules().then(function () {
                renderRulesUI();
                startSlaCheckLoop();
                subscribeToBus(); // K.1
            });
            clearInterval(int);
        } else if (attempts > 60) clearInterval(int);
    }, 500);

    AP.evaluateRules = evaluateRules;
    AP.applyAutomationAction = applyAction;
    AP.checkRulesForNewDocs = checkRulesForNewDocs;

    window.AltorraAutomation = {
        rules: BUILT_IN_RULES,
        isEnabled: isRuleEnabled,
        evaluate: evaluateRules,
        renderUI: renderRulesUI,
        // K.1 — bus integration helpers (mainly for diagnostics)
        _onBusEvent: onBusEvent,
        _subscribeToBus: subscribeToBus,
        _unsubscribeFromBus: unsubscribeFromBus,
        _executionState: function () { return { count: _executionCount, eventId: _executionEventId, cap: MAX_RULES_PER_EVENT }; }
    };
})();
