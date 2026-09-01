# 🗄️ Lecciones MIGRADAS AL CEREBRO MAESTRO — cuarentena §G.4 (cuerpo íntegro)

> Estas lecciones **no se han perdido ni se han editado**: su cuerpo íntegro está aquí y su copia
> consultable vive en el maestro (`brain-private/maestro/lecciones/migradas/CARS/<ID>.md`), donde
> se lee desde CUALQUIER proyecto. En `docs/30-LECCIONES.md` sigue su titular —que es lo que hace
> resolver cualquier `[[L-NN]]` del repo— y en su hoja hija (`31`/`33`) queda su stub con el puntero a este fichero.
>
> **Para qué sirve este fichero**: es el punto de retorno. El ABORT del lote reconstruye el cuerpo
> DESDE AQUÍ, a propósito y no con `git checkout` — un checkout restaura blobs de git y no probaría
> nada del mecanismo (`brain-private/cerebro-maestro/ENSAYO-ROLLBACK-F2.md §5`).

> Lote 2 · migrado 2026-09-01 · 2 lecciones.

---

> Origen: CARS `docs/31-LECCIONES-GIT.md` (titular en `docs/30-LECCIONES.md`) · descubierta y pagada en CARS §119 (Fase 2.2b-ii, comparador), reconfirmada en TODO-52 · migrado 2026-09-01 lote 2

### L-01 · `sed -i '*.html'` corrompe el fin de línea (CRLF→LF)
- **Síntoma**: tras un `sed` masivo aparecen 15+ archivos "modificados" que NO tocaste; GitHub Desktop muestra muchos más archivos de los esperados.
- **Causa**: `sed -i` reescribe TODOS los archivos que recibe; en Windows convierte CRLF→LF aunque no haya match → git (con `core.autocrlf=true`) los marca como cambiados (ruido).
- **Receta**: pasar a `sed` SOLO los archivos que contienen el patrón → `sed -i 's|viejo|nuevo|g' $(grep -rl "patrón" archivos)`. O usar la herramienta **Edit con replace_all** (no toca line-endings).
- **Limpiar el ruido**: restaurar los archivos que están en `git status` pero NO en `git diff --name-only` → `git checkout -- <esos archivos>`.
- **Aplica a CUALQUIER reescritura masiva, no solo `sed`** (2026-06-29, TODO-52): un script **node `writeFileSync`** para barrer `friendlyError` reescribió **59 archivos** con diff de archivo-completo (CRLF corrompido) → revertido con `git checkout -- admin-app/src/modules/` y rehecho con **Edit `replace_all`** (limpio, diff quirúrgico). Meta-fallo: la lección YA existía y NO la consulté antes del script (Trigger de Experiencia §G.2 omitido). **Regla firme: para barridos multi-archivo en Windows usa Edit `replace_all`, jamás un script que reescriba archivos enteros.**
- *Descubierto en §119 Fase 2.2b-ii (comparador); reconfirmado TODO-52.*

> Origen: CARS `docs/33-LECCIONES-FRONTEND.md` (titular en `docs/30-LECCIONES.md`) · pagada en CARS §124 (SP-5.0 rastro saga: SW networkFirst para el critical-path) · migrado 2026-09-01 lote 2

### L-14 · SW stale-while-revalidate puede servir JS viejo en critical-path post-deploy
- **Síntoma**: deployaste un fix a un `.js` con cache bump. El index carga la versión nueva (visible en consola `[SW] Service Worker loaded - Version: vXXXX`). PERO al navegar a otra página del mismo origin, el código JS sigue siendo VIEJO aunque el deploy esté hecho. El fix no parece llegar.
- **Causa**: `service-worker.js` con strategy `stale-while-revalidate` (default para CSS/JS estable) sirve la versión cacheada INMEDIATAMENTE y solo actualiza en background. La versión nueva llega en la SIGUIENTE request — no en la inmediata. Un Ctrl+Shift+R en el index NO invalida el cache del SW para futuras navegaciones — solo bypasa el SW para esa page específica.
- **Receta**: para JS critical-path (tracking, auth, payments, cualquier cosa donde una versión vieja causa bugs persistentes), usar `networkFirst` en lugar de `stale-while-revalidate`. Ej. `service-worker.js` SP-5.0.f STRATEGY 3.5: networkFirst para `/js/core/*` + `/js/public/home/*`. Tradeoff: marginalmente más lento, pero fresh garantizado. Confirmado §124.
