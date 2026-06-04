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
- **Hechos/código de NUESTRO repo** → Gemini no ve el código ni el cerebro; alucina. Eso lo verifico YO leyendo código (RCA §19). Gemini solo sirve para **juicio/estrategia/tradeoffs**.
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

1. **Marco la decisión** como 🛰️ "vale Antigravity" + elijo el modelo (§3) + te entrego un **prompt autocontenido** (Gemini no tiene memoria de nuestro trabajo → todo el contexto va en el prompt).
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

- Gemini **no ve** nuestro código/cerebro → todo contexto va en el prompt; **jamás** usarlo para verificar hechos del repo.
- Es **insumo de juicio**, no autoridad: una crítica de Gemini que esté mal **se refuta**, no se acata.
- Si el protocolo lleva tiempo sin usarse y no aporta, **revisarlo** (Reflejo de Desafío Crítico §G.4) — un protocolo muerto es deuda.
