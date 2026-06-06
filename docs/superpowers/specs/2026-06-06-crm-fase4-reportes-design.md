# Blueprint Fase 4 — Reportes / KPIs (tablero del portal)

> **Fase 4 (diseño + plan + build).** Continúa §161 (Agenda). Autor: Claude. Fecha: 2026-06-06. → ADR §165.
> Aprobado por el cliente ("si apruebo lo que recomiendes"). Patrón lean de las fases 2/3 (este spec = diseño + plan).

## 0. Objetivo
La **5ª superficie** del portal `admin-app/` (`#/reportes`): un tablero determinista que responde
*"¿de dónde vienen los leads, cuántos convierto y dónde se mueren?"* — con **atribución de fuente completa**
(dato capturado desde §162/§163/§164 + L-31, justamente para esto). Reusa el dominio existente; **sin ALTOR/LLM**.

## 1. Dato + arquitectura (estrategia A: agregación cliente, $0)
- **Sin backend nuevo, sin reglas, sin índices, sin `CACHE_VERSION`.** Lecturas ya permitidas (`isAuthenticated() || hasPermission('crm.read')`, §9.7). Queries de **campo único** (`orderBy('createdAt','desc') + limit`) → índice automático (L-30). Admin-app = Vite hash-busting → sin bump §4 (L-27).
- **Snapshot con `getDocs`** (no listeners en vivo) + botón "Actualizar". Trae `leads` + `deals` + `activities` acotados (`limit` ~500 c/u, `orderBy createdAt desc`); **agregación en memoria**. Si se alcanza el `limit` → avisar en UI ("mostrando los últimos N"). Rollups/BigQuery = diferido (cuando haya volumen).
- **Timestamps**: strings ISO (confirmado). Buckets de tiempo con `dayKey` LOCAL (no UTC, L-30).
- **Período**: selector Hoy / 7 / 30 / 90 días / Todo (default 30). Filtra `createdAt` en memoria sobre lo traído.
- **Mock (`?mock=1`)**: extender `core/mock.js` con deals `won`/`lost` + leads `convertido`/`perdido` para que embudo/win-rate/ingresos rindan. **Solo afecta mock**, no producción.

## 2. Secciones del tablero
1. **KPIs** (tarjetas `.pstat`/`.reportes__kpi`): leads nuevos · leads activos (no cerrados) · oportunidades abiertas · **pipeline ponderado** (Σ monto×prob) · tasa conversión (`status==='convertido'`/total) · win rate (won/(won+lost)) · valor ganado (Σ monto won) · SLA en riesgo+vencido.
2. **Embudo**: Leads → Contactados → Calificados → Oportunidades (deals creados) → Ganados; conteo + % conversión + caída por etapa.
3. **Rendimiento por canal** ⭐: tabla + barras por `channelOf(lead)`: nº leads, conversión %, oportunidades, ingresos ganados. (ROI ÷ inversión = futuro; falta capturar gasto.)
4. **Forecast por etapa**: barras del pipeline abierto (conteo + Σ monto + Σ ponderado). Reusa `groupByStage`/`weighted`/`PIPELINE_STAGES`.
5. **Tendencia**: línea de volumen por día (leads, y opcional actividades) con `dayKey` LOCAL.
6. **Equipo**: tabla por asesor (`ownerId`/`ownerName`): leads, oportunidades, pipeline ponderado, ganados, win rate. `ownerId` puede ser null → fila "Sin asignar".
7. **Exportar CSV**: del set agregado (RFC-4180, BOM UTF-8, `;`/`,` seguro). Descarga cliente; audit-log = futuro.

**Charts**: SVG/CSS puro con tokens HarmonyOS (no hay librería). Cada chart con su **tabla** (a11y + fuente del CSV). `aria-label` con valores; respeta `prefers-reduced-motion`.

## 3. Módulos
```
admin-app/src/
  domain/reports.js            PURO (sin DOM/Firestore): inRange(rows,startISO) · kpis({leads,deals}) ·
                               funnel({leads,deals}) · bySource(leads,deals) · byStage(deals) ·
                               byOwner(leads,deals,team) · trendByDay(rows, field)
  modules/reportes/
    reportes.data.js           loadReports({onData,onError}) — getDocs leads+deals+activities (limit,orderBy);
                               rama store.mock → getMock*(); devuelve unsubscribe no-op
    reportes.charts.js         barChart(rows,opts) · lineChart(points,opts) → nodos DOM (el()); UI helper
    reportes.ui.js             mountReportes(root): filtro período + Actualizar + KPIs + 6 secciones + CSV; cleanup
  styles/reportes.css          BEM .reportes__*
```
**Wiring** (los 5 puntos verificados en el scan):
- `core/router.js` ROUTES: `+ 'reportes'`.
- `main.js`: `import { mountReportes } …` + `import './styles/reportes.css'` + `MODULES.reportes = mountReportes`.
- `core/layout/shell.js`: NAV `reportes` ya existe → `ready:true`; TITLES `+ reportes`.
- `core/mock.js`: añadir won/lost (aditivo).

## 4. No-regresión / patrones (réplica exacta verificada)
- Contrato `export function mountReportes(root){ … return cleanup }`; cleanup setea `alive=false` (guarda contra `getDocs` que resuelve tras desmontar) — análogo a `ui.sub=null`.
- DOM solo con `el()/clear()` de `core/dom.js` (cero `innerHTML` con datos → XSS). Eventos por delegación `data-action`.
- Mock-first: `if (store.get().mock) { … getMock*(); return; }` antes de tocar Firestore.
- Tokens verbatim (`--gold-*`,`--ink-*`,`--temp-*`,`--ch-*`,`--s-*`,`--r-*`,`--t-*`,`--dur-*`,`--ease-*`); cero hex hardcodeado; `:root[data-theme='dark']` overrides; scroll en sección con `overflow-y:auto; min-height:0`.
- Aritmética del dominio existente (forecast = Σ monto×prob); cero reimplementación de scoring/stages.
- IDs/funciones de otros módulos INTACTOS; nada se renombra.

## 5. Verificación
`npm run build` verde → preview `?mock=1`: snapshot (estructura/secciones) + `preview_eval` (conteos, totales KPI, suma del embudo, win-rate a mano) — **no screenshots** (L-28). Revisión adversarial multi-agente (correctness de agregaciones, fidelidad de patrón/regresión, a11y, mate del embudo/win-rate) ANTES del deploy.

## 6. Entrega
Build → verificar → **deploy automático** (commit + merge a `main` + push; sin rules/indexes/cache) → ADR §165 + fila `00-INDICE` + lección(es) `30` si surgen + frescura `05`/`10` + `brain:check`.

## 7. NO ahora (YAGNI / diferido)
Reportes por email programados (cron) · rollups/BigQuery · constructor de reportes custom · ROI ÷ inversión (capturar gasto) · KPIs de inventario (`vehiculos` no migrado) · PDF · audit-log de exportaciones (Fase 5) · atribución multi-touch.
