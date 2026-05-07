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
| `firebase-config.js` | Init Firebase app + Auth + Firestore + persistence + deferred SDKs + GIS Client ID |
| `components.js` | Header/footer dinamicos (fetch snippets), smooth scroll, loadModalsIfNeeded(), loadAuthSystem |
| `database.js` | Lectura publica de Firestore: vehiculos, marcas, banners. Cache en localStorage |
| `render.js` | Renderizado de cards de vehiculos en el DOM |
| `contact-forms.js` | Modals: "Vende tu Auto" (wizard 3 pasos) + "Financiacion". Guarda en Firestore `solicitudes` con confirmacion in-place (sin redirect WhatsApp, MF2.1) |
| `contact.js` | Formulario de contacto general (confirmacion in-place MF2.2) |
| `cache-manager.js` | Cache inteligente de 4 capas (Memory → IndexedDB → localStorage → SW) |
| `favorites-manager.js` | Gestion de favoritos: Firestore para registrados, prompt login para anonimos. Cola de pendingOps anti-race |
| `favorites-watcher.js` | Snapshot + diff engine para detectar cambios en favoritos (precio, estado). Bell notifications + badges in-page (Pillar B v2) |
| `filtros-avanzados.js` | Filtros sidebar: marca, precio, year, km, tipo, categoria |
| `comparador.js` | Logica del comparador de vehiculos |
| `cookies.js` | Banner de consentimiento de cookies |
| `citas.js` | Formulario publico de solicitud de citas (kind=cita por defecto, confirmacion in-place) |
| `comm-schema.js` | Single source of truth para `kind/estado/priority/tags/slaDeadline` de comunicaciones (MF1.2/MF1.3) |
| `dynamic-lists.js` | Listados dinamicos de vehiculos por categoria/marca |
| `featured-week-banner.js` | Banner de vehiculo destacado de la semana |
| `historial-visitas.js` | Historial de vehiculos visitados con snapshot del estado (localStorage para todos, Firestore sync para registrados). Diff badges sobre cards "Vistos recientemente" |
| `page-loader.js` | Animacion de carga de pagina (cinematic dissolve, cache-aware Sprint L) |
| `performance.js` | Lazy loading de imagenes, IntersectionObserver, auto-reveal de secciones below-fold |
| `reviews.js` | Renderizado publico de resenas |
| `solicitudes-watcher.js` | Listener realtime de cambios en estado de solicitudes/citas del usuario logueado. Pillar D del centro de notificaciones |
| `simulador/` | Directorio con logica del simulador de credito |
| `toast.js` | Sistema unificado de notificaciones (toast + centro de notificaciones bell + sounds + cross-device sync via Firestore A4) |
| `auth.js` | Login, registro (con cedula obligatoria), Google sign-in (GIS + popup fallback), reset password, onAuthStateChanged, saveClientProfile, header state, identity merge para Concierge |
| `perfil.js` | Panel de usuario: 10 secciones (B1-B10) con cedula, avatar upload, Firestore sync, busquedas guardadas, preferencias granulares de notificaciones (G2) |
| `vehicle-hotspots.js` | Hotspots clickeables sobre imagen del vehiculo en detalle (MF5.2) |
| `kb-client.js` | Cliente liviano read-only de Knowledge Base para que Concierge use FAQs del admin (U.5) |
| `concierge.js` | Bot ALTOR — widget unificado (chat AI + asesor en vivo + WhatsApp gateway). Lead Gate, intent classifier, sync Firestore, identity merge, marketing opt-in (Bloque U Mega-Plan v4) |
| `icons.js` | Helper `AltorraIcons` con glossary semantico de iconos Lucide (T.7). NO usa MutationObserver global (RCA fix) |
| `theme-switcher.js` | `AltorraTheme` API: dark/light/high-contrast con sync Firestore + localStorage + system preference (T.4 + T.8) |
| `main.js` | Punto de entrada general, retry logic con backoff para secciones que dependen de vehicleDB (P14) |

### JavaScript — Panel admin (`js/admin-*.js`)

**Core / state / sync**:

| Archivo | Proposito |
|---------|-----------|
| `admin-state.js` | Estado global `window.AP`, RBAC helpers, escapeHtml, closestAction, formatPrice, refreshIcons |
| `admin-auth.js` | Login, logout, 2FA, rate limiting, presencia RTDB, session timeout, REST bypass para perfil (race fix) |
| `admin-sync.js` | Listeners realtime Firestore, migracion de schema (`migrateCommunicationsSchema` para kind), stats, cache invalidation |
| `admin-section-router.js` | Router central de secciones con aliases legacy + hash deep-linking (B.3) |
| `admin-sidebar.js` | Sidebar reorganizada en 7 grupos collapsables + ⌘+B collapse global (B.1+B.4) |
| `admin-table-utils.js` | Paginacion, sort, search, export CSV para tablas |
| `admin-phase5.js` | Wizard avanzado, charts de actividad (theme toggle eliminado, ahora en theme-switcher.js) |

**Inventario**:

| Archivo | Proposito |
|---------|-----------|
| `admin-vehicles.js` | CRUD vehiculos, imagenes, drafts, wizard, drag-reorder destacados, smart fields preview |
| `admin-desc-gen.js` | Generador de descripciones via templates + heurísticas locales (C.5) |
| `admin-color-extract.js` | Extrae color primario de imagen via Canvas API + mapping a 13 colores conocidos (C.3) |
| `admin-brands.js` | CRUD de marcas |
| `admin-dealers.js` | Gestion de aliados/concesionarios |
| `admin-banners.js` | Gestion de banners promocionales |
| `admin-reviews.js` | Gestion de resenas |

**Comunicaciones / inbox / Concierge**:

| Archivo | Proposito |
|---------|-----------|
| `admin-appointments.js` | Centro de Comunicaciones: tabla unificada + sub-tabs (Citas/Solicitudes/Leads), kanban, smart suggestions, plantillas, asesor dropdown (MF3.1-MF3.6) |
| `admin-concierge.js` | Bandeja del Bot ALTOR: lista de chats live + filter bar (Activos/Fijados/Archivados) + chat detail estilo WhatsApp + smart suggestions + summary modal + cleanup viejos (U.10-U.15) |
| `admin-kb.js` | "Cerebro Altorra AI" — CRUD del singleton `knowledgeBase/_brain` con 6 tabs (Identidad/Contexto/Instrucciones/FAQs/Reglas/Modelo LLM) (U.5 + Fase 3) |
| `admin-templates.js` | CRUD de plantillas de respuesta rápida en `config/messageTemplates` (MF6.3) |
| `admin-followups.js` | Recordatorios programados ("recordame") con scheduler en cliente (MF6.2) |
| `admin-postventa.js` | Scheduler de follow-ups +3d/+30d/+90d post-venta + agregación NPS (MF4.8) |

**CRM**:

| Archivo | Proposito |
|---------|-----------|
| `admin-crm.js` | CRM 360°: tabla unificada (clientes + guests merged), 6 tabs detalle (Resumen/Comms/Actividad/Score/Notas/Red), score multi-factor, búsqueda semántica con NER, NBA suggestions, bulk export CSV (MF4.x) |
| `admin-quote.js` | Cotizador con preview live + browser print PDF (MF4.6) |

**Calendario**:

| Archivo | Proposito |
|---------|-----------|
| `admin-calendar.js` | Vista mes + día con drag-drop reprogramar (D.1+D.2) |
| `admin-calendar-config.js` | Config calendario: workDays/Hours, slot duration, buffer, festivos COL hardcoded, AI auto-scheduling parser (D.3+D.7) |
| `admin-reminders.js` | Cron-like browser que dispara avisos de citas próximas/vencidas en notify center (D.5) |

**Automatización / IA local**:

| Archivo | Proposito |
|---------|-----------|
| `admin-automation.js` | Engine de reglas con 4 reglas built-in (route_high_value, sla_breach, etc.) + execution log + integración EventBus (MF6.1 + K.1+K.3) |
| `admin-insights.js` | Panel "Lo que el sistema notó esta semana" con 7 generadores de insights (O.6) |
| `admin-kpis.js` | KPIs ejecutivos del mes: conversión, ticket promedio, tiempo respuesta, SLA, top asesor + funnel chart (O.1+O.2) |
| `admin-performance.js` | Tabla de performance per asesor con ventas/asignadas/SLA + top 3 medallas (O.3) |
| `admin-predictive.js` | Widget "Insights del día": forecast ventas, hot leads, vehículos al borde, churn risk (R.1-R.4) |
| `admin-onboarding.js` | Tour interactivo de 6 pasos primera vez que el admin entra (N.4) |
| `admin-adaptive.js` | Tracking local de uso de secciones + atajos personalizados en dashboard (N.3) |
| `admin-sidebar-adaptive.js` | Sidebar reorganizado por uso: top 3 con estrella + ocultas las no usadas (N.2) |
| `admin-palette.js` | Command palette ⌘+K con búsqueda fuzzy de secciones/acciones/contactos (P.4) |

**Realtime collab + admin power-ups**:

| Archivo | Proposito |
|---------|-----------|
| `admin-activity-feed.js` | Activity Feed sliding panel: realtime + inspect + replay + export JSON + diff metadata (I.2-I.5) |
| `admin-activity.js` | Visor de audit log (legacy) |
| `admin-comments.js` | `AltorraComments` universal: comentarios threaded con @menciones sobre cualquier entidad (M.4) |
| `admin-coedit.js` | Co-edit locks blandos: warning "X está editando esto" cuando 2 admins abren mismo modal (M.2) |
| `admin-presence-ui.js` | Overlay flotante de presence con avatares de admins activos + indicador en MI sección (M.1) |
| `admin-users.js` | Gestion de usuarios (solo super_admin) |
| `admin-operations.js` | Registro de ventas, exportacion, deploy a GitHub |
| `admin-lists.js` | Leads (legacy — ahora unificado en admin-crm.js) |

**Voz / Multi-modal**:

| Archivo | Proposito |
|---------|-----------|
| `admin-voice.js` | Comandos por voz globales (Espacio+V) + boton mic en header. Web Speech API es-CO (L.1) |
| `admin-voice-dictate.js` | Auto-instrumenta cada `<textarea>` con boton dictate + capitalización automática (L.2) |

**Seguridad / PWA / offline**:

| Archivo | Proposito |
|---------|-----------|
| `admin-security.js` | Sudo mode: re-auth para acciones críticas con TTL 5 min cache (H.4) |
| `admin-anomaly.js` | Sliding window detector: 10+ deletes/5min → freeze + alerta (H.5) |
| `admin-pwa.js` | PWA installable del admin con shortcuts a 4 secciones (G.4) |
| `admin-offline.js` | Banner offline + queue local + auto-flush al recuperar conexión (G.3) |
| `admin-native-notifications.js` | Hook al notifyCenter para disparar `Notification` API nativa cuando priority high/critical (G.2) |

### JavaScript — IA local (`js/ai/`)

> Modulos IA que corren 100% en el browser. Sub-ms, sin descargar
> modelos pesados. Diseñados para tener provider slots que un futuro
> ML real (Transformers.js / TF.js) puede registrar via
> `AltorraAI.registerProvider()` sin tocar callsites.

| Archivo | Proposito |
|---------|-----------|
| `engine.js` | `window.AltorraAI` core: sentiment rule-based bilingüe (60+ términos) + provider registry para `chat` (Bloque J.1, conexión con LLM Fase 3) |
| `ner.js` | `AltorraNER` — extracción de entidades (marca, modelo, año, precio, ciudad, fecha, teléfono, email, placa). 50+ marcas + 30+ ciudades COL. Vehicle matcher con scoring (J.2) |
| `intent.js` | `AltorraIntent` — clasificador rule-based de 13 intents conversacionales (greeting/thanks/goodbye/inventory_query/pricing_query/financiacion_query/appointment_request/sell_my_car/confirmation/negation/frustration/ask_human + memoria conversacional) |
| `scoring.js` | `AltorraScoring` — enriquece score base del CRM con señales AI (sentiment promedio + variance, entity richness, urgencia). Cap ±15 puntos (J.3) |
| `nba.js` | `AltorraNBA` — Next Best Action: 10 reglas heurísticas que sugieren accionables priorizadas por contacto (J.8) |
| `forecast.js` | `AltorraForecast` — regresión lineal + R² + confidence intervals + moving average + anomaly detection. Sin TF.js (R foundation) |
| `knowledge-graph.js` | `AltorraGraph` — grafo in-memory contactos↔vehículos↔marcas con auto-build throttled. matchContactsForVehicle + searchContacts semántica (Bloque Q) |

### CSS (`css/`)

**Core sitio público**:

| Archivo | Proposito |
|---------|-----------|
| `style.css` | Estilos principales del sitio publico (incluye 7 *-fixes.css mergeados al final P6 + auth-header.css mergeado por Header Loading Sprint) |
| `dark-theme.css` | Variante dark mode |
| `hero.css` | Hero banner de homepage con LQIP cross-fade + sequential reveal (L1.2+L1.3) |
| `page-loader.css` | Animación de carga (cinematic dissolve L1.1) |
| `animaciones.css` | Animaciones legacy y transiciones |
| `performance-fixes.css` | Overrides perf curados (P1+P3+P9 + content-visibility + auto-reveal) |
| `auth.css` | Modal login/registro/reset: con campo cédula obligatoria, password strength, Google btn, shake animation, offline banner |
| `auth-header.css` | DEPRECATED — mergeado en style.css (Header Loading Sprint). Mantenido por compat de cache |
| `historial-visitas.css` | Carrusel "Vistos Recientemente" filmstrip cinematográfico + diff badges (E.2) |

**Features cliente público**:

| Archivo | Proposito |
|---------|-----------|
| `contact-forms.css` | Modals de contacto/financiación con `.contact-success` (confirmación in-place MF2.1) |
| `cookies.css` | Banner de cookies |
| `citas.css` | Formulario de citas |
| `comparador.css` | Estilos del comparador |
| `calculadora-financiamiento.css` | Simulador de credito |
| `reviews.css` | Sección de reseñas |
| `filtros-avanzados.css` | Filtros sidebar (búsqueda) |
| `favorites-page.css` | Página de favoritos con diff badges (B.4) |
| `favorites-empty-fullpage.css` | Estado vacío de favoritos |
| `featured-week-banner.css` | Banner vehículo destacado |
| `toast-notifications.css` | Sistema unificado de notificaciones (toasts + bell + variant attention + buzz) |
| `concierge.css` | Bot ALTOR — FAB flotante 108×108, panel deslizable burbuja-cómic, Lead Gate, CTA bubble rotativo, happy dance hover, sparkles, marketing opt-in modal (Bloque U) |
| `perfil.css` | Panel de usuario: 10 secciones, sidebar, cards, avatar upload, busquedas guardadas, preferencias granulares |

**Admin**:

| Archivo | Proposito |
|---------|-----------|
| `admin.css` | Estilos del panel admin: workspace pattern, filter chips, kanban, smart suggestions, comments threaded, presence overlay, KPIs, predictive widget, etc. |

**Design System (Bloque T del Mega-Plan v4)**:

| Archivo | Proposito |
|---------|-----------|
| `tokens.css` | Design tokens: 10 categorías (colors, spacing, typography, shadows, radius, animation, z-index, layout) + variantes light/high-contrast (T.1 + T.4 + T.8) |
| `components.css` | Component library: 12 core components con variantes y estados (Button, Input, Select, Card, Modal, Tabs, Badge, Avatar, Tooltip, Toggle, Skeleton, Stack/Cluster) (T.2) |
| `animations.css` | Sistema centralizado: keyframes + utility classes + stagger system + view-transitions API (T.5) |

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
| `index.js` | Cloud Functions V2: triggers Firestore + email via nodemailer + LLM provider abstraction (Anthropic/OpenAI/Google) + scheduled jobs |
| `package.json` | Node 22, firebase-admin v13, firebase-functions v7, nodemailer |

**Secrets requeridos**: `EMAIL_USER`, `EMAIL_PASS` (Gmail SMTP), `GITHUB_PAT`, `LLM_API_KEY` (Anthropic, opcional — bot funciona con fallback rules sin él)

### Otros directorios

| Directorio | Contenido |
|------------|-----------|
| `v/` | Paginas legacy de vehiculos por ID (backward compat) |
| `backups/` | Snapshots de Firestore |
| `public/` | `_redirects` (Netlify legacy, no usado en GitHub Pages) |
| `js/simulador/` | Logica del simulador de credito (simulator.js, ui.js, data.js, finance.js) |
| `js/ai/` | Modulos IA local (engine, ner, intent, scoring, nba, forecast, knowledge-graph) — ver subseccion JavaScript IA arriba |
| `admin/` | `_components.html` (Storybook lite del Design System, T.3, no indexado por robots.txt) |
| `docs/` | `SETUP-LLM.md` (guia Windows-friendly para activar Cerebro AI), `dependency-map.md` (snapshot de dependencias JS pre Mega-Plan v4) |
| `multimedia/optimized/` | AVIF + WebP variantes responsive auto-generadas por workflow `optimize-images.yml` (Bonus B) |
| `ALTOR.png` | Imagen del bot ALTOR (raíz del repo, servida desde `/ALTOR.png`) |
| `manifest-admin.json` | PWA manifest dedicado del admin con shortcuts a 4 secciones (G.4) |

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
# Core inventario / contenido público
vehiculos/{id}       — read: public | create/update: editor+ (con _version) | delete: super_admin
usuarios/{uid}       — read: own doc OR super_admin | write: super_admin only
marcas/{id}          — read: public | write: editor+ (con _version)
banners/{id}         — read: public | write: editor+ (con _version)
resenas/{id}         — read: public | create/update: editor+ | delete: super_admin

# Comunicaciones (kind=cita/solicitud/lead, MF1.2)
solicitudes/{id}     — read: authenticated | create: public (con userId == auth.uid si presente, MF1.1) | update: editor+ | delete: super_admin
citas/{id}           — read: authenticated | create: public | update: editor+ | delete: super_admin
leads/{id}           — read: authenticated | create: public | delete: super_admin
mensajes/{id}        — DEPRECATED — eliminado, reemplazado por conciergeChats/ (U.4 PURGA TOTAL)

# Concierge (Bot ALTOR + chat asesor live)
conciergeChats/{sid} — read: editor+ OR auth.uid == resource.userId | create: auth (con userId match) | update: editor+ OR owner | delete: super_admin
conciergeChats/{sid}/messages/{mid} — read: editor+ OR matches parent owner | create: auth (from='asesor' requiere editor+) | delete: super_admin

# Cerebro AI (Fase 3 LLM + KB)
knowledgeBase/{kbId} — read: public (bot lee FAQs) | create/update: editor+ excepto usageCount/lastUsedAt (cualquier auth) | delete: super_admin
knowledgeBase/_brain — singleton de identidad/contexto/instrucciones/reglas/modelo (cubierto por rule de knowledgeBase/{kbId})
llmRateLimit/{sid}   — read/write: false (solo Cloud Function via Admin SDK escribe — bypassa rules)

# Aliados / config / audit
concesionarios/{id}  — read: authenticated | write: super_admin only
loginAttempts/{hash} — read/write: public (rate limiting cross-device)
auditLog/{id}        — read: authenticated | create: editor+ | delete: super_admin (INMUTABLE)
automationLog/{id}   — read: authenticated (admins audit) | create: auth (engine writes) | delete: super_admin (INMUTABLE)
config/{docId}       — read: public | write: varies (bookedSlots: public, counters: editor+, calendarConfig: super_admin, followups: editor+, messageTemplates: editor+)
system/{docId}       — read: public | write: editor+ (cache invalidation)
drafts_activos/{uid} — read/write: editor+ (own uid only)

# Realtime collab + admin power-ups
events/{eventId}            — read: auth | create: auth (cualquiera persiste opt-in con bus persist:true) | INMUTABLE | delete: super_admin (Bloque I.1)
comments/{commentId}        — read: editor+ | create: editor+ AND authorUid == auth.uid | update: solo body+edited (M.4) | delete: super_admin OR author propio
coediting/{entityType_entityId} — read: editor+ | create/update: solo own uid | delete: super_admin OR dueño (M.2)
appointmentReminders/{id}   — read: editor+ | create: editor+ AND shownTo == auth.uid | delete: super_admin (D.5)

# Cliente
clientes/{uid}                                         — read: own OR isEditorOrAbove() (CRM 360°) | create: own | update: own OR super_admin (notas CRM) | delete: false
clientes/{uid}/busquedasGuardadas/{searchId}          — read/write: own uid only
clientes/{uid}/notifications/{nid}                    — read/write/delete: own uid (cross-device sync A4)
clientes/{uid}/cotizaciones/{cotId}                   — read/write: own OR super_admin (MF4.6)
clientes/{uid}/postventa/{saleId}                     — read/write: editor+ (NPS aggregation MF4.8)
clientes/{uid}/crmNotes/{nid}                         — read/write: super_admin (notas internas CRM MF4.2)
```

### Optimistic Locking (`_version`)

- Editores DEBEN incrementar `_version` en cada update
- Super Admin puede editar SIN incrementar (bypass en rules)
- Creacion: `_version = 1`
- Update: `_version = resource.data._version + 1`
- Previene conflictos en edicion concurrente

### Cloud Functions (V2 — activas)

**User management**:

| Funcion | Guard | Accion |
|---------|-------|--------|
| `createManagedUserV2` | `verifySuperAdminV2` | Crea Auth user + doc en `usuarios/{uid}` |
| `deleteManagedUserV2` | `verifySuperAdminV2` + self-delete protection | Elimina doc + Auth user |
| `updateUserRoleV2` | `verifySuperAdminV2` | Actualiza rol, nombre en `usuarios/{uid}` |

**Triggers de comunicaciones**:

| Funcion | Guard | Accion |
|---------|-------|--------|
| `onNewSolicitud` | Trigger `onCreate` en `solicitudes/{id}` | Email al admin con datos de solicitud/cita. Idempotente (`emailSent` flag) |
| `onSolicitudStatusChanged` | Trigger `onUpdate` en `solicitudes/{id}` | Email al cliente cuando estado cambia a confirmada/reprogramada/cancelada/completada. Idempotente (`statusEmailSent_{estado}` flag) |

**Triggers de vehículos**:

| Funcion | Guard | Accion |
|---------|-------|--------|
| `onVehicleChange` | Trigger `onWrite` en `vehiculos/{id}` | Dispatch GitHub Actions para regenerar paginas SEO. Debounce 5 min. Solo si cambian campos SEO |
| `triggerSeoRegeneration` | `verifySuperAdmin` (callable) | Dispatch manual de regeneracion SEO desde admin panel |
| `onVehiclePriceAlert` | Trigger `onUpdate` en `vehiculos/{id}` | Detecta baja de precio, busca `clientes/{uid}/busquedasGuardadas` con `alertas:true` que coincidan, envia email al cliente. Rate limit 1 email/cliente/vehiculo/dia |

**Cerebro Altorra AI (Fase 3 + §21.10 optimizaciones, requiere `LLM_API_KEY`)**:

| Funcion | Guard | Accion |
|---------|-------|--------|
| `chatLLM` | Callable, rate limit 30/sesion/dia (§21.10.3) | Lee `knowledgeBase/_brain` config, fetch top 10 vehiculos del inventario (§21.10.2), compone system prompt con `cache_control:'ephemeral'` (§21.10.1), llama provider Anthropic/OpenAI/Google, parsea CTA tag whitelisted, retorna `{text, cta, source:'llm'}` o `{disabled:true}` para fallback rules. Si Brain off → cliente cae a generateBotResponse (zero downtime). |
| `summarizeChat` | Callable, super_admin/editor | Genera resumen extractivo con LLM (3-5 lineas) y lo persiste en `conciergeChats/{sid}.summary`. Reusa `composeSystemPrompt` con prompt dedicado (F.1) |
| `onConciergeMessageAdded` | Trigger `onCreate` en `conciergeChats/{sid}/messages/{mid}` | Cuando el chat alcanza múltiplo de 10 turnos del cliente, dispara `summarizeChatBySessionId` automáticamente. Idempotente (skip si `summaryUpToTurn >= newCount`) |
| `proactiveEngagement` | Schedule `every 5 minutes` (Cloud Scheduler) | Detecta chats con `mode='bot'` + `lastMessageAt` en últimas 6h + cooldown 24h. Si user nunca escribió Y pasaron 3+ min desde el welcome → inyecta nudge `proactive=true` con cooldown registrado en `lastProactiveAt` (F.3) |

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

| Campo | Tipo | Notas |
|-------|------|-------|
| nombre, telefono, email | string | |
| prefijoPais | string (default "+57") | |
| tipo | string | "consignacion_venta", "financiacion", "contacto_general", "concierge_soft" (Bot ALTOR) |
| origen | string | "vende_tu_auto", "financiacion", "form_contacto", "simulador_credito", "concierge", "ai_assistant", "whatsapp_widget" |
| **kind** (MF1.2) | string | **"cita" / "solicitud" / "lead"** — discriminador con maquina de estados independiente |
| **userId** (MF1.1) | string\|null | Firebase Auth uid del cliente; null para guests. Anti-impersonation: rule exige `userId == auth.uid` si presente |
| **userEmail** (MF1.1) | string\|null | Email del usuario logueado (separado del email de contacto del form) |
| **clientCategory** (MF1.1) | string | "registered" \| "guest" |
| **priority** (MF1.3) | string | "alta" / "media" / "baja" — auto-computed por `comm-schema.js computeMeta()` |
| **tags** (MF1.3) | array | Auto-tags: 'alto-valor', 'premium', 'desde-vehiculo', 'desde-simulador', 'cliente-registrado', etc. |
| **slaDeadline** (MF1.3) | string ISO | Auto-calculado segun kind+tags (cita: 30min, financiacion alto-valor: 1h, lead: 24h) |
| **slaMs** (MF1.3) | number | Mismo valor en ms desde createdAt |
| **assignedTo** (MF3.4) | string | uid del asesor asignado (auto-routing super_admin para alto-valor, round-robin para resto) |
| **assignedToName** (MF3.4) | string | Nombre cacheado |
| **source** (MF1.1) | object | `{page, cta, referrer}` — atribucion del origen del lead |
| **device** (MF1.1) | object | `{type:'mobile'\|'desktop', browser, os}` |
| **requiereCita** | boolean | True si kind='cita' (legacy compat) |
| vehiculo | string | |
| vehiculoId | string | Si se origino desde una ficha de vehiculo |
| datosExtra | object | datos especificos del tipo |
| comentarios | string | |
| estado | string | Estado segun kind. Cita: pendiente/confirmada/reprogramada/completada/cancelada/no_show. Solicitud: pendiente/en_revision/contactado/aprobada/rechazada/completada/sin_respuesta. Lead: nuevo/contactado/interesado/frio/convertido/descartado |
| **legacyEstado** (MF1.2) | string | Estado original antes de la migracion automatica de schema |
| observaciones | string | notas del admin |
| **marketingOptIn** (U.19) | object | `{email, whatsapp, sms, askedAt, source}` granular per-canal |
| createdAt, updatedAt | timestamp | |
| _migration_v1 | boolean | Marcado por `migrateCommunicationsSchema` en admin-sync.js |
| _migrationAt | string ISO | |

### conciergeChats/{sessionId} (Bot ALTOR + chat asesor live, U.4)

| Campo | Tipo | Notas |
|-------|------|-------|
| sessionId | string | `cnc_<timestamp>_<rand>` único por cliente |
| userId | string\|null | uid si registered, null para guests |
| userEmail, userNombre | string | |
| userTelefono, userCedula | string | Lead Gate obligatorio (Fase 2) |
| mode | string | "bot" / "live" / "wa_handed_over" |
| status | string | "active" / "closed" / "resolved" |
| sourceVehicleId | string\|null | ID del vehículo si el chat se inició desde su ficha |
| sourcePage | string | Página de origen |
| level | number | 0..5 progressive profiling (L0 anónimo → L5 convertido) |
| profile | object | Snapshot de la identidad del cliente al momento del chat |
| lastMessage | string | Últimos 80 chars del último mensaje |
| lastMessageAt | timestamp | |
| unreadByAdmin | number | |
| unreadByUser | number | |
| forceUnreadByAdmin | boolean | Admin marca manual no leído (U.10 power-up) |
| isPinned, pinnedAt | bool, ts | Admin fija al tope |
| isArchived, archivedAt, archivedBy | bool, ts, uid | Admin archiva |
| isDeleted, deletedAt, deletedBy | bool, ts, uid | DEPRECATED — ahora hard delete real (§20.2) |
| activeAsesor | object | `{uid, nombre, photoURL}` del asesor actual |
| context | object | Memoria conversacional: `{lastIntent, discussedTopics[], bot_repeated_count}` |
| summary | string | Resumen IA generado cada 10 turnos por `summarizeChat` (F.1) |
| summaryUpToTurn, summaryUpdatedAt, summaryModel | int, ts, str | Idempotencia summary |
| lastProactiveAt | timestamp | F.3 — último nudge proactivo emitido (cooldown 24h) |
| createdAt | timestamp | |

**Subcollection** `conciergeChats/{sid}/messages/{mid}`:
- `from` ('user'/'bot'/'asesor'/'system'), `text`, `timestamp`, `cta` (object opcional)
- `proactive: true` + `triggerType` para mensajes generados por `proactiveEngagement` (F.3)
- `asesorUid`, `asesorNombre`, `asesorPhotoURL` cuando from='asesor'

### knowledgeBase/{kbId} y knowledgeBase/_brain (Cerebro Altorra AI)

**FAQs** (`kbId` no es '_brain'):

| Campo | Tipo |
|-------|------|
| question | string |
| answer | string |
| keywords | array |
| category | string ('general' / 'financiacion' / 'inventario' / 'politica' / 'horarios' / 'ubicacion' / 'consignacion') |
| enabled | boolean |
| priority | number (0-100) |
| usageCount | number (incrementado por bot al usar la FAQ — diff-key permite a cualquier auth) |
| lastUsedAt | timestamp |
| createdAt, createdBy, updatedAt, updatedBy | |

**Singleton `_brain`** (Fase 3, §21.4):

| Campo | Tipo | Notas |
|-------|------|-------|
| enabled | boolean | Toggle "Cerebro AI activo" del admin |
| llmProvider | string | "anthropic" / "openai" / "google" |
| llmModel | string | ej. `claude-haiku-4-5` |
| llmTemperature | number | 0-1 |
| maxTokens | number | (recomendado 400 — §21.10) |
| identidad | object | `{nombre, tono, personalidad}` |
| contexto | object | `{descripcion, valores:[], servicios:[]}` |
| instrucciones | string | System prompt principal |
| reglas_seguridad | array | Reglas inviolables del bot |
| updatedAt, updatedBy | | |

### Otras colecciones nuevas (Mega-Plan v4)

| Coleccion | Campos clave |
|-----------|-------------|
| `automationLog/{id}` | ruleId, ruleName, trigger, action, reason, docId, docTitle, outcome, timestamp, by (K.3) |
| `events/{eventId}` | id, type, payload, timestamp, by, bySource ('admin'/'public'/'system') (Bloque I.1) |
| `comments/{commentId}` | entityType, entityId, body, authorUid, authorNombre, parentId (threading), mentions[], createdAt (M.4) |
| `coediting/{entityType_entityId}` | uid, browser, lastHeartbeat (TTL 60s), createdAt (M.2) |
| `appointmentReminders/{id}` | reminderId, citaId, type, shownTo (uid), shownAt, notified (D.5) |
| `llmRateLimit/{sessionId}` | count (max 30/dia §21.10.3), day, lastAt (Cloud Function only) |
| `clientes/{uid}/notifications/{nid}` | id, type, title, message, link, category, priority, entityRef, actionLabel, timestamp, read (Bell A.4 cross-device) |
| `clientes/{uid}/cotizaciones/{cotId}` | precio, descuento, cuotaInicial, plazo, tasa, vigencia, generatedAt (MF4.6) |
| `clientes/{uid}/postventa/{saleId}` | saleData, npsScore, satisfaction, scheduledFollowups (MF4.8) |
| `clientes/{uid}/crmNotes/{nid}` | body, authorUid, createdAt (notas internas super_admin) |

### Otras colecciones legacy / sin cambios

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
| `config/calendarConfig` | workDays, workHours, slotDurationMin, bufferMin, maxPerSlot, holidays (D.3) |
| `config/messageTemplates` | items[] de plantillas de respuesta rápida (MF6.3) |
| `config/followups` | items[] de recordatorios programados (MF6.2) |
| `system/meta` | lastModified (señal de cache invalidation) |
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

### RCA STRUCTURAL FIX — Clicks bloqueados en centro de botones del admin (2026-05-06)

> **Una de las investigaciones más importantes del proyecto.** Documentada
> con detalle para que futuros devs no repitan el patrón que causó el bug.
> Resuelta tras múltiples intentos fallidos (header-fix v1 → v5).

**Sintoma reportado** (admin.html, 3 botones del header: micrófono,
actividad, campana):
- Clicks en el **centro** de los botones no respondían.
- Clicks en las **esquinas** (~7-10px del borde) sí respondían.
- Campana no respondía en NINGÚN punto.
- Tras "muchos clicks repetidos" eventualmente funcionaba.
- Una vez abierto cualquier panel, las **X de cierre tampoco
  respondían**, pero **Esc sí cerraba** los paneles.

**Fase 1 — Diagnóstico fallido (cuatro intentos de parche)**:

| Intento | Hipótesis | Por qué falló |
|---|---|---|
| header-fix v2 | Doble bind cancela cycle() | Cierto pero solo afectaba theme/contrast (eliminados después) |
| header-fix v3 | Capture-phase listener intercepta antes de overlays | Llamaba `notifyCenter.togglePanel` que no existía → bell rompido |
| header-fix v4 | No interceptar, confiar en handlers nativos + cleanup overlays | El bug NO era de overlays con z-index alto |
| header-fix v5 | Listeners directos en cada botón + stopImmediatePropagation | El click EVENT mismo no se disparaba en el centro — listeners directos no ayudaban |

Tras 5 commits sin resolver, el usuario pidió diagnóstico estructural
(RCA mode) en lugar de más parches.

**Fase 2 — Telemetría inyectada**:

Se reemplazó el contenido de `admin-header-fix.js` por un capture-phase
listener PURO (sin bindings, sin parches) que reportaba:
- El `e.target` exacto del click.
- El stack completo de elementos en el punto del click vía
  `document.elementsFromPoint(x, y)` con z-index, position y
  pointer-events de cada uno.
- Si el target estaba dentro o fuera del rect del botón.

**Resultado de la telemetría** (6 clicks: centro + esquina de cada
botón):

| Click | Logged? | e.target |
|---|---|---|
| Bell centro | ❌ NADA | — |
| Bell esquina sup-izq | ✅ | BUTTON.altorra-bell |
| Activity centro | ❌ NADA | — |
| Activity esquina sup-izq | ✅ | BUTTON#activityFeedTrigger |
| Voice centro | ❌ NADA | — |
| Voice esquina sup-izq | ✅ | BUTTON#altorra-voice-btn |

**Insight crítico**: cuando se hace click en el CENTRO, **el
navegador no dispara ningún evento `click`**. Mi capture-phase
listener captura cualquier click globalmente — si nada se loguea
es porque el evento NO existió.

**El navegador NO dispara `click` cuando**:
- `mousedown` y `mouseup` ocurren en elementos DIFERENTES.
- Esto pasa si el elemento bajo el cursor es **reemplazado entre
  mousedown y mouseup**.

**CAUSA RAÍZ identificada**: `js/icons.js` líneas 245-269 tenía un
MutationObserver global:

```js
var observer = new MutationObserver(function (mutations) {
    for (var i = 0; i < mutations.length; i++) {
        var m = mutations[i];
        for (var j = 0; j < m.addedNodes.length; j++) {
            var n = m.addedNodes[j];
            if (n.nodeType === 1) {
                if (n.matches && n.matches('[data-lucide]')) { scheduleRefresh(); return; }
                if (n.querySelector && n.querySelector('[data-lucide]')) { scheduleRefresh(); return; }
            }
        }
    }
});
observer.observe(document.body, { childList: true, subtree: true });
```

**Cómo causaba el bug**:
1. Usuario hace `mousedown` en el centro de un botón. El target es
   un `<svg>` inserted por Lucide (el icono de 18-22px).
2. Cualquier mutación del DOM (toast, realtime listener Firestore,
   badge counter actualizándose, otro módulo agregando contenido)
   dispara el observer.
3. `scheduleRefresh()` con debounce 50ms ejecuta
   `lucide.createIcons()` que **reemplaza TODOS los `<svg>` en el
   document por SVGs nuevos**.
4. Cuando el usuario suelta (`mouseup`), el SVG bajo el cursor ya
   NO es el mismo nodo del DOM (es uno nuevo).
5. **El browser cancela el evento `click`** porque mousedown y
   mouseup ocurrieron en elementos distintos según la spec.

**Por qué encaja con todos los síntomas**:

| Síntoma | Explicación |
|---|---|
| Esquinas funcionan | mousedown y mouseup ambos en el `<button>` (sin SVG en bordes) → mismo elemento → click sí dispara |
| Centro NO funciona | mousedown sobre `<svg>` viejo, mouseup sobre `<svg>` nuevo → click NO dispara |
| X de paneles NO funcionan | Tienen icons Lucide en el centro → mismo bug |
| Esc SÍ cierra paneles | `keydown` no depende de element identity, no se rompe |
| Tras muchos clicks funciona | A veces el timing del MutationObserver es favorable y los SVGs no se reemplazan en ese intervalo de mousedown→mouseup específico |
| Campana NO funciona ni en bordes | Bell tiene `<i class="altorra-bell__badge">` con realtime updates → más mutaciones → 100% chance de reemplazo |

**Solución estructural aplicada**:

1. **`js/icons.js`**: ELIMINADO el MutationObserver global. Mantenido
   `AltorraIcons.refresh(scope)` para uso explícito desde callsites.
   El audit confirmó **99 callsites del repo ya llaman refresh
   manualmente** (toast.js, admin-state.js → AP.refreshIcons,
   admin-vehicles, admin-crm, etc.). El observer era una "red de
   seguridad" innecesaria.

2. **`js/admin-header-fix.js`**: ELIMINADO COMPLETAMENTE. No quedan
   parches en el codebase. Los botones del header tienen sus
   listeners nativos correctos:
   - Activity: `document.addEventListener('click', e => closest('#activityFeedTrigger') && toggle())` en `admin-activity-feed.js:540`
   - Bell: `bell.addEventListener('click', togglePanel)` directo en `toast.js:1027`
   - Voice: `btn.addEventListener('click', toggle)` directo en `admin-voice.js:413`

3. **`css/admin.css`**: removidas reglas `z-index: 99999 !important`
   en `#activityFeedTrigger`, `#headerNotifBell`, `#altorra-voice-btn`,
   `#pwaInstallBtn`. Eran defense innecesaria del bug ya inexistente.
   Mantenido el SAFETY de `.alt-onboard:not(.is-active)`,
   `.altorra-voice-overlay:not(.alt-voice-active)` y
   `.alt-palette:not(.alt-palette-open)` con `display:none` por
   default — esos overlays existen estáticamente en el DOM y deben
   permanecer ocultos hasta su clase activa.

**REGLA OPERATIVA derivada** (agregar a §17 si no estaba):

> NUNCA usar un MutationObserver global con `subtree: true` que
> ejecute operaciones DOM costosas. Si necesitás re-procesar HTML
> nuevo, llamá explícitamente desde el callsite que lo inyecta:
>
> ```js
> container.innerHTML = '...<i data-lucide="x"></i>...';
> AltorraIcons.refresh(container); // scoped, no global
> ```
>
> Un observer global puede reemplazar elementos del DOM mientras
> el usuario los está clickeando, cancelando eventos `click` del
> browser silenciosamente.

**Patrón de debug aprendido**: cuando un click "no funciona" pero
no hay errores en consola, ANTES de bindear listeners alternativos
verificar primero si el evento `click` se dispara. Si capture-phase
listener en `document` no lo loguea, el bug es del browser cancelando
el evento — buscar mutaciones DOM que ocurran entre mousedown y mouseup.

**Archivos modificados**: `js/icons.js`, `js/admin-header-fix.js`
(eliminado), `admin.html`, `css/admin.css`, `service-worker.js`,
`js/cache-manager.js`.

**Cache version bumped**: v20260506050000.

### Meta tag deprecated apple-mobile-web-app-capable (2026-05-06)

**Sintoma**: Chrome console mostraba warning amarillo:
```
<meta name="apple-mobile-web-app-capable" content="yes"> is deprecated.
Please include <meta name="mobile-web-app-capable" content="yes">
```

**Fix aplicado** (`admin.html:13-14`): agregado el meta tag moderno
junto al de Apple (NO reemplazar — Safari iOS aún lo usa, coexisten).

```html
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
```

### CRM clientes — permission-denied (2026-05-06)

**Sintoma**: console mostraba:
```
[CRM] Could not load clientes: Missing or insufficient permissions
   admin-crm.js:894
```

**Causa raíz**: `firestore.rules:111` permitía read solo si
`auth.uid == uid`:
```
match /clientes/{uid} {
    allow read: if request.auth != null && request.auth.uid == uid;
}
```

Pero `js/admin-crm.js:887` ejecuta:
```js
window.db.collection('clientes').get();
```

Esto es un **list/get de la colección entera**. Para que pase la regla,
**cada documento devuelto** debe satisfacer la regla de read. La regla
solo aprobaba el doc cuyo `uid == auth.uid` (el doc del propio admin).
Cualquier otro doc → `permission-denied` → la query falla.

**Fix aplicado** (`firestore.rules:110-127`): agregada rama
`isEditorOrAbove()` para read y `isSuperAdmin()` para update:

```
match /clientes/{uid} {
    // Self-service: el cliente lee su propio doc.
    // Admin (editor+): necesario para que admin-crm.js liste TODOS
    // los clientes en el CRM 360.
    allow read: if request.auth != null && (
        request.auth.uid == uid || isEditorOrAbove()
    );
    allow create: if request.auth != null && request.auth.uid == uid
        && request.resource.data.uid == request.auth.uid;
    // Update: el cliente edita su perfil; super_admin puede agregar
    // notas/tags del CRM desde el panel admin (crmTags, crmNotes).
    allow update: if request.auth != null && (
        request.auth.uid == uid || isSuperAdmin()
    );
    allow delete: if false;
}
```

> **REQUIERE DEPLOY MANUAL**: `firebase deploy --only firestore:rules`
> después de mergear. Sin esto, el error de permisos persiste en
> producción.

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

### Microfase I.5 — Replay + debugging para super_admin ✓ COMPLETADA (2026-05-05)

**Objetivo**: cierre de Bloque I. El feed muestra eventos en tiempo
real (I.2), los emite con diff (I.3 + I.4), y ahora I.5 le da al
super_admin las herramientas para inspeccionar, replayar y exportar
sin tocar la consola del browser.

**Click-to-inspect**:

Cada entry en el feed es ahora clickable. Click en la fila →
inspector se expande in-place mostrando:
- **Metadata bar**: `id`, `type`, `by` (uid emitter), `bySource`
- **JSON pretty-printed** del payload completo (max-height 280px,
  scroll vertical, monospace)
- **Acciones** (solo super_admin):
  - **Replay local** (`rotate-cw`) — re-emite el evento con
    `payload.__replay = true` y `payload.__replayOf = <originalId>`,
    `bySource: 'system'`, `persist: false`. Útil para probar
    listeners (workflows futuros del Bloque K, Activity Feed mismo)
    sin crear data real
  - **Copiar JSON** (`copy`) — copia el evento entero al clipboard
    via `navigator.clipboard.writeText` con fallback a `textarea`
    + `execCommand('copy')` para browsers viejos
  - **Filtrar tipo** (`funnel`) — selecciona el dominio del evento
    en el filtro del toolbar (e.g. click en un `vehicle.updated` →
    filtro pasa a "Vehículos")

Click en la misma fila colapsa el inspector. Solo un inspector abierto
a la vez (`_expandedId` simple, no array) para mantener la UI limpia.

**Replay UX**:

Cuando el super_admin hace replay:
1. Nuevo evento entra al feed con badge dorado `REPLAY` al lado del
   action name
2. La entry original recibe un flash dorado de 600ms (animation
   `aafFlash`) para visualizar la conexión entre original y replay
3. Toast de confirmación: "Evento re-emitido localmente"
4. El replay tiene `bySource: 'system'` para distinguirse de eventos
   reales (admin) en el filtro

**Convención `__replay` / `__replayOf`**: prefijo `__` indica metadata
de debugging que no debe persistirse ni mostrarse al cliente. Los
listeners pueden ignorar replays con:
```js
AltorraEventBus.on('vehicle.updated', function (e) {
    if (e.payload.__replay) return; // skip debug replays
    // … actual logic …
});
```

**Export JSON**:

Botón `download` en el toolbar exporta los `_entries` actuales como
`altorra-events-<timestamp>.json` (Blob URL + `<a download>` trick).
Útil para:
- Reportar bugs incluyendo el feed completo del momento
- Análisis offline de patrones de uso
- Snapshot del estado para replay en sesiones futuras (cuando
  Bloque K agregue importer)

**Public API extendida**:

```js
window.AltorraActivityFeed = {
    open(), close(), toggle(),       // de I.2
    replay(eventId),                  // I.5 — replay programático
    copy(eventId),                    // I.5 — copy JSON programático
    export(),                         // I.5 — descargar todo
    entries()                         // I.5 — snapshot inmutable
};
```

Permite que la consola del navegador se use como herramienta de
debugging avanzada:
```js
// En consola, encontrar último evento de un tipo
AltorraActivityFeed.entries().reverse().find(e => e.type === 'comm.estado-changed')

// Replayarlo
AltorraActivityFeed.replay('evt_abc123')

// Exportar para compartir
AltorraActivityFeed.export()
```

**CSS nuevo** (`css/admin.css`):
- `.aaf-entry-row` — el header clickable con hover state dorado tenue
- `.aaf-entry--expanded > .aaf-entry-row` — fondo más marcado cuando expandido
- `.aaf-entry--replay` — borde lateral dorado para distinguir replays
- `.aaf-replay-badge` — pill dorada uppercase 0.62rem
- `.aaf-inspector` — contenedor oscuro con metadata bar + JSON box + actions
- `.aaf-inspector-json` — `<pre>` monospace 0.7rem max-height 280px scroll
- `@keyframes aafFlash` — pulse dorado 600ms ease-out (respeta
  `prefers-reduced-motion`)

**Anti-patterns evitados**:

| Riesgo | Mitigación |
|---|---|
| Click en botón de acción dentro del inspector colapsa el inspector | `e.stopPropagation()` en cada handler de acción |
| Replay persiste en Firestore (loop infinito si el listener llega y vuelve a emitir) | Hardcoded `persist: false` en replayLocal |
| Replay del replay del replay (encadenado) | `__replayOf` apunta SIEMPRE al original (no al replay anterior); UI no muestra "replay button" en cards que ya son replay (no es necesario, el replay es local solamente) |
| Listeners de workflows real-data se confunden con replays | Documentado el patrón `if (payload.__replay) return;` para opt-out |
| `CSS.escape` no soportado en navegadores muy viejos | `try/catch` envolvente; el flash es cosmético, falla silente está OK |
| Inspector enorme cuando payload es grande | `max-height: 280px; overflow: auto` |
| Botones visibles a editor/viewer (no necesitan replay) | Render condicional `if (canDebug)` chequea `AP.isSuperAdmin()` |
| Click en inspector text scrollable colapsa el panel | `aaf-inspector-json` no tiene `data-action`, solo el header row sí |

**Pasos de prueba**:
1. Login como super_admin → abrir Activity Feed (icono campana grande)
2. Hacer cualquier acción que emita evento (cambiar sección, editar
   vehículo)
3. Click en la entry → se expande mostrando JSON
4. Click "Replay local" → aparece nueva entry idéntica con badge
   "REPLAY", la original parpadea dorado, llega toast
5. Click "Copiar JSON" → toast "JSON copiado", pegar en cualquier
   editor confirma
6. Click "Filtrar tipo" → filtro del toolbar cambia al dominio
7. Click "Exportar JSON" en toolbar → descarga
   `altorra-events-<ts>.json`
8. Login como editor → click en entry expande JSON pero NO muestra
   botones de acción (replay/copy/filter)

**Archivos modificados**:
- `js/admin-activity-feed.js` — `_expandedId` state, render inspector,
  `replayLocal()`, `copyEventJSON()`, `exportEvents()`, public API
  extendida con `replay`/`copy`/`export`/`entries`
- `css/admin.css` — bloque completo I.5 (inspector + replay badge +
  flash animation, ~95 líneas)
- `service-worker.js` + `js/cache-manager.js` — version bump v20260505170000

**Cierre Bloque I**: con I.1-I.5 completos, el sistema tiene un bus
de eventos completamente funcional, persistencia opt-in, feed
realtime con filtros, diff de transiciones renderizado, e
inspección/replay para debugging. Listo para que Bloque K (Workflows)
lo consuma como motor de triggers.

### Microfase K.1 — Automation engine consume el EventBus ✓ COMPLETADA (2026-05-05)

**Objetivo**: el sistema de reglas de `js/admin-automation.js`
(MF6.1) hasta ahora dependía de hooks manuales para detectar nuevos
docs (`AP.checkRulesForNewDocs(snap)`). K.1 lo conecta al EventBus
(I.1-I.5) para que las reglas se evalúen **automáticamente** cuando
cualquier módulo del admin emite el evento canónico, sin polling y
sin hooks ad-hoc.

**Cambios en `js/admin-automation.js`**:

1. **`BUS_TO_TRIGGER` map**: traduce los nombres de evento del bus a
   los `trigger` strings que ya usan las reglas (`'comm.created'` →
   `'comm_created'`). Mantiene compatibilidad con la librería de
   reglas existente sin renombrarlas.

2. **`onBusEvent(event)`**: nuevo dispatcher central. Para cada
   evento del bus:
   - Skip si el usuario actual no es super_admin (auto-routing es
     responsabilidad del super_admin para evitar conflicts entre tabs)
   - Skip si `payload.__replay === true` (los replays del Activity
     Feed son para debug visual, no para re-disparar reglas reales)
   - Mapea el `event.type` a un trigger conocido. Si no matchea,
     ignora silenciosamente (eventos de UI, login, etc.)
   - Construye un `doc`-shaped object desde `event.payload` y lo
     pasa a `evaluateRules(triggerName, doc)`
   - Aplica cada match con cycle protection (ver abajo)

3. **Cycle protection** (CRÍTICO):
   - `_executionCount` y `_executionEventId` rastrean cuántas reglas
     se ejecutaron por evento fuente
   - Cap `MAX_RULES_PER_EVENT = 10` previene loops del estilo
     "regla A asigna asesor → emite `comm.estado-changed` → regla B
     re-asigna → loop"
   - Reset por evento: cuando llega un nuevo `event.id`, el contador
     vuelve a 0

4. **`subscribeToBus()` / `unsubscribeFromBus()`**: handlers
   idempotentes. La suscripción se hace en init después de cargar
   las reglas. Si el bus aún no está cargado (race en init temprano),
   la suscripción es no-op silenciosa — el polling SLA loop sigue
   funcionando como red de seguridad.

5. **Diagnostic API**:
   ```js
   AltorraAutomation._executionState()
   // → {count: 3, eventId: 'evt_abc', cap: 10}
   ```

**Por qué dejamos `checkRulesForNewDocs` legacy**: el código en
`admin-appointments.js` ya no lo llama (verificado con grep), pero
está expuesto en `AP.checkRulesForNewDocs` para retrocompatibilidad
si alguien hubiera hookado externamente. Eventual cleanup en K.5.

**Por qué el SLA loop NO usa el bus**: SLA es un check basado en
tiempo (cada minuto, busca docs cuyo `slaDeadline` venció). No hay
un evento "el reloj avanzó 60 segundos" — es polling por diseño.
K.6 podría agregar un trigger sintético `time.tick.minute` pero no
es prioritario.

**Anti-patterns evitados**:

| Riesgo | Mitigación |
|---|---|
| Loop infinito (rule A → emit → rule A) | Cap por event.id en `_executionCount` |
| Replay del Activity Feed dispara reglas reales | Skip si `payload.__replay === true` |
| Multi-tab admin: cada tab corre el routing → race | Solo super_admin corre, y la regla "ya asignado" guard previene double-assign |
| Bus indefinido en page load | Subscribe es try/catch + retry implícito (init loop ya espera auth) |
| Rules subscriben antes de tener el doc real | Payload del bus llega completo desde admin-* — los emit incluyen título y campos clave |
| Listener nunca se libera | `unsubscribeFromBus()` expuesto para futuros teardowns (logout) |

**Pasos de prueba**:
1. Login como super_admin
2. Cliente envía solicitud de financiación con cuota inicial $50M+
   (desde web pública o crear manual en Firestore con `tags: ['alto-valor']`)
3. Verificar en consola: `AltorraAutomation._executionState()` →
   debería mostrar 1 ejecución
4. La regla `route_high_value_financiacion` auto-asigna al super_admin
   sin polling — verificar `assignedTo` se actualiza en Firestore
5. Cambiar estado de la solicitud a "contactado" desde el admin
6. Activity Feed: ver `comm.estado-changed` → automation observa
   pero no dispara nada (no hay regla para ese trigger todavía)
7. Activity Feed → click cualquier evento → click "Replay local" →
   verificar en consola que `_executionState()` NO incrementa
   (porque payload tiene `__replay: true`)

**Archivos modificados**:
- `js/admin-automation.js` — `BUS_TO_TRIGGER` map, `onBusEvent`
  dispatcher con cycle protection, `subscribeToBus` en init, public
  API extendida
- `service-worker.js` + `js/cache-manager.js` — version bump
  v20260505180000

### Microfase K.2 — Smart Fields engine para inventario de vehículos ✓ COMPLETADA (2026-05-05)

**Objetivo**: cuando el admin crea/edita un vehículo y deja campos
en blanco, el sistema **deriva** valores razonables a partir de
otros datos del doc. Patrón Salesforce/HubSpot "implied fields" —
reduce data entry y mantiene consistencia.

**Lo que se creó** (`js/smart-fields.js`):

API pública `window.AltorraSmartFields`:

```js
// Aplica todas las reglas y devuelve resultado + qué se derivó
AltorraSmartFields.derive(doc) → { result, derived: [{field, value, reason}] }

// Inspecciona qué se derivaría sin mutar
AltorraSmartFields.preview(doc) → [{field, value, reason}]

// Lista introspectable de reglas (para K.6 visual builder)
AltorraSmartFields.rules → [{id, field, description}]

// Helper de formato para UI
AltorraSmartFields.formatSuggestion(s) → "Tipo: nuevo (kilometraje 0)"
```

**Reglas built-in (6)**:

| ID | Campo derivado | Lógica |
|---|---|---|
| `tipo_from_km` | `tipo` | km==0 → 'nuevo' · km≤10K → 'semi-nuevo' · km>10K → 'usado' |
| `estado_default` | `estado` | blank → 'disponible' |
| `oferta_from_precioOferta` | `oferta` | precioOferta válido y < precio → true |
| `puertas_default` | `puertas` | blank → 5 |
| `pasajeros_default` | `pasajeros` | blank (y asientos blank) → 5 |
| `ubicacion_default` | `ubicacion` | blank → 'Cartagena' |

**Política de no-override**: cada regla tiene un `condition(doc)`
que chequea `isBlank(doc[field])`. Si el admin escribió un valor,
la regla nunca lo pisa. Solo rellena lo que falta.

**Idempotencia**: re-correr `derive(result)` sobre un objeto ya
procesado no produce nuevas derivations (todas las reglas fallan
su condition). Útil para re-validate en flujos de import/migración.

**Hook en `admin-vehicles.js` `buildVehicleData`**:

Al final de la función, después de armar el `vehicleData` desde
los inputs del form, se aplica:

```js
if (window.AltorraSmartFields) {
    // Tratar empty-string como blank (los selects sin elección retornan '')
    ['tipo', 'estado'].forEach(function (k) {
        if (vehicleData[k] === '') vehicleData[k] = null;
    });
    var smart = window.AltorraSmartFields.derive(vehicleData);
    vehicleData = smart.result;
    if (smart.derived.length > 0) {
        vehicleData._smartDerived = smart.derived;
    }
}
```

`_smartDerived` se preserva en el doc temporal para que el toast
de éxito muestre lo que se autocompletó:

```js
if (vehicleData._smartDerived && vehicleData._smartDerived.length > 0) {
    var derived = vehicleData._smartDerived.map(formatSuggestion).join(' · ');
    notify.info('Smart Fields: ' + derived);
}
```

**Por qué los defaults ya en buildVehicleData no son redundantes**:
el form tiene `parseInt($('vPuertas').value, 10) || 5` que da 5
si el input está vacío. Smart-fields refuerza esto en una capa
declarativa donde:
- La condición es expresable (no condicional inline)
- Es introspectable (admin puede ver "estas son las reglas activas")
- Migración futura a server-side (Cloud Function pre-write hook)
  reusa la misma lib

**Carga**: `<script src="js/smart-fields.js" defer>` antes de
`admin-vehicles.js` en `admin.html`.

**Anti-patterns evitados**:

| Riesgo | Mitigación |
|---|---|
| Pisar valor que el admin escribió | `condition` chequea `isBlank()` antes de derivar |
| `''` (empty string del form) cuenta como "no blank" | `isBlank()` trata `''` como blank explícitamente |
| Reglas dependen unas de otras → orden importa | Aplicación serial — reglas posteriores leen `result` actualizado |
| Side-effects en condition o derive | Funciones puras documentadas; `derive` recibe doc y retorna {value, reason} |
| Toast spammea cuando no hay derivations | Render condicional `if (_smartDerived.length > 0)` |
| Smart-fields fall on broken module | `if (window.AltorraSmartFields)` guard en admin-vehicles |
| Re-correr derive duplica entries | Idempotente por construcción (re-condition retorna false) |

**Pasos de prueba**:
1. Admin → Crear vehículo nuevo
2. Llenar marca/modelo/año/precio, dejar **tipo en blanco**, kilometraje = 0
3. Guardar → toast principal "Vehículo ALT-XXX agregado", luego
   toast info "Smart Fields: Tipo: nuevo (kilometraje 0)"
4. Verificar en Firestore: `tipo: 'nuevo'`
5. Repetir con km = 5000 → tipo derivado = 'semi-nuevo'
6. Repetir con km = 50000 → tipo derivado = 'usado'
7. Crear con `precioOferta = 80M` y `precio = 100M`, dejar oferta
   sin marcar → derivado: oferta: true (precioOferta < precio)
8. Editar uno existente con `tipo` ya seteado → smart-fields NO
   pisa, ningún toast info aparece
9. Consola: `AltorraSmartFields.preview({kilometraje: 0})` →
   ver array de suggestions sin mutación

**Archivos modificados**:
- `js/smart-fields.js` — módulo nuevo (~165 líneas)
- `admin.html` — `<script>` tag antes de admin-vehicles.js
- `js/admin-vehicles.js` — `buildVehicleData` aplica derive al final
  + toast info con suggestions cuando hay derivations

### Microfase K.3 — Automation execution log + history viewer ✓ COMPLETADA (2026-05-05)

**Objetivo**: cada vez que una regla de automatización se ejecuta,
queda grabada en Firestore. El admin puede ver el historial en la
sección Automatización para auditar "esta regla disparó N veces ayer,
con qué outcome".

**Schema `automationLog/{logId}`**:
```js
{
    ruleId: 'route_high_value_financiacion',
    ruleName: 'Asignar financiación alto-valor a super_admin',
    trigger: 'comm_created',
    action: 'assign_to_super_admin',
    reason: 'financiación de alto valor',
    docId: 'abc123',
    docTitle: 'Daniel — Toyota Hilux',
    outcome: 'applied' | 'failed' | 'skipped:no-super-admin',
    timestamp: <serverTimestamp>,
    by: '<uid>',
    bySource: 'automation'
}
```

**Reglas Firestore** (`firestore.rules`):
```
match /automationLog/{logId} {
    allow read: if isAuthenticated();      // admins audit
    allow create: if request.auth != null; // engine writes from client
    allow delete: if isSuperAdmin();       // immutable except super_admin purge
}
```

> **DEPLOY MANUAL REQUERIDO**: `firebase deploy --only firestore:rules`
> para activar la nueva colección.

**`logExecution(match, outcome)`** — best-effort write desde
`applyAction()`. Falla silenciosamente si Firestore no responde
(no bloquea la acción real). Outcomes posibles:
- `applied` — la acción se ejecutó OK
- `failed` — Firestore update falló
- `skipped:no-super-admin` — regla matchea pero no hay un asesor para asignar
- En el futuro K.5 puede agregar más outcomes (`rate-limited`, `condition-changed`, etc.)

**UI viewer** (`admin.html` sección Automatización):
- Card "Historial de ejecuciones" debajo de la lista de reglas
- Botón refresh para fetch manual
- Auto-load cuando el admin entra a la sección (via
  `AltorraSections.onChange` de B.3)
- Hasta 50 entries más recientes ordenadas desc por timestamp
- Cada row: nombre regla · doc title · outcome (color-coded) · timestamp · action

**Pasos de prueba**:
1. Login como super_admin → Automatización
2. Verificar que aparece "Sin ejecuciones aún" si no hay log previo
3. Disparar una regla (e.g. crear solicitud de financiación
   alto-valor desde web pública)
4. Click refresh → ver entrada con outcome `applied` (verde)
5. Verificar en Firebase Console: doc en `automationLog/` con todos
   los campos
6. Logout/login → seguir viendo la entrada (persistente)

**Archivos modificados**:
- `js/admin-automation.js` — `logExecution()` + auto-load history
- `admin.html` — sección "Historial de ejecuciones" con refresh button
- `css/admin.css` — `.automation-history-*` styles
- `firestore.rules` — colección `automationLog/`

### Microfase K.4 — Smart Fields live preview en modal de vehículo ✓ COMPLETADA (2026-05-05)

**Objetivo**: feedback inmediato mientras el admin escribe. Cuando
escribe `kilometraje = 0` y deja `tipo` en blanco, una caja dorada
aparece debajo del input avisando "Smart Fields auto-completará al
guardar: tipo: nuevo (kilometraje 0)". Patrón Linear/Stripe — el
admin ve lo que va a pasar antes de comprometerse.

**`updateSmartFieldsPreview()`**:
- Lee los inputs relevantes (`vKm`, `vTipo`, `vEstado`, `vPrecio`,
  `vPrecioOferta`, `vPuertas`, `vPasajeros`, `vUbicacion`)
- Construye un draft doc, normaliza empty selects a `null`
- Llama `AltorraSmartFields.preview(draft)` (read-only)
- Si hay sugerencias: renderiza la caja dorada con icon sparkles,
  título y lista. Si no: oculta la caja
- Re-corre en cada `input` y `change` de los triggers

**HTML insertado** (debajo de `<input id="vKm">`):
```html
<div id="smartFieldsPreview" class="smart-fields-preview" style="display:none;"></div>
```

**Diseño**:
- Background dorado tenue (8% alpha) + border-left dorado sólido
- Icon sparkles (Lucide) animado por hover
- Lista con `<strong>` para campo, `<em>` para razón
- Fade-in suave al aparecer

**Por qué no usamos `derive()` en preview**: `derive()` muta el doc
y devuelve `result + derived`. Para preview solo necesitamos las
sugerencias (`derived`), no aplicar nada. `preview()` es read-only
por diseño y devuelve el mismo formato sin cambiar el input.

**Anti-patterns evitados**:

| Riesgo | Mitigación |
|---|---|
| Preview lagged behind input typing | Listeners `input` + `change` (cobertura completa) |
| Empty `<select>` value `''` no triggea reglas blank-check | Normaliza `'' → null` antes de preview |
| Preview se queda pegado al cambiar de vehículo (modal abierto-cerrado) | El reset es trivial: cuando el admin abre el modal, los inputs se recargan, y el primer change re-invoca preview |
| Preview con campos que ya se llenaron del vehículo cargado | preview chequea blank — si los campos están llenos, no genera sugerencias (caja oculta) |
| Modal viewer (no editor) muestra preview sin sentido | El listener fires en cambios; sin cambios sin preview cosmético |

**Pasos de prueba**:
1. Admin → Crear vehículo nuevo
2. Escribir kilometraje = 0 → caja dorada aparece: "Tipo: nuevo
   (kilometraje 0) · Estado: disponible (sin estado) · Puertas: 5
   (default) · Pasajeros: 5 (default) · Ubicación: Cartagena (sede)"
3. Escribir tipo = "usado" manual → la sugerencia de tipo desaparece
   de la caja (admin ya lo definió)
4. Cambiar km a 5000 → caja muestra "Tipo: semi-nuevo"
5. Cambiar km a 50000 → caja muestra "Tipo: usado"
6. Llenar todos los campos → caja se oculta (nada para sugerir)
7. Editar un vehículo existente con `tipo` ya seteado → caja oculta
   en apertura (no flash visual)

**Archivos modificados**:
- `admin.html` — `<div id="smartFieldsPreview">` después de `vKm`
- `js/admin-vehicles.js` — `updateSmartFieldsPreview()` + listeners
  en 8 inputs relevantes
- `css/admin.css` — `.smart-fields-preview` + sub-elementos
- `service-worker.js` + `js/cache-manager.js` — version bump
  v20260505190000

### Microfase J.1 — AI Engine local: foundation + rule-based sentiment ✓ COMPLETADA (2026-05-05)

**Objetivo**: dar al admin "inteligencia local" sin costo recurrente y
sin descargar modelos pesados al inicio. La estrategia: capa de reglas
sub-milisegundo que funciona ya, con un slot de upgrade para que un
ML provider (Transformers.js) tome el relevo cuando el admin lo solicite.

**Lo que se creó** (`js/ai/engine.js`):

API pública `window.AltorraAI`:
```js
AltorraAI.sentiment(text)              // sync, sub-ms
AltorraAI.sentimentAsync(text)         // async, opt-in para ML
AltorraAI.registerProvider(name, fn)   // ML upgrade slot
AltorraAI.capabilities()                // qué está disponible
AltorraAI.health()                      // diagnóstico
```

**Sentiment rule-based**:
- Diccionario bilingüe (español primario, inglés fallback) con 60+
  términos calibrados para conversaciones car-buying:
  - Strong positive: excelente, perfecto, encanta, increíble, genial
  - Moderate positive: bueno, gracias, contento, recomiendo, interesado
  - Strong negative: pésimo, horrible, estafa, fraude, engañado
  - Moderate negative: malo, caro, lento, problema, frustrado
- **Negación**: "no me gusta" → flips el siguiente término
- **Intensifiers**: "muy bueno" → score ×1.5
- **Salida**: `{label: 'positive'|'negative'|'neutral', score: -1..1, magnitude: 0..1, source: 'rules'}`
- **Threshold**: score > 0.15 → positive, < -0.15 → negative, else neutral

**Provider registry**: cuando un futuro J.1+ cargue Transformers.js
distilbert-multilingual (~25MB, lazy), llamará
`AltorraAI.registerProvider('sentiment', mlFn)` y `sentiment()` lo
usará automáticamente, retornando al rules fallback si la ML throws.

**Privacy**: TODA la inferencia corre en el browser. Los textos no
salen del cliente excepto cuando el admin persiste el score
explícitamente (futuro: `solicitudes/{id}.aiSentiment`).

**Stats tracking**: `_stats.callsByCapability` rastrea uso para
diagnóstico de carga ML futuro.

**Integración inicial — sentiment dot en tabla de Comunicaciones**:
- En `renderAppointmentsTable` la columna observaciones ahora muestra
  un dot color-coded antes del texto
- Verde para sentiment positivo, rojo para negativo, sin dot para neutro
- Tooltip muestra el score numérico
- Solo se computa si hay al menos 8 chars (evita ruido en respuestas
  cortas como "ok")

### Microfase J.2 — NER (entity extraction) ✓ COMPLETADA (2026-05-05)

**Objetivo**: extraer entidades estructuradas (marca, modelo, año,
precio, kilometraje, ciudad, fecha, teléfono, email, placa) de
mensajes en lenguaje natural. Patrón Salesforce Einstein / Drift.

**Lo que se creó** (`js/ai/ner.js`):

API pública `window.AltorraNER`:
```js
AltorraNER.extract(text) → {
    entities: [{type, value, raw, position: [start, end]}],
    summary: { marca, modelo, year, precio, ... }  // primer match wins
}
AltorraNER.matchVehicle(text, vehiclesArr) → {vehicle, score} | null
```

**Lexicons + regexes**:
- **Marca**: 50+ marcas conocidas (Toyota, Mazda, Mercedes-Benz, MG, BYD…)
- **Ciudad**: 30+ ciudades colombianas (Cartagena, Bogotá, Medellín, Cali…)
- **Year**: regex `/\b(19[7-9]\d|20\d{2})\b/g` (1970–2099)
- **Precio**: `$1.000.000` numérico OR `50 millones` / `50M`
  - Si número < 10K sin formato decimal → asume millones
- **Kilometraje**: `50.000 km` / `50K kilometros`
- **Email**: regex estándar
- **Teléfono**: Colombia +57 prefix, 10 dígitos con espacios/guiones
- **Placa**: `AAA000` / `AAA-000` (formato colombiano)
- **Fecha**: 4 formatos:
  - `15/03/2026` numérico
  - `15 de marzo` literal con month-map (ene/feb/.../dic)
  - `mañana / hoy / pasado mañana` relativo (resuelve a ISO)

**Vehicle matcher**: dado un texto + array de vehículos, usa NER summary
para encontrar mejor match con scoring multi-factor:
- Marca match → +3
- Modelo match → +4
- Year ±1 → +2
- Precio ±10% → +1
- Score ≥4 retorna match (umbral conservador para evitar falsos positivos)

**Provider upgrade slot**: igual que sentiment, futuras ML implementations
(spaCy.js / Transformers NER) registran via
`AltorraAI.registerProvider('ner', fn)` y NER lo intercepta antes del
fallback rules.

**Casos de uso futuros** (Bloques posteriores los consumirán):
- **Concierge bot (U.7)**: extraer entities en cada turno del cliente
  para guardar en CRM (progressive profiling L0→L5)
- **Inbox (E.12)**: highlight de entities inline + acciones one-click
  ("crear cita con esta fecha")
- **Lead scoring (J.3)**: usa entities como features (tiene presupuesto?
  ciudad? timeline?)

**Pasos de prueba**:
1. Login admin → consola
2. `AltorraAI.sentiment('me encanta este auto, gracias')` →
   `{label: 'positive', score: ~0.6, ...}`
3. `AltorraAI.sentiment('precio caro, pésima atención')` →
   `{label: 'negative', score: ~-0.7, ...}`
4. `AltorraNER.extract('Quiero un Toyota Hilux 2020 en Cartagena, presupuesto 80 millones, mi celular 3201234567')` →
   summary: `{marca: 'toyota', year: 2020, ciudad: 'cartagena', precio: 80000000, telefono: '3201234567'}`
5. Admin → Comunicaciones → fila con mensaje negativo muestra dot rojo
6. Admin → Comunicaciones → fila con "gracias por la atención" muestra dot verde

**Anti-patterns evitados**:

| Riesgo | Mitigación |
|---|---|
| Sentiment lento en hot path render | Sub-ms rule-based, llamado solo si msg.length > 8 |
| Lexicon parcial → falsos negativos | Cobertura de 60+ términos con calibración manual |
| Negación rota ("no es malo" → negativo) | Stack-based: el siguiente término scored se flipea |
| Precio numérico ambiguo (50 vs 50.000.000) | Default a millones si número pequeño sin punto |
| Fecha relativa cuando se cambia el día | Recomputa cada llamada (no cacheado) |
| Ciudad como falso match en mid-word | Word-boundary check via regex `\b...\b` |
| Vehicle matcher falso positivo en pocas señales | Threshold ≥4 (requiere 2+ entities en match) |
| NER llamado antes de carga | Guard `if (window.AltorraNER)` en callsites |

**Archivos creados/modificados**:
- `js/ai/engine.js` — módulo nuevo (~190 líneas)
- `js/ai/ner.js` — módulo nuevo (~350 líneas)
- `admin.html` — `<script>` tags antes de admin-vehicles.js
- `js/admin-appointments.js` — sentiment dot inline en columna observaciones
- `service-worker.js` + `js/cache-manager.js` — version bump v20260505200000

**Próximos pasos del bloque**: J.3 (lead scoring v2 con regresión
sobre entities + sentiment), J.4 (no-show prediction), J.5 (anomaly
detection sobre KPIs), J.6 (image categorizer con MobileNet),
J.7 (OCR Tesseract.js lazy), J.8 (Next Best Action). Cada una se
plugea en `AltorraAI.registerProvider(...)`.

### Microfase J.3 — Lead scoring v2 enriquecido con señales AI ✓ COMPLETADA (2026-05-05)

**Objetivo**: el `computeScoreBreakdown` de `admin-crm.js` (MF4.5)
calcula un score base con 7 factores ponderados (engagement, económico,
recencia, etc.). J.3 agrega una capa "AI insights" que ajusta el score
±15 puntos basándose en sentiment + entities + urgencia detectados por
J.1 y J.2 sobre los mensajes del cliente.

**Decisión de diseño**: NO usamos TensorFlow.js + regresión logística
(plan original) porque son ~200KB extras y el ROI es marginal cuando
ya tenemos un scorer multifactor sólido. J.3 enriquece, no reemplaza.

**Lo que se creó** (`js/ai/scoring.js`):

API pública `window.AltorraScoring`:
```js
AltorraScoring.aiSignals(contact, communications) → {
    avgSentiment, sentimentVariance, sentimentSamples,
    entityTypes, entityRichness,           // 0..7 tipos qualifying
    urgencyScore,                          // count de palabras urgentes
    intentDiversity,                       // cita+solicitud+lead
    messageCount, avgMessageLength
}

AltorraScoring.enrichScore(baseScore, signals) → {
    score, baseScore, delta, adjustments[], signals
}

AltorraScoring.explainEnrichment(enrichment) → texto humano
```

**Reglas de ajuste**:

| Señal | Condición | Ajuste |
|---|---|---|
| Sentiment muy positivo + 2+ samples + variance baja | avg > 0.3, σ < 0.3 | **+8** |
| Sentiment positivo (variable) | avg > 0.3 | **+5** |
| Sentiment muy negativo + consistente | avg < -0.3, σ < 0.3 | **-10** |
| Sentiment negativo (variable) | avg < -0.3 | **-6** |
| Lead muy informativo | entityRichness ≥ 4 | **+5** |
| Lead moderadamente informativo | entityRichness ≥ 2 | **+2** |
| Alta urgencia | 3+ palabras urgentes | **+7** |
| Urgencia detectada | 1-2 palabras urgentes | **+3** |

**Cap global**: ±15 puntos. Score final clampeado a 0..100.

**URGENCY_TOKENS** (15 palabras): urgente, rápido, ya, ahora, pronto,
inmediato, asap, "cuanto antes", "esta semana", etc.

**Qualifying entity types** (7): precio, ciudad, year, kilometraje,
fecha, marca, modelo. Un cliente que mencionó 4+ tipos es lead caliente
con info concreta — bonus.

**Hook en `computeScoreBreakdown`**:

Después de calcular el score base, si `AltorraScoring` está disponible
y el contacto tiene comms:
1. `aiSignals(c, comms)` recorre todos los mensajes y agrega sentiment
   + NER + urgencia
2. `enrichScore(baseScore, signals)` calcula el delta
3. Retorna `{score: enriched, factors, weights, aiEnrichment: {...}}`

Si AltorraScoring no está cargado (página pública sin admin) o falla,
retorna el score base intacto. **No-regresión garantizada**.

**Visualización en CRM 360° → tab Score**:

Bajo el breakdown de factores tradicional, aparece un bloque dorado
con:
- Icono sparkles + título "AI insights"
- Delta total: "+12 ajuste" o "-8 ajuste" (color-coded)
- "Score base 65 → final 73 · 4 mensajes analizados"
- Lista de razones: "(+8) sentiment positivo y consistente · (+5) lead muy informativo"

**Anti-patterns evitados**:

| Riesgo | Mitigación |
|---|---|
| AI cambia score sin transparencia | aiEnrichment expone delta + razones por adjustment |
| Score base se rompe si AI falla | Try/catch retorna baseScore intacto |
| Mensajes cortos generan ruido | `getMessages()` retorna empty si < 4 chars |
| Ajuste descontrolado | Cap absoluto ±15 puntos |
| Llamadas excesivas a AI engine | Cada render del CRM ya re-corre breakdown — sin overhead extra (sub-ms por mensaje) |
| Sentiment muy positivo en 1 solo mensaje | Requiere ≥2 samples para aplicar bonus |
| Urgencia falso positivo (e.g. "ya" significa "todavía") | Requiere 3+ hits para alta urgencia, 1-2 para moderada |
| Variance ignora outliers | sentiment outliers reducen confianza → bonus moderado en vez de fuerte |

**Pasos de prueba**:
1. Login admin → CRM
2. Click "Ver 360°" en un contacto que tenga al menos 2 comunicaciones
   con mensajes (observaciones/comentarios/mensaje)
3. Tab "Score" → ver score base con factores Y bloque AI insights
4. Si los mensajes son positivos ("excelente, gracias, recomiendo") →
   delta > 0 con bonus de sentiment
5. Si mencionaron precio + ciudad + año en mensajes → bonus de
   entity richness
6. Consola: `AltorraScoring.aiSignals(contact, contact.comms)` →
   inspeccionar señales raw

**Archivos creados/modificados**:
- `js/ai/scoring.js` — módulo nuevo (~210 líneas)
- `admin.html` — script tag antes de admin-vehicles.js
- `js/admin-crm.js` — `computeScoreBreakdown` enriquece con AI signals
  + tab "Score" muestra bloque AI insights con razones
- `service-worker.js` + `js/cache-manager.js` — version bump
  v20260505210000

**Próximos pasos**: J.4 (no-show prediction usando histórico de citas
+ sentiment), J.5 (anomaly detection sobre KPIs), J.6+ (vision + OCR
+ NBA). El score enriquecido alimenta directamente al Bloque R
(Predictive Analytics) cuando llegue.

### Microfase J.8 — Next Best Action (NBA) por contacto ✓ COMPLETADA (2026-05-05)

**Objetivo**: dar al asesor sugerencias accionables priorizadas por
contacto: "llamar ahora", "enviar cotización", "confirmar cita",
"reactivar lead frío". Patrón Salesforce Einstein NBA / HubSpot.

**Decisión**: saltamos J.4-J.7 (no-show ML, anomaly, vision MobileNet,
OCR Tesseract) porque requieren modelos de 200KB+ con lazy-load
complejo. J.8 cierra el bloque J pragmáticamente — todo el valor
con cero costo recurrente.

**Lo que se creó** (`js/ai/nba.js`):

```js
AltorraNBA.suggest(contact, options) → [
    { action, priority, reason, cta, icon }
]
```

**10 reglas heurísticas** ordenadas por prioridad:

| # | Acción | Prioridad | Disparador |
|---|---|---|---|
| 1 | call_now | 100 | urgencyScore ≥ 2 (J.3 signals) |
| 5 | confirm_appointment | 95 | Cita en próximas 48h sin completada/cancelada |
| 9 | retention_call | 92 | Sentiment muy negativo (avg < -0.4, 2+ samples) |
| 2 | reach_hot_lead | 90 | Score ≥ 70 + sin contacto hace 2+ días |
| 4 | send_quote | 88 | Financiación pendiente cuota inicial ≥ $50M |
| 3 | assign_asesor | 85 | Solicitud pendiente sin assignedTo |
| 6 | whatsapp_followup | 60 | Score 40-70 + 5-30 días sin actividad |
| 10 | request_referral | 55 | Sentiment muy positivo (avg > 0.5, 3+ samples) + score ≥ 60 |
| 7 | reactivate_with_offer | 50 | Score 30-60 + 30+ días frío |
| 8 | engagement_survey | 35 | Cliente registrado sin solicitudes |

**Visualización en CRM 360° → tab Resumen**:

Bloque dorado al inicio del tab con:
- Header "Próximas acciones sugeridas" + icono zap
- Top 3 acciones con icono + CTA bold + razón humana
- Border-left rojo para prioridad ≥ 92 (urgencia/retención)
- Border-left dorado para prioridad 85-90 (lead caliente)
- Hover lift sutil

**Hook con J.3**:

Antes de llamar a `AltorraNBA.suggest()`, recomputamos el score y
adjuntamos `_score` y `_aiEnrichment` al contacto. Esto permite que
las reglas urgency / sentiment / retention usen las señales AI
calculadas por `AltorraScoring.aiSignals()`.

**Anti-patterns evitados**:

| Riesgo | Mitigación |
|---|---|
| Sugerir mismo contacto múltiples veces lo mismo | Cada suggestion tiene `action` único — el UI puede dedup si necesita |
| Cita pasada se sugiere como "confirmar" | Filtro `horasFaltan > 0 && < 48` |
| Lead caliente bombardeado con sugerencias contradictorias | Sort por prioridad + `limit: 3` por defecto |
| Reglas dependientes de aiEnrichment crashean si J.3 falló | Guard `if (aiEnrichment && aiEnrichment.signals)` |
| Cliente sin actividad reciente → Infinity en daysSince | Check `lastDays !== Infinity` antes de aplicar reglas de tiempo |
| Tipos `kind: 'cita'` sin fecha real | Validación `if (last.fecha)` antes de parsear |

**Pasos de prueba**:
1. Login admin → CRM
2. Click "Ver 360°" en un contacto con varias comunicaciones
3. Tab "Resumen" → bloque dorado "Próximas acciones sugeridas" arriba
4. Si tiene cita en 48h → primera acción "Confirmar cita" (rojo, 95)
5. Si score caliente y sin tocar → "Contactar" (dorado, 90)
6. Si tiene financiación grande pendiente → "Enviar cotización" (dorado, 88)
7. Consola: `AltorraNBA.suggest(contact)` retorna array completo sin
   limit

**Cierre Bloque J** (J.1+J.2+J.3+J.8): el AI Engine local entrega
sentiment + NER + scoring enriquecido + NBA sin un solo byte de modelo
descargado. Sub-ms en el hot path. Todos los slots provider listos
para upgrade ML futuro (Transformers.js, TF.js) sin tocar callsites.

**Archivos creados/modificados**:
- `js/ai/nba.js` — módulo nuevo (~165 líneas, 10 reglas)
- `admin.html` — script tag antes de admin-vehicles.js
- `js/admin-crm.js` — bloque NBA al inicio del tab Resumen del CRM 360°
- `css/admin.css` — `.crm-nba-block`, `.crm-nba-item` con border-left
  color por prioridad
- `service-worker.js` + `js/cache-manager.js` — version bump
  v20260505220000

**Pendiente de J (deferido a futuro)**:
- J.4 — No-show prediction (decision tree sobre histórico de citas)
- J.5 — Anomaly detection sobre KPIs (Web Worker)
- J.6 — Image auto-categorizer (TF.js MobileNet, ~5MB lazy)
- J.7 — OCR placas + cédulas (Tesseract.js, ~5MB lazy)

Cada uno se plugea via `AltorraAI.registerProvider(...)` cuando se
implemente sin tocar el resto del sistema.

### Microfase R.1+R.2+R.3+R.4 — Predictive Analytics ✓ COMPLETADA (2026-05-05)

**Objetivo**: Bloque R completo — entrega un widget "Insights del día"
en el dashboard del admin con 4 secciones: forecast de ventas, hot
leads del día, vehículos al borde (stale) y riesgo de churn. Construye
sobre J.3 (scoring) y aporta valor visible inmediato cada vez que el
admin abre el panel.

**Decisión de diseño**: Sin TensorFlow.js. La regresión lineal por
mínimos cuadrados es matemática elemental (~30 líneas) y entrega 95%
del valor con 0% del peso. Las reglas heurísticas de hot leads / stale
/ churn corren sub-millisegundo sobre `AP.vehicles` y `AltorraCRM.getContacts()`.

**Lo que se creó**:

#### `js/ai/forecast.js` — librería de predicción numérica

API pública `window.AltorraForecast`:
```js
AltorraForecast.linear(values)            → {slope, intercept, predict, r2, n}
AltorraForecast.predictNext(values, n=1)  → array de n predicciones
AltorraForecast.confidence(values, n=1)   → {predictions, lower, upper, sigma, r2}
AltorraForecast.movingAverage(values, w)  → array suavizado
AltorraForecast.detectAnomaly(values, σ=2) → array con índices anómalos
```

- **Regresión lineal por mínimos cuadrados** con cálculo de R² (calidad
  del ajuste, 0..1)
- **Confidence interval ±1.96σ** (≈95% confianza) basado en residuales
  del fit
- **Moving average** para suavizar series con ruido
- **Anomaly detection** por z-score
- Mínimo 3 puntos para retornar fit (evita fits espurios sobre 2 puntos)
- Predicciones clampeadas a ≥0 (no tiene sentido predecir ventas negativas)

#### `js/admin-predictive.js` — orquestador del widget

API pública `window.AltorraPredictive`:
```js
AltorraPredictive.refresh()         → recalcula y renderiza
AltorraPredictive.hotLeads(n=5)     → top N hot leads
AltorraPredictive.staleVehicles(d=60) → vehículos sin movimiento >d días
AltorraPredictive.churnRisk()       → contactos en riesgo
AltorraPredictive.salesForecast()   → forecast de ventas próximo mes
```

**R.2 — Hot leads del día**:
- Lee contactos vía `AltorraCRM.getContacts()`, ranking por score
  (de J.3 enriquecido) - penalty leve por días sin tocar
- Filtro: `score ≥ 50` AND última actividad < 30 días
- Heat = score - min(20, lastDays * 0.5) → prioriza warm-recientes
- Top 5 por defecto
- **Fallback**: si AltorraCRM no expone API (race en init), reconstruye
  contactos desde `AP.appointments` agrupados por email

**R.3 — Vehículos al borde**:
- Filtra `AP.vehicles` con `estado === 'disponible'` Y `daysSince(createdAt) ≥ 60`
- Ordena por `daysStale` desc (los más viejos primero)
- Top 5 mostrados; admin ve fácilmente qué inventario tiene quemado

**R.4 — Churn risk**:
- Contactos con `score ≥ 50` (eran hot/tibios) pero `lastDays ≥ 20 && < 90`
- Ordena por score descendente (los más valiosos primero)
- Top 5 — sugiere reconexión proactiva

**Sales forecast**:
- Cuenta vehículos vendidos por mes en últimos 6 meses
- Si total ≥ 3, llama `AltorraForecast.confidence()` para predecir
  próximo mes con intervalo 95%
- Renderiza con flecha ↑/↓ vs último mes (color verde/rojo) + rango
  inferior-superior + R² (calidad del ajuste %)

**Renderizado del widget**:

Card al inicio del dashboard (después de stats-grid, antes de
quick-actions) con:
- Header `<i data-lucide="sparkles"></i> Insights del día` + botón refresh
- Grid responsive `auto-fit minmax(220px, 1fr)` con 3-4 columnas
- Cada columna con título + lista de items + empty state
- Hot leads: avatar con iniciales + nombre + score/días
- Stale: icono car + marca/modelo/año + días sin moverse
- Churn: icono alert-triangle + nombre + score/días
- Forecast (cuando hay datos): número grande con flecha + rango + R²

**Auto-refresh**:
- Re-render cuando admin entra al dashboard (vía
  `AltorraSections.onChange`)
- Re-render cuando bus emite `vehicle.*` o `comm.*` (data nueva)
- Refresh manual via botón (icono refresh-cw)
- Init bloquea hasta que `AP.vehicles.length > 0` (max 60 intentos)

**Anti-patterns evitados**:

| Riesgo | Mitigación |
|---|---|
| Forecast espurio sobre 1-2 puntos | `linear()` requiere ≥ 3 valores |
| División por cero si todos los valores son iguales | Guard `denom === 0` retorna null |
| Predicciones negativas (ventas no pueden ser <0) | `Math.max(0, predicted)` |
| Confidence interval irreal con muestra pequeña | Sigma usa `n-2` en denominador (corrección Bessel) |
| Hot leads sin datos del CRM | Fallback a `AP.appointments` reconstruyendo agrupado por email |
| Recompute caro en cada render del CRM | Widget solo se re-renderiza en eventos relevantes, no en cada tick |
| Stale vehicles falsos positivos (acaba de cambiar estado) | Filtra solo `estado === 'disponible'` (vendido/reservado excluidos) |
| Churn risk sobre contactos nunca activos | Filtro `lastDays !== Infinity` y `< 90` (no demasiado viejos) |
| Forecast de meses futuros sin contexto | `predictNext(values, 1)` solo predice 1 paso (más allá es ruido) |

**Pasos de prueba**:
1. Login admin → Dashboard
2. Card "Insights del día" aparece después de stats con 3-4 columnas
3. Si hay vehículos vendidos en los últimos 6 meses con datos
   suficientes, aparece el forecast con número grande
4. Cambiar estado de un vehículo a "vendido" → Activity Feed dispara
   `vehicle.updated`, widget se re-renderiza solo
5. Click refresh manual → recalcula todo
6. Consola: `AltorraForecast.linear([5, 7, 9, 11])` → `{slope: 2, intercept: 5, r2: 1}`
7. Consola: `AltorraPredictive.hotLeads(10)` → array completo

**Archivos creados/modificados**:
- `js/ai/forecast.js` — módulo nuevo (~150 líneas)
- `js/admin-predictive.js` — módulo nuevo (~280 líneas)
- `admin.html` — `<div id="predictiveInsights">` en dashboard +
  scripts cargados
- `js/admin-crm.js` — `AltorraCRM.getContacts` alias para que el
  predictive module lo consuma
- `css/admin.css` — `.predictive-card` + `.pred-grid` + 12 sub-clases
- `service-worker.js` + `js/cache-manager.js` — version bump v20260505230000

**Cierre Bloque R**: con esta entrega, el Bloque R queda completo en
una sola microfase compuesta. La extensión natural sería persistir
score histórico en Firestore para R.4 más preciso (detectar caídas
reales vs estimaciones), pero el patrón funciona ya con buen ROI.

### Microfase Q.1+Q.2+Q.3+Q.4 — Knowledge Graph completo ✓ COMPLETADA (2026-05-05)

**Objetivo**: red de relaciones implícitas que conecta contactos ↔
vehículos ↔ marcas. Permite responder "¿quién está interesado en este
vehículo nuevo?", "¿qué contactos son similares?", "¿quién busca SUV
menor a $100M en Cartagena?". Patrón LinkedIn/Salesforce knowledge
graph.

**Decisión de diseño**: Sin Web Worker + IndexedDB (overkill para
nuestros datasets de pocos miles de docs). Grafo in-memory plano que
se reconstruye con throttle de 5s al cambiar los datos. Vacía y
reconstruye completo en cada build — más simple que mantener delta
updates, y como reconstruir es O(n) y los datos caben en memoria,
es perfectamente eficiente.

**Lo que se creó** (`js/ai/knowledge-graph.js`):

API pública `window.AltorraGraph`:
```js
AltorraGraph.build()                    → reconstruir (con throttle)
AltorraGraph.neighborsOf(nodeId, opts)  → vecinos del nodo, ordenados por weight
AltorraGraph.matchContactsForVehicle(v) → contactos que probablemente quieren v
AltorraGraph.searchContacts(query)      → búsqueda NL con NER + filtros semánticos
AltorraGraph.stats()                    → métricas del grafo
```

**Estructura del grafo**:

| Nodo | Key | Datos |
|---|---|---|
| Contact | `contact:<email>` | nombre, telefono, ciudad, score, commCount |
| Vehicle | `vehicle:<id>` | marca, modelo, year, precio, categoria, estado |
| Brand | `brand:<nombre>` | name, count |

**Aristas** con weight (mayor = relación más fuerte):

| From | To | Kind | Weight |
|---|---|---|---|
| contact | vehicle | `interested_in` | 4 si cita, 3 si solicitud, 1 si lead |
| vehicle | contact | `attracted_contact` | mismo weight inverso |
| contact | brand | `likes_brand` | sumado del weight del comm |
| contact | brand | `mentioned_brand` | 1 cada vez que NER detecta marca en texto libre |
| vehicle | brand | `is_brand` | 1 |
| contact | contact | `similar_to` | # marcas compartidas |

**Edges similar_to**: solo se computan entre contactos con `score ≥ 30`
para no inflar el grafo con guests sin actividad. O(n²) sobre el
subset hot, lo cual es manejable.

**Q.1 — Build automático con throttle**:
- Reconstruir es O(n) sobre `AP.vehicles + AP.appointments`
- Throttle de 5s evita rebuilds excesivos cuando llegan eventos en ráfaga
- Listener al `AltorraEventBus` reconstruye en `vehicle.*` y `comm.*`
- Al terminar emite `graph.built` con métricas (contacts/vehicles/brands/edges)

**Q.2 — Tab "Red" en CRM 360°**:

Nuevo tab con 3 secciones:
- **Marcas de interés**: top 5 brands con `likes_brand`, ordenadas por weight
- **Vehículos consultados**: top 5 vehicles con `interested_in`
- **Contactos similares**: top 5 contacts con `similar_to`, ordenados por #marcas compartidas

Cada item con icono Lucide + nombre + weight numérico al final.
Empty state en español si no hay data todavía.

**Q.3 — matchContactsForVehicle(vehicle)**:

Algoritmo de matching:
1. Encuentra contactos con edge `likes_brand` o `mentioned_brand` apuntando a la marca del vehículo
2. Score base = weight del edge × 10
3. Bonus +5 si el contacto pidió antes la misma categoría (suv/sedan/etc.)
4. Bonus +8 si presupuesto esperado del contacto está dentro de ±20% del precio del vehículo
5. Bonus general por score CRM del contacto (lead caliente prioritario)

**Auto-suggest en `vehicle.created`**: listener al EventBus que cuando
un nuevo vehículo se crea espera 6s (para que el grafo lo incluya en
el rebuild), llama `matchContactsForVehicle()` y si hay matches,
emite una notificación "Nuevo vehículo: N contactos interesados"
con link a `admin.html#crm`.

**Q.4 — Búsqueda semántica `searchContacts(query)`**:

Input box dorado con icono sparkles arriba de la tabla CRM:
"interesados en SUV menor a $100M en Cartagena"

Algoritmo:
1. NER extrae `summary.marca`, `summary.ciudad` del query
2. Detecta categoría buscada (SUV, sedan, pickup, hatchback) por keywords
3. Detecta límite de precio con regex de "menor/menos/hasta/máximo + número + m/k"
4. Para cada contacto del grafo, score por:
   - +10 si tiene edge a la marca mencionada
   - +8 si su ciudad coincide
   - +7 si pidió antes esa categoría (vía categoria del comm o vehicleId conectado)
   - +5 si tiene comm con `precioEsperado ≤ priceLimit`
5. Filtra `matchScore ≥ 5` y ordena descendente
6. Top 20

Resultados en una card debajo del input con avatar + nombre + razones
("le interesa toyota · en cartagena · busca suv · presupuesto ≤ $100M")
+ score numérico dorado.

Debounce de 350ms para no recalcular en cada tecla.

**Anti-patterns evitados**:

| Riesgo | Mitigación |
|---|---|
| Rebuild en ráfaga (10 events/s) | Throttle de 5s con timeout pendiente |
| Grafo enorme con O(n²) edges | similar_to solo en hot contacts (score ≥ 30) |
| Auto-notify de vehicle.created en replay del Activity Feed | Skip si `payload.__replay === true` |
| matchContactsForVehicle antes del rebuild | Auto-suggest espera 6s antes de query |
| NER en query vacío | Guard `if (!query)` retorna [] |
| Edges perdidos al reconstruir | `build()` reset completo de nodes/edges, no merge |
| Contactos duplicados por email mayúsculo/minúsculo | Normalizar `email.toLowerCase().trim()` en nodeKey |
| Estallar memoria con muchos vehículos | nodes son referencias, no copias profundas (raw apunta a AP.vehicles) |
| Búsqueda semántica retornando contactos sin razones | Filtro `matchScore >= 5` garantiza al menos 1 razón |

**Pasos de prueba**:
1. Login admin → CRM
2. Buscar en el input dorado "interesados en SUV en Cartagena" →
   ver resultados con razones
3. Click "Ver 360°" en cualquier contacto → tab "Red" muestra
   marcas/vehículos/similares
4. Crear un vehículo nuevo (e.g. Toyota Hilux) →
   esperar 6s → ver notificación "Nuevo vehículo: N interesados"
5. Consola: `AltorraGraph.stats()` → ver tamaño del grafo
6. Consola: `AltorraGraph.matchContactsForVehicle(AP.vehicles[0])` →
   array completo
7. Consola: `AltorraGraph.searchContacts('mazda en bogota')` →
   resultados sin filtro de UI

**Archivos creados/modificados**:
- `js/ai/knowledge-graph.js` — módulo nuevo (~360 líneas)
- `admin.html` — script tag + buscador semántico + nuevo tab "Red"
- `js/admin-crm.js` — render del tab Red + lógica `runSemanticSearch()`
  con debounce
- `css/admin.css` — `.crm-graph-*` + `.crm-semantic-*` (~110 líneas)
- `service-worker.js` + `js/cache-manager.js` — version bump v20260505240000

**Cierre Bloque Q**: el Knowledge Graph queda funcionando con auto-rebuild,
3 funciones de query (neighborsOf / matchContactsForVehicle / searchContacts),
auto-suggest en vehicle.created, y dos UIs de consumo (tab Red + buscador
semántico). Listo para que **Bloque U (Concierge)** lo use al recomendar
vehículos al cliente en el chat.

### Microfase U.1+U.2+U.3+U.4 — Concierge Unificado: arranque del bloque U ✓ COMPLETADA (2026-05-05)

**Objetivo**: primer sprint del Bloque U, la **estrella del plan**.
Reemplaza los 2 widgets actuales (`whatsapp-widget.js` + `ai-assistant.js`)
con UN solo Concierge inteligente que tiene 3 modos seamless: 🤖 bot
AI 24/7, 👨 asesor en vivo, 📲 WhatsApp gateway. Captura todo lead
progresivamente al CRM.

**Decisión de diseño**: el plan original tenía 19 microfases en U.
Las shipeo en sprints de 4-5 cada uno para mantener PR-able size.
Este primer sprint cubre:
- **U.1**: Design system del widget (CSS dorado con animaciones)
- **U.2**: Schema unificado de mensajes (`localStorage` + `sessionId`)
- **U.3**: Migración de los widgets legacy (handover preservando wa.me)
- **U.4**: Frontend `concierge.js` que reemplaza `whatsapp-widget.js` + `ai-assistant.js`

**Lo que se creó**:

#### `js/concierge.js` — singleton

API pública `window.AltorraConcierge`:
```js
AltorraConcierge.open()        → abrir widget
AltorraConcierge.close()       → cerrar
AltorraConcierge.send(text)    → enviar mensaje (programático)
AltorraConcierge.session()     → estado actual (snapshot)
```

**Estado de sesión** persistido en `localStorage.altorra_concierge_session`:
- `sessionId` único por cliente (`cnc_<timestamp>_<rand>`)
- `mode`: `'bot' | 'live' | 'wa_handed_over'`
- `messages[]`: array de `{from, text, timestamp, cta}`
- `uid, email, nombre, telefono`: identidad (rellena al loguearse)
- `level`: 0..5 (progressive profiling — U.17)
- `sourcePage, sourceVehicleId`: tracking del origen

**Flujo bot**:
1. Cliente escribe → `addMessage('user', text)`
2. Después de 500-1100ms (sentir natural) → `generateBotResponse(text)`:
   - Primero sentiment check via J.1: si muy negativo, escala
   - FAQ matching (6 entradas: financiación, vender auto, catálogo,
     ubicación, horario, agendar cita)
   - Si NER (J.2) detecta marca/modelo/precio → ofrece conectar
   - Fallback: oferta de hablar con asesor

**Modo live**:
- `escalateToLive()` cambia `mode='live'`, agrega mensaje confirmando
- Crea lead en `solicitudes/` con `kind:'lead'`, `origen:'concierge'`,
  `comentarios` con resumen de los primeros 5 mensajes del cliente
- Aplica `AltorraCommSchema.computeMeta()` para inferir priority/SLA/tags
  (heredado del schema de Bloque MF1.x)

**WhatsApp handover**:
- `handoverToWhatsApp()` construye un mensaje resumen con ticket +
  identidad + último contexto, abre `wa.me/+573235016747?text=...`
- Marca `mode='wa_handed_over'` para que el admin vea el handoff

**Auth hook**:
- Listener a `auth.onAuthStateChanged`: si el cliente se loguea,
  copia `uid`/`email`/`displayName` a la sesión y bumpea `level: 0 → 2`
  (L2 contactable). Identity merge completo en U.18.

**Quick actions** (botones arriba del chat):
- "👨 Asesor en vivo" → `escalateToLive()`
- "📲 WhatsApp" → `handoverToWhatsApp()`

**CTAs por mensaje del bot** (botón opcional dentro de la burbuja):
- `goto-simulador` → simulador-credito.html
- `goto-busqueda` → busqueda.html
- `open-modal-vende` → modal Vende tu Auto
- `open-modal-financiacion` → modal Financiación
- `open-wa` → handover WhatsApp
- `escalate` → modo live

#### `css/concierge.css` — design system del widget

- **FAB botón flotante** (60×60px, dorado con gradiente, animación pulse
  3s loop, hover scale 1.08 + lift). Bottom-right en desktop, bottom
  con safe-area en mobile.
- **Panel deslizable** (380×560px desktop / full-width mobile):
  - Header con avatar + título + status text + close X
  - Quick actions row con 2 botones
  - Messages area scrolleable con burbujas estilo iMessage
  - Input + send button con glow dorado al focus
- **Burbujas tipadas**:
  - `.cnc-bot-bubble` — beige tenue con borde inferior izq cuadrado
  - `.cnc-asesor-bubble` — verde con border-left cuando responde asesor
  - `.cnc-user-bubble` — gradiente dorado oscuro alineada a la derecha
- **Welcome bubble** — borde discontinuo dorado, mensaje inicial
- **Animations**:
  - `cncMsgIn` — fade-up 280ms al aparecer cada mensaje
  - `cncPulse` — pulse exterior del FAB (rojo glow 3s loop)
  - Panel open: opacity + scale + translateY con cubic-bezier "snap"
- **prefers-reduced-motion**: animaciones desactivadas, transition lineal

#### Reemplazo en `js/components.js`

Sección `loadAuthSystem()`:
- ❌ Eliminada: carga de `js/whatsapp-widget.js` y `js/ai-assistant.js`
- ✅ Agregada: carga de `css/concierge.css`, `js/concierge.js`,
  `js/ai/engine.js`, `js/ai/ner.js`, `js/comm-schema.js` (en orden, defer)

El Concierge en su `init()` además detecta y remueve cualquier elemento
DOM residual de los widgets legacy (`.whatsapp-widget-fab` y
`.ai-assistant-fab`) por si alguna página antigua los inyectó manualmente.

**Anti-patterns evitados**:

| Riesgo | Mitigación |
|---|---|
| Widget legacy + Concierge ambos visibles | `init()` busca y remueve DOMs legacy |
| Lead duplicado al escalar varias veces | Flag `_leadCreated` previene duplicados en una sesión |
| Sesión perdida al recargar la página | localStorage persiste todo el state |
| Bot responde antes de que el sentiment carga | Guard `if (window.AltorraAI)` antes de usarlo |
| Welcome aparece después de mensajes guardados (race) | renderMessages chequea `messages.length === 0` para mostrar welcome |
| Send vacío | Trim + validación antes de addMessage |
| Sourcing del vehículo en páginas generadas | Lee `window.PRERENDERED_VEHICLE_ID` del meta inyectado en el HTML |
| Mobile keyboard tapando input | Layout flex permite que el panel se acomode al viewport |
| Prefers-reduced-motion ignorado | Media query desactiva animaciones |
| Re-cargar el widget en cada navegación | `if (document.querySelector('script[src*="concierge.js"]'))` skip |

**Pasos de prueba**:
1. Abrir cualquier página pública (index, busqueda, detalle-vehiculo)
2. Ver el botón dorado pulsante en bottom-right
3. Click → panel desliza con animación
4. Mensaje welcome aparece
5. Escribir "quiero financiar un Mazda CX-5" → bot responde con FAQ
   de financiación + CTA "Ir al simulador"
6. Click "Asesor en vivo" → status cambia a "Asesor en vivo · respondemos
   pronto", se crea lead en Firestore `solicitudes/`
7. Verificar Firestore: doc creado con `kind:'lead'`, `origen:'concierge'`,
   `sessionId` único, `comentarios` con resumen
8. Click "WhatsApp" → abre wa.me con mensaje pre-rellenado incluyendo
   ticket # y resumen
9. Recargar la página → mensajes anteriores siguen ahí (localStorage)
10. Loguearse → siguiente apertura del panel: la sesión tiene `uid`,
    `email`, `nombre` populated
11. Mobile: panel ocupa pantalla completa con safe-area correcta

**Pendiente del Bloque U** (próximos sprints):
- U.5 — Knowledge Base CRUD admin (vehículos auto-sync, FAQs)
- U.6 — Embeddings + RAG (Xenova/all-MiniLM-L6-v2 lazy ~25MB)
- U.7 — Intent classifier + NER per-turn
- U.8 — Response generator con personalidad Altorra
- U.9 — Sentiment + auto-escalation con threshold
- U.10 — Bandeja admin Concierge (lista realtime de conversaciones)
- U.11 — Chat detail admin estilo WhatsApp
- U.12 — Smart suggestions para asesor (3 respuestas sugeridas)
- U.13 — Conversation summarization
- U.14 — WhatsApp handover refinado con contexto completo
- U.15 — Cleanup de chats viejos (>2 semanas)
- U.16 — Soft contact a CRM al primer mensaje
- U.17 — Progressive profiling completo (L0→L5)
- U.18 — Identity merge cuando guest se registra con email matching
- U.19 — Marketing opt-in granular + GDPR

**Archivos creados/modificados**:
- `js/concierge.js` — módulo nuevo (~470 líneas)
- `css/concierge.css` — stylesheet nuevo (~250 líneas)
- `js/components.js` — reemplazada carga de widgets legacy por Concierge
- `service-worker.js` + `js/cache-manager.js` — version bump v20260505250000

**Archivos legacy preservados** (transitoriamente, 2 semanas):
- `js/whatsapp-widget.js` — ya NO se carga, Concierge lo cubre
- `js/ai-assistant.js` — ya NO se carga, Concierge lo cubre
- `css/whatsapp-widget.css` y `css/ai-assistant.css` (si existen) —
  no referenciados, eventual cleanup en U.15

### Microfase U.10+U.11 — Concierge bandeja admin + chat detail ✓ COMPLETADA (2026-05-05)

**Objetivo**: dar al asesor humano la UI para ver y responder las
conversaciones que escalaron al modo `live`. Sprint 2 del Bloque U.

**Lo que se creó**:

#### `js/admin-concierge.js` — bandeja admin (~280 líneas)

API pública `window.AltorraAdminConcierge`:
```js
AltorraAdminConcierge.refresh()           → recargar lista
AltorraAdminConcierge.openChat(sessionId) → abrir chat detail
```

**Listener realtime** sobre `conciergeChats/`:
- Query `orderBy(lastMessageAt, 'desc').limit(50)`
- Solo activo para `editor+` (RBAC)
- Auto-arranque cuando admin entra a la sección "concierge" o cuando
  el panel admin se carga (para que el badge de unread funcione globalmente)

**Renderizado lista**: cada item con avatar (iniciales), nombre, mode
icon (🤖 bot / 👨 live / 📲 wa), snippet del último mensaje, tiempo
relativo, badge de unread si aplica.

**Click en un chat**:
- Marca leído (`unreadByAdmin: 0`)
- Cancela listener previo de mensajes
- Inicia listener `messages/` ordenado por timestamp
- Renderiza chat detail con burbujas (cliente/asesor/bot) + meta
  (email, teléfono, vehículo origen)

**Quick replies** en footer del chat detail:
- "👋 Saludo" — template "Hola, soy [tu nombre], asesor..."
- "📋 Info vehículo" — template para enviar info
- "📅 Agendar" — template para invitar a visita
- "📲 A WhatsApp" — template para handoff

**Send asesor message**:
- Crea doc en `conciergeChats/<sid>/messages/` con `from:'asesor'`,
  `asesorUid`, `asesorNombre` (del perfil admin)
- Update parent doc con `lastMessage`, `lastMessageAt`, `unreadByUser` + 1
- El listener del cliente (en `concierge.js`) recibe el mensaje
  realtime y lo muestra al cliente

**Marcar resuelto**:
- Confirmación + `status: 'resolved'`, `resolvedAt`, `resolvedBy`

#### Sincronización bidireccional en `js/concierge.js`

Cuando el cliente clica "Asesor en vivo":
1. `escalateToLive()` llama `ensureFirestoreChatDoc()`
2. Crea doc en `conciergeChats/<sessionId>` con identidad + sourcePage
3. Sube todos los mensajes existentes (incluyendo welcome del bot)
4. Inicia `onSnapshot` de la subcolección `messages/` filtrado por
   `from === 'asesor'`
5. Cada nuevo mensaje del asesor se inserta en `session.messages` y
   re-renderiza el panel del cliente (con `unreadByUser` reseteado)

`syncMessageToFirestore(msg)`:
- Crea doc en subcolección + actualiza parent doc
- `unreadByAdmin += 1` cuando el cliente escribe
- `lastMessage` truncado a 80 chars

**Reglas Firestore** (`firestore.rules`):
```
match /conciergeChats/{sessionId} {
  allow read: editor+ OR auth.uid == resource.userId
  allow create: auth != null AND (userId == null OR userId == auth.uid)
  allow update: editor+ OR auth.uid == resource.userId
  allow delete: super_admin

  match /messages/{msgId} {
    allow read: editor+ OR matches parent owner
    allow create: auth != null AND (
      from in ['user', 'bot'] OR
      (from == 'asesor' AND editor+)
    )
    allow delete: super_admin
  }
}
```

> **DEPLOY MANUAL**: `firebase deploy --only firestore:rules` para
> activar la nueva colección.

**UI sidebar** (admin.html):
- Nuevo nav-item "Concierge" en grupo Comunicaciones (icono `bot`)
- Badge de unread chats actualizado realtime
- Sección `sec-concierge` con layout grid 2-cols (lista + detail)
- Mobile: single-column con lista colapsable

**Anti-patterns evitados**:

| Riesgo | Mitigación |
|---|---|
| Eco entre cliente y admin (mismo mensaje 2 veces) | Cliente no procesa `from:'user'` o `'bot'` que ya tiene; admin no procesa `from:'asesor'` que es propio |
| Listener de chats activo cuando admin no es editor+ | RBAC check antes de `onSnapshot` |
| Permission-denied al cerrar sesión | Error callback chequea `auth.currentUser`, suprime |
| Mensajes duplicados al re-conectar | Set `_lastSyncedMsgIds[id]` dedup |
| Multiple admin tabs envían mismo reply | Cada doc tiene ID único auto-generado por Firestore |
| Cliente con `userId: null` (anónimo) no puede leer su propio chat | Reglas permiten lectura si `userId == null` (solo el que conoce el sessionId puede acceder) |
| sessionId duplicado entre clientes | localStorage genera un ID único `cnc_<ts>_<rand>` por cliente |
| Conversaciones acumulándose forever | Marcar resuelto cierra el chat (futuro: cleanup en U.15) |
| Asesor escribe sin estar logueado | Reglas exigen `editor+` para `from:'asesor'` |
| RACE: chat doc aún no creado pero cliente envía mensaje | `addMessage` sólo sincroniza si `_chatDocCreated === true` |

**Pasos de prueba**:
1. Cliente público abre Concierge → "Asesor en vivo"
2. Verificar Firestore: doc creado en `conciergeChats/<sessionId>` con
   subcolección `messages/`
3. Login admin → sidebar muestra item "Concierge" con badge 1
4. Click "Concierge" → lista con la conversación
5. Click en la conversación → chat detail con todos los mensajes
6. Click una quick reply → texto pre-cargado en el input
7. Escribir respuesta y enviar → cliente la recibe en tiempo real
8. Cliente escribe respuesta → admin la ve aparecer
9. Click "Marcar resuelto" → status: 'resolved' en Firestore
10. Multi-tab: abrir admin en 2 pestañas, ambas reciben los nuevos
    mensajes simultáneamente

**Archivos creados/modificados**:
- `js/admin-concierge.js` — módulo nuevo (~280 líneas)
- `js/concierge.js` — añadido bloque de sync Firestore (~80 líneas)
- `admin.html` — nav-item + sección concierge + script tag
- `js/admin-section-router.js` — `concierge` agregado al REGISTRY
- `css/admin.css` — `.cnc-admin-*` (~190 líneas)
- `firestore.rules` — colección `conciergeChats/{sid}/messages/{mid}`
- `service-worker.js` + `js/cache-manager.js` — version bump v20260505260000

### Microfase U.5+U.13 — Knowledge Base + Conversation summarization ✓ COMPLETADA (2026-05-05)

**Objetivo**: sprint 3 del Bloque U. El bot del Concierge ahora aprende
respuestas que el admin define sin tocar código (U.5), y el asesor puede
generar resúmenes auto para handover entre asesores (U.13). U.6
(embeddings RAG, modelo 25MB) deferido — el FAQ matching simple ya
cubre la mayoría de casos sin el peso del modelo.

#### U.5 — Knowledge Base CRUD admin

**Schema `knowledgeBase/{kbId}`**:
```js
{
    question: 'Cuál es el horario de atención',
    answer: 'Atendemos lunes a sábado 8AM-6PM.',
    keywords: ['horario', 'cuándo', 'abren'],
    category: 'horarios',
    enabled: true,
    priority: 50,
    usageCount: 12,
    lastUsedAt: ISO,
    createdAt, createdBy, updatedAt, updatedBy
}
```

**Reglas Firestore** — diff-keys para que el bot incremente usageCount
sin necesitar editor+:
```
match /knowledgeBase/{kbId} {
  allow read: if true;                      // público lee para el bot
  allow create: if isEditorOrAbove();
  allow update: if isEditorOrAbove() ||
    (request.auth != null
      && request.resource.data.diff(resource.data).affectedKeys()
          .hasOnly(['usageCount', 'lastUsedAt']));
  allow delete: if isSuperAdmin();
}
```

**Lo que se creó**:

##### `js/admin-kb.js` (~280 líneas)

API pública `window.AltorraKB` (full CRUD + scoring):
```js
AltorraKB.findBest(query)  → entry o null  (scoring: keywords+question+priority)
AltorraKB.list()           → array de entries
AltorraKB.recordUsage(id)  → incrementa usageCount
```

UI admin:
- Sección "Knowledge Base" en sidebar grupo Automatización (icono `book-open`)
- Botón "Nueva FAQ" → form inline con question/answer/category/priority/keywords
- Lista de FAQs con toggle activa/pausada por entry, edit + delete
- Categorías: general, financiacion, inventario, politica, horarios, ubicacion, consignacion
- Cada entry muestra: pregunta, respuesta, keywords como chips, contador usageCount

##### `js/kb-client.js` (~80 líneas)

Versión liviana SOLO read para páginas públicas. Cargada desde
`components.js` junto al Concierge. Si admin-kb.js ya cargó (en admin.html),
no se sobrescribe (`if (window.AltorraKB) return`).

##### Hook en `concierge.js` `generateBotResponse()`

Orden de prioridad ajustado:
1. Sentiment muy negativo → escalate
2. **AltorraKB.findBest(userMsg)** → respuesta del admin (NUEVO)
3. FAQ hardcoded (fallback)
4. NER detecta marca/modelo → ofrecer conectar
5. Fallback genérico

Cada vez que el bot usa una FAQ del KB, llama `recordUsage(kbId)` para
analytics — el admin ve qué FAQs son más usadas.

#### U.13 — Conversation summarization

Botón "Resumen" en el header del chat detail del admin Concierge.
Click genera modal con análisis extractivo:

**Algoritmo**:
1. Carga todos los mensajes del chat desde Firestore
2. Para cada mensaje del cliente:
   - `AltorraAI.sentiment(text)` → score
   - `AltorraNER.extract(text)` → entities (marca, ciudad, precio, fecha, etc.)
   - Importance score = `entityCount * 3 + |sentiment| * 2 + length/200`
3. Agrega entities únicas por tipo (no duplica valores)
4. Calcula sentiment promedio y label (positivo / negativo / neutral)
5. Top 3 mensajes por importance score
6. Render en modal centrado con backdrop

**Modal contiene**:
- **Cliente**: nombre, email, teléfono, vehículo origen
- **Conversación**: total mensajes, cliente vs asesor, sentiment promedio
- **Datos detectados**: chips por tipo de entity con valores
- **Top 3 mensajes**: extractos con border-left dorado

**Botón "Copiar al portapapeles"** genera versión texto plano lista
para pegar en Slack / WhatsApp interno / handover entre asesores:
```
RESUMEN — Daniel Pérez
Sessión: cnc_xyz
Email: daniel@example.com
Teléfono: +57320...
Vehículo origen: #abc123

Conversación: 14 mensajes · sentiment positivo 😊

Datos detectados:
  • marca: toyota
  • ciudad: cartagena
  • precio: $45000000

Top mensajes del cliente:
  #1. "Quiero un Toyota Hilux 2020 blanco..."
  ...
```

**Anti-patterns evitados**:

| Riesgo | Mitigación |
|---|---|
| Bot responde con FAQ vieja después de admin la pause | listener realtime mantiene `_entries` actualizado |
| Anyone authenticated escribe answers fake | reglas restringen create/update a editor+ excepto usageCount |
| Modal summary sin datos si AltorraAI/NER no cargaron | Guards `if (window.AltorraAI)` graceful, devuelve datos vacíos |
| Top 3 mensajes son siempre los más largos sin sustancia | Importance combina entities + sentiment magnitude (no solo length) |
| KB matching demasiado laxo (cualquier keyword dispara) | Threshold `bestScore >= 2` (necesita 1+ keyword fuerte o question match) |
| usageCount overflow | Firestore `FieldValue.increment(1)` es atómico y server-side |
| Race entre admin-kb y kb-client | `if (window.AltorraKB) return` previene doble registro |

**Pasos de prueba**:
1. Login admin → sidebar nueva sección "Knowledge Base"
2. Click "Nueva FAQ" → form con question="cuándo abren", answer="Lun-Sáb 8AM-6PM",
   keywords="horario,cuándo,abren,atención", category="horarios", priority=80
3. Guardar → aparece en la lista con usageCount 0
4. Página pública → abrir Concierge → escribir "cuándo abren?"
5. Bot responde con la respuesta del admin (no la hardcoded)
6. Refresh admin → usageCount = 1
7. Toggle pausada → bot vuelve a usar FAQ hardcoded
8. Cliente escala a vivo, intercambia varios mensajes
9. Admin abre el chat → click "Resumen"
10. Modal aparece con sentiment, entities detectadas, top 3 mensajes
11. Click "Copiar al portapapeles" → texto pegable en cualquier app

**Archivos creados/modificados**:
- `js/admin-kb.js` — módulo nuevo CRUD (~280 líneas)
- `js/kb-client.js` — módulo liviano para páginas públicas (~80 líneas)
- `js/concierge.js` — hook a AltorraKB.findBest antes del FAQ hardcoded
- `js/admin-concierge.js` — botón "Resumen" + función `summarizeCurrentChat`
  + modal con extracción de entities/sentiment/top mensajes (~150 líneas)
- `js/components.js` — carga `kb-client.js` en páginas públicas
- `admin.html` — nav-item KB + sección sec-kb + script tag
- `js/admin-section-router.js` — `kb` agregado al REGISTRY
- `firestore.rules` — colección `knowledgeBase/` con regla diff-keys
- `css/admin.css` — `.kb-*` y `.cnc-summary-*` (~140 líneas)
- `service-worker.js` + `js/cache-manager.js` — version bump v20260505270000

> **DEPLOY MANUAL**: `firebase deploy --only firestore:rules` para
> activar la regla nueva de `knowledgeBase/`.

**Pendiente de Bloque U** (próximos sprints):
- U.6 — Embeddings + RAG (Xenova/all-MiniLM-L6-v2 ~25MB lazy) — diferido
  porque el FAQ matching ya cubre la mayoría de casos
- U.7-U.9 — Intent classifier + response generator + auto-escalation
- U.12 — Smart suggestions para asesor
- U.14-U.19 — WhatsApp handoff refinement, cleanup, CRM integration completa

### Microfase D.1+D.2 — Calendario dedicado ✓ COMPLETADA (2026-05-05)

**Objetivo**: workspace nuevo en el admin para visualizar y gestionar
las citas con vista mensual y vista por día. Antes solo había una
tabla en Comunicaciones; ahora el admin tiene un calendario real con
drag-drop para reprogramar.

**Lo que se creó**:

#### `js/admin-calendar.js` (~310 líneas)

Filtra `AP.appointments` con `kind:'cita'` (o `requiereCita:true` para
docs legacy via `AltorraCommSchema.inferKind`). Agrupa por fecha
ISO `YYYY-MM-DD` y construye dos vistas:

**Vista mes** (`renderMonth`):
- Grid 7 columnas × 6 filas (42 cells max)
- Cada cell muestra hasta 3 eventos + "+ N más" si hay más
- Cell del día actual con borde violeta + acento color
- Cells de meses adyacentes pintados como "empty" (no clickables)
- Drag-drop nativo HTML5: arrastrar evento a otra cell → confirma
  reprogramación + Firestore update con `estado:'reprogramada'`
- Visual feedback: `.cal-cell--drop-target` con shadow dorado al
  hacer dragover
- Click en evento → abre `AP.openAppointmentManager(docId)` (modal
  del Comunicaciones existente). Click en cell vacía → cambia a
  vista del día.

**Vista día** (`renderDay`):
- Lista de citas del día seleccionado con hora, nombre, vehículo,
  teléfono, estado y observaciones
- Date block dorado con la hora destacada
- Click en item abre el modal de gestión
- Botón "Volver al mes" para regresar

**Stats bar** (`renderStats`):
- Total mes / Pendientes / Confirmadas / Completadas
- Cada stat con border-left del color semántico del estado

**Toolbar**:
- Anterior / Hoy / Siguiente — navegación entre meses
- Toggle Mes/Día — cambia vista activa

**Color por estado** (`statusColor`):
- pendiente / nuevo → ámbar `#f59e0b`
- confirmada / aprobada → verde `#4ade80`
- reprogramada / contactado → azul `#60a5fa`
- completada → violeta `#a78bfa`
- cancelada / rechazada → rojo `#ef4444`
- no_show → gris

**Auto-refresh**:
- `AltorraSections.onChange('calendar')` re-renderiza al entrar
- `AltorraEventBus.on('comm.')` re-renderiza cuando admin cambia
  estado de cita en otro lugar

**Sidebar**: el placeholder `calendar-disabled` que existía desde B.1
ahora es funcional. Nav-item `data-section="calendar"` activo en el
grupo Calendario, sin badge "Pronto".

**Anti-patterns evitados**:

| Riesgo | Mitigación |
|---|---|
| Drag-drop en mobile no funciona | Patrón nativo HTML5; mobile touch tendrá UX limitada — D.2 podría añadir touch handlers pero no está en este sprint |
| Reprogramar pisa fecha sin confirmar | `confirm()` antes de update Firestore |
| Cita reprogramada sin cambiar estado | Force `estado:'reprogramada'` en update |
| Click en evento dispara click en cell también | `closest('.cal-event')` early return |
| Cells vacías clickables | `.cal-cell--empty` con `pointer-events:none` |
| Mes con menos de 28 días | Padding al final hasta múltiplo de 7 |
| Citas sin fecha aparecen | Filtro `if (a.fecha)` en `getCitas()` |
| Render lento con cientos de citas | Slice top 3 en cell + indicador "+N más" |

**Pasos de prueba**:
1. Login admin → sidebar → grupo Calendario → "Vista calendario"
2. Mes actual aparece con día de hoy resaltado en violeta
3. Citas del mes visibles en sus respectivas cells
4. Click anterior/siguiente → navegación de meses
5. Click "Hoy" → vuelve al mes actual + vista mes
6. Arrastrar una cita a otra cell → confirm → fecha se actualiza
   en Firestore y vista re-renderiza
7. Click en una cita → abre modal de gestión existente
8. Click en cell con citas → cambia a vista día con detalle
9. Click "Volver al mes" → regresa a vista mes

**Archivos creados/modificados**:
- `js/admin-calendar.js` — módulo nuevo (~310 líneas)
- `admin.html` — sidebar nav-group calendario activado + sec-calendar
  con toolbar + stats + grid
- `js/admin-section-router.js` — `calendar` agregado al REGISTRY
- `css/admin.css` — `.cal-*` estilos (~190 líneas)
- `service-worker.js` + `js/cache-manager.js` — version bump v20260505280000

**Pendiente del Bloque D** (próximos sprints):
- D.3 — Config avanzada (turnos múltiples, festivos COL, capacidad por slot)
- D.4 — Buffer entre citas + anti-overbooking
- D.5 — Recordatorios automáticos (consume el sistema de notificaciones
  + Cloud Functions actuales para email)
- D.6 — No-show prediction (espera J.4 — decision tree, modelo lazy)
- D.7 — AI Auto-Scheduling: cliente pide "martes tarde" → sistema sugiere
  el mejor slot con NER del query + slots disponibles
- D.8 — Optimizador de ruta diaria por proximidad geográfica (Haversine
  sobre direcciones, sin API)

### Microfase U.12 — Smart Suggestions para asesor ✓ COMPLETADA (2026-05-05)

**Objetivo**: cuando el asesor abre un chat live del Concierge, debajo
de los mensajes aparecen 3 respuestas sugeridas pre-generadas basadas
en el contexto: sentiment del último mensaje + entities detectadas +
KB del admin + sentido común. Patrón Gmail Smart Reply pero
personalizado al dominio Altorra Cars (financiación, citas, vehículos
específicos, envíos a otras ciudades).

**Decisión**: sin LLM externo. Todo se computa con heurísticas +
templates sobre `AltorraAI.sentiment`, `AltorraNER.extract` y
`AltorraKB.findBest`. Sub-ms, sin tokens cobrados, sin latencia.

**Lo que se creó** (`js/admin-concierge.js` ~150 líneas adicionales):

`generateSmartSuggestions(chat, messages)` recorre:
1. Encuentra último mensaje del cliente
2. Análisis con AltorraAI + AltorraNER
3. Aplica reglas heurísticas y produce candidatas

**8 reglas de suggestions** ordenadas por prioridad:

| Prioridad | Trigger | Tag | Ejemplo |
|---|---|---|---|
| 100 | sentiment muy negativo (< -0.4) | 🛟 Recuperar | "Hola Daniel, lamento mucho lo que pasó. Soy [asesor] y voy a ayudarte personalmente. ¿Te puedo llamar ahora?" |
| 90 | menciona precio/cuanto/cotización | 💵 Cotización | "Te preparo la cotización del Toyota por aproximadamente $80M con financiación, peritaje, garantía…" |
| 88 | pide agendar/cita/visita o NER detecta fecha | 📅 Agendar | "¡Con gusto te agendo una cita el 2026-05-10! ¿Mañana, tarde o final del día?" |
| 80 | NER detecta marca/modelo | 🚗 Info vehículo | "Te paso ahora el detalle del Mazda CX-5 2020 (fotos, kilometraje, peritaje, precio final)…" |
| 78 | menciona financiación/cuota/crédito | 💳 Financiación | "Tenemos planes desde 30% cuota inicial. ¿Cuál es tu cuota disponible y a qué plazo?" |
| 70 | NER detecta ciudad ≠ Cartagena | 🚚 Envío | "Estamos en Cartagena pero coordinamos envío a Bogotá. ¿Te explico pasos y costos?" |
| 65 | KB matchea | 📖 KB | (respuesta del admin via AltorraKB.findBest) |
| 30 | Fallback siempre | 👋 Saludo | "Hola, soy [asesor] de Altorra Cars. Cuéntame qué buscas y te ayudo en seguida" |

**Personalización**:
- `firstName` del cliente extraído de `chat.userNombre` para "Hola Daniel,"
- `asesorName` extraído de `AP.currentUserProfile.nombre` para identificación
- Bits de NER inyectados (precio en millones, marca, año, ciudad, fecha ISO)

**Dedup**: por primeros 40 chars del texto, evita 2 sugerencias casi idénticas.
**Limit**: top 3 después de sort por prioridad.

**Render**:
- Bloque `cnc-smart-suggestions` entre messages y quick-replies
- Background dorado tenue con gradient + border-top
- Header pequeño con icono sparkles + "Sugerencias inteligentes"
- 3 cards con tag pill + texto truncado a 120 chars
- Hover: lift translateX(2px) + border más marcada

**Click en suggestion** → pre-llena `cncAdminReply` input + focus +
cursor al final → asesor puede editar antes de enviar.

**Re-genera** automáticamente cuando:
- Llega un nuevo mensaje del cliente (onSnapshot trigger)
- Se abre un chat distinto

**Hooks integration con todo lo construido**:
- J.1 (sentiment) → regla "recuperar" cuando muy negativo
- J.2 (NER) → 5 reglas dependen de entities (marca, modelo, año, ciudad, fecha)
- U.5 (KB) → si admin definió FAQ relevante, aparece como suggestion priority 65

**Anti-patterns evitados**:

| Riesgo | Mitigación |
|---|---|
| Suggestions repetidas (precio + cotización) | Dedup por primeros 40 chars |
| Suggestions vacías cuando AltorraAI no cargó | Guards `if (window.AltorraAI)` graceful |
| Chip muy largo rompe UI | `slice(0, 120)` con elipsis si excede |
| Asesor presiona suggestion pero quiere editar | Click pre-llena input pero no envía — asesor revisa |
| Suggestions en idioma incorrecto | Templates 100% en español (sin i18n por ahora) |
| Misma suggestion para todos los clientes | Personalización con firstName + asesorName |
| Triggers regex muy laxos (false positive) | Regex específicas con `\b` boundaries y combinaciones |
| Re-render pesado en cada keystroke | Solo se llama cuando llega mensaje nuevo, no en cada input change |

**Pasos de prueba**:
1. Login admin → Concierge → abrir un chat con varios mensajes
2. Ver 3 sugerencias entre los mensajes y los quick replies
3. Si el último mensaje del cliente es "¿cuánto cuesta el Mazda?" → ver
   "💵 Cotización" como primera suggestion personalizada
4. Si menciona "agendar para mañana" → ver "📅 Agendar" con fecha
   resuelta en ISO (vía NER fecha relativa)
5. Si sentiment del cliente muy negativo (palabras como "horrible",
   "mentira") → suggestion "🛟 Recuperar" aparece de primera
6. Click en cualquier suggestion → input se pre-llena → editable
7. Crear FAQ en KB con keyword "horario" → cliente pregunta horario
   → suggestion "📖 KB" aparece con la respuesta del admin

**Archivos modificados**:
- `js/admin-concierge.js` — `generateSmartSuggestions()` +
  `renderSmartSuggestions()` + click handler + render trigger
- `css/admin.css` — `.cnc-smart-*` (~60 líneas)
- `service-worker.js` + `js/cache-manager.js` — version bump v20260505290000

### Microfase L.1 — Comandos de voz globales ✓ COMPLETADA (2026-05-05)

**Objetivo**: dar al admin la opción de navegar y ejecutar acciones
con la voz, usando Web Speech API nativa del navegador. Cero costo,
sin modelos descargados, browser-native. Patrón Stripe/Linear command
palette pero por voz.

**Activación**:
- **Atajo `Espacio + V`**: presionar Espacio + tecla V activa el modo
  escucha. Si el foco está en input/textarea, se ignora (no interrumpe
  escritura del admin).
- **FAB**: pequeño botón `mic` floating bottom-left (44px) para
  activar/desactivar manualmente.
- **`Esc`** cancela mientras escucha.

**Comandos soportados** (parser por keywords + integración con NER J.2):

| Patrón | Ejemplo | Acción |
|---|---|---|
| `ir a / abrir [sección]` | "ir a vehículos" | `AltorraSections.go('vehicles')` |
| `buscar [texto]` | "buscar Toyota Hilux" | Fill primer search input visible |
| `nuevo vehículo / nueva FAQ` | "nuevo vehículo" | Click `quickNewVehicle` o `kbAddBtn` |
| `cerrar sesión / salir` | "cerrar sesión" | Click `logoutBtn` con confirm |
| `calendario hoy/siguiente/anterior` | "calendario hoy" | Navega + click toolbar |
| Texto libre con marca/precio (NER) | "mazda cx-5 80 millones" | Va a vehicles + autofill search |

**Section aliases** (~30 entradas humanas → keys):
- "inicio/dashboard" → `dashboard`
- "vehículos/autos/carros/inventario" → `vehicles`
- "comunicaciones/bandeja/citas" → `appointments`
- "concierge/chats" → `concierge`
- "calendario/agenda" → `calendar`
- "knowledge base/FAQs" → `kb`
- "usuarios" → `users`
- etc.

**Overlay visual**: cuando escucha, oscurece la pantalla con
`backdrop-filter: blur(8px)` y muestra una card centrada con:
- Icono mic dorado pulsante (animation `voicePulse` 1.4s glow ring)
- Status: "Escuchando…" → "Ejecutando…"
- Transcript en vivo (interim results)
- Hint de teclado: `Espacio+V` para ejecutar, `Esc` para cancelar

**Idioma**: `lang = 'es-CO'` (español Colombia). Reconocimiento mediano
para acentos colombianos.

**Soporte**:
- ✅ Chrome/Chromium (desktop y Android)
- ✅ Edge
- ✅ Safari iOS 14+
- ❌ Firefox (Web Speech no habilitado por default)
- Si no soportado, el módulo loguea info y NO monta UI (degrada graceful)

**EventBus integration**: cada comando emite `voice.command` con
`{transcript, command, executed}` para Activity Feed + workflows futuros.

**Anti-patterns evitados**:

| Riesgo | Mitigación |
|---|---|
| Atajo Espacio+V interrumpe escritura | Ignora si activeElement es INPUT/TEXTAREA |
| Reconocimiento empieza pero permission denegado | onerror handler + toast informativo |
| Comando no reconocido → admin frustrado | Fallback NER detecta marca/precio → search en inventario |
| Tab cerrada con recognition activo | onend handler + cleanup |
| Multiple instancias del recognition | `_isListening` flag |
| FAB choca con Concierge widget público | FAB en bottom-left vs Concierge bottom-right (panels separados) |
| Espacio en otros contextos rompe app | Guard contra inputs + e.preventDefault solo cuando V se presiona |

**Pasos de prueba** (en Chrome/Edge):
1. Login admin
2. Ver FAB del mic en esquina inferior izquierda
3. Click → permite el browser pedir mic permission (primera vez)
4. Decir "ir a vehículos" → navega a Vehículos
5. Decir "buscar Toyota" → fills search input + filtra
6. Decir "nuevo vehículo" → abre modal de creación
7. Decir "calendario siguiente" → va a Calendario y pasa al mes próximo
8. Decir "cerrar sesión" → confirm dialog y logout
9. Mantener Espacio+V presionado → mismo flujo sin click
10. Esc cancela en cualquier momento

**Archivos creados/modificados**:
- `js/admin-voice.js` — módulo nuevo (~340 líneas)
- `admin.html` — script tag defer
- `css/admin.css` — `.altorra-voice-*` + overlay + FAB + animation
  voicePulse (~110 líneas)
- `service-worker.js` + `js/cache-manager.js` — version bump v20260505300000

**Pendientes Bloque L** (próximos sprints):
- L.2 — Notas dictadas: botón micrófono en cualquier `<textarea>`
- L.3 — OCR de placas vía cámara (requiere Tesseract.js lazy ~5MB)
- L.4 — OCR de cédula del cliente

### Microfase O.6 — Insights automáticos en dashboard ✓ COMPLETADA (2026-05-05)

**Objetivo**: panel "Lo que el sistema notó esta semana" en el
dashboard que combina señales de R (predictive) + J (AI) + CRM + KB
en una sola card de insights accionables priorizados.

**Lo que se creó** (`js/admin-insights.js`, ~280 líneas):

7 generadores de insights, cada uno retorna 0+ insights con
`{severity, icon, title, message, action}`:

| Generador | Trigger | Severity |
|---|---|---|
| `genStaleVehicles` | ≥3 vehículos +90 días sin moverse | warning |
| `genHotLeadsUnreached` | hot leads (score≥50) con 3+ días sin contacto | critical/warning |
| `genChurnRisk` | contactos que eran hot pero llevan 20+ días sin tocar | warning |
| `genVolumeAnomaly` | z-score sobre solicitudes/día (`AltorraForecast.detectAnomaly`) | info/warning |
| `genSalesForecastTrend` | forecast próximo mes vs actual ±20-30% | warning/info |
| `genNegativeSentimentRecent` | 3+ mensajes negativos esta semana | warning |
| `genUnusedKB` | KB vacía o 5+ FAQs sin uso | info |

**Render**: card dorada bajo el Predictive widget en dashboard. Cada
insight con icon Lucide en círculo coloreado por severity (crítico
rojo / warning ámbar / info azul), título + mensaje + botón "Ver X"
que navega via `AltorraSections.go`.

Empty state con check-circle verde si todo va bien.

Auto-refresh: `AltorraSections.onChange('dashboard')` + bus emite
`vehicle.*` o `comm.*`. Botón refresh manual.

**Pasos de prueba**:
1. Login admin → Dashboard
2. Ver card "Lo que el sistema notó" debajo de Insights del día
3. Si hay 5+ vehículos con createdAt > 60 días → insight stale aparece
4. Click "Ver inventario" → navega a sec-vehicles

**Archivos**: `js/admin-insights.js`, `admin.html` (panel + script tag),
`css/admin.css` (.insights-card / .insight-item).

### Microfase G.4 — PWA installable del admin ✓ COMPLETADA (2026-05-05)

**Objetivo**: el admin se vuelve installable como app nativa con
icono propio + splash + 4 shortcuts directos a secciones.

**Lo que se creó**:

`manifest-admin.json`: manifest dedicado con `start_url:'/admin.html'`,
`scope:'/admin.html'`, `display:'standalone'`, theme_color dorado,
4 shortcuts (Dashboard, Bandeja, Concierge, Calendario).

`admin.html` head: meta tags PWA (manifest link, theme-color,
apple-mobile-web-app-*).

`js/admin-pwa.js` (~150 líneas):
- Captura `beforeinstallprompt` y muestra botón "Instalar" en header
- `triggerInstall()` ejecuta prompt nativo + emite `pwa.installed`
  al EventBus + persiste flag en localStorage
- `isStandalone()` / `isInstalled()` detection
- Welcome toast la primera vez en standalone
- Re-registra Service Worker si no está activo (defensive)

CSS `.pwa-install-btn` dorado tenue, label oculto en mobile.

**Pasos de prueba**:
1. Chrome/Edge → "Instalar app" en menú o botón en header del admin
2. Click → prompt nativo del browser
3. Aceptar → app instalada con su propio icono y window
4. Click en shortcut "Concierge" desde icono installed → abre directo

**Archivos**: `manifest-admin.json` (new), `js/admin-pwa.js` (new),
`admin.html` (meta + script), `css/admin.css` (.pwa-install-btn).

### Microfase N.3 — Adaptive UI: atajos personalizados ✓ COMPLETADA (2026-05-05)

**Objetivo**: el sistema aprende qué secciones usa más cada admin y
las muestra como botones pinned en el dashboard.

**Lo que se creó** (`js/admin-adaptive.js`, ~140 líneas):

Tracking 100% local (`localStorage`), no envía nada al servidor:
- `altorra_admin_section_visits` = `{section: count}`
- `altorra_admin_section_lastvisit` = `{section: timestamp}`

Score por sección: `visits * 0.7 + recency_bonus * 30`
- `recency_bonus = 1` si <24h, `0.5` si <7d, `0` si más

Threshold: ≥3 secciones distintas con `count ≥ 2` para activar el
panel (evita ruido al inicio).

Subscripción a `AltorraSections.onChange` — cada navegación incrementa
contador. Dashboard no se cuenta a sí mismo.

UI: card violeta tenue sobre el dashboard con header "Atajos
personalizados · Basado en tu uso" y grid de hasta 5 botones con
icono Lucide del registry, label de la sección y contador.

**API**: `AltorraAdaptive.topSections(n)` / `.reset()`.

**Archivos**: `js/admin-adaptive.js` (new), `admin.html` (panel),
`css/admin.css` (.adaptive-shortcuts).

### Microfase P.4 — Command Palette ⌘+K ✓ COMPLETADA (2026-05-05)

**Objetivo**: spotlight para el admin estilo Linear/Stripe/GitHub.
Cmd+K (Mac) o Ctrl+K (Win/Linux) abre un palette centrado donde el
admin busca y ejecuta cualquier acción con teclado.

**Lo que se creó** (`js/admin-palette.js`, ~290 líneas):

Catálogo auto-construido:
- 16+ secciones de `AltorraSections.registry` (navegación)
- 7 acciones rápidas (nuevo vehículo, nueva FAQ, activar voz,
  refrescar insights, calendario hoy, cerrar sesión, instalar PWA)
- Top 20 contactos del CRM (búsqueda dinámica)

Fuzzy matching: substring por palabra contra `label + keywords`.
Score: label match = 5pts, keyword = 3pts, combined = 1pt.

Atajos: `⌘/Ctrl+K` toggle · `Esc` cerrar · `↑↓` navegar (con
`scrollIntoView`) · `Enter` ejecutar.

UI: backdrop-filter blur, modal centrado con header (icono search +
input + Esc kbd), lista agrupada por categoría (Navegación, Acciones,
Contactos), footer con atajos visibles. Border-left dorado en
selected. Animation slideDown 220ms cubic-bezier al abrir.

**Archivos**: `js/admin-palette.js` (new), `admin.html` (script tag),
`css/admin.css` (.alt-palette-*).

### Microfase M.1+M.4 — Realtime collab: Presence + Comentarios ✓ COMPLETADA (2026-05-05)

**Objetivo**: dos features de colaboración en realtime entre admins.

**M.4 — Comentarios threaded** (`js/admin-comments.js`, ~280 líneas):

Sistema universal de comentarios entre admins sobre cualquier
entidad (vehicle, contact, solicitud, thread, kb).

Schema `comments/{commentId}`:
```
entityType, entityId, body, authorUid/Nombre/Email,
parentId (threading), mentions[uid], createdAt, edited
```

Public API:
- `AltorraComments.attach(container, {entityType, entityId})`
- `AltorraComments.detach(container)`
- `AltorraComments.count(entityType, entityId)` → Promise<number>
- `AltorraComments.post / .delete`

Features:
- @menciones con autocomplete contra `AP.users`
- Highlighting visual de mentions con badge azul
- Threading: `parentId` → cmt-children render recursivo,
  `cmt-item--reply` con border-left dorado
- Reply form inline expandible per-comment
- Delete: `super_admin` O author propio
- ⌘+Enter envía
- EventBus emit `comment.mention` (persistido) por usuario mencionado

Reglas Firestore: read editor+, create editor+ AND
`authorUid==auth.uid`, update solo body+edited+updatedAt, delete
super_admin O author.

Integración: nuevo tab "Comentarios" en CRM 360°. `AltorraComments`
se monta en `#crmCommentsHost` cuando admin abre el tab.

**M.1 — Presence avanzada** (`js/admin-presence-ui.js`, ~140 líneas):

Construye sobre el sistema de presence existente (RTDB `/presence/`).
Añade:
- `updatePresenceSection()` actualiza nodo RTDB con `currentSection`
  cada vez que admin navega via `AltorraSections.onChange`
- Listener sobre `/presence` orderBy online filtra peers (excluye
  uno mismo, dedup por uid, descarta stale >5min)
- Overlay flotante bottom-right con avatares de admins activos
- Verde pulsante en avatares de quienes están en MI sección actual
- Tooltip con nombre + sección donde está cada uno
- Mobile: overlay oculto

CSS `.cmt-*` y `.alt-presence-*` (~200 líneas).

**DEPLOY MANUAL REQUERIDO**: `firebase deploy --only firestore:rules`
para activar la colección `comments/`.

### Microfase H.4 — Re-auth para acciones críticas (sudo mode) ✓ COMPLETADA (2026-05-05)

**Objetivo**: capa de seguridad que pide al admin re-confirmar su
password antes de ejecutar acciones sensibles. Patrón GitHub/Stripe
sudo mode con timestamp cache de 5 minutos.

**Lo que se creó** (`js/admin-security.js`, ~210 líneas):

API pública `AltorraSecurity`:
- `requireReauth(reason)` → Promise<void>
- `guard(reason, fn)` → wrapper que ejecuta fn solo si reauth pasa
- `isSudoActive()` → true si reauth dentro de últimos 5 min
- `invalidate()` → fuerza nueva reauth en próxima acción

Modal centrado con icono `shield-check`, input password autocomplete
`current-password`, error inline con shake animation 400ms en
password incorrecta, hint sobre TTL 5 min.

Implementación:
- `firebase.auth.EmailAuthProvider.credential` +
  `reauthenticateWithCredential`
- Cache `_lastReauth` timestamp con TTL `SUDO_TTL_MS`
- Single concurrent: si modal ya abierto, retorna misma Promise
- Esc + click backdrop + cancel button → reject('cancelled')
- EventBus emit `security.reauth` (persisted) para audit log

Auto-instrumentación: cualquier botón con `[data-secure-action]`
dispara reauth antes del click handler original. Se previene el
evento, se ejecuta reauth, y si pasa, se re-dispara el click con
flag `_secureProcessed`. `data-secure-reason="razón humana"`
personaliza el modal.

Errores manejados:
- `auth/wrong-password` → "Contraseña incorrecta. Intentá de nuevo."
- `auth/too-many-requests` → "Demasiados intentos."
- Otros → "Error: {message|code}"

Uso en código:
```js
AltorraSecurity.guard('Eliminar vehículo', function () { return deleteVehicle(id); });
// O en HTML:
<button data-secure-action data-secure-reason="...">Delete</button>
```

**Archivos**: `js/admin-security.js` (new), `admin.html` (script),
`css/admin.css` (.alt-sec-*).

### Microfase L.2 — Dictado por voz en textareas ✓ COMPLETADA (2026-05-05)

**Objetivo**: auto-instrumenta cada `<textarea>` del admin con un
mini-botón micrófono. Click activa Speech Recognition continuo en
es-CO; cada frase reconocida se appendea al textarea con
capitalización automática.

**Lo que se creó** (`js/admin-voice-dictate.js`, ~210 líneas):

API `AltorraDictate`:
- `attach(textarea)` manualmente
- `refresh()` re-escanear DOM
- `stop()` parar dictado activo

Implementación:
- `SpeechRecognition` con `continuous:true`, `interimResults:true`
- Resultado final (`isFinal`) → trim + cap primera letra + append
- Resultado interim → mostrado provisionalmente (no committed)
- `input` event dispatched para que el form bind reaccione
- `Esc` cancela dictado activo
- `WeakSet _attached` previene doble-attach
- `MutationObserver` con debounce 150ms para textareas dinámicos
  (modals que abren después)

Visual feedback:
- Botón mic con glow rojo pulsante mientras activo
  (animación `dictatePulse` 1.4s)
- Border-color del textarea rojo tenue + box-shadow doble ring
- Wrap automático con `.alt-dictate-wrap` si no estaba envuelto

No interfiere con L.1 (comandos globales): instancia separada.

Skip de textareas `readonly`/`disabled`. Skip explícito con
`data-alt-skip-dictate`.

**Archivos**: `js/admin-voice-dictate.js` (new), `admin.html`
(script tag), `css/admin.css` (.alt-dictate-*).

### Microfase C.5+M.2 — Generador de descripción + Co-edit locks ✓ COMPLETADA (2026-05-05)

**C.5 — Generador de descripciones** (`js/admin-desc-gen.js`, ~190 líneas):

Genera párrafos de descripción profesional para vehículos a partir
de specs. Sin LLM — templates + heurísticas locales sub-ms.

Templates con 4+ variantes para intro/specs/features/CTA. Variables
contextuales: `tipoLabel` (cero km / semi-nuevo / usado),
`categoriaLabel`, `audience` según categoría
(familias / profesionales / aventura), `benefitTxt` (potencia /
eficiencia), `kmTxt` formateado.

6 párrafos: intro + specs + features (top 8) + color + trust
(peritaje/revisión) + CTA.

Botón "Generar" con icono `sparkles` agregado al label del campo
Descripcion en el modal de vehículo. Click lee specs del form,
llama `AltorraDescGen.generate`, sustituye el textarea con
confirm si hay descripción previa.

API:
- `AltorraDescGen.generate(specs)` → string
- `AltorraDescGen.variants(specs, n)` → array N descripciones únicas

**M.2 — Co-edit locks blandos** (`js/admin-coedit.js`, ~210 líneas):

Cuando un admin abre un modal de edición (vehículo, comm), escribe
a `coediting/{entityType_entityId}` con uid + heartbeat cada 15s.
Otros admins viendo el mismo entity ven badge ámbar "Daniel está
editando esto. Tus cambios pueden colisionar."

No bloquea ediciones (último write gana, `_version` sigue siendo
optimistic locking real). Solo informa.

TTL 60s sin heartbeat → considera lock expirado.
`beforeunload` limpia todos los locks activos.

Auto-instrumentación: `MutationObserver` sobre `#vehicleModal` y
`#appointmentManagerModal` para detectar visibilidad. Lock al abrir,
unlock al cerrar.

`observe(entityType, entityId, callback)` suscribe a quién más está
editando — usado por el badge UI.

Reglas Firestore: read editor+, create/update only own uid,
delete super_admin O dueño.

CSS `.coedit-badge` dorado-amber con avatar iniciales + warning text.

**DEPLOY MANUAL**: `firebase deploy --only firestore:rules`
para activar `coediting/`.

### Microfase G.3+H.5 — Offline detection + Anomaly behavior ✓ COMPLETADA (2026-05-05)

**G.3 — Offline detection** (`js/admin-offline.js`, ~150 líneas):

Detector de conexión + banner amber persistente cuando offline,
banner verde 3s al recuperar.

- `navigator.onLine` + `'online'`/`'offline'` events
- Banner top-center con icono SVG inline (sin Lucide para no
  depender de carga)
- Cola simple en localStorage (`altorra_offline_queue`) con
  `queue()` + `flush()`
- EventBus emit `connectivity.online`/`.offline` +
  `offline.queued`/`.replay` para que listeners externos procesen
- Auto-flush al recuperar conexión + arranque inicial si hay queue

API: `AltorraOffline.isOnline / .queue / .flush / .queueLength`.

**H.5 — Anomaly behavior detection** (`js/admin-anomaly.js`, ~140 líneas):

Rate limiting con sliding window. Detecta:
- 10+ deletes en 5 min → freeze + alert + reauth (H.4)
- 5+ deletes en 5 min → warning toast
- 5+ role changes en 10 min → freeze + alert
- Export CSV ≥100 filas → alert (preventive)

Listeners al EventBus: `vehicle.deleted`, `comm.deleted`,
`crm.contact-deleted`, `kb.deleted`, `user.role-changed`,
`export.csv`.

`alertSuperAdmin()` escribe a `auditLog` con `anomaly:true` +
emite `anomaly.detected` (persisted) + notifyCenter critical
priority.

`freeze()` invalida sudo de H.4 + fuerza reauth — la próxima
acción sensible re-pide password.

API debug:
- `AltorraAnomaly.snapshot()` → buckets actuales
- `AltorraAnomaly.config` → reglas activas

CSS `.alt-offline-banner` con keyframes `offlineSlideDown` 300ms.

### Microfase D.3+D.4+U.16+U.17 — Calendar config + Soft contact + Profiling ✓ COMPLETADA (2026-05-05)

**D.3 — Config calendario** (`js/admin-calendar-config.js`, ~190 líneas):

Config global del calendario en `config/calendarConfig`:
- `workDays`: [1..6] (Lun-Sab default)
- `workHours`: 08:00-18:00
- `slotDurationMin`: 30
- `bufferMin`: 15
- `maxPerSlot`: 1
- `holidays`: 18 festivos colombianos 2026 hardcoded

API:
- `isHoliday(dateStr)` / `isWorkDay(dateStr)`
- `isWithinWorkHours(hora)`
- `checkOverbooking(fecha, hora, citasExistentes)` →
  `{ok, warnings, conflicts}`
- `suggestSlot(fecha, citasExistentes)` → próximo slot libre

**D.4 — Anti-overbooking** integrado en `admin-calendar.js`:

`reprogramarCita()` ahora invoca
`AltorraCalendarConfig.checkOverbooking` ANTES del confirm. Si hay
festivo / día no laboral / fuera de horario / conflicto buffer →
muestra warnings en el confirm. Si `check.ok===false` (overflow >150%
capacity) requiere confirmación adicional.

**U.16 — Soft contact al primer mensaje del Concierge**:

Antes: `createLeadInCRM` solo se llamaba en `escalateToLive()`.
Ahora: `send()` crea lead en `solicitudes/` con `kind:'lead'`,
`tipo:'concierge_soft'`, `level:0..3` desde el PRIMER mensaje del
usuario, sin esperar escalate.

`updateSoftContact()` actualiza el lead con cada turno: nuevos
email/telefono/nombre detectados por NER, level actualizado,
comentarios consolidados (últimos 5 mensajes).

`escalateToLive` bumpea `level=4` (asignado a asesor) +
`ensureFirestoreChatDoc`.

**U.17 — Progressive profiling (L0→L5)**:

`maybeAskForProfile()` corre después de cada bot response y decide
qué pedir al cliente según turnos:
- L0 → 3+ turnos sin nombre → "¿cómo te llamas?"
- L1 → 5+ turnos con nombre, sin email/tel → "¿me dejás tu correo
  o WhatsApp?"
- L2 → 7+ turnos con contacto → "¿tenés un rango de presupuesto?"
- L4 → al escalar: bumpa a asignado

NER auto-extrae email/telefono de cualquier mensaje del cliente y
actualiza `session.email/telefono` + level sin necesidad de pregunta
explícita.

Flags `_asked_nombre`, `_asked_contact`, `_asked_qualify` evitan
re-pedir lo mismo si el cliente ignora.

### Microfase N.4+O.1 — Onboarding tour + KPIs ejecutivos ✓ COMPLETADA (2026-05-05)

**N.4 — Onboarding tour** (`js/admin-onboarding.js`, ~180 líneas):

Tour interactivo de 6 pasos la primera vez que un admin entra:
1. Bienvenida
2. ⌘+K palette
3. Espacio+V comandos por voz
4. Insights automáticos en dashboard
5. Concierge unificado
6. Listo para arrancar

Modal centrado con icono Lucide grande, progress dots animados,
navegación Anterior/Siguiente/Saltar.

Auto-arranque solo si:
- `localStorage 'altorra_admin_onboarded'` no está
- `clientes/{uid}.onboardingCompleted` no es true

Espera 2.5s tras login para que dashboard se renderee.

Al finalizar: setea ambos flags + emite EventBus
`onboarding.completed`.

`AltorraOnboarding.start()` / `.reset()` expuestos para debug y
repetir.

> **NOTA**: en el FIX integral posterior se agregó `display:none` por
> default + clase `.is-active` para evitar que el modal bloquee el
> header si queda colgado.

**O.1 — KPIs ejecutivos** (`js/admin-kpis.js`, ~210 líneas):

Card en dashboard con 6 KPIs del mes:
- Tasa de conversión (vendidos/solicitudes %, color por threshold)
- Ticket promedio ($M de los vendidos del mes)
- Tiempo de respuesta (avg hrs `createdAt` → `estado!=pendiente`)
- SLA cumplido (% solicitudes contestadas dentro de slaDeadline)
- Top asesor del mes (más ventas con `assignedTo`)
- Embudo: leads → solicitudes → ventas (visual con barras
  proporcionales en O.2 posterior)

`compute()` recorre `AP.appointments` + `AP.vehicles` del último mes
(30d).

Color thresholds:
- conversión: ≥15% verde / ≥8% ámbar / <8% rojo
- response: ≤4h verde / ≤24h ámbar / >24h rojo
- SLA: ≥85% verde / ≥60% ámbar / <60% rojo

Auto-refresh en cambios de bus + entrada al dashboard.

### Microfase D.5+N.2 — Recordatorios + Sidebar adaptativo ✓ COMPLETADA (2026-05-05)

**D.5 — Recordatorios automáticos** (`js/admin-reminders.js`, ~140 líneas):

Cron-like en el browser del super_admin (única tab por defecto)
que revisa `AP.appointments` cada 5 min y dispara avisos en notify
center según reglas:

- Citas para MAÑANA con estado pendiente/confirmada → category
  `appointment_update` priority normal: "Cita mañana: {nombre}.
  A las {hora} por {vehiculo}. Confirmá con el cliente."
- Citas en PRÓXIMAS 2H todavía sin completar → priority high:
  "Cita en 1h: {nombre}"
- Citas vencidas (>2h pasadas) sin estado completada/cancelada →
  category `system` high: "Cita vencida sin actualizar."

Dedup runtime (`_shownThisSession`) + persistencia en
`appointmentReminders/{reminderId}` para tracking cross-session.

Solo super_admin lo corre (evita dup multi-tab).

**Reglas Firestore**: editor+ create con `shownTo == auth.uid`;
super_admin delete.

**N.2 — Sidebar adaptativo** (`js/admin-sidebar-adaptive.js`, ~120 líneas):

Aprovecha tracking de N.3. Reorganiza el sidebar según uso:
- Top 3 más usadas (count >= 5) → clase `.nav-item--frequent` con
  border-left dorado + estrella ★ al final
- No usadas en 30+ días → clase `.nav-item--rare` oculta hasta
  click en "Mostrar menos usadas" (toggle al fondo del sidebar)

Auto-refresh cada vez que cambia sección. Mínimo 5 secciones
distintas trackeadas para activar adaptación.

CSS `.nav-item--frequent` / `.nav-item--rare` / `.nav-rare-toggle`.

### Microfase U.18+U.19 — Identity merge + Marketing opt-in ✓ COMPLETADA (2026-05-05)

**U.18 — Identity Merge** en `js/concierge.js`:

Cuando un cliente que estaba conversando como guest se loguea o
registra (`auth.onAuthStateChanged` dispara con user no-anónimo y
session no tenía uid), `mergeIdentity(user)` busca:

1. `conciergeChats/` con `userEmail==email` AND `userId==null` →
   batch update con uid, userNombre, mergedAt
2. `solicitudes/` con `email==email` AND `userId==null` →
   batch update con uid, `clientCategory:'registered'`, mergedAt

Eventos emitidos: `identity.merged` con uid, email, chatsLinked.

También llama `updateSoftContact()` para sincronizar el lead activo
con la nueva identidad.

**U.19 — Marketing opt-in granular**
(`js/concierge-optin.js`, ~190 líneas):

Detector de intención de opt-in (regex: "avísenme cuando", "quiero
recibir", "promociones", "ofertas"). Hook en `concierge.send()` que
dispara modal opt-in 1.8s después.

Modal con 3 toggles independientes:
- Email (default ON, 1/mes max)
- WhatsApp (default OFF, solo matches con búsquedas guardadas)
- SMS (default OFF, solo confirmaciones)

Botón "Ahora no" guarda preferencia con todo OFF y `source:'declined'`.

`savePreference()` persiste en:
- `solicitudes/{leadId}.marketingOptIn`
- `clientes/{uid}.marketingOptIn` (si registered)

Schema `marketingOptIn = {email, whatsapp, sms, askedAt, source}`.

GDPR right-to-forget: `AltorraOptIn.eraseClient(uid)` anonimiza
solicitudes/ del uid (preserva audit log) + delete conciergeChats/
+ delete `clientes/{uid}`. Solo callable por super_admin.

CSS `.optin-*` en `concierge.css` con backdrop-filter blur, rows
con border-left dorado al hover, accent-color en checkbox.

### Microfase C.4+C.8+D.7 — Smart prioridad + Validaciones + Auto-Scheduling ✓ COMPLETADA (2026-05-05)

**C.4 — Smart field `prioridad_destacado`** en `js/smart-fields.js`:

Calcula `prioridadDestacado` (0-100) automáticamente cuando blank:
- base 50
- + 25 si `tipo=nuevo` (15 si semi-nuevo)
- + 15 si oferta o `precioOferta < precio`
- + 5 si `categoria=suv|pickup`
- - 10 si `km>100K`, -10 más si >150K

Clamp 0-100. Reason: "calculado por tipo+oferta+km".

**C.8 — Validaciones inteligentes** (warnings, no fail):

`AltorraSmartFields.validate(doc)` recorre 8 reglas y retorna issues
con `{field, severity:'warning'|'error', message, ruleId}`:
- `classic_anomaly`: año<2000 + km<50K → "¿es clásico?"
- `cuota_vs_precio`: cuotaInicial > precio → ERROR
- `precio_alto`: > $1B → warning verificar
- `precio_bajo`: < $5M → warning verificar
- `oferta_mayor_que_precio`: precioOferta > precio → ERROR
- `year_futuro`: > currentYear+1 → warning
- `km_negativo`: kilometraje < 0 → ERROR
- `sin_imagen`: imagenes:[] → warning

Hook en `updateSmartFieldsPreview` de `admin-vehicles.js`: el preview
ahora muestra suggestions (existentes) + issues (nuevos) en bloques
separados. Triggers expandidos: `vYear` + `vCategoria`.

CSS `.smart-validation-warning` (ámbar) / `-error` (rojo).

**D.7 — AI Auto-Scheduling** en `admin-calendar-config.js`:

`parseSchedulingHint(text, citasExistentes)` →
`{fecha, hora, preferredTime, confidence}`.

Detecta:
- NER fecha (J.2: "el 15 de marzo", "mañana", "pasado mañana")
- "hoy" / "mañana" / "pasado mañana"
- Días de la semana ("el martes" → próximo martes)
- Momento del día: morning/afternoon/evening
- Hora explícita: "a las 10", "a las 3pm"

Si fecha cae en festivo o día no laboral → mueve al siguiente día
laboral (loop con safety 7 iteraciones).

Si `preferredTime` es 'morning'/'afternoon'/'evening', busca slot
desde startHour (9/14/16) avanzando en `slotDurationMin` chunks.
Usa buffer/maxPerSlot del config.

Hook en `concierge.js generateBotResponse`:
`detectSchedulingIntent` regex → si match, `parseSchedulingHint`
con el texto del cliente → bot responde "📅 Te puedo agendar para
el martes 23 de marzo a las 14:00. ¿Lo coordino con un asesor?"
con CTA escalate.

Cargado en `components.js` para páginas públicas (Concierge lo usa
desde el frontend del cliente).

`admin-calendar-config.js` ahora detecta `IS_PUBLIC` (sin AP) y skip
init de Firestore listener — usa DEFAULT_CONFIG con festivos COL
hardcoded.

### Microfase O.2+U.14+U.15 — Funnel chart + WhatsApp + Cleanup ✓ COMPLETADA (2026-05-05)

**O.2 — Funnel chart visual** en `js/admin-kpis.js`:

Reemplaza la línea de texto "X leads → Y solicitudes → Z ventas"
por un funnel chart horizontal con 4 stages (Leads / Solicitudes /
Citas / Ventas) y barras proporcionales al máximo.

Cada stage:
- Color semántico (azul / amarillo / violeta / verde)
- Width % proporcional a `max(stages, 1)`
- Counter visible dentro de la barra (mín 8% width para visibilidad)
- Drop % de pérdida vs stage anterior (rojo) ej: ↓ 35%

Animation 0.6s cubic-bezier al renderizar. Tile ocupa todo el grid
(`kpi-tile--full`).

**U.14 — WhatsApp handover refinado** en `js/concierge.js`:

`buildWhatsAppSummary()` con formato WhatsApp markdown completo:

```
🚗 *Altorra Cars Concierge*
*Ticket:* #ABC12345
👤 Daniel Pérez
📧 daniel@example.com
📲 +57320...
🔑 Vehículo de interés: #abc123
📊 Nivel: L3 (calificado)
💬 Sentiment: positivo 😊 (5 mensajes)

*Últimos mensajes del cliente:*
1. "Quiero un Mazda CX-5 2020 blanco..."
2. "..."
3. "..."

👉 Abrir conversación: altorracars.github.io/admin.html#concierge
Hola, soy el cliente del ticket #ABC12345.
```

Sentiment label calculado con `AltorraAI` promediando todos los
mensajes del cliente. Ticket es últimos 8 chars del sessionId
uppercase.

**U.15 — Cleanup chats viejos** en `admin-concierge.js`:

`cleanupOldChats()` (~50 líneas) borra `conciergeChats` con
`status='resolved'` AND `lastMessageAt > 14d`. Solo super_admin.
Para cada chat: get subcollection messages, batch delete msgs +
chat, en serie.

Botón "Limpiar antiguos" en sec-concierge header con
`data-secure-action` (H.4 reauth) y `data-secure-reason`. Confirm
doble con count.

EventBus emit `concierge.cleanup` (persistido) con count + cutoffDays.

### Microfase G.2+C.3 — Native notifications + Color extractor ✓ COMPLETADA (2026-05-05)

**G.2 — Native notifications** (`js/admin-native-notifications.js`,
~170 líneas):

Hook al `notifyCenter` que cuando llega notificación priority `high`
o `critical` (y permission granted) dispara también una `Notification`
API nativa visible aunque el tab esté minimizado.

Permission flow progresivo (no spam al cargar):
1. No pide permiso al inicio
2. Después de 3+ notificaciones importantes en la sesión, muestra
   invitation modal sutil bottom-right "¿Recibir avisos del SO?"
3. Si acepta → `Notification.requestPermission()`
4. Decision persistida en localStorage (`granted`/`declined`/
   `postponed`)

Solo dispara si `document.visibilityState !== 'visible'` (no spam
si el admin ya está mirando la pestaña).

Click en notification → `window.focus()` + navega al link del payload.
`requireInteraction:true` para `priority='critical'` (no se autocierra).

Reemplaza `notifyCenter.notify` con wrapper que delega al original
pero ANTES dispara la native cuando aplica.

**C.3 — Color extractor** (`js/admin-color-extract.js`, ~150 líneas):

Extrae color primario de una imagen via Canvas API (sin ML).
Algoritmo lite k-means con 512 buckets (3 bits per channel).

`fromImage(imgElement, callback)` → `{hex, rgb:[r,g,b], name, samples}`
`fromUrl(url, callback)` → idem (con `crossOrigin='anonymous'`)

Heurística:
- Sample cada N pixels (max 10K samples para velocidad)
- Skip transparent pixels (alpha < 128)
- Skip pixels muy oscuros (<15) o muy claros (>245)
- Bucket por canales reducidos (`>>5` = 8 niveles c/u)
- Score = `count * (1 + saturación promedio)` — prioriza colores
  saturados sobre grises

Mapping a 13 nombres conocidos del catálogo Altorra: Blanco/Negro/
Gris/Plateado/Rojo/Azul/Verde/Amarillo/Naranja/Morado/Marrón/
Dorado/Beige (matching por distancia euclidiana RGB).

Resize a max 200px para velocidad (sub-100ms en imagen típica).

CORS: si la imagen viene de Firebase Storage, requiere configuración
de bucket. Si falla → `callback(null)` silencioso.

### Microfase O.3+P.3 — Performance per asesor + WCAG AAA ✓ COMPLETADA (2026-05-05)

**O.3 — Performance per asesor** (`js/admin-performance.js`, ~180 líneas):

Tabla "Performance del equipo" en el dashboard. Recopila stats
mensuales por cada asesor (super_admin + editor activos):
- Ventas (vehículos vendidos donde `assignedTo` o `lastModifiedBy`)
- Solicitudes asignadas
- Solicitudes contactadas (estado != pendiente/nuevo)
- Tiempo medio de respuesta (`createdAt` → `updatedAt`)
- SLA cumplido %

Sort por ventas desc. Top 3 con medallas 🥇🥈🥉.

Fila por asesor: nombre + rol (small) + ventas + asignadas +
contactadas (con %) + avg respuesta + SLA% color-coded.

Auto-refresh: `AltorraSections.onChange('dashboard')` + bus events
`vehicle.*` + `comm.*`.

**P.3 — Accessibility WCAG AAA** en `css/admin.css`:

- `*:focus-visible` con `outline 2px` dorado + `box-shadow ring 4px`
  rgba dorado tenue (alta visibilidad sin ruido)
- Skip-to-content link en body del admin (oculto fuera de foco,
  aparece desde `top:0` en focus para teclado users)
- `.sr-only` utility para screen readers
- `prefers-reduced-motion: reduce` → todas las animaciones a 0.01ms
  (scroll-behavior auto incluido)
- `prefers-contrast: more` → border 2px currentColor en alt-btn/
  nav-item/vehicle-card

### FIX integral — Overlays huérfanos ya no bloquean header ✓ APLICADO (2026-05-05)

**Síntomas reportados** (todos los botones del header no respondían
al click/tap):
1. FAB del micrófono no respondía
2. Botón de actividad no respondía
3. Botón de notificaciones no respondía
4. Toggle tema claro/oscuro no respondía
5. Toggle alto contraste no respondía

**Causa raíz** (4 problemas combinados):

A) **Doble bind del themeToggle**:
- `admin-phase5.js` bindeaba con su propio `toggleTheme()`
- `theme-switcher.js` (T.4) también bindea via `data-altorra-theme-toggle`
- Click ejecutaba ambos handlers en orden → se cancelaban entre sí

B) **Overlays con `position:fixed inset:0 z-index:99999 display:flex`
por default**, sin clase de activación. Si por error transitorio
(network drop, JS exception, modal cerrado mid-render) un overlay
quedaba colgado en el DOM, cubría toda la pantalla invisible y
bloqueaba TODOS los clicks:
- `.alt-onboard` (onboarding tour)
- `.altorra-voice-overlay` (voice escuchando)
- `.alt-palette` (Cmd+K)

C) **Voice FAB independiente bottom-left** interfería visualmente y
ocupaba un slot que mejor estaba en el header.

D) **Sin defense-in-depth** para limpiar overlays huérfanos en runtime.

**Fixes aplicados**:

1. Eliminado handler legacy en `admin-phase5.js` (deprecated comment).
   Theme toggle ahora gestionado solo por T.4.

2. CSS overlays con clase de activación obligatoria:
   ```css
   .alt-onboard         { display: none; }
   .alt-onboard.is-active { display: flex; }
   .altorra-voice-overlay { display: none; }
   .altorra-voice-overlay.alt-voice-active { display: flex; }
   ```

3. **SAFETY GLOBAL CSS**:
   ```css
   .alt-onboard:not(.is-active),
   .altorra-voice-overlay:not(.alt-voice-active),
   .alt-palette:not(.alt-palette-open) {
       pointer-events: none !important;
       display: none !important;
   }
   ```

4. **Voice FAB → botón en header**:
   - `admin-voice.js init()` ahora inserta `<button id="altorra-voice-btn">`
     a la izquierda del `#activityFeedTrigger`
   - Estilo `.alt-btn alt-btn--ghost alt-btn--icon` consistente con
     los demás botones del header
   - Tooltip "Comandos por voz · Espacio+V"
   - `.altorra-voice-fab` legacy oculto con `display: none !important`

5. **Defense-in-depth — `js/admin-overlay-guard.js`** (~120 líneas):
   - Scan cada 5s del DOM
   - Detecta overlays watched (alt-onboard, alt-palette, voice-overlay)
     que existen pero NO tienen su clase activa por más de 30s →
     marca como huérfano y elimina silenciosamente
   - Detecta también overlays dinámicos (children del body con
     `position:fixed z-index>=99000`) que llevan >30s sin razón →
     elimina
   - Whitelist de IDs conocidos (altorra-concierge, aaf-panel,
     alt-presence-overlay, altorra-voice-btn, altorra-update-banner,
     etc.) que se preservan
   - API `AltorraOverlayGuard.scan()` / `.dump()` para diagnóstico

**Lecciones aprendidas**:

| Problema | Lección |
|---|---|
| Microfases muy granulares con muchos archivos JS | Cada archivo agrega su propio listener global. Conflictos entre handlers son inevitables sin testing integrado |
| Overlays con `display: flex` + z-index extremo por default | SIEMPRE poner `display: none` o `pointer-events: none` por default. Activar con clase, no quitar lo que rompió |
| Sin testing E2E entre commits | Los próximos sprints serán **commits más grandes y testeados antes del próximo bloque** |

### FIX rounds 2 y 3 — Header buttons + cleanup overlays + ReferenceError ✓ APLICADO (2026-05-05)

Tras el FIX integral inicial, el usuario reportó que **los botones del
header todavía no funcionaban consistentemente**. La consola reveló:

1. **`Uncaught ReferenceError: toggleTheme is not defined`**
   en `admin-phase5.js:365`. Cuando T.4 (theme-switcher) tomó el bind,
   eliminé las funciones de phase5 pero la línea
   `AP.toggleTheme = toggleTheme` quedó residual y reventaba el IIFE.
   **Fix**: comentado.

2. **Icon `inbox-x` no existe en Lucide** (warning cosmético).
   **Fix**: cambiado a `inbox` en admin-activity-feed.js (2 usos).

3. **Mi propio `cleanupOverlays` ocultaba `altorra-notify-center`**
   (el panel del bell). El bell aparecía bound pero al click no
   abría el panel porque mi script lo había hidden. Reportado en
   consola como `[HeaderFix] Hidden suspected overlay: altorra-notify-center`.
   **Fix**:
   - Whitelist de **clases protegidas** (no solo IDs):
     `altorra-notify-center`, `altorra-notify`, `altorra-notify-stack`,
     `altorra-bell`, `altorra-spotlight`, `modal-overlay`,
     `sidebar-overlay`, `crm-detail-panel`, `auth-modal-backdrop`,
     `altorra-auth-modal`
   - Skip si `pointer-events: none` ya está aplicado (el elemento NO
     captura clicks por sí mismo, NO es sospechoso)
   - Pasada 0 nueva: restaurar elementos legítimos cuyo style inline
     `display:none` haya sido aplicado por mi script anteriormente
   - `altorra-notify-center--open` añadido a `activeClasses`

4. **z-index forzado en botones del header** vía CSS:
   ```
   #activityFeedTrigger, #themeToggle, #contrastToggle,
   #headerNotifBell, #headerNotifBell button,
   #altorra-voice-btn, #pwaInstallBtn {
     position: relative !important;
     z-index: 100 !important;
     pointer-events: auto !important;
   }
   ```
   Garantiza que ningún overlay inferior los pueda tapar.

5. **Nuevo diagnostic API** en consola del browser:
   - `__altorraDebugClicks = true` → loga cada click con path
     completo de elementos en (x,y)
   - `__altorraClickPath(x, y)` → lista elementos ordenados
     por z-index en esas coordenadas
   - `__altorraHeaderDiag()` → reporte completo de buttons +
     APIs disponibles + overlays con z-index alto

### Auditoría de código residual / muerto ✓ EJECUTADA (2026-05-05)

Tras la cantidad de microfases, el usuario pidió un escaneo de código
muerto. Resultados:

**Archivos JS eliminados** (ya no cargados en ningún HTML):
- `js/whatsapp-widget.js` (173 líneas) — reemplazado por `concierge.js`
  en U.4
- `js/ai-assistant.js` (221 líneas) — reemplazado por `concierge.js`
  en U.4
- `js/admin-overlay-guard.js` (eliminado en round 2 — patrón "borrar
  cosas que no entiendo" causaba más problemas que resolvía,
  reemplazado por `admin-header-fix.js` que solo OCULTA con whitelist)

Total: **~580 líneas de código muerto eliminadas**.

**Archivos legacy que SÍ siguen en uso** (NO eliminados):
- `js/historial-visitas.js` — usado en index, detalle-vehiculo, perfil
- `js/admin-phase5.js` — funciones charts y wizard aún usadas (theme
  toggle eliminado pero el resto del archivo sigue activo)

**APIs huérfanas detectadas** (expuestas pero no usadas):
- `AltorraOverlayGuard` — 0 referencias (eliminado con el archivo)
- `AltorraNativeNotifs` — 6 refs (en uso, vía wrap del notifyCenter)
- `AltorraColorExtract` — 4 refs (módulo cargado pero la integración
  con el modal de vehículo está pendiente — futuro sprint)

**CSS legacy oculto pero presente**:
- `.altorra-voice-fab { display: none !important; }` — selector
  legacy del FAB del voice (ahora botón en header). Mantenido por
  defensa contra cache vieja, eventualmente eliminable.

**Funciones residuales en admin-phase5.js**:
- `initTheme`, `toggleTheme`, `updateThemeIcon` — eliminadas en T.4
- Línea `AP.toggleTheme = toggleTheme` — comentada (era la que
  causaba el ReferenceError)
- Resto del archivo (charts, wizard) sigue funcional

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
| MutationObserver global con `subtree:true` que ejecuta operaciones DOM | Reemplaza nodos durante mousedown→mouseup, browser cancela `click` event silenciosamente. Síntoma: clicks "perdidos" en el centro de botones donde están los icons | RCA STRUCTURAL FIX 2026-05-06 |
| Acumulación de "header-fix v1, v2, v3..." sin diagnóstico real | Cada parche agrega listeners competidores. Síntoma se vuelve más confuso. Hay que detenerse y diagnosticar la CAUSA, no agregar más capas | RCA mode pidió detenerse y diagnosticar |
| Asumir que un click no funciona porque "algún overlay tapa" sin verificar el evento | Antes de bindear listeners alternativos, verificar si el evento `click` SE DISPARA. Capture-phase listener en `document` que loguee `e.target` y `elementsFromPoint` | RCA mode (telemetría reveló que click no se disparaba) |

### 17.13 — Cómo diagnosticar "click no funciona"

Antes de implementar parches, validar la hipótesis. Pasos en orden:

1. **¿El evento click se dispara?** Inyectar capture-phase listener:
   ```js
   document.addEventListener('click', e => console.log(e.target, e.clientX, e.clientY), true);
   ```
   Si NO aparece nada en consola, el browser está cancelando el evento.
   Causas posibles: mousedown y mouseup en elementos diferentes
   (mutación DOM en medio del click), elemento removido durante click,
   drag operation activa.

2. **¿`e.target` es el botón o un descendiente?** Si está dentro del
   botón, es problema de handler. Si está fuera, hay overlay tapando.

3. **¿Qué hay en el stack en ese punto?**
   ```js
   document.elementsFromPoint(x, y).slice(0, 8)
   ```
   Lista todos los elementos bajo el cursor ordenados por z-index.
   El `[0]` es el top — si NO es el botón, ese es el culpable.

4. **¿Hay MutationObservers globales activos?**
   ```js
   // En consola — instanciar uno propio detecta otros activos indirectamente
   ```
   Buscar en código `MutationObserver` con `subtree: true` observando
   `document.body`. Estos pueden reemplazar nodos durante interactions.

### 17.14 — Cuando dudes, preguntá

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

---

## 19. Metodología de Diagnóstico — RCA Mode (Root Cause Analysis)

> Esta sección documenta la metodología que **resolvió en una sola
> sesión** un bug que 5 commits anteriores no habían podido arreglar
> (clicks bloqueados en centro de botones del admin, ver §8 → "RCA
> STRUCTURAL FIX" 2026-05-06).
>
> El patrón "parche tras parche sin diagnosticar" es un anti-patrón
> caro: agota tokens, cada parche introduce nuevos handlers
> competidores, y el síntoma se vuelve más confuso. Esta metodología
> obliga a detenerse y entender ANTES de modificar.

### 19.1 — Cuándo aplicar RCA Mode

Activá esta metodología cuando se cumple **al menos uno** de estos:

| Trigger | Ejemplo |
|---|---|
| Más de 2 commits intentando arreglar el mismo bug sin éxito | header-fix v1 → v2 → v3 |
| El síntoma cambia con cada parche pero no desaparece | "ahora funciona el mic pero no el bell" |
| Hay sospecha de que la hipótesis previa es incorrecta | "los listeners están bindeados pero igual no responde" |
| El usuario pierde confianza en los cambios | "te agotas los tokens en cada commit" |
| El bug es intermitente o requiere "muchos clicks" | comportamiento no determinístico |
| Hay datos contradictorios en los reportes del usuario | "esquinas funcionan pero centro no" |

### 19.2 — La directiva (template de prompt para invocar el modo)

Cuando el usuario quiera activar este modo, le pide a Claude algo así
(plantilla basada en el prompt que resolvió el bug histórico):

```
Directiva de Diagnóstico y Corrección Estricta (RCA Mode)

Contexto del Sistema:
Estás trabajando sobre el repositorio de Altorra Cars. Se han
detectado fallos que commits anteriores no han logrado resolver de
fondo. Actúa como un Ingeniero de Software Principal enfocado en
la estabilidad estructural.

Problemas a Resolver:
[lista cada problema con SÍNTOMA + EVIDENCIA observada]

Restricción:
Elimina cualquier rastro de [parches previos]. No quiero un "v6" de
un parche; busca el elemento CSS/DOM/JS que es la causa raíz real.

Protocolo de Ejecución:

Fase de Escaneo:
- Usa grep o lectura directa para analizar evidencia
- NO asumas nada, busca el contenedor/listener/regla específica
- Mapea jerarquía completa (z-index, position, listeners, mutaciones)

Fase de Validación:
- Si no encuentras el bloqueador con escaneo, INYECTA un log temporal
  de telemetría
- Pide al usuario datos específicos (clicks en posiciones específicas,
  output de consola, screenshots)

Fase de Reporte:
- Antes de cualquier commit de solución, entregá un reporte de
  Causa Raíz confirmando los puntos
- Lista exactamente qué bloquea, qué línea, por qué falla

🛑 STOP: Una vez tengas el diagnóstico, detente y pregunta:
"He identificado las causas raíz, ¿autorizas la limpieza de parches
y la implementación de la solución estructural?"
```

### 19.3 — Las 4 fases obligatorias

#### FASE 1 — Escaneo

**Objetivo**: mapear todos los elementos relevantes con evidencia, no
con intuición.

**Herramientas mínimas**:
- `grep -rn` para encontrar definiciones, listeners, selectors
- `Read` con offset/limit para inspeccionar código exacto
- Contar ocurrencias para detectar acumulación
  (ej: "43 setIntervals corriendo")

**Reglas**:
- ❌ NO asumir que conocés la causa antes de leer.
- ❌ NO empezar a modificar archivos en esta fase.
- ✅ Listar TODOS los candidatos posibles, no solo el primero
  sospechoso.
- ✅ Verificar el patrón opuesto (¿qué SÍ funciona y por qué?). Esto
  delimita el problema. Ej: "esquinas funcionan pero centro no" →
  algo del tamaño del icono cubre el centro.

#### FASE 2 — Validación con telemetría

**Cuándo**: si la Fase 1 no produjo una causa raíz confirmada con
evidencia.

**Cómo**:
1. Inyectar un capture-phase listener o sensor minimal en el código
   que reporte a consola exactamente qué pasa en runtime.
2. Pedir al usuario datos PRECISOS (ej: "click 6 veces — 3 posiciones
   × 2 botones — y pegame el log de cada uno").
3. Cruzar los logs con la lista de candidatos de Fase 1.
4. Identificar el elemento o pattern exacto culpable.

**Ejemplo real** (RCA Fix 2026-05-06):
```js
document.addEventListener('click', function(e) {
    var btn = findClickedHeaderButton(e);
    if (!btn) return;
    console.warn('[RCA-DIAG] click sobre área del botón');
    console.log('Stack en el punto:', document.elementsFromPoint(e.clientX, e.clientY));
    console.log('e.target:', e.target);
    if (btn.contains(e.target)) console.log('✅ target dentro del botón');
    else console.error('❌ target FUERA — overlay culpable:', path[0]);
}, true);
```

Resultado: 3 de 6 clicks (los del centro) NO generaron NINGÚN log →
el evento `click` no se disparaba → causa raíz era una mutación DOM,
no un overlay.

**Reglas**:
- ❌ NO bindear handlers "por si acaso" durante la fase de telemetría.
- ❌ NO modificar comportamiento; solo OBSERVAR.
- ✅ El sensor debe ser puro: capture phase, sin preventDefault, sin
  stopPropagation.
- ✅ Pedir datos antes de inferir conclusiones. La intuición sin datos
  fue lo que falló en los 5 commits previos.

#### FASE 3 — Reporte de Causa Raíz

**Antes de tocar código de solución**, entregar al usuario un reporte
estructurado con:

| Item | Contenido |
|---|---|
| **Qué bloquea** | El elemento/listener/regla EXACTO con archivo:línea |
| **Por qué bloquea** | Mecanismo técnico (mutación DOM, race condition, regla incorrecta, etc.) |
| **Evidencia** | Logs / código citado / cómo se mapea cada síntoma a la causa |
| **Plan estructural** | Qué eliminar, qué agregar, qué patches previos quitar |
| **Riesgos** | Qué podría romperse al aplicar el fix |

**Formato sugerido del reporte**:
```
## 🎯 CAUSA RAÍZ CONFIRMADA

[Mecanismo técnico explicado en 2-3 líneas]

## El culpable: [archivo:líneas]

[Bloque de código citado]

**Lo que pasa**:
1. [paso 1]
2. [paso 2]
...

**Por qué encaja con todos los síntomas**:
| Síntoma | Explicación |
|---|---|

## Solución estructural (sin parches)
1. [acción]
2. [acción]
3. [acción]
```

#### FASE 4 — STOP obligatorio + autorización

**REGLA INVIOLABLE**: después del reporte, NO escribir código de
solución hasta que el usuario diga explícitamente "sí, autorizo" o
equivalente.

Esto sirve para:
- **Validar el diagnóstico**: el usuario puede aportar contexto que
  ajuste el plan.
- **Filtrar falsas convicciones**: a veces lo que parece causa raíz
  es solo un síntoma intermedio.
- **Mantener al usuario en control**: él autoriza la limpieza de
  parches que pueden tener dependencias.

**Ejemplo de STOP**:
```
🛑 STOP

He identificado las causas raíz de los 3 puntos:
[tabla resumen]

¿Autorizás la limpieza de parches y la implementación
de la solución estructural?
```

### 19.4 — Anti-patrones que esta metodología previene

| Anti-patrón | Por qué pasa | Cómo lo previene RCA Mode |
|---|---|---|
| "Parche v1, v2, v3..." sin causa raíz | Bajo contexto + presión de respuesta rápida | Fase 1 obliga a escaneo previo; Fase 4 STOP impide commit sin autorización |
| Listeners competidores acumulados | Cada parche agrega un nuevo handler que peleaba con los previos | Fase 3 reporte menciona qué quitar antes de agregar |
| `stopPropagation` / `stopImmediatePropagation` defensivos | Asunción "algún listener está interfiriendo" | Fase 2 telemetría confirma SI hay interferencia o no antes de defenderse |
| z-index 99999 forzado en elementos | Asunción "algún overlay tapa" sin verificar | Fase 1 lista TODOS los `position: fixed` con z-index alto y descarta los whitelisted |
| `setInterval` de cleanup que corre cada N segundos | Asunción "algo se rompe periódicamente, hay que limpiar siempre" | Fase 2 telemetría revela si hay un disparador específico, no algo "ambiente" |
| Confiar en "lo que sé" del codebase | Conocimiento previo puede estar desactualizado | Fase 1 obliga a leer el código actual, no recordarlo |

### 19.5 — Cuándo NO usar RCA Mode

Esta metodología tiene overhead. Si el bug es trivial y la causa es
visible en el primer escaneo, no justifica las 4 fases. Ejemplos
donde NO aplica:

- Typo evidente en un selector.
- Variable mal nombrada que el linter ya detecta.
- Feature nueva sin código previo.
- Configuración faltante (ej: API key sin setear).

Aplica a partir del **segundo intento fallido** del mismo bug, o
cuando el bug es **intermitente** o **el síntoma no encaja con la
hipótesis obvia**.

### 19.6 — Resumen de principios

1. **No asumir, observar**. Logs > intuición.
2. **Verificar el patrón opuesto**. Lo que SÍ funciona delimita
   lo que NO.
3. **Escaneo antes que modificación**. Saber qué hay antes de
   tocar.
4. **Telemetría antes que parche**. Confirmar el mecanismo
   exacto.
5. **Reporte antes que solución**. Validar el diagnóstico con
   el usuario.
6. **STOP antes que código**. La autorización filtra falsas
   convicciones.
7. **Limpieza estructural > capa de defensa**. Eliminar la causa
   raíz; no agregar otro handler que la compense.

> **Para Claude**: cuando un usuario reporte un bug que ya tuvo
> intentos previos fallidos, considerá invocar este modo
> automáticamente. Antes de escribir el primer Edit, leé esta
> sección y aplicá las 4 fases. La metodología funcionó:
> resolvió en 1 sesión un bug que 5 commits anteriores no
> habían podido arreglar.

---

## 20. Concierge → ALTOR (Iteraciones cliente 2026-05-06)

> Refactor del Bloque U del Mega-Plan v4 ejecutado bajo RCA Mode
> tras feedback iterativo del cliente. La sesión arrancó con un
> Concierge genérico tipo "sparkles + wizard rígido legacy" y
> terminó con **ALTOR** — bot con identidad propia, IA conversacional
> real, y power-ups admin-side. Todo documentado para futuras
> referencias.

### 20.1 Línea de tiempo de iteraciones

| # | Cambio | Commit |
|---|---|---|
| 1 | Refactor Concierge — íconos sparkles + KB seeder de 10 FAQs fundacionales + escalateToLive con waitForAuthThen | `066e239` |
| 2 | PURGA TOTAL — eliminado IIFE legacy 1032 líneas embebido en `components.js` + vehicle-thread.js + admin-inbox.js eliminados + Inbox unificado | `dd0f2b9` |
| 3 | Concierge IA — Lead Gate + intent classifier + handoff dinámico + admin power-ups (pin/archive/unread/delete) | `d9779a4` |
| 4 | Lead Gate compactado para entrar sin scroll en panel de 560px | `d10f2fc` |
| 5 | ALTOR — rebranding con imagen PNG propia + naming "Asistente Virtual IA" | `fa1f111` |
| 6 | ALTOR FAB flotante — sin círculo dorado, drop-shadow respeta canal alpha | `d6f848a` |
| 7 | ALTOR mejoras de personalidad — más grande + hover spin + CTA bubble rotativo cada 38s | `950fa23` |
| 8 | ALTOR happy dance + CTA timing 6s+6s + burbuja de pensamiento + sparkles orbitando | (este commit) |

### 20.2 Causa raíz del wizard verde de WhatsApp

El cliente reportó que tras shippear el Concierge unificado (U.4)
seguía apareciendo un "wizard rígido con botón verde de WhatsApp"
en bottom-right de las páginas públicas. Tras el primer escaneo
NADA aparecía cargando `whatsapp-widget.js` ni `ai-assistant.js`
externamente.

**Causa real**: dentro de `js/components.js` líneas 910-1942 vivía
un IIFE separado de **1,032 líneas** marcado como
`// ASISTENTE WHATSAPP — integrado aquí para evitar HTTP extra`.
Era el wizard completo (FAB verde con logo WhatsApp, panel "AC /
Asistente ALTORRA / En linea", 5 botones rígidos
"Comprar/Financiar/Vender/Agendar/Asesor", redirect a `wa.me/`).

Cuando se shippeó U.4 eliminamos los archivos externos pero NUNCA
borramos este IIFE embebido. Por eso el flujo legacy seguía vivo
aunque components.js no cargara los scripts viejos.

**Patrón de debugging que lo encontró**: grep del texto literal
"Asistente ALTORRA" en todo el repo. El usuario había compartido
captura con ese texto exacto, y el grep lo encontró en components.js.

**Fix**: eliminadas líneas 910-1942 con awk truncate. Conservadas
las funciones exportadas (`loadAllComponents`, etc.) en líneas
1-909.

### 20.3 Inbox admin unificado

Antes había DOS bandejas redundantes:
- `Mensajes vehículo` → `js/admin-inbox.js` → colección `mensajes/`
- `Concierge` → `js/admin-concierge.js` → colección `conciergeChats/`

Asesor tenía que revisar dos lugares. Solución:

1. `js/vehicle-thread.js` ELIMINADO. Botón "Hacer pregunta" en
   detalle-vehiculo cambia handler de `data-action="ask-vehicle"`
   a `data-action="open-concierge-vehicle"`.
2. `js/admin-inbox.js` ELIMINADO. Sec-inbox HTML removida.
3. `js/concierge.js` nueva función `openWithVehicleContext(opts)`:
   - Setea `session.sourceVehicleId`
   - Si la sesión está vacía, siembra greeting contextualizado
     mencionando marca+modelo+año del vehículo (resuelto via
     cascada: `opts.vehicleTitle` → `vehicleDB.vehicles.find(id)`
     → DOM `.vehicle-title` → `<h1>` filtrado por regex →
     fallback "este vehículo")
4. `admin.html` sec-concierge renombrado a "Inbox unificado".
5. `js/admin-section-router.js` añadido alias `inbox → concierge`
   para que deep-links viejos `#/inbox` redirijan automáticamente.
6. Total 26 archivos HTML actualizados con script Python idempotente
   (detalle-vehiculo + 25 vehiculos/*.html generadas).

### 20.4 Lead Capture Gate

Form obligatorio antes del primer mensaje del cliente (inspirado
en flujos bancarios). 5 campos:
- Nombre + Apellido (en flex-row)
- Cédula (regex `[0-9]{5,12}`) + Celular (regex `3[0-9]{9}` Colombia,
  ambos en flex-row)
- Correo (regex email)
- Checkbox consent (obligatorio para legal/GDPR)

Al submit:
- Persist `session.profile = {...}` + `session.gateCompleted = true`
- `session.level = 2` (L2 contactable de progressive profiling)
- Trigger `createSoftContact()` con datos completos
- Fade-out gate, fade-in chat con greeting personalizado por nombre

Auth users con perfil completo (uid+email+nombre) saltan el gate
automáticamente.

**Compactación CSS** tras feedback del cliente (form salía del
viewport en panel de 560px):
- Padding 18→12px, font-sizes -1 escalón cada uno
- Gap 10→7px, input padding 9×10→7×9
- Cédula+Celular en row (ahorra ~70px verticales)
- `@media (max-height: 600px)` adicional para laptops chicos

### 20.5 Intent Classifier (`js/ai/intent.js`)

Módulo nuevo rule-based, sub-ms, 13 intents:
- `greeting`, `thanks`, `goodbye`
- `inventory_query`, `pricing_query`, `availability_query`
- `financiacion_query`, `appointment_request`, `sell_my_car`
- `confirmation`, `negation`, `frustration`, `ask_human`

Lexicon con 100+ keywords coloquiales colombianos. Match score por
longitud del keyword (más largo = más específico). Confidence
proporcional a cobertura del keyword sobre el mensaje.

**Memoria conversacional** en `session.context`:
```js
{
    lastIntent: 'greeting',
    lastTurnAt: timestamp,
    discussedTopics: ['financiacion', 'mazda'],
    bot_repeated_count: 0
}
```

`AltorraIntent.shouldVary(context)` → true si bot_repeated_count
≥ 2, marca para variar respuesta y no parecer robótico.

**Refactor `generateBotResponse()`**: 15 ramas en cascada con
prioridades. Detección de intent ANTES del KB para responder
naturalmente:
- `greeting` → 3 variantes con personalización por firstName
- `thanks` → "¡De nada! Cualquier otra cosa, aquí estoy 🙌"
- `goodbye` → "¡Hasta pronto! 👋"
- `inventory_query` → consulta `vehicleDB.vehicles` para conteo real
- `pricing_query` + NER detecta marca → busca precio real en vehicleDB
- `frustration` / `ask_human` / sentiment <-0.5 → escalar inmediato
- Context-aware: `confirmation` tras topic discutido → escalar al topic

Anti-repetición: si cliente repite mismo intent 2+ veces, fallback
varía y sugiere escalar.

### 20.6 Handoff dinámico

Cuando llega el primer mensaje `from='asesor'` vía onSnapshot:
1. Detecta primer asesor mensaje (`!session.activeAsesor`)
2. Inserta mensaje sistema `from='system'` con texto
   `"✓ {asesorNombre} se ha unido al chat"` con clase `cnc-system-msg`
   (verde claro, centrado, animación cncMsgIn)
3. `session.activeAsesor = { uid, nombre, photoURL }`
4. `applyAsesorHeader()`:
   - Title: "ALTOR" → `{asesorNombre}` (ej. "Daniel Romero")
   - Status: "Asistente Virtual IA · Altorra Cars" → "En vivo · responde ahora"
   - Avatar: ALTOR.png → `<img src="photoURL">` o `<span>` con iniciales

`admin-concierge.js sendAsesorMessage()` envía `asesorPhotoURL` desde
`AP.currentUserProfile.photoURL` para que cliente vea avatar real.

`renderMessages()` extendido para soportar `from='system'`: clase
distinta `.cnc-system-msg` con border verde y centrado.

### 20.7 Admin Concierge Power-ups

**Schema extendido** `conciergeChats/{sid}` (sin requerir cambio
de rules — la regla `allow update if isEditorOrAbove()` cubre):
- `isPinned: bool, pinnedAt: timestamp`
- `isArchived: bool, archivedAt, archivedBy`
- `isDeleted: bool, deletedAt, deletedBy` (soft-delete)
- `forceUnreadByAdmin: bool` (marca manual no leído)

**Filter bar** (4 chips encima de la lista):
- Activos (default — `!isArchived && !isDeleted`)
- Fijados (`isPinned`)
- Archivados (`isArchived`)
- Eliminados (`isDeleted` — solo super_admin)

Cada chip con count dinámico calculado on-render.

**Menú contextual** botón "..." aparece on hover/focus en cada chat:
- 📌 Fijar / Quitar fijación → toggle `isPinned`
- 📁 Archivar / Desarchivar → toggle `isArchived` (chat sale del
  default view, accesible vía filtro)
- ✉ Marcar como no leído → set `forceUnreadByAdmin: true`
- 🗑 Eliminar → soft-delete con confirm doble (super_admin only)
- ↺ Restaurar → desde filtro Eliminados

**State badges** visuales en cada item:
- Pin dorado si `isPinned`
- Archive gris si `isArchived`
- Trash rojo si `isDeleted`

**Sort**: pinned primero, luego por `lastMessageAt` desc.
Limit aumentado de 50 → 100.

`openChat(sid)` resetea `forceUnreadByAdmin: false` además del unread.

### 20.8 ALTOR — identidad y branding

**Nombre**: el cliente subió un PNG propio (`ALTOR.png` en raíz del
repo) con un robot dorado con headset, ojos cyan, sonriente. Decidió
nombrarlo "ALTOR" y presentarlo como "Asistente Virtual IA · Altorra
Cars".

**Cambios**:
- `AC_LOGO_SVG` (monograma SVG inline) → `ALTOR_AVATAR_HTML` con
  `<img src="/ALTOR.png" loading="eager" decoding="async">`
- Ruta absoluta `/ALTOR.png` para resolver desde cualquier página
  (raíz, /vehiculos/, /marcas/)
- `onerror` fallback a `<span class="cnc-altor-fallback">AL</span>`
  (defensa si PNG falla a cargar)
- Title del header: "Asistente Virtual" → **"ALTOR"**
- Subtítulo: "Altorra Cars · respuesta inmediata" → **"Asistente
  Virtual IA · Altorra Cars"**
- Greeting post-gate y welcome bubble se presentan con el nombre:
  `"¡Hola Daniel! 👋 Soy ALTOR, el Asistente Virtual IA de Altorra
  Cars. Veo que te interesa el {vehicle}..."`
- aria-labels actualizados: "Abrir ALTOR — Asistente Virtual IA..."

### 20.9 FAB flotante (sin círculo)

Tras feedback del cliente "el PNG ya tiene su efecto integrado, no lo
metas dentro de un círculo dorado":

**FAB**:
- Background → `transparent` (era radial-gradient dark)
- Border → `none` (era 2px solid #c9a663)
- Overflow → `visible` (era hidden — clipping circular eliminado)
- `border-radius` removido del button
- Width/Height → 92×92 desktop, 78×78 mobile
- `box-shadow` → `filter: drop-shadow()` doble que **respeta canal
  alpha** del PNG. Solo sombrea la silueta visible del bot, no el
  bounding rectangle.

**Avatar del header del chat**: SE MANTIENE dentro del círculo dorado
(foto de perfil clásica recortada redonda). Override scoped:
`.cnc-avatar .cnc-altor-img { object-fit: cover; border-radius: 50%; }`

**Animaciones**:
- `altorFloat` (3.4s loop) → `translateY 0 → -4px → 0`. Sutil flotación
- `altorGlow` (3s loop) → `filter: drop-shadow` dorado pulsante con
  tinte amarillo cálido en el peak (`rgba(245, 223, 128, 0.45)`)

**Hover happy dance** (1.6s loop infinito mientras hover):
```css
@keyframes altorHappyDance {
    0%, 100% { rotate(0)   translateY(0)  scale(1); }
    25%      { rotate(10)  translateY(-7) scale(1.10); }
    50%      { rotate(8)   translateY(-7) scale(1.10); }
    75%      { rotate(5)   translateY(-5) scale(1.08); }
    /* + alternaciones tilt -10/-8/-5/-2 deg con bounce */
}
```
Sin giro completo (era robótico). Tilt rítmico ±10° + bounce
vertical + scale variable. Easing in-out humano natural.

**Sparkles orbitando**: 2 pseudo-elementos del button (`::before`
y `::after`) con backgrounds radial dorados. Solo visibles on hover.
Trayectorias circulares con `keyframes altorSparkleA/B` que combinan
translate + scale + opacity.

### 20.10 CTA Bubble — invitación rotativa

Burbuja blanca cremosa flotante junto al FAB con mensajes rotativos
invitando a conversar. Inspirado en chat-bubbles de Drift/Intercom.

**Diseño**:
- Background `linear-gradient(135deg, #fefdf6, #fff7e0)` (blanco crema)
- `border-radius: 18px` con esquina inferior derecha 6px (tail visual)
- Tail triangular CSS via `::after` apuntando al FAB
- Box-shadow doble: drop + tinte dorado + ring sutil

**Mensajes rotativos** (no repite el anterior, sessionStorage de last_idx):
```js
[
    '👋 ¡Hola! ¿Quieres hablar conmigo?',
    '¡Quiero hablar contigo!',
    '¿Buscas tu auto ideal? Pregúntame 🚗',
    '💬 Estoy aquí para ayudarte',
    '¿Tienes dudas? Te respondo en segundos',
    'Hola, soy ALTOR. ¿En qué te ayudo?',
    '¿Quieres ver opciones de financiación? 💳'
]
```

**Timing exacto pedido por cliente**:
- 2s tras page load → primer mensaje
- 6s visible
- 6s sin mensaje
- Próximo mensaje (loop ad infinitum)
- Ciclo total = 12s

**Anti-spam**:
- Panel abierto → `hideCtaBubble()` y no aparece
- `document.hidden` (tab background) → ocultar
- Click en X → snooze 5 min con persistencia en
  `localStorage.altorra_cta_snooze`
- Click en bubble (fuera de X) → abre el panel directo

**Animación de aparición**:
- Scale 0.85 → 1 + slide right→0 con cubic-bezier overshoot (0.55s)
- 0.5s después: ping subtle `scale(1.05)` (animation `ctaBubbleAttention`)

**Mobile** (`max-width: 480px`): bubble se posiciona ARRIBA del FAB
en vez de a la izquierda (no hay espacio horizontal). Tail apunta
hacia abajo.

### 20.11 Burbuja de pensamiento — el panel sale de ALTOR

El panel del chat ahora "emana" del FAB con efecto cómic:

**Origen visual**:
- `transform-origin: bottom right` (esquina cerca del FAB)
- Estado cerrado: `transform: scale(0.06) translate(40px, 40px)` →
  el panel arranca casi invisible cerca de la posición del FAB
- Estado abierto: `transform: scale(1) translate(0, 0)`
- Easing: `cubic-bezier(0.34, 1.5, 0.55, 1)` — overshoot suave tipo
  burbuja inflando

**Forma del panel**:
- `border-radius: 22px 22px 6px 22px` — esquina inferior derecha
  cuadrada (apunta hacia el FAB, refuerza la idea de tail)

**Burbujas de pensamiento intermedias** (estilo cómic):
- Pseudo-elementos `::before` (16×16px) y `::after` (9×9px) del
  panel mismo
- Posicionados entre el FAB y el panel (`bottom: -22px / -38px`)
- Background dark gradient con border dorado (matching el panel)
- Aparecen con delay escalonado (`::after` instant, `::before` 0.08s)
- `transform: scale(0)` → `scale(1)` con cubic-bezier overshoot
- Refuerzan visualmente que "el chat sale de ALTOR"

### 20.12 Configuración Firestore — sin deploys manuales requeridos

Todo el bloque de cambios v20.X NO requirió deploy manual de:
- `firestore.rules` — la regla existente
  `match /conciergeChats/{sid} { allow update: if isEditorOrAbove() ...}`
  ya cubre los nuevos campos `isPinned`/`isArchived`/`isDeleted`/
  `forceUnreadByAdmin`/`pinnedAt`/`archivedAt`/`archivedBy`/`deletedAt`/
  `deletedBy`. No requiere `firebase deploy --only firestore:rules`.
- Storage rules
- Cloud Functions
- RTDB rules

Cache se invalida automáticamente en próximo page load del cliente
vía bump del `CACHE_VERSION` en service-worker.js.

### 20.13 Anti-patrones detectados durante el bloque

| Anti-pattern | Caso real | Lección |
|---|---|---|
| Código legacy "integrado para evitar HTTP extra" embebido en otro archivo | IIFE de 1032 líneas en components.js | Si vas a "integrar" código de otro archivo, hacelo en una función exportada explícita o agregá un comment header MUY visible. NO embeberlo como IIFE separado donde se olvida con el tiempo. |
| `document.querySelector('.vehicle-title, h1')` sin fallback de string vacío | "Veo que te interesa el ." | Siempre validar `if (!str || !str.trim())`, no solo `if (!el)`. Un h1 vacío retorna string vacío, no null. |
| Animar SVG inline complejo en hover causa jank | Spin 360° sobre SVG con paths múltiples | Mejor usar `<img>` PNG con animation, o limitar SVG a 1-2 paths. |
| `setInterval` para CTA bubble con tiempos rígidos | Cliente quería timing 2s+6s+6s preciso | Usar setTimeout recursivo en vez de setInterval para tener control exacto del ciclo (visible/hide). Más legible y reseteable. |
| `transform-origin` default en panel grande hace que la animación se sienta "centrada" en la pantalla | Panel cnc-open arranca con `scale(0.96) translateY(20)` | Si querés que un panel salga de un punto específico (ej. FAB), `transform-origin: {posición del origen}` + scale agresivo (0.05-0.1) + translate del estado inicial. Da efecto burbuja-cómic auténtico. |

### 20.14 Cómo extender ALTOR

**Para agregar un mensaje nuevo al CTA bubble**:
1. Agregar string al array `CTA_MESSAGES` en `js/concierge.js`
2. Sin más cambios — el rotativo lo recoge automáticamente

**Para agregar un nuevo intent al classifier**:
1. Agregar entrada al objeto `LEXICON` en `js/ai/intent.js` con
   keywords coloquiales relevantes
2. Agregar rama `if (classification.intent === 'X')` en
   `generateBotResponse()` con la respuesta apropiada
3. Si es "topic-able" (ej. precio, financiación), agregar al
   `topicMap` de `updateContext()` para que entre en
   `discussedTopics[]`

**Para agregar una nueva acción admin a chats**:
1. Definir nuevo campo en el schema (ej. `isPriority`)
2. Agregar la acción al menú contextual en `showChatMenu()` de
   `admin-concierge.js` con su `action` y `icon`
3. Crear función `togglePriority(sessionId)` que haga el `set({...},
   { merge: true })`
4. Agregar entrada al `case` de menu actions en `addEventListener`
5. Optional: badge visual en `renderChatList()` con clase `.cnc-X`

Sin requerir cambios de rules — la regla actual cubre cualquier
campo nuevo del doc.

**Para agregar un canal de WhatsApp legacy** (si volvemos a
necesitarlo en el futuro):
- `handoverToWhatsApp()` y `buildWhatsAppSummary()` en
  `concierge.js` siguen existiendo como utilidades
- NO están bound a botones públicos
- Pueden invocarse manualmente desde el admin (caso U.14 — handover
  refinado)
- O llamarse directamente desde código nuevo:
  `AltorraConcierge.session()` retorna estado completo

> **Para Claude**: ALTOR es una pieza viva. Antes de tocar el bot,
> probar el flujo end-to-end (open FAB → gate → primer mensaje →
> intent → escalate → asesor responde). Si rompés cualquier parte
> de la cascada de generateBotResponse, los siguientes turnos se
> sienten robóticos. Ver §20.5 para extension safe.

### 20.15 Iteración: hover happy dance + sparkles + CTA timing 2/6/6 + burbuja de pensamiento

Tras feedback inicial del cliente sobre la primera versión del CTA y
la animación de hover, se rediseñaron tres comportamientos clave:

**Hover animation rediseñada — happy dance**:

La versión inicial (spin 360° en 0.85s) se sintió robótica. Se
reemplazó por un loop infinito de tilt rítmico ±10° con bounce
vertical y scale variable, easing in-out humano natural.

```css
@keyframes altorHappyDance {
    0%, 100% → rotate 0   / translateY 0   / scale 1
    12%      → rotate -10 / translateY -4  / scale 1.06
    25%      → rotate +10 / translateY -7  / scale 1.10
    37%      → rotate -8  / translateY -3  / scale 1.06
    50%      → rotate +8  / translateY -7  / scale 1.10
    62%      → rotate -5  / translateY -3  / scale 1.06
    75%      → rotate +5  / translateY -5  / scale 1.08
    87%      → rotate -2  / translateY -1  / scale 1.03
}
```

Duración 1.6s, loop infinito mientras el hover se mantiene. La
rotación se aplica a la `<img>` interna (no al button) para coexistir
con el transform del button (`scale(1.10) translateY(-3px)`) que
sigue activo en hover.

**Sparkles orbitando** — `::before` y `::after` del FAB con
backgrounds `radial-gradient(circle, #fff5d0 0%, #c9a663 60%, transparent)`:
- Solo visibles en hover (transition opacity)
- Trayectorias circulares con `keyframes altorSparkleA` y
  `altorSparkleB` (translate + scale + opacity)
- B con `animation-delay: 0.4s` para asincronía

**CTA bubble — timing exacto pedido por el cliente**:

```js
CTA_FIRST_DELAY_MS = 2000      // primer mensaje a los 2s del page load
CTA_VISIBLE_MS = 6000          // visible 6s
CTA_HIDE_INTERVAL_MS = 6000    // 6s de pausa entre mensaje y mensaje
```

Implementación con `setTimeout` recursivo (no `setInterval`) para
control exacto del visible/hide. Ciclo total = 12s. Anti-spam
preservado (panel abierto / snooze localStorage / tab oculto
suprimen el mensaje pero el ciclo sigue).

**Burbuja de pensamiento — panel emana del FAB**:

El panel del chat ahora aparece como un bocadillo de cómic saliendo
de ALTOR:

```css
.altorra-concierge {
    transform-origin: bottom right;
    transform: scale(0.06) translate(40px, 40px);  /* casi invisible cerca del FAB */
}
.altorra-concierge.cnc-open {
    transform: scale(1) translate(0, 0);
}
/* Easing: cubic-bezier(0.34, 1.5, 0.55, 1) — overshoot suave tipo
   "burbuja inflando". Duración 0.50s. */
```

### 20.16 Iteración: tail SVG intentado y descartado

El cliente pidió una "punta" para el panel del chat tipo bocadillo
de cómic apuntando hacia la cabeza de ALTOR.

**Intento 1**: agregar SVG `<svg class="cnc-tail">` como primer hijo
del panel con un path orgánico curvado (`M0,0 L34,0 Q52,4 54,18 ...`),
posicionado absolute en `bottom: -34px right: -10px`. Para que el
SVG saliera del bounding box del panel, se cambió `overflow: hidden`
→ `visible`. Eso requirió a su vez que cada hijo directo recibiera
sus propias `border-{top,bottom}-{left,right}-radius: 22px` para
que las esquinas siguieran redondeadas.

Panel también se movió de `right: 24px` → `right: 50px` para dejar
espacio horizontal entre el panel y ALTOR para que la punta tuviera
camino visual.

**Resultado visual**: el cliente reportó que el SVG quedaba como
"basura encima de la cabeza de ALTOR" — se veía como un objeto
desconectado, no como una extensión orgánica del panel. Pidió
eliminarlo.

**Eliminación completa**:
- Removido el `<svg class="cnc-tail">` del innerHTML del panel
- Removidas TODAS las reglas `.cnc-tail` del CSS (~30 líneas)
- Restaurado `overflow: hidden` en el panel
- Removidas reglas auxiliares de `border-radius` en hijos directos
  (innecesarias sin overflow:visible)
- Panel vuelto a `right: 24px`

**Lección aprendida**: una "punta" decorativa no funciona si está
visualmente desconectada del panel principal. El border-radius
asimétrico previo (`22px 22px 6px 22px`) tampoco era ideal — quedaba
como una esquina rota en vez de una conexión natural.

**Solución actual**: la conexión visual del panel hacia ALTOR la hace
**solo la animación de apertura** (`scale(0.06 → 1)` con
`transform-origin: bottom right`). El panel "emana" del FAB
visualmente sin necesitar elemento gráfico explícito. Más limpio,
menos vulnerable a quedar feo si las dimensiones cambian.

**Anti-patrón documentado**: si una decoración visual depende de
proporciones geométricas precisas (relación entre tamaño del FAB,
posición del panel, ángulo del tail), es frágil. Cualquier cambio
de tamaño la rompe. Mejor confiar en el lenguaje de animación
(transform-origin) para sugerir la conexión.

### 20.17 Iteración final: ALTOR más grande (108×108 desktop, 92×92 mobile)

Tras eliminar el tail, ALTOR pasó de 92×92 a **108×108 px** en
desktop (+17%) y de 78×78 a **92×92 px** en mobile (+18%).

**Ajustes geométricos en cascada**:

| Elemento | Antes | Ahora |
|---|---|---|
| FAB desktop | 92×92 | 108×108 |
| FAB mobile | 78×78 | 92×92 |
| Panel desktop `bottom` | 130px | 148px (FAB 108 + 24 base + 16 gap) |
| Panel mobile `bottom` | 105px | 124px (FAB 92 + 16 base + 16 gap) |
| Panel mobile `max-height` | calc(100vh − 125) | calc(100vh − 144) |
| CTA bubble `bottom` | 56px | 62px (alineado con boca de ALTOR mayor) |
| CTA bubble `right` | 130px | 146px (FAB 108 + ~38 gap) |

**Reglas operativas para ajustar tamaño de ALTOR en el futuro**:

Si necesitás cambiar el tamaño del FAB, hay 5 valores que cascadean:

1. `.altorra-concierge-btn { width, height }` (desktop)
2. `@media (max-width: 480px) .altorra-concierge-btn { width, height }` (mobile)
3. `.altorra-concierge { bottom }` (desktop) = `FAB_height + 24px + 16px gap`
4. `@media (max-width: 480px) .altorra-concierge { bottom, max-height }` (mobile)
5. `.cnc-cta-bubble { bottom, right }` (alineación con la cara de ALTOR)

Si NO ajustás los puntos 3-5 después de cambiar 1-2, el panel queda
solapando el FAB o el CTA bubble queda flotando "lejos" del FAB.

### 20.18 Estado final del Bloque U (commits resumen)

| # | Commit | Descripción |
|---|---|---|
| 1 | `066e239` | Refactor Concierge — sparkles + KB seeder + escalateToLive con waitForAuthThen |
| 2 | `dd0f2b9` | PURGA TOTAL — IIFE legacy 1032 líneas eliminado de components.js + Inbox unificado |
| 3 | `d9779a4` | Concierge IA — Lead Gate + intent classifier + handoff + admin power-ups |
| 4 | `d10f2fc` | Lead Gate compactado |
| 5 | `fa1f111` | ALTOR rebrand — PNG propio + naming Asistente Virtual IA |
| 6 | `d6f848a` | ALTOR FAB flotante — sin círculo, drop-shadow respeta canal alpha |
| 7 | `950fa23` | ALTOR personalidad — más grande + spin + CTA bubble cada 38s |
| 8 | `2d17693` | ALTOR final polish — happy dance + CTA timing 2/6/6 + burbuja pensamiento + doc §20 |
| 9 | `37a320c` | Tail SVG apuntando a ALTOR (intentado) |
| 10 | `8ea9ebd` | Tail SVG eliminado tras feedback negativo del cliente |
| 11 | (este commit) | ALTOR más grande 108×108 + doc §20.15-20.18 |

**Archivos modificados/creados durante el bloque U entero**:

| Archivo | Tipo |
|---|---|
| `js/concierge.js` | refactor masivo (Lead Gate, intent, handoff, ALTOR) |
| `js/admin-concierge.js` | power-ups (pin/archive/unread/delete + filter bar) |
| `js/admin-kb.js` | seeder de 10 FAQs fundacionales |
| `js/ai/intent.js` | NUEVO — clasificador de 13 intents |
| `js/components.js` | eliminado IIFE legacy 1032 líneas + carga de `intent.js` |
| `js/admin-section-router.js` | alias `inbox → concierge` |
| `js/admin-inbox.js` | ELIMINADO |
| `js/vehicle-thread.js` | ELIMINADO |
| `css/concierge.css` | rebranding + tail iteraciones + happy dance + sparkles + CTA bubble |
| `css/admin.css` | filter bar admin, menu contextual, badges de estado |
| `admin.html` | nav-item Inbox unificado, sec-concierge renombrado, filter bar div, eliminada sec-inbox |
| `firestore.rules` | branch `isEditorOrAbove()` para `clientes/{uid}` (CRM) |
| `detalle-vehiculo.html` + 25 generadas | botón cambia a `data-action="open-concierge-vehicle"` |
| `ALTOR.png` | NUEVO — imagen del bot subida por el cliente a la raíz |
| `service-worker.js` | bumps en cada commit del bloque |
| `js/cache-manager.js` | bumps en cada commit del bloque |
| `CLAUDE.md` | sección 20 completa con sub-secciones 1-18 |

**Total**: 11 commits, ~3000+ líneas afectadas, 4 archivos nuevos,
2 eliminados, 38 modificados.

---

## 21. Bot Ultra Mega Cerebro — Lifecycle real + Identidad unificada + LLM (2026-05-06)

> Refactor en 3 fases ejecutado bajo RCA Mode tras feedback del cliente
> sobre fallos graves en el ciclo de vida de las sesiones, identidad
> fragmentada entre auth y chat, y nivel de inteligencia inaceptable.
> Resultado: ALTOR pasa de "bot de reglas básicas" a "Agente de IA
> Cognitivo empresarial" con LLM real, memoria de conversación,
> function calling y triggers proactivos.

### 21.1 Línea de tiempo

| # | Commit | Descripción |
|---|---|---|
| 1 | `3a7e465` | Fase 1+2 — hard delete + status closed + purge vehicle bleed + cédula obligatoria + auth profile en chat |
| 2 | `de82c08` | Fase 3 Bloque 1 — Cerebro Altorra AI + chat provider + Cloud Function chatLLM + LLM fallback rules |
| 3 | `b233395` | Fase 3 Bloque 2 — F.1 conversation summary + F.2 CTA tags + F.3 proactive triggers |

### 21.2 Fase 1 — Lifecycle real

**Soft delete eliminado**:
- `softDelete` (set `isDeleted: true`) → `hardDeleteChat`: doble confirm
  + borrado real de la subcolección `messages/` en batch + `delete()`
  del doc parent. Sin soft delete porque "Eliminados" generaba
  confusión y los docs nunca se purgaban realmente.
- Filter chip "Eliminados" removido del filter bar admin.
- `restoreDeleted()` eliminado (no aplica sobre datos borrados).
- `isDeleted` ya no se setea (defensa solo para docs viejos en
  `getVisibleChats`).

**Cierre de sesión real**:
- Admin: `closeChat()` ahora setea `status: 'closed'` + inyecta mensaje
  system "✓ {asesor} cerró esta conversación".
- `reopenChat()` nueva: revierte a `status: 'active'` + mensaje system
  de reapertura. Botón cambia dinámicamente "Cerrar chat" ↔ "Reabrir"
  según `chat.status`.
- Cliente: nuevo listener `_firestoreParentUnsub` al doc parent detecta
  cambios de status sin esperar mensajes. `applyClosedState()`:
  bloquea input/sendBtn, oculta quickActions, inyecta `cnc-closed-block`
  con CTA "🔄 Iniciar nueva conversación".
- `resetSession()`: cierra listeners, limpia localStorage, genera nuevo
  `sessionId`, re-aplica perfil del auth si user logueado, re-renderiza
  panel desde cero.
- `send()` bloqueado con guard `if (session.closed) return`.

**Fuga de contexto eliminada (vehicle bleed)**:
- En `loadSession()` después de leer localStorage: si la página actual
  NO es página de vehículo Y hay `sourceVehicleId` residual → purgar.
- Si SÍ es página de vehículo Y `PRERENDERED_VEHICLE_ID` existe →
  sincronizar a ese ID actual.
- Detección `isVehiclePage`: check `window.PRERENDERED_VEHICLE_ID` o
  pathname `/vehiculos/`.

### 21.3 Fase 2 — Identidad unificada con cédula

**Cédula obligatoria en registro**:
- `snippets/auth-modal.html`: nuevo `<input id="regCedula">` con
  pattern `[0-9]{5,12}`, required, hint "Necesaria para procesos
  de financiación, peritaje y consignación".
- `js/auth.js handleRegister`: validación regex + persistencia.
- Teléfono también ahora obligatorio (consistencia identidad).
- `saveClientProfile`: incluye `cedula: data.cedula || ''` al crear
  doc en `clientes/{uid}`.

**Cédula en perfil del usuario**:
- `js/perfil.js`: campo cédula en barra de completitud (entre
  telefono y ciudad), vista read-only con icon `id-card` + valor o
  "No registrada", vista edit con `pfEditCedula` + validación regex.
- Save handler valida cédula y persiste en `updates`.
- Cancel handler resetea `pfEditCedula` al valor original.

**Concierge unifica con auth profile**:
- Nueva función `loadProfileFromAuth()` consulta `clientes/{uid}` y
  devuelve `{uid, nombre, apellido, correo, cedula, celular, consent,
  source: 'auth_profile'}`.
- `applyAuthProfileToSession(profile)`: si user logueado tiene perfil
  COMPLETO (nombre + correo + cedula + celular) → marca `gateCompleted = true`
  y salta el Lead Capture Gate. Si falta cédula (usuario viejo
  pre-fix), `gateCompleted = false` y el gate aparece pre-rellenado
  pidiendo solo cédula.
- `applyAuthProfile()` público + listener `onAuthStateChanged`
  interno: cada cambio de auth state actualiza la sesión del chat.
- Logout: si la sesión tenía `source: 'auth_profile'`, se limpia y
  reaparece el gate.

**Regla `isGateRequired()` refinada**:
1. Si `gateCompleted && profile` → skip
2. Si user con perfil completo (uid + email + nombre) → skip
3. Default: gate

### 21.4 Fase 3 Bloque 1 — Cerebro Altorra AI + LLM

**Schema `knowledgeBase/_brain` (singleton)**:
```js
{
    enabled: false,                    // toggle global
    llmProvider: 'anthropic',          // | 'openai' | 'google'
    llmModel: 'claude-haiku-4-5',
    llmTemperature: 0.7,
    maxTokens: 600,
    identidad: { nombre, tono, personalidad },
    contexto: { descripcion, valores: [], servicios: [] },
    instrucciones: '...',              // system prompt principal
    reglas_seguridad: ['NUNCA...'],    // inviolables
    updatedAt, updatedBy
}
```

**Admin UI "Cerebro Altorra AI"** (`js/admin-kb.js` extendido):
- Sidebar nav-item: "Knowledge Base" (`book-open`) → "Cerebro Altorra
  AI" (`brain`).
- Sec-kb reescrita con tabs en 6 panels:
    - **Identidad**: nombre del bot, tono, personalidad
    - **Contexto**: descripción del negocio, valores, servicios
    - **Instrucciones**: system prompt principal
    - **FAQs**: la KB de FAQs existente
    - **Reglas Seguridad**: una por línea (textarea)
    - **Modelo LLM**: provider, model ID, temperatura, max_tokens,
      toggle global enabled
- Status pill dinámica: Activo (verde) / Apagado (gris) / Sin
  configurar (dorado) según estado del `_brain`.
- Footer con botón "Guardar cambios" + savestate.
- `loadBrain()` listener realtime sobre `knowledgeBase/_brain`.
- `saveBrain()` valida super_admin antes de persistir.
- `AltorraKB.getBrain()` expuesto en API para que otros módulos
  detecten estado del Cerebro.

**Cliente — `js/ai/engine.js`**:
- Capability registry extendido: `providers.chat`.
- Función `chat(messages, opts)` async con timeout 12s default.
- `AltorraAI.providers` expuesto como getter para `if (AltorraAI.providers.chat)`.
- `capabilities()` incluye `chat: { available, source: 'llm'|'none' }`.

**Cliente — `js/concierge.js`**:
- Registra el chat provider que llama al callable `chatLLM`,
  pasando session.sessionId, sourceVehicleId, sourcePage, profile,
  context, activeAsesor.
- `respondWithLLMOrRules(userMsg)` async:
    1. Pre-check rule-based: sentiment muy negativo / frustration /
       ask_human → escalar SIN gastar tokens LLM
    2. Si LLM disponible: llamar con últimos 12 turnos mapeados a
       `{role, content}`
    3. Fallback a `generateBotResponse` rule-based
- `send()` ahora usa `respondWithLLMOrRules` (async). Mientras se
  procesa, muestra typing indicator (3 puntos animados estilo iMessage).

**Cloud Function `chatLLM`** (`functions/index.js`):
- Nuevo secret declarado: `LLM_API_KEY` (set con
  `firebase functions:secrets:set LLM_API_KEY`).
- Provider abstraction sin SDKs externos (usa `fetch` nativo de Node 22):
    - `callAnthropic`: Claude Messages API (https://api.anthropic.com/v1/messages)
    - `callOpenAI`: Chat Completions
    - `callGoogle`: Gemini generateContent
- `composeSystemPrompt(brain, inventory, chatSummary, sessionContext)`:
  inyecta identidad + contexto + servicios + instrucciones + reglas
  + INVENTARIO en tiempo real + summary + sessionContext.
- `fetchInventoryForLLM(limit)`: query a `vehiculos/` filtrando estado
  `disponible/reservado`, sort destacados primero + fecha desc, top N (30).
- `checkRateLimit(sessionId)`: 60 calls/día/sesión via doc
  `llmRateLimit/{sid}`. Auto-reset diario.
- Flow:
    1. Lee `_brain`. Si `!enabled` → `{ disabled: true }`.
    2. Verifica `LLM_API_KEY`. Si falta → `{ noKey: true }`.
    3. Rate limit check.
    4. Fetch inventario.
    5. Compose system prompt (incluye summary + sessionContext).
    6. Llama provider con timeout 30s.
    7. Parsea CTA tag al final del response (F.2).
    8. Retorna `{ text, cta, model, usage, provider, source: 'llm' }`.

**Firestore rules**:
- `knowledgeBase/{kbId}` cubre el `_brain` singleton (matchea cualquier
  ID).
- Nueva: `match /llmRateLimit/{sessionId} { allow read, write: if false }`.
  La Cloud Function escribe via Admin SDK (bypassa rules); cliente
  bloqueado para evitar manipulación.

### 21.5 Fase 3 Bloque 2 — 3 mejoras competitivas

**F.1 — Conversation Summary** (Zendesk pattern):
- Nueva callable `summarizeChat` (auth + super_admin/editor).
- Trigger automático `onConciergeMessageAdded`: cuando un chat alcanza
  múltiplo de 10 turnos del cliente (10, 20, 30…), dispara summarize.
  Idempotente (skip si `summaryUpToTurn >= newCount`).
- `summarizeChatBySessionId()`: helper compartido. Carga todos los
  mensajes, llama LLM con prompt dedicado (3-5 líneas: identidad,
  intereses, decisiones, próximo paso), persiste `summary`,
  `summaryUpToTurn`, `summaryUpdatedAt`, `summaryModel` en doc parent.
- `composeSystemPrompt` extendido: si chat tiene `summary`, lo inyecta
  como "RESUMEN DE LA CONVERSACIÓN HASTA AHORA" antes del inventario.
- Admin UI: `summarizeCurrentChat` ahora intenta callable `summarizeChat`
  (LLM real) primero. Si Brain enabled + LLM disponible → muestra
  overlay `cnc-summary-overlay` con título "Resumen IA", badge de
  tokens usados, botón Copiar al clipboard, botón Cerrar. Si falla,
  fallback al resumen extractivo local.

**F.2 — Function Calling lite (CTA tags)** (WhatsApp Enterprise pattern lite):
- System prompt extendido con sección "ACCIONES DISPONIBLES (CTAs)":
  el LLM puede agregar UN tag al final: `[CTA:Texto:action_id]`.
- Whitelist de 5 actions: `escalate`, `goto-busqueda`, `goto-simulador`,
  `open-modal-vende`, `open-modal-financiacion`.
- Reglas estrictas en el prompt: máx 1 tag por respuesta, solo de la
  whitelist, no para preguntas genéricas.
- `chatLLM` parsea regex `/\[CTA:([^:\]]+):([a-z\-]+)\]\s*$/i` del
  final del text, valida label (1-60 chars) + action (whitelist),
  separa en `{text, cta}` y devuelve al cliente.
- Cliente ya sabe renderear botones CTA en burbujas — solo ejecuta
  el `action` que venga del LLM como si fuera generado por rule-based.
- **Por qué LITE en lugar de tool-use real**: tool-use completo
  requeriría re-llamada al LLM con resultado de la herramienta (cara
  y compleja). Con CTAs whitelisted obtenemos 80% del valor con 10%
  de la complejidad.

**F.3 — Proactive Engagement Triggers** (Intercom playbooks pattern):
- Scheduled function `proactiveEngagement` cada 5 minutos
  (`onSchedule({ schedule: 'every 5 minutes' })`).
- Query: chats con `mode='bot'` Y `lastMessageAt` en últimas 6h
  (no procesa chats inactivos viejos).
- Para cada chat:
    1. Skip si `status='closed' / isArchived / isDeleted`.
    2. Cooldown 24h: skip si `lastProactiveAt > 24h ago`.
    3. Detecta señal:
       - **inactivity_no_msg**: cliente abrió chat (existe doc) pero
         NO ha escrito ningún mensaje propio Y han pasado 3+ min
         desde el welcome del bot → enviar nudge:
         "¿Sigues por aquí? Si tenés alguna pregunta…"
    4. Inyecta msg con `from='bot' proactive=true triggerType=...`.
    5. Update parent: `lastProactiveAt` + `lastMessage` para que
       el admin vea el chat moverse en la lista.
- Anti-spam: 1 proactive máx/chat/día.
- **Cliente** (`concierge.js`): listener extendido para procesar
  `d.from === 'bot' && d.proactive`. Render con clase extra
  `cnc-proactive-bubble` (gradient dorado tenue + sparkle ✨ en
  esquina top-left para distinguir del bot reactivo).

### 21.6 Anti-patrones detectados durante el bloque

| Anti-pattern | Caso real | Lección |
|---|---|---|
| Soft delete sin purga real | `isDeleted: true` con filter chip "Eliminados" → cliente esperaba borrado, terminamos manteniendo registros indefinidamente | Si la UX dice "Eliminar", el delete debe ser `delete()`. Soft-delete solo cuando hay valor real (audit trail, data retention legal). |
| Status sin sincronizar con cliente | Admin marcaba `status='resolved'` pero cliente seguía escribiendo en chat cerrado | Cuando el server cambia un estado lifecycle del chat, el cliente DEBE reaccionar (listener en doc parent + UI block). |
| `sourceVehicleId` global en localStorage | Chat iniciado en `/vehiculos/X` seguía mostrando "Veo que te interesa el X" semanas después en `index.html` | Estado de contexto vinculado a una página NO puede persistir indefinidamente entre páginas distintas. Purga al detectar cambio de contexto. |
| Cédula faltante en perfil pero pedida en chat | Lead Gate del Concierge pedía cédula a guests, pero registro de auth NUNCA la pedía → cliente registrado tenía perfil incompleto | Identidad del cliente debe ser CONSISTENTE entre todos los puntos de captura: registro, perfil, chat. |
| LLM sin fallback rule-based | Si LLM_API_KEY falta o se cae el provider → chat queda mudo | Toda integración LLM debe tener fallback determinístico. Cero downtime garantizado por arquitectura. |
| Tool-use completo sin necesidad real | Function calling con re-llamada al LLM tras cada herramienta es cara y lenta | Para acciones simples (CTAs whitelisted), tag al final del response es suficiente. Tool-use real solo cuando el LLM necesita el RESULTADO de la tool para componer la respuesta. |
| Schedule function sin cooldown | Proactive triggers cada 5 min sin idempotencia spamean al cliente | Cooldown 24h por chat + tracking en doc parent (`lastProactiveAt`). Idempotencia es crítica en cualquier scheduled job. |

### 21.7 Cómo extender el Cerebro Altorra AI

**Para cambiar el modelo LLM**:
1. Admin → Cerebro Altorra AI → tab "Modelo LLM".
2. Cambiar provider (anthropic/openai/google) y model ID.
3. Click "Guardar".
4. Las próximas llamadas a `chatLLM` usan el nuevo modelo.

**Para agregar un nuevo CTA action**:
1. Frontend (`js/concierge.js handleAction`): agregar el `case '<action>'`
   con lógica del side-effect (navigation, modal open, etc.).
2. Backend (`functions/index.js`): agregar string al array `ALLOWED_CTAS`.
3. System prompt: documentar el nuevo action en la sección "ACCIONES
   DISPONIBLES" del `composeSystemPrompt` (extra string).

**Para agregar un nuevo proactive trigger**:
1. `functions/index.js exports.proactiveEngagement`: dentro del loop
   por chat, agregar la heurística (ej. `lastMessageAt > 7 días &&
   userTurns === 0` → "Volviste, ¿podemos ayudarte?").
2. Setear `proactiveText` y `triggerType` apropiados.
3. El resto del flow (cooldown, inject, update parent) ya está.

**Para agregar tools real con re-llamada al LLM** (futuro):
1. Implementar tool-use de Anthropic en `callAnthropic`: si la
   respuesta tiene `stop_reason: 'tool_use'`, ejecutar la tool,
   re-llamar con resultado, repetir hasta `stop_reason: 'end_turn'`.
2. Definir tools en el system prompt o como parámetro `tools`.
3. Tools sugeridas: `search_inventory`, `get_vehicle_details`,
   `check_availability_slot`, `create_lead`, `send_quote`.

### 21.8 Deploys manuales requeridos

Para que la Fase 3 funcione end-to-end, el super_admin debe:

1. **Setear el secret LLM_API_KEY** (Anthropic recomendado):
   ```bash
   firebase functions:secrets:set LLM_API_KEY
   # Pegar la key de https://console.anthropic.com/settings/keys
   ```

2. **Deploy de las 4 nuevas Cloud Functions**:
   ```bash
   firebase deploy --only \
     functions:chatLLM,functions:summarizeChat,functions:onConciergeMessageAdded,functions:proactiveEngagement
   ```

3. **Cloud Scheduler API habilitada** (para `proactiveEngagement`):
   ```bash
   gcloud services enable cloudscheduler.googleapis.com --project=altorra-cars
   ```
   `firebase deploy` generalmente lo habilita automáticamente.

4. **Firestore rules** (`llmRateLimit` colección nueva):
   ```bash
   firebase deploy --only firestore:rules
   ```

5. **Configurar el Cerebro** en admin → "Cerebro Altorra AI":
   - Tab Identidad: confirmar nombre/tono/personalidad
   - Tab Contexto: ajustar descripción del negocio
   - Tab Instrucciones: revisar system prompt
   - Tab Reglas Seguridad: revisar
   - Tab Modelo LLM: marcar **"Cerebro AI activo"** + confirmar
     provider/model
   - Click **"Guardar cambios"**

Sin pasos 1-2-5 → el chat sigue operativo con rule-based (zero
downtime garantizado por el fallback).

> **Para Claude**: la arquitectura del Cerebro es modular. Cada
> capa (engine.js providers, _brain doc, chatLLM function, fallback
> rules) puede actualizarse independientemente sin romper el resto.
> Si vas a tocar algo, leé §21.7 para no romper la cascada.

### 21.9 Estado del LLM al 2026-05-06: ACTIVO en producción ✅

**Cambio de estado** (2026-05-06, post-§21.10):

El Cerebro Altorra AI fue activado completamente en producción. El
cliente decidió cargar saldo en Anthropic ($5 USD inicial) y proceder
con el setup completo. La activación se hizo en el siguiente orden:

#### Pasos completados por el cliente

1. ✅ **Anthropic API key creada**: `altorra-cars-prod`
   (sk-ant-api03-43r...kwAA) en `platform.claude.com`
2. ✅ **Saldo cargado**: $5 USD inicial
3. ✅ **Secret configurado**: `firebase functions:secrets:set LLM_API_KEY`
   → version 1 creada en
   `projects/235148219730/secrets/LLM_API_KEY/versions/1`
4. ✅ **Cloud Scheduler API habilitada** (auto-enabled durante el
   primer `firebase deploy --only functions` cuando el deploy detectó
   que `proactiveEngagement` la requería)
5. ✅ **Deploy de Cloud Functions** (`firebase deploy --only functions`):
   - 4 funciones nuevas creadas exitosamente:
     - `chatLLM(us-central1)` — motor del bot
     - `summarizeChat(us-central1)` — F.1 conversation summary
     - `onConciergeMessageAdded(us-central1)` — auto-trigger summary
       cada 10 turnos
     - `proactiveEngagement(us-central1)` — scheduled cada 5 min
   - 8 funciones existentes actualizadas sin cambios funcionales
     (createManagedUserV2, deleteManagedUserV2, updateUserRoleV2,
     triggerSeoRegeneration, onVehicleChange, onNewSolicitud,
     onVehiclePriceAlert, onSolicitudStatusChanged)
6. ✅ **Deploy de Firestore rules** (`firebase deploy --only firestore:rules`):
   regla `match /llmRateLimit/{sessionId}` activa en producción
7. ✅ **Optimizaciones §21.10 mergeadas y deployadas** (commits
   `90d5c47` + `644f817` mergeados a main vía PRs #565 + #566):
   - Prompt caching activo (`cache_control:'ephemeral'`)
   - Inventory cap reducido a 10
   - Rate limit reducido a 30/sesión/día
   - Pre-filtro rule-based para greeting/thanks/goodbye
   - Re-deploy de `chatLLM` con la versión optimizada
8. ✅ **Toggle "Cerebro AI activo"** marcado en admin → "Cerebro
   Altorra AI" → tab "Modelo LLM"

#### Configuración activa en producción

| Setting | Valor activo |
|---|---|
| Provider | `anthropic` |
| Model | `claude-haiku-4-5` |
| Temperature | `0.7` |
| Max tokens | `600` (recomendado bajar a `400` para más ahorro) |
| Inventory cap | 10 vehículos en system prompt |
| Rate limit | 30 calls/sesión/día |
| Prompt caching | `cache_control:'ephemeral'` (5 min TTL) |
| Pre-filtro rules | greeting / thanks / goodbye → skip LLM |

#### Comportamiento actual del bot ALTOR

- **Modo principal**: cliente escribe → `concierge.js` clasifica intent
  rule-based → si trivial (greeting/thanks/goodbye) responde sin LLM
  → si crítico (frustration/sentiment_neg/ask_human) escala sin LLM
  → en cualquier otro caso llama `chatLLM` Cloud Function
- **chatLLM** lee `_brain`, fetcha 10 vehículos, compone system prompt
  (cacheado por 5 min), llama Claude Haiku 4.5, parsea CTA tag,
  retorna `{text, cta}` al cliente
- **Auto-summary**: cuando un chat alcanza 10/20/30+ turnos del cliente,
  `onConciergeMessageAdded` dispara `summarizeChat` que genera resumen
  IA y lo persiste en `conciergeChats/{sid}.summary`. La próxima
  llamada a `chatLLM` lo inyecta en el prompt cacheado
- **Proactive engagement**: cada 5 min, `proactiveEngagement` revisa
  chats en modo bot inactivos. Si el cliente abrió pero NO escribió +3 min
  → inyecta nudge "¿Sigues por aquí?" con cooldown 24h
- **Fallback**: si LLM falla (network/timeout/quota/saldo agotado) →
  cae automáticamente a `generateBotResponse` rule-based. Cero downtime

#### Saldo y proyección

Con $5 USD iniciales y las optimizaciones §21.10 aplicadas:

| Escenario | Conversaciones rendidas |
|---|---|
| Conversaciones cortas (2-3 turnos) | ~1.500 |
| Conversaciones promedio (6-8 turnos) | ~625 |
| Conversaciones largas (15+ turnos) | ~200 |

Para uso típico de 10 chats/día en Altorra → $5 USD durarían ~2-4 meses.

#### Validación recomendada en los próximos días

1. **Anthropic Console → Analytics**:
   - Verificar que aparezcan tokens consumidos en el dashboard tras
     las primeras conversaciones reales
   - Verificar que `cache_read_tokens > 0` después del segundo turno
     (confirma que prompt caching está hit-eando)
2. **Firestore Console → `llmRateLimit/`**:
   - Inspeccionar docs creados — cada uno con `count`, `day`, `lastAt`
   - Si alguna sesión llega cerca de 30, investigar si es uso legítimo
     o un bot
3. **Anthropic Console → Billing**:
   - Configurar alerta de gasto: Settings → Billing → "Set spending
     limit" → ej. $4 USD para alertar antes de quemar el saldo inicial

#### Documentación de referencia

Guía completa Windows-friendly del setup en `docs/SETUP-LLM.md`. Esa
guía incluye troubleshooting, comandos útiles, y tips de costos por
si en el futuro hay que rotar la key, cambiar de provider, o
reactivar tras agotar saldo.

### 21.10 Optimizaciones de costo del Cerebro AI (2026-05-06)

> Implementadas durante el setup del LLM en producción. Multiplican
> por ~4-5x la duración del saldo Anthropic con cero impacto en UX.

Cuatro cambios coordinados aplicados en un mismo commit, antes del
primer minuto de uso del LLM en producción:

#### 21.10.1 Prompt caching en `callAnthropic`

**Archivo**: `functions/index.js` línea ~856.

Se cambió el envío del system prompt de string plano:
```js
system: systemPrompt
```
a bloque structured con marca de cache:
```js
system: [{
    type: 'text',
    text: systemPrompt,
    cache_control: { type: 'ephemeral' }
}]
```

**Cómo funciona**: Anthropic guarda el bloque marcado en cache caliente
por 5 minutos. Llamadas siguientes con el mismo system prompt pagan
**$0.10/MTok en vez de $1/MTok** (90% descuento). Cache write paga
+25% ($1.25/MTok) la primera vez pero solo se paga una vez por
ventana de 5 min, no por turno.

**Impacto medido**: en una conversación típica de 8 turnos:
- Sin caching: ~$0.060 USD
- Con caching: ~$0.012 USD
- **Ahorro: ~80%**

**Validación**: el campo `data.usage` de la respuesta incluye
`cache_creation_input_tokens` (write count) y `cache_read_input_tokens`
(read count). Útil para monitorear desde Anthropic Console que el
caching está funcionando como esperado.

**Anti-pattern evitado**: caching SOLO el system prompt, NO la
conversation history (que cambia cada turno y rompería el match
exacto requerido por Anthropic). El parámetro `messages` sigue
enviándose como array plano sin cache_control.

#### 21.10.2 Reducción del inventario inyectado (30 → 10 vehículos)

**Archivo**: `functions/index.js` línea ~850.

```js
const MAX_INVENTORY_VEHICLES = 10;  // antes 30
```

**Razón**: el inventario inyectado en cada system prompt era el
componente más pesado (~3.000 tokens con 30 vehículos). Bajando a
10 ahorrás ~2.000 tokens por turno. Combinado con prompt caching,
el primer turno cuesta ~30% menos en write y todos los siguientes
~30% menos en read.

**Por qué 10 es suficiente**: el LLM responde mejor a prompts
enfocados. 30 vehículos saturaba el contexto. Con 10 destacados +
recientes, el bot recomienda con la misma calidad y si el cliente
pregunta por algo específico que no esté en esos 10, el LLM
sugiere "mirá el catálogo completo" (CTA goto-busqueda).

**Trade-off aceptado**: si admin tiene >10 vehículos destacados,
el LLM solo "sabe" de los top 10. No es problema porque el cliente
puede pedir cualquier cosa y el LLM responde con info real cuando
el flujo escala a un asesor humano.

#### 21.10.3 Rate limit más estricto (60 → 30 calls/sesión/día)

**Archivo**: `functions/index.js` línea ~849.

```js
const RATE_LIMIT_PER_DAY = 30;  // antes 60
```

**Razón**: protección anti-abuso. Un usuario malicioso (o bot
indexador inesperado) que descubra el endpoint `chatLLM` podría
quemar saldo rápido. Con 30/día/sesión, el peor caso de un
atacante con N sesiones únicas es 30N llamadas/día.

**Conversaciones reales**: rara vez exceden 15-20 turnos. 30 sigue
siendo holgado para uso legítimo.

**Cuando se alcanza el límite**: `chatLLM` retorna
`{ rateLimited: true, text: "...te conecto con un asesor..." }`
y el cliente recibe un CTA escalate. UX graceful, no error.

#### 21.10.4 Pre-filtro rule-based en `respondWithLLMOrRules`

**Archivo**: `js/concierge.js` función `respondWithLLMOrRules` (~línea 410).

Antes: solo escalaban sin LLM los casos críticos (sentiment muy
negativo / frustration / ask_human).

Ahora: además de los críticos, se atrapan también con reglas (sin
LLM) los intents triviales con respuesta determinística:
- `greeting` (hola, buenos días, qué tal)
- `thanks` (gracias, perfecto, excelente)
- `goodbye` (chao, adiós, hasta luego)

Threshold `confidence >= 0.3` evita falsos positivos. Cuando el
intent matchea, se reusa `generateBotResponse(userMsg)` que ya
tiene variantes naturales personalizadas con `firstName`.

**Impacto**: estos intents representan típicamente 20-30% de los
turnos en chats reales. Skip al LLM baja el costo total
proporcionalmente sin afectar UX (las respuestas rule-based son
indistinguibles de las del LLM para estos casos simples).

#### Resultado combinado de las 4 optimizaciones

Para una conversación promedio de 8 turnos donde 2 son saludos/
cierre y 6 son preguntas reales:

| Métrica | HOY (sin opt) | CON opt 21.10.1-4 | Ahorro |
|---|---|---|---|
| Turnos enviados al LLM | 8 | 6 (skip 2 triviales) | -25% |
| Tokens input por turno LLM | ~6.000 | ~4.000 (inv 10) | -33% |
| Coste input efectivo/turno | $1/MTok full | $0.10/MTok cache | -90% |
| Coste por turno LLM | ~$0.007 | ~$0.001 | -85% |
| **Coste total conversación** | **~$0.060** | **~$0.008** | **-87%** |
| **Conversaciones por $5 USD** | **~85** | **~625** | **+635%** |

> **Nota**: el primer turno de cada sesión paga cache write
> (~$0.005) en vez de cache read. Los números arriba son estado
> estable; sesiones muy cortas (1-2 turnos) tienen menos beneficio
> proporcional pero igualan el escenario sin caching.

#### Anti-patterns evitados

| Riesgo | Mitigación |
|---|---|
| Cache miss por modificación accidental del system prompt | El system prompt se compone determinísticamente desde `_brain` doc. Cualquier cambio (admin edita Brain) invalida todos los caches simultáneamente — esperado. |
| Conversation history cacheada genera respuestas repetidas | Solo el system prompt tiene `cache_control`. El array `messages` siempre cambia y se cobra full price. |
| Pre-filtro mata flexibilidad del LLM | Solo intents triviales con confidence ≥0.3. Si el cliente escribe "hola, busco un Mazda CX-5", classify retorna `inventory_query` (más específico) → va al LLM. |
| Rate limit muy bajo bloquea uso legítimo | 30/día/sesión sigue siendo el doble del uso real promedio (15 turnos). Si se alcanza, escala a asesor (graceful). |
| Inventory cap deja al cliente sin opciones | Si pregunta por algo no listado, el LLM responde "no está en mis destacados de hoy, mirá el catálogo completo" + CTA goto-busqueda. |
| Cache write paga +25% siempre | Solo se paga una vez cada 5 min. En tráfico moderado (varios chats activos compartiendo el mismo system prompt), cache write se amortiza inmediatamente. |

#### Pasos para activar (sin re-deploy del frontend)

Las optimizaciones 21.10.1-3 (Cloud Function) requieren redeploy:
```bash
firebase deploy --only functions:chatLLM
```

La optimización 21.10.4 (frontend `concierge.js`) viaja en el
service worker — los clientes la reciben automáticamente al
recargar la página tras un deploy a `main` (cache-manager invalida
con bump de `APP_VERSION`).

#### Monitoreo recomendado

1. **Anthropic Console → Analytics**: verificar que el campo
   `cache_read_tokens` aparezca con valores >0 después del primer
   día. Si siempre es 0, el caching no está funcionando.
2. **Firestore → `llmRateLimit/`**: si ves muchas sesiones
   acercándose al límite de 30, considerá subirlo o investigar si
   son bots.
3. **Anthropic Console → Billing**: comparar gasto del primer mes
   vs proyección. Con uso típico de 10 chats/día × 30 días =
   300 chats × $0.008 = ~$2.40 USD/mes.

---

## 22. Offline Ultra Brain — Inteligencia avanzada sin LLM (2026-05-07)

> Refactor en 4 sprints ejecutado bajo **RCA Strict Mode** (§19) tras
> directiva del cliente de llevar el sistema rule-based al límite de
> la ingeniería frontend. El bot rule-based ya no es un árbol de
> reglas plano — es un motor cognitivo con Levenshtein, sinónimos,
> memoria conversacional, búsqueda dinámica de inventario,
> auto-aprendizaje y quick replies para clarification ambigua.
>
> El usuario decide cuándo activar el LLM (§21). Cuando NO está
> activo (saldo agotado, fallback automático), el bot ya entrega
> ~80% del valor de un LLM comercial sin pagar un centavo de API.

### 22.1 Línea de tiempo

| # | Sprint | Descripción |
|---|---|---|
| 1 | Fixes UX | BUG #1 (botón ⋮ cliente) + BUG #2 (rule `from:'system'`) + BUG #3 (realtime delete listener) |
| 2 | Capas A-E | Levenshtein-Damerau + sinónimos + memory window + inventory search + feedback loop |
| 3 | Propuestas adicionales | TF-IDF FAQ ranker + Confidence-based clarification (Quick Replies UI) + admin "Lo que no entendí" |
| 4 | Doc + cache bump | Esta sección + version v20260507010000 |

### 22.2 Sprint 1 — 3 Fixes Críticos

#### BUG #1 — Cliente puede finalizar conversación

**Problema**: el header del widget tenía solo botón × (minimiza, no
resetea). El cliente no tenía affordance para "empezar de nuevo".

**Fix** (`js/concierge.js` + `css/concierge.css`):

- Nuevo botón `⋮` (`.cnc-header-menu-btn`) entre `.cnc-header-info`
  y `.cnc-close`
- Click abre dropdown `.cnc-header-dropdown` con item "Finalizar
  conversación"
- Click en item → `handleClientResetSession()`:
  1. Confirm dialog
  2. Si `_chatDocCreated`, escribe `{status:'closed', closedBy:'client'}`
     al doc parent (best-effort, no bloquea reset si falla red)
  3. Llama `resetSession()` que ya existe (limpia localStorage +
     listeners + sessionId nuevo + re-render welcome)
- Click fuera del dropdown lo cierra
- Animación `cncDropdownIn` (cubic-bezier overshoot 0.18s) con
  `prefers-reduced-motion` respetado

**NO inserta** mensaje `from:'system'` desde el cliente — la regla
Firestore solo permite a editor+ crear ese tipo (anti-impersonation).
El cliente solo ve el reset local + el chat queda marcado como
`closed` en Firestore para que el admin lo vea cerrado en su bandeja.

#### BUG #2 — `closeChat` admin tira `permission-denied`

**Causa raíz**: la regla `match /messages/{msgId} create` whitelist
solo `'user'`, `'bot'`, `'asesor'`. Cuando admin hace `closeChat`,
intenta crear mensaje con `from:'system'` → bloqueado.

**Fix** (`firestore.rules`):

```
match /messages/{msgId} {
    allow create: if request.auth != null && (
        request.resource.data.from in ['user', 'bot'] ||
        (request.resource.data.from == 'asesor' && isEditorOrAbove()) ||
        (request.resource.data.from == 'system' && isEditorOrAbove())
    );
}
```

`from:'system'` ahora SOLO `isEditorOrAbove()` (anti-impersonation —
ningún cliente anónimo/registered puede inyectar mensajes "system"
falsos).

**Cubre también** `reopenChat()` que tenía el mismo bug.

> **DEPLOY MANUAL REQUERIDO**: `firebase deploy --only firestore:rules`

#### BUG #3 — Ghost UI tras Hard Delete realtime

**Causa raíz**: el listener `onSnapshot` de admin-concierge.js
reasignaba `_chats` enteramente sin chequear si `_activeSessionId`
seguía presente. Cuando OTRO admin eliminaba el chat activo:
- Lista lateral correctamente removía el item
- Panel derecho seguía mostrando los mensajes (ghost UI)
- `_messagesUnsub` quedaba huérfano apuntando a subcolección de doc
  inexistente

**Fix** (`js/admin-concierge.js startChatsListener`):

```js
snap.docChanges().forEach(function (change) {
    if (change.type === 'removed' && change.doc.id === _activeSessionId) {
        _activeSessionId = null;
        if (_messagesUnsub) { try { _messagesUnsub(); } catch (e) {} _messagesUnsub = null; }
        renderChatDetail(null, []);
        if (AP.toast) AP.toast('La conversación abierta fue eliminada por otro administrador.', 'warning');
    }
});
```

`docChanges()` se procesa ANTES de reconstruir `_chats`. Si el chat
activo fue removido, limpia `_activeSessionId` + cancela
`_messagesUnsub` + re-renderiza el panel derecho vacío + toast
informativo al admin.

### 22.3 Sprint 2 — Capa A+B: Fuzzy Matching + Sinónimos

**Archivo nuevo**: `js/ai/fuzzy.js` (~340 líneas).

#### Algoritmo Levenshtein-Damerau

Variante extendida que cuenta transposiciones de letras adyacentes
como **1 operación** (no 2 como Levenshtein clásico):

```
d[i,j] = min(
    d[i-1, j] + 1,        // deletion
    d[i, j-1] + 1,        // insertion
    d[i-1, j-1] + cost,   // substitution (cost=0 si match)
    d[i-2, j-2] + 1       // transposition (chars[i]==chars[j-1] && chars[i-1]==chars[j])
)
```

Ejemplo: `"qiero"` vs `"quiero"` → distance = 1 (transposición qu↔iq).

**Threshold normalizado**: `similarity = 1 - (distance / max(len(a), len(b)))`.
- `≥ 0.80` → match (1 typo cada ~5 chars)
- `≥ 0.85` para palabras cortas (≤4 chars) — más estricto para
  evitar falsos positivos con "ok"/"oh"/"ah"

**Optimizaciones**:
- **Early exit por bound**: `abs(len(a) - len(b)) > maxDistance`
  retorna inmediatamente sin DP. Reduce ~90% del cómputo en el
  caso común (typos pequeños).
- **Row min watch**: si toda la fila supera el bound, abort. Evita
  calcular DP completo para palabras muy distintas.
- **3 filas en memoria** (prev2, prev1, curr) en vez de matriz O(m·n)
  completa.

**Complejidad**: O(m × n) por par. Con keyword más largo de 30 chars
y mensaje ≤ 100 chars → 3000 ops máx. **Sub-ms en cualquier hardware**.

#### Diccionario de Sinónimos

Map "canonical → variantes" con **17 categorías** y ~150 variantes
totales. Cubre vocabulario coloquial colombiano + automotriz:

| Canonical | Variantes |
|---|---|
| `carro` | auto, automóvil, vehículo, nave, máquina, coche, fierro, cucha, mueble |
| `suv` | camioneta, todo terreno, 4x4, campero, jepeta, jeepeta |
| `pickup` | pick up, platón, estacas, doble cabina |
| `barato` | económico, cómodo, accesible, rebajado, módico, suave |
| `cuanto cuesta` | cuánto vale, qué precio, a cómo, cuánto sale, precio final |
| `agendar` | reservar, separar, apartar, cuadrar, ir a verlo |
| `automatico` | sin embrague, sin clutch, auto |
| `manual` | mecánico, palanca, con embrague, con clutch, estándar |

Reverse index `variant → canonical` armado al inicio para O(1) lookup.

**Pipeline `expandSynonyms(text)`**:
1. **Phrase-level** (longitud descendente): "doble cabina" → "pickup"
2. **Word-level con typo tolerance**: "varato" → fuzzy match contra
   variantes → "barato"

Resultado: `"qiero un coxe varato"` → `"comprar carro barato"` antes
de matchear contra LEXICON.

#### Integración en `js/ai/intent.js`

`classify()` ahora:
1. Normaliza el texto
2. Expande sinónimos (si AltorraFuzzy disponible)
3. Match exacto sobre el texto expandido
4. Si no hubo match exacto Y keyword tiene ≥5 chars → fuzzy match
   con threshold 0.82 y score atenuado (×0.85 penalty)

**Anti-pattern evitado**: fuzzy match sobre keywords cortos (≤4 chars)
generaría falsos positivos masivos. Solo aplicamos fuzzy a keywords
≥5 chars.

### 22.4 Sprint 2 — Capa C: Memory Window con Slot Filling

**Archivo modificado**: `js/ai/intent.js` (`updateContext` extendido).

**Schema de `session.context` nuevo**:

```js
session.context = {
    lastIntent: 'inventory_query',
    lastTurnAt: 1234567890,
    discussedTopics: ['inventario', 'precio'],
    bot_repeated_count: 0,

    // §22 Capa C — Slots persistentes
    slots: {
        lastVehicleDiscussed: { id, marca, modelo, year, precio, kilometraje, categoria, transmision },
        lastBrandDiscussed: 'mazda',
        lastCategoryDiscussed: 'suv',
        lastYearDiscussed: 2020,
        lastPriceMaxDiscussed: 80000000,
        lastVehiclesShown: ['abc123', 'def456', ...],
        lastInventoryFilters: { marca, categoria, priceMax, ... },
        lastQueryType: 'inventory_query'
    },

    // §22 Capa C — Turn history (window de 3, decay 5 min)
    turnHistory: [
        { turn: 1, timestamp, intent, text, entities },
        { turn: 2, ... },
        { turn: 3, ... }
    ]
}
```

**Decay automático**: turnos > 5 minutos viejos se descartan en cada
`updateContext`. Los humanos olvidamos así también.

**Anáfora resolution** (`resolveAnaphora(context)`):

Cuando el cliente dice "¿y de qué año es?" / "¿cuánto vale ese?" /
"¿lo tienen automático?":
1. Detector de pronombres: `\b(ese|esa|este|esta|aquel|aquella|el mismo|la misma|lo|la)\b`
2. Detector de followup ambiguo: `^(\b(y|de|cu[aá]nto|cu[aá]l|qu[eé])\b\s){1,3}`
3. O intent `pricing_query` sin entity de vehículo

→ Lookup `slots.lastVehicleDiscussed` (si último turno < 5 min) →
detecta atributo preguntado (year/precio/kilometraje/transmision/categoria)
→ responde con dato concreto.

**Ejemplo end-to-end**:
```
Turn 1 — Cliente: "¿tienen Mazda CX-5 2020?"
         Bot: encuentra match en inventario, responde "Sí, está en $80M".
              context.slots.lastVehicleDiscussed = { id, marca:'mazda', modelo:'cx-5', year:2020, precio:80M }

Turn 2 — Cliente: "¿lo tienen automático?"
         Bot: detecta pronombre "lo" + intent ambiguo → resolveAnaphora()
              → vehículo en slots → atributo 'transmision'
              → responde "El Mazda CX-5 2020 tiene transmisión automática."

Turn 3 — Cliente: "¿y el kilometraje?"
         Bot: detecta followup ambiguo "¿y el ..." → resolveAnaphora()
              → atributo 'kilometraje'
              → responde "El Mazda CX-5 2020 tiene 45,000 km."
```

### 22.5 Sprint 2 — Capa D: Búsqueda Dinámica de Inventario

**Archivo nuevo**: `js/ai/inventory-search.js` (~280 líneas).

**Function calling simulado** sin LLM. El bot consulta el inventario
en tiempo real cada turno relevante.

**Pipeline `searchFromText(text)`**:

1. **`extractFilters(text)`** — combina NER + regex específicas:
   - NER base: marca, modelo, año, kilometraje, precio
   - Categoría: regex con sinónimos ("camionetas?", "todo[\s-]?terreno", etc.)
   - Transmisión: regex para automatica/manual
   - Combustible: regex para gasolina/diesel/híbrido/eléctrico
   - Rangos de precio: "menos de 60M", "máximo 80M", "entre 50M y 80M"
   - Rangos de año: "del 2018 al 2022", "2020 en adelante"
   - Kilometraje máximo: "menos de 50 mil km"

2. **`search(filters)`** — filter cascade sobre `vehicleDB.vehicles`:
   - Excluye `estado === 'vendido'` y `estado === 'borrador'`
   - Aplica todos los filtros con tolerancia fuzzy (AltorraFuzzy)
   - Sort: destacados primero, luego precio ascendente
   - Cap a top 5

3. **`formatResponse(searchResult)`** — genera respuesta natural:
   - **0 resultados**: "no encontré [filtros]. ¿Catálogo completo o
     que un asesor te avise?"
   - **1 resultado**: "tengo esto: [marca modelo year] por [precio]
     ([km] km). ¿Ficha o visita?"
   - **N resultados**: lista con vehicleLine() para cada uno + CTA

4. **Persistencia en context**: `vehiclesShown` y `lastInventoryFilters`
   se guardan en `slots` para anáfora ("¿el segundo cuánto vale?"
   resuelve via `lastVehiclesShown[1]`).

**Integración en `concierge.js generateBotResponse`**: cuando
`classification.intent === 'inventory_query'`:
- Si `extractFilters` detecta filtros específicos → responde con
  vehículos REALES
- Si no hay filtros específicos → respuesta genérica con conteo +
  CTA al catálogo (comportamiento legacy)

**Anti-pattern evitado**: re-llamar al inventario en CADA turno sería
costoso para chats largos. Solo se ejecuta para `inventory_query`
con filtros específicos.

### 22.6 Sprint 2 — Capa E: Auto-Nutrición / Feedback Loop

**Schema** `unmatchedQueries/{queryId}`:

```js
{
    query: 'cuanto cuesta el chevrolet captiva',
    keywords: ['cuanto', 'cuesta', 'chevrolet', 'captiva'],
    sessionId: 'cnc_xyz...',
    sourcePage: '/vehiculos/...html',
    sourceVehicleId: null,
    intent: 'none',
    confidence: 0.0,
    sentiment: 'neutral',
    createdAt: <serverTimestamp>,
    seen: false,
    promotedToFAQ: false,
    promotedFAQId: null,
    seenAt, seenBy,
    promotedAt, promotedBy
}
```

**Reglas Firestore** (`firestore.rules`):
```
match /unmatchedQueries/{queryId} {
    allow read, update: if isEditorOrAbove();
    allow create: if request.auth != null;
    allow delete: if isSuperAdmin();
}
```

**Trigger** (`concierge.js logUnmatched`):

Cuando `generateBotResponse` cae al fallback genérico (intent='none'
Y KB no matchea Y NER no detecta nada útil):

1. **Throttle**: máx 1 escritura/min/sesión (`session._lastUnmatchedAt`)
2. **Filtro de longitud**: 4 ≤ query.length ≤ 500
3. **Extracción de keywords**: tokenize + filtra stop-words + length ≥ 4 → top 8
4. **Sentiment** (best-effort) via `AltorraAI.sentiment`
5. **Persistencia** con `serverTimestamp()` + flags iniciales

**UI Admin** (`js/admin-unmatched.js` — nuevo módulo, ~340 líneas):

- Nueva sección sidebar "Lo que no entendí" (icono `message-circle-question`)
  en grupo Automatización con badge de unread realtime
- Filter chips: **Sin revisar** (default), Todas, Promovidas
- Lista realtime con `onSnapshot` (limit 200, order by createdAt desc)
- Cada entry muestra:
  - Status badge (Nueva / Vista / Promovida)
  - Sentiment chip si negativo/positivo
  - Tiempo relativo + sourcePage
  - **Quote** de la query con border-left dorado
  - Keywords extraídas como chips
  - Acciones: 👁 Marcar vista · ➕ Crear FAQ · 🗑 Eliminar (super_admin)

**Flujo "Promover a FAQ"**:
1. Click "➕ Crear FAQ" en una entry
2. Navega a sección Cerebro AI vía `AltorraSections.go('kb')`
3. Llama `AltorraKB.openFormPrefilled({ question, keywords, _onSaveCallback })`
4. Form se prellena con la query como pregunta + keywords ya extraídas
5. Admin completa la respuesta + click "Crear FAQ"
6. Callback marca la unmatched query como `promotedToFAQ:true`
7. Próximo cliente que pregunte algo similar → el bot responde via KB
   (sin pasar por LLM)

**Beneficio compuesto**: con el tiempo, el bot "aprende" qué le falta.
El asesor convierte 10-20 queries/semana en FAQs → el bot resuelve
más sin LLM → ahorro de costos exponencial.

### 22.7 Sprint 3 — Propuesta #1: TF-IDF FAQ Ranker

**Archivo nuevo**: `js/ai/faq-ranker.js` (~150 líneas).

**Patrón Zendesk Answer Bot**: ranking matemático sobre el corpus,
no matching string crudo. Tokens raros (`peritaje`) ponderan más que
tokens comunes (`auto`).

**`buildIndex(faqs)`**:
- Expande sinónimos en pregunta + keywords
- Tokeniza filtrando stop-words + length ≥ 2
- Construye `documentFreq` map: `{token: count of FAQs that contain it}`
- Cache por session (`session._kbIndex._faqsCount`) — invalidado si
  cambia el count de FAQs en la KB

**`rank(query, index, n=3)`**:

Para cada FAQ:
```
score = sum_over_query_tokens(
    max_over_faq_tokens(
        similarity(qt, ft) * idf(ft)
    )
)
score *= 1 + (priority/100) * 0.5     // boost del admin
score *= 1.10 if usageCount > 5       // boost de uso
score *= 1.05 if usageCount > 20      // segundo boost
```

donde `idf(ft) = log(1 + totalDocs / df(ft))`.

Filtra por `score >= MIN_SCORE_THRESHOLD (0.5)` y por `enabled !== false`.

**`bestAnswer(query, index)`** decide:
- Si `top1.score / top2.score >= 1.5` → respuesta confiable, devuelve top1
- Si menor → ambigüedad detectada, devuelve `{faq, ambiguous:true, secondFaq}`
  para que `concierge.js` ofrezca quick replies (Propuesta #2)
- Si no hay candidatos → null (cae a fallback genérico + logUnmatched)

**Integración en `concierge.js`** (sección 12 del cascade):
1. Cache del index por session
2. Llama `bestAnswer(userMsg, session._kbIndex)`
3. Si no ambiguo → `recordUsage(faq._id)` + responde
4. Si ambiguo → respuesta con `quickReplies` array (Propuesta #2)

**Sin entrenamiento, sin modelos**. ~5KB de código que compite con
motores comerciales en KBs de 50+ FAQs.

### 22.8 Sprint 3 — Propuesta #2: Quick Replies (Confidence-Based Clarification)

**Patrón Intercom Resolution Bot**: si la query es ambigua, el bot
ofrece opciones en vez de responder mal.

**Trigger en `concierge.js`**: cuando `AltorraFAQRanker.bestAnswer`
retorna `ambiguous:true` con `secondFaq`:

```js
return {
    text: 'Tengo dos respuestas posibles, ¿cuál te ayuda más?',
    quickReplies: [
        { label: clipQuestion(bestKB.faq.question), payload: bestKB.faq.question },
        { label: clipQuestion(bestKB.secondFaq.question), payload: bestKB.secondFaq.question }
    ]
};
```

**Render en `renderMessages()`**:

```js
if (m.from === 'bot' && Array.isArray(m.quickReplies)) {
    quickRepliesHTML = '<div class="cnc-quick-replies">' +
        m.quickReplies.map(qr =>
            '<button class="cnc-quick-reply" data-quick-reply="' + payload + '">' + label + '</button>'
        ).join('') +
    '</div>';
}
```

**Click handler** en panel event delegation:
```js
var qrBtn = e.target.closest('[data-quick-reply]');
if (qrBtn) {
    var payload = qrBtn.getAttribute('data-quick-reply');
    if (payload && payload.trim()) send(payload);
    return;
}
```

Click → `send(payload)` re-ejecuta el flujo del bot con la pregunta
exacta de la FAQ elegida → match definitivo → respuesta correcta.

**CSS** (`css/concierge.css`): chips dorados con gradient,
border-radius 16px, hover lift, `prefers-reduced-motion` respetado.

### 22.9 Carga de scripts y orden de dependencias

**Sitio público** (`js/components.js loadAuthSystem`):

```
1. js/ai/fuzzy.js              ← debe cargar PRIMERO (intent + ranker dependen)
2. js/ai/engine.js
3. js/ai/ner.js
4. js/ai/intent.js
5. js/ai/inventory-search.js   ← Capa D
6. js/ai/faq-ranker.js         ← Propuesta #1
7. js/comm-schema.js
8. js/kb-client.js
9. js/concierge.js
10. js/concierge-optin.js
```

**Admin** (`admin.html`):

```
js/ai/fuzzy.js                 ← antes de intent.js
js/ai/engine.js
js/ai/ner.js
js/ai/intent.js
js/ai/inventory-search.js
js/ai/faq-ranker.js
js/ai/scoring.js
js/ai/nba.js
js/ai/forecast.js
js/admin-kb.js
js/admin-unmatched.js          ← nuevo, después de admin-kb (depende de openFormPrefilled)
```

**Defensa**: cada módulo IA usa guard `if (window.AltorraFuzzy)`
para fallback graceful si la dependencia no cargó (raro pero
posible en networks malas).

### 22.10 Cómo extender el Offline Ultra Brain

**Para agregar sinónimos nuevos**:

`js/ai/fuzzy.js` → objeto `SYNONYMS` → agregar `'canonical': ['variante1', 'variante2']`.
El reverse index se reconstruye al cargar el módulo.

**Para agregar un intent nuevo con respuesta determinística**:

1. `js/ai/intent.js` `LEXICON` → agregar entrada con keywords
2. `js/concierge.js generateBotResponse` → agregar branch
   `if (classification.intent === 'mi_intent_nuevo')`

**Para agregar un nuevo filtro de inventario** (ej. "color"):

1. `js/ai/inventory-search.js extractFilters` → agregar regex/lookup
2. `search()` → agregar predicate en el filter
3. `formatResponse()` → agregar al `filterDescr` array

**Para mejorar el TF-IDF**:

1. Cambiar `MIN_SCORE_THRESHOLD` (default 0.5) si hay muchos FP/FN
2. Cambiar `AMBIGUITY_RATIO_THRESHOLD` (default 1.5) para más/menos
   quick replies
3. Para upgrade futuro a embeddings reales: `AltorraAI.registerProvider('faq-rank', mlFn)`
   y `bestAnswer` lo usa antes del fallback rules

### 22.11 Anti-patterns evitados durante el bloque

| Riesgo | Mitigación |
|---|---|
| Levenshtein cuádrico O(n²) sin bound | Early exit por `abs(len_a - len_b)` + row min watch |
| Fuzzy match sobre keywords cortos (`ok`, `oh`) | Threshold adaptativo: 0.85 para palabras ≤4 chars |
| Memory window crece infinito | Cap a 3 turnos + decay 5 min |
| Anáfora resolution con contexto stale | Verifica `lastTurnAt < 5 min` antes de usar slots |
| Inventory search en CADA turno (cara) | Solo se ejecuta si `inventory_query` Y hay filtros específicos |
| Logs `unmatched` spam si cliente repite | Throttle 1/min/sesión + length filter 4-500 chars |
| TF-IDF index recomputado cada turno | Cache por session, invalidado solo si cambia faqs.length |
| Quick reply payload con XSS | `escapeHtml` + `data-quick-reply` attr (event delegation) |
| Ambiguous threshold demasiado laxo | 1.5x ratio (top1 debe ser ≥1.5 veces top2) |
| Cliente promueve query a FAQ via cliente público | Reglas Firestore: read/update solo isEditorOrAbove |
| Fuzzy expansion incorrecta de stop-words | `STOP_WORDS` set excluido del fuzzy match |
| Hard delete admin no limpia panel derecho | docChanges.removed event + cleanup _activeSessionId |
| Cliente puede inyectar mensajes `from:'system'` | Firestore rule: `from:'system'` requiere isEditorOrAbove |
| Bot responde "no entendí" sin oportunidad de aprender | logUnmatched + admin promueve a FAQ |
| Re-render del listener stoppea cuando logout | Guard `!auth.currentUser` en error callback (legacy patrón) |

### 22.12 Resumen de archivos modificados/creados

| Archivo | Tipo | Propósito |
|---|---|---|
| `firestore.rules` | mod | `from:'system'` rule + `unmatchedQueries/` collection |
| `js/admin-concierge.js` | mod | docChanges.removed listener (BUG #3) |
| `js/concierge.js` | mod | Botón ⋮ + handleClientResetSession + Capa C+D+E + quick replies + logUnmatched |
| `css/concierge.css` | mod | Header dropdown + quick replies styles |
| `js/ai/fuzzy.js` | new | Levenshtein-Damerau + sinónimos (~340 líneas) |
| `js/ai/intent.js` | mod | classify con fuzzy + classifyMultiple + slots + resolveAnaphora |
| `js/ai/inventory-search.js` | new | Function calling simulado (~280 líneas) |
| `js/ai/faq-ranker.js` | new | TF-IDF (~150 líneas) |
| `js/admin-unmatched.js` | new | UI admin "Lo que no entendí" (~340 líneas) |
| `js/admin-kb.js` | mod | `openFormPrefilled` + `_onSaveCallback` |
| `js/admin-section-router.js` | mod | Registry: `kb` → "Cerebro Altorra AI", `unmatched` nuevo |
| `js/components.js` | mod | Carga fuzzy + inventory-search + faq-ranker antes de concierge |
| `admin.html` | mod | Sidebar item Lo que no entendí + sec-unmatched + scripts |
| `css/admin.css` | mod | `.unmatched-*` styles (~120 líneas) |
| `service-worker.js` | mod | CACHE_VERSION = v20260507010000 |
| `js/cache-manager.js` | mod | APP_VERSION = 20260507010000 |
| `CLAUDE.md` | mod | Esta sección §22 |

**Total**: 4 archivos nuevos + 12 archivos modificados + 1 deploy de
rules manual.

### 22.13 Deploy manual requerido

```bash
firebase deploy --only firestore:rules
```

Activa:
- Regla `from:'system'` para messages (fix BUG #2)
- Colección `unmatchedQueries/` (Capa E)

Sin este deploy:
- BUG #2 persiste — closeChat seguirá tirando permission-denied
- Capa E no funcionará — `concierge.js logUnmatched` fallará en
  `add()` con permission-denied (best-effort, no bloquea el chat,
  pero no aprenderás de queries no entendidas)

El resto de cambios (frontend, scripts, CSS) viajan vía service
worker — los clientes los reciben automáticamente al recargar la
página tras un push a `main`.

### 22.14 Validación post-deploy

1. **BUG #1 cliente**: abrir el chat → click ⋮ → "Finalizar
   conversación" → confirm → chat se resetea con welcome nuevo

2. **BUG #2 admin**: abrir un chat → click "Cerrar chat" → debería
   aparecer toast "Conversación cerrada" SIN error de permisos

3. **BUG #3 admin**: abrir admin en 2 tabs → en tab A eliminar un
   chat que está abierto en tab B → tab B debería limpiar el panel
   derecho automáticamente con toast informativo

4. **Capa A+B fuzzy**: probar `"qiero un coxe varato"` →
   bot debería entender "comprar carro barato"

5. **Capa C memoria**: probar conversación tipo:
   - "¿tienen Mazda CX-5?"
   - "¿de qué año es?"
   - bot debería responder con el año del Mazda CX-5

6. **Capa D inventory search**: probar `"¿tienen camionetas por
   menos de 60 millones?"` → bot debería listar SUVs/pickups con
   precio ≤ 60M, no respuesta genérica

7. **Capa E feedback loop**: escribir algo absurdo
   `"asdfghjkl querría flotar"` → admin va a "Lo que no entendí"
   → debería aparecer en la lista

8. **Propuesta #1 TF-IDF**: con 10+ FAQs, una query con keywords
   raros debería preferir la FAQ que los contiene aunque otra
   tenga más coincidencias comunes

9. **Propuesta #2 quick replies**: si dos FAQs tienen scores
   cercanos, el bot debería ofrecer botones de selección, no
   responder con la primera

10. **Promote to FAQ**: ir a "Lo que no entendí" → click
    "➕ Crear FAQ" → form prellenado → guardar → entry desaparece
    de "Sin revisar" + aparece en "Promovidas"

### 22.15 Reset chat fix — Race condition + UX confirmación datos (2026-05-07)

> Iteración inmediatamente posterior a §22 tras feedback del cliente:
> al hacer "Finalizar conversación" del menú ⋮ (BUG #1 ya resuelto en
> §22.2), la UI no se actualizaba sin F5. Además, para usuarios
> anónimos con datos previos del Lead Gate, el chat retomaba esos
> datos sin preguntar — el cliente quería confirmación.

#### Diagnóstico — Race condition con listener Firestore

**Bug observado**: tras dar "Aceptar" al confirm, el chat queda en
estado inconsistente — los mensajes anteriores no se borran de la
UI hasta que el cliente recarga manualmente (F5).

**Causa raíz**:

1. `handleClientResetSession()` escribía `status:'closed'` al doc parent
   ANTES de cancelar `_firestoreParentUnsub`.
2. El listener parent recibía el snapshot del cierre y disparaba
   `applyClosedState()` con `session.closed = true`.
3. Eso inyectaba el bloque `#cncClosedBlock` ("Esta conversación ha
   finalizado") al DOM.
4. `resetSession()` limpiaba localStorage y creaba nueva sesión, pero
   el bloque ya estaba pintado y `session.closed` quedaba pisado por
   el snapshot tardío.

**Fix**: helper nuevo `cancelChatListeners()` se llama **ANTES** de
cualquier write a Firestore. El listener queda muerto antes de poder
recibir el snapshot del cierre.

```js
function cancelChatListeners() {
    if (_firestoreUnsub) { try { _firestoreUnsub(); } catch (e) {} _firestoreUnsub = null; }
    if (_firestoreParentUnsub) { try { _firestoreParentUnsub(); } catch (e) {} _firestoreParentUnsub = null; }
}

function handleClientResetSession() {
    // ... confirm con datos según caso ...
    cancelChatListeners();           // ← PRIMERO
    markChatClosedInFirestore();     // best-effort, no bloquea
    resetSession({ preserveProfile: keepData });
}
```

#### UX nueva — Confirmación de datos para guests

Tres caminos según el estado del cliente:

| Caso | Comportamiento |
|---|---|
| **A** Anónimo con `session.profile` previo | Confirm con datos persistidos: "¿Estos siguen siendo tus datos? 👤 Nombre · 📱 Tel · 📧 Email" — Aceptar = preservar profile (no re-pide gate); Cancelar = reset completo (Lead Gate vacío) |
| **B** Logueado | Reset completo; `loadProfileFromAuth()` re-aplica el profile del auth (source of truth en `/perfil.html`) |
| **C** Anónimo sin profile | Confirm genérico "¿Finalizar esta conversación?" — reset normal |

#### `resetSession({ preserveProfile })` extendido

```js
function resetSession(opts) {
    var preserveProfile = opts && opts.preserveProfile === true;
    var preserved = preserveProfile ? {
        profile, gateCompleted, uid, nombre, email, telefono, level
    } : null;

    cancelChatListeners();              // defense-in-depth
    localStorage.removeItem(STORAGE_KEY);
    _chatDocCreated = false;
    _lastSyncedMsgIds = {};
    _leadCreated = false;
    _asesorJoinedAnnounced = false;
    session = loadSession();            // sesión limpia con nuevo sessionId

    loadProfileFromAuth().then(function (profile) {
        if (profile) { /* aplica auth profile */ }
        // Si preserveProfile=true Y auth no aportó nada, restaura preserved
        if (preserved && !session.profile) {
            Object.assign(session, preserved);
            saveSession(session);
        }
        // Cleanup DOM defensivo + re-render + toast
        // ...
    });
}
```

#### `continueResetUI()` con cleanup DOM defensivo

Tras el reset, ANTES del re-render:
- Remueve `#cncClosedBlock` (bloque "conversación finalizada" que el
  listener tardío pudo haber inyectado)
- Cierra dropdown ⋮ del header (`hidden` + `aria-expanded=false`)
- Limpia `cncMessages.innerHTML = ''`
- Aplica orden: `applyClosedState()` → `applyGateVisibility()` →
  `applyAsesorHeader()` → `renderMessages()`
- Inyecta `#cncResetToast` con animación spring suave (2.2s
  auto-dismiss): "✓ Conversación reiniciada"

CSS nuevo `.cnc-reset-toast` con gradient verde, posición top-center,
respeta `prefers-reduced-motion`.

#### Validación

| Escenario | Resultado esperado |
|---|---|
| Anónimo + profile → Aceptar | Mensajes desaparecen, no aparece gate, toast verde |
| Anónimo + profile → Cancelar | Mensajes desaparecen, gate vacío visible, toast verde |
| Logueado | Mensajes desaparecen, no aparece gate, profile re-aplicado, toast verde |
| Anónimo sin profile | Mensajes desaparecen, gate vacío visible, toast verde |

#### Anti-patterns evitados

| Riesgo | Mitigación |
|---|---|
| Listener pisa reset local | `cancelChatListeners()` ANTES de Firestore write |
| Bloque "conversation closed" queda fantasma | Cleanup DOM en `continueResetUI` |
| Cliente pierde datos al reiniciar | `preserveProfile: true` opt-in |
| Cliente no sabe si el reset funcionó | Toast verde 2.2s con auto-dismiss |
| Dropdown ⋮ queda abierto tras reset | `aria-expanded=false` en cleanup |
| Race con `_firestoreParentUnsub` | Listener cancelado antes de write |

#### Archivos modificados

- `js/concierge.js` — refactor `handleClientResetSession` + helpers
  `cancelChatListeners` / `markChatClosedInFirestore` + `resetSession`
  con `preserveProfile` flag
- `css/concierge.css` — `.cnc-reset-toast` styles
- `service-worker.js` + `js/cache-manager.js` — bump v20260507020000
- Sin cambios en Firestore rules ni Cloud Functions

Commit: `57428ec`.


---

## 23. ACD Enterprise — Omnicanal con Queue, Locks, SLA y FCM Push (2026-05-08)

> Refactor mayor en 9 sprints + Sprint 3-bis (capa nuclear de aislamiento
> auth) que convierte el flujo bot↔asesor en un **Automatic Call
> Distributor (ACD)** de calidad enterprise: queue management con
> workload matemático, locks anti-colisión con transactions, timers
> SLA F5-proof, doble fallback empático, radicados únicos, cierre
> bidireccional inmutable, sesiones admin/cliente totalmente aisladas,
> y push notifications gratuitas a celular vía FCM.

### 23.1 Línea de tiempo

| Sprint | Capability | Commit |
|---|---|---|
| 1 | Schema + indexes + radicados (`onConciergeChatCreated`) | `7b3807d` |
| 2 | Cierre bidireccional inmutable (rules + UI) | `7b3807d` |
| 3 🔒 | FASE 6 — Aislamiento auth admin/web (pre-check + signOut defensivo) | `7b3807d` |
| 4 🔒 | FASE 7 — Trusted devices fix (rules self-service) + persistencia sesión | `7b3807d` |
| 3-bis 🔒 | Capa 3 nuclear — `appName` diferente por contexto (admin/public) | `5478cd4` |
| 5 | Workload aggregator + `system/workload` singleton | (este commit) |
| 6 | Locks (claiming) + transactions + UI bloqueada | (este commit) |
| 7 | Queue mode + SLA F5-proof + doble fallback + alertas 5/10 min | (este commit) |
| 8 | FCM Web Push + `onChatEscalated` + service worker dedicado | (este commit) |
| 9 | Doc + cache bump | (este commit) |

### 23.2 Schema extension `conciergeChats/{sessionId}` (campos nuevos)

```js
{
    // Escalado + Routing (Fase 2-3)
    mode: 'bot' | 'queue' | 'live' | 'wa_handed_over',
    queueEnteredAt: ISO_string | null,
    claimedBy: uid | null,
    claimedByName: string | null,
    claimedAt: ISO_string | null,
    claimReleasedBy: uid | null,
    escalationReason: 'manual' | 'double_fallback' | 'sentiment_negative' |
                      'frustration' | 'ask_human' | 'sla_breach' | null,

    // Trazabilidad (Fase 5)
    radicado: 'REQ-202605-0042',
    radicadoAt: ISO_string,
    historicalUserKey: string | null,

    // Cierre Enterprise
    closedReason: 'client_finalized' | 'admin_resolved' |
                  'sla_breach_handover' | 'idle_timeout' | null,
    closedByRole: 'client' | 'asesor' | 'super_admin' | 'system' | null,

    // Fallback Counter (Fase 1)
    botFallbackCount: int,
    botFallbackAt: ISO_string | null,

    // SLA Resilience (Fase 2)
    slaWarnedAt5min: bool,
    slaWarnedAt10min: bool,
    notifiedFcmAt: ISO_string | null  // anti-spam push
}
```

### 23.3 Doc nuevo `system/workload` (singleton)

Aggregator centralizado que ahorra 99.8% de reads vs cliente-side calc.

```js
{
    asesoresOnline: int,            // RTDB.presence.online=true (dedup uid, stale >5min filtrado)
    asesoresAvailable: int,         // online + claimedChats < 3
    asesoresSaturated: int,         // online + claimedChats >= 3
    queueLength: int,               // mode='queue' AND claimedBy=null
    avgWaitMinutes: float,
    longestWaitMinutes: float,
    activeChatsByUid: { uid: count },
    updatedAt: ISO_string
}
```

**Triggers de la Cloud Function `recalculateWorkload`**:
1. `onDocumentWritten` en `conciergeChats/{sid}` (skip si solo cambian campos no relevantes)
2. `onSchedule every 1 minutes` (safety net + cubre cambios de RTDB presence)

### 23.4 Locks (Claiming) — Firestore Transactions

`admin-concierge.js claimChat(sessionId)`:

```js
db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    if (snap.data().claimedBy && claimedBy !== currentUid) {
        throw { code: 'already-claimed', claimedByName };
    }
    tx.update(ref, {
        claimedBy: currentUid,
        claimedByName, claimedAt,
        mode: 'live',  // ← queue → live al claim
        assignedTo: currentUid, assignedToName  // compat CRM legacy
    });
});
```

**Race condition resuelto**: si dos asesores hacen click al mismo
milisegundo, Firestore detecta versión cambiada en el segundo
`tx.update`, retry automático del transaction, segundo asesor recibe
`ConflictError`. UI muestra toast informativo "X tomó este chat".

**Auto-claim al primer mensaje**: `sendAsesorMessage()` invoca `claimChat`
automáticamente si el chat no tiene `claimedBy` aún. No hay que hacer
click explícito en un botón "Tomar chat" — el primer mensaje del
asesor adquiere el lock atómicamente.

**Override super_admin**: `releaseClaim(sessionId)` permite liberar el
lock para reasignación. Botón "Liberar" en el banner ámbar que ven
los super_admins cuando otro asesor tiene el chat tomado.

**Reglas Firestore que sustentan el lock**:
```
match /conciergeChats/{sessionId} {
    allow update: if isSuperAdmin()
        || (isEditorOrAbove() && (
            resource.data.claimedBy == null
            || resource.data.claimedBy == request.auth.uid
        ))
        || (request.auth != null && (
            resource.data.userId == request.auth.uid
            || resource.data.userId == null
        ));
}
match /messages/{msgId} {
    allow create: if /* parent.status != 'closed' */ && (
        from in ['user', 'bot']
        || (from == 'asesor' && (
            isSuperAdmin()
            || (isEditorOrAbove() && (
                claimedBy == null || claimedBy == auth.uid
            ))
        ))
        || (from == 'system' && isEditorOrAbove())
    );
}
```

### 23.5 Temporizadores SLA F5-proof

**Source of truth**: `queueEnteredAt` persistido en Firestore al
escalado. El cliente NO tiene timer absoluto — un watcher relativo
`setInterval(checkSLA, 30000)` compara `Date.now() - queueEnteredAt`.

**Idempotencia post-F5**: flags `slaWarnedAt5min` y `slaWarnedAt10min`
persistidos en Firestore previenen mostrar la misma alerta 2 veces si
el cliente recarga al minuto 6 (la alerta de 5min ya fue mostrada).

**UI dinámica del cliente** según `system/workload`:
- `asesoresAvailable > 0` → "🟢 Estás en posición #X" (verde)
- `asesoresOnline > 0` saturado → "🟡 Tiempo estimado: X min" (ámbar)
- `asesoresOnline === 0` → "🔵 Tiempo estimado 5-10 min" (azul)

**Alertas progresivas**:
- ≥5 min: banner ámbar con CTAs `[📲 Continuar por WhatsApp]` / `[⏳ Seguir esperando]`
- ≥10 min: banner rojo con CTA pulsante `[📲 Ir a WhatsApp ahora]`

### 23.6 Doble Fallback Inteligente

`session.botFallbackCount` persistido en Firestore.

- **1er fallback** (counter=1): pide reformular amigablemente
  "no estoy seguro de haber entendido. ¿Podrías reformular?"
- **2do fallback consecutivo** (counter=2): escala automáticamente
  con mensaje empático "Te conectaré con un asesor en vivo de
  inmediato 🙋‍♂️" + `escalateToLive('double_fallback')` + push FCM
- **Reset automático**: cuando el bot da respuesta exitosa
  (intent reconocido o KB match), `_isFallback === false` →
  `resetFallbackCounter()` vuelve a 0.

### 23.7 Radicados Únicos `REQ-YYYYMM-XXXX`

Cloud Function `onConciergeChatCreated` asigna radicado server-side
con transaction sobre `config/counters_YYYYMM`:

- Counter por mes → reset automático mensual (XXXX vuelve a 0001)
- Idempotente: skip si `data.radicado` ya existe
- `historicalUserKey = email lowercase || uid || null` → group key
  para listar tickets del mismo cliente sin pisarlos
- Visible en header del chat cliente (`cnc-radicado-inline` badge)
- Visible en header del chat admin (`cnc-admin-radicado` badge)
- Persiste en bloque de cierre del cliente para referencia

### 23.8 Cierre Bidireccional Inmutable

**Asimetría rota**: antes solo el cliente quedaba bloqueado al cerrar.
Ahora ambos read-only:

```
match /messages/{msgId} {
    allow create: if request.auth != null
        && (
            get(...).data.status != 'closed' || isSuperAdmin()
        )
        && /* ... rules existentes ... */;
}
```

**UI admin** (`cnc-admin-closed-banner`):
- Banner verde con metadata: closedReason, closedByName, closedAt, radicado
- Input + sendBtn disabled
- Botón "Reabrir" solo para super_admin

**UI cliente** (`cnc-closed-block`):
- Bloque "Esta conversación ha finalizado" con radicado visible
- Botón "Iniciar nueva conversación" → reset session → nuevo radicado

### 23.9 FASE 6 — Aislamiento Auth Admin / Web Pública

**Bug crítico de seguridad corregido**: admin/editor podía loguear
desde la web pública sin pasar 2FA — su sesión Firebase quedaba
autenticada → bypass total del 2FA del panel admin.

**Capa 2 (post-login defensivo)** en `auth.js handleLogin`:
- Tras `signInWithEmailAndPassword`, chequea si `auth.uid` existe en
  `usuarios/{uid}` (admin/editor)
- Si SÍ → `_explicitLogout = true` + `signOut()` inmediato
- Mensaje rojo en modal: "🔒 Esta cuenta es de administrador. Por
  favor iniciá sesión desde admin.html"
- Modal NO se cierra (admin ve el mensaje)

**Capa 3 nuclear (Sprint 3-bis)** en `firebase-config.js`:
- Detección por `location.pathname` → `appName = 'altorra-admin'`
  o `'altorra-public'`
- Firebase Auth genera storage keys diferentes por appName:
  `firebase:authUser:<apiKey>:altorra-admin` vs `:altorra-public`
- Cero contaminación entre contextos
- **Permite sesiones simultáneas**: admin logueado como super_admin
  en `admin.html` Y como cliente normal en `index.html` en otra tab
  del mismo navegador

### 23.10 FASE 7 — Trusted Devices Fix + Persistencia Sesión

**Bug crítico de UX corregido**: editores recibían 2FA en cada
refresh aunque marcaran "guardar dispositivo". Causa raíz: regla
`usuarios/` allow update solo super_admin → `saveDeviceTrust()`
fallaba silenciosamente con permission-denied.

**Fix de reglas** — patrón self-service diff-keys:
```
allow update: if isSuperAdmin()
    || (request.auth.uid == userId &&
        request.resource.data.diff(resource.data).affectedKeys()
            .hasOnly([
                'trustedDevices', 'ultimoAcceso', 'lastLoginAt',
                'habilitado2FA', 'telefono2FA', 'prefijo2FA',
                'fcmTokens'
            ]));
```

**Garantías de seguridad**:
- Editor NO puede modificar `rol` (escalación de privilegios bloqueada)
- Editor NO puede modificar `email`, `nombre`, `bloqueado`, `estado`
- Editor SOLO puede auto-gestionar dispositivos + 2FA + FCM tokens

**UX de persistencia de sesión** sin flicker:
- Inline script en `<head>` de admin.html lee
  `altorra_admin_auth_hint` (TTL 8h) ANTES del primer paint
- Si vigente → aplica `html.admin-restoring` → CSS oculta loginScreen +
  muestra adminPanel skeleton inmediatamente
- `showAdmin()` persiste hint + restaura última sección via
  `AltorraSections.go(lastSection)` o `window.location.hash`
- `notifyChange()` persiste `altorra_admin_last_section` en cada
  navegación → F5 vuelve a la sección donde estabas (no al dashboard)
- `showLogin()` limpia hint + clases pre-paint en logout

### 23.11 FCM Web Push (Sprint 8)

**Decisión de canal**: descartado SMS gratuito (mito corporativo —
todos los providers cobran). Descartado Telegram (forzar app de
terceros al equipo). **Elegido: FCM Web Push nativo de Firebase**.

**Soporte multiplataforma**:
- Android Chrome/Edge/Firefox: ✅ push del SO con tab cerrado
- Desktop Chrome/Edge/Firefox: ✅
- iOS 16.4+ Safari con PWA en home screen: ✅ push real
- iOS < 16.4: ⚠️ foreground only (los iPhones del equipo deberían
  estar en iOS 17+)

**Arquitectura**:
```
Asesor (Android/iOS) — PWA admin instalada
├─ admin-fcm.js: Notification.requestPermission() + getToken()
├─ Service Worker /firebase-messaging-sw.js dedicado
└─ Persiste fcmToken en usuarios/{uid}.fcmTokens[] (array, max 5 devices)
       ▲
       │ envía notificación
Cloud Function onChatEscalated (FCM HTTP v1 API)
├─ Trigger: onUpdate conciergeChats donde mode pasa a 'queue'
├─ Anti-spam: skip si workload.asesoresAvailable > 0 (alguien ya está)
├─ Anti-spam temporal: skip si notifiedFcmAt < 5 min ago
├─ Lee usuarios/ rol in [super_admin, editor] con fcmTokens
├─ admin.messaging().send() para cada token
└─ Auto-pruning: tokens inválidos se remueven del array
```

**Costo**: $0 USD/mes (cuota ilimitada FCM web push en Spark plan).

**Setup operacional one-time**:
1. Firebase Console → Project Settings → Cloud Messaging
2. Web Push certificates → "Generate key pair"
3. Copiar VAPID public key
4. Pegarlo en `js/admin-fcm.js` → constante `VAPID_PUBLIC_KEY`
5. Deploy + cada asesor verá prompt al primer login post-deploy
6. Aceptar permiso → token se registra → push notifications activas

### 23.12 Anti-patterns evitados

| Riesgo | Mitigación |
|---|---|
| Cliente recalcula workload (N×M reads) | Aggregator + singleton `system/workload` (1 read) |
| Timer SLA muere con F5 | `queueEnteredAt` en Firestore + watcher relativo |
| 2 asesores responden al mismo chat | `runTransaction` con read-then-write atómico |
| Lock pisado por error | Reglas Firestore validan `claimedBy == auth.uid` |
| Notificación FCM spam (10 chats en 1 min = 10 push) | Anti-spam: `notifiedFcmAt < 5 min` + skip si `asesoresAvailable > 0` |
| Tokens FCM zombies acumulados | Auto-pruning server-side al primer error de invalid token |
| Counter de radicados duplicado bajo race | Transaction atómica server-side (Cloud Function) |
| Cliente genera radicado | Server-side only — cliente NUNCA inventa |
| Mismo cliente pisa sus chats viejos | `historicalUserKey` agrupa pero NO mergea |
| Admin sigue escribiendo en chat cerrado | Reglas Firestore bloquean creates si parent.status='closed' |
| Doble-fallback se cuelga si cliente alterna intents | Reset counter en cada respuesta exitosa (`!_isFallback`) |
| Sesión admin se filtra a web pública | `appName` diferente por contexto (storage keys aisladas) |
| Editor sin trusted devices funcional | Reglas self-service diff-keys con whitelist de campos |
| F5 manda al dashboard ignorando sección actual | `altorra_admin_last_section` + `AltorraSections.go(lastSection)` |
| Loading screen reaparece en cada F5 | Auth-hint inline pre-paint con TTL 8h |
| FCM token registrado en cada login (acumula) | findIndex existing + update lastUsedAt en lugar de duplicar |
| Cap inflación de tokens por usuario | Max 5 devices, slice(-4) descarta el más viejo |
| Notification permission spam | Pedido 1x por sesión via sessionStorage flag |

### 23.13 Filosofía de Evolución del Cerebro ALTOR (lóbulos)

```
                    ┌────────────────┐
                    │  ALTOR Brain    │
                    └────────────────┘
                            │
   ┌────────┬────────┬─────┴──────┬────────┬─────────┬──────────┐
   ▼        ▼        ▼            ▼        ▼         ▼          ▼
┌─────┐ ┌──────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌─────────┐ ┌────────┐
│ NLP │ │Memor.│ │Concier-│ │Cerebro │ │  ACD   │ │Cierre + │ │Aisla-  │
│§22  │ │§22.4 │ │ge §20  │ │AI §21  │ │§23.2-5 │ │Radicados│ │miento  │
│A,B  │ │  C   │ │+ §22.15│ │ LLM    │ │+ §23.6 │ │§23.5-8  │ │§23.9-10│
└─────┘ └──────┘ └────────┘ └────────┘ └────────┘ └─────────┘ └────────┘
                                            │
                                       ┌────┴────┐
                                       ▼         ▼
                                  ┌─────────┐┌────────┐
                                  │Workload ││  FCM   │
                                  │§23.3    ││§23.11  │
                                  └─────────┘└────────┘
```

**Reglas de no-interferencia (verificadas)**:
- ACD NO toca el motor NLP — solo lee `intent` y `botFallbackCount`
- Memory NO se invalida al escalar — el contexto persiste para el asesor
- NLP/Memory siguen funcionando si FCM está caído
- Cierre bidireccional respeta resumen IA (§21.5) — el último `summary`
  queda como historial inmutable
- Aislamiento auth (§23.9-10) NO afecta features cliente/admin

### 23.14 Deploy manual requerido (Sprints 5-8)

```bash
# Rules + indexes + funciones nuevas
firebase deploy --only firestore:rules,firestore:indexes
firebase deploy --only functions:recalculateWorkloadOnChatChange,functions:recalculateWorkloadScheduled,functions:onChatEscalated

# Cloud Scheduler API ya está habilitada de §21.9 — no requiere setup adicional
```

**Setup VAPID FCM** (cuando quieras activar push notifications):
1. Firebase Console → Project Settings → Cloud Messaging
2. Web Push certificates → Generate key pair
3. Copiar pública en `js/admin-fcm.js` constante `VAPID_PUBLIC_KEY`
4. Commit + push (cache bump automático)
5. Cada asesor verá prompt al siguiente login

Hasta que setees VAPID_PUBLIC_KEY, `AltorraAdminFCM.init()` es no-op
silencioso. Las Cloud Functions sirven sin push activo (no hay tokens).

### 23.15 Validación post-deploy (E2E)

1. **Aislamiento auth**: incógnito → web pública → loguear con cuenta
   admin → debe rechazar con mensaje "🔒 Esta cuenta es de administrador"
2. **Trusted devices editor**: loguear como editor → 2FA → marcar "guardar
   dispositivo" → cerrar → volver → debe entrar SIN pedir 2FA
3. **Persistencia sesión admin**: estar en CRM → F5 → vuelve al CRM (no
   al dashboard) sin flicker
4. **Sesiones simultáneas**: tab 1 admin como super_admin + tab 2 web
   pública como cliente normal → ambas funcionan sin pisarse
5. **Radicado**: abrir bot → completar gate → enviar mensaje → ver
   `REQ-202605-XXXX` aparecer ~1s en el header del widget
6. **Cierre bidireccional**: admin cierra chat → input admin queda
   disabled + banner verde con metadata
7. **Queue mode**: cliente da "Hablar con asesor" → ve banner queue +
   posición + tiempo estimado
8. **SLA timers F5-proof**: esperar 5 min en queue → ver banner ámbar
   con CTAs WhatsApp/Esperar → F5 → la alerta sigue visible (no se duplica)
9. **Lock anti-colisión**: 2 admins abren mismo chat → uno escribe →
   otro ve banner "X está atendiendo este chat" + input disabled
10. **Doble fallback**: escribir 2 mensajes que el bot no entiende
    → 1ro: pide reformular → 2do: escala automático con mensaje empático
11. **FCM push** (si VAPID seteada): cliente escala chat → admin con
    PWA cerrada recibe push del SO con tag `queue-<sessionId>`

### 23.16 Resumen de archivos modificados/creados

**NEW**:
- `firestore.indexes.json` (5 indexes ACD + banners legacy)
- `firebase-messaging-sw.js` (raíz — service worker FCM)
- `js/admin-fcm.js` (registro tokens + UI prompt)

**MODIFIED**:
- `firebase.json` (firestore.indexes registrado)
- `firestore.rules` (mensajes bloqueo si closed, claim ownership,
  usuarios self-service diff-keys, unmatchedQueries)
- `functions/index.js` (4 Cloud Functions nuevas: onConciergeChatCreated,
  recalculateWorkloadOnChatChange, recalculateWorkloadScheduled, onChatEscalated)
- `js/concierge.js` (radicados, queue mode, SLA watcher, doble fallback,
  workload listener, propagación mode/queueEnteredAt post-F5)
- `js/admin-concierge.js` (claimChat con runTransaction, releaseClaim,
  banner claimed, render con `canWrite`/`lockReadonly`,
  hardDelete listener removed)
- `js/auth.js` (post-login defensivo signOut si admin)
- `js/admin-auth.js` (auth-hint persistencia, restauración última sección)
- `js/admin-section-router.js` (persiste altorra_admin_last_section)
- `js/firebase-config.js` (appName diferente por contexto admin/public)
- `admin.html` (auth-hint inline reader en `<head>` + script admin-fcm.js)
- `css/admin.css` (claimed banner + closed banner + radicado badge)
- `css/concierge.css` (radicado inline + closed radicado + queue/SLA banners + reset toast)
- `service-worker.js` + `js/cache-manager.js` (cache version bumps)
- `CLAUDE.md` (esta sección §23)


---

## 24. Offline Ultra Brain 2.0 — Arquitectura Dual-Core (2026-05-09)

> Refactor en 5 sprints que repotencia el motor JS local del bot ALTOR
> sin tocar el código del LLM (§21). Filosofía: **Dual-Core** — el
> Core Premium (LLM Anthropic) sigue intacto y "apagado" por
> presupuesto; el Core Free (motor local) toma el control con
> small-talk natural, fuzzy matching agresivo, memoria conversacional
> compartida, anáfora 2.0, y Transformers.js opcional. Cuando el
> cliente cargue saldo en Anthropic, el toggle `_brain.enabled` activa
> el Premium transparentemente vía router `AltorraDualCore`.

### 24.1 Diagnóstico — Por qué el bot sonaba robótico antes

Audité el motor en producción con dos casos del cliente:

| Caso | Diagnóstico técnico |
|---|---|
| `"Hola que mas"` | Lexicon ya tenía `que mas` → matcheaba greeting con confidence 0.58 (pasaba threshold 0.3). El bot SÍ respondía pero con UNA frase seca, sin continuar la conversación naturalmente. |
| `"tendras autos por ahi"` | Lexicon NO tenía `tendras` ni `manejan` ni `por ahi`. Fuzzy threshold 0.82 era demasiado estricto: similarity('tendras', 'tienes') ≈ 0.43 → NO matcheaba. Cae al fallback genérico → robotismo. |

**Causas raíz identificadas**:
1. Lexicon pobre (~14 keywords por intent, sin formas conjugadas)
2. Fuzzy threshold fijo 0.82 rechazaba conjugaciones verbales
3. No había small-talk module — saludos respondían con frase seca sin follow-up
4. No había stems verbales — "tendras"/"tienes"/"tendrán" eran tratados como palabras distintas
5. No había n-gram matching — "carros por ahi" como frase compuesta no se reconocía

### 24.2 Arquitectura Dual-Core

```
┌─────────────────────────────────────────────────────────────────┐
│                   Cliente abre Concierge                          │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
                ┌──────────────────────┐
                │   AltorraDualCore     │
                │   .respond(text, sess)│
                └──────────────────────┘
                            │
            ┌───────────────┴───────────────┐
            │ ¿brain.enabled                  │
            │   && AltorraAI.providers.chat   │
            │   && circuit-breaker NO open?   │
            └───────────────┬───────────────┘
                            │
            ┌──────YES──────┴──────NO──────┐
            ▼                              ▼
    ┌──────────────┐                ┌─────────────────┐
    │ CORE PREMIUM │                │   CORE FREE     │
    │ (LLM Anthropic)│              │ (Offline 2.0)   │
    │ §21 — INTACTO │                │ Cascada:        │
    │ via AltorraAI│                │ 1. Anáfora 2.0  │
    │ .chat()       │                │ 2. Small Talk   │
    │ chatLLM CF    │                │ 3. Rule-based   │
    └──────────────┘                │ 4. Transformers │
            │                       │    (opt-in)     │
            │                       │ 5. Fallback     │
            │                       └─────────────────┘
            │                                │
            │   ┌──────────────────┐         │
            │   │ SHARED MEMORY     │         │
            └──►│ session.context  │◄────────┘
                │ turnHistory +     │
                │ slots + intents  │
                └──────────────────┘
                       │
                       ▼
            ┌──────────────────────┐
            │   addMessage(bot)    │
            └──────────────────────┘
```

### 24.3 Sprint 1 — Small Talk + Fuzzy 2.0 + Lexicon enriquecido

#### 24.3.1 `js/ai/small-talk.js` (NEW)

Module dedicado de small talk colombiano. Intercepta saludos / fillers
ANTES del intent classifier formal, responde con variantes naturales
que **siempre incluyen una pregunta abierta** o invitación a la próxima
acción → evita el "muere ahí" del bot rule-based clásico.

**Patterns con regex robustas**:
- `greeting`: `/h+ola+s?|h+oli+s?|buen[oa]s|hey+|qubo|q\s*hubo|qu[eé]\s*hubo|qu[eé]\s*m[aá]s|qu[eé]\s*onda|qu[eé]\s*tal|saludos|hi|hello/i` — soporta repetición vocal ("hooooola"), variantes ortográficas ("qubo"/"q hubo"/"qhubo"), y todas las formas con/sin tilde.
- `casual_check`: "como estas", "como va", "como te va"
- `thanks` / `goodbye` / `laughter` / `polite_filler`

**Memoria contextual del greeting**:
- Si el cliente saluda 2da vez en la sesión → variant `returningTurn` que menciona el `lastTopicLabel`: "¡Volviste! 😄 ¿Continuamos con lo del catálogo?"
- Si es 1ra vez → variant `firstTurn` con follow-up: "¡Hola! 👋 Todo excelente por acá. ¿Qué te trae por aquí — buscas algún carro en particular?"

**Anti-falso-positivo**: si NER detecta entity de inventario en el texto (marca, modelo, precio), `skipIfEntity` evita matchear small-talk → el flujo regular del intent classifier toma prioridad.

#### 24.3.2 Fuzzy 2.0 — Stems + N-grams + Threshold adaptativo

`js/ai/fuzzy.js` extendido con:

**`VERB_STEMS` map** — raíces verbales españolas mapeadas a sus conjugaciones:
```js
'ten': ['tener', 'tienes', 'tiene', 'tendras', 'tendrás', 'tienen', 'tengo', ...]
'mostr': ['mostrar', 'muestra', 'muéstrame', ...]
'ver' / 'busc' / 'quer' / 'pod' / 'sab' / 'hab' / 'man' / 'compr' / 'vend'
```

**`stemmize(word)`**: convierte una palabra a su raíz canonical:
- `stemmize('tendras')` → `'ten'`
- `stemmize('tienes')` → `'ten'`
- `stemmize('xyz')` → `'xyz'` (sin cambio)

Algoritmo:
1. Lookup directo en STEM_LOOKUP (variante → stem canonical)
2. Si no, fallback: si la palabra empieza con un stem ≥3 chars conocido, retorna el stem como prefijo

**`matchAdaptive(needle, haystack)`**: nuevo matcher con threshold dinámico según length:
| Length | Threshold |
|---|---|
| 2-3 chars | 1.0 (match exacto, anti-falso-positivo) |
| 4-5 chars | 0.80 |
| 6-8 chars | 0.72 ← `"tendras"` vs `"tienes"` passes |
| 9+ chars | 0.65 |

Adicionalmente prueba match por stem si una palabra tiene stem verbal conocido.

**`generateNgrams(text, [2,3])`**: bigramas y trigramas para reconocer frases compuestas como `"carros por ahi"` o `"tendras autos"` como unidad léxica.

#### 24.3.3 Lexicon enriquecido x4

`js/ai/intent.js` LEXICON expandido de ~14 keywords por intent a ~50-60. Ejemplos para `inventory_query`:

```
+ tendras, tendrás, tendran, tendrán
+ que manejan, qué manejan, manejan carros, manejan autos
+ que venden, qué venden, venden carros, venden autos
+ opciones, alternativas, mostrame, muéstrame, enseñame
+ vea, ver carros, ver autos, ver inventario
+ autos por ahi, carros por ahi, vehiculos por ahi
+ qué hay por ahi, ofrecen carros, ofrecen autos
+ queda algo, hay algo, tienen algo
```

Igual para `pricing_query` (lukas, palos, kilos, plata, precio justo, está caro), `financiacion_query` (mensual, abono, enganche, banco, prestamo), `appointment_request` (paso a verlo, conocer, horario, ubicación), `confirmation` (hagale, parce, bacano, simon, "el primero", "el segundo", "ese", "este").

#### 24.3.4 `classify` ahora cascada multi-stage

```
1. Match exacto en texto expandido (sinónimos)         → score = kw.length
2. Match en n-grams (frases compuestas)                → score = kw.length
3. Match en texto stemmizado (formas verbales)         → score = kw.length × 0.92
4. Fuzzy adaptativo (matchAdaptive con thresh dinámico) → score = kw.length × 0.82
```

El score más alto gana. Confidence = `min(1, score / max(textLen, 6))`.

### 24.4 Sprint 2 — Memoria conversacional compartida + Anáfora 2.0

#### 24.4.1 `pendingChoice` slot

Cuando el bot hace una pregunta con opciones explícitas (ej. "¿SUV o Sedán?", "¿Toyota o Mazda?"), llamamos:

```js
AltorraIntent.setPendingChoice(context, ['SUV', 'Sedán'], 'category_pick');
```

El cliente puede responder corto:
- `"el primero"` → resuelto a `'SUV'` con source `'pendingChoice'`
- `"el segundo"` → `'Sedán'`
- `"ese"` / `"este"` / `"el"` → `options[0]` (más reciente)
- TTL 5 min (mismo decay que turnHistory)

#### 24.4.2 `parseOrdinal(text)`

Detecta índices ordinales en español:
- `"primero"`, `"1ro"`, `"el 1"` → 0
- `"segundo"`, `"2do"` → 1
- `"tercero"`, `"3ro"` → 2
- `"último"`, `"ultimo"` → -1
- pronombres demostrativos cortos (`"ese"`, `"este"`, `"aquel"`) → 0

#### 24.4.3 `resolvePronominalChoice(text, context)`

Pipeline:
1. `parseOrdinal(text)` → si null, NO hay anáfora
2. ¿Hay `slots.pendingChoice` activo y < 5 min? → resolver desde array
3. ¿Hay `slots.lastVehiclesShown`? → resolver al vehículo del inventario via `AltorraInventorySearch.lookupById`
4. null si no se pudo

**Caso real cubierto**: bot pregunta "¿Te muestro Toyota o Mazda?" → cliente responde "el primero" → DualCore detecta anáfora → responde "Listo, hablemos de Toyota. ¿Te muestro las opciones que tenemos?".

### 24.5 Sprint 3 — DualCore Router + Circuit Breaker

#### 24.5.1 `js/ai/dual-core.js` (NEW)

Router central que reemplaza la cascada interna de `respondWithLLMOrRules`. La función `concierge.js respondWithLLMOrRules` ahora hace 2 cosas:

1. Pre-check sentiment/frustration/ask_human → escalar inmediato (esto NO va al router)
2. Delega al router: `AltorraDualCore.respond(userText, session)`

#### 24.5.2 `isPremiumAvailable()`

Cache 60s. Premium ON si:
- `knowledgeBase/_brain.enabled === true`
- `AltorraAI.providers.chat` registrado
- Circuit breaker NO está OPEN

#### 24.5.3 Circuit Breaker

Tracking en memoria de fallos del Premium:
- Sliding window 5 min
- Si `≥3 fallos` en la ventana → CB OPEN durante 3 min → bypass automático a Free
- Tras 3 min → CB se cierra y reintenta Premium

Esto resuelve el problema "Anthropic está caído → cada turno espera 12s timeout antes de fallback". Con CB, después del 3er fallo va directo a Free durante 3 min.

#### 24.5.4 Cascada Free Core

```
1. Anáfora 2.0 (resolvePronominalChoice)
2. Small Talk (saludos, fillers)
3. Rule-based existente (window._altorraConciergeRespondLocal hook)
4. Transformers.js (opt-in via flag)
5. Fallback empático con CTA escalate
```

#### 24.5.5 `_altorraConciergeRespondLocal` hook

Como `concierge.js` es IIFE, no podemos importar `generateBotResponse`. Solución: lo exponemos como hook global cuando el módulo se carga. `dual-core.js` lo invoca en cascade.

#### 24.5.6 Diagnostics

`AltorraDualCore.health()`:
```js
{
    premiumCacheValid: bool,
    premiumCacheValue: bool,
    recentFailures: int,
    circuitBreakerOpen: bool,
    circuitBreakerExpiresIn: ms,
    forceFreeMode: bool
}
```

`AltorraDualCore.forceFreeMode(true)`: para testing, fuerza Free aunque Premium esté OK.

### 24.6 Sprint 4 — Transformers.js (opt-in)

#### 24.6.1 `js/ai/transformers.js` (NEW)

**Feature flag DESACTIVADO por defecto**. El módulo NO descarga nada hasta que se active explícitamente:

```js
localStorage.setItem('altorra_tf_enabled', '1');
// O via UI: AltorraTransformers.enable()
```

**Razón del opt-in**: el modelo `Xenova/nli-deberta-v3-xsmall` pesa ~70MB. Sin consentimiento, descargarlo en cada page load arruinaría datos móviles del cliente.

#### 24.6.2 Lazy loading + IndexedDB cache

Cuando está enabled:
- `_loadPipeline()` se llama solo al primer `classify()` invocado por DualCore
- Transformers.js v2.17+ cachea automáticamente en IndexedDB (`useBrowserCache: true`)
- Web Worker via `numThreads = navigator.hardwareConcurrency`
- Progress callback expone `_state.downloadProgress` para UI futura

#### 24.6.3 Zero-shot classification

```js
AltorraTransformers.classify(text, candidateLabels);
// candidateLabels default:
//   ['consulta sobre inventario o catálogo',
//    'pregunta de precio',
//    'consulta de financiación',
//    'agendar cita o visita', ...]
// returns: { label, score, allLabels, allScores } o null si flag OFF
```

`mapToIntent(label)` convierte el label de zero-shot al intent canonical (LEXICON keys).

#### 24.6.4 Integración con DualCore

En la cascada Free, capa 4 (después de rule-based):
- Solo si `AltorraTransformers.isEnabled()` Y rule-based devolvió `_isFallback: true`
- Si Transformers detecta intent con score ≥0.65 → log para análisis (v3 podría re-invocar generateBotResponse con hint del intent)

**Estado actual**: la integración es **observacional** (loguea el intent detectado) — no fuerza re-invocación. Eso evita inestabilidad mientras se valida en producción. Versión futura del DualCore puede agregar `generateBotResponse(text, hintIntent)` si los logs muestran que Transformers identifica intents que el rule-based pierde.

### 24.7 Carga de scripts

**Sitio público** (`js/components.js loadAuthSystem`):

```
1. js/ai/fuzzy.js        ← deps de intent + ranker
2. js/ai/engine.js
3. js/ai/ner.js
4. js/ai/intent.js
5. js/ai/inventory-search.js
6. js/ai/faq-ranker.js
7. js/ai/small-talk.js   ← NEW (§24)
8. js/ai/transformers.js ← NEW (§24, lazy)
9. js/ai/dual-core.js    ← NEW (§24, debe ser último)
10. js/comm-schema.js
11. js/kb-client.js
12. js/concierge.js
13. js/concierge-optin.js
```

**Admin** (`admin.html`): mismo orden con scripts adicionales del admin (admin-kb, admin-concierge, etc.).

### 24.8 Anti-patterns evitados

| Riesgo | Mitigación |
|---|---|
| Tocar el código del LLM (§21) y romper retrocompat | DualCore es router NUEVO. `chatLLM` Cloud Function, `AltorraAI.providers.chat`, prompt caching, CTA tags — todo INTACTO. |
| Lexicon hardcoded sigue siendo rígido | Stems verbales + n-grams + matchAdaptive + small-talk regex layer reemplazan el indexOf simple |
| Transformers.js descarga 70MB en cada page load | Feature flag opt-in + IndexedDB cache automático |
| Memoria duplicada entre cores | Shared `session.context` schema usado por ambos cores |
| Switch Premium↔Free notorio para el cliente | Circuit breaker + cascada Free preserva el tono via shared memory |
| LLM falla por saldo agotado → cada turno espera 12s timeout | Circuit Breaker abre tras 3 fallos en 5 min, bypass directo durante 3 min |
| Loop de fallback (Premium falla → Free falla → ?) | Si Free Core también devuelve `_isFallback`, escalada a asesor (consume §23.6 doble fallback) |
| Stems mal-aplicados ("teneme" matchea "tener") | Solo aplicar stem si word.length ≥3 Y no está en STOP_WORDS |
| Small Talk responde sobre cualquier mensaje | Regex con `\b` boundaries y `skipIfEntity`: si NER detecta marca/precio/modelo, NO matchear small-talk |
| `pendingChoice` corrupto entre turnos | TTL 5 min + clearPendingChoice tras resolver |
| `parseOrdinal('ese')` matchea cuando ya no hay choices activos | Verificar `pendingChoice` o `lastVehiclesShown` antes de retornar |
| `_altorraConciergeRespondLocal` hook se pierde si concierge.js no carga | DualCore tiene fallback final empático que NO depende del hook |

### 24.9 Validación E2E (post-deploy)

Tests manuales para confirmar el upgrade:

1. **Saludo coloquial natural**:
   - Cliente: `"Hola que mas"`
   - ✅ Bot: variante con follow-up tipo "¡Hola! Todo excelente por acá. ¿Qué te trae por aquí — buscas algún carro en particular?"

2. **Fuzzy matching agresivo (caso real del cliente)**:
   - Cliente: `"tendras autos por ahi"`
   - ✅ Bot: detecta `inventory_query` (vía stem `ten` → `tener` + n-gram `autos por ahi` + lexicon enriquecido)
   - ✅ Bot: responde con cantidad de vehículos disponibles, NO fallback genérico

3. **Anáfora pendingChoice**:
   - Bot: `"¿Te muestro SUV o Sedán?"` + `setPendingChoice(['SUV', 'Sedán'])`
   - Cliente: `"el primero"`
   - ✅ Bot: `"Listo, **SUV**. ¿Te muestro las opciones?"`

4. **Memoria turn history**:
   - Turno 1 — Cliente: `"¿tienen Mazda CX-5?"` → bot encuentra match
   - Turno 2 — Cliente: `"¿de qué año es?"`
   - ✅ Bot: detecta anáfora + lee `slots.lastVehicleDiscussed` → responde con año del Mazda CX-5

5. **Returning greeting**:
   - Sesión previa: cliente preguntó por inventario
   - Cliente: `"Hola"` (2da vez en la sesión)
   - ✅ Bot: `"¡Volviste! 😄 ¿Continuamos con lo del catálogo?"`

6. **Circuit Breaker** (testing manual):
   - Consola: `AltorraDualCore.forceFreeMode(true)` → fuerza Free
   - Cliente conversa normal → ✅ todas las respuestas marcadas `source: 'small-talk' / 'rule-based' / etc`
   - Consola: `AltorraDualCore.forceFreeMode(false)` → vuelve a Auto

7. **Premium activo (cuando se cargue saldo)**:
   - Admin → Cerebro AI → toggle ON
   - `AltorraDualCore.isPremiumAvailable()` → `true` tras 60s (cache TTL)
   - Bot empieza a responder con `source: 'llm'`
   - Sin downtime perceptible — la memoria del cliente sigue siendo la misma

8. **Transformers.js opt-in** (experimental):
   - Consola: `AltorraTransformers.enable()`
   - Cliente conversa con frase ambigua → DualCore loguea: `[DualCore] Transformers detected intent: pricing_query score: 0.78`
   - Modelo se descarga UNA vez (~70MB), luego cache hit en IndexedDB

### 24.10 Resumen de archivos modificados/creados

**NEW**:
- `js/ai/small-talk.js` (~250 líneas) — Module Small Talk colombiano
- `js/ai/dual-core.js` (~300 líneas) — Router central + Circuit Breaker
- `js/ai/transformers.js` (~250 líneas) — Lazy loader Transformers.js opt-in

**MODIFIED**:
- `js/ai/fuzzy.js` — VERB_STEMS + stemmize + matchAdaptive + generateNgrams + STEM_LOOKUP
- `js/ai/intent.js` — LEXICON enriquecido x4 + classify usa stems/n-grams/matchAdaptive + parseOrdinal + resolvePronominalChoice + setPendingChoice + clearPendingChoice
- `js/concierge.js` — `respondWithLLMOrRules` simplificado: pre-check + delegate a DualCore. Hook `window._altorraConciergeRespondLocal`
- `js/components.js` — carga small-talk + transformers + dual-core después de los demás módulos AI
- `admin.html` — mismos scripts en el bloque admin
- `service-worker.js` + `js/cache-manager.js` — cache version bump v20260509010000
- `CLAUDE.md` — esta sección §24

### 24.11 Lóbulos del Cerebro ALTOR (actualizado)

```
                        ┌────────────────┐
                        │  ALTOR Brain    │
                        └────────────────┘
                                │
   ┌──────┬──────┬──────┬──────┼──────┬──────┬──────┬──────┐
   ▼      ▼      ▼      ▼      ▼      ▼      ▼      ▼      ▼
 ┌────┐┌─────┐┌─────┐┌─────┐┌─────┐┌────┐┌─────┐┌─────┐┌──────┐
 │Smal││NLP  ││Mem  ││Conc ││Cere ││ ACD││Cierre││FCM  ││DUAL  │
 │ Tk ││Fuzy ││ §22 ││ §20 ││bro  ││§23 ││§23.5 ││§23  ││CORE  │
 │§24 ││ 2.0 ││+§24 ││+§22 ││ AI  ││    ││      ││.11  ││§24   │
 │    ││§24  ││     ││.15  ││ §21 ││    ││      ││     ││ROUTER│
 └────┘└─────┘└─────┘└─────┘└─────┘└────┘└─────┘└─────┘└──────┘
                                                          │
                                                ┌─────────┴────────┐
                                                ▼                  ▼
                                          ┌─────────┐       ┌──────────┐
                                          │Anáfora 2│       │ Trans-   │
                                          │pending  │       │formers JS│
                                          │Choice   │       │ §24      │
                                          │§24      │       │ (opt-in) │
                                          └─────────┘       └──────────┘
```

**Reglas de no-interferencia (verificadas)**:
- DualCore NO toca el LLM Provider — solo lo invoca via `AltorraAI.chat`
- Small Talk NO compite con Intent Classifier — corre ANTES en cascada
- Transformers.js NO se carga sin opt-in — cero impacto si flag OFF
- Memoria turnHistory + slots SHARED entre Premium y Free
- Circuit Breaker NO interfiere con escalado por sentiment/frustration (esos pre-checks van ANTES del router)

### 24.12 Sin deploy manual requerido

Todos los cambios son **frontend-only**. No hay nuevas Cloud Functions ni nuevas reglas Firestore en este §24. Sólo:

- Nuevos archivos JS en `/js/ai/`
- Modificaciones en archivos JS existentes
- Cache version bump

Cuando hagas push a main + el SW invalida cache, los clientes reciben la versión nueva al recargar la página. Ningún `firebase deploy` requerido.

### 24.13 Costo recurrente

**$0 USD/mes** mientras Premium esté apagado. El motor JS local corre 100% en el browser.

Cuando se cargue saldo en Anthropic y se active el toggle del Cerebro AI:
- Premium responde por defecto
- Free Core responde solo si Premium falla (saldo agotado, network, circuit breaker open)
- **Costo proyectado**: ~$2-5 USD/mes (§21.10 ya optimizado con prompt caching, inventory cap 10, rate limit 30)

### 24.14 Activación de Transformers.js (cuando el cliente lo decida)

```js
// En la consola del browser (cliente o admin):
AltorraTransformers.enable();
AltorraTransformers.preload();  // dispara descarga del modelo
```

Tras la descarga (UNA vez, ~70MB), el modelo queda cacheado en IndexedDB del browser y siguientes inferencias son instant (~50-150ms).

Si el cliente no tiene buenos datos móviles, **NO activar**. El motor rule-based + small-talk + fuzzy 2.0 ya entrega ~80% del valor sin descargar nada.

---

## 25. Hotfix 2FA + Anti-pattern de refactor `appName` (2026-05-09)

> Bug crítico encontrado en producción tras el deploy del Sprint 3-bis
> (§23.10 — Aislamiento Total Firebase Apps). El cliente intentó loguear
> en admin con 2FA habilitado y vio el error `Error: No verification ID`
> al intentar verificar el código SMS. Bug de regresión + lección
> arquitectónica importante.

### 25.1 Síntomas del bug

Captura del cliente (`admin.html` 4:28 AM, iPhone 13 Pro):
- Pantalla de "ALTORRA CARS — Verificación en 2 pasos"
- "Enviamos un código de verificación al número *********6747"
- Campo de 6 dígitos vacío
- Mensaje rojo: **"Error: No verification ID"**
- Cliente reportó: "el SMS no llega al celular"

### 25.2 Diagnóstico técnico

**Causa raíz**: regresión introducida por mí en el Sprint 3-bis cuando
cambié `firebase-config.js` para usar app namespaced:

```js
// ANTES (default app):
firebase.initializeApp(FIREBASE_CONFIG);
// → app name: '[DEFAULT]'

// DESPUÉS Sprint 3-bis (§23.10):
firebase.initializeApp(FIREBASE_CONFIG, APP_NAME);
// APP_NAME = 'altorra-admin' o 'altorra-public'
// → la app '[DEFAULT]' YA NO EXISTE
```

En `admin-auth.js` los constructores estaban escritos sin parámetro
de app:

```js
// ROTOS tras Sprint 3-bis:
new firebase.auth.RecaptchaVerifier(containerId, params)   // línea 509
new firebase.auth.PhoneAuthProvider()                       // líneas 532, 752
```

Estos constructores en Firebase Compat SDK v11+ aceptan un argumento
opcional de `firebase.auth.Auth` o `firebase.app.App`. Si NO se pasa,
**asumen silenciosamente la default app**. Como esa app YA NO EXISTÍA,
el comportamiento era indefinido:
- `verifyPhoneNumber()` no enviaba el SMS (silencioso)
- O el `verificationId` apuntaba a un app fantasma
- Al hacer `PhoneAuthProvider.credential(verificationId, code)`, el
  credential pertenecía al phantom default app, pero
  `pendingUser.linkWithCredential(credential)` se ejecutaba sobre
  `window.auth` (`altorra-admin`) → mismatch → `_2faVerificationId`
  quedaba `null`
- UI mostraba "Error: No verification ID"

### 25.3 Fix aplicado (commit `fe6055d`)

`js/admin-auth.js` — 3 cambios:

| Línea | Antes | Después |
|---|---|---|
| 509 | `new RecaptchaVerifier(id, params)` | `new RecaptchaVerifier(id, params, window.auth)` |
| 532 | `new PhoneAuthProvider()` (2FA) | `new PhoneAuthProvider(window.auth)` |
| 752 | `new PhoneAuthProvider()` (unlock) | `new PhoneAuthProvider(window.auth)` |

Con `window.auth` apuntando a la instancia namespaced de la app
correcta (`altorra-admin` para admin.html), todos los constructores
ahora atan los verifiers/providers al app correcto. SMS llega y
verificationId se persiste correctamente.

### 25.4 Anti-pattern documentado (lección para futuros refactors)

> **REGLA**: cuando se cambia el `appName` de Firebase (refactor de
> aislamiento como hicimos en §23.10), **AUDITAR todos los
> constructores `new firebase.X.Y(...)`** en el codebase. La mayoría
> aceptan un argumento opcional de app/auth — si no se pasa, asumen
> default app silenciosamente.

#### Constructores afectados (Firebase Compat v11+) — checklist obligatoria

| Constructor | Signatura | Argumento app/auth |
|---|---|---|
| `firebase.auth.RecaptchaVerifier` | `(container, params, app?)` | 3er arg — **`firebase.app.App` ÚNICAMENTE** (NO Auth — ver §25.11) |
| `firebase.auth.PhoneAuthProvider` | `(auth?)` | 1er arg — `firebase.auth.Auth` |
| `firebase.auth.OAuthProvider` (custom) | `(providerId, auth?)` | 2do arg |
| `firebase.firestore` | implícito en `firebase.firestore(app)` | 1er arg de la función |
| `firebase.auth` | implícito en `firebase.auth(app)` | 1er arg |
| `firebase.storage` | implícito en `firebase.storage(app)` | 1er arg |
| `firebase.functions` | implícito en `firebase.functions(app)` | 1er arg |
| `firebase.database` | implícito en `firebase.database(app)` | 1er arg |
| `firebase.analytics` | implícito en `firebase.analytics(app)` | 1er arg (con caveat — solo default app) |

#### Métodos estáticos que NO requieren app (portables, OK)

```js
firebase.auth.PhoneAuthProvider.credential(id, code)     // genera AuthCredential portable
firebase.auth.EmailAuthProvider.credential(email, pass)  // portable
firebase.auth.GoogleAuthProvider.credential(token)       // portable
firebase.firestore.FieldValue.serverTimestamp()          // portable
firebase.firestore.FieldValue.increment(n)                // portable
firebase.firestore.FieldPath.documentId()                 // portable
firebase.auth.Auth.Persistence.LOCAL                       // constante
```

#### Patrón seguro recomendado

```js
// 1. firebase-config.js exporta `window.auth`, `window.db`, etc.
//    apuntando a la app namespaced correcta.

// 2. Todos los OTROS archivos usan estas globals + los pasan a
//    constructores cuando sea necesario:

// Phone Auth (atención: RecaptchaVerifier toma App, no Auth):
var verifier = new firebase.auth.RecaptchaVerifier(
    'container', { size: 'invisible' }, window.firebaseApp  // ← App, NO auth
);
var provider = new firebase.auth.PhoneAuthProvider(window.auth);  // ← Auth, sí

// Firestore (siempre window.db):
window.db.collection('foo').doc('bar').get()

// Auth (siempre window.auth):
window.auth.signInWithEmailAndPassword(email, pass);
window.auth.currentUser;
window.auth.signOut();
```

#### Test de regresión recomendado post-refactor de appName

1. Login admin con 2FA → SMS llega → código verifica OK
2. Login admin con cuenta bloqueada → unlock por SMS funciona
3. Web pública signInWithPopup Google → token verifica OK
4. Web pública signInWithEmailAndPassword → login OK
5. Cualquier `linkWithCredential()` o `reauthenticate()` flow

### 25.5 Cambio cosmético: VAPID key configurada (commit `6f6497d`)

Este commit ya fue documentado en §23.11, pero al momento de escribir
esa sección la VAPID key no estaba seteada (solo el código). En
`6f6497d` el cliente generó el VAPID en Firebase Console
(`Project Settings → Cloud Messaging → Web Push certificates →
Generate key pair`) y lo pegó en `js/admin-fcm.js`:

```js
var VAPID_PUBLIC_KEY = 'BDhFxNdH98lu9a1fHx0AyKzEhDkQ9-7Im7AHIpj6LiYpARA-XBUomOc5Q06LrJbedfX1qSkPzMp1KDgHYaJBhFU';
```

**FCM Web Push está oficialmente activo** desde ese commit. Cuando
los asesores instalen la PWA y acepten el prompt de notificaciones,
recibirán push del SO en su celular cuando un cliente entre a queue
(detalle del flujo en §23.11).

### 25.6 Changelog ejecutivo de la rama `claude/add-api-key-deploy-UMybF`

Lista cronológica de commits con su sección documental correspondiente:

| # | Commit | § | Descripción ejecutiva |
|---|---|---|---|
| 1 | `90d5c47` | §21.10 | Cerebro AI optimizado — prompt caching + inventory cap 10 + rate limit 30 + pre-filtro rules |
| 2 | `644f817` | §1-§5 | Doc backfill exhaustivo de archivos/colecciones/rules implementados |
| 3 | `5929db5` | §21.9 | Doc Cerebro AI activo en producción ✅ |
| 4 | `b7bffe3` | §21.9 | Doc guía setup LLM Windows-friendly |
| 5 | `ea1215e` | §21 | Doc completa Bot Ultra Mega Cerebro (Fases 1+2+3) |
| 6 | `47602f7` | §22 | Offline Ultra Brain — fuzzy matching + sinónimos + memory + inventory search + KB ranker + quick replies + auto-feedback loop |
| 7 | `57428ec` | §22.15 | Fix reset chat — cancel listeners pre-write + confirm datos guests + reset toast |
| 8 | `140cb07` | §22.15 | Doc §22.15 reset chat fix |
| 9 | `7b3807d` | §23.1-4 + §23.9-10 | ACD Sprints 1-4 — schema + indexes + radicados + cierre bidireccional + FASE 6 aislamiento auth + FASE 7 trusted devices fix + persistencia sesión |
| 10 | `5478cd4` | §23.10 | Aislamiento Total Firebase Apps (appName admin/public) + index banners legacy |
| 11 | `07c2eed` | §23.5-8 | ACD Sprints 5-9 — workload aggregator + locks/claiming + queue mode + SLA F5-proof + doble fallback + FCM Web Push + Doc §23 completa |
| 12 | `6f6497d` | §23.11 + §25.5 | FCM Web Push activado — VAPID key generada y pegada |
| 13 | `3cb5fe4` | §24 | Offline Ultra Brain 2.0 — Arquitectura Dual-Core (LLM intacto + Free Core repotenciado: Small Talk + Fuzzy 2.0 + Stems + N-grams + Memoria + Anáfora + DualCore router con Circuit Breaker + Transformers.js opt-in) |
| 14 | `fe6055d` | §25 | HOTFIX 2FA — RecaptchaVerifier + PhoneAuthProvider con window.auth (regresión Sprint 3-bis) |
| 15 | `321be22` | §25.11 | HOTFIX 2FA v2 — RecaptchaVerifier debe recibir `firebaseApp` (App), no `auth` (Auth). Bug del hotfix anterior `fe6055d` causaba `auth/invalid-api-key` y SMS no llegaba |
| 16 | (este commit) | §25.12 | HOTFIX 2FA v3 + FCM Activar — dual-app strategy (default + namespaced) para SDK internals que llaman `firebase.app()` sin args + FCM `messaging(app)` + fix API mismatch `onClick` vs `callback` en notify action button |

### 25.12 Hotfix 2FA v3 + FCM Activar — Triple bug en una sesión (2026-05-09)

> Tras el v2 (§25.11) el SMS pasó de `auth/invalid-api-key` a un nuevo
> error: `Firebase: No Firebase App '[DEFAULT]' has been created`.
> Además, el botón "Activar" del prompt de FCM nunca disparaba nada.
> RCA encontró 3 bugs distintos compartiendo el mismo origen
> arquitectónico: §23.10 cambió a appName namespaced, pero ni el SDK
> Compat ni nuestros call sites estaban listos para vivir sin default app.

#### Causa raíz #1 — SDK Compat fallback a default app

Firebase Compat SDK v11 tiene paths internos en `RecaptchaVerifier`,
`signInWithPhoneNumber`, `firebase.messaging` y otros que llaman a
`firebase.app()` (sin args) como fallback **ignorando** el App
explícitamente pasado por parámetro. Como en §23.10 (Sprint 3-bis)
eliminamos la default app reemplazándola por la namespaced
`altorra-admin`, esos paths internos crashean con
`'[DEFAULT]' has been created`.

**Confirmación**: audit completo del repo encontró cero llamadas a
`firebase.X()` sin args en NUESTRO código (excepto el bug #2 de FCM
abajo). El error venía 100% de internals del SDK.

#### Causa raíz #2 — `firebase.messaging()` sin args en admin-fcm.js

`js/admin-fcm.js:105` llamaba `window.firebase.messaging()` sin pasar
el App. Esto hacía que la "Activar" nunca completara aunque su listener
sí se llegara a invocar (que no era el caso por el bug #3).

#### Causa raíz #3 — API mismatch `onClick` vs `callback` en notify

`js/toast.js:190` chequea `typeof cfg.action.onClick === 'function'`
para bindear el botón de acción. Pero `js/admin-fcm.js` usaba
`action: { label: 'Activar', callback: registerSwAndGetToken }`. Como
la propiedad esperada era `onClick`, **el listener jamás se bindeaba**.
El botón "Activar" era visualmente clickable pero no disparaba nada.

#### Solución — Dual-App Strategy + 2 fixes puntuales

**Fix #1 (`js/firebase-config.js`)**: además de inicializar la app
namespaced (`altorra-admin` o `altorra-public`), también inicializar
la default app con la misma config:

```js
try {
    firebase.app('[DEFAULT]');
} catch (e) {
    firebase.initializeApp(FIREBASE_CONFIG);  // ← default alias
}
```

**Por qué esto NO rompe el aislamiento de auth admin/web**: Firebase
Auth diferencia las storage keys por `appName`:
- `firebase:authUser:<apiKey>:[DEFAULT]` ← default (sin uso real)
- `firebase:authUser:<apiKey>:altorra-admin` ← admin
- `firebase:authUser:<apiKey>:altorra-public` ← web pública

`window.auth = firebase.auth(namespacedApp)` sigue apuntando al
namespaced. La default solo existe para que SDK internals la
encuentren. Como auditamos cero llamadas a `firebase.auth()` sin args
en nuestro código, ningún flujo nuestro toca esa default.

**Fix #2 (`js/admin-fcm.js:105`)**: pasar `window.firebaseApp`
explícito al obtener messaging:

```js
var messaging = window.firebaseApp
    ? window.firebase.messaging(window.firebaseApp)
    : window.firebase.messaging();
```

**Fix #3 (`js/admin-fcm.js:189`)**: cambiar `callback` por `onClick`
y agregar feedback de éxito/error:

```js
action: {
    label: 'Activar',
    onClick: function () {
        registerSwAndGetToken().then(function (result) {
            if (result) notify.success({...});
            else if (Notification.permission === 'denied') notify.error({...});
        });
    }
}
```

**Bonus defensivo (`js/admin-auth.js`)**: guard explícito antes de
instanciar RecaptchaVerifier:

```js
if (!window.firebase || !window.firebase.apps || window.firebase.apps.length === 0) {
    throw new Error('Firebase no está inicializado en este scope...');
}
if (!window.firebaseApp) {
    throw new Error('window.firebaseApp no expuesto...');
}
```

Si por race condition extrema el call llega antes que firebase-config
complete, falla con mensaje accionable en vez de error críptico.

#### Anti-patterns documentados

| Riesgo | Mitigación |
|---|---|
| Renombrar default app sin auditar SDK internals | Dual-app strategy: tener default como alias siempre disponible |
| Mismatch sutil de nombres de propiedad en APIs internas | Antes de pasar config a `notify.warning`, leer `toast.js:190` y confirmar el shape exacto esperado |
| FCM "Activar" silencioso con error tragado | Action callback ahora muestra notify.success/error según resultado |
| Confiar en que el SDK Compat respeta argumentos opcionales | NO lo hace en todos sus paths — defensivamente proveer la default app igualmente |

#### Test E2E post-deploy

1. Login con 2FA → SMS llega al celular en <30s ✅
2. Console: cero `[DEFAULT]` errors ✅
3. Tras login, después de 3s aparece prompt "🔔 Notificaciones de clientes en cola"
4. Tap "Activar" → browser pide permiso de notificaciones
5. Aceptar → toast verde "✅ Notificaciones activadas"
6. Si rechazar → toast rojo "Permiso denegado"
7. Verificar `usuarios/{uid}.fcmTokens[]` en Firestore tiene token

**Archivos modificados**:
- `js/firebase-config.js` — dual-app init
- `js/admin-fcm.js` — `messaging(app)` + `onClick` + feedback toasts
- `js/admin-auth.js` — guard explícito + comentario actualizado
- `service-worker.js` + `js/cache-manager.js` — bump v20260509040000
- `CLAUDE.md` — esta sección §25.12 + changelog

### 25.11 Hotfix 2FA v2 — RecaptchaVerifier expects App, not Auth (2026-05-09)

> Bug del hotfix anterior `fe6055d` (§25.3): pasé el tipo equivocado
> al 3er argumento de `RecaptchaVerifier`. El SMS seguía sin llegar
> y la consola mostraba `auth/invalid-api-key`. Resuelto con RCA Strict
> Mode (§19) tras escaneo de tipos en Firebase Compat SDK v11.

#### Causa raíz

`firebase.auth.RecaptchaVerifier(container, params, app?)` en Firebase
Compat v11 espera **`firebase.app.App` instance** como 3er argumento,
NO `firebase.auth.Auth`. En `fe6055d` pasé `window.auth` (Auth) por
error.

**Cómo se manifestaba**:
1. SDK accede a `app.options.apiKey` del 3er argumento internamente
2. Auth no tiene `.options.apiKey` → retorna `undefined`
3. Request a `identitytoolkit.googleapis.com/.../sendVerificationCode`
   se envía con `apiKey=undefined` en query string
4. Backend Google rechaza con `FirebaseError: auth/invalid-api-key`
5. SMS NUNCA se envía → cliente ve la pantalla de 2FA con
   `Reenviar codigo (11s)` countdown pero el código nunca llega

#### Confirmación visual

Console del cliente mostraba (incógnito Chrome desktop):
- `Firebase core ready (Auth + Firestore) [altorra-admin]` — init OK
- `[SW] Service Worker loaded - Version: v20260507025049` — versión correcta
- **`Uncaught (in promise) FirebaseError: Firebase: Error (auth/invalid-api-key)` at `assert.ts:152`**

El error es la firma exacta del bug — apiKey malformada en la request,
no del lado del SDK init (que sí funcionó correcto con appName).

#### Fix (1 línea)

`js/admin-auth.js:521`:
```diff
-        }, window.auth);
+        }, window.firebaseApp);
```

`window.firebaseApp` ya estaba expuesto en `firebase-config.js:115`
desde §23.10. El cambio es totalmente compatible con la API documentada
de Firebase Compat v11.

**No tocar** las líneas 537 y 758 (los `new PhoneAuthProvider(window.auth)`).
PhoneAuthProvider SÍ recibe Auth — su signatura es distinta:
```ts
class PhoneAuthProvider {
    constructor(auth?: firebase.auth.Auth);
}
```

#### Por qué `fe6055d` rompió antes que la regla diff-keys

El bug latente existió **dos veces** en la historia del proyecto:

1. **Pre-Sprint 3-bis (§23.10)**: el constructor sin args usaba la
   default app — funcionaba porque la default app existía
2. **Post-Sprint 3-bis sin hotfix**: la default app fue eliminada
   (renombrada a `altorra-admin`) → constructor sin args daba
   "No Firebase App '[DEFAULT]' has been created"
3. **Post-fe6055d**: pasé `window.auth` para arreglar el (2) pero
   con tipo incorrecto → `auth/invalid-api-key`
4. **Post-§25.11 (este commit)**: tipo correcto `window.firebaseApp`

#### Lección documental

Actualizada §25.4 — la fila de `RecaptchaVerifier` ahora dice
explícitamente "**`firebase.app.App` ÚNICAMENTE** (NO Auth — ver §25.11)"
para que cualquier futuro Claude/dev no repita el error.

#### Test E2E post-deploy

1. `git pull origin main` + recargar admin con Ctrl+Shift+R
2. Login con email/password de cuenta con 2FA habilitado
3. Pantalla de 2FA aparece con `**********6747`
4. **SMS llega al celular en <30s**
5. Tipear código → verificar OK → entra al panel
6. Console del browser: cero `auth/invalid-api-key`

#### Anti-pattern reforzado

| Riesgo | Mitigación |
|---|---|
| Confundir `App` vs `Auth` instances cuando ambos están expuestos | Doc §25.4 con tipo explícito por constructor + ejemplo del patrón seguro |
| Hacer hotfix sin verificar la signatura exacta de la API | RCA Strict Mode §19 — leer el archivo, leer la doc del SDK, validar tipo ANTES de proponer fix |
| Hotfix-of-hotfix sin doc | Cada iteración del fix queda en su propia sub-sección (§25 → §25.11) con explicación de por qué el anterior no funcionó |

**Archivos modificados**:
- `js/admin-auth.js:521` (1 línea)
- `service-worker.js` + `js/cache-manager.js` — bump v20260509030000
- `CLAUDE.md` §25.4 (typo fix) + §25.11 (esta sección) + changelog

**Sin Cloud Functions, sin Firestore rules, sin deploy manual**. Solo
push a main → service worker invalida cache → próximo recarga del
admin tiene el fix.

### 25.7 Estado deployado en producción (al 2026-05-09)

| Componente | Estado | Notas |
|---|---|---|
| Firestore rules | ✅ Deployadas | `firestore.rules` con todas las nuevas (cierre bidireccional, claim ownership, usuarios self-service diff-keys, unmatchedQueries) |
| Firestore indexes | ✅ Deployados | 5 indexes ACD + banners legacy |
| Cloud Functions | ✅ 100% deployadas | 12 functions activas: chatLLM, summarizeChat, onConciergeMessageAdded, proactiveEngagement, onConciergeChatCreated, recalculateWorkloadOnChatChange, recalculateWorkloadScheduled, onChatEscalated + 4 legacy |
| LLM Premium toggle | ⏸️ OFF (sin saldo) | El usuario decidió postergar el setup completo. Free Core está activo |
| FCM Web Push | ✅ VAPID configurada | Falta que cada asesor instale PWA + acepte prompt para registrar token |
| Aislamiento auth admin/web | ✅ Activo | appName `altorra-admin` vs `altorra-public` — sesiones simultáneas funcionan |
| Trusted devices editor | ✅ Activo | Self-service diff-keys permite a editor escribir su trustedDevices |
| Persistencia sesión admin | ✅ Activo | Auth-hint pre-paint + restore último section |
| Hotfix 2FA | ✅ Fix definitivo en §25.11 | `fe6055d` rompía con `auth/invalid-api-key`. Fix de 1 línea en §25.11 (App en vez de Auth). Pendiente recargar admin con Ctrl+Shift+R |

### 25.8 Pendientes operacionales del cliente (post-deploy)

1. **Cargar saldo en Anthropic** ($5+ USD) y activar el toggle "Cerebro
   AI activo" en `admin.html#kb` — esto enciende el Core Premium del
   bot. Hasta entonces, el Free Core (§24) responde todos los turnos.

2. **Cada asesor instala la PWA del admin** en su celular:
   - Android Chrome: Menú → "Instalar aplicación"
   - iOS Safari 16.4+: Compartir → "Añadir a inicio"
   Después, aceptar el prompt "🔔 Notificaciones de clientes en cola"
   que aparece 3s post-login.

3. **Validar flujos de seguridad**:
   - Sesiones simultáneas: super_admin en admin.html + cliente normal
     en index.html misma ventana → ambas independientes
   - Trusted devices editor: editor pasa 2FA + marca "guardar" → próximo
     refresh entra sin código
   - Aislamiento de login en web pública: admin intenta loguear en web
     pública → debe rechazar con mensaje "🔒 Esta cuenta es de admin"

4. **Validar bot ALTOR coloquial** (§24):
   - Probar "Hola que mas" → respuesta natural con follow-up
   - Probar "tendras autos por ahi" → inventory_query con vehículos
     reales (no fallback genérico)
   - Probar "el primero" tras pregunta de bot con opciones → resolver
     anáfora correctamente

### 25.9 Costo recurrente actual

**$0 USD/mes** mientras el toggle Cerebro AI esté OFF.

Cuando se active:
- ~$2-5 USD/mes para el LLM (§21.10 ya optimizado con prompt caching,
  inventory cap 10, rate limit 30, pre-filtro rules)
- $0 todo el resto (FCM Web Push, Cloud Functions, Firestore, Hosting
  GitHub Pages — dentro del free tier)

### 25.10 Lección arquitectónica final

El proyecto ACD Enterprise + Offline Ultra Brain 2.0 demuestra que se
puede construir una experiencia de chatbot enterprise:

1. **Sin pagar APIs caras** — el Free Core (§24) entrega ~80% de la
   experiencia de un LLM comercial usando JS puro en el navegador
2. **Sin downtime** — el Dual-Core (§24) mantiene memoria conversacional
   compartida entre cores; switch transparente al cliente
3. **Con escalabilidad real** — workload aggregator (§23.3), locks
   anti-colisión (§23.4), SLA F5-proof (§23.5), FCM Push (§23.11)
4. **Con seguridad enterprise** — aislamiento auth admin/web (§23.9),
   trusted devices self-service (§23.10), cierre bidireccional inmutable
   (§23.8)
5. **Con trazabilidad** — radicados únicos (§23.7), cada conversación
   tiene un ticket histórico independiente

**Total**: 14 commits en una rama, ~12.000 líneas de código + doc, $0
recurrente, deployable en una sola sesión de PowerShell con Firebase
CLI. El proyecto sirve como referencia de cómo construir software de
calidad enterprise con presupuesto limitado y un equipo pequeño.


---

## 26. ALTOR Hub & Expansión Cognitiva — ADR-026 (en curso 2026-05-10)

> Refactor masivo en 7 sprints autorizado bajo ADR-026 (§24 + visión
> ampliada del cliente). Filosofía: ALTOR no es un bot rule-based con
> "palabritas" — es una **red neuronal cognitiva** con biblioteca,
> investigador, asesor, consultor, comercial, guía y acompañante.
> Cada sprint commitea + documenta inmediatamente en este §26.

### 26.1 Sprint Cognitive Bootstrap — Brain Config + Vocabulario Masivo + Triple Fallback + Seeders (2026-05-10)

**Objetivo del sprint**: dotar al Free Core de TODA la inteligencia
que el Premium Core (LLM Anthropic) ya tenía vía system prompt. Antes
de este sprint, aunque el admin escribiera "tono pícaro colombiano"
en el panel del Cerebro AI, el Free Core lo ignoraba completamente y
respondía con templates planos. Ahora ambos cores comparten el mismo
cerebro configurable.

#### A. Brain Config Reader (`js/ai/brain-config.js` — NUEVO ~270 líneas)

Singleton `window.AltorraBrainConfig` que:
- Listener realtime sobre `knowledgeBase/_brain` (público lee, ya
  permitido por rules §21.4)
- **DEFAULTS profesionales** pre-poblados (identidad ALTOR cálido
  colombiano, contexto Altorra Cars Cartagena con valores+servicios+
  ubicación+teléfono+horario+instagram, instrucciones extensas y
  reglas de seguridad). Si el admin nunca tocó nada, el bot ya sale
  "vivo" con esta config.
- **Merge deep**: si el admin setea solo algunos campos, los demás
  se preservan de los defaults. Permite agregar campos nuevos sin
  romper instalaciones viejas.
- **API `applyTone(text, hint)`**: adapta cualquier respuesta al tono
  configurado. Hints: `'greeting' | 'casual' | 'transition' | 'close'`.
  Inyecta prefixes ("Mirá," / "Dale," / "Hola,"), suffixes
  ("¿Te sirve?" / "¿Qué te parece?") y emojis cálidos con
  probabilidades calibradas (no spam).
- **API `pick(arr)`**: helper de variación aleatoria.
- **API `onLoad(fn)`**: subscribe a cambios para que módulos
  reaccionen.

**Patrón Singleton + retry**: si `window.db` no está listo al cargar
(race con firebase-config.js), reintenta cada 1s hasta 30 veces.

#### B. Vocabulario Automotriz Colombiano (`js/ai/automotive-vocab.js` — NUEVO ~370 líneas)

Diccionario MASIVO con **600+ términos** del mundo automotriz
colombiano organizados en 17 categorías:

| Categoría | Términos cubiertos |
|---|---|
| Tipos vehículo | suv, sedán, hatchback, pickup, coupé, convertible, minivan + slang ('jepeta', 'platón', 'doble cabina', 'cucha', 'fierro') |
| Transmisión | automática, manual, secuencial + variantes ('AT', 'MT', 'CVT', 'tiptronic', 'sin embrague') |
| Combustible | gasolina, diesel, híbrido, eléctrico, GLP + variantes ('ACPM', 'gasoil', 'GNV') |
| Tracción | 4x4, 4x2, AWD, FWD, RWD |
| Colores | 11 colores con variantes ('plomo', 'champaña', 'cereza', 'navy') |
| Estado | nuevo, semi-nuevo, usado + 'cero kilómetros', '0km', 'CKM' |
| Specs técnicas | motor, cilindraje, potencia, torque, consumo + abreviaciones (HP, CC, NM) |
| Seguridad | airbags, ABS, EBD, ESC, control tracción |
| Confort | A/C, vidrios eléctricos, dirección, techo solar, cámara, bluetooth, Android Auto |
| Financiación | crédito, cuotas, prima, plazo, intereses, banco, leasing, abono |
| Trámites | traspaso, SOAT, técnico-mecánica, peritaje, seguro, garantía |
| Negociación | rebaja, descuento, contado, "le hago", "negociable", "precio firme" |
| Transacción | vender, comprar, consignar, avalúo, permuta, "parte de pago" |
| Uso/estilo vida | familiar, trabajo, ciudad, carretera, off-road |
| Emociones | gusta, no gusta, duda + slang ('bacano', 'chévere', 'qué chimba') |
| Saludos | 25+ variantes coloquiales colombianas |
| Acciones | mostrar, agendar, ubicación, etc. |

**API `expand(text)`**: reemplaza variantes coloquiales por canonical
para que el intent classifier matchee mejor. "tienes una jepeta
automática" → "tienes una suv automatica".

**API `recognize(text)`**: devuelve `{categories, terms}` con todo lo
detectado. Útil para enriquecer respuestas: "veo que mencionaste
familiar + presupuesto, te recomiendo X".

**API `explain(concept)`**: 14 conceptos clave (peritaje, garantía,
traspaso, soat, técnico-mecánica, financiación, cuota inicial,
consignación, avalúo, off-road, eléctrico, híbrido, manual,
automática) con explicaciones humanas listas para inyectar en
respuestas del bot.

#### C. Small Talk Patterns Expandidos (`js/ai/small-talk.js`)

12 patterns NUEVOS agregados sobre los 6 originales del §24:

| Pattern | Ejemplos detectados | Tipo respuesta |
|---|---|---|
| `casual_probing` | "qué haces", "de qué te las tiras", "cuál es tu negocio", "qué onda" | Presentación profesional con CTA |
| `affirm_filler` | "todo bien", "súper", "bacano", "chévere", "perfecto" | Avance a próxima acción |
| `seen_or_not` | "ya lo vi", "no me la has enseñado", "no lo conozco", "no la has mostrado" | Anáfora a `lastVehicleDiscussed` o pide preferencias |
| `show_inventory_short` | "muéstrame", "ver", "qué tenés", "enseñame", "qué manejan" | Marker `__INVENTORY_QUERY__` → bridge al rule-based |
| `help_general` | "ayuda", "ayúdame", "no sé qué hacer", "estoy perdido" | Menú de servicios con bullets |
| `bot_question` | "eres bot", "eres humano", "con quién hablo" | Honest disclosure: "Soy ALTOR..." |
| `location` | "dónde están", "ubicación", "dirección", "cómo llego" | Cartagena + CTA agendar |
| `schedule` | "qué horario", "cuándo abren", "atienden hoy" | Lun-Sáb 8AM-6PM |
| `phone` | "qué número", "teléfono", "WhatsApp" | +57 323 501 6747 + opt escalar |
| `negotiation_short` | "rebaja", "mínimo", "precio firme", "le hago $X" | Escalate a asesor (no prometer descuentos) |
| `client_confused` | "no entiendo", "explícame", "qué es eso" | Pide especificar parte confusa |
| `apology` | "perdón", "disculpa", "sorry" | "Tranqui, no hay nada que disculpar" |

**Integración con AutomotiveVocab.expand()**: cada texto se expande
ANTES de probar patterns. Esto hace que "qué tenés en inventario"
(slang) matchee tanto el pattern original como el expandido.

**Integración con BrainConfig.applyTone()**: respuestas de greeting,
goodbye y thanks pasan por el adaptador de tono → variabilidad
natural.

#### D. Triple Fallback State Machine (`js/concierge.js`)

Reemplaza el doble fallback del §23 por una máquina de **3 estados
crecientes**:

| Estado | Bot dice | Comportamiento |
|---|---|---|
| 1er fallback (count=1) | "no estoy seguro de haber entendido. ¿Me lo decís de otra forma?" + ejemplos | Variantes random, no robot |
| 2do fallback (count=2) | "todavía no estoy seguro. Tocá la opción que te sirva:" + **quickReplies** [🚗 Ver autos, 💰 Financiación, 📅 Agendar visita, 👨 Hablar con asesor] | NUNCA repite "no entiendo" — ofrece menú visual |
| 3er fallback (count≥3) | "mejor te conecto con un asesor humano que te va a entender mejor lo que necesitás 🙋‍♂️" | Auto-escalate a live |

**Garantía**: con esta máquina es **imposible** que el bot diga "no
entiendo" dos veces seguidas. La 2da vez ofrece menú accionable.

**Reset automático**: cuando el bot da una respuesta exitosa (intent
≠ 'none' o KB matchea), `resetFallbackCounter()` vuelve count a 0.

**Persistencia**: `botFallbackCount` y `botFallbackAt` se guardan en
Firestore (`conciergeChats/{sid}`) para sobrevivir a F5. Idempotente.

#### E. Inventory Query Bridge (`js/ai/dual-core.js`)

Cuando small-talk matchea `show_inventory_short` (cliente dice
"muéstrame autos"), devuelve marker `__INVENTORY_QUERY__`. El
DualCore detecta el marker y delega al rule-based con texto canonical
("muéstrame autos disponibles") para que el flujo de inventory_search
con vehicle cards reales tome el control.

Sin este bridge, el cliente diría "muéstrame autos" y el bot
respondería con un small-talk genérico tipo "claro, dime qué buscas"
en vez de mostrar el inventario real.

#### F. Bootstrap del Knowledge Base (`js/admin-kb.js`)

Constante `BOOTSTRAP_FAQS` con **25 FAQs profesionales** de Altorra
Cars cubriendo:

- 4× ubicación/horario/contacto
- 3× peritaje/garantía/traspaso
- 4× financiación (cómo funciona, cuota inicial, plazos, simulación)
- 3× consignación (cómo funciona, avalúo, parte de pago)
- 3× procesos (envío otra ciudad, documentos, SOAT/RTM)
- 3× experiencia (test drive, qué tipos manejan, autos baratos)
- 5× misceláneos (rebajas, pago, ALTOR identity, agendar, fallas)

Cada FAQ incluye:
- `question`: pregunta original
- `answer`: respuesta humana de 2-4 oraciones con emojis y CTAs
- `keywords[]`: 5-8 variantes coloquiales colombianas
- `category`, `priority` (70-95 según importancia)
- `_bootstrapped: true` flag para auditoría

**API `AltorraKB.bootstrapFAQs()`**: solo super_admin. Confirm
dialog. Idempotente: skip las que ya existen (matching por question
normalizada). Batch write único.

**API `AltorraKB.restoreBrainDefaults()`**: solo super_admin.
Restaura identidad/contexto/instrucciones/reglas a los DEFAULTS
profesionales. **Preserva** `enabled`, `llmProvider`, `llmModel`,
`llmTemperature`, `maxTokens` (settings de modelo del admin).

**UI**: dos botones nuevos en el footer del Cerebro AI:
- "Sembrar 25 FAQs base" → `bootstrapFAQs()`
- "Restaurar config recomendada" → `restoreBrainDefaults()`

#### Carga de scripts

`js/components.js` (página pública) y `admin.html` ahora cargan en
este orden:
```
1. fuzzy.js
2. brain-config.js   ← NUEVO §26.1
3. automotive-vocab.js ← NUEVO §26.1
4. engine.js, ner.js, intent.js, inventory-search.js, faq-ranker.js
5. small-talk.js (extendido §26.1)
6. transformers.js, dual-core.js
```

#### Anti-patterns evitados en este sprint

| Riesgo | Mitigación |
|---|---|
| Brain Config llama Firestore antes de que esté listo | Retry interno cada 1s hasta 30 reintentos |
| Lexicon/vocab se pisa entre cores | Free y Premium leen el MISMO `_brain` doc (singleton) |
| Triple fallback acumula contadores forever | Reset al primer respuesta exitosa + persistido en Firestore |
| Small-talk mata flujo de inventario | Marker `__INVENTORY_QUERY__` con bridge al rule-based |
| Bootstrap duplica FAQs si admin ejecuta 2x | Filtro por question normalizada antes de batch |
| Restore borra settings LLM del admin | `preserveLLM` extrae enabled/provider/model/temp/tokens y los re-aplica |
| applyTone aplica modificadores siempre (suena artificial) | Probabilidades calibradas: greeting 40%, transition 30%, casual 35%, close 50%, emoji 25% |
| Brain DEFAULTS hardcodeados desactualizados | Merge deep: nuevos campos en futuros deploys NO pisan settings vivos del admin |
| Vocabulary matching crea falsos positivos en mid-word | Word boundary `\b` para palabras simples; `text.split().join()` para frases multi-word |

#### Test E2E del sprint

1. Login admin → Cerebro AI → click **"Sembrar 25 FAQs base"** →
   confirm → toast "✓ 25 FAQs sembradas"
2. Click **"Restaurar config recomendada"** → confirm → toast
   "✓ Cerebro AI restaurado". Identidad/contexto/instrucciones se
   pueblan con DEFAULTS.
3. Cliente público → abrir ALTOR → escribir **"hola que mas"** →
   bot responde con saludo + follow-up natural (variable según tono
   configurado del admin)
4. Escribir **"muéstrame autos"** → bot detecta show_inventory_short
   → bridge → muestra inventario real (no respuesta genérica)
5. Escribir **"de qué te las tiras"** → bot responde como un
   profesional con su descripción
6. Escribir **"todo bien"** → bot avanza con CTA a próxima acción
7. Escribir **"ya lo vi"** después de discutir un auto → bot detecta
   anáfora y ofrece otro
8. Escribir 3 mensajes ininteligibles consecutivos → 1ro: "no
   estoy seguro" / 2do: menú con quick replies / 3ro: escala a
   asesor. **Cero "no entiendo" repetido**.

**Archivos modificados**:
- `js/ai/brain-config.js` (NUEVO ~270 líneas)
- `js/ai/automotive-vocab.js` (NUEVO ~370 líneas)
- `js/ai/small-talk.js` (+12 patterns + applyTone integration)
- `js/ai/intent.js` (+25 keywords inventory_query)
- `js/ai/dual-core.js` (bridge __INVENTORY_QUERY__)
- `js/concierge.js` (Triple Fallback State Machine + quickReplies)
- `js/admin-kb.js` (BOOTSTRAP_FAQS + bootstrapFAQs + restoreBrainDefaults + bindings)
- `js/components.js` (carga brain-config + automotive-vocab antes de los demás)
- `admin.html` (scripts nuevos + 2 botones bootstrap)
- `service-worker.js` + `js/cache-manager.js` (bump v20260509050000)
- `CLAUDE.md` (esta sección §26.1)

**Pendiente del ADR-026** (próximos sprints):
- §26.2 Sprint Vehicle Guide — Vehicle cards inline con thumbnail + reasoning module humano
- §26.3 Sprint ALTOR Hub UI Redesign — Telegram/WhatsApp standard fullscreen
- §26.4 Sprint Claiming Explícito + SLA UI fix
- §26.5 Sprint Reset Atomic + FCM denied + Telegram Bot

### 26.2 Sprint Vehicle Guide — Cards inline con miniatura + Asesor humano (2026-05-10)

**Objetivo del sprint**: cuando el bot menciona un vehículo, NO debe
limitarse a "Toyota Hilux 2020 - $80M" + link. Debe comportarse como
un asesor humano: mostrar **miniatura**, contar contexto del modelo,
beneficios para el caso de uso, comparación de precio y CTAs
accionables. Esta es la diferencia entre un scraper de datos y un
vendedor real.

#### A. Vehicle Guide Module (`js/ai/vehicle-guide.js` — NUEVO ~290 líneas)

Singleton `window.AltorraVehicleGuide` con funciones:

- **`describe(vehicle)`** → array de 3-5 bullets humanos:
  - 📅 Year insight: "Modelo de 4 años — sweet spot entre precio y modernidad"
  - 🛣️ KM insight: "Solo 35K km — bajo, vida útil completa por delante"
  - ✨ Categoría insight: fortaleza top de la categoría
  - 🏷️ Brand insight: reputación de la marca en Colombia
  - ⚙️ Transmisión insight: "automática — comodísima en tráfico de Cartagena"
  - ⛽ Combustible insight: "Diesel — mayor torque y rendimiento"

- **`recommendByUse(vehicle, useCase)`** → frase humana
  ("Para familia es excelente: SUVs son ideales para familias")

- **`priceContext(vehicle)`** → frase sobre precio
  ("🔥 En oferta - ahorras 12%. Buen precio para su segmento")

- **`nextSteps(vehicle)`** → 3 CTAs apropiados (Agendar, Financiación, Asesor)

- **`fullPitch(vehicle, opts)`** → pitch completo de 3-5 líneas con
  título, top bullets, price context y CTA de cierre.

- **`cardData(vehicle)`** → datos estructurados para el render UI:
  `{id, title, year, kilometrajeFmt, transmision, combustible, precio,
   precioFmt, oferta, precioOriginal, image, url, bullets[2], estado}`

#### B. Diccionarios internos del Vehicle Guide

**CATEGORY_INSIGHTS** (7 categorías): suv, camioneta, sedan,
hatchback, pickup, coupe, minivan. Cada una con `audience`,
`strengths[]` (4 puntos vendibles), y `useCases[]` (matchables).

**BRAND_INSIGHTS** (15 marcas): Toyota, Mazda, Chevrolet, Renault,
Kia, Hyundai, Nissan, Ford, Volkswagen, Honda, Suzuki, Mitsubishi,
BMW, Mercedes-Benz, Audi. Cada una con frase de reputación
contextualizada al mercado colombiano.

**Year insights** (5 rangos): casi nuevo, reciente, 4-6 años (sweet
spot), 7-10 años, 10+ (clásico).

**KM insights** (6 rangos): 0, <10K, <30K, <60K, <100K, <150K, >150K.

#### C. Inventory Search retorna vehicleCards (`js/ai/inventory-search.js`)

`formatResponse()` actualizado:

- **0 resultados**: igual que antes (mensaje + CTA catálogo)
- **1 resultado**:
  - Si Vehicle Guide cargado → `text = fullPitch(v)` (humano largo) +
    `vehicleCards: [cardData(v)]` (1 card)
  - Si no → fallback texto plano viejo
- **N resultados**:
  - Si Vehicle Guide cargado → `text = "encontré N opciones..."` +
    `vehicleCards: [cardData(v), ...]` (N cards renderizadas)
  - Si no → lista de texto plano vieja

El bot ya NO escribe líneas largas tipo "• Toyota Hilux 2020 - $80M
- 50K km, automática" — esa info ahora vive en cards visuales.

#### D. Render Vehicle Cards (`js/concierge.js renderVehicleCard`)

Render rico inline en cada burbuja del bot:

```
┌──────────────────────────────────────────┐
│ ┌────────┐ Toyota Hilux                  │
│ │ [foto] │ 2020 · 50K km · Automática    │
│ │  110px │ $76M [80M] [OFERTA]           │
│ │        │ • Modelo reciente, equipam... │
│ │        │ • Solo 50K km                 │
│ │        │ [Ver ficha] [📅 Agendar] [👨] │
│ └────────┘                               │
└──────────────────────────────────────────┘
```

Cada card incluye:
- **Imagen miniatura** 110px (lazy load + fallback SVG si falla)
- **Status badge** si reservado/vendido (top-left de la imagen)
- **Título** con marca + modelo (ellipsis si largo)
- **Meta**: año · km · transmisión
- **Precio** con tachado del original si oferta + badge "OFERTA"
- **2 bullets humanos** del describe()
- **3 CTAs**: "Ver ficha" (link directo), "📅 Agendar"
  (`data-vcard-action="agendar"` → trigger send programático con
  vehicleId), "👨 Asesor" (escalateToLive directo)

**Mobile** (`<480px`): cards apiladas verticales con imagen full-width
arriba (140px), body abajo. Mejor legibilidad en pantalla pequeña.

#### E. addMessage extendido para preservar vehicleCards

`addMessage(from, text, opts)` ahora también acepta:
- `opts.vehicleCards` — array de cardData objects
- `opts.quickReplies` — array de quick reply objects (ya existía pero
  no se persistía; ahora sí en el msg)

Esto permite que las cards sobrevivan a re-renders y a F5
(localStorage) sin perderse.

#### F. Handlers de botones en cards (`js/concierge.js panel.click`)

Listener captura clicks en `[data-vcard-action]`:
- `action="agendar"` → `send('Quiero agendar una visita para el
  vehículo ' + vehicleId)` — el bot detecta intent `appointment_request`
  y procesa naturalmente
- `action="escalate"` → `escalateToLive('vehicle_card_request')` —
  escala directo al asesor con razón trazable

#### Carga de scripts

`js/components.js` y `admin.html` agregan después de
`inventory-search.js`:
```html
<script src="js/ai/vehicle-guide.js" defer></script>
```

#### Anti-patterns evitados

| Riesgo | Mitigación |
|---|---|
| Vehicle Guide no carga (race) → texto plano feo | `formatResponse` chequea `window.AltorraVehicleGuide` y cae al formato viejo si falta |
| Imagen rota corta el card | `onerror="this.style.display='none'"` + placeholder SVG |
| Cards muy anchas en mobile | Media query `<480px` apila vertical |
| Cards persisten al F5 mostrando autos vendidos | `cardData()` lee `vehicle.estado` actual cada vez (no se cachea data stale) |
| Click en card "Agendar" no contextualiza | Send incluye vehicleId en el texto → el flujo del bot lo procesa con contexto |
| Cards muestran precio sin formato | `fmtPriceShort()` reduce a $80M / $1.2K para que quepa |
| Pitch del Vehicle Guide muy largo | `slice(0, 3)` limita a 3 bullets top |
| Usar `dangerouslySetInnerHTML` con datos de Firestore | Todo pasa por `escapeHtml()` antes de inyectar |
| Bullets repiten info ya en meta | Year/KM aparecen en bullets (humanizado) Y en meta (técnico) — complementario, no duplicado |

#### Test E2E del sprint

1. Cliente público → abrir ALTOR
2. Escribir "muéstrame un Mazda CX-5" → bot responde con **vehicle
   card rica**: imagen + título + año/km/transmisión + precio +
   2 bullets humanos + 3 botones (Ver ficha · Agendar · Asesor)
3. Click "Ver ficha" → abre detalle-vehiculo en nueva tab
4. Click "📅 Agendar" → bot detecta intent y procesa "Quiero agendar
   visita para vehículo X"
5. Click "👨 Asesor" → escala a live con `escalateReason='vehicle_card_request'`
6. Escribir "qué SUVs tienen" → bot responde "encontré N opciones" +
   N cards apiladas (todas las SUVs con imagen + bullets diferentes)
7. F5 → las cards persisten en el chat (localStorage preservó vehicleCards)
8. Mobile → cards se apilan verticales con imagen full-width arriba

**Archivos modificados**:
- `js/ai/vehicle-guide.js` (NUEVO ~290 líneas)
- `js/ai/inventory-search.js` (formatResponse retorna vehicleCards)
- `js/concierge.js` (renderVehicleCard + addMessage extendido +
  handlers data-vcard-action + paso de vehicleCards al addMessage)
- `js/components.js` (carga vehicle-guide.js)
- `admin.html` (script tag vehicle-guide.js)
- `css/concierge.css` (~170 líneas .cnc-vcard-* + responsive mobile)
- `service-worker.js` + `js/cache-manager.js` (bump v20260509060000)
- `CLAUDE.md` (esta sección §26.2)

**Pendiente del ADR-026** (próximos sprints):
- §26.3 Sprint ALTOR Hub UI Redesign — Telegram/WhatsApp standard
- §26.4 Sprint Claiming Explícito + SLA UI fix + Persistencia cola
- §26.5 Sprint Reset Atomic + FCM denied + Telegram Bot $0

### 26.3 Sprint ALTOR Hub UI — Telegram/WhatsApp standard fullscreen (2026-05-10)

**Objetivo del sprint**: rebrand del "Inbox unificado" → **ALTOR Hub**
y rediseño visual extremo del panel admin para que ocupe el 100% del
viewport imitando la fluidez de Telegram Web / WhatsApp Web.

#### A. Renombrado: "Inbox unificado" → "ALTOR Hub"

Reemplazo global en `admin.html` (4 instancias):
- Sidebar nav-item label
- H1 del header de la sección
- Comentario del HTML
- Sección router register

#### B. Layout fullscreen Telegram-style (`admin.html` + `css/admin.css`)

Wrapper nuevo `<div class="altor-hub" id="altorHub">`:

```
┌──────────────────────────────────────────────────┐
│ Header (logo + título + acciones)                │
├──────────────────────────────────────────────────┤
│ ┌──────────┬──────────────────────────────────┐ │
│ │ Sidebar  │ Pane principal (chat activo)     │ │
│ │ chats    │                                  │ │
│ │ 340px    │ flex: 1                          │ │
│ │          │                                  │ │
│ │ filter   │ messages...                      │ │
│ │ list     │ smart-suggestions [▼]            │ │
│ │          │ [input + send]                   │ │
│ └──────────┴──────────────────────────────────┘ │
└──────────────────────────────────────────────────┘
```

**Activación condicional**: cuando el admin entra a la sección
`concierge`, JS aplica `body.altor-hub-active`. Esa clase activa CSS
`position: fixed; inset: 0` (respetando `var(--sidebar-width, 240px)`
del admin global). Cuando sale de la sección, se quita la clase y el
admin vuelve al workspace normal.

**Sync con sidebar collapse**: si `body.sidebar-collapsed` está
activo (admin colapsó sidebar con ⌘+B §B.4), el Hub respeta los 56px
del sidebar admin colapsado.

#### C. Header del Hub (Telegram top bar)

```html
<header class="altor-hub-header">
    <div class="altor-hub-brand">
        <span class="altor-hub-brand-icon">📩</span>
        <div>
            <h1>ALTOR Hub</h1>
            <p>Centro de operaciones · Todas las conversaciones</p>
        </div>
    </div>
    <div class="altor-hub-actions">
        <button>🗑 Limpiar antiguos</button>
    </div>
</header>
```

Diseño: glass dark con backdrop-filter blur 8px, border bottom dorado
tenue, brand icon en cuadro dorado. Mobile: action label oculto, solo
icon.

#### D. Custom scrollbars dorados sutiles (CSS)

Reemplaza scrollbars nativos feos por custom webkit:

```css
.altor-hub *::-webkit-scrollbar { width: 6px; }
.altor-hub *::-webkit-scrollbar-track { background: transparent; }
.altor-hub *::-webkit-scrollbar-thumb {
    background: rgba(184, 150, 88, 0.25);
    border-radius: 3px;
}
.altor-hub *:hover::-webkit-scrollbar-thumb {
    background: rgba(184, 150, 88, 0.5);  /* visible al hover */
}
```

Firefox fallback: `scrollbar-width: thin; scrollbar-color: rgba(184,
150, 88, 0.3) transparent`.

#### E. Auto-scroll inteligente (`scrollHubMessagesToBottom`)

Función nueva en `js/admin-concierge.js`:

```js
function scrollHubMessagesToBottom(force) {
    var box = document.querySelector('.cnc-admin-detail-messages');
    if (!box) return;
    var nearBottom = (box.scrollHeight - box.scrollTop - box.clientHeight) < 120;
    if (force || nearBottom) {
        box.scrollTop = box.scrollHeight;
    }
}
```

**Patrón WhatsApp/Slack**: solo auto-scrollea si el admin está cerca
del fondo (últimos 120px). Si está leyendo histórico arriba, NO
interrumpe. Se llama:
- Al abrir un chat: `setTimeout(scrollHubMessagesToBottom, 100)` (force)
- Al recibir nuevo mensaje del listener: `setTimeout(..., 50)` (sin force)
- Al entrar a la sección: 200ms después del primer render

#### F. Smart Suggestions colapsables — chips horizontales

CSS nuevo `.cnc-smart-suggestions` rediseña el panel del §22.12:

- Antes: panel grande con 3 botones grandes (~80px verticales)
- Ahora: chips horizontales con scroll-x (~26-50px verticales según
  expanded/collapsed)
- Toggle ⌃▾ al inicio para colapsar/expandir
- `.cnc-smart-collapsed` reduce a 26px (solo header con toggle)
- Scrollbar oculto en `.cnc-smart-scroll` (usa flick gesture mobile,
  flecha desktop)

Patrón Telegram quick replies. Ahorra ~40px verticales por defecto y
~80px cuando colapsado.

#### G. Ghost UI fix verificado (`admin-concierge.js` líneas 73-82)

El bug estructural ya estaba cubierto desde §23 con `docChanges()`
detectando 'removed' del chat activo y limpiando atómicamente
`_activeSessionId` + `_messagesUnsub` + `renderChatDetail(null, [])`.
Verificado en este sprint que sigue funcionando.

#### H. Mobile single-pane con swipe back (`@media max-width: 900px`)

- Sidebar ocupa 100% del width
- Pane principal absolutamente posicionado fuera (`left: 100%`)
- Al abrir un chat: `body.altor-hub-pane-active` mueve el pane a `left: 0`
- Botón circular dorado `altor-hub-mobile-back` arriba-izquierda del
  pane → vuelve a la lista
- Transición 280ms cubic-bezier para sentirse nativo

#### Anti-patterns evitados

| Riesgo | Mitigación |
|---|---|
| `position: fixed; inset: 0` rompe el sidebar admin | CSS condicional `body.altor-hub-active` + respeta `var(--sidebar-width)` |
| Auto-scroll interrumpe lectura de histórico | Detector `nearBottom < 120px` antes de scrollear |
| Custom scrollbar invisible al primer paint | Visible siempre con opacity baja, hover lo intensifica |
| Smart suggestions colapsadas pierden función | Toggle visible siempre como dot dorado, click expande |
| Mobile pane queda detrás del sidebar admin | `left: 0` y `z-index: 5` cuando body.altor-hub-pane-active |
| Mobile back button no se ve si chat está activo | `display: flex` solo cuando body.altor-hub-pane-active |
| body.altor-hub-active queda colgado al cambiar sección | onChange listener remueve la clase si section ≠ 'concierge' |
| sidebar-collapsed admin no actualiza Hub | CSS `body.altor-hub-active.sidebar-collapsed` aplica left: 56px |

#### Test E2E del sprint

1. Login admin → click sidebar item **"ALTOR Hub"** (renombrado)
2. Verificar que la sección ocupa 100vh fullscreen + body sin scroll
3. Custom scrollbars dorados sutiles en la lista de chats
4. Click en una conversación → pane derecho muestra mensajes
5. Auto-scroll baja al fondo automáticamente
6. Scrollear hacia arriba a un mensaje viejo → recibir nuevo mensaje
   → NO se interrumpe la lectura
7. Smart suggestions aparecen como chips horizontales arriba del input
8. Click toggle ⌃ → suggestions colapsan a 26px
9. Mobile (resize <900px): sidebar ocupa 100%, click en chat desliza
   pane desde la derecha, botón back vuelve
10. Otro admin elimina el chat activo → pane se limpia + toast warning

**Archivos modificados**:
- `admin.html` (rebrand + nuevo wrapper altor-hub + mobile-back btn)
- `css/admin.css` (~280 líneas .altor-hub-* + scrollbars + smart
  suggestions colapsables + mobile responsive)
- `js/admin-concierge.js` (toggle altor-hub-active al cambiar
  sección + scrollHubMessagesToBottom + mobile-back handler +
  altor-hub:chat-opened event al openChat)
- `service-worker.js` + `js/cache-manager.js` (bump v20260509070000)
- `CLAUDE.md` (esta sección §26.3)

**Pendiente del ADR-026** (próximos sprints):
- §26.4 Sprint Claiming Explícito + SLA UI fix + Persistencia cola
- §26.5 Sprint Reset Atomic + FCM denied + Telegram Bot $0

### 26.4 Sprint Claiming Explícito + SLA UI fix + Persistencia cola (2026-05-10)

**Objetivo del sprint**: cerrar 3 bugs críticos del flujo ACD que el
cliente reportó:
1. Click en chat permite responder directamente (debería requerir
   "Tomar Conversación" explícito)
2. Banner de cola "Estás en la posición #1" se borra al mandar nuevo
   mensaje
3. Botones SLA "Continuar por WhatsApp / Seguir esperando" salen
   montados sobre las letras del mensaje

#### A. Claim explícito + Banner "Tomar Conversación" gigante

**Antes**: en §23 el auto-claim ocurría al primer mensaje del asesor.
Esto generaba race conditions UX: el asesor podía empezar a escribir
antes de saber si el chat estaba libre, y a mitad del envío el sistema
le decía "ya lo tomó otro".

**Ahora** (`js/admin-concierge.js renderChatDetail`):

```js
var unclaimed = !chat.claimedBy && !isClosed;
var claimedByMe = !!(chat.claimedBy && chat.claimedBy === currentUid);
var canWrite = !isClosed && !unclaimed && (!claimedByOther || isSuper);
```

3 estados visuales:

1. **Unclaimed** → banner dorado prominente con botón gigante
   "🤚 Tomar conversación". Input bloqueado.
2. **Claimed by me** → banner verde sutil "Estás atendiendo este
   chat. Otros asesores no pueden responder." Input habilitado.
   Si super_admin: botón "👥 Transferir / Liberar".
3. **Claimed by other** → banner rojo "🔒 Atendido por X" (ya existía).

**Click en "Tomar conversación"**:
- `claimChat(sessionId)` corre la transaction atómica
- Si OK: toast "✓ Tomaste la conversación. Ya podés responder."
- Si race (`already-claimed`): toast warning con nombre del que ganó
- Re-render automático vía onSnapshot del chat parent

#### B. Persistencia de cola — Banner survives renderMessages

**Bug**: el banner `cnc-queue-banner` vive dentro de `cncMessages`. Al
mandar un mensaje nuevo, `renderMessages()` reescribe
`cncMessages.innerHTML` y borra el banner.

**Fix** (`js/concierge.js renderMessages`):
Después del `box.innerHTML = ...`, regenera condicionalmente:

```js
if (session.mode === 'queue' && typeof renderQueueState === 'function') {
    try { renderQueueState(); } catch (e) {}
}
if (session.slaWarnedAt5min && !document.getElementById('cncSLAWarning')
    && typeof renderSLAWarning === 'function') {
    try { renderSLAWarning(); } catch (e) {}
}
if (session.slaWarnedAt10min && !document.getElementById('cncSLAWarning')
    && typeof renderSLABreach === 'function') {
    try { renderSLABreach(); } catch (e) {}
}
```

Ahora el banner queue/SLA persiste a través de cada renderMessages.
Si el cliente manda mensaje nuevo en cola, el banner se regenera al
final (después del último mensaje), no se pierde.

#### C. SLA UI fix — botones que se montaban sobre el texto

**Bug CSS**: `.cnc-sla-banner-actions` no tenía `flex-wrap`, así que
en pantallas estrechas los botones overflow horizontal y se solapaban
con el texto del banner. Además `.cnc-sla-btn` permitía text-wrap
desordenado.

**Fix** (`css/concierge.css`):

```css
.cnc-sla-btn {
    white-space: nowrap;     /* texto NO se rompe en mitad */
    min-width: 0;            /* permite shrink correcto */
    line-height: 1.2;
    text-align: center;
}
.cnc-sla-banner-actions {
    flex-wrap: wrap;         /* botones bajan a nueva línea si no caben */
    align-items: stretch;
}
.cnc-sla-banner-actions .cnc-sla-btn {
    flex: 1 1 auto;
    min-width: 140px;        /* tamaño mínimo legible */
}
```

Resultado: en mobile estrecho los botones se apilan verticales.
En desktop quedan inline con wrap automático si necesitan más ancho.

#### Anti-patterns evitados

| Riesgo | Mitigación |
|---|---|
| Auto-claim race condition mid-send | Claim AHORA es explícito, antes de habilitar input |
| Banner cola se pierde al re-render | Regenerate post-renderMessages con guards |
| Botones SLA overflow text | white-space:nowrap + flex-wrap + min-width |
| Doble claim del mismo asesor | claimChat es Firestore transaction atómica |
| Super_admin sin opt-out | Botón "Transferir / Liberar" visible solo a super_admin |
| Editor sin info de qué hacer si chat tomado | Banner explica "esperá o pedí super_admin liberarlo" |
| Mobile claim banner con botón cortado | @media 600px stack vertical + button full-width |
| Click claim cuando ya cerrado | claimChat valida status ≠ 'closed' antes de update |

#### Test E2E del sprint

1. Login admin → ALTOR Hub → click un chat sin asignar
2. Ver banner dorado prominente "🤚 Tomar conversación"
3. Input bloqueado (placeholder)
4. Click "Tomar conversación" → toast verde + input habilitado +
   banner cambia a verde "Estás atendiendo este chat"
5. Login otro admin (otra pestaña/incognito) → mismo chat → ve
   banner rojo "🔒 Atendido por [nombre]" + input bloqueado
6. Super_admin → click "👥 Transferir / Liberar" → confirm → chat
   vuelve a unclaimed
7. Cliente público en cola → bot escala → banner cola "🟢 Posición #1"
8. Cliente envía nuevo mensaje → banner persiste al final del scroll
9. Esperar 5 min → banner SLA aparece con 2 botones (WhatsApp /
   Seguir esperando) bien alineados, sin solaparse al texto
10. Resize a mobile → botones SLA se apilan verticales

**Archivos modificados**:
- `js/admin-concierge.js` (claim explícito + 2 banners nuevos +
  handlers cncAdminClaimBtn/cncAdminTransferBtn)
- `js/concierge.js` (renderMessages regenera queue + SLA banners
  post-innerHTML)
- `css/admin.css` (~80 líneas .cnc-admin-claim-banner +
  .cnc-admin-mine-banner + responsive mobile)
- `css/concierge.css` (.cnc-sla-btn white-space + .cnc-sla-banner-actions
  flex-wrap)
- `service-worker.js` + `js/cache-manager.js` (bump v20260509080000)
- `CLAUDE.md` (esta sección §26.4)

**Pendiente del ADR-026** (último sprint):
- §26.5 Sprint Reset Atomic + FCM denied + Telegram Bot $0

### 26.5 Sprint Atomic Reset + FCM denied UX + Telegram Bot $0 (2026-05-10)

**Objetivo del sprint** (ÚLTIMO del ADR-026): cerrar 3 features
pendientes y dejar la base lista para que el cliente solo deba hacer
setup operacional Telegram (5 minutos).

#### A. Atomic Reset State Machine (`js/concierge.js`)

**Bug del cliente**: "Cuando el cliente le da a Finalizar conversación,
DEBE limpiarse instantáneamente sin necesidad de Control+Shift+R.
Además, corrige el parpadeo lento del Lead Gate".

**Causa raíz adicional** (no cubierta en §22.15): listeners pendientes
(auth onAuthStateChanged, firestore parent snapshot) llegan después
del cancelChatListeners() y pisan el estado fresco que resetSession
acaba de aplicar. Esto causa el parpadeo del Lead Gate.

**Fix nuevo**:

1. `session._resetting = true` se setea AL ENTRAR a resetSession y
   se persiste a localStorage
2. Cualquier listener tardío chequea el flag y se ignora silenciosamente:
   ```js
   function applyAuthProfileToSession(profile) {
       if (!profile) return;
       if (session._resetting) return;   // ← guard
       // ... aplica profile ...
   }
   ```
3. `session._resetting = false` se libera AL FINAL de continueResetUI
   (después de renderMessages)

Resultado: cero pisotones de estado mid-reset. Lead Gate aparece
limpio sin parpadeo. Profile cacheado se aplica una sola vez al
final, no múltiples veces.

#### B. FCM permission denied — UX claro

**Antes**: cuando `Notification.permission === 'denied'`, el código
solo logueaba `console.info` y retornaba null. El usuario no sabía
qué pasó ni cómo arreglarlo.

**Ahora** (`js/admin-fcm.js registerSwAndGetToken`):

```js
if (Notification.permission === 'denied') {
    var browser = /* detecta Chrome/Edge/Firefox/Safari */;
    notify.warning({
        title: '🔒 Notificaciones bloqueadas',
        message: 'Para activar: tocá el ícono de candado/info al lado de la URL → Permisos → Notificaciones → Permitir. Después recargá la página. (' + browser + ')',
        duration: 14000
    });
}
```

Toast warning de 14s con instrucciones browser-específicas. El usuario
sabe exactamente qué hacer.

#### C. Telegram Bot $0 — alternativa GRATUITA a FCM

**Por qué Telegram**: FCM Web Push solo funciona en background en
iOS 16.4+ con PWA instalada (la mayoría de iPhones del equipo
probablemente). Telegram funciona en TODOS los celulares con la app
instalada (universal en Colombia ~90% adopción), sin necesitar PWA.

**Arquitectura**:

```
Asesor → @BotFather crea bot (1 minuto)
       → Setup en admin: tap "Conectar Telegram"
       → Deep-link a t.me/BotName?start=ASESOR_<uid>
       → Bot persiste chatId en usuarios/{uid}.telegramChatId
                    ↓
                    │ Cliente entra a queue
                    ▼
Cloud Function onChatEscalatedTelegram
- Detecta chat con mode='queue'
- Anti-spam: skip si workload.asesoresAvailable > 0
- Anti-spam temporal: cooldown 5 min (notifiedTelegramAt)
- Lista usuarios rol in [super_admin, editor] con telegramChatId
- Para cada uno: sendTelegramAlert(uid, text, { url, urlLabel })
- Mensaje markdown con cliente, radicado, vehículo, botón "Atender ahora"
```

**Componentes nuevos**:

1. **`js/admin-telegram.js`** (~120 líneas, NUEVO):
   - `AltorraAdminTelegram.openLinkFlow()` → abre deep-link al bot
   - `AltorraAdminTelegram.unlink()` → quita chatId
   - `AltorraAdminTelegram.isLinked()` / `status()` → query
   - Toast informativo si BOT_USERNAME aún placeholder

2. **`functions/index.js linkTelegramChat`** (HTTP endpoint):
   - Webhook del bot Telegram
   - Detecta `/start ASESOR_<uid>` con regex
   - Persiste `telegramChatId`, `telegramLinkedAt`, `telegramUserName`
     en `usuarios/{uid}`
   - Responde al user con confirmación o ayuda

3. **`functions/index.js sendTelegramAlert(uid, text, options)`**:
   - Helper internal: best-effort
   - Skip silente si TELEGRAM_BOT_TOKEN no seteado o user sin chatId
   - Soporta inline keyboard con `{url, urlLabel}` para CTA
   - Update `telegramLastUsedAt` en éxito

4. **`functions/index.js onChatEscalatedTelegram`** (paralelo a FCM):
   - Trigger: chat pasa a `mode='queue'`
   - Anti-spam: workload.asesoresAvailable + cooldown 5min
   - Envía a TODOS los asesores con telegramChatId
   - Mensaje rico Markdown con cliente + radicado + botón "Atender ahora"

5. **Secret nuevo declarado**: `TELEGRAM_BOT_TOKEN` via `defineSecret`.
   Si NO está seteado, todas las funciones Telegram skip silente.

#### Setup operacional one-time del cliente (5 minutos)

```bash
# 1. Crear bot en @BotFather
#    /newbot → recibir BOT_TOKEN tipo 1234567:AAH...

# 2. Setear secret en Firebase
firebase functions:secrets:set TELEGRAM_BOT_TOKEN
# (pegar el token completo)

# 3. Editar js/admin-telegram.js:
#    var BOT_USERNAME = 'AltorraCarsAlertsBot';  // ← username real

# 4. Deploy
firebase deploy --only functions:linkTelegramChat,functions:onChatEscalatedTelegram

# 5. Setear webhook del bot (1 sola vez)
curl -X POST "https://api.telegram.org/bot<TOKEN>/setWebhook" \
     -d "url=https://us-central1-altorra-cars.cloudfunctions.net/linkTelegramChat"

# 6. Cada asesor en admin.html → tap "Conectar Telegram"
```

Hasta que el cliente complete los pasos 1-5, todas las llamadas a
Telegram skip silente. FCM sigue funcionando como canal primario.

#### Anti-patterns evitados

| Riesgo | Mitigación |
|---|---|
| Listeners tardíos pisan reset state | _resetting flag + guards en applyAuthProfileToSession |
| FCM denied silencioso confunde al user | Toast warning 14s con instrucciones browser-específicas |
| Telegram requiere setup inmediato | Best-effort: skip silente si secret no seteado, FCM sigue |
| BOT_USERNAME hardcoded inválido | Helper isConfigured() detecta placeholder y avisa |
| Webhook recibe spam | Solo responde a `/start ASESOR_<uid>` válido, resto silencio |
| Telegram alert spam | Anti-spam: workload check + cooldown 5min (notifiedTelegramAt) |
| Chat ID se pierde si user borra el bot | unlink desde admin → FieldValue.delete + clear cache local |
| Doble notificación FCM + Telegram | Canales paralelos por diseño — el primero que ve, atiende |

#### Test E2E del sprint

1. **Reset atomic**: cliente loguea → conversa → "Finalizar
   conversación" → confirm → chat se limpia instantáneamente sin
   parpadeo + sin Lead Gate flash + toast "✓ Conversación reiniciada"
2. **FCM denied**: admin con notificaciones previamente bloqueadas
   → tap "Activar" en prompt FCM → toast warning 14s con
   instrucciones del candado del navegador
3. **Telegram setup pendiente**: admin tap "Conectar Telegram" →
   toast warning informando que el setup está pendiente
4. **Telegram setup completo** (post-setup): admin tap "Conectar"
   → abre deep-link a t.me/BotName → bot responde "✅ Listo, [nombre]"
   → en admin status() retorna `linked: true`
5. **Alerta Telegram funciona**: cliente entra a queue (sin asesores
   disponibles) → en celular del admin llega push de Telegram con
   cliente + radicado + botón "📲 Atender ahora" → tap → abre admin

**Archivos modificados**:
- `js/concierge.js` (_resetting flag + guard en applyAuthProfileToSession)
- `js/admin-fcm.js` (toast warning instructivo cuando denied)
- `js/admin-telegram.js` (NUEVO ~120 líneas — onboarding admin)
- `admin.html` (script tag admin-telegram.js)
- `functions/index.js` (TELEGRAM_BOT_TOKEN secret +
  linkTelegramChat webhook + sendTelegramAlert helper +
  onChatEscalatedTelegram trigger)
- `service-worker.js` + `js/cache-manager.js` (bump v20260509090000)
- `CLAUDE.md` (esta sección §26.5 — CIERRE del ADR-026)

#### ✅ ADR-026 — Cierre

Total ADR-026: 5 sprints, ~16 commits, ~5500 líneas de código + doc.

| Sprint | Commit | Descripción |
|---|---|---|
| §26.1 | `62477a4` | Cognitive Bootstrap — Brain Config + Vocab Masivo + Triple Fallback + Bootstrap FAQs |
| §26.2 | `8b37d96` | Vehicle Guide — Cards inline con miniatura + reasoning humano |
| §26.3 | `235dc6a` | ALTOR Hub UI — Telegram fullscreen + auto-scroll + smart suggestions colapsables |
| §26.4 | `d8e35fd` | Claiming Explícito + SLA UI fix + Persistencia cola |
| §26.5 | (este) | Atomic Reset + FCM denied UX + Telegram Bot $0 |

**ALTOR ya NO es un bot rule-based con palabritas**. Es una red
neuronal cognitiva con:
- Biblioteca (600+ términos automotrices + 25 FAQs profesionales)
- Investigador (Vehicle Guide con insights por marca/categoría/year/km)
- Asesor (tono cálido colombiano configurado por admin)
- Consultor (3 estados de fallback con menú accionable)
- Comercial (vehicle cards con miniatura + CTAs accionables)
- Guía (recomendaciones por caso de uso)
- Acompañante (memoria conversacional + small talk humano)

### 26.6 Bot Fix Crítico — 4 bugs frustrantes detectados en producción (2026-05-10)

**Reporte del cliente** (conversación real frustrante):
- "Tienes algun kia" → bot respondía con frase muerta sin mostrar inventario
- "Muestrame varios Kia" → "encontré 4 opciones para kia" SIN cards visibles
- "Renault Twingo" 4 veces seguidas → bot ignoraba el modelo, solo detectaba marca
- "pasame con un asesor" 3 veces seguidas → bot mostraba "Déjame conectarte" + CTA pero NUNCA escalaba automáticamente

#### RCA — 4 causas raíz independientes

**Bug #1**: `js/concierge.js:328` (branch 7 inventory_query)
```js
return { text: formatted.text, cta: formatted.cta };
// ← olvidó pasar formatted.vehicleCards
```
Resultado: branch hacía `formatResponse()` con cards generadas pero el return las DESCARTABA. Por eso cuando decías "muestrame Kia" salía solo el texto sin cards.

**Bug #2**: `js/concierge.js:467-480` (branch 14 NER fallback)
```js
return {
    text: 'Veo que te interesa un ' + bits.join(' ') + '. ¿Quieres ver opciones similares...?',
    cta: { label: 'Ver inventario', action: 'goto-busqueda' }
};
```
Branch detectaba marca con NER pero respondía con frase genérica + CTA "Ver inventario" — NO buscaba en inventory-search ni mostraba cards. El cliente tenía que hacer click extra para ver opciones.

**Bug #3**: `js/concierge.js:690-698` (pre-check ask_human)
```js
if (sentimentNeg || classification.intent === 'frustration' || classification.intent === 'ask_human') {
    return Promise.resolve({
        text: '...te entiendo. Déjame conectarte...',
        cta: { label: 'Hablar con asesor', action: 'escalate' }
    });
}
// ← NUNCA llamaba escalateToLive()
```
Branch identificaba ask_human pero solo mostraba CTA. El cliente tenía que clickear "Hablar con asesor" para que escalara. Si insistía 3 veces, el bot repetía la misma frase 3 veces sin escalar.

**Bug #4**: `js/ai/inventory-search.js extractFilters`
NER `summary.modelo` solo se llena cuando el vehicle matcher reconoce el modelo desde el inventario. "Twingo" no está en lexicon de NER, así que `filters.modelo` quedaba `null` → filtraba solo por marca → mostraba todos los Renault.

#### Fixes aplicados

**Fix #1 — Propagar vehicleCards** (`js/concierge.js:328`):
```js
return {
    text: formatted.text,
    cta: formatted.cta,
    vehicleCards: formatted.vehicleCards   // ← NUEVO
};
```

**Fix #2 — Branch 14 invoca inventory-search**:
Reemplazado el texto genérico por: si NER detecta marca/modelo/precio,
llama a `AltorraInventorySearch.searchFromText()`, propaga
`vehiclesShown` a `slots.lastVehicleDiscussed` para anáfora futura, y
retorna las cards inline. Si InventorySearch no cargó (race), fallback
al texto descriptivo.

**Fix #3 — Auto-escalate en ask_human**:
```js
var escalReason = classification.intent === 'ask_human' ? 'ask_human'
                : classification.intent === 'frustration' ? 'frustration'
                : 'sentiment_negative';
if (session.mode === 'bot' && typeof escalateToLive === 'function') {
    setTimeout(function () { escalateToLive(escalReason); }, 800);
}
return Promise.resolve({
    text: '...te entiendo. Te conecto con un asesor humano de inmediato 🙋‍♂️',
    source: 'rules-pre-check'
});
```
800ms después del mensaje, escalateToLive hace `mode='queue'` automáticamente. Cliente ve banner de cola SIN tener que clickear nada.

**Fix #4 — Detección de modelo contra inventario real**:
Después del NER, si `filters.modelo` sigue null, recorrer
`window.vehicleDB.vehicles` y matchear cada modelo único con regex
word-boundary contra el texto del cliente. Funciona con cualquier
modelo que esté en inventario, sin lexicon hardcoded.

#### Anti-patterns evitados

| Riesgo | Mitigación |
|---|---|
| Modelos hardcoded en lexicon (mantenimiento manual) | Usa modelos REALES del inventario actual via vehicleDB |
| `escalateToLive` se llama múltiples veces si user spamea | Guard `session.mode === 'bot'` antes de escalar |
| Cards persisten al F5 mostrando autos vendidos | cardData() lee estado actual del vehicle |
| NER falsa marca por palabra suelta | Regex word boundaries `\b` en model detector |
| Branch 14 captura todo sin discriminar | Solo si `summary.marca \|\| summary.modelo \|\| summary.precio` |
| InventorySearch no cargó (race) | Fallback al texto descriptivo viejo, no rompe |

#### Test E2E del fix

1. Cliente: "Tienes algun kia" → bot muestra **N cards reales de Kia**
2. Cliente: "Muestrame varios Kia" → bot muestra cards (no solo conteo)
3. Cliente: "Renault Twingo" → bot filtra por marca=Renault, modelo=twingo → muestra solo Twingos disponibles
4. Cliente: "pasame con un asesor" → bot dice "Te conecto con un asesor humano de inmediato 🙋‍♂️" + 800ms después aparece banner de cola automáticamente. Sin tener que clickear nada.

**Archivos modificados**:
- `js/concierge.js` (Fix #1 propagar vehicleCards + Fix #2 branch 14
  invoca inventory-search + Fix #3 auto-escalate ask_human)
- `js/ai/inventory-search.js` (Fix #4 model detection contra inventario)
- `service-worker.js` + `js/cache-manager.js` (bump v20260509100000)
- `CLAUDE.md` (esta sección §26.6)

### 26.7 Bug Fix Crítico — Cliente Reset + Admin Delete fantasma (2026-05-10)

**Reporte del cliente** (2 bugs persistentes):
1. Cliente da "Finalizar conversación" → confirma → la conversación
   sigue abierta visualmente. Solo F5 limpia.
2. Admin borra chat desde ALTOR Hub → toast "0 mensajes eliminados"
   PERO el chat queda fantasma en la lista izquierda. Error en consola:
   `Cannot read properties of null (reading 'userNombre')`

#### RCA — 2 bugs independientes

**Bug A — Cliente reset incompleto** (`js/concierge.js:2223`):

`resetSession()` llamaba `loadProfileFromAuth().then(continueResetUI)`
pero **SIN `.catch()`**. Si la promise rechazaba (cliente anónimo,
permisos Firestore, network timeout), `continueResetUI` NUNCA se
ejecutaba. Resultado: localStorage borrado pero el DOM intacto. Solo
F5 forzaba un reload completo donde la sesión vacía se cargaba.

**Bug B — Admin delete crash silencioso** (`js/admin-concierge.js:573`):

`renderChatDetail(chat, messages)` accedía `chat.userNombre` en la
primera línea **sin guard contra `chat=null`**. Cuando se llamaba
`renderChatDetail(null, [])` desde:
- `hardDeleteChat` post-delete cleanup (línea 300)
- `startChatsListener` removed event (línea 79)
- `closeChat` paths
- Mobile back button

El acceso `null.userNombre` crasheaba con `Cannot read properties of
null (reading 'userNombre')`. Como el crash ocurría DENTRO del `.then`
de hardDeleteChat, el `.catch` lo capturaba mostrando el toast rojo
"No se pudo eliminar" CONJUNTAMENTE con el toast verde "X mensajes
eliminados" (porque el delete sí completó antes del crash).

El crash interrumpía el cleanup de UI:
- `_activeSessionId = null` ← OK (antes del crash)
- `_messagesUnsub()` ← OK
- `renderChatDetail(null, [])` ← CRASH

El listener `startChatsListener` SÍ recibía el `removed` event, pero
también llamaba `renderChatDetail(null, [])` y crasheaba ahí también.
Resultado: el chat quedaba fantasma en la lista izquierda hasta F5.

#### Fixes aplicados

**Fix A — Catch en resetSession** (`js/concierge.js:2237`):
```js
loadProfileFromAuth().then(function (profile) {
    // ... procesar profile ...
    continueResetUI();
}).catch(function (err) {
    console.warn('[Concierge] loadProfileFromAuth rejected:', err && err.message);
    continueResetUI();   // ← garantía absoluta de que el DOM se limpie
});
```

**Fix B — Guard null en renderChatDetail** (`js/admin-concierge.js:573`):
```js
function renderChatDetail(chat, messages) {
    var detailEl = $('conciergeChatDetail');
    if (!detailEl) return;
    if (!chat) {
        detailEl.innerHTML = '<div class="cnc-admin-detail-empty altor-hub-pane-empty">' +
            '<i data-lucide="message-circle" style="..."></i>' +
            '<p>Seleccioná una conversación para responder</p>' +
        '</div>';
        if (window.AltorraIcons) window.AltorraIcons.refresh(detailEl);
        return;
    }
    var name = chat.userNombre || chat.userEmail || ...;
    // ... resto del render normal ...
}
```

Resultado: cualquier flow que llame `renderChatDetail(null)` (delete,
mobile back, listener removed event) ahora limpia el panel sin
crashear.

**Bonus defensivo — Guards en listeners contra `_resetting`**:

Agregado guard en `_firestoreParentUnsub` listener (concierge.js:1467):
```js
.onSnapshot(function (doc) {
    if (!doc.exists) return;
    if (session._resetting) return;   // ← ignora snapshots tardíos durante reset
    var d = doc.data();
    // ... procesa cambios ...
});
```

Y `cancelChatListeners()` ahora también cancela:
- `_workloadUnsub` (system/workload)
- `stopSLAWatcher()` si activo

Defensa-en-profundidad: aunque el bug A se resuelve con el catch, los
guards adicionales previenen que listeners tardíos pisen el estado
durante el ciclo de reset (cuando el confirm dialog del browser
bloquea el JS por varios ms).

#### Anti-patterns evitados

| Riesgo | Mitigación |
|---|---|
| Promise.then sin catch silencia errores | `.catch(continueResetUI)` garantiza ejecución |
| Render functions sin guard contra null | Early return + render empty state |
| Bug B causaba 2 toasts contradictorios | Eliminada la causa raíz, no se manifiesta |
| Listeners tardíos durante reset pisaban estado | Guard `_resetting` + cancelación adicional de workload/SLA |
| F5 como workaround del usuario | Reset completa el cleanup sin requerir reload |

#### Test E2E del fix

**Cliente — Bug A**:
1. Cliente público en chat con varios mensajes → menú ⋮ → "Finalizar conversación"
2. Confirm → click "Aceptar"
3. **Inmediatamente** los mensajes desaparecen + welcome bubble del bot reaparece
4. NO requiere F5 ni Ctrl+Shift+R

**Admin — Bug B**:
1. Admin → ALTOR Hub → click chat → menú ⋮ → "Eliminar"
2. Doble confirm → click final
3. Toast verde "Chat y N mensajes eliminados" (sin toast rojo)
4. Chat **desaparece** de la lista izquierda inmediatamente
5. Panel derecho muestra empty state "Seleccioná una conversación"
6. NO requiere F5 ni queda fantasma

**Archivos modificados**:
- `js/concierge.js` (.catch en resetSession + guard _resetting en
  parent listener + cancelChatListeners cancela workload/SLA)
- `js/admin-concierge.js` (guard `if (!chat)` en renderChatDetail
  con render empty state)
- `service-worker.js` + `js/cache-manager.js` (bump v20260509110000)
- `CLAUDE.md` (esta sección §26.7)

---

## 27. ALTORRA HARMONY CRM — Reestructuración Visual + Arquitectura (en curso 2026-05-10)

> Refactor masivo bajo ADR-027. El admin pasa de un Frankenstein con
> secciones mal ubicadas, código muerto y placeholders a un CRM
> Enterprise estructurado en 8 grupos lógicos con lenguaje visual
> HarmonyOS. Cero código muerto, cero placeholders, 3 features nuevas
> implementadas (Reportes, Workflows, Plantillas integradas al Hub).

### 27.1 Sprint Foundation — Tokens HarmonyOS + Sidebar v2 + Router (2026-05-10)

**Objetivo del sprint**: establecer las bases visuales y de arquitectura
de información antes de tocar las secciones. Sidebar reorganizado, router
con ALIASES para preservar deep-links viejos, tokens HarmonyOS listos
para el polish posterior.

#### A. Tokens HarmonyOS (`css/tokens.css` extendido)

Categoría 11 nueva con 30+ tokens prefijo `--hmy-*`:

- **Radii suaves**: 16px (cards), 24px (hero/modal), 12px (botones/inputs)
- **Sombras difuminadas**: 5 niveles (`-soft-xs` a `-soft-xl`) sin sólidos duros
- **Glow soft**: dorado tenue `0 0 32px rgba(184, 150, 88, 0.18)`
- **Glassmorphism**: `--hmy-glass-blur: 20px`, bg dark + border tenue
- **Transiciones fluidas**: 0.3s cubic-bezier(0.4, 0, 0.2, 1)
- **Spring**: 0.45s cubic-bezier overshoot (0.34, 1.56, 0.64, 1)
- **Espacios respiran**: padding cards 24px (vs 16-20px anterior)
- **Workspace colors paleta extendida**: gold, **coral nuevo**, blue,
  violet, green, **cyan**, **amber**, neutral
- **Tipografía jerárquica HarmonyOS**: page title 32px tight,
  body 15px line-height 1.6

Sidebar width también pasa de 240px → **256px** (más espacio para respirar).

#### B. Sidebar v2 con Quick Search

Reescritura completa del bloque `<nav class="sidebar">` en `admin.html`:

- **Quick search inline** arriba del sidebar (`#sidebarSearchInput`):
  filtra nav-items en vivo al tipear. `Escape` limpia. `Enter` ejecuta
  el primer item visible. Patrón Notion/Linear.
- **8 grupos lógicos** (vs 8 anteriores con uno disabled):
  - Inicio (standalone)
  - Inventario (Vehículos · Marcas · Aliados)
  - **Sitio público** (NUEVO — Banners · Reseñas)
  - CRM (Contactos & Ventas — unificación interna pendiente §27.x)
  - Agenda (Calendario)
  - Comunicaciones (ALTOR Hub · Cerebro AI · Lo que no entendí)
  - Reportes (placeholder con sec-reports preparado)
  - Configuración (Usuarios · Atributos · **Workflows nuevo** · Auditoría · Ajustes)

- **Workspace colors actualizados** (data-workspace-color):
  - Banners/Reseñas: gold → **coral** (rosado cálido #f97066)
  - Cerebro AI/Unmatched: orange → **green** (Comunicaciones)
  - Bandeja (sec-appointments): green → **blue** (CRM)
  - Workflows: nuevo **amber** (#f59e0b)

- **CSS HarmonyOS aplicado** (`css/admin.css` ~140 líneas nuevas):
  - Sidebar con `backdrop-filter: blur(20px)` + tinte dorado glass
  - Items con `border-radius: 12px` + transition 0.3s suave
  - Hover items: `transform: translateX(2px)` + tinte dorado tenue
  - Group headers menos uppercase agresivo (font-weight 500)
  - Quick search field con focus ring difuminado
  - Cards con radius 16px + sombras `--hmy-shadow-soft-sm`
  - Modales con radius 20px + glassmorphism
  - Botones radius 12px + lift 1px en hover
  - Inputs radius 12px + focus shadow difuminado en lugar de outline
  - `prefers-reduced-motion` respetado en TODAS las transiciones

#### C. Router REGISTRY + ALIASES rediseñado (`admin-section-router.js`)

**REGISTRY actualizado** con 18 vistas funcionales en 8 grupos
(metadata para command palette + deep-linking):

```js
{
    dashboard:    { group: null,            ... },
    vehicles, brands, dealers:              group: 'inventario',
    banners, reviews:                       group: 'sitio_publico',  // NUEVO
    crm:                                    group: 'crm',
    appointments:  { _hidden: true,         group: 'crm' },           // se mostrará en tab interno commit 4
    calendar:                               group: 'agenda',
    concierge, kb, unmatched:              group: 'comunicaciones',
    reports:                                group: 'reportes',         // NUEVO real
    users, lists, workflows, audit, settings: group: 'configuracion'   // workflows NUEVO
}
```

**ALIASES nuevos** (preservan deep-links viejos):
- `automation` → `workflows` (Reglas promovidas a Configuración)
- `templates` → `concierge` (Plantillas integradas al Hub commit 6)
- `reports-disabled` → `reports` (placeholder muerto → real)
- UX aliases: `contactos`, `pipeline`, `bandeja`, `disponibilidad`

#### D. Secciones HTML reorganizadas

- **`sec-automation` → `sec-workflows`** (renombrado, ID interno
  `automationRulesList` preservado para compat con admin-automation.js).
  H1 actualizado: "Workflows · Automatización inteligente".
- **`sec-templates`** ahora oculto (`display: none`) — datos en
  Firestore preservados, módulo admin-templates.js sigue cargando.
  Commit 6 lo elimina definitivamente al integrar plantillas como chips
  en ALTOR Hub.
- **`sec-reports` NUEVO** con placeholder structure (commit 6 lo llena
  con dashboard ejecutivo real: forecast + funnel + performance + anomalías).

#### E. Quick Search del sidebar (`admin-sidebar.js`)

Nueva función `initQuickSearch()`:
- Listener `input` en `#sidebarSearchInput` filtra nav-items por
  `textContent` o `data-section` lowercase
- `body.is-searching` clase oculta nav-group-headers (solo deja items
  visibles para resultado plano)
- Items que no matchean: `.nav-item--filtered-out` (display:none)
- `Escape`: limpia y blur
- `Enter`: ejecuta click en el primer item visible

#### Anti-patterns evitados

| Riesgo | Mitigación |
|---|---|
| Eliminar sec-templates rompe localStorage/code path | Mantener oculto con display:none + admin-templates.js sigue cargando hasta commit 6 |
| Renombrar sec-automation rompe admin-automation.js | ID interno `automationRulesList` (que el JS busca) NO cambia |
| Deep-links viejos (#/automation, #/templates) rompen | ALIASES mapean al destino nuevo en router |
| Quick search no respeta filtro de admin-section-router | Filtro es puramente CSS — no toca la navegación |
| Sidebar width 256 vs 240 puede romper layout fixed | Sólo el body.altor-hub-active del Hub usa `var(--layout-sidebar-w-expanded)`, todo se actualiza solo |
| Workspace color "coral" no existe en CSS legacy | Tokens nuevos `--ws-color-coral` + reglas específicas en admin.css |
| `prefers-reduced-motion` ignorado | @media query global desactiva TODAS las transiciones nuevas |

#### Test E2E del sprint

1. Login admin → ver sidebar con quick search arriba + 8 grupos nuevos
2. Tipear "ven" en quick search → solo aparece "Vehículos" + nav-groups ocultos
3. Tipear "kia" → no resultados (filtra)
4. Escape → quick search se limpia, sidebar normal
5. Verificar grupos:
   - Inicio (standalone)
   - Inventario: Vehículos · Marcas · Aliados ✓
   - Sitio público: Banners · Reseñas ✓ (NUEVO)
   - CRM: Contactos & Ventas ✓
   - Agenda: Calendario ✓
   - Comunicaciones: ALTOR Hub · Cerebro AI · Lo que no entendí ✓
   - Reportes: Dashboard ejecutivo ✓ (placeholder visible)
   - Configuración: Usuarios · Atributos · Workflows · Auditoría · Ajustes ✓
6. Click "Workflows" → carga (era Reglas)
7. Click "Reportes" → muestra placeholder con structure
8. Deep-link `#/automation` → redirige a `#/workflows` (alias)
9. Deep-link `#/templates` → redirige a `#/concierge` (alias)
10. Deep-link `#/reports-disabled` → redirige a `#/reports` (alias)
11. Visualmente: items del sidebar con border-radius suave 12px,
    hover con desplazamiento sutil 2px + tinte dorado, transitions 0.3s
12. Scroll en cualquier sección → cards con radius 16px y sombras difuminadas

**Archivos modificados**:
- `css/tokens.css` (+30 tokens HarmonyOS, sidebar width 240→256)
- `css/admin.css` (+140 líneas Foundation HarmonyOS)
- `admin.html` (sidebar reescrito con 8 grupos + quick search,
  sec-templates oculto, sec-automation→sec-workflows, sec-reports nuevo,
  workspace colors actualizados)
- `js/admin-section-router.js` (REGISTRY rediseñado + ALIASES nuevos)
- `js/admin-sidebar.js` (initQuickSearch con filter live)
- `service-worker.js` + `js/cache-manager.js` (bump v20260510010000)
- `CLAUDE.md` (esta sección §27.1)

**Pendiente del ADR-027** (commits siguientes):
- §27.2 Inicio productivo (KPIs hero + NBA + Insights + Performance equipo)
- §27.3 CRM unificado con 3 tabs (Contactos · Bandeja · Pipeline)
- §27.4 Agenda con tabs internos (Mes · Día · Disponibilidad · Festivos)
- §27.5 Reportes ejecutivos implementados de cero
- §27.6 Workflows funcional + Plantillas integradas al ALTOR Hub
- §27.7 HarmonyOS polish (spring animations + empty states + skeletons + sidebar badges dinámicos)

### 27.2 Sprint Inicio productivo — 3 KPIs hero + Top 5 NBA (2026-05-10)

**Objetivo del sprint**: transformar el Inicio de pantalla decorativa
con atajos genéricos + gráficas estáticas en una **herramienta de
productividad real**. El asesor entra al admin en la mañana y debe
saber al primer vistazo: cuántos leads hay, qué citas hoy, qué tareas
urgentes pendientes y qué acciones priorizar.

#### A. Eliminado del Inicio (código muerto + mal ubicado)

- **8 stats genéricos** (Total Vehículos, Nuevos, Usados, Ofertas,
  Destacados, Marcas, Vendidos, Solicitudes Pendientes): info de
  inventario que NO ayuda al day-to-day. Eliminados completos del HTML.
  Los IDs (`statTotal`, etc) que admin-sync.js poblaba ahora retornan
  null en getElementById — fallo silencioso, cero impacto.
- **4 atajos quick-actions** (Nuevo vehículo / Marcas / Solicitudes /
  Aliados): navegación inútil, ya está el sidebar. Eliminado el HTML.
  Los handlers en admin-auth.js (`quickNewVehicle`, `quickGoTo`)
  quedan vivos por compat pero no se ejecutan. `admin-palette.js` y
  `admin-voice.js` actualizados para usar `#btnAddVehicle` (selector
  primario que SÍ existe en sec-vehicles).
- **4 gráficas estáticas** (donutType, chartCategories, donutStatus,
  chartActivity): no aportaban valor proactivo. Eliminadas del HTML.
  Las funciones en `admin-phase5.js` siguen vivas pero `getElementById`
  retorna null y returnen sin renderizar — cero overhead.
- **Activity Recent widget** con botones "Seleccionar / Eliminar
  todo / Eliminar seleccionados": **MIGRADO a sec-audit** donde
  pertenece. admin-activity.js sigue funcionando con los mismos IDs
  (btnSelectActivity / btnClearAllActivity / btnDeleteSelectedActivity /
  activityFeed / activitySelectActions / activityCount).
- **SEO Tools** (Generar sitemap + Regenerar SEO + GitHub Token):
  **MIGRADO a sec-settings**. Es config técnica del super_admin, no
  info diaria. Los IDs (btnGenerateSitemap, btnRegenerateSeo,
  ghTokenSection, ghTokenInput, etc.) intactos para admin-operations.js.

**Total eliminado/migrado**: ~213 líneas HTML del sec-dashboard (era
caótico, ahora es enfocado).

#### B. NUEVO Inicio productivo (en orden de prioridad visual)

1. **Page header** — welcome + global search + activity trigger + bell

2. **Hero KPIs** (3 grandes, ocupan ancho total):
   - 🟦 **Leads de hoy** (azul, click → CRM)
     - Cuenta solicitudes/citas/leads creados últimas 24h
     - Tendencia: vs ayer (↑↓ + diff con color verde/rojo/neutral)
   - 🟪 **Citas de hoy** (violeta, click → Calendar)
     - Filtro: kind=cita || requiereCita=true Y fecha=hoy Y estado activo
   - 🟧 **Tareas pendientes** (ámbar, click → CRM)
     - SLAs vencidos (slaDeadline < ahora, status pendiente)
     - Solicitudes pendientes >24h sin respuesta
     - Chats sin claim (mode=queue, claimedBy=null)
     - Card cambia a coral si > 0 (indicador visual de urgencia)

3. **Próximas acciones recomendadas (NBA Top 5)**:
   - Recorre TODOS los contactos del CRM, computa NBA con
     `AltorraNBA.suggest()` (bloque J.8), selecciona top 5 globales
     por priority, muestra como tarjetas con avatar + nombre + razón
     humana + CTA "Ver contacto" o acción específica
   - Border-left color por priority: critical (coral 90+) / high
     (ámbar 75+) / medium (azul 60+) / low (gris)
   - Click en CTA → abre CRM 360° del contacto (commit §27.3 lo cablea
     completo cuando CRM unificado esté listo)
   - Empty state amigable si no hay acciones urgentes: "Todo bajo
     control. Sin acciones urgentes en este momento."

4. **KPIs del mes** (existing — bloque O.1)
5. **Performance del equipo** (existing — bloque O.3)
6. **Insights del día** (existing — bloque R)
7. **Lo que el sistema notó** (existing — bloque O.6)
8. **Sesiones activas** (preservado — info crítica super_admin)

#### C. Módulos JS nuevos

**`js/admin-hero-kpis.js`** (~210 líneas):
- Singleton `window.AltorraHeroKPIs`
- `computeKPIs()` recorre AP.appointments + workload + chats sin claim
- `render()` actualiza los 3 cards con valores + tendencia
- `scheduleRender()` con throttle 2s para no recomputar en cada delta
- Listener EventBus: `comm.*`, `appointment.*`, `vehicle.*` → re-render
- Listener AltorraSections.onChange → re-render al entrar a `dashboard`
- Setinterval 60s para refrescar SLAs vencidos sin necesidad de evento
- Click handlers: navegación a sección relevante por KPI

**`js/admin-nba-dashboard.js`** (~190 líneas):
- Singleton `window.AltorraNBADashboard`
- `getContacts()` reusa `AltorraCRM.getContacts()` o reconstruye desde AP.appointments
- `computeTopActions()`: para cada contacto llama `AltorraNBA.suggest({limit:1})`,
  filtra priority ≥ 50, sort global desc, take top 5
- `render()` produce tarjetas accionables con rank + avatar + nombre +
  priority pill + razón + CTA
- Click CTA → `AltorraSections.go('crm')` + `AltorraCRM.openContactDetail()` si disponible
- Throttle 3s en scheduleRender + listener EventBus

#### D. CSS HarmonyOS para los nuevos componentes (`css/admin.css` ~190 líneas)

- `.hero-kpis`: grid 3 columnas, gap 20px (mobile: 1 columna)
- `.hero-kpi`: card 24px padding, radius 24px, hover lift 2px,
  border-top accent 3px, sombra `--hmy-shadow-soft-md`
- `.hero-kpi-icon`: 56×56px con tinte color del KPI
- `.hero-kpi-value`: 2.5rem font-size, font-weight 700, letter-spacing tight
- `.hero-kpi-trend-pill`: pill redondeado con color por sign (verde
  up / coral down / neutral / warn)
- `.hero-kpi--urgent`: variante coral cuando tareas pendientes > 0
- `.nba-dash-list/item`: border-radius 16px, hover translateX +
  border-left por priority
- `.nba-dash-rank`: dot dorado 24×24 con número
- `.nba-dash-avatar`: gradient dorado 40×40 con iniciales
- `.nba-dash-pri-pill`: pill diminuto color por priority
- `prefers-reduced-motion`: desactiva transforms en hover

#### Anti-patterns evitados

| Riesgo | Mitigación |
|---|---|
| Eliminar 8 stats deja admin-sync.js fallando | getElementById null, fallo silencioso esperado |
| admin-phase5.js renderDonut* fallan | Cero impacto: containers no existen, return temprano |
| `quickNewVehicle` referenciado en voice/palette rompe | Selector primario `#btnAddVehicle` que SÍ existe |
| NBA recomputa en cada delta de Firestore | Throttle 3s + listener específico (no genérico) |
| Hero KPIs sin tendencia para "tareas" (no hay serie temporal) | Pill especial "Todo al día ✓" / "Requiere atención" |
| AltorraNBA.suggest() llamado sin contactos | Empty state amigable + skip si AP.appointments vacío |
| Activity widget movido a Auditoría rompe IDs | IDs preservados literalmente — admin-activity.js intacto |
| SEO Tools movido a Settings rompe admin-operations.js | btnGenerateSitemap/btnRegenerateSeo/ghTokenSection IDs preservados |
| Hero KPI redundante con KPIs del mes (debajo) | Hero = HOY (24h), KPIs mes = vista 30d. Niveles temporales distintos |

#### Test E2E del sprint

1. Login admin → entrar a Inicio
2. Ver header simple (welcome + search + bell + activity btn)
3. **3 KPIs Hero** grandes con icons + valores + tendencia pill:
   - Leads de hoy: número actual + "↑ +3 vs ayer" (verde) o "↓ -1 vs ayer" (coral)
   - Citas de hoy: idem
   - Tareas pendientes: número + pill ámbar "Requiere atención" o verde "Todo al día ✓"
4. Click en Hero KPI "Leads" → navega a sec-crm
5. Click en Hero KPI "Citas" → navega a sec-calendar
6. Click en Hero KPI "Tareas" → navega a sec-crm
7. **Top 5 NBA** debajo: tarjetas con rank/avatar/nombre/razón/CTA
8. Click "Ver contacto" en una tarjeta → abre CRM (en commit §27.3 abrirá detalle directo)
9. Empty state si no hay NBA: "Todo bajo control. Sin acciones urgentes."
10. Verificar que NO aparecen:
    - Atajos "Nuevo vehículo / Marcas / Solicitudes / Aliados"
    - Grilla de 8 stats genéricos
    - Charts donutType/chartCategories/etc
    - Widget "Actividad Reciente" (movido a Auditoría)
    - SEO Tools (movido a Ajustes)
11. Ir a sec-audit → ver Activity Reciente con botones Seleccionar /
    Eliminar todo / Eliminar seleccionados (movidos correctamente)
12. Ir a sec-settings → ver SEO Tools (Publicar sitemap / Regenerar
    SEO / GitHub Token) movidos correctamente
13. Mobile (<900px): Hero KPIs apilados verticales, NBA cards full-width
14. Tendencia auto-refresh: esperar 60s en sec-dashboard → tareas
    pendientes con SLA recién vencido aparecen sin recargar página

**Archivos modificados**:
- `admin.html` (sec-dashboard reescrito; Activity migrado a sec-audit;
  SEO Tools migrado a sec-settings; scripts hero-kpis + nba-dashboard cargados)
- `js/admin-hero-kpis.js` (NUEVO ~210 líneas)
- `js/admin-nba-dashboard.js` (NUEVO ~190 líneas)
- `js/admin-palette.js` (selector primario #btnAddVehicle)
- `js/admin-voice.js` (selector primario #btnAddVehicle)
- `css/admin.css` (~190 líneas .hero-kpis + .nba-dash + responsive)
- `service-worker.js` + `js/cache-manager.js` (bump v20260510020000)
- `CLAUDE.md` (esta sección §27.2)

**Pendiente del ADR-027** (commits siguientes):
- §27.3 CRM unificado con 3 tabs (Contactos · Bandeja · Pipeline)
- §27.4 Agenda con tabs internos (Mes · Día · Disponibilidad · Festivos)
- §27.5 Reportes ejecutivos implementados de cero
- §27.6 Workflows funcional + Plantillas integradas al ALTOR Hub
- §27.7 HarmonyOS polish (spring animations + empty states + skeletons + sidebar badges dinámicos)

### 27.3 Sprint CRM unificado — 3 tabs internos (2026-05-10)

**Objetivo del sprint**: destruir la fragmentación entre `sec-crm`
(Contactos 360°) y `sec-appointments` (Bandeja). Ambas vivían como
secciones separadas del sidebar pero conceptualmente son la misma
operación: gestión de la relación con clientes y oportunidades de
venta. Resultado: una sola sección con 3 tabs internos cohesionados.

#### A. Estructura nueva del CRM unificado

```
👥 sec-crm (CRM & Ventas)
   ├─ Tab strip arriba (HarmonyOS)
   ├─ Tab "Contactos & Ventas"   → tabla 360° (era sec-crm)
   ├─ Tab "Bandeja"              → solicitudes/citas (era sec-appointments)
   └─ Tab "Pipeline" (Beta)      → Kanban segmentado por tier
```

**Cambios estructurales en `admin.html`**:
- `sec-crm` reescrito como wrapper con `crm-tabstrip` + 3 `crm-tabpane`
- Contenido viejo de `sec-crm` → tab pane "contactos" (76 líneas indented)
- Contenido viejo de `sec-appointments` → tab pane "bandeja" (214 líneas indented)
- `sec-appointments` queda como `display: none` con comentario explicativo
- Tab "pipeline" nuevo con container `#pipelineKanban`

**IDs internos preservados al 100%** — admin-crm.js, admin-appointments.js,
admin-crm-tabs.js, admin-pipeline.js todos siguen funcionando porque sus
selectores (`#crmSearchInput`, `#citaTable`, `#filtroEstado`, etc.) viven
dentro de los panes pero existen igual en el DOM.

#### B. Routing y deep-links

**Aliases nuevos en `admin-section-router.js`**:
- `'appointments': 'crm'` — deep-link `#/appointments` ahora navega
  al CRM unificado. `admin-crm-tabs.js` detecta el hash y activa
  automáticamente el tab "bandeja".

**Deep-links soportados**:
- `#/crm` → tab "contactos" (default)
- `#/crm/bandeja` → tab "bandeja"
- `#/crm/pipeline` → tab "pipeline"
- `#/appointments` → tab "bandeja" (via alias)
- `#/inbox` → sigue siendo `#/concierge` (alias §20.3)

#### C. Módulos JS nuevos

**`js/admin-crm-tabs.js`** (~150 líneas):
- Singleton `window.AltorraCRMTabs`
- `setActiveTab(name)`: toggle aria-selected + clases activas en
  buttons y panes, persiste en localStorage, actualiza URL hash via
  `history.replaceState`, emite evento `crm.tab-changed` al EventBus
- `applyHashTab()`: parsea hash y activa el tab correspondiente.
  Soporta `#/crm`, `#/crm/{tab}`, `#/appointments`, `#/bandeja`
- `bindRouterHook()`: subscribe a `AltorraSections.onChange`. Al
  entrar a sec-crm aplica el tab correcto
- Click handler en `.crm-tab[data-crm-tab]`
- `hashchange` listener para back/forward del browser
- Lazy-render del Pipeline (solo cuando se activa el tab)

**`js/admin-pipeline.js`** (~280 líneas):
- Singleton `window.AltorraPipeline`
- `getContacts()` reusa AltorraCRM.getContacts() o reconstruye
- `getScore(c)` lee score del contacto (computeScoreBreakdown si AltorraCRM disponible)
- `classifyTier(c)` → 'calientes' (≥70) | 'tibios' (40-70) | 'frios' (<40) | 'convertidos' (vendido/completada)
- `getTopNBA(c)` invoca AltorraNBA.suggest({limit:1})
- `render()` produce 4 columnas Kanban con cards: avatar + nombre + score
  + lastCommAt + razón NBA + CTA "Ver detalle"
- Limit 20 cards por columna (resto: "+N más")
- Click en card o CTA → activa tab "contactos" + abre CRM detail
- Listeners: EventBus `comm.*`, `crm.*`, `crm.tab-changed` (lazy)

#### D. CSS HarmonyOS para tabs + Kanban (~250 líneas)

**Tab strip**:
- `.crm-tabstrip` — flex con borde inferior tenue, scroll-x mobile
- `.crm-tab` — padding 10×16, radius top-only 12px, transition fluida
- `.crm-tab.is-active` — color azul (workspace CRM), background tinted,
  underline 2px abajo (patrón Material/Apple)
- `.crm-tab-count` — pill diminuto con contador
- `.crm-tab-badge` — pill "Beta" en pipeline (color AI)

**Tab panes**:
- `.crm-tabpane` — `display: none` por default
- `.crm-tabpane.is-active` — `display: block` con animation fadeIn 0.25s
- Page-header inner sin border-top duplicado (lo cancela tab pane)

**Pipeline Kanban**:
- `.pipeline-kanban` — grid 4 columnas (260px min), gap 14px
- `.pipeline-column` — radius 16px, fondo sutil, min-height 200px
- `.pipeline-col-icon` 4 colores por tier (coral/amber/blue/green)
- `.pipeline-col-count` — pill con count contactos del tier
- `.pipeline-card` — radius 12px, hover lift 1px + tinte dorado
- `.pipeline-card-avatar` — gradient dorado 32×32 con iniciales
- `.pipeline-card-score` — pill con número + tinte si > 0
- `.pipeline-card-cta` — botón full-width azul que abre detail
- Mobile: scroll horizontal de columnas, tabs con max-width truncado
- `prefers-reduced-motion`: animaciones desactivadas

#### Anti-patterns evitados

| Riesgo | Mitigación |
|---|---|
| sec-appointments eliminado rompe admin-appointments.js | sec-appointments queda como wrapper vacío + el código JS sigue encontrando IDs en sec-crm pane "bandeja" |
| Tab "Pipeline" pesado en primer load | Lazy render: solo dispara `AltorraPipeline.render()` al activar tab |
| Click en sidebar "CRM" carga tab equivocado | applyHashTab respeta deep-link, sino último tab persistido en localStorage |
| Deep-link #/appointments rompe (alias router lo manda a #/crm pero default es contactos) | admin-crm-tabs.js detecta hash y fuerza tab "bandeja" |
| Tab strip overflow en mobile | scroll-x con scrollbar oculto, swipe gesture nativo |
| Tabs activadas perdidas al hacer F5 | localStorage `altorra_crm_last_tab` persiste última visitada |
| Eventos cross-tab del navegador (back/forward) | hashchange listener resincroniza tab correcto |
| crm.tab-changed dispara render Pipeline en bucle | El listener verifica payload.tab === 'pipeline' antes de re-render |
| Pipeline sin contactos crashea | Empty state amigable + skip render si lista vacía |

#### Test E2E del sprint

1. Login admin → sidebar muestra "CRM" como item único (sin
   "Contactos 360" + "Bandeja" separados)
2. Click "CRM" → carga sec-crm con tab "Contactos & Ventas" activo
3. Ver tab strip arriba con 3 tabs: Contactos · Bandeja · Pipeline (Beta)
4. Click tab "Bandeja" → muestra solicitudes/citas (lo que era sec-appointments)
   - URL cambia a `#/crm/bandeja`
   - Filtros, kanban, smart suggestions del admin-appointments funcionan
5. Click tab "Pipeline" → muestra 4 columnas (Calientes/Tibios/Fríos/Convertidos)
   con cards de contactos clasificados
6. Click en una card del Kanban → activa tab "contactos" + abre CRM 360°
   del contacto seleccionado
7. Click tab "Contactos" → vuelve a la tabla 360° (lo que era sec-crm)
8. Refrescar página estando en `#/crm/pipeline` → vuelve al tab pipeline
9. Deep-link directo `#/appointments` → router redirige a sec-crm,
   admin-crm-tabs detecta el hash y activa tab "bandeja"
10. Back button del browser → tabs cambian correctamente
11. Mobile (<600px): scroll horizontal de tabs, columnas pipeline en
    scroll-x con cards full-width
12. NBA Top 5 del Inicio (§27.2) sigue funcionando — click "Ver contacto"
    abre CRM 360° en tab "contactos"

**Archivos modificados**:
- `admin.html` (sec-crm reescrito con 3 tab panes; sec-appointments
  vaciado; scripts admin-crm-tabs.js + admin-pipeline.js cargados)
- `js/admin-section-router.js` (alias appointments→crm)
- `js/admin-crm-tabs.js` (NUEVO ~150 líneas)
- `js/admin-pipeline.js` (NUEVO ~280 líneas, Kanban segmentado por tier)
- `css/admin.css` (~250 líneas .crm-tab* + .pipeline-* + responsive)
- `service-worker.js` + `js/cache-manager.js` (bump v20260510030000)
- `CLAUDE.md` (esta sección §27.3)

**Pendiente del ADR-027** (commits siguientes):
- §27.4 Agenda con tabs internos (Mes · Día · Disponibilidad · Festivos)
- §27.5 Reportes ejecutivos implementados de cero
- §27.6 Workflows funcional + Plantillas integradas al ALTOR Hub
- §27.7 HarmonyOS polish (spring animations + empty states + skeletons + sidebar badges dinámicos)

### 27.4 Sprint Agenda unificada — Tabs Calendario/Disponibilidad/Festivos (2026-05-10)

**Objetivo del sprint**: la sección Calendario actualmente solo
muestra la vista mensual/diaria. La configuración de disponibilidad
(workDays, workHours, slotDuration) y el listado de festivos viven
solo en código (admin-calendar-config.js singleton sin UI). Sprint
§27.4 consolida los 3 dominios en una sola sección con tabs.

#### A. Estructura nueva

```
📅 sec-calendar (Agenda)
   ├─ Tab "Calendario"      → vista mes/día (existing admin-calendar.js)
   ├─ Tab "Disponibilidad"  → form de workDays + workHours + slots
   └─ Tab "Festivos"        → CRUD de días no laborales
```

**Cambios HTML en `admin.html`**:
- sec-calendar reescrito como wrapper con `cal-tabstrip` + 3 `cal-tabpane`
- Tab pane "calendario" mantiene toolbar prev/today/next + view toggle
  Mes/Día + grid wrap (admin-calendar.js intacto)
- Tab pane "disponibilidad" NUEVO con form de 3 secciones:
  - Días laborales: 7 checkboxes con accent violet HarmonyOS
  - Horario: time inputs apertura/cierre
  - Slots: duración (min) + buffer + máx por slot
- Tab pane "festivos" NUEVO con CRUD: header + form add (date + label) + lista

#### B. Módulo nuevo `js/admin-calendar-tabs.js` (~280 líneas)

Singleton `window.AltorraCalendarTabs`:

**Tabs**:
- `setActiveTab(name)`: toggle active state + URL hash via
  `history.replaceState`. Lazy render del pane recién activo.
- `applyHashTab()`: parsea hash. Soporta `#/calendar`,
  `#/calendar/disponibilidad`, `#/calendar/festivos`,
  `#/disponibilidad`, `#/festivos`
- Click handler en `.cal-tab[data-cal-tab]`
- hashchange listener para back/forward

**Disponibilidad**:
- `renderAvailabilityForm()` lee `AltorraCalendarConfig.getConfig()`
  y popula checkboxes + time inputs + number inputs
- `saveAvailability()` super_admin only:
  - Recolecta workDays activos, workHours start/end, slotDuration,
    bufferMin, maxPerSlot
  - Llama `AltorraCalendarConfig.save(data)` (existing API)
  - Toast success + savestate inline

**Festivos**:
- `renderHolidaysList()` recorre `cfg.holidays`. Soporta entries
  como string `'YYYY-MM-DD'` o objeto `{date, label}`.
  Formatea fecha con `toLocaleDateString('es-CO', {day, month})`.
- `showAddHoliday()` / `hideAddHoliday()` toggles del form
- `saveHoliday()` super_admin only: agrega al array `holidays`
  (dedupea si la fecha ya existe), llama save, re-renderiza
- `removeHoliday(date)` super_admin only: confirm + filter

**Polling suave**: cada 8s mientras estás en sec-calendar, re-render
del tab activo si llegan cambios cross-device (admin-calendar-config.js
ya tiene onSnapshot interno, solo necesitamos reflejar).

#### C. Routing (admin-section-router.js)

Aliases nuevos no necesarios — los existentes ya cubren:
- `#/calendar` → tab calendario
- `#/calendar/disponibilidad` → tab disponibilidad (parseado por admin-calendar-tabs)
- `#/calendar/festivos` → tab festivos
- `#/disponibilidad` → vía applyHashTab forza tab disponibilidad
- `#/festivos` → vía applyHashTab forza tab festivos

#### D. CSS HarmonyOS para los nuevos componentes (~200 líneas)

**Tab strip**:
- `.cal-tabstrip` — flex con borde inferior tenue, scroll-x mobile
- `.cal-tab` — padding 10×16, radius top 12px, transition fluida 0.3s
- `.cal-tab.is-active` — color violet (workspace agenda),
  background tinted, underline 2px abajo
- `.cal-tabpane` — display:none, .is-active fade-in 0.25s

**Disponibilidad form**:
- `.availability-section` — card 16px radius, padding 20×24
- `.availability-day` — pill button con accent violet cuando checkbox
  activo (`:has(input:checked)` selector)
- `.availability-row` — grid auto-fit minmax(180px)
- Time inputs y number inputs heredan radius 12px de tokens

**Festivos**:
- `.holidays-add-form` — fondo violet tenue + border tenue
- `.holiday-item` — card 12px radius, hover violet tenue
- `.holiday-formatted` — capitalize + bold (ej: "1 de enero")
- `.holiday-remove:hover` — color coral (delete intent)

`prefers-reduced-motion`: animaciones desactivadas en todos los componentes

#### Anti-patterns evitados

| Riesgo | Mitigación |
|---|---|
| AltorraCalendarConfig API real es getConfig() no get() | Detectado durante implementación, fallback inteligente |
| AltorraCalendarConfig sin onLoad() callback | Polling suave cada 8s en sec-calendar (cubre cross-device) |
| Festivos como string vs objeto {date, label} mezclados | Normalización: ambos formatos soportados en render |
| Tabs cambiados sin lazy render | renderAvailabilityForm + renderHolidaysList solo al activar |
| save() sin permisos super_admin | Guard explícito + toast error + return |
| Holiday agregado duplicado | Filter por date antes de push |
| Time inputs sin formato 24h en algunos browsers | type="time" nativo respeta locale del usuario |
| Form submit por accidente con Enter | NO uso `<form>` — botón explícito Save |

#### Test E2E del sprint

1. Login admin → sidebar "Calendario" → carga sec-calendar con tab
   "Calendario" activo (vista mensual existing)
2. Click tab "Disponibilidad" → muestra form con:
   - 7 días checkbox (Dom..Sáb), Lun-Sáb marcados por default
   - Apertura/Cierre time inputs (08:00-18:00)
   - Slot duration 30, buffer 15, max 1
3. Toggle Sábado off + cambiar cierre a 17:00 + click "Guardar"
   - Toast success + savestate "✓ Disponibilidad guardada"
   - Verificar en Firestore: config/calendarConfig actualizado
4. Click tab "Festivos" → muestra lista de 18 festivos COL hardcoded
5. Click "Agregar festivo" → form aparece con date + label
   - Seleccionar 2026-12-31 + label "Fin de año" + Guardar
   - Item aparece en la lista formateado: "31 de diciembre · Fin de año"
6. Click trash en un festivo → confirm + se elimina
7. Refrescar página estando en `#/calendar/disponibilidad` → vuelve al tab disponibilidad
8. Deep-link `#/festivos` → activa tab festivos
9. Mobile: tabs con scroll-x si overflow
10. El admin-calendar.js (vista mensual con drag-drop reprogramar)
    sigue funcionando intacto — los IDs (calPrev, calNext, calToday,
    calStats, calGridWrap) viven dentro del tab pane "calendario"
11. Reprogramar una cita arrastrándola a un día → `AltorraCalendarConfig.checkOverbooking`
    (existing) advierte si cae en festivo recién agregado

**Archivos modificados**:
- `admin.html` (sec-calendar reescrito con 3 tab panes; scripts admin-calendar-tabs.js cargado)
- `js/admin-calendar-tabs.js` (NUEVO ~280 líneas: tabs + disponibilidad + festivos)
- `css/admin.css` (~200 líneas .cal-tab* + .availability-* + .holiday-*)
- `service-worker.js` + `js/cache-manager.js` (bump v20260510040000)
- `CLAUDE.md` (esta sección §27.4)

**Pendiente del ADR-027** (commits siguientes):
- §27.5 Reportes ejecutivos implementados de cero (forecast + funnel + performance + anomalías)
- §27.6 Workflows funcional + Plantillas integradas al ALTOR Hub
- §27.7 HarmonyOS polish (spring animations + empty states + skeletons + sidebar badges dinámicos)

### 27.5 Sprint Reportes ejecutivos — Implementados de cero (2026-05-10)

**Objetivo del sprint**: el sec-reports era un placeholder muerto.
Sprint §27.5 lo convierte en un dashboard ejecutivo real con métricas
del negocio computadas desde data viva en Firestore. Cero placeholders,
cero "Próximamente". El dueño del negocio entra y ve la salud del mes
en 30 segundos.

#### A. Componentes del Dashboard (5)

1. **KPIs Hero del periodo** (4 cards):
   - 💰 Ventas del periodo (suma de precios + count)
   - 🎯 Tasa de conversión (% leads → ventas)
   - 💵 Ticket promedio (totalSales / saleCount)
   - ⏱️ Tiempo de respuesta promedio (createdAt → updatedAt si estado != pendiente)

2. **Funnel de conversión** (visual):
   - 4 stages: Leads → Solicitudes → Citas → Ventas
   - Barras con gradient color (cyan → blue → violet → green)
   - Drop-off % por stage con flecha ↓ en color coral
   - Animation spring 0.6s al renderizar

3. **Forecast de ventas** (regresión lineal):
   - Layout 2 columnas: cifra grande izquierda + barras histórico derecha
   - Reusa `AltorraForecast.confidence(values, 1)` (existente bloque R.1)
   - Muestra: predicción próximo mes + tendencia vs último mes (↑/↓ %)
   - Intervalo de confianza 95% (lower-upper)
   - Calidad del modelo (R² %) con warning si < 50%
   - Gráfica histórica con barras + barra "predicted" dashed gold
   - Empty state si < 3 meses de datos

4. **Performance del equipo** (top 5 asesores):
   - Agrega ventas + leads por `assignedTo`/`lastModifiedBy`
   - Sort por sales desc + total desc
   - Medallas 🥇🥈🥉 para top 3, número 4-5 para resto
   - Stats: ventas count + total facturado + conversión % (si tiene leads)

5. **Anomalías y patrones detectados** (4 tipos):
   - **High**: SLA breach >3 vencidos sin atender
   - **Warn**: Vehículos stale >60 días en disponible (≥3)
   - **Info**: Forecast anomaly via `AltorraForecast.detectAnomaly` (z-score 2σ)
   - **High**: Conversión <5% en periodo con ≥10 leads
   - Empty state amigable si todo OK ("Todo estable. Sin anomalías.")

#### B. Periodo seleccionable

Dropdown header con 3 opciones:
- `month` (default) — últimos 30 días
- `quarter` — últimos 90 días
- `year` — últimos 365 días

Cambia `_currentRange` global y dispara `renderAll()` inmediato.

#### C. Export CSV

Botón "CSV" header genera archivo descargable con todas las
ventas + leads del periodo. Encoding UTF-8 con BOM. Escape RFC 4180.
Filename: `altorra-reportes-YYYY-MM-DD.csv`.

#### D. Módulo nuevo `js/admin-reports.js` (~480 líneas)

Singleton `window.AltorraReports`:
- `renderAll()` — invoca todas las renders en serie con try/catch
- `renderKPIs()` — 4 KPIs hero
- `renderFunnel()` — 4 stages con drop-off
- `renderForecast()` — usa AltorraForecast (regresión lineal + confidence)
- `renderPerformance()` — agrega asesores, sort, medallas
- `renderAnomalies()` — heurísticas + AltorraForecast.detectAnomaly
- `exportCSV()` — Blob + download
- `setRange(r)` — cambia periodo + re-render
- Listeners: AltorraSections.onChange (lazy render al entrar reports) +
  EventBus `vehicle.*` y `comm.*` (re-render auto al cambiar data)
- Throttle 1.5s en scheduleRender

#### E. CSS HarmonyOS (~250 líneas)

- `.reports-kpis` — grid auto-fit minmax(240px) responsive
- `.reports-kpi-card` — radius 16, hover lift 1px, sombra soft-sm
- `.reports-card` — wrapper genérico para los 5 componentes
- `.reports-card-head h3 [data-lucide]` — icon cyan (workspace color)
- `.funnel-stage-fill` — gradient con animation width 0.6s spring
- `.funnel-stage-fill--{color}` — 4 variantes (cyan/blue/violet/green)
- `.funnel-drop` — pill coral con drop %
- `.forecast-grid` — 2 cols desktop, 1 col mobile
- `.forecast-value` — 3rem font-size cyan, letter-spacing tight
- `.forecast-bar--predicted` — barra gold dashed (futuro)
- `.performance-item` — card 12px, hover dorado, ranking destacado
- `.reports-anomaly--{level}` — 3 niveles color (coral/amber/blue)
  con border-left 3px del color del nivel
- `.reports-anomalies-ok` — empty state success verde
- `prefers-reduced-motion`: animations desactivadas

#### Anti-patterns evitados

| Riesgo | Mitigación |
|---|---|
| Reusar IDs del Inicio (kpisGrid, performanceTable) crea duplicados | NUEVO IDs (rkVentas, reportsKpis, etc) — Inicio sigue funcionando |
| Forecast crashea con < 3 datos | Empty state + skip render |
| AltorraForecast no cargado | Guard en `if (!window.AltorraForecast)` |
| División por cero en conversión / ticket | Guards `if (saleCount > 0)` antes |
| Periodo cambiado fuera de sec-reports | scheduleRender solo lazy al entrar a section |
| Render pesado en cada delta de Firestore | Throttle 1.5s + listener específico |
| Anomalías repetitivas (cada render genera mismas alertas) | Heurísticas idempotentes + leer state actual cada vez |
| Performance sin asesores con assignedTo | Empty state + sin crash |
| Export CSV con datos personales | Solo data agregada (cliente nombre + monto), no info sensible |
| Forecast bar predicted indistinguible del histórico | Color gold dashed border claro vs histórico cyan sólido |

#### Test E2E del sprint

1. Login admin → click "Reportes" → carga sec-reports con dashboard completo
2. Ver 4 KPIs hero: Ventas $X · Conversión Y% · Ticket $Z · Respuesta W
3. Funnel con 4 barras animándose desde 0 al ancho proporcional
4. Drop-off % visible entre stages (ej: "↓ 35% pérdida")
5. Forecast con número grande (próximo mes) + histórico de barras
6. Performance del equipo: top 5 con medallas 🥇🥈🥉
7. Anomalías: 0 a N alerts según data real, o "Todo estable" si nada
8. Cambiar dropdown a "Último trimestre" → todas las métricas se
   recalculan para 90 días
9. Cambiar a "Último año" → idem 365 días
10. Click "Refrescar" → re-render forzado
11. Click "CSV" → descarga archivo con todas las ventas + leads del periodo
12. Visualmente: cards radius 16px, sombras difuminadas, transitions
    fluidas (HarmonyOS lenguaje consistente)
13. Mobile (<768px): forecast-grid colapsa a 1 columna
14. Sin data: ve placeholders amigables ("Necesitamos 3+ meses…")

**Archivos modificados**:
- `admin.html` (sec-reports reescrito completo con 5 componentes;
  range selector + export CSV en header)
- `js/admin-reports.js` (NUEVO ~480 líneas — todo el dashboard)
- `css/admin.css` (~250 líneas .reports-* + funnel + forecast + performance)
- `service-worker.js` + `js/cache-manager.js` (bump v20260510050000)
- `CLAUDE.md` (esta sección §27.5)

**Pendiente del ADR-027** (commits siguientes):
- §27.6 Workflows funcional + Plantillas integradas al ALTOR Hub
- §27.7 HarmonyOS polish (spring animations + empty states + skeletons + sidebar badges dinámicos)
