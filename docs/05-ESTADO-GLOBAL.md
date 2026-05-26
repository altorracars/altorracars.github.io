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
| **Build** | 🟡 Work-in-progress (refactor §119 + cerebro §120 en rama, no fusionados del todo a main) |
| **Cache version vigente** | `v20260526002104` (próximo bump → MAYOR, formato `vYYYYMMDDHHMMSS`, §4) |
| **Branch activa** | `refactor/estructura` (adelantada de `main`) |
| **Producción (`main`)** | 🟢 OK — web en vivo funciona; tiene §119 hasta main+render (PR #723 mergeado) |
| **Deploys backend pendientes** | Ninguno (firestore.rules / functions sin cambios sin deployar) |

## ⚠️ Flags de riesgo activos
- Falta **fusión final** `refactor/estructura → main` (workflow: UNA sola al cerrar todo, no por paso — ver L-03).
- Al fusionar puede aparecer conflicto cron↔cache → resolver con `git merge origin/main` (L-02, se resuelve solo).

## 🧩 Sub-sistemas (resumen)
`js/` modular ✅ · CSS reorg ⏸️ (diferida a Vite) · cerebro autónomo §120 ✅ · SEO meta (Twitter/OG) ✅ · bot/RBAC/Hub estables ✅
