# 🔁 60 — WORKFLOWS REUTILIZABLES (catálogo de detección de inconsistencias/errores)

> **Nodo neuronal: catálogo de procesos.** Recetas **reutilizables** que detectan las MISMAS
> inconsistencias/errores una y otra vez, para no reinventar el proceso cada sesión y **mejorar la
> calidad sistemáticamente** (pedido de Daniel). On-demand: NO se auto-carga.
>
> **Cuándo leerlo (Trigger de Experiencia + Auditoría)**: ANTES de una revisión/auditoría/verificación
> o una op repetitiva ("voy a revisar reglas / un diseño / lo que dejó un subagente / si esto cumple").
> Los workflows ad-hoc que se repiten o demuestran valor se **registran aquí** (Reflejo de Captura §G.4).
>
> **Origen**: nodo reconciliado desde bersaglio (2026-06-25, ADR §251). **W-11 = SSoT del flujo fuerte
> del dueño** (mismo flujo ×4 cerebros; la skill `proceso-decision-fuerte` es su forma operativa).

---

## 🧭 Catálogo

| ID | Workflow | Cuándo usarlo | Qué detecta | Cómo se corre |
|---|---|---|---|---|
| **W-01** | **Red-team de reglas Firestore/Storage** | Antes de desplegar `firestore.rules`/`storage.rules` | Fugas de datos, escrituras no autorizadas, escalada de privilegios | Lentes que intentan ROMPER las reglas (escalada · lectura indebida · integridad) + tests del emulador (`functions/src/rules/*.test.js`) |
| **W-02** | **Auditoría de feature/panel por dimensiones** | Antes de moldear/construir una fase del panel | Gaps de UX, navegación/IA, lógica de dominio, escala/costo | Una lente por dimensión (UX · IA/navegación · dominio · escala/costo) → síntesis vs el norte (acotado) |
| **W-03** | **Red-team de diseño (lentes empresariales)** | Antes de congelar un diseño maestro caro de revertir | Supuestos frágiles, modos de fallo, sobre-ingeniería | Lentes (seguridad · costo · escala · datos · UX · mantenibilidad · negocio) atacan el diseño → síntesis |
| **W-04** | **Verificación post-subagente** | Tras delegar trabajo a un subagente | Que el subagente **alucinó** (dice que hizo algo que no quedó en el repo) | Releer los archivos/estado REALES y comparar contra lo reportado |
| **W-05** | **Testing de Cloud Functions (puro + integración)** | Antes de desplegar una CF | Bugs de lógica + glue del trigger | Separar **lógica pura** (test sin emulador) + **integración** (emulador real). Patrón vivo en `functions/src/**/*.test.js` + `*.emulator.test.js` |
| **W-06** | **Análisis crítico multi-agente (fan-out → síntesis)** | Pregunta/decisión que cruza varios temas independientes | Puntos ciegos, hechos no verificados, opciones no consideradas | N agentes ACOTADOS por sub-tema → sintetizar (L-50: inline+schema, sin tools, in-cwd) |
| **W-07** | **Comité de expertos ×3** | Mejorar cualquier entregable importante | Debilidades, errores, falta de profundidad | Skill `comite-expertos` (expertos por tema → debate → síntesis) |
| **W-08** | **Investigación profunda (grounded)** | Antes de afirmar hechos externos (legal, normativo, mercado) | Datos inventados o desactualizados | Skills `deep-research`/`legal-colombia` (fuentes primarias) + marcar lo no verificado `[a verificar]` |
| **W-09** | **brain:check (linter del cerebro)** | Al arrancar/cerrar sesión o tras tocar el cerebro | Huérfanas, caps, índice desync, refs colgantes, skills sin catalogar | `npm run brain:check` (`§G.4`) |
| **W-10** | **Caza-bugs: verificación del camino vivo end-to-end** | Al **TOCAR o ROZAR** un subsistema con estado observable (render · `onSnapshot` · CRUD · flujo) | Bugs que solo emergen en el camino COMPLETO desde estado-cero (sección no montada, lista vacía, 1er/último ítem) | Recorre las 2 fronteras del estado-cero (crear 1er ítem→¿aparece en vivo Y tras recarga? / borrar el último→¿colapsa limpio?); escala a maquinaria pesada SOLO si no-trivial. Skill `caza-bugs` (§3.8 / §G.4) |
| **W-11** | **🛡️ FLUJO FUERTE COMPLETO (SSoT del flujo del dueño)** | Decisión Fuerte (`15 §2`) **o** Diseño/UI no trivial | Que el flujo se aplique **A MEDIAS** (faltó mockup / prompt de consejo / prompt de Chrome / plugins) — la falla que reportó Daniel 2026-06-25 | Checklist CERRADO de 10 capas (↓). **Regla dura: cuando dispara, COMPLETO o NO se aplicó.** 3 artefactos visibles obligatorios. Skill `proceso-decision-fuerte` + [[feedback_flujo_completo_nunca_parcial]] |

---

## 🛡️ W-11 en detalle — el FLUJO FUERTE COMPLETO (ninguna capa es opcional cuando dispara)

> **Por qué existe:** el flujo del dueño (comité + consejo + extensión/Chrome + skills + agentes + **plugins** + **mockup**)
> vivía PARTIDO en varios nodos sin un checklist único → se aplicó a medias (sin prompt de Chrome, sin plugins, sin
> mockup). Este W-11 es la **SSoT**: si la tarea dispara el GATE, se recorren las 10 capas; saltarse una sin justificar = flujo roto.
> El ORDEN de los 6 instrumentos (evidencia→deliberación) → [[feedback_decision_fuerte_pipeline]].

**GATE (¿califica?)** — Decisión Fuerte (`docs/15-CONSEJO-EXTERNO.md §2`) **o** Diseño/UI no trivial. Trivial/reversible/mecánico → trabajo directo (`caza-bugs` si hay estado). Si dispara → COMPLETO.

1. **VERIFICAR** ground-truth: leer código/estado/datos REAL (§3.3). Sin esto las capas opinan sobre el aire.
2. **SKILLS** — invocar TODAS las relevantes: dominio (`crm-architect`/`cms-dinamico`/`legal-colombia`/`semantic-schema-aeo`/HUB-visibilidad…) + proceso (`arquitecto-software`, `caza-bugs`, `anti-codigo-muerto`) + **`frontend-design` si es UI** + medición (`ga4-lead-tracking`) si toca datos.
3. **ARQUITECTO** (6 pilares §3.8) → diseño candidato CONCRETO (+ "lo que NO verifiqué"). Separa PROPONER de CRITICAR.
4. **PLUGINS / MOCKUP** (la capa que faltaba) — según el tipo:
   • **SISTEMA VIVO → firebase MCP** (`firestore_query_collection`, `functions_get_logs`, `messaging`): leer datos/logs REALES, no inferir del código.
   • **DISEÑO/UI → MOCKUP** vía plugin de diseño: `visualize`/`show_widget` (rápido, inline, ideal reglas de layout) · Stitch/Canva/Figma. "Muéstrame cómo debe quedar" → yo **verifico/delibero** (no acato). [[feedback_flujo_diseno_mockup]].
   • **RESEARCH/EVIDENCIA → `deep-research`** + firecrawl/exa (estándares, precedentes).
5. **COMITÉ ×3 ACOTADO** (`comite-expertos`, agentes en paralelo, inline+schema, sin tools) — ≥1 escéptico + ≥1 ejecutor (L-50: acotado, no 30).
6. **CONSEJO EXTERNO** (`docs/15`, Gemini/Antigravity, **read-only**) — prompt autocontenido CRUDO (anti-anclaje R1). Humano en el medio; verifico cada afirmación (no oráculo).
7. **VEREDICTO** — yo delibero y decido; criterio de éxito definido ANTES de codear (`verification-before-completion`).
8. **IMPLEMENTAR.**
9. **EXTENSIÓN / CHROME — validación LIVE en navegador REAL** (`validacion-live-chrome` + Claude-in-Chrome; NO preview headless, L-08). ⭐ **Modo DIRECTO (default): YO conduzco la extensión** (`mcp__Claude_in_Chrome__*`; el dueño solo debe estar logueado) y entrego el **REPORTE** de la validación = la lista CERRADA de caminos estado-cero + borde que YO recorrí (reportando QUÉ recorrí, no "pasó"). **NO entrego un prompt de Chrome** salvo FALLBACK (extensión no conectada).
10. **CIERRE** (ADR `99` + fila `00` + lecciones `30` + cache `§4` si aplica + `brain:check`).

**🔒 Los 3 artefactos visibles al dueño (si falta uno, el flujo está INCOMPLETO):**
(a) **Mockup** del diseño (cuando es UI) · (b) **prompt de consejo externo** (Gemini, para que el dueño lo corra) · (c) **validación LIVE que YO conduzco** vía la extensión Claude-in-Chrome (entrego el REPORTE, NO un prompt; el prompt es fallback si no está conectada). Entregarlos SIEMPRE, sin que el dueño los pida.

---

## 🌱 Cómo crece este catálogo

- Cuando un proceso de revisión/detección **se repite** o demuestra valor (atrapó un error que se habría
  escapado), **regístralo aquí** con: disparador · qué detecta · cómo se corre.
- Recetas **accionables y cortas** (la receta, no la teoría); el detalle de un caso vive en su `30 §L-NN`/ADR.
- El reflejo always-on equivalente lo origina **cars-operador en `§G`** (L-31, escritor único del kernel/§G).
