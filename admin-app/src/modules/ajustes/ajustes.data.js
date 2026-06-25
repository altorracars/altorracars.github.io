// ============================================================
// Ajustes (PLAN-UNIFICADO F-2 6/6 §244-next, gap §2.A "Ajustes tema/SEO/sitemap")
// — capa de datos. Cierra el GAP Config: es el ÚLTIMO módulo que le quedaba
// en exclusiva a admin.html (sec-settings).
//
// Dos concerns:
//  1) TEMA (apariencia): paleta de acento del panel. Port del 6-palette picker
//     del clásico (admin-theme-picker.js §28.8/§115) — per-device, localStorage,
//     CERO Firestore. Aplica `.theme-accent-{id}` al <html>; los overrides de
//     tokens viven en styles/ajustes.css (remapean el set --gold-* + derivados).
//  2) SEO/sitemap: regeneración manual de las páginas estáticas + sitemap. El
//     clásico la hacía CLIENT-SIDE con un GitHub PAT en localStorage + llamadas
//     directas a la GitHub API (smell). Aquí usamos el callable server-side YA
//     EXISTENTE `triggerSeoRegeneration` (functions/index.js:706 — super_admin,
//     usa el secret GITHUB_PAT) → cero PAT en el navegador. La regeneración
//     además YA es AUTOMÁTICA en el server (onVehicleChange/onMarcaChange/
//     siteContent dispatch); este botón es solo un disparo manual de respaldo.
// ============================================================

import { httpsCallable } from 'firebase/functions';
import { fns } from '../../core/firebase.js';

/* ── 1. TEMA · paletas de acento (per-device, localStorage) ───────────────── */

export const ACCENT_KEY = 'altorra-crm-accent';
export const DEFAULT_ACCENT = 'gold';

// Paletas: trío de swatches para el preview + el id de clase. El default (gold)
// = los tokens base (sin clase). Los 5 restantes remapean en ajustes.css.
export const ACCENTS = [
  { id: 'gold', name: 'Dorado Altorra', desc: 'Identidad histórica de la marca', swatches: ['#E8C56F', '#D4A85A', '#95773B'] },
  { id: 'blue', name: 'Azul corporativo', desc: 'Profesional y moderno', swatches: ['#93C5FD', '#3B82F6', '#1D4ED8'] },
  { id: 'violet', name: 'Violeta', desc: 'Lujo y distinción', swatches: ['#C4B5FD', '#8B5CF6', '#6D28D9'] },
  { id: 'emerald', name: 'Esmeralda', desc: 'Verde fresco y natural', swatches: ['#6EE7B7', '#10B981', '#047857'] },
  { id: 'crimson', name: 'Carmesí', desc: 'Rojo intenso de lujo', swatches: ['#FDA4AF', '#E11D48', '#9F1239'] },
  { id: 'cyan', name: 'Cian tech', desc: 'Tecnológico y vibrante', swatches: ['#67E8F9', '#06B6D4', '#0E7490'] },
];

const ACCENT_IDS = ACCENTS.map((a) => a.id);

export function getAccent() {
  try {
    const v = localStorage.getItem(ACCENT_KEY);
    if (ACCENT_IDS.includes(v)) return v;
  } catch (e) { /* localStorage bloqueado → default */ }
  return DEFAULT_ACCENT;
}

/** Aplica la paleta al <html> (clase .theme-accent-{id}) y persiste. Default = sin clase. */
export function applyAccent(id) {
  if (!ACCENT_IDS.includes(id)) id = DEFAULT_ACCENT;
  const root = document.documentElement;
  ACCENT_IDS.forEach((a) => root.classList.remove('theme-accent-' + a));
  if (id !== DEFAULT_ACCENT) root.classList.add('theme-accent-' + id);
  try { localStorage.setItem(ACCENT_KEY, id); } catch (e) { /* no persiste → solo esta sesión */ }
  return id;
}

/** Boot: aplica el acento persistido ANTES de que el usuario entre a Ajustes (app-wide). */
export function applyInitialAccent() {
  applyAccent(getAccent());
}

/* ── 2. SEO/sitemap · regeneración manual (callable server-side) ──────────── */

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
