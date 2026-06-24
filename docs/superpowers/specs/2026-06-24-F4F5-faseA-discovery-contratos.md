# F4/F5 · FASE A — Discovery + Mapa de Contratos v1 (anti-regresión) ⟦OPUS-4.8⟧

> Entregable de la **Fase A** del plan `2026-06-24-EPIC-F4F5-rediseno-total-altor-PLAN.md`.
> Construido leyendo el CÓDIGO REAL (§3.3), con anclas `archivo:línea` para la Fase D (build).
> **Propósito**: la lista EXPLÍCITA de lo que el módulo v2 NO puede romper (doctrina #3 del plan: cero regresión).
> Fecha: 2026-06-24. Verificado contra: `concierge.js` (4479 L), `admin-concierge.js` (2979 L), `concierge.css` (2324 L), `admin.html`.

---

## 1. Arquitectura v1 (verificada)

| Pieza | Archivo | Carga | Montaje DOM | Namespace |
|---|---|---|---|---|
| **Bot widget (público)** | `js/concierge/concierge.js` | dinámica vía `components.js` (20-ESPACIAL §49) | **auto-inyecta en `document.body`**: FAB (`:2288`), CTA bubble (`:2300`), panel (`:2398`) | IDs `cnc*` · clases `.cnc-*` |
| Opt-in marketing | `js/concierge/concierge-optin.js` | con el bot | — | API `eraseClient(uid)`, schema `marketingOptIn{email,whatsapp,sms}` |
| **ALTOR Hub (admin)** | `js/admin/admin-concierge.js` | en `admin.html` | contenedores ESTÁTICOS: `#sec-concierge`, `#conciergeChatList` (`admin.html:1470`), `#conciergeChatDetail` (`:1478`) | IDs `cncAdmin*` · clases `.cnc-admin-*`, `.cnc-transfer-*`, `.altor-hub-*` |

- `admin-inbox.js` **NO EXISTE** — el `sec-inbox` viejo fue eliminado (MF4.7), todo unificado en `sec-concierge`. (Corregir mención en el plan/20-ESPACIAL.)
- **Implicación de arquitectura (flag v2)**: como el widget se auto-inyecta, v1 y v2 no pueden montar a la vez. El flag decide en el punto de carga (`components.js`) cuál módulo corre → v1 intacto, A/B real a nivel DOM (doctrina #1).

---

## 2. CONTRATOS del Bot widget (`concierge.js`) — preservar TODOS

### 2.1 API pública (callsites externos dependen — §3.2)
```
window.AltorraConcierge = {            // :4467
  open, close, toggle, send,
  openWithVehicleContext,              // :4368  (deep-link desde detalle-vehiculo)
  applyAuthProfile,                    // re-render en cada onAuthStateChanged (:4460)
  resetSession,                        // :3543
  session(), _state()                  // debug/lectura
}
window._altorraConciergeRespondLocal   // :882  — responder Free Core (motor HOY; LLM v2 dormido)
```

### 2.2 Captura de leads (TODO-37 §235 — CERO pérdida, doctrina #4)
- `createSoftContact()` → crea lead en `solicitudes/` (CREATE; un guest SÍ puede crear). `_leadCreated`, `session.leadId`, `_softContactRef` (:1192/1239).
- `updateSoftContact()` (:1250) → enriquece (UPDATE solo-admin; en guest falla con `permission-denied` **esperado** → silenciado, F#2). Fire-and-forget (:1133).
- `isGateRequired()` (:2548) → gate de captura antes de acciones de alto valor (cita/vender/financiación). **CÉDULA RETIRADA** (:2362, F2 EPIC: menos fricción) → pide nombre+celular.
- `createLeadInCRM()` (:2257) = alias legacy → delega a `createSoftContact` (U.16). Preservar el nombre (callsites).
- Vinculación de leads anónimos al `uid` en login (:4261–4333): vincula `solicitudes/` + chats al uid.

### 2.3 Escalado / SLA / cola (preservar lógica + estados)
- `escalateToLive(reason)` (:1333) → pasa a asesor humano; dispara create/update lead (:1365).
- Banners de estado (DOM + data-action): `#cncQueueBanner` (:1549), `#cncSLAWarning` (:1569, **#1 del backlog**), `#cncSLABreach` (:1591). Botones `data-action="open-wa" | "dismiss-sla-warning"`.
- Flags idempotencia SLA persistidos a Firestore: `session.slaWarnedAt5min` (:1393/1424/2123).

### 2.4 Handoff WhatsApp (preservar — rescate cero-pérdida)
- `handoverToWhatsApp()` (:1624) + `buildWhatsAppSummary()` (:1632) + `WHATSAPP_NUMBER`. URL `wa.me/<num>?text=<resumen>`. Debe dispararse en **gesto de usuario** (evita bloqueo de popup, :2827). Usado por el form (:2536), SLA breach (:3640).

### 2.5 Sesión / persistencia / logout
- `resetSession(opts)` (:3543), `cleanSessionAndRender()` + flag protector `_resetting` (:3398/3436, §57.6 contra snapshots tardíos).
- §234: purga de privacidad en logout (no fuga entre cuentas) — preservar.
- Remueve el legacy `whatsapp-widget` si cargó (:4345, compat dual).

### 2.6 Vehicle cards + contexto
- `openWithVehicleContext(opts)` (:4368) — abre el chat con contexto del vehículo (deep-link). `.cnc-vcard-*` (título **#2** del backlog, `concierge.css:1416`).

### 2.7 DOM IDs vivos (no renombrar — §3.2): `cncMessages`, `cncTypingIndicator`, `cncStatus`, `cncQueueBanner`, `cncSLAWarning`, `cncSLABreach`, `cncAsesorTypingIndicator` + FAB/panel auto-inyectados.

---

## 3. CONTRATOS del ALTOR Hub admin (`admin-concierge.js`)

### 3.1 RBAC (preservar gates)
`concierge.read` / `.respond` / `.claim` / `.delete` + `*` super (:22–26, vía `AP.hasPermission`).

### 3.2 Features (cada una = subsistema con estado observable → caza-bugs en Fase D)
- **Claim / responder / borrar** chats (RBAC-gated).
- **Transferir** entre asesores: `openTransferModal` (:406) → `renderTransferList` (:452) → `executeTransfer(toUid,toName)` (:493). DOM `.cnc-transfer-*`.
- **Notas internas**: `subscribeToNotes` (:305), `sendInternalNote` (:336), `toggleInternalNoteMode` (:367) → `conciergeChats/{id}/notes`.
- **Typing bidireccional**: admin typing (`setAdminTyping` :93, delegación :134), listener del cliente (`startAdminTypingListener` :146), indicador (:205).
- **Read receipts**: `markAdminRead` (:240), intervalo (:258/265), `effectiveStatusForAsesorMsg` (:277, ✓/✓✓).
- **Presencia "atendiendo"**: `startAttendingPresenceListener` (:563).

### 3.3 DOM estáticos en `admin.html`: `#sec-concierge`, `#conciergeFilterBar` (:1469), `#conciergeChatList` (:1470), `#conciergeChatDetail` (:1478), `#cncAdminMessages`, `#cncAdminTypingIndicator`.

---

## 4. Contratos de DATOS (Firestore) — compartidos v1↔v2
- `conciergeChats/{sessionId}` + subcols `messages`, `notes`.
- `solicitudes/{leadId}` — leads (captura). CREATE abierto a guest; UPDATE solo-admin.
- `knowledgeBase`, `unmatchedQueries` (bot KB / queries sin match).
- `marketingOptIn{email,whatsapp,sms}` en lead/cliente (opt-in granular).

---

## 5. Inventario de DEFECTOS (de `altor-hub-rediseno-defectos.md`, cazados live 2026-06-23)

| # | Sev | Superficie | Estado | Resolución en v2 |
|---|---|---|---|---|
| #1 | 🔴 | SLA banner warning vertical/scroll-trap | ✅ fix `fe60fc6` (column siempre) | re-validar live; en v2 nace bien |
| #2 | ✅ | vcard título truncado | ✅ fix (clamp 2 líneas) | re-validar live |
| #3 | 🟡 | "Cerrar sesión" atenuado + 2 clics | abierto (race `auth.js:1355`) | delegación de eventos estable |
| #4 | 🟡 | z-index: widget tapa dropdown cuenta (`.cnc-panel` 9999 > `.hdr-user-dropdown` 9000) | abierto (cross-component) | resolver coordinando stacking en v2 |
| #5 | 🟢 | Hero contador flicker +90→+27 | abierto | arrancar en valor real/placeholder |
| #6 | 🟡 | "Finalizar conversación" usa `window.confirm()` nativo | abierto | **modal in-app** (premium) |
| C#1 | 🟠 | bot no surface inventario inline (rebota a catálogo) | abierto (LLM off) | v2: `search_inventory` → tarjetas; mientras, links FILTRADOS |

---

## 6. Funciones NUEVAS propuestas (borrador para aprobación del dueño — Fase B)
> El dueño pidió "más funciones". Propuesta inicial (se ajusta con su input):
- **Bot**: inventario inline (tarjetas dentro del chat), comparador rápido, agendar cita con date-picker in-app (no fechas duplicadas F#1), adjuntar/recibir fotos, estado del lead visible, quick-replies más ricos, modo oscuro/claro, accesibilidad teclado completa, animaciones de entrada premium, persistencia "continuar conversación".
- **Hub admin**: vista kanban/cola por SLA, búsqueda + filtros de chats, plantillas de respuesta rápidas, métricas inline por asesor, notas con menciones, atajos de teclado, indicadores de carga por asesor, historial unificado del cliente (lead + chats + cotizaciones).

---

## 7. Decisiones abiertas para el dueño (gate de Fase B/C)
1. **Funciones nuevas**: ¿confirma/ajusta la lista §6? ¿alguna imprescindible/excluida?
2. **Auditoría live nueva**: ¿basta el backlog §5 (ya cazado 2026-06-23) para arrancar el diseño, o quiere otra pasada del validador antes?
3. **Dirección visual**: dark premium dorado `#b89658` + Manrope/Instrument Serif/Cardo (marca) — ¿se mantiene o explora variantes?
4. **Hub (Fase F)**: ¿rediseño in-situ en `admin.html` o migración al `admin-app/` (Vite)? (Decisión Fuerte, se decide en su fase.)

## Herramientas de diseño conectadas (verificado este turno)
- ✅ **stitch** (design system + pantallas) · ✅ **visualize / show_widget** (mockups inline). figma: opcional.
