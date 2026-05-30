# SP-5.2.c.3 — Comparador cinematic (flotante + página) · Design

**Fecha:** 2026-05-30 · **Estado:** aprobado por el cliente ("arranca con lo que recomiendes").

## Contexto
El comparador tiene 3 piezas. Hoy: flotante viejo abajo-derecha (choca con el bot ALTOR), no cinematic, **máx 3**; página `comparar.html` con tabla de 3 columnas legacy; el flotante NO aparece en el index. Diseño objetivo = `altorra-cars-design-system/project/redesign/Compare.jsx` (slots A/B + VS + picker inline + diff dorado + veredicto, **máx 2**).

## Decisiones aprobadas
- **Máx 2 vehículos** (era 3) → `vehicleComparator.maxVehicles = 2`.
- **Picker inline** (elegir vehículo dentro del comparador, sin salir a búsqueda).
- **Flotante cinematic + abajo-IZQUIERDA** (lejos del bot, que vive abajo-derecha).
- **Flotante también en el index** (unificado), coordinando con el sistema de "comparar" del index (`home-carousels.js`).
- **Orden:** Paso 1 flotante (transversal, resuelve la queja visible) → Paso 2 página. Dos commits atómicos.

## Paso 1 — Flotante cinematic
- Rediseñar `#comparador-widget` (HTML que genera `comparador.js` + estilo en `comparador.css`): paleta cinematic (--cin-* / dorado), posición `bottom-left`, animación de entrada al añadir el primer vehículo.
- `maxVehicles 3 → 2` (transversal: afecta flotante + página + botones de cards).
- Mostrar el flotante en el index: cargar `comparador.js` en `index.html` SIN romper la delegación de `[data-compare]` de `home-carousels.js` (evitar doble-toggle).

## Paso 2 — Página `comparar.html` cinematic
- Reescribir a layout `Compare.jsx`: hero + slots A/B + VS + `VehiclePicker` (modal de selección con búsqueda) + tabla de diferencias (ganador en dorado) + veredicto + empty state.
- Port React→vanilla (patrón SP-1). Datos reales de `vehicleDB`. Mantener `localStorage 'altorra_comparador'` (NO `alt-cmp` del mock) para no perder estado ni romper el flotante.
- Portar el CSS `.cmp-*` (del redesign `pages.css`) a un CSS cinematic cargado por `comparar.html`.

## Riesgos / no-regresión
- `vehicleComparator` es compartido (flotante + página + cards). El cambio a máx 2 y storage debe ser consistente.
- Index: doble delegación de `[data-compare]` (comparador.js global + home-carousels.js). Verificar antes de tocar.
- `comparar.html` legacy: reescribir preservando `vehicleComparator` y los contratos (`getIds`, `add/remove/clear`).
- Cache bump por cada paso.
