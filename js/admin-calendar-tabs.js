/**
 * AltorraCalendarTabs — Tabs internos de Agenda (§27.4)
 * ===================================================================
 * Maneja los 3 tabs de sec-calendar:
 *   • calendario     — vista mes/día (existing admin-calendar.js)
 *   • disponibilidad — config workDays / workHours / slots
 *   • festivos       — CRUD de días no laborales del año
 *
 * Conecta a AltorraCalendarConfig (admin-calendar-config.js) que ya
 * existe y provee load() / save() / get() para `config/calendarConfig`
 * de Firestore.
 *
 * Deep-links:
 *   #/calendar              → tab calendario
 *   #/calendar/disponibilidad → tab disponibilidad
 *   #/calendar/festivos     → tab festivos
 *   #/disponibilidad        → alias del router
 */
(function () {
    'use strict';
    if (window.AltorraCalendarTabs) return;
    var AP = window.AP || {};

    var STORAGE_KEY = 'altorra_cal_last_tab';
    var DEFAULT_TAB = 'calendario';
    var VALID_TABS = ['calendario', 'disponibilidad', 'festivos'];
    var _activeTab = null;

    function $(id) { return document.getElementById(id); }
    function escapeHtml(s) { var d = document.createElement('div'); d.textContent = s == null ? '' : String(s); return d.innerHTML; }

    /* ─── TABS ─────────────────────────────────────────────────────── */

    function setActiveTab(tabName) {
        if (VALID_TABS.indexOf(tabName) === -1) tabName = DEFAULT_TAB;
        if (_activeTab === tabName) return;
        _activeTab = tabName;

        document.querySelectorAll('#calTabstrip .cal-tab').forEach(function (btn) {
            var match = btn.getAttribute('data-cal-tab') === tabName;
            btn.classList.toggle('is-active', match);
            btn.setAttribute('aria-selected', match ? 'true' : 'false');
        });
        document.querySelectorAll('#sec-calendar .cal-tabpane').forEach(function (p) {
            p.classList.toggle('is-active', p.getAttribute('data-cal-pane') === tabName);
        });

        try { localStorage.setItem(STORAGE_KEY, tabName); } catch (e) {}

        var sec = document.querySelector('.section.active');
        if (sec && sec.id === 'sec-calendar') {
            var newHash = tabName === DEFAULT_TAB ? '#/calendar' : '#/calendar/' + tabName;
            try { history.replaceState(null, '', newHash); } catch (e) {}
        }

        if (window.AltorraIcons) {
            var p = document.querySelector('.cal-tabpane.is-active');
            if (p) window.AltorraIcons.refresh(p);
        }

        // Lazy init
        if (tabName === 'disponibilidad') {
            renderAvailabilityForm();
        } else if (tabName === 'festivos') {
            renderHolidaysList();
        } else if (tabName === 'calendario' && window.AltorraCalendar
                   && typeof window.AltorraCalendar.render === 'function') {
            try { window.AltorraCalendar.render(); } catch (e) {}
        }
    }

    function applyHashTab() {
        var hash = (location.hash || '').toLowerCase();
        if (hash === '#/disponibilidad') { setActiveTab('disponibilidad'); return; }
        if (hash === '#/festivos') { setActiveTab('festivos'); return; }
        var m = hash.match(/^#\/calendar(?:\/([a-z]+))?$/);
        if (m) { setActiveTab(m[1] || DEFAULT_TAB); return; }
        var stored = null;
        try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) {}
        setActiveTab(stored || DEFAULT_TAB);
    }

    /* ─── DISPONIBILIDAD ───────────────────────────────────────────── */

    function getCalConfig() {
        if (window.AltorraCalendarConfig && typeof window.AltorraCalendarConfig.getConfig === 'function') {
            try { return window.AltorraCalendarConfig.getConfig() || null; } catch (e) {}
        }
        return null;
    }

    function renderAvailabilityForm() {
        var cfg = getCalConfig();
        if (!cfg) {
            // AltorraCalendarConfig aún no cargó — reintentar en 500ms
            setTimeout(renderAvailabilityForm, 500);
            return;
        }
        // Days checkboxes
        document.querySelectorAll('#availabilityDays input[type=checkbox]').forEach(function (cb) {
            var day = parseInt(cb.getAttribute('data-day'), 10);
            cb.checked = (cfg.workDays || []).indexOf(day) !== -1;
        });
        // Hours
        if (cfg.workHours) {
            var s = $('availStartTime'); if (s) s.value = cfg.workHours.start || '08:00';
            var e = $('availEndTime');   if (e) e.value = cfg.workHours.end   || '18:00';
        }
        // Slots
        var sd = $('availSlotDuration'); if (sd) sd.value = cfg.slotDurationMin || 30;
        var bf = $('availBuffer');       if (bf) bf.value = cfg.bufferMin || 15;
        var mx = $('availMaxPerSlot');   if (mx) mx.value = cfg.maxPerSlot || 1;

        var state = $('availabilitySaveState');
        if (state) state.textContent = '';
    }

    function saveAvailability() {
        if (!AP.isSuperAdmin || !AP.isSuperAdmin()) {
            if (AP.toast) AP.toast('Solo super_admin puede modificar la disponibilidad', 'error');
            return;
        }
        var workDays = [];
        document.querySelectorAll('#availabilityDays input[type=checkbox]').forEach(function (cb) {
            if (cb.checked) workDays.push(parseInt(cb.getAttribute('data-day'), 10));
        });
        var data = {
            workDays: workDays.sort(),
            workHours: {
                start: ($('availStartTime') || {}).value || '08:00',
                end:   ($('availEndTime') || {}).value   || '18:00'
            },
            slotDurationMin: parseInt(($('availSlotDuration') || {}).value, 10) || 30,
            bufferMin: parseInt(($('availBuffer') || {}).value, 10) || 15,
            maxPerSlot: parseInt(($('availMaxPerSlot') || {}).value, 10) || 1
        };

        var state = $('availabilitySaveState');
        var btn = $('availabilitySaveBtn');
        if (state) state.textContent = 'Guardando…';
        if (btn) btn.disabled = true;

        if (window.AltorraCalendarConfig && typeof window.AltorraCalendarConfig.save === 'function') {
            window.AltorraCalendarConfig.save(data).then(function () {
                if (state) {
                    state.textContent = '✓ Disponibilidad guardada';
                    setTimeout(function () { state.textContent = ''; }, 2500);
                }
                if (btn) btn.disabled = false;
                if (AP.toast) AP.toast('Disponibilidad actualizada', 'success');
            }).catch(function (err) {
                if (state) state.textContent = '✗ Error: ' + err.message;
                if (btn) btn.disabled = false;
            });
        } else {
            // Fallback directo si la API no expuso save
            window.db.collection('config').doc('calendarConfig').set(data, { merge: true })
                .then(function () {
                    if (state) state.textContent = '✓ Guardado';
                    if (btn) btn.disabled = false;
                });
        }
    }

    document.addEventListener('click', function (e) {
        if (e.target.closest && e.target.closest('#availabilitySaveBtn')) saveAvailability();
    });

    /* ─── FESTIVOS ─────────────────────────────────────────────────── */

    function renderHolidaysList() {
        var cfg = getCalConfig();
        if (!cfg) {
            setTimeout(renderHolidaysList, 500);
            return;
        }
        var list = $('holidaysList');
        if (!list) return;
        var holidays = (cfg.holidays || []).slice().sort();
        if (holidays.length === 0) {
            list.innerHTML = '<div class="pred-empty">Sin festivos configurados.</div>';
            return;
        }
        list.innerHTML = holidays.map(function (h) {
            // h puede ser 'YYYY-MM-DD' o {date, label}
            var date = typeof h === 'string' ? h : (h.date || '');
            var label = typeof h === 'string' ? '' : (h.label || '');
            var formatted = '';
            try {
                var d = new Date(date + 'T12:00:00');
                formatted = d.toLocaleDateString('es-CO', { day: 'numeric', month: 'long' });
            } catch (e) { formatted = date; }
            return '<div class="holiday-item" data-date="' + escapeHtml(date) + '">' +
                '<div class="holiday-date">' +
                    '<i data-lucide="calendar-x"></i>' +
                    '<div>' +
                        '<div class="holiday-formatted">' + escapeHtml(formatted) + '</div>' +
                        (label ? '<div class="holiday-label">' + escapeHtml(label) + '</div>' : '') +
                    '</div>' +
                '</div>' +
                '<button class="alt-btn alt-btn--ghost alt-btn--sm holiday-remove" data-date="' + escapeHtml(date) + '" data-tooltip="Quitar festivo">' +
                    '<i data-lucide="trash-2"></i>' +
                '</button>' +
            '</div>';
        }).join('');
        if (window.AltorraIcons) window.AltorraIcons.refresh(list);
    }

    function showAddHoliday() {
        var f = $('holidayAddForm'); if (f) f.style.display = 'flex';
        var d = $('holidayDate');    if (d) { d.value = ''; d.focus(); }
        var l = $('holidayLabel');   if (l) l.value = '';
    }
    function hideAddHoliday() {
        var f = $('holidayAddForm'); if (f) f.style.display = 'none';
    }
    function saveHoliday() {
        if (!AP.isSuperAdmin || !AP.isSuperAdmin()) return;
        var date = ($('holidayDate') || {}).value;
        var label = ($('holidayLabel') || {}).value || '';
        if (!date) { if (AP.toast) AP.toast('Seleccioná una fecha', 'error'); return; }

        var cfg = getCalConfig();
        if (!cfg) return;
        var holidays = (cfg.holidays || []).filter(function (h) {
            var d = typeof h === 'string' ? h : (h.date || '');
            return d !== date;
        });
        holidays.push(label ? { date: date, label: label } : date);

        if (window.AltorraCalendarConfig && typeof window.AltorraCalendarConfig.save === 'function') {
            window.AltorraCalendarConfig.save({ holidays: holidays }).then(function () {
                hideAddHoliday();
                renderHolidaysList();
                if (AP.toast) AP.toast('Festivo agregado', 'success');
            });
        }
    }
    function removeHoliday(date) {
        if (!AP.isSuperAdmin || !AP.isSuperAdmin()) return;
        if (!confirm('¿Quitar este festivo?')) return;
        var cfg = getCalConfig();
        if (!cfg) return;
        var holidays = (cfg.holidays || []).filter(function (h) {
            var d = typeof h === 'string' ? h : (h.date || '');
            return d !== date;
        });
        if (window.AltorraCalendarConfig && typeof window.AltorraCalendarConfig.save === 'function') {
            window.AltorraCalendarConfig.save({ holidays: holidays }).then(function () {
                renderHolidaysList();
                if (AP.toast) AP.toast('Festivo eliminado', 'info');
            });
        }
    }

    document.addEventListener('click', function (e) {
        if (e.target.closest && e.target.closest('#holidayAddBtn')) { showAddHoliday(); return; }
        if (e.target.closest && e.target.closest('#holidayCancelBtn')) { hideAddHoliday(); return; }
        if (e.target.closest && e.target.closest('#holidaySaveBtn')) { saveHoliday(); return; }
        var rmBtn = e.target.closest && e.target.closest('.holiday-remove');
        if (rmBtn) { removeHoliday(rmBtn.getAttribute('data-date')); return; }
    });

    /* ─── TAB CLICK + ROUTER HOOK ──────────────────────────────────── */

    document.addEventListener('click', function (e) {
        var tab = e.target.closest && e.target.closest('.cal-tab[data-cal-tab]');
        if (!tab) return;
        e.preventDefault();
        setActiveTab(tab.getAttribute('data-cal-tab'));
    });

    window.addEventListener('hashchange', function () {
        var sec = document.querySelector('.section.active');
        if (sec && sec.id === 'sec-calendar') applyHashTab();
    });

    function init() {
        if (window.AltorraSections && window.AltorraSections.onChange) {
            window.AltorraSections.onChange(function (section) {
                if (section === 'calendar') applyHashTab();
            });
        } else {
            setTimeout(init, 500);
            return;
        }
        var sec = document.querySelector('.section.active');
        if (sec && sec.id === 'sec-calendar') applyHashTab();

        // AltorraCalendarConfig usa onSnapshot interno para mantener su
        // _config sincronizado. No expone onLoad explícito, así que
        // usamos polling suave: re-render del tab activo cada 8s mientras
        // estamos en sec-calendar (cubrir actualizaciones cross-device).
        setInterval(function () {
            var sec = document.querySelector('.section.active');
            if (!sec || sec.id !== 'sec-calendar') return;
            if (_activeTab === 'disponibilidad') renderAvailabilityForm();
            else if (_activeTab === 'festivos') renderHolidaysList();
        }, 8000);
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();

    /* ─── Public API ─────────────────────────────────────────────── */
    window.AltorraCalendarTabs = {
        setActiveTab: setActiveTab,
        getActiveTab: function () { return _activeTab; },
        renderAvailabilityForm: renderAvailabilityForm,
        renderHolidaysList: renderHolidaysList
    };
})();
