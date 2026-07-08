# PageSpeed Insights — Auditoría + Plan de Mejora (home pública)

> **Fecha:** 2026-07-08 · **Modelo:** Opus 4.8 · **ADR:** §296 (Fase 0 + 1.1a shipped `018ad1d8`)
> **Fuente de datos:** informe live `pagespeed.web.dev/analysis/https-altorracars-github-io/14oc4vbfwm`
> (16:05, Lighthouse 13.4.0) + JSON crudo `__LIGHTHOUSE_MOBILE_JSON__`/`__DESKTOP_JSON__` extraído del
> tab + 2 PDF (40 págs) renderizados a `scratchpad/{m,d}NN.png` (dejados por el dueño para reconsulta).
> **SSoT de este EPIC de rendimiento.** Consultar ANTES de continuar Fase 1.1b/2/3/4.

## Puntajes (lab)
| Cat | Móvil | Ordenador |
|---|---|---|
| Rendimiento | 53 | 69 |
| Accesibilidad | 95→(100 tras Fase 0) | 96→(≈100) |
| Prácticas | 96 | 96 |
| SEO | 100 | 100 |
| Nav. agéntica | 1/2→2/2 | 2/2 |

Métricas móvil: FCP 9.8s · **LCP 22.3s** · TTI 24.2s · SI 9.8s · TBT 200ms ✅ · CLS 0.025 ✅.
Ordenador: FCP 0.7s ✅ · LCP 1.9s · **TBT 410ms** · CLS 0.046 · TTI 4.3s. Server 10ms ✅ (problema = cliente).

## Causas raíz
1. **Imágenes gigantes** (~2.1MB): logos PNG (logo-wheel/logo-placeholder 412KB c/u, ALTOR 305KB) mostrados diminutos; favicon = logo-placeholder 412KB **preloaded**; categorías cargan `.jpg` crudo (~1MB) por `background-image` aunque existen variantes `optimized/`.
2. **JS terceros eager** (~689KB sin usar, ~2s hilo): `firebase-config.js` carga TODO Firebase (app/auth/firestore/**app-check=reCAPTCHA**/storage/functions/analytics/database) + GA4 gtag (161KB) + GSI (96KB) en toda página.
3. **Render bloqueado** (~900ms móvil): 9 CSS (`style.css` 188KB, `cinematic.css` 81KB…) + Google Fonts 5 familias (línea 296 index).
4. **Sin minificar + CSS sin usar** (~272KB).
5. **Caché repetición** (2.3MB): GitHub Pages fuerza TTL 600s → solo se arregla migrando (Cloudflare §94).

### Deltas hallados en los PDF (no visibles en el resumen)
- 🔴 **`auth/iframe.js` (Firebase Auth) en la RUTA CRÍTICA** 1425ms (móvil)/1126ms (ord) → cadena `…→auth/iframe.js→page-loader.js→auth-modal.html`. Diferir auth = borra el cuello #1.
- 🔴 **reCAPTCHA `recaptcha__en.js` ≈751KB-1.1MB / 523ms hilo** (se descarga ~3×) + su CSS `styles__ltr.css` 41KB 100% sin usar.
- 🔴 **Firestore `Listen/channel` 517+KB** en el home (onSnapshot realtime) → peso + los `ERR_TIMED_OUT` de consola.
- 🔴 **14 animaciones NO compuestas** (repintan en hilo principal, viola §3.1): `cinWord` filter (`cinematic.css:177`), `cinReveal` clip-path (`:461`), `cinPulse` box-shadow (`:138`), `altorGlow` filter (`concierge.css:274`, botón bot), `name-reveal` letter-spacing+filter (`chrome-redesign.css:166`), `altorra-shimmer` bg-position (`style.css:5409`, footer), `pbShimmer` bg-position (`page-loader.css:77`).
- 🟠 **Reflujo forzado**: `home-chrome.js:439:23` (+ `:157`, `home-motion.js:90:24`).
- 🟠 **Logos de marca rotos**: solo Chevrolet/BMW cargan; Audi → Storage 404 (`cars/brand_logo_..._Audi.webp`); ~15 marcas `<img src="">`. Existen los 17 locales `multimedia/Logos/{Marca}.webp`. Origen: `home-carousels.js:496-520` usaba `brands[b].logo` sin `onerror`.
- 🟠 **JS bot/IA carga en home dormido**: `ai/*` (intent/small-talk/fuzzy/ner/dual-core/engine/brain-config/…) + `concierge.js` 58KB + `concierge.css` 14KB sin usar.
- 🟠 **`shared/admin-calendar-config.js` en home pública** (inyectado por JS, no `<script>` en index — rastrear quién lo carga antes de quitar).
- 🟠 **CLS ordenador (0.046) = salto del `<h1 class="cin-headline">`** al cargar fuente web (Poppins `pxiByp8kv.woff2`).
- 🟠 `lucide.min.js` 82KB (subset). **Cardo** se pide render-blocking aparte (+450ms). **Poppins** sigue cargando (diferido; comentario índex dice "usado por CSS legacy/modales" → NO quitar sin verificar).
- 🟢 **Seguridad (BP informativo, Alta)**: sin CSP/HSTS/COOP/XFO/Trusted-Types → no configurable en GH Pages (refuerza Cloudflare; CSP parcial vía `<meta>`). `llms-txt` N/A (oportunidad AEO).
- 🟢 **LCP reconciliación**: el desglose dice hero pinta ~1.3s (render-delay 1170ms); los 22.3s son artefacto de throttling+payload → concuerda con los "662ms" del `05` (§283-291). Re-medir tras fixes.
- ✅ **Fortalezas (no tocar)**: gzip ✅, `font-display:swap` ✅, LCP discovery ✅ (hero `<picture>` AVIF `fetchpriority=high`), contraste ✅, HTTPS ✅, sin cookies terceros, DOM 1128 ok, source-maps ✅.

## Plan por fases (estado)
- **FASE 0 — quick wins** ✅ SHIPPED §296 (`018ad1d8` + follow-up): imágenes→webp/favicon real (−1.1MB) + preload 412KB eliminado · aria-label btnLogin/btnRegister · burbuja CTA close 28px + aria-label contenedor retirado · logos marca `onerror`→local · **page-loader logo + íconos PWA manifest → webp** (quita el ÚLTIMO fetch de `logo-placeholder.png` 412KB del home — detectado en validación live). Verificado en preview + LIVE. Quedan solo refs no-fetch: comentario + `logo` de schema (metadato).
- **FASE 1.1a** ✅ SHIPPED §296: `cinWord` sin `filter:blur` (reposo idéntico).
- **FASE 1.1b** ⏳ (requiere verificación VISUAL, cambian el efecto): `cinReveal` (clip-path→opacity/transform, ojo conflicto con hover-scale + reduced-motion deja tarjeta invisible), `altorGlow` (glow del bot→pseudo transform/opacity), `altorra-shimmer`/`pbShimmer` (shimmer bg-position→pseudo), `name-reveal` (quitar letter-spacing+filter, fijar letter-spacing final estático), `cinPulse` (ripple→transform/opacity).
- **FASE 1.2 fuentes** 🔶 PARCIAL: ✅ quitada `Plus Jakarta Sans` del request (solo fallback, nunca primaria — cero regresión). ⏳ PENDIENTE (necesita sign-off diseño + `size-adjust`): hacer el request no-bloqueante. **🚫 BLOQUEO**: el equipo mantiene la fuente principal BLOQUEANTE a propósito (anti-FOUT en hero premium; solo Poppins diferido), y **Cardo entra por `@import` en `style.css:9` (SITE-WIDE)** → quitarlo rompe Cardo en las otras páginas. Hacer no-bloqueante sin `size-adjust` puede empeorar CLS del `<h1>` (font-swap). Inter se usa (`--font-body`/`--font-brand-cars`) → NO quitar.
- **FASE 1.3** ⏳: CSS crítico inline + diferir los 9 render-blocking (truco `media=print` ya usado en índex 277-287).
- **FASE 2 — dieta JS** 🔶 EN CURSO: **(2.1a) ✅ App Check/reCAPTCHA (~1MB+523ms) DIFERIDO fuera de la ruta crítica** → `requestIdleCallback` en web pública (admin inmediato); seguro porque App Check está en MONITOR (`firebase-config.js` deferAppCheck; verificado: Firestore/18 marcas OK, reCAPTCHA off critical-path, cero errores nuevos). ⏳ RESTA: (2.1b) diferir auth/storage/functions/rtdb/analytics; (2.2) home Firestore `onSnapshot`→`get()`+limit (517KB); (2.3) diferir bot/IA hasta abrir bot; (2.4) GSI solo al login + desactivar FedCM; (2.5) subset lucide; (2.6) fix reflujo `home-chrome.js:439`.
- **FASE 3 — build/minify** ⏳: minificar CSS/JS (−142/−32KB), podar CSS sin usar (−98KB; los 41KB reCAPTCHA se van con 2.1), **categorías ✅ (−646KB): 4 cards + 4 nav-thumbs `.jpg`→`optimized/{CAT}-768.webp`** (SUV/SEDAN/PICKUP/HATCHBACK, HTTP 200 verificado); width/height a 36 imágenes ⏳.
- **FASE 4 — estratégico (dueño/dinero)** ⏳: Cloudflare Pages (caché larga + Brotli + cabeceras seguridad + CDN img); `llms.txt`; CSP vía `<meta>` interino.

**Proyección:** Fases 0-2 → móvil ~90, ordenador ~92-96, a11y/agéntica 100.

## Notas de ejecución
- **Caché**: NO bump manual (cron es dueño, `05`/L-02); propaga vía networkFirst (HTML + `/js/core/` + `/js/public/home/`) + stale-while-revalidate (CSS + resto JS). Ver `service-worker.js` estrategias.
- **Diseño estricto** (memoria dueño): réplica exacta / cero regresión → animaciones que cambian el efecto visible = verificación visual antes de merge.
- Verificación local: preview `static` (http-server 8080); errores `Installations 403`/`FedCM` en localhost = esperados. Validación live = extensión Chrome tras deploy Pages (~5min).
