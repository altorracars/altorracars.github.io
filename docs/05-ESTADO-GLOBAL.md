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
| **Build** | 🟢 Catálogo cinematic + a11y **en producción**. Cerebro ENDURECIDO (§156). **🏗️ CRM: Fase 1 (ingestión canónica `onSolicitudCreated`) LIVE + Fase 2 (Bandeja Inteligente, app `admin-app/` greenfield Vite + Firebase modular) CONSTRUIDA** — `npm run build` verde, verificada en `?mock=1` (snapshot+eval), 2 bugs cazados+fixeados. ✅ DESPLEGADA a `main`. **+ Fase 3a (Pipeline: embudo drag-drop sobre `deals`, lead→oportunidad) CONSTRUIDA** — verificada `?mock=1` (50 módulos, forecast OK, **0 bugs**). ⏳ Falta deploy Fase 3 (rules+indexes+`dist`) + E2E live. `brain:check` SANO. Ver ADR §150–§160. |
| **Cache version vigente** | **`v20260605120000`** (§157) — fix rectángulo negro del hero (`<footer class=cin-hero-foot>` heredaba `body footer{background}` de dark-theme → `.cin-hero-foot{background:transparent}`). SW = cache-manager (match ✅, lo valida `brain:check §4a`). PREV `v20260602140000` §150.f. ⏳ pendiente deploy + QA. |
| **Branch activa** | `refactor/estructura` (= `main` tras sync `7a43b13`). **SIN commitear**: Fase 3a (`admin-app/src/{domain/pipeline.js,modules/deals/*,styles/pipeline.css}` + routing + mock + acción Convertir + `dist/`) + `firestore.rules`/`firestore.indexes.json` (`deals`) + consolidación (§160 en `99`/`00`, L-29 en `30`, design doc, `05`/`10`/`20`). Pendiente: deploy + commit + merge a main. |
| **Producción (`main`)** | `origin/main` (`73c69ea`, 2026-06-06) = catálogo cinematic + §150–§154 + **§157 (fix hero) + CRM Fase 1 (ingestión) + Fase 2 (Bandeja `admin-app/dist/`)** LIVE. El sha avanza por cron/PRs (→`git`). ⏳ QA visual Ctrl+Shift+R (L-08). |
| **Deploys** | ✅ Fase 1 + Fase 2 DESPLEGADAS (`/admin-app/dist/` + `crmNotes` LIVE). ⏳ **Fase 3a pendiente de deploy**: `firebase deploy --only firestore:rules,firestore:indexes` (colección `deals` + índice `deals(status,lastActivityAt)`) + commit/merge del `dist/` nuevo a `main`. Luego **E2E live** (L-08). |

## ⚠️ Flags de riesgo activos
- ⚠️ **E2E SP-1 requiere deploy a `main`** (L-08: Auth/Firebase bloquea localhost por referrer; única E2E real es contra `altorracars.github.io`). **Recipe**: merge → esperar ~1-2 min GitHub Pages → Ctrl+Shift+R → checklist. **Rollback ready**: `git revert <sha>` + push devuelve el diseño viejo en ~1 min. Riesgo aceptado: ventana de minutos con cinematic visible mientras se valida.
- Conflicto cron↔cache al fusionar = patrón conocido (`git merge origin/main`, L-02).

## 🧩 Sub-sistemas (resumen)
`js/` modular ✅ · **rediseño index cinematic vanilla** (`css/home/*` + `js/public/home/*`) ✅ · cerebro autónomo ✅ · SEO ✅ · bot/RBAC/Hub estables ✅
