# Plan de Mejora del Panel de Administración — Altorra Cars

> Documento de seguimiento de fases, cambios aplicados y pendientes.
> Última actualización: 2026-03-25 (Fase 2 completada)

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
| **3** | Funcionalidad Avanzada | ⏳ Pendiente |
| **4** | Auditoría Completa + Seguridad | ⏳ Pendiente |
| **5** | Pulido Visual + Extras | ⏳ Pendiente |

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

## Fase 3 — Funcionalidad Avanzada ⏳

### Objetivos planificados

| ID | Tarea | Descripción |
|----|-------|-------------|
| F3.1 | Paginación de tablas | Paginación client-side para vehículos, marcas, usuarios |
| F3.2 | Búsqueda global | Input de búsqueda que filtra en todas las entidades |
| F3.3 | Ordenamiento por columnas | Click en headers de tabla para ordenar asc/desc |
| F3.4 | Exportar CSV | Botón para descargar datos de vehículos en CSV |
| F3.5 | Validación de contraseñas | Requisitos de seguridad en cambio de contraseña |
| F3.6 | Modo offline | Cache local con sincronización al reconectar |

---

## Fase 4 — Auditoría Completa + Seguridad ⏳

### Objetivos planificados

| ID | Tarea | Descripción |
|----|-------|-------------|
| F4.1 | Panel global de auditoría | Sección dedicada con filtros por usuario, acción, fecha |
| F4.2 | Audit log para todas las entidades | Extender auditoría a marcas, usuarios, citas, banners |
| F4.3 | Cifrado de datos sensibles | Encriptar campos críticos en Firestore |
| F4.4 | Content Security Policy | Headers CSP para prevenir XSS |
| F4.5 | Optimistic locking | Campo `_version` con transacciones para evitar conflictos |

---

## Fase 5 — Pulido Visual + Extras ⏳

### Objetivos planificados

| ID | Tarea | Descripción |
|----|-------|-------------|
| F5.1 | Micro-animaciones | Transiciones sutiles en botones, cards, modales |
| F5.2 | Gráficos/Charts | Estadísticas visuales (ventas, inventario, tendencias) |
| F5.3 | Toggle dark/light | Alternar entre tema oscuro y claro |
| F5.4 | Push notifications | Alertas en tiempo real para eventos importantes |
| F5.5 | Wizard modal | Formulario paso a paso para crear vehículos |

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
