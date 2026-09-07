/**
 * AltorraPipeline — Kanban de ventas (§27.3)
 * ===================================================================
 * Tab "Pipeline" del CRM unificado. Muestra los contactos del CRM
 * agrupados por temperatura del lead en columnas Kanban:
 *
 *   🔥 Calientes (score ≥ 70)     — listos para cerrar
 *   🟧 Tibios (score 40-70)       — en seguimiento
 *   🟦 Fríos (score < 40)         — recientes o sin actividad
 *   💚 Convertidos (vendidos)     — el goal alcanzado
 *
 * Cada card del kanban muestra:
 *   - Avatar del contacto
 *   - Nombre + score numérico
 *   - Última actividad (timeAgo)
 *   - Top NBA action (si disponible) como CTA
 *
 * Drag-drop para mover contactos entre columnas (manual override del
 * score) — implementación completa en commit §27.6 (Workflows).
 * Por ahora kanban estático pero accionable: click en card abre
 * CRM 360° del contacto.
 *
 * Filosofía: visualización de TODO el embudo de ventas en un vistazo,
 * no fragmentado por tabla. El asesor ve dónde está cada cliente y
 * qué acción priorizar.
 */
(function () {
    'use strict';
    if (window.AltorraPipeline) return;
    var AP = window.AP || {};

    var _renderTimer = null;
    var THROTTLE_MS = 2500;

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

    function timeAgo(dateOrMs) {
        if (!dateOrMs) return '';
        var ms = typeof dateOrMs === 'number' ? dateOrMs : new Date(dateOrMs).getTime();
        if (isNaN(ms)) return '';
        var diff = Date.now() - ms;
        var min = Math.floor(diff / 60000);
        if (min < 1) return 'recién';
        if (min < 60) return 'hace ' + min + 'm';
        var h = Math.floor(min / 60);
        if (h < 24) return 'hace ' + h + 'h';
        var d = Math.floor(h / 24);
        if (d < 30) return 'hace ' + d + 'd';
        return 'hace ' + Math.floor(d / 30) + 'mes';
    }

    function getContacts() {
        if (window.AltorraCRM && typeof window.AltorraCRM.getContacts === 'function') {
            try {
                var c = window.AltorraCRM.getContacts();
                if (Array.isArray(c)) return c;
            } catch (e) {}
        }
        // Fallback: reconstruir desde AP.appointments
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
            try {
                var ts = new Date(a.createdAt || a.fecha).getTime();
                if (ts > byEmail[key].lastCommAt) byEmail[key].lastCommAt = ts;
            } catch (e) {}
        });
        return Object.keys(byEmail).map(function (k) { return byEmail[k]; });
    }

    function getScore(c) {
        if (typeof c.score === 'number') return c.score;
        if (window.AltorraCRM && typeof window.AltorraCRM.computeScoreBreakdown === 'function') {
            try {
                var r = window.AltorraCRM.computeScoreBreakdown(c);
                return (r && typeof r.score === 'number') ? r.score : 0;
            } catch (e) {}
        }
        return 0;
    }

    function classifyTier(c) {
        // ¿Convertido? (alguna comm con estado=convertido o vendido)
        if (Array.isArray(c.comms)) {
            for (var i = 0; i < c.comms.length; i++) {
                var s = String(c.comms[i].estado || '').toLowerCase();
                if (s === 'convertido' || s === 'vendido' || s === 'completada') {
                    return 'convertidos';
                }
            }
        }
        var score = getScore(c);
        if (score >= 70) return 'calientes';
        if (score >= 40) return 'tibios';
        return 'frios';
    }

    function getTopNBA(c) {
        if (!window.AltorraNBA || typeof window.AltorraNBA.suggest !== 'function') return null;
        try {
            var suggs = window.AltorraNBA.suggest(c, { limit: 1 });
            return (suggs && suggs[0]) || null;
        } catch (e) { return null; }
    }

    function renderCard(contact) {
        var name = contact.nombre || contact.email || 'Contacto';
        var score = getScore(contact);
        var nba = getTopNBA(contact);
        var initials = getInitials(name);
        var lastAt = contact.lastCommAt ? timeAgo(contact.lastCommAt) : '';

        var nbaHTML = '';
        if (nba && nba.cta) {
            nbaHTML = '<button class="pipeline-card-cta" data-pipeline-action="' +
                escapeHtml(nba.action || '') + '" data-contact-key="' +
                escapeHtml(contact.email || contact.uid || name) + '">' +
                '<i data-lucide="' + escapeHtml(nba.icon || 'arrow-right') + '"></i> ' +
                escapeHtml(nba.cta) +
            '</button>';
        }

        return '<div class="pipeline-card" data-contact-key="' +
            escapeHtml(contact.email || contact.uid || name) + '">' +
            '<div class="pipeline-card-head">' +
                '<div class="pipeline-card-avatar">' + escapeHtml(initials) + '</div>' +
                '<div class="pipeline-card-body">' +
                    '<div class="pipeline-card-name">' + escapeHtml(name) + '</div>' +
                    (lastAt ? '<div class="pipeline-card-time">' + escapeHtml(lastAt) + '</div>' : '') +
                '</div>' +
                '<div class="pipeline-card-score" data-score="' + score + '">' + score + '</div>' +
            '</div>' +
            (nba ? '<div class="pipeline-card-reason">' + escapeHtml(nba.reason || '') + '</div>' : '') +
            nbaHTML +
        '</div>';
    }

    function render() {
        var container = $('pipelineKanban');
        if (!container) return;

        var contacts = getContacts();
        if (!contacts.length) {
            container.innerHTML = '<div class="pred-empty">Sin contactos en el pipeline aún.</div>';
            return;
        }

        // Clasificar por tier
        var tiers = { calientes: [], tibios: [], frios: [], convertidos: [] };
        contacts.forEach(function (c) {
            var tier = classifyTier(c);
            tiers[tier].push(c);
        });

        // Sort por score desc dentro de cada tier
        Object.keys(tiers).forEach(function (k) {
            tiers[k].sort(function (a, b) { return getScore(b) - getScore(a); });
        });

        var TIERS_CONFIG = [
            { key: 'calientes', label: 'Calientes', icon: 'flame', color: 'coral', emoji: '🔥' },
            { key: 'tibios', label: 'Tibios', icon: 'thermometer', color: 'amber', emoji: '🟧' },
            { key: 'frios', label: 'Fríos', icon: 'snowflake', color: 'blue', emoji: '🟦' },
            { key: 'convertidos', label: 'Convertidos', icon: 'check-circle-2', color: 'green', emoji: '💚' }
        ];

        container.innerHTML = TIERS_CONFIG.map(function (cfg) {
            var contacts = tiers[cfg.key];
            return '<div class="pipeline-column" data-tier="' + cfg.key + '">' +
                '<div class="pipeline-col-head">' +
                    '<div class="pipeline-col-title">' +
                        '<i data-lucide="' + cfg.icon + '" class="pipeline-col-icon pipeline-col-icon--' + cfg.color + '"></i>' +
                        '<span>' + cfg.label + '</span>' +
                        '<span class="pipeline-col-count">' + contacts.length + '</span>' +
                    '</div>' +
                '</div>' +
                '<div class="pipeline-col-cards">' +
                    (contacts.length === 0
                        ? '<div class="pipeline-col-empty">Sin contactos en este tier</div>'
                        : contacts.slice(0, 20).map(renderCard).join('')) +
                    (contacts.length > 20
                        ? '<div class="pipeline-col-more">+ ' + (contacts.length - 20) + ' más</div>'
                        : '') +
                '</div>' +
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

    /* Click en card o CTA → abrir CRM 360° del contacto */
    document.addEventListener('click', function (e) {
        var ctaBtn = e.target.closest && e.target.closest('.pipeline-card-cta');
        var card = e.target.closest && e.target.closest('.pipeline-card');
        if (!ctaBtn && !card) return;
        e.stopPropagation();
        var contactKey = (ctaBtn || card).getAttribute('data-contact-key');
        if (!contactKey) return;
        if (window.AltorraCRMTabs) window.AltorraCRMTabs.setActiveTab('contactos');
        if (window.AltorraCRM && typeof window.AltorraCRM.openContactDetail === 'function') {
            setTimeout(function () {
                try { window.AltorraCRM.openContactDetail(contactKey); } catch (err) {}
            }, 150);
        }
    });

    /* Refresh button */
    document.addEventListener('click', function (e) {
        if (e.target.closest && e.target.closest('#pipelineRefresh')) render();
    });

    /* Hooks: render cuando llega data o cambia tab a pipeline */
    function bootListener() {
        if (window.AltorraEventBus && window.AltorraEventBus.on) {
            window.AltorraEventBus.on('comm.', scheduleRender);
            window.AltorraEventBus.on('crm.', scheduleRender);
        }
        // Render cuando se activa el tab pipeline (lazy)
        if (window.AltorraEventBus && window.AltorraEventBus.on) {
            window.AltorraEventBus.on('crm.tab-changed', function (e) {
                if (e && e.payload && e.payload.tab === 'pipeline') {
                    setTimeout(render, 100);
                }
            });
        }
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bootListener);
    } else {
        bootListener();
    }

    /* ─── Public API ─────────────────────────────────────────────── */
    window.AltorraPipeline = {
        render: render,
        classifyTier: classifyTier
    };
})();
