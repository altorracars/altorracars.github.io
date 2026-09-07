'use strict';

const { onDocumentWritten } = require('firebase-functions/v2/firestore');
const admin = require('firebase-admin');

/**
 * userBlock — enforcement server-side del bloqueo de cuentas (E6 paso 0.2,
 * ADR §188 R-8 / lóbulo 41 D6-07).
 *
 * El bloqueo histórico era TEATRO client-side: flags en Firestore
 * (`usuarios.bloqueado` + `loginAttempts`) que solo el login del admin clásico
 * consultaba — la cuenta de Firebase Auth seguía VIVA y el portal nuevo ni
 * miraba los flags. Este trigger hace el flag real: `bloqueado` flip →
 * disable/enable de la cuenta Auth + revocación de refresh tokens al
 * deshabilitar (la sesión activa muere al expirar su ID token, ≤1h).
 *
 * Quién escribe `bloqueado` hoy: nadie programáticamente (consola del dueño);
 * la UI formal de Usuarios llega en la fase ④ del strangler — este trigger ya
 * la respalda. Idempotente (updateUser con el mismo valor = no-op) → retry:true.
 */

const onUsuarioBloqueadoSync = onDocumentWritten(
  { document: 'usuarios/{uid}', region: 'us-central1', maxInstances: 10, retry: true },
  async (event) => {
    const before = event.data.before.exists ? event.data.before.data() : null;
    const after = event.data.after.exists ? event.data.after.data() : null;
    if (!after) return; // borrado: deleteManagedUser ya elimina la cuenta Auth

    const was = !!(before && before.bloqueado);
    const is = !!after.bloqueado;
    if (was === is) return;

    const uid = event.params.uid;
    try {
      await admin.auth().updateUser(uid, { disabled: is });
      if (is) await admin.auth().revokeRefreshTokens(uid);
      console.log('[userBlock] cuenta Auth ' + (is ? 'DESHABILITADA' : 'rehabilitada') + ' para ' + uid);
    } catch (err) {
      // Docs de usuarios sin cuenta Auth (semillas/migraciones) no son error.
      if (err && err.code === 'auth/user-not-found') {
        console.warn('[userBlock] usuarios/' + uid + ' sin cuenta Auth — flag sin efecto');
        return;
      }
      throw err; // → retry con backoff
    }
  }
);

module.exports = { onUsuarioBloqueadoSync };
