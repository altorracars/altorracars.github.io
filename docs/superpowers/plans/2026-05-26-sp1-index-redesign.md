# SP-1 — Index nuevo (vanilla port del rediseño) · Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: `superpowers:subagent-driven-development`. Pasos con checkbox (`- [ ]`). Este es un **PORT**: la fuente de verdad del diseño son los archivos de `altorra-cars-design-system/project/redesign/`; cada tarea cita el origen exacto (archivo + líneas) y el subagente lee ese origen y lo traduce a HTML/CSS/JS vanilla. NO se inventa diseño nuevo.

**Goal:** Reemplazar la portada pública (`index.html`) por el tema "cinematic" del rediseño, replicándolo pixel-fiel en vanilla y preservando el 100% de la funcionalidad actual + la data de SP-2 (destacados+tag) y SP-3 (banners `home_promo`).

**Architecture:** CSS del rediseño copiado 1:1 a `css/home/*` (namespaced). Markup de las 12 secciones + nav + footer + QuickTools portado de `Home.jsx`/`components.jsx`/`QuickTools.jsx` a `index.html`. Comportamiento (motions, carruseles, búsqueda, chrome) re-creado en `js/public/home/*` vanilla, enganchado a la infra existente (`js/core/*`). Chrome (nav/footer) index-only en Fase 1. Se trabaja en `refactor/estructura` (producción = `main`, intacta hasta el merge).

**Tech Stack:** HTML/CSS/JS vanilla, Firebase Compat (Firestore via `window.vehicleDB`). Verificación: `node -c` en cada JS + E2E manual en navegador (no hay test runner). El cliente commitea.

---

## Pre-flight — Contratos a PRESERVAR (no-regresión)

El subagente de cada tarea debe respetar estos contratos (verificarlos leyendo el código actual):
- **Búsqueda**: `initHeroSearch()` (`js/core/main.js`) → redirige `busqueda.html?buscar=<term>`; depende de `#heroSearchInput` + `#heroSearchDropdown`. localStorage `altorra-recent-searches`.
- **Vehículos**: `window.vehicleDB` (colección `vehiculos`), `renderVehicleCard()` (`js/core/render.js`); campos: `imagen, marca, modelo, year, precio, precioOferta/oferta, tipo(nuevo|usado), transmision, kilometraje, motor`. Card → `getVehicleDetailUrl()` (slug `vehiculos/<slug>.html`).
- **Favoritos**: `.favorite-btn[data-id]` → `window.favoritesManager.handleHeartClick()` (Firestore `clientes/{uid}.favoritos`, auth-gate). Contadores `favCount`/`favCountMobile`/`favoritesCount`.
- **Comparador**: `.btn-compare[data-compare]` → `window.vehicleComparator.toggle()` (localStorage `altorra_comparador`, widget → `comparar.html`).
- **Historial**: `window.vehicleHistory` (localStorage `altorra_vehicle_history`), `hasHistory()`/`getHistoryIds()`.
- **Marcas**: `vehicleDB.getAllBrands()` (colección `marcas`, campos `nombre`/`logo`); link `marca.html?marca=<id>`.
- **Banners promos**: colección `banners`, `active===true && position==='home_promo'`, orderBy `order` (SP-3). Campos: `title`(titular, `*x*`=dorado), `subtitle`(subtexto), `badge, eyebrow, rateValue, rateLabel, pills[], cta`(label)`, link`(url)`, image`.
- **Categorías**: links a `vehiculos-suv.html` / `vehiculos-pickup.html` / `vehiculos-sedan.html` / `vehiculos-hatchback.html`. Conteos por categoría desde `vehicleDB`.
- **Modales**: CTAs → `data-modal="vende-auto"` (`#vende-auto-modal`), `data-modal="financiacion"` (`#financiacion-modal`), cita (`js/public/citas.js`), auth (`js/core/auth.js`, `#btnLogin`).
- **Concierge**: `window.AltorraConcierge` (`js/concierge/concierge.js`) se mantiene (bot dorado abajo-derecha). NO portar `Altor.jsx`.
- **Footer social**: tarjetas `.footer-soc--wa/ig/fb` con URLs reales `wa.me/573235016747`, `instagram.com/altorracars/`, `facebook.com/share/14XKk6MCmiT/`.
- **Loader/cookies/toasts**: `#page-loader`, `js/public/cookies.js`, toasts existentes siguen cargando.
- **A IGNORAR del rediseño**: `AltorraTweaks` (panel dev), `CursorLight` (dead code), `data.js` (corrupto), arrays hardcodeados de `Home.jsx`, `Altor.jsx`/`Modals.jsx` (usamos los existentes).

## File structure
- **Crear CSS**: `css/home/tokens-redesign.css`, `css/home/base-redesign.css`, `css/home/chrome-redesign.css`, `css/home/cinematic.css`, `css/home/quicktools.css`.
- **Crear JS**: `js/public/home/home.js` (orquestador), `home-motion.js`, `home-carousels.js`, `home-chrome.js`, `quicktools.js`.
- **Modificar**: `index.html` (head + body completos), `service-worker.js`, `js/core/cache-manager.js`, `docs/05-ESTADO-GLOBAL.md`.
- **Reusar intactos**: `js/core/{database,render,favorites-manager,historial-visitas,main,components,auth,firebase-config}.js`, `js/public/{comparador,cookies,contact-forms,citas}.js`, `js/concierge/concierge.js`.

---

### Task 1: Fundación — CSS + fuentes + assets

**Source:** `altorra-cars-design-system/project/redesign/{tokens.css, base.css, styles.css, cinematic.css, quicktools.css}` + el `<link>` de Google Fonts en `redesign/index.html:11`.

- [ ] **Step 1: Copiar CSS a `css/home/`** — Copia `redesign/tokens.css`→`css/home/tokens-redesign.css`, `redesign/base.css`→`css/home/base-redesign.css`, `redesign/cinematic.css`→`css/home/cinematic.css`, `redesign/quicktools.css`→`css/home/quicktools.css`. De `redesign/styles.css`, extrae SOLO las reglas de **nav (`.alt-nav*`, logo, dropdown, drawer) y footer (`.alt-footer*`, `.footer-*`)** a `css/home/chrome-redesign.css` (lee el archivo; el resto de styles.css es legacy/no aplica al index).
- [ ] **Step 2: Verificar variables CSS** — Confirma que `cinematic.css` define `--cin-display`/`--cin-sans` (L18-19) y `tokens-redesign.css` los tokens. Si `cinematic.css` o `chrome-redesign.css` dependen de variables de `tokens-redesign.css`, el orden de carga (Task 2) debe ser tokens → base → chrome → cinematic → quicktools.
- [ ] **Step 3: Assets** — Lista los assets que referencian el CSS y el markup (mín.: `multimedia/heroindex.webp` para el hero, `multimedia/categories/*.jpg`, `multimedia/Logos/*.webp`). Verifica cuáles existen ya en el repo (`multimedia/`); los que falten (probablemente `heroindex.webp`) cópialos desde `altorra-cars-design-system/project/redesign/` (o `redesign/multimedia/`) a la ruta `multimedia/` correspondiente. NO dupliques assets que ya existan.
- [ ] **Step 4: Verificación** — Los 5 archivos existen en `css/home/`. (La verificación visual ocurre tras Task 2.)

---

### Task 2: `index.html` — head nuevo + markup completo de las 12 secciones (estático)

**Source:** `redesign/Home.jsx` (render fn L1239-1261 = orden) + cada componente: `CinHero` L137-211 (+`HeroSearch` L216-334), `CinAvailable` L802-912, `CinCollection` L369-457, `CinCats` L462-484, `CinPrograms` L580-787, `CinTrail` L926-1027, `CinBrands` L339-364, `CinManifesto` L1032-1047, `CinConv` L1052-1122, `CinStats` L1147-1173, `CinEnd` L1175-1234. Nav/Footer: `redesign/components.jsx` Nav L44-256, Footer L259-364.

- [ ] **Step 1: `<head>`** — Conserva los meta/SEO/PWA/canonical actuales de `index.html`. Añade el `<link>` de Google Fonts (Manrope + Instrument Serif + Cardo + Plus Jakarta + Inter) de `redesign/index.html:11` + sus `preconnect`. Enlaza los `css/home/*` en orden (tokens→base→chrome→cinematic→quicktools). Mantén los CSS de funcionalidad transversal que el index aún usa (toasts, cookies, concierge, contact-forms/modales, citas, page-loader). (El retiro del CSS viejo del index se hace en Task 7.)
- [ ] **Step 2: Markup del `<body>`** — Reemplaza el `<body>` por la estructura nueva, traduciendo el JSX a HTML estático semántico (sin React): barra de progreso `.cin-scroll-progress`; `<header class="alt-nav">` (nav nuevo, con sus sub-elementos: logo animado, links, mega-dropdown "Vehículos", acciones "Publica tu vehículo"/favoritos/"Ingresar", hamburguesa + `.mob-drawer`); las 12 secciones en orden con sus clases (`.cin-hero`, `.cin-av`, `.cin-collection`, `.cin-cats`, `.promo-section`, `.cin-trail`, `.cin-brands#marcas`, `.cin-manifesto`, `.cin-conv`, `.cin-stats`, `.cin-end`); `<footer class="alt-footer">`; los mount points `#quicktools-root` (vacío). Para listas dinámicas (cards de disponibles/colección/promos/marcas/rastro) deja **contenedores vacíos con IDs** que el JS llenará (Tasks 4-6) — NO hardcodees los arrays de muestra. **Preserva los IDs de contrato**: `#heroSearchInput`, `#heroSearchDropdown`, contadores de favoritos, `#btnLogin`, etc. (ver Pre-flight; el subagente lee `main.js`/`favorites-manager.js`/`components.js`/`auth.js` para los IDs exactos que esos módulos esperan y los incluye en el nav nuevo).
- [ ] **Step 3: Verificación** — Cargar `index.html` local: se ve el diseño nuevo estático (sin data aún), fuentes correctas (Manrope/Instrument Serif), sin 404 de CSS/fuentes/hero-bg. `node -c` no aplica (HTML); validar que no hay tags sin cerrar.

---

### Task 3: `js/public/home/home-chrome.js` — nav (ocultarse) + dropdown + drawer + footer

**Source:** `redesign/components.jsx` Nav `useEffect` scroll L53-147 (máquina 3 estados: TOP_ZONE 80 / COLLAPSE_AT 240 / GONE_AT 520 / UP_TO_REOPEN 24 → clases `scrolled`/`alt-nav--wheel`/`alt-nav--gone`), dropdown, drawer; Footer L259-364. CSS de soporte ya en `chrome-redesign.css`.

- [ ] **Step 1** — Implementa en vanilla el scroll-listener (rAF-throttled) que aplica las 3 clases al `<header class="alt-nav">` replicando los umbrales/lógica de L53-147. Sin `MutationObserver` global (doctrina §35).
- [ ] **Step 2** — Mega-dropdown "Vehículos" (categorías → `vehiculos-*.html` + condición → páginas/`busqueda`) y drawer móvil (toggle hamburguesa). Links a páginas reales.
- [ ] **Step 3** — Wiring de estado: el botón "Ingresar" abre auth (`auth.js`/`#btnLogin` existente); "Publica tu vehículo" → `data-modal="vende-auto"`; el pip de favoritos refleja `favoritesManager` (usa los IDs de contador existentes). Verifica que `favoritesManager._forceShowHeader()`/`_promptLogin()` (que tocan `#header`/`.header--hidden`/el botón login) sigan funcionando con el nav nuevo — provee los hooks que esperan o re-apúntalos.
- [ ] **Step 4** — Footer: porta el markup nuevo + **adapta las 3 tarjetas sociales existentes** (`.footer-soc--wa/ig/fb`, URLs reales) al estilo del footer nuevo. Sustituye los iconos `chat`/`mail` indefinidos del diseño por SVG reales.
- [ ] **Step 5** — `node -c js/public/home/home-chrome.js` (exit 0). Mount al cargar el index.

---

### Task 4: `js/public/home/home.js` (orquestador) + `home-motion.js` (motions) + búsqueda

**Source:** `Home.jsx` — `body[data-cin="on"]` (L1241), `useScrollProgress` L44-57, hero parallax L142-157, `WordReveal` L62-75 (`cinWord`), `useInView` reveals, `Counter` L1127-1145, `HeroSearch` L216-334. Keyframes ya en `cinematic.css`.

- [ ] **Step 1** — `home.js`: al `DOMContentLoaded`, set `body[data-cin="on"]`, inicializa los módulos (motion, carousels, chrome, quicktools), y orquesta el render de secciones dinámicas (llama a las funciones de `home-carousels.js`).
- [ ] **Step 2** — `home-motion.js`: barra de progreso de scroll; parallax del hero (scroll → `transform` del `.cin-hero-bg`, solo `transform`, doctrina §17); word-reveal del headline; reveals por `IntersectionObserver` (manifiesto, conv, trail, promos, secciones — añadir clases `is-in`/`cin-*-in`); counters animados (stats: cifras reales de `vehicleDB` para vehículos/marcas, copy configurable para el resto). Respeta `prefers-reduced-motion`.
- [ ] **Step 3** — Búsqueda del hero: reutiliza `initHeroSearch()` existente (depende de `#heroSearchInput`/`#heroSearchDropdown`); confirma redirect `busqueda.html?buscar=`. Si el markup nuevo cambió clases, re-apunta sin romper el contrato.
- [ ] **Step 4** — `node -c` en ambos (exit 0).

---

### Task 5: `js/public/home/home-carousels.js` — secciones data-driven

**Source:** `Home.jsx` CinAvailable L802-912, CinCollection L369-457 (drag), CinPrograms L580-787 (loop infinito + swipe), CinBrands L339-364 (marquee), CinTrail L926-1027. Contratos en Pre-flight.

- [ ] **Step 1: Vehículos disponibles** — `vehicleDB.getAllVehicles()` filtrado `disponible`, orden actual (prioridad→destacado→oferta→year). Render de cards con el markup `.cin-av-card` (chips OFERTA/USADO, precio/tachado, specs, glow), enganchando: card→`getVehicleDetailUrl`, favorito→`favoritesManager.handleHeartClick`, **COMPARAR funcional**→`vehicleComparator.toggle`. Flechas scroll-snap.
- [ ] **Step 2: La colección** — vehículos `destacado===true` (`vehicleDB.getFeatured()`), markup `.cin-card` con `featuredTag` (SP-2) en el chip de tag, logo de marca, `v.imagen`. Drag-to-scroll. Card→slug.
- [ ] **Step 3: Promos** — query `banners` `active && position==='home_promo'` orderBy `order` (usa `vehicleDB`/`database.js` o un getter nuevo); render `.promo-slide` con todos los campos (badge, eyebrow, título con `*x*`→`<em>` dorado [escapar el resto], subtext, chip tasa, pills, CTA→modal/URL, foto). Carrusel loop infinito + swipe (replica L580-787). Si no hay banners → ocultar la sección.
- [ ] **Step 4: Marcas** — `vehicleDB.getAllBrands()` → marquee `.cin-marquee-track` (duplicar para loop), logo + link `marca.html?marca=<id>`. Headline refleja conteo real.
- [ ] **Step 5: Tu rastro / Recomendados** — Si `vehicleHistory.hasHistory()`: render `.cin-trail` con los últimos 5 (card grande + lista lateral), "Limpiar rastro". Si NO: variante "Recomendados" rellenada con destacados (si <5, completar con más nuevos) — placeholder de Fase 1 (ranking real = SP-4).
- [ ] **Step 6** — Categorías: enlazar los 4 tiles a `vehiculos-*.html` + conteos reales por `categoria`. `node -c` (exit 0).

---

### Task 6: `js/public/home/quicktools.js` — dock flotante

**Source:** `redesign/QuickTools.jsx` (dock, 5 tools, hide-on-scroll) + `css/home/quicktools.css`.

- [ ] **Step 1** — Porta el dock (`#quicktools-root`, toggle + dock expandible, hide-on-scroll-down). 5 tools: **Simulador**→`simulador-credito.html`, **Comparar**→`comparar.html`, **Favoritos**→`favoritos.html`, **Historial**→`favoritos.html#history`, **Financiar**→`data-modal="financiacion"`.
- [ ] **Step 2** — Badges desde las fuentes REALES (no los `alt-cmp/fav/seen` del diseño): Comparar = `JSON.parse(localStorage['altorra_comparador']).length`; Favoritos = conteo de `favoritesManager`; Historial = `vehicleHistory.getCount()`. Guardas `typeof` si los módulos aún no cargaron.
- [ ] **Step 3** — **Colisión**: QuickTools reemplaza la píldora de comparación standalone en el index (no debe coexistir). ALTOR (concierge) queda abajo-derecha. `node -c` (exit 0).

---

### Task 7: Switch del index + limpieza + cache bump

- [ ] **Step 1** — En `index.html`, retira los `<link>`/`<script>` del diseño viejo del homepage (`css/hero.css`, `css/featured-week-banner.css`, `css/historial-visitas.css`, y el `<script>` inline viejo de recently-viewed / el `#fw-banner`). Conserva los `js/core/*` y módulos reutilizados (vehicleDB, components SOLO si aún se necesita para algo no-chrome, auth, concierge, modales, cookies, page-loader). **`css/style.css` NO se edita**; el index deja de enlazarlo solo si todo lo necesario está cubierto por sus archivos propios + `css/home/*` (verificar modales/toasts).
- [ ] **Step 2** — Verifica que no quedan referencias a IDs/funciones viejos del index que ya no existen (Grep `#fw-banner`, `#allVehiclesCarousel` viejo si se renombró, etc.) y que los módulos reutilizados siguen encontrando sus hooks.
- [ ] **Step 3** — Cache bump `vYYYYMMDDHHMMSS` (> el vigente) en `service-worker.js` + `js/core/cache-manager.js` + `docs/05-ESTADO-GLOBAL.md`. Añade los `css/home/*` y `js/public/home/*` a la precache del service worker si lista archivos explícitamente.

---

### Task 8: E2E final (cliente) + commit

- [ ] **Step 1: E2E navegador** (cliente) — Hero+búsqueda redirige `?buscar=`; disponibles cargan de Firebase con favorito+comparar funcionales; colección muestra destacados con tag; categorías enlazan; promos desde admin `home_promo`; Tu rastro tras visitar (o Recomendados); marcas marquee+link; nav se oculta/colapsa bien; QuickTools ok sin chocar con ALTOR; footer social ok; responsive + `prefers-reduced-motion`. Abrir otras páginas (catálogo, detalle, marca, favoritos) → siguen funcionando.
- [ ] **Step 2: Commit** — entregar al cliente summary + descripción (resumen del port del index + cache bump + archivos `css/home/*`, `js/public/home/*`, `index.html`).

---

## Self-Review
- **Cobertura del spec (SP-1):** Hero+búsqueda (T2/T4), disponibles (T5.1), colección+tag (T5.2), categorías (T5.6), promos `home_promo` (T5.3), Tu rastro/Recomendados (T5.5), marcas (T5.4), manifiesto/vende/stats/una-ventana (T2 markup + T4 motions), footer+social (T3.4), QuickTools (T6), chrome con efecto ocultarse (T3), tipografías (T1/T2), switch+no-regresión (T7). Sin gaps.
- **Naturaleza del plan:** es un PORT → tareas con refs de origen + contratos, no código inline (inviable para 1264 líneas JSX). Cada subagente lee el origen citado. Esto es deliberado, no un placeholder.
- **Riesgos:** (a) integración del nav nuevo con `favorites-manager`/`auth` (hooks `#header`/`.header--hidden`/`#btnLogin`/contadores) — mitigado en T3.3 (verificar y proveer hooks). (b) Assets faltantes (`heroindex.webp`) — T1.3. (c) Colisión QuickTools↔píldora comparador — T6.3. (d) Estados intermedios del index en la rama: aceptable (producción=`main`, intacta hasta merge). Rollback = revertir; el index viejo vive en `main` hasta el merge del PR.
