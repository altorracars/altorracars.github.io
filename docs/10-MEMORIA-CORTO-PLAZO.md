# ⚡ 10 — MEMORIA A CORTO PLAZO (WIP / Sprint activo)

> **Nodo: pizarra del sprint** (auto-carga con `CLAUDE.md` + `05`). SOLO lo vivo: foco actual,
> pendientes (TODO-NN), bitácora efímera. Estado técnico → `05`. Al cerrar tarea: consolidar a
> ADR (`99`) + fila en `00`, lecciones a `30`, y PODAR esto al foco vivo (GC §G.4).
> **Convención de handoff**: el foco SIEMPRE incluye **🚫 callejones sin salida** (qué se probó
> que FALLÓ y por qué) — le ahorra al próximo "tú" repetir errores descartados.

---

## 🎯 Foco actual

> 🤖 **AHORA = OPUS 4.8**. **YO decido+ejecuto+mergeo** (M-12/M-25); tag `⟦OPUS-4.8⟧`; claims stale → grep ANTES de construir (L-62). El PLAN MAESTRO (olas 0-4) está cerrado → foco = **TODO-53** (abajo).
> 🏁 **PLAN MAESTRO arco OLA 0-3 COMPLETO** (§267-§282). Diferidos: #6 bot→flip (§282.4) · barrido legacy oro (`20 §🎨`+§279). ✅ **Cache sin deuda** (SW network-first/SWR `no-cache` sirve fresco sin bump, L-65). ⚠️ `dist/` se commitea por bloque.
> **🧹 GATES DUEÑO APARCADOS** (delegó el CUÁNDO a mí 06/07; tocan producción viva): MFA 2.9 · App Check 2.11 · cutover 2.12b (§275.4) · validar-live supresión+presencia (§274) · GSC noindex `detalle-vehiculo.html` (§276.7) · saldo bot · purga `clientes`/`suppressions`.
> **▶️ SIGUE = TODO-53 (mandato dueño 06/07): AUDITORÍA HOLÍSTICA diseño+infra** hacia "top mundial". SSoT = spec `2026-07-06-auditoria-holistica-diseno-infra.md`. ✅ **P0.1 (§283) · P1 (§284) · P2 (§285) · P3.1 hero index (§286) · P3.2 vehículos (§287) · P3.3 carrusel (§289) · P3.4+P3.5 banner marca (§291: src+preload · PNG→WebP −66%)**. Colaterales (sesiones hermanas): §288 fix selftest marca CRLF · §290 CI gate. **✅✅ VALIDADO LIVE (deploy `f104708c`)**: homepage prod móvil = **LCP 662ms (era 22.6s), CLS 0.03** — score-killer ELIMINADO en producción. **RESTA (menor, retorno decreciente)**: render-blocking (inconsistente) · minify (decisión build) · P0 barrido panel (extensión) + P4. El dueño puede correr PageSpeed oficial para el score exacto. Bloqueados sin dinero: flip LLM #917 · Cloudflare. Cadencia §0.b.
>
> 🗄️ **Durable**: **⚖️ Gate P4** — legal público NO sin abogado (§42).
>
> **🚫 Callejones (NO reintentar; detalle en el §/L citado)**:
> (a) NO custom claims aún (Fase 1=lookup `usuarios/{uid}`; §159.3). (b) NO `preview_screenshot` (cuelga tras resize L-28)→`snapshot`+`eval`. (c) Consejo Externo=Gemini code-aware **solo-lectura** (§224/§15), no rutina. (d) NO E2E forms localhost (L-08/§175)→solo live+stub `window.db`. (e) NO mutar config prod vía MCP→acción 1-clic dueño (F39). (f) Fan-out acotado escala libre si in-cwd read-only+structured-output sin tools gateadas (git cuelga bg→worktree/fg) L-50/§226.
> (g) Bot v2=grafo tras flag (v1 INTACTO; NO big-bang/Vite; `js/concierge/shared/` NO copiar) §F-1. (h) Auditoría=CÓDIGO≠DEPLOY→"LIVE" se chequea live (Firebase MCP), verificadores SIN Bash L-50. (i) Val. live SIN screenshot=cobertura fingida (M-23)→screenshot del render (ext. `computer`). (j) `confirm()` nativo BLOQUEA la ext. Chrome→yo lleno/verifico-Firestore, dueño Acepta; tab atascado→`tabs_create_mcp`. (k) Workflow read-only puede colgar 1 agente→bloquea `parallel()`; cosechar `journal.jsonl`+`TaskStop` (L-61). (l) Audit que clasifica código=FALSOS POSITIVOS→verificar con grep real (L-62).

---

## 📋 Pendientes abiertos (TODO-NN) — ledger ÚNICO de pendientes

> Al cerrar uno: ✅ + link al ADR, y retirarlo en la próxima poda.

| ID | Item | Estado | Bloqueo |
|---|---|---|---|
| **TODO-52** | **🟣 EPIC #1 — CRM Overhaul ⟦OPUS⟧** — PLAN MAESTRO 03/07 **arco OLA 0-3 ✅** (§267-§282); continúa como Directiva Permanente vía TODO-53. | 🔄 permanente | pulir |
| **TODO-53** | **🔎 AUDITORÍA HOLÍSTICA diseño+infra ⟦OPUS⟧ (mandato dueño 06/07)** — spec `2026-07-06-auditoria-holistica-diseno-infra.md`. P0.1 masonry ✅ (§283) · **P1 ✅ (§284)** · **P2 ✅ (§285)** · **P3.1 LCP hero ✅ (§286)** · **P3.2 LCP vehículos ✅ (§287)** · **P3.3 carrusel reflow ✅ (§289)** · **P3.4+P3.5 banner marca ✅ (§291: src+preload · PNG→WebP −66%)**. **✅✅ VALIDADO LIVE**: prod LCP 662ms (era 22.6s), CLS 0.03. RESTA (menor): render-blocking · minify · **P0 grid-gaps PRE-DIAGNOSTICADO §292 (masonry refutado 0/10; apply order-preserving = gate extensión)** · P0 barrido visual + P4 extensión Chrome. | 🔄 impl | menor/panel |
| **TODO-01/02·03·06·07/08·09-13·15·18** | Legacy diferidos/opcionales/absorbidos (Cloudflare+Vite·CSS·SEO·CSAT·deuda·skills·blindaje→E5). **Detalle §109**. | 🔮/✅ | varios |
| **TODO-19** | CRM Fase 5 → E6 EN CURSO (E6.6 ✅ §188) | ⏳ | — |
| **TODO-49** | **🔁 Re-barrido del gap ⟦OPUS⟧** — 1er barrido incompleto; re-lanzar SIN Bash (callejón h) sobre lo no verificado. | 🔵 | tras implementar |
| **TODO-21** | **Plan CRM E0→E6** — E0→E5 ✅ main · E6 ⏳ (§188) | ⏳ | — |
| **TODO-22** | **Fábrica de skills web** (rescate webs monolíticas) §193.2 | 🔮 | post-panel |
| **TODO-23** | **DINAMISMO/CMS web TOTAL ⟦OPUS⟧** — CMS por marca ✅ (§222); resta CMS total. Skill `cms-dinamico`. | 🔮 | al final |
| **TODO-24** | **Comité BORRADORES** §202.5 — f1+2+3 ✅(§230). Resta: barrido recurrente → futuro. | 🔄 | futuro |
| **TODO-26** | **FACTURACIÓN + super-CRM ⟦OPUS⟧** (financiero/contable en panel; consultar Bersaglio). Bóveda `…restructura-comercial…` §8. | 🔒 ÚLTIMA | al final |
| **TODO-27** | **Alta usuarios = invite flow seguro ⟦OPUS⟧** (token+tx, anti-enumeración). Diseño→bóveda `2026-06-14-…cms-plan §6.4`. Skill portable. | 🔮 | tras dinamismo |
| **TODO-29** | **Endurecer el lazo ⟦OPUS⟧** — range-shard ✅ (§258); **`00`→`00a-INDICE` (§1–159) + `30`→`32-LECCIONES-META` (M-NN) SHARDEADOS ✅ 03/07** (38k/43k, holgura). Resta menor: 99a/99b · `ignoreDirs` · **`33-FRONTEND` ⚠️ over cap (39k/34k tras L-66) → shard/GC = próximo candidato**. | 🔄 | — |
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

- **07/07 ⟦OPUS⟧ P0 grid-gap panel DIAGNOSTICADO → masonry §283 REFUTADO (§292, L-69)**: workflow 10 agentes → **0/10 APPLY-SAFE** (5 no-offender + 6 offenders ORDENADOS → masonry rompe lectura). Fix order-preserving = TRADEOFF visual → gate P4. Reviews = el peor. **0 código** (evité sweep ciego). 🚫 Callejón (m): no propagar un fix visual §NN sin re-verificar variable-height+orden por callsite.
- **07/07 ⟦OPUS⟧ Reconciliación 3-way (L-48)**: §288 (selftest CRLF, L-68) · §289 (P3.3 carrusel) · §290 (CI gate anti-XSS) — todo consolidado en `99`/`00`.
