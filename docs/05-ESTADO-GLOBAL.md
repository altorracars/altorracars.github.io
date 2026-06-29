# 🩺 05 — ESTADO GLOBAL (Heartbeat · Snapshot de salud del sistema)

> **Nodo: signos vitales.** AUTO-CARGA (con `CLAUDE.md` + `10`). Tablero, no bitácora: solo señales
> ACTUALES (pisar, no apilar); lo histórico vive en `99` (ADR). Tope ~25 líneas / ~2.8k chars (§G.5).

| Señal | Valor (última actualización: **2026-06-27**) |
|---|---|
| **Build** | 🟢 `main`==`dev`: PLAN UNIFICADO COMPLETO (§238-256) — portal único `admin-app/` LIVE, `admin.html`→`_legacy/`+redirect; F-6 cutover ✅ (§253-256). **Aliados TODO-25/§259 ✅ VALIDADO LIVE 29/06** (venta prueba: comisión MANUAL $0→$1.25M; snapshot OK). **Queda (dueño)**: limpiar `ZZZ PRUEBA` (deal+veh.47) · FCM · dead-code (~3-jul). **EN CURSO**: frontend (W-11); bot LLM=saldo. |
| **Cache version vigente** | **`v20260629000408`** (cron-CI 29/06; el cron es DUEÑO del bump → NO bump manual en rama, evita L-02/L-03; Ctrl+Shift+R). SW == cache-manager ✅. |
| **Branch activa** | 🟢 **Rama ÚNICA `dev`** (§231): **commit+push+merge `dev`→`main` = Claude** (dueño delegó el merge 27/06, §2); sync al arrancar. Deploys firebase=Claude (§1). |
| **Producción (`main`+functions)** | Portal CRM v2: Pipeline v3 + Post-venta · SLA+rotación · calendario · CRUD · daily/hourly jobs · 23 functions CRM (**retry ×6** + reprocesador DLQ F-5) · Rules E5 LIVE. App Check MONITOR (enforce DIFERIDO — riesgo lead-block + tráfico bajo, §41). |

## ⚠️ Flags de riesgo activos
- 🧠 **Fiabilidad del cerebro: auditoría ✅ (§257) + cura M-22 MECANIZADA** — check #16 (`verificado-vivo`/stale) en kernel, **propagado+commiteado byte-idéntico ×4 ✅** (26/06, sha `4905D566`). Brechas §257: aliados/TODO-25, motor-automatización no corre TODO-41↑, menores TODO-45. Resta: adopción de marcadores + reconciliación exhaustiva (TODO-44).
- 🤖 **Modelo: Opus 4.8** (Fable 5 NO disponible, 2026-06-12). Entregas marcadas **`⟦OPUS-4.8 · rev-Fable⟧`** (rev. cuando Fable vuelva). Detalle → `10` + memoria.
- 🔒 **Blindaje** (canónico → `41-SEGURIDAD §Runbook`): SEC-03/04 LIVE ✅ · App Check monitor · SEC-01 RBAC-read pend (→E5) · Legal `42` (gate abogado, F14/E3).
- 🔴 **Billing GCP cayó ~2h el 2026-06-09** (recuperado, L-38). **Causa SIN identificar** (cliente: console.cloud.google.com/billing) o se repetirá.
- 📊 App Check: 403 reCAPTCHA al bot del E2E = esperado (monitor OK); gate de enforce con tráfico humano → `41`.
- ⚖️ Texto legal PÚBLICO supresión/privacidad = gate P4 (abogado, `42-LEGAL`); mecanismo F14 ya live.
- cron↔cache = patrón conocido (L-02, hija `31`).

## 🧩 Sub-sistemas (resumen)
`js/` modular ✅ · CRM canónico (`contacts/leads/activities/deals`) LIVE ✅. **🧭 FOCO = TODO-52 CRM Overhaul ⟦OPUS⟧ (EPIC #1)**: PASE-1 (layout `.outlet`/dark/null/copy) + owner-delete (Aliados/Pipeline) + diálogos premium 16/16 + `errors.js` = **LIVE en main 29/06**. Multi-tenancy DESCARTADA (CRM por empresa). Sigue: backend-seguridad (privesc+dataScope) + P1 + Fase C. SSoT → brief `…crm-overhaul…` + `10`. Bot LLM (#917) DORMIENTE (saldo).
