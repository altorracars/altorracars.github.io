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
| **Build** | 🟢 Catálogo cinematic + a11y **en producción**. Cerebro ENDURECIDO (§156). **🏗️ CRM rebuild — portal `admin-app/` (Vite + Firebase modular): NÚCLEO COMPLETO, 5 superficies LIVE (sin "Pronto")**: Bandeja+360 (§159), Pipeline `deals` (§160), Agenda (§161), **Reportes/KPIs (§165)**, **Contactos/directorio (§166)**. Captura completa: web + MANUAL (§162) + AUTO registro (§163) + newsletter (§164). Determinista, $0, charts SVG/CSS, agregación cliente. Todo verificado `?mock=1` + revisión adversarial; DESPLEGADO a `main` (sin reglas/índices/functions/cache). ⏳ Solo falta **E2E live** del cliente. `brain:check` SANO. Ver ADR §150–§166. |
| **Cache version vigente** | **`v20260608231721`** (§169 — App Check anti-spam en sitio público: `firebase-config.js` carga `app-check-compat` no-bloqueante + activa monitor sobre app namespaced). SW = cache-manager (match ✅). PREV `v20260606120000` §164. Ctrl+Shift+R la 1ª vez. |
| **Branch activa** | `refactor/estructura` (en sync con `main`; último deploy de fase: §167). §157–§167 LIVE en `main`. **🔀 Flujo git (cliente actualizó 2026-06-08)**: **Claude hace SOLO el commit**; el **push y el merge a `main` los hace el cliente, SIEMPRE**. (Deroga el flujo viejo de "Claude mergea+pushea"; el `firebase deploy` de rules/functions sigue siendo de Claude, §1.) |
| **Producción (`main`)** | `origin/main` = catálogo cinematic + §150–§154 + **§157 hero + CRM NÚCLEO COMPLETO §158–§166** (ingestión, Bandeja/360, Pipeline, Agenda, Reportes, **Contactos**) + captura manual/AUTO LIVE en `/admin-app/dist/`. El sha avanza por cron/PRs (→`git`). ⏳ QA visual Ctrl+Shift+R (L-08). |
| **Deploys** | ✅ Fase 1–4 + Contactos + captura manual/AUTO LIVE. **§166 Contactos** (esta sesión): solo `admin-app/dist/` (commit + merge + push `main`); **sin rules/indexes/functions/cache**. ⏳ **Backfill** = N/A por ahora (sin datos viejos; web en lanzamiento) + **E2E live** (L-08). |

## ⚠️ Flags de riesgo activos
- ⚠️ **E2E SP-1 requiere deploy a `main`** (L-08: Auth/Firebase bloquea localhost por referrer; única E2E real es contra `altorracars.github.io`). **Recipe**: merge → esperar ~1-2 min GitHub Pages → Ctrl+Shift+R → checklist. **Rollback ready**: `git revert <sha>` + push devuelve el diseño viejo en ~1 min. Riesgo aceptado: ventana de minutos con cinematic visible mientras se valida.
- 🔒 **Blindaje** (`41-SEGURIDAD`, ADR §169): SEC-03 (tope costo) + SEC-04 (candado Telegram) **LIVE ✅** (deploy functions 2026-06-08). **App Check anti-spam monitor LIVE** (site key registrada; observar % Verified → enforce) + **SEC-01** RBAC-read (Opción A vía Gemini; pre-seed+OK antes de deploy). Legal `42-LEGAL` (gate abogado). · 🧠 **Cerebro multi-proyecto**: §170 ENMENDADO §171 → **CERTIFICADO Mandato 3 (§172)**. Falencia curada con **Reflejo de Captura de Deliberación en §G.4** (verificado grep, no declarado). Cura **propagada a los 3 cerebros ✅** (§G.4, verificado grep). **DECISIÓN: cerebros INDEPENDIENTES** — sin sync automático; copia manual de una mejora genérica cuando valga; Opción C (sync) solo si se crece a muchos repos. Veredicto → spec `…VEREDICTO`. · cron↔cache = patrón conocido (L-02).

## 🧩 Sub-sistemas (resumen)
`js/` modular ✅ · **rediseño index cinematic vanilla** (`css/home/*` + `js/public/home/*`) ✅ · cerebro autónomo ✅ · SEO ✅ · bot/RBAC/Hub estables ✅
