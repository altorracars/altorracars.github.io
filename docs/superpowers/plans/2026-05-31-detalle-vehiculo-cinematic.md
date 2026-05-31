# Plan de implementación — Rediseño total + de-monolitización de `detalle-vehiculo.html` (SP-5.3)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convertir la página de detalle de vehículo (monolito legacy de 2315 líneas) en una página cinematic, reorganizada y de-monolitizada (CSS + 4 módulos JS externos), sin romper ninguna funcionalidad ni el generador de las 27 páginas.

**Architecture:** Dos compuertas de verificación. **Fase 1** de-monolitiza MECÁNICAMENTE (mueve el CSS inline a un archivo externo verbatim y el JS inline a 4 módulos verbatim) → la página queda **idéntica visual y funcionalmente** (compuerta estructural). **Fase 2** reescribe el contenido del CSS a cinematic + ajusta el markup al layout aprobado (Opción A), **conservando todos los IDs y clases-hook** que el JS consume (compuerta visual). **Fase 3** regenera las 27 páginas una sola vez, bumpea cache y alimenta el cerebro. Separar las dos compuertas permite bisecar cualquier fallo: si algo se rompe tras Fase 1 es puramente estructural; tras Fase 2, puramente visual.

**Tech Stack:** HTML/CSS/JS vanilla (sin bundler), Firebase Compat SDK desde CDN, `scripts/generate-vehicles.mjs` (Node) clona el template. Verificación: `node -c` (sintaxis JS) + guard de aserción en el generador + preview local con cache-bust (skill `verify`/L-20). NO hay framework de tests unitarios — la "prueba" es sintaxis + anclajes + comprobación funcional en navegador.

**Spec:** `docs/superpowers/specs/2026-05-30-detalle-vehiculo-cinematic-design.md` (commit `b2a6bc0`).

---

## Mapa de archivos

**Crear:**
- `css/home/detalle-cinematic.css` — todo el CSS page-specific (hoy inline 50–1206). Fase 1: contenido legacy verbatim. Fase 2: reescrito a cinematic.
- `js/public/detalle/detalle-data.js` — helpers + URL/slug + SEO meta/schema.
- `js/public/detalle/detalle-render.js` — render de ficha/características/similares.
- `js/public/detalle/detalle-gallery.js` — galería + lightbox + autoplay.
- `js/public/detalle/detalle-page.js` — orquestador + estado + bootstrap + share.

**Modificar:**
- `detalle-vehiculo.html` — quitar `<style>` 50–1206 (→ `<link>`), quitar `<script>` 1439–2309 (→ 4 `<script src>`), Fase 2 markup cinematic.
- `scripts/generate-vehicles.mjs` — guard de aserción de anclajes + actualizar fallback de `PRERENDERED_VEHICLE_ID`.
- `service-worker.js` + `js/core/cache-manager.js` — cache bump.
- `docs/20-MEMORIA-ESPACIAL.md`, `docs/43-UX.md`, `docs/99-HISTORIAL-ADR.md`, `docs/00-INDICE.md`, `docs/05-ESTADO-GLOBAL.md`, `docs/10-MEMORIA-CORTO-PLAZO.md` — cerebro.

**NO tocar:** los 3 bloques inline críticos (auth-hint `<script>` 1212–1223, header-critical `<style>` 1232–1240, page-loader `<style>` 1243–1252), `css/dark-theme.css`, `marca.html`, los scripts externos (`comparador.js`, `citas.js`, `concierge.js`, `historial-visitas.js`, `favorites-manager.js`, `vehicle-hotspots.js`).

---

## FASE 0 — Red de seguridad en el generador

### Task 0: Guard de aserción de anclajes en `generate-vehicles.mjs`

**Files:**
- Modify: `scripts/generate-vehicles.mjs` (función `generatePage`, ~líneas 105–130)

- [ ] **Step 1: Leer la cabeza de `generatePage()`**

Run: `Read scripts/generate-vehicles.mjs offset=105 limit=40`
Objetivo: localizar dónde empieza `generatePage(template, v, slug)` y la variable `let html = template;` (~línea 116).

- [ ] **Step 2: Añadir el array de anclajes + aserción justo después de `let html = template;`**

Insertar este bloque inmediatamente tras `let html = template;`:

```javascript
    // Guard anti-regresión (SP-5.3): el generador hace .replace() por string literal
    // y FALLA EN SILENCIO si un anclaje no existe. Si un rediseño del template borra
    // un anclaje, queremos un error RUIDOSO, no 27 páginas con SEO roto.
    const REQUIRED_ANCHORS = [
        '<meta charset="UTF-8">',
        '<meta name="robots" content="index, follow">',
        '<title>Detalle de Vehículo | ALTORRA CARS</title>',
        'id="og-url" content="https://altorracars.github.io/detalle-vehiculo.html"',
        'id="og-title"',
        'id="og-description"',
        'id="og-image"',
        'id="tw-title"',
        'id="tw-description"',
        'id="tw-image"',
        '</head>',
        '<div id="header-placeholder"></div>',
        '<script src="js/core/historial-visitas.js"></script>',
    ];
    for (const anchor of REQUIRED_ANCHORS) {
        if (!template.includes(anchor)) {
            throw new Error(`[generate] ANCLAJE FALTANTE en detalle-vehiculo.html: ${anchor}\n  → El rediseño rompió un punto de inyección. Revisa el template antes de generar.`);
        }
    }
```

- [ ] **Step 3: Verificar que el guard PASA con el template actual (aún monolito)**

Run: `node -e "import('./scripts/generate-vehicles.mjs').catch(e=>console.log('module side-effects ok'))"` — NO sirve (corre Firestore). En su lugar, comprobar los anclajes a mano:
Run: `node -e "const fs=require('fs');const t=fs.readFileSync('detalle-vehiculo.html','utf8');const A=['<meta charset=\"UTF-8\">','<meta name=\"robots\" content=\"index, follow\">','<title>Detalle de Vehículo | ALTORRA CARS</title>','id=\"og-url\" content=\"https://altorracars.github.io/detalle-vehiculo.html\"','id=\"og-title\"','id=\"og-description\"','id=\"og-image\"','id=\"tw-title\"','id=\"tw-description\"','id=\"tw-image\"','</head>','<div id=\"header-placeholder\"></div>','<script src=\"js/core/historial-visitas.js\"></script>'];const miss=A.filter(a=>!t.includes(a));console.log(miss.length?'FALTAN: '+JSON.stringify(miss):'TODOS LOS ANCLAJES OK ('+A.length+')');"`
Expected: `TODOS LOS ANCLAJES OK (13)`

- [ ] **Step 4: Verificar sintaxis del generador**

Run: `node -c scripts/generate-vehicles.mjs`
Expected: sin salida (OK).

- [ ] **Step 5: Commit**

```bash
git add scripts/generate-vehicles.mjs
git commit -m "SP-5.3 Fase 0: guard de aserción de anclajes en generador (falla ruidoso)"
```

---

## FASE 1 — De-monolitizar mecánicamente (cero cambio visual)

> Regla de oro de esta fase: **mover bytes, no reescribir**. El CSS y el JS se copian VERBATIM. La página debe verse y comportarse EXACTAMENTE igual al terminar. Cualquier diferencia visual = error de extracción.

### Task 1: Extraer el CSS inline a `css/home/detalle-cinematic.css`

**Files:**
- Create: `css/home/detalle-cinematic.css`
- Modify: `detalle-vehiculo.html:50-1206` (reemplazar `<style>…</style>` por `<link>`)

- [ ] **Step 1: Leer el bloque exacto a extraer**

Run: `Read detalle-vehiculo.html offset=50 limit=1157` (líneas 50–1206, desde `<style>` hasta `</style>`).
Confirmar: línea 50 = `    <style>`, línea 1206 = `    </style>`.

- [ ] **Step 2: Crear `css/home/detalle-cinematic.css` con el contenido INTERNO del `<style>` (líneas 51–1205, sin las etiquetas `<style>`/`</style>`)**

Copiar verbatim el CSS (todo lo de adentro). Encabezar el archivo con:
```css
/* ============================================================
   ALTORRA CARS · DETALLE VEHÍCULO — CSS page-specific (SP-5.3)
   Fase 1: extraído verbatim del inline <style> de detalle-vehiculo.html.
   Fase 2: reescrito a cinematic. Carga: <link> en el <head> del template,
   en la MISMA posición que ocupaba el <style> (tras performance-fixes.css)
   para preservar el orden de cascada. <base href="/"> hace que resuelva
   desde la raíz también en /vehiculos/*.html.
   ============================================================ */
```
NO modificar ninguna regla (preservar incluso los `transition: all` de las líneas ~165/202 — su corrección es Fase 2 por reescritura, no ahora).

- [ ] **Step 3: Reemplazar el `<style>…</style>` (50–1206) por el `<link>` en el template**

En `detalle-vehiculo.html`, sustituir las líneas 50–1206 completas por:
```html
    <link rel="stylesheet" href="css/home/detalle-cinematic.css">
```
⚠️ La posición debe ser la misma (donde estaba el `<style>`): después de `<link rel="stylesheet" href="css/performance-fixes.css">` (línea 43) y el bloque de fonts. Esto preserva el orden de fuente para reglas de igual especificidad.

- [ ] **Step 4: Verificar que no quedó CSS huérfano ni se tocaron los bloques críticos**

Run: `node -e "const fs=require('fs');const t=fs.readFileSync('detalle-vehiculo.html','utf8');console.log('detalle-cinematic link:', t.includes('css/home/detalle-cinematic.css'));console.log('header-critical style intacto:', t.includes('#header-placeholder{min-height:80px;display:block}'));console.log('page-loader style intacto:', t.includes('#page-loader{position:fixed'));console.log('.detail-grid YA NO inline:', !t.includes('.detail-grid {'));"`
Expected: `link: true`, ambos críticos `true`, `.detail-grid YA NO inline: true`.

- [ ] **Step 5: Verificar en preview que la página se ve IDÉNTICA**

Arrancar preview estático (skill `verify` / patrón L-20: `npx http-server <ruta-absoluta-repo> -p 8080 -c-1`), navegar a `http://localhost:8080/detalle-vehiculo.html?id=38` (o un id válido), con cache-bust. Confirmar: galería, sidebar, precio, botones, tabs, similares se ven igual que antes. Errores 403 de Firebase en consola son esperados (L-08).

- [ ] **Step 6: Commit**

```bash
git add css/home/detalle-cinematic.css detalle-vehiculo.html
git commit -m "SP-5.3 Fase 1a: extraer CSS inline de detalle a css/home/detalle-cinematic.css (verbatim)"
```

### Task 2: Extraer el JS inline a 4 módulos en `js/public/detalle/`

**Files:**
- Create: `js/public/detalle/detalle-data.js`, `detalle-render.js`, `detalle-gallery.js`, `detalle-page.js`
- Modify: `detalle-vehiculo.html:1439-2309` (reemplazar `<script>…</script>` por 4 `<script src>`)

- [ ] **Step 1: Leer el bloque JS completo a extraer**

Run: `Read detalle-vehiculo.html offset=1439 limit=871` (líneas 1439–2309).
Confirmar: 1439 = `    <script>`, 2309 = `    </script>`. Las funciones y su distribución están en el spec §5.1.

- [ ] **Step 2: Crear `js/public/detalle/detalle-data.js`**

Encabezado + IIFE que cuelga lo necesario de `window`. Contiene (copiados verbatim del bloque): `capitalizar`, `formatCurrency`, `formatKilometers`, `formatCategoria`, `getVehicleIdFromURL` (con su nested `extractIdFromSlug`), `getShareableUrl`, `updateMetaTags`, `injectVehicleSchema`. Exponer en `window.AltorraDetalle` las que otros módulos llaman. Patrón:
```javascript
/* ALTORRA · Detalle — datos/helpers/SEO (SP-5.3). Plain script, scope compartido. */
window.AltorraDetalle = window.AltorraDetalle || {};
(function (D) {
  function capitalizar(str) { /* …verbatim… */ }
  function formatCurrency(amount) { /* …verbatim… */ }
  // … resto verbatim …
  // exponer lo que consumen otros módulos:
  D.capitalizar = capitalizar;
  D.formatCurrency = formatCurrency;
  D.formatKilometers = formatKilometers;
  D.formatCategoria = formatCategoria;
  D.getVehicleIdFromURL = getVehicleIdFromURL;
  D.getShareableUrl = getShareableUrl;
  D.updateMetaTags = updateMetaTags;
  D.injectVehicleSchema = injectVehicleSchema;
})(window.AltorraDetalle);
```
⚠️ Mantener el cuerpo de cada función VERBATIM (solo se envuelven y exponen).

- [ ] **Step 3: Verificar sintaxis**

Run: `node -c js/public/detalle/detalle-data.js`
Expected: sin salida.

- [ ] **Step 4: Crear `js/public/detalle/detalle-render.js`**

Mismo patrón IIFE sobre `window.AltorraDetalle`. Contiene verbatim: `renderVehicleDetail`, `renderFichaTecnica`, `renderCaracteristicas`, `loadSimilarVehicles`, `scrollSimilarCarousel`. Las funciones que llaman a helpers de data las invocan vía `D.formatCurrency(...)` etc. (o las leen del scope global compartido si se prefiere — pero usar `D.` es explícito y seguro). Exponer en `D` las que llama el orquestador (`renderVehicleDetail`, `loadSimilarVehicles`) y `window.scrollSimilarCarousel` SOLO si el markup viejo aún usa `onclick` (en Fase 1 sí lo usa → exponer `window.scrollSimilarCarousel = scrollSimilarCarousel;`).

- [ ] **Step 5: Verificar sintaxis**

Run: `node -c js/public/detalle/detalle-render.js`
Expected: sin salida.

- [ ] **Step 6: Crear `js/public/detalle/detalle-gallery.js`**

IIFE. Estado de galería/lightbox movido a `window.AltorraDetalle` (`currentImages`, `currentImageIndex`, flags de autoplay/lightbox/zoom). Funciones verbatim: `renderGallery`, `initGallery`, `changeMainImage`, `startGalleryAutoplay`, `stopGalleryAutoplay`, `openLightbox`, `closeLightbox`, `updateLightboxImage`, `navigateLightbox`, `renderLightboxDots`, `toggleZoom`, + el listener `keydown` del lightbox. Exponer en `D`: `renderGallery`, `initGallery` (las llama el orquestador en el path realtime).

- [ ] **Step 7: Verificar sintaxis**

Run: `node -c js/public/detalle/detalle-gallery.js`
Expected: sin salida.

- [ ] **Step 8: Crear `js/public/detalle/detalle-page.js` (orquestador, carga ÚLTIMO)**

IIFE. Contiene: estado `currentVehicle` (en `D`), `loadVehicleDetail`, el bootstrap `DOMContentLoaded` + el `onSnapshot` realtime, `shareVehicle`, `shareToWhatsApp`, `showShareToast`, `initTabs`. Llama a las funciones de los otros módulos vía `D.*`. Reglas:
- UN SOLO `DOMContentLoaded` (este).
- En el path realtime: `D.renderGallery()` (rebuild) SIEMPRE antes de `D.initGallery()` (bind), para no doble-enganchar listeners.
- `window.shareVehicle = shareVehicle;` (Fase 1: el markup viejo lo llama por `onclick`).

- [ ] **Step 9: Verificar sintaxis**

Run: `node -c js/public/detalle/detalle-page.js`
Expected: sin salida.

- [ ] **Step 10: Reemplazar el `<script>` inline (1439–2309) por los 4 `<script src>` en el template**

Sustituir las líneas 1439–2309 completas por (en la MISMA posición, tras `<script src="js/public/citas.js"></script>` y el `<script>window.PRERENDERED_VEHICLE_ID…` que inyecta el generador, antes de `page-loader.js`):
```html
    <script src="js/public/detalle/detalle-data.js"></script>
    <script src="js/public/detalle/detalle-render.js"></script>
    <script src="js/public/detalle/detalle-gallery.js"></script>
    <script src="js/public/detalle/detalle-page.js"></script>
```
⚠️ NO tocar `<script src="js/core/historial-visitas.js"></script>` (anclaje crítico del generador). Verbatim.

- [ ] **Step 11: Verificar anclajes del generador + sintaxis de los 4 módulos**

Run: `node -e "const fs=require('fs');const t=fs.readFileSync('detalle-vehiculo.html','utf8');console.log('historial-visitas anchor:', t.includes('<script src=\"js/core/historial-visitas.js\"></script>'));console.log('4 modulos:', ['data','render','gallery','page'].every(m=>t.includes('js/public/detalle/detalle-'+m+'.js')));console.log('script inline removido:', !t.includes('let currentVehicle = null;'));"`
Expected: las 3 → `true`.

- [ ] **Step 12: Verificar en preview — funcionalidad COMPLETA idéntica**

Preview `detalle-vehiculo.html?id=38` con cache-bust. Checklist funcional: la imagen principal carga, thumbnails cambian la principal, autoplay corre, click abre lightbox, flechas/teclado/dots navegan, zoom funciona, los 3 tabs cambian, "similares" scrollea, botón Comparar togglea (texto Comparar↔Agregado), Agendar abre modal de cita, "Hacer pregunta" abre concierge, Compartir funciona. Consola sin errores nuevos (salvo 403 Firebase L-08).

- [ ] **Step 13: Commit**

```bash
git add js/public/detalle/ detalle-vehiculo.html
git commit -m "SP-5.3 Fase 1b: extraer JS inline de detalle a 4 módulos js/public/detalle/ (verbatim, window.AltorraDetalle)"
```

---

## FASE 2 — Reescritura cinematic (CSS + markup)

> Compuerta visual. Aquí SÍ se reescribe. Referencias: `altorra-cars-design-system/project/redesign/Detail.jsx` (composición/clases `dt-*`), `css/home/cinematic.css` (tokens), `css/home/comparar-cinematic.css` (precedente de page-CSS cinematic), y los mockups aprobados (Opción A botones, composición galería+panel sticky). **Regla absoluta: preservar TODOS los IDs del spec §3.1 y las clases-hook que el JS consulta** (`.thumbnail`, `.tab-btn`, `.tab-content`, `.lightbox-container`, `.lightbox-dot`, `.main-image-container`/añadir `.gallery-main`, `.share-toast`). El JS NO se reescribe en esta fase.

### Task 3: Activar tema cinematic en el template + cargar `soft-redesign.css`

**Files:**
- Modify: `detalle-vehiculo.html` (`<body>` + `<head>`)

- [ ] **Step 1: Añadir `data-cin="on"` al `<body>` y `soft-redesign.css`**

En `detalle-vehiculo.html`: cambiar `<body>` por `<body data-cin="on">`. Añadir en el `<head>`, junto al `<link>` de detalle-cinematic, el patrón de perfil/comparar:
```html
    <link rel="stylesheet" href="css/home/soft-redesign.css">
```
(components.js inyecta tokens/chrome automáticamente; soft-redesign explícito como en perfil/comparar.)

- [ ] **Step 2: Verificar que el chrome cinematic + footer (§139) aparecen**

Preview `detalle-vehiculo.html` con cache-bust. El header/footer deben verse cinematic (ya lo hacen vía components.js). El cuerpo aún se ve legacy (CSS no reescrito todavía) — es esperado en este paso.

- [ ] **Step 3: Commit**

```bash
git add detalle-vehiculo.html
git commit -m "SP-5.3 Fase 2a: activar data-cin + soft-redesign en detalle-vehiculo"
```

### Task 4: Reescribir el markup del cuerpo a la composición aprobada

**Files:**
- Modify: `detalle-vehiculo.html` (el bloque `.detail-page` … `</div>` del lightbox, ~markup actual líneas ~1297–1448 del archivo ORIGINAL; tras Fase 1 los números cambian — localizar por `<div class="detail-page">`)

- [ ] **Step 1: Localizar el markup del cuerpo**

Run: `Grep "detail-page|detail-grid|gallery-section|info-sidebar|action-buttons|content-section|similar-section|class=\"lightbox\"" detalle-vehiculo.html -n`
Mapear el rango del markup del cuerpo (galería + sidebar + tabs + similares + lightbox).

- [ ] **Step 2: Reescribir el markup a la composición cinematic aprobada**

Estructura objetivo (basada en `Detail.jsx` + mockups aprobados), **conservando IDs/clases-hook**:
- Wrapper `.detail-page` → puede renombrarse a `.dt-page` PERO mantener `.detail-page` como alias o actualizar el CSS; **más seguro: mantener `.detail-page`/`.detail-grid`** y estilarlos cinematic. (Decisión: conservar nombres de layout existentes; el CSS cinematic los reestiliza. Solo se AÑADEN clases nuevas si hacen falta.)
- Galería: contenedor con `class="main-image-container gallery-main"` (añade `gallery-main` para activar hotspots, §3.2), `<img id="mainImage">`, `<div id="imageCounter">`, `<div id="thumbnailsGrid">` (thumbs fila debajo).
- Sidebar (panel sticky): `<div id="badgesContainer">`, marca + título serif, `<p id="vehicleSubtitle">`, caja precio `<div id="priceContainer">`, `<div id="quickSpecs">`.
- **Botones — Opción A** (orden): WhatsApp `#btnWhatsApp` (full, verde) → Simular `#btnCalculadora` (full, dorado) → fila 4 iconos: Agendar `#btnAgendar.btn-agendar-cita`, Preguntar `#btnAskVehicle[data-action="open-concierge-vehicle"]`, Comparar `#btnComparar` (con `#btnCompararText` + `#btnCompararIcon` svg con `<path>`), Compartir `#btnShare` → pie: Guardar `class="favorite-btn" data-id="<id se setea por JS>"` + sello "Verificado".
  - ⚠️ Migrar `onclick="shareVehicle()"` y `onclick="scrollSimilarCarousel(±1)"` a `addEventListener` (se cablea en detalle-page/render; ver Task 6). En este paso, dejar los botones SIN `onclick` inline.
- Tabs: `.tabs-nav` con 3 `.tab-btn[data-tab="ficha|caracteristicas|descripcion"]`, y 3 `.tab-content#tab-ficha|#tab-caracteristicas|#tab-descripcion` con `#fichaTable`, `#featuresGrid`, `#descriptionBox`.
- Similares: `#similarVehicles` + flechas.
- Lightbox: conservar `#lightbox`, `#lightboxClose`, `#lightboxPrev`, `#lightboxNext`, `#lightboxImage`, `#lightboxCounter`, `#lightboxDots`, `.lightbox-container`.
- Añadir barra sticky móvil (`Detail.jsx` `.dt-sticky`): precio + WhatsApp.

- [ ] **Step 3: Verificar que TODOS los IDs/clases-hook del spec §3.1/§3.2 siguen presentes**

Run: `node -e "const fs=require('fs');const t=fs.readFileSync('detalle-vehiculo.html','utf8');const IDS=['badgesContainer','vehicleTitle','vehicleSubtitle','priceContainer','quickSpecs','btnWhatsApp','btnCalculadora','btnComparar','btnCompararText','btnCompararIcon','btnAgendar','btnAskVehicle','btnShare','mainImage','imageCounter','thumbnailsGrid','lightbox','lightboxClose','lightboxPrev','lightboxNext','lightboxImage','lightboxCounter','lightboxDots','fichaTable','featuresGrid','descriptionBox','similarVehicles'];const miss=IDS.filter(i=>!t.includes('id=\"'+i+'\"'));console.log(miss.length?'FALTAN IDs: '+JSON.stringify(miss):'TODOS LOS IDs OK ('+IDS.length+')');console.log('btn-agendar-cita:', t.includes('btn-agendar-cita'));console.log('open-concierge-vehicle:', t.includes('open-concierge-vehicle'));console.log('favorite-btn:', t.includes('favorite-btn'));console.log('gallery-main:', t.includes('gallery-main'));"`
Expected: `TODOS LOS IDs OK (27)`, y los 4 hooks `true`.

- [ ] **Step 4: Commit (markup, aún sin re-cablear onclick→listener)**

```bash
git add detalle-vehiculo.html
git commit -m "SP-5.3 Fase 2b: markup cinematic del cuerpo (Opción A botones, IDs preservados)"
```

### Task 5: Reescribir `css/home/detalle-cinematic.css` a cinematic

**Files:**
- Modify: `css/home/detalle-cinematic.css` (reemplazar contenido legacy por cinematic)

- [ ] **Step 1: Leer tokens y precedente cinematic**

Run: `Read css/home/cinematic.css limit=30` (tokens `--cin-*`) y `Read css/home/comparar-cinematic.css limit=60` (estilo de page-CSS cinematic).

- [ ] **Step 2: Reescribir el CSS scopeado bajo `body[data-cin="on"]`**

Reglas de diseño (mockups aprobados + §4 del spec):
- Paleta: fondos `--cin-bg`/`--cin-bg-elev`, texto `--cin-ink`/`--cin-ink-soft`/`--cin-ink-faint`, acento `--cin-gold`/`--cin-gold-hot`, líneas `--cin-line`. Título serif `Instrument Serif`, cuerpo `Manrope`.
- Layout: `.detail-grid` galería 1.7fr + panel 1fr sticky. Galería imagen 16:10 + thumbs. Panel: badges, marca, título serif, precio dorado, quick-specs 2×2.
- Botones Opción A: WhatsApp verde full, Simular dorado full, 4 iconos compactos (icono + label debajo, SIN truncar: `white-space:normal`, sin grid de 3 apretado), pie Guardar + Verificado. Estados activos en dorado (NO 6 colores).
- Tabs cinematic, ficha/features en superficies oscuras, similares carrusel, lightbox oscuro.
- Sticky móvil `.dt-sticky` (o equivalente) visible en `@media (max-width:1024px)`.
- §17: NADA de `transition: all` (usar props específicas), animar solo transform/opacity, sin backdrop-filter en listas.
- NO romper las clases-hook que el JS consulta (estilarlas, no renombrarlas).

- [ ] **Step 3: Verificar visualmente en preview (cache-bust) — desktop + móvil**

Preview `detalle-vehiculo.html?id=38`. Validar contra criterios de aceptación del spec §7: se ve cinematic, los 7 botones (incl. Guardar) completos sin truncar, layout galería+panel correcto. Redimensionar a móvil: galería→panel→tabs→similares + sticky CTA. Medir colores con `getComputedStyle` (L-20): superficies cinematic, sin grises fríos `#808080`/colores chillones.

- [ ] **Step 4: Commit**

```bash
git add css/home/detalle-cinematic.css
git commit -m "SP-5.3 Fase 2c: reescribir detalle-cinematic.css a tema cinematic"
```

### Task 6: Re-cablear onclick→addEventListener + activar favorito

**Files:**
- Modify: `js/public/detalle/detalle-page.js` (wire share + favorito + sticky), `js/public/detalle/detalle-render.js` (wire flechas de similares)

- [ ] **Step 1: Cablear los listeners que reemplazan los `onclick` eliminados**

En `detalle-page.js`, dentro del bootstrap (tras render): `document.getElementById('btnShare')?.addEventListener('click', shareVehicle)`. En `detalle-render.js`, al renderizar similares: enganchar las flechas con `addEventListener('click', () => scrollSimilarCarousel(±1))`. (Ya no se depende de `window.shareVehicle`/`window.scrollSimilarCarousel`, pero dejarlos expuestos no daña.)

- [ ] **Step 2: Activar el botón Guardar (favorito) con el sistema existente**

El botón Guardar tiene `class="favorite-btn"`. `favorites-manager.js` busca `.favorite-btn[data-id="<id>"]`. En `detalle-page.js`, tras conocer el vehículo (`currentVehicle`), setear `btnGuardar.dataset.id = currentVehicle.id` y enganchar el click al toggle de favoritos del manager (mismo patrón que las tarjetas del catálogo — revisar cómo `render.js`/`favorites-manager.js` lo cablean en las cards y replicar). Verificar que el manager pinta el estado (clase activa) al cargar.

- [ ] **Step 3: Verificar sintaxis de los módulos tocados**

Run: `node -c js/public/detalle/detalle-page.js && node -c js/public/detalle/detalle-render.js`
Expected: sin salida.

- [ ] **Step 4: Verificar en preview — share, flechas, favorito**

Preview con cache-bust. Compartir funciona (sin `onclick`), flechas de similares scrollean, botón Guardar togglea el corazón y persiste (recargar y sigue guardado). Comparar/Agendar/Preguntar siguen OK.

- [ ] **Step 5: Commit**

```bash
git add js/public/detalle/detalle-page.js js/public/detalle/detalle-render.js
git commit -m "SP-5.3 Fase 2d: re-cablear share/flechas a addEventListener + activar favorito"
```

---

## FASE 3 — Regenerar, cache, cerebro

### Task 7: Regenerar las 27 páginas + verificar

**Files:**
- Regenera: `vehiculos/*.html` (×27), `marcas/*.html`, `sitemap.xml`

- [ ] **Step 1: Verificar el checklist anti-regresión del generador (ANTES de generar)**

Run: el comando del Task 0 Step 3 (los 13 anclajes) → debe seguir dando `TODOS LOS ANCLAJES OK (13)`. Además confirmar `<base href="/">` presente y archivo UTF-8.

- [ ] **Step 2: Actualizar el fallback de `PRERENDERED_VEHICLE_ID` en el generador**

Run: `Grep "let currentVehicle = null|PRERENDERED_VEHICLE_ID|historial-visitas" scripts/generate-vehicles.mjs -n`
El fallback (`    <script>\n        let currentVehicle = null;`) ya no existe en el template. Actualizarlo para anclar al nuevo bootstrap (`<script src="js/public/detalle/detalle-page.js"></script>`) o, si el anclaje primario (`historial-visitas.js`) es suficiente, simplificar. Verificar `node -c scripts/generate-vehicles.mjs`.

- [ ] **Step 3: Regenerar (requiere red + Firestore)**

Run: `npm run generate`
Expected: `+ vehiculos/<slug>.html` ×27 sin lanzar el guard de aserción. Si lanza → un anclaje se rompió; arreglar el template antes de continuar. (Si no hay red local, el cron CI regenera cada 4h — pero preferible local para verificar en el mismo commit.)

- [ ] **Step 4: Spot-check 2 páginas generadas**

Run: `node -e "const fs=require('fs');const t=fs.readFileSync('vehiculos/kia-k3-vibrant-2025-38.html','utf8');console.log('title real:', /K3 VIBRANT/.test(t));console.log('canonical:', t.includes('rel=\"canonical\"'));console.log('PRERENDERED:', t.includes('PRERENDERED_VEHICLE_ID'));console.log('detalle-cinematic link:', t.includes('css/home/detalle-cinematic.css'));console.log('4 modulos:', ['data','render','gallery','page'].every(m=>t.includes('detalle-'+m+'.js')));console.log('JSON-LD x2:', (t.match(/application\\/ld\\+json/g)||[]).length>=2);"`
Expected: todo `true`, JSON-LD ≥2.

- [ ] **Step 5: Verificar 1 página generada en preview**

Preview `http://localhost:8080/vehiculos/kia-k3-vibrant-2025-38.html` con cache-bust. Debe verse cinematic igual que la root, con datos del vehículo. (Aquí PRERENDERED_VEHICLE_ID puebla sin query param.)

- [ ] **Step 6: Commit**

```bash
git add vehiculos/ marcas/ sitemap.xml scripts/generate-vehicles.mjs
git commit -m "SP-5.3 Fase 3a: regenerar 27 páginas vehiculos + fallback PRERENDERED actualizado"
```

### Task 8: Cache bump + cerebro + cierre

**Files:**
- Modify: `service-worker.js`, `js/core/cache-manager.js`, docs del cerebro

- [ ] **Step 1: Cache bump (§4)**

Leer el valor vigente (hoy `v20260531290000`), bumpear a un timestamp MAYOR (p.ej. `v20260531300000`) en AMBOS: `service-worker.js` `CACHE_VERSION` y `js/core/cache-manager.js` `APP_VERSION` (el de cache-manager va SIN prefijo `v`). Verificar que coinciden:
Run: `node -e "const fs=require('fs');const sw=fs.readFileSync('service-worker.js','utf8').match(/CACHE_VERSION = '(v\\d+)'/)[1];const cm=fs.readFileSync('js/core/cache-manager.js','utf8').match(/APP_VERSION = '(\\d+)'/)[1];console.log('SW:',sw,'CM:',cm,'match:', sw==='v'+cm);"`
Expected: `match: true`.

- [ ] **Step 2: Actualizar `docs/20-MEMORIA-ESPACIAL.md` (Reflejo de Frescura §G.4)**

Añadir fila `js/public/detalle/ (4)` a la tabla de `js/` + nota de `css/home/detalle-cinematic.css`. Bump del conteo si aplica.

- [ ] **Step 3: Consolidar ADR §140 + índice + lóbulo UX + estado**

Apéndar ADR `## 140` a `docs/99-HISTORIAL-ADR.md` (formato §2: causa/solución/no-regresión/tests/anti-patterns/archivos/doctrina), fila `§140` en `docs/00-INDICE.md` (con offset correcto — verificar con `brain:check`), actualizar `docs/43-UX.md` (cuerpo detalle → cinematic, monolito resuelto), `docs/05-ESTADO-GLOBAL.md` (cache version + estado) y podar `docs/10-MEMORIA-CORTO-PLAZO.md`.

- [ ] **Step 4: `brain:check` SANO**

Run: `npm run brain:check`
Expected: `✅ CEREBRO SANO` (sin huérfanas, sin desync, caps OK).

- [ ] **Step 5: Verificación final completa (skill verify)**

Preview final root + 1 generada, checklist de aceptación §7 completo (cinematic, 7 botones sin truncar, toda la funcionalidad, móvil sticky, consola limpia salvo L-08).

- [ ] **Step 6: Commit + entregar mensaje al cliente**

```bash
git add service-worker.js js/core/cache-manager.js docs/
git commit -m "SP-5.3 Fase 3b: cache bump v20260531300000 + ADR §140 + cerebro"
```
Entregar al cliente el resumen + recordatorio Ctrl+Shift+R. NO push sin pedido explícito.

---

## Notas de ejecución

- **Sin framework de tests**: la verificación es `node -c` (sintaxis) + comprobaciones de anclajes con Node one-liners + preview manual (L-20 cache-bust, L-08 403 esperados). No inventar un test runner.
- **Orden de las dos compuertas es la garantía anti-regresión**: NO saltar Fase 1 directo a cinematic. La Fase 1 (idéntica) prueba que la de-monolitización y el generador están sanos ANTES de añadir riesgo visual.
- **Las 27 páginas son derivadas**: entre Fase 1/2 (template) y Fase 3 (regenerar) hay una ventana donde las generadas están desfasadas del template — es aceptable (el cron las regenera igual; convergen en Fase 3). No desplegar a producción a mitad si se quiere consistencia estricta.
- **Si el guard del generador lanza**: es la red de seguridad funcionando — un anclaje se rompió en el rediseño; arreglar el template, no el guard.
