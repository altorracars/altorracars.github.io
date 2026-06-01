# 🩺 05 — ESTADO GLOBAL (Heartbeat · Snapshot de salud del sistema)

> **Nodo neuronal: signos vitales.** Se **AUTO-CARGA** (junto a `CLAUDE.md` +
> `10-CORTO-PLAZO`). Responde *"¿en qué estado está el sistema AHORA, antes de
> tocar nada?"*. Lo lee el **Reflejo de Auto-auditoría (`CLAUDE.md §G.4`)** al arrancar.
>
> **Mantenimiento (Reflejo de Frescura §G.4)**: actualizar al cambiar cache version,
> branch, build o al detectar/resolver un riesgo. **Tope ~25 líneas (§G.5)** — es un
> tablero, no una bitácora.

| Señal | Valor (al 2026-05-31) |
|---|---|
| **Build** | 🟢 **Catálogo 100% cinematic EN PRODUCCIÓN (§122–§146).** Todo §140–§146 mergeado a `main` vía **PRs #771–#777** (`3f31484`/§146, 2026-05-31 17:54). Auditoría regresión post-deploy **PASÓ** (sin regresiones; detalle en `10`). Solo 3 redirects invisibles quedan legacy. ⏳ Solo falta QA visual prod. |
| **Cache version vigente** | `v20260531360000` (§146) — **YA desplegada en `main`** (`origin/main`=`3f31484`). SW = cache-manager (match ✅). |
| **Branch activa** | `refactor/estructura` HEAD `2b519b5` (§146) = `origin/refactor`. **Todo mergeado a `main`** (PR#777). Rama detrás de `origin/main` solo en merge commits → `git pull`/sync opcional al retomar. |
| **Producción (`main`)** | `origin/main` = `3f31484` (PR#777) = **catálogo 100% cinematic** (§140 detalle + §141 pulido + §142 sin-desc + §143 busqueda + §144 marca + §145 marcas/nav + §146 landings). Sin regresiones (auditoría). ⏳ QA visual Ctrl+Shift+R (L-08). |
| **Deploys backend pendientes** | Ninguno (firestore.rules / functions sin cambios). |

## ⚠️ Flags de riesgo activos
- ⚠️ **E2E SP-1 requiere deploy a `main`** (L-08: Auth/Firebase bloquea localhost por referrer; única E2E real es contra `altorracars.github.io`). **Recipe**: merge → esperar ~1-2 min GitHub Pages → Ctrl+Shift+R → checklist. **Rollback ready**: `git revert <sha>` + push devuelve el diseño viejo en ~1 min. Riesgo aceptado: ventana de minutos con cinematic visible mientras se valida.
- Conflicto cron↔cache al fusionar = patrón conocido (`git merge origin/main`, L-02).

## 🧩 Sub-sistemas (resumen)
`js/` modular ✅ · **rediseño index cinematic vanilla** (`css/home/*` + `js/public/home/*`) ✅ · cerebro autónomo ✅ · SEO ✅ · bot/RBAC/Hub estables ✅
