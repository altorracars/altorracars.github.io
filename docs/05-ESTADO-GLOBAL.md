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
| **Build** | 🟢 Cinematic completo (§122–§142). **SP-5.3 detalle EN PRODUCCIÓN** (PR #771, §140). **§141 (pulido: fixes hover/blanco + glass) + §142 (Descripción ELIMINADA: tab+admin, datos dormidos) SIN commit.** ⏳ Validar prod tras mergear. |
| **Cache version vigente** | `v20260531320000` (§142, SIN commit/merge; §140 `v…300000` en prod PR #771). |
| **Branch activa** | `refactor/estructura`: §140 en `main` (PR #771). **§141 + §142 en working tree SIN commit.** Sincroniza local (`git pull`) + commitea (mensajes en chat). |
| **Producción (`main`)** | `origin/main` = `ae1bc7e` (PR #771) = SP-5.3 completo (Fases 0–3) + §139. **Detalle ahora CINEMATIC en prod.** ⏳ Validar Ctrl+Shift+R (E2E real, L-08). |
| **Deploys backend pendientes** | Ninguno (firestore.rules / functions sin cambios). |

## ⚠️ Flags de riesgo activos
- ⚠️ **E2E SP-1 requiere deploy a `main`** (L-08: Auth/Firebase bloquea localhost por referrer; única E2E real es contra `altorracars.github.io`). **Recipe**: merge → esperar ~1-2 min GitHub Pages → Ctrl+Shift+R → checklist. **Rollback ready**: `git revert <sha>` + push devuelve el diseño viejo en ~1 min. Riesgo aceptado: ventana de minutos con cinematic visible mientras se valida.
- Conflicto cron↔cache al fusionar = patrón conocido (`git merge origin/main`, L-02).

## 🧩 Sub-sistemas (resumen)
`js/` modular ✅ · **rediseño index cinematic vanilla** (`css/home/*` + `js/public/home/*`) ✅ · cerebro autónomo ✅ · SEO ✅ · bot/RBAC/Hub estables ✅
