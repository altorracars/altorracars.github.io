# ⚡ 10 — MEMORIA A CORTO PLAZO (WIP / Sprint activo)

> **Nodo: pizarra del sprint** (auto-carga con `CLAUDE.md` + `05`). SOLO lo vivo: foco actual,
> pendientes (TODO-NN), bitácora efímera. Estado técnico → `05`. Al cerrar tarea: consolidar a
> ADR (`99`) + fila en `00`, lecciones a `30`, y PODAR esto al foco vivo (GC §G.4).
> **Convención de handoff**: el foco SIEMPRE incluye **🚫 callejones sin salida** (qué se probó
> que FALLÓ y por qué) — le ahorra al próximo "tú" repetir errores descartados.

---

## 🎯 Foco actual

> **✅ Input Fable 5 10/07 ATENDIDO** (§299·§300·§301). Auditoría de Opus OFRECIDA → **"todavía no"**; re-ofrecer. Después: CAMINOS A/B/C o CRM (TODO-52: leer `43-UX §Doctrina-panel`).
>
> 🤖 **AHORA = OPUS 4.8**. YO decido+ejecuto+mergeo (M-12/M-25); tag `⟦OPUS-4.8⟧`; claims stale → grep ANTES (L-62). **DOS hilos abiertos (la sesión fresca elige):** **(1) ⚡ RENDIMIENTO v2** (activo esta sesión, ↓) · **(2) 🟣 TODO-52 CRM** (mandato #1; próximo **P0-CAPTURE** leads=dinero; voz voseo bot c/`catalogo-voz`; "continúa el EPIC TODO-52").
> **⚡ RENDIMIENTO v2 (TODO-54).** ✅ LIVE búsqueda 40→65 · home 55→61 · §297 fuentes (`eb9054d0`) · **§298 Ola 1** (`5e8c4762`: logo 412KB→ligeros ~40+ págs + diferir GSI). **📊 Diagnóstico LH (Artifact): ord 95 (≈Apple 94) · móvil 57**. **Ola 1 verif por RED** (logo 412KB=0, GSI=0, −96KB script, −3 errores consola); **score móvil 57→55 = RUIDO de galería dinámica** (13→53 fotos ±1.8MB enmascaran → medir por RED no score, lección en skill). **CAMINOS (dueño elige):** ⭐**(A) win REAL móvil = optimizar fotos de vehículos** (Firebase Storage = MAYOR cuello 2.5-4.4MB; lazy agresivo + srcset) · (B) Ola 2 reCAPTCHA 375KB — **GATE: dueño confirma App Check MONITOR en Firebase Console** (§41) antes de tocar · (C) TODO-52 CRM. **🚫 techo home=Cloudflare BLOQUEADO.** Descartado fuentes-async (§298).
> 🏁 OLA 0-3 ✅ (§267-282). Cache: SWR sin bump (L-65). ⚠️ `dist/` se commitea por bloque.
> **🧹 GATES DUEÑO APARCADOS** (06/07): MFA 2.9 · App Check 2.11 · cutover 2.12b · validar-live (§274) · GSC (§276.7) · saldo bot · purga clientes/suppressions.
>
> 🗄️ **Durable**: **⚖️ Gate P4** — legal público NO sin abogado (§42).
>
> **🚫 Callejones (NO reintentar; detalle en el §/L citado)**:
> (a) NO custom claims aún (Fase 1=lookup `usuarios/{uid}`; §159.3). (b) NO `preview_screenshot` (cuelga tras resize L-28)→`snapshot`+`eval`. (c) Consejo Externo=Gemini code-aware **solo-lectura** (§224/§15), no rutina. (d) NO E2E forms localhost (L-08/§175)→solo live+stub `window.db`. (e) NO mutar config prod vía MCP→acción 1-clic dueño (F39). (f) Fan-out acotado escala libre si in-cwd read-only+structured-output sin tools gateadas (git cuelga bg→worktree/fg) L-50/§226.
> (g) Bot v2=grafo tras flag (v1 INTACTO; NO big-bang/Vite; `js/concierge/shared/` NO copiar) §F-1. (h) Auditoría=CÓDIGO≠DEPLOY→"LIVE" se chequea live (Firebase MCP), verificadores SIN Bash L-50. (i) Val. live SIN screenshot=cobertura fingida (M-23)→screenshot del render (ext. `computer`). (j) `confirm()` nativo BLOQUEA la ext. Chrome→yo lleno/verifico-Firestore, dueño Acepta; tab atascado→`tabs_create_mcp`. (k) Workflow read-only puede colgar 1 agente→bloquea `parallel()`; cosechar `journal.jsonl`+`TaskStop` (L-61). (l) Audit que clasifica código=FALSOS POSITIVOS→verificar con grep real (L-62). (m) PDFs PageSpeed = IMÁGENES → render PDF→PNG vía `Windows.Data.Pdf` (`scratchpad/render-pdf.ps1`; poppler=solo pdftotext); leer TODAS las páginas. (n) pagespeed.web.dev ~90s + screenshot puede colgar→reintentar single. (o) minify-manual + critical-CSS-inline público = DESCARTADOS (footgun/FOUC; comité).

---

## 📋 Pendientes abiertos (TODO-NN) — ledger ÚNICO de pendientes

> Al cerrar uno: ✅ + link al ADR, y retirarlo en la próxima poda.

| ID | Item | Estado | Bloqueo |
|---|---|---|---|
| **TODO-52** | **🟣 EPIC #1 — CRM Overhaul ⟦OPUS⟧** — OLA 0-3 ✅ (§267-282); Directiva Permanente (brief `2026-06-29-crm-overhaul…`). Próximo=P0-CAPTURE. | 🔄 permanente | pulir |
| **TODO-53** | **🔎 AUDITORÍA HOLÍSTICA ⟦OPUS⟧** — ✅✅ LIVE (§283-295; LCP 662ms). RESTA: barrido visual P4. | 🔄 | menor |
| **TODO-54** | **⚡ PageSpeed perf v2 ⟦OPUS⟧** — ✅ LIVE búsqueda 40→65 · home 55→61; §297 fuentes; **§298 Ola 1 (logo 412KB + GSI diferido)**. Diagnóstico LH: ord 95/móvil 57 (Artifact). RESTA: **Ola 2 reCAPTCHA/AppCheck (GATE Firebase Console)** · re-medir · unsized-images. 🚫 techo home=Cloudflare. | 🔄 | perf/gate-App-Check |
| **TODO-01/02·03·06·07/08·09-13·15·18** | Legacy diferidos/opcionales/absorbidos (Cloudflare+Vite·CSS·SEO·CSAT·deuda·skills·blindaje→E5). **Detalle §109**. | 🔮/✅ | varios |
| **TODO-19** | CRM Fase 5 → E6 EN CURSO (E6.6 ✅ §188) | ⏳ | — |
| **TODO-49** | **🔁 Re-barrido del gap ⟦OPUS⟧** — 1er barrido incompleto; re-lanzar SIN Bash (callejón h) sobre lo no verificado. | 🔵 | tras implementar |
| **TODO-21** | **Plan CRM E0→E6** — E0→E5 ✅ main · E6 ⏳ (§188) | ⏳ | — |
| **TODO-22** | **Fábrica de skills web** (rescate webs monolíticas) §193.2 | 🔮 | post-panel |
| **TODO-23** | **DINAMISMO/CMS web TOTAL ⟦OPUS⟧** — CMS por marca ✅ (§222); resta CMS total. Skill `cms-dinamico`. | 🔮 | al final |
| **TODO-24** | **Comité BORRADORES** §202.5 — f1+2+3 ✅(§230). Resta: barrido recurrente → futuro. | 🔄 | futuro |
| **TODO-26** | **FACTURACIÓN + super-CRM ⟦OPUS⟧** (financiero/contable en panel; consultar Bersaglio). Bóveda `…restructura-comercial…` §8. | 🔒 ÚLTIMA | al final |
| **TODO-27** | **Alta usuarios = invite flow seguro ⟦OPUS⟧** (token+tx, anti-enumeración). Diseño→bóveda `2026-06-14-…cms-plan §6.4`. Skill portable. | 🔮 | tras dinamismo |
| **TODO-29** | **Endurecer el lazo ⟦OPUS⟧** — range-shard ✅ (§258); `00a`/`32` shardeados ✅ 03/07; **00→00a ampliado a §1–§190 ✅ 10/07 (§299)**. Resta: 99a/99b · `ignoreDirs` · `33` over cap. | 🔄 | — |
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

- **10/07 ⟦FABLE-5⟧ §299-§301**: sinapsis ×4 — cars importó (L-73/74/75 · W-13 · panel→`43-UX` · meta-ads); payloads bersaglio/inmob en `sinapsis-cerebros/references/` (harness bloquea writes cross-repo → aplica cada operador). Resta §G/W (TODO-28).
- **09/07 ⟦OPUS⟧ perf-v2**: §297 fuentes + §298 Ola 1 — detalle en ADRs + foco↑. Skill `optimizacion-rendimiento-web` ×4.
- **Pendientes vivos perf/voz** (histórico §283-297): RESTA voz bot `js/ai`+legacy `js/admin` (⚠️ `intent.js` NO tocar). 🚫 NO quitar Poppins/`admin-calendar-config`. **Cloudflare BLOQUEADO — no re-preguntar.**