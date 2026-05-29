# ⚡ 10 — MEMORIA A CORTO PLAZO (WIP / Sprint activo)

> **Nodo neuronal: Memoria a Corto Plazo.** Junto con `CLAUDE.md` + `05-ESTADO-GLOBAL`,
> es de las primeras lecturas de cada sesión (Ignorancia Selectiva, `CLAUDE.md §G`).
> SOLO lo vivo: foco actual, pendientes abiertos, bitácora. Estado técnico → `05`.
>
> **Es la pizarra, no el archivo.** Al cerrar una tarea: consolidar a ADR (`99`) +
> fila en `00-INDICE`, extraer lecciones a `30`, y PODAR esto al foco vivo (GC §G.4).

---

## 🎯 Foco actual

- **REDISEÑO TOTAL — Fase 1 entregada** (SP-1 ✅ + SP-2 ✅ + SP-3 ✅; ADR §122 SP-1
  consolidado). Index cinematic vanilla listo para producción tras E2E del cliente +
  fusión por PR. Lecciones extraídas: **L-11/L-12/L-13** (port class-fidelity,
  teardown en re-render, lazy modules + delegación).
- **Próximo (no urgente)**: Fase 2 = **SP-4 + SP-5**.
  - **SP-4** motor de recomendaciones (ranking real para "Tu rastro"/Recomendados — hoy placeholder cubierto con destacados+ranked) + analytics de carruseles para alimentar el ranking.
  - **SP-5** resto de páginas con tema cinematic (catálogo, detalle, marca, simulador, comparar, favoritos) + promover `home-chrome.js` a chrome global multi-página.

---

## 📋 Pendientes abiertos (TODO-NN)

> Al cerrar uno: ✅ + link al ADR, y retirarlo en la próxima poda.

| ID | Item | Estado | Bloqueo |
|---|---|---|---|
| **TODO-01/02** | Migración Cloudflare Pages + Vite (deploy en segundos, assets con hash) | 🔮 | ~$10/año dominio |
| **TODO-03** | Critical CSS inline | ⏸️ diferido | SP-5 lo reabsorbe |
| **TODO-04** | Resource hints (preconnect) | ✅ hecho | propagado por cron |
| **TODO-05** | SEO local / metadata | ✅ hecho | OG/Twitter/AutoDealer §90 |
| **TODO-06** | Página `/cartagena.html` SEO local | 🔮 | contenido editorial del cliente |
| **TODO-07/08** | Validar CSAT (§87) + transferencias (§88) en producción | 🔮 | tráfico / equipo 2+ asesores |
| **TODO-09..13** | Deuda técnica menor (drafts diferidos, CSS muerto, transition:all, substring selectors) | 🔮 | opcional, sin impacto visible |
| ~~TODO-14~~ | ~~Patrón merge conflict cron~~ | ✅ → L-02 | — |

Detalle ampliado de pendientes legacy → `99-HISTORIAL-ADR.md` §109.

---

## 📦 Planes mayores (resumen vivo — todos cerrados ✅)

- **§122** SP-1 Index cinematic vanilla (port JSX→vanilla, 4 módulos `js/public/home/*`, contratos preservados).
- **§119** reorg `js/` modular (128 archivos) · **§120/§121** cerebro autónomo + linter `brain:check`.
- **§61** RBAC dinámico · **§59** ALTOR Hub (7/7 + C-S8/9/10) · **§82-84** Smart Update · **§90** SEO Fase 4 · **§91/93** imágenes responsive + lazy · **§115-117** motor cromático (6 paletas) · 27 Cloud Functions.

---

## 🔮 Contexto estratégico

- **Fase 2 (SP-4/SP-5)** queda diferido sin urgencia: la Fase 1 ya entregó la primera
  impresión visual completa del proyecto. SP-5 es esfuerzo grande; SP-4 requiere
  analytics primero. Aprovechar para validar Fase 1 en producción antes de seguir.

## 📝 Bitácora (efímera — se vacía al consolidar)

- *(vacía — el trabajo de sesiones 2026-05-26/29 quedó consolidado en ADR §122 +
  lecciones L-11/L-12/L-13)*
