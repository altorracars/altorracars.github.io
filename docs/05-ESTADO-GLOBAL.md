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
| **Build** | 🟢 Cinematic completo (§122–§143). §140 detalle en prod (PR #771). **§141 (pulido) + §142 (Descripción eliminada) commiteados+pusheados** (`b0ba694`). **§143 `busqueda.html` cinematic SIN commit.** ⏳ Validar en prod. |
| **Cache version vigente** | `v20260531330000` (§143, SIN commit; §141/§142 `v…320000` pusheados; en prod-main aún `v…300000`/§140). |
| **Branch activa** | `refactor/estructura` HEAD `b0ba694` (§142). **§143 en working tree SIN commit.** `git pull` + commitea §143 (mensajes en chat). Merge a `main`: §141/§142/§143 cuando el cliente lo decida. |
| **Producción (`main`)** | `origin/main` = `ae1bc7e` (PR #771) = SP-5.3 completo (Fases 0–3) + §139. **Detalle ahora CINEMATIC en prod.** ⏳ Validar Ctrl+Shift+R (E2E real, L-08). |
| **Deploys backend pendientes** | Ninguno (firestore.rules / functions sin cambios). |

## ⚠️ Flags de riesgo activos
- ⚠️ **E2E SP-1 requiere deploy a `main`** (L-08: Auth/Firebase bloquea localhost por referrer; única E2E real es contra `altorracars.github.io`). **Recipe**: merge → esperar ~1-2 min GitHub Pages → Ctrl+Shift+R → checklist. **Rollback ready**: `git revert <sha>` + push devuelve el diseño viejo en ~1 min. Riesgo aceptado: ventana de minutos con cinematic visible mientras se valida.
- Conflicto cron↔cache al fusionar = patrón conocido (`git merge origin/main`, L-02).

## 🧩 Sub-sistemas (resumen)
`js/` modular ✅ · **rediseño index cinematic vanilla** (`css/home/*` + `js/public/home/*`) ✅ · cerebro autónomo ✅ · SEO ✅ · bot/RBAC/Hub estables ✅
