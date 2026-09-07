/**
 * Altorra Cars — Backfill de campos RBAC departamental (§193.4 ④a PASO 2, ADR §215).
 * ⟦OPUS-4.8 · rev-Fable⟧
 *
 * ⚠️ VÍA FALLBACK. El camino CANÓNICO es el callable `backfillNivelesRBAC`
 * (botón "Backfill niveles" en sec-roles del admin clásico) — corre con la SA
 * de Functions, sin ADC. Este script standalone solo sirve si se prefiere ADC,
 * y REQUIERE re-autenticar ADC contra altorra-cars (la de esta máquina está
 * ligada a bersaglio → PERMISSION_DENIED; ver L-43):
 *     gcloud auth application-default login
 *     gcloud auth application-default set-quota-project altorra-cars
 *
 * Siembra en cada `usuarios/{uid}` los 4 campos de la fundación ④a SIN tocar
 * lo existente (nivel/departmentId/departmentName/dataScope). La DECISIÓN de
 * campos es idéntica a la del callable: ambos usan shared/rbac-foundation.js
 * (un solo dueño de la semántica → cero drift). Dueño (isOwnerData, §213) ⇒
 * nivel 100 INAMOVIBLE; resto ⇒ 10 solo si falta. Idempotente y no destructivo.
 *
 * Aserción final (invariante §193.4): todo doc de dueño → nivel === 100.
 *
 * USO (L-23: autentica por ADC, no por `firebase login`):
 *   node functions/backfill-niveles.mjs            → PREFLIGHT (solo lectura: plan)
 *   node functions/backfill-niveles.mjs --aplicar  → escribe y verifica cada write
 */
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import rbacFoundation from './shared/rbac-foundation.js';

const { computeRbacFoundationUpdate } = rbacFoundation;
const APLICAR = process.argv.includes('--aplicar');

// Guardia anti-destino-equivocado: si alguna var de emulador quedó en la shell
// (los seeds setean `$env:FIRESTORE_EMULATOR_HOST`, y en PowerShell persiste TODA
// la sesión), el Admin SDK hablaría con el EMULADOR creyendo que es prod. Abortamos.
const emuVars = ['FIRESTORE_EMULATOR_HOST', 'FIREBASE_AUTH_EMULATOR_HOST']
    .filter((v) => process.env[v]);
if (emuVars.length) {
    console.error(`\n⛔ Hay variables de EMULADOR activas (${emuVars.join(', ')}). Este script opera sobre PRODUCCIÓN.\n   Abre una shell limpia (sin esas vars) y vuelve a intentar.\n`);
    process.exit(1);
}

// §213 — espejo EXACTO de functions/index.js:710 (isOwnerData). NO simplificar:
// las 3 formas deben coincidir con el owner-guard de rules §212 y de la CF.
function isOwnerData(d) {
    return !!d && (
        d.rol === 'super_admin'
        || d.roleId === 'system_super_admin'
        || (Array.isArray(d.permissions) && d.permissions.includes('*'))
    );
}

console.log(`\n→ Destino: PROYECTO REAL altorra-cars (ADC).`);
initializeApp({ credential: applicationDefault(), projectId: 'altorra-cars' });
const db = getFirestore();

const snap = await db.collection('usuarios').get();
console.log(`\n— Backfill niveles RBAC ④a (${APLICAR ? 'APLICAR' : 'preflight, solo lectura'}) — ${snap.size} doc(s) en usuarios/\n`);

let pendientes = 0;
let anomalias = 0;
const dueniosVistos = []; // { uid, nivelFinal }

for (const doc of snap.docs) {
    const uid = doc.id;
    const data = doc.data();
    const isOwner = isOwnerData(data);
    const etiqueta = isOwner ? ' 👑 DUEÑO' : '';
    const { updates, anomaly } = computeRbacFoundationUpdate(data, isOwner);

    if (anomaly) {
        anomalias++;
        console.log(`  ${uid}${etiqueta} · ⚠️ ${anomaly} fuera del enum — se OMITE (revisar a mano)`);
    }

    const nivelFinal = updates.nivel !== undefined ? updates.nivel : data.nivel;
    if (isOwner) dueniosVistos.push({ uid, nivelFinal });

    if (Object.keys(updates).length === 0) {
        console.log(`  ${uid}${etiqueta} · ✅ ya completo (nivel=${data.nivel ?? '—'}, scope=${data.dataScope ?? '—'}, dept=${data.departmentId ?? 'null'})`);
        continue;
    }

    pendientes++;
    const resumen = Object.entries(updates).map(([k, v]) => `${k}=${v === null ? 'null' : v}`).join(', ');

    if (!APLICAR) {
        console.log(`  ${uid}${etiqueta} · 📝 se escribiría: ${resumen}`);
        continue;
    }

    await doc.ref.update(updates);
    const verif = (await doc.ref.get()).data();
    const ok = Object.entries(updates).every(([k, v]) => verif[k] === v);
    console.log(`  ${uid}${etiqueta} · ✍️ escrito: ${resumen} ${ok ? '✅' : '❌ NO COINCIDE'}`);
}

// --- Aserción de invariante: todo dueño termina en nivel 100 (§193.4) ---
const dueniosMal = dueniosVistos.filter((d) => d.nivelFinal !== 100);
if (dueniosVistos.length === 0) {
    console.log(`\n⚠️ No se encontró ningún doc de DUEÑO ('*' / super_admin / system_super_admin). Verificar a mano.`);
} else if (dueniosMal.length) {
    console.error(`\n❌ INVARIANTE VIOLADO: ${dueniosMal.length} dueño(s) NO quedan en nivel 100: ${dueniosMal.map((d) => `${d.uid}=${d.nivelFinal}`).join(', ')}`);
    process.exit(1);
} else {
    console.log(`\n✅ Invariante OK: ${dueniosVistos.length} dueño(s) en nivel 100.`);
}

if (anomalias) console.log(`⚠️ ${anomalias} doc(s) con dataScope fuera de enum — revisar a mano.`);
console.log(`\n${APLICAR ? 'Hecho.' : `Plan: ${pendientes} doc(s) por actualizar. Corre con --aplicar para ejecutar.`}\n`);
