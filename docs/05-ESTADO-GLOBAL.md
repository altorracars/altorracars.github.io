# 🩺 05 — ESTADO GLOBAL (Heartbeat · Snapshot de salud del sistema)

> **Nodo: signos vitales.** AUTO-CARGA (con `CLAUDE.md` + `10`). Tablero, no bitácora: solo señales
> ACTUALES (pisar, no apilar); lo histórico vive en `99` (ADR). Tope ~25 líneas / ~2.8k chars (§G.5).

| Señal | Valor (última actualización: **2026-06-12 madrugada**) |
|---|---|
| **Build** | 🟢 **CRM §176: E0→E5 ✅ en main. E6 EN CURSO**: E6.6 ✅ · paso 0 ✅ · fase ② ✅ (§190-§191) · **fase ③: Marcas §192 + Atributos §194 + backup §195 en main · gap 5 Agenda walk-in ✅ (§196, commit local)**. Siguiente: gates ②/③ (tras F39 dueño — sin evidencia a 12/06) + **vehicles = ÉPICA EN SESIÓN FRESCA** → dealers (decisión D5-03). |
| **Cache version vigente** | **`v20260612052500`** (§188 paso 0). SW == cache-manager ✅. Ctrl+Shift+R tras merge. |
| **Branch activa** | `refactor/estructura` — §193.2-bis en `main` (PR #839 ✓). **Local sin push: gap 5 §196.** Deploys firebase = Claude (§1). |
| **Producción (`main`+functions)** | Portal CRM v2: Pipeline v3 + Post-venta · lead rápido offline · SLA+rotación · calendario único (§184) · CRUD/1581 (§185) · E4 (§186) · daily/hourly jobs · 22 functions CRM con **retry:true ×6** · Rules E5 LIVE (whitelists públicos + read estricto). App Check MONITOR (enforce ~16-23/06 → lóbulo `41`). |

## ⚠️ Flags de riesgo activos
- 🔒 **Blindaje** (canónico → `41-SEGURIDAD §Runbook`): SEC-03/04 LIVE ✅ · App Check monitor · SEC-01 RBAC-read pendiente (→E5) · Legal `42` (gate abogado, F14 en E3 lo necesita).
- 🔴 **Billing GCP se cayó ~2h el 2026-06-09** (recuperado, L-38). **Causa SIN identificar (cliente: console.cloud.google.com/billing)** o se repetirá.
- 🧹 Cliente: push/merge E5 + Ctrl+Shift+R + descartar lead de prueba `VMVMJG…` (Bandeja → spam_prueba) + anunciar F42. (Festivos ✅ cargados 12/06 — verificado en `config/availability`.)
- ✅ Verificar HOY 12/06 tras 5am: 1ª corrida `crmDailyJob` con bloques E4 (digest F28 v2 en `crm_alerts`; fantasmas feb-abr fuera + reconcile dedup backfillea).
- 📊 App Check: 403 de reCAPTCHA al bot del E2E = esperado (monitor OK); gate de enforce con tráfico humano → lóbulo `41`.
- ⚖️ Texto legal PÚBLICO de supresión/privacidad = gate P4 (abogado, `42-LEGAL`) — el mecanismo F14 ya está live.
- cron↔cache = patrón conocido (L-02, hija `31-LECCIONES-GIT`).

## 🧩 Sub-sistemas (resumen)
`js/` modular ✅ · index cinematic vanilla ✅ · cerebro autónomo ✅ (v6 en ejecución) · SEO ✅ · bot/RBAC/Hub estables ✅ (ALTOR diferido)
