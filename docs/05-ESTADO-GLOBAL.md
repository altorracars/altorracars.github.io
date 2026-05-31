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
| **Build** | 🟢 Cinematic completo (§122–§137) + recomendaciones f1 (§138) + footer fix (§139). **WIP: SP-5.3** detalle-vehiculo rediseño+de-monolitización — **Fase 0+1 hechas y verificadas** (CSS+JS extraídos a módulos, página idéntica), **Fase 2 (cinematic) + 3 (regenerar) PENDIENTES**. Ver `10` §WIP. |
| **Cache version vigente** | `v20260531290000` (§139). **SP-5.3 bumpea en Fase 3** (aún no). |
| **Branch activa** | `refactor/estructura` — **sincronizada con `origin` y con `origin/main`** (0 pendientes; cliente pusheó + mergeó). HEAD `d8b45cd`. |
| **Producción (`main`)** | `origin/main` = `ab8a093` (PR #769) contiene **§139 footer + SP-5.3 Fase 0+1** (de-monolitización detalle). **Detalle aún se ve LEGACY en prod** (cuerpo sin reescribir — Fase 2 pendiente); funcionalidad intacta. Validar Ctrl+Shift+R. |
| **Deploys backend pendientes** | Ninguno (firestore.rules / functions sin cambios). |

## ⚠️ Flags de riesgo activos
- ⚠️ **E2E SP-1 requiere deploy a `main`** (L-08: Auth/Firebase bloquea localhost por referrer; única E2E real es contra `altorracars.github.io`). **Recipe**: merge → esperar ~1-2 min GitHub Pages → Ctrl+Shift+R → checklist. **Rollback ready**: `git revert <sha>` + push devuelve el diseño viejo en ~1 min. Riesgo aceptado: ventana de minutos con cinematic visible mientras se valida.
- Conflicto cron↔cache al fusionar = patrón conocido (`git merge origin/main`, L-02).

## 🧩 Sub-sistemas (resumen)
`js/` modular ✅ · **rediseño index cinematic vanilla** (`css/home/*` + `js/public/home/*`) ✅ · cerebro autónomo ✅ · SEO ✅ · bot/RBAC/Hub estables ✅
