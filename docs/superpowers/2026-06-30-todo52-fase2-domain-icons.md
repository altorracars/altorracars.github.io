# TODO-52 P1 · Fase 2 — Iconos de DOMINIO (emoji→SVG) ⟦OPUS-4.8⟧

> **Fecha:** 2026-06-30. Handoff de la 2ª mitad del emoji→SVG. La **Fase 1 (chrome)** ya está
> SHIPPED+merged (commit `feat(crm/todo-52): P1 premium — emoji→SVG chrome en 19 módulos`).
> Esto cubre los emoji que viven en **objetos meta de dominio** (`icon:'…'`) y se interpolan
> como `${meta.icon}` en la UI — exige refactor **dato + TODOS los consumidores**.
> Crudo de la auditoría: `scratchpad/audit-results.json` (efímero) — el mapa verificado vive AQUÍ.

## Patrón de migración (decidido)
- Añadir a cada meta un campo **`iconId`** (NO borrar `icon` emoji hasta migrar todos los
  consumidores; o reemplazar in-situ si el consumidor es único y se toca a la vez).
- Consumidores: cambiar `text: \`${m.icon} ${m.label}\`` →
  `[el('span',{class:'u-ico',html:icon(m.iconId)}), ' '+m.label]` (children) o
  `class:'… u-ico-text', html: icon(m.iconId)+m.label`.
- `.temp` (rating) ya es `inline-flex gap`; añadir `.temp svg { width:1em }` o envolver en `.u-ico`.
- **Decisión de canal (mía, design-owner):** canales = **SVG monocromo currentColor** (NO logos de
  marca a color). El label de texto ("WhatsApp") ya desambigua; monocromo = cohesión premium dark/oro.

## Iconos nuevos a añadir a `core/icons.js` (Fase 2)
`sun` (rating warm 🌤️), `snowflake` (rating cold ❄️) — `flame` ya existe (hot 🔥).
Canales: `messageCircle`(whatsapp, ya existe)·`facebook`·`instagram`·`music`(tiktok)·`shoppingCart`(marketplace)·
`phone`(llamada, ya existe)·`store`(presencial)·`users`/`handshake`(referido)·`bot`(ya existe)·`user`(cuenta, ya existe)·
`mail`(newsletter, ya existe)·`calendar`(cita, ya existe)·`globe`(web). Audit-actions: `unlock`/`shield`/`building`(dept)·etc.

## Mapa de consumidores VERIFICADO (file:línea reales)

### 1. `RATING_META` (scoring.js L94-98) — 🔥🌤️❄️ + `cls: temp--hot/warm/cold` (PRESERVAR cls)
Consumido `${rm.icon}` en:
- `inbox/inbox.ui.js:383` (badge `.temp ${rm.cls}`)
- `dashboard/dashboard.ui.js:182`
- `contacts/contacts.ui.js:165` y `:274` (score hero)
- `contacts/contacts.list.js:122`
- `scoring.js:85` (interno, retorna rating)

### 2. `CHANNEL_META` (classify.js L39-53) + `MANUAL_CHANNELS` (L74-84, DUPLICADO) — 13 canales
Consumido `${...channel.icon}` en:
- `inbox/inbox.ui.js:387` (`.lead-card__chan`)
- `dashboard/dashboard.ui.js:173`
- `contacts/contacts.ui.js:168` y `contacts.list.js:121` (vía `channelOf(c)`)
- `reportes/reportes.ui.js:148` (tabla bySource `${r.icon} ${r.label}`)
- `capture/new-lead.js:25` (select de MANUAL_CHANNELS `${c.icon}`)
> Nota: unificar MANUAL_CHANNELS con CHANNEL_META (mismo set) al refactorizar.

### 3. `TYPE_META` (classify.js L16-21) — 📅📝⚠️✨ (cita/solicitud/pqr/lead)
Consumido `${type.icon}` en:
- `inbox/inbox.ui.js:364` (string `what`; ojo: en la misma línea hay `🚗` content inline)
- `contacts/contacts.ui.js:167`

### 4. NBA rules `icon` (nba.js L26-66) — 📅🔥🧾🙋👋💬🎯🌱✅ (9 reglas)
Consumido `${nba.icon}` en:
- `dashboard/dashboard.ui.js:178`
- `contacts/contacts.ui.js:206`
- `inbox/inbox.ui.js:412`
> 👋 first_touch y ✅ archived: evaluar si dejar (cálidos) o migrar por consistencia.

### 5. `TYPE_ICON` timeline (contacts.ui.js L24) — 📥💬🔁🗒️✉️📞
Consumido `TYPE_ICON[a.type]` en `contacts/contacts.ui.js:244` (`.timeline__icon`).

### 6. `actionEmoji` (auditoria.data.js L45-63) — 18 acciones (🔑🚫🔓👤🛡️🏢⚡⏸🧠🚗🏷️🤝🖼️📅💾🗺️📝)
Consumido `actionEmoji(e.action)` en `auditoria/auditoria.ui.js:45`. Mapear a SVG por acción.

### 7. `FUENTES` (quick-lead.js L18-23) — 💬🚶📞🤝
Consumido `${fu.icon}` en `quick-lead.js:43` (chips). Reusar canales.

### 8. `ACTION_LABELS` (vehicles.ui.js L100) — ✨✏️🗑★💰↩ (audit-history modal)
Consumido `text: ACTION_LABELS[entry.action]`. Mapear a SVG+label.

### 9. Menú icons (openMenu, popover.js) — presets inbox L53-56 (📞💬🔁📅) + team menu (👤) + más-acciones (↩️🗄🗑)
`openMenu` (core/popover.js) renderiza `item.icon`. Si se migra openMenu para aceptar SVG, beneficia
TODOS los menús. Decidir: extender openMenu (item.iconId) vs dejar emoji en menús (baja visibilidad).

## DEJAR (doctrina, NO migrar)
👋 saludo · 🇨🇴 bandera · 🎉/✅ toasts éxito · 🏖 ausencia · chips-sugerencia hub (💵📅💳🚚) ·
★☆ rating reseñas · ✔/✓ verificado · 🚗 inline content · 🏆 VENDIDO (celebratorio) · `→` en comentarios.

## Verificación Fase 2 (al cerrar)
Build limpio + preview `?mock=1`: contactos/bandeja/dashboard/reportes → los badges de canal/rating/type
muestran SVG (no emoji); `.temp--hot/warm/cold` conservan color; 0 errores consola. Luego screenshot
(extensión, NO preview_screenshot — L-28) + commit + merge dev→main.
