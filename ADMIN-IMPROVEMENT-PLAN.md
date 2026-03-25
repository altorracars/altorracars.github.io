# Plan de Mejora del Panel de Administración — Altorra Cars

> Documento de seguimiento de fases, cambios aplicados y pendientes.
> Última actualización: 2026-03-25 (Fase 5 completada — Plan completo ✅)

---

## Resumen General

Auditoría profunda y plan de mejora del panel de administración en 5 fases:
rendimiento, UX/responsive, funcionalidad, seguridad/auditoría y pulido visual.

---

## Estado de Fases

| Fase | Descripción | Estado |
|------|-------------|--------|
| **1** | Rendimiento + Código Limpio + Auditoría por Vehículo | ✅ Completada |
| **2** | UX, Responsive + Visualización de Autoría | ✅ Completada |
| **3** | Funcionalidad Avanzada | ✅ Completada |
| **4** | Auditoría Completa + Seguridad | ✅ Completada |
| **5** | Pulido Visual + Extras | ✅ Completada |

---

## Fase 1 — Rendimiento + Código Limpio + Auditoría por Vehículo ✅

**Commits:**
- `55b3cd5` — `feat(admin): Phase 1 — admin panel performance & audit trail`
- `edbcaaf` — `fix(rules): add Firestore rules for vehicle auditLog subcollection`
- *(post-review)* — `fix(admin): add _version increment to all vehicle updates`

**Archivos modificados:**
- `admin.html` — 342 líneas cambiadas
- `css/admin.css` — 144 líneas añadidas
- `js/admin-vehicles.js` — 110 líneas añadidas
- `js/admin-operations.js` — 14 líneas añadidas
- `js/admin-state.js` — 4 líneas añadidas
- `firestore.rules` — 11 líneas añadidas (regla para subcollection auditLog)
- `js/admin-sync.js` — 1 línea corregida (_version en sync featuredWeek)

### Despliegues requeridos tras Fase 1

```powershell
firebase deploy --only firestore:rules   # ✅ Desplegado 2026-03-25
```

### Bugs encontrados y corregidos post-commit

| Bug | Archivo | Impacto | Fix |
|-----|---------|---------|-----|
| `AP.timeAgo()` no existía | admin-state.js | Tabla de vehículos mostraría error JS | Agregado alias `timeAgo → formatTimeAgo` |
| Firestore rules sin match para `vehiculos/{id}/auditLog` | firestore.rules | Audit log silenciosamente bloqueado por `deny all` | Agregada regla `match /auditLog/{logId}` |
| `toggleDestacadoFn` sin `_version` | admin-vehicles.js | Toggle falla con `permission-denied` para editores | Agregado `_version: currentVersion + 1` |
| `savePriorityToFirestore` sin `_version` | admin-vehicles.js | Reorder falla con `permission-denied` para editores | Agregado `_version: currentVersion + 1` |
| `admin-sync.js` featuredWeek sin `_version` | admin-sync.js | Sync falla silenciosamente para editores | Agregado `_version: (v._version \|\| 0) + 1` |

### F1.1 — Scripts con `defer` (13 scripts)

Todos los scripts del admin ahora usan `defer` para desbloquear el parser HTML mientras preservan el orden de ejecución:

```html
<script src="js/firebase-config.js" defer></script>
<script src="js/dynamic-lists.js" defer></script>
<script src="js/admin-state.js" defer></script>
<script src="js/admin-auth.js" defer></script>
<script src="js/admin-sync.js" defer></script>
<script src="js/admin-activity.js" defer></script>
<script src="js/admin-vehicles.js" defer></script>
<script src="js/admin-brands.js" defer></script>
<script src="js/admin-users.js" defer></script>
<script src="js/admin-appointments.js" defer></script>
<script src="js/admin-dealers.js" defer></script>
<script src="js/admin-lists.js" defer></script>
<script src="js/admin-banners.js" defer></script>
<script src="js/admin-reviews.js" defer></script>
<script src="js/admin-operations.js" defer></script>
```

### F1.2 — Reemplazo de ~77 inline styles por clases CSS

Se crearon 60+ clases utilitarias en `css/admin.css`:

**Espaciado:** `.mb-md`, `.mb-lg`, `.mt-md`, `.mt-lg`, `.p-md`
**Layout:** `.d-flex`, `.overflow-x-auto`, `.form-row` (2 cols), `.form-row-3` (3 cols)
**Formularios:** `.form-group`, `.form-label`, `.form-input`, `.form-select`, `.form-textarea`, `.form-checkbox`
**Badges:** `.badge`, `.badge-nuevo`, `.badge-usado`, `.badge-oferta`, `.badge-destacado`, `.badge-success`, `.badge-warning`, `.badge-danger`
**Botones:** `.btn`, `.btn-primary`, `.btn-success`, `.btn-danger`, `.btn-warning`, `.btn-ghost`, `.btn-sm`, `.btn-block`
**Modales:** `.modal-overlay`, `.modal`, `.modal-header`, `.modal-close`, `.modal-body`, `.modal-footer`, `.modal-sm`, `.modal-md`, `.modal-lg`
**Componentes:** `.stat-card`, `.stat-label`, `.stat-value`, `.admin-table`, `.table-container`, `.table-empty`, `.admin-tabs`, `.admin-tab-btn`
**Navegación:** `.nav-item`, `.nav-item.active`, `.nav-category`, `.nav-divider`, `.nav-item-logout`
**Uploads:** `.upload-area`, `.upload-icon`, `.upload-hint`, `.uploaded-images`, `.uploaded-img`
**Info:** `.admin-hint`, `.admin-info-box`, `.admin-highlight-box`

### F1.3 — `content-visibility: hidden` en secciones inactivas

```css
.section:not(.active) { content-visibility: hidden; }
```

Esto evita que el navegador renderice secciones ocultas del panel, ahorrando memoria y CPU.

### F1.4 — Unificación de clases CSS inconsistentes

| Antes | Después | Instancias |
|-------|---------|------------|
| `form-control` | `form-input` | 13 |
| `admin-card` | `stat-card` | 4 |
| `data-table` | `admin-table` | 1 |
| `btn-close` | `modal-close` | 2 |

### F1.5 — Formateo de HTML comprimido

Las secciones del formulario de vehículos (`sec-basica`, `sec-precio`, `sec-specs`) estaban en líneas comprimidas ilegibles. Se formatearon para mejorar mantenibilidad.

### F1.6 — Modelo de Auditoría por Vehículo

#### Arquitectura Firestore

```
vehiculos/
  {vehiculoId}/
    auditLog/          ← Subcollection por vehículo
      {entryId}/
        action: string        // 'created' | 'edited' | 'deleted' | 'featured' | 'sold'
        user: string          // email del usuario
        userName: string      // nombre del usuario
        timestamp: number     // Date.now()
        changes: array        // [{ field, from, to }]
        vehicleId: string
        saleDetails?: object  // Solo para ventas
```

#### Campos de autoría en cada vehículo

```javascript
// Al crear:
createdBy: 'user@email.com',
createdByName: 'Nombre Usuario',
createdAt: '2026-03-25T...',

// Siempre (crear y editar):
lastModifiedBy: 'user@email.com',
lastModifiedByName: 'Nombre Usuario',
lastModifiedAt: '2026-03-25T...'
```

#### Campos auditados (19 campos)

```javascript
['marca', 'modelo', 'year', 'tipo', 'categoria', 'precio', 'precioOferta',
 'kilometraje', 'transmision', 'combustible', 'motor', 'color', 'estado',
 'ubicacion', 'destacado', 'descripcion', 'imagen', 'concesionario', 'oferta',
 'featuredOrder']
```

#### Funciones implementadas

| Función | Archivo | Descripción |
|---------|---------|-------------|
| `getAuditUser()` | admin-vehicles.js | Obtiene email y nombre del usuario actual |
| `computeChanges(oldData, newData)` | admin-vehicles.js | Calcula diff campo a campo |
| `logVehicleAction(vehicleId, action, changes, extraData)` | admin-vehicles.js | Escribe entrada en subcollection auditLog |
| `buildVehicleData(id, codigoUnico, isNew)` | admin-vehicles.js | Incluye campos de autoría |
| `AP.timeAgo(val)` | admin-state.js | Alias de formatTimeAgo, formato relativo en español |

#### Acciones que generan audit log

| Acción | Archivo | Campos registrados |
|--------|---------|-------------------|
| Crear vehículo | admin-vehicles.js | `{ action: 'created', changes: [{field:'(nuevo)', to:'creado'}] }` |
| Editar vehículo | admin-vehicles.js | `{ action: 'edited', changes: [diffs por campo] }` |
| Eliminar vehículo | admin-vehicles.js | `{ action: 'deleted' }` |
| Toggle destacado | admin-vehicles.js | `{ action: 'featured', changes: [{field:'destacado', from, to}] }` |
| Marcar vendido | admin-operations.js | `{ action: 'sold', saleDetails: {canal, origenTipo, precioVenta} }` |

#### Visualización en tabla de vehículos

En cada fila de la tabla se muestra:
- **"Creado por: [nombre]"** — en gris (#6e7681), con tooltip de tiempo relativo
- **"Mod: [nombre] [hace X]"** — en dorado (#d4af37), solo si el modificador es diferente al creador

---

## Fase 2 — UX, Responsive + Visualización de Autoría ✅

**Archivos modificados:**
- `css/admin.css` — ~170 líneas añadidas (skeleton, timeline, transitions, responsive 480px)
- `js/admin-vehicles.js` — ~75 líneas (audit timeline modal + botón en tabla)
- `js/admin-state.js` — ~40 líneas (connectivity indicator + skeleton helpers)
- `js/admin-sync.js` — 3 líneas (skeleton trigger en loadData)
- `admin.html` — 15 líneas (audit timeline modal + connectivity bar)

### F2.1 — Breakpoints responsive mejorados

**Breakpoint 768px (tablet)** — mejorado con:
- `form-grid-2` colapsa a 1 columna
- `form-grid-auto` reduce minmax
- Tabs horizontales con scroll (overflow-x: auto)
- Touch targets mínimos: botones 38px, nav items 44px, inputs 40px, checkboxes 36px
- Sidebar overlay activo en mobile

**Breakpoint 480px (móvil)** — nuevo:
- Stats grid: 1 columna
- Modales full-screen (border-radius: 0, max-width: 100%)
- Botones de modal footer en flex: 1 (full width)
- Font-size: 16px en inputs (previene zoom en iOS)
- Tabs con scroll horizontal y font reducido
- Thumbnails más pequeños (36x24px)
- Audit timeline entries en layout vertical

### F2.2 — Skeleton loaders

Placeholders animados con efecto shimmer mientras cargan los datos:

```css
.skeleton — gradient animado de 1.5s
.skeleton-text — barra de 14px para texto
.skeleton-stat — barra de 2.5rem para estadísticas
.skeleton-img — placeholder de 60x40px para imágenes
.skeleton-row — fila completa con flex layout
```

**Funciones JS:**
- `AP.showStatsSkeleton()` — reemplaza stat-value con skeleton
- `AP.showTableSkeleton(tbodyId, cols)` — genera 5 filas skeleton en tabla

Se activan automáticamente al llamar `loadData()`.

### F2.3 — Transiciones de sección

```css
.section.active { animation: sectionFadeIn 0.25s ease-out; }
@keyframes sectionFadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
}
```

Transición suave de fade-in + slide-up al cambiar entre secciones del panel.

### F2.4 — Indicador online/offline

Banner fijo en la parte inferior de la pantalla:
- **Offline:** fondo rojo, mensaje "Sin conexión a internet — Los cambios no se guardarán"
- **Reconexión:** fondo verde, "Conexión restaurada", auto-desaparece en 3.5s con animación slideUpOut

```html
<div class="connectivity-bar" id="connectivityBar"></div>
```

Escucha los eventos `window.online` y `window.offline` nativos del navegador.

### F2.5 — Timeline visual del audit log

Botón 📋 en cada fila de la tabla de vehículos que abre un modal con timeline visual:

- Consulta `vehiculos/{id}/auditLog` ordenado por timestamp desc, limit 50
- Timeline vertical con puntos de colores por tipo de acción:
  - Verde = creado
  - Azul = editado
  - Rojo = eliminado
  - Dorado = destacado
  - Púrpura = vendido
- Muestra: acción, usuario, tiempo relativo, cambios campo a campo (from → to)
- Para ventas muestra canal y precio
- Loading state con spinner
- Empty state si no hay registros

### F2.6 — Mejora de formularios mobile

- Min-height 40px en inputs, selects y textareas para touch targets
- Font-size 16px en 480px para evitar zoom automático en iOS
- Form sections con padding reducido
- Checkboxes con min-height 36px y padding extra

---

## Correcciones Post-Fase 2 (Pre-Fase 3)

### Marcas — Logo upload solo vía Firebase

**Problema:** El modal de marcas tenía un campo de texto para pegar URLs o rutas de repositorio (`multimedia/Logos/...`). Algunas marcas no mostraban logo al guardar.

**Solución:**
- Eliminado el input de texto para URL/ruta de repositorio
- `bLogo` es ahora un `<input type="hidden">` que solo se llena al subir vía Firebase Storage
- Logo ya no es campo `required` — se puede guardar marca sin logo
- Path de storage cambiado a `brands/logo_TIMESTAMP_FILENAME` (antes usaba `cars/`)
- Agregado botón "Eliminar logo" (rojo) visible cuando hay logo cargado
- Preview se gestiona via `updateLogoPreview()` centralizada

**Archivos:**
- `admin.html` — Modal de marca simplificado (línea 1309)
- `js/admin-brands.js` — Funciones updateLogoPreview, delete logo handler

### Hatchback — Imagen de categoría reemplazada

**Problema:** La imagen de categoría Hatchback aparecía rota en el sitio público.

**Solución:**
- Reemplazado `multimedia/categories/HATCHBACK.jpg` con imagen de VW Polo (hatchback clásico 5 puertas)
- Dimensiones: 1200x800px, JPEG quality 85, ~157KB
- Cache buster actualizado: `?v=20260325`
- La imagen muestra claramente el perfil de carrocería hatchback

### Merge conflict — HATCHBACK.jpg

**Problema:** Al fusionar main con la rama de desarrollo, surgió conflicto en `multimedia/categories/HATCHBACK.jpg` (eliminado en main, modificado en nuestra rama).

**Resolución:** Se mantuvo nuestra versión (VW Polo) ya que la imagen es necesaria para la categoría.

**Commit:** `6cdaea2` — `merge: resolve HATCHBACK.jpg conflict — keep updated image`

---

## Fase 3 — Funcionalidad Avanzada ✅

**Archivos creados:**
- `js/admin-table-utils.js` — ~400 líneas (módulo nuevo: paginación, sorting, CSV, búsqueda global, password validation, offline cache)

**Archivos modificados:**
- `admin.html` — ~35 líneas (pagination containers, sortable headers, CSV buttons, global search, password strength UI)
- `css/admin.css` — ~140 líneas (pagination bar, sort icons, password strength, global search dropdown, responsive)
- `js/admin-vehicles.js` — ~20 líneas (integración paginación + sorting + sort indicators)
- `js/admin-brands.js` — ~15 líneas (integración paginación + sorting)
- `js/admin-users.js` — ~15 líneas (integración paginación + sorting)
- `js/admin-appointments.js` — ~20 líneas (integración paginación + sorting)
- `js/admin-sync.js` — ~5 líneas (auto-cache, offline loading)

### F3.1 — Paginación client-side de tablas

Paginación integrada en 4 tablas principales con controles reutilizables:

| Tabla | Page Size | Container ID |
|-------|-----------|-------------|
| Vehículos | 15 | `vehiclesPagination` |
| Marcas | 20 | `brandsPagination` |
| Usuarios | 20 | `usersPagination` |
| Citas | 15 | `appointmentsPagination` |

**Funcionalidades:**
- Controles: Primera, Anterior, Números de página (max 5), Siguiente, Última
- Info: "Mostrando X-Y de Z"
- Auto-reset a página 1 al buscar, filtrar u ordenar
- Se desactiva en modo reordenar (vehículos)
- Botón activo con color dorado (admin-gold)

**API:**
- `AP.paginate(array, tableKey)` — devuelve slice paginado
- `AP.setPage(tableKey, page)` — navega y re-renderiza
- `AP.renderPagination(containerId, tableKey, totalItems)` — dibuja controles
- `AP.getTotalPages(totalItems, tableKey)` — calcula total de páginas

### F3.2 — Búsqueda global con filtrado

Dos inputs de búsqueda: uno en el dashboard (escritorio) y otro en el topbar móvil.

**Comportamiento:**
- Busca en vehículos (marca, modelo, año, código, categoría), marcas (nombre, id), y citas (nombre, vehículo, email)
- Debounce 200ms
- Mínimo 2 caracteres para activar
- Resultados agrupados por entidad con badges de estado
- Click navega a la sección correspondiente y filtra
- Se cierra al perder foco

**Estructura dropdown:**
- Vehículos: max 5 resultados con badge de estado
- Marcas: max 3 resultados con ID
- Citas: max 3 resultados con fecha

### F3.3 — Ordenamiento por columnas

Headers de tabla clickeables con indicadores visuales de dirección.

**Columnas ordenables:**

| Tabla | Columnas |
|-------|----------|
| Vehículos | Código, Vehículo (marca), Tipo, Precio, Estado |
| Marcas | ID, Nombre |
| Usuarios | Nombre, Email, Rol |
| Citas | Cliente, Vehículo, Fecha, Estado |

**Comportamiento:**
- Click alterna: sin orden → ascendente → descendente
- Indicador visual: ⇅ (inactivo), ↑ (asc), ↓ (desc)
- Color dorado en header activo
- Sorting se desactiva en modo reordenar (vehículos)
- Ordena con `localeCompare` con opción `numeric: true`

### F3.4 — Exportar CSV

Botones de exportación en vehículos y citas.

**Vehículos CSV (20 columnas):**
```
Codigo, Marca, Modelo, Ano, Tipo, Categoria, Precio, Precio Oferta,
Estado, Kilometraje, Transmision, Combustible, Motor, Color, Destacado,
Origen, Creado Por, Fecha Creacion, Modificado Por, Fecha Modificacion
```

**Citas CSV (9 columnas):**
```
Cliente, WhatsApp, Email, Vehiculo, Fecha, Hora, Estado, Tipo, Observaciones
```

**Detalles técnicos:**
- UTF-8 BOM para compatibilidad con Excel
- Escape de comillas y comas en valores
- Nombre de archivo: `vehiculos_altorra_YYYY-MM-DD.csv` / `citas_altorra_YYYY-MM-DD.csv`
- Toast de confirmación al exportar

### F3.5 — Validación de contraseñas

Validación en tiempo real al cambiar contraseña con indicador de fortaleza.

**Requisitos:**
- Mínimo 8 caracteres (antes eran 6)
- Al menos una mayúscula
- Al menos una minúscula
- Al menos un número
- Al menos un carácter especial (!@#$%...)

**UI:**
- Barra de fortaleza animada (5 niveles: muy débil → muy fuerte)
- Colores: rojo → naranja → amarillo → verde → verde brillante
- Lista de reglas con check marks en tiempo real (✓/○)
- Botón de submit deshabilitado hasta cumplir todos los requisitos

**Niveles de fortaleza:**
| Score | Label | Color |
|-------|-------|-------|
| 1 | Muy débil | Rojo |
| 2 | Débil | Naranja |
| 3 | Aceptable | Amarillo |
| 4 | Fuerte | Verde |
| 5 | Muy fuerte | Verde brillante |

### F3.6 — Modo offline con cache local

Cache en localStorage con cola de escritura offline.

**Cache de lectura:**
- Auto-guarda datos al cargar exitosamente (vehículos, marcas, citas, aliados)
- TTL: 30 minutos
- Al estar offline, carga datos desde cache y muestra toast de advertencia
- Prefijo: `altorra_admin_` para evitar colisiones

**Cola de escritura offline:**
- Operaciones pendientes se guardan en `altorra_admin_writeQueue`
- Al reconectar se procesan automáticamente (2s delay)
- Re-enqueue en caso de error parcial
- Toast de progreso: "Sincronizando X cambio(s) pendiente(s)..."

**API:**
- `AP.cacheData(key, data)` — guarda en localStorage con timestamp
- `AP.getCachedData(key)` — lee con validación de TTL
- `AP.loadFromCacheIfOffline()` — carga datos si está offline
- `AP.queueOfflineWrite(collection, docId, data, action)` — encola escritura
- `AP.processOfflineQueue()` — procesa cola pendiente

---

## Correcciones Post-Fase 3

### Compresión automática WebP en todas las subidas de imágenes

**Problema:** Las imágenes subidas desde el panel de admin se almacenaban en su formato original (JPG, PNG) sin optimización, consumiendo espacio innecesario en Firebase Storage y aumentando tiempos de carga.

**Solución:** Se unificó toda la compresión de imágenes en `AP.compressImage()` (admin-state.js) con opciones contextuales por tipo de upload:

| Tipo de Upload | Archivo | Max Width | Calidad | Formato Final |
|---|---|---|---|---|
| **Logos de marcas** | admin-brands.js | 512px | 0.90 | `.webp` |
| **Fotos de vehículos** | admin-vehicles.js | 1200px | 0.75 | `.webp` |
| **Banners/Hero** | admin-banners.js | 1920px | 0.85 | `.webp` |

**Excepciones intencionales:**
- **SVG logos:** Se suben sin compresión (formato vectorial, no aplica conversión a raster)
- **Cutout PNG:** Se preserva como PNG (necesita canal alfa para transparencia del recorte)

**Detalles técnicos:**
- Compresión vía Canvas API → `toBlob('image/webp', quality)`
- Fallback a JPEG si el navegador no soporta WebP
- Eliminada función duplicada `compressBannerImage()` de admin-banners.js (~47 líneas)
- `AP.compressImage(file, opts)` acepta: `maxWidth`, `quality`, `forceWebp`

**Commit:** `e35869e` — `feat(admin): auto-compress all uploads to WebP with contextual quality`

---

## Fase 4 — Auditoría Completa + Seguridad ✅

**Archivos creados/modificados:**
- `admin.html` — ~80 líneas (sección auditoría, nav item, meta tags CSP)
- `js/admin-activity.js` — Reescrito completo (~310 líneas): dashboard feed + panel de auditoría con filtros
- `js/admin-table-utils.js` — ~5 líneas (paginación y sorting para tabla audit)
- `js/admin-users.js` — ~3 líneas (audit log para CRUD usuarios)
- `js/admin-reviews.js` — ~2 líneas (normalización de nombres de acción)
- `js/admin-brands.js` — ~8 líneas (_version optimistic locking)
- `js/admin-banners.js` — ~8 líneas (_version optimistic locking)
- `css/admin.css` — ~45 líneas (estilos panel auditoría)
- `firestore.rules` — Refactorizado: funciones validVersion(), isReasonableSize(), reglas endurecidas

### F4.1 — Panel Global de Auditoría

Nueva sección "Auditoría" en el panel de administración con:

**Filtros:**
- **Busqueda de texto** — filtra por usuario, acción, objetivo o detalles (debounce 250ms)
- **Filtro por usuario** — dropdown que se auto-popula con los usuarios del audit log
- **Filtro por acción** — 23 tipos de acción disponibles en dropdown
- **Rango de fechas** — campos "Desde" y "Hasta" con date picker
- **Botón "Limpiar filtros"** — resetea todos los filtros

**Tabla de resultados:**
- Columnas: Fecha, Usuario, Acción, Objetivo, Detalles
- Paginación: 50 registros por página
- Ordenamiento por columnas (fecha, usuario, acción)
- Badges de color por categoría de acción
- Exportar CSV con filtros aplicados

**Categorías de acción con colores:**

| Categoría | Color | Acciones |
|-----------|-------|----------|
| Vehículos | Azul (#58a6ff) | create, update, delete, sold, featured, reorder |
| Marcas | Dorado (#d4af37) | create, update, delete |
| Banners | Púrpura (#a371f7) | create, update, delete |
| Citas | Verde (#3fb950) | confirmada, cancelada, delete, create_internal |
| Usuarios | Rojo (#f85149) | create, update, delete |
| Reseñas | Amarillo (#ffc837) | create, update, delete |
| Aliados | Dorado (#d4af37) | create, update |
| Sistema | Gris (#8b949e) | login, backup, sitemap, seo, lists |

**Navegación:** Nuevo botón "Auditoría" en sidebar bajo sección "Sistema" con badge de conteo.

### F4.2 — Audit Log para Todas las Entidades

Completada la cobertura de audit log para entidades faltantes:

| Entidad | Acciones Auditadas | Archivo |
|---------|-------------------|---------|
| **Usuarios** | `user_create`, `user_update`, `user_delete` | admin-users.js |
| **Reseñas** | `review_create`, `review_update`, `review_delete` | admin-reviews.js (normalizado) |
| Vehículos | Ya cubierto (Fase 1) | admin-vehicles.js |
| Marcas | Ya cubierto | admin-brands.js |
| Banners | Ya cubierto | admin-banners.js |
| Citas | Ya cubierto | admin-appointments.js |
| Aliados | Ya cubierto | admin-dealers.js |
| Sistema | Ya cubierto | admin-operations.js |

**Normalización:** Las reseñas usaban nombres genéricos (`crear`, `editar`, `eliminar`). Ahora usan el patrón estándar `review_create`, `review_update`, `review_delete`.

### F4.3 — Endurecimiento de Firestore Security Rules

**Mejoras aplicadas:**

| Regla | Descripción |
|-------|-------------|
| `isReasonableSize()` | Límite de 1MB por documento para prevenir abuso |
| Audit log inmutable | `auditLog` no permite `update`, solo `create` y `delete` (super_admin) |
| Citas: delete solo super_admin | Cambio de `isEditorOrAbove()` a `isSuperAdmin()` para delete |
| Funciones reutilizables | `validVersion()` y `validCreateVersion()` extraídas como helpers |

**Headers de seguridad (meta tags):**
```html
<meta http-equiv="X-Content-Type-Options" content="nosniff">
<meta name="referrer" content="strict-origin-when-cross-origin">
```

> **Nota sobre CSP:** GitHub Pages no permite headers HTTP custom. Los meta tags CSP son limitados para este stack ya que Firebase SDK requiere `eval()` y CDN scripts dinámicos. Se aplican las protecciones compatibles sin romper funcionalidad.

### F4.4 — Content Security Policy

Aplicada via meta tags en `admin.html`:
- `X-Content-Type-Options: nosniff` — Previene MIME sniffing
- `Referrer-Policy: strict-origin-when-cross-origin` — Limita información enviada en referer

La protección XSS principal se mantiene via `AP.escapeHtml()` en todo el rendering dinámico del panel.

### F4.5 — Optimistic Locking (_version) Extendido

`_version` ahora se aplica a todas las colecciones editables:

| Colección | Create | Update | Delete | Archivo |
|-----------|--------|--------|--------|---------|
| `vehiculos` | `_version: 1` | `_version + 1` | — | admin-vehicles.js (ya existía) |
| `marcas` | `_version: 1` | `_version + 1` | — | admin-brands.js (nuevo) |
| `banners` | `_version: 1` | `_version + 1` | — | admin-banners.js (nuevo) |

**Reglas Firestore:**
```javascript
function validVersion() {
  return request.resource.data._version == resource.data._version + 1
      || (resource.data._version == null && request.resource.data._version == 1);
}
```

- Vehículos, marcas y banners requieren `_version` increment en updates (excepto super_admin)
- Documentos sin `_version` (pre-existentes) se migran automáticamente con `null → 1`
- Super admin puede hacer bypass del version check para edge cases

### Despliegues requeridos tras Fase 4

```powershell
firebase deploy --only firestore:rules   # Reglas endurecidas + _version para marcas/banners
firebase deploy --only storage           # Si no se deployó en Fase 3
```

---

## Fase 5 — Pulido Visual + Extras ✅

**Archivos creados:**
- `js/admin-phase5.js` — ~280 líneas (charts, theme toggle, wizard modal, notificaciones)

**Archivos modificados:**
- `admin.html` — ~50 líneas (chart containers, theme toggle, wizard steps, wizard nav)
- `css/admin.css` — ~180 líneas (micro-animaciones, light mode, charts, wizard)

### F5.1 — Micro-animaciones

Transiciones sutiles añadidas a todo el panel:

| Elemento | Animación | Duración |
|----------|-----------|----------|
| **Botones** | Lift + shadow en hover, scale down en active | 0.15-0.2s |
| **Stat cards** | Lift (-2px) + shadow + border dorado en hover | 0.2s |
| **Modal** | Slide-in + scale desde arriba | 0.25s (`modalSlideIn`) |
| **Nav items** | Padding-left expand + fondo sutil en hover | 0.2s |
| **Nav active** | Barra dorada lateral (3px) | — |
| **Nav badges** | Pulso de sombra dorada | 2s loop (`badgePulse`) |
| **Form inputs** | Glow dorado sutil en focus | 0.2s |
| **Table containers** | Fade-in + slide-up al renderizar | 0.3s (`fadeInUp`) |
| **Activity items** | Padding-left expand + fondo sutil en hover | 0.15-0.2s |
| **Upload area** | Border dorado + fondo sutil en hover | 0.2s |
| **Colores por tipo** | Shadow dorado, rojo, verde en botones primary/danger/success | 0.2s |

### F5.2 — Gráficos/Charts en Dashboard

4 gráficos visuales en el dashboard, **sin dependencias externas** (CSS puro + JS):

| Gráfico | Tipo | Datos |
|---------|------|-------|
| **Inventario por Tipo** | Donut (conic-gradient) | Nuevos vs Usados con % |
| **Vehículos por Categoría** | Barras horizontales | Top 8 categorías con colores |
| **Estado del Inventario** | Donut (conic-gradient) | Disponible/Vendido/Reservado/Borrador |
| **Actividad 7 días** | Barras diarias | Acciones del audit log por día |

**Implementación técnica:**
- Donut charts via `conic-gradient` CSS (sin canvas/SVG)
- Bar charts via `div.mini-bar` con altura porcentual
- Auto-actualización en cada `renderActivityFeed()`
- Tooltips nativos con `title` attribute
- Responsive: 1 columna en mobile

### F5.3 — Toggle Dark/Light Mode

Selector de tema claro/oscuro con persistencia.

**Variables Light Mode:**
```css
:root.light-mode {
    --admin-bg: #f5f6f8;
    --admin-surface: #ffffff;
    --admin-border: #d0d7de;
    --admin-text: #1f2328;
    --admin-text-muted: #636c76;
    --admin-gold: #b8860b;
    --admin-gold-dark: #996515;
    ...
}
```

**Funcionamiento:**
- Botón circular en el header del dashboard (🌙/☀️)
- Toggle clase `light-mode` en `<html>`
- Persistencia via `localStorage('altorra_admin_theme')`
- Overrides para sidebar, modales, tablas, formularios, badges, paginación, topbar
- Carga instantánea al inicio (sin flash de tema incorrecto)

### F5.4 — Notificaciones en Tiempo Real

Sistema de alertas para acciones de otros usuarios.

**Funcionamiento:**
- Hook en `renderActivityFeed()` detecta nuevas entradas
- Compara conteo actual vs previo del audit log
- Solo notifica acciones de **otros usuarios** (no las propias)
- Usa `AP.toast()` con tipo `info` para mostrar la notificación
- Formato: "[usuario] [acción] — [objetivo]"

**Ejemplo:** Si otro admin agrega un vehículo, aparece:
> "juan actualizó vehiculo — Toyota Corolla 2024"

### F5.5 — Wizard Modal para Vehículos

Formulario paso a paso al crear nuevos vehículos.

**6 pasos del wizard:**

| Paso | Sección | Campos |
|------|---------|--------|
| 1 | Básica | Marca, Modelo, Año, Tipo, Categoría, Descripción |
| 2 | Precio | Precio, Oferta, Kilometraje, Estado, Ubicación |
| 3 | Specs | Transmisión, Combustible, Motor, Color, Puertas, etc. |
| 4 | Estado | Destacado, Banner, Cutout, Opciones de publicación |
| 5 | Fotos | Subida de imágenes, galería |
| 6 | Extras | Features/Características del vehículo |

**UI:**
- Barra de progreso con círculos numerados y conectores
- Pasos completados en verde con checkmark
- Paso activo en dorado
- Botones "← Anterior" y "Siguiente →"
- Texto "Paso X de 6"
- Validación de campos requeridos antes de avanzar
- Animación slide-in al cambiar de paso (`wizardSlideIn`)
- En modo **edición**: todos los pasos visibles (sin restricción de wizard)
- Al cerrar modal: restaura visibilidad de todas las secciones

---

## Historial de Commits Relevantes (Performance + Admin)

| Commit | Mensaje |
|--------|---------|
| `55b3cd5` | feat(admin): Phase 1 — admin panel performance & audit trail |
| `07bae06` | perf: cutting-edge scroll & rendering optimizations |
| `526fe8e` | perf: comprehensive performance audit fixes — 14MB+ savings |
| `7cefb64` | perf: use blur(4px) instead of removing glassmorphism entirely |
| `fd1942f` | perf: fix scroll jank — remove backdrop-filter blur, pause off-screen animations |

---

## Optimizaciones de Performance Aplicadas (Pre-Admin)

Estas mejoras se hicieron en commits anteriores a la Fase 1:

- **Imágenes comprimidas:** hero-car.jpg 2.1MB→172KB, logos eliminados 13.3MB
- **Scripts defer:** En 62+ páginas secundarias (marcas, vehículos)
- **Google Fonts diferidos:** `media="print" onload="this.media='all'"` en 62+ páginas
- **CSS diferido:** cookies.css, vehicles-cards-fix.css, brands-fixes.css, sidebar-filters-fix.css
- **Firestore optimizado:** Timeout 12s→6s, `.limit(200)` en queries, debounce 500ms en listener
- **Cache polling:** 3min→10min
- **`content-visibility: auto`** en secciones below-fold del sitio público
- **`will-change: transform`** en header y cookie banner
- **`backdrop-filter` reducido:** 28px→6px blur en modales
- **Animación toast:** `width` → `scaleX` (evita layout thrashing)
- **Resize handler:** debounce 150ms
- **Prefetch hints:** vehiculos-suv, marcas, contacto
- **CLS prevention:** width/height explícitos en imágenes de categorías
