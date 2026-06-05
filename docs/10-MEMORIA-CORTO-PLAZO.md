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

> 🏗️ **PRÓXIMA SESIÓN → RECONSTRUCCIÓN DEL CRM** (arrancar en contexto limpio). El cliente cierra esta sesión tras endurecer el cerebro; abre una fresca para el CRM. "Hay muchas cosas por ajustar."
> **Objetivo**: reconstruir el CRM de Altorra (concesionario de carros usados, Cartagena).
> **Framework**: skill **`crm-architect`** (commit `6cc0055` → `skills/crm-architect/`). Calza el stack EXACTO: Firebase + Firestore + Cloud Functions, data-model, pipeline de ventas, automatización, AI (scoring/copilot/NBA), reporting, integraciones (email/WhatsApp/calendar), **RBAC + Ley 1581**. Trae templates (`assets/templates/`), scripts (`scaffold_crm.mjs`/`generate_module.mjs`/`validate_crm.mjs`) y vertical `references/verticals/automotive-dealership.md`. Registrada en `40`.
> **CRM ACTUAL + plan completo → `docs/crm-handoff.md`** (scan verificado del CÓDIGO 2026-06-05; el `dependency-map.md` estaba stale). Resumen: admin = **79 archivos `js/admin/`** + `admin.html` ~94 scripts; CRM = `sec-crm` 3 tabs + Customer 360 + IA heurística; puente público↔admin = Firestore vía `comm-schema.js`; **28** Cloud Functions; RBAC = 1 rol CEO. (Colecciones reales en el doc — `mensajes` está MUERTA.)
> **PRIMEROS PASOS**: (1) invocar `crm-architect` + leer su `SKILL.md` + `automotive-dealership.md`; (2) `brainstorming` para el ALCANCE (¿rebuild total? ¿modularizar el admin? ¿qué duele del CRM actual?); (3) auditar CRM actual vs framework; (4) `writing-plans` → ADRs **§158+** por sprint (§157 lo tomó el fix del hero-search).
>
> 🔎 **Scan + handoff consolidados en `docs/crm-handoff.md`** (incluye los bugs detectados — `AltorraCRM.openContactDetail` indefinido, pipeline sin drag-drop, postventa no auto-wired, `solicitudes-watcher` con estados legacy — y las **7 decisiones que el cliente debe definir**). El cliente dictará sus condiciones / cómo ve la página / qué quiere en §7 del doc o en la sesión nueva.
> **🛰️ Consejo Externo (neurona 15) disponible**: el modelo de datos / colecciones Firestore / RBAC del CRM son "caros de revertir" → candidatos a consult **Gemini Pro (High)** vía Antigravity (cuándo + matriz de modelo en `15`).
> **🚫 Callejones sin salida**: ninguno aún.

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
