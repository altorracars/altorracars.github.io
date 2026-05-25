/**
 * AltorraSidebarBadges — Counts dinámicos en items del sidebar (§27.7)
 * ===================================================================
 * Pobla los `<span class="nav-badge" id="navBadgeXXX">` con counts
 * dinámicos en tiempo real. El asesor ve sin navegar:
 *
 *   • Vehículos       → total disponibles (no incluye vendidos)
 *   • Marcas          → total
 *   • Banners         → total activos
 *   • Reseñas         → total publicadas
 *   • CRM             → contactos calientes (score ≥ 70)
 *   • Calendario      → citas pendientes hoy
 *   • ALTOR Hub       → chats unread (existing admin-concierge.js)
 *   • Lo que no entendí → unmatched sin revisar (existing admin-unmatched.js)
 *   • Auditoría       → anomalías detectadas (mostrar punto rojo si > 0)
 *
 * Reactividad: re-render al recibir eventos del bus + throttle 1.5s
 * para no recomputar en cada delta.
 *
 * Filosofía: estado del sistema visible al alcance, sin requerir
 * navegar a cada sección.
 */
(function () {
    'use strict';
    if (window.AltorraSidebarBadges) return;
    var AP = window.AP || {};

    var _renderTimer = null;
    var THROTTLE_MS = 1500;

    function $(id) { return document.getElementById(id); }

    function setBadge(id, value, options) {
        var el = $(id);
        if (!el) return;
        options = options || {};
        var n = Number(value);
        if (!n || isNaN(n) || n <= 0) {
            el.textContent = '';
            el.style.display = 'none';
            return;
        }
        el.textContent = n > 99 ? '99+' : String(n);
        el.style.display = '';
        if (options.tone === 'urgent') el.setAttribute('data-tone', 'urgent');
        else if (options.tone === 'success') el.setAttribute('data-tone', 'success');
        else el.removeAttribute('data-tone');
    }

    function compute() {
        var vehicles = AP.vehicles || [];
        var apps = AP.appointments || [];
        var brands = AP.brands || [];
        var banners = AP.banners || [];
        var reviews = AP.reviews || [];

        // Vehículos disponibles (no vendidos / borrador)
        var availableVehicles = vehicles.filter(function (v) {
            return v.estado !== 'vendido' && v.estado !== 'borrador';
        }).length;
        setBadge('navBadgeVehicles', availableVehicles);

        // Marcas
        setBadge('navBadgeBrands', brands.length);

        // Banners activos
        var activeBanners = banners.filter(function (b) { return b.activo !== false && b.active !== false; }).length;
        setBadge('navBadgeBanners', activeBanners);

        // Reseñas publicadas
        var publishedReviews = reviews.filter(function (r) {
            return r.estado === 'publicada' || r.estado === 'aprobada' || (!r.estado);
        }).length;
        setBadge('navBadgeReviews', publishedReviews);

        // CRM: contactos calientes (score ≥ 70). Si AltorraCRM expone
        // getContacts, usar; sino, fallback a leads-de-hoy.
        var crmCount = 0;
        var hotTone = false;
        if (window.AltorraCRM && typeof window.AltorraCRM.getContacts === 'function') {
            try {
                var contacts = window.AltorraCRM.getContacts() || [];
                contacts.forEach(function (c) {
                    var score = (c.score || (window.AltorraCRM.computeScoreBreakdown
                        ? (window.AltorraCRM.computeScoreBreakdown(c) || {}).score
                        : 0)) || 0;
                    if (score >= 70) crmCount++;
                });
                if (crmCount >= 5) hotTone = true;  // 5+ calientes = atención
            } catch (e) {}
        }
        if (crmCount === 0) {
            // Fallback: leads de hoy
            var today = new Date();
            apps.forEach(function (a) {
                if (!a.createdAt) return;
                try {
                    var d = new Date(a.createdAt);
                    if (d.getFullYear() === today.getFullYear()
                        && d.getMonth() === today.getMonth()
                        && d.getDate() === today.getDate()) crmCount++;
                } catch (e) {}
            });
        }
        setBadge('navBadgeCrm', crmCount, { tone: hotTone ? 'urgent' : null });

        // Calendario: citas pendientes hoy
        var citasHoy = 0;
        apps.forEach(function (a) {
            var isCita = a.kind === 'cita' || a.requiereCita === true;
            if (!isCita || !a.fecha) return;
            var status = String(a.estado || '').toLowerCase();
            if (status === 'cancelada' || status === 'completada' || status === 'rechazada') return;
            try {
                var d = new Date(a.fecha);
                var t = new Date();
                if (d.getFullYear() === t.getFullYear()
                    && d.getMonth() === t.getMonth()
                    && d.getDate() === t.getDate()) citasHoy++;
            } catch (e) {}
        });
        setBadge('navBadgeCalendar', citasHoy);

        // Auditoría: anomalías detectadas (heurística similar a Reportes)
        var anomalies = 0;
        // SLA breach >3
        var slaBreaches = apps.filter(function (a) {
            if (!a.slaDeadline) return false;
            try {
                return new Date(a.slaDeadline).getTime() < Date.now()
                    && String(a.estado || '').toLowerCase() === 'pendiente';
            } catch (e) { return false; }
        }).length;
        if (slaBreaches >= 3) anomalies++;

        // Vehículos stale >60d
        var stale = vehicles.filter(function (v) {
            if (v.estado !== 'disponible' || !v.createdAt) return false;
            try {
                return (Date.now() - new Date(v.createdAt).getTime()) > 60 * 24 * 60 * 60 * 1000;
            } catch (e) { return false; }
        }).length;
        if (stale >= 3) anomalies++;

        setBadge('navBadgeAudit', anomalies, { tone: anomalies > 0 ? 'urgent' : null });

        // navBadgeConcierge + navBadgeUnmatched ya gestionados por sus
        // módulos respectivos (admin-concierge.js + admin-unmatched.js).
        // No los tocamos para no chocar.
    }

    function scheduleRender() {
        if (_renderTimer) return;
        _renderTimer = setTimeout(function () {
            _renderTimer = null;
            compute();
        }, THROTTLE_MS);
    }

    /* Listeners EventBus */
    function bootListener() {
        if (window.AltorraEventBus && window.AltorraEventBus.on) {
            window.AltorraEventBus.on('vehicle.', scheduleRender);
            window.AltorraEventBus.on('comm.', scheduleRender);
            window.AltorraEventBus.on('crm.', scheduleRender);
            window.AltorraEventBus.on('appointment.', scheduleRender);
        }

        // Render inicial cuando data esté lista (retry hasta 30s)
        var attempts = 0;
        var iv = setInterval(function () {
            attempts++;
            if ((AP.vehicles && AP.vehicles.length)
                || (AP.appointments && AP.appointments.length)
                || attempts > 60) {
                clearInterval(iv);
                compute();
            }
        }, 500);

        // Refresh periódico cada 60s para que SLAs / staleness refresquen
        setInterval(compute, 60000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bootListener);
    } else {
        bootListener();
    }

    /* ─── Public API ─────────────────────────────────────────────── */
    window.AltorraSidebarBadges = {
        refresh: compute,
        setBadge: setBadge
    };
})();
