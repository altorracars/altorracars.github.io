# 🩺 05 — ESTADO GLOBAL (Heartbeat · Snapshot de salud del sistema)

> **Nodo: signos vitales.** AUTO-CARGA (con `CLAUDE.md` + `10`). Tablero, no bitácora: solo señales
> ACTUALES (pisar, no apilar); lo histórico vive en `99` (ADR). Tope ~25 líneas / ~2.8k chars (§G.5).

| Señal | Valor (última actualización: **2026-06-11 madrugada**) |
|---|---|
| **Build** | 🟢 **CRM §176: E0→E4 COMPLETAS ✅** (§177-§186). E4: post-venta F10 + agregado vehículo F25 (badge 'Apartado' en web) + colisión F26 + Comisiones F42. **FIX: pipeline de páginas estáticas roto desde 25/05** (yml). Pendiente commit local + merge del cliente. Retomar: **"continúa E5"** (blindaje). |
| **Cache version vigente** | **`v20260611031500`** (§186). SW == cache-manager ✅. Ctrl+Shift+R la 1ª vez. |
| **Branch activa** | `refactor/estructura` — mergeado a `main` hasta §185 (`4b68f2a` ✓); **E4 (§186) aún sin commit/merge**. Deploys firebase = Claude (§1). |
| **Producción (`main`+functions)** | Portal CRM v2: Pipeline v3 + **Post-venta** · lead rápido offline · SLA+rotación · calendario único (§184) · CRUD/1581 (§185) · daily/hourly jobs · **22 functions CRM LIVE** (+`crmCrearBorradorRetoma`; `onDealUpdated` ahora con retry). Rules+índice E4 desplegados. |

## ⚠️ Flags de riesgo activos
- 🔒 **Blindaje** (canónico → `41-SEGURIDAD §Runbook`): SEC-03/04 LIVE ✅ · App Check monitor · SEC-01 RBAC-read pendiente (→E5) · Legal `42` (gate abogado, F14 en E3 lo necesita).
- 🟡 **Festivos**: migrados al SSoT SOLO cuando el dueño toque **"🇨🇴 Cargar festivos 2026"** (portal→Disponibilidad). Hasta entonces el validador clásico no avisa festivos (la web tampoco los bloqueaba — ventana benigna, §184.7).
- 🔴 **Billing GCP se cayó ~2h el 2026-06-09** (recuperado, L-38). **Causa SIN identificar (cliente: console.cloud.google.com/billing)** o se repetirá.
- 🧹 Cliente: merge tanda 2 + Ctrl+Shift+R + clic festivos + anunciar F42.
- ✅ Verificar mañana: 1ª corrida `crmDailyJob` 5am (digest F28 v2 en `crm_alerts`; fantasmas feb-abr + basura feb de availability deben desaparecer + reconcile dedup backfillea contactos existentes).
- ⚖️ Texto legal PÚBLICO de supresión/privacidad = gate P4 (abogado, `42-LEGAL`) — el mecanismo F14 ya está live.
- cron↔cache = patrón conocido (L-02, hija `31-LECCIONES-GIT`).

## 🧩 Sub-sistemas (resumen)
`js/` modular ✅ · index cinematic vanilla ✅ · cerebro autónomo ✅ (v6 en ejecución) · SEO ✅ · bot/RBAC/Hub estables ✅ (ALTOR diferido)
