'use strict';

const admin = require('firebase-admin');
const spec = require('../../shared/crm-spec');

/**
 * applyWonSideEffects — F10 (E4, ADR §186): efectos del deal GANADO.
 * Módulo propio (sin wrapper de trigger) para que lo compartan
 * onDealUpdated (arista won) y crmDailyJob (backfill de wons pre-E4)
 * y sea testeable contra el emulador.
 *
 *  (a) En transacción sobre el deal (idempotente: si ya hay `commissionSnapshots[]`
 *      O el `commissionSnapshot` singular legacy, es un retry → no-op): `wonAt` +
 *      checklist `postventa.{item}` en false + `commissionSnapshots: [entry]`
 *      ENRIQUECIDO (§9 restructura comercial, TODO-25): congela la TENENCIA del
 *      vehículo y computa `altorraRevenue` por método (SPREAD/%/FLAT/MANUAL) —
 *      F42 lee el ÚLTIMO. Las Rules bloquean el campo al cliente (server-only).
 *  (b) Activities-recordatorio del checklist con ID determinista
 *      `postventa_{dealId}_{item}` vía create-or-skip: un retry JAMÁS
 *      reabre una tarea que el asesor ya cerró (por eso no es set+merge).
 *
 * `wonAtISO` = updateTime del evento won (o el backfill del daily job).
 */
async function applyWonSideEffects(db, dealId, after, wonAtISO) {
  const dealRef = db.collection('deals').doc(dealId);
  await db.runTransaction(async (tx) => {
    const snap = await tx.get(dealRef);
    if (!snap.exists) return;
    const data = snap.data();
    if (data.status !== 'won') return; // evento tardío sobre un deal ya no-won
    // idempotente: el array NUEVO o el snapshot SINGULAR legacy = ya aplicado
    // (un deal pre-restructura conserva `commissionSnapshot` → NO se reprocesa).
    if ((Array.isArray(data.commissionSnapshots) && data.commissionSnapshots.length)
        || data.commissionSnapshot) return;

    // Lee la TENENCIA del vehículo DENTRO de la transacción (todas las lecturas
    // ANTES de cualquier escritura — invariante de runTransaction). Sin vehículo
    // o sin tenencia → defaults seguros (normalizeTenancy: EXTERNO/MANUAL/baseline
    // 0 → altorraRevenue 0 hasta que el CRM de vehículos capture la tenencia).
    // Cero regresión: los readers caen a deal.amount como hoy.
    let tenancy = null;
    if (data.vehicleId) {
      const vSnap = await tx.get(db.collection('vehiculos').doc(data.vehicleId));
      if (vSnap.exists) tenancy = vSnap.data().tenancy || null;
    }

    const wonAt = data.wonAt || wonAtISO;
    const postventa = {};
    for (const item of spec.POSTVENTA_CHECKLIST) {
      postventa[item.id] = (data.postventa || {})[item.id] === true;
    }
    // Snapshot ENRIQUECIDO append-only (§9): congela tenencia + computa
    // altorraRevenue al cierre. Los datos digitados al cerrar (monto MANUAL /
    // comisión del asesor / flujo de fondos) los pone el gate "Vender" del CRM
    // en el deal; aquí defaults defensivos (el builder nunca lanza).
    const entry = spec.buildCommissionSnapshotEntry({
      rev: 1,
      createdAt: wonAt,
      createdBy: data.ownerId || null,
      salePrice: data.amount,
      vehicleId: data.vehicleId || null,
      tenancy,
      manualAmount: data.altorraRevenueManual,
      advisorCommission: data.advisorCommission,
      fundsFlow: data.fundsFlow,
      isManualOverride: false,
      auditReason: null,
    });
    tx.update(dealRef, {
      wonAt,
      postventa,
      commissionSnapshots: [entry],
      updatedAt: wonAtISO,
      _version: admin.firestore.FieldValue.increment(1),
    });
  });

  // Re-leer el deal: si el asesor marcó un ítem ANTES de que corriéramos
  // (carrera checkbox vs trigger), su tarea nace YA cerrada — jamás una
  // tarea abierta para un ítem hecho (review E4 #5).
  const nowSnap = await dealRef.get();
  if (!nowSnap.exists || nowSnap.data().status !== 'won') return;
  const pvNow = nowSnap.data().postventa || {};

  const baseMs = Date.parse(wonAtISO);
  for (const item of spec.POSTVENTA_CHECKLIST) {
    const ref = db.collection('activities').doc('postventa_' + dealId + '_' + item.id);
    try {
      await ref.create({
        type: 'tarea', kind: 'system',
        status: pvNow[item.id] === true ? 'closed' : 'open',
        direction: 'outbound',
        subject: '🏁 Post-venta: ' + item.label,
        body: 'Checklist del negocio ganado'
          + (after.name ? ' — ' + after.name : '')
          + '. Márcalo en Pipeline → Post-venta al completarlo.',
        dueAt: new Date(baseMs + item.dueDays * 86400000).toISOString(),
        relatedTo: { type: 'deal', id: dealId, name: after.name || '' },
        leadId: after.leadId || null,
        ownerId: after.ownerId || null,
        postventaItem: item.id,
        createdAt: wonAtISO, _version: 1,
      });
    } catch (e) {
      const isDup = e && (e.code === 6 || e.code === 'already-exists'
        || /already.?exists/i.test(String(e.message || '')));
      if (!isDup) throw e; // duplicado = retry benigno; otro error sí relanza
    }
  }
}

module.exports = { applyWonSideEffects };
