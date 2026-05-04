/**
 * ALTORRA CARS — Quote generator with PDF (MF4.6)
 *
 * Generates a financing quote PDF directly in the browser using
 * window.print() with a styled HTML page (no library needed).
 * Saves the quote to clientes/{uid}/cotizaciones/{cotId}.
 *
 * Triggered from CRM 360° detail panel via "Generar cotización" button.
 */
(function () {
    'use strict';
    var AP = window.AP;
    if (!AP) return;
    var $ = AP.$;

    function escTxt(s) { var d = document.createElement('div'); d.textContent = s == null ? '' : s; return d.innerHTML; }

    function fmtCOP(n) {
        if (n == null || isNaN(n)) return '$0';
        try {
            return new Intl.NumberFormat('es-CO', {
                style: 'currency', currency: 'COP',
                minimumFractionDigits: 0, maximumFractionDigits: 0
            }).format(n);
        } catch (e) { return '$' + Number(n).toLocaleString('es-CO'); }
    }

    function ensureModal() {
        if (document.getElementById('quoteModal')) return;
        var modal = document.createElement('div');
        modal.id = 'quoteModal';
        modal.className = 'modal-overlay';
        modal.innerHTML =
            '<div class="modal" style="max-width:520px;">' +
                '<div class="modal-header"><h2>Generar cotización</h2><button class="modal-close" data-action="close-quote">&times;</button></div>' +
                '<div class="modal-body">' +
                    '<div class="form-row"><div class="form-group"><label class="form-label">Cliente</label><input type="text" id="qClient" class="form-input"></div></div>' +
                    '<div class="form-row"><div class="form-group"><label class="form-label">Vehículo</label><input type="text" id="qVehicle" class="form-input"></div></div>' +
                    '<div class="form-row"><div class="form-group"><label class="form-label">Precio base</label><input type="number" id="qPrice" class="form-input"></div>' +
                    '<div class="form-group"><label class="form-label">Descuento</label><input type="number" id="qDiscount" class="form-input" value="0"></div></div>' +
                    '<div class="form-row"><div class="form-group"><label class="form-label">Cuota inicial</label><input type="number" id="qDownpay" class="form-input"></div>' +
                    '<div class="form-group"><label class="form-label">Plazo (meses)</label><input type="number" id="qTerm" class="form-input" value="60"></div></div>' +
                    '<div class="form-row"><div class="form-group"><label class="form-label">Tasa (%)</label><input type="number" step="0.1" id="qRate" class="form-input" value="14.5"></div>' +
                    '<div class="form-group"><label class="form-label">Vigencia (días)</label><input type="number" id="qValidity" class="form-input" value="15"></div></div>' +
                    '<div id="qPreview" class="quote-preview"></div>' +
                '</div>' +
                '<div class="modal-footer">' +
                    '<button class="btn btn-ghost" data-action="close-quote">Cancelar</button>' +
                    '<button class="btn btn-primary" data-action="generate-quote">Generar PDF</button>' +
                '</div>' +
            '</div>';
        document.body.appendChild(modal);
    }

    function calculate() {
        var price = parseFloat($('qPrice').value) || 0;
        var discount = parseFloat($('qDiscount').value) || 0;
        var downpay = parseFloat($('qDownpay').value) || 0;
        var term = parseInt($('qTerm').value, 10) || 60;
        var rate = parseFloat($('qRate').value) || 14.5;

        var financed = Math.max(0, price - discount - downpay);
        var monthlyRate = (rate / 100) / 12;
        var monthlyPmt = monthlyRate > 0
            ? financed * (monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1)
            : (term > 0 ? financed / term : 0);
        var totalPaid = monthlyPmt * term + downpay;
        var totalInterest = totalPaid - (price - discount);

        return {
            price: price, discount: discount, downpay: downpay,
            term: term, rate: rate, financed: financed,
            monthlyPmt: monthlyPmt, totalPaid: totalPaid, totalInterest: totalInterest
        };
    }

    function updatePreview() {
        var c = calculate();
        var p = document.getElementById('qPreview');
        if (!p) return;
        p.innerHTML =
            '<div class="quote-preview-row"><span>Monto a financiar</span><strong>' + fmtCOP(c.financed) + '</strong></div>' +
            '<div class="quote-preview-row"><span>Cuota mensual</span><strong style="color:var(--admin-gold);">' + fmtCOP(c.monthlyPmt) + '</strong></div>' +
            '<div class="quote-preview-row"><span>Total a pagar</span><strong>' + fmtCOP(c.totalPaid) + '</strong></div>' +
            '<div class="quote-preview-row"><span>Intereses</span><strong>' + fmtCOP(c.totalInterest) + '</strong></div>';
    }

    function openQuote(contact) {
        ensureModal();
        var modal = document.getElementById('quoteModal');
        modal.classList.add('active');
        // Pre-fill from contact
        $('qClient').value = contact ? (contact.nombre || '') : '';
        // Try to find latest financiación price/cuota inicial from comms
        if (contact && contact.comms) {
            var fin = contact.comms.find(function (s) { return s.tipo === 'financiacion' && s.datosExtra; });
            if (fin) {
                $('qVehicle').value = fin.vehiculo || '';
                $('qPrice').value = (fin.datosExtra.precioVehiculo || '').toString().replace(/[^0-9]/g, '') || '';
                $('qDownpay').value = (fin.datosExtra.cuotaInicial || '').toString().replace(/[^0-9]/g, '') || '';
            }
        }
        // Wire input listeners
        ['qPrice', 'qDiscount', 'qDownpay', 'qTerm', 'qRate'].forEach(function (id) {
            var el = $(id);
            if (el && !el._wired) {
                el._wired = true;
                el.addEventListener('input', updatePreview);
            }
        });
        updatePreview();
    }

    function generatePDF() {
        var c = calculate();
        var client = $('qClient').value;
        var vehicle = $('qVehicle').value;
        var validity = parseInt($('qValidity').value, 10) || 15;
        var validUntil = new Date(Date.now() + validity * 86400000);
        var date = new Date();

        // Open a print-styled window
        var w = window.open('', '_blank', 'width=820,height=1100');
        if (!w) {
            if (AP.toast) AP.toast('Permite popups para generar el PDF', 'error');
            return;
        }
        w.document.write('<!doctype html><html><head><title>Cotización Altorra</title>' +
            '<style>' +
            'body{font-family:-apple-system,system-ui,sans-serif;color:#1a1a1a;padding:48px;max-width:680px;margin:0 auto;}' +
            'h1{color:#b89658;margin:0 0 4px;font-size:1.8rem;letter-spacing:0.04em;}' +
            'h2{font-size:1rem;text-transform:uppercase;letter-spacing:0.08em;color:#888;margin:24px 0 8px;border-bottom:1px solid #eee;padding-bottom:6px;}' +
            'table{width:100%;border-collapse:collapse;margin-bottom:14px;}' +
            'td{padding:8px 0;}' +
            'td:first-child{color:#666;}' +
            'td:last-child{text-align:right;font-weight:600;}' +
            '.highlight{background:linear-gradient(135deg,#fff7e0,#fdebc4);padding:14px;border-radius:8px;margin:18px 0;text-align:center;}' +
            '.highlight strong{font-size:1.5rem;color:#b89658;}' +
            '.foot{margin-top:32px;font-size:0.82rem;color:#999;border-top:1px solid #eee;padding-top:14px;}' +
            '@media print{body{padding:24px;}}' +
            '</style></head><body>' +
            '<h1>ALTORRA CARS</h1>' +
            '<div style="color:#888;font-size:0.86rem;">Cotización de Financiación · ' + date.toLocaleDateString('es-CO') + '</div>' +
            '<h2>Cliente</h2>' +
            '<div>' + escTxt(client || '—') + '</div>' +
            '<h2>Vehículo</h2>' +
            '<div>' + escTxt(vehicle || '—') + '</div>' +
            '<h2>Detalle financiero</h2>' +
            '<table>' +
                '<tr><td>Precio base</td><td>' + fmtCOP(c.price) + '</td></tr>' +
                (c.discount ? '<tr><td>Descuento</td><td style="color:#10b981;">−' + fmtCOP(c.discount) + '</td></tr>' : '') +
                '<tr><td>Cuota inicial</td><td>' + fmtCOP(c.downpay) + '</td></tr>' +
                '<tr><td>Monto a financiar</td><td>' + fmtCOP(c.financed) + '</td></tr>' +
                '<tr><td>Plazo</td><td>' + c.term + ' meses</td></tr>' +
                '<tr><td>Tasa anual</td><td>' + c.rate + '%</td></tr>' +
            '</table>' +
            '<div class="highlight">Cuota mensual aproximada<br><strong>' + fmtCOP(c.monthlyPmt) + '</strong></div>' +
            '<table>' +
                '<tr><td>Total a pagar</td><td>' + fmtCOP(c.totalPaid) + '</td></tr>' +
                '<tr><td>Intereses</td><td>' + fmtCOP(c.totalInterest) + '</td></tr>' +
            '</table>' +
            '<div class="foot">Cotización válida hasta ' + validUntil.toLocaleDateString('es-CO') + '. ' +
            'Esta cotización es preliminar y sujeta a aprobación crediticia. ' +
            'Las tasas y condiciones finales pueden variar según evaluación crediticia. ' +
            'Altorra Company SAS · Cartagena, Colombia · WhatsApp +57 323 5016747</div>' +
            '</body></html>');
        w.document.close();
        setTimeout(function () { w.print(); }, 600);

        // Save quote record (optional, best-effort)
        if (window._crmDetailContact && window._crmDetailContact.uid && window.db) {
            window.db.collection('clientes').doc(window._crmDetailContact.uid).collection('cotizaciones').add({
                client: client, vehicle: vehicle,
                price: c.price, discount: c.discount, downpay: c.downpay,
                term: c.term, rate: c.rate,
                monthlyPmt: c.monthlyPmt, totalPaid: c.totalPaid,
                createdAt: new Date().toISOString(),
                createdBy: window.auth.currentUser.email,
                validUntil: validUntil.toISOString(),
                status: 'enviada'
            }).catch(function () {});
        }

        if (AP.toast) AP.toast('Cotización generada — usa Imprimir → Guardar como PDF');
    }

    document.addEventListener('click', function (e) {
        var openBtn = e.target.closest('[data-action="generate-quote-open"]');
        if (openBtn) {
            openQuote(window._crmDetailContact);
            return;
        }
        var close = e.target.closest('[data-action="close-quote"]');
        if (close) document.getElementById('quoteModal').classList.remove('active');
        var gen = e.target.closest('[data-action="generate-quote"]');
        if (gen) generatePDF();
    });

    window.AltorraQuote = { open: openQuote, generate: generatePDF };
})();
