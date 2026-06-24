# F4/F5 · FASE C — Veredicto de arquitectura (Decisión Fuerte cerrada) ⟦OPUS-4.8⟧

> Red-team de **Gemini (Antigravity)** + **verificación de cada claim contra el código** (la joya, §Decisión Fuerte)
> + veredicto. Crudo preservado abajo (§G.4). Fecha: 2026-06-24.

## §A — CRUDO de Gemini (red-team, resumen fiel de los 6 puntos)
1. **Shadow DOM**: retargeting de eventos enmascara `e.target` al host → analíticas/recolección ciegas si dependen de clases internas. NO inyectar modales de negocio (Auth, gate legal Ley 1581) dentro del shadow (z-index/stacking propio → modales ocultos). Afirmó que `auth.js` asume `window.AltorraConcierge.applyAuthProfile()` → v2 DEBE exponer la API global idéntica o el `onAuthStateChanged` crashea y se pierde el Identity Merge. Comunicación hacia afuera por `CustomEvents` atados a `window`.
2. **Compartir core vs fork**: "compartir core" destruye invariante #1 (v1 intacto) — extraer el motor de un IIFE de 4.479 L obliga a mutilar concierge.js; si el core nuevo tiene un bug, v1 se cae y el A/B es una farsa. → **L-c fork duro** (`concierge-v2.js`); el core compartido real es **Firestore**. Duplica frontend, estabiliza v2, gana el A/B por data, elimina v1 después.
3. **Flag XOR**: resolver el flag async (Remote Config/Firestore) retrasa el namespace `window.AltorraConcierge`; scripts en paralelo/caché (auth.js, detalle-vehículo que llama `openWithVehicleContext()`) lo ven `undefined` → excepción → lead perdido (invariante #3). → flag **síncrono** (localStorage/server-embedded) + patrón **command queue** (`window.AltorraConcierge = window.AltorraConcierge || []`).
4. **Perf**: "sin bundler" + ES modules nativos = network waterfall secuencial en host estático → masacra LCP/TBT en móvil (invariante #6). → usar build step local (Vite/Rollup/ESBuild) que emita un único `concierge-v2.min.js`.
5. **Seguridad/storage**: v1 y v2 sobre la misma key `altorra_concierge_session` → corrupción al parsear modelo viejo → purga la conversación → lead perdido (invariantes #3/#8). → namespace separado `altorra_concierge_v2_session` + lectura 1-vía de la key vieja para migrar.
6. **Hub**: in-situ en admin.html (3.922 L) rompe features auditadas (typing bidireccional, RBAC, transferencias); Vite (`admin-app/`) fragmenta sesión/auth (`altorra_admin_auth_hint`, topnav atados a la raíz). → **Sandbox en el monolito**: `#sec-concierge-v2` + pestaña nueva + JS nuevo + flag; retiene infra Firebase/roles sin mutar el código vivo.

**Veredicto de Gemini**: Web Component + Shadow DOM correcto en la vista; "compartir core (L-a)" garantiza regresiones; falta de aislamiento de globales mata leads. → fork duro (L-c) + command queue + namespaces de storage independientes + build step local.

## §B — VERIFICACIÓN (cada claim contra el código real — la joya)
| # | Verificación | Resultado |
|---|---|---|
| 1 | `js/core/auth.js` referencia `window.AltorraConcierge.resetSession()` (logout/purga §234), **NO** `applyAuthProfile` (ese se cablea interno en concierge.js:4460). | ✅ principio · ❌ específico → corregido |
| 2 | concierge.js = IIFE 4.479 L, captura interna no-exportada → extraer = mutilar. Invariante #1 lo prohíbe. | ✅ correcto |
| 3 | components.js inyecta concierge.js vía `createElement('script')` async/defer (`:401-403`); detalle-vehículo llama `openWithVehicleContext` (`:4368`). | ✅ correcto |
| 4 | El widget carga **async DESPUÉS del primer pintado** (no en critical path) → **NO es el elemento LCP**. La premisa "masacra LCP" es falsa para un widget lazy. | ❌ refutado |
| 5 | `var STORAGE_KEY = 'altorra_concierge_session'` (concierge.js:49). | ✅ correcto |
| 6 | admin.html = 3921 líneas; features RBAC/typing/transfer auditadas (admin-concierge.js). | ✅ correcto |

## §C — VEREDICTO (arquitectura final del módulo v2)
1. **Stack**: **Web Component vanilla + Shadow DOM** (aísla CSS/stacking, resuelve #4). **Sin bundler** (invariante #5 INTACTO — refutado el #4 de Gemini): v2 = **pocos archivos vanilla** bien estructurados, cargados async (como hoy). Si el TTI del widget pesa, evaluar un concat/minify simple luego (YAGNI ahora).
2. **Lógica**: **FORK DURO (L-c)** — `js/concierge/v2/` independiente; **NO** se toca ni se extrae de concierge.js. El core compartido = **Firestore** (`conciergeChats`/`solicitudes`) + el motor por hooks globales (`AltorraDualCore`/`_altorraConciergeRespondLocal`) en solo-lectura. Cero divergencia de DATOS (misma BD), divergencia de VISTA aceptada (precio del aislamiento de riesgo).
3. **Flag**: **síncrono** (localStorage `altorra_bot_v2`), resuelto antes de inyectar → `components.js` monta v1 **XOR** v2. **Command queue**: el global se inicializa como `window.AltorraConcierge = window.AltorraConcierge || []` (stub que acumula `open`/`openWithVehicleContext` hasta que el módulo gane la carrera y los drene). v2 expone la **API global idéntica** a v1 (`resetSession`, `openWithVehicleContext`, `applyAuthProfile`, open/close/toggle/send) → auth.js y detalle-vehículo no se enteran del cambio.
4. **Storage**: namespace **separado** `altorra_concierge_v2_session` + migración 1-vía de la key v1 al iniciar (transición suave; rollback por flip = invariante #7).
5. **Modales**: el gate legal (Ley 1581) y el modal de auth se montan en el **DOM global vía CustomEvent** (`altor:request-gate`, `altor:request-auth`), NUNCA dentro del shadow. v2 escucha la respuesta.
6. **Hub (Fase F)**: **Sandbox en el monolito** — `#sec-concierge-v2` + pestaña + JS nuevo + flag UI; cero mutación de `#sec-concierge`/admin-concierge.js vivos.

**Refutados/corregidos**: #4 (bundler por LCP — falso, widget lazy) · #1 específico (dependencia real = `resetSession`, no `applyAuthProfile`).

## §D — Plan de build (Fase D, incremental, gate validador por tramo)
1. Scaffold v2 aislado (nuevos archivos, **cero toque a v1**): `<altor-bot>` + tokens + estado Free Core buttons-only (D6, despliega primero).
2. Estados: LLM chat libre + tarjeta de vehículo inline (C#1) · móvil full-screen (`@container`) · escalado a humano · gate de captura (CustomEvent) · modal de cierre (fix #6).
3. Wiring del flag + command queue en `components.js` (paso más delicado, default→v1, verificado en vivo).
4. Validación en vivo con la **extensión Chrome (conectada)** por tramo. Rollout → poda v1 (`anti-codigo-muerto`).
