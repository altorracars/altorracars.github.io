# 🩺 05 — ESTADO GLOBAL (Heartbeat · Snapshot de salud del sistema)

> **Nodo neuronal: signos vitales.** Se **AUTO-CARGA** (junto a `CLAUDE.md` +
> `10-CORTO-PLAZO`). Responde *"¿en qué estado está el sistema AHORA, antes de
> tocar nada?"*. Lo lee el **Reflejo de Auto-auditoría (`CLAUDE.md §G.4`)** al arrancar.
>
> **Mantenimiento (Reflejo de Frescura §G.4)**: actualizar al cambiar cache version,
> branch, build o al detectar/resolver un riesgo. **Tope ~25 líneas (§G.5)** — es un
> tablero, no una bitácora.

| Señal | Valor (al 2026-05-29) |
|---|---|
| **Build** | 🟢 REDISEÑO Fase 1 entregada. SP-1 T1-T7 ✅ + T8 (brain consolidado en ADR §122). Pendiente del cliente: commit + E2E navegador + fusión por PR. |
| **Cache version vigente** | `v20260529120000` (bumpeado en SP-1 T7) |
| **Branch activa** | `refactor/estructura` — **ADELANTE de `main`** por SP-2/SP-3/SP-1 (varios commits sin fusionar tras commit del cliente). |
| **Producción (`main`)** | 🟢 web en vivo OK con diseño VIEJO; aún NO tiene SP-2/SP-3/SP-1. |
| **Deploys backend pendientes** | Ninguno (firestore.rules / functions sin cambios). |

## ⚠️ Flags de riesgo activos
- ⚠️ **NO fusionar SP-1 a `main` hasta E2E del cliente** (T8.1 checklist en commit). Tras OK navegador, fusionar SP-2/SP-3/SP-1 al mismo tiempo (1 PR o secuencia rápida).
- Conflicto cron↔cache al fusionar = patrón conocido (`git merge origin/main`, L-02).

## 🧩 Sub-sistemas (resumen)
`js/` modular ✅ · **rediseño index cinematic vanilla** (`css/home/*` + `js/public/home/*`) ✅ · cerebro autónomo ✅ · SEO ✅ · bot/RBAC/Hub estables ✅
