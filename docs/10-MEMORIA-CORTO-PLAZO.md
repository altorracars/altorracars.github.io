# ⚡ 10 — MEMORIA A CORTO PLAZO (WIP / Sprint activo)

> **Nodo: pizarra del sprint** (auto-carga con `CLAUDE.md` + `05`). SOLO lo vivo: foco actual,
> pendientes (TODO-NN), bitácora efímera. Estado técnico → `05`. Al cerrar tarea: consolidar a
> ADR (`99`) + fila en `00`, lecciones a `30`, y PODAR esto al foco vivo (GC §G.4).
> **Convención de handoff**: el foco SIEMPRE incluye **🚫 callejones sin salida** (qué se probó
> que FALLÓ y por qué) — le ahorra al próximo "tú" repetir errores descartados.

---

## 🎯 Foco actual

> 🤖 **AHORA = OPUS 4.8**. **YO decido+ejecuto+mergeo** (M-12/M-25); tag `⟦OPUS-4.8⟧`; claims stale → grep ANTES (L-62). **Foco activo = TODO-52 (EPIC #1 CRM, mandato permanente)**; retomar "continúa el EPIC TODO-52" con **contexto FRESCO** (brief lo pide, línea 70). **Próximo item = P0-CAPTURE** (pérdida silenciosa de leads = dinero) + P1 (voz voseo→tú-Colombia coherente c/`catalogo-voz`; emoji→SVG acotado) + Fase C mockups. SSoT brief `2026-06-29-crm-overhaul-productizacion-brief.md`.
> 🏁 PLAN MAESTRO OLA 0-3 ✅ (§267-282; diferidos: bot→flip §282.4 · legacy oro §279). ✅ Cache sin deuda (SWR sirve fresco sin bump, L-65). ⚠️ `dist/` se commitea por bloque.
> **🧹 GATES DUEÑO APARCADOS** (delegó el CUÁNDO a mí 06/07; tocan producción viva): MFA 2.9 · App Check 2.11 · cutover 2.12b (§275.4) · validar-live supresión+presencia (§274) · GSC noindex `detalle-vehiculo.html` (§276.7) · saldo bot · purga `clientes`/`suppressions`.
> **✅ TODO-54 PageSpeed (§296, spec `2026-07-08-...` = SSoT) — CERRADO en alcance seguro** (`3b11ab10`→`bee56f0f`): dieta-JS COMPLETA (2.1b·2.3·2.4·2.5·2.6) + 1.3-slice + llms.txt. 1.3-core cerrado empírico (above-fold=113KB/460KB → critical-CSS no limpio). **🚫 Perf restante = Cloudflare (build pipeline) = BLOQUEADO SIN PRESUPUESTO** — el dueño dijo **NO re-preguntar/proponer hasta que ÉL avise que hay presupuesto** (09/07). No re-surfacear. (1.1b/1.2 = gate visual/equipo, menores.)
> **▶️ TODO-53 pública ✅✅ LIVE** (§283-295; prod LCP 662ms/CLS 0.03; spec `2026-07-06-auditoria-holistica-diseno-infra.md`). Bloqueados sin dinero: flip LLM #917.
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
| **TODO-53** | **🔎 AUDITORÍA HOLÍSTICA diseño+infra ⟦OPUS⟧ (06/07)** — spec `2026-07-06-auditoria-holistica-diseno-infra.md`. Pública P0.1-P3.5 ✅ (§283-291) **VALIDADO LIVE** (prod LCP 662ms/CLS 0.03) · panel §292-295 (grillas+responsive móvil). RESTA menor: render-block · minify · P0 barrido visual (ext, P4). | 🔄 impl | menor/panel |
| **TODO-54** | **⚡ PageSpeed perf home ⟦OPUS⟧ (08/07)** — spec `2026-07-08-pagespeed-audit-plan.md` (SSoT). **✅ Fase 0·1.1a·1.2a·2.1a·2.1b·2.3·2.4·2.5·2.6** (§296) — **dieta-JS COMPLETA**. RESTA (gates/build/dinero): **1.3** CSS crítico (gate FOUC, live) · **1.1b** animaciones (gate visual) · 1.2 fuentes (🚫 equipo) · F3 minify+subset-lucide (build) · F4 Cloudflare (dinero). **2.2 🔻 diferido** (ya idle P14). | 🔄 impl | gates/live |
| **TODO-01/02·03·06·07/08·09-13·15·18** | Legacy diferidos/opcionales/absorbidos (Cloudflare+Vite·CSS·SEO·CSAT·deuda·skills·blindaje→E5). **Detalle §109**. | 🔮/✅ | varios |
| **TODO-19** | CRM Fase 5 → E6 EN CURSO (E6.6 ✅ §188) | ⏳ | — |
| **TODO-49** | **🔁 Re-barrido del gap ⟦OPUS⟧** — 1er barrido incompleto; re-lanzar SIN Bash (callejón h) sobre lo no verificado. | 🔵 | tras implementar |
| **TODO-21** | **Plan CRM E0→E6** — E0→E5 ✅ main · E6 ⏳ (§188) | ⏳ | — |
| **TODO-22** | **Fábrica de skills web** (rescate webs monolíticas) §193.2 | 🔮 | post-panel |
| **TODO-23** | **DINAMISMO/CMS web TOTAL ⟦OPUS⟧** — CMS por marca ✅ (§222); resta CMS total. Skill `cms-dinamico`. | 🔮 | al final |
| **TODO-24** | **Comité BORRADORES** §202.5 — f1+2+3 ✅(§230). Resta: barrido recurrente → futuro. | 🔄 | futuro |
| **TODO-26** | **FACTURACIÓN + super-CRM ⟦OPUS⟧** (financiero/contable en panel; consultar Bersaglio). Bóveda `…restructura-comercial…` §8. | 🔒 ÚLTIMA | al final |
| **TODO-27** | **Alta usuarios = invite flow seguro ⟦OPUS⟧** (token+tx, anti-enumeración). Diseño→bóveda `2026-06-14-…cms-plan §6.4`. Skill portable. | 🔮 | tras dinamismo |
| **TODO-29** | **Endurecer el lazo ⟦OPUS⟧** — range-shard ✅ (§258); `00a`/`32` shardeados ✅ 03/07. Resta menor: 99a/99b · `ignoreDirs` · **`33-FRONTEND` + `10` over cap → shard/GC próximo**. | 🔄 | — |
| **TODO-30** | **Despliegue-DINERO "Doble Llave + Staging" (§208.3) ⟦OPUS⟧** — gate IA (tests/invariantes en CI) + acceptance Kary en STAGING + dueño autoriza prod. Cars+bersaglio. | 🔮 | Staging (dueño) |
| **TODO-32** | **ESCALABILIDAD cerebro** — §228+§229 ✅. RESTA (YAGNI): genoma frontmatter + tiering 100x. | 🔮 | YAGNI |
| **TODO-34** | **EPIC bot LLM ⟦OPUS⟧** Opción A; F1-F3+wiring ✅ DORMIENTE (#917). FLIP=saldo. Bot v2→TODO-46. | 🔄 | dueño: saldo |
| **TODO-42** | **HUB de Visibilidad ⟦OPUS⟧ (§244)** — 7 skills + agente `seo-auditor` ✅ (25/06). RESTA: Core JS `visibility-core/` + `tenant_config`. | 🔄 | por-proyecto |
| **TODO-45** | **Cleanups §257 ⟦OPUS⟧** — functions residuales · `brands.saveBrand` desc · `kb.edit` editor · coment stale (detalle §257). | 🔮 | bajo |
| **TODO-43** | **MFA portal nuevo ⟦OPUS⟧ (§253)** — nuevo=email+pass only; SMS-MFA viejo (2FA/trusted/backup/TG) NO portado. Reimplementar TOTP+recovery si el dueño quiere. | 🔮 | dueño |
| **TODO-40** | **Curas auditoría N2 §239 ⟦OPUS⟧** — (a) freno boot-budget linter (M-10); (b) gate drift source↔dist (AUD-04). | 🔮 | bajo |
| **TODO-44** | **Fiabilidad cerebro ⟦OPUS⟧** — §257+M-22 (check #16 ×4 ✅). RESTA: adopción `verificado-vivo:`. Absorbe TODO-33. | 🔄 | adopción |
| **TODO-46** | **Bot v2 flujo + chat vivo ⟦OPUS⟧** — B1/B2/B3 LIVE + 3 bugs FIXED. RESTA: roundtrip chat + iter-2 (marca·FAQ·ARIA) → luego FLIP. **🔲 DUEÑO 09/07: lanzar v2 = NECESARIO pero DESPUÉS (prioridad = VELOCIDAD).** ⚠️ v1/v2 difieren por-dispositivo (flag localStorage `?altorbot=v2`) = NO bug (cutover F-1; reales=v1). | 🔄 aparcado | tras velocidad |
| **TODO-48** | **Drift CRM del cutover ⟦OPUS⟧** — MF4.x admin viejo NO portadas (360°/KPIs/masivas/NPS) + doc-fixes. Bóveda `…barrido-drift…`. | 🔵 | tras bot |
| **TODO-50** | **Consigna = ENTIDAD FORMAL ⟦OPUS⟧** — ✅ live (L-57; §spec+`42`). RESTA humanos: colegiado/contador/purga ZZZ. | 🔄 | humanos |
| **TODO-51** | **Bloqueo fiscal — refinamientos ⟦OPUS⟧** — ciclo bloqueo→purga ✅ (`retentionUntil`+cron). RESTA (menor): grafo-comprador multi-rol + texto art.14 (`42`). | 🔵 | menor |

Detalle ampliado de pendientes legacy → `99-HISTORIAL-ADR.md` §109.

---

## 📝 Bitácora (efímera)

> Histórico §184-§256 → `99`/`00`/`30`. Defectos bot UX → `altor-hub-rediseno-defectos.md`.

- **08/07 ⟦OPUS⟧ PageSpeed §296 CERRADO** (spec SSoT): dieta-JS (2.1b·2.3·2.4·2.5·2.6)+1.3-slice+llms.txt. Claves durables: `dbReady`(render) vs `firebaseReady`(tras auth); defer **home-only**; hint `auth-*` sync (index.html:311) evita flash; 8 CSS core=críticos above-fold. 🚫 NO quitar Poppins/`admin-calendar-config`.
- **09/07 ⟦OPUS⟧ TODO-52 P1 voz admin-app** (`89f2dcaf`): 3 voseo→tú (grep 0 + build limpio + dist). RESTA voseo bot `js/ai` + legacy `js/admin` (⚠️ `intent.js`=reconocimiento, NO tocar). **Cloudflare BLOQUEADO sin presupuesto — no re-preguntar.**