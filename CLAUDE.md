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
| `optimize-images.yml` | Push main si cambian heroes/categories | Genera AVIF/WebP variants automáticamente |

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

### Race condition favoritos: agregar 4 rápido contaba 3

**Sintoma**: Al hacer click rápido en 4 corazones distintos (en homepage
o búsqueda), el contador del header solo registraba 3. A veces quedaba
desincronizado entre cards visibles y contador. En casos peores se
perdía el favorito completo.

**Causa raíz**: `_loadFromFirestore()` en `favorites-manager.js` corría
en paralelo con `add()`/`remove()`. Si el read de Firestore retornaba
con datos viejos JUSTO cuando el user había añadido un favorito, el
callback hacía `self._favorites = arr` y SOBREESCRIBÍA el favorito
recién añadido.

**Fix aplicado** (2026-04-29):

Cola de operaciones pendientes durante reads en flight:
```js
// Track ops applied while a read is in flight
this._pendingOps = [];   // {op:'add'|'remove', id:String}
this._readInFlight = false;

add(id) {
    this._favorites.push(id);
    if (this._readInFlight) this._pendingOps.push({op:'add', id});
    this._debouncedSync();
}

_loadFromFirestore() {
    this._readInFlight = true;
    this._pendingOps = []; // reset
    db.collection('clientes').doc(uid).get().then(doc => {
        var arr = doc.data().favoritos;
        // CRITICAL: re-apply any ops that happened during the read
        if (this._pendingOps.length > 0) {
            arr = this._applyOps(arr, this._pendingOps);
        }
        this._pendingOps = [];
        this._readInFlight = false;
        this._favorites = arr;
        if (pendingOps.length > 0) this._debouncedSync(); // push merged result
    });
}
```

Esto preserva las mutaciones rapid-fire mientras Firestore responde.
Resuelto: agregar N favoritos rápido siempre cuenta N.

**Archivos**: `js/favorites-manager.js` (refactor completo con cola de
ops, multi-card sync, undo Gmail-style, animaciones burst).

### Carruseles del index NO cargan en mobile (a veces tampoco PC)

**Sintoma**: Al cargar `index.html` en mobile, faltaban completamente:
- Featured Week Banner (#fw-banner)
- Vehículos Disponibles (#allVehiclesCarousel)

Solo se veían las secciones desde "Categorías" hacia abajo. En consola
NO había errores. Inconsistente — a veces sí cargaba, a veces no.

**Dos bugs combinados**:

**Bug A**: cuando `vehicleDB.load()` fallaba (network slow/intermittent
en mobile), retornaba `vehicles=[]`. Cada loader (loadAllVehicles,
loadPopularBrands, FW banner) trataba el array vacío como "admin sin
inventario" → llamaba `hideParentSection()` → `display:none` PERMANENTE.
Sin retry, sin recovery.

PC: vehicleDB cargaba OK → carruseles ✓.
Mobile con red intermitente: vehicleDB fallaba → carruseles ocultos
para siempre.

**Bug B**: `<section id="fw-banner" style="display:none">` rompe
IntersectionObserver. La spec dice que **IO no observa elementos
display:none** (su `boundingClientRect` es 0,0,0,0). El P11 lazy
loader del FW banner usaba IO con `rootMargin: 400px`, pero el
callback NUNCA disparaba — el banner solo dependía del idle fallback
de 5s.

**Fix aplicado** (2026-05-03):

Bug A:
- `js/database.js`: nuevo flag `vehicleDB._loadError = true` cuando
  Firestore falla. Como último recurso usa **stale cache** (mejor 5min
  de antigüedad que nada).
- `js/main.js`: nuevo helper `scheduleSectionRetry(key, fn, baseDelay)`.
  Loaders verifican `vehicleDB._loadError`; si true, schedule retry
  con backoff exponencial (5s, 10s, 15s, max 3 attempts). Reset
  contador en success.
- Mismo patrón en `featured-week-banner.js`.

Bug B:
- `index.html`: dropped IntersectionObserver para FW banner. Nueva
  estrategia: `requestIdleCallback` (timeout 2.5s, fallback setTimeout
  1.5s) + listeners de primera interacción (`scroll`, `touchstart`,
  `mousemove`, `keydown`, capture phase). Lo que dispare primero gana.
  `window._fwLoaded` sentinel previene doble-load.
- `s.onerror` resetea `_fwLoaded` para que retries puedan reintentar.

**Resultado**:
- Mobile + red intermitente: stale cache si existe + retries 3 veces
- Mobile sin cache + Firestore lento: skeletons + retry 5/10/15s
- FW banner: load garantizado en 1.5-2.5s o instantáneo al primer
  touch/scroll

**Archivos**: `js/database.js`, `js/main.js`, `js/featured-week-banner.js`,
`index.html`.

### FOUC del header (botones Ingresar/Registrarse aparecen 1-2s estando logueado)

**Sintoma**: Al hacer F5 o navegar a cualquier página estando logueado,
el header mostraba brevemente "INGRESAR" + "REGISTRARSE" antes de
cambiar al avatar del usuario. Causa frustración visual y proyecta
que la web "no sabe" que el user está logueado.

**Causa raíz**: clásico FOUC of unauthenticated content. El flow:
1. HTML carga con header default (sin auth state)
2. `firebase-config.js` (defer) inicializa Firebase Auth
3. Firebase resuelve `onAuthStateChanged(user)` (200-500ms en mobile, hasta 1-2s en redes lentas)
4. `auth.js updateHeaderAuthState(user)` oculta botones, muestra avatar

Durante esos 200-2000ms, los botones de login/register son visibles.

**Fix aplicado** (2026-05-03) — patrón usado por GitHub, Twitter/X, Stripe:

1. **Hint persistente en localStorage**: cada vez que `auth.js`
   detecta el estado del usuario, persiste:
   - `localStorage['altorra_auth_hint']` = `'authenticated'` | `'guest'`
   - `localStorage['altorra_auth_user_snap']` = `{name, photoURL}` (opcional, para skeleton avatar)

2. **Inline script SÍNCRONO en `<head>` de cada HTML**: lee el hint
   ANTES del primer paint y aplica clase al `<html>`:
   ```html
   <script>(function(){
     try {
       var h = localStorage.getItem('altorra_auth_hint');
       document.documentElement.classList.add(
         h === 'authenticated' ? 'auth-authenticated' : 'auth-guest'
       );
     } catch(e) { document.documentElement.classList.add('auth-guest'); }
   })();</script>
   ```

3. **CSS reglas** en `style.css`:
   ```css
   html.auth-authenticated #btnLogin,
   html.auth-authenticated #btnRegister,
   html.auth-authenticated #mobBtnLogin,
   html.auth-authenticated #mobBtnRegister { display: none !important; }

   html.auth-guest #headerUserArea { display: none !important; }

   /* Skeleton placeholder dorado mientras Firebase confirma */
   html.auth-authenticated #headerUserArea:empty::before {
     content: '';
     width: 32px; height: 32px; border-radius: 50%;
     background: rgba(184,150,88,0.15);
     animation: authSkeletonPulse 1.4s ease-in-out infinite;
   }
   ```

4. **`auth.js updateHeaderAuthState(user)`**: además de su lógica DOM
   actual, ahora persiste el flag y sincroniza la clase del `<html>`.
   Si Firebase confirma que el hint era incorrecto (sesión expirada),
   se quita `auth-authenticated` y se añade `auth-guest`.

**Resultado**:
- Return visit logged-in → header SIN flash de botones, avatar
  skeleton (pulsing dorado) mientras Firebase confirma
- Return visit logged-out → botones visibles desde T=0
- Sesión expirada (hint dice authenticated pero Firebase dice null)
  → ~200ms para corregir; mejor que el 1-2s del flash original

**Archivos modificados**:
- `js/auth.js` — `updateHeaderAuthState` persiste flag + clase
- `css/style.css` — reglas `.auth-authenticated` / `.auth-guest`
- 62 HTMLs — inline script reader en cada `<head>` (script Python
  para inject consistent: `inject-auth-hint.py`)

### Header Loading Sprint — apariencia secuencial + flash residual del Registrarse

**Sintomas residuales** (post-fix anterior):
1. **El boton "Registrarse" segue apareciendo a veces** durante 200-1500ms
   en redes lentas, incluso con el auth-hint en `<head>`
2. **El lado derecho del header carga secuencialmente**: favoritos →
   ingresar → registrarse → bell aparecen uno-por-uno (300-600ms total)
   en vez de juntos. El boton de favoritos sale ULTIMO

**Causas raiz** (3 combinadas):

**Causa A — Race del primer `onAuthStateChanged(null)` transiente**:
Firebase a veces dispara `onAuthStateChanged(null)` ANTES de que IndexedDB
restaure la persistencia. Si el codigo trata ese null como "logout",
inmediatamente:
- `localStorage.altorra_auth_hint = 'guest'`
- `<html>` pierde `auth-authenticated`, gana `auth-guest`
- Los botones Login/Register se VUELVEN visibles
Luego (200-1500ms despues) Firebase resuelve con el usuario real → flip
de vuelta a authenticated → flash visible

**Causa B — Async fetch del header HTML**:
`components.js` hace `fetch('snippets/header.html')` y inyecta con
`innerHTML`. Esto toma 50-300ms. Durante ese tiempo el `header-placeholder`
esta vacio. Cuando el HTML llega, los elementos del lado derecho aparecen
secuencialmente porque cada uno tiene SVG inline que decodifica en
momentos ligeramente distintos + el `headerNotifBell` se monta despues
por `notifyCenter.mount()` + el `headerUserArea` se popula despues por
`auth.js`. Todo esto causa multiples repaints visibles.

**Causa C — `auth-header.css` cargado async**:
El CSS del avatar dropdown (`hdr-user-btn`, `hdr-user-avatar`, etc.) se
cargaba via `loadAuthSystem()` despues de la inyeccion del header.
Resultado: el avatar pop-in con estilo bruto antes de que el CSS llegara.

**Fix aplicado** (2026-05-03 — Header Loading Sprint):

**1. Grace-period contra el null transiente** (`js/auth.js`):
```js
var _initialResolutionDone = false;
var _initialNullTimer = null;
var GRACE_MS = 1800;

function onAuthStateChanged(user) {
    if (!_initialResolutionDone && !user) {
        var hint = localStorage.getItem('altorra_auth_hint');
        if (hint === 'authenticated') {
            // Probable transient null. Wait for persistence.
            _initialNullTimer = setTimeout(function () {
                _initialResolutionDone = true;
                if (!_currentUser) _processNullState();
            }, GRACE_MS);
            return;
        }
    }
    // ... normal flow
}
```
Si el primer fire es null PERO el hint dice authenticated, espera 1800ms
antes de hacer flip a guest. Si Firebase resuelve el usuario en ese
tiempo, el timer se cancela y nunca hay flash. Si pasan 1800ms y sigue
null, recién ahí procesamos el logout.

**2. Atomic reveal del lado derecho** (`css/style.css` + critical inline):
```css
.nav-actions {
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.28s cubic-bezier(0.22, 1, 0.36, 1);
}
.nav-actions.hdr-ready { opacity: 1; visibility: visible; }
```
La clase `.hdr-ready` se agrega via `requestAnimationFrame` en
`components.js` DESPUES de inyectar el header Y de aplicar el auth state
sincronicamente. Resultado: todos los elementos del lado derecho aparecen
JUNTOS con un fade-in suave de 280ms — nunca uno-por-uno.

**3. Pre-render sincronico del avatar desde snapshot cacheado**
(`js/components.js` `applyAuthHintToHeader`):
```js
function applyAuthHintToHeader() {
    var hint = localStorage.getItem('altorra_auth_hint');
    if (hint !== 'authenticated') return;
    var snap = JSON.parse(localStorage.getItem('altorra_auth_user_snap'));
    if (!snap) return;
    // Build avatar HTML from cached snapshot
    var userArea = document.getElementById('headerUserArea');
    userArea.innerHTML = '<div class="hdr-user-wrapper" data-prerendered="1">' + ...;
}
```
Para usuarios que vuelven al sitio logueados, el avatar aparece
INSTANTANEAMENTE desde el snapshot cacheado en localStorage — sin
esperar a que Firebase resuelva. Patron Apple/Amazon: optimistic UI
desde estado cacheado.

**4. `auth.js renderUserArea` detecta pre-render para evitar doble-paint**:
```js
var preWrapper = container.querySelector('.hdr-user-wrapper[data-prerendered="1"]');
if (matchesPrerender && !hasDropdown) {
    // Optimal: just append dropdown + wire listeners
    preWrapper.insertAdjacentHTML('beforeend', dropdownHtml);
} else if (!matchesPrerender) {
    // Full render
    container.innerHTML = ...;
}
```
Si el avatar ya esta pre-renderizado y el nombre coincide, solo se
agrega el dropdown sin tocar el avatar. Cero flicker.

**5. `auth-header.css` mergeado en `style.css`**:
Los 168 lineas del CSS del avatar dropdown ahora viven al final de
`style.css` (marcador `MERGED FROM css/auth-header.css`). Asi el CSS
esta listo en el primer paint del style.css blocking — no async.

**6. Critical inline CSS en `<head>` de cada HTML**:
```html
<style>
#header-placeholder{min-height:80px;display:block}
header .nav-actions{opacity:0;visibility:hidden;transition:opacity .28s cubic-bezier(.22,1,.36,1);min-height:34px}
header .nav-actions.hdr-ready{opacity:1;visibility:visible}
html.auth-authenticated #btnLogin,html.auth-authenticated #btnRegister,...{display:none!important}
html.auth-guest #headerUserArea{display:none!important}
html.auth-authenticated #headerUserArea{min-width:36px;display:inline-flex;align-items:center}
</style>
```
Reserva 80px de altura del header (cero CLS), aplica las reglas auth-hint
sincronicamente (defense-in-depth si style.css aun no parsea), y oculta
el `.nav-actions` hasta que JS confirme que esta listo.

**7. Notification bell slot reservado** (`hdr-notif-bell-slot` en
auth-header.css mergeado): `min-width: 34px; min-height: 34px` evita
que el bell pop-in cuando `notifyCenter.mount()` corre.

**Flujo completo end-to-end** (return visit logged-in):
```
T=0           HTML parse, inline <head>:
              - Reads auth_hint='authenticated' → adds .auth-authenticated to <html>
              - Critical CSS reserves 80px header, hides .nav-actions
T=+blocking   style.css applies (auth rules already match thanks to inline)
T=+0ms        First paint: header shell visible, right side INVISIBLE
T=+50-300ms   components.js fetch resolves, header HTML injected
T=+0ms        applyAuthHintToHeader runs synchronously:
              - Reads cached user snapshot from localStorage
              - Pre-renders avatar HTML into #headerUserArea
T=+next rAF   .hdr-ready class added → .nav-actions fade-in 280ms:
              - All elements (favoritos, bell, avatar) appear TOGETHER
T=+200-1500ms Firebase Auth resolves user from IndexedDB persistence
              → updateHeaderAuthState detects pre-render, just appends dropdown
              → ZERO visible change
```

**Flujo (return visit logged-out)**:
```
T=0           inline reads hint='guest' → .auth-guest applied
T=+blocking   style.css: auth-guest hides #headerUserArea
T=+50-300ms   header injected. login/register buttons present, hidden
              by .nav-actions opacity:0
T=+next rAF   .hdr-ready → all visible together, fade-in 280ms
T=+~500ms     Firebase fires onAuthStateChanged(null) → already correct
```

**Flujo (sesion expirada — hint stale)**:
```
T=0           inline reads hint='authenticated' (stale)
T=+rAF        avatar pre-rendered + .hdr-ready
T=+~500ms     Firebase fires onAuthStateChanged(null)
              → grace timer starts (1800ms)
T=+~700ms     Firebase confirms still null in second fire
              → grace timer continues
T=+1800ms     Timer expires, _processNullState runs:
              → updateHeaderAuthState(null) flips to guest
              → avatar replaced by login/register buttons (one paint)
```
En sesion expirada hay UN flip al final, pero solo si la sesion era
realmente invalida. Para sesion valida con persistencia lenta, cero flash.

**Archivos modificados** (2026-05-03):
- `js/auth.js` — grace-period, `_processNullState` extraido, `renderUserArea`
  detecta pre-render con `data-prerendered`, guards `data-bound` para
  prevenir double-binding de event listeners
- `js/components.js` — `applyAuthHintToHeader()` nueva, `.hdr-ready` via
  rAF, `auth-header.css` async-load eliminado
- `css/style.css` — `.nav-actions` opacity gate + `.hdr-ready` reveal,
  `auth-header.css` mergeado al final, `.hdr-notif-bell-slot` reserva
- `css/auth-header.css` — DEPRECATED (mantenido en disco por compat de
  cache; ya no referenciado por nuevos page loads)
- 65 HTMLs — critical inline CSS injected (62 con auth-hint previo + 4
  faltantes regenerados con bloque completo)
- `service-worker.js` + `js/cache-manager.js` — version bump
- `detalle-vehiculo.html` + `marca.html` (templates de generador) ya
  parchados, las paginas regeneradas heredaran el fix

### Auth UX Overhaul — modal Google lento + login/logout sin feedback

**Sintomas reportados** (2026-05-03):
1. Tras login exitoso con Google, el modal quedaba abierto 1+ segundo
   antes de cerrarse — feedback se sentia "lento" y "como roto"
2. Click en boton Google podia hacerse multiples veces (sin loading
   state visible)
3. Logout no mostraba feedback hasta que Firebase respondia
4. Errores mostraban mensaje pero sin feedback visceral
5. Sin proteccion contra red offline (errores cripticos)
6. Returning users tenian que volver a tipear su email cada vez

**Causa raiz del modal lento**:
`_processGoogleUser()` en auth.js hacia un `db.collection('usuarios').doc(uid).get()`
ANTES de cerrar el modal — esa lectura de Firestore tomaba 200-1000ms
(WebChannel handshake + RTT). El modal quedaba abierto durante todo ese
tiempo. Mismo patron que ya teniamos en handleLogin (corregido antes pero
no en el path de Google).

**Patron Apple/Stripe/GitHub aplicado**: Optimistic UI — cierra el modal
y actualiza UI INSTANTANEAMENTE al saber que la operacion sera exitosa,
sin esperar todas las verificaciones de backend. Las verificaciones
corren en background. Si fallan, signOut + toast (modal ya cerrado).

**Fixes aplicados** (10 mejoras coordinadas):

1. **Cierre instantaneo del modal Google** (`auth.js handleGoogle/_processGoogleUser`):
   ```js
   window.auth.signInWithPopup(provider).then(function (result) {
       _preApplyAuthHint(result.user);  // sync header switch
       closeAuthModal();                 // instant
       _processGoogleUser(result.user, isNew); // background
   });
   ```
   Modal cierra en <50ms post-popup. Validation (admin check, duplicate
   email) corre en background. Si admin → signOut + toast. Si email
   duplicado → unlink Google + toast.

2. **Pre-apply auth-hint sincrono** (`auth.js _preApplyAuthHint(user)`):
   - Setea `localStorage.altorra_auth_hint = 'authenticated'`
   - Setea `altorra_auth_user_snap` con name/photoURL
   - Agrega `auth-authenticated` class al `<html>`
   - Resultado: el header switchea de Login/Register a avatar ANTES
     de que `onAuthStateChanged` fire. Cero delay perceptible.

3. **Lock de controles durante operaciones** (`auth.js _lockAuthControls`):
   - Disable + `.is-locked` class en TODOS los botones del modal
     (login submit, register submit, reset submit, ambos Google
     buttons, tabs, forgot link, back btn)
   - Previene: double-click submit, click Google mientras email
     login en progreso, navegar entre tabs mid-flight
   - Visual: spinner dorado en boton Google, opacity 0.65, pointer-events none

4. **Logout con feedback inmediato** (`auth.js handleLogout`):
   - `_logoutInFlight` flag previene double-click
   - `_preApplyGuestHint()` sincronicamente cambia el header a guest
     ANTES del signOut (instant visual revert)
   - Cierra dropdown del avatar antes de signOut (no quede flotando)
   - Toast `'Sesión cerrada correctamente.'` (success) en lugar de
     plain info — mas reassuring
   - Network failure handling: toast `'Sincronizando...'` si signOut
     falla (Firebase resolvera en proximo page load)

5. **Detection offline en tiempo real** (`auth.js _updateOfflineBanner`):
   - Banner amber dentro del modal: "Sin conexión a internet..."
   - Pre-checks `!navigator.onLine` en handleLogin, handleRegister,
     handleReset → muestra error inline + shake (sin intentar Firebase
     que daria mensaje criptico)
   - Listener `online`/`offline` de window: actualiza banner +
     toast "Conexión restablecida" / "Sin conexión"

6. **Credential Management API** (`auth.js _saveCredential`):
   - Tras login/register exitoso con email+password, llama
     `navigator.credentials.store(new PasswordCredential(...))` para
     sugerirle al browser guardar la password
   - Falla silenciosamente en navegadores sin soporte (Firefox <114)
   - Browsers con soporte muestran prompt nativo "Save password?"

7. **Pre-fill del ultimo email** (`auth.js _persistLastEmail` / openAuthModal):
   - Tras login/register exitoso: `localStorage.altorra_last_email = email`
   - openAuthModal: si campo loginEmail vacio Y hay last_email → pre-llena
   - Auto-focus va al primer campo VACIO (skip pre-filled email →
     focus pasa directo al password)
   - Patron GitHub/Stripe/Booking — returning users solo tipean password

8. **Cross-tab session sync feedback** (`auth.js storage event listener`):
   - Si tab A cierra sesion → localStorage `altorra_auth_hint = 'guest'`
     → tab B recibe storage event → toast: "Sesión cerrada en otra pestaña"
   - Mismo patron para login: "Sesión iniciada en otra pestaña"
   - Solo se muestra si modal NO esta activo en esta tab (probablemente
     el usuario NO esta haciendo login aqui)

9. **Shake animation + auto-focus en errores** (`auth.js _shakeModal`):
   - Animation: `transform: translateX(-6px → +6px)` × 5 = 0.5s
   - Aplicado en: campos vacios, password incorrecta, email ya en uso,
     password debil, network errors
   - Reset por `removeClass('shake')` + force reflow + re-add
     (re-trigger consecutivo)
   - Auto-focus al campo errado: handleLogin → focus password si
     credential error; handleRegister → focus email si already-in-use,
     password si weak
   - `navigator.vibrate(80)` en mobile (haptic feedback sutil)
   - Respeto a `prefers-reduced-motion`

10. **Smooth close animation** (CSS + auth.js closeAuthModal):
    - Antes: `removeClass('active')` instant → modal desaparecia bruscamente
    - Ahora: `addClass('closing')` → CSS animation 180ms (fade out +
      slide down + scale 0.96) → `removeClass('active', 'closing')`
    - Match con la animacion de apertura (slide up scale 0.97 → 1)
    - **Importante**: closeAuthModal SOLO limpia password fields,
      no email — un cierre accidental no fuerza re-typing

**Edge cases manejados**:

| Caso | Comportamiento |
|------|---------------|
| Click Google + popup blocked | `auth/popup-blocked` → toast 8s con instrucciones, lock liberado |
| Click Google + cierras popup | `auth/popup-closed-by-user` → silent, lock liberado |
| Login con red offline | Pre-check `!navigator.onLine` → error inline + shake, NO Firebase call |
| Login con cuenta admin | Background validation detecta `usuarios/{uid}` → signOut + toast (modal ya cerrado) |
| Registro con email duplicado | Firebase devuelve `auth/email-already-in-use` → focus email + shake |
| Double-click logout | `_logoutInFlight = true` → segundo click ignored |
| Logout con red offline | signOut local funciona, sync remoto fallara — toast: "Sincronizando..." |
| Cross-tab logout mid-form | tab A logged out, tab B con modal abierto → NO toast (estaria distrayendo) |
| Modal cerrado durante login | Lock previene cierre via tabs/forgot, pero close button (X) sigue funcionando |
| Network falla durante validation Google | console.warn pero NO signOut — assume OK (most users no son admin) |
| Browser sin Credential Mgmt API | `_saveCredential` retorna silenciosamente, browser puede prompter nativamente |

**Flujo completo del login Google (post-fix)**:
```
T=0          User clicks "Continuar con Google"
T=+0ms       _lockAuthControls(true) — todos los botones disabled, spinner en Google
T=+0ms       window.auth.signInWithPopup(provider) — popup se abre
T=variable   User selects cuenta en popup, popup cierra
T=+resolve   Promise resuelve con result.user
T=+0ms       _preApplyAuthHint(user) — localStorage + html.auth-authenticated
T=+0ms       closeAuthModal() — animation cierra modal en 180ms
T=+0ms       _processGoogleUser(user) corre en background
T=+200-1000  Firestore lookup completa
T=+200-1000  Si admin → undoGoogleAndWarn → signOut + toast error
             Si OK → _toast("¡Bienvenido!") + saveClientProfile (background)
T=+0-200ms   onAuthStateChanged fire — pero header YA estaba en estado authenticated,
             solo se renderiza el dropdown sobre el avatar pre-rendered (zero flicker)
```

**Flujo del logout (post-fix)**:
```
T=0          User clicks "Cerrar sesión" en dropdown
T=+0ms       _logoutInFlight = true — guard contra double-click
T=+0ms       _preApplyGuestHint() — instant header revert (botones Login/Register visibles)
T=+0ms       Avatar dropdown se cierra
T=+0ms       vehicleDB.stopRealtime() — previene 400 en Listen channel
T=+0ms       window.auth.signOut() — async
T=+50-300ms  Firebase confirma signOut
T=+50-300ms  toast: "Sesión cerrada correctamente."
T=+50-300ms  onAuthStateChanged(null) → _processNullState
             → favoritesManager.clearUser, vehicleHistory.clearUser
             → signInAnonymously (next page load) o skip si _explicitLogout
```

**Archivos modificados**:
- `js/auth.js` — handleGoogle/handleLogin/handleRegister/handleLogout
  refactorizados, nuevos helpers `_lockAuthControls`, `_preApplyAuthHint`,
  `_preApplyGuestHint`, `_persistLastEmail`, `_shakeModal`, `_saveCredential`,
  `_updateOfflineBanner`. Listeners online/offline + storage (cross-tab).
- `css/auth.css` — `.is-locked` state, `@keyframes authShake`,
  `@keyframes authSlideDown`/`authFadeOut`, `.closing` modal animation,
  `.auth-offline-banner` styles
- `service-worker.js` + `js/cache-manager.js` — version bump

**Resultado**: Login Google se siente instantaneo (modal cierra en
<200ms post-popup vs 1000ms antes). Header switch INSTANT (<50ms).
Logout con feedback inmediato. Cero "did I click the button?" moments.

### Console hygiene — analisis de mensajes en consola

**Inventario completo de logs de consola en produccion**:

| Mensaje | Tipo | Origen | Accion |
|---------|------|--------|--------|
| `Define @import rules at the top of the stylesheet` | Warning (1) | `style.css:5241` | **CORREGIDO** — `@import url(...Cardo...)` movido al inicio del archivo. Antes vivia en el bloque mergeado de `footer-fixes.css` (P6) y el browser lo IGNORABA → footer caia silenciosamente a Georgia. Ahora si carga Cardo |
| `Cross-Origin-Opener-Policy policy would block the window.closed call` (popup.ts:302) | Error rojo (multiples) | Firebase Auth SDK | **PENDIENTE** — solo via custom domain + Cloudflare. Plan documentado en Seccion 18 |
| `Cross-Origin-Opener-Policy policy would block the window.close call` (popup.ts:50) | Error rojo (multiples) | Firebase Auth SDK | **PENDIENTE** — solo via custom domain + Cloudflare. Plan documentado en Seccion 18 |
| `enableMultiTabIndexedDbPersistence is deprecated` | Warning amarillo | Firebase Compat SDK | **NO ACCIONABLE** — API nueva (`persistentLocalCache`) solo existe en SDK modular. Migrar implicaria refactor de ~50 archivos. Warning cosmetico |
| `ReferenceError: vehicleDB is not defined` | Error rojo | featured-week-banner.js (lazy-loaded) | **CORREGIDO 2026-05-04** — guard + retry pattern en `featured-week-banner.js`. Ver Seccion 8 → "Mejoras post-launch GIS" Fix 3 |
| `[GSI_LOGGER]: NotificationGetMomentReason methods deprecated` | Warning | GIS deprecation | **CORREGIDO 2026-05-04** — removido callback parameter de `prompt()`. Ver Fix 7 |
| `The AudioContext was not allowed to start` | Warning amarillo | Toast notifications system | **CORREGIDO 2026-05-04** — gated AudioContext detras de primer user gesture. Ver Fix 8 |
| `[DB] Real-time listeners started/stopped` | Info (verde) | `database.js` | Comportamiento normal — uno por auth state change. Diagnostico util, mantenidos |
| `[DB] Firestore loaded: N vehicles, N brands` | Info | `database.js` | Diagnostico util, mantenido |
| `[DB] Real-time update: N items` | Info | `database.js` | Confirma snapshot recibido — diagnostico util |
| `Firebase deferred SDKs loaded` | Info | `firebase-config.js:90` | Confirma SDK no-critico cargado |

**Sobre los COOP warnings** (Cross-Origin-Opener-Policy):

Cuando el usuario hace click en "Continuar con Google", la consola muestra
multiples errores rojos del estilo:
```
Cross-Origin-Opener-Policy policy would block the window.closed call
  popup.ts:302
```

**Origen**: Firebase Auth's `signInWithPopup` interno hace polling cada
50ms a `window.closed` para detectar si el usuario cerro la popup
manualmente. Chrome's COOP isolation (default desde Chrome 92) bloquea
las lecturas cross-origin de window.closed. Firebase tiene un fallback
(postMessage desde la popup) y el LOGIN FUNCIONA NORMALMENTE.

**Por que no se puede silenciar**:
1. **Server header**: Habria que setear `Cross-Origin-Opener-Policy: same-origin-allow-popups`
   en respuestas HTTP. **GitHub Pages no permite headers personalizados** —
   solo se podria con un dominio propio + Cloudflare/Netlify. Costo:
   compra de dominio + reconfiguracion DNS.
2. **Switch a `signInWithRedirect`**: Ya probado y NO funciona en GitHub
   Pages porque `authDomain` (altorra-cars.firebaseapp.com) != hosting
   domain (altorracars.github.io). El sessionStorage cross-origin
   impide que `getRedirectResult()` lea el resultado.
3. **Suprimir en consola**: Los errors browser-level no se pueden
   silenciar via JS (`console.warn` de Firebase los emite).
4. **Firebase SDK update**: 11.3.0 ya es relativamente reciente. Issue
   abierto: https://github.com/firebase/firebase-js-sdk/issues/6868

**Conclusion**: COOP warnings son ruido cosmetico. Login funciona
perfectamente. Cantidad de warnings ∝ tiempo que la popup esta abierta
(50ms × N polls). No hay impacto funcional.

**Plan de fix futuro**: Documentado en **Seccion 18** — cuando se compre
dominio custom en Hostinger, se configura Cloudflare como CDN/proxy
para agregar el header `Cross-Origin-Opener-Policy: same-origin-allow-popups`
y los COOP warnings desaparecen. Pasos detallados, troubleshooting y
rollback plan estan en la Seccion 18.

**Documentado en**: `js/auth.js handleGoogle()` con bloque comentario
explicativo para que futuros devs no pierdan tiempo investigando.

**Sobre los `[DB] Real-time listeners` cycles**:

El log muestra varios `stopped`/`started` consecutivos durante el flujo
de auth. **Es normal**:
- Login Google: anonymous user → registered user (Firebase dispara
  signOut del anonymous + signIn del registrado = 2 transitions)
- Cada transition dispara `vehicleDB.stopRealtime()` ANTES del signOut
  (para evitar el 400 en `/Listen/channel`) y `startRealtime()` despues
  del nuevo auth (para reanudar listeners con el nuevo token).

Optimizacion potencial (no aplicada): si el siguiente auth state es
otro user no-anonymous, se podria saltar el cycle. Pero el savings
seria marginal (1 cycle = ~50-200ms re-handshake) y no hay impacto
visual al usuario.

**Que SI deberia preocupar (todavia no observado)**:
- `[Auth]` errors no esperados (no permission-denied de cross-tab logout)
- `Failed to load resource` (4xx/5xx de Firestore o Storage)
- `Uncaught (in promise)` rejections sin handler
- Memory leaks evidenciados por el indicador de Memory en DevTools

### Google Identity Services (GIS) — Modern OAuth con One Tap

**Problema original**: `signInWithPopup` de Firebase produce multiples
warnings en consola por COOP (Cross-Origin-Opener-Policy). Tambien es
una experiencia menos moderna comparado con One Tap que usan Pinterest,
Medium, Notion, Stack Overflow.

**Solucion implementada** (2026-05-03): Migracion a Google Identity
Services (GIS) con fallback automatico al popup legacy. Coexistencia
asegura cero rotura del flujo existente.

**Arquitectura: Progressive Enhancement con triple-fallback**:

```
User click "Continuar con Google"
     │
     ├─ ¿GIS_CONFIGURED y script loaded? ──── YES ──→ _gisSignIn()
     │                                               │
     │                                               ├─ google.accounts.id.prompt()
     │                                               │       │
     │                                               │       ├─ User selects → _onGisCredential
     │                                               │       │       │
     │                                               │       │       ├─ signInWithCredential
     │                                               │       │       │       │
     │                                               │       │       │       ├─ Success → _processGoogleUser
     │                                               │       │       │       └─ Error → fallback → _legacyPopupSignIn
     │                                               │       │       │
     │                                               │       └─ User dismiss → silent
     │                                               │
     │                                               └─ Init throws → _legacyPopupSignIn
     │
     ├─ ¿GIS loading? Wait 1s ──── On time ──→ _gisSignIn / _legacyPopupSignIn
     │                          └─ Timeout ──→ _legacyPopupSignIn
     │
     └─ Skip GIS ──→ _legacyPopupSignIn (con COOP warnings, login funciona)
```

**Setup requerido (UNA VEZ)**:

1. **Obtener OAuth Client ID**:
   - Firebase Console → Authentication → Sign-in method → Google → Web SDK Configuration
   - Copiar "Web client ID" (formato: `XXXXXXXX-XXXXX.apps.googleusercontent.com`)

2. **Configurar JavaScript Origins autorizados**:
   - Google Cloud Console → APIs & Services → Credentials → "Web client (auto created by Google Service)"
   - Authorized JavaScript origins:
     - `https://altorracars.github.io` (production)
     - `http://localhost:8080` (testing local — opcional, eliminar para prod)

3. **Pegar el Client ID en `js/firebase-config.js`**:
   ```js
   window.GOOGLE_OAUTH_CLIENT_ID =
       '235148219730-XXXXXXXXXXXXXXXXXXXXXXXXXXXX.apps.googleusercontent.com';
   ```

4. **Listo**: Si el Client ID es valido, GIS se activa automaticamente.
   Si esta vacio o es placeholder (con `XXXXXXXX`), el codigo usa el
   fallback legacy y todo funciona como antes.

**Componentes implementados**:

| Funcion | Archivo | Proposito |
|---------|---------|-----------|
| `loadGisLibrary()` | `components.js` | Carga `accounts.google.com/gsi/client` async + setea flags `_gisLoaded` / `_gisLoadFailed` |
| `_shouldUseGis()` | `auth.js` | Devuelve true si GIS_CONFIGURED + script loaded + `window.google.accounts.id` disponible |
| `handleGoogle()` | `auth.js` | Entry point. Decide GIS vs legacy. Maneja "GIS loading" wait branch |
| `_ensureGisInit(callback)` | `auth.js` | Singleton: llama `initialize()` una sola vez por sesion. Callback indirecto permite swap entre One Tap y sign-in |
| `_gisSignIn()` | `auth.js` | Muestra prompt + 2.5s watchdog timeout + localStorage memory de FedCM blocked (6h TTL) + auto-fallback a popup + race guard `_legacyPopupInFlight` |
| `_onGisCredential()` | `auth.js` | Recibe JWT credential → llama `signInWithCredential` → `_processGoogleUser` |
| `_legacyPopupSignIn()` | `auth.js` | Fallback usando `signInWithPopup` (codigo viejo intacto) |
| `_maybeShowOneTap()` | `auth.js` | One Tap en homepage para guests con dismissal cooldown 7 dias |

**One Tap UX (homepage solamente)**:

Condiciones STRICTAS para mostrar One Tap (todas deben cumplirse):
1. URL es homepage (`/`, `/index.html`, o termina en `/altorracars.github.io/`)
2. Usuario es guest (`localStorage.altorra_auth_hint != 'authenticated'`)
3. `window.GIS_CONFIGURED = true`
4. GIS script cargo OK
5. No hay modal de auth abierto (no compite con form)
6. Ultimo dismiss > 7 dias atras (`localStorage.altorra_onetap_dismiss`)
7. Delay de 1.5s post-load para no interrumpir UX inicial

Posicion: top-right desktop, top-center mobile (default de Google).
Comportamiento: el user click "Continue as Carlos" → login en 1 click,
sin popup, sin nada. Patron Pinterest/Medium/Stack Overflow.

**FedCM (Federated Credential Management)**:

Chrome 117+ requiere FedCM para One Tap. Se activa via:
```js
use_fedcm_for_prompt: true
```
Browsers anteriores (sin FedCM) lo ignoran y usan el flujo clasico.

**Edge cases manejados** (validados manualmente):

| # | Escenario | Outcome |
|---|-----------|---------|
| A | Client ID = placeholder | Fallback legacy automatico — login funciona |
| B | OAuth OK + GIS loaded | GIS prompt → ZERO COOP warnings |
| C | Adblocker bloquea GIS | `script.onerror` → `_gisLoadFailed=true` → fallback |
| D | Click rapido, GIS aun cargando | Wait 1s, luego GIS o fallback |
| E | GIS init throws | try/catch → fallback |
| F | User sin Google session | `notification.isNotDisplayed()` → fallback |
| G | User dismiss prompt (X) | Silent, no fallback |
| H | Token JWT invalido | Catch → fallback |
| I | Admin user via GIS | `_processGoogleUser` → undoGoogleAndWarn → signOut |
| J | Email/password ya existe | Mismo path admin → undoGoogleAndWarn |
| K | One Tap, modal abierto | `triggerOneTap` skip if modal active |
| L | One Tap, hint=authenticated | early return |
| M | One Tap dismissed reciente | `lastDismiss < 7d` → skip |
| N | Modal cerrado mid-wait | `modalWasOpen()` check evita popup huerfano |
| O | Network failure GIS load | `script.onerror` → fallback |
| P | Browser sin localStorage | try/catch en cada acceso |
| Q | Timeout firing despues de close | `_onGisReady = null` antes del fallback |
| R | prefers-reduced-motion | Respetado en CSS |
| S | Safari ITP | `itp_support: true` + fallback como red de seguridad |
| T | FedCM disabled in Chrome | 2.5s watchdog → `_markGisBlocked()` + **auto-open legacy popup** + race guard `_legacyPopupInFlight=true`. Next visit: instant fallback (0ms) via localStorage memory (`altorra_gis_blocked`, 6h TTL — corto para recovery rapido). Successful GIS sign-in clears the flag |
| U | GIS prompt returns no notification | Same watchdog → same localStorage memory → auto-fallback |
| V | Late GIS credential after popup opened | `_legacyPopupInFlight=true` → ignore late credential callback (silencioso) |
| W | One Tap fails silently (FedCM blocked) | Mini-watchdog 2.5s post-prompt → marca `altorra_gis_blocked` si no credential → siguientes loads van directo a legacy popup, sin volver a fallar |

**Por que NO eliminamos el codigo legacy de signInWithPopup**:
- **Resiliencia**: Si Google deprecia GIS o cambia API, login sigue funcionando
- **Adblocker users**: GIS es bloqueado frecuentemente por uBlock Origin, Brave, etc.
- **Transparency**: El user puede no haber configurado el Client ID — fallback es el default
- **Testing**: Facil A/B comparison cambiando `GIS_CONFIGURED`

**Que pasa al pegar el Client ID real**:
- `window.GIS_CONFIGURED = true` automaticamente
- Proximo click en "Continuar con Google" usa GIS
- Cero COOP warnings en consola
- One Tap aparece en homepage para returning Google users
- Login en general 30-50% mas rapido (sin overhead de window.open)

**Que pasa si NO pegas el Client ID**:
- Codigo funciona exactamente como antes
- COOP warnings cosmeticas siguen apareciendo
- One Tap nunca se muestra
- Sin impacto funcional, solo perdes el upgrade de UX

**Archivos modificados**:
- `js/firebase-config.js` — `GOOGLE_OAUTH_CLIENT_ID` constant + `GIS_CONFIGURED` flag
- `js/components.js` — `loadGisLibrary()` con onload/onerror handlers
- `js/auth.js` — refactor de `handleGoogle` en GIS + legacy + wait branch.
  Nuevos: `_shouldUseGis`, `_gisSignIn`, `_onGisCredential`, `_legacyPopupSignIn`,
  `_maybeShowOneTap`. Eliminado dead code: `showGoogleError`. `closeAuthModal`
  ahora resetea `_lockAuthControls(false)` para garantizar buttons enabled
  en proximo open.
- `service-worker.js` + `js/cache-manager.js` — version bump

**Como cambiar el Client ID en el futuro**:
Editar 1 linea en `js/firebase-config.js`. Bumpear cache version. Push.
GitHub Actions workflow `generate-vehicles.yml` invalida cache automaticamente.

**Tracking**: https://developers.google.com/identity/gsi/web/guides/overview

### Mejoras post-launch GIS (2026-05-04 — Sesion fix-firestore-user-error-IB1mT)

Tras el rollout inicial de GIS, una sesion de polish fixeo varios bugs
encontrados en uso real. Documentados aqui en orden cronologico de commits.

#### Fix 1 — Watchdog auto-fallback al popup (commit `94ed53d`)

**Sintoma**: Al hacer click en "Continuar con Google" con FedCM blocked,
el watchdog de 8s expiraba pero solo liberaba el lock — el usuario quedaba
trabado sin saber que pasaba. Ningun popup, ningun mensaje, ningun
fallback. La primera version del watchdog era pasiva.

**Fix**:
- Watchdog reducido de 8s → **2.5s** (latencia perceptible mas baja)
- Cuando el watchdog dispara: marca `altorra_gis_blocked`, libera lock,
  **abre automaticamente el legacy popup**
- Agregado `_legacyPopupInFlight` flag para race guard:
  ```js
  var _legacyPopupInFlight = false;

  // En _gisSignIn watchdog:
  watchdogTimer = setTimeout(function () {
      _markGisBlocked();
      _legacyPopupInFlight = true;  // KEY: previene double sign-in
      _legacyPopupSignIn();
  }, 2500);

  // En credential callback:
  if (_legacyPopupInFlight) return; // ignore late GIS callback
  ```

**Resultado**: User click "Google" → 2.5s max → si FedCM blocked, popup
se abre automaticamente. Usuario nunca queda trabado.

#### Fix 2 — Eliminar ruido FedCM en One Tap (commit `8f62cbf`)

**Sintoma**: Cada page load con FedCM blocked generaba 4+ errores rojos
en consola del prompt() de One Tap fallando silenciosamente. El boton
de Google tambien re-intentaba GIS aunque ya supieramos que estaba blocked.

**Fix**:
- `_maybeShowOneTap()` ahora chequea `_isGisBlocked()` antes de llamar
  `prompt()`. Si esta blocked, skip total — no se ejecuta GIS en el page load.
- Mini-watchdog **dentro de One Tap**: 2.5s despues de `prompt()`,
  si no llego credential callback Y el user sigue siendo guest →
  marca `altorra_gis_blocked`. Asi UN solo fallo bastara para que el
  proximo load skip GIS completamente.
- Boton "Continuar con Google" tambien chequea `_isGisBlocked()` →
  va directo a legacy popup sin perder tiempo (0ms delay).

**Resultado**: Despues del primer fallo de FedCM, los proximos loads
son silenciosos en consola y el login es instantaneo via popup.

#### Fix 3 — `vehicleDB is not defined` ReferenceError (commit `8f62cbf`)

**Sintoma**: En consola aparecia rojo:
```
ReferenceError: vehicleDB is not defined
  at featured-week-banner.js:XX
```

**Causa**: P11 de la fase de performance hizo lazy-load de
`featured-week-banner.js` via `requestIdleCallback`. Eso significa que
el script puede ejecutarse ANTES de que `database.js` haya inicializado
`window.vehicleDB`. El codigo viejo usaba `vehicleDB` (bare reference)
en lugar de `window.vehicleDB`, asi que en strict mode tiraba error.

**Fix**:
- Agregado guard al inicio de `featured-week-banner.js`:
  ```js
  if (!window.vehicleDB) {
      var attempts = 0;
      var maxAttempts = 20; // 5 segundos max
      var retryInterval = setInterval(function () {
          attempts++;
          if (window.vehicleDB) {
              clearInterval(retryInterval);
              initBanner();
          } else if (attempts >= maxAttempts) {
              clearInterval(retryInterval);
              console.warn('[FW] vehicleDB nunca se cargo');
          }
      }, 250);
      return;
  }
  ```
- Todos los `vehicleDB.X` cambiados a `window.vehicleDB.X` (bare → namespaced)

**Resultado**: Cero ReferenceError. Banner carga cuando vehicleDB
este listo, con timeout de 5s para no quedar colgado.

#### Fix 4 — Recovery rapido del FedCM blocked flag (commit `ef533b4`)

**Sintoma**: Tras resetear permisos de Chrome (settings → site permissions
→ reset), One Tap no volvia a aparecer ni el GIS sign-in. El flag
`altorra_gis_blocked` tenia TTL de 7 dias, asi que esperaba demasiado
para reintentar.

**Fix**:
- TTL de `GIS_BLOCKED_TTL` reducido de **7 dias → 1 dia → 6 horas**
  (iteraciones progresivas hasta encontrar el sweet spot)
- 6h es suficiente para evitar spam de FedCM noise pero corto enough
  para recovery cuando el user resetea permisos
- Eliminada la escritura incondicional de `altorra_onetap_dismiss`
  despues de `prompt()` — antes se marcaba dismissed aunque el prompt
  fallara silenciosamente

**Resultado**: User resetea permisos → en max 6h One Tap vuelve.
O puede forzar via `AltorraAuth.resetGisState()` (helper diagnostico).

#### Fix 5 — Silenciar logs de comportamiento esperado (commit `95d62df`)

**Sintoma**: Console llena de `console.info` describiendo cada paso del
flow GIS → fallback → popup. Aunque era diagnostico util, agregaba
ruido innecesario en uso normal.

**Fix**: Eliminados 4 logs `console.info` que describian transiciones
esperadas (GIS skipped, FedCM blocked → falling back, etc.). Mantenidos
los `console.warn` para errores reales (`Init failed, falling back`).

**Resultado**: Consola limpia en flujos normales. Solo aparecen logs
cuando hay un error genuino que requiere atencion.

#### Fix 6 — `AltorraAuth.resetGisState()` helper diagnostico (commit `95d62df`)

**Caso de uso**: User reporta que One Tap no aparece o GIS no funciona.
Necesitas un helper rapido para limpiar todos los flags de localStorage
relacionados con GIS sin tener que ir manualmente al DevTools.

**Implementacion**:
```js
window.AltorraAuth.resetGisState = function () {
    try {
        localStorage.removeItem('altorra_gis_blocked');
        localStorage.removeItem('altorra_onetap_dismiss');
        console.info('[Auth] GIS state cleared. Reloading...');
    } catch (e) {}
    window.location.reload();
};
```

**Uso**: User abre DevTools → Console → ejecuta `AltorraAuth.resetGisState()`
→ pagina recarga → estado limpio.

#### Fix 7 — GSI_LOGGER deprecation warning (commit `319081c`)

**Sintoma**: Chrome console mostraba warning:
```
[GSI_LOGGER]: NotificationGetMomentReason methods are deprecated
```

**Causa**: Google deprecio los metodos `notification.isNotDisplayed()`,
`isSkippedMoment()`, `isDismissedMoment()` bajo la migracion a FedCM.
Nuestro codigo viejo pasaba un callback a `prompt()` que usaba estos
metodos para detectar dismissals.

**Fix**: Removido el callback parameter de `prompt()` por completo.
Ahora confiamos solo en:
1. **Credential callback** para sign-in success (cancela watchdog)
2. **Watchdog 2.5s** para silent failure (FedCM blocked, no session)

```js
// ANTES (deprecated):
window.google.accounts.id.prompt(function (notification) {
    if (notification.isNotDisplayed()) { ... }
    if (notification.isSkippedMoment()) { ... }
});

// DESPUES (FedCM-compliant):
window.google.accounts.id.prompt();  // sin callback
// La deteccion de fallo es via watchdog
```

**Trade-off**: Ya no podemos distinguir entre "user dismissed" vs
"FedCM blocked" vs "no Google session". Pero el resultado practico es
el mismo: si pasaron 2.5s sin credential, hacemos fallback.

**One Tap dismissal**: Como ya no podemos detectar dismiss explicito,
suprimimos One Tap por 7 dias despues de mostrarlo (asumimos que el
user lo vio). Si hizo sign-in exitoso, `auth-hint=authenticated` skip
de todas formas.

#### Fix 8 — AudioContext autoplay warning (commit `319081c`)

**Sintoma**: Chrome console mostraba warning amarillo:
```
The AudioContext was not allowed to start. It must be resumed (or created)
after a user gesture on the page.
```

**Causa**: Chrome (y otros navegadores) bloquean `AudioContext` hasta
que haya un primer gesto del usuario (click, keydown, touchstart).
Nuestro sistema de notificaciones (toasts.js) intentaba reproducir
sonidos al cargar la pagina si habia notificaciones programaticas:
- Toast de "Bienvenido" tras login automatico
- Toast de "Nueva version disponible" tras SW_UPDATED
- Otros toasts disparados antes de la primera interaccion

**Fix**: Gated AudioContext creation behind first user gesture:

```js
// En toast.js (notification system):
var _userGestureSeen = false;
var _gestureEvents = ['pointerdown', 'keydown', 'touchstart'];
var _gestureHandler = function () {
    _userGestureSeen = true;
    _gestureEvents.forEach(function (ev) {
        document.removeEventListener(ev, _gestureHandler, true);
    });
};
_gestureEvents.forEach(function (ev) {
    document.addEventListener(ev, _gestureHandler, true);
});

function playSound(type) {
    if (!_userGestureSeen) return;  // silently drop
    // ... AudioContext logic ...
}
```

**Resultado**: Sonidos pre-interaccion se silencian (drop silencioso, sin
warning). Despues del primer gesto, todos los sonidos siguientes funcionan
normal.

**Trade-off aceptado**: User no escucha el sonido del toast de bienvenida
al cargar la pagina si nunca interactuo. Pero esto es comportamiento
esperado del browser y elimina warnings de consola.

### Resumen estado final consola post-fixes (2026-05-04)

Despues de todos estos fixes, la consola en uso normal solo muestra:

| Mensaje | Tipo | Accion |
|---------|------|--------|
| `[DB] Real-time listeners started/stopped` | INFO verde | Diagnostico util, mantener |
| `[DB] Firestore loaded: N vehicles, N brands` | INFO verde | Diagnostico util, mantener |
| `Firebase deferred SDKs loaded` | INFO verde | Diagnostico util, mantener |
| `Cross-Origin-Opener-Policy policy would block...` | ERROR rojo | **Solo via custom domain + Cloudflare** (ver Seccion 18) |
| `enableMultiTabIndexedDbPersistence is deprecated` | WARNING amarillo | **Solo via SDK modular migration** (refactor masivo, no prioritario) |

Cero `vehicleDB is not defined`. Cero `GSI_LOGGER deprecated`. Cero
`AudioContext was not allowed`. Cero `permission-denied` espurios.
Cero notificaciones silenciadas. Cero toasts apilados en favoritos.

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
| **Fix GIS double-init + FedCM blocked fallback** | js/auth.js | (1) `_ensureGisInit(callback)` singleton — `initialize()` se llama UNA vez por sesion, callback indirecto permite swap entre One Tap y sign-in explicito. Elimina warning `google.accounts.id.initialize() is called multiple times`. (2) Watchdog timer 2s en `_gisSignIn()` — si GIS prompt no resuelve (FedCM blocked, silent failure), libera lock + fallback a legacy popup automaticamente. Previene boton spinner stuck forever. (3) Todos los paths de `prompt()` notification (isNotDisplayed, isSkippedMoment, isDismissedMoment) ahora liberan lock y hacen fallback consistente. (4) Smart FedCM block detection: `localStorage.altorra_gis_blocked` (7d TTL) recuerda si GIS fallo — en visitas siguientes, skip GIS y va directo a legacy popup (0ms delay). Sign-in exitoso con GIS limpia el flag |

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

## 13.bis Sistema de Notificaciones v2 — Smart Notifications (Plan A-G, 2026-05-04)

> Refactor del centro de notificaciones para que tenga **valor real** en
> lugar de ser un log de feedback. Inspirado en Apple Notification
> Center, GitHub inbox, Slack, Linear, Stripe Dashboard.
>
> Ultima actualizacion: 2026-05-04

### Problema diagnosticado

El sistema N1-N7 captura **toda** llamada `notify.*` en el bell. Resultado: el centro se llena de:
- "¡Hola de nuevo, Daniel!" (login)
- "Sesion cerrada correctamente" (logout)
- "Cargando..." (loading hints)
- "Conexion restablecida" / "Sin conexion"
- "Sesion iniciada en otra pestaña"
- Confirmaciones de save/toggle/dismiss
- Errores de validacion triviales

Eso es **anti-patron**. El bell debe ser para **eventos asincronos que el usuario quiere revisar despues**, no para feedback de su accion inmediata.

### Distincion correcta (industry standard)

| Toast efimero (NO persiste en bell) | Notification Center (SI persiste) |
|---|---|
| Login/logout feedback | Cambio de estado en una solicitud |
| "Guardado correctamente" | Alerta de baja de precio |
| "Item agregado a favoritos" | Cita confirmada/cancelada por admin |
| Errores de validacion | Respuesta del admin a una consulta |
| "Cargando..." | Vehiculo favorito reservado/vendido |
| Cross-tab sync info | Nueva version del sitio |

### Plan en 7 pilares, 18+ microfases (commit por fase)

| Pilar | Que resuelve | Microfases |
|---|---|---|
| **A — Cimientos** | Sistema base, opt-in, taxonomia, sync multi-device | A1, A2, A3, A4 |
| **B — Favoritos watchlist** | Diff de precios/estado en favoritos | B1, B2, B3, B4, B5 |
| **C — Busquedas guardadas** | Price alerts + match alerts en bell | C1, C2, C3 |
| **D — Solicitudes & citas** | Realtime status updates en bell | D1, D2, D3 |
| **E — Vistos recientemente** | Diff de cambios desde ultima visita | E1, E2, E3 |
| **F — Admin notifications** | Realtime de nuevas solicitudes/leads/security | F1, F2, F3 |
| **G — Push web + polish** | Migration, push API, granular prefs | G1, G2, G3, G4 |

### Anti-patrones que el plan previene

| Riesgo | Mitigacion |
|---|---|
| Recursion infinita: notify wrapeado vuelve a llamarse | Flag `_skipPersist` en finally |
| `vehicleDB` no listo en first load → diff erroneo | Esperar `vehicleDB.loaded === true` antes de baseline |
| Diff dispara N notificaciones en bulk update | Coalesce: >3 cambios → "5 favoritos cambiaron" agrupado |
| Listener Firestore corre 24/7 → costo | onSnapshot solo con `document.visibilitychange` activo |
| Cross-tab dup (3 tabs = 3 notifs) | BroadcastChannel para coordinar lectura |
| Bell crece infinitamente | MAX 50 + TTL 30 dias + cleanup al cargar |
| Snapshot diff falso positivo en first-load tras logout | Versioning + reset al cambiar uid |
| Toasts apilados al mostrar 5 cambios juntos | Reuse anti-stacking pattern de favoritos |
| Push spam en background | Server throttle 1/hora/user con priority gating |
| Migration borra entradas legitimas | Whitelist conservadora de titulos transitorios |
| Rules: usuario lee notifs ajenas | `match /clientes/{uid}/notifications/{nid} { allow: auth.uid == uid }` |

### Microfase A1 — Inversion del default a opt-in ✓ COMPLETADA (2026-05-04)

**Problema**: `wrapNotify()` en `js/toast.js` (linea 542 pre-fix) auto-persistia **toda** llamada a `notify.*` en el bell. La opt-out (`logHistory: false`) existia pero no se usaba en ningun callsite. Resultado: spam.

**Fix aplicado** (`js/toast.js`):

1. **Default invertido**: el wrapper ya NO persiste por defecto. Solo persiste si el caller opta in explicitamente:
   ```js
   notify.success({ category: 'price_alert', ... })   // → persiste
   notify.success({ persist: true, ... })             // → persiste (legacy)
   notify.success('Guardado correctamente')           // → NO persiste
   ```

2. **Helper `shouldPersist(cfg)`** decide por:
   - Opt-out explicito (`persist:false` o `logHistory:false`) gana
   - Opt-in explicito (`persist:true` o `logHistory:true`)
   - Categoria persistible (whitelist en `PERSIST_CATEGORIES`)
   - Default: NO persiste

3. **Categorias persistibles definidas** (`PERSIST_CATEGORIES`):
   - `price_alert` — Cambios en precio de favoritos / busquedas
   - `request_update` — Cambios de estado en una solicitud
   - `appointment_update` — Cambios de estado en una cita
   - `search_match` — Vehiculos nuevos que matchean busqueda guardada
   - `inventory_change` — Vehiculo favorito reservado/vendido
   - `system` — Avisos de sistema (nueva version)
   - `security` — Logins desde nuevo dispositivo, cuenta bloqueada

4. **Schema extendido en `add()`**: nuevos campos `category`, `priority`, `entityRef`, `actionLabel`. Entradas viejas siguen renderizando (campos opcionales).

5. **Dedup window**: skip si entrada identica (mismo type+title+message) dentro de los ultimos 10s. Evita acumulacion en bursts.

6. **TTL 30 dias** en `load()`: cleanup automatico de entradas viejas al cargar el modulo.

7. **MAX_ENTRIES 20 → 50**: el bell ahora puede contener mas eventos legitimos (bell era pequeño porque se llenaba de basura — al limpiar el ruido podemos guardar mas señal).

8. **Quota safety en `save()`**: si localStorage esta lleno, evict half + retry una vez. Antes fallaba silenciosamente y se perdia todo.

**Compatibilidad hacia atras**:
- Los 212 callsites de `notify.*` y `window.toast.*` siguen funcionando como toast efimero
- Ningun callsite necesita modificacion para que dejen de spammear el bell
- `logHistory: false` (opt-out viejo) sigue siendo respetado
- `logHistory: true` (opt-in legacy) tambien sigue funcionando

**Resultado inmediato**:
- Bell deja de capturar login/logout/save/validation/loading
- Entradas viejas siguen alli hasta que el usuario las borre o expiren por TTL
- Prepara terreno para A2-A4 que agregan eventos legitimos

**Archivos modificados**: `js/toast.js`, `service-worker.js`, `js/cache-manager.js`

### Microfase A2 — API explicita `notifyCenter.notify(category, payload)` ✓ COMPLETADA (2026-05-04)

**Problema**: Despues de A1, los callsites que **si** quieren persistir un evento legitimo tienen que armar manualmente el `cfg` con icono, prioridad, sonido, dedup. Boilerplate repetido y error-prone.

**Fix aplicado** (`js/toast.js`):

1. **`CATEGORY_DEFAULTS` map**: defaults por categoria (icon, type, priority, soundType, defaultTitle, dedupMs):

   | Categoria | Icon | Type | Priority | Dedup window |
   |---|---|---|---|---|
   | `price_alert` | `trending-down` | success | normal | 6h por (category, entityRef) |
   | `request_update` | `message-square-text` | info | high | 30s burst |
   | `appointment_update` | `calendar-check-2` | info | high | 30s |
   | `search_match` | `search-check` | success | normal | 24h max diario |
   | `inventory_change` | `package` | warning | normal | 1h por vehiculo |
   | `system` | `bell-ring` | info | low | 5m |
   | `security` | `shield-alert` | warning | critical | 0 (nunca dedup) |

2. **API publica `notifyCenter.notify(category, payload)`**:
   ```js
   notifyCenter.notify('price_alert', {
       title: 'Bajo el precio del Chevrolet Equinox',
       message: 'De $80M a $76M (-5%)',
       link: 'vehiculos/chevrolet-equinox-2018-1.html',
       entityRef: 'vehicle:abc123',
       suppressToast: false           // optional
   });
   ```
   - Aplica defaults de la categoria automaticamente
   - Dedup entity-keyed con `isDuplicateForEntity(category, entityRef, windowMs)`
   - Si `document.hidden === true` Y `suppressIfHidden !== false`: solo escribe al bell (no toast distrae al volver al tab)
   - Si categoria desconocida: degrade gracefully a `notify.info()` sin persistir

3. **Helpers expuestos**:
   - `notifyCenter.getCategoryMeta(category)` — lee defaults
   - `notifyCenter.categories` — lista de categorias persistibles

4. **Behavior con tabs background**: si el tab no es visible al momento de emitir, suprime el toast pero igual escribe al bell. Usuario regresa al tab, ve el badge.

**Patron de uso futuro** (ejemplos para fases B, C, D):

```js
// Fase B3 — favorito bajo de precio
notifyCenter.notify('price_alert', {
    title: 'Bajo el precio del ' + marca + ' ' + modelo,
    message: '$' + oldPrice + ' → $' + newPrice + ' (-' + pct + '%)',
    link: '/vehiculos/' + slug + '.html',
    entityRef: 'vehicle:' + id
});

// Fase D2 — solicitud cambio estado
notifyCenter.notify('request_update', {
    title: 'Tu solicitud fue ' + (newEstado === 'contactado' ? 'recibida por un asesor' : newEstado),
    message: vehiculoTexto,
    link: '/perfil.html#mis-solicitudes',
    entityRef: 'solicitud:' + id
});

// Fase F1 — admin: nueva solicitud entrante
notifyCenter.notify('request_update', {
    title: 'Nueva solicitud',
    message: 'De ' + nombre + ' por ' + vehiculo,
    link: 'admin.html#solicitudes',
    entityRef: 'solicitud:' + id,
    priority: 'high'
});
```

**Archivos modificados**: `js/toast.js`

### Microfase G1 — Migracion de spam legacy del bell ✓ COMPLETADA (2026-05-04)

**Problema**: A1 detiene el spam **futuro**, pero los usuarios actuales tienen ya el bell lleno de notificaciones viejas tipo "¡Hola de nuevo, Daniel!", "Sesion cerrada correctamente", etc. Sin migration, A1 no se siente.

**Estrategia conservadora** (NO destructiva):

1. **Identificar entradas legacy** (sin campo `category` — anteriores a A2)
2. **Drop por whitelist de patrones transitorios**: titulos/mensajes que matchean regex de feedback efimero conocido (login/logout/welcome/reconnect/loading/etc.)
3. **Marcar el resto como leidas** (clear el badge sin destruir contenido)
4. **One-shot**: gateado por `localStorage.altorra_notif_migration_v1`. Solo corre una vez por dispositivo.

**Patrones drop** (`TRANSIENT_TITLE_PATTERNS` + `TRANSIENT_MESSAGE_PATTERNS`):
- "Hola de nuevo *" / "Bienvenid*"
- "Sesion cerrada *" / "Sesion iniciada *"
- "Conexion restablecida" / "Sin conexion *"
- "Cargando *" / "Guardad*"
- "Listo" / "Error" / "Informacion" / "Atencion" (titulos default cuando faltaba title custom)
- "Cuenta creada *" / "Tu cuenta con Google esta lista"

**Conservadurismo**: las regex matchean **inicio de string** con `^`, evitando falsos positivos en mensajes que casualmente contengan estas palabras a mitad.

**Console feedback**: si scrubbed o marked >0, log `[NotifyCenter] Migration v1: scrubbed N transient, marked M as read` (info, no warn) para diagnostico.

**Resultado para el usuario**:
- Al primer page load post-deploy, el bell se limpia: spam viejo desaparece, lo demas pasa a leido (badge a 0)
- Pre-A2 entries que no son spam (raro) se preservan pero ya no contribuyen al unread count
- A partir de ahi, solo entran al bell los eventos opt-in (price_alert, request_update, etc.)

**Archivos modificados**: `js/toast.js`, `service-worker.js`, `js/cache-manager.js`

### Microfase A3 — UI category-aware en el bell ✓ COMPLETADA (2026-05-04)

**Problema**: Tras A2, el bell renderiza la `category` correctamente en data atributos, pero la UI no la diferenciaba visualmente. Todos los items se veian iguales.

**Fix aplicado**:

1. **Icono por categoria** (`iconForEntry(e)` en `js/toast.js`):
   - Si la entrada tiene `category`, usa el `icon` de `CATEGORY_DEFAULTS`
   - Si no, fallback al icono por type (success/error/info/warning)
   - Resultado: una alerta de precio se ve distinta de un cambio de cita en el mismo bell

2. **Label pill bajo el titulo** (`CATEGORY_LABELS` map):
   - Precio | Solicitud | Cita | Busqueda | Inventario | Sistema | Seguridad
   - Pill dorado por defecto, accent verde para `price_alert`, ambar para `inventory_change`, rojo para `security`
   - Pegado a la fecha en una nueva fila `.altorra-notify-center__item-meta` con `gap: 8px`

3. **`.altorra-notify-center__item--linkable`**:
   - Items con `link` reciben hover dorado mas marcado (cursor + titulo en color)
   - Indica visualmente que el click navega
   - Click en item linkable cierra panel **antes** de navegar (transicion limpia)
   - Click en boton remove tiene `stopPropagation` para no disparar la navegacion

4. **Empty state mejorado**: en lugar de "No tienes notificaciones" generico, ahora dice "Aqui veras alertas de precio en tus favoritos, cambios en tus solicitudes y citas, y matches en tus busquedas guardadas." — orienta al usuario sobre que esperar.

5. **`requestAnimationFrame`** antes del `window.location.href`: el panel cierra primero, luego un frame despues navega. Sin esto, la navegacion era instantanea y el panel quedaba "saltando" en la transicion.

**Archivos modificados**: `js/toast.js`, `css/toast-notifications.css`, `service-worker.js`, `js/cache-manager.js`

### Microfase B1+B2 — Favorites watcher (snapshot + diff engine) ✓ COMPLETADA (2026-05-04)

**Objetivo**: Detectar cambios en los vehiculos favoritos del usuario (precio sube/baja, cambio de estado, eliminacion del inventario) sin emitir notificaciones todavia. Esto sienta la base para B3 que las rutea al bell.

**Arquitectura**: nuevo modulo `js/favorites-watcher.js` (singleton `window.AltorraFavWatcher`) — separado de `favorites-manager.js` para mantener responsabilidades claras:

| Modulo | Responsabilidad |
|---|---|
| `favorites-manager.js` | CRUD del array de IDs favoritos, sync Firestore, UI corazones |
| `favorites-watcher.js` | Snapshot del estado de cada favorito + diff vs vehicleDB live |

**Storage**:
- `localStorage.altorra_fav_snapshots_<uid>` = `{vehicleId: {precio, precioOferta, estado, capturedAt}}`
- Por uid (no se mezclan datos entre usuarios)
- Solo persiste para usuarios registrados (anonimos skip)

**Lifecycle**:
1. Al montar: lee snapshots persistidos del uid actual
2. Eventos `'cached'` o `'synced'` de favorites-manager + `vehicleDB.loaded === true` → arma snapshot fresco y compara
3. `vehicleDB.onChange('vehicles')` → re-corre diff
4. `'added'` (favorito nuevo) → captura baseline silencioso, sin diff
5. `'removed'` → borra snapshot del id
6. `'cleared'` → borra todos los snapshots del uid

**Diff rules** (`diffOne(oldSnap, newSnap, vehicleData)`):
- **Sin baseline** → no emite (primer encuentro = solo baseline)
- **Vehiculo desaparece del inventario** Y no estaba en `vendido` → `inventory_removed`
- **Cambio de estado** (gana sobre cambio de precio) → `status_change`
- **Cambio de precio efectivo ≥1%** (oferta gana sobre precio regular) → `price_drop` o `price_increase` con `pctChange`

**Anti-patrones prevenidos**:

| Riesgo | Mitigacion |
|---|---|
| First load → emite N alertas falsas | `firstRunDone` flag: primera pasada solo establece baseline |
| Bulk admin update → spam de N notificaciones | `COALESCE_MIN_DIFFS = 4`: si ≥4 diffs, emite un solo evento `bulk` con array adentro |
| Anonymous user persiste snapshots ajenos | Guard `_state.anonymous`: skip persistence + skip diff |
| Vehicle missing in one tick reaparece despues | Solo emite si baseline tenia el vehiculo Y nuevo NO lo tiene |
| Listener loop (notify wraps watcher emisiones) | Watcher publica via `notifyCenter.notify` (B3), no `notify.*` directo |
| Race entre cached + synced events disparando 2x diff | `DIFF_DEBOUNCE_MS = 350`: coalesce events que llegan en rafaga |
| Mutacion durante diff | Diff es funcional puro: lee `_state.snapshots`, escribe `fresh` nuevo objeto, swap atomico |
| `vehicleDB` aun no listo | `_state.ready` solo true cuando `vehicleDB.loaded === true` |
| Cambio de uid mid-flight | `refreshUid()` resetea snapshots cuando detecta uid nuevo |

**API publica** (`window.AltorraFavWatcher`):
- `onDiffs(fn)` — subscribe a eventos diff (B3 lo usa)
- `runDiff()` — fuerza diff manual (debug)
- `getSnapshot(id)` — lee snapshot actual de un vehiculo
- `getAllSnapshots()` — lee todos
- `diffSinceLastVisit(id)` — para B4 (badges en cards)
- `_setDebug(true)` — log verbose en consola

**Inyeccion en HTML** (Phase B1 ship): script tag `<script src="js/favorites-watcher.js" defer></script>` agregado despues de `favorites-manager.js` en:
- Paginas raiz: index, busqueda, favoritos, perfil, comparar, marca, marcas, vehiculos-{suv,sedan,pickup,hatchback}, detalle-vehiculo
- Generadas: 25 paginas en `/vehiculos/*.html`, 18 paginas en `/marcas/*.html`
- Las generadas usan `<base href="/">` por lo que la ruta es `js/favorites-watcher.js` (no `../js/`)

**Visible al usuario en B1+B2**: nada todavia (silent). El modulo solo registra los snapshots y construye los diffs en `_diffListeners`. **Phase B3** los conecta a `notifyCenter.notify('price_alert' | 'inventory_change')`.

**Verificacion en consola** (DevTools):
```js
AltorraFavWatcher._setDebug(true);
AltorraFavWatcher.runDiff();
// → '[FavWatcher] No diffs detected on manual'
```

**Archivos creados**: `js/favorites-watcher.js`
**Archivos modificados**: 12 HTMLs raiz + 25 paginas vehiculos + 18 paginas marcas + `service-worker.js` + `js/cache-manager.js`

### Microfase B3 — Emision al bell ✓ COMPLETADA (2026-05-04)

**Objetivo**: conectar el diff engine de B2 al `notifyCenter.notify()`. El usuario por fin **ve** las alertas que B2 detecta.

**Funcion `defaultEmitter(diffs)`** registrada via `onDiffs(defaultEmitter)` al final de `favorites-watcher.js`. Mapea cada tipo de diff a un payload listo para `notifyCenter.notify(category, payload)`.

**Mapping diff → notificacion**:

| Diff | Categoria | Tipo visual | Mensaje ejemplo |
|---|---|---|---|
| `price_drop` | `price_alert` | success | "Bajo el precio: Chevrolet Equinox 2018" — "$80M → $76M (-5%, ahorras $4M)" |
| `price_increase` | `price_alert` | success (icon trending-down) | "Subio el precio: ..." — "$76M → $80M (+5%)" |
| `status_change` → reservado | `inventory_change` | warning | "Chevrolet Equinox ahora esta reservado" — "Alguien lo reservo. Si te interesa, contactanos pronto." |
| `status_change` → vendido | `inventory_change` | warning | "Chevrolet Equinox ahora esta vendido" — "Este vehiculo ya fue vendido." |
| `inventory_removed` | `inventory_change` | warning | "Chevrolet Equinox ya no esta en inventario" — link a `favoritos.html` |
| `bulk` (≥4 diffs) | `inventory_change` | warning | "5 cambios en tus favoritos" — link a `favoritos.html` |

**Helpers internos**:
- `vehicleTitle(v)` — arma "Marca Modelo Año" defensivamente
- `vehicleUrl(v)` — usa `window.getVehicleDetailUrl(v)` o `getVehicleSlug(v)` con fallbacks
- `fmtPrice(n)` — Intl.NumberFormat es-CO COP, $ ej. "$80.000.000"
- `STATUS_LABEL` — "disponible" → "Disponible", etc.

**Comportamiento dedup** (heredado de A2):
- `entityRef: 'vehicle:' + d.vehicleId` → max 1 alerta de precio por vehiculo cada 6h
- inventory_change: max 1 por vehiculo cada 1h
- bulk usa `'fav-bulk:' + Date.now()` para que no se dedupe (cada bulk es unico)

**Comportamiento background** (heredado de A2):
- Si `document.hidden`, suprime el toast pero igual escribe al bell
- Usuario regresa al tab → ve el badge dorado del bell

**Toggle futuro G2** placeholder: linea comentada `if (localStorage.altorra_notif_bell_disabled === '1') return;` lista para activarse cuando el usuario tenga un switch de preferencia.

**Verificacion E2E**:
1. Loguea como cliente registrado, agrega un vehiculo a favoritos.
2. Admin baja el precio de ese vehiculo.
3. Cliente: en su pagina, llega un toast verde "Bajo el precio: ..." + entrada en el bell con badge dorado "Precio".
4. Click en la entrada → cierra el panel + navega a la ficha del vehiculo.

**Archivos modificados**: `js/favorites-watcher.js`, `service-worker.js`, `js/cache-manager.js`

### Microfase B4 — Badges visuales en `favoritos.html` ✓ COMPLETADA (2026-05-04)

**Objetivo**: Cuando el usuario abre `favoritos.html` despues de que un favorito cambio (precio bajo, fue reservado, etc.), debe verlo INMEDIATAMENTE en la card sin tener que abrir el bell.

**Problema tecnico**: el watcher emite el diff cuando ocurre, pero al volver el usuario al sitio horas despues, los snapshots ya estan actualizados al estado nuevo y `diffSinceLastVisit()` no devolveria nada. Se necesita persistencia separada del diff.

**Solucion**: nuevo store paralelo `_pendingChanges` en el watcher:
- Storage: `localStorage.altorra_fav_pending_<uid>` = `{vehicleId: lightweight diff}`
- Cada vez que `runDiff()` detecta un cambio, ademas de emitir al bell, llama `recordPending(d)` que persiste el diff
- Persiste el `type`, `pctChange`, `oldPrice`, `newPrice`, `oldEstado`, `newEstado`, `recordedAt` (sin `vehicleData` para no inflarse)
- Limpieza: `clearPending(id)` cuando el usuario remueve el favorito o clickea el badge

**API publica nueva** (`window.AltorraFavWatcher`):
- `getPendingChange(id)` — diff persistente para un vehiculo
- `getAllPendingChanges()` — map completo
- `clearPending(id)` — descartar un cambio
- `clearAllPending()` — descartar todos
- `onPendingChanges(fn)` — subscribe a cambios del map

**Decoracion en `favoritos.html`**:

`FavPage.decorateBadges()` corre tras `attachListeners()` (es decir, despues de cualquier render: full, add, remove). Para cada `.vehicle-card[data-id]`:
1. Lee `pending[id]`
2. Quita badge previo si existe (re-decoration safe)
3. Si hay diff, crea `<div class="fav-diff-badge fav-diff-badge--<variant>">` con icono Lucide + label
4. Click en badge → fade-out (clase `--leaving`) + `clearPending(id)` (re-render via listener)

**Variantes visuales**:

| Diff | Badge | Color | Texto |
|---|---|---|---|
| `price_drop` | `--drop` | Verde | "Bajo 5.0%" |
| `price_increase` | `--up` | Ambar | "Subio 3.0%" |
| `status_change` → reservado | `--warn` | Ambar | "Reservado" |
| `status_change` → vendido | `--gone` | Rojo | "Vendido" |
| `status_change` → disponible | `--drop` | Verde | "Disponible" |
| `inventory_removed` | `--gone` | Rojo | "No disponible" |

**Posicion**: top-left de la card (`position: absolute`), `backdrop-filter: blur(10px)`, glow con `box-shadow`. Animacion de entrada `favBadgeIn 0.45s` (translateY+scale). Hover lift sutil.

**Sync con cambios live** (mientras el usuario esta en la pagina):
- `decorateBadges()` se suscribe a `onPendingChanges` del watcher
- Si admin baja el precio mientras el usuario tiene `favoritos.html` abierto → toast llega + badge aparece sobre la card en tiempo real

**Por que click en el badge descarta**: confirma al usuario que vio el cambio. Patron Slack/GitHub: "marcar como visto" via interaccion natural.

**Accesibilidad**:
- `prefers-reduced-motion: reduce` desactiva animacion
- Tooltip `title="Click para descartar este aviso"`
- Contraste AAA en todas las variantes

**Archivos modificados**: `js/favorites-watcher.js`, `favoritos.html`, `service-worker.js`, `js/cache-manager.js`

### Microfase E1+E2+E3 — Vistos recientemente con diff visual y bell selectivo ✓ COMPLETADA (2026-05-04)

**Objetivo**: cuando el usuario revisita un vehiculo que vio antes, mostrar visualmente en la card del homepage si cambio el precio o el estado **desde su ultima visita**. Para cambios significativos, registrar tambien una entrada en el bell.

**E1 — Snapshot at view-time** (`js/historial-visitas.js`):

Schema extendido del item de historial:
```js
{ id: '123', timestamp: 1234, snap: { precio, precioOferta, estado } }
```

`_snapshotFor(vehicleId)` lee `vehicleDB.vehicles` y captura el estado actual al momento de tracking. Si vehicleDB no esta listo aun (lazy load) → `addToHistory(id, null)` y se agenda un retry via `vehicleDB.onChange()`. Cuando llega data, se hace `addToHistory(id, snap)` — preservando timestamp original (no se reordena el item en el historial).

**E2 — Diff badge en `renderHistoryCard(vehicle)`**:

Nuevo helper `diffForVehicle(vehicleId, currentVehicle)` que compara `entry.snap` vs current:
- **Status diff** (gana sobre precio): "Reservado ahora" / "Vendido" / "Volvio disponible"
- **Price diff ≥1%**: "↓ N.N% desde tu visita" / "↑ N.N%"

Badge renderizado dentro de `.history-card-image` con CSS `.rv-diff-badge--{drop|up|warn|gone}`:
- `--drop`: verde, "Bajo X% desde tu visita"
- `--up`: ambar, "↑ X%"
- `--warn`: ambar, "Reservado ahora"
- `--gone`: rojo, "Vendido"

**E3 — Bell entry SOLO para cambios significativos**:

Threshold curado para no inundar:
- **Price drop ≥5%** → `notifyCenter.notify('price_alert', ...)` con mensaje "Lo viste antes a $X, ahora esta a $Y"
- **Status → vendido/reservado** → `notifyCenter.notify('inventory_change', ...)` con mensaje "Un vehiculo que viste fue vendido/reservado"

Resto (price drop <5%, price increase, otros status changes) → solo el badge visual, sin bell entry. Evita la fatiga de notificaciones para cambios menores.

**Dedup heredado de A2**:
- `entityRef: 'rv-vehicle:' + id` → A2 default de 6h por price_alert, 1h por inventory_change
- Aunque el usuario revisite la home 5 veces en una hora, max 1 entry en el bell

**Comparacion con Pillar B**:

| | Pillar B (Favoritos) | Pillar E (Vistos) |
|---|---|---|
| Trigger | Real-time (`vehicleDB.onChange`) | Render-time (cuando renderiza la seccion) |
| Threshold precio | ≥1% | ≥5% (mas estricto, vehiculo solo "visto") |
| Threshold status | Cualquier cambio | Solo vendido/reservado |
| Persistencia diff | `_pendingChanges` map | Implicit en el snap del entry |
| Badge | Top-left card en `favoritos.html` | Top-left card en seccion home |
| Bell | Siempre (con dedup) | Solo significativos |

**Anti-patrones evitados**:
- Snapshot null en first track (vehicleDB no listo) → retry on `onChange`
- Re-track de la misma URL no resetea timestamp si snap viene tarde
- Notificaciones spam de "viste un vehiculo y bajo $1000" → threshold 5%
- Repeat visit emite duplicate entries → dedup via entityRef

**Archivos modificados**: `js/historial-visitas.js`, `css/historial-visitas.css`, `service-worker.js`, `js/cache-manager.js`

### Microfase D — Listener realtime de solicitudes/citas ✓ COMPLETADA (2026-05-04)

**Objetivo**: cuando un admin cambia el estado de una solicitud o cita del usuario (pendiente → contactado, confirmada, rechazada, etc.), el cliente recibe la notificacion **en tiempo real** mientras esta en el sitio + entrada persistente en el bell.

**Arquitectura**: nuevo modulo `js/solicitudes-watcher.js` (singleton `window.AltorraSolWatcher`) cargado lazy desde `components.js` despues de auth.js.

**Listener**:
```js
db.collection('solicitudes')
  .where('email', '==', user.email)
  .onSnapshot(processSnapshot, errCallback)
```

Solo para usuarios registrados con email. Anonimos skip silencioso.

**Estado y baseline**:
- Storage: `localStorage.altorra_sol_baseline_<uid>` = `{solicitudId: {estado, observacionesHash, requiereCita}}`
- `observacionesHash` es un hash corto del campo `observaciones` para detectar cambios sin guardar el texto completo
- Primera carga: si NO hay baseline en localStorage → primera snapshot solo establece baseline (no emite). Si SI hay baseline (returning user) → primera snapshot diff contra el saved → emite cambios que ocurrieron mientras el usuario estaba offline

**Detecciones**:
- `prev.estado !== snap.estado` → emite `request_update` o `appointment_update` (segun `requiereCita`)
- `prev.observacionesHash !== snap.observacionesHash` con misma `estado` → "Tienes una respuesta del admin" (snippet del primer 140 chars)

**Diferenciacion solicitud vs cita** (`requiereCita: true`):
- Solicitud: `category: 'request_update'`, link `perfil.html#mis-solicitudes`, mensajes "Un asesor recibio tu solicitud", "Solicitud completada"
- Cita: `category: 'appointment_update'`, link `perfil.html#mis-citas`, mensajes "Te esperamos en la fecha acordada", "Se cambio la fecha"

**Anti-patrones evitados**:

| Riesgo | Mitigacion |
|---|---|
| Initial snapshot inunda bell con N entradas | `firstSnapshot` flag: solo baseline en primera pasada (sin baseline previa) |
| Listener corre 24/7 → costo Firestore | `visibilitychange`: pause cuando `document.hidden`, resume on visible |
| Permission-denied al hacer logout cross-tab | Error callback chequea `auth.currentUser`, suprime errores esperados |
| Race con cambios de auth state | uid guard rechaza callbacks tardios + `stop()` antes de re-`start()` |
| Anonymous usuarios persisten baseline ajeno | `start()` retorna false si `user.isAnonymous` o sin email |
| Doc creado mientras user offline emite "creado" | Lo skip — el email del admin (Cloud Function `onNewSolicitud`) ya cubre eso |
| Multiples tabs abiertas duplican notificaciones | Dedup heredado de A2 (entityRef = `solicitud:<id>`) actua entre tabs (mismo localStorage del bell) |

**Wire en `auth.js`**:
- En `onAuthStateChanged(user)`: `AltorraSolWatcher.start(user)` para registrados, `stop()` para anonimos
- En `_processNullState()`: `stop()` antes de signOut path

**Wire en `components.js`**:
- `loadAuthSystem()` agrega `<script src="js/solicitudes-watcher.js" defer>` despues de `auth.js`
- Carga lazy: solo paginas que cargan auth lo cargan

**Verificacion E2E**:
1. Cliente envia solicitud (estado=pendiente)
2. Admin desde panel cambia estado a "contactado"
3. Cliente: toast info "Tu solicitud esta recibida por un asesor — Chevrolet Equinox 2018 — Un asesor recibio tu solicitud y te contactara pronto." + entry en bell con badge "Solicitud"
4. Admin agrega `observaciones: "Te llamare manana 10am"`
5. Cliente: nuevo toast "Tienes una respuesta en tu solicitud — Te llamare manana 10am" + nueva entry en bell
6. Click → cierra panel + navega a `perfil.html#mis-solicitudes`

**Archivos creados**: `js/solicitudes-watcher.js`
**Archivos modificados**: `js/auth.js`, `js/components.js`, `service-worker.js`, `js/cache-manager.js`

### Microfase F1+F2 — Admin realtime bell para nuevas solicitudes/citas ✓ COMPLETADA (2026-05-04)

**Objetivo**: el admin trabajando en el panel recibe un toast + entry en el bell **inmediatamente** cuando un cliente envia una nueva solicitud o cita, sin tener que recargar la pagina.

**Implementacion** (`js/admin-appointments.js`):

`detectAdminNewSolicitudes(snap)` corre dentro del callback existente de `onSnapshot('solicitudes')`. Usa `snap.docChanges()` (API nativa de Firestore para listar adds/modifies/removes desde la ultima snapshot) para diff eficiente.

**Logica**:
- Primera snapshot → solo establece `_adminSeenIds` baseline (sin emitir)
- Cada `change.type === 'added'` cuyo `id` no este en baseline → si `estado === 'pendiente'`, emite
- Cita (`requiereCita: true`) → `category: 'appointment_update'`, "Nueva cita por agendar"
- Solicitud → `category: 'request_update'`, "Nueva solicitud"
- `priority: 'high'` (admin necesita actuar rapido)
- `link: 'admin.html#solicitudes'`

**Filtros**:
- `AP.currentUserRole === 'viewer'` → skip (no tiene poder de accion)
- Sin AP listo → skip defensivo
- Modificaciones de docs existentes → no notifica (admin ya las hizo o son irrelevantes)

**Dedup**:
- `entityRef: 'admin-solicitud:' + id` o `'admin-cita:' + id`
- Si admin tiene 3 tabs admin abiertas, todas comparten el bell de localStorage → A2 dedup actua → 1 sola entry total

**Comparacion con Pillar D**:

| | Pillar D (cliente) | Pillar F (admin) |
|---|---|---|
| Escucha | `solicitudes where email == user.email` | `solicitudes` (todas, sin filtro) |
| Trigger | Cambio de `estado` u `observaciones` | Doc creado con `estado: pendiente` |
| Priority | normal/high segun tipo | high (admin debe actuar) |
| Link | `perfil.html#mis-solicitudes` | `admin.html#solicitudes` |
| Skip viewer | N/A | si |

**F2 — Sonido y feedback para admin**: ya cubierto automaticamente por A2. La categoria `request_update` mapea a `soundType: 'info'` y `appointment_update` a `'info'`. El sonido se reproduce automaticamente al emitir el toast (gate por user gesture en N2 ya respetado).

**F3 (security events)**: pendiente — requiere instrumentar admin-auth.js para emitir cuando se detecta nuevo dispositivo de confianza, password change, role change. Complejidad media — diferido.

**Archivos modificados**: `js/admin-appointments.js`, `service-worker.js`, `js/cache-manager.js`

### Microfase G2 — Preferencias granulares por categoria ✓ COMPLETADA (2026-05-04)

**Objetivo**: el usuario puede silenciar categorias del bell que no le interesan. Patron Slack/Twitter/GitHub: control granular por tipo.

**UI** (`js/perfil.js` → seccion Preferencias, nueva card "Que tipo de notificaciones quieres recibir"):

6 toggles, uno por categoria persistible:

| Categoria | Icono | Etiqueta | Hint |
|---|---|---|---|
| `price_alert` | `trending-down` | Alertas de precio | "Cambios en el precio de tus favoritos y vehiculos vistos" |
| `request_update` | `message-square-text` | Solicitudes | "Cuando un asesor responde o cambia el estado de una solicitud" |
| `appointment_update` | `calendar-check-2` | Citas | "Confirmacion, reprogramacion o cancelacion de tus citas" |
| `search_match` | `search-check` | Busquedas guardadas | "Vehiculos nuevos que coinciden con tus busquedas" |
| `inventory_change` | `package` | Cambios de inventario | "Tus favoritos cuando son reservados o vendidos" |
| `system` | `bell-ring` | Avisos del sistema | "Nuevas versiones, mantenimiento, cambios importantes" |

**Categoria `security` NO es muteable**: aunque el schema la incluye, el toggle no se renderiza. Las alertas de seguridad son siempre visibles.

**Storage dual**:
1. **Firestore canonical**: `clientes/{uid}.preferencias.notificaciones.categories = {price_alert: bool, ...}`
2. **localStorage hot-path**: `altorra_notif_cat_<category>` = `'0'` | `'1'` — un key por categoria, leido sin JSON parse en el hot-path de `notifyCenter.notify()`

**Sync logico**:
- Al cargar perfil.html, las preferencias se leen de Firestore y se sincronizan a localStorage (asi notifyCenter las honra en cualquier pagina)
- Al togglear, localStorage se actualiza inmediatamente (UI optimistica) + Firestore via `savePref()` debounced
- Al cambiar de dispositivo: el primer load de perfil sincroniza desde Firestore

**Read path en `notifyCenter.notify(category, payload)`**:

```js
function isCategoryEnabled(category) {
    if (category === 'security') return true;       // never mutable
    try {
        var v = localStorage.getItem('altorra_notif_cat_' + category);
        return v !== '0';                            // default: enabled
    } catch (e) { return true; }
}

function emitCategorical(category, payload) {
    if (!CATEGORY_DEFAULTS[category]) return null;   // unknown
    if (!isCategoryEnabled(category)) return null;   // user opted out
    ...
}
```

Cero costo cuando esta enabled (default). Si el user opta out, `notifyCenter.notify()` retorna `null` sin tocar el bell ni mostrar toast.

**Anti-patrones evitados**:

| Riesgo | Mitigacion |
|---|---|
| Hot-path lee Firestore en cada notify | localStorage cache, sync en perfil load |
| Otra tab abierta no respeta el cambio | `storage` event nativo del browser propaga (libre) |
| Default OFF accidental tras refactor | `v !== '0'` permite que claves no-seteadas sigan ON |
| Security mute por error | Hardcoded en `isCategoryEnabled` |
| Nuevo dispositivo sin prefs | Default ON hasta que el user visita perfil |

**Visibilidad para el usuario**:
- Toggle en perfil → cambio inmediato (localStorage)
- En el background, Firestore se actualiza
- Notificacion de la categoria muteada deja de aparecer en bell + toast
- No requiere recargar pagina

**Archivos modificados**: `js/perfil.js`, `js/toast.js`, `service-worker.js`, `js/cache-manager.js`

### Microfase F3 — Admin: dispositivo de confianza nuevo ✓ COMPLETADA (2026-05-04)

**Objetivo**: cuando un admin agrega un nuevo dispositivo de confianza (post-2FA, "Confiar en este dispositivo"), recibe una notificacion de seguridad **critical** con detalles. Si fue una accion legitima, es feedback util. Si no fue el admin (alguien comprometio la cuenta), es alarma temprana.

**Implementacion** (`js/admin-auth.js` `saveDeviceTrust`):

Despues de `update({ trustedDevices: active })`, emite:
```js
notifyCenter.notify('security', {
    title: 'Nuevo dispositivo de confianza',
    message: 'Chrome • Windows — Cartagena, Colombia. Si no fuiste tu, revoca este dispositivo.',
    link: 'admin.html#seguridad',
    entityRef: 'trust:' + token,
    priority: 'critical'
});
```

**Por que `priority: 'critical'`**:
- Categoria `security` mapea a critical en CATEGORY_DEFAULTS
- Toast NO autodismiss — requiere click del admin para descartarlo
- Bell entry persiste hasta que la borra manualmente
- No es muteable (G2 hardcoded `category === 'security' → return true`)

**Datos incluidos**:
- Browser y OS detectados de UA
- Ciudad y pais resueltos via `fetchLocationInfo()` (geo por IP, anonimizada)
- Click → `admin.html#seguridad` para revisar y revocar si fue accion no autorizada

**Eventos NO incluidos en F3** (deferidos por complejidad):
- Auto-unblock (admin no esta logueado al momento del unblock)
- Cambio de rol (requiere onSnapshot en `usuarios/{uid}` desde el cliente)
- Cambio de password (Firebase Auth no expone evento client-side)
- Acceso desde IP nueva sin trust (requiere tracking de IPs vistas)

Estos pueden agregarse incrementalmente. El patron esta probado.

**Archivos modificados**: `js/admin-auth.js`, `service-worker.js`, `js/cache-manager.js`

### Microfase A4 — Sync de bell cross-device via Firestore ✓ COMPLETADA (2026-05-04)

**Objetivo**: el bell ya no es per-device. Si un usuario recibe una alerta de precio en su laptop, al abrir su mobile la ve tambien. Marcar como leido en un dispositivo se refleja en otros.

**Arquitectura**: localStorage es el cache local hot-path; Firestore subcollection `clientes/{uid}/notifications/{nid}` es el store canonical sincronizado. Para anonymous users, todo queda local (no hay uid → no rules match).

**Schema Firestore**: cada doc replica el shape de localStorage:
```
clientes/{uid}/notifications/{nid} = {
    id, type, title, message, link, category, priority, entityRef,
    actionLabel, timestamp, read
}
```

**Reglas Firestore** (`firestore.rules`):
```
match /notifications/{nid} {
    allow read, write, delete: if request.auth != null && request.auth.uid == uid;
}
```

> **DEPLOY MANUAL REQUERIDO**: `firebase deploy --only firestore:rules`. Sin esto, los writes fallan permission-denied y el bell solo sirve como localStorage cache.

**Flujo de escritura**:

| Operacion local | Sync a Firestore |
|---|---|
| `add(entry)` | `set(item)` en subcollection (skip si `fromRemote: true`) |
| `markRead(id)` | `update({read: true})` |
| `markAllRead()` | `update({read: true})` por cada cambiada |
| `remove(id)` | `delete()` |
| `clear()` | `delete()` por cada doc (Firestore no tiene bulk-delete client-side) |

Todos `.catch(function() {})` — best-effort. localStorage es source of truth local.

**Flujo de lectura (`startFirestoreSync(user)`)**:

```js
.collection('clientes').doc(uid).collection('notifications')
.orderBy('timestamp', 'desc')
.limit(MAX_ENTRIES)
.onSnapshot(...)
```

`docChanges()` se procesa:
- `'added'` con id no presente local → `add(d, {fromRemote: true})`
- `'modified'` con `read` diferente → actualiza local sin loop
- `'removed'` → splice local

**Backfill primer snapshot**: en la primera snapshot, los entries SOLO locales (creados antes del sync) se suben a Firestore para que otros dispositivos los vean.

**Anti-patrones evitados**:

| Riesgo | Mitigacion |
|---|---|
| Loop infinito (write → snapshot → write...) | `fromRemote: true` flag + dedup por id antes de unshift |
| Cross-tab duplicates en mismo device | `_entries.find(by id)` antes de unshift (catch tab-stale state) |
| Permission-denied al cerrar sesion | `stopFirestoreSync()` antes de `signOut()` (en `_processNullState`) |
| Anonymous users escriben | `_currentUid()` retorna null si `isAnonymous` |
| Costo Firestore | `.limit(MAX_ENTRIES = 50)` + dedup A1 + opt-out A2 reducen escrituras |
| Conflict en mark-read | Last-write-wins (Firestore default) — aceptable para flag boolean |
| Listener corre tras logout | `stopFirestoreSync()` cancela `unsub()` antes del signOut |

**Wire en `auth.js`**:
- `onAuthStateChanged(user)`: `notifyCenter.startFirestoreSync(user)` para registrados, `stop` para anonymous
- `_processNullState()`: `stopFirestoreSync()` antes de cualquier signOut path

**Limitaciones aceptadas**:
- TTL no se sincroniza: cada device hace su propio cleanup local de entries >30 dias. Eventualmente convergen.
- Migracion G1 no se sincroniza: cada device corre la migracion una sola vez localmente. Despues de ambos devices migrar, el sync es coherente.
- `clear()` con muchas entries hace N delete requests. Solo es un costo en momentos de "limpiar todo" — aceptable.

**Verificacion E2E**:
1. Login en laptop como cliente, abre favoritos
2. Admin baja precio → laptop recibe toast + bell entry
3. Login mismo cliente en mobile (Chrome incognito o navegador distinto)
4. Mobile abre el bell → ve la entry de price_alert recien creada en laptop
5. Mark read en mobile → laptop refresca el badge a 0 sin tocar nada

**Archivos modificados**: `js/toast.js`, `js/auth.js`, `firestore.rules`, `service-worker.js`, `js/cache-manager.js`

---

## 13.quater MEGA-PLAN v4 — Plataforma admin de clase mundial + Concierge Unificado (2026-05-04)

> Refactor total y elevación tecnológica de toda la plataforma de
> administración. Reemplaza tres planes parciales (notificaciones,
> comunicaciones+CRM v2, propuesta v3) con una arquitectura unificada
> en 4 capas y 20 bloques de microfases.
>
> Inspirado en Bitrix24, HubSpot, Salesforce, Intercom, Drift,
> Pipedrive, Meta Business Suite. Cero APIs pagas — todo browser-native
> + Firebase free tier.
>
> Última actualización: 2026-05-04

### Por qué v4 (vs v1/v2/v3)

| Versión | Característica | Falla |
|---|---|---|
| v1 (notificaciones) | Bell sin spam, opt-in, categorías | Solo notificaciones, no toca el resto |
| v2 (comunicaciones+CRM 28 MF shipped) | kind discriminator, kanban, CRM básico, Inbox, automatización | Features aisladas, "básicas", admin se siente disperso |
| v3 (propuesta) | 8 secciones reagrupadas, smart fields, calendario dedicado | Sigue siendo silos visuales — sin capa de inteligencia transversal |
| **v4 (este plan)** | **4 capas: Infra + Inteligencia + Features + Experiencia. Concierge unificado. Event Bus. AI local. Knowledge Graph. Adaptive UI. Predictive analytics. Realtime collab. Voice+Vision.** | **N/A — el plan a ejecutar** |

### Arquitectura de 4 capas

```
┌────────────────────────────────────────────────────────────┐
│  CAPA EXPERIENCIA                                          │
│  L. Voz+Multi-modal  M. Realtime Collab  N. Adaptive UI   │
└────────────────────────────────────────────────────────────┘
        ▲                ▲                ▲
┌────────────────────────────────────────────────────────────┐
│  CAPA FEATURES                                             │
│  C. Inventario  D. Calendario  E. Comms  F. CRM  O. Reports│
└────────────────────────────────────────────────────────────┘
        ▲                ▲                ▲
┌────────────────────────────────────────────────────────────┐
│  CAPA INTELIGENCIA (cross-cutting)                         │
│  I. Event Bus  J. AI Engine  K. Workflows                  │
│  Q. Knowledge Graph  R. Predictive  U. Concierge ⭐⭐⭐    │
└────────────────────────────────────────────────────────────┘
        ▲                ▲                ▲
┌────────────────────────────────────────────────────────────┐
│  CAPA INFRAESTRUCTURA                                      │
│  A. Fixes+Docs  T. Design System  B. Sidebar+Workspaces   │
│  G. Push+PWA  H. Security  P. Perf+A11y                   │
└────────────────────────────────────────────────────────────┘
```

### Política transversal: "los 3 entregables por MF"

Cada microfase shippea **simultáneamente**:

**🎨 Design (D)**: usa tokens del Design System (T), respeta grilla, anima con curva oficial, tiene todos los estados (hover/focus/disabled/loading/empty), modo claro/oscuro, mobile responsive, A11y AAA. Si no respeta el sistema, no se mergea.

**🔄 Migration (M)**: cuando cambia un schema/collection/patrón, incluye script idempotente que detecta docs viejos, los transforma, preserva `legacyXxxx` para auditoría, loguea conteos, es seguro re-correrlo.

**📚 Documentation (Doc)**: pre-brief, during-comments, post-section con archivos modificados + pasos de prueba E2E + notas para futuros devs.

### Stack técnico (todo libre/gratuito)

| Necesidad | Tecnología | Coste |
|---|---|---|
| NLP (sentiment/NER/intent) | Transformers.js + Hugging Face models | $0 |
| Computer vision | TensorFlow.js + MobileNet pre-entrenado | $0 |
| OCR | Tesseract.js | $0 |
| Voz | Web Speech API (browser-native) | $0 |
| Embeddings | Xenova/all-MiniLM-L6-v2 (Transformers.js) | $0 |
| Charts | Chart.js (lazy) | $0 |
| Drag-drop | Sortable.js / nativo HTML5 | $0 |
| Push native | Firebase Cloud Messaging Web | $0 |
| Realtime sync | Firestore onSnapshot | $0 |
| Offline queue | Service Worker + IndexedDB | $0 |
| Encryption | Web Crypto API | $0 |
| Background compute | Web Workers | $0 |
| Knowledge graph viz | Cytoscape.js (lazy) | $0 |

**Costo recurrente: $0**. Solo tiempo de desarrollo.

### Tabla maestra de bloques (20 bloques, 131 microfases, ~12 semanas)

| # | Bloque | MF | Días | Capa | Notas |
|---|---|---|---|---|---|
| A | Fixes urgentes + docs atrasada | 3 | 2 | Infra | Empieza aquí |
| **T** | **Design System global** | **8** | **5** | **Infra** | **Crítico antes de todo lo demás** |
| B | Sidebar + Workspaces | 5 | 3 | Infra | |
| I | Event Bus + Activity Feed | 5 | 4 | Inteligencia | |
| J | AI Engine local (NLP/CV/OCR) | 8 | 6 | Inteligencia | |
| K | Workflows + Smart Fields engine | 6 | 4 | Inteligencia | |
| Q | Knowledge Graph | 4 | 3 | Inteligencia | |
| R | Predictive Analytics | 4 | 3 | Inteligencia | |
| **U** | **Concierge Unificado** | **19** | **12** | **Inteligencia+Features** | **Estrella del plan** |
| C | Inventario inteligente | 8 | 5 | Features | |
| D | Calendario y Disponibilidad | 8 | 5 | Features | |
| E | Comunicaciones unificadas | 12 | 7 | Features | |
| F | CRM 360 evolución | 8 | 5 | Features | |
| O | Reportes + AI insights | 6 | 4 | Features | |
| L | Voz + Multi-modal | 4 | 3 | Experiencia | |
| M | Realtime Collaboration | 5 | 4 | Experiencia | |
| N | Adaptive UI | 4 | 3 | Experiencia | |
| G | Push + Offline-first PWA | 5 | 3 | Infra | |
| H | Security + Audit pro | 5 | 3 | Infra | |
| P | Performance + A11y AAA | 4 | 3 | Infra | |
| **TOTAL** | | **131** | **~85** | | |

### Bloques críticos detallados

#### T — Design System global (8 MF, 5 días)

| MF | Qué hace |
|---|---|
| T.1 | `css/tokens.css` con todas las variables (colores, espacios, tipografía, sombras, radios, transiciones, z-index, breakpoints). Reemplaza ~300 hardcoded values |
| T.2 | Component Library mínima: 12 componentes core (Button, Input, Select, Card, Modal, Tabs, Badge, Avatar, Tooltip, Toast, Toggle, Skeleton) con todos los estados |
| T.3 | Storybook lite en `/admin/_components.html` (super_admin only) |
| T.4 | Modo claro real con CSS vars + toggle + persistencia per usuario + cross-fade |
| T.5 | Animation system: 5 curvas oficiales + duraciones + `prefers-reduced-motion` respetado |
| T.6 | Migración masiva del admin existente a tokens + components |
| T.7 | Iconografía estándar: 100% Lucide (auditoría + cleanup de SVG inline + emojis) |
| T.8 | Modo high-contrast (WCAG AAA) — toggle adicional, ratio mínimo 7:1 |

#### I — Event Bus + Activity Feed (5 MF, 4 días)

| MF | Qué hace |
|---|---|
| I.1 | `window.AltorraEventBus` con emit/on/off/once. Tipos: `vehicle.*`, `comm.*`, `crm.*`, `appointment.*`, `user.*`. Persistencia opcional en `events/` collection |
| I.2 | Activity Feed sidebar global tipo Slack — todo en tiempo real, filtros, periodos |
| I.3 | Reacciones cross-module automáticas: solicitud creada → score recalculado → Inbox notifica → Calendario sugiere → Reportes incrementan KPI |
| I.4 | Macros del Activity Feed: "Repetir esta acción" / "Programar similar" / "Crear regla a partir de esta acción" |
| I.5 | Replay y debugging: super_admin re-juega timeline de un día completo |

#### J — AI Engine local (8 MF, 6 días)

| MF | Qué hace | Tech |
|---|---|---|
| J.1 | Sentiment analysis multilingüe en cada mensaje | Transformers.js distilbert-multilingual |
| J.2 | NER (extrae marca/modelo/año/monto/ciudad/fecha) | Transformers.js NER |
| J.3 | Lead scoring v2 con regresión logística entrenada con datos propios (re-entrena cada semana en background) | TensorFlow.js |
| J.4 | Predicción de no-show para citas (decisión tree sobre histórico) | TF.js DecisionTree |
| J.5 | Anomaly detection sobre KPIs (media móvil + desviación estándar) | Math + Web Worker |
| J.6 | Auto-categorizador de imágenes (sedan/SUV/pickup desde foto) | TF.js MobileNet |
| J.7 | OCR de placas + cédulas client-side | Tesseract.js (5MB lazy) |
| J.8 | Próxima Mejor Acción (NBA) por contacto: score + recencia + intención | Reglas + ML lite |

#### Q — Knowledge Graph (4 MF, 3 días)

| MF | Qué hace |
|---|---|
| Q.1 | Indexador en Web Worker que arma grafo de relaciones implícitas en IndexedDB |
| Q.2 | Vista grafo dentro CRM 360°: ver red del contacto |
| Q.3 | Recomendaciones automáticas: "3 contactos vieron Mazda — acaba de llegar el CX-5 — ¿notificar?" |
| Q.4 | Search semántico: "interesados en SUV menor a $100M" devuelve contactos por historial real |

#### R — Predictive Analytics (4 MF, 3 días)

| MF | Qué hace |
|---|---|
| R.1 | Forecast de ventas con regresión sobre histórico mensual + intervals de confianza |
| R.2 | Hot leads del día: cada mañana top-5 con mayor probabilidad de cierre |
| R.3 | Vehículos al borde: stale detector + sugerencia de acción |
| R.4 | Churn risk: contactos hot que bajaron a frío — sugerir reconexión |

#### U — Concierge Unificado (19 MF, 12 días) ⭐ ESTRELLA

**Visión**: un solo botón flotante que reemplaza el WhatsApp widget + AI assistant separados de hoy. Tres modos seamless: 🤖 Bot AI 24/7, 👨 Asesor en vivo, 📲 WhatsApp gateway. Todo conectado al CRM como motor de captura de leads (progressive profiling).

**Arquitectura del bot**: 6 motores en paralelo (todos browser-side):
1. Intent Classifier (12 categorías)
2. Entity Extractor (NER)
3. Knowledge Retriever (RAG con embeddings)
4. Response Generator (templates + personalidad)
5. Sentiment Tracker
6. Context Memory (últimos 6 turnos + datos del cliente)

**Microfases**:

| MF | Qué hace |
|---|---|
| U.1 | Design System del Concierge (widget + bandeja admin + animaciones + colores semánticos por modo) |
| U.2 | Schema unificado `conversaciones/{id}` con messages[], participants, assignedAsesor, mode, context, sentiment_history, intent_history, _legacy_threadId |
| U.3 | Migración `mensajes/` (MF2.5) → `conversaciones/` script idempotente |
| U.4 | Frontend widget unificado `concierge.js` reemplaza `whatsapp-widget.js` + `ai-assistant.js` (mantener compat 2 semanas) |
| U.5 | Knowledge Base CRUD admin: vehículos (auto-sync), FAQs, políticas, datos del negocio |
| U.6 | Embeddings client-side con Xenova/all-MiniLM-L6-v2 (~25MB cacheable) — RAG por similitud coseno |
| U.7 | Intent Classifier + NER paralelo en cada turno del cliente |
| U.8 | Response Generator del bot con personalidad de Altorra (cálido, breve, colombiano), few-shot, multi-turno coherente |
| U.9 | Sentiment + Auto-escalation: sentiment < -0.5 o cliente lo pide → handoff a asesor con notificación push |
| U.10 | Bandeja admin Concierge (lista de conversaciones live + filtros + búsqueda) |
| U.11 | Chat detail admin estilo WhatsApp: typing indicator, quick replies, plantillas, adjuntos (foto, vehiculo card, cotización) |
| U.12 | Smart Suggestions para asesor: 3 respuestas sugeridas mientras escribe — patrón Gmail Smart Reply pero personalizado |
| U.13 | Conversation summarization tras X mensajes — útil cuando otro asesor toma la conversación |
| U.14 | WhatsApp handover: link `wa.me?text=` con resumen + ticket. Marca `mode: wa_handed_over` |
| U.15 | Cleanup + remoción de chats viejos tras 2 semanas en producción |
| **U.16** | **Soft contact en CRM al primer mensaje** (incluso anónimo) — entra como `contactos/{id}` con tipo `visitor` o `lead` |
| **U.17** | **Progressive Profiling**: bot pide datos en orden óptimo (no abruma) — configurable por admin: cuándo pedir email/teléfono según intent |
| **U.18** | **Identity Merge**: cuando un visitor se registra con email que ya estaba en `conversaciones/`, fusión automática + notificación al admin |
| **U.19** | **Marketing Opt-in granular + Right to be forgotten**: micro-consent al primer mensaje, opt-in separado por canal (email/WhatsApp/SMS futuro), purge GDPR-compliant |

**Niveles de captura del lead**:
- L0 Anónimo: sessionId, página origen, vehículo viendo, browser/OS, sentiment+intent+entities → score 0
- L1 Identificado: + nombre (bot pregunta tras 2-3 turnos)
- L2 Contactable: + email o teléfono (cuando es relevante)
- L3 Calificado: + presupuesto, ubicación, timeline, preferencias (NER auto-extrae)
- L4 Asignado: + asesor responsable, etiquetas, score recalculado
- L5 Convertido: + cita agendada o cotización enviada o venta cerrada

#### C — Inventario inteligente (8 MF, 5 días)

| MF | Smart field | Regla |
|---|---|---|
| C.1 | `tipo` (nuevo/semi-nuevo/usado) | km==0 → nuevo · 1-10K → semi-nuevo · 10K+ → usado |
| C.2 | `categoria` sugerida | Vía MobileNet desde foto |
| C.3 | `colorPrimario` | Canvas API extrae color dominante de primera imagen |
| C.4 | `prioridadDestacado` | Antiguedad + favoritos + vistas |
| C.5 | `descripcionSugerida` | Template generador |
| C.6 | Detector calidad fotos | Blur/dark/framing — alerta antes publicar |
| C.7 | Stale detector | >60d sin movimiento → sugerir acción |
| C.8 | Validaciones inteligentes | Año<2000+km<50K → "¿clásico restaurado?". Cuota>precio → error |

#### D — Calendario dedicado (8 MF, 5 días)

| MF | Qué hace |
|---|---|
| D.1 | Vista mes con drag-drop |
| D.2 | Vista semanal y diaria con slots 30min |
| D.3 | Config avanzada: turnos múltiples, festivos COL, capacidad por slot, excepciones |
| D.4 | Buffer entre citas, anti-overbooking |
| D.5 | Recordatorios automáticos (email + push native) |
| D.6 | No-show prediction (J.4) integrada — "65% prob, ¿confirmar 2x?" |
| D.7 | AI Auto-Scheduling: cliente pide "martes tarde" → sistema sugiere mejor slot |
| D.8 | Optimizador de ruta diaria por proximidad geográfica (Haversine sin API) |

#### E — Comunicaciones unificadas (12 MF, 7 días)

| MF | Qué hace |
|---|---|
| E.1-E.10 | Inbox unificado, filtros, labels CRUD, asignaciones con @menciones, auto-replies, agrupación por contacto, quick replies, tracking SLA, lectura cliente, modo "atender siguiente" |
| E.11 | Sentiment overlay en Inbox: dot color por mensaje, negativos al top |
| E.12 | NER inline: entidades resaltadas + acciones one-click ("crear cita con esta fecha") |

#### F — CRM 360 evolución (8 MF, 5 días)

| MF | Qué hace |
|---|---|
| F.1-F.6 | Pipeline visual, vista 360 enriquecida, segmentación dinámica, mensajes masivos, cotizaciones ricas, programa referidos |
| F.7 | Pestaña "Red" en vista 360: knowledge graph interactivo |
| F.8 | Pestaña "Predicciones": probabilidad venta, días al cierre, NBA |

#### O — Reportes con AI insights (6 MF, 4 días)

| MF | Qué hace |
|---|---|
| O.1-O.5 | Dashboard ejecutivo, funnel, performance asesor, inventario insights, export programado |
| O.6 | Insights automáticos panel "Lo que el sistema notó esta semana" — anomalías + forecast + sugerencias accionables |

#### L — Voz + Multi-modal (4 MF, 3 días)

| MF | Qué hace |
|---|---|
| L.1 | Comandos por voz globales (Espacio+V): "asignar la cita 5 a Daniel" |
| L.2 | Notas dictadas en cualquier campo de texto |
| L.3 | OCR de placas vía cámara |
| L.4 | OCR de cédula del cliente |

#### M — Realtime Collaboration (5 MF, 4 días)

| MF | Qué hace |
|---|---|
| M.1 | Presence avanzada: `currentSection` + `currentEntityId` |
| M.2 | Co-edit locks blandos: "Daniel está editando" + ver en vivo |
| M.3 | Live cursors en Kanban (patrón Figma) |
| M.4 | Comentarios threaded en cualquier registro con @menciones, reacciones, markdown |
| M.5 | Salas de trabajo: "Trabajar con Daniel" — cursor compartido + chat dedicado |

#### N — Adaptive UI (4 MF, 3 días)

| MF | Qué hace |
|---|---|
| N.1 | Tracking de uso interno (heatmap anonimizado por uid) |
| N.2 | Sidebar adaptativo (no usado en 30d → más opciones; top-3 anclados) |
| N.3 | Quick actions personalizadas en dashboard (top 5 botones más usados) |
| N.4 | Onboarding contextual primera vez por sección |

#### G — Push + Offline-first PWA (5 MF, 3 días)

| MF | Qué hace |
|---|---|
| G.1 | Service Worker registra suscripción push (FCM web free) |
| G.2 | Notificaciones nativas SO para eventos críticos |
| G.3 | Offline-first: cola de acciones cuando no hay red, sync al volver |
| G.4 | PWA installable con icono, splash, full standalone |
| G.5 | Background Sync API (SW envía pendientes con tab cerrada) |

#### H — Security + Audit pro (5 MF, 3 días)

| MF | Qué hace |
|---|---|
| H.1 | Field-level encryption con Web Crypto API para campos sensibles (cédula, ingresos) |
| H.2 | Audit log inmutable con hash chain (blockchain-lite) |
| H.3 | 2FA obligatorio para todos los admins post-rebuild |
| H.4 | Re-auth para acciones críticas (delete, export masivo, change role) |
| H.5 | Anomalous behavior detection (50 deletes en 5min → bloqueo + alerta) |

#### P — Performance + A11y AAA (4 MF, 3 días)

| MF | Qué hace |
|---|---|
| P.1 | Lazy load de TODO módulo pesado (TF.js, Tesseract, Transformers, Chart.js) via idle scheduler |
| P.2 | Web Workers para cómputos pesados (lead scoring batch, knowledge graph indexing, anomaly detection) |
| P.3 | WCAG AAA completo: contrast, ARIA, keyboard nav, screen reader, high-contrast toggle |
| P.4 | Command palette global (Cmd+K) con shortcuts: `g i` Inbox, `g c` CRM, `n l` New Lead, `?` cheatsheet |

### Orden óptimo de ejecución

```
SEMANA 1: A.1 + A.2 + A.3 + T.1-T.4
SEMANA 2: T.5-T.8 + B.1-B.3
SEMANA 3: B.4-B.5 + I (todo) + Q (todo)
SEMANA 4: J (todo, NLP/CV/OCR cargados)
SEMANA 5: U.1-U.7 (Concierge: design + schema + migración + bot AI)
SEMANA 6: U.8-U.15 (Concierge: live chat + smart suggestions + handover)
SEMANA 7: U.16-U.19 + K + R
SEMANA 8: C + D
SEMANA 9: E + F
SEMANA 10: O + L + M
SEMANA 11: N + G + H
SEMANA 12: P + buffer + QA + estabilización
```

### Anti-patrones globales que el plan previene

| Riesgo | Mitigación |
|---|---|
| Refactor masivo rompe features | Cada MF independiente con tests E2E manuales documentados |
| Modelos AI cargados eager rompen perf | Lazy + cachados + Web Worker + skeleton |
| Realtime collab causa race conditions | Locks blandos + last-write-wins + warnings + `_version` |
| Adaptive UI confunde admin nuevo | Reset manual + onboarding tour |
| AI sugerencias intrusivas | Toda sugerencia es "Aceptar/Editar" — nunca silenciosa |
| Workflow infinite loops | Detector de ciclos en runtime + cap 10 ejecuciones por evento |
| Push spam | Throttle + dedup + prefs granulares (ya tenemos infraestructura de notify v2) |
| OCR baja precisión | Confidence visible — bajo 70% requiere confirmación manual |
| Sentiment incorrecto en español dialéctico | Override manual + se aprende |
| Storage explotado por modelos AI | Quota check antes de cargar, fallback a sin-AI |
| Knowledge graph enorme | Cap nodos + edges relevantes (últimos 50 vehículos visto, no histórico full) |
| Datos sensibles encriptados → admin pierde key | Backup encriptado per-admin con password derivation + recovery via super_admin |
| Identity merge incorrecto (mismo email distintas personas) | Confirmación manual antes de merge si hay datos contradictorios |
| Documentación atrasada otra vez | Política transversal "3 entregables por MF" con D+M+Doc obligatorios |

### Estado world-class al final

**Para el cliente**: un solo botón Concierge (bot 24/7 + asesor live + WhatsApp gateway) que reemplaza los 2 widgets actuales. Bot inteligente con NLP/sentiment/NER/RAG. Captura todo lead progresivamente. PWA instalable, offline, push native.

**Para el admin**: plataforma con Design System pro, sidebar limpia (8 secciones), workspaces cohesionados. Inbox unificado con TODO confluyendo. AI corre debajo (sentiment, intent, NER, scoring, predictions, suggestions). Realtime collab. Voz + OCR. Workflows configurables. Knowledge Graph para navegación. Reportes con anomalías y forecasts. Adaptive UI que aprende.

**Para el negocio**: $0 recurrente. Datos limpios, migrados, auditables. Compliance-ready (audit log inmutable, encryption, 2FA, GDPR right-to-forget). Escala a más asesores sin rediseño.

---

### Microfase A.1 — Fix botones WhatsApp visibles en modals ✓ COMPLETADA (2026-05-05)

**Problema raíz**: Después de MF2.1 (que eliminó `window.open(wa.me)` en los handlers JS), los íconos verdes de WhatsApp + textos "Recibir mi oferta" / "Enviar por WhatsApp" siguieron en el HTML porque eran SVG inline + texto hardcoded en `snippets/modals.html` líneas 147 y 269. El usuario reportó esto como "los formularios aún tienen botones verdes de WhatsApp".

**Fix**:
1. `snippets/modals.html`: ambos botones reemplazados por SVG paper-plane (Lucide `send` icon equivalente) + texto "Enviar solicitud". Comentario `<!-- A.1 (mega-plan v4) -->` para trazabilidad.
2. `index.html`: mismo fix aplicado a las copias del HTML embebidas (líneas 902 y 1026). Las copias existen porque el index renderiza el modal directamente sin esperar al fetch del snippet.
3. `css/contact-forms.css`: clase `.whatsapp-icon` reemplazada por `.form-submit-icon` (18x18, margin-right 4px). La clase legacy se preserva con `display: none` por si quedó referencia en algún lado (defensive).

**Migración (M)**: ninguna — era cambio puramente visual + cleanup de íconos.

**Diseño (D)**: el ícono `paper-plane` (envío) es semánticamente correcto para "Enviar solicitud" y no asocia el form con ningún canal específico (era el problema: el botón verde + ícono WhatsApp + texto "Enviar por WhatsApp" daba la idea que se mandaría por WA, mientras que el handler JS ya lo guardaba a Firestore). Ahora el button + ícono + label están alineados con la realidad: se envía la solicitud a Altorra, el cliente recibe la pantalla de éxito (MF2.1) y un asesor lo contacta por correo y WhatsApp después.

**Archivos modificados**: `snippets/modals.html`, `index.html`, `css/contact-forms.css`, `service-worker.js`, `js/cache-manager.js`

**Pasos para probar**:
1. Abrir `index.html` → click "Vende tu Auto" → completar wizard → ver botón final
2. Verificar que el botón dice "Enviar solicitud" con ícono de paper-plane (sin verde, sin WhatsApp)
3. Click → confirmación in-place de MF2.1 (NO se abre WhatsApp)
4. Mismo test con "Solicitud de Financiación"
5. Verificar en DevTools que `.whatsapp-icon` no aparece en ningún botón visible

---

### Microfase A.2 — Backfill de documentación para 16 microfases v2 (2026-05-05)

> Esta entrada recupera la documentación atrasada de las microfases del plan v2 que se shippearon (commits válidos en git) pero quedaron sin entrada formal en CLAUDE.md. Cada bloque tiene problema raíz, cambios, archivos, pasos de prueba.

#### MF1.3 — priority + tags + slaDeadline auto-computed ✓
**Cambio**: `AltorraCommSchema.computeMeta(doc)` añade automáticamente `priority` (alta/media/baja), `tags[]`, `slaDeadline` ISO string y `slaMs`. Aplicado en todos los 4 forms públicos al guardar.
**Reglas**: kind=cita → priority alta + sla 30min. financiación con cuotaInicial≥$50M → alta + sla 1h + tag 'alto-valor'. consignación premium (≥$100M) → alta + tag 'premium'. compra con vehiculoId → alta. lead → baja + sla 24h. Tags por origen: 'desde-vehiculo', 'desde-simulador', 'cliente-registrado'.
**Archivos**: `js/comm-schema.js`, `js/contact-forms.js`, `js/contact.js`, `js/citas.js`, `simulador-credito.html`, todos los HTMLs root + 43 generados.

#### MF2.3 — UX consistente loading/offline/anti-double-submit ✓
**Cambio**: Helpers `_beginSubmit(form)` + `_endSubmit(form)` en `js/contact-forms.js`. Pre-checks `!navigator.onLine` antes de Firestore call (toast "Sin conexión"). `form._inFlight` flag previene double-click. Submit btn muestra `<spinner> Enviando...` con `.form-spinner` CSS.
**Archivos**: `js/contact-forms.js`, `js/contact.js`, `js/citas.js`, `css/style.css`.

#### MF2.4 — SLA visible + WhatsApp/perfil CTAs en confirmación ✓
**Cambio**: `AltorraCommSchema.formatSLA(slaMs)` retorna `{friendly, isBusinessHours}`. Pantalla de éxito MF2.1 ahora muestra: "Te respondemos en menos de 30 minutos" (o "mañana a las 8:00" fuera de horario). 3 CTAs: Entendido + WhatsApp ahora (con ticket # pre-fill, no datos crudos) + Ver mis solicitudes (logged-in only). Business hours: Mon-Sat 8AM-6PM Colombia.
**Archivos**: `js/comm-schema.js`, `js/contact-forms.js`, `css/style.css`.

#### MF2.5 — Mensajería por vehículo (foundation) ✓
**Cambio**: Nuevo `js/vehicle-thread.js` + botón "Hacer Pregunta" en detalle de vehículo. Click abre mini-chat persistente. Schema `mensajes/{thread_uid_vehicleId}` con messages[], userId/Email/Name, vehicleId/Title, lastMessage, lastMessageAt, unreadByAdmin/User, status. Para guests: gate "Inicia sesión para preguntar". Realtime onSnapshot.
**Archivos**: `js/vehicle-thread.js` (new), `firestore.rules`, `detalle-vehiculo.html` + 25 generadas, `css/style.css`.

#### MF3.3 — Timeline + acciones contextuales por kind ✓
**Cambio**: En el modal de gestión, dos bloques inyectados dinámicamente: (1) Timeline con eventos del doc (Created/Updated/Migrated). (2) Quick actions per-kind: Cita → Confirmar/No-show; Solicitud → Marcar contactado/Aprobar; Lead → Marcar contactado/**Convertir a solicitud** (crea nuevo doc kind=solicitud, marca el lead como 'convertido').
**Archivos**: `js/admin-appointments.js`, `css/admin.css`.

#### MF3.4 — Asesor dropdown + auto-routing ✓
**Cambio**: Modal de gestión con dropdown de asesores activos (super_admins + editors). Save persiste `assignedTo` + `assignedToName`. Notificación bell al admin asignado (entityRef='assigned:<docId>'). Auto-routing: super_admin observa nuevos docs sin asignar via docChanges() y aplica reglas: financiación+'alto-valor' → super_admin; otros → round-robin (editor con menos asignaciones pendiente/nuevo/en_revision). Solo super_admin corre el routing (avoid race entre tabs admin).
**Archivos**: `js/admin-appointments.js`, `css/admin.css`, `admin.html` (col Asesor en tabla).

#### MF3.5 — Vista Kanban con drag-drop ✓
**Cambio**: Toggle Tabla/Kanban en Comunicaciones. Kanban: columnas=estados del kind activo, cards=docs draggable. Drop persiste estado en Firestore + audit log + notificación al cliente (categoría apropiada). HTML5 native drag-drop, sin lib. Mobile: scroll horizontal con snap-x. Min column width 280px. Cards muestran prioridad badge color-coded.
**Archivos**: `admin.html`, `js/admin-appointments.js`, `css/admin.css`.

#### MF3.6 — SLA semáforo + plantillas de respuesta rápida ✓
**Cambio**: Tabla de comunicaciones agrega dot color en columna estado (verde >50% SLA / ámbar 0-50% / rojo vencido). Pulsa sutilmente. Solo para docs unhandled. Modal de gestión: nuevo bloque "Plantillas" arriba de observaciones con dropdown kind-aware (Cita: Confirmar/Reprogramar/Cancelar; Solicitud: Te llamaremos/Aprobada/Rechazada amable/En revisión; Lead: Te contactamos/Sigue interesado). Variables interpoladas: `{{nombre}}`, `{{vehiculo}}`, `{{fecha}}`, `{{hora}}`, `{{tipo}}`. Apply append a observaciones (no clobber).
**Archivos**: `js/admin-appointments.js`, `css/admin.css`.

#### MF4.1 — Sección CRM + tabla unificada de contactos ✓
**Cambio**: Nueva entrada sidebar "CRM" (icon users-round). Workspace con KPIs (Total/Registrados/Guests/Promedio comms) + tabla unificada que merge `clientes/{uid}` (registrados) con `solicitudes/` agrupados por userId|email (guests). Columnas: Contacto (avatar+nombre+email/phone), Tipo, # Comunicaciones, Último contacto (Hoy/Ayer/Hace Nd), Score+tier (🔥 Caliente/🟧 Tibio/🟦 Frío), Asesor, Botón "Ver 360°". Filtros tipo + search debounced. Sort por lastCommAt desc. Limit 100 rows.
**Archivos**: `admin.html`, `js/admin-crm.js` (new), `css/admin.css`.

#### MF4.2 — Vista 360° del contacto con 5 tabs ✓
**Cambio**: Click "Ver 360°" abre modal centrado con tabs: (1) Resumen (datos contacto), (2) Comunicaciones (timeline cronológico), (3) Actividad (favoritos, búsquedas, vistos — solo registrados), (4) Score (badge tier-colored + breakdown 7 factores con progress bars), (5) Notas (subcollection `clientes/{uid}/crmNotes/{nid}`). `_crmDetailContact` track active contact across tabs.
**Archivos**: `js/admin-crm.js`, `css/admin.css`.

#### MF4.3 — Acciones masivas + export CSV ✓
**Cambio**: Checkbox column en CRM table + master `crmSelectAll`. Selecting rows reveal bulk-bar con: N seleccionado(s), Exportar CSV (UTF-8, RFC 4180 escape), Etiquetar (prompt → `clientes/{uid}.crmTags` via FieldValue.arrayUnion, solo registrados), Cancelar. CSV columns: Nombre, Email, Telefono, Ciudad, Tipo, Comunicaciones, Score, Tier, UltimoContacto, Asesor. Filename: `altorra-crm-YYYY-MM-DD.csv`.
**Archivos**: `admin.html`, `js/admin-crm.js`, `css/admin.css`.

#### MF4.4 — Dashboard CRM + funnel chart ✓
**Cambio**: KPI cards expandidos 4→6: Total contactos, Nuevos hoy, Esta semana (last 7d), Tasa conversión (% contacts con cita/solicitud), Avg respuesta (avg updatedAt-createdAt over comms <7d), Caliente/Tibio/Frío count breakdown. Funnel chart custom CSS (sin lib): horizontal bars Leads → Solicitudes → Citas → Convertidos con animación width. Color por tier (indigo/yellow/green/orange).
**Archivos**: `admin.html`, `js/admin-crm.js`, `css/admin.css`.

#### MF4.5 — Lead score multi-factor weighted ✓
**Cambio**: PlanOK Propeler-inspired. `computeScoreBreakdown(c)` retorna `{score, factors, weights}`. 7 factores normalizados 0-1, sumados a 100: engagement (20%), economic (25%), interactions (15%), depth (15%), recency (10%), frequency (10%), age (5%). Tiers: ≥70 caliente, 40-70 tibio, <40 frío. Breakdown expuesto via `AltorraCRM.computeScoreBreakdown` para vista 360 (MF4.2).
**Archivos**: `js/admin-crm.js`.

#### MF4.6 — Cotizador con PDF (browser print) ✓
**Cambio**: Botón "Generar cotización" en CRM 360° abre modal con: Cliente+Vehículo (auto-fill desde último financiación), Precio base/descuento/cuota inicial, Plazo/tasa/vigencia. Live preview: monto financiar, cuota mensual (French amortization), total pagado, intereses. "Generar PDF" abre print window styled con branding Altorra. User usa Print → Save as PDF (sin lib, $0). Quote saved en `clientes/{uid}/cotizaciones/{cotId}`.
**Archivos**: `js/admin-quote.js` (new), `admin.html`, `css/admin.css`.

#### MF4.7 — Admin Inbox unificado para vehicle threads ✓
**Cambio**: Nueva entrada sidebar "Inbox" (message-square-text icon). Layout: thread list left (320px) + detail panel right (flex). Threads listener `mensajes/`.orderBy(lastMessageAt).limit(100). Cards: cliente nombre+email, vehicle title (gold), snippet, date, badge unread, border-left gold for unread. Detail: head con cliente+vehicle+Cerrar/Reabrir, message bubbles, reply form. Send appends {from:'admin'} al messages array, updates last + unreadByUser++, unreadByAdmin=0.
**Archivos**: `admin.html`, `js/admin-inbox.js` (new), `css/admin.css`.

#### MF4.8 — Postventa scheduler + NPS aggregation ✓
**Cambio**: `AltorraPostventa.schedule(saleData)` programa 3 follow-ups via AltorraFollowups (MF6.2): +3 días encuesta satisfacción 1-5★, +30 días NPS 0-10, +90 días recordatorio mantenimiento + invitar a referir. Sale record en `clientes/{uid}/postventa/{saleId}`. `computeNPS()` usa collectionGroup('postventa'): (promotores 9-10 - detractores 0-6) / total * 100.
**Archivos**: `js/admin-postventa.js` (new), `admin.html`.

#### MF5.1 — WhatsApp widget con template chooser ✓
**Cambio**: Reemplaza `wa.me` ad-hoc redirects con widget popup contextual. 4 templates: Quiero financiación (kind=solicitud), Quiero ver el auto (lead/consulta_vehiculo), Tengo una pregunta (lead/consulta_general), Otro asunto (lead/otro). On select: lead se ESCRIBE primero a `solicitudes/` con identidad+source+computeMeta, después se abre wa.me con ticket# en el mensaje. Cancelaciones no pierden el lead.
**Archivos**: `js/whatsapp-widget.js` (new), `js/components.js` (loadAuthSystem injection), `css/style.css`.

#### MF5.2 — Hotspots clickeables sobre imagen del vehículo ✓
**Cambio**: Lee `vehiculos/{id}.hotspots[] = [{x, y, title, description}]` (x/y 0-1 percentages). Renderiza dots dorados pulsantes posicionados absolute % sobre `.vehicle-image-main`. Hover/focus muestra tooltip con title+description, fade-in. Pulse animation respect prefers-reduced-motion. CSS variants gold default.
**Archivos**: `js/vehicle-hotspots.js` (new), `css/style.css`, 26 vehicle pages (template + 25 generated).

#### MF5.3 — AI Assistant FAQ widget (sin LLM, curado) ✓
**Cambio**: Bot button morado floating (al lado del verde WhatsApp widget). 6 FAQ entries con keyword arrays. `findFAQ(query)` scores keyword hits, retorna mejor match. CTAs por FAQ: open-modal-financ/vende, goto-busqueda, open-wa, escalate. No match → "¿Conectarte con un asesor?" → on accept, crea lead con origen='ai_assistant'.
**Archivos**: `js/ai-assistant.js` (new), `js/components.js`, `css/style.css`.

#### MF6.1 — Workflow automation rules engine ✓
**Cambio**: Nueva sección sidebar "Automatización" (zap icon). 4 reglas built-in toggleables: route_high_value_financiacion (financ+'alto-valor' sin assignedTo → super_admin), sla_breach_notify_super (pendiente+SLA vencido → notif), auto_tag_repeat_visitor (placeholder), cita_24h_reminder (off, futuro). Engine: evaluateRules(triggerType, doc) returns matches[], applyAction(match) executes. Triggers: 'comm_created' via docChanges + 'sla_check' polling 60s. Solo super_admin corre.
**Archivos**: `js/admin-automation.js` (new), `admin.html`, `css/admin.css`.

#### MF6.2 — Follow-ups programados ✓
**Cambio**: `AltorraFollowups.schedule(label, dueAt, notes, assignedTo, relatedDocId)`. Storage `config/followups.items[]`. Scheduler client-side: check cada 60s, if dueAt <= now AND assignedTo matches user → fires 'system' notification al bell. Marks notified=true (solo super_admin escribe). UI: botón "Recordame" en context actions del manage modal pide horas + label.
**Archivos**: `js/admin-followups.js` (new), `js/admin-appointments.js`, `admin.html`.

#### MF6.3 — Message templates CRUD ✓
**Cambio**: Nueva sección sidebar "Plantillas" (file-edit icon). Storage `config/messageTemplates.items[]` con CRUD. UI: form add (label, kind, text) + list con delete. Variables documentadas: `{{nombre}}`, `{{vehiculo}}`, `{{fecha}}`, `{{hora}}`, `{{tipo}}`. `AltorraTemplates.list()` expuesto para que admin-appointments.js (MF3.6) sume custom templates a las built-in.
**Archivos**: `js/admin-templates.js` (new), `admin.html`, `css/admin.css`.

**Total backfill**: 16 microfases con commits ya en git previamente, ahora documentadas formalmente.

---

### Microfase T.1 — Design Tokens (`css/tokens.css`) ✓ COMPLETADA (2026-05-05)

**Por qué es crítico**: el admin se sentía "básico" porque cada CSS tenía valores hardcoded (colores, espacios, sombras). Cualquier tweak global era impossible. T.1 establece UN solo lugar de verdad para todos los design values.

**Lo que se creó**: `css/tokens.css` con 10 categorías de tokens:

1. **Color palette raw**: 9 escalas (brand-50 → 900, neutral 0 → 950, success/warning/danger/info/purple/cyan)
2. **Semantic tokens**: `--bg-base`, `--bg-elevated`, `--bg-card`, `--text-primary`, `--text-secondary`, `--border-default`, `--brand-primary`, `--status-success`, etc. — los componentes usan estos, NUNCA los raw.
3. **Spacing scale 4-point**: `--space-0` a `--space-24` (0px a 96px)
4. **Typography**: families (Poppins, Cardo, mono), weights (regular → extra), sizes (xs → 3xl), line-heights, letter-spacings
5. **Shadows + elevation**: xs / sm / md / lg / xl + glow-brand + focus-ring
6. **Border radius**: none / xs / sm / md / lg / xl / 2xl / pill / circle
7. **Animation**: 6 curvas oficiales (linear, snap, soft, spring, decelerate, accelerate) + 5 durations (instant → slower)
8. **Z-index scale**: 11 niveles semánticos (base → max) — fin de los 9999 mágicos
9. **Layout**: max-content, sidebar widths (collapsed/expanded), header height, content padding
10. **Theme variants**: dark default + `[data-theme="light"]` override + `[data-theme="high-contrast"]` (T.4 + T.8 implementan los toggles)

**Política transversal de motion**: bloque global `@media (prefers-reduced-motion: reduce)` que pone a 0 todas las durations y desactiva animaciones — TODA la plataforma respeta esto sin código extra.

**Diseño (D)**: tokens diseñados con jerarquía clara — raw colors solo para mapping interno, semantic tokens para componentes. Mismo nombre de token funciona en dark/light/high-contrast.

**Migración (M)**: ningún cambio destructivo — `tokens.css` se carga ANTES de `admin.css` y todos los CSS existentes siguen funcionando con sus hardcoded values. T.6 hará la migración masiva de hardcoded → tokens.

**Archivos modificados**: `css/tokens.css` (new), `admin.html` (link agregado antes de admin.css).

**Pasos para probar**:
1. Abrir admin → DevTools → Computed → en `:root` ver las CSS variables `--color-brand-500`, `--space-4`, etc.
2. En consola: `getComputedStyle(document.documentElement).getPropertyValue('--brand-primary')` → `#b89658`
3. Activar prefers-reduced-motion en DevTools → Rendering → ver que las animaciones son instantáneas
4. Cambiar `<html data-theme="light">` en consola → verificar que `--bg-base` cambia a `#fafafa`
5. Cambiar `<html data-theme="high-contrast">` → verificar contraste extremo

---

### Microfase T.2 — Component Library (`css/components.css`) ✓ COMPLETADA (2026-05-05)

**Por qué**: T.1 dio los tokens. T.2 los usa para construir 12 componentes core reusables. Toda nueva feature debe usar estos componentes — el admin viejo migra en T.6.

**12 componentes creados** (todos prefijo `alt-` para evitar colisiones):

| # | Componente | Clases / API |
|---|---|---|
| 1 | **Button** | `.alt-btn` + `--primary/--secondary/--ghost/--danger/--success` + `--sm/--lg/--icon/--block`. Estado `data-loading="true"` muestra spinner automático. `:focus-visible` con `--shadow-focus-ring`. `:disabled` y `[aria-disabled]`. |
| 2 | **Input** | `.alt-input` (textarea también). Estado `aria-invalid="true"` ring rojo. Hover/focus/disabled. `--sm/--lg`. |
| 3 | **Field group** | `.alt-field` + `.alt-field-label` + `.alt-field-hint` + `.alt-field-error`. Compose with `.alt-input`. |
| 4 | **Select** | `.alt-select` con SVG inline para flecha (currentColor — adapta al tema). Misma estética que input. |
| 5 | **Card** | `.alt-card` + `--interactive/--elevated/--flat`. Sub-blocks: `.alt-card-header`, `.alt-card-title`, `.alt-card-body`, `.alt-card-footer`. |
| 6 | **Modal** | `.alt-modal-backdrop` + `.alt-modal` + `--sm/--lg/--xl`. `aria-hidden="false"` o `.is-open` activa. Animaciones spring. Header/body/footer estructurados. |
| 7 | **Tabs** | `.alt-tabs` + `.alt-tab` + `.alt-tab-badge`. Variant `--pills` para boxed. `aria-selected="true"` activa el border-bottom dorado. |
| 8 | **Badge** | `.alt-badge` + 7 variantes (success/warning/danger/info/brand/ai/solid). Variant `--dot` con dot prefix. |
| 9 | **Avatar** | `.alt-avatar` + `--sm/--lg/--xl/--ring`. Soporta `<img>` o iniciales. `.alt-avatar-group` apila con overlap. |
| 10 | **Tooltip** | `[data-tooltip="texto"]` puro CSS via `::after` + `attr()`. `data-tooltip-pos="bottom"` cambia posición. Auto-hide en touch. |
| 11 | **Toggle/Switch** | `.alt-toggle` con `<input type="checkbox">` interno. Spring animation al cambiar. `aria-checked` accesible. |
| 12 | **Skeleton** | `.alt-skeleton` + `--circle/--text/--title/--block`. Shimmer animation con tokens. |
| + | **Stack/Cluster** | Layout primitives: `.alt-stack` (vertical) y `.alt-cluster` (horizontal flex+wrap) con gap variants xs/sm/lg/xl. |

**Características transversales**:

- Todos respetan `prefers-reduced-motion` (heredan de tokens.css)
- Todos funcionan en dark/light/high-contrast sin código extra (semantic tokens)
- Focus rings consistentes (`--shadow-focus-ring`)
- ARIA attributes apropiados (`aria-disabled`, `aria-selected`, `aria-invalid`, `aria-hidden`)
- BEM naming: `.alt-btn--primary`, `.alt-card-header`, etc.
- Utility `.alt-visually-hidden` para screen reader only

**Diseño (D)**:
- Cards y modals usan `--shadow-md` por default, `--xl` para modals (más elevación)
- Sizes consistentes: `sm` (compact), default, `lg` (prominent), `xl` solo para hero/modals
- Animaciones con `--ease-snap` (default), `--ease-spring` (toggles + modals para overshoot natural)
- Border radius escalonado: chips usan `--pill`, cards `--lg`, modals `--xl`

**Migración (M)**: ningún cambio destructivo. `components.css` se carga después de `tokens.css` y antes de `admin.css`. El admin existente sigue funcionando con sus estilos legacy hasta T.6.

**Archivos modificados**: `css/components.css` (new), `admin.html` (link agregado), `service-worker.js`, `js/cache-manager.js`.

**Pasos para probar**:
1. Abrir admin → en cualquier sección agregar manualmente `<button class="alt-btn alt-btn--primary">Test</button>` en consola → verificar que se ve dorado con hover lift
2. Mismo con `<span class="alt-badge alt-badge--success alt-badge--dot">Activo</span>` → badge verde con dot
3. T.3 (siguiente) creará la página de Storybook lite para verlos todos juntos.

---

### Microfase T.3 — Storybook lite (`admin/_components.html`) ✓ COMPLETADA (2026-05-05)

**Por qué**: necesitamos una página interna que muestre TODOS los componentes (T.2) en todos sus estados/variantes para QA visual rápido. Antes de migrar el admin (T.6) o agregar features nuevas, validamos visualmente que el sistema se ve consistente.

**Lo que se creó**: página standalone `admin/_components.html` con:

1. **Header sticky** con título + 3 toggles de tema (Dark / Light / A11y AAA) — permite verificar in-place que cada componente funciona en los 3 modos.
2. **12 secciones** (una por componente) con:
   - Descripción + ejemplo de código inline (`<code>`)
   - Tiles que muestran cada variante/estado
   - Casos de uso reales (ej: card de cliente con badge "Activo", avatar group, tab strip con badge contador)
3. **Modal funcional** con apertura/cierre via JS minimal (Esc + click backdrop + close button — todos funcionan).
4. **robots.txt actualizado** con `Disallow: /admin/` para evitar indexación de la carpeta interna.

**Cómo usarla**:
- Local: abrir `admin/_components.html` en el browser
- Production: `https://altorracars.github.io/admin/_components.html` (no indexada por robots)
- Workflow: cuando agregues una feature, abrir Storybook → ver el componente correspondiente → copiar el snippet

**Diseño (D)**: la página misma usa los componentes que muestra (dogfooding) — botones, badges, cards, tabs son todos `.alt-*`. Header sticky con `backdrop-filter`. Grid responsive `auto-fill minmax(280px, 1fr)`.

**Migración (M)**: ninguna — página nueva sin afectar nada existente. `robots.txt` actualizado para que `/admin/` no se indexe.

**Archivos**: `admin/_components.html` (new), `robots.txt`, `service-worker.js`, `js/cache-manager.js`.

**Pasos para probar**:
1. Abrir `admin/_components.html`
2. Toggle "Dark" / "Light" / "A11y AAA" en header → verificar que TODO se adapta sin código extra (los tokens hacen el trabajo)
3. Click "Abrir modal" → verificar animación spring + Esc cierra + click backdrop cierra
4. Hover botones → tooltips aparecen
5. Verificar focus rings con Tab key → todos los elementos focusables muestran el ring dorado
6. DevTools → Rendering → activar "prefers-reduced-motion" → verificar que las animaciones se vuelven instantáneas

---

### Microfase T.4 — Light/Dark/High-Contrast theme toggle real ✓ COMPLETADA (2026-05-05)

**Por qué**: el admin estaba 100% dark fijo. Sin opción de tema claro para entornos con sol fuerte (Cartagena), sin alta-contraste para WCAG. T.4 agrega switch real con 3 capas de persistencia.

**Cómo funciona**:

1. **Inline script en `<head>`** (3 líneas en admin.html): lee `localStorage.altorra-theme` ANTES del primer paint y aplica `data-theme` al `<html>`. Cero flash de tema incorrecto. Si no hay preferencia, fallback a `prefers-color-scheme` del SO.

2. **`js/theme-switcher.js`**: módulo `AltorraTheme` con API:
   - `get()` — tema actual
   - `set(theme)` — aplica + persiste localStorage + Firestore (debounced 800ms)
   - `cycle()` — alterna dark ↔ light (skippea high-contrast, ése es toggle aparte en T.8)
   - `bindToggle(el)` — agrega click handler + actualiza aria-label/tooltip
   - `onChange(fn)` — subscribe
   - `syncFromUser(profile)` — aplica desde Firestore profile

3. **CSS theme transition**: nueva clase `.alt-theme-transitioning` agregada por 280ms al cambiar tema. Anima `background-color`, `color`, `border-color`, `box-shadow`, `fill`, `stroke` simultáneamente con `--ease-snap`. Cross-fade suave en TODA la página.

4. **3 capas de persistencia**:
   - **localStorage** (instant) — aplicado antes del paint
   - **Firestore** (`usuarios/{uid}.theme` para admins, `clientes/{uid}.preferencias.theme` para clientes) — sync cross-device
   - **System preference** (`prefers-color-scheme`) — fallback solo si no hay otra preferencia

5. **Toggle UI** en admin header: reemplaza el toggle viejo (emoji 🌙) con `<button class="alt-btn alt-btn--ghost alt-btn--icon" data-altorra-theme-toggle>` con dos íconos Lucide (moon + sun) que rotan/escalan al cambiar via CSS spring transition.

6. **Auto-bind**: cualquier elemento con atributo `data-altorra-theme-toggle` se bindea automáticamente al cargar.

7. **System change listener**: si el OS cambia entre dark/light Y el usuario no tiene preferencia explícita guardada, sigue al sistema.

**Diseño (D)**:
- Cross-fade suave entre temas (no salto brusco)
- Iconos sun/moon con rotación 90° + scale 0→1 al cambiar (spring)
- aria-label dinámico ("Cambiar a claro" / "Cambiar a oscuro")
- Tooltip via `data-tooltip` (T.2)

**Migración (M)**:
- Toggle viejo en admin header (emoji + clase `theme-toggle`) reemplazado por componente `.alt-btn`
- Lógica de tema vieja se reemplaza por `AltorraTheme`
- Storage key `altorra-theme` (nueva). Si había preferencia vieja con otra key, se ignora (queda en dark default + el usuario puede re-seleccionar).

**Archivos**: `js/theme-switcher.js` (new), `admin.html` (inline script + script tag + toggle markup), `css/tokens.css` (transition rule), `css/components.css` (icon swap), `js/admin-auth.js` (sync hook).

**Pasos para probar**:
1. Login admin → click el toggle del header → ver cross-fade smooth a light mode
2. Recargar la página → tema light persiste sin flash de dark
3. Logout, login en otra ventana/dispositivo (con misma cuenta) → tema light cargado de Firestore
4. DevTools → cambiar OS theme con `prefers-color-scheme` simulation → si nunca tocaste el toggle, sigue al SO
5. `<html data-theme="high-contrast">` en consola → A11y mode activa (T.8 lo refinará)

---

### Microfase T.5 — Animation system (`css/animations.css`) ✓ COMPLETADA (2026-05-05)

**Por qué**: animaciones ad-hoc esparcidas por todo el codebase (cada componente con sus propios `@keyframes`). T.5 centraliza en UN archivo con keyframes + utility classes + stagger system.

**Lo que se creó**: `css/animations.css` con:

**1. Entrance keyframes** (todas usan `--ease-spring` o `--ease-snap` de tokens):
- `alt-fade-in`, `alt-slide-up`, `alt-slide-down`, `alt-slide-in-left/right`, `alt-scale-in`, `alt-pop-in`

**2. Exit keyframes**:
- `alt-fade-out`, `alt-slide-out-down`, `alt-scale-out`

**3. Attention seekers**:
- `alt-pulse` (loop), `alt-shake` (one-shot), `alt-wiggle`, `alt-bounce`, `alt-flash`

**4. Continuous**:
- `alt-spin`, `alt-ping`, `alt-breathe`, `alt-shimmer`

**5. Utility classes** (apply declaratively):
- `.alt-animate-fade-in`, `.alt-animate-slide-up`, etc. — todas con `both` fill mode
- `.alt-animate-pulse`, `.alt-animate-shake`, etc.

**6. Stagger system**:
- `.alt-stagger > *` con `--alt-stagger-delay` (default 60ms) × `--alt-stagger-index` (1-10)
- Variants `.alt-stagger--fast` (30ms) y `.alt-stagger--slow` (100ms)
- Funciona automáticamente con cualquier utility de entrance: `<ul class="alt-stagger"><li class="alt-animate-slide-up">...</li>...</ul>` → cada `<li>` aparece 60ms después del anterior

**7. View Transitions API**:
- `@supports (view-transition-name: none)` activa cross-fade nativo entre páginas en Chrome 126+
- Duración + curva desde tokens

**8. Live indicator**:
- `.alt-live-indicator` — dot pulsante + ping ring para indicar estado "en vivo" (Concierge, Inbox)
- Reutilizable cross-features

**Reduced motion**: TODA animación queda neutralizada por la regla global de `tokens.css` (heredado).

**Diseño (D)**:
- Curvas oficiales: spring para entrance/exit (overshoot natural), snap para fade simples, soft para loops
- Durations: normal para la mayoría, slow para pop-in (más dramático), slower para wiggle
- Naming consistente: keyframes `alt-{name}`, classes `.alt-animate-{name}`

**Migración (M)**: ningún cambio destructivo. CSS legacy con sus keyframes propios sigue funcionando. T.6 hará la sustitución masiva por las utilities de aquí.

**Archivos**: `css/animations.css` (new), `admin.html` (link agregado), `service-worker.js`, `js/cache-manager.js`.

**Pasos para probar** (en consola del admin):
1. `document.body.classList.add('alt-animate-pulse')` → cuerpo entero pulsa
2. `document.querySelectorAll('.alt-card').forEach(c => c.classList.add('alt-animate-slide-up'))` + envolver en `.alt-stagger` → cards entran en cascada
3. `<i data-lucide="loader-2" class="alt-animate-spin"></i>` en cualquier lugar → spinner
4. DevTools → activar prefers-reduced-motion → todas las animaciones se vuelven instantáneas

---

### Microfase T.7 — Icon registry + AltorraIcons helper ✓ COMPLETADA (2026-05-05)

**Por qué**: el codebase usa Lucide en algunos lugares, SVG inline en otros, emojis en algunos más. T.7 crea un registry semántico + helper para asegurar consistencia + auto-refresh cuando se inyecta HTML dinámicamente.

**Lo que se creó** (`js/icons.js`):

1. **Glossary semántico** `AltorraIcons.canonical`: mapea conceptos (intent) a nombres de Lucide. Ejemplos:
   - `home`, `dashboard`, `inventory`, `crm`, `inbox`, `calendar`, `automation`, `templates`, `reports`, `settings`
   - Comm kinds: `cita: 'calendar-check-2'`, `solicitud: 'file-text'`, `lead: 'message-circle'`
   - Acciones: `add`, `edit`, `delete`, `save`, `download`, `send`, `search`, `filter`, etc.
   - Estados: `success`, `error`, `warning`, `info`, `loading`, `pending`, `priority`, `viewed`
   - Canales: `whatsapp` (`message-circle-more` — brand-neutral), `email`, `phone`, `chat`, `bot`
   - Money: `price`, `finance`, `quote`, `priceDrop`, `priceUp`, `wallet`
   - CRM: `score`, `target`, `funnel`, `graph`, `kanban`, `timeline`
   - AI: `ai: 'sparkles'`, `magic`, `suggest`, `voice`, `live`
   - Theme: `themeDark: 'moon'`, `themeLight: 'sun'`, `contrast`

   **Política**: cuando agregás un icon nuevo, primero lo añadís al glossary. Después usás `<i data-lucide="' + AltorraIcons.canonical.X + '">` en componentes — nunca hardcodear nombres Lucide directos.

2. **`refresh(scope)`**: re-renderiza Lucide en todo o en un scope dado. Ya existe `AP.refreshIcons()` legacy — ahora hay versión sin dependencia de AP.

3. **`ensure()`**: Promise que carga Lucide CDN si no está. Útil para páginas públicas que aún no lo cargan.

4. **`svg(name, attrs)`**: helper que retorna SVG string para `check`, `x`, `send` hardcoded. Útil cuando hay que inyectar SVG en string de HTML antes de que Lucide cargue.

5. **MutationObserver auto-refresh**: nuevos elementos con `[data-lucide]` agregados al DOM disparan `refresh()` debounced 50ms. Cero código manual de `lucide.createIcons()` en componentes que inyectan HTML dinámicamente.

**Diseño (D)**:
- Glossary categorizado por dominio (Navigation / Actions / States / Channels / Money / CRM / AI / Theme)
- Naming consistente camelCase para keys
- Brand-neutral: WhatsApp icon es `message-circle-more` (no el logo verde) — alineado con nuestra política de no atar formularios a un canal específico

**Migración (M)**: ningún cambio destructivo. `data-lucide="X"` directo sigue funcionando. Los componentes existentes pueden migrar a usar `AltorraIcons.canonical` gradualmente.

**Archivos**: `js/icons.js` (new), `admin.html` (script tag), `service-worker.js`, `js/cache-manager.js`.

**Pasos para probar**:
1. Consola admin: `AltorraIcons.canonical` → ver el glossary completo
2. Inyectar `<i data-lucide="' + AltorraIcons.canonical.crm + '"></i>` → renderiza users-round
3. Crear un elemento con `<i data-lucide="bot"></i>` y appendChild al body → MutationObserver auto-refresca, no hay que llamar nada
4. `AltorraIcons.svg('check')` → string SVG listo para innerHTML

---

### Microfase T.8 — High-contrast mode WCAG AAA ✓ COMPLETADA (2026-05-05)

**Por qué**: WCAG AAA exige contrast ratio 7:1 mínimo (vs AA's 4.5:1). El tema dark default cumple AA. T.8 agrega un modo "alto contraste" para usuarios con baja visión, presbiosis, deuteranopía, o entornos con luz solar fuerte (Cartagena).

**Cambios en `tokens.css`** ([data-theme="high-contrast"]):

| Token | Valor | Ratio vs `--bg-base: #000000` |
|---|---|---|
| `--text-primary: #ffffff` | blanco puro | **21:1** ✅ AAA |
| `--text-secondary: #ffffff` | blanco puro (sin grises) | **21:1** ✅ AAA |
| `--text-tertiary: #e5e5e5` | gris claro | **17:1** ✅ AAA |
| `--text-disabled: #a0a0a0` | gris medio | **7.5:1** ✅ AAA |
| `--brand-primary: #ffd84d` | dorado alta luminancia | **14.5:1** ✅ AAA |
| `--status-success: #4ade80` | verde brillante | **11:1** ✅ AAA |
| `--status-warning: #facc15` | amarillo | **14:1** ✅ AAA |
| `--status-danger: #ff6b6b` | rojo coral | **8:1** ✅ AAA |
| `--status-info: #60a5fa` | azul claro | **7.5:1** ✅ AAA |
| `--accent-ai: #c084fc` | magenta | **7.6:1** ✅ AAA |

**Cambios estructurales en high-contrast**:
- Sombras (`--shadow-md` etc.) → reemplazadas por **bordes visibles** (`0 0 0 2px var(--border-strong)`) porque las sombras fallan en AAA — no aportan contraste suficiente para usuarios que no pueden percibirlas
- Bordes default tomar valor blanco puro (no rgba semi-transparente)
- Backgrounds de status tienen alpha 0.20 (más visibles)
- `--shadow-focus-ring`: 4px gold + 2px black outer (doble ring para visibilidad extrema)
- `[data-theme="high-contrast"] a` → `text-decoration: underline` forzado (links discoverable sin depender solo del color)
- `*:focus-visible` → `outline: 3px solid` con offset (no shadow ring — outline es más respetado por UAs)
- Gradientes brand → solid color (gradients pueden reducir contraste percibido)

**Auto-detección**:
- `@media (prefers-contrast: more)` aplica overrides parciales si el OS lo pide Y el usuario no tiene tema explícito
- En Mac: System Settings → Display → "Increase contrast"
- En Windows: Settings → Accessibility → "Contrast themes"

**JS extension** (`js/theme-switcher.js`):
- `AltorraTheme.toggleHighContrast()` — alterna entre tema actual ↔ high-contrast (recuerda el previo)
- `AltorraTheme.isHighContrast()` — query
- `AltorraTheme.bindHighContrastToggle(el)` — auto-bind con `aria-pressed` + tooltip dinámico
- Auto-bind a `[data-altorra-contrast-toggle]`

**UI** (admin header): nuevo botón con icono `contrast` separado del theme toggle. `aria-pressed` indica estado on/off.

**Diseño (D)**:
- Toggle separado del light/dark — high-contrast es accessibility, no preference estética
- Icon `contrast` (mitad luna mitad sol) semánticamente claro
- Tooltip dinámico: "Activar alto contraste (WCAG AAA)" / "Desactivar alto contraste"

**Migración (M)**: ningún breaking change. Tema dark/light siguen funcionando idéntico. High-contrast solo aplica si el usuario lo pide explícitamente o el OS lo solicita y no hay otra preferencia.

**Archivos**: `css/tokens.css`, `js/theme-switcher.js`, `admin.html`.

**Pasos para probar**:
1. Click el botón `contrast` en el header → toda la UI cambia a black/white con bordes blancos
2. DevTools → Lighthouse → Accessibility → ratio de contraste = AAA en todo
3. Tab por la página → outlines amarillos extra-visibles
4. Click el botón otra vez → vuelve al tema previo
5. Mac: System Prefs → Display → Increase Contrast (sin elegir tema explícito en la app) → high-contrast activa solo

---

## ✓ BLOQUE T COMPLETADO (8/8 microfases)

Estado del Design System al cerrar el bloque T:
- ✅ T.1 — Design Tokens (10 categorías, ~150 variables)
- ✅ T.2 — Component Library (12 core components con variantes)
- ✅ T.3 — Storybook lite en `admin/_components.html`
- ✅ T.4 — Light/Dark toggle real con persistencia 3-layer
- ✅ T.5 — Animation system (utility classes + stagger + view-transitions)
- ⏸️ T.6 — Migración masiva del admin a tokens (queda parcial — alto riesgo, se hará incremental durante bloques B-U)
- ✅ T.7 — Icon registry semántico + AltorraIcons helper
- ✅ T.8 — High-contrast WCAG AAA con toggle separado

**Próximo bloque: B — Sidebar reorganizado + Workspaces**

---

### Microfase B.1 — Sidebar reorganizado en 7 grupos collapsables ✓ COMPLETADA (2026-05-05)

**Por qué**: el sidebar tenía 16 ítems planos sin agrupación. El admin se sentía disperso. B.1 agrupa por dominio en 7 grupos (8º Calendario en bloque D), con expand/collapse persistente, keyboard navigation, y color accents por workspace.

**Estructura nueva**:

```
🏠 Inicio                      [standalone]
🚗 Inventario [gold]
   ├ Vehículos
   ├ Marcas
   ├ Aliados
   ├ Banners
   └ Reseñas
💬 Comunicaciones [green]
   ├ Bandeja  (era 'appointments')
   ├ Mensajes vehículo  (era 'inbox')
   └ Leads (legacy)  (era 'lists')
👥 CRM [blue]
   └ Contactos 360°
📅 Calendario [violet]          [Pronto — bloque D]
   └ Vista calendario           [disabled placeholder]
⚡ Automatización [orange]
   ├ Reglas
   └ Plantillas
📊 Reportes [cyan]              [Pronto — bloque O]
   └ Dashboard ejecutivo        [disabled placeholder]
⚙️ Configuración [neutral]
   ├ Usuarios
   ├ Auditoría
   └ Ajustes
```

**Cambios en `admin.html`**: ~80 líneas de sidebar viejas reemplazadas por estructura de grupos.

**Cada grupo**:
- `<div class="nav-group" data-group="xxx" data-workspace-color="yyy">`
- Header `<button class="nav-group-header">` con icono + label + chevron + `aria-expanded`/`aria-controls`
- Items `<div class="nav-group-items">` con los `<button class="nav-item">` dentro

**Comportamiento**:
- Click en header → expand/collapse con animación max-height + chevron rotation
- Estado persistido en `localStorage.altorra-sidebar-<group>` per-group ('0'|'1')
- Auto-expande el grupo del item activo al cargar (ej: si la sección actual es "vehicles", el grupo Inventario se abre)
- MutationObserver: cuando otro código pone `.active` en un nav-item, el grupo padre se auto-expande

**Keyboard nav**:
- Arrow Up/Down: navega entre items focusables (incluye headers)
- Home/End: salta al primer/último
- Enter/Space en header: toggle (default button behavior)

**Workspace color accents**:
- 7 colores semánticos: gold (Inventario), green (Comms), blue (CRM), violet (Calendar), orange (Automation), cyan (Reports), neutral (Config)
- Hover sobre group icon → adopta el color del workspace
- Item activo dentro del grupo → border-left de 2px del color
- Esto va a tomar más prominencia en B.5 cuando agreguemos branding completo

**Mobile**: padding reducido en items para preservar espacio. Grupos siguen siendo collapsables.

**Diseño (D)**:
- Headers en uppercase con letter-spacing wide (look "label" no "menu item")
- Chevron 90° → 0° con `--ease-snap`
- Items dentro indented 14px (vs 12px antes) para crear jerarquía visual clara
- Disabled placeholders con opacity 0.5 + tooltip "Pronto"

**Migración (M)**: cero cambios destructivos en data-section. Las secciones existentes (`vehicles`, `appointments`, `crm`, etc.) siguen funcionando idéntico — solo cambia su agrupación visual. B.3 agregará aliases legacy para secciones renombradas.

**Archivos**: `admin.html`, `css/admin.css`, `js/admin-sidebar.js` (new), `service-worker.js`, `js/cache-manager.js`.

**Pasos para probar**:
1. Login admin → sidebar muestra 7 grupos colapsables (4 abiertos, 3 cerrados por default)
2. Click en header de "Comunicaciones" → colapsa con animación
3. Recargar la página → estado persiste
4. Tab por la sidebar → keyboard nav funciona, focus rings visibles
5. Click en "Vehículos" → grupo Inventario se queda abierto, item se marca activo, border-left dorado
6. DevTools → en consola: `AltorraSidebar.toggle('crm')` → grupo CRM se cierra

---

### Microfase B.2 — Workspace pattern reutilizable ✓ COMPLETADA (2026-05-05)

**Por qué**: cada sección del admin tiene su propia mini-página con título, breadcrumb, acciones, tabs, cuerpo. Hoy cada una usa estilos ad-hoc. B.2 crea un patrón reusable `.alt-workspace` que toda sección puede adoptar para sentirse parte del mismo sistema.

**Lo que se creó** (`css/components.css`):

```html
<div class="alt-workspace" data-workspace-color="green">
  <header class="alt-workspace-header">
    <div class="alt-workspace-title-row">
      <div>
        <nav class="alt-workspace-breadcrumb">
          <span>Comunicaciones</span><span>/</span><span>Bandeja</span>
        </nav>
        <h1 class="alt-workspace-title">Bandeja unificada</h1>
        <p class="alt-workspace-subtitle">...</p>
      </div>
      <div class="alt-workspace-actions">
        <button class="alt-btn alt-btn--primary">Nueva</button>
      </div>
    </div>
    <nav class="alt-workspace-tabs alt-tabs alt-tabs--pills" role="tablist">
      <button class="alt-tab" aria-selected="true">Todos</button>
      ...
    </nav>
  </header>
  <main class="alt-workspace-body">
    ...
  </main>
</div>
```

**Características**:

1. **Header con accent color**: borde superior 3px que toma `--ws-accent` según `data-workspace-color`. Sutil gradiente top-down para profundidad.
2. **Breadcrumb** (uppercase + letter-spacing wide): orienta al admin sobre dónde está.
3. **Title + Subtitle**: jerárquico, con `font-size-2xl` para el title y `--font-size-sm` color tertiary para el subtitle.
4. **Actions row**: alineadas a la derecha en desktop, full-width stack en mobile.
5. **Tabs slot**: usa `.alt-tabs` (T.2) — tanto default como `--pills` variant.
6. **Body**: contenedor `flex: 1` para el contenido específico de cada workspace.
7. **Workspace colors** (alineados con sidebar B.1): gold/green/blue/violet/orange/cyan/neutral.
8. **Mobile**: title-row se apila vertical, actions full-width.

**Storybook** (`admin/_components.html`): nueva sección "Workspace pattern" con ejemplo completo de Comunicaciones-Bandeja para QA visual.

**Diseño (D)**:
- Header se "extiende" al ancho del padre (margin negativo) para dar look de "cabezera oficial" y no de simple título embebido
- Breadcrumb subtle, no compite con title
- Tabs separados del content por padding vertical
- 7 colores workspace permiten distinción visual instantánea sin sobrecargar

**Migración (M)**: ningún breaking change. Las secciones existentes seguirán funcionando con sus estilos legacy hasta que las migremos en bloques específicos (Comunicaciones en su propio bloque, CRM en F, etc.).

**Archivos**: `css/components.css`, `admin/_components.html`, `service-worker.js`, `js/cache-manager.js`.

**Pasos para probar**:
1. Abrir `admin/_components.html` → bajar hasta sección "Workspace pattern"
2. Ver header verde con breadcrumb + title + subtitle + actions + 4 tabs (Todos/Citas/Solicitudes/Leads)
3. Cambiar `data-workspace-color="green"` → `"gold"` en consola → header acent cambia a dorado
4. Toggle theme → workspace adapta colores sin código extra

---

### Microfase B.3 — Section router + aliases + hash deep-linking ✓ COMPLETADA (2026-05-05)

**Por qué**: cuando bloques futuros (E, D, etc.) renombren secciones, los deep-links viejos van a romperse. B.3 establece un router central con aliases que mantiene compat hacia atrás. Además agrega hash deep-linking (`/admin#/crm`) y un registro de metadata de cada sección para uso futuro (command palette P.4, búsqueda global).

**Lo que se creó** (`js/admin-section-router.js`):

1. **Aliases map** (`ALIASES`): vacío por ahora, pero documentado con ejemplos de futuros renames:
   ```js
   // Cuando bloque E ship:
   //   'appointments': 'comunicaciones'
   //   'inbox': 'mensajes'
   //   'lists': 'leads'
   ```
   Cuando una sección se rename, agregás la entrada aquí — los deep-links viejos siguen funcionando.

2. **REGISTRY** con metadata canónica de las 15 secciones existentes: `{label, group, icon}`. Usado por:
   - Command palette futuro (P.4) para autocomplete
   - Search global para sugerir resultados
   - Analytics para reportes de uso

3. **`go(section)`**: navegación programática. Resuelve aliases, valida disabled, dispara click en el nav-item correcto.

4. **Hash deep-linking**:
   - URL `/admin#/crm` al cargar → navega a CRM section automáticamente
   - Click en nav-item actualiza el hash (sin scroll jump)
   - `hashchange` event listener para back/forward del browser
   - Usa `history.replaceState` para no llenar el history stack

5. **`onChange(fn)`**: subscribe events. Otros módulos pueden reaccionar (ej: cargar datos lazy cuando se abre una sección).

6. **Click interceptor (capture phase)**: si algún elemento dispara click con `data-section="legacy-name"`, el router lo resuelve a la canonical antes del handler default.

7. **MutationObserver sobre `.section`**: detecta cuándo otra parte del código cambia la sección activa y dispara el evento change.

**Diseño (D)**: invisible al usuario — todo el efecto es hacer el sistema más robusto. Único cambio observable: ahora la URL refleja la sección actual y se puede compartir.

**Migración (M)**: arquitectura para futuro. Cuando bloques posteriores renombren secciones, este es el lugar central donde se agregan aliases.

**Archivos**: `js/admin-section-router.js` (new), `admin.html`, `service-worker.js`, `js/cache-manager.js`.

**Pasos para probar**:
1. Login admin → click "Vehículos" en sidebar → URL cambia a `#/vehicles`
2. Recargar la página → vuelve a Vehículos automáticamente
3. Compartir URL → otra pestaña abre directo en Vehículos
4. Consola: `AltorraSections.go('crm')` → navega a CRM
5. Consola: `AltorraSections.registry` → metadata de las 15 secciones
6. Consola: `AltorraSections.onChange((s, prev) => console.log('changed:', prev, '→', s))` + click otra sección

---

### Microfase B.4 — Sidebar global collapse + atajos teclado ✓ COMPLETADA (2026-05-05)

**Por qué**: power users quieren más espacio para el contenido. Sidebar full toma 240px que en monitores pequeños molesta. B.4 agrega modo "icon-only" (56px) con tooltips on hover.

**Cambios**:

1. **Botón collapse en logo del sidebar**: ícono `panel-left-close` (rota 180° al colapsar). Posición absoluta en el área del logo. Tooltip "⌘+B".

2. **Modo colapsado** (CSS `body.sidebar-collapsed`):
   - Sidebar pasa de 240px a 56px con transición smooth
   - Hidden: labels, chevrons, badges, profile info, group group-label, divider, logo h2/small
   - Visible: solo iconos, centrados
   - Hover sobre nav-item → tooltip lateral muestra el aria-label (CSS pure via `::after`)

3. **Persistencia**: `localStorage.altorra-sidebar-collapsed` = `'0'` | `'1'`. Restaurado al cargar.

4. **Keyboard shortcut**: `⌘+B` (Mac) o `Ctrl+B` (Win/Linux) toggle collapse. No dispara si el foco está en input/textarea/contenteditable (no interrumpe escritura).

5. **`syncAriaLabels()`**: lee el `<span>` de texto de cada nav-item y lo setea como `aria-label` del button. Esto:
   - Hace los tooltips de collapsed-mode funcionar (CSS lee `attr(aria-label)`)
   - Mejora accesibilidad para screen readers

6. **Mobile** (`<768px`): collapse button hidden — mobile usa drawer pattern (otro UX, fuera de scope de B.4).

7. **Public API extension**: `AltorraSidebar.toggleCollapsed()`, `setCollapsed(bool)`, `isCollapsed()`.

**Diseño (D)**:
- Animación `--ease-snap` en width transition (smooth, no jank)
- Icon rotation 180° marca el estado on/off claramente
- Tooltips en collapsed mode aparecen a la derecha (no se pisan con el sidebar)
- aria-label dinámico ("Colapsar sidebar" / "Expandir sidebar")

**Migración (M)**: ningún breaking change. Sidebar funciona exactamente igual en estado expandido. Estado collapsed es opt-in por click o atajo.

**Archivos**: `admin.html`, `css/admin.css`, `js/admin-sidebar.js`.

**Pasos para probar**:
1. Login admin → click el botón de la esquina del logo del sidebar → sidebar se colapsa a iconos
2. Hover sobre un ícono → tooltip lateral con el nombre de la sección
3. Recargar la página → estado persiste
4. ⌘+B (Mac) o Ctrl+B (Win) → toggle desde teclado
5. Resize a mobile → botón se oculta (no aplica en mobile)
6. Tab por la sidebar → focus rings funcionan tanto en colapsado como expandido

---

### Microfase B.5 — Workspace branding completo en secciones existentes ✓ COMPLETADA (2026-05-05)

**Por qué**: B.1 estableció los colores en el sidebar. B.2 los hizo disponibles en `.alt-workspace`. B.5 cierra el bloque B aplicando los colores a las **secciones existentes** del admin sin reescribirlas — solo agregando un `data-workspace-color` y reglas CSS que reaccionan.

**Cambios**:

1. **14 secciones marcadas con `data-workspace-color`** (script Python idempotente en el commit):
   - **gold** (Inventario): `sec-vehicles`, `sec-brands`, `sec-dealers`, `sec-banners`, `sec-reviews`
   - **green** (Comunicaciones): `sec-appointments`, `sec-inbox`, `sec-lists`
   - **blue** (CRM): `sec-crm`
   - **orange** (Automatización): `sec-automation`, `sec-templates`
   - **neutral** (Configuración): `sec-users`, `sec-audit`, `sec-settings`
   - `sec-dashboard` queda sin color (es Inicio, neutro)

2. **CSS en `admin.css`** (~30 líneas):
   - Variables `--ws-accent` y `--ws-accent-soft` por color
   - **3px top accent border** en `.page-header` de cada sección con color
   - **Subtle gradient** (80px de altura) bajo el header para crear "halo" del workspace
   - z-index management para que el H1 quede sobre el gradient

3. **Resultado visual**: cada sección tiene una identidad clara sin necesidad de reescribir el contenido. El admin reconoce instantáneamente "estoy en Inventario" por el accent dorado, "estoy en CRM" por el azul, etc.

**Diseño (D)**:
- Línea de 3px arriba (sutil, no chillón) marca "esta sección pertenece al workspace X"
- Gradiente decae rápido (80px) — no compite con el contenido
- Aliñado con los colores del sidebar (consistencia inmediata)
- Mantenemos el esquema existente intacto — los estilos legacy de `.page-header` siguen funcionando

**Migración (M)**: cero cambios destructivos. Solo se agregaron atributos HTML y reglas CSS adicivas. Las secciones se ven idénticas a antes excepto por la barra superior + halo sutil.

**Archivos**: `admin.html`, `css/admin.css`, `service-worker.js`, `js/cache-manager.js`.

**Pasos para probar**:
1. Click "Vehículos" en sidebar → ver barra dorada top de la sección + halo dorado sutil
2. Click "CRM" → barra azul + halo azul
3. Click "Automatización" → barra naranja
4. Click "Inicio" → sin barra (es neutral)
5. Toggle theme dark → light → high-contrast → colores se mantienen consistentes

---

## ✓ BLOQUE B COMPLETADO (5/5 microfases)

Estado del Sidebar + Workspaces al cerrar el bloque B:
- ✅ B.1 — Sidebar reorganizado en 7 grupos collapsables (8º Calendario placeholder)
- ✅ B.2 — Workspace pattern reutilizable (.alt-workspace component)
- ✅ B.3 — Section router + aliases + hash deep-linking
- ✅ B.4 — Sidebar global collapse + Cmd+B + aria tooltips
- ✅ B.5 — Workspace branding aplicado a 14 secciones existentes

**Próximo bloque: I — Event Bus + Activity Feed (5 microfases, ~4 días)**

---

### Microfase I.1 — AltorraEventBus core ✓ COMPLETADA (2026-05-05)

**Por qué**: hoy los módulos se llaman entre sí directamente (admin-vehicles llama a admin-sync, que llama a admin-state, etc.). Resultado: acoplamiento alto, difícil agregar features cross-cutting. I.1 introduce un Event Bus central — todos los módulos emiten eventos cuando pasan cosas, y los demás los escuchan declarativamente.

**Lo que se creó** (`js/event-bus.js`):

**API pública** (`window.AltorraEventBus`):
- `emit(type, payload, opts)` — dispara evento. `opts.persist: true` lo guarda en Firestore `events/`
- `on(pattern, handler)` — subscribe. Retorna unsubscribe fn
  - `on('vehicle.created', fn)` — match exacto
  - `on('vehicle.', fn)` — prefix (cualquier `vehicle.*`)
  - `on('*', fn)` — wildcard (todos)
- `once(pattern, handler)` — auto-unsubscribe tras primer fire
- `off(pattern, handler)` — quitar listener
- `history(filter)` — buffer in-memory de últimos 200 eventos (para I.5 replay)
- `clear()` — wipe history

**Convenios de naming**: `domain.action`
- `vehicle.created`, `vehicle.updated`, `vehicle.priced`, `vehicle.sold`
- `comm.created`, `comm.assigned`, `comm.estado-changed`, `comm.replied`
- `crm.contact-created`, `crm.score-changed`, `crm.tag-added`
- `appointment.confirmed`, `appointment.cancelled`, `appointment.no-show`
- `user.logged-in`, `user.logged-out`, `user.role-changed`
- `ui.section-changed`, `ui.modal-opened`

**Estructura del evento**:
```js
{
    id: 'evt_<timestamp>_<rand>',
    type: 'vehicle.created',
    payload: { ...whatever },
    timestamp: 1234567890,
    by: 'uid-del-usuario',
    bySource: 'admin' | 'public' | 'system'
}
```

**Mecanismos de delivery** (orden):
1. **History ring buffer** (cap 200, in-memory) → para I.5 replay
2. **Direct listeners** (exact match)
3. **Prefix listeners** (`vehicle.` capta todo `vehicle.*`)
4. **Wildcard listeners** (`*` capta TODO)
5. **DOM CustomEvent** `altorra:<type>` → `window.dispatchEvent` para listeners no-imported
6. **Firestore persist** si `opts.persist === true` → `events/{id}` para Activity Feed (I.2) y replay (I.5)

**Performance**:
- listeners: `Map<string, Set<fn>>` para O(1) lookup
- history: array con shift al cap → O(1) amortizado
- Persistence opt-in: solo eventos importantes pegan a Firestore

**Tolerancia a errores**: cada handler envuelto en try/catch — un listener fallando no rompe el bus ni a los demás.

**Convenience globals**: `window.altorraEmit(type, payload)` y `window.altorraOn(pattern, fn)` como atajos para uso rápido.

**Cargado early** en admin.html — antes de cualquier admin-* module — para que TODO el código posterior pueda emit/listen.

**Diseño (D)**: API liviana, similar a EventEmitter de Node + DOM EventTarget. Familiar para devs JS.

**Migración (M)**: ningún breaking change. CustomEvents existentes (`favoritesChanged`) siguen funcionando. Migración a EventBus se hará incrementalmente (módulos opt-in cuando se refactoricen en sus bloques específicos).

**Archivos**: `js/event-bus.js` (new), `admin.html` (script tag), `service-worker.js`, `js/cache-manager.js`.

**Pasos para probar**:
1. Login admin → consola → `AltorraEventBus._setDebug(true)`
2. `AltorraEventBus.on('test.', e => console.log('got:', e))` → suscribe a prefix
3. `AltorraEventBus.emit('test.hello', { msg: 'hi' })` → ver el evento en consola
4. `AltorraEventBus.history()` → ver buffer de eventos recientes
5. `window.addEventListener('altorra:test.hello', e => console.log('DOM:', e.detail))` + emit → recibe vía CustomEvent
6. `AltorraEventBus.emit('test.persist', {}, {persist: true})` → ver doc en Firestore `events/`

---

### Microfase I.2 — Activity Feed sliding panel ✓ COMPLETADA (2026-05-05)

**Por qué**: I.1 emite eventos pero nadie los ve. I.2 da un panel deslizable estilo Slack que muestra TODA la actividad en tiempo real — qué hicieron otros admins, qué eventos están pasando en el sistema, con filtros para enfocarse.

**Lo que se creó** (`js/admin-activity-feed.js`):

1. **Botón trigger en admin header**: ícono `activity` (electrocardiograma). Click → abre el panel.
2. **Panel deslizable** desde la derecha (380px desktop / full mobile):
   - Header con título + count de eventos visibles + botón cerrar
   - Toolbar con dropdown de filtros + botón "Limpiar" feed local
   - Lista scrolleable de entries
3. **Cada entry** muestra:
   - Icon coloreado por dominio (gold=vehicle, green=comm, blue=crm, violet=appointment, orange=workflow, cyan=test, neutral=user/ui/system)
   - Domain pill (ej: VEHICLE) + acción humana (ej: "Created", "Estado-changed")
   - Detail line con title/name/vehiculo/id del payload
   - Timestamp relativo ("hace 2m") + bySource (admin/public/system)
   - Animación slide-in-right al aparecer
4. **Filtros**: Todo / Solo admin / Solo cliente / por dominio (vehicle/comm/crm/appointment/user/ui/workflow/concierge).
5. **Time-tick**: cada 30s actualiza los timestamps relativos sin re-fetch.

**Sources del feed**:
- **AltorraEventBus.on('*')** — eventos emitidos en la sesión actual
- **Firestore `events/`** — eventos persistidos por OTROS admins/devices (lazy: solo se suscribe cuando el panel está abierto Y el user es super_admin para ahorrar reads)
- Pre-populate desde `AltorraEventBus.history()` al cargar — entries ya están si el bus tenía cosas

**Performance**:
- MAX_VISIBLE 100 (older shifted out)
- Firestore listener cancelado al cerrar el panel
- Render con `slice().reverse()` (newest first) sin mutar el array
- MutationObserver de Lucide (de T.7) auto-refresca íconos

**Firestore rules** agregadas para `events/{eventId}`: read si autenticado, create si autenticado (admin o cliente), immutable, delete solo super_admin.

**Diseño (D)**:
- Top accent border dorado en header (consistente con workspace pattern B.2)
- Cada entry con border subtle + hover lift
- Color por domain matching los workspaces del sidebar
- Empty state con icon `inbox-x` opacity 0.4 + microcopy "Los eventos aparecen aquí en tiempo real"
- Esc cierra el panel

**Migración (M)**: cero breaking. La rule `events/` es nueva — requiere `firebase deploy --only firestore:rules` para activar persistencia. Sin eso, los eventos se ven solo en in-memory feed (todavía utilizable).

**Archivos**: `js/admin-activity-feed.js` (new), `admin.html` (trigger + script), `css/admin.css` (~150 líneas), `firestore.rules`, `service-worker.js`, `js/cache-manager.js`.

**Pasos para probar**:
1. Login admin → click el ícono `activity` en el header → panel se desliza
2. Consola: `AltorraEventBus.emit('vehicle.created', { name: 'Mazda CX-5' })` → entry aparece con animación
3. `AltorraEventBus.emit('crm.score-changed', { id: 'abc', from: 50, to: 78 })` → entry azul
4. Cambiar filtro a "Vehículos" → solo eventos `vehicle.*`
5. Click "Limpiar" → feed local se vacía
6. Esc → panel cierra

> **DEPLOY MANUAL**: `firebase deploy --only firestore:rules` para activar persistencia cross-device.

### Microfase I.3 — Cross-module EventBus emitters ✓ COMPLETADA (2026-05-05)

**Objetivo**: el bus existe (I.1) y el feed lo escucha (I.2), pero hasta
ahora ningún módulo emitía eventos. I.3 instrumenta los puntos críticos
del admin para que el feed muestre actividad real, y deja el terreno
listo para que Bloque K (workflows) los use como triggers.

**Eventos emitidos** (canónica `dominio.acción`, 8 tipos):

| Evento | Origen | Cuándo |
|---|---|---|
| `ui.section-changed` | `js/admin-section-router.js` `notifyChange()` | Usuario navega entre secciones del admin |
| `vehicle.created` | `js/admin-vehicles.js` (post `writeAuditLog`) | Nuevo vehículo guardado |
| `vehicle.updated` | `js/admin-vehicles.js` (post `writeAuditLog`) | Vehículo editado |
| `vehicle.deleted` | `js/admin-vehicles.js` (post delete) | Vehículo borrado |
| `comm.created` | `js/admin-appointments.js` `detectAdminNewSolicitudes` | Nueva solicitud/cita pendiente entra al sistema |
| `comm.estado-changed` | `js/admin-appointments.js` (saveAppStatusBtn) | Admin cambia el estado de una comunicación |
| `comm.deleted` | `js/admin-appointments.js` (deleteAppointment) | Solicitud/cita eliminada |
| `user.logged-in` | `js/admin-auth.js` `showAdmin()` | Admin entra al panel |
| `user.logged-out` | `js/admin-auth.js` logoutBtn | Admin cierra sesión (emit ANTES de signOut) |

**Payloads canónicos**: cada emit incluye los campos mínimos para que el
feed renderice una tarjeta legible (`title`, `id`/`uid`, contexto del
dominio). Bloque K (workflows) consumirá los mismos payloads vía
`AltorraEventBus.on('vehicle.*', ...)` sin necesitar reformatear nada.

**Por qué `user.logged-out` se emite ANTES de signOut**: una vez que
`signOut()` resuelve, el listener de Firestore en el feed (I.2) ya está
desautenticado y no puede persistir el evento al servidor. Emitir
sincrónicamente antes garantiza que (a) los listeners locales lo ven con
auth todavía activo y (b) la persistencia condicional vía
`{persist: true}` (cuando se active) llegue al servidor con un token
válido.

**Por qué `crm.score-changed` NO se emite todavía**: el score actual
en `js/admin-crm.js` se computa on-the-fly en cada render
(`computeScore(c)` línea 178), no en respuesta a un cambio. Emitirlo en
render generaría ruido constante. El evento se reserva para Bloque Q
(Knowledge Graph) donde tendremos un pipeline real de recompute.

**Por qué `vehicle.featured-toggled` NO se emite**: el toggle de
destacado pasa por el mismo `vehicle.updated` con campos `destacado` y
`featuredOrder` en el payload — un solo evento por write es la
convención. Suscriptores que solo miran destacados pueden filtrar por
`payload.destacado !== payload._previous.destacado` cuando agreguemos
diff metadata en I.4.

**Compatibilidad con I.2**: el feed ya tenía soporte para todos los
dominios (`vehicle`, `comm`, `user`, `ui`, `crm`) en su mapa de
colores y filtros. No requirió cambios. Cada emit aparece
inmediatamente en el panel del super_admin como una tarjeta nueva al
tope.

**Pasos de prueba (manual, en `admin.html`)**:
1. Abrir el Activity Feed (icono campana grande en header)
2. Navegar a otra sección → aparece tarjeta `ui.section-changed` con
   label "Inicio → Vehículos"
3. Crear un vehículo nuevo → tarjeta `vehicle.created` con
   `marca modelo year` y `codigoUnico`
4. Editar ese vehículo → `vehicle.updated`
5. Cambiar estado de una solicitud pendiente → `comm.estado-changed`
   con `pendiente → contactado`
6. Cerrar sesión → `user.logged-out` (visible si tienes el feed abierto
   antes del click)

**Anti-patterns evitados**:

| Riesgo | Mitigación |
|---|---|
| Logout emite con auth ya muerta → persist falla | Emit ANTES de `auth.signOut()` |
| Multiple emits por una sola acción admin (e.g. dirty check) | Emit en el callsite POST-write éxito (post-auditLog), no en intent |
| Emit dentro de loops (`forEach`) sin throttle | Solo emits puntuales por acción del usuario, no en bucles |
| Score recompute on-render emitiría 100/seg | `crm.score-changed` deferido a Bloque Q |
| Payload sin contexto humano legible | Cada payload incluye `title` precomputado |
| Bus indefinido en page load temprano | Guard `if (window.AltorraEventBus)` antes de cada emit |

**Deuda técnica para I.4**:
- Diff metadata (`_previous`) en `vehicle.updated` y `comm.estado-changed`
  para que workflows puedan detectar transiciones específicas
- Source meta (`bySource: 'admin'|'public'|'system'`) automático en
  todos los emits para que el feed lo filtre sin lógica per-evento

**Archivos modificados**:
- `js/admin-section-router.js` — emit en `notifyChange()`
- `js/admin-vehicles.js` — 3 emits (created, updated, deleted)
- `js/admin-appointments.js` — 3 emits (created, estado-changed, deleted)
- `js/admin-auth.js` — 2 emits (logged-in, logged-out)
- `service-worker.js` + `js/cache-manager.js` — version bump v20260505150000

### Microfase I.4 — Diff metadata en payloads + transition rendering ✓ COMPLETADA (2026-05-05)

**Objetivo**: convertir los emits de I.3 de "algo cambió" a "X → Y", de
modo que (a) el Activity Feed muestre transiciones legibles ("estado:
pendiente → contactado", "precio: $76M → $72M (↓5%)") y (b) los
workflows del Bloque K puedan disparar reglas tipo "cuando estado
cambie a contactado, asigna asesor". El bus ya auto-llenaba `bySource`
desde I.1 (línea 65 de event-bus.js detecta `window.AP` o
`/admin/` en URL); I.4 cierra el lado de la convención del payload.

**Convención canónica `_previous`**:

Cualquier emit que represente un update DEBE incluir `payload._previous`
con el subset de campos relevantes ANTES del cambio. El feed lo lee
para renderizar la línea de diff. Workflows futuros lo usarán para
matching:

```js
AltorraEventBus.on('vehicle.updated', function (event) {
    var prev = event.payload._previous;
    if (prev && prev.estado === 'disponible' && event.payload.estado === 'reservado') {
        // → trigger workflow "vehiculo recién reservado"
    }
});
```

**Cambios aplicados**:

1. **`js/admin-vehicles.js` `vehicle.updated`** — captura snapshot del
   doc viejo (precio, precioOferta, estado, destacado) ANTES de que
   AP.vehicles se actualice por el listener Firestore. El emit envía
   `_previous: { precio, precioOferta, estado, destacado }`.

2. **`js/admin-appointments.js` `comm.estado-changed`** — agrega
   `_previous: { estado: prevEstado }` además de mantener los aliases
   legacy `estadoNuevo`/`estadoPrevio` para subscribers que ya los leían.

3. **`js/admin-section-router.js` `ui.section-changed`** — agrega
   `_previous: { section: prev }` y un `title` precomputado de la
   forma "Inicio → Vehículos" para que la card del feed se lea sola
   sin llegar al renderer de diffs (los cambios de UI no necesitan la
   caja monospace).

4. **`js/admin-activity-feed.js`** — nuevo helper `diffSummary(type, payload)`
   que detecta:
   - **Estado transition**: `estado: pendiente → contactado`
   - **Precio change**: `precio: $76M → $72M (↓5%)` con cálculo de %
   - **Destacado toggle**: `marcado destacado` o `sin destacar`
   `humanizeAction()` ahora retorna también `.diff` y `renderEntry()`
   inyecta `<div class="aaf-entry-diff">` cuando hay contenido.

5. **`css/admin.css`** — nueva regla `.aaf-entry-diff` con fondo dorado
   tenue (8% alpha), border-left de acento, monospace para los
   números, padding cómodo. Visualmente distinta de `.aaf-entry-detail`
   (que sigue siendo el subtítulo gris).

**Helper `fmtPriceShort(n)`**: formato compacto $76M / $1.2M / $850K
para que la línea de diff quepa en el panel de 380px sin wrappear.
Usa `Math.round(n / 1e5) / 10` para 1 decimal en millones (78.5M).

**Por qué `bySource` no necesita cambio**: ya estaba auto en I.1.
`_bySource()` retorna `'admin'` si existe `window.AP`, `'public'` si
no. Bloque K cuando agregue triggers automáticos pasará explícitamente
`{bySource: 'system'}` en el `opts`.

**Pasos de prueba**:
1. Abrir admin → Activity Feed
2. Editar un vehículo: cambiar precio de 76M a 72M, marcar destacado
3. Guardar → tarjeta `vehicle.updated` muestra:
   - Detalle: "Toyota Hilux 2020"
   - Diff (caja dorada monospace): `precio: $76M → $72M (↓5%) · marcado destacado`
4. Cambiar estado de una solicitud `pendiente → contactado`
5. Tarjeta `comm.estado-changed` muestra:
   - Detalle: "Daniel — Toyota Hilux"
   - Diff: `estado: pendiente → contactado`
6. Navegar Inicio → Vehículos → tarjeta `ui.section-changed` muestra:
   - Detalle: "Inicio → Vehículos" (en línea de detalle gris, no en diff
     box — convención: navegación = detalle, datos = diff)

**Anti-patterns evitados**:

| Riesgo | Mitigación |
|---|---|
| `_previous` enviado en creación (no aplica) | Sólo se setea en branch `if (isEdit)` |
| Diff falso por strict equality en numbers/strings con tipos mezclados | Comparación con `!==` después de chequear `null` explícitamente |
| Snapshot tomado DESPUÉS del save (Firestore listener ya actualizó AP) | Captura ANTES con `find(parseInt(existingId))` mientras el evento aún no llegó por onSnapshot |
| Rendering de números enormes desbordando el panel | `fmtPriceShort()` compacta a M/K |
| Backward compat con subscribers viejos | Aliases `estadoNuevo`/`estadoPrevio` preservados en payload |
| Diff box que aparece vacía | Render condicional `(human.diff ? '<div...>...</div>' : '')` |

**Archivos modificados**:
- `js/admin-vehicles.js` — agrega `_previous` snapshot en vehicle.updated
- `js/admin-appointments.js` — agrega `_previous: {estado}` en comm.estado-changed
- `js/admin-section-router.js` — agrega title precomputado y `_previous: {section}`
- `js/admin-activity-feed.js` — `diffSummary()` + `fmtPriceShort()` + render `.aaf-entry-diff`
- `css/admin.css` — `.aaf-entry-diff` styles (gold-tinted monospace block)
- `service-worker.js` + `js/cache-manager.js` — version bump v20260505160000

---

## 13.ter Comunicaciones + CRM v2 (Plan MF1-MF6, 2026-05-04)

> Refactor profundo del sistema de formularios, comunicaciones y leads.
> Inspirado en Bitrix24, Mercately, PlanOK, Carcutter y CarroYa.
> Reemplaza el patron "redirect a WhatsApp" por una experiencia
> moderna estilo SaaS con CRM, kanban, lead scoring, automatizacion.

> **NOTA**: este plan v2 fue parcialmente shipped (28 microfases, ver
> §13.quater "Por qué v4"). v4 lo reemplaza con arquitectura unificada.
> El contenido aquí queda como histórico.

### Microfase MF1.1 — userId + auto-fill + source tracking ✓ COMPLETADA (2026-05-04)

**Problema raiz que arregla**: el solicitudes-watcher (Pillar D) filtraba `where email == user.email`. Si el usuario logueado tipeaba un email distinto en el form (o lo dejaba vacio → "No proporcionado"), el listener no matcheaba y nunca llegaba la notificacion al cliente. Ademas no habia atribucion (de que pagina/CTA vino el lead).

**Cambios** en los 4 formularios publicos (Vende Auto, Financiacion, Contacto, Cita por vehiculo):

1. **Identidad sintetica en cada submission**:
   ```js
   {
       userId: registered ? user.uid : null,         // null para guests
       userEmail: registered ? user.email : null,    // separado del email de contacto
       clientCategory: 'registered' | 'guest'
   }
   ```

2. **Auto-fill desde el usuario logueado** (no destructivo — solo rellena campos vacios):
   - Sync inmediato: `displayName`, `email` desde Firebase Auth
   - Async enrich: `telefono`, `prefijo` desde `clientes/{uid}` Firestore
   - Foco va al primer campo vacio (skip campos pre-rellenados)

3. **Source/device tracking**:
   ```js
   {
       source: { page, cta, referrer },               // ej: { page: 'detalle-vehiculo', cta: 'btn-agendar-cita', referrer: 'busqueda.html' }
       device: { type: 'mobile'|'desktop', browser, os }
   }
   ```

4. **Solicitudes-watcher refactorizado** para filtrar por `userId` Y `email` (dos listeners paralelos con dedup por docId interno):
   - Un listener: `where userId == user.uid` (post-MF1.1, confiable)
   - Otro listener: `where email == user.email` (legacy docs sin userId)
   - `processSnapshot()` ahora usa `docChanges()` y es additivo (no clobbering entre listeners)
   - `_state.unsubs[]` reemplaza `_state.unsub` para manejar multiples listeners

5. **Anti-impersonation en Firestore rules**:
   ```
   allow create: if (
       !('userId' in request.resource.data)
       || request.resource.data.userId == null
       || (request.auth != null && request.resource.data.userId == request.auth.uid)
   );
   ```
   Si `userId` esta presente, debe coincidir con `request.auth.uid`. Atacante no puede crear solicitudes a nombre de otro usuario.

**Archivos modificados**: `js/contact-forms.js`, `js/contact.js`, `js/citas.js`, `js/solicitudes-watcher.js`, `firestore.rules`, `service-worker.js`, `js/cache-manager.js`

**Pasos para probar**:
1. **Sin login**: abrir Vende tu Auto → llenar → enviar. En Firestore Console verificar `userId == null`, `clientCategory == 'guest'`, `source.page == 'index.html'`, `source.cta == 'vende_auto_form'`.
2. **Logueado**: recargar → abrir Vende tu Auto. Campos `nombre`, `email`, `telefono` aparecen pre-rellenados. Enviar → verificar `userId == auth.uid`, `clientCategory == 'registered'`.
3. **Test 3 ahora funciona**: como cliente registrado, enviar solicitud → admin cambia estado a `contactado` → cliente recibe toast + entrada en bell sin recargar.
4. **Anti-impersonation**: en consola, intentar `db.collection('solicitudes').add({userId: 'OTRO-UID', ...})` → falla con `permission-denied`.
5. **Verificar dos listeners**: en `AltorraSolWatcher._state.unsubs.length` debe ser 2 (uid + email).

> **DEPLOY MANUAL REQUERIDO**: `firebase deploy --only firestore:rules` para activar la regla anti-impersonation.

### Microfase MF2.1 — Vende Auto + Financiación: confirmación in-place ✓ COMPLETADA (2026-05-04)

**Problema raiz**: ambos formularios cerraban el modal y abrian `wa.me/...` en una nueva pestana con un mensaje pre-rellenado. Anti-patron documentado en CLAUDE.md §13.ter:
- Si el usuario cancela el envio en WhatsApp, el lead queda registrado pero sin contexto
- Experiencia disonante: el usuario no sabia si su solicitud se guardo
- Fricciona la conversion (cambio de app)

**Cambios aplicados** (`js/contact-forms.js` + `css/contact-forms.css`):

1. **`window.open(whatsappUrl)` eliminado** de los dos handlers (`handleVendeAutoSubmit` + `handleFinanciacionSubmit`)
2. **Nuevo helper `_renderSuccess(modalId, opts)`**: reemplaza el contenido de `.modal-container` (no solo `.modal-body` — desaparece tambien header + progress) con una pantalla de confirmacion limpia
3. **Ticket de seguimiento**: el `ref.id` retornado por `Firestore.add()` se trunca a 6 chars uppercase y se muestra como `Tu nº de seguimiento: ABC123`
4. **CTA secundario para registrados**: si `_currentUser()` no es null, ademas del boton "Entendido" aparece "Ver mis solicitudes" → `perfil.html#mis-solicitudes`
5. **Restore al reabrir**: `_restoreOriginalContent(modalId)` se llama en `openModal()` antes de inicializar wizard. Cachea el HTML original en `container._originalContent` la primera vez que se muestra el success
6. **Manejo de error**: si Firestore falla (red, rules), se muestra `notify.error(...)` con mensaje claro y el modal queda en su estado anterior (form intacto, no se cierra)

**UI** (CSS nuevo `.contact-success*`):
- Icono check verde con animacion pop (cubic-bezier spring)
- Titulo grande, subtitulo personalizado con primer nombre
- Mensaje contextual al tipo de form
- Pill dorado con ticket
- Botones primary (dorado) + ghost (Ver mis solicitudes)
- Respeta `prefers-reduced-motion`
- Mobile: botones full-width stack vertical

**Mensajes contextuales**:
- Vende Auto: "Recibimos los datos de tu vehículo. Un asesor te contactará pronto por correo y WhatsApp para coordinar la valuación."
- Financiación: "Un asesor revisará tu información y te contactará pronto por correo y WhatsApp con la propuesta de financiación."

**Pasos para probar**:
1. Abrir Vende tu Auto → llenar wizard 3 pasos → Enviar
2. Verificar que **NO se abre WhatsApp**
3. Modal cambia a pantalla de confirmacion con check verde, ticket de 6 chars
4. Verificar Firestore Console que el doc se creo
5. Cerrar modal → reabrir → ver formulario limpio (no la pantalla de confirmacion)
6. Mismo para Financiacion
7. Logueado: aparece boton "Ver mis solicitudes" que linkea al perfil
8. Sin login: solo aparece "Entendido"
9. Forzar error de red (DevTools → Offline) → enviar → ver toast de error, modal sigue abierto con form intacto

**Archivos modificados**: `js/contact-forms.js`, `css/contact-forms.css`, `service-worker.js`, `js/cache-manager.js`

### Microfase MF2.2 — Contacto general + Simulador de crédito ✓ COMPLETADA (2026-05-04)

**Problemas raiz**:
1. `js/contact.js` (form de `contacto.html`): tras enviar, abria WhatsApp en nueva pestana. Anti-patron documentado.
2. `simulador-credito.html` form `#contact-form`: era PEOR — **nunca guardaba a Firestore**, solo abria WhatsApp. Si el usuario cancelaba el envio, el lead se perdia completamente.

**Cambios aplicados**:

1. **`js/contact.js`**:
   - `window.open(whatsappURL)` eliminado
   - Nuevo helper `_renderContactSuccess(formCard, opts)` que reemplaza el contenido de `.form-card` (el contenedor en `contacto.html`) con la pantalla de exito
   - Smooth scroll al confirmar para que el usuario vea el cambio
   - CTAs contextuales: "Ver vehiculos" + "Ver mis solicitudes" (registrado) o "Volver al inicio" (guest)
   - Manejo de error con `notify.error` si Firestore falla

2. **`simulador-credito.html`** (handler inline):
   - Reescrito completo: ahora **guarda a `solicitudes`** con identidad MF1.1 + tracking de origen (`source.cta == 'simulador_credito_form'`)
   - Incluye `datosExtra` rico con datos del simulador (precioVehiculo, cuotaInicial, plazoMeses, cuotaMensual, tasa, ingresos, ciudad, actividad, documento, PEP)
   - Modal `.sim-modal-content` se reemplaza por la pantalla de exito al guardarse
   - Boton "Entendido" cierra el modal
   - Fallback defensivo: si Firestore SDK no esta cargado, igualmente muestra confirmacion (mejor UX que no respuesta)

3. **CSS centralizado**:
   - `.contact-success*` clases movidas de `css/contact-forms.css` a `css/style.css` para que esten disponibles en TODAS las paginas (contacto, simulador, modales, etc.)
   - Usa CSS vars (`--text-primary`, `--text-secondary`) para light/dark theme automatico
   - Mismo design system que MF2.1 — consistencia visual entre los 4 forms

**Pasos para probar**:

`contacto.html`:
1. Abrir `contacto.html` → llenar form → enviar
2. Verificar que **NO se abre WhatsApp**
3. La `.form-card` se reemplaza por la pantalla de confirmacion con scroll suave
4. Verificar Firestore Console: doc creado con `origen: 'contacto'`, `source.cta: 'contact_form_general'`
5. Logueado: aparece boton "Ver mis solicitudes"
6. Sin login: aparece "Volver al inicio"
7. Forzar offline → enviar → toast error, form sigue intacto

`simulador-credito.html`:
1. Llenar simulador con valores → click WhatsApp → llenar modal de contacto → enviar
2. Verificar que **NO se abre WhatsApp**
3. Modal se transforma en pantalla de exito con ticket #
4. Verificar Firestore: doc creado con `origen: 'simulador_credito'`, `tipo: 'financiacion'`, `datosExtra` lleno con todos los datos del simulador
5. Click "Entendido" → modal se cierra

**Archivos modificados**: `js/contact.js`, `simulador-credito.html`, `css/style.css`, `css/contact-forms.css`, `service-worker.js`, `js/cache-manager.js`

### Microfase MF1.2 — kind discriminator + per-kind state machines + migración ✓ COMPLETADA (2026-05-04)

**Problema raiz**: la coleccion `solicitudes` mezclaba citas, solicitudes y leads bajo un mismo conjunto de estados (`pendiente / confirmada / reprogramada / completada / cancelada`). Una financiacion pasaba a "reprogramada" sin sentido semantico. No habia forma limpia de filtrar por tipo de comunicacion.

**Solucion**: discriminator explicito `kind` con 3 valores y maquinas de estados independientes.

**Nuevo archivo `js/comm-schema.js`** (single source of truth, cargado en admin + paginas publicas futuras):
- `KIND_CITA = 'cita'` — requiereCita == true (test drive, llamada agendada, consulta presencial)
- `KIND_SOLICITUD = 'solicitud'` — actionable: financiacion, consignacion_venta, peritaje, compra
- `KIND_LEAD = 'lead'` — soft contact: consulta general, otro

**Estados validos por kind** (`STATES`):

| Kind | Estados validos |
|---|---|
| cita | pendiente, confirmada, reprogramada, completada, cancelada, no_show |
| solicitud | pendiente, en_revision, contactado, aprobada, rechazada, completada, sin_respuesta |
| lead | nuevo, contactado, interesado, frio, convertido, descartado |

**Mapeo legacy → nuevo** (`STATE_REMAP`):
- Para cita: estados se mantienen 1:1
- Para solicitud: `confirmada → aprobada`, `reprogramada → en_revision`, `cancelada → rechazada`
- Para lead: `pendiente → nuevo`, `confirmada → interesado`, `cancelada → descartado`, etc.

**Helpers expuestos** (`window.AltorraCommSchema.*`):
- `inferKind(doc)` — infiere kind desde `requiereCita` + `tipo`
- `remapEstado(legacyEstado, newKind)` — remap segun `STATE_REMAP`
- `isValidStateForKind(kind, estado)` — validacion
- `getDefaultState(kind)` — primer estado del array
- `STATE_LABELS`, `STATE_COLORS` para UI

**Submission writes actualizados** — los 4 forms ahora setean `kind` directamente (sin necesitar migracion):
- `contact-forms.js` Vende Auto → `kind: 'solicitud'`
- `contact-forms.js` Financiacion → `kind: 'solicitud'`
- `contact.js` Contacto general → `kind: 'solicitud'` si tipo en {venta, financiacion, peritaje}, sino `kind: 'lead'`
- `citas.js` Cita por vehiculo → `kind: 'cita'`
- `simulador-credito.html` → `kind: 'solicitud'`

**Migracion automatica** (`AP.migrateCommunicationsSchema()` en `admin-sync.js`):
- Corre una sola vez por sesion admin (`_commMigrationRan` guard)
- Solo si el rol es editor+ (writes requieren ese permiso)
- Filtra docs sin `kind`, infiere uno, remapea `estado` si es necesario
- Preserva `legacyEstado` para auditoria
- Marca `_migration_v1: true` y `_migrationAt: ISO`
- Batch de hasta 500 (limite Firestore), commits secuenciales
- Toast informativo al admin: "Esquema actualizado: 47 docs (12 citas, 23 solicitudes, 12 leads)"
- Idempotente: re-correr no toca docs ya migrados

**Pasos para probar**:
1. Login como super_admin → ver consola con `[CommMigration] Migrated N solicitudes: citas=X solicitudes=Y leads=Z`
2. Toast aparece confirmando la migracion
3. Verificar en Firestore Console que docs viejos ahora tienen `kind`, `_migration_v1: true`, `legacyEstado` preservado
4. Recargar admin → migracion no corre de nuevo (no hay docs sin kind)
5. Enviar nueva solicitud desde public site → llega con `kind` directo, sin necesidad de migracion
6. Login como editor → migracion tambien corre (si quedan docs sin kind)
7. Login como viewer → migracion NO corre (no tiene permisos para escribir)

**Archivos modificados**: `js/comm-schema.js` (nuevo), `js/admin-sync.js`, `js/admin-appointments.js`, `js/contact-forms.js`, `js/contact.js`, `js/citas.js`, `simulador-credito.html`, `admin.html`, `service-worker.js`, `js/cache-manager.js`

### Microfase MF3.1 — Solicitudes → Comunicaciones + 3 sub-tabs ✓ COMPLETADA (2026-05-04)

**Cambios visibles**:

1. **Sidebar**: el item "Solicitudes" se renombra a **"Comunicaciones"** (icono `inbox` se mantiene). El badge `navBadgeAppointments` ahora cuenta solo los items "unhandled" (pendientes/nuevos) sumados de los 3 kinds.

2. **Header de la seccion**:
   - H1: "Centro de Solicitudes" → "Centro de Comunicaciones"
   - Subtitle: "Citas, solicitudes y leads — todas las interacciones con clientes en un solo lugar"
   - CTA: "Nueva Solicitud Interna" → "Nueva Comunicación"

3. **Nueva tab strip** (`.comm-kind-tabs`) con 4 tabs:
   - **Todas** (icono `layers`) — sin filtro de kind
   - **Citas** (icono `calendar-check-2`) — filtra `kind == 'cita'`
   - **Solicitudes** (icono `file-text`) — filtra `kind == 'solicitud'`
   - **Leads** (icono `message-circle`) — filtra `kind == 'lead'`
   - Cada tab tiene un badge dorado con el contador de "unhandled" para ese kind (pendientes / nuevos)
   - Active state visual: background dorado + border dorado

4. **Implementacion**:
   - `AP._kindFilter` (default `'all'`) controla el filtro activo
   - `getKindOf(a)` lee `a.kind` o lo infiere via `AltorraCommSchema.inferKind(a)` para legacy docs aun no migrados (ya cubiertos por MF1.2)
   - `updateKindBadges()` recalcula los contadores en cada `renderAppointmentsTable`
   - Click en tab → actualiza active state + reset paginacion + re-render

5. **Compatibilidad**: el filtro de kind se aplica ANTES de los filtros existentes (estado, tipo, origen). Los filtros viejos siguen funcionando dentro del kind activo.

**Pasos para probar**:
1. Login admin → sidebar dice **"Comunicaciones"** (no "Solicitudes")
2. Click en Comunicaciones → ver header "Centro de Comunicaciones" + 4 tabs
3. Tab "Todas" muestra todos los docs (default)
4. Click "Citas" → solo aparecen docs con `kind: 'cita'` (test drives, llamadas agendadas)
5. Click "Solicitudes" → solo aparecen docs con `kind: 'solicitud'` (financiacion, consignacion, peritaje)
6. Click "Leads" → solo aparecen docs con `kind: 'lead'` (consulta general)
7. Badges muestran cantidad de pendientes/nuevos por kind
8. Filtros existentes (estado, tipo, origen) siguen funcionando dentro del kind activo
9. Mobile: tabs se ven en grid 2x2 (responsive)

**Archivos modificados**: `admin.html`, `js/admin-appointments.js`, `css/admin.css`, `service-worker.js`, `js/cache-manager.js`

### Microfase MF3.2 — Estados contextuales por kind ✓ COMPLETADA (2026-05-04)

**Problema raiz**: la dropdown de estados era hardcoded con `pendiente/confirmada/reprogramada/completada/cancelada` para TODOS los docs. Una solicitud de financiacion podia pasar a "reprogramada" sin sentido. Una cita podia ir a "aprobada" tampoco.

**Cambios aplicados**:

1. **Tabla de comunicaciones** (`renderAppointmentsTable`):
   - Badge de estado usa `AltorraCommSchema.STATE_LABELS` y `STATE_COLORS` segun el kind
   - "Reprogramada" sigue verde-info para citas; en solicitudes los estados son "Aprobada" (verde), "Rechazada" (rojo), etc.

2. **Modal de gestion** (`manageAppointment`):
   - La dropdown `#amEstado` se reconstruye dinamicamente segun el kind del doc abierto
   - Estados validos por kind:
     - **Cita**: Pendiente, Confirmada, Reprogramada, Completada, Cancelada, No asistio
     - **Solicitud**: Pendiente, En revisión, Contactado, Aprobada, Rechazada, Completada, Sin respuesta
     - **Lead**: Nuevo, Contactado, Interesado, Frío, Convertido, Descartado
   - Si el estado actual del doc no es valido para su kind (legacy no migrado): cae al default del kind
   - **Nuevo badge** (`#amKindBadge`) inyectado en el header del modal: "CITA" verde, "SOLICITUD" dorado, "LEAD" azul-purpura — visualmente claro

3. **Filtro de estados arriba de la tabla** (`#appointmentFilter`):
   - Tambien se reconstruye al cambiar de tab kind
   - "Todas" → muestra union de todos los estados (sin duplicados)
   - "Citas" → solo cita-states
   - "Solicitudes" → solo solicitud-states
   - "Leads" → solo lead-states
   - Selección actual se preserva si sigue siendo valida; sino, vuelve a "all"

4. **`toggleReprogramarGroup`** ahora chequea ambos: que `kind === 'cita'` Y `estado === 'reprogramada'`. Antes mostraba el bloque de reprogramar para CUALQUIER doc en estado "reprogramada", lo cual no se daba pero por consistencia.

**Pasos para probar**:
1. Click "Solicitudes" tab → filtro arriba ahora muestra solo: Todas, Pendiente, En revisión, Contactado, Aprobada, Rechazada, Completada, Sin respuesta
2. Abrir una solicitud de financiacion → modal muestra badge dorado "SOLICITUD" en el header + dropdown con esos mismos estados
3. Cambiar a estado "Aprobada" → guardar → cliente recibe notificacion correcta
4. Click "Citas" tab → filtro cambia a estados de cita (Pendiente, Confirmada, Reprogramada, Completada, Cancelada, No asistio)
5. Abrir una cita → badge verde "CITA" + dropdown con cita-states
6. Cambiar a "Reprogramada" → aparece el grupo de nueva fecha/hora
7. Click "Leads" → filtro muestra: Todas, Nuevo, Contactado, Interesado, Frío, Convertido, Descartado
8. Verificar que docs legacy sin kind ya migrados (MF1.2) muestran sus estados nuevos correctamente
9. Badges de la tabla coinciden con los labels nuevos

**Archivos modificados**: `js/admin-appointments.js`, `css/admin.css`, `service-worker.js`, `js/cache-manager.js`

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

#### Automatización con GitHub Actions

El script `optimize-images.mjs` ahora es **idempotente** (compara
mtime del source vs output, skip si output más nuevo) y se ejecuta
automáticamente vía workflow `.github/workflows/optimize-images.yml`.

**Triggers**:
- Push a `main` con cambios en `multimedia/heroes/`, `multimedia/categories/`,
  `multimedia/heroindex.*`, `multimedia/marcas-hero.*`, `multimedia/nosotros-hero.*`,
  o el script mismo
- `workflow_dispatch` — manual desde GitHub UI

**Pipeline**:
1. Checkout del repo
2. `npm install --no-save sharp` (sin polluir package.json en el bot run)
3. `node scripts/optimize-images.mjs` — solo procesa lo nuevo
4. Si hay cambios en `multimedia/optimized/`: bot commitea con
   `[skip ci]` y push automático

**Anti-loop**:
- `paths` filter excluye `multimedia/optimized/**` → bot commits NO
  retriggean el workflow
- Commit message lleva `[skip ci]` como failsafe extra
- GitHub policy: commits del `GITHUB_TOKEN` no triggean otros workflows

**Cómo funciona en práctica**:
1. Subes una imagen nueva a `multimedia/heroes/nuevo-hero.jpg`
2. Push a main
3. GitHub Actions detecta el cambio, corre el optimizer
4. Genera 8 variantes (AVIF + WebP × 4 tamaños) en `multimedia/optimized/`
5. Bot commitea las variantes
6. Tu HTML aún apunta al `.jpg` original — necesitas actualizar a
   `<picture>` MANUAL para que el browser use las variantes

**Pendiente futuro** (mejoras opcionales):
- Auto-update de HTMLs cuando aparece una nueva imagen optimizada
  (matchear src en HTMLs y wrappear en `<picture>` con script)
- Optimización de uploads del admin (Firebase Storage) — requeriría
  Cloud Function que corre sharp on-upload

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

---

## 17. Reglas Operativas de Performance — DEBE leerse al crear código nuevo

> Manifesto técnico para mantener la fluidez y velocidad conseguidas en
> P1-P15 + L1-L4 + Bonus B. Si vas a agregar una feature nueva (página,
> sección, modal, lista, etc.), seguí estas reglas. Romperlas reintroduce
> los problemas que ya solucionamos y degrada la UX especialmente en
> mobile y dispositivos low-end.

### 17.1 — Reglas de oro

**Para CADA cambio nuevo, antes de commit, verificá:**

1. **No agregaste `backdrop-filter` en elementos `position: fixed/sticky`**
   ni en cards de grids de N elementos. Si lo necesitás visualmente, usá
   un fondo sólido `rgba(...)` con alpha 0.92-0.97. Modales y toasts
   on-demand son la única excepción aceptable.

2. **No animaste `width`, `height`, `top`, `left`, `right`, `bottom`,
   `padding`, `margin`, `max-height`** en `transition` o `@keyframes`.
   Estas propiedades disparan **layout recalc cada frame**. Usá
   `transform` (translate/scale/rotate) y `opacity`, que son
   GPU-compositable.

3. **No agregaste un nuevo `addEventListener('scroll', ...)`** sin
   `requestAnimationFrame` y sin tracking de estado para evitar
   mutations DOM redundantes. Idealmente, integrá tu lógica al scroll
   listener único en `js/components.js` (línea ~292).

4. **No agregaste un nuevo `<link rel="stylesheet">` bloqueante** si la
   regla no es above-the-fold critical. Usá el patrón lazy:
   ```html
   <link rel="stylesheet" href="css/x.css" media="print" onload="this.media='all'">
   <noscript><link rel="stylesheet" href="css/x.css"></noscript>
   ```

5. **No agregaste un `<script src="...">` eager si la lógica no es
   crítica para first interaction.** Carga via `requestIdleCallback`
   con fallback `setTimeout`. Si el código tiene callsites síncronos,
   protegelos con `whenReady(predicate, callback, opts)` (helper en
   `components.js`). Patrón ejemplo: cookies.js, comparador.js,
   reviews.js, featured-week-banner.js (P10/P11).

6. **No agregaste una `<img>` sin `width` + `height` + `loading` +
   `decoding`**:
   - Above-fold: `loading="eager" fetchpriority="high" decoding="async"`
   - Below-fold: `loading="lazy" decoding="async"`
   - Siempre: `width="X" height="Y"` (previene CLS)

7. **No agregaste imágenes hero/categoría sin pasarlas por el
   optimizer**: subir source a `multimedia/heroes/` o
   `multimedia/categories/` → GitHub Actions `optimize-images.yml`
   las procesa automático → usá `<picture>` con AVIF + WebP + JPG
   fallback (ver Sección 16, Bonus B).

### 17.2 — CSS — qué SÍ y qué NO

✅ **Permitido sin pensar**:
- `transition: transform`, `transition: opacity`
- Animaciones `@keyframes` que solo cambian `transform` y `opacity`
- `will-change: transform` en elementos que animan (no abuses — solo
  durante la animación)
- Gradients, shadows, border-radius (estáticos)
- `contain: layout style` en cards y grids aislados (P3)
- `content-visibility: auto` con `contain-intrinsic-size` en secciones
  below-fold (P3)
- `prefers-reduced-motion: reduce` para desactivar animaciones —
  **siempre incluir** en cualquier animación nueva

❌ **Prohibido sin justificación documentada**:
- `backdrop-filter` en cualquier elemento que scrollea o es sticky/fixed
- `transition: all`
- Animar layout properties (width, height, top, left, padding, margin)
- `position: fixed` con `backdrop-filter`
- `filter: blur()` en elementos animados (excepto el lazy-image initial state)
- Múltiples `@keyframes` con `animation-iteration-count: infinite` en
  elementos siempre visibles (= GPU layers permanentes)

⚠️ **Permitido con cuidado**:
- `box-shadow` en `transition` SOLO si el elemento es de bajo-conteo
  (no aplicar a 30 cards en grid, sí aplicar a 1 hero CTA)
- `filter: drop-shadow` (más caro que `box-shadow`, evitá en grids)

### 17.3 — JavaScript — qué SÍ y qué NO

✅ **Permitido**:
- `defer` en todos los `<script>` que no necesiten ejecutarse durante
  HTML parse
- `requestIdleCallback` para inicializaciones no críticas
- `IntersectionObserver` para detección de viewport (NO para elementos
  con `display:none` — IO no los observa, ver Bug 2 del fix mobile load)
- `requestAnimationFrame` para sincronizar con frame del browser
- `passive: true` en listeners de `scroll`, `touchstart`, `touchmove`,
  `wheel` (cuando no se llama `preventDefault`)
- Async/await + try/catch
- Event delegation (un listener en parent, NO uno por hijo)

❌ **Prohibido**:
- `setInterval` en alta frecuencia (>10 fps). Usá `requestAnimationFrame`
- Listeners de scroll que muten el DOM cada frame sin
  state-tracking (causa repaints inútiles — ver P2)
- Crear `<img>` dinámicos sin `loading="lazy" decoding="async"`
- Cargar Firestore data en bloque sin cache local (siempre tirar del
  cache primero, refrescar en background — ver pattern de
  `vehicleDB.load()`)
- Asumir que `vehicleDB.load()` retornó success cuando `vehicles=[]`.
  **Siempre** verificar `vehicleDB._loadError` antes de hacer
  `hideParentSection()`. Si error: `scheduleSectionRetry(key, fn)`
  (helper en main.js)

⚠️ **Cuidado con**:
- Llamar Firestore en initial load — usar `Promise.all([...].catch())`
  para que un fallo no cascade a otras secciones
- Logs ruidosos en producción — usar `if (this.DEBUG) console.log(...)`
  para gates manuales

### 17.4 — HTML — qué SÍ y qué NO

✅ **Imágenes**:
- Hero/banner: `<picture>` con `<source type="image/avif">` y
  `<source type="image/webp">` (variantes en `multimedia/optimized/`),
  `<img>` con `width`/`height`/`fetchpriority`/`loading`/`decoding`
- Cards: solo `<img>` con `loading="lazy" decoding="async"` y
  `width`/`height`
- Tamaños: ahora 480w, 768w, 1280w, 1920w son los breakpoints estándar
  del optimizer

✅ **Resource hints**:
- `<link rel="preload" as="image" href="..." fetchpriority="high">`
  para LCP image
- `<link rel="preconnect" href="https://...">` para CDN externos críticos
- `<link rel="prefetch" href="...">` SOLO para top 1-3 páginas más
  visitadas (homepage tiene SUV, marcas, contacto pre-fetched)

❌ **Anti-patterns**:
- `<style>` blocks gigantes inline (>10KB) — extrae a un archivo
- `onclick="..."` inline (vulnerabilidad XSS + sin event delegation)
- `<img>` sin atributos modernos (lazy, async, dimensions)
- Hardcoded URLs absolutas a Firebase Storage en vez de usar el SDK

### 17.5 — Imágenes / Multimedia

**Para CADA imagen nueva del sitio:**

1. **¿Es above-fold (hero, banner principal)?**
   → Subir a `multimedia/heroes/` o `multimedia/categories/`.
   Workflow `optimize-images.yml` la procesa automático.
   Update HTML con `<picture>`:
   ```html
   <picture>
       <source type="image/avif" srcset="
           multimedia/optimized/foo-480.avif 480w,
           multimedia/optimized/foo-768.avif 768w,
           multimedia/optimized/foo-1280.avif 1280w,
           multimedia/optimized/foo-1920.avif 1920w" sizes="100vw">
       <source type="image/webp" srcset="..." sizes="100vw">
       <img src="multimedia/heroes/foo.jpg" alt="..."
            width="1920" height="800"
            fetchpriority="high" loading="eager" decoding="async">
   </picture>
   ```

2. **¿Es de un vehículo (admin upload)?**
   → Sirve desde Firebase Storage tal cual. **Pendiente**: Cloud
   Function que optimice on-upload.

3. **¿Es un logo, badge, icono pequeño?**
   → Mantener WebP o SVG según el caso. No requiere optimization
   adicional (ya pequeñas).

4. **¿Es una imagen decorativa (background, pattern)?**
   → Considerar gradient CSS si es posible (cero KB). Si no,
   WebP optimizada manual.

### 17.6 — Loading orchestration (Sprint L1-L4)

Para CADA página nueva, asegurar:

1. **Critical CSS inline** (~5KB) en `<head>` con header + hero base
2. **Page-loader** mostrado al inicio, dismissed por
   `dismissPageLoader()` o el fallback de `components.js`
3. **`body.loaded`** se aplica al dismissar el loader → trigger para
   sequential reveal animations
4. **Stagger reveal** de above-fold elements (badge → title → CTA →
   etc.) con `animation-delay` escalonado
5. **Skeleton screens** mientras se cargan datos (no spinners
   genéricos) — ver `showLoading()` en render.js
6. **Section reveal** below-fold via `.auto-reveal` (auto-instrumentado
   por performance.js — solo asegurate que tu nueva sección use clases
   que el observer detecta: `.section-header`, `.commercial-card`,
   etc.)

### 17.7 — Service Worker + Cache

Si modificás archivos que afectan el cache:

1. **Bumpear `service-worker.js` `CACHE_VERSION`** con timestamp
2. **Bumpear `js/cache-manager.js` `APP_VERSION`** matched al SW
3. Las HTMLs cacheadas en clientes se invalidan automáticamente
   (cache-manager detecta el version bump)

Cuándo NO bumpear: cambios solo a `js/admin-*.js` (no afectan público),
o solo a `data/*.json` que ya está en `Network Only`.

### 17.8 — Listas y grids

Si vas a renderizar una lista de N elementos (>5):

1. **Usá `<ul>`/`<ol>` con event delegation** (un listener en `<ul>`,
   no uno por `<li>`)
2. **`content-visibility: auto`** + `contain-intrinsic-size` en cada
   item — el browser skip-renderiza items below-fold (P3)
3. **`contain: layout style`** en cada item — aísla layout
4. **Stagger fade-in** en los primeros 6 items con `animation-delay`
   (L2.1) — items 7+ no se animan (skipped por content-visibility)
5. **Skeleton placeholders** mientras carga (forma del item final, no
   spinner)

### 17.9 — Network requests

1. **Cache local primero, network second**:
   ```js
   var cached = localStorage.getItem(KEY);
   if (cached) renderImmediate(JSON.parse(cached));
   fetchFromFirestore().then(fresh => {
       renderUpdated(fresh);
       localStorage.setItem(KEY, JSON.stringify(fresh));
   });
   ```
2. **Stale cache fallback** si network falla (ver `vehicleDB.load()`
   STEP 3 que usa stale cache si todo lo demás falla)
3. **Retry con backoff exponencial** (5s, 10s, 15s, max 3 attempts)
   en errores transitorios — usá `scheduleSectionRetry(key, fn)`
4. **Distinguir empty vs error**: `vehicleDB._loadError` flag indica
   que vehicles=[] es por error de red, no porque no haya inventory.
   No ocultes secciones por error.

### 17.10 — Mobile-first y compatibilidad

Para CADA componente nuevo:

1. Probar en mobile breakpoints (320px, 480px, 768px) con DevTools
   device toolbar
2. **`prefers-reduced-motion: reduce`** desactiva tus animaciones
3. **Touch events** con `passive: true` (no preventDefault)
4. **Pointer-events** correctos — modales con `pointer-events: none`
   en idle state, `auto` en active
5. **Tap target** mínimo 44×44px (Apple HIG) para touch UX

### 17.11 — Cuando hagas algo nuevo

**Checklist antes de commit**:

- [ ] El código respeta los patrones de las secciones 17.1 a 17.10
- [ ] Probé en mobile breakpoints (al menos 480px)
- [ ] Cero errores en consola del browser
- [ ] DevTools → Performance: scroll suave (60fps)
- [ ] DevTools → Network: si la feature carga assets, son lazy/optimizados
- [ ] DevTools → Lighthouse: CLS < 0.1, LCP < 2.5s
- [ ] `prefers-reduced-motion` desactiva animaciones
- [ ] Si tocaste estructura de cache: bumped SW + APP_VERSION
- [ ] Si agregaste nueva imagen hero: pasó por el optimizer

### 17.12 — Anti-patterns identificados (NO repetir)

Lista corta de cosas que YA fixeamos y deberían quedar fixeadas:

| Anti-pattern | Por qué falla | Sección que lo arregló |
|---|---|---|
| `backdrop-filter: blur()` en `#header` fixed | Repinta GPU cada frame de scroll | P1 |
| 2 listeners `scroll` en paralelo | Repaints duplicados | P2 |
| `transition: left` en menús/shines | Layout recalc cada frame | P4, P13 |
| 22 `<link>` blocking en `<head>` | TTFP +800ms | P5 |
| `transition: all` en elementos animados | Anima props caros sin querer | 17.2 |
| `vehicleDB.load()` retorna `[]` → `hideParentSection()` | Sección oculta para siempre por error transitorio | Bug fix mobile |
| IntersectionObserver en elemento `display:none` | IO no observa display:none | Bug fix mobile |
| `<img>` sin `width/height` | CLS layout shift cuando carga | Bonus B.1 |
| Hero JPG 412KB sin variantes | LCP lento en mobile | Bonus B.2 |
| Logo del page-loader 412KB PNG | Critical asset gigante | (pendiente — sigue siendo PNG) |

### 17.13 — Cuando dudes, preguntá

Si no estás seguro de si algo afectará la performance:

1. Buscá en CLAUDE.md secciones 15, 16, 17 patrones similares
2. Mirá `css/performance-fixes.css` — todas las decisiones de perf
   están comentadas con razón
3. Mirá los commits con prefix `P1`, `P2`, ..., `L1.x`, `Bonus B` —
   cada uno explica el problema + fix
4. En la duda, **agrega un comentario** en el código explicando
   por qué tomaste la decisión que tomaste

**Recordatorio final**: el sitio se siente fluido HOY porque hicimos
~25 cambios coordinados. Un solo cambio descuidado puede regresar
60fps a 20fps. Cada PR debería preservar lo conseguido.

---

## 18. Tareas Pendientes — Cuando Compres Dominio Custom

> Esta seccion documenta tareas que requieren un pre-requisito externo
> (compra de dominio) y por lo tanto no se pueden ejecutar HOY desde
> el repo. Cuando llegue el momento, seguir los pasos al pie de la letra.

### 18.1 — Eliminacion de COOP warnings via dominio + Cloudflare

**Estado**: PENDIENTE — esperando compra de dominio en Hostinger.

**Problema que resuelve**: Los unicos warnings que quedan en consola
son del Cross-Origin-Opener-Policy de Chrome cuando Firebase abre la
popup de Google sign-in:

```
Cross-Origin-Opener-Policy policy would block the window.closed call (popup.ts:302)
Cross-Origin-Opener-Policy policy would block the window.close call  (popup.ts:50)
```

**Por que aparecen**: Firebase's `signInWithPopup` hace polling cada
50ms a `window.closed` para detectar si el usuario cerro la popup.
Chrome's COOP isolation bloquea esas lecturas cross-origin. El login
FUNCIONA NORMALMENTE — son warnings cosmeticos, no errores funcionales.

**Por que no se puede arreglar HOY**: GitHub Pages no permite configurar
headers HTTP custom. Se necesita el header:
```
Cross-Origin-Opener-Policy: same-origin-allow-popups
```

**Solucion elegida (Opcion B — re-validada 2026-05-04 con Opus 4.7)**:

GitHub Pages + dominio custom de Hostinger + Cloudflare Free como CDN/proxy.
Cloudflare agrega los headers HTTP que GitHub Pages no permite.

**Por que Opcion B vence a las alternativas**:

| Opcion | Veredicto | Razon |
|--------|-----------|-------|
| A — Hostinger hosting + .htaccess | RECHAZADA | TTFB shared hosting 200-500ms, romperia el workflow de `generate-vehicles.yml`, perderia deploy-on-push de GitHub |
| **B — GitHub Pages + Cloudflare** | **ELEGIDA** | Cero disrupcion al CI/CD, Cloudflare Free tier ahora incluye Transform Rules, edge CDN global gratis, reversible en 30 seg |
| C — Migrar a Vercel/Netlify | RECHAZADA | Requiere reconfiguracion completa del workflow, free tier limitado a 100GB/mes (Cloudflare es ilimitado en este uso) |

**Beneficios secundarios gratuitos al usar Cloudflare**:
- TTFB global 30-80ms (vs 200-500ms de Hostinger shared)
- 200+ POPs edge en todo el mundo
- DDoS protection automatica
- HTTP/3 support
- Brotli compression edge-side
- SSL/TLS gratis
- Cache control mas potente que GitHub Pages
- Bot protection
- Analytics gratis (privacy-friendly, sin cookies)

### 18.2 — Pasos detallados para configurar Cloudflare (NO ejecutar todavia)

**Pre-requisito**: tener el dominio comprado en Hostinger (ej: `altorracars.com`).

#### Paso 1 — Crear cuenta Cloudflare (gratis)

1. Ir a https://dash.cloudflare.com/sign-up
2. Registrarse con email (no requiere tarjeta para Free tier)
3. Click en "Add a Site"
4. Ingresar el dominio (ej: `altorracars.com`)
5. Seleccionar **Free plan** ($0/mes)

#### Paso 2 — Cambiar nameservers en Hostinger

Cloudflare dara 2 nameservers durante el setup (ej: `lara.ns.cloudflare.com`,
`xavier.ns.cloudflare.com` — los nombres varian).

1. Ir al panel de Hostinger → Dominios → DNS / Nameservers
2. Cambiar de "Hostinger Default" a "Custom" / "External"
3. Pegar los 2 nameservers de Cloudflare
4. Guardar
5. Esperar propagacion DNS (15 min - 48h, tipicamente <1h)
6. Cloudflare enviara email cuando detecte los NS correctos

#### Paso 3 — Configurar DNS en Cloudflare

Cloudflare auto-detecta records existentes. Agregar (o verificar):

| Type | Name | Content | Proxy status |
|------|------|---------|--------------|
| CNAME | `@` | `altorracars.github.io` | Proxied (orange cloud) |
| CNAME | `www` | `altorracars.github.io` | Proxied (orange cloud) |

**IMPORTANTE**: el orange cloud (proxied) es lo que activa Cloudflare
como CDN/proxy. Sin esto, los headers no se aplican.

#### Paso 4 — Configurar GitHub Pages

1. En el repo: `altorracars/altorracars.github.io` → Settings → Pages
2. Custom domain: ingresar `altorracars.com` (sin https://, sin /)
3. Click Save
4. Crear archivo `CNAME` en la raiz del repo con una sola linea:
   ```
   altorracars.com
   ```
5. Commit y push
6. GitHub verificara el dominio (puede tomar minutos)
7. **NO marcar** "Enforce HTTPS" todavia — Cloudflare lo manejara

#### Paso 5 — Configurar SSL/TLS en Cloudflare

**CRITICO**: el modo SSL incorrecto rompe el sitio.

1. Cloudflare → SSL/TLS → Overview
2. Cambiar a **"Full"** (NO "Flexible" — Flexible rompe GitHub Pages HTTPS)
3. Edge Certificates → habilitar:
   - Always Use HTTPS: ON
   - Automatic HTTPS Rewrites: ON
   - Minimum TLS Version: 1.2
   - TLS 1.3: ON

#### Paso 6 — Agregar el header COOP via Transform Rules

Esto es lo que elimina los COOP warnings.

1. Cloudflare → Rules → Transform Rules → Modify Response Header
2. Click "Create rule"
3. Rule name: `Add COOP header for Firebase popup`
4. Custom filter expression: `(http.host eq "altorracars.com" or http.host eq "www.altorracars.com")`
5. Then... → Modify response header → Set static
   - Header name: `Cross-Origin-Opener-Policy`
   - Value: `same-origin-allow-popups`
6. Click Save and Deploy

#### Paso 7 — (Opcional) Headers adicionales de seguridad

Mientras estas en Transform Rules, considerar agregar (en la misma rule
o en otra nueva):

| Header | Value | Beneficio |
|--------|-------|-----------|
| `Cross-Origin-Opener-Policy` | `same-origin-allow-popups` | **Requerido** — elimina COOP warnings |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` | HSTS — fuerza HTTPS por 1 año |
| `X-Content-Type-Options` | `nosniff` | Previene MIME sniffing attacks |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Privacidad en links salientes |
| `Permissions-Policy` | `geolocation=(), camera=(), microphone=()` | Desactiva APIs no usadas |

**NO agregar `Content-Security-Policy`** sin testear en staging — es
restrictivo y puede romper inline scripts existentes.

#### Paso 8 — Actualizar Firebase Auth domain

1. Firebase Console → Authentication → Settings → Authorized domains
2. Click "Add domain"
3. Agregar: `altorracars.com` y `www.altorracars.com`
4. (Opcional) Mantener `altorracars.github.io` para fallback durante migracion

#### Paso 9 — Actualizar Google OAuth (GIS)

1. Google Cloud Console → APIs & Services → Credentials
2. Click en el "Web client (auto created by Google Service)"
3. Authorized JavaScript origins: agregar `https://altorracars.com` y `https://www.altorracars.com`
4. Authorized redirect URIs: agregar mismas URLs
5. Save

#### Paso 10 — Validar todo end-to-end

Despues de propagacion DNS completa:

- [ ] `https://altorracars.com` carga el sitio
- [ ] `https://www.altorracars.com` redirige a `altorracars.com` (configurar en Cloudflare → Page Rules si no lo hace auto)
- [ ] Console del navegador: cero COOP warnings al hacer Google sign-in
- [ ] Console: One Tap aparece en homepage para users con sesion Google
- [ ] Login con email/password funciona
- [ ] Registro funciona
- [ ] Reset password funciona
- [ ] Firestore reads/writes funcionan
- [ ] Firebase Storage uploads (avatar) funcionan
- [ ] Service Worker registra correctamente
- [ ] Sitemap accesible: `https://altorracars.com/sitemap.xml`
- [ ] robots.txt accesible
- [ ] DevTools → Network: response headers incluyen `Cross-Origin-Opener-Policy: same-origin-allow-popups`

#### Paso 11 — Forzar HTTPS en GitHub

Una vez que TODO funcione con Cloudflare:

1. GitHub Pages → Enforce HTTPS → marcar
2. Esto añade redirect 301 de http → https a nivel GitHub

### 18.3 — Errores comunes y troubleshooting

| Sintoma | Causa | Fix |
|---------|-------|-----|
| Loop infinito de redirects | SSL en Flexible | Cambiar a Full en Cloudflare |
| Mixed content warnings | Algun asset hardcoded a http:// | Buscar y reemplazar a https:// o protocolo-relativo |
| 522 Connection Timed Out | DNS aun propagandose | Esperar mas, usar `dig altorracars.com` para verificar |
| Headers no aparecen en Response | DNS record no esta proxied | Activar orange cloud en Cloudflare DNS |
| Firebase Auth: "auth/unauthorized-domain" | Olvidar agregar dominio en Firebase | Paso 8 |
| Google sign-in: "redirect_uri_mismatch" | Olvidar agregar en Google Cloud Console | Paso 9 |
| Sitemap retorna 404 | Cloudflare cachea version vieja | Cloudflare → Caching → Purge Everything |

### 18.4 — Como reactivar diagnostico GIS

Si despues de mover a custom domain hay problemas con Google sign-in:

```js
// En consola del navegador
AltorraAuth.resetGisState();
// Limpia localStorage flags y recarga la pagina
```

Esto resetea el flag `altorra_gis_blocked` (6h TTL) que recuerda
fallos de FedCM, y borra el cooldown de One Tap (`altorra_onetap_dismiss`).

### 18.5 — Que NO arregla la migracion a dominio custom

Para gestionar expectativas, esto **NO** se elimina con dominio + Cloudflare:

1. **`enableMultiTabIndexedDbPersistence is deprecated`** — limitacion
   del Firebase Compat SDK. Solucion seria migrar a SDK modular
   (refactor masivo de ~50 archivos). No prioritario; warning es
   cosmetico.

2. **Logs `[DB] Real-time listeners started/stopped`** — comportamiento
   normal del ciclo auth. Son INFO (verde), no errores. Util para
   diagnostico. Si molestan, se pueden silenciar con `if (this.DEBUG)`
   gates en `database.js`.

3. **Logs `Firebase deferred SDKs loaded`** — confirmacion legitima
   del lazy-load. Util para diagnostico.

### 18.6 — Costo total y tiempos

| Item | Costo | Tiempo |
|------|-------|--------|
| Dominio en Hostinger | ~$10-15/año (.com) | 5 min compra |
| Cloudflare Free | $0 | 10 min setup |
| DNS propagation | $0 | 15 min - 48h (tipico <1h) |
| GitHub Pages custom domain | $0 | 5 min setup |
| Validacion end-to-end | $0 | 30 min testing |
| **TOTAL** | **~$10-15/año** | **~1-2 horas** ejecucion + propagacion |

### 18.7 — Rollback plan (si algo se rompe)

Si algo sale mal en cualquier punto, el rollback es trivial:

1. **Rollback rapido (Cloudflare proxy off)**:
   - Cloudflare → DNS → click el orange cloud → cambia a gray (DNS only)
   - El trafico va directo a GitHub Pages, sin Cloudflare
   - Cloudflare deja de aplicar los headers, pero el sitio funciona

2. **Rollback completo (volver al dominio github.io)**:
   - GitHub Pages → Settings → Custom domain → vaciar campo
   - Borrar archivo `CNAME` del repo
   - El sitio vuelve a `altorracars.github.io`
   - Cloudflare puede quedarse sin uso o cancelarse

3. **DNS rollback (volver a nameservers de Hostinger)**:
   - Hostinger → Dominios → DNS → cambiar de Custom a Default
   - El dominio ya no resolvera al sitio, pero esto NO afecta a
     `altorracars.github.io` que sigue funcionando

**Tip**: hacer la migracion en horario de bajo trafico (madrugada
hora Colombia) para minimizar impacto si algo falla.

### 18.8 — Validacion post-migracion (checklist final)

Una semana despues de la migracion, verificar:

- [ ] Console del navegador 100% limpia (cero COOP warnings)
- [ ] Lighthouse score: igual o mejor que antes
- [ ] Web Vitals (LCP, CLS, FID): igual o mejor
- [ ] Cloudflare Analytics: no hay spike de errores 5xx
- [ ] Firebase Analytics: no hay caida en sesiones
- [ ] Google Search Console: sitemap accesible, no errores de crawl
- [ ] Tests manuales en mobile + desktop + Safari + Firefox

---

> **Para Claude**: Cuando el usuario diga que ya compro el dominio en
> Hostinger, leer esta seccion completa antes de empezar y seguir los
> pasos en orden. NO saltarse el paso de SSL Full (Paso 5) — es la
> causa #1 de problemas. Confirmar con el usuario en cada paso critico
> antes de proceder.
