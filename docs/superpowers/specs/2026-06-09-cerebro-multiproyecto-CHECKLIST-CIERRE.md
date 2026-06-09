# ✅ CHECKLIST DE CIERRE — Cerebro Multi-Proyecto (definición de "TERMINADO")

> 🛑 **PARCIALMENTE SUPERSEDED por ADR §171 (2026-06-09).** Los ítems de **PASO 1 (extraer KERNEL), brain:diff/pull y PASO 4 (propagar)** quedan **DEROGADOS** (sync P2P pausado). El rumbo vigente (economía local + Opción C diferida) está en `2026-06-09-comite-revalidacion-paso1-VEREDICTO.md`. Siguen vigentes: la cura de la falencia (✅), el destilado del nodo 10, y el **Mandato 3 (comité validación final)** como gate de cierre.

> **Qué es**: la lista tickeable de TODO lo que falta para declarar el macro-proyecto **CERRADO Y CERTIFICADO**.
> Cada ítem tiene su **criterio de aceptación verificable**. Marca `[x]` al cumplirlo + el commit/evidencia.
> Detalle de cómo hacer cada paso → `2026-06-09-cerebro-multiproyecto-HANDOFF-ESTADO.md §E`. Arquitectura → plan v5.
>
> **Regla**: la macro-tarea NO está cerrada hasta que TODOS los ítems estén `[x]` Y el **Mandato 3** dé sign-off.
> "Perfecto sin errores" NO se declara — se CERTIFICA aquí, con evidencia.

---

## ✅ HECHO (referencia — no re-hacer)
- [x] **Mandato 1** — Inventario + preservación (`2026-06-09-inventario-preservacion-cerebros.md`)
- [x] **Mandato 2** — Comité ×3 + Gemini → plan v5 (`2026-06-09-plan-mejora-cerebro-v4-comite.md`)
- [x] **PRE-PASO-0** — caps líneas→chars + linter `--boot`/`--full` (cars `0450b0b`/`de5c905`)
- [x] **PASO 0** — linter canónico byte-idéntico cars+bersaglio + manifest por-repo (cars `19d6648`, bersaglio `9f7bdfd`)
- [x] **PASO 2** — cerebro neuronal instalado en inmobiliaria, cero-pérdida verificada (inmobiliaria `0a9c9e0`)
- [x] **Investigación cruda preservada** (`research-archive/`, cars `42a85c8`)

---

## ⏳ PASO 1 — Extraer el KERNEL (el más delicado · cerebros vivos cars+bersaglio)
- [ ] Inventario línea-a-línea de §0/§2/§3/§4/§G en cars Y bersaglio, etiquetando KERNEL|INSTANCE con el **test de pertenencia mecánico** (pureza + verdad-al-sustituir-negocio). **Aceptación**: cada sub-sección tiene su etiqueta registrada.
- [ ] **Reconciliación cars↔bersaglio = UNIÓN** (no reemplazo): `diff-de-contenido por ID`; conflictos (ej. §G editado in-place §118 en cars) resueltos a mano. **Aceptación**: ninguna línea de §G/§3 de cars NI de bersaglio desaparece sin estar contenida en el canon — verificable por diff.
- [ ] `docs/00-KERNEL.md` PURO en bersaglio (canon). **Aceptación**: gate de pureza pasa (0 tokens de vocabulario INSTANCE: Firebase/RBAC/CSS/Colombia/nombres-propios).
- [ ] **Ancla de boot** (`<!--ANCHOR-->`, ≤1.200 chars) dentro de 00-KERNEL.md, impresa por el SessionStart hook (generada, no copiada). **Aceptación**: el boot imprime el ancla; check de cap del ancla pasa.
- [ ] `CLAUDE.md` de cars y bersaglio queda lean (router + §1 + §3-plataforma; el §G/§3-cognitivo sale al 00-KERNEL). **Aceptación**: brain:check SANO; BOOT no creció.
- [ ] **Probado en sandbox** (clonar el bloque, correr extracción+unión+pureza) ANTES de tocar cars/bersaglio real. **Aceptación**: sandbox verde.
- [ ] **Cero-pérdida verificada**: `git log --follow` + conteos de líneas/anclajes antes/después. **Aceptación**: nada desaparece; brain:check SANO en los 2.

## ⏳ brain:diff / brain:pull (mecanismo de sync, simple)
- [ ] `brain:diff` = hash del 00-KERNEL.md local (`git rev-parse :path`) vs canon → **1 línea WARN, NUNCA FAIL-en-boot**. **Aceptación**: divergencia simulada → WARN; igual → silencio.
- [ ] `brain:pull` = copia-de-disco del KERNEL de bersaglio + sobrescribe local (unidireccional). **Aceptación**: tras pull, hash local == canon.
- [ ] Single-writer: mejoras locales → `docs/_kernel-proposals/NN.md` (no edición in-place del KERNEL). **Aceptación**: check de inmutabilidad del KERNEL local activo.

## ⏳ PASO 3 — Fase B (destilar · economía)
- [ ] Nodo 10 de **cars** destilado: consolidar tareas cerradas a `99` (ADR) + `30` (lecciones), recortar al foco vivo. **Aceptación**: brain:check — nodo 10 sin `↗`, BOOT cars ≤ 31.5k chars.
- [ ] Nodo 10 de **bersaglio** destilado. **Aceptación**: BOOT bersaglio ≤ 31.5k chars.
- [ ] Inmobiliaria: expandir `99`/`30` desde `_legacy/AVANCES.md` on-demand (continuo, aprobación humana por pieza).

## ⏳ PASO 4 — Propagar el canon
- [ ] `00-KERNEL.md` + SCHEMA (registro de slugs) propagados a los 3 repos por copia byte-idéntica. **Aceptación**: hash del KERNEL idéntico en los 3.
- [ ] Doctrina §G.5 (caps) actualizada a chars en el texto (el linter ya lo hace; falta la prosa). **Aceptación**: §G.5 menciona chars + manifest.

## ⏳ Skills (§R6 — ortogonal, se puede hacer en paralelo)
- [x] `arquitecto-software` desacoplado (2026-06-09): bloque "En el proyecto Bersaglio" → domain-neutral ("consulta el cerebro del proyecto activo"). SKILL.md sin rutas `docs/NN-` de un repo. ✅
- [x] `comite-expertos` parametrizado: fuera "Daniel"→cliente + paths `skills/*` inexistentes. ✅
- [x] `legal-colombia` parametrizado: ruta `docs/42` generalizada + ref `§3.7` corregida (en cars es Cloudflare); jurisdicción CO se queda. ✅
- [x] **Durabilidad por VERSIONADO**: las 4 skills portables ahora viven git-trackeadas en `skills/` de los 3 repos (byte-idénticas), no solo en `~/.claude/skills`. Inventario cars actualizado. Commits: cars `db346c2` · bersaglio `3bca0c0` · inmobiliaria `9916aa6`. *(El "manifest reinstalable" = el propio `skills/` versionado; install manual = copiar repo→`~/.claude/skills`.)*
- [ ] (Opcional) Linter de capa skill: escanea `~/.claude/skills/*/SKILL.md` por `docs/NN-`/nombres propios. · ⏳ inmobiliaria sin `docs/skills-inventory.md` (check #6 omitido) — crear si se quiere catálogo.

## 🚩 MANDATO 3 — Comité de VALIDACIÓN FINAL (gate de cierre — bloquea declarar "completo")
- [x] Convocado `comite-expertos` #2 (Mandato 3, **11 agentes**) contra el inventario del Mandato 1 — crudo → `research-archive/2026-06-09-mandato3-validacion-final-deliberacion.json`.
- [x] Dimensiones certificadas EN DISCO: cero-pérdida ✅ · aislamiento INSTANCE ✅ · saturación/boot ✅ · lectura fluida ✅ · riesgos no estimados ✅. (Veredicto inicial **NO_CERTIFICA** por 2 bloqueantes → resueltos+verificados con grep.)
- [~] 7 preguntas abiertas: resueltas/diferidas por §171 (Q6b documento-copiado, Q-namespace por slug, secrets→nodo-config) o tracked como opcionales en §172.4; cliente ratificó el rumbo (2026-06-09).
- [x] **Sign-off → ADR §172 en `99`** + este checklist actualizado. **CERTIFICADO** (alcance §171, cars; cura aterrizada+verificada en §G.4; Opción C diferida; propagación a bersaglio/inmob = follow-up). ⚠️ NO se declara "100% de la visión original": el KERNEL compartido fue **descopado** por §171 (sobreingeniería), no completado.

---

## 🔭 Riesgos a MONITOREAR durante la ejecución (del plan v5 — no son ítems, son vigilancia)
- Overhead del harness vs ahorro de boot (medir baseline de sesión vacía antes de cantar victoria).
- "Segundo cerebro de metadata" (manifest+fixtures+logs) — que su costo no supere el beneficio a N=3.
- Fidelidad semántica del destilado NO es enforceable por linter → **aprobación humana por pieza** no-negociable.
- `push → GitHub Pages` sin staging → un KERNEL corrupto se publica; el enforcement real es best-effort local.

---

> **Progreso global**: 6/~30 ítems hechos (las 5 fases de fundación + preservación). Falta el núcleo compartido (PASO 1-4),
> las skills, y la certificación final (Mandato 3). Cuando este checklist esté 100% + Mandato 3 con sign-off → *ahí* es "todo perfecto, certificado".
