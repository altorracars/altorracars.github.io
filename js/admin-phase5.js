// Admin Panel — Phase 5: Charts, Theme Toggle, Wizard Modal, Notifications
(function() {
    'use strict';
    var AP = window.AP;
    var $ = AP.$;

    // ========== F5.3: DARK/LIGHT MODE TOGGLE ==========
    // [DEPRECATED] Reemplazado por T.4 — js/theme-switcher.js (AltorraTheme).
    // El botón #themeToggle ahora se bindea via data-altorra-theme-toggle
    // por theme-switcher.js. Este handler quedó residual y se eliminó
    // para evitar doble-bind que causaba que el click NO surtiera efecto.

    // ========== F5.2: DASHBOARD CHARTS (Pure CSS — no library) ==========

    function renderDashboardCharts() {
        if (!AP.vehicles || AP.vehicles.length === 0) return;

        renderDonutType();
        renderCategoriesBar();
        renderDonutStatus();
        renderActivityChart();
    }

    function renderDonutType() {
        var nuevos = 0, usados = 0;
        AP.vehicles.forEach(function(v) {
            if (v.tipo === 'nuevo') nuevos++;
            else usados++;
        });
        var total = nuevos + usados;
        if (total === 0) return;

        var pctNuevos = Math.round((nuevos / total) * 100);
        var pctUsados = 100 - pctNuevos;

        var donut = $('donutType');
        if (donut) {
            donut.style.background = 'conic-gradient(var(--admin-success) 0% ' + pctNuevos + '%, var(--admin-info) ' + pctNuevos + '% 100%)';
            donut.innerHTML = '<div class="donut-center"><span class="donut-value">' + total + '</span><span class="donut-label">total</span></div>';
        }

        var legend = $('legendType');
        if (legend) {
            legend.innerHTML =
                '<div class="chart-legend-item"><span class="chart-legend-dot" style="background:var(--admin-success);"></span>Nuevos: ' + nuevos + ' (' + pctNuevos + '%)</div>' +
                '<div class="chart-legend-item"><span class="chart-legend-dot" style="background:var(--admin-info);"></span>Usados: ' + usados + ' (' + pctUsados + '%)</div>';
        }
    }

    function renderCategoriesBar() {
        var cats = {};
        AP.vehicles.forEach(function(v) {
            var cat = v.categoria || 'otro';
            cats[cat] = (cats[cat] || 0) + 1;
        });

        var entries = Object.keys(cats).map(function(k) { return { name: k, count: cats[k] }; });
        entries.sort(function(a, b) { return b.count - a.count; });
        entries = entries.slice(0, 8); // Max 8 categories

        var maxCount = entries.reduce(function(m, e) { return Math.max(m, e.count); }, 1);
        var colors = ['var(--admin-gold)', 'var(--admin-info)', 'var(--admin-success)', '#a371f7', 'var(--admin-warning)', 'var(--admin-danger)', '#8b949e', '#f0883e'];

        var container = $('chartCategories');
        if (!container) return;

        var html = '';
        entries.forEach(function(e, i) {
            var height = Math.max(10, Math.round((e.count / maxCount) * 100));
            var color = colors[i % colors.length];
            var label = (e.name.charAt(0).toUpperCase() + e.name.slice(1)).substring(0, 6);
            html += '<div class="mini-bar" style="height:' + height + '%;background:' + color + ';" data-label="' + label + '" title="' + e.name + ': ' + e.count + '"></div>';
        });
        container.innerHTML = html;
    }

    function renderDonutStatus() {
        var disponible = 0, vendido = 0, reservado = 0, borrador = 0;
        AP.vehicles.forEach(function(v) {
            if (v.estado === 'vendido') vendido++;
            else if (v.estado === 'reservado') reservado++;
            else if (v.estado === 'borrador') borrador++;
            else disponible++;
        });

        var total = disponible + vendido + reservado + borrador;
        if (total === 0) return;

        var segments = [
            { label: 'Disponible', count: disponible, color: 'var(--admin-success)' },
            { label: 'Vendido', count: vendido, color: 'var(--admin-gold)' },
            { label: 'Reservado', count: reservado, color: 'var(--admin-warning)' },
            { label: 'Borrador', count: borrador, color: 'var(--admin-text-muted)' }
        ].filter(function(s) { return s.count > 0; });

        var gradient = 'conic-gradient(';
        var cumulative = 0;
        segments.forEach(function(s, i) {
            var pct = (s.count / total) * 100;
            gradient += s.color + ' ' + cumulative + '% ' + (cumulative + pct) + '%';
            cumulative += pct;
            if (i < segments.length - 1) gradient += ', ';
        });
        gradient += ')';

        var donut = $('donutStatus');
        if (donut) {
            donut.style.background = gradient;
            donut.innerHTML = '<div class="donut-center"><span class="donut-value">' + disponible + '</span><span class="donut-label">disponibles</span></div>';
        }

        var legend = $('legendStatus');
        if (legend) {
            legend.innerHTML = segments.map(function(s) {
                return '<div class="chart-legend-item"><span class="chart-legend-dot" style="background:' + s.color + ';"></span>' + s.label + ': ' + s.count + '</div>';
            }).join('');
        }
    }

    function renderActivityChart() {
        var container = $('chartActivity');
        if (!container || !AP.auditLogEntries) return;

        var now = Date.now();
        var dayMs = 24 * 60 * 60 * 1000;
        var days = [];
        var dayNames = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];

        for (var i = 6; i >= 0; i--) {
            var dayStart = now - (i * dayMs);
            var d = new Date(dayStart);
            days.push({
                label: dayNames[d.getDay()],
                start: dayStart - (dayStart % dayMs),
                count: 0
            });
        }

        AP.auditLogEntries.forEach(function(entry) {
            if (!entry.timestamp) return;
            var ts = typeof entry.timestamp === 'number' ? entry.timestamp :
                (entry.timestamp && typeof entry.timestamp.toDate === 'function') ? entry.timestamp.toDate().getTime() :
                new Date(entry.timestamp).getTime();
            days.forEach(function(day) {
                if (ts >= day.start && ts < day.start + dayMs) day.count++;
            });
        });

        var maxCount = days.reduce(function(m, d) { return Math.max(m, d.count); }, 1);
        var html = '';
        days.forEach(function(day) {
            var height = Math.max(5, Math.round((day.count / maxCount) * 100));
            html += '<div class="mini-bar bar-blue" style="height:' + height + '%;" data-label="' + day.label + '" title="' + day.label + ': ' + day.count + ' acciones"></div>';
        });
        container.innerHTML = html;
    }

    // ========== F5.4: REAL-TIME NOTIFICATIONS ==========
    var _prevAuditCount = -1;

    function checkNewAuditEntries() {
        if (!AP.auditLogEntries || AP.auditLogEntries.length === 0) return;

        if (_prevAuditCount === -1) {
            _prevAuditCount = AP.auditLogEntries.length;
            return;
        }

        if (AP.auditLogEntries.length > _prevAuditCount) {
            var newCount = AP.auditLogEntries.length - _prevAuditCount;
            var latest = AP.auditLogEntries[0];
            var currentUser = (window.auth && window.auth.currentUser) ? window.auth.currentUser.email : '';

            // Only notify about other users' actions
            if (latest && latest.user && latest.user !== currentUser) {
                var who = latest.user;
                if (who.indexOf('@') > 0) who = who.split('@')[0];
                var text = (AP.getActivityText ? AP.getActivityText(latest) : latest.action) || 'realizo accion';
                var target = latest.target || '';
                AP.toast(who + ' ' + text + (target ? ' — ' + target : ''), 'info');
            }
        }

        _prevAuditCount = AP.auditLogEntries.length;
    }

    // Hook into renderActivityFeed to check for new entries
    var _origRenderFeed = AP.renderActivityFeed;
    AP.renderActivityFeed = function() {
        if (_origRenderFeed) _origRenderFeed();
        checkNewAuditEntries();
        renderDashboardCharts();
    };

    // ========== F5.5: WIZARD MODAL ==========
    var WIZARD_STEPS = ['sec-basica', 'sec-precio', 'sec-specs', 'sec-estado', 'sec-fotos', 'sec-features'];
    var _wizardEnabled = true;
    var _currentStep = 0;

    function initWizard() {
        updateWizardUI();

        var prevBtn = $('wizardPrev');
        var nextBtn = $('wizardNext');
        if (prevBtn) prevBtn.addEventListener('click', function() { wizardGoTo(_currentStep - 1); });
        if (nextBtn) nextBtn.addEventListener('click', function() { wizardGoTo(_currentStep + 1); });

        // Click on step indicators
        document.querySelectorAll('#wizardSteps .wizard-step').forEach(function(step, idx) {
            step.addEventListener('click', function() { wizardGoTo(idx); });
        });
    }

    function wizardGoTo(stepIndex) {
        if (stepIndex < 0 || stepIndex >= WIZARD_STEPS.length) return;

        // Validate current step before moving forward
        if (stepIndex > _currentStep && !validateWizardStep(_currentStep)) return;

        _currentStep = stepIndex;
        updateWizardUI();
    }

    function validateWizardStep(stepIndex) {
        var stepId = WIZARD_STEPS[stepIndex];
        var section = $(stepId);
        if (!section) return true;

        var requiredFields = section.querySelectorAll('[required]');
        var valid = true;
        requiredFields.forEach(function(field) {
            if (!field.value || !field.value.trim()) {
                field.classList.add('field-error');
                valid = false;
                setTimeout(function() { field.classList.remove('field-error'); }, 1500);
            }
        });

        if (!valid) {
            AP.toast('Completa los campos requeridos antes de continuar', 'error');
        }
        return valid;
    }

    function updateWizardUI() {
        // Show/hide form sections
        WIZARD_STEPS.forEach(function(stepId, idx) {
            var section = $(stepId);
            if (!section) return;

            var parent = section.closest('.form-section');
            if (!parent) return;

            if (idx === _currentStep) {
                parent.style.display = '';
                section.classList.add('open');
                section.classList.remove('wizard-hidden');
                section.classList.add('wizard-entering');
                setTimeout(function() { section.classList.remove('wizard-entering'); }, 250);
            } else {
                parent.style.display = 'none';
            }
        });

        // Update step indicators
        document.querySelectorAll('#wizardSteps .wizard-step').forEach(function(step, idx) {
            step.classList.remove('active', 'completed');
            if (idx === _currentStep) step.classList.add('active');
            else if (idx < _currentStep) step.classList.add('completed');
        });

        // Update connectors
        document.querySelectorAll('#wizardSteps .wizard-step-connector').forEach(function(conn, idx) {
            conn.style.background = idx < _currentStep ? 'var(--admin-success)' : 'var(--admin-border)';
        });

        // Update nav buttons
        var prevBtn = $('wizardPrev');
        var nextBtn = $('wizardNext');
        var progress = $('wizardProgress');

        if (prevBtn) prevBtn.style.visibility = _currentStep === 0 ? 'hidden' : 'visible';
        if (nextBtn) {
            if (_currentStep === WIZARD_STEPS.length - 1) {
                nextBtn.style.display = 'none';
            } else {
                nextBtn.style.display = '';
                nextBtn.textContent = 'Siguiente →';
            }
        }
        if (progress) progress.textContent = 'Paso ' + (_currentStep + 1) + ' de ' + WIZARD_STEPS.length;
    }

    function resetWizard() {
        _currentStep = 0;
        updateWizardUI();
    }

    // Hook into modal open/close
    function hookWizardToModal() {
        var addBtn = $('btnAddVehicle');
        if (addBtn) {
            addBtn.addEventListener('click', function() {
                setTimeout(resetWizard, 50);
            });
        }

        var closeBtn = $('closeModal');
        var cancelBtn = $('cancelModal');
        if (closeBtn) closeBtn.addEventListener('click', showAllSections);
        if (cancelBtn) cancelBtn.addEventListener('click', showAllSections);
    }

    function showAllSections() {
        WIZARD_STEPS.forEach(function(stepId) {
            var section = $(stepId);
            if (!section) return;
            var parent = section.closest('.form-section');
            if (parent) parent.style.display = '';
        });
    }

    // On edit, show all sections (no wizard stepping) but keep step indicators
    // F6.2: Lazy-bind to avoid undefined if phase5 loads before admin-vehicles
    var _origEditVehicle = null;
    (function() {
        _origEditVehicle = AP.editVehicle;
        AP.editVehicle = function(id) {
            if (!_origEditVehicle) _origEditVehicle = AP._editVehicleOriginal;
            if (!_origEditVehicle) { AP.toast('Error: modulo de vehiculos no cargado', 'error'); return; }
            _origEditVehicle(id);
            setTimeout(function() {
                showAllSections();
                // Mark all steps as completed for editing
                document.querySelectorAll('#wizardSteps .wizard-step').forEach(function(step) {
                    step.classList.add('completed');
                    step.classList.remove('active');
                });
                _currentStep = 0;
                document.querySelector('#wizardSteps .wizard-step').classList.add('active');
                document.querySelector('#wizardSteps .wizard-step').classList.remove('completed');
                var progress = $('wizardProgress');
                if (progress) progress.textContent = 'Editando — todos los pasos';
                var prevBtn = $('wizardPrev');
                var nextBtn = $('wizardNext');
                if (prevBtn) prevBtn.style.visibility = 'hidden';
                if (nextBtn) nextBtn.style.display = 'none';
            }, 100);
        };
    })();

    // Init wizard and chart rendering
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initWizard();
            hookWizardToModal();
        });
    } else {
        initWizard();
        hookWizardToModal();
    }

    // ========== EXPOSE ==========
    AP.renderDashboardCharts = renderDashboardCharts;
    AP.toggleTheme = toggleTheme;
    AP.wizardGoTo = wizardGoTo;
    AP.resetWizard = resetWizard;
})();
