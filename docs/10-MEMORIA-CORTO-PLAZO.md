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

> 🧠 **PRÓXIMO MACRO-PROYECTO (sesión nueva, contexto limpio) — Cerebro MULTI-PROYECTO** (Decisión Fuerte **aprobada 2026-06-09**: **ADR §170** + **spec maestro** `docs/superpowers/specs/2026-06-09-cerebro-unico-multiproyecto.md` ← **arrancar leyéndolo**). NO cerebro único; SÍ **núcleo portable compartido (4 capas KERNEL/SCHEMA/GROUP-Altorra/INSTANCE) + `brain:diff` por hash** (canon kernel = bersaglio; **probar en inmobiliaria primero**, riesgo 0 a cars). PASO 0 ✅ (espejo confirmado = misma estructura + grupo, NO clon de 43k líneas). **Mandatos del cliente**: (1) NO perder lo ya documentado (inventario + cuarentena `_legacy/`, NUNCA borrar); (2) verificar holística/ampliamente cómo MEJORAR el cerebro, **con comité**. Skills: las 4 de Altorra viven en `~/.claude/skills/` (global), 4/7 son Altorra-coupled → separar (PASO 1).

> 🏗️ **CRM rebuild — NÚCLEO COMPLETO: Fases 2–4 + Contactos DESPLEGADAS** (2026-06-06). **Portal único modular** `admin-app/` (Vite + Firebase modular `altorra-crm`) que reemplazará al `admin.html` viejo (mapa de integración/cutover → `crm-handoff.md §9`). **5 superficies LIVE** en `/admin-app/dist/` (Bandeja, Pipeline, Agenda, Reportes, Contactos — menú sin "Pronto"). Inteligencia **determinista, SIN ALTOR/LLM**. Capas datos/dominio/ui, HarmonyOS verbatim, realtime acotado. Arquitectura → `20-ESPACIAL §CRM-app`. **Auto-deploy por fase autorizado** (memoria `feedback-auto-deploy-crm`).
>   - **Fase 2** — Bandeja Inteligente + Customer 360 (scoring7/NBA10/classify), ADR §159. ✅ LIVE (`crmNotes`). Cazó 2 bugs (L-27/28).
>   - **Fase 3a** — Pipeline: embudo drag-drop sobre **`deals`** (lead→oportunidad, forecast Σ monto×prob), ADR §160. ✅ LIVE (`1e154c2`; reglas+índice `deals`). 0 bugs.
>   - **Fase 3b** — **Agenda unificada** (vista mes, `dayKey` local, "📅 Agendar" desde 360 → `activities.dueAt`), ADR §161. ✅ LIVE (`347c790`). Sin deploy de rules/indexes.
>   - **Captura MANUAL de leads** (leads externos Meta/WhatsApp/TikTok/llamada/referido), ADR §162. Form "＋ Nuevo lead" → escribe `solicitudes` → reusa la ingestión. `channelOf` extendido + orgánico/pauta/campaña (ROI). ✅ LIVE (`599ba89`).
>   - **Canal AUTO #1: registro de cuenta → contacto** (`onClienteCreated`), ADR §163. Trigger en `clientes/{uid}` → upsert `contacts` (dedup, NO crea lead, fusiona invitado→registrado, consent conservador). 28 tests verdes. ✅ LIVE (`945ae1f`).
>   - **Canal AUTO #2: newsletter → contacto subscriber** (`onSubscriptionCreated`), ADR §164. **TOCA SITIO PÚBLICO**: form `.cin-end-news` roto → `home.js initNewsletter` escribe `subscriptions` → trigger upsert contacts (subscriber, merge captura opt-in email + tag). Nota Habeas Data + link privacidad. **Cache bump `v20260606120000`** §4. 33 tests verdes + **revisión adversarial multi-agente**. ✅ LIVE.
>   - **Fase 4: Reportes/KPIs** (5ª superficie `#/reportes`), ADR §165. Tablero determinista: KPIs (período + estado actual), embudo monotónico (join lead→deal ganado), **rendimiento por canal⭐** (`channelOf`), forecast por etapa, tendencia (`dayKey` LOCAL), equipo, **export CSV**. `domain/reports.js` puro + `modules/reportes/{data,charts,ui}` + agregación cliente `getDocs` acotado (índice automático). Charts SVG/CSS (no hay lib; `el()` no crea SVG → `createElementNS`). **Sin reglas/índices/functions/cache** (Vite hash-busting, L-27). Build verde + `?mock=1` reconciliado a mano + revisión adversarial 5-dim (0 bugs correctness, 4 fixes). ✅ DESPLEGADA a `main`. L-32.
>   - **Contactos (directorio)** — última pieza del núcleo, ADR §166. Lista buscable/filtrable de `contacts` (`modules/contacts/contacts.list.js` + `loadContactsList`); clic en persona con lead → abre la **ficha 360 existente** (espeja store.leads + detailLeadId atómico, L-27); suscriptor sin lead → fila informativa no interactiva. 360 (`contacts.ui.js`) INTACTO. Menú **sin "Pronto"**. Sin reglas/índices/cache. `?mock=1` (16 contactos, filtros/búsqueda/360 OK) + revisión adversarial 3-dim (mayoría falsos positivos, fixes reales). ✅ DESPLEGADA a `main`. L-33.
> **⏳ Pendientes**: (1) **E2E live** (crear un lead/cita REAL en la web en vivo → confirmar que llega a la Bandeja, L-08); (2) **backfill = N/A por ahora** (el cliente confirmó SIN datos viejos: web en lanzamiento, aún sin indexar); (3) **blindaje pre-lanzamiento** (rate-limit en forms públicos + RBAC-read, handoff §9.7).
> **Captura AUTO completa** (web+cuenta+newsletter). **Bot ALTOR** = DIFERIDO (buggy). **Próximo: migrar Inventario/Sitio/Config al portal → cutover (Fase 5)**, o blindaje de lanzamiento (handoff §9.7). Roadmap → `crm-handoff.md §9.5/§9.6`.
>
> 🧠 **Iniciativa cerebro+skills** → spec `docs/superpowers/specs/2026-06-06-cerebro-skills-roadmap.md`. **Fase A ✅** (doctrina arquitecto `§3.8` · doctrina legal Trigger 🔵 `§G.2` · workflow `adversarial-review.js` · L-34). **Fase B ✅ reconciliada (2026-06-08, ADR §168)**: las 3 skills **YA EXISTÍAN** (`comite-expertos` · `legal-colombia` · `arquitecto-software`, **globales/portables**, build en sesión paralela Bersaglio) → evaluadas (`llm-council` = *adaptar-no-adoptar*; `engineering:*` = no encajan, NO duplicar) + **registradas en el cerebro** (`40 §🌱` + `00`). Regla del cliente: skills **funcionales para TODOS** sus proyectos (Altorra Cars/Inmobiliaria + Bersaglio); lo de cada uno va al lóbulo. ⚠️ Defecto pendiente: `description` >1024 en comité (1038) y legal (1148) — **fix en la conversación dueña** (co-editadas, no race-edit).
> **Fase C ✅ (2026-06-08, ADR §169)**: auditoría multi-agente (workflow `fase-c-audit`, 12 subagentes + verificación L-34) → **nacen `41-SEGURIDAD`** (9 hallazgos verificados + plan de blindaje P0/P1/P2) y **`42-LEGAL`** (5 áreas vehículos CO, 4/5 verified, gate abogado). Holística CRM: 8 fortalezas + prioridades de lanzamiento → `crm-handoff §9.8`.
> **⛔ Gate de lanzamiento**: blindaje **SEC-03 (tope costo) + SEC-04 (candado Telegram) LIVE ✅** (deploy functions 2026-06-08); falta **App Check** (esperando site key del cliente; init points mapeados en `41`) + **SEC-01** RBAC-read (Opción A resuelta vía Gemini; pre-seed `crm.read` + OK + emulator antes del deploy de rules); **LEGAL-01..06** con abogado; **E2E "cero pérdida"**. Detalle en `41`/`42`.
>
> **🚫 Callejones sin salida (NO reintentar)**:
> (a) **NO implementar custom claims ahora** — verifiqué (4 agentes) que el backend NO los setea y las reglas Fase 1 usan lookup `usuarios/{uid}`; la app replica ESE modelo (auth modular + hidratación de `permissions[]`). Claims = Fase 5 endurecimiento (blueprint maestro §10, ADR §159.3). Hacerlo ahora = redeploy + riesgo al admin viejo, contra MVP-ruthless.
> (b) **NO confiar en `preview_screenshot`** — se cuelga tras `preview_resize` (L-28). Verificar UI con `preview_snapshot` + `preview_eval` (getComputedStyle/conteos), no screenshots.
> **🛰️ Consejo Externo (neurona 15)**: ya consultado para el modelo de datos/RBAC (§15 del blueprint). Nuevos disparadores caros-de-revertir (ej. cambiar el esquema canónico) → re-consultar.

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
>
> **2026-06-06 (Fase 4 — Reportes/KPIs)**: "Construye la Fase 4". Discovery 5-agente del codebase (workflow) → diseño/spec aprobado → build directo (módulo tight-coupled) → **revisión adversarial 5-dim** (workflow): correctness 0 bugs, 4 fixes (CSV `\r` RFC-4180, `th scope`, chip `aria-pressed`, JSDoc `capped`). 5ª superficie `#/reportes` determinista, agregación cliente $0, charts SVG/CSS. Mock extendido (won/lost/convertido). Verificado `?mock=1` (aritmética reconciliada a mano, 0 errores consola). **Sin reglas/cache** (Vite hash-busting). Consolidado: **ADR §165** en `99`+`00`, lección **L-32** en `30`, frescura `05`. ✅ Desplegado a `main` (commit+merge+push).
>
> **2026-06-06 (Contactos — núcleo completo)**: el cliente revisó el portal en vivo, notó "Contactos · Pronto" y pidió completar el CRM. Construido el **directorio** (`contacts.list.js` + `loadContactsList`) reusando la ficha 360 lead-céntrica sin tocarla (espejo store.leads + detailLeadId atómico; suscriptor sin lead = fila no interactiva). Mock: `getMockContacts` + `CONTACTS` deriva ciclo de vida + 1 suscriptor sin lead (para ejercitar la rama `<div>`). Verificado `?mock=1` (16 contactos, filtros/búsqueda/360, 0 errores) + revisión adversarial 3-dim → la mayoría de "high" eran **falsos positivos** (verificados contra el código); fixes reales: store.set atómico, `orderBy createdAt` (anti-null), filas sin-lead no-botón, responsive sin hack `-22px`, focus-visible, title. Consolidado: **ADR §166** en `99`+`00`, lección **L-33** en `30`, frescura `05`. ✅ Desplegado a `main`. **Núcleo del CRM completo (5 superficies, sin "Pronto")**.
