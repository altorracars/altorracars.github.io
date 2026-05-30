# SP-4 — Motor de recomendaciones por similitud · Design

**Fecha:** 2026-05-30 · **Estado:** aprobado ("luz verde").

## Objetivo
Recomendar vehículos **semejantes** a los del rastro del usuario, ponderando **múltiples dimensiones** ("un todo": categoría + precio + marca + características + transmisión/combustible + novedad), no solo popularidad. Flujo lógico robusto (nunca falla / nunca vacío).

## Decisión de arquitectura
Enfoque **B (Firestore/cliente)**, no GA Data API. El **núcleo es content-based** (similitud) y usa solo: el rastro local (`vehicleHistory.getHistory()`) + los datos en `vehicleDB`. **Sin backend nuevo, sin reglas Firestore.** La popularidad global (contador de vistas) queda como **fase 2 opcional** (requeriría contador + reglas).

## Algoritmo (`js/core/recommendations.js` → `window.AltorraRecommendations.getRecommendations(limit)`)
1. **Perfil del rastro** (ponderado por recencia, lo último pesa más): categorías, precio promedio, marcas, características, transmisión/combustible.
2. **Score de similitud** por candidato disponible y NO visto = suma ponderada:
   - Categoría 30 · Precio (cercanía, decae) 25 · Marca 15 · Características (overlap) 15 · Transmisión+combustible 10 · Novedad (año) 5.
3. **Orden** por score desc → top N. **Fallback** (sin rastro o pocos con afinidad): completar con destacados + más nuevos → nunca vacío.

## Integración
- `home-carousels.js`: `renderTrailRecommended` llama al motor (fallback al comportamiento previo destacados+ranked si el motor no cargó — guard typeof, L-13). `renderTrailNow` ahora SIEMPRE muestra recomendaciones (el trail del index deja de duplicar "los vistos", que ya están en QuickTools + perfil).
- `index.html` carga `js/core/recommendations.js` (defer) antes de `home-carousels.js`.

## No-regresión
- Sin backend ni reglas. Fallback robusto. `node -c` OK. Cache bump.
- Código que queda sin uso en home-carousels (getHistoryFromStorage/bindClearOnce del trail) — inocuo; se puede limpiar después.

## Fase 2 (futuro, opcional)
Popularidad global (contador `vehiculos/{id}.views` + reglas), boost de novedad por inventario real, custom image upload para destacados, real-time switch de sesión.
