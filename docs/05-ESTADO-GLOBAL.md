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
| **Build** | 🟢 Rediseño cinematic COMPLETO punta a punta (§122–§137) + SP-4 recomendaciones fase 1 (§138) — **TODO mergeado a `origin/main` = producción** (verificado: HEAD local `d62f058` es ancestro de origin/main). Pendiente: SP-4 fase 2 diferida. |
| **Cache version vigente** | `v20260531280000` (comparador CTA "Explorar vehículos" + sync main) |
| **Branch activa** | `refactor/estructura` — **71 commits DETRÁS de `origin/main`** (auto-merge PRs del CI: vehicle pages 4h + assets `multimedia/optimized/` + cache bumps). HEAD es ancestro → `git merge origin/main` = fast-forward limpio. ⚠️ Consolidación sin commitear: `docs/10` (poda) + `docs/30` (M-07). |
| **Producción (`main`)** | `origin/main` contiene TODO hasta §138 (cinematic completo + recomendaciones fase 1, auto-deploy Pages). **Falta validar en vivo** (Ctrl+Shift+R): comparador/simulador/recomendaciones. |
| **Deploys backend pendientes** | Ninguno (firestore.rules / functions sin cambios). |

## ⚠️ Flags de riesgo activos
- ⚠️ **E2E SP-1 requiere deploy a `main`** (L-08: Auth/Firebase bloquea localhost por referrer; única E2E real es contra `altorracars.github.io`). **Recipe**: merge → esperar ~1-2 min GitHub Pages → Ctrl+Shift+R → checklist. **Rollback ready**: `git revert <sha>` + push devuelve el diseño viejo en ~1 min. Riesgo aceptado: ventana de minutos con cinematic visible mientras se valida.
- Conflicto cron↔cache al fusionar = patrón conocido (`git merge origin/main`, L-02).

## 🧩 Sub-sistemas (resumen)
`js/` modular ✅ · **rediseño index cinematic vanilla** (`css/home/*` + `js/public/home/*`) ✅ · cerebro autónomo ✅ · SEO ✅ · bot/RBAC/Hub estables ✅
