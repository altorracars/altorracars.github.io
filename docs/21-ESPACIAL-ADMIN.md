# 🗺️ 21 — MEMORIA ESPACIAL · ADMIN (`admin-app/` — portal CRM)

> **Nodo neuronal hijo de `20-ESPACIAL`** (shard §G.5 por saturación de `20`). Se lee ante
> **Trigger de Desorientación** SOBRE EL PORTAL ADMIN (`admin-app/`): dónde vive un módulo del
> CRM, cómo enruta, qué colección lee, el patrón de estado entre módulos. NO se auto-carga.
> Madre: `20-ESPACIAL` (estructura pública/repo/schema). Historia/decisión → `00-INDICE` → `99`.

---

## 🚗 App CRM nueva (`admin-app/`) — §159

App admin **greenfield**, **PORTAL ÚNICO tras el cutover F-6 (§255)** — el `admin.html` viejo quedó en `_legacy/` + redirect. **Vite** (build → `admin-app/dist/`, `base:'./'`) + **Firebase modular SDK 11.3.0**, app namespaced `altorra-crm` (aísla auth). Módulos: …+`perfil` (§253). Modo `?mock=1` = demo. Arranque local: `npm run dev --prefix admin-app` (puerto 5174; Auth real NO en localhost — L-08).

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
- **Módulos portados del clásico (E6 ②/③, §190-204)**: `reviews`·`banners`·`vehiculos`(wizard)·`marcas`·`aliados`/dealers(D5-03 gated)·`atributos`(lists)·`backup`. Todos: patrón `*.data.js`+`*.ui.js`+`styles/*.css`, registro router/main/shell, optimistic UI. **Slug docId = regex del clásico, NO `brands.slugify` NFD** (L-42).
- **PLAN-UNIFICADO (§237)** módulos nuevos de admin-app: **F-2 Config** (`usuarios`→`ajustes`, §238-245) · **F-3 `dashboard`=Inicio** (§246) · **F-4 Comunicaciones** ✅ COMPLETO (§249): `unmatched`✅(§247) + `cerebro`(KB FAQs, SIN editor del `_brain`/LLM)✅(§248, handoff →FAQ vía `store.kbPrefill`) + **`hub`✅ (chat en vivo asesor↔cliente portado de `admin-concierge.js`; claim/responder/typing/cerrar/transferir/notas; solo resumen-IA diferido=saldo)**. ⚠️ El Hub nuevo LEE `/presence` pero NO la publica (motivo run-paralelo expiró tras F-6 §255 → gap menor, transfer/atendiendo salen vacíos en multi-asesor). Patrón=`auditoria`. **dist gateado** (§237.6). **Bot público sigue en v1** (`concierge.js`); **v2 (`js/concierge/v2/altor-bot.js`, input ternario D1) construido ~tramo 1/3, NO cableado** (TODO-46/F-1).
- **Ruteo**: `router.js` (hash `#/inicio`=default landing F-3, `#/bandeja`,…) → `main.mountRoute` monta en el outlet con **cleanup del anterior** (cancela `onSnapshot`) + cierra el 360. `shell.setActive` resalta nav+título.
- **lead → deal**: la Bandeja trabaja `leads`; "Convertir a oportunidad" crea un `deal` (Pipeline). No mezclar (L-29).
- **Agenda**: lee `activities` con `dueAt` (rango campo único → índice auto, sin compuesto, L-30); "📅 Agendar" en el 360 crea la cita. `dayKey` LOCAL (no UTC).
- **Captura manual** (leads externos Meta/WhatsApp/TikTok/llamada/referido): el form "＋ Nuevo lead" **escribe `solicitudes`** (origen=canal) → reusa la ingestión Fase 1 (dedup+consent), NO escribe el canónico directo (L-31). Cero backend nuevo.
- **Canales AUTO al canónico** (`functions/src/ingestion/`): `onSolicitudCreated` (web/manual → contact+lead+activity, §158) · `onClienteCreated` (registro `clientes/{uid}` → contact, §163) · `onSubscriptionCreated` (newsletter `subscriptions` → contact subscriber, §164). Todos: dedup `sanitizeContactId`, idempotentes, dead-letter `failedIngestions`. **Bot ALTOR diferido** (buggy). Colección nueva: `subscriptions/{id}` (newsletter público, create:if true).
- **Patrón de estado entre módulos**: la Bandeja posee los leads enriquecidos y los **espeja al `store`** (`store.set({leads})`); el panel 360 los lee de ahí (L-27).
- **Realtime acotado**: `onSnapshot`+`limit`+`unsubscribe` al desmontar (P4/§15.R3). Cero full-scan.
- **Inteligencia DETERMINISTA** (sin ALTOR/LLM, restricción dura del cliente): score 7-factores → temperatura hot/warm/cold (≥70/≥40/<40); NBA por reglas; clasificación del canónico.

**⚠️ Reflejo de Frescura (§G.4):** si mueves/creas/renombras un módulo de `admin-app/`, actualiza esta neurona en el MISMO cambio.
