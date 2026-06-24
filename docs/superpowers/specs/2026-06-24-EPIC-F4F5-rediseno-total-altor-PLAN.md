# EPIC F4/F5 — REDISEÑO TOTAL de ALTOR (Bot público + Hub interno admin) · PLAN DE EJECUCIÓN ⟦OPUS-4.8⟧

> Capturado 2026-06-24 (pedido del dueño). **NO se ejecuta aquí** — el dueño pidió **SESIÓN NUEVA dedicada**.
> Este es el PLAN de CÓMO actuaré (orquestación de skills/tools/maquinaria). Disparador al final.
>
> **Pedido literal:** *"NECESITAMOS UN REDISEÑO TOTAL, el diseño actualmente es arcaico tanto del Bot ALTOR
> como del panel del chat interno que es el ALTOR Hub, tecnología arcaica, pocas funciones, mal responsive,
> todo está mal — se necesita pensar en cada detalle, convocar comité expertos, consejo externo, arquitecto,
> caza-bugs y todas las skills de este workflow junto con todas las herramientas de diseño frontend."*

## 0. Alcance & objetivo
- **Bot ALTOR** (widget público): `js/concierge/concierge.js` + `css/concierge.css`. Rediseño TOTAL.
- **ALTOR Hub** (chat interno admin): `js/admin/admin-concierge.js` + `admin-inbox.js` + el panel del `admin.html` viejo. Rediseño TOTAL (¿migra al `admin-app/` nuevo Vite, o se rediseña en sitio? → decisión de arquitectura).
- **Objetivo**: de "arcaico" → **moderno, premium, responsive impecable, más funciones, cada detalle pensado**.
- Es la **F4 (widget cliente) + F5 (chat interno admin)** del EPIC ALTOR Hub v2 (spec `2026-06-22-TODO34` §EPIC), expandidas a rediseño total. = **TODO-38**.

## 1. Doctrinas/constraints INNEGOCIABLES (heredadas de la spec EPIC + el cerebro)
1. **Módulo PARALELO v2, flag-gated, v1 INTACTO** → A/B real (el flag aísla el **DOM**, no solo la lógica — spec §202; "no in-place"). Rollback = trivial.
2. **Engine-agnóstico**: la UI sirve con **Free Core HOY** y con el **LLM v2** cuando se encienda (saldo Anthropic = AL FINAL, decisión del dueño; no bloquea el rediseño).
3. **Cero regresión funcional**: preservar TODOS los contratos/lógica v1 — mensajes, **gate de captura (TODO-37 §235)**, escalado/cola/SLA, WhatsApp handoff (`handoverToWhatsApp`/`buildWhatsAppSummary`), vehicle-cards, sync Firestore, optimistic UI, RBAC, persistencia/§234 purga-en-logout.
4. **Cero-pérdida de leads**: el flujo de captura ya arreglado (TODO-37: gate→CREATE, consent Ley 1581, rescate WhatsApp) se PRESERVA/mejora.
5. **Bounded** (memoria `feedback-agent-machinery-bounded`): comité **inline/acotado** (pocos expertos, sin tools, sobre diagnóstico verificado); **Gemini** lo corre el DUEÑO en Antigravity (`15`); el **validador** = la extensión Chrome del dueño. NADA de fan-outs grandes (cuelgan en esta máquina).
6. **Decisión Fuerte** (`proceso-decision-fuerte`) para lo CARO de revertir: stack, arquitectura del módulo, lenguaje de diseño, migración del Hub.
7. **Perf (§17/§17.2/§17.4)**, **a11y WCAG 2.2 AA**, **legal Ley 1581** (consent en captura → `legal-colombia`), **HTML/CSS estable** (nombres/contratos).

## 2. Plan por FASES (cada fase = skills + tools + maquinaria + GATE)

### Fase A — Discovery & Auditoría (estado actual + requisitos)
- **Auditoría EN VIVO** (`validacion-live-chrome` + extensión Chrome del dueño, 7 dimensiones): recorrer Bot + Hub completos (funcional, diseño, copy, **flujo comercial saludo→cierre**, responsive mobile+desktop, a11y, perf) → inventario total de defectos + **funciones faltantes**.
- Skills: `redesign-existing-projects`, `accessibility-audit`, `design` (design-critique), `caza-bugs`.
- **Mapa de contratos v1 a preservar** (leer `concierge.js`/`admin-concierge.js` + `20-ESPACIAL`): qué lógica NO se puede romper (lista explícita).
- Consolidar requisitos: backlog `altor-hub-rediseno-defectos.md` (#1✅ #2✅ #3 #4 #5 #6 C#1) + nuevos + las "más funciones" que defina el dueño.
- **Entregable**: doc de requisitos + inventario de contratos + lista de funciones nuevas.

### Fase B — Dirección de diseño (la visión) — el dueño APRUEBA antes de arquitectura
- Skills: `frontend-design`, `ui-ux-pro-max`, `high-end-visual-design`, `design-taste-frontend`, `brand-guidelines`, `theme-factory`, `minimalist-ui`/lenguaje elegido, `redesign-existing-projects`.
- Tools: **stitch** (design system + pantallas), **visualize/show_widget** (mockups inline en el chat), `image-to-code`, `imagegen-frontend-web`/`-mobile`. (El fresh-session verifica cuáles están conectados; las skills de diseño viven en el bundle `anthropic-skills:*`.)
- Anclar a la **marca**: dorado `#b89658`, dark premium, tipografías **Manrope / Instrument Serif / Cardo** (memoria `project-redesign-total`) + el `altorra-cars-design-system/` existente.
- Producir **mockups responsive** (mobile-first + desktop) del **widget v2** y del **Hub v2**.
- **comité-expertos** (acotado): panel sobre la dirección (UX/conversión · marca · a11y · mantenibilidad).
- **Entregable**: mockups + design tokens + guía visual del widget/Hub v2 → **aprobación del dueño**.

### Fase C — Arquitectura (cómo se construye) — DECISIÓN FUERTE
- Skill `arquitecto-software`: arquitectura del módulo v2 — **stack** (¿vanilla + Web Components? ¿Vite como `admin-app/`? ¿otro?), estructura de componentes, **sistema responsive**, gestión de estado, **aislamiento del DOM**, reuso de contratos/lógica v1, los 6 pilares (negocio/escala/seguridad/costo/mantenibilidad/integración).
- **`proceso-decision-fuerte` COMPLETO**: verificar código → comité acotado → **consejo externo Gemini (Antigravity)** red-team (acoplamiento, A/B real, perf, seguridad, costo, migración Hub) → **verificar cada claim de Gemini** (la joya) → veredicto → impl por fase.
- **Entregable**: **ADR de arquitectura** + plan técnico del módulo v2 + diseño del flag/rollout.

### Fase D — Construcción incremental (build)
- Construir el módulo v2 **detrás del flag** (v1 intacto), **componente por componente**.
- Skills: `frontend-design`, `image-to-code` (fidelidad a los mockups), `caza-bugs` (cada subsistema), `legal-colombia` (consent en captura), `anti-codigo-muerto` (al retirar v1 = cuarentena).
- **GATE por tramo**: re-validación EN VIVO (`validacion-live-chrome`) — funcional + diseño + copy + flujo + responsive + a11y + perf. El **validador adversarial** cierra cada tramo (no avanzar sin verde verificado contra el código).
- Doctrinas perf §17 + a11y WCAG 2.2 AA + **cero regresión** (contra el mapa de contratos de Fase A).

### Fase E — Validación, rollout & poda
- A/B real (flag): validador adversarial en vivo (desktop + **mobile** + logueado + anónimo + **journey comercial completo** + exploración autónoma).
- `accessibility-audit` final (WCAG 2.2 AA) + perf (Lighthouse/chrome-devtools-mcp).
- Rollout gradual (cohorte) → retirar flag → **poda de v1** (`anti-codigo-muerto`, cuarentena `_legacy/`, no borrar a ciegas).

### Fase F — Hub interno admin (rediseño separado)
- Repetir B→E para el **chat interno del admin** (ALTOR Hub: `admin-concierge.js`/`admin-inbox.js`/panel viejo). Fase SEPARADA (distinto archivo/usuarios/riesgo — spec §234). 1ª decisión (arquitectura): ¿migrar al `admin-app/` nuevo (Vite) o rediseñar en sitio?

## 3. Mapa de maquinaria & skills (qué se convoca y cuándo) — TODO ACOTADO
| Fase | Skills | Tools | Consejo/Comité |
|---|---|---|---|
| **A** Discovery | validacion-live-chrome · caza-bugs · redesign-existing-projects · accessibility-audit · design | Claude-in-Chrome · chrome-devtools-mcp | — |
| **B** Diseño | frontend-design · ui-ux-pro-max · high-end-visual-design · design-taste-frontend · brand-guidelines · theme-factory | stitch · visualize(show_widget) · image-to-code · imagegen | **comité-expertos** (dirección) |
| **C** Arquitectura | arquitecto-software · proceso-decision-fuerte | — | comité + **Gemini (Antigravity)** + verificar cada claim |
| **D** Build | frontend-design · image-to-code · caza-bugs · anti-codigo-muerto · legal-colombia | — | **validador** (gate por tramo) |
| **E** Validación | validacion-live-chrome (7 dim) · accessibility-audit | Claude-in-Chrome · chrome-devtools (perf) | validador adversarial |
| **F** Hub admin | (repite B→E) | (idem) | (idem) |

## 4. Riesgos & mitigaciones
- **Reescritura grande** → módulo paralelo + flag (v1 intacto) = rollback trivial; build incremental + gate por tramo.
- **Fan-outs cuelgan** (esta máquina) → todo inline/acotado; Gemini y el validador los corre el dueño.
- **Regresión funcional** → mapa de contratos v1 (Fase A) + validador adversarial por tramo + cero regresión.
- **Scope creep** → fases con entregable + gate; el dueño APRUEBA dirección (B) y arquitectura (C) ANTES del build (D).
- **Cuelgue/saturación de contexto** → relevo curado entre fases (§G.2); cada fase consolida al cerebro antes de la siguiente.

## 5. Primer paso de la sesión nueva
Arrancar **Fase A**: pedir al dueño la auditoría en vivo (validador) del Bot + Hub + recoger las "funciones nuevas" que quiere; en paralelo, mapear los contratos v1. Luego **Fase B** (dirección de diseño + mockups) para su aprobación antes de arquitectura/build. Confirmar al arrancar qué tools de diseño están conectados (stitch/visualize/figma).

## ⚠️ Disparador (al iniciar la sesión nueva, retomar este PLAN)
> *"rediseño total ALTOR"* / *"continuemos el rediseño F4/F5"* / *"empecemos el bot/hub nuevo"* → leer
> `docs/superpowers/specs/2026-06-24-EPIC-F4F5-rediseno-total-altor-PLAN.md` y arrancar **Fase A**.

## Checklist (se tildará en la sesión nueva, con evidencia)
- [ ] Fase A — auditoría live + mapa de contratos v1 + requisitos (evidencia: reporte validador + doc)
- [ ] Fase B — mockups responsive + dirección aprobada por el dueño
- [ ] Fase C — ADR de arquitectura (comité + Gemini verificado)
- [ ] Fase D — módulo v2 build incremental (gate validador por tramo)
- [ ] Fase E — validación + rollout + poda v1
- [ ] Fase F — Hub interno admin
