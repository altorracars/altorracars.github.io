# 🎨🤖 ALTOR Hub — Backlog de defectos de diseño/UX (para el rediseño · F4/F5)

> **Hoja de detalle** (no neurona). Enlazada desde `43-UX.md` y el EPIC TODO-34 (F4/F5 UX).
> Acumula los **defectos VISUALES/UX del bot ALTOR Hub** cazados EN VIVO por la skill
> `validacion-live-chrome` (extensión Claude-in-Chrome). NO se arreglan en el acto (salvo que
> rompan el flujo) — se agrupan aquí para resolverlos en bloque en la fase de rediseño del bot.
>
> Formato: `#N · [severidad] · superficie/estado · síntoma → causa → fix sugerido · evidencia`.

---

## Abiertos

### #1 · 🔴 ALTO · Widget bot · banner SLA de espera (warning) — texto VERTICAL + scroll-trap
**Síntoma**: el texto del banner `.cnc-sla-banner--warning` ("⏰ La espera está siendo más larga…
¿Continuar por WhatsApp o seguir esperando?") se renderiza **una letra por línea (vertical)** e
ilegible. Aparece tras escalar a asesor y superar el umbral de espera (visto con "Esperando hace 29 min").
**Causa raíz (CONFIRMADA por validador, CSS)**: `.cnc-sla-banner-text` computa `width:0px` dentro de un
flex-row (le falta `flex:1` / `min-width:0`) → el `<strong>` se ajusta a ~15px de ancho × ~754px de alto;
el banner crece a ~1825px → **scroll-trap** dentro del chat. El estado inicial ("Esperando hace 0 min")
renderiza BIEN (horizontal) — el bug es específico del **banner de advertencia**.
**Fix sugerido**: `.cnc-sla-banner-text { flex:1; min-width:0; }` + botones (Continuar WhatsApp / Seguir
esperando) en su propia fila debajo, no superpuestos.
**Evidencia**: screenshot del dueño 2026-06-23 + medición de layout del validador.
**Estado**: 🆕 confirmado · candidato a fix rápido standalone (rompe una CTA de conversión: WhatsApp).

### #2 · 🟡 MEDIO · Widget bot · tarjeta de vehículo · título truncado
**Síntoma**: `.cnc-vcard-title` con `white-space:nowrap; overflow:hidden; text-overflow:ellipsis`,
clientWidth 92px vs scrollWidth 126px → "toyota HILUX 4X4 2018" se corta con "…". Año/modelo no se ve.
**Fix sugerido**: permitir 2 líneas (clamp) o ensanchar la tarjeta del chat.
**Evidencia**: medición del validador 2026-06-23.

### #3 · 🟡 MEDIO · Header · "Cerrar sesión" atenuado + 2 clics (intermitente)
**Síntoma**: el ítem "Cerrar sesión" se ve más tenue que "Mi perfil"/"Mis favoritos"; a veces exige 2 clics.
**Causa (ya diagnosticada §234 follow-up)**: race entre el listener global de `document` que cierra el
dropdown y el re-bind del botón tras re-render del header (`auth.js:1355-1368`).
**Fix sugerido**: bind estable (delegación de eventos) + estado visual consistente del ítem.
**Evidencia**: validador 2026-06-23 (2 pasadas, intermitente).

### #4 · 🟡 MEDIO · z-index · el widget tapa el dropdown de cuenta del header
**Síntoma**: con el chat abierto (esquina sup-derecha), el menú "Daniel → Mi perfil / Cerrar sesión"
queda solapado/detrás del widget; hay que cerrar el chat para operarlo.
**Fix sugerido**: coordinar z-index/posición (el dropdown del header debe ganar al widget, o el widget
cede stacking cuando el dropdown abre).
**Evidencia**: validador 2026-06-23.

---

## Flujo comercial / Copywriting (nueva dimensión del validador)
> El validador ahora también caza copy + flujo comercial (saludo→cierre): mensajes duplicados, CTAs
> prematuros/repetidos, tono/voz de marca, pasos que sobran/faltan, fricción comercial. (Skill §0/§3.)

## Resueltos
- **F#1 · 🟠 FLUJO · gate de cita · fechas duplicadas** (cazado 2026-06-23, fix `02a79a7`) — el bloque
  "Mañana/Esta semana/Próxima semana" salía 2× (pedido del gate + respuesta diferida post-gate). Causa:
  los gate-requests (cita/vender/financiación) sin `quickReplies` → el caller (concierge.js:1085) les ponía
  las contextuales del intent; pero el gate pide DATOS por el form, no fechas. Fix: `quickReplies:[]` en
  los 3 gate-requests. ✅ Pendiente de re-validación live.
