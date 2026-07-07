# ⚡ 10 — MEMORIA A CORTO PLAZO (WIP / Sprint activo)

> **Nodo: pizarra del sprint** (auto-carga con `CLAUDE.md` + `05`). SOLO lo vivo: foco actual,
> pendientes (TODO-NN), bitácora efímera. Estado técnico → `05`. Al cerrar tarea: consolidar a
> ADR (`99`) + fila en `00`, lecciones a `30`, y PODAR esto al foco vivo (GC §G.4).
> **Convención de handoff**: el foco SIEMPRE incluye **🚫 callejones sin salida** (qué se probó
> que FALLÓ y por qué) — le ahorra al próximo "tú" repetir errores descartados.

---

## 🎯 Foco actual

> 🤖 **AHORA = OPUS 4.8** (Fable agotó cuota gratis 06/07; dueño avisará al volver). **ARRANQUE = §0 + §0.b del PLAN MAESTRO** (`specs/2026-07-03-…fable5.md` = SSoT ejecución, olas 0-4 · TODO-52 EPIC #1) ANTES de código; tag `⟦OPUS-4.8⟧`. **YO decido+ejecuto+mergeo** (M-12/M-25); claims stale → grep (L-62).
> ✅ **OLA 0-1 · OLA 2: 2.1-2.8/2.10/2.12a · OLA 3.1-3.4 COMPLETOS** (§267-§279; 3.3 fuentes horneadas→FOUT muerto `46cad599`; 3.4 triple dorado→capa rediseño al canónico #D4A85A `9aed2ebe`). **Barrido legacy `#d4af37`→`#D4A85A` DIFERIDO** (~200 usos, cambio de marca; scope→`20 §🎨`+§279). Dueño confirmó live: Excel ✓ · vehiculos/47 ✓. Bot LLM dormido (#917=saldo). ⚠️ `dist/` se COMMITEA por bloque.
> **🧹 GATES DUEÑO — delegó el CUÁNDO a mí (06/07); juicio: APARCADOS mientras usa el portal en vivo** (todos tocan producción activa): (1) MFA 2.9 → cuando el portal esté días-sólido · (2) App Check 2.11 (métricas) · (3) cutover `_legacy` 2.12b DIFERIDO (§275.4) · (4) validar-live: supresión + presencia §274 · (5) **GSC noindex `detalle-vehiculo.html` (§276.7)** · (6) saldo bot · purga `clientes`/`suppressions`.
> **▶️ SIGUE (sin gate): OLA 3** — 3.5 a11y hamburguesa (`aria-expanded/aria-controls` en `snippets/header.html:81` + inline index + toggle `home-chrome.js`) · 3.6 bot pulido (defectos #3/#5/#6). Detalle plan §3. Cadencia §0.b.
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
> (k) **Workflow read-only PUEDE colgar 1 agente** (structured-output, sin tool gateada) → bloquea `parallel()`; cosechar del `journal.jsonl` + `TaskStop` + straggler a mano (**L-61**).
> (l) **Audit que clasifica código = FALSOS POSITIVOS** (infiere emoji desde `icon('id')` ya presente) → verificar cada hallazgo con grep real, no a ciegas (**L-62**).

---

## 📋 Pendientes abiertos (TODO-NN) — ledger ÚNICO de pendientes

> Al cerrar uno: ✅ + link al ADR, y retirarlo en la próxima poda.

| ID | Item | Estado | Bloqueo |
|---|---|---|---|
| **TODO-52** | **🟣 EPIC #1 — CRM Overhaul ⟦OPUS⟧** — ejecución ordenada → **PLAN MAESTRO 03/07** (olas 0-4); visión → brief 29/06. | 🔄 impl | OLA 0 primero |
| **TODO-01/02·03·06·07/08·09-13·15·18** | Legacy diferidos/opcionales/absorbidos (Cloudflare+Vite·CSS·SEO·CSAT·deuda·skills·blindaje→E5). **Detalle §109**. | 🔮/✅ | varios |
| **TODO-19** | CRM Fase 5 → E6 EN CURSO (E6.6 ✅ §188) | ⏳ | — |
| **TODO-49** | **🔁 Re-barrido del gap ⟦OPUS⟧** — 1er barrido incompleto; re-lanzar SIN Bash (callejón h) sobre lo no verificado. | 🔵 | tras implementar |
| **TODO-21** | **Plan CRM E0→E6** — E0→E5 ✅ main · E6 ⏳ (§188) | ⏳ | — |
| **TODO-22** | **Fábrica de skills web** (rescate webs monolíticas) §193.2 | 🔮 | post-panel |
| **TODO-23** | **DINAMISMO/CMS web TOTAL ⟦OPUS⟧** — CMS por marca ✅ (§222); resta CMS total. Skill `cms-dinamico`. | 🔮 | al final |
| **TODO-24** | **Comité BORRADORES** §202.5 — f1+2+3 ✅(§230). Resta: barrido recurrente → futuro. | 🔄 | futuro |
| **TODO-26** | **FACTURACIÓN + super-CRM ⟦OPUS⟧** (financiero/contable en panel; consultar Bersaglio). Bóveda `…restructura-comercial…` §8. | 🔒 ÚLTIMA | al final |
| **TODO-27** | **Alta usuarios = invite flow seguro ⟦OPUS⟧** (token+tx, anti-enumeración). Diseño→bóveda `2026-06-14-…cms-plan §6.4`. Skill portable. | 🔮 | tras dinamismo |
| **TODO-29** | **Endurecer el lazo ⟦OPUS⟧** — range-shard ✅ (§258); **`00`→`00a-INDICE` (§1–159) + `30`→`32-LECCIONES-META` (M-NN) SHARDEADOS ✅ 03/07** (38k/43k, holgura). Resta menor: 99a/99b · `ignoreDirs` · `33-FRONTEND` (headroom, baja prioridad). | 🔄 | — |
| **TODO-30** | **Despliegue-DINERO "Doble Llave + Staging" (§208.3) ⟦OPUS⟧** — gate IA (tests/invariantes en CI) + acceptance Kary en STAGING + dueño autoriza prod. Cars+bersaglio. | 🔮 | Staging (dueño) |
| **TODO-32** | **ESCALABILIDAD cerebro** — §228+§229 ✅. RESTA (YAGNI): genoma frontmatter + tiering 100x. | 🔮 | YAGNI |
| **TODO-34** | **EPIC bot LLM ⟦OPUS⟧** Opción A; F1-F3+wiring ✅ DORMIENTE (#917). FLIP=saldo. Bot v2→TODO-46. | 🔄 | dueño: saldo |
| **TODO-42** | **HUB de Visibilidad ⟦OPUS⟧ (§244)** — 7 skills + agente `seo-auditor` ✅ (25/06). RESTA: Core JS `visibility-core/` + `tenant_config`. | 🔄 | por-proyecto |
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
