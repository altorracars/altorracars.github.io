/**
 * AltorraEmptyStates — Ilustraciones SVG inline para empty states
 * ===============================================================
 * Patrón Stripe/Linear/Notion: cuando una sección está vacía,
 * en lugar de texto plano se renderiza una ilustración SVG
 * personalizada por dominio. Trae personalidad y reduce la
 * sensación de "está roto".
 *
 * API:
 *   AltorraEmptyStates.html(kind, opts) → string HTML completo
 *   AltorraEmptyStates.render(container, kind, opts)
 *
 * Kinds disponibles: vehicles, contacts, conversations, calendar,
 *   reports, search, kb, unmatched, audit, generic
 */
(function () {
    'use strict';
    if (window.AltorraEmptyStates) return;

    /* ─── SVG Illustrations (HarmonyOS + iOS 26 inspired) ───────── */
    var ILLUSTRATIONS = {
        // Vehículo: SUV stylized minimal
        vehicles: '<svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
            '<defs><linearGradient id="evGold" x1="0" x2="1" y1="0" y2="1">' +
            '<stop offset="0%" stop-color="#d4ad6e" stop-opacity="0.4"/>' +
            '<stop offset="100%" stop-color="#b89658" stop-opacity="0.1"/>' +
            '</linearGradient></defs>' +
            '<ellipse cx="100" cy="120" rx="70" ry="6" fill="url(#evGold)"/>' +
            '<path d="M40 90 Q40 60 70 55 L130 55 Q160 60 160 90 L160 100 L40 100 Z" stroke="#b89658" stroke-width="2" fill="rgba(184,150,88,0.06)"/>' +
            '<rect x="55" y="65" width="35" height="20" rx="3" stroke="#b89658" stroke-width="1.5" fill="none" opacity="0.6"/>' +
            '<rect x="110" y="65" width="35" height="20" rx="3" stroke="#b89658" stroke-width="1.5" fill="none" opacity="0.6"/>' +
            '<circle cx="65" cy="100" r="11" fill="#1a1a1a" stroke="#b89658" stroke-width="2"/>' +
            '<circle cx="65" cy="100" r="4" fill="#b89658"/>' +
            '<circle cx="135" cy="100" r="11" fill="#1a1a1a" stroke="#b89658" stroke-width="2"/>' +
            '<circle cx="135" cy="100" r="4" fill="#b89658"/>' +
            '<path d="M30 50 L40 30" stroke="#b89658" stroke-width="2" stroke-linecap="round" opacity="0.4"/>' +
            '<path d="M170 50 L160 30" stroke="#b89658" stroke-width="2" stroke-linecap="round" opacity="0.4"/>' +
            '<circle cx="35" cy="25" r="2" fill="#b89658" opacity="0.5"/>' +
            '<circle cx="165" cy="25" r="2" fill="#b89658" opacity="0.5"/>' +
            '</svg>',

        // Contactos: people stylized
        contacts: '<svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
            '<ellipse cx="100" cy="125" rx="60" ry="5" fill="rgba(59,130,246,0.20)"/>' +
            '<circle cx="80" cy="60" r="20" stroke="#60a5fa" stroke-width="2" fill="rgba(59,130,246,0.10)"/>' +
            '<path d="M55 105 Q55 85 80 85 Q105 85 105 105 L105 115 L55 115 Z" stroke="#60a5fa" stroke-width="2" fill="rgba(59,130,246,0.06)"/>' +
            '<circle cx="130" cy="68" r="16" stroke="#60a5fa" stroke-width="2" fill="rgba(59,130,246,0.10)" opacity="0.7"/>' +
            '<path d="M110 110 Q110 92 130 92 Q150 92 150 110 L150 115 L110 115 Z" stroke="#60a5fa" stroke-width="2" fill="rgba(59,130,246,0.06)" opacity="0.7"/>' +
            '<circle cx="40" cy="75" r="12" stroke="#60a5fa" stroke-width="1.5" fill="rgba(59,130,246,0.08)" opacity="0.5"/>' +
            '<path d="M25 110 Q25 95 40 95 Q55 95 55 110 L55 115 L25 115 Z" stroke="#60a5fa" stroke-width="1.5" fill="rgba(59,130,246,0.04)" opacity="0.5"/>' +
            '</svg>',

        // Conversations: chat bubbles
        conversations: '<svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
            '<ellipse cx="100" cy="125" rx="60" ry="5" fill="rgba(16,185,129,0.20)"/>' +
            '<path d="M30 30 Q30 20 40 20 L120 20 Q130 20 130 30 L130 70 Q130 80 120 80 L60 80 L40 95 L45 80 L40 80 Q30 80 30 70 Z" stroke="#10b981" stroke-width="2" fill="rgba(16,185,129,0.08)"/>' +
            '<circle cx="55" cy="50" r="3" fill="#10b981"/>' +
            '<circle cx="80" cy="50" r="3" fill="#10b981"/>' +
            '<circle cx="105" cy="50" r="3" fill="#10b981"/>' +
            '<path d="M75 60 Q75 55 80 55 L160 55 Q170 55 170 65 L170 100 Q170 110 160 110 L165 120 L150 110 L80 110 Q75 110 75 100 Z" stroke="#10b981" stroke-width="2" fill="rgba(16,185,129,0.04)" opacity="0.7"/>' +
            '</svg>',

        // Calendar: calendar with dots
        calendar: '<svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
            '<ellipse cx="100" cy="125" rx="60" ry="5" fill="rgba(139,92,246,0.20)"/>' +
            '<rect x="40" y="35" width="120" height="80" rx="8" stroke="#a78bfa" stroke-width="2" fill="rgba(139,92,246,0.06)"/>' +
            '<line x1="40" y1="55" x2="160" y2="55" stroke="#a78bfa" stroke-width="2"/>' +
            '<rect x="55" y="25" width="6" height="20" rx="2" fill="#a78bfa"/>' +
            '<rect x="139" y="25" width="6" height="20" rx="2" fill="#a78bfa"/>' +
            '<circle cx="60" cy="73" r="3" fill="#a78bfa" opacity="0.5"/>' +
            '<circle cx="80" cy="73" r="3" fill="#a78bfa" opacity="0.7"/>' +
            '<circle cx="100" cy="73" r="3" fill="#a78bfa"/>' +
            '<circle cx="120" cy="73" r="3" fill="#a78bfa" opacity="0.7"/>' +
            '<circle cx="140" cy="73" r="3" fill="#a78bfa" opacity="0.5"/>' +
            '<rect x="75" y="86" width="50" height="20" rx="3" fill="#a78bfa" opacity="0.20"/>' +
            '<circle cx="100" cy="96" r="4" fill="#a78bfa"/>' +
            '</svg>',

        // Reports: bar chart + arrow
        reports: '<svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
            '<ellipse cx="100" cy="125" rx="60" ry="5" fill="rgba(6,182,212,0.20)"/>' +
            '<line x1="40" y1="115" x2="170" y2="115" stroke="#06b6d4" stroke-width="2" opacity="0.5"/>' +
            '<rect x="55" y="80" width="14" height="35" rx="2" fill="rgba(6,182,212,0.30)" stroke="#06b6d4" stroke-width="1.5"/>' +
            '<rect x="80" y="60" width="14" height="55" rx="2" fill="rgba(6,182,212,0.40)" stroke="#06b6d4" stroke-width="1.5"/>' +
            '<rect x="105" y="40" width="14" height="75" rx="2" fill="rgba(6,182,212,0.50)" stroke="#06b6d4" stroke-width="1.5"/>' +
            '<rect x="130" y="55" width="14" height="60" rx="2" fill="rgba(6,182,212,0.45)" stroke="#06b6d4" stroke-width="1.5"/>' +
            '<path d="M50 90 L75 75 L100 50 L125 35 L145 50" stroke="#06b6d4" stroke-width="2" fill="none" stroke-linecap="round"/>' +
            '<polygon points="145,50 145,42 153,46" fill="#06b6d4"/>' +
            '<circle cx="50" cy="90" r="3" fill="#06b6d4"/>' +
            '<circle cx="100" cy="50" r="3" fill="#06b6d4"/>' +
            '</svg>',

        // Search: magnifying glass
        search: '<svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
            '<ellipse cx="100" cy="125" rx="60" ry="5" fill="rgba(184,150,88,0.20)"/>' +
            '<circle cx="85" cy="65" r="35" stroke="#b89658" stroke-width="3" fill="rgba(184,150,88,0.04)"/>' +
            '<circle cx="85" cy="65" r="22" stroke="#b89658" stroke-width="1.5" fill="none" opacity="0.4"/>' +
            '<line x1="112" y1="92" x2="140" y2="118" stroke="#b89658" stroke-width="5" stroke-linecap="round"/>' +
            '<circle cx="85" cy="65" r="4" fill="#b89658"/>' +
            '<path d="M65 50 L75 60" stroke="#b89658" stroke-width="2" stroke-linecap="round" opacity="0.6"/>' +
            '</svg>',

        // KB: book / brain
        kb: '<svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
            '<ellipse cx="100" cy="125" rx="60" ry="5" fill="rgba(16,185,129,0.20)"/>' +
            '<path d="M60 40 Q60 30 70 30 L130 30 Q140 30 140 40 L140 100 Q140 110 130 110 L70 110 Q60 110 60 100 Z" stroke="#10b981" stroke-width="2" fill="rgba(16,185,129,0.06)"/>' +
            '<line x1="100" y1="30" x2="100" y2="110" stroke="#10b981" stroke-width="2"/>' +
            '<line x1="70" y1="50" x2="92" y2="50" stroke="#10b981" stroke-width="1.5" opacity="0.6"/>' +
            '<line x1="70" y1="60" x2="92" y2="60" stroke="#10b981" stroke-width="1.5" opacity="0.4"/>' +
            '<line x1="70" y1="70" x2="85" y2="70" stroke="#10b981" stroke-width="1.5" opacity="0.4"/>' +
            '<line x1="108" y1="50" x2="130" y2="50" stroke="#10b981" stroke-width="1.5" opacity="0.6"/>' +
            '<line x1="108" y1="60" x2="130" y2="60" stroke="#10b981" stroke-width="1.5" opacity="0.4"/>' +
            '<line x1="108" y1="70" x2="125" y2="70" stroke="#10b981" stroke-width="1.5" opacity="0.4"/>' +
            '<circle cx="100" cy="90" r="6" fill="#10b981"/>' +
            '<path d="M100 86 L100 94 M96 90 L104 90" stroke="#0a0a0c" stroke-width="2" stroke-linecap="round"/>' +
            '</svg>',

        // Unmatched: question mark cloud
        unmatched: '<svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
            '<ellipse cx="100" cy="125" rx="60" ry="5" fill="rgba(245,158,11,0.20)"/>' +
            '<path d="M55 75 Q55 60 70 60 Q70 45 90 45 Q100 35 115 40 Q135 40 135 60 Q150 60 150 75 Q150 95 130 95 L75 95 Q55 95 55 75 Z" stroke="#f59e0b" stroke-width="2" fill="rgba(245,158,11,0.06)"/>' +
            '<text x="100" y="82" font-size="32" font-weight="700" fill="#f59e0b" text-anchor="middle" font-family="system-ui">?</text>' +
            '<circle cx="40" cy="50" r="2" fill="#f59e0b" opacity="0.6"/>' +
            '<circle cx="160" cy="50" r="2" fill="#f59e0b" opacity="0.6"/>' +
            '<circle cx="50" cy="100" r="2" fill="#f59e0b" opacity="0.4"/>' +
            '<circle cx="155" cy="100" r="2" fill="#f59e0b" opacity="0.4"/>' +
            '</svg>',

        // Audit: clipboard with checkmarks
        audit: '<svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
            '<ellipse cx="100" cy="125" rx="60" ry="5" fill="rgba(107,114,128,0.20)"/>' +
            '<rect x="55" y="35" width="90" height="80" rx="6" stroke="#9ca3af" stroke-width="2" fill="rgba(255,255,255,0.04)"/>' +
            '<rect x="80" y="25" width="40" height="18" rx="3" fill="#9ca3af" opacity="0.20" stroke="#9ca3af" stroke-width="1.5"/>' +
            '<path d="M68 60 L74 66 L82 56" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
            '<line x1="92" y1="62" x2="135" y2="62" stroke="#9ca3af" stroke-width="1.5" opacity="0.6"/>' +
            '<path d="M68 80 L74 86 L82 76" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
            '<line x1="92" y1="82" x2="125" y2="82" stroke="#9ca3af" stroke-width="1.5" opacity="0.6"/>' +
            '<circle cx="74" cy="100" r="3" stroke="#9ca3af" stroke-width="1.5" fill="none"/>' +
            '<line x1="92" y1="100" x2="115" y2="100" stroke="#9ca3af" stroke-width="1.5" opacity="0.4"/>' +
            '</svg>',

        // Generic: dots/empty box
        generic: '<svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
            '<ellipse cx="100" cy="125" rx="60" ry="5" fill="rgba(184,150,88,0.20)"/>' +
            '<rect x="55" y="40" width="90" height="65" rx="8" stroke="#b89658" stroke-width="2" stroke-dasharray="6 4" fill="rgba(184,150,88,0.04)"/>' +
            '<circle cx="80" cy="72" r="3" fill="#b89658" opacity="0.6"/>' +
            '<circle cx="100" cy="72" r="3" fill="#b89658" opacity="0.8"/>' +
            '<circle cx="120" cy="72" r="3" fill="#b89658" opacity="0.6"/>' +
            '</svg>'
    };

    /* ─── Defaults por kind ─────────────────────────────────────── */
    var DEFAULTS = {
        vehicles:       { title: 'Sin vehículos aún', text: 'Cuando crees tu primer vehículo aparecerá aquí.' },
        contacts:       { title: 'Sin contactos aún', text: 'Los leads y clientes que llegan al sitio se mostrarán aquí.' },
        conversations:  { title: 'Sin conversaciones aún', text: 'Cuando un cliente abra el chat ALTOR, sus mensajes llegarán aquí.' },
        calendar:       { title: 'Sin citas programadas', text: 'Las citas que el cliente agende o que tú agendes manualmente aparecerán aquí.' },
        reports:        { title: 'Aún no hay datos suficientes', text: 'Necesitamos al menos 3 meses de actividad para mostrar reportes ejecutivos.' },
        search:         { title: 'Sin resultados', text: 'No encontramos coincidencias. Probá con otros términos o filtros.' },
        kb:             { title: 'Sin FAQs todavía', text: 'Sembrá las FAQs base o creá una manualmente para que ALTOR responda con tu info.' },
        unmatched:      { title: 'Nada por revisar', text: 'Cuando ALTOR no entienda algo, lo verás aquí para promoverlo a FAQ.' },
        audit:          { title: 'Sin actividad aún', text: 'Las acciones del equipo se registrarán automáticamente aquí.' },
        generic:        { title: 'Sin elementos', text: 'Cuando agregues el primero aparecerá aquí.' }
    };

    /**
     * Construye HTML completo de empty state.
     * @param {string} kind - vehicles/contacts/conversations/calendar/reports/search/kb/unmatched/audit/generic
     * @param {object} opts - { title, text, ctaLabel, ctaAction, ctaHref }
     */
    function html(kind, opts) {
        opts = opts || {};
        var def = DEFAULTS[kind] || DEFAULTS.generic;
        var illu = ILLUSTRATIONS[kind] || ILLUSTRATIONS.generic;
        var title = opts.title || def.title;
        var text = opts.text || def.text;
        var cta = '';
        if (opts.ctaLabel) {
            if (opts.ctaHref) {
                cta = '<a href="' + opts.ctaHref + '" class="btn btn-primary alt-empty-cta-btn">' + opts.ctaLabel + '</a>';
            } else if (opts.ctaAction) {
                cta = '<button class="btn btn-primary alt-empty-cta-btn" data-empty-action="' + opts.ctaAction + '">' + opts.ctaLabel + '</button>';
            } else {
                cta = '<button class="btn btn-primary alt-empty-cta-btn">' + opts.ctaLabel + '</button>';
            }
        }
        return '<div class="alt-empty-illustrated">' +
            '<div class="alt-empty-illustrated-svg">' + illu + '</div>' +
            '<h3 class="alt-empty-illustrated-title">' + escapeHtml(title) + '</h3>' +
            '<p class="alt-empty-illustrated-text">' + escapeHtml(text) + '</p>' +
            (cta ? '<div class="alt-empty-illustrated-cta">' + cta + '</div>' : '') +
            '</div>';
    }

    function render(container, kind, opts) {
        var el = (typeof container === 'string') ? document.querySelector(container) : container;
        if (!el) return;
        el.innerHTML = html(kind, opts);
    }

    function escapeHtml(s) {
        return String(s).replace(/[&<>"']/g, function (c) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
        });
    }

    window.AltorraEmptyStates = {
        html: html,
        render: render,
        kinds: Object.keys(DEFAULTS),
        illustrations: ILLUSTRATIONS
    };
})();
