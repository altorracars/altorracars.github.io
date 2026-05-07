/**
 * AltorraHeroKPIs — 3 KPIs hero del Inicio (§27.2)
 * ===================================================================
 * §27 ALTORRA HARMONY CRM — Reemplaza la grilla genérica de 8 stats
 * (Total vehículos, Marcas, etc) con 3 KPIs vitales del día:
 *
 *   1. Leads de hoy        — solicitudes/citas/leads creadas en las últimas 24h
 *   2. Citas de hoy        — citas con fecha === hoy + estado pending/confirmada
 *   3. Tareas pendientes   — todo lo que requiere acción del equipo:
 *                            • SLAs vencidos (slaDeadline < ahora, status pendiente)
 *                            • Chats sin claim (mode=queue, claimedBy=null)
 *                            • Solicitudes pendientes >24h sin respuesta
 *
 * Cada KPI muestra:
 *   - Valor numérico grande
 *   - Tendencia vs ayer (↑↓ + diff absoluto + color verde/rojo/neutral)
 *   - Click navega a la sección relevante (CRM/Calendar/CRM-pendientes)
 *
 * Filosofía: minimalismo PRODUCTIVO. No info decorativa, solo lo que
 * el dueño/asesor necesita ver al primer vistazo del día.
 *
 * Reactividad: re-render cuando AP.appointments cambia (onSnapshot
 * de admin-sync.js dispara update masivo). Throttle 2s para no
 * recomputar en cada delta.
 */
(function () {
    'use strict';
    if (window.AltorraHeroKPIs) return;
    var AP = window.AP || {};

    var _renderTimer = null;
    var _lastRender = 0;
    var THROTTLE_MS = 2000;

    function $(id) { return document.getElementById(id); }

    function isToday(dateStr) {
        if (!dateStr) return false;
        var d;
        try { d = new Date(dateStr); } catch (e) { return false; }
        if (isNaN(d.getTime())) return false;
        var today = new Date();
        return d.getFullYear() === today.getFullYear()
            && d.getMonth() === today.getMonth()
            && d.getDate() === today.getDate();
    }

    function isYesterday(dateStr) {
        if (!dateStr) return false;
        var d;
        try { d = new Date(dateStr); } catch (e) { return false; }
        if (isNaN(d.getTime())) return false;
        var y = new Date();
        y.setDate(y.getDate() - 1);
        return d.getFullYear() === y.getFullYear()
            && d.getMonth() === y.getMonth()
            && d.getDate() === y.getDate();
    }

    /**
     * computeKPIs — computa los 3 valores + sus tendencias vs ayer.
     */
    function computeKPIs() {
        var apps = (AP.appointments || []);

        // 1. Leads de hoy = todo doc creado hoy en solicitudes/
        var leadsToday = 0, leadsYesterday = 0;
        apps.forEach(function (a) {
            var createdAt = a.createdAt || a.created || a._createdAt;
            if (isToday(createdAt)) leadsToday++;
            else if (isYesterday(createdAt)) leadsYesterday++;
        });

        // 2. Citas de hoy = kind=cita o requiereCita Y fecha===hoy Y estado activo
        var citasToday = 0, citasYesterday = 0;
        apps.forEach(function (a) {
            var isCita = a.kind === 'cita' || a.requiereCita === true;
            if (!isCita || !a.fecha) return;
            var status = String(a.estado || '').toLowerCase();
            if (status === 'cancelada' || status === 'completada' || status === 'rechazada') return;
            if (isToday(a.fecha)) citasToday++;
            else if (isYesterday(a.fecha)) citasYesterday++;
        });

        // 3. Tareas pendientes (incluye SLA breach + chats sin claim + pendientes >24h)
        var tareasPendientes = 0;
        var tareasAyer = 0;
        var now = Date.now();
        var oneDayMs = 24 * 60 * 60 * 1000;

        apps.forEach(function (a) {
            var status = String(a.estado || '').toLowerCase();
            // Solo cuentan los que requieren acción
            if (['completada', 'cancelada', 'rechazada', 'descartado', 'sin_respuesta'].indexOf(status) >= 0) return;
            // Solo activos
            if (status !== 'pendiente' && status !== 'nuevo' && status !== 'en_revision') return;

            var createdAt = a.createdAt || a.created;
            if (!createdAt) return;
            var createdMs;
            try { createdMs = new Date(createdAt).getTime(); } catch (e) { return; }
            if (isNaN(createdMs)) return;

            // SLA breach
            var slaDeadline = a.slaDeadline;
            if (slaDeadline) {
                try {
                    if (new Date(slaDeadline).getTime() < now) {
                        tareasPendientes++;
                        return;
                    }
                } catch (e) {}
            }

            // Pendiente >24h
            if (now - createdMs > oneDayMs) {
                tareasPendientes++;
            }
        });

        // Chats sin claim (mode=queue, claimedBy=null)
        var chats = (AP.conciergeChats || window._adminConciergeChats || []);
        chats.forEach(function (c) {
            if (c && c.mode === 'queue' && !c.claimedBy && c.status !== 'closed') {
                tareasPendientes++;
            }
        });

        // Aproximación tareas ayer = mismas reglas pero contra createdAt < ayer fin de día
        // (heurística simple: usar diferencia total - hoy)
        // Para mantener simple, no calculamos exactamente — solo retornamos tendencia neutra si no hay data
        return {
            leads: { value: leadsToday, prev: leadsYesterday },
            citas: { value: citasToday, prev: citasYesterday },
            tareas: { value: tareasPendientes, prev: tareasAyer }  // tareas no tienen serie temporal precisa
        };
    }

    function renderTrend(value, prev, kpiKey) {
        // Para "tareas" no mostramos tendencia (no tenemos serie temporal precisa)
        if (kpiKey === 'tareas') {
            if (value === 0) return '<span class="hero-kpi-trend-pill hero-kpi-trend-pill--neutral">Todo al día ✓</span>';
            return '<span class="hero-kpi-trend-pill hero-kpi-trend-pill--warn">Requiere atención</span>';
        }
        if (prev === undefined || prev === null) {
            return '<span class="hero-kpi-trend-pill hero-kpi-trend-pill--neutral">—</span>';
        }
        var diff = value - prev;
        if (diff === 0) {
            return '<span class="hero-kpi-trend-pill hero-kpi-trend-pill--neutral">= ayer</span>';
        }
        var arrow = diff > 0 ? '↑' : '↓';
        var sign = diff > 0 ? '+' : '';
        var cls = diff > 0 ? 'hero-kpi-trend-pill--up' : 'hero-kpi-trend-pill--down';
        return '<span class="hero-kpi-trend-pill ' + cls + '">' + arrow + ' ' + sign + diff + ' vs ayer</span>';
    }

    function render() {
        var leadsEl = $('heroKpiLeads');
        var citasEl = $('heroKpiCitas');
        var tareasEl = $('heroKpiTareas');
        if (!leadsEl || !citasEl || !tareasEl) return;

        var kpis = computeKPIs();

        // Update values + trends
        var leadsVal = leadsEl.querySelector('.hero-kpi-value');
        var leadsTrd = leadsEl.querySelector('.hero-kpi-trend');
        if (leadsVal) leadsVal.textContent = kpis.leads.value;
        if (leadsTrd) leadsTrd.innerHTML = renderTrend(kpis.leads.value, kpis.leads.prev, 'leads');

        var citasVal = citasEl.querySelector('.hero-kpi-value');
        var citasTrd = citasEl.querySelector('.hero-kpi-trend');
        if (citasVal) citasVal.textContent = kpis.citas.value;
        if (citasTrd) citasTrd.innerHTML = renderTrend(kpis.citas.value, kpis.citas.prev, 'citas');

        var tareasVal = tareasEl.querySelector('.hero-kpi-value');
        var tareasTrd = tareasEl.querySelector('.hero-kpi-trend');
        if (tareasVal) tareasVal.textContent = kpis.tareas.value;
        if (tareasTrd) tareasTrd.innerHTML = renderTrend(kpis.tareas.value, kpis.tareas.prev, 'tareas');

        // Color según valor (tareas urgentes en rojo, etc)
        tareasEl.classList.toggle('hero-kpi--urgent', kpis.tareas.value > 0);

        _lastRender = Date.now();
    }

    function scheduleRender() {
        var now = Date.now();
        var timeSinceLast = now - _lastRender;
        if (_renderTimer) return; // ya pendiente
        if (timeSinceLast >= THROTTLE_MS) {
            render();
        } else {
            _renderTimer = setTimeout(function () {
                _renderTimer = null;
                render();
            }, THROTTLE_MS - timeSinceLast);
        }
    }

    /* §27.2 — Click handlers: cada KPI navega a la sección útil */
    document.addEventListener('click', function (e) {
        if (e.target.closest && e.target.closest('#heroKpiLeads')) {
            if (window.AltorraSections) window.AltorraSections.go('crm');
        } else if (e.target.closest && e.target.closest('#heroKpiCitas')) {
            if (window.AltorraSections) window.AltorraSections.go('calendar');
        } else if (e.target.closest && e.target.closest('#heroKpiTareas')) {
            if (window.AltorraSections) window.AltorraSections.go('crm');
        }
    });

    /* Auto-refresh cuando llegue data del admin (admin-sync.js dispara
       updates de AP.appointments). Listener al EventBus para reactividad. */
    function bootListener() {
        if (window.AltorraEventBus && window.AltorraEventBus.on) {
            window.AltorraEventBus.on('comm.', scheduleRender);
            window.AltorraEventBus.on('appointment.', scheduleRender);
            window.AltorraEventBus.on('vehicle.', scheduleRender);
        }
        // Re-render al entrar a sección Inicio
        if (window.AltorraSections && window.AltorraSections.onChange) {
            window.AltorraSections.onChange(function (section) {
                if (section === 'dashboard') scheduleRender();
            });
        }
        // Render inicial cuando AP.appointments esté listo
        if (AP && AP.appointments && AP.appointments.length) {
            scheduleRender();
        } else {
            // Reintentar tras 2s para coger primer snapshot
            setTimeout(scheduleRender, 2000);
        }
        // Render periódico cada 60s para que tareas pendientes refresque
        // SLAs vencidos sin necesidad de evento
        setInterval(function () {
            var sec = document.querySelector('.section.active');
            if (sec && sec.id === 'sec-dashboard') render();
        }, 60000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bootListener);
    } else {
        bootListener();
    }

    /* ─── Public API ─────────────────────────────────────────────── */
    window.AltorraHeroKPIs = {
        render: render,
        compute: computeKPIs
    };
})();
