'use strict';

const { onDocumentUpdated } = require('firebase-functions/v2/firestore');
const { defineSecret } = require('firebase-functions/params');
const admin = require('firebase-admin');
const { recalcVehicleState } = require('./vehicleAggregate');
const { applyWonSideEffects } = require('./dealWon');

const telegramBotToken = defineSecret('TELEGRAM_BOT_TOKEN');

/**
 * onDealUpdated — LA ÚNICA FUENTE DE SINCRONIZACIÓN deal→lead/contact/vehículo
 * (F2/F3/F10/F25-completo/F29, ADR §181 + §186). Mata la divergencia
 * Bandeja↔Pipeline:
 *
 *  1. Proyecta la etapa al lead congelado (`convertedTo.stage/outcome`) →
 *     el chip de la Bandeja SIN N+1 reads. Idempotente y a prueba de retries
 *     DESORDENADOS: descarta eventos con updateTime <= al ya aplicado (B.4).
 *  2. Activity automática `kind:'system'` con ID DETERMINISTA (no duplica).
 *  3. Lifecycle del contacto CALCULADO (F3, máximo histórico — jamás
 *     regresión automática): convertir→opportunity · ganar→customer.
 *  4. F25-completo (E4): estado del vehículo como AGREGADO transaccional
 *     (vehicleAggregate.js) en las aristas que lo afectan: entrar/salir de
 *     'apartado', won/lost/anulado, o cambio de vehículo (recalcula ambos).
 *  5. F10 (E4): al GANAR → checklist post-venta + snapshot de comisión
 *     (applyWonSideEffects, idempotente).
 *  6. F29: fallo → doc determinista en `crm_errors` + alerta crítica (una
 *     vez, no por retry) y relanza para el retry de Functions.
 */
exports.onDealUpdated = onDocumentUpdated(
  // retry:true (review E4 #0): en v2/Eventarc el retry está APAGADO por defecto
  // — sin esto, el `throw` final descarta el evento y los pasos 1-3 (chip del
  // lead, activity, lifecycle) quedan desincronizados para siempre. Toda la
  // idempotencia (B.4, IDs deterministas, no-op por commissionSnapshot) existe
  // precisamente para que el retry sea seguro.
  { document: 'deals/{dealId}', region: 'us-central1', maxInstances: 10, retry: true, secrets: [telegramBotToken] },
  async (event) => {
    const before = event.data.before.data();
    const after = event.data.after.data();
    const dealId = event.params.dealId;
    const db = admin.firestore();

    const stageChanged = before.stageId !== after.stageId || before.status !== after.status;
    const vehicleChanged = before.vehicleId !== after.vehicleId;
    if (!stageChanged && !vehicleChanged) return;
    // Escrituras de one-shots: proyecciones internas SÍ corren (doctrina F34),
    // este trigger ES proyección interna → sin guard _migration.

    const updateTime = event.data.after.updateTime.toDate().toISOString();
    const tsMillis = event.data.after.updateTime.toMillis();

    try {
      if (stageChanged) {
        // ── 1. Proyección al lead (chip de la Bandeja) ──
        if (after.leadId) {
          const leadRef = db.collection('leads').doc(after.leadId);
          await db.runTransaction(async (tx) => {
            const leadSnap = await tx.get(leadRef);
            if (!leadSnap.exists) return;
            const ct = leadSnap.data().convertedTo || {};
            // B.4: menor O IGUAL = evento viejo o retry del mismo write → descartar.
            if (ct.sourceUpdatedAt && ct.sourceUpdatedAt >= updateTime) return;
            tx.update(leadRef, {
              'convertedTo.stage': after.stageId,
              'convertedTo.stageName': after.stageName || after.stageId,
              'convertedTo.outcome': after.status === 'won' ? 'vendido'
                : after.status === 'lost' ? 'perdido' : 'open',
              'convertedTo.lostReason': after.lostReason || null,
              'convertedTo.sourceUpdatedAt': updateTime,
              lastActivityAt: updateTime,
              updatedAt: updateTime,
              _version: admin.firestore.FieldValue.increment(1),
            });
          });
        }

        // ── 2. Activity de sistema (ID determinista → retries no duplican) ──
        await db.collection('activities').doc('stage_' + dealId + '_' + tsMillis).set({
          type: 'stage_change', kind: 'system',
          subject: 'Etapa → ' + (after.stageName || after.stageId),
          body: after.regressReason ? 'Retroceso: ' + after.regressReason
            : (after.lostReason ? 'Razón: ' + after.lostReason : ''),
          status: 'closed', direction: 'outbound',
          relatedTo: { type: 'deal', id: dealId, name: after.name || '' },
          leadId: after.leadId || null,
          ownerId: after.ownerId || null,
          createdAt: updateTime, _version: 1,
        });

        // ── 3. Lifecycle del contacto (máximo histórico, F3) ──
        if (after.contactId) {
          const RANK = { subscriber: 1, registered: 1, lead: 1, opportunity: 2, customer: 3 };
          const contactRef = db.collection('contacts').doc(after.contactId);
          await db.runTransaction(async (tx) => {
            const cSnap = await tx.get(contactRef);
            if (!cSnap.exists) return;
            const current = cSnap.data().lifecycleStage || 'lead';
            const target = after.status === 'won' ? 'customer' : 'opportunity';
            if ((RANK[target] || 0) > (RANK[current] || 0)) {
              tx.update(contactRef, {
                lifecycleStage: target, updatedAt: updateTime,
                _version: admin.firestore.FieldValue.increment(1),
              });
            }
          });
        }
      }

      // ── 4. F25-completo: agregado del vehículo (solo aristas relevantes) ──
      const statusChanged = before.status !== after.status;
      const touchesApartado = before.stageId === 'apartado' || after.stageId === 'apartado';
      if (vehicleChanged && before.vehicleId) {
        await recalcVehicleState(db, before.vehicleId, updateTime);
      }
      if (after.vehicleId && (vehicleChanged || statusChanged || touchesApartado)) {
        await recalcVehicleState(db, after.vehicleId, updateTime);
      }

      // ── 5. F10: efectos del GANADO (checklist + snapshot de comisión) ──
      if (after.status === 'won' && before.status !== 'won') {
        await applyWonSideEffects(db, dealId, after, updateTime);
      }
    } catch (err) {
      // ── 6. F29: registrar UNA vez + alertar + relanzar para retry ──
      const errRef = db.collection('crm_errors').doc('onDealUpdated_' + dealId + '_' + tsMillis);
      const seen = await errRef.get();
      if (!seen.exists) {
        await errRef.set({
          trigger: 'onDealUpdated', dealId,
          error: String((err && err.message) || err),
          stage: after.stageId || null,
          createdAt: new Date().toISOString(), resolved: false,
        });
        try {
          const cfg = await db.collection('config').doc('crmIntake').get();
          const alertUid = cfg.exists ? cfg.data().alertUid : null;
          if (alertUid) {
            const notify = require('../ops/notify');
            await notify.criticalAlert(db, telegramBotToken.value(), {
              targetUid: alertUid,
              text: '🛑 *Error de sincronización del Pipeline*\nDeal ' + dealId + ': ' + String((err && err.message) || err).slice(0, 180),
              type: 'trigger_error',
              meta: { dealId },
            });
          }
        } catch (e2) { console.warn('[onDealUpdated] alerta de error no enviada:', e2.message); }
      }
      throw err;
    }
  }
);

