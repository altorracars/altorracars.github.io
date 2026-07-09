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

### ✅ RE-BASELINE home móvil VIVO (P0-A hecho vía extensión Chrome, run `vn4cvuam8o`) — POST dieta-JS
| | 08/07 (pre-dieta) | **VIVO (post-dieta)** | Δ |
|---|---|---|---|
| Rendimiento | 55 | **61** | +6 |
| FCP | 10.2s | **3.0s** | **−7.2s** |
| LCP | 18.3s | **7.4s** | **−10.9s** |
| TBT | 120ms | 280ms | +160ms |
| CLS | 0.001 | 0.024 | ok |
| SI | 10.2s | 5.4s | −4.8s |

**Lectura:** la dieta-JS dio mejora REAL enorme (FCP/LCP). El score subió poco (curva no-lineal: LCP 7.4s sigue rojo; bajarlo a <4s dispara el score). **Próximo lever del score = LCP render-delay (P1-A fuentes + P1-B CSS below-fold) + TBT 280ms (P1-C diferir GTM/GA4)**. ⏳ FALTA re-medir: detalle-vehiculo + admin (tras deploy P0-C).

### 🔴 BÚSQUEDA móvil VIVO (run `fj1okb29ne`) = **40** (FCP 10.4s · LCP 18.5s · TBT ~6xxms · CLS 0)
**CONFIRMADO el diagnóstico del comité:** las páginas NO-home siguen lentas (como el home ANTES) porque la dieta-JS (2.1b/2.3/2.5) fue **home-only** (`isHomePage` gate) → busqueda/detalle cargan auth/SDKs/bot/lucide EAGER. **🎯 NUEVO P0/P1 = EXTENDER la dieta-JS a busqueda + detalle-vehiculo** (páginas de alta intención de compra): usan los mismos módulos core ya arreglados (`dbReady` render, `auth.js` gateado) → extender el gate a esas páginas debería darles la misma mejora del home (40 → ~61). Verificar sus consumidores antes (caza-bugs).

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

## Hallazgos EXTRA (lectura completa de las páginas de diagnóstico, 09/07)
> No salían en la página de "oportunidades"; aparecieron al leer TODAS las páginas de rendimiento (el dueño insistió, con razón).
- 🔴 **ADMIN: reCAPTCHA/App Check = el MAYOR costo de JS del admin** — `recaptcha__en.js` **1656ms CPU** (1200 eval + 283 parse) + **1123 KiB descargados** (3× 374KiB) + **621 KiB de JS sin usar** (328 recaptcha + 235 del bundle) + 41 KiB CSS recaptcha 100% sin usar + top de tareas largas. El admin carga App Check **inmediato** (mi diferido 2.1a fue solo público; además admin-app usa Firebase **modular propio**, no `firebase-config.js`). App Check está en **MONITOR** (no bloquea) → **diferirlo en el admin = victoria mayor, mayor incluso que exceljs.** ⚠️ **exceljs (938KB) NO aparece en el payload del login** → verificar si ya es chunk aparte (quizá no es el problema de boot que se creía; el problema de boot = bundle 1.38MB con 235KB sin usar en login + reCAPTCHA).
- 🟢 **WEB: LCP = el `<img>` del hero** (`cin-hero-img` con `fetchpriority=high`), gated por **render-delay 2090ms** (NO descarga: load-delay 130ms + load 120ms). → **re-comprimir el hero NO ayuda al LCP**; el lever es reducir render-block + fuentes.
- 🟠 **WEB: fuentes = 108 KiB en MUCHOS pesos** (Inter/Manrope/Instrument/Cardo + **Poppins ×5 pesos** 400-800) → self-host + reducir pesos = palanca grande de FCP.
- 🟠 **WEB: GTM/GA4 (`gtag` 162 KiB / 107ms) NO lo difirió mi dieta-JS** → candidato a diferir a idle.
- ℹ️ **WEB PC (78): único cuello = TBT 380ms** (JS hilo principal). Reflujos PC chicos (home-motion ya 0ms tras 2.6; home-chrome:439 = 43ms).

## §PLAN-FINAL (comité `wf_990be945-676` + hallazgos extra) — P0→P3, todo sin Cloudflare
> Regla del comité: **re-medir es COMPUERTA DURA** (los reportes son pre-dieta-JS; el 55 podría ya ser 75+). Nada web se dimensiona hasta re-medir.

- **P0-A · RE-MEDIR (gate duro)** — Lighthouse/Chrome-ext sobre el deploy ACTUAL: home móvil **+ busqueda + detalle-vehiculo** (la dieta fue HOME-ONLY → esas páginas pueden puntuar peor) + identificar elemento LCP y si el gating es JS o CSS/fonts. Congela P1/P2 web. Riesgo=0.
- **P0-B · CAZA-BUGS** — verificar E2E que la dieta-JS NO rompió login · solicitud→lead (contacts/leads/activities) · GA4 · arranque bot. Un LCP mejor con leads rotos = regresión de negocio.
- **P0-C · ADMIN diferir App Check/reCAPTCHA** (hallazgo extra, MAYOR ROI admin) — App Check en MONITOR; sacarlo del boot ahorra ~1656ms CPU + 1123KiB. En admin-app (Firebase modular). Verificar que no rompe nada (monitor = no enforce).
- **P0-D · ADMIN exceljs** — VERIFICAR primero si es estático o ya chunk aparte; si estático, `await import('exceljs')` dentro del handler de Exportar. Ship aislado + re-medir.
- **P1-A · WEB self-host Google Fonts** (woff2 al repo + `font-display:swap` + preload del peso crítico; quitar `<link>` a googleapis/gstatic + reducir pesos Poppins). Mayor lever individual del FCP móvil, sin footgun. Mismo patrón en admin (asset Vite).
- **P1-B · WEB entrega CSS** — dejar bloqueante SOLO el above-fold; diferir below-fold (cinematic/dark-theme/chrome/performance-fixes) vía `media=print onload` swap; podar CSS muerto EN LA FUENTE. **VALIDAR FOUC live en Chrome (no preview).** Es el critical-CSS ALCANZABLE (sin inline 113KB).
- **P1-C · WEB defer GTM/GA4** (162KB) a idle + (contingente P0-A) LCP hero: como es render-delay, el lever es P1-A/P1-B, NO recomprimir.
- **P2-A · SW cache** — auditar `service-worker.js` + precache de estáticos pesados (CSS/JS/fonts self-hosted/hero). ÚNICO lever de repeat-visit sin Cloudflare (la caché-Lighthouse es diagnóstico, no puntúa). Respetar bump §4 + L-02.
- **P2-B · ADMIN lazy routes** (CONDICIONAL a P0-C/D re-medir) — `import()` por módulo; `cssCodeSplit` parte el render-block 1640ms por ruta. Login no carga CRM/reportes (mata los 235KB sin usar). Admin sin SEO = libertad total.
- **P2-C · ADMIN build** — `build.target` evergreen + `manualChunks` firebase (mantenibilidad/caché, NO palanca de score) + revisar por qué el bundle marca 66KiB de minify pendiente (¿minify Vite off?).
- **P2-D · WEB-PC TBT 380ms** (CONDICIONAL a P0-A) — romper long-tasks / más idle.
- **P3** · imágenes (hero/SEDAN recomprimir = bajo impacto, contingente) · altor-128→68 **PROBABLE MANTENER** (128@68 ≈ 1.88x, óptimo retina; encoger = borroso, contra premium) · reflujos 75ms (skip si >10min) · consolidar nº de hojas CSS.

### DESCARTADO (deuda técnica): minify manual `.min` en sitio público (footgun desync sin gate + ~10KB post-gzip) · critical-CSS inline a mano (113KB, FOUC no verificable) · manualChunks especulativo · perseguir la caché-KiB como palanca de score.
### Veredictos riesgosos (comité, unánime): (a) minify-sin-build público = MATAR. (b) critical-CSS a mano = TECHO EN CERO (usar diferir-below-fold + fonts). (c) admin code-split = SECUENCIADO (exceljs/AppCheck → medir → lazy-routes → build), NUNCA monolítico; meta honesta admin-móvil 56→72-78 (80+ exige cerrar CSS/fonts).

## Progreso (09/07)
- ✅ Evidencia: 4 PDFs leídos (perf completo) · §PLAN-FINAL (comité + extra).
- ✅ **P0-A re-baseline live** (Chrome ext): HOME 55→**61** (FCP −7.2s/LCP −10.9s); BÚSQUEDA=**40** (home-only diet).
- ✅ **P0-C admin App Check diferido** (`879c3fb9`) · P0-D exceljs = ya estaba (chunk aparte).
- ✅ **EXTENDER dieta-JS a páginas públicas de contenido** (`12eeb928`) — gate `isHomePage`→`isDeferPage` (no admin/cuenta) en firebase-config.js + components.js(Lucide). Verificado preview: busqueda 27veh/129cards + iframe off-critical; detalle OK. **⏳ re-medir busqueda vivo tras deploy (confirmar 40→~61).**
- ⏳ **P1 web (próximo, mayor lever del score)**: self-host fuentes + `font-display:swap` (LCP 7.4s→verde) · diferir CSS below-fold · diferir GTM/GA4 (TBT 280ms).
- ⏳ P2: SW precache · admin lazy-routes · re-medir admin (post P0-C).

## Checklist
- [ ] P1 fonts+CSS+GTM · re-medir busqueda/admin vivo.
