# F4/F5 · FASE B — Dirección de diseño + Flujo del lead (ALTOR Bot + Hub v2) ⟦OPUS-4.8⟧

> Entregable Fase B del plan `2026-06-24-EPIC-F4F5...PLAN.md`. Dirección aprobada por el dueño:
> **chat grado Bancolombia (Tabot=WhatsApp) + WhatsApp**, piel Altorra dorado/dark premium.
> Comité acotado inline (4 expertos + peer review) corrido 2026-06-24. Mockups: 4 renders show_widget.
> Fecha: 2026-06-24.

## 0. Referencia validada
Búsqueda web: **Tabot de Bancolombia ES un asistente de WhatsApp** (+57 301 353 67 88) → la referencia "Bancolombia + WhatsApp" converge: **burbujas grado-WhatsApp** (familiar/confiable) + **estructura bancaria** (botones de acción, escalado claro, señales de confianza/verificado), en marca Altorra.

## 1. Las 6 decisiones de diseño (síntesis del comité)
| # | Decisión | Resuelve |
|---|---|---|
| **D1** | **Entrada TERNARIA** `getInputMode(session)` = f(`mode`×`engine`): Free Core→**botones + escape hatch, sin caja**; LLM→**caja libre, sin botones**; **Live (humano)→caja libre SIEMPRE**. Reacciona EN VIVO a flips del motor (circuit breaker LLM→Free). | Idea del dueño + modo live + flip en vivo |
| **D2** | **Captura en el COMPROMISO de intención** (gate: cita/vender/financiación/"me interesa") — no antes. Red WhatsApp de baja fricción si la charla se alarga. | Cero-pérdida leads (TODO-37) |
| **D3** | **Responsive por `@container`, NUNCA viewport** (causa-raíz del defecto #1) + **móvil = full-screen sheet**, desktop = panel flotante 380px. | Prioridad #1 del dueño |
| **D4** | **Saludo según estado**: logueado→personalizado, salta identidad, va al valor; anónimo→cálido + valor-primero, datos solo en D2. Status = disponibilidad (online/offline/fuera de horario). | Flujo logueado vs no |
| **D5** | **Visual**: estructura WhatsApp (burbujas, barra, ✓✓) + confianza Bancolombia (verificado, foto real del asesor, status dot) + piel Altorra (Instrument Serif headers, Manrope UI, dorado de acento, sombras suaves, **sin backdrop-filter en listas** §3.1). | Referencia + marca + perf |
| **D6** | **Free Core buttons-only se despliega PRIMERO** (no depende del saldo Anthropic) → mejora inmediata + cada botón = intent trackeado. | Des-riesgue + ejecutable hoy |

**Mejora adoptada**: **iconos de línea (Tabler outline) en vez de emoji** — más premium, consistentes, accesibles.

## 2. Design tokens (v2)
```
/* Superficies (dark cálido) */
--alt2-bg:        #17130E   /* base panel */
--alt2-surface:   #1E1810   /* header / input zone */
--alt2-bubble-bot:#241D14   /* burbuja bot */
--alt2-elevated:  #1F1810   /* tarjetas */
--alt2-border:    #2C241A   /* hairline */
--alt2-border-2:  #352A1C   /* borde de campo/tarjeta */
/* Marca */
--alt2-gold:      #B89658   /* acento único, cuentagotas */
--alt2-gold-soft: #D9BD83   /* texto dorado (precios, nombre) */
--alt2-on-gold:   #17130E   /* texto sobre dorado */
/* Texto */
--alt2-text:      #F4EEE3   /* primario cálido */
--alt2-text-2:    #9A9081   /* secundario */
--alt2-text-3:    #736A5C   /* terciario / timestamps */
/* Semánticos (Hub SLA) */
--alt2-ok:#5BBF66  --alt2-warn:#E8C07A  --alt2-late:#E89090
/* Burbuja usuario = dorado sólido (estructura WhatsApp, color marca) */
--alt2-bubble-user:#B89658 (texto #1A150E)
/* Tipografía */
--alt2-font-display:'Instrument Serif'  /* nombre ALTOR, precios, headers */
--alt2-font-ui:'Manrope'                /* todo lo demás */
/* Radios: panel 20px · burbujas 14-16px (5px en la esquina del hablante) · botones 12px */
```

## 3. FLUJO DEL LEAD v2 (revisión pedida por el dueño — logueado vs no-logueado)

### 3.1 Apertura
- Triggers: FAB · burbuja CTA · deep-link desde detalle-vehículo (`openWithVehicleContext`).
- El **estado del motor** fija la entrada (D1): Free Core→botones · LLM→libre · Live→libre.

### 3.2 Saludo (D4)
- **NO logueado**: *"Hola, soy ALTOR — tu asistente en Altorra Cars. ¿Qué estás buscando hoy?"* + botones primarios. **Cero datos pedidos** (valor primero). Status refleja disponibilidad.
- **Logueado**: *"Hola {nombre}, ¿en qué te ayudo hoy?"* — personalizado, salta identidad; vincula a su uid. Mismos botones.

### 3.3 Cuándo se pide la info (D2 — el corazón de la pregunta del dueño)
- El usuario navega/pregunta **libre, SIN gate** (logueado o no).
- El gate (`isGateRequired`) dispara SOLO en **acción de alto valor**: agendar cita · financiación · vender/avalúo · "me interesa" un vehículo.
- En ese instante:
  - **NO logueado** → pedir **nombre + celular** (cédula RETIRADA, F2) + **consent Ley 1581** (texto legal = gate P4 abogado, `42-LEGAL`). → `createSoftContact()` (CREATE lead, cero-pérdida).
  - **Logueado** → ya tiene datos → no re-pedir; vincula la acción a su uid.
- **Red de seguridad (CRO)**: charla larga sin acción / fricción → ofrecer **WhatsApp** (`handoverToWhatsApp` con lo que haya). El handoff ES la captura del que no llena formulario.

### 3.4 Botones por intent (Free Core)
- Welcome → Ver autos · Financiación · Agendar visita · **Hablar con asesor** (escape hatch).
- inventory → SUV · Sedán · Pickup (o filtros de precio) + asesor.
- pricing → ¿Parte de pago? · Calcular financiación · asesor.
- **Escape hatch SIEMPRE** visible ("Hablar con asesor" / "Otra cosa") → buttons-only nunca es trampa.

### 3.5 Escalado / SLA / offline
- Auto-escala (frustración / ask_human / sentiment neg → `escalateToLive`, 800ms). mode=live → entrada libre.
- Banners SLA (cola/warning/breach) rediseñados (fix #1, `@container`), WhatsApp como salida.
- **Fuera de horario** (`config/availability`): "Hablar con asesor" degrada a "déjanos tus datos / seguir por WhatsApp".

### 3.6 Cierre
- "Finalizar conversación" → **modal in-app** (no `window.confirm`, fix #6) → descargar + cerrar. Logout → purga §234.

## 4. Mockups producidos (show_widget, 2026-06-24)
1. **Bot Free Core** — bienvenida + buttons-only + escape hatch (despliega primero, D6).
2. **Bot LLM** — chat libre + barra de texto + **tarjeta de vehículo inline** (resuelve C#1).
3. **Bot móvil** — full-screen sheet + escalado a asesor (foto real) + FAB launcher (D3).
4. **ALTOR Hub v2** — consola admin: cola por SLA (semáforo), filtros, claim/transferir/notas, contexto del lead.

## 5. Comité acotado — puntos ciegos cazados (crudo→síntesis, §G.4)
- **A (UX conversacional)**: el modelo no es binario sino **ternario** (mode×engine); buttons-only JAMÁS en live; escape hatch obligatorio.
- **B (CRO, ejecutor)**: captura en compromiso de intención (no antes); WhatsApp = captura del no-formulario; **Free Core buttons-only es desplegable HOY** sin saldo.
- **C (frontend, escéptico)**: el fallo fatal = clonar WhatsApp en panel de 380px con **media queries de viewport** (causa del #1) → **`@container` + full-screen móvil**; estructura WhatsApp ≠ color WhatsApp.
- **D (visual premium)**: premium = restricción (Instrument Serif + Manrope, dorado cuentagotas, sin glass en listas); confianza = verificado + foto asesor + status.
- **Peer review (omitido por todos)**: (1) el motor **flip en vivo** (circuit breaker) → UI reactiva; (2) **offline/fuera de horario** → degradar escalado a datos/WhatsApp.

## 6. Pendiente Fase C (Decisión Fuerte → Gemini)
Stack/arquitectura del módulo v2 (Web Component + Shadow DOM vs IIFE vanilla vs Vite), el flag en `components.js`, reuso de contratos v1 (Fase A), aislamiento DOM/stacking (#4). Red-team de Gemini = el stop pactado con el dueño.
