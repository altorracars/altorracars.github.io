# 🩺 05 — ESTADO GLOBAL (Heartbeat · Snapshot de salud del sistema)

> **Nodo: signos vitales.** AUTO-CARGA (con `CLAUDE.md` + `10`). Tablero, no bitácora: solo señales
> ACTUALES (pisar, no apilar); lo histórico vive en `99` (ADR). Tope ~25 líneas / ~2.8k chars (§G.5).

| Señal | Valor (última actualización: **2026-06-10**) |
|---|---|
| **Build** | 🟢 **CRM plan §176: E0+E1a+E1b+E2-tanda1 ✅ LIVE** (§177-§182) + adelanto E3 archivar/purge (§180). ⏸️ **Relevo §183** → retomar: **"continúa E2 tanda 2"** (F21 editor+lector · F18/F19 · F20 · F28). Cerebro: comité v6 19/21. |
| **Cache version vigente** | **`v20260610011703`** (§177). SW == cache-manager ✅. Ctrl+Shift+R la 1ª vez. |
| **Branch activa** | `refactor/estructura` — **TODO mergeado a `main` por el cliente** (PRs hasta §182, commit `25f1b5f`). Flujo git: Claude commitea+push de rama; merge = el cliente. Deploys firebase = Claude (§1). |
| **Producción (`main`)** | Portal CRM v2 completo (Pipeline v3, lead rápido offline, SLA cron+Telegram ✅, citas→Agenda, daily job 5am, archivar/purge) + sitio cinematic. 14 functions CRM nuevas LIVE. |

## ⚠️ Flags de riesgo activos
- 🔒 **Blindaje** (estado canónico → `41-SEGURIDAD §Runbook`): SEC-03/04 LIVE ✅ · App Check monitor LIVE (observar→enforce) · SEC-01 RBAC-read pendiente (pre-seed+OK) · Legal `42` (gate abogado).
- 🔐 **Exposición pública RESUELTA** (ADR §174, Gemini adoptado/refutado): RED/AMBER → **bóveda `../brain-private/`** (41/crm-handoff/archive = stubs públicos); bóveda en GitHub privado ✓ (`altorracars/brain-private`); riesgo residual = historial git viejo (purga diferida).
- 🔴 **Billing GCP se cayó ~2h el 2026-06-09** (recuperado; Eventarc re-entregó — L-38). **Causa SIN identificar (cliente: console.cloud.google.com/billing)** o se repetirá.
- 🧹 Pendientes del cliente: borrar `leads/_test_sla_e1a` (⋯→Eliminar definitivo) · anunciar F42 al equipo.
- ✅ Verificar al retomar: 1ª corrida del `crmDailyJob` (digest en `crm_alerts`, fantasmas de cupos eliminados).
- cron↔cache = patrón conocido (L-02, hija `31-LECCIONES-GIT`).

## 🧩 Sub-sistemas (resumen)
`js/` modular ✅ · index cinematic vanilla ✅ · cerebro autónomo ✅ (v6 en ejecución) · SEO ✅ · bot/RBAC/Hub estables ✅ (ALTOR diferido)
