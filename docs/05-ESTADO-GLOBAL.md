# 🩺 05 — ESTADO GLOBAL (Heartbeat · Snapshot de salud del sistema)

> **Nodo: signos vitales.** AUTO-CARGA (con `CLAUDE.md` + `10`). Tablero, no bitácora: solo señales
> ACTUALES (pisar, no apilar); lo histórico vive en `99` (ADR). Tope ~25 líneas / ~2.8k chars (§G.5).

| Señal | Valor (última actualización: **2026-06-29**) |
|---|---|
| **Build** | 🟢 `main`==`dev`: PLAN UNIFICADO COMPLETO (§238-256) — portal único `admin-app/` LIVE, `admin.html`→`_legacy/`+redirect; F-6 cutover ✅ (§253-256). **Aliados TODO-25/§259 ✅ VALIDADO LIVE 29/06** (venta prueba: comisión MANUAL $0→$1.25M; snapshot OK). **Queda (dueño)**: limpiar `ZZZ PRUEBA` (deal+veh.47) · FCM · dead-code (~3-jul). **EN CURSO (29/06)**: EPIC TODO-52 — seguridad+func COMPLETA; resta PULIDO premium (emoji/voseo/Fase C). Bot LLM=saldo. |
| **Cache version vigente** | **`v20260629154551`** (cron-CI 29/06; el cron es DUEÑO del bump → NO bump manual en rama, evita L-02/L-03; Ctrl+Shift+R). SW == cache-manager ✅. |
| **Branch activa** | 🟢 **Rama ÚNICA `dev`** (§231): **commit+push+merge `dev`→`main` = Claude** (dueño delegó el merge 27/06, §2); sync al arrancar. Deploys firebase=Claude (§1). |
| **Producción (`main`+functions)** | Portal CRM v2: Pipeline v3 + Post-venta · SLA+rotación · calendario · CRUD · daily/hourly jobs · 23 functions CRM (**retry ×6** + reprocesador DLQ F-5) · Rules E5 LIVE. App Check MONITOR (enforce DIFERIDO — riesgo lead-block + tráfico bajo, §41). |

## ⚠️ Flags de riesgo activos
- 🧠 **Fiabilidad cerebro: M-22 mecanizada ✅** (check #16 ×4). **Lección NUEVA M-25 (29/06):** el cerebro pierde memoria cuando un hecho vive en registros que se CONTRADICEN → alinear TODOS al cambiar (SSoT). Resta: adopción `verificado-vivo:` (TODO-44).
- 🤖 **Modelo: Opus 4.8** (Fable 5 NO disponible, 2026-06-12). Entregas marcadas **`⟦OPUS-4.8 · rev-Fable⟧`** (rev. cuando Fable vuelva). Detalle → `10` + memoria.
- 🔒 **Blindaje** (canónico → `41-SEGURIDAD §Runbook`): SEC-03/04 LIVE ✅ · App Check monitor · **§219 RBAC + dataScope P0-SEC LIVE ✅ (29/06)** · Legal `42` (gate abogado, F14/E3).
- 🔴 **Billing GCP cayó ~2h el 09/06** (recuperado, L-38; causa SIN identificar → puede repetirse).
- 📊 App Check: 403 reCAPTCHA al bot del E2E = esperado (monitor OK); gate de enforce con tráfico humano → `41`.
- ⚖️ Texto legal PÚBLICO supresión/privacidad = gate P4 (abogado, `42-LEGAL`); mecanismo F14 ya live.
- cron↔cache = patrón conocido (L-02, hija `31`).

## 🧩 Sub-sistemas (resumen)
`js/` modular ✅ · CRM canónico (`contacts/leads/activities/deals`) LIVE ✅. **🧭 FOCO = TODO-52 CRM Overhaul ⟦OPUS⟧ (EPIC #1)**: **toda la SEGURIDAD + funcionalidad COMPLETA y DEPLOYED 29/06** (PASE-1 · §219 RBAC · dataScope · owner-delete · confirm 16/16 · errors.js · accent-OUT · Telegram · emoji→SVG botones). Multi-tenancy DESCARTADA. **Sigue (solo PULIDO premium):** emoji→SVG restante (pestañas/toggles/headers) + voseo→tú-Colombia + **Fase C** (mockups+design-system). SSoT → brief `…crm-overhaul…` + `10`. Bot LLM (#917) DORMIENTE (saldo).
