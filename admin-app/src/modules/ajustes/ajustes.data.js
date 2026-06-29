// ============================================================
// Ajustes (PLAN-UNIFICADO F-2 6/6 §244-next, gap §2.A "Ajustes tema/SEO/sitemap")
// — capa de datos. Cierra el GAP Config: es el ÚLTIMO módulo que le quedaba
// en exclusiva a admin.html (sec-settings).
//
// §219-next (dueño 29/06): el accent picker (TEMA) se ELIMINÓ — "cambiar el color del
// panel" es irrelevante; Altorra es dark-only con oro de marca fijo. Queda solo:
//  · SEO/sitemap: regeneración manual de las páginas estáticas + sitemap. El
//     clásico la hacía CLIENT-SIDE con un GitHub PAT en localStorage + llamadas
//     directas a la GitHub API (smell). Aquí usamos el callable server-side YA
//     EXISTENTE `triggerSeoRegeneration` (functions/index.js:706 — super_admin,
//     usa el secret GITHUB_PAT) → cero PAT en el navegador. La regeneración
//     además YA es AUTOMÁTICA en el server (onVehicleChange/onMarcaChange/
//     siteContent dispatch); este botón es solo un disparo manual de respaldo.
// ============================================================

import { httpsCallable } from 'firebase/functions';
import { fns } from '../../core/firebase.js';

// §219-next (dueño 29/06): se ELIMINÓ el accent picker ("cambiar el color del panel" =
// irrelevante/inútil). Altorra Cars es dark-only con oro de marca FIJO (--gold-* canónico).
// Esto también cierra el P1 "separar brand-gold del accent" (ya no hay accent que separar).

/* ── SEO/sitemap · regeneración manual (callable server-side) ──────────── */

/**
 * Dispara la regeneración de páginas SEO + sitemap vía el callable server-side
 * (super_admin; el server usa el secret GITHUB_PAT — sin token en el cliente).
 * El workflow `vehicle-changed` regenera TODO (páginas + sitemap.xml), idempotente.
 * @returns {Promise<{success:boolean,message:string}>}
 */
export async function triggerSeoRegen() {
  const callable = httpsCallable(fns, 'triggerSeoRegeneration');
  const res = await callable({}); // sin githubPat → fallback al secret del server
  return res.data || { success: true, message: 'Regeneración iniciada.' };
}
