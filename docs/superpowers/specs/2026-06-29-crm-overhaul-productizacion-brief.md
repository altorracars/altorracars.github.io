# BRIEF — CRM Overhaul + Productización (EPIC maestro) ⟦OPUS-4.8⟧

> **Fecha:** 2026-06-29. Origen: directiva del dueño (verbatim abajo). Modelo: Opus 4.8 ⟦rev-Fable⟧.
> **SSoT del epic.** Prioridad #1 — por encima de todo lo demás (TODO-26 facturación, web, etc. se subordinan/unifican a esto).
> Flujo gobernante: **W-11 (Decisión Fuerte + Diseño/UI no trivial) → COMPLETO o nada + 3 artefactos** (mockup · prompt Gemini · validación live Chrome).

## 🔒 DIRECTIVA PERMANENTE (MANDATO — no opcional, decisión del dueño 29/06)

**La visión de §1 DEBE cumplirse.** Este epic **NO se cierra** hasta que el panel admin/CRM **"respire" la visión**: que se sienta un programa de **alto nivel, top global, premium, intuitivo, multi-tenant** — NUNCA algo genérico/"hecho por IA". "Respirar la visión" es el **criterio de aceptación** de TODA fase y TODA sección.

**Modo de trabajo = ciclos `auditar → pulir → re-auditar → pulir`**, repetidos **hasta que respire**. ⚠️ Esto **NO es un `/loop` automático** ni un bucle de re-explicación de la visión (el dueño lo pidió explícitamente así): la visión **ya está escrita aquí, no se vuelve a pedir**. Es el **estándar de calidad permanente**: ninguna sección/fase se declara "lista" si aún tiene cortes, copy de desarrollador, look genérico, fricción de novato, gaps funcionales o cualquier falencia detectada. El próximo "yo" **hereda este mandato y sigue puliendo/auditando** sin re-consultar la visión.

## 1. Visión estratégica (lo que realmente se pide)

El CRM de Altorra Cars **NO es solo el panel de Altorra**: es el **producto base** de un negocio futuro — **vender CRMs a grandes empresas**. Por eso el de Altorra debe ser el **referente top global**, no "algo hecho por IA". Cada decisión (arquitectura, diseño, copy, flujo) debe pensarse para ser **multi-tenant / productizable** y de **calidad de las mejores plataformas del mundo**.

## 2. Mandato del dueño (objetivos)

1. **Gap funcional CRÍTICO (P0):** hoy el dueño **no puede borrar/depurar datos él mismo**. TODO lo que está en Bandeja, Pipeline, Agenda, Reportes (y demás) **son pruebas** y deben poder limpiarse. **Cada sección debe tener borrado/purga que SOLO el dueño (por rol) puede ejecutar** — sin depender de Claude. (Esto desbloquea además la limpieza de los `ZZZ PRUEBA`.)
2. **Reorganizar el CRM:** flujo demasiado complejo + diseño que no ayuda → hacerlo **más intuitivo, dinámico, fácil**. ⚠️ NO eliminar funcionalidad (no perder capacidades) — **mejorar/simplificar el flujo, estructura y organización**.
3. **Rediseño total del panel admin:** hoy el diseño es **terrible** (responsive, tecnología, diseño, organización). No se ve premium. Cada box/layout/texto/interfaz **diseñado a medida, con detalle**, pensando posición, función, intuición, armonía de color, responsive — guiado por las mejores plataformas del mundo y la mejor programación FE/BE. "El arquitecto de software piensa en TODO".
4. **Auditoría holística SIN LÍMITES:** comité + consejo (Gemini) + skills + agentes + **Claude Design** + **extensión Chrome** → **intentar ROMPER el CRM**: bugs, cuellos de botella, info errónea, seguridad, infraestructura, organización, diseño, responsive. Y pensar como un **asesor NOVATO** que entra por primera vez y recibe su primer negocio.
5. **Unificar** con todos los planes pendientes de la web, **pero priorizando este epic**.
6. **Validación live (Chrome) al final** debe también buscar errores, qué falta, mejoras a nivel holístico.

## 3. Ejemplos concretos del dueño (SOLO ejemplos — auditar TODO, no solo esto)

- Inventario de vehículos **se corta con el panel lateral izquierdo**; **no se puede hacer scroll** para ver más vehículos; **sobra mucho espacio a la derecha**.
- Cards **no se sienten premium** ni sus SVG.
- Mensajes tipo *"28 vehículos — alimentan el catálogo público y sus páginas (el generador corre cada 4h)"* = **modo desarrollador**, no software profesional; además **pegado** al panel lateral.
- **Modo claro/oscuro no tiene sentido** si Altorra Cars es solo modo oscuro (igual en Marcas y en todo lo demás → revisar/retirar `theme.js` toggle donde no aplica).
- (El dueño: "no hagas como siempre que solo atacas lo que menciono — revisa TODO con detalle, lo mencionado, lo no mencionado y lo que se te ocurra como auditor sin límites").

## 4. Hallazgos live YA observados esta sesión (semilla, no exhaustivo)

- Literal **`null`** renderizado bajo el header en Inicio y Vehículos.
- Mensajes "modo desarrollador" en headers (ej. el de vehículos).
- Toggle de tema claro/oscuro presente (innecesario si es dark-only).
- Acciones críticas usan **`confirm()` nativo** del navegador (bloquea automatización + UX inferior a un modal in-app).
- Concesionario basura `dfsfdfdfs` en el dropdown del wizard (data sucia).
- **Sin borrado por sección para el dueño** (gap P0 confirmado).
- Layout: sidebar fijo + contenido que se corta / espacio desperdiciado a la derecha (responsive/grid).

## 5. Estructura real del admin-app (mapa rápido)

Vite SPA, `admin-app/src/`: `core/` (design-system [tokens/base/components/crm-tokens .css], theme, toast, popover, dom, auth, firebase, store, layout/login, fcm, advisors, audit, friction, image, mock) + `domain/` (format, nba, scoring, agenda, classify, phone, rbac-catalog) + `modules/` (capture, inbox, contacts, deals, agenda, reportes, vehicles, brands, banners, reviews, lists, backup, config, usuarios, roles, departamentos, workflows, auditoria, ajustes, dashboard, cerebro, unmatched, hub, cms-dinamico, dealers). Backend: `functions/` + `firestore.rules`.

## 6. El SUPER-FLUJO (fases — W-11)

**Fase A — EVIDENCIA (investigación holística):** (1) auditoría multi-lente READ-ONLY del código (workflow de agentes in-cwd/structured/sin-Bash — L-50) sobre `admin-app/` + `firestore.rules` + `functions/`; (2) auditoría LIVE con extensión Chrome (recorrer cada sección como asesor novato: cazar bugs, cortes, responsive, copy, falta-de-borrado). Lentes: **Arquitectura/multi-tenant · Seguridad/RBAC/owner-delete · UX-flujo/novato · Diseño-premium · Responsive/layout · Bugs/data-sucia/dev-leaks · Copy/mensajería · Funcionalidad-faltante**.
**Fase B — DELIBERACIÓN:** comité de expertos (bounded) + consejo Gemini sobre la evidencia VERIFICADA (EVIDENCIA antes que deliberación). Cada claim de Gemini se verifica (no se acata).
**Fase C — SÍNTESIS → MEGA-PLAN:** plan priorizado (P0→P3) de reorg + rediseño + gaps, **unificado con los planes web pendientes**, con **mockups (Claude Design / visualize/Stitch)** de las pantallas clave y el **design-system premium** (dark-only). Artefacto: prompt de Gemini + mockups.
**Fase D — IMPL POR FASES + VALIDACIÓN LIVE:** implementar por fases (gate dinero/staging donde aplique), y validación live Chrome holística al cierre de cada fase.

## 7. Principios de diseño (no negociables)

Dark-only premium (oro `#b89658` sobre dark). Cero copy "modo desarrollador". Cada superficie pensada (jerarquía, espaciado, color armónico, estados vacíos, responsive real, intuición del novato). Multi-tenant desde el diseño (config por marca/empresa). Diseño guiado por las mejores plataformas (Linear/Stripe/Notion-grade), no genérico.

## 8. Checklist (evidencia, no dibujito)

- [x] Fase A.1 auditoría de código (workflow, 10 agentes/1.48M tok, 29/06) → findings crudos en `docs/superpowers/2026-06-29-crm-holistic-audit-findings.json` (SÍNTESIS pendiente de leer en sesión fresca)
- [ ] Fase A.2 auditoría live Chrome (cada sección, POV novato) → findings
- [ ] Fase B deliberación comité + Gemini (verificada)
- [ ] Fase C mega-plan + mockups + design-system premium + prompt Gemini
- [ ] Fase D impl por fases + validación live por fase

> **Nota de continuidad (saturación §G.2):** este brief se redactó al final de una sesión muy larga (validación Aliados + GC). La síntesis/deliberación/mega-plan deben correr con **contexto fresco** para máxima calidad. La Fase A.1 (auditoría de código) ya corrió; su salida alimenta la sesión fresca.

---

## 🔎 RESULTADOS FASE A.1 — auditoría de código (headlines; detalle completo en el JSON)

> **Crudo completo (LEER en sesión fresca):** `docs/superpowers/2026-06-29-crm-holistic-audit-findings.json` (155 KB; 10 agentes / 1.48M tok). Contiene: `map` (24 rutas + dataLayer + designSystem + notes), 8 lentes con findings file:línea, y `synthesis` (veredicto + p0 + temas + quickWins + productización).

**Veredicto: los CIMIENTOS son sólidos; el problema es EJECUCIÓN/organización, no la base → el salto a top-global es alcanzable.**

🟢 **Fuerte (reutilizar, no reinventar):**
- **Design-system de clase mundial YA existe** (`tokens.css` = fusión HarmonyOS14 + Win11: paleta gold, escalas, elevación, motion). El "no se ve premium" NO es por los tokens.
- Arquitectura limpia y modular: router por hash (`core/router.js`), store pub/sub (`core/store.js`), patrón `*.data.js`+`*.ui.js` por módulo, **Firebase MODULAR v11** (no compat), mock-first universal (`?mock=1`).
- **Borrado owner-only (P0): las `firestore.rules` YA lo permiten** (`isSuperAdmin`/`crm.delete`/`settings.*`) → es trabajo de **UI por sección**, no de backend (más rápido).

🔴 **Causas raíz del "se ve hecho por IA":**
1. **Corte / no-scroll / espacio-muerto = UN bug sistémico** → `shell.css` `.outlet` (altura fija + `overflow:hidden`, sin padding ni `max-width`) + módulos sin `overflow-y:auto` (ej. `vehicles.css:6`). **Un fix a nivel shell arregla TODAS las secciones.**
2. **Iconos emoji mezclados con SVG** (sidebar `🏠📥…` en `shell.js NAV[]` + botones de fila `✏️🗑★`) → look amateur (la base SVG existe en `nav-icons.js`, falta usarla en todo).
3. **Tema NO dark-only** pese al mandato: `index.html` arranca `data-theme="light"` + `core/theme.js` toggle + `shell.js:173` themeBtn. Fix: fijar dark, borrar toggle, quitar bloque `:root` light de tokens.
4. **16 `confirm()`/`prompt()`/`alert()` nativos** (lista file:línea en el JSON) — y **ya existe `.rev-modal`** (`vehicles.ui.js:340`) → extraer a `core/` y reemplazar los 16.
5. **Copy "modo desarrollador"** (`vehicles.ui.js:439` + patrón en avisos).
6. **`null` bajo headers**: NO es literal hardcoded — es un campo Firestore ausente interpolado en `${...}` (riesgo en `dom.js` el() + templates de `dashboard.ui.js`). **Cazar LIVE (Fase A.2).**
7. **Data sucia** (concesionario `dfsfdfdfs`) — refuerza el P0 de borrado.

**🧠 Defectos detectados en NUESTRO cerebro (corregir en pase enfocado):** (a) `CLAUDE.md §1` dice Firebase "compat" pero el admin-app usa **modular v11**; (b) **deriva de color de marca**: tokens `--gold-primary #D4A85A` vs `CLAUDE.md #b89658` — verificar el canónico.

---

## ▶️ ARRANQUE EN SESIÓN FRESCA — ejecutar en orden (NO saltar pasos)

> Disparador: el dueño dirá *"continúa el EPIC TODO-52"*. Estado: Fase A.1 ✅. Sigue A.2.

0. **Boot normal** (CLAUDE.md + `05` + `10` + `brain:check`). En `10` verás **TODO-52 = EPIC #1** → entra a este brief.
1. **LEE este brief completo + el findings crudo** `…2026-06-29-crm-holistic-audit-findings.json` (entero, o con un agente Explore read-only que devuelva el `synthesis` + P0 + quickWins).
2. **Fase A.2 — Auditoría LIVE (Chrome)** (skill `validacion-live-chrome`): recorre **CADA sección** del CRM como **asesor novato que recibe su 1er negocio**. Caza el `null` bajo headers (vivo), cortes/scroll/responsive, copy dev, falta de borrado owner, fricción, estados-cero. **Screenshot por sección** (callejón i = sin screenshot es cobertura fingida). ⚠️ `confirm()` nativo **bloquea la extensión** (callejón j) → el **dueño** da Aceptar a los diálogos grises; yo lleno/navego/verifico-Firestore; tab atascado → `tabs_create_mcp`.
3. **Fase B — Deliberación** sobre evidencia VERIFICADA: comité de expertos **ACOTADO** (skill `comite-expertos`, sin tools, razona sobre el diagnóstico — L-50/machinery-bounded) + **consejo Gemini** (skill `proceso-decision-fuerte` / `15-CONSEJO-EXTERNO`; **verificar cada claim, no acatar**). Artefacto W-11: **prompt de Gemini pegado COMPLETO en chat** (memoria prompts-in-chat).
4. **Fase C — Mega-plan + mockups:** plan priorizado **P0→P3**, **unificado con los planes web pendientes**; **design-system premium DARK-ONLY** definido a medida; **mockups** de pantallas clave vía **Claude Design** (`visualize`/`show_widget` o `mcp__stitch__*`; skills `frontend-design`/`design-taste-frontend`). Artefactos W-11: mockup + prompt Gemini + (luego) validación live.
5. **Fase D — Implementar por fases** (gate dinero/staging donde aplique; **cache bump §4**; **deploy = Claude**, **merge dev→main = DUEÑO en web**). **Validación live Chrome holística al cierre de cada fase.** Repetir `auditar→pulir` hasta que **respire** (DIRECTIVA PERMANENTE).

### ⚙️ Restricciones / gotchas heredados (NO tropezar)
- **Fan-out de agentes:** SOLO read-only + in-cwd + structured-output + **SIN Bash/git/MCP gateado** (si no, cuelga en background — L-50/§226/machinery-bounded). El audit A.1 funcionó así (10 agentes OK).
- **Diseño:** dark-only premium (oro). Quitar theme toggle; SVG en vez de emoji; modal in-app en vez de `confirm()`.
- **Layout:** arreglar en el **shell** (`.outlet`), no por módulo.
- **NO eliminar funcionalidad** (el dueño lo subrayó) — simplificar/reorganizar el flujo SIN perder capacidades.

### 🟡 Decisiones / pendientes abiertos del dueño
- **Limpieza datos de prueba** (irreversible, dueño): `ZZZ PRUEBA` (incl. el **deal ganado $1.25M = el $1.3M falso en Alexander Daza** + `vehiculos/47` vendido + contactos ZZZ). Se resuelve cuando exista el borrado owner-only (P0) → **fast-track ese P0** y con eso el dueño purga.
- **Merge `dev`→`main` = DUEÑO en web** (el clasificador me lo bloquea; corregir `CLAUDE.md §2` que dice que Claude mergea).
