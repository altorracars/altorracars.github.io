# 🧭 F-4 (3/3) — ALTOR Hub → admin-app (KICKOFF) ⟦OPUS-4.8⟧

> **Para la sesión fresca que arranque el Hub.** El Hub es EL GIGANTE de F-4
> (`js/admin/admin-concierge.js`, **2979 líneas**) — no se ataca de una; se
> DESCOMPONE. Este spec es el runway (estado + arquitectura + plan incremental),
> NO el diseño final (eso lo hace la sesión leyendo la fuente). Decisión de
> destino YA tomada y verificada por Gemini (§237 §9: Hub→admin-app, no sandbox).

## §0 — Estado al arrancar (verificado 2026-06-26)
- **F-4 (1/3) `unmatched` ✅** (§247) · **F-4 (2/3) `cerebro`/KB ✅** (§248, con handoff `unmatched`→FAQ). Falta SOLO el Hub para cerrar F-4.
- **F-0.5 LISTO** (prerrequisito del Hub): `admin-app/src/core/firebase.js` ya exporta `rtdb` (`getDatabase`) + usa `persistentMultipleTabManager`. Los sockets de presence/typing NO fallarán en silencio.
- **RBAC LISTO**: `admin-app/src/domain/rbac-catalog.js` ya tiene los 8 perms `concierge.*` (read/respond/claim/transfer/close/reopen/delete/summarize, cat. "Comunicaciones"). Verificar que `firestore.rules` cubra `conciergeChats`/`messages`/`notes` con esos perms ANTES de escribir mutaciones (no asumir — §3.3).
- **dist GATEADO** (§237.6): F-4 entero (incl. Hub) sale en el batch de staging tras E2E. Commits source-only, NO rebuild de `admin-app/dist/` (L-53).

## §1 — Qué es el Hub (fuente: `js/admin/admin-concierge.js` 2979L + `admin-presence-ui.js`)
Consola de chat asesor↔cliente. **Colecciones Firestore**: `conciergeChats` (el chat: estado/owner/cliente/última actividad), `messages` (subcol del chat), `notes` (notas internas del asesor). **RTDB**: `/typing/{sessionId}` (indicador "escribiendo…") + `/presence` (asesores en línea). **API vieja**: `window.AltorraAdminConcierge` (global — el portal nuevo NO usa globals; reemplazar por imports/store, patrón §248 handoff).

**Features a preservar (paridad, del grep de estructura)**: filter bar + colas, lista de chats (`renderChatList`), detalle del chat (`renderChatDetail`: mensajes + enviar), **claim** (tomar chat, `claimChat`), **transfer** (`renderTransferList`), **notes** internas, **typing** (RTDB), **presence** (RTDB), close/reopen, smart suggestions (`renderSmartSuggestions`), **LLM summary** (`renderLLMSummary`/`summarize`).

## §2 — Arquitectura propuesta (a validar leyendo la fuente)
Módulo `admin-app/src/modules/hub/` siguiendo el patrón modular (data+ui+styles, registro router/main/shell). Consola de **3 zonas**: (col izq) lista de chats + filtros/colas · (centro) detalle del chat (mensajes + caja de envío + typing) · (col der/acciones) claim/transfer/notes/estado. Realtime acotado (`onSnapshot`+limit+unsubscribe, P4/§15.R3) + RTDB para typing/presence. Optimistic UI universal (§3.6).

**Por su tamaño, sub-incrementos sugeridos (strangler intra-fase, como §247→§248):**
- **(3a)** Esqueleto + lista de chats (read-only) + detalle con mensajes (read) + presence. *El visor primero (menor riesgo, patrón `auditoria`/`inbox`).*
- **(3b)** Enviar mensaje (`concierge.respond`) + typing (RTDB) + optimistic.
- **(3c)** Claim / transfer / close / reopen / notes (las mutaciones de gestión, gateadas por sus perms).
- **(3d)** Smart suggestions + **LLM summary = DIFERIR** (atado al bot LLM dormido, saldo-gated — igual que el brain config de §248). Surface el botón pero degrada hasta que el LLM esté activo.

## §3 — Riesgos / gotchas conocidos
- **RTDB rules**: verificar que las reglas de Realtime DB permitan al app `altorra-crm` leer/escribir `/typing` y `/presence` (es app namespaced distinta; mismo projectId). Si no, los sockets fallan silenciosos.
- **Doble presence**: el Hub viejo (`admin.html`) y el nuevo correrían en paralelo → dos fuentes de presence del mismo asesor durante el run-paralelo. Decidir si convive o se gatea.
- **NO portar la lógica del BOT** (respuestas automáticas del concierge) — eso es el widget público (F-1). El Hub admin solo gestiona conversaciones humanas.
- **Payload retro-compatible** con el `admin-concierge.js` viejo mientras ambos coexisten (§237 §9.B.3).
- Cuarentena del viejo (`_legacy/`) recién en F-6 (cutover), NO al portar.

## §4 — Cierre de F-4 y qué sigue
Al terminar el Hub: **F-4 COMPLETO** → el gap §2.B (Comunicaciones) cerrado → sigue **F-5** (cierre de fugas: dedup `session:ID` para chats anónimos + reprocesador DLQ `failedIngestions`) → **F-6** cutover PWA-safe (unregister SW viejos + bridge auth + `admin.html`→`_legacy/`). Detalle del camino: spec `2026-06-24-PLAN-UNIFICADO-un-solo-panel-admin.md` §9.C.

## Checklist (la sesión del Hub la tickea con evidencia)
- [x] Leída la fuente `admin-concierge.js` (read-path: chats/messages/presence + renderChatDetail). `admin-presence-ui.js` NO requerido para 3a (presence read salió de `startAttendingPresenceListener`/`onAttendingPresenceSnapshot`).
- [x] Verificadas las RTDB rules para `/typing` y `/presence`: `database.rules.json` → `.read = "auth != null"` (clave en `auth.uid`, NO en nombre de app → la app `altorra-crm` lee). Riesgo §3 RESUELTO.
- [x] **(3a) Lista de chats + filtros/colas + detalle (read) + presence — verificado `?mock=1`** (lista+counts, header/radicado/meta, banners closed/claimed/attending, burbujas user/bot/asesor/system, responsive mobile 1-pane+back / desktop 2-pane, accent+dark). 0 errores de módulo.
- [x] **(3b) claim (tomar) + responder + typing — verif `?mock=1`**. RE-SCOPE (autorizado por §2: el diseño lo fija la sesión leyendo la fuente): **claim entra en 3b**, NO en 3c — el viejo gatea responder tras claim (§26.4 "Claiming Estricto"), así que son un solo lazo. Incluye: claim optimista (pre-check server + `runTransaction` + rollback + system-msg "X tomó"), composer con envío optimista (⏱/✓/✓✓/retry), typing asesor↔cliente (RTDB), `markChatRead` al abrir. Verificado: sin-asignar→claim→composer→send✓, closed/locked. Realtime (typing, fallo→retry) = live-only.
- [ ] (3c) transfer / close / reopen / super-release / notes (claim YA hecho en 3b)
- [ ] (3d) Smart suggestions (LLM summary diferido)
- [x] Wiring router/shell/main + RBAC `concierge.read` gateado como `firestore.rules:937` (no se pintan acciones que el server rechazaría). NAV "ALTOR Hub" 1º del grupo Comunicaciones.
- [x] dist NO reconstruido (source-only, L-53/§237.6). [ ] ADR §249 (al cerrar F-4 completo, 3a-3d) + índice + 05/10/20.
