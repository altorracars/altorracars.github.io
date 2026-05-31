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
| **Build** | 🟢 Cinematic completo (§122–§139). **SP-5.3 `detalle-vehiculo`: Fases 0–3 HECHAS y verificadas** (cinematic + de-monolitización: 4 módulos `js/public/detalle/` + `detalle-cinematic.css`, botones Opción A, 27 páginas regeneradas — §140). Ver `10`. |
| **Cache version vigente** | `v20260531300000` (§140, bumpeado en Fase 3 — aún sin merge a `main`). |
| **Branch activa** | `refactor/estructura` HEAD `10605da` (**Fase 2 commiteada**). **Fase 3 SIN commit** (generador + cache bump + 45 páginas regeneradas + cerebro = 58 archivos en working tree). Cliente commitea (mensajes en chat). Sin merge a `main` aún. |
| **Producción (`main`)** | `origin/main` = `ab8a093` (PR #769) = §139 + SP-5.3 Fase 0+1. **Detalle aún LEGACY en prod** hasta mergear Fase 2/3 (incluye cache bump). Tras merge: validar Ctrl+Shift+R. |
| **Deploys backend pendientes** | Ninguno (firestore.rules / functions sin cambios). |

## ⚠️ Flags de riesgo activos
- ⚠️ **E2E SP-1 requiere deploy a `main`** (L-08: Auth/Firebase bloquea localhost por referrer; única E2E real es contra `altorracars.github.io`). **Recipe**: merge → esperar ~1-2 min GitHub Pages → Ctrl+Shift+R → checklist. **Rollback ready**: `git revert <sha>` + push devuelve el diseño viejo en ~1 min. Riesgo aceptado: ventana de minutos con cinematic visible mientras se valida.
- Conflicto cron↔cache al fusionar = patrón conocido (`git merge origin/main`, L-02).

## 🧩 Sub-sistemas (resumen)
`js/` modular ✅ · **rediseño index cinematic vanilla** (`css/home/*` + `js/public/home/*`) ✅ · cerebro autónomo ✅ · SEO ✅ · bot/RBAC/Hub estables ✅
