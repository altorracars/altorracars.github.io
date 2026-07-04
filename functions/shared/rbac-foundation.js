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

// dataScope válidos. (Desde P0-SEC-1 29/06 el scope SÍ se enforce en rules+queries —
// el comentario histórico "no se enforce" quedó obsoleto; OLA-0.2 alineó el default.)
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

    // dataScope — OLA-0.2 (plan maestro 03/07): default 'own' = espejo del default seguro
    // de las rules (`data.get('dataScope','own')`); el DUEÑO siembra 'all' (su scope real).
    // El seed original 'all'-para-todos se escribió cuando el scope NO se enforceaba (④a);
    // tras P0-SEC-1 sembrarlo invertía el default y regalaba visibilidad total.
    if (d.dataScope === undefined) {
        updates.dataScope = isOwner ? 'all' : 'own';
    } else if (!DATA_SCOPES.includes(d.dataScope)) {
        anomaly = 'dataScope:' + d.dataScope;
    }

    return { updates, anomaly };
}

// §193.4 ④a — INVARIANTE DE GUARDIÁN (no borrar; pase adversarial §219):
// `nivel` NO es owner-gate ni autoridad enforced en ④a. isOwnerData (functions/index.js
// §213) decide por permissions:['*'], NUNCA por nivel; por eso sembrar nivel aquí es
// inocuo hoy. ⚠️ ④b, ANTES de meter `nivel` en enforcement, DEBE añadir un floor
// server-side (un actor solo asigna/crea roles de nivel < el suyo, y acotar role.nivel
// en rules) — si no, este seed se vuelve escalada real (concern adversarial §219).
/**
 * §193.4 ④a PASO 5 — al asignar/cambiar el rol de un usuario, sembrar `nivel`
 * (autoridad per-USUARIO) con el default del rol SOLO si el usuario aún no tiene
 * uno. NUNCA pisa un nivel ya seteado — a diferencia de `cargo`, que es espejo
 * read-only del rol y SÍ se resincroniza en cada cambio (onUserRoleAssigned, §114).
 * Así un resync nunca degrada una autoridad asignada a mano (HALLAZGO 2 del blueprint ④a).
 *
 * Convención "ausente" idéntica a computeRbacFoundationUpdate: solo `=== undefined`
 * dispara la siembra; `null`/`0` son valores legítimos ya seteados → se respetan.
 * §215.7 — en ④a NO se normaliza un `role.nivel` no numérico (p.ej. string '60'):
 * se cae al DEFAULT_NIVEL. La coerción a int es responsabilidad de ④b (al comparar autoridad).
 *
 * @param {object} userData  doc.data() del usuario tras el cambio (after)
 * @param {object} roleData  doc.data() del rol recién asignado
 * @returns {{nivel?: number}} parche parcial; `{}` = no tocar nivel (idempotente)
 */
function computeNivelSeedOnAssign(userData, roleData) {
    const u = userData || {};
    if (u.nivel !== undefined) return {}; // ya tiene autoridad → jamás pisar
    const roleNivel = roleData && roleData.nivel;
    return { nivel: Number.isFinite(roleNivel) ? roleNivel : DEFAULT_NIVEL };
}

// §213 + §2.6 — detección CANÓNICA del dueño/super-admin (las 3 formas: legacy
// `rol` + `roleId` del system role + wildcard '*'). Antes vivía SOLO en
// functions/index.js mientras contactAdmin y anularConversion llevaban copias
// PARCIALES (2 formas cada una, distintas entre sí) — un dueño legacy o
// canónico podía pasar en una capa y fallar en otra. Un hecho = un dueño.
function isOwnerData(d) {
    return !!d && (
        d.rol === 'super_admin'
        || d.roleId === 'system_super_admin'
        || (Array.isArray(d.permissions) && d.permissions.includes('*'))
    );
}

module.exports = { computeRbacFoundationUpdate, computeNivelSeedOnAssign, isOwnerData, DATA_SCOPES, CEO_NIVEL, DEFAULT_NIVEL };
