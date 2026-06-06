# ⚡ 10 — MEMORIA A CORTO PLAZO (WIP / Sprint activo)

> **Nodo neuronal: Memoria a Corto Plazo.** Junto con `CLAUDE.md` + `05-ESTADO-GLOBAL`,
> es de las primeras lecturas de cada sesión (Ignorancia Selectiva, `CLAUDE.md §G`).
> SOLO lo vivo: foco actual, pendientes abiertos, bitácora. Estado técnico → `05`.
>
> **Es la pizarra, no el archivo.** Al cerrar una tarea: consolidar a ADR (`99`) +
> fila en `00-INDICE`, extraer lecciones a `30`, y PODAR esto al foco vivo (GC §G.4).
>
> **Convención de handoff (relevo a ventana nueva)**: el "Foco actual" debe incluir
> **🚫 Callejones sin salida** — qué se probó que FALLÓ y NO reintentar, con el porqué.
> Le ahorra al próximo "tú" repetir errores ya descartados (relevo curado > `/compact`).

---

## 🎯 Foco actual

> 🏗️ **CRM rebuild — Fase 2 CONSTRUIDA Y VERIFICADA** (2026-06-06). App admin **greenfield** `admin-app/` (Vite + Firebase modular SDK 11.3.0, app namespaced `altorra-crm`) que LEE el canónico de Fase 1 y lo presenta como **Bandeja Inteligente** + **Customer 360**. Inteligencia 100% **determinista, SIN ALTOR/LLM** (restricción dura del cliente): scoring 7-factores, NBA 10-reglas, classify (tipo/SLA/canal) portados del CRM viejo → `admin-app/src/domain/`. Capas datos/dominio/ui; design-system **HarmonyOS** (tokens copiados VERBATIM); realtime acotado (`onSnapshot`+`limit`+paginación+`unsubscribe`). **ADR §159** escrito (+ §158 Fase 1 consolidada). Detalle de arquitectura → `docs/20-ESPACIAL §CRM-app`.
> **Verificado** (`npm run dev` + preview `?mock=1`): build verde (45 módulos, 124 kB gzip), cero errores de consola, snapshot+eval confirman colas/orden-por-urgencia/SLA/score/NBA/360(4 tabs)/cambio-de-estado-optimista/búsqueda. La verificación **cazó+arregló 2 bugs**: grid `grid-template-columns` colapsado en <860px y panel 360 vacío por no espejar leads al store (L-27/L-28).
> **⏳ Pendiente Fase 2**: (1) **DEPLOY estático** = commit+push de `admin-app/` (incluye `dist/`) → Pages en `https://altorracars.github.io/admin-app/dist/` (run paralelo; sitio público intacto). Mensaje de commit entregado (M-12). (2) **`firebase deploy --only firestore:rules`** (lo ejecuta Claude) — añadí el subrule `contacts/{id}/crmNotes` para que las Notas del 360 funcionen live (sin él Firestore deniega la subcolección). (3) **E2E live** (L-08: Auth/Firestore solo contra el deploy). (4) opcional: budget alert $5.
> **Próximo**: slice de **canales** (newsletter/cuenta/bot/favoritos → canónico vía ingestión = matar el resto de la hemorragia §8) **o** **Fase 3** (Pipeline drag-drop + Agenda unificada).
>
> **🚫 Callejones sin salida (NO reintentar)**:
> (a) **NO implementar custom claims ahora** — verifiqué (4 agentes) que el backend NO los setea y las reglas Fase 1 usan lookup `usuarios/{uid}`; la app replica ESE modelo (auth modular + hidratación de `permissions[]`). Claims = Fase 5 endurecimiento (blueprint maestro §10, ADR §159.3). Hacerlo ahora = redeploy + riesgo al admin viejo, contra MVP-ruthless.
> (b) **NO confiar en `preview_screenshot`** — se cuelga tras `preview_resize` (L-28). Verificar UI con `preview_snapshot` + `preview_eval` (getComputedStyle/conteos), no screenshots.
> **🛰️ Consejo Externo (neurona 15)**: ya consultado para el modelo de datos/RBAC (§15 del blueprint). Nuevos disparadores caros-de-revertir (ej. cambiar el esquema canónico) → re-consultar.

> ✅ **Cerebro ENDURECIDO esta sesión (2026-06-03) — NO rehacer** (todo en **ADR §156**): hooks deterministas (`pre-commit` bloquea commit con cerebro roto + `SessionStart` corre `brain:check` cada sesión), **Consejo Externo** (neurona 15), regla **verifica-no-asumas** universal (§3.3 + M-11), inventario + limpieza de skills (4/7 anomalías). **⏳ Commit masivo STAGED + validado, PENDIENTE de pushear** (summary + descripción en el chat de cierre). `brain:check` SANO. La skill `crm-architect` + la hoja `skills-inventory` ya están en `1d0e4d5`.

---

## 📋 Pendientes abiertos (TODO-NN)

> Al cerrar uno: ✅ + link al ADR, y retirarlo en la próxima poda.

| ID | Item | Estado | Bloqueo |
|---|---|---|---|
| **TODO-01/02** | Migración Cloudflare Pages + Vite (deploy en segundos, assets con hash) | 🔮 | ~$10/año dominio |
| **TODO-03** | Critical CSS inline | ⏸️ diferido | SP-5 lo reabsorbe |
| **TODO-06** | Página `/cartagena.html` SEO local | 🔮 | contenido editorial del cliente |
| **TODO-07/08** | Validar CSAT (§87) + transferencias (§88) en producción | 🔮 | tráfico / equipo 2+ asesores |
| **TODO-09..13** | Deuda técnica menor (drafts diferidos, CSS muerto, transition:all, substring selectors) | 🔮 | opcional, sin impacto visible |
| **TODO-15** | Anomalías skills restantes: `code-modernization` (plugin) + `code-simplifier` (subagente) = contenido real (¿reubicar?); bundles `-main` (cosmético). Detalle → `skills-inventory.md` | 🔮 | decisión cliente |

Detalle ampliado de pendientes legacy → `99-HISTORIAL-ADR.md` §109.

---

## 🔮 Contexto estratégico

- **Sitio**: rediseño cinematic + a11y ENTREGADOS y en producción (§122–§154). Resta QA visual + diferidos (SP-4 fase 2, auditorías por dominio). Todo consolidado en ADRs.
- **Cerebro**: blindado esta sesión (§156) — auto-auditoría ahora determinista (hooks). El foco se mueve a CONSTRUIR el CRM.

## 📝 Bitácora (efímera)

> Vaciada en el cierre 2026-06-03. Todo consolidado en ADRs: **§156** (endurecimiento del cerebro: hooks + Consejo Externo + regla verifica-no-asumas + skills) · §140–§155 (catálogo/a11y/diseño/cerebro-tooling/CRM-kickoff). El detalle vive en `99` (offset vía `00`).
>
> **2026-06-05 (cierre)**: **§157** (fix rectángulo negro del hero — el `<footer class=cin-hero-foot>` heredaba `body footer{background}` de dark-theme; fix `background:transparent`) consolidado en `99`+`00` + lección **L-25**; ⏳ pendiente push + Ctrl+Shift+R del cliente. Creado **`docs/crm-handoff.md`** (scan verificado del admin/CRM + plan + decisiones) como handoff para la sesión NUEVA del CRM. Cache `v20260605120000`. Cerebro SANO.
>
> **2026-06-05 (rebuild CRM)**: arranca la reconstrucción. Scan profundo (4 agentes) → censo de captura + duplicación + bug estados legacy capturados en `crm-handoff.md` §8. Cliente confirma pipeline estándar (sin retoma), 3 asesores→crecimiento, sin ventas aún. **Mandato de arquitecto** (escalable/seguro/cero-monolitos/$0) → nace neurona **`46-ESCALABILIDAD.md`** (registrada en `40`+`00`). **Blueprint ESCRITO** → `docs/superpowers/specs/2026-06-05-crm-rebuild-design.md`.
>
> **2026-06-05 (Consejo Externo)**: Gemini 3.1 Pro (High) red-teameó modelo de datos/RBAC (cliente lo corrió en Antigravity). Confirmó canónico-separado/planas/claims; **cambió 2 decisiones** (peer review): migración → **greenfield + run paralelo** (no strangler, el monolito es ~7.5k L no legacy enterprise) y tooling → **Vite solo en el admin** (cache-busting por hash mata el ritual `CACHE_VERSION`). +4 riesgos incorporados (búsqueda full-text, budget/`maxInstances`, onSnapshot, dead-letter ingestión). Detalle + peer review → blueprint **§15**. Arquitectura 🟢 endurecida; falta OK final → `writing-plans` Fase 1.
>
> **2026-06-05 (Fase 1 LIVE + Fase 2 diseño)**: Fase 1 **DESPLEGADA** (Claude ejecutó el deploy: rules+indexes+`onSolicitudCreated` LIVE en `altorra-cars`). Cliente: **los deploys los ejecuta Claude** de ahora (CLAUDE.md §1) + meta-lección **M-12** (entregar SIEMPRE el msg de commit). **Diseño Fase 2 escrito** → `docs/superpowers/specs/2026-06-05-crm-fase2-bandeja-design.md` (Bandeja Inteligente + app admin greenfield Vite). 🔴 **Restricción del cliente**: la Bandeja NO depende de ALTOR (buggy, se arregla después) — inteligencia = motor heurístico DETERMINISTA (scoring/NBA/predictive ya construidos); LLM diferido. **Construir empieza por slice 2a** (fundación de la app), ideal en sesión fresca (hereda este diseño).
>
> **2026-06-06 (Fase 2 CONSTRUIDA)**: "construye la Fase 2". Scan verificado en paralelo (4 agentes: tokens HarmonyOS, esquema canónico real, dominio scoring/NBA, auth/claims) → construida la app `admin-app/` completa (slices 2a-2d integrados): Vite + Firebase modular, design-system HarmonyOS (tokens verbatim), shell+login, dominio puro (format/classify/scoring7/nba10), Bandeja (colas/tarjetas/filtros/búsqueda/acciones inline/realtime), Customer 360 (Resumen/Comunicaciones/Score/Notas), modo `?mock=1` para verificar sin Firebase. Build verde + verificación preview cazó 2 bugs (grid colapsado + 360 vacío) → corregidos. Consolidado: **ADR §158 (Fase 1) + §159 (Fase 2)** en `99`+`00`, lecciones **L-27/L-28** en `30`, arquitectura en `20 §CRM-app`. Pendiente: deploy de `dist/` (mensaje de commit dado) + E2E live.
