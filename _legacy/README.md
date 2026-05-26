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

## Cómo revertir un archivo

```bash
git mv _legacy/<archivo> <ruta-original>
# notifications-demo.html y admin-upload.html → raíz
# admin-components.html → admin/_components.html
```

Si tras un tiempo confirmamos que ninguno hace falta, se borran definitivamente
en una fase posterior.
