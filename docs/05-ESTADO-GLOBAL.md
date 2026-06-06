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
| **Build** | 🟢 Catálogo cinematic + a11y **en producción**. Cerebro ENDURECIDO (§156). **🏗️ CRM: Fase 1 (ingestión canónica `onSolicitudCreated`) LIVE + Fase 2 (Bandeja Inteligente, app `admin-app/` greenfield Vite + Firebase modular) CONSTRUIDA** — `npm run build` verde, verificada en `?mock=1` (snapshot+eval), 2 bugs cazados+fixeados. ✅ DESPLEGADA. **+ Fase 3a (Pipeline `deals`) + Fase 3b (Agenda unificada) DESPLEGADAS a `main`** — verificadas `?mock=1` (54 módulos, **0 bugs c/u**). Portal nuevo ya tiene 3 superficies live (Bandeja+360, Pipeline, Agenda). ⏳ Solo falta **E2E live** del cliente. `brain:check` SANO. Ver ADR §150–§161. |
| **Cache version vigente** | **`v20260605120000`** (§157) — fix rectángulo negro del hero (`<footer class=cin-hero-foot>` heredaba `body footer{background}` de dark-theme → `.cin-hero-foot{background:transparent}`). SW = cache-manager (match ✅, lo valida `brain:check §4a`). PREV `v20260602140000` §150.f. ⏳ pendiente deploy + QA. |
| **Branch activa** | `refactor/estructura` (en sync con `main`). Fase 3a commiteada+mergeada (`1e154c2`). Fase 3b (Agenda) en commit de esta sesión → merge a `main`. **Auto-deploy por fase autorizado** (memoria `feedback-auto-deploy-crm`). |
| **Producción (`main`)** | `origin/main` = catálogo cinematic + §150–§154 + **§157 hero + CRM Fase 1 (ingestión) + Fase 2 (Bandeja/360) + Fase 3a (Pipeline) + Fase 3b (Agenda)** LIVE en `/admin-app/dist/`. El sha avanza por cron/PRs (→`git`). ⏳ QA visual Ctrl+Shift+R (L-08). |
| **Deploys** | ✅ Fase 1–3 DESPLEGADAS en `altorra-cars`: `/admin-app/dist/` (Bandeja+Pipeline+Agenda) + `firestore:rules` (`crmNotes`+`deals`) + `firestore:indexes` (`deals(status,lastActivityAt)`) LIVE. Fase 3b NO necesitó deploy de rules/indexes (índice de campo único auto). ⏳ Solo falta **E2E live** (L-08). |

## ⚠️ Flags de riesgo activos
- ⚠️ **E2E SP-1 requiere deploy a `main`** (L-08: Auth/Firebase bloquea localhost por referrer; única E2E real es contra `altorracars.github.io`). **Recipe**: merge → esperar ~1-2 min GitHub Pages → Ctrl+Shift+R → checklist. **Rollback ready**: `git revert <sha>` + push devuelve el diseño viejo en ~1 min. Riesgo aceptado: ventana de minutos con cinematic visible mientras se valida.
- Conflicto cron↔cache al fusionar = patrón conocido (`git merge origin/main`, L-02).

## 🧩 Sub-sistemas (resumen)
`js/` modular ✅ · **rediseño index cinematic vanilla** (`css/home/*` + `js/public/home/*`) ✅ · cerebro autónomo ✅ · SEO ✅ · bot/RBAC/Hub estables ✅
