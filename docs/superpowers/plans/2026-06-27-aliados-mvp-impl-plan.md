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
| 2 | Rules: `tenancy` válido en `vehiculos` (tipoTenencia is string) + `commissionSnapshots` server-only + test de paridad | `firestore.rules` (+`firestore-rules*.test.js`) | ⏳ |
| 3 | `dealWon` → snapshot **enriquecido append-only**: lee `vehiculos/{vehicleId}.tenancy`, computa `altorraRevenue` por método, graba `commissionSnapshots[rev:1]`. ⚠️ ANTES: grep consumidores de `commissionSnapshot` (singular) y migrarlos. Manual/advisorCommission/fundsFlow vienen de campos del deal que setea el chunk 5 (defensivo: defaults si ausentes) | `functions/src/crm/dealWon.js`, `onDealUpdated.js` | ⏳ |
| 4 | Trigger espejo `tenancy`→legacy `concesionario`/`origenTipo` con **guard anti-loop** + sacar `concesionario` de `AUDIT_FIELDS` (vehicle.js:234-236) | `functions/src/crm/*` (onWrite vehiculo) | ⏳ |
| 5 | UI tenancy/economics en el CRM de vehículos (PROPIO/ALIADO/CONSIGNA/EXTERNO + método + baseline/rate/flat) + captura de monto MANUAL + fundsFlow en el gate "Vender" | `admin-app/src/modules/vehicles/{vehicles.data,vehicles.ui,wizard}.js` (+ `deals` gate vender) | ⏳ |
| 6 | F42: `fetchDealerStats`/reportes leen `altorraRevenueOf(deal)` desde snapshots (mata el $0; hoy lee `comisionAltorra||utilidadAltorra||utilidadTotal` undefined) | `admin-app/src/modules/dealers/dealers.data.js`, `admin-app/src/domain/reports.js` | ⏳ |
| 7 | Pre-req dry-run (read-only, Firebase MCP): contar `vehiculos` donde legacy `concesionario` ⊕ `tenancy.type` DISIENTEN antes de cualquier backfill | script / MCP | ⏳ |

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
