# 🩺 05 — ESTADO GLOBAL (Heartbeat · Snapshot de salud del sistema)

> **Nodo: signos vitales.** AUTO-CARGA (con `CLAUDE.md` + `10`). Tablero, no bitácora: solo señales
> ACTUALES (pisar, no apilar); lo histórico vive en `99` (ADR). Tope ~25 líneas / ~2.8k chars (§G.5).

| Señal | Valor (última actualización: **2026-07-23**) |
|---|---|
| **Build** | ⏸️ **CARS EN PAUSA (pivote §302): prioridad #1 = INMOBILIARIA**, que **LIDERA el cerebro ×4** (traspaso ejecutado 18/07; kernel Cerebro-v2 se CONSUME de su canónico vía `brain:pull`). Kickoff → **`specs/2026-07-10-INMOBILIARIA-KICKOFF-fable5.md`**. Último estado cars: 🟢 código @ `5e8c4762`; perf-v2 Ola 1 LIVE (§298: ord 95 · móvil 57 · LCP 662ms); dev==main sync 23/07 (§303). **Reanudar = caminos A/B/C (§298.7 y `10`)**; gates dueño aparcados (§283-298); Cloudflare 🚫 solo-cars. |
| **Cache version vigente** | **`v20260724020458`** (cron-CI `7f2c03c2`; sync L-02 al fusionar — cron DUEÑO del bump, NO bump manual en rama; Ctrl+Shift+R). SW == cache-manager ✅. |
| **Branch activa** | 🟢 **Rama ÚNICA `dev`** (§231): **commit+push+merge `dev`→`main` = Claude** (dueño delegó el merge 27/06, §2); sync al arrancar. Deploys firebase=Claude (§1). |
| **Producción (`main`+functions)** | Portal CRM v2: Pipeline v3 + Post-venta · SLA+rotación · calendario · CRUD · daily/hourly jobs · 23 functions CRM (**retry ×6** + reprocesador DLQ F-5) · Rules E5 LIVE. App Check MONITOR (enforce DIFERIDO — riesgo lead-block + tráfico bajo, §41). |

## ⚠️ Flags de riesgo activos
- 🧠 **Fiabilidad cerebro: M-22 mecanizada ✅** (check #16 ×4). **Lección NUEVA M-25 (29/06):** el cerebro pierde memoria cuando un hecho vive en registros que se CONTRADICEN → alinear TODOS al cambiar (SSoT). Resta: adopción `verificado-vivo:` (TODO-44).
- 🤖 **Modelo: impl = Opus 4.8**; revisión Fable 5 ✅ 03/07. Tag `⟦OPUS-4.8⟧`. **Protocolo §300: dueño dice "Fable 5 activo" → OFRECER auditoría de lo hecho por Opus** (bugs/errores/mejoras). Interinato sin titular → skill `opus-interino-protocolo`.
- 🔒 **Blindaje** (canónico → `41-SEGURIDAD §Runbook`): SEC-03/04 LIVE ✅ · App Check monitor · **§219 RBAC + dataScope P0-SEC LIVE ✅ (29/06)** · **SSG anti-XSS selftest = gate CI ✅ (§290)** · Legal `42` (gate abogado, F14/E3).
- 🔴 **Billing GCP cayó ~2h el 09/06** (recuperado, L-38; causa SIN identificar → puede repetirse).
- 📊 App Check: 403 reCAPTCHA al bot del E2E = esperado (monitor OK); gate de enforce con tráfico humano → `41`.
- ⚖️ Texto legal PÚBLICO supresión/privacidad = gate P4 (abogado, `42-LEGAL`); mecanismo F14 ya live.
- cron↔cache = patrón conocido (L-02, hija `31`).

## 🧩 Sub-sistemas (resumen)
`js/` modular ✅ · CRM canónico LIVE ✅ · **🧭 FOCO GLOBAL = INMOBILIARIA (§302)**; TODOs de cars pausados (no cerrados). Multi-tenancy DESCARTADA. Bot DORMIENTE.
