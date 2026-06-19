# 🩺 05 — ESTADO GLOBAL (Heartbeat · Snapshot de salud del sistema)

> **Nodo: signos vitales.** AUTO-CARGA (con `CLAUDE.md` + `10`). Tablero, no bitácora: solo señales
> ACTUALES (pisar, no apilar); lo histórico vive en `99` (ADR). Tope ~25 líneas / ~2.8k chars (§G.5).

| Señal | Valor (última actualización: **2026-06-19**) |
|---|---|
| **Build** | 🟢 **E6 cutover 6/6** DEPLOYADO. **④ RBAC ④a COMPLETO (PASO 0-6)** (detalle → `10`/§219): dueño INAMOVIBLE 3-capas (§212/§213) + backfill + departments + §217 no-mint + asignación+`userCount` (§218) + **seed `nivel` §219 (`onUserRoleAssigned` desplegada) + paridad dual-portal**. **PEND dueño**: Ctrl+Shift+R + crear Departamentos + asignarlos + 1 clic Backfill + merge web. **④b GATEADO** (Gemini+negocio; **floor server-side antes de enforce `nivel`** §219). Vender=Pipeline. dealers F2 (TODO-25). |
| **Cache version vigente** | **`v20260619041711`** (= la del cron-CI tras el merge; el cron es el DUEÑO del bump → ya NO bumpeo manual en la rama, evita L-02/L-03; se invalida con Ctrl+Shift+R). SW == cache-manager ✅. |
| **Branch activa** | `refactor/estructura` AHEAD de `main`=`bc58234`: **§219 (④a PASO 5-6) commiteado+pusheado, pend merge dueño** (PR #865+#868 ya en main). `onUserRoleAssigned` desplegada por Claude. **commit+push=Claude · merge=dueño en web** (§2). deploys firebase=Claude (§1). Verificado vs git 19/06 (§3.3). |
| **Producción (`main`+functions)** | Portal CRM v2: Pipeline v3 + Post-venta · SLA+rotación · calendario único · CRUD · daily/hourly jobs · 22 functions CRM (**retry:true ×6**) · Rules E5 LIVE. App Check MONITOR (enforce ~16-23/06 → lóbulo `41`). |

## ⚠️ Flags de riesgo activos
- 🤖 **Modelo de trabajo: Opus 4.8** (Fable 5 NO disponible, 2026-06-12). Cada entrega marcada **`⟦OPUS-4.8 · rev-Fable⟧`** (rev. cuando Fable vuelva; dueño avisa). Detalle → `10` + memoria.
- 🔒 **Blindaje** (canónico → `41-SEGURIDAD §Runbook`): SEC-03/04 LIVE ✅ · App Check monitor · SEC-01 RBAC-read pendiente (→E5) · Legal `42` (gate abogado, F14 en E3 lo necesita).
- 🔴 **Billing GCP se cayó ~2h el 2026-06-09** (recuperado, L-38). **Causa SIN identificar (cliente: console.cloud.google.com/billing)** o se repetirá.
- 🧹 Cliente: descartar lead de prueba `VMVMJG…` (Bandeja → spam_prueba) + anunciar F42. (Festivos ✅ en `config/availability`.)
- 📊 App Check: 403 de reCAPTCHA al bot del E2E = esperado (monitor OK); gate de enforce con tráfico humano → lóbulo `41`.
- ⚖️ Texto legal PÚBLICO de supresión/privacidad = gate P4 (abogado, `42-LEGAL`) — el mecanismo F14 ya está live.
- cron↔cache = patrón conocido (L-02, hija `31-LECCIONES-GIT`).

## 🧩 Sub-sistemas (resumen)
`js/` modular ✅ · index cinematic vanilla ✅ · cerebro autónomo ✅ (v6 en ejecución) · SEO ✅ · bot/RBAC/Hub estables ✅ (ALTOR diferido)
