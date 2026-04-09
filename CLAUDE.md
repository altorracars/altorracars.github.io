# CLAUDE.md — Altorra Cars Knowledge Base

> Referencia unica para Claude. Evita reprocesos en parches, errores y mejoras.
> Ultima actualizacion: 2026-04-08

---

## Arquitectura

- **Tipo**: Sitio estatico (GitHub Pages) + Firebase backend
- **Dominio**: `altorracars.github.io` (sin dominio propio)
- **Repo**: `altorracars/altorracars.github.io`
- **Deploy**: Push a `main` → GitHub Pages auto-deploy
- **CI**: GitHub Actions genera paginas de vehiculos cada 4h desde Firestore

### Stack

| Capa | Tecnologia |
|------|-----------|
| Frontend | HTML/CSS/JS vanilla (sin framework, sin bundler) |
| Backend | Firebase: Auth, Firestore, RTDB, Storage, Functions, Analytics |
| SDK | Firebase Compat SDK v11.3.0 (cargado desde CDN) |
| Generacion | `scripts/generate-vehicles.mjs` (Node.js) — genera HTML estatico desde Firestore |
| PWA | Service Worker + manifest.json + cache-manager.js |

### Estructura de archivos clave

```
/ (raiz = sitio publico)
├── index.html                    — Homepage publica
├── admin.html                    — Panel de administracion (SPA)
├── sitemap.xml                   — Auto-generado por generate-vehicles.mjs
├── robots.txt                    — SEO: un solo bloque User-agent: *
├── vehiculos/                    — Paginas HTML individuales por vehiculo (auto-generadas)
├── marcas/                       — Paginas HTML por marca (auto-generadas)
├── js/
│   ├── firebase-config.js        — Inicializacion Firebase + persistence + SDK loading
│   ├── admin-auth.js             — Auth, RBAC, login, 2FA, rate limiting, presencia RTDB
│   ├── admin-vehicles.js         — CRUD vehiculos, imagenes, drafts, wizard
│   ├── admin-sync.js             — Listeners Firestore, migracion de schema, stats
│   ├── admin-brands.js           — Gestion de marcas
│   ├── admin-dealers.js          — Gestion de aliados/concesionarios
│   ├── admin-operations.js       — Ventas, exportacion, GitHub deploy
│   ├── admin-users.js            — Gestion de usuarios (solo super_admin)
│   ├── admin-appointments.js     — Gestion de citas/solicitudes
│   ├── admin-lists.js            — Leads, resenas
│   ├── admin-state.js            — Estado global AP, helpers (escapeHtml, closestAction)
│   ├── admin-table-utils.js      — Paginacion, sort, search de tablas
│   ├── admin-phase5.js           — Wizard, charts, theme toggle
│   ├── components.js             — Componentes publicos (header, footer, modals, smooth scroll)
│   ├── database.js               — Lectura publica de Firestore para catalogo
│   ├── render.js                 — Renderizado de cards de vehiculos
│   ├── contact-forms.js          — Modals de contacto/financiacion/venta
│   ├── cache-manager.js          — Cache inteligente con version check
│   └── service-worker.js         — PWA offline support
├── scripts/
│   └── generate-vehicles.mjs     — Generador de paginas estaticas + sitemap
├── firestore.rules               — Reglas de seguridad Firestore
├── database.rules.json           — Reglas de seguridad Realtime Database
├── storage.rules                 — Reglas de Firebase Storage
└── functions/                    — Cloud Functions (createManagedUser, etc.)
```

---

## Firebase Config

```
Project ID: altorra-cars
Auth Domain: altorra-cars.firebaseapp.com
RTDB URL: https://altorra-cars-default-rtdb.firebaseio.com
Storage: altorra-cars.firebasestorage.app
```

### Deploy de reglas

```bash
firebase deploy --only firestore:rules
firebase deploy --only database
firebase deploy --only storage
firebase deploy --only functions
```

> Las reglas en el repo (firestore.rules, database.rules.json) deben desplegarse manualmente.
> Un cambio en las reglas del repo NO se aplica automaticamente a Firebase.

---

## RBAC (Control de Acceso por Roles)

### Roles

| Rol | Permisos |
|-----|----------|
| `super_admin` | Acceso total. Gestiona usuarios, vehiculos, marcas, config |
| `editor` | Crea/edita vehiculos y marcas. No gestiona usuarios |
| `viewer` | Solo lectura en panel admin |

### Firestore Rules (resumen)

```
vehiculos/{id}    — read: public | create/update: editor+ | delete: super_admin
usuarios/{uid}    — read: own doc OR super_admin | write: super_admin only
marcas/{id}       — read: public | write: editor+
loginAttempts/{h} — read/write: public (para rate limiting cross-device)
leads, citas      — read: authenticated | create: public | delete: super_admin
```

### Cloud Functions (V2 — activas)

| Funcion | Llamada desde | Guard |
|---------|---------------|-------|
| `createManagedUserV2` | admin-users.js | `verifySuperAdminV2` |
| `deleteManagedUserV2` | admin-users.js | `verifySuperAdminV2` + self-delete protection |
| `updateUserRoleV2` | admin-users.js | `verifySuperAdminV2` |

### Checklist de no-regresion RBAC

Ejecutar despues de CUALQUIER cambio que toque auth, usuarios o Cloud Functions:

1. super_admin puede loguear y ver seccion de gestion de usuarios
2. super_admin puede crear usuario (rol editor)
3. Nuevo usuario aparece en la lista inmediatamente
4. super_admin puede editar rol (editor → viewer)
5. super_admin puede eliminar usuario
6. editor NO ve seccion de gestion de usuarios
7. viewer NO ve seccion de gestion de usuarios
8. editor PUEDE crear/editar vehiculos y marcas
9. editor NO puede eliminar vehiculos ni marcas
10. viewer solo lectura (sin botones de crear/editar/eliminar)
11. super_admin NO puede eliminarse a si mismo

---

## Patrones y Convenciones del Codigo

### Event Delegation (NO usar onclick inline)

```javascript
// CORRECTO — event delegation con data-action
container.addEventListener('click', function(e) {
    var btn = AP.closestAction(e); // SVG-safe closest()
    if (!btn) return;
    var action = btn.dataset.action;
    // ...
});

// INCORRECTO — NUNCA usar onclick inline (vulnerabilidad XSS)
// <button onclick="doSomething('${variable}')">
```

### Escapar datos de usuario en HTML

```javascript
// SIEMPRE usar AP.escapeHtml() al insertar datos en innerHTML
cell.innerHTML = '<span>' + AP.escapeHtml(vehiculo.marca) + '</span>';
```

### Firestore: create vs update

```javascript
// Crear: usar set() SIN merge
transaction.set(docRef, data);

// Actualizar: usar update() o transaction.update()
transaction.update(docRef, data);

// NUNCA usar set(data, { merge: true }) para creacion — las rules
// evaluan ambiguamente y puede fallar con permission-denied
```

### Migracion de schema de vehiculos

Al agregar un campo nuevo al schema de vehiculos, agregar una entrada en el
objeto `DEFAULTS` dentro de `migrateVehicleSchema()` en `admin-sync.js`.
La proxima carga del admin migrara automaticamente todos los vehiculos existentes.

### Sitemap: lastmod

Las paginas estaticas en `generate-vehicles.mjs` usan fechas fijas de lastmod.
Solo actualizar la fecha cuando el contenido de la pagina realmente cambia.
Google ignora lastmod si siempre muestra la fecha actual.

---

## Errores Conocidos y Soluciones

### "Access denied for UID" al hacer login

**Causa**: Error de red impide cargar perfil de Firestore → el codigo trataba
cualquier error como "acceso denegado" y hacia signOut.

**Fix aplicado** (2026-04-08): `loadUserProfile` ahora reintenta hasta 3 veces
con backoff (2s, 4s, 6s) para errores de red antes de rendirse. Solo hace
signOut para errores reales de permisos.

**Si persiste**: Verificar que las reglas de Firestore esten desplegadas:
```bash
firebase deploy --only firestore:rules
```

### Errores de presencia "permission_denied" en RTDB

**Causa**: Listeners de presencia escribian a `/presence/{uid}` despues de que
el usuario fue deslogueado, causando permission_denied.

**Fix aplicado** (2026-04-08): Guards en `startPresence()` verifican que el
usuario sigue autenticado antes de cada escritura. `stopPresence()` limpia
listeners. `showAccessDenied()` llama a `stopPresence()`.

**Si persiste**: Verificar que las reglas de RTDB esten desplegadas:
```bash
firebase deploy --only database
```

### "Failed to obtain primary lease" en Firestore

**Causa**: Multiples tabs abiertas compiten por el lease de IndexedDB.

**Fix**: Cerrar tabs duplicadas. Si persiste, ejecutar en consola del navegador:
```javascript
window.clearFirestoreCache()
```

### Sitemap no se sincroniza en Google Search Console

**Documentado en**: `SITEMAP-FIX.md`

**Causa**: Google intento fetchar el sitemap cuando tenia errores, no reintento.

**Fix**: Re-enviar sitemap en Search Console + ping a Google.
Ver `SITEMAP-FIX.md` para pasos detallados.

### Modals de financiacion/venta no funcionan fuera de index.html

**Fix aplicado**: `loadModalsIfNeeded()` en `components.js` inyecta modals
dinamicamente en todas las paginas.

### Bloqueo de puntero al usar "Ver todas" en menu de marcas

**Fix aplicado**: `pointer-events: none` en `.modal-overlay` inactivo +
cierre de dropdowns/menu al hacer smooth scroll.

---

## Fases Completadas (Historico)

> No reimplementar — ya estan en produccion.

| Fase | Descripcion | Estado |
|------|-------------|--------|
| 1-5 | Admin panel: rendimiento, UX, responsive, seguridad basica, visual polish | Completada |
| 0 | Fix critico CRUD vehiculos (set→update, rules, persistence, SVG events) | Completada |
| 6 | Seguridad: XSS, file validation, event delegation, parseInt radix | Completada |
| 7 | Login: reset password, perfil sidebar, bienvenida, URL validation | Completada |
| 8 | Dashboard: acciones rapidas, stats clickeables, badge citas, paginacion auditLog | Completada |
| 9 | Performance: debounce, CSS variables, lazy images, breakpoints, z-index | Completada |
| 10 | Productividad: atajos teclado, duplicar vehiculo, batch ops, export CSV | Completada |
| 11 | Accesibilidad: ARIA roles, labels, focus styles, live regions | Completada |

---

## Fase 12 — Pendiente (Futuro)

| ID | Tarea | Complejidad |
|----|-------|-------------|
| F12.1 | Notificacion por email al recibir cita (Cloud Function trigger) | Alta |
| F12.2 | Preview en tiempo real del vehiculo como se vera en el sitio | Media |
| F12.3 | 2FA opcional via Firebase Auth (ya parcialmente implementado) | Media |
| F12.4 | Historial de cambios con rollback visual (timeline + revert) | Alta |
| F12.5 | Buscador/filtro en lista de aliados + filtro por rango de fechas | Media |
| F12.6 | Virtual scrolling para tablas grandes (+100 filas) | Media |
| F12.7 | Indicadores de sesiones activas por usuario (ya implementado via RTDB presence) | Completado |

---

## SEO

Ver `SITEMAP-FIX.md` para estado detallado del sitemap y Google Search Console.

### Implementado
- Meta tags completos (description, keywords, OG, Twitter Cards)
- `<link rel="canonical">` en todas las paginas
- Structured Data JSON-LD (AutoDealer + WebSite)
- Sitemap auto-generado con prioridades diferenciadas
- robots.txt limpio

### Pendiente
- Dominio personalizado (mejoraria crawl priority de Google)
