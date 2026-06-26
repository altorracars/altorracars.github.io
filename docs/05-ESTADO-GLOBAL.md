# 🩺 05 — ESTADO GLOBAL (Heartbeat · Snapshot de salud del sistema)

> **Nodo: signos vitales.** AUTO-CARGA (con `CLAUDE.md` + `10`). Tablero, no bitácora: solo señales
> ACTUALES (pisar, no apilar); lo histórico vive en `99` (ADR). Tope ~25 líneas / ~2.8k chars (§G.5).

| Señal | Valor (última actualización: **2026-06-26**) |
|---|---|
| **Build** | 🟢 `main`==`dev`: **PLAN UNIFICADO COMPLETO** (§238-256) — portal único `admin-app/` LIVE, `admin.html` retirado→`_legacy/`+redirect (FLIP §255). **F-6 cutover ✅ + VALIDADO LIVE** (§253-256): perfil + Hub + 3 bugs Hub (ciclo-de-vida) validados E2E live. §252 gate verificado. MFA diferido=TODO-43. **CRM clean-slate ✅ 26/06** (206 docs prueba purgados, L-53). **Queda (dueño)**: validación celular FCM · dead-code (~3-jul). **EN CURSO**: (A) rediseño frontend (W-11). (B) bot LLM = bloqueado por saldo. |
| **Cache version vigente** | **`v20260625033233`** (cron-CI 25/06; el cron es DUEÑO del bump → NO bump manual en rama, evita L-02/L-03; Ctrl+Shift+R). SW == cache-manager ✅. |
| **Branch activa** | 🟢 **Rama ÚNICA `dev`** (§231): commit+push=Claude; **merge `dev`→`main`=dueño web** (§2); sync al arrancar. Deploys firebase=Claude (§1). |
| **Producción (`main`+functions)** | Portal CRM v2: Pipeline v3 + Post-venta · SLA+rotación · calendario · CRUD · daily/hourly jobs · 23 functions CRM (**retry ×6** + reprocesador DLQ F-5) · Rules E5 LIVE. App Check MONITOR (enforce DIFERIDO — riesgo lead-block + tráfico bajo, §41). |

## ⚠️ Flags de riesgo activos
- 🧠 **Fiabilidad del cerebro: auditoría ✅ (§257) + cura M-22 MECANIZADA** — check #16 (`verificado-vivo`/stale) en kernel, **propagado byte-idéntico ×4** (26/06; insema commit pend por issues suyos). Brechas §257: aliados/TODO-25, motor-automatización no corre TODO-41↑, menores TODO-45. Resta: adopción de marcadores + reconciliación exhaustiva (TODO-44).
- 🤖 **Modelo: Opus 4.8** (Fable 5 NO disponible, 2026-06-12). Entregas marcadas **`⟦OPUS-4.8 · rev-Fable⟧`** (rev. cuando Fable vuelva). Detalle → `10` + memoria.
- 🔒 **Blindaje** (canónico → `41-SEGURIDAD §Runbook`): SEC-03/04 LIVE ✅ · App Check monitor · SEC-01 RBAC-read pend (→E5) · Legal `42` (gate abogado, F14/E3).
- 🔴 **Billing GCP cayó ~2h el 2026-06-09** (recuperado, L-38). **Causa SIN identificar** (cliente: console.cloud.google.com/billing) o se repetirá.
- 📊 App Check: 403 reCAPTCHA al bot del E2E = esperado (monitor OK); gate de enforce con tráfico humano → `41`.
- ⚖️ Texto legal PÚBLICO supresión/privacidad = gate P4 (abogado, `42-LEGAL`); mecanismo F14 ya live.
- cron↔cache = patrón conocido (L-02, hija `31`).

## 🧩 Sub-sistemas (resumen)
`js/` modular ✅ · cerebro autónomo v6 ✅ · CRM canónico (`contacts/leads/activities/deals` + 6 canales) LIVE ✅. **🧭 FOCO MAESTRO = PLAN UNIFICADO (§237)**: portal único `admin-app/` (Vite) absorbe todo + apaga `admin.html`; **F-2 COMPLETO → sigue F-1** (bot v2). Bot LLM (#917) DEPLOYED **DORMIENTE** (saldo Anthropic = al final). F4/F5 §236 en `dev` pend merge+cron-bump. Detalle → `10`.
