# 🩺 05 — ESTADO GLOBAL (Heartbeat · Snapshot de salud del sistema)

> **Nodo: signos vitales.** AUTO-CARGA (con `CLAUDE.md` + `10`). Tablero, no bitácora: solo señales
> ACTUALES (pisar, no apilar); lo histórico vive en `99` (ADR). Tope ~25 líneas / ~2.8k chars (§G.5).

| Señal | Valor (última actualización: **2026-06-20**) |
|---|---|
| **Build** | 🟢 Todo en `main` (mergeado 20/06): **E6 cutover 6/6** + **④ RBAC ④a COMPLETO** (PASO 0-6, §219; config dueño hecha: 4 deptos + backfill + Francisco→Dirección) + **CMS cobaya COMPLETA E2E** (ADR §220 — editor "Acerca de" por marca: módulo `cms-dinamico` panel nuevo, gate `content.edit`, regla `siteContent` desplegada, cron hornea `aboutBrand` con escapeHtml; FASE 0 seguridad 0.1-0.5). **④b PARQUEADO** (dueño: 2 personas ven todo; al retomar = floor server-side antes de enforce `nivel`). Vender=Pipeline. dealers F2 (TODO-25). |
| **Cache version vigente** | **`v20260620165624`** (cron-CI tras el merge del 20/06; el cron es DUEÑO del bump → NO bump manual en rama, evita L-02/L-03; invalida con Ctrl+Shift+R). SW == cache-manager ✅. |
| **Branch activa** | `refactor/estructura` == `main` (ff a `ca33848` tras merge dueño 20/06 + cron). Sesión 20/06: 14 commits (RBAC §219 + CMS §220) MERGEADOS. **commit+push=Claude · merge=dueño web** (§2). deploys firebase=Claude (§1). Verificado vs git 20/06 (§3.3). |
| **Producción (`main`+functions)** | Portal CRM v2: Pipeline v3 + Post-venta · SLA+rotación · calendario único · CRUD · daily/hourly jobs · 22 functions CRM (**retry:true ×6**) · Rules E5 LIVE. App Check MONITOR (enforce ~16-23/06 → lóbulo `41`). |

## ⚠️ Flags de riesgo activos
- 🤖 **Modelo de trabajo: Opus 4.8** (Fable 5 NO disponible, 2026-06-12). Cada entrega marcada **`⟦OPUS-4.8 · rev-Fable⟧`** (rev. cuando Fable vuelva; dueño avisa). Detalle → `10` + memoria.
- 🔒 **Blindaje** (canónico → `41-SEGURIDAD §Runbook`): SEC-03/04 LIVE ✅ · App Check monitor · SEC-01 RBAC-read pendiente (→E5) · Legal `42` (gate abogado, F14 en E3 lo necesita).
- 🔴 **Billing GCP se cayó ~2h el 2026-06-09** (recuperado, L-38). **Causa SIN identificar (cliente: console.cloud.google.com/billing)** o se repetirá.
- 🧹 Cliente: descartar lead de prueba `VMVMJG…` (Bandeja → spam_prueba) + anunciar F42. (Festivos ✅ en `config/availability`.)
- 📊 App Check: 403 de reCAPTCHA al bot del E2E = esperado (monitor OK); gate de enforce con tráfico humano → lóbulo `41`.
- ⚖️ Texto legal PÚBLICO de supresión/privacidad = gate P4 (abogado, `42-LEGAL`) — el mecanismo F14 ya está live.
- cron↔cache = patrón conocido (L-02, hija `31-LECCIONES-GIT`).

## 🧩 Sub-sistemas (resumen)
`js/` modular ✅ · index cinematic vanilla ✅ · cerebro autónomo ✅ (v6 en ejecución) · SEO ✅ · bot/RBAC/Hub estables ✅ (ALTOR diferido)
