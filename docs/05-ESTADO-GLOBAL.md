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
| **Build** | 🟢 Catálogo cinematic + a11y **en producción**. **BLOQUE §150 COMPLETO y DESPLEGADO**: near-black + skip-link removido + QuickTools fijo + dropdown cross-page (§150.d fix layout 120→580px) + §150.e/§150.f **dropdown depurado** (`busqueda.html` ignora `?tipo=` pero el filtro nuevo/usado YA existe en panel "Tipo de Vehículo"; ahora "Por categoría" + CTA "Ver todos"). **§140–§151 en `main`** (incl. cerebro V5-lean §151); **§152** (reflejo pre-cierre) + **§153** (brain-check frescura) en working tree. Lóbulo §48 → 5/6. Ver ADR §150–§153 + L-23/L-24. |
| **Cache version vigente** | **`v20260602140000`** (§150.f) — commiteada + en `main`. SW = cache-manager (match ✅, lo valida `brain:check §4a`). §151–§153 brain-only (no tocan cache). ⚠️ `main` puede tener cache mayor por cron → L-02 al sincronizar. |
| **Branch activa** | `refactor/estructura` — **working tree = §152 + §153 SIN commit** (gobernanza + `scripts/brain-check.mjs`, brain-only). Lo demás (§140–§151) ya en `main` (último PR#787). `origin/main` avanza por cron/PRs (el sha de Producción es snapshot). |
| **Producción (`main`)** | `origin/main` = **`9f8d861`** (PR #787) = catálogo cinematic (§140–§146) + §149–§151 (dropdown depurado + cerebro V5-lean) LIVE. Sin regresiones. ⏳ QA visual Ctrl+Shift+R (L-08). |
| **Deploys backend pendientes** | Ninguno (firestore.rules / functions sin cambios). |

## ⚠️ Flags de riesgo activos
- ⚠️ **E2E SP-1 requiere deploy a `main`** (L-08: Auth/Firebase bloquea localhost por referrer; única E2E real es contra `altorracars.github.io`). **Recipe**: merge → esperar ~1-2 min GitHub Pages → Ctrl+Shift+R → checklist. **Rollback ready**: `git revert <sha>` + push devuelve el diseño viejo en ~1 min. Riesgo aceptado: ventana de minutos con cinematic visible mientras se valida.
- Conflicto cron↔cache al fusionar = patrón conocido (`git merge origin/main`, L-02).

## 🧩 Sub-sistemas (resumen)
`js/` modular ✅ · **rediseño index cinematic vanilla** (`css/home/*` + `js/public/home/*`) ✅ · cerebro autónomo ✅ · SEO ✅ · bot/RBAC/Hub estables ✅
