# 🛰️ Prompt para Gemini — 2ª opinión sobre el cerebro multi-proyecto (revalidación PRE-PASO-1)

> **Protocolo** `docs/15-CONSEJO-EXTERNO.md`: Decisión Fuerte → 2ª opinión externa. **Anti-anclaje aplicado**:
> el prompt NO revela la postura del comité interno (que se inclinó por desacoplar) — Gemini razona independiente.
> **Modelo sugerido**: Gemini 3.1 Pro (High), con acceso a los 3 repos (como en la 1ª ronda, ADR §170).
> Daniel lo pega en Antigravity y trae la respuesta; se integra como un peer-review más (adoptar lo correcto,
> refutar con razón, NO subordinarse).

---

## PROMPT (copiar a Gemini)

Eres un revisor adversarial senior de arquitectura de sistemas de conocimiento. No ves mi conversación; este prompt es autocontenido, pero TIENES acceso a 3 repos git locales y debes VERIFICAR los hechos antes de opinar (no asumas).

**Contexto.** Tengo 3 repos git separados del mismo dueño: `altorracars.github.io`, `bersagliojewelry.github.io`, `altorrainmobiliaria.github.io`. Cada uno tiene un "cerebro documental": un conjunto de archivos markdown (`CLAUDE.md` + `docs/`) que sirve de **memoria persistente para un asistente IA que NO tiene memoria entre sesiones**. Una parte de esa doctrina es **genérica** (cómo operar la memoria, reflejos de captura/consolidación, un linter `scripts/brain-check.mjs`, gobernanza §G); el resto es **específico** de cada negocio. Hoy la parte genérica está **COPIADA en cada repo y DIVERGIENDO**.

**Decisión ya tomada (ADR §170):** extraer la doctrina genérica ("KERNEL") a un archivo compartido sincronizado entre los 3, **sin fusionar** los cerebros y **sin perder conocimiento**, en 4 pasos (extraer KERNEL → mecanismo de sync → destilar nodos pesados → propagar). Ahora estoy por ejecutar el PASO 1 (la extracción del KERNEL).

**Gatillo de esta consulta:** descubrimos una falencia — al cerrar sesiones, la documentación inicial era escasa, y la deliberación de comités/investigación de agentes no se capturaba ni se auto-detectaba su ausencia, así que la siguiente sesión arrancaba con conocimiento parcial.

**Hechos verificados (confírmalos en los repos):**
1. El "boot" del cerebro de cars (archivos auto-cargados: `CLAUDE.md` + `docs/05` + `docs/10`) pesa ~46.700 chars. El objetivo declarado en `docs/.brain-manifest.json` es 31.500, pero los caps por-archivo del mismo manifest SUMAN ~45.000 > 31.500 → el objetivo es **aritméticamente inalcanzable por construcción**.
2. El harness del asistente inyecta en CADA sesión un catálogo enorme de herramientas/skills/MCP (cientos de entradas) ANTES de leer una sola neurona — observablemente un **múltiplo** del tamaño del cerebro entero.
3. **No hay CI ni staging**: el deploy es push directo a GitHub Pages (estático). Cualquier "gate determinista" local es saltable (`--no-verify`) y no corre en el push.
4. Está planeada (sin fecha) una migración del hosting a **Cloudflare Pages** (que SÍ tendría build step / punto donde correr enforcement).
5. Los gates de no-pérdida que el plan asume (hash de contenido, cobertura por ancla, pureza de capa) **NO existen aún en el código** (`brain-check.mjs` solo tiene 6 checks base: huérfanas, caps, desync de índice, cache, refs, skills).
6. El KERNEL a extraer (gobernanza + doctrinas cognitivas) está **MEZCLADO línea-a-línea** con doctrina específica del negocio en el mismo `CLAUDE.md`, y cars editó esa sección in-place (diverge de bersaglio, que es el canon propuesto). `CLAUDE.md` de cars está además a ~2 líneas de su tope de líneas.

**La decisión que debes red-teamear (razona independiente; NO te doy mi postura):**
- **Opción A** — ejecutar el refactor completo del KERNEL multi-proyecto ahora (extraer la gobernanza a un archivo compartido + mecanismo de sync + propagación a los 3), construyendo primero los gates de no-pérdida.
- **Opción B** — hacer solo la **cura mínima** de la falencia (una convención de enlace para la deliberación + conectar los artefactos de investigación al índice de ruteo + destilar el nodo más pesado) y **DIFERIR** el refactor del KERNEL (¿hasta la migración a Cloudflare, que daría un build step real?).
- **Opción C** — otra topología que propongas.

**Preguntas específicas:**
1. ¿El ahorro de boot del KERNEL compartido (≈15k chars) justifica su complejidad PERMANENTE (sync, hash, gates, manifest, mapas) dado que el harness inyecta un múltiplo no-controlable del tamaño del cerebro? ¿O es optimizar ruido estadístico?
2. ¿Construir enforcement pesado AHORA (régimen GitHub-Pages local, saltable) tiene sentido sabiendo que el punto de no-retorno real es el push y que vendría Cloudflare con build step donde el enforcement viviría mejor?
3. Para sincronizar doctrina genérica entre 3 repos git locales sin fusionarlos: ¿documento-copiado + comparación de versión, o hay algo estrictamente mejor (submódulo / paquete npm privado / git subtree / otro)? Considera Windows + `autocrlf=true` + ausencia de CI + que los 3 son working-trees locales sin remoto compartido en el arranque.
4. ¿Qué **riesgo no estimado** ves que un comité interno enfocado en "CÓMO extraer el KERNEL" probablemente pasó por alto (un riesgo de encaje/proporcionalidad, no de mecánica)?
5. Tu **veredicto**: A, B o C — y por qué, en orden de impacto. Si A es sobre-ingeniería, dilo. Si B deja un hueco real, dilo.

Responde con franqueza adversarial y citando lo que verificaste en los repos.

---

## Tras la respuesta de Gemini
Integrar como peer-review: **adoptar** lo correcto, **refutar con razón** lo que esté mal (no subordinarse), y añadir un bloque `## Integración Gemini` al [VEREDICTO](2026-06-09-comite-revalidacion-paso1-VEREDICTO.md). Si Gemini converge con el comité → decisión de alta confianza; si diverge → resolver el choque con evidencia.
