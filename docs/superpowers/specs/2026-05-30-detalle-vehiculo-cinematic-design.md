# Diseño — Rediseño total de `detalle-vehiculo.html` a cinematic (SP-5.3)

> **Fecha**: 2026-05-30 · **Estado**: aprobado por el cliente (brainstorming) · **Próximo**: writing-plans.
> **Disparador (cliente)**: *"detalle vehiculo ademas de una mejora en tema es una mejora en organizacion y en todo, la interfaz es vieja fea, hay iconos enlaces o botones de acciones que se cortan o superponen entre ellos. Se requiere mejora total."*

---

## 1. Objetivo y alcance

**Mejora TOTAL** de la página de detalle de vehículo: tema cinematic + reorganización de la interfaz + corrección de bugs reales de layout + **de-monolitización** (extraer CSS/JS inline a módulos, alineado con §119). **Alcance confirmado: "Visual + organización + modularización"** — NO se añade funcionalidad nueva de producto (salvo activar el botón Guardar/favorito, que reutiliza sistema existente).

**Método confirmado: A — Reescritura cinemática preservando hooks.** Se reescribe la ESTRUCTURA HTML + CSS del template a cinematic, pero se conservan TODOS los contratos que el JavaScript (interno y externo) necesita → cero regresión funcional (doctrina §17.4 del proyecto).

**De-monolitización confirmada (análisis multi-agente 2026-05-30):** el monolito de 2315 líneas se parte en módulos externos. Decisión del cliente: **4 módulos JS** (mantenibilidad sobre mínimo-riesgo) + **1 CSS**. Razón: la página se reescribe a cinematic de todos modos → es el momento natural para corregir la última gran violación de §119 ("0 sueltos, modular"). El precedente es `js/simulador/` (feature partida por cohesión). **Lección aprendida del análisis**: `js/simulador/` quedó como código MUERTO (existe pero la página usa su lógica inline) — NO repetir ese error: los módulos nuevos DEBEN cargarse y funcionar de verdad.

### Bugs concretos que resuelve (de la captura del cliente)
- **Botones truncados**: en el sidebar de 380px, la fila de 4 botones de texto largo se corta → "COMPAR…", "COMPAR…", "AGENDA…" (Comparar y Compartir quedan idénticos e ilegibles) + "HACER P…" colgando.
- **6 colores chillones** (verde/azul/morado/cyan/ámbar) que rompen la identidad dorada cinematic.
- **Cuerpo 100% legacy**: Poppins + `style.css` + `dark-theme.css`, mientras el chrome (header/footer) ya es cinematic → la página "se siente otro sitio".

### Fuera de alcance (YAGNI)
- Tour 360°, financiación embebida, comparar specs inline → diferidos (serían otro sub-proyecto).
- Tocar `marca.html`, `busqueda.html`, landings `vehiculos-*.html` → quedan para futuros SP-5.3.x.
- **Migrar `js/simulador/` muerto o de-monolitizar el simulador** → fuera de este alcance (deuda separada detectada por el análisis).
- **Convertir la cadena de scripts a `defer` uniforme** (perf TTI) → follow-up separado para no enturbiar el IAP §37.
- **Arreglar `transition: all` preexistente** (líneas 165/202 del monolito, violación §17) → NO tocar en el extract mecánico; si se corrige, va en cambio propio. (Nota: en la reescritura cinemática el CSS se rehace, así que esos `transition: all` desaparecen naturalmente — pero no es un "fix" silencioso, es reescritura.)

---

## 2. Arquitectura actual (verificada leyendo código)

- `detalle-vehiculo.html` = **template monolítico de 2315 líneas**: `<style>` inline (~1150 líneas) + markup + `<script>` inline (~870 líneas) con TODA la lógica (galería, lightbox, tabs, ficha, similares, share, autoplay).
- `scripts/generate-vehicles.mjs` **clona este template** → genera **27 `vehiculos/*.html`** (`generatePage(template, ...)` con `template = detalle-vehiculo.html`). Cada página embebe `window.PRERENDERED_VEHICLE_ID`. **⇒ Cambiar el template obliga a regenerar las 27 páginas de vehículo.**
- **Las 18 `marcas/*.html` usan OTRO template** (`marcas.html`, vía `generateBrandPage`) → **NO se ven afectadas** por este rediseño. (Quedan legacy; futuro SP-5.3.x.)
- Carga CSS legacy: `style.css`, `dark-theme.css`, `performance-fixes.css`, `comparador.css`, `historial-visitas.css`, `citas.css`, `animaciones.css` + Poppins.
- Referencia de diseño existente: `altorra-cars-design-system/project/redesign/Detail.jsx` (351 líneas, clases `dt-*`) — guía de la composición cinematic, NO se copia literal (su markup es un mock con datos estáticos; el real es dinámico desde Firestore).

---

## 3. Contratos a preservar (cero regresión — §17.4)

### 3.1 IDs que lee el JS (internos + externos) — TODOS deben existir con el mismo id
`badgesContainer`, `vehicleTitle`, `vehicleSubtitle`, `priceContainer`, `quickSpecs`,
`btnWhatsApp`, `btnCalculadora`, `btnComparar`, **`btnCompararText`**, **`btnCompararIcon`**, `btnAgendar`, `btnAskVehicle`, `btnShare`,
`mainImage`, `imageCounter`, `thumbnailsGrid`,
`lightbox`, `lightboxClose`, `lightboxPrev`, `lightboxNext`, `lightboxImage`, `lightboxCounter`, `lightboxDots`,
`fichaTable`, `featuresGrid`, `descriptionBox`, `similarVehicles`.

### 3.2 Contratos de scripts EXTERNOS (no editables sin riesgo cross-página)
- **`comparador.js`**: togglea `#btnComparar` + `#btnCompararText` (texto "Comparar"/"Agregado") + `#btnCompararIcon` (swap de `<path>`) + clase `.active`. → Mantener esos 3 IDs y que `btnCompararIcon` sea un `<svg>` con `<path>` reemplazable.
- **`citas.js`**: delega por **clase `.btn-agendar-cita`** en el botón Agendar (event delegation en `document`). → El botón Agendar conserva `class="...btn-agendar-cita"`.
- **`concierge.js`**: delega por **`data-action="open-concierge-vehicle"`** en el botón Preguntar. → Conservar ese data-attribute.
- **`historial-visitas.js`**: solo lee `window.PRERENDERED_VEHICLE_ID` (no toca el DOM del detalle). → Conservar el `<script>window.PRERENDERED_VEHICLE_ID=...</script>` que inyecta el generador.
  - 🔴 **CRÍTICO (hallazgo del análisis)**: el generador inyecta `PRERENDERED_VEHICLE_ID` con anclaje PRIMARIO = `<script src="js/core/historial-visitas.js"></script>` (externo, línea ~1437) y FALLBACK = `    <script>\n        let currentVehicle = null;` (la 1ª línea del `<script>` inline que vamos a extraer). Al extraer el JS, el fallback DESAPARECE — pero como el primario siempre matchea, sigue funcionando. **Regla absoluta: mantener el tag `<script src="js/core/historial-visitas.js"></script>` VERBATIM en el body.** Además, actualizar ese fallback en `generate-vehicles.mjs` para que apunte al nuevo bootstrap (`detalle-page.js`) y no quede código foot-gun.
- **`favorites-manager.js`**: pinta `.favorite-btn[data-id="<id>"]` (toggle de clases burst/shrink). → El nuevo botón Guardar usa `class="favorite-btn" data-id="<id>"`.
- **`vehicle-hotspots.js`**: busca `.vehicle-image-main, .gallery-main, #mainImageContainer` — **ninguno existe hoy** (el template usa `.main-image-container`) → hotspots está inactivo en el detalle. Decisión: añadir `class="gallery-main"` al contenedor de la imagen principal para ACTIVARLO (bajo riesgo; si renderiza hotspots y molesta, se quita la clase). No es regresión (hoy ya no funcionaba).

### 3.3 Funciones globales del template (se reescriben junto al markup)
El `<script>` inline define ~30 funciones (`loadVehicleDetail`, `renderVehicleDetail`, `renderGallery`, `initGallery`, `openLightbox`, `renderFichaTecnica`, `renderCaracteristicas`, `initTabs`, `loadSimilarVehicles`, `shareVehicle`, `scrollSimilarCarousel`, etc.). Como viven DENTRO del archivo, se reescriben de forma coherente con el markup nuevo. **Decisión**: las funciones invocadas por `onclick=` inline (`shareVehicle`, `scrollSimilarCarousel`) se migran a `addEventListener` en el markup nuevo (más limpio, evita globales) — los `onclick=` se eliminan junto con el markup viejo, así que no hay riesgo de callsite huérfano. El resto de funciones son internas (llamadas entre sí), se reorganizan libremente.

---

## 4. Diseño visual aprobado

### 4.1 Composición (desktop) — aprobada ("tiene buena pinta")
```
[ Volver al catálogo ‹ ]
┌─────────────────────────────┬──────────────────────┐
│  GALERÍA (1.7fr)            │  PANEL STICKY (1fr)   │
│  - imagen principal 16:10   │  - badges            │
│    (zoom → lightbox)        │  - marca · título serif│
│  - thumbnails fila debajo   │  - subtítulo         │
│                             │  - precio dorado     │
│                             │  - quick-specs 2×2   │
│                             │  - BOTONES (Opción A) │
└─────────────────────────────┴──────────────────────┘
[ Información del vehículo ]
[ Tabs: Ficha Técnica · Características · Descripción ]
[ contenido del tab activo ]
[ Te puede interesar — carrusel horizontal ]
```

### 4.2 Botones — Opción A aprobada ("Me gusta la opción A")
Orden por prioridad, dentro del panel sticky:
1. **Contactar por WhatsApp** — full-width, verde (única excepción de color no-dorado, es marca WhatsApp).
2. **Simular crédito** — full-width, contorno/relleno dorado cinematic.
3. **Fila de 4 iconos compactos** (icono + etiqueta debajo, sin truncar): **Agendar · Preguntar · Comparar · Compartir**.
4. **Pie**: **Guardar** (favorito, izquierda) + sello **"Verificado"** (derecha).

### 4.3 Móvil
Galería → panel (precio + acciones) → tabs → similares. **+ barra sticky inferior** con precio + botón WhatsApp siempre visible al hacer scroll (patrón del `Detail.jsx`, clase `dt-sticky`).

### 4.4 Tema cinematic (tokens, de `css/home/cinematic.css`)
- Fondos: `--cin-bg #08070A`, superficies `--cin-bg-elev #15121A`.
- Texto: `--cin-ink #F4EEDE`, `--cin-ink-soft`, `--cin-ink-faint`.
- Acento: `--cin-gold #D4A85A`, `--cin-gold-hot #F0C674`. Líneas: `--cin-line`.
- Tipografía: títulos `Instrument Serif` (display), cuerpo `Manrope`. Reemplaza Poppins.
- Botón favorito/comparar activos usan dorado, NO los 6 colores actuales.

---

## 5. Estrategia de implementación

### 5.1 De-monolitización — arquitectura de módulos (validada por análisis multi-agente)

**CSS → 1 archivo nuevo `css/home/detalle-cinematic.css`** (junto a `comparar-cinematic.css`). Contiene el bloque page-specific (hoy líneas 50–1206), reescrito a cinematic. Body con `data-cin="on"` + `css/home/soft-redesign.css` explícito (patrón perfil/comparar).
- ⚠️ **Cascada (crítico)**: el `<link>` nuevo va EXACTAMENTE donde estaba el `<style>` inline (después de `performance-fixes.css`), para preservar el orden de fuente y que las reglas de igual especificidad sigan ganando igual.
- **Render-blocking `<link>` normal** (NO el truco `media="print" onload`): es el CSS primario de layout; el truco async solo es para los secundarios (comparador/citas/etc.). El `#page-loader` opaco cubre todo hasta que el JS lo descarta → cero FOUC.

**JS → 4 módulos nuevos en `js/public/detalle/`** (carpeta nueva, espejo de `js/public/home/`). Plain `<script>` (NO ES modules — comparten scope global como simulador/home), cargados con el MISMO orden, donde está hoy el `<script>` inline (tras `citas.js`, antes de `page-loader.js`):

| Archivo | Contenido (funciones) | ~líneas |
|---|---|---|
| `detalle-data.js` | helpers (`capitalizar`, `formatCurrency`, `formatKilometers`, `formatCategoria`), `getVehicleIdFromURL`+`extractIdFromSlug`, `getShareableUrl`, `updateMetaTags`, `injectVehicleSchema` | ~110 |
| `detalle-render.js` | `renderVehicleDetail`, `renderFichaTecnica`, `renderCaracteristicas`, `loadSimilarVehicles`, `scrollSimilarCarousel` | ~260 |
| `detalle-gallery.js` | estado galería/lightbox + `renderGallery`, `initGallery`, `changeMainImage`, autoplay, `openLightbox`/`closeLightbox`/`updateLightboxImage`/`navigateLightbox`/`renderLightboxDots`/`toggleZoom`, listener `keydown` | ~330 |
| `detalle-page.js` | orquestador: `currentVehicle`, `loadVehicleDetail`, bootstrap `DOMContentLoaded` + `onSnapshot` realtime, `shareVehicle`/`shareToWhatsApp`/`showShareToast`, `initTabs` | ~170 |

**Orden de carga** (todos plain, document order): `detalle-data.js` → `detalle-render.js` → `detalle-gallery.js` → `detalle-page.js`.

**Reglas de la de-monolitización (cero regresión):**
1. **Estado compartido** (`currentVehicle`, `currentImages`, `currentImageIndex`, flags de autoplay/lightbox): colgar de un namespace `window.AltorraDetalle` (convención `window.Altorra*` del proyecto) para que se lea entre módulos sin romper.
2. **Globals para `onclick=`**: `window.shareVehicle` y `window.scrollSimilarCarousel` DEBEN existir si la markup cinematic usa `onclick=`. **Preferible**: la markup nueva usa `addEventListener` y se eliminan esos `onclick=` → desaparece el riesgo. (Decisión ya tomada en §3.3.)
3. **Un solo `DOMContentLoaded`** (en `detalle-page.js`); en el path realtime, `renderGallery` (rebuild innerHTML) SIEMPRE antes de `initGallery` (bind) para no doble-enganchar listeners.
4. **NO extraer** los 3 bloques inline de chrome/crítico (auth-hint IIFE, header-critical CSS, page-loader CSS) — son first-paint y compartidos; sacarlos regresaría CLS/FOUC.

**Beneficio (§119 + escalabilidad):** cada página generada deja de re-enviar ~2000 líneas inline → HTML más liviano + CSS/JS cacheado y compartido entre las 27 páginas. La reescritura cinemática futura toca sobre todo `detalle-gallery.js` + el CSS, sin tocar data/SEO (protege el contrato con el generador y los crawlers).

El chrome (header/footer) ya lo inyecta `components.js` con el bridge → NO se toca; el footer ya quedó cinematic (§139).

### 5.2 Secuencia de implementación + regeneración (27 páginas)
1. Crear `css/home/detalle-cinematic.css` + los 4 módulos `js/public/detalle/*.js`.
2. Reescribir `detalle-vehiculo.html` (template): markup cinematic + `<link>` al CSS nuevo (en la posición exacta del `<style>` viejo) + 4 `<script>` a los módulos (en la posición del `<script>` inline viejo) + mantener los anclajes del generador (§3.2) verbatim.
3. **Añadir guard de aserción al generador** (`generatePage()`): que LANCE si cualquiera de los ~11 anclajes string no se encuentra en el template → nunca más fallo silencioso (el `.replace()` no avisa). Actualizar el fallback de `PRERENDERED_VEHICLE_ID` al nuevo bootstrap.
4. **Verificar el checklist anti-regresión del generador ANTES de generar** (§5.4): los 11 anclajes `<head>` presentes verbatim (con acentos UTF-8), `historial-visitas.js` intacto, `</head>` único, `header-placeholder` intacto, paths root-relativos.
5. Verificar localmente (preview + cache-bust, L-20): galería, lightbox, tabs, similares, los 6 botones + favorito, comparar, agendar, preguntar, share, sticky móvil. `node -c` en los 4 módulos JS.
6. Correr `npm run generate` (`node scripts/generate-vehicles.mjs`) → regenera las **27 `vehiculos/*`** (+ `marcas/*` desde su propio template `marcas.html`, sin cambios de diseño) + `sitemap.xml`. ⚠️ El generador BORRA `vehiculos/*` antes de regenerar → un template roto produce 27 páginas rotas de golpe (por eso el guard del paso 3).
7. Verificar 1-2 páginas `vehiculos/*` generadas: `<title>` con nombre real, canonical, 2 bloques JSON-LD antes de `</head>`, `<script>window.PRERENDERED_VEHICLE_ID="..."</script>` antes del tag de historial-visitas, `<noscript>` tras header-placeholder.
8. **Actualizar cerebro** (§G.4): `20-ESPACIAL` (fila `js/public/detalle/`), `43-UX`, ADR §140 en `99` + `00-INDICE`, `05`/`10`.
9. Cache bump (§4) + entregar mensaje de commit al cliente.

### 5.3 Riesgos y mitigación
| Riesgo | Mitigación |
|---|---|
| Romper un contrato externo (comparador/citas/concierge/favoritos) | Checklist §3 verificado en preview ANTES de regenerar. |
| **Generador falla SILENCIOSO** por anclaje perdido (`.replace()` no avisa, exit 0) | **Guard de aserción nuevo** en `generatePage()` que lanza si falta un anclaje (§5.2 paso 3). + checklist §5.4. |
| Las 27 páginas quedan a medias (template nuevo, generadas viejas) | Regenerar SIEMPRE en el mismo commit que el template. El generador borra+regenera todo. |
| **De-monolitización rompe orden de scripts** (`vehicleDB`/`window.db` undefined) | 4 módulos plain `<script>` en document-order, en la posición del inline viejo → equivalente probado. NO usar `async`/ES modules. |
| **Estado compartido entre módulos** se pierde al partir | `window.AltorraDetalle` namespace para `currentVehicle`/`currentImages`/flags (§5.1 regla 1). |
| Cascada CSS cambia al externalizar | `<link>` en la posición EXACTA del `<style>` viejo (§5.1). |
| `js/public/detalle/` queda muerto como `js/simulador/` | El template DEBE cargar los 4 módulos y la verificación funcional (§5.4) prueba que corren de verdad. |
| Hotspots se activa y muestra algo no deseado | La clase `gallery-main` es reversible; validar en preview. |
| Conflicto cron↔cache (L-02) | Receta de merge conocida si aparece. |

### 5.4 No-regresión / verificación
- **`node -c` en los 4 módulos** `js/public/detalle/*.js` (ahora sí aplica — son archivos JS).
- Validar la página en preview sin errores de consola (salvo 403 Firebase localhost — L-08 esperados).
- **Checklist anti-regresión del generador (ANTES de `npm run generate`)**: `<title>`, `<meta robots>`, meta-description con acentos UTF-8, 7 anclajes OG/TW con sus `id="..."`, `<base href="/">`, `<meta charset>`, un solo `</head>`, `<div id="header-placeholder">`, **`<script src="js/core/historial-visitas.js">` verbatim**, refs nuevas root-relativas, archivo UTF-8 sin BOM.
- Checklist funcional completo en preview (cada botón, cada tab, lightbox con teclado, autoplay, similares scroll, favorito persistente, comparar toggle+widget, agendar modal, preguntar concierge).
- Comparar contra captura del cliente: botones NO truncados, paleta dorada, tipografía serif.
- Tras generar: spot-check 1-2 `vehiculos/*` (§5.2 paso 7).

---

## 6. Entregables
- `detalle-vehiculo.html` reescrito (template cinematic de-monolitizado: `<link>` + 4 `<script>` en vez de inline; contratos §3 intactos).
- `css/home/detalle-cinematic.css` (nuevo, ~CSS del cuerpo).
- `js/public/detalle/` (nuevo): `detalle-data.js`, `detalle-render.js`, `detalle-gallery.js`, `detalle-page.js`.
- `scripts/generate-vehicles.mjs` editado: guard de aserción de anclajes + fallback de `PRERENDERED_VEHICLE_ID` apuntando al nuevo bootstrap.
- 27 páginas `vehiculos/*.html` regeneradas + `sitemap.xml`. (Las 18 `marcas/*.html` se regeneran sin cambios de diseño, desde su propio template.)
- Cache bump (`service-worker.js` + `cache-manager.js`).
- ADR §140 en `99-HISTORIAL` + fila en `00-INDICE` + **actualización `20-ESPACIAL`** (nueva fila `js/public/detalle/ (4)` + bump de conteos — Reflejo de Frescura §G.4) + `43-UX` (cuerpo detalle → cinematic) + `05`/`10`.

---

## 7. Criterios de aceptación
1. La página de detalle se ve cinematic (dorado, serif, fondos oscuros cálidos) — coherente con index/perfil/favoritos.
2. Los 6 botones (WhatsApp, Simular, Agendar, Preguntar, Comparar, Compartir) + Guardar se ven completos, sin texto cortado, en desktop y móvil.
3. Toda la funcionalidad actual sigue intacta: galería + thumbnails, lightbox con zoom/teclado/dots, autoplay, tabs (ficha/características/descripción), similares, comparar (toggle + widget), agendar cita (modal), preguntar (concierge), compartir, favorito.
4. Las 27 páginas `vehiculos/*` generadas reflejan el nuevo diseño y conservan SEO (canonical, OG, JSON-LD, breadcrumb).
5. Móvil: barra sticky con precio + WhatsApp visible al scroll.
6. Cero errores JS en consola (excepto 403 Firebase en localhost).
