'use strict';

const { onDocumentWritten } = require('firebase-functions/v2/firestore');
const admin = require('firebase-admin');
const { dedupKeysFor, ensureDedupEntries, removeDedupEntries } = require('./contactGraph');

/**
 * onContactWritten — mantenimiento del índice dedup (F40e, ADR §185).
 *
 * El índice `dedup/{key}` → {contactId} es lo que permite que una EDICIÓN de
 * email/teléfono (F12) no divorcie al contacto de la ingestión: sin esto, la
 * próxima solicitud con el email nuevo nacería como contacto DUPLICADO.
 *
 *  - Calcula las claves deseadas del doc (email/phone normalizados) y las
 *    compara con el espejo `dedupKeys[]` del propio doc (diff barato, sin
 *    query). Crea las que faltan (create-if-absent — JAMÁS roba una entrada
 *    de otro contacto) y borra las que sobran (solo si son suyas).
 *  - Contacto suprimido / en gracia / fusionado → claves deseadas = [] (B.3:
 *    el índice lo EXCLUYE desde el minuto 0; un homónimo nuevo nace fresco).
 *  - Anti-bucle: solo re-escribe el doc si dedupKeys cambió (la re-invocación
 *    siguiente no-opea porque espejo == deseadas).
 */

const onContactWritten = onDocumentWritten(
  // §187 retry:true: el mantenimiento del índice es CONVERGENTE (espejo por
  // igualdad, create-if-absent, delete por query) — re-ejecutar es no-op.
  { document: 'contacts/{contactId}', region: 'us-central1', maxInstances: 10, retry: true },
  async (event) => {
    const after = event.data.after.exists ? event.data.after.data() : null;
    const contactId = event.params.contactId;
    const db = admin.firestore();

    // Borrado del doc (supresión final): limpiar lo que quede apuntándole.
    if (!after) {
      const stale = await db.collection('dedup').where('contactId', '==', contactId).limit(20).get();
      for (const d of stale.docs) await d.ref.delete();
      return;
    }

    const excluded = after._suppressed === true
      || after._mergedInto
      || after.suppressionStatus === 'pendiente_supresion';
    const desired = excluded ? [] : dedupKeysFor(after);
    const mirror = Array.isArray(after.dedupKeys) ? after.dedupKeys : [];

    const toAdd = desired.filter((k) => !mirror.includes(k));
    const toRemove = mirror.filter((k) => !desired.includes(k));
    if (!toAdd.length && !toRemove.length && Array.isArray(after.dedupKeys)) return; // espejo al día

    if (toRemove.length) await removeDedupEntries(db, contactId, toRemove);
    let mine = desired;
    if (toAdd.length) {
      const { taken } = await ensureDedupEntries(db, contactId, toAdd);
      // Clave de OTRO contacto (colisión real): el espejo NO la reclama —
      // la resolución es humana (Fusionar F12), nunca silenciosa.
      if (taken.length) {
        const takenKeys = taken.map((t) => t.key);
        mine = desired.filter((k) => !takenKeys.includes(k));
      }
    }
    // Anti-bucle: escribir el espejo SOLO si cambió de verdad (una clave
    // tomada por otro contacto dejaría mine == mirror en cada pasada).
    const same = Array.isArray(after.dedupKeys)
      && mine.length === mirror.length && mine.every((k) => mirror.includes(k));
    if (!same) await event.data.after.ref.update({ dedupKeys: mine });
  }
);

module.exports = { onContactWritten };
