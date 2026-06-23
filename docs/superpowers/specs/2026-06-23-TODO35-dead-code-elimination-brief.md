# TODO-35 — Eliminación SEGURA de código muerto (anti-Knight-Capital) · BRIEF para sesión fresca ⟦OPUS-4.8⟧

> Capturado 2026-06-23 (pedido del dueño). **NO decidir aquí**: el dueño pidió una **sesión fresca y
> dedicada** para correr el pipeline completo (`proceso-decision-fuerte`) y tomar la decisión correcta.
> Este brief es el punto de partida para esa sesión. Alinear el resultado en **TODOS los cerebros/proyectos**.

## El problema (en palabras del dueño)
Las actualizaciones hoy se **superponen**: se estrena código nuevo y queda código viejo que "nadie iba a
usar nunca más" — servidores/funciones olvidadas, flags reutilizados, paths huérfanos, código caro dormido.
Eso puede **fugar y afectar el sistema** no solo económicamente sino funcionalmente. El dueño quiere un
mecanismo (¿skill? ¿agente? ¿gate de workflow? **= a decidir**) que, al implementar/mejorar/arreglar,
**revise el código viejo para ELIMINARLO o CUARENTENARLO** — que las actualizaciones **reemplacen y eliminen
lo viejo**, no solo apilen. Disparar **SIEMPRE** en el workflow ante cambios/mejoras/implementaciones/fixes.

## La historia detonante (Knight Capital)
**1 de agosto de 2012.** Knight Capital Group (gigante market-maker de Wall Street) estrenaba código nuevo
(programa RLP) en **8 servidores**. El técnico actualizó **7 de 8**; en el 8º quedó **código viejo de ~8 años**
(la función `Power Peg`, muerta desde ~2003) que nadie iba a usar. Un **flag reutilizado** reactivó ese código
muerto en el 8º servidor. Abrió el mercado 9:30am y el servidor olvidado empezó a **comprar caro y vender
barato** — **~4 millones de operaciones en 45 minutos**. Pérdida: **~$460M** (≈3× su ganancia anual). No
pudieron apagarlo a tiempo. Knight casi quiebra, fue **adquirido meses después** y la empresa independiente
desapareció. **Moraleja del dueño: "en programación, lo que no testeas te quiebra."**

Las 4 causas (para el análisis): (1) **código muerto** dejado en producción; (2) **deploy incompleto** (7/8
servidores — falta de verificación de completitud/atomicidad); (3) **flag reutilizado** (semántica vieja
revivida); (4) **sin test/rollback** que lo cazara.

## Lo que YA existe en el cerebro (no partir de cero — relacionar)
- **IAP §3.4** sección **(C) código muerto** — ya OBLIGA listar código muerto antes de cada commit. → el
  nuevo mecanismo lo **endurece y automatiza**, no lo inventa.
- **Guardián §G.4**: "cuarentenar en `_legacy/`, no borrar; eliminar exige certeza verificada (RCA §19)."
- **`caza-bugs`** (camino vivo) + **`proceso-decision-fuerte`** paso 7 (gate empírico: "lo que no recorres
  te rompe").
- **TODO-30** (Despliegue-DINERO Doble Llave + Staging): el deploy-completeness/atomicidad encaja aquí.
- **Doctrina §3.2** (cambios aditivos, no renombrar) — hay TENSIÓN a resolver: "aditivo" vs "reemplazar y
  eliminar lo viejo". El análisis debe reconciliar ambos (aditivo para no romper callsites EN VIVO; pero
  retirar lo muerto/inalcanzable después, verificado).

## Preguntas abiertas para la sesión fresca (correr el pipeline)
1. **¿Skill, agente, gate de workflow, o combinación?** ¿Es una skill nueva (`code-sunset`/`dead-code-killer`)
   + un agente que detecta código inalcanzable, O un endurecimiento del IAP §3.4.C + caza-bugs existentes?
2. **¿Cómo se detecta "código muerto" de forma SEGURA** en este stack (vanilla JS sin bundler/tree-shaking +
   Firebase Functions)? (callsite-graph, grep de referencias, cobertura, feature-flags, funciones desplegadas
   vs referenciadas). ¿Herramientas (knip, ts-prune, depcheck, coverage) aplican sin bundler?
3. **¿Eliminar vs cuarentenar?** Política: ¿cuándo `_legacy/` vs borrado? ¿periodo de cuarentena? (guardián).
4. **Deploy-completeness (la lección del 8º servidor):** ¿cómo garantizar que un deploy reemplaza en TODOS
   los targets y NO deja una versión vieja viva? (Functions: borrar funciones retiradas con `--only` o purga).
5. **Integración al workflow:** ¿gate disparado SIEMPRE en cambios? ¿parte del gate empírico del
   `proceso-decision-fuerte`? ¿check del `brain-check`/CI?
6. **Alineación ×cerebros:** propagar a cars · bersaglio · inmobiliaria · insema (kernel/skill global).

## Salida esperada de la sesión fresca
VEREDICTO (skill/agente/gate definido) + implementación verificada + propagación a los 4 cerebros + (si es
gobernanza) ADR en `99` + flag en `05`. Capturar deliberación (crudo+síntesis) en bóveda.

---

## ✅ VEREDICTO (2026-06-23 — pipeline `proceso-decision-fuerte`: verificar→arquitecto→comité#1→Gemini→verificar→veredicto)
**Decisión = COMBINACIÓN, secuenciada por 80/20** (no una sola skill/agente):
1. **P0 — GATE mecánico `scripts/deadcode-check.mjs` + `npm run deadcode:check`** ✅ **CONSTRUIDO Y PROBADO 2026-06-23.** Diff POR NOMBRE: `firebase functions:list --json` ↔ `exports.X` del source (parse estático, NO `require` — side-effects). Una desplegada que no está en el source = HUÉRFANA (el 8º servidor). Necesita firebase auth (red) → separado del `brain:check` offline. **Resultado live: 59 source / 58 deployed · 0 huérfanas · 0 dups · `migrateLegacyUsers` en source sin desplegar (one-shot → candidata `_legacy/`).**
2. **P1 — Skill global `anti-codigo-muerto`** (skills/ de los 4 repos): doctrina + procedimiento al estrenar (¿qué viejo reemplaza? cuarentena `_legacy/` → grep referencias → proxy-telemetría si dudas → humano borra en PR tras ≥15d logs limpios) + checklist 4-causas-KC + **tombstones de flags** (Gemini: nunca reciclar nombre; namespacing versionado) + **"prueba el camino vivo con el motor ACTUAL"** (lección botones, M-19) + **invariante: la cuarentena del backend dura > el caché de GH-Pages** (Gemini). 🔜 PENDIENTE BUILD.
3. **P2 — Workflow `auditoria-codigo-viejo` BOUNDED** (roles foreground, NO fan-out que cuelga L-50): detector-código-viejo · caza-bugs · anticipador seguridad/dinero/UX/plataforma. 🔜 PENDIENTE BUILD.
4. **DIFERIDO (epic futuro, NO ahora)**: migración a ESM nativo (Gemini lo proponía para que knip/eslint detecten JS muerto) — es reescritura masiva del código global-scope = riesgo > beneficio hoy; el gate+skill+telemetría dan la seguridad sin eso.

**Verificado vs refutado de Gemini** (regla de oro paso 4): ✅ functions-diff factible (probado); ✅ tombstones/cache-invariant/DOM-disconnect (cazadas que el comité no vio); ⚠️ REFUTADO `require(index.js)` → parse estático; ⚠️ REFINADO "Remoto−Local" → por-nombre (las 5 de southamerica-east1 NO son huérfanas, evita falso positivo); ⚠️ TEMPERADO ESM → epic diferido. Crudo Gemini: `architecture_cleanup_design.md` (Downloads dueño). Comité#1 (4 expertos foreground) → síntesis en `99` al cerrar.
**Pendiente para CERRAR TODO-35**: build P1 (skill ×4) + P2 (workflow) + ADR `99` + flag `05` + crudo a bóveda. Luego → frenar el bot (opción a/b).
