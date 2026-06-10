# ⚡ 10 — MEMORIA A CORTO PLAZO (WIP / Sprint activo)

> **Nodo: pizarra del sprint** (auto-carga con `CLAUDE.md` + `05`). SOLO lo vivo: foco actual,
> pendientes (TODO-NN), bitácora efímera. Estado técnico → `05`. Al cerrar tarea: consolidar a
> ADR (`99`) + fila en `00`, lecciones a `30`, y PODAR esto al foco vivo (GC §G.4).
> **Convención de handoff**: el foco SIEMPRE incluye **🚫 callejones sin salida** (qué se probó
> que FALLÓ y por qué) — le ahorra al próximo "tú" repetir errores descartados.

---

## 🎯 Foco actual

> 🧠 **MACRO-PROYECTO — Cerebro auto-evaluable v6** (2026-06-09; sucede a §170→§171→§172, cerebros INDEPENDIENTES sigue vigente). Comité v6 (16 agentes, **45 hallazgos verificados en disco**) decidió los 7 puntos del cliente: evaluación de 2 NIVELES (kernel v1.1/v1.2 con gates de severidad hardcodeada + skill portable `auditoria-cerebro` con sondas falsables/retrieval-drill), GC de DOS palancas (nodo 10 + router CLAUDE.md) con trinquete de caps, captura-en-ORIGEN, TODO-NN como ledger ÚNICO, brain-diff manual, template 1.1.0. **Plan + checklist A-U (ÚNICO tracking del macro-proyecto) → `docs/superpowers/specs/2026-06-09-comite-v6-cerebro-autoevaluable-VEREDICTO.md`** · crudo + tabla de hallazgos → `research-archive/2026-06-09-comite-v6-*`. **Estado: 19/21 ✅ (A-S; C resuelto con Gemini → bóveda `brain-private`, ADR §174) · ⏳ T (re-verificar inmobiliaria) + U (1ª auditoría Nivel-2, sesión fresca) · bóveda en GitHub PRIVADO ✓ (altorracars/brain-private) · 4 repos pusheados ✓**. 🚫 Callejones: NO classification-en-manifest, NO checklist-doc-nuevo, NO score LLM, NO brain-diff en boot, NO regex 5c para el BFS (no ve subdirs).

> 🏗️ **CRM — ejecutando plan E0→E6 (§176, TODO-21). E0 ✅ HECHA Y DEPLOYADA (§177)** — las 3 decisiones aprobadas ("ok todo"): spec única, F34 export/restore + `_migration`, F1 inmutable (verificado LIVE: CEO denegado), Bandeja F4/F6, F17-urgente cupos (rules+functions deployadas, cache `v20260610011703`). **Siguiente: E1a** (operación diaria ADITIVA: F40 offline+E.164 → F36 lead rápido `lead_intake` → P2 quick-log/pendientes-hoy/owner-obligatorio → P2.b → F38 routing → F37 SLA 2h + manual 1-pág + F33a + anuncio F42). Checklist de épicas → VEREDICTO (bóveda). Pendientes honestos E0: ensayo RESTORE en emulador (gate de E1b, primer one-shot real) — F17 live verificado este turno. ⏳ Cliente: verificar CAUSA del billing-disabled (console.cloud.google.com/billing) — se recuperó solo pero sin diagnóstico se repetirá.
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
| **TODO-18** | Blindaje pre-lanzamiento → **ABSORBIDO en épica E5 del plan §176** (SEC-01 + rate-limit + App Check enforce + gate legal). Detalle `41`/`42` | ⏳ → E5 | secuencia E0→E4 |
| **TODO-19** | CRM Fase 5 cutover → **ABSORBIDO en épica E6 del plan §176** (strangler + F32 móvil + F33b piloto + cutover contra F39) | 🔮 → E6 | tras E5 |
| **TODO-20** | **Comité v6**: ejecutar checklist C→U (VEREDICTO 2026-06-09 — gates kernel v1.2, skill auditoría, template 1.1.0, brain-diff, GC bersaglio, re-verificación inmobiliaria) | 🔄 en curso | C = decisión cliente |
| **TODO-21** | **Plan Comité CRM v2 (E0→E6)** — ledger maestro: checklist de épicas en el VEREDICTO (bóveda). E0 red de seguridad+cupos → E1a operación diaria → E1b pipeline v2 → E2 calendario → E3 CRUD/1581 → E4 post-venta → E5=TODO-18 → E6=TODO-19 | ⏳ | OK dueño a 3 decisiones (estados v3 · etapas v3 · F42) |

Detalle ampliado de pendientes legacy → `99-HISTORIAL-ADR.md` §109.

---

## 📝 Bitácora (efímera)

> Vaciada en el GC 2026-06-09 (comité v6, ítem F). Todo lo anterior está consolidado: **§157-§172**
> (sitio/CRM/cerebro) + **§173** (decisión comité v6). Detalle de cualquier § → `00-INDICE` → `99`.
>
> - **2026-06-09 (tarde)**: TODO-17 E2E live ✅ (§175). Hallazgos: incidente billing-disabled ~2h
>   (functions muertas; Eventarc re-entregó al recuperarse — L-38) + bug spinner form contacto
>   (`.form-card`, L-37, fix commiteado en branch). Shard `31-LECCIONES-GIT` (30 estaba al tope).
>   Cache bump `v20260609181210`.
> - **2026-06-09 (noche)**: Comité CRM v2 ✅ (§176) — leads de prueba borrados (autorizado);
>   VEREDICTO+crudo a la bóveda; manual `MANUAL-CRM-USO.md`; TODO-21 = ledger del plan E0→E6.
> - **2026-06-10 (madrugada)**: "ok todo" del dueño → **E0 ejecutada y deployada (§177)**:
>   crm-spec+tests, crmExport/crmRestore, _migration ×4, F1 (LIVE: CEO denegado ✅),
>   Bandeja F4/F6, F17 cupos. 57 tests verdes (5 contra emulador). Cache v20260610011703.
