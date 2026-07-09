# Rendimiento v2 — 4 superficies (web+admin, móvil+PC) · plan post dieta-JS

> **Fecha:** 2026-07-09 · **Modelo:** Opus 4.8 · Continuación de `2026-07-08-pagespeed-audit-plan.md` (TODO-54).
> **Evidencia:** 4 reportes PageSpeed del dueño (08/07 21:05–21:17, Lighthouse 13.4.0, Moto G Power / 4G lenta en móvil), renderizados de PDF→PNG vía `Windows.Data.Pdf` (poppler solo tenía pdftotext; los PDFs son imágenes). PNGs en scratchpad `{webmovil,webord,adminmov,adminord}/`.
> **SSoT del plan de rendimiento multi-superficie.** Cloudflare BLOQUEADO sin presupuesto (dueño 09/07, NO re-proponer).

## Puntajes verificados (08/07, PRE dieta-JS 2.1b-2.5)

| Superficie | URL | Rend. | FCP | LCP | TBT | CLS | SI | A11y | SEO |
|---|---|---|---|---|---|---|---|---|---|
| **WEB móvil** | `altorracars.github.io/` | **55** | 10.2s | 18.3s | 120ms✓ | 0.001✓ | 10.2s | 100 | 100 |
| **WEB PC** | `altorracars.github.io/` | **78** | 0.7s✓ | 1.1s✓ | **380ms** | 0.041✓ | 1.9s | 100 | 100 |
| **ADMIN móvil** | `/admin-app/dist/` | **56** | 2.4s | **7.9s** | **660ms** | 0✓ | 2.5s | 98 | 54* |
| **ADMIN PC** | `/admin-app/dist/` | **92**✓ | 0.7s✓ | 1.6s | 140ms✓ | 0✓ | 0.7s | 98 | 54* |

*Admin SEO 54 = IRRELEVANTE (dueño: "el admin es indiferente al SEO, solo velocidad").

## ⚠️ Los reportes son PRE dieta-JS (2.1b-2.5)

Los 4 muestran `auth/iframe.js` a **2004ms en la cadena crítica** (WEB móvil) — pero la Fase 2.1b ya lo difirió fuera de la ruta crítica en el deploy actual. → **La web LIVE actual ya debería puntuar mejor que 55/78.** RE-MEDIR el deploy actual antes de dar números finales (P0-A). El admin NO se tocó en la dieta-JS (carga Firebase inmediato por diseño) → admin 56/92 sigue vigente.

## Oportunidades por superficie (ahorros de los reportes)

### WEB móvil (55) — la mayoría accionable sin Cloudflare
- **Render-blocking CSS (530ms):** `style.css` bloquea **2070ms** + cinematic(960)/dark-theme(960)/chrome(960)/tokens(480)/base(640)/performance-fixes(800)/page-loader(160) + Google Fonts (750+450). Critical-CSS a mano = 113KB (hallazgo previo, no limpio). → **minify + podar CSS sin usar** es la vía viable.
- **Imágenes (66KiB):** `heroindex-768.avif` 55.3→30.5KiB · `SEDAN-768.webp` 65.7→20.7KiB (subir compresión) · `altor-128.webp` se muestra a **68×68** pero pesa 128px (servir tamaño real). ← LCP.
- **Reflujos forzados:** `page-loader.js:345:18` (34ms) · `home-chrome.js:439:23` (75ms) · `page-loader.js:339:24` (34ms). (La Fase 2.6 arregló `home-motion.js`; estos siguen.)
- **Caché 1235KiB** (TTL 10min GitHub Pages) = 🚫 Cloudflare.

### WEB PC (78)
- **TBT 380ms** (JS en hilo principal) → la dieta-JS ya ayuda; verificar tras re-baseline. Minify JS ayudaría más. Caché 1505KiB = 🚫 Cloudflare.

### ADMIN móvil (56) — 🎯 MAYOR ROI ACCIONABLE
- **Bundle Vite monolítico:** `index.js` **1.38MB crudo / 350KiB gzip** + **`exceljs.min.js` 938KB** (SOLO se usa para exportar Excel en Reportes) → el Moto G lo parsea/compila lento = **TBT 660ms + LCP 7.9s**. El build de Vite ya avisa "chunks >900KB → usa dynamic import()".
- **Fix (sin Cloudflare):** **code-split** — `import()` dinámico de exceljs (cargar solo al exportar) + `manualChunks` (vendor/firebase/exceljs) + lazy routes de módulos pesados. Objetivo: admin móvil 56 → 80+.
- Caché 418KiB = 🚫 Cloudflare.

### ADMIN PC (92) — bien; solo caché (🚫 Cloudflare). El PC parsea el bundle rápido.

## Restricciones (no tropezar)
- **Cloudflare BLOQUEADO** (sin presupuesto, dueño 09/07). Caché-larga/Brotli/minify-por-pipeline del sitio público = fuera de alcance. NO re-proponer.
- **Sitio público = SIN build** (GitHub Pages sirve directo). `.min` hermanos = footgun (se desincronizan; el linter del cerebro es kernel compartido, no se le puede añadir gate). **Admin = CON build Vite** (sí code-split/minify nativo).
- CERO regresión + diseño premium (dueño). CLS ya bien (0–0.041) → no es el problema.

## Plan
> Refinado por comité acotado (4 lentes + síntesis, `wf_990be945-676`, 09/07). Ver §PLAN-FINAL abajo (se completa al volver el comité).

### Borrador del arquitecto (pre-comité)
- **P0-A** re-medir web actual (post dieta-JS). · **P0-B** ADMIN code-split (mayor ROI).
- **P1** WEB imágenes (re-comprimir hero+SEDAN, resize altor) · WEB reflujos (page-loader.js + home-chrome.js:439).
- **P2** WEB render-block CSS (minify style.css + podar CSS sin usar) · minify JS web.
- 🚫 caché larga (Cloudflare) = bloqueado.

## Checklist
- [ ] Evidencia: 4 PDFs renderizados + leídos (hecho 09/07; scores en §"Puntajes verificados" de este spec).
- [ ] §PLAN-FINAL del comité integrado (`wf_990be945-676`).
- [ ] P0-A re-baseline live.
- [ ] P0-B admin code-split.
- [ ] P1/P2 web.
