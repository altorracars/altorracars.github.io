# Plan de Mejora del Panel de Administración — Altorra Cars

> Documento de seguimiento de fases, cambios aplicados y pendientes.
> Última actualización: 2026-03-25

---

## Resumen General

Auditoría profunda y plan de mejora del panel de administración en 5 fases:
rendimiento, UX/responsive, funcionalidad, seguridad/auditoría y pulido visual.

---

## Estado de Fases

| Fase | Descripción | Estado |
|------|-------------|--------|
| **1** | Rendimiento + Código Limpio + Auditoría por Vehículo | ✅ Completada |
| **2** | UX, Responsive + Visualización de Autoría | ⏳ Pendiente |
| **3** | Funcionalidad Avanzada | ⏳ Pendiente |
| **4** | Auditoría Completa + Seguridad | ⏳ Pendiente |
| **5** | Pulido Visual + Extras | ⏳ Pendiente |

---

## Fase 1 — Rendimiento + Código Limpio + Auditoría por Vehículo ✅

**Commit:** `55b3cd5` — `feat(admin): Phase 1 — admin panel performance & audit trail`

**Archivos modificados:**
- `admin.html` — 342 líneas cambiadas
- `css/admin.css` — 144 líneas añadidas
- `js/admin-vehicles.js` — 110 líneas añadidas
- `js/admin-operations.js` — 14 líneas añadidas
- `js/admin-state.js` — 4 líneas añadidas

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

## Fase 2 — UX, Responsive + Visualización de Autoría ⏳

### Objetivos planificados

| ID | Tarea | Descripción |
|----|-------|-------------|
| F2.1 | Breakpoints responsive | Media queries para tablet (768px) y móvil (480px) en admin.css |
| F2.2 | Skeleton loaders | Placeholders animados mientras cargan vehículos, marcas, stats |
| F2.3 | Transiciones de sección | Animación suave al cambiar entre secciones del panel |
| F2.4 | Indicador online/offline | Banner visible cuando se pierde conexión a internet |
| F2.5 | Timeline de historial | Modal con timeline visual del audit log por vehículo |
| F2.6 | Mejora de formularios mobile | Inputs, selects y grids adaptados a pantallas pequeñas |

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
