# 🩺 05 — ESTADO GLOBAL (Heartbeat · Snapshot de salud del sistema)

> **Nodo: signos vitales.** AUTO-CARGA (con `CLAUDE.md` + `10`). Tablero, no bitácora: solo señales
> ACTUALES (pisar, no apilar); lo histórico vive en `99` (ADR). Tope ~25 líneas / ~2.8k chars (§G.5).

| Señal | Valor (última actualización: **2026-07-03**) |
|---|---|
| **Build** | 🟢 `main`==`dev` `767ea179`: **PLAN MAESTRO Fable = SSoT** (`specs/2026-07-03-…fable5.md`). **OLA 0 ✅ (§267) + OLA 1 CÓDIGO ✅ (§268+§269)** — skeletons top-5 · combobox typeahead · onboarding 1ª venta · cola offline-rechazos (suite 347/347 sin tocar rules). **OLA 1 ✅ · OLA 2: 2.1-2.4 ✅ + CSV-fix es-CO + PURGA CRM ✅ (§270.9-.10) → SIGUE 2.5+2.6.** Fable ≤07-jul (luego Opus). Dueño: borrar `vehiculos/47` ZZZ (1 clic, estrena undo) · pestañas frescas · saldo bot. |
| **Cache version vigente** | **`v20260704000121`** (cron-CI 04/07 `c3adb348`, mergeado receta L-02; el cron es DUEÑO del bump → NO bump manual en rama; Ctrl+Shift+R). SW == cache-manager ✅. |
| **Branch activa** | 🟢 **Rama ÚNICA `dev`** (§231): **commit+push+merge `dev`→`main` = Claude** (dueño delegó el merge 27/06, §2); sync al arrancar. Deploys firebase=Claude (§1). |
| **Producción (`main`+functions)** | Portal CRM v2: Pipeline v3 + Post-venta · SLA+rotación · calendario · CRUD · daily/hourly jobs · 23 functions CRM (**retry ×6** + reprocesador DLQ F-5) · Rules E5 LIVE. App Check MONITOR (enforce DIFERIDO — riesgo lead-block + tráfico bajo, §41). |

## ⚠️ Flags de riesgo activos
- 🧠 **Fiabilidad cerebro: M-22 mecanizada ✅** (check #16 ×4). **Lección NUEVA M-25 (29/06):** el cerebro pierde memoria cuando un hecho vive en registros que se CONTRADICEN → alinear TODOS al cambiar (SSoT). Resta: adopción `verificado-vivo:` (TODO-44).
- 🤖 **Modelo: impl = Opus 4.8**; **revisión Fable 5 ✅ 03/07** (plan maestro + claims stale corregidos). Tag `⟦OPUS-4.8⟧` para impl.
- 🔒 **Blindaje** (canónico → `41-SEGURIDAD §Runbook`): SEC-03/04 LIVE ✅ · App Check monitor · **§219 RBAC + dataScope P0-SEC LIVE ✅ (29/06)** · Legal `42` (gate abogado, F14/E3).
- 🔴 **Billing GCP cayó ~2h el 09/06** (recuperado, L-38; causa SIN identificar → puede repetirse).
- 📊 App Check: 403 reCAPTCHA al bot del E2E = esperado (monitor OK); gate de enforce con tráfico humano → `41`.
- ⚖️ Texto legal PÚBLICO supresión/privacidad = gate P4 (abogado, `42-LEGAL`); mecanismo F14 ya live.
- cron↔cache = patrón conocido (L-02, hija `31`).

## 🧩 Sub-sistemas (resumen)
`js/` modular ✅ · CRM canónico LIVE ✅. **🧭 FOCO = TODO-52 (EPIC #1) vía PLAN MAESTRO 03/07**: P0-SEC/owner-delete/dark-only/confirm ✅ deployed; emoji→SVG **solo nav** (resto → Ola 1.6); friendlyError **parcial** (13+ crudos → Ola 1.4). Multi-tenancy DESCARTADA. Bot (#917) DORMIENTE.
