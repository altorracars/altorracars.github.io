# 🏛️ Comité de Revalidación PRE-PASO-1 — VEREDICTO (síntesis de deliberación)

> **Tipo**: Síntesis del Comité de Expertos ×3 (revalidación del plan v5 + meta-arreglo, ANTES de ejecutar PASO 1).
> **Meta**: 33 agentes · 4.23M tokens · 317 tool-uses · ~40 min · 2026-06-09. 5 expertos (Arquitecto-Conocimiento,
> Ingeniero-Plataformas, Guardián-Integridad, Gobernanza-Meta, Economía-Contexto) × 3 rondas + peer-review anónimo + presidente.
> **Deliberación (ancla canónica — dogfood del nuevo Reflejo de Captura §G.4):**
> CRUDO → `docs/superpowers/research-archive/2026-06-09-comite-revalidacion-paso1-deliberacion.json` (494KB, parsea OK) ·
> SÍNTESIS → este archivo.
> **Gatillo**: el cliente pidió revalidar porque "el cerebro no fue tan eficiente" (documentación inicial de cierre escasa).

---

## 0 — VEREDICTO

**PARCIALMENTE CORRECTO, NO SUFICIENTE como está escrito** para "continuar sin errores". El plan v5 + meta-arreglo
(A/B/C) son **direccionalmente correctos**, pero el comité verificó **en disco** defectos que harían que el próximo
Claude rompa la invariante #1 (cero-pérdida) o construya gates-teatro. **La falencia del cliente está confirmada y
operando en los propios docs de estado**: el HANDOFF/§D declara "PASO 0 hecho" incluyendo gates de KERNEL que **no
existen en el código** (`brain-check.mjs` solo tiene los 6 checks base; cero lógica de hash/pureza/cobertura/diff/fixtures).
PASO 1, tal como está, correría **sin ninguna red automática de no-pérdida**.

---

## 1 — Lo ADOPTADO (correcto; se incorpora al plan)

- **PASO 0 está PARCIAL, no hecho** (FATAL). Reclasificar honestamente: linter base + manifest-de-caps ✅; maquinaria de
  KERNEL/gates ❌ (vaporware). Reescribir HANDOFF/CHECKLIST en tiempo futuro/condicional para los gates no construidos
  ("se DEBERÁ construir", no "el gate FALLA si").
- **El meta-arreglo (B) como lo describí es inimplementable** (FATAL). Grep de "comité/Gemini/workflow" sobre prosa = 158
  hits históricos → 150+ falsos positivos. Escanear `✅` del nodo 10 → las tareas cerradas se borran por GC (falsos
  negativos). **Forma viable = PRESENCIA-DE-ANCLA prospectiva** (nunca retroactiva): línea canónica `Deliberación:
  <crudo> · <síntesis>`; el check dispara solo donde el ancla existe y la ruta NO resuelve (clon del check 5c ya
  shippeado). Partir en **B1** (presencia, --full, prospectivo) + **B2** (orfandad-de-grafo: readdir recursivo + BFS desde
  nodos de ruteo; subsume el check #1 actual).
- **Frontera honesta MECANIZABLE vs IRREDUCIBLE**: (B) detecta **AUSENCIA** de captura, jamás **FIDELIDAD**. Etiqueta
  literal obligatoria en `manifest.gates[]`: `"heurística-de-presencia: detecta AUSENCIA, NO FIDELIDAD"`. La fidelidad
  ("¿una sesión fresca re-tomaría la decisión leyendo SOLO la síntesis?") va a **rúbrica binaria del Comité #2** (C).
- **El átomo del gate de no-pérdida es el BULLET, no el span `### `** (FATAL). Los 10 (cars)/11 (bersaglio) reflejos de
  §G.4 viven bajo UN header → hashear el span ve "G.4 difiere" pero no enumera QUÉ reflejo falta (el extra de bersaglio =
  "Catalogación de Skills"). Cierre de unión = **biyección {slug,hash}**, no `count ≥ 11`.
- **Aparear por SLUG SEMÁNTICO, jamás por número §** (FATAL). cars §3.6 = Bot-Hub vs bersaglio §3.6 = arquitecto:
  ortogonales; unir por número FUSIONA contenido no relacionado. Producir una **tabla de mapeo slug→(cars§, bersaglio§,
  decisión)** como artefacto antes de tocar archivos.
- **§3 está entrelazado portable/instance línea-a-línea**: la frontera de extracción corta DENTRO de §3. Bajar
  granularidad a **párrafo/bullet**; reescribir cada cita INSTANCE (§17/§35/§111-114/M-NN) a prosa **auto-contenida**.
  Criterio de cierre: en el bloque KERNEL final `grep §[0-9]` = 0 Y `grep M-[0-9]` = 0.
- **El gate de boot es TEATRO hoy** (verificado): `console.log "↗ DESTILAR"` sin `problems++` → exit 0 "CEREBRO SANO" con
  boot 44% sobre objetivo. Regla de gobernanza vinculante: **todo gate nace con `classification` en `manifest.gates[]`**
  {error | fail-boot | informativo}; prohibido el patrón "↗ que parece falla pero no toca exit-code".
- **Unión BIDIRECCIONAL** (cars ∪ bersaglio), no canon→cars ciego: cars editó §G in-place; ningún reflejo de cars que NO
  esté en bersaglio puede caerse, y viceversa. Set-union, conflictos a mano, "más maduro gana" registrado.
- **research-archive es huérfano de 2º orden**: está apuntado, pero solo desde specs/checklist que **no son nodos de
  ruteo** (no §0, no 00-INDICE, no auto-cargados). Conectividad debe definirse sobre el **grafo de ruteo**, no "cualquier
  referencia textual" (un check ingenuo daría falso-verde).

## 2 — Lo REFUTADO (con razón verificada; NO me subordino al consenso)

- **"El check #1 de orfandad es una lista hardcodeada"** (Aporte C, finding "alta") → **FALSO, verificado en disco**
  (`brain-check.mjs` L79 = `readdirSync` + filtro por patrón `/^\d{2}-.*\.md$/`, sin array). El fix de C (readdir
  recursivo + BFS) sí es correcto; el diagnóstico se corrige. **Meta-lección**: C violó §3.3 (describió mal el código que
  dijo leer) — registrada.
- **"Cementar idPattern permanente en el manifest"** (mayoría de peers) → refutado por la minoría y adoptado a su favor:
  para **21 bullets en 2 archivos de UN evento único**, un `idPattern` permanente es el "segundo cerebro de metadata" que
  §170 rechaza. Basta el **inventario {slug,hash} efímero** + diff de sets.
- **"Cierre de unión = count ≥ 11 + lista explícita"** (mayoría) → refutado: `count` es satisfacible con un near-duplicate
  que enmascara un drop genuino. Cierre real = **biyección {slug,hash}** bidireccional.
- **"(B) convierte honor-system en determinista / cura la falencia"** → refutado: vender PRESENCIA como si cubriera
  FIDELIDAD es el M-10 (teatro de proceso) que la falencia original encarna. (B) cubre solo la sombra mecánica.

## 3 — Cómo implementar SIN errores (secuencia ORDER, cada gate previo bloquea)

- **ORDER -1** (prerrequisito barato, ANTES de todo): leer `.claude/settings.json` → **¿el SessionStart re-inyecta el
  stdout del hook como `additionalContext`, o es solo side-effect?** Decide si §G puede delegarse al hook o debe quedar
  como resumen-ancla en el CLAUDE.md auto-cargado. **Nadie lo había verificado y es premisa de toda la arquitectura del ancla.**
- **ORDER 0** (red de seguridad): `git bundle --all` de los 3 repos a carpeta FUERA de los repos + `git bundle verify` +
  **ensayo de restauración a clon limpio** (gate, no paso; diff CRLF-normalizado). Script EFÍMERO pure-Node (borrado tras
  PASO 1) → inventario JSON {id-semántico, slug, repo, texto-CRLF-norm, hash, KERNEL|INSTANCE, destino} + censo de TODAS
  las anclas §NN/M-NN/L-NN (def Y cita) por repo.
- **ORDER 1**: reconciliar la aritmética del boot (ver callejón #C abajo): `bootCharsTarget = round(Σcaps[alwaysOn] ×
  factor)` (función, no número mágico); UN solo techo; ADR + manifest + plan en EL MISMO commit.
- **ORDER 1.5**: extender manifest con `gates[]/classification/since` + `routingNodes[]` + `orphanAllowlist[]`; refactor del
  linter a leer severidad del manifest; migrar el gate de boot a `informativo` explícito.
- **ORDER 2**: medir baseline del harness (honestidad costo-beneficio; NO bloquea — la extracción de §G está FORZADA por
  el cap del archivo CLAUDE.md, no por economía de boot).
- **ORDER 3**: decidir+probar el ANCHOR (camino EMBEBIDO: §G detalle → `00-KERNEL.md`; resumen-ancla entre sentinelas
  `<!--KERNEL:START/END-->` en CLAUDE.md; check de prefijo-exacto normalizado + `kernelAnchorMaxChars:1200`; ship atómico).
- **ORDER 4**: tabla de mapeo por slug a nivel bullet/párrafo; clasificar INSTANCE (Bot-Hub, Cloudflare, §3.1/3.2/3.5) y
  dejarlas locales; reescribir citas INSTANCE a portable.
- **ORDER 5**: unión bidireccional en bersaglio, atomizando §G.4/§3.x a `#### G.4.x` EN EL DESTINO; materializar el Reflejo
  de Captura (A) — nace en el KERNEL.
- **ORDER 6**: verificación de cierre = biyección {slug,hash} + delta enumerado + `grep §/M = 0` + censo de anclas sin
  colgantes ni cuerpos-huérfanos + `brain:check --full` SANO.
- **ORDER 7** (independiente, cero-coste, **VICTORIA BARATA que valida el enfoque y CURA la falencia hoy**): conectar
  research-archive con fila en 00-INDICE + puntero desde un **nodo de ruteo** + implementar B2 y correrlo para probar
  alcanzabilidad.
- **ORDER 8**: **destilar el nodo 10** (17.4k/16k chars, 38% del boot) — la VERDADERA palanca de economía, mismo arco, no diferida.
- **ORDER 9**: solo entonces B1 (presencia-de-ancla) + régimen estacionario `brain:pull` unidireccional.

## 4 — 🚫 CALLEJONES SIN SALIDA PROBADOS / QUÉ NO HACER (lo que más ahorra al próximo Claude)

- **NO extraer §G del CLAUDE.md vivo** hasta verificar el contrato de re-inyección del hook (ORDER -1). Si el stdout NO se
  re-inyecta, "el hook imprime el ancla" es **premisa falsa** → la gobernanza DESAPARECE del boot = la falencia en su
  forma más severa. Fallback seguro = camino EMBEBIDO.
- **NO basar (B) en grep de "comité/Gemini/workflow" sobre prosa** → 158 hits históricos = 150+ falsos positivos (alarm fatigue).
- **NO escanear `✅` del nodo 10** para detectar cierres → las tareas cerradas se BORRAN por GC (falsos negativos) y los
  `✅` residuales son prosa de granularidad arbitraria (falsos positivos). Usar **presencia-de-ancla prospectiva**.
- **NO hashear el span `### G.4`** como átomo de no-pérdida → la pérdida asimétrica de un reflejo es invisible. Átomo = bullet.
- **NO aparear §3.6/§3.7 por número** entre repos → colisión semántica → fusión de contenido no relacionado.
- **NO añadir `execSync`/git al `brain-check.mjs` canónico** → rompe byte-identidad (PASO 0) + timeout de boot (30s). La
  maquinaria de migración (hash/diff/bundle) va a un **script efímero**, cuarentenado tras PASO 1.
- **NO confiar en gates que no existen** → PASO 0 PARCIAL; los gates de cobertura/diff/pureza son vaporware HOY.
- **NO cementar `idPattern` permanente** para 21 bullets de un evento único → "segundo cerebro de metadata".
- **NO declarar "boot optimizado" tras extraer §G** → el ahorro es **marginal** (el harness inyecta un múltiplo del cerebro;
  el manifest es aritméticamente imposible: Σcaps 45k > target 31.5k). La extracción de §G está forzada por el **cap del
  archivo CLAUDE.md** (24.3k/25k, ~2 líneas del tope de líneas), no por economía. La palanca real = destilar el nodo 10.
- **NO atomizar los reflejos in-place en el CLAUDE.md vivo** → está al cap; la re-estructuración a `#### G.4.x` se hace en
  el destino `00-KERNEL.md`.
- **NO vender (B)/(C) como "determinista que cura la falencia"** → solo cubren la sombra mecánica; la fidelidad es juicio humano.

## 5 — Reframe estratégico (lo que "se les escapó a TODOS", consolidado de peer-reviews)

La cura **mínima y suficiente** de la falencia real ("se documentó tarde/escaso y el crudo quedó desconectado") son **3
acciones de riesgo-cero, INDEPENDIENTES de PASO 1**: (i) la línea-ancla `Deliberación:` en los ADR de cierre; (ii)
**conectar los 3 JSON de research-archive HOY** (fila en 00-INDICE + puntero desde nodo de ruteo); (iii) síntesis con
campo obligatorio "callejones-sin-salida-probados". Todo lo demás (extraer §G, 00-KERNEL, hook, diff-por-ID, unión
bidireccional, reconciliar 3 techos de boot, brain:diff/pull) es la **iniciativa SEPARADA del cerebro multi-proyecto**
(ADR §170), que PASO 1 acopla. **Acoplar la cura de la falencia a un refactor de gobernanza de 8 pasos con FATALes
abiertos es, en sí mismo, teatro de proceso.** Recomendación del comité: **desacoplar** — ejecutar la cura barata + el
arreglo del gate-teatro de boot YA, y gatear la cirugía del KERNEL detrás de ORDER -1 (hook) + inventario + sandbox.

## 6 — Integración de la 2ª opinión externa (Gemini 3.1 Pro, 2026-06-09)

> Gemini red-teameó con acceso a los 3 repos. Protocolo `docs/15`: adoptar lo correcto, refutar con razón, NO subordinarse.

**CONVERGENCIA (ALTA CONFIANZA — comité interno + Gemini coinciden, llegando por separado):**
- **Q1** — el ahorro de ~15k chars NO justifica la complejidad permanente de sincronización = optimizar ruido (el harness inyecta un múltiplo no-controlable). "Hipoteca arquitectónica permanente para un ROI marginal."
- **Q2** — enforcement determinista local sin CI = **"teatro de seguridad"**; el punto de no-retorno es el push; el choke-point real llega con el build step de Cloudflare.
- **Q4 (riesgo no estimado) = CONTAMINACIÓN DE DOMINIOS.** Gemini verificó leyendo ambos `CLAUDE.md`: el §3 de cars (Firebase v11 / anti-MutationObserver / Bot-Hub) y el de bersaglio (Vite / GSAP / editorial) **NO son agnósticos**; una extracción mecánica del "KERNEL" crearía un **monolito tóxico** que inyecta contexto de carros en joyería. → Es el MISMO FATAL del comité (§3 entrelazado portable/instance; aparear por slug, no por número).
- **Q5** — **Opción B ahora → Opción C después.** Opción A (sync P2P de hashes) = sobreingeniería.

**REFUTADO (con razón verificada — NO me subordino):**
- **Q3 — junctions NTFS (`mklink /J`) + gitignore del KERNEL → NO.** Misma refutación que plan v5 **R2** + spec §170 L40 (verificada): un junction **no se versiona y se rompe en clon nuevo** (huérfano); gitignorar el KERNEL lo saca de control de versión → **viola la invariante dura cero-pérdida** (máquina/disco nuevo = pérdida total de la gobernanza compartida). Además **la propia Opción C de Gemini (template/generator git-committed) hace el junction innecesario** — Gemini se contradice; gana C.

**REFINAMIENTO (adopto C, ajusto el mecanismo):** Opción C (template/generator, SSOT unidireccional, `brain:update-kernel` sobrescribe local desde canon) = la dirección correcta, PERO el mecanismo = **copia-de-disco** del working-tree de bersaglio (offline, 3 repos locales), NO pull HTTP de GitHub `main` (evita dependencia de red — delta D5 de la 1ª ronda, verificado).

**MATIZ sobre el "shard §3" de Gemini (Q5.2):** válido para aliviar el cap del archivo, PERO §3 es doctrina **always-on operativa** (el agente la necesita CADA sesión: "no `transition:all`", anti-MO). Shardearla a on-demand arriesga que el agente no la siga. Lever más seguro primero = **destilar el nodo 10** (WIP, no doctrina, comité); si §3 debe encoger, dejar resumen terso always-on + detalle on-demand, no sacarla entera.

**PLAN UNIFICADO (comité + Gemini convergentes):**
1. **Cura de la falencia** — convención de enlace de deliberación + research-archive conectado + síntesis con callejones. **(HECHO este turno.)**
2. **Economía LOCAL, sin acople cross-repo** — destilar el nodo 10 (libera boot); si hace falta, encoger §3 con resumen+detalle (no shard ciego).
3. **Arreglar el gate-de-boot-teatro + reconciliar la aritmética** (honestidad de enforcement; ORDER 1).
4. **PAUSAR el sync sincronizado del KERNEL (Opción A).** Aceptar divergencia menor de gobernanza (más barata que el acople forzado).
5. **Largo plazo (cuando exista el build step de Cloudflare): Opción C** template/generator unidireccional, git-committed, copia-de-disco. **NO junctions, NO P2P de hashes.**

**⚠️ Esto ENMIENDA el ADR §170** (que decidió "núcleo compartido 4-capas + `brain:diff` sincronizado"): el sync sincronizado se DIFIERE a favor de template/generator unidireccional + economía local primero. **Requiere ratificación del cliente + ADR de enmienda** antes de reescribir plan/handoff.

---

> **Estado de decisiones (actualizado tras Gemini):** ✅ contrato del hook (re-inyecta) · ✅ desacoplar (comité+Gemini) ·
> ✅ 2ª opinión Gemini (convergente) · ✅ topología (template/generator, no P2P, no junctions) · ⏳ **ratificación del
> cliente de la enmienda a §170** · ⏳ techo único de boot (ORDER 1) · ⏳ baseline del harness (medir, no bloquea).
