# PLAN — Auditoría de FIABILIDAD del cerebro (documentado ≠ real) con el FLUJO

> **Disparador:** dueño (2026-06-26): *"el cerebro no nos está funcionando, documentamos un montón de cosas que se nos han perdido y quién sabe cuántas más; no está dando fiabilidad, necesitamos revisarlo con el flujo."* Detonado por el canary de aliados (§204/§205 "✅" pero el flujo comercial NUNCA se ejecutó).
> **Estado:** PLAN. Ejecución = **post-próximo-merge `dev`→`main`**, en TURNO LIMPIO dedicado. TOP prioridad (sobre el build F1 del rediseño). Modelo: Opus 4.8 ⟦rev-Fable⟧.
> **GATE W-11:** Decisión Fuerte (gobernanza del cerebro + posible kernel ×3) → flujo COMPLETO.

## El problema (causa raíz, verificado vía aliados)
El cerebro valida su estructura INTERNA (`brain-check`: huérfanos/topes/índice/refs) pero **no tiene ninguna capa que verifique sus afirmaciones contra la REALIDAD externa** (código / datos Firestore / estado desplegado). Consecuencias:
- "✅" conflaciona estados radicalmente distintos: DISEÑADO ≠ DECIDIDO ≠ CONSTRUIDO ≠ DESPLEGADO ≠ VERIFICADO-LIVE.
- Items "diseñados/decididos" (ej. TODO-25 comercial aliados) se tratan como más-resueltos de lo que están → se "pierden".
- **TODO-33 ("Reconciliación cerebro↔web real") existía y se aplazó crónicamente ("al final")** — el aplazamiento ES la meta-falla.

## Flujo a correr (W-11 / proceso-decision-fuerte)
1. **VERIFICAR / Fase A — el núcleo: RECONCILIACIÓN subsistema-por-subsistema.** Por cada afirmación "✅ hecho / decidido / live" del cerebro (señales de `05`, ledger TODO de `10`, ADRs de `99` que declaran features en producción), verificar la **realidad triple**: (a) ¿existe en el código?; (b) ¿los datos vivos lo respaldan? (Firestore MCP `firestore_query_collection`); (c) ¿está desplegado? (functions/rules). Agentes ACOTADOS (in-cwd + Firestore MCP, inline+schema, sin tools gateadas — L-50), uno por subsistema/lote de ADRs. **Salida = MATRIZ: afirmación → estado documentado → estado real → brecha → severidad.**
   - Subsistemas a barrer: CRM (leads/deals/activities/pipeline/agenda/reportes) · captura/ingestión · aliados/comercial (TODO-25/§204/§205) · Hub/bot (TODO-34) · módulos portados (reviews/banners/marcas/vehículos/atributos/usuarios/roles/deptos/workflows/auditoría/ajustes/respaldos) · functions desplegadas · rules/índices · cache/deploy.
2. **SKILLS:** `auditoria-cerebro` (metodología Nivel-2) + `asesor-critico-honesto` (anti-complacencia) + `arquitecto-software` (la cura estructural).
3. **CAUSA RAÍZ:** por qué se pierde fiabilidad (sin gate de reconciliación; "✅" miente; append-only; TODO-33 diferido).
4. **COMITÉ ×3 ACOTADO** sobre la matriz + la cura.
5. **CONSEJO EXTERNO (Gemini):** crítica adversarial de la cura → verificar cada claim.
6. **VEREDICTO + CURA ESTRUCTURAL (el verdadero entregable):**
   - (a) **Estados explícitos** en vez de "✅": DISEÑADO/DECIDIDO/CONSTRUIDO/DESPLEGADO/VERIFICADO-LIVE.
   - (b) **Marcador `verificado-vivo: <fecha>`** en afirmaciones sobre el mundo externo + **check del linter que AVISA cuando está stale** (mecanizado, no [HONOR]) — cierra el hueco de `brain-check`.
   - (c) **Reflejo de reconciliación periódica** con gate (no diferible "al final").
   - Posible cambio de **kernel ×3** (originar en canon bersaglio, peer-hash) si la cura es un check.
7. **CIERRE:** ADR en `99` + fila `00` + lecciones `30` (familia M-10/M-16: mecanizar la reconciliación) + arreglar los gaps concretos hallados (cada uno su mini-cierre) + `brain:check`.

## Entregables visibles al dueño
- **La MATRIZ de reconciliación** (qué estaba documentado como hecho y NO lo está) — en cristiano, ordenada por severidad/negocio.
- El **prompt de Gemini** (artefacto consejo externo) + la **cura estructural** propuesta.
- Lista de gaps a arreglar + cuáles son decisión del dueño.

## Nota
Esto NO es para botar el cerebro (continuidad/lecciones/deliberaciones SÍ funcionan). Es para añadirle la capa de fiabilidad que le falta y dejar de aplazarla. La existencia misma de este plan + su TOP prioridad es el primer acto de no-aplazamiento.
