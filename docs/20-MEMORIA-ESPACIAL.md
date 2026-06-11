# 🗺️ 20 — MEMORIA ESPACIAL (Arquitectura / Flujos / Estructura)

> **Nodo neuronal: Memoria Espacial.** Se lee SOLO ante desorientación
> (Trigger de Desorientación, ver `CLAUDE.md §G`): cuando dudas de DÓNDE vive
> un componente, CÓMO interactúan los módulos, qué depende de qué, o cómo está
> estructurado el SEO/deploy. NO se auto-carga.
>
> Este nodo es un HUB: enlaza a las hojas de detalle. Lee primero el mapa de
> abajo; baja a la hoja específica solo si necesitas el detalle fino.

---

## 🧭 Mapa rápido de "dónde vive cada cosa"

| Si buscas… | Ve a |
|---|---|
| Qué módulo JS hace qué + grafo de dependencias + globals `window.*` | `docs/dependency-map.md` |
| Blast radius de un archivo (qué se rompe si lo tocas) | `docs/dependency-map.md` → "Critical shared modules" |
| Schema de colecciones Firestore | `docs/dependency-map.md` → "Schemas" + abajo §Schema |
| SEO: sitemap, robots.txt, indexación Google, canonical/OG/JSON-LD | `docs/SITEMAP-FIX.md` |
| Roadmap de migración (dominio, Cloudflare Pages, Vite, email pro) | `docs/PLAN-MIGRACION-ALTORRA.md` |
| Cómo activar el LLM del bot ALTOR (Windows) | `docs/SETUP-LLM.md` |
| Plan original de cirugía del ALTOR Hub | `docs/altor-hub-cirugia-execution-plan.md` |
| **CRM VIEJO** (`admin.html`, `sec-crm`) | **`docs/crm-handoff.md`** = scan verificado 2026-06-05. `sec-crm` 3 tabs (`admin-crm.js`/`admin-crm-tabs.js`/`admin-pipeline.js`) + Customer 360 + `comm-schema.js`; lee `solicitudes`/`clientes`. **En vías de retiro** (cutover cuando la app nueva tenga paridad). RBAC §61. |
| **CRM NUEVO** (canónico + app `admin-app/`) — §158/§159 | **Modelo canónico** (Fase 1, LIVE): `contacts`/`leads`/`activities`/`failedIngestions` poblados por `functions/src/ingestion/onSolicitudCreated.js` desde `solicitudes`. **App admin greenfield** `admin-app/` (Fase 2): Vite + Firebase modular, **Bandeja Inteligente** + Customer 360. Detalle ↓ `### 🚗 App CRM nueva`. |
| Historia/decisión de un subsistema (§NN) | `docs/00-INDICE.md` → `docs/99-HISTORIAL-ADR.md` |

---

## 🏗️ Estructura del repo (vista aérea)

> **Actualizado §119** (reorganización frontend): `js/` pasó de plano a modular.

- **Sitio público**: `index.html`, `busqueda.html`, `detalle-vehiculo.html`, `marcas.html`, `contacto.html`, `nosotros.html`, etc.
- **Páginas generadas** (CI cada 4h desde Firestore vía `scripts/generate-vehicles.mjs`): `vehiculos/*.html`, `marcas/*.html`, `sitemap.xml`.
- **Panel admin**: `admin.html` (SPA monolítica) + cadena de `js/admin/admin-*.js`.
- **Bot ALTOR Hub**: cliente `js/concierge/concierge.js` + admin `js/admin/admin-concierge.js`.
- **CSS**: ~31 archivos en `/css/` (planos). Hojas cinematic page-specific en `css/home/`: `cinematic.css` (tokens `--cin-*`), `soft-redesign.css`, `comparar-cinematic.css`, **`detalle-cinematic.css` (cuerpo de `detalle-vehiculo`, §140)**.
- **Backend**: Firebase (Auth, Firestore, RTDB, Storage, 27 Cloud Functions V2, FCM, Analytics). Project ID `altorra-cars`.
- **Hosting**: GitHub Pages (`altorracars.github.io`). Push a `main` → auto-deploy.

### 📁 Estructura de `js/` (modular desde §119 — 128 archivos, 0 sueltos en raíz)

| Carpeta | Qué contiene | Cómo se carga |
|---|---|---|
| `js/core/` (17) | Fundación compartida: `firebase-config`, `database`, `cache-manager`, `components` (inyecta header/footer + cargador dinámico), `auth`, `toast`, `main`, `render`, `page-loader`, `performance`, `comm-schema`, `event-bus`, `favorites-manager`, `favorites-watcher`, `historial-visitas`, `solicitudes-watcher`, `perfil`, `dynamic-lists` | `<script src="js/core/X.js">` en casi todas las páginas + `<base href="/">` |
| `js/admin/` (79) | Todo lo del panel: `admin-*.js` + `hub-store`, `rbac-catalog`, `smart-fields`, `icons`, `event-bus` | `<script>` en `admin.html` |
| `js/public/` (9 + subcarpetas) | Features del sitio: `comparador`, `reviews`, `cookies`, `contact-forms`, `contact`, `filtros-avanzados`, `citas`, `vehicle-hotspots`, `featured-week-banner`. **Subcarpetas**: `js/public/home/` (index cinematic, §122) · **`js/public/detalle/` (4): `detalle-{data,render,gallery,page}.js` — `detalle-vehiculo` de-monolitizado, plain scripts scope global, orden data→render→gallery→page (§140)** | estático en HTML + dinámico vía `components.js` |
| `js/concierge/` (3) | Bot cliente: `concierge`, `concierge-optin`, `kb-client` | dinámico vía `components.js` |
| `js/ai/` (16) | Cerebro del bot: `engine`, `intent`, `ner`, `fuzzy`, `knowledge-graph`, etc. | dinámico vía `components.js` |
| `js/simulador/` (4) | Simulador de crédito: `finance`, `simulator`, `data`, `ui` | en `simulador-credito.html` |

**⚠️ Reflejo de Frescura (§G.4):** si mueves/creas/renombras un JS, actualiza esta tabla en el MISMO cambio.

---

## 🔗 Flujos de datos clave (resumen — detalle en `dependency-map.md`)

```
firebase-config.js (fundación) → database.js → cache-manager.js (4 capas)
                                      ↓
                          main.js / render.js (público)

components.js → auth.js → toast.js (notify global)
favorites-manager.js → favorites-watcher.js → toast.js (price alerts)
contact-forms.js / contact.js / citas.js → comm-schema.js → toast.js

admin-state.js (window.AP, fundación de TODO admin)
   ↓
admin-auth.js → admin-sync.js → admin-activity.js
admin-crm.js / admin-appointments.js / admin-inbox.js → comm-schema.js
```

**Módulos de alto blast radius** (tocar con IAP §37 obligatorio): `firebase-config.js` (todo), `comm-schema.js` (8+), `admin-state.js` (22 admin), `toast.js`, `auth.js`, `database.js`.

---

## 🗂️ Schema Firestore (resumen)

- `vehiculos/{id}` — inventario principal.
- `marcas/`, `concesionarios/`, `banners/`, `resenas/` — CRUD admin.
- `solicitudes/{id}` — comms unificadas (kind: cita / solicitud / lead).
- `mensajes/{threadId}` — threads por vehículo.
- `clientes/{uid}` (+ subcolecciones: busquedasGuardadas, notifications, cotizaciones, postventa, crmNotes).
- **CANÓNICO CRM nuevo (§158/§160, LIVE)**: `contacts/{dedupKey}` (persona unificada; +subcol `crmNotes`) · `leads/{id}` (interés; `status`/`rating`/`score`/`ownerId`/`sourceDetail`/`vehicleOfInterestId`/`slaDueAt`/`contactId`/`convertedTo.dealId`) · `activities/{id}` (timeline; `relatedTo.{type,id}` — type lead|deal) · `deals/{id}` (oportunidad/embudo §160; `stageId`/`probability`/`amount`/`weightedAmount`/`status`(open|won|lost)/`contactId`/`leadId`/`vehicleId`/`ownerId`) · `failedIngestions/{id}` (dead-letter). **Timestamps = strings ISO.** Índices: leads(status,createdAt) · leads(ownerId,lastActivityAt) · activities(relatedTo.id,createdAt) · contacts(rating,lastActivityAt) · **deals(status,lastActivityAt)**.
- `usuarios/{uid}` — perfiles admin (`rol`/`roleId`/`permissions[]`; la app nueva hidrata permisos de aquí, NO de claims). `auditLog/{id}` — acciones admin.
- `config/{docId}` — counters, bookedSlots, automationRules, followups, messageTemplates. **`availability` = SSoT de disponibilidad (§184)**: días/horas/interval/maxPerSlot/blockedDates(+labels)/blockedHours/`advisorOverrides`; lo leen el form web, el validador clásico (mapeado) y las functions. `calendarConfig` = MUERTO (no leer).
- **`resource_slots/{YYYY-MM-DD}`** (§184, F19) — tupla del calendario: `asesor_<uid>`/`vehiculo_<id>` → bloques 30min reservados. Escribe SOLO Admin SDK (`crmCitaAction`/jobs); staff lee. Rebuild diario F28.
- **Acciones de cita** = callable `crmCitaAction` + HTTP `citaConfirm` (token) en `functions/src/crm/citaActions.js`; sweep horario `src/ops/citaSweep.js`; mantenimiento `src/ops/crmDailyJob.js`.
- **`dedup/{key}`** (§185, F40e) — índice email/tel→contactId; lo mantienen los 4 escritores de ingestión (en tx) + trigger `onContactWritten` (espejo `dedupKeys[]` en el contact) + reconcile nocturno. Staff lee (colisiones F12); write solo Admin SDK. `merges/{id}` y `suppressions/{id}` = estado de fusión/supresión (server-only write). Grafo de contacto: `functions/src/crm/contactGraph.js`; callables F12/F14: `contactAdmin.js`. Contacts: protocolo `_version` en Rules; `_mergedInto`/`_suppressed` = tombstone/stub (filtrados del directorio).
- `system/meta` — señal de invalidación de cache. `loginAttempts/{hash}` — rate limiting.

Detalle completo y subcolecciones → `docs/dependency-map.md` §Schemas.

---

## 🚗 App CRM nueva (`admin-app/`) — §159

App admin **greenfield e independiente** del `admin.html` viejo. **Vite** (build → `admin-app/dist/`, `base:'./'`) + **Firebase modular SDK 11.3.0**, app namespaced `altorra-crm` (aísla auth). Corre en paralelo; cutover cuando tenga paridad. Modo `?mock=1` = demo sin Firebase. Arranque local: `npm run dev --prefix admin-app` (puerto 5174; Auth real NO funciona en localhost — L-08).

```
admin-app/src/
  core/      firebase · auth(lookup usuarios/{uid}) · store(reactivo) · router · theme · toast · popover · dom · mock
    design-system/  tokens(HarmonyOS VERBATIM) · crm-tokens · base · components
    layout/         shell(sidebar+topbar) · login
  domain/    PURO sin DOM/Firestore/ALTOR: format · classify · scoring(7) · nba(10) · pipeline(etapas/forecast) · agenda(grilla mes)
  modules/
    inbox/    data(queries paginadas+realtime) | domain(colas/filtro/orden) | ui  → LA BANDEJA
    contacts/ data(contact+activities+notes)   | ui(+Convertir,+Agendar→cita real) → Customer 360
    deals/    data(subscribe/convert/stage/won) | ui(kanban drag-drop)            → PIPELINE (§160)
    agenda/   data(subscribeRange+citaAction)   | ui(vista mes) | cita-dialog(F18) → AGENDA (§161/§184)
    capture/  data(createManualLead)            | new-lead(form modal)            → CAPTURA MANUAL (§162)
    config/   data+ui — editor del SSoT config/availability (#/config, F21 §184)  → DISPONIBILIDAD
  core/advisors.js — lista de asesores (usuarios → fallback rotación crmIntake)
  styles/    shell · login · inbox · contacts · pipeline · agenda · capture · config
```
- **Ruteo**: `router.js` (hash `#/bandeja`,`#/pipeline`,`#/agenda`) → `main.mountRoute` monta el módulo en el outlet con **cleanup del anterior** (cancela `onSnapshot`) + cierra el 360. `shell.setActive(route)` resalta nav + título.
- **lead → deal**: la Bandeja trabaja `leads`; "Convertir a oportunidad" crea un `deal` (Pipeline). No mezclar (L-29).
- **Agenda**: lee `activities` con `dueAt` (rango campo único → índice auto, sin compuesto, L-30); "📅 Agendar" en el 360 crea la cita. `dayKey` LOCAL (no UTC).
- **Captura manual** (leads externos Meta/WhatsApp/TikTok/llamada/referido): el form "＋ Nuevo lead" **escribe `solicitudes`** (origen=canal) → reusa la ingestión Fase 1 (dedup+consent), NO escribe el canónico directo (L-31). Cero backend nuevo.
- **Canales AUTO al canónico** (`functions/src/ingestion/`): `onSolicitudCreated` (web/manual → contact+lead+activity, §158) · `onClienteCreated` (registro `clientes/{uid}` → contact, §163) · `onSubscriptionCreated` (newsletter `subscriptions` → contact subscriber, §164). Todos: dedup `sanitizeContactId`, idempotentes, dead-letter `failedIngestions`. **Bot ALTOR diferido** (buggy). Colección nueva: `subscriptions/{id}` (newsletter público, create:if true).

- **Patrón de estado entre módulos**: la Bandeja posee los leads enriquecidos y los **espeja al `store`** (`store.set({leads})`); el panel 360 los lee de ahí (L-27).
- **Realtime acotado**: `onSnapshot`+`limit`+`unsubscribe` al desmontar (P4/§15.R3). Cero full-scan.
- **Inteligencia DETERMINISTA** (sin ALTOR/LLM, restricción dura del cliente): score 7-factores → temperatura hot/warm/cold (≥70/≥40/<40); NBA por reglas; clasificación del canónico.

---

## ⚙️ Convenciones espaciales (dónde NO equivocarse)

- Apps namespaced: `altorra-admin` vs `altorra-public` aíslan sesiones (+ default app para internals del SDK).
- Firebase Compat SDK v11.3.0 desde CDN (NO modular).
- Deploys de reglas/functions: **los ejecuta Claude** (no CI) vía `firebase deploy --only firestore:rules|database|storage|functions` (CLI auth `altorracarssale@` en la máquina). Un cambio en el repo NO se aplica solo. (Fase 1 CRM desplegada así 2026-06-05.)
- `<picture>` srcset: verifica FÍSICAMENTE que las variants existan en `multimedia/optimized/` (el optimizer NO hace upscaling — lección §95/§96/§97).

---

> Si tras leer este nodo sigues sin ubicar algo, NO adivines: lee la hoja de
> detalle enlazada arriba, o el ADR § correspondiente vía `docs/00-INDICE.md`.
