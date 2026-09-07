/**
 * ALTORRA CARS — Config calendario (Mega-Plan v4, D.3+D.4 · F21 ADR §184)
 * ==========================================================
 * Config de disponibilidad para citas. Incluye:
 *   - Días/horas laborales
 *   - Slot duration + buffer entre citas
 *   - Capacidad por slot (max citas concurrentes)
 *   - Festivos/bloqueos (blockedDates del doc canónico)
 *   - Anti-overbooking: detecta colisiones antes de agendar
 *
 * F21 (§184): el SSoT es `config/availability` (el MISMO doc que lee el
 * form público js/public/citas.js — una sola verdad). Este módulo LEE y
 * ESCRIBE ese doc con un mapeo bidireccional, conservando la forma
 * histórica de getConfig() para no tocar a sus consumidores
 * (admin-calendar-tabs, admin-calendar drag-drop, bot D.7).
 * `config/calendarConfig` queda muerto (no se lee ni escribe).
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
    var AP = window.AP || null;
    var IS_PUBLIC = !AP;  // sin admin context = página pública (sin Firestore writes ni listener)

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
       LOAD / SAVE — F21: contra config/availability (SSoT) con mapeo
       bidireccional. Forma interna (_config) = la histórica.
       ═══════════════════════════════════════════════════════════ */
    function pad2(n) { return String(n).padStart(2, '0'); }

    /** availability (canónico) → forma histórica de este módulo. */
    function mapFromAvailability(av) {
        var labels = av.blockedDateLabels || {};
        return {
            workDays: Array.isArray(av.days) ? av.days : DEFAULT_CONFIG.workDays,
            workHours: {
                start: pad2(av.startHour != null ? av.startHour : 8) + ':00',
                end: pad2(av.endHour != null ? av.endHour : 18) + ':00'
            },
            slotDurationMin: av.interval || 60,
            bufferMin: av.bufferMin != null ? av.bufferMin : 15,
            maxPerSlot: av.maxPerSlot || 1,
            timezone: 'America/Bogota',
            holidays: (av.blockedDates || []).map(function (d) {
                return labels[d] ? { date: d, label: labels[d] } : d;
            })
        };
    }

    /** updates en forma histórica → campos del doc canónico availability. */
    function mapToAvailability(updates) {
        var out = {};
        if (updates.workDays) out.days = updates.workDays;
        if (updates.workHours) {
            // El canónico modela horas ENTERAS (el form web genera slots por
            // hora). "08:30" se conserva conservador: floor de la hora.
            out.startHour = parseInt(String(updates.workHours.start).split(':')[0], 10) || 8;
            out.endHour = parseInt(String(updates.workHours.end).split(':')[0], 10) || 18;
        }
        if (updates.slotDurationMin) out.interval = updates.slotDurationMin;
        if (updates.bufferMin != null) out.bufferMin = updates.bufferMin;
        if (updates.maxPerSlot) out.maxPerSlot = updates.maxPerSlot;
        if (updates.holidays) {
            var dates = [];
            var labels = {};
            updates.holidays.forEach(function (h) {
                var d = typeof h === 'string' ? h : (h.date || '');
                if (!d) return;
                if (dates.indexOf(d) === -1) dates.push(d);
                if (typeof h === 'object' && h.label) labels[d] = h.label;
            });
            out.blockedDates = dates.sort();
            out.blockedDateLabels = labels;
        }
        return out;
    }

    function load() {
        if (!window.db) return Promise.resolve(_config);
        return window.db.collection('config').doc('availability').get()
            .then(function (doc) {
                if (doc.exists) {
                    _config = Object.assign({}, DEFAULT_CONFIG, mapFromAvailability(doc.data()));
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
        var mapped = mapToAvailability(updates);
        return window.db.collection('config').doc('availability')
            .set(Object.assign({
                updatedAt: new Date().toISOString(),
                updatedBy: window.auth.currentUser.uid
            }, mapped), { merge: true })
            .then(function () {
                _config = Object.assign({}, _config, updates);
                if (window.AltorraEventBus) {
                    window.AltorraEventBus.emit('calendar.config-changed', _config);
                }
            });
    }

    function startListener() {
        if (_unsub || !window.db) return;
        _unsub = window.db.collection('config').doc('availability')
            .onSnapshot(function (doc) {
                if (doc.exists) {
                    _config = Object.assign({}, DEFAULT_CONFIG, mapFromAvailability(doc.data()));
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
        // F21 §184: holidays puede traer strings O {date,label} (las fechas
        // con motivo del editor) — matcher agnóstico de forma.
        return (_config.holidays || []).some(function (h) {
            return (typeof h === 'string' ? h : (h && h.date)) === key;
        });
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

        // 1. Festivo / fecha bloqueada (blockedDates del canónico)
        if (isHoliday(fecha)) {
            result.warnings.push('La fecha ' + fecha + ' está bloqueada (festivo o bloqueo manual).');
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
       D.7 — AI Auto-Scheduling
       Parsea hints de cliente como "martes en la tarde", "mañana",
       "el viernes" y combina con NER de fecha + slots disponibles
       para sugerir el mejor horario.
       ═══════════════════════════════════════════════════════════ */
    var DAY_NAMES = {
        'lunes': 1, 'martes': 2, 'miercoles': 3, 'miércoles': 3,
        'jueves': 4, 'viernes': 5, 'sabado': 6, 'sábado': 6, 'domingo': 0
    };

    function parseSchedulingHint(text, citasExistentes) {
        var lower = (text || '').toLowerCase();
        var now = new Date();
        var fecha = null;
        var preferredTime = null; // 'morning' | 'afternoon' | 'evening' | hh:mm

        // 1. NER fecha (si AltorraNER disponible)
        if (window.AltorraNER) {
            try {
                var ext = window.AltorraNER.extract(text);
                if (ext.summary && ext.summary.fecha) {
                    fecha = ext.summary.fecha;
                }
            } catch (e) {}
        }

        // 2. Fallback: "mañana", "pasado mañana", "hoy"
        if (!fecha) {
            if (/\bma[ñn]ana\b/.test(lower) && !/pasado/.test(lower)) {
                var t = new Date();
                t.setDate(t.getDate() + 1);
                fecha = t.toISOString().slice(0, 10);
            } else if (/pasado\s*ma[ñn]ana/.test(lower)) {
                var t2 = new Date();
                t2.setDate(t2.getDate() + 2);
                fecha = t2.toISOString().slice(0, 10);
            } else if (/\bhoy\b/.test(lower)) {
                fecha = now.toISOString().slice(0, 10);
            }
        }

        // 3. Día de la semana ("el martes", "este viernes")
        if (!fecha) {
            for (var d in DAY_NAMES) {
                if (lower.indexOf(d) !== -1) {
                    var target = DAY_NAMES[d];
                    var current = now.getDay();
                    var diff = (target - current + 7) % 7;
                    if (diff === 0) diff = 7; // si es hoy, asumir próxima semana
                    var future = new Date();
                    future.setDate(future.getDate() + diff);
                    fecha = future.toISOString().slice(0, 10);
                    break;
                }
            }
        }

        // 4. Detectar momento del día
        if (/\bma[ñn]ana\b/.test(lower) && /^(?!.*\bla\b)/.test(lower)) {
            // "mañana" como horario, no día
            if (preferredTime === null) preferredTime = 'morning';
        }
        if (/(en la )?mañana/.test(lower)) preferredTime = 'morning';
        if (/(en la )?tarde/.test(lower)) preferredTime = 'afternoon';
        if (/(en la )?noche/.test(lower) || /(al )?final del d[íi]a/.test(lower)) preferredTime = 'evening';

        // 5. Hora explícita "a las 10", "a las 3pm"
        var horaMatch = lower.match(/a\s+las?\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm|hrs|h)?/);
        if (horaMatch) {
            var h = parseInt(horaMatch[1], 10);
            var m = horaMatch[2] ? parseInt(horaMatch[2], 10) : 0;
            var ampm = horaMatch[3] || '';
            if (ampm === 'pm' && h < 12) h += 12;
            if (ampm === 'am' && h === 12) h = 0;
            preferredTime = String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0');
        }

        // Si no hay fecha → usar mañana por defecto si query implica scheduling
        if (!fecha && preferredTime) {
            var tom = new Date();
            tom.setDate(tom.getDate() + 1);
            fecha = tom.toISOString().slice(0, 10);
        }
        if (!fecha) return null;

        // Si fecha cae en festivo o no laboral, mover al siguiente día laboral
        var safety = 0;
        while ((!isWorkDay(fecha) || isHoliday(fecha)) && safety < 7) {
            var d = new Date(fecha + 'T00:00:00');
            d.setDate(d.getDate() + 1);
            fecha = d.toISOString().slice(0, 10);
            safety++;
        }

        // Determinar slot sugerido
        var slot = null;
        if (typeof preferredTime === 'string' && /^\d{2}:\d{2}$/.test(preferredTime)) {
            slot = preferredTime;
        } else {
            // morning/afternoon/evening
            var startHour = preferredTime === 'morning' ? 9 :
                            preferredTime === 'evening' ? 16 :
                            preferredTime === 'afternoon' ? 14 : 10;
            // suggestSlot busca a partir del workHours.start. Para forzar a la
            // ventana preferida, intento uno por uno desde startHour
            var minute = startHour * 60;
            var endMin = timeToMinutes(_config.workHours.end);
            var existing = (citasExistentes || []).filter(function (c) {
                return (c.fecha || '').slice(0, 10) === fecha && c.hora;
            }).map(function (c) { return timeToMinutes(c.hora); });
            var buffer = _config.bufferMin || 30;
            var maxPerSlot = _config.maxPerSlot || 1;
            for (var t = minute; t < endMin; t += (_config.slotDurationMin || 30)) {
                var clashing = existing.filter(function (e) { return Math.abs(e - t) < buffer; });
                if (clashing.length < maxPerSlot) {
                    slot = minutesToTime(t);
                    break;
                }
            }
            if (!slot) slot = suggestSlot(fecha, citasExistentes);
        }

        return {
            fecha: fecha,
            hora: slot,
            preferredTime: preferredTime,
            confidence: slot ? 'high' : 'low'
        };
    }

    /* ═══════════════════════════════════════════════════════════
       INIT — solo en context admin con permisos
       En página pública usa DEFAULT_CONFIG (festivos hardcoded ya
       cubren el caso parseSchedulingHint sin necesitar Firestore).
       ═══════════════════════════════════════════════════════════ */
    if (!IS_PUBLIC) {
        var attempts = 0;
        var iv = setInterval(function () {
            attempts++;
            if (window.auth && window.auth.currentUser && AP && AP.isAuthenticatedAdmin && AP.isAuthenticatedAdmin()) {
                load().then(startListener);
                clearInterval(iv);
            } else if (attempts > 60) clearInterval(iv);
        }, 1500);
    }

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
        suggestSlot: suggestSlot,
        parseSchedulingHint: parseSchedulingHint  // D.7
    };
})();
