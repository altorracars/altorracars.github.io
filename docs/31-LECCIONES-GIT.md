# 🔧 31 — LECCIONES · GIT / REFACTOR (hija de `30-LECCIONES`)

> **Neurona hija** (shard §G.5, 2026-06-09): la sección "Operaciones de Git / refactor"
> de `30-LECCIONES.md` vive aquí desde que la madre llegó a su tope (~350 líneas).
> **Cuándo leerla**: Trigger de Experiencia (§G.2) cuando la operación sea git
> (merge/rebase/mover archivos/sed masivo). La madre conserva el puntero.

---

### L-01 · `sed -i '*.html'` corrompe el fin de línea (CRLF→LF)
- **Síntoma**: tras un `sed` masivo aparecen 15+ archivos "modificados" que NO tocaste; GitHub Desktop muestra muchos más archivos de los esperados.
- **Causa**: `sed -i` reescribe TODOS los archivos que recibe; en Windows convierte CRLF→LF aunque no haya match → git (con `core.autocrlf=true`) los marca como cambiados (ruido).
- **Receta**: pasar a `sed` SOLO los archivos que contienen el patrón → `sed -i 's|viejo|nuevo|g' $(grep -rl "patrón" archivos)`. O usar la herramienta **Edit con replace_all** (no toca line-endings).
- **Limpiar el ruido**: restaurar los archivos que están en `git status` pero NO en `git diff --name-only` → `git checkout -- <esos archivos>`.
- *Descubierto en §119 Fase 2.2b-ii (comparador).*

### L-02 · Conflicto recurrente cron ↔ cache al fusionar a `main`
- **Síntoma**: el PR de la rama marca conflicto en `js/core/cache-manager.js` (o `service-worker.js`).
- **Causa**: el cron de `main` (`Auto-generate vehicle pages + bump cache version`) bumpea `APP_VERSION`/`CACHE_VERSION` mientras la rama tiene esos archivos movidos/modificados → modify-en-main vs move/modify-nuestro.
- **Receta**: en la rama → `git merge origin/main --no-edit`. La estrategia **`ort` detecta el rename y aplica el bump del cron al archivo movido AUTOMÁTICAMENTE** (cero conflicto manual). Verificar después: `node -c`, 0 refs viejas.
- **Cómo evitarlo**: NO fusionar cada micro-paso a `main` (ver L-03). Sincronizar `main`→rama tras cada merge si se insiste en fusionar por paso.
- *Doctrina relacionada: `CLAUDE.md §4` (cache bump). Vivido en §119.*

### L-03 · No fusionar cada micro-paso a `main` durante un refactor largo
- **Síntoma**: conflictos en bucle, un PR tras otro.
- **Causa**: el cron mueve `main` entre fusiones (pintar la pared mientras la ensucian).
- **Receta**: hacer todo el trabajo en la rama (`commit + push` solo guarda en GitHub), **UNA sola fusión final** tras terminar y probar. Un conflicto (o ninguno) en vez de uno por paso.

### L-04 · Receta canónica para mover un archivo JS sin romper nada
1. **Mapear refs**: `grep -rl "js/X.js"` en `*.html vehiculos/*.html marcas/*.html` + ¿dinámico en `js/core/components.js` (`.src=`)? + ¿ancla hardcodeada en `scripts/generate-vehicles.mjs`?
2. `git mv js/X.js js/<carpeta>/X.js`.
3. Refs estáticas (`"js/X.js"`) → `sed` solo en archivos con match. Refs dinámicas/ancla → **Edit**.
4. **Verificar**: `grep` ruta-vieja = 0 en todo el repo · `node -c` · sin doble `carpeta/carpeta`.
5. Probar en localhost · `commit`.

### L-48 · Sesión concurrente: un `git add` amplio en otro chat arrastra tu edit sin commitear
- **Síntoma**: editas un archivo (p.ej. `CLAUDE.md`) en el repo R; al volver, `git status` muestra archivos `M` que NO tocaste, y minutos después desaparecen (otro proceso commiteó); tu archivo queda con un diff inesperado vs HEAD.
- **Causa**: OTRA sesión/chat trabaja R en paralelo y al cerrar su tarea hizo `git add -A` / `commit -a`, **arrastrando tu edit sin commitear** dentro de SU commit (por eso jamás `git add -A` — M-12).
- **Receta**: (1) ANTES de operar git en cualquiera de los 4 cerebros, `git status`: si hay `M` ajenos = sesión viva → NO hagas branch/commit/checkout (carrera). (2) Si tu edit ya fue arrastrado a HEAD, verifica byte-identidad (`grep … | sha256sum`) y `git checkout -- <archivo>` para alinear tu working-tree a HEAD; NO re-commitees. (3) `git add` SIEMPRE archivos específicos, nunca `-A`.
- *Vivido en §223 (propagación §G.4 Caza-bugs ×4; en insema lo arrastró la sesión de ADR-C → `348f80d`).*

---

> Hija de `30-LECCIONES.md` (puntero allá). Misma doctrina de crecimiento:
> síntoma → causa → receta; solo lo reutilizable. Tope ~300 líneas (§G.5 hojas).
