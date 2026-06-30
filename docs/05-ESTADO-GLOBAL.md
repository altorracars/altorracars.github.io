# 🩺 05 — ESTADO GLOBAL (Heartbeat · Snapshot de salud del sistema)

> **Nodo: signos vitales.** AUTO-CARGA (con `CLAUDE.md` + `10`). Tablero, no bitácora: solo señales
> ACTUALES (pisar, no apilar); lo histórico vive en `99` (ADR). Tope ~25 líneas / ~2.8k chars (§G.5).

| Señal | Valor (última actualización: **2026-06-29**) |
|---|---|
| **Build** | 🟢 `main`==`dev`: PLAN UNIFICADO COMPLETO (§238-256) — portal único `admin-app/` LIVE; F-6 cutover ✅. Aliados TODO-25/§259 VALIDADO LIVE ✅ 29/06. **Queda (dueño)**: `ZZZ PRUEBA` (deal+veh.47) · FCM · dead-code (~3-jul). **EN CURSO (29/06h-l)**: TODO-52 PULIDO — **16 módulos** emoji→SVG ✅ +voseo; resta restantes(cms/backup/capture/agenda/contacts…)+iconos-dominio+Fase C. Bot=saldo. |
| **Cache version vigente** | **`v20260630005858`** (cron-CI 30/06; el cron es DUEÑO del bump → NO bump manual en rama, evita L-02/L-03; Ctrl+Shift+R). SW == cache-manager ✅. |
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
`js/` modular ✅ · CRM canónico (`contacts/leads/activities/deals`) LIVE ✅. **🧭 FOCO = TODO-52 CRM Overhaul ⟦OPUS⟧ (EPIC #1)**: SEGURIDAD + funcionalidad COMPLETA y DEPLOYED 29/06 (PASE-1·§219·dataScope·owner-delete·errors·accent-OUT·Telegram·emoji-botones). Multi-tenancy DESCARTADA. **Sigue (PULIDO):** emoji→SVG módulos restantes (cms/backup/capture/agenda/contacts…) + iconos-dominio (rating/nba/channel/audit) + **Fase C**. [16 módulos+voseo ✅ 29/06h-l]. SSoT → brief + `10`. Bot (#917) DORMIENTE.
