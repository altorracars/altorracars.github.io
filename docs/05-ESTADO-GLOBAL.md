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
| **Build** | 🟡 REDISEÑO EN MARCHA (`refactor/estructura`). Admin: SP-2 (destacados+tag) + SP-3 (banners `home_promo`) ✅. Index: SP-1 T1-T3 ✅ (CSS/markup/chrome), **T4-T8 pendientes**. |
| **Cache version vigente** | `v20260526150000` (SP-1 **T7** hará el próximo bump MAYOR, §4) |
| **Branch activa** | `refactor/estructura` — **ADELANTE de `main`** por SP-2/SP-3/SP-1-WIP (3 commits sin fusionar). Cliente fusiona por PR. |
| **Producción (`main`)** | 🟢 web en vivo OK con diseño VIEJO; aún NO tiene SP-2/SP-3/SP-1. |
| **Deploys backend pendientes** | Ninguno (firestore.rules / functions sin cambios). |

## ⚠️ Flags de riesgo activos
- ⚠️ **NO fusionar SP-1 a `main` hasta T8** — el index está a medio cablear (sin data hasta T5). SP-2/SP-3 sí son fusionables (admin completo).
- Conflicto cron↔cache al fusionar = patrón conocido (`git merge origin/main`, L-02).

## 🧩 Sub-sistemas (resumen)
`js/` modular ✅ · **rediseño index: `css/home/*` + `js/public/home/*` (WIP)** · cerebro autónomo ✅ · SEO ✅ · bot/RBAC/Hub estables ✅
