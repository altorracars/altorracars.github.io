# 🩺 05 — ESTADO GLOBAL (Heartbeat · Snapshot de salud del sistema)

> **Nodo: signos vitales.** AUTO-CARGA (con `CLAUDE.md` + `10`). Tablero, no bitácora: solo señales
> ACTUALES (pisar, no apilar); lo histórico vive en `99` (ADR). Tope ~25 líneas / ~2.8k chars (§G.5).

| Señal | Valor (última actualización: **2026-06-23**) |
|---|---|
| **Build** | 🟢 Todo en `main` (último merge 22/06 #896): **borradores TODO-24 f1+2 LIVE** (recuperación local opt-in §107-safe + aislamiento por-cuenta, §227; f3 Storage: 406 fotos huérfanas PURGADAS ✅ §230) + **E6 cutover 6/6** + **RBAC ④a COMPLETO** (§219; **④b PARQUEADO** → floor server-side antes de enforce `nivel`) + **CMS por marca COMPLETO** (§220-§226). Vender=Pipeline. dealers F2 (TODO-25). |
| **Cache version vigente** | **`v20260623030518`** (cron-CI 23/06; el cron es DUEÑO del bump → NO bump manual en rama, evita L-02/L-03; invalida con Ctrl+Shift+R). SW == cache-manager ✅. `dev` sincronizada a `origin/main` (merge cron limpio). |
| **Branch activa** | 🟢 **Rama ÚNICA de trabajo `dev`** (§231): commit+push=Claude SIEMPRE en `dev`; **merge `dev`→`main`=dueño web** (§2); sync `dev` a `origin/main` al arrancar; borrar ramas mergeadas (viejas borradas 22/06 → solo `main`+`dev`). Deploys firebase=Claude (§1). Maratón 22/06 (§229-§231) en `dev`, pend merge. |
| **Producción (`main`+functions)** | Portal CRM v2: Pipeline v3 + Post-venta · SLA+rotación · calendario único · CRUD · daily/hourly jobs · 22 functions CRM (**retry:true ×6**) · Rules E5 LIVE. App Check MONITOR (100% verif Storage/Auth/Firestore; enforce DIFERIDO — riesgo lead-block silencioso + tráfico bajo, §41). |

## ⚠️ Flags de riesgo activos
- 🤖 **Modelo de trabajo: Opus 4.8** (Fable 5 NO disponible, 2026-06-12). Cada entrega marcada **`⟦OPUS-4.8 · rev-Fable⟧`** (rev. cuando Fable vuelva; dueño avisa). Detalle → `10` + memoria.
- 🔒 **Blindaje** (canónico → `41-SEGURIDAD §Runbook`): SEC-03/04 LIVE ✅ · App Check monitor · SEC-01 RBAC-read pendiente (→E5) · Legal `42` (gate abogado, F14 en E3 lo necesita).
- 🔴 **Billing GCP se cayó ~2h el 2026-06-09** (recuperado, L-38). **Causa SIN identificar (cliente: console.cloud.google.com/billing)** o se repetirá.
- 🧹 Cliente: descartar lead de prueba `VMVMJG…` (Bandeja → spam_prueba) + anunciar F42. (Festivos ✅ en `config/availability`.)
- 📊 App Check: 403 de reCAPTCHA al bot del E2E = esperado (monitor OK); gate de enforce con tráfico humano → lóbulo `41`.
- ⚖️ Texto legal PÚBLICO de supresión/privacidad = gate P4 (abogado, `42-LEGAL`) — el mecanismo F14 ya está live.
- cron↔cache = patrón conocido (L-02, hija `31-LECCIONES-GIT`).

## 🧩 Sub-sistemas (resumen)
`js/` modular ✅ · index cinematic vanilla ✅ · cerebro autónomo ✅ (v6 en ejecución) · SEO ✅ · bot/RBAC/Hub ✅ (**EPIC ALTOR Hub v2 EN CURSO = foco único**: arquitectura Opción A decidida; **F1.a✅** techo-gasto + **F2.a✅** cédula-fuera + **F2.b✅** WhatsApp-gate+voz-Colombia en `dev`; LLM apagado `_brain.enabled=false`; 🔜 resto F1→F3. Detalle→spec TODO-34 §EPIC)
