# 🚗 CRM — Estado actual + Plan de reconstrucción (HANDOFF para sesión nueva)

> **Hoja de detalle del cerebro.** Neurona madre: `20-MEMORIA-ESPACIAL` (§CRM) + foco vivo en `10-CORTO-PLAZO`.
> **Propósito**: que una sesión NUEVA arranque la reconstrucción del CRM con TODO el contexto verificado,
> sin re-investigar. Generado **2026-06-05** leyendo el **CÓDIGO real** (4 agentes de exploración en paralelo),
> NO el cerebro (cuyo `dependency-map.md` estaba stale — ver §1.7).
>
> **Cómo lo usa el próximo "tú"**: boot normal (`CLAUDE.md`+`05`+`10`) → invoca la skill **`crm-architect`**
> → lee ESTE documento → lee su `SKILL.md` + `references/verticals/automotive-dealership.md` →
> **`brainstorming`** con el cliente sobre las decisiones del §6 → **`writing-plans`** → ADRs **§158+** por sprint.

---

## 0. TL;DR (lo esencial)

- El admin **NO es un esqueleto**: es un sistema grande y maduro — **79 archivos en `js/admin/`**, y `admin.html` (SPA monolítica, ~3.870 líneas) carga **~94 scripts `defer`** en cadena, sin bundler.
- El **CRM ya existe**: sección `sec-crm` con 3 tabs (**Contactos / Bandeja / Pipeline**) + Customer 360 + IA heurística (scoring/NBA/predictive) + ventas/postventa.
- El **puente público↔admin funciona y es sólido**: Firestore puro, contrato en `comm-schema.js`. Es el activo más valioso — no romperlo a la ligera.
- **Bot ALTOR Hub, 28 Cloud Functions, RBAC e inventario** son subsistemas estables y reutilizables.
- Hay **bugs/deuda concretos** (§1.6) = oportunidades del rebuild.
- **Decisión grande pendiente del cliente** (§6): alcance (rebuild total vs in-place), diseño, qué duele, qué se conserva.

---

## 1. Estado actual del CRM (verificado en código, 2026-06-05)

### 1.1 Shell del admin (`admin.html`)
- SPA monolítica: **23 secciones** `#sec-*` + ~11 modales, todas pintadas y mostradas/ocultas por JS.
- **Arranque**: `firebase-config` → `event-bus` → `comm-schema` → router → `rbac-catalog` → `admin-state` (**`window.AP`**, fundación de TODO) → `admin-auth` → resto. Anti-FOUC + auth-hint en `localStorage`.
- **Sidebar**: 8 grupos con color por workspace (Inventario=gold, Sitio público=coral, CRM=blue, Agenda=violet, Comunicaciones=green, Reportes=cyan, Configuración=neutral) + topnav.
- **Ruteo**: `admin-section-router.js` (click `data-section` → muestra `#sec-X` + hash `#/seccion`) + `admin-group-tabs.js` (tabs internas por grupo + gating de visibilidad por permiso).
- **Estado/reactividad**: `window.AP` (`admin-state.js`) + `window.AltorraEventBus`. Cada módulo es un IIFE que se auto-inicializa y *pollea* hasta que hay sesión admin.

### 1.2 El CRM hoy (`sec-crm`, 3 tabs)
- **Contactos + Customer 360** (`admin-crm.js`, `window.AltorraCRM`): fusiona `clientes` (registrados) + `solicitudes` (vía `AP.appointments`) por `userId`/`email`. 360° con tabs Resumen/Comunicaciones/Actividad/Red/Score/Notas/Comentarios. Escribe `clientes/{uid}/crmNotes` + tags.
- **Tabs** (`admin-crm-tabs.js`): Contactos/Bandeja/Pipeline; persiste último tab en `localStorage`.
- **Pipeline** (`admin-pipeline.js`): kanban de 4 columnas **por temperatura de score** (Calientes ≥70 / Tibios 40-70 / Fríos <40 / Convertidos). ⚠️ **NO es drag-and-drop** (el código lo dice: "implementación completa en §27.6 pendiente").
- **IA heurística** (real, 100% client-side, **sin ML/LLM** en estas rutas): scoring de 7 factores (`admin-crm.js`), `nba.js` (next-best-action, 10 reglas), `admin-predictive.js` (hot/stale/churn/forecast), `forecast.js` (regresión lineal real + R²/IC), `knowledge-graph.js` (grafo en memoria), `admin-insights.js`, `admin-anomaly.js`.
- **Ventas/postventa**: `admin-quote.js` (cotización PDF → `clientes/{uid}/cotizaciones`), `admin-operations.js` (marcar vendido → escribe `vehiculos/{id}` + auditLog), `admin-postventa.js` (NPS vía `collectionGroup`), `admin-followups.js` (en `config/followups`), `admin-templates.js` (`config/messageTemplates`), `admin-automation.js` (motor de reglas real + EventBus).

### 1.3 Puente público ↔ admin (el activo más valioso)
**Todo es Firestore.** No hay API entre ambos: el público **escribe** documentos, el admin los **escucha** en realtime. Contrato = `js/core/comm-schema.js` (3 `kind`: `cita`/`solicitud`/`lead`; cada uno con su lista de `estados`; `computeMeta()` asigna priority + SLA + tags en cada submit; SLA: cita 30min, solicitud 2h, lead 24h).

| Origen público | Escribe en | Notas |
|---|---|---|
| "Vende tu auto" + "Financiación" (`contact-forms.js`) | `solicitudes` | `kind:'solicitud'` + `computeMeta` |
| Contacto general (`contact.js`) | `solicitudes` | `kind` calculado del asunto |
| Cita por vehículo (`citas.js`) | `solicitudes` + `config/bookedSlots` | `kind:'cita'` + reserva atómica de cupo (transacción) |
| Bot ALTOR (`concierge.js`) | `solicitudes` (lead soft), `conciergeChats`+`messages`, `unmatchedQueries` | lead progresivo L0-L5, chat escalable a asesor |

- **Admin lee**: `admin-appointments.js` (`onSnapshot` `solicitudes` → `AP.appointments` → tabla/kanban/badges **y** CRM). El inbox real = **`admin-concierge.js`** sobre `conciergeChats` (lista siempre activa, doctrina §3.6). "Lo que no entendí" = `admin-unmatched.js` sobre `unmatchedQueries`.
- **Canal inverso (admin→público)**: `solicitudes-watcher.js` (cliente ve cambios de estado de su solicitud), `citas.js` lee `config/availability`, el chat del bot es bidireccional, reseñas admin→público.

### 1.4 Backend (28 Cloud Functions + reglas)
Un solo `functions/index.js` (~3.500 líneas). Grupos: **Email** (nodemailer/Gmail: nueva solicitud, cambio de estado, alerta de precio) · **FCM + Telegram** (avisos a asesores) · **GitHub deploy** (`repository_dispatch` regenera páginas de vehículos) · **LLM bot** (`chatLLM` Anthropic/OpenAI/Google con prompt-caching) · **RBAC** (crear/borrar usuarios, triggers de roles, anti-loop §71) · **radicado/workload/cron** (auto-resolución chats idle, etc.).
**Secrets ya configurados**: `EMAIL_USER`/`EMAIL_PASS`, `GITHUB_PAT`, `LLM_API_KEY`, `TELEGRAM_BOT_TOKEN`. **NO hay** integración server-side de WhatsApp ni de calendario externo (a pesar de permisos con esos nombres).
**Seguridad (`firestore.rules`)**: la identidad admin se decide por **lookup a `usuarios/{uid}.rol` + `permissions[]`** (NO custom claims). `solicitudes`/`citas`/`config/bookedSlots` son `create:if true` (formularios públicos) con anti-impersonación si hay `userId`. `clientes/{uid}` = dueño o admin con `crm.read`. **Deploy de reglas/functions es MANUAL.**

### 1.5 Esquema Firestore (colecciones reales)
`vehiculos` · `marcas` · `concesionarios` · `banners` · `resenas` · `solicitudes` (comms unificadas) · `conciergeChats/{sid}` (+ subcol `messages`, `notes`) · `unmatchedQueries` · `clientes/{uid}` (+ subcols `crmNotes`, `cotizaciones`, `postventa`, `busquedasGuardadas`, `notifications`, `favoritos`) · `usuarios/{uid}` · `roles/{id}` · `auditLog` · `config/{counters,bookedSlots,availability,automationRules,followups,messageTemplates,calendarConfig}` · `system/{meta,workload}` · `knowledgeBase/_brain` (cerebro del bot) · `loginAttempts` · `llmRateLimit`. **RTDB**: `/presence`, `/typing`. **Storage**: `cars/`, `brands/`, `banners/`, `avatars/`.
⚠️ `mensajes/{threadId}` existe en las reglas pero es **colección MUERTA** (ninguna function ni el front la usa; el chat vivo es `conciergeChats`).

### 1.6 RBAC
- **Un solo rol de sistema**: `system_super_admin`, etiqueta **"CEO"**, permisos `['*']`, inmutable. Editor y Viewer **eliminados** (§69 R7) — usuarios legacy editor/viewer quedan bloqueados hasta asignarles un rol custom.
- **71 permisos atómicos** (`recurso.acción`) en `rbac-catalog.js`. Roles custom en Firestore `roles/`.
- **Gating**: `AP.hasPermission()` en frontend (solo UX) + `firestore.rules` (la barrera real). Hidratado al login desde `usuarios/{uid}.permissions[]`.

### 1.7 Bugs / deuda detectados (oportunidades del rebuild)
1. **`AltorraCRM.openContactDetail` referenciado pero NO definido** — `admin-pipeline.js:234` lo llama; CRM solo expone `openCrmDetail` → click no hace nada (no-op silencioso).
2. **Pipeline sin drag-and-drop** (columnas derivadas de score, no mueves cards entre etapas).
3. **Postventa NO se dispara solo** al marcar vendido (`schedulePostventa` existe pero `markAsSold` nunca lo llama).
4. **`solicitudes-watcher` usa estados legacy** (`completado`/`rechazado`) que **divergen** del schema canónico (`completada`/`rechazada`) → notificaciones al cliente que se pierden en silencio.
5. **`mensajes` muerta**; **`dynamic-lists.js` en core** apenas se usa.
6. **`dependency-map.md` quedó STALE**: decía 22 admin files / 52 JS / 27 functions / `admin-inbox.js` — todo incorrecto. Esta hoja es la fuente de verdad actual del CRM.
7. Existe un **`altorra-cars-design-system/`** completo (rediseño index/catalog/detail/etc. + tokens/preview, tema HarmonyOS) — relevante si el CRM nuevo debe seguir ese sistema visual.

---

## 2. Qué se REUSA vs qué se RECONSTRUYE (mi lectura — sujeta a tus condiciones)

| Subsistema | Recomendación | Por qué |
|---|---|---|
| Puente Firestore + `comm-schema.js` | **Reusar** (núcleo) | Funciona, está bien diseñado, lo consume el sitio público. Cambiarlo toca el público también. |
| Bot ALTOR Hub + 28 Cloud Functions | **Reusar** | Subsistema maduro y estable; fuera del dolor del CRM. |
| RBAC (1 rol CEO + permisos atómicos) | **Reusar / extender** | Ya simplificado (§69). El CRM nuevo se cuelga de `hasPermission`. |
| Inventario (`vehiculos`, admin-vehicles) | **Reusar** | No es el foco del rebuild. |
| `sec-crm` (Contactos/Pipeline/360/IA) | **Candidato a rebuild** | Es el dolor. Pipeline no funcional, bugs §1.7, IA heurística que podría madurar. |
| `admin.html` monolítico (~94 scripts) | **A discutir** | ¿Modularizar? ¿Mantener vanilla sin bundler? Decisión de alcance (§6). |

---

## 3. Marco de trabajo: skill `crm-architect`
Ubicada en `skills/crm-architect/` (commit `6cc0055`, registrada en `40-LOBULOS`). Calza el stack EXACTO (Firebase + Firestore + Cloud Functions). Trae: data-model, pipeline de ventas, automatización, AI (scoring/copilot/NBA), reporting, integraciones (email/WhatsApp/calendar/e-sign/payments), **RBAC + Ley 1581** (hábeas data Colombia), reglas Firestore listas, schemas, Functions, UI y CI/CD. Vertical específico: `references/verticals/automotive-dealership.md` (concesionario, usados y nuevos). Scripts: `scaffold_crm.mjs` / `generate_module.mjs` / `validate_crm.mjs`.

---

## 4. Plan propuesto (fases) — sujeto a tus condiciones del §6/§7
1. **Invocar `crm-architect`** + leer su `SKILL.md` + `automotive-dealership.md`.
2. **`brainstorming`** del ALCANCE con el cliente (resolver §6) — NO escribir código hasta diseño aprobado (hard-gate).
3. **Auditar** el CRM actual (este doc) vs el framework de la skill → gap analysis.
4. **`writing-plans`** → plan por sprints → ADRs **§158+**, uno por sprint.
5. Por cada sprint: IAP §37 → implementar → tests → cache bump §4 → consolidar ADR + lección.

---

## 5. Riesgos + Consejo Externo (neurona 15)
El **modelo de datos / colecciones Firestore / RBAC** del CRM son decisiones **caras de revertir** (el sitio público depende del schema; migrar datos es costoso). → Candidatos a **crítica adversarial de Gemini Pro (High)** vía Antigravity ANTES de comprometer (cuándo + matriz de modelo en `docs/15-CONSEJO-EXTERNO.md`).
Otros riesgos: tocar `comm-schema.js` impacta el sitio público; deploy de reglas/functions es manual; QA visual real solo contra el sitio live (L-08).

---

## 6. DECISIONES QUE EL CLIENTE DEBE DEFINIR (las "condiciones")
> El próximo "tú": haz estas preguntas en el `brainstorming` (una a una) si el cliente no las dejó respondidas en §7.

1. **Alcance**: ¿rebuild TOTAL del admin/CRM desde cero, o reconstruir el CRM **dentro** de esta SPA reusando el puente Firestore?
2. **Arquitectura**: ¿se mantiene vanilla JS sin bundler, o se modulariza / migra build (Vite/Cloudflare, TODO-01)?
3. **Diseño**: ¿el CRM nuevo sigue el `altorra-cars-design-system` (HarmonyOS) u otra dirección visual?
4. **Qué DUELE hoy** del CRM actual (lo que motiva el cambio) — prioridad #1 a resolver.
5. **Qué se CONSERVA intacto** (bot, functions, RBAC, inventario, puente público… ¿todo o también entra al rebuild?).
6. **Funcionalidad nueva** deseada (¿WhatsApp real? ¿pipeline drag-drop? ¿e-sign? ¿pagos? ¿reporting?).
7. **Equipo/operación**: ¿cuántos asesores? ¿flujo de venta real del concesionario?

---

## 7. [ESPERANDO DEL CLIENTE] — rellenar antes/durante la sesión nueva
> El cliente dijo: *"te daré varias condiciones y lineamientos"* + *"cambiaremos todo"*. Aquí van sus palabras.

### 7.1 Condiciones / lineamientos
_(pendiente — el cliente las dictará)_

### 7.2 Cómo ve el cliente el estado actual de la página
_(pendiente)_

### 7.3 Qué quiere el cliente para el CRM
_(pendiente)_
