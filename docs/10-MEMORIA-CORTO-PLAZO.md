# ⚡ 10 — MEMORIA A CORTO PLAZO (WIP / Sprint activo)

> **Nodo neuronal: Memoria a Corto Plazo.** Junto con `CLAUDE.md`, este es
> el ÚNICO archivo que lees al iniciar cada sesión (Directiva de Ignorancia
> Selectiva, ver `CLAUDE.md §G`). Contiene SOLO lo vivo: en qué trabajamos
> hoy, pendientes abiertos, versión de cache y estado de planes.
>
> **Regla de consolidación**: cuando una tarea se cierra por completo, su
> "recuerdo" se MUEVE de aquí al nodo de Largo Plazo (`docs/99-HISTORIAL-ADR.md`
> como ADR §NN) y se marca su `TODO-NN` como ✅ con link al §. Este archivo
> nunca debe crecer indefinidamente — es la pizarra, no el archivo.

---

## 🎯 Foco actual

- **EN CURSO — §119 Reestructuración de frontend** (rama `refactor/estructura`, NO mergeada a main). Plan de 5 fases, riesgo escalonado. Objetivo: orden modular sin romper URLs públicas (ruta=URL en GitHub Pages, sin bundler). NO replicar la imagen React/Vite literal. La migración Vite real es TODO-01 (~1 año).
  - **Fase 0** ✅ rama creada + rastreo de dependencias.
  - **Fase 1** ✅ commit `f071461`: cuarentena `_legacy/` (notifications-demo, admin-upload, admin-components) + `backups/` fuera de git. Cero refs rotas verificado. Prueba local (localhost:3000) OK — errores de consola eran solo restricción de referer de Firebase (Auth/Installations/Analytics bloqueados en localhost), NO de los cambios. Firestore carga 27 veh/18 marcas, snippets/ vía fetch OK.
  - **Validado §119**: `admin-upload.html` confirmado MUERTO — sin auth, las rules actuales (§68 `isSuperAdmin()`) rechazarían sus escrituras. (El §2 del historial lo describía mal como "subida de imágenes"; corregido en `_legacy/README.md`.)
  - **Fase 2** ⏳ reagrupar `js/`. ANÁLISIS DE DEPENDENCIAS HECHO (mapa abajo).
    - **Mapa de referencias js/ (§119)** — dónde vive cada ruta a un .js:
      1. **74 `admin-*.js`** → solo `admin.html` (74 `<script src>`) + 1 cross-ref: `components.js` carga `js/admin-calendar-config.js`. NO los toca el generador/SW/snippets/público. **Más contenido.**
      2. **`js/components.js` = CARGADOR DINÁMICO**: inyecta ~25 scripts por ruta hardcodeada (`.src='js/...'`): auth, solicitudes-watcher, concierge, todo `js/ai/*`, comm-schema, kb-client, concierge-optin, admin-calendar-config, cookies, contact-forms. Cargado en 65 HTML.
      3. **~10 HTML** inyectan dinámico: comparador.js, reviews.js, featured-week-banner.js, cookies.js, contact-forms.js.
      4. **Generador `generate-vehicles.mjs` es TEMPLATE-DRIVEN**: lee `detalle-vehiculo.html` (→ vehiculos/*) y `marca.html` (→ marcas/*) y copia sus `<script>`/`<link>` tal cual. Actualizar esos 2 HTML + re-correr generador = las 45 páginas generadas quedan OK. Única ruta hardcodeada en el generador: `js/historial-visitas.js` (línea ~303, ancla de inyección).
      5. **service-worker.js**: NO cachea js/css por ruta (STATIC_ASSETS solo multimedia). Sin impacto.
      6. **snippets/**: HTML inerte, cero refs a js/.
      7. Ya existen subcarpetas `js/ai/` (16) y `js/simulador/` (4) → patrón de subcarpeta YA funciona con `<base href="/">`.
    - **Refs ocultas peligrosas** = las `.src='js/X.js'` de components.js + los ~10 HTML (NO son `<script src>` visibles). Toda ref a un js es string literal idéntico → reescritura determinista y verificable (`grep ruta-vieja`=0).
    - **Tiers de riesgo**: A) admin-* (contenido, ~75 refs en 2 archivos, no toca cron) · B) concierge/features (refs en components.js + HTML, testeable en localhost) · C) core público (firebase-config/database/components/auth/main/render/toast: ~900 refs + 2 templates + generador + components.js — el más ancho).
    - **DECISIÓN de secuencia (guía, cliente no-técnico)**: empezar por lo testeable en localhost, NO por admin (login bloqueado por referer en localhost → no verificable visualmente). Orden: concierge → public features → core público → **admin AL FINAL** (verificación post-merge con rollback listo).
    - **✅ 2.1 hecho** (commit `40d34ad`): `js/concierge/` (concierge, concierge-optin, kb-client). Solo 3 líneas `.src` en components.js. Probado en local: bot abre y saluda (concierge.js:3980 open log). Cero 404. Errores de consola = referer-block Firebase (ajenos).
    - **✅ 2.2a hecho** (commit auto `abb01e3`): `js/public/` con 6 features que NO tocan el cron — reviews, featured-week-banner, cookies, contact-forms, contact, filtros-avanzados. 9 refs (index/resenas/contacto/busqueda + 2 dinámicas components.js). Probado en local: todo OK.
    - **✅ 2.2b-i hecho** (commit `a837430`): `citas.js` + `vehicle-hotspots.js` → `js/public/`. Tocan cron: actualizada plantilla `detalle-vehiculo.html` + 27 páginas `vehiculos/`. Probado en local OK.
    - **✅ 2.2b-ii hecho**: `comparador.js` → `js/public/`. El más extenso: 55 refs (10 HTML raíz + 27 vehiculos + 18 marcas), ambas formas de comilla (estática `"..."` y dinámica `'...'`). Plantillas `detalle-vehiculo.html` + `marca.html` actualizadas → generador self-consistente. **js/public/ COMPLETO: concierge ya tiene carpeta aparte; public tiene 9 features.**
    - **✅ 2.3 hecho** (admin): los **74 `admin-*.js` → `js/admin/`**. Superficie mínima pese a ser 74: solo `admin.html` (74 `<script src>`) + 1 dinámica en `components.js` (`admin-calendar-config`). Usé **Edit replace_all** (no sed) → cero ruido de fin de línea. Verificado 0 refs viejas, sintaxis OK. NO testeable login en localhost (referer); se valida que los 74 scripts carguen sin 404 al abrir admin.html.
    - **✅ 2.4a hecho** (core — parte 1): `theme-switcher.js` (MUERTO, validado) → `_legacy/` + 5 de fundación admin (`event-bus`, `hub-store`, `icons`, `smart-fields`, `rbac-catalog`) → `js/admin/`. Solo refs en admin.html (5). `rbac-catalog` también en `functions/index.js` pero es COMENTARIO (no require) → backend safe. Verificado, Edit (sin ruido líneas).
    - **⏳ core restante (17 archivos en js/ raíz)**: ANÁLISIS HECHO. Mapa por riesgo:
      - **2.4b (medio, próximo)**: singletons públicos → `js/core/`: `auth`+`solicitudes-watcher` (solo dinámico en components.js, 1 ref c/u), `perfil` (perfil.html), `performance` (index+marcas; sus menciones en SW línea5 y cache-manager línea34 son COMENTARIOS de changelog, NO funcionales → safe).
      - **2.4c (EL GRANDE) — EN MICRO-FASES** (decisión: 1 archivo o par por commit → aislamiento de fallas; cada uno independiente porque usan `window.*`, no se referencian por ruta entre sí). Método por archivo: `git mv` + `sed` SOLO en archivos que contienen el string (`files=$(grep -rl ...)`; NUNCA `*.html` entero → evita ruido CRLF) + plantillas cron + components.js si aplica + ancla generador si aplica. Verificar 0 viejas / N nuevas / node -c. Testear en localhost. Pendientes: page-loader, components, cache-manager, main, toast, database, favorites-manager, favorites-watcher, render, comm-schema (+dinámico components.js), historial-visitas (+ancla generate-vehicles.mjs ~L303), dynamic-lists.
        - **✅ firebase-config.js** → `js/core/` (66 refs, todas estáticas). Sin ruido (sed solo en los 66 con match). La base de todo: si carga bien, el método queda probado para los pesados. (commit `96e23d2`, probado OK)
        - **✅ components.js** → `js/core/` (66 ocurrencias / 65 archivos). Inyecta header/footer + cargador dinámico. Sin ruido. Probado OK. (commit `241fa07`)
        - **✅ database.js + cache-manager.js** → `js/core/` (capa de datos; 58 + 64 refs estáticas). Sin ruido. (commit `5f0aa67`)
        - **✅ main.js + render.js** → `js/core/` (orquestador home + render de tarjetas; 60 + 55 refs). Sin ruido. (micro-fase 4)
        - **Restantes en js/ raíz (11)**: HEAVY → toast, page-loader, favorites-manager, favorites-watcher, comm-schema (+dinámico components.js), historial-visitas (+ancla generate-vehicles.mjs ~L303), dynamic-lists (7). SINGLETONS 2.4b → auth, solicitudes-watcher (dinámicos components.js), perfil, performance (4). Se mueven de a 2.
      - **OJO components.js**: es core (65 refs) Y es el cargador dinámico. Al moverlo, actualizar los `<script src=js/components.js>` de 65 HTML + 2 plantillas; sus refs internas a otros js ya quedaron correctas al mover cada archivo.
    - **✅ main.js + render.js** → `js/core/` (commit `fa3178f`; 60+55 refs). ⚠️ commiteado pero **falta test en navegador** (tarjetas de vehículo).
    - **✅✅ FASE 2 (js/) COMPLETA**: 128 archivos organizados. `js/core/` (17), `js/admin/` (79), `js/public/` (9), `js/concierge/` (3), `js/ai/` (16), `js/simulador/` (4). **js/ raíz = 0 sueltos.** Última tanda (11): toast, page-loader, favorites-manager/watcher, comm-schema, historial-visitas, dynamic-lists, auth, solicitudes-watcher, perfil, performance → js/core/. Casos especiales resueltos: 3 dinámicas en components.js (auth/solicitudes-watcher/comm-schema) + ancla generador (historial-visitas, 3 líneas en generate-vehicles.mjs). 0 refs viejas, sintaxis 12/12 OK. FALTA test navegador (público completo) + commit.
    - **🛑 CONFLICTO cron resuelto (§4/TODO-14 en vivo)**: el cliente fusiona CADA micro-paso a `main` vía PR (#716-#723). El cron de main bumpeó `cache-manager.js` (APP_VERSION) + `service-worker.js` (CACHE_VERSION) entre fusiones → PR #723 marcó conflicto en `js/cache-manager.js` (modify-en-main vs move-nuestro). **Resuelto solo** con `git merge origin/main` en la rama (estrategia ort detectó el rename → aplicó el bump del cron a `js/core/cache-manager.js`). Versión vigente ahora: **`v20260526002104`**.
    - **📌 DECISIÓN DE WORKFLOW**: recomendado al cliente **DEJAR de fusionar cada micro-paso a main** (genera conflictos recurrentes con el cron). En adelante: solo commit+push a `refactor/estructura`; **UNA fusión final** al terminar todo + probar. Si se sigue fusionando por paso, sincronizar `main` → rama tras cada merge.
    - **🛑 LECCIÓN CRÍTICA (line endings)**: `sed -i '...' *.html` reescribe TODOS los archivos pasados y convierte CRLF→LF en los que NO matchean → aparecen como "modificados" (ruido) aunque git con `autocrlf=true` no los cuente como cambio de contenido. **Para Fases 3 (css) y 4 (admin): pasar a sed SOLO los archivos que contienen el string** (`sed -i ... $(grep -rl "patrón" ...)`), o restaurar el ruido con `git checkout --` (archivos en `git status` pero no en `git diff --name-only`). NO existe `.gitattributes`; `core.autocrlf=true`.
    - **ℹ️ OPERATIVO: el cliente commitea MANUALMENTE desde GitHub Desktop** (mensaje genérico "ACTUALIZACION" salvo que yo le pase texto) **y pushea con "Push origin"**. (Antes lo malinterpreté como hook automático — confirmado manual al verlo en pantalla §119). → Yo le entrego el texto de commit listo para pegar; el audit trail real vive en ESTE archivo / ADR §119. El botón "Create Pull Request" (refactor→main) es SOLO para el final, tras terminar y probar todo.
  - **Fase 3** ⏳ reagrupar `css/` (31 planos).
  - **Fase 4** ⏳ actualizar `scripts/generate-vehicles.mjs` (cron cada 4h — PELIGRO #1 si no se sincroniza) + `service-worker.js`.
  - **Fase 5** ⏳ E2E + consolidar ADR §119 a Largo Plazo.
  - **Decisión tomada**: subcarpetas DENTRO de `js/` y `css/` (ej. `js/core/`), NO un `assets/` nuevo → menos rutas tocadas, mismo beneficio.
  - **NO tocar**: `snippets/` (runtime `fetch()` en components.js), `v/` (links de compartir externos), `admin.html` monolito (refactor aparte), toolchain (bun+npm cumplen roles distintos).
- **Última acción previa**: ✅ Arquitectura Documental Neuronal cerrada como ADR §118.
- **Branch activa**: `refactor/estructura` (verificar con `git branch --show-current`).
- **Cache version actual**: `v20260525010000` — el siguiente bump debe ser MAYOR (formato `vYYYYMMDDHHMMSS`).

---

## 📋 Pendientes abiertos (TODO-NN)

> Inventario vivo. Al cerrar uno: marcar ✅ + link al ADR §X en Largo Plazo, luego retirarlo de esta tabla en la próxima consolidación.

| ID | Item | Estado | Bloqueo |
|---|---|---|---|
| **TODO-01** | Dominio + Cloudflare DNS + email pro + Cloudflare Pages (Vite) → deploy en segundos | 🔮 | ~$10/año dominio |
| **TODO-02** | Fase C Smart Update (hash-based assets) — depende de TODO-01 | 🔮 | hereda TODO-01 |
| **TODO-03** | Sprint 3C — Critical CSS inline | 🔮 listo | — (4h, $0) |
| **TODO-04** | Sprint 3D — Resource hints (preload/preconnect/defer) | 🔮 listo | — (2h, $0) |
| **TODO-05** | Metadata local SEO en páginas faltantes (contacto/nosotros/etc.) | 🔮 listo | — (1h, $0) |
| **TODO-06** | Página `/cartagena.html` dedicada SEO local | 🔮 | contenido editorial del cliente |
| **TODO-07** | Validar métricas CSAT (§87) en producción | 🔮 | ~50 chats/mes |
| **TODO-08** | Validar transferencias entre asesores (§88) | 🔮 | equipo 2+ asesores |
| **TODO-09..13** | Deuda técnica (drafts diferidos, CSS muerto, dead code drafts viejo, transition:all restantes, auditar substring selectors) | 🔮 | limpieza opcional, sin impacto visible |
| **TODO-14** | Patrón merge conflict auto-cron (receta `CLAUDE.md §4`) | ♻️ operativo | — |

**Orden recomendado sin inversión**: TODO-04 → TODO-03 → TODO-05 → TODO-06.

Detalle ampliado de cada pendiente → Largo Plazo `docs/99-HISTORIAL-ADR.md` §109.

---

## 📦 Estado de planes mayores (resumen vivo)

> Todos cerrados hoy. Si uno se reabre, su trabajo activo vuelve a aparecer arriba en "Foco actual".

- **§61 RBAC dinámico**: ✅ 100% (roles custom, permisos por checkbox, CEO único, triggers, R8 refactor 174 callsites §89).
- **§59 ALTOR Hub**: ✅ 7/7 sprints + C-S8/S9/S10 (optimistic UI, typing, read receipts, presence, rediseño, welcome contextual, CSAT, notes/transferencias).
- **§82-§84 Smart Update**: ✅ producción (pill + toast catálogo + smart navigation + cross-tab dedup).
- **SEO Fase 4** (§90): ✅ rich snippets + Google Business Profile (5.0★, 62 opiniones).
- **Fase 3 Performance**: ✅ 3A imágenes responsive (§91) + 3B lazy (§93); pendiente 3C/3D (TODO-03/04).
- **Motor cromático admin** (§115-§117): ✅ 6 paletas, superficies teñidas, texto legible.
- **27 Cloud Functions**: ✅ deployadas.

---

## 📝 Bitácora de sesión (efímera)

> Notas de la sesión en curso que aún no son un ADR. Se vacían al consolidar.

- 2026-05-25 — Arquitectura documental neuronal implementada y consolidada como ADR §118: nodos de Corto Plazo + Espacial + gobernanza §G (Ignorancia Selectiva + Triggers + Consolidación) en CLAUDE.md. Migración lossless verificada.
- 2026-05-26 — **CEREBRO AUTÓNOMO (upgrade, → consolidar como ADR §120)**: (1) identidad §0.0 en CLAUDE.md (Claude = constructor/guardián, cerebro = su memoria, leer en cada sesión). (2) Neurona NUEVA `30-LECCIONES.md` (memoria procedimental: L-01..L-09 sembradas con lecciones de §119). (3) Capa de enrutamiento semántico (síntoma→neurona) en `00-INDICE`. (4) Gobernanza §G.4 = reflejos autónomos bajo guía: Captura, Neurogénesis, Frescura, Higiene, Auto-auditoría, Auto-mejora + límite de guardián (apendar no sobrescribir, cuarentenar no borrar). (5) Staleness arreglada: `20-ESPACIAL` + `dependency-map` actualizados a la estructura modular js/. (6) **§G.5 Capacidad + Sharding**: topes por neurona según modo de carga (auto vs on-demand) — evita el desastre del CLAUDE.md de 40k líneas; al saturarse una neurona → shard a hermana registrada (nada huérfano). Auto-carga total hoy: ~415 líneas (vs 40k antes). Registrado en tabla §0 + mapa del índice. FALTA: ADR §120 formal al consolidar + recortar este corto plazo (está en su tope ~110).
