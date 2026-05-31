# ⚡ 10 — MEMORIA A CORTO PLAZO (WIP / Sprint activo)

> **Nodo neuronal: Memoria a Corto Plazo.** Junto con `CLAUDE.md` + `05-ESTADO-GLOBAL`,
> es de las primeras lecturas de cada sesión (Ignorancia Selectiva, `CLAUDE.md §G`).
> SOLO lo vivo: foco actual, pendientes abiertos, bitácora. Estado técnico → `05`.
>
> **Es la pizarra, no el archivo.** Al cerrar una tarea: consolidar a ADR (`99`) +
> fila en `00-INDICE`, extraer lecciones a `30`, y PODAR esto al foco vivo (GC §G.4).

---

## 🎯 Foco actual

> **Pizarra podada al cierre de sesión 2026-05-31** (handoff a ventana nueva). El detalle histórico
> vive en los ADRs **§122–§139** (`99` + `00-INDICE`). Aquí solo el estado vivo.

---

## 🔧 WIP ACTIVO: SP-5.3 — Rediseño total + de-monolitización de `detalle-vehiculo.html`

> **Spec**: `docs/superpowers/specs/2026-05-30-detalle-vehiculo-cinematic-design.md` (`b2a6bc0`).
> **Plan**: `docs/superpowers/plans/2026-05-31-detalle-vehiculo-cinematic.md` (`f56cb8d`) — 8 tasks / 4 fases.
> Aprobado por el cliente: alcance "visual + organización + modularización", método A (reescritura
> preservando hooks), botones **Opción A**, composición galería+panel sticky, favorito conectado.

**✅ FASE 0 + 1 + 2 HECHAS Y VERIFICADAS** (Fase 0/1 ya en prod vía PR #769; **Fase 2 SIN commit aún**, en `refactor/estructura`):
- **Fase 0/1** (`7a33ac2`/`f3884d1`/`cfb143f`): guard de anclajes + de-monolitización verbatim (CSS→`detalle-cinematic.css`, JS→4 módulos `js/public/detalle/`). Página quedó funcionalmente idéntica (compuerta estructural).
- **Fase 2 (compuerta visual, hecha esta sesión 05/31):**
  - Task 3: `<body data-cin="on">` + `<link soft-redesign.css>` (tokens `--cin-*`).
  - Task 4: markup Opción A — back link, `main-image-container gallery-main`, fila 4 iconos **Agendar·Preguntar·Comparar·Compartir**, pie **Guardar+Verificado**, barra sticky móvil `.dt-sticky`. **27 IDs + hooks intactos** (one-liner OK); `onclick` de share/flechas eliminados.
  - Task 5: `css/home/detalle-cinematic.css` reescrito a cinematic (scoped `body[data-cin="on"]`, tokens, serif/Manrope, dorado, `.wa-float` oculto, lightbox/zoom/tabs preservados). **Fix tipografía**: `font-family` en `.detail-page/.dt-sticky/.lightbox/.share-toast` (especificidad 0,2,1 gana a `animaciones.css html:not(.fonts-loaded) body` 0,1,2).
  - Task 6 (`detalle-page.js`): share/flechas→`addEventListener`; **favorito** `.dt-save` vía `favoritesManager.handleHeartClick` + label propio `.is-on` (patrón `home-carousels.js`, **NO** `.favorite-btn` porque `_updateAllButtonsForVehicle` sobreescribe textContent con glifo ♥ y borraría "Guardar"); **sticky sync** (modelo/precio/wa href); **comparar feedback** (texto/`.active` vía `vehicleComparator.has`, porque `comparador.updateDetailPageButton` depende de `?id=` que el `replaceState` canónico borra — **comparador.js NO se tocó**, spec §3.2).
  - **Verificado** (preview localhost id=38, `node -c` OK los 4 módulos): cinematic aplica (bg #08070A, serif #F4EEDE, precio #F0C674, WA verde, Sim dorado, ink-soft); grid 1.7fr/1fr→1col móvil sin overflow; tabs/thumbs/lightbox/comparar(toggle+texto+widget)/favorito(gated→prompt login)/sticky(poblado+visible móvil) OK. Solo 403 Firebase (L-08).
  - ⚠️ **El Service Worker servía assets viejos** (CACHE_VERSION sin bumpear): la verificación necesitó desregistrar SW + cache-bust de `<link>`. El **bump de Fase 3** + Ctrl+Shift+R lo resuelve para el cliente. (Lección candidata para `30`.)

### ← RETOMAR SP-5.3: **FASE 3** (regenerar + cache + cerebro)
- **Task 7**: actualizar fallback PRERENDERED en `generate-vehicles.mjs` + `npm run generate` (27 páginas; requiere red/Firestore — si no corre local, el cron CI regenera cada 4h) + spot-check 2 páginas.
- **Task 8**: **cache bump** (`v20260531290000`→mayor) en `service-worker.js` + `cache-manager.js` + **ADR §140** (`99`) + fila `00-INDICE` + `20-ESPACIAL` (filas `js/public/detalle/` + `css/home/detalle-cinematic.css`) + `43-UX` (cuerpo detalle → cinematic) + `brain:check` SANO.
- **Commits Fase 2 pendientes** (cliente commitea): mensajes por tarea preparados en el chat de la sesión.
- **Contratos preservados** (spec §3): `comparador.js`/`citas.js`(`.btn-agendar-cita`)/`concierge.js`(`open-concierge-vehicle`)/`historial-visitas.js`(`PRERENDERED_VEHICLE_ID`)/`favorites-manager.js` — todos intactos.

---

## 🎯 Foco previo (cerrado)

Todo consolidado en ADRs (`99` + `00-INDICE`): cinematic punta a punta (§122–§137), recomendaciones f1 (§138), footer fix (§139). Cuerpo cinematic en 11 root + chrome global 100%. **SP-5.3 (detalle) está ahora migrando el cuerpo de catálogo** — ver §WIP arriba.

### Pendiente de validar en PRODUCCIÓN (Ctrl+Shift+R) — tras el próximo push
- Recomendaciones (§138): ver 2-3 fichas → index muestra "Recomendados" **semejantes**.
- Comparador flotante (no choca con QuickTools ⊞) + perfil/favoritos cinematic.
- (Comparador empty-state, simulador y footer ya validados en localhost — L-20.)
- **Cuerpo aún legacy tras SP-5.3**: `busqueda.html`, `marca.html`, `marcas.html`, 7 landing `vehiculos-*.html` (futuros SP-5.3.x).

3. **Diferido sin urgencia**: SP-4 **fase 2** (popularidad global = contador `vehiculos/{id}.views` + reglas; custom image destacados; real-time switch). Auditorías `44-SEO`/`45-PERFORMANCE`/`48-ACCESIBILIDAD` cuando se pidan.

---

## 📋 Pendientes abiertos (TODO-NN)

> Al cerrar uno: ✅ + link al ADR, y retirarlo en la próxima poda.

| ID | Item | Estado | Bloqueo |
|---|---|---|---|
| **TODO-01/02** | Migración Cloudflare Pages + Vite (deploy en segundos, assets con hash) | 🔮 | ~$10/año dominio |
| **TODO-03** | Critical CSS inline | ⏸️ diferido | SP-5 lo reabsorbe |
| **TODO-04** | Resource hints (preconnect) | ✅ hecho | propagado por cron |
| **TODO-05** | SEO local / metadata | ✅ hecho | OG/Twitter/AutoDealer §90 |
| **TODO-06** | Página `/cartagena.html` SEO local | 🔮 | contenido editorial del cliente |
| **TODO-07/08** | Validar CSAT (§87) + transferencias (§88) en producción | 🔮 | tráfico / equipo 2+ asesores |
| **TODO-09..13** | Deuda técnica menor (drafts diferidos, CSS muerto, transition:all, substring selectors) | 🔮 | opcional, sin impacto visible |
| ~~TODO-14~~ | ~~Patrón merge conflict cron~~ | ✅ → L-02 | — |

Detalle ampliado de pendientes legacy → `99-HISTORIAL-ADR.md` §109.

---

## 📦 Planes mayores (resumen vivo — todos cerrados ✅)

- **§122** SP-1 Index cinematic vanilla (port JSX→vanilla, 4 módulos `js/public/home/*`, contratos preservados).
- **§119** reorg `js/` modular (128 archivos) · **§120/§121** cerebro autónomo + linter `brain:check`.
- **§61** RBAC dinámico · **§59** ALTOR Hub (7/7 + C-S8/9/10) · **§82-84** Smart Update · **§90** SEO Fase 4 · **§91/93** imágenes responsive + lazy · **§115-117** motor cromático (6 paletas) · 27 Cloud Functions.

---

## 🔮 Contexto estratégico

- **Rediseño TOTAL cinematic + recomendaciones (fase 1) ENTREGADOS.** El sitio está
  visualmente completo de punta a punta. Lo que resta: validación en producción + pulido
  fino + diferidos (SP-4 fase 2, auditorías por dominio). Buen momento para QA en prod y
  priorizar mejoras incrementales según feedback real de usuarios.

## 📝 Bitácora (efímera — se vacía al consolidar)

- *(vacía — sesión 2026-05-30 consolidada en ADRs §131–§138 + lecciones L-17/L-18/L-19 + M-06/M-07; todo commiteado hasta `d62f058`)*
