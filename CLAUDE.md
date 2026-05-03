# CLAUDE.md — Altorra Cars Knowledge Base

> Referencia unica para Claude. Evita reprocesos en parches, errores y mejoras.
> Ultima actualizacion: 2026-04-29

---

## 1. Arquitectura General

- **Tipo**: Sitio estatico (GitHub Pages) + Firebase backend
- **Dominio**: `altorracars.github.io` (sin dominio propio)
- **Repo**: `altorracars/altorracars.github.io`
- **Deploy**: Push a `main` → GitHub Pages auto-deploy
- **CI**: GitHub Actions genera paginas de vehiculos cada 4h desde Firestore
- **Negocio**: Compra/venta de carros usados en Cartagena, Colombia
- **Empresa**: ALTORRA Company SAS
- **Color brand**: `#b89658` (dorado)

### Stack

| Capa | Tecnologia |
|------|-----------|
| Frontend | HTML/CSS/JS vanilla (sin framework, sin bundler) |
| Backend | Firebase: Auth, Firestore, RTDB, Storage, Functions, Analytics |
| SDK | Firebase Compat SDK v11.3.0 (cargado desde CDN, NO modular) |
| Generacion | `scripts/generate-vehicles.mjs` (Node.js, Firebase modular SDK v12) |
| PWA | Service Worker + manifest.json + cache-manager.js (4 capas) |
| Iconos | Lucide Icons v0.468.0 via CDN (admin panel) |
| Linting | Biome 1.9.4 (`npm run lint`, `npm run format`) |
| Package | `npm run generate` ejecuta el generador de paginas |

---

## 2. Estructura Completa de Archivos

### Paginas HTML publicas

| Archivo | Proposito |
|---------|-----------|
| `index.html` | Homepage: hero, vehiculos destacados, vistos recientemente, marcas, categorias |
| `busqueda.html` | Catalogo completo con filtros avanzados |
| `detalle-vehiculo.html` | Template para paginas de vehiculo (usado por generate-vehicles.mjs) |
| `marca.html` | Pagina individual de marca (carga dinamica por query param o prerendered) |
| `marcas.html` | Listado de todas las marcas disponibles |
| `vehiculos-suv.html` | Catalogo filtrado: SUVs |
| `vehiculos-sedan.html` | Catalogo filtrado: sedanes |
| `vehiculos-pickup.html` | Catalogo filtrado: pickups |
| `vehiculos-hatchback.html` | Catalogo filtrado: hatchbacks |
| `vehiculos-camionetas.html` | Catalogo filtrado: camionetas |
| `vehiculos-nuevos.html` | Catalogo filtrado: vehiculos nuevos |
| `vehiculos-usados.html` | Catalogo filtrado: vehiculos usados |
| `comparar.html` | Comparador lado a lado de vehiculos |
| `simulador-credito.html` | Calculadora de financiamiento |
| `favoritos.html` | Vehiculos guardados por el usuario (localStorage) |
| `resenas.html` | Resenas/testimonios de clientes |
| `contacto.html` | Formulario de contacto general |
| `nosotros.html` | Pagina "Sobre nosotros" |
| `terminos.html` | Terminos y condiciones |
| `privacidad.html` | Politica de privacidad |
| `cookies.html` | Politica de cookies con banner de consentimiento |
| `404.html` | Pagina de error 404 personalizada |
| `perfil.html` | Panel de usuario: perfil, favoritos, historial, busquedas, solicitudes, citas, preferencias, seguridad |

### Paginas admin / internas

| Archivo | Proposito |
|---------|-----------|
| `admin.html` | Panel de administracion (SPA completa) |
| `admin-upload.html` | Subida de imagenes (auxiliar) |
| `google8d667a72b0e3536b.html` | Verificacion de Google Search Console |

### Directorios auto-generados

| Directorio | Contenido | Generado por |
|------------|-----------|-------------|
| `vehiculos/` | `{slug}.html` por vehiculo (ej: `chevrolet-equinox-ls-2018-1.html`) | generate-vehicles.mjs |
| `marcas/` | `{slug}.html` por marca (ej: `toyota.html`) | generate-vehicles.mjs |

### JavaScript — Sitio publico (`js/`)

| Archivo | Proposito |
|---------|-----------|
| `firebase-config.js` | Init Firebase app + Auth + Firestore + persistence + deferred SDKs |
| `components.js` | Header/footer dinamicos (fetch snippets), smooth scroll, loadModalsIfNeeded() |
| `database.js` | Lectura publica de Firestore: vehiculos, marcas, banners. Cache en localStorage |
| `render.js` | Renderizado de cards de vehiculos en el DOM |
| `contact-forms.js` | Modals: "Vende tu Auto" (wizard 3 pasos) + "Financiacion". Guarda en Firestore `solicitudes` |
| `contact.js` | Formulario de contacto general |
| `cache-manager.js` | Cache inteligente de 4 capas (Memory → IndexedDB → localStorage → SW) |
| `favorites-manager.js` | Gestion de favoritos: Firestore para registrados, prompt login para anonimos |
| `filtros-avanzados.js` | Filtros sidebar: marca, precio, year, km, tipo, categoria |
| `comparador.js` | Logica del comparador de vehiculos |
| `cookies.js` | Banner de consentimiento de cookies |
| `citas.js` | Formulario publico de solicitud de citas |
| `dynamic-lists.js` | Listados dinamicos de vehiculos por categoria/marca |
| `featured-week-banner.js` | Banner de vehiculo destacado de la semana |
| `historial-visitas.js` | Historial de vehiculos visitados: localStorage para todos, Firestore sync para registrados |
| `page-loader.js` | Animacion de carga de pagina |
| `performance.js` | Lazy loading de imagenes, IntersectionObserver |
| `reviews.js` | Renderizado publico de resenas |
| `simulador/` | Directorio con logica del simulador de credito |
| `toast.js` | Sistema de notificaciones toast |
| `auth.js` | Login, registro, Google sign-in, reset password, onAuthStateChanged, saveClientProfile, header state |
| `perfil.js` | Panel de usuario: 8 secciones, avatar upload, Firestore sync, busquedas guardadas, preferencias |
| `main.js` | Punto de entrada general (legacy) |

### JavaScript — Panel admin (`js/admin-*.js`)

| Archivo | Proposito |
|---------|-----------|
| `admin-state.js` | Estado global `window.AP`, RBAC helpers, escapeHtml, closestAction, formatPrice, refreshIcons |
| `admin-auth.js` | Login, logout, 2FA, rate limiting, presencia RTDB, session timeout |
| `admin-sync.js` | Listeners realtime Firestore, migracion de schema, stats, cache invalidation |
| `admin-vehicles.js` | CRUD vehiculos, imagenes, drafts, wizard, drag-reorder destacados |
| `admin-brands.js` | CRUD de marcas |
| `admin-dealers.js` | Gestion de aliados/concesionarios |
| `admin-users.js` | Gestion de usuarios (solo super_admin) |
| `admin-appointments.js` | Gestion de citas/solicitudes |
| `admin-operations.js` | Registro de ventas, exportacion, deploy a GitHub |
| `admin-lists.js` | Leads |
| `admin-reviews.js` | Gestion de resenas |
| `admin-banners.js` | Gestion de banners promocionales |
| `admin-activity.js` | Visor de audit log |
| `admin-table-utils.js` | Paginacion, sort, search, export CSV para tablas |
| `admin-phase5.js` | Wizard avanzado, charts de actividad, theme toggle |

### CSS (`css/`)

| Archivo | Proposito |
|---------|-----------|
| `style.css` | Estilos principales del sitio publico |
| `dark-theme.css` | Variante dark mode |
| `admin.css` | Estilos del panel admin |
| `hero.css` | Hero banner de homepage |
| `contact-forms.css` | Modals de contacto/financiacion |
| `toast-notifications.css` | Notificaciones toast |
| `comparador.css` | Estilos del comparador |
| `calculadora-financiamiento.css` | Simulador de credito |
| `cookies.css` | Banner de cookies |
| `citas.css` | Formulario de citas |
| `reviews.css` | Seccion de resenas |
| `filtros-avanzados.css` | Filtros sidebar (busqueda) |
| `favorites-page.css` | Pagina de favoritos |
| `favorites-empty-fullpage.css` | Estado vacio de favoritos |
| `featured-week-banner.css` | Banner vehiculo destacado |
| `performance-fixes.css` | Optimizaciones CSS (overrides perf intencionales) |
| `animaciones.css` | Animaciones y transiciones |
| `historial-visitas.css` | Widget de historial de visitas |
| `page-loader.css` | Animacion de carga |
| `auth.css` | Modal de login/registro/reset: formularios, password strength, Google btn |
| `auth-header.css` | Estado logueado en header: avatar dropdown desktop + mobile |
| `perfil.css` | Panel de usuario: sidebar, cards, favoritos, solicitudes, citas, toggle, responsive |

> **Nota P6 (2026-05-02)**: 7 archivos `*-fixes.css` (mobile-fixes, vehicles-cards-fix, sidebar-filters-fix, footer-fixes, featured-fixes, brands-fixes, favorites-fix) fueron consolidados en `style.css` al final, cada uno bajo un comentario `MERGED FROM css/<name>.css (P6 — MFx.x)`. Reduce HTTP requests bloqueantes y simplifica el cascade. `performance-fixes.css` se mantiene aparte como single source de overrides perf curados.

### Snippets (`snippets/`)

Fragmentos HTML inyectados dinamicamente por `components.js`:

| Archivo | Contenido |
|---------|-----------|
| `header.html` | Navegacion principal, menu mobile, dropdowns de marcas/categorias |
| `footer.html` | Footer con links, redes sociales, info de contacto |
| `modals.html` | Modals de "Vende tu Auto" y "Financiacion" |
| `seo-meta.html` | Meta tags SEO reutilizables |
| `auth-modal.html` | Modal con tabs Ingresar/Registrarse/Reset, Google sign-in |

### Data (`data/`)

| Archivo | Contenido | Generado por |
|---------|-----------|-------------|
| `vehicle-slugs.json` | Mapa `{id: slug}` para URLs de vehiculos | generate-vehicles.mjs |
| `brand-slugs.json` | Mapa `{brandId: slug}` para URLs de marcas | generate-vehicles.mjs |
| `deploy-info.json` | `{version, sha, ref}` — señal de nuevo deploy | GitHub Actions |

### Multimedia (`multimedia/`)

| Directorio | Contenido |
|------------|-----------|
| `Logos/` | Logos de marcas de vehiculos |
| `banner/` | Banners de marca (ej: `b_toyota.png`, `b_chevrolet.png`) |
| `categories/` | Imagenes de categorias (SUV, sedan, pickup, etc.) |
| `heroes/` | Imagenes hero de paginas internas |
| `vehicles/` | Fotos de vehiculos subidas desde admin |
| `heroindex.webp` | Hero principal del homepage |
| `logo-placeholder.png` | Logo de Altorra Cars |
| `hero-car.jpg` | Imagen hero genérica |

### Archivos de configuracion raiz

| Archivo | Proposito |
|---------|-----------|
| `firebase.json` | Config de deploy Firebase (rules, functions) |
| `firestore.rules` | Reglas de seguridad Firestore |
| `database.rules.json` | Reglas de seguridad Realtime Database |
| `storage.rules` | Reglas de Firebase Storage |
| `package.json` | Scripts: `generate`, `lint`, `format`. Dep: firebase v12 |
| `manifest.json` | PWA manifest (standalone, es-CO, shortcuts) |
| `sitemap.xml` | Sitemap auto-generado |
| `robots.txt` | SEO: Allow + Disallow admin + Sitemap directive |
| `service-worker.js` | SW en raiz (scope: /) |
| `.nojekyll` | Evita procesamiento Jekyll en GitHub Pages |
| `.github/workflows/generate-vehicles.yml` | CI: genera paginas cada 4h |

### Cloud Functions (`functions/`)

| Archivo | Contenido |
|---------|-----------|
| `index.js` | Cloud Functions V2 + triggers Firestore + email via nodemailer |
| `package.json` | Node 22, firebase-admin v13, firebase-functions v7, nodemailer |

**Secrets requeridos**: `EMAIL_USER`, `EMAIL_PASS` (Gmail SMTP), `GITHUB_PAT`

### Otros directorios

| Directorio | Contenido |
|------------|-----------|
| `v/` | Paginas legacy de vehiculos por ID (backward compat) |
| `backups/` | Snapshots de Firestore |
| `public/` | `_redirects` (Netlify legacy, no usado en GitHub Pages) |
| `js/simulador/` | Logica del simulador de credito (simulator.js, ui.js, data.js, finance.js) |

### GitHub Actions (`.github/workflows/`)

| Workflow | Trigger | Accion |
|----------|---------|--------|
| `generate-vehicles.yml` | Push main, cron 4h, dispatch | Genera vehiculos + sitemap + bump cache |
| `deploy-firebase-rules.yml` | Push main (si cambian rules) | Deploy Firestore + Storage rules |

---

## 3. Firebase

### Config

```
Project ID: altorra-cars
Auth Domain: altorra-cars.firebaseapp.com
RTDB URL: https://altorra-cars-default-rtdb.firebaseio.com
Storage: altorra-cars.firebasestorage.app
```

### Deploy de reglas (manual, NO automatico)

```bash
firebase deploy --only firestore:rules
firebase deploy --only database
firebase deploy --only storage
firebase deploy --only functions
```

> Un cambio en las reglas del repo NO se aplica automaticamente a Firebase.
> Siempre desplegar manualmente despues de modificar reglas.

### Secrets configurados (Firebase Functions)

Ya configurados en el proyecto `altorra-cars`. NO volver a preguntar ni reconfigurar.

| Secret | Valor | Proposito |
|--------|-------|-----------|
| `EMAIL_USER` | `altorracarssale@gmail.com` | Correo Gmail para enviar emails (nodemailer) |
| `EMAIL_PASS` | *(configurado)* | App Password de Google para Gmail SMTP |
| `GITHUB_PAT` | *(configurado)* | Token GitHub para dispatch de Actions (regeneracion SEO) |

**Verificar**: `firebase functions:secrets:access EMAIL_USER`
**Cambiar**: `firebase functions:secrets:set EMAIL_PASS`
**App Password**: [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) (requiere 2FA activo)

### SDK en el frontend

`firebase-config.js` carga el SDK compat v11.3.0 desde CDN en 2 fases:
1. **Critico** (bloquea login): firebase-app + firebase-auth + firebase-firestore
2. **Diferido** (background): firebase-storage + firebase-functions + firebase-analytics + firebase-database

Persistence habilitada: `db.enablePersistence({ synchronizeTabs: true })`

Objetos globales: `window.db`, `window.auth`, `window.storage`, `window.functions`, `window.rtdb`, `window.firebaseAnalytics`

Troubleshooting: `window.clearFirestoreCache()` limpia IndexedDB y recarga.

---

## 4. RBAC (Control de Acceso por Roles)

### Roles

| Rol | Permisos |
|-----|----------|
| `super_admin` | Acceso total. Gestiona usuarios, vehiculos, marcas, aliados, config |
| `editor` | Crea/edita vehiculos y marcas. No gestiona usuarios ni elimina |
| `viewer` | Solo lectura en panel admin |

### Helpers RBAC en admin-state.js

```javascript
AP.isSuperAdmin()           // rol === 'super_admin'
AP.isEditor()               // rol === 'editor'
AP.isViewer()               // rol === 'viewer'
AP.canManageUsers()         // solo super_admin
AP.canCreateOrEditInventory() // editor+
AP.canDeleteInventory()     // solo super_admin
AP.isEditorOrAbove()        // editor o super_admin
```

### Firestore Rules (resumen)

```
vehiculos/{id}       — read: public | create/update: editor+ (con _version) | delete: super_admin
usuarios/{uid}       — read: own doc OR super_admin | write: super_admin only
marcas/{id}          — read: public | write: editor+ (con _version)
banners/{id}         — read: public | write: editor+ (con _version)
solicitudes/{id}     — read: authenticated | create: public | update: editor+ | delete: super_admin
citas/{id}           — read: authenticated | create: public | update: editor+ | delete: super_admin
leads/{id}           — read: authenticated | create: public | delete: super_admin
resenas/{id}         — read: public | create/update: editor+ | delete: super_admin
concesionarios/{id}  — read: authenticated | write: super_admin only
loginAttempts/{hash} — read/write: public (rate limiting cross-device)
auditLog/{id}        — read: authenticated | create: editor+ | delete: super_admin (INMUTABLE)
config/{docId}       — read: public | write: varies (bookedSlots: public, counters: editor+)
system/{docId}       — read: public | write: editor+ (cache invalidation)
drafts_activos/{uid} — read/write: editor+ (own uid only)
clientes/{uid}/busquedasGuardadas/{searchId} — read/write: own uid only
```

### Optimistic Locking (`_version`)

- Editores DEBEN incrementar `_version` en cada update
- Super Admin puede editar SIN incrementar (bypass en rules)
- Creacion: `_version = 1`
- Update: `_version = resource.data._version + 1`
- Previene conflictos en edicion concurrente

### Cloud Functions (V2 — activas)

| Funcion | Guard | Accion |
|---------|-------|--------|
| `createManagedUserV2` | `verifySuperAdminV2` | Crea Auth user + doc en `usuarios/{uid}` |
| `deleteManagedUserV2` | `verifySuperAdminV2` + self-delete protection | Elimina doc + Auth user |
| `updateUserRoleV2` | `verifySuperAdminV2` | Actualiza rol, nombre en `usuarios/{uid}` |
| `onNewSolicitud` | Trigger `onCreate` en `solicitudes/{id}` | Email al admin con datos de solicitud/cita. Idempotente (`emailSent` flag) |
| `onSolicitudStatusChanged` | Trigger `onUpdate` en `solicitudes/{id}` | Email al cliente cuando estado cambia a confirmada/reprogramada/cancelada/completada. Idempotente (`statusEmailSent_{estado}` flag) |
| `onVehicleChange` | Trigger `onWrite` en `vehiculos/{id}` | Dispatch GitHub Actions para regenerar paginas SEO. Debounce 5 min. Solo si cambian campos SEO |
| `triggerSeoRegeneration` | `verifySuperAdmin` (callable) | Dispatch manual de regeneracion SEO desde admin panel |
| `onVehiclePriceAlert` | Trigger `onUpdate` en `vehiculos/{id}` | Detecta baja de precio, busca `clientes/{uid}/busquedasGuardadas` con `alertas:true` que coincidan, envia email al cliente. Rate limit 1 email/cliente/vehiculo/dia |

### RTDB Rules (Realtime Database)

```json
{
  "presence": {
    ".read": "auth != null",
    ".indexOn": ["online"],
    "$sessionId": {
      ".write": "(!data.exists() && newData.child('uid').val() === auth.uid) || data.child('uid').val() === auth.uid",
      ".validate": "newData.hasChild('uid') && newData.child('uid').val() === auth.uid"
    }
  }
}
```

- Estructura: `/presence/{sessionId}` — un nodo por dispositivo/tab (no por usuario)
- Cada sesion se crea con `push()` y contiene campo `uid` para identificar al dueno
- `.read: auth != null` a nivel `/presence` permite que `loadActiveSessions()` lea todos los nodos
- `.indexOn: ["online"]` requerido por la query `orderByChild('online').equalTo(true)`
- `.write`: solo el dueno (`uid === auth.uid`) puede crear, actualizar o eliminar su sesion
- `.validate`: asegura que siempre exista campo `uid` y que coincida con auth
- `onDisconnect().remove()` elimina el nodo al desconectarse (desaparicion instantanea)
- **Deploy manual obligatorio**: `firebase deploy --only database` despues de cambiar reglas

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

## 5. Firestore Schema (Colecciones y Campos)

### vehiculos/{id}

| Campo | Tipo | Notas |
|-------|------|-------|
| marca | string | Nombre de la marca |
| modelo | string | Nombre del modelo |
| year | number | Ano del vehiculo |
| tipo | string | "nuevo" o "usado" |
| categoria | string | "suv", "sedan", "pickup", "hatchback", "camioneta" |
| precio | number | Precio de lista en COP |
| precioOferta | number | Precio promocional (opcional) |
| kilometraje | number | Kilometraje en km |
| transmision | string | "Manual", "Automatica" |
| combustible | string | "Gasolina", "Diesel", "Hibrido", "Electrico" |
| motor | string | Descripcion del motor |
| potencia | number | Caballos de fuerza |
| cilindraje | string | CC del motor |
| traccion | string | "Delantera", "Trasera", "4x4" |
| direccion | string | "Hidraulica", "Electrica" |
| color | string | Color del vehiculo |
| puertas | number | Default: 5 |
| pasajeros / asientos | number | Default: 5 |
| ubicacion | string | Default: "Cartagena" |
| placa | string | Placa o "Disponible al contactar" |
| codigoFasecolda | string | Codigo tecnico o "Consultar" |
| codigoUnico | string | `ALT-YYYYMM-XXXX` (auto-generado, inmutable, nunca reutilizado) |
| descripcion | string | Descripcion larga |
| estado | string | "disponible", "reservado", "vendido", "borrador" |
| imagen | string | URL imagen principal |
| imagenes | array | URLs de todas las imagenes |
| caracteristicas | array | ["ABS", "Aire acondicionado", ...] |
| destacado | boolean | Destacado en homepage |
| featuredOrder | number | Orden de destacado |
| featuredCutoutPng | string | URL imagen recortada PNG |
| oferta | boolean | Tiene precio promocional |
| prioridad | number | Prioridad de destacado (0-100) |
| concesionario | string | Referencia al aliado ("_particular" = consignacion) |
| consignaParticular | string | Nombre del dueno si es consignacion |
| revisionTecnica | boolean | Default: true |
| peritaje | boolean | Default: true |
| _version | number | Optimistic locking |
| createdAt | timestamp | Fecha de creacion |
| createdBy / createdByName | string | Quien lo creo |
| lastModifiedAt | timestamp | Ultima edicion |
| lastModifiedBy / lastModifiedByName | string | Quien lo edito |
| updatedAt | timestamp | Para lastmod en sitemap |

**Subcollection**: `vehiculos/{id}/auditLog/{logId}` — action, user, userName, timestamp, changes[]

### usuarios/{uid}

| Campo | Tipo |
|-------|------|
| uid | string (Firebase Auth UID) |
| email | string |
| nombre | string |
| rol | string ("super_admin", "editor", "viewer") |
| estado | string ("activo") |
| bloqueado | boolean |
| habilitado2FA | boolean |
| telefono2FA | string |
| prefijo2FA | string (default "+57") |
| trustedDevices | array |
| creadoEn / creadoPor | timestamp / string |

**Subcollection**: `usuarios/{uid}/drafts/{draftId}` — borradores de vehiculos en edicion

### solicitudes/{id} (sistema unificado de comunicaciones)

| Campo | Tipo |
|-------|------|
| nombre, telefono, email | string |
| prefijoPais | string (default "+57") |
| tipo | string ("consignacion_venta", "financiacion", "contacto_general") |
| origen | string ("vende_tu_auto", "financiacion", "form_contacto") |
| vehiculo | string |
| datosExtra | object (datos especificos del tipo) |
| comentarios | string |
| estado | string ("pendiente", "contactado", "completado", "rechazado") |
| observaciones | string (notas del admin) |
| createdAt | timestamp |

### Otras colecciones

| Coleccion | Campos clave |
|-----------|-------------|
| `marcas/{id}` | nombre, logo, descripcion, _version |
| `concesionarios/{id}` | nombre, telefono, responsable, direccion |
| `resenas/{id}` | nombre, calificacion (1-5), comentario, estado |
| `banners/{id}` | titulo, imagen, enlace, position, active, order, _version |
| `loginAttempts/{hash}` | email, intentos, bloqueado, ultimoIntento |
| `auditLog/{id}` | action, user, timestamp, details (INMUTABLE) |
| `config/counters` | vehicleCodeSeq (para codigoUnico) |
| `config/bookedSlots` | Disponibilidad de citas |
| `system/meta` | lastModified (senal de cache invalidation) |
| `drafts_activos/{uid}` | Borradores activos visibles para colaboracion |

---

## 6. Sistemas Clave

### 6.1 Pipeline Firestore → GitHub Pages

**Flujo**: Firestore (datos) → GitHub Actions → generate-vehicles.mjs → HTML estatico → GitHub Pages

**Triggers** (`.github/workflows/generate-vehicles.yml`):
1. Push a `main`
2. Cron cada 4 horas
3. `repository_dispatch` (webhook desde Cloud Function)
4. `workflow_dispatch` (manual desde GitHub UI)

**Que genera `generate-vehicles.mjs`**:
- `vehiculos/{slug}.html` — pagina por vehiculo con meta OG, Twitter Cards, JSON-LD (Car), noscript SEO
- `marcas/{slug}.html` — pagina por marca con listado de vehiculos, JSON-LD (AutoDealer)
- `data/vehicle-slugs.json` — mapa id→slug (inmutable, nunca se reutiliza un slug)
- `data/brand-slugs.json` — mapa brandId→slug
- `sitemap.xml` — con lastmod fijo para estaticas, dinamico para vehiculos

**Slugs**: `marca-modelo-year-id` normalizado (sin acentos, lowercase). Inmutables una vez creados.

**Variables inyectadas**: `PRERENDERED_VEHICLE_ID` y `PRERENDERED_BRAND_ID` en cada pagina generada para que el JS del frontend cargue datos sin query params.

**Post-generacion** (solo si hay cambios reales):
- `data/deploy-info.json` → `{version: "YYYYMMDDHHMMSS", sha, ref}`
- `service-worker.js` → bump `CACHE_VERSION`
- `js/cache-manager.js` → bump `APP_VERSION`
- Commit con `[skip ci]` para evitar loop recursivo

### 6.2 Cache de 4 Capas (`cache-manager.js`)

| Capa | Almacenamiento | Persistencia | Uso |
|------|---------------|-------------|-----|
| L1 | Memory (Map) | Session | Lectura rapida |
| L2 | IndexedDB (`app-data`, `cache-meta`) | Permanente | Entre sesiones |
| L3 | localStorage (`altorra-db-cache`) | Permanente | Usado por database.js |
| L4 | Service Worker Cache | Permanente | Assets estaticos |

**Dos senales de invalidacion:**

1. **Admin cambia datos** → `admin-sync.js` escribe `system/meta.lastModified` → cache-manager tiene listener realtime → `AltorraCache.invalidate()` limpia L1/L2/L3
2. **GitHub deploy** → `deploy-info.json` cambia → cache-manager lo poll cada 10 min → si version cambio → muestra banner "Nueva version disponible" → `AltorraCache.clearAndReload()` limpia TODO + recarga

**Grace period**: 30s despues de clearAndReload para evitar loop infinito de recargas.

**API publica**: `window.AltorraCache.get()`, `.set()`, `.invalidate()`, `.clearAndReload()`, `.validateWithFirestore()`, `.validateDeployVersion()`

### 6.3 Service Worker (`service-worker.js`)

| Tipo de request | Estrategia |
|----------------|-----------|
| `.json` | Network Only (siempre fresco) |
| HTML pages | Network First → cache fallback → /index.html |
| Hero/banner/category images | Network First (cambian con deploys) |
| CSS, JS, logos | Stale-While-Revalidate |
| Otros assets | Stale-While-Revalidate |

**Precache**: Solo logos de marcas (inmutables). NO precachea HTML ni vehiculos.
**Install**: `skipWaiting()` inmediato.
**Activate**: Limpia caches viejos. Envia `SW_UPDATED` a clients solo en updates reales.

### 6.4 Admin Panel (SPA)

**Patron de estado**: Objeto global `window.AP` (AdminPanel) con:
- Arrays de datos: `vehicles`, `brands`, `users`, `dealers`, `appointments`, `reviews`, `banners`
- Perfil: `currentUserProfile`, `currentUserRole`
- Funciones unsubscribe de listeners Firestore
- Helpers: `$()`, `toast()`, `escapeHtml()`, `formatPrice()`, `closestAction()`, `refreshIcons()`

**Navegacion**: Secciones por `data-section` attributes. Sidebar links muestran/ocultan secciones.

**Sesion**:
- Inactividad: 30 min timeout (warning a los 28 min)
- Sesion maxima: 8 horas absoluto
- Tracking: mousemove, click, scroll, keydown
- Persistence: `Auth.Persistence.LOCAL` (sesion sobrevive cierre de tab)

**2FA** (implementado con seguridad reforzada):
- Opcional por usuario (`habilitado2FA`)
- Verificacion por SMS via Firebase Auth Phone Provider + reCAPTCHA invisible
- Rate limiting en verificacion de codigo: max 5 intentos por codigo, luego requiere reenvio
- Cooldown de reenvio: 30 segundos entre reenvios con countdown visual
- Max 5 reenvios por sesion (previene abuso de SMS)
- Mensajes de error diagnosticos para problemas de SMS (billing, config, red)
- Super admin puede auto-desbloquear cuenta con codigo temporal
- Auto-desbloqueo de cuentas bloqueadas despues de 15 minutos
- Super admin sync: si `loginAttempts` fue auto-desbloqueado, sincroniza `usuarios.bloqueado`

**Dispositivos de confianza** (`admin-auth.js`):
- Duracion: 30 dias (`TRUST_DURATION_MS`)
- Token aleatorio guardado en localStorage + array `trustedDevices` en Firestore `usuarios/{uid}`
- Cada entrada almacena: token, browser, os, city, region, country, ip (anonimizada), timezone, createdAt, expiresAt, lastUsed
- `fetchLocationInfo()` obtiene geolocalizacion por IP via `get.geojs.io/v1/ip/geo.json` (HTTPS, CORS `*`, sin API key, sin permisos)
- IP anonimizada: ultimo octeto reemplazado con `***` (ej: `190.28.123.***`)
- Resultado cacheado por page load (`_locationCache`) para evitar llamadas redundantes
- IP anonimizada: ultimo octeto reemplazado con `***` (ej: `190.28.123.***`)
- Ubicacion se refresca en cada login (`updateDeviceLastUsed`)
- UI muestra: navegador, OS, ubicacion con pin, IP anonimizada, ultimo uso, dias restantes
- Acciones: revocar individual o revocar todos

### 6.5 Sistema de Presencia y Sesiones Activas (RTDB)

**Ubicacion**: `admin-auth.js` → `startPresence()`, `stopPresence()`, `loadActiveSessions()`

**Arquitectura**: `/presence/{sessionId}` — un nodo por dispositivo/tab, no por usuario. Permite que el mismo usuario aparezca en multiples dispositivos simultaneamente, y que multiples usuarios se vean entre si.

**Escritura** (`startPresence`):
- Crea nodo con `push()` en `/presence/` con datos: uid, email, nombre, rol, browser, os, city, region, country, ip, lastSeen, online
- Usa `.info/connected` para detectar conexion/desconexion de RTDB
- `onDisconnect().remove()` elimina el nodo al perder conexion (desaparicion instantanea)
- Heartbeat cada 2 min actualiza `lastSeen` (mantiene sesion fresca para deteccion de stale)
- Guards de autenticacion: verifica `auth.currentUser` + `_presenceActive` flag antes de cada write
- Orphan cleanup: busca sesiones huerfanas con mismo `uid + deviceId`, las elimina (excluye el push key nuevo)
- Geolocalizacion por IP via `fetchLocationInfo()` al iniciar sesion

**Lectura** (`loadActiveSessions`):
- Query realtime: `presence.orderByChild('online').equalTo(true)`
- Filtra sesiones stale: descarta sesiones con `lastSeen` > 5 min (tab cerrada sin onDisconnect limpio)
- Auto-limpia entradas propias stale (via `remove()`)
- Muestra: nombre, rol, ubicacion (ciudad/pais), navegador/OS, indicador "(tu)"
- Retry automatico si RTDB no esta cargado (SDK diferido)
- Error callback muestra "No se pudieron cargar" en vez de "Cargando..." infinito

**Limpieza** (`stopPresence`):
- Pone `_presenceActive = false` PRIMERO (previene set() de callbacks pendientes)
- Detiene heartbeat interval
- Desuscribe listener de `.info/connected`
- Desuscribe listener de sesiones activas (`_activeSessionsRef`)
- Cancela `onDisconnect()` para evitar removes duplicados
- Elimina nodo de sesion con `remove()` (desaparece instantaneamente en todos los clientes)
- Se llama ANTES de `auth.signOut()` en TODOS los paths de logout

**Propiedades en `AP`**: `_presenceRef`, `_presenceConnectedRef`, `_presenceHeartbeat`, `_activeSessionsRef`, `_presenceLocation`, `_presenceDevice`

### 6.6 Sistema de Drafts (Borradores)

- Auto-guardado cada 10s mientras se edita un vehiculo
- Almacenados en `usuarios/{uid}/drafts/vehicleDraft`
- Visibilidad compartida via `drafts_activos/{userId}` (otros editores ven quien esta editando)
- Al abrir modal: pregunta si restaurar draft existente
- Al cerrar modal: pregunta si guardar cambios no guardados
- Dirty check evita writes redundantes

### 6.7 Migracion Automatica de Schema

**Ubicacion**: `admin-sync.js` → `migrateVehicleSchema()`
**Ejecucion**: Una vez por sesion, en el primer snapshot de vehiculos
**Comportamiento**: Idempotente, no destructivo, usa batch writes (max 500)

Para agregar un campo nuevo: agregar entrada en `DEFAULTS` dentro de `migrateVehicleSchema()`.

Campos que migra: codigoUnico, _version, estado, tipo, direccion, ubicacion, puertas, pasajeros, placa, destacado, prioridad.

### 6.8 Formularios Publicos

**"Vende tu Auto"** (wizard 3 pasos):
1. Datos de contacto (nombre, telefono, email)
2. Datos del vehiculo (marca, modelo, year, km, precio esperado)
3. Resumen + confirmacion
→ Guarda en `solicitudes` con tipo `consignacion_venta` + abre WhatsApp

**"Financiacion"** (formulario unico):
- Datos contacto + vehiculo de interes + cuota inicial, plazo, ingresos, situacion laboral
→ Guarda en `solicitudes` con tipo `financiacion` + abre WhatsApp

**WhatsApp**: Todos los formularios abren chat con mensaje pre-formateado al +573235016747

### 6.9 CodigoUnico (Auto-generado)

- Formato: `ALT-YYYYMM-XXXX` (ej: `ALT-202604-0042`)
- Secuencia atomica en `config/counters.vehicleCodeSeq` (transaction)
- Inmutable una vez creado, nunca reutilizado
- Generado en `admin-vehicles.js` al crear vehiculo

---

## 7. Patrones y Convenciones del Codigo

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

`AP.closestAction(e)` verifica `nodeType` antes de `closest()` para evitar crash con SVG child nodes.

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

### Sitemap: lastmod

Las paginas estaticas en `generate-vehicles.mjs` usan fechas fijas de lastmod.
Solo actualizar la fecha cuando el contenido de la pagina realmente cambia.
Google ignora lastmod si siempre muestra la fecha actual.

### Subida de imagenes

```javascript
AP.UPLOAD_CONFIG = {
    maxFileSizeMB: 2,
    maxWidthPx: 1200,
    compressionQuality: 0.75,
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
    storagePath: 'cars/'
}
```

Las imagenes se comprimen client-side antes de subir a Firebase Storage.

### Lucide Icons (Admin Panel)

Libreria de iconos profesional integrada en `admin.html`. Reemplaza los 59+ SVGs inline y emojis que habia antes.

**CDN**: `https://cdn.jsdelivr.net/npm/lucide@0.468.0/dist/umd/lucide.min.js` (cargado con `defer`)

**Uso en HTML estatico**:
```html
<i data-lucide="icon-name"></i>
```

**Inicializacion**: `lucide.createIcons()` se llama en `DOMContentLoaded`. Si el script carga despues, se escucha su evento `load`.

**Despues de renders dinamicos**: Llamar `AP.refreshIcons()` para que Lucide procese los nuevos `<i data-lucide>` inyectados en el DOM.

```javascript
// Despues de innerHTML con iconos Lucide
container.innerHTML = htmlConIcones;
AP.refreshIcons(); // Convierte <i data-lucide="x"> en SVGs
```

**Sizing en CSS** (`admin.css`):
```css
.nav-item [data-lucide]    { width: 18px; height: 18px; }
.stat-icon [data-lucide]   { width: 22px; height: 22px; }
.btn [data-lucide]         { width: 16px; height: 16px; }
.quick-action-btn [data-lucide] { width: 20px; height: 20px; }
.v-act [data-lucide]       { width: 16px; height: 16px; }
```

**Excepcion**: El logo de WhatsApp sigue siendo SVG inline (icono de marca, no esta en Lucide).

### Botones de Accion de Vehiculos

Los botones de accion en la tabla de vehiculos usan un sistema icon-only con tooltips CSS.

**Clases CSS**:
- `.v-actions` — contenedor flex con gap y wrap
- `.v-act` — boton icono base (32px, transparente, hover con color)
- `.v-act-sep` — separador vertical entre grupos
- `.v-act--info/--gold/--success/--warning/--danger` — variantes de color en hover
- `.v-act--active` — estado activo persistente (ej: vehiculo ya destacado)
- `.v-act--operation` — boton con texto + icono (caso especial: "Operacion")
- `.v-act-protected` — badge para vehiculos vendidos protegidos

**Grupos visuales** (separados por `.v-act-sep`):
1. **Ver**: eye (vista previa), clock-3 (historial) — siempre visible
2. **Editar**: star (destacar), pencil (editar), copy (duplicar), handshake (operacion) — editor+
3. **Peligro**: trash-2 (eliminar) — solo super_admin

**Responsive**: 3 breakpoints (32px desktop, 30px tablet, 28px mobile). Los separadores se ocultan en <480px.

**Tooltips CSS**: `::after` con `content: attr(title)`. Se desactivan en `@media (hover: none)` para touch.

### Cache invalidation desde admin

Despues de cualquier write a Firestore desde el admin, llamar:
```javascript
// admin-sync.js: signalCacheInvalidation()
db.doc('system/meta').update({ lastModified: Date.now() });
```
Esto dispara la invalidacion en el sitio publico via cache-manager.js.

---

## 8. Errores Conocidos y Soluciones

### Login admin "permission-denied" intermitente + lento (race condition WebChannel)

**Sintomas**:
- A veces el login fallaba con `[Auth] Reason: Las reglas de seguridad impiden leer tu perfil`
- A veces ingresaba despues de varios reintentos, a veces al primer intento
- Login se sentia lento (teardown + rebuild del canal en cada intento)
- Aparecia en consola: `permission-denied` aunque las reglas fueran correctas y el usuario tuviera su doc en `usuarios/{uid}`

**Causa raiz**: El SDK Compat de Firestore mantiene un **WebChannel de larga duracion** que es reusado entre requests. Cuando `onAuthStateChanged` dispara `loadUserProfile` justo despues de `signInWithEmailAndPassword`, el SDK puede enviar el `.get('usuarios/{uid}')` por el canal viejo con estado de auth `null` o anonimo. Firestore evalua la regla `request.auth != null && request.auth.uid == userId` con `request.auth == null` y rechaza con `permission-denied`. Ver: https://github.com/firebase/firebase-js-sdk/issues/6118

**Intentos previos que NO funcionaron**:
1. Retry con `getIdToken(true)` + backoff: mismo WebChannel, mismo estado stale.
2. `disableNetwork()` + `enableNetwork()` + retry: `enableNetwork()` resuelve **antes** de que el handshake del nuevo canal termine, asi que el primer `get()` post-enable puede seguir corriendo el race. Ademas hacia el login MUY lento.

**Fix definitivo** (2026-04-15) — REST API bypass:

En lugar de usar el WebChannel del SDK para leer el perfil, `loadUserProfile` ahora usa la **REST API de Firestore** directamente. REST acepta el ID token explicitamente en el header `Authorization: Bearer <token>` en cada request — no hay canal persistente, no hay race, no hacen falta reintentos para estado transitorio.

```javascript
// admin-auth.js — loadProfileViaREST(authUser)
authUser.getIdToken().then(function(idToken) {
    return fetch('https://firestore.googleapis.com/v1/projects/altorra-cars/databases/(default)/documents/usuarios/' + encodeURIComponent(authUser.uid), {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + idToken, 'Accept': 'application/json' },
        cache: 'no-store'
    });
});
```

**Decoder REST → SDK shape**: La REST API devuelve `{ field: { stringValue: 'x' }, ... }` en vez de objetos planos. Se agregaron `decodeFirestoreFields()` y `decodeFirestoreValue()` en `admin-auth.js` que convierten el formato tipado al formato plano. Los `timestampValue` se devuelven como objetos duck-typed con `.toDate()`, `.toMillis()`, `.seconds`, `.nanoseconds` para preservar compatibilidad con el resto del codigo.

**Archivos modificados**:
- `admin-auth.js`: agregadas `loadProfileViaREST()`, `decodeFirestoreFields()`, `decodeFirestoreValue()`. `loadUserProfile()` reescrita para usar REST. Eliminadas `isTransientAuthError()`, flag `_profileForceHandshakeDone`, llamadas a `disableNetwork/enableNetwork`. Reintentos reducidos de 3 a 2 y solo aplican a errores de red reales (fetch failures).

**Requisitos**:
- El proyecto Firebase debe tener `firestore.googleapis.com` accesible (default, no cambiar)
- CORS de Firestore REST acepta `fetch()` desde cualquier origen con el header `Authorization` correcto — no requiere configuracion adicional

**Si persiste** (muy improbable tras este fix):
- Verificar reglas desplegadas: `firebase deploy --only firestore:rules`
- Verificar que el doc existe: `usuarios/{uid}` en la consola de Firebase
- Verificar en consola: deberia ver `GET /v1/projects/altorra-cars/.../usuarios/{uid} 200` en Network tab

### "Access denied for UID" con mensaje invisible (pre-2026-04-15)

**Causa** (historica): Dos problemas combinados antes del fix REST:
1. Error de red impedia cargar perfil de Firestore → el codigo trataba cualquier error como "acceso denegado" y hacia signOut
2. `showAccessDenied()` llamaba a `signOut()`, que disparaba `onAuthStateChanged(null)` → `showLogin()` → **ocultaba el mensaje de error** antes de que el usuario pudiera leerlo

**Fix aplicado** (2026-04-08 / 2026-04-10):
- `_accessDeniedShown` flag: `showLogin()` no oculta el error si `showAccessDenied` lo puso visible
- `console.warn('[Auth] Reason:', reason)` para diagnostico en consola
- (Los reintentos de red siguen activos, ahora con backoff [1s, 2s] aplicado solo a errores de fetch)

### Error 400 Bad Request en Firestore `/Listen/channel` al cerrar sesion

**Sintoma**: En consola aparecia en rojo al hacer logout (tanto en admin panel como en la web publica):
```
webchannel_connection.ts:260 POST https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel?VER=8... 400 (Bad Request)
webchannel_connection.ts:260 GET  https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel?VER=8... 400 (Bad Request)
```

**Causa**: Los listeners `onSnapshot()` de Firestore seguian activos cuando `signOut()` se ejecutaba. `signOut()` anula el token de auth, pero el WebChannel de Firestore intenta refrescar los streams de Listen con credenciales nulas, y el servidor rechaza con HTTP 400.

**Afectaba a dos flujos de logout**:
1. **Admin panel** (`admin-auth.js`): listeners de `admin-sync.js` (`unsubVehicles`, `unsubBrands`, etc.) sobre colecciones con reglas que requieren auth.
2. **Web publica** (`auth.js`): listeners de `database.js` (`vehiculos`, `marcas`, `banners`) — aunque son reads publicos, el WebChannel mismo se corrompe durante la transicion `admin → null → anonymous`.

**Fix aplicado** (2026-04-15):

**Admin panel** — llamar `AP.stopRealtimeSync()` **antes** de `window.auth.signOut()` en todos los paths de logout que corren despues de `showAdmin()` (donde arrancan los listeners):
- `logoutBtn` click handler (desktop)
- `mobileLogoutBtn` click handler (mobile)
- `handleInactivityTimeout()` (auto-logout 30 min)

Los paths de `signOut()` en 2FA cancel y unlock cancel **NO se tocaron** porque en ese momento los listeners aun no han arrancado (solo arrancan dentro de `showAdmin()`, que corre despues de la verificacion 2FA exitosa).

**Web publica** — llamar `window.vehicleDB.stopRealtime()` **antes** de `signOut()` en `handleLogout()` (`auth.js`). Despues, en `onAuthStateChanged()`, cuando llega el siguiente usuario autenticado (anonymous o registered) y el DB ya estaba cargado, se llama `startRealtime()` de nuevo para recuperar los listeners. El flujo completo es:

1. Usuario clickea logout → `handleLogout()` corre
2. `vehicleDB.stopRealtime()` detiene los 3 `onSnapshot` (vehiculos, marcas, banners)
3. `auth.signOut()` anula el token sin que haya Listen streams activos
4. `onAuthStateChanged(null)` dispara → limpia favoritesManager/vehicleHistory → `signInAnonymously()`
5. `onAuthStateChanged(anonUser)` dispara → re-setea favoritesManager/vehicleHistory
6. Si `vehicleDB.loaded && !vehicleDB._realtimeActive`, se llama `startRealtime()` — listeners vuelven a correr con el nuevo estado de auth sin conflicto

El mismo bloque de restart de listeners tambien cubre el caso de login registrado (el usuario pasa de anonymous → registered sin reload de pagina), por si en el futuro se agregan listeners que dependen de auth no-anonymous.

### Errores de presencia "permission_denied" en RTDB

**Causa**: Multiples problemas combinados:
1. Listeners de presencia escribian a `/presence/` despues de que el usuario fue deslogueado
2. No todos los paths de `signOut()` llamaban a `stopPresence()` primero (inactividad, sesion expirada, password change, mobile logout)
3. Race condition: `.info/connected` podia disparar `set()` despues de que `off()` fue llamado
4. Orphan cleanup podia eliminar la sesion recien creada por race condition con el cache local

**Fix aplicado** (2026-04-09):
- `_presenceActive` flag: el connected callback verifica este flag antes de llamar `set()`. Se pone `false` en `stopPresence()` ANTES de limpiar listeners
- `stopPresence()` ahora cancela `onDisconnect()` antes de hacer `remove()`
- `stopPresence()` se llama ANTES de `signOut()` en TODOS los paths: logout button, mobile logout, inactivity timeout, session expired, access denied, 2FA cancel, unlock cancel, password change invalid, `onAuthStateChanged(null)` safety net
- Orphan cleanup ahora excluye `presenceRef.key` para evitar borrar la sesion recien creada
- Push ref se crea ANTES del orphan cleanup para que el key exista en el callback

**Si persiste**: Verificar que las reglas de RTDB esten desplegadas:
```bash
firebase deploy --only database
```

### Widget "Sesiones Activas" siempre mostraba "Cargando..."

**Causa**: Tres problemas combinados:
1. `loadActiveSessions()` hacia `return` silencioso si `window.rtdb` no estaba cargado (SDK diferido), sin reintento
2. Reglas RTDB solo permitian `.read` a nivel `/presence/$uid`, no a nivel `/presence` (la query necesita leer toda la coleccion)
3. No habia `.indexOn: ["online"]` — RTDB rechaza queries `orderByChild` sin indice

**Fix aplicado** (2026-04-09):
- `database.rules.json`: `.read: "auth != null"` a nivel `/presence` + `.indexOn: ["online"]`
- `loadActiveSessions()`: retry cuando RTDB no esta listo + error callback + filtro de sesiones stale (>5 min)
- `startPresence()`: heartbeat cada 2 min para mantener `lastSeen` fresco
- `stopPresence()`: limpia heartbeat + listener de sesiones activas

**Requiere deploy manual**: `firebase deploy --only database`

### Permission-denied en favoritos y perfil cliente al hacer login en web publica

**Sintomas**: Al iniciar sesion con un usuario registrado (email/password) desde la web publica, aparecian en consola:
- `[Favorites] Error loading from Firestore: Missing or insufficient permissions.`
- `[Auth] Error guardando perfil cliente: Missing or insufficient permissions.`

**Causa**: Misma race condition del WebChannel que afectaba al admin panel. Cuando `signInWithEmailAndPassword` resuelve, `onAuthStateChanged` dispara inmediatamente y llama a `favoritesManager.setUser()` + `saveClientProfile()`. El SDK envia esos reads/writes por el WebChannel que aun tiene el token anonimo — Firestore evalua `request.auth.uid == uid` con el uid anonimo viejo y rechaza.

**Fix aplicado** (2026-04-16):
- `favorites-manager.js`: `_loadFromFirestore()` reintenta hasta 2 veces con backoff (500ms, 1000ms) cuando detecta error de permisos
- `auth.js`: `saveClientProfile()` misma logica de retry con backoff
- Ambos verifican que el uid no haya cambiado entre reintentos (guard contra user-changed-mid-flight)

### Cross-tab signOut causa permission-denied en admin panel

**Sintomas**: Al cerrar sesion desde la web publica (no desde el admin panel), aparecian en la consola de la tab del admin panel:
- `[Solicitudes] Error loading: FirebaseError: Missing or insufficient permissions.`
- `[Dealers] Error loading: FirebaseError: Missing or insufficient permissions.`
- `[AuditLog] Error loading: FirebaseError: Missing or insufficient permissions.`

NO ocurria al cerrar sesion desde el propio admin panel.

**Causa**: Firebase Auth usa `Persistence.LOCAL` (compartida entre tabs del mismo navegador). Cuando `signOut()` se ejecuta en la tab de la web publica:
1. El token de auth se anula en **todas las tabs** via IndexedDB/localStorage
2. En la tab del admin, el SDK de Firestore detecta el cambio de token
3. Los listeners `onSnapshot()` activos de `solicitudes`, `concesionarios` y `auditLog` reciben `permission-denied` del servidor (sus reglas requieren `auth != null`)
4. Esto ocurre **antes** de que `onAuthStateChanged(null)` pueda ejecutar `stopRealtimeSync()` para detener los listeners
5. Las colecciones con lectura publica (`vehiculos`, `marcas`, `banners`, `resenas`) NO se afectan

**Fix aplicado** (2026-04-16):
- `admin-appointments.js`, `admin-dealers.js`, `admin-activity.js`: guard `!window.auth.currentUser` en los error callbacks de `onSnapshot`
- Si el auth es null, el error es esperado (cross-tab signOut) y se silencia
- El flujo normal de cleanup sigue corriendo via `onAuthStateChanged(null)` → `showLogin()` → `stopRealtimeSync()`

**Archivos modificados**: `admin-appointments.js`, `admin-dealers.js`, `admin-activity.js`

### POST `accounts:signUp` 400 Bad Request al hacer login en web publica

**Sintoma**: Al iniciar sesion con email/password desde la web publica, aparecia en consola:
```
POST https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=... 400 (Bad Request)
```

**Causa**: `handleLogin()` usaba `linkWithCredential()` para intentar "upgrader" la sesion anonima actual al usuario con las credenciales proporcionadas. Para usuarios que YA tenian cuenta (el caso comun), esto fallaba con `auth/credential-already-in-use` y Firebase logueaba un 400 rojo en consola antes de que el fallback a `signInWithEmailAndPassword` corriera. Ademas, para emails mal escritos, `linkWithCredential` creaba silenciosamente una cuenta nueva (foot-gun).

**Fix aplicado** (2026-04-16):
- `auth.js`: `handleLogin()` ahora usa `signInWithEmailAndPassword()` directamente, sin intentar `linkWithCredential` primero
- El registro de cuentas nuevas solo ocurre en `handleRegister()` (via `createUserWithEmailAndPassword`)
- Eliminado el 400 rojo y el riesgo de registro accidental

**Archivos modificados**: `auth.js`

### SW `networkOnly` TypeError en primer page load

**Sintoma**: Al abrir la pagina por primera vez (no con Ctrl+Shift+R), aparecia en consola:
```
service-worker.js:133 [SW] Network only failed: TypeError: Failed to fetch
```

**Causa**: `cache-manager.js` → `fetchDeployVersion()` hace fetch a `deploy-info.json` con `cache: 'no-store'` al cargar la pagina. Este fetch pasa por el Service Worker (ruta `.json` → `networkOnly`). En el primer page load, si la red no esta lista o el SW acaba de instalarse, el fetch falla con TypeError. El caller (`fetchDeployVersion`) maneja el 503 gracefully (retorna `null`), pero el SW logueaba `console.error` (rojo) antes de retornar el fallback.

**Fix aplicado** (2026-04-16):
- `service-worker.js`: `console.error` → `console.warn` en `networkOnly()` + solo loguea `error.message` en vez del error completo
- El error ya no aparece en rojo — se muestra como warning amarillo (si aparece)

**Archivos modificados**: `service-worker.js`

### Google sign-in sobreescribia cuentas existentes (email/password o admin)

**Sintomas**: Un usuario se registra con email/password usando `correo@gmail.com`. Luego hace clic en "Continuar con Google" con el mismo Gmail. Firebase auto-vinculaba Google como segundo proveedor sin preguntar. Si el email pertenecia a un admin (`usuarios/{uid}`), se creaba un doc `clientes/{uid}` que interferia con el flujo admin.

**Causa**: Firebase Auth con "One account per email" (configuracion default) auto-vincula proveedores cuando ambos emails estan verificados. El SDK no lanza `auth/account-exists-with-different-credential` cuando ambos emails estan verificados — simplemente agrega el nuevo proveedor al account existente.

El codigo anterior usaba `signInWithPopup` + `linkWithPopup` como fallback, lo que:
1. Abria popup (bloqueada en muchos navegadores)
2. Si `linkWithPopup` fallaba → abria SEGUNDA popup con `signInWithPopup` (doble seleccion de cuenta)
3. No verificaba si el email era de un admin antes de crear doc en `clientes/`
4. No verificaba si ya existia registro con password

**Fix aplicado** (2026-04-17):

1. **`signInWithPopup`** (una sola llamada): reemplaza `signInWithRedirect` que no funciona en GitHub Pages (ver seccion abajo)
2. **`_processGoogleUser()`** valida: admin check → undo + signOut; duplicate email → undo; nuevo → saveClientProfile
3. **Check admin**: verifica `usuarios/{uid}` → si existe, `undoGoogleAndWarn()` + toast + signOut
4. **Check email/password existente**: verifica `user.providerData` por `password` + `google.com` → si ambos, `user.unlink('google.com')` deshace la auto-vinculacion + toast warning
5. **`handleLogin()` protegido**: verifica `usuarios/{uid}` antes de `saveClientProfile()` — admins que loguean desde web publica no generan doc en `clientes/`
6. **`auth/account-exists-with-different-credential`** manejado en catch de `signInWithPopup()`
7. **Popup bloqueada**: toast de 8s con instrucciones claras

**Archivos modificados**: `auth.js` (`handleGoogle`, `_processGoogleUser`, `undoGoogleAndWarn`, `handleLogin`, `friendlyError`)

### signInWithRedirect no funciona en GitHub Pages (cross-origin)

**Sintoma**: Al hacer clic en "Registrar con Google", el usuario era redirigido a Google, seleccionaba su cuenta, y volvia al index sin ningun registro completado ni mensaje visible. `getRedirectResult()` retornaba `null`.

**Causa**: `signInWithRedirect` almacena el resultado del redirect en sessionStorage del `authDomain` (`altorra-cars.firebaseapp.com`). Cuando la pagina recarga en el dominio de hosting (`altorracars.github.io`), `getRedirectResult()` no puede leer el sessionStorage cross-origin y retorna `null`. Es una limitacion conocida del Firebase SDK v9+ cuando `authDomain` != dominio de hosting.

**Referencia**: [Firebase Auth - Best practices for using signInWithRedirect](https://firebase.google.com/docs/auth/web/redirect-best-practices)

**Fix aplicado** (2026-04-17):
- Cambio de `signInWithRedirect` a `signInWithPopup`. Popup usa `postMessage` para comunicar el resultado, sin restriccion cross-origin
- Una sola llamada a `signInWithPopup` (no doble popup como antes)
- La llamada se hace sincronicamente en el click handler (no dentro de `.then()`) para evitar bloqueo de popup por el navegador
- `handleGoogleRedirectResult()` eliminada — ya no se necesita
- Si el navegador bloquea la popup: toast de 8 segundos con instrucciones claras
- Todas las protecciones (admin, duplicate email, auto-link undo) se procesan inline en `_processGoogleUser()`

**Archivos modificados**: `auth.js`

### Toast notifications silenciosas tras Google redirect (y otros flujos)

**Sintoma**: Al intentar registrarse con Google usando un email de admin o un email ya registrado con contraseña, el usuario era redirigido de vuelta al index SIN ningun mensaje visible. No aparecia toast, warning ni error. El usuario no entendia que habia pasado.

**Causa**: Todo el codigo usaba `typeof showToast === 'function'` + `showToast(msg, type)`, pero la funcion `showToast` NO existe. El archivo `toast.js` exporta un singleton `toast` (instancia de `ToastManager`) con metodos `.success(msg)`, `.error(msg)`, `.info(msg)`, `.show(msg, type, title, duration)`. La condicion `typeof showToast === 'function'` siempre evaluaba `false` — todos los toasts eran silenciados.

Problema adicional: `undoGoogleAndWarn()` desvinculaba Google del admin pero NO cerraba la sesion, dejando al usuario en un estado confuso (autenticado pero sin perfil).

**Fix aplicado** (2026-04-17):
1. `auth.js`: helper `_toast(message, type, duration)` que usa la API correcta `toast.show()` con mapeo `warn → error`
2. Reemplazados 7 usos de `showToast()` por `_toast()` en auth.js
3. `favorites-manager.js` y `components.js`: reemplazados `showToast()` por `toast.info()`
4. `undoGoogleAndWarn(user, message, shouldSignOut)`: nuevo parametro — para admins cierra sesion (`signOut()` + `_explicitLogout`), para emails duplicados deja la sesion con password
5. Warnings de seguridad (admin, email duplicado) usan duracion de 6000ms para dar tiempo a leer
6. Catch del handler de redirect ahora muestra toast de error en vez de fallar silenciosamente

**Archivos modificados**: `auth.js`, `favorites-manager.js`, `components.js`

### Seccion "Vistos Recientemente" nunca mostraba vehiculos

**Sintoma**: La seccion "Vistos Recientemente" en el homepage siempre estaba oculta, incluso despues de visitar multiples paginas de vehiculos.

**Causa**: Dos bugs combinados en `historial-visitas.js`:

1. **Path mismatch**: El auto-tracking (linea 387) verificaba `window.location.pathname.indexOf('detalle-vehiculo')`, pero las paginas generadas viven en `/vehiculos/{slug}.html`. El string `'detalle-vehiculo'` nunca aparece en `/vehiculos/chevrolet-equinox-ls-2018-1.html`, asi que `trackCurrentVehicle()` jamas se ejecutaba.

2. **ID source incorrecto**: `_maybeTrackCurrent()` buscaba el ID del vehiculo en `?id=` (query param), pero las paginas generadas inyectan `window.PRERENDERED_VEHICLE_ID` y no usan query params.

**Fix aplicado** (2026-04-17):
- Auto-track: verificar tanto `/vehiculos/` como `detalle-vehiculo` en el pathname
- ID source: preferir `window.PRERENDERED_VEHICLE_ID`, fallback a `?id=` query param
- Tambien corregido `showToast` → `toast.show()` en index.html y perfil.html

**Fix adicional** (2026-04-18) — Race condition con PRERENDERED_VEHICLE_ID:
- Aunque el path check y ID source fueron corregidos, el tracking SEGUIA sin funcionar
- **Causa raiz**: En las paginas generadas, `historial-visitas.js` se carga ANTES del `<script>` que define `window.PRERENDERED_VEHICLE_ID`. El auto-tracking al final del archivo corria sincronicamente → `PRERENDERED_VEHICLE_ID` era `undefined` → `addToHistory()` nunca se llamaba
- **Fix 1**: `setTimeout(function () { vehicleHistory.trackCurrentVehicle(); }, 0)` — difiere al siguiente tick, despues de que todos los scripts sincronos completen
- **Fix 2**: `beforeunload` handler flushea el debounced `_saveToLocalStorage()` si hay un sync pendiente (previene perdida si el usuario navega rapido)
- **Fix 3**: `generate-vehicles.mjs` ahora inyecta `PRERENDERED_VEHICLE_ID` ANTES de `historial-visitas.js` (para futuras generaciones)

**Archivos modificados**: `historial-visitas.js`, `scripts/generate-vehicles.mjs`

### Acumulacion de cuentas anonimas huerfanas en Firebase Auth

**Sintoma**: Cientos de cuentas `(anonimo)` en Firebase Console → Authentication → Usuarios.

**Causa**: `onAuthStateChanged(null)` llamaba `signInAnonymously()` en TODOS los casos — incluyendo despues de logout explicito. Cada logout de un usuario registrado creaba un anonimo nuevo. Firebase `Persistence.LOCAL` preserva la sesion entre page loads, pero NO entre logouts.

**Fix aplicado** (2026-04-17):
- `_explicitLogout = true` en `handleLogout()` antes de `signOut()`
- `onAuthStateChanged(null)` verifica `_explicitLogout`: si true, NO crea anonimo
- Anonimo solo se crea en primer page load sin sesion previa (comportamiento correcto)
- Favoritos ahora requieren login (abren modal + toast en vez de Firestore anónimo)
- Historial usa localStorage para todos, Firestore solo para registrados

**Archivos modificados**: `auth.js`, `favorites-manager.js`, `historial-visitas.js`

**Limpieza manual**: Firebase Console → Authentication → 3 puntos → eliminar cuentas anonimas

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
dinamicamente en todas las paginas desde `snippets/modals.html`.

### Storage Estimator eliminado (2026-04-10)

**Seccion eliminada**: "Consumo Storage (Free Tier)" en el dashboard admin.

**Razon**: Usaba calculos hardcodeados/aproximados (`FREE_TIER.storageMB`, `FREE_TIER.firestoreDocsFree`) que no median datos reales de Firebase. No existe API client-side para medir consumo real de Storage/Firestore en el tier gratuito.

**Archivos modificados**:
- `admin.html`: Eliminada seccion HTML (lineas 366-378)
- `admin-state.js`: Eliminadas constantes `FREE_TIER`
- `admin-sync.js`: Eliminada funcion `updateEstimator()` (~53 lineas), su event listener y llamada init

### Bloqueo de puntero al usar "Ver todas" en menu de marcas

**Fix aplicado**: `pointer-events: none` en `.modal-overlay` inactivo +
cierre de dropdowns/menu al hacer smooth scroll.

### Pagina de favoritos con flicker al cargar + contador desincronizado + toasts apilados (2026-04-29)

**Sintomas**:
1. Pagina de favoritos cargaba vacia y luego aparecian los autos con delay (1-3s)
2. Header mostraba "1" favorito pero la pagina mostraba "0"
3. Click rapido en corazones (logueado) apilaba multiples toasts
4. La campana de notificaciones no capturaba toasts de tipo `info` (favoritos quitados, etc.)

**Causa raiz**:
1. Favoritos vivian SOLO en Firestore — la cadena auth → Firestore read → vehicleDB → render tomaba 1-3s
2. Escritura a Firestore esta debounced 800ms; navegar antes del flush dejaba datos viejos en Firestore al hacer fresh read
3. `render.js` creaba nuevo toast por cada click sin descartar el anterior
4. `toast.js` `wrapNotify()` solo wrappeaba `['success', 'error', 'warning']` — excluia `info`

**Fix aplicado** (2026-04-29):

1. **localStorage-first cache + eager hydration** (`js/favorites-manager.js`):
   - `_cachePrefix = 'altorra_fav_cache_'` + `_lastUidKey = 'altorra_fav_last_uid'`
   - Constructor lee `last_uid` y `cache_<uid>` de localStorage SINCRONICAMENTE en module load
   - Si encuentra cache, despacha evento `cached` en DOMContentLoaded — la UI renderiza ANTES de que Firebase Auth resuelva (~50-300ms ahorrados)
   - `setUser(uid)`: PASO 1 = hidratacion desde localStorage (instantaneo) + dispatch `cached` event. PASO 2 = fetch de Firestore + dispatch `synced` event con flag `changed: bool`
   - `_debouncedSync()` escribe a localStorage INMEDIATAMENTE (sin debounce) y a Firestore con debounce 800ms
   - `clearUser({ purgeCache: bool })`: siempre limpia `last_uid`; solo borra `cache_<uid>` en logout explicito (preserva data para re-login instantaneo)

2. **Diff-based rendering** (`favoritos.html`):
   - `FavPage.tryRender()` solo se ejecuta cuando `_loaded` es true
   - Primera renderizacion: full render con fade-in
   - Renderizacion subsiguiente (cuando llega `synced` con `changed: true`): solo agrega/quita cards modificados — no flash, no jarring re-render
   - Skeleton mejorado: 3 cards shimmer en grid (no spinner solitario)
   - Safety timeout 5s para evitar skeleton infinito

3. **Cross-tab sync** (`favorites-manager.js`):
   - `window.addEventListener('storage', ...)` detecta cambios en otras tabs
   - Si la tab paralela cambia favoritos, esta tab se actualiza automaticamente

4. **Flush en beforeunload**:
   - Si hay sync pendiente al navegar, se flushea inmediatamente (previene contador desincronizado)

5. **Anti-stacking en toasts de favoritos** (`render.js`, `favoritos.html`):
   - `window._lastFavToastId` rastrea el ultimo toast de favoritos
   - Antes de mostrar uno nuevo, se descarta el anterior con `notify.dismiss(id, true)`

6. **Notification Center captura TODO** (`toast.js`):
   - `wrapNotify()` ahora wrappea `['success', 'error', 'warning', 'info']`
   - Tambien wrappea `notify.show()` (llamadas programaticas)
   - Tambien wrappea `window.toast.*` legacy shims
   - Wrap es SINCRONICO (no setInterval polling): se ejecuta inmediatamente despues del IIFE que define window.notify, en el mismo archivo
   - Filtra entries vacias (sin titulo ni mensaje)
   - Soporta opt-out per-call con `{ logHistory: false }`

**Archivos modificados**: `js/favorites-manager.js`, `js/toast.js`, `js/render.js`, `js/auth.js`, `favoritos.html`

**Resultado**: La pagina de favoritos renderiza en <50ms (eager hydration desde localStorage). Firestore sync corre en background y solo re-renderiza si los datos cambiaron. El contador siempre coincide con la pagina porque localStorage es la fuente de verdad inmediata. Toda notificacion del sitio (incluyendo `info`) llega al centro de notificaciones (campana).

### Triple notificación al dar al corazón sin sesión + click repetido apilaba notificaciones

**Sintomas**:
1. Click en `♡` sin sesión: aparecían 3 cosas a la vez — modal de login, toast "inicia sesión", toast "auto eliminado has eliminado el auto de tus favoritos tienes 0 autos"
2. Click repetido apilaba múltiples toasts dorados de "¡Inicia sesión!" sin descartar los anteriores
3. Si el header estaba oculto por scroll, el spotlight sobre INGRESAR apuntaba a un botón fuera del viewport

**Causas**:
1. `favorites-manager.js` retornaba `false` (no `null`) cuando no había `_uid`, así que `render.js` no podía distinguir "removido del favorito" vs "no autenticado" → ejecutaba el toast de eliminación. Además `_promptLogin()` abría modal `AltorraAuth.open('login')` adicionalmente al toast
2. `_promptLogin()` no detectaba notificación existente — siempre creaba una nueva
3. `components.js` añade clase `header--hidden` en scroll down, pero `_showSpotlight()` no lo verificaba

**Fix aplicado** (2026-04-28):
1. `favorites-manager.js`: `add()` y `toggle()` retornan `null` (no `false`) cuando `!this._uid`. `render.js` añade guard `if (wasAdded === null) return;` antes de cualquier toast/counter update
2. `_promptLogin()`: ya no abre modal — muestra toast con `variant: 'attention'` + botón de acción "Iniciar sesión"
3. `_promptLogin()`: detecta `.altorra-notify--attention` existente → vibra (clase `--buzz` con keyframes ±1.5° + translate lateral 0.55s) + replay sonido + reset auto-close timer (nueva API `notify.resetTimer(idOrEl, ms)` en `toast.js`)
4. `_showSpotlight()`: early-return si `.altorra-spotlight` ya existe (evita duplicar overlay/tooltip)
5. `_forceShowHeader()`: remueve `header--hidden` antes del spotlight + scroll suave 80px en mobile (`innerWidth ≤ 768`)

**Archivos modificados**: `favorites-manager.js`, `render.js`, `toast.js`, `css/toast-notifications.css`

---

## 9. Fases Completadas (Historico)

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

### Mejoras aplicadas 2026-04-08 — 2026-04-17

| Cambio | Archivos | Descripcion |
|--------|----------|-------------|
| Fix presencia RTDB | admin-auth.js, database.rules.json | `_presenceActive` flag, stopPresence antes de signOut en 8 paths, orphan cleanup safe |
| Fix Access Denied invisible | admin-auth.js | `_accessDeniedShown` flag, retry con backoff en loadUserProfile |
| Eliminar Storage Estimator | admin.html, admin-state.js, admin-sync.js | Seccion "Consumo Storage" usaba datos falsos, eliminada |
| Integrar Lucide Icons | admin.html, admin-state.js, css/admin.css | 59+ SVGs inline → `<i data-lucide>`, CDN v0.468.0, `AP.refreshIcons()` |
| Rediseño botones vehiculos | admin-vehicles.js, css/admin.css | Emojis → Lucide icons, grupos visuales, tooltips CSS, responsive 3 breakpoints |
| Lucide en todo el admin | 13 archivos | Emojis en actividad, brands, users, reviews, banners, dealers, sort indicators, theme toggle, devices, sesiones → todo Lucide |
| Seguridad 2FA reforzada | admin-auth.js | Rate limiting 5 intentos/codigo, cooldown 30s reenvio, max 5 reenvios/sesion, auto-unblock 15 min, error diagnostico SMS, proteccion super_admin |
| Fix reCAPTCHA SMS delivery | admin-auth.js, firebase-config.js | `.render()` explicito para fallback Enterprise→v2, limpieza contenedor DOM, `useDeviceLanguage()` para SMS en espanol, `expired-callback` |
| **Fix login WebChannel race (REST bypass)** | admin-auth.js | `loadProfileViaREST()` lee `usuarios/{uid}` via `fetch()` a Firestore REST API con `Authorization: Bearer <idToken>`. Elimina el race del WebChannel del SDK Compat. Decoder de campos tipados (`decodeFirestoreFields/Value`) con Timestamp duck-typed. Login instantaneo y 100% estable |
| **Fix logout 400 en Listen channel (admin)** | admin-auth.js | `AP.stopRealtimeSync()` llamado ANTES de `signOut()` en `logoutBtn`, `mobileLogoutBtn`, `handleInactivityTimeout`. Previene que el WebChannel intente refrescar Listen streams con token nulo |
| **Fix logout 400 en Listen channel (web publica)** | auth.js | `vehicleDB.stopRealtime()` llamado ANTES de `signOut()` en `handleLogout()`. `onAuthStateChanged` re-llama `startRealtime()` despues del anonymous sign-in si `vehicleDB.loaded && !_realtimeActive`. Elimina los 400 (POST y GET) en `/Listen/channel` al cerrar sesion en index.html |
| **Fix permission-denied race en web publica** | favorites-manager.js, auth.js | Retry con backoff (500ms, 1000ms) en `_loadFromFirestore` y `saveClientProfile` cuando el SDK envia reads con token anonimo stale tras `signInWithEmailAndPassword`. Misma causa raiz que el fix REST del admin |
| **Fix SW networkOnly error noise** | service-worker.js | `console.error` → `console.warn` en `networkOnly()`. El fetch falla en primer page load (cache-manager `fetchDeployVersion`), pero el caller maneja el 503 sin problemas. Evita error rojo en consola |
| **Fix cross-tab signOut errors en admin** | admin-appointments.js, admin-dealers.js, admin-activity.js | Guard `!auth.currentUser` en error callbacks de `onSnapshot` para solicitudes, concesionarios y auditLog. Cuando el usuario cierra sesion desde la web publica, Firebase Auth LOCAL persistence anula el token en todas las tabs — los listeners del admin reciben permission-denied antes de que `stopRealtimeSync()` pueda correr. El guard silencia estos errores esperados |
| **Fix 404 admin para usuarios publicos** | admin-auth.js | `loadProfileViaREST()` retorna `{ exists: false }` para 404 con `console.info` explicativo. `silentSignOutNonAdmin()` para persistence, `showAccessDenied()` con mensaje claro para login explicito |
| **Google Sign-In: popup + proteccion** | auth.js | `signInWithPopup` (una sola llamada directa en click handler). `signInWithRedirect` no funciona en GitHub Pages por cross-origin. Proteccion: verifica `usuarios/{uid}` (admin) y `providerData` (email/password existente). Deshace auto-vinculacion con `user.unlink('google.com')`. Popup bloqueada: toast 8s con instrucciones |
| **Friendly error Google provider disabled** | auth.js | `auth/operation-not-allowed` en `friendlyError()` → mensaje en español. Requiere habilitar Google en Firebase Console → Authentication → Sign-in method |
| **Eliminar cuentas anonimas huerfanas** | auth.js | `_explicitLogout` flag: no crea anonimo nuevo al cerrar sesion. Solo `signInAnonymously()` en primer page load sin sesion previa |
| **Favoritos solo para registrados** | favorites-manager.js, auth.js | `add()`/`toggle()` verifican `_uid`, abren modal login si no hay. `onAuthStateChanged` solo llama `setUser()` para no-anonimos |
| **Historial localStorage-first** | historial-visitas.js, auth.js | Constructor carga localStorage inmediatamente. Firestore sync solo para registrados. Merge inteligente al loguear. `setUser(uid, isAnonymous)` con flag |
| **Seccion "Vistos Recientemente"** | index.html, css/historial-visitas.css | Carrusel horizontal en homepage. localStorage-based (sin auth). Cards con imagen, precio, badge oferta. Dark theme, responsive 3 breakpoints. Fade-in, boton limpiar |
| **Login protege admins** | auth.js | `handleLogin()` verifica `usuarios/{uid}` antes de `saveClientProfile()`. Si es admin, no crea doc en `clientes/` |
| **Fix toast API (`showToast` → `toast`)** | auth.js, favorites-manager.js, components.js | `showToast()` no existia — `toast.js` exporta `toast` (instancia de ToastManager) con `.success()`, `.error()`, `.info()`, `.show()`. Todos los mensajes (login, registro, Google redirect, favoritos, logout) ahora son visibles. Warnings de seguridad usan duracion 6s. Admin Google sign-in cierra sesion tras desvinculacion |
| **Fix historial nunca registraba visitas** | historial-visitas.js, index.html, perfil.html | Path check buscaba `'detalle-vehiculo'` pero paginas viven en `/vehiculos/`. ID se leia de `?id=` pero paginas usan `PRERENDERED_VEHICLE_ID`. Corregido ambos + `showToast` restantes |
| **Fase B1: Layout base perfil** | perfil.html, js/perfil.js, css/perfil.css | CSS y JS externalizados. Sidebar 6 secciones, mobile tabs, skeleton loading, hero card, dark theme, 3 breakpoints |
| **Fase B2: Perfil mejorado** | js/perfil.js, css/perfil.css, CLAUDE.md | Barra completitud (5 criterios), campo ciudad (25 ciudades Colombia), validacion inline, provider badges (Google SVG + Email), password strength meter 4 niveles, toggle visibilidad, input prefix +57, indicador auto-save, ultimo acceso, UID truncado |
| **Fase B3: Avatar upload** | js/perfil.js, css/perfil.css, js/auth.js, storage.rules, CLAUDE.md | Upload foto perfil con preview modal, canvas crop circular 200x200, compresion webp 0.82, Firebase Storage `avatars/{uid}.webp` (max 512KB, own uid), sync header desktop+mobile+sidebar, camera icon hover, onerror fallback a iniciales |
| **Fase B4: Favoritos in-profile** | js/perfil.js, css/perfil.css, CLAUDE.md | Cards horizontales con imagen, marca/modelo/año, km, transmision, precio (oferta con tachado), badges de estado (disponible/reservado/vendido), boton quitar con fade-out, paginacion 6 por pagina, empty state con CTA, touch support |
| **Fix perfil layout + favoritos** | perfil.html, css/perfil.css, js/perfil.js | Footer removido para full-space, database.js agregado (vehicleDB faltaba), ensureVehicleDB() con retry, layout calc(100vh - 80px), skeleton loading durante carga |
| **Fase B5: Historial mejorado** | js/perfil.js, css/perfil.css, CLAUDE.md | Timeline agrupado (Hoy/Esta semana/Este mes/Anteriores), timestamps relativos (timeAgo), quitar individual con fade-out, limpiar todo con toast, skeleton async, reutiliza vehicleDB |
| **Fix vistos recientemente race condition** | historial-visitas.js, scripts/generate-vehicles.mjs | Auto-tracking fired synchronously on script load, but `PRERENDERED_VEHICLE_ID` was set in a `<script>` tag AFTER `historial-visitas.js`. Fix: `setTimeout(0)` defers tracking until all sync scripts complete + `beforeunload` flushes debounced localStorage save. Generator updated to inject ID before historial script for future builds |
| **Fase B6: Mis Solicitudes** | js/perfil.js, css/perfil.css, CLAUDE.md | Query Firestore `solicitudes` by email, cards con tipo (car/landmark/message-circle), status badges 4 estados, stepper horizontal 3 pasos, accordion expandible con datos especificos por tipo, skeleton loading, nav badge, stat clickable, responsive 3 breakpoints |
| **Fase B7: Mis Citas** | js/perfil.js, css/perfil.css, CLAUDE.md | Citas se guardan en `solicitudes` con `requiereCita:true`. Filtradas fuera de B6 y en nueva seccion. Grupos Proximas/Pasadas, date block dorado (dia+mes), status 4 estados (Pendiente/Confirmada/Completada/Cancelada), accordion con detalles, boton "Pedir cancelacion" que abre WhatsApp (users no pueden updatar por rules), nav badge |
| **Fase B8: Seguridad mejorada** | js/perfil.js, css/perfil.css, CLAUDE.md | Dispositivo actual (browser+OS via UA), zona peligrosa con eliminacion de cuenta (doble confirmacion: escribir email), borra `clientes/{uid}` + Auth user, maneja `requires-recent-login` |
| **Fase B9: Preferencias** | js/perfil.js, css/perfil.css, CLAUDE.md | Toggle WhatsApp notifications, email frequency (nunca/semanal/diario), dark theme toggle (disabled, site is dark-only), auto-save to `clientes/{uid}.preferencias`, toggle switch CSS, nueva seccion en sidebar |
| **Fase B10: Busquedas Guardadas** | js/perfil.js, css/perfil.css, css/dark-theme.css, busqueda.html, firestore.rules, CLAUDE.md | Boton "Guardar busqueda" en catalogo, subcollection `clientes/{uid}/busquedasGuardadas`, cards con filtros resumidos + link reconstruido, toggle alertas, eliminar con fade-out, nav badge, auth gate, Firestore rules para subcollection, responsive |
| **Fase C1: Email notificaciones (documentacion)** | CLAUDE.md | `onNewSolicitud` y `onSolicitudStatusChanged` ya existian en functions/index.js pero no estaban documentados. Tambien documentados `onVehicleChange` y `triggerSeoRegeneration` |
| **Fase C2: Alertas de precio** | functions/index.js, CLAUDE.md | `onVehiclePriceAlert`: trigger `onUpdate` en vehiculos, detecta baja de precio, busca `busquedasGuardadas` con `alertas:true`, filtra por marca/tipo/categoria/precio/year/km, envia email con precio viejo tachado + nuevo + ahorro %. Rate limit 1 email/cliente/vehiculo/dia |
| **Fase D1: Filtros avanzados en admin** | admin.html, admin-appointments.js, admin-dealers.js | Buscador de aliados por nombre/ciudad/responsable con debounce + contador de resultados. Buscador de solicitudes por nombre/email/vehiculo/telefono con debounce. Filtro de rango de fechas (Desde/Hasta) para solicitudes con boton limpiar. Todos los filtros se combinan con los existentes (estado, tipo, origen) y resetean paginacion |
| **Fase D2: Preview de vehiculo antes de publicar** | admin.html, admin-vehicles.js | Boton "Vista Previa" en modal de edicion/creacion de vehiculos. Muestra preview estilo sitio publico con: galeria de imagenes (principal + thumbnails), badges (tipo/oferta/estado), titulo, precio (con tachado si oferta), quick specs (4 columnas), ficha tecnica agrupada, caracteristicas como tags, descripcion. Funciona con datos del formulario sin necesidad de guardar primero. Se abre sobre el modal de edicion (z-index 1001) |
| **Fase D3: Paginacion mejorada para tablas grandes** | admin-table-utils.js, css/admin.css | Selector de filas por pagina (15/30/50/100) en todas las tablas paginadas. Saltar a pagina especifica (input numerico, visible con 5+ paginas). Ambos mantienen contexto (al cambiar tamaño, ajusta pagina para mostrar los mismos items). CSS responsive: oculta saltar-a-pagina en mobile. Reemplaza virtual scrolling que era innecesario con paginacion existente |
| **Fase D4: Rollback en historial de cambios** | admin-vehicles.js, css/admin.css | Boton "Revertir" en cada entrada de edicion del historial de vehiculos (solo super_admin). Al revertir, restaura los valores anteriores (`from`) de cada campo modificado, incrementa `_version`, registra la accion como `reverted` en auditLog. Confirmacion antes de ejecutar. Dot naranja en timeline para entradas revertidas |
| **Fix: alertas de precio no llegaban** | functions/index.js, busqueda.html | (1) Email URL ahora apunta al vehiculo especifico via slug `marca-modelo-year-id.html` en vez de `busqueda.html` generica. (2) Logging detallado en Firebase Functions: clientes revisados, con alertas activas, emails enviados, rate limits aplicados. Si secrets EMAIL_USER/EMAIL_PASS no estan configurados, log explicito en consola. (3) Al guardar busqueda en `busqueda.html`, `alertas:true` por defecto (antes era `false` y el usuario tenia que activarlas manualmente). (4) Toast actualizado: "Busqueda guardada con alertas de precio activadas". REQUIERE redeploy: `firebase deploy --only functions` |
| **Fase N1: Sistema de notificaciones unificado** | js/toast.js, css/toast-notifications.css | Reemplazo completo del sistema de toast. Glassmorphism con backdrop-filter blur, borde gradiente dorado animado, iconos Lucide inline. Cola apilada (max 4 visibles) con spring animation. Barra de progreso pausable en hover. Boton de accion opcional. Prioridades: critical (no auto-close), high (8s), normal (4s), low (2s). Shims compatibles: `window.toast.*` y `AP.toast()` delegando al nuevo modulo (0 migracion de los 232+ callsites). Mobile full-width con safe-area-inset. Soporte `prefers-reduced-motion` |
| **Fase N2: Sonidos Web Audio API** | js/toast.js | Sonidos generados en runtime (0 KB archivos externos). Success: acorde mayor 1046→1318Hz. Error: descenso 440→220Hz. Info: tono 1318Hz. Warning: doble pulso 587Hz. Volumen 18%, throttling 500ms. Toggle persistente en localStorage `altorra_notif_sound`. Desactivacion automatica con `prefers-reduced-motion` |
| **Fase N4: Preferencias de notificaciones en perfil** | js/perfil.js | Nueva subseccion "Notificaciones en pantalla" en Preferencias: toggle sonidos + toggle notificaciones del navegador (con flujo Notification.requestPermission). Card separada "Notificaciones por correo y WhatsApp" con toggle alertas email + WhatsApp + frecuencia. Auto-save a `clientes/{uid}.preferencias.notificaciones` |
| **Fase N3: Centro de notificaciones** | js/toast.js, css/toast-notifications.css, snippets/header.html, js/components.js, admin.html, js/admin-auth.js | Icono campana en header (publico + admin) con badge de no leidas pulsante. Panel deslizable con historial de las ultimas 50 notificaciones (success/error/warning). Items con icono, titulo, mensaje, tiempo relativo, badge no leida. Acciones: marcar todas como leidas, limpiar historial. Persistencia en localStorage. Auto-wrap de notify.success/error/warning para captura automatica. Click fuera cierra panel |
| **Fase N7: Demo page de notificaciones** | notifications-demo.html | Pagina interna de QA (`noindex, nofollow`) para probar todos los tipos, prioridades, acciones, cola/stacking, sonido toggle, y centro de notificaciones. No incluida en sitemap |
| **Rediseño compacto del toast (Sonner-inspired)** | css/toast-notifications.css, js/toast.js | Cambio de top-right a bottom-center. Container `flex-direction: column-reverse` para apilar hacia arriba. Removida barra de progreso (`display: none`). Acento lateral solido 3px por color de tipo. `cfg.variant` añadido al show() — aplica `.altorra-notify--<variant>` sanitizado como CSS class. `cfg.soundType` permite override del sonido por defecto |
| **Variante `attention` (login spotlight)** | css/toast-notifications.css, js/toast.js | Variante vibrante con gradiente dorado `#c9a663 → #b89658 → #9a7d44`, texto oscuro, sombra dorada con glow, animaciones encadenadas: enter 0.75s + shimmer 4s linear infinite + pulse 2s ease-in-out infinite. Padding 16px 18px 16px 20px, min-width 360px, max-width 460px. Botón de acción oscuro con texto dorado. Sonido especifico `attention` (B4 493.88Hz → E5 659.26Hz, sine, 60+80ms). Min-width responsive en mobile |
| **Fix favoritos sin login: triple notificación** | js/favorites-manager.js, js/render.js | Antes: click en corazón sin sesión abría modal + 2 toasts (info + "auto eliminado"). Ahora: `add()` y `toggle()` retornan `null` (no `false`) para señalizar "no autenticado". `_promptLogin()` no abre modal — muestra notificación atención + spotlight sobre INGRESAR. `render.js` con guard `if (wasAdded === null) return;` evita re-render del botón y toast de eliminación |
| **Spotlight sobre botón INGRESAR** | js/favorites-manager.js, css/toast-notifications.css | `_showSpotlight()` crea overlay semitransparente sobre toda la pagina + eleva z-index del `#btnLogin` con clase `hdr-btn--spotlight` (glow dorado + scale) + tooltip flotante "Inicia sesión aquí" con flecha posicionada relativa al botón. Auto-cleanup 4s o al click en overlay. Patrón similar a Stripe/Shopify para guiar atención del usuario |
| **`_forceShowHeader()` para spotlight visible** | js/favorites-manager.js | Si el header está oculto por scroll (`header--hidden` añadido por `components.js` en scroll down), removerlo antes del spotlight. En mobile (`innerWidth ≤ 768`), scroll suave de 80px hacia arriba para asegurar visibilidad. Sin esto, el spotlight apuntaba a un botón fuera del viewport |
| **Anti-stacking + buzz en notificación de login** | js/favorites-manager.js, js/toast.js, css/toast-notifications.css | Click repetido en corazón sin sesión ya no apila notificaciones. `_promptLogin()` detecta `.altorra-notify--attention` existente → vibra (clase `--buzz` con keyframes que sacuden ±1.5° + translate lateral 0.55s) + replay sonido + reset auto-close timer (nueva API `notify.resetTimer(idOrEl, ms)`). Spotlight tampoco se duplica (early-return si ya hay `.altorra-spotlight`) |
| **Bell de notificaciones al final del header** | snippets/header.html | `#headerNotifBell` movido del inicio (antes de Favoritos) al final (después de Registrarse), respetando el orden lógico de prioridad visual: Favoritos → Auth → Bell |
| **Rediseño "Vistos Recientemente" cinematográfico** | css/historial-visitas.css, index.html | Cards verticales (imagen+texto en cajas blancas) → filmstrip dark con imagen full-bleed (260×170px) y texto sobre gradiente oscuro `rgba(0,0,0,0.88) → transparent`. Fondo `#0a0a0a` integra con tema dark del sitio. Línea dorada sutil arriba (`linear-gradient transparent → #b89658 0.25 → transparent`). Hover: scale 1.04 + border dorado glow + zoom imagen 1.1. Badge "Oferta" reposicionado top-right. Año/km y precio en flexbox `rv-card-meta`. Arrows oscuras con backdrop-filter blur, color dorado. Responsive: 220px tablet, 200px mobile |

---

## 10. Autenticacion de Usuarios Publicos (Fase A)

### Arquitectura

Los usuarios publicos (clientes) y los administradores usan Firebase Auth, pero se almacenan en **colecciones Firestore separadas**:

| Tipo | Coleccion | Acceso al admin panel | Quien los crea |
|------|-----------|----------------------|----------------|
| Admin | `usuarios/{uid}` | Si (segun rol) | Solo super_admin (Cloud Functions) |
| Cliente | `clientes/{uid}` | **NUNCA** — `loadUserProfile()` rechaza sin doc en `usuarios` | Auto-registro publico |

### Archivos del sistema de auth publico

| Archivo | Proposito |
|---------|-----------|
| `snippets/auth-modal.html` | Modal con tabs Ingresar/Registrarse/Reset, Lucide icons, Google sign-in |
| `css/auth.css` | Estilos del modal: formularios, password strength, Google btn, responsive |
| `css/auth-header.css` | Estado logueado en header: avatar dropdown desktop + mobile |
| `js/auth.js` | Logica completa: login, registro, Google, reset, onAuthStateChanged, saveClientProfile |

### Flujo de registro

1. Usuario hace clic en "Registrarse" en el header → abre modal
2. Completa nombre, email, password (+ telefono opcional, terminos)
3. `createUserWithEmailAndPassword()` crea el user en Firebase Auth
4. `updateProfile({ displayName })` guarda el nombre en Auth
5. `saveClientProfile(uid, data)` crea doc en `clientes/{uid}` en Firestore
6. Modal se cierra, header muestra avatar con iniciales + dropdown

### Flujo de login con Google

1. `signInWithPopup(GoogleAuthProvider)` abre ventana de Google (una sola, directa en click handler)
2. Resultado procesado en `_processGoogleUser(user)` inmediatamente (sin recargar pagina)
3. **Check 1**: Si `usuarios/{uid}` existe → es admin → `undoGoogleAndWarn()` + toast de error + signOut
4. **Check 2**: Si `user.providerData` tiene AMBOS `password` y `google.com` → email ya registrado con contrasena → `user.unlink('google.com')` deshace auto-vinculacion + toast de warning
5. **Check 3**: Si `auth/account-exists-with-different-credential` → toast error 6s
6. **Popup bloqueada**: `auth/popup-blocked` → toast de 8s con instrucciones claras
7. Solo si es usuario Google nuevo → `saveClientProfile()` crea doc en `clientes/{uid}` + toast exito

**Por que popup en vez de redirect**: `signInWithRedirect` no funciona en GitHub Pages porque el `authDomain` (`altorra-cars.firebaseapp.com`) difiere del dominio de hosting (`altorracars.github.io`). El resultado del redirect se almacena en sessionStorage del authDomain y `getRedirectResult()` no puede leerlo cross-origin. `signInWithPopup` usa `postMessage` que no tiene esta restriccion. La llamada se hace directamente en el click handler (sin `.then()`) para que el navegador no bloquee la popup.

**Proteccion contra sobreescritura de cuentas**: Firebase con "One account per email" auto-vincula Google al existir email/password con el mismo correo verificado. El sistema detecta la auto-vinculacion (`hasPassword && hasGoogle` en `providerData`) y la deshace con `unlink('google.com')`. Patron usado por Airbnb y MercadoLibre.

### Coleccion `clientes/{uid}`

| Campo | Tipo | Notas |
|-------|------|-------|
| uid | string | Firebase Auth UID |
| nombre | string | Nombre completo |
| email | string | Correo electronico |
| prefijo | string | Default "+57" |
| telefono | string | Opcional |
| favoritos | array | IDs de vehiculos (solo usuarios registrados) |
| vehiculosVistos | array | Historial sincronizado desde localStorage (solo registrados) |
| ciudad | string | Ubicacion del usuario (25 ciudades Colombia, select) |
| avatarURL | string | URL de foto de perfil en Firebase Storage (`avatars/{uid}.webp`) |
| preferencias | object | `{ whatsapp: bool, emailFreq: string }` — notificaciones y preferencias |
| creadoEn | string (ISO) | Fecha de creacion |
| ultimoAcceso | string (ISO) | Ultimo login |

**Subcollection**: `clientes/{uid}/busquedasGuardadas/{searchId}` — nombre, filtros (object), alertas (bool), creadoEn (timestamp)

### Firestore Rules para clientes

```
match /clientes/{uid} {
  allow read:   if auth.uid == uid;
  allow create: if auth.uid == uid && data has nombre, email, creadoEn, uid;
  allow update: if auth.uid == uid;
  allow delete: if false;
}
```

### Carga dinamica (components.js)

`loadAuthSystem()` en `components.js` carga en todas las paginas publicas (NO en admin.html):
1. Lucide Icons CDN v0.468.0 (mismo que admin)
2. `css/auth.css` + `css/auth-header.css`
3. `snippets/auth-modal.html` (inyectado en body)
4. `js/auth.js` (despues del HTML del modal)

### API publica

```javascript
window.AltorraAuth.open('login')   // Abrir modal en tab login
window.AltorraAuth.open('register') // Abrir modal en tab registro
window.AltorraAuth.close()          // Cerrar modal
window.AltorraAuth.logout()         // Cerrar sesion
window.AltorraAuth.current()        // Usuario actual o null
```

### Politica de Autenticacion Anonima (Best Practice Firebase 2025)

**Referencia**: [Firebase Blog — Best Practices for Anonymous Authentication](https://firebase.blog/posts/2023/07/best-practices-for-anonymous-authentication/)

**Antes**: Cada page load creaba un usuario anonimo via `signInAnonymously()`. Cada logout de un usuario registrado creaba un anonimo nuevo (huerfano). Las cuentas anonimas se acumulaban indefinidamente en Firebase Auth.

**Ahora**: Patron profesional (como Amazon, MercadoLibre, Kavak):

| Accion | Comportamiento |
|--------|---------------|
| Primer page load (sin sesion previa) | Crea usuario anonimo |
| Refresh de pagina | Reutiliza sesion existente (persistence LOCAL) |
| Logout explicito (`_explicitLogout = true`) | NO crea anonimo nuevo. Limpia UI y mantiene localStorage |
| Siguiente page load despues de logout | Crea anonimo nuevo (sesion limpia) |
| Favoritos sin auth | Abre modal de login + toast "Inicia sesion para guardar tus favoritos" |

**Archivos modificados**: `auth.js` (`_explicitLogout` flag, `onAuthStateChanged`), `favorites-manager.js` (`_promptLogin()`)

**Limpieza de anonimos existentes**: Firebase Console → Authentication → 3 puntos → Eliminar cuentas anonimas. La auto-limpieza de 30 dias requiere Identity Platform (upgrade opcional).

### Favoritos — Solo para Usuarios Registrados

**Patron**: Firestore para registrados, prompt de login para visitantes.

- `favorites-manager.js`: `add()` y `toggle()` verifican `_uid`. Si no hay uid, llaman `_promptLogin()` que abre `AltorraAuth.open('login')` + toast
- `auth.js`: `onAuthStateChanged()` solo llama `favoritesManager.setUser(uid)` para usuarios NO anonimos. Usuarios anonimos reciben `clearUser()`
- No se escriben documentos `clientes/{uid}` para usuarios anonimos

### Historial de Visitas — localStorage-first

**Patron profesional** (como Amazon, MercadoLibre, Kavak): localStorage para todos, Firestore sync solo para registrados.

| Capa | Disponibilidad | Persistencia |
|------|---------------|-------------|
| localStorage (`altorra_vehicle_history`) | Todos los visitantes | Entre sesiones (mismo navegador) |
| Firestore (`clientes/{uid}.vehiculosVistos`) | Solo registrados | Multi-dispositivo |

**Flujo**:
1. Constructor carga desde localStorage inmediatamente (sin esperar auth)
2. `setUser(uid, isAnonymous)`: si registrado → `_loadFromFirestore()` + merge con localStorage
3. Merge: combina ambas fuentes, deduplica por ID, ordena por timestamp mas reciente
4. Resultado se persiste en ambos stores (localStorage + Firestore si registrado)
5. `clearUser()` NO borra localStorage — el historial persiste entre sesiones como en Amazon

**Seccion "Vistos Recientemente" en Homepage** (`index.html`) — diseño cinematografico filmstrip:
- Fondo `#0a0a0a` integrado con tema dark del sitio (antes era cream `#f8f6f3` y desencajaba)
- Linea dorada sutil arriba (separador `linear-gradient transparent → rgba(184,150,88,0.25) → transparent`)
- Cards con imagen full-bleed (260×170px) — sin caja blanca, sin texto debajo
- Texto sobre gradiente oscuro `rgba(0,0,0,0.88) → 0.5 → transparent` en la parte inferior
- Año/km a la izquierda + precio dorado a la derecha en flexbox `rv-card-meta`
- Badge "Oferta" reposicionado top-right (sobre la imagen)
- Hover: `scale(1.04)` + border dorado glow + zoom imagen `scale(1.1)` + z-index para evitar clipping
- Arrows oscuras con `backdrop-filter: blur(8px)` y color dorado, en lugar de blancas
- Carrusel horizontal con scroll suave y flechas de navegacion
- Se muestra solo si hay historial en localStorage (no requiere auth)
- Muestra hasta 8 vehiculos
- Ubicada entre "Vehiculos Disponibles" y el banner promocional
- Boton "Limpiar" con animacion fade-out + toast
- Responsive: 220px tablet, 200px mobile (arrows ocultas en touch)
- CSS en `css/historial-visitas.css` (seccion `.recently-viewed-section`)

### Proteccion de Cuentas Admin en Web Publica

**Problema resuelto**: Un usuario que se registra con Google desde la web publica usando el mismo email de un admin podia sobreescribir la cuenta admin.

**Protecciones implementadas**:

| Flujo | Proteccion |
|-------|-----------|
| Google sign-in con email de admin | `handleGoogleRedirectResult()` verifica `usuarios/{uid}` → `undoGoogleAndWarn()` |
| Google sign-in con email ya registrado (password) | Detecta `password + google.com` en `providerData` → `user.unlink('google.com')` → warning |
| Login email/password de admin desde web publica | `handleLogin()` verifica `usuarios/{uid}` → NO crea doc en `clientes/` |
| `auth/account-exists-with-different-credential` | Toast amigable en español |

**Admin panel**: `loadProfileViaREST()` ya rechaza usuarios sin doc en `usuarios/{uid}`:
- Si llega por persistence (no login explicito): `silentSignOutNonAdmin()` (sin error visible)
- Si intenta loguear en formulario admin: `showAccessDenied()` con mensaje claro
- El 404 REST es esperado y logueado como `console.info`

### Recuperacion de Cuenta super_admin (Procedimiento Manual)

Si se pierde la unica cuenta super_admin (ej: eliminada por accidente desde Firebase Console):

1. **Firebase Console → Authentication → Agregar usuario**: crear con email y password
2. **Copiar el UID** generado por Firebase
3. **Firestore → coleccion `usuarios` → Agregar documento** con el UID copiado como ID
4. Campos requeridos:
   - `uid` (string): mismo UID
   - `email` (string): el correo
   - `nombre` (string): nombre del admin
   - `rol` (string): `super_admin`
   - `estado` (string): `activo`
   - `bloqueado` (boolean): `false`
   - `habilitado2FA` (boolean): `false`
   - `creadoEn` (timestamp): fecha actual
5. Probar login en `admin.html`

> **IMPORTANTE**: Las Cloud Functions (`createManagedUserV2`, etc.) requieren un super_admin existente para crear otros usuarios. Si se pierde el unico super_admin, solo se puede recuperar manualmente desde Firebase Console.

---

## 11. Fase B — Panel de Usuario Premium (Plan Aprobado)

> Inspirado en Amazon, MercadoLibre, Apple, Kavak, CarGurus, Adidas, CinCuadras.
> Organizado en micro-fases para evitar timeout y crasheos.

### Estado actual del perfil (`perfil.html`) — ACTUALIZADO

- CSS externalizado en `css/perfil.css` (Fase B1 completada)
- JS externalizado en `js/perfil.js` (Fase B1 completada)
- Sidebar navigation con 6 secciones + iconos Lucide
- Mobile: tabs horizontales scrollables (< 768px)
- Skeleton loading animado mientras carga Firestore
- Profile hero card con gradiente dorado y badges
- 3 breakpoints responsive (860px, 768px, 480px)
- Container max-width 1080px (cortes resueltos)
- Secciones placeholder para B2-B10

### Micro-Fase B1 — Arquitectura y Layout Base ✓ COMPLETADA

| Tarea | Estado |
|-------|--------|
| CSS externo `css/perfil.css` | ✓ 450+ lineas, variables CSS, dark theme |
| JS externo `js/perfil.js` | ✓ Modular, IIFE, funciones limpias |
| Sidebar navigation (desktop) | ✓ 6 secciones con Lucide icons, active state con barra dorada |
| Mobile: tabs horizontales | ✓ Scroll horizontal, pills con iconos |
| Skeleton loading | ✓ Pulse animation, hero + cards placeholders |
| Container max-width fix | ✓ 1080px con padding responsive |
| Dark theme refinado | ✓ Gradiente en hero, glassmorphism cards |

### Micro-Fase B2 — Perfil de Usuario Mejorado ✓ COMPLETADA

| Tarea | Estado |
|-------|--------|
| Profile hero card | ✓ Avatar con foto/initials, nombre, email, badges de proveedor |
| Barra de completitud | ✓ Progress bar dorada con %, tips de campos faltantes (5 criterios) |
| Edicion inline mejorada | ✓ Validacion en tiempo real, indicador Guardando/Guardado/Error |
| Campo ubicacion | ✓ Select con 25 ciudades Colombia, guardado en `clientes/{uid}.ciudad` |
| Badge de proveedor auth | ✓ Google (SVG real) + Email (Lucide) + cards de proveedor en Seguridad |
| Fecha formateada | ✓ "Miembro desde Enero 2026" en hero meta badges |
| Password strength meter | ✓ 4 niveles con colores + toggle visibilidad (eye/eye-off) |
| Input prefix telefono | ✓ "+57" visual prefix, validacion 7-10 digitos |
| Info de cuenta | ✓ Ultimo acceso, UID truncado, proveedores con status badges |

### Micro-Fase B3 — Foto de Perfil / Avatar ✓ COMPLETADA

| Tarea | Estado |
|-------|--------|
| Upload widget | ✓ Click en avatar → file input (jpeg/png/webp, max 5MB) |
| Compresion client-side | ✓ Canvas resize a 200x200, calidad 0.82, output webp |
| Firebase Storage | ✓ `avatars/{uid}.webp` con reglas (max 512KB, own uid only) |
| Crop circular | ✓ Canvas center-crop cuadrado + clip circular antes de upload |
| Preview modal | ✓ Overlay con canvas circular, borde dorado, confirmar/cancelar |
| Fallback iniciales | ✓ Si no hay foto → iniciales doradas (onerror fallback) |
| Sync con header | ✓ Desktop `.hdr-user-avatar` + mobile `.mob-user-avatar` actualizados |
| Sync con sidebar | ✓ Sidebar avatar muestra foto si disponible |
| Campo en Firestore | ✓ `clientes/{uid}.avatarURL` + `user.updateProfile({ photoURL })` |
| Camera icon overlay | ✓ Icono camara dorado aparece en hover sobre avatar |

### Micro-Fase B4 — Mis Favoritos (in-profile) ✓ COMPLETADA

| Tarea | Estado |
|-------|--------|
| Cards compactas | ✓ Imagen + marca + modelo + año + km + transmision + precio |
| Badge de estado | ✓ Disponible (verde), Reservado (amarillo), Vendido (rojo) |
| Heart toggle | ✓ Boton quitar con fade-out animado + re-render |
| Paginacion | ✓ 6 por pagina, boton "Ver mas (N restantes)" |
| Empty state | ✓ Icono + "Guarda vehiculos..." + CTA "Explorar catalogo" |
| Link a detalle | ✓ Click en imagen/titulo → `/vehiculos/{slug}.html` |
| Badge oferta | ✓ "Oferta" dorado en esquina si `precioOferta` existe |
| Precio tachado | ✓ Precio original tachado + precio oferta resaltado |
| Touch support | ✓ Boton quitar siempre visible en touch (`hover: none`) |

### Micro-Fase B5 — Historial de Visitas Mejorado ✓ COMPLETADA

| Tarea | Estado |
|-------|--------|
| Timeline con fechas | ✓ Agrupado por "Hoy", "Esta semana", "Este mes", "Anteriores" |
| Cards con timestamp | ✓ "Hace 2 horas", "Hace 3 dias", fecha formateada si > 7 dias |
| Limpiar individual | ✓ Boton X por item con fade-out animado |
| Limpiar todo | ✓ Boton "Limpiar todo" con toast confirmacion |
| Async vehicleDB | ✓ Skeleton loading mientras carga, re-render automatico |
| Empty state | ✓ Icono + "Los vehiculos que visites apareceran aqui" + CTA |

### Micro-Fase B6 — Mis Solicitudes ✓ COMPLETADA

| Tarea | Estado |
|-------|--------|
| Lista de solicitudes | ✓ Firestore query `solicitudes` where `email == user.email`, client-side sort by `createdAt` desc |
| Tipos con iconos | ✓ Consignacion (car), Financiacion (landmark), Contacto (message-circle) con icono dorado |
| Status badges | ✓ Pendiente (amarillo), Contactado (azul), Completado (verde), Rechazado (rojo) |
| Timeline visual | ✓ Stepper horizontal 3 pasos (Recibida → Contactado → Completado), rejected muestra X |
| Detalle expandible | ✓ Accordion con chevron animado, datos del vehiculo, telefono, comentarios, respuesta admin |
| Datos especificos por tipo | ✓ Consignacion: marca/modelo/año/km/precio esperado. Financiacion: cuota/plazo/ingresos/situacion |
| Empty state | ✓ "No tienes solicitudes" + CTA "Solicitar financiacion" |
| Skeleton loading | ✓ Mientras carga de Firestore |
| Nav badge count | ✓ Sidebar muestra cantidad de solicitudes |
| Stat clickable | ✓ Click en stat "Solicitudes" del hero → navega a seccion |

### Micro-Fase B7 — Mis Citas ✓ COMPLETADA

| Tarea | Estado |
|-------|--------|
| Fuente de datos | ✓ Las citas se guardan en `solicitudes` con `requiereCita: true` y `tipo: 'consulta_vehiculo'`. Se filtran del mismo array `_solicitudes` ya cargado en B6 |
| Separacion Solicitudes/Citas | ✓ Seccion Solicitudes filtra `!isCita`, seccion Citas filtra `isCita` |
| Proximas citas | ✓ Grupo "Proximas" con citas futuras no rechazadas/completadas, ordenadas asc por fecha |
| Citas pasadas | ✓ Grupo "Pasadas" con rechazadas, completadas, o con fecha pasada, ordenadas desc |
| Date block visual | ✓ Cuadro dorado con dia grande + mes abreviado (ej: "18 ABR") tipo calendario |
| Status visual | ✓ Pendiente (clock-3), Confirmada (check-circle-2), Completada (check), Cancelada (x) con iconos |
| Accordion expandible | ✓ Muestra vehiculo, fecha completa, hora, telefono, comentarios, respuesta admin |
| Accion "Pedir cancelacion" | ✓ Solo visible para proximas citas. Abre WhatsApp con mensaje pre-formateado (users no pueden updatar por rules) |
| Empty state | ✓ "No tienes citas" + CTA "Ver catalogo" |
| Skeleton loading | ✓ Reutiliza el loader de solicitudes |
| Nav badge count | ✓ Sidebar muestra cantidad de citas |
| Responsive | ✓ Date block reducido en mobile (46px), breakpoints 480px/768px/860px |

### Micro-Fase B8 — Seguridad y Cuenta ✓ COMPLETADA

| Tarea | Estado |
|-------|--------|
| Cambio de contraseña | ✓ Ya implementado en B2: strength meter 4 niveles, toggle visibilidad, reauthentication |
| Proveedores vinculados | ✓ Ya implementado en B2: Google (SVG real) + Email (Lucide), badges Activo |
| Dispositivo actual | ✓ Deteccion de browser (Chrome/Firefox/Edge/Safari) + OS (Windows/macOS/Android/iOS/Linux) via User-Agent |
| Ultimo acceso | ✓ Ya implementado en B2: `ultimoAcceso` formateado con fecha y hora |
| Eliminar cuenta | ✓ Zona peligrosa con confirmacion doble: (1) boton inicial, (2) escribir email para confirmar. Borra `clientes/{uid}` + `user.delete()`. Maneja `auth/requires-recent-login` |
| UID truncado | ✓ Ya implementado en B2: primeros 12 chars con monospace |

### Micro-Fase B9 — Preferencias ✓ COMPLETADA

| Tarea | Estado |
|-------|--------|
| Notificaciones WhatsApp | ✓ Toggle on/off con guardado automatico en Firestore |
| Notificaciones email | ✓ Select: Nunca/Semanal/Diario con guardado automatico |
| Tema visual | ✓ Toggle dark mode (siempre on, disabled — el sitio es dark-only por ahora) |
| Campo en Firestore | ✓ `clientes/{uid}.preferencias` con `{ whatsapp: bool, emailFreq: string }` |
| Auto-save | ✓ Indicador Guardando/Guardado/Error con Lucide icons, se oculta despues de 2s |
| Seccion en sidebar | ✓ Nueva seccion "Preferencias" con icono settings entre Citas y Seguridad |

### Micro-Fase B10 — Busquedas Guardadas y Alertas de Precio ✓ COMPLETADA

| Tarea | Estado |
|-------|--------|
| Guardar busqueda | ✓ Boton "Guardar busqueda" en `busqueda.html`, guarda filtros activos en `clientes/{uid}/busquedasGuardadas` |
| Auth gate | ✓ Si no hay sesion o es anonimo, abre modal login + toast informativo |
| Lista en perfil | ✓ Cards con nombre, resumen de filtros, fecha, toggle alertas, boton eliminar |
| Link a busqueda | ✓ Click en nombre reconstruye URL con query params de filtros guardados |
| Toggle alertas | ✓ Switch on/off por busqueda, guarda en Firestore campo `alertas` |
| Eliminar busqueda | ✓ Fade-out animado + delete en Firestore subcollection |
| Nav badge | ✓ Sidebar muestra cantidad de busquedas guardadas |
| Empty state | ✓ Icono + "Sin busquedas guardadas" + CTA "Ir al catalogo" |
| Skeleton loading | ✓ Mientras carga subcollection de Firestore |
| Subcollection Firestore | ✓ `clientes/{uid}/busquedasGuardadas/{id}` con reglas read/write own uid |
| Responsive | ✓ Card stack en 480px, toggle y delete alineados |
| Cloud Function | ✓ `onVehiclePriceAlert` en `functions/index.js`: detecta baja de precio, busca busquedas guardadas con alertas activas, envia email al cliente. Rate limit 1/dia/vehiculo/cliente |

---

## 12. Fase 12 — Pendiente (Futuro)

| ID | Tarea | Complejidad |
|----|-------|-------------|
| F12.1 | Notificacion por email al recibir cita (Cloud Function trigger) | Completado |
| F12.2 | Preview en tiempo real del vehiculo como se vera en el sitio | Completado (Fase D2) |
| F12.3 | 2FA opcional via Firebase Auth (implementado, seguridad reforzada) | Completado |
| F12.4 | Historial de cambios con rollback visual (timeline + revert) | Completado (Fase D4) |
| F12.5 | Buscador/filtro en lista de aliados + filtro por rango de fechas | Completado (Fase D1) |
| F12.6 | Virtual scrolling para tablas grandes (+100 filas) | Completado (Fase D3 — paginacion mejorada) |
| F12.7 | Indicadores de sesiones activas por usuario | Completado (RTDB presence + heartbeat + stale detection) |

---

## 13. Sistema de Notificaciones (Plan N1-N7)

> Plan microquirurjico para reemplazar los 2 sistemas de toast actuales (publico + admin) con un sistema unificado de vanguardia.

### Estado actual (antes de N1)

**2 sistemas separados sin compartir codigo:**

| Sistema | Archivo | API | Llamadas |
|---------|---------|-----|----------|
| Publico | `js/toast.js` (135 lineas, clase singleton) | `toast.success()`, `toast.error()`, `toast.info()`, `toast.show(msg, type, title, duration)` | ~30 callsites |
| Admin | `js/admin-state.js:89-94` (5 lineas, funcion) | `AP.toast(msg, type)` — sin titulo ni iconos | 202+ callsites |

**Problemas conocidos:**
- Cada toast nuevo destruye el anterior (no hay cola — se pierden mensajes criticos)
- Admin: solo texto plano, sin iconos, sin titulos, posicion fija bottom-right que choca con UI
- Publico: posicion top-right `100px / 20px`, animacion slide-in 300ms
- Sin sonidos, sin notificaciones nativas del navegador, sin centro de notificaciones
- `clientes/{uid}.preferencias.notificaciones` no existe (Fase B9 las definio en perfil pero no se aplican aun)

**Tipos en uso:** success, error, info, warning (warning solo en admin)

### Plan por microfases

#### N1 — API Unificada y Diseno de Vanguardia (BASE) ✓ COMPLETADA

**Archivos nuevos:** `js/notifications.js` + `css/notifications.css`

**Diseno visual:**
- Glassmorphism con backdrop-filter blur + borde gradiente dorado animado
- Iconos Lucide (consistente con admin)
- Cola apilada hasta 4 visibles, push down con spring animation
- Barra de progreso pausable en hover
- Boton de accion opcional ("Ver", "Deshacer", "Reintentar")
- Animacion estilo iOS (escala + slide + blur-in)
- Dark/light theme via CSS variables
- Mobile: full-width con `safe-area-inset` (notch)

**API:**
```js
notify.success({ title, message, duration, action: { label, callback }, sound: true, priority: 'normal' })
notify.error(...) / notify.info(...) / notify.warning(...)
notify.dismiss(id)  // cerrar especifica
notify.clear()      // cerrar todas
```

**Compatibilidad:** `toast.js` y `AP.toast()` quedan como shims de 5 lineas que delegan al nuevo modulo. **Cero migracion manual** de los 232+ callsites.

**Prioridades:**
- `critical` — no auto-cierra, requiere click
- `high` — 8s
- `normal` — 4s (default)
- `low` — 2s

#### N2 — Sonidos sutiles via Web Audio API ✓ COMPLETADA

**Sin archivos externos** (peso 0 KB, generados en runtime):
- success: acorde mayor 880Hz → 1108Hz (300ms)
- error: descenso 440Hz → 220Hz (400ms)
- info: tono unico 660Hz (200ms)
- warning: doble pulso 587Hz (500ms)

Volumen 30% por defecto. Throttling: si llegan 3+ notificaciones en 500ms, solo suena 1.

**Toggle:** localStorage `altorra_notif_sound` (default `true`).

**Respeto:** `prefers-reduced-motion` desactiva sonidos automaticamente.

#### N3 — Centro de Notificaciones ✓ COMPLETADA

**Icono campana en header** (publico y admin) con badge de no leidas.

**Click → panel deslizable:**
- Lista de las ultimas 20 notificaciones
- Cada item: icono + titulo + mensaje + tiempo relativo + boton de accion
- "Marcar todas como leidas", "Limpiar todas"
- Storage: `localStorage` (todas) + sync con Firestore (registrados)

**Para clientes:**
- Alertas de precio
- Cambios de estado en solicitudes/citas
- Confirmaciones de busquedas guardadas

**Para admins:**
- Nuevas solicitudes pendientes
- Errores de sincronizacion
- Ventas registradas
- Sesiones activas de otros usuarios

#### N4 — Preferencias de usuario en perfil.html ✓ COMPLETADA

Nueva subseccion "Notificaciones" dentro de "Preferencias" (Fase B9):

| Toggle | Default | Storage |
|--------|---------|---------|
| Sonidos | ON | `localStorage` + `clientes/{uid}.preferencias.notificaciones.sonidos` |
| Notificaciones del navegador | OFF (requiere permiso) | Firestore + `Notification.permission` |
| Centro de notificaciones | ON | localStorage |
| Alertas de precio por email | ON | Firestore |
| Confirmaciones por WhatsApp | ON | Firestore |

#### N5 — Notificaciones nativas del navegador (Push opcional)

**Usar `Notification.requestPermission()`** + Service Worker existente.

- Boton "Activar notificaciones del navegador" en preferencias con explicacion clara
- Solo para criticas: bajadas de precio, citas confirmadas/canceladas
- Anti-spam: maximo 1 por hora del mismo tipo
- Funciona aunque la pestana este en background

#### N6 — Auditoria y mejora de los 232+ mensajes

- Anadir titulos descriptivos (admin sobretodo: "Vehiculo eliminado" → titulo "Eliminacion exitosa")
- Reemplazar genericos: "Error" → "No se pudo guardar el vehiculo"
- Agregar acciones: "Ver historial", "Deshacer", "Reintentar"
- Clasificar prioridades por tipo de operacion
- Agrupacion inteligente: 5 imagenes subidas → 1 notificacion "5 fotos subidas"

#### N7 — Telemetria y testing ✓ COMPLETADA

- Modo debug: `window.notify.debug = true` activa logs detallados
- Demo page interna `notifications-demo.html` (no en sitemap, solo para QA)
- Lista documentada de 30 escenarios para validar antes de cada deploy

### Orden de ejecucion recomendado

| # | Fase | Riesgo | Visible al usuario | Estado |
|---|------|--------|-------------------|--------|
| 1 | N1 | Bajo (shims hacia atras) | ⭐⭐⭐⭐⭐ Cambio visual masivo | ✓ Completada |
| 2 | N2 | Muy bajo | ⭐⭐⭐ Sonidos al notificar | ✓ Completada |
| 3 | N4 | Bajo | ⭐⭐⭐⭐ UI de preferencias | ✓ Completada |
| 4 | N3 | Medio | ⭐⭐⭐⭐⭐ Centro de notificaciones | ✓ Completada |
| 5 | N6 | Bajo (no funcional) | ⭐⭐ Mejor calidad de mensajes | Pendiente |
| 6 | N5 | Medio (permisos) | ⭐⭐⭐⭐ Push nativo | Pendiente |
| 7 | N7 | Cero | ⭐ Solo dev | ✓ Completada |

---

## 14. SEO

Ver `SITEMAP-FIX.md` para estado detallado del sitemap y Google Search Console.

### Implementado
- Meta tags completos en todas las paginas (description, keywords, OG, Twitter Cards)
- `<link rel="canonical">` en todas las paginas
- `<meta name="robots" content="index, follow">`
- Structured Data JSON-LD: AutoDealer + WebSite + FAQ + Car (en paginas de vehiculo)
- Sitemap auto-generado con prioridades diferenciadas y lastmod fijo
- robots.txt limpio (un solo User-agent block)
- Paginas de vehiculo pre-renderizadas con noscript SEO fallback
- google8d667a72b0e3536b.html (verificacion Search Console)
- `<link rel="sitemap">` en head de index.html
- Preconnect a fonts.googleapis.com, firestore.googleapis.com

### Pendiente
- Dominio personalizado (mejoraria crawl priority de Google)
- Re-enviar sitemap en Search Console (ver SITEMAP-FIX.md)

---

## 15. Performance Optimizations (P1-P10) — 2026-05-02

> Plan ejecutado para resolver bloqueos de scroll y mejorar TTI. Cada fase
> tiene su commit propio para facilitar rollback. La auditoría inicial
> identificó 6 cuellos de botella; las fases P1-P10 atacan los más rentables.

### Causa raíz original

El sitio se sentía lento incluso en hardware potente (PC gamer). El problema
NO era el peso de los assets sino el costo de **paint/layout en cada frame
de scroll**:

1. **83 usos de `backdrop-filter`** — cada uno fuerza recomposición GPU por frame
2. **2 scroll handlers en paralelo** (`components.js` + `performance.js`)
3. **22 `<link rel="stylesheet">` bloqueantes** en `<head>` de cada página
4. **Transiciones sobre `box-shadow`/`width`/`height`/`top`/`left`** (paint+layout)
5. **8 partículas animadas** en hero (capas GPU permanentes)
6. **Featured Week banner** con 5 capas de gradientes + box-shadow 90px

### P1 — Eliminate `backdrop-filter` on scroll-affected elements

**Archivo**: `css/performance-fixes.css`

Reemplazó `backdrop-filter: blur(Xpx)` por backgrounds sólidos de alta opacidad
en elementos que scrollean:
- `#header` (fixed top), `.cookie-banner` (fixed bottom)
- `.fav-controls-section` (sticky), `.fav-stat`
- `.vehicle-card` (×N en grids), `.dropdown-menu`
- `.hero-search-inner`, `.hero-badge`, `.fw-data-rail`, `.fw-nav`
- `.results-header`, `.dest-hud-meter`, `.dest-nav`

Modales (`.modal-overlay`, `.cookie-modal`, etc.) y toasts conservan el blur
porque solo se renderizan on-demand (no afectan scroll).

**Impacto esperado**: 60-80% reducción de paint cost en scroll.

### P2 — Unify scroll handlers

**Archivos**: `js/performance.js`, `js/components.js`

Eliminó el listener duplicado en `performance.js` (toggleaba clase `.scrolled`
no consumida por ningún CSS — trabajo muerto). Único handler en
`components.js` con tracking de booleans (`isSticky`, `isHidden`) para evitar
mutations DOM redundantes (cada `classList.add/remove` invalida estilos
aunque la clase ya esté).

### P3 — `content-visibility: auto` + containment

**Archivo**: `css/performance-fixes.css`

Aplicó `content-visibility: auto` a:
- Secciones below-fold del homepage (`.recently-viewed-section`,
  `.promo-banner-section`, `#testimonials-section`, etc.)
- **Cards individuales** (`.vehicles-grid > .vehicle-card`) con
  `contain-intrinsic-size: 320px 460px`. Apple/Stripe pattern: cada card
  decide independientemente pintarse según su intersección con el viewport.

`contain: layout style` en cards (`.vehicle-card`, `.brand-card`,
`.category-card`, `.fav-stat`, `.rv-card`, `.fw-slide`) y secciones
complejas (`.hero`, `.fw-section`).

**No usar `paint` containment en `.vehicle-card`** — clipearía el burst ring
de 18px del corazón (animación `.favorite-btn--burst`).

### P4 — Replace layout-triggering transitions

**Archivo**: `css/performance-fixes.css`

Cambió `transition: left → transform: translateX` en shines de cards
(`.vehicle-card::after`, `.commercial-card::before`). Animar `left` dispara
layout cada frame; `transform` es solo compositor.

Skipped (riesgo > beneficio):
- Mobile menu `transition: left` (one-shot, no scroll path)
- `.fw-cta-visual::after` (hover discreto del CTA)
- 22 transitions sobre `box-shadow` (solo hover, no scroll)

### P5 — Lazy-load non-critical CSS

**Archivos**: 54 HTMLs (raíz + generadas)

Patrón aplicado: `<link rel="stylesheet" href="X" media="print"
onload="this.media='all'">` + `<noscript>` fallback.

CSS lazy-loaded:
- `footer-fixes.css` (footer below-fold)
- `toast-notifications.css` (toasts on-demand)
- `comparador.css` (excepto `/comparar.html`)
- `historial-visitas.css`, `citas.css`, `animaciones.css`
- `reviews.css` (excepto `/resenas.html`)

### P6 — Consolidate `*-fixes.css` files (microquirúrgico, 9 microfases)

**Eliminados** (todo el contenido mergeado al final de `style.css` con
marcadores `MERGED FROM css/<name>.css (P6 — MFx.x)`):

| Archivo eliminado | Bytes | Reglas | !important | Páginas |
|---|---|---|---|---|
| `favorites-fix.css` | 1.4KB | 7 | 0 | 1 |
| `featured-fixes.css` | 3.7KB | 23 | 2 | 1 |
| `brands-fixes.css` | 6.9KB | 29 | 52 | 1 |
| `vehicles-cards-fix.css` | 10.5KB | 51 | 61 | 58 |
| `sidebar-filters-fix.css` | 15KB | 80 | 5 | 57 |
| `footer-fixes.css` | 14.5KB | 52 | 4 | 63 |
| `mobile-fixes.css` | 18.7KB | 159 | 82 | 63 |

**Reglas de migración aplicadas**:
- Insert al **final** de `style.css` para preservar cascade order original
- Todos los `!important` preservados verbatim (206 total)
- `<noscript>` fallbacks limpiados también
- SW `CACHE_VERSION` bumpeado para invalidar archivos viejos en clientes
- `cache-manager.js APP_VERSION` matched

**`performance-fixes.css` se mantiene** como único override curado de perf
(no es candidato a consolidar).

### P9 — Hero particle density tuning

**Archivo**: `css/performance-fixes.css`

Antes: 8 partículas siempre activas (cada una un GPU layer con animación
infinita). Ahora por viewport:
- Desktop ≤1280px: 6 partículas
- Tablet ≤968px: 4
- Mobile ≤480px: 3
- Tiny ≤360px: 0 (visual noise en pantallas pequeñas)

### P10 — Lazy-load JS via `whenReady()` (3 microfases)

**Archivos**: `js/components.js`, `index.html`, varios HTMLs

#### MF10.1: Helper `whenReady()` global

```js
window.whenReady(predicate, callback, opts)
```

Polls `predicate` hasta que retorna truthy, luego ejecuta callback. Útil
para gate código que depende de globals lazy-loaded sin forzar eager.
Default: timeout 5000ms, poll 100ms.

#### MF10.2: Lazy `comparador.js`

`comparador.js` se carga vía `requestIdleCallback` en páginas que NO usan
`vehicleComparator` síncrono:
- index.html, busqueda.html, favoritos.html, marca.html
- vehiculos-suv/sedan/pickup/hatchback.html
- 18 páginas `/marcas/*.html` generadas

**EAGER required** (uso síncrono): `comparar.html`, `detalle-vehiculo.html`
(template), `/vehiculos/*.html` generadas.

`render.js:96` tiene guard defensivo `typeof window.vehicleComparator !==
'undefined'` que retorna estado inicial inactivo si lazy aún no cargó —
imperceptible para el usuario.

#### MF10.3: Lazy `reviews.js` con whenReady guard

En `index.html` solamente. La sección `#testimonials-section` usa
`whenReady(() => typeof reviewsSystem !== 'undefined', renderTestimonials,
{ timeout: 6000 })`. Si timeout: sección queda vacía (graceful degradation).

`resenas.html` mantiene eager (página principal del feature).

### Archivos clave

| Archivo | Rol |
|---|---|
| `css/performance-fixes.css` | Single-source-of-truth para todos los overrides perf |
| `js/components.js` | Define `whenReady()` + único scroll listener |
| `js/performance.js` | Lazy loading de imágenes + `pauseOffScreenAnimations` |
| `js/cache-manager.js` | Invalida cache al detectar nueva `APP_VERSION` |
| `service-worker.js` | Cache strategy + `CACHE_VERSION` bumping |

### P11 — Lazy Featured Week Banner JS via IntersectionObserver

**Archivo**: `index.html`

`featured-week-banner.js` (31KB, 708 líneas) ahora se carga con doble
estrategia:
- `IntersectionObserver(rootMargin: '400px')` sobre `#fw-banner` — carga
  el script cuando el banner se acerca al viewport
- `requestIdleCallback(timeout: 5000)` fallback — carga cuando el browser
  está idle (cubre users que nunca scrollean)

`window._fwLoaded` sentinel previene doble carga. `main.js`'s Promise.all
ya tiene guard `typeof loadDestacadosBanner === 'function'` que skip si
no está definido — sin race conditions.

### P12 — Optimize Google Fonts loading

**Archivos**: 63 HTMLs (raíz + generadas)

Cambios en URL de Poppins:
- **Eliminado weight 300** (light) — 0 usos en CSS, descarga desperdiciada
- **Agregado weight 800** (extra-bold) — 37 usos en CSS pero NO se cargaba;
  el browser sintetizaba fake-bold de baja calidad
- URL final: `family=Poppins:wght@400;500;600;700;800&display=swap`

Agregado `<noscript>` fallback para usuarios sin JS (el truco
`media="print" onload="..."` falla sin JS).

### P13 — Mobile menu: transform en lugar de left

**Archivo**: `css/style.css`

El menú mobile slide-in animaba `left` (-100% → 0), disparando layout
recalc cada frame. Cambiado a:
- Idle: `left: 0; transform: translateX(-100%)`
- Active: `transform: translateX(0)`
- `transition: transform` + `will-change: transform`

Pure GPU compositing, 60fps consistente en mobile low-end. JS no cambió
(usa solo `classList.toggle`).

### Bonus A — `loading="lazy"` + `decoding="async"` en imgs dinámicas

**Archivos**: `js/comparador.js`, `js/historial-visitas.js`, `js/main.js`

Agregado `decoding="async"` a las `<img>` que ya tenían `loading="lazy"`
(brand logos, promo banners, history cards). Agregado ambos atributos a
`comparador.js` (no tenía ninguno).

`decoding="async"` permite al browser decodificar la imagen off main
thread, eliminando jank de scroll mientras decodifica.

### P14 — Defer `vehicleDB.startRealtime()` to browser idle

**Archivo**: `js/main.js`

Los listeners onSnapshot de Firestore (vehiculos, marcas, banners) tomaban
100-300ms en establecerse + primer-snapshot, bloqueando el main thread
justo después del primer paint. El user ya tiene los datos cacheados
renderizados; el live sync (cambios admin via onSnapshot) puede esperar.

Wrapper en `requestIdleCallback` con `timeout: 4000ms` (fallback
`setTimeout(1500ms)` para browsers sin rIC). Trade-off: cambios admin
se propagan ~1-2s más tarde (acceptable — son eventos raros).

`vehicleDB._realtimeActive` guard previene doble-init si auth.js
también intenta arrancar listeners.

### P15 — `fetchpriority="high"` en main vehicle image

**Archivos**: `detalle-vehiculo.html` (template) + 25 `/vehiculos/*.html`

El `<img id="mainImage">` es el LCP element en páginas de detalle de
vehículo — primera imagen visible above-fold. Agregado:

- `loading="eager"` — explícito (no caer accidentalmente en lazy)
- `fetchpriority="high"` — descarga antes que otras imágenes
- `decoding="async"` — decode off main thread

Otras hero images del sitio ya tenían estos atributos (búsqueda,
contacto, marca, marcas, etc.). Esto trae las páginas de vehículo a
paridad.

### Bonus C — Mobile dropdown `max-height` (intencionalmente skipped)

La técnica moderna `grid-template-rows: 0fr → 1fr` requiere wrapper
interior dentro de `<ul.dropdown-menu>`, lo que produce HTML inválido
(`<ul>` no acepta `<div>` como children). El `interpolate-size` nativo
(Chrome 129+) es la solución futura — esperamos a wider support.

### Validación recomendada tras cada cambio

1. Cargar 3+ páginas afectadas + verificar visual
2. DevTools Network: ningún 404 por CSS/JS
3. DevTools Console: cero errores rojos
4. Mobile breakpoints (320, 480, 768, 1280) con device toolbar
5. `getComputedStyle()` de elementos clave para verificar cascade

### Métricas finales (post P1-P15)

- HTTP requests CSS bloqueantes: **7 → 3** (style.css, dark-theme.css, performance-fixes.css)
- Bytes CSS bloqueante: ~270KB → ~210KB
- 7 archivos `*-fixes.css` eliminados (~70KB del network)
- 4 JS deferidos a idle/IO: cookies, comparador, reviews, featured-week-banner (~80KB)
- Scroll listeners: 2 → 1
- Backdrop-filter en scroll-paths: 14 → 0
- Mobile menu slide: layout-thrashing `left` → GPU `transform`
- Web fonts: weight 300 (unused) eliminado, 800 (37 usos) agregado, `<noscript>` fallback
- Dynamic `<img>` con `decoding="async"`: 0 → 5 callsites
- TTI homepage: realtime listeners diferidos a idle (~100-300ms ahorrados)
- LCP: `fetchpriority="high"` en main vehicle image (26 páginas)

---

## 16. Loading Orchestration (L1-L4) — 2026-05-03

> Plan ejecutado para que la carga visual del sitio se sienta como Apple,
> Linear, Stripe: lo importante aparece instant, lo demás se enriquece
> progresivamente, navegación entre páginas casi instantánea.

### Causa raíz

Aunque P1-P15 redujeron el tiempo de carga real, **la carga PERCIBIDA**
seguía sintiéndose pop-in: el page-loader desaparecía y el sitio aparecía
de golpe, las imágenes hacían "pop" cuando llegaban, las cards aparecían
todas a la vez, y la navegación entre páginas tenía white-flash.

### Sprint 1 (L1.2 + L1.3 + L1.4 + L2.1)

#### L1.2 — Hero LQIP cross-fade
**Archivos**: `css/hero.css`, `index.html`

`.hero` muestra un gradient warm + radial-glow placeholder INSTANT (cero
KB, cero round-trip). La imagen real (`heroindex.webp`, 142KB) se carga
con `new Image()` inline en el head; al `onload`, agrega `.hero-img-loaded`
al `.hero` lo cual fade-in con cross-fade `0.7s` a través de `.hero::after`.

Resultado: cero "negro mientras carga la imagen". Visual desde T=0.

#### L1.3 — Sequential reveal del above-fold
**Archivos**: `css/hero.css`, `js/page-loader.js`, `js/components.js`

Cada child del `.hero-content` empieza `opacity:0; translateY(20px)`.
Cuando `body.loaded` se aplica (page-loader.js dismissLoader), cada uno
fade-up con stagger:
- T+0ms: `.hero-badge`
- T+100ms: `.hero-title`
- T+220ms: `.hero-cta`
- T+340ms: `.hero-search-wrap`

Sincronizado con el fade-out del page-loader, da efecto cinematográfico:
"el splash dissolve INTO el hero stagger".

#### L1.4 — Page-loader smart (cache-aware)
**Archivos**: `js/page-loader.js`

Detecta `altorra-db-cache` en localStorage. Si presente (= return visit),
dismiss en `150ms` post-DOMContentLoaded en lugar de esperar a window.load
(que toma 1-3s en first visit). First-time visitors mantienen el splash
completo para impacto de marca.

#### L2.1 — Stagger fade-in en card grids
**Archivos**: `css/performance-fixes.css`

Las primeras 6 `.vehicle-card` en `.vehicles-grid` aparecen con stagger
de 70ms entre cada una (350ms total). Cards 7+ NO se animan — están
below-fold (skipped por content-visibility) y para cuando el user
scrollea, la animación ya habría terminado fuera de pantalla.

### Sprint 2 (L1.1 + L2.2 + L3.3)

#### L1.1 — Cinematic page-loader cross-fade
**Archivos**: `css/page-loader.css`

Page-loader fade-out extendido: incluye `transform: scale(1.04)` y
`filter: blur(6px)` además de opacity. El logo simultáneamente hace
`scale(0.92)` (settle effect). El splash se "desenfoca y aleja" como
trailer cinema.

#### L2.2 — Auto-reveal landmarks
**Archivos**: `js/performance.js`, `css/performance-fixes.css`

JS auto-instrumenta `.section-header` de cada sección below-fold +
`.commercial-card` con `.auto-reveal` class. IntersectionObserver añade
`.is-revealed` cuando entran al viewport, fade-up `22px → 0` con
transition `0.65s ease-out`. Stagger en commercial cards (80ms entre
cada una).

Para elementos already in viewport on load, IO fires inmediatamente
(fade-in once).

#### L3.3 — Realistic vehicle card skeletons
**Archivos**: `js/render.js`, `css/style.css`

`showLoading()` ya no muestra spinner genérico. Renderiza 6 skeleton
cards con la forma EXACTA de las cards reales:
- Image area (200px)
- Title line (75% width)
- Meta line (55%)
- Price line dorado (45%)
- 2 action pills

Stagger fade-in entre las 6 (igual patrón L2.1) + shimmer wave dorado
infinito (110deg gradient travelling). Mobile breakpoint con dimensiones
ajustadas.

### Sprint 3 (L4.1 + L4.2)

#### L4.1 — Predictive prefetch on hover
**Archivos**: `js/components.js`

Al hover ≥75ms sobre un link interno (= intent), prefetch del HTML
target via `<link rel="prefetch" as="document">`. Click subsiguiente
carga del cache → near-instant navigation.

- 75ms threshold ignora hovers casuales
- `mouseout` cancela timer
- `touchstart` prefetch inmediato (mobile)
- Skip si `Save-Data: on` o conexión `2g`/`slow-2g`
- Set tracking previene duplicados

#### L4.2 — Native View Transitions API
**Archivos**: `css/style.css`, `js/page-loader.js`

CSS opt-in: `@view-transition { navigation: auto }`. En Chrome 126+
hace cross-fade nativo entre páginas (300ms ease-out, no white-flash).

`page-loader.js` detecta soporte vía `CSS.supports('selector(::view-transition)')`
y SKIP su overlay manual cuando el browser puede hacerlo nativo. Browsers
sin soporte (Safari, Firefox, Chrome <126) mantienen el fallback.

Combinado con L4.1 + L1.4 = navegación casi instantánea en Chrome 126+.

### Fases skipped intencionalmente

- **L2.3** (scroll-driven parallax): Chrome 115+ only, sin buen fallback
- **L2.4** (brand carousel settle delay): bajo impacto perceptible
- **L3.1** (hero skeleton si no cacheada): el LQIP ya cubre este caso
- **L3.2** (FW Banner skeleton): el banner ya está `display:none` hasta confirmar vehículos
- **L4.3** (scroll position restoration manual): el browser ya lo maneja OK
- **L4.4** (`view-transition-name` per card morph): muy avanzado, requiere coord HTML+CSS

### Compatibilidad

| Feature | Soporte | Fallback |
|---|---|---|
| L1.1-L2.1, L3.3 | Universal | N/A — pure CSS animations |
| L2.2 (IntersectionObserver) | Chrome 51+, Safari 12.1+, Firefox 55+ | Sin reveal, contenido visible |
| L4.1 (prefetch) | Chrome 8+, Firefox 2+ | No prefetch, navigation normal |
| L4.2 (View Transitions cross-doc) | Chrome 126+ | page-loader.js manual overlay |
| `prefers-reduced-motion: reduce` | Universal | Todas las animaciones desactivadas |

### Flujo de carga end-to-end

```
Visita inicial:
  T=0          page-loader logo sobre fondo negro
  T=~150ms    (return visitor) loader dissolve cinematic
  T=~500ms    (first visitor) loader dissolve cinematic
  T=+0ms       hero gradient LQIP visible al instante
  T=+0ms      → hero badge fade up
  T=+100ms     hero title fade up
  T=+220ms     hero CTA fade up
  T=+340ms     hero search fade up
  T=+700ms     hero image cross-fade in
  T=+1000ms    vehicleDB resolves → 6 skeleton cards desaparecen,
               cards reales fade up con stagger 70ms
  T=scroll     section headers fade up al entrar viewport
  T=scroll     commercial cards fade up con stagger 80ms

Navegación entre páginas (Chrome 126+):
  T=hover 75ms → prefetch HTML
  T=click       browser carga del cache (instant)
                → view-transition cross-fade 300ms
  Página nueva → page-loader detecta cache warm → skip splash (150ms)
                → sequential reveal del nuevo hero
```

### Bonus B — `width`/`height` + AVIF/WebP variants ejecutados

**Archivos**: 11 HTMLs raíz + `scripts/optimize-images.mjs` + `multimedia/optimized/` (90 archivos generados)

#### B.1 — width/height explícitos en hero images

Agregado `width="X" height="Y"` a 11 hero `<img>` (categories, heroes,
marcas-hero). Las dimensiones reales:

| Image | Dimensions |
|---|---|
| BUSQUEDA, contacto-hero, cookies-hero, privacidad-hero, resenas-hero, terminos-hero | 1920×800 |
| marcas-hero | 1920×1134 |
| HATCHBACK | 1200×800 |
| PICKUP, SEDAN, SUV | 1920×900 |

**Por qué importa**: el browser ahora calcula el aspect-ratio antes de
descargar la imagen. Reserva el espacio correcto en el layout. Resultado:
**0 Cumulative Layout Shift (CLS)** cuando la imagen llega — crítico para
mobile UX.

#### B.2 — `scripts/optimize-images.mjs` ejecutado

Script Node con `sharp` que generó variantes AVIF + WebP en 4 tamaños
responsive (480, 768, 1280, 1920) para 12 imágenes hero/categorías.

**Output**: `multimedia/optimized/` (5.3MB total, 90 archivos).

**Cómo correrlo de nuevo (cuando se agreguen imágenes nuevas)**:
```bash
npm install --save-dev sharp   # solo la primera vez
node scripts/optimize-images.mjs
```

**Compresión real obtenida** (variant 1920px vs JPG original):

| Imagen | Original | AVIF-1920 | WebP-1920 | Ahorro AVIF |
|---|---|---|---|---|
| contacto-hero | 163KB | 35KB | 41KB | 78% |
| resenas-hero | 236KB | 65KB | 71KB | 72% |
| marcas-hero | 77KB | 27KB | 35KB | 65% |
| cookies-hero | 318KB | 143KB | 135KB | 55% |
| PICKUP | 129KB | 66KB | 77KB | 49% |
| privacidad-hero | 412KB | 253KB | 223KB | 45% |

Las variantes 480px (mobile) acaban en 6-30KB — reducción ~10× vs JPG.
Mobile users en 3G ahora cargan los heroes en <0.5s.

#### B.3 — `<picture>` tags aplicados a las 11 HTMLs

Cada `<img>` hero ahora vive dentro de un `<picture>` con srcset:

```html
<picture>
    <source type="image/avif" srcset="
        multimedia/optimized/SUV-480.avif 480w,
        multimedia/optimized/SUV-768.avif 768w,
        multimedia/optimized/SUV-1280.avif 1280w,
        multimedia/optimized/SUV-1920.avif 1920w" sizes="100vw">
    <source type="image/webp" srcset="..." sizes="100vw">
    <img src="multimedia/categories/SUV.jpg" alt="SUV"
         class="brand-hero-bg" width="1920" height="900"
         fetchpriority="high" loading="eager" decoding="async">
</picture>
```

**Cómo elige el browser**:
- Soporta AVIF (Chrome 85+, Firefox 93+, Safari 16+) → usa AVIF
- Soporta WebP pero no AVIF → usa WebP
- No soporta ninguno (Safari <14, IE) → usa JPG original (fallback)
- Tamaño: el browser elige el variant más cercano al rendered size
  según el viewport (`sizes="100vw"` → ancho completo de pantalla)

**Páginas actualizadas** (11): busqueda, contacto, cookies, marcas,
privacidad, resenas, terminos, vehiculos-hatchback/pickup/sedan/suv.

**Bumped**:
- `service-worker.js` CACHE_VERSION
- `js/cache-manager.js` APP_VERSION

Para invalidar HTMLs cacheados que apuntaban al `<img>` viejo.

#### Pendiente / mejoras futuras

- Las imágenes nuevas (admin sube vehículos) se siguen sirviendo desde
  Firebase Storage en su formato original. La optimización de admin
  uploads requiere automation server-side (Cloud Function con sharp)
- Alternativa lighter: agregar `node scripts/optimize-images.mjs` como
  pre-deploy step en GitHub Actions cuando se detecten imágenes nuevas

### Métricas finales (post P1-P15 + L1-L4 + Bonus B)

- HTTP requests CSS bloqueantes: **7 → 3** (style.css, dark-theme.css, performance-fixes.css)
- Bytes CSS bloqueante: ~270KB → ~210KB
- 7 archivos `*-fixes.css` eliminados (~70KB del network)
- 4 JS deferidos a idle/IO: cookies, comparador, reviews, featured-week-banner (~80KB)
- Scroll listeners: 2 → 1
- Backdrop-filter en scroll-paths: 14 → 0
- Mobile menu slide: layout-thrashing `left` → GPU `transform`
- Web fonts: weight 300 (unused) eliminado, 800 (37 usos) agregado, `<noscript>` fallback
- Dynamic `<img>` con `decoding="async"`: 0 → 5 callsites
- TTI homepage: realtime listeners diferidos a idle (~100-300ms ahorrados)
- LCP: `fetchpriority="high"` en main vehicle image (26 páginas)
- CLS: 11 hero images con `width`/`height` explícitos → 0 layout shift
- Hero images: AVIF/WebP en 4 tamaños responsive (90 variantes generadas)
- Mobile hero load: ~78% menos KB en formato AVIF-480 vs JPG original
