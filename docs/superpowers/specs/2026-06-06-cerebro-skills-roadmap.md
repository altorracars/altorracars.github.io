# Roadmap — Capacidades del Cerebro: Legal, Arquitecto, Comité de Expertos, Workflows Anti-Error y Blindaje del CRM

> **Tipo**: Documento de Diseño / Roadmap. **Fuente de verdad** para construir, en sesiones futuras, cinco capacidades acordadas con el cliente.
> **Fecha**: 2026-06-06. **Autor**: Claude (arquitecto de información del cerebro Altorra).
> **Estado**: aprobado por el cliente; pendiente de ejecución por fases (ver §SECUENCIA al final).
>
> **Cómo usar este spec**: una sesión nueva que vaya a construir cualquiera de estas piezas
> arranca con el boot normal (`CLAUDE.md` + `05` + `10`), abre este documento y ejecuta la
> pieza correspondiente respetando su "dónde vive" y sus "guardarraíles". Nada aquí reinventa
> lo que YA existe (cada pieza lo declara explícitamente para no duplicar).
>
> **Principio rector transversal (anti-bloat)**: NO volcar cuerpos de conocimiento enteros
> (constituciones, leyes, manifiestos largos) dentro de una skill o neurona. Las skills
> guardan **método + guardarraíl + índice de fuentes**; el conocimiento Altorra-específico vive
> en su neurona/lóbulo; el detalle se lee on-demand. La frontera skill↔neurona es la de
> `40-LOBULOS §🌱`: skill = capacidad PORTABLE; neurona/lóbulo = conocimiento Altorra-específico.

---

## Tabla resumen (las 5 piezas)

| # | Pieza | Skill | Doctrina always-on (CLAUDE.md) | Lóbulo / neurona | Fase |
|---|---|---|---|---|---|
| 1 | Legal Colombia | `legal-colombia` (envuelve plugin `legal`) | SÍ — gate jurisdicción CO + fuentes primarias + revisión abogado | `42-LEGAL` (nace en Fase B/C) | B (+ lóbulo cuando haya hallazgos) |
| 2 | Arquitecto de software | `software-architect` (o adoptar `engineering:*`) | SÍ — "lente de arquitecto" compacto en §3 | `46-ESCALABILIDAD` (manifiesto completo) | A (doctrina+manifiesto) / B (skill) |
| 3 | Comité de expertos (mejorar x3) | evaluar `llm-council`; si no, `comite-expertos` | NO (on-demand, lo dispara el cliente) | apunta a `15-CONSEJO-EXTERNO` (4ª voz) | B |
| 4 | Workflows reutilizables anti-error | — | NO | linter `brain:check` + `.claude/workflows/` | A (1er workflow) / continuo |
| 5 | Revisión holística CRM + blindaje | `crm-architect` (ya existe) + workflow auditoría | NO | nace `41-SEGURIDAD` | C |

---

## 1 — LEGAL-COLOMBIA

### (a) Qué es
Una capa que obliga a que TODO trabajo legal de Altorra se razone dentro del **marco jurídico
colombiano**, contra **fuentes primarias oficiales**, y que **nunca publique** contenido legal
sin **revisión de un abogado colombiano** (gate humano). Responde al riesgo concreto de que los
plugins legales generalistas razonen derecho de otra jurisdicción.

### (b) Qué YA existe (no reinventar)
- Plugin **`legal`** (skills: `legal:brief`, `legal:compliance-check`, `legal:legal-response`,
  `legal:legal-risk-assessment`, `legal:review-contract`, `legal:triage-nda`, `legal:vendor-check`,
  `legal:meeting-briefing`, `legal:signature-request`) — razonamiento legal **general / sesgo EEUU**.
- **`legalzoom:review-contract`, `legalzoom:attorney-assist`** — idem, marco no colombiano.
- **`box:box-legal-workflows*`** (intake / contract / ma) — workflows legales genéricos.
- Lóbulo **`42` Legal/Compliance** ya está **reservado y descrito** en `40-LOBULOS-DOMINIO`
  (disparadores "audita legal", "Hábeas Data", etc.), hoy `🟢 vacío`.
- La skill **`crm-architect`** ya trae nociones de **Ley 1581 (hábeas data)** para el CRM.
- Neurona **`15-CONSEJO-EXTERNO`** lista "seguridad/legal (Ley 1581)" como Trigger de Decisión Fuerte.

> **El riesgo**: estos plugins, invocados a ciegas, pueden producir contenido jurídicamente
> incorrecto para Colombia (citan jurisprudencia/estatutos de EEUU) y, peor, publicarlo.

### (c) Decisión de diseño
**NO** se mete "toda la constitución / todas las leyes" en una skill (anti-bloat). Se parte en
**tres piezas complementarias**:

1. **Doctrina always-on** (CLAUDE.md): todo trabajo legal se **bloquea a jurisdicción Colombia**,
   se **verifica contra fuentes primarias oficiales** vía workflow/agentes, y **NUNCA se publica
   contenido legal sin revisión de abogado colombiano** (gate humano, no negociable).
2. **Lóbulo `42-LEGAL`** (neurogénesis con contenido REAL, no vacío) que captura los **hallazgos
   verificados** de cada auditoría legal: Habeas Data (**Ley 1581 de 2012** + Decreto 1377/2013),
   **Estatuto del Consumidor (Ley 1480 de 2011)**, **compraventa y garantía de vehículos usados**,
   y el flujo registral del vehículo: **RUNT, traspaso, SOAT, revisión técnico-mecánica, peritaje**.
3. **Skill `legal-colombia`**: **método + guardarraíl + índice de fuentes oficiales** (NO ley-dump)
   que **ENVUELVE** al plugin `legal` y lo **obliga** al marco colombiano, con **cita de fuente**
   primaria y **gate de revisión humana** antes de publicar.

> **Cómo se encadenan**: la skill es el "envoltorio" operativo (cómo invocar `legal` de forma segura);
> el lóbulo es la "memoria" de lo aprendido en Altorra; la doctrina es la "ley always-on" que ningún
> trabajo legal puede saltarse. Los tres apuntan a las **fuentes primarias** (no a la opinión del plugin).

### (d) Dónde vive
- **Doctrina** → `CLAUDE.md` §3 (nueva sub-doctrina compacta, p. ej. §3.8 "Trabajo legal = jurisdicción
  Colombia + fuente primaria + gate humano"), apuntando a la skill y al lóbulo.
- **Lóbulo** → `docs/42-LEGAL.md` (nace en Fase B/C con la primera auditoría real; registrar en
  `40-LOBULOS` cambiando `42` de `🟢 vacío` → `🟠 activo` + fila en `00-INDICE`).
- **Skill** → `skills/legal-colombia/` (SKILL.md = método + guardarraíl; `references/fuentes-oficiales.md`
  = índice curado de fuentes primarias, NO el texto de las leyes).

### Índice de fuentes oficiales (semilla — el detalle va en la skill, verificado al construir)
- **Habeas Data**: Ley 1581/2012, Decreto 1377/2013; autoridad: **SIC** (Superintendencia de Industria y Comercio).
- **Consumidor**: Ley 1480/2011 (Estatuto del Consumidor); autoridad: **SIC**.
- **Vehículos**: **RUNT** (registro/traspaso), **SOAT** (obligatorio), **revisión técnico-mecánica**,
  garantía mínima de usados, peritaje. Normas de tránsito (Ley 769/2002 y modificatorias).
- **Marco general**: Constitución Política de Colombia; Código Civil/Comercio (compraventa, vicios ocultos).
- ⚠️ Toda cita se **verifica contra la fuente oficial** al momento de usarla (las leyes cambian; no fiarse de memoria).

### (e) Riesgos / guardarraíles
- 🚫 **Nunca publicar contenido legal sin revisión de abogado colombiano** (gate humano duro).
- 🚫 **Nunca citar de memoria**: cada afirmación legal va con **cita de fuente primaria** verificada ese turno (doctrina §19).
- 🚫 No "ley-dump" en la skill: solo método + índice de fuentes (anti-bloat §G.5).
- ⚠️ El plugin `legal`/`legalzoom` se usa SOLO envuelto por `legal-colombia`; nunca crudo para contenido publicable.
- 🛰️ Decisiones legales caras de revertir → Consejo Externo (`15`), Gemini Pro (High) — pero Gemini tampoco es abogado: insumo, no oráculo.

---

## 2 — ARQUITECTO DE SOFTWARE

### (a) Qué es
Un **"lente de arquitecto"** que se aplica a cada trabajo de código, derivado del **manifiesto del
cliente** con **6 pilares**: (1) visión de negocio, (2) escalabilidad, (3) seguridad, (4) costos,
(5) mantenibilidad, (6) comunicación. Garantiza decisiones "right-sized" alineadas al stack y al
presupuesto $0 de Altorra.

### (b) Qué YA existe (no reinventar)
- Doctrina **§37 IAP** (Impact Analysis Previo: A archivos a modificar / B intactos / C código muerto /
  D refactor / E riesgos+rollback+tests) — ya es always-on antes de cada commit.
- Doctrinas **§3** (performance §17, HTML/CSS estable §17.4, verifica-no-asumas §19, anti-MutationObserver §35, migración §94).
- Lóbulo **`46` Arquitectura & Escalabilidad** ya `🟠 activo` (mandato arquitecto 2026-06-05),
  contenido en **`docs/46-ESCALABILIDAD.md`** (decisiones right-sized: serverless event-driven Firebase,
  cero monolitos, seguridad por diseño, costo $0).
- Skills genéricas candidatas: **`engineering:architecture`**, **`engineering:system-design`**,
  además de `superpowers:writing-plans`, `subagent-driven-development`, `systematic-debugging`.

### (c) Decisión de diseño
Tres piezas:
1. **Doctrina always-on compacta** en `CLAUDE.md §3` — el "lente de arquitecto" que se aplica en cada
   trabajo de código (los 6 pilares en forma de checklist breve), que **apunta** al lóbulo `46` y a la skill
   (NO repite el manifiesto entero en el router; eso violaría el tope de `CLAUDE.md`, §G.5).
2. **Manifiesto completo** en el lóbulo **`46-ESCALABILIDAD`** (los 6 pilares desarrollados + las
   decisiones right-sized del stack Altorra). Es la "memoria" del arquitecto.
3. **Skill `software-architect`** afinada al stack Altorra (**vanilla JS / Firebase / $0 / modular**):
   - **Evaluar PRIMERO** adoptar las genéricas `engineering:architecture` / `engineering:system-design`.
   - Si encajan tal cual → documentarlas como el recurso (no crear duplicado).
   - Si no (demasiado genéricas: asumen frameworks/bundlers/cloud de pago) → **crear** `software-architect`
     afinada, que parta del IAP §37 y los 6 pilares, con el contexto duro de Altorra (sin bundler, Firebase
     compat CDN, GitHub Pages, costo casi $0).

### (d) Dónde vive
- **Doctrina** → `CLAUDE.md §3` (sub-doctrina compacta nueva, p. ej. §3.8/§3.9 según numeración libre).
- **Manifiesto** → `docs/46-ESCALABILIDAD.md` (ampliar con los 6 pilares como cuerpo del lóbulo).
- **Skill** → `skills/software-architect/` (solo si las `engineering:*` no bastan).

### (e) Riesgos / guardarraíles
- ⚠️ No sobre-ingeniería: "right-sized" significa elegir lo más simple que cumpla; el lente de arquitecto
  no es excusa para añadir capas/bundlers/servicios de pago que rompan el $0 y el "sin framework".
- 🚫 No duplicar el manifiesto en `CLAUDE.md` (tope §G.5): el router solo lleva el checklist + punteros.
- ⚠️ Antes de crear `software-architect`, **leer** las `engineering:*` reales para no reinventar (anti-duplicación §G.4 / §🌱 de `40`).
- Las decisiones de arquitectura caras de revertir → Consejo Externo `15` (Gemini Pro High).

---

## 3 — COMITÉ DE EXPERTOS / "mejorar la respuesta ×3"

### (a) Qué es
Un mecanismo **on-demand** (lo dispara el cliente, nunca automático) para **elevar la calidad de la
última respuesta** mediante crítica multi-experto, con **ensamblaje DINÁMICO de expertos según el
tema** de esa respuesta y **3 niveles de intensidad**.

### (b) Qué YA existe (no reinventar)
- Skill **`llm-council`** (`anthropic-skills:llm-council`) — consejo de modelos/expertos.
- Skill **`asesor-critico-honesto`** (`anthropic-skills:asesor-critico-honesto`) — crítica honesta sin complacencia.
- El **motor de Workflows** (orquestación de subagentes en paralelo, ESTE entorno) con el patrón
  **judge-panel / verificación-adversarial** (N agentes que evalúan/cruzan crítica → síntesis); ya usado
  en las revisiones de fase del CRM (§164 de hecho).
- Neurona **`15-CONSEJO-EXTERNO`** — Gemini vía Antigravity como crítico de **otra familia de modelo**,
  con **humano en el medio** (Claude emite prompt autocontenido → cliente lo corre → Claude lo trata como peer review).

### (c) Decisión de diseño — el APORTE NUEVO
El aporte del cliente sobre lo existente es:
1. **Ensamblaje DINÁMICO de expertos** según el TEMA de la última respuesta (no un panel fijo): Claude
   elige las personas-expertas relevantes (p. ej. seguridad + UX + legal + perf) según el contenido a criticar.
2. **3 niveles de intensidad**:
   - **Nivel 1 — "mejórala un poco"**: refinamiento **inline** (el propio Claude pule la respuesta).
   - **Nivel 2 — "pensamiento crítico, asume que cometiste un error"**: **un agente crítico** (estilo
     `asesor-critico-honesto`) que busca activamente el error.
   - **Nivel 3 — comité completo** vía **Workflow**: **N personas-expertas en paralelo** que debaten /
     cruzan crítica → **síntesis** que produce la respuesta "×3".
3. **4ª VOZ = IA EXTERNA**: integrar la neurona **`15-CONSEJO-EXTERNO`** (Gemini vía Antigravity) como
   **cuarto integrante** del comité, con **HUMANO EN EL MEDIO**: Claude emite un **prompt autocontenido**
   → el cliente lo corre en Antigravity → Claude trata la respuesta como **peer review** (adopta/refuta
   con razones, sintetiza, y dice explícito qué cambió y qué descartó). Gemini = diversidad de sesgos, no oráculo.

**Camino de construcción**: **evaluar `llm-council` PRIMERO**; si encaja con el aporte (dinámico + 3
niveles + 4ª voz), **configurarla/documentarla**. Si no encaja → **crear skill `comite-expertos`** sobre
el **motor de Workflows** (paralelización real de subagentes + síntesis).

### (d) Dónde vive
- **NO** es doctrina always-on (es **on-demand**, lo dispara el cliente; no se infla el router con esto).
- **Skill** → `llm-council` (reconfigurada/documentada) **o** `skills/comite-expertos/` (sobre Workflows).
- **Apunta a** `15-CONSEJO-EXTERNO` para la 4ª voz (la mecánica humano-en-el-medio ya está documentada ahí; el comité la invoca, no la duplica).
- Registrar la decisión final como ADR + lección en `30` (cuándo usar nivel 1/2/3).

### (e) Riesgos / guardarraíles
- ⚠️ **On-demand estricto**: nunca disparar el comité por defecto (gasta tokens/tiempo); el cliente elige el nivel.
- 🚫 Gemini (4ª voz) **no ve el código ni el cerebro** → todo contexto va en el prompt autocontenido; **jamás** usarlo para verificar hechos del repo (límite duro `15` §6).
- ⚠️ El comité **no se subordina** a ninguna voz (ni Gemini ni un experto): es insumo de juicio; lo erróneo se refuta con razones.
- ⚠️ Verificar contra el **código real** las críticas que toquen hechos del repo (un experto puede marcar un "high" que al leer el código es falso positivo — ver pieza 4).
- Nivel 3 (Workflow) reservado para cuando la calidad lo justifique; nivel 1/2 cubren el 90% de los casos.

---

## 4 — WORKFLOWS REUTILIZABLES ANTI-ERROR

### (a) Qué es
Capturar, de forma **reutilizable**, las defensas anti-error que ya se usaron ad-hoc, en **dos capas**
según la naturaleza del chequeo: lo **mecánico** se automatiza; lo de **criterio** se guarda como workflow.

### (b) Qué YA existe (no reinventar)
- Linter **`brain:check`** (`scripts/brain-check.mjs`, `npm run brain:check`): hoy valida **4 categorías** —
  (1) neuronas huérfanas, (2) saturación de capacidad §G.5, (3) desync índice `00`→`99`, (4) frescura
  docs↔realidad (cache SW == cache-manager, `05` vigente == SW, `origin/main`). READ-ONLY.
- **Revisiones adversariales multi-dimensión** ya ejecutadas a mano por fase del CRM (correctness /
  regresión / seguridad-datos / a11y / CSV), p. ej. §164.
- Lección **M-10** (un fallo de chequeo debe ser **imposible de ignorar** → por eso se automatiza en el linter).
- El **motor de Workflows** del entorno + las skills `superpowers:requesting-code-review` / `code-review` / `verification-before-completion`.

### (c) Decisión de diseño — dos capas
- **(a) Lo MECÁNICO → ampliar `brain:check`**: cualquier chequeo determinista que hoy se hace a mano
  (y que un humano/LLM podría olvidar) se **codifica como regla del linter**, para que un fallo sea
  **imposible de ignorar** (lección **M-10**). Ejemplos candidatos: validar estados canónicos vs legacy
  (bug §8.2 del handoff), `node -c` de archivos tocados, consistencia de `read:`/`hasPermission` en rules.
- **(b) Lo de CRITERIO → guardar como workflows reutilizables** en **`.claude/workflows/`**: las
  revisiones adversariales multi-dimensión que ya se usaron (review de fase CRM) se formalizan como un
  workflow reutilizable con dimensiones fijas: **correctness, regresión, seguridad-datos, a11y, CSV/export**.
- **Meta-lección a capturar en `30-LECCIONES`**: *"verificar contra el código REAL para descartar falsos
  positivos"* — los reviewers (humanos, agentes o el comité) marcan hallazgos "high" que, al leer el código,
  resultan **falsos positivos**. La regla: ningún hallazgo se acepta sin confrontarlo con el código real (§19).

### (d) Dónde vive
- **Capa mecánica** → `scripts/brain-check.mjs` (nuevas reglas) — la neurona que lo describe es `CLAUDE.md §G.4` (Reflejo de Auto-auditoría) y `30-LECCIONES`.
- **Capa de criterio** → **`.claude/workflows/`** (directorio que **aún no existe** — se crea al guardar el primer workflow). Cada workflow es un archivo reutilizable invocable en sesiones futuras.
- **Meta-lección** → `docs/30-LECCIONES.md` (con disparador: "antes de aceptar un hallazgo de review/comité").

### (e) Riesgos / guardarraíles
- ⚠️ `brain:check` es **READ-ONLY**: las reglas nuevas reportan, **no** modifican (no romper esa invariante).
- ⚠️ No automatizar lo que es genuinamente de criterio (eso es workflow, no linter): la frontera es "¿es determinista?".
- 🚫 No aceptar hallazgos de review sin confrontar el **código real** (falsos positivos = ruido que erosiona la confianza en el proceso).
- ⚠️ Los workflows en `.claude/workflows/` deben ser **autocontenidos** (una sesión fría los ejecuta sin contexto previo).

---

## 5 — REVISIÓN HOLÍSTICA DEL CRM (clase mundial) + BLINDAJE

### (a) Qué es
Dos cosas que van juntas en Fase C:
1. **Revisión holística** del CRM contra el estándar de **las mejores empresas del mundo** ("¿cómo
   organizan su CRM los líderes? ¿qué nos falta?").
2. **Blindaje pre-lanzamiento** de seguridad (rate-limit en forms públicos + endurecimiento de la lectura RBAC).

### (b) Qué YA existe (no reinventar)
- Skill **`crm-architect`** (`skills/crm-architect/`, commit `6cc0055`, registrada en `40-LOBULOS §🌱`):
  trae **matriz de líderes** (Salesforce / HubSpot / Zoho), el **pack `references/verticals/automotive-dealership.md`**,
  RBAC + Ley 1581, schemas/Functions/rules listos para Firebase.
- El **handoff del CRM** (`docs/crm-handoff.md`) con el censo de canales, bugs, mapa de portal único y,
  clave, **§9.7** (endurecimiento RBAC/seguridad pendiente, surgido de la revisión adversarial §164).
- El **motor de Workflows** para auditoría multi-agente (pieza 4) + el comité de expertos (pieza 3).
- Lóbulo **`41` Seguridad** ya **reservado** en `40-LOBULOS` (`🟢 vacío`), disparadores "audita seguridad",
  "Firebase rules", "rutas sin auth".

### (c) Decisión de diseño
1. **Revisión holística** = invocar **`crm-architect`** (su matriz de líderes + el pack automotive) + un
   **workflow de auditoría multi-agente** (pieza 4) para responder, con evidencia, "cómo organizan el CRM
   las mejores empresas y qué le falta a Altorra". El output alimenta el plan de construcción del CRM.
2. **Blindaje pre-lanzamiento** (los 2 puntos de `crm-handoff §9.7`, holísticos del modelo Fase 1):
   - **Rate-limit en forms públicos**: `solicitudes` / `citas` / `subscriptions` están con `create: if true`
     (formularios públicos) → riesgo de spam (hoy solo acotado por `maxInstances:10` en las functions).
     Añadir rate-limit / validación.
   - **Endurecer lectura RBAC del canónico**: `contacts` / `leads` / `activities` / `deals` / `subscriptions`
     usan `read: if isAuthenticated() || hasPermission('crm.read')` → cualquier admin (aun sin `crm.read`)
     lee PII. Endurecer a `hasPermission('crm.read')` en **TODAS a la vez** (consistencia; no una sola para no romper).
3. De esta auditoría **NACE el lóbulo `41-SEGURIDAD`** con hallazgos REALES (no vacío): registra los 2 puntos
   de §9.7, su severidad, ubicación (`firestore.rules`) y la recomendación.

### (d) Dónde vive
- **Revisión holística** → output al **handoff del CRM** + plan/ADRs de construcción (§158+); marco analítico = skill `crm-architect`.
- **Blindaje** → cambios en `firestore.rules` (deploy MANUAL por Claude) + posibles Cloud Functions de rate-limit.
- **Lóbulo** → `docs/41-SEGURIDAD.md` (nace en Fase C; cambiar `41` de `🟢 vacío` → `🟠 activo` en `40-LOBULOS` + fila en `00-INDICE`).

### (e) Riesgos / guardarraíles
- ⚠️ **Endurecer RBAC en TODAS las colecciones a la vez** (no una sola): cambiar solo una rompe la consistencia del modelo (`crm-handoff §9.7`).
- ⚠️ Deploy de **reglas Firestore es MANUAL** (lo ejecuta Claude vía `firebase deploy --only firestore:rules`) — verificar que no se rompa el acceso del público (`create: if true` debe seguir funcionando para los forms).
- 🛰️ Cambios al **modelo de datos / RBAC** son caros de revertir → Consejo Externo `15` (Gemini Pro High) antes de comprometer.
- ⚠️ No romper el **puente público↔admin** (`comm-schema.js`) ni los forms públicos al añadir rate-limit (el público debe seguir pudiendo crear `solicitudes`/`citas`/`subscriptions`).
- ⚠️ La revisión holística produce recomendaciones; **confrontarlas con el código real** antes de aceptarlas (meta-lección pieza 4).

---

## SECUENCIA DE EJECUCIÓN (las fases)

> Orden acordado. Cada fase cierra con consolidación del cerebro (§G.4): ADR en `99` + fila en `00`,
> lecciones a `30`, `05`/`10` frescos, `brain:check` sano.

### Fase A — ✅ EJECUTADA (2026-06-06, cimientos sin skills nuevas)
1. ✅ **Doctrina del arquitecto** → `CLAUDE.md §3.8` "Lente de Arquitecto (always-on)" (6 pilares + punteros a `46` y skill `software-architect`). Se hizo hueco comprimiendo §3.6 (Bot, DIFERIDO).
2. ✅ **Manifiesto** → el lóbulo `46-ESCALABILIDAD` **YA lo contenía** (escrito 2026-06-05: tabla de 6 lentes + AD-1..AD-9 right-sized). Solo se añadió la tabla visual *monolito→por-componentes* + frases-faro (delta que el cliente enfatizó). NO se duplicó.
3. ✅ **Doctrina legal** → NO como `§3.9`, sino como **regla en el Trigger 🔵 de `CLAUDE.md §G.2`**: "Legal SIEMPRE = jurisdicción Colombia + fuentes primarias + nunca publicar sin abogado (skill `legal-colombia` + lóbulo `42`)". (Legal es trigger, no always-on — fija solo cuando hay trabajo legal.)
4. ✅ **Este spec** — fuente de verdad de las 5 piezas.
5. ✅ **Workflow reutilizable** guardado → `.claude/workflows/adversarial-review.js` (review multi-dimensión parametrizable por `args`) + meta-lección **L-34** "verificar contra el código real" en `30`. *(pieza 4 capa b)*

### Fase B — SKILLS (vía `skill-creator`, flujo §🌱 de `40-LOBULOS`)
1. **`legal-colombia`** — método + guardarraíl + índice de fuentes; envuelve el plugin `legal`. *(pieza 1)* + doctrina legal always-on en `CLAUDE.md §3`.
2. **`software-architect`** — solo si las `engineering:architecture` / `engineering:system-design` no bastan (evaluar primero). *(pieza 2)*
3. **Comité de expertos** — evaluar `llm-council` primero; si no encaja, crear `comite-expertos` sobre el motor de Workflows, con la 4ª voz (Gemini/`15`). *(pieza 3)*
> Cada skill: SKILL.md con `description` ≤ 1024 chars parseados (lo exige el uploader, §🌱), progressive disclosure, `references/` para el detalle, y registro en el lóbulo + `00-INDICE`.

### Fase C — REVISIÓN HOLÍSTICA CRM + BLINDAJE
1. **Revisión holística** del CRM con `crm-architect` + workflow de auditoría multi-agente (de Fase A/B). *(pieza 5)*
2. **Blindaje**: rate-limit en forms públicos + endurecer lectura RBAC del canónico (`crm-handoff §9.7`). *(pieza 5)*
3. **Nace `41-SEGURIDAD`** con los hallazgos reales del blindaje (registrar en `40-LOBULOS` + `00-INDICE`). *(pieza 5)*
> El lóbulo `42-LEGAL` también puede materializarse aquí si la auditoría legal (Fase B) produjo hallazgos concretos (Ley 1581 / 1480 / vehículos usados).

---

## Apéndice — Punteros del cerebro (para no re-investigar)
- Frontera **skill ↔ neurona/lóbulo** + flujo de neurogénesis de skills → `docs/40-LOBULOS-DOMINIO.md §🌱`.
- Registry de lóbulos (`41`..`48`, estados) → `docs/40-LOBULOS-DOMINIO.md`.
- Consejo Externo (Gemini/Antigravity, humano en el medio, selección de modelo) → `docs/15-CONSEJO-EXTERNO.md`.
- Estado real del CRM + §9.7 RBAC/rate-limit + canales de captura → `docs/crm-handoff.md`.
- Doctrinas always-on (§3, §17, §19, §35, §37 IAP) y gobernanza (§G) → `CLAUDE.md`.
- Linter de integridad → `scripts/brain-check.mjs` (`npm run brain:check`).
