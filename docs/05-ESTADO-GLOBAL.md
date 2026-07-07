# 🩺 05 — ESTADO GLOBAL (Heartbeat · Snapshot de salud del sistema)

> **Nodo: signos vitales.** AUTO-CARGA (con `CLAUDE.md` + `10`). Tablero, no bitácora: solo señales
> ACTUALES (pisar, no apilar); lo histórico vive en `99` (ADR). Tope ~25 líneas / ~2.8k chars (§G.5).

| Señal | Valor (última actualización: **2026-07-07**) |
|---|---|
| **Build** | 🟢 `main`==`dev` (sync) · código @ `cd5e30b9` (los commits `docs(brain)` posteriores NO cambian el "build"): **PLAN MAESTRO = SSoT; 🤖 AHORA = OPUS 4.8 → arranque = §0+§0.b**. 🏁 **ARCO OLA 0-3 COMPLETO** (§267-§282; suite 374). **TODO-53:** P0.1/P1/P2/P3.1/P3.2 ✅ (§283-287; LCP hero 22.6s→720ms + vehículos SSG); NEXT resto P3. **Resta = gates dueño + OLA 4 estratégico/diferido + Directiva Permanente TODO-52 (pulir→top mundial).** Gates dueño: flip LLM #917 · MFA 2.9 · App Check 2.11 · cutover 2.12b · saldo/purga · validar-live (§274) · GSC §276.7. |
| **Cache version vigente** | **`v20260707073229`** (cron-CI `50a85817`, regen vehículos+marcas; el cron es DUEÑO del bump → NO bump manual en rama; Ctrl+Shift+R). SW == cache-manager ✅. |
| **Branch activa** | 🟢 **Rama ÚNICA `dev`** (§231): **commit+push+merge `dev`→`main` = Claude** (dueño delegó el merge 27/06, §2); sync al arrancar. Deploys firebase=Claude (§1). |
| **Producción (`main`+functions)** | Portal CRM v2: Pipeline v3 + Post-venta · SLA+rotación · calendario · CRUD · daily/hourly jobs · 23 functions CRM (**retry ×6** + reprocesador DLQ F-5) · Rules E5 LIVE. App Check MONITOR (enforce DIFERIDO — riesgo lead-block + tráfico bajo, §41). |

## ⚠️ Flags de riesgo activos
- 🧠 **Fiabilidad cerebro: M-22 mecanizada ✅** (check #16 ×4). **Lección NUEVA M-25 (29/06):** el cerebro pierde memoria cuando un hecho vive en registros que se CONTRADICEN → alinear TODOS al cambiar (SSoT). Resta: adopción `verificado-vivo:` (TODO-44).
- 🤖 **Modelo: impl = Opus 4.8**; **revisión Fable 5 ✅ 03/07** (plan maestro + claims stale corregidos). Tag `⟦OPUS-4.8⟧` para impl.
- 🔒 **Blindaje** (canónico → `41-SEGURIDAD §Runbook`): SEC-03/04 LIVE ✅ · App Check monitor · **§219 RBAC + dataScope P0-SEC LIVE ✅ (29/06)** · **SSG anti-XSS selftest = gate CI ✅ (§290)** · Legal `42` (gate abogado, F14/E3).
- 🔴 **Billing GCP cayó ~2h el 09/06** (recuperado, L-38; causa SIN identificar → puede repetirse).
- 📊 App Check: 403 reCAPTCHA al bot del E2E = esperado (monitor OK); gate de enforce con tráfico humano → `41`.
- ⚖️ Texto legal PÚBLICO supresión/privacidad = gate P4 (abogado, `42-LEGAL`); mecanismo F14 ya live.
- cron↔cache = patrón conocido (L-02, hija `31`).

## 🧩 Sub-sistemas (resumen)
`js/` modular ✅ · CRM canónico LIVE ✅. **🧭 FOCO = TODO-52 (EPIC #1) vía PLAN MAESTRO 03/07**: OLA 0-3.5 ✅ (§267-§280); resta **OLA 3.6** (bot pulido, gate saldo #917). Multi-tenancy DESCARTADA. Bot DORMIENTE.
