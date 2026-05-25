/**
 * ALTORRA CARS — Post-venta + NPS (MF4.8)
 *
 * When a vehicle is marked vendido and linked to a contact, schedule
 * 3 follow-ups via the existing AltorraFollowups system:
 *   +3 días: encuesta de satisfacción (1-5 estrellas)
 *   +30 días: NPS (0-10)
 *   +90 días: recordatorio mantenimiento
 *
 * Survey results stored in clientes/{uid}/postventa/{ventaId}.
 * Aggregated metrics surfaced in CRM dashboard.
 */
(function () {
    'use strict';
    var AP = window.AP;
    if (!AP) return;

    /**
     * Schedule postventa flow for a sold vehicle.
     * Called from admin when marking a vehicle as 'vendido'.
     */
    function schedulePostventa(saleData) {
        if (!saleData || !saleData.contactUid || !saleData.vehicleId) return;
        if (!window.AltorraFollowups) return;

        var nombre = saleData.clientName || 'Cliente';
        var vehic = saleData.vehicleTitle || 'tu vehículo';
        var saleId = 'sale_' + saleData.contactUid + '_' + saleData.vehicleId;

        // +3 days: satisfaction survey
        window.AltorraFollowups.schedule(
            'Enviar encuesta satisfacción a ' + nombre,
            new Date(Date.now() + 3 * 86400000),
            'Cliente compró ' + vehic + ' hace 3 días. Enviar encuesta 1-5 estrellas vía email/WhatsApp.',
            null, // any admin can pick up
            saleId
        );

        // +30 days: NPS
        window.AltorraFollowups.schedule(
            'Enviar NPS a ' + nombre,
            new Date(Date.now() + 30 * 86400000),
            'Survey NPS (0-10): "¿Recomendarías Altorra Cars a un amigo?". Cliente compró ' + vehic + '.',
            null,
            saleId
        );

        // +90 days: maintenance reminder
        window.AltorraFollowups.schedule(
            'Recordatorio mantenimiento ' + nombre,
            new Date(Date.now() + 90 * 86400000),
            'Recordatorio de mantenimiento del ' + vehic + '. Invitar a referir amigos.',
            null,
            saleId
        );

        // Mark sale record
        if (window.db) {
            window.db.collection('clientes').doc(saleData.contactUid).collection('postventa').doc(saleId).set({
                vehicleId: saleData.vehicleId,
                vehicleTitle: vehic,
                soldAt: new Date().toISOString(),
                satisfactionSurveySentAt: null,
                npsSurveySentAt: null,
                maintenanceReminderSentAt: null,
                npsScore: null,
                satisfactionScore: null,
                referrals: 0
            }, { merge: true });
        }
    }

    /**
     * Record a survey response.
     */
    function recordSurveyResponse(contactUid, saleId, type, score) {
        if (!window.db) return Promise.reject('no-db');
        var update = {};
        if (type === 'satisfaction') update.satisfactionScore = score;
        if (type === 'nps') update.npsScore = score;
        update[type + 'RespondedAt'] = new Date().toISOString();
        return window.db.collection('clientes').doc(contactUid).collection('postventa').doc(saleId)
            .set(update, { merge: true });
    }

    /**
     * Aggregate NPS metric across all postventa records.
     * Promoters (9-10) - Detractors (0-6) / Total * 100
     */
    function computeAggregateNPS() {
        // Best-effort — uses denormalized cache if available, else collectionGroup.
        if (!window.db) return Promise.resolve(null);
        // collectionGroup query (requires composite index in some setups).
        return window.db.collectionGroup('postventa').get().then(function (snap) {
            var promoters = 0, passives = 0, detractors = 0, total = 0;
            snap.docs.forEach(function (d) {
                var s = d.data().npsScore;
                if (typeof s !== 'number') return;
                total++;
                if (s >= 9) promoters++;
                else if (s >= 7) passives++;
                else detractors++;
            });
            if (!total) return { score: null, promoters: 0, passives: 0, detractors: 0, total: 0 };
            var score = Math.round(((promoters - detractors) / total) * 100);
            return { score: score, promoters: promoters, passives: passives, detractors: detractors, total: total };
        }).catch(function () { return null; });
    }

    AP.schedulePostventa = schedulePostventa;
    AP.computeAggregateNPS = computeAggregateNPS;

    window.AltorraPostventa = {
        schedule: schedulePostventa,
        recordResponse: recordSurveyResponse,
        computeNPS: computeAggregateNPS
    };
})();
