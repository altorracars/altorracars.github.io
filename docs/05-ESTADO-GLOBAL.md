# 🩺 05 — ESTADO GLOBAL (Heartbeat · Snapshot de salud del sistema)

> **Nodo neuronal: signos vitales.** Se **AUTO-CARGA** (junto a `CLAUDE.md` +
> `10-CORTO-PLAZO`). Responde *"¿en qué estado está el sistema AHORA, antes de
> tocar nada?"*. Lo lee el **Reflejo de Auto-auditoría (`CLAUDE.md §G.4`)** al arrancar.
>
> **Mantenimiento (Reflejo de Frescura §G.4)**: actualizar al cambiar cache version,
> branch, build o al detectar/resolver un riesgo. **Tope ~25 líneas (§G.5)** — es un
> tablero, no una bitácora.

| Señal | Valor (al 2026-06-06) |
|---|---|
| **Build** | 🟢 Catálogo cinematic + a11y **en producción**. Cerebro ENDURECIDO (§156). **🏗️ CRM: Fase 1 (ingestión canónica `onSolicitudCreated`) LIVE + Fase 2 (Bandeja Inteligente, app `admin-app/` greenfield Vite + Firebase modular) CONSTRUIDA** — `npm run build` verde, verificada en `?mock=1` (snapshot+eval), 2 bugs cazados+fixeados. ⏳ Falta deploy de `dist/` + E2E live. `brain:check` SANO. Ver ADR §150–§159. |
| **Cache version vigente** | **`v20260605120000`** (§157) — fix rectángulo negro del hero (`<footer class=cin-hero-foot>` heredaba `body footer{background}` de dark-theme → `.cin-hero-foot{background:transparent}`). SW = cache-manager (match ✅, lo valida `brain:check §4a`). PREV `v20260602140000` §150.f. ⏳ pendiente deploy + QA. |
| **Branch activa** | `refactor/estructura`. **SIN commitear**: árbol nuevo `admin-app/` (Fase 2 completa, incl. `dist/`) + `firestore.rules` (subrule `crmNotes`) + `.claude/launch.json` + consolidación cerebro (§158/§159 en `99`/`00`, L-27/28 en `30`, `05`/`10`/`20`). Fase 1 (`functions/src/ingestion/`+reglas) ya commiteada+pusheada (sesión previa). El fix del hero §157 sigue en esta rama, **NO en `main`** (Pages sirve `main`). Mensaje de commit Fase 2 entregado (M-12). |
| **Producción (`main`)** | `origin/main` = **catálogo cinematic + dropdown depurado (§150) + cerebro V5-lean/tooling (§151–§154)** LIVE. Sin regresiones. El sha exacto avanza por cron/PRs (no se pinea aquí → `git`). ⏳ QA visual Ctrl+Shift+R (L-08). |
| **Deploys pendientes** | ✅ **Fase 1 CRM DESPLEGADA** (2026-06-05): `onSolicitudCreated` + `firestore:rules,indexes` **LIVE** en `altorra-cars`. ⏳ **Fase 2**: (a) deploy ESTÁTICO = commit+push de `admin-app/` (+`dist/`) → Pages en `/admin-app/dist/`; (b) **`firebase deploy --only firestore:rules`** (subrule `contacts/{id}/crmNotes` para las Notas del 360). Tras ambos → E2E **live** (L-08). |

## ⚠️ Flags de riesgo activos
- ⚠️ **E2E SP-1 requiere deploy a `main`** (L-08: Auth/Firebase bloquea localhost por referrer; única E2E real es contra `altorracars.github.io`). **Recipe**: merge → esperar ~1-2 min GitHub Pages → Ctrl+Shift+R → checklist. **Rollback ready**: `git revert <sha>` + push devuelve el diseño viejo en ~1 min. Riesgo aceptado: ventana de minutos con cinematic visible mientras se valida.
- Conflicto cron↔cache al fusionar = patrón conocido (`git merge origin/main`, L-02).

## 🧩 Sub-sistemas (resumen)
`js/` modular ✅ · **rediseño index cinematic vanilla** (`css/home/*` + `js/public/home/*`) ✅ · cerebro autónomo ✅ · SEO ✅ · bot/RBAC/Hub estables ✅
