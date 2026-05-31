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
> vive en los ADRs **§122–§140** (`99` + `00-INDICE`). Aquí solo el estado vivo.

---

## 🔧 SP-5.3 — EN PRODUCCIÓN (detalle-vehiculo cinematic + de-monolitización, PR #771) · pendiente validar prod

**Completo y verificado** → consolidado en **ADR §140** (`99` + `00-INDICE`); `20-ESPACIAL` (carpeta `js/public/detalle/` + `detalle-cinematic.css`) + `43-UX` (Ronda 5) actualizados; cache bump `v20260531300000`. Spec `b2a6bc0`, plan `f56cb8d`.
- `detalle-vehiculo.html` → cinematic + de-monolitizado: 4 módulos `js/public/detalle/{data,render,gallery,page}.js` + `css/home/detalle-cinematic.css`, `<body data-cin>`, botones **Opción A**, favorito/comparar/sticky cableados. **27 IDs + hooks intactos**. 27 `vehiculos/*` regeneradas. Verificado preview local (id=38, `node -c` OK). El **por qué/cómo** → ADR §140.
- ✅ **Commiteado + mergeado a prod** (Fase 2 `10605da` + Fase 3 `86681a6` → PR #771, `origin/main ae1bc7e`). ⏳ Falta: **validar en prod con Ctrl+Shift+R** (E2E real) + `git pull` local (rama 6 commits detrás de `origin/main`).
- 🔧 **§141 pulido (post-validación del cliente, SIN commit aún)**: fix glow dorado hover ficha + fix fondo blanco características + descripción editorial (`.desc-key` dorado) + **glass** (info-card/descripción) + acentos cinematic. CSS+JS, **sin regen**. Cache `v20260531310000`. Lecciones L-20 (ampliada) + **L-21** (CSS legacy se filtra si no fijas `background`/`:hover`).
- 🔮 **SP-5.3.x futuros** (cuerpo aún legacy): `busqueda.html`, `marca(s).html`, 18 `marcas/*`, 7 landing `vehiculos-*.html`.

---

## 🎯 Foco previo (cerrado)

Todo consolidado en ADRs (`99` + `00-INDICE`): cinematic punta a punta (§122–§137), recomendaciones f1 (§138), footer fix (§139), **detalle-vehiculo §140**. Cuerpo cinematic en 11 root + detalle + 27 generadas + chrome global 100%.

### Pendiente de validar en PRODUCCIÓN (Ctrl+Shift+R)
- **SP-5.3 detalle (§140, recién desplegado PR #771)**: abrir un vehículo → cinematic (botones Opción A sin cortes, dorado, galería+panel sticky, tabs, similares); comparar/guardar/compartir; barra sticky en móvil; + spot-check directo de 1-2 `vehiculos/*.html`.
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
