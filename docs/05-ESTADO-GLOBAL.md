# 🩺 05 — ESTADO GLOBAL (Heartbeat · Snapshot de salud del sistema)

> **Nodo neuronal: signos vitales.** Se **AUTO-CARGA** (junto a `CLAUDE.md` +
> `10-CORTO-PLAZO`). Responde *"¿en qué estado está el sistema AHORA, antes de
> tocar nada?"*. Lo lee el **Reflejo de Auto-auditoría (`CLAUDE.md §G.4`)** al arrancar.
>
> **Mantenimiento (Reflejo de Frescura §G.4)**: actualizar al cambiar cache version,
> branch, build o al detectar/resolver un riesgo. **Tope ~25 líneas (§G.5)** — es un
> tablero, no una bitácora.

| Señal | Valor (al 2026-06-03) |
|---|---|
| **Build** | 🟢 Catálogo cinematic + a11y **en producción**. **Cerebro ENDURECIDO (§156)**: hooks deterministas (`pre-commit` bloquea commit con cerebro roto + `SessionStart` corre `brain:check` cada sesión), Consejo Externo (neurona 15), regla verifica-no-asumas universal (§3.3+M-11), inventario+limpieza skills. **🏗️ PRÓXIMO (sesión nueva): RECONSTRUCCIÓN DEL CRM** (skill `crm-architect`; handoff en `10`). `brain:check` SANO (hooks lo blindan). Ver ADR §150–§156. |
| **Cache version vigente** | **`v20260602140000`** (§150.f) — desplegada en `main`. SW = cache-manager (match ✅, lo valida `brain:check §4a`). §151–§156 brain-only (no tocan cache). |
| **Branch activa** | `refactor/estructura` — **commit masivo del cerebro (§156) STAGED + validado por el pre-commit, PENDIENTE de pushear**; inventario skills + skill `crm-architect` ya commiteados (`1d0e4d5` / `6cc0055`). `origin/main` avanza por cron/PRs (sha → `git`, no se pinea). |
| **Producción (`main`)** | `origin/main` = **catálogo cinematic + dropdown depurado (§150) + cerebro V5-lean/tooling (§151–§154)** LIVE. Sin regresiones. El sha exacto avanza por cron/PRs (no se pinea aquí → `git`). ⏳ QA visual Ctrl+Shift+R (L-08). |
| **Deploys backend pendientes** | Ninguno (firestore.rules / functions sin cambios). |

## ⚠️ Flags de riesgo activos
- ⚠️ **E2E SP-1 requiere deploy a `main`** (L-08: Auth/Firebase bloquea localhost por referrer; única E2E real es contra `altorracars.github.io`). **Recipe**: merge → esperar ~1-2 min GitHub Pages → Ctrl+Shift+R → checklist. **Rollback ready**: `git revert <sha>` + push devuelve el diseño viejo en ~1 min. Riesgo aceptado: ventana de minutos con cinematic visible mientras se valida.
- Conflicto cron↔cache al fusionar = patrón conocido (`git merge origin/main`, L-02).

## 🧩 Sub-sistemas (resumen)
`js/` modular ✅ · **rediseño index cinematic vanilla** (`css/home/*` + `js/public/home/*`) ✅ · cerebro autónomo ✅ · SEO ✅ · bot/RBAC/Hub estables ✅
