# Rediseño del index — Spec de diseño (Fase 1: SP-1 + SP-2 + SP-3)

- **Fecha**: 2026-05-26
- **Estado**: Propuesto (pendiente de review del usuario)
- **Branch**: `refactor/estructura`
- **Origen del diseño**: `altorra-cars-design-system/project/redesign/` (tema "cinematic", inspirado en HarmonyOS, creado con Claude Design)
- **Objetivo del cliente**: réplica visual exacta del diseño nuevo + 100% de la funcionalidad actual preservada, sin romper nada, respetando la organización modular del frontend (§119).

---

## 1. Objetivo y contexto

Migrar la portada pública (`index.html`) al nuevo tema. El diseño nuevo está construido como SPA **React 18 + Babel-en-navegador**; el sitio vivo es **HTML/CSS/JS vanilla** sin framework ni bundler. Se decide **portar a vanilla** (ver §2).

**Fase 1 cubre tres subproyectos acoplados:**
- **SP-1** — Index nuevo: 12 secciones + widgets auxiliares, con el diseño exacto y enganchado a la data/lógica existentes.
- **SP-2** — Admin destacados: quitar la subida de "PNG sin fondo", usar la imagen principal del vehículo, añadir un campo libre `featuredTag`, y quitar el tope de 6 destacados → alimenta la sección "La colección".
- **SP-3** — Admin banners ricos: dar forma a la sección Banners para alimentar dinámicamente el banner "Lo que está pasando esta semana".

**Fuera de alcance (fases posteriores):**
- **SP-4** — Motor de recomendaciones + analytics (ranking por visitas/engagement, instrumentación GA, store de popularidad). La sección "Tu rastro" funciona en Fase 1; el estado "Recomendados" (sin historial) usa un placeholder con data existente (ver §4, sección 6).
- **SP-5** — Resto de páginas del rediseño (catálogo, detalle, comparador, marcas, nosotros, contacto, etc.) + promover el chrome (nav/footer) nuevo a global.

---

## 2. Decisión de arquitectura: vanilla port

**Decisión**: traducir el markup JSX (`Home.jsx`, `components.jsx`, `QuickTools.jsx`) a HTML + JS vanilla; reutilizar el CSS del `redesign/` **1:1** (es CSS plano); re-crear los motions en JS vanilla.

**Rationale**:
- **Consistencia**: el resto del sitio es vanilla; meter React-en-navegador en una sola página rompe la coherencia.
- **Performance (§17)**: Babel compilando JSX en cada carga mata el LCP.
- **SEO**: el render client-side de React perjudica la indexación; el sitio depende de SEO (páginas de vehículos generadas, schema, sitemap).
- **Sin tooling nuevo**: la migración a Vite/Cloudflare está bloqueada por presupuesto (TODO-01/02).

**Implicación de "exacto"**: la apariencia queda pixel-idéntica (mismo CSS); el comportamiento (parallax, word-reveal, carruseles con drag, loop infinito de promos, marquee, reveals por IntersectionObserver, counters, tilt 3D) se re-crea en vanilla para ser visualmente y funcionalmente idéntico. Lo único que cambia es el motor por debajo.

---

## 3. Organización de archivos (respeta la modularidad §119)

### 3.1 CSS nuevo (copiado del `redesign/`, renombrado para no colisionar con `css/tokens.css` y `css/style.css` actuales)
- `css/home/tokens-redesign.css` ← tokens del diseño nuevo (colores, `--cin-*`, radios, sombras, easings).
- `css/home/base-redesign.css` ← reset/utilidades del diseño nuevo.
- `css/home/chrome-redesign.css` ← nav + footer nuevos (extraído de `redesign/styles.css`, solo lo de nav/footer).
- `css/home/cinematic.css` ← **todo el homepage** (hero, carruseles, promos, trail, marcas, manifiesto, conv, stats, end). Copia de `redesign/cinematic.css` (sin las partes de detail/modales que no aplican al index).
- `css/home/quicktools.css` ← dock flotante (copia de `redesign/quicktools.css`).

### 3.2 JS nuevo (modular, en `js/public/home/`)
- `js/public/home/home.js` — orquestador del index: monta cada sección con data viva, conecta los contratos existentes.
- `js/public/home/home-motion.js` — helpers de motion: parallax del hero, word-reveal, IntersectionObserver reveals, counters, tilt 3D, scroll-progress.
- `js/public/home/home-carousels.js` — carruseles: disponibles (scroll-snap + flechas), colección (drag-to-scroll), promos (loop infinito + swipe), marquee de marcas.
- `js/public/home/home-chrome.js` — nav + footer nuevos del index: markup + efecto de ocultarse (máquina de 3 estados: expandido → colapsado a rueda → oculto), mega-dropdown, drawer móvil. Integra con `auth.js` (estado login), `favoritesManager` (pip de favoritos) y la data de marcas/categorías.
- `js/public/home/quicktools.js` — dock flotante; badges/links apuntados a las fuentes reales (ver §5.1).

### 3.3 Reutilizado SIN modificar (cero riesgo de regresión)
`js/core/database.js` (`vehicleDB`), `favorites-manager.js`, `historial-visitas.js` (`vehicleHistory`), `render.js`, `js/public/comparador.js` (`vehicleComparator`), `auth.js`, `firebase-config.js`, `cookies.js`, `js/concierge/concierge.js`, `js/public/contact-forms.js` (modales vender/financiar), `js/public/citas.js` (modal cita).

### 3.4 Eliminación total del diseño viejo — SOLO en `index.html`
`index.html` dejará de **enlazar** el CSS de diseño viejo del homepage (`css/hero.css`, `css/featured-week-banner.css`, `css/historial-visitas.css`) y cargará en su lugar los `css/home/*`. Se conservan los CSS de funcionalidad transversal que siguen vivos y tienen archivo propio (toasts `css/toast-notifications.css`, cookies `css/cookies.css`, concierge `css/concierge.css`, modales `css/contact-forms.css`/`css/citas.css`, page-loader `css/page-loader.css`).

> **`css/style.css` NO se edita** (es compartido por todas las páginas). El index deja de enlazarlo solo si todo lo que aún necesita queda cubierto por sus archivos propios + `css/home/*`. Durante implementación se verifica qué estilos compartidos (p.ej. modales, toasts) sigue requiriendo el index y se garantiza que estén disponibles antes de quitar cualquier `<link>`. **Ninguna otra página se toca** → su CSS/JS queda intacto. Así no hay duplicidad ni conflicto visual en el index.

> Nota de transición: en Fase 1 el index tendrá el chrome (nav/footer) nuevo y las demás páginas conservarán el actual hasta SP-5. Es una migración por fases (el cliente fusiona por pasos vía PR).

---

## 4. SP-1 — Secciones del index (diseño exacto + wiring funcional)

**Orden real** (de `Home.jsx`, autoritativo): Hero → Vehículos disponibles → La colección → Categorías → Promos → Tu rastro → 16 marcas → Manifiesto → Vende con nosotros → Stats → Una ventana (newsletter) → Footer.

1. **Hero** — "Encuentra el Auto de tus Sueños", bg parallax (`heroindex.webp`), reloj en vivo (America/Bogota), word-reveal del headline.
   - Buscador: replica visual del diseño; **funcionalidad exacta de la actual** → `initHeroSearch()` redirige a `busqueda.html?buscar=<term>`, autocomplete desde `vehicleDB`, búsquedas recientes (`localStorage['altorra-recent-searches']`), atajo "/". Se mantienen los contratos de IDs o se re-apuntan en `home.js`.

2. **Vehículos disponibles** (carrusel) — diseño exacto (chips OFERTA/USADO, precio con tachado, specs, corner-marks, glow hover).
   - Data real: `vehicleDB.getAllVehicles()` filtrado a `estado==='disponible'`, orden actual (`prioridad` → `destacado` → `oferta` → `year`). Campos: `imagen`, `marca`, `modelo`, `year`, `precio`, `precioOferta`/`oferta`, `tipo` (nuevo/usado), `transmision`, `kilometraje`, `motor`.
   - Card → URL slug SEO actual (`getVehicleDetailUrl` → `vehiculos/<slug>.html`), NO `detail.html`.
   - **Favorito** funcional: `favoritesManager.handleHeartClick` (auth-gate + Firestore `clientes/{uid}.favoritos`). **Comparar** funcional: `vehicleComparator.toggle` (localStorage `altorra_comparador`, widget → `comparar.html`). En el diseño "COMPARAR" es decorativo; aquí se hace funcional.
   - Flechas prev/next con scroll-snap.

3. **La colección, esta semana** — reemplaza "Destacados de la semana" (`#fw-banner`). Cards editoriales con drag-scroll, chip de TAG, logo de marca.
   - Data: vehículos `destacado===true` (vía `vehicleDB.getFeatured()`), imagen = `v.imagen`, tag = `v.featuredTag` (SP-2). Card → URL slug SEO.

4. **Empieza por cómo lo manejas** (categorías) — 4 tiles con reveal por clip-path.
   - Links a las páginas reales: `vehiculos-suv.html`, `vehiculos-pickup.html`, `vehiculos-sedan.html`, `vehiculos-hatchback.html`. El contador ("36 unidades") = conteo real por categoría desde `vehicleDB`.

5. **Lo que está pasando esta semana** (banner promos) — reemplaza `#promoBannerSection`. Carrusel full-bleed con loop infinito + swipe.
   - Data: dinámica desde admin banners ricos (SP-3). Campos por slide: `badge`, `rateValue`/`rateLabel` (chip "0.95% MV / TASA DESDE"), `eyebrow`, `headline`, `subtext`, `pills[]` (≤3), `ctaLabel`/`ctaLink`, `image`. CTAs `/`-prefijados → URL; otros → modal existente (`data-modal=…`).

6. **Tu rastro** (últimos vistos) — card grande destacada + lista lateral; "Limpiar rastro".
   - Data: `vehicleHistory` real (localStorage `altorra_vehicle_history`, mirror Firestore `clientes/{uid}.vehiculosVistos`). Muestra los últimos 5.
   - **Estado sin historial** (`vehicleHistory.hasHistory()===false`): variante "Recomendados — los que deberías echarle un ojo". En Fase 1 se rellena con un **placeholder de data existente** (destacados; si <5, completa con los más nuevos). El ranking real por visitas/engagement es SP-4.

7. **16 marcas. Una vitrina.** — marquee de logos.
   - Data: `vehicleDB.getAllBrands()` (colección `marcas`, campos `id`/`nombre`/`logo`). Link `marca.html?marca=<id>`. El número del headline refleja el conteo real de marcas.

8. **Manifiesto** — estática, reveal palabra-por-palabra al scroll.

9. **Vende con nosotros** — hilo de chat (bubbles) con reveal escalonado. CTA → flujo de consignación/avalúo existente (modal `data-modal="vende-auto"` o página de consignación).

10. **Stats** — counters animados. Cifras reales donde mapean (total vehículos, total marcas); el resto (copy de marketing tipo "21 días", "0%") se mantiene como copy configurable.

11. **Una ventana, todos los carros** + **newsletter** — pitch de cierre + form de email.
    - Newsletter: captura al mismo path de leads públicos existente (Firestore `solicitudes` con `tipo:'newsletter'`, vía el mecanismo de `contact-forms`/concierge ya permitido por reglas). Si el path no aplica en implementación, fallback a estado de éxito client-side.

12. **Footer nuevo** — espejo del diseño (wordmark "ALTORRA" Cardo, watermark, 3 columnas: marca / Hablemos / Conéctate, bottom legal).
    - **Tarjetas sociales adaptadas**: se portan las 3 tarjetas actuales (`.footer-soc--wa/ig/fb`) con sus URLs reales (`wa.me/573235016747`, `instagram.com/altorracars/`, `facebook.com/share/14XKk6MCmiT/`) al estilo del footer nuevo.
    - Iconos `chat`/`mail` faltantes en el diseño se sustituyen por SVG reales.

> Todos los arrays de muestra del diseño (`AVAILABLE`, `VEHICLES`, `BRANDS`, `CATEGORIES`, `PROMOS`, `TRAIL_INITIAL`) se eliminan; la data sale de Firebase. `redesign/data.js` NO se reutiliza (está corrupto en líneas 119-251 y no aplica).

---

## 5. SP-1 — Widgets auxiliares y chrome

### 5.1 QuickTools (dock flotante inferior-izquierdo) — NET-NEW
- Markup/CSS portados de `QuickTools.jsx` + `quicktools.css`. Mount en `#quicktools-root`. Ocultar al scrollear hacia abajo (sincronizado con el nav).
- 5 herramientas, enganchadas a las fuentes reales:
  - **Simulador** → `simulador-credito.html` (NO `simulator.html`).
  - **Comparar** → `comparar.html`; badge = `JSON.parse(localStorage['altorra_comparador']).length`.
  - **Favoritos** → `favoritos.html`; badge = conteo de `favoritesManager`.
  - **Historial** → `favoritos.html#history` (o sección de historial); badge = `vehicleHistory.getCount()`.
  - **Financiar** → abre el modal de financiación existente (`#financiacion-modal` vía `data-modal="financiacion"`).
- **Resolución de colisión**: QuickTools **reemplaza** la píldora de comparación standalone en el index (ya incluye "Comparar" con badge). ALTOR queda en inferior-derecha. En móvil se respeta la separación para no solaparse.
- Alcance: index-only en Fase 1 (promovible a global en SP-5).

### 5.2 ALTOR (concierge, inferior-derecha) — MAPS-TO-EXISTING
Se mantiene `window.AltorraConcierge` (`js/concierge/concierge.js`) tal cual — es el bot real (asesor humano + bot + WhatsApp + leads a Firestore). El `Altor.jsx` del diseño es un mock; NO se porta.

### 5.3 Modales — MAPS-TO-EXISTING
Los CTAs nuevos (nav "Publica tu vehículo", CTAs de promos, QuickTools "Financiar") se recablean a los triggers existentes: `data-modal="vende-auto"` (`#vende-auto-modal`), `data-modal="financiacion"` (`#financiacion-modal`), cita (`#appointment-modal` vía `citas.js`), auth (`auth.js`, `#btnLogin`/`#btnRegister`). NO se introduce `window.AltorraModals`.

### 5.4 Nav: mega-dropdown + drawer móvil
- "Vehículos" dropdown: Por categoría (SUV/Pickup/Sedán/Hatchback → páginas de categoría) + Por condición (Nuevos/Usados/Camionetas/Ver todos → páginas/búsqueda reales).
- Drawer móvil: inicio, vehículos (búsqueda), marcas, simulador, comparar, nosotros, contacto, reseñas, favoritos.

### 5.5 A IGNORAR (no portar)
- **AltorraTweaks panel** (panel de edición de Claude / dev-only).
- **CursorLight** (código muerto, nunca montado).
- `data-screen-label` (overlay dev).

---

## 6. SP-2 — Admin: destacados → "La colección"

- **Quitar** del form de vehículo el bloque "PNG sin fondo": UI (`#cutoutUploadArea`, `#cutoutFileInput`, `#cutoutPreviewArea/Img`, `#vFeaturedCutoutPng`) y la lógica (`handleCutoutFile`, `uploadCutoutToStorage`, `renderCutoutPreview`, `clearCutoutPng`, listeners) en `js/admin/admin-vehicles.js`. Dejar de escribir `featuredCutoutPng`.
- "La colección" usa `v.imagen` (la imagen principal del vehículo).
- **Añadir** campo libre `featuredTag` (string): input nuevo en el bloque de publicación (`admin.html`), guardado en `vehiculos/{id}` junto a `featuredOrder`, cargado en edición, persistido en el snapshot de autosave.
- **Quitar el tope de 6** destacados (el cliente lo quiere sin límite): eliminar la validación de cap en ambos paths (toggle de tabla y form). Revisar el render del homepage para que soporte N destacados (carrusel, no grid fijo).
- Limpieza opcional: el `#fw-banner` (featured-week-banner) actual queda reemplazado por "La colección"; se retira del index (no de otras páginas si lo usaran).

---

## 7. SP-3 — Admin: banners ricos → "Lo que está pasando esta semana"

- **Modelo de datos**: extender la colección `banners` existente con una posición nueva `home_promo` y campos: `badge`, `rateValue`, `rateLabel`, `eyebrow`, `headline`, `subtext`, `pills` (array ≤3), `ctaLabel`, `ctaLink`, `image`, más los existentes (`active`, `order`, meta). Reusar el upload a Storage `banners/` que ya existe.
- **Admin**: extender `#bannerModal` (`admin.html`) con los campos nuevos, mostrados condicionalmente cuando `position==='home_promo'` (patrón `toggleCategoryField` existente); extender `saveBanner` en `js/admin/admin-banners.js`.
- **Homepage**: nuevo consumidor en `home.js` que lee `banners` activos con `position==='home_promo'` (orden `order`) y pinta el carrusel de promos. El `loadPromoBanners` actual (`position==='promocional'`) se deja intacto para no romper nada; el index nuevo consume `home_promo`.

---

## 8. Data flow (resumen)

```
Firestore                         vehicleDB (cache localStorage, onSnapshot)
  vehiculos  ──┐                      │
  marcas    ──┼──► window.vehicleDB ──┼─► home.js ──► render de secciones
  banners   ──┘                      │
clientes/{uid}.favoritos  ─► favoritesManager ─► hearts + pip + QuickTools badge
localStorage altorra_vehicle_history ─► vehicleHistory ─► Tu rastro + badge
localStorage altorra_comparador      ─► vehicleComparator ─► Comparar + badge + comparar.html
auth.js (Firebase Auth)              ─► estado login del nav nuevo (home-chrome.js)
```

---

## 9. No-regresión (contratos a preservar)

- Búsqueda: redirección `busqueda.html?buscar=<term>` (no `?search`/`?q`).
- Colecciones Firestore: `vehiculos`, `marcas`, `banners` (intactas; SP-3 solo añade campos/posición).
- Favoritos: `clientes/{uid}.favoritos` + caché `altorra_fav_cache_<uid>`.
- Historial: `localStorage['altorra_vehicle_history']` + `clientes/{uid}.vehiculosVistos`.
- Comparador: `localStorage['altorra_comparador']` → `comparar.html`.
- Marcas: link `marca.html?marca=<id>`. Categorías: `vehiculos-<cat>.html`.
- Detalle: URL slug SEO `vehiculos/<slug>.html` (vía `getVehicleDetailUrl`).
- Concierge, modales (vender/financiar/cita/auth), page-loader, toasts, cookies: intactos.
- Las demás páginas comparten `js/core/*` → no se modifican esos módulos (solo se añaden `js/public/home/*`).
- **Cache bump** obligatorio (§4): `service-worker.js CACHE_VERSION` + `js/cache-manager.js APP_VERSION` (timestamp MAYOR a `v20260526002104`).
- **IAP §37** antes de cada commit; `node -c` en cada JS nuevo.

---

## 10. Error handling

- Data Firebase vacía / sin conexión: cada sección con estado vacío o skeleton (reusar patrón de `vehicleDB` + skeletons existentes); el index nunca queda roto si una colección está vacía.
- `vehicleDB` aún no cargado: las secciones esperan a `vehicleDB.loaded`/`onChange` (patrón actual), no asumen data síncrona.
- Sin destacados: "La colección" se oculta o muestra estado vacío (no error).
- Sin banners `home_promo`: "Lo que está pasando" se oculta (no error).
- `favoritesManager`/`vehicleComparator` aún no cargados: los badges de QuickTools muestran 0 y se actualizan al cargar (guardas `typeof`).
- `prefers-reduced-motion`: todos los motions respetan el media query (ya está en el CSS del diseño).

---

## 11. Testing / validación (antes de declarar OK)

Servir local y verificar en navegador (golden path + edge cases):
- Búsqueda redirige con `?buscar=` y el autocomplete sugiere desde data real.
- Carrusel de disponibles carga de Firebase; precio/oferta/badges/specs correctos; card navega al slug SEO.
- Favorito: requiere login, persiste, sincroniza todos los corazones de la página, actualiza pip y badge de QuickTools.
- Comparar: agrega/quita, widget aparece, "Comparar ahora" → `comparar.html`; badge de QuickTools refleja el conteo.
- "La colección" muestra destacados con tag e imagen principal; sin tope de 6.
- Categorías enlazan a sus páginas; contadores reales.
- Promos: carrusel con loop infinito + swipe; data desde admin `home_promo`.
- Tu rastro aparece tras visitar un vehículo; sin historial muestra "Recomendados" (placeholder).
- Marcas: marquee con data real; link `marca.html?marca=`.
- Nav: efecto de ocultarse (3 estados) fluido; dropdown y drawer enlazan bien; estado login correcto.
- QuickTools: abre/cierra, oculta al scroll, links/badges correctos, no colisiona con ALTOR.
- Footer: tarjetas sociales con URLs reales.
- Responsive (móvil/tablet/desktop) + `prefers-reduced-motion`.
- Regresión: abrir otras páginas (catálogo, detalle, marca, favoritos) y confirmar que siguen funcionando (comparten `js/core`).
- Admin: guardar un vehículo destacado con tag (sin el campo de cutout); crear un banner `home_promo` y verlo en el index.

---

## 12. Decisiones diferidas / a confirmar en review

- **Newsletter (sección 11)**: destino propuesto = lead path existente (`solicitudes`, `tipo:'newsletter'`). Confirmar o elegir client-only en Fase 1.
- **Stats (sección 10)**: cifras de marketing ("21 días", "2400+", "0%") — confirmar valores o hacerlas configurables.
- **Chrome nuevo**: index-only en Fase 1 (confirmado por el usuario; global en SP-5).
- **"Recomendados" placeholder**: destacados + más nuevos en Fase 1 (confirmado); ranking real en SP-4.

---

## 13. Gotchas del mirror (de la validación)

- `redesign/data.js` líneas 119-251 corruptas → NO reutilizar (vamos a Firebase).
- `Home.jsx` usa arrays hardcodeados → reemplazar todos por data viva.
- Footer del diseño: iconos `I.chat`/`I.mail` indefinidos → usar SVG reales.
- QuickTools usa keys placeholder (`alt-cmp`/`alt-fav`/`alt-seen`) → re-apuntar a las reales (`altorra_comparador`, favoritesManager, `altorra_vehicle_history`).
- QuickTools links `simulator.html`/`compare.html`/`favorites.html` → re-apuntar a `simulador-credito.html`/`comparar.html`/`favoritos.html`.
- Tipografías reales: Manrope (sans) + Instrument Serif (itálicas doradas) + Cardo (wordmark) vía un solo `<link>` de Google Fonts (NO Poppins).
