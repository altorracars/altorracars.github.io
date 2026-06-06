# Blueprint — Reconstrucción del CRM de Altorra Cars (arquitectura + modelo de datos)

> **Fase 0 (diseño, SIN código).** Documento de diseño para revisión del cliente antes de implementar.
> Autor: Claude (rol arquitecto). Fecha: 2026-06-05. Stack: Firebase + Firestore + Cloud Functions (Node) + GitHub Pages.
> Fundamentos verificados: scan profundo del código (`docs/crm-handoff.md` §1/§8) + skill `crm-architect`
> (data-model, architecture-firebase, security-rbac-compliance, sales-pipeline, modules-catalog, automotive-dealership) + doctrina `docs/46-ESCALABILIDAD.md`.
>
> **Estado**: 🟡 BORRADOR para aprobación del cliente. Tras aprobar → `writing-plans` → ADRs §158+ por sprint.

---

## 1. Resumen ejecutivo (para leer sin tecnicismos)

Reemplazamos por completo el CRM actual por uno **pensado como un todo**, sobre la misma infraestructura ($0,
Firebase/GitHub), pero **bien estructurado, modular, escalable y seguro** — dejando atrás los dos monolitos
(`admin.html` y `functions/index.js`).

La idea central, en una frase: **toda comunicación que entra por cualquier canal cae en un solo punto, se
clasifica automáticamente, y se trabaja en un embudo de ventas real — con una sola ficha por cliente y un solo
calendario.** Nada se pierde.

Para lograrlo sin romper el sitio público (que hoy depende del esquema actual), el diseño separa **tres capas**:

1. **Entrada (lo que ya existe):** el público sigue escribiendo donde escribe hoy (`solicitudes`, `clientes`…). No se toca.
2. **Ingestión (nuevo, invisible):** Cloud Functions que **normalizan** cada entrada a un modelo único, clasificando, deduplicando y registrando consentimiento.
3. **CRM canónico (nuevo):** el modelo único + el panel modular que el equipo usa. Una sola fuente de verdad.

Esto permite **construir lo nuevo al lado de lo viejo y retirar lo viejo pieza por pieza** (patrón *strangler fig*): cero "big bang", cero despliegue riesgoso.

---

## 2. Principios de arquitectura (las decisiones que mandan)

Derivados del mandato del cliente (`46-ESCALABILIDAD §1`) y right-sized a la realidad de Altorra ($0, 3 usuarios→crecimiento, sin ventas aún, un solo negocio).

| # | Decisión | Por qué |
|---|---|---|
| **P1** | **Serverless event-driven sobre Firebase.** | Firestore/Functions/Auth autoescalan a miles sin administrar servidores. La "escala horizontal" viene gratis. |
| **P2** | **Cero monolitos:** romper `admin.html` (~3.870 L) y `functions/index.js` (~3.500 L) en módulos por dominio. | Despliegues independientes, bajo acoplamiento, cambios rápidos y seguros. |
| **P3** | **3 capas en cada feature:** datos / dominio / UI. | Lógica pura testeable, aislada de Firestore y del DOM. |
| **P4** | **Una sola fuente de verdad** (modelo canónico) leída **paginada + indexada**. | ⛔ Se elimina `AP.appointments` (carga TODO en memoria = no escala). |
| **P5** | **No romper el puente público.** El público escribe igual; una capa de ingestión normaliza. | El sitio público depende del schema; cambiarlo es alto blast-radius. |
| **P6** | **Seguridad por diseño** (deny-by-default, claims, `_version`, audit, Habeas Data). | No se agrega al final; se diseña desde el inicio. |
| **P7** | **Evolución por configuración** (pipelines, reglas, campos custom = docs de config). | El admin cambia comportamiento sin tocar código. |
| **P8** | **Costo $0:** quedarse en free tier; integraciones pagas "enchufables" pero diferidas. | Invertir mejor, no gastar más. |

### Lo que deliberadamente NO hacemos (anti-sobre-ingeniería)
- ❌ Microservicios / infra propia · ❌ gRPC · ❌ GraphQL · ❌ Kafka · ❌ multi-tenant `orgs/{orgId}` (Altorra es **un solo negocio** → colecciones planas; el org-scoping sería complejidad sin valor hoy — confirmado por Gemini §15).
- ✅ **Bundler (Vite) SÍ — pero SOLO para la app admin nueva** (greenfield), no para el sitio público (sigue vanilla/Compat/CDN intacto). Da tree-shaking + **cache-busting por hash** (mata el ritual manual `CACHE_VERSION` + Ctrl+Shift+R) + HMR. Decisión revisada tras el Consejo Externo (§15).

---

## 3. Arquitectura del sistema (vista aérea)

```
        SITIO PÚBLICO (sin cambios de contrato)                 PANEL ADMIN (nuevo, modular)
   formularios · citas · bot · cuenta · favoritos          Bandeja · Pipeline · 360 · Agenda · Reportes
                 │  (escribe)                                          ▲  (lee canónico, paginado)
                 ▼                                                     │
   ┌─────────────────────────────┐   trigger    ┌──────────────────────────────────────┐
   │ CAPA DE ENTRADA (Firestore) │ ───────────▶ │  CAPA DE INGESTIÓN (Cloud Functions) │
   │ solicitudes · clientes ·    │              │  normaliza · clasifica · dedup ·     │
   │ conciergeChats · resenas ·  │              │  consentimiento · scoring · routing  │
   │ subscriptions(new)          │              └──────────────────┬───────────────────┘
   └─────────────────────────────┘                                 ▼  (escribe canónico)
                                          ┌───────────────────────────────────────────────┐
                                          │   MODELO CANÓNICO DEL CRM (Firestore, plano)  │
                                          │ contacts · leads · deals · activities ·       │
                                          │ conversations/messages · quotes · auditLog ·  │
                                          │ config/* · counters/*                          │
                                          └───────────────────────────────────────────────┘
                                            ▲ triggers (audit, denormalización, SLA, rotting)
                                            ▲ scheduled (rollups, drips, postventa)
                                            ▲ callables ("la API": convertLead, scoreLead, quotePdf, sendMessage)
```

**Comunicación (patrones):** SDK Firestore (sync) · Callable Functions = la API privilegiada · triggers + Pub/Sub = bus de eventos (async desacoplado) · Cloud Tasks/scheduled = colas/tareas pesadas · webhooks = externos (Telegram/GitHub; WhatsApp futuro).

---

## 4. Modelo de datos canónico (la columna vertebral)

> **Decisión de naming:** colecciones canónicas nuevas en **inglés** (alineadas a las plantillas de la skill:
> `firestore.rules`, `firestore.indexes.json`, `schema.types.ts`), con **valores y UI en español**. Las colecciones
> existentes del puente público (`solicitudes`, `clientes`, `resenas`) **conservan su nombre** (no se renombra → no se rompe).
> Todo registro lleva: `id, createdAt, createdBy, updatedAt, updatedBy, _version`.

### 4.1 Colecciones canónicas (nuevas, planas)

| Colección | Es | Campos clave |
|---|---|---|
| `contacts/{id}` | Persona unificada (registrado **o** invitado) | `fullName, email, phone(E.164), type(comprador/vendedor/cliente), source, ownerId, ownerName, score, rating(hot/warm/cold), lifecycleStage, tags[], consent{...}, doNotContact, clienteUid?(link a clientes), lastActivityAt, customFields{}` |
| `leads/{id}` | Interés no calificado aún | `contactId, fullName, email, phone, source(web_form/cita/bot/whatsapp/...), sourceDetail, vehicleOfInterestId, status(nuevo/trabajando/calificado/no_calificado/convertido), rating, score, ownerId, slaDueAt, consent{...}, convertedTo{contactId,dealId}, lastActivityAt` |
| `deals/{id}` | Una venta de un vehículo a una persona | `name, contactId, contactName, vehicleId, vehicleName, pipelineId, stageId, stageName, status(open/won/lost), amount, currency(COP), probability, weightedAmount, expectedCloseDate, ownerId, ownerName, source, lostReason?, nextStep, financiacion{cuotaInicial,plazo,ingresos,aprobado}, rotting, lastActivityAt` |
| `activities/{id}` | Tarea/llamada/reunión/nota/mensaje (timeline) | `type, subject, body, status, priority, dueAt, completedAt, direction, relatedTo{type,id,name}, ownerId, outcome, reminders[]` |
| `conversations/{id}/messages/{mid}` | Hilo omnicanal (email/WhatsApp/webchat/bot) | conv: `channel, status, contactId, leadId, dealId, assignedTo, lastMessage, lastMessageAt, unread...` · msg: `from(agent/contact/bot/system), text, mediaUrls[], direction, status, timestamp` |
| `quotes/{id}` | Cotización (CPQ) | `dealId, contactId, number, status, lineItems[], subtotal, total, validUntil, pdfUrl, sentAt` |
| `dataRequests/{id}` | Solicitudes Habeas Data (acceso/rectificar/olvidar) | `contactId, type, status, requestedAt, dueAt, handledBy` |
| `config/{doc}` | Configuración editable | `pipelines, fields/{entity}, enums, automations, settings, sources` |
| `counters/{doc}` | Agregados (KPIs) por rollup | sharded counters / summary docs |
| `auditLog/{id}` | Inmutable | `action, entityType, entityId, actor, changes[], ip, ts` |

### 4.2 Relación con las colecciones existentes (el puente)

| Existente (entrada) | Se conserva como | Ingestión produce |
|---|---|---|
| `solicitudes/{id}` | **Log de eventos inbound** (forms/citas/bot-lead) — inmutable de hecho | `contact` (upsert por email/phone) + `lead` o `deal` + `activity` |
| `clientes/{uid}` (+favoritos, vehiculosVistos, busquedasGuardadas) | Perfil público del cliente (lo lee el sitio) | `contact` (link `clienteUid`) + señales de intención → `lead.score` |
| `conciergeChats/{sid}` | Chat vivo del bot (no se toca) | `conversation` espejo + `lead` soft cuando hay datos |
| `resenas/{id}` | Reseñas públicas | `activity` (feedback) ligada al `contact` |
| `subscriptions/{id}` **(NUEVO)** | Suscripción newsletter (arreglar el form roto) | `contact` (lifecycle=subscriber) + consentimiento email |

> **Dedup:** la ingestión resuelve la persona por `email` normalizado → `phone` E.164 → `clienteUid`. Un invitado que
> luego crea cuenta se **fusiona** en el mismo `contact` (no duplica). Esto reemplaza el merge en memoria del CRM actual.

### 4.3 Índices compuestos (para que escale)
Declarados en `firestore.indexes.json` (deploy manual). Ejemplos por pantalla:
- `leads (status==, ownerId==, createdAt desc)` · `leads (rating==, score desc)`
- `deals (pipelineId==, stageId==, expectedCloseDate)` · `deals (ownerId==, status==, lastActivityAt desc)`
- `activities (relatedTo.id==, createdAt desc)` · `conversations (assignedTo==, lastMessageAt desc)`
- `contacts (rating==, lastActivityAt desc)` · `contacts (ownerId==, score desc)`

---

## 5. El pipeline de Altorra (tu venta real, configurable)

`config/pipelines` (editable, sin hardcode). Confirmado contigo, **sin retoma** por ahora:

| Orden | Etapa (`stageId`) | Prob. | Criterio de salida (qué debe ser cierto para avanzar) |
|---|---|---|---|
| 1 | `nuevo` | 10% | Lead capturado, sin contactar |
| 2 | `contactado` | 20% | Asesor habló/escribió al cliente |
| 3 | `cita_agendada` | 35% | Cita confirmada con fecha/hora |
| 4 | `visito` | 50% | El cliente vino al local |
| 5 | `test_drive` | 65% | Hizo prueba de manejo |
| 6 | `negociacion` | 80% | Negociando precio/condiciones |
| 7 | `financiacion` | 90% | Financiación en trámite/aprobada (o pago de contado confirmado) |
| 8 | `vendido` | 100% | **Ganado** (`type:won`) → dispara entrega + postventa |
| — | `perdido` | 0% | **Perdido** (`type:lost`, requiere `lostReason`) |

- **Kanban con drag-and-drop real** (hoy no existe): arrastrar tarjeta = cambiar `stageId` → recalcula probabilidad, escribe `activity`, dispara automatizaciones de etapa.
- **Entrega + Postventa** = workflow post-venta (encuestas +3/+30/+90 días, NPS) vía Cloud Tasks, no etapas del embudo.
- **Forecast**: Σ(`amount × probabilidad`) por periodo, vía rollups (no `count()` en vivo).
- **Rotting**: scheduled Function marca deals inactivos > `rottingDays` y notifica al dueño.

---

## 6. Seguridad y cumplimiento (desde el inicio)

| Capa | Decisión |
|---|---|
| **AuthN** | Firebase Auth (email/Google), 2FA obligatorio para admins. |
| **AuthZ** | **Custom claims** (`role`) — migrar del lookup actual a claims (más rápido, escala; ya existe `migrateLegacyUsers`). Roles: `super_admin` (CEO) + `asesor` (dueño de sus leads/deals); extensible a `manager`/`bdc`. |
| **Rules** | **Deny-by-default**, gateadas por rol + ownership (`ownerId`). Field-level con `unchanged()` (el asesor no cambia `ownerId`/`score`/consentimiento). **La barrera real** (el front solo decora). |
| **Concurrencia** | `_version` (optimistic locking) en escrituras. |
| **Secretos** | Solo en Functions config (ya está). |
| **Auditoría** | `auditLog` inmutable (create-only) + detección de anomalías. |
| **Datos** | Cifrado en tránsito (HTTPS) y reposo (Firebase). Cédula/financieros = PII sensible (no loguear; cifrar a nivel campo si se requiere). |
| **Habeas Data (Ley 1581)** | **Consentimiento previo, expreso e informado** en cada formulario público (checkbox **sin** pre-marcar + link a política, por canal). `consent{channels,purpose,askedAt,source,ip,policyVersion}` en cada contacto. Derechos acceso/rectificar/olvidar vía `dataRequests` (SLA 10 días hábiles). Toda automatización verifica `consent[canal]` y `doNotContact` antes de enviar. |

### 6.1 Modelo RBAC (rediseño pensando en el futuro)
**Base que se CONSERVA (es sólida):** 71 permisos atómicos `<recurso>.<acción>` en 8 categorías (`rbac-catalog.js`) + constructor de roles custom en el admin. **Se AÑADE** lo que falta para escalar a un equipo:
- Permisos canónicos del CRM nuevo: `leads.*`, `deals.*`, `pipeline.*`, `activities.*`, `conversations.*`.
- **Dimensión de alcance** (lo que hoy NO existe): `propio | equipo | todos`. Un rol no solo define QUÉ acción, sino SOBRE QUÉ registros.

**Roles predefinidos (listos; se activan al crecer):**
| Rol | Alcance | Puede |
|---|---|---|
| `super_admin` (CEO) | todos | Todo. Inmutable (ya existe). |
| `gerente` | equipo | Ve/reasigna leads y deals de su equipo + reportes; sin gestión de usuarios. |
| `asesor` | propio | CRUD sus leads/deals/actividades, lee compartidos; no reasigna/borra ajenos; no cambia `ownerId`/`score`/consentimiento. |
| `bdc` | propio (intake) | Captura/califica leads + agenda citas + mensajería; edición limitada de deals. |
| `viewer` | — | Solo lectura. |

- **AuthZ por custom claims** (`role`, luego `teamId`): un Function lo asigna al crear/cambiar rol; el cliente refresca token. Espejo en `usuarios/{uid}` para UI/consultas. Quita el lookup de Firestore por cada regla → más rápido y escala. (`migrateLegacyUsers` ya existe.)
- **Reglas a nivel registro:** `ownerId`/`teamId` gatean edición; field-level `unchanged('ownerId','score','consent')` para asesores.
- **Ahora (3 personas):** activar `super_admin` (tú) + `asesor` con **visibilidad abierta** (todos ven todo) pero **propiedad ya registrada**; el filtro "cada asesor ve solo lo suyo" = toggle de config cuando crezcas. `gerente`/`bdc`/`viewer` quedan predefinidos y listos.

### 6.2 Habeas Data — estado real (verificado en `privacidad.html`)
- ✅ **Ya existe** `privacidad.html` — política **Ley 1581 sólida** (responsable, datos, finalidades, derechos, canal PQRS, SIC, cláusula de autorización). **NO está escasa.**
- 🔧 Mejoras puntuales: (1) distinguir **consultas (10 días hábiles)** de **reclamos (15, extensible)** — hoy usa 15 para todo; (2) **versionar** la política (`policyVersion`) + refrescar fecha (vigente feb-2025); (3) opcional: retención específica + registro RNBD.
- ⚠️ **El hueco real está en los FORMULARIOS, no en la política:** hoy el consentimiento es **tácito** ("al enviar, autorizas"); la ley exige **expreso** (checkbox sin pre-marcar). El rebuild añade el checkbox por canal y guarda `consent{channels,purpose,askedAt,source,ip,policyVersion}`. → Esto cierra el gap legal de verdad.
- Trabajo legal detallado → lóbulo `42-LEGAL` (al ejecutarse Fase 5).

> Al diseñar el archivo `firestore.rules` concreto, se abre el lóbulo `41-SEGURIDAD` con la auditoría + tests del emulador.

---

## 7. Mapa de módulos (cero monolitos)

### 7.1 Frontend admin — app GREENFIELD nueva (Vite + Firebase modular SDK)
> App nueva e independiente (NO se construye dentro del `admin.html` viejo). Vite empaqueta a `dist`, se sirve en GitHub Pages en una ruta/entry-point nuevo durante el run paralelo, y reemplaza al viejo en el cutover (§11). El sitio público NO se toca. Cache-busting por hash de Vite (sin `CACHE_VERSION` manual para el admin).
```
admin-app/src/
  core/            shell: router, auth, state, layout, design-system, event-bus, firebase(modular SDK)
  modules/
    intake/        (datos|dominio|ui)  monitor de captura + config de fuentes/consentimiento
    inbox/         (datos|dominio|ui)  BANDEJA ÚNICA (reemplaza las 7 vistas)
    pipeline/      (datos|dominio|ui)  kanban drag-drop + forecast
    contacts/      (datos|dominio|ui)  CLIENTE 360 (reusa scoring/nba)
    agenda/        (datos|dominio|ui)  UN solo calendario (citas + disponibilidad)
    reports/       (datos|dominio|ui)  KPIs concesionario (close ratio, ROI fuente, aging, SLA, NPS)
    automation/    (datos|dominio|ui)  motor de reglas (reusa lógica actual)
    quotes/        (datos|dominio|ui)  cotización PDF (reusa amortización)
    settings/      (datos|dominio|ui)  RBAC, usuarios, config, campos custom
  domain/          lógica PURA reusable: scoring (7 factores), nba (10 reglas), predictive, pipeline-rules
```
Cada módulo: una responsabilidad, interfaz clara, **carga bajo demanda** (cargador dinámico ya existente). El shell no conoce las entrañas de cada módulo.

### 7.2 Backend — `functions/` por dominio (romper `index.js`)
```
functions/src/
  auth/          claims (onUserCreate/setRole), user mgmt
  ingestion/     ⭐ normaliza solicitudes/clientes/concierge/subscriptions → canónico (LA cura de la hemorragia)
  triggers/      audit logger, denormalización fan-out, lastActivityAt, dispatcher de automatización
  automation/    rule engine (idempotente, anti-loop)
  callables/     convertLead, scoreLead, generateQuotePdf, sendMessage, runReport
  scheduled/     SLA escalation, deal rotting, follow-up drips, postventa (+3/+30/+90), rollups KPI
  comms/         email (nodemailer), notificaciones (FCM/Telegram)
  webhooks/      telegram, github dispatch, (whatsapp futuro)
  ai/            claude chat, summaries
  index.js       solo re-exporta (codebase organizado, Node 20)
```

---

## 8. Las 5 superficies del panel (IA unificada)
Reemplazan las 7 vistas duplicadas de hoy:
1. **📥 Bandeja única** — todo lo que entra (leads/citas/solicitudes/PQR/chat/suscripciones), clasificado, filtrable, asignable, con SLA. Una sola puerta.
2. **🎯 Pipeline** — el embudo §5, drag-drop, forecast.
3. **👤 Cliente 360** — ficha unificada: comunicaciones, vehículos vistos, favoritos, citas, cotizaciones, compras, postventa, score, notas.
4. **📅 Agenda** — un solo calendario (citas + disponibilidad + festivos). Se elimina el mini-calendario de la Bandeja.
5. **📊 Reportes** — KPIs de concesionario.

El bot ALTOR (`conciergeChats`) alimenta la Bandeja vía ingestión; deja de ser un silo.

---

## 9. Bugs actuales que el rebuild corrige
- `solicitudes-watcher.js:33` estados legacy (`completado`/`rechazado`) → el cliente nunca ve cierres. (Ingestión + writeback canónico unifican estados.)
- `openContactDetail` vs `openCrmDetail` → clicks rotos en pipeline/NBA.
- `schedulePostventa` nunca llamado desde `markAsSold` → postventa automática (lo dispara la capa scheduled).
- Newsletter `onsubmit="return false"` → se implementa `subscriptions` + consentimiento.
- Registro de cuenta invisible al CRM → ingestión crea `contact` al crearse `clientes/{uid}`.

---

## 10. Plan por fases (cada fase = ADR §158+)

| Fase | Entrega | Valor |
|---|---|---|
| **0 · Blueprint** *(este doc)* | Arquitectura + modelo de datos aprobados (con Consejo Externo §15) | Decidir antes de gastar |
| **1 · Fundación + Captura** | Scaffold de la **app admin greenfield** (Vite + Firebase modular + shell + auth + RBAC claims) · `ingestion/` + colecciones canónicas + dedup + consentimiento + **backfill** · **budget alerts + `maxInstances`** | Establece la app nueva **y mata la hemorragia** |
| **2 · Bandeja única + 360** | Módulos `inbox` + `contacts` (paginado/indexado, `unsubscribe` disciplinado) | Una fuente de verdad operativa |
| **3 · Pipeline + Agenda** | `pipeline` drag-drop + `agenda` unificada + fix de bugs | El embudo real |
| **4 · Automatización + IA + Reportes** | `automation` + `scheduled` (SLA/rotting/drips/postventa) + KPIs + **búsqueda** (§15.R1) | El trabajo pesado automatizado |
| **5 · Endurecimiento + Cutover** | `firestore.rules` deny-by-default + claims + Habeas Data + tests emulador (lóbulo `41`) · **paridad → apagar el admin viejo** | Seguridad sellada + monolito retirado |

Backend: `functions/index.js` se reescribe modular por dominio (`ingestion/`, `triggers/`…) en paralelo. Cada fase: IAP §37 → implementar → tests → ADR + lección. (Cache-busting del admin lo hace Vite; el del sitio público sigue con `CACHE_VERSION` §4.)

---

## 11. Migración (GREENFIELD + run paralelo) y riesgos

- **Enfoque (revisado §15):** **app admin nueva e independiente**, NO strangler dentro del monolito. Ambas apps son *vistas* sobre el mismo Firestore (la vieja lee `solicitudes` crudas; la nueva lee el canónico) → correr en paralelo es trivialmente seguro, sin sincronizar estado entre apps. Con **0 ventas**, el riesgo del cutover es mínimo.
- **Mecánica ($0, sin dominio):** la app nueva se sirve en GitHub Pages en una **ruta/entry-point nuevo** (no subdominio — no hay dominio aún). Run paralelo unos días → paridad → se apaga el viejo `admin.html`.
- **Backfill:** Function única que ingiere `solicitudes` + `clientes` existentes al modelo canónico (idempotente, lotes ≤500).
- **Riesgos + mitigación (varios del Consejo Externo §15):**
  - **Ingestión que falla = lead perdido en silencio** (justo el bug a matar) → idempotencia + retry + colección `failedIngestions` (dead-letter) + alerta. Cero pérdida.
  - **Webhooks públicos + factura runaway** ($0→$500 en una noche si un bot inunda una Function) → **budget alerts HOY** + `maxInstances` en toda Function + rate-limit + validación de firma en webhooks.
  - **onSnapshot sin límite = miles de lecturas** por recarga → paginación estricta + `limit` + `unsubscribe()` al cambiar de vista (regla dura, refuerza P4).
  - **Búsqueda full-text** (Firestore no busca "Perez" parcial) → §15.R1.
  - Sitio público intacto (la ingestión **lee** `solicitudes`, no cambia su escritura). Deploy rules/functions **manual** → checklist por fase. QA real contra live (L-08), rollback `git revert` listo.

---

## 12. Definición de "hecho" (gap-check world-class)
Cubierto el bar de table-stakes: lead/contact/deal + pipeline kanban + actividades/calendario + inbox omnicanal + automatización + quotes + reporting + scoring (heurístico) + RBAC/audit/compliance + PWA/offline. Diferido consciente ($0): WhatsApp API, e-sign, pagos, BigQuery, búsqueda full-text (Algolia) → "enchufables" cuando haya presupuesto.

---

## 13. Decisiones del cliente (2026-06-05)
1. ✅ **Consejo Externo Gemini: SÍ** (cliente tiene Antigravity). Crítica adversarial del modelo de datos + RBAC con **Gemini 3.1 Pro (High)** ANTES de fijar la Fase 1 (prompt autocontenido entregado aparte; anti-anclaje §15-protocolo).
2. ✅ **RBAC: reestructurar pensando en el futuro** (§6.1) — modelo de roles + alcance + custom claims; activar `super_admin` + `asesor` ahora, resto predefinido.
3. ✅ **Habeas Data: la política existe y es sólida** (§6.2) — se mejora (consentimiento **expreso** en formularios + versionado + SLA consultas/reclamos). No hay que escribirla de cero.

## 14. Estado
🟢 **Arquitectura ENDURECIDA con Consejo Externo (Gemini 3.1 Pro, §15).** Pendiente solo el OK final del cliente → `writing-plans` para la Fase 1 (Fundación + Captura).

## 15. Consejo Externo (Gemini 3.1 Pro High) — resultado del red team
Crítica adversarial corrida por el cliente en Antigravity (protocolo neurona 15; anti-anclaje: mi postura fijada antes y omitida del prompt). Evaluada como **peer review** (insumo, no oráculo).

**Confirmó (3/5):** `1A` modelo canónico separado · `2A` colecciones planas (no multi-tenant) · `4A` custom claims. Coinciden con mi postura.

**Cambió mi postura (2/5) — adoptado:**
- **3 · Migración → GREENFIELD** (yo proponía strangler). Razón válida: el monolito (~7.500 L) no es legacy enterprise; strangler obligaría a mantener 2 routers + sincronizar auth/estado. Con 0 ventas, build limpio + run paralelo + cutover es más rápido y limpio. *Refinamiento mío:* "otra URL" → ruta nueva en GitHub Pages (no hay dominio); ambas apps son vistas del mismo Firestore → paralelo seguro.
- **5 · Tooling → VITE (solo app admin)** (yo difería el bundler). Razón válida: tree-shaking + **cache-busting por hash** (mata el ritual `CACHE_VERSION`/Ctrl+Shift+R) + HMR. *Mi objeción de "alto blast-radius" se disuelve* al ser greenfield: Vite aplica SOLO al admin; el público sigue vanilla/Compat/CDN. Costo: paso de build en GitHub Actions (incremental, ya hay CI).

**Riesgos incorporados (no los enfatizaba):**
- **R1 · Búsqueda full-text:** Firestore no busca parcial. A escala Altorra (decenas/cientos de leads): filtro client-side sobre set paginado + prefix-queries en campos normalizados (lowercased) = $0 y suficiente. Algolia/Typesense SOLO cuando el volumen lo exija (trigger documentado, sin cap silencioso).
- **R2 · Webhooks/billing runaway:** budget alerts + `maxInstances` + rate-limit (§11).
- **R3 · Costos onSnapshot:** paginación + `unsubscribe` disciplinado (§11, refuerza P4).
- **R4 · Dead-letter en ingestión:** retry + `failedIngestions` + alerta (§11).

**Mejor insight estratégico (adoptado como principio rector):** a $0/0-ventas el mayor riesgo no es la escala, es **quemar tiempo en complejidad accidental para un problema no validado** → arquitectura sólida pero **alcance MVP ruthless**: Fase 1 delgada que capture leads y valide con uso real ANTES de dorar fases 4-5. (Front público = "emisor de eventos tonto"; CRM = cerebro, separados por eventos desde día 0 = justo `1A`.)

**Refutado:** nada de fondo — la crítica fue sólida; solo se refinó el mecanismo de "otra URL" al contexto sin dominio.
