# Inventario exhaustivo + Plan de preservación de los 3 cerebros — MANDATO 1

> **Tipo**: Deliverable de aceptación del macro-proyecto Cerebro Multi-Proyecto (ADR §170).
> **Fecha**: 2026-06-09. **Autor**: Claude (Altorra Cars), vía workflow `inventario-preservacion-cerebros`
> (5 agentes, 753k tokens, 104 tool-uses, 100% read-only — ningún archivo editado/movido/borrado).
> **Estado**: **MANDATO 1 CUMPLIDO** — cada cuerpo de conocimiento de los 3 repos + la capa skills está
> catalogado con su acción de preservación. Línea base inmutable contra la que el **Comité #2 (validación final)**
> certificará "cero pérdida de conocimiento".
> **Fuente padre**: `2026-06-09-cerebro-unico-multiproyecto.md` (decisión §170). **Mandatos** → §7 de ese spec.

---

## §1 — Resumen ejecutivo

Inventario verificado en disco de los **4 cuerpos**: `altorracars` (canon GROUP-Altorra, neural-completo, SANO),
`bersagliojewelry` (canon KERNEL, brain-template-version 1.0.0, el más maduro), `altorrainmobiliaria` (**caso
crítico**: sin cerebro neuronal, ~376KB en 8 monolitos raíz) y la capa global `~/.claude/skills/` (7 skills, único
canal inter-proyecto).

**Tres hallazgos que cambian el plan:**
1. **El spec §R6 estaba parcialmente equivocado** sobre el acoplamiento de las skills (verificado leyendo cada
   `SKILL.md`, no por nombre). Ver §8.
2. **La garantía "cero pérdida" es ahora mecánicamente verificable** (git mv + conteos + git log + brain:check),
   no una promesa. Ver §7.
3. **Inmobiliaria esconde secretos de infra irremplazables** (`DEPLOY-RUNBOOK.md`: Project ID + roles IAM) que
   NUNCA van a `_legacy/` — se promueven a un nodo config. Ver §4.

---

## §2 — Inventario por repo (condensado)

### 2.1 — altorracars (canon GROUP-Altorra · neural-completo · brain:check SANO)
Router `CLAUDE.md` (318/320 — **a 2 del tope**) + `00-INDICE` + 9 nodos (05/10/15/20/30/40/99) + 5 lóbulos hijos
activos (41/42/43/46/48; 44/45/47 vacíos por diseño) + 8 hojas de detalle + 13 specs + `brain-check.mjs` (5 checks)
+ `githooks/pre-commit` + `_legacy/` (5 cuarentenados + README, **patrón canónico a replicar**).
- **Riesgo alto**: `99-HISTORIAL` (2.28MB/43k líneas, irremplazable, jamás auto-carga); `CLAUDE.md` a 2 del tope;
  `brain-check`/`pre-commit` (KERNEL a reconciliar desde bersaglio).
- **Riesgo medio**: `30-LECCIONES` (brain:check mide 333/350; inventario reportó ~600 → **divergencia a aclarar**,
  candidato a shard); `dependency-map.md` MARCADO STALE (duplicate-of `20-ESPACIAL`+`crm-handoff`, se conserva por
  valor histórico anti-patterns v4).

### 2.2 — bersagliojewelry (canon KERNEL · brain-template-version 1.0.0 · el más maduro)
Lo que cars **NO tiene** y debe promoverse al KERNEL:
- `docs/INSTALACION-CEREBRO.md` (687L) — **crown jewel**: protocolo ejecutable de trasplante del cerebro (FASE 0-7).
- `scripts/brain-check.mjs` (6 checks, multi-proyecto-aware) — el **check #6** (skills↔inventario) es exclusivo.
- `CLAUDE.md §3.7` — Calidad-por-defecto + **Comité ×3 por iniciativa propia** (la diferencia doctrinal más valiosa).
- `docs/60-WORKFLOWS.md` (9 workflows de detección) + `docs/50-ARQUITECTURA.md` (§0-2 doctrina zero-budget portable).
- `.claude/settings.json` (SessionStart hook) + `githooks/pre-commit`.
- INSTANCE de bersaglio (05/10/20/30/99 = 55 ADRs por-fecha, lóbulos 41-45, planes) = **intacto, keep-in-place**.

### 2.3 — altorrainmobiliaria (CASO CRÍTICO · sin cerebro neuronal · ~376KB monolíticos)
Verificado: **cero** `docs/`, `.claude/`, `_legacy/`, `brain:check`. 8 `.md` raíz navegados por proto-router manual.
- **ÚNICO e intocable** (no derivable de cars): `CLAUDE.md` (1595L — constitución: schema Firestore propio en
  español, plan Blaze, convenciones §6) · `AVANCES.md` (3420L — bitácora append-only = 99+30+10 fundidos) ·
  **`DEPLOY-RUNBOOK.md` (Project ID `altorra-inmobiliaria-345c6` + cuenta CLI + roles IAM/service accounts —
  secrets de infra irremplazables)** · `MEGA-PLAN.md` (benchmark 15 competidores inmobiliarios) ·
  `PLAN-MEJORAS.md` (roadmap + SEO real vs Altis Group) · `CONTENIDO-EDITORIAL.md` (schema blog) ·
  `tests/MANUAL-meta-snapshot.md` (E2E cache).
- **DUPLICADO/CRUZADO de cars**: `ALTORRACARSCLAUDE.md` (1126L, ~95% copia verbatim del brain viejo de cars
  @2026-04-10) — candidato #1 a `_legacy/`, **PERO** su §12 (l.927-1126 "Hallazgos investigación live 2026-04-16")
  tiene un sliver único de inmobiliaria que se **extrae antes** de cuarentenar.

### 2.4 — Capa skills global `~/.claude/skills/` (7 skills, único canal inter-proyecto)
Ver §8 (corrección al spec). Las copias `skills/` dentro de cada repo (cars ~88, bersaglio 74, inmobiliaria 58) son
**vendor de terceros** (anthropic-skills/superpowers), NO contienen ninguna de las 7 de gobernanza (verificado: Glob
de los 7 nombres = 0 resultados). Confirma el anti-supuesto M-11.

---

## §3 — Garantía NUNCA-BORRAR + no-destrucción por capa (vinculante)

**El verbo es MOVER, no DELETE.** Único mecanismo permitido para reorganizar: `git mv <archivo> _legacy/<archivo>`
(preserva 100% de la historia). Toda escritura es aditiva (apendar > sobrescribir; cuarentenar > borrar) — Límite de
Guardián §G.4. Claude solo commitea (footer Co-Authored-By); el cliente hace push/merge.

| Capa | Regla de no-destrucción |
|---|---|
| **KERNEL** (canon bersaglio) | Se propaga por **copia-de-archivo**; NUNCA se edita el destino a mano durante la copia. El kernel viejo de cars (brain-check 5 checks) se reemplaza por el de bersaglio (6 checks); el viejo es recuperable por git history (es tracked, no se cuarentena físicamente). Conflictos → `brain:diff` (hash, WARN no FAIL). |
| **SCHEMA** | Se documenta, no se borra. |
| **GROUP-Altorra** (canon cars) | keep-in-place en cars; inmobiliaria lo **consume por puntero/brain:diff**, NO por copia de 1126 líneas. |
| **INSTANCE** | **JAMÁS tocada por copia inter-repo.** Los 99/05/10/20/30 y lóbulos de cada repo NUNCA se mezclan ni sobrescriben. Línea roja dura: "NO cerebro único merged". |

**Invariante del cliente (cero pérdida por-neurona):** lo portable y lo específico viven MEZCLADOS en los mismos
archivos (CLAUDE.md de cars tiene §G portable Y §1 específico; cars editó §G in-place en §118). Por eso la
reconciliación KERNEL (PASO 2/4) debe ser **unión del texto más maduro de AMBOS lados, jamás reemplazo ciego** —
ninguna línea de §G/§3 de cars desaparece sin estar contenida en el canon resultante.

---

## §4 — Mapa de cuarentena (acción por artefacto)

| Repo | Item | Acción | Destino |
|---|---|---|---|
| inmobiliaria | `ALTORRACARSCLAUDE.md` (1126L, copia de cars @2026-04-10) | cuarentena (tras extraer §12) | `_legacy/` vía git mv; §12 → nuevo 99-HISTORIAL |
| inmobiliaria | `AVANCES.md` (3420L) | destilar-a-nodo + cuarentenar original | → `99-HISTORIAL` (ADRs por offset) + `30-LECCIONES`; original → `_legacy/` SOLO tras destilado verificado |
| inmobiliaria | `CLAUDE.md` (1595L, constitución) | promover-a-nodo (único) | base del nuevo router liviano + `20-ESPACIAL` (schema §4); §3 (arq. cars) → puntero GROUP-Altorra |
| inmobiliaria | **`DEPLOY-RUNBOOK.md`** (Project ID + IAM) | promover-a-nodo-config | nodo config/infra explícito; **NUNCA a `_legacy`** |
| inmobiliaria | `MEGA-PLAN.md` (benchmark 15 competidores) | mantener / destilar a lóbulo | keep-in-place; futuro lóbulo mercado/competencia |
| inmobiliaria | `PLAN-MEJORAS.md` (roadmap + SEO real) | destilar-a-nodo | → `10-CORTO` + `20-ESPACIAL`; **resolver desync vs AVANCES antes** |
| inmobiliaria | `CONTENIDO-EDITORIAL.md` / `tests/MANUAL-meta-snapshot.md` / `data/deploy-info.json` / `skills/` | mantener | keep-in-place (hojas/referencia/recurso paralelo) |
| cars | `dependency-map.md` (STALE) | mantener con puntero — candidato futuro | keep-in-place por valor histórico; `_legacy` SOLO tras decisión del comité |
| cars | `30-LECCIONES.md` | mantener / shard preventivo | al acercarse al cap → `31-LECCIONES-GIT`… dejando puntero (NUNCA borrar) |
| cars | `brain-check.mjs` + `pre-commit` | reconciliar-hacia-canon (bersaglio 6 checks) | reemplazo por copia + `brain:diff`; viejo recuperable por git |
| `~/.claude/skills` | `arquitecto-software` (bloque "En el proyecto Bersaglio") | desacoplar | método 6 lentes → global; bloque Bersaglio → cerebro de bersaglio |
| `~/.claude/skills` | `comite-expertos` (hardcodea docs/15, "Daniel", paths rotos) | parametrizar (no borrar) | leer paths del cerebro del proyecto activo |
| bersaglio | `FIREBASE-SETUP.md` / `STITCH-SETUP-GUIDE.md` (flotan en raíz) | evaluar | hoja de detalle / `_legacy` si stale / candidata a skill — decisión del comité |

---

## §5 — Matriz cross-repo (4 capas + SKILL)

| Capa | cars | bersaglio | inmobiliaria | skills global | CANON |
|---|---|---|---|---|---|
| **KERNEL** | §G + brain-check 5 + pre-commit; SIN §3.7/INSTALACION/check#6/50/60 | template-v1.0.0 · §G + §3.7 + INSTALACION + brain-check 6 + settings + 50/60 | AUSENTE | 3 skills Anthropic 100% universales | **bersaglio** |
| **SCHEMA** | 40-LOBULOS + spec §170 (define 4 capas) | 40-LOBULOS + 00 por-fecha | proto-router manual | n/a | **spec §170 + 40-LOBULOS** |
| **GROUP-Altorra** | 46-ESCALABILIDAD + Firebase/dorado/RBAC | 50-ARQ §0-2 (zero-budget portable) | embebe arq. cars + ALTORRACARSCLAUDE | crm-architect, legal-colombia (CO compartida) | **cars** (inmob. por puntero) |
| **INSTANCE** | 99=168 ADRs/2.28MB + lóbulos 41/42/43/46/48 | 99=55 ADRs + lóbulos 41-45 + planes | 8 monolitos | n/a | **cada repo su canon — jamás copia inter-repo** |
| **SKILL** | skills ~88 vendor | skills 74 vendor + inventory canon | skills 58 vendor | **7 skills** (4 a sanear acoplamiento) | **`~/.claude/skills` global** |

---

## §6 — Hallazgos de duplicación

- `ALTORRACARSCLAUDE.md` = ~95% duplicado de cars (único: solo §12). `CLAUDE.md §3` de inmobiliaria embebe arq. de
  cars (GROUP-Altorra referenciable, no INSTANCE).
- Duplicación 3-vías en skills sin gobernanza: `crm-architect`/`claude-md-improver`/`claude-automation-recommender`
  viven en el global Y vendorizadas en repos → riesgo de drift. Fuente canónica = el global.
- Las **M-NN de cars** y **L-26/L-27 de bersaglio** capturan la MISMA doctrina (verifica-no-asumas, git fetch antes
  de afirmar) por separado en cada INSTANCE → candidatas a **doctrina KERNEL compartida**.

---

## §7 — Gates de verificación (cero pérdida = VERIFICABLE)

1. **brain:check SANO** (exit 0) antes y después de cualquier movimiento en cars. Regresión = ABORTAR.
2. **git log intacto**: `git log --follow` por archivo movido = misma cadena de commits (ALTORRACARSCLAUDE = 4
   commits). Si `--follow` no enlaza el rename = history roto = ABORTAR (rehacer con git mv puro, nunca rm+add).
3. **Conteo de líneas**: `SUM(nodos destilados) + SUM(_legacy) >= SUM(originales)`. El original íntegro sobrevive en
   `_legacy`. `wc -l` pre/post.
4. **Conteo de headers/ADRs**: `grep -c '^## '` solo puede crecer o igualar, nunca decrecer.
5. **Working tree limpio** pre-movimiento (verificado HOY en inmobiliaria: status vacío).
6. **`_legacy/` con README de cuarentena** (qué/por qué/cuándo/cómo revertir) — replica el patrón de cars §119.
7. **`brain:diff` por hash** tras propagar kernel — divergencia = revisar deliberadamente, no auto-corregir.
8. **Inmobiliaria PRIMERO** (riesgo 0 a cars): toda la secuencia se valida en el banco de pruebas antes de tocar cars.
9. **Auditoría de fuga inter-proyecto en skills**: escanear `~/.claude/skills/*/SKILL.md` por `docs/NN-`, nombres
   propios y paths `skills/*` inexistentes → limpios/parametrizados antes de declarar la capa SKILL sin contaminación.

---

## §8 — ⚠️ CORRECCIÓN al spec §R6 (acoplamiento de skills)

El spec afirmaba que 4 de 7 skills globales son "Altorra-coupled". Verificado **leyendo cada `SKILL.md`**:

| Skill | Veredicto real | Acción |
|---|---|---|
| `crm-architect` | **El spec se equivoca**: genuinamente UNIVERSAL (multi-industria, verticales genéricos). | Mantener global. NO sacar del canal compartido. |
| `arquitecto-software` | **Riesgo ALTO**: incrusta un bloque "En el proyecto Bersaglio" con rutas `docs/50/41/20` de Bersaglio → **dispara en CADA tarea de código de Altorra Cars e Inmobiliaria con paths de OTRO proyecto**. Contaminación cruzada más clara. | Extraer el bloque al cerebro de bersaglio; dejar solo el método de 6 lentes en el global. |
| `comite-expertos` | Soft-coupled: hardcodea `docs/15`, el nombre "Daniel", y paths `skills/*` inexistentes en el global. | Parametrizar (leer del cerebro del proyecto activo). |
| `legal-colombia` | Acoplamiento **benéfico**: la jurisdicción Colombia + señales de joyería (RUCOM, retracto, SAGRILAFT) **ayudan a Bersaglio** (joyero colombiano). El único acoplamiento dañino es la ruta `docs/42-LEGAL.md`. | Generalizar guardrail CO; parametrizar solo el path del lóbulo legal. |

**Lección de gobernanza:** clasificar acoplamiento POR NOMBRE (como hizo el spec) lleva a error; hay que LEER el
`SKILL.md`. Regla propuesta: ninguna skill del canal compartido debe hardcodear `docs/NN-*.md`, nombres propios ni
paths `skills/*` de un solo repo → proponer un **linter de la capa skill**.

---

## §9 — Semillas de mejora para el Comité (Mandato 2)

> Insumo holístico para el Comité #1 — no solo reorganizar 4 capas, sino auditar gobernanza/reflejos/linter/economía
> de contexto/gaps. Dedupadas de los 4 inventarios.

1. **Economía de contexto** — endurecer el linter sobre caps (FAIL en sobre-tope sostenido, no solo WARN); aclarar la
   divergencia 333 vs ~600 de `30-LECCIONES`; Reflejo de Sharding.
2. **CLAUDE.md de cars a 318/320** — mover slots variables (reglas git, §3.7) a `docs/.brain-manifest.json` (no
   auto-cargado) para liberar presión y habilitar el marcador de versión.
3. **Gobernanza 4-capas en el linter** — validación de NAMESPACE (lóbulo↔rango) + **gate de saturación** (líneas
   auto-cargadas por repo: WARN ~450 / FAIL ~600). Hoy brain-check no conoce las 4 capas.
4. **Un único `brain-check.mjs` canónico** (el de bersaglio, 6 checks, multi-proyecto-aware) que los 3 repos consuman;
   promover a cars el check #6, el `pre-commit` y el SessionStart hook.
5. **Promover el §3.7 de bersaglio** (Comité ×3 por iniciativa propia) a cars/KERNEL.
6. **`brain:diff` por HASH** (decidido §170, no construido) — mecanismo de propagación; la mejora de mayor
   apalancamiento (sin ella los 3 cerebros driftean en silencio).
7. **`INSTALACION-CEREBRO.md`** (crown jewel, solo bersaglio) — formaliza el trasplante; activo KERNEL más fuerte.
8. **Gap de skills globales** — parametrizar `arquitecto-software`/`comite-expertos`; linter de la capa skill.
9. **Corregir la matriz §R6** (ver §8).
10. **Inventario de la CAPA GLOBAL de skills** (distinto del catálogo vendor; hoy `skills-inventory.md` dice "1 skill",
    son 7) + INVARIANTE (`~/.claude/skills` no es git-tracked) + manifest para reinstalar en máquina nueva.
11. **Convención ADR canónica** (numerada cars vs por-fecha bersaglio) — decidir o declarar ambas válidas.
12. **Detectar docs STALE y huérfanos no-NN** (dependency-map STALE; monolitos de inmobiliaria escapan al check).
13. **Neurogénesis completa de inmobiliaria** (mejor banco de pruebas) + **proteger INSTANCE-crítico** (Project ID/IAM
    a nodo config) + **resolver desync de planes**.
14. **Consolidar doctrinas KERNEL duplicadas-en-espíritu** (M-NN cars ↔ L-26/27 bersaglio).
15. **Economía** — evaluar `altor-hub-cirugia-execution-plan.md` (95KB, subsistema diferido).

---

## §10 — Preguntas abiertas para el cliente

1. **Cadencia de cuarentena**: ¿la sesión mueve los monolitos de inmobiliaria a `_legacy/` y commitea, o el destilado
   a nodos se aprueba pieza-por-pieza antes de cuarentenar cada original?
2. **Convención ADR canónica** del KERNEL: ¿numerada, por-fecha, o ambas válidas oficialmente?
3. **Topología de `INSTALACION-CEREBRO.md`**: ¿repo KERNEL compartido referenciado, o copia física por repo?
4. **¿Repo/carpeta KERNEL compartido explícito**, o el canon vive en bersaglio y los demás copian desde ahí?
5. **Skills acopladas**: ¿parametrizar en sitio o git-trackear en el repo Altorra? ¿Manifest para `~/.claude/skills`
   (no versionado) para garantizar no-regresión en bersaglio?
6. **`dependency-map.md` y `altor-hub-cirugia` (95KB)**: ¿cuarentenar ahora o mantener con puntero?
7. **Secrets de infra de inmobiliaria** (Project ID + IAM): ¿pueden vivir en `docs/` versionado, o requieren quedar
   fuera de git (gitignore + plantilla)?

---

## §11 — Mandato 3: Comité de VALIDACIÓN FINAL (gate de cierre)

> Registrado 2026-06-09 por instrucción del cliente. La macro-tarea NO se cierra hasta que este comité dé el visto bueno.

Tras TODA la implementación + pendientes, convocar un **segundo comité** que valide cómo quedó el cerebro en todo
sentido, contrastando contra ESTE inventario como línea base: oportunidades de mejora · errores · **huérfanos** ·
**vacíos** · **pérdida de memoria** (neurona-por-neurona vs §2) · **riesgo de agotar contexto** (gate de saturación) ·
**lectura fluida por los 3 proyectos sin perder contexto** · **sin cruce de información entre proyectos** (línea roja
INSTANCE) · una voz adversarial dedicada a **riesgos no estimados**.

Hay por tanto **DOS comités**: **#1** (mejora, durante — §9 es su insumo) y **#2** (validación final, cierre).
