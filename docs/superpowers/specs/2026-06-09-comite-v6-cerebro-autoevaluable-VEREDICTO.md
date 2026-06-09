# 🏛️ Comité v6 — "Cerebro auto-evaluable con lazo cerrado real" — VEREDICTO + CHECKLIST

> **Tipo**: Síntesis del Comité de Expertos (examen holístico ×5 + crítica ×5 + peer-review + presidente).
> **Meta**: 16 agentes · 2.31M tokens · 192 tool-uses · ~30 min · 2026-06-09.
> **Deliberación (ancla canónica §G.4):** CRUDO → `docs/superpowers/research-archive/2026-06-09-comite-v6-deliberacion.json`
> (226KB) + tabla de 45 hallazgos → `…/2026-06-09-comite-v6-hallazgos.md` · SÍNTESIS → este archivo.
> **Gatillo**: el cliente pidió hacer el cerebro más poderoso en los 3 repos con 7 puntos; headline = #3
> ("brain:check siempre dice SANO pero el comité siempre encuentra falencias → no hay criterio de evaluación").
> **Base medida** (2026-06-09): cars HEAD `42f9485` BOOT 43.855c · bersaglio `65b9195` BOOT 50.885c ·
> inmobiliaria `d3579a1` BOOT 25.919c ✅ (objetivo 31.500c). Construye sobre §170→§171→§172 (NO re-litigado).

---

## 0 — VEREDICTO (decisión v6.1)

**Tesis ratificada**: el cerebro no puede auto-evaluar FIDELIDAD con un linter barato. Cura = evaluación de
**DOS NIVELES** + **criterio explícito** + **lazo cerrado**. El borrador v0 tenía 5 defectos estructurales que
el comité corrigió:

1. **Severidad de gates HARDCODEADA en el kernel** — se ELIMINA la matriz `classification` en el manifest
   (gate auto-degradable = green-tuning como API; precedente verificado: caps de cars inflados). El manifest
   solo lleva DATOS (rutas, umbrales, peers, sinceAdr, staleDays) + campo `downgrades` con ADR citado que el
   kernel IMPRIME en cada corrida.
2. **NO se crea "checklist maestro" como doc nuevo** — la tabla TODO-NN del nodo 10 ES el ledger único
   (endurecida a formato parseable con evidencia); los checklists detallados viven DENTRO del spec de cada
   plan (como este). Un cuarto ledger de estado = la causa raíz verificada del bug App-Check-3-estados.
3. **Orden invertido**: paso CERO = archivar ESTA deliberación (✅ hecho) + re-medir (✅) → curas de fidelidad
   ALTA → capture-before-cut → GC de **DOS palancas** (nodo 10 Y router CLAUDE.md; una sola no cierra la
   aritmética) bajando caps en el MISMO commit (trinquete: bajar libre, subir exige ADR) → gates calibrados
   contra el estado SANO, no el inflado.
4. **Captura de deliberación curada en el ORIGEN** (runner persiste crudo como primer acto + `runs.log`) +
   check #7 de integridad referencial por filename literal; el gate-de-ancla es solo complemento. Corrección
   doctrinal: la deliberación perdida NO es "irrecuperable" — los transcripts JSONL de `~/.claude/projects`
   persisten por-máquina (ruta de salvamento; deuda recuperable).
5. **Nivel-2 con disparador DETERMINISTA** (`deepAudit{last, coveredUpToAdr, maxAdrGap≈12, maxDays}` en el
   manifest + nudge en `--boot` al exceder), formato anti-score-teatro (sondas FALSABLES, sin puntaje; KPI =
   hallazgos reincidentes + tasa de re-investigación), rúbrica como **SKILL portable** `auditoria-cerebro`,
   regla de masa-neta (cada auditoría cierra boot-neutral), + 2 sondas nuevas: **retrieval-drill** (subagente
   frío responde N preguntas canónicas usando solo el boot — mide la FUNCIÓN del cerebro, no el almacén) y
   **consistencia de MEMORY.md** (4ª superficie always-on hoy fuera de toda gobernanza).

**Punto ciego de TODO el comité (cazado por peer-review): EXPOSICIÓN PÚBLICA.** Los 3 cerebros se sirven vía
GitHub Pages — `41-SEGURIDAD`, research-archive (1.3MB de deliberaciones), `crm-handoff` y los estados de
App Check son **URLs públicas indexables**. Cada auditoría Nivel-2 publicaría el mapa exacto de debilidades.
→ Decisión temprana con el cliente + consejo Gemini (único `needs_gemini`; ítem C). NO mover repos a privado
de inmediato (mata GitHub Pages free del sitio productivo); robots.txt NO protege fetch directo.

## 1 — Decisiones por punto del cliente (resumen; detalle en el crudo)

| # | Punto | Decisión |
|---|---|---|
| 1 | Anti-saturación | GC de **DOS palancas** por repo (nodo 10 → ~8k c · router CLAUDE.md → ~19-21k c) con capture-before-cut + caps bajados en el mismo commit (trinquete). Regla de PROPIEDAD: un hecho = un nodo dueño, el resto APUNTA. Inmobiliaria NO se toca (ya cumple). Es MUDANZA con puntero, no borrado (cero-pérdida). |
| 2 | Examen holístico | YA hecho (45 hallazgos con evidencia, tabla en archive). NO re-auditar: convertirlo en el PRIMER ciclo del lazo — fixes ALTA al frente, resto como TODO-NN. Toda auditoría futura abre con diff vs esta tabla. |
| 3 | **Criterio de evaluación (headline)** | DOS NIVELES: **Nivel-1** = brain-check kernel con ~10 gates nuevos de severidad hardcodeada (SSoT inter-nodo, consolidado-aún-en-10, BFS huérfanas 2º orden con regex RECURSIVA, integridad research-archive, ancla deliberación, peer-hash kernel, fechas-stale, pre-shard 90%, schema del manifest, quiet-boot ≤2.000c stdout). **Nivel-2** = skill portable `auditoria-cerebro`: sondas falsables SIN puntaje, retrieval-drill, MEMORY.md, diff-vs-anterior; disparo determinista por `deepAudit` del manifest. "SANO" pasa a significar "estructura íntegra + auditoría semántica VIGENTE". |
| 4 | Checklists | UNA superficie de pendientes por repo: tabla TODO-NN del 10, parseable (`estado·desde·evidencia`), que el kernel cuenta y envejece. Checklists detallados DENTRO del spec de cada plan (`## Checklist`, ítems con `acepta:` + evidencia; tick sin evidencia resoluble → warn). NO doc maestro nuevo. |
| 5 | Cierre/captura/handoff | 3 capas: (1) ORIGEN — el runner de workflows escribe crudo + `runs.log` como primer acto (hoy 100% in-memory, verificado); (2) GATE — check #7 integridad referencial; (3) RITUAL — deuda-de-cierre detectada AL BOOT SIGUIENTE (determinista, lector garantizado) + Stop-hook best-effort. Lo no-mecanizable se etiqueta `[HONOR]` explícito (regla de admisión M-10). Salvamento por transcripts JSONL documentado en 30. |
| 6 | Detección de repos nuevos | `scripts/brain-diff.mjs` (2º archivo kernel, MANUAL — nunca en boot): escanea `ROOT/..`, reporta CLAUDE.md/marcador-versión/hash-kernel/manifest por repo; `ignoreDirs` en manifest. Detección termina en fila TODO accionable. **BLOQUEADO** hasta curar el genoma: INSTALACION-CEREBRO actualizada (manifest + hook `--boot` + 77 skills + archiveDir) + bump template 1.1.0 + marcador en cars (hoy NO lo tiene) + consolidar sesión 06-09 en el canon bersaglio. |
| 7 | Detección de skills nuevas | (1º cambio de kernel, mínimo, prueba el pipeline) fix bug verificado `brain-check.mjs:260` — skills/ SIN inventario → **warn** (hoy degrada a info: 60 skills de inmobiliaria imprimen SANO). + crear `skills-inventory.md` en inmobiliaria + check bidireccional (refs colgantes) + `~/.claude/skills` SOLO `--full` info-agregado (por-máquina) + descontaminación pre-clonado (literales "Gemini"/"42-LEGAL" en skills). |
| META | Puntos ciegos | MEMORY.md bajo gobernanza SSoT (apunta, nunca duplica) · medir la FUNCIÓN (retrieval-drill; KPI = tasa de re-investigación) · anti-engorde del aparato (gate que no caza nada en 2 auditorías = candidato a retiro) · re-medición al abrir cada fase · runs.log/tablas DENTRO de archiveDir (NO `.brain-state.json`: rompería read-only + clase L-02 cron). |

## 2 — 🚫 Callejones sin salida probados (NO reintentar)

- **NO matriz `classification` en el manifest** → gate auto-degradable = green-tuning como API (flaw fatal unánime).
- **NO "checklist maestro" como doc nuevo** → cuarto ledger de estado = divergencia por diseño (causa raíz del bug App-Check-3-estados) + huérfano del check #1.
- **NO score numérico LLM en la rúbrica** → no reproducible = score-teatro. Sondas falsables con comando de verificación.
- **NO "ritual periódico" sin disparador determinista** → "periódico" sin ejecutor = nunca.
- **NO la regex de 5c para el BFS** → verificado: NO matchea subdirectorios (`docs/superpowers/**` entero invisible). Regex recursiva `docs/[\w\/-]+\.md` + graph-spec en manifest.
- **NO `.brain-state.json` escrito por el linter** → rompe read-only + multiplica la clase de conflicto cron↔rama (L-02).
- **NO brain-diff en SessionStart/--boot** → inventario federado ≠ salud local; `ROOT/..` en otra máquina es cualquier cosa.
- **NO detectar/clonar repos nuevos con el genoma stale** (INSTALACION sin manifest/--boot) → propaga cerebros degradados con confianza falsa: el peor falso-verde porque se multiplica.
- **NO confiar en el gotcha #2 del HANDOFF** → el hook de seguridad es PostToolUse ADVISORY (no bloquea Write); la decisión sin-child_process se sostiene por byte-identidad/portabilidad, no por un veto inexistente.
- **NO la cifra "inmobiliaria 7.3k" como chars** → BOOT real 25.919 **chars** (~7.4k tokens). La unidad normativa es CHARS; confundirla infló la palanca única del borrador.

## 3 — ## Checklist (maestro de ejecución — ÚNICO lugar de tracking de este plan)

> Convención nueva (decisión #4): tick válido = `[x]` + evidencia resoluble (commit/§NN/path/comando).
> Orden con dependencias reales. La tabla TODO-NN del 10 apunta aquí con UNA fila.

- [x] **A · cars** — Paso CERO: archivar esta deliberación · acepta: archivos en archive + README los indexa + anti-secretos limpio · **evidencia: `research-archive/2026-06-09-comite-v6-{deliberacion.json,hallazgos.md}` + README actualizado + pase anti-secretos OK (este turno)**
- [x] **B · los-3** — Re-medición de entrada · acepta: números frescos con fecha+HEAD pegados en el spec · **evidencia: header §0 de este doc (cars 43.855c `42f9485` · bersaglio 50.885c `65b9195` · inmobiliaria 25.919c `d3579a1`)**
- [ ] **C · los-3** — ⚠️ **Decisión de confidencialidad pública** (cliente + consejo Gemini, Trigger Decisión Fuerte): triage de 41-SEGURIDAD/research-archive/crm-handoff servidos por GitHub Pages → redactar / repo privado hermano / aceptación documentada · acepta: ADR con la política + contenido triado o aceptación firmada · depende: A
- [x] **D · cars** — Curas de fidelidad ALTA riesgo-cero · **evidencia: App Check = UN estado canónico en `41 §Runbook` (commit `dc5ebca` verificado en origin/main; 10/05 apuntan a 41) · CLAUDE.md §4 cache→05 · 05 re-sellado 2026-06-09 · 00-INDICE fila v6-primero + orden §165-§172 corregido + cifras ~43k · README archive VEREDICTO-primero · HANDOFF gotcha #2 corregido (verificado .claude/settings.json: solo SessionStart) + L-35/L-36 en 30**
- [x] **E · cars** — Capture-before-cut · **evidencia: TODO-16 (descriptions>1024) + TODO-17 (E2E live) + TODO-18 (blindaje) + TODO-19 (Fase 5) + TODO-20 (checklist v6) tabulados en la tabla del 10 ANTES de la poda; gate de lanzamiento → TODO-18**
- [x] **F · cars** — GC dos palancas + trinquete · **evidencia: brain:check 2026-06-09 imprime BOOT always-on = 30.627c ≤ 31.500c (antes 43.855) · 10 = 4.793c/8.000 · 05 = 1.880c/2.800 · CLAUDE.md = 23.954c/24.000 · caps bajados en el MISMO commit (10:16k→8k · 05:4k→2.8k · CLAUDE:25k→24k; 30/00 conservan cap hasta su propio GC — desviación documentada en _caps_trinquete del manifest) · todo recorte con destino (§157-§173 en 99)**
- [ ] **G · bersaglio** — Consolidar la sesión 06-09 del CANON: ADR kernel/manifest/cerebros-independientes en su 99 (commits 9f7bdfd/424dbfd/3bca0c0/65b9195) + fila en 00 + refrescar 05/10 · acepta: ADR existe + 05 re-fechado · depende: B
- [ ] **H · bersaglio** — GC dos palancas + curas del canon: 6 TODOs ✅ fuera de la tabla · bitácora §47-§55 podada · CLAUDE.md < cap · "Gemini":215 → "consejo externo" · ejemplo regla-de-oro de 00 reescrito · 20-ESPACIAL:102 Morosos → desplegado · PENDIENTES-Y-HALLAZGOS actualizado o a _legacy/ + referenciado · "performance-check" fantasma fuera de 40:16 · caps bajados mismo commit · acepta: BOOT ≤ objetivo (o ADR) + greps · depende: G
- [ ] **I · tooling** — Kernel v1.1 (1º cambio mínimo, prueba el pipeline): check #6 skills-sin-inventario info→**warn** · probar contra los 3 ANTES de propagar · Copy-Item + Get-FileHash · receta de escape `--no-verify` como L- en 30 · acepta: SHA256 idéntico ×3 + inmobiliaria pasa a exit 1 (catch real) · depende: B
- [ ] **J · inmobiliaria** — Crear `docs/skills-inventory.md` (60 skills, origen repo-vs-máquina) + puntero en §0 · acepta: check #6 verde + fila §0 enlaza · depende: I
- [ ] **K · los-3** — Ruta canónica de deliberación: `archiveDir` en los 3 manifests · §G.4 cita la clave (hoy bersaglio/inmobiliaria apuntan a dir inexistente) · README esqueleto en los 2 hermanos · doctrina "deuda recuperable vía transcripts JSONL" + ruta de salvamento en 30 · acepta: Test-Path ×3 = True · depende: D,G
- [ ] **L · cars** — Captura-en-ORIGEN: `adversarial-review.js` escribe crudo a archiveDir como PRIMER acto + `runs.log` (hoy 100% in-memory, verificado 0 writeFile) · caveat `[HONOR]` para comités vía agentes del harness · acepta: run de prueba deja archivo+línea sin intervención del agente · depende: K
- [ ] **M · tooling** — Kernel v1.2 (gates nuevos, severidad hardcodeada): #7 integridad research-archive [--full] · ancla deliberación sinceAdr:173 [--full] · BFS huérfanas 2º orden (graph-spec, regex recursiva) [--full] · peer-hash kernelFiles[] [--full] · fechas-stale [--boot, info] · gate SSoT (token duplicado fuera del nodo dueño → warn) · "consolidado-aún-en-10" → warn · pre-shard ≥90% → info · validación schema manifest → warn · quiet-boot (stdout ≤25L/≤2.000c) · boot-budget info→warn (post-F/H) · probar ×3 antes de propagar · acepta: sin falsos rojos + caza seeds conocidos + stdout --boot ≤2.000c + hash ×3 · depende: F,H,I,K,L
- [ ] **N · los-3** — Rúbrica Nivel-2 como SKILL portable `auditoria-cerebro` (sondas falsables SIN puntaje · retrieval-drill · MEMORY.md · diff-vs-anterior · masa-neta · cross-repo solo artefactos kernel) + `deepAudit{…}` en los 3 manifests + nudge en --boot · acepta: skill en skills/ ×3 + catalogada + nudge visible al simular exceso · depende: M
- [ ] **O · los-3** — Convención checklists + gobernanza (presupuesto de headroom): TODO-NN parseable · `## Checklist` en specs (tick sin evidencia → warn --full) · regla PROPIEDAD (1 línea en G.3) · regla ADMISIÓN M-10 "toda regla declara su gate o lleva [HONOR]" (1 línea en G.4) · doctrina extensa en lóbulo workflows · TODA línea always-on nueva DESPLAZA texto equivalente · acepta: diff chars CLAUDE.md ≤0 · depende: F,H,M
- [ ] **P · bersaglio** — INSTALACION-CEREBRO al estado kernel (BLOQUEANTE de P6): manifest en el paquete + hook CON `--boot` + 74→77 skills + warnings esperados + decisión 60-WORKFLOWS + archiveDir + bump template 1.0.0→**1.1.0** · acepta: dry-run de la receta produce cerebro equivalente al canon · depende: G,M
- [ ] **Q · cars** — Marcador `<!-- brain-template-version: 1.1.0 -->` en CLAUDE.md línea 1 (cars es el ÚNICO sin marcador, verificado) · acepta: línea 1 ×3 con misma versión · depende: P
- [ ] **R · tooling** — `scripts/brain-diff.mjs` (2º archivo kernel, MANUAL): scan ROOT/.. → CLAUDE.md/marcador/hash/manifest por repo · `ignoreDirs` (bersaglio-design) · salida → fila TODO accionable · acepta: detecta los 3 + ignora design + divergencia simulada reportada + NO está en ningún hook de boot · depende: M,P
- [ ] **S · los-3** — Skills extensión final + descontaminación: `~/.claude/skills` en --full info-agregado · check bidireccional refs colgantes · cifras 74→77 · neutralizar literales `legal-colombia` ("42-LEGAL"→"lóbulo legal del proyecto"; "Gemini"→"provider externo") · acepta: greps cero literales sin guard ×3 · depende: I,J
- [ ] **T · inmobiliaria** — Sesión de re-verificación del estado congelado (2026-05-07): TODO-01..08 contra git/firebase real · acepta: cada TODO cerrado/refrescado con evidencia + 05 re-fechado · depende: B
- [ ] **U · los-3** — PRIMERA auditoría Nivel-2 (estreno del lazo): skill `auditoria-cerebro` ×3 · 1ª sonda = diff vs tabla de 45 hallazgos (reincidente → M-NN) · retrieval-drill post-GC · sonda MEMORY.md · GC pareado + deepAudit actualizado · acepta: tabla en archiveDir + ADR síntesis + delta boot ≤0 + crudo archivado (dogfooding #7) · depende: N,O,Q

## 4 — Riesgos abiertos (vigilancia, no ítems)

- **Exposición pública** (ítem C): mientras no se decida, cada hallazgo documentado queda como URL pública. Único riesgo que CRECE con el propio plan.
- **Aritmética del 31.500c**: aun con dos palancas cars/bersaglio pueden quedar marginalmente arriba → honestidad (ADR de objetivo revisado), no gaming. El criterio es la LÍNEA IMPRESA por brain:check.
- **Blast radius kernel ×3**: un v1.2 con bug bloquea los 3 pre-commit. Mitigado (probar ×3 + receta --no-verify), no eliminado (sin tests unitarios).
- **`[HONOR]` residual**: comités vía agentes del harness no pasan por el runner; MEMORY.md sin gate. Deuda VISIBLE, no cobertura fingida.
- **cron↔archivos nuevos** (runs.log en cars): clase L-02 — primera colisión real necesitará su receta.
- **Drift de la rúbrica-skill** entre repos: aceptado bajo "cerebros independientes" (§172); brain-diff lo reporta informativo.
- **Retrieval-drill mal diseñado** = teatro de función: diseñar las preguntas desde casos reales de re-investigación, no desde el índice.

---

> **Estado**: A+B ✅ (este turno) · C = decisión del CLIENTE (+Gemini) · D→U pendientes de arranque.
> Consolidación al cierre: ADR §173 en `99` + fila en `00` (la fila del 10 apunta a ESTE checklist).
