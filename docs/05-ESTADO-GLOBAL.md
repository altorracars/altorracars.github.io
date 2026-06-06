# 🩺 05 — ESTADO GLOBAL (Heartbeat · Snapshot de salud del sistema)

> **Nodo neuronal: signos vitales.** Se **AUTO-CARGA** (junto a `CLAUDE.md` +
> `10-CORTO-PLAZO`). Responde *"¿en qué estado está el sistema AHORA, antes de
> tocar nada?"*. Lo lee el **Reflejo de Auto-auditoría (`CLAUDE.md §G.4`)** al arrancar.
>
> **Mantenimiento (Reflejo de Frescura §G.4)**: actualizar al cambiar cache version,
> branch, build o al detectar/resolver un riesgo. **Tope ~25 líneas (§G.5)** — es un
> tablero, no una bitácora.

| Señal | Valor (al 2026-06-06) |
|---|---|
| **Build** | 🟢 Catálogo cinematic + a11y **en producción**. Cerebro ENDURECIDO (§156). **🏗️ CRM rebuild — portal `admin-app/` (Vite + Firebase modular) con 4 superficies LIVE**: Bandeja+360 (§159), Pipeline `deals` (§160), Agenda (§161), **Reportes/KPIs (§165)**. Captura completa: web + MANUAL (§162) + AUTO registro (§163) + newsletter (§164). **Fase 4 (Reportes): tablero determinista (KPIs · embudo · canal⭐ · forecast · tendencia · equipo · CSV), agregación cliente $0, charts SVG/CSS — build verde, `?mock=1` reconciliado a mano + revisión adversarial 5-dim (0 bugs correctness, 4 fixes), DESPLEGADA a `main`** (sin reglas/índices/functions/cache). ⏳ Solo falta **E2E live** del cliente. `brain:check` SANO. Ver ADR §150–§165. |
| **Cache version vigente** | **`v20260606120000`** (§164 — newsletter). SW = cache-manager (match ✅). **§165 (Reportes) NO bumpea**: vive solo en `admin-app/` (Vite hash-busting, L-27), no toca sitio público. PREV `v20260605120000` §157. Ctrl+Shift+R la 1ª vez. |
| **Branch activa** | `refactor/estructura`. §157–§164 LIVE en `main`. **§165 (Reportes/KPIs)**: construido + verificado; **desplegado a `main` esta sesión** (commit + merge + push; sin rules/indexes/functions/cache). **Auto-deploy por fase autorizado** (memoria `feedback-auto-deploy-crm`). |
| **Producción (`main`)** | `origin/main` = catálogo cinematic + §150–§154 + **§157 hero + CRM Fase 1–4** (ingestión, Bandeja/360, Pipeline, Agenda, **Reportes §165**) + captura manual/AUTO LIVE en `/admin-app/dist/`. El sha avanza por cron/PRs (→`git`). ⏳ QA visual Ctrl+Shift+R (L-08). |
| **Deploys** | ✅ Fase 1–3 + captura manual + AUTO (`onClienteCreated` §163, `onSubscriptionCreated` §164 + cache `v20260606120000`) LIVE. **§165 Reportes** (esta sesión): solo `admin-app/dist/` (commit + merge + push `main`); **sin rules/indexes/functions/cache**. ⏳ **Backfill** (histórico) + **E2E live** (L-08). |

## ⚠️ Flags de riesgo activos
- ⚠️ **E2E SP-1 requiere deploy a `main`** (L-08: Auth/Firebase bloquea localhost por referrer; única E2E real es contra `altorracars.github.io`). **Recipe**: merge → esperar ~1-2 min GitHub Pages → Ctrl+Shift+R → checklist. **Rollback ready**: `git revert <sha>` + push devuelve el diseño viejo en ~1 min. Riesgo aceptado: ventana de minutos con cinematic visible mientras se valida.
- Conflicto cron↔cache al fusionar = patrón conocido (`git merge origin/main`, L-02).

## 🧩 Sub-sistemas (resumen)
`js/` modular ✅ · **rediseño index cinematic vanilla** (`css/home/*` + `js/public/home/*`) ✅ · cerebro autónomo ✅ · SEO ✅ · bot/RBAC/Hub estables ✅
