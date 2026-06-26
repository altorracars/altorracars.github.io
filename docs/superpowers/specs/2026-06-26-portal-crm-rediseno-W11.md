# Rediseño del portal CRM (admin-app) — Flujo Fuerte W-11

> **Estado:** W-11 en curso, DETENIDO en el prompt de Gemini (mandato del dueño: "avanza solo, solo párate para el prompt de Gemini"). Fecha: 2026-06-26. Modelo: Opus 4.8 ⟦rev-Fable⟧.
> **Target:** el portal `admin-app/` (CRM back-office), NO el chat/Hub (eso es F4/F5 = TODO-38) ni el sitio público (eso es `altorra-cars-design-system/`).
> **Meta del dueño:** "que se vea PRO, mejor que cualquier CRM". Costo $0, vanilla JS, cero regresiones, réplica fiel de marca.

## Estado de las capas W-11 (60-WORKFLOWS)
- ✅ 1. VERIFICAR ground-truth (Fase A) — leído shell.js, router.js, tokens.css, crm-tokens.css, shell.css, inbox.data, reportes.data.
- ✅ 2. SKILLS — `proceso-decision-fuerte` invocada; `frontend-design`/`arquitecto-software` aplicadas como lentes.
- ✅ 3. ARQUITECTO — dirección candidata concreta (6 pilares, abajo).
- ✅ 4. MOCKUP — `visualize/show_widget` (artefacto #1, mostrado en chat).
- ✅ 5. COMITÉ ×3 ACOTADO — inline+schema, sin tools (workflow `comite-rediseno-portal-crm`, 302k tok). Síntesis abajo.
- 🔄 6. CONSEJO EXTERNO (Gemini) — **prompt entregado al dueño (artefacto #2); PUNTO DE PARADA.**
- ⏳ 7. VEREDICTO — tras Gemini.
- ⏳ 8. IMPLEMENTAR (por fases, abajo).
- ⏳ 9. EXTENSIÓN / validación live (artefacto #3) — tras merge del dueño.
- ⏳ 10. CIERRE (ADR + 00 + 30 + cache §4).

## Fase A — diagnóstico VERIFICADO
- `shell.js` `NAV[]` = **24 ítems planos** en un sidebar; RBAC por ítem (`hasPermission`, perm string|array any-of). `setActive()` marca activo por id exacto (líneas 155-162), iteración por id; `router.js` ROUTES + `main.js` MODULES keyed por los MISMOS ids.
- **Design-system premium YA existe** (`admin-app/src/core/design-system/`): tokens "Fusión HarmonyOS 14 + Win11 + Altorra" — gold `#D4A85A`, superficies Mica/Acrylic (blur), Plus Jakarta Sans + Inter, sombras Fluent, motion. CRM-tokens: temperatura lead (hot/warm/cold), semáforo SLA, acentos por canal. Layout: sidebar 256/72px, topbar 60px, detail 440px.
- **Faltan**: búsqueda global, command palette, crear-rápido, notificaciones. Iconos = emoji. Responsive básico (72px rail @860px; NO drawer off-canvas real).

## Dirección candidata (arquitecto, 6 pilares)
Negocio: topbar con "Nuevo lead" siempre visible + búsqueda · Escalabilidad: nav agrupada + ⌘K · Seguridad: grupos respetan RBAC existente · Costos: $0 (reusa tokens) · Mantenibilidad: `NAV[]` gana campo `group`/`tier` (aditivo; router/rutas/24 módulos INTACTOS) · Comunicación: iconos vectoriales, jerarquía clara.

## Síntesis del comité (lo que reencuadró)
1. **Chasis vs motor**: el shell agrupado es higiene, NO diferenciación. El motor real = **Bandeja densa** (filas no tarjetas; orden default SLA→temperatura; selección múltiple + acciones masivas asignar/contactar/snooze; usa `--sla-*`/`--temp-*` como indicador de fila, NO tarjeta translúcida — además §3.1 prohíbe backdrop-filter en listas de N).
2. **Regresión BLOQUEANTE**: grupo colapsado oculta el ítem activo (`setActive` no expande el grupo padre) → auto-expandir grupo activo + persistir abierto/cerrado en localStorage. Gate de no-regresión.
3. **Jerarquía 2 zonas** (no 5 grupos iguales): PRIMARIA siempre visible (Inicio·Bandeja·Pipeline·Agenda·Contactos·Reportes ~6-8) + SECUNDARIA colapsada; config pura (Roles·Departamentos·Automatización·Auditoría·Respaldos·Disponibilidad·Atributos) detrás de engranaje "Ajustes" (índice/sub-nav, estilo Linear/Attio).
4. **RBAC degenerado**: grupo con <2 ítems visibles tras RBAC → render PLANO (no acordeón de 1). Verificar contra roles reales (vendedor/editor-sitio/super_admin) ANTES de codear.
5. **Separar alcances** (no "todo aditivo $0"): campana de notificaciones y búsqueda de leads/vehículos = listeners Firestore NUEVOS → épicas aparte. F1 del palette = solo saltar a las 24 SECCIONES (estático). Atajo **Ctrl+K** (Windows, no ⌘) + `preventDefault`. `popover.js` NO tiene focus-trap/combobox → construir overlay propio (role=dialog, aria-modal, focus-trap, flechas).
6. **Móvil first-class** (caso real del asesor): drawer off-canvas real (hamburguesa+backdrop+focus-trap), Customer-360 a pantalla completa, barra inferior Llamar/WhatsApp/Contactado. Alcance honesto SEPARADO (toca el grid de `.app-shell`, no es solo `NAV[].group`).
7. **Estados vacíos diseñados** por módulo (ícono+frase+CTA) = parte grande del "se ve pro" día 1.
8. **Iconos**: emoji → SVG inline (`currentColor`), NO librería pesada (vanilla sin bundler real); mantener nombre accesible (label `.sr-only`, no `display:none`) para el rail colapsado.

## Secuencia de implementación propuesta (no big-bang; cada fase verificada + cache §4)
- **F1** agrupar `NAV[]` en 2 zonas (campo `group`/`tier`, regla RBAC <2→plano) — aditivo, $0, reversible. Gate: 25 rutas cargan+recargan, `setActive` correcto, rail @860px OK.
- **F2** grupos colapsables + auto-expand del activo + persistencia localStorage (cierra la regresión bloqueante).
- **F3** rediseño de la **Bandeja** (motor): tabla densa, orden SLA/temp, acciones masivas, estados vacíos.
- **F4** command palette (solo secciones, Ctrl+K, overlay a11y propio) + iconos vectoriales + "Nuevo lead" en topbar.
- **F5 (épica aparte)** móvil drawer + notificaciones + búsqueda de leads (Firestore).

## Raw de la deliberación
Comité: workflow `comite-rediseno-portal-crm` (run `wf_65915dbe-d1f`), 3 lentes (producto-ux · escéptico · arquitecto), schema. Output completo en el transcript del workflow (efímero) — síntesis arriba es lo durable.

## Prompt de Consejo Externo (Gemini/Antigravity) — entregado al dueño
Ver el prompt crudo (anti-anclaje R1) entregado en chat 2026-06-26 (también pegado abajo para reproducibilidad).
