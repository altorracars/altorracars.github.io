# Plan de Correcciones — 5 Puntos

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
   - `sitemap.xml` → entradas de ambas páginas
   - `nosotros.html` → posibles enlaces internos
   - `404.html` → posibles enlaces
   - `favoritos.html` → posibles enlaces
   - `manifest.json` → posibles shortcuts
   - `js/performance.js` → prefetch de estas páginas
   - `js/render.js` → posibles enlaces a estas páginas
   - `js/admin-operations.js` → posibles referencias
   - `scripts/generate-vehicles.mjs` → generación de páginas

4. **NO se toca:**
   - Filtros de nuevo/usado en `busqueda.html` (se mantienen)
   - Campo `tipo` en el admin panel (se mantiene)
   - Badge nuevo/usado en tarjetas de vehículos (se mantiene)

**Archivos afectados:**
- `snippets/header.html` — editar submenú
- `vehiculos-nuevos.html` — convertir a redirect
- `vehiculos-usados.html` — convertir a redirect
- `index.html` — limpiar JSON-LD
- `sitemap.xml` — remover entradas
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

## Orden de ejecución recomendado

1. **FASE 2** (Eliminar páginas nuevos/usados) — Es la más impactante en navegación y la más independiente
2. **FASE 5** (Submenú dinámico de marcas) — Complementa los cambios de navegación de Fase 2
3. **FASE 4** (Posicionamiento de héroes) — CSS puro, rápido
4. **FASE 1** (Imágenes de héroes de marcas) — Requiere assets nuevos
5. **FASE 3** (Hero de contacto) — Requiere asset nuevo, independiente
