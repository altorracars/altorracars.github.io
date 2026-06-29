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
**Sub-chunk A — camino del DATO ✅ (commits, 164 tests verdes, additivo, sin deploy):**
1. ✅ **Primitivas puras** `crm-spec.js`: `tenancyRefTypeOf` + `normalizeTenancy` (ownerRefType/ownerDisplayName)
   + `tenancyGroupKey` (tupla tipada + cubo). 38 tests.
2. ✅ `domain/vehicle.js` `buildTenancy`: CONSIGNA setea ownerRefId/Type/DisplayName desde `f.consignante` (null=anónima).
3. ✅ `domain/pipeline.js`: espejo ESM `tenancyRefTypeOf`/`tenancyGroupKey` + **paridad afirmada** (crm-spec-parity).
4. ✅ `dealWon.js` = **NO-OP** (ya pasa `tenancy` entero → `normalizeTenancy` lo enriquece; el snapshot congela los 3 campos solo).
**Sub-chunk B — captura + presentación ⏳ (toca UI/server/prod → su propio deploy + val.live):**
5. ✅ callable `crmUpsertConsignante` (`src/crm/consignanteAdmin.js` + index.js): Admin SDK, **id por CÉDULA** (no phone), **docId opaco** (auto-id, no PII), idempotente (arrayUnion rol sin pisar consent/lifecycle del lead/retoma previo). Sintaxis OK + test `normalizeCedula`. Additivo, **NO desplegado**.
6. ✅ UI wizard (`wizard.js`): selector de consignante + alta inline (mini-form → callable); drafts persisten `vConsignanteId/Nombre`; formState pasa `consignante`+`concesionarioNombre` a buildTenancy. `vehicles.data.js`: `fetchConsignantes` (roles array-contains) + `createConsignante`. **rules = no-op** (callable=Admin SDK bypasea; selector lee con crm.read). Build verde.
7. ✅ `fetchDealerStats` → `{byDealer, consignantes}` por `tenancyGroupKey` (consignas + cubo, nombre desnormalizado) + `dealers.ui` sección "Consignantes particulares". Build verde. (Tabla de alias de las 4 viejas = sub-paso futuro, no bloquea.)
8. ✅ **Auditoría PII `generate-vehicles.mjs`: PASA** — `esPropio` usa solo `concesionario`; NUNCA publica `consignaParticular`/`ownerDisplayName`; consigna → omite placa+seller. Sin fuga.
9. ✅ **deploy + validación LIVE 28/06** (Claude condujo Chrome, dueño logueado): functions desplegadas; merge dev→main (dueño) → Pages OK. Verificado: render selector consignante + nota legal · reporte Aliados con `fetchDealerStats` v2 (sin romper, sección consignantes en estado-cero ausente = correcto) · network 8/8 200 · auditoría PII generate-vehicles OK · **callable crea contact con docId OPACO + roles + cédula + consent.habeasData=null** (Firestore verificado).
   **🔴 BUG cazado + FIXED en vivo (gema de la validación adversarial):** `crmUpsertConsignante` escribía `dedupKeys` con la cédula, pero el trigger **`onContactWritten`** reconciliaba el índice con `dedupKeysFor` (email/phone ONLY) → consideraba la clave de cédula "sobrante" y la **BORRABA** (desacople de contrato cross-trigger; invisible en código aislado y tests unitarios — solo emerge con ambos artefactos vivos). **Fix:** `dedupKeysFor` (contactGraph.js) ahora incluye la cédula (aditivo: lead sin cédula no cambia) + 3 tests. Re-validado LIVE: 3er consignante → `dedupKeys:["cedula_X","phone_X"]` ✅. **Lección → `30` (L-NN cross-trigger dedup).** Limpieza: 3 contacts `ZZZ PRUEBA` (cédulas 99999999/88888888/77777777) a suprimir (dueño, vía Contactos → Ley 1581).
**Fase 2 (legal) — estado 28/06:**
- ✅ **Research/diseño legal** (lóbulo 42 LEGAL-07): marco Ley 1581/Dec.1377/Cód.Comercio + finalidades discretas + modelo `consent.habeasData` + supresión rol-aware + **borrador de la cláusula** del contrato.
- ✅ **Mecanismo `consent.habeasData` por finalidad DESPLEGADO** (callable + mini-form `<details>` con nº contrato + 4 finalidades; additivo, `null` sin contrato; +3 tests; policyVersion=`v1-borrador`).
- ✅ **Fase 2c — supresión rol-aware IMPLEMENTADA + VERIFICADA (28/06 ⟦OPUS-4.8⟧).** `executeSuppression` +
  `redactConsignanteReferences` (contactGraph.js): el nombre del consignante se purga por soft-redact en los DOS lugares
  donde sobrevive a la supresión-por-grafo (que busca por `contactId`, pero el consignante se referencia por `ownerRefId` —
  el `deal.contactId` es el COMPRADOR): (a) `vehiculos.tenancy.ownerDisplayName` (tenencia viva, query por `tenancy.ownerRefId`
  auto-indexado) y (b) `deals.commissionSnapshots[].frozenTenancy.ownerDisplayName` (barrido paginado completo: array de mapas
  no consultable + cubre won-luego-anulado). Conserva `ownerRefId` opaco + economics; idempotente/resumible. auditLog registra
  `{vehiclesRedacted, dealsRedacted, snapshotEntriesRedacted}` (art. 12). **Tests:** 13 puros (`contactGraph.redact.test.js`)
  + emulador E2E rol-aware + **multi-rol/retoma** (`contactGraph.emulator.test.js`) — 300 verdes. **Revisión adversarial 4 lentes
  (PII/legal/regresión/conformidad) = 4×SOLIDO_CON_CAMBIOS**; accionados: `snapshotEntriesRedacted` al auditLog + test multi-rol;
  rechazado (alucinación): "índice no registrado" (no existe `firestore.indexes.json`). Lección → `30` L-57. **DEPLOYED ✅ 28/06**
  (`crmDailyJob`+`crmRunDailyMaintenance`, commit `224758d`).
- ✅ **CERTIFICACIÓN LEGAL (28/06, comité ×5 vs `.gov.co`, confianza ALTA): `CUMPLE_CON_CAMBIOS`.** Cédula: SÍ defendible
  destruirla (el soporte es factura+contrato firmado, no la cédula). **Hallazgo que el código-review no vio:** borrar el contacto
  mataba `contractRef` → snapshot económico HUÉRFANO. **C1 (rescatar contractRef+policyVersion+purposes al auditLog durable) +
  C4 (conteo MATCHED exacto art.12) IMPLEMENTADAS + verificadas** (301 tests). C2 (cédula en backups .gz 45d) pend.; C3 (relojes de
  conservación 10a vs firmeza renta) + C5 (exógena DIAN) = **colegiado/contador**. Detalle → `42-LEGAL` §Certificación. CRUDO → `tasks/w3qios44d.output`.
- ⏳ **PENDIENTE: validación live** (suprimir un consignante de prueba + ver `auditLog.counts.snapshotEntriesRedacted` + `habeasProof.contractRef`).
- ⏳ **Ratificación del TEXTO** del contrato por abogado colegiado (gate duro) → fija `policyVersion: v1` (dueño). **+ pregunta
  nueva para el abogado** (revisión legal 28/06): ¿destruir la cédula en la BD viva satisface Cód.Comercio art.60/DIAN dado que el
  soporte mercantil es el contrato firmado físico? Detalle → `42-LEGAL` LEGAL-07.

## Auditar antes de cerrar (fuga señalada por el SRE)
`generate-vehicles.mjs` (SEO): verificar `esPropio === (concesionario==='')` y que el **nombre/cédula del
consignante JAMÁS** salga al HTML público indexable.

## Meta-lección (portable)
La verificación del SISTEMA VIVO (no solo código) cazó que `_particular` está muerto y el dueño usa un
workaround (persona en `concesionarios`) — invisible en el código. Y verificar la afirmación de Gemini contra
las rules (inmutabilidad lógica) **refutó** una solución cara (crypto-shredding). El consejo externo vale por
lo que se VERIFICA de él, no por lo que dice.
