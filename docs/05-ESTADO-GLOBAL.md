# 🩺 05 — ESTADO GLOBAL (Heartbeat · Snapshot de salud del sistema)

> **Nodo: signos vitales.** AUTO-CARGA (con `CLAUDE.md` + `10`). Tablero, no bitácora: solo señales
> ACTUALES (pisar, no apilar); lo histórico vive en `99` (ADR). Su tope lo fija el manifest (§G.5).

| Señal | Valor (última actualización: **2026-09-01**) |
|---|---|
| **Build** | ⏸️ **CARS EN PAUSA (pivote §302): prioridad #1 = INMOBILIARIA**, que **LIDERA el cerebro ×4** (traspaso 18/07; kernel vía `brain:pull` del canónico, hoy **v1.29.0**). Kickoff → **`specs/2026-07-10-INMOBILIARIA-KICKOFF-fable5.md`**. Último estado cars: 🟢 código @ `5e8c4762`; perf-v2 Ola 1 LIVE (§298: ord 95 · móvil 57 · LCP 662ms); `dev`/`main` **divergen SIEMPRE por diseño** (`main` acumula el bot, `dev` el cerebro y se mergea hacia adelante; último: 27-ago). Contar commits aquí caduca solo. **Reanudar = caminos A/B/C (§298.7 y `10`)**; gates dueño aparcados (§283-298); Cloudflare 🚫 solo-cars. |
| **Cache / branch** | ⚙️ **Valores → `docs/.estado-auto.md`** (heartbeat): rama, HEAD, sucios, caché del SW, deuda de consolidación (copiarlos aquí reincidía [[L-02]]; el dueño es el cron y git). Reglas: rama ÚNICA `dev` (§231) · **merge `dev`→`main` y deploys = Claude** (§1-2) · **NUNCA bump manual de caché en rama**. |
| **Producción (`main`+functions)** | Portal CRM v2 LIVE (Pipeline v3 · Post-venta · SLA/rotación · calendario · CRUD · jobs daily/hourly · 23 functions con **retry ×6** + DLQ F-5 · Rules E5). 🌐 Web pública `verificado-vivo: 2026-08-27` (curl 200 + título); el sello cubre **solo la web** (functions/Rules exigen credenciales). |

## ⚠️ Flags de riesgo activos
- 🧠 **Fiabilidad cerebro: M-22 mecanizada ✅** (check #16 ×4); M-25 (registros que se contradicen) → `32`. Adopción `verificado-vivo:` = **3 de 4 repos** (falta **insema**, que sí tiene el chequeo: §305 C-02).
- 🤖 **Modelo: OPUS 5 para TODO** (Daniel 19/08; el reparto «Fable planifica / Opus implementa» quedó DEROGADO). Tags `⟦OPUS-4.8⟧` históricos NO se reescriben.
- 🔒 **Blindaje** (canónico → `41-SEGURIDAD §Runbook`): SEC-03/04 LIVE ✅ · App Check **MONITOR**, enforce DIFERIDO por riesgo lead-block (403 del bot E2E = esperado; gate = tráfico humano → `41`) · **§219 RBAC + dataScope P0-SEC LIVE ✅ (29/06)** · **SSG anti-XSS selftest = gate CI ✅ (§290)** · legal público = **gate P4** (abogado, `42-LEGAL`; F14/E3 ya live).
- 🔴 Billing GCP cayó ~2h el 09/06; causa SIN identificar, puede repetirse → [[L-38]].
- ⚙️ El sidecar `.estado-auto.md` **no tiene gate de frescura**: leer su `generado:` antes de creerle (§305 C-03). cron↔cache → [[L-02]] (`31`).

## 🧩 Sub-sistemas (resumen)
`js/` modular ✅ · CRM canónico LIVE ✅ · TODOs de cars pausados, no cerrados (`11`) · Multi-tenancy DESCARTADA · Bot DORMIENTE.
