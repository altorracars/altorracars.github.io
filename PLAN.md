# Plan de Correcciones — 6 Fases

## FASE 1: Heroes de marcas acorde a cada marca (Punto 1)

**Problema:** Los banners actuales (`multimedia/banner/b_{marca}.png`) son imágenes genéricas que no representan vehículos de la marca ni muestran el logo visible.

**Solución:**
- Reemplazar las 18 imágenes de banner por imágenes profesionales generadas que muestren:
  - Un vehículo icónico/emblemático de la marca (ej: Renault Duster para Renault, Corolla para Toyota)
  - El logo de la marca visible integrado en la composición
  - Estilo consistente entre todas (fondo oscuro/elegante, vehículo como protagonista)
- Formato: PNG de alta calidad, mismas dimensiones (~1920×600px aprox.)
- Ruta: se mantiene `multimedia/banner/b_{marca}.png` — no hay cambios de código

**Archivos afectados:**
- `multimedia/banner/b_*.png` (18 archivos — reemplazo de imágenes)

**Nota:** Las imágenes deben descargarse de fuentes libres de derechos o generarse. Dado que no puedo generar/descargar imágenes reales, prepararé el código y documentaré exactamente qué imagen necesita cada marca para que el usuario las provea o las generemos con otra herramienta.

---

## FASE 2: Eliminar páginas de Nuevos y Usados (Punto 2)

**Problema:** Existen páginas dedicadas `vehiculos-nuevos.html` y `vehiculos-usados.html` que deben eliminarse. Toda la funcionalidad ya existe en `busqueda.html` con filtros.

**Solución:**
1. **Header** (`snippets/header.html`):
   - Eliminar enlaces "Nuevos" y "Usados" del submenú "Vehículos"
   - Agregar "Ver todos" al final (después de Hatchback) → enlaza a `busqueda.html`
   - El submenú queda: SUV | Pickup | Sedán | Hatchback | Ver todos

2. **Redirección** en las páginas eliminadas:
   - No eliminar los archivos HTML físicamente (por SEO/bookmarks)
   - Convertirlos en redirects automáticos a `busqueda.html?tipo=nuevo` y `busqueda.html?tipo=usado`

3. **Análisis de impacto — referencias a eliminar/actualizar:**
   - `snippets/header.html` → líneas 19-20 (enlaces directos)
   - `index.html` → líneas 129, 134, 222, 228 (structured data/JSON-LD)
   - `nosotros.html` → posibles enlaces internos
   - `404.html` → posibles enlaces
   - `favoritos.html` → posibles enlaces
   - `manifest.json` → shortcut "Vehículos Usados" apunta a `/vehiculos-usados.html`
   - `js/performance.js` → prefetch de estas páginas
   - `js/render.js` → posibles enlaces a estas páginas
   - `js/admin-operations.js` → páginas estáticas en `_buildSitemapXml()`
   - `scripts/generate-vehicles.mjs` → páginas estáticas hardcodeadas en generador de sitemap

4. **NO se toca:**
   - Filtros de nuevo/usado en `busqueda.html` (se mantienen)
   - Campo `tipo` en el admin panel (se mantiene)
   - Badge nuevo/usado en tarjetas de vehículos (se mantiene)

**Archivos afectados:**
- `snippets/header.html` — editar submenú
- `vehiculos-nuevos.html` — convertir a redirect
- `vehiculos-usados.html` — convertir a redirect
- `index.html` — limpiar JSON-LD
- `manifest.json` — actualizar shortcut
- `js/performance.js` — remover prefetch
- Otros archivos con referencias (según impacto)

---

## FASE 3: Hero de contacto acorde a concesionario (Punto 3)

**Problema:** `multimedia/heroes/contacto-hero.jpg` no transmite contexto de concesionario automotriz.

**Solución:**
- Reemplazar la imagen por una que represente un concesionario (showroom, recepción, equipo profesional, o un auto en sala de exhibición).
- Mantener misma ruta: `multimedia/heroes/contacto-hero.jpg`
- No requiere cambios de código.

**Archivos afectados:**
- `multimedia/heroes/contacto-hero.jpg` (reemplazo de imagen)

---

## FASE 4: Posicionamiento correcto de héroes — focus en vehículos (Punto 4)

**Problema:** Algunas imágenes de hero cortan el vehículo por mal posicionamiento (`object-position` / `background-position`).

**Solución:**
1. Revisar el CSS de posicionamiento en:
   - `css/hero.css` → `.hero` usa `background-position: center 30%`
   - `css/dark-theme.css` → `.brand-hero-bg` usa `object-position: center center`

2. Ajustar `object-position` para los brand banners:
   - Cambiar de `center center` a `center 40%` o similar para que el foco esté en la parte media-baja donde típicamente está el vehículo
   - Agregar clases CSS específicas por marca si alguna necesita ajuste individual

3. Para heroes de páginas (contacto, reseñas, etc.):
   - Ajustar `object-position` a `center 60%` o según la composición de cada imagen

4. Verificar responsive:
   - Tablet: ajustar posicionamiento
   - Mobile: ajustar posicionamiento — el vehículo debe seguir visible

**Archivos afectados:**
- `css/dark-theme.css` — ajustar `.brand-hero-bg` object-position
- `css/hero.css` — ajustar posicionamiento responsive si es necesario

---

## FASE 5: Submenú de marcas dinámico según inventario (Punto 5)

**Problema:** El submenú de marcas es estático (solo 8 marcas hardcodeadas) y no refleja qué marcas tienen inventario real. El enlace "Ver todas" envía a `busqueda.html` en vez del carrusel de marcas del index.

**Solución:**
1. **Hacer el submenú dinámico** en `js/components.js`:
   - Después de cargar `header.html`, inyectar las marcas desde Firestore
   - Usar `vehicleDB.getAllBrands()` + cruzar con inventario real
   - Solo mostrar marcas que tengan al menos 1 vehículo `estado: 'disponible'`
   - Ordenar por cantidad de inventario (más inventario primero)
   - Limitar a las top 8-10 marcas con inventario

2. **Cambiar "Ver todas las marcas"**:
   - Enlace actual: `busqueda.html`
   - Nuevo enlace: `index.html#marcas` (anclar a la sección del carrusel)
   - Agregar `id="marcas"` a la sección del carrusel en `index.html`

3. **Tiempo real:**
   - El listener de Firestore ya actualiza `vehicleDB` en tiempo real
   - Al recibir cambios, re-renderizar el submenú de marcas
   - Si una marca se queda sin stock → desaparece del submenú automáticamente

4. **Placeholder mientras carga:**
   - Mantener las 8 marcas estáticas como placeholder inicial
   - Reemplazar con datos reales cuando Firestore responda

**Archivos afectados:**
- `snippets/header.html` — agregar `id` al `<ul>` de marcas para manipularlo con JS
- `js/components.js` — nueva función `populateBrandsMenu()` que:
  - Espera a que `vehicleDB` esté listo
  - Consulta marcas con inventario
  - Reemplaza el contenido del submenú
- `index.html` — agregar `id="marcas"` a la sección del carrusel de marcas

---

## FASE 6: Sincronización del sistema de Sitemaps (Nuevo)

**Problema:** La eliminación de las páginas de nuevos/usados y los cambios de navegación deben reflejarse en todo el pipeline de generación de sitemaps: el archivo estático, el generador Node.js, el admin panel, el GitHub Actions workflow, y los datos estructurados.

**El sistema de sitemaps tiene 4 capas que deben sincronizarse:**

### 6.1 Archivo estático `sitemap.xml`
- **Acción:** Remover las entradas de `vehiculos-nuevos.html` y `vehiculos-usados.html`
- **Verificar:** que las URLs restantes sigan siendo correctas

### 6.2 Script Node.js `scripts/generate-vehicles.mjs`
- **Líneas ~350-369:** Lista de páginas estáticas hardcodeadas para el sitemap
- **Acción:** Eliminar `vehiculos-nuevos.html` y `vehiculos-usados.html` de la lista
- **Verificar:** que el generador no cree referencias a estas páginas en futuras ejecuciones

### 6.3 Admin Panel `js/admin-operations.js`
- **Función `_buildSitemapXml()` (~líneas 349-368):** Lista de páginas estáticas hardcodeadas
- **Acción:** Eliminar ambas páginas de la lista estática
- **Verificar:** que el botón "Generar Sitemap" del admin no las incluya

### 6.4 Structured Data / JSON-LD en `index.html`
- **Líneas ~129, 134:** SiteNavigationElement con URLs de nuevos/usados
- **Líneas ~222, 228:** BreadcrumbList con las mismas URLs
- **Acción:** Eliminar ambas entradas de los schemas
- **Actualizar:** Agregar `busqueda.html` como reemplazo si no existe

### 6.5 GitHub Actions `.github/workflows/generate-vehicles.yml`
- **Validación del sitemap (~líneas 58-70):** Asegurar que la validación no falle por la ausencia de las páginas eliminadas
- **Acción:** Revisar que el paso de validación no busque específicamente estas URLs

### 6.6 Firebase Cloud Functions `functions/index.js`
- **Revisar:** que `onVehicleChange` y `triggerSeoRegeneration` no tengan referencias a estas páginas
- **Acción:** No se esperan cambios, pero verificar

### 6.7 `robots.txt`
- **Revisar:** No referencia directamente estas páginas, solo el sitemap
- **Acción:** No se esperan cambios

### 6.8 Canonical URLs y meta tags
- **`vehiculos-nuevos.html`** y **`vehiculos-usados.html`** (que se convertirán en redirects):
  - Agregar `<link rel="canonical" href="https://altorracars.github.io/busqueda.html">` para indicar a los buscadores la URL correcta
  - Agregar `<meta name="robots" content="noindex, follow">` para que se desindexen gradualmente

**Archivos afectados:**
- `sitemap.xml` — remover 2 URLs
- `scripts/generate-vehicles.mjs` — remover de lista estática
- `js/admin-operations.js` — remover de `_buildSitemapXml()`
- `index.html` — limpiar JSON-LD (SiteNavigationElement + BreadcrumbList)
- `.github/workflows/generate-vehicles.yml` — verificar validación
- `functions/index.js` — verificar (probablemente sin cambios)
- `robots.txt` — verificar (probablemente sin cambios)
- `vehiculos-nuevos.html` / `vehiculos-usados.html` — agregar canonical + noindex en los redirects

---

## Orden de ejecución

1. **FASE 2** (Eliminar páginas nuevos/usados) — Cambios de navegación principales
2. **FASE 6** (Sincronización de sitemaps) — Aplicar inmediatamente después de Fase 2 para que todo el pipeline quede coherente
3. **FASE 5** (Submenú dinámico de marcas) — Complementa los cambios de navegación
4. **FASE 4** (Posicionamiento de héroes) — CSS puro, rápido
5. **FASE 1** (Imágenes de héroes de marcas) — Requiere assets nuevos
6. **FASE 3** (Hero de contacto) — Requiere asset nuevo, independiente
