# ⚡ 10 — MEMORIA A CORTO PLAZO (WIP / Sprint activo)

> **Nodo neuronal: Memoria a Corto Plazo.** Junto con `CLAUDE.md` + `05-ESTADO-GLOBAL`,
> es de las primeras lecturas de cada sesión (Ignorancia Selectiva, `CLAUDE.md §G`).
> SOLO lo vivo: foco actual, pendientes abiertos, bitácora. Estado técnico → `05`.
>
> **Es la pizarra, no el archivo.** Al cerrar una tarea: consolidar a ADR (`99`) +
> fila en `00-INDICE`, extraer lecciones a `30`, y PODAR esto al foco vivo (GC §G.4).

---

## 🎯 Foco actual

- **🚀 REDISEÑO TOTAL — EN MARCHA** (ya no en pausa). El cliente compartió el tema nuevo
  (HarmonyOS, hecho con Claude Design) en `altorra-cars-design-system/project/redesign/`
  (está en **React**; se porta a **vanilla**). Fuentes reales: Manrope + Instrument Serif
  + Cardo (NO Poppins). Spec Fase 1: `docs/superpowers/specs/2026-05-26-rediseno-index-fase1-design.md`.
- **Fase 1 = SP-1 + SP-2 + SP-3** (ejecución vía subagentes, doble revisión):
  - **SP-2** admin destacados (cutout fuera → usa `imagen`; +`featuredTag`; sin tope de 6) →
    ✅ código completo + doble revisión OK. **Pendiente: commit del cliente + E2E navegador.**
    Plan: `docs/superpowers/plans/2026-05-26-sp2-admin-destacados.md`.
  - **SP-3** admin banners ricos (posición `home_promo`: badge/eyebrow/tasa/pills) → ✅ código completo + doble revisión OK. **Pendiente: commit + E2E.** Plan: `docs/superpowers/plans/2026-05-26-sp3-admin-banners.md`. (Nota diseño: si un banner pasa de `home_promo` a otra posición, los campos ricos quedan inertes en Firestore — aceptable, anotar en ADR.)
  - **SP-1** index nuevo (12 secciones + widgets, vanilla port, engancha data/lógica existentes) → ⏳ el grande, después.
- **Diferidos**: SP-4 (motor recomendaciones + analytics) · SP-5 (resto de páginas + promover chrome global).

---

## 📋 Pendientes abiertos (TODO-NN)

> Al cerrar uno: ✅ + link al ADR, y retirarlo en la próxima poda.

| ID | Item | Estado | Bloqueo |
|---|---|---|---|
| **TODO-01/02** | Migración Cloudflare Pages + Vite (deploy en segundos, assets con hash) | 🔮 | ~$10/año dominio |
| **TODO-03** | Critical CSS inline | ⏸️ diferido | el rediseño lo reemplaza + riesgo visual |
| **TODO-04** | Resource hints (preconnect) | ✅ hecho | plantillas + busqueda; el cron propaga a las 45 generadas |
| **TODO-05** | SEO local / metadata | ✅ hecho | Twitter/OG/noindex + schema AutoDealer §90 ya completo |
| **TODO-06** | Página `/cartagena.html` SEO local | 🔮 | contenido editorial del cliente + rediseño |
| **TODO-07/08** | Validar CSAT (§87) + transferencias (§88) en producción | 🔮 | tráfico / equipo 2+ asesores |
| **TODO-09..13** | Deuda técnica menor (drafts diferidos, CSS muerto, transition:all, substring selectors) | 🔮 | opcional, sin impacto visible |
| ~~TODO-14~~ | ~~Patrón merge conflict cron~~ | ✅ → lección L-02 | — |

Detalle ampliado de pendientes legacy → `99-HISTORIAL-ADR.md` §109.

---

## 📦 Planes mayores (resumen vivo — todos cerrados ✅)

- **§119** reorg `js/` modular (128 archivos) · **§120/§121** cerebro autónomo + linter `brain:check` — LIVE.
- **§61** RBAC dinámico · **§59** ALTOR Hub (7/7 + C-S8/9/10) · **§82-84** Smart Update · **§90** SEO Fase 4 (rich snippets + Google Business 5.0★/62) · **§91/93** imágenes responsive + lazy · **§115-117** motor cromático (6 paletas) · 27 Cloud Functions.

---

## 🔮 Contexto estratégico (afecta prioridades)

- **REDISEÑO TOTAL en camino**: el cliente hizo un nuevo diseño con "Claude design" y planea
  migrar toda la web. → NO sobre-invertir en cosmética/estructura visual actual (CSS reorg,
  Critical CSS) que el rediseño reemplazará. Mejoras de bajo nivel (SEO meta, performance,
  backend, datos) SÍ sobreviven. El cliente pasará el nuevo diseño "más adelante".

## 📝 Bitácora (efímera — se vacía al consolidar)

- *(vacía — el trabajo de las sesiones 2026-05-25/26 quedó consolidado en ADR §118/§119/§120/§121)*
