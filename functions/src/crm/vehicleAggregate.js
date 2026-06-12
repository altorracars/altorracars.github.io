'use strict';

const admin = require('firebase-admin');
const spec = require('../../shared/crm-spec');

/**
 * vehicleAggregate — F25-completo (E4, ADR §186)
 *
 * Estado del vehículo como AGREGADO de sus deals, NUNCA last-writer-wins:
 * el recálculo corre en UNA transacción que consulta TODOS los deals
 * open/won del vehículo (query DENTRO de la tx) y decide con la spec única:
 *   algún won → 'vendido' (terminal) · algún open 'apartado' → 'apartado'
 *   · si no → 'disponible'.
 *
 * Guardas (spec.shouldWriteVehicleState):
 *   - jamás "des-vende" (markAsSold legacy puede vender SIN deal CRM);
 *   - jamás degrada estados MANUALES ('reservado'/'borrador') a disponible.
 *
 * Bumpea _version → el optimistic-lock del form viejo (admin-vehicles)
 * detecta el cambio y no revierte en silencio (el hueco del F25-básico).
 *
 * Lo invocan: onDealUpdated (aristas apartado/won/lost/anulado y cambio de
 * vehículo) y el auto-repair de drift del crmDailyJob (F28). Requiere el
 * índice compuesto deals(vehicleId, status).
 */
async function recalcVehicleState(db, vehicleId, nowISO) {
  if (!vehicleId) return { changed: false, reason: 'sin_vehicleId' };
  const vehRef = db.collection('vehiculos').doc(String(vehicleId));
  return db.runTransaction(async (tx) => {
    const vehSnap = await tx.get(vehRef);
    if (!vehSnap.exists) return { changed: false, reason: 'vehiculo_no_existe' };
    const dealsSnap = await tx.get(
      db.collection('deals')
        .where('vehicleId', '==', vehicleId)
        .where('status', 'in', ['open', 'won'])
    );
    const target = spec.computeVehicleState(dealsSnap.docs.map((d) => d.data()));
    const current = vehSnap.data().estado || 'disponible';
    if (!spec.shouldWriteVehicleState(current, target)) {
      return { changed: false, from: current, to: target };
    }
    tx.update(vehRef, {
      estado: target,
      updatedAt: nowISO || new Date().toISOString(),
      _version: admin.firestore.FieldValue.increment(1),
    });
    return { changed: true, from: current, to: target };
  });
}

module.exports = { recalcVehicleState };
