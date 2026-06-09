# ⚡ 10 — MEMORIA A CORTO PLAZO (WIP / Sprint activo)

> **Nodo: pizarra del sprint** (auto-carga con `CLAUDE.md` + `05`). SOLO lo vivo: foco actual,
> pendientes (TODO-NN), bitácora efímera. Estado técnico → `05`. Al cerrar tarea: consolidar a
> ADR (`99`) + fila en `00`, lecciones a `30`, y PODAR esto al foco vivo (GC §G.4).
> **Convención de handoff**: el foco SIEMPRE incluye **🚫 callejones sin salida** (qué se probó
> que FALLÓ y por qué) — le ahorra al próximo "tú" repetir errores descartados.

---

## 🎯 Foco actual

> 🧠 **MACRO-PROYECTO — Cerebro auto-evaluable v6** (2026-06-09; sucede a §170→§171→§172, cerebros INDEPENDIENTES sigue vigente). Comité v6 (16 agentes, **45 hallazgos verificados en disco**) decidió los 7 puntos del cliente: evaluación de 2 NIVELES (kernel v1.1/v1.2 con gates de severidad hardcodeada + skill portable `auditoria-cerebro` con sondas falsables/retrieval-drill), GC de DOS palancas (nodo 10 + router CLAUDE.md) con trinquete de caps, captura-en-ORIGEN, TODO-NN como ledger ÚNICO, brain-diff manual, template 1.1.0. **Plan + checklist A-U (ÚNICO tracking del macro-proyecto) → `docs/superpowers/specs/2026-06-09-comite-v6-cerebro-autoevaluable-VEREDICTO.md`** · crudo + tabla de hallazgos → `research-archive/2026-06-09-comite-v6-*`. **Estado: 19/21 ✅ (A-S; C resuelto con Gemini → bóveda `brain-private`, ADR §174) · ⏳ T (re-verificar inmobiliaria) + U (1ª auditoría Nivel-2, sesión fresca) · bóveda en GitHub PRIVADO ✓ (altorracars/brain-private) · 4 repos pusheados ✓**. 🚫 Callejones: NO classification-en-manifest, NO checklist-doc-nuevo, NO score LLM, NO brain-diff en boot, NO regex 5c para el BFS (no ve subdirs).

> 🏗️ **CRM rebuild — NÚCLEO COMPLETO y DESPLEGADO** (detalle: ADR §158-§166 en `99` · arquitectura `20 §CRM-app` · roadmap/cutover `crm-handoff.md §9`). Portal `admin-app/` (Vite + Firebase modular) con 5 superficies LIVE: Bandeja+360 (§159) · Pipeline `deals` (§160) · Agenda (§161) · Reportes (§165) · Contactos (§166); captura web + manual (§162) + AUTO registro (§163) + newsletter (§164). Inteligencia **determinista** (sin LLM), $0. Backfill = N/A (cliente confirmó: web en lanzamiento, sin datos viejos). Secuencia: **TODO-17 (E2E live) → TODO-18 (blindaje) → TODO-19 (Fase 5 cutover)**.
>
> **🚫 Callejones sin salida (NO reintentar)**:
> (a) **NO custom claims ahora** — el backend NO los setea; reglas Fase 1 usan lookup `usuarios/{uid}`; claims = Fase 5 endurecimiento (§159.3). (b) **NO `preview_screenshot`** (se cuelga tras `preview_resize`, L-28) — verificar con `preview_snapshot` + `preview_eval`. (c) Consejo Externo ya consultado para modelo de datos/RBAC (blueprint §15) — re-consultar solo ante nuevo disparador caro-de-revertir.

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
| **TODO-16** | `description` >1024 en skills comité/legal — **✅ HECHO** (895/997 chars + descontaminadas, sesión 2026-06-09; retirar en próxima poda) | ✅ | — |
| **TODO-17** | **CRM E2E live**: crear lead/cita REAL en la web en vivo → confirmar llegada a la Bandeja (L-08: solo contra `main`) | ⏳ | merge+push del cliente |
| **TODO-18** | **Blindaje pre-lanzamiento**: App Check observar % Verified → enforce · SEC-01 RBAC-read (pre-seed `crm.read` + OK + emulator) · LEGAL-01..06 (abogado) · rate-limit forms. Detalle `41`/`42` + `crm-handoff §9.7` | ⏳ | OK cliente / abogado |
| **TODO-19** | CRM Fase 5: migrar Inventario/Sitio/Config al portal → cutover del admin viejo (`crm-handoff §9.5/9.6`) | 🔮 | tras TODO-17/18 |
| **TODO-20** | **Comité v6**: ejecutar checklist C→U (VEREDICTO 2026-06-09 — gates kernel v1.2, skill auditoría, template 1.1.0, brain-diff, GC bersaglio, re-verificación inmobiliaria) | 🔄 en curso | C = decisión cliente |

Detalle ampliado de pendientes legacy → `99-HISTORIAL-ADR.md` §109.

---

## 📝 Bitácora (efímera)

> Vaciada en el GC 2026-06-09 (comité v6, ítem F). Todo lo anterior está consolidado: **§157-§172**
> (sitio/CRM/cerebro) + **§173** (decisión comité v6). Detalle de cualquier § → `00-INDICE` → `99`.
