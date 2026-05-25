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
        },
        {
            // C.4 — Prioridad destacado calculada por antigüedad + tipo
            id: 'prioridad_destacado',
            field: 'prioridadDestacado',
            description: 'Prioridad de destacado calculada (0-100) según antigüedad + tipo + estado',
            condition: function (doc) {
                return isBlank(doc.prioridadDestacado);
            },
            derive: function (doc) {
                var score = 50; // base
                // + bonus por ser nuevo
                if (doc.tipo === 'nuevo') score += 25;
                else if (doc.tipo === 'semi-nuevo') score += 15;
                // + bonus por estar en oferta
                if (doc.oferta || (doc.precioOferta && doc.precio && doc.precioOferta < doc.precio)) {
                    score += 15;
                }
                // + bonus por categorías premium (suv/pickup tienen alta demanda)
                if (doc.categoria === 'suv' || doc.categoria === 'pickup') score += 5;
                // - penalty si km alto
                if (doc.kilometraje > 100000) score -= 10;
                if (doc.kilometraje > 150000) score -= 10;
                score = Math.max(0, Math.min(100, score));
                return { value: score, reason: 'calculado por tipo+oferta+km' };
            }
        }
    ];

    /* ═══════════════════════════════════════════════════════════
       C.8 — VALIDACIONES INTELIGENTES (warnings, no fail)
       Cada regla devuelve {field, severity, message} si detecta algo
       inusual. Severity: 'warning' | 'error'.
       ═══════════════════════════════════════════════════════════ */
    var VALIDATIONS = [
        {
            id: 'classic_anomaly',
            check: function (doc) {
                var year = parseInt(doc.year, 10);
                var km = parseInt(doc.kilometraje, 10);
                if (year && year < 2000 && km && km < 50000) {
                    return {
                        field: 'kilometraje',
                        severity: 'warning',
                        message: 'Año antiguo (' + year + ') con kilometraje bajo (' + km.toLocaleString() + ' km). ¿Es un clásico restaurado o el km es correcto?'
                    };
                }
            }
        },
        {
            id: 'cuota_vs_precio',
            check: function (doc) {
                if (doc.cuotaInicial && doc.precio &&
                    parseInt(doc.cuotaInicial, 10) > parseInt(doc.precio, 10)) {
                    return {
                        field: 'cuotaInicial',
                        severity: 'error',
                        message: 'La cuota inicial no puede ser mayor al precio del vehículo.'
                    };
                }
            }
        },
        {
            id: 'precio_alto',
            check: function (doc) {
                var p = parseInt(doc.precio, 10);
                if (p && p > 1000000000) {
                    return {
                        field: 'precio',
                        severity: 'warning',
                        message: 'Precio elevado: $' + (p / 1e6).toFixed(0) + 'M. Verificar.'
                    };
                }
            }
        },
        {
            id: 'precio_bajo',
            check: function (doc) {
                var p = parseInt(doc.precio, 10);
                if (p && p > 0 && p < 5000000) {
                    return {
                        field: 'precio',
                        severity: 'warning',
                        message: 'Precio inusualmente bajo: $' + (p / 1e6).toFixed(1) + 'M. ¿Verificar?'
                    };
                }
            }
        },
        {
            id: 'oferta_mayor_que_precio',
            check: function (doc) {
                if (doc.precioOferta && doc.precio &&
                    parseInt(doc.precioOferta, 10) > parseInt(doc.precio, 10)) {
                    return {
                        field: 'precioOferta',
                        severity: 'error',
                        message: 'El precio de oferta no puede ser mayor al precio regular.'
                    };
                }
            }
        },
        {
            id: 'year_futuro',
            check: function (doc) {
                var year = parseInt(doc.year, 10);
                var currentYear = new Date().getFullYear();
                if (year && year > currentYear + 1) {
                    return {
                        field: 'year',
                        severity: 'warning',
                        message: 'Año ' + year + ' es futuro. ¿Modelo del próximo año?'
                    };
                }
            }
        },
        {
            id: 'km_negativo',
            check: function (doc) {
                if (doc.kilometraje && parseInt(doc.kilometraje, 10) < 0) {
                    return {
                        field: 'kilometraje',
                        severity: 'error',
                        message: 'El kilometraje no puede ser negativo.'
                    };
                }
            }
        },
        {
            id: 'sin_imagen',
            check: function (doc) {
                if (doc.imagenes && Array.isArray(doc.imagenes) && doc.imagenes.length === 0) {
                    return {
                        field: 'imagen',
                        severity: 'warning',
                        message: 'Sin imágenes. El vehículo no se mostrará bien en el catálogo.'
                    };
                }
            }
        }
    ];

    function validate(doc) {
        var d = doc || {};
        var issues = [];
        VALIDATIONS.forEach(function (v) {
            try {
                var result = v.check(d);
                if (result) {
                    result.ruleId = v.id;
                    issues.push(result);
                }
            } catch (e) {}
        });
        return issues;
    }

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
        validate: validate,    // C.8 — validaciones inteligentes
        rules: RULES.map(function (r) {
            return { id: r.id, field: r.field, description: r.description };
        }),
        validations: VALIDATIONS.map(function (v) {
            return { id: v.id };
        }),
        formatSuggestion: formatSuggestion,
        // For K.6 (visual builder): the raw rule list including functions
        _internalRules: RULES,
        _internalValidations: VALIDATIONS
    };
})();
