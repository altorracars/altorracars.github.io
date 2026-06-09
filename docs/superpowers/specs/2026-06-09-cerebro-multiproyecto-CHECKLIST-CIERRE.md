# ✅ CHECKLIST DE CIERRE — Cerebro Multi-Proyecto (definición de "TERMINADO")

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
- [ ] `arquitecto-software` desacoplado: el bloque hardcodeado "En el proyecto Bersaglio" sale del global → al cerebro del proyecto. **Aceptación**: el SKILL.md global no menciona rutas `docs/NN-` de un repo.
- [ ] `comite-expertos` parametrizado (quita `docs/15`, "Daniel", paths `skills/*` inexistentes).
- [ ] `legal-colombia` parametrizado (ruta `docs/42` por proyecto; la jurisdicción CO se queda).
- [ ] Inventario de la **capa global** de skills (`~/.claude/skills`: hoy `skills-inventory` dice 1, son **7**) + manifest reinstalable (no es git-tracked). **Aceptación**: inventario actualizado + manifest.
- [ ] (Opcional) Linter de capa skill: escanea `~/.claude/skills/*/SKILL.md` por `docs/NN-`/nombres propios.

## 🚩 MANDATO 3 — Comité de VALIDACIÓN FINAL (gate de cierre — bloquea declarar "completo")
- [ ] Convocar `comite-expertos` #2 **contra el inventario del Mandato 1** como línea base.
- [ ] Certificar cada dimensión (criterio del cliente): **sin huérfanos** · **sin vacíos** · **sin pérdida de memoria** (neurona-por-neurona vs inventario) · **riesgo de saturación OK** (gate de boot) · **lectura fluida por los 3 proyectos** · **sin cruce de información entre proyectos** (línea roja INSTANCE) · **riesgos no estimados** revisados (voz adversarial).
- [ ] Resolver las **7 preguntas abiertas** (plan v5) con DECISIÓN del cliente (no solo recomendación).
- [ ] **Sign-off documentado** → ADR de cierre en `99` + actualizar este checklist a 100% → **"MACRO-TAREA CERRADA Y CERTIFICADA"**.

---

## 🔭 Riesgos a MONITOREAR durante la ejecución (del plan v5 — no son ítems, son vigilancia)
- Overhead del harness vs ahorro de boot (medir baseline de sesión vacía antes de cantar victoria).
- "Segundo cerebro de metadata" (manifest+fixtures+logs) — que su costo no supere el beneficio a N=3.
- Fidelidad semántica del destilado NO es enforceable por linter → **aprobación humana por pieza** no-negociable.
- `push → GitHub Pages` sin staging → un KERNEL corrupto se publica; el enforcement real es best-effort local.

---

> **Progreso global**: 6/~30 ítems hechos (las 5 fases de fundación + preservación). Falta el núcleo compartido (PASO 1-4),
> las skills, y la certificación final (Mandato 3). Cuando este checklist esté 100% + Mandato 3 con sign-off → *ahí* es "todo perfecto, certificado".
