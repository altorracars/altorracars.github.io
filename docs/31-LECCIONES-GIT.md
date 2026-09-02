# 🔧 31 — LECCIONES · GIT / REFACTOR (hija de `30-LECCIONES`)

> **Neurona hija** (shard §G.5, 2026-06-09): la sección "Operaciones de Git / refactor"
> de `30-LECCIONES.md` vive aquí desde que la madre llegó a su tope (~350 líneas).
> **Cuándo leerla**: Trigger de Experiencia (§G.2) cuando la operación sea git
> (merge/rebase/mover archivos/sed masivo). La madre conserva el puntero.

---

### L-01 · `sed -i '*.html'` corrompe el fin de línea (CRLF→LF)
⇒ **Migrada al maestro** (F2 lote 2): [[CARS:L-01]] · cuerpo íntegro en `_legacy/LECCIONES-MIGRADAS-MAESTRO.md`.

### L-02 · Conflicto recurrente cron ↔ cache al fusionar a `main`
- **Síntoma**: el PR de la rama marca conflicto en `js/core/cache-manager.js` (o `service-worker.js`).
- **Causa**: el cron de `main` (`Auto-generate vehicle pages + bump cache version`) bumpea `APP_VERSION`/`CACHE_VERSION` mientras la rama tiene esos archivos movidos/modificados → modify-en-main vs move/modify-nuestro.
- **Receta**: en la rama → `git merge origin/main --no-edit`. La estrategia **`ort` detecta el rename y aplica el bump del cron al archivo movido AUTOMÁTICAMENTE** (cero conflicto manual). Verificar después: `node -c`, 0 refs viejas.
- **Cómo evitarlo**: NO fusionar cada micro-paso a `main` (ver L-03). Sincronizar `main`→rama tras cada merge si se insiste en fusionar por paso.
- **Con cars EN PAUSA + cron vivo (23/07)**: el drift del `05` es ESTRUCTURAL entre sesiones (13 días de desfase vivido) → cada merge L-02 TERMINA sincronizando la fila de cache del `05` en el MISMO turno (el gate #4 bloquea el commit si no). Si los 4 archivos del conflicto solo los tocó el cron en ambas ramas (`git log <base>..rama -- <archivos> | grep -v Auto-generate` vacío), resolver = `git checkout --theirs` a la versión más NUEVA.
- *Doctrina relacionada: `CLAUDE.md §4` (cache bump). Vivido en §119; ampliado §303.*

### L-03 · No fusionar cada micro-paso a `main` durante un refactor largo
⇒ **Migrada al maestro** (F2 lote 6): [[CARS:L-03]] · cuerpo íntegro en `_legacy/LECCIONES-MIGRADAS-MAESTRO.md`.

### L-04 · Receta canónica para mover un archivo JS sin romper nada
1. **Mapear refs**: `grep -rl "js/X.js"` en `*.html vehiculos/*.html marcas/*.html` + ¿dinámico en `js/core/components.js` (`.src=`)? + ¿ancla hardcodeada en `scripts/generate-vehicles.mjs`?
2. `git mv js/X.js js/<carpeta>/X.js`.
3. Refs estáticas (`"js/X.js"`) → `sed` solo en archivos con match. Refs dinámicas/ancla → **Edit**.
4. **Verificar**: `grep` ruta-vieja = 0 en todo el repo · `node -c` · sin doble `carpeta/carpeta`.
5. Probar en localhost · `commit`.

### L-48 · Sesión concurrente: un `git add` amplio en otro chat arrastra tu edit sin commitear
⇒ **Migrada al maestro** (F2 lote 7): [[CARS:L-48]] · cuerpo íntegro en `_legacy/LECCIONES-MIGRADAS-MAESTRO.md`.

### L-68 · Ancla de `.replace()` que cruza `\n` falla EN SILENCIO en Windows (CRLF)
⇒ **Migrada al maestro** (F2 lote 8): [[CARS:L-68]] · cuerpo íntegro en `_legacy/LECCIONES-MIGRADAS-MAESTRO.md`.

### L-71 · Commit en HEAD DESPRENDIDO (tras resume) → queda COLGANTE, no llega a `dev`/`main`
⇒ **Migrada al maestro** (F2 lote 8): [[CARS:L-71]] · cuerpo íntegro en `_legacy/LECCIONES-MIGRADAS-MAESTRO.md`.

---

> Hija de `30-LECCIONES.md` (puntero allá). Misma doctrina de crecimiento:
> síntoma → causa → receta; solo lo reutilizable. Tope ~300 líneas (§G.5 hojas).
