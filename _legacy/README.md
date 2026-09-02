# 🗄️ _legacy/ — Cuarentena de archivos descartados

> Carpeta de cuarentena (ADR §119, Fase 1 de la reestructuración de frontend).
> Estos archivos **no se sirven ni se enlazan** desde ninguna parte del sitio.
> Se movieron aquí en vez de borrarse para poder revertir si hiciera falta.
>
> Verificación previa al mover (doctrina RCA §19): cero referencias internas
> (`grep` en HTML/JS/MJS/JSON) y ninguno aparece en `sitemap.xml`.

| Archivo | Qué era | Por qué se cuarentenó |
|---|---|---|
| `notifications-demo.html` | Página demo del sistema de notificaciones | Demo de desarrollo, no producción. |
| `admin-upload.html` | Herramienta manual de subida de datos a Firestore (`vehiculos`/`marcas` vía `.set()`) | **MUERTA — validado §119.** Creada 2026-02-07 (Firestore original), sin trabajo real desde entonces, **sin autenticación**. Bajo las `firestore.rules` actuales (escritura exige `isSuperAdmin()`, §68) cualquier escritura suya da *permission-denied* → no funciona aunque se abra. Reemplazada por el wizard de `admin.html` (§104-§108). |
| `admin-components.html` | "Storybook" de componentes (T.3), `noindex,nofollow` | Galería de componentes de desarrollo. |
| `theme-switcher.js` | Conmutador de tema light/dark/contrast (T.4) | **MUERTO — validado §119.** `admin.html:3721` dice "theme-switcher.js eliminado — tema dark permanente". 0 cargas funcionales (solo menciones en comentarios). El admin usa tema dark fijo + el motor cromático §115 (admin-theme-picker.js) para las 6 paletas. |
| `auth-header.css` | Estilos del header de auth (Header Loading Sprint, 2026-05-03) | **MUERTO — validado §119 Fase 3.** Su contenido fue MERGEADO dentro de `css/style.css` (comentario "MERGED FROM css/auth-header.css" en style.css:6917). 0 `<link>` y 0 `.href` que lo carguen. |
| `LECCIONES-MIGRADAS-MAESTRO.md` | Cuerpo íntegro de las lecciones que se mudaron al **cerebro maestro**: **lote 2** (2026-09-01) `L-01` (`sed -i`/CRLF) y `L-14` (SW stale-while-revalidate); **lote 6** (2026-09-01) otras **20** — `L-03` `L-05` `L-08` `L-09` `L-11` `L-12` `L-13` `L-15` `L-16` `L-17` `L-18` `L-20` `L-21` `L-22` `L-23` `L-25` `L-26` `L-27` `L-28` `L-30`; **lote 7** (2026-09-01) otras **20** — `L-32` `L-34` `L-35` `L-36` `L-38` `L-39` `L-40` `L-41` `L-42` `L-43` `L-47` `L-48` `L-49` `L-50` `L-51` `L-52` `L-54` `L-55` `L-56` `L-58` (quince con el cuerpo en el propio `30`, y `L-58` sin titular allí: nace y vive en el `33`). **lote 8** (2026-09-01) otras **20** — `L-60` `L-61` `L-62` `L-63` `L-64` `L-66` `L-67` `L-68` `L-69` `L-70` `L-71` `L-72` `L-73` `L-74` `L-77` y las cinco primeras META `M-01`…`M-05` (cuerpo en el `32`); de ellas, **seis** (`L-61` `L-62` `L-63` `L-64` `L-70` `L-72`) tenían el cuerpo ENTERO en su titular del `30`, así que allí no se sacó nada: su copia aquí es el punto de retorno igual que el de las demás. **lote 9** (2026-09-01) las **19 ÚLTIMAS** — las META `M-06`…`M-25` salvo `M-12` y `M-18` (que se QUEDAN: son las reglas de operación de este dueño y no pasan el criterio), con cuerpo en el `32`, más `L-37` (cuerpo en el `33`), la retenida del censo confirmada TRANSFERIBLE en el §309.2. **Con ese lote la cola de cars queda en CERO.** | **NO es código muerto ni un destilado**: es el **punto de retorno** del lote. Su copia consultable vive en `brain-private/maestro/lecciones/migradas/CARS/`; aquí queda el original byte a byte para que el ABORT lo reconstruya **sin `git checkout`**. Titular en `docs/30-LECCIONES.md`, stub en `docs/31-LECCIONES-GIT.md` / `docs/33-LECCIONES-FRONTEND.md` — y las cinco del lote 6 cuyo cuerpo vivía en el propio `30` (`L-08` `L-09` `L-26` `L-27` `L-30`) dejan ahí su titular y el puntero a este fichero. |

## Cómo revertir un archivo

```bash
git mv _legacy/<archivo> <ruta-original>
# notifications-demo.html y admin-upload.html → raíz
# admin-components.html → admin/_components.html
```

Si tras un tiempo confirmamos que ninguno hace falta, se borran definitivamente
en una fase posterior.
