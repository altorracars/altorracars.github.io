# Blueprint Fase 3a — Pipeline de ventas (embudo real con drag-drop)

> **Fase 3a (diseño + build).** Continúa el blueprint maestro (`2026-06-05-crm-rebuild-design.md` §5/§8)
> y Fase 2 (`2026-06-06-crm-fase2-bandeja-design.md`). Autor: Claude (arquitecto). Fecha: 2026-06-06.
> Cliente delegó: *"continuemos"* (defiere al criterio). **Estado**: build → ADR §160.

## 0. Restricciones que mandan
- **Determinista, sin ALTOR/LLM** (igual que Fase 2). Forecast = aritmética (Σ amount×prob), no ML.
- **Aditivo, cero regresión**: `deals` es colección NUEVA; no toca `leads`/`contacts`/`activities` ni el sitio público.
- **Portal único**: el Pipeline es un módulo más del shell `admin-app/` (nav "Pipeline" pasa de "Pronto" → activo).

## 1. Modelo: lead → deal (separación estándar)
- **Bandeja** trabaja `leads` (interés entrante, triage). **Pipeline** trabaja `deals` (venta activa de UN vehículo a UNA persona).
- **Conversión**: acción *"Convertir a oportunidad"* en la tarjeta de la Bandeja y en el 360 → crea un `deal` desde el `lead` (set `lead.status='convertido'`, `lead.convertedTo.dealId`). Patrón Salesforce lead→opportunity.

### 1.1 Colección `deals/{id}` (subset del blueprint §4.3)
`name, contactId, contactName, leadId, vehicleId, vehicleName, pipelineId('ventas'), stageId, stageName,
status('open'|'won'|'lost'), amount(COP), currency('COP'), probability, weightedAmount, expectedCloseDate,
ownerId, ownerName, source, lostReason?, nextStep, lastActivityAt, createdAt, createdBy, updatedAt, updatedBy, _version`.
Timestamps = strings ISO (consistente con Fase 1).

### 1.2 Etapas del embudo (blueprint §5) — hardcoded en `domain/pipeline.js`
| stageId | prob | | stageId | prob |
|---|---|---|---|---|
| nuevo | 10% | | test_drive | 65% |
| contactado | 20% | | negociacion | 80% |
| cita_agendada | 35% | | financiacion | 90% |
| visito | 50% | | vendido | 100% (won) |
| | | | perdido | 0% (lost, requiere lostReason) |
(Editable vía `config/pipelines` = futuro; hoy constante en el dominio.)

## 2. UI (kanban)
- Columnas = etapas; tarjetas = deals (nombre · contacto · vehículo · monto · prob · asesor · rotting).
- **Drag-drop** (HTML5 DnD) entre columnas → `updateDealStage` (recalcula `probability`/`weightedAmount`, escribe `activity` de cambio de etapa). **A11y**: además un menú "Mover a etapa" (popover, teclado) — no solo drag.
- **Editar monto inline** (clic en el monto → input) para que el forecast sirva.
- **Cabecera de columna**: nº deals + Σ monto + Σ ponderado.
- **Barra de forecast** arriba: total pipeline + forecast ponderado (Σ amount×prob de deals open).
- Acciones de tarjeta: mover etapa · marcar **Ganado**/**Perdido** (perdido pide motivo) · editar monto · abrir 360.
- Estados vacío/carga/error; `prefers-reduced-motion`; tokens HarmonyOS.

## 3. Datos
- `subscribeDeals`: `where('status','==','open')` + `orderBy('lastActivityAt','desc')` + `limit` (realtime acotado, P4).
- Agrupación por `stageId` **client-side** (cero índice por etapa). `markWon/markLost` → status + `activity`.
- **Reglas**: `match /deals/{id}` admin-only (read auth, write super_admin/`crm.edit`). **Índice**: `deals(status, lastActivityAt)`.

## 4. Módulos (esta fase)
```
admin-app/src/
  domain/pipeline.js              PURO: STAGES, probFor, weighted, forecast, rotting, dealFromLead
  modules/deals/deals.data.js     subscribeDeals · createDealFromLead · updateDealStage · setAmount · markWon/Lost
  modules/deals/deals.ui.js       kanban + drag-drop + forecast + acciones
  styles/pipeline.css
  core/router.js + layout/shell.js + main.js   ← routing multi-sección (bandeja|pipeline)
```
+ acción "Convertir a oportunidad" en `inbox.ui.js` y `contacts.ui.js`.

## 5. Lo que NO hacemos aún (deliberado)
- ❌ Agenda (Fase 3b, inmediatamente después) · ❌ Reportes (Fase 4) · ❌ `config/pipelines` editable (constante hoy)
- ❌ scheduled rotting/rollups (flag rotting client-side; Cloud Tasks = Fase 4) · ❌ quotes/CPQ (Fase 4)

## 6. Plan de entrega
Build → `npm run build` verde → verificar `?mock=1` (snapshot+eval) → deploy reglas+índice (Claude) + commit + merge a main + push → ADR §160 + lecciones + frescura `05`/`10`/`20`.
