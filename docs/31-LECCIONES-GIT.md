# 🔧 31 — LECCIONES · GIT / REFACTOR (hija de `30-LECCIONES`)

> **Neurona hija** (shard §G.5, 2026-06-09): la sección "Operaciones de Git / refactor"
> de `30-LECCIONES.md` vive aquí desde que la madre llegó a su tope (~350 líneas).
> **Cuándo leerla**: Trigger de Experiencia (§G.2) cuando la operación sea git
> (merge/rebase/mover archivos/sed masivo). La madre conserva el puntero.

---

### L-01 · `sed -i '*.html'` corrompe el fin de línea (CRLF→LF)
⇒ **Migrada al maestro** (F2 lote 2): [[CARS:L-01]] · cuerpo íntegro en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo).

### L-02 · Conflicto recurrente cron ↔ cache al fusionar a `main`
- **Síntoma**: el PR de la rama marca conflicto en `js/core/cache-manager.js` (o `service-worker.js`).
- **Causa**: el cron de `main` (`Auto-generate vehicle pages + bump cache version`) bumpea `APP_VERSION`/`CACHE_VERSION` mientras la rama tiene esos archivos movidos/modificados → modify-en-main vs move/modify-nuestro.
- **Receta**: en la rama → `git merge origin/main --no-edit`. La estrategia **`ort` detecta el rename y aplica el bump del cron al archivo movido AUTOMÁTICAMENTE** (cero conflicto manual). Verificar después: `node -c`, 0 refs viejas.
- **Cómo evitarlo**: NO fusionar cada micro-paso a `main` (ver L-03). Sincronizar `main`→rama tras cada merge si se insiste en fusionar por paso.
- **Con cars EN PAUSA + cron vivo (23/07)**: el drift del `05` es ESTRUCTURAL entre sesiones (13 días de desfase vivido) → cada merge L-02 TERMINA sincronizando la fila de cache del `05` en el MISMO turno (el gate #4 bloquea el commit si no). Si los 4 archivos del conflicto solo los tocó el cron en ambas ramas (`git log <base>..rama -- <archivos> | grep -v Auto-generate` vacío), resolver = `git checkout --theirs` a la versión más NUEVA.
- *Doctrina relacionada: `CLAUDE.md §4` (cache bump). Vivido en §119; ampliado §303.*

### L-03 · No fusionar cada micro-paso a `main` durante un refactor largo
⇒ **Migrada al maestro** (F2 lote 6): [[CARS:L-03]] · cuerpo íntegro en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo).

### L-04 · Receta canónica para mover un archivo JS sin romper nada
1. **Mapear refs**: `grep -rl "js/X.js"` en `*.html vehiculos/*.html marcas/*.html` + ¿dinámico en `js/core/components.js` (`.src=`)? + ¿ancla hardcodeada en `scripts/generate-vehicles.mjs`?
2. `git mv js/X.js js/<carpeta>/X.js`.
3. Refs estáticas (`"js/X.js"`) → `sed` solo en archivos con match. Refs dinámicas/ancla → **Edit**.
4. **Verificar**: `grep` ruta-vieja = 0 en todo el repo · `node -c` · sin doble `carpeta/carpeta`.
5. Probar en localhost · `commit`.

### L-48 · Sesión concurrente: un `git add` amplio en otro chat arrastra tu edit sin commitear
⇒ **Migrada al maestro** (F2 lote 7): [[CARS:L-48]] · cuerpo íntegro en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo).

### L-68 · Ancla de `.replace()` que cruza `\n` falla EN SILENCIO en Windows (CRLF)
⇒ **Migrada al maestro** (F2 lote 8): [[CARS:L-68]] · cuerpo íntegro en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo).

### L-71 · Commit en HEAD DESPRENDIDO (tras resume) → queda COLGANTE, no llega a `dev`/`main`
⇒ **Migrada al maestro** (F2 lote 8): [[CARS:L-71]] · cuerpo íntegro en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo).

### L-78 · Un bot de CI con `contents: write` mueve `main` SOLO — tu rama se queda atrás sin que nadie toque nada
- **Síntoma**: cierras dejando `dev` == `main` == origin (regla del dueño 2-sep-2026) y más tarde `dev` está **detrás** de `origin/main` por un commit sin autor humano: `Auto-generate vehicle pages + bump cache version [skip ci]` (2026-09-02: `8e36fcdc`; antes `2865a363`). Nadie hizo nada — la divergencia aparece sola, y hubo que adelantar `dev` y `main` a mano.
- **Causa**: `.github/workflows/generate-vehicles.yml` corre con `permissions: contents: write` y termina en `git commit … [skip ci]` + `git push` **sobre `main`**. Sus disparadores NO dependen de ti: `push` a `main`, **`cron: '0 */4 * * *'`** y **`repository_dispatch: [vehicle-changed]`** (lo lanza una Cloud Function al cambiar un vehículo) ⇒ `main` avanza con el PC apagado y sin sesión abierta. El `[skip ci]` corta el BUCLE, no la divergencia.
- **Receta** (al abrir Y al cerrar): `git fetch origin` → `git rev-list --left-right --count dev...origin/main`. Derecha > 0 = te lleva ventaja el bot → `git merge --ff-only origin/main` (siempre es fast-forward: el bot solo apila encima). Izquierda > 0 = trabajo tuyo sin mergear, eso sí es deuda. Luego `git push origin dev` y, si tocaba, el merge `dev`→`main` de siempre.
- **Cómo evitarlo**: «rama de trabajo == `main` == origin» **caduca**: es cierta en el instante en que la mides y falsa 4 horas después. No la afirmes desde refs locales — `origin/*` es una FOTO, y el heartbeat te dice de cuándo (`origin visto hace: N h`); se mide con `fetch` en ESE turno (§3.3).
- **Hermana de L-02, no duplicado**: mismo bot, la otra cara. En L-02 el bot te da un CONFLICTO al fusionar (ruidoso, ya tiene receta); aquí no hay conflicto ninguno — por eso pasa desapercibida.
- *Vivido el 2026-09-02 por la sesión que repartió las skills ×4 (C4-3 del programa CEREBRO MAESTRO). Mismo patrón en inmobiliaria (`bump-version.yml`) → su `L-85`; medido que bersaglio e insema NO tienen bots que commiteen. Regla enmendada en la skill `sinapsis-cerebros` §3 regla 6; candidata al maestro en `brain-private/maestro/_inbox/2026-09-02-sinapsis-bot-mueve-main.md`.*

---

> Hija de `30-LECCIONES.md` (puntero allá). Misma doctrina de crecimiento:
> síntoma → causa → receta; solo lo reutilizable. Tope ~300 líneas (§G.5 hojas).
