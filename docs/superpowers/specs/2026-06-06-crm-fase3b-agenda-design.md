# Blueprint Fase 3b — Agenda unificada (un solo calendario)

> **Fase 3b (diseño + build).** Continúa §160 (Pipeline). Autor: Claude. Fecha: 2026-06-06. → ADR §161.

## 0. Objetivo
**UN solo calendario** en el portal nuevo (blueprint §8) — la 3ª superficie. Resuelve el dolor de duplicación: el admin viejo tiene una Agenda real + un mini-calendario en la Bandeja (§8.3 handoff). El portal nuevo tiene UNA agenda; no se replica el mini-cal.

## 1. Dato (gap conocido + solución)
- El canónico Fase 1 **no guarda fecha/hora de cita** (la ingestión no mapeó `fecha`/`hora` de `solicitudes`). → La Agenda muestra **`activities` con `dueAt`** (citas agendadas). 
- **Acción "Agendar"** en el Customer 360 → crea `activity{type:'cita', dueAt, subject, relatedTo:{type:'lead',id,name}, status:'open'}`. Eso puebla la Agenda. (Mapear las citas viejas de `solicitudes` al canónico = enhancement de ingestión, futuro.)
- **Query**: `activities where dueAt >= gridStart && dueAt < gridEnd orderBy dueAt` — rango sobre UN campo → **índice de campo único AUTOMÁTICO** (sin índice compuesto, sin deploy de índices). Lectura/escritura de `activities` ya permitida por reglas Fase 1 (sin cambios de reglas).

## 2. UI
- **Vista mes**: cabecera (mes/año + ‹ hoy › navegación), grilla 7 columnas (Lun–Dom), celdas de día con chips de evento (hora + nombre), día de hoy resaltado, días fuera de mes atenuados.
- Click en evento → abre el **360** del lead relacionado. Click en día → panel del día (lista de eventos).
- **Agendar** desde el 360: botón "📅 Agendar" → popover con `datetime-local` → `scheduleActivity`.
- Estados vacío/carga; tokens HarmonyOS; responsive (mes → lista en móvil); `prefers-reduced-motion`.

## 3. Módulos
```
admin-app/src/
  domain/agenda.js              PURO: monthMatrix(year,month), dayKey, groupByDay, gridRange
  modules/agenda/agenda.data.js subscribeRange(startISO,endISO,onData) · scheduleActivity(lead,dueAt,subject)
  modules/agenda/agenda.ui.js   vista mes + navegación + panel de día
  styles/agenda.css
  core/router(+agenda) · shell(nav agenda activo) · main(+módulo)
  modules/contacts/contacts.ui.js  ← botón "Agendar"
```

## 4. NO ahora
- ❌ Disponibilidad/festivos/slots (config — futuro) · ❌ vista semana/día · ❌ drag para reprogramar · ❌ citas standalone sin lead · ❌ mapear citas viejas (ingestión).

## 5. Entrega
Build → verificar `?mock=1` → **deploy automático** (commit + merge a main + push; NO requiere rules/indexes nuevos) → ADR §161 + frescura.
