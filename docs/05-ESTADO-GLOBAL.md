# 🩺 05 — ESTADO GLOBAL (Heartbeat · Snapshot de salud del sistema)

> **Nodo neuronal: signos vitales.** Se **AUTO-CARGA** (junto a `CLAUDE.md` +
> `10-CORTO-PLAZO`). Responde *"¿en qué estado está el sistema AHORA, antes de
> tocar nada?"*. Lo lee el **Reflejo de Auto-auditoría (`CLAUDE.md §G.4`)** al arrancar.
>
> **Mantenimiento (Reflejo de Frescura §G.4)**: actualizar al cambiar cache version,
> branch, build o al detectar/resolver un riesgo. **Tope ~25 líneas (§G.5)** — es un
> tablero, no una bitácora.

| Señal | Valor (al 2026-05-26) |
|---|---|
| **Build** | 🟢 OK — todo fusionado y LIVE en producción (js reorg §119, cerebro §120/121, SEO, hints #04). |
| **Cache version vigente** | `v20260526120000` (próximo bump → MAYOR, formato `vYYYYMMDDHHMMSS`, §4) |
| **Branch activa** | `refactor/estructura` — sincronizada con `main` (el cliente fusiona por paso vía PR). |
| **Producción (`main`)** | 🟢 web en vivo funciona; tiene todo el trabajo de la sesión. |
| **Deploys backend pendientes** | Ninguno (firestore.rules / functions sin cambios sin deployar). |

## ⚠️ Flags de riesgo activos
- Ninguno crítico. Conflicto cron↔cache al fusionar = patrón conocido, se resuelve solo (`git merge origin/main`, L-02).
- **En PAUSA esperando el REDISEÑO TOTAL** del cliente (próxima gran iniciativa, ver `10` Contexto estratégico).

## 🧩 Sub-sistemas (resumen)
`js/` modular ✅ · CSS reorg ⏸️ (diferida a Vite) · cerebro autónomo §120/121 ✅ · SEO meta+schema+hints ✅ · bot/RBAC/Hub estables ✅
