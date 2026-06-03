# 🩺 05 — ESTADO GLOBAL (Heartbeat · Snapshot de salud del sistema)

> **Nodo neuronal: signos vitales.** Se **AUTO-CARGA** (junto a `CLAUDE.md` +
> `10-CORTO-PLAZO`). Responde *"¿en qué estado está el sistema AHORA, antes de
> tocar nada?"*. Lo lee el **Reflejo de Auto-auditoría (`CLAUDE.md §G.4`)** al arrancar.
>
> **Mantenimiento (Reflejo de Frescura §G.4)**: actualizar al cambiar cache version,
> branch, build o al detectar/resolver un riesgo. **Tope ~25 líneas (§G.5)** — es un
> tablero, no una bitácora.

| Señal | Valor (al 2026-06-02) |
|---|---|
| **Build** | 🟢 Catálogo cinematic + a11y **en producción**. Bloque §150 (dropdown depurado §150.d–f) + cerebro V5-lean/tooling §151–§154 **COMPLETOS y commiteados** (HEAD `6cc0055`; `brain:check` valida frescura + refs cruzadas = **0 huecos estructurales**). **🏗️ PRÓXIMO (sesión nueva): RECONSTRUCCIÓN DEL CRM** con skill `crm-architect` — ver handoff en `10`. Lóbulo §48 → 5/6. Ver ADR §150–§154. |
| **Cache version vigente** | **`v20260602140000`** (§150.f) — desplegada en `main`. SW = cache-manager (match ✅, lo valida `brain:check §4a`). §151–§154 + skill CRM brain-only (no tocan cache). |
| **Branch activa** | `refactor/estructura` — **working tree LIMPIO, todo commiteado** (§150–§154 + skill `crm-architect`, HEAD `6cc0055`). §150–§154 ya en `main`; la skill `crm-architect` (`6cc0055`) + los docs de ESTE handoff son lo único local (commitéalos). `origin/main` avanza por cron/PRs (sha → `git`, no se pinea). |
| **Producción (`main`)** | `origin/main` = **catálogo cinematic + dropdown depurado (§150) + cerebro V5-lean/tooling (§151–§154)** LIVE. Sin regresiones. El sha exacto avanza por cron/PRs (no se pinea aquí → `git`). ⏳ QA visual Ctrl+Shift+R (L-08). |
| **Deploys backend pendientes** | Ninguno (firestore.rules / functions sin cambios). |

## ⚠️ Flags de riesgo activos
- ⚠️ **E2E SP-1 requiere deploy a `main`** (L-08: Auth/Firebase bloquea localhost por referrer; única E2E real es contra `altorracars.github.io`). **Recipe**: merge → esperar ~1-2 min GitHub Pages → Ctrl+Shift+R → checklist. **Rollback ready**: `git revert <sha>` + push devuelve el diseño viejo en ~1 min. Riesgo aceptado: ventana de minutos con cinematic visible mientras se valida.
- Conflicto cron↔cache al fusionar = patrón conocido (`git merge origin/main`, L-02).

## 🧩 Sub-sistemas (resumen)
`js/` modular ✅ · **rediseño index cinematic vanilla** (`css/home/*` + `js/public/home/*`) ✅ · cerebro autónomo ✅ · SEO ✅ · bot/RBAC/Hub estables ✅
