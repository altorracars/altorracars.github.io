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

- [x] Fase A.1 auditoría de código (workflow, 10 agentes/1.48M tok, 29/06) → findings crudos en `docs/superpowers/2026-06-29-crm-holistic-audit-findings.json` — SÍNTESIS LEÍDA ✅ (sesión 29/06 b). **81 findings; 6 P0** (2 de SEGURIDAD nuevos no enfatizados en el headline → ver §MEGA-PLAN).
- [x] Fase A.2 **parcial** — auditoría LOCAL rendered (Vite `?mock=1` + preview, sin dueño) ✅: confirmados LIVE el `null`, copy dev, emoji, toggle de tema, y **medido el layout** (8 módulos flow rotos, no 6: +`resenas`/`contenido`/`perfil`). QUEDA: la live-Chrome con dueño presente (flujos Firestore, confirm() grises, datos reales) → POV novato.
- [x] **PASE 1 "pulir" (Fase D adelantada, quick-wins seguros) ✅ SHIPPED+verificado** (2026-06-29; `shell.css`+`dom.js`+`theme.js`; commit en `dev`) → ver §PASE-1.
- [ ] Fase B deliberación comité + Gemini (verificada) — pendiente; **Decisión Fuerte = tenancy + enforcement seguridad** (prompt Gemini redactado, ver §MEGA-PLAN P3).
- [ ] Fase C mega-plan ✅ redactado (§MEGA-PLAN) — falta **mockups + design-system premium** formal.
- [ ] Fase D impl por fases + validación live por fase — P0-LAYOUT f1 + DARK-ONLY ya shipped; sigue owner-delete (P0 #1) + seguridad.

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

---

## §PASE-1 — primer "pulir" (SHIPPED + verificado en local, sesión 29/06 b ⟦OPUS-4.8⟧)

Quick-wins del synthesis A.1, todos reversibles/aditivos/cero-regresión, verificados ruta-por-ruta en preview (`?mock=1`, 1440/768/375px) + build prod limpio (149 mód, 2.44s). Commit en `dev` (dueño mergea).

1. **DARK-ONLY** — `index.html` `data-theme="dark"` + `color-scheme:dark`; `core/theme.js` fija dark (sin toggle/persistencia de modo); `shell.js` quita el `themeBtn` y su import de `toggleTheme`. La paleta de ACENTO (ajustes) queda intacta. Verificado: 24 rutas en dark, sin botón de tema.
2. **`null` bajo headers (RCA REAL)** — NO era campo Firestore ausente: era `parent.append(draftsPanel())` con **`append()` nativo** que coacciona `null`→`"null"` (vs `el()` que sí filtra). Fix sistémico: nuevo helper `core/dom.js` `appendAll(parent, children)` (filtra `null/false/''`); aplicado en `vehicles.ui.js render()`. ⚠️ El sweep al resto de `append()` con hijos condicionales (banners `group()`, etc.) = P1 pendiente.
3. **Copy "modo desarrollador"** — `vehicles.ui.js`: header "…generador corre cada 4h" → "N vehículos en el catálogo"; modal de borrado "muere en la corrida del generador" → copy de negocio. `shell.js`: footer "v0.4.1 · Fase 4" → "v0.4.1"; crumb "tiempo real" → "" (solo "Modo demostración" en mock).
4. **P0-LAYOUT fase 1 (el "respiro")** — `shell.css` `.outlet`: `overflow:hidden`→`overflow-y:auto; overflow-x:hidden` (el outlet es el viewport de scroll → ninguna ruta se recorta jamás) + `.outlet > *{min-width:100%}` (mata el encogerse→hueco a la derecha) + `padding-inline:var(--s-6)` a los 8 roots flow (`.veh/.brd/.dlr/.rev/.ban/.cms/.lst/.perfil`, alta especificidad `.outlet > X`) → mata el "pegado al sidebar". **Clave anti-regresión:** se mantiene `display:flex` (row) — NO `column` — para que los módulos auto-scroll (`.dash/.inbox/...` con `height:100%`/stretch) conserven su scroll interno (colas/toolbar fijos). Verificado: las 3 quejas verbatim resueltas, scroll interno de inbox/dash intacto, sin overflow-x en mobile/tablet.

**Pendiente layout fase 2 (P1):** clase canónica `.page` + `max-width` para monitores anchos (1920px+, hueco P2) + breakpoints unificados (shell 860/560 vs módulos 480/640/900).

---

## §MEGA-PLAN — priorizado P0→P3 (Fase C; derivado de A.1 verificado + A.2-local)

> Unifica el overhaul con la productización. ✅ = shipped Pase-1. Cada ítem "respira la visión" o no se declara listo (Directiva Permanente).

### P0 — bloqueantes (seguridad/datos/dueño + base premium)
- **P0-SEC-1 · dataScope NO enforced (fuga PII / Habeas Data Ley 1581):** `own/dept/all` se hidrata en cliente pero NINGUNA query/regla lo aplica → cualquier asesor ve la cartera entera. Fix: `where(ownerId/departmentId)` en queries + reglas que lo exijan (o servir CRM por callables). ⚠️ interactúa con tenancy → ver P3 + Gemini. **Urgente.**
- **P0-SEC-2 · escalada de privilegios (roles.create):** no valida subconjunto de permisos → un admin se fabrica rol con `users.*/crm.delete`. Fix: callable Admin SDK valida subset + `isOwner` para perms críticos; UI deshabilita (no oculta); defensa en reglas. + unificar `isOwnerData()` canónico en `crmBackup/crmPurge` (drift R8).
- **P0-OWNER-DELETE · purga owner-only por sección (P0 #1 del dueño, desbloquea limpieza ZZZ):** backend YA lo permite (rules `isSuperAdmin`/`crm.delete` + `crmPurge.js`) → solo UI. Patrón reusable: bulkbar (`.inbox__bulkbar`) + "Zona peligrosa" + modal typed-confirm + gate server-side. Añadir `deleteDeal`/`deleteDealer` (Pipeline/Aliados HOY imborrables).
- **P0-CAPTURE · pérdida silenciosa de leads (pierde dinero):** `quick-lead/new-lead` muestran éxito optimista; si el server rechaza, el error es un toast efímero → el asesor cree que capturó y NO. Fix: con señal, esperar ack/confirmar por snapshot; ante rechazo, modal bloqueante con el lead intacto.
- **P0-LAYOUT fase 1** ✅ Pase-1. **P0-DARK-ONLY** ✅ Pase-1.

### P1 — profesionalismo ("se ve hecho por IA" → premium)
- `confirm()/prompt()/alert()` nativos (16-18) → `core/confirm.js` (extraer `.rev-modal`, moverlo a `components.css` con shadow/blur/anim) + reemplazos.
- `core/errors.js` `friendlyError(e)` (replicar mapeo de `auth.js`) → reemplazar ~30 toasts que filtran `e.code`/'rules'/'super_admin'/IDs de permiso.
- Copy dev restante: **voseo argentino** (bot Cerebro AI público en Cartagena + ajustes "cambiás/Usá") → tú-Colombia (skill `catalogo-voz`); "(demo)" inline; "13 listas" hardcode→derivado.
- **Emoji→SVG** en filas/acciones/empty-states (la base `nav-icons.js`/`icons.js` existe; sidebar ya migrado).
- **Gold canónico:** resolver `--gold-500 #D4A85A` vs doctrina `#b89658` + matar `var(--gold)` fantasma (también corrige `CLAUDE.md §1`).
- **Sweep `null`/`undefined`:** `appendAll` en todo `append()` con hijos condicionales + helper `safe(x,'—')` en interpolaciones de campo opcional.
- Consentimiento pre-marcado (`new-lead.js checked:true`) → explícito (Habeas Data, 1 línea).
- Estados vacíos accionables (CTA en vehicles/deals/contacts) + onboarding/checklist del novato + unificar doble captura.
- Validación de entrada (trim/maxLen/regex) en `*.data.js` + espejada en reglas (mata data sucia `dfsfdfdfs`).
- **Layout fase 2** (`.page` canónica + max-width ultrawide + breakpoints).

### P2 — escalabilidad / deuda
- Paginación/cursores en TODOS los `*.data.js`; combobox typeahead para el `<select>` de conversión (inusable a 100+ veh / multi-tenant); agregados server-side (stats aliados).
- Cerrar cutover F-6 (doble fuente RBAC 71 perms) → test de paridad mientras tanto.
- Export por sección (reusar `toCsv()/download()`) + red de seguridad (papelera/undo/soft-delete).

### P3 — PRODUCTIZACIÓN multi-tenant (🛰️ DECISIÓN FUERTE — Gemini + dueño)
- **Estrategia de tenancy** (bloqueo #1; 0 ocurrencias `tenantId` hoy): `tenants/{tenantId}/{col}`+collectionGroup vs `tenantId`-por-doc forzado en reglas. **ANTES de más features.**
- Habilitadores: `core/collections.js` (nombres centralizados con tenant-path), `FIREBASE_CONFIG`/`APP_NAME` a runtime por dominio, `core/strings.js` i18n (`t('key')`), marca (nombre/ciudad/color/logo/voz) a config de tenant en variables CSS, theming por-tenant (capability "tema permitido", no toggle libre).
- Enforcement de dataScope/RBAC POR tenant (P0-SEC-1/2 se diseñan mirando esto).

### Defectos del cerebro a corregir (pase enfocado)
- `CLAUDE.md §1`: dice Firebase "compat" pero `admin-app` usa **modular v11**.
- Deriva de color: `--gold-500 #D4A85A` vs `CLAUDE.md #b89658` — fijar canónico.
