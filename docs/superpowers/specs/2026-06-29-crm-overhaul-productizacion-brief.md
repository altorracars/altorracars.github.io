# BRIEF — CRM Overhaul + Productización (EPIC maestro) ⟦OPUS-4.8⟧

> **Fecha:** 2026-06-29. Origen: directiva del dueño (verbatim abajo). Modelo: Opus 4.8 ⟦rev-Fable⟧.
> **SSoT del epic.** Prioridad #1 — por encima de todo lo demás (TODO-26 facturación, web, etc. se subordinan/unifican a esto).
> Flujo gobernante: **W-11 (Decisión Fuerte + Diseño/UI no trivial) → COMPLETO o nada + 3 artefactos** (mockup · prompt Gemini · validación live Chrome).

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

- [ ] Fase A.1 auditoría de código (workflow) → findings priorizados
- [ ] Fase A.2 auditoría live Chrome (cada sección, POV novato) → findings
- [ ] Fase B deliberación comité + Gemini (verificada)
- [ ] Fase C mega-plan + mockups + design-system premium + prompt Gemini
- [ ] Fase D impl por fases + validación live por fase

> **Nota de continuidad (saturación §G.2):** este brief se redactó al final de una sesión muy larga (validación Aliados + GC). La síntesis/deliberación/mega-plan deben correr con **contexto fresco** para máxima calidad. La Fase A.1 (auditoría de código) puede lanzarse en background y su salida alimenta la sesión fresca.
