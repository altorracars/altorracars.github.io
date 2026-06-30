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
> 🟢 **RELEVO (sesión 29/06 g CERRADA context-full → arranca en SIGUE↓) ⟦OPUS-4.8⟧** — **🟣 EPIC #1: TODO-52 CRM Overhaul.** SSoT = brief `…crm-overhaul…` (§MEGA-PLAN/§PASE-1/§FASE-B). 🌟 **VISIÓN #1 = nivel TOP MUNDIAL** — ya escrita ahí, NO re-preguntar; **YO decido+ejecuto+mergeo, el dueño NO opera git ni delibera código** (M-12/M-25). Multi-tenancy DESCARTADA. Pend. hygiene: consolidar la sesión a ADRs §NN en `99` (todo el detalle ya en el brief).
> **HECHO 29/06 d-g (DEPLOYED; detalle→brief §PASE-1/§FASE-B, consolidar a ADR §NN):** PASE-1 · §219 RBAC · accent-picker ELIMINADO (oro `#D4A85A`) · dataScope P0-SEC-1 · Perfil Telegram · emoji→SVG botones (14 módulos). [suite 326✅; `'department'`→`'own'` latente; MFA→TODO-43.]
> **HECHO 29/06 h-l (`479b34cc`→16 mód, dev→main):** emoji→SVG **estructural** en **16 módulos** (CRM+sitio+ajustes; lista→commits) — tabs·acciones·cards·badges·estados(empty→`navIcon` del módulo)·búsqueda·dropzones·warnings(`.warn-row`) + **voseo→tú** (login·seed·perfil·hub). FIX **L-60 ×3** (flex `flex:0 0 auto` · grid-`<button>` `padding:0` · combo L-23 `max-width:none`). `icons.js` ~45 glyphs. Build✅+live✅.
> **SIGUE P1:** módulos restantes (cms·backup·capture·agenda·contacts·wizard…) + **iconos de DOMINIO** (rating 🔥🌤️❄️·nba·channel·audit-actions 🛡👤🏢 en `classify/nba/scoring/auditoria.data` = **color/categoría semántica** → bloque propio que preserve `temp--hot/warm/cold`) + **Fase C** (mockups+design-system). **🎨 Doctrina (qué se DEJA):** saludo 👋·bandera 🇨🇴·toasts 🎉·ausencia 🏖·chips-sugerencia·rating ★☆·verificado ✔ — cálidos/culturales/convención/contenido, NO UI genérica. ⚠️ Re-sync FAQ→bot (TODO-34/46). Owner-delete NO bloquea.
> **🧹 Owner-pending:** purgar `ZZZ` (deal falso $1.3M en Alexander Daza) con el borrado nuevo.
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
> (j) **`confirm()` nativo BLOQUEA la extensión Chrome** (val.live 29/06): con el diálogo abierto la página no llega a `document_idle` → screenshots/clicks expiran 45s (parece colgado, NO lo está). Reparto: yo lleno/navego/verifico-Firestore, el DUEÑO da Aceptar; tab atascado → `tabs_create_mcp` (write server-side persiste → verificar por Firestore, no inferir).

---

## 📋 Pendientes abiertos (TODO-NN) — ledger ÚNICO de pendientes

> Al cerrar uno: ✅ + link al ADR, y retirarlo en la próxima poda.

| ID | Item | Estado | Bloqueo |
|---|---|---|---|
| **TODO-52** | **🟣 EPIC #1 — CRM Overhaul + Productización ⟦OPUS⟧ (29/06)** — rediseño premium dark-only + reorg + owner-delete P0 + 2 P0-SEC. Detalle VIVO → foco ↑ + brief SSoT. | 🔄 impl | backend P0-SEC + P1 + Fase C |
| **TODO-01/02·03·06·07/08·09-13·15·18** | Legacy diferidos/opcionales/absorbidos (Cloudflare+Vite·CSS·SEO·CSAT·deuda·skills·blindaje→E5). **Detalle §109**. | 🔮/✅ | varios |
| **TODO-19** | CRM Fase 5 → E6 EN CURSO (E6.6 ✅ §188) | ⏳ | — |
| **TODO-49** | **🔁 Re-barrido del gap ⟦OPUS⟧** — 1er barrido incompleto; re-lanzar SIN Bash (callejón h) sobre lo no verificado. | 🔵 | tras implementar |
| **TODO-21** | **Plan CRM E0→E6** — E0→E5 ✅ main · E6 ⏳ (§188) | ⏳ | — |
| **TODO-22** | **Fábrica de skills web** (rescate webs monolíticas) §193.2 | 🔮 | post-panel |
| **TODO-23** | **DINAMISMO/CMS web TOTAL ⟦OPUS⟧** — CMS por marca ✅ (§222); resta CMS total. Skill `cms-dinamico`. | 🔮 | al final |
| **TODO-24** | **Comité BORRADORES** §202.5 — f1+2+3 ✅(§230). Resta: barrido recurrente → futuro. | 🔄 | futuro |
| **TODO-26** | **FACTURACIÓN + super-CRM ⟦OPUS⟧** (financiero/contable en panel; consultar Bersaglio). Bóveda `…restructura-comercial…` §8. | 🔒 ÚLTIMA | al final |
| **TODO-27** | **Alta usuarios = invite flow seguro ⟦OPUS⟧** (token+tx, anti-enumeración). Diseño→bóveda `2026-06-14-…cms-plan §6.4`. Skill portable. | 🔮 | tras dinamismo |
| **TODO-29** | **Endurecer el lazo ⟦OPUS⟧** — git-state hook; índice range-shard ✅ (§258). Resta: 99a/99b · `ignoreDirs` · shardear `00-INDICE` + `30-LECCIONES` + `33-FRONTEND` (exceden). | 🔄 | — |
| **TODO-30** | **Despliegue-DINERO "Doble Llave + Staging" (§208.3) ⟦OPUS⟧** — gate IA (tests/invariantes en CI) + acceptance Kary en STAGING + dueño autoriza prod. Cars+bersaglio. | 🔮 | Staging (dueño) |
| **TODO-32** | **ESCALABILIDAD cerebro** — §228+§229 ✅. RESTA (YAGNI): genoma frontmatter + tiering 100x. | 🔮 | YAGNI |
| **TODO-34** | **EPIC bot LLM ⟦OPUS⟧** Opción A; F1-F3+wiring ✅ DORMIENTE (#917). FLIP=saldo. Bot v2→TODO-46. | 🔄 | dueño: saldo |
| **TODO-35** | **Código muerto (anti-Knight-Capital) ⟦OPUS⟧** — `deadcode:check`✅ + skill✅. Huérfanos cutover→`_legacy/`. DIFERIDO ~03/07 (M-19). | 🔄 | ~03/07 |
| **TODO-42** | **HUB de Visibilidad ⟦OPUS⟧ (§244)** — 7 skills + agente `seo-auditor` ✅ (25/06). RESTA: Core JS `visibility-core/` + `tenant_config`. | 🔄 | por-proyecto |
| **TODO-41** | **🔴 Motor automatización NO corre post-cutover ⟦OPUS⟧** (§242.5/§257/barrido) — `admin-automation.js` era client-side SOLO en `admin.html` (retirado) → reglas "Activas" pero NO ejecutan (SLA/cita core SÍ por cron). Migrar a Cloud Function + gap RBAC `workflows.edit`. | 🔴 sube | dueño/escala |
| **TODO-45** | **Cleanups §257 ⟦OPUS⟧** — (a) functions residuales clásico (sin uso); (b) `brands.saveBrand` desc=nombre; (c) `kb.edit` sin editor `_brain`; (d/e) coment stale+NBA. | 🔮 | bajo |
| **TODO-43** | **MFA portal nuevo ⟦OPUS⟧ (§253)** — nuevo=email+pass only; SMS-MFA viejo (2FA/trusted/backup/TG) NO portado. Reimplementar TOTP+recovery si el dueño quiere. | 🔮 | dueño |
| **TODO-40** | **Curas auditoría N2 §239 ⟦OPUS⟧** — (a) freno boot-budget linter (M-10); (b) gate drift source↔dist (AUD-04). | 🔮 | bajo |
| **TODO-44** | **Fiabilidad cerebro ⟦OPUS⟧** — §257+M-22 (check #16 ×4 ✅). RESTA: adopción `verificado-vivo:`. Absorbe TODO-33. | 🔄 | adopción |

| **TODO-46** | **Bot v2 flujo + chat vivo ⟦OPUS⟧** — B1/B2/B3 LIVE + 3 bugs FIXED (defects-log). RESTA: roundtrip chat + iter-2 (marca·FAQ·ARIA). | 🔄 | roundtrip |
| **TODO-48** | **Drift CRM del cutover ⟦OPUS⟧** — MF4.x admin viejo NO portadas (360°/KPIs/masivas/NPS) + doc-fixes. Bóveda `…barrido-drift…`. | 🔵 | tras bot |

| **TODO-50** | **Consigna = ENTIDAD FORMAL ⟦OPUS⟧** — IMPL+DEPLOYED ✅ (L-57; 302 tests; SSoT→spec + `42`). RESTA (humanos): colegiado·contador·val.live·purga ZZZ. | 🔄 | colegiado/contador |
| **TODO-51** | **Bloqueo fiscal — refinamientos ⟦OPUS⟧** — ciclo bloqueo→purga ✅ (`retentionUntil`+cron). RESTA (menor): grafo-comprador multi-rol + texto art.14 (`42`). | 🔵 | menor |

Detalle ampliado de pendientes legacy → `99-HISTORIAL-ADR.md` §109.

---

## 📝 Bitácora (efímera)

> Histórico §184-§256 → `99`/`00`/`30`. Defectos bot UX → `altor-hub-rediseno-defectos.md`.
