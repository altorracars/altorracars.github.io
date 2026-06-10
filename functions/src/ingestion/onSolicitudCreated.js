'use strict';

const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const { defineSecret } = require('firebase-functions/params');
const admin = require('firebase-admin');
const { normalizeSolicitud } = require('./normalize');
const { ingestLeadTransaction } = require('./ingestLead');

const POLICY_VERSION = 'v1'; // versión vigente de la política de tratamiento
const telegramBotToken = defineSecret('TELEGRAM_BOT_TOKEN');

/**
 * Ingesta cada `solicitudes/{id}` nueva al modelo canónico:
 *  - upsert de `contacts` por dedupKey SIN pisar campos first-seen/volátiles,
 *  - crea `leads` + `activities` enlazados,
 *  - idempotente (flag `_ingestedAt`, marcado DENTRO de la transacción),
 *  - todo atómico (transacción) → cero duplicados ante reintentos,
 *  - cualquier error → `failedIngestions` (dead-letter) y se relanza para retry.
 * maxInstances acota el gasto (anti factura runaway — Consejo Externo R2).
 */
exports.onSolicitudCreated = onDocumentCreated(
  { document: 'solicitudes/{solicitudId}', region: 'us-central1', maxInstances: 10, secrets: [telegramBotToken] },
  async (event) => {
    const snap = event.data;
    if (!snap) return;
    const sol = snap.data();
    const solId = event.params.solicitudId;
    const db = admin.firestore();

    // Idempotencia: si ya se ingirió, salir.
    if (sol._ingestedAt) return;

    try {
      const canonical = normalizeSolicitud(sol, solId, POLICY_VERSION);
      // Alta atómica por la ruta COMPARTIDA (ingestLead.js, F36 §178) — misma
      // transacción de siempre, ahora reutilizada por lead_intake.
      const result = await ingestLeadTransaction(db, canonical, snap.ref);

      // P2 §179 — alerta al asesor ASIGNADO automáticamente (rotación F37b).
      // Best-effort: jamás falla la ingestión por una alerta. _migration no
      // alerta (one-shots no son leads frescos).
      if (result.ownerId && sol._migration !== true) {
        try {
          const notify = require('../ops/notify');
          await notify.sendTelegram(db, telegramBotToken.value(), result.ownerId,
            '🆕 *Lead nuevo asignado a ti*\n' + (canonical.lead.fullName || 'Sin nombre')
            + (canonical.lead.phone ? '\n📱 ' + canonical.lead.phone : '')
            + '\nFuente: ' + (canonical.lead.source || 'web'),
            { url: 'https://altorracars.github.io/admin-app/dist/#/', urlLabel: 'Abrir Bandeja' });
        } catch (e) { console.warn('[onSolicitudCreated] alerta no enviada:', e.message); }
      }
    } catch (err) {
      // Dead-letter: cero pérdida de información (Consejo Externo R4).
      await db.collection('failedIngestions').add({
        sourceCollection: 'solicitudes', sourceId: solId,
        error: String(err && err.message || err),
        payload: sol, createdAt: new Date().toISOString(), retries: 0, resolved: false,
      });
      throw err; // relanza → Cloud Functions reintenta con backoff
    }
  }
);
