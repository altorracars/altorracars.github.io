/**
 * AltorraSkeletons — Skeleton screens realistas mimic per section
 * ================================================================
 * Patrón Facebook/LinkedIn/Slack: en lugar de spinner genérico,
 * cada sección muestra un skeleton que imita la forma exacta del
 * contenido final (cards, tablas, cards de KPI, etc.).
 * Resultado: percepción de carga MÁS RÁPIDA aunque el tiempo real
 * sea el mismo (psicología perceptiva).
 *
 * API:
 *   AltorraSkeletons.html(kind, count) → string HTML
 *   AltorraSkeletons.render(container, kind, count)
 *   AltorraSkeletons.kinds → lista de kinds disponibles
 *
 * Kinds: vehicleCards, vehicleRows, contactRows, kpiCards,
 *   conversationItems, calendarMonth, reportsDashboard
 */
(function () {
    'use strict';
    if (window.AltorraSkeletons) return;

    function box(width, height, opts) {
        opts = opts || {};
        var styles = 'width:' + width + ';height:' + height + ';';
        if (opts.radius) styles += 'border-radius:' + opts.radius + ';';
        if (opts.mb) styles += 'margin-bottom:' + opts.mb + ';';
        if (opts.mt) styles += 'margin-top:' + opts.mt + ';';
        if (opts.mr) styles += 'margin-right:' + opts.mr + ';';
        if (opts.inline) styles += 'display:inline-block;';
        var cls = 'sk-box' + (opts.cls ? ' ' + opts.cls : '');
        return '<div class="' + cls + '" style="' + styles + '"></div>';
    }

    function vehicleCard() {
        return '<div class="sk-vehicle-card">' +
            box('100%', '160px', { radius: '12px 12px 0 0' }) +
            '<div class="sk-vehicle-card-body">' +
                box('70%', '14px', { mb: '8px' }) +
                box('40%', '11px', { mb: '12px' }) +
                box('30%', '18px', { mb: '14px' }) +
                '<div class="sk-vehicle-card-meta">' +
                    box('22%', '10px', { inline: true, mr: '8%' }) +
                    box('22%', '10px', { inline: true, mr: '8%' }) +
                    box('22%', '10px', { inline: true }) +
                '</div>' +
            '</div>' +
            '</div>';
    }

    function vehicleRow() {
        return '<div class="sk-row sk-vehicle-row">' +
            box('60px', '44px', { radius: '8px', mr: '14px' }) +
            '<div class="sk-row-body">' +
                box('44%', '12px', { mb: '6px' }) +
                box('30%', '10px') +
            '</div>' +
            box('80px', '22px', { radius: '999px' }) +
            '</div>';
    }

    function contactRow() {
        return '<div class="sk-row sk-contact-row">' +
            box('38px', '38px', { radius: '50%', mr: '14px' }) +
            '<div class="sk-row-body">' +
                box('40%', '12px', { mb: '6px' }) +
                box('60%', '10px') +
            '</div>' +
            '<div class="sk-row-meta">' +
                box('60px', '20px', { radius: '999px' }) +
            '</div>' +
            '</div>';
    }

    function kpiCard() {
        return '<div class="sk-kpi-card">' +
            box('48px', '48px', { radius: '14px', mb: '14px' }) +
            box('60%', '28px', { mb: '8px' }) +
            box('50%', '11px') +
            '</div>';
    }

    function conversationItem() {
        return '<div class="sk-conv-item">' +
            box('40px', '40px', { radius: '50%', mr: '12px' }) +
            '<div class="sk-conv-body">' +
                '<div class="sk-conv-row1">' +
                    box('40%', '12px', { inline: true }) +
                    box('40px', '10px', { inline: true }) +
                '</div>' +
                box('80%', '11px', { mt: '6px' }) +
            '</div>' +
            '</div>';
    }

    function calendarMonth() {
        var cells = '';
        for (var i = 0; i < 35; i++) {
            cells += box('100%', '70px', { radius: '8px' });
        }
        return '<div class="sk-calendar-month">' +
            '<div class="sk-cal-header">' +
                box('120px', '14px', { inline: true, mr: 'auto' }) +
                box('80px', '32px', { radius: '10px', inline: true }) +
            '</div>' +
            '<div class="sk-cal-grid">' + cells + '</div>' +
            '</div>';
    }

    function reportsDashboard() {
        var kpis = '';
        for (var i = 0; i < 4; i++) kpis += '<div class="sk-rep-kpi">' +
            box('40%', '11px', { mb: '8px' }) +
            box('70%', '24px', { mb: '6px' }) +
            box('50%', '10px') +
            '</div>';
        return '<div class="sk-reports-dashboard">' +
            '<div class="sk-rep-kpis">' + kpis + '</div>' +
            '<div class="sk-rep-card">' +
                box('30%', '14px', { mb: '14px' }) +
                box('100%', '180px', { radius: '12px' }) +
            '</div>' +
            '<div class="sk-rep-card">' +
                box('25%', '14px', { mb: '14px' }) +
                box('100%', '120px', { radius: '12px' }) +
            '</div>' +
            '</div>';
    }

    function html(kind, count) {
        count = (typeof count === 'number') ? count : 6;
        var content = '';
        switch (kind) {
            case 'vehicleCards':
                content = '<div class="sk-grid sk-grid-cards">';
                for (var i = 0; i < count; i++) content += vehicleCard();
                content += '</div>';
                break;
            case 'vehicleRows':
                content = '<div class="sk-rows">';
                for (var i = 0; i < count; i++) content += vehicleRow();
                content += '</div>';
                break;
            case 'contactRows':
                content = '<div class="sk-rows">';
                for (var i = 0; i < count; i++) content += contactRow();
                content += '</div>';
                break;
            case 'kpiCards':
                content = '<div class="sk-grid sk-grid-kpis">';
                for (var i = 0; i < count; i++) content += kpiCard();
                content += '</div>';
                break;
            case 'conversationItems':
                content = '<div class="sk-conv-list">';
                for (var i = 0; i < count; i++) content += conversationItem();
                content += '</div>';
                break;
            case 'calendarMonth':
                content = calendarMonth();
                break;
            case 'reportsDashboard':
                content = reportsDashboard();
                break;
            default:
                content = '<div class="sk-rows">';
                for (var i = 0; i < count; i++) content += contactRow();
                content += '</div>';
        }
        return '<div class="sk-wrap" data-skeleton="' + kind + '">' + content + '</div>';
    }

    function render(container, kind, count) {
        var el = (typeof container === 'string') ? document.querySelector(container) : container;
        if (!el) return;
        el.innerHTML = html(kind, count);
    }

    window.AltorraSkeletons = {
        html: html,
        render: render,
        kinds: ['vehicleCards', 'vehicleRows', 'contactRows', 'kpiCards',
                'conversationItems', 'calendarMonth', 'reportsDashboard']
    };
})();
