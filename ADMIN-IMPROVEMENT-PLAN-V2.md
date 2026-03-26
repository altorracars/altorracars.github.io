# Plan de Mejora v2 — Panel de Administracion Altorra Cars

> Auditoria completa post-Fase 5 + comparativa con Bersaglio Jewelry
> Fecha: 2026-03-26

---

## Resultado de la Auditoria

### Bugs Encontrados

| # | Severidad | Archivo | Descripcion |
|---|-----------|---------|-------------|
| B1 | **Alta** | admin-phase5.js | Wizard modal: al editar vehiculo, `AP.editVehicle` se sobreescribe pero si el modulo se carga antes que admin-vehicles.js, `_origEditVehicle` sera `undefined` y al editar no se abrira el modal |
| B2 | **Alta** | admin-brands.js | `set(brandData, { merge: true })` con `_version` puede fallar silenciosamente si el documento no existia antes (merge + version check en Firestore rules) |
| B3 | **Media** | admin-phase5.js | `renderActivityChart()` usa timestamps como `number` o `string` sin normalizar — si `entry.timestamp` es un ISO string, `getTime()` funciona pero si es un Firestore Timestamp object, falla |
| B4 | **Media** | admin-activity.js | Se incremento el limit de 200 a 500 entries en `loadAuditLog()` sin paginar del lado de Firestore — consume mas lecturas del free tier |
| B5 | **Media** | admin-phase5.js | Theme toggle solo afecta admin.css variables — si hay estilos inline con colores hardcodeados (ej: `style="color:#8b949e"`) no cambian en light mode |
| B6 | **Baja** | admin-auth.js | No hay funcionalidad de "Olvidaste tu contrasena" — el usuario depende del super_admin para resetear |
| B7 | **Baja** | admin.html | El sidebar no muestra quien esta logueado ni su rol (solo se ve en el subtitulo del dashboard) |
| B8 | **Baja** | admin-phase5.js | Wizard: no hay boton para alternar entre modo wizard y modo libre (todas las secciones visibles) |

### Gaps de UX Identificados (vs Bersaglio + mejores practicas)

| # | Categoria | Descripcion | Bersaglio lo tiene? |
|---|-----------|-------------|---------------------|
| U1 | Login | Sin "Olvidaste tu contrasena?" con reset por email | Si |
| U2 | Sidebar | Sin perfil de usuario (nombre + rol + avatar) en el sidebar | Si |
| U3 | Sidebar | Sin link "Ver sitio" para ir al sitio publico | Si |
| U4 | Dashboard | Sin "Acciones rapidas" (+ Nuevo vehiculo, Ver citas, etc.) | Si |
| U5 | Dashboard | Sin mensaje de bienvenida con nombre del usuario | Si (parcial) |
| U6 | Dashboard | Stats no son clickeables (deberian navegar a la seccion filtrada) | No |
| U7 | Citas | Sin indicador "sin leer" (citas nuevas no vistas) | Si |
| U8 | General | Sin atajos de teclado (Ctrl+S para guardar, Esc para cerrar modal) | No |
| U9 | General | Sin confirmacion al cerrar modal con cambios sin guardar | No |
| U10 | General | Sin breadcrumbs ni indicador de seccion actual en mobile | No |
| U11 | Tablas | Sin acciones en lote (seleccionar multiples → eliminar/exportar) | No |
| U12 | Login | Sin indicador de "Recordarme" (ya usa LOCAL persistence pero no es visible) | No |

### Mejoras Tecnologicas Posibles

| # | Tipo | Descripcion |
|---|------|-------------|
| T1 | Performance | Lazy loading de imagenes en tablas (`loading="lazy"` en `<img>`) |
| T2 | Performance | Virtual scrolling para tablas con +100 filas |
| T3 | UX | Notificaciones por email/WhatsApp al recibir nueva cita |
| T4 | UX | Preview en tiempo real del vehiculo tal como se vera en el sitio publico |
| T5 | UX | Drag-and-drop para reordenar imagenes del vehiculo |
| T6 | Seguridad | 2FA (autenticacion de dos factores) via Firebase Auth |
| T7 | Productividad | Duplicar vehiculo existente (clonar para crear uno similar) |
| T8 | Productividad | Ctrl+Z / historial de cambios con rollback |
| T9 | UX | Indicadores de "ultimo acceso" y "sesiones activas" por usuario |
| T10 | SEO | Auto-generar meta descriptions y Open Graph tags al crear vehiculo |

---

## Plan de Mejora por Fases

### Fase 6 — Login & Identidad de Usuario
> Prioridad: Alta | Impacto: Alto | Complejidad: Baja

| ID | Tarea | Bugs/Gaps que resuelve |
|----|-------|------------------------|
| F6.1 | "Olvidaste tu contrasena?" con `sendPasswordResetEmail()` en login | B6, U1 |
| F6.2 | Perfil de usuario en sidebar footer (nombre, rol, avatar inicial) | U2, U5 |
| F6.3 | Link "Ver sitio" en sidebar | U3 |
| F6.4 | Mensaje de bienvenida en dashboard con nombre del usuario | U5 |
| F6.5 | Fix wizard editVehicle hook (orden de carga seguro) | B1 |

---

### Fase 7 — Dashboard Inteligente
> Prioridad: Alta | Impacto: Alto | Complejidad: Media

| ID | Tarea | Bugs/Gaps que resuelve |
|----|-------|------------------------|
| F7.1 | "Acciones rapidas" en dashboard (+ Nuevo vehiculo, Gestionar marcas, Ver citas, Exportar CSV) | U4 |
| F7.2 | Stats clickeables — click en "Nuevos" navega a vehiculos filtrados por tipo=nuevo | U6 |
| F7.3 | Badge "sin leer" en citas (basado en timestamp de ultima visita a la seccion) | U7 |
| F7.4 | Fix normalizar timestamps en chart de actividad (Firestore Timestamp vs ISO string) | B3 |
| F7.5 | Reducir auditLog limit de 500 a 200 + paginacion Firestore real (startAfter cursor) | B4 |

---

### Fase 8 — Productividad & Atajos
> Prioridad: Media | Impacto: Alto | Complejidad: Media

| ID | Tarea | Bugs/Gaps que resuelve |
|----|-------|------------------------|
| F8.1 | Atajos de teclado: Esc=cerrar modal, Ctrl+S=guardar vehiculo | U8 |
| F8.2 | Confirmacion al cerrar modal con cambios sin guardar ("Tienes cambios sin guardar") | U9 |
| F8.3 | Duplicar vehiculo existente (boton "Duplicar" en acciones de tabla) | T7 |
| F8.4 | Acciones en lote: checkbox en tablas + eliminar/exportar seleccionados | U11 |
| F8.5 | Toggle wizard/libre en modal de vehiculo | B8 |

---

### Fase 9 — Pulido Visual & Inline Styles
> Prioridad: Media | Impacto: Medio | Complejidad: Baja

| ID | Tarea | Bugs/Gaps que resuelve |
|----|-------|------------------------|
| F9.1 | Migrar inline styles restantes a clases CSS (compatibilidad light mode) | B5 |
| F9.2 | Lazy loading de imagenes en tablas (`loading="lazy"`) | T1 |
| F9.3 | Fix `set(merge:true)` en brands para compatibilidad con _version rules | B2 |
| F9.4 | Breadcrumb o indicador de seccion actual en topbar mobile | U10 |
| F9.5 | Drag-and-drop para reordenar imagenes dentro del formulario de vehiculo | T5 |

---

### Fase 10 — Notificaciones & Comunicacion (Futuro)
> Prioridad: Baja | Impacto: Alto | Complejidad: Alta

| ID | Tarea | Bugs/Gaps que resuelve |
|----|-------|------------------------|
| F10.1 | Notificacion por email al recibir nueva cita (via Cloud Function trigger) | T3 |
| F10.2 | Preview en tiempo real del vehiculo tal como se vera en el sitio publico | T4 |
| F10.3 | 2FA opcional (autenticacion de dos factores) | T6 |
| F10.4 | Historial de cambios con rollback visual (timeline + revert) | T8 |
| F10.5 | Indicadores de sesiones activas por usuario | T9 |

---

## Resumen de Prioridades

| Fase | Nombre | Items | Complejidad | Impacto |
|------|--------|-------|-------------|---------|
| **6** | Login & Identidad | 5 | Baja | Alto |
| **7** | Dashboard Inteligente | 5 | Media | Alto |
| **8** | Productividad & Atajos | 5 | Media | Alto |
| **9** | Pulido Visual & Fixes | 5 | Baja | Medio |
| **10** | Notificaciones (Futuro) | 5 | Alta | Alto |

**Recomendacion:** Iniciar con Fase 6 (rapida, alto impacto, resuelve gaps visibles vs Bersaglio).
