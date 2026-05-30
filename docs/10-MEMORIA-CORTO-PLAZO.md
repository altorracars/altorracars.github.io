# ⚡ 10 — MEMORIA A CORTO PLAZO (WIP / Sprint activo)

> **Nodo neuronal: Memoria a Corto Plazo.** Junto con `CLAUDE.md` + `05-ESTADO-GLOBAL`,
> es de las primeras lecturas de cada sesión (Ignorancia Selectiva, `CLAUDE.md §G`).
> SOLO lo vivo: foco actual, pendientes abiertos, bitácora. Estado técnico → `05`.
>
> **Es la pizarra, no el archivo.** Al cerrar una tarea: consolidar a ADR (`99`) +
> fila en `00-INDICE`, extraer lecciones a `30`, y PODAR esto al foco vivo (GC §G.4).

---

## 🎯 Foco actual

- **REDISEÑO Fase 1 + SP-5.0 polish COMPLETOS en producción** (ADR §122 + §124).
  Index cinematic vanilla funcionando, rastro arreglado, lecciones consolidadas
  (L-11..L-15 + M-03/M-04).
- **OMNI-BRAIN Fase 1 ENTREGADA en working tree** (ADR §125): Trigger 🔵 de
  Auditoría + registry `40-LOBULOS-DOMINIO` + integración `skills/` + Reflejo
  de Desafío Crítico + M-05. **Pendiente del cliente**: commit brain (7 archivos)
  + push + merge a main. Sin deploy de código (brain-only).
- **SP-5.1 + SP-5.1.b EN PRODUCCIÓN ✅** (ADR §126 + §127): chrome cinematic global en las
  ~87 páginas legacy, validado (cliente: "mucho mejor"). El bridge (`chrome-bridge.css` +
  data-theme) resolvió el conflicto de especificidad legacy↔cinematic (L-16).
- **EN CURSO: SP-5.2 body migration soft pages — DECOMPUESTO en 3 lotes** (es un PORT;
  diseños cinematic en redesign `SoftPages.jsx`/`Compare.jsx`/`Simulator.jsx` + `soft.css`/`pages.css`):
  - **SP-5.2.a (piloto) ✅ working tree** (ADR §128): Legales + 404 → cinematic. `soft-redesign.css` (tokens+soft.css), contenido legal preservado 1:1 (13/15/9 cláusulas). Patrón soft-page establecido. Pendiente: deploy + E2E.
  - **SP-5.2.b ✅ working tree** (ADR §129): Editorial — nosotros (`About`) + contacto (`Contact`, form funcional preservado: contactForm + 7 campos + contact.js). + fix `.cin-eyebrow` global en soft-redesign.css. Pendiente: deploy + E2E.
  - **SP-5.2.c**: App-like (contenido generado por JS — reescribir el render a cinematic
    preservando lógica + verificando consumidores compartidos). **PATRÓN (ADR §130, validado en
    resenas)**: (1) port hero/layout a `.soft-page`/`.soft-hero` + `<link>` soft-redesign.css;
    (2) reescribir SOLO la(s) función(es) de render del JS de esa página → markup cinematic
    (clases de soft-redesign.css); (3) PRESERVAR la lógica de datos + funciones compartidas;
    (4) VERIFICAR qué otras páginas usan ese JS antes de tocarlo (RCA §19).
    - **c.1 resenas ✅ COMMITEADO** (ADR §130, commit `e115841`): reviews.js renderFullReviewsPage → cinematic.
    - **c.2a perfil ✅ working tree** (ADR §131): Opción A — cinematic por ARMONIZACIÓN DE TOKENS (remapeo `--pf-*`→`--cin-*` scoped a `body[data-cin=on]` en perfil.css + hero `.soft-hero` + **0 cambios en perfil.js**). Dashboard de 7 secciones 100% preservado. El JSX `Profile()` era un mock de 4 tabs → no se usó como estructura. Pendiente: deploy + E2E (solo prod, L-08). Lección reutilizable → **L-17**.
      · ⚠️ Decisión del cliente: A (preservar dashboard) sobre B (réplica del mock = regresión). Nombre en hero quedó genérico ("Bienvenido de nuevo") para no tocar JS; personalizarlo = 3 líneas en `updateSidebarUser` si se quiere a futuro.
    - **c.2b favoritos ✅ working tree** (ADR §132): Opción 1 (cliente) — armonización CSS de las `.vehicle-card` (de render.js, COMPARTIDO — intacto) + hero/controles/estados, scoped a `body[data-cin=on]` en favorites-page.css. CERO cambios JS (diff-render/badges/comparador intactos). Se descartó reescribir a `.cin-av-card` (riesgo alto, no verificable en localhost). Pendiente: deploy + E2E (solo prod, L-08).
    - **SP-5.2.c.2 COMPLETO** (perfil §131 + favoritos §132). **SP-5.2.c.3 comparar COMPLETO** (spec en `docs/superpowers/specs/2026-05-30-comparador-cinematic-design.md`): Paso 1 flotante ✅ (§134) + Paso 2 página `comparar.html` → Compare.jsx ✅ (§135) — working tree. **← RETOMAR: c.4 simulador** (sprint propio, 2389 líneas).
    - **c.3 comparar** — ⚠️ requiere **brainstorm propio**: mejoras del cliente (le gustó `Compare.jsx`: slots A/B + VS + "Pon dos vehículos lado a lado") = (1) CTA "Ir al catálogo"→"**Explorar vehículos**"; (2) **selección de vehículos INLINE** desde el comparador (picker propio, sin redirigir a busqueda). Es feature nuevo, no solo port. Engancha `vehicleComparator`.
    - **c.4 simulador** (2389 líneas, calculadora de crédito) → sprint propio. Diseño: `Simulator.jsx`.
- **📌 MEJORAS DEL COMPARADOR (cliente, para SP-5.2.c)**: el comparador cinematic (`Compare.jsx`,
  slots A/B + VS + estado vacío "Pon dos vehículos lado a lado") le gustó. Cambios pedidos:
  (1) CTA "Ir al catálogo" → "**Explorar vehículos**"; (2) permitir **selección de vehículos
  INLINE** desde el comparador (picker propio), sin redirigir a busqueda.html y volver.
- ⚠️ Coexistencia tema-viejo↔cinematic = conflictos de especificidad (L-16); SP-5.2 eventualmente
  retira style.css/dark-theme.css de las páginas migradas.
- **DIFERIDO (post-SP-5)**:
  - **SP-4** motor recomendaciones REAL: ranking GA-based para Tu rastro / Recomendados,
    custom image upload (+IA opcional) para destacados, real-time switch sesión.
  - Auditorías futuras: `44-SEO`, `45-PERFORMANCE`, `48-ACCESIBILIDAD` cuando se piden.

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

- **§133 chrome unify + §134 comparador flotante** (working tree, mismo lote — comparten chrome-redesign.css). §133: botones `.btn-*` (de base-redesign.css, no inyectado en legacy) portados a chrome-redesign.css scoped `.alt-nav` + badge `.nav-pip` reposicionado afuera + **badge oculto cuando favoritos=0** (favorites-manager updateAllCounters). Lección L-18. §134 (SP-5.2.c.3 Paso 1): flotante comparador cinematic + abajo-IZQUIERDA + máx 2; CSS en chrome-redesign.css → aparece también en el index. Pendiente Paso 2: página comparar.html → Compare.jsx.
