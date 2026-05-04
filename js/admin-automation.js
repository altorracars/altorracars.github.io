/**
 * ALTORRA CARS — Admin automation rules (MF6.1)
 *
 * Predefined automation rules with admin-toggleable enable/disable.
 * Stored in config/automationRules. Evaluated client-side when
 * AP.appointments updates.
 *
 * Future-proofed structure: rules have id, name, trigger, condition,
 * action descriptors so custom rules can be added in MF6.x.
 */
(function () {
    'use strict';
    var AP = window.AP;
    if (!AP) return;
    var $ = AP.$;

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
                }).catch(function () {});
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

    // Init when admin authenticates
    var attempts = 0;
    var int = setInterval(function () {
        attempts++;
        if (window.auth && window.auth.currentUser && AP.isEditorOrAbove && AP.isEditorOrAbove()) {
            loadRules().then(function () {
                renderRulesUI();
                startSlaCheckLoop();
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
        renderUI: renderRulesUI
    };
})();
