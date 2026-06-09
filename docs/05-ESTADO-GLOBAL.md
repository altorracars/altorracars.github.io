# 🩺 05 — ESTADO GLOBAL (Heartbeat · Snapshot de salud del sistema)

> **Nodo: signos vitales.** AUTO-CARGA (con `CLAUDE.md` + `10`). Tablero, no bitácora: solo señales
> ACTUALES (pisar, no apilar); lo histórico vive en `99` (ADR). Tope ~25 líneas / ~2.8k chars (§G.5).

| Señal | Valor (última actualización: **2026-06-09**) |
|---|---|
| **Build** | 🟢 Sitio cinematic + a11y en producción. **CRM portal `admin-app/` NÚCLEO COMPLETO** (5 superficies LIVE, §158-§166; falta E2E live). Cerebro: §167-§172 cerrados; **plan VIGENTE = comité v6** (→ `10` foco + checklist A-U). |
| **Cache version vigente** | **`v20260608231721`** (§169 App Check monitor). SW == cache-manager ✅. Ctrl+Shift+R la 1ª vez. |
| **Branch activa** | `refactor/estructura` — pusheada ✓ (2026-06-09, incl. comité v6). `main` avanza por cron cada 4h. Flujo git: **Claude commitea; push/merge = el cliente** (push delegado puntualmente con autorización, como hoy). Deploys firebase = Claude (§1). |
| **Producción (`main`)** | Catálogo cinematic + CRM núcleo (§157-§166) + **App Check monitor LIVE** (`dc5ebca`). ⏳ QA visual Ctrl+Shift+R (L-08). |

## ⚠️ Flags de riesgo activos
- 🔒 **Blindaje** (estado canónico → `41-SEGURIDAD §Runbook`): SEC-03/04 LIVE ✅ · App Check monitor LIVE (observar→enforce) · SEC-01 RBAC-read pendiente (pre-seed+OK) · Legal `42` (gate abogado).
- 🔐 **Exposición pública RESUELTA** (ADR §174, Gemini adoptado/refutado): RED/AMBER → **bóveda `../brain-private/`** (41/crm-handoff/archive = stubs públicos); bóveda en GitHub privado ✓ (`altorracars/brain-private`); riesgo residual = historial git viejo (purga diferida).
- ⚠️ **E2E del CRM requiere `main`** (L-08: Auth bloquea localhost) — receta: merge → 1-2 min → Ctrl+Shift+R.
- cron↔cache = patrón conocido (L-02).

## 🧩 Sub-sistemas (resumen)
`js/` modular ✅ · index cinematic vanilla ✅ · cerebro autónomo ✅ (v6 en ejecución) · SEO ✅ · bot/RBAC/Hub estables ✅ (ALTOR diferido)
