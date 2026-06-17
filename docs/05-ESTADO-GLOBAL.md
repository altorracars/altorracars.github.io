# 🩺 05 — ESTADO GLOBAL (Heartbeat · Snapshot de salud del sistema)

> **Nodo: signos vitales.** AUTO-CARGA (con `CLAUDE.md` + `10`). Tablero, no bitácora: solo señales
> ACTUALES (pisar, no apilar); lo histórico vive en `99` (ADR). Tope ~25 líneas / ~2.8k chars (§G.5).

| Señal | Valor (última actualización: **2026-06-15**) |
|---|---|
| **Build** | 🟢 **CRM E6 cutover: gates ②/③ COMPLETOS (6/6)**. §209 (fix V6, rules deployadas) + §210 (gates `admin-cutover-gates.js`; vehículos añadido tras **R-13/R-12 verificados** + dueño verificó leads/creación-veh en vivo) + §211 (fixes web pública) — en branch, **pend. push del dueño**. Vender=Pipeline (markAsSold oculto; financiero completo=TODO-25). **AHORA ④ RBAC §193.4** (diseño listo → adversarial/Gemini → implementar). Dealers F2 gated (TODO-25). |
| **Cache version vigente** | **`v20260617174623`** (§211 bump por fixes web pública — efecto al push del dueño; previo CI `v20260615041622`). SW == cache-manager ✅. Ctrl+Shift+R. |
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
