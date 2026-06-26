# ⚡ 10 — MEMORIA A CORTO PLAZO (WIP / Sprint activo)

> **Nodo: pizarra del sprint** (auto-carga con `CLAUDE.md` + `05`). SOLO lo vivo: foco actual,
> pendientes (TODO-NN), bitácora efímera. Estado técnico → `05`. Al cerrar tarea: consolidar a
> ADR (`99`) + fila en `00`, lecciones a `30`, y PODAR esto al foco vivo (GC §G.4).
> **Convención de handoff**: el foco SIEMPRE incluye **🚫 callejones sin salida** (qué se probó
> que FALLÓ y por qué) — le ahorra al próximo "tú" repetir errores descartados.

---

## 🎯 Foco actual

> 🚀 **F-6 cutover · ✅ DUEÑO PRE-AUTORIZÓ** (26/06). Spec `2026-06-26-F-6-cutover-kickoff` + ADR §253. **Prep ✅**: FCM + banner re-login + **`perfil`** LIVE-validado (§253) + **Hub detalle VALIDADO LIVE E2E** (§254: claim/responder/presencia, yo vía extensión). **Checklist §3 del cutover CERRADO.** MFA-SMS/Telegram diferidos = TODO-43. **Queda SOLO el FLIP irreversible** (`admin.html`→`_legacy/`+redirect, toca SW/manifest/FCM) + **validación celular post-flip** (FCM push). Pre-autorizado; ejecutar con cuidado (puerta 1-sentido del admin de prod) → su propio ADR de cierre.
> ✅ **Cerrado previo**: F-4 Hub (§249) · F-5 fugas LIVE (§250) · Hub SMOKE ✅. Deploys=míos. Bug `onChatTransferred` FCM FIXED (`fcmTokens` son OBJETOS → consumer extrae `.token`).

> 🤖 **Opus 4.8** (Fable 5 caído): tag `⟦OPUS-4.8 · rev-Fable⟧` en entregas (detalle → `05`).

> 🧭 **FOCO MAESTRO: PLAN UNIFICADO** (§237): `admin-app/` = portal único, apagar `admin.html`. F-2..F-5 ✅ + F-6 prep ✅ → **F-6 flip** (último, irreversible; L-53). Yo manejo lo técnico; dueño decide dinero/legal/go-no-go. **Pend**: purga lead `PRUEBA-CLAUDE`/`3001112233` · bot LLM DORMIENTE (#917)=saldo. (Build/cache/sync → `05`.)

> 🗄️ **Fuera del foco** (status → ledger TODO + `99`): CRM E0→E6 ✅ · CMS marca ✅ · cerebro v6 ✅. **⚖️ Gate P4** (durable): texto legal público (supresión/privacidad/consent F2) NO se publica sin abogado (§42).
>
> **🚫 Callejones sin salida (NO reintentar)**:
> (a) **NO custom claims ahora** — reglas Fase 1 usan lookup `usuarios/{uid}`; claims = Fase 5 (§159.3).
> (b) **NO `preview_screenshot`** (se cuelga tras `preview_resize`, L-28) — usar `preview_snapshot`+`preview_eval`.
> (c) Consejo Externo = Gemini/Antigravity **code-aware solo-lectura** (§224); cuándo + R1-R4 → `§15`; seguridad/dinero/arquitectura ESTRUCTURAL, no rutina.
> (d) **NO E2E de forms en localhost** (L-08/§175) — E2E solo contra live; UI con stub `window.db`.
> (e) **NO mutar config de producción vía MCP** (el clasificador lo deniega) — ruta: acción de 1 clic del dueño (patrón F39) o autorización explícita.
> (f) **NO fan-out grande/background de agentes aquí** (cuelga en lecturas gateadas + quema tokens, L-50/§226/§239) — ACOTADO: 1 agente in-cwd o comité foreground sin tools (verif §237/§239).

---

## 📋 Pendientes abiertos (TODO-NN) — ledger ÚNICO de pendientes

> Al cerrar uno: ✅ + link al ADR, y retirarlo en la próxima poda.

| ID | Item | Estado | Bloqueo |
|---|---|---|---|
| **TODO-01/02·03·06·07/08·09-13·15·18** | Legacy diferidos/opcionales/absorbidos: Cloudflare+Vite · critical CSS · cartagena SEO · CSAT+transferencias · deuda técnica menor · skills anomalías · blindaje→E5 (§176). **Detalle §109** + `41`/`42` | 🔮/✅ | varios |
| **TODO-19** | CRM Fase 5 cutover → **E6 EN CURSO**: E6.6 ✅ §188 → paso 0 pre-fase | ⏳ | — |
| **TODO-20** | **Comité v6 21/21** (A-U) — detalle §173/§207.11; follow-up cross-repo → TODO-28/29/30 | 🔄 | — |
| **TODO-21** | **Plan CRM E0→E6** — ledger en VEREDICTO (bóveda). **E0→E5 ✅ en main** · E6 ⏳ (plan 29 pasos §188) | ⏳ | — |
| **TODO-22** | **Fábrica de skills web** (rescate webs monolíticas) §193.2 | 🔮 | post-panel |
| **TODO-23** | **DINAMISMO/CMS web TOTAL ⟦OPUS-4.8⟧** — secciones editables + bloques tipados. CMS por marca ✅ (§222); resta CMS total. Plan→bóveda · skill `cms-dinamico`. | 🔮 plan ✅ | al final |
| **TODO-24** | **Comité BORRADORES** §202.5 → f1+2 ✅ LIVE · f3 purga huérfanos ✅ (§230). Resta: barrido recurrente + expiración drafts → futuro. | 🔄 | futuro |
| **TODO-25** | **RESTRUCTURA COMERCIAL ⟦OPUS-4.8⟧** (aliado/consigna/propio + comisiones) — DISEÑO FROZEN (bóveda `…restructura-comercial…` sec.9). Pend menor: aliado-neto-constante + fórmula fiscal (contador). | 🔄 decidido·impl pend | al FINAL |
| **TODO-26** | **Sistema FACTURACIÓN + super-CRM ⟦OPUS-4.8⟧** (facturación/financiero/contable en panel admin) — consultar Bersaglio al implementar. Bóveda `…restructura-comercial…` §8. | 🔒 ÚLTIMA fase | después de todo lo demás |
| **TODO-27** | **Alta de usuarios = invite flow seguro ⟦OPUS-4.8⟧** (token+transacción, anti-enumeración; reemplaza el alta vieja) — diseño Gemini en bóveda `2026-06-14-web-dinamismo-cms-plan.md §6.4`. Sugerir skill portable | 🔮 | DESPUÉS del dinamismo (orden dueño) |
| **TODO-29** | **Endurecer el lazo ⟦OPUS-4.8⟧** — git-state vía SessionStart hook (abolir git en `05`); kernel/hook ×3. Resta: shard 99a/99b · `ignoreDirs`. | 🔄 | kernel/hook ×3 |
| **TODO-30** | **Despliegue-DINERO "Doble Llave + Staging" (§208.3) ⟦OPUS-4.8⟧** — gate IA (tests/invariantes BLOQUEANTES en CI) + acceptance Kary en STAGING + dueño autoriza prod. Aplica cars (F42/§TODO-25)+bersaglio. | 🔮 | Staging (dueño) |
| **TODO-32** | **ESCALABILIDAD del cerebro** — paso (a)§228 + (b)§229 ✅ (guardián del índice + replicación SELECTIVA ×brains; detalle→§229/L-52). RESTA (YAGNI): genoma frontmatter + tiering 100x. | 🔮 futuro | YAGNI |
| **TODO-33** | **Reconciliación CEREBRO ↔ WEB REAL** (brain-check valida estructura interna, no realidad externa). **PARCIAL ✅ §230**: 57 functions + colecciones reconciliadas. Resta: Storage/rules/índices + colecciones vacías. | 🔄 parcial | al final |
| **TODO-34** | **EPIC bot LLM ⟦OPUS-4.8⟧** Opción A (solo-LLM+Tool Calling+botones+guards); F1.a·F2·F3·TTL·wiring ✅ **DORMIENTE** (#917). FLIP = saldo Anthropic (al final). F4/F5→§236; ahora parte del PLAN UNIFICADO §237. | 🔄 dormiente | dueño: saldo·consent |
| **TODO-35** | **Código muerto (anti-Knight-Capital) ⟦OPUS-4.8⟧.** **P0 `deadcode:check`✅ + P1 skill `anti-codigo-muerto`✅ + propagada ×4+global ✅ (§232).** 🔜 P2 workflow bounded + limpiar bot viejo (en F4/F5). M-19. | 🔄 P0+P1✅ | resto: P2·bot |
| **TODO-42** | **HUB de Visibilidad ⟦OPUS-4.8⟧ (§244/§244.8)** — 7 skills + agente `seo-auditor` (IoC+D′, $0): construidas+catalogadas + **propagadas ×3 siblings ✅** (25/06) + plantilla + install ✅. RESTA (por-proyecto): Core JS `visibility-core/` + `tenant_config` por web. | 🔄 propagación ✅ | por-proyecto |
| **TODO-41** | **Motor de automatización → server-side ⟦OPUS-4.8⟧** (§242.5): hoy el engine de reglas (`admin-automation.js`) corre client-side SOLO en sesión super_admin → frágil (sin super_admin abierto, no corre). Migrar a Cloud Function. + gap RBAC: mapear `workflows.edit`→write de `config/automationRules` en rules. | 🔮 | post-cutover / escala |
| **TODO-43** | **MFA-hardening del portal nuevo ⟦OPUS-4.8⟧ (§253)** — el portal nuevo es email+password-only; el stack SMS-MFA del admin viejo (2FA-SMS, dispositivos de confianza, backup codes, preguntas de seguridad) + Telegram link NO se portó (no encaja en el auth modular; ya era la realidad live). Reimplementar como **TOTP** (app autenticadora, más seguro+robusto que SMS) + recovery, si el dueño quiere endurecer. NO bloquea F-6. | 🔮 futuro | post-cutover (decisión dueño) |
| **TODO-40** | **Curas auditoría N2 §239 ⟦OPUS-4.8⟧** — (a) **freno duro del boot-budget** en el linter (hoy info-only 3 auditorías = M-10; boot +14%); (b) **gate/marker de drift source↔dist** admin-app (hoy la intención staging vive solo en prosa, AUD-04). Decidir mecanización vs aceptar-como-conocido. | 🔮 | bajo (no bloquea) |
| **TODO-39** | **🧭 PLAN UNIFICADO un-solo-panel-admin ⟦OPUS-4.8⟧ — FOCO MAESTRO** (spec `…PLAN-UNIFICADO…`, §237). Portal único `admin-app/`, apagar `admin.html`. **F-0.5..F-5 ✅** (§238-250) + **F-6 prep ✅** (§253). **F-1** spec'd (LLM=saldo). Sigue **F-6 FLIP** (gated; detalle→foco). | 🔄 F-2..F-5 ✅ | dueño: go-no-go |

Detalle ampliado de pendientes legacy → `99-HISTORIAL-ADR.md` §109.

---

## 📝 Bitácora (efímera)

> Histórico §184-§253 → `99`/`00`/`30`. **24-26/06**: PLAN UNIFICADO §237 · F-2..F-5 (§238-250) · auditoría N2 §239 · HUB Visibilidad §244 · flujo fuerte W-11 §251 · gate leads §252 (**PEND: E2E anónima fresca + purga `crmPurgeLead` = dueño**) · F-6 prep: módulo `perfil` §253. Defectos bot → `altor-hub-rediseno-defectos.md`.
