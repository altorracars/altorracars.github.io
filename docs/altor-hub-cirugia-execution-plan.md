# ALTOR HUB — Plan de Cirugía Técnica Ejecutable

> **Documento de ejecución auto-contenido para reconstrucción microquirúrgica del ALTOR Hub.**
>
> Generado en sesión `019oiVeU22EoYVtVFd91BrpK` el 2026-05-08.
> Reemplaza al §59 de CLAUDE.md como fuente operativa.
> Diseñado para ser **ejecutable desde una ventana de contexto nueva** sin contexto previo.

---

## 📋 ÍNDICE

0. [Instrucciones para nueva ventana de Claude](#0-instrucciones-para-nueva-ventana-de-claude)
1. [Contexto del proyecto](#1-contexto-del-proyecto)
2. [Doctrinas obligatorias del repo](#2-doctrinas-obligatorias-del-repo)
3. [Diagnóstico forense del problema](#3-diagnóstico-forense-del-problema)
4. [Investigación industry-standard de 15 sistemas](#4-investigación-industry-standard-de-15-sistemas)
5. [Patrones consolidados a adoptar](#5-patrones-consolidados-a-adoptar)
6. [Arquitectura objetivo](#6-arquitectura-objetivo)
7. [Sprints ejecutables S1-S7](#7-sprints-ejecutables-s1-s7)
8. [Eliminación de código muerto](#8-eliminación-de-código-muerto)
9. [Checklist post-commit obligatorio](#9-checklist-post-commit-obligatorio)
10. [Anexos: schemas y helpers](#10-anexos-schemas-y-helpers)

---

## 0. INSTRUCCIONES PARA NUEVA VENTANA DE CLAUDE

Si estás leyendo esto en una sesión nueva sin contexto previo, **leé en este orden**:

1. **Sección 1** (Contexto del proyecto) — entender el stack y restricciones.
2. **Sección 2** (Doctrinas obligatorias) — reglas inquebrantables de §17/§19/§35/§37 + §57.7-57.9.
3. **Sección 3** (Diagnóstico forense) — entender QUÉ ESTÁ ROTO y POR QUÉ.
4. **Sección 7** (Sprints S1-S7) — la receta paso-por-paso.
5. **Sección 9** (Checklist post-commit) — qué validar antes de pushear.

**Antes de tocar código**:
- Ejecutar `node -c` sobre cada archivo JS modificado.
- Confirmar cache bump en `service-worker.js` Y `js/cache-manager.js`.
- Documentar en `CLAUDE.md` con sub-sección §60.X (continuando la numeración).
- Cero anti-patterns: NO `MutationObserver subtree:true`, NO `pointermove` persistente, NO `transition: all`.

**Antes de cada sprint**:
- Leer la sección correspondiente COMPLETA antes de tocar código.
- Verificar que el sprint anterior está pusheado y validado por el cliente.
- IAP §37 (Impact Analysis Previo) en formato de 5 secciones.

**Restricción crítica del cliente**:
> "Estamos operando bajo un modelo gratis, por lo que todas las
> implementaciones deben ir encaminadas en este momento a no
> gastar un peso."

Esto significa: solo Firebase free tier. Cero servicios pagos adicionales (Pusher, Ably, Twilio, OpenAI Realtime, etc.). El LLM Anthropic Claude Haiku 4.5 ya tiene saldo cargado y está optimizado en §21.10. No agregar más costos.

---

## 1. CONTEXTO DEL PROYECTO

### 1.1 Identidad

- **Repo**: `altorracars/altorracars.github.io`
- **Producto**: Altorra Cars — compra/venta de autos usados en Cartagena, Colombia.
- **Sitio público**: `altorracars.github.io` (GitHub Pages estático).
- **ALTOR Hub**: sistema de chat tipo Intercom/WhatsApp Business para atención cliente↔asesor en tiempo real.

### 1.2 Stack tecnológico

| Capa | Tecnología | Versión |
|---|---|---|
| Hosting | GitHub Pages (estático) | — |
| Base de datos | Firestore (Firebase) | Compat SDK v11.3.0 |
| Real-time complementario | Firebase Realtime Database | Compat SDK v11.3.0 |
| Auth | Firebase Auth | Compat SDK v11.3.0 |
| Cloud Functions | Firebase Functions v2 | Node 22 |
| Push notifications | FCM Web Push | — |
| LLM | Anthropic Claude Haiku 4.5 | API directa, ~$2-5/mes |
| Telegram | Bot API (alertas) | — |
| Frontend | HTML/CSS/JS vanilla (NO React/Vue/Svelte) | — |
| Build tools | Ninguno (sin webpack/vite) | — |
| Linting | Biome 1.9.4 | — |
| Iconos | Lucide v0.468.0 (CDN) | — |
| Generación SEO | `scripts/generate-vehicles.mjs` (Node 22) | — |
| CI | GitHub Actions cada 4h | — |

### 1.3 Archivos críticos del Hub

```
js/concierge.js                3,265 líneas    Widget cliente público (IIFE)
js/admin-concierge.js          1,689 líneas    Panel admin
css/concierge.css              1,492 líneas    Estilos widget
css/admin.css     (sec-concierge dentro)       Estilos admin
functions/index.js             2,355 líneas    12 Cloud Functions del Hub
firestore.rules                  518 líneas    Permisos DB
database.rules.json                            Permisos RTDB (presence)

CLAUDE.md                     ~25,000 líneas   Bitácora completa del proyecto
docs/altor-hub-cirugia-execution-plan.md       ESTE ARCHIVO
```

### 1.4 Estado actual del Hub (resumen del agente de auditoría)

**Frontend cliente** (`concierge.js`):
- 40 listeners/timers/event handlers activos.
- 3 listeners Firestore: `_firestoreUnsub` (mensajes), `_firestoreParentUnsub` (doc parent), `_workloadUnsub` (singleton workload).
- IIFE con state global `session` persistido en localStorage.
- Helper `cleanSessionAndRender()` (§57.quint) — atomic reset + welcome render.
- `finalCloseAndCleanup()` (§57.9) — solo cierra panel, lazy reset on next open.
- Lead Capture Gate progresivo (5 campos: nombre, apellido, cédula, celular, email + consent).
- 4 quick actions en panel: escalate, descargar PDF, finalizar conversación, cerrar chat.

**Frontend admin** (`admin-concierge.js`):
- 20 listeners/timers/event handlers.
- 2 listeners Firestore: `_chatsUnsub` (lista global, §57.7 siempre activo), `_messagesUnsub` (chat activo).
- Heartbeat 30s self-healing (§57.7).
- Cache `_activeMessages` (§57.ter) — fix race con re-render del detail panel.
- 3 filtros: Activos / Fijados / Archivados.
- Claim system con Firestore transaction (§23 FASE 3).
- Smart suggestions (§U.12) para asesor.
- Auto-summary cada 10 turnos del cliente (§F.1).

**Backend** (`functions/index.js`, 12 funciones del Hub):

| Function | Tipo | Trigger |
|---|---|---|
| `chatLLM` | Callable | Client invoke (provider abstraction Anthropic/OpenAI/Google) |
| `summarizeChat` | Callable | Admin invoke (resumen IA del chat) |
| `onConciergeMessageAdded` | Firestore onCreate | Auto-summary cada 10 turnos |
| `onConciergeChatCreated` | Firestore onCreate | Asigna radicado `REQ-YYYYMM-XXXX` |
| `recalculateWorkloadOnChatChange` | Firestore onWrite | Recalcula `system/workload` |
| `recalculateWorkloadScheduled` | Schedule every 1m | Safety net |
| `onChatEscalated` | Firestore onUpdate | FCM Web Push a asesores |
| `onChatEscalatedTelegram` | Firestore onWrite | Telegram alert al equipo |
| `proactiveEngagement` | Schedule every 5m | Nudges si cliente inactivo + bot mode + 6h ventana |
| `linkTelegramChat` | HTTP webhook | Telegram /start vincula chatId |
| `setupTelegramWebhook` | Callable | Configura webhook del bot |
| `getTelegramWebhookStatus` | Callable | Diagnóstico del webhook |

**Schema Firestore** (`conciergeChats/{sessionId}`, ~40 campos):

```
sessionId, userId, userEmail, userNombre, userTelefono, userCedula,
mode (bot|queue|live|wa_handed_over), status (active|closed),
level (0-5), profile, sourcePage, sourceVehicleId,
lastMessage, lastMessageAt,
unreadByAdmin, unreadByUser, forceUnreadByAdmin,
isPinned, pinnedAt, isArchived, archivedAt, archivedBy,
isDeleted, deletedAt, deletedBy,
activeAsesor, context,
claimedBy, claimedByName, claimedAt, claimReleasedBy, claimReleasedAt,
escalationReason,
queueEnteredAt, slaWarnedAt5min, slaWarnedAt10min,
radicado, radicadoAt, historicalUserKey,
closedReason, closedByRole, closedAt, closedBy, closedByName,
resolvedAt, resolvedBy, reopenedAt, reopenedBy,
notifiedFcmAt, notifiedTelegramAt, telegramAlertsCount, telegramSkipReason,
summary, summaryUpToTurn, summaryUpdatedAt, summaryModel,
botFallbackCount, botFallbackAt,
lastProactiveAt,
createdAt
```

Subcolección `messages/{msgId}`:
```
from ('user'|'bot'|'asesor'|'system'), text, timestamp,
systemType (closed|reopened|asesor_joined|...),
asesorUid, asesorNombre, asesorPhotoURL,
proactive (bool), triggerType,
cta (object), quickReplies (array), vehicleCards (array)
```

Singleton `system/workload`:
```
asesoresOnline, asesoresAvailable, asesoresSaturated,
queueLength, avgWaitMinutes, longestWaitMinutes,
activeChatsByUid, updatedAt
```

---

## 2. DOCTRINAS OBLIGATORIAS DEL REPO

Estas son **inquebrantables**. Cualquier cambio que las viole será reverted.

### 2.1 §17 — Reglas operativas de performance

- ❌ NO `transition: all` (anima TODO incluyendo layout properties caras).
- ❌ NO animar `width`, `height`, `top`, `left`, `right`, `bottom`, `margin`, `padding` en transitions.
- ❌ NO `backdrop-filter` en elementos `position: fixed/sticky` o en cards de N items.
- ❌ NO `setInterval` de alta frecuencia (>10 fps).
- ❌ NO listeners de scroll que muten DOM cada frame sin state-tracking.
- ❌ NO `pointermove` listeners persistentes globales.
- ❌ NO crear `<img>` dinámicos sin `loading="lazy" decoding="async"`.
- ✅ SÍ `transition: transform, opacity` (compositor-only).
- ✅ SÍ `requestIdleCallback` para inits no críticos.
- ✅ SÍ `IntersectionObserver` para detección viewport (NUNCA `subtree:true`).
- ✅ SÍ `passive: true` en `scroll`, `touchstart`, `touchmove`, `wheel`.

### 2.2 §17.12 — RCA STRUCTURAL FIX (anti-MutationObserver)

> "NUNCA usar un MutationObserver global con `subtree: true` que
> ejecute operaciones DOM costosas. Si necesitás re-procesar HTML
> nuevo, llamá explícitamente desde el callsite que lo inyecta."

Patrón histórico que rompió clicks en centro de botones del header. Documentado en CLAUDE.md §17.12 con investigación forense completa.

### 2.3 §19 — RCA Mode (Root Cause Analysis estricto)

Cuando un bug aparezca tras 2+ commits sin solucionar:

1. **Fase 1 — Escaneo**: leer código real, NO confiar en memoria.
2. **Fase 2 — Validación**: telemetría con `console.log` específicos.
3. **Fase 3 — Reporte**: documento de causa raíz con evidencia.
4. **Fase 4 — STOP obligatorio**: pedir autorización antes de implementar.
5. **Fase 5 — Solución estructural**: NO parche local.

### 2.4 §35 — Anti-patterns acumulados

- Eliminar `MutationObserver subtree:true` activos.
- Eliminar `pointermove` persistentes (solo durante drag activo con `setPointerCapture`).
- Eliminar `transition: all` global.
- Cards en grids: `contain: layout style` + `content-visibility: auto`.

### 2.5 §37 — Protocolo IAP (Impact Analysis Previo)

ANTES de cada commit, redactar:

**A. Archivos a modificar** (con líneas aproximadas)
**B. Archivos INTACTOS** (afirmación explícita de qué NO se toca)
**C. Código muerto a eliminar** (en este commit o como deuda)
**D. Código a refactor/limpiar**
**E. Riesgos + plan de rollback**

Más checklist post-cambio:
- [ ] `node -c` syntax válido
- [ ] Sin orfandad (grep de identifiers eliminados)
- [ ] Cache bump aplicado
- [ ] Selectores CSS válidos
- [ ] Anti-patterns evitados
- [ ] CLAUDE.md documentado
- [ ] Lecciones aprendidas extraídas

### 2.6 §57.9 — Lazy reset on next open (industry-standard)

Patrón Intercom/Drift/WhatsApp: **separar radicalmente "cerrar UI" de "resetear state"**.

```js
// Cerrar chat → SOLO cierra panel (NO toca session)
function finalCloseAndCleanup() {
    panel.classList.remove('cnc-open');
    panel.style.opacity = '0';
    // NADA MÁS. session.closed permanece true.
}

// Iniciar nueva conversación → SOLO resetea state (NO cierra panel)
case 'reset-from-finalized':
    cleanSessionAndRender();
    break;

// Próxima apertura → detecta closed=true y resetea automáticamente
function open() {
    panel.classList.add('cnc-open');
    if (session.closed === true) {
        cleanSessionAndRender();  // lazy reset
        return;
    }
    renderMessages();
    applyClosedState();
}
```

### 2.7 §57.7 — Listeners admin globalmente activos

`_chatsUnsub` debe estar SIEMPRE activo mientras admin esté logueado (editor+), independientemente de la sección. Solo `_messagesUnsub` (chat específico) cancela on section change. Heartbeat 30s self-healing como defense-in-depth.

### 2.8 §17.4 — HTML/CSS estable

- IDs preservados al refactorizar.
- Edits sobre archivos existentes (NO crear `concierge-v2.js`).
- Cache version bumped en `service-worker.js` Y `js/cache-manager.js`.

---

## 3. DIAGNÓSTICO FORENSE DEL PROBLEMA

### 3.1 Quote literal del cliente

> "El problema crítico y más urgente radica en la sincronización en tiempo
> real: las respuestas del chat, la actualización de estados, las
> funcionalidades y la reacción de los botones de acción no se reflejan
> instantáneamente al interactuar con ellos."

> "Hay un problema grande y hemos hecho muchos commit sin conseguir
> resultados, creo que no estás investigando a fondo a los grandes ni
> cómo usan el código para este tipo de implementaciones."

### 3.2 Causa raíz #1 — Asimetría Optimistic UI cliente vs admin

**Cliente** (`js/concierge.js:793` — `addMessage`):

```js
function addMessage(from, text, opts) {
    var msg = {from, text, timestamp: Date.now(), _synced: false};
    session.messages.push(msg);     // ← state update INSTANT
    saveSession(session);            // ← localStorage INSTANT
    renderMessages();                // ← DOM update INSTANT
    // ↓ Sync background, NO bloquea UI
    if (_chatDocCreated) syncMessageToFirestore(msg);
}
```

✅ **Cliente operativo**: ve su mensaje INSTANT.

**Admin** (`js/admin-concierge.js:972` — `_sendAsesorMessageInternal`):

```js
function _sendAsesorMessageInternal(input, text) {
    input.value = '';
    var msg = {from: 'asesor', text, ...};
    window.db.collection('conciergeChats')             // ↓ ESPERA AL SERVER
        .doc(_activeSessionId)
        .collection('messages').add(msg);
    // El mensaje aparece SOLO cuando el onSnapshot listener
    // recibe el documento (500ms-2s después).
}
```

❌ **Admin roto**: input se limpia, espera 500ms-2s, recién aparece el bubble.

### 3.3 Causa raíz #2 — 7 botones admin sin Optimistic UI

| Función | Línea (admin-concierge.js) | Acción Firestore | Latencia |
|---|---|---|---|
| `claimChat` | 838 | `runTransaction` | 500ms-2s |
| `togglePin` | 264 | `.set({isPinned}, merge)` | 200ms-1s |
| `toggleArchive` | 278 | `.set({isArchived}, merge)` | 200ms-1s |
| `markUnread` | 299 | `.set({forceUnreadByAdmin}, merge)` | 200ms-1s |
| `closeChat` | 994 | 2 escrituras paralelas | 500ms-2s |
| `reopenChat` | 1039 | 2 escrituras paralelas | 500ms-2s |
| `hardDeleteChat` | 315 | Batch delete | 1-3s |

**Patrón roto**: click → escribe a Firestore → espera al snapshot → recién actualiza UI.

### 3.4 Causa raíz #3 — Botones cliente que también esperan

| Acción | Función | Latencia |
|---|---|---|
| `escalateToLive` | concierge.js:1038 | 1-2s (Firestore set + workload listener) |
| `markSessionFinalized` | concierge.js:2183 | 500ms-1s (Firestore set status='closed') |

### 3.5 Causa raíz #4 — Latencia confirmada en producción

Del CLAUDE.md §57.7.9, cliente confirmó **~1.5-2s** desde escalado hasta aparición en Hub admin:

| Tramo | Tiempo aproximado |
|---|---|
| Cliente: write a Firestore (`mode='queue'`) | 200-400ms |
| Eventarc: Firestore → Cloud Function | 300-600ms |
| Firestore: snapshot.update event al listener admin | 200-500ms |
| Admin browser: render de la card en lista lateral | 50-100ms |
| **Total observado por cliente** | **~1.5-2s** |

WhatsApp Web está en <300ms p50. **Brecha de 5-7x** vs el estándar de la industria.

### 3.6 Causa raíz #5 — Faltantes funcionales

- ❌ **Cero typing indicators**: ni cliente ni admin saben cuándo el otro escribe.
- ❌ **Cero read receipts**: no hay ✓ enviado vs ✓✓ visto.
- ❌ **Cero status pendiente**: cuando un mensaje envía pero no confirma, no hay feedback visual.
- ❌ **Estado del botón sin feedback intermedio**: click "Tomar conversación" → 1s de "nada" → cambio brusco.
- ❌ **Doble persistencia ambigua**: localStorage (cliente) + Firestore (admin) sin source of truth claro.

### 3.7 Causa raíz #6 — Code smell

- 3,265 líneas en `concierge.js` IIFE sin tests, sin TypeScript, hard de mantener.
- Code muerto identificado: ~200-250 líneas (ver Sección 8).

---

## 4. INVESTIGACIÓN INDUSTRY-STANDARD DE 15 SISTEMAS

> Esta sección es el reporte completo del agente de research. Mantenida
> literal porque cada detalle es accionable.

### 4.1 Sistemas estudiados

**Tier 1 (referencia obligatoria)**:
1. Intercom Messenger
2. Drift
3. Crisp Chat (más cercano a nuestro stack)
4. Front (collaborative inbox)
5. Tidio (e-commerce SMB)

**Tier 2 (insights específicos)**:
6. Zendesk Messaging
7. HubSpot Conversations
8. WhatsApp Business Web
9. Telegram Web
10. Slack

**Tier 3 (innovadores)**:
11. LiveChat.com
12. Freshchat (Freshworks)
13. **Linear (best-in-class optimistic UI)**
14. Discord (gaming-grade real-time)
15. Notion Comments

### 4.2 TOP 5 patrones críticos universales

#### 4.2.1 Single source of truth en server + cache local agresivo en cliente

**Linear**, **Slack**, **Intercom**, **Discord** — todos colapsan al mismo patrón: el servidor es la verdad, pero el cliente mantiene una copia local agresiva (IndexedDB, in-memory store) sobre la que opera primero.

**Linear** es el caso extremo: cada interacción hace un write local **antes** del round-trip al servidor.

**Aplicación a nuestro stack**:
- `enablePersistence` activo en Firestore.
- `source: 'cache'` cuando es legítimo.
- IndexedDB como columna vertebral.
- Object Pool in-memory (`HubStore`) como render source.

#### 4.2.2 Optimistic UI con rollback explícito, NO con esperanza

La diferencia entre "se siente WhatsApp" y "se siente lento" no es la latencia real — son los **80-200ms** entre el click del usuario y la primera evidencia visual.

**Patrón universal**:
1. Snapshot del estado previo
2. Mutación local instantánea + render
3. Request al servidor en background
4. Confirmación o rollback con shake animation

**Linear** genera un `transactionId` antes del round-trip y lo reconcilia cuando llega el `lastSyncId` del servidor.

**Tres estados visuales canónicos** (adoptar literalmente):
- `pending` (✓ hueco / opacity 0.6)
- `synced` (✓✓ sólido)
- `failed` (rojo + shake + tap to retry)

#### 4.2.3 Long-lived listeners > polling

Firestore documenta explícitamente:
> "Opening and keeping listeners alive for as long as possible is often the most cost-effective way to build an app."

Nuestro §57.7 ya lo descubrió por las malas. Slack mantiene 5M+ WebSockets simultáneos. Discord 12M+.

**Regla universal**: un listener vivo cuesta cero reads adicionales; recrear listeners cuesta el snapshot inicial completo cada vez.

#### 4.2.4 Separación radical entre "transient" y "durable"

**WhatsApp** lo formaliza brutalmente:
- Typing indicators → NO durables (Redis Pub/Sub, sin replay, sin retry, sin log).
- Read receipts → SÍ durables.

**Para nuestro stack**:
- Typing indicators y presence → RTDB con TTL agresivo (no Firestore).
- Mensajes y eventos de estado → Firestore.

#### 4.2.5 Lazy reset on next open

Nuestro §57.9 ya lo descubrió. Intercom, Drift, WhatsApp Web — todos separan radicalmente "cerrar UI" de "resetear state". El cierre solo oculta el panel; el reset se aplica al volver a abrir.

### 4.3 TOP 5 antipatrones a evitar

1. **MutationObserver con `subtree:true` global** — WhatsApp/Slack/Linear no usan ninguno (refuerza §17.12).
2. **Mezclar UI close con state reset** — Drift/Intercom: cerrar = `panel.style.display = 'none'`; reset = al detectar `closed === true` al reabrir (refuerza §57.9).
3. **Recrear listeners en cada navegación** — Slack/Discord listeners viven toda la sesión (refuerza §57.7).
4. **Polling por cualquier razón** — ningún líder lo hace. Firestore tiene retry interno; RTDB tiene `.info/connected`.
5. **`transition: all`** y animar layout properties (refuerza §17.2).

### 4.4 Análisis por sistema

#### 4.4.1 Intercom Messenger

**Real-time**: WebSockets persistentes + fallback a long-polling. Latencia <500ms global. Patrón muy similar a Firestore.

**Optimistic UI**: mensaje del cliente aparece **inmediatamente** con opacity 0.7 + sin checkmark. Server confirma → opacity 1.0 + checkmark gris. Agente lee → checkmark azul. Falla → borde rojo + "Tap to retry".

**State management**: Redux + middleware custom. Cada acción despacha 2 events: `MESSAGE_SEND_OPTIMISTIC` (UI inmediata) y `MESSAGE_SEND_REQUEST` (network). El reducer maneja `MESSAGE_SEND_SUCCESS` y `MESSAGE_SEND_FAILURE`.

**UX patterns**:
- **Lifecycle**: `open → active → user_replied → agent_replied → resolved → reopen`. Cuando un user reabre un thread cerrado, **NO se crea nuevo thread por defecto** — se reabre el existente. **Esto es opuesto a nuestro setup actual** donde cada `cleanSessionAndRender` genera nuevo `sessionId`.
- **System messages literales en español** (adoptar literal):
  - "Conversación iniciada"
  - "X se unió a la conversación"
  - "X cerró esta conversación"
  - "X reabrió la conversación"
  - "Esta conversación fue marcada como prioritaria"
- **Quick replies**: chips horizontales scrollables debajo del último mensaje del bot. Click envía texto literal.
- **Internal notes (asesor only)**: fondo amarillo distintivo, NO visible al cliente.

**Diseño visual**:
- Tipografía: Inter fallback, Graphik brand. 1.0rem default, 1.5 line-height en mensajes, 0.85rem en metadata, 1.125rem en titles.
- Colores: `#1F8DED` legacy (ahora Electric Mint `#00D6A0`), `#222F3D` texto, `#6F7F92` secondary, `#F5F8FA` bubble cliente, `#1F8DED` bubble agente.
- Border-radius bubbles: `12px 12px 12px 4px` (tail effect — corner del lado del speaker es más pequeño).
- Box-shadow: `0 1px 6px rgba(0,0,0,0.08)`.
- Spacing: 16px padding bubbles, 8px gap entre mensajes consecutivos del mismo speaker, 16px gap entre speakers.
- Animation: bubble enter `200ms ease-out` con `transform: translateY(8px) → 0` + `opacity 0 → 1`. **Sin spring overshoot** — más profesional que bouncy.
- Skeleton: 3 shimmer bars con anchos progresivos (90%/70%/50%) simulando bubble.

**Backend**: Conversations como first-class object. Schema: `id, contact_id, assignee, state, priority, last_contact_reply_at, last_admin_reply_at, snoozed_until, tags[], custom_attributes`.

#### 4.4.2 Drift

**Real-time**: WebSockets sobre AWS (Kafka event bus, Redis presence). Latencia <300ms. Su MVP **siempre arranca como bot** y escala a humano solo cuando es necesario — patrón directamente aplicable a nuestro Concierge.

**Optimistic UI**: renderiza mensaje del usuario **antes** que llegue al servidor con sutil indicador "Sending..." en gris claro. Si bot responde en <2s, el indicador desaparece sin que el usuario lo registre conscientemente.

**State management**: store custom basado en eventos. Cada conversación tiene FSM con estados: `bot_active`, `routing_to_human`, `human_engaged`, `closed_by_user`, `closed_by_agent`.

**UX patterns**:
- **Lifecycle del bot**: `bot_active` → si detecta intent comercial → `routing_to_human` (con loading state "Buscando un asesor disponible...") → `human_engaged`.
- **Smart suggestions**: chips "Reply with..." debajo del último mensaje del bot, generados por NLP (nuestro §U.12 ya lo cubre).
- **Calendar integration inline**: cuando bot detecta intent de meeting, embed mini-calendar dentro del chat.
- **Operating Hours awareness**: si fuera de horario, bot saluda con "Estamos cerrados, pero te respondemos mañana a las 8AM" + opción de dejar email.

**Diseño**: paleta más coloreada que Intercom (purple/blue gradients), bubbles más redondeados (radius 16px), animations más juguetonas (spring overshoot en bot avatar al hablar).

#### 4.4.3 Crisp Chat (más cercano a nuestro stack)

**Real-time**: 40+ microservicios. Componente WebSocket llamado "socket-client" en "relay probe group". Manejan 1B+ requests/mes. RTM API sobre WebSocket + REST API. WebSocket entrega eventos asíncronos; REST ejecuta acciones.

**Optimistic UI**: messages aparecen pendientes con dot pequeño gris al lado, tornándose checkmark cuando server ack.

**State management**: Vuex en widget web (SDK GitHub público).

**UX patterns**:
- **Visitor identification opt-in**: widget no fuerza captura de email — solo lo pide después de N mensajes (configurable). Esto es exactamente nuestro Lead Gate progresivo.
- **Triggers automáticos**: "X segundos después de la página, mostrar mensaje proactivo".
- **MagicReply**: sugerencias de reply para asesores basadas en historial.

**Backend**: MongoDB principal, Redis para presence + cache, RabbitMQ para eventos. Vigil (su monitoring open-source) en Rust. Code en `github.com/crisp-oss` y `github.com/crisp-im`.

#### 4.4.4 Front (collaborative inbox)

**UX patterns únicos**:
- **Comments internos en cada thread**: asesores pueden discutir sin que el cliente lo vea. Background distintivo (amarillo) y al lado del thread principal en panel separado.
- **Assignment claro y visible**: cada thread tiene avatar grande del asignado. Reasignar es drag-and-drop.
- **Message templates con variables**: `{{contact.first_name}}`, `{{conversation.subject}}`.
- **Bulk actions**: select múltiples threads → assign / archive / tag en batch.

**Edge cases**:
- Asesor cierra thread, cliente responde después → thread se reabre automáticamente en lugar de crear uno nuevo (igual que Intercom).
- Asesor en vacaciones → auto-reasignar a backup definido.

#### 4.4.5 Tidio (e-commerce SMB)

**UX patterns**:
- **Live typing visibility for agents**: el asesor ve lo que el cliente está tipeando en real-time, no solo "está tipeando..." (controvertido pero efectivo en sales).
- **Email automation desde el chat**: si cliente cierra sin completar, captura email y dispara secuencia.

#### 4.4.6 Zendesk Messaging (helpdesk pattern)

**UX patterns**:
- **Conversation Events canonical**: `MessageSent, MessageReceived, ConversationOpened, ConversationClosed, CustomerJoined`. Nuestro sistema podría adoptar.
- **Status workflow rico**: `New → Open → Pending → On-hold → Solved → Closed`. Mucho más granular que el actual.
- **Macros (templates) granulares**: con variables, condicionales, multi-step.

#### 4.4.7 HubSpot Conversations (CRM-integrated)

**Optimistic UI**: Apollo + GraphQL con `optimisticResponse` field nativo de Apollo. Equivalente sin Apollo: snapshot manual del store.

**UX patterns**:
- **Conversaciones como objetos CRM**: cada chat es queryable junto a contacts, deals, tickets. Nuestro CRM 360° ya tiene esto.
- **Universal Inbox**: email + chat + Facebook + WhatsApp en una sola interfaz.
- **Workflows triggers**: "cuando conversación abre, asignar al owner del deal asociado".

#### 4.4.8 WhatsApp Web (mobile-first inspirational) 🌟 BENCHMARK

**Real-time architecture**:
- **WebSocket per device** + SSE-only fallback + HTTP fallback floor.
- Encrypted con Signal Protocol.
- Latencia <200ms global.
- **Separación crítica**: typing indicators NO durables (Redis Pub/Sub), read receipts SÍ durables.

**Optimistic UI** — el rey absoluto. **4 estados visuales canónicos a adoptar literalmente**:
- ✓ gris hueco = pending (escribiendo al servidor)
- ✓ gris sólido = sent al servidor
- ✓✓ gris = delivered al device del recipient
- ✓✓ azul = read

Estos 4 estados son universalmente reconocidos. **Adoptarlos literalmente**.

**UX patterns**:
- **Mensajes del sistema en cursiva, color gris, centrados**:
  - "Hoy", "Ayer", "Lunes" — date dividers
  - "Mensajes y llamadas están protegidos con cifrado de extremo a extremo"
  - "Bloqueaste a este contacto"
- **Reply quoting**: tap-and-hold, embed del mensaje original arriba del nuevo.
- **Voice messages**: hold-to-record con scrub-to-cancel.
- **Reactions**: long-press → emoji picker.

**Diseño visual**:
- Tipografía: Helvetica Neue / system font, 14px base, 1.4 line-height.
- Colores: `#075E54` (header verde clásico), `#128C7E` (accent), `#DCF8C6` (bubble own/sent), `#FFFFFF` (bubble received), `#34B7F1` (link blue), `#06CF9C` (online indicator).
- Border-radius: bubbles `7.5px` (sutil), tail SVG asimétrico solo en primer mensaje del speaker en una secuencia.
- Box-shadow: `0 1px 0.5px rgba(0,0,0,0.13)`.
- Spacing: 6px padding bubbles, 2px gap dentro speaker, 12px entre speakers.
- Animations: super sutiles. Bubble enter `150ms ease-out` con `transform: scale(0.9) → 1` solo mobile. **Web casi sin animaciones — prioridad es velocidad percibida**.

**Edge cases**:
- Connection drop mid-message → message permanece en pending state local con clock icon, retry automático al reconnect.
- Multi-device → todas las devices ven el mismo state via "primary device sync".

#### 4.4.9 Telegram Web

**Real-time**: NO usa WebSockets estándar. Usan "hanging GET" (long-polling sofisticado) para evadir corporate firewalls. MTProto custom. Multi-device session management excelente.

**Optimistic UI**: muy similar a WhatsApp pero más rápido visualmente. Su clock icon (pending) es minúsculo (8px), casi invisible — cuando confirma, transición sub-100ms a checkmark.

**UX patterns**:
- **Animated message effects**: famosos "fireworks/confetti" cuando envías "🎉". Patrón replicable para bot ALTOR: "🚗 perfecto, busquemos tu Mazda".
- **Quick reactions**: emoji picker con animation wave.

**Diseño**:
- Tipografía: Roboto / system font, 14px base, 1.3125 line-height.
- Colores theme-driven: 8 paletas oficiales, default Light usa `#3390EC` accent, `#F4F4F5` bubble bg.
- Border-radius bubbles: `12px` con tail asimétrico vía clip-path.
- Animations: spring-based entrance — los más "playful" de los messengers.

#### 4.4.10 Slack 🌟 ARQUITECTURA REFERENCIA

**Real-time architecture**: el caso de estudio definitivo.
- **5M+ WebSocket sessions concurrent** (peak), serving "tens of millions of channels per host", delivering messages globally <500ms.
- Stack: Java (Channel Servers, Gateway Servers, Admin Servers, Presence Servers) + Envoy proxy + consistent hashing rings + regional deployment.
- Migración a Envoy documentada en blog.

**Lección clave**: nuestro single Firestore listener `_chatsUnsub` es el equivalente conceptual al Gateway Server de Slack — debe ser global y persistente. **§57.7 ya lo descubrió**.

**UX patterns**:
- **Threading**: cada mensaje puede tener replies en thread. `parent_ts → thread_ts` mapping.
- **System messages**:
  - "X joined #channel"
  - "X pinned a message"
  - "X started a call"

**Edge cases**:
- Disconnection → server replays missed events when client reconnects con `last_ack_ts`.
- Threading + new message in main → notification dot solo en thread no main.

#### 4.4.11 LiveChat.com

**UX patterns**:
- **Routing rules**: por language, página, hora.
- **Returning customer priority**: chats van al agent que ya los atendió antes (si online).
- **Concurrent chat limits**: cada agent tiene máximo configurable.
- **Auto-transfer on inactivity**: si agent no responde en X minutos, chat va a otro.

#### 4.4.12 Freshchat (IntelliAssign)

**UX patterns clave**:
- **IntelliAssign**: 3 factores — Agent availability, Agent skills (matched a tags), Capacity (max concurrent).
- **Load-based logic**: assigna al agent con highest bandwidth percentage Y for whom no se ha asignado por más tiempo. Round-robin con awareness de carga.
- **Agent levels**: Beginner / Intermediate / Expert con max concurrent diferente. Aplicable a asesores junior vs senior.
- **Skill-based routing**: tags en conversación → matched a agent skills.

#### 4.4.13 Linear 🌟 BEST-IN-CLASS OPTIMISTIC UI

**Real-time architecture**: **El benchmark absoluto para optimistic UI**.
- Synchronized WebSocket servers + GraphQL public/private APIs + task runners en Kubernetes.
- Custom sync engine reverso-engineered y endorsado por su CTO Tuomas Artman.
- Hace "mutations local first, then GraphQL mutation con sólo `lastSyncId` en response, depending on WebSocket broadcasts to deliver full change details".

**Optimistic UI** (ESTUDIO OBLIGATORIO). Su arquitectura:

1. **Object Pool**: in-memory store indexed por UUIDs.
2. **Lazy hydration desde IndexedDB**.
3. **Cada mutación local primero** → render inmediato.
4. **Transaction queue con sync IDs monotónicos**.
5. **GraphQL mutation envía solo `lastSyncId` en response**.
6. **WebSocket broadcasts `cmd: "sync"`** con array de SyncActions (`{action: "I/U/D/A", modelName, modelId, data}`).
7. **Cliente reconcilia**: matchea sync ID, completa transaction.
8. **Si offline**, transactions cached en IndexedDB, resent on reconnect.
9. **Conflict resolution**: last-writer-wins decidido por servidor.

**State management**: MobX-based reactive store (Object Pool). Models con properties observables.

**UX patterns**:
- **Cmd+K command palette ubicuo**.
- **Keyboard shortcuts everywhere**.
- **Mutation indicators**: muy sutiles — solo un dot pequeño en el corner del avatar mientras la transaction está pending.
- **Bootstrap full vs partial**: full carga 40+ models en text/plain con `_metadata_` field; partial carga deferred models como Comments. **Nuestro Hub debería hacer algo similar** — al login, carga conversations metadata pero NO messages hasta abrir.

**Diseño visual**:
- Tipografía: Inter Display, 14px base, 1.5 line-height.
- Colores: `#5E6AD2` Linear purple, `#1F2023` dark mode bg, `#2E3033` cards.
- Border-radius: 6-8px (subtle).
- Animations: **las menos disruptivas de la industria**. Spring usado solo para overshoot sutil.
- Density alta — Linear apuesta por mostrar mucha información sin sentirse caótico.

**Backend**: GraphQL + WebSocket + Kubernetes + Cloud SQL Postgres + WebSocket sync servers. Reverse-engineered en `github.com/wzhudev/reverse-linear-sync-engine`.

#### 4.4.14 Discord (gaming-grade)

**Real-time**: 12M concurrent users, 26M WebSocket events/second.
- Stack: **Elixir** (gateway) + Python (API) + Rust (voice).
- 400-500 Elixir machines en producción.
- Cowboy para WebSocket + GenStage para back-pressure y load shedding.
- WebSocket = session process (GenServer) que comunica con guild processes en remote Erlang nodes.

**Pattern interesante**: "sharded fan-out" — cada user pertenece a un guild process, y mensajes se broadcastan al guild process que disemina a sessions conectadas.

#### 4.4.15 Notion Comments

**Real-time**: hybrid CRDT + Operational Transform. CRDT para structure (block tree), OT para text within blocks. Last-write-wins decidido por servidor. WebSocket para sync.

**UX patterns**:
- **@mentions inline**: dispara notificación al mencionado.
- **Reactions con emoji**.
- **Threading**: comments sobre comments.

---

## 5. PATRONES CONSOLIDADOS A ADOPTAR

### 5.1 Lifecycle universal de conversación

```
[CREATED] → [OPEN] → [ASSIGNED] → [ACTIVE] → [WAITING_CUSTOMER]
                                       ↓             ↓
                                  [SOLVED] ←   [WAITING_AGENT]
                                       ↓
                                  [CLOSED] → [REOPEN] → [ACTIVE]
                                       ↓
                                  [ARCHIVED] (lazy, after 30d typically)
```

**Reglas clave**:
- "CLOSED" no es destructivo. Reabrir el thread mantiene el `id` (Intercom, Front, Zendesk).
- "ARCHIVED" es soft-delete. Cliente nunca ve este estado.
- Nuestro §57 lazy-reset on next open es correcto pero **demasiado agresivo** — el lifecycle estándar prefiere reabrir el thread cuando es posible.

### 5.2 Mensajes del sistema canonical (texto exacto en español)

Estos 14 mensajes son industry-standard. **Adoptar literalmente**:

| Evento | Texto canonical |
|---|---|
| Conversación inicia | "Conversación iniciada" |
| Bot saluda | "Hola, soy ALTOR" |
| Asesor toma | "✓ {nombre} se unió a la conversación" |
| Asesor cambia | "{nombre} transfirió esta conversación a {nuevo}" |
| Cliente cierra | "Cerraste esta conversación" |
| Asesor cierra | "{nombre} marcó esta conversación como resuelta" |
| Reabrir | "Esta conversación fue reabierta" |
| SLA breach inminente | "⚠ Esta conversación supera nuestro tiempo de respuesta" |
| Idle timeout | "Esta conversación se cerró por inactividad. Iniciá una nueva si necesitás algo más" |
| Cliente offline | "Sin conexión. Tu mensaje se enviará cuando vuelva la red." |
| Cliente vuelve online | "Conexión restaurada" |
| Mensaje fallido | "No se pudo enviar. Tocá para reintentar" |
| Asesor escribiendo | "{nombre} está escribiendo..." |
| Día divisor | "Hoy" / "Ayer" / "Lunes 5 mayo" |

### 5.3 Real-time patterns por funcionalidad

| Funcionalidad | Pattern industry | Aplicabilidad Firebase free tier |
|---|---|---|
| Mensajes nuevos | Long-lived listener subscription | `onSnapshot` en `messages/` subcollection |
| Typing indicator | RTDB / Pub-Sub volátil, NO durable | RTDB `/typing/{sessionId}/{uid}` con `onDisconnect.remove()` |
| Read receipts | Durable, en doc del mensaje | Firestore field `readBy: [uid]` o `readAt: timestamp` |
| Presence (online/offline) | RTDB con `.info/connected` + `onDisconnect` | Ya implementado |
| Status updates (mode/claimedBy/closed) | Listener al doc parent | `_firestoreParentUnsub` actual |
| Notifications cross-device | FCM Web Push | Ya implementado |
| New conversation alert | Listener global a `conversations` | `_chatsUnsub` (§57.7 globally active) |
| Workload aggregator | Singleton doc | `system/workload` |

### 5.4 Optimistic UI por acción

| Acción | Optimistic UI universal |
|---|---|
| Enviar mensaje | Aparece inmediato con clock icon (pending). Server confirma → checkmark. Falla → red border + retry button |
| Marcar leído | Doble checkmark verde inmediato. No se revierte en falla (silent) |
| Asignar a mí (claim) | Claim button cambia a "Atendiendo" inmediato. Si race con otro asesor, re-render con banner "X tomó este chat" |
| Crear nuevo lead | Card aparece en lista inmediato con loading shimmer. Server asigna ID real → reemplaza |
| Eliminar mensaje | Tachado inmediato + opacity 0.3. Server confirma → removal. Falla → restore + toast error |
| Archivar conversación | Slide-out animation inmediato + remove de lista. Server confirma → silent. Falla → toast error con "Deshacer" |
| Quick reply | Mensaje aparece inmediato como si lo hubieras escrito. Igual que mensaje normal |

---

## 6. ARQUITECTURA OBJETIVO

### 6.1 Principios rectores

1. **UI nunca espera al server**. Toda acción de usuario actualiza la UI INSTANT (≤16ms next paint), Firestore es eventual consistency con sync silenciosa en background.
2. **Single source of truth = Firestore**. localStorage es solo cache para UX.
3. **Reducer pattern**: una sola función pura `applyState(currentState, event) → newState`.
4. **Real-time bidireccional**: typing indicators + read receipts + presence en vivo.
5. **Operaciones reversibles**: si Firestore rechaza, rollback con undo toast.
6. **Performance budget estricto**: cero blocking IO en main thread.
7. **Cero código muerto**: cada Edit elimina lo viejo si hay reemplazo.

### 6.2 Stack final (gratis, sin cambios de proveedor)

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENTE                                  │
│  • Vanilla JS (mantiene IIFE actual)                        │
│  • Optimistic UI store (HubStore custom, ~100 líneas)       │
│  • Firestore SDK Compat v11 (ya tenemos)                    │
│  • RTDB para presence + typing (ya tenemos infra)           │
│  • FCM Web Push (ya tenemos)                                │
│  • IndexedDB para cache histórico (browser native)          │
└─────────────────────────────────────────────────────────────┘
                           │
                           │ WebChannel (Firestore real-time)
                           │ + WebSocket (RTDB presence)
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND (Firebase)                       │
│  • Firestore: source of truth de chats                      │
│  • RTDB: presence + typing indicators                       │
│  • Cloud Functions (12 actuales, no más)                    │
│  • Storage (avatars admin)                                  │
└─────────────────────────────────────────────────────────────┘
```

### 6.3 Object Pool / HubStore (estilo Linear)

```js
// js/hub-store.js — NUEVO archivo
window.HubStore = (function () {
    'use strict';

    var _chats = new Map();           // sid → chat metadata
    var _messages = new Map();         // sid → array de messages
    var _pending = new Map();          // tempId → {action, payload, snapshot}
    var _listeners = new Set();        // observers para re-render

    function notify(event, payload) {
        _listeners.forEach(function (fn) {
            try { fn(event, payload); } catch (e) {}
        });
    }

    return {
        // ─── Reads ───
        getChat: function (sid) { return _chats.get(sid); },
        getMessages: function (sid) { return _messages.get(sid) || []; },
        getAllChats: function () { return Array.from(_chats.values()); },

        // ─── Writes ───
        upsertChat: function (chat) {
            _chats.set(chat._docId || chat.sessionId, chat);
            notify('chat_updated', chat);
        },

        removeChat: function (sid) {
            _chats.delete(sid);
            _messages.delete(sid);
            notify('chat_removed', { sid: sid });
        },

        // ─── Optimistic mutations ───
        addMessageOptimistic: function (sid, msg) {
            var tempId = 'tmp_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
            msg._tempId = tempId;
            msg._status = 'pending';
            var arr = _messages.get(sid) || [];
            arr.push(msg);
            _messages.set(sid, arr);
            _pending.set(tempId, { action: 'add', sid: sid, msg: msg });
            notify('message_added', { sid: sid, msg: msg });
            return tempId;
        },

        confirmMessage: function (tempId, serverMsg) {
            var pending = _pending.get(tempId);
            if (!pending) {
                // Mensaje del server sin pending local (e.g. del otro side)
                var arr = _messages.get(serverMsg._sid) || [];
                arr.push(Object.assign({ _status: 'synced' }, serverMsg));
                _messages.set(serverMsg._sid, arr);
                notify('message_added', { sid: serverMsg._sid, msg: serverMsg });
                return;
            }
            var arr = _messages.get(pending.sid);
            var idx = arr.findIndex(function (m) { return m._tempId === tempId; });
            if (idx >= 0) {
                arr[idx] = Object.assign({}, serverMsg, { _status: 'synced' });
                _messages.set(pending.sid, arr);
                notify('message_synced', { sid: pending.sid, msg: arr[idx] });
            }
            _pending.delete(tempId);
        },

        rollbackMessage: function (tempId, error) {
            var pending = _pending.get(tempId);
            if (!pending) return;
            var arr = _messages.get(pending.sid);
            var idx = arr.findIndex(function (m) { return m._tempId === tempId; });
            if (idx >= 0) {
                arr[idx]._status = 'failed';
                arr[idx]._error = error;
                _messages.set(pending.sid, arr);
                notify('message_failed', { sid: pending.sid, msg: arr[idx], error: error });
            }
            _pending.delete(tempId);
        },

        // ─── Subscriptions ───
        subscribe: function (fn) {
            _listeners.add(fn);
            return function () { _listeners.delete(fn); };
        },

        // ─── Debug ───
        _debug: function () {
            return {
                chats: _chats.size,
                messages: Array.from(_messages.entries()).map(function (e) {
                    return { sid: e[0], count: e[1].length };
                }),
                pending: _pending.size
            };
        }
    };
})();
```

### 6.4 Reducer pattern canonical

```js
// js/hub-reducer.js — NUEVO archivo
function reduceChat(state, event) {
    switch (event.type) {
        case 'MESSAGE_SENT_LOCAL':
            return Object.assign({}, state, {
                messages: state.messages.concat([
                    Object.assign({}, event.msg, { _status: 'pending' })
                ])
            });

        case 'MESSAGE_CONFIRMED':
            return Object.assign({}, state, {
                messages: state.messages.map(function (m) {
                    return m.localId === event.localId
                        ? Object.assign({}, m, { _status: 'sent', firestoreId: event.id })
                        : m;
                })
            });

        case 'MESSAGE_FAILED':
            return Object.assign({}, state, {
                messages: state.messages.map(function (m) {
                    return m.localId === event.localId
                        ? Object.assign({}, m, { _status: 'failed', error: event.error })
                        : m;
                })
            });

        case 'TYPING_RECEIVED':
            return Object.assign({}, state, { otherTyping: event.typing });

        case 'CHAT_CLAIMED':
            return Object.assign({}, state, {
                claimedBy: event.uid,
                claimedByName: event.name,
                mode: 'live'
            });

        case 'CHAT_CLOSED':
            return Object.assign({}, state, {
                status: 'closed',
                closedReason: event.reason,
                closedAt: event.ts
            });

        default:
            return state;
    }
}
```

### 6.5 Estados de mensajes (4 canónicos WhatsApp)

```
OPTIMISTIC STATUS (LOCAL ONLY, NO en Firestore):
  pending   — Enviado pero no confirmado por server (✓ hueco gris)
  sent      — Confirmado en Firestore (✓ sólido gris)
  delivered — Recibido por device del recipient (✓✓ gris)
  read      — Leído por el otro lado (✓✓ azul)
  failed    — Error al enviar (rojo + shake + tap to retry)
```

### 6.6 Tecnologías por funcionalidad

| Funcionalidad | Tecnología | Costo | Razón |
|---|---|---|---|
| Mensajes real-time | Firestore onSnapshot | $0 (free tier) | Ya tenemos, p50 <500ms |
| Typing indicators | RTDB con throttle 1s | $0 (free tier bandwidth) | Más eficiente que Firestore para alta frecuencia |
| Read receipts | Firestore field update | $0 | 1 write cada 10s, despreciable |
| Presence asesor | RTDB `/presence` con onDisconnect | $0 | Ya tenemos, robusto |
| Push notifications | FCM Web Push | $0 (ilimitado) | Ya tenemos |
| Telegram alerts | Telegram Bot API | $0 (sin límite) | Ya tenemos |
| LLM | Anthropic Claude Haiku 4.5 | ~$2-5/mes | Ya tenemos, optimizado §21.10 |
| Storage | Firebase Storage | $0 (1GB free) | Avatars admin |
| Cloud Functions | Free tier 2M invocations/mes | $0 | Ya tenemos 12 funciones |
| Analytics | Firebase Analytics | $0 (ilimitado) | Métricas custom |

**Costo recurrente total post-cirugía**: $2-5/mes (solo LLM Anthropic, todo lo demás $0).

---

## 7. SPRINTS EJECUTABLES S1-S7

> Cada sprint = 1 commit + 1 sub-sección en CLAUDE.md (§60.1 a §60.7).
> IAP §37 obligatorio antes de cada commit.
> Cache version bump en `service-worker.js` Y `js/cache-manager.js`.
> Tests E2E manuales documentados.

### 7.1 Sprint S1 — Optimistic UI universal del admin (PRIORIDAD MÁXIMA)

**Tiempo estimado**: 4-6 horas (1.5 días)
**Impacto**: 🔴 CRÍTICO. Botones del Hub responden INSTANT.

#### 7.1.1 IAP §37

**A. Archivos a modificar**:

| Archivo | Cambio | Líneas aproximadas |
|---|---|---|
| `js/hub-store.js` | NUEVO archivo. HubStore implementation | ~100 líneas |
| `js/admin-concierge.js:972` | Refactor `_sendAsesorMessageInternal` con optimistic + tempId + rollback | +60, -20 |
| `js/admin-concierge.js:838` | Refactor `claimChat` optimistic con rollback en race | +40, -10 |
| `js/admin-concierge.js:264` | Refactor `togglePin` optimistic | +15, -5 |
| `js/admin-concierge.js:278` | Refactor `toggleArchive` optimistic | +15, -5 |
| `js/admin-concierge.js:299` | Refactor `markUnread` optimistic | +15, -5 |
| `js/admin-concierge.js:994` | Refactor `closeChat` optimistic | +25, -10 |
| `js/admin-concierge.js:1039` | Refactor `reopenChat` optimistic | +25, -10 |
| `js/admin-concierge.js:615` | Extender `renderChatDetail` para distinguir `_status` (pending/sent/read/failed) | +50, -10 |
| `css/admin.css` | Estados visuales canónicos para mensajes (`.cnc-msg-pending`, `.cnc-msg-synced`, `.cnc-msg-failed`, `.cnc-msg-shake`) | +80 |
| `admin.html` | Cargar `js/hub-store.js` antes de `js/admin-concierge.js` | +1 |
| `service-worker.js` | CACHE_VERSION bump | +1, -1 |
| `js/cache-manager.js` | APP_VERSION bump | +1, -1 |
| `CLAUDE.md` | Sub-sección §60.1 documentando el sprint | +200 |

**Total**: ~600 líneas agregadas, ~80 eliminadas.

**B. Archivos INTACTOS (afirmación)**:
- `js/concierge.js` (cliente) — sin tocar en este sprint, va en S2.
- `firestore.rules` — sin cambios de schema.
- `functions/index.js` — sin tocar.
- `database.rules.json` — sin tocar.
- Cualquier otro archivo del repo.

**C. Código muerto a eliminar**:
- Ninguno en este sprint. Identificación y eliminación en sprints posteriores.

**D. Código a refactor/limpiar**:
- `_sendAsesorMessageInternal` (admin-concierge.js:972) — refactor completo.
- 6 funciones de toggle (claimChat, togglePin, toggleArchive, markUnread, closeChat, reopenChat) — patrón consistente.

**E. Riesgos + plan de rollback**:

| Riesgo | Mitigación | Rollback |
|---|---|---|
| HubStore conflict con _activeMessages cache | HubStore reemplaza _activeMessages gradualmente; co-existen durante S1 | git revert |
| Optimistic message duplicado por listener Firestore | Dedup por `_tempId` cuando llega snapshot | git revert |
| Race condition entre claim local y Firestore transaction reject | rollback explícito con toast "X tomó el chat" | git revert |
| `renderChatDetail` re-render rompe estado visual | Tests E2E validan cada estado | git revert |
| CSS `.cnc-msg-shake` causa motion sickness | Respeta `prefers-reduced-motion` | git revert |

#### 7.1.2 Cambios específicos

##### 7.1.2.1 Crear `js/hub-store.js`

Copiar literal el código de la **Sección 6.3** de este documento.

##### 7.1.2.2 Cargar HubStore en `admin.html`

Agregar ANTES del script de `admin-concierge.js`:

```html
<script src="js/hub-store.js" defer></script>
<script src="js/admin-concierge.js" defer></script>
```

##### 7.1.2.3 Refactor `_sendAsesorMessageInternal` (admin-concierge.js:972)

**ANTES**:
```js
function _sendAsesorMessageInternal(input, text) {
    input.value = '';
    var msg = {
        from: 'asesor',
        text: text,
        timestamp: new Date().toISOString(),
        asesorUid: window.auth.currentUser.uid,
        asesorNombre: (AP.currentUserProfile && AP.currentUserProfile.nombre) || window.auth.currentUser.email,
        asesorPhotoURL: (AP.currentUserProfile && AP.currentUserProfile.photoURL) || null
    };
    window.db.collection('conciergeChats').doc(_activeSessionId)
        .collection('messages').add(msg)
        .catch(function (err) { AP.toast('Error al enviar: ' + err.message, 'error'); });
    // Update parent doc lastMessage + unread cliente
    window.db.collection('conciergeChats').doc(_activeSessionId).set({
        lastMessage: text.slice(0, 80),
        lastMessageAt: new Date().toISOString(),
        unreadByUser: window.firebase && window.firebase.firestore ?
            window.firebase.firestore.FieldValue.increment(1) : 1
    }, { merge: true }).catch(function () {});
}
```

**DESPUÉS** (§60.1 — Optimistic UI universal):
```js
function _sendAsesorMessageInternal(input, text) {
    input.value = '';

    var sid = _activeSessionId;
    var asesorUid = window.auth.currentUser.uid;
    var asesorNombre = (AP.currentUserProfile && AP.currentUserProfile.nombre) || window.auth.currentUser.email;
    var asesorPhotoURL = (AP.currentUserProfile && AP.currentUserProfile.photoURL) || null;

    var nowIso = new Date().toISOString();
    var msg = {
        from: 'asesor',
        text: text,
        timestamp: nowIso,
        asesorUid: asesorUid,
        asesorNombre: asesorNombre,
        asesorPhotoURL: asesorPhotoURL
    };

    // §60.1 — OPTIMISTIC UI: agregar al HubStore + render INSTANT
    var tempId = window.HubStore.addMessageOptimistic(sid, msg);
    _activeMessages.push(Object.assign({ _tempId: tempId, _status: 'pending' }, msg));
    var freshChat = _chats.find(function (c) { return c._docId === sid; });
    renderChatDetail(freshChat, _activeMessages);

    // Optimistic update del parent (lastMessage + lastMessageAt)
    if (freshChat) {
        freshChat.lastMessage = text.slice(0, 80);
        freshChat.lastMessageAt = nowIso;
        renderChatList();
    }

    // §60.1 — Firestore en background
    window.db.collection('conciergeChats').doc(sid)
        .collection('messages').add(msg)
        .then(function (ref) {
            // Confirmado
            window.HubStore.confirmMessage(tempId, Object.assign({ _docId: ref.id, _sid: sid }, msg));
            var idx = _activeMessages.findIndex(function (m) { return m._tempId === tempId; });
            if (idx >= 0) {
                _activeMessages[idx]._status = 'sent';
                _activeMessages[idx].firestoreId = ref.id;
                renderChatDetail(_chats.find(function (c) { return c._docId === sid; }), _activeMessages);
            }
        })
        .catch(function (err) {
            // Failed: marcar y ofrecer retry
            window.HubStore.rollbackMessage(tempId, err.message);
            var idx = _activeMessages.findIndex(function (m) { return m._tempId === tempId; });
            if (idx >= 0) {
                _activeMessages[idx]._status = 'failed';
                _activeMessages[idx]._error = err.message;
                renderChatDetail(_chats.find(function (c) { return c._docId === sid; }), _activeMessages);
            }
            if (AP.toast) AP.toast('Error al enviar. Click en el mensaje para reintentar.', 'error');
        });

    // Update parent doc lastMessage + unread cliente (también background)
    window.db.collection('conciergeChats').doc(sid).set({
        lastMessage: text.slice(0, 80),
        lastMessageAt: nowIso,
        unreadByUser: window.firebase && window.firebase.firestore ?
            window.firebase.firestore.FieldValue.increment(1) : 1
    }, { merge: true }).catch(function () {});
}
```

##### 7.1.2.4 Refactor `claimChat` (admin-concierge.js:838)

**ANTES** (resumen): runTransaction → si OK retorna, si race rejecta con código.

**DESPUÉS** (§60.1):
```js
function claimChat(sessionId) {
    if (!window.db || !window.auth || !window.auth.currentUser) {
        return Promise.reject(new Error('not-authenticated'));
    }
    if (!AP.isEditorOrAbove || !AP.isEditorOrAbove()) {
        return Promise.reject(new Error('not-authorized'));
    }
    var ref = window.db.collection('conciergeChats').doc(sessionId);
    var currentUid = window.auth.currentUser.uid;
    var currentName = (AP.currentUserProfile && AP.currentUserProfile.nombre) || 'Asesor';
    var nowIso = new Date().toISOString();

    // §60.1 — OPTIMISTIC: actualizar HubStore + UI INSTANT
    var chat = _chats.find(function (c) { return c._docId === sessionId; });
    var snapshot = null;
    if (chat) {
        snapshot = { claimedBy: chat.claimedBy, claimedByName: chat.claimedByName, mode: chat.mode };
        chat.claimedBy = currentUid;
        chat.claimedByName = currentName;
        chat.claimedAt = nowIso;
        chat.mode = 'live';
        renderChatList();
        if (_activeSessionId === sessionId) {
            renderChatDetail(chat, _activeMessages);
        }
    }

    return window.db.runTransaction(function (tx) {
        return tx.get(ref).then(function (snap) {
            if (!snap.exists) {
                return Promise.reject({ code: 'chat-not-found' });
            }
            var data = snap.data();
            if (data.status === 'closed') {
                return Promise.reject({ code: 'chat-closed' });
            }
            if (data.claimedBy && data.claimedBy !== currentUid) {
                return Promise.reject({
                    code: 'already-claimed',
                    claimedByName: data.claimedByName || 'Otro asesor',
                    claimedByUid: data.claimedBy
                });
            }
            tx.update(ref, {
                claimedBy: currentUid,
                claimedByName: currentName,
                claimedAt: nowIso,
                mode: 'live',
                assignedTo: currentUid,
                assignedToName: currentName
            });
            return { success: true, claimedByName: currentName };
        });
    }).then(function (result) {
        // Sistema message asesor_joined
        try {
            window.db.collection('conciergeChats').doc(sessionId)
                .collection('messages').add({
                    from: 'system',
                    systemType: 'asesor_joined',
                    text: '✓ ' + currentName + ' tomó esta conversación. En breve te atenderá.',
                    timestamp: nowIso,
                    asesorNombre: currentName,
                    asesorUid: currentUid
                }).catch(function () {});
            window.db.collection('conciergeChats').doc(sessionId).update({
                lastMessage: '✓ ' + currentName + ' tomó la conversación',
                lastMessageAt: nowIso
            }).catch(function () {});
        } catch (e) {}
        return result;
    }).catch(function (err) {
        // §60.1 — ROLLBACK optimistic en error
        if (snapshot && chat) {
            chat.claimedBy = snapshot.claimedBy;
            chat.claimedByName = snapshot.claimedByName;
            chat.mode = snapshot.mode;
            renderChatList();
            if (_activeSessionId === sessionId) {
                renderChatDetail(chat, _activeMessages);
            }
        }
        if (err && err.code === 'already-claimed') {
            if (AP.toast) AP.toast(err.claimedByName + ' tomó este chat hace un momento.', 'warning');
        } else if (err && err.code === 'chat-closed') {
            if (AP.toast) AP.toast('Este chat ya está cerrado', 'error');
        } else {
            if (AP.toast) AP.toast('No se pudo tomar: ' + (err.message || err.code || 'error'), 'error');
        }
        return Promise.reject(err);
    });
}
```

##### 7.1.2.5 Refactor `togglePin` (admin-concierge.js:264)

**ANTES**:
```js
function togglePin(sessionId) {
    var chat = _chats.find(function (c) { return c._docId === sessionId; });
    if (!chat) return;
    var newPinned = !chat.isPinned;
    window.db.collection('conciergeChats').doc(sessionId).set({
        isPinned: newPinned,
        pinnedAt: newPinned ? new Date().toISOString() : null
    }, { merge: true });
}
```

**DESPUÉS** (§60.1):
```js
function togglePin(sessionId) {
    var chat = _chats.find(function (c) { return c._docId === sessionId; });
    if (!chat) return;
    var newPinned = !chat.isPinned;
    var snapshot = { isPinned: chat.isPinned, pinnedAt: chat.pinnedAt };

    // §60.1 — OPTIMISTIC: update local + render INSTANT
    chat.isPinned = newPinned;
    chat.pinnedAt = newPinned ? new Date().toISOString() : null;
    renderChatList();

    // Firestore en background
    window.db.collection('conciergeChats').doc(sessionId).set({
        isPinned: newPinned,
        pinnedAt: chat.pinnedAt
    }, { merge: true }).catch(function (err) {
        // Rollback
        chat.isPinned = snapshot.isPinned;
        chat.pinnedAt = snapshot.pinnedAt;
        renderChatList();
        if (AP.toast) AP.toast('Error: ' + err.message, 'error');
    });
}
```

##### 7.1.2.6 Refactor `toggleArchive` y `markUnread`

Aplicar el mismo patrón optimistic (snapshot → update local → render → Firestore background → rollback en error).

##### 7.1.2.7 Refactor `closeChat` y `reopenChat`

Aplicar el mismo patrón optimistic. Para `closeChat`:

```js
function closeChat() {
    if (!_activeSessionId || !window.db) return;
    if (!confirm('¿Cerrar esta conversación?\n\nEl cliente verá un aviso de cierre y sólo podrá iniciar una conversación nueva. Los mensajes se conservan.')) return;
    var sid = _activeSessionId;
    var asesorNombre = (AP.currentUserProfile && AP.currentUserProfile.nombre) || 'Un asesor';
    var asesorUid = window.auth.currentUser.uid;
    var nowIso = new Date().toISOString();

    // §60.1 — OPTIMISTIC: update local + render INSTANT
    var chat = _chats.find(function (c) { return c._docId === sid; });
    var snapshot = null;
    if (chat) {
        snapshot = { status: chat.status, closedAt: chat.closedAt, closedBy: chat.closedBy, closedByName: chat.closedByName };
        chat.status = 'closed';
        chat.closedAt = nowIso;
        chat.closedBy = asesorUid;
        chat.closedByName = asesorNombre;
        chat.lastMessage = '✓ Conversación cerrada por ' + asesorNombre;
        chat.lastMessageAt = nowIso;
        renderChatList();
        renderChatDetail(chat, _activeMessages);
    }

    // Mensaje system optimistic
    var systemMsg = {
        from: 'system',
        systemType: 'closed',
        text: '✓ ' + asesorNombre + ' cerró esta conversación. Iniciá una nueva cuando quieras.',
        timestamp: nowIso,
        asesorNombre: asesorNombre,
        asesorUid: asesorUid
    };
    var tempId = window.HubStore.addMessageOptimistic(sid, systemMsg);
    _activeMessages.push(Object.assign({ _tempId: tempId, _status: 'pending' }, systemMsg));
    renderChatDetail(chat, _activeMessages);

    // 1. Marcar el doc parent como cerrado (Firestore background)
    var p1 = window.db.collection('conciergeChats').doc(sid).set({
        status: 'closed',
        closedAt: nowIso,
        closedBy: asesorUid,
        closedByName: asesorNombre,
        resolvedAt: nowIso,
        resolvedBy: asesorUid,
        lastMessageAt: nowIso,
        lastMessage: '✓ Conversación cerrada por ' + asesorNombre
    }, { merge: true });

    // 2. Insertar mensaje system
    var p2 = window.db.collection('conciergeChats').doc(sid)
        .collection('messages').add(systemMsg);

    Promise.all([p1, p2]).then(function (results) {
        // Confirmar mensaje system
        var ref = results[1];
        window.HubStore.confirmMessage(tempId, Object.assign({ _docId: ref.id, _sid: sid }, systemMsg));
        var idx = _activeMessages.findIndex(function (m) { return m._tempId === tempId; });
        if (idx >= 0) {
            _activeMessages[idx]._status = 'sent';
            _activeMessages[idx].firestoreId = ref.id;
            renderChatDetail(chat, _activeMessages);
        }
        AP.toast('Conversación cerrada');
    }).catch(function (err) {
        // §60.1 — ROLLBACK
        if (snapshot && chat) {
            Object.assign(chat, snapshot);
            renderChatList();
            renderChatDetail(chat, _activeMessages);
        }
        window.HubStore.rollbackMessage(tempId, err.message);
        var idx = _activeMessages.findIndex(function (m) { return m._tempId === tempId; });
        if (idx >= 0) _activeMessages.splice(idx, 1);
        renderChatDetail(chat, _activeMessages);
        AP.toast('Error al cerrar: ' + err.message, 'error');
    });
}
```

##### 7.1.2.8 Extender `renderChatDetail` para distinguir `_status`

En `admin-concierge.js:615`, dentro del bloque que renderiza mensajes:

```js
var msgsHTML = messages.length === 0
    ? '<div class="cnc-admin-detail-empty">Sin mensajes en esta conversación.</div>'
    : messages.map(function (m) {
        if (m.from === 'system') {
            return '<div class="cnc-detail-msg cnc-detail-system">' +
                '<div class="cnc-detail-system-bubble">' + escTxt(m.text) + '</div>' +
                '<div class="cnc-detail-time">' + escTxt(timeAgo(m.timestamp)) + '</div>' +
            '</div>';
        }
        var bubbleClass = m.from === 'user' ? 'cnc-detail-user' :
                          m.from === 'asesor' ? 'cnc-detail-asesor' : 'cnc-detail-bot';

        // §60.1 — Estados visuales canónicos
        var statusClass = '';
        var statusIcon = '';
        if (m._status === 'pending') {
            statusClass = ' cnc-msg-pending';
            statusIcon = '<span class="cnc-msg-status" data-state="pending">⏱</span>';
        } else if (m._status === 'sent') {
            statusClass = ' cnc-msg-synced';
            statusIcon = '<span class="cnc-msg-status" data-state="sent">✓</span>';
        } else if (m._status === 'read') {
            statusClass = ' cnc-msg-synced';
            statusIcon = '<span class="cnc-msg-status" data-state="read">✓✓</span>';
        } else if (m._status === 'failed') {
            statusClass = ' cnc-msg-failed';
            statusIcon = '<button class="cnc-msg-retry" data-action="retry-msg" data-temp-id="' + escTxt(m._tempId || '') + '">Reintentar</button>';
        }

        return '<div class="cnc-detail-msg ' + bubbleClass + statusClass + '" data-temp-id="' + escTxt(m._tempId || '') + '">' +
            '<div class="cnc-detail-bubble">' + escTxt(m.text) + statusIcon + '</div>' +
            '<div class="cnc-detail-time">' + escTxt(timeAgo(m.timestamp)) + '</div>' +
        '</div>';
    }).join('');
```

##### 7.1.2.9 CSS estados visuales canónicos (`css/admin.css`)

Agregar al final del archivo:

```css
/* ═══════════════════════════════════════════════════════════
   §60.1 — Estados visuales canónicos de mensajes (WhatsApp pattern)
   ═══════════════════════════════════════════════════════════ */

.cnc-detail-msg {
    opacity: 0;
    transform: translateY(8px);
    transition: opacity 200ms ease-out, transform 200ms ease-out;
}
.cnc-detail-msg.cnc-msg-pending,
.cnc-detail-msg.cnc-msg-synced,
.cnc-detail-msg.cnc-msg-failed {
    opacity: 1;
    transform: translateY(0);
}

.cnc-detail-msg.cnc-msg-pending {
    opacity: 0.7;
}

.cnc-detail-msg.cnc-msg-synced {
    opacity: 1;
}

.cnc-detail-msg.cnc-msg-failed {
    border: 1px solid var(--status-danger, #ef4444);
    border-radius: var(--vis-r-md, 12px);
    opacity: 1;
}

.cnc-msg-status {
    display: inline-block;
    margin-left: 6px;
    font-size: 0.75rem;
    color: var(--text-tertiary, rgba(255,255,255,0.5));
    transition: color 150ms ease-out, transform 150ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.cnc-msg-status[data-state="pending"] { color: rgba(255,255,255,0.4); }
.cnc-msg-status[data-state="sent"] {
    color: rgba(255,255,255,0.6);
    transform: scale(1.05);
}
.cnc-msg-status[data-state="read"] {
    color: #34B7F1;
    transform: scale(1);
}

.cnc-msg-retry {
    background: rgba(239, 68, 68, 0.15);
    color: #fca5a5;
    border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: 6px;
    padding: 2px 8px;
    font-size: 0.75rem;
    cursor: pointer;
    margin-left: 6px;
    transition: background-color 150ms ease-out;
}
.cnc-msg-retry:hover {
    background: rgba(239, 68, 68, 0.25);
}

@keyframes cncShake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-4px); }
    75% { transform: translateX(4px); }
}
.cnc-msg-shake {
    animation: cncShake 500ms cubic-bezier(0.36, 0.07, 0.19, 0.97);
}

@media (prefers-reduced-motion: reduce) {
    .cnc-detail-msg, .cnc-msg-status {
        transition: none !important;
    }
    .cnc-msg-shake {
        animation: none !important;
    }
}
```

##### 7.1.2.10 Cache version bump

`service-worker.js`:
```js
const CACHE_VERSION = 'v20260512010000'; // §60.1 — Optimistic UI universal admin (S1 sprint cirugía)
```

`js/cache-manager.js`:
```js
const APP_VERSION = '20260512010000'; // §60.1 — Optimistic UI admin
```

#### 7.1.3 Tests E2E

| # | Test | Esperado |
|---|---|---|
| 1 | Asesor click "Tomar conversación" | Banner verde "Estás atendiendo" aparece <16ms |
| 2 | Si race condition (otro asesor lo tomó antes) | Rollback automático + toast "X tomó este chat" |
| 3 | Asesor escribe mensaje + Enter | Bubble aparece INSTANT con icon ⏱ pending |
| 4 | Esperar 500ms-2s | Icon ⏱ → ✓ sent (transición spring) |
| 5 | Cliente abre el chat | ✓ → ✓✓ read (color azul) |
| 6 | Asesor click pin | Estrella aparece INSTANT, sin flicker |
| 7 | Asesor click archive | Chat sale de la lista INSTANT |
| 8 | Asesor click cerrar chat | Banner "✓ Conversación cerrada" aparece INSTANT |
| 9 | Network drop mid-send | Bubble pasa a `failed` con border rojo + botón "Reintentar" |
| 10 | Click "Reintentar" | Reintenta envío, recupera estado |
| 11 | DevTools console al enviar | `[HubStore] message_added` event emitido |
| 12 | DevTools console al confirmar | `[HubStore] message_synced` event emitido |
| 13 | `prefers-reduced-motion: reduce` | Animaciones desactivadas, sin shake |
| 14 | Mobile: enviar 5 mensajes rápido | Todos aparecen INSTANT, ninguno se pierde |

#### 7.1.4 Anti-patterns evitados

- ✅ Cero `MutationObserver subtree:true` (§17.12).
- ✅ Cero `pointermove` persistente (§35).
- ✅ Cero `transition: all` (§17.2).
- ✅ Solo `transition: opacity, transform, color` (compositor-only).
- ✅ Respeta `prefers-reduced-motion`.
- ✅ Listeners delegados, no addEventListener directo en bubbles re-rendered.

#### 7.1.5 Commit message sugerido

```
§60.1 perf(altor-hub): optimistic UI universal del admin

Cliente reporto: "los botones no responden inmediatamente, los
mensajes tardan en aparecer". Causa raiz: 7 botones del Hub admin
sin Optimistic UI esperaban 500ms-2s al server antes de actualizar
la UI.

Cambios fundamentales:
- NUEVO js/hub-store.js (~100 lineas) — Object Pool in-memory estilo
  Linear con addMessageOptimistic + confirmMessage + rollbackMessage
- _sendAsesorMessageInternal (admin-concierge.js:972) refactor con
  tempId + estados pending/sent/failed + rollback en error
- claimChat optimistic con snapshot + rollback en race condition
- togglePin/Archive/markUnread/closeChat/reopenChat optimistic
- renderChatDetail extendido para distinguir _status de cada msg
- CSS estados canonicos WhatsApp: ✓ pending, ✓ sent, ✓✓ read

Estados visuales canonicos (WhatsApp pattern adoptado literal):
- pending: opacity 0.7 + ⏱ icon gris claro
- sent: opacity 1.0 + ✓ gris
- read: ✓✓ azul (#34B7F1)
- failed: border rojo + boton Reintentar + shake animation

Tests E2E: 14 escenarios validados (claim race, network drop,
reduced motion, mobile rapid send, etc).

Anti-patterns evitados:
- Cero MutationObserver subtree:true (§17.12)
- Cero pointermove persistente (§35)
- Cero transition: all (§17.2)
- Solo transition: opacity, transform, color (compositor-only)

Cache bump: v20260512010000
Documentado: CLAUDE.md §60.1

https://claude.ai/code/session_019oiVeU22EoYVtVFd91BrpK
```

---

### 7.2 Sprint S2 — Optimistic UI universal del cliente

**Tiempo estimado**: 1 día
**Impacto**: 🔴 CRÍTICO. Mensajes/escalado/finalización aparecen INSTANT.

#### 7.2.1 Cambios principales

1. **`addMessage` ya es optimistic** pero falta el visual feedback:
   - Agregar `_status: 'pending' → 'sent'` al schema de mensaje.
   - Renderizar ✓ vs ✓✓ en bubble del usuario.
   - `syncMessageToFirestore` confirma status.

2. **`escalateToLive`** (concierge.js:1038): queue banner aparece INSTANT, transaction Firestore en background.

3. **`markSessionFinalized`**: pantalla "Chat finalizado" aparece INSTANT, Firestore set en background.

4. **Botones del closed-block**: ya son síncronos (post-§57.9), refinar con telemetría.

#### 7.2.2 Archivos a modificar

| Archivo | Cambio | Líneas |
|---|---|---|
| `js/concierge.js:793` | `addMessage` con `_status: pending` por default | +5 |
| `js/concierge.js:1549` | `syncMessageToFirestore` confirma status sent al success | +10 |
| `js/concierge.js` | `renderMessages` extendido con estados visuales | +30 |
| `js/concierge.js:1038` | `escalateToLive` optimistic | +20, -5 |
| `js/concierge.js:2183` | `markSessionFinalized` optimistic | +15, -5 |
| `css/concierge.css` | Estados visuales canónicos | +60 |
| `service-worker.js` + `cache-manager.js` | Bump v20260512020000 | +2, -2 |

**Total**: ~140 agregadas, ~12 eliminadas.

#### 7.2.3 Cache bump

```
v20260512020000 // §60.2 — Optimistic UI universal cliente
```

#### 7.2.4 Tests E2E

| # | Test | Esperado |
|---|---|---|
| 1 | Cliente escribe + envía | Bubble aparece INSTANT con ⏱ |
| 2 | Esperar Firestore confirm | ⏱ → ✓ |
| 3 | Asesor abre el chat | ✓ → ✓✓ azul |
| 4 | Cliente click "Hablar con asesor" | Banner queue INSTANT, sin loading spinner |
| 5 | Cliente click "Finalizar conversación" → confirm | Pantalla "Chat finalizado" INSTANT |

---

### 7.3 Sprint S3 — Typing Indicators bidireccionales (RTDB)

**Tiempo estimado**: 1.5 días
**Impacto**: 🟠 Alta. Sensación "vivo" tipo WhatsApp.

#### 7.3.1 Schema RTDB

```
/typing/{sessionId}/
    user: {typing: bool, ts: timestamp}
    asesor_<uid>: {name, typing: bool, ts: timestamp}
```

#### 7.3.2 Lógica cliente

```js
// concierge.js — agregar listener input
var input = document.getElementById('cncInput');
var _typingThrottle = null;
var _typingDebounce = null;

input.addEventListener('input', function () {
    // Mark typing every 1s while typing (throttle)
    if (!_typingThrottle) {
        firebase.database().ref('/typing/' + session.sessionId + '/user').set({
            typing: true,
            ts: firebase.database.ServerValue.TIMESTAMP
        });
        firebase.database().ref('/typing/' + session.sessionId + '/user').onDisconnect().remove();
        _typingThrottle = setTimeout(function () { _typingThrottle = null; }, 1000);
    }

    // Debounce 3s para marcar no-typing
    if (_typingDebounce) clearTimeout(_typingDebounce);
    _typingDebounce = setTimeout(function () {
        firebase.database().ref('/typing/' + session.sessionId + '/user').set({
            typing: false,
            ts: firebase.database.ServerValue.TIMESTAMP
        });
    }, 3000);
});

// Listener para typing del asesor
function startAsesorTypingListener() {
    if (!session.sessionId) return;
    firebase.database().ref('/typing/' + session.sessionId).on('value', function (snap) {
        var data = snap.val() || {};
        var asesoresTyping = [];
        Object.keys(data).forEach(function (key) {
            if (key.startsWith('asesor_') && data[key].typing && (Date.now() - data[key].ts) < 5000) {
                asesoresTyping.push(data[key].name || 'Asesor');
            }
        });
        if (asesoresTyping.length > 0) {
            showTypingIndicator(asesoresTyping[0]);
        } else {
            hideTypingIndicator();
        }
    });
}
```

#### 7.3.3 UI typing indicator

3 dots animados estilo iMessage en bubble del que NO está escribiendo. Aparece <100ms desde el primer keystroke. Desaparece 3s después del último keystroke o al enviar.

#### 7.3.4 Cache bump

```
v20260512030000 // §60.3 — Typing indicators bidireccionales (RTDB)
```

---

### 7.4 Sprint S4 — Read Receipts (Firestore)

**Tiempo estimado**: 1 día
**Impacto**: 🟠 Alta. ✓ vs ✓✓ visual feedback.

#### 7.4.1 Schema Firestore

En `conciergeChats/{sid}` (campos nuevos):
```
lastReadByUser: ISO_timestamp
lastReadByAdmin: ISO_timestamp
```

#### 7.4.2 Lógica

```js
// admin-concierge.js — openChat marca leído
function openChat(sessionId) {
    db.collection('conciergeChats').doc(sessionId)
        .update({lastReadByAdmin: new Date().toISOString()})
        .catch(function () {});
    // ... resto del flow
}

// concierge.js — cliente con panel abierto marca leído cada 10s
setInterval(function () {
    if (_isOpen && _chatDocCreated && session.sessionId) {
        db.collection('conciergeChats').doc(session.sessionId)
            .update({lastReadByUser: new Date().toISOString()})
            .catch(function () {});
    }
}, 10000);
```

#### 7.4.3 Render

En `renderChatDetail` (admin) y `renderMessages` (cliente):
- Si `message.timestamp < lastReadByOther` → `_status: 'read'` → ✓✓ azul.
- Si `message.timestamp >= lastReadByOther` → `_status: 'sent'` → ✓ gris.

#### 7.4.4 Cache bump

```
v20260512040000 // §60.4 — Read receipts (Firestore)
```

---

### 7.5 Sprint S5 — Presence avanzada (online/away/offline)

**Tiempo estimado**: 1.5 días
**Impacto**: 🟡 Media. Cliente sabe si asesor está online en tiempo real.

#### 7.5.1 Schema RTDB

Extender `/presence/{sessionId}`:
```
{
    uid, email, nombre, rol,
    online: true,
    status: 'available' | 'busy' | 'away',
    activeChats: int,
    lastActivity: timestamp
}
```

#### 7.5.2 Cliente lee

```js
firebase.database().ref('/presence').orderByChild('online').equalTo(true).on('value', function (snap) {
    var asesoresOnline = [];
    snap.forEach(function (child) {
        var data = child.val();
        if (data.rol === 'editor' || data.rol === 'super_admin') {
            asesoresOnline.push(data);
        }
    });
    updateAvailabilityIndicator(asesoresOnline.length);
});
```

#### 7.5.3 UI cliente

Header del widget: "🟢 Asesores disponibles" o "🟡 Te respondemos en breve".

#### 7.5.4 Cache bump

```
v20260512050000 // §60.5 — Presence avanzada
```

---

### 7.6 Sprint S6 — Rediseño visual del Hub admin

**Tiempo estimado**: 3 días
**Impacto**: 🟠 Alta. UI premium nivel Intercom.

#### 7.6.1 Cambios visuales

| Elemento | Antes | Después (industry-standard) |
|---|---|---|
| Bubble asesor | bg sólido sin animación | gradient + shadow + slide-up animation 200ms |
| Bubble cliente | gris plano | gradient gris suave + bordes redondeados 18px |
| Typing indicator | inexistente | 3 dots animados estilo iMessage |
| Status messages | texto plano centrado | pill con icon + animation cursiva gris |
| Avatar del cliente | iniciales solamente | iniciales + dot online (verde si conectado) |
| Lista lateral | items planos | hover lift + active state dorado |
| Header chat | minimal | radicado pill + status + actions toolbar |
| Composer | textarea simple | rich editor con preview + plantillas dropdown |
| Banners | rectángulos sólidos | glass-morphism con border-left color |

#### 7.6.2 Tipografía consolidada

```css
--cnc-font-body: 'Inter', system-ui, -apple-system, sans-serif;
--cnc-font-size-body: 14px;
--cnc-font-size-caption: 12px;
--cnc-line-height: 1.5;
--cnc-letter-spacing-body: -0.01em;
```

#### 7.6.3 Paleta de bubbles

```css
--cnc-bubble-asesor-bg: linear-gradient(135deg, #d4ad6e, #b89658);
--cnc-bubble-user-bg: linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.04));
--cnc-bubble-bot-bg: rgba(184, 150, 88, 0.10);
--cnc-bubble-system-bg: rgba(74, 222, 128, 0.10);
```

#### 7.6.4 Animation system canonical (6 curvas, vs 12 actuales)

```css
:root {
    --ease-snap: cubic-bezier(0.4, 0, 0.2, 1);
    --ease-soft: cubic-bezier(0.22, 1, 0.36, 1);
    --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
    --ease-spring: cubic-bezier(0.34, 1.4, 0.64, 1);
    --ease-decel: cubic-bezier(0, 0, 0.2, 1);
    --ease-accel: cubic-bezier(0.4, 0, 1, 1);

    --dur-instant: 80ms;
    --dur-quick: 150ms;
    --dur-base: 220ms;
    --dur-medium: 320ms;
    --dur-slow: 500ms;
}

@keyframes bubbleEnter {
    from { opacity: 0; transform: translateY(8px) scale(0.98); }
    to { opacity: 1; transform: translateY(0) scale(1); }
}
.chat-bubble-enter { animation: bubbleEnter var(--dur-base) var(--ease-soft) both; }

@keyframes typingDot {
    0%, 80%, 100% { opacity: 0.3; transform: translateY(0); }
    40% { opacity: 1; transform: translateY(-4px); }
}
.typing-dot:nth-child(1) { animation: typingDot 1.4s var(--ease-soft) infinite; }
.typing-dot:nth-child(2) { animation: typingDot 1.4s var(--ease-soft) infinite 0.2s; }
.typing-dot:nth-child(3) { animation: typingDot 1.4s var(--ease-soft) infinite 0.4s; }
```

#### 7.6.5 Cache bump

```
v20260512060000 // §60.6 — Rediseño visual Hub admin
```

---

### 7.7 Sprint S7 — Rediseño visual del cliente

**Tiempo estimado**: 2 días
**Impacto**: 🟠 Alta. UX premium nivel Intercom.

#### 7.7.1 Cambios

1. **FAB** (ya está bien): refinar timing del CTA bubble.
2. **Panel apertura**: animation spring overshoot + skeleton loader 300ms max.
3. **Header**: avatar bot/asesor + nombre + status pill + ⋮ menu.
4. **Welcome message inteligente**:
   - Si en página de vehículo: "Veo que estás viendo el [Marca Modelo]. ¿Tenés preguntas?"
   - Si returning user: "¡Bienvenido de vuelta, [Nombre]!"
   - Si nuevo: greeting estándar.
5. **Lead Capture Gate progresivo**: NO forzar al primer mensaje. Pedir email solo cuando relevante.
6. **Quick replies inteligentes** post-respuesta del bot.
7. **Composer**: auto-grow textarea + send habilitado solo con texto.

#### 7.7.2 Cache bump

```
v20260512070000 // §60.7 — Rediseño visual cliente
```

---

## 8. ELIMINACIÓN DE CÓDIGO MUERTO

Audit identificó código que sobra post-cirugía:

| Archivo | Líneas | Razón | Sprint que lo elimina |
|---|---|---|---|
| `js/concierge.js` `closeOrFinalize` | 12 | Reemplazado por reducer pattern (S1) | S1 |
| `js/concierge.js` `_resetting` flag | 30+ | Innecesario con HubStore + listener guard | S2 |
| `js/concierge.js` setTimeout 350ms restore inline styles | 10 | Patrón obsoleto post-S6 | S6 |
| `js/admin-concierge.js` heartbeat 30s | 10 | onSnapshot reconnect nativo de Firestore lo cubre | S1 |
| `css/concierge.css` `.cnc-closed-cta` legacy | 20 | No se usa, reemplazado por `.cnc-closed-action` | S2 |
| `css/concierge.css` 6 keyframes infinite no usados | 80 | Confirmado con audit | S6 |
| `js/concierge.js` `FAQ_LIBRARY` hardcoded | 50 | Reemplazado por `knowledgeBase/_brain` desde §21 | S2 |

**Total a eliminar**: ~200-250 líneas de código muerto post-cirugía completa.

**Regla**: cada sprint que reemplace funcionalidad debe ELIMINAR la versión vieja en el mismo commit. Cero "// DEPRECATED — borrar después".

---

## 9. CHECKLIST POST-COMMIT OBLIGATORIO

ANTES de hacer `git push`, verificar:

- [ ] `node -c <archivo.js>` para CADA archivo JS modificado.
- [ ] `grep -rn "<identifier eliminado>" js/ css/ *.html` retorna 0 (sin orfandad).
- [ ] CACHE_VERSION en `service-worker.js` actualizado.
- [ ] APP_VERSION en `js/cache-manager.js` matchea CACHE_VERSION.
- [ ] Sub-sección `§60.X` agregada en `CLAUDE.md` con causa raíz, fix, archivos, tests.
- [ ] Cero `MutationObserver subtree:true` agregados.
- [ ] Cero `pointermove` persistente agregado.
- [ ] Cero `transition: all` agregado.
- [ ] Cero `setInterval` de alta frecuencia (>10 fps).
- [ ] CSS solo anima `transform`, `opacity`, `color`, `box-shadow`.
- [ ] `prefers-reduced-motion: reduce` respetado en cada nueva animation.
- [ ] Tests E2E manuales del sprint corridos y validados.
- [ ] IAP §37 redactado en commit message.
- [ ] Código muerto identificado en sprint anterior, eliminado en este.

Si CUALQUIER item falla → no se merguea hasta resolverlo.

---

## 10. ANEXOS: SCHEMAS Y HELPERS

### 10.1 Schema completo `conciergeChats/{sid}` (post-cirugía)

```typescript
interface ConciergeChat {
    // Identidad
    sessionId: string;                // 'cnc_<timestamp>_<rand>'
    userId: string | null;
    userEmail: string | null;
    userNombre: string | null;
    userTelefono: string | null;
    userCedula: string | null;

    // Estado
    mode: 'bot' | 'queue' | 'live' | 'wa_handed_over';
    status: 'active' | 'closed';

    // Lifecycle
    createdAt: string;                // ISO
    closedAt: string | null;
    closedBy: string | null;          // 'client' | uid
    closedByName: string | null;
    closedByRole: 'client' | 'editor' | 'super_admin' | null;
    closedReason: 'client_finalized' | 'admin_resolved' | 'idle_timeout' | 'sla_breach_handover' | null;
    reopenedAt: string | null;
    reopenedBy: string | null;
    resolvedAt: string | null;
    resolvedBy: string | null;

    // Claiming
    claimedBy: string | null;         // uid
    claimedByName: string | null;
    claimedAt: string | null;
    claimReleasedBy: string | null;
    claimReleasedAt: string | null;
    escalationReason: string | null;

    // SLA
    queueEnteredAt: string | null;
    slaWarnedAt5min: boolean;
    slaWarnedAt10min: boolean;

    // Trazabilidad
    radicado: string | null;          // 'REQ-YYYYMM-XXXX'
    radicadoAt: string | null;
    historicalUserKey: string | null;

    // UI state
    isPinned: boolean;
    pinnedAt: string | null;
    isArchived: boolean;
    archivedAt: string | null;
    archivedBy: string | null;
    isDeleted: boolean;               // legacy, post-§57 usar hard delete
    deletedAt: string | null;
    deletedBy: string | null;

    // Mensajes
    lastMessage: string;
    lastMessageAt: string;
    unreadByAdmin: number;
    unreadByUser: number;
    forceUnreadByAdmin: boolean;

    // Read receipts (NUEVO §60.4)
    lastReadByUser: string | null;
    lastReadByAdmin: string | null;

    // Asesor activo
    activeAsesor: {
        uid: string;
        nombre: string;
        photoURL: string | null;
    } | null;

    // Contexto
    context: {
        lastIntent: string | null;
        discussedTopics: string[];
        bot_repeated_count: number;
    };

    // Origen
    sourcePage: string;
    sourceVehicleId: string | null;

    // Notificaciones
    notifiedFcmAt: string | null;
    notifiedTelegramAt: string | null;
    telegramAlertsCount: number;
    telegramSkipReason: string | null;

    // Resumen IA (§F.1)
    summary: string | null;
    summaryUpToTurn: number;
    summaryUpdatedAt: string | null;
    summaryModel: string | null;

    // Fallback counter (§23 F.6)
    botFallbackCount: number;
    botFallbackAt: string | null;

    // Proactive
    lastProactiveAt: string | null;

    // Profile
    profile: object | null;
    level: 0 | 1 | 2 | 3 | 4 | 5;
}
```

### 10.2 Schema `messages/{mid}` subcollection

```typescript
interface ConciergeMessage {
    // Identidad
    _docId: string;                   // Firestore-assigned (al confirmar)
    _tempId?: string;                  // Local-only, antes de sync
    _status?: 'pending' | 'sent' | 'read' | 'failed';   // Local-only
    _error?: string;                   // Local-only, si failed

    // Contenido
    from: 'user' | 'bot' | 'asesor' | 'system';
    text: string;
    timestamp: string;                // ISO
    systemType?: 'closed' | 'reopened' | 'asesor_joined' | 'asesor_left' | 'transferred';

    // Asesor
    asesorUid?: string;
    asesorNombre?: string;
    asesorPhotoURL?: string;

    // Bot enriquecimiento
    proactive?: boolean;
    triggerType?: string;
    cta?: { label: string; action: string };
    quickReplies?: Array<{ label: string; payload: string }>;
    vehicleCards?: VehicleCard[];

    // Read receipts
    readBy?: string[];                 // uids que han leído este msg
}
```

### 10.3 Schema RTDB `/typing/{sessionId}/`

```json
{
    "user": {
        "typing": true,
        "ts": 1735324800000
    },
    "asesor_<uid>": {
        "name": "Daniel",
        "typing": true,
        "ts": 1735324801000
    }
}
```

TTL: 5 segundos. Si `Date.now() - ts > 5000`, ignorar.

### 10.4 Helper `escapeHtml`

```js
function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
}
```

### 10.5 Helper `timeAgo`

```js
function timeAgo(ts) {
    if (!ts) return '';
    var d = new Date(ts).getTime();
    var diff = Date.now() - d;
    if (diff < 60000) return 'ahora';
    if (diff < 3600000) return Math.floor(diff / 60000) + 'min';
    if (diff < 86400000) return Math.floor(diff / 3600000) + 'h';
    return Math.floor(diff / 86400000) + 'd';
}
```

---

## 📚 REFERENCIAS

### Sources del agente de research

- [Engineering principles: building real-time Intercom](https://www.intercom.com/blog/videos/engineering-principles-building-real-time-intercom/)
- [Customizing the Messenger | Intercom Developer Platform](https://developers.intercom.com/installing-intercom/web/customization)
- [Drift Platform: Transform Conversations](https://www.drift.com)
- [Crisp Technical Blog](https://crisp.chat/en/blog/tag/technical/)
- [Crisp WebSDK — GitHub](https://github.com/crisp-im/crisp-sdk-web)
- [Discovering Front as an engineer](https://front.com/blog/discovering-front-as-an-engineer)
- [Tidio API Documentation](https://developers.tidio.com/)
- [Zendesk Conversation Log API](https://support.zendesk.com/hc/en-us/articles/9289404780826-Announcing-Conversation-Log-API-release)
- [HubSpot Conversations API](https://developers.hubspot.com/docs/api-reference/conversations-conversations-v3/guide)
- [Inside WhatsApp's Real-Time Infrastructure](https://medium.com/@ygsh0816/inside-whatsapps-real-time-infrastructure-the-magic-behind-online-and-typing-f9ac648fb2e7)
- [Telegram MTProto Mobile Protocol](https://core.telegram.org/mtproto)
- [Real-time Messaging | Engineering at Slack](https://slack.engineering/real-time-messaging/)
- [Migrating Millions of Concurrent Websockets to Envoy](https://slack.engineering/migrating-millions-of-concurrent-websockets-to-envoy/)
- [LiveChat Routing Rules](https://www.livechat.com/help/setting-up-routing-rules/)
- [Freshchat IntelliAssign Documentation](https://crmsupport.freshworks.com/support/solutions/articles/50000004357)
- [Scaling the Linear Sync Engine](https://linear.app/now/scaling-the-linear-sync-engine)
- [Reverse Engineering Linear's Sync Engine — GitHub](https://github.com/wzhudev/reverse-linear-sync-engine)
- [Reverse Engineering Linear's Sync Magic](https://marknotfound.com/posts/reverse-engineering-linears-sync-magic/)
- [Real-time communication at scale with Elixir at Discord](https://elixir-lang.org/blog/2020/10/08/real-time-communication-at-scale-with-elixir-at-discord/)
- [Get realtime updates with Cloud Firestore | Firebase](https://firebase.google.com/docs/firestore/query-data/listen)
- [Understand Real-time queries at scale | Firestore](https://firebase.google.com/docs/firestore/real-time_queries_at_scale)
- [Firebase Presence Detection](https://firebase.google.com/docs/firestore/solutions/presence)
- [Firebase Realtime Database Offline Capabilities](https://firebase.google.com/docs/database/web/offline-capabilities)
- [Optimistic UI Updates: Patterns](https://murtazaweb.com/blog/2026-03-22-optimistic-ui-updates-patterns/)
- [Building an Optimistic UI with RxDB](https://rxdb.info/articles/optimistic-ui.html)
- [Cheat Code for a Lightning Fast Front End: Building an Optimistic UI](https://derekndavis.com/posts/lightning-fast-front-end-build-optimistic-ui)
- [How to create iOS chat bubbles in CSS](https://samuelkraft.com/blog/ios-chat-bubbles-css)

### Secciones de CLAUDE.md referenciadas

- §17 — Reglas operativas de performance.
- §17.4 — HTML/CSS estable.
- §17.12 — RCA STRUCTURAL FIX (anti-MutationObserver).
- §19 — RCA Mode estricto.
- §35 — Anti-patterns acumulados.
- §37 — Protocolo IAP.
- §57.7 — Listeners admin globalmente activos.
- §57.9 — Lazy reset on next open.
- §58 — Mega-Plan estratégico (estratégico).
- §59 — Cirugía técnica (este plan, en CLAUDE.md).

---

## ✅ ESTE DOCUMENTO ES EJECUTABLE

Cualquier ventana de Claude con acceso al repositorio puede:

1. Leer este archivo en su totalidad.
2. Aplicar `Sprint S1` siguiendo la sección 7.1 paso por paso.
3. Verificar tests E2E.
4. Commitear con el mensaje sugerido.
5. Pushear.
6. Continuar con S2-S7 secuencialmente.

**Cero ambigüedad. Cero detalle omitido. Cero código muerto.**

Última actualización: 2026-05-08.
Sesión origen: `019oiVeU22EoYVtVFd91BrpK`.
