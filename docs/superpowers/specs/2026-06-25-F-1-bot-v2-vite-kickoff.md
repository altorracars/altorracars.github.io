# F-1 — Bot widget público v2 en Vite · SPEC DE ARRANQUE (kickoff) ⟦OPUS-4.8 · rev-Fable⟧

> **Track del PLAN UNIFICADO (§237 §9.C).** Continúa TODO-38/§236 (Fase D→E) y TODO-34 (LLM).
> F-1 es **paralelo, público, NO bloquea la unificación** (el camino crítico del monolito es F-3→F-4→F-6).
> Este spec es el ARRANQUE: decisión de arquitectura + secuencia + triaje de defectos + frontera de dinero.
> El BUILD pesado se ejecuta en sesión fresca (lógica compleja, §G.2 relevo). Spec-kit puede formalizarlo.

## 0. Estado VERIFICADO (2026-06-25)
- **v1 LIVE en público** = `js/concierge/concierge.js` (monolito no-bundler). Es lo que ve el cliente HOY.
- **Widget v2** = `js/concierge/v2/altor-bot.js` (430L): Web Component `<altor-bot>` + `window.AltorBotV2`, hookea `window.AltorraDualCore.respond`. **STANDALONE — NO cableado al sitio** (solo lo carga su `_demo.html`). "Tramos 1-2 live" = live en el DEMO, no en prod.
- **Motor LLM v2** (Tool Calling) = vive en `concierge.js` (~L4196, ramp `engine:'v2'`), **DORMIDO** (flip = saldo Anthropic, #917).
- Build-system: §9.B.5 SUPERSEDE el "no-bundler" → **bot v2 se construye en Vite emitiendo un IIFE** embebible en el público legacy.

## 1. Objetivo (plan línea 49)
Terminar el bot v2 detrás del flag, con **paridad v1**: captura real · SLA · WhatsApp · Firestore · vehicle-cards · modal de cierre · command-queue · **API global idéntica**. **Free Core (botones) ships SIN saldo LLM.** Payload **retro-compatible con `admin-concierge.js`** durante la transición.

## 2. Decisión de arquitectura — build Vite→IIFE (recomendada)
- **Entry/lib build propio** para el bot público (sibling de `admin-app/`, NO el mismo bundle): Vite en **library mode** → **un IIFE** (+ CSS) versionado por hash. Mantiene el Web Component (`<altor-bot>` + Shadow DOM) como unidad de encapsulamiento.
- **Embebido**: el público legacy carga el IIFE por `<script>` detrás del **flag de widget v2** (el mismo cohorte/flag que ya gobierna v1↔v2; verificar wiring exacto en `concierge.js` en F-1.a — NO asumir). v1 sigue vivo para el resto.
- **Contrato**: el IIFE expone la **API global idéntica** a v1 (mismos hooks `window.*` que usa el sitio) → swap sin tocar callsites. Estado/typing/transfer del Hub viajan en **payload retro-compatible** con `admin-concierge.js`.
- **Anti-deuda**: alinea con TODO-01 (whole-site Vite) + política anti-monolito. Cache: Vite hashea (sin ritual §4 para este bundle).

## 3. Sub-secuencia
- **F-1.a — Build Vite-IIFE + wiring tras flag** (arquitectura; verificar el flag/cohorte real en `concierge.js`; v1 intacto). Sin saldo. Verif: build OK + el widget v2 carga en una página pública tras el flag, v1 sin regresión.
- **F-1.b — Features a paridad v1**: captura real (gate takeover) · SLA+rotación · WhatsApp trazable · escritura Firestore (`solicitudes`/canónico, retro-compat) · vehicle-cards · modal de cierre · command-queue · API global. Sin saldo.
- **F-1.c — Bloque de defectos vivos** (los del widget; ver §4). Sin saldo.
- **F-1.d — LLM-enable** = **GATE DE DINERO (decisión del dueño)**: flip del cohorte v2 (Tool Calling + `search_inventory`) → desbloquea C#1/C#3/C#4 (lenguaje natural + recomendación por presupuesto). Saldo Anthropic. NO arrancar sin go del dueño.
- **Cierre**: E2E "cero fugas" en STAGING (F-0.5/TODO-30 Doble-Llave) antes de prod; dueño autoriza.

## 4. Triaje de defectos vivos (`docs/altor-hub-rediseno-defectos.md`)
| Def | Sev | Dónde cae | Nota |
|---|---|---|---|
| #1 SLA banner vertical | 🔴 | F-1.c (re-valid) | fix v1 aplicado `fe60fc6`; v2 hereda el layout correcto |
| #2 vcard título | ✅ | — | resuelto |
| #3 "Cerrar sesión" 2 clics | 🟡 | **NO F-1** (header/`auth.js`, no el bot) | fix de header, independiente |
| #4 z-index widget↔dropdown | 🟡 | **F-4** (cross-component Hub) | diferido por el propio doc |
| #5 hero "+90→+27" flicker | 🟢 | **NO F-1** (hero, no el bot) | fix de la home |
| #6 `window.confirm` al finalizar | 🟡 | **F-1.b/c** | → modal in-app (parte del widget v2) |
| #7 gate no-takeover | 🔴 | F-1.b (v2 nativo) | fix v1 aplicado; v2 lo hace como overlay nativo (tramo 3) |
| C#1 no surface inventario | 🟠 | **F-1.d (LLM)** | needs `search_inventory` tool |
| C#2 doble pregunta nombre | 🟠 | F-1.b | una sola vía: nombre solo en el gate |
| C#3/C#4 no entiende NL | 🟠 | **F-1.d (LLM)** | límite del Free Core, NO bug v1; cierra con LLM-on |

## 5. No-regresión / riesgos
- v1 permanece LIVE detrás del flag hasta el cutover → cero riesgo al usuario durante F-1.
- Verificar el wiring del flag ANTES de tocar (no asumir el cohorte) — caza-bugs camino vivo.
- Dist/build del bot NO se mezcla con admin-app; sale por su propio pipeline (staging primero).
- Cero-demo en cualquier dato; cero PII fuera de los docs privados.

## 6. Gates del dueño (NO los decide Claude)
1. **F-1.d LLM-enable** = saldo Anthropic (dinero).
2. **Ir a prod** = E2E staging verde + autorización (TODO-30 Doble-Llave).

## Checklist
- [ ] F-1.a build Vite-IIFE + wiring tras flag (v1 intacto) — _evidencia: build OK + carga tras flag_
- [ ] F-1.b features a paridad v1 (captura/SLA/WhatsApp/Firestore/vcards/modal/queue/API)
- [ ] F-1.c bloque de defectos del widget (#1 re-valid · #6 · #7 v2 · C#2)
- [ ] F-1.d LLM-enable — **GATE dueño (saldo)**
- [ ] E2E staging "cero fugas" + autorización prod — **GATE dueño**
