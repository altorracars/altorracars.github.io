# ⚡ 10 — MEMORIA A CORTO PLAZO (WIP / Sprint activo)

> **Nodo: pizarra del sprint** (auto-carga con `CLAUDE.md` + `05`). SOLO lo vivo: foco actual,
> pendientes (TODO-NN), bitácora efímera. Estado técnico → `05`. Al cerrar tarea: consolidar a
> ADR (`99`) + fila en `00`, lecciones a `30`, y PODAR esto al foco vivo (GC §G.4).
> **Convención de handoff**: el foco SIEMPRE incluye **🚫 callejones sin salida** (qué se probó
> que FALLÓ y por qué) — le ahorra al próximo "tú" repetir errores descartados.

---

## 🎯 Foco actual

> 🤖 **AHORA = OPUS 4.8**. **YO decido+ejecuto+mergeo** (M-12/M-25); tag `⟦OPUS-4.8⟧`; claims stale → grep ANTES (L-62). **Foco = TODO-54 (§296, arriba)**.
> 🏁 PLAN MAESTRO OLA 0-3 ✅ (§267-282; diferidos: bot→flip §282.4 · legacy oro §279). ✅ Cache sin deuda (SWR sirve fresco sin bump, L-65). ⚠️ `dist/` se commitea por bloque.
> **🧹 GATES DUEÑO APARCADOS** (delegó el CUÁNDO a mí 06/07; tocan producción viva): MFA 2.9 · App Check 2.11 · cutover 2.12b (§275.4) · validar-live supresión+presencia (§274) · GSC noindex `detalle-vehiculo.html` (§276.7) · saldo bot · purga `clientes`/`suppressions`.
> **🤝 TODO-54 PageSpeed (§296, spec `2026-07-08-pagespeed-audit-plan.md` = SSoT)** — 08/07 3ª ⟦OPUS⟧ dieta-JS: **2.1b ✅ `3b11ab10`** (diferir auth+SDKs; `auth/iframe.js` off-critical; nuevo `window.dbReady`; home-only) · **2.3 ✅ `73aadeaa`** (bot/IA ~18 archivos a idle) · **2.4 ✅** (GSI a idle; NO FedCM-off → preserva One-Tap) · **2.6 ✅** (reflujo parallax: scrollY al rAF) · **2.5 ✅ `12d51274`** (Lucide 82KB a idle, home-only; es defer no subset). **FASE 2 dieta-JS ~COMPLETA** (2.2 diferido: ya idle P14). **RETOMAR = solo quedan GATES/BUILD**: 1.3 CSS crítico (gate FOUC, **necesita live**) · 1.1b animaciones (gate visual) · F3 minify+subset-lucide-real (build) · 1.2 fuentes (🚫 equipo) · F4 Cloudflare (dinero). Sin bump (js/core+public/home=networkFirst/SWR).
> **▶️ TODO-53 pública ✅✅ LIVE + TODO-52 panel AL DÍA** (§283-295; prod LCP 662ms/CLS 0.03; SSoT spec `2026-07-06-auditoria-holistica-diseno-infra.md`). RESTA menor: render-block · minify · P0 barrido visual (ext, P4). Bloqueados sin dinero: flip LLM #917 · Cloudflare. Cadencia §0.b.
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

- **08/07 (1ª/2ª) ⟦OPUS⟧ PageSpeed Fase 0·1.1a·1.2a·2.1a LIVE (§296)**: base móvil 53/ord 69 · imágenes −1.1MB · a11y→100 · categorías→WebP · reCAPTCHA diferido. Detalle+PDF → spec. 🚫 NO quitar Poppins/`admin-calendar-config` sin verificar.
- **08/07 (3ª) ⟦OPUS⟧ PageSpeed 2.1b+2.3 (§296)** → detalle en foco↑ + spec. Claves durables: `window.dbReady` (render) vs `firebaseReady` (tras auth, compat); defer **home-only** (admin/otras=inmediato); header sin flash por hint `auth-*` sync de index.html:311; scripts del bot post-parse ya son async (defer no-op).