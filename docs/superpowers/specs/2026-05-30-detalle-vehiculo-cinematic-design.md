# Diseño — Rediseño total de `detalle-vehiculo.html` a cinematic (SP-5.3)

> **Fecha**: 2026-05-30 · **Estado**: aprobado por el cliente (brainstorming) · **Próximo**: writing-plans.
> **Disparador (cliente)**: *"detalle vehiculo ademas de una mejora en tema es una mejora en organizacion y en todo, la interfaz es vieja fea, hay iconos enlaces o botones de acciones que se cortan o superponen entre ellos. Se requiere mejora total."*

---

## 1. Objetivo y alcance

**Mejora TOTAL** de la página de detalle de vehículo: tema cinematic + reorganización de la interfaz + corrección de bugs reales de layout. **Alcance confirmado: "Visual + organización"** — NO se añade funcionalidad nueva de producto (salvo activar el botón Guardar/favorito, que reutiliza sistema existente).

**Método confirmado: A — Reescritura cinemática preservando hooks.** Se reescribe la ESTRUCTURA HTML + CSS del template a cinematic, pero se conservan TODOS los contratos que el JavaScript (interno y externo) necesita → cero regresión funcional (doctrina §17.4 del proyecto).

### Bugs concretos que resuelve (de la captura del cliente)
- **Botones truncados**: en el sidebar de 380px, la fila de 4 botones de texto largo se corta → "COMPAR…", "COMPAR…", "AGENDA…" (Comparar y Compartir quedan idénticos e ilegibles) + "HACER P…" colgando.
- **6 colores chillones** (verde/azul/morado/cyan/ámbar) que rompen la identidad dorada cinematic.
- **Cuerpo 100% legacy**: Poppins + `style.css` + `dark-theme.css`, mientras el chrome (header/footer) ya es cinematic → la página "se siente otro sitio".

### Fuera de alcance (YAGNI)
- Tour 360°, financiación embebida, comparar specs inline → diferidos (serían otro sub-proyecto).
- Tocar `marca.html`, `busqueda.html`, landings `vehiculos-*.html` → quedan para futuros SP-5.3.x.

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

### 5.1 Enfoque CSS
El cuerpo nuevo se escribe **scopeado** (p. ej. `.dt-page` / `body[data-cin="on"]`) para no colisionar con el legacy. Opciones evaluadas:
- **(elegida)** CSS del cuerpo en una hoja nueva `css/home/detalle-cinematic.css` cargada por el template, + `data-cin="on"` en el body. Mantiene el patrón de las otras páginas cinematic (perfil/favoritos/comparar) y deja el `<style>` inline mínimo (critical). Coherente con §131/§132/§136.
- (descartada) Mantener todo inline → el archivo seguiría siendo un monolito de 2300 líneas, difícil de mantener.

El chrome (header/footer) ya lo inyecta `components.js` con el bridge → NO se toca; el footer ya quedó cinematic (§139).

### 5.2 Regeneración de las 45 páginas
1. Reescribir `detalle-vehiculo.html` (template).
2. Verificar localmente (preview + cache-bust, L-20): galería, lightbox, tabs, similares, los 6 botones, favorito, comparar, agendar, preguntar, share, sticky móvil.
3. Correr `npm run generate` (`node scripts/generate-vehicles.mjs`) → regenera las **27 `vehiculos/*`** (+ `marcas/*` desde su propio template `marcas.html`, sin cambios de diseño) + `sitemap.xml`.
4. Verificar 1-2 páginas `vehiculos/*` generadas (que el ID embebido y el SEO/JSON-LD sigan correctos).
5. Cache bump (§4) + commit.

> ⚠️ El generador hace reemplazos por string sobre el template (canonical, og:url, JSON-LD, `PRERENDERED_VEHICLE_ID`). Verificar que esos anclajes de texto SIGAN EXISTIENDO tras la reescritura (ej. la línea `id="og-url" content="https://...detalle-vehiculo.html"`, el bloque `<meta name="robots">`, el `<script>` del ID). El plan debe listar cada anclaje del generador y confirmarlo.

### 5.3 Riesgos y mitigación
| Riesgo | Mitigación |
|---|---|
| Romper un contrato externo (comparador/citas/concierge/favoritos) | Checklist §3 verificado en preview ANTES de regenerar. |
| El generador falla por anclaje de texto perdido | Auditar los ~10 reemplazos de `generatePage()` contra el template nuevo (5.2 paso). Probar `npm run generate` y revisar diff de 1 página. |
| Las 45 páginas quedan a medias (template nuevo, generadas viejas) | Regenerar SIEMPRE en el mismo commit que el template. |
| Hotspots se activa y muestra algo no deseado | La clase `gallery-main` es reversible; validar en preview. |
| Conflicto cron↔cache (L-02) | Receta de merge conocida si aparece. |

### 5.4 No-regresión / verificación
- `node -c` no aplica (HTML); validar JS inline reescrito cargando la página sin errores en consola (salvo los 403 de Firebase localhost — L-08 esperados).
- Checklist funcional completo en preview (cada botón, cada tab, lightbox con teclado, autoplay, similares scroll).
- Comparar contra captura del cliente: botones NO truncados, paleta dorada, tipografía serif.

---

## 6. Entregables
- `detalle-vehiculo.html` reescrito (template cinematic, contratos §3 intactos).
- `css/home/detalle-cinematic.css` (nuevo).
- 27 páginas `vehiculos/*.html` regeneradas + `sitemap.xml`. (Las 18 `marcas/*.html` se regeneran sin cambios de diseño, desde su propio template.)
- Cache bump (`service-worker.js` + `cache-manager.js`).
- ADR §140 en `99-HISTORIAL` + fila en `00-INDICE` + actualización `43-UX` (cuerpo detalle → cinematic) + `05`/`10`.

---

## 7. Criterios de aceptación
1. La página de detalle se ve cinematic (dorado, serif, fondos oscuros cálidos) — coherente con index/perfil/favoritos.
2. Los 6 botones (WhatsApp, Simular, Agendar, Preguntar, Comparar, Compartir) + Guardar se ven completos, sin texto cortado, en desktop y móvil.
3. Toda la funcionalidad actual sigue intacta: galería + thumbnails, lightbox con zoom/teclado/dots, autoplay, tabs (ficha/características/descripción), similares, comparar (toggle + widget), agendar cita (modal), preguntar (concierge), compartir, favorito.
4. Las 27 páginas `vehiculos/*` generadas reflejan el nuevo diseño y conservan SEO (canonical, OG, JSON-LD, breadcrumb).
5. Móvil: barra sticky con precio + WhatsApp visible al scroll.
6. Cero errores JS en consola (excepto 403 Firebase en localhost).
