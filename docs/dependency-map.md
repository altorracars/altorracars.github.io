# Altorra Cars — Dependency Map (Mega-Plan v4 baseline)

> **Generated**: 2026-05-05 (Microfase A.3)
> **Purpose**: snapshot of all JavaScript modules and their dependencies
> before starting the v4 rebuild. Reference for impact analysis: when
> a MF touches one of these files, check what else depends on it.

## Total inventory

- **52 JS files** in `/js/`
- **22 admin-only** (`admin-*.js`)
- **30 public/shared**
- **CSS files**: 27 in `/css/`
- **HTML pages**: ~90 (root + `/vehiculos/*` + `/marcas/*` generated)

## Module categories

### 🌐 Public site core (must always work)
- `firebase-config.js` — initializes Firebase, exports `window.db`, `window.auth`, etc.
- `database.js` — `vehicleDB` global with caching + realtime
- `cache-manager.js` — 4-layer cache (memory + IndexedDB + localStorage + SW)
- `main.js` — homepage orchestrator
- `components.js` — header/footer injection, `loadAuthSystem()`
- `auth.js` — Firebase Auth wrapper, `window.AltorraAuth`
- `render.js` — vehicle card rendering
- `page-loader.js` — initial loading screen
- `performance.js` — lazy load images, IntersectionObserver

### 🛒 Public features
- `favorites-manager.js` — favorite IDs CRUD with Firestore sync
- `favorites-watcher.js` — diff engine for favorites (price/status changes)
- `historial-visitas.js` — recently viewed tracker
- `comparador.js` — vehicle comparison tool
- `filtros-avanzados.js` — search filters
- `featured-week-banner.js` — homepage featured banner
- `reviews.js` — public reviews rendering
- `cookies.js` — cookie consent banner
- `dynamic-lists.js` — public lists module (UNUSED on most pages — eligible for cleanup)

### 📞 Public communications (refactored multiple times)
- `comm-schema.js` — single source of truth for kind/states/computeMeta/formatSLA
- `contact-forms.js` — Vende Auto + Financiación modals
- `contact.js` — Contacto general form
- `citas.js` — Cita por vehículo modal
- `vehicle-thread.js` — Per-vehicle message widget (MF2.5)
- `whatsapp-widget.js` — Floating WhatsApp template chooser (MF5.1)
- `ai-assistant.js` — Floating AI FAQ bot (MF5.3)
- `vehicle-hotspots.js` — Clickable dots over vehicle images (MF5.2)
- `solicitudes-watcher.js` — Realtime listener for client's own solicitudes (Pillar D)

### 🔔 Notifications (v2)
- `toast.js` — `notify` API + `notifyCenter` bell + Sound module + History center

### 🛠️ Admin core
- `admin-state.js` — `window.AP` global, RBAC helpers, escapeHtml
- `admin-auth.js` — admin login, 2FA, presence, session timeout
- `admin-sync.js` — realtime listeners for vehiculos/marcas/banners
- `admin-table-utils.js` — pagination/sort/search/CSV utilities
- `admin-activity.js` — audit log viewer
- `admin-phase5.js` — wizard, charts, theme

### 🛠️ Admin features
- `admin-vehicles.js` — vehicle CRUD
- `admin-brands.js` — brand CRUD
- `admin-banners.js` — banner CRUD
- `admin-dealers.js` — dealer CRUD
- `admin-users.js` — user CRUD (super_admin only)
- `admin-reviews.js` — reviews moderation
- `admin-lists.js` — leads management

### 🛠️ Admin Comunicaciones + CRM (MF1-MF6 v2)
- `admin-appointments.js` — Comunicaciones tabs/kanban/states + manage modal (MF3.x)
- `admin-crm.js` — CRM section + 360° + KPIs + funnel (MF4.1-4.5, MF4.4)
- `admin-inbox.js` — Inbox unified for vehicle threads (MF4.7)
- `admin-quote.js` — PDF quote generator (MF4.6)
- `admin-postventa.js` — Postventa scheduler + NPS (MF4.8)
- `admin-automation.js` — Workflow rules engine (MF6.1)
- `admin-followups.js` — Scheduled follow-ups (MF6.2)
- `admin-templates.js` — Message templates CRUD (MF6.3)
- `admin-operations.js` — Sales registration, GitHub deploy

## Dependency graph (text)

```
firebase-config.js (foundation)
  ↓
database.js → cache-manager.js
  ↓
main.js, render.js (public)

components.js
  ↓
auth.js → toast.js (notify global)
  ↓
favorites-manager.js → favorites-watcher.js → toast.js (price_alert events)
historial-visitas.js → toast.js (recently viewed events)
solicitudes-watcher.js → auth.js + toast.js
contact-forms.js, contact.js, citas.js → comm-schema.js → toast.js
vehicle-thread.js → firebase-config.js + auth.js
whatsapp-widget.js, ai-assistant.js → comm-schema.js (write to solicitudes/)

admin-state.js (foundation for all admin-*)
  ↓
admin-auth.js → admin-sync.js → admin-activity.js
admin-vehicles.js, admin-brands.js, etc. → admin-state.js + admin-table-utils.js
admin-appointments.js → admin-state.js + comm-schema.js + toast.js
admin-crm.js → admin-state.js + admin-appointments.js (reads AP.appointments)
admin-inbox.js → admin-state.js + Firestore mensajes/
admin-quote.js → admin-state.js + clientes/{uid}/cotizaciones/
admin-postventa.js → admin-followups.js
admin-followups.js → admin-state.js
admin-automation.js → admin-state.js + AP.appointments
admin-templates.js → admin-state.js + config/messageTemplates
```

## Critical "shared" modules (high blast radius if changed)

| File | Used by N modules | Change blast radius |
|---|---|---|
| `firebase-config.js` | ~all | EVERYTHING |
| `comm-schema.js` | 8+ modules | All comms + admin |
| `admin-state.js` | 22 admin files | Entire admin |
| `toast.js` (notify) | ~all that emit notifications | Bell + toast UX |
| `auth.js` | All auth-aware modules | Login flows |
| `database.js` | All vehicle reads | Public site |

## Schemas (Firestore collections)

- `vehiculos/{id}` — main inventory
- `marcas/{id}`, `concesionarios/{id}`, `banners/{id}`, `resenas/{id}` — admin CRUD
- `solicitudes/{id}` — unified comms (kind: cita / solicitud / lead)
- `mensajes/{threadId}` — vehicle threads (MF2.5)
- `clientes/{uid}` — registered users
  - `clientes/{uid}/busquedasGuardadas/{id}` — saved searches
  - `clientes/{uid}/notifications/{id}` — bell sync (A4)
  - `clientes/{uid}/cotizaciones/{id}` — quotes (MF4.6)
  - `clientes/{uid}/postventa/{saleId}` — post-sale tracking (MF4.8)
  - `clientes/{uid}/crmNotes/{nid}` — internal notes (MF4.2)
- `usuarios/{uid}` — admin profiles
- `auditLog/{id}` — admin actions
- `config/{docId}` — counters, bookedSlots, automationRules, followups, messageTemplates
- `system/meta` — cache invalidation signal
- `loginAttempts/{hash}` — rate limiting
- `events/` — Event Bus log (planned in I.1)
- `conversaciones/{id}` — Concierge unified (planned in U.2)

## Files eligible for consolidation in v4

- `dynamic-lists.js` — appears unused, candidate for removal
- Multiple `*-fixes.css` already merged in P6
- `whatsapp-widget.js` + `ai-assistant.js` — both replaced by Concierge in U.4

## Globals exposed on `window`

- `window.db`, `window.auth`, `window.storage`, `window.functions`, `window.rtdb`
- `window.firebaseAnalytics`
- `window.vehicleDB`
- `window.AP` (admin)
- `window.AltorraAuth`
- `window.AltorraCache`
- `window.AltorraCommSchema`
- `window.AltorraFavWatcher`
- `window.AltorraSolWatcher`
- `window.AltorraNotify` / `window.notify`
- `window.notifyCenter`
- `window.AltorraVehicleThread`
- `window.AltorraWaWidget`
- `window.AltorraAI`
- `window.AltorraHotspots`
- `window.AltorraCRM`
- `window.AltorraAdminInbox`
- `window.AltorraAutomation`
- `window.AltorraFollowups`
- `window.AltorraTemplates`
- `window.AltorraQuote`
- `window.AltorraPostventa`
- `window.AltorraEventBus` (planned in I.1)
- `window.AltorraConcierge` (planned in U.4)

## Anti-patterns currently in the codebase

| Issue | Location | Plan to fix |
|---|---|---|
| 22 admin-* JS files at top of admin.html as `<script src defer>` chain | `admin.html` lines 1939-1965 | T.6 will consolidate per workspace |
| Inline styles `style="..."` everywhere in admin.html | ~50+ instances | T.1 + T.6 use design tokens |
| 16 sections at sidebar root with no grouping | `admin.html` sidebar | B.1 reorganizes to 8 sections |
| `whatsapp-widget.js` + `ai-assistant.js` are 2 separate floating buttons | bottom-right of public site | U.4 unifies into single Concierge button |
| Each admin section has its own listener — costoso | `admin-sync.js`, `admin-appointments.js`, `admin-crm.js`, `admin-inbox.js`, etc. | I.1 EventBus orchestrates a single source of truth |

## Migration debt

- `mensajes/{threadId}` (MF2.5) → `conversaciones/{id}` (U.2/U.3) when Concierge ships
- Legacy estados (pre-MF1.2) → migrated; preserved as `legacyEstado`
- Old transient bell entries (pre-A1) → migrated; cleaned by G1
- Future: legacy `dynamic-lists.js` callsites if found → removed in P cleanup
