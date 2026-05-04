/**
 * ALTORRA CARS — Communications schema (MF1.2)
 *
 * Single source of truth for the unified `solicitudes` collection's
 * data model. Used by both public forms (set kind on submit) and
 * admin panel (render kind-specific UI, run migration).
 *
 * Three kinds:
 *   cita       — requires a date/time slot (test drive, llamada agendada,
 *                consulta presencial). Came from citas.js.
 *   solicitud  — actionable request that needs processing but no slot
 *                (financiación, consignación, peritaje).
 *   lead       — soft contact / info request (consulta general, otro).
 *
 * Each kind has its own state machine. The canonical state lists below
 * are the only valid values when reading/writing.
 */
(function () {
    'use strict';
    if (window.AltorraCommSchema) return;

    var KIND_CITA = 'cita';
    var KIND_SOLICITUD = 'solicitud';
    var KIND_LEAD = 'lead';

    // Estados validos por kind. El primer estado de cada lista es el default
    // que recibe una nueva submission.
    var STATES = {
        cita: [
            'pendiente',     // recien creada, sin confirmar por admin
            'confirmada',    // admin confirma cita
            'reprogramada',  // admin movio fecha/hora
            'completada',    // cliente vino y se atendio
            'cancelada',     // admin o cliente cancelaron
            'no_show'        // cliente no se presento sin avisar
        ],
        solicitud: [
            'pendiente',     // recien creada
            'en_revision',   // admin la esta evaluando
            'contactado',    // admin contacto al cliente
            'aprobada',      // financiacion aprobada / consignacion aceptada
            'rechazada',     // declinada
            'completada',    // cerrada exitosamente
            'sin_respuesta'  // cliente no respondio tras N intentos
        ],
        lead: [
            'nuevo',         // recien creado
            'contactado',    // admin replico
            'interesado',    // cliente sigue activo
            'frio',          // hace tiempo sin actividad
            'convertido',    // se transformo en solicitud o cita
            'descartado'     // no es prospect real
        ]
    };

    // Mapeo legacy → nuevo: como remapear `estado` cuando migramos un doc
    // del esquema viejo (sin kind) al nuevo. Preservar `legacyEstado` siempre.
    var STATE_REMAP = {
        cita: {
            // Citas usan los mismos estados, no remapeo necesario
            pendiente: 'pendiente',
            confirmada: 'confirmada',
            reprogramada: 'reprogramada',
            completada: 'completada',
            cancelada: 'cancelada'
        },
        solicitud: {
            // "confirmada/reprogramada" no tienen sentido en solicitudes
            pendiente: 'pendiente',
            confirmada: 'aprobada',     // financiacion confirmada == aprobada
            reprogramada: 'en_revision', // sin equivalente claro, usar revision
            completada: 'completada',
            cancelada: 'rechazada'
        },
        lead: {
            pendiente: 'nuevo',
            confirmada: 'interesado',
            reprogramada: 'contactado',
            completada: 'convertido',
            cancelada: 'descartado'
        }
    };

    // UI labels para humanos
    var STATE_LABELS = {
        pendiente: 'Pendiente',
        confirmada: 'Confirmada',
        reprogramada: 'Reprogramada',
        completada: 'Completada',
        cancelada: 'Cancelada',
        no_show: 'No asistio',
        en_revision: 'En revisión',
        contactado: 'Contactado',
        aprobada: 'Aprobada',
        rechazada: 'Rechazada',
        sin_respuesta: 'Sin respuesta',
        nuevo: 'Nuevo',
        interesado: 'Interesado',
        frio: 'Frío',
        convertido: 'Convertido',
        descartado: 'Descartado'
    };

    // Color group para cada estado (admin-success/warning/info/danger/text-muted)
    var STATE_COLORS = {
        pendiente: 'admin-warning',
        confirmada: 'admin-success',
        reprogramada: 'admin-info',
        completada: 'admin-gold',
        cancelada: 'admin-danger',
        no_show: 'admin-danger',
        en_revision: 'admin-info',
        contactado: 'admin-info',
        aprobada: 'admin-success',
        rechazada: 'admin-danger',
        sin_respuesta: 'admin-text-muted',
        nuevo: 'admin-warning',
        interesado: 'admin-info',
        frio: 'admin-text-muted',
        convertido: 'admin-success',
        descartado: 'admin-danger'
    };

    /**
     * Infer the kind for a doc that lacks one (legacy data).
     * Rules:
     *   - requiereCita == true  → cita
     *   - tipo in {financiacion, consignacion_venta, peritaje} → solicitud
     *   - tipo in {compra} → solicitud (intent to buy = actionable)
     *   - default → lead
     */
    function inferKind(doc) {
        if (!doc) return KIND_LEAD;
        if (doc.kind) return doc.kind;
        if (doc.requiereCita === true) return KIND_CITA;
        if (doc.tipo === 'financiacion' || doc.tipo === 'consignacion_venta'
            || doc.tipo === 'peritaje' || doc.tipo === 'compra') return KIND_SOLICITUD;
        return KIND_LEAD;
    }

    function remapEstado(legacyEstado, newKind) {
        if (!legacyEstado) return STATES[newKind][0];
        var map = STATE_REMAP[newKind];
        if (map && map[legacyEstado]) return map[legacyEstado];
        // Si el estado ya esta en el nuevo set, conservarlo
        if (STATES[newKind].indexOf(legacyEstado) !== -1) return legacyEstado;
        return STATES[newKind][0];
    }

    function isValidStateForKind(kind, estado) {
        if (!STATES[kind]) return false;
        return STATES[kind].indexOf(estado) !== -1;
    }

    function getDefaultState(kind) {
        return STATES[kind] ? STATES[kind][0] : null;
    }

    /**
     * MF1.3 — Compute meta fields (priority, tags, slaDeadline) from doc data.
     * Called at submission time. Pure function, no side effects.
     */
    function computeMeta(doc) {
        if (!doc) return {};
        var kind = doc.kind || inferKind(doc);
        var tipo = doc.tipo || '';
        var dx = doc.datosExtra || {};
        var tags = [];
        var priority = 'media';

        // Per-kind base SLA in milliseconds (business hours not enforced yet)
        var slaByKind = {
            cita: 30 * 60 * 1000,        // 30 min
            solicitud: 2 * 60 * 60 * 1000, // 2 h
            lead: 24 * 60 * 60 * 1000      // 24 h
        };
        var slaMs = slaByKind[kind] || slaByKind.lead;

        // High-value financiación bumps priority
        if (tipo === 'financiacion') {
            tags.push('financiacion');
            var price = parseInt(String(dx.precioVehiculo || '').replace(/[^0-9]/g, ''), 10) || 0;
            var cuota = parseInt(String(dx.cuotaInicial || '').replace(/[^0-9]/g, ''), 10) || 0;
            if (price >= 100000000 || cuota >= 50000000) {
                priority = 'alta';
                tags.push('alto-valor');
                slaMs = Math.min(slaMs, 60 * 60 * 1000); // tighten to 1h
            }
        }
        // Citas have higher base priority (synchronous booking)
        if (kind === 'cita') {
            priority = 'alta';
            tags.push('cita-' + (tipo || 'general'));
        }
        // Consignación
        if (tipo === 'consignacion_venta' || tipo === 'consignacion') {
            tags.push('consignacion');
            // Premium consignment (high asking price)
            var precioEsperado = parseInt(String(dx.precioEsperado || '').replace(/[^0-9]/g, ''), 10) || 0;
            if (precioEsperado >= 100000000) { priority = 'alta'; tags.push('premium'); }
        }
        // Peritaje
        if (tipo === 'peritaje') tags.push('peritaje');
        // Compra (intent to buy) — actionable, bump if vehicle linked
        if (tipo === 'compra') {
            tags.push('compra');
            if (doc.vehiculoId) priority = 'alta';
        }
        // Lead qualifiers
        if (kind === 'lead') {
            priority = 'baja';
            tags.push('lead-' + (tipo || 'consulta'));
        }
        // Source-based tags
        if (doc.source && doc.source.page) {
            if (doc.source.page.indexOf('detalle-vehiculo') !== -1
                || doc.source.page.indexOf('vehiculos/') !== -1) tags.push('desde-vehiculo');
            if (doc.source.page === 'simulador-credito.html') tags.push('desde-simulador');
        }
        // Registered users get a tag
        if (doc.clientCategory === 'registered') tags.push('cliente-registrado');

        return {
            priority: priority,
            tags: tags,
            slaDeadline: new Date(Date.now() + slaMs).toISOString(),
            slaMs: slaMs
        };
    }

    window.AltorraCommSchema = {
        KIND_CITA: KIND_CITA,
        KIND_SOLICITUD: KIND_SOLICITUD,
        KIND_LEAD: KIND_LEAD,
        KINDS: [KIND_CITA, KIND_SOLICITUD, KIND_LEAD],
        STATES: STATES,
        STATE_REMAP: STATE_REMAP,
        STATE_LABELS: STATE_LABELS,
        STATE_COLORS: STATE_COLORS,
        inferKind: inferKind,
        remapEstado: remapEstado,
        isValidStateForKind: isValidStateForKind,
        getDefaultState: getDefaultState,
        computeMeta: computeMeta
    };
})();
