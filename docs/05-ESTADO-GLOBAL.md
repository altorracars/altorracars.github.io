# 🩺 05 — ESTADO GLOBAL (Heartbeat · Snapshot de salud del sistema)

> **Nodo: signos vitales.** AUTO-CARGA (con `CLAUDE.md` + `10`). Tablero, no bitácora: solo señales
> ACTUALES (pisar, no apilar); lo histórico vive en `99` (ADR). Tope ~25 líneas / ~2.8k chars (§G.5).

| Señal | Valor (última actualización: **2026-06-15**) |
|---|---|
| **Build** | 🟢 **CRM E6 cutover gates 6/6** (§209-§211 + merge L-02, en branch pend. push). Vender=Pipeline (financiero=TODO-25). **④ RBAC EN IMPLEMENTACIÓN**: §212 (rules) + §213 (CF) = dueño INAMOVIBLE enforced 3-capas **DEPLOYADO**; blueprint ④a en bóveda; **PASO 0 hecho → PASO 1-6 pendientes**. ④b (data-scoping) gateado por Gemini+negocio. Dealers F2 gated (TODO-25). |
| **Cache version vigente** | **`v20260618035745`** (= la del cron-CI; el cron es el DUEÑO del bump → ya NO bumpeo manual en la rama, evita el conflicto recurrente L-02/L-03; §211 se invalida en el próximo bump del cron ≤4h o con Ctrl+Shift+R). SW == cache-manager ✅. |
| **Branch activa** | `refactor/estructura` (HEAD `aa97c14`). **Hay commits de cerebro sin pushear** (el dueño pushea + PR a `main`); `main` = producción. Verificar vs git real antes de afirmar (§3.3). Deploys firebase = Claude (§1). |
| **Producción (`main`+functions)** | Portal CRM v2: Pipeline v3 + Post-venta · lead rápido offline · SLA+rotación · calendario único (§184) · CRUD/1581 (§185) · E4 (§186) · daily/hourly jobs · 22 functions CRM con **retry:true ×6** · Rules E5 LIVE (whitelists públicos + read estricto). App Check MONITOR (enforce ~16-23/06 → lóbulo `41`). |

## ⚠️ Flags de riesgo activos
- 🤖 **Modelo de trabajo: Opus 4.8** (Fable 5 NO disponible, 2026-06-12). Se continúa lo que Fable investigó/planeó; cada entrega de Opus se marca **`⟦OPUS-4.8 · rev-Fable⟧`** para revisión cuando Fable vuelva (el dueño avisará). Convención completa → `10` (foco) + memoria.
- 🔒 **Blindaje** (canónico → `41-SEGURIDAD §Runbook`): SEC-03/04 LIVE ✅ · App Check monitor · SEC-01 RBAC-read pendiente (→E5) · Legal `42` (gate abogado, F14 en E3 lo necesita).
- 🔴 **Billing GCP se cayó ~2h el 2026-06-09** (recuperado, L-38). **Causa SIN identificar (cliente: console.cloud.google.com/billing)** o se repetirá.
- 🧹 Cliente: Ctrl+Shift+R + descartar lead de prueba `VMVMJG…` (Bandeja → spam_prueba) + anunciar F42. (Festivos ✅ en `config/availability`.)
- 📊 App Check: 403 de reCAPTCHA al bot del E2E = esperado (monitor OK); gate de enforce con tráfico humano → lóbulo `41`.
- ⚖️ Texto legal PÚBLICO de supresión/privacidad = gate P4 (abogado, `42-LEGAL`) — el mecanismo F14 ya está live.
- cron↔cache = patrón conocido (L-02, hija `31-LECCIONES-GIT`).

## 🧩 Sub-sistemas (resumen)
`js/` modular ✅ · index cinematic vanilla ✅ · cerebro autónomo ✅ (v6 en ejecución) · SEO ✅ · bot/RBAC/Hub estables ✅ (ALTOR diferido)
