# Plan de implementación — MVP Aliados / Restructura comercial (TODO-25) ⟦OPUS-4.8⟧

> **Fecha:** 2026-06-27. Modelo: Opus 4.8 ⟦rev-Fable⟧.
> **Diseño FROZEN** (no re-deliberar): bóveda `../brain-private/altorracars/2026-06-13-restructura-comercial-origen-comisiones.md` §9 (Gemini Pro High + comité, dueño aprobó).
> **Hallazgo que lo subió de urgencia:** `docs/superpowers/specs/2026-06-26-aliados-flujo-reconciliacion-hallazgo.md` (todo el negocio es de aliados; comisiones=$0 en vivo).
> **Orden del dueño (2026-06-27):** implementar TODO lo pendiente empezando por aliados; bugs/errores al FINAL.

## Modelo FROZEN (§9)
```
vehiculos/{id}.tenancy = { type:'PROPIO'|'ALIADO'|'CONSIGNA'|'EXTERNO',
  ownerRefId, economics:{ method:'SPREAD'|'PERCENTAGE'|'FLAT'|'MANUAL',
  baselineValue, percentageRate, flatFee } }   // espejo legacy concesionario/origenTipo via onWrite (+guard)
deals/{id}.commissionSnapshots: [ { rev, createdAt, createdBy, salePrice, vehicleId,
  frozenTenancy, altorraRevenue, advisorCommission, fundsFlow, isManualOverride, auditReason } ]  // APPEND-ONLY; F42 lee el ultimo
```

## Chunks (committeables a `dev`; deploy de functions/rules = GATE DINERO M-18/TODO-30)

| # | Chunk | Archivos | Estado |
|---|---|---|---|
| **1** | Primitivas económicas (spine): enums + `computeAltorraRevenue` + `roundCOP` + `normalizeTenancy` + `buildCommissionSnapshotEntry` + `latest/altorraRevenueOf` + tests | `functions/shared/crm-spec.js` (+test) | ✅ **DONE** (be996e8, 36/36 verde, INERTE) |
| 2 | Rules: `commissionSnapshots` server-only (create+update) + tests ✅; validación de `tenancy` en `vehiculos` → va con chunk 5 | `firestore.rules` (+`firestore-rules.test.js`) | ✅ parcial (**6f371ab**); tenancy-rule → ch.5 |
| 3 | `dealWon` → snapshot **enriquecido append-only**: lee `vehiculos/{id}.tenancy` en la tx, computa `altorraRevenue` por método, graba `commissionSnapshots[rev:1]`; idempotencia array+singular; `crmDailyJob` backfill | `functions/src/crm/dealWon.js`, `ops/crmDailyJob.js` (+emu test) | ✅ (**6f371ab**, 160/160) |
| 4 | Trigger espejo `tenancy`→legacy `concesionario`/`origenTipo` con **guard anti-loop** | `functions/src/crm/*` (onWrite vehiculo) | ⏭️ **N/A MVP** — la UI escribe `concesionario`+`tenancy` coherentes (`buildTenancy`); el trigger sería red de seguridad para escrituras no-UI (futuro) |
| 5 | UI tenancy/economics en el vehículo (deriva type/ownerRefId del `concesionario` + método/baseline/rate/flat) + captura de **ganancia MANUAL** en el gate "Vender" | `domain/vehicle.js` (`buildTenancy`), `vehicles/wizard.js`, `deals/deals.ui.js` | ✅ (**7d51413**, build verde) |
| 6 | F42: `fetchDealerStats`/reportes leen `altorraRevenueOf(deal)` desde snapshots (mata el $0) + `pipeline.js` mirror + legacy-fallback en readers | `dealers.data.js`, `reports.js`, `deals.ui.js`, `domain/pipeline.js` | ✅ (**fc591a5**, source-only; dist→batch) |
| 7 | Pre-req dry-run (contar `concesionario` ⊕ `tenancy` antes de backfill) | script / MCP | ⏭️ **N/A MVP** — forward-only, sin backfill masivo (ventas viejas quedan como están) |

> **Estado (2026-06-27):** **MVP COMPLETO EN CÓDIGO** — chunks **1·2·3·5·6 ✅** en `dev` (be996e8·6f371ab·fc591a5·7d51413), tests 160/160 + build admin-app verdes. Chunks 4 y 7 = **N/A para este MVP** (ver filas). **NO desplegado**: falta (a) **verificación en vivo** del render (mock `?mock=1` + post-deploy), (b) **rebuild dist + `firebase deploy` functions+rules**, (c) **merge dev→main**. Es la feature de DINERO (M-18) → el dueño autorizó "todo"; pendiente confirmar el momento/forma del deploy + si quiere revisar el render primero. Sin tenencia capturada, `altorraRevenue=0` = cero regresión.

## Decisiones ya tomadas (no re-preguntar)
- **Default aliados = `MANUAL`** (requisito #1 del dueño; el monto se digita al cierre → no necesita fórmula).
- **SPREAD** disponible: `baselineValue = NETO de la contraparte` (aliado recibe lo mismo siempre; ganancia = venta − neto). Caso real: neto 54M → vende 60M = 6M.
- **IVA/retención** = tiempo de REPORTE (gate contador), NO en la BD. Solo se captura `fundsFlow` crudo.
- **Snapshot, NO ledger** de doble partida (sobre-ingeniería a 0-5 ventas/mes). Array append-only da audit-trail.
- **Clásico "Vender"**: `admin.html` ya retirado→`_legacy/`+redirect (cutover §255) → item #4 del MVP casi satisfecho; VERIFICAR, no reconstruir.

## Open items DIFERIDOS (no bloquean MVP; del §9)
- Confirmar aliado-neto-constante (lo esquiva MANUAL). · Fórmula matriz fiscal (contador). · Escrow #0 (capturado crudo). · Aritmética COP fina · ventas financiadas (caja vs devengo). · Limpiar doc basura `concesionarios/dfsfdfdfs`.

## GATE de despliegue (M-18 / despliegue-DINERO TODO-30)
Todo se codea+commitea a `dev`. El **deploy de functions/rules a producción lo autoriza el dueño** (dinero). Chunks 1/5/6 son build-only (admin-app/lógica), sin deploy de functions.
