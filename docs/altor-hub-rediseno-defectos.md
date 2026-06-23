# 🎨🤖 ALTOR Hub — Backlog de defectos de diseño/UX (para el rediseño · F4/F5)

> **Hoja de detalle** (no neurona). Enlazada desde `43-UX.md` y el EPIC TODO-34 (F4/F5 UX).
> Acumula los **defectos VISUALES/UX del bot ALTOR Hub** cazados EN VIVO por la skill
> `validacion-live-chrome` (extensión Claude-in-Chrome). NO se arreglan en el acto (salvo que
> rompan el flujo) — se agrupan aquí para resolverlos en bloque en la fase de rediseño del bot.
>
> Formato por defecto: `#N · [severidad] · superficie/estado · síntoma → causa hipótesis → fix sugerido · evidencia`.

---

## Abiertos

### #1 · 🔴 ALTO · Widget bot · estado "fuera de horario / esperando asesor" (botones WhatsApp)
**Síntoma**: el texto de la burbuja ("La espera está sie…") se renderiza **VERTICAL — una letra por
línea** — quedando ilegible. Ocurre en el estado con la fila de botones **"Continuar por WhatsApp" /
"Seguir esperando"** (gate WhatsApp de F2.b) superpuesta sobre la burbuja.
**Causa hipótesis** (a verificar en el CSS del concierge): la fila de acciones se posiciona encima/al
lado de la burbuja y le **colapsa el ancho a ~1 carácter** (overlay absoluto, o conflicto flex/`width`/
`min-width:0` faltante, o `white-space`/`overflow` que fuerza el wrap por carácter).
**Fix sugerido**: la burbuja y la fila de botones deben apilarse en bloque (no superponerse); dar
`min-width:0` + `flex` correcto al contenedor de texto; los botones en su propia fila debajo.
**Evidencia**: screenshot del dueño 2026-06-23 (chat del bot, vista móvil/estrecha).
**Estado**: 🆕 reportado · pendiente de diagnóstico en CSS + fix en F4/F5.

---

## Resueltos
(ninguno aún)
