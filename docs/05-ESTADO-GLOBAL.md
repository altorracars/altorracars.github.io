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
| **Build** | 🟢 **Catálogo 100% cinematic en prod (§122–§146).** + Lóbulo §48 + skill `accessibility-audit` + **§147 a11y commiteados**. **§148 (validación post-launch + A11Y-03 contraste + fix enlace roto) SIN commit.** Único pendiente a11y: **A11Y-04 skip-link**. ⏳ QA visual prod. |
| **Cache version vigente** | `v20260601000000` (§148, **SIN commit**); §147 `v…370000` commiteado; prod-`main` ≤ §146. SW = cache-manager (match ✅). |
| **Branch activa** | `refactor/estructura` (§140–§146 en `main`). **§148 en working tree SIN commit** (§147 + skill ya commiteados). `git pull` para sync con `origin/main`. |
| **Producción (`main`)** | `origin/main` = `3f31484` (PR#777) = **catálogo 100% cinematic** (§140 detalle + §141 pulido + §142 sin-desc + §143 busqueda + §144 marca + §145 marcas/nav + §146 landings). Sin regresiones (auditoría). ⏳ QA visual Ctrl+Shift+R (L-08). |
| **Deploys backend pendientes** | Ninguno (firestore.rules / functions sin cambios). |

## ⚠️ Flags de riesgo activos
- ⚠️ **E2E SP-1 requiere deploy a `main`** (L-08: Auth/Firebase bloquea localhost por referrer; única E2E real es contra `altorracars.github.io`). **Recipe**: merge → esperar ~1-2 min GitHub Pages → Ctrl+Shift+R → checklist. **Rollback ready**: `git revert <sha>` + push devuelve el diseño viejo en ~1 min. Riesgo aceptado: ventana de minutos con cinematic visible mientras se valida.
- Conflicto cron↔cache al fusionar = patrón conocido (`git merge origin/main`, L-02).

## 🧩 Sub-sistemas (resumen)
`js/` modular ✅ · **rediseño index cinematic vanilla** (`css/home/*` + `js/public/home/*`) ✅ · cerebro autónomo ✅ · SEO ✅ · bot/RBAC/Hub estables ✅
