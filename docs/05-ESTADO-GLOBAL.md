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
| **Build** | 🟢 **Catálogo 100% cinematic (§122–§146).** §140 detalle en prod (PR #771); §141–§145 commiteados+pusheados (`f0471f1` §141-144 + `e7379f1` §145: nav Marcas + marcas.html). **§146 (4 landings SEO `vehiculos-{suv,pickup,sedan,hatchback}.html`) SIN commit.** Solo quedan 3 redirects invisibles (intencional). ⏳ Validar en prod. |
| **Cache version vigente** | `v20260531360000` (§146, SIN commit; §141–§145 `v…350000` commiteados+pusheados en `refactor/estructura`; prod-`main` aún `v…300000`/§140). |
| **Branch activa** | `refactor/estructura` HEAD `e7379f1` (§145, = `origin`, sincronizada). **§146 en working tree SIN commit.** Commitea §146 (mensajes en chat). Merge a `main` (§141–§146) cuando el cliente lo decida. |
| **Producción (`main`)** | `origin/main` = `ae1bc7e` (PR #771) = SP-5.3 completo (Fases 0–3) + §139. **Detalle ahora CINEMATIC en prod.** ⏳ Validar Ctrl+Shift+R (E2E real, L-08). |
| **Deploys backend pendientes** | Ninguno (firestore.rules / functions sin cambios). |

## ⚠️ Flags de riesgo activos
- ⚠️ **E2E SP-1 requiere deploy a `main`** (L-08: Auth/Firebase bloquea localhost por referrer; única E2E real es contra `altorracars.github.io`). **Recipe**: merge → esperar ~1-2 min GitHub Pages → Ctrl+Shift+R → checklist. **Rollback ready**: `git revert <sha>` + push devuelve el diseño viejo en ~1 min. Riesgo aceptado: ventana de minutos con cinematic visible mientras se valida.
- Conflicto cron↔cache al fusionar = patrón conocido (`git merge origin/main`, L-02).

## 🧩 Sub-sistemas (resumen)
`js/` modular ✅ · **rediseño index cinematic vanilla** (`css/home/*` + `js/public/home/*`) ✅ · cerebro autónomo ✅ · SEO ✅ · bot/RBAC/Hub estables ✅
