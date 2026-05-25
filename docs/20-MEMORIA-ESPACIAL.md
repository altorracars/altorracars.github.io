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
| Historia/decisión de un subsistema (§NN) | `docs/00-INDICE.md` → `docs/99-HISTORIAL-ADR.md` |

---

## 🏗️ Estructura del repo (vista aérea)

- **Sitio público**: `index.html`, `busqueda.html`, `detalle-vehiculo.html`, `marcas.html`, `contacto.html`, `nosotros.html`, etc.
- **Páginas generadas** (CI cada 4h desde Firestore vía `scripts/generate-vehicles.mjs`): `vehiculos/*.html`, `marcas/*.html`, `sitemap.xml`.
- **Panel admin**: `admin.html` (SPA monolítica) + cadena de `js/admin-*.js`.
- **Bot ALTOR Hub**: cliente `js/concierge.js` + admin `js/admin-concierge.js`.
- **JS**: 52 archivos en `/js/` (22 admin-only, 30 público/compartido).
- **CSS**: 27 archivos en `/css/`.
- **Backend**: Firebase (Auth, Firestore, RTDB, Storage, 27 Cloud Functions V2, FCM, Analytics). Project ID `altorra-cars`.
- **Hosting**: GitHub Pages (`altorracars.github.io`). Push a `main` → auto-deploy.

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
- `usuarios/{uid}` — perfiles admin. `auditLog/{id}` — acciones admin.
- `config/{docId}` — counters, bookedSlots, automationRules, followups, messageTemplates.
- `system/meta` — señal de invalidación de cache. `loginAttempts/{hash}` — rate limiting.

Detalle completo y subcolecciones → `docs/dependency-map.md` §Schemas.

---

## ⚙️ Convenciones espaciales (dónde NO equivocarse)

- Apps namespaced: `altorra-admin` vs `altorra-public` aíslan sesiones (+ default app para internals del SDK).
- Firebase Compat SDK v11.3.0 desde CDN (NO modular).
- Deploys de reglas/functions son **MANUALES**: `firebase deploy --only firestore:rules|database|storage|functions`. Un cambio en el repo NO se aplica solo.
- `<picture>` srcset: verifica FÍSICAMENTE que las variants existan en `multimedia/optimized/` (el optimizer NO hace upscaling — lección §95/§96/§97).

---

> Si tras leer este nodo sigues sin ubicar algo, NO adivines: lee la hoja de
> detalle enlazada arriba, o el ADR § correspondiente vía `docs/00-INDICE.md`.
