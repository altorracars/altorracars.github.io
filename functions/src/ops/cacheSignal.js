'use strict';

const { onDocumentWritten } = require('firebase-functions/v2/firestore');
const admin = require('firebase-admin');

/**
 * cacheSignal — invalidación de caché del sitio público (E6 paso 0.1, ADR §188).
 *
 * El público invalida su caché local leyendo `system/meta.lastModified`
 * (js/core/cache-manager.js). El ÚNICO escritor era el admin clásico
 * (admin-sync.js: signalCacheInvalidation tras cada snapshot) — toda mutación
 * hecha desde el PORTAL nuevo o desde triggers server-side (vehicleAggregate
 * F25 escribiendo vehiculos.estado) dejaba la web pública stale hasta que
 * alguien abriera admin.html. Estos triggers cierran el hueco en la capa de
 * datos: cambió un agregado que el público renderiza → se señaliza, sin
 * importar QUIÉN lo cambió.
 *
 * Anti-ráfaga: los backfills (daily job, drift repair) tocan N docs seguidos;
 * system/meta es UN doc (límite sostenido ~1 write/s). Si la señal vigente
 * tiene <10s, no se re-escribe — el público igual verá el cambio (su check
 * compara contra la señal más reciente, no cuenta señales).
 */

const SIGNAL_MIN_INTERVAL_MS = 10 * 1000;

async function bumpPublicCache(db) {
  const ref = db.doc('system/meta');
  const snap = await ref.get();
  const last = snap.exists ? snap.data().lastModified : 0;
  if (typeof last === 'number' && Date.now() - last < SIGNAL_MIN_INTERVAL_MS) return false;
  await ref.set({ lastModified: Date.now() }, { merge: true });
  return true;
}

// retry:false deliberado — perder UNA señal es benigno (la siguiente escritura
// vuelve a señalizar y el clásico/cron también lo hacen); reintentar señales
// viejas solo añade writes al doc caliente.
function makeSignalTrigger(collection) {
  return onDocumentWritten(
    { document: collection + '/{docId}', region: 'us-central1', maxInstances: 2 },
    async () => {
      try {
        await bumpPublicCache(admin.firestore());
      } catch (err) {
        console.warn('[cacheSignal] señal no escrita (' + collection + '):', err.message);
      }
    }
  );
}

module.exports = {
  onVehiculoWrittenSignal: makeSignalTrigger('vehiculos'),
  onMarcaWrittenSignal: makeSignalTrigger('marcas'),
  onBannerWrittenSignal: makeSignalTrigger('banners'),
  onResenaWrittenSignal: makeSignalTrigger('resenas'),
  bumpPublicCache,
  SIGNAL_MIN_INTERVAL_MS,
};
