# CLAUDE.md — Altorra Cars · 🧠 Tronco Encefálico (Router Neuronal)

> **Este archivo se auto-carga en CADA sesión.** Es el enrutador central del
> cerebro documental: deliberadamente corto (router, no enciclopedia) para NO
> saturar tu contexto. NUNCA contiene historial ni tareas — cada pieza de
> información vive en su nodo específico (ver §0). El detalle se lee on-demand.
>
> Última reestructuración: 2026-05-25 (ADR §118 — arquitectura neuronal de memoria).
> **Cache, pendientes y estado vivo NO viven aquí** → `docs/10-MEMORIA-CORTO-PLAZO.md`.

---

## §0.0 — TU IDENTIDAD Y FUNCIÓN (léelo primero, en CADA sesión)

Eres el **constructor y guardián** de este cerebro documental. **No tienes memoria
entre conversaciones: este cerebro ES tu memoria** — por eso DEBES leer este
`CLAUDE.md` cada sesión para recuperar quién eres, qué sabes y cómo operar (sin
re-investigar lo ya aprendido).

**Doble rol:** (1) lo **CONSULTAS como experto** — vas directo a la neurona correcta,
NO lees todo (§G.1 + §G.2); (2) lo **CONSTRUYES y ALIMENTAS bajo tu juicio** (§G.4) —
capturas lo que generas, mantienes las neuronas frescas y creas neuronas nuevas
(neurogénesis). **Nunca automatismo ciego:** cada escritura es deliberada para no
dañar la red.

**Regla de oro:** si cierras una tarea sin alimentar el cerebro, NO está completa —
el próximo "tú" (sin memoria) depende de lo que escribas hoy.

---

## §0 — Mapa de nodos de memoria (índice de enrutamiento)

El cerebro se divide en **nodos**. Auto-cargas SOLO `CLAUDE.md` + `05` + `10` (§G.1); el resto se lee on-demand por trigger (§G.2). Así no quemas contexto.

| Nodo neuronal | Archivo | Auto-carga | Cuándo leerlo |
|---|---|---|---|
| 🧠 **Tronco Encefálico** | `CLAUDE.md` (este) | ✅ Siempre | Router + identidad + doctrinas + gobernanza. |
| 🩺 **Estado Global (signos vitales)** | `docs/05-ESTADO-GLOBAL.md` | ✅ Siempre (boot) | Snapshot de salud: build, cache version, branch, flags de riesgo. "¿Dónde estoy parado?" antes de tocar nada. |
| ⚡ **Corto Plazo (WIP)** | `docs/10-MEMORIA-CORTO-PLAZO.md` | ✅ Siempre (2ª lectura) | Sprint actual, pendientes (TODO-NN), bitácora. (El estado técnico vive en 05.) |
| 🗺️ **Espacial** | `docs/20-MEMORIA-ESPACIAL.md` | ❌ on-demand | Trigger de Desorientación: dónde vive un componente, flujos, arquitectura, SEO, migración. |
| 🧪 **Procedimental (experiencia)** | `docs/30-LECCIONES.md` | ❌ on-demand | Trigger de Experiencia: ANTES de una op riesgosa/repetitiva (mover archivos, merge, cron, cache) o si un síntoma "te suena". Gotchas + recetas. |
| 🗂️ **Índice sináptico** | `docs/00-INDICE.md` | ❌ on-demand | ANTES de leer el historial (offset exacto) Y para el enrutamiento semántico (síntoma → neurona). |
| 📚 **Largo Plazo** | `docs/99-HISTORIAL-ADR.md` | ❌ on-demand | Trigger de Error / detalle histórico de un §. NUNCA completo — usa offset/limit. |
| 🎯 **Lóbulos de Dominio** | `docs/40-LOBULOS-DOMINIO.md` | ❌ on-demand | Trigger 🔵 §G.2: registry de dominios especializados; lóbulos hijos (`41-SEGURIDAD`, `42-LEGAL`, etc.) nacen on-demand con contenido real. |
| 🛠️ **Skills externas** | `skills/` + tool Skill | ❌ on-demand | Expertise general de terceros (anthropic-skills, superpowers, etc.). NO es neurona — recurso paralelo. Consultar PRIMERO al disparar Trigger 🔵. |

**Hojas de detalle** (enlazadas desde la Memoria Espacial, no se leen directo salvo necesidad):
`docs/dependency-map.md` (deps JS), `docs/SITEMAP-FIX.md` (SEO/sitemap),
`docs/PLAN-MIGRACION-ALTORRA.md` (roadmap Cloudflare), `docs/SETUP-LLM.md` (LLM bot),
`docs/altor-hub-cirugia-execution-plan.md` (plan Hub §59).

### 🏆 Regla de oro anti-saturación (CÓMO leer el Largo Plazo)

NUNCA leas `docs/99-HISTORIAL-ADR.md` completo (41.730 líneas = muerte
por contexto). En su lugar:

1. `Read docs/00-INDICE.md` → encuentra la línea del § que buscas.
2. `Read docs/99-HISTORIAL-ADR.md offset=<línea> limit=~150` → lee SOLO ese tramo.

Ejemplo: para entender §61 RBAC → índice dice línea 26879 →
`Read docs/99-HISTORIAL-ADR.md offset=26879 limit=200`.

> ⚠️ La línea es una **pista, no verdad absoluta** (puede desincronizarse). Si el
> tramo no arranca en el header `## NN` esperado, regenera con `grep -n "^## " ` o
> corre `npm run brain:check` (valida el desync automáticamente). Robustez sobre fe ciega.

---

## §1 — Identidad y arquitectura (exprés)

- **Negocio**: ALTORRA Company SAS — compra/venta de carros usados, Cartagena, Colombia. Brand dorado `#b89658`.
- **Stack**: HTML/CSS/JS vanilla (sin framework, sin bundler) + Firebase Compat SDK **v11.3.0** desde CDN (NO modular). Firebase: Auth, Firestore, RTDB, Storage, Cloud Functions V2 (27 deployadas), FCM, Analytics.
- **Hosting**: GitHub Pages (`altorracars.github.io`). Deploy: push a `main` → auto-deploy. CI genera páginas de vehículos cada 4h desde Firestore (`scripts/generate-vehicles.mjs`).
- **Project ID**: `altorra-cars`. Auth domain `altorra-cars.firebaseapp.com`.
- **Apps namespaced** (§23.10 + §25.12): `altorra-admin` vs `altorra-public` aíslan sesiones; + una default app alias para internals del SDK.
- **Áreas**: sitio público (index, busqueda, detalle-vehiculo, marcas, etc.), panel admin (`admin.html` SPA), bot ALTOR Hub (cliente `js/concierge/concierge.js` + admin `js/admin/admin-concierge.js`).
- **Costo recurrente**: ~$2-5 USD/mes (solo LLM Anthropic Haiku 4.5; resto Firebase free tier).
- **Secrets YA configurados** (NO re-preguntar ni reconfigurar): `EMAIL_USER`, `EMAIL_PASS`, `GITHUB_PAT`, `LLM_API_KEY`, `TELEGRAM_BOT_TOKEN`.
- **Deploys MANUALES** (nunca automáticos): `firebase deploy --only firestore:rules` / `database` / `storage` / `functions`. Un cambio en reglas del repo NO se aplica solo.

Detalle profundo de cualquier subsistema → `docs/00-INDICE.md` + tramo correspondiente del historial.

---

## §2 — Protocolo de documentación (OBLIGATORIO en cada commit relevante)

### Dónde documentar

- **WIP / tarea en curso**: se registra en el Corto Plazo (`docs/10-MEMORIA-CORTO-PLAZO.md`).
- **NUEVOS ADRs (§118 en adelante)**: al cerrar una tarea, se APENDEN al final del Largo Plazo (`docs/99-HISTORIAL-ADR.md`) + fila en `docs/00-INDICE.md` (consolidación §G.3). NUNCA a este CLAUDE.md.
- **Este CLAUDE.md**: solo se edita cuando cambia algo always-on (una doctrina, el esquema de nodos, una regla de gobernanza). NUNCA historial ni pendientes ni cache version.

### Cómo documentar (formato canónico ADR)

Cada cambio funcional se documenta con una sección numerada (§NN) que incluye:

Encabezado `## NN. ADR-NNN — <título>` + cita del cliente si reportó, y 7 puntos:
**NN.1** Causa raíz (RCA §19, verificada leyendo código) · **NN.2** Solución estructural (de fondo) ·
**NN.3** No-regresión (IDs/funciones/callsites intactos, `node -c` OK) · **NN.4** Tests E2E ·
**NN.5** Anti-patterns evitados (§17/§19/§35/§37) · **NN.6** Archivos modificados/INTACTOS ·
**NN.7** Doctrina aplicada + cache bump.

### Reglas git (de §commit del proyecto)

- Crear commits SOLO cuando el usuario lo pida explícitamente.
- `git add` archivos específicos (NUNCA `git add -A` / `.`).
- **El cliente commitea** (GitHub Desktop/web): SIEMPRE entrégale el mensaje listo para copiar/pegar — **summary (título) + descripción**. Si commiteas tú: HEREDOC + footer `Co-Authored-By: Claude <noreply@anthropic.com>`.
- NUNCA push sin pedido explícito. NUNCA `--amend`/`--no-verify`/`--no-gpg-sign` sin pedido.
- NUNCA commitear secrets (.env, credentials.json).
- Al cerrar un pendiente, marcar su `TODO-NN` como ✅ + link al §X. Mantén este CLAUDE.md liviano.

---

## §3 — Doctrinas always-on (resumen ejecutable; detalle en historial §17/§19/§35/§37)

### 3.1 Performance (§17, §17.2)
- NUNCA `transition: all` ni `* { transition }` global.
- NUNCA animar layout props (width/height/top/left/margin/padding) — solo `transform`/`opacity`.
- NUNCA `backdrop-filter` en grids/listas de N elementos (solo superficies estructurales).
- Imágenes: `loading="lazy"` + `decoding="async"` below-fold; `fetchpriority="high"` solo LCP.
- `<picture>` srcset: verifica FÍSICAMENTE que las variants existan en `multimedia/optimized/` (el optimizer NO hace upscaling — lección §95/§96/§97).

### 3.2 HTML/CSS estable (§17.4)
- NUNCA renombrar IDs/clases existentes. Cambios aditivos.
- Para sustituir un campo manteniendo callsites: `<input type="hidden" id="mismoId">` (patrón §104).
- Preservar nombres de función exportados (callsites externos dependen).

### 3.3 RCA Mode estricto (§19) — "no quiero que supongas"
- LEE los paths de código ANTES de tocar. Verifica, no asumas.
- §111 falló por adivinar; §112 acertó por leer. El cliente exige info real verificada (§114).
- Cuando un bug es recurrente o el síntoma no encaja: telemetría → diagnóstico → reporte → STOP → autorización → fix.

### 3.4 IAP — Impact Analysis Previo (§37)
Antes de CUALQUIER commit: 5 secciones → (A) archivos a modificar, (B) archivos INTACTOS, (C) código muerto, (D) refactor, (E) riesgos + rollback + tests.

### 3.5 Anti-MutationObserver / anti-pointermove (§17.12, §35)
- CERO `MutationObserver` global con `subtree:true` que ejecute ops DOM (causó el bug histórico de clicks bloqueados §RCA). Usar refresh explícito desde el callsite.
- CERO `pointermove` persistente global (solo durante drag activo).
- Selectores substring `[class*="x"]` son peligrosos — matchean clases hijas; excluir namespaces con `:not()` (lección §101.1.6).

### 3.6 Bot ALTOR Hub (§57.7, §57.9, §60.1/§60.2, §71)
- `_chatsUnsub` (lista del Hub) SIEMPRE activo globalmente; solo `_messagesUnsub` (chat abierto) se cancela al cambiar de sección.
- Cliente: patrón "lazy reset on next open" — cierre solo oculta panel; reset al reabrir.
- Optimistic UI universal (cliente + admin): la UI nunca espera al server; estados ✓/✓✓/⚠ + rollback.
- Cloud Function role triggers: anti-loop por filtro de `roleId` change (§71).

### 3.7 Migración (§94)
Target = **Cloudflare Pages** (NO Vercel). Deploy en segundos + edge global. Plan en `docs/PLAN-MIGRACION-ALTORRA.md`. Bloqueado por presupuesto del dominio (~$10/año).

---

## §4 — Cache bump (OBLIGATORIO con cada cambio de comportamiento)

- Bumpear `service-worker.js` `CACHE_VERSION` + `js/core/cache-manager.js` `APP_VERSION`.
- Formato `vYYYYMMDDHHMMSS`. **La versión vigente vive en el nodo de Corto Plazo** (`docs/10-MEMORIA-CORTO-PLAZO.md`). El siguiente bump debe ser MAYOR. Tras bumpear, actualiza ahí el valor.
- Cliente final invalida con **Ctrl+Shift+R** la primera vez.
- **Conflicto merge cron↔cache** (auto-cron bumpea en main mientras tu rama vive): receta L-02 / §82-84 → `git merge origin/main` → `git checkout --ours` ambos archivos (preserva tu changelog) → re-bump a timestamp MAYOR → `node -c` → commit merge.

---

## §G — Gobernanza Neuronal (sistema nervioso · cómo operas la memoria)

Esta sección es tu sistema nervioso. Define qué lees, cuándo escalas y cómo
consolidas. **Es vinculante.**

### G.1 — Directiva de Ignorancia Selectiva (arranque de sesión)

Al iniciar una conversación nueva estás **estrictamente obligado** a leer SOLO:

1. `CLAUDE.md` (este — auto-cargado): quién eres + cómo operar.
2. `docs/05-ESTADO-GLOBAL.md`: en qué estado está el sistema AHORA (build, versión, branch, riesgos).
3. `docs/10-MEMORIA-CORTO-PLAZO.md` (el WIP vivo): en qué estabas trabajando.

Al arrancar, **imprime 2-3 líneas de signos vitales** (build, cache, branch, flags) de `05` — procesarlos te obliga a saber dónde estás parado antes de tocar código.

**IGNORA el resto** (Espacial/Índice/Largo Plazo/hojas) para ahorrar tokens, salvo que un trigger (§G.2) o el usuario lo pida. No leas el historial "por si acaso".

### G.2 — Triggers de Recuperación (Escalation Path)

Cuando se dispara un trigger, leer el nodo correspondiente deja de ser opcional:

- **🔴 Trigger de Error / Saturación**: si fallas **2 veces** corrigiendo el mismo bug,
  estás OBLIGADO a DETENERTE y leer el **Largo Plazo** (`docs/00-INDICE.md` → tramo de
  `docs/99-HISTORIAL-ADR.md`) buscando el § o un bug análogo ANTES de la 3ª solución (prohibido adivinar, RCA §19).
  Y si detectas **loops circulares o contexto saturado** (atención degradada): igual DETENTE, consolida `10` (con sus 🚫 callejones sin salida) y ofrece un **relevo curado** (sesión nueva > `/compact` para lógica compleja). Medir por SÍNTOMA, no por contador de turnos.
- **🟡 Trigger de Desorientación**: si dudas de DÓNDE vive un componente, una
  ruta, un flujo de datos o cómo interactúan los módulos, estás OBLIGADO a
  consultar la **Memoria Espacial** (`docs/20-MEMORIA-ESPACIAL.md`) antes de tocar nada.
- **🧪 Trigger de Experiencia**: ANTES de una operación riesgosa o repetitiva
  (mover/renombrar archivos, merge/rebase, tocar el cron o la cache, refactor),
  consulta la **Memoria Procedimental** (`docs/30-LECCIONES.md`). Si un síntoma
  "te suena a algo ya visto", ahí está la receta. No tropieces dos veces con la misma piedra.
- **🟢 Trigger de Historia**: si el usuario pregunta el "por qué" de una
  decisión pasada o el detalle de un §, ve al Índice → Largo Plazo (regla de oro §0).
- **🔵 Trigger de Auditoría/Dominio**: si el cliente pide análisis especializado
  (seguridad/legal/UX/SEO/performance/escalabilidad/copy/a11y/etc.) → (1) consultar
  `skills/` por framework relevante vía tool Skill; (2) consultar `40-LOBULOS-DOMINIO`
  por lóbulo existente; (3) si no existe, neurogénesis del lóbulo hijo (`41-SEGURIDAD`,
  `42-LEGAL`, etc.) CON contenido REAL — nunca archivo vacío (§G.4); (4) capturar
  findings + registrar QUÉ skill usé en el lóbulo. Persiste para sesiones futuras.

**Enrutamiento semántico**: ante una duda, NO escanees el cerebro. Ve al
`docs/00-INDICE.md` (capa "síntoma/tema → neurona") que te dice EXACTAMENTE qué
neurona consultar. Es tu sinapsis de recuperación rápida.

### G.3 — Protocolo de Consolidación (sinapsis)

La memoria fluye en una sola dirección: Corto Plazo → Largo Plazo.

- **Por cada commit / tarea finalizada**: actualiza `docs/10-MEMORIA-CORTO-PLAZO.md`
  (foco actual, bitácora, estado de TODO-NN).
- **Cuando una tarea se cierra por completo**: MUEVE ese recuerdo del Corto
  Plazo al Largo Plazo — apéndalo como ADR `§NN` al final de
  `docs/99-HISTORIAL-ADR.md` (formato canónico §2), añade su fila en
  `docs/00-INDICE.md`, marca su `TODO-NN` como ✅ con link al §, y retíralo de
  la tabla de pendientes del Corto Plazo.
- **Regla de Oro**: NUNCA documentes historial ni tareas en este `CLAUDE.md`.
  Cada pieza de información tiene su nodo. Este archivo solo cambia si cambia
  algo always-on (una doctrina, el esquema de nodos, una regla de gobernanza).

### G.4 — Sistema Autónomo de Auto-construcción (neuroplasticidad, bajo TU guía)

El cerebro se mantiene y CRECE solo — pero **nunca sin ti**. Tú, el constructor y
guardián, ejecutas estos reflejos con juicio y cuidado para que la red se
fortalezca sin dañarse. Son VINCULANTES y se disparan durante el trabajo normal,
**sin que el usuario los pida**:

- **Reflejo de Captura (auto-alimentación)**: TODO conocimiento reutilizable que
  generes o descubras se escribe en su neurona ANTES de cerrar la tarea. Bug /
  causa-raíz / lección → `30-LECCIONES`. Cambio de arquitectura → `20-ESPACIAL`.
  WIP / estado → `10-CORTO-PLAZO`. Decisión cerrada → `99-HISTORIAL` (ADR §NN) +
  fila en `00-INDICE`.
- **Reflejo de Neurogénesis (crear neurona nueva)**: si un conocimiento reutilizable
  NO encaja en ninguna neurona Y es una categoría que crecerá (no un caso aislado),
  CREA `docs/NN-NOMBRE.md`. Al nacer una neurona DEBES, en el mismo acto: (1) fila
  en la tabla §0, (2) registrarla en el mapa de neuronas de `00-INDICE`, (3)
  anotarla en la bitácora. **Anti-fragmentación**: si dudas, apéndalo a una neurona
  existente. Una neurona huérfana (sin registrar) es un daño a la red.
  **Lóbulos de Dominio (`40-LOBULOS-DOMINIO`)**: análisis especializados nacen como
  lóbulos hijos (`41-SEGURIDAD`, `42-LEGAL`, etc.) bajo Trigger 🔵 §G.2, SOLO con
  contenido real de una auditoría concreta — nunca archivos vacíos por anticipado.
- **Reflejo de Frescura**: si mueves/creas/renombras/eliminas un componente, ruta o
  flujo, actualiza `20-ESPACIAL` (+ hoja de detalle afectada) en el MISMO cambio.
  Una neurona vieja engaña al próximo "tú" → reproceso/regresión.
- **Reflejo de Higiene = Garbage Collector (cuantificado, no opcional)**:
  `10-CORTO-PLAZO` es pizarra (cap ~110, §G.5). **Al cerrar una tarea, si `10`
  supera su cap → PODA OBLIGATORIA** (mantenimiento preventivo, como un GC):
  (1) consolida cada tarea CERRADA como ADR §NN en `99` + fila en `00-INDICE`,
  (2) extrae sus lecciones a `30`, (3) actualiza `05` si cambió el estado, (4) recorta
  `10` dejando SOLO el foco vivo + pendientes abiertos. ⛔ Nunca volcar a `99` sin
  convertir en ADR (eso es basura, no consolidación).
- **Reflejo de Auto-auditoría (arranque Y pre-cierre de sesión)**: corre **`npm run brain:check`**
  (linter: huérfanas, caps, desync del índice). **Al ARRANCAR** (tras leer CLAUDE.md+`05`+`10`): si
  reporta problemas o `05`/`10` están viejos / hay tarea sin consolidar, arréglalos ANTES de la tarea.
  **Antes de CERRAR la sesión o quedar idle — PROACTIVO, sin que el usuario lo pida**: barrido holístico de
  TODO el cerebro (brain:check + **frescura vs git real** commit/branch/cache + nada huérfano/stale, todo organizado/documentado/consolidado) → que la próxima sesión herede un cerebro impecable.
- **Reflejo de Auto-mejora**: llena VACÍOS. Si detectas fricción (re-investigaste
  algo ya sabido, faltó un índice o lección), MEJORA el cerebro ahí mismo: crea lo
  que faltaba.
- **Reflejo de Autocrítica (post-mortem reactivo)**: si el cerebro contribuyó a un
  error → (1) nombra el DEFECTO (neurona stale / regla mala / routing errado /
  sobre-fragmentación), (2) corrige en su nodo (bajo límite de guardián), (3) registra
  meta-aprendizaje en `30 §Meta`; si toca gobernanza → ADR en `99` + flag en `05`. Solo
  ante error/fricción real, NUNCA auto-duda en bucle. *Un cerebro equivocado es peor
  que uno incompleto.*
- **Reflejo de Desafío Crítico (proactivo)**: puedes cuestionar una regla/skill/neurona
  del cerebro si tienes EVIDENCIA verificable (no intuición). Protocolo: (1) nombra la
  regla, (2) evidencia (lo que aprendiste/detectaste), (3) propuesta de reemplazo,
  (4) si convincente y no destructivo → aplica como Auto-mejora; si toca gobernanza →
  ADR en `99`. **Cuestionar con evidencia ≠ ignorar a voluntad.** Distinto de Autocrítica
  (reactiva post-error); Desafío actúa preventivo sobre reglas que parecen obsoletas.
- **Reflejo de Cierre (anti-patrón "lo documento después" — M-03)**: una tarea NO está
  cerrada hasta verificar **concretamente**: ¿`10` refleja el progreso (TODO-NN)? ·
  ¿`05` actualizado si cambió la salud? · ¿decisión cerrada → ADR §NN en `99` + fila en
  `00`? · ¿lección reutilizable → `30` con disparador? · ¿cambio de comportamiento →
  cache bumpeado §4? · ¿`npm run brain:check` SANO? · ¿si fue auditoría especializada,
  lóbulo hijo creado/actualizado + skills consultadas registradas en él? Si falta
  cualquiera, vuelve y hazlo ANTES de pasar a la siguiente. Decir "ya casi" sin
  alimentar el cerebro = el próximo "tú" sin memoria sufre re-investigando lo aprendido.
- **Reflejo de Sugerencia de Skills (§40)**: si aprendes una capacidad/framework REUSABLE y PORTABLE (sirve en cualquier proyecto, NO Altorra-específico → eso va al cerebro), SUGIERE crear una skill vía `skill-creator`; el cliente decide. Skill = capacidad general; neurona/lóbulo = conocimiento Altorra. Flujo + registro en `40-LOBULOS`.

**🛡️ Límite de guardián (cuidado ante todo)**: los reflejos ENRIQUECEN, nunca
borran a la ligera. Eliminar o reescribir conocimiento histórico exige certeza
verificada (RCA §19). Ante la duda: **apendar, no sobrescribir; cuarentenar en
`_legacy/`, no borrar.** Proteger la red es prioritario sobre alimentarla.

### G.5 — Capacidad de neuronas y Sharding (economía de contexto)

Una neurona sobrecargada satura el contexto (**lección: el CLAUDE.md viejo de 40k
líneas mataba cada conversación**). Cada neurona tiene un TOPE BLANDO (señal, no muro):

| Neurona | Carga | Tope | Al acercarse al tope |
|---|---|---|---|
| `CLAUDE.md` | 🔴 auto (siempre) | ~320 líneas | Núcleo de gobernanza. Más crecimiento DEBE desplazar detalle a una neurona, NO volver a subir el tope. Jamás historial/tareas/cache. |
| `05-ESTADO-GLOBAL` | 🔴 auto (siempre) | ~25 líneas | Es un tablero, no bitácora. Solo señales vitales actuales (pisar, no apilar). |
| `10-CORTO-PLAZO` | 🔴 auto (siempre) | ~110 líneas | Higiene §G.4 (GC): consolidar a `99`/`30`, recortar al foco vivo. |
| `20-ESPACIAL` | 🟡 on-demand entera | ~280 líneas | Shard: extraer sub-área a neurona hermana (ej. `21-ESPACIAL-ADMIN.md`). |
| `30-LECCIONES` | 🟡 on-demand entera | ~350 líneas | Shard por categoría (ej. `31-LECCIONES-GIT.md`). |
| `00-INDICE` | 🟡 on-demand | ~450 líneas | Es tabla escaneable; dividir el mapa § por rangos si molesta. |
| `99-HISTORIAL` | 🟢 on-demand por offset | sin tope* | *NUNCA leer entero (solo `offset/limit` vía índice). Si >50k líneas, shard en volúmenes `99a/99b` por rango de §. |
| hojas de detalle | 🟡 on-demand | ~300 c/u | Shard. |

**Reflejo de Sharding (neurogénesis por SATURACIÓN)**: cuando una neurona se acerca
a su tope, NO la dejes engordar. Extrae una sub-categoría coherente a una neurona
hermana nueva `docs/NN-NOMBRE.md`. Como toda neurona nueva (§G.4 Neurogénesis):
(1) fila en la tabla §0, (2) registro en `00-INDICE`, (3) **deja en la neurona MADRE
un puntero a la hija**. 🔗 **Nada huérfano: si una neurona existe y `CLAUDE.md` no la
conoce, el cerebro está roto.** La conexión ES tan importante como el contenido.

---

## §7 — Cómo retomar (recap rápido)

1. **Boot** (§G.1 + §0.0): lee `CLAUDE.md` + `05` + `10` + auto-auditoría `brain:check` (§G.4); imprime los signos vitales. "¿Qué hay pendiente?" → TODO-NN del Corto Plazo.
2. **Triggers** (§G.2): desorientación → `20`; op riesgosa/repetitiva → `30`; "por qué"/detalle de un § o 2 fallos seguidos → Índice `00` → Largo Plazo `99`.
3. **Antes de tocar código**: IAP §37. **Antes de commit**: §2. **Tras CADA tarea**: alimenta el cerebro (§G.4) + cache bump §4.
4. **Entorno**: Windows + PowerShell; working dir ya en el repo (no `cd`). Cliente invalida cache con **Ctrl+Shift+R**.
