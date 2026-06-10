# ⚡ 10 — MEMORIA A CORTO PLAZO (WIP / Sprint activo)

> **Nodo: pizarra del sprint** (auto-carga con `CLAUDE.md` + `05`). SOLO lo vivo: foco actual,
> pendientes (TODO-NN), bitácora efímera. Estado técnico → `05`. Al cerrar tarea: consolidar a
> ADR (`99`) + fila en `00`, lecciones a `30`, y PODAR esto al foco vivo (GC §G.4).
> **Convención de handoff**: el foco SIEMPRE incluye **🚫 callejones sin salida** (qué se probó
> que FALLÓ y por qué) — le ahorra al próximo "tú" repetir errores descartados.

---

## 🎯 Foco actual

> 🧠 **MACRO-PROYECTO — Cerebro auto-evaluable v6** (2026-06-09; sucede a §170→§171→§172, cerebros INDEPENDIENTES sigue vigente). Comité v6 (16 agentes, **45 hallazgos verificados en disco**) decidió los 7 puntos del cliente: evaluación de 2 NIVELES (kernel v1.1/v1.2 con gates de severidad hardcodeada + skill portable `auditoria-cerebro` con sondas falsables/retrieval-drill), GC de DOS palancas (nodo 10 + router CLAUDE.md) con trinquete de caps, captura-en-ORIGEN, TODO-NN como ledger ÚNICO, brain-diff manual, template 1.1.0. **Plan + checklist A-U (ÚNICO tracking del macro-proyecto) → `docs/superpowers/specs/2026-06-09-comite-v6-cerebro-autoevaluable-VEREDICTO.md`** · crudo + tabla de hallazgos → `research-archive/2026-06-09-comite-v6-*`. **Estado: 19/21 ✅ (A-S; C resuelto con Gemini → bóveda `brain-private`, ADR §174) · ⏳ T (re-verificar inmobiliaria) + U (1ª auditoría Nivel-2, sesión fresca) · bóveda en GitHub PRIVADO ✓ (altorracars/brain-private) · 4 repos pusheados ✓**. 🚫 Callejones: NO classification-en-manifest, NO checklist-doc-nuevo, NO score LLM, NO brain-diff en boot, NO regex 5c para el BFS (no ve subdirs).

> 🏗️ **CRM rebuild — NÚCLEO COMPLETO + E2E LIVE VERIFICADO ✅ (§175)** (detalle: ADR §158-§166+§175 en `99` · arquitectura `20 §CRM-app` · roadmap/cutover `crm-handoff.md §9`). Portal `admin-app/` con 5 superficies LIVE y **pipeline de captura PROBADO en producción**: web→solicitudes→ingestión→canónico→Bandeja (score/NBA) + newsletter→subscriber (~6s). Vías manual + registro-de-cuenta quedan como sub-checks del E2E "cero pérdida" (en TODO-18). Secuencia: **TODO-18 (blindaje) → TODO-19 (Fase 5 cutover)**. ⏳ Pendiente del cliente: (1) **merge+push a `main`** del fix §175 (form contacto) + cerebro; (2) borrar 2 leads de prueba (`leads/E26PXSF8ibdmuvtpt9v9` + `leads/DYYD92LLMqboX4aOVByx` — permiso denegado a Claude); (3) verificar la CAUSA del billing-disabled de hoy (¿tarjeta/aviso GCP?) para que no se repita.
>
> **🚫 Callejones sin salida (NO reintentar)**:
> (a) **NO custom claims ahora** — el backend NO los setea; reglas Fase 1 usan lookup `usuarios/{uid}`; claims = Fase 5 endurecimiento (§159.3). (b) **NO `preview_screenshot`** (se cuelga tras `preview_resize`, L-28) — verificar con `preview_snapshot` + `preview_eval`. (c) Consejo Externo ya consultado para modelo de datos/RBAC (blueprint §15) — re-consultar solo ante nuevo disparador caro-de-revertir. (d) **NO E2E de forms en localhost** (L-08 ampliada §175: referer-block tumba hasta App Check con throttle de 1 día) — E2E solo contra live; lógica de UI con stub `window.db`.

---

## 📋 Pendientes abiertos (TODO-NN) — ledger ÚNICO de pendientes

> Al cerrar uno: ✅ + link al ADR, y retirarlo en la próxima poda.

| ID | Item | Estado | Bloqueo |
|---|---|---|---|
| **TODO-01/02** | Migración Cloudflare Pages + Vite (deploy en segundos, assets con hash) | 🔮 | ~$10/año dominio |
| **TODO-03** | Critical CSS inline | ⏸️ diferido | SP-5 lo reabsorbe |
| **TODO-06** | Página `/cartagena.html` SEO local | 🔮 | contenido editorial del cliente |
| **TODO-07/08** | Validar CSAT (§87) + transferencias (§88) en producción | 🔮 | tráfico / equipo 2+ asesores |
| **TODO-09..13** | Deuda técnica menor (drafts diferidos, CSS muerto, transition:all, substring selectors) | 🔮 | opcional, sin impacto visible |
| **TODO-15** | Anomalías skills restantes: `code-modernization` + `code-simplifier` (¿reubicar?); bundles `-main`. → `skills-inventory.md` | 🔮 | decisión cliente |
| **TODO-18** | **Blindaje pre-lanzamiento**: App Check observar % Verified → enforce · SEC-01 RBAC-read (pre-seed `crm.read` + OK + emulator) · LEGAL-01..06 (abogado) · rate-limit forms. Detalle `41`/`42` + `crm-handoff §9.7` | ⏳ | OK cliente / abogado |
| **TODO-19** | CRM Fase 5: migrar Inventario/Sitio/Config al portal → cutover del admin viejo (`crm-handoff §9.5/9.6`) | 🔮 | tras TODO-18 (TODO-17 ✅ §175) |
| **TODO-20** | **Comité v6**: ejecutar checklist C→U (VEREDICTO 2026-06-09 — gates kernel v1.2, skill auditoría, template 1.1.0, brain-diff, GC bersaglio, re-verificación inmobiliaria) | 🔄 en curso | C = decisión cliente |

Detalle ampliado de pendientes legacy → `99-HISTORIAL-ADR.md` §109.

---

## 📝 Bitácora (efímera)

> Vaciada en el GC 2026-06-09 (comité v6, ítem F). Todo lo anterior está consolidado: **§157-§172**
> (sitio/CRM/cerebro) + **§173** (decisión comité v6). Detalle de cualquier § → `00-INDICE` → `99`.
>
> - **2026-06-09 (tarde)**: TODO-17 E2E live ✅ (§175). Hallazgos: incidente billing-disabled ~2h
>   (functions muertas; Eventarc re-entregó al recuperarse — L-38) + bug spinner form contacto
>   (`.form-card`, L-37, fix commiteado en branch). Shard `31-LECCIONES-GIT` (30 estaba al tope).
>   Cache bump `v20260609181210`. Quedan 2 `leads/` de prueba por borrar (cliente).
