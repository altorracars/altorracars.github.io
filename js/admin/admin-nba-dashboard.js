/**
 * AltorraNBADashboard — Top 5 Próximas Acciones Recomendadas (§27.2)
 * ===================================================================
 * §27 ALTORRA HARMONY CRM — Reemplaza los atajos genéricos de
 * navegación (Nuevo vehículo, Marcas, Solicitudes, Aliados) con
 * inteligencia accionable real.
 *
 * Recorre TODOS los contactos del CRM y para cada uno computa NBA
 * (Next Best Action) con AltorraNBA.suggest. Selecciona las top 5
 * acciones globales con mayor prioridad y las muestra como tarjetas
 * accionables: "Llamar a Daniel — score 85, sin contacto 3d".
 *
 * Cada acción tiene:
 *   - Avatar con iniciales del contacto
 *   - Nombre del contacto + razón humana de la sugerencia
 *   - Botón primario para ejecutar (abrir CRM 360° o ir a chat)
 *
 * Filosofía: convierte el Inicio de pantalla decorativa en herramienta
 * de productividad. El asesor entra en la mañana y sabe exactamente
 * qué tiene que hacer.
 */
(function () {
    'use strict';
    if (window.AltorraNBADashboard) return;
    var AP = window.AP || {};

    var _renderTimer = null;
    var THROTTLE_MS = 3000;

    function $(id) { return document.getElementById(id); }

    function escapeHtml(s) {
        var d = document.createElement('div');
        d.textContent = s == null ? '' : String(s);
        return d.innerHTML;
    }

    function getInitials(name) {
        if (!name) return '?';
        var parts = String(name).split(' ').filter(Boolean);
        if (parts.length === 0) return '?';
        if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }

    /**
     * Construir lista unificada de contactos. Reusa la lógica de admin-crm.js
     * (clientes/{uid} + guests merged por email del solicitudes).
     * Si admin-crm.js no expone API, reconstruir desde AP.appointments.
     */
    function getContacts() {
        if (window.AltorraCRM && typeof window.AltorraCRM.getContacts === 'function') {
            try { return window.AltorraCRM.getContacts(); } catch (e) {}
        }
        // Fallback: reconstruir desde AP.appointments agrupando por email
        var apps = AP.appointments || [];
        var byEmail = {};
        apps.forEach(function (a) {
            var email = (a.userEmail || a.email || '').toLowerCase().trim();
            var key = email || ('guest:' + a.id);
            if (!byEmail[key]) {
                byEmail[key] = {
                    nombre: a.nombre || 'Sin nombre',
                    email: email,
                    comms: [],
                    lastCommAt: 0,
                    type: a.userId ? 'registered' : 'guest'
                };
            }
            byEmail[key].comms.push(a);
            var ts;
            try { ts = new Date(a.createdAt || a.fecha).getTime(); } catch (e) { ts = 0; }
            if (ts > byEmail[key].lastCommAt) byEmail[key].lastCommAt = ts;
        });
        return Object.keys(byEmail).map(function (k) { return byEmail[k]; });
    }

    /**
     * Compute top 5 NBA actions across all contacts.
     * Each suggestion has priority 0-100; we sort globally and take top 5.
     */
    function computeTopActions() {
        if (!window.AltorraNBA || typeof window.AltorraNBA.suggest !== 'function') return [];

        var contacts = getContacts();
        if (!contacts.length) return [];

        var allActions = [];
        contacts.forEach(function (contact) {
            try {
                var suggestions = window.AltorraNBA.suggest(contact, { limit: 1 }); // top 1 por contacto
                (suggestions || []).forEach(function (s) {
                    if (s && s.priority >= 50) {
                        // Solo acciones medianas+ (filtro umbral)
                        allActions.push({
                            contact: contact,
                            suggestion: s
                        });
                    }
                });
            } catch (e) { /* skip */ }
        });

        // Sort globalmente por priority desc + take top 5
        allActions.sort(function (a, b) {
            return (b.suggestion.priority || 0) - (a.suggestion.priority || 0);
        });
        return allActions.slice(0, 5);
    }

    function priorityClass(p) {
        if (p >= 90) return 'nba-dash-priority--critical';
        if (p >= 75) return 'nba-dash-priority--high';
        if (p >= 60) return 'nba-dash-priority--medium';
        return 'nba-dash-priority--low';
    }

    function priorityLabel(p) {
        if (p >= 90) return 'CRÍTICA';
        if (p >= 75) return 'ALTA';
        if (p >= 60) return 'MEDIA';
        return 'BAJA';
    }

    function render() {
        var container = $('nbaDashboardList');
        if (!container) return;

        var actions = computeTopActions();
        if (!actions.length) {
            container.innerHTML =
                '<div class="nba-dash-empty">' +
                    '<i data-lucide="check-circle-2" style="width:32px;height:32px;color:#10b981;"></i>' +
                    '<p style="margin:8px 0 0;">Todo bajo control. Sin acciones urgentes en este momento.</p>' +
                '</div>';
            if (window.AltorraIcons) window.AltorraIcons.refresh(container);
            return;
        }

        container.innerHTML = actions.map(function (a, idx) {
            var c = a.contact;
            var s = a.suggestion;
            var name = c.nombre || c.email || 'Contacto';
            var initials = getInitials(name);
            var priCls = priorityClass(s.priority || 0);
            var priLbl = priorityLabel(s.priority || 0);
            var icon = s.icon || 'arrow-right';
            var cta = s.cta || 'Ver contacto';

            return '<div class="nba-dash-item ' + priCls + '" data-contact-key="' + escapeHtml(c.email || c.nombre || idx) + '">' +
                '<div class="nba-dash-rank">' + (idx + 1) + '</div>' +
                '<div class="nba-dash-avatar">' + escapeHtml(initials) + '</div>' +
                '<div class="nba-dash-body">' +
                    '<div class="nba-dash-head">' +
                        '<span class="nba-dash-name">' + escapeHtml(name) + '</span>' +
                        '<span class="nba-dash-pri-pill ' + priCls + '">' + priLbl + '</span>' +
                    '</div>' +
                    '<div class="nba-dash-reason">' + escapeHtml(s.reason || s.action || 'Sugerencia') + '</div>' +
                '</div>' +
                '<button class="alt-btn alt-btn--primary alt-btn--sm nba-dash-cta" data-nba-act="' + escapeHtml(s.action || '') + '">' +
                    '<i data-lucide="' + icon + '"></i> ' + escapeHtml(cta) +
                '</button>' +
            '</div>';
        }).join('');

        if (window.AltorraIcons) window.AltorraIcons.refresh(container);
    }

    function scheduleRender() {
        if (_renderTimer) return;
        _renderTimer = setTimeout(function () {
            _renderTimer = null;
            render();
        }, THROTTLE_MS);
    }

    /* Click en CTA → abrir CRM 360° del contacto. Si admin-crm tiene
       openContactDetail expuesto, usarlo; sino navegar a CRM. */
    document.addEventListener('click', function (e) {
        var btn = e.target.closest && e.target.closest('.nba-dash-cta');
        if (!btn) return;
        var item = btn.closest('.nba-dash-item');
        var contactKey = item ? item.getAttribute('data-contact-key') : null;
        // Navegar a CRM (sección con tabs en commit §27.3)
        if (window.AltorraSections) window.AltorraSections.go('crm');
        // Si CRM expone openContactDetail, usarlo
        if (contactKey && window.AltorraCRM && typeof window.AltorraCRM.openContactDetail === 'function') {
            setTimeout(function () {
                try { window.AltorraCRM.openContactDetail(contactKey); } catch (err) {}
            }, 200);
        }
    });

    /* Refresh manual button */
    document.addEventListener('click', function (e) {
        if (e.target.closest && e.target.closest('#nbaDashRefresh')) {
            render();
        }
    });

    /* Listeners EventBus */
    function bootListener() {
        if (window.AltorraEventBus && window.AltorraEventBus.on) {
            window.AltorraEventBus.on('comm.', scheduleRender);
            window.AltorraEventBus.on('crm.', scheduleRender);
        }
        if (window.AltorraSections && window.AltorraSections.onChange) {
            window.AltorraSections.onChange(function (section) {
                if (section === 'dashboard') scheduleRender();
            });
        }
        // Render inicial cuando los datos estén listos
        setTimeout(function () {
            if (AP.appointments && AP.appointments.length) render();
            else setTimeout(scheduleRender, 3000);
        }, 1500);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bootListener);
    } else {
        bootListener();
    }

    /* ─── Public API ─────────────────────────────────────────────── */
    window.AltorraNBADashboard = {
        render: render,
        compute: computeTopActions
    };
})();
