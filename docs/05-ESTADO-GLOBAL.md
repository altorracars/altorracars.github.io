# 🩺 05 — ESTADO GLOBAL (Heartbeat · Snapshot de salud del sistema)

> **Nodo: signos vitales.** AUTO-CARGA (con `CLAUDE.md` + `10`). Tablero, no bitácora: solo señales
> ACTUALES (pisar, no apilar); lo histórico vive en `99` (ADR). Tope ~25 líneas / ~2.8k chars (§G.5).

| Señal | Valor (última actualización: **2026-06-09**) |
|---|---|
| **Build** | 🟢 Sitio cinematic + a11y en producción. **CRM portal `admin-app/` E2E LIVE VERIFICADO ✅** (§175: web+newsletter→canónico→Bandeja/Contactos; 5 superficies §158-§166). Cerebro: comité v6 19/21 (→ `10`). |
| **Cache version vigente** | **`v20260609181210`** (§175 fix form contacto). SW == cache-manager ✅. Ctrl+Shift+R la 1ª vez. |
| **Branch activa** | `refactor/estructura` — **fix §175 + cerebro commiteados, PENDIENTE merge+push (cliente)**. `main` avanza por cron cada 4h. Flujo git: **Claude commitea; push/merge = el cliente**. Deploys firebase = Claude (§1). |
| **Producción (`main`)** | Catálogo cinematic + CRM completo (§157-§166) + App Check monitor LIVE. ⚠️ El form de contacto en prod tiene el bug del spinner HASTA el merge del fix §175. |

## ⚠️ Flags de riesgo activos
- 🔒 **Blindaje** (estado canónico → `41-SEGURIDAD §Runbook`): SEC-03/04 LIVE ✅ · App Check monitor LIVE (observar→enforce) · SEC-01 RBAC-read pendiente (pre-seed+OK) · Legal `42` (gate abogado).
- 🔐 **Exposición pública RESUELTA** (ADR §174, Gemini adoptado/refutado): RED/AMBER → **bóveda `../brain-private/`** (41/crm-handoff/archive = stubs públicos); bóveda en GitHub privado ✓ (`altorracars/brain-private`); riesgo residual = historial git viejo (purga diferida).
- 🔴 **Billing GCP se DESHABILITÓ hoy ~2h** (§175, recuperado ~23:03 UTC; Eventarc re-entregó, cero pérdida — L-38). **Causa SIN identificar (lado cliente: tarjeta/cuenta)** → verificar en console.cloud.google.com/billing o se repetirá.
- 🧹 2 docs de prueba residuales: `leads/E26PXSF8ibdmuvtpt9v9` + `leads/DYYD92LLMqboX4aOVByx` (borrado denegado a Claude; se ven en la Bandeja).
- cron↔cache = patrón conocido (L-02, hija `31-LECCIONES-GIT`).

## 🧩 Sub-sistemas (resumen)
`js/` modular ✅ · index cinematic vanilla ✅ · cerebro autónomo ✅ (v6 en ejecución) · SEO ✅ · bot/RBAC/Hub estables ✅ (ALTOR diferido)
