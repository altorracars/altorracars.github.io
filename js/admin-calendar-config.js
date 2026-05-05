/**
 * ALTORRA CARS — Config calendario (Mega-Plan v4, D.3+D.4)
 * ==========================================================
 * Config de disponibilidad para citas. Incluye:
 *   - Días/horas laborales
 *   - Slot duration + buffer entre citas
 *   - Capacidad por slot (max citas concurrentes)
 *   - Festivos colombianos (preconfigurados 2026 + custom)
 *   - Anti-overbooking: detecta colisiones antes de agendar
 *
 * Almacenado en `config/calendarConfig` de Firestore.
 *
 * Public API:
 *   AltorraCalendarConfig.load()
 *   AltorraCalendarConfig.save(config)
 *   AltorraCalendarConfig.isHoliday(dateStr) → boolean
 *   AltorraCalendarConfig.isWorkDay(dateStr) → boolean
 *   AltorraCalendarConfig.checkOverbooking(dateStr, hora, citas)
 *     → {ok, reason, conflicts}
 *   AltorraCalendarConfig.suggestSlot(dateStr, citas)
 *     → string | null (próximo slot libre del día)
 */
(function () {
    'use strict';
    if (window.AltorraCalendarConfig) return;
    var AP = window.AP;
    if (!AP) return;

    var DEFAULT_CONFIG = {
        workDays: [1, 2, 3, 4, 5, 6], // Lun-Sab (0 = Dom)
        workHours: { start: '08:00', end: '18:00' },
        slotDurationMin: 30,
        bufferMin: 15,
        maxPerSlot: 1,
        timezone: 'America/Bogota',
        holidays: [
            // Festivos Colombia 2026
            '2026-01-01', // Año Nuevo
            '2026-01-12', // Reyes Magos (trasladado)
            '2026-03-23', // San José (trasladado)
            '2026-04-02', // Jueves Santo
            '2026-04-03', // Viernes Santo
            '2026-05-01', // Día del Trabajo
            '2026-05-18', // Ascensión (trasladado)
            '2026-06-08', // Corpus Christi (trasladado)
            '2026-06-15', // Sagrado Corazón (trasladado)
            '2026-06-29', // San Pedro y San Pablo (trasladado)
            '2026-07-20', // Independencia
            '2026-08-07', // Batalla de Boyacá
            '2026-08-17', // Asunción Virgen (trasladado)
            '2026-10-12', // Día de la Raza (trasladado)
            '2026-11-02', // Todos los Santos (trasladado)
            '2026-11-16', // Independencia Cartagena (trasladado)
            '2026-12-08', // Inmaculada Concepción
            '2026-12-25'  // Navidad
        ]
    };

    var _config = Object.assign({}, DEFAULT_CONFIG);
    var _loaded = false;
    var _unsub = null;

    /* ═══════════════════════════════════════════════════════════
       LOAD / SAVE
       ═══════════════════════════════════════════════════════════ */
    function load() {
        if (!window.db) return Promise.resolve(_config);
        return window.db.collection('config').doc('calendarConfig').get()
            .then(function (doc) {
                if (doc.exists) {
                    _config = Object.assign({}, DEFAULT_CONFIG, doc.data());
                }
                _loaded = true;
                return _config;
            })
            .catch(function () {
                _loaded = true;
                return _config;
            });
    }

    function save(updates) {
        if (!window.db) return Promise.reject('no-db');
        var merged = Object.assign({}, _config, updates);
        return window.db.collection('config').doc('calendarConfig')
            .set(Object.assign({
                updatedAt: new Date().toISOString(),
                updatedBy: window.auth.currentUser.uid
            }, merged), { merge: true })
            .then(function () {
                _config = merged;
                if (window.AltorraEventBus) {
                    window.AltorraEventBus.emit('calendar.config-changed', merged);
                }
            });
    }

    function startListener() {
        if (_unsub || !window.db) return;
        _unsub = window.db.collection('config').doc('calendarConfig')
            .onSnapshot(function (doc) {
                if (doc.exists) {
                    _config = Object.assign({}, DEFAULT_CONFIG, doc.data());
                    _loaded = true;
                }
            }, function () {});
    }

    /* ═══════════════════════════════════════════════════════════
       HELPERS — fechas / slots
       ═══════════════════════════════════════════════════════════ */
    function isHoliday(dateStr) {
        if (!dateStr) return false;
        var key = String(dateStr).slice(0, 10);
        return (_config.holidays || []).indexOf(key) !== -1;
    }

    function isWorkDay(dateStr) {
        if (!dateStr) return false;
        var d = new Date(dateStr + 'T00:00:00');
        if (isNaN(d.getTime())) return false;
        if (isHoliday(dateStr)) return false;
        return (_config.workDays || []).indexOf(d.getDay()) !== -1;
    }

    function timeToMinutes(hhmm) {
        if (!hhmm) return null;
        var parts = String(hhmm).split(':');
        if (parts.length < 2) return null;
        return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
    }

    function minutesToTime(min) {
        var h = Math.floor(min / 60);
        var m = min % 60;
        return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0');
    }

    function isWithinWorkHours(hora) {
        var t = timeToMinutes(hora);
        if (t == null) return false;
        var start = timeToMinutes(_config.workHours.start);
        var end = timeToMinutes(_config.workHours.end);
        return t >= start && t < end;
    }

    /* ═══════════════════════════════════════════════════════════
       OVERBOOKING CHECK
       Recibe: nueva cita {fecha, hora} + array de citas existentes
       Retorna: {ok, reason, conflicts}
       ═══════════════════════════════════════════════════════════ */
    function checkOverbooking(fecha, hora, citasExistentes) {
        var result = { ok: true, warnings: [], conflicts: [] };

        // 1. Festivo
        if (isHoliday(fecha)) {
            result.warnings.push('La fecha ' + fecha + ' es festivo nacional.');
        }

        // 2. Día no laboral
        if (!isWorkDay(fecha) && !isHoliday(fecha)) {
            result.warnings.push('La fecha ' + fecha + ' no es día laboral configurado.');
        }

        // 3. Fuera de horario
        if (hora && !isWithinWorkHours(hora)) {
            result.warnings.push('La hora ' + hora + ' está fuera del horario laboral (' +
                _config.workHours.start + '–' + _config.workHours.end + ').');
        }

        // 4. Buffer / capacidad por slot
        if (hora && Array.isArray(citasExistentes)) {
            var newSlot = timeToMinutes(hora);
            var buffer = _config.bufferMin || 0;
            var maxPerSlot = _config.maxPerSlot || 1;

            var sameDay = citasExistentes.filter(function (c) {
                return (c.fecha || '').slice(0, 10) === fecha;
            });
            var conflicts = sameDay.filter(function (c) {
                if (!c.hora) return false;
                var existSlot = timeToMinutes(c.hora);
                if (existSlot == null) return false;
                return Math.abs(existSlot - newSlot) < buffer;
            });
            if (conflicts.length >= maxPerSlot) {
                result.warnings.push(conflicts.length + ' cita' +
                    (conflicts.length > 1 ? 's' : '') + ' en ±' + buffer + 'min' +
                    (maxPerSlot > 1 ? ' (cap=' + maxPerSlot + ')' : ''));
                result.conflicts = conflicts;
                if (conflicts.length > maxPerSlot * 1.5) result.ok = false;
            }
        }

        result.reason = result.warnings.join(' · ');
        return result;
    }

    /* ═══════════════════════════════════════════════════════════
       SUGGEST SLOT — próximo slot libre del día
       ═══════════════════════════════════════════════════════════ */
    function suggestSlot(fecha, citasExistentes) {
        if (!isWorkDay(fecha)) return null;
        var slotDur = _config.slotDurationMin || 30;
        var startMin = timeToMinutes(_config.workHours.start);
        var endMin = timeToMinutes(_config.workHours.end);
        var existing = (citasExistentes || []).filter(function (c) {
            return (c.fecha || '').slice(0, 10) === fecha && c.hora;
        }).map(function (c) { return timeToMinutes(c.hora); });
        var maxPerSlot = _config.maxPerSlot || 1;
        var buffer = _config.bufferMin || slotDur;

        for (var t = startMin; t < endMin; t += slotDur) {
            var clashing = existing.filter(function (e) {
                return Math.abs(e - t) < buffer;
            });
            if (clashing.length < maxPerSlot) {
                return minutesToTime(t);
            }
        }
        return null;
    }

    /* ═══════════════════════════════════════════════════════════
       INIT
       ═══════════════════════════════════════════════════════════ */
    var attempts = 0;
    var iv = setInterval(function () {
        attempts++;
        if (window.auth && window.auth.currentUser && AP.isEditorOrAbove && AP.isEditorOrAbove()) {
            load().then(startListener);
            clearInterval(iv);
        } else if (attempts > 60) clearInterval(iv);
    }, 1500);

    /* ═══════════════════════════════════════════════════════════
       Public API
       ═══════════════════════════════════════════════════════════ */
    window.AltorraCalendarConfig = {
        load: load,
        save: save,
        getConfig: function () { return Object.assign({}, _config); },
        isHoliday: isHoliday,
        isWorkDay: isWorkDay,
        isWithinWorkHours: isWithinWorkHours,
        checkOverbooking: checkOverbooking,
        suggestSlot: suggestSlot
    };
})();
