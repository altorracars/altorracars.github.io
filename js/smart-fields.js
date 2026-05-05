/**
 * ALTORRA CARS — Smart Fields engine (Mega-Plan v4, Microfase K.2)
 * =================================================================
 * Auto-derives values for fields when the source data implies them.
 *
 * Used by admin-vehicles.js when saving — the form passes a doc to
 * `AltorraSmartFields.derive(doc)` which returns a copy with derived
 * fields filled in (only for blank/missing fields — never overrides
 * a value the admin set explicitly).
 *
 * Example:
 *   km == 0 && tipo blank → tipo = 'nuevo'
 *   km > 0 && km <= 10000 && tipo blank → tipo = 'semi-nuevo'
 *   km > 10000 && tipo blank → tipo = 'usado'
 *
 * Each derivation has:
 *   - field: the field it writes
 *   - condition(doc): boolean — should this rule apply
 *   - derive(doc): returns the value to assign
 *   - reason: human-readable explanation (shown in admin UI tooltip)
 *
 * Public API:
 *   AltorraSmartFields.derive(doc) → { result, derived: [{field, value, reason}] }
 *   AltorraSmartFields.preview(doc) → array of suggestions WITHOUT mutating
 *   AltorraSmartFields.rules → introspectable list (for K.6 visual builder)
 */
(function () {
    'use strict';
    if (window.AltorraSmartFields) return;

    function isBlank(v) {
        return v === undefined || v === null || v === '' || (typeof v === 'number' && isNaN(v));
    }

    /* ═══════════════════════════════════════════════════════════
       Derivation rules — pure functions, no side effects
       ═══════════════════════════════════════════════════════════ */
    var RULES = [
        {
            id: 'tipo_from_km',
            field: 'tipo',
            description: 'Determina nuevo / semi-nuevo / usado según kilometraje',
            condition: function (doc) {
                return isBlank(doc.tipo) && !isBlank(doc.kilometraje);
            },
            derive: function (doc) {
                var km = parseInt(doc.kilometraje, 10) || 0;
                if (km === 0) return { value: 'nuevo', reason: 'kilometraje 0' };
                if (km <= 10000) return { value: 'semi-nuevo', reason: 'kilometraje ≤ 10.000' };
                return { value: 'usado', reason: 'kilometraje > 10.000' };
            }
        },
        {
            id: 'estado_default',
            field: 'estado',
            description: 'Default a "disponible" para vehículos nuevos sin estado',
            condition: function (doc) {
                return isBlank(doc.estado);
            },
            derive: function () {
                return { value: 'disponible', reason: 'sin estado especificado' };
            }
        },
        {
            id: 'oferta_from_precioOferta',
            field: 'oferta',
            description: 'Marca la oferta automáticamente si hay precioOferta válido < precio',
            condition: function (doc) {
                if (!isBlank(doc.oferta)) return false; // admin set it
                var po = parseFloat(doc.precioOferta);
                var p = parseFloat(doc.precio);
                return !isNaN(po) && !isNaN(p) && po > 0 && po < p;
            },
            derive: function () {
                return { value: true, reason: 'precioOferta < precio' };
            }
        },
        {
            id: 'puertas_default',
            field: 'puertas',
            description: 'Default puertas a 5 si no se especifica',
            condition: function (doc) {
                return isBlank(doc.puertas);
            },
            derive: function () {
                return { value: 5, reason: 'default estándar' };
            }
        },
        {
            id: 'pasajeros_default',
            field: 'pasajeros',
            description: 'Default pasajeros a 5 si no se especifica',
            condition: function (doc) {
                return isBlank(doc.pasajeros) && isBlank(doc.asientos);
            },
            derive: function () {
                return { value: 5, reason: 'default estándar' };
            }
        },
        {
            id: 'ubicacion_default',
            field: 'ubicacion',
            description: 'Default ubicación a "Cartagena"',
            condition: function (doc) {
                return isBlank(doc.ubicacion);
            },
            derive: function () {
                return { value: 'Cartagena', reason: 'sede principal' };
            }
        }
    ];

    /* ═══════════════════════════════════════════════════════════
       PREVIEW — read-only inspection of what would be derived
       ═══════════════════════════════════════════════════════════ */
    function preview(doc) {
        var d = doc || {};
        var suggestions = [];
        RULES.forEach(function (r) {
            try {
                if (!r.condition(d)) return;
                var out = r.derive(d);
                if (out && !isBlank(out.value)) {
                    suggestions.push({
                        ruleId: r.id,
                        field: r.field,
                        value: out.value,
                        reason: out.reason || r.description
                    });
                }
            } catch (e) {}
        });
        return suggestions;
    }

    /* ═══════════════════════════════════════════════════════════
       DERIVE — applies all rules to a copy of the doc
       Returns { result, derived } where:
         result = doc with derived fields filled in
         derived = array of {field, value, reason} for what was applied
       Idempotent: re-running on the same result yields no new derivations.
       ═══════════════════════════════════════════════════════════ */
    function derive(doc) {
        var result = Object.assign({}, doc || {});
        var applied = [];
        // Apply in order — later rules can read fields filled by earlier rules
        RULES.forEach(function (r) {
            try {
                if (!r.condition(result)) return;
                var out = r.derive(result);
                if (out && !isBlank(out.value)) {
                    result[r.field] = out.value;
                    applied.push({
                        ruleId: r.id,
                        field: r.field,
                        value: out.value,
                        reason: out.reason || r.description
                    });
                }
            } catch (e) {}
        });
        return { result: result, derived: applied };
    }

    /* ═══════════════════════════════════════════════════════════
       Helpers for admin-vehicles to format suggestions visually
       ═══════════════════════════════════════════════════════════ */
    function formatSuggestion(s) {
        var labels = {
            tipo: 'Tipo',
            estado: 'Estado',
            oferta: 'Oferta',
            puertas: 'Puertas',
            pasajeros: 'Pasajeros',
            ubicacion: 'Ubicación'
        };
        var label = labels[s.field] || s.field;
        return label + ': ' + s.value + ' (' + s.reason + ')';
    }

    window.AltorraSmartFields = {
        derive: derive,
        preview: preview,
        rules: RULES.map(function (r) {
            return { id: r.id, field: r.field, description: r.description };
        }),
        formatSuggestion: formatSuggestion,
        // For K.6 (visual builder): the raw rule list including functions
        _internalRules: RULES
    };
})();
