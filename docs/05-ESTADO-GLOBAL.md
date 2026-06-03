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
| **Build** | 🟢 Catálogo cinematic + a11y en prod. **BLOQUE DE DISEÑO §150 COMPLETO**: de-blue→near-black + skip-link removido + QuickTools fijo + dropdown cross-page + **§150.d FIX layout dropdown** (panel 120px→580px, fix `.nav-dd-pro{max-width:none}` vs `*{max-width:100%}` global, render-verificado) + **§150.e** quitado enlace DUPLICADO "Camionetas" (=Pickup) del dropdown. §150→**§150.d** commiteados (§150.d=`85972ab`, en rama); **§150.e SIN commit**. Lóbulo §48 → 5/6 (A11Y-04 descartado). Ver ADR §150 + L-23. |
| **Cache version vigente** | **`v20260602130000`** (§150.e, **SIN commit**); §150.d `v…602120000` commiteado (`85972ab`); §150.c + previos desplegados. SW = cache-manager (match ✅). |
| **Branch activa** | `refactor/estructura` — §140→§150.c commiteados (cliente mergea por PR a `main`; ojo conflicto cron↔cache L-02). **§150.e en working tree SIN commit** (código: `index.html` + `snippets/header.html` + SW + cache-manager; + docs); §150.d commiteado (`85972ab`). |
| **Producción (`main`)** | `origin/main` = `8da557a` = catálogo 100% cinematic (§140–§146) + §149/§150/§150.b/§150.c. Sin regresiones. Rama local diverge (adelante). ⏳ QA visual Ctrl+Shift+R (L-08). |
| **Deploys backend pendientes** | Ninguno (firestore.rules / functions sin cambios). |

## ⚠️ Flags de riesgo activos
- ⚠️ **E2E SP-1 requiere deploy a `main`** (L-08: Auth/Firebase bloquea localhost por referrer; única E2E real es contra `altorracars.github.io`). **Recipe**: merge → esperar ~1-2 min GitHub Pages → Ctrl+Shift+R → checklist. **Rollback ready**: `git revert <sha>` + push devuelve el diseño viejo en ~1 min. Riesgo aceptado: ventana de minutos con cinematic visible mientras se valida.
- Conflicto cron↔cache al fusionar = patrón conocido (`git merge origin/main`, L-02).

## 🧩 Sub-sistemas (resumen)
`js/` modular ✅ · **rediseño index cinematic vanilla** (`css/home/*` + `js/public/home/*`) ✅ · cerebro autónomo ✅ · SEO ✅ · bot/RBAC/Hub estables ✅
