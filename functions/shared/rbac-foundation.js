'use strict';

/**
 * rbac-foundation.js — lógica PURA del backfill de fundación RBAC departamental
 * (§193.4 ④a PASO 2, ADR §215). ⟦OPUS-4.8 · rev-Fable⟧
 *
 * Sin Firebase → testeable en vitest (node env, sin emulador). UN solo dueño
 * de la decisión de campos, consumido por:
 *   - el callable `backfillNivelesRBAC` (functions/index.js, vía 1-clic del dueño)
 *   - el script standalone `functions/backfill-niveles.mjs` (fallback ADC, L-43)
 * Así la semántica no driftea entre ambos caminos.
 *
 * El owner-guard `isOwnerData` NO vive aquí: se pasa como argumento `isOwner`
 * para no duplicar la fuente canónica (functions/index.js:710, §213).
 */

// dataScope válidos. En ④a el campo se ESCRIBE pero NO se enforce (eso es ④b).
const DATA_SCOPES = ['all', 'dept', 'own'];

const CEO_NIVEL = 100;     // dueño — autoridad máxima INAMOVIBLE (§193.4)
const DEFAULT_NIVEL = 10;  // default inicial del resto

/**
 * Calcula el parche IDEMPOTENTE y NO destructivo para un doc `usuarios/{uid}`.
 * Reglas:
 *   - `nivel` (autoridad): dueño ⇒ 100 (se setea o CORRIGE; INAMOVIBLE).
 *     No-dueño ⇒ 10 SOLO si falta (nunca degrada una autoridad asignada a mano).
 *   - `departmentId`/`departmentName`/`dataScope`: default SOLO si AUSENTE
 *     (`=== undefined`). `null`/`''`/`0` son valores legítimos ya seteados → se respetan.
 *   - `dataScope` con valor fuera del enum: NO se pisa (regla "nunca clobber"),
 *     se reporta como `anomaly` para revisión manual.
 *
 * @param {object} data    doc.data() del usuario (puede ser null/undefined)
 * @param {boolean} isOwner resultado de isOwnerData(data) (owner-guard §213)
 * @returns {{updates: object, anomaly: string|null}} `updates` vacío = nada que escribir
 */
function computeRbacFoundationUpdate(data, isOwner) {
    const d = data || {};
    const updates = {};
    let anomaly = null;

    // nivel
    if (isOwner) {
        if (d.nivel !== CEO_NIVEL) updates.nivel = CEO_NIVEL;
    } else if (d.nivel === undefined) {
        updates.nivel = DEFAULT_NIVEL;
    }

    // departmentId / departmentName (1 user → 1 depto; vive en usuarios, no en el rol)
    if (d.departmentId === undefined) updates.departmentId = null;
    if (d.departmentName === undefined) updates.departmentName = '';

    // dataScope
    if (d.dataScope === undefined) {
        updates.dataScope = 'all';
    } else if (!DATA_SCOPES.includes(d.dataScope)) {
        anomaly = 'dataScope:' + d.dataScope;
    }

    return { updates, anomaly };
}

module.exports = { computeRbacFoundationUpdate, DATA_SCOPES, CEO_NIVEL, DEFAULT_NIVEL };
