# TODO-50 — Consigna = ENTIDAD FORMAL · deliberación del FLUJO FUERTE (síntesis)

> **Fecha:** 2026-06-28. Modelo: Opus 4.8 ⟦rev-Fable⟧. Disparador: orden del dueño "vía flujo
> fuerte". Es Decisión Fuerte (modelo de datos + legal Habeas Data). Insumo: ADR §259 + este doc.
> **Estado:** diseño CERRADO (evidencia + comité ×4 + Gemini verificado). Chunk 1 = primitivas puras ✅.
> CRUDO de subagentes → `tasks/wia8u70ib.output` (comité) + respuesta Antigravity pegada por el dueño en chat.

## El problema (verificado, no asumido)
Hoy el origen del vehículo = string `vehiculos.concesionario` (`''`=PROPIO · slug=ALIADO · `_particular`=CONSIGNA anónima).
Objetivo: elevar al **consignante particular** a entidad con identidad + Habeas Data para (a) agrupar la
ganancia de Altorra por consignante y (b) cumplir Ley 1581.

## Evidencia de Fase A (código + datos vivos Firestore 28/06)
- **`_particular` está MUERTO (0 usos).** El dueño mete a las personas que consignan (Alexander Daza,
  Ernesto Pertuz, Fernando Valiente, Merwin Baiter) como docs en `concesionarios` (colección de aliados-NEGOCIO)
  → mezcla persona con empresa, sin cédula ni consentimiento. Basura viva: `concesionarios/dfsfdfdfs`.
  `usados-de-la-costa` = aliado-negocio real (18 carros).
- **`fetchDealerStats`** (dealers.data.js:47-72) agrupa comisiones por `frozenTenancy.ownerRefId`; para
  CONSIGNA `ownerRefId=null` (buildTenancy solo lo setea para ALIADO) → **descarta las consignas** = no agrupa.
- **`contacts`** ya es "la persona unificada" (rules:445): tiene `consent` map (`{askedAt,calls,email,whatsapp,policyVersion}`),
  índice `dedup` (email/phone→id), FUSIÓN y **SUPRESIÓN Ley 1581** (borra PII tras 72h, conserva historial anónimo).
  docId DERIVA de email/phone (= PII). Hoy se crean SOLO por ingesta server (no hay alta manual).
- **`retomaVehicleId`** existe en `firestore.rules` (deals, 548/580) → **Altorra YA modela retomas (trade-in)**
  → una persona puede ser consignante Y comprador (dato que decidió el fork, ver Gemini).
- **Inmutabilidad del snapshot = LÓGICA, no física:** rules deals bloquean al CLIENTE tocar `commissionSnapshots`
  (`dealServerFieldsUntouched`), pero el **Admin SDK BYPASEA** (comentario rules:496) → soft-redact server-side
  futuro es posible (ya es el patrón de `contactGraph.executeSuppression`). **Esto refuta el crypto-shredding.**

## Comité ×4 ACOTADO (inline+schema, sin tools — L-50; 83s, 0 cuelgues). Veredicto unánime: SOLIDO_CON_CAMBIOS
**🔴 Fallo fatal CONVERGENTE (los 4): snapshot-inmutable ↔ contactId-derivado-de-PII ↔ supresión-1581 = contradicción.**
Congelar `ownerRefId=contactId` en un snapshot inmutable: (a) FK colgante si el contact se borra/fusiona →
reporte se desreferencia; (b) PII fosilizada que viola el propio derecho de supresión que justifica la tarea.
- **arq-datos / SRE:** ownerRefId polimórfico SIN discriminador → slug y contactId (ambos strings) colisionan.
- **ejecutor:** dedup-por-phone es correcto para LEADS, INCORRECTO para consignantes (familia comparte tel) →
  atribuye la ganancia a la persona equivocada = corrompe el objetivo. Identidad de negocio = **cédula**.
- **legal:** el checkbox lo teclea el ADMIN, no el titular → NO es autorización válida (falso cumplimiento,
  peor que nada). Vehículo legal real = **contrato de consignación firmado**; consent por FINALIDAD (no un flag);
  supresión vs conservación mercantil (Cód.Comercio art.60 / DIAN) = la supresión NO puede ser ciega al rol.
- **ejecutor:** chunk 1 (reporte) se entrega SIN nada legal; Habeas Data = fase 2 gated abogado.

## Consejo externo (Gemini 3.1 Pro vía Antigravity) — VERIFICADO claim por claim (regla de oro)
- ✅ **Adoptado:** A (contacts) corrompe por dedup-phone (converge con comité). Persona multi-rol por **retoma**
  (VERIFICADO: `retomaVehicleId` existe) → no fragmentar en colección aislada. Opción C (entidad-persona + roles,
  **supresión por rol**) = correcta en ESPÍRITU.
- 🔴 **REFUTADO con evidencia:** (1) **crypto-shredding** (DEK por consignante) = sobre-ingeniería: la inmutabilidad
  es LÓGICA (Admin SDK bypasea) → soft-redact server-side basta (el propio Gemini lo concede). (2) "colección
  `personas` nueva + migrar" = desproporcionado para 0-5 ventas/mes; `contacts` YA es la persona unificada →
  `roles[]` = C sin colección nueva. (3) "snapshots viejos resuelven a Altorra por defecto" = falso (§259.3: → `altorraRevenue=0`).

## DECISIÓN DE MODELO (cerrada)
Consignante = **`contact` con `roles:['consignante']`** (arrayUnion; maneja multi-rol/retoma) · **docId opaco**
(auto-id, NO PII) · identidad de negocio = **cédula** en `dedupKeys` (no en docId, no colapsa por phone) · el
snapshot congela **`{ownerRefType, ownerRefId, ownerDisplayName}`** (puntero tipado + nombre desnormalizado) ·
supresión **rol-aware + soft-redact** (NO crypto-shredding) · reporte agrupa por **tupla** `(type,ownerRefId)`
con cubo "Sin identificar" · 4 viejas se reconcilian por **tabla de alias en lectura** (sin tocar snapshots).

## Decisiones del dueño (todas = mis recomendaciones, aprobadas 28/06)
1. Prioridad = **reporte (chunk 1) primero**, Habeas Data = fase 2. 2. Consigna anónima **permitida** (cubo
"Sin identificar"). 3. Reconciliar las 4 viejas vía **alias en lectura**. 4. Texto legal = **gate abogado**
(si no hay aún, fase 2 bloqueada; chunk 1 avanza). 5. Limpiar `dfsfdfdfs` (commit aparte, verificar 0 refs).

## Plan del Chunk 1 (additivo, cero legal) + estado
1. ✅ **Primitivas puras** `crm-spec.js`: `tenancyRefTypeOf` + `normalizeTenancy` (ownerRefType/ownerDisplayName)
   + `tenancyGroupKey` (tupla tipada + cubo). 38 tests verdes.
2. ⏳ `domain/vehicle.js` `buildTenancy`: CONSIGNA setea ownerRefId/Type/DisplayName desde `f.consignante` (null=anónima).
3. ⏳ `dealWon.js`: congela los 3 campos (ya pasa `tenancy` entero → normalizeTenancy los incluye).
4. ⏳ `fetchDealerStats`: agrupar por `tenancyGroupKey` (incluye consignas + cubo) + tabla de alias de las 4 viejas.
5. ⏳ callable `crmUpsertConsignante` (Admin SDK, dedup por cédula, auto-id opaco, arrayUnion rol).
6. ⏳ `firestore.rules` + UI wizard (selector consignante, ver mockup) + emulator tests.
7. ⏳ deploy + validación LIVE (yo conduzco Chrome: caminos estado-cero del veredicto).
**Fase 2 (legal, gated abogado):** consent por finalidad + supresión rol-aware + soft-redact de snapshots.

## Auditar antes de cerrar (fuga señalada por el SRE)
`generate-vehicles.mjs` (SEO): verificar `esPropio === (concesionario==='')` y que el **nombre/cédula del
consignante JAMÁS** salga al HTML público indexable.

## Meta-lección (portable)
La verificación del SISTEMA VIVO (no solo código) cazó que `_particular` está muerto y el dueño usa un
workaround (persona en `concesionarios`) — invisible en el código. Y verificar la afirmación de Gemini contra
las rules (inmutabilidad lógica) **refutó** una solución cara (crypto-shredding). El consejo externo vale por
lo que se VERIFICA de él, no por lo que dice.
