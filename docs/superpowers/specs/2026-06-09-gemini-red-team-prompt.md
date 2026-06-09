# Red team — Arquitectura de memoria documental multi-proyecto (Gemini CON acceso a los 3 repos)

> Prompt para Gemini 3.1 Pro (High) vía Antigravity, **con acceso de lectura a los 3 repos + la capa global
> de skills** (las rutas absolutas van en el prompt → Antigravity las abre). Generado por el Comité #1
> (Mandato 2) con anti-anclaje (no incluye nuestras respuestas a las 7 preguntas). Humano en el medio: el
> cliente lo corre, trae la respuesta, se integra como un peer-review más. Protocolo `docs/15-CONSEJO-EXTERNO.md`.
> Versión cross-repo (reemplaza la versión de un-solo-repo).

---

Eres un arquitecto de software senior actuando como **revisor adversarial independiente (red team)**. Tienes acceso de lectura a TRES repositorios de git y a un directorio global de skills (rutas absolutas abajo). Tu trabajo NO es validar el plan ni complacer a su autor: es **encontrar dónde se rompe**, verificando cada afirmación contra el CÓDIGO REAL, no contra lo que el plan dice de sí mismo. La ventaja que tienes sobre el comité interno que produjo el plan: puedes **verificar las afirmaciones CROSS-REPO** (que el comité solo conocía por un inventario resumido). Úsala: confirma o refuta las premisas que el plan da por ciertas sobre los OTROS dos cerebros.

## Rutas (ábrelas todas)
- **Altorra Cars** (cerebro maduro, donde vive el plan): `C:\Users\romad\Documents\GitHub\altorracars.github.io`
- **Bersaglio Jewelry** (supuesto CANON del KERNEL): `C:\Users\romad\Documents\GitHub\bersagliojewelry.github.io`
- **Altorra Inmobiliaria** (supuestamente SIN cerebro neuronal): `C:\Users\romad\Documents\GitHub\altorrainmobiliaria.github.io`
- **Capa global de skills** (canal compartido inter-proyecto): `C:\Users\romad\.claude\skills`

## Qué leer (en este orden)
1. En **altorracars**: `docs/superpowers/specs/2026-06-09-cerebro-unico-multiproyecto.md` (decisión base ADR §170) y `docs/superpowers/specs/2026-06-09-inventario-preservacion-cerebros.md` (inventario de los 3 cerebros + plan de preservación).
2. **Verifica en el código real de altorracars**: `scripts/brain-check.mjs`, `githooks/pre-commit`, `CLAUDE.md`, `docs/00-INDICE.md`, `docs/05-ESTADO-GLOBAL.md`, `docs/10-MEMORIA-CORTO-PLAZO.md`, `docs/30-LECCIONES.md`, `package.json`.
3. **Verifica la premisa "bersaglio es el canon del KERNEL" en bersaglio**: `CLAUDE.md` (¿tiene §3.7 "comité por defecto" y `brain-template-version`?), `scripts/brain-check.mjs` (¿tiene 6 checks incl. uno de skills↔inventario que cars no tiene?), `docs/INSTALACION-CEREBRO.md`, `docs/60-WORKFLOWS.md`, `docs/50-ARQUITECTURA.md`. **¿Es de verdad más maduro, o es una suposición?** Compara su `brain-check.mjs` con el de cars.
4. **Verifica "inmobiliaria sin cerebro" en inmobiliaria**: confirma que NO hay `docs/`, `.claude/`, ni `_legacy/`; revisa los monolitos de raíz `AVANCES.md`, `CLAUDE.md`, `ALTORRACARSCLAUDE.md`, `DEPLOY-RUNBOOK.md`, `MEGA-PLAN.md`. **¿`ALTORRACARSCLAUDE.md` es de verdad ~95% una copia del cerebro viejo de cars** (deuda de contexto a cuarentenar), o tiene conocimiento único de inmobiliaria?
5. **Verifica la corrección §R6 sobre skills en `C:\Users\romad\.claude\skills`**: lee `arquitecto-software/SKILL.md` (¿incrusta un bloque hardcodeado "En el proyecto Bersaglio" con rutas docs/50/41/20, que dispararía en CADA tarea de código de cars/inmobiliaria?), `comite-expertos/SKILL.md` (¿hardcodea docs/15, el nombre "Daniel", paths skills/* inexistentes?), `crm-architect/SKILL.md` (¿es genuinamente universal o está acoplado a Altorra?), `legal-colombia/SKILL.md`. El plan afirma que el spec original clasificó mal el acoplamiento "por nombre" — **¿tiene razón el plan al re-clasificarlas?**
6. **AL FINAL** (a propósito, para formar tu propio juicio antes de ver las conclusiones del autor): en altorracars, `docs/superpowers/specs/2026-06-09-plan-mejora-cerebro-v4-comite.md` — el plan v4 que debes ATACAR.

## Contexto (1 párrafo)
Un solo desarrollador, con un agente LLM **sin memoria entre sesiones** (el cerebro documental ES su memoria), mantiene 3 proyectos vanilla-JS + Firebase en GitHub Pages (deploy estático, **sin CI que corra `npm install`**). Cada proyecto tiene un "cerebro" en Markdown versionado; `CLAUDE.md` se auto-carga en cada sesión. Comparten doctrina genérica que hoy está **copiada y divergiendo**. Se quiere un núcleo común sincronizado entre los 3 **sin fusionarlos** ni perder conocimiento. Restricciones (verificables): hook `pre-commit` local saltable con `--no-verify`; **el PUSH (no el commit) es el punto de no-retorno** (push→auto-deploy, sin staging); un **cron escribe en `main` cada 4h** (único writer no-humano concurrente); Windows + Git Bash; `core.autocrlf=true`, `core.filemode=false`, `core.hooksPath=githooks`.

## Anti-anclaje (importante)
El plan v4 contiene las recomendaciones **tentativas** del autor sobre 7 preguntas abiertas. **No las adoptes.** Forma tu respuesta independiente a cada una y trata las del autor como posiciones a **refutar**, señalando dónde anularías al comité y por qué.

## Afirmaciones a verificar CONTRA EL CÓDIGO (no las creas sin mirar)
1. ¿`scripts/brain-check.mjs` de cars lee `docs/99-HISTORIAL-ADR.md` **entero** (~41k líneas) en cada corrida? (justifica partir el linter `--boot`/`--full`).
2. ¿Los caps están en **líneas** (no chars/tokens)? ¿El nodo `10-MEMORIA-CORTO-PLAZO.md` "sano" pesa ~15k chars en ~83 líneas?
3. ¿`brain:diff`/`brain:promote`/`brain:preserve` son **vaporware** (solo `brain:check` en `package.json`, en los 3 repos)?
4. ¿El `pre-commit` es `#!/bin/sh` + documenta `--no-verify`? ¿Corre con `core.filemode=false` en Windows?
5. ¿`CLAUDE.md` (cars y bersaglio) **mezcla** doctrina portable (§G/§3) con específica del negocio (§1) en el mismo archivo? Si sí, ¿el hash del archivo entero divergiría por lo específico, no por lo portable? (es el "fatal flaw" que el plan dice resolver con sub-secciones + ancla generada).
6. ¿Existen ya `docs/00-KERNEL.md`, `docs/_legacy/`, `.gitattributes`, tokenizer en deps? (el plan asume que NO).
7. **CROSS-REPO** — ¿el `brain-check.mjs` de bersaglio realmente tiene un check #6 (skills↔inventario) que el de cars NO tiene? ¿El §G/§3 de bersaglio y el de cars **divergen** (justificando la reconciliación "unión, no reemplazo")? ¿Cuánto difieren de verdad?

## Tus 3 tareas (responde en español, estructurado, adversarial, una sola pasada)

**TAREA 1 — Red team del plan v4.**
- **Fallas no detectadas:** errores de diseño, supuestos falsos o casos límite que el plan NO contempla. Mecanismo exacto de fallo (qué secuencia de eventos rompe qué garantía). Apóyate en lo que VISTE en el código de los 3 repos.
- **Riesgos de 2º orden:** ¿el costo de gobernanza del "segundo cerebro de metadata" (manifest + baseline + subsumed-map + conflict-log + fixtures + changelog) **supera el beneficio a N=3**? ¿El sistema se sabotea (p.ej. el GC del propio cerebro poda la red de respaldo `_legacy/`; el cron pisa el baseline)?
- **El fatal flaw:** la única cosa que hará fracasar esto en la práctica.
- **Premisas cross-repo:** ¿se sostiene "canon=bersaglio"? ¿la corrección §R6 de skills es correcta? Si alguna premisa falla, ¿qué parte del plan se cae con ella?

**TAREA 2 — Las 7 preguntas abiertas.** Encuéntralas en el plan v4 (sección "Recomendaciones") y da tu criterio **independiente** en cada una, declarando supuestos y buscando la opción que el autor no consideró.

**TAREA 3 — ¿Hay una alternativa fundamentalmente mejor?** La decisión más cara de revertir es **"propagación del núcleo por copia byte-idéntica + gate de hash (`brain:diff`) + single-writer"**. ¿Existe un enfoque fundamentalmente mejor para este entorno exacto (1 dev, 3→4 cerebros, sin CI, deploy estático, gobernanza ~50% prosa que el LLM lee como memoria)? Considera al menos: (a) paquete/dependencia versionada; (b) archivo-fuente único con generación/`include` por tooling; (c) git submodule/subtree; (d) no compartir nada + reconciliación manual periódica (diff trimestral entre los 3 `CLAUDE.md`); (e) lo que se te ocurra. Sé explícito sobre el trade-off que aceptas y qué disparador medible te haría cambiar de opinión.

**Formato:** prosa estructurada con encabezados por tarea. No suavices las conclusiones; el valor está en lo que está mal o falta. Si te falta un dato, decláralo y razona bajo el supuesto más probable — es una consulta de una sola pasada.
