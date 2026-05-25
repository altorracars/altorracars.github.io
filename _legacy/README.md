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
| `admin-upload.html` | Herramienta manual de subida de datos a Firestore | Reemplazada por el wizard de `admin.html`. ⚠️ Si aún la usás para cargas masivas, avisá y la restauramos. |
| `admin-components.html` | "Storybook" de componentes (T.3), `noindex,nofollow` | Galería de componentes de desarrollo. |

## Cómo revertir un archivo

```bash
git mv _legacy/<archivo> <ruta-original>
# notifications-demo.html y admin-upload.html → raíz
# admin-components.html → admin/_components.html
```

Si tras un tiempo confirmamos que ninguno hace falta, se borran definitivamente
en una fase posterior.
