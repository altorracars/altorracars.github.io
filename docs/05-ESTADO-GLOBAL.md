# 🩺 05 — ESTADO GLOBAL (Heartbeat · Snapshot de salud del sistema)

> **Nodo neuronal: signos vitales.** Se **AUTO-CARGA** (junto a `CLAUDE.md` +
> `10-CORTO-PLAZO`). Responde *"¿en qué estado está el sistema AHORA, antes de
> tocar nada?"*. Lo lee el **Reflejo de Auto-auditoría (`CLAUDE.md §G.4`)** al arrancar.
>
> **Mantenimiento (Reflejo de Frescura §G.4)**: actualizar al cambiar cache version,
> branch, build o al detectar/resolver un riesgo. **Tope ~25 líneas (§G.5)** — es un
> tablero, no una bitácora.

| Señal | Valor (al 2026-05-30) |
|---|---|
| **Build** | 🟢 §131/§132 + §133 chrome unify en prod (commiteados). **Working tree (sin commit): badge fav=0 + §134 comparador flotante + §135 comparador página cinematic → SP-5.2.c.3 COMPLETO.** Falta SP-5.2.c.4 simulador (sprint propio). |
| **Cache version vigente** | `v20260531230000` (§135 comparador página) |
| **Branch activa** | `refactor/estructura` — **+1 commit sobre `origin/main`** (favoritos §132, pendiente push). El resto ya en main. |
| **Producción (`main`)** | `origin/main` = perfil §131 (cinematic, auto-deploy Pages) → **validar perfil en vivo**. Favoritos llega al pushear. |
| **Deploys backend pendientes** | Ninguno (firestore.rules / functions sin cambios). |

## ⚠️ Flags de riesgo activos
- ⚠️ **E2E SP-1 requiere deploy a `main`** (L-08: Auth/Firebase bloquea localhost por referrer; única E2E real es contra `altorracars.github.io`). **Recipe**: merge → esperar ~1-2 min GitHub Pages → Ctrl+Shift+R → checklist. **Rollback ready**: `git revert <sha>` + push devuelve el diseño viejo en ~1 min. Riesgo aceptado: ventana de minutos con cinematic visible mientras se valida.
- Conflicto cron↔cache al fusionar = patrón conocido (`git merge origin/main`, L-02).

## 🧩 Sub-sistemas (resumen)
`js/` modular ✅ · **rediseño index cinematic vanilla** (`css/home/*` + `js/public/home/*`) ✅ · cerebro autónomo ✅ · SEO ✅ · bot/RBAC/Hub estables ✅
