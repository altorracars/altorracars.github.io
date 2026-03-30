# Plan de Mejora v2 — Panel de Administracion Altorra Cars

> Auditoria profunda post-Fase 5 + escaneo de bugs + comparativa Bersaglio
> Fecha: 2026-03-27
> Archivos auditados: 12 JS + admin.html + admin.css + firestore.rules

---

## 1. Bugs Criticos Encontrados

| # | Sev. | Archivo:Linea | Descripcion | Impacto |
|---|------|---------------|-------------|---------|
| B1 | **CRITICA** | admin-phase5.js:340 | `_origEditVehicle = AP.editVehicle` — si phase5.js carga antes que admin-vehicles.js, `editVehicle` es `undefined` y editar vehiculos no funciona | Edicion de vehiculos rota silenciosamente |
| B2 | **CRITICA** | admin-vehicles.js:1059 | Validacion de tamano de archivo: `f.size > maxBytes * 5` multiplica por 5 el limite, permitiendo archivos de 50MB en vez de 10MB | Imagenes enormes suben sin error |
| B3 | **ALTA** | admin-brands.js | `set(brandData, { merge: true })` con `_version` — merge crea documento si no existe, pero Firestore rules esperan `resource.data._version` que no existe aun | Crear marcas puede fallar silenciosamente |
| B4 | **ALTA** | admin-vehicles.js:334 | Resolucion de colision de prioridad: `Math.max(0, newSrcPrio - 1)` baja en vez de subir — cascada de prioridades invertida | Reordenamiento de destacados produce resultados incorrectos |
| B5 | **ALTA** | admin-phase5.js | `renderActivityChart()` no normaliza Firestore Timestamp objects — `new Date(entry.timestamp).getTime()` falla con objetos Timestamp | Grafico de actividad vacio/roto |
| B6 | **ALTA** | admin-operations.js:188 | `parseInt($('soldVehicleId').value)` sin radix — `NaN` pasa validacion `if (!vehicleId)` porque `NaN` es falsy pero se propaga | Error silencioso en registro de ventas |
| B7 | **MEDIA** | admin-sync.js:190 | `AP.appointments.length` sin verificar que `AP.appointments` este definido — crash si citas no han cargado | Dashboard crashea si citas tardan |
| B8 | **MEDIA** | admin-sync.js:45-54 | Migracion de `featuredWeek` itera TODOS los vehiculos en cada snapshot, incluso si ya se migro | Operacion O(n) innecesaria en cada cambio |
| B9 | **MEDIA** | admin-dealers.js:144 | DocId generado por nombre puede colisionar: "Jose Garcia" y "José García" producen el mismo slug | Sobreescritura silenciosa de aliado |
| B10 | **MEDIA** | admin-dealers.js:61 | `v.estado === 'disponible' \|\| !v.estado` — vehiculos sin estado se cuentan como disponibles | Metricas de aliados incorrectas |
| B11 | **MEDIA** | admin-phase5.js | Theme toggle no afecta inline styles con colores hardcodeados (ej: `style="color:#8b949e"`) | Light mode parcialmente roto |
| B12 | **BAJA** | admin-vehicles.js:1368 | `catch (_) {}` — errores de draft listener tragados silenciosamente | Debugging imposible |
| B13 | **BAJA** | admin-auth.js | Sin funcionalidad "Olvidaste tu contrasena" — depende del super_admin | UX de login incompleta |
| B14 | **BAJA** | admin-operations.js:203-209 | `parseInt()` sin radix en 4 lineas — parsing octal posible con strings que empiezan en 0 | Precios mal parseados (edge case) |

---

## 2. Vulnerabilidades de Seguridad

| # | Sev. | Archivo:Linea | Tipo | Descripcion |
|---|------|---------------|------|-------------|
| S1 | **CRITICA** | admin-vehicles.js:133-149 | XSS | Acciones con `onclick="adminPanel.previewVehicle(' + v.id + ')"` — patron peligroso. Debe usar event delegation |
| S2 | **CRITICA** | admin-vehicles.js:1397 | XSS | `onclick="adminPanel.loadDraftFromUser(\'' + userId + '\')"` — si userId contiene `'); alert('xss`, ejecuta codigo |
| S3 | **ALTA** | admin-operations.js:65,115 | XSS | `marca` y `modelo` concatenados en innerHTML sin `AP.escapeHtml()` |
| S4 | **ALTA** | admin-operations.js:336 | XSS | `err.message` en innerHTML sin escapar — mensajes de error controlables por atacante |
| S5 | **ALTA** | admin-dealers.js:81-82 | XSS | `d.telefono` y `d.responsable` en HTML sin escaping |
| S6 | **ALTA** | admin-dealers.js:73 | XSS | `d._docId` en atributo onclick sin escapar — si docId contiene comilla simple, rompe atributo |
| S7 | **MEDIA** | admin-operations.js:436,481 | Token | GitHub token en plaintext en localStorage — vulnerable a XSS que extraiga tokens |
| S8 | **MEDIA** | admin-operations.js:290-306 | Import | Importacion de JSON sin validar MIME type ni schema — acepta cualquier archivo |
| S9 | **MEDIA** | admin-vehicles.js:1105 | URL | Validacion de URL solo verifica scheme — no detecta `javascript:` protocol |
| S10 | **MEDIA** | admin-lists.js:44 | XSS | `onclick` en HTML string con concatenacion de variables |
| S11 | **BAJA** | admin-vehicles.js:819 | Input | `modelo` sin sanitizar antes de almacenar en Firestore |
| S12 | **BAJA** | admin-sync.js:173 | Info | Error message revela estructura interna: "Firestore Rules" y "super_admin" |

---

## 3. Problemas de Performance

| # | Archivo | Descripcion | Solucion |
|---|---------|-------------|----------|
| P1 | admin-vehicles.js:364 | Search sin debounce — re-renderiza tabla completa en cada keystroke | Agregar debounce 300ms |
| P2 | admin-vehicles.js:102 | Filtro concatena 9+ campos por vehiculo en cada render: O(n) strings | Cachear string de busqueda por vehiculo |
| P3 | admin-sync.js:182-190 | `updateStats()` filtra `AP.vehicles` 8 veces separadas — O(8n) | Single-pass con acumulador |
| P4 | admin-sync.js:205-212 | Triple forEach anidado en `updateEstimator()` — O(n*m*2) | Pre-computar conteos de imagenes |
| P5 | admin-dealers.js:47-58 | Metricas de aliados: nested forEach O(n*m) | Pre-indexar vehiculos por dealer |
| P6 | admin-sync.js:39,74 | Cada snapshot recrea array completo sin diff — no usa `docChanges()` | Usar updates incrementales |
| P7 | admin-vehicles.js:1360-1366 | `startDraftsListener()` sin unsubscribe — multiples listeners si se llama repetidamente | Guardar unsubscribe y limpiar |
| P8 | admin-sync.js:256 | Event listener en `estVisitas` input sin debounce y sin cleanup | Agregar debounce + removeEventListener |
| P9 | admin-dealers.js:65-85 | Todos los dealers renderizados sin paginacion ni virtualizacion | Agregar paginacion |
| P10 | admin-vehicles.js:193-197 | `querySelectorAll('#vehiclesTable th[data-sort]')` en cada render | Cachear selectores |

---

## 4. Accesibilidad (WCAG 2.1 AA)

| # | Archivo | Descripcion |
|---|---------|-------------|
| A1 | admin.html | 15+ labels `<label>` sin atributo `for` — inputs no asociados a sus labels |
| A2 | admin.html | Modales sin `role="dialog"` ni `aria-labelledby` |
| A3 | admin.html | Tabs de aliados sin `role="tablist"`, `role="tab"`, `aria-selected` |
| A4 | admin.html:66 | Hamburger sin `aria-expanded` toggle |
| A5 | admin.html | SVG icons como unico contenido de botones — sin `aria-label` |
| A6 | admin.html | Secciones colapsables sin `aria-expanded` ni `aria-controls` |
| A7 | admin.css | Tablas sin `:focus` ni `:focus-within` en filas — keyboard nav invisible |
| A8 | admin.css | Botones de paginacion sin estilo `:focus` |
| A9 | admin.css | Items de busqueda sin `:focus` — solo tienen `:hover` |
| A10 | admin.css:650 | Font-size 0.875rem en inputs — en iOS dispara zoom automatico (min 16px) |
| A11 | admin.html | Campos required sin `aria-required="true"` |
| A12 | admin.html | Toasts solo visuales — sin ARIA live region para screen readers |

---

## 5. Gaps de UX (vs Bersaglio + mejores practicas)

| # | Cat. | Descripcion | Bersaglio? |
|---|------|-------------|------------|
| U1 | Login | Sin "Olvidaste tu contrasena?" con reset por email | Si |
| U2 | Sidebar | Sin perfil de usuario (nombre + rol + avatar) | Si |
| U3 | Sidebar | Sin link "Ver sitio" al sitio publico | Si |
| U4 | Dashboard | Sin "Acciones rapidas" (+ Vehiculo, Citas, Exportar) | Si |
| U5 | Dashboard | Sin mensaje de bienvenida personalizado | Si |
| U6 | Dashboard | Stats no clickeables — deberian navegar a seccion filtrada | No |
| U7 | Citas | Sin indicador "sin leer" para citas nuevas | Si |
| U8 | General | Sin atajos de teclado (Ctrl+S, Esc, Ctrl+N) | No |
| U9 | Modales | Sin confirmacion al cerrar con cambios sin guardar | Parcial |
| U10 | Mobile | Sin breadcrumbs ni indicador de seccion en topbar | No |
| U11 | Tablas | Sin acciones en lote (multi-select + bulk ops) | No |
| U12 | Vehiculos | Sin busqueda avanzada (filtros por estado, precio, fecha, dealer) | No |
| U13 | Vehiculos | Sin deteccion de duplicados (misma placa/VIN) | No |
| U14 | Vehiculos | Sin confirmacion antes de guardar vehiculo | No |
| U15 | Vehiculos | Sin export CSV de lista de vehiculos | No |
| U16 | Vehiculos | Sin boton "Duplicar vehiculo" | No |
| U17 | Aliados | Sin buscador/filtro en lista de aliados | No |
| U18 | Aliados | Sin filtro por rango de fechas en metricas | No |
| U19 | Brands | Sin validacion de duplicados al crear marca | No |
| U20 | Wizard | Sin toggle wizard/libre en modal | No |

---

## 6. Mejoras Tecnologicas

| # | Tipo | Descripcion |
|---|------|-------------|
| T1 | Performance | `loading="lazy"` en todas las `<img>` de tablas |
| T2 | Performance | Virtual scrolling para tablas con +100 filas |
| T3 | Performance | Usar `docChanges()` en onSnapshot para updates incrementales |
| T4 | Seguridad | Migrar todos los `onclick=""` inline a event delegation |
| T5 | Seguridad | Escapar TODOS los datos de usuario con `AP.escapeHtml()` en innerHTML |
| T6 | Seguridad | Validar schema de imports JSON antes de escribir a Firestore |
| T7 | UX | Notificaciones por email al recibir cita (Cloud Function) |
| T8 | UX | Preview en tiempo real del vehiculo como se vera en sitio |
| T9 | Seguridad | 2FA opcional via Firebase Auth |
| T10 | Productividad | Ctrl+Z / historial de cambios con rollback |
| T11 | CSS | Eliminar TODOS los colores hardcodeados — migrar a CSS variables |
| T12 | CSS | Agregar breakpoints intermedios (600px, 900px, 1024px) |
| T13 | CSS | Centralizar z-index en variables CSS |
| T14 | Performance | Pausar animaciones CSS infinitas cuando no son visibles |
| T15 | DevOps | Eliminar `console.log/warn/error` en produccion (12 instancias encontradas) |

---

## Plan de Mejora por Fases

### Fase 6 — Seguridad & Bugs Criticos ✅ Completada
> Prioridad: **CRITICA** | Impacto: Alto | Complejidad: Media
> Commits: f5b8624 (6A), e8c9e0f (6B), bb2fff6 (6C), 1bfa9d3 (6D), 96f2a99 (6E)

| ID | Tarea | Resuelve |
|----|-------|----------|
| F6.1 | Fix file size validation: `f.size > maxBytes` (quitar `* 5`) | B2 |
| F6.2 | Fix wizard editVehicle hook — verificar `AP.editVehicle` con retry/lazy-bind | B1 |
| F6.3 | Fix brands `set(merge:true)` — usar `set()` sin merge para creacion, `update()` para edicion | B3 |
| F6.4 | Migrar TODOS los `onclick=""` inline a event delegation con `data-*` attributes | S1,S2,S6,S10 |
| F6.5 | Aplicar `AP.escapeHtml()` a TODOS los campos de usuario en innerHTML (marca, modelo, telefono, etc.) | S3,S4,S5 |
| F6.6 | Fix priority collision: invertir direccion del cascade | B4 |
| F6.7 | Normalizar timestamps en charts: detectar Firestore Timestamp y convertir con `.toDate()` | B5 |
| F6.8 | Fix `parseInt()` — agregar radix 10 en todas las llamadas | B6,B14 |
| F6.9 | Agregar null-check a `AP.appointments` antes de `.length` | B7 |
| F6.10 | Validar schema + MIME type en importacion JSON | S8 |

---

### Fase 7 — Login & Identidad de Usuario ✅ Completada
> Prioridad: Alta | Impacto: Alto | Complejidad: Baja
> Commit: a7ee40c (incluye migracion de TODOS los onclick/oninput restantes en admin.html)

| ID | Tarea | Resuelve |
|----|-------|----------|
| F7.1 | "Olvidaste tu contrasena?" con `sendPasswordResetEmail()` en login | B13, U1 |
| F7.2 | Perfil de usuario en sidebar footer: nombre, rol, avatar con iniciales | U2 |
| F7.3 | Link "Ver sitio" en sidebar (abre sitio publico en nueva pestana) | U3 |
| F7.4 | Mensaje de bienvenida en dashboard: "Hola, [nombre]" | U5 |
| F7.5 | Fix validacion URL — bloquear `javascript:` protocol | S9 |

---

### Fase 8 — Dashboard Inteligente
> Prioridad: Alta | Impacto: Alto | Complejidad: Media

| ID | Tarea | Resuelve |
|----|-------|----------|
| F8.1 | Acciones rapidas en dashboard: + Vehiculo, Gestionar marcas, Ver citas, Exportar CSV | U4 |
| F8.2 | Stats clickeables — click navega a seccion filtrada | U6 |
| F8.3 | Badge "sin leer" en citas: basado en timestamp de ultima visita vs ultima cita | U7 |
| F8.4 | Paginacion real en auditLog (Firestore cursor con `startAfter`) + reducir limit a 200 | P6 |
| F8.5 | Busqueda avanzada de vehiculos: filtros por estado, precio, fecha, dealer | U12 |

---

### Fase 9 — Performance & CSS
> Prioridad: Media | Impacto: Alto | Complejidad: Media

| ID | Tarea | Resuelve |
|----|-------|----------|
| F9.1 | Debounce en busqueda de vehiculos (300ms) | P1 |
| F9.2 | Cachear string de busqueda concatenado por vehiculo | P2 |
| F9.3 | Single-pass `updateStats()` con acumulador en vez de 8 filters | P3 |
| F9.4 | Migrar inline styles con colores hardcodeados a clases CSS | B11, T11 |
| F9.5 | Migrar colores hardcodeados en admin.css a CSS variables (10+ instancias de `#000`, `#fff`, `rgba()` fijos) | T11 |
| F9.6 | `loading="lazy"` en todas las imagenes de tablas | T1 |
| F9.7 | Agregar breakpoints responsivos intermedios (600px, 900px) | T12 |
| F9.8 | Centralizar z-index en CSS variables (conflicto 9999 entre auth y connectivity bar) | T13 |
| F9.9 | Fix font-size minimo 16px en inputs mobile (evitar zoom iOS) | A10 |
| F9.10 | Eliminar `console.log/warn/error` en produccion | T15 |

---

### Fase 10 — Productividad & Atajos
> Prioridad: Media | Impacto: Alto | Complejidad: Media

| ID | Tarea | Resuelve |
|----|-------|----------|
| F10.1 | Atajos de teclado: Esc=cerrar modal, Ctrl+S=guardar, Ctrl+N=nuevo vehiculo | U8 |
| F10.2 | Confirmacion al cerrar modal con cambios sin guardar | U9 |
| F10.3 | Duplicar vehiculo existente (boton en acciones de tabla) | U16 |
| F10.4 | Acciones en lote: checkbox en tablas + eliminar/exportar seleccionados | U11 |
| F10.5 | Toggle wizard/libre en modal de vehiculo | U20 |
| F10.6 | Export CSV de lista de vehiculos | U15 |
| F10.7 | Deteccion de duplicados por placa/VIN antes de guardar | U13 |
| F10.8 | Confirmacion antes de guardar vehiculo | U14 |

---

### Fase 11 — Accesibilidad (WCAG 2.1 AA)
> Prioridad: Media | Impacto: Medio | Complejidad: Baja

| ID | Tarea | Resuelve |
|----|-------|----------|
| F11.1 | Agregar `for` a todos los `<label>` + asociar con inputs | A1 |
| F11.2 | `role="dialog"` + `aria-labelledby` en todos los modales | A2 |
| F11.3 | ARIA roles en tabs de aliados (`tablist`, `tab`, `aria-selected`) | A3 |
| F11.4 | `aria-expanded` en hamburger y secciones colapsables | A4, A6 |
| F11.5 | `aria-label` en botones con solo SVG/icon | A5 |
| F11.6 | Estilos `:focus` y `:focus-visible` en tablas, paginacion, busqueda | A7, A8, A9 |
| F11.7 | `aria-required="true"` en campos obligatorios | A11 |
| F11.8 | ARIA live region para toasts (`role="status"` o `aria-live="polite"`) | A12 |

---

### Fase 12 — Notificaciones & Avanzado (Futuro)
> Prioridad: Baja | Impacto: Alto | Complejidad: Alta

| ID | Tarea | Resuelve |
|----|-------|----------|
| F12.1 | Notificacion por email al recibir cita (Cloud Function trigger) | T7 |
| F12.2 | Preview en tiempo real del vehiculo como se vera en el sitio | T8 |
| F12.3 | 2FA opcional via Firebase Auth | T9 |
| F12.4 | Historial de cambios con rollback visual (timeline + revert) | T10 |
| F12.5 | Buscador/filtro en lista de aliados + filtro por rango de fechas | U17, U18 |
| F12.6 | Virtual scrolling para tablas grandes (+100 filas) | T2 |
| F12.7 | Indicadores de sesiones activas por usuario | — |

---

## Resumen Ejecutivo

| Fase | Nombre | Items | Complejidad | Impacto | Estado |
|------|--------|-------|-------------|---------|--------|
| **6** | Seguridad & Bugs Criticos | 10 | Media | **Critico** | ✅ Completada |
| **7** | Login & Identidad | 5 | Baja | Alto | ✅ Completada |
| **8** | Dashboard Inteligente | 5 | Media | Alto | Pendiente |
| **9** | Performance & CSS | 10 | Media | Alto | Pendiente |
| **10** | Productividad & Atajos | 8 | Media | Alto | Pendiente |
| **11** | Accesibilidad | 8 | Baja | Medio | Pendiente |
| **12** | Notificaciones (Futuro) | 7 | Alta | Alto | Pendiente |

### Estadisticas de la Auditoria

| Metrica | Cantidad |
|---------|----------|
| **Bugs encontrados** | 14 |
| **Vulnerabilidades XSS** | 12 |
| **Problemas de performance** | 10 |
| **Gaps de accesibilidad** | 12 |
| **Gaps de UX** | 20 |
| **Mejoras tecnologicas** | 15 |
| **Total issues** | **83** |
| **Archivos auditados** | 14 |
| **Lineas de codigo revisadas** | ~6,500 |

**Recomendacion:** Continuar con **Fase 8** (Dashboard Inteligente) — acciones rapidas, stats clickeables, badge citas.

> Ultima actualizacion: 2026-03-30 (Fase 7 completada)
