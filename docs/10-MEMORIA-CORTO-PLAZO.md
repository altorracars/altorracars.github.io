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

**✅ FASE 0 + FASE 1 HECHAS Y VERIFICADAS (commiteadas, branch +5 sobre origin, SIN push):**
- `7a33ac2` Fase 0: guard de aserción de 13 anclajes en `generate-vehicles.mjs` (falla ruidoso, no silencioso).
- `f3884d1` Fase 1a: CSS inline (1156 líneas) → `css/home/detalle-cinematic.css` **verbatim** + `<link>` en posición de cascada.
- `cfb143f` Fase 1b: JS inline (870 líneas, 31 fns) → **4 módulos** `js/public/detalle/{data,render,gallery,page}.js` verbatim (plain scripts, scope global compartido como simulador/home; 0 líneas perdidas verificado por multiconjunto). `detalle-vehiculo.html`: **2315 → 293 líneas**.
- **Verificado en preview localhost** (id=38): título/precio/imagen/9 thumbs/22 ficha/8 features/12 similares OK; thumbSwitch/lightbox open-next-close/tabSwitch OK; globals share/scroll OK. Solo 403 Firebase (L-08).
- La página quedó **funcionalmente IDÉNTICA** (compuerta estructural superada). El cuerpo AÚN se ve legacy (CSS no reescrito todavía — es Fase 2).

### ← RETOMAR SP-5.3 en ventana nueva (Fase 2 + 3)
Leer el plan (`f56cb8d`) y seguir desde **Task 3**. Resumen:
- **Fase 2 (compuerta visual)**: Task 3 `data-cin="on"` + `soft-redesign.css` · Task 4 markup cinematic del cuerpo (Opción A botones, **preservar los 27 IDs** del spec §3.1 + clases-hook `.thumbnail/.tab-btn/.tab-content/.lightbox-*`) · Task 5 reescribir `css/home/detalle-cinematic.css` a cinematic (tokens `--cin-*`, serif, dorado, NO 6 colores) · Task 6 re-cablear onclick→addEventListener + activar favorito (`.favorite-btn[data-id]`).
- **Fase 3**: Task 7 actualizar fallback PRERENDERED en generador + `npm run generate` (27 páginas) + spot-check · Task 8 cache bump (`v20260531290000`→mayor) + ADR §140 + `20-ESPACIAL` (fila `js/public/detalle/`) + `43-UX` + `00-INDICE` + `brain:check`.
- **Referencias de diseño**: `altorra-cars-design-system/project/redesign/Detail.jsx` (clases `dt-*`, sticky móvil) + mockups en `.superpowers/brainstorm/`.
- **Contratos a NO romper** (spec §3): `comparador.js` (btnComparar/Text/Icon), `citas.js` (`.btn-agendar-cita`), `concierge.js` (`data-action="open-concierge-vehicle"`), `historial-visitas.js` (tag verbatim + `PRERENDERED_VEHICLE_ID`), `favorites-manager.js` (`.favorite-btn[data-id]`).

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
