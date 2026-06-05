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
> **CRM ACTUAL (leer ANTES de reconstruir)**: `admin.html` (SPA) + `js/admin/admin-crm.js` + `js/admin/admin-crm-tabs.js` + `js/core/comm-schema.js`; Firestore `solicitudes/` (leads/citas), `clientes/{uid}` (+subcols crmNotes/cotizaciones/postventa), `mensajes/`, `usuarios/`; RBAC dinámico §61. Mapa → `20-ESPACIAL`.
> **PRIMEROS PASOS**: (1) invocar `crm-architect` + leer su `SKILL.md` + `automotive-dealership.md`; (2) `brainstorming` para el ALCANCE (¿rebuild total? ¿modularizar el admin? ¿qué duele del CRM actual?); (3) auditar CRM actual vs framework; (4) `writing-plans` → ADRs **§158+** por sprint (§157 lo tomó el fix del hero-search).
>
> 🔎 **Scan del admin/CRM YA hecho (2026-06-05, esta sesión)** — leído del CÓDIGO real, no del cerebro: el admin es **79 archivos `js/admin/`** (no 22) + `admin.html` carga ~94 scripts `defer`. Hallazgos clave: `admin-inbox.js` NO existe (el inbox es `admin-concierge.js` sobre `conciergeChats`); `mensajes/` es colección MUERTA (ninguna function la usa); 28 Cloud Functions (no 27); RBAC = 1 solo rol sistema `system_super_admin`="CEO" (Editor/Viewer borrados §69). Puente público↔admin = Firestore puro: público escribe `solicitudes` (vende-auto/financiación/contacto/citas) + concierge (`conciergeChats`/`unmatchedQueries`/lead) vía `comm-schema.js`; admin lee con `onSnapshot`→`AP.appointments`. Bugs detectados: `AltorraCRM.openContactDetail` referenciado pero indefinido; pipeline sin drag-drop; postventa no auto-wired; `solicitudes-watcher` estados legacy divergen del schema. ⚠️ `dependency-map.md` quedó STALE → refrescar al planear el CRM.
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
