# 🔎 Auditoría holística — Diseño + Infraestructura (mandato dueño 2026-07-06) ⟦OPUS-4.8⟧

> **Origen**: feedback del dueño con evidencia (screenshots del panel Atributos + PageSpeed móvil/desktop).
> **Directiva Permanente TODO-52**: pulir hasta "respira top mundial". Este spec = SSoT de hallazgos + prioridad.
> **Bloqueados (sin dinero)**: flip LLM del bot (#917) · migración Cloudflare (dominio). NO tocar.
> **Método de verificación**: preview local para lo público; para el panel admin = build Vite + mock; **VISUAL
> holístico = extensión Chrome** (el dueño la conecta; "un render funcional ≠ buen diseño"). Screenshot: L-28
> (cuelga tras resize) → medir por DOM/computed, o extensión `computer`.

---

## P0 — Diseño premium del PANEL (corazón del EPIC)
- ✅ **Atributos: grilla a masonry** — `display:grid` alineaba filas a la tarjeta más alta → huecos. Fix: `columns` (ADR pend). `admin-app/src/styles/lists.css`. HECHO+verificado 2026-07-06 (`4e35145a`).
- 🔬 **Barrido de grid-gaps del panel — DIAGNOSTICADO 2026-07-07 (§292, workflow 10 agentes)**: la hipótesis "propagar el masonry §283 a las otras grillas" queda **REFUTADA — 0/10 APPLY-SAFE**. El "hueco" es DENTRO de la tarjeta corta (grid `stretch` + footer `margin-top:auto`), y masonry (`columns`) reordena a columna-mayor → rompe cualquier lista ordenada.

  | Grilla | Veredicto | Por qué |
  |---|---|---|
  | `.aj-cols` `.brd-grid` `.perfil-grid` `.veh-wiz__grid` `.wf-grid` | **NOT-AN-OFFENDER** | 1 card / tiles uniformes / scaffold fijo / campos form / 3 ítems |
  | `.rev-grid` (cronológico) | **DEFER** offender FUERTE | texto 0-600 char sin min-height → void grande |
  | `.dlr-grid` `.dep-grid` `.rol-grid` `.ban-grid` `.veh-wiz__feats` | **DEFER** | variable-height PERO ORDENADO (alfa/jerarquía/`order`/curado) → masonry rompe lectura |

  Fix order-preserving = `align-items:start`/`line-clamp`, pero revierte la alineación deliberada de footers → **TRADEOFF visual → gate del pase P4 (extensión)**. Recomendación: reviews es el único que vale un vistazo prioritario. El resto (barrido visual holístico — spacing/jerarquía/color/densidad por módulo) sigue requiriendo la extensión logueado.

## P1 — Accesibilidad pública (PageSpeed: móvil 87 / desktop 88 → objetivo ≥95) — ✅ COMPLETO (§284, `d349ecb2`)
- ✅ **`qt-dock role="menu"` sin hijos `menuitem`** (`js/public/home/quicktools.js`): FIX = `role="toolbar"` + `id=qt-dock` + `aria-labelledby=qt-dock-eyebrow` + `aria-orientation=vertical`; toggle `aria-controls` (disclosure). Verif live: toolbar bien formado, disclosure false→true→false. (El `css/home/quicktools.css` no requirió cambios.)
- ✅ **Contraste footer** — la spec lo MIS-ATRIBUYÓ a `.alt-footer-bottom-link{--ink-text-faint}` (#8A8A95, ~5.6:1). Medición live (§3.3): el ganador de especificidad era `css/style.css .footer-legal a{rgba(255,255,255,0.22)}` (0-1-1) = **1.83:1** sobre `#030303` (falla AA). FIX: 0.22→0.62 = **7.81:1 AAA** (links + `.footer-copy`); `strong` 0.5→0.9; defensa `.alt-footer-bottom-link` faint→muted.
- ✅ **Áreas táctiles CTA bot** (`css/concierge.css`): `.cnc-cta-bubble-close` 22px→**24px** (WCAG 2.5.8). El `.cnc-cta-bubble` en sí ya es un pill grande (>24px). Verif: computed 24×24.
- ✅ **Botones sin nombre accesible** (móvil): auditados index (desktop+móvil), busqueda, detalle — incl. `role=button`/`onclick`/ocultos = **0 offenders** (el sitio ya etiqueta todo). NO reproducible; si el dueño señala el elemento exacto de PageSpeed, se corrige.

## P2 — CLS + perf quirúrgica pública — ✅ COMPLETO (§285, `f42e3ff5`) · 3/4 ya OK por OLA 0-3
- ✅ **>4 preconnect** (el único gap real): index tenía 6 (4+par duplicado), templates 4 → **2 preconnect (fonts.googleapis+gstatic) + 2 dns-prefetch (www.gstatic+firestore, cargan diferidos)** en index+detalle-vehiculo+marca+busqueda; index quita el duplicado. CI propaga a vehiculos/*+marcas/*. Verif live: `preconnectCount=2`.
- ✅ **Imágenes sin `width`/`height`** — YA OK (verificado, sin cambios): grep index = 0 sin dims; tarjetas dinámicas `render.js:146` = `width=400 height=260`+lazy+skeleton. CLS ya "good" (0.034 < 0.1).
- ✅ **render-blocking** — YA OK (verificado, sin cambios): JS todo `defer` (salvo page-loader intencional); CSS no-crítico (8 hojas) ya `media="print" onload`. Resto blocking = CSS crítico above-fold (retiro = "Task 7" legacy, diferido).
- ✅ **"14 animaciones no-compuestas"** — diagnóstico Lighthouse **peso-0**: mayoría COMPUESTAS (transform/opacity). Las de paint (`cinPulse` box-shadow hero DISEÑADO · `shimmer` bg-position skeleton) DIFERIDAS: convertir arriesga el diseño (owner: zero-regresión) por ganancia de score NULA.
> **Score-killer real = LCP móvil 22.6s → P3** (minify/unused JS-CSS), NO P2. P2 era polish; el salto a ≥95 está en P3.

## P3 — Perf infraestructura (más grande; LCP móvil 22.6s era el gran objetivo)
- ✅ **P3.1 LCP del hero (index) RESUELTO** (§286, `c541903a`): el LCP NO era minify — era el hero como CSS `background-image` (145KB full, tarde, preload desperdiciado). Fix: hero = `<picture>` real → preload usado. Verif chrome-devtools móvil Slow4G+4x: **LCP 720ms** (era 22.6s), Load 6ms, CLS 0.
- ✅ **P3.2 LCP páginas de vehículo** (§287, `cd5e30b9`): la trampa bg-image NO se repite en detalle/marca, pero detalle tenía `#mainImage src=""` (JS lo llena tras fetch a Firestore) sin preload. Fix SSG: hornea preload + `#mainImage src` (=`imagenes[0]||imagen`, cache-hit con el JS). Output-verificado; propaga vía CI. **Falta**: hero de marca (banner — mismo patrón `src=""`).
- ✅ **P3.3 forced reflow del carrusel** (§289, `76b01728`): 2× `updateArrows` escribían `.disabled` y leían `scrollWidth` (write→read=reflow) en cada scroll/resize → fix = batch lecturas-antes-escrituras + rAF-throttle. Verif móvil 4x: 248→219ms (~12%). Diagnóstico peso-0; localhost sub-representa.
- ✅ **P3.4+P3.5 LCP páginas de marca** (§291, `b345e703`+`48853e0e`): P3.4 = `#brandBanner src=""` sin preload → SSG hornea preload + src. **P3.5** = los 18 banners eran PNG 1920×800 (73-331KB, 3.51MB) → **WebP 1280w −66%** (1.18MB; toyota 277→62KB). Fallback→WebP + onerror WebP→PNG→header. NO `<picture>` (el JS overridea src dinámico). Selftest OK; propaga vía CI.
- ✅✅ **VALIDACIÓN LIVE (deploy `f104708c`)** — homepage PRODUCCIÓN (`altorracars.github.io`, chrome-devtools móvil Slow4G+4x): **LCP 662ms (era 22.6s), CLS 0.03**, hero=`<picture>` AVIF preloaded, qt-dock toolbar, 2 preconnect. Todo P1/P2/P3.1 confirmado en producción. **Score-killer eliminado.** RESTA menor: banners marca (PNG→WebP), render-blocking (inconsistente), minify (decisión build). El dueño puede correr PageSpeed oficial para el score exacto.
- ⬜ **Minificar JS/CSS público** (142 KiB JS + 32 KiB CSS): el sitio vanilla NO minifica. Necesita un paso de build/minify (¿workflow CI? — sin romper la simplicidad vanilla). Impacto medio (ya NO es el cuello del LCP).
- ⬜ **JS/CSS sin usar** (690 KiB JS · 87 KiB CSS): code-split / defer / cargar por-página lo que hoy es global.
- ⬜ **JS duplicado** (8 KiB): ¿Firebase cargado 2×? Investigar.
- ⬜ **Payload enorme** (móvil 8660 KiB): imágenes (ya AVIF/WebP §91) + JS. Auditar qué pesa.
- ⬜ **Cache lifetimes** (3456 KiB móvil): GitHub Pages `max-age=600` (control limitado); el SW ya mitiga. Evaluar.
- ⬜ Reducir ejecución JS (2.4s) / trabajo del hilo principal (móvil 10.8s / desktop 5.2s) / 12-13 tareas largas.

## P4 — Revisión holística con extensión Chrome (el dueño la conduce/señala)
- ⬜ Con la extensión: recorrer PageSpeed (pestañas NO pegadas: "Ver gráfico de rectángulos", "Árbol de dependencia de red", "Causantes de CLS", "Terceros", "Desglose de LCP") + el render vivo de cada superficie (público + panel logueado) para cazar lo que el DOM no ve (spacing, jerarquía, color, "premium tipo software").

---

## Orden sugerido de ejecución
1. **P1 completo** (a11y — quick, verificable en preview local, sube el score ya). 
2. **P2 completo** (CLS + preconnect — quick, mueve el CLS/LCP).
3. **P0 barrido del panel** (con extensión Chrome logueado — el dueño señala).
4. **P3 minificación** (el gran salto de LCP móvil — evaluar el approach de build sin romper vanilla).
5. **P4 continuo** (extensión, transversal).

> Cada bloque cerrado → ADR + fila `00` + este spec tickeado. Cache: code-only → SW sirve fresco (L-65).
