# ⚡ 10 — MEMORIA A CORTO PLAZO (WIP / Sprint activo)

> **Nodo: pizarra del sprint** (auto-carga con `CLAUDE.md` + `05`). SOLO lo vivo: foco actual,
> pendientes (TODO-NN), bitácora efímera. Estado técnico → `05`. Al cerrar tarea: consolidar a
> ADR (`99`) + fila en `00`, lecciones a `30`, y PODAR esto al foco vivo (GC §G.4).
> **Convención de handoff**: el foco SIEMPRE incluye **🚫 callejones sin salida** (qué se probó
> que FALLÓ y por qué) — le ahorra al próximo "tú" repetir errores descartados.

---

## 🎯 Foco actual

> 🤖 **Opus 4.8** (Fable 5 caído): tag `⟦OPUS-4.8 · rev-Fable⟧` en entregas (detalle → `05`).

> 🧠 **AUDITORÍA DE FIABILIDAD DEL CEREBRO — RAN ✅ esta sesión (§257)**: veredicto BALANCEADO (mayoría de "✅" REALES: CRM+sitio+admin live, 59 functions desplegadas=exacto, bot desplegado). Brechas: aliados sin ejecutar (TODO-25) · motor automatización no corre (TODO-41↑) · functions huérfanas + menores (TODO-45). Cura=**M-22** (estados explícitos); falta mecanizar check (kernel ×3=TODO-44) + reconciliación exhaustiva continúa.
>
> 🎨 **REDISEÑO portal W-11 — F1 EN CURSO** (spec `…portal-crm-rediseno-W11.md`): **F1(a) selección múltiple + acciones masivas en Bandeja = BUILT + verificado preview** (aditivo, build limpio; **falta verif LIVE dueño**). Hallazgo: la Bandeja real ya era fuerte → no hacía falta tabla densa; el gap era multi-select. PEND F1: (b) "Nuevo lead" topbar · (c) drawer móvil. F2: grupos `<details>`+fix `setActive`+iconos SVG. Palette Ctrl+K diferido. Aliados=aliado (§205 ok; comercial→TODO-25). Bot LLM=saldo. (Build/cache → `05`.)

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
| **TODO-34** | **EPIC bot LLM ⟦OPUS-4.8⟧** Opción A (solo-LLM+Tool Calling+botones+guards); F1.a·F2·F3·TTL·wiring ✅ **DORMIENTE** (#917). FLIP = saldo Anthropic (al final). F4/F5→§236; ahora parte del PLAN UNIFICADO §237. | 🔄 dormiente | dueño: saldo·consent |
| **TODO-35** | **Código muerto (anti-Knight-Capital) ⟦OPUS⟧.** P0 `deadcode:check`✅ (0 huérfanas) + P1 skill✅. **Huérfanos del cutover**: `manifest-admin.json`+`js/admin/*` (solo los cargaba `admin.html`, ya en `_legacy/`). **DIFERIDO ~03/07** (≥1 sem): purgarlos hoy rompe asesores con `admin.html` CACHEADO (skill §4). M-19. | 🔄 diferido | ~03/07 (cache) |
| **TODO-42** | **HUB de Visibilidad ⟦OPUS-4.8⟧ (§244/§244.8)** — 7 skills + agente `seo-auditor` (IoC+D′, $0): construidas+catalogadas + **propagadas ×3 siblings ✅** (25/06) + plantilla + install ✅. RESTA (por-proyecto): Core JS `visibility-core/` + `tenant_config` por web. | 🔄 propagación ✅ | por-proyecto |
| **TODO-41** | **🔴 Motor de automatización NO corre post-cutover ⟦OPUS-4.8⟧** (§242.5/§257): el engine (`admin-automation.js`) corría client-side SOLO en `admin.html` (RETIRADO en el flip) → reglas configurables muestran "Activas" pero **NO se ejecutan** (las barridas SLA/cita core SÍ por cron). Migrar a Cloud Function + gap RBAC `workflows.edit`→`config/automationRules`. | 🔴 sube | dueño/escala |
| **TODO-45** | **Cleanups auditoría §257 ⟦OPUS-4.8⟧** — (a) functions huérfanas del clásico retirado (`onNewSolicitud`/`onSolicitudWritten`/`onSolicitudStatusChanged`/`onClienteCreated`) ¿desplegadas sin uso? verificar+limpiar; (b) `brands.saveBrand` descripción=nombre (bug datos); (c) `kb.edit` sin función de edición de `_brain`; (d) comentario stale `wizard.js`; (e) NBA doc "10" vs 9. | 🔮 | bajo |
| **TODO-43** | **MFA-hardening portal nuevo ⟦OPUS⟧ (§253)** — el portal nuevo es email+password-only; el stack SMS-MFA del admin viejo (2FA/trusted-devices/backup-codes/preguntas) + Telegram NO se portó (no encaja en auth modular). Reimplementar como **TOTP**+recovery si el dueño quiere endurecer. NO bloquea. | 🔮 futuro | dueño |
| **TODO-40** | **Curas auditoría N2 §239 ⟦OPUS-4.8⟧** — (a) **freno duro del boot-budget** en el linter (hoy info-only 3 auditorías = M-10; boot +14%); (b) **gate/marker de drift source↔dist** admin-app (hoy la intención staging vive solo en prosa, AUD-04). Decidir mecanización vs aceptar-como-conocido. | 🔮 | bajo (no bloquea) |
| **TODO-44** | **Fiabilidad del cerebro ⟦OPUS-4.8⟧** — auditoría RAN ✅ (§257, 26/06): matriz de brechas + cura DISEÑO **M-22**; INTERIM aplicado (overstatements corregidos). **RESTA**: (a) mecanizar check `verificado-vivo`/stale en `brain-check.mjs` = **kernel ×3 coordinado** (canon bersaglio); (b) reconciliación exhaustiva (Storage/índices/289 ADRs). Absorbe TODO-33. | 🔄 interim ✅ | kernel ×3 + cont. |

Detalle ampliado de pendientes legacy → `99-HISTORIAL-ADR.md` §109.

---

## 📝 Bitácora (efímera)

> Histórico §184-§256 → `99`/`00`/`30`. **26/06**: F-6 cutover COMPLETO+validado live (§253-256) · M-21 (caza-bugs happy-path) · §252 gate · **CRM clean-slate** (206 docs prueba, L-53) · **rediseño frontend ARRANCADO** (W-11). Defectos bot → `altor-hub-rediseno-defectos.md`.
