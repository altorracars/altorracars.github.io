# F4/F5 · FASE C — Arquitectura del módulo v2 (PROPUESTA · Decisión Fuerte) ⟦OPUS-4.8⟧

> Propuesta de arquitectura para red-team de **Gemini (Antigravity, code-aware solo-lectura)**.
> Formada con `arquitecto-software` (6 lentes + IAP). Gemini ASESORA, NUNCA edita; yo verifico cada claim
> (joya §Decisión Fuerte) y decido. Fecha: 2026-06-24.

## 1. Pregunta de arquitectura (lo caro de revertir)
Cómo construir el **módulo paralelo v2** del bot (y luego el Hub): **stack + aislamiento DOM + flag + compartir-o-forkear la lógica** — sin romper v1 ni la captura de leads.

## 2. Hechos verificados (Fase A)
- v1 `concierge.js` = **IIFE de 4.479 L** que se **auto-inyecta en `document.body`** (FAB+CTA+panel). Carga dinámica vía `components.js`. Namespace `cnc-*`.
- Expone global: `window.AltorraConcierge` (open/close/toggle/send/openWithVehicleContext/applyAuthProfile/resetSession/session/_state) + `window._altorraConciergeRespondLocal` (Free Core).
- Motor: `window.AltorraDualCore.respond()` (Premium↔Free, circuit breaker). Captura: `createSoftContact`/`isGateRequired`/`handoverToWhatsApp` (NO expuestas global, internas al IIFE). Datos: `conciergeChats`, `solicitudes`.
- Defectos de aislamiento: CSS leak, z-index #4 (panel 9999 vs dropdown 9000), media queries de viewport en panel 380px (#1).

## 3. IAP (Impact Analysis Previo)
- **(A) Modificar**: `js/core/components.js` (mount flag-gated), nuevo `js/concierge/v2/`, fuente del flag (config doc / localStorage cohorte).
- **(B) INTACTO (verificado)**: `js/concierge/concierge.js` (v1, flag-off), `admin-concierge.js` (hasta Fase F), todos los contratos Fase A.
- **(C) Código muerto**: ninguno aún (v1 vive hasta rollout; poda en Fase E con `anti-codigo-muerto`).
- **(D) Refactor**: mínimo o medio según la opción 4.x (share-vs-fork).
- **(E) Riesgos**: shadow DOM ↔ Firebase/auth/eventos globales; doble-mount (doble FAB); divergencia si forkea. **Rollback = flip del flag.**

## 4. Opciones de stack + lógica
**Stack:**
- **S1 IIFE vanilla (como v1)** — sin aislamiento nativo → arrastra CSS leak/#4/colisión `cnc-*`. ❌ repite la fragilidad.
- **S2 Web Component + Shadow DOM (vanilla, sin bundler)** — aislamiento nativo de estilo+DOM, stacking limpio (#4), `@container`+full-screen (D3) limpios, encaja en static GitHub Pages. ✅ **RECOMENDADO**. Gotchas: shadow ↔ estilos globales/fonts, retargeting de eventos, integración Firebase/auth.
- **S3 Vite (como `admin-app/`)** — añade bundler al sitio público static (hoy sin build). ❌ overkill para un widget público; complejidad de deploy.

**Lógica (la tensión central a red-teamear):**
- **L-a Compartir core headless** — extraer engine+flujo+estado a un core que v1 y v2 consuman. ✅ sin divergencia · ❌ toca v1 (tensión con "v1 intacto").
- **L-b v2 consume hooks globales de v1** — v1 100% intacto · ❌ acopla la carga de v2 a v1 + funciones de captura NO están expuestas global.
- **L-c v2 re-implementa la vista sobre datos/motor compartidos** — v1 intacto · ❌ duplica lógica de flujo (divergencia futura).

## 5. Recomendación (a refutar)
**S2 (Web Component + Shadow DOM, sin bundler) + flag en `components.js` (monta v1 XOR v2, nunca ambos)**, con la capa de lógica resuelta hacia **L-a acotado**: extraer SOLO el motor/captura/datos a un core headless reusable, dejando el DOM/flujo de v1 intacto (v1 pasa a consumir el core extraído con cambio mínimo, o se congela y v2 usa el core nuevo). El reparto exacto L-a vs L-c es lo que Gemini debe estresar.

## 6. Invariantes (deben cumplirse en CUALQUIER opción)
1. v1 100% intacto y flag-gated (cero cambio de comportamiento).
2. Cero regresión vs mapa de contratos Fase A.
3. **Cero-pérdida de leads** (captura TODO-37 preservada: gate→CREATE, consent Ley 1581, rescate WhatsApp).
4. Engine-agnóstico (Free Core hoy, LLM luego) + entrada engine-aware ternaria (D1).
5. **Sin bundler** en el sitio público static.
6. Perf §17 + a11y WCAG 2.2 AA + Ley 1581 (gate P4 abogado para el texto legal).
7. Rollback trivial (flip del flag). A/B real a nivel DOM (doctrina #1).
8. No romper aislamiento de sesión por-cuenta (§227) ni purga-en-logout (§234).

## 7. Para Gemini (red-team, anti-anclaje R1)
Que cace el **fallo fatal** en: acoplamiento v1↔v2, realidad del A/B, shadow DOM ↔ Firebase/auth/eventos, perf/peso, seguridad (aislamiento de sesión), costo/mantenibilidad, share-vs-fork, y la migración del Hub (in-situ vs `admin-app/` Vite). Prompt completo → entregado en chat al dueño.
