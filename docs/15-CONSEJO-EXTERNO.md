# 🛰️ 15 — CONSEJO EXTERNO (red team multi-modelo · Antigravity/Gemini)

> **Nodo neuronal: protocolo operativo.** Define CUÁNDO y CÓMO pedir una crítica
> adversarial a un modelo externo (Gemini vía **Antigravity**, IDE de pago del cliente)
> antes de una decisión fuerte. NO se auto-carga; su EXISTENCIA está flagueada en
> `CLAUDE.md §0` (tabla de nodos) para que cada arranque sepa que Antigravity existe.
>
> **Disparador (Trigger de Decisión Fuerte)**: antes de una decisión **cara de revertir**.
> Acordado 2026-06-03 (el cliente tiene Antigravity con tiers Flash + Pro).

---

## §1 — Qué es y por qué lo tenemos

Antigravity da acceso a **Gemini** como **segunda opinión adversarial**. El valor NO es
"Gemini piensa por mí" — es **diversidad de sesgos**: Claude y Gemini fallan en cosas
distintas, así que un crítico de otra familia atrapa puntos ciegos. (Mismo concepto que la
skill `llm-council` del repo, pero con humano en el medio.)

**Humano en el medio (clave)**: yo marco la decisión → el cliente corre el prompt en
Antigravity → me pega la respuesta → **yo la evalúo como peer review** (adopto lo correcto,
refuto con razones lo que esté mal). NUNCA me subordino a Gemini; es insumo, no oráculo.
**Antigravity SOLO asesora — NUNCA edita el repo (§6); el que decide/delibera/implementa soy YO.**

---

## §2 — Cuándo consultarlo (y cuándo NO)

**SÍ (vale la fricción + tokens):**
- 🏛️ **Arquitectura / modelo de datos** cara de revertir (ej. esquema CRM, colecciones Firestore, límites de módulos).
- 🔀 **Fork 50/50**: estoy genuinamente dividido entre 2+ enfoques viables (te aviso explícito).
- ⚠️ **Operación irreversible/destructiva** (migraciones, refactor masivo, borrados de datos/estructura).
- 🔒 **Seguridad / legal** (Ley 1581, Firebase rules, manejo de secrets).
- 🤔 **Incertidumbre** tuya o mía que quiera un desempate.

**NO (no malgastar tokens):**
- Trabajo rutinario, mecánico o **reversible** (fixes con RCA claro, edits triviales).
- **Hechos/código de NUESTRO repo** → **vía Antigravity, Gemini SÍ ve el código y el cerebro locales (solo-lectura), como Claude Code** → PUEDE verificar hechos del repo y revisar código/reglas reales. El motivo de NO usarlo en lo rutinario NO es que alucine, sino que **el esfuerzo manual del dueño + los tokens no se amortizan** cuando el comité interno (code-aware, automático) ya basta. Aun así **verifico YO** sus afirmaciones (RCA §19) — es insumo, no oráculo.
- Cuando los **tokens estén bajos** → guardarlos para lo grande (§5).

---

## §3 — Selección de modelo (yo decido; cliente delegó 2026-06-03)

**Principio rector: el costo del modelo escala con el costo de equivocarse (reversibilidad).**

| Modelo (Antigravity) | Cuándo lo elijo | Por qué |
|---|---|---|
| **Gemini 3.1 Pro (High)** | Decisión TOP: arquitectura/modelo de datos caro de revertir, seguridad/legal, op irreversible, fork duro | Máxima profundidad de razonamiento; el costo se justifica |
| **Gemini 3.1 Pro (Low)** | Decisión importante pero acotada; 2ª opinión sólida sin gastar al máximo | Razonamiento Pro a menor costo |
| **Gemini 3.5 Flash (High)** | Sanity-check rápido, "¿se me escapó algo obvio?", generar alternativas, crítica ligera | Rápido y barato; diversidad sin quemar presupuesto |
| **Gemini 3.5 Flash (Medium/Low)** | Gut-check trivial, o **fallback** cuando los tokens Pro están agotados | Gasto mínimo, solo un ángulo distinto |

Regla simple: **irreversible/caro → Pro (High)** · **importante/acotado → Pro (Low)** · **rápido/barato → Flash**.

---

## §4 — Mecánica del consejo

1. **Marco la decisión** como 🛰️ "vale Antigravity" + elijo el modelo (§3) + te entrego un **prompt autocontenido** (Gemini no tiene memoria entre sesiones, pero **Antigravity abre los archivos reales del repo → el prompt apunta a rutas/archivos, no se pega el código a mano**).
2. **Anti-anclaje**: en las decisiones TOP, **fijo MI postura primero** y la omito del prompt; así Gemini no me ancla y comparo después. En las ligeras, el orden no importa.
3. Me pegas la respuesta → la trato como **peer review**: adopto lo correcto, **refuto con razones** lo erróneo, **sintetizo** una postura más fuerte, y te digo explícito **qué cambié y qué descarté**.
4. **El resultado** (decisión final + qué aportó/cambió Gemini) queda en el **ADR/lección** correspondiente → el cerebro recuerda el porqué.

### Plantilla de prompt (autocontenido)
```
[CONTEXTO] Proyecto: <1-2 frases>. Stack: <relevante>.
Decisión en juego: <qué se decide y por qué importa>.
Opciones: A) <...>  B) <...>
Restricciones: <costo / irreversibilidad / plazo / etc.>
[TAREA] Actúa como crítico adversarial. No me complazcas.
1) ¿Qué modos de fallo o riesgos NO estoy viendo?
2) ¿Qué opción es más robusta y por qué?
3) ¿Qué evidencia o pregunta cambiaría la decisión?
Sé concreto y breve.
```
(En decisiones TOP NO incluyo mi postura tentativa — anti-anclaje §4.2.)

---

## §5 — Degradación por tokens (no son infinitos)

- **Pro agotado** → bajar a **Flash (High)** para una toma más ligera (mejor algo que nada).
- **Todo agotado** → **sigo solo** y **marco** que la decisión NO tuvo revisión externa (bandera para revisarla si luego molesta).
- Nunca bloquear el avance esperando tokens: el consejo es un acelerador de confianza, no un requisito.

---

## §6 — Límites duros

- 🚫 **Antigravity NUNCA edita el repo.** Es un IDE agéntico (PUEDE editar), pero aquí es **consejero externo de SOLO-LECTURA**: se le pasan únicamente prompts de **CRÍTICA** (preguntas/hallazgos), JAMÁS tareas de implementación. **Quien DECIDE, DELIBERA (triaje L-34) e IMPLEMENTA (edita/commitea/pushea) soy YO** (Claude), conforme a los hallazgos del comité + Antigravity. Ellos DEBATEN/aportan; yo resuelvo. (Recidiva 2026-06-19: entregué un *mensaje de commit* suelto que, al pegarse en Antigravity, le abrió la puerta a editar en paralelo — la corrección §2 "Claude commitea+pushea, sin mensajes sueltos" cierra ese conducto.)
- **Vía Antigravity, Gemini SÍ ve** nuestro código/cerebro (solo-lectura) → **PUEDE verificar hechos del repo y revisar código/reglas reales**. Lo único que NUNCA hace es **escribir** (ver el límite de arriba: no edita/implementa/commitea).
- Es **insumo de juicio**, no autoridad: una crítica de Gemini que esté mal **se refuta**, no se acata.
- Si el protocolo lleva tiempo sin usarse y no aporta, **revisarlo** (Reflejo de Desafío Crítico §G.4) — un protocolo muerto es deuda.

## Refinamiento — pase adversarial de Gemini (2026-06-21)

Se corrió el protocolo SOBRE sí mismo ("¿ampliar el uso del consejo externo?"). Gemini (code-aware vía Antigravity) convergió con el comité interno: **NO ampliar los triggers** (ya cubren seguridad/dinero/arquitectura). En su lugar, 4 refinamientos de CÓMO se usa:
- **R1 · Anti-anclaje fuerte**: en decisiones TOP, preferir pasarle el problema CRUDO en paralelo (igual que al comité interno), no un artefacto ya pulido por Claude (dispara su sesgo de confirmación). Si revisa código de Claude, incluir SIEMPRE las opciones DESCARTADAS/callejones + las invariantes a cumplir → que cace el fallo en la LÓGICA, no que apruebe la sintaxis.
- **R2 · Alcance**: su revisión INCLUYE razonar modos de fallo *runtime-natured* visibles en código estático (race conditions, optimistic-locking, colisiones de transacción, desacoples de contrato cross-artefacto). NO es un linter de sintaxis. Frontera real: "se halla LEYENDO+RAZONANDO (sí consejo externo) vs solo EJECUTANDO (tests/caza-bugs)".
- **R3 · Límite duro**: la revisión externa es ADITIVA, **NUNCA sustituye** los tests (emulador/E2E) ni el gate de staging/aprobación. Un LLM revisando reglas no supera a un unit test → evita la falsa seguridad pre-prod.
- **R4 · Fricción alta**: consultar SOLO en refactores ESTRUCTURALES de dinero/seguridad o NUEVAS arquitecturas de reglas — NO como peaje pre-deploy rutinario (un gate rutinario se abandona → protocolo muerto).

> Decisión + deliberación completa → ADR cars §224(.8) + bóveda `2026-06-21-consejo-externo-cobertura-SINTESIS.md`. Convergencia independiente comité-interno↔Gemini (señal fuerte). El mayor ROI del consejo externo se desbloqueó al CORREGIR su error factual ("no ve código"), no al ampliar triggers.
