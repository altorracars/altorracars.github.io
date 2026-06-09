# Spec maestro — Cerebro multi-proyecto (núcleo compartido + memoria por proyecto)

> **Tipo**: Documento de Diseño / Decisión Fuerte. **Fuente de verdad** para ejecutar, en una
> sesión nueva con contexto limpio, la reorganización del cerebro de los 3 proyectos.
> **Fecha**: 2026-06-09. **Autor**: Claude (Altorra Cars). **Estado**: **DECISIÓN APROBADA** por el
> cliente (incl. interpretación de "espejo"); **PENDIENTE DE EJECUCIÓN** (es trabajo grande para su propia sesión).
>
> **Cómo se decidió**: Trigger 🛰️ Decisión Fuerte → **comité de expertos ×3** (33 agentes, 5 expertos
> con tensión + peer-review anónimo + síntesis, verificando en disco) + **4ª voz Gemini 3.1 Pro High**
> (anti-anclaje). Síntesis final por Claude (refuté el junction de Gemini con razones; ver §Mecanismo).

---

## 0 — Contexto (3 proyectos, 3 repos git separados, carpeta `C:\Users\romad\Documents\GitHub\`)
- **altorracars.github.io** — cerebro completo (20 nodos, `99` ~43.037 líneas, CLAUDE.md 318/320). Canon de GRUPO-Altorra.
- **bersagliojewelry.github.io** — cerebro mirror, **más maduro**: `brain-template-version 1.0.0` + `INSTALACION-CEREBRO.md` + nodos extra (45/50/60) + §3.7 (comité por defecto) + `brain-check` con check #6 (skills↔inventario). **Canon del NÚCLEO.**
- **altorrainmobiliaria.github.io** — SIN cerebro neuronal. CLAUDE.md monolítico ~1.595 líneas + **~280KB de docs cruzadas** (`ALTORRACARSCLAUDE.md`, `AVANCES.md` 165KB, `MEGA-PLAN.md`, etc.). Será el **banco de pruebas** (cero riesgo para cars).

## 1 — VEREDICTO (qué hacer)
**NO un cerebro único merged.** Sí: **NÚCLEO portable compartido + memoria específica por proyecto**, en arquitectura de **4 CAPAS**, con propagación por **copia + alerta (`brain:diff`)**, NO por link en vivo ni merge.

**Opción A (cerebro único en la carpeta padre) DESCARTADA — mecánicamente:**
- `GitHub/` **NO es repo git** (`fatal: not a git repository`) → sin versión/rollback/historia (rompe "no puede romperse").
- Claude **auto-carga `CLAUDE.md` solo desde la raíz del CWD activo**, nunca del padre; `brain-check.mjs` ancla `process.exit(1)` per-repo.
- **Saturación (el clavo real):** boot always-on = `CLAUDE.md(318)+05(24)+10(79)=421 líneas ≈ 6-9k tokens de UN negocio`. Un router merged multiplica eso por N negocios EN CADA SESIÓN → menos contexto para la tarea. (El tamaño de `99` es IRRELEVANTE — es on-demand por offset, jamás auto-carga.)

## 2 — Modelo de 4 CAPAS

| Capa | Qué es | Dueño/canon | Validación |
|---|---|---|---|
| **KERNEL** (universal) | §G gobernanza · §3 doctrinas · `brain-check.mjs` · githooks · `INSTALACION-CEREBRO.md` | **bersaglio** | copia de archivo-entero + `brain:diff` (hash) alerta divergencia |
| **SCHEMA** (contrato) | el NAMESPACE de nodos (rangos 40-49=dominio, 50-59=arquitectura, 60-69=workflows + significado) | bersaglio | linter valida que cada lóbulo MAPEE a un slot — **NO** que exista el mismo SET |
| **GROUP-Altorra** | marca dorada · Colombia · Firebase · RBAC · patrones cars↔inmobiliaria (**NUNCA** bersaglio) | **cars** | canal propio, independiente del kernel |
| **INSTANCE** (proyecto) | 05/10/20/99 + lóbulos con hallazgos reales | cada repo | **JAMÁS** tocada por copia inter-repo |

**Líneas rojas (verificadas):**
1. **NO congelar el SET de nodos** — la divergencia `cars={43,46,48}` vs `bersaglio={43,45,50,60}` es **vocabulario de dominio legítimo**, no drift. El SCHEMA congela el ESPACIO DE NOMBRES (rangos+significados), no el inventario.
2. **NO inflar `CLAUDE.md`** (318/320, a 2 del cap) — el marcador de versión = 1 comentario HTML; metadatos multi-capa van en `docs/.brain-manifest.json` (NO auto-cargado, lo lee solo el linter); los slots variables (reglas git, §3.7) se REFERENCIAN desde el router, su contenido vive en nodo dedicado.
3. **NO centralizar las 74/77 skills del repo** en `GitHub/skills/` (están git-tracked por repo; sacarlas mata el versionado). El único canal compartido de skills es `~/.claude/skills/`.
4. **NO usar junction/symlink ni git submodule.**

## 3 — MECANISMO (Gemini vs comité — RESUELTO a favor del comité)
- **Gemini propuso junction de Windows** (link en vivo `docs/core → claude-core`). **REFUTADO**, con razones: (a) portable y específico **viven MEZCLADOS en los mismos archivos** (`CLAUDE.md` tiene §G portable Y §1 específico) → no se linkea medio archivo; (b) junction **no se versiona y se rompe en clon nuevo** → huérfanos; (c) link en vivo = **un error en el kernel corrompe los 3 al instante** (falla correlacionada).
- **ADOPTADO:** **copia del bloque KERNEL** (idempotente) + **`brain:diff` read-only** que en SessionStart compara el kernel local vs canon (bersaglio) **por HASH** (no por número de versión — cars editó §G in-place §118) y, si difiere, emite **UNA línea WARN accionable** (`"KERNEL desincronizado. Corre: npm run brain:pull"`). **Nunca FAIL en boot** (evita warning-fatigue). Hash para DETECTAR (barato/seguro), copia-de-archivo para RESOLVER.
- *Gemini aportó (adoptado):* la dirección (capa portable compartida) + la verificación de que **los 3 comparten stack** (vanilla JS + Firebase + GitHub Pages) → la capa portable es real, no ilusión.

## 4 — RIESGOS anticipados + mitigación
- **R1 sync innecesaria**: el kernel cambia rarísimo → NO automatizar escritura (un reescritor con bug corrompe los 3). Baseline = copia + diff read-only.
- **R2 warning-fatigue**: `brain:diff` = WARN accionable, nunca FAIL-en-boot.
- **R3 falso-OK** (mismo nº, texto distinto): detección por HASH, no por versión.
- **R4 espejo↔limpio (BLOQUEANTE, RESUELTO)**: "inmobiliaria=espejo de cars" choca con la Regla Dura #4 ("no copiar historial de otros proyectos"). **Resolución confirmada por el cliente**: espejo = **misma ESTRUCTURA + capa GROUP-Altorra**, con `99/30/lóbulos` **VACÍOS** que se llenan con la realidad de inmobiliaria — NO clon de las 43k líneas de cars.
- **R5 legacy de inmobiliaria** (~280KB): todo a `_legacy/` (cuarentena, no borrado).
- **R6 skills acopladas**: de las 7 globales (`arquitecto-software`, `claude-automation-recommender`, `claude-md-improver`, `comite-expertos`, `crm-architect`, `legal-colombia`, `session-report`), **4 son Altorra/Colombia-coupled** (legal-colombia, crm-architect, comite-expertos, arquitecto-software) y **hoy afectan a bersaglio silenciosamente** → migrarlas a git-tracked en su repo; ~3 universales quedan en `~/.claude/skills/`. ⚠️ `~/.claude/skills/` NO es git-tracked → declarar INVARIANTE + manifest para reinstalar en máquina nueva.

## 5 — Restricciones duras del cliente → cómo se cumplen
- **No romperse**: todo versionado git por-repo; propagación read-only-detect + copia (cero reescritura de routers, cero falla correlacionada). A descartada por imposibilidad mecánica.
- **No des-documentar**: cada repo conserva su 99/30/lóbulos; `brain:check` SANO como gate de instalación; INSTANCE nunca tocada por copia inter-repo.
- **No saturar**: los 99 nunca se concatenan; boot carga solo SU negocio; andamiaje fuera de `CLAUDE.md` (manifest JSON). **Nuevo gate medible**: `brain-check` suma líneas auto-cargadas (WARN ~450 / FAIL ~600 por repo).
- **Sin huérfanos/vacíos**: frontera KERNEL/SCHEMA/GROUP/INSTANCE + gate de install + linter de huérfanas + validación de namespace.

## 6 — PLAN DE EJECUCIÓN (sesión nueva)
- **PASO 0** ✅ (hecho): cliente confirmó la interpretación de "espejo" (R4).
- **PASO 1** (skills, ortogonal/reversible): consolidar las ~3 universales en `~/.claude/skills/`; migrar las 4 Altorra-coupled a git-tracked en su repo; manifest + nota de no-regresión inter-proyecto.
- **PASO 2** (congelar canon DESDE BERSAGLIO): `diff` formal §G/§3/linter/hooks bersaglio↔cars → reconciliar al texto más maduro con el FORMATO de template de bersaglio; tabla de clasificación nodo-por-nodo (4 capas) + registro de namespace; mover slots variables fuera de `CLAUDE.md`.
- **PASO 3** (mecanismo mínimo, probado en INMOBILIARIA primero — el más sucio, riesgo CERO para cars): extender `brain-check.mjs` con `brain:diff` (hash) + gate de saturación + validación de namespace; instalar cerebro limpio en inmobiliaria (tiene `type:module` pero NO el script `brain:check`); cuarentenar los ~280KB legacy. Gate: `brain:check` SANO + boot con signos vitales de inmobiliaria.
- **PASO 4** (promover a cars y bersaglio): por copia-de-archivo del kernel + migración guiada, una vez validado en inmobiliaria.
- **DESCARTADO**: 4º repo-plataforma `altorra-brain-template` (a N=3, sin CI, mergeando a mano = más fricción). Reevaluar si N≥4.

## 7 — ⚠️ MANDATOS DEL CLIENTE PARA LA SESIÓN NUEVA (no olvidar — analizar a fondo + con comité)
1. **NO PERDER lo ya documentado**: toda la información importantísima de CADA proyecto se PRESERVA (límite de guardián: cuarentenar en `_legacy/`, NUNCA borrar). Antes de tocar un cerebro, **inventario exhaustivo** de qué info crítica vive en él + plan de preservación verificado. Esto es condición de aceptación, no opcional.
2. **Verificar AMPLIA y HOLÍSTICAMENTE cómo MEJORAR el cerebro** (con el comité de expertos): no solo reorganizar las 4 capas, sino auditar el cerebro entero (gobernanza, reflejos, linter, economía de contexto, gaps) buscando mejoras de fondo. La fusión Bersaglio→cars (§168/§169 detectó mejoras: §3.7, 60-WORKFLOWS, INSTALACION-CEREBRO, check #6, §15 generalizado) es el punto de partida, no el techo.

## 8 — Punteros
- Skills: `~/.claude/skills/` (global; las 4 de Altorra ahí — ver §R6). Catálogo cars → `docs/skills-inventory.md`.
- Bersaglio (canon kernel): `C:\Users\romad\Documents\GitHub\bersagliojewelry.github.io\` (CLAUDE.md + `docs/INSTALACION-CEREBRO.md` + `docs/60-WORKFLOWS.md`).
- Decisión registrada como ADR en `docs/99-HISTORIAL-ADR.md` (§170) + fila en `00-INDICE`.
