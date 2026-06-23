# TODO-36 — Validador Live vía extensión "Claude in Chrome" (post-merge) · BRIEF para sesión nueva ⟦OPUS-4.8⟧

> Capturado 2026-06-23 (pedido del dueño). **NO se construye aquí**: el dueño pidió **SESIÓN NUEVA dedicada**.
> Este brief deja la idea lista. Alinear el resultado en **TODOS los cerebros/proyectos** (portable).

## La idea (en palabras del dueño)
Tras el **merge** (cuando los cambios YA están en vivo en la web), **lanzar un prompt a la extensión de
Claude en Chrome** (`mcp__Claude_in_Chrome__*`) para que **haga todas las validaciones en vivo** del sitio.
La extensión **emite un concepto de observabilidad**; el dueño **pega esa respuesta en el chat de desarrollo**
y **Claude-dev (yo) toma acciones** (diagnóstico → fix). Es un APOYO para **encontrar evidencias reales** en
vivo — resuelve el hueco crónico de "verificación live" (L-08: no se puede E2E en localhost; el dueño hace la
verificación final).

## Casos de uso (ejemplos del dueño)
- **El bot** logueado vs NO logueado: flujo, comportamiento, **respuestas** (¿buenas? ¿"no te entendí"?).
- **Finalizar conversación** → ¿se actualiza? ¿inicia una nueva? ¿exige forzar refresh? ¿cómo se comporta?
- En general: recorrer el camino vivo del subsistema tocado y reportar evidencia.

## Flujo / división de trabajo
1. **Dueño** abre la web en vivo + **mete las credenciales** del login él mismo (Claude no maneja credenciales).
2. **Claude-dev (yo)** entrego un **PROMPT/checklist autocontenido** para la extensión Chrome (qué recorrer,
   qué observar, qué reportar como "observabilidad": consola, network, DOM, respuestas, estado).
3. La **extensión Chrome** ejecuta + emite el reporte de observabilidad.
4. **Dueño** pega el reporte aquí → **yo tomo acciones** (caza-bugs → fix → re-validar).

## Salida esperada de la sesión nueva
- Decidir la forma: **skill** (`validacion-live-chrome`) que genere el prompt/checklist + protocolo de relevo,
  ± **workflow**. Portable ×4 cerebros (carpeta `skills/` de cada repo + `~/.claude/skills/`).
- Documentar cómo se dispara, el formato del prompt a la extensión, y cómo se relevan los resultados.
- Conecta con: `caza-bugs` (camino vivo) · `verification-before-completion` (evidencia, no opinión) ·
  `proceso-decision-fuerte` paso 7 (gate empírico con pruebas de estado en navegador REAL) · `anti-codigo-muerto`
  (validar que lo nuevo no dejó lo viejo roto en vivo — los botones→Free Core son el caso testigo).

## ⚠️ Disparador exacto (el dueño lo dirá en la sesión nueva — al verlo, retomar este brief)
> "HAY UNA FUNCION TUYA QUE ES UNA EXTENSION EN CHROME Y ES ALGO QUE ME GUSTARIA QUE ADAPTARAMOS PARA HACER
> PRUEBAS LUEGO DEL MERGE QUE LOS CAMBIOS YA ESTEN EN VIVO EN LA WEB, LE LANZAMOS UN PROMPT A LA EXTENSION DE
> CLAUDE EN CHROME Y QUE EL HAGA TODAS LAS VALIDACIONES. ME GUSTARIA QUE ESTO ESTUVIESE EN TODOS LOS CEREBROS DE
> TODOS LOS PROYECTOS … PRUEBE EL BOT CUANDO SE ESTA LOGUEADO Y CUANDO NO … FINALIZA CONVERSACION … LA EXTENSION
> EMITE UN CONCEPTO DE OBSERVABILIDAD Y YO TE PASO SU RESPUESTA ACA Y TU TOMAS ACCIONES … LAS SKILLS NUEVAS …
> AÑADIRLA A TODOS LOS PROYECTOS … E INSTALARLA EN CLAUDE … ME MENCIONAS LA LISTA …"
