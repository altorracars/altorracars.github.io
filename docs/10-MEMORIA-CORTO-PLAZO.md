# ⚡ 10 — MEMORIA A CORTO PLAZO (WIP / Sprint activo)

> **Nodo: pizarra del sprint** (auto-carga con `CLAUDE.md` + `05`). SOLO lo vivo: foco actual,
> pendientes (TODO-NN), bitácora efímera. Estado técnico → `05`. Al cerrar tarea: consolidar a
> ADR (`99`) + fila en `00`, lecciones a `30`, y PODAR esto al foco vivo (GC §G.4).
> **Convención de handoff**: el foco SIEMPRE incluye **🚫 callejones sin salida** (qué se probó
> que FALLÓ y por qué) — le ahorra al próximo "tú" repetir errores descartados.

---

## 🎯 Foco actual

> 🤖 **Opus 4.8** (Fable caído): tag `⟦OPUS-4.8 · rev-Fable⟧`. Bot LLM = saldo (#917 dormido).
>
> 🟢 **RELEVO (28/06 ⟦OPUS-4.8⟧ · contexto saturado → sesión FRESCA)**:
> **✅ CERRADO esta sesión — TODO-50 fase 2c (supresión rol-aware + BLOQUEO FISCAL del consignante).** Certificado (comité ×5 + 2ª opinión Gemini, ambas verificadas vs `.gov.co`), corregido (C1/C4), arquitectura SEGURA (`delete`→BLOQUEO: consignante-con-venta retiene la cédula por deber fiscal hasta `retentionUntil`=venta+5a; cron de purga diferida). 302 tests, DEPLOYED, dev==main. **RESTA (HUMANOS):** colegiado ratifica el BORRADOR de textos (en `42`) · contador (umbral exógena) · val.live. SSoT → `42` §Certificación + spec `2026-06-28-todo50`.
> **🎯 PRÓXIMO FOCO (sesión fresca): ALIADOS — validar LIVE** (TODO-25 §259, dueño) · luego facturación TODO-26.
> **DIFERIDO**: bot v2 iter-2 + val.live bot; filtros L-56 (en main); TODO-51 menores.
>
> 🗄️ **Durable**: **⚖️ Gate P4** — legal público NO sin abogado (§42).
>
> **🚫 Callejones sin salida (NO reintentar)**:
> (a) **NO custom claims ahora** — reglas Fase 1 usan lookup `usuarios/{uid}`; claims = Fase 5 (§159.3).
> (b) **NO `preview_screenshot`** (se cuelga tras `preview_resize`, L-28) — usar `preview_snapshot`+`preview_eval`.
> (c) Consejo Externo = Gemini/Antigravity **code-aware solo-lectura** (§224); cuándo + R1-R4 → `§15`; seguridad/dinero/arquitectura ESTRUCTURAL, no rutina.
> (d) **NO E2E de forms en localhost** (L-08/§175) — E2E solo contra live; UI con stub `window.db`.
> (e) **NO mutar config de producción vía MCP** (el clasificador lo deniega) — ruta: acción de 1 clic del dueño (patrón F39) o autorización explícita.
> (f) **Fan-out acotado escala LIBRE** si agente = in-cwd read-only + structured-output + sin tools gateadas (git/fuera-cwd cuelga en bg → worktree/foreground). L-50/§226.
> (g) **Bot v2 = grafo de nodos tras flag** (default v1, riesgo cero). v1 battle-tested INTACTO; NO big-bang, NO Vite (vanilla). Módulo `js/concierge/shared/` (NO copiar). Detalle → defects-log §F-1.
> (h) **Auditoría verifica CÓDIGO, no DEPLOY** — claim "LIVE" se chequea live (Firebase MCP), no por inferencia; verificadores SIN Bash (cuelgue gateado L-50). Panel ≠ journal.
> (i) **Validación live SIN screenshot = cobertura fingida (M-23)** — el DOM caza texto/lógica, NO diseño → screenshot del render (extensión `computer`; preview cuelga L-28).

---

## 📋 Pendientes abiertos (TODO-NN) — ledger ÚNICO de pendientes

> Al cerrar uno: ✅ + link al ADR, y retirarlo en la próxima poda.

| ID | Item | Estado | Bloqueo |
|---|---|---|---|
| **TODO-01/02·03·06·07/08·09-13·15·18** | Legacy diferidos/opcionales/absorbidos (Cloudflare+Vite·CSS·SEO·CSAT·deuda·skills·blindaje→E5). **Detalle §109**. | 🔮/✅ | varios |
| **TODO-19** | CRM Fase 5 → E6 EN CURSO (E6.6 ✅ §188) | ⏳ | — |
| **TODO-49** | **🔁 Re-barrido del gap ⟦OPUS⟧** — 1er barrido incompleto; re-lanzar SIN Bash (callejón h) sobre lo no verificado. | 🔵 | tras implementar |
| **TODO-21** | **Plan CRM E0→E6** — E0→E5 ✅ main · E6 ⏳ (§188) | ⏳ | — |
| **TODO-22** | **Fábrica de skills web** (rescate webs monolíticas) §193.2 | 🔮 | post-panel |
| **TODO-23** | **DINAMISMO/CMS web TOTAL ⟦OPUS-4.8⟧** — secciones editables + bloques tipados. CMS por marca ✅ (§222); resta CMS total. Plan→bóveda · skill `cms-dinamico`. | 🔮 plan ✅ | al final |
| **TODO-24** | **Comité BORRADORES** §202.5 — f1+2+3 ✅(§230). Resta: barrido recurrente → futuro. | 🔄 | futuro |
| **TODO-25** | **RESTRUCTURA COMERCIAL ⟦OPUS⟧** (aliado/consigna/propio + comisiones) — DISEÑO FROZEN; **MVP DESPLEGADO** (ADR-259). Plan→`…2026-06-27-aliados-mvp-impl-plan.md`. | 🔄 | val.live (dueño) |
| **TODO-26** | **FACTURACIÓN + super-CRM ⟦OPUS⟧** (financiero/contable en panel; consultar Bersaglio). Bóveda `…restructura-comercial…` §8. | 🔒 ÚLTIMA | al final |
| **TODO-27** | **Alta usuarios = invite flow seguro ⟦OPUS⟧** (token+tx, anti-enumeración). Diseño→bóveda `2026-06-14-…cms-plan §6.4`. Skill portable. | 🔮 | tras dinamismo |
| **TODO-29** | **Endurecer el lazo ⟦OPUS⟧** — git-state hook; kernel/hook ×3. **Índice range-shardeable ✅** (§258; aplicado bersaglio §140). Resta: 99a/99b · `ignoreDirs` · **shardear `00-INDICE`** (52.7k/48k) **+ `30-LECCIONES`** (386L/350, ⚠️ excede — extraer categoría a hija). | 🔄 | — |
| **TODO-30** | **Despliegue-DINERO "Doble Llave + Staging" (§208.3) ⟦OPUS-4.8⟧** — gate IA (tests/invariantes BLOQUEANTES en CI) + acceptance Kary en STAGING + dueño autoriza prod. Aplica cars (F42/§TODO-25)+bersaglio. | 🔮 | Staging (dueño) |
| **TODO-32** | **ESCALABILIDAD cerebro** — (a)§228+(b)§229 ✅ (guardián índice + replicación selectiva). RESTA (YAGNI): genoma frontmatter + tiering 100x. | 🔮 futuro | YAGNI |
| **TODO-34** | **EPIC bot LLM ⟦OPUS⟧** Opción A; F1-F3+wiring ✅ **DORMIENTE** (#917). FLIP=saldo. Bot v2→TODO-46/F-1. | 🔄 dormiente | dueño: saldo |
| **TODO-35** | **Código muerto (anti-Knight-Capital) ⟦OPUS⟧** — P0 `deadcode:check`✅ + P1 skill✅. Huérfanos del cutover (`manifest-admin.json`+`js/admin/*`, solo `admin.html` los cargaba→`_legacy/`). **DIFERIDO ~03/07** (cache, M-19). | 🔄 diferido | ~03/07 |
| **TODO-42** | **HUB de Visibilidad ⟦OPUS-4.8⟧ (§244)** — 7 skills + agente `seo-auditor` construidas+catalogadas+propagadas ×3 ✅ (25/06). RESTA (por-proyecto): Core JS `visibility-core/` + `tenant_config`. | 🔄 | por-proyecto |
| **TODO-41** | **🔴 Motor automatización NO corre post-cutover ⟦OPUS⟧** (§242.5/§257/barrido) — `admin-automation.js` era client-side SOLO en `admin.html` (retirado) → reglas "Activas" pero NO ejecutan (SLA/cita core SÍ por cron). Migrar a Cloud Function + gap RBAC `workflows.edit`. | 🔴 sube | dueño/escala |
| **TODO-45** | **Cleanups §257 ⟦OPUS⟧** — (a) functions residuales del clásico (desplegadas, sin uso) limpiar; (b) `brands.saveBrand` desc=nombre; (c) `kb.edit` sin editor `_brain`; (d/e) coment stale + NBA. | 🔮 | bajo |
| **TODO-43** | **MFA-hardening portal nuevo ⟦OPUS⟧ (§253)** — portal nuevo = email+password-only; el SMS-MFA del admin viejo (2FA/trusted/backup/Telegram) NO se portó. Reimplementar TOTP+recovery si el dueño quiere. NO bloquea. | 🔮 futuro | dueño |
| **TODO-40** | **Curas auditoría N2 §239 ⟦OPUS⟧** — (a) freno duro del boot-budget en el linter (M-10); (b) gate de drift source↔dist admin-app (AUD-04). Mecanizar vs aceptar. | 🔮 | bajo |
| **TODO-44** | **Fiabilidad cerebro ⟦OPUS⟧** — §257 + M-22 (check #16 ×4 ✅). RESTA: adopción `verificado-vivo:`. Absorbe TODO-33. | 🔄 | adopción |

| **TODO-46→F-1** | **Bot v2 FLUJO + chat vivo ⟦OPUS⟧** — rediseño B1/B2/B3 VALIDADO LIVE + 3 bugs post-val FIXED. Detalle→defects-log. RESTA: roundtrip chat live (dueño=asesor) + iter-2 (marca·FAQ·visual·ARIA). | 🔄 | roundtrip+iter2 |
| **TODO-48** | **Remediar drift CRM del cutover ⟦OPUS⟧** — MF4.x del admin viejo NO portadas (360°/Contactos-KPIs/masivas/Postventa-NPS) + doc-fixes. Detalle→bóveda `…barrido-drift…`. | 🔵 | tras bot |

| **TODO-50** | **Consigna = ENTIDAD FORMAL ⟦OPUS⟧** — chunk1+fase2+**fase2c rol-aware + C1+C4 + GUARDRAIL BLOQUEO FISCAL** IMPL+VERIF+DEPLOYED 28/06 ✅ (L-57; 302 tests; **certificación legal comité×5 + 2ª opinión Gemini, ambas vs `.gov.co`**: `delete`→**bloqueo** para consignante-con-venta). SSoT → spec + `42` §Certificación. **RESTA:** val.live · **contador** (`retentionUntil`) + **colegiado** (texto) · 3 `ZZZ PRUEBA` (dueño) · 4 viejas. | 🔄 | TODO-51+abogado |
| **TODO-51** | **Bloqueo fiscal — refinamientos ⟦OPUS⟧** — ciclo bloqueo→purga COMPLETO ✅ (`retentionUntil`=venta+5a + cron `crmDailyJob` d2-ter; 302 tests). RESTA (menor): grafo-comprador multi-rol durante el bloqueo + TEXTO art.14 (colegiado; borrador en `42`). | 🔵 | colegiado/menor |

Detalle ampliado de pendientes legacy → `99-HISTORIAL-ADR.md` §109.

---

## 📝 Bitácora (efímera)

> Histórico §184-§256 → `99`/`00`/`30`. Defectos bot UX → `altor-hub-rediseno-defectos.md`.
